import React from 'react';
import { X, Check } from 'lucide-react';
import { TemplateData, TemplateMetadata, splitTitleForBadge } from './TemplateTypes';

interface NgGoodComparisonTemplateProps {
  data: TemplateData;
}

export function NgGoodComparisonTemplate({ data }: NgGoodComparisonTemplateProps) {
  const contentArray = (data as any).content || [];
  
  // content配列からNG/GOOD例を解析
  const parseContent = () => {
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
  
  const parsedContent = parseContent();
  const { title } = splitTitleForBadge(data.title);

  return (
    <div className="w-full h-full bg-white p-8 flex flex-col">
      {/* タイトル */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          {title}
        </h1>
      </div>

      {/* メイン説明 */}
      {parsedContent.mainText.trim() && (
        <div className="mb-8 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            {parsedContent.mainText.trim()}
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
              <h2 className="text-xl font-semibold text-red-600">NG例</h2>
            </div>
            <div className="space-y-3">
              {parsedContent.ngItems.map((item: string, index: number) => (
                <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                  <p className="text-gray-800">{item}</p>
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
              <h2 className="text-xl font-semibold text-green-600">GOOD例</h2>
            </div>
            <div className="space-y-3">
              {parsedContent.goodItems.map((item: string, index: number) => (
                <div key={index} className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <p className="text-gray-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* フォールバック: content配列をそのまま表示 */}
      {parsedContent.ngItems.length === 0 && parsedContent.goodItems.length === 0 && contentArray.length > 0 && (
        <div className="flex-1 space-y-4">
          {contentArray.map((content: string, index: number) => (
            <div key={index} className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
              <div className="text-gray-700 whitespace-pre-line">
                {content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// テンプレートメタデータ
export const ngGoodComparisonMetadata: TemplateMetadata = {
  id: 'ng_good_comparison',
  name: 'NG/GOOD比較',
  description: 'NG例とGOOD例を対比して表示する比較型テンプレート',
  previewImage: '',
  characterLimits: {
    title: 30,
    content: 100,
    items: 50
  },
  category: 'comparison',
  keywords: ['NG', 'GOOD', '比較', '対比', '例', '良い例', '悪い例'],
  suitableFor: {
    contentTypes: ['比較', 'NG/GOOD', '対比'],
    genres: ['ナレッジ系', 'ノウハウ系']
  }
};