'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Download, RefreshCw, ChevronLeft, ChevronRight, Edit, Palette, Eye, Save, CheckSquare, Square, PackageOpen } from 'lucide-react'
import { GeneratedContent, GeneratedPage } from '../services/contentGeneratorService'
import { templateMatchingService } from '../services/templateMatchingService'
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
      element: pageRefs.current[page.pageNumber - 1]
    }))
    setDownloadItems(items)
  }, [currentContent])

  // Update page elements after render
  useEffect(() => {
    const timer = setTimeout(() => {
      setDownloadItems(prev => prev.map(item => ({
        ...item,
        element: pageRefs.current[item.pageNumber - 1]
      })))
    }, 100)
    
    return () => clearTimeout(timer)
  }, [currentContent])

  const handleTemplateChange = (pageIndex: number, newTemplateType: TemplateType) => {
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
        scale: 2,
        backgroundColor: '#ffffff',
        width: 850,
        height: 899,
        useCORS: true,
        logging: false,
        allowTaint: true,
        foreignObjectRendering: false,
        removeContainer: false,
        ignoreElements: (element: Element) => {
          // iframeやsvgなどの問題要素を無視
          return element.tagName === 'IFRAME' || element.tagName === 'SVG'
        }
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
        
        // 現在表示中のページ要素を取得（単一ダウンロードと同じ方法）
        const currentPageElement = pageRefs.current[currentPage]
        if (!currentPageElement) {
          console.warn(`Page ${pageIndex + 1} element not found, skipping`)
          continue
        }

        // 単一ダウンロードと同じ方法で画像生成
        const canvas = await html2canvas(currentPageElement, {
          scale: 2,
          backgroundColor: '#ffffff',
          width: 850,
          height: 899,
          useCORS: true,
          logging: false,
          allowTaint: true,
          foreignObjectRendering: false,
          removeContainer: false,
          ignoreElements: (element: Element) => {
            return element.tagName === 'IFRAME' || element.tagName === 'SVG'
          }
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
        data={page.templateData}
        pageNumber={currentPage + 1}
        totalPages={currentContent.pages.length}
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
          ref={el => pageRefs.current[index] = el}
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
            data={page.templateData}
            pageNumber={index + 1}
            totalPages={currentContent.pages.length}
          />
        </div>
      )
    })
  }

  const renderTemplateSelection = () => {
    if (!isTemplateSelectionMode || selectedPageForTemplateChange === null) return null

    const targetPage = currentContent.pages[selectedPageForTemplateChange]
    const recommendations = templateMatchingService.getRecommendedTemplates(targetPage)

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

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={rec.templateType}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  rec.templateType === targetPage.templateType
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleTemplateChange(selectedPageForTemplateChange, rec.templateType)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg">{rec.displayName}</h4>
                    <p className="text-sm text-gray-600 mt-1">{rec.reason}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      適合度: {Math.round(rec.score * 100)}%
                    </span>
                    {rec.templateType === targetPage.templateType && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        現在使用中
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
                    <div ref={el => pageRefs.current[currentPage] = el}>
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
              <h3 className="text-lg font-semibold mb-4">キャプション・ハッシュタグ</h3>
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
                    </div>
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