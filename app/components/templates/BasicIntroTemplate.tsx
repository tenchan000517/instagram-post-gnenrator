import React from 'react';
import { CheckSquare } from 'lucide-react';
import { TemplateMetadata } from './TemplateTypes';

interface BasicIntroTemplateProps {
  data: {
    title?: string;
    targetAudience?: string;
    problems?: string[];
    additionalMessage?: string;
    savePrompt?: string;
  };
  postType?: '001' | '002' | '003' | '004';
  targetId?: string;
}

// 就活系ターゲット（「学生」含む）
const JOB_HUNTING_TARGETS = ['T001', 'T004', 'T007', 'T008', 'T013', 'T019', 'T022'];

// 女性ターゲット
const FEMALE_TARGETS = ['T002', 'T005', 'T009', 'T011', 'T020', 'T023'];

// 投稿タイプ別設定
const TYPE_CONFIG = {
  '001': { 
    normalImage: '/misaki_worry.png', 
    jobImage: '/iida.png', 
    bgGradient: 'from-pink-50',
    altText: 'キャラクター'
  },
  '002': { 
    normalImage: '/king.png', 
    femaleImage: '/misaki.png',
    jobImage: '/iida.png', 
    bgGradient: 'from-orange-50',
    altText: 'キャラクター'
  },
  '003': { 
    normalImage: '/kikuyo.png', 
    jobImage: '/iida.png', 
    bgGradient: 'from-green-50',
    altText: 'キャラクター'
  },
  '004': { 
    normalImage: '/ten.png', 
    jobImage: '/iida.png', 
    bgGradient: 'from-pink-50',
    altText: 'キャラクター'
  }
} as const;

function isJobHuntingTarget(targetId?: string): boolean {
  return targetId ? JOB_HUNTING_TARGETS.includes(targetId) : false;
}

function isFemaleTarget(targetId?: string): boolean {
  return targetId ? FEMALE_TARGETS.includes(targetId) : false;
}

export default function BasicIntroTemplate({ data, postType = '001', targetId }: BasicIntroTemplateProps) {
  const {
    title = '',
    targetAudience = '',
    problems = [],
    additionalMessage = '',
    savePrompt = ''
  } = data || {};
  
  // 動的設定を取得
  const config = TYPE_CONFIG[postType];
  const isJobType = isJobHuntingTarget(targetId);
  const isFemale = isFemaleTarget(targetId);
  
  // 画像選択ロジック: 就活系 > 女性 > 通常の優先順位
  const characterImage = isJobType 
    ? config.jobImage 
    : (postType === '002' && isFemale)
      ? (config as any).femaleImage 
      : config.normalImage;
  return (
    <div className={`w-full h-full bg-gradient-to-b ${config.bgGradient} to-white flex flex-col justify-center items-center p-8 relative`}>
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

      {/* 女性イラスト部分 */}
      <div className="flex justify-center mb-6">
        <div className="w-80 h-80 rounded-full overflow-hidden">
          <img 
            src={characterImage} 
            alt={config.altText} 
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

export const basicIntroMetadata: TemplateMetadata = {
  id: 'basic_intro',
  name: '統合導入型',
  description: '投稿タイプ・ターゲット別に動的にキャラクター画像と背景色を変更する統合導入テンプレート',
  suitableFor: {
    contentTypes: ['導入', '問題提起', 'イントロダクション'],
    genres: ['全投稿タイプ対応', 'Type001-004', '就活・キャリア'],
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
  keywords: ['導入', '問題提起', '統合', '動的', 'Type001-004']
}