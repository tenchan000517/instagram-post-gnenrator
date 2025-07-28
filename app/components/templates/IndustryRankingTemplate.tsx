import React from 'react';

interface RankingItem {
  rank: number;
  name: string;
  primaryValue: string | number;
  secondaryValue?: string | number;
  description?: string;
  category?: string;
}

interface IndustryRankingTemplateData {
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

interface IndustryRankingTemplateProps {
  data: IndustryRankingTemplateData;
}

const IndustryRankingTemplate: React.FC<IndustryRankingTemplateProps> = ({ data }) => {
  const {
    title,
    subtitle,
    items = [],
    note,
    source,
    displayType = 'ranking',
    tiers
  } = data;

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
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-sm text-gray-600">{item.description}</p>
            )}
          </div>
          
          {/* 数値データ */}
          <div className="flex-shrink-0 text-right">
            <div className="text-xl font-bold text-blue-600">
              {item.primaryValue}
            </div>
            {item.secondaryValue && (
              <div className="text-sm text-gray-500">
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
            {tierItems?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-3 border-l-4"
                style={{ borderLeftColor: getTierColor(tierLevel).includes('red') ? '#ef4444' : 
                         getTierColor(tierLevel).includes('orange') ? '#f97316' :
                         getTierColor(tierLevel).includes('yellow') ? '#eab308' : '#22c55e' }}
              >
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">{item.description}</span>
                  <span className="font-bold text-blue-600">{item.primaryValue}</span>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-gray-600">{subtitle}</p>
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
            <p className="text-sm text-gray-500 mb-2">
              📝 {note}
            </p>
          )}
          {source && (
            <p className="text-xs text-gray-400">
              出典: {source}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default IndustryRankingTemplate;