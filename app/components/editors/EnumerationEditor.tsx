// EnumerationEditor - 列挙型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Hash } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface EnumerationEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

export function EnumerationEditor({ data, onUpdate }: EnumerationEditorProps) {
  const [items, setItems] = useState<string[]>([])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // 初期データの設定
  useEffect(() => {
    if (data.items && data.items.length > 0) {
      const itemStrings = data.items.map(item => 
        typeof item === 'string' ? item : item.title || item.content || String(item)
      )
      setItems(itemStrings)
    } else {
      // デフォルトの3項目
      setItems([
        '1つ目のポイント',
        '2つ目のポイント',
        '3つ目のポイント'
      ])
    }
  }, [data])

  // データ更新
  const updateData = (newItems: string[]) => {
    setItems(newItems)
    
    const updatedData = {
      ...data,
      items: newItems
    }
    onUpdate(updatedData)
  }

  // 項目追加
  const addItem = () => {
    if (items.length >= 9) return // 最大9項目
    
    const newItem = `${items.length + 1}つ目のポイント`
    const newItems = [...items, newItem]
    updateData(newItems)
  }

  // 項目削除
  const removeItem = (index: number) => {
    if (items.length <= 1) return // 最小1項目
    
    const newItems = items.filter((_, i) => i !== index)
    updateData(newItems)
  }

  // 項目編集
  const updateItem = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    updateData(newItems)
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
    const draggedItemValue = newItems[draggedItem]
    
    // 要素を移動
    newItems.splice(draggedItem, 1)
    newItems.splice(dropIndex, 0, draggedItemValue)
    
    updateData(newItems)
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          列挙型編集 - EnumerationTemplate
        </h3>
        <p className="text-sm text-blue-600">
          番号付きリストで順序や優先度を表現するテンプレート。各項目にポイントを入力できます。
        </p>
        <div className="mt-2 text-xs text-blue-500">
          制限: 最大9項目・最小1項目 | 各項目30文字まで
        </div>
      </div>

      {/* 項目リスト */}
      <div className="space-y-4">
        {items.map((item, index) => (
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

              {/* 番号表示 */}
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                {index + 1}
              </div>

              {/* 項目編集フィールド */}
              <div className="flex-1">
                <textarea
                  value={item}
                  onChange={(e) => updateItem(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder={`${index + 1}つ目のポイントを入力`}
                  rows={2}
                  maxLength={30}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {item.length}/30文字
                </div>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => removeItem(index)}
                disabled={items.length <= 1}
                className={`flex-shrink-0 p-2 rounded-full transition-colors ${
                  items.length <= 1
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
          disabled={items.length >= 9}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors ${
            items.length >= 9
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-blue-300 text-blue-600 hover:bg-blue-50'
          }`}
        >
          <Plus className="w-5 h-5" />
          項目を追加 ({items.length}/9)
        </button>
      </div>

      {/* プレビュー情報 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">プレビュー情報</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 現在の項目数: {items.length}</p>
          <p>• 各項目は「番号 + 内容」で表示されます</p>
          <p>• ドラッグ&ドロップで順序を変更できます</p>
          <p>• 番号は自動で振り直されます</p>
        </div>
      </div>
    </div>
  )
}