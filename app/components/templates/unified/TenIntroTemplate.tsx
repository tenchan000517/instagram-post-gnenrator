import React from 'react'
import Image from 'next/image'
import { CheckSquare, Bookmark } from 'lucide-react'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'

interface TenIntroTemplateProps {
  data: TemplateData
  targetId?: string
}

interface TenIntroData {
  title: string
  catchphrase: string
  problems: string[]
  solution: string
  callToAction: string
  introMessage?: string
  tenCharacter: {
    message: string
    tone: string
  }
}

// TEN専用配色定義
const TEN_COLORS = {
  primary: '#2D5016',    // メイン緑
  secondary: '#4A7C2A',  // セカンダリ緑
  accent: '#6B9F3E',     // アクセント緑
  background: '#F8FBF4', // 背景色
  text: '#1A1A1A'        // テキスト色
}

const TenIntroTemplate: React.FC<TenIntroTemplateProps> = ({ data, targetId }) => {
  const tenData = data as unknown as TenIntroData
  
  const {
    title,
    catchphrase,
    problems = [],
    solution,
    callToAction,
    introMessage,
    tenCharacter
  } = tenData

  return (
    <div 
      className="w-full h-full flex flex-col justify-center items-center p-8 relative"
      style={{ 
        fontFamily: "'Noto Sans JP', sans-serif"
      }}
    >


      {/* メインコンテンツ - 全体を統一コンテナで囲む */}
      <div className="z-10 text-center w-full max-w-xl mx-auto">
        
        {/* 問題提起セクション - 角丸薄紫透過50% */}
        <div className="mb-2">
          <div 
            className="p-6 rounded-2xl"
            style={{ 
              backgroundColor: 'rgba(139, 69, 196, 0.1)', // 薄紫透過10%
              backgroundImage: `
                linear-gradient(rgba(128,128,128,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(128,128,128,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3 text-left">
                  <CheckSquare 
                    className="w-7 h-7 text-blue-800 flex-shrink-0 mt-1" 
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
            className="text-indigo-400"
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
              className="bg-white p-6 rounded-2xl shadow-md border-2 mb-4 border-indigo-400"
            >
              <p 
                className="text-lg leading-relaxed mb-4 text-left font-bold"
                style={{ color: TEN_COLORS.text }}
              >
                {cleanMarkdown(solution)}
              </p>
              
            </div>

            {/* CTA - 右カラム内 */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 text-lg font-bold text-gray-800">
                <span className="mb-4">あとで見返すときは</span>
                <Bookmark className="w-10 h-10 text-indigo-400 fill-current" />
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
export const tenIntroMetadata = {
  templateId: 'ten_intro',
  name: 'TEN導入テンプレート',
  description: 'TEN専用の導入ページテンプレート（古風な武士口調対応）',
  category: 'intro',
  dataStructure: {
    title: 'string',
    catchphrase: 'string',
    problems: 'string[]',
    solution: 'string',
    callToAction: 'string',
    tenCharacter: {
      message: 'string',
      tone: 'string'
    }
  },
  colorScheme: TEN_COLORS,
  targetTypes: ['T004'], // TENのターゲット
  usageNotes: [
    'TEN専用配色（緑系）を使用',
    '古風な武士口調に対応',
    '問題提起→解決策→CTAの流れ',
    'キャラクターメッセージ欄あり'
  ]
}

export default TenIntroTemplate