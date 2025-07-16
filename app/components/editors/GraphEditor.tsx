// GraphEditor - グラフ表示型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, PieChart, BarChart3, Palette } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface GraphEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

interface GraphDataItem {
  name: string
  value: number
  color?: string
}

interface GraphData {
  type: 'pie' | 'bar'
  data: GraphDataItem[]
  source?: {
    organization: string
    year: string
    date?: string
  }
}

export function GraphEditor({ data, onUpdate }: GraphEditorProps) {
  const [graphData, setGraphData] = useState<GraphData>({
    type: 'pie',
    data: [],
    source: undefined
  })
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

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

  // 初期データの設定
  useEffect(() => {
    if (data.graphData) {
      setGraphData(data.graphData)
    } else {
      // デフォルトの3項目
      setGraphData({
        type: 'pie',
        data: [
          { name: '項目1', value: 40, color: COLORS[0] },
          { name: '項目2', value: 35, color: COLORS[1] },
          { name: '項目3', value: 25, color: COLORS[2] }
        ],
        source: undefined
      })
    }
  }, [data])

  // データ更新
  const updateData = (newGraphData: GraphData) => {
    setGraphData(newGraphData)
    
    const updatedData = {
      ...data,
      graphData: newGraphData
    }
    onUpdate(updatedData)
  }

  // グラフタイプ変更
  const updateGraphType = (type: 'pie' | 'bar') => {
    const newGraphData = { ...graphData, type }
    updateData(newGraphData)
  }

  // 項目追加
  const addItem = () => {
    if (graphData.data.length >= 8) return // 最大8項目
    
    const newItem: GraphDataItem = {
      name: `項目${graphData.data.length + 1}`,
      value: 10,
      color: COLORS[graphData.data.length % COLORS.length]
    }
    
    const newGraphData = {
      ...graphData,
      data: [...graphData.data, newItem]
    }
    updateData(newGraphData)
  }

  // 項目削除
  const removeItem = (index: number) => {
    if (graphData.data.length <= 1) return // 最小1項目
    
    const newGraphData = {
      ...graphData,
      data: graphData.data.filter((_, i) => i !== index)
    }
    updateData(newGraphData)
  }

  // 項目編集
  const updateItem = (index: number, field: keyof GraphDataItem, value: string | number) => {
    const newData = [...graphData.data]
    newData[index] = { ...newData[index], [field]: value }
    const newGraphData = { ...graphData, data: newData }
    updateData(newGraphData)
  }

  // 出典情報編集
  const updateSource = (field: keyof NonNullable<GraphData['source']>, value: string) => {
    const newSource = { ...graphData.source, [field]: value }
    const newGraphData = { ...graphData, source: newSource }
    updateData(newGraphData)
  }

  // 出典情報削除
  const removeSource = () => {
    const newGraphData = { ...graphData, source: undefined }
    updateData(newGraphData)
  }

  // 出典情報追加
  const addSource = () => {
    const newGraphData = {
      ...graphData,
      source: {
        organization: '調査機関名',
        year: '2024',
        date: ''
      }
    }
    updateData(newGraphData)
  }

  // 値の合計を計算（円グラフ用）
  const getTotalValue = () => {
    return graphData.data.reduce((sum, item) => sum + item.value, 0)
  }

  // 値を100%に正規化
  const normalizeValues = () => {
    const total = getTotalValue()
    if (total === 0) return
    
    const newData = graphData.data.map(item => ({
      ...item,
      value: Math.round((item.value / total) * 100)
    }))
    
    const newGraphData = { ...graphData, data: newData }
    updateData(newGraphData)
  }

  // ドラッグ&ドロップ
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedItem === null) return
    
    const newData = [...graphData.data]
    const draggedItemValue = newData[draggedItem]
    
    // 要素を移動
    newData.splice(draggedItem, 1)
    newData.splice(dropIndex, 0, draggedItemValue)
    
    const newGraphData = { ...graphData, data: newData }
    updateData(newGraphData)
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const totalValue = getTotalValue()

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          グラフ編集 - GraphTemplate
        </h3>
        <p className="text-sm text-blue-600">
          円グラフや棒グラフでデータを可視化するテンプレート。統計データや比較データに最適です。
        </p>
        <div className="mt-2 text-xs text-blue-500">
          制限: 最大8項目・最小1項目 | 項目名15文字まで
        </div>
      </div>

      {/* グラフタイプ選択 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">グラフタイプ</h4>
        <div className="flex gap-4">
          <button
            onClick={() => updateGraphType('pie')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
              graphData.type === 'pie'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <PieChart className="w-5 h-5" />
            円グラフ
          </button>
          <button
            onClick={() => updateGraphType('bar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
              graphData.type === 'bar'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            棒グラフ
          </button>
        </div>
      </div>

      {/* 円グラフ用の合計値表示と正規化 */}
      {graphData.type === 'pie' && (
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700">
                合計値: {totalValue}{graphData.type === 'pie' ? '%' : ''}
              </p>
              {totalValue !== 100 && (
                <p className="text-xs text-yellow-600 mt-1">
                  円グラフは合計100%が推奨されます
                </p>
              )}
            </div>
            <button
              onClick={normalizeValues}
              className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
            >
              100%に正規化
            </button>
          </div>
        </div>
      )}

      {/* データ項目編集 */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">データ項目</h4>
        
        {graphData.data.map((item, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 bg-white ${
              draggedItem === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center gap-3">
              {/* ドラッグハンドル */}
              <div className="cursor-move text-gray-400 hover:text-gray-600">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* カラーピッカー */}
              <div className="flex-shrink-0">
                <input
                  type="color"
                  value={item.color || COLORS[index % COLORS.length]}
                  onChange={(e) => updateItem(index, 'color', e.target.value)}
                  className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                  title="色を選択"
                />
              </div>

              {/* 項目名編集 */}
              <div className="flex-1">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="項目名"
                  maxLength={15}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {item.name.length}/15文字
                </div>
              </div>

              {/* 値編集 */}
              <div className="flex-shrink-0 w-20">
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => updateItem(index, 'value', Number(e.target.value))}
                  className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max={graphData.type === 'pie' ? 100 : 9999}
                />
                <div className="text-xs text-gray-500 mt-1 text-center">
                  {graphData.type === 'pie' ? '%' : '値'}
                </div>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => removeItem(index)}
                disabled={graphData.data.length <= 1}
                className={`flex-shrink-0 p-2 rounded-full transition-colors ${
                  graphData.data.length <= 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-red-500 hover:bg-red-50'
                }`}
                title="項目を削除"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 項目追加ボタン */}
      <div className="flex justify-center">
        <button
          onClick={addItem}
          disabled={graphData.data.length >= 8}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors ${
            graphData.data.length >= 8
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-blue-300 text-blue-600 hover:bg-blue-50'
          }`}
        >
          <Plus className="w-5 h-5" />
          項目を追加 ({graphData.data.length}/8)
        </button>
      </div>

      {/* 出典情報 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800">出典情報</h4>
          {!graphData.source ? (
            <button
              onClick={addSource}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              出典を追加
            </button>
          ) : (
            <button
              onClick={removeSource}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              出典を削除
            </button>
          )}
        </div>

        {graphData.source && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                調査機関・組織名
              </label>
              <input
                type="text"
                value={graphData.source.organization}
                onChange={(e) => updateSource('organization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例: 総務省統計局"
                maxLength={30}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  年度
                </label>
                <input
                  type="text"
                  value={graphData.source.year}
                  onChange={(e) => updateSource('year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例: 2024"
                  maxLength={10}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  日付（任意）
                </label>
                <input
                  type="text"
                  value={graphData.source.date || ''}
                  onChange={(e) => updateSource('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="例: 12月調査"
                  maxLength={20}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* プレビュー情報 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">プレビュー情報</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• グラフタイプ: {graphData.type === 'pie' ? '円グラフ' : '棒グラフ'}</p>
          <p>• データ項目数: {graphData.data.length}</p>
          <p>• 合計値: {totalValue}{graphData.type === 'pie' ? '%' : ''}</p>
          <p>• 出典: {graphData.source ? '設定済み' : '未設定'}</p>
          <p>• ドラッグ&ドロップで項目の順序を変更できます</p>
        </div>
      </div>
    </div>
  )
}