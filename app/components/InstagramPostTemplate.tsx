'use client'

import { ReactNode } from 'react'
import { 
  User, Users, Award, Briefcase, Heart, Target, 
  Clock, CheckCircle, AlertCircle, Star, 
  TrendingUp, BookOpen, Coffee, Laptop,
  Lightbulb, MessageCircle, Share2, ArrowRight
} from 'lucide-react'

interface PostSlideProps {
  number?: number
  title: string
  content: string | ReactNode
  illustration?: ReactNode
  backgroundColor?: string
  textColor?: string
  ctaButton?: {
    text: string
    action?: () => void
  }
  highlight?: string
  subText?: string
}

export function PostSlide({
  number,
  title,
  content,
  illustration,
  backgroundColor = '#ffffff',
  textColor = '#1e40af',
  ctaButton,
  highlight,
  subText
}: PostSlideProps) {
  return (
    <div 
      className="w-full h-full flex flex-col relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* 背景グラデーション（青基調） */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
             style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5"
             style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full opacity-3 transform -translate-x-1/2 -translate-y-1/2"
             style={{ background: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)' }} />
      </div>
      
      {/* コンテンツカード */}
      <div className="relative flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-5xl p-6 flex flex-col border-4 border-blue-100 relative">
          {/* 装飾的な角丸四角形 */}
          <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl opacity-40"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl opacity-30"></div>
          
          {/* タイトル部分 */}
          <div className="text-center mb-4">
            <h1 
              className="text-3xl font-black leading-tight mb-2"
              style={{ color: '#1e40af' }}
            >
              {title}
            </h1>
            {highlight && (
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {highlight} <span className="text-blue-500">💡</span>
              </div>
            )}
          </div>

          {/* 番号とコンテンツ */}
          {number && (
            <div 
              className="inline-flex items-center justify-center px-8 py-3 rounded-full mb-4 mx-auto shadow-xl"
              style={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                boxShadow: '0 8px 30px rgba(37, 99, 235, 0.4)'
              }}
            >
              <span className="text-white text-2xl font-black">
                {number}
              </span>
            </div>
          )}

          {/* イラスト */}
          {illustration && (
            <div className="flex justify-center mb-4">
              {illustration}
            </div>
          )}

          {/* メインコンテンツ */}
          <div 
            className="text-center text-xl leading-relaxed font-bold mb-4 px-4"
            style={{ color: textColor }}
          >
            {content}
          </div>

          {/* サブテキスト */}
          {subText && (
            <div className="text-center text-lg mb-4 font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              {subText}
            </div>
          )}

          {/* CTAボタン */}
          {ctaButton && (
            <button
              onClick={ctaButton.action}
              className="mx-auto px-8 py-3 rounded-full text-lg font-black text-white flex items-center gap-3 hover:scale-105 transition-all shadow-2xl hover:shadow-3xl"
              style={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                boxShadow: '0 8px 30px rgba(37, 99, 235, 0.4)'
              }}
            >
              {ctaButton.text}
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

    </div>
  )
}

// テンプレートタイプの定義
export type TemplateType = 'table' | 'checklist' | 'labeled-list' | 'point-explanation' | 'hybrid'

// 表型テンプレート
export function TableTemplate({
  title,
  headers,
  rows,
  highlight,
  caption
}: {
  title: string
  headers: string[]
  rows: string[][]
  highlight?: string
  caption?: string
}) {
  return (
    <div className="w-[1080px] h-[1080px] bg-white flex flex-col p-12">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
             style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' }} />
      </div>

      {/* ヘッダー */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-5xl font-black text-blue-800 mb-4">{title}</h1>
        {highlight && (
          <p className="text-2xl text-blue-600 font-bold">{highlight}</p>
        )}
      </div>

      {/* テーブル */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border-2 border-blue-100 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600">
                {headers.map((header, index) => (
                  <th key={index} className="text-white text-2xl font-bold py-6 px-4 text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="text-xl text-gray-800 py-5 px-4 text-center font-medium border-b border-blue-100">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* キャプション */}
      {caption && (
        <div className="text-center mt-8 relative z-10">
          <p className="text-2xl text-blue-700 font-medium">{caption}</p>
        </div>
      )}

      {/* FIND to DO ブランディング */}
      <div className="absolute bottom-8 left-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-blue-600">
          <p className="text-xl font-bold text-blue-600">FIND to DO</p>
        </div>
      </div>
    </div>
  )
}

// チェックリスト型テンプレート
export function ChecklistTemplate({
  title,
  items,
  checkedItems = [],
  highlight,
  subText
}: {
  title: string
  items: string[]
  checkedItems?: number[]
  highlight?: string
  subText?: string
}) {
  return (
    <div className="w-[1080px] h-[1080px] bg-white flex flex-col p-12">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-5"
             style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-5"
             style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' }} />
      </div>

      {/* ヘッダー */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-5xl font-black text-blue-800 mb-4">{title}</h1>
        {highlight && (
          <p className="text-3xl text-blue-600 font-bold">{highlight}</p>
        )}
      </div>

      {/* チェックリスト */}
      <div className="flex-1 relative z-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          {items?.map((item, index) => (
            <div key={index} className="flex items-center gap-6 bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-blue-200 transition-all">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                checkedItems?.includes(index) 
                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                  : 'bg-gray-200'
              }`}>
                {checkedItems?.includes(index) ? (
                  <CheckCircle className="w-8 h-8 text-white" />
                ) : (
                  <div className="w-8 h-8 rounded-full border-3 border-gray-400" />
                )}
              </div>
              <p className={`text-2xl font-semibold ${
                checkedItems?.includes(index) ? 'text-gray-800' : 'text-gray-600'
              }`}>
                {item}
              </p>
            </div>
          )) || (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">チェックリストが設定されていません</p>
            </div>
          )}
        </div>
      </div>

      {/* サブテキスト */}
      {subText && (
        <div className="text-center mt-8 relative z-10">
          <p className="text-2xl text-blue-700 font-medium">{subText}</p>
        </div>
      )}

      {/* FIND to DO ブランディング */}
      <div className="absolute bottom-8 left-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-green-500">
          <p className="text-xl font-bold text-green-600">FIND to DO</p>
        </div>
      </div>
    </div>
  )
}

// ラベル付きリスト型テンプレート
export function LabeledListTemplate({
  title,
  items,
  highlight,
  categoryLabel
}: {
  title: string
  items: Array<{
    label: string
    title: string
    subtitle?: string
    badge?: string
  }>
  highlight?: string
  categoryLabel?: string
}) {
  return (
    <div className="w-[1080px] h-[1080px] bg-white flex flex-col p-12">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
             style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' }} />
      </div>

      {/* ヘッダー */}
      <div className="text-center mb-8 relative z-10">
        <h1 className="text-5xl font-black text-blue-800 mb-4">{title}</h1>
        {highlight && (
          <p className="text-3xl text-orange-600 font-bold">{highlight}</p>
        )}
      </div>

      {/* カテゴリラベル */}
      {categoryLabel && (
        <div className="mb-6 relative z-10">
          <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full text-xl font-bold shadow-lg">
            {categoryLabel}
          </div>
        </div>
      )}

      {/* リスト */}
      <div className="flex-1 relative z-10">
        <div className="space-y-4 max-w-4xl mx-auto">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-100 flex items-start gap-6">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-xl font-bold min-w-fit">
                {item.label}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-xl text-gray-600">{item.subtitle}</p>
                )}
              </div>
              {item.badge && (
                <div className="bg-red-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                  {item.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FIND to DO ブランディング */}
      <div className="absolute bottom-8 left-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-orange-500">
          <p className="text-xl font-bold text-orange-600">FIND to DO</p>
        </div>
      </div>
    </div>
  )
}

// ポイント・補足説明型テンプレート
export function PointExplanationTemplate({
  title,
  points,
  highlight
}: {
  title: string
  points: Array<{
    title: string
    explanation: string
    icon?: ReactNode
    number?: number
  }>
  highlight?: string
}) {
  return (
    <div className="w-[1080px] h-[1080px] bg-white flex flex-col p-12">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-5 transform -translate-x-1/2 -translate-y-1/2"
             style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' }} />
      </div>

      {/* ヘッダー */}
      <div className="text-center mb-10 relative z-10">
        <h1 className="text-5xl font-black text-blue-800 mb-4">{title}</h1>
        {highlight && (
          <p className="text-3xl text-purple-600 font-bold">{highlight}</p>
        )}
      </div>

      {/* ポイントリスト */}
      <div className="flex-1 relative z-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          {points?.map((point, index) => (
            <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 shadow-lg border-2 border-purple-100">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                  {point?.number || index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-black text-purple-800 mb-3">{point?.title}</h3>
                  <p className="text-xl text-gray-700 leading-relaxed">{point?.explanation}</p>
                </div>
                {point?.icon && (
                  <div className="text-purple-500">
                    {point.icon}
                  </div>
                )}
              </div>
            </div>
          )) || (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">ポイントが設定されていません</p>
            </div>
          )}
        </div>
      </div>

      {/* FIND to DO ブランディング */}
      <div className="absolute bottom-8 left-8">
        <div className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-purple-500">
          <p className="text-xl font-bold text-purple-600">FIND to DO</p>
        </div>
      </div>
    </div>
  )
}

// 複合型テンプレート（複数の要素を組み合わせ）
export function HybridTemplate({
  title,
  sections,
  highlight
}: {
  title: string
  sections: Array<{
    type: 'checklist' | 'points' | 'table' | 'labeled-list'
    data: any
  }>
  highlight?: string
}) {
  return (
    <div className="w-[1080px] h-[1080px] bg-white flex flex-col p-10">
      {/* 背景装飾 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-5"
             style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-5"
             style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' }} />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full opacity-3"
             style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }} />
      </div>

      {/* ヘッダー */}
      <div className="text-center mb-6 relative z-10">
        <h1 className="text-4xl font-black text-blue-800 mb-2">{title}</h1>
        {highlight && (
          <p className="text-2xl text-pink-600 font-bold">{highlight}</p>
        )}
      </div>

      {/* セクション */}
      <div className="flex-1 relative z-10 space-y-4 overflow-y-auto">
        {sections.map((section, index) => (
          <div key={index} className="mb-4">
            {section.type === 'checklist' && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 shadow-md">
                <div className="space-y-2">
                  {section.data.items.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <p className="text-lg font-medium text-gray-800">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section.type === 'points' && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 shadow-md">
                <div className="space-y-3">
                  {section.data.points.map((point: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="bg-purple-500 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800">{point.title}</h4>
                        <p className="text-sm text-gray-600">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section.type === 'table' && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-500">
                      {section.data.headers.map((header: string, idx: number) => (
                        <th key={idx} className="text-white text-sm font-bold py-2 px-3">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.data.rows.map((row: string[], rowIdx: number) => (
                      <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                        {row.map((cell: string, cellIdx: number) => (
                          <td key={cellIdx} className="text-sm text-gray-800 py-2 px-3 text-center">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {section.type === 'labeled-list' && (
              <div className="space-y-2">
                {section.data.items.map((item: any, idx: number) => (
                  <div key={idx} className="bg-orange-50 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                      {item.label}
                    </div>
                    <p className="text-sm font-medium text-gray-800">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FIND to DO ブランディング */}
      <div className="absolute bottom-6 left-6">
        <div className="bg-white rounded-xl p-3 shadow-lg border-l-4 border-pink-500">
          <p className="text-lg font-bold text-pink-600">FIND to DO</p>
        </div>
      </div>
    </div>
  )
}

// イラストコンポーネント集
export const Illustrations = {
  teamWork: (
    <div className="relative w-96 h-64">
      <div className="absolute left-0 top-8">
        <div className="w-32 h-40 bg-yellow-300 rounded-t-full flex items-center justify-center">
          <User className="w-16 h-16 text-gray-700" />
        </div>
      </div>
      <div className="absolute left-32 top-0">
        <div className="w-32 h-40 bg-blue-300 rounded-t-full flex items-center justify-center">
          <User className="w-16 h-16 text-gray-700" />
        </div>
      </div>
      <div className="absolute left-64 top-8">
        <div className="w-32 h-40 bg-green-300 rounded-t-full flex items-center justify-center">
          <User className="w-16 h-16 text-gray-700" />
        </div>
      </div>
    </div>
  ),

  working: (
    <div className="relative w-80 h-64">
      <div className="w-64 h-48 bg-pink-100 rounded-3xl flex items-center justify-center">
        <Laptop className="w-32 h-32 text-gray-700" />
      </div>
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-200 rounded-full flex items-center justify-center">
        <Clock className="w-16 h-16 text-gray-700" />
      </div>
    </div>
  ),

  success: (
    <div className="relative w-80 h-64">
      <div className="w-64 h-64 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-32 h-32 text-green-600" />
      </div>
      <div className="absolute -right-12 -top-12">
        <Star className="w-16 h-16 text-yellow-500 fill-yellow-500" />
      </div>
      <div className="absolute -left-12 top-0">
        <Star className="w-12 h-12 text-yellow-500 fill-yellow-500" />
      </div>
    </div>
  ),

  growth: (
    <div className="relative w-80 h-64">
      <div className="w-full h-full flex items-end justify-center gap-4">
        <div className="w-16 h-32 bg-blue-300 rounded-t-lg" />
        <div className="w-16 h-48 bg-green-300 rounded-t-lg" />
        <div className="w-16 h-64 bg-purple-300 rounded-t-lg" />
        <TrendingUp className="absolute right-0 top-0 w-24 h-24 text-green-600" />
      </div>
    </div>
  ),

  selfLove: (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <div className="w-48 h-48 bg-pink-100 rounded-full flex items-center justify-center">
        <User className="w-24 h-24 text-gray-700" />
      </div>
      <Heart className="absolute -top-4 -right-4 w-16 h-16 text-pink-500 fill-pink-500" />
      <Heart className="absolute -bottom-4 -left-4 w-12 h-12 text-pink-400 fill-pink-400" />
    </div>
  ),

  priority: (
    <div className="relative w-96 h-64">
      <div className="flex gap-8 items-center">
        {/* 付箋イラスト */}
        <div className="w-24 h-24 bg-yellow-200 rounded-lg shadow-md transform -rotate-6" />
        <div className="w-32 h-32 bg-pink-200 rounded-lg shadow-md flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-700">1</span>
        </div>
        <div className="w-24 h-24 bg-blue-200 rounded-lg shadow-md transform rotate-6" />
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-20 h-20 bg-orange-200 rounded-lg shadow-md" />
      </div>
    </div>
  )
}

// 完璧主義から完了主義への投稿例
export function PerfectionistToCompletionistPost() {
  const slides = [
    {
      title: "完璧主義から完了主義になりたい",
      highlight: "1人だと思考を直すのが難しい...",
      illustration: Illustrations.teamWork,
      content: (
        <div>
          <p className="mb-4">誰に相談したらいいかわからない💭</p>
          <p>そんなときは...</p>
        </div>
      ),
      subText: (
        <div>
          <span className="text-yellow-600 font-bold">✏️ キャリアのプロを頼ろう！</span><br />
          プロフィールの無料体験<br />
          URLからキャリア相談受付中
        </div>
      )
    },
    {
      title: "完璧主義から完了主義になる方法",
      highlight: "まとめ💡",
      content: (
        <div className="space-y-12 text-left max-w-3xl mx-auto">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">1</div>
              <h3 className="text-3xl font-bold">100点を目指さない</h3>
            </div>
            <p className="text-2xl text-gray-600 ml-20">
              60〜70点でOK😊気持ちが楽になれる！<br />
              ミスや修正に柔軟に対応可能
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">2</div>
              <h3 className="text-3xl font-bold">合格点を超えたら自分を褒める</h3>
            </div>
            <p className="text-2xl text-gray-600 ml-20">
              減点→加点方式に変える<br />
              <span className="text-orange-600 font-bold">成功体験を積み上げる</span>ことが大事
            </p>
          </div>
        </div>
      )
    },
    {
      title: "完璧主義から完了主義になる方法",
      content: (
        <div className="space-y-12 text-left max-w-3xl mx-auto">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">3</div>
              <h3 className="text-3xl font-bold">優先順位をつけて取り組む</h3>
            </div>
            <p className="text-2xl text-gray-600 ml-20">
              まずはやるべきことを全て書き出そう！<br />
              <span className="text-orange-600 font-bold">優先度に分けて取り組む</span>と効率アップ
            </p>
          </div>
          
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">4</div>
              <h3 className="text-3xl font-bold">時間制限を設定する</h3>
            </div>
            <p className="text-2xl text-gray-600 ml-20">
              トータルの作業時間だけでなく<br />
              <span className="text-orange-600 font-bold">個々のタスクにも時間制限を設ける</span>ことで<br />
              ゴールを追いやすい。<span className="text-orange-600">「こだわること」も減る♪</span>
            </p>
          </div>
        </div>
      )
    },
    {
      title: "完璧主義から完了主義になる方法",
      number: 5,
      content: (
        <div>
          <h3 className="text-3xl font-bold mb-8">1人で全てやろうとしない</h3>
          <p className="text-2xl text-gray-600 mb-8">
            苦手なことは人に頼る！<br />
            <span className="text-orange-600 font-bold">得意なことをやって効率的に！</span>
          </p>
        </div>
      ),
      illustration: Illustrations.teamWork,
      subText: (
        <div>
          <span className="text-yellow-600 font-bold">✏️ 苦手なことは他の人に頼って</span><br />
          自分は得意なことをすることで<br />
          お互いに効率アップ！
        </div>
      ),
      ctaButton: {
        text: "完璧主義から完了主義になる方法 まとめ"
      }
    }
  ]

  return slides
}

// FIND to DO 用の投稿テンプレート
export function FindToDoPostTemplate({
  strategy,
  content
}: {
  strategy: 'self-realization' | 'loss-avoidance' | 'investment' | 'urgency' | 'relationships'
  content: any
}) {
  const templates = {
    'self-realization': [
      {
        title: "何もないから何かがあるへ",
        highlight: "3ヶ月で人生が変わった学生の話",
        illustration: Illustrations.success,
        content: (
          <div>
            <p className="mb-4">プロジェクトに参加して</p>
            <p className="text-4xl font-bold text-orange-600">実践スキルを身につけた！</p>
          </div>
        ),
        subText: "あなたも変われる✨"
      }
    ],
    'loss-avoidance': [
      {
        title: "就活で後悔する学生の共通点",
        highlight: "これに当てはまったら要注意⚠️",
        content: (
          <div className="space-y-8 text-left max-w-3xl mx-auto">
            <div className="text-2xl">
              <span className="text-orange-600 font-bold">❌ 実践経験がない</span><br />
              <span className="text-orange-600 font-bold">❌ 自分の強みがわからない</span><br />
              <span className="text-orange-600 font-bold">❌ 面接で話せることがない</span>
            </div>
          </div>
        ),
        ctaButton: {
          text: "今すぐ対策を始める"
        }
      }
    ],
    'investment': [
      {
        title: "今やれば将来10倍返ってくること",
        highlight: "学生時代の投資が人生を決める",
        illustration: Illustrations.growth,
        content: (
          <div>
            <p className="text-3xl mb-4">スキルアップ・人脈・実践経験</p>
            <p className="text-2xl text-gray-600">今の行動が未来の年収を左右する</p>
          </div>
        ),
        subText: "投資は今がチャンス💰"
      }
    ],
    'urgency': [
      {
        title: "就活まで残り1年でやるべきこと",
        highlight: "今しかできない重要なアクション",
        illustration: <Clock className="w-48 h-48 text-orange-500" />,
        content: (
          <div>
            <p className="text-3xl mb-4">今すぐ：自己分析開始</p>
            <p className="text-3xl mb-4">3ヶ月後：スキル習得</p>
            <p className="text-3xl">1年後：自信を持って就活</p>
          </div>
        ),
        ctaButton: {
          text: "今日から始めよう"
        }
      }
    ],
    'relationships': [
      {
        title: "一生続く仲間の作り方",
        highlight: "本当の仲間は財産になる",
        illustration: Illustrations.teamWork,
        content: (
          <div>
            <p className="text-3xl mb-4">共通の目標を持つ</p>
            <p className="text-3xl mb-4">一緒に苦労する</p>
            <p className="text-3xl">互いを支え合う</p>
          </div>
        ),
        subText: "素敵な仲間を見つけよう🤝"
      }
    ]
  }

  return templates[strategy] || templates['self-realization']
}