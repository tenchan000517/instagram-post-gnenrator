'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
// React Icons
import * as MaterialIcons from 'react-icons/md'
import * as FontAwesome from 'react-icons/fa'
import * as Heroicons from 'react-icons/hi'
import * as BootstrapIcons from 'react-icons/bs'

// アイコンライブラリの定義
type IconLibrary = 'lucide' | 'material' | 'fontawesome' | 'heroicons' | 'bootstrap'

interface IconData {
  name: string
  library: IconLibrary
  component?: React.ComponentType<any>
}

// よく使用されるアイコンをカテゴリ別に整理
const iconCategories: Record<string, IconData[]> = {
  'ビジネス・仕事 (Lucide)': [
    { name: 'Briefcase', library: 'lucide' },
    { name: 'Building', library: 'lucide' },
    { name: 'Users', library: 'lucide' },
    { name: 'User', library: 'lucide' },
    { name: 'UserCheck', library: 'lucide' },
    { name: 'Target', library: 'lucide' },
    { name: 'TrendingUp', library: 'lucide' },
    { name: 'BarChart3', library: 'lucide' },
    { name: 'Calendar', library: 'lucide' },
    { name: 'Clock', library: 'lucide' }
  ],
  'チェック・確認 (Lucide)': [
    { name: 'Check', library: 'lucide' },
    { name: 'CheckCircle', library: 'lucide' },
    { name: 'CheckSquare', library: 'lucide' },
    { name: 'CheckCircle2', library: 'lucide' },
    { name: 'Square', library: 'lucide' },
    { name: 'Circle', library: 'lucide' },
    { name: 'X', library: 'lucide' },
    { name: 'XCircle', library: 'lucide' }
  ],
  '数字 (Material Design)': [
    { name: 'MdLooks1', library: 'material' },
    { name: 'MdLooks2', library: 'material' },
    { name: 'MdLooks3', library: 'material' },
    { name: 'MdLooks4', library: 'material' },
    { name: 'MdLooks5', library: 'material' },
    { name: 'MdLooks6', library: 'material' },
    { name: 'MdLooksOne', library: 'material' },
    { name: 'MdLooksTwo', library: 'material' },
    { name: 'MdFilter1', library: 'material' },
    { name: 'MdFilter2', library: 'material' },
    { name: 'MdFilter3', library: 'material' },
    { name: 'MdFilter4', library: 'material' },
    { name: 'MdFilter5', library: 'material' },
    { name: 'MdFilter6', library: 'material' },
    { name: 'MdFilter7', library: 'material' },
    { name: 'MdFilter8', library: 'material' },
    { name: 'MdFilter9', library: 'material' }
  ],
  'チェック・確認 (Font Awesome)': [
    { name: 'FaCheck', library: 'fontawesome' },
    { name: 'FaCheckCircle', library: 'fontawesome' },
    { name: 'FaCheckSquare', library: 'fontawesome' },
    { name: 'FaTimes', library: 'fontawesome' },
    { name: 'FaTimesCircle', library: 'fontawesome' },
    { name: 'FaExclamationTriangle', library: 'fontawesome' },
    { name: 'FaInfoCircle', library: 'fontawesome' }
  ],
  'ビジネス (Font Awesome)': [
    { name: 'FaBriefcase', library: 'fontawesome' },
    { name: 'FaBuilding', library: 'fontawesome' },
    { name: 'FaUsers', library: 'fontawesome' },
    { name: 'FaUser', library: 'fontawesome' },
    { name: 'FaUserCheck', library: 'fontawesome' },
    { name: 'FaChartLine', library: 'fontawesome' },
    { name: 'FaCalendarAlt', library: 'fontawesome' },
    { name: 'FaClock', library: 'fontawesome' }
  ],
  '学習・教育 (Lucide)': [
    { name: 'BookOpen', library: 'lucide' },
    { name: 'Book', library: 'lucide' },
    { name: 'GraduationCap', library: 'lucide' },
    { name: 'School', library: 'lucide' },
    { name: 'Library', library: 'lucide' },
    { name: 'PenTool', library: 'lucide' },
    { name: 'Lightbulb', library: 'lucide' },
    { name: 'Brain', library: 'lucide' }
  ]
}

export default function LucideIconViewer() {
  const [currentCategory, setCurrentCategory] = useState<string>('ビジネス・仕事 (Lucide)')
  const [selectedIcon, setSelectedIcon] = useState<IconData>({ name: 'Briefcase', library: 'lucide' })
  
  const categories = Object.keys(iconCategories)
  const currentIndex = categories.findIndex(cat => cat === currentCategory)
  const currentIcons = iconCategories[currentCategory as keyof typeof iconCategories]
  
  const goToPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1
    setCurrentCategory(categories[prevIndex])
    setSelectedIcon(iconCategories[categories[prevIndex]][0])
  }
  
  const goToNext = () => {
    const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0
    setCurrentCategory(categories[nextIndex])
    setSelectedIcon(iconCategories[categories[nextIndex]][0])
  }
  
  const getIconComponent = (iconData: IconData, className: string = "w-8 h-8") => {
    let IconComponent
    switch (iconData.library) {
      case 'lucide':
        IconComponent = (LucideIcons as any)[iconData.name]
        break
      case 'material':
        IconComponent = (MaterialIcons as any)[iconData.name]
        break
      case 'fontawesome':
        IconComponent = (FontAwesome as any)[iconData.name]
        break
      case 'heroicons':
        IconComponent = (Heroicons as any)[iconData.name]
        break
      case 'bootstrap':
        IconComponent = (BootstrapIcons as any)[iconData.name]
        break
      default:
        return null
    }
    return IconComponent ? <IconComponent className={className} /> : null
  }
  
  const getLibraryBadgeColor = (library: IconLibrary) => {
    switch (library) {
      case 'lucide': return 'bg-blue-100 text-blue-800'
      case 'material': return 'bg-green-100 text-green-800'
      case 'fontawesome': return 'bg-purple-100 text-purple-800'
      case 'heroicons': return 'bg-orange-100 text-orange-800'
      case 'bootstrap': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            アイコンライブラリビューワー
          </h1>
          <p className="text-gray-600">
            Lucide React + React Icons - テンプレートで使用可能なアイコンを確認
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Lucide</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Material Design</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Font Awesome</span>
          </div>
        </div>
        
        {/* カテゴリ選択 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {currentCategory}
              </h2>
              <p className="text-gray-600 text-sm">
                {currentIcons.length}個のアイコン
              </p>
            </div>
            
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* カテゴリ選択ボタン */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setCurrentCategory(category)
                  setSelectedIcon(iconCategories[category as keyof typeof iconCategories][0])
                }}
                className={`p-2 rounded-lg border text-sm transition-all ${
                  currentCategory === category
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* メインプレビューエリア */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* 大きな表示 */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                選択中のアイコン: {selectedIcon}
              </h3>
              <div className="flex justify-center items-center mb-4">
                <div className="w-32 h-32 bg-blue-50 rounded-xl flex items-center justify-center border-2 border-blue-200">
                  <div className="text-blue-600" style={{ fontSize: '4rem' }}>
                    {getIconComponent(selectedIcon)}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">インポート方法:</p>
                <code className="text-xs bg-white p-2 rounded border block">
                  import {'{ ' + selectedIcon + ' }'} from 'lucide-react'
                </code>
              </div>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">使用例:</p>
                <code className="text-xs bg-white p-2 rounded border block">
                  {'<' + selectedIcon + ' className="w-6 h-6 text-blue-500" />'}
                </code>
              </div>
            </div>
          </div>
          
          {/* サイズバリエーション */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              サイズバリエーション
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-blue-600">
                  {React.createElement((LucideIcons as any)[selectedIcon], { className: "w-4 h-4" })}
                </div>
                <span className="text-sm">w-4 h-4 (16px)</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-blue-600">
                  {React.createElement((LucideIcons as any)[selectedIcon], { className: "w-5 h-5" })}
                </div>
                <span className="text-sm">w-5 h-5 (20px)</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-blue-600">
                  {React.createElement((LucideIcons as any)[selectedIcon], { className: "w-6 h-6" })}
                </div>
                <span className="text-sm">w-6 h-6 (24px) - 推奨</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-blue-600">
                  {React.createElement((LucideIcons as any)[selectedIcon], { className: "w-8 h-8" })}
                </div>
                <span className="text-sm">w-8 h-8 (32px)</span>
              </div>
            </div>
            
            <h4 className="text-md font-medium text-gray-800 mt-6 mb-3">
              カラーバリエーション
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div className="text-blue-500">
                  {React.createElement((LucideIcons as any)[selectedIcon], { className: "w-5 h-5" })}
                </div>
                <span className="text-xs">blue-500</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div className="text-green-500">
                  {React.createElement((LucideIcons as any)[selectedIcon], { className: "w-5 h-5" })}
                </div>
                <span className="text-xs">green-500</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div className="text-red-500">
                  {React.createElement((LucideIcons as any)[selectedIcon], { className: "w-5 h-5" })}
                </div>
                <span className="text-xs">red-500</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <div className="text-gray-600">
                  {React.createElement((LucideIcons as any)[selectedIcon], { className: "w-5 h-5" })}
                </div>
                <span className="text-xs">gray-600</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* アイコン一覧 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {currentCategory} のアイコン一覧
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
            {currentIcons.map((iconName) => (
              <button
                key={iconName}
                onClick={() => setSelectedIcon(iconName)}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  selectedIcon === iconName
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                title={iconName}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`${selectedIcon === iconName ? 'text-blue-600' : 'text-gray-600'}`}>
                    {getSmallIconComponent(iconName)}
                  </div>
                  <span className="text-xs text-gray-500 text-center break-all">
                    {iconName}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}