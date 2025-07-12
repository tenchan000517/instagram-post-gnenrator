// ⑨表型テンプレート - テーブル、日付、名前、解説の３カラムテーブル
import React from 'react'
import { BarChart3 } from 'lucide-react'
import { TemplateData } from './TemplateTypes'

interface TableTemplateProps {
  data: TemplateData
}

export function TableTemplate({ data }: TableTemplateProps) {
  // 🎨 テンプレートデータ挿入ロギング - table
  console.log('🎨 テンプレートデータ挿入 - table')
  console.log('================================================================================')
  console.log('📋 挿入データ詳細:')
  console.log(`  - title: "${data.title || 'なし'}"`)
  console.log(`  - subtitle: "${data.subtitle || 'なし'}"`)
  console.log(`  - badgeText: "${data.badgeText || 'なし'}"`)
  console.log(`  - tableData: headers[${data.tableData?.headers?.length || 0}], rows[${data.tableData?.rows?.length || 0}]`)
  if (data.tableData?.headers) {
    console.log(`    ヘッダー: [${data.tableData.headers.join(', ')}]`)
  }
  data.tableData?.rows?.forEach((row, index) => {
    console.log(`    └─ 行${index + 1}: [${row.join(', ')}]`)
  })
  console.log('================================================================================')

  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* ヘッダー部分 */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <BarChart3 className="w-4 h-4" />
            <span>{data.badgeText || 'データ'}</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 leading-tight">
            {data.title}
          </h1>
        </div>

        {/* テーブル */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-white rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-b from-blue-500 to-blue-600">
                  {data.tableData?.headers.map((header, index) => (
                    <th key={index} className="text-white text-base font-bold py-3 px-3 text-center">
                      {header}
                    </th>
                  )) || (
                    // フォールバック: デフォルトヘッダー
                    <>
                      <th className="text-white text-base font-bold py-3 px-3 text-center">業界</th>
                      <th className="text-white text-base font-bold py-3 px-3 text-center">平均年収</th>
                      <th className="text-white text-base font-bold py-3 px-3 text-center">将来性</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.tableData?.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">
                        {cell}
                      </td>
                    ))}
                  </tr>
                )) || (
                  // フォールバック: デフォルトデータ
                  <>
                    <tr className="bg-blue-50">
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">IT</td>
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">600万円</td>
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">高</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">金融</td>
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">700万円</td>
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">中</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">商社</td>
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">800万円</td>
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">中</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">メーカー</td>
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">650万円</td>
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">中</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">コンサル</td>
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">900万円</td>
                      <td className="text-sm text-gray-800 py-3 px-3 text-center font-medium border-b border-blue-100">高</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 補足説明 */}
        {data.subtitle && (
          <div className="mt-4 text-center">
            <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-400">
              <p className="text-base text-blue-800 font-medium">
                {data.subtitle}
              </p>
            </div>
          </div>
        )}
        
      </div>
    </div>
  )
}

// メタデータ
export const tableMetadata = {
  id: 'table',
  name: '表型',
  description: '3カラムテーブル（日付、名前、解説）',
  suitableFor: {
    contentTypes: ['スケジュール', '一覧表', 'データ表示'],
    genres: ['エントリー系', 'ナレッジ系'],
    dataStructure: ['表形式', '構造化データ'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 1 }
  },
  characterLimits: {
    title: 25,
    content: 0,
    subtitle: 40,
    items: 15         // 各セル内容
  },
  keywords: ['スケジュール', '日程', '締切', '一覧', '表', 'データ', '比較', '企業']
}