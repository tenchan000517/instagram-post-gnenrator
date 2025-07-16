/**
 * TwoColumnSectionItemsTemplate専用エディタ
 * 2カラムセクション+アイテム型の編集機能（2つのセクション、それぞれにアイテム）
 */

import React, { useState, useEffect } from 'react'
import { Trash2, Plus, GripVertical, ArrowLeft, ArrowRight } from 'lucide-react'

interface TwoColumnSectionItemsEditorProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onDataUpdate: (newData: any) => void
}

interface SectionData {
  title: string
  content: string
  items: string[]
}

export const TwoColumnSectionItemsEditor: React.FC<TwoColumnSectionItemsEditorProps> = ({
  data,
  onUpdate,
  onDataUpdate
}) => {
  const [leftSection, setLeftSection] = useState<SectionData>({
    title: '',
    content: '',
    items: []
  })
  const [rightSection, setRightSection] = useState<SectionData>({
    title: '',
    content: '',
    items: []
  })
  const [draggedItem, setDraggedItem] = useState<{section: 'left' | 'right', index: number} | null>(null)

  // データからセクション情報を抽出
  useEffect(() => {
    if (data?.sections && data.sections.length >= 2) {
      const leftData = data.sections[0]
      const rightData = data.sections[1]
      
      setLeftSection({
        title: leftData.title || '',
        content: leftData.content || '',
        items: leftData.items ? leftData.items.map((item: any) => 
          typeof item === 'string' ? item : item.content || item.title || ''
        ) : []
      })
      
      setRightSection({
        title: rightData.title || '',
        content: rightData.content || '',
        items: rightData.items ? rightData.items.map((item: any) => 
          typeof item === 'string' ? item : item.content || item.title || ''
        ) : []
      })
    } else {
      setLeftSection({ title: '', content: '', items: [] })
      setRightSection({ title: '', content: '', items: [] })
    }
  }, [data])

  // セクションの更新
  const updateSections = (newLeft: SectionData, newRight: SectionData) => {
    const newSections = [
      {
        title: newLeft.title,
        content: newLeft.content,
        items: newLeft.items.filter(item => item.trim() !== '')
      },
      {
        title: newRight.title,
        content: newRight.content,
        items: newRight.items.filter(item => item.trim() !== '')
      }
    ]
    
    onUpdate('sections', newSections)
  }

  // 左セクションの更新
  const updateLeftSection = (field: string, value: any) => {
    const newLeft = { ...leftSection, [field]: value }
    setLeftSection(newLeft)
    updateSections(newLeft, rightSection)
  }

  // 右セクションの更新
  const updateRightSection = (field: string, value: any) => {
    const newRight = { ...rightSection, [field]: value }
    setRightSection(newRight)
    updateSections(leftSection, newRight)
  }

  // アイテム追加
  const addItem = (section: 'left' | 'right') => {
    if (section === 'left') {
      const newItems = [...leftSection.items, '']
      updateLeftSection('items', newItems)
    } else {
      const newItems = [...rightSection.items, '']
      updateRightSection('items', newItems)
    }
  }

  // アイテム削除
  const removeItem = (section: 'left' | 'right', index: number) => {
    if (section === 'left') {
      const newItems = leftSection.items.filter((_, i) => i !== index)
      updateLeftSection('items', newItems)
    } else {
      const newItems = rightSection.items.filter((_, i) => i !== index)
      updateRightSection('items', newItems)
    }
  }

  // アイテム内容変更
  const updateItemContent = (section: 'left' | 'right', index: number, value: string) => {
    if (section === 'left') {
      const newItems = [...leftSection.items]
      newItems[index] = value
      updateLeftSection('items', newItems)
    } else {
      const newItems = [...rightSection.items]
      newItems[index] = value
      updateRightSection('items', newItems)
    }
  }

  // ドラッグ&ドロップ
  const handleDragStart = (e: React.DragEvent, section: 'left' | 'right', index: number) => {
    setDraggedItem({ section, index })
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetSection: 'left' | 'right', dropIndex: number) => {
    e.preventDefault()
    if (!draggedItem) return

    const sourceSection = draggedItem.section
    const sourceIndex = draggedItem.index

    if (sourceSection === 'left') {
      const newItems = [...leftSection.items]
      const draggedContent = newItems[sourceIndex]
      newItems.splice(sourceIndex, 1)
      
      if (targetSection === 'left') {
        newItems.splice(dropIndex, 0, draggedContent)
        updateLeftSection('items', newItems)
      } else {
        updateLeftSection('items', newItems)
        const newRightItems = [...rightSection.items]
        newRightItems.splice(dropIndex, 0, draggedContent)
        updateRightSection('items', newRightItems)
      }
    } else {
      const newItems = [...rightSection.items]
      const draggedContent = newItems[sourceIndex]
      newItems.splice(sourceIndex, 1)
      
      if (targetSection === 'right') {
        newItems.splice(dropIndex, 0, draggedContent)
        updateRightSection('items', newItems)
      } else {
        updateRightSection('items', newItems)
        const newLeftItems = [...leftSection.items]
        newLeftItems.splice(dropIndex, 0, draggedContent)
        updateLeftSection('items', newLeftItems)
      }
    }
    
    setDraggedItem(null)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const renderSectionEditor = (section: SectionData, sectionType: 'left' | 'right', updateFunc: (field: string, value: any) => void) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex items-center gap-2 mb-4">
        {sectionType === 'left' ? <ArrowLeft className="w-5 h-5 text-blue-600" /> : <ArrowRight className="w-5 h-5 text-blue-600" />}
        <h3 className="font-semibold text-gray-800">{sectionType === 'left' ? '左' : '右'}セクション</h3>
      </div>
      
      {/* セクションタイトル */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          タイトル（{section.title.length}/20文字）
        </label>
        <input
          type="text"
          value={section.title}
          onChange={(e) => updateFunc('title', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="例：事前準備"
          maxLength={20}
        />
      </div>

      {/* セクションコンテンツ */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          内容（{section.content.length}/60文字）
        </label>
        <textarea
          value={section.content}
          onChange={(e) => updateFunc('content', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-16 resize-none text-sm"
          placeholder="例：プレゼンテーション前の準備について"
          maxLength={60}
        />
      </div>

      {/* アイテム */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            アイテム
          </label>
          <button
            onClick={() => addItem(sectionType)}
            className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs"
          >
            <Plus size={12} />
            追加
          </button>
        </div>

        {section.items.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            アイテムがありません
          </div>
        ) : (
          <div className="space-y-2">
            {section.items.map((item, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, sectionType, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, sectionType, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-2 p-2 border rounded-md transition-all duration-200 ${
                  draggedItem?.section === sectionType && draggedItem?.index === index
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <GripVertical size={12} className="text-gray-400 cursor-move" />
                
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateItemContent(sectionType, index, e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="アイテム内容"
                  maxLength={30}
                />

                <button
                  onClick={() => removeItem(sectionType, index)}
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

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
            placeholder="例：効果的なプレゼンテーション"
            maxLength={25}
          />
        </div>

        {/* バッジテキスト */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            バッジテキスト
          </label>
          <input
            type="text"
            value={data?.badgeText || ''}
            onChange={(e) => onUpdate('badgeText', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例：アクション"
            maxLength={20}
          />
        </div>

        {/* メイン説明文 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            メイン説明文（{data?.content?.length || 0}/80文字）
          </label>
          <textarea
            value={data?.content || ''}
            onChange={(e) => onUpdate('content', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            placeholder="例：成功するプレゼンテーションには準備と実行の両方が重要です。"
            maxLength={80}
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
            placeholder="例：準備と実行の両方が大切"
            maxLength={40}
          />
        </div>
      </div>

      {/* 2カラムセクション編集 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderSectionEditor(leftSection, 'left', updateLeftSection)}
        {renderSectionEditor(rightSection, 'right', updateRightSection)}
      </div>
    </div>
  )
}