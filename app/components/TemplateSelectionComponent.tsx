'use client'
import React, { useState } from 'react'
import { TemplateType } from './templates/TemplateTypes'
import { TemplateRecommendationService, RecommendationResult } from '../services/templateRecommendationService'
import { ContentLayoutService } from '../services/contentLayoutService'
import { CheckCircle, Info, Eye, ChevronRight } from 'lucide-react'

interface TemplateSelectionProps {
  content: string
  onTemplateSelect: (templateType: TemplateType) => void
  onCancel: () => void
}

export default function TemplateSelectionComponent({
  content,
  onTemplateSelect,
  onCancel
}: TemplateSelectionProps) {
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null)
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  React.useEffect(() => {
    // コンポーネントマウント時に推奨テンプレートを取得
    const loadRecommendations = async () => {
      setIsLoading(true)
      try {
        const result = TemplateRecommendationService.recommendTemplates(content)
        setRecommendations(result)
        setSelectedTemplate(result.primary.templateType)
      } catch (error) {
        console.error('Template recommendation failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRecommendations()
  }, [content])

  const handleTemplateSelect = () => {
    if (selectedTemplate) {
      onTemplateSelect(selectedTemplate)
    }
  }

  const getTemplateDisplayName = (templateType: TemplateType): string => {
    const names: Record<TemplateType, string> = {
      index: 'INDEX型',
      enumeration: '項目リスト型',
      list: 'シンプルリスト型',
      explanation2: '複数セクション解説型',
      simple3: '要約まとめ型',
      table: '比較表型',
      simple5: 'バランス型',
      simple6: 'メッセージ型',
      'section-items': 'セクション+アイテム型',
      'two-column-section-items': '2カラムセクション+アイテム型',
      'title-description-only': 'タイトル+説明特化型',
      'checklist-enhanced': 'チェックリスト詳細型',
      'item-n-title-content': '独立ボックス型',
      'single-section-no-items': '単一セクション・アイテム無し型',
      'ranking': 'ランキング型',
      'graph': 'グラフ型'
    }
    return names[templateType] || templateType
  }

  const getTemplateDescription = (templateType: TemplateType): string => {
    const descriptions: Record<TemplateType, string> = {
      index: 'INDEX型の構成。目次ページとして使用。',
      enumeration: '項目リストと説明文を組み合わせた構成。チェックポイントや手順を明確に示したい場合に最適。',
      list: 'シンプルなリスト形式。要点を簡潔に示したい場合に適している。',
      explanation2: '複数のセクションに分けた詳細解説。複雑な内容を整理して説明したい場合に最適。',
      simple3: '要約・まとめ形式の構成。情報を整理して結論を示したい場合に最適。',
      table: '比較表形式で情報を整理。データや選択肢を比較したい場合に適している。',
      simple5: 'バランス型の構成。複数の要素を均等に扱いたい場合に最適。',
      simple6: 'メッセージ型の構成。明確なメッセージを伝えたい場合に適している。',
      'section-items': 'セクション+アイテム型の構成。分類した情報を整理して表示したい場合に最適。',
      'two-column-section-items': '2カラムセクション+アイテム型の構成。左右に分けて情報を比較表示したい場合に最適。',
      'title-description-only': 'タイトルと説明文のみのシンプル構成。核心的なメッセージを直接的に伝えたい場合に最適。',
      'checklist-enhanced': 'チェックリスト項目に詳細説明付きの構成。タスクや手順を明確に説明したい場合に最適。',
      'item-n-title-content': '独立したボックス型構成。複数の独立したトピックを並列で表示したい場合に最適。',
      'single-section-no-items': '単一セクション情報を詳細表示。特定のトピックを深く解説したい場合に最適。',
      'ranking': 'ランキング形式でデータを表示。順位やワースト・ベストデータを視覚的に示したい場合に最適。',
      'graph': 'グラフ形式でデータを可視化表示。統計データや割合を円グラフ・棒グラフで表現したい場合に最適。'
    }
    return descriptions[templateType] || 'テンプレートの説明'
  }

  if (isLoading) {
    return (
      <div className="post-preview">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-find-blue"></div>
          <span className="ml-4 text-gray-600">最適なテンプレートを分析中...</span>
        </div>
      </div>
    )
  }

  if (!recommendations) {
    return (
      <div className="post-preview">
        <div className="text-center py-8">
          <p className="text-red-600">テンプレートの分析に失敗しました。</p>
          <button onClick={onCancel} className="btn-secondary mt-4">
            戻る
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="post-preview">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          📋 テンプレート選択
        </h2>
        <p className="text-gray-600">
          生成されたコンテンツに最適なテンプレートを選択してください
        </p>
      </div>

      {/* コンテンツ分析結果 */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">📊 コンテンツ分析結果</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <span className="font-medium">構造タイプ:</span> {recommendations.contentAnalysis.structureType}
          </div>
          <div>
            <span className="font-medium">文字数:</span> {recommendations.contentAnalysis.contentLength}文字
          </div>
          <div>
            <span className="font-medium">リスト要素:</span> {recommendations.contentAnalysis.hasLists ? 'あり' : 'なし'}
          </div>
          <div>
            <span className="font-medium">セクション構造:</span> {recommendations.contentAnalysis.hasSections ? 'あり' : 'なし'}
          </div>
        </div>
      </div>

      {/* 推奨テンプレート */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
          推奨テンプレート
        </h3>
        
        <div 
          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
            selectedTemplate === recommendations.primary.templateType
              ? 'border-find-blue bg-find-blue/10'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setSelectedTemplate(recommendations.primary.templateType)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span className="font-medium text-gray-800">
                  {getTemplateDisplayName(recommendations.primary.templateType)}
                </span>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  推奨 {Math.round(recommendations.primary.fitScore)}%
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {recommendations.primary.reason}
              </p>
              <p className="text-xs text-gray-500">
                {getTemplateDescription(recommendations.primary.templateType)}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDetails(showDetails === recommendations.primary.templateType ? null : recommendations.primary.templateType)
              }}
              className="ml-4 p-2 text-gray-400 hover:text-gray-600"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          
          {showDetails === recommendations.primary.templateType && (
            <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
              <h4 className="font-medium mb-2">プレビュー概要</h4>
              <p className="text-gray-600 whitespace-pre-line">
                {recommendations.primary.previewSummary}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 代替テンプレート */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-800 mb-3 flex items-center">
          <Info className="w-5 h-5 mr-2 text-blue-600" />
          その他のテンプレート
        </h3>
        
        <div className="space-y-3">
          {recommendations.alternatives.map((alt) => (
            <div
              key={alt.templateType}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedTemplate === alt.templateType
                  ? 'border-find-blue bg-find-blue/10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTemplate(alt.templateType)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-gray-800">
                      {getTemplateDisplayName(alt.templateType)}
                    </span>
                    <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {Math.round(alt.fitScore)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {alt.reason}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDetails(showDetails === alt.templateType ? null : alt.templateType)
                  }}
                  className="ml-4 p-2 text-gray-400 hover:text-gray-600"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              
              {showDetails === alt.templateType && (
                <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                  <h4 className="font-medium mb-2">プレビュー概要</h4>
                  <p className="text-gray-600 whitespace-pre-line">
                    {alt.previewSummary}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="btn-secondary"
        >
          戻る
        </button>
        
        <div className="flex items-center space-x-3">
          {selectedTemplate && (
            <span className="text-sm text-gray-600">
              選択中: {getTemplateDisplayName(selectedTemplate)}
            </span>
          )}
          <button
            onClick={handleTemplateSelect}
            disabled={!selectedTemplate}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <span>このテンプレートで配置</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}