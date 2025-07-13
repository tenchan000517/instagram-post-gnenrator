// ④リスト型テンプレート - タイトル、カードタイプのリスト、解説
import React from 'react'
import { CheckSquare, CheckCircle } from 'lucide-react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'

interface ListTemplateProps {
  data: TemplateData
}

export function ListTemplate({ data }: ListTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - list
  console.log('🎨 テンプレートデータ挿入 - list')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
  console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
  console.log(`  - items: [${data.items?.length || 0}個]`)
  data.items?.forEach((item, index) => {
    const itemText = typeof item === 'string' ? item : (item.title || item.content || String(item))
    console.log(`    └─ ${index + 1}. "${itemText}"`)
  })
  console.log('================================================================================')

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-100/20 to-blue-200/20"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-blue-300 rounded-full blur-2xl opacity-20"></div>
      </div>
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-4">
          {(() => {
            const { badge, title } = splitTitleForBadge(data.title)
            const PageIcon = getPageNumberIcon(data.pageNumber || 1)
            const badgeText = badge || data.badgeText || 'チェックリスト'
            
            return (
              <>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '12px'}}>
                  <svg width="400" height="50">
                    <rect x="0" y="0" width="400" height="50" fill="#60a5fa" rx="4" />
                    <text x="200" y="32" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">{badgeText}</text>
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                  {title}
                </h1>
              </>
            )
          })()}
        </div>

        {/* カードタイプリスト */}
        <div className="flex-1 space-y-3">
          {data.items?.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-md border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <CheckSquare className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-800 leading-relaxed">
                    {typeof item === 'string' ? item : 
                     (item as any).title || (item as any).content || String(item)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 補足説明 */}
        {data.subtitle && (
          <div className="mt-4 text-center">
            <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-400">
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

// メタデータ
export const listMetadata = {
  id: 'list',
  name: 'チェックシート型',
  description: 'チェックリスト形式でシンプルな項目列挙',
  suitableFor: {
    contentTypes: ['リスト', 'ランキング', '選択肢'],
    genres: ['紹介系', 'ナレッジ系'],
    dataStructure: ['点列挙', '順序付き'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 60,     // 解説文
    items: 35         // 各リスト項目
  },
  keywords: ['リスト', '一覧', '選択', 'おすすめ', 'ランキング', '種類', '方法']
}