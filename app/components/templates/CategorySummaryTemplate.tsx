import React from 'react';
import { TemplateData, TemplateMetadata, splitTitleForBadge } from './TemplateTypes';

interface CategorySummaryTemplateProps {
  data: TemplateData;
}

export function CategorySummaryTemplate({ data }: CategorySummaryTemplateProps) {
  const parseContent = () => {
    // dataから直接取得（生成データの実際の構造に合わせる）
    return {
      title: data.title || '',
      subtitle: data.subtitle || '',
      improvementExample: data.improvementExample || null,
      categorySummary: data.categorySummary || []
    };
  };

  const parsedContent = parseContent();
  const { title: pageTitle } = splitTitleForBadge(data.title);

  return (
    <div className="w-full h-full bg-white p-6 flex flex-col">
      {/* メインタイトル */}
      {parsedContent.title && (
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {parsedContent.title}
          </h1>
          {parsedContent.subtitle && (
            <p className="text-lg text-gray-600 mt-2">
              {parsedContent.subtitle}
            </p>
          )}
        </div>
      )}

      {/* 改善例表示 */}
      {parsedContent.improvementExample && (
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Before (地雷ワード) */}
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-bold text-red-700 mb-3">
                  {parsedContent.improvementExample.before}
                </h3>
                <div className="bg-red-100 rounded-lg p-3">
                  <p className="text-red-800 font-medium">
                    {parsedContent.improvementExample.beforeIcon}
                  </p>
                </div>
              </div>
            </div>

            {/* After (よりそいワード) */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-bold text-green-700 mb-3">
                  {parsedContent.improvementExample.after}
                </h3>
                <div className="bg-green-100 rounded-lg p-3">
                  <p className="text-green-800 font-medium">
                    {parsedContent.improvementExample.afterIcon}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tip */}
          {parsedContent.improvementExample.tip && (
            <div className="text-center mt-4">
              <p className="text-gray-700 font-medium">
                {parsedContent.improvementExample.tip}
              </p>
            </div>
          )}
        </div>
      )}

      {/* カテゴリサマリー */}
      {parsedContent.categorySummary.length > 0 && (
        <div className="flex-1 space-y-4">
          {parsedContent.categorySummary.map((category: any, index: number) => (
            <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
              <div className="flex items-start gap-4">
                {/* カテゴリ番号 */}
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {category.number}
                  </span>
                </div>

                <div className="flex-1">
                  {/* カテゴリ名 */}
                  <h4 className="text-lg font-bold text-gray-800 mb-3">
                    {category.name}
                  </h4>

                  {/* 例文リスト */}
                  {category.examples && category.examples.length > 0 && (
                    <div className="space-y-2">
                      {category.examples.map((example: string, exampleIndex: number) => (
                        <div key={exampleIndex} className="bg-white rounded-md p-2 text-sm text-gray-700">
                          {example}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* フォールバック: content配列をそのまま表示 */}
      {!parsedContent.title && !parsedContent.improvementExample && 
       parsedContent.categorySummary.length === 0 && (
        <div className="flex-1 space-y-4">
          <div className="text-center text-gray-500 py-16">
            <p className="text-lg">カテゴリサマリーデータが見つかりません</p>
          </div>
        </div>
      )}
    </div>
  );
}

// テンプレートメタデータ
export const categorySummaryMetadata: TemplateMetadata = {
  id: 'category_summary',
  name: 'カテゴリサマリー',
  description: '改善例とカテゴリ別まとめを表示するテンプレート',
  suitableFor: {
    contentTypes: ['まとめ', 'カテゴリ分類', '改善提案'],
    genres: ['ナレッジ系', 'ノウハウ系', 'スキル系'],
    dataStructure: ['categorySummary', 'improvementExample'],
    complexity: 'medium',
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 30,
    content: 100,
    subtitle: 50,
    items: 80
  },
  keywords: ['カテゴリ', 'まとめ', '改善', 'before/after', 'サマリー']
};