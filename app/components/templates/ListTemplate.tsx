// ④リスト型テンプレート - タイトル、カードタイプのリスト、解説
import React from 'react'
import { List, MessageCircle, Bookmark } from 'lucide-react'
import { TemplateData } from './TemplateTypes'

interface ListTemplateProps {
  data: TemplateData
}

export function ListTemplate({ data }: ListTemplateProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-100/20 to-blue-200/20"></div>
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-blue-300 rounded-full blur-2xl opacity-20"></div>
      </div>
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-3 shadow-lg">
            <List className="w-4 h-4" />
            <span>{data.badgeText || 'リスト'}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            {data.title}
          </h1>
        </div>

        {/* カードタイプリスト */}
        <div className="flex-1 space-y-3">
          {data.items?.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-md border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs">•</span>
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium text-gray-800 leading-relaxed">
                    {typeof item === 'string' ? item : item.title || item.content || String(item)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* コールアウト */}
        <div className="mt-4">
          <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-400">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-3 h-3 text-white" />
              </div>
              <p className="text-sm font-bold text-blue-800">
                質問はコメント
              </p>
            </div>
            <p className="text-sm text-blue-700 font-medium">
              または、DMで！
            </p>
          </div>
        </div>

        {/* ページナンバー */}
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            <span>2</span>
            <span>/</span>
            <span>6</span>
          </div>
        </div>
        
        {/* ブランドマーク */}
        <div className="mt-2 text-center">
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
export const listMetadata = {
  id: 'list',
  name: 'リスト型',
  description: 'カード形式のリスト表示',
  suitableFor: {
    contentTypes: ['リスト', 'ランキング', '選択肢'],
    genres: ['紹介系', 'ナレッジ系'],
    dataStructure: ['点列挙', '順序付き'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 60,     // 解説文
    items: 35         // 各リスト項目
  },
  keywords: ['リスト', '一覧', '選択', 'おすすめ', 'ランキング', '種類', '方法']
}