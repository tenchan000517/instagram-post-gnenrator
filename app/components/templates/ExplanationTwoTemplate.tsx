// ⑤解説型２テンプレート - タイトル、解説、タイトル、解説、タイトル、解説
import React from 'react'
import { AlertTriangle, User, Bookmark } from 'lucide-react'
import { TemplateData } from './TemplateTypes'

interface ExplanationTwoTemplateProps {
  data: TemplateData
}

export function ExplanationTwoTemplate({ data }: ExplanationTwoTemplateProps) {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-300 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* メインタイトル */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>{data.badgeText || '詳細解説'}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            {data.title}
          </h1>
        </div>

        {/* 中央メッセージ */}
        <div className="text-center mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-base font-medium text-gray-800 leading-relaxed">
              {data.content || "NGな発言を知っておかないと面接官に思わぬ誤解をまねき、落とされてしまうことも..."}
            </p>
          </div>
        </div>

        {/* 解説セクション */}
        <div className="flex-1 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-blue-200">
            <div className="text-center mb-3">
              <p className="text-sm font-bold text-blue-800">
                面接官にとってのNG発言を知っておくと
                何を求められるかがわかる！
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-2">
              今回は、面接対策サポートもやってる
            </p>
            <p className="text-base font-bold text-blue-800 mb-2">
              キャリア相談のプロが
            </p>
            <p className="text-sm font-bold text-blue-800 mb-2">
              NG・OK発言をまとめたものをご紹介します♪
            </p>
          </div>
        </div>

        {/* フッター */}
        <div className="mt-4 text-center">
          <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-400">
            <p className="text-sm font-bold text-blue-800 mb-2">
              面接前に見返せるように保存しておこう
            </p>
            <div className="flex justify-center">
              <div className="bg-white rounded-full p-2 shadow-sm">
                <Bookmark className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* ページナンバー */}
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            <span>2</span>
            <span>/</span>
            <span>9</span>
          </div>
        </div>
        
        {/* ブランドマーク */}
        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>FIND to DO</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// メタデータ
export const explanationTwoMetadata = {
  id: 'explanation2',
  name: '解説型２',
  description: '複数のポイントを順次解説する形式',
  suitableFor: {
    contentTypes: ['手順説明', '段階的解説', '複数ポイント'],
    genres: ['ノウハウ系', 'ナレッジ系'],
    dataStructure: ['階層構造', '順序付き'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 2 }
  },
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 40,
    items: 50         // 各解説文
  },
  keywords: ['手順', 'ステップ', '段階', '方法', '解説', '詳細', '具体的']
}