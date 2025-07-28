// MultipleItemsDisplayEditor - 複数アイテム表示型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface Item {
  name?: string
  title?: string
  text?: string
  description: string
  imageSrc?: string
}

interface MultipleItemsDisplayEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

export function MultipleItemsDisplayEditor({ data, onUpdate }: MultipleItemsDisplayEditorProps) {
  const [title, setTitle] = useState<string>('')
  const [subtitle, setSubtitle] = useState<string>('')
  const [items, setItems] = useState<Item[]>([])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // 初期データの設定
  useEffect(() => {
    setTitle(data.title || '')
    setSubtitle(data.subtitle || '')
    
    // アイテムの取得（items, examples, methods, toolsのいずれか）
    // 空配列を考慮して、長さが0より大きいものを探す
    const dataItems = [(data as any).items, (data as any).examples, 
                      (data as any).methods, (data as any).tools]
                      .find(arr => arr && arr.length > 0) || []
    
    if (dataItems.length > 0) {
      setItems(dataItems)
    } else {
      // デフォルトアイテム（3個）
      setItems([
        { name: 'アイテム1', description: '説明文1', imageSrc: '' },
        { name: 'アイテム2', description: '説明文2', imageSrc: '' },
        { name: 'アイテム3', description: '説明文3', imageSrc: '' }
      ])
    }
  }, [data])

  // データ更新
  const updateData = (newTitle: string, newSubtitle: string, newItems: Item[]) => {
    // 元のフィールド名を保持（items/examples/methods/tools）
    // 配列が存在するフィールドを特定
    const fieldName = 
      ((data as any).items && Array.isArray((data as any).items)) ? 'items' : 
      ((data as any).examples && Array.isArray((data as any).examples)) ? 'examples' :
      ((data as any).methods && Array.isArray((data as any).methods)) ? 'methods' : 
      ((data as any).tools && Array.isArray((data as any).tools)) ? 'tools' : 'items'
    
    const updatedData = {
      ...data,
      title: newTitle,
      subtitle: newSubtitle,
      [fieldName]: newItems
    }
    onUpdate(updatedData)
  }

  // アイテムの追加（最大5個）
  const addItem = () => {
    if (items.length >= 5) {
      alert('アイテムは最大5個までです')
      return
    }
    const newItems = [...items, { 
      name: `新しいアイテム${items.length + 1}`, 
      description: '説明文を入力してください',
      imageSrc: ''
    }]
    setItems(newItems)
    updateData(title, subtitle, newItems)
  }

  // アイテムの削除（最小2個）
  const removeItem = (index: number) => {
    if (items.length <= 2) {
      alert('アイテムは最小2個必要です')
      return
    }
    const newItems = items.filter((_, i) => i !== index)
    setItems(newItems)
    updateData(title, subtitle, newItems)
  }

  // アイテムの更新
  const updateItem = (index: number, field: keyof Item, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
    updateData(title, subtitle, newItems)
  }

  // ドラッグ&ドロップのハンドラー
  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (index: number) => {
    if (draggedItem === null) return
    
    const newItems = [...items]
    const draggedContent = newItems[draggedItem]
    newItems.splice(draggedItem, 1)
    newItems.splice(index, 0, draggedContent)
    
    setItems(newItems)
    updateData(title, subtitle, newItems)
    setDraggedItem(null)
  }

  // レイアウト表示
  const getLayoutDescription = (count: number) => {
    switch (count) {
      case 2: return '横並び2カラム'
      case 3: return 'ピラミッド型（1個上・2個下）'
      case 4: return '2x2グリッド'
      case 5: return '1+2+2配置'
      default: return ''
    }
  }

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800">複数アイテム表示編集</h3>
      
      {/* タイトル編集 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          タイトル
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            updateData(e.target.value, subtitle, items)
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例: 文章作成が劇的に変わる！AIツール3選"
        />
      </div>

      {/* サブタイトル編集 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          サブタイトル（オプション）
        </label>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => {
            setSubtitle(e.target.value)
            updateData(title, e.target.value, items)
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例: 15個の神ツール紹介シリーズ：第2弾"
        />
      </div>

      {/* レイアウト情報 */}
      <div className="p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          <strong>現在のレイアウト:</strong> {getLayoutDescription(items.length)}
        </p>
      </div>

      {/* アイテムリスト編集 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          アイテムリスト（{items.length}個 / 最小2個・最大5個）
        </label>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className="bg-white p-3 rounded border border-gray-200"
            >
              <div className="flex items-start space-x-2">
                <GripVertical className="w-4 h-4 text-gray-400 cursor-move mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={item.name || item.title || item.text || ''}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="名前/タイトル"
                    />
                    <button
                      onClick={() => removeItem(index)}
                      className="p-1 text-red-500 hover:text-red-700"
                      disabled={items.length <= 2}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={2}
                    placeholder="説明文"
                  />
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={item.imageSrc || ''}
                      onChange={(e) => updateItem(index, 'imageSrc', e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      placeholder="画像パス（オプション）例: /imag/ai/ChatGPT-Logo.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length < 5 && (
          <button
            onClick={addItem}
            className="mt-2 flex items-center space-x-1 text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-4 h-4" />
            <span>アイテムを追加</span>
          </button>
        )}
      </div>

      {/* レイアウトプレビュー */}
      <div className="mt-4 p-3 bg-gray-100 rounded-md">
        <p className="text-sm font-medium text-gray-700 mb-2">レイアウトプレビュー:</p>
        <div className="text-xs text-gray-600 space-y-1">
          {items.length === 2 && <div>[ 1 ] [ 2 ]</div>}
          {items.length === 3 && (
            <>
              <div className="text-center">[ 1 ]</div>
              <div className="text-center">[ 2 ] [ 3 ]</div>
            </>
          )}
          {items.length === 4 && (
            <>
              <div>[ 1 ] [ 2 ]</div>
              <div>[ 3 ] [ 4 ]</div>
            </>
          )}
          {items.length === 5 && (
            <>
              <div className="text-center">[ 1 ]</div>
              <div className="text-center">[ 2 ] [ 3 ]</div>
              <div className="text-center">[ 4 ] [ 5 ]</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}