// TableEditor - テーブル型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical, Table, Edit2 } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface TableEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

interface TableData {
  headers: string[]
  rows: string[][]
}

export function TableEditor({ data, onUpdate }: TableEditorProps) {
  const [tableData, setTableData] = useState<TableData>({
    headers: [],
    rows: []
  })

  // 初期データの設定
  useEffect(() => {
    if (data.tableData) {
      setTableData(data.tableData)
    } else {
      // デフォルトの3列×3行テーブル
      setTableData({
        headers: ['ヘッダー1', 'ヘッダー2', 'ヘッダー3'],
        rows: [
          ['データ1-1', 'データ1-2', 'データ1-3'],
          ['データ2-1', 'データ2-2', 'データ2-3'],
          ['データ3-1', 'データ3-2', 'データ3-3']
        ]
      })
    }
  }, [data])

  // データ更新
  const updateData = (newTableData: TableData) => {
    setTableData(newTableData)
    
    const updatedData = {
      ...data,
      tableData: newTableData
    }
    onUpdate(updatedData)
  }

  // ヘッダー編集
  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...tableData.headers]
    newHeaders[index] = value
    updateData({ ...tableData, headers: newHeaders })
  }

  // セル編集
  const updateCell = (rowIndex: number, cellIndex: number, value: string) => {
    const newRows = [...tableData.rows]
    newRows[rowIndex][cellIndex] = value
    updateData({ ...tableData, rows: newRows })
  }

  // 行追加
  const addRow = () => {
    if (tableData.rows.length >= 10) return // 最大10行
    
    const newRow = tableData.headers.map((_, index) => `データ${tableData.rows.length + 1}-${index + 1}`)
    const newRows = [...tableData.rows, newRow]
    updateData({ ...tableData, rows: newRows })
  }

  // 行削除
  const removeRow = (rowIndex: number) => {
    if (tableData.rows.length <= 1) return // 最小1行
    
    const newRows = tableData.rows.filter((_, index) => index !== rowIndex)
    updateData({ ...tableData, rows: newRows })
  }

  // 列追加
  const addColumn = () => {
    if (tableData.headers.length >= 4) return // 最大4列
    
    const newHeaders = [...tableData.headers, `ヘッダー${tableData.headers.length + 1}`]
    const newRows = tableData.rows.map((row, rowIndex) => [...row, `データ${rowIndex + 1}-${tableData.headers.length + 1}`])
    updateData({ headers: newHeaders, rows: newRows })
  }

  // 列削除
  const removeColumn = (columnIndex: number) => {
    if (tableData.headers.length <= 2) return // 最小2列
    
    const newHeaders = tableData.headers.filter((_, index) => index !== columnIndex)
    const newRows = tableData.rows.map(row => row.filter((_, index) => index !== columnIndex))
    updateData({ headers: newHeaders, rows: newRows })
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          テーブル編集 - TableTemplate
        </h3>
        <p className="text-sm text-blue-600">
          テーブル形式でデータを構造化して表示。ヘッダーと行データを自由に編集できます。
        </p>
        <div className="mt-2 text-xs text-blue-500">
          制限: 最大4列・最小2列 | 最大10行・最小1行 | 各セル15文字まで
        </div>
      </div>

      {/* テーブル操作ボタン */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={addColumn}
          disabled={tableData.headers.length >= 4}
          className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
            tableData.headers.length >= 4
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <Plus className="w-4 h-4" />
          列追加 ({tableData.headers.length}/4)
        </button>
        <button
          onClick={addRow}
          disabled={tableData.rows.length >= 10}
          className={`flex items-center gap-2 px-3 py-1 rounded text-sm transition-colors ${
            tableData.rows.length >= 10
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          <Plus className="w-4 h-4" />
          行追加 ({tableData.rows.length}/10)
        </button>
      </div>

      {/* テーブル編集エリア */}
      <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
        <table className="w-full">
          {/* ヘッダー編集 */}
          <thead className="bg-blue-500">
            <tr>
              {tableData.headers.map((header, index) => (
                <th key={index} className="relative p-2 text-white">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => updateHeader(index, e.target.value)}
                      className="flex-1 px-2 py-1 text-sm bg-white/20 text-white placeholder-white/70 border border-white/30 rounded focus:outline-none focus:ring-2 focus:ring-white/50"
                      placeholder={`ヘッダー${index + 1}`}
                      maxLength={15}
                    />
                    <button
                      onClick={() => removeColumn(index)}
                      disabled={tableData.headers.length <= 2}
                      className={`p-1 rounded transition-colors ${
                        tableData.headers.length <= 2
                          ? 'text-white/30 cursor-not-allowed'
                          : 'text-white/70 hover:text-white hover:bg-white/20'
                      }`}
                      title="列を削除"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-xs text-white/70 mt-1">
                    {header.length}/15文字
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* データ行編集 */}
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-2 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, cellIndex, e.target.value)}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`データ${rowIndex + 1}-${cellIndex + 1}`}
                        maxLength={15}
                      />
                      {cellIndex === 0 && (
                        <button
                          onClick={() => removeRow(rowIndex)}
                          disabled={tableData.rows.length <= 1}
                          className={`p-1 rounded transition-colors ${
                            tableData.rows.length <= 1
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-red-500 hover:bg-red-50'
                          }`}
                          title="行を削除"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {cell.length}/15文字
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* プレビュー情報 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">プレビュー情報</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• 現在のサイズ: {tableData.headers.length}列 × {tableData.rows.length}行</p>
          <p>• ヘッダーは青色背景で表示されます</p>
          <p>• データ行は交互に色分けされます</p>
          <p>• 各セルは中央揃えで表示されます</p>
        </div>
      </div>
    </div>
  )
}