'use client'
import React, { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  Info, 
  Eye, 
  ChevronRight, 
  ChevronDown,
  Search,
  Target,
  Zap,
  AlertCircle,
  Star,
  TrendingUp,
  Clock,
  Filter
} from 'lucide-react'
import { KnowledgeRecommendation, RecommendationResult } from '../../services/knowledgeBase/RecommendationEngine'

interface SimilarityResultsUIProps {
  searchQuery: string
  recommendations: RecommendationResult | null
  isLoading: boolean
  onKnowledgeSelect: (knowledgeId: string) => void
  onRetrySearch?: (newQuery: string) => void
  onCancel?: () => void
  showAdvancedOptions?: boolean
}

interface AdvancedFilterOptions {
  minScore: number
  categories: string[]
  personas: string[]
  confidenceLevels: ('excellent' | 'good' | 'fair' | 'low')[]
}

export default function SimilarityResultsUI({
  searchQuery,
  recommendations,
  isLoading,
  onKnowledgeSelect,
  onRetrySearch,
  onCancel,
  showAdvancedOptions = false
}: SimilarityResultsUIProps) {
  const [selectedKnowledge, setSelectedKnowledge] = useState<string | null>(null)
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [newSearchQuery, setNewSearchQuery] = useState(searchQuery)
  const [filterOptions, setFilterOptions] = useState<AdvancedFilterOptions>({
    minScore: 0.4,
    categories: [],
    personas: [],
    confidenceLevels: ['excellent', 'good', 'fair']
  })

  const handleKnowledgeSelect = () => {
    if (selectedKnowledge) {
      onKnowledgeSelect(selectedKnowledge)
    }
  }

  const handleRetrySearch = () => {
    if (onRetrySearch && newSearchQuery.trim()) {
      onRetrySearch(newSearchQuery.trim())
    }
  }

  const toggleDetails = (knowledgeId: string) => {
    setExpandedDetails(expandedDetails === knowledgeId ? null : knowledgeId)
  }

  const getConfidenceBadgeStyle = (confidence: KnowledgeRecommendation['confidenceLevel']) => {
    const styles = {
      excellent: 'bg-green-100 text-green-800 border-green-200',
      good: 'bg-blue-100 text-blue-800 border-blue-200',
      fair: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return styles[confidence]
  }

  const getConfidenceIcon = (confidence: KnowledgeRecommendation['confidenceLevel']) => {
    const icons = {
      excellent: <Star className="w-4 h-4" />,
      good: <TrendingUp className="w-4 h-4" />,
      fair: <Target className="w-4 h-4" />,
      low: <AlertCircle className="w-4 h-4" />
    }
    return icons[confidence]
  }

  const getConfidenceLabel = (confidence: KnowledgeRecommendation['confidenceLevel']) => {
    const labels = {
      excellent: '最適',
      good: '適合',
      fair: '普通',
      low: '要検討'
    }
    return labels[confidence]
  }

  // ローディング状態
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-blue-600 mb-4">
            <Search className="w-6 h-6 animate-spin" />
            <span className="text-lg font-medium">ナレッジを検索中...</span>
          </div>
          <div className="text-gray-600">
            <p>「{searchQuery}」に最適なナレッジを分析しています</p>
            <div className="mt-4 bg-gray-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 結果なし
  if (!recommendations || recommendations.recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            適合するナレッジが見つかりませんでした
          </h3>
          <p className="text-gray-600 mb-6">
            「{searchQuery}」に関連するナレッジを見つけることができませんでした。<br />
            検索条件を変更してみてください。
          </p>
          
          {onRetrySearch && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSearchQuery}
                  onChange={(e) => setNewSearchQuery(e.target.value)}
                  placeholder="新しい検索キーワードを入力..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleRetrySearch()}
                />
                <button
                  onClick={handleRetrySearch}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  再検索
                </button>
              </div>
              
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  キャンセル
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  const { recommendations: knowledgeList, searchSummary, qualityDistribution, userGuidance } = recommendations

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center">
              <Search className="w-6 h-6 mr-2" />
              ナレッジ推奨結果
            </h2>
            <p className="text-blue-100 mt-1">「{searchQuery}」の検索結果</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{knowledgeList.length}</div>
            <div className="text-sm text-blue-100">件の推奨</div>
          </div>
        </div>
      </div>

      {/* 統計情報 */}
      <div className="bg-gray-50 p-4 border-b">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {searchSummary.totalAnalyzed}
            </div>
            <div className="text-gray-600">分析対象</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">
              {Math.round(searchSummary.averageScore * 100)}%
            </div>
            <div className="text-gray-600">平均類似度</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">
              {qualityDistribution.excellent + qualityDistribution.good}
            </div>
            <div className="text-gray-600">高品質</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-600">
              <Clock className="w-4 h-4 inline mr-1" />
              {Math.round(searchSummary.processingTime)}ms
            </div>
            <div className="text-gray-600">処理時間</div>
          </div>
        </div>
      </div>

      {/* ユーザーガイダンス */}
      {userGuidance.selectionAdvice && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">推奨ガイダンス</h4>
              <p className="text-sm text-blue-700 mt-1">{userGuidance.selectionAdvice}</p>
            </div>
          </div>
        </div>
      )}

      {/* フィルター（オプション） */}
      {showAdvancedOptions && (
        <div className="border-b bg-gray-50">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <span className="flex items-center text-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              詳細フィルター
            </span>
            {showFilters ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          
          {showFilters && (
            <div className="px-4 pb-4 space-y-4">
              {/* フィルターオプション実装（今後の拡張用） */}
              <div className="text-sm text-gray-600">
                フィルター機能は今後実装予定です
              </div>
            </div>
          )}
        </div>
      )}

      {/* 推奨リスト */}
      <div className="divide-y">
        {knowledgeList.map((knowledge, index) => (
          <div key={knowledge.knowledgeId} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              {/* 選択ラジオボタン */}
              <div className="flex-shrink-0 mt-1">
                <input
                  type="radio"
                  name="knowledge-selection"
                  value={knowledge.knowledgeId}
                  checked={selectedKnowledge === knowledge.knowledgeId}
                  onChange={() => setSelectedKnowledge(knowledge.knowledgeId)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </div>

              {/* メインコンテンツ */}
              <div className="flex-1 min-w-0">
                {/* 順位とタイトル */}
                <div className="flex items-center space-x-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </span>
                  <h3 className="font-medium text-gray-900 truncate">
                    {knowledge.title}
                  </h3>
                  
                  {/* 信頼度バッジ */}
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getConfidenceBadgeStyle(knowledge.confidenceLevel)}`}>
                    {getConfidenceIcon(knowledge.confidenceLevel)}
                    <span className="ml-1">{getConfidenceLabel(knowledge.confidenceLevel)}</span>
                  </span>
                </div>

                {/* 問題説明 */}
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {knowledge.problemDescription}
                </p>

                {/* メタ情報 */}
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                  <span className="flex items-center">
                    <Target className="w-3 h-3 mr-1" />
                    {knowledge.targetPersona}
                  </span>
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                    {knowledge.category}
                  </span>
                  <span className="flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {Math.round(knowledge.adjustedScore * 100)}%
                  </span>
                </div>

                {/* 推奨理由 */}
                <div className="text-sm text-gray-700 bg-gray-50 rounded p-2 mb-2">
                  {knowledge.recommendationReason}
                </div>

                {/* 詳細表示ボタン */}
                <button
                  onClick={() => toggleDetails(knowledge.knowledgeId)}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  {expandedDetails === knowledge.knowledgeId ? '詳細を閉じる' : '詳細を見る'}
                  {expandedDetails === knowledge.knowledgeId ? 
                    <ChevronDown className="w-3 h-3 ml-1" /> : 
                    <ChevronRight className="w-3 h-3 ml-1" />
                  }
                </button>

                {/* 展開可能な詳細情報 */}
                {expandedDetails === knowledge.knowledgeId && (
                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                    {/* 解決策要約 */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">解決策要約</h4>
                      <p className="text-sm text-gray-600">{knowledge.solutionSummary}</p>
                    </div>

                    {/* 強みポイント */}
                    {knowledge.strengthPoints.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">強みポイント</h4>
                        <div className="flex flex-wrap gap-1">
                          {knowledge.strengthPoints.map((point, idx) => (
                            <span key={idx} className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 注意点 */}
                    {knowledge.potentialConcerns.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">注意点</h4>
                        <div className="flex flex-wrap gap-1">
                          {knowledge.potentialConcerns.map((concern, idx) => (
                            <span key={idx} className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                              {concern}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* スコア詳細 */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500">元スコア:</span>
                        <span className="ml-2 font-medium">{Math.round(knowledge.originalScore * 100)}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500">調整後スコア:</span>
                        <span className="ml-2 font-medium">{Math.round(knowledge.adjustedScore * 100)}%</span>
                      </div>
                      {knowledge.diversityBonus > 0 && (
                        <div>
                          <span className="text-gray-500">多様性ボーナス:</span>
                          <span className="ml-2 font-medium text-green-600">+{Math.round(knowledge.diversityBonus * 100)}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* アクションボタン */}
      <div className="bg-gray-50 px-4 py-4 flex justify-between items-center">
        <div className="flex space-x-3">
          {onRetrySearch && (
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSearchQuery}
                onChange={(e) => setNewSearchQuery(e.target.value)}
                placeholder="条件を変更して再検索..."
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && handleRetrySearch()}
              />
              <button
                onClick={handleRetrySearch}
                className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors"
              >
                再検索
              </button>
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              キャンセル
            </button>
          )}
          <button
            onClick={handleKnowledgeSelect}
            disabled={!selectedKnowledge}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              selectedKnowledge
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            選択したナレッジを使用
          </button>
        </div>
      </div>
    </div>
  )
}