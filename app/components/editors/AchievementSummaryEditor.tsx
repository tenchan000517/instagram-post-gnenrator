// AchievementSummaryEditor - 達成まとめ型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface AchievementSummaryEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

export function AchievementSummaryEditor({ data, onUpdate }: AchievementSummaryEditorProps) {
  const [summaryTitle, setSummaryTitle] = useState<string>('')
  const [achievementPoints, setAchievementPoints] = useState<string[]>([])
  const [encouragementMessage, setEncouragementMessage] = useState<string>('')
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // 初期データの設定
  useEffect(() => {
    // summaryTitleの設定
    setSummaryTitle((data as any).summaryTitle || data.title || '')
    
    // achievementPointsの設定
    if ((data as any).achievementPoints && (data as any).achievementPoints.length > 0) {
      setAchievementPoints((data as any).achievementPoints)
    } else if (data.items && data.items.length > 0) {
      // itemsからの変換
      const points = data.items.map(item => 
        typeof item === 'string' ? item : item.title || item.content || String(item)
      )
      setAchievementPoints(points)
    } else {
      // デフォルトの項目
      setAchievementPoints([
        '達成ポイント1',
        '達成ポイント2',
        '達成ポイント3'
      ])
    }

    // encouragementMessageの設定
    setEncouragementMessage((data as any).encouragementMessage || data.description || '')
  }, [data])

  // データ更新
  const updateData = (newTitle: string, newPoints: string[], newMessage: string) => {
    const updatedData = {
      ...data,
      title: newTitle,
      summaryTitle: newTitle,
      achievementPoints: newPoints,
      encouragementMessage: newMessage,
      items: newPoints // 互換性のため
    }
    onUpdate(updatedData)
  }

  // タイトル更新
  const handleTitleChange = (newTitle: string) => {
    setSummaryTitle(newTitle)
    updateData(newTitle, achievementPoints, encouragementMessage)
  }

  // ポイント更新
  const handlePointChange = (index: number, newPoint: string) => {
    const newPoints = [...achievementPoints]
    newPoints[index] = newPoint
    setAchievementPoints(newPoints)
    updateData(summaryTitle, newPoints, encouragementMessage)
  }

  // ポイント追加
  const addPoint = () => {
    if (achievementPoints.length >= 12) return // 最大12項目
    
    const newPoint = `達成ポイント${achievementPoints.length + 1}`
    const newPoints = [...achievementPoints, newPoint]
    setAchievementPoints(newPoints)
    updateData(summaryTitle, newPoints, encouragementMessage)
  }

  // ポイント削除
  const removePoint = (index: number) => {
    if (achievementPoints.length <= 1) return // 最低1項目は保持
    
    const newPoints = achievementPoints.filter((_, i) => i !== index)
    setAchievementPoints(newPoints)
    updateData(summaryTitle, newPoints, encouragementMessage)
  }

  // 励ましメッセージ更新
  const handleMessageChange = (newMessage: string) => {
    setEncouragementMessage(newMessage)
    updateData(summaryTitle, achievementPoints, newMessage)
  }

  // ドラッグ&ドロップ
  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedItem === null) return
    
    const newPoints = [...achievementPoints]
    const draggedPoint = newPoints[draggedItem]
    
    // ドラッグしたアイテムを削除
    newPoints.splice(draggedItem, 1)
    // ドロップ位置に挿入
    newPoints.splice(dropIndex, 0, draggedPoint)
    
    setAchievementPoints(newPoints)
    updateData(summaryTitle, newPoints, encouragementMessage)
    setDraggedItem(null)
  }

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      <div className="text-lg font-semibold text-gray-800 mb-4">
        達成まとめ型 編集
      </div>

      {/* まとめタイトル編集 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          まとめタイトル
        </label>
        <input
          type="text"
          value={summaryTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="まとめタイトルを入力..."
          maxLength={50}
        />
        <div className="text-xs text-gray-500">
          {summaryTitle.length}/50文字
        </div>
      </div>

      {/* 達成ポイント編集 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            達成ポイント ({achievementPoints.length}/12)
          </label>
          <button
            onClick={addPoint}
            disabled={achievementPoints.length >= 12}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>追加</span>
          </button>
        </div>

        <div className="space-y-3">
          {achievementPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 bg-white p-3 rounded border"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="flex items-center space-x-2 flex-shrink-0">
                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-blue-500 w-6">
                  {index + 1}.
                </span>
              </div>
              
              <textarea
                value={point}
                onChange={(e) => handlePointChange(index, e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-200 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={2}
                placeholder={`達成ポイント${index + 1}を入力...`}
                maxLength={100}
              />
              
              <button
                onClick={() => removePoint(index)}
                disabled={achievementPoints.length <= 1}
                className="flex-shrink-0 p-1 text-red-500 hover:bg-red-50 rounded disabled:text-gray-300 disabled:cursor-not-allowed"
                title="削除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 励ましメッセージ編集 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          励ましメッセージ（オプショナル）
        </label>
        <textarea
          value={encouragementMessage}
          onChange={(e) => handleMessageChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="読者への励ましメッセージを入力..."
          maxLength={200}
        />
        <div className="text-xs text-gray-500">
          {encouragementMessage.length}/200文字
        </div>
      </div>

      {/* プレビュー情報 */}
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
        <div className="font-medium mb-1">📝 編集のヒント</div>
        <ul className="text-xs space-y-1 list-disc list-inside">
          <li>達成ポイントは番号付きで表示されます</li>
          <li>ドラッグ&ドロップで順序を変更できます</li>
          <li>各ポイントは100文字以内で簡潔に記載してください</li>
          <li>励ましメッセージは読者のモチベーション向上に活用してください</li>
        </ul>
      </div>
    </div>
  )
}