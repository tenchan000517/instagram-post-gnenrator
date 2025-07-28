import React from 'react';
import Image from 'next/image';
import { TemplateData, TemplateMetadata, splitTitleForBadge } from './TemplateTypes';

interface ToolFeatureTemplateProps {
  data: TemplateData;
}

export function ToolFeatureTemplate({ data }: ToolFeatureTemplateProps) {
  const parseContent = () => {
    const contentObj = (data as any).content || {};
    
    return {
      number: contentObj.number || '',
      title: contentObj.title || '',
      description: contentObj.description || '',
      process: contentObj.process || null,
      benefit: contentObj.benefit || '',
      imageSrc: contentObj.imageSrc || ''
    };
  };

  const parsedContent = parseContent();
  const { title: pageTitle } = splitTitleForBadge(data.title);

  return (
    <div className="w-full h-full bg-white p-8 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto">
        {/* 機能番号とタイトル */}
        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-6xl font-black text-blue-500 leading-none">
            {parsedContent.number}
          </span>
          <h2 className="text-3xl font-bold text-gray-800 leading-tight flex-1">
            {parsedContent.title}
          </h2>
        </div>

        {/* 説明文 */}
        {parsedContent.description && (
          <div className="mb-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              {parsedContent.description}
            </p>
          </div>
        )}

        {/* プロセス表示（Before/After） */}
        {parsedContent.process && (
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Before */}
                <div className="text-center">
                  <div className="bg-gray-200 rounded-lg p-4 mb-2">
                    <p className="text-gray-800 font-medium">
                      {parsedContent.process.before}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">Before</span>
                </div>

                {/* 矢印 */}
                <div className="flex justify-center">
                  <div className="text-blue-500 text-2xl">→</div>
                </div>

                {/* After */}
                <div className="text-center">
                  <div className="bg-blue-100 rounded-lg p-4 mb-2">
                    <p className="text-blue-800 font-medium">
                      {parsedContent.process.after}
                    </p>
                  </div>
                  <span className="text-sm text-blue-600">After</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 画像表示 */}
        {parsedContent.imageSrc && (
          <div className="mb-6 flex justify-center">
            <Image
              src={parsedContent.imageSrc}
              alt={parsedContent.title || "ツール機能イメージ"}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          </div>
        )}

        {/* 効果・メリット */}
        {parsedContent.benefit && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-800 mb-2">✅ 効果</h3>
            <p className="text-green-700 font-medium">
              {parsedContent.benefit}
            </p>
          </div>
        )}

        {/* フォールバック: 基本データがない場合 */}
        {!parsedContent.title && !parsedContent.description && (
          <div className="text-center text-gray-500 py-16">
            <p className="text-lg">ツール機能データが見つかりません</p>
          </div>
        )}
      </div>
    </div>
  );
}

// テンプレートメタデータ
export const toolFeatureMetadata: TemplateMetadata = {
  id: 'tool_feature',
  name: 'ツール機能紹介',
  description: 'ツールの個別機能を詳細に紹介するテンプレート',
  previewImage: '',
  characterLimits: {
    title: 20,
    content: 80,
    subtitle: 0,
    items: 60
  },
  category: 'explanation',
  keywords: ['ツール', '機能', '紹介', 'before/after', '効果', 'プロセス'],
  suitableFor: {
    contentTypes: ['機能紹介', 'ツール説明', 'プロセス説明'],
    genres: ['ツール系', 'ノウハウ系', '実用系']
  }
};