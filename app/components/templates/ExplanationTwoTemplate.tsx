// ⑤解説型２テンプレート - タイトル、解説、タイトル、解説、タイトル、解説
import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { TemplateData } from './TemplateTypes'

interface ExplanationTwoTemplateProps {
  data: TemplateData
}

export function ExplanationTwoTemplate({ data }: ExplanationTwoTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - explanation2
  console.log('🎨 テンプレートデータ挿入 - explanation2')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - content: "${data.content || 'なし'}"`)
  console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
  console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
  console.log(`  - sections: [${data.sections?.length || 0}個]`)
  data.sections?.forEach((section, index) => {
    console.log(`    └─ ${index + 1}. "${section.title}" - "${section.content}"`)
  })
  console.log(`  - points: [${data.points?.length || 0}個]`)
  data.points?.forEach((point, index) => {
    console.log(`    └─ ${index + 1}. "${point.title}" - "${point.description}"`)
  })
  console.log('================================================================================')

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-300 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* メインタイトル */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>{data.badgeText || '詳細解説'}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            {data.title}
          </h1>
        </div>

        {/* メインコンテンツ */}
        {data.content && (
          <div className="text-center mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
              <p className="text-base font-medium text-gray-800 leading-relaxed">
                {data.content}
              </p>
            </div>
          </div>
        )}

        {/* ポイント型コンテンツ */}
        {data.points && data.points.length > 0 && (
          <div className="flex-1 space-y-4">
            {data.points.map((point, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  {point.title}
                </h3>
                <p className="text-base text-gray-800 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* セクション型コンテンツ */}
        {data.sections && data.sections.length > 0 && (
          <div className="flex-1 space-y-4">
            {data.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  {section.title}
                </h3>
                <p className="text-base text-gray-800 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 補足説明 */}
        {data.subtitle && (
          <div className="mt-4 text-center">
            <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-600">
              <p className="text-base text-blue-600 font-medium">
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
export const explanationTwoMetadata = {
  id: 'explanation2',
  name: '解説型２',
  description: '複数のポイントを順次解説する形式',
  suitableFor: {
    contentTypes: ['手順説明', '段階的解説', '複数ポイント'],
    genres: ['ノウハウ系', 'ナレッジ系'],
    dataStructure: ['階層構造', '順序付き'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 40,
    items: 50         // 各解説文
  },
  keywords: ['手順', 'ステップ', '段階', '方法', '解説', '詳細', '具体的']
}