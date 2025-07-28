import React from 'react';

interface CategoryItem {
  name: string;
  icon?: string;
  description?: string;
  value?: string | number;
}

interface Category {
  name: string;
  color: string;
  items: CategoryItem[];
}

interface ChartDataItem {
  label: string;
  value: number;
  color?: string;
  percentage?: number;
}

interface IndustryInfographicTemplateData {
  title: string;
  subtitle?: string;
  visualType: 'chart' | 'grid' | 'circular' | 'list' | 'statistics';
  categories?: Category[];
  chartData?: {
    type: 'bar' | 'pie' | 'line' | 'horizontal-bar';
    data: ChartDataItem[];
    unit?: string;
  };
  gridItems?: CategoryItem[];
  statisticsData?: {
    mainStat: { label: string; value: string | number; color?: string };
    subStats: Array<{ label: string; value: string | number; color?: string }>;
  };
  callToAction?: string;
  backgroundPattern?: 'dots' | 'waves' | 'gradient' | 'solid';
}

interface IndustryInfographicTemplateProps {
  data: IndustryInfographicTemplateData;
}

const IndustryInfographicTemplate: React.FC<IndustryInfographicTemplateProps> = ({ data }) => {
  const {
    title,
    subtitle,
    visualType,
    categories,
    chartData,
    gridItems,
    statisticsData,
    callToAction,
    backgroundPattern = 'gradient'
  } = data;

  // 背景スタイルを取得
  const getBackgroundStyle = () => {
    switch (backgroundPattern) {
      case 'dots':
        return 'bg-white bg-opacity-95 backdrop-blur-sm';
      case 'waves':
        return 'bg-gradient-to-br from-blue-100 via-white to-purple-100';
      case 'solid':
        return 'bg-gray-50';
      default:
        return 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50';
    }
  };

  // チャート表示（横棒グラフ）
  const renderHorizontalBarChart = () => {
    if (!chartData) return null;
    
    const maxValue = Math.max(...chartData.data.map(item => item.value));
    
    return (
      <div className="space-y-4">
        {chartData.data.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-24 text-right font-semibold text-gray-700 text-sm">
              {item.label}
            </div>
            <div className="flex-grow bg-gray-200 rounded-full h-8 relative overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-3"
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || `hsl(${index * 45}, 70%, 60%)`
                }}
              >
                <span className="text-white font-bold text-sm">
                  {item.value}{chartData.unit || ''}
                </span>
              </div>
            </div>
            {item.percentage && (
              <div className="w-12 text-right text-sm font-semibold text-gray-600">
                {item.percentage}%
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // グリッド表示
  const renderGrid = () => {
    if (!gridItems) return null;
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gridItems.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            {item.icon && (
              <div className="text-3xl mb-2 text-center">
                {item.icon}
              </div>
            )}
            <h3 className="font-bold text-gray-800 text-center text-sm mb-1">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-xs text-gray-600 text-center mb-2">
                {item.description}
              </p>
            )}
            {item.value && (
              <div className="text-center">
                <span className="text-lg font-bold text-blue-600">
                  {item.value}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // 円形配置表示
  const renderCircular = () => {
    if (!categories) return null;
    
    return (
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="aspect-square relative">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="absolute inset-0">
              {category.items.map((item, itemIndex) => {
                const angle = (itemIndex / category.items.length) * 360 + categoryIndex * 90;
                const radius = 40 + categoryIndex * 15;
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                
                return (
                  <div
                    key={itemIndex}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-lg hover:scale-110 transition-transform"
                      style={{ backgroundColor: category.color }}
                    >
                      <div className="text-center">
                        {item.icon && <div className="text-lg">{item.icon}</div>}
                        <div className="text-xs">{item.name}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          
          {/* 中央タイトル */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-lg border-4 border-gray-200">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">
                  {categories.length}
                </div>
                <div className="text-xs text-gray-600">
                  カテゴリ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // カテゴリリスト表示
  const renderCategoryList = () => {
    if (!categories) return null;
    
    return (
      <div className="space-y-6">
        {categories.map((category, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md">
            <h3 
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ color: category.color, borderColor: category.color }}
            >
              {category.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  {item.icon && (
                    <span className="text-2xl">{item.icon}</span>
                  )}
                  <div className="flex-grow">
                    <div className="font-semibold text-gray-800">{item.name}</div>
                    {item.description && (
                      <div className="text-sm text-gray-600">{item.description}</div>
                    )}
                  </div>
                  {item.value && (
                    <div className="font-bold" style={{ color: category.color }}>
                      {item.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // 統計表示
  const renderStatistics = () => {
    if (!statisticsData) return null;
    
    return (
      <div className="text-center space-y-8">
        {/* メイン統計 */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div 
            className="text-6xl font-bold mb-2"
            style={{ color: statisticsData.mainStat.color || '#3B82F6' }}
          >
            {statisticsData.mainStat.value}
          </div>
          <div className="text-xl text-gray-600 font-semibold">
            {statisticsData.mainStat.label}
          </div>
        </div>
        
        {/* サブ統計 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statisticsData.subStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md">
              <div 
                className="text-3xl font-bold mb-1"
                style={{ color: stat.color || '#6B7280' }}
              >
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ビジュアルタイプに応じてコンテンツをレンダリング
  const renderVisualContent = () => {
    switch (visualType) {
      case 'chart':
        return renderHorizontalBarChart();
      case 'grid':
        return renderGrid();
      case 'circular':
        return renderCircular();
      case 'list':
        return renderCategoryList();
      case 'statistics':
        return renderStatistics();
      default:
        return renderGrid();
    }
  };

  return (
    <div className={`w-full max-w-6xl mx-auto p-8 rounded-2xl shadow-xl ${getBackgroundStyle()}`}>
      {/* ヘッダー */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* メインビジュアルコンテンツ */}
      <div className="mb-10">
        {renderVisualContent()}
      </div>

      {/* CTA */}
      {callToAction && (
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold inline-block shadow-lg hover:shadow-xl transition-shadow">
            {callToAction}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndustryInfographicTemplate;