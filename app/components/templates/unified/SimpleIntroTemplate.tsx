import React from 'react'
import Image from 'next/image'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'

interface SimpleIntroTemplateProps {
  data: TemplateData
  postType?: '001' | '002' | '003' | '004'
  targetId?: string
}

// 就活系ターゲット（「学生」含む）
const JOB_HUNTING_TARGETS = ['T001', 'T004', 'T007', 'T008', 'T013', 'T019', 'T022']

// 女性ターゲット
const FEMALE_TARGETS = ['T002', 'T005', 'T009', 'T011', 'T020', 'T023']

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
} as const

function isJobHuntingTarget(targetId?: string): boolean {
  return targetId ? JOB_HUNTING_TARGETS.includes(targetId) : false
}

function isFemaleTarget(targetId?: string): boolean {
  return targetId ? FEMALE_TARGETS.includes(targetId) : false
}

function getDynamicImage(postType?: '001' | '002' | '003' | '004', targetId?: string): string {
  if (!postType) return '/misaki.png'
  
  const config = TYPE_CONFIG[postType]
  const isJobType = isJobHuntingTarget(targetId)
  const isFemale = isFemaleTarget(targetId)
  
  // 画像選択ロジック: 就活系 > 女性 > 通常の優先順位
  if (isJobType) {
    return config.jobImage
  } else if (postType === '002' && isFemale && 'femaleImage' in config) {
    return config.femaleImage
  } else {
    return config.normalImage
  }
}

function getDynamicBgGradient(postType?: '001' | '002' | '003' | '004'): string {
  if (!postType) return 'from-blue-50'
  return TYPE_CONFIG[postType].bgGradient
}

export function SimpleIntroTemplate({ data, postType, targetId }: SimpleIntroTemplateProps) {
  const title = data.title || ''
  const description = data.description || ''
  
  // 優先順位: data.imageSrc > data.image > 動的選択
  const imageSrc = data.imageSrc || data.image || getDynamicImage(postType, targetId)
  const imageAlt = data.imageAlt || 'イラスト'
  const bgGradient = getDynamicBgGradient(postType)

  return (
    <div className={`w-full h-full bg-gradient-to-br ${bgGradient} to-white relative overflow-hidden`}>
      {/* メインコンテンツ */}
      <div className="p-8 h-full flex flex-col justify-center items-center">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* タイトル */}
          {title && (
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {cleanMarkdown(title)}
            </h1>
          )}
          
          {/* 画像 */}
          <div className="flex justify-center">
            <div className="w-64 h-64 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden shadow-lg">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={256}
                height={256}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* 説明文 */}
          {description && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <p className="text-xl text-gray-700 leading-relaxed">
                {cleanMarkdown(description)}
              </p>
            </div>
          )}
          
          {/* フォールバック */}
          {!title && !description && (
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">表示するコンテンツがありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// メタデータ
export const simpleIntroMetadata = {
  id: 'simple_intro',
  name: 'シンプル導入型（動的対応）',
  description: 'タイトル・画像・説明文のシンプルな3要素構成テンプレート。postType・targetIdに応じて動的にキャラクター画像と背景色を変更。個別指定があれば優先。',
  suitableFor: {
    contentTypes: ['導入', '概要説明', 'タイトルページ', '基本紹介'],
    genres: ['全ジャンル対応', 'Type001-004動的対応'],
    dataStructure: ['シンプル構成', '基本要素', '動的キャラクター選択'],
    complexity: 'simple' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 40,
    description: 200,
    subtitle: 0,
    items: 0
  },
  keywords: ['シンプル', '導入', '基本', 'タイトル', '概要', '動的', 'ターゲット対応']
}