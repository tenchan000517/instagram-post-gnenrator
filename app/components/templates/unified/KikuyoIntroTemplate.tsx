import React from 'react'
import Image from 'next/image'
import { CheckSquare, Bookmark } from 'lucide-react'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'

interface KikuyoIntroTemplateProps {
  data: TemplateData
  targetId?: string
}

interface KikuyoIntroData {
  title: string
  catchphrase: string
  problems: string[]
  solution: string
  callToAction: string
  introMessage?: string
  kikuyoCharacter: {
    message: string
    tone: string
  }
}

// KIKUYO専用配色定義
const KIKUYO_COLORS = {
  primary: '#F59E0B',    // アンバー-500
  secondary: '#FCD34D',  // アンバー-300
  accent: '#D97706',     // アンバー-600
  background: '#FEF3C7', // アンバー-100
  text: '#1A1A1A'        // テキスト色
}

const KikuyoIntroTemplate: React.FC<KikuyoIntroTemplateProps> = ({ data, targetId }) => {
  const kikuyoData = data as unknown as KikuyoIntroData
  
  const {
    title,
    catchphrase,
    problems = [],
    solution,
    callToAction,
    introMessage,
    kikuyoCharacter
  } = kikuyoData

  return (
    <div 
      className="w-full h-full flex flex-col justify-center items-center p-8 relative"
      style={{ 
        fontFamily: "'Noto Sans JP', sans-serif"
      }}
    >


      {/* メインコンテンツ - 全体を統一コンテナで囲む */}
      <div className="z-10 text-center w-full max-w-xl mx-auto">
        
        {/* 問題提起セクション - 角丸薄アンバー透過10% */}
        <div className="mb-2">
          <div 
            className="p-6 rounded-2xl"
            style={{ 
              backgroundColor: 'rgba(251, 191, 36, 0.15)', // 薄アンバー透過15%
              backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3 text-left">
                  <CheckSquare 
                    className="w-7 h-7 flex-shrink-0 mt-1" 
                    style={{ color: KIKUYO_COLORS.accent }}
                  />
                  <p 
                    className="text-lg leading-relaxed text-gray-800 font-medium"
                  >
                    {cleanMarkdown(problem)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 下向き三角 - SVG */}
        <div className="flex justify-center mb-2">
          <svg 
            width="48" 
            height="32" 
            viewBox="0 0 48 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-amber-400"
          >
            <path 
              d="M8 8 L24 24 L40 8 Z" 
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </div>

        {/* 紹介メッセージ */}
        {introMessage && (
          <div className="text-center mb-6">
            <p className="text-xl font-bold text-gray-800 leading-relaxed whitespace-pre-line">
              今回はそんな悩みを解決する
            </p>
            <p className="text-xl font-bold text-gray-800 leading-relaxed whitespace-pre-line">
              {cleanMarkdown(introMessage)}
            </p>
          </div>
        )}

        {/* 2カラムレイアウト */}
        <div className="flex gap-6 mb-6 w-full">
          {/* 左カラム - キャラクター用余白 (1/3) */}
          <div className="w-1/3">
            {/* キャラクター配置用空間 - CANVAで後から配置 */}
          </div>
          
          {/* 右カラム - メッセージボックス (2/3) */}
          <div className="w-2/3">
            <div 
              className="bg-white p-6 rounded-2xl shadow-md border-2 mb-4"
              style={{ borderColor: KIKUYO_COLORS.primary }}
            >
              <p 
                className="text-lg leading-relaxed mb-4 text-left font-bold"
                style={{ color: KIKUYO_COLORS.text }}
              >
                {cleanMarkdown(solution)}
              </p>
              
            </div>

            {/* CTA - 右カラム内 */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 text-lg font-bold text-gray-800">
                <span className="mb-4">あとで見返すときは</span>
                <Bookmark 
                  className="w-10 h-10 fill-current" 
                  style={{ color: KIKUYO_COLORS.primary }}
                />
                <span className="mb-4">で保存！</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// メタデータ
export const kikuyoIntroMetadata = {
  templateId: 'kikuyo_intro',
  name: 'KIKUYO導入テンプレート',
  description: 'KIKUYO専用の導入ページテンプレート（データ分析系口調対応）',
  category: 'intro',
  dataStructure: {
    title: 'string',
    catchphrase: 'string',
    problems: 'string[]',
    solution: 'string',
    callToAction: 'string',
    kikuyoCharacter: {
      message: 'string',
      tone: 'string'
    }
  },
  colorScheme: KIKUYO_COLORS,
  targetTypes: ['T005'], // KIKUYOのターゲット（仮）
  usageNotes: [
    'KIKUYO専用配色（アンバー系）を使用',
    'データ分析系の口調に対応',
    '問題提起→解決策→CTAの流れ',
    'キャラクターメッセージ欄あり'
  ]
}

export default KikuyoIntroTemplate