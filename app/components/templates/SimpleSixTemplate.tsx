// ⑫シンプル型６テンプレート - タイトル、ボックスでチェックボックス、ポイント、下に解説（コンパクト配置）
import React from 'react'
import { TemplateData } from './TemplateTypes'
import { CheckCircle, Circle } from 'lucide-react'

interface SimpleSixTemplateProps {
  data: TemplateData
}

export function SimpleSixTemplate({ data }: SimpleSixTemplateProps) {
  return (
    <div className="w-full h-full p-8 bg-white flex flex-col">
      {/* タイトル */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800 leading-tight">
          {data.title}
        </h1>
      </div>

      {/* コンパクトチェックリスト */}
      <div className="flex-1">
        <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 h-full">
          <div className="space-y-5">
            {data.checklist?.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 pt-1">
                  {item.checked ? (
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-blue-800">
                      {item.text}
                    </span>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {data.points?.[index]?.description || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 補足説明 */}
      {data.subtitle && (
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600 font-medium">
            {data.subtitle}
          </p>
        </div>
      )}
    </div>
  )
}

// メタデータ
export const simpleSixMetadata = {
  id: 'simple6',
  name: 'シンプル型６',
  description: 'コンパクトなチェックリスト配置',
  suitableFor: {
    contentTypes: ['簡潔チェック', '要点確認', '基本項目'],
    genres: ['ノウハウ系', 'ナレッジ系'],
    dataStructure: ['簡潔', 'コンパクト'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 30,
    items: 35         // 各チェック項目と解説
  },
  keywords: ['簡潔', 'コンパクト', '要点', '基本', 'シンプル', '確認', '短時間']
}