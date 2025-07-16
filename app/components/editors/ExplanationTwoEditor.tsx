// ExplanationTwoEditor - 解説型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, BookOpen } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface ExplanationTwoEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

interface ExplanationSection {
  title: string
  content: string
}

export function ExplanationTwoEditor({ data, onUpdate }: ExplanationTwoEditorProps) {
  const [sections, setSections] = useState<ExplanationSection[]>([])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // 初期データの設定
  useEffect(() => {
    if (data.sections && data.sections.length > 0) {
      setSections(data.sections)
    } else if (data.points && data.points.length > 0) {
      // pointsデータをsectionsに変換
      const convertedSections = data.points.map(point => ({
        title: point.title || '',
        content: point.description || ''
      }))
      setSections(convertedSections)
    } else {
      // デフォルトの3セクション
      setSections([
        { title: 'ポイント1', content: 'ポイント1の詳細説明' },
        { title: 'ポイント2', content: 'ポイント2の詳細説明' },
        { title: 'ポイント3', content: 'ポイント3の詳細説明' }
      ])
    }
  }, [data])

  // データ更新
  const updateData = (newSections: ExplanationSection[]) => {
    setSections(newSections)
    
    const updatedData = {
      ...data,
      sections: newSections,
      // pointsデータもクリア（sectionsに統一）
      points: undefined
    }
    onUpdate(updatedData)
  }

  // セクション追加
  const addSection = () => {
    if (sections.length >= 5) return // 最大5セクション
    
    const newSection: ExplanationSection = {
      title: `ポイント${sections.length + 1}`,
      content: `ポイント${sections.length + 1}の詳細説明`
    }
    
    const newSections = [...sections, newSection]
    updateData(newSections)
  }

  // セクション削除
  const removeSection = (index: number) => {
    if (sections.length <= 1) return // 最小1セクション
    
    const newSections = sections.filter((_, i) => i !== index)
    updateData(newSections)
  }

  // セクション編集
  const updateSection = (index: number, field: 'title' | 'content', value: string) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], [field]: value }
    updateData(newSections)
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
    
    const newSections = [...sections]
    const draggedSection = newSections[draggedItem]
    
    // 要素を移動
    newSections.splice(draggedItem, 1)
    newSections.splice(dropIndex, 0, draggedSection)
    
    updateData(newSections)
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
          解説型編集 - ExplanationTwoTemplate
        </h3>
        <p className="text-sm text-blue-600">
          複数のポイントを順次解説する形式。各セクションにタイトルと詳細説明を設定できます。
        </p>
        <div className="mt-2 text-xs text-blue-500">
          制限: 最大5セクション・最小1セクション | タイトル25文字・内容50文字
        </div>
      </div>

      {/* セクションリスト */}
      <div className="space-y-4">
        {sections.map((section, index) => (
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
            <div className="flex items-start gap-3">
              {/* ドラッグハンドル */}
              <div className="mt-2 cursor-move text-gray-400 hover:text-gray-600">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* セクション番号 */}
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>

              {/* 編集フィールド */}
              <div className="flex-1 space-y-3">
                {/* セクションタイトル編集 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    セクションタイトル
                  </label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="セクションタイトルを入力"
                    maxLength={25}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {section.title.length}/25文字
                  </div>
                </div>

                {/* 説明編集 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    詳細説明
                  </label>
                  <textarea
                    value={section.content}
                    onChange={(e) => updateSection(index, 'content', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="詳細説明を入力"
                    rows={3}
                    maxLength={50}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {section.content.length}/50文字
                  </div>
                </div>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => removeSection(index)}
                disabled={sections.length <= 1}
                className={`flex-shrink-0 p-2 rounded-full transition-colors ${
                  sections.length <= 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-red-500 hover:bg-red-50'
                }`}
                title="セクションを削除"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* セクション追加ボタン */}
      <div className="flex justify-center">
        <button
          onClick={addSection}
          disabled={sections.length >= 5}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors ${
            sections.length >= 5
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-blue-300 text-blue-600 hover:bg-blue-50'
          }`}
        >
          <Plus className="w-5 h-5" />
          セクションを追加 ({sections.length}/5)
        </button>
      </div>

      {/* プレビュー情報 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">プレビュー情報</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 現在のセクション数: {sections.length}</p>
          <p>• 各セクションは青枠のボックスで表示されます</p>
          <p>• タイトルは青色、説明文は黒色で表示されます</p>
          <p>• ドラッグ&ドロップで順序を変更できます</p>
        </div>
      </div>
    </div>
  )
}