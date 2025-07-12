// ⑪シンプル型５テンプレート - ステップ型レイアウト
import React from 'react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'
import { CheckSquare } from 'lucide-react'
import { IconNumber1, IconNumber2, IconNumber3, IconNumber4, IconNumber5, IconNumber6, IconNumber7, IconNumber8 } from '@tabler/icons-react'

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
  console.log(`  - steps: [${data.steps?.length || 0}個]`)
  data.steps?.forEach((step, index) => {
    console.log(`    └─ ステップ${step.step}: "${step.title}" - "${step.description}"`)
  })
  console.log(`  - points: [${data.points?.length || 0}個]`)
  data.points?.forEach((point, index) => {
    console.log(`    └─ ${index + 1}. "${point.description || point}"`)
  })
  console.log('================================================================================')

  // ステップ数字アイコンのマッピング
  const stepIcons = [
    IconNumber1, IconNumber2, IconNumber3, IconNumber4,
    IconNumber5, IconNumber6, IconNumber7, IconNumber8
  ]

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
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

        {/* ステップリスト */}
        <div className="flex-1 space-y-4">
          {data.steps?.map((step, index) => {
            const StepIcon = stepIcons[index] || IconNumber1
            
            return (
              <div key={index} className="space-y-2">
                {/* 統合ボックス + ステップラベル（重なり） */}
                <div className="relative">
                  {/* 統合ボックス（タイトル + チェック + ディスクリプション） */}
                  <div className="bg-white border-2 border-black rounded-lg p-2 pt-6">
                    <h3 className="text-blue-600 font-bold text-lg leading-tight underline mb-3 text-center">
                      {step.title}
                    </h3>
                    
                    {/* チェック + ディスクリプション */}
                    <div className="flex items-start gap-3">
                      <CheckSquare className="w-8 h-8 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm leading-relaxed font-bold">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* ステップラベル（左上に重なり） */}
                  <div className="absolute -top-2 -left-2 bg-green-500 px-3 py-1 rounded-md flex items-center gap-2">
                    <span className="text-white font-medium text-sm">ステップ</span>
                    <StepIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            )
          }) || data.checklist?.map((item, index) => {
            const StepIcon = stepIcons[index] || IconNumber1
            
            return (
              <div key={index} className="space-y-2">
                {/* 統合ボックス + ステップラベル（重なり） */}
                <div className="relative">
                  {/* 統合ボックス（タイトル + チェック + ディスクリプション） */}
                  <div className="bg-white border-2 border-black rounded-lg p-4 pt-6">
                    <h3 className="text-blue-600 font-bold text-lg leading-tight underline mb-3">
                      {item.text}
                    </h3>
                    
                    {/* チェック + ディスクリプション */}
                    <div className="flex items-start gap-3">
                      <CheckSquare className="w-8 h-8 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm leading-relaxed font-bold">
                        {data.points?.[index]?.description || ''}
                      </p>
                    </div>
                  </div>
                  
                  {/* ステップラベル（左上に重なり） */}
                  <div className="absolute -top-2 -left-2 bg-green-300 px-3 py-1 rounded-md flex items-center gap-2">
                    <span className="text-white font-medium text-sm">ステップ</span>
                    <StepIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
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