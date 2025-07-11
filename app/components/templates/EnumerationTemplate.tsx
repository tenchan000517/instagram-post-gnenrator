// ①列挙型テンプレート - タイトル、①～ポイント、ディスクリプション
import React from 'react'
import { CheckCircle } from 'lucide-react'
import { TemplateData } from './TemplateTypes'

interface EnumerationTemplateProps {
  data: TemplateData
}

export function EnumerationTemplate({ data }: EnumerationTemplateProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <CheckCircle className="w-4 h-4" />
            <span>{data.badgeText || 'チェック'}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {data.title}
          </h1>
        </div>

        {/* 列挙ポイント - カード形式 */}
        <div className="flex-1 space-y-3">
          {data.items?.map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-gray-800 leading-relaxed">
                    {typeof item === 'string' ? item : item.title || item.content || String(item)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* フッター部分 */}
        {data.subtitle && (
          <div className="mt-4 text-center">
            <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-400">
              <p className="text-base text-blue-800 font-medium">
                {data.subtitle}
              </p>
            </div>
          </div>
        )}
        
        {/* ブランドマーク */}
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>FIND to DO</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// メタデータ
export const enumerationMetadata = {
  id: 'enumeration',
  name: '列挙型',
  description: 'タイトル、番号付きポイント、説明文で構成',
  suitableFor: {
    contentTypes: ['リスト', 'ポイント説明', 'ステップ'],
    genres: ['ナレッジ系', 'ノウハウ系', '紹介系'],
    dataStructure: ['点列挙', '順序付き'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 25,        // タイトル最大文字数
    content: 0,       // 使用しない
    subtitle: 40,     // ディスクリプション最大文字数
    items: 30         // 各項目最大文字数
  },
  keywords: ['ポイント', '方法', 'コツ', '理由', 'メリット', 'ステップ', '手順']
}