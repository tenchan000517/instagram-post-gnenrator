'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Download, RefreshCw, ChevronLeft, ChevronRight, Edit, Palette, Eye, Save, CheckSquare, Square, PackageOpen } from 'lucide-react'
import { GeneratedContent, GeneratedPage, contentGeneratorService } from '../services/contentGeneratorService'
import { templateMatchingService } from '../services/templateMatchingService'
import { ContentLayoutService } from '../services/contentLayoutService'
import { templateComponents } from './templates'
import { TemplateType } from './templates/TemplateTypes'
import { templateRegistry } from './templates/TemplateRegistry'
import Viewport from './Viewport'
import html2canvas from 'html2canvas'
import { bulkDownloadService, DownloadItem } from '../services/bulkDownloadService'
import { DynamicFieldDetector } from '../services/dynamicFieldDetector'
import { ItemNTitleContentEditor } from './editors/ItemNTitleContentEditor'
import { ChecklistEnhancedEditor } from './editors/ChecklistEnhancedEditor'
import { Simple5Editor } from './editors/Simple5Editor'
import { EnumerationEditor } from './editors/EnumerationEditor'
import { RankingEditor } from './editors/RankingEditor'
import { SimpleThreeEditor } from './editors/SimpleThreeEditor'
import { SectionItemsEditor } from './editors/SectionItemsEditor'
import { GraphEditor } from './editors/GraphEditor'
import { ExplanationTwoEditor } from './editors/ExplanationTwoEditor'
import { ListEditor } from './editors/ListEditor'
import { TableEditor } from './editors/TableEditor'
import { SimpleSixEditor } from './editors/SimpleSixEditor'
import { IndexEditor } from './editors/IndexEditor'
import { SingleSectionNoItemsEditor } from './editors/SingleSectionNoItemsEditor'
import { TwoColumnSectionItemsEditor } from './editors/TwoColumnSectionItemsEditor'
import { DualEnumerationEditor } from './editors/DualEnumerationEditor'
import { AchievementSummaryEditor } from './editors/AchievementSummaryEditor'
import { ToolsIntroEditor } from './editors/ToolsIntroEditor'
import { MultipleItemsDisplayEditor } from './editors/MultipleItemsDisplayEditor'
import { BasicIntroEditor } from './editors/BasicIntroEditor'
import { SectionBlocksEditor } from './editors/SectionBlocksEditor'

interface EditablePostGeneratorProps {
  generatedContent: GeneratedContent
  onBack: () => void
  onSave: (content: GeneratedContent) => void
  mainTheme?: string // INDEXページ生成用
}

export default function EditablePostGenerator({ 
  generatedContent, 
  onBack, 
  onSave,
  mainTheme
}: EditablePostGeneratorProps) {
  const [currentContent, setCurrentContent] = useState<GeneratedContent>(generatedContent)
  const [currentPage, setCurrentPage] = useState(0)
  const [isTemplateSelectionMode, setIsTemplateSelectionMode] = useState(false)
  const [selectedPageForTemplateChange, setSelectedPageForTemplateChange] = useState<number | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingPage, setEditingPage] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadItems, setDownloadItems] = useState<DownloadItem[]>([])
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState({ current: 0, total: 0 })
  const [includeMiddleFooter, setIncludeMiddleFooter] = useState(false)
  const [includeEndFooter, setIncludeEndFooter] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const pageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})         // プレビュー用
  const downloadPageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({}) // ダウンロード用

  // 固定フッター定義
  const getMiddleFooter = () => `

━━━━━━━━━━━━━━━━━━━━

「自分には何もない」から
「自分にはこれがある」が見つかるコミュニティ

最初は誰でも初心者。
ここで見つけた「得意」が、人生を変えるきっかけになる。

一人で頑張るより、みんなで挑戦する方が圧倒的に早く成長できる。

プロフィール欄のURLからお気軽にご参加ください！

@find_to_do`
  
  const getEndFooter = () => `

━━━━━━━━━━━━━━━━━━━━

いいね・コメント・シェアありがとうございます！

FIND to DO(@find_to_do)では
✅ 毎日就活に役立つクイズをストーリーで配信
✅ 開催イベントの情報をお届け
✅ 就活に役立つノウハウを配信中

フォローして参考にしてください！

━━━━━━━━━━━━━━━━━━━━`

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
    // 隠し要素から対象ページを取得（一括ダウンロードと同じ方式）
    const targetPage = currentContent.pages[currentPage]
    const pageIndex = targetPage.pageNumber - 1
    const currentPageElement = downloadPageRefs.current[pageIndex]
    
    if (!currentPageElement) {
      alert('ページが見つかりません。少し待ってから再度お試しください。')
      return
    }

    setIsGenerating(true)
    try {
      // フォントのロード完了を待つ
      try {
        await document.fonts.ready;
        console.log('✅ フォントロード完了（単一ページ）');
      } catch (error) {
        console.warn('⚠️ フォントロード待機中にエラー（単一ページ）:', error);
      }
      
      // 追加で少し待機してフォントが確実に適用されるようにする
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 実際の要素の高さを取得
      const actualHeight = currentPageElement.offsetHeight
      console.log('📸 Single download element height:', actualHeight)
      
      const canvas = await html2canvas(currentPageElement, {
        background: '#ffffff',
        width: 850,
        height: actualHeight, // 固定値ではなく実際の高さを使用
        useCORS: true,
        allowTaint: false
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

  const handlePageTextEdit = (pageIndex: number, field: string, value: string) => {
    const updatedPages = currentContent.pages.map((page, index) => {
      if (index === pageIndex) {
        return {
          ...page,
          templateData: {
            ...page.templateData,
            [field]: value
          }
        }
      }
      return page
    })

    setCurrentContent({
      ...currentContent,
      pages: updatedPages
    })
  }

  const handlePageDataUpdate = (pageIndex: number, newData: any) => {
    const updatedPages = currentContent.pages.map((page, index) => {
      if (index === pageIndex) {
        return {
          ...page,
          templateData: {
            ...page.templateData,
            ...newData
          }
        }
      }
      return page
    })
    setCurrentContent({
      ...currentContent,
      pages: updatedPages
    })
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

    try {
      // 選択されたページでINDEXを生成
      let pagesToDownload = selectedItems
      
      if (mainTheme && selectedItems.length > 1) {
        const selectedPages = selectedItems.map(item => {
          const page = currentContent.pages.find(p => p.pageNumber === item.pageNumber)
          return page
        }).filter(Boolean) as GeneratedPage[]
        
        const pagesWithIndex = contentGeneratorService.generateIndexForSelectedPages(selectedPages, mainTheme)
        
        // INDEXページを含めてダウンロード対象を更新
        pagesToDownload = pagesWithIndex.map((page, index) => ({
          id: `page-${page.pageNumber}`,
          pageNumber: page.pageNumber,
          title: page.content.title || `Page ${page.pageNumber}`,
          selected: true,
          element: undefined // 動的に生成されるため、後で設定
        }))
        
        console.log('📥 選択ページ用INDEXページ生成完了', { 
          original: selectedItems.length, 
          withIndex: pagesToDownload.length 
        })
      }

      setDownloadProgress({ current: 0, total: pagesToDownload.length })

      // 各ページを単一ダウンロードの方法で順次処理
      for (let i = 0; i < pagesToDownload.length; i++) {
        const item = pagesToDownload[i]
        
        // INDEXページの場合は特別処理
        if (item.pageNumber === 0) {
          // INDEXページを一時的にレンダリング
          const tempIndexPage = currentContent.pages.find(p => p.pageNumber === 0 && p.templateType === 'index')
          if (tempIndexPage) {
            setCurrentPage(0) // INDEXページに移動
            await new Promise(resolve => setTimeout(resolve, 500))
            
            const currentPageElement = pageRefs.current[0]
            if (currentPageElement) {
              await downloadSinglePage(currentPageElement, 'INDEX')
            }
          }
        } else {
          const pageIndex = item.pageNumber - 1
          
          // 該当ページに移動
          setCurrentPage(pageIndex)
          
          // 少し待機してレンダリング完了を待つ
          await new Promise(resolve => setTimeout(resolve, 500))
          
          // 該当ページの要素を取得
          const currentPageElement = downloadPageRefs.current[pageIndex]
          if (!currentPageElement) {
            console.warn(`Page ${pageIndex + 1} element not found, skipping`)
            continue
          }

          // 単一ダウンロードと同じ方法で画像生成
          await downloadSinglePage(currentPageElement, `page-${item.pageNumber}`)
        }

        setDownloadProgress({ current: i + 1, total: pagesToDownload.length })
      }

      alert(`${pagesToDownload.length}ページのダウンロードが完了しました！`)
    } catch (error) {
      console.error('Bulk download failed:', error)
      alert('一括ダウンロードに失敗しました')
    } finally {
      setIsDownloading(false)
      setDownloadProgress({ current: 0, total: 0 })
    }
  }

  const downloadSinglePage = async (element: HTMLDivElement, filename: string) => {
    // フォントのロード完了を待つ
    try {
      await document.fonts.ready;
      console.log('✅ フォントロード完了');
    } catch (error) {
      console.warn('⚠️ フォントロード待機中にエラー:', error);
    }
    
    // 追加で少し待機してフォントが確実に適用されるようにする
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 実際の要素の高さを取得
    const actualHeight = element.offsetHeight
    console.log('📸 Download element height:', actualHeight, 'for', filename)
    
    const canvas = await html2canvas(element, {
      background: '#ffffff',
      width: 850,
      height: actualHeight, // 固定値ではなく実際の高さを使用
      useCORS: true,
      allowTaint: true
    })

    // ダウンロード実行
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const renderCurrentPage = () => {
    const page = currentContent.pages[currentPage]
    if (!page) return null

    const TemplateComponent = templateComponents[page.templateType]
    if (!TemplateComponent) {
      return <div className="text-red-500">テンプレートが見つかりません</div>
    }

    // unifiedテンプレートリスト
    const unifiedTemplates = [
      'section_blocks', 'item_list', 'dual_section', 'ranking_display',
      'item_grid', 'comparison', 'unified_company_detail', 'dynamic_boxes', 
      'image_point', 'simple_intro'
    ]
    
    return (
      <TemplateComponent
        data={{
          ...page.templateData,
          pageNumber: page.pageNumber
        }}
        {...(page.templateType === 'basic_intro' || page.templateType === 'simple_intro' ? {
          postType: generatedContent.postType || '001',
          targetId: generatedContent.targetId || 'T001'
        } : page.templateType === 'achievement_summary' || unifiedTemplates.includes(page.templateType) ? {
          targetId: generatedContent.targetId || 'T001'
        } : {})}
      />
    )
  }

  const renderAllPagesForDownload = () => {
    // unifiedテンプレートリスト
    const unifiedTemplates = [
      'section_blocks', 'item_list', 'dual_section', 'ranking_display',
      'item_grid', 'comparison', 'unified_company_detail', 'dynamic_boxes', 
      'image_point', 'simple_intro'
    ]
    
    return currentContent.pages.map((page, index) => {
      const TemplateComponent = templateComponents[page.templateType]
      if (!TemplateComponent) return null

      // アイテム数に基づいて高さを計算
      const calculateHeight = () => {
        // 独立ボックス構造の場合
        if (page.templateType === 'item-n-title-content') {
          const itemCount = getItemCountForPage(page)
          
          if (itemCount >= 4) {
            // 4個以上の場合は高さを拡張、5個以上は改行考慮で追加余白
            const baseHeight = 280 + (itemCount * 170)
            const extraPadding = itemCount >= 5 ? 50 : 0 // 5個以上の場合は50px追加
            const calculatedHeight = `${baseHeight + extraPadding}px`
            return calculatedHeight
          }
        }
        // デフォルトの高さ
        return '899px'
      }

      const finalHeight = calculateHeight()

      return (
        <div
          key={`download-page-${index}`}
          ref={el => { downloadPageRefs.current[page.pageNumber - 1] = el }}
          style={{
            width: '850px',
            height: finalHeight,
            minHeight: '899px',
            position: 'fixed',
            top: '0',
            left: '-100vw',
            zIndex: 9999,
            visibility: 'visible',
            overflow: 'visible', // hiddenからvisibleに変更
            display: 'block',
            backgroundColor: '#ffffff',
            fontFamily: 'inherit'
          }}
        >
          <TemplateComponent
            data={{
              ...page.templateData,
              pageNumber: page.pageNumber
            }}
            {...(page.templateType === 'basic_intro' || page.templateType === 'simple_intro' ? {
              postType: generatedContent.postType || '001',
              targetId: generatedContent.targetId || 'T001'
            } : page.templateType === 'achievement_summary' || unifiedTemplates.includes(page.templateType) ? {
              targetId: generatedContent.targetId || 'T001'
            } : {})}
          />
        </div>
      )
    })
  }

  // ページのアイテム数を取得するヘルパー関数
  const getItemCountForPage = (page: GeneratedPage) => {
    const data = page.templateData as any
    let count = 0
    
    // itemNTitle/Content形式をチェック
    for (let i = 1; i <= 6; i++) {
      if (data[`item${i}Title`] || data[`item${i}Content`]) {
        count++
      }
    }
    
    // 通常のitems配列もチェック
    if (count === 0 && data.items) {
      count = Array.isArray(data.items) ? data.items.length : 0
    }
    
    return count
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

  const renderTextEditModal = () => {
    if (!isEditMode || editingPage === null) return null

    const page = currentContent.pages[editingPage]
    if (!page) return null

    const handleArrayItemEdit = (field: string, index: number, itemField: string, value: string) => {
      const updatedPages = currentContent.pages.map((p, i) => {
        if (i === editingPage) {
          const currentArray = p.templateData?.[field] || []
          const updatedArray = [...currentArray]
          if (updatedArray[index]) {
            updatedArray[index] = {
              ...updatedArray[index],
              [itemField]: value
            }
          }
          return {
            ...p,
            templateData: {
              ...p.templateData,
              [field]: updatedArray
            }
          }
        }
        return p
      })

      setCurrentContent({
        ...currentContent,
        pages: updatedPages
      })
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">ページ {editingPage + 1} - テキスト編集 ({templateRegistry[page.templateType]?.name || page.templateType})</h3>
            <button
              onClick={() => {
                setIsEditMode(false)
                setEditingPage(null)
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* デバッグ情報 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <h4 className="text-sm font-semibold text-yellow-800 mb-2">デバッグ情報</h4>
              <pre className="text-xs text-yellow-700 whitespace-pre-wrap">
                {JSON.stringify({
                  templateType: page.templateType,
                  hasItems: !!page.templateData?.items,
                  itemsLength: page.templateData?.items?.length || 0,
                  hasSteps: !!page.templateData?.steps,
                  hasPoints: !!page.templateData?.points,
                  hasBoxes: !!page.templateData?.boxes,
                  templateDataKeys: Object.keys(page.templateData || {})
                }, null, 2)}
              </pre>
            </div>

            {/* 基本フィールド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
                <input
                  type="text"
                  value={page.templateData?.title || ''}
                  onChange={(e) => handlePageTextEdit(editingPage, 'title', e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">サブタイトル</label>
                <input
                  type="text"
                  value={page.templateData?.subtitle || ''}
                  onChange={(e) => handlePageTextEdit(editingPage, 'subtitle', e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">メインコンテンツ</label>
              <textarea
                value={page.templateData?.content || ''}
                onChange={(e) => handlePageTextEdit(editingPage, 'content', e.target.value)}
                className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            
            {/* ItemNTitleContentTemplate専用エディタ */}
            {page.templateType === 'item-n-title-content' && (
              <div className="border-t pt-6 mt-6">
                <ItemNTitleContentEditor
                  data={page.templateData}
                  onUpdate={(field, value) => handlePageTextEdit(editingPage, field, value)}
                  onDataUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}

            {/* ChecklistEnhancedTemplate専用エディタ */}
            {page.templateType === 'checklist-enhanced' && (
              <div className="border-t pt-6 mt-6">
                <ChecklistEnhancedEditor
                  data={page.templateData}
                  onUpdate={(field, value) => handlePageTextEdit(editingPage, field, value)}
                  onDataUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}

            {/* Simple5Template専用エディタ */}
            {page.templateType === 'simple5' && (
              <div className="border-t pt-6 mt-6">
                <Simple5Editor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {page.templateType === 'enumeration' && (
              <div className="border-t pt-6 mt-6">
                <EnumerationEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {page.templateType === 'ranking' && (
              <div className="border-t pt-6 mt-6">
                <RankingEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {page.templateType === 'simple3' && (
              <div className="border-t pt-6 mt-6">
                <SimpleThreeEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {page.templateType === 'section-items' && (
              <div className="border-t pt-6 mt-6">
                <SectionItemsEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {page.templateType === 'graph' && (
              <div className="border-t pt-6 mt-6">
                <GraphEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {page.templateType === 'explanation2' && (
              <div className="border-t pt-6 mt-6">
                <ExplanationTwoEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {page.templateType === 'list' && (
              <div className="border-t pt-6 mt-6">
                <ListEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {page.templateType === 'table' && (
              <div className="border-t pt-6 mt-6">
                <TableEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {page.templateType === 'simple6' && (
              <div className="border-t pt-6 mt-6">
                <SimpleSixEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {/* IndexTemplate専用エディタ */}
            {page.templateType === 'index' && (
              <div className="border-t pt-6 mt-6">
                <IndexEditor
                  data={page.templateData}
                  onUpdate={(field, value) => handlePageTextEdit(editingPage, field, value)}
                  onDataUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {/* SingleSectionNoItemsTemplate専用エディタ */}
            {page.templateType === 'single-section-no-items' && (
              <div className="border-t pt-6 mt-6">
                <SingleSectionNoItemsEditor
                  data={page.templateData}
                  onUpdate={(field, value) => handlePageTextEdit(editingPage, field, value)}
                  onDataUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {/* TwoColumnSectionItemsTemplate専用エディタ */}
            {page.templateType === 'two-column-section-items' && (
              <div className="border-t pt-6 mt-6">
                <TwoColumnSectionItemsEditor
                  data={page.templateData}
                  onUpdate={(field, value) => handlePageTextEdit(editingPage, field, value)}
                  onDataUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {/* DualEnumerationTemplate専用エディタ */}
            {page.templateType === 'dual_enumeration' && (
              <div className="border-t pt-6 mt-6">
                <DualEnumerationEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {/* AchievementSummaryTemplate専用エディタ */}
            {page.templateType === 'achievement_summary' && (
              <div className="border-t pt-6 mt-6">
                <AchievementSummaryEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {/* ToolsIntroTemplate専用エディタ */}
            {page.templateType === 'tools_intro' && (
              <div className="border-t pt-6 mt-6">
                <ToolsIntroEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {/* MultipleItemsDisplayTemplate専用エディタ */}
            {page.templateType === 'multiple_items_display' && (
              <div className="border-t pt-6 mt-6">
                <MultipleItemsDisplayEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}
            {/* BasicIntroTemplate専用エディタ */}
            {page.templateType === 'basic_intro' && (
              <div className="border-t pt-6 mt-6">
                <BasicIntroEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}

            {/* SectionBlocks専用エディタ */}
            {page.templateType === 'section_blocks' && (
              <div className="border-t pt-6 mt-6">
                <SectionBlocksEditor
                  data={page.templateData}
                  onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
                />
              </div>
            )}

            {/* Unified Templates専用エディタ */}
            {(
              page.templateType === 'simple_intro' ||
              page.templateType === 'dual_section' ||
              page.templateType === 'ranking_display' ||
              page.templateType === 'item_grid' ||
              page.templateType === 'comparison' ||
              page.templateType === 'company_detail' ||
              page.templateType === 'item_list' ||
              page.templateType === 'dynamic_boxes' ||
              page.templateType === 'image_point'
            ) && (
              <div className="border-t pt-6 mt-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3">統一テンプレート編集</h4>
                  <p className="text-blue-700 mb-4">テンプレートタイプ: {page.templateType}</p>
                  
                  <div className="space-y-6">
                    {/* 基本フィールド */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* descriptionフィールド */}
                      {page.templateData?.description !== undefined && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">説明文</label>
                          <textarea
                            value={page.templateData.description || ''}
                            onChange={(e) => handlePageDataUpdate(editingPage, { description: e.target.value })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="説明文を入力"
                          />
                        </div>
                      )}
                      
                      {/* imageSrcフィールド */}
                      {(page.templateData?.imageSrc !== undefined || page.templateData?.image !== undefined) && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">画像URL</label>
                          <input
                            type="text"
                            value={page.templateData.imageSrc || page.templateData.image || ''}
                            onChange={(e) => handlePageDataUpdate(editingPage, { 
                              imageSrc: e.target.value,
                              image: e.target.value 
                            })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="画像URLを入力"
                          />
                        </div>
                      )}
                      
                      {/* imageAltフィールド */}
                      {page.templateData?.imageAlt !== undefined && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">画像代替テキスト</label>
                          <input
                            type="text"
                            value={page.templateData.imageAlt || ''}
                            onChange={(e) => handlePageDataUpdate(editingPage, { imageAlt: e.target.value })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="画像代替テキスト"
                          />
                        </div>
                      )}

                      {/* displayTypeフィールド (Rankingテンプレート用) */}
                      {page.templateData?.displayType !== undefined && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">表示タイプ</label>
                          <select
                            value={page.templateData.displayType || 'ranking'}
                            onChange={(e) => handlePageDataUpdate(editingPage, { displayType: e.target.value })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="ranking">ランキング</option>
                            <option value="tier">Tier</option>
                          </select>
                        </div>
                      )}

                      {/* noteフィールド */}
                      {page.templateData?.note !== undefined && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">注釈</label>
                          <input
                            type="text"
                            value={page.templateData.note || ''}
                            onChange={(e) => handlePageDataUpdate(editingPage, { note: e.target.value })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="注釈を入力"
                          />
                        </div>
                      )}

                      {/* sourceフィールド */}
                      {page.templateData?.source !== undefined && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">出典</label>
                          <input
                            type="text"
                            value={page.templateData.source || ''}
                            onChange={(e) => handlePageDataUpdate(editingPage, { source: e.target.value })}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="出典を入力"
                          />
                        </div>
                      )}
                    </div>

                    {/* 複雑アイテム編集 (DualSection, Ranking等) */}
                    {page.templateData?.items && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">アイテムリスト</label>
                        <div className="space-y-4">
                          {page.templateData.items.map((item: any, index: number) => (
                            <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white">
                              <div className="flex justify-between items-center mb-3">
                                <h5 className="font-medium text-gray-800">アイテム {index + 1}</h5>
                                <button
                                  onClick={() => {
                                    const newItems = [...page.templateData.items]
                                    newItems.splice(index, 1)
                                    handlePageDataUpdate(editingPage, { items: newItems })
                                  }}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  削除
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {/* タイトル/名前 */}
                                {(item.title !== undefined || item.name !== undefined) && (
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">タイトル/名前</label>
                                    <input
                                      type="text"
                                      value={item.title || item.name || ''}
                                      onChange={(e) => {
                                        const newItems = [...page.templateData.items]
                                        newItems[index] = {
                                          ...item,
                                          title: e.target.value,
                                          name: e.target.value
                                        }
                                        handlePageDataUpdate(editingPage, { items: newItems })
                                      }}
                                      className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                )}
                                
                                {/* 番号/ランク */}
                                {(item.number !== undefined || item.rank !== undefined) && (
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">番号/ランク</label>
                                    <input
                                      type="number"
                                      value={item.number || item.rank || ''}
                                      onChange={(e) => {
                                        const newItems = [...page.templateData.items]
                                        newItems[index] = {
                                          ...item,
                                          number: parseInt(e.target.value) || 0,
                                          rank: parseInt(e.target.value) || 0
                                        }
                                        handlePageDataUpdate(editingPage, { items: newItems })
                                      }}
                                      className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                )}
                                
                                {/* メイン値 */}
                                {item.primaryValue !== undefined && (
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">メイン値</label>
                                    <input
                                      type="text"
                                      value={item.primaryValue || ''}
                                      onChange={(e) => {
                                        const newItems = [...page.templateData.items]
                                        newItems[index] = {
                                          ...item,
                                          primaryValue: e.target.value
                                        }
                                        handlePageDataUpdate(editingPage, { items: newItems })
                                      }}
                                      className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                )}
                                
                                {/* サブ値 */}
                                {item.secondaryValue !== undefined && (
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">サブ値</label>
                                    <input
                                      type="text"
                                      value={item.secondaryValue || ''}
                                      onChange={(e) => {
                                        const newItems = [...page.templateData.items]
                                        newItems[index] = {
                                          ...item,
                                          secondaryValue: e.target.value
                                        }
                                        handlePageDataUpdate(editingPage, { items: newItems })
                                      }}
                                      className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                )}
                                
                                {/* カテゴリ */}
                                {item.category !== undefined && (
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">カテゴリ</label>
                                    <input
                                      type="text"
                                      value={item.category || ''}
                                      onChange={(e) => {
                                        const newItems = [...page.templateData.items]
                                        newItems[index] = {
                                          ...item,
                                          category: e.target.value
                                        }
                                        handlePageDataUpdate(editingPage, { items: newItems })
                                      }}
                                      className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                )}
                                
                                {/* 画像URL */}
                                {(item.imageSrc !== undefined || item.image !== undefined) && (
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">画像URL</label>
                                    <input
                                      type="text"
                                      value={item.imageSrc || item.image || ''}
                                      onChange={(e) => {
                                        const newItems = [...page.templateData.items]
                                        newItems[index] = {
                                          ...item,
                                          imageSrc: e.target.value,
                                          image: e.target.value
                                        }
                                        handlePageDataUpdate(editingPage, { items: newItems })
                                      }}
                                      className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                  </div>
                                )}
                              </div>
                              
                              {/* 説明/コンテンツ */}
                              {(item.description !== undefined || item.content !== undefined) && (
                                <div className="mt-3">
                                  <label className="block text-xs text-gray-600 mb-1">説明/コンテンツ</label>
                                  <textarea
                                    value={item.description || item.content || ''}
                                    onChange={(e) => {
                                      const newItems = [...page.templateData.items]
                                      newItems[index] = {
                                        ...item,
                                        description: e.target.value,
                                        content: e.target.value
                                      }
                                      handlePageDataUpdate(editingPage, { items: newItems })
                                    }}
                                    className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    rows={2}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                          
                          <button
                            onClick={() => {
                              const newItem = {
                                title: '',
                                name: '',
                                description: '',
                                content: '',
                                number: page.templateData.items.length + 1,
                                rank: page.templateData.items.length + 1,
                                primaryValue: '',
                                secondaryValue: '',
                                category: '',
                                imageSrc: '',
                                image: ''
                              }
                              const newItems = [...page.templateData.items, newItem]
                              handlePageDataUpdate(editingPage, { items: newItems })
                            }}
                            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                          >
                            + アイテムを追加
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* セクション編集 */}
                    {page.templateData?.sections && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">セクション</label>
                        <div className="space-y-3">
                          {page.templateData.sections.map((section: any, index: number) => (
                            <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white">
                              <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium text-gray-800">セクション {index + 1}</h5>
                                <button
                                  onClick={() => {
                                    const newSections = [...page.templateData.sections]
                                    newSections.splice(index, 1)
                                    handlePageDataUpdate(editingPage, { sections: newSections })
                                  }}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  削除
                                </button>
                              </div>
                              <input
                                type="text"
                                value={section.title || ''}
                                onChange={(e) => {
                                  const newSections = [...page.templateData.sections]
                                  newSections[index] = {
                                    ...section,
                                    title: e.target.value
                                  }
                                  handlePageDataUpdate(editingPage, { sections: newSections })
                                }}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                                placeholder={`セクション ${index + 1} タイトル`}
                              />
                              <textarea
                                value={section.content || ''}
                                onChange={(e) => {
                                  const newSections = [...page.templateData.sections]
                                  newSections[index] = {
                                    ...section,
                                    content: e.target.value
                                  }
                                  handlePageDataUpdate(editingPage, { sections: newSections })
                                }}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder={`セクション ${index + 1} 内容`}
                              />
                            </div>
                          ))}
                          
                          <button
                            onClick={() => {
                              const newSection = { title: '', content: '' }
                              const newSections = [...(page.templateData.sections || []), newSection]
                              handlePageDataUpdate(editingPage, { sections: newSections })
                            }}
                            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                          >
                            + セクションを追加
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Steps編集 (simple5用) */}
            {page.templateData?.steps && (
              <div>
                <h4 className="text-lg font-semibold mb-3">ステップ</h4>
                <div className="space-y-3">
                  {page.templateData.steps.map((step: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">ステップ {step.step}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
                          <input
                            type="text"
                            value={step.title || ''}
                            onChange={(e) => handleArrayItemEdit('steps', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
                          <textarea
                            value={step.description || ''}
                            onChange={(e) => handleArrayItemEdit('steps', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Points編集 (explanation2用) */}
            {page.templateData?.points && (
              <div>
                <h4 className="text-lg font-semibold mb-3">ポイント</h4>
                <div className="space-y-3">
                  {page.templateData.points.map((point: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
                          <input
                            type="text"
                            value={point.title || ''}
                            onChange={(e) => handleArrayItemEdit('points', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
                          <textarea
                            value={point.description || ''}
                            onChange={(e) => handleArrayItemEdit('points', index, 'description', e.target.value)}
                            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Items編集 (enumeration等用) */}
            {page.templateData?.items && page.templateData.items.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3">アイテム ({page.templateData.items.length}個)</h4>
                <div className="space-y-3">
                  {page.templateData.items.map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      {typeof item === 'string' ? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">アイテム {index + 1}</label>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const updatedPages = currentContent.pages.map((p, i) => {
                                if (i === editingPage) {
                                  const updatedItems = [...(p.templateData?.items || [])]
                                  updatedItems[index] = e.target.value
                                  return {
                                    ...p,
                                    templateData: {
                                      ...p.templateData,
                                      items: updatedItems
                                    }
                                  }
                                }
                                return p
                              })
                              setCurrentContent({ ...currentContent, pages: updatedPages })
                            }}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
                            <input
                              type="text"
                              value={item.title || ''}
                              onChange={(e) => handleArrayItemEdit('items', index, 'title', e.target.value)}
                              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                            <textarea
                              value={item.content || ''}
                              onChange={(e) => handleArrayItemEdit('items', index, 'content', e.target.value)}
                              className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                              rows={2}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Boxes編集 (simple2用) */}
            {page.templateData?.boxes && (
              <div>
                <h4 className="text-lg font-semibold mb-3">ボックス</h4>
                <div className="space-y-3">
                  {page.templateData.boxes.map((box: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
                          <input
                            type="text"
                            value={box.title || ''}
                            onChange={(e) => handleArrayItemEdit('boxes', index, 'title', e.target.value)}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
                          <textarea
                            value={box.content || ''}
                            onChange={(e) => handleArrayItemEdit('boxes', index, 'content', e.target.value)}
                            className="w-full p-2 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => {
                setIsEditMode(false)
                setEditingPage(null)
              }}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              閉じる
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
                  <Viewport width={850} height={899}>
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
                            {index + 1}. {page.templateData?.title || page.content?.title || 'タイトルなし'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {templateRegistry[page.templateType]?.name || page.templateType}
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
                              setEditingPage(index)
                              setIsEditMode(true)
                            }}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="テキスト編集"
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
                        const newHashtags = hashtagService.selectHashtags(contentForHashtags, [], currentContent.targetId, currentContent.postType)
                        
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
                      value={`${currentContent.caption}${includeMiddleFooter ? getMiddleFooter() : ''}${includeEndFooter ? getEndFooter() : ''}\n\n${currentContent.hashtags.all.join(' ')}`}
                      readOnly
                      className="w-full p-3 border rounded-md resize-none bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={12}
                    />
                    <button
                      onClick={() => {
                        const combinedText = `${currentContent.caption}${includeMiddleFooter ? getMiddleFooter() : ''}${includeEndFooter ? getEndFooter() : ''}\n\n${currentContent.hashtags.all.join(' ')}`
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
                  
                  {/* 固定フッター選択 */}
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-gray-700">固定フッター:</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={includeMiddleFooter}
                            onChange={(e) => setIncludeMiddleFooter(e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm">中盤</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={includeEndFooter}
                            onChange={(e) => setIncludeEndFooter(e.target.checked)}
                            className="mr-2"
                          />
                          <span className="text-sm">後半</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* 中盤固定フッター */}
                    <div className="border-t pt-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-600 mb-2">【中盤固定フッター】</div>
                        <div className="text-sm text-gray-700 whitespace-pre-line">
                          {getMiddleFooter()}
                        </div>
                      </div>
                    </div>
                    
                    {/* 後半固定フッター */}
                    <div className="border-t pt-4">
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="text-xs text-gray-600 mb-2">【後半固定フッター】</div>
                        <div className="text-sm text-gray-700 whitespace-pre-line">
                          {getEndFooter()}
                        </div>
                      </div>
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

      {/* テキスト編集モーダル */}
      {renderTextEditModal()}

      {/* 一括ダウンロード用の隠しページ */}
      <div style={{ position: 'relative' }}>
        {renderAllPagesForDownload()}
      </div>
    </div>
  )
}