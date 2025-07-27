import React from 'react'
import { TemplateData } from './TemplateTypes'

interface EmotionEmpathyListTemplateProps {
  data: TemplateData
}

export function EmotionEmpathyListTemplate({ data }: EmotionEmpathyListTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - emotion-empathy-list
  console.log('🎨 テンプレートデータ挿入 - emotion-empathy-list')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - number: "${data.number || 'なし'}"`)
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - content: [${data.content?.length || 0}個]`)
  data.content?.forEach((item, index) => {
    console.log(`    └─ ${index + 1}. "${item}"`)
  })
  console.log(`  - additionalText: "${data.additionalText || 'なし'}"`)
  console.log('================================================================================')

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/* メインコンテンツエリア */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        
        {/* 白色半透明カード */}
        <div className="bg-white/90 rounded-xl shadow-lg p-6 flex-1 flex flex-col">
          
          {/* 番号表示 */}
          <div className="mb-4">
            <span className="inline-block bg-purple-100 text-purple-600 text-xl font-bold px-4 py-2 rounded-lg">
              {data.number || '01'}
            </span>
          </div>
          
          {/* タイトル */}
          <h2 className="text-xl font-bold text-gray-800 mb-6 leading-tight">
            {data.title}
          </h2>
          
          {/* コンテンツ項目（並列表示） */}
          <div className="flex-1 space-y-4 mb-6">
            {data.content?.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 text-base leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
          
          {/* 追加テキスト */}
          {data.additionalText && (
            <div className="mt-auto pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm leading-relaxed">
                {data.additionalText}
              </p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export const emotionEmpathyListMetadata = {
  id: 'emotion_empathy_list',
  name: '感情共感型問題解決テンプレート',
  description: '感情的な問題提起と具体的な悩み状況を並列表示するテンプレート',
  category: 'emotion',
  tags: ['感情', '共感', '問題解決', '並列'],
  dataStructure: {
    number: 'string',
    title: 'string',
    content: 'string[]',
    additionalText: 'string?'
  }
}

export default EmotionEmpathyListTemplate