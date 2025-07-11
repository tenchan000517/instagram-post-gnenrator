'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Brain, Target, CheckCircle } from 'lucide-react'
import { StrategyType } from '../types/post'

interface StrategyAnalyzerProps {
  content: string
  onStrategySelect: (strategy: StrategyType) => void
  onBack: () => void
}

const strategyPatterns = {
  'self-realization': {
    name: '自己実現（憧れ・理想）',
    description: '成功事例や理想の未来を提示して憧れを喚起',
    color: 'find-purple',
    keywords: ['成功', '内定', '成長', '変化', '実現', '夢', '目標達成'],
    structure: {
      hook: '憧れの結果を先に提示',
      body: '具体的な体験談・プロセス',
      cta: 'あなたも実現できる'
    },
    examples: [
      '3ヶ月で人生変わった学生の話',
      '文系からエンジニアになった方法',
      'プロジェクトで内定5社獲得'
    ]
  },
  'loss-avoidance': {
    name: '損失回避（失敗回避）',
    description: '失敗パターンや後悔を示して行動を促す',
    color: 'find-orange',
    keywords: ['後悔', '失敗', 'やってはいけない', '間違い', '危険', '注意'],
    structure: {
      hook: '後悔・失敗例の提示',
      body: '具体的な失敗パターン',
      cta: '今すぐ対策しよう'
    },
    examples: [
      '就活で後悔する学生の共通点5選',
      'やってはいけないNG行動',
      '手遅れになる前に'
    ]
  },
  'investment': {
    name: '投資（リターン期待）',
    description: '将来のリターンを示して今の行動を促す',
    color: 'find-green',
    keywords: ['投資', 'リターン', '将来', '年収', '価値', '効果', '倍'],
    structure: {
      hook: '将来の利益を数値化',
      body: '投資対効果の説明',
      cta: '今始めるべき理由'
    },
    examples: [
      '今やれば3年後に10倍返ってくること',
      '学生時代の投資が年収を決める',
      'スキルアップの ROI'
    ]
  },
  'urgency': {
    name: '緊急性（今すぐ行動）',
    description: '期限や機会の限定性を強調して即行動を促す',
    color: 'find-pink',
    keywords: ['今すぐ', '期限', '残り', 'ラストチャンス', '締切', '限定'],
    structure: {
      hook: '時間の制約を強調',
      body: '今だからできること',
      cta: '今日から始めよう'
    },
    examples: [
      '就活まで残り1年でやるべきこと',
      '3年生の今だからできる挑戦',
      '今しかないチャンス'
    ]
  },
  'relationships': {
    name: '人間関係（仲間・メンター）',
    description: '人とのつながりや支え合いの価値を伝える',
    color: 'find-blue',
    keywords: ['仲間', 'メンター', '人脈', 'つながり', '支え', 'コミュニティ'],
    structure: {
      hook: '人間関係の重要性',
      body: '具体的な体験・効果',
      cta: '一緒に成長しよう'
    },
    examples: [
      '一生続く仲間の作り方',
      'メンターとの出会いが変えたこと',
      'コミュニティの力'
    ]
  }
}

export default function StrategyAnalyzer({ content, onStrategySelect, onBack }: StrategyAnalyzerProps) {
  const [analyzing, setAnalyzing] = useState(true)
  const [recommendedStrategies, setRecommendedStrategies] = useState<StrategyType[]>([])
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyType | null>(null)

  useEffect(() => {
    // コンテンツを分析して最適な戦略を推奨
    const analyzeContent = () => {
      const recommendations: { strategy: StrategyType; score: number }[] = []
      
      Object.entries(strategyPatterns).forEach(([key, pattern]) => {
        let score = 0
        pattern.keywords.forEach(keyword => {
          if (content.toLowerCase().includes(keyword)) {
            score += 1
          }
        })
        
        // FIND to DO 特有のキーワードボーナス
        const findToDoKeywords = ['学生', '成長', 'プロジェクト', '挑戦', 'スキル', '実践']
        findToDoKeywords.forEach(keyword => {
          if (content.toLowerCase().includes(keyword)) {
            score += 0.5
          }
        })
        
        recommendations.push({ strategy: key as StrategyType, score })
      })
      
      // スコア順にソート
      recommendations.sort((a, b) => b.score - a.score)
      
      // 上位3つを推奨として設定
      setRecommendedStrategies(recommendations.slice(0, 3).map(r => r.strategy))
      setAnalyzing(false)
    }

    setTimeout(analyzeContent, 1500) // アニメーション効果
  }, [content])

  const handleStrategySelect = () => {
    if (selectedStrategy) {
      onStrategySelect(selectedStrategy)
    }
  }

  if (analyzing) {
    return (
      <div className="post-preview text-center py-12">
        <div className="animate-spin w-12 h-12 border-4 border-find-blue border-t-transparent rounded-full mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">戦略分析中...</h2>
        <p className="text-gray-600">
          戦略に基づいて、<br />
          最適な拡散パターンを分析しています
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 分析結果 */}
      <div className="post-preview">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-find-blue" />
            戦略分析結果
          </h2>
          <button onClick={onBack} className="btn-secondary flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>戻る</span>
          </button>
        </div>

        <div className="p-4 bg-green-50 rounded-lg mb-6">
          <p className="text-green-800 text-sm">
            ✅ <span className="font-medium">分析完了</span> - 
            あなたのコンテンツに最適な戦略パターンを特定しました
          </p>
        </div>

        <div className="space-y-4">
          {recommendedStrategies.map((strategy, index) => {
            const pattern = strategyPatterns[strategy]
            const isSelected = selectedStrategy === strategy
            const isRecommended = index === 0

            return (
              <div
                key={strategy}
                onClick={() => setSelectedStrategy(strategy)}
                className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? `border-${pattern.color} bg-gradient-to-r from-${pattern.color}/10 to-${pattern.color}/5`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-find-blue text-white text-xs px-2 py-1 rounded-full font-medium">
                      推奨
                    </div>
                  </div>
                )}
                
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Target className={`w-5 h-5 text-${pattern.color}`} />
                      <h3 className="font-semibold text-gray-800">
                        {pattern.name}
                      </h3>
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {pattern.description}
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-2">構成</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• {pattern.structure.hook}</li>
                          <li>• {pattern.structure.body}</li>
                          <li>• {pattern.structure.cta}</li>
                        </ul>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-gray-800 mb-2">応用例</h4>
                        <div className="flex flex-wrap gap-2">
                          {pattern.examples.map((example, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleStrategySelect}
            disabled={!selectedStrategy}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            選択した戦略で投稿作成
          </button>
        </div>
      </div>

      {/* FIND to DO 戦略ポイント */}
      <div className="post-preview">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          FIND to DO × 選択戦略の活用ポイント
        </h3>
        
        {selectedStrategy && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm leading-relaxed">
              {selectedStrategy === 'self-realization' && 
                '学生の成功事例やプロジェクト体験談を中心に、「自分にもできる」という憧れと希望を与える投稿を作成します。'}
              {selectedStrategy === 'loss-avoidance' && 
                '就活失敗や大学生活の後悔例を提示し、FIND to DOでの挑戦が「手遅れ」を防ぐ解決策だと伝える投稿を作成します。'}
              {selectedStrategy === 'investment' && 
                'スキルアップや人脈形成への投資効果を数値化し、今の行動が将来のキャリアに与える影響を示す投稿を作成します。'}
              {selectedStrategy === 'urgency' && 
                '就活時期や学年を意識した緊急性を強調し、「今この瞬間」の行動の重要性を伝える投稿を作成します。'}
              {selectedStrategy === 'relationships' && 
                'コミュニティでの仲間作りやメンターとの出会いに焦点を当て、一人では得られない成長を伝える投稿を作成します。'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}