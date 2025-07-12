// ⑧シンプル型３テンプレート - タイトル、２カラムボックス、ポイント、ボックス解説
import React from 'react'
import { ArrowRight, Lightbulb, TrendingUp } from 'lucide-react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'

interface SimpleThreeTemplateProps {
  data: TemplateData
}

export function SimpleThreeTemplate({ data }: SimpleThreeTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - simple3
  console.log('🎨 テンプレートデータ挿入 - simple3')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - content: "${data.content || 'なし'}"`)
  console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
  console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
  console.log(`  - twoColumn: [左${data.twoColumn?.left?.length || 0}個, 右${data.twoColumn?.right?.length || 0}個]`)
  if (data.twoColumn?.left) {
    data.twoColumn.left.forEach((item, index) => {
      const itemText = typeof item === 'string' ? item : (item.title || item.content || String(item))
      console.log(`    左列${index + 1}. "${itemText}"`)
    })
  }
  if (data.twoColumn?.right) {
    data.twoColumn.right.forEach((item, index) => {
      const itemText = typeof item === 'string' ? item : (item.title || item.content || String(item))
      console.log(`    右列${index + 1}. "${itemText}"`)
    })
  }
  console.log('================================================================================')

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
      
      <div className="relative z-10 p-5 flex flex-col min-h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-4">
          {(() => {
            const { badge, title } = splitTitleForBadge(data.title)
            const PageIcon = getPageNumberIcon(data.pageNumber || 1)
            const badgeText = badge || data.badgeText || '対比解説'
            
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

        {/* 2カラム比較 */}
        <div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border-4 border-red-300 shadow-lg">
              <div className="flex flex-col justify-start space-y-6">
                {data.twoColumn?.left?.map((item, index) => {
                  const titleParts = (typeof item === 'string' ? item : item.title || '').split('：')
                  const label = titleParts[0] || ''
                  const title = titleParts[1] || titleParts[0] || ''
                  
                  return (
                    <div key={index} className="text-center space-y-4">
                      <div className="inline-block bg-red-100 text-red-700 px-8 py-4 rounded-lg text-3xl font-bold">
                        {label}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                        {title}
                      </h3>
                      {typeof item === 'object' && item.description && (
                        <p className="text-xl text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )
                }) || []}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 border-4 border-green-300 shadow-lg">
              <div className="flex flex-col justify-start space-y-6">
                {data.twoColumn?.right?.map((item, index) => {
                  const titleParts = (typeof item === 'string' ? item : item.title || '').split('：')
                  const label = titleParts[0] || ''
                  const title = titleParts[1] || titleParts[0] || ''
                  
                  return (
                    <div key={index} className="text-center space-y-4">
                      <div className="inline-block bg-green-100 text-green-700 px-8 py-4 rounded-lg text-3xl font-bold">
                        {label}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 leading-tight">
                        {title}
                      </h3>
                      {typeof item === 'object' && item.description && (
                        <p className="text-xl text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )
                }) || []}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// メタデータ
export const simpleThreeMetadata = {
  id: 'simple3',
  name: 'シンプル型３',
  description: '2カラム表示とポイント強調',
  suitableFor: {
    contentTypes: ['比較解説', '重要ポイント', '対比説明'],
    genres: ['ナレッジ系', 'ノウハウ系'],
    dataStructure: ['比較', '強調'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 25,
    content: 80,      // ボックス解説文
    subtitle: 0,
    items: 20         // 各カラム項目
  },
  keywords: ['比較', '重要', 'ポイント', '違い', '特徴', '注意', '対比']
}