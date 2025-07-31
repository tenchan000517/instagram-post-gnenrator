import React from 'react'
import Image from 'next/image'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'
import { Check } from 'lucide-react'
import { getT009DynamicFontClass } from '../../../utils/fontUtils'

interface ImagePointTemplateProps {
  data: TemplateData
  targetId?: string
}

interface ImagePointData extends TemplateData {
  title: string;
  mainImage?: string;
  importantPoint: string;
  description?: string;
  bottomSection?: {
    name?: string;
    content: string | string[];
  };
}

export function ImagePointTemplate({ data, targetId }: ImagePointTemplateProps) {
  const imagePointData = data as ImagePointData
  const dynamicFontClass = getT009DynamicFontClass(targetId)
  const { 
    title, 
    mainImage, 
    importantPoint, 
    description,
    bottomSection 
  } = imagePointData

  // コンテンツ表示コンポーネント（description or list 対応）
  const ContentDisplay = ({ content }: { content: string | string[] }) => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span className={`text-gray-700 leading-relaxed ${dynamicFontClass}`}>
                {cleanMarkdown(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    
    return (
      <p className={`text-gray-700 leading-relaxed ${dynamicFontClass}`}>
        {cleanMarkdown(content)}
      </p>
    );
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
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

        {/* 2カラムセクション（画像 + 重要ポイント） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* 左：画像 */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm h-64 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
              <Image
                src={mainImage || '/misaki.png'}
                alt="メインイラスト"
                width={320}
                height={256}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* 右：重要ポイントボックス */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-6 rounded-lg shadow-lg w-full">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💡</span>
                <h2 className={`text-lg font-bold ${dynamicFontClass}`}>重要ポイント</h2>
              </div>
              <p className={`text-lg font-semibold leading-relaxed ${dynamicFontClass}`}>
                {cleanMarkdown(importantPoint)}
              </p>
            </div>
          </div>
        </div>

        {/* 2カラム下のテキスト（オプショナル） */}
        {description && (
          <div className="text-center mb-8">
            <p className={`text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto ${dynamicFontClass}`}>
              {cleanMarkdown(description)}
            </p>
          </div>
        )}

        {/* 下部セクションボックス */}
        {bottomSection && (
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            {bottomSection.name && (
              <h3 className={`text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 ${dynamicFontClass}`}>
                <span className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                {cleanMarkdown(bottomSection.name)}
              </h3>
            )}
            <div className="ml-10">
              <ContentDisplay content={bottomSection.content} />
            </div>
          </div>
        )}

        {/* フォールバック: 基本要素がない場合 */}
        {!importantPoint && !bottomSection && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className={`text-lg ${dynamicFontClass}`}>表示するコンテンツがありません</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// メタデータ
export const imagePointMetadata = {
  id: 'image_point',
  name: '画像+ポイント型',
  description: '2カラムで画像と重要ポイント、下部にセクションボックスを配置するテンプレート',
  suitableFor: {
    contentTypes: ['重要ポイント強調', 'ビジュアル説明', '要点+詳細', 'インパクト重視'],
    genres: ['ナレッジ系', 'ノウハウ系', '実践系'],
    dataStructure: ['画像連携', 'ポイント強調', 'セクション詳細'],
    complexity: 'complex' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 40,
    importantPoint: 100,
    description: 200,
    bottomSectionName: 30,
    bottomSectionContent: 250
  },
  keywords: ['画像', 'ポイント', '重要', 'ビジュアル', '強調', '2カラム']
}