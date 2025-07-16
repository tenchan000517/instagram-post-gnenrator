/**
 * ItemNTitleContentTemplate専用エディタ
 * 動的なitem1Title, item1Content等のフィールドを編集
 */

import React, { useState, useEffect } from 'react'
import { Trash2, Plus, GripVertical } from 'lucide-react'
import { DynamicFieldDetector, DynamicField } from '../../services/dynamicFieldDetector'

interface ItemNTitleContentEditorProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onDataUpdate: (newData: any) => void
}

interface ItemData {
  index: number
  title: string
  content: string
}

export const ItemNTitleContentEditor: React.FC<ItemNTitleContentEditorProps> = ({
  data,
  onUpdate,
  onDataUpdate
}) => {
  const [items, setItems] = useState<ItemData[]>([])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // データからアイテムを抽出
  useEffect(() => {
    const extractedItems: ItemData[] = []
    const itemPattern = /^item(\d+)(Title|Content)$/
    const itemMap = new Map<number, { title?: string; content?: string }>()

    // データからアイテムを検出
    Object.keys(data || {}).forEach(key => {
      const match = key.match(itemPattern)
      if (match) {
        const index = parseInt(match[1])
        const type = match[2]
        
        if (!itemMap.has(index)) {
          itemMap.set(index, {})
        }
        
        const item = itemMap.get(index)!
        if (type === 'Title') {
          item.title = data[key] || ''
        } else {
          item.content = data[key] || ''
        }
      }
    })

    // マップからアイテム配列を生成
    itemMap.forEach((item, index) => {
      extractedItems.push({
        index,
        title: item.title || '',
        content: item.content || ''
      })
    })

    // インデックスでソート
    extractedItems.sort((a, b) => a.index - b.index)

    // 最低1つのアイテムを確保
    if (extractedItems.length === 0) {
      extractedItems.push({ index: 1, title: '', content: '' })
    }

    setItems(extractedItems)
  }, [data])

  // アイテムの更新
  const updateItem = (index: number, field: 'title' | 'content', value: string) => {
    const fieldName = `item${index}${field === 'title' ? 'Title' : 'Content'}`
    onUpdate(fieldName, value)
  }

  // アイテムの追加
  const addItem = () => {
    if (items.length >= 6) {
      alert('アイテムは最大6個までです')
      return
    }

    const newData = DynamicFieldDetector.addDynamicField('item-n-title-content', data, 'item{n}')
    onDataUpdate(newData)
  }

  // アイテムの削除
  const removeItem = (index: number) => {
    if (items.length <= 1) {
      alert('最低1つのアイテムが必要です')
      return
    }

    const newData = DynamicFieldDetector.removeDynamicField('item-n-title-content', data, 'item{n}', index)
    onDataUpdate(newData)
  }

  // ドラッグ&ドロップ処理
  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    if (draggedItem === null || draggedItem === targetIndex) return

    // アイテムの順序を入れ替え
    const newData = { ...data }
    const draggedItemData = {
      title: data[`item${draggedItem}Title`] || '',
      content: data[`item${draggedItem}Content`] || ''
    }
    const targetItemData = {
      title: data[`item${targetIndex}Title`] || '',
      content: data[`item${targetIndex}Content`] || ''
    }

    // データを入れ替え
    newData[`item${draggedItem}Title`] = targetItemData.title
    newData[`item${draggedItem}Content`] = targetItemData.content
    newData[`item${targetIndex}Title`] = draggedItemData.title
    newData[`item${targetIndex}Content`] = draggedItemData.content

    onDataUpdate(newData)
    setDraggedItem(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">独立ボックス編集</h3>
        <button
          onClick={addItem}
          disabled={items.length >= 6}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
          アイテム追加
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.index}
            draggable
            onDragStart={() => handleDragStart(item.index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item.index)}
            className={`bg-white rounded-lg border-2 p-4 transition-all ${
              draggedItem === item.index
                ? 'border-blue-400 opacity-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2 mt-2">
                <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-600">
                  {item.index}
                </span>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    タイトル
                    {item.index === 1 && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type="text"
                    value={data[`item${item.index}Title`] || ''}
                    onChange={(e) => updateItem(item.index, 'title', e.target.value)}
                    placeholder={`アイテム${item.index}のタイトル`}
                    maxLength={50}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {(data[`item${item.index}Title`] || '').length}/50文字
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    内容
                    {item.index === 1 && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <textarea
                    value={data[`item${item.index}Content`] || ''}
                    onChange={(e) => updateItem(item.index, 'content', e.target.value)}
                    placeholder={`アイテム${item.index}の内容`}
                    maxLength={200}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {(data[`item${item.index}Content`] || '').length}/200文字
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.index)}
                disabled={items.length <= 1}
                className="mt-2 p-2 text-red-500 hover:bg-red-50 rounded-md disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                title={items.length <= 1 ? '最低1つのアイテムが必要です' : 'アイテムを削除'}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length >= 6 && (
        <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
          アイテムは最大6個までです
        </p>
      )}
    </div>
  )
}