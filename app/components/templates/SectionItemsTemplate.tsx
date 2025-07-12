// セクション + アイテム構造用テンプレート - 純粋構造ベースアプローチ
import React from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { TemplateData } from './TemplateTypes'

interface SectionItemsTemplateProps {
  data: TemplateData
}

export function SectionItemsTemplate({ data }: SectionItemsTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - section-items
  console.log('🎨 テンプレートデータ挿入 - section-items')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
  console.log(`  - content: "${data.content || 'なし'}"`)
  console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
  
  // pointsデータを取得（pureStructureMatchingService用）
  const points = data.points || []
  console.log(`  - points: [${points.length}個]`)
  points.forEach((point, index) => {
    console.log(`    └─ ポイント ${index + 1}: "${point.title || 'タイトルなし'}"`)
    console.log(`       └─ 説明: "${point.description?.substring(0, 50) || 'なし'}..."`)
  })
  
  // フォールバック: 従来のsections構造もサポート
  const contentObj = typeof data.content === 'string' ? data : data.content
  const sections = contentObj?.sections || []
  if (sections.length > 0) {
    console.log(`  - sections: [${sections.length}個]`)
    sections.forEach((section, index) => {
      console.log(`    └─ セクション ${index + 1}: "${section.title || 'タイトルなし'}"`)
      console.log(`       ├─ 内容: "${section.content?.substring(0, 50) || 'なし'}..."`)
      console.log(`       └─ アイテム: [${section.items?.length || 0}個]`)
    })
  }
  console.log('================================================================================')

  // points構造を優先、フォールバックでsections構造
  const mainSection = points.length > 0 
    ? { title: points[0].title, content: points[0].description, items: [] }
    : sections[0]
  
  // アイテムリストを取得（sectionsからのみ取得可能）
  const actionItems = sections.length > 0 && sections[0].items ? sections[0].items : []
  console.log(`  - actionItems: [${actionItems.length}個]`)
  actionItems.forEach((item, index) => {
    console.log(`    └─ アクション ${index + 1}: "${item}"`)
  })

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <CheckCircle className="w-4 h-4" />
            <span>{data.badgeText || 'アクション'}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-base text-gray-600 font-medium mt-2">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* メイン説明文 */}
        {data.content && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100 mb-4">
            <p className="text-base text-gray-800 leading-relaxed text-center">
              {data.content}
            </p>
          </div>
        )}

        {/* セクション詳細 */}
        {mainSection && (
          <div className="flex-1 space-y-4">
            {/* セクションタイトル & 説明 */}
            <div className="bg-blue-600 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold">
                  {mainSection.title}
                </h2>
              </div>
              {mainSection.content && (
                <p className="text-base text-white text-opacity-90 leading-relaxed">
                  {mainSection.content}
                </p>
              )}
            </div>

            {/* アクションアイテム */}
            {actionItems && actionItems.length > 0 && (
              <div className="space-y-3">
                {actionItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 pt-1">
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-base font-medium text-gray-800 leading-relaxed">
                        {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// メタデータ
export const sectionItemsMetadata = {
  id: 'section-items',
  name: 'セクション+アイテム型',
  description: '1つのメインセクションと複数のアクション項目',
  suitableFor: {
    contentTypes: ['アクションリスト', '実践ガイド', 'ハウツー'],
    genres: ['ナレッジ系', 'ノウハウ系', '実践系'],
    dataStructure: ['sections + items'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 30,
    content: 100,
    subtitle: 40,
    sectionTitle: 25,
    sectionContent: 120,
    items: 40
  },
  structureRequirements: {
    sectionsCount: 1,
    sectionItemsMin: 3,
    sectionItemsMax: 7
  }
}