/**
 * ChecklistEnhancedTemplate専用エディタ
 * checklistItems配列の動的編集機能を提供
 */

import React, { useState, useEffect } from 'react'
import { CheckSquare, Plus, Trash2, GripVertical } from 'lucide-react'

interface ChecklistEnhancedEditorProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onDataUpdate: (newData: any) => void
}

interface ChecklistItem {
  text: string
  description: string
  checked?: boolean
  index: number
}

export const ChecklistEnhancedEditor: React.FC<ChecklistEnhancedEditorProps> = ({
  data,
  onUpdate,
  onDataUpdate
}) => {
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // データからchecklistItemsを抽出
  useEffect(() => {
    const checklistItems = data.checklistItems || []
    const extractedItems: ChecklistItem[] = checklistItems.map((item: any, index: number) => ({
      text: item.text || '',
      description: item.description || '',
      checked: item.checked || false,
      index: index + 1
    }))

    // 最低1つのアイテムを保証
    if (extractedItems.length === 0) {
      extractedItems.push({
        text: '',
        description: '',
        checked: false,
        index: 1
      })
    }

    setItems(extractedItems)
  }, [data])

  // アイテムデータの更新
  const updateItems = (newItems: ChecklistItem[]) => {
    setItems(newItems)
    
    // データを更新
    const updatedData = {
      ...data,
      checklistItems: newItems.map(item => ({
        text: item.text,
        description: item.description,
        checked: item.checked || false
      }))
    }
    
    onDataUpdate(updatedData)
  }

  // アイテムの追加
  const addItem = () => {
    if (items.length >= 8) return // 最大8個まで
    
    const newItem: ChecklistItem = {
      text: '',
      description: '',
      checked: false,
      index: items.length + 1
    }
    
    const newItems = [...items, newItem]
    updateItems(newItems)
  }

  // アイテムの削除
  const removeItem = (index: number) => {
    if (items.length <= 1) return // 最低1つは残す
    
    const newItems = items.filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, index: i + 1 }))
    
    updateItems(newItems)
  }

  // アイテムの更新
  const updateItem = (index: number, field: 'text' | 'description', value: string) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value }
      }
      return item
    })
    
    updateItems(newItems)
  }

  // ドラッグ&ドロップ処理
  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedItem === null) return
    
    const newItems = [...items]
    const draggedItemData = newItems[draggedItem]
    
    // アイテムを移動
    newItems.splice(draggedItem, 1)
    newItems.splice(dropIndex, 0, draggedItemData)
    
    // インデックスを再設定
    const reindexedItems = newItems.map((item, i) => ({ ...item, index: i + 1 }))
    
    updateItems(reindexedItems)
    setDraggedItem(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">チェックリスト編集</h3>
        <button
          onClick={addItem}
          disabled={items.length >= 8}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          <Plus className="w-4 h-4" />
          追加
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              {/* ドラッグハンドル */}
              <div className="flex-shrink-0 mt-2 cursor-move">
                <GripVertical className="w-5 h-5 text-gray-400" />
              </div>

              {/* チェックボックスアイコン */}
              <div className="flex-shrink-0 mt-2">
                <CheckSquare className="w-6 h-6 text-green-600" />
              </div>

              {/* 編集フィールド */}
              <div className="flex-1 space-y-3">
                {/* チェックリスト項目名 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    項目名 {index === 0 && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateItem(index, 'text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="チェックリスト項目を入力"
                    maxLength={60}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {item.text.length} / 60 文字
                  </div>
                </div>

                {/* 詳細説明 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    詳細説明
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="詳細説明を入力（任意）"
                    maxLength={500}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {item.description.length} / 500 文字
                  </div>
                </div>
              </div>

              {/* 削除ボタン */}
              <div className="flex-shrink-0 mt-2">
                <button
                  onClick={() => removeItem(index)}
                  disabled={items.length <= 1}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  title="削除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 制限情報 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="text-sm text-blue-800">
          <p><strong>制限:</strong> 最大8個、最小1個</p>
          <p><strong>文字数:</strong> 項目名60文字、説明500文字</p>
          <p><strong>操作:</strong> ドラッグ&ドロップで順序変更可能</p>
        </div>
      </div>
    </div>
  )
}