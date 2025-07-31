import React from 'react';
import { X, Check } from 'lucide-react';
import { TemplateData, cleanMarkdown } from '../TemplateTypes';
import { getT009DynamicFontClass } from '../../../utils/fontUtils';

interface ComparisonTemplateProps {
  data: TemplateData;
  targetId?: string;
}

interface ComparisonSection {
  name: string;
  content: string | string[];
}

interface ComparisonData {
  title: string;
  description?: string;
  leftSection: ComparisonSection;
  rightSection: ComparisonSection;
  bottomSection?: ComparisonSection;
}

export function ComparisonTemplate({ data, targetId }: ComparisonTemplateProps) {
  // データ構造解析 - 複数パターンに対応
  const comparisonData = data as ComparisonData;
  const dynamicFontClass = getT009DynamicFontClass(targetId);
  
  // フォールバック: 既存NgGoodパターンの解析
  const parseNgGoodContent = () => {
    const contentArray = (data as any).content || [];
    const parsed = { ngItems: [] as string[], goodItems: [] as string[], mainText: '' };
    
    contentArray.forEach((content: string) => {
      if (content.includes('❌')) {
        const ngMatches = content.match(/❌[^✅]*(?=✅|$)/g);
        if (ngMatches) {
          ngMatches.forEach(match => {
            const cleaned = match.replace(/❌(NG例：)?/, '').trim();
            if (cleaned) parsed.ngItems.push(cleaned);
          });
        }
      }
      if (content.includes('✅')) {
        const goodMatches = content.match(/✅[^❌]*(?=❌|$)/g);
        if (goodMatches) {
          goodMatches.forEach(match => {
            const cleaned = match.replace(/✅(GOOD例：)?/, '').trim();
            if (cleaned) parsed.goodItems.push(cleaned);
          });
        }
      }
      if (!content.includes('❌') && !content.includes('✅')) {
        parsed.mainText += content + '\n';
      }
    });
    
    return parsed;
  };

  // コンテンツ表示コンポーネント（description or list 対応）
  const ContentDisplay = ({ content }: { content: string | string[] }) => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span className={`text-gray-700 leading-relaxed ${dynamicFontClass}`}>
                {cleanMarkdown(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    
    return (
      <p className={`text-gray-700 leading-relaxed ${dynamicFontClass}`}>
        {cleanMarkdown(content)}
      </p>
    );
  };

  // 統一された比較データがある場合
  if (comparisonData.leftSection && comparisonData.rightSection) {
    return (
      <div className="w-full h-full bg-white p-8 flex flex-col">
        {/* タイトル */}
        <div className="text-center mb-6">
          <h1 className={`text-3xl font-bold text-gray-900 leading-tight ${dynamicFontClass}`}>
            {cleanMarkdown(comparisonData.title)}
          </h1>
          {comparisonData.description && (
            <p className={`text-lg text-gray-600 mt-2 ${dynamicFontClass}`}>
              {cleanMarkdown(comparisonData.description)}
            </p>
          )}
        </div>

        {/* 2カラム比較 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* 左セクション */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className={`text-xl font-semibold text-red-600 mb-4 flex items-center gap-2 ${dynamicFontClass}`}>
              <X className="w-5 h-5" />
              {cleanMarkdown(comparisonData.leftSection.name)}
            </h2>
            <ContentDisplay content={comparisonData.leftSection.content} />
          </div>

          {/* 右セクション */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className={`text-xl font-semibold text-green-600 mb-4 flex items-center gap-2 ${dynamicFontClass}`}>
              <Check className="w-5 h-5" />
              {cleanMarkdown(comparisonData.rightSection.name)}
            </h2>
            <ContentDisplay content={comparisonData.rightSection.content} />
          </div>
        </div>

        {/* 下部セクション（オプショナル） */}
        {comparisonData.bottomSection && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            {comparisonData.bottomSection.name && (
              <h2 className={`text-xl font-semibold text-blue-600 mb-4 ${dynamicFontClass}`}>
                {cleanMarkdown(comparisonData.bottomSection.name)}
              </h2>
            )}
            <ContentDisplay content={comparisonData.bottomSection.content} />
          </div>
        )}
      </div>
    );
  }

  // フォールバック: 既存NG/GOODパターン
  const parsedContent = parseNgGoodContent();
  
  return (
    <div className="w-full h-full bg-white p-8 flex flex-col">
      {/* タイトル */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          {cleanMarkdown(data.title || '')}
        </h1>
      </div>

      {/* メイン説明 */}
      {parsedContent.mainText.trim() && (
        <div className="mb-8 text-center">
          <p className={`text-lg text-gray-700 leading-relaxed ${dynamicFontClass}`}>
            {cleanMarkdown(parsedContent.mainText.trim())}
          </p>
        </div>
      )}

      {/* NG/GOOD比較 */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* NG例 */}
        {parsedContent.ngItems.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <X className="w-6 h-6 text-red-500" />
              <h2 className={`text-xl font-semibold text-red-600 ${dynamicFontClass}`}>NG例</h2>
            </div>
            <div className="space-y-3">
              {parsedContent.ngItems.map((item: string, index: number) => (
                <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <p className={`text-gray-800 ${dynamicFontClass}`}>{cleanMarkdown(item)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GOOD例 */}
        {parsedContent.goodItems.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Check className="w-6 h-6 text-green-500" />
              <h2 className={`text-xl font-semibold text-green-600 ${dynamicFontClass}`}>GOOD例</h2>
            </div>
            <div className="space-y-3">
              {parsedContent.goodItems.map((item: string, index: number) => (
                <div key={index} className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <p className={`text-gray-800 ${dynamicFontClass}`}>{cleanMarkdown(item)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* フォールバック: 汎用表示 */}
      {parsedContent.ngItems.length === 0 && parsedContent.goodItems.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className={`text-lg ${dynamicFontClass}`}>比較コンテンツがありません</p>
          </div>
        </div>
      )}
    </div>
  );
}

// メタデータ
export const comparisonMetadata = {
  id: 'comparison',
  name: '比較用テンプレート',
  description: 'vs構造・NG GOOD・いい例 悪い例・できる人 できない人などの比較表示テンプレート',
  suitableFor: {
    contentTypes: ['比較', 'NG/GOOD', '対比', 'vs', '対立構造'],
    genres: ['ナレッジ系', 'ノウハウ系', '教育系'],
    dataStructure: ['2項目比較', '対比構造', 'セクション分割'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 40,
    description: 100,
    sectionName: 20,
    content: 150
  },
  keywords: ['比較', 'NG', 'GOOD', 'vs', '対比', '良い例', '悪い例', 'できる人', 'できない人']
};