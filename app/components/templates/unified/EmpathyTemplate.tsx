// EMPATHY テンプレート - 共感ページ（問題共有 + 感情的つながり）
import React from 'react'
import { Heart, Users, MessageCircle } from 'lucide-react'
import { TemplateData } from '../TemplateTypes'

interface EmpathyTemplateProps {
  data: TemplateData
}

export function EmpathyTemplate({ data }: EmpathyTemplateProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-pink-200 rounded-full -translate-y-20 translate-x-20 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 rounded-full translate-y-16 -translate-x-16 opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-rose-100 rounded-full -translate-x-12 -translate-y-12 opacity-40"></div>
      
      <div className="relative z-10 p-6 flex flex-col min-h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          <div style={{display: 'flex', justifyContent: 'center', marginBottom: '16px'}}>
            <svg width="400" height="50">
              <rect x="0" y="0" width="400" height="50" fill="url(#empathyGradient)" rx="8" />
              <defs>
                <linearGradient id="empathyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <text x="200" y="32" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">{data.title}</text>
            </svg>
          </div>
        </div>

        {/* メインコンテンツ部分 */}
        <div className="flex-1 flex flex-col justify-center items-center">
          {/* キャラクター画像 */}
          {data.imageSrc && (
            <div className="mb-6 flex justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src={data.imageSrc} 
                  alt={data.imageAlt || "キャラクター画像"} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* 共感メッセージ */}
          <div className="bg-white/90 rounded-xl p-6 shadow-lg border border-pink-100 max-w-md mx-auto">
       
            <div className="text-center">
              <p className="text-base text-gray-700 leading-relaxed">
                {data.empathyMessage || data.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// メタデータ定義
export const empathyMetadata = {
  id: 'empathy',
  name: 'EMPATHY（共感）テンプレート', 
  description: '読者との感情的つながりを作る共感ページ',
  suitableFor: {
    contentTypes: ['共感', '問題共有', '感情的つながり', '導入'],
    genres: ['Type001感情共感型', 'キャリア・就活・自己啓発'],
    dataStructure: ['タイトル + 共感メッセージ + キャラクター画像'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 25,
    empathyMessage: 120,
    content: 120
  },
  keywords: ['共感', 'エンパシー', '感情', 'つながり', '理解', '寄り添い']
}