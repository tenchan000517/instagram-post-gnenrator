'use client'
import React, { useState, useEffect } from 'react'
import { TemplateType, TemplateData } from './templates/TemplateTypes'
import { Edit3, Save, X, Plus, Trash2, Move, Check } from 'lucide-react'

interface PartialEditProps {
  templateType: TemplateType
  templateData: TemplateData
  onSave: (updatedData: TemplateData) => void
  onCancel: () => void
}

interface EditableField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'list' | 'table' | 'sections'
  value: any
  placeholder?: string
  maxLength?: number
}

export default function PartialEditComponent({
  templateType,
  templateData,
  onSave,
  onCancel
}: PartialEditProps) {
  const [editingData, setEditingData] = useState<TemplateData>(templateData)
  const [editableFields, setEditableFields] = useState<EditableField[]>([])
  const [activeField, setActiveField] = useState<string | null>(null)

  useEffect(() => {
    // テンプレートタイプに応じて編集可能フィールドを設定
    const fields = generateEditableFields(templateType, templateData)
    setEditableFields(fields)
  }, [templateType, templateData])

  const generateEditableFields = (type: TemplateType, data: TemplateData): EditableField[] => {
    const fields: EditableField[] = []

    // 共通フィールド
    if (data.title) {
      fields.push({
        key: 'title',
        label: 'タイトル',
        type: 'text',
        value: data.title,
        placeholder: 'タイトルを入力',
        maxLength: 50
      })
    }

    if (data.badgeText) {
      fields.push({
        key: 'badgeText',
        label: 'バッジテキスト',
        type: 'text',
        value: data.badgeText,
        placeholder: 'バッジテキストを入力',
        maxLength: 15
      })
    }

    if (data.subtitle) {
      fields.push({
        key: 'subtitle',
        label: 'サブタイトル',
        type: 'text',
        value: data.subtitle,
        placeholder: 'サブタイトルを入力',
        maxLength: 60
      })
    }

    // テンプレート固有フィールド
    switch (type) {
      case 'enumeration':
        if (data.items) {
          fields.push({
            key: 'items',
            label: '項目リスト',
            type: 'list',
            value: data.items,
            placeholder: '項目を入力'
          })
        }
        if (data.description) {
          fields.push({
            key: 'description',
            label: '説明文',
            type: 'textarea',
            value: data.description,
            placeholder: '説明文を入力',
            maxLength: 200
          })
        }
        break

      case 'explanation':
      case 'explanation2':
        if (data.content) {
          fields.push({
            key: 'content',
            label: '説明内容',
            type: 'textarea',
            value: data.content,
            placeholder: '説明内容を入力',
            maxLength: 300
          })
        }
        if (data.sections) {
          fields.push({
            key: 'sections',
            label: 'セクション',
            type: 'sections',
            value: data.sections,
            placeholder: 'セクション内容を入力'
          })
        }
        break

      case 'table':
        if (data.tableData) {
          fields.push({
            key: 'tableData',
            label: 'テーブルデータ',
            type: 'table',
            value: data.tableData,
            placeholder: 'テーブル内容を入力'
          })
        }
        break

      case 'story':
        if (data.content) {
          fields.push({
            key: 'content',
            label: 'ストーリー内容',
            type: 'textarea',
            value: data.content,
            placeholder: 'ストーリー内容を入力',
            maxLength: 250
          })
        }
        if (data.checklist) {
          fields.push({
            key: 'checklist',
            label: 'チェックリスト',
            type: 'list',
            value: data.checklist?.map(item => item.text) || [],
            placeholder: 'チェック項目を入力'
          })
        }
        break

      case 'list':
        if (data.items) {
          fields.push({
            key: 'items',
            label: 'リスト項目',
            type: 'list',
            value: data.items,
            placeholder: 'リスト項目を入力'
          })
        }
        break

      default:
        // simple系テンプレート
        if (data.content) {
          fields.push({
            key: 'content',
            label: 'コンテンツ',
            type: 'textarea',
            value: data.content,
            placeholder: 'コンテンツを入力',
            maxLength: 200
          })
        }
        break
    }

    return fields
  }

  const handleFieldChange = (key: string, value: any) => {
    setEditingData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    onSave(editingData)
  }

  const renderFieldEditor = (field: EditableField) => {
    const isActive = activeField === field.key

    switch (field.type) {
      case 'text':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type="text"
              value={editingData[field.key] || ''}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              className="input-field"
            />
            {field.maxLength && (
              <div className="text-xs text-gray-500 mt-1">
                {(editingData[field.key] || '').length}/{field.maxLength}文字
              </div>
            )}
          </div>
        )

      case 'textarea':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <textarea
              value={editingData[field.key] || ''}
              onChange={(e) => handleFieldChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              rows={4}
              className="input-field resize-none"
            />
            {field.maxLength && (
              <div className="text-xs text-gray-500 mt-1">
                {(editingData[field.key] || '').length}/{field.maxLength}文字
              </div>
            )}
          </div>
        )

      case 'list':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <div className="space-y-2">
              {(editingData[field.key] || []).map((item: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...(editingData[field.key] || [])]
                      newItems[index] = e.target.value
                      handleFieldChange(field.key, newItems)
                    }}
                    placeholder={`${field.placeholder} ${index + 1}`}
                    className="input-field flex-1"
                  />
                  <button
                    onClick={() => {
                      const newItems = [...(editingData[field.key] || [])]
                      newItems.splice(index, 1)
                      handleFieldChange(field.key, newItems)
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(editingData[field.key] || []), '']
                  handleFieldChange(field.key, newItems)
                }}
                className="flex items-center space-x-1 text-find-blue hover:text-find-blue-dark text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>項目を追加</span>
              </button>
            </div>
          </div>
        )

      case 'table':
        const tableData = editingData[field.key] || { headers: [], rows: [] }
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            
            {/* ヘッダー編集 */}
            <div className="mb-3">
              <span className="text-sm text-gray-600">テーブルヘッダー</span>
              <div className="flex space-x-2 mt-1">
                {tableData.headers.map((header: string, index: number) => (
                  <input
                    key={index}
                    type="text"
                    value={header}
                    onChange={(e) => {
                      const newHeaders = [...tableData.headers]
                      newHeaders[index] = e.target.value
                      handleFieldChange(field.key, { ...tableData, headers: newHeaders })
                    }}
                    className="input-field flex-1"
                    placeholder={`ヘッダー ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* 行編集 */}
            <div>
              <span className="text-sm text-gray-600">テーブル行</span>
              <div className="space-y-2 mt-1">
                {tableData.rows.map((row: string[], rowIndex: number) => (
                  <div key={rowIndex} className="flex items-center space-x-2">
                    {row.map((cell: string, cellIndex: number) => (
                      <input
                        key={cellIndex}
                        type="text"
                        value={cell}
                        onChange={(e) => {
                          const newRows = [...tableData.rows]
                          newRows[rowIndex][cellIndex] = e.target.value
                          handleFieldChange(field.key, { ...tableData, rows: newRows })
                        }}
                        className="input-field flex-1"
                        placeholder={`行${rowIndex + 1}列${cellIndex + 1}`}
                      />
                    ))}
                    <button
                      onClick={() => {
                        const newRows = [...tableData.rows]
                        newRows.splice(rowIndex, 1)
                        handleFieldChange(field.key, { ...tableData, rows: newRows })
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newRow = new Array(tableData.headers.length).fill('')
                    const newRows = [...tableData.rows, newRow]
                    handleFieldChange(field.key, { ...tableData, rows: newRows })
                  }}
                  className="flex items-center space-x-1 text-find-blue hover:text-find-blue-dark text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>行を追加</span>
                </button>
              </div>
            </div>
          </div>
        )

      case 'sections':
        const sections = editingData[field.key] || []
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <div className="space-y-4">
              {sections.map((section: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      セクション {index + 1}
                    </span>
                    <button
                      onClick={() => {
                        const newSections = [...sections]
                        newSections.splice(index, 1)
                        handleFieldChange(field.key, newSections)
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={section.title || ''}
                    onChange={(e) => {
                      const newSections = [...sections]
                      newSections[index] = { ...section, title: e.target.value }
                      handleFieldChange(field.key, newSections)
                    }}
                    placeholder="セクションタイトル"
                    className="input-field mb-2"
                  />
                  <textarea
                    value={section.content || ''}
                    onChange={(e) => {
                      const newSections = [...sections]
                      newSections[index] = { ...section, content: e.target.value }
                      handleFieldChange(field.key, newSections)
                    }}
                    placeholder="セクション内容"
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>
              ))}
              <button
                onClick={() => {
                  const newSections = [...sections, { title: '', content: '' }]
                  handleFieldChange(field.key, newSections)
                }}
                className="flex items-center space-x-1 text-find-blue hover:text-find-blue-dark text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>セクションを追加</span>
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="post-preview">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
          <Edit3 className="w-5 h-5 mr-2 text-find-blue" />
          部分編集
        </h2>
        <p className="text-gray-600">
          テンプレートの各要素を個別に編集できます
        </p>
      </div>

      {/* 編集フォーム */}
      <div className="space-y-6">
        {editableFields.map((field) => (
          <div key={field.key} className="bg-white border border-gray-200 rounded-lg p-4">
            {renderFieldEditor(field)}
          </div>
        ))}
      </div>

      {/* プレビュー表示 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-800 mb-3">📱 編集プレビュー</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <div><strong>タイトル:</strong> {editingData.title}</div>
          {editingData.badgeText && (
            <div><strong>バッジ:</strong> {editingData.badgeText}</div>
          )}
          {editingData.subtitle && (
            <div><strong>サブタイトル:</strong> {editingData.subtitle}</div>
          )}
          {editingData.items && (
            <div>
              <strong>項目:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                {editingData.items.map((item: string | { title?: string; content?: string }, index: number) => (
                  <li key={index}>
                    {typeof item === 'string' ? item : (item.title || item.content || '')}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {editingData.content && (
            <div><strong>内容:</strong> {editingData.content}</div>
          )}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="btn-secondary flex items-center space-x-2"
        >
          <X className="w-4 h-4" />
          <span>キャンセル</span>
        </button>
        
        <button
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>保存して適用</span>
        </button>
      </div>
    </div>
  )
}