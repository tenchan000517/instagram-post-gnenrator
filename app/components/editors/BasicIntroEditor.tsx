// BasicIntroEditor - 統合導入型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface BasicIntroEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

export function BasicIntroEditor({ data, onUpdate }: BasicIntroEditorProps) {
  const [title, setTitle] = useState<string>('')
  const [targetAudience, setTargetAudience] = useState<string>('')
  const [problems, setProblems] = useState<string[]>([])
  const [additionalMessage, setAdditionalMessage] = useState<string>('')
  const [savePrompt, setSavePrompt] = useState<string>('')
  const [draggedItem, setDraggedItem] = useState<number | null>(null)

  // 初期データの設定
  useEffect(() => {
    setTitle(data.title || '')
    setTargetAudience((data as any).targetAudience || '')
    setAdditionalMessage((data as any).additionalMessage || data.description || '')
    setSavePrompt((data as any).savePrompt || '')
    
    // problemsの設定
    if ((data as any).problems && (data as any).problems.length > 0) {
      setProblems((data as any).problems)
    } else if (data.items && data.items.length > 0) {
      // itemsからの変換
      const problemList = data.items.map(item => 
        typeof item === 'string' ? item : item.title || item.content || String(item)
      )
      setProblems(problemList)
    } else {
      // デフォルトの項目
      setProblems([
        'こんな悩みはありませんか？',
        '一人で頑張って成果が出ない',
        '何から始めればいいか分からない'
      ])
    }
  }, [data])

  // データ更新
  const updateData = (newTitle: string, newTargetAudience: string, newProblems: string[], newAdditionalMessage: string, newSavePrompt: string) => {
    const updatedData = {
      ...data,
      title: newTitle,
      targetAudience: newTargetAudience,
      problems: newProblems,
      additionalMessage: newAdditionalMessage,
      savePrompt: newSavePrompt,
      description: newAdditionalMessage, // 互換性のため
      items: newProblems // 互換性のため
    }
    onUpdate(updatedData)
  }

  // タイトル更新
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    updateData(newTitle, targetAudience, problems, additionalMessage, savePrompt)
  }

  // ターゲット質問更新
  const handleTargetAudienceChange = (newTargetAudience: string) => {
    setTargetAudience(newTargetAudience)
    updateData(title, newTargetAudience, problems, additionalMessage, savePrompt)
  }

  // 問題リスト更新
  const handleProblemChange = (index: number, newProblem: string) => {
    const newProblems = [...problems]
    newProblems[index] = newProblem
    setProblems(newProblems)
    updateData(title, targetAudience, newProblems, additionalMessage, savePrompt)
  }

  // 問題追加
  const addProblem = () => {
    if (problems.length >= 8) return // 最大8項目
    
    const newProblem = `問題点 ${problems.length + 1}`
    const newProblems = [...problems, newProblem]
    setProblems(newProblems)
    updateData(title, targetAudience, newProblems, additionalMessage, savePrompt)
  }

  // 問題削除
  const removeProblem = (index: number) => {
    if (problems.length <= 1) return // 最低1項目は保持
    
    const newProblems = problems.filter((_, i) => i !== index)
    setProblems(newProblems)
    updateData(title, targetAudience, newProblems, additionalMessage, savePrompt)
  }

  // 追加メッセージ更新
  const handleAdditionalMessageChange = (newMessage: string) => {
    setAdditionalMessage(newMessage)
    updateData(title, targetAudience, problems, newMessage, savePrompt)
  }

  // 保存プロンプト更新
  const handleSavePromptChange = (newPrompt: string) => {
    setSavePrompt(newPrompt)
    updateData(title, targetAudience, problems, additionalMessage, newPrompt)
  }

  // ドラッグ&ドロップ
  const handleDragStart = (index: number) => {
    setDraggedItem(index)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    
    if (draggedItem === null) return
    
    const newProblems = [...problems]
    const draggedProblem = newProblems[draggedItem]
    
    // ドラッグしたアイテムを削除
    newProblems.splice(draggedItem, 1)
    // ドロップ位置に挿入
    newProblems.splice(dropIndex, 0, draggedProblem)
    
    setProblems(newProblems)
    updateData(title, targetAudience, newProblems, additionalMessage, savePrompt)
    setDraggedItem(null)
  }

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
      <div className="text-lg font-semibold text-gray-800 mb-4">
        統合導入型 編集
      </div>

      {/* メインタイトル編集 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          メインタイトル
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="メインタイトルを入力..."
          maxLength={50}
        />
        <div className="text-xs text-gray-500">
          {title.length}/50文字
        </div>
      </div>

      {/* ターゲット質問編集 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          ターゲット質問（青いボックス内のテキスト）
        </label>
        <textarea
          value={targetAudience}
          onChange={(e) => handleTargetAudienceChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={2}
          placeholder="「〇〇で悩んでいませんか？」など、ターゲットへの質問を入力..."
          maxLength={100}
        />
        <div className="text-xs text-gray-500">
          {targetAudience.length}/100文字
        </div>
      </div>

      {/* 問題リスト編集 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            問題・悩みリスト ({problems.length}/8)
          </label>
          <button
            onClick={addProblem}
            disabled={problems.length >= 8}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>追加</span>
          </button>
        </div>

        <div className="space-y-3">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 bg-white p-3 rounded border"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="flex items-center space-x-2 flex-shrink-0">
                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-green-600 w-6">
                  ✓
                </span>
              </div>
              
              <textarea
                value={problem}
                onChange={(e) => handleProblemChange(index, e.target.value)}
                className="flex-1 px-2 py-1 border border-gray-200 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows={2}
                placeholder={`問題点${index + 1}を入力...`}
                maxLength={80}
              />
              
              <button
                onClick={() => removeProblem(index)}
                disabled={problems.length <= 1}
                className="flex-shrink-0 p-1 text-red-500 hover:bg-red-50 rounded disabled:text-gray-300 disabled:cursor-not-allowed"
                title="削除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 追加メッセージ編集 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          追加メッセージ（キャラクター下のテキスト）
        </label>
        <textarea
          value={additionalMessage}
          onChange={(e) => handleAdditionalMessageChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="キャラクター画像の下に表示するメッセージを入力..."
          maxLength={150}
        />
        <div className="text-xs text-gray-500">
          {additionalMessage.length}/150文字
        </div>
      </div>

      {/* 保存プロンプト編集 */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          保存プロンプト（オプショナル）
        </label>
        <input
          type="text"
          value={savePrompt}
          onChange={(e) => handleSavePromptChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="「保存して後で見返そう」など、保存を促すメッセージ（オプション）"
          maxLength={50}
        />
        <div className="text-xs text-gray-500">
          {savePrompt.length}/50文字
        </div>
      </div>

      {/* プレビュー情報 */}
      <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
        <div className="font-medium mb-1">📝 編集のヒント</div>
        <ul className="text-xs space-y-1 list-disc list-inside">
          <li>キャラクター画像は投稿タイプとターゲットIDに基づいて自動選択されます</li>
          <li>ターゲット質問は青い背景ボックスに表示されます</li>
          <li>問題リストは緑のチェックマーク付きで表示されます</li>
          <li>ドラッグ&ドロップで問題の順序を変更できます</li>
        </ul>
      </div>
    </div>
  )
}