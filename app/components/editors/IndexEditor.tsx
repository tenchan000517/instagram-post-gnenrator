/**
 * IndexTemplate専用エディタ
 * 目次ページ型の編集機能（title, subtitle, content, items配列）
 */

import React, { useState, useEffect } from 'react'
import { Trash2, Plus, GripVertical } from 'lucide-react'

interface IndexEditorProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onDataUpdate: (newData: any) => void
}

export const IndexEditor: React.FC<IndexEditorProps> = ({
  data,
  onUpdate,
  onDataUpdate
}) => {
  const [items, setItems] = useState<string[]>([])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // データからアイテムを抽出
  useEffect(() => {
    if (data?.items && Array.isArray(data.items)) {
      const extractedItems = data.items.map((item: any) => {
        if (typeof item === 'string') {
          return item
        } else if (item && typeof item === 'object') {
          return item.title || item.content || String(item)
        }
        return String(item)
      })
      setItems(extractedItems)
    } else {
      setItems([])
    }
  }, [data])

  // アイテムの更新
  const updateItems = (newItems: string[]) => {
    setItems(newItems)
    onUpdate('items', newItems)
  }

  // アイテム追加
  const addItem = () => {
    const newItems = [...items, '']
    updateItems(newItems)
  }

  // アイテム削除
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    updateItems(newItems)
  }

  // アイテム内容変更
  const updateItemContent = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    updateItems(newItems)
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

    const newItems = [...items]
    const draggedContent = newItems[draggedItem]
    newItems.splice(draggedItem, 1)
    newItems.splice(dropIndex, 0, draggedContent)
    
    updateItems(newItems)
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  return (
    <div className="space-y-6">
      {/* 基本情報編集 */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <h3 className="font-semibold text-gray-800 mb-4">基本情報</h3>
        
        {/* タイトル */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            タイトル（{data?.title?.length || 0}/25文字）
          </label>
          <input
            type="text"
            value={data?.title || ''}
            onChange={(e) => onUpdate('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例：就活で知っておきたいポイント"
            maxLength={25}
          />
        </div>

        {/* サブタイトル */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            サブタイトル（{data?.subtitle?.length || 0}/40文字）
          </label>
          <input
            type="text"
            value={data?.subtitle || ''}
            onChange={(e) => onUpdate('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例：成功する就活のための基本知識"
            maxLength={40}
          />
        </div>

        {/* 説明文 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            説明文（{data?.content?.length || 0}/80文字）
          </label>
          <textarea
            value={data?.content || ''}
            onChange={(e) => onUpdate('content', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            placeholder="例：就活を成功させるために知っておくべきポイントをまとめました。"
            maxLength={80}
          />
        </div>
      </div>

      {/* アイテム編集セクション */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">項目リスト</h3>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
          >
            <Plus size={16} />
            項目追加
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>項目がありません</p>
            <p className="text-sm mt-1">「項目追加」ボタンで新しい項目を追加してください</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 p-3 border rounded-md transition-all duration-200 ${
                  draggedItem === index 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <GripVertical size={16} className="text-gray-400 cursor-move" />
                
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">
                    項目{index + 1}（{item.length}/20文字）
                  </div>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateItemContent(index, e.target.value)}
                    className="w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="例：自己分析の重要性"
                    maxLength={20}
                  />
                </div>

                <button
                  onClick={() => removeItem(index)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}