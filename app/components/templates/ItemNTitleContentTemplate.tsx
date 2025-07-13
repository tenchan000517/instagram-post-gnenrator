// item1Title/Content, item2Title/Content形式の独立ボックス構造用テンプレート - Critical Priority対応
import React from 'react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'
import { ArrowRight, Star } from 'lucide-react'

interface ItemNTitleContentTemplateProps {
  data: TemplateData
}

export function ItemNTitleContentTemplate({ data }: ItemNTitleContentTemplateProps) {
  // 🔧 必須: タイトルとバッジの分離（全テンプレート共通）
  const { badge, title } = splitTitleForBadge(data.title)
  
  // 🔧 必須: ページ番号アイコン取得（全テンプレート共通）
  const PageIcon = getPageNumberIcon(data.pageNumber || 1)

  // itemNTitle/Content形式のデータ取得
  const getItemData = () => {
    const items = []
    const dataAny = data as any
    
    // item1Title/Content, item2Title/Content, item3Title/Content等を検出
    for (let i = 1; i <= 6; i++) {
      const titleKey = `item${i}Title`
      const contentKey = `item${i}Content`
      
      if (dataAny[titleKey] || dataAny[contentKey]) {
        items.push({
          title: dataAny[titleKey] || `項目${i}`,
          content: dataAny[contentKey] || ''
        })
      }
    }
    
    // フォールバック: 通常のitemsがオブジェクト形式の場合
    if (items.length === 0 && data.items) {
      return data.items.map((item, index) => ({
        title: typeof item === 'object' ? (item.title || `項目${index + 1}`) : `項目${index + 1}`,
        content: typeof item === 'object' ? (item.content || '') : (typeof item === 'string' ? item : '')
      }))
    }
    
    return items
  }

  const itemData = getItemData()

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col">
      
      {/* 🎨 背景装飾（共通パターン） */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>

      {/* 📱 コンテンツコンテナ（相対位置・z-index） */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        
        {/* 🏷️ 標準ヘッダー（バッジ＋タイトル） */}
        <div className="mb-6">
          {/* バッジ（ページアイコン付き） */}
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '12px'}}>
            <svg width="400" height="50">
              <rect x="0" y="0" width="400" height="50" fill="#60a5fa" rx="4" />
              <text x="200" y="32" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">{data.badgeText || badge}</text>
            </svg>
          </div>
          
          {/* メインタイトル */}
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {title}
          </h1>
          
          {/* サブタイトル（オプション） */}
          {data.subtitle && (
            <p className="text-lg text-gray-700 mt-3">{data.subtitle}</p>
          )}
        </div>

        {/* 📄 メインコンテンツエリア - 独立ボックス構造専用 */}
        <div className="flex-1">
          {/* 導入説明文（オプション） */}
          {data.content && (
            <div className="bg-white rounded-2xl p-4 shadow-sm mb-6 border border-blue-100">
              <p className="text-base font-medium text-gray-800 leading-relaxed text-center">
                {typeof data.content === 'string' ? data.content : (data.content as any)?.content}
              </p>
            </div>
          )}

          {/* 独立ボックスアイテム */}
          {itemData.length > 0 && (
            <div className="space-y-4">
              {itemData.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-blue-100 transform hover:scale-[1.02] transition-transform">
                  <div className="flex items-start gap-4">
                    {/* 番号アイコン */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* コンテンツ */}
                    <div className="flex-1">
                      {/* タイトル */}
                      <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        {item.title}
                      </h3>
                      
                      {/* 内容 */}
                      {item.content && (
                        <div className="bg-blue-50 rounded-xl p-4">
                          <p className="text-base text-gray-700 leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* フォールバック表示 */}
          {itemData.length === 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-blue-100 text-center">
              <p className="text-gray-500">独立ボックス形式のアイテムが見つかりません</p>
            </div>
          )}
        </div>

        {/* 🔚 フッター/サブタイトル（標準パターン） */}
        {data.subtitle && (
          <div className="mt-6">
            <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-600">
              <p className="text-base text-blue-800 font-medium flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                {data.subtitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// メタデータ（必須）
export const itemNTitleContentMetadata = {
  id: 'item-n-title-content',
  name: '独立ボックス構造',
  description: 'item1Title/Content形式の独立したボックス構造',
  suitableFor: {
    contentTypes: ['ステップ解説', '独立項目', '比較項目', 'ボックス表示'],
    genres: ['ノウハウ系', 'ナレッジ系', '解説系'],
    dataStructure: ['itemNTitle + itemNContent pairs'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 30,       // タイトル文字数制限
    content: 60,     // 導入説明文字数制限
    subtitle: 40,    // サブタイトル文字数制限
    items: 80        // 各ボックス内容文字数制限
  },
  keywords: ['ボックス', '独立', 'ステップ', '項目', '構造化', '番号付き'],
  structureRequirements: {
    // 独立ボックス構造の要件
    itemTitleContentPairs: true,
    itemsMin: 2,
    itemsMax: 6,
    structuredLayout: true
  }
}