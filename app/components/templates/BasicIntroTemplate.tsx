import React from 'react';
import { Check } from 'lucide-react';
import { TemplateMetadata } from './TemplateTypes';

interface BasicIntroTemplateProps {
  data: {
    title?: string;
    targetAudience?: string;
    problems?: string[];
    additionalMessage?: string;
    savePrompt?: string;
  };
}

export default function BasicIntroTemplate({ data }: BasicIntroTemplateProps) {
  const {
    title = '',
    targetAudience = '',
    problems = [],
    additionalMessage = '',
    savePrompt = ''
  } = data || {};
  return (
    <div className="w-full h-full bg-gradient-to-b from-pink-50 to-white flex flex-col justify-center items-center p-8 relative">
      {/* メインタイトル */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
          {title}
        </h1>
      </div>

      {/* ターゲット質問 */}
      <div className="bg-brown-200 rounded-full px-8 py-4 mb-8 max-w-md">
        <p className="text-white text-lg font-medium text-center">
          {targetAudience}
        </p>
      </div>

      {/* 問題リスト */}
      <div className="space-y-4 mb-8 w-full max-w-lg">
        {(problems || []).map((problem, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-gray-600 rounded flex items-center justify-center mt-0.5">
              <Check className="w-4 h-4 text-white" />
            </div>
            <p className="text-gray-800 text-lg leading-relaxed">
              {problem}
            </p>
          </div>
        ))}
      </div>

      {/* 女性イラスト部分 */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          {/* 困っている女性のイラストエリア */}
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="text-6xl">😟</div>
          </div>
          {/* 思考吹き出し */}
          <div className="absolute -top-4 -left-8 w-8 h-8 bg-gray-300 rounded-full opacity-80"></div>
          <div className="absolute -top-8 -left-12 w-6 h-6 bg-gray-300 rounded-full opacity-60"></div>
          <div className="absolute -top-10 -left-14 w-4 h-4 bg-gray-300 rounded-full opacity-40"></div>
        </div>
      </div>

      {/* 追加メッセージ */}
      <div className="text-center mb-6">
        <p className="text-gray-700 text-lg font-medium">
          {additionalMessage}
        </p>
      </div>

      {/* 保存促進メッセージ */}
      <div className="absolute bottom-6 right-6 flex items-center space-x-2">
        <p className="text-red-500 text-sm font-medium">
          {savePrompt}
        </p>
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-lg">💛</span>
        </div>
      </div>
    </div>
  );
}

export const basicIntroMetadata: TemplateMetadata = {
  id: 'basic_intro',
  name: '基本導入型',
  description: 'K002用の基本導入テンプレート。タイトル、ターゲット質問、問題リストを表示',
  suitableFor: {
    contentTypes: ['導入', '問題提起', 'イントロダクション'],
    genres: ['キャリア', '働き方', '女性のキャリア形成'],
    dataStructure: ['title', 'targetAudience', 'problems', 'additionalMessage', 'savePrompt'],
    complexity: 'simple',
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 50,
    content: 200,
    subtitle: 30,
    items: 50
  },
  keywords: ['導入', '問題提起', 'キャリア', '基本紹介', 'チェックリスト']
}