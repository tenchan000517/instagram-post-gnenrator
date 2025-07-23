'use client'

import { useState, useEffect } from 'react'
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
  const [knowledgeBaseParams, setKnowledgeBaseParams] = useState<KnowledgeBaseParams | undefined>()

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
    if (content.trim()) {
      // インターセプト: AI生成前にナレッジベースパラメータをログ出力
      console.log('🔍 AI生成実行前のインターセプト')
      console.log('='.repeat(50))
      console.log('📝 入力コンテンツ:', content)
      console.log('🧠 ナレッジベースパラメータ:', knowledgeBaseParams)
      
      if (knowledgeBaseParams?.useKnowledgeBase) {
        console.log('📊 詳細データ:')
        console.log('  - TypeID:', knowledgeBaseParams.typeId)
        console.log('  - TargetID:', knowledgeBaseParams.targetId)
        console.log('  - PersonaIDs:', knowledgeBaseParams.personaIds)
        console.log('  - PersonaID数:', knowledgeBaseParams.personaIds?.length || 0)
        
        // ペルソナIDからナレッジIDを取得
        const knowledgeIds = knowledgeBaseParams.personaIds 
          ? MasterDataService.getKnowledgeIdsForPersonas(knowledgeBaseParams.personaIds)
          : []
        
        console.log('🧠 ナレッジID取得:')
        console.log('  - KnowledgeIDs:', knowledgeIds)
        console.log('  - KnowledgeID数:', knowledgeIds.length)
        
        // ナレッジIDからナレッジ内容を取得
        const knowledgeContents = await MasterDataService.getKnowledgeContents(knowledgeIds)
        
        console.log('📚 ナレッジ内容取得:')
        console.log('  - KnowledgeContents数:', knowledgeContents.length)
        console.log('  - KnowledgeContents:', knowledgeContents)
        
        // AI判定で関連ナレッジを選択
        console.log('🤖 AI判定開始: 関連ナレッジを選択中...')
        let enhancedParams: KnowledgeBaseParams
        
        try {
          const matchingRequest = { userInput: content, knowledgeContents }
          const matchResults = await KnowledgeMatchingService.findRelevantKnowledge(matchingRequest)
          
          // 🎯 トップスコア選択方式: 最高スコアのナレッジのみ選択
          const selectedResults = matchResults.length > 0 ? [matchResults[0]] : []
          const relevantKnowledgeIds = selectedResults.map(r => r.knowledgeId)
          
          console.log('✅ AI判定結果:')
          console.log('  - マッチング結果:', matchResults)
          console.log('  - 関連ナレッジID:', relevantKnowledgeIds)
          
          // AI判定結果のナレッジIDからナレッジデータを実際に取得
          const filteredKnowledgeContents = await MasterDataService.getKnowledgeContents(relevantKnowledgeIds)
          
          console.log('🎯 絞り込み結果:')
          console.log('  - 絞り込み後ナレッジ数:', filteredKnowledgeContents.length)
          console.log('  - 絞り込み後ナレッジ:', filteredKnowledgeContents)
          
          // 絞り込み済みデータで拡張パラメータ作成
          enhancedParams = {
            ...knowledgeBaseParams,
            knowledgeIds: relevantKnowledgeIds,
            knowledgeContents: filteredKnowledgeContents,
            knowledgeData: filteredKnowledgeContents.length > 0 ? filteredKnowledgeContents[0] : null
          }
        } catch (error) {
          console.error('❌ AI判定エラー:', error)
          // エラー時はフォールバック: 全ナレッジを使用
          enhancedParams = {
            ...knowledgeBaseParams,
            knowledgeIds,
            knowledgeContents,
            knowledgeData: knowledgeContents.length > 0 ? knowledgeContents[0] : null
          }
        }
        
        console.log('🚀 親コンポーネントに渡すデータ:')
        console.log('  - content:', content)
        console.log('  - enhancedParams:', enhancedParams)
        console.log('  - enhancedParams詳細:', JSON.stringify(enhancedParams, null, 2))
        
        console.log('='.repeat(50))
        
        // 拡張されたパラメータでAI生成実行に進む
        onSubmit(content, enhancedParams)
      } else {
        console.log('='.repeat(50))
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
          onSelectionChange={setKnowledgeBaseParams}
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