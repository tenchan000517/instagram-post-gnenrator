import React from 'react';
import { CheckSquare } from 'lucide-react';
import { TemplateMetadata } from './TemplateTypes';

interface Type003IntroJobTemplateProps {
  data: {
    title?: string;
    targetAudience?: string;
    problems?: string[];
    additionalMessage?: string;
    savePrompt?: string;
  };
}

export default function Type003IntroJobTemplate({ data }: Type003IntroJobTemplateProps) {
  const {
    title = '',
    targetAudience = '',
    problems = [],
    additionalMessage = '',
    savePrompt = ''
  } = data || {};
  return (
    <div className="w-full h-full bg-gradient-to-b from-green-50 to-white flex flex-col justify-center items-center p-8 relative">
      {/* メインタイトル */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
          {title}
        </h1>
      </div>

      {/* ターゲット質問 */}
      <div className="bg-brown-200 rounded-full px-8 py-4 mb-8 max-w-md">
        <p className="text-gray-800 text-2xl font-medium text-center">
          {targetAudience}
        </p>
      </div>

      {/* 問題リスト */}
      <div className="space-y-4 mb-8 w-full max-w-lg">
        {(problems || []).map((problem, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <CheckSquare className="w-12 h-12 text-green-600" />
            </div>
            <p className="text-gray-800 text-2xl leading-relaxed">
              {problem}
            </p>
          </div>
        ))}
      </div>

      {/* キャラクター画像部分 */}
      <div className="flex justify-center mb-6">
        <div className="w-80 h-80 rounded-full overflow-hidden">
          <img 
            src="/iida.png" 
            alt="就活キャラクター" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 追加メッセージ */}
      <div className="text-center mb-6">
        <p className="text-gray-700 text-2xl font-medium">
          {additionalMessage}
        </p>
      </div>

    </div>
  );
}

export const type003IntroJobMetadata: TemplateMetadata = {
  id: 'type003_intro_job',
  name: 'Type003導入型（就活）',
  description: 'Type003就活用の導入テンプレート。iida.png使用、緑背景',
  suitableFor: {
    contentTypes: ['導入', '問題提起', 'イントロダクション'],
    genres: ['就活', '転職', '業界情報', 'Type003'],
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
  keywords: ['導入', '問題提起', 'Type003', '就活', '業界情報']
}