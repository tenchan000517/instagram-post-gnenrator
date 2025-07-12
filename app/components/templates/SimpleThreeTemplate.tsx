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
      
      <div className="relative z-10 p-5 flex flex-col h-full">
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

        {/* 2カラムボックス */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-3">
            {data.twoColumn ? (
              <>
                <div className="bg-white rounded-2xl p-4 border-2 border-blue-200">
                  <div className="space-y-2">
                    {data.twoColumn.left.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-sm text-blue-800 font-medium">
                          {typeof item === 'string' ? item : item.title || item.content || String(item)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border-2 border-blue-200">
                  <div className="space-y-2">
                    {data.twoColumn.right.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                        <p className="text-sm text-blue-800 font-medium">
                          {typeof item === 'string' ? item : item.title || item.content || String(item)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              // フォールバック: デフォルトの2カラム
              <>
                <div className="bg-white rounded-2xl p-4 border-2 border-blue-200">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                      <p className="text-sm text-blue-800 font-medium">
                        企業研究を徹底的に行う
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                      <p className="text-sm text-blue-800 font-medium">
                        面接練習を重ねる
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border-2 border-blue-200">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                      <p className="text-sm text-blue-800 font-medium">
                        自己分析を深める
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mt-1 flex-shrink-0"></div>
                      <p className="text-sm text-blue-800 font-medium">
                        コネクションを築く
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ポイント */}
        <div className="mb-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-b from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full">
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm font-bold">{data.badgeText || '重要ポイント'}</span>
            </div>
          </div>
        </div>

        {/* ボックス解説 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            <div className="text-center">
              <div className="w-8 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
                {data.content || data.subtitle || "差別化がポイント"}
              </p>
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