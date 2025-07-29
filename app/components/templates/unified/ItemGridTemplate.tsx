import React from 'react'
import Image from 'next/image'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'

interface ItemGridTemplateProps {
  data: TemplateData
}

export function ItemGridTemplate({ data }: ItemGridTemplateProps) {
  // データ構造解析 - 複数のフィールド名に対応
  const items = [data.items, data.examples, data.methods, data.tools]
    .find(arr => arr && arr.length > 0) || []
  const title = data.title || ''
  const subtitle = data.subtitle || ''

  // レイアウト決定関数
  const getLayoutClass = (itemCount: number) => {
    switch (itemCount) {
      case 2:
        return 'grid-cols-2' // 2カラム
      case 3:
        return 'grid-cols-2' // 3個ピラミッド型（1行目1個、2行目2個）
      case 4:
        return 'grid-cols-2' // 2x2グリッド
      case 5:
        return 'grid-cols-2' // 1+2カラム2行（CSSで調整）
      default:
        return 'grid-cols-2' // デフォルト2カラム
    }
  }

  // アイテム表示コンポーネント
  const ItemCard = ({ item, index, total }: { 
    item: any, 
    index: number, 
    total: number 
  }) => {
    const hasImage = item.imageSrc || item.image
    const itemName = item.name || item.title || item.text || ''
    const itemDescription = item.description || ''

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
        {/* 画像（オプショナル） */}
        {hasImage && (
          <div className="mb-3 flex justify-center">
            <div className="w-24 h-24 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src={item.imageSrc || item.image || "/misaki.png"}
                alt={item.imageAlt || itemName || "イラスト"}
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        )}
        
        {/* タイトル/名前 */}
        {itemName && (
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
            {cleanMarkdown(itemName)}
          </h3>
        )}
        
        {/* 説明文 */}
        {itemDescription && (
          <p className="text-gray-700 text-sm leading-relaxed text-center">
            {cleanMarkdown(itemDescription)}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* メインコンテンツ */}
      <div className="p-6 h-full flex flex-col">
        {/* ヘッダー */}
        {(title || subtitle) && (
          <div className="text-center mb-6">
            {title && (
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {cleanMarkdown(title)}
              </h1>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600">
                {cleanMarkdown(subtitle)}
              </p>
            )}
          </div>
        )}

        {/* アイテムグリッド */}
        <div className="flex-1 flex items-center justify-center">
          {items.length === 3 ? (
            // 3個の場合：ピラミッド型レイアウト
            <div className="flex flex-col gap-4 w-full max-w-5xl">
              {/* 1行目：1個（中央配置） */}
              <div className="flex justify-center">
                <div className="w-64">
                  <ItemCard item={items[0]} index={0} total={3} />
                </div>
              </div>
              {/* 2行目：2個 */}
              <div className="flex justify-center gap-4">
                <div className="w-64">
                  <ItemCard item={items[1]} index={1} total={3} />
                </div>
                <div className="w-64">
                  <ItemCard item={items[2]} index={2} total={3} />
                </div>
              </div>
            </div>
          ) : items.length === 5 ? (
            // 5個の場合：1+2+2レイアウト
            <div className="flex flex-col gap-4 w-full max-w-5xl">
              {/* 1行目：1個（中央配置） */}
              <div className="flex justify-center">
                <div className="w-64">
                  <ItemCard item={items[0]} index={0} total={5} />
                </div>
              </div>
              {/* 2行目：2個 */}
              <div className="flex justify-center gap-4">
                <div className="w-64">
                  <ItemCard item={items[1]} index={1} total={5} />
                </div>
                <div className="w-64">
                  <ItemCard item={items[2]} index={2} total={5} />
                </div>
              </div>
              {/* 3行目：2個 */}
              <div className="flex justify-center gap-4">
                <div className="w-64">
                  <ItemCard item={items[3]} index={3} total={5} />
                </div>
                <div className="w-64">
                  <ItemCard item={items[4]} index={4} total={5} />
                </div>
              </div>
            </div>
          ) : (
            // その他：グリッドレイアウト（偶数はカラム）
            <div className={`grid gap-4 w-full max-w-5xl ${getLayoutClass(items.length)}`}>
              {items.map((item: any, index: number) => (
                <ItemCard 
                  key={index} 
                  item={item} 
                  index={index} 
                  total={items.length}
                />
              ))}
            </div>
          )}
        </div>

        {/* フォールバック: アイテムがない場合 */}
        {items.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg">表示するアイテムがありません</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// メタデータ
export const itemGridMetadata = {
  id: 'item_grid',
  name: 'アイテムボックス型',
  description: '2-5個のアイテムをカード形式で柔軟にレイアウト表示、奇数時はピラミッド+カラム構成',
  suitableFor: {
    contentTypes: ['複数項目紹介', 'カテゴリ詳細', 'ツール紹介', '方法論'],
    genres: ['ナレッジ系', 'ノウハウ系', '実践系'],
    dataStructure: ['複数アイテム', '詳細説明', 'グリッド表示'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 30,
    content: 0,
    subtitle: 50,
    items: 100
  },
  keywords: ['複数', 'アイテム', 'カード', 'グリッド', 'ピラミッド', '詳細']
}