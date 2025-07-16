// RankingEditor - ランキング型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Trophy, Award, Medal } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface RankingEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

interface RankingItem {
  rank: number
  name: string
  value: string
  description?: string
}

export function RankingEditor({ data, onUpdate }: RankingEditorProps) {
  const [rankingData, setRankingData] = useState<RankingItem[]>([])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // 初期データの設定
  useEffect(() => {
    if (data.rankingData && data.rankingData.length > 0) {
      setRankingData(data.rankingData)
    } else {
      // デフォルトの3項目
      setRankingData([
        { rank: 1, name: '1位の項目', value: '100', description: '1位の詳細説明' },
        { rank: 2, name: '2位の項目', value: '85', description: '2位の詳細説明' },
        { rank: 3, name: '3位の項目', value: '70', description: '3位の詳細説明' }
      ])
    }
  }, [data])

  // ランク番号を再振り
  const updateRankNumbers = (items: RankingItem[]) => {
    return items.map((item, index) => ({
      ...item,
      rank: index + 1
    }))
  }

  // データ更新
  const updateData = (newRankingData: RankingItem[]) => {
    const updatedData = updateRankNumbers(newRankingData)
    setRankingData(updatedData)
    
    const updatedTemplateData = {
      ...data,
      rankingData: updatedData
    }
    onUpdate(updatedTemplateData)
  }

  // 項目追加
  const addItem = () => {
    if (rankingData.length >= 5) return // 最大5項目
    
    const newItem: RankingItem = {
      rank: rankingData.length + 1,
      name: `${rankingData.length + 1}位の項目`,
      value: '50',
      description: `${rankingData.length + 1}位の詳細説明`
    }
    
    const newData = [...rankingData, newItem]
    updateData(newData)
  }

  // 項目削除
  const removeItem = (index: number) => {
    if (rankingData.length <= 1) return // 最小1項目
    
    const newData = rankingData.filter((_, i) => i !== index)
    updateData(newData)
  }

  // 項目編集
  const updateItem = (index: number, field: keyof RankingItem, value: string) => {
    const newData = [...rankingData]
    newData[index] = { ...newData[index], [field]: value }
    updateData(newData)
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
    
    const newData = [...rankingData]
    const draggedItemValue = newData[draggedItem]
    
    // 要素を移動
    newData.splice(draggedItem, 1)
    newData.splice(dropIndex, 0, draggedItemValue)
    
    updateData(newData)
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  // ランクアイコン取得
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Award className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-orange-500" />
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-600">{rank}</div>
    }
  }

  // ランク背景色取得
  const getRankBgColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
      case 3:
        return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
      default:
        return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          ランキング編集 - RankingTemplate
        </h3>
        <p className="text-sm text-blue-600">
          ランキング形式でデータを視覚的に表示するテンプレート。各項目に順位、名前、値、説明を設定できます。
        </p>
        <div className="mt-2 text-xs text-blue-500">
          制限: 最大5項目・最小1項目 | 名前30文字・値10文字・説明50文字
        </div>
      </div>

      {/* ランキングリスト */}
      <div className="space-y-4">
        {rankingData.map((item, index) => (
          <div
            key={index}
            className={`border-2 rounded-lg p-4 ${getRankBgColor(item.rank)} ${
              draggedItem === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-start gap-3">
              {/* ドラッグハンドル */}
              <div className="mt-2 cursor-move text-gray-400 hover:text-gray-600">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* ランク表示 */}
              <div className="flex-shrink-0 mt-1">
                {getRankIcon(item.rank)}
              </div>

              {/* 編集フィールド */}
              <div className="flex-1 space-y-3">
                {/* 項目名編集 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {item.rank}位 - 項目名
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="項目名を入力"
                    maxLength={30}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {item.name.length}/30文字
                  </div>
                </div>

                {/* 値編集 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    値・スコア
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => updateItem(index, 'value', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="値を入力（例: 100, 85%, 高い）"
                    maxLength={10}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {item.value.length}/10文字
                  </div>
                </div>

                {/* 説明編集 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    説明（任意）
                  </label>
                  <textarea
                    value={item.description || ''}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="詳細説明を入力（任意）"
                    rows={2}
                    maxLength={50}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {(item.description || '').length}/50文字
                  </div>
                </div>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => removeItem(index)}
                disabled={rankingData.length <= 1}
                className={`flex-shrink-0 p-2 rounded-full transition-colors ${
                  rankingData.length <= 1
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
          disabled={rankingData.length >= 5}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors ${
            rankingData.length >= 5
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-blue-300 text-blue-600 hover:bg-blue-50'
          }`}
        >
          <Plus className="w-5 h-5" />
          項目を追加 ({rankingData.length}/5)
        </button>
      </div>

      {/* プレビュー情報 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">プレビュー情報</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 現在のランキング数: {rankingData.length}</p>
          <p>• 各項目は「ランクアイコン + 名前 + 値 + 説明」で表示されます</p>
          <p>• 1位：トロフィー、2位：シルバー、3位：ブロンズ、4位以降：番号</p>
          <p>• ドラッグ&ドロップで順序を変更できます</p>
        </div>
      </div>
    </div>
  )
}