// ⑪シンプル型５テンプレート - ステップ型レイアウト
import React from 'react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon, cleanMarkdown } from './TemplateTypes'
import { CheckSquare } from 'lucide-react'
// 純粋なCSS数字アイコンコンポーネント（Tablerアイコンの代替）
const NumberIcon = ({ number }: { number: number }) => (
  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-green-500 font-bold text-sm">
    {number}
  </div>
)

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
  console.log(`  - items: [${data.items?.length || 0}個]`)
  data.items?.forEach((item, index) => {
    const itemText = typeof item === 'string' ? item : item.content || item.title || ''
    console.log(`    └─ ${index + 1}. "${itemText.substring(0, 50)}..."`)
  })
  console.log('================================================================================')

  // ステップ数字（1から始まる）
  const getStepNumber = (index: number) => index + 1

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-4">
          {(() => {
            const { badge, title } = splitTitleForBadge(data.title)
            const PageIcon = getPageNumberIcon(data.pageNumber || 1)
            const badgeText = badge || data.badgeText || 'ステップ確認'
            
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

        {/* ステップリスト */}
        <div className="flex-1 space-y-4">
          {/* ステップデータ優先 */}
          {data.steps?.map((step, index) => {
            const stepNumber = getStepNumber(index)
            
            return (
              <div key={index} className="space-y-2">
                {/* 統合ボックス */}
                <div className="bg-white border-2 border-black rounded-lg p-4">
                  {/* STEP + タイトル */}
                  <div className="flex items-start gap-4 mb-3">
                    <h4 className="text-green-600 font-bold text-2xl leading-tight underline">
                      STEP {stepNumber}
                    </h4>
                    <h3 className="text-blue-600 font-bold text-2xl leading-tight underline flex-1">
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* チェック + ディスクリプション */}
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-8 h-8 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-lg leading-relaxed font-bold">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          }) || 
          /* アイテムデータの処理 */
          data.items?.map((item, index) => {
            const stepNumber = getStepNumber(index)
            // itemからマークダウン記法を除去してステップタイトルと説明を抽出
            const itemText = typeof item === 'string' ? item : item.content || item.title || ''
            // マークダウン記法を除去
            const cleanText = cleanMarkdown(itemText)
            // "ステップ1：タイトル"の部分と説明部分を分離
            const parts = cleanText.split('\n')
            const titlePart = parts[0] || ''
            const descriptionPart = parts.slice(1).join('\n').trim() || ''
            
            return (
              <div key={index} className="space-y-2">
                {/* 統合ボックス */}
                <div className="bg-white border-2 border-black rounded-lg p-4">
                  {/* STEP + タイトル */}
                  <div className="flex items-start gap-4 mb-3">
                    <h4 className="text-green-600 font-bold text-2xl leading-tight underline">
                      STEP {stepNumber}
                    </h4>
                    <h3 className="text-blue-600 font-bold text-2xl leading-tight underline flex-1">
                      {titlePart}
                    </h3>
                  </div>
                  
                  {/* チェック + ディスクリプション */}
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-8 h-8 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-lg leading-relaxed font-bold">
                      {descriptionPart}
                    </p>
                  </div>
                </div>
              </div>
            )
          }) || 
          /* チェックリストデータ */
          data.checklist?.map((item, index) => {
            const stepNumber = getStepNumber(index)
            
            return (
              <div key={index} className="space-y-2">
                {/* 統合ボックス */}
                <div className="bg-white border-2 border-black rounded-lg p-4">
                  {/* STEP + タイトル */}
                  <div className="flex items-start gap-4 mb-3">
                    <h4 className="text-green-600 font-bold text-2xl leading-tight underline">
                      STEP {stepNumber}
                    </h4>
                    <h3 className="text-blue-600 font-bold text-2xl leading-tight underline flex-1">
                      {item.text}
                    </h3>
                  </div>
                  
                  {/* チェック + ディスクリプション */}
                  <div className="flex items-start gap-3">
                    <CheckSquare className="w-8 h-8 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-lg leading-relaxed font-bold">
                      {data.points?.[index]?.description || ''}
                    </p>
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