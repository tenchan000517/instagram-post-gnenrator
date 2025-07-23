import React from 'react'
import { TemplateProps } from './TemplateTypes'

interface ActionCallChecklistData {
  pageTitle: string
  mainMessage: string
  actionItems: Array<{
    action: string
    reason: string
  }>
  closingHook: string
  pageNumber?: number
}

export const ActionCallChecklistTemplate: React.FC<TemplateProps> = ({ data }) => {
  const templateData = data as ActionCallChecklistData

  return (
    <div className="bg-white rounded-lg p-8 h-full flex flex-col">
      {/* ページ番号 */}
      {templateData.pageNumber && (
        <div className="text-sm text-gray-500 mb-4">
          {templateData.pageNumber} / 5
        </div>
      )}

      {/* ページタイトル */}
      <h2 className="text-xl font-bold mb-4 text-center">
        {templateData.pageTitle}
      </h2>

      {/* メインメッセージ */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
        <p className="text-lg font-semibold text-center text-yellow-800">
          {templateData.mainMessage}
        </p>
      </div>

      {/* アクションチェックリスト */}
      <div className="flex-1 space-y-4">
        <h3 className="font-semibold text-gray-700">
          ✅ 今すぐできるアクション
        </h3>
        {templateData.actionItems.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <input 
              type="checkbox" 
              className="mt-1 h-5 w-5 text-blue-600 rounded"
              readOnly
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.action}</p>
              <p className="text-sm text-gray-600">{item.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 締めのフック */}
      <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-4">
        <p className="text-center font-bold">
          {templateData.closingHook}
        </p>
      </div>
    </div>
  )
}

export const actionCallChecklistMetadata = {
  id: 'action-call-checklist',
  name: '行動喚起チェックリスト',
  description: '行動を促すチェックリスト形式',
  characterLimits: {
    pageTitle: 30,
    mainMessage: 50,
    action: 40,
    reason: 60,
    closingHook: 40
  }
}