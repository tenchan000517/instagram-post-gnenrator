import React from 'react'
import { TemplateData, TemplateMetadata, getPageNumberIcon, splitTitleForBadge, cleanMarkdown } from './TemplateTypes'
import { Trophy, Award, Medal } from 'lucide-react'

interface RankingTemplateProps {
  data: TemplateData
}

const RankingTemplate: React.FC<RankingTemplateProps> = ({ data }) => {
  const { badge, title: cleanTitle } = splitTitleForBadge(data.title)
  const PageIcon = getPageNumberIcon(data.pageNumber || 1)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Award className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-600">{rank}</div>
    }
  }

  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
      default:
        return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
    }
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg min-h-[500px] flex flex-col">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <PageIcon className="w-8 h-8 text-blue-600" />
          {badge && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {cleanMarkdown(badge)}
            </span>
          )}
        </div>
      </div>

      {/* タイトル */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          {cleanMarkdown(cleanTitle)}
        </h1>
        {data.description && (
          <p className="text-gray-600 mt-2 text-sm">
            {cleanMarkdown(data.description)}
          </p>
        )}
      </div>

      {/* ランキングデータ */}
      <div className="flex-1 space-y-4">
        {data.rankingData?.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 ${getRankBgColor(item.rank)} transition-all hover:shadow-md`}
          >
            <div className="flex items-center space-x-4">
              {/* ランク表示 */}
              <div className="flex-shrink-0">
                {getRankIcon(item.rank)}
              </div>

              {/* コンテンツ */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {cleanMarkdown(item.name)}
                  </h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">
                      {item.value}
                    </span>
                  </div>
                </div>
                {item.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {cleanMarkdown(item.description)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 出典情報 */}
      {data.content && data.content.includes('【出典】') && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            {data.content.split('【出典】:')[1]?.trim() || data.content.split('【出典】：')[1]?.trim()}
          </p>
        </div>
      )}
    </div>
  )
}

// メタデータ
export const rankingMetadata: TemplateMetadata = {
  id: 'ranking',
  name: 'ランキング表示テンプレート',
  description: 'ランキング形式でデータを視覚的に表示するテンプレート',
  suitableFor: {
    contentTypes: ['ランキング', 'トップ5', 'データ分析', '統計情報'],
    genres: ['industry-features', 'general'],
    dataStructure: ['順位付きデータ', 'パーセンテージ', '数値比較'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 30,
    content: 150,
    subtitle: 20,
    items: 80
  },
  keywords: ['ランキング', '順位', 'ワースト', 'ベスト', 'トップ', '位', '%', '率']
}

export default RankingTemplate