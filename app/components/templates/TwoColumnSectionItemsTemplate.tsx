// 2カラム セクション + アイテム構造用テンプレート
import React from 'react'
import { CheckCircle } from 'lucide-react'
import { IconClipboardCheck } from '@tabler/icons-react'
import { TemplateData } from './TemplateTypes'

interface TwoColumnSectionItemsTemplateProps {
  data: TemplateData
}

export function TwoColumnSectionItemsTemplate({ data }: TwoColumnSectionItemsTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - two-column-section-items
  console.log('🎨 テンプレートデータ挿入 - two-column-section-items')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - content: "${data.content || 'なし'}"`)
  console.log(`  - sections: [${data.sections?.length || 0}個]`)
  data.sections?.forEach((section, index) => {
    console.log(`    └─ ${index + 1}. "${section.title}" - items: ${section.items?.length || 0}個`)
  })
  console.log('================================================================================')

  // sectionsデータの取得
  const directSections = data.sections || []
  const contentObj = typeof data.content === 'string' ? data : data.content
  const contentSections = contentObj?.sections || []
  const sections = directSections.length > 0 ? directSections : contentSections

  // 2つのセクションを取得
  const leftSection = sections[0]
  const rightSection = sections[1]

  // タイトルを「：」で分割してバッジとタイトルに分ける関数
  const splitTitle = (title: string) => {
    if (title && title.includes('：')) {
      const parts = title.split('：')
      return {
        badge: parts[0].trim(),
        title: parts[1].trim()
      }
    }
    return {
      badge: '',
      title: title
    }
  }

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
        </div>

        {/* メイン説明文 */}
        {data.content && (
          <div className="text-center mb-6">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
              <p className="text-base font-medium text-gray-800 leading-relaxed">
                {typeof data.content === 'string' ? data.content : data.content?.description}
              </p>
            </div>
          </div>
        )}

        {/* 2カラムセクション */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          {/* 左カラム */}
          {leftSection && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
              {(() => {
                const { badge, title } = splitTitle(leftSection.title)
                return (
                  <div className="mb-3">
                    {badge && (
                      <div className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-base font-medium mb-2">
                        <IconClipboardCheck className="w-5 h-5" />
                        <span>{badge}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-blue-600">
                      {title}
                    </h3>
                  </div>
                )
              })()}
              <p className="text-base text-gray-700 mb-4 leading-relaxed">
                {leftSection.content}
              </p>
              
              {/* アイテムリスト */}
              {leftSection.items && leftSection.items.length > 0 && (
                <div className="space-y-2">
                  {leftSection.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <IconClipboardCheck className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-gray-800 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 右カラム */}
          {rightSection && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
              {(() => {
                const { badge, title } = splitTitle(rightSection.title)
                return (
                  <div className="mb-3">
                    {badge && (
                      <div className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-base font-medium mb-2">
                        <IconClipboardCheck className="w-5 h-5" />
                        <span>{badge}</span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-blue-600">
                      {title}
                    </h3>
                  </div>
                )
              })()}
              <p className="text-base text-gray-700 mb-4 leading-relaxed">
                {rightSection.content}
              </p>
              
              {/* アイテムリスト */}
              {rightSection.items && rightSection.items.length > 0 && (
                <div className="space-y-2">
                  {rightSection.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <IconClipboardCheck className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-gray-800 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

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
export const twoColumnSectionItemsMetadata = {
  id: 'two-column-section-items',
  name: '2カラムセクション+アイテム型',
  description: '2つのセクションを左右に配置し、それぞれにアイテムリストを表示',
  suitableFor: {
    contentTypes: ['比較説明', '2つのポイント', 'カテゴリー別リスト'],
    genres: ['ノウハウ系', 'ナレッジ系'],
    dataStructure: ['2セクション構造', 'アイテム付きセクション'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 25,
    content: 80,
    subtitle: 40,
    sectionTitle: 20,
    sectionContent: 60,
    items: 30
  },
  keywords: ['比較', '2つ', 'カテゴリー', '分類', '対比', '左右', 'バランス']
}