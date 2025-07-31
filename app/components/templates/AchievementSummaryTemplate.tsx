import React from 'react';
import { TemplateMetadata } from './TemplateTypes';
import { getT009DynamicFontClass, getT009BackgroundClass } from '../../utils/fontUtils';

interface AchievementSummaryTemplateProps {
  data: {
    summaryTitle?: string;
    title?: string;
    achievementPoints?: string[];
    habitsList?: string[];
    encouragementMessage?: string;
    finalMessage?: string;
  };
  targetId?: string;
}

export default function AchievementSummaryTemplate({ data, targetId }: AchievementSummaryTemplateProps) {
  const {
    summaryTitle = '',
    title = '',
    achievementPoints = [],
    habitsList = [],
    encouragementMessage = '',
    finalMessage = ''
  } = data || {};
  
  // 柔軟なデータ対応
  const displayTitle = summaryTitle || title;
  const displayPoints = achievementPoints.length > 0 ? achievementPoints : habitsList;
  const displayMessage = finalMessage || encouragementMessage;
  const dynamicFontClass = getT009DynamicFontClass(targetId);
  const backgroundClass = getT009BackgroundClass(targetId);
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center items-center p-6 relative">
      {/* ヘッダー */}
      {displayTitle && (
        <div className="py-6 relative">
          <div className="px-8">
            <h1 className={`text-3xl font-bold text-black text-center leading-tight ${dynamicFontClass}`}>
              {displayTitle}
            </h1>
          </div>
          <div className="mt-8 px-2">
            <div className="w-full border-b-2 border-dashed border-gray-400"></div>
          </div>
        </div>
      )}

      {/* 達成ポイントリスト */}
      {displayPoints.length > 0 && (
        <div className="w-full max-w-xl mb-6">
          <div 
            className="bg-white rounded-lg shadow-sm border border-gray-100 px-3 py-4 flex justify-center"
            style={{
              backgroundImage: `
                linear-gradient(rgba(200, 200, 200, 0.25) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200, 200, 200, 0.25) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            <div className="text-left">
              <div className="space-y-1">
                {displayPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    {/* ポイント番号 - シンプルテキスト */}
                    <span className={`flex-shrink-0 text-2xl font-bold text-blue-500 pt-1 ${dynamicFontClass}`}>
                      {index + 1}.
                    </span>
                    {/* ポイント内容 */}
                    <p className={`text-gray-700 text-2xl font-bold leading-relaxed flex-1 pt-1 ${dynamicFontClass}`}>
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ファイナルメッセージ / 励ましメッセージ */}
      {displayMessage && (
        <div className="text-center">
          <div className="bg-orange-100 rounded-lg px-6 py-4 shadow-sm">
            <p className={`text-xl text-gray-700 font-medium leading-relaxed ${dynamicFontClass}`}>
              {displayMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export const achievementSummaryMetadata: TemplateMetadata = {
  id: 'achievement_summary',
  name: '達成まとめ型',
  description: 'K002用の達成まとめテンプレート。まとめタイトル、達成ポイント、励ましメッセージを表示',
  suitableFor: {
    contentTypes: ['まとめ', '成果', '達成', '完了', '振り返り'],
    genres: ['キャリア', '働き方', '女性のキャリア形成', '成長', '自己啓発'],
    dataStructure: ['summaryTitle', 'achievementPoints', 'encouragementMessage'],
    complexity: 'simple',
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 50,
    content: 400,
    subtitle: 30,
    items: 100
  },
  keywords: ['まとめ', '達成', '成果', '完了', '励まし', 'チェックマーク']
}