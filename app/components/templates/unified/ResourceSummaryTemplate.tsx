import React from 'react';
import { TemplateData, cleanMarkdown } from '../TemplateTypes';
import { getT009DynamicFontClass } from '../../../utils/fontUtils';
import { Building2, BarChart3, Search, Globe, BookOpen, Target, Link } from 'lucide-react';

interface ResourceItem {
  title: string;
  items: string[];
}

interface ResourceSummaryTemplateData extends TemplateData {
  title: string;
  summaryPoints: string[];
  resourceList: ResourceItem[];
  finalMessage: string;
  characterImage?: string;
  characterPosition?: 'left' | 'right';
}

interface ResourceSummaryTemplateProps {
  data: ResourceSummaryTemplateData;
  targetId?: string;
}

export function ResourceSummaryTemplate({ data, targetId }: ResourceSummaryTemplateProps) {
  const {
    title,
    summaryPoints,
    resourceList,
    finalMessage,
    characterImage,
    characterPosition = 'right',
    imageSrc
  } = data;
  
  const dynamicFontClass = getT009DynamicFontClass(targetId);

  // 画像パスの優先度: imageSrc > characterImage （デフォルト表示なし）
  const rawImagePath = imageSrc || characterImage
  
  // 画像パスの正規化（相対パス→絶対パス、不正URL除外）
  const normalizeImagePath = (path: string | undefined): string | null => {
    if (!path) return null
    if (path.startsWith('http://') || path.startsWith('https://')) return null
    return path.startsWith('/') ? path : `/${path}`
  }
  
  const finalCharacterImage = normalizeImagePath(rawImagePath)
  const shouldShowImage = Boolean(finalCharacterImage)

  // アイコンマッピング
  const getResourceIcon = (title: string) => {
    if (title.includes('採用') || title.includes('企業')) return <Building2 className="w-6 h-6 text-blue-600" />;
    if (title.includes('研究') || title.includes('情報')) return <BarChart3 className="w-6 h-6 text-green-600" />;
    if (title.includes('ツール') || title.includes('分析')) return <Search className="w-6 h-6 text-purple-600" />;
    if (title.includes('サイト') || title.includes('プラットフォーム')) return <Globe className="w-6 h-6 text-indigo-600" />;
    if (title.includes('書籍') || title.includes('本')) return <BookOpen className="w-6 h-6 text-orange-600" />;
    if (title.includes('セミナー') || title.includes('イベント')) return <Target className="w-6 h-6 text-red-600" />;
    return <BookOpen className="w-6 h-6 text-orange-600" />;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-16 py-4">
      {/* ヘッダー */}
      <div className="bg-amber-400 text-white p-3 text-center mb-2">
        <h1 className={`text-3xl font-bold text-white mb-6 ${dynamicFontClass}`}>
          {cleanMarkdown(title)}
        </h1>
      </div>

      <div className="bg-white shadow-lg p-2">
        {/* サマリーポイント */}
        <div className="mb-3">
          <div className="bg-amber-50 p-2 border border-gray-200"
            style={{
              backgroundImage: `
                linear-gradient(rgba(150, 150, 150, 0.25) 1px, transparent 1px),
                linear-gradient(90deg, rgba(150, 150, 150, 0.25) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            <div className="space-y-1.5">
              {summaryPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3 flex-shrink-0 text-lg" style={{transform: 'translateY(-5px)'}}>
                    {index + 1}.
                  </span>
                  <p className={`text-gray-700 text-base font-semibold ${dynamicFontClass}`} style={{lineHeight: '1.1', margin: 0, padding: 0}}>
                    {cleanMarkdown(point)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* リソースセクション */}
        <div className="mb-1">
          <h2 className={`text-lg font-bold text-gray-800 mb-2 flex items-center ${dynamicFontClass}`}>
            <Link className="w-8 h-8 mr-2 text-blue-500" />
            <span className="pb-1">参考ソース</span>
          </h2>
          <div className="space-y-2">
            {resourceList.map((resource, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded-md">
                <h3 className={`text-sm font-semibold text-gray-800 mb-1 flex items-center ${dynamicFontClass}`}>
                  <span className="mr-1">{getResourceIcon(resource.title)}</span>
                  <span className="mb-2 pb-1">{cleanMarkdown(resource.title)}</span>
                </h3>
                <div className="grid grid-cols-2 gap-1">
                  {resource.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start p-1 bg-white rounded text-xs">
                      <span className="text-blue-500 mr-1 flex-shrink-0 mt-0.5" style={{transform: 'translateY(-4px)'}}>•</span>
                      <p className={`text-gray-700 mb-2 ${dynamicFontClass}`} style={{fontSize: '11px'}}>
                        {cleanMarkdown(item)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 最終メッセージ（2カラム+キャラクター） */}
        {finalMessage && (
          <div className="mt-0.5 rounded-lg p-1">
            <div className={`flex ${characterPosition === 'left' ? 'flex-row-reverse' : 'flex-row'} gap-6 items-center`}>
              {/* テキストセクション */}
              <div className="flex-1 flex flex-col justify-center">
                <div 
                  className="bg-amber-50 p-4 shadow-sm border border-gray-200"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(150, 150, 150, 0.25) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(150, 150, 150, 0.25) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                >
                  <p className={`text-gray-700 leading-relaxed mb-2 font-bold ${dynamicFontClass}`}>
                    {cleanMarkdown(finalMessage)}
                  </p>
                </div>
              </div>

              {/* キャラクター画像（指定がある場合のみ表示） */}
              {shouldShowImage && (
                <div className="h-52 relative rounded-lg flex items-center justify-center overflow-hidden" style={{ width: 'auto' }}>
                  <img
                    src={finalCharacterImage}
                    alt="キャラクター"
                    className="h-full w-auto object-contain rounded-lg"
                    style={{ width: 'auto', height: '100%' }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// メタデータ
export const resourceSummaryMetadata = {
  id: 'resource_summary',
  name: '参考ソース一覧表示',
  description: 'まとめポイントと参考ソースを整理して表示するテンプレート',
  suitableFor: {
    contentTypes: ['まとめ', '参考資料', 'ソース一覧', '次のアクション'],
    genres: ['就活系', '転職系', '学習系', '情報系'],
    dataStructure: ['まとめポイント', 'ソースリスト', 'アクションガイド'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 3 }
  },
  characterLimits: {
    title: 50,
    summaryPoints: 80,
    resourceTitle: 30,
    resourceItems: 100,
    finalMessage: 120
  },
  keywords: ['まとめ', 'ソース', '参考', 'アクション', '次のステップ']
};

export default ResourceSummaryTemplate;