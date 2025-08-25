import React from 'react'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'
import { Check } from 'lucide-react'
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
      {/* メインコンテンツ */}
      <div className="flex-1 px-4 pb-4 pt-2 flex flex-col">
        {/* ステップヘッダー */}
        <div className="mb-6">
          <div className="flex items-baseline gap-3 mb-4 pb-4">
            <span className="text-6xl font-black text-blue-600">
              STEP {stepNumber}
            </span>
            <span className="text-2xl text-gray-500">
              / {totalSteps}
            </span>
          </div>
          
          {/* 進捗バー */}
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner mt-4">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 relative rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${(stepNumber / totalSteps) * 100}%`,
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full"
              />
            </div>
          </div>
          <h2 className={`text-3xl font-bold text-gray-800 ${dynamicFontClass}`}>
            {cleanMarkdown(stepTitle)}
          </h2>
        </div>

        {/* メインコンテンツ - フル幅 */}
        <div className="flex-1 mb-1">
          <div className="bg-blue-50 rounded-lg p-6 shadow-sm border border-blue-200">
            {/* HTML自由描画エリア（visualContent が存在する場合） */}
            {contentArray.visualContent ? (
              <div 
                className="visual-content-area"
                dangerouslySetInnerHTML={{ __html: contentArray.visualContent }}
                style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  fontFamily: 'monospace',
                  color: '#374151',
                  whiteSpace: 'pre-wrap'
                }}
              />
            ) : (
              /* 従来のリスト形式 */
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
            )}
          </div>
        </div>

        {/* ヒント・補足とキャラクター */}
        {tips && (
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div 
                className="bg-purple-50 rounded-lg p-4 border border-purple-200 overflow-visible"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px',
                  backgroundColor: '#faf5ff'
                }}
              >
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <p className={`text-gray-700 ${dynamicFontClass}`}>
                    {cleanMarkdown(tips)}
                  </p>
                </div>
              </div>
            </div>

            {/* キャラクター画像 */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}
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