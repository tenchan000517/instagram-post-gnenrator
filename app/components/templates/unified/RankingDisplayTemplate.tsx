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

  // プログレスバー用の色と幅を計算（全て薄い青に統一）
  const getProgressColor = (rank: number): string => {
    return 'bg-gradient-to-r from-blue-200 to-blue-300';
  };

  const getProgressWidth = (rank: number, maxRank: number): number => {
    return Math.max(20, ((maxRank - rank + 1) / maxRank) * 100);
  };

  // テーブル形式ランキング表示
  const renderRankingList = () => (
    <div className="bg-white rounded-b-lg shadow-lg overflow-hidden border-t-0">
      <table className="w-full">
        <tbody>
          {items.map((item, index) => {
            const progressWidth = getProgressWidth(item.rank, items.length);
            const progressColor = getProgressColor(item.rank);
            
            return (
              <tr key={index} className="border-b border-gray-200 last:border-b-0" style={{borderBottomWidth: '4px'}}>
                {/* 順位セル */}
                <td className="w-16 h-11 text-white font-bold text-2xl text-center align-middle border-b-white" style={{backgroundColor: '#5A60B8', borderBottomWidth: '4px', borderBottomColor: 'white'}}>
                  {item.rank}
                </td>
                
                {/* 企業情報セル */}
                <td className="px-4 pt-1 pb-2 relative overflow-hidden">
                  {/* プログレスバー背景 */}
                  <div 
                    className={`absolute inset-0 ${progressColor} opacity-10`}
                    style={{ width: `${progressWidth}%` }}
                  />
                  
                  {/* コンテンツ */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-center">
                      {/* 左側：企業名と説明 */}
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold text-gray-800 leading-tight ${dynamicFontClass}`}>
                          {cleanMarkdown(item.name)}
                        </h3>
                        <div className="text-sm text-gray-600 mt-0.5 mb-1">
                          {item.description && (
                            <span className={dynamicFontClass}>{cleanMarkdown(item.description)}</span>
                          )}
                          {item.category && item.description && ' '}
                          {item.category && (
                            <span className={`${dynamicFontClass}`}>{item.category}</span>
                          )}
                        </div>
                      </div>
                      
                      {/* 右側：金額 */}
                      <div className="text-right ml-4">
                        <div className={`text-2xl font-bold text-blue-600 ${dynamicFontClass}`}>
                          {item.primaryValue}
                        </div>
                        {item.secondaryValue && (
                          <div className={`text-sm text-gray-500 ${dynamicFontClass}`}>
                            {item.secondaryValue}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
    <div className="w-full max-w-4xl mx-auto my-4 px-16">
      {/* ヘッダー */}
      <div className="text-white p-3 rounded-t-xl" style={{backgroundColor: '#21266D'}}>
        <div className="flex items-center justify-center gap-4">
          {/* キャラクター */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <img 
              src="/kikuyo.png" 
              alt="kikuyo" 
              className="w-14 h-14 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<div class="text-blue-800 text-xl font-bold">👤</div>';
              }}
            />
          </div>
          
          {/* タイトル */}
          <div className="flex-1 text-center">
            <h1 className={`text-3xl font-bold text-white ${dynamicFontClass}`}>
              {cleanMarkdown(title)}
            </h1>
            {subtitle && (
              <p className={`text-base text-blue-100 mt-1 ${dynamicFontClass}`}>
                {cleanMarkdown(subtitle)}
              </p>
            )}
          </div>
          
          {/* バランス用の空スペース */}
          <div className="w-16 flex-shrink-0"></div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="mt-2">
        {displayType === 'tier' ? renderTierList() : renderRankingList()}
      </div>
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