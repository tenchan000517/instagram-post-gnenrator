import React from 'react'
import { TemplateProps } from './TemplateTypes'

interface MethodVisualGuideData {
  pageTitle: string
  methods: Array<{
    methodName: string
    description: string
    effectiveness: string
  }>
  pageNumber?: number
}

export const MethodVisualGuideTemplate: React.FC<TemplateProps> = ({ data }) => {
  const templateData = data as unknown as MethodVisualGuideData

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

      {/* ビジュアルガイド */}
      <div className="space-y-6 flex-1">
        {templateData.methods.map((method, index) => (
          <div key={index} className="relative">
            {/* ビジュアルアクセント */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600"></div>
            
            <div className="pl-6">
              {/* 手法名 */}
              <h3 className="font-bold text-lg mb-2">
                {method.methodName}
              </h3>

              {/* 説明 */}
              <p className="text-gray-700 mb-3">
                {method.description}
              </p>

              {/* 効果性 */}
              <div className="inline-block bg-green-100 text-green-800 rounded-full px-4 py-2">
                <span className="text-sm font-semibold">
                  ✨ {method.effectiveness}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const methodVisualGuideMetadata = {
  id: 'method-visual-guide',
  name: 'ビジュアル手法ガイド',
  description: '手法をビジュアル重視で表示',
  characterLimits: {
    pageTitle: 30,
    methodName: 25,
    description: 80,
    effectiveness: 50
  }
}