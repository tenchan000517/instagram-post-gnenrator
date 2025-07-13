// ⑫シンプル型６テンプレート - タイトル、ボックスでチェックボックス、ポイント、下に解説（コンパクト配置）
import React from 'react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'
import { CheckCircle, Circle, List } from 'lucide-react'

interface SimpleSixTemplateProps {
  data: TemplateData
}

export function SimpleSixTemplate({ data }: SimpleSixTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - simple6
  console.log('🎨 テンプレートデータ挿入 - simple6')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - content: "${data.content || 'なし'}"`)
  console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
  console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
  console.log(`  - items: [${data.items?.length || 0}個]`)
  data.items?.forEach((item, index) => {
    console.log(`    └─ ${index + 1}. "${typeof item === 'string' ? item : item.title || item.content || String(item)}"`)
  })
  console.log('================================================================================')

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          {(() => {
            const { badge, title } = splitTitleForBadge(data.title)
            const PageIcon = getPageNumberIcon(data.pageNumber || 1)
            const badgeText = badge || data.badgeText || '重要項目'
            
            return (
              <>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '12px'}}>
                  <svg width="400" height="50">
                    <rect x="0" y="0" width="400" height="50" fill="#60a5fa" rx="4" />
                    <text x="200" y="32" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">{badgeText}</text>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                  {title}
                </h1>
              </>
            )
          })()}
        </div>

        {/* メイン説明文 */}
        {data.content && (
          <div className="mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
              <p className="text-base text-gray-800 leading-relaxed text-center">
                {data.content}
              </p>
            </div>
          </div>
        )}

        {/* まとめリスト */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              {data.items?.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 pt-1">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="text-base font-medium text-gray-800">
                      {typeof item === 'string' ? item : item.title || item.content || String(item)}
                    </span>
                  </div>
                </div>
              )) || []}
            </div>
          </div>
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
export const simpleSixMetadata = {
  id: 'simple6',
  name: 'シンプル型６',
  description: 'コンパクトなチェックリスト配置',
  suitableFor: {
    contentTypes: ['簡潔チェック', '要点確認', '基本項目'],
    genres: ['ノウハウ系', 'ナレッジ系'],
    dataStructure: ['簡潔', 'コンパクト'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 30,
    items: 35         // 各チェック項目と解説
  },
  keywords: ['簡潔', 'コンパクト', '要点', '基本', 'シンプル', '確認', '短時間']
}