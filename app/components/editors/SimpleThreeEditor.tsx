// SimpleThreeEditor - 2カラム比較型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, ArrowLeftRight } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface SimpleThreeEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

interface TwoColumnItem {
  title: string
  content?: string
}

export function SimpleThreeEditor({ data, onUpdate }: SimpleThreeEditorProps) {
  const [leftColumn, setLeftColumn] = useState<TwoColumnItem[]>([])
  const [rightColumn, setRightColumn] = useState<TwoColumnItem[]>([])
  const [draggedItem, setDraggedItem] = useState<{ column: 'left' | 'right', index: number } | null>(null)

  // 初期データの設定
  useEffect(() => {
    if (data.twoColumn?.left && data.twoColumn?.right) {
      const leftItems = data.twoColumn.left.map(item => ({
        title: typeof item === 'string' ? item : item.title || '',
        content: typeof item === 'object' ? item.content : undefined
      }))
      const rightItems = data.twoColumn.right.map(item => ({
        title: typeof item === 'string' ? item : item.title || '',
        content: typeof item === 'object' ? item.content : undefined
      }))
      setLeftColumn(leftItems)
      setRightColumn(rightItems)
    } else {
      // デフォルトの2項目ずつ
      setLeftColumn([
        { title: 'NG：悪い例', content: '' },
        { title: '問題点', content: '' }
      ])
      setRightColumn([
        { title: 'OK：良い例', content: '' },
        { title: '改善点', content: '' }
      ])
    }
  }, [data])

  // データ更新
  const updateData = (newLeftColumn: TwoColumnItem[], newRightColumn: TwoColumnItem[]) => {
    setLeftColumn(newLeftColumn)
    setRightColumn(newRightColumn)
    
    const updatedData = {
      ...data,
      twoColumn: {
        left: newLeftColumn,
        right: newRightColumn
      }
    }
    onUpdate(updatedData)
  }

  // 項目追加
  const addItem = (column: 'left' | 'right') => {
    const currentColumn = column === 'left' ? leftColumn : rightColumn
    if (currentColumn.length >= 3) return // 最大3項目
    
    const newItem: TwoColumnItem = {
      title: column === 'left' ? 'NG項目' : 'OK項目',
      content: ''
    }
    
    if (column === 'left') {
      const newLeftColumn = [...leftColumn, newItem]
      updateData(newLeftColumn, rightColumn)
    } else {
      const newRightColumn = [...rightColumn, newItem]
      updateData(leftColumn, newRightColumn)
    }
  }

  // 項目削除
  const removeItem = (column: 'left' | 'right', index: number) => {
    const currentColumn = column === 'left' ? leftColumn : rightColumn
    if (currentColumn.length <= 1) return // 最小1項目
    
    if (column === 'left') {
      const newLeftColumn = leftColumn.filter((_, i) => i !== index)
      updateData(newLeftColumn, rightColumn)
    } else {
      const newRightColumn = rightColumn.filter((_, i) => i !== index)
      updateData(leftColumn, newRightColumn)
    }
  }

  // 項目編集
  const updateItem = (column: 'left' | 'right', index: number, field: 'title' | 'content', value: string) => {
    if (column === 'left') {
      const newLeftColumn = [...leftColumn]
      newLeftColumn[index] = { ...newLeftColumn[index], [field]: value }
      updateData(newLeftColumn, rightColumn)
    } else {
      const newRightColumn = [...rightColumn]
      newRightColumn[index] = { ...newRightColumn[index], [field]: value }
      updateData(leftColumn, newRightColumn)
    }
  }

  // ドラッグ&ドロップ（同じカラム内での並び替え）
  const handleDragStart = (e: React.DragEvent, column: 'left' | 'right', index: number) => {
    setDraggedItem({ column, index })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, column: 'left' | 'right', dropIndex: number) => {
    e.preventDefault()
    
    if (!draggedItem || draggedItem.column !== column) return
    
    const currentColumn = column === 'left' ? leftColumn : rightColumn
    const newColumn = [...currentColumn]
    const draggedItemValue = newColumn[draggedItem.index]
    
    // 要素を移動
    newColumn.splice(draggedItem.index, 1)
    newColumn.splice(dropIndex, 0, draggedItemValue)
    
    if (column === 'left') {
      updateData(newColumn, rightColumn)
    } else {
      updateData(leftColumn, newColumn)
    }
    
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const renderColumn = (column: 'left' | 'right', items: TwoColumnItem[], title: string, bgColor: string) => {
    return (
      <div className={`${bgColor} p-4 rounded-lg`}>
        <h4 className="font-semibold text-gray-800 mb-4 text-center">{title}</h4>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-3 bg-white ${
                draggedItem?.column === column && draggedItem?.index === index 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, column, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column, index)}
              onDragEnd={handleDragEnd}
            >
              <div className="flex items-start gap-2">
                {/* ドラッグハンドル */}
                <div className="mt-1 cursor-move text-gray-400 hover:text-gray-600">
                  <GripVertical className="w-4 h-4" />
                </div>

                {/* 編集フィールド */}
                <div className="flex-1 space-y-2">
                  {/* タイトル編集 */}
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem(column, index, 'title', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="項目タイトル"
                    maxLength={20}
                  />
                  <div className="text-xs text-gray-500">
                    {item.title.length}/20文字
                  </div>

                  {/* コンテンツ編集 */}
                  <textarea
                    value={item.content || ''}
                    onChange={(e) => updateItem(column, index, 'content', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                    placeholder="詳細説明（任意）"
                    rows={2}
                    maxLength={50}
                  />
                  <div className="text-xs text-gray-500">
                    {(item.content || '').length}/50文字
                  </div>
                </div>

                {/* 削除ボタン */}
                <button
                  onClick={() => removeItem(column, index)}
                  disabled={items.length <= 1}
                  className={`flex-shrink-0 p-1 rounded transition-colors ${
                    items.length <= 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-red-500 hover:bg-red-50'
                  }`}
                  title="項目を削除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* 項目追加ボタン */}
          <button
            onClick={() => addItem(column)}
            disabled={items.length >= 3}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg border-2 border-dashed transition-colors ${
              items.length >= 3
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-gray-400 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Plus className="w-4 h-4" />
            追加 ({items.length}/3)
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          2カラム比較編集 - SimpleThreeTemplate
        </h3>
        <p className="text-sm text-blue-600">
          2カラム表示で比較・対比を表現するテンプレート。左右の項目を自由に編集できます。
        </p>
        <div className="mt-2 text-xs text-blue-500">
          制限: 各カラム最大3項目・最小1項目 | タイトル20文字・内容50文字
        </div>
      </div>

      {/* 2カラム編集エリア */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderColumn('left', leftColumn, '左カラム（NG・問題点）', 'bg-red-50 border-2 border-red-200')}
        {renderColumn('right', rightColumn, '右カラム（OK・改善点）', 'bg-green-50 border-2 border-green-200')}
      </div>

      {/* 2カラム切り替えボタン */}
      <div className="flex justify-center">
        <button
          onClick={() => updateData(rightColumn, leftColumn)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <ArrowLeftRight className="w-4 h-4" />
          左右を入れ替え
        </button>
      </div>

      {/* プレビュー情報 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">プレビュー情報</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 左カラム: {leftColumn.length}項目, 右カラム: {rightColumn.length}項目</p>
          <p>• 各項目は「タイトル + 詳細説明」で表示されます</p>
          <p>• 左カラムは赤枠、右カラムは緑枠で表示されます</p>
          <p>• タイトルに「：」が含まれる場合、前半がラベル、後半がタイトルとして表示されます</p>
        </div>
      </div>
    </div>
  )
}