import React from 'react';
import { TemplateMetadata } from './TemplateTypes';

interface AchievementSummaryTemplateProps {
  data: {
    summaryTitle?: string;
    title?: string;
    achievementPoints?: string[];
    habitsList?: string[];
    encouragementMessage?: string;
    finalMessage?: string;
  };
}

export default function AchievementSummaryTemplate({ data }: AchievementSummaryTemplateProps) {
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
  return (
    <div className="w-full h-full bg-white flex flex-col justify-center items-center p-6 relative">
      {/* まとめタイトル */}
      {displayTitle && (
        <div className="text-center mb-8">
          <div className="border-2 border-gray-300 rounded-lg px-6 py-4 inline-block">
            <h1 className="text-2xl md:text-3xl font-bold text-black leading-tight">
              {displayTitle}
            </h1>
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
                    <span className="flex-shrink-0 text-2xl font-bold text-blue-500 pt-1">
                      {index + 1}.
                    </span>
                    {/* ポイント内容 */}
                    <p className="text-gray-700 text-2xl font-bold leading-relaxed flex-1 pt-1">
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
            <p className="text-xl text-gray-700 font-medium leading-relaxed">
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