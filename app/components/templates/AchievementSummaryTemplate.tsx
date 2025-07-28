import React from 'react';
import { TemplateMetadata } from './TemplateTypes';

interface AchievementSummaryTemplateProps {
  data: {
    summaryTitle?: string;
    achievementPoints?: string[];
    encouragementMessage?: string;
  };
}

export default function AchievementSummaryTemplate({ data }: AchievementSummaryTemplateProps) {
  const {
    summaryTitle = '',
    achievementPoints = [],
    encouragementMessage = ''
  } = data || {};
  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center p-6 relative">
      {/* まとめタイトル */}
      <div className="text-center mb-5">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
          {summaryTitle}
        </h1>
      </div>

      {/* 達成ポイントリスト */}
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 px-3 py-4 flex justify-center">
          <div className="text-left">
            <div className="space-y-1">
              {achievementPoints.map((point, index) => (
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