// ⑩シンプル型４テンプレート - タイトル、ボックスでチェックボックス、ポイント、下に解説
import React from 'react'
import { TemplateData } from './TemplateTypes'
import { CheckCircle, Circle } from 'lucide-react'

interface SimpleFourTemplateProps {
  data: TemplateData
}

export function SimpleFourTemplate({ data }: SimpleFourTemplateProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <CheckCircle className="w-4 h-4" />
            <span>{data.badgeText || 'チェックリスト'}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            {data.title}
          </h1>
        </div>

        {/* チェックリスト */}
        <div className="flex-1 space-y-4">
          {data.checklist?.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 pt-1">
                  {item.checked ? (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-800 mb-1">
                    {item.text}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {data.points?.[index]?.description || ''}
                  </p>
                </div>
              </div>
            </div>
          )) || (
            // フォールバック: デフォルトのチェックリスト
            <>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 pt-1">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-blue-800 mb-1">
                      {data.content || "まずは自己分析から始めましょう"}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      自分の強みや価値観を明確にする
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 pt-1">
                    <Circle className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-blue-800 mb-1">
                      業界・企業研究を進める
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      志望する業界の特徴を把握
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 pt-1">
                    <Circle className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-blue-800 mb-1">
                      エントリーシートを作成
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      魅力的な自己PRを作成
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
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
export const simpleFourMetadata = {
  id: 'simple4',
  name: 'シンプル型４',
  description: 'チェックボックス付きポイント解説',
  suitableFor: {
    contentTypes: ['チェックリスト', '確認事項', '条件'],
    genres: ['ノウハウ系', 'ナレッジ系'],
    dataStructure: ['チェックリスト', '確認項目'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 40,
    items: 60         // 各チェック項目と解説
  },
  keywords: ['チェック', '確認', '必要', '条件', '要件', '準備', '完了', '済み']
}