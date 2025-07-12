// ⑪シンプル型５テンプレート - タイトル、ボックスでチェックボックス、ポイント、下に解説（縦向き配置）
import React from 'react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'
import { CheckCircle, Circle, Award } from 'lucide-react'

interface SimpleFiveTemplateProps {
  data: TemplateData
}

export function SimpleFiveTemplate({ data }: SimpleFiveTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - simple5
  console.log('🎨 テンプレートデータ挿入 - simple5')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - content: "${data.content || 'なし'}"`)
  console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
  console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
  console.log(`  - checklist: [${data.checklist?.length || 0}個]`)
  data.checklist?.forEach((item, index) => {
    console.log(`    └─ ${index + 1}. "${item.text || item}" [${item.checked ? 'チェック済み' : '未チェック'}]`)
  })
  console.log(`  - points: [${data.points?.length || 0}個]`)
  data.points?.forEach((point, index) => {
    console.log(`    └─ ${index + 1}. "${point.description || point}"`)
  })
  console.log('================================================================================')

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-4">
          {(() => {
            const { badge, title } = splitTitleForBadge(data.title)
            const PageIcon = getPageNumberIcon(data.pageNumber || 1)
            const badgeText = badge || data.badgeText || 'ステップ確認'
            
            return (
              <>
                <div className="inline-flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-sm text-xl font-medium mb-3">
                  <PageIcon className="w-5 h-5" />
                  <span>{badgeText}</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                  {title}
                </h1>
              </>
            )
          })()}
        </div>

        {/* 縦向きチェックリスト */}
        <div className="flex-1 space-y-3">
          {data.checklist?.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  {item.checked ? (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-blue-800">
                  {item.text}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {data.points?.[index]?.description || ''}
                </p>
              </div>
            </div>
          )) || (
            // フォールバック: デフォルトのステップ
            <>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-800">
                    {data.content || data.subtitle || "表面的な情報だけでは不十分"}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    深い理解が差を生む
                  </p>
                </div>
              </div>
            </>
          )}
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
export const simpleFiveMetadata = {
  id: 'simple5',
  name: 'シンプル型５',
  description: '縦向きチェックボックス配置',
  suitableFor: {
    contentTypes: ['ステップ', '手順', '段階的チェック'],
    genres: ['ノウハウ系', 'ナレッジ系'],
    dataStructure: ['段階的', '順序'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 40,
    items: 45         // 各チェック項目と解説
  },
  keywords: ['ステップ', '手順', '段階', '順番', 'プロセス', '流れ', '進行']
}