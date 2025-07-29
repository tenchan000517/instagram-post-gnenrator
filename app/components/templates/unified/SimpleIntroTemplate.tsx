import React from 'react'
import Image from 'next/image'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'

interface SimpleIntroTemplateProps {
  data: TemplateData
}

export function SimpleIntroTemplate({ data }: SimpleIntroTemplateProps) {
  const title = data.title || ''
  const description = data.description || ''
  const imageSrc = data.imageSrc || data.image || '/misaki.png'
  const imageAlt = data.imageAlt || 'イラスト'

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* メインコンテンツ */}
      <div className="p-8 h-full flex flex-col justify-center items-center">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* タイトル */}
          {title && (
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {cleanMarkdown(title)}
            </h1>
          )}
          
          {/* 画像 */}
          <div className="flex justify-center">
            <div className="w-64 h-64 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={256}
                height={256}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* 説明文 */}
          {description && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <p className="text-xl text-gray-700 leading-relaxed">
                {cleanMarkdown(description)}
              </p>
            </div>
          )}
          
          {/* フォールバック */}
          {!title && !description && (
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">表示するコンテンツがありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// メタデータ
export const simpleIntroMetadata = {
  id: 'simple_intro',
  name: 'シンプル導入型',
  description: 'タイトル・画像・説明文のシンプルな3要素構成テンプレート',
  suitableFor: {
    contentTypes: ['導入', '概要説明', 'タイトルページ', '基本紹介'],
    genres: ['全ジャンル対応'],
    dataStructure: ['シンプル構成', '基本要素'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 40,
    description: 200,
    subtitle: 0,
    items: 0
  },
  keywords: ['シンプル', '導入', '基本', 'タイトル', '概要']
}