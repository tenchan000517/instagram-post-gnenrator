import React from 'react';
import { TemplateData, TemplateMetadata, splitTitleForBadge } from './TemplateTypes';

interface VisionStrengthMatrixTemplateProps {
  data: TemplateData;
}

export function VisionStrengthMatrixTemplate({ data }: VisionStrengthMatrixTemplateProps) {
  const contentArray = (data as any).content || [];
  
  // content配列からマトリックス情報を解析
  const parseContent = () => {
    const parsed = { pairs: [], mainText: '' };
    
    contentArray.forEach((content: string) => {
      // × マークで対応関係を表現している場合
      if (content.includes('×')) {
        const matches = content.match(/([^×\n]+)\s*×\s*([^×\n]+)/g);
        if (matches) {
          matches.forEach(match => {
            const parts = match.split('×');
            if (parts.length >= 2) {
              const left = parts[0].trim();
              const right = parts[1].trim();
              parsed.pairs.push({ left, right });
            }
          });
        }
      } else {
        parsed.mainText += content + '\n';
      }
    });
    
    return parsed;
  };
  
  const parsedContent = parseContent();
  const { title } = splitTitleForBadge(data.title);

  return (
    <div className="w-full h-full bg-white p-6 flex flex-col relative overflow-hidden">
      {/* タイトル */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight">
          {title}
        </h2>
      </div>

      {/* メイン説明文（星アイコン付き） */}
      <div className="mb-4 text-center">
        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-700">
            <span>⭐</span>
            <span>企業のビジョンと自分の強みを</span>
          </div>
          <div className="text-sm text-gray-700 font-medium">
            絡めてアピールしよう！
          </div>
        </div>
      </div>
      
      {/* マトリックス表示 */}
      {parsedContent.pairs.length > 0 && (
        <div className="flex-1">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center font-semibold text-red-600">企業のビジョン</div>
              <div className="text-center font-semibold text-blue-600">自分の強み</div>
            </div>
            
            <div className="space-y-3">
              {parsedContent.pairs.map((pair: any, index: number) => (
                <div key={index} className="bg-white border border-gray-200 rounded p-4">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="text-center text-gray-800 font-medium">
                      {pair.left}
                    </div>
                    <div className="text-center">
                      <span className="text-xl font-bold text-gray-500">×</span>
                    </div>
                    <div className="text-center text-gray-800 font-medium">
                      {pair.right}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* フォールバック: content配列をそのまま表示 */}
      {parsedContent.pairs.length === 0 && contentArray.length > 0 && (
        <div className="space-y-4 flex-1">
          {contentArray.map((content: string, index: number) => (
            <div key={index} className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-gray-700 whitespace-pre-line">
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
export const visionStrengthMatrixMetadata: TemplateMetadata = {
  id: 'vision_strength_matrix',
  name: 'ビジョン×強みマトリックス',
  description: '企業のビジョンと自分の強みをマトリックス形式で表示するテンプレート',
  previewImage: '',
  characterLimits: {
    title: 30,
    content: 100,
    items: 40
  },
  category: 'matrix',
  keywords: ['マトリックス', 'ビジョン', '強み', '対応', '組み合わせ', '×'],
  suitableFor: {
    contentTypes: ['マトリックス', '対応関係', '組み合わせ'],
    genres: ['ナレッジ系', 'ノウハウ系']
  }
};