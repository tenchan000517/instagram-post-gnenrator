// ⑦シンプル型２テンプレート - タイトル、ボックス解説１、ボックス解説２
import React from 'react'
import { Target, Zap } from 'lucide-react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'

interface SimpleTwoTemplateProps {
  data: TemplateData
}

export function SimpleTwoTemplate({ data }: SimpleTwoTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - simple2
  console.log('🎨 テンプレートデータ挿入 - simple2')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - content: "${data.content || 'なし'}"`)
  console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
  console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
  console.log(`  - boxes: [${data.boxes?.length || 0}個]`)
  data.boxes?.forEach((box, index) => {
    console.log(`    └─ ${index + 1}. "${box.title}" - "${box.content}"`)
  })
  console.log('================================================================================')

  return (
    <div className="w-full h-full bg-gradient-to-b from-cyan-50 to-cyan-100 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          {(() => {
            const { badge, title } = splitTitleForBadge(data.title)
            const PageIcon = getPageNumberIcon(data.pageNumber || 1)
            const badgeText = badge || data.badgeText || '2つのポイント'
            
            return (
              <>
                <div className="inline-flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-sm text-xl font-medium mb-3">
                  <PageIcon className="w-5 h-5" />
                  <span>{badgeText}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                  {title}
                </h1>
              </>
            )
          })()}
        </div>

        {/* メインコンテンツ */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full space-y-4">
            <div className="text-center mb-6">
              <p className="text-xl text-gray-800 font-medium leading-relaxed">
                {data.content}
              </p>
            </div>
            
            {/* 2つのボックス解説 */}
            <div className="space-y-4">
              {data.boxes?.map((box, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-cyan-100">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      index === 0 
                        ? 'bg-gradient-to-b from-cyan-500 to-cyan-600'
                        : 'bg-gradient-to-b from-blue-500 to-blue-600'
                    }`}>
                      {index === 0 ? (
                        <Target className="w-4 h-4 text-white" />
                      ) : (
                        <Zap className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-2 ${
                        index === 0 ? 'text-cyan-800' : 'text-blue-800'
                      }`}>
                        {box.title}
                      </h3>
                      <p className="text-base text-gray-800 leading-relaxed">
                        {box.content}
                      </p>
                    </div>
                  </div>
                </div>
              )) || (
                // フォールバック: デフォルトの2つのボックス
                <>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-cyan-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-b from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Target className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2 text-cyan-800">
                          {data.subtitle || "ポイント1"}
                        </h3>
                        <p className="text-base text-gray-800 leading-relaxed">
                          練習が自信につながる
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-cyan-100">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2 text-blue-800">
                          ポイント2
                        </h3>
                        <p className="text-base text-gray-800 leading-relaxed">
                          継続的な改善が重要
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// メタデータ
export const simpleTwoMetadata = {
  id: 'simple2',
  name: 'シンプル型２',
  description: 'タイトルと2つのボックス解説',
  suitableFor: {
    contentTypes: ['比較', '対比', '2つのポイント'],
    genres: ['ナレッジ系', 'ノウハウ系'],
    dataStructure: ['比較', '対比'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 30,
    items: 70         // 各ボックス内容
  },
  keywords: ['比較', '違い', '対比', 'vs', '2つ', '両方', '選択肢']
}