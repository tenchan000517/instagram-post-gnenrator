import React from 'react';
import { TemplateData, TemplateMetadata, splitTitleForBadge } from './TemplateTypes';

interface CategoryExplanationTemplateProps {
  data: TemplateData;
}

export function CategoryExplanationTemplate({ data }: CategoryExplanationTemplateProps) {
  const contentArray = (data as any).content || [];
  
  // content配列からカテゴリ情報を解析
  const parseContent = () => {
    const parsed = { categories: [], mainText: '', items: [] };
    
    contentArray.forEach((content: string) => {
      // ⭕マークのある項目を抽出
      if (content.includes('⭕')) {
        const matches = content.match(/⭕[^⭕]*/g);
        if (matches) {
          matches.forEach(match => {
            const cleaned = match.replace(/⭕\s*/, '').trim();
            if (cleaned) parsed.items.push(cleaned);
          });
        }
      } else if (!content.includes('⭕')) {
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

      {/* カテゴリ項目 */}
      {parsedContent.items.length > 0 && (
        <div className="flex-1 space-y-6">
          {parsedContent.items.map((item: string, index: number) => (
            <div key={index} className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="text-gray-800 leading-relaxed">
                  {item}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* フォールバック: content配列をそのまま表示 */}
      {parsedContent.items.length === 0 && contentArray.length > 0 && (
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
export const categoryExplanationMetadata: TemplateMetadata = {
  id: 'category_explanation',
  name: 'カテゴリ説明',
  description: 'カテゴリごとに項目を整理して説明するテンプレート',
  previewImage: '',
  characterLimits: {
    title: 30,
    content: 150,
    items: 60
  },
  category: 'explanation',
  keywords: ['カテゴリ', '分類', '整理', '説明', 'ポイント', '項目'],
  suitableFor: {
    contentTypes: ['説明', 'カテゴリ分類', 'ポイント整理'],
    genres: ['ナレッジ系', 'ノウハウ系']
  }
};