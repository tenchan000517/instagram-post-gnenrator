// ⑫シンプル型６テンプレート - タイトル、ボックスでチェックボックス、ポイント、下に解説（コンパクト配置）
import React from 'react'
import { TemplateData } from './TemplateTypes'
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
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <List className="w-4 h-4" />
            <span>{data.badgeText || '重要項目'}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {data.title}
          </h1>
        </div>

        {/* コンパクトチェックリスト */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm h-full">
            <div className="space-y-4">
              {data.checklist?.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 pt-1">
                    {item.checked ? (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-bold text-blue-800">
                        {item.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {data.points?.[index]?.description || ''}
                    </p>
                  </div>
                </div>
              )) || (
                // フォールバック: デフォルトのチェック項目
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 pt-1">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-bold text-blue-800">
                        {data.content || "重要なポイント"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      詳細な説明文が入ります
                    </p>
                  </div>
                </div>
              )}
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