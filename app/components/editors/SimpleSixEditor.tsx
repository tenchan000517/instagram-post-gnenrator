// SimpleSixEditor - シンプル型6コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Grid3x3 } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface SimpleSixEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

export function SimpleSixEditor({ data, onUpdate }: SimpleSixEditorProps) {
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
      // デフォルトの6項目
      setItems([
        '重要項目1',
        '重要項目2',
        '重要項目3',
        '重要項目4',
        '重要項目5',
        '重要項目6'
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
    if (items.length >= 8) return // 最大8項目
    
    const newItem = `重要項目${items.length + 1}`
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

  // 項目をペアで表示（2カラム用）
  const getItemPairs = () => {
    const pairs = []
    for (let i = 0; i < items.length; i += 2) {
      pairs.push([items[i], items[i + 1]].filter(Boolean))
    }
    return pairs
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          コンパクト編集 - SimpleSixTemplate
        </h3>
        <p className="text-sm text-blue-600">
          2カラムレイアウトでコンパクトに表示する項目リスト。各項目は番号付きで表示されます。
        </p>
        <div className="mt-2 text-xs text-blue-500">
          制限: 最大8項目・最小1項目 | 各項目35文字まで
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

              {/* 項目番号 */}
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>

              {/* 項目編集フィールド */}
              <div className="flex-1">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItem(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`項目${index + 1}を入力`}
                  maxLength={35}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {item.length}/35文字
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
          disabled={items.length >= 8}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors ${
            items.length >= 8
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-blue-300 text-blue-600 hover:bg-blue-50'
          }`}
        >
          <Plus className="w-5 h-5" />
          項目を追加 ({items.length}/8)
        </button>
      </div>

      {/* 2カラムプレビュー */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Grid3x3 className="w-5 h-5" />
          2カラムプレビュー
        </h4>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-800">
                    {item || `項目${index + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* プレビュー情報 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">プレビュー情報</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 現在の項目数: {items.length}</p>
          <p>• 2カラムレイアウトで表示されます</p>
          <p>• 各項目に番号付きアイコンが表示されます</p>
          <p>• コンパクトなレイアウトでスペースを効率使用</p>
          <p>• ドラッグ&ドロップで順序を変更できます</p>
        </div>
      </div>
    </div>
  )
}