// INDEX テンプレート - 目次ページ（全体のメインテーマ + 項目リスト表示）
import React from 'react'
import { FileText, ArrowRight, List } from 'lucide-react'
import { IconSquareNumber1, IconSquareNumber2, IconSquareNumber3, IconSquareNumber4, IconSquareNumber5, IconSquareNumber6 } from '@tabler/icons-react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'

interface IndexTemplateProps {
  data: TemplateData
}

export function IndexTemplate({ data }: IndexTemplateProps) {
  // 動的番号アイコン取得
  const getNumberIcon = (index: number) => {
    const icons = [IconSquareNumber1, IconSquareNumber2, IconSquareNumber3, IconSquareNumber4, IconSquareNumber5, IconSquareNumber6]
    const IconComponent = icons[index] || IconSquareNumber1
    return <IconComponent className="w-10 h-10 text-blue-500" />
  }
  // 🎨 テンプレートデータ挿入ロギング - index
  console.log('🎨 テンプレートデータ挿入 - index')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - content: "${data.content || 'なし'}"`)
  console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
  console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
  console.log(`  - items: [${data.items?.length || 0}個]`)
  if (data.items) {
    data.items.forEach((item, index) => {
      const itemText = typeof item === 'string' ? item : (item.title || item.content || String(item))
      console.log(`    ${index + 1}. "${itemText}"`)
    })
  }
  console.log('================================================================================')

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-200 rounded-full -translate-y-20 translate-x-20 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 rounded-full translate-y-16 -translate-x-16 opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-100 rounded-full -translate-x-12 -translate-y-12 opacity-40"></div>
      
      <div className="relative z-10 p-6 flex flex-col min-h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          {(() => {
            const { badge, title } = splitTitleForBadge(data.title)
            const badgeText = badge || data.badgeText || 'INDEX'
            
            return (
              <>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '16px'}}>
                  <svg width="400" height="50">
                    <rect x="0" y="0" width="400" height="50" fill="url(#gradient)" rx="8" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                    <text x="200" y="32" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">{title}</text>
                  </svg>
                </div>
              </>
            )
          })()}
        </div>

        {/* サブタイトル */}
        {data.subtitle && (
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600 font-medium px-4">
              {data.subtitle}
            </p>
          </div>
        )}

        {/* メインコンテンツ部分 */}
        <div className="flex-1 flex flex-col justify-center">
          {/* 説明文 */}
          {data.content && (
            <div className="text-center mb-8">
              <p className="text-base text-gray-700 leading-relaxed px-2">
                {data.content}
              </p>
            </div>
          )}

          {/* 項目リスト */}
          {data.items && data.items.length > 0 && (
            <div className="space-y-3">
              {data.items.map((item, index) => {
                let itemText = typeof item === 'string' ? item : (item.title || item.content || String(item))
                // データの先頭の数字と.を除去
                itemText = itemText.replace(/^\d+\.\s*/, '')
                
                return (
                  <div key={index} className="flex items-center gap-4 bg-white/80 rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                    <div className="flex-shrink-0">
                      {getNumberIcon(index)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-base">
                        {itemText}
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* フッター装飾 */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-gray-500">
            <List size={16} />
            <span className="text-sm font-medium">INDEX</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// メタデータ定義
export const indexMetadata = {
  id: 'index',
  name: 'INDEX（目次）テンプレート',
  description: '全体のメインテーマと項目リストを表示する目次ページ',
  suitableFor: {
    contentTypes: ['目次', 'インデックス', '全体構成', '項目一覧'],
    genres: ['全ジャンル対応'],
    dataStructure: ['タイトル + 項目リスト', 'メインテーマ + ページ構成'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 25,
    content: 80,
    subtitle: 40,
    items: 20
  },
  keywords: ['INDEX', '目次', 'インデックス', '項目', 'リスト', '構成', 'ページ']
}