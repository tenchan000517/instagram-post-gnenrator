import React, { useEffect, useRef } from 'react'
import { cleanMarkdown } from '../TemplateTypes'
import { getT009DynamicFontClass } from '../../../utils/fontUtils'

interface EnhancedToolDetailTemplateProps {
  data: EnhancedToolDetailData
  targetId?: string
}

interface TenScores {
  immediateEffect: number
  easeOfUse: number
  popularity: number
  costEffectiveness: number
  lazyFriendly: number
}

interface KeyMetrics {
  price: string
  suitableTasks: string
  freeLimit: string
  outputFormats: string
}

interface ParameterGraph {
  timeReduction: number
  simplicity: number
  versatility: number
  reliability: number
  trendiness: number
}

interface Features {
  type: string
  developer: string
  launched: string
  specialization: string
}

interface Details {
  overview: string
  useCases: string[]
  pros: string[]
  tips: string[]
}

interface ToolDetail {
  toolName: string
  category: string
  position: number
  tenScores: TenScores
  keyMetrics: KeyMetrics
  parameterGraph: ParameterGraph
  features: Features
  details: Details
  tenRecommendation: string
  logoPath?: string
}

interface EnhancedToolDetailData {
  displayMode: string
  tools: ToolDetail[]
}

// TEN専用配色定義
const TEN_COLORS = {
  primary: '#2D5016',
  secondary: '#4A7C2A',
  accent: '#6B9F3E',
  background: '#F8FBF4',
  text: '#1A1A1A'
}

const EnhancedToolDetailTemplate: React.FC<EnhancedToolDetailTemplateProps> = ({ data, targetId }) => {
  const { tools = [] } = data
  const dynamicFontClass = getT009DynamicFontClass(targetId)

  // 5角形レーダーチャートコンポーネント（K805と同じ）
  const ParameterRadarChart = ({ params, toolName, compact = false }: { params: ParameterGraph, toolName: string, compact?: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    const parameters = [
      { name: '即効性', value: params.timeReduction },
      { name: '簡単さ', value: params.simplicity },
      { name: '汎用性', value: params.versatility },
      { name: '信頼性', value: params.reliability },
      { name: 'トレンド性', value: params.trendiness }
    ]

    const canvasSize = compact ? 200 : 240
    const maxRadius = compact ? 50 : 85
    const labelRadius = compact ? 50 : 115

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // キャンバスクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const numSides = 5

      // 背景の5角形グリッドを描画
      for (let level = 1; level <= 5; level++) {
        const radius = (maxRadius * level) / 5
        ctx.beginPath()
        for (let i = 0; i <= numSides; i++) {
          const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2
          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.strokeStyle = '#e5e7eb'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // 軸線を描画
      for (let i = 0; i < numSides; i++) {
        const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2
        const x = centerX + maxRadius * Math.cos(angle)
        const y = centerY + maxRadius * Math.sin(angle)
        
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = '#d1d5db'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // データ値の5角形を描画
      ctx.beginPath()
      for (let i = 0; i <= numSides; i++) {
        const paramIndex = i % numSides
        const value = parameters[paramIndex].value
        const radius = (maxRadius * value) / 100
        const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'
      ctx.strokeStyle = '#3b82f6'
      ctx.lineWidth = 2
      ctx.fill()
      ctx.stroke()

      // データポイントを描画
      for (let i = 0; i < numSides; i++) {
        const value = parameters[i].value
        const radius = (maxRadius * value) / 100
        const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2
        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)
        
        ctx.beginPath()
        ctx.arc(x, y, compact ? 2 : 4, 0, 2 * Math.PI)
        ctx.fillStyle = '#3b82f6'
        ctx.fill()
        ctx.strokeStyle = 'white'
        ctx.lineWidth = compact ? 1 : 2
        ctx.stroke()
      }

      // ラベルを描画（コンパクト版では省略）
      if (!compact) {
        ctx.font = '12px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#374151'
        
        for (let i = 0; i < numSides; i++) {
          const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2
          const x = centerX + labelRadius * Math.cos(angle)
          let y = centerY + labelRadius * Math.sin(angle)
          
          // 「簡単さ」と「トレンド性」のラベルを上に移動
          if (parameters[i].name === '簡単さ' || parameters[i].name === 'トレンド性') {
            y -= 8  // Y軸方向に8px上に移動
          }
          
          ctx.fillText(parameters[i].name, x, y)
        }

        // 数値ラベルを描画
        ctx.font = '10px sans-serif'
        ctx.fillStyle = '#1d4ed8'
        
        for (let i = 0; i < numSides; i++) {
          const value = parameters[i].value
          const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2
          const valueRadius = (maxRadius * value) / 100 + 15
          const x = centerX + valueRadius * Math.cos(angle)
          const y = centerY + valueRadius * Math.sin(angle)
          
          ctx.fillText(value.toString(), x, y)
        }
      }
    }, [params, compact])

    return (
      <div className={compact ? "p-2" : "bg-gray-50 px-4 pt-2 pb-0 rounded-lg"}>
        {!compact && toolName && (
          <h4 className={`text-lg font-semibold text-gray-800 mb-3 text-center ${dynamicFontClass}`}>
            {toolName} ツール評価
          </h4>
        )}
        <div className="flex justify-center pt-2">
          <canvas 
            ref={canvasRef}
            width={canvasSize + 40}
            height={canvasSize}
            className=""
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4">
      <div className="w-full max-w-none mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
          {tools.slice(0, 2).map((tool, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 flex-1">
              {/* ヘッダー（K805形式 + ロゴ配置） */}
              <div className="text-white p-3 rounded-lg mb-3" style={{backgroundColor: '#21266D'}}>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {/* ツールロゴ */}
                    {tool.logoPath && (
                      <div className="w-12 h-12 bg-white rounded p-1 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={tool.logoPath} 
                          alt={`${tool.toolName}ロゴ`}
                          className="max-w-full max-h-full object-contain" 
                          style={{ width: '40px', height: '40px' }}
                        />
                      </div>
                    )}
                    
                    {/* テキスト情報 */}
                    <div>
                      <h2 className={`text-2xl font-bold ${dynamicFontClass}`}>
                        {cleanMarkdown(tool.toolName)}
                      </h2>
                      <p className={`text-sm opacity-90 ${dynamicFontClass}`}>
                        {tool.category}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* キーメトリクス（実用情報：4つのカラフルボックス） */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-blue-50 p-2 rounded text-center h-16 flex flex-col justify-center">
                  <div className={`text-xs text-blue-600 ${dynamicFontClass}`}>価格</div>
                  <div className={`text-sm font-bold text-blue-800 ${dynamicFontClass} leading-tight`}>
                    {cleanMarkdown(tool.keyMetrics.price)}
                  </div>
                </div>
                <div className="bg-green-50 p-2 rounded text-center h-16 flex flex-col justify-center">
                  <div className={`text-xs text-green-600 ${dynamicFontClass}`}>向いてる作業</div>
                  <div className={`text-sm font-bold text-green-800 ${dynamicFontClass} leading-tight`}>
                    {cleanMarkdown(tool.keyMetrics.suitableTasks)}
                  </div>
                </div>
                <div className="bg-purple-50 p-2 rounded text-center h-16 flex flex-col justify-center">
                  <div className={`text-xs text-purple-600 ${dynamicFontClass}`}>無料の枠</div>
                  <div className={`text-sm font-bold text-purple-800 ${dynamicFontClass} leading-tight`}>
                    {cleanMarkdown(tool.keyMetrics.freeLimit)}
                  </div>
                </div>
                <div className="bg-orange-50 p-2 rounded text-center h-16 flex flex-col justify-center">
                  <div className={`text-xs text-orange-600 ${dynamicFontClass}`}>対応出力</div>
                  <div className={`text-sm font-bold text-orange-800 ${dynamicFontClass} leading-tight`}>
                    {cleanMarkdown(tool.keyMetrics.outputFormats)}
                  </div>
                </div>
              </div>

              {/* パラメータグラフ（K805形式） */}
              <div className="bg-white p-2 rounded-lg mb-1">
                <h4 className={`text-sm font-semibold text-gray-800 mb-2 ${dynamicFontClass}`}>ツール評価</h4>
                <ParameterRadarChart params={tool.parameterGraph} toolName="" compact={false} />
              </div>

              {/* ツール概要（K805形式：短縮版） */}
              <div className="mb-2">
                <h3 className={`text-sm font-bold text-gray-800 mb-1 ${dynamicFontClass}`}>ツール概要</h3>
                <div className="h-20 flex items-start">
                  <p className={`text-sm text-gray-700 leading-relaxed ${dynamicFontClass}`}>
                    {cleanMarkdown(tool.details.overview.substring(0, 120))}
                  </p>
                </div>
              </div>

              {/* 4カラム特徴ボックス（2カラム2行形式） */}
              <div className="mb-3">
                <div className="grid grid-cols-2 gap-1">
                  {tool.details.useCases.slice(0, 4).map((useCase, idx) => (
                    <div key={idx} className={`bg-${['purple', 'orange', 'indigo', 'green'][idx]}-100 border border-${['purple', 'orange', 'indigo', 'green'][idx]}-300 rounded px-1 py-0.5 flex items-center justify-center`}>
                      <span className={`text-xs font-bold text-${['purple', 'orange', 'indigo', 'green'][idx]}-700 mb-2 ${dynamicFontClass}`} style={{fontSize: '10px'}}>
                        {cleanMarkdown(useCase)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 主要な特徴（K805形式：上位3つ） */}
              <div>
                <h3 className={`text-sm font-bold text-gray-800 mb-2 ${dynamicFontClass}`}>おすすめTips</h3>
                <div className="space-y-1">
                  {tool.details.tips.slice(0, 3).map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start">
                      <span className="text-orange-600 mr-1 text-xs">●</span>
                      <span className={`text-xs text-gray-700 ${dynamicFontClass}`}>
                        {cleanMarkdown(tip.substring(0, 80))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// メタデータ
export const enhancedToolDetailMetadata = {
  templateId: 'enhanced_tool_detail',
  name: '強化ツール詳細テンプレート',
  description: 'TEN専用のツール詳細表示テンプレート（2ツール並列表示）',
  category: 'detail',
  dataStructure: {
    displayMode: 'string',
    tools: [{
      toolName: 'string',
      category: 'string',
      position: 'number',
      tenScores: {
        immediateEffect: 'number',
        easeOfUse: 'number',
        popularity: 'number',
        costEffectiveness: 'number',
        lazyFriendly: 'number'
      },
      keyMetrics: {
        price: 'string',
        suitableTasks: 'string',
        freeLimit: 'string',
        outputFormats: 'string'
      },
      details: {
        useCases: 'string[]',
        tips: 'string[]'
      },
      tenRecommendation: 'string'
    }]
  },
  colorScheme: TEN_COLORS,
  targetTypes: ['T004'],
  usageNotes: [
    '2ツール並列表示',
    'TENスコアの可視化',
    'スコアバーでわかりやすく表示',
    'TEN推薦コメント付き'
  ]
}

export default EnhancedToolDetailTemplate