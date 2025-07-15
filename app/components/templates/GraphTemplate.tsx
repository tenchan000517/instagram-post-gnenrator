import React from 'react'
import { TemplateData, TemplateMetadata, getPageNumberIcon, splitTitleForBadge, cleanMarkdown } from './TemplateTypes'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react'

interface GraphTemplateProps {
  data: TemplateData
}

const GraphTemplate: React.FC<GraphTemplateProps> = ({ data }) => {
  const { badge, title: cleanTitle } = splitTitleForBadge(data.title)
  const PageIcon = getPageNumberIcon(data.pageNumber || 1)

  // デフォルトカラーパレット
  const COLORS = [
    '#3B82F6', // blue-500
    '#EF4444', // red-500
    '#10B981', // green-500
    '#F59E0B', // yellow-500
    '#8B5CF6', // purple-500
    '#EC4899', // pink-500
    '#6B7280', // gray-500
    '#F97316', // orange-500
  ]

  const renderPieChart = () => {
    if (!data.graphData?.data) return null

    const chartData = data.graphData.data.map((item, index) => ({
      ...item,
      color: item.color || COLORS[index % COLORS.length]
    }))

    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload
        return (
          <div className="bg-white p-3 rounded-lg shadow-lg border">
            <p className="font-medium">{data.name}</p>
            <p className="text-blue-600 font-bold">{data.value}%</p>
          </div>
        )
      }
      return null
    }

    return (
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderBarChart = () => {
    const graphData = data.graphData as any
    if (!graphData?.categories || !graphData?.series) return null

    // categories と series を使用してデータを変換
    const chartData = graphData.categories.map((category: string, index: number) => {
      const dataPoint: any = { name: category }
      graphData.series.forEach((series: any) => {
        dataPoint[series.name] = series.data[index]
      })
      return dataPoint
    })

    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 rounded-lg shadow-lg border">
            <p className="font-medium">{label}</p>
            {payload.map((item: any, index: number) => (
              <p key={index} className="text-blue-600 font-bold">
                {item.dataKey}: {item.value}万円
              </p>
            ))}
          </div>
        )
      }
      return null
    }

    return (
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            {graphData.series.map((series: any, index: number) => (
              <Bar 
                key={series.name}
                dataKey={series.name} 
                fill={COLORS[index % COLORS.length]} 
                radius={[4, 4, 0, 0]} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  const renderChart = () => {
    if (!data.graphData) return null

    return data.graphData.type === 'pie' ? renderPieChart() : renderBarChart()
  }

  const getChartIcon = () => {
    return data.graphData?.type === 'pie' ? 
      <PieChartIcon className="w-6 h-6 text-blue-600" /> : 
      <BarChart3 className="w-6 h-6 text-blue-600" />
  }

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
      
      <div className="relative z-10 p-8 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-6">
          {(() => {
            const badgeText = badge || data.badgeText || 'グラフ'
            
            return (
              <>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '12px'}}>
                  <svg width="400" height="50">
                    <rect x="0" y="0" width="400" height="50" fill="#60a5fa" rx="4" />
                    <text x="200" y="32" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">{badgeText}</text>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                  {cleanMarkdown(cleanTitle)}
                </h1>
                {data.description && (
                  <p className="text-gray-600 mt-2 text-sm">
                    {cleanMarkdown(data.description)}
                  </p>
                )}
              </>
            )
          })()}
        </div>

      {/* グラフ表示 */}
      <div className="flex-1 flex items-center justify-center">
        {renderChart()}
      </div>

      {/* データ一覧（小さく表示） */}
      {data.graphData?.data && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {data.graphData.data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color || COLORS[index % COLORS.length] }}
                />
                <span className="font-medium">{item.name}:</span>
                <span className="text-blue-600 font-bold">{item.value}{data.graphData?.type === 'pie' ? '%' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 出典情報 */}
      {data.graphData?.source && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            出典: {data.graphData.source.organization} {data.graphData.source.year}
            {data.graphData.source.date && ` (${data.graphData.source.date})`}
          </p>
        </div>
      )}

      {/* フォールバック：content内の出典 */}
      {!data.graphData?.source && data.content && data.content.includes('【出典】') && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            {data.content.split('【出典】:')[1]?.trim() || data.content.split('【出典】：')[1]?.trim()}
          </p>
        </div>
      )}
      </div>
    </div>
  )
}

// メタデータ
export const graphMetadata: TemplateMetadata = {
  id: 'graph',
  name: 'グラフ表示テンプレート',
  description: 'recharts使用の円グラフ・棒グラフでデータを可視化するテンプレート',
  suitableFor: {
    contentTypes: ['統計データ', 'グラフ', '円グラフ', '棒グラフ', 'データ可視化'],
    genres: ['industry-features', 'general'],
    dataStructure: ['数値データ', 'パーセンテージ', '比較データ'],
    complexity: 'complex' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 30,
    content: 100,
    subtitle: 20,
    items: 60
  },
  keywords: ['グラフ', '円グラフ', '棒グラフ', 'データ', '統計', '割合', '比較', '%']
}

export default GraphTemplate