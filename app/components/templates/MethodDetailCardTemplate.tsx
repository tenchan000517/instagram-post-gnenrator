import React from 'react'
import { TemplateProps } from './TemplateTypes'

interface MethodDetailCardData {
  pageTitle: string
  methods: Array<{
    methodName: string
    steps: string[]
    benefit: string
  }>
  pageNumber?: number
}

export const MethodDetailCardTemplate: React.FC<TemplateProps> = ({ data }) => {
  const templateData = data as unknown as MethodDetailCardData

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

      {/* 手法カード */}
      <div className="space-y-6 flex-1">
        {templateData.methods.map((method, index) => (
          <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
            {/* 手法名 */}
            <h3 className="font-bold text-lg mb-3 text-blue-600">
              {method.methodName}
            </h3>

            {/* ステップ */}
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-600 mb-2">手順:</p>
              <ul className="space-y-1">
                {method.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-sm flex items-start">
                    <span className="text-gray-400 mr-2">{stepIndex + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 効果 */}
            <div className="bg-blue-50 rounded p-3">
              <p className="text-sm">
                <span className="font-semibold">効果: </span>
                {method.benefit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const methodDetailCardMetadata = {
  id: 'method-detail-card',
  name: '手法詳細カード表示',
  description: '手法の詳細をカード形式で表示',
  characterLimits: {
    pageTitle: 30,
    methodName: 25,
    step: 50,
    benefit: 60
  }
}