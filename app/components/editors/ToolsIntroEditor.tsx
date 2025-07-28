// ToolsIntroEditor - ツール紹介導入型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface ToolsIntroEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

export function ToolsIntroEditor({ data, onUpdate }: ToolsIntroEditorProps) {
  const [title, setTitle] = useState<string>('')
  const [targetAudience, setTargetAudience] = useState<string>('')
  const [problems, setProblems] = useState<string[]>([])
  const [additionalMessage, setAdditionalMessage] = useState<string>('')
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // 初期データの設定
  useEffect(() => {
    setTitle(data.title || '')
    setTargetAudience((data as any).targetAudience || '')
    setAdditionalMessage((data as any).additionalMessage || '')
    
    // problemsの設定
    if ((data as any).problems && (data as any).problems.length > 0) {
      setProblems((data as any).problems)
    } else if (data.items && data.items.length > 0) {
      // itemsからの変換
      const problemsList = data.items.map(item => 
        typeof item === 'string' ? item : item.title || item.content || String(item)
      )
      setProblems(problemsList)
    } else {
      // デフォルトの項目
      setProblems([
        'AIツールがありすぎて何を使えばいいかわからない',
        '効率化したいけど、どこから始めればいい？',
        '本当に使える神ツールを教えてほしい'
      ])
    }
  }, [data])

  // データ更新
  const updateData = (newTitle: string, newAudience: string, newProblems: string[], newMessage: string) => {
    const updatedData = {
      ...data,
      title: newTitle,
      targetAudience: newAudience,
      problems: newProblems,
      additionalMessage: newMessage,
      savePrompt: '保存して後で見返す'
    }
    onUpdate(updatedData)
  }

  // 問題項目の追加
  const addProblem = () => {
    const newProblems = [...problems, '新しい問題']
    setProblems(newProblems)
    updateData(title, targetAudience, newProblems, additionalMessage)
  }

  // 問題項目の削除
  const removeProblem = (index: number) => {
    const newProblems = problems.filter((_, i) => i !== index)
    setProblems(newProblems)
    updateData(title, targetAudience, newProblems, additionalMessage)
  }

  // 問題項目の更新
  const updateProblem = (index: number, value: string) => {
    const newProblems = [...problems]
    newProblems[index] = value
    setProblems(newProblems)
    updateData(title, targetAudience, newProblems, additionalMessage)
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
    
    const newProblems = [...problems]
    const draggedContent = newProblems[draggedItem]
    newProblems.splice(draggedItem, 1)
    newProblems.splice(index, 0, draggedContent)
    
    setProblems(newProblems)
    updateData(title, targetAudience, newProblems, additionalMessage)
    setDraggedItem(null)
  }

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800">ツール紹介導入編集</h3>
      
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
            updateData(e.target.value, targetAudience, problems, additionalMessage)
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例: 15個の神生成AIツール！使い方別まとめ"
        />
      </div>

      {/* ターゲット質問編集 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ターゲット質問
        </label>
        <input
          type="text"
          value={targetAudience}
          onChange={(e) => {
            setTargetAudience(e.target.value)
            updateData(title, e.target.value, problems, additionalMessage)
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例: AIツールで効率化したい？"
        />
      </div>

      {/* 問題リスト編集 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          問題リスト（{problems.length}個）
        </label>
        <div className="space-y-2">
          {problems.map((problem, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className="flex items-center space-x-2 bg-white p-2 rounded border border-gray-200"
            >
              <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
              <input
                type="text"
                value={problem}
                onChange={(e) => updateProblem(index, e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => removeProblem(index)}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addProblem}
          className="mt-2 flex items-center space-x-1 text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>問題を追加</span>
        </button>
      </div>

      {/* 追加メッセージ編集 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          追加メッセージ
        </label>
        <input
          type="text"
          value={additionalMessage}
          onChange={(e) => {
            setAdditionalMessage(e.target.value)
            updateData(title, targetAudience, problems, e.target.value)
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="例: この投稿で全部解決！"
        />
      </div>

      {/* 画像説明 */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          <strong>画像について:</strong> ten.png が自動的に使用されます
        </p>
      </div>
    </div>
  )
}