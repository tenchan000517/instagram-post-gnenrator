// ②説明型テンプレート - タイトル、概要、解説
import React from 'react'
import { BookOpen, Target } from 'lucide-react'
import { TemplateData } from './TemplateTypes'

interface ExplanationTemplateProps {
  data: TemplateData
}

export function ExplanationTemplate({ data }: ExplanationTemplateProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 背景装飾パターン */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-200 rounded-full"></div>
        <div className="absolute top-40 right-16 w-3 h-3 bg-blue-300 rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-5 h-5 bg-blue-200 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-300 rounded-full"></div>
      </div>
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <BookOpen className="w-4 h-4" />
            <span>{data.badgeText || '詳しく解説'}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {data.title}
          </h1>
        </div>

        {/* 概要セクション */}
        {data.subtitle && (
          <div className="mb-6">
            <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xl font-bold text-blue-800 leading-tight">
                    {data.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* メイン解説 */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center">
              <p className="text-lg text-gray-800 leading-relaxed font-medium">
                {data.content}
              </p>
            </div>
          </div>
        </div>

        {/* フッター部分 */}
        <div className="mt-4 text-center">
          <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-400">
            <p className="text-base text-blue-800 font-medium">
              理解を深めて実践に活かしましょう
            </p>
          </div>
        </div>
        
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
export const explanationMetadata = {
  id: 'explanation',
  name: '説明型',
  description: 'タイトル、概要、詳細解説の構成',
  suitableFor: {
    contentTypes: ['解説', '概念説明', '定義'],
    genres: ['ナレッジ系', 'ノウハウ系'],
    dataStructure: ['階層構造', '概要→詳細'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 25,
    content: 120,     // メイン解説文
    subtitle: 50,     // 概要文
    items: 0          // 使用しない
  },
  keywords: ['とは', '意味', '理由', '背景', '重要性', '効果', '影響']
}