import React from 'react';
import Image from 'next/image';
import { TemplateMetadata } from './TemplateTypes';

interface StepGuideAchievementTemplateProps {
  data: {
    pointNumber?: string;
    title?: string;
    content?: string[];
    actionItems?: string[];
    illustrationImage?: string;
  };
}

export default function StepGuideAchievementTemplate({ data }: StepGuideAchievementTemplateProps) {
  const {
    pointNumber = '1',
    title = '',
    content = [],
    actionItems = [],
    illustrationImage
  } = data || {};
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-100 to-white flex flex-col">
      {/* ヘッダー部分 */}
      <div className="bg-brown-300 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium opacity-80">Point</span>
          <div className="flex items-center space-x-3">
            <span className="text-6xl font-bold leading-none">{pointNumber}</span>
            <h1 className="text-xl font-medium leading-tight max-w-xs">
              {title}
            </h1>
          </div>
        </div>
        <div className="text-sm bg-brown-500 px-3 py-1 rounded-full">
          {pointNumber}/7
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* イラストエリア（オプショナル） */}
        {illustrationImage && (
          <div className="bg-white rounded-lg p-8 mb-8 shadow-sm max-w-md w-full">
            <div className="flex justify-center items-center h-48">
              <div className="relative w-32 h-32">
                <Image
                  src={illustrationImage}
                  alt="Step illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* コンテンツテキスト */}
        <div className={`text-center max-w-lg space-y-4 ${!illustrationImage ? 'mt-8' : ''}`}>
          {content.map((text, index) => (
            <p key={index} className="text-gray-700 text-lg leading-relaxed">
              {text.includes('"') ? (
                <>
                  {text.split('"')[0]}
                  <span className="text-blue-500 font-medium">
                    "{text.split('"')[1]}"
                  </span>
                  {text.split('"')[2]}
                </>
              ) : (
                text
              )}
            </p>
          ))}
        </div>

        {/* アクションアイテム（存在する場合） */}
        {actionItems.length > 0 && (
          <div className="mt-8 bg-blue-50 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-gray-800 font-medium mb-4 text-center">
              具体的なアクション
            </h3>
            <div className="space-y-2">
              {actionItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* フッター：Nextボタン */}
      <div className="flex justify-end p-6">
        <div className="bg-brown-300 text-white px-6 py-2 rounded-full flex items-center space-x-2">
          <span className="text-sm font-medium">Next</span>
          <span className="text-lg">→</span>
        </div>
      </div>

      {/* 右下のハートアイコン */}
      <div className="absolute bottom-6 right-16 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
      </div>
    </div>
  );
}

export const stepGuideAchievementMetadata: TemplateMetadata = {
  id: 'step_guide_achievement',
  name: 'ステップガイド達成型',
  description: 'K002用のステップガイドテンプレート。ポイント番号、タイトル、コンテンツ、オプショナル画像を表示',
  suitableFor: {
    contentTypes: ['ステップガイド', '段階的解説', '実践ガイド', '教育コンテンツ'],
    genres: ['キャリア', '働き方', '女性のキャリア形成', 'スキル開発'],
    dataStructure: ['pointNumber', 'title', 'content', 'actionItems', 'illustrationImage'],
    complexity: 'medium',
    pageCount: { min: 2, max: 8 }
  },
  characterLimits: {
    title: 40,
    content: 300,
    subtitle: 30,
    items: 80
  },
  keywords: ['ステップ', 'ガイド', '段階的', 'ポイント', '実践', '画像対応']
}