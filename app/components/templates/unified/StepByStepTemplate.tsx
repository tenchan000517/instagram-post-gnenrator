import React from 'react'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'
import { Clock, CheckCircle2 } from 'lucide-react'
import { getT009DynamicFontClass } from '../../../utils/fontUtils'

interface StepByStepTemplateProps {
  data: TemplateData
  targetId?: string
}

export function StepByStepTemplate({ data, targetId }: StepByStepTemplateProps) {
  // データ構造を直接参照するか、content配下を参照するかを判定
  const contentArray = (data as any).content || (data as any) || {};
  const dynamicFontClass = getT009DynamicFontClass(targetId);
  
  // データ取得
  const stepNumber = contentArray.stepNumber || 1;
  const totalSteps = contentArray.totalSteps || 6;
  const stepTitle = contentArray.stepTitle || '';
  const duration = contentArray.duration || '';
  const instructions = contentArray.instructions || [];
  const tips = contentArray.tips || '';
  const imageSrc = contentArray.imageSrc || '/king_work.png';
  const imageAlt = contentArray.imageAlt || 'キャラクター';

  return (
    <div className="w-full h-full bg-white relative overflow-hidden flex flex-col">
      {/* 進捗バー */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
          style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
        />
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 p-8 flex flex-col">
        {/* ステップヘッダー */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-black text-blue-600">
                STEP {stepNumber}
              </span>
              <span className="text-2xl text-gray-500">
                / {totalSteps}
              </span>
            </div>
            {duration && (
              <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-lg font-bold text-orange-600">
                  {duration}
                </span>
              </div>
            )}
          </div>
          <h2 className={`text-3xl font-bold text-gray-800 ${dynamicFontClass}`}>
            {cleanMarkdown(stepTitle)}
          </h2>
        </div>

        {/* 手順リスト */}
        <div className="flex-1 flex gap-6">
          <div className="flex-1">
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm border border-blue-200">
              <ul className="space-y-4">
                {instructions.map((instruction: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <p className={`text-lg text-gray-700 leading-relaxed flex-1 ${dynamicFontClass}`}>
                      {cleanMarkdown(instruction)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* ヒント・補足 */}
            {tips && (
              <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className={`text-gray-700 ${dynamicFontClass}`}>
                    {cleanMarkdown(tips)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* キャラクター画像 */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="px-8 pb-6">
        <div className="text-center text-gray-600 font-bold">
          次のステップへ進む準備ができたら次のページへ
        </div>
      </div>
    </div>
  )
}

export const stepByStepMetadata = {
  id: 'step_by_step',
  name: '手順ガイド型',
  description: '1ページ1ステップで手順を説明する専用テンプレート',
  suitableFor: {
    contentTypes: ['手順説明', '実装ガイド', 'ステップバイステップ'],
    genres: ['Type004', '実践型', 'How-to'],
    dataStructure: ['stepNumber', 'totalSteps', 'stepTitle', 'duration', 'instructions', 'tips'],
    complexity: 'medium',
    pageCount: { min: 3, max: 10 }
  },
  characterLimits: {
    title: 50,
    content: 300,
    subtitle: 30,
    items: 80
  },
  keywords: ['手順', 'ステップ', 'ガイド', '実装', 'How-to']
}