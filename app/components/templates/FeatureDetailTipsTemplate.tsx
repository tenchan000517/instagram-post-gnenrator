// feature_detail_tips テンプレート - 機能詳細Tips型
import React from 'react'
import { TemplateData } from './TemplateTypes'

interface FeatureDetailTipsTemplateProps {
  data: TemplateData
}

export function FeatureDetailTipsTemplate({ data }: FeatureDetailTipsTemplateProps) {
  // 🎯 K113 Page3専用テンプレート
  console.log('🎯 feature_detail_tips テンプレート - K113 Page3専用')
  console.log('生成データ:', data)

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200 rounded-full -translate-y-8 translate-x-8 opacity-40"></div>
      
      <div className="p-8 flex flex-col h-full">
        {/* 説明文 */}
        <div className="mb-8">
          <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-400">
            <p className="text-lg text-gray-800 leading-relaxed">
              {data.explanation || 'インスタ集客に欠かせないのがDMでのメッセージのやりとり♪'}
            </p>
          </div>
        </div>

        {/* Tips見出し */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-800 text-center">
            💡 活用Tips
          </h2>
        </div>

        {/* Tips一覧 */}
        <div className="flex-1 space-y-4">
          {(data.tips || []).map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-purple-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 pt-1">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-base text-gray-800 leading-relaxed">
                    {typeof tip === 'string' ? tip : tip.content || String(tip)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 装飾要素 */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 rounded-full translate-y-16 -translate-x-16 opacity-30"></div>
      </div>
    </div>
  )
}

// メタデータ
export const featureDetailTipsMetadata = {
  id: 'feature_detail_tips',
  name: '機能詳細Tips型',
  description: '機能の詳細説明とTips一覧表示',
  suitableFor: {
    contentTypes: ['機能詳細', 'Tips解説', '活用方法'],
    genres: ['実用系', '情報提供系'],
    dataStructure: ['説明', 'Tips配列'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    explanation: 100,
    tips: 150
  },
  keywords: ['詳細', 'Tips', '活用', '方法', '具体的', '手順']
}