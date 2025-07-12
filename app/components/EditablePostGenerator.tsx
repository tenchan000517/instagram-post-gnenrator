'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Download, RefreshCw, ChevronLeft, ChevronRight, Edit, Palette, Eye, Save, CheckSquare, Square, PackageOpen } from 'lucide-react'
import { GeneratedContent, GeneratedPage, contentGeneratorService } from '../services/contentGeneratorService'
import { templateMatchingService } from '../services/templateMatchingService'
import { ContentLayoutService } from '../services/contentLayoutService'
import { templateComponents } from './templates'
import { TemplateType } from './templates/TemplateTypes'
import Viewport from './Viewport'
import html2canvas from 'html2canvas'
import { bulkDownloadService, DownloadItem } from '../services/bulkDownloadService'

interface EditablePostGeneratorProps {
  generatedContent: GeneratedContent
  onBack: () => void
  onSave: (content: GeneratedContent) => void
}

export default function EditablePostGenerator({ 
  generatedContent, 
  onBack, 
  onSave 
}: EditablePostGeneratorProps) {
  const [currentContent, setCurrentContent] = useState<GeneratedContent>(generatedContent)
  const [currentPage, setCurrentPage] = useState(0)
  const [isTemplateSelectionMode, setIsTemplateSelectionMode] = useState(false)
  const [selectedPageForTemplateChange, setSelectedPageForTemplateChange] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadItems, setDownloadItems] = useState<DownloadItem[]>([])
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState({ current: 0, total: 0 })
  const previewRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  // Initialize download items
  useEffect(() => {
    const items: DownloadItem[] = currentContent.pages.map(page => ({
      id: `page-${page.pageNumber}`,
      pageNumber: page.pageNumber,
      title: page.content.title || `Page ${page.pageNumber}`,
      selected: false,
      element: pageRefs.current[page.pageNumber - 1] || undefined
    }))
    setDownloadItems(items)
  }, [currentContent])

  // Update page elements after render
  useEffect(() => {
    const timer = setTimeout(() => {
      setDownloadItems(prev => prev.map(item => ({
        ...item,
        element: pageRefs.current[item.pageNumber - 1] || undefined
      })))
    }, 100)
    
    return () => clearTimeout(timer)
  }, [currentContent])

  const handleTemplateChange = async (pageIndex: number, newTemplateType: TemplateType) => {
    const targetPage = currentContent.pages[pageIndex]
    
    // AI再配置を実行（改善要件②対応）
    console.log('🔄 AI再配置を開始:', { pageIndex, newTemplateType })
    
    try {
      // 現在のコンテンツを文字列として再構築
      const pageContent = [
        targetPage.content.title,
        targetPage.content.subtitle,
        targetPage.content.description,
        ...(targetPage.content.items || []),
        ...(targetPage.content.sections?.map(s => `${s.title}: ${s.content}`) || [])
      ].filter(Boolean).join('\n')
      
      // ContentLayoutServiceを使用してAI再配置
      const layoutResult = ContentLayoutService.layoutContentToTemplate(pageContent, newTemplateType)
      
      if (layoutResult.layoutSuccess) {
        console.log('✅ AI再配置成功:', layoutResult)
        
        const updatedPages = currentContent.pages.map((page, index) => {
          if (index === pageIndex) {
            return {
              ...page,
              templateType: newTemplateType,
              templateData: layoutResult.templateData
            }
          }
          return page
        })

        setCurrentContent({
          ...currentContent,
          pages: updatedPages
        })
      } else {
        console.warn('⚠️ AI再配置に問題があります:', layoutResult.layoutNotes)
        
        // 配置に問題があってもテンプレート変更は実行
        const updatedPages = currentContent.pages.map((page, index) => {
          if (index === pageIndex) {
            return {
              ...page,
              templateType: newTemplateType
            }
          }
          return page
        })

        setCurrentContent({
          ...currentContent,
          pages: updatedPages
        })
      }
    } catch (error) {
      console.error('❌ AI再配置エラー:', error)
      
      // エラー発生時も基本的なテンプレート変更は実行
      const updatedPages = currentContent.pages.map((page, index) => {
        if (index === pageIndex) {
          return {
            ...page,
            templateType: newTemplateType
          }
        }
        return page
      })

      setCurrentContent({
        ...currentContent,
        pages: updatedPages
      })
    }

    setIsTemplateSelectionMode(false)
    setSelectedPageForTemplateChange(null)
  }

  const handlePageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 0) {
      setCurrentPage(currentPage - 1)
    } else if (direction === 'next' && currentPage < currentContent.pages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleDownload = async () => {
    const currentPageElement = pageRefs.current[currentPage]
    if (!currentPageElement) {
      alert('ページが見つかりません。少し待ってから再度お試しください。')
      return
    }

    setIsGenerating(true)
    try {
      const canvas = await html2canvas(currentPageElement, {
        background: '#ffffff',
        width: 850,
        height: 899,
        useCORS: true,
        logging: false,
        allowTaint: true,
      })

      const link = document.createElement('a')
      link.download = `instagram-post-page-${currentPage + 1}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Download failed:', error)
      alert('ダウンロードに失敗しました')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = () => {
    onSave(currentContent)
  }

  const handleDownloadItemToggle = (itemId: string) => {
    setDownloadItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, selected: !item.selected } : item
    ))
  }

  const handleSelectAll = () => {
    const allSelected = downloadItems.every(item => item.selected)
    setDownloadItems(prev => prev.map(item => ({ ...item, selected: !allSelected })))
  }

  const handleBulkDownload = async () => {
    const selectedItems = downloadItems.filter(item => item.selected)
    
    if (selectedItems.length === 0) {
      alert('ダウンロードするページを選択してください')
      return
    }

    setIsDownloading(true)
    setDownloadProgress({ current: 0, total: selectedItems.length })

    try {
      // 各ページを単一ダウンロードの方法で順次処理
      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i]
        const pageIndex = item.pageNumber - 1
        
        // 該当ページに移動
        setCurrentPage(pageIndex)
        
        // 少し待機してレンダリング完了を待つ
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // 該当ページの要素を取得
        const currentPageElement = pageRefs.current[pageIndex]
        if (!currentPageElement) {
          console.warn(`Page ${pageIndex + 1} element not found, skipping`)
          continue
        }

        // 単一ダウンロードと同じ方法で画像生成
        const canvas = await html2canvas(currentPageElement, {
            background: '#ffffff',
          width: 850,
          height: 899,
          useCORS: true,
          logging: false,
          allowTaint: true
        })

        // ダウンロード実行
        const link = document.createElement('a')
        link.download = `${item.title}-page-${item.pageNumber}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
        
        // プログレス更新
        setDownloadProgress({ current: i + 1, total: selectedItems.length })
        
        // 次のダウンロードまで少し待機
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    } catch (error) {
      console.error('Bulk download failed:', error)
      if (error instanceof Error) {
        alert(`一括ダウンロードに失敗しました: ${error.message}`)
      } else {
        alert('一括ダウンロードに失敗しました')
      }
    } finally {
      setIsDownloading(false)
      setDownloadProgress({ current: 0, total: 0 })
    }
  }

  const renderCurrentPage = () => {
    const page = currentContent.pages[currentPage]
    if (!page) return null

    const TemplateComponent = templateComponents[page.templateType]
    if (!TemplateComponent) {
      return <div className="text-red-500">テンプレートが見つかりません</div>
    }

    return (
      <TemplateComponent
        data={{
          ...page.templateData,
          pageNumber: page.pageNumber
        }}
      />
    )
  }

  const renderAllPagesForDownload = () => {
    return currentContent.pages.map((page, index) => {
      const TemplateComponent = templateComponents[page.templateType]
      if (!TemplateComponent) return null

      return (
        <div
          key={`download-page-${index}`}
          ref={el => { pageRefs.current[page.pageNumber - 1] = el }}
          style={{
            width: '850px',
            height: '899px',
            position: 'absolute',
            top: '-9999px',
            left: '-9999px',
            zIndex: 1000,
            visibility: 'visible',
            overflow: 'hidden',
            display: 'block'
          }}
        >
          <TemplateComponent
            data={{
              ...page.templateData,
              pageNumber: page.pageNumber
            }}
          />
        </div>
      )
    })
  }

  const renderTemplateSelection = () => {
    if (!isTemplateSelectionMode || selectedPageForTemplateChange === null) return null

    const targetPage = currentContent.pages[selectedPageForTemplateChange]
    const allTemplates = templateMatchingService.getAllTemplatesWithScores(targetPage)

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">テンプレート選択 - {selectedPageForTemplateChange + 1}ページ目</h3>
            <button
              onClick={() => {
                setIsTemplateSelectionMode(false)
                setSelectedPageForTemplateChange(null)
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mb-4 text-sm text-gray-600">
            全{allTemplates.length}種類のテンプレートから選択できます。適合度順に表示されています。
          </div>

          <div className="space-y-3">
            {allTemplates.map((template, index) => (
              <div
                key={template.templateType}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  template.templateType === targetPage.templateType
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleTemplateChange(selectedPageForTemplateChange, template.templateType)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg">{template.displayName}</h4>
                    <p className="text-sm text-gray-600 mt-1">{template.reason}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      適合度: {Math.round(template.score * 100)}%
                    </span>
                    {template.templateType === targetPage.templateType && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        現在使用中
                      </span>
                    )}
                    {index < 3 && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        推奨
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => {
                setIsTemplateSelectionMode(false)
                setSelectedPageForTemplateChange(null)
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={20} />
                戻る
              </button>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-800">投稿エディター</h1>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {currentContent.pages.length}ページ
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedPageForTemplateChange(currentPage)
                  setIsTemplateSelectionMode(true)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
              >
                <Palette size={16} />
                テンプレート変更
              </button>
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {isGenerating ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Download size={16} />
                )}
                単一ダウンロード
              </button>
              <button
                onClick={handleBulkDownload}
                disabled={isDownloading || downloadItems.filter(item => item.selected).length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
              >
                {isDownloading ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <PackageOpen size={16} />
                )}
                一括ダウンロード ({downloadItems.filter(item => item.selected).length})
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                <Save size={16} />
                保存
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* プレビューエリア */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">プレビュー</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {currentPage + 1} / {currentContent.pages.length}
                  </span>
                  <button
                    onClick={() => handlePageNavigation('prev')}
                    disabled={currentPage === 0}
                    className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => handlePageNavigation('next')}
                    disabled={currentPage === currentContent.pages.length - 1}
                    className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <div ref={previewRef}>
                  <Viewport width={850} height={800}>
                    <div ref={el => { pageRefs.current[currentPage] = el }}>
                      {renderCurrentPage()}
                    </div>
                  </Viewport>
                </div>
              </div>

              {/* 一括ダウンロード進捗 */}
              {isDownloading && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <RefreshCw size={16} className="animate-spin text-blue-600" />
                    <span className="text-blue-800 font-medium">
                      ダウンロード中... ({downloadProgress.current}/{downloadProgress.total})
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${downloadProgress.total > 0 ? (downloadProgress.current / downloadProgress.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* ページ一覧 */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">ページ一覧</h3>
                <button
                  onClick={handleSelectAll}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  {downloadItems.every(item => item.selected) ? (
                    <CheckSquare size={16} />
                  ) : (
                    <Square size={16} />
                  )}
                  全選択
                </button>
              </div>
              <div className="space-y-2">
                {currentContent.pages.map((page, index) => {
                  const downloadItem = downloadItems.find(item => item.pageNumber === page.pageNumber)
                  return (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg transition-colors ${
                        index === currentPage
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div 
                          className="flex-1 cursor-pointer"
                          onClick={() => setCurrentPage(index)}
                        >
                          <div className="font-medium text-sm">
                            {index + 1}. {String(page.content.title || 'タイトルなし')}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {templateMatchingService.getRecommendedTemplates(page)[0]?.displayName || page.templateType}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDownloadItemToggle(downloadItem?.id || `page-${page.pageNumber}`)}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="ダウンロード選択"
                          >
                            {downloadItem?.selected ? (
                              <CheckSquare size={16} className="text-green-600" />
                            ) : (
                              <Square size={16} className="text-gray-400" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedPageForTemplateChange(index)
                              setIsTemplateSelectionMode(true)
                            }}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="テンプレート編集"
                          >
                            <Edit size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* キャプション・ハッシュタグ */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">キャプション・ハッシュタグ</h3>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      // キャプション再生成
                      try {
                        console.log('🔄 キャプション再生成開始')
                        setIsGenerating(true)
                        
                        // AI生成を使用してキャプション再生成
                        const newCaption = await contentGeneratorService.regenerateCaption(currentContent)
                        
                        console.log('📝 新しいキャプション:', newCaption)
                        
                        setCurrentContent({
                          ...currentContent,
                          caption: newCaption
                        })
                        
                        console.log('✅ キャプション再生成完了')
                      } catch (error) {
                        console.error('❌ キャプション再生成エラー:', error)
                        alert('キャプション再生成に失敗しました: ' + (error instanceof Error ? error.message : '不明なエラー'))
                      } finally {
                        setIsGenerating(false)
                      }
                    }}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 text-sm"
                  >
                    {isGenerating ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <RefreshCw size={14} />
                    )}
                    キャプション再生成
                  </button>
                  <button
                    onClick={async () => {
                      // ハッシュタグ再生成
                      try {
                        setIsGenerating(true)
                        // 全ページの内容を結合してハッシュタグ生成
                        const contentForHashtags = currentContent.pages.map(page => 
                          `${page.content.title || ''} ${page.content.description || ''} ${page.content.subtitle || ''}`
                        ).join(' ')
                        
                        // HashtagServiceを使用してハッシュタグ生成
                        const { hashtagService } = await import('../config/hashtags')
                        const newHashtags = hashtagService.selectHashtags(contentForHashtags)
                        
                        setCurrentContent({
                          ...currentContent,
                          hashtags: {
                            primary: newHashtags.large,
                            secondary: newHashtags.medium,
                            trending: newHashtags.small,
                            large: newHashtags.large,
                            medium: newHashtags.medium,
                            small: newHashtags.small,
                            all: newHashtags.all
                          }
                        })
                      } catch (error) {
                        alert('ハッシュタグ再生成に失敗しました')
                      } finally {
                        setIsGenerating(false)
                      }
                    }}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 text-sm"
                  >
                    <RefreshCw size={14} />
                    ハッシュタグ再生成
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    キャプション
                  </label>
                  <textarea
                    value={currentContent.caption}
                    onChange={(e) => setCurrentContent({
                      ...currentContent,
                      caption: e.target.value
                    })}
                    className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ハッシュタグ
                  </label>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {currentContent.hashtags.primary.map((tag, index) => (
                        <span key={`primary-${index}`} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                      {currentContent.hashtags.secondary.map((tag, index) => (
                        <span key={`secondary-${index}`} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                      {currentContent.hashtags.trending.map((tag, index) => (
                        <span key={`trending-${index}`} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    統合コピー用（キャプション + ハッシュタグ）
                  </label>
                  <div className="relative">
                    <textarea
                      value={`${currentContent.caption}\n\n${currentContent.hashtags.all.join(' ')}`}
                      readOnly
                      className="w-full p-3 border rounded-md resize-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={6}
                    />
                    <button
                      onClick={() => {
                        const combinedText = `${currentContent.caption}\n\n${currentContent.hashtags.all.join(' ')}`
                        navigator.clipboard.writeText(combinedText)
                        // 簡単なフィードバックを表示
                        const btn = document.activeElement as HTMLButtonElement
                        const originalText = btn.textContent
                        btn.textContent = 'コピー完了！'
                        setTimeout(() => {
                          btn.textContent = originalText
                        }, 1000)
                      }}
                      className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      コピー
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* テンプレート選択モーダル */}
      {renderTemplateSelection()}

      {/* 一括ダウンロード用の隠しページ */}
      <div style={{ position: 'relative' }}>
        {renderAllPagesForDownload()}
      </div>
    </div>
  )
}