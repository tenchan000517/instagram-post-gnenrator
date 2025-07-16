/**
 * SingleSectionNoItemsTemplate専用エディタ
 * 単一セクション・アイテム無し型の編集機能（title, description, sections[1]）
 */

import React, { useState, useEffect } from 'react'
import { FileText } from 'lucide-react'

interface SingleSectionNoItemsEditorProps {
  data: any
  onUpdate: (field: string, value: any) => void
  onDataUpdate: (newData: any) => void
}

export const SingleSectionNoItemsEditor: React.FC<SingleSectionNoItemsEditorProps> = ({
  data,
  onUpdate,
  onDataUpdate
}) => {
  const [section, setSection] = useState({
    title: '',
    content: '',
    description: ''
  })

  // データからセクション情報を抽出
  useEffect(() => {
    if (data?.sections && data.sections.length > 0) {
      const sectionData = data.sections[0]
      setSection({
        title: sectionData.title || '',
        content: sectionData.content || '',
        description: (sectionData as any).description || ''
      })
    } else {
      setSection({
        title: '',
        content: '',
        description: ''
      })
    }
  }, [data])

  // セクションの更新
  const updateSection = (field: string, value: string) => {
    const newSection = { ...section, [field]: value }
    setSection(newSection)
    
    // sectionsの更新
    const newSections = [{
      title: newSection.title,
      content: newSection.content,
      description: newSection.description
    }]
    
    onUpdate('sections', newSections)
  }

  return (
    <div className="space-y-6">
      {/* 基本情報編集 */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <h3 className="font-semibold text-gray-800 mb-4">基本情報</h3>
        
        {/* タイトル */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            タイトル（{data?.title?.length || 0}/35文字）
          </label>
          <input
            type="text"
            value={data?.title || ''}
            onChange={(e) => onUpdate('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例：効果的なプレゼンテーション"
            maxLength={35}
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
            placeholder="例：SKILL"
            maxLength={20}
          />
        </div>

        {/* 説明文 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            説明文（{data?.description?.length || 0}/120文字）
          </label>
          <textarea
            value={data?.description || ''}
            onChange={(e) => onUpdate('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            placeholder="例：効果的なプレゼンテーションスキルを身につけることで、あなたの提案がより説得力を持つようになります。"
            maxLength={120}
          />
        </div>

        {/* サブタイトル */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            サブタイトル（{data?.subtitle?.length || 0}/50文字）
          </label>
          <input
            type="text"
            value={data?.subtitle || ''}
            onChange={(e) => onUpdate('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例：成功への第一歩"
            maxLength={50}
          />
        </div>
      </div>

      {/* セクション編集 */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-800">セクション情報</h3>
        </div>
        
        {/* セクションタイトル */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            セクションタイトル（{section.title.length}/60文字）
          </label>
          <input
            type="text"
            value={section.title}
            onChange={(e) => updateSection('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例：基本的なプレゼンテーション技術"
            maxLength={60}
          />
        </div>

        {/* セクションコンテンツ */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            セクションコンテンツ（{section.content.length}/60文字）
          </label>
          <textarea
            value={section.content}
            onChange={(e) => updateSection('content', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            placeholder="例：聞き手の興味を引く導入から、論理的な構成、効果的な締めくくりまで、プレゼンテーションの基本要素を解説します。"
            maxLength={60}
          />
        </div>

        {/* セクション詳細説明 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            セクション詳細説明（{section.description.length}/80文字）
          </label>
          <textarea
            value={section.description}
            onChange={(e) => updateSection('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
            placeholder="例：実践的なテクニックを身につけて、自信を持ってプレゼンテーションができるようになりましょう。"
            maxLength={80}
          />
        </div>
      </div>
    </div>
  )
}