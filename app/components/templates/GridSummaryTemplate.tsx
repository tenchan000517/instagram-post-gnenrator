import React from 'react';
import Image from 'next/image';
import { TemplateData, TemplateMetadata, splitTitleForBadge } from './TemplateTypes';

interface GridSummaryTemplateProps {
  data: TemplateData;
}

export function GridSummaryTemplate({ data }: GridSummaryTemplateProps) {
  const parseContent = () => {
    const contentObj = (data as any).content || {};
    
    return {
      title: contentObj.title || '',
      subtitle: contentObj.subtitle || '',
      grid: contentObj.grid || [],
      finalMessage: contentObj.finalMessage || ''
    };
  };

  const parsedContent = parseContent();
  const { title: pageTitle } = splitTitleForBadge(data.title);

  return (
    <div className="w-full h-full bg-white p-6 flex flex-col">
      {/* タイトルセクション */}
      {parsedContent.title && (
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
            {parsedContent.title}
          </h1>
          {parsedContent.subtitle && (
            <p className="text-lg text-gray-600">
              {parsedContent.subtitle}
            </p>
          )}
        </div>
      )}

      {/* グリッド表示 */}
      {parsedContent.grid.length > 0 && (
        <div className="flex-1 mb-6">
          <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto">
            {parsedContent.grid.map((item: any, index: number) => (
              <div key={index} className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-center">
                {/* 番号 */}
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-sm">
                    {item.number}
                  </span>
                </div>

                {/* 画像（オプショナル） */}
                {item.imageSrc && (
                  <div className="mb-3 flex justify-center">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt || "イラスト"}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}

                {/* タイトル */}
                <h3 className="text-sm font-bold text-gray-800 leading-tight">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 最終メッセージ */}
      {parsedContent.finalMessage && (
        <div className="text-center">
          <p className="text-gray-700 font-medium">
            {parsedContent.finalMessage}
          </p>
        </div>
      )}

      {/* フォールバック: content配列をそのまま表示 */}
      {!parsedContent.title && parsedContent.grid.length === 0 && (
        <div className="flex-1 space-y-4">
          <div className="text-center text-gray-500 py-16">
            <p className="text-lg">グリッドデータが見つかりません</p>
          </div>
        </div>
      )}
    </div>
  );
}

// テンプレートメタデータ
export const gridSummaryMetadata: TemplateMetadata = {
  id: 'grid_summary',
  name: 'グリッドサマリー',
  description: '大量項目をグリッド配置で表示するまとめテンプレート',
  previewImage: '',
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 30,
    items: 20
  },
  category: 'summary',
  keywords: ['グリッド', 'まとめ', '一覧', '項目', '復習', 'リスト'],
  suitableFor: {
    contentTypes: ['まとめ', '項目一覧', '復習用', '総括'],
    genres: ['ナレッジ系', 'ノウハウ系', 'スキル系']
  }
};