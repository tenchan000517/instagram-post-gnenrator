// SectionItemsEditor - セクション+アイテム型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, ArrowRight, CheckCircle } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface SectionItemsEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

interface SectionItem {
  title: string
  content: string
  items: string[]
}

export function SectionItemsEditor({ data, onUpdate }: SectionItemsEditorProps) {
  const [section, setSection] = useState<SectionItem>({
    title: '',
    content: '',
    items: []
  })
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // 初期データの設定
  useEffect(() => {
    if (data.sections && data.sections.length > 0) {
      const sectionData = data.sections[0]
      setSection({
        title: sectionData.title || '',
        content: sectionData.content || '',
        items: sectionData.items || []
      })
    } else if (data.points && data.points.length > 0) {
      // pointsデータからの変換
      const pointData = data.points[0]
      setSection({
        title: pointData.title || '',
        content: pointData.description || '',
        items: data.actionItems || []
      })
    } else {
      // デフォルトの3項目
      setSection({
        title: 'メインセクション',
        content: 'このセクションの詳細説明',
        items: [
          'アクション項目1',
          'アクション項目2',
          'アクション項目3'
        ]
      })
    }
  }, [data])

  // データ更新
  const updateData = (newSection: SectionItem) => {
    setSection(newSection)
    
    const updatedData = {
      ...data,
      sections: [newSection]
    }
    onUpdate(updatedData)
  }

  // セクション情報編集
  const updateSection = (field: 'title' | 'content', value: string) => {
    const newSection = { ...section, [field]: value }
    updateData(newSection)
  }

  // アイテム追加
  const addItem = () => {
    if (section.items.length >= 7) return // 最大7項目
    
    const newItem = `アクション項目${section.items.length + 1}`
    const newSection = {
      ...section,
      items: [...section.items, newItem]
    }
    updateData(newSection)
  }

  // アイテム削除
  const removeItem = (index: number) => {
    if (section.items.length <= 1) return // 最小1項目
    
    const newSection = {
      ...section,
      items: section.items.filter((_, i) => i !== index)
    }
    updateData(newSection)
  }

  // アイテム編集
  const updateItem = (index: number, value: string) => {
    const newItems = [...section.items]
    newItems[index] = value
    const newSection = { ...section, items: newItems }
    updateData(newSection)
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
    
    const newItems = [...section.items]
    const draggedItemValue = newItems[draggedItem]
    
    // 要素を移動
    newItems.splice(draggedItem, 1)
    newItems.splice(dropIndex, 0, draggedItemValue)
    
    const newSection = { ...section, items: newItems }
    updateData(newSection)
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
          セクション+アイテム編集 - SectionItemsTemplate
        </h3>
        <p className="text-sm text-blue-600">
          1つのメインセクションと複数のアクション項目を編集できます。アクションリストや実践ガイドに最適です。
        </p>
        <div className="mt-2 text-xs text-blue-500">
          制限: セクション1個・アイテム最大7個最小1個 | セクションタイトル25文字・内容120文字・項目40文字
        </div>
      </div>

      {/* セクション編集 */}
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <ArrowRight className="w-5 h-5" />
          メインセクション
        </h4>
        
        <div className="space-y-4">
          {/* セクションタイトル */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              セクションタイトル
            </label>
            <input
              type="text"
              value={section.title}
              onChange={(e) => updateSection('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="セクションタイトルを入力"
              maxLength={25}
            />
            <div className="text-xs text-gray-500 mt-1">
              {section.title.length}/25文字
            </div>
          </div>

          {/* セクション内容 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              セクション内容
            </label>
            <textarea
              value={section.content}
              onChange={(e) => updateSection('content', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="セクションの詳細説明を入力"
              rows={3}
              maxLength={120}
            />
            <div className="text-xs text-gray-500 mt-1">
              {section.content.length}/120文字
            </div>
          </div>
        </div>
      </div>

      {/* アイテムリスト編集 */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          アクションアイテム
        </h4>
        
        {section.items.map((item, index) => (
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

              {/* チェックアイコン */}
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>

              {/* アイテム編集フィールド */}
              <div className="flex-1">
                <textarea
                  value={item}
                  onChange={(e) => updateItem(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="アクション項目を入力"
                  rows={2}
                  maxLength={40}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {item.length}/40文字
                </div>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => removeItem(index)}
                disabled={section.items.length <= 1}
                className={`flex-shrink-0 p-2 rounded-full transition-colors ${
                  section.items.length <= 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-red-500 hover:bg-red-50'
                }`}
                title="アイテムを削除"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* アイテム追加ボタン */}
      <div className="flex justify-center">
        <button
          onClick={addItem}
          disabled={section.items.length >= 7}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors ${
            section.items.length >= 7
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-blue-300 text-blue-600 hover:bg-blue-50'
          }`}
        >
          <Plus className="w-5 h-5" />
          アイテムを追加 ({section.items.length}/7)
        </button>
      </div>

      {/* プレビュー情報 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">プレビュー情報</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• セクション: {section.title}</p>
          <p>• アイテム数: {section.items.length}</p>
          <p>• セクションは青色のボックスで表示されます</p>
          <p>• アイテムはチェックアイコン付きで表示されます</p>
          <p>• ドラッグ&ドロップで項目の順序を変更できます</p>
        </div>
      </div>
    </div>
  )
}