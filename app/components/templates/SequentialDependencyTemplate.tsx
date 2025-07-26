// SequentialDependencyTemplate - typeID002順序依存ステップ型
import React from 'react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon, cleanMarkdown } from './TemplateTypes'
import { CheckSquare } from 'lucide-react'

interface SequentialDependencyTemplateProps {
  data: TemplateData
}

export function SequentialDependencyTemplate({ data }: SequentialDependencyTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - sequential-dependency
  console.log('🎨 テンプレートデータ挿入 - sequential-dependency')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - content: "${data.content || 'なし'}"`)
  console.log(`  - pointNumber: "${data.stepNumber || data.pointNumber || 'なし'}"`)
  console.log(`  - stepTitle: "${data.stepTitle || 'なし'}"`)
  console.log(`  - stepContent: [${data.stepContent?.length || 0}個]`)
  data.stepContent?.forEach((item, index) => {
    console.log(`    └─ ${index + 1}. "${item}"`)
  })
  console.log(`  - items: [${data.items?.length || 0}個]`)
  data.items?.forEach((item, index) => {
    const itemText = typeof item === 'string' ? item : item.content || item.title || ''
    console.log(`    └─ ${index + 1}. "${itemText.substring(0, 50)}..."`)
  })
  console.log('================================================================================')

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-4">
          {(() => {
            const { badge, title } = splitTitleForBadge(data.title)
            const pointNumber = data.stepNumber || data.pointNumber || 1
            const badgeText = badge || data.badgeText || `Point ${pointNumber}`
            
            return (
              <>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '12px'}}>
                  <svg width="400" height="50">
                    <rect x="0" y="0" width="400" height="50" fill="#f59e0b" rx="4" />
                    <text x="200" y="32" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">{badgeText}</text>
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                  {data.stepTitle || title}
                </h1>
              </>
            )
          })()}
        </div>

        {/* メインコンテンツ部分 */}
        <div className="flex-1 space-y-4">
          {/* ステップコンテンツがある場合 */}
          {data.stepContent && data.stepContent.length > 0 && (
            <div className="space-y-3">
              {data.stepContent.map((content, index) => (
                <div key={index} className="bg-white border-2 border-amber-500 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-lg leading-relaxed font-medium">
                      {cleanMarkdown(content)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* アイテムデータがある場合 */}
          {data.items && data.items.length > 0 && (
            <div className="space-y-3">
              {data.items.map((item, index) => {
                const itemText = typeof item === 'string' ? item : item.content || item.title || ''
                const cleanText = cleanMarkdown(itemText)
                
                return (
                  <div key={index} className="bg-white border-2 border-amber-500 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed font-medium">
                        {cleanText}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* 通常のコンテンツがある場合 */}
          {!data.stepContent && !data.items && data.content && (
            <div className="bg-white border-2 border-amber-500 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <CheckSquare className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  {data.content.split('\n').map((line, index) => (
                    <p key={index} className="text-gray-700 text-lg leading-relaxed font-medium mb-2 last:mb-0">
                      {cleanMarkdown(line)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* アクションアイテムがある場合 */}
          {data.actionItems && data.actionItems.length > 0 && (
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
              <h3 className="text-blue-800 font-bold text-lg mb-3">具体的なアクション</h3>
              <div className="space-y-2">
                {data.actionItems.map((action, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      ✓
                    </div>
                    <span className="text-blue-800 font-medium">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}

// メタデータ
export const sequentialDependencyMetadata = {
  id: 'sequential-dependency',
  name: '順序依存ステップ型',
  description: 'typeID002に対応した順序依存型ステップフロー',
  suitableFor: {
    contentTypes: ['スキル習得', '手順解説', '段階的学習'],
    genres: ['キャリア・就活', 'スキルアップ'],
    dataStructure: ['順序依存', 'ステップバイステップ', '段階的'],
    complexity: 'medium' as const,
    pageCount: { min: 3, max: 8 }
  },
  characterLimits: {
    title: 30,
    content: 150,
    subtitle: 25,
    items: 80
  },
  keywords: ['ポイント', 'ステップ', '手順', '段階', '順序', 'Point', '備える', '身に着ける']
}