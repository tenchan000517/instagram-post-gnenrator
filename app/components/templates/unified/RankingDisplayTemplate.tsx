import React from 'react';
import { cleanMarkdown } from '../TemplateTypes';
import { getT009DynamicFontClass } from '../../../utils/fontUtils';

interface RankingItem {
  rank: number;
  name: string;
  primaryValue: string | number;
  secondaryValue?: string | number;
  description?: string;
  category?: string;
}

interface RankingDisplayTemplateData {
  title: string;
  subtitle?: string;
  items: RankingItem[];
  note?: string;
  source?: string;
  displayType?: 'ranking' | 'tier';
  tiers?: {
    SSS?: RankingItem[];
    SS: RankingItem[];
    S?: RankingItem[];
    A?: RankingItem[];
  };
}

interface RankingDisplayTemplateProps {
  data: RankingDisplayTemplateData;
  targetId?: string;
}

const RankingDisplayTemplate: React.FC<RankingDisplayTemplateProps> = ({ data, targetId }) => {
  const {
    title,
    subtitle,
    items = [],
    note,
    source,
    displayType = 'ranking',
    tiers
  } = data;
  
  const dynamicFontClass = getT009DynamicFontClass(targetId);

  // ランキングの色を取得
  const getRankColor = (rank: number): string => {
    if (rank <= 3) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank <= 5) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    if (rank <= 10) return 'bg-gradient-to-r from-orange-300 to-orange-500 text-white';
    return 'bg-gradient-to-r from-blue-200 to-blue-400 text-gray-800';
  };

  // Tierの色を取得
  const getTierColor = (tier: string): string => {
    switch (tier) {
      case 'SSS': return 'bg-gradient-to-r from-red-500 to-red-700 text-white';
      case 'SS': return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
      case 'S': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 'A': return 'bg-gradient-to-r from-green-400 to-green-600 text-white';
      default: return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    }
  };

  // ランキング表示
  const renderRankingList = () => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500"
        >
          {/* ランク表示 */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mr-4 ${getRankColor(item.rank)}`}>
            {item.rank}
          </div>
          
          {/* 企業・項目名 */}
          <div className="flex-grow">
            <h3 className={`text-lg font-semibold text-gray-800 mb-1 ${dynamicFontClass}`}>
              {cleanMarkdown(item.name)}
            </h3>
            {item.description && (
              <p className={`text-sm text-gray-600 ${dynamicFontClass}`}>{cleanMarkdown(item.description)}</p>
            )}
            {item.category && (
              <span className={`inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mt-1 ${dynamicFontClass}`}>
                {item.category}
              </span>
            )}
          </div>
          
          {/* 数値データ */}
          <div className="flex-shrink-0 text-right">
            <div className={`text-xl font-bold text-blue-600 ${dynamicFontClass}`}>
              {item.primaryValue}
            </div>
            {item.secondaryValue && (
              <div className={`text-sm text-gray-500 ${dynamicFontClass}`}>
                {item.secondaryValue}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Tier表示
  const renderTierList = () => (
    <div className="space-y-6">
      {tiers && Object.entries(tiers).map(([tierLevel, tierItems]) => (
        <div key={tierLevel} className="space-y-2">
          {/* Tierヘッダー */}
          <div className={`inline-block px-6 py-2 rounded-full text-lg font-bold ${getTierColor(tierLevel)}`}>
            {tierLevel}ランク
          </div>
          
          {/* Tier内のアイテム */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-4">
            {(tierItems as RankingItem[])?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-3 border-l-4"
                style={{ borderLeftColor: getTierColor(tierLevel).includes('red') ? '#ef4444' : 
                         getTierColor(tierLevel).includes('orange') ? '#f97316' :
                         getTierColor(tierLevel).includes('yellow') ? '#eab308' : '#22c55e' }}
              >
                <h4 className={`font-semibold text-gray-800 ${dynamicFontClass}`}>{cleanMarkdown(item.name)}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className={`text-sm text-gray-600 ${dynamicFontClass}`}>{item.description && cleanMarkdown(item.description)}</span>
                  <span className={`font-bold text-blue-600 ${dynamicFontClass}`}>{item.primaryValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <h1 className={`text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${dynamicFontClass}`}>
          {cleanMarkdown(title)}
        </h1>
        {subtitle && (
          <p className={`text-lg text-gray-600 ${dynamicFontClass}`}>{cleanMarkdown(subtitle)}</p>
        )}
      </div>

      {/* メインコンテンツ */}
      <div className="mb-6">
        {displayType === 'tier' ? renderTierList() : renderRankingList()}
      </div>

      {/* フッター情報 */}
      {(note || source) && (
        <div className="mt-8 pt-4 border-t border-gray-300">
          {note && (
            <p className={`text-sm text-gray-500 mb-2 ${dynamicFontClass}`}>
              📝 {cleanMarkdown(note)}
            </p>
          )}
          {source && (
            <p className={`text-xs text-gray-400 ${dynamicFontClass}`}>
              出典: {cleanMarkdown(source)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// メタデータ
export const rankingDisplayMetadata = {
  id: 'ranking_display',
  name: 'ランキング・Tier表示型',
  description: 'ランキングやTier形式でアイテムを表示するテンプレート',
  suitableFor: {
    contentTypes: ['ランキング', 'Tier分類', '比較データ', '統計情報'],
    genres: ['情報系', 'データ系', '比較系'],
    dataStructure: ['順位データ', '数値データ', 'カテゴリ分類'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 40,
    subtitle: 60,
    items: 80,
    note: 150,
    source: 100
  },
  keywords: ['ランキング', 'Tier', '順位', '比較', 'データ', '統計']
};

export default RankingDisplayTemplate;