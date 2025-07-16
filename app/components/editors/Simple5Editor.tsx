// Simple5Editor - ステップ型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Edit2, CheckCircle } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface Simple5EditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

interface StepItem {
  step: number
  title: string
  description: string
}

export function Simple5Editor({ data, onUpdate }: Simple5EditorProps) {
  const [steps, setSteps] = useState<StepItem[]>([])
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // 初期データの設定
  useEffect(() => {
    if (data.steps && data.steps.length > 0) {
      // stepsデータがある場合
      setSteps(data.steps)
    } else if (data.items && data.items.length > 0) {
      // itemsデータをstepsに変換
      const convertedSteps = data.items.map((item, index) => {
        const itemText = typeof item === 'string' ? item : item.content || item.title || ''
        const parts = itemText.split('\n')
        const titlePart = parts[0] || ''
        const descriptionPart = parts.slice(1).join('\n').trim() || ''
        
        return {
          step: index + 1,
          title: titlePart,
          description: descriptionPart
        }
      })
      setSteps(convertedSteps)
    } else if (data.checklist && data.checklist.length > 0) {
      // checklistデータをstepsに変換
      const convertedSteps = data.checklist.map((item, index) => ({
        step: index + 1,
        title: item.text || String(item),
        description: data.points?.[index]?.description || ''
      }))
      setSteps(convertedSteps)
    } else {
      // デフォルトの3ステップ
      setSteps([
        { step: 1, title: 'ステップ1のタイトル', description: 'ステップ1の詳細説明' },
        { step: 2, title: 'ステップ2のタイトル', description: 'ステップ2の詳細説明' },
        { step: 3, title: 'ステップ3のタイトル', description: 'ステップ3の詳細説明' }
      ])
    }
  }, [data])

  // ステップ番号を再振り
  const updateStepNumbers = (stepList: StepItem[]) => {
    return stepList.map((step, index) => ({
      ...step,
      step: index + 1
    }))
  }

  // データ更新
  const updateData = (newSteps: StepItem[]) => {
    const updatedSteps = updateStepNumbers(newSteps)
    setSteps(updatedSteps)
    
    const updatedData = {
      ...data,
      steps: updatedSteps,
      // itemsとchecklistをクリア（stepsに統一）
      items: undefined,
      checklist: undefined,
      points: undefined
    }
    onUpdate(updatedData)
  }

  // ステップ追加
  const addStep = () => {
    if (steps.length >= 8) return // 最大8ステップ
    
    const newStep: StepItem = {
      step: steps.length + 1,
      title: `ステップ${steps.length + 1}のタイトル`,
      description: `ステップ${steps.length + 1}の詳細説明`
    }
    
    const newSteps = [...steps, newStep]
    updateData(newSteps)
  }

  // ステップ削除
  const removeStep = (index: number) => {
    if (steps.length <= 1) return // 最小1ステップ
    
    const newSteps = steps.filter((_, i) => i !== index)
    updateData(newSteps)
  }

  // ステップ編集
  const updateStep = (index: number, field: 'title' | 'description', value: string) => {
    const newSteps = [...steps]
    newSteps[index] = { ...newSteps[index], [field]: value }
    updateData(newSteps)
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
    
    const newSteps = [...steps]
    const draggedStep = newSteps[draggedItem]
    
    // 要素を移動
    newSteps.splice(draggedItem, 1)
    newSteps.splice(dropIndex, 0, draggedStep)
    
    updateData(newSteps)
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
          ステップ編集 - Simple5Template
        </h3>
        <p className="text-sm text-blue-600">
          ステップ型コンテンツの編集。各ステップにタイトルと説明を設定できます。
        </p>
        <div className="mt-2 text-xs text-blue-500">
          制限: 最大8ステップ・最小1ステップ | タイトル60文字・説明200文字
        </div>
      </div>

      {/* ステップリスト */}
      <div className="space-y-4">
        {steps.map((step, index) => (
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

              {/* ステップ番号 */}
              <div className="flex-shrink-0 w-20 mt-1">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold text-center">
                  STEP {step.step}
                </div>
              </div>

              {/* 編集フィールド */}
              <div className="flex-1 space-y-3">
                {/* タイトル編集 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ステップタイトル
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateStep(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ステップのタイトルを入力"
                    maxLength={60}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {step.title.length}/60文字
                  </div>
                </div>

                {/* 説明編集 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    詳細説明
                  </label>
                  <textarea
                    value={step.description}
                    onChange={(e) => updateStep(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="ステップの詳細説明を入力"
                    rows={3}
                    maxLength={200}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {step.description.length}/200文字
                  </div>
                </div>
              </div>

              {/* 削除ボタン */}
              <button
                onClick={() => removeStep(index)}
                disabled={steps.length <= 1}
                className={`flex-shrink-0 p-2 rounded-full transition-colors ${
                  steps.length <= 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-red-500 hover:bg-red-50'
                }`}
                title="ステップを削除"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ステップ追加ボタン */}
      <div className="flex justify-center">
        <button
          onClick={addStep}
          disabled={steps.length >= 8}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition-colors ${
            steps.length >= 8
              ? 'border-gray-300 text-gray-400 cursor-not-allowed'
              : 'border-blue-300 text-blue-600 hover:bg-blue-50'
          }`}
        >
          <Plus className="w-5 h-5" />
          ステップを追加 ({steps.length}/8)
        </button>
      </div>

      {/* プレビュー情報 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">プレビュー情報</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 現在のステップ数: {steps.length}</p>
          <p>• 各ステップは「STEP番号 + タイトル + チェックアイコン + 説明」で表示されます</p>
          <p>• ドラッグ&ドロップで順序を変更できます</p>
        </div>
      </div>
    </div>
  )
}