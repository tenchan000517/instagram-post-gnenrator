'use client'

import { useState } from 'react'
import ContentInput from './components/ContentInput'
import StrategyAnalyzer from './components/StrategyAnalyzer'
import PostGenerator from './components/PostGenerator'
import Header from './components/Header'
import { PostData, StrategyType } from './types/post'

export default function Home() {
  const [step, setStep] = useState(1)
  const [contentData, setContentData] = useState<string>('')
  const [analyzedStrategy, setAnalyzedStrategy] = useState<StrategyType | null>(null)
  const [postData, setPostData] = useState<PostData | null>(null)

  const handleContentSubmit = (content: string) => {
    setContentData(content)
    setStep(2)
  }

  const handleStrategySelect = (strategy: StrategyType) => {
    setAnalyzedStrategy(strategy)
    setStep(3)
  }

  const handlePostGenerated = (data: PostData) => {
    setPostData(data)
  }

  const resetFlow = () => {
    setStep(1)
    setContentData('')
    setAnalyzedStrategy(null)
    setPostData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= num 
                    ? 'bg-find-blue text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > num ? 'bg-find-blue' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              {step === 1 && 'Step 1: コンテンツ入力'}
              {step === 2 && 'Step 2: 戦略分析・選択'}
              {step === 3 && 'Step 3: 投稿生成・ダウンロード'}
            </p>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-4xl mx-auto">
          {step === 1 && (
            <ContentInput onSubmit={handleContentSubmit} />
          )}
          
          {step === 2 && (
            <StrategyAnalyzer 
              content={contentData}
              onStrategySelect={handleStrategySelect}
              onBack={() => setStep(1)}
            />
          )}
          
          {step === 3 && (
            <PostGenerator 
              content={contentData}
              strategy={analyzedStrategy!}
              onPostGenerated={handlePostGenerated}
              onBack={() => setStep(2)}
              onReset={resetFlow}
            />
          )}
        </div>

        {/* 学習ポイント表示 */}
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl card-shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-2 h-2 bg-find-blue rounded-full mr-2"></span>
            学習したInstagramコース戦略のポイント
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">5つの拡散パターン</h4>
              <ul className="space-y-1">
                <li>• 自己実現（憧れ・理想）</li>
                <li>• 損失回避（失敗回避）</li>
                <li>• 投資（リターン期待）</li>
                <li>• 緊急性（今すぐ行動）</li>
                <li>• 人間関係（仲間・メンター）</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">FIND to DO 戦略</h4>
              <ul className="space-y-1">
                <li>• 学生目線の徹底</li>
                <li>• 価値提供8-9割</li>
                <li>• 実践的な成長支援</li>
                <li>• コミュニティ誘導</li>
                <li>• 継続的な信頼構築</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}