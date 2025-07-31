import React from 'react'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'
import { getT009DynamicFontClass } from '../../../utils/fontUtils'

interface ItemListTemplateProps {
  data: TemplateData
  targetId?: string
}


export function ItemListTemplate({ data, targetId }: ItemListTemplateProps) {
  const title = data.title || ''
  const items = data.items || []
  const dynamicFontClass = getT009DynamicFontClass(targetId)
  
  // 最大5つまでのアイテムを表示
  const displayItems = items.slice(0, 5)

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* メインコンテンツ */}
      <div className="p-8 h-full flex flex-col">
        {/* タイトル */}
        {title && (
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold text-gray-900 leading-tight ${dynamicFontClass}`}>
              {cleanMarkdown(title)}
            </h1>
          </div>
        )}

        {/* アイテムリスト */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-3xl mx-auto w-full space-y-6">
            {displayItems.map((item: any, index: number) => (
              <div 
                key={index}
                className="bg-white rounded-lg border-l-4 border-blue-500 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* アイテム名 */}
                <h3 className={`text-xl font-bold text-gray-800 mb-3 flex items-center gap-3 ${dynamicFontClass}`}>
                  <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  {cleanMarkdown(typeof item === 'string' ? item : (item.name || item.title || ''))}
                </h3>
                
                {/* アイテム説明 */}
                <p className={`text-gray-700 leading-relaxed pl-11 ${dynamicFontClass}`}>
                  {cleanMarkdown(typeof item === 'string' ? '' : (item.description || item.content || ''))}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* フォールバック: アイテムがない場合 */}
        {displayItems.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className={`text-lg ${dynamicFontClass}`}>表示するアイテムがありません</p>
            </div>
          </div>
        )}

        {/* 5つを超える場合の注意表示 */}
        {items.length > 5 && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              ※ 最大5つのアイテムまで表示されます（{items.length}個中5個を表示）
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// メタデータ
export const itemListMetadata = {
  id: 'item_list',
  name: 'アイテムリスト型',
  description: 'アイテム名+説明の組み合わせを動的に最大5つまで表示するテンプレート',
  suitableFor: {
    contentTypes: ['項目一覧', 'ステップ解説', '要点整理', 'ツール紹介'],
    genres: ['ナレッジ系', 'ノウハウ系', '実践系'],
    dataStructure: ['アイテムリスト', '順序付き説明'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 40,
    itemName: 30,
    itemDescription: 150,
    items: 5 // 最大アイテム数
  },
  keywords: ['リスト', 'アイテム', '項目', 'ステップ', '要点', '一覧']
}