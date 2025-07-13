import React from 'react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'
import { FileText, ArrowRight } from 'lucide-react'

interface SingleSectionNoItemsTemplateProps {
  data: TemplateData
}

export function SingleSectionNoItemsTemplate({ data }: SingleSectionNoItemsTemplateProps) {
  // 🔧 必須: タイトルとバッジの分離（全テンプレート共通）
  const { badge, title } = splitTitleForBadge(data.title)
  
  // 🔧 必須: ページ番号アイコン取得（全テンプレート共通）
  const PageIcon = getPageNumberIcon(data.pageNumber || 1)

  // セクション情報の取得
  const section = data.sections && data.sections.length > 0 ? data.sections[0] : null

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
        </div>

        {/* 📄 メインコンテンツエリア */}
        <div className="flex-1">
          {/* 説明文 */}
          {data.description && (
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <p className="text-base font-medium text-gray-800 leading-relaxed">
                {data.description}
              </p>
            </div>
          )}

          {/* セクション情報 */}
          {section && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
              {/* セクションヘッダー */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {section.title}
                </h2>
              </div>

              {/* セクションコンテンツ */}
              {section.content && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-base text-gray-800 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              )}

              {/* セクション詳細説明 */}
              {(section as any).description && (section as any).description !== section.content && (
                <div className="mt-4 pt-4 border-t border-blue-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {(section as any).description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 🔚 フッター/サブタイトル（標準パターン） */}
        {data.subtitle && (
          <div className="mt-6">
            <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-600">
              <p className="text-base text-blue-800 font-medium">
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
export const singleSectionNoItemsMetadata = {
  id: 'single-section-no-items',
  name: '単一セクション（アイテム無し）',
  description: 'タイトル+説明文+1つのセクション情報を表示するテンプレート',
  suitableFor: {
    contentTypes: ['説明型コンテンツ', '概要説明', 'セクション型情報'],
    genres: ['ナレッジ系', 'ノウハウ系', '解説系'],
    dataStructure: ['title + description + sections[1] (アイテム無し)'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 3 }
  },
  characterLimits: {
    title: 35,
    content: 120,
    subtitle: 50,
    items: 60
  },
  keywords: ['セクション', '説明', '概要', '単一', '情報'],
  structureRequirements: {
    sectionsCount: 1,
    itemsCount: 0,
    hasDescription: true
  }
}