import React from 'react';
import Image from 'next/image';
import { TemplateData, TemplateMetadata, splitTitleForBadge } from './TemplateTypes';

interface EfficiencyTipsTemplateProps {
  data: TemplateData;
}

export function EfficiencyTipsTemplate({ data }: EfficiencyTipsTemplateProps) {
  const parseContent = () => {
    const contentObj = (data as any).content || {};
    
    return {
      number: contentObj.number || '',
      title: contentObj.title || '',
      description: contentObj.description || '',
      explanation: contentObj.explanation || contentObj.example || '',
      benefit: contentObj.benefit || '',
      imageSrc: contentObj.imageSrc || ''
    };
  };

  const parsedContent = parseContent();
  const { title: pageTitle } = splitTitleForBadge(data.title);

  return (
    <div className="w-full h-full bg-white p-8 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* ヒケツ番号とタイトル */}
        <div className="flex items-baseline gap-4 mb-6">
          <span className="text-6xl font-black text-orange-500 leading-none">
            {parsedContent.number}
          </span>
          <h2 className="text-3xl font-bold text-gray-800 leading-tight flex-1">
            {parsedContent.title}
          </h2>
        </div>

        {/* メイン説明 */}
        {parsedContent.description && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-xl font-bold text-blue-800">
              {parsedContent.description}
            </p>
          </div>
        )}

        {/* 具体例・説明 */}
        {parsedContent.explanation && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">💡 具体例</h3>
            <p className="text-gray-700 leading-relaxed">
              {parsedContent.explanation}
            </p>
          </div>
        )}

        {/* 画像表示 */}
        {parsedContent.imageSrc && (
          <div className="flex justify-center">
            <Image
              src={parsedContent.imageSrc}
              alt={parsedContent.title || "効率化イメージ"}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          </div>
        )}

        {/* 効果・メリット */}
        {parsedContent.benefit && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-800 mb-3">✅ 効果</h3>
            <p className="text-green-700 font-medium leading-relaxed">
              {parsedContent.benefit}
            </p>
          </div>
        )}

        {/* フォールバック: 基本データがない場合 */}
        {!parsedContent.title && !parsedContent.description && (
          <div className="text-center text-gray-500 py-16">
            <p className="text-lg">効率化ヒケツデータが見つかりません</p>
          </div>
        )}
      </div>
    </div>
  );
}

// テンプレートメタデータ
export const efficiencyTipsMetadata: TemplateMetadata = {
  id: 'efficiency_tips',
  name: '効率化ヒケツ',
  description: '効率化の具体的なヒケツを詳細に紹介するテンプレート',
  previewImage: '',
  characterLimits: {
    title: 20,
    content: 60,
    subtitle: 0,
    items: 80
  },
  category: 'explanation',
  keywords: ['効率化', 'ヒケツ', 'コツ', '時短', '方法', '改善'],
  suitableFor: {
    contentTypes: ['効率化方法', 'ヒケツ紹介', '改善提案'],
    genres: ['ノウハウ系', '実用系', 'スキル系']
  }
};