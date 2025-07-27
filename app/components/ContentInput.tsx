'use client'

import { useState, useEffect, useCallback } from 'react'
import { FileText, Send, Lightbulb } from 'lucide-react'
import KnowledgeBaseSelector from './ui/KnowledgeBaseSelector'
import { KnowledgeBaseParams } from '../types/knowledgeBase'
import { MasterDataService } from '../services/knowledgeBase/MasterDataService'
import { KnowledgeMatchingService } from '../services/knowledgeBase/KnowledgeMatchingService'

interface ContentInputProps {
  onSubmit: (content: string, knowledgeBaseParams?: KnowledgeBaseParams) => void
}

export default function ContentInput({ onSubmit }: ContentInputProps) {
  const [content, setContent] = useState('')
  const [knowledgeBaseParams, setKnowledgeBaseParams] = useState<KnowledgeBaseParams | undefined>(() => {
    console.log('🔍 ContentInput初期化: knowledgeBaseParams = undefined')
    return undefined
  })

  useEffect(() => {
    // LocalStorageから formatted_content を取得
    const formattedContent = localStorage.getItem('formatted_content')
    const timestamp = localStorage.getItem('formatted_content_timestamp')
    
    if (formattedContent && timestamp) {
      // データが5分以内の場合のみ使用
      const dataAge = Date.now() - parseInt(timestamp)
      if (dataAge < 5 * 60 * 1000) { // 5分
        setContent(formattedContent)
        // 使用後にLocalStorageをクリア
        localStorage.removeItem('formatted_content')
        localStorage.removeItem('formatted_content_timestamp')
        return
      }
    }

    // フォールバック: URLパラメータからinput値を取得
    const urlParams = new URLSearchParams(window.location.search)
    const inputParam = urlParams.get('input')
    if (inputParam) {
      try {
        setContent(decodeURIComponent(inputParam))
      } catch (error) {
        console.warn('URI decode error, using raw parameter:', error)
        setContent(inputParam)
      }
    }
  }, [])

  const handleSubmit = async () => {
    console.log('🚨 handleSubmit実行時点のknowledgeBaseParams:', knowledgeBaseParams)
    console.log('  - JSON詳細:', JSON.stringify(knowledgeBaseParams, null, 2))
    console.log('  - useKnowledgeBase:', knowledgeBaseParams?.useKnowledgeBase)
    
    if (content.trim()) {
      if (knowledgeBaseParams?.useKnowledgeBase) {
        // ペルソナIDからナレッジIDを取得
        const knowledgeIds = knowledgeBaseParams.personaIds 
          ? MasterDataService.getKnowledgeIdsForPersonas(knowledgeBaseParams.personaIds)
          : []
        
        console.log('🔍 ペルソナIDからナレッジIDへの変換:', {
          personaIds: knowledgeBaseParams.personaIds,
          knowledgeIds: knowledgeIds
        })
        
        // ナレッジIDからナレッジ内容を取得
        const knowledgeContents = await MasterDataService.getKnowledgeContents(knowledgeIds)
        
        console.log('📚 取得したナレッジ内容:', {
          count: knowledgeContents.length,
          knowledgeIds: knowledgeContents.map(k => k.knowledgeId)
        })
        
        // AI判定で関連ナレッジを選択
        let enhancedParams: KnowledgeBaseParams
        
        try {
          const matchingRequest = { userInput: content, knowledgeContents }
          const matchResults = await KnowledgeMatchingService.findRelevantKnowledge(matchingRequest)
          
          // 🎯 トップスコア選択方式: 最高スコアのナレッジのみ選択
          const selectedResults = matchResults.length > 0 ? [matchResults[0]] : []
          const relevantKnowledgeIds = selectedResults.map(r => r.knowledgeId)
          
          // AI判定結果のナレッジIDからナレッジデータを実際に取得
          const filteredKnowledgeContents = await MasterDataService.getKnowledgeContents(relevantKnowledgeIds)
          
          // 絞り込み済みデータで拡張パラメータ作成
          const selectedKnowledgeData = filteredKnowledgeContents.length > 0 ? filteredKnowledgeContents[0] : null
          
          // UI選択のtypeIdを保持（AIが選択したナレッジのpostTypeで上書きしない）
          enhancedParams = {
            ...knowledgeBaseParams,
            knowledgeIds: relevantKnowledgeIds,
            knowledgeContents: filteredKnowledgeContents,
            knowledgeData: selectedKnowledgeData
          }
        } catch (error) {
          console.error('❌ AI判定エラー:', error)
          // エラー時はフォールバック: 全ナレッジを使用
          const fallbackKnowledgeData = knowledgeContents.length > 0 ? knowledgeContents[0] : null
          const fallbackTypeId = fallbackKnowledgeData?.postType || knowledgeBaseParams.typeId
          
          enhancedParams = {
            ...knowledgeBaseParams,
            typeId: fallbackTypeId,
            knowledgeIds,
            knowledgeContents,
            knowledgeData: fallbackKnowledgeData
          }
        }
        
        // 拡張されたパラメータでAI生成実行に進む
        onSubmit(content, enhancedParams)
      } else {
        // ナレッジベース未使用の場合はそのまま
        onSubmit(content, knowledgeBaseParams)
      }
    }
  }

  const exampleContents = [
    "大学生活で何もしていない学生が、3ヶ月でエンジニア内定を獲得した体験談",
    "就活で後悔する学生の共通点と対策方法",
    "文系からデザイナーになるための具体的なステップ",
    "インターンシップの選考に通るためのポートフォリオ作成法",
    "面接で好印象を与える逆質問の例とその理由",
    "内定承諾前に確認すべき企業の重要ポイント",
    "ES通過率を上げるための文章構成テクニック",
    "長期インターンで実際に身につくスキルとは",
    "IT企業のインターンシップ選考を突破するコツ",
    "自己分析で見つかる本当の強みと弱みの活かし方"
  ]

  return (
    <div className="space-y-6">
      
      {/* ナレッジベース選択 */}
      <div className="post-preview">
        <KnowledgeBaseSelector
          onSelectionChange={useCallback((params) => {
            console.log('📨 ContentInput: KnowledgeBaseSelectorからパラメータ受信')
            console.log('  - 受信データ:', JSON.stringify(params, null, 2))
            console.log('  - 受信前のstate:', knowledgeBaseParams)
            setKnowledgeBaseParams(params)
            console.log('  - state更新完了（非同期なので即座には反映されない）')
          }, [])}
        />
      </div>

      {/* コンテンツ入力 */}
      <div className="post-preview">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-find-blue" />
          投稿したい内容を入力してください
        </h2>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="投稿内容のテーマやアイデアを入力してください..."
          className="input-field h-48 resize-none"
        />
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {content.length} / 1000文字
          </div>
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>AIコンテンツ生成へ進む</span>
          </button>
        </div>
      </div>

      {/* 例文表示 */}
      <div className="post-preview">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-find-orange" />
          コンテンツ例
        </h3>
        
        <div className="space-y-3">
          {exampleContents.map((example, index) => (
            <div
              key={index}
              onClick={() => setContent(example)}
              className="p-3 border border-gray-200 rounded-lg hover:border-find-blue cursor-pointer transition-colors"
            >
              <p className="text-gray-700 text-sm">{example}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <span className="font-medium">ヒント：</span>
            具体的で実践的な内容ほど、高品質なInstagram投稿が生成されます。
            事実に基づいた内容を入力してください。
          </p>
        </div>
      </div>
    </div>
  )
}