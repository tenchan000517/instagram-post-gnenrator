// タイトル＋説明文のみのシンプル構造用テンプレート - Critical Priority対応
import React from 'react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'

interface TitleDescriptionOnlyTemplateProps {
  data: TemplateData
}

export function TitleDescriptionOnlyTemplate({ data }: TitleDescriptionOnlyTemplateProps) {
  // 🔧 必須: タイトルとバッジの分離（全テンプレート共通）
  const { badge, title } = splitTitleForBadge(data.title)
  
  // 🔧 必須: ページ番号アイコン取得（全テンプレート共通）
  const PageIcon = getPageNumberIcon(data.pageNumber || 1)

  return (
    <div className="w-full h-full relative bg-white flex flex-col">
      
      {/* 🎨 背景装飾（共通パターン） */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>

      {/* 📱 コンテンツコンテナ（相対位置・z-index） */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        
        {/* 🏷️ 標準ヘッダー（バッジ＋タイトル） */}
        <div className="mb-8">
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
        </div>

        {/* 📄 メインコンテンツエリア - 説明文専用レイアウト */}
        <div className="flex-1 flex items-center justify-center">
          {/* 大きなコンテンツカード - 説明文に特化 */}
          <div className="w-full bg-white rounded-3xl p-8 shadow-lg border border-blue-100">
            <div className="text-center">
              {/* 説明文 - 大きめで読みやすく */}
              <p className="text-xl font-medium text-gray-800 leading-relaxed">
                {typeof data.content === 'string' ? data.content : 
                 typeof data.description === 'string' ? data.description :
                 (data.content as any)?.content || (data.content as any)?.description || 
                 data.description || '説明文がありません'}
              </p>
            </div>
          </div>
        </div>

        {/* 🔚 フッター/サブタイトル（オプション） */}
        {data.subtitle && (
          <div className="mt-6">
            <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-600">
              <p className="text-base text-blue-800 font-medium text-center">
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
export const titleDescriptionOnlyMetadata = {
  id: 'title-description-only',
  name: 'タイトル+説明文のみ',
  description: 'タイトルと説明文のみのシンプルな構造',
  suitableFor: {
    contentTypes: ['基本説明', '概要紹介', 'シンプル解説'],
    genres: ['ナレッジ系', 'ノウハウ系', '基本情報'],
    dataStructure: ['title + description'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 35,       // タイトル文字数制限
    content: 200,    // 説明文文字数制限（大きめ）
    subtitle: 50,    // サブタイトル文字数制限
    items: 0         // アイテム無し
  },
  keywords: ['シンプル', '説明', 'タイトル', '基本', '概要', '紹介'],
  structureRequirements: {
    // タイトル+説明文のみの要件
    descriptionRequired: true,
    itemsCount: 0,
    sectionsCount: 0
  }
}