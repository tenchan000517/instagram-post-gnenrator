// SectionBlocksEditor - section-blocks型テンプレート編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Image, RotateCcw, AlignLeft, List } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface SectionBlocksEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

interface SectionBlock {
  name: string
  content: string | string[]
  image?: string
  footerText?: string
}

interface SectionBlocksData {
  title: string
  sections: SectionBlock[]
  characterImage?: string
  characterPosition?: 'left' | 'right'
  bottomSectionName?: string
  bottomSectionContent?: string
}

export function SectionBlocksEditor({ data, onUpdate }: SectionBlocksEditorProps) {
  const [sectionData, setSectionData] = useState<SectionBlocksData>({
    title: '',
    sections: [],
    characterImage: '/king_point.png',
    characterPosition: 'left',
    bottomSectionName: '',
    bottomSectionContent: ''
  })
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // 初期データの設定
  useEffect(() => {
    if (data && data.title) {
      setSectionData({
        title: data.title || '',
        sections: data.sections || [
          {
            name: 'セクション1',
            content: 'セクション内容',
            footerText: 'フッターテキスト'
          }
        ],
        characterImage: data.characterImage || '/king_point.png',
        characterPosition: data.characterPosition || 'left',
        bottomSectionName: data.bottomSectionName || '',
        bottomSectionContent: data.bottomSectionContent || ''
      })
    }
  }, [data])

  // データ更新の送信
  const updateData = (newData: SectionBlocksData) => {
    setSectionData(newData)
    onUpdate(newData)
  }

  // セクション追加
  const addSection = () => {
    const newData = {
      ...sectionData,
      sections: [
        ...sectionData.sections,
        {
          name: `セクション${sectionData.sections.length + 1}`,
          content: 'セクション内容',
          footerText: 'フッターテキスト'
        }
      ]
    }
    updateData(newData)
  }

  // セクション削除
  const removeSection = (index: number) => {
    const newData = {
      ...sectionData,
      sections: sectionData.sections.filter((_, i) => i !== index)
    }
    updateData(newData)
  }

  // セクション更新
  const updateSection = (index: number, field: keyof SectionBlock, value: string | string[]) => {
    const newSections = [...sectionData.sections]
    newSections[index] = { ...newSections[index], [field]: value }
    const newData = { ...sectionData, sections: newSections }
    updateData(newData)
  }

  // コンテンツ形式切り替え（文字列 ⇔ 配列）
  const toggleContentType = (index: number) => {
    const section = sectionData.sections[index]
    const newContent = Array.isArray(section.content)
      ? section.content.join('\n')
      : section.content.split('\n')
    updateSection(index, 'content', newContent)
  }

  // 配列コンテンツの項目追加
  const addContentItem = (sectionIndex: number) => {
    const section = sectionData.sections[sectionIndex]
    if (Array.isArray(section.content)) {
      const newContent = [...section.content, '新しい項目']
      updateSection(sectionIndex, 'content', newContent)
    }
  }

  // 配列コンテンツの項目削除
  const removeContentItem = (sectionIndex: number, itemIndex: number) => {
    const section = sectionData.sections[sectionIndex]
    if (Array.isArray(section.content)) {
      const newContent = section.content.filter((_, i) => i !== itemIndex)
      updateSection(sectionIndex, 'content', newContent)
    }
  }

  // 配列コンテンツの項目更新
  const updateContentItem = (sectionIndex: number, itemIndex: number, value: string) => {
    const section = sectionData.sections[sectionIndex]
    if (Array.isArray(section.content)) {
      const newContent = [...section.content]
      newContent[itemIndex] = value
      updateSection(sectionIndex, 'content', newContent)
    }
  }

  // ドラッグ&ドロップ
  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedItem === null) return

    const newSections = [...sectionData.sections]
    const draggedSection = newSections[draggedItem]
    newSections.splice(draggedItem, 1)
    newSections.splice(dropIndex, 0, draggedSection)

    const newData = { ...sectionData, sections: newSections }
    updateData(newData)
    setDraggedItem(null)
  }

  // キャラクター画像選択肢
  const characterImages = [
    '/king_point.png',
    '/king_work.png',
    '/king_study.png',
    '/king_thinking.png',
    '/king_running.png',
    '/iida_fighting.png',
    '/team_work.png'
  ]

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Section Blocks編集</h3>
        
        {/* メインタイトル */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            メインタイトル（40文字以内）
          </label>
          <input
            type="text"
            value={sectionData.title}
            onChange={(e) => updateData({ ...sectionData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={40}
            placeholder="メインタイトルを入力"
          />
          <div className="text-xs text-gray-500 mt-1">
            {sectionData.title.length}/40文字
          </div>
        </div>

        {/* キャラクター設定 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              キャラクター画像
            </label>
            <select
              value={sectionData.characterImage}
              onChange={(e) => updateData({ ...sectionData, characterImage: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {characterImages.map(image => (
                <option key={image} value={image}>
                  {image.replace('/', '').replace('.png', '')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              キャラクター位置
            </label>
            <select
              value={sectionData.characterPosition}
              onChange={(e) => updateData({ ...sectionData, characterPosition: e.target.value as 'left' | 'right' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="left">左</option>
              <option value="right">右</option>
            </select>
          </div>
        </div>

        {/* セクションブロック */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-md font-medium text-gray-800">セクションブロック</h4>
            <button
              onClick={addSection}
              className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
            >
              <Plus size={16} />
              セクション追加
            </button>
          </div>

          {sectionData.sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="border border-gray-200 rounded-lg p-4 mb-3 bg-white"
              draggable
              onDragStart={() => handleDragStart(sectionIndex)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, sectionIndex)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GripVertical size={16} className="text-gray-400 cursor-move" />
                  <span className="font-medium text-gray-700">セクション {sectionIndex + 1}</span>
                </div>
                <button
                  onClick={() => removeSection(sectionIndex)}
                  className="text-red-500 hover:text-red-700"
                  disabled={sectionData.sections.length <= 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* セクション名 */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  セクション名（30文字以内）
                </label>
                <input
                  type="text"
                  value={section.name}
                  onChange={(e) => updateSection(sectionIndex, 'name', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  maxLength={30}
                  placeholder="セクション名"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {section.name.length}/30文字
                </div>
              </div>

              {/* コンテンツ */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-600">
                    コンテンツ（200文字以内）
                  </label>
                  <button
                    onClick={() => toggleContentType(sectionIndex)}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200"
                  >
                    {Array.isArray(section.content) ? <AlignLeft size={12} /> : <List size={12} />}
                    {Array.isArray(section.content) ? '文章形式' : 'リスト形式'}
                  </button>
                </div>

                {Array.isArray(section.content) ? (
                  <div className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateContentItem(sectionIndex, itemIndex, e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                          placeholder={`項目${itemIndex + 1}`}
                        />
                        <button
                          onClick={() => removeContentItem(sectionIndex, itemIndex)}
                          className="text-red-500 hover:text-red-700"
                          disabled={section.content.length <= 1}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addContentItem(sectionIndex)}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs hover:bg-blue-200"
                    >
                      <Plus size={12} />
                      項目追加
                    </button>
                  </div>
                ) : (
                  <textarea
                    value={section.content}
                    onChange={(e) => updateSection(sectionIndex, 'content', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                    rows={3}
                    maxLength={200}
                    placeholder="セクションの内容"
                  />
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {Array.isArray(section.content) 
                    ? `${section.content.join('').length}/200文字` 
                    : `${section.content.length}/200文字`
                  }
                </div>
              </div>

              {/* フッターテキスト */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  フッターテキスト（50文字以内）
                </label>
                <input
                  type="text"
                  value={section.footerText || ''}
                  onChange={(e) => updateSection(sectionIndex, 'footerText', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  maxLength={50}
                  placeholder="フッターテキスト（オプション）"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {(section.footerText || '').length}/50文字
                </div>
              </div>

              {/* セクション画像（オプション） */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  セクション画像（オプション）
                </label>
                <input
                  type="text"
                  value={section.image || ''}
                  onChange={(e) => updateSection(sectionIndex, 'image', e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="/image.png"
                />
              </div>
            </div>
          ))}
        </div>

        {/* 下部セクション設定 */}
        <div className="border-t pt-4">
          <h4 className="text-md font-medium text-gray-800 mb-3">下部セクション</h4>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              下部セクション名（オプション）
            </label>
            <input
              type="text"
              value={sectionData.bottomSectionName || ''}
              onChange={(e) => updateData({ ...sectionData, bottomSectionName: e.target.value })}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              placeholder="下部セクション名"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              下部セクション内容（150文字以内）
            </label>
            <textarea
              value={sectionData.bottomSectionContent || ''}
              onChange={(e) => updateData({ ...sectionData, bottomSectionContent: e.target.value })}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              rows={2}
              maxLength={150}
              placeholder="下部セクションの内容"
            />
            <div className="text-xs text-gray-500 mt-1">
              {(sectionData.bottomSectionContent || '').length}/150文字
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}