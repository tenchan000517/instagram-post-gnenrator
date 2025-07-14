// チェックリスト（詳細説明付き）専用テンプレート - Critical Priority対応
import React from 'react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'
import { CheckSquare } from 'lucide-react'

interface ChecklistEnhancedTemplateProps {
  data: TemplateData
}

export function ChecklistEnhancedTemplate({ data }: ChecklistEnhancedTemplateProps) {
  // 🔧 必須: タイトルとバッジの分離（全テンプレート共通）
  const { badge, title } = splitTitleForBadge(data.title)
  
  // 🔧 必須: ページ番号アイコン取得（全テンプレート共通）
  const PageIcon = getPageNumberIcon(data.pageNumber || 1)

  // チェックリストアイテムの取得
  const checklistItems = data.checklistItems || []

  return (
    <div className="w-full h-full relative bg-white flex flex-col">
      
      {/* 🎨 背景装飾（共通パターン） */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>

      {/* 📱 コンテンツコンテナ（相対位置・z-index） */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        
        {/* 🏷️ 標準ヘッダー（バッジ＋タイトル） */}
        <div className="mb-6">
          {/* バッジ（ページアイコン付き） */}
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '12px'}}>
            <svg width="400" height="50">
              <rect x="0" y="0" width="400" height="50" fill="#60a5fa" rx="4" />
              <text x="200" y="32" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">{data.badgeText || badge}</text>
            </svg>
          </div>
          
          {/* メインタイトル */}
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {title}
          </h1>
          
          {/* サブタイトル（オプション） */}
          {data.subtitle && (
            <p className="text-lg text-gray-700 mt-3">{data.subtitle}</p>
          )}
        </div>

        {/* 📄 メインコンテンツエリア - チェックリスト専用 */}
        <div className="flex-1">
          {/* 導入説明文（オプション） */}
          {data.content && (
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 border border-blue-100">
              <p className="text-base font-medium text-gray-800 leading-relaxed text-center">
                {typeof data.content === 'string' ? data.content : (data.content as any)?.content}
              </p>
            </div>
          )}

          {/* チェックリストアイテム */}
          {checklistItems.length > 0 && (
            <div className="space-y-4">
              {checklistItems.map((item: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
                  <div className="flex items-start gap-4">
                    {/* チェックボックスアイコン */}
                    <div className="flex-shrink-0 mt-1">
                      <CheckSquare className="w-7 h-7 text-green-600" />
                    </div>
                    
                    {/* テキストコンテンツ */}
                    <div className="flex-1">
                      {/* チェックリスト項目名 */}
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {item.text}
                      </h3>
                      
                      {/* 詳細説明（この機能が失われていた） */}
                      {item.description && (
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* フォールバック: checklistItemsが無い場合は通常のitemsを表示 */}
          {checklistItems.length === 0 && data.items && data.items.length > 0 && (
            <div className="space-y-4">
              {data.items.map((item: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <CheckSquare className="w-7 h-7 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-medium text-gray-800 leading-relaxed">
                        {typeof item === 'string' ? item : item.content || item.title || ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🔚 フッター/サブタイトル（標準パターン） */}
        {data.subtitle && (
          <div className="mt-6">
            <div className="bg-white rounded-2xl p-4 border-l-4 border-green-600">
              <p className="text-base text-green-800 font-medium">
                ✅ {data.subtitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// メタデータ（必須）
export const checklistEnhancedMetadata = {
  id: 'checklist-enhanced',
  name: 'チェックリスト（詳細付き）',
  description: 'チェックリスト項目と詳細説明を含む構造',
  suitableFor: {
    contentTypes: ['チェックリスト', 'タスク管理', '確認項目', '手順書'],
    genres: ['ノウハウ系', '実践系', '準備系'],
    dataStructure: ['checklistItems with descriptions'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 30,       // タイトル文字数制限
    content: 80,     // 導入説明文字数制限
    subtitle: 40,    // サブタイトル文字数制限
    items: 60        // チェックリスト項目文字数制限
  },
  keywords: ['チェックリスト', 'タスク', '確認', '項目', '手順', 'TODO'],
  structureRequirements: {
    // チェックリスト構造の要件
    checklistItemsRequired: true,
    itemsMin: 3,
    itemsMax: 8,
    descriptionSupported: true
  }
}