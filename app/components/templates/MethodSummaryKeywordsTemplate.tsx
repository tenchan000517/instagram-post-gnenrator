import React from 'react'
import { TemplateProps } from './TemplateTypes'

interface MethodSummaryKeywordsData {
  pageTitle: string
  lastMethod: {
    name: string
    description: string
    effectiveness: string
  }
  relatedKeywords: string[]
  emotionalBenefits: string[]
  pageNumber?: number
}

export const MethodSummaryKeywordsTemplate: React.FC<TemplateProps> = ({ data }) => {
  const templateData = data as MethodSummaryKeywordsData

  return (
    <div className="bg-white rounded-lg p-8 h-full flex flex-col">
      {/* ページ番号 */}
      {templateData.pageNumber && (
        <div className="text-sm text-gray-500 mb-4">
          {templateData.pageNumber} / 5
        </div>
      )}

      {/* ページタイトル */}
      <h2 className="text-xl font-bold mb-6 text-center">
        {templateData.pageTitle}
      </h2>

      {/* 最終手法 */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-lg mb-2 text-purple-600">
          {templateData.lastMethod.name}
        </h3>
        <p className="text-sm mb-2">{templateData.lastMethod.description}</p>
        <p className="text-sm font-semibold text-purple-700">
          → {templateData.lastMethod.effectiveness}
        </p>
      </div>

      {/* キーワード */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm text-gray-600 mb-3">
          🔍 関連キーワード
        </h4>
        <div className="flex flex-wrap gap-2">
          {templateData.relatedKeywords.map((keyword, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* 感情的メリット */}
      <div className="mt-auto">
        <h4 className="font-semibold text-sm text-gray-600 mb-3">
          💫 得られる成果
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {templateData.emotionalBenefits.map((benefit, index) => (
            <div key={index} className="bg-green-50 rounded p-2">
              <p className="text-sm text-green-800">• {benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const methodSummaryKeywordsMetadata = {
  id: 'method-summary-keywords',
  name: '手法まとめ＋キーワード',
  description: '最終手法とキーワード集を表示',
  characterLimits: {
    pageTitle: 30,
    methodName: 25,
    description: 60,
    effectiveness: 50,
    keyword: 15,
    benefit: 20
  }
}