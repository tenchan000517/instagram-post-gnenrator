'use client'

import { useState } from 'react'
import { RefreshCw, Check, X, Eye, EyeOff, Edit, Sparkles } from 'lucide-react'
import { GeneratedContent, GeneratedPage, contentGeneratorService } from '../services/contentGeneratorService'
import { TemplateType } from './templates'

interface ContentApprovalComponentProps {
  generatedContent: GeneratedContent
  onApprove: (content: GeneratedContent) => void
  onReject: () => void
  onContentUpdate: (content: GeneratedContent) => void
}

export default function ContentApprovalComponent({
  generatedContent,
  onApprove,
  onReject,
  onContentUpdate
}: ContentApprovalComponentProps) {
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [regeneratingPage, setRegeneratingPage] = useState<number | null>(null)
  const [expandedPages, setExpandedPages] = useState<Set<number>>(new Set([1]))
  const [editingInstructions, setEditingInstructions] = useState<{ [key: number]: string }>({})

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

  const getTemplateTypeDisplayName = (templateType: TemplateType): string => {
    const typeMap: Record<TemplateType, string> = {
      enumeration: '列挙型',
      explanation: '説明型',
      explanation2: '解説型2',
      list: 'リスト型',
      simple: 'シンプル型',
      simple2: 'シンプル型2',
      simple3: 'シンプル型3',
      simple4: 'シンプル型4',
      simple5: 'シンプル型5',
      simple6: 'シンプル型6',
      story: 'ストーリー型',
      table: '表型'
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
          <h3 className="font-medium text-purple-900 mb-2">キャプション</h3>
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
        
        {generatedContent.pages.map((page) => (
          <div key={page.pageNumber}>
            {renderPageContent(page)}
          </div>
        ))}
      </div>
    </div>
  )
}