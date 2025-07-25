// feature_parallel_info テンプレート - 機能紹介並列型
import React from 'react'
import { TemplateData } from './TemplateTypes'

interface FeatureParallelInfoTemplateProps {
  data: TemplateData
}

export function FeatureParallelInfoTemplate({ data }: FeatureParallelInfoTemplateProps) {
  // 🎯 K113正解パターン専用テンプレート
  console.log('🎯 feature_parallel_info テンプレート - K113正解パターン')
  console.log('生成データ:', data)

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/* 機能番号表示 */}
      <div className="absolute top-6 left-6">
        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
          {data.featureNumber || '1'}
        </div>
      </div>
      
      <div className="p-8 pt-20 flex flex-col h-full">
        {/* 機能名 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {data.featureName || 'スタンプゲーム'}
          </h1>
        </div>

        {/* 機能説明 */}
        <div className="mb-8">
          <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-400">
            <p className="text-lg text-gray-800 leading-relaxed">
              {data.description || 'DMで送られたスタンプに反応してミニゲームがスタート！フォロワーとインタラクティブに交流できます。'}
            </p>
          </div>
        </div>

        {/* 効果・メリット */}
        <div className="flex-1">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <h3 className="text-xl font-bold mb-4">💡 効果・メリット</h3>
            <p className="text-lg leading-relaxed">
              {data.effect || '親近感を高め、エンゲージメント向上！フォロワーとの距離を縮め、ファン化を促進します。'}
            </p>
          </div>
        </div>

        {/* ボトムメッセージ */}
        {data.bottomNote && (
          <div className="mt-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-xl p-4">
              <p className="text-yellow-800 font-medium text-center">
                {data.bottomNote}
              </p>
            </div>
          </div>
        )}

        {/* 装飾要素 */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-200 rounded-full translate-y-16 translate-x-16 opacity-30"></div>
      </div>
    </div>
  )
}

// メタデータ
export const featureParallelInfoMetadata = {
  id: 'feature_parallel_info',
  name: '機能紹介並列型',
  description: 'Instagram新機能の紹介に特化した並列情報表示',
  suitableFor: {
    contentTypes: ['機能紹介', '新機能解説', 'ツール説明'],
    genres: ['実用系', '情報提供系'],
    dataStructure: ['機能名', '説明', '効果'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    featureName: 20,
    description: 80,
    effect: 100
  },
  keywords: ['機能', '新機能', 'Instagram', '実用', '効果', '活用', '集客']
}