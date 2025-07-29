import React from 'react'
import Image from 'next/image'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'
import { Check } from 'lucide-react'

interface DualSectionTemplateProps {
  data: TemplateData
}

export function DualSectionTemplate({ data }: DualSectionTemplateProps) {
  // データ構造解析
  const contentArray = (data as any).content || {};
  const items = contentArray.items || data.items || [];
  
  // 最初の2つのアイテムを取得
  const firstItem = items[0];
  const secondItem = items[1];

  // コンテンツ表示コンポーネント（description or list 対応）
  const ContentDisplay = ({ content }: { content: string | string[] }) => {
    if (Array.isArray(content)) {
      // リスト形式：チェックボックス付き
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-lg leading-relaxed">
                {cleanMarkdown(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    
    // 段落形式
    return (
      <p className="text-gray-700 text-xl font-bold leading-relaxed">
        {cleanMarkdown(content)}
      </p>
    );
  };

  // アイテム表示コンポーネント
  const ItemDisplay = ({ item, index, position }: { 
    item: any, 
    index: number, 
    position: 'top' | 'bottom' 
  }) => {
    if (!item) return null;

    // 画像が存在するかチェック
    const hasImage = item.imageSrc || item.image;
    const content = item.description || item.content;

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
            <ContentDisplay content={content} />
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
          
          {/* オプショナルフッターdescription */}
          {data.footerDescription && (
            <div className="text-center mt-6">
              <p className="text-gray-600 text-lg">
                {cleanMarkdown(data.footerDescription)}
              </p>
            </div>
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
export const dualSectionMetadata = {
  id: 'dual_section',
  name: '2セクション上下配置型',
  description: '2つのセクションを上下に配置、description or list両対応のテンプレート',
  suitableFor: {
    contentTypes: ['並列紹介', 'ペア表示', '方法論', 'ステップ解説'],
    genres: ['ナレッジ系', 'ノウハウ系', '実践系'],
    dataStructure: ['並列アイテム', '独立要素', 'リスト対応'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 0,
    content: 0,
    subtitle: 0,
    items: 50,
    footerDescription: 100
  },
  keywords: ['方法', 'ポイント', 'テクニック', '並列', 'アイテム', '実践', 'チェックリスト']
}