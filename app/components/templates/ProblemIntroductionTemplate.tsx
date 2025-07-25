import React from 'react'
import { TemplateProps } from './TemplateTypes'

interface ProblemIntroductionData {
  mainTitle: string
  problemStatement: string
  hookPhrases: string[]
  pageNumber?: number
}

export const ProblemIntroductionTemplate: React.FC<TemplateProps> = ({ data }) => {
  const templateData = data as unknown as ProblemIntroductionData

  return (
    <div className="bg-white rounded-lg p-8 h-full flex flex-col">
      {/* ページ番号 */}
      {templateData.pageNumber && (
        <div className="text-sm text-gray-500 mb-4">
          {templateData.pageNumber} / 5
        </div>
      )}

      {/* メインタイトル */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        {templateData.mainTitle}
      </h1>

      {/* 問題説明 */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <p className="text-lg leading-relaxed">
          {templateData.problemStatement}
        </p>
      </div>

      {/* フックフレーズ */}
      <div className="mt-auto">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          💡 注目ポイント
        </h3>
        <div className="space-y-2">
          {templateData.hookPhrases.map((phrase, index) => (
            <div key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">▶</span>
              <span className="text-sm">{phrase}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const problemIntroductionMetadata = {
  id: 'problem-introduction',
  name: '問題導入専用',
  description: '問題提起と導入フックを表示',
  characterLimits: {
    mainTitle: 30,
    problemStatement: 150,
    hookPhrase: 40
  }
}