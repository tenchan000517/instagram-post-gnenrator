import React from 'react'
import Image from 'next/image'
import { TemplateData, cleanMarkdown } from './TemplateTypes'

interface DualEnumerationTemplateProps {
  data: TemplateData
}

export function DualEnumerationTemplate({ data }: DualEnumerationTemplateProps) {
  // データ構造解析
  const contentArray = (data as any).content || {};
  const items = contentArray.items || data.items || [];
  
  // 最初の2つのアイテムを取得
  const firstItem = items[0];
  const secondItem = items[1];

  // アイテム表示コンポーネント
  const ItemDisplay = ({ item, index, position }: { 
    item: any, 
    index: number, 
    position: 'top' | 'bottom' 
  }) => {
    if (!item) return null;

    // 画像が存在するかチェック（imageSrcが指定されている場合のみ表示）
    const hasImage = item.imageSrc || item.image;

    return (
      <div className={`${position === 'top' ? 'mb-8' : ''}`}>
        {/* 数字とタイトルを同一コンテナに */}
        <div className="flex items-baseline gap-4 mb-3">
          <span className="text-7xl font-black text-orange-500 leading-none">
            {item.number || (index + 1)}
          </span>
          <h3 className="text-3xl font-bold text-gray-800 leading-tight flex-1">
            {cleanMarkdown(item.title || '')}
          </h3>
        </div>
        
        {/* コンテンツ部分 */}
        <div>
          
          {/* 画像（オプショナル） */}
          {hasImage && (
            <div className="mb-3 flex justify-center">
              <div className="w-48 h-48 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={item.imageSrc || item.image || "/misaki.png"}
                  alt={item.imageAlt || "イラスト"}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          )}
          
          {/* 説明枠 */}
          <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-gray-700 text-xl font-bold leading-relaxed">
              {cleanMarkdown(item.description || '')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/* メインコンテンツ */}
      <div className="p-8 h-full flex flex-col justify-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 上部アイテム */}
          {firstItem && (
            <ItemDisplay item={firstItem} index={0} position="top" />
          )}
          
          {/* 下部アイテム */}
          {secondItem && (
            <ItemDisplay item={secondItem} index={1} position="bottom" />
          )}
          
          {/* フォールバック: アイテムがない場合 */}
          {!firstItem && !secondItem && (
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">表示するアイテムがありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// メタデータ
export const dualEnumerationMetadata = {
  id: 'dual_enumeration',
  name: '2アイテム上下配置型',
  description: '2つのアイテムを上下に配置して表示するテンプレート',
  suitableFor: {
    contentTypes: ['並列紹介', 'ペア表示', '方法論'],
    genres: ['ナレッジ系', 'ノウハウ系', '実践系'],
    dataStructure: ['並列アイテム', '独立要素'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 0,        // タイトルは使用しない
    content: 0,      // 使用しない
    subtitle: 0,     // 使用しない
    items: 50        // 各アイテムのタイトル・説明文最大文字数
  },
  keywords: ['方法', 'ポイント', 'テクニック', '並列', 'アイテム', '実践']
}