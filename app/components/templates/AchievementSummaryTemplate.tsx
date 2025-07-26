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
    <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center p-8 relative">
      {/* まとめタイトル */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
          {summaryTitle}
        </h1>
      </div>

      {/* 達成ポイントリスト */}
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            {achievementPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4">
                {/* ポイント番号 */}
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                {/* ポイント内容 */}
                <p className="text-gray-700 text-lg leading-relaxed flex-1 pt-1">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 成功イメージイラスト */}
      <div className="mb-8">
        <div className="relative">
          {/* 成功を表現するシンプルなイラスト */}
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-2 border-l-2 border-b-2 border-green-500 transform rotate-45 translate-y-[-1px]"></div>
              </div>
            </div>
          </div>
          {/* 装飾的な要素 */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"></div>
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full"></div>
          <div className="absolute top-2 -left-4 w-2 h-2 bg-blue-400 rounded-full"></div>
        </div>
      </div>

      {/* 励ましメッセージ */}
      <div className="text-center max-w-lg">
        <p className="text-gray-700 text-lg leading-relaxed font-medium">
          {encouragementMessage}
        </p>
      </div>

      {/* 完了を示すバッジ */}
      <div className="absolute top-6 right-6">
        <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
          Complete!
        </div>
      </div>

      {/* フッター装飾 */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400"></div>
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