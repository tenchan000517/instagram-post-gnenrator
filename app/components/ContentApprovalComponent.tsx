'use client'

import { useState } from 'react'
import { RefreshCw, Check, X, Eye, EyeOff, Sparkles, Plus } from 'lucide-react'
import { GeneratedContent, GeneratedPage, contentGeneratorService } from '../services/contentGeneratorService'
import { TemplateType } from './templates'

interface ContentApprovalComponentProps {
  generatedContent: GeneratedContent
  onApprove: (content: GeneratedContent) => void
  onReject: () => void
  onContentUpdate: (content: GeneratedContent) => void
  mainTheme?: string // INDEXページ生成用のメインテーマ
}

export default function ContentApprovalComponent({
  generatedContent,
  onApprove,
  onReject,
  onContentUpdate,
  mainTheme
}: ContentApprovalComponentProps) {
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [regeneratingPage, setRegeneratingPage] = useState<number | null>(null)
  const [expandedPages, setExpandedPages] = useState<Set<number>>(new Set([1]))
  const [editingInstructions, setEditingInstructions] = useState<{ [key: number]: string }>({})
  const [hasIndexPage, setHasIndexPage] = useState(() => {
    // 既にINDEXページ（pageNumber: 0）が存在するかチェック
    return generatedContent.pages.some(page => page.pageNumber === 0 && page.templateType === 'index')
  })
  const [isGeneratingIndex, setIsGeneratingIndex] = useState(false)
  const [isRegeneratingHashtags, setIsRegeneratingHashtags] = useState(false)

  const handleRegenerateAll = async () => {
    setIsRegenerating(true)
    try {
      const newContent = await contentGeneratorService.generateHighQualityContent(
        generatedContent.summary + '\n\n品質を向上させて再生成してください'
      )
      onContentUpdate(newContent)
    } catch (error) {
      console.error('Regeneration failed:', error)
      alert('再生成に失敗しました。もう一度お試しください。')
    } finally {
      setIsRegenerating(false)
    }
  }

  const handleRegeneratePage = async (pageNumber: number) => {
    setRegeneratingPage(pageNumber)
    try {
      const instructions = editingInstructions[pageNumber] || ''
      const newPage = await contentGeneratorService.regenerateSpecificPage(
        generatedContent,
        pageNumber,
        instructions
      )
      
      const updatedContent = {
        ...generatedContent,
        pages: generatedContent.pages.map(page => 
          page.pageNumber === pageNumber ? newPage : page
        )
      }
      
      onContentUpdate(updatedContent)
      setEditingInstructions(prev => ({ ...prev, [pageNumber]: '' }))
    } catch (error) {
      console.error('Page regeneration failed:', error)
      alert('ページの再生成に失敗しました。もう一度お試しください。')
    } finally {
      setRegeneratingPage(null)
    }
  }

  const togglePageExpansion = (pageNumber: number) => {
    setExpandedPages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(pageNumber)) {
        newSet.delete(pageNumber)
      } else {
        newSet.add(pageNumber)
      }
      return newSet
    })
  }

  const handleInstructionChange = (pageNumber: number, instruction: string) => {
    setEditingInstructions(prev => ({
      ...prev,
      [pageNumber]: instruction
    }))
  }

  const handleGenerateIndex = async () => {
    if (!mainTheme) {
      alert('メインテーマが設定されていません')
      return
    }

    setIsGeneratingIndex(true)
    try {
      const contentWithIndex = contentGeneratorService.generateContentWithIndex(
        generatedContent,
        mainTheme
      )
      setHasIndexPage(true)
      onContentUpdate(contentWithIndex)
    } catch (error) {
      console.error('INDEX generation failed:', error)
      alert('INDEXページの生成に失敗しました。もう一度お試しください。')
    } finally {
      setIsGeneratingIndex(false)
    }
  }

  const handleRemoveIndex = () => {
    // INDEXページ（pageNumber: 0）を除外
    const pagesWithoutIndex = generatedContent.pages.filter(page => page.pageNumber !== 0)
    
    // ページ番号を再調整
    const adjustedPages = pagesWithoutIndex.map((page, index) => ({
      ...page,
      pageNumber: index + 1,
      templateData: {
        ...page.templateData,
        pageNumber: index + 1
      }
    }))

    const updatedContent: GeneratedContent = {
      ...generatedContent,
      pages: adjustedPages,
      totalPages: adjustedPages.length
    }

    setHasIndexPage(false)
    onContentUpdate(updatedContent)
  }

  const handleRegenerateHashtags = async () => {
    setIsRegeneratingHashtags(true)
    try {
      const updatedContent = await contentGeneratorService.regenerateHashtags(generatedContent)
      onContentUpdate(updatedContent)
    } catch (error) {
      console.error('Hashtag regeneration failed:', error)
      alert('ハッシュタグの再生成に失敗しました。もう一度お試しください。')
    } finally {
      setIsRegeneratingHashtags(false)
    }
  }

  const getTemplateTypeDisplayName = (templateType: TemplateType): string => {
    const typeMap: Record<TemplateType, string> = {
      enumeration: '列挙型',
      list: 'リスト型',
      explanation2: '解説型2',
      simple3: 'シンプル型3',
      table: '表型',
      simple5: 'シンプル型5',
      simple6: 'シンプル型6',
      'section-items': 'セクション+アイテム型',
      'two-column-section-items': '2カラムセクション+アイテム型',
      'title-description-only': 'タイトル+説明型',
      'checklist-enhanced': 'チェックリスト詳細型',
      'item-n-title-content': '独立ボックス型',
      'single-section-no-items': '単一セクション・アイテム無し型',
      'index': 'INDEX（目次）型',
      'ranking': 'ランキング型',
      'graph': 'グラフ型',
      // 新テンプレートタイプ
      sequential_step_learning: '順序依存ステップ型',
      parallel_qa_discussion: 'Q&A並列紹介型',
      points_list_analysis: 'ポイントリスト型',
      timeline_story_experience: '時系列ストーリー型',
      feature_parallel_info: '機能紹介並列型',
      feature_detail_tips: '機能詳細Tips型',
      sequential_dependency: '順序依存ステップ型',
      category_content_learning: 'カテゴリ別コンテンツ学習型',
      step_guide_achievement: 'ステップガイド達成型',
      method_systematic_info: '方法論体系的情報型',
      practical_guide_conversation: '実践ガイド会話型',
      company_data_list: '企業データリスト型',
      usage_practical_steps: '使用法実践ステップ型',
      failure_episode: '失敗エピソード型',
      failure_story_intro: '失敗ストーリー導入型',
      profile_offer: 'プロフィール・オファー型'
    }
    return typeMap[templateType] || templateType
  }

  const renderPageContent = (page: GeneratedPage) => {
    const { content } = page
    const isExpanded = expandedPages.has(page.pageNumber)

    return (
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {page.pageNumber}ページ目
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {getTemplateTypeDisplayName(page.templateType)}
            </span>
          </div>
          <button
            onClick={() => togglePageExpansion(page.pageNumber)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isExpanded ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {content.title && (
          <h3 className="font-bold text-lg mb-2">{String(content.title)}</h3>
        )}
        
        {content.subtitle && (
          <p className="text-gray-600 mb-2">{String(content.subtitle)}</p>
        )}

        {isExpanded && (
          <div className="space-y-3">
            {content.description && (
              <p className="text-gray-700">{String(content.description)}</p>
            )}

            {content.badgeText && (
              <div className="bg-blue-50 px-3 py-2 rounded-md">
                <span className="text-blue-800 font-medium">{String(content.badgeText)}</span>
              </div>
            )}

            {content.items && content.items.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">項目:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {content.items.map((item, index) => (
                    <li key={index} className="text-gray-700">{String(item || '')}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.sections && content.sections.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">セクション:</h4>
                {content.sections.map((section, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md mb-2">
                    <h5 className="font-medium">{String(section.title || '')}</h5>
                    <p className="text-gray-700 mt-1">{String(section.content || '')}</p>
                    {section.items && section.items.length > 0 && (
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-gray-600">{String(item || '')}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {content.tableData && content.tableData.headers.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">テーブル:</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        {content.tableData.headers.map((header, index) => (
                          <th key={index} className="border border-gray-300 px-4 py-2 text-left">
                            {String(header || '')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {content.tableData.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                              {String(cell || '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {content.checklistItems && content.checklistItems.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">チェックリスト:</h4>
                <div className="space-y-2">
                  {content.checklistItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 bg-green-50 rounded-md">
                      <div className="w-5 h-5 border-2 border-green-500 rounded mt-0.5"></div>
                      <div>
                        <span className="font-medium">{String(item.text || '')}</span>
                        <p className="text-gray-600 text-sm mt-1">{String(item.description || '')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 space-y-3">
          <textarea
            value={editingInstructions[page.pageNumber] || ''}
            onChange={(e) => handleInstructionChange(page.pageNumber, e.target.value)}
            placeholder="このページの改善指示を入力してください..."
            className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
          <button
            onClick={() => handleRegeneratePage(page.pageNumber)}
            disabled={regeneratingPage === page.pageNumber}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {regeneratingPage === page.pageNumber ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                再生成中...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                このページを再生成
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            コンテンツ承認
          </h2>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {generatedContent.totalPages}ページ生成完了
          </span>
        </div>
        
        <p className="text-gray-600 mb-4">
          生成されたコンテンツをご確認ください。各ページの内容を確認し、必要に応じて個別に再生成できます。
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleRegenerateAll}
            disabled={isRegenerating}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isRegenerating ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                全体再生成中...
              </>
            ) : (
              <>
                <RefreshCw size={16} />
                全体を再生成
              </>
            )}
          </button>

          {/* INDEX機能のコントロール */}
          {mainTheme && !hasIndexPage && (
            <button
              onClick={handleGenerateIndex}
              disabled={isGeneratingIndex}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGeneratingIndex ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  INDEX生成中...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  INDEXページを生成
                </>
              )}
            </button>
          )}

          {hasIndexPage && (
            <button
              onClick={handleRemoveIndex}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              <X size={16} />
              INDEXページを削除
            </button>
          )}
          
          <button
            onClick={() => onApprove(generatedContent)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <Check size={16} />
            承認してテンプレート選択へ
          </button>
          
          <button
            onClick={onReject}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <X size={16} />
            却下して入力に戻る
          </button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-blue-900 mb-2">概要</h3>
          <p className="text-blue-800">{String(generatedContent.summary || '')}</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-purple-900">キャプション</h3>
            <button
              onClick={handleRegenerateHashtags}
              disabled={isRegeneratingHashtags}
              className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {isRegeneratingHashtags ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  ハッシュタグ再生成中...
                </>
              ) : (
                <>
                  <RefreshCw size={14} />
                  ハッシュタグ再生成
                </>
              )}
            </button>
          </div>
          <p className="text-purple-800 mb-3">{String(generatedContent.caption || '')}</p>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-purple-900 mb-2">大カテゴリ (4個)</h4>
              <div className="flex flex-wrap gap-2">
                {generatedContent.hashtags.large?.map((tag, index) => (
                  <span key={`large-${index}`} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    {String(tag || '')}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-900 mb-2">中カテゴリ (4個)</h4>
              <div className="flex flex-wrap gap-2">
                {generatedContent.hashtags.medium?.map((tag, index) => (
                  <span key={`medium-${index}`} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                    {String(tag || '')}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-900 mb-2">小カテゴリ (3個)</h4>
              <div className="flex flex-wrap gap-2">
                {generatedContent.hashtags.small?.map((tag, index) => (
                  <span key={`small-${index}`} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {String(tag || '')}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-900 mb-2">全体 (11個)</h4>
              <div className="flex flex-wrap gap-2">
                {generatedContent.hashtags.all?.map((tag, index) => (
                  <span key={`all-${index}`} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm">
                    {String(tag || '')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          ページ別コンテンツ ({generatedContent.pages.length}ページ)
        </h3>
        
        {/* INDEXページを最初に表示し、その後は pageNumber でソート */}
        {generatedContent.pages
          .sort((a, b) => {
            if (a.templateType === 'index') return -1
            if (b.templateType === 'index') return 1
            return a.pageNumber - b.pageNumber
          })
          .map((page, index) => (
            <div key={`${page.templateType}-${page.pageNumber}-${index}`}>
              {renderPageContent(page)}
            </div>
          ))}
      </div>
    </div>
  )
}