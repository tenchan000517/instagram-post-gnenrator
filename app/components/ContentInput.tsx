'use client'

import { useState } from 'react'
import { FileText, Send, Lightbulb } from 'lucide-react'

interface ContentInputProps {
  onSubmit: (content: string) => void
}

export default function ContentInput({ onSubmit }: ContentInputProps) {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
    }
  }

  const exampleContents = [
    "大学生活で何もしていない学生が、3ヶ月でエンジニア内定を獲得した体験談",
    "就活で後悔する学生の共通点と対策方法",
    "文系からデザイナーになるための具体的なステップ",
    "インターンシップの選考に通るためのポートフォリオ作成法",
    "面接で好印象を与える逆質問の例とその理由",
    "内定承諾前に確認すべき企業の重要ポイント",
    "ES通過率を上げるための文章構成テクニック",
    "長期インターンで実際に身につくスキルとは",
    "IT企業のインターンシップ選考を突破するコツ",
    "自己分析で見つかる本当の強みと弱みの活かし方"
  ]

  return (
    <div className="space-y-6">

      {/* コンテンツ入力 */}
      <div className="post-preview">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-find-blue" />
          投稿したい内容を入力してください
        </h2>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="投稿内容のテーマやアイデアを入力してください..."
          className="input-field h-48 resize-none"
        />
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {content.length} / 1000文字
          </div>
          <button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>AIコンテンツ生成へ進む</span>
          </button>
        </div>
      </div>

      {/* 例文表示 */}
      <div className="post-preview">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-find-orange" />
          コンテンツ例
        </h3>
        
        <div className="space-y-3">
          {exampleContents.map((example, index) => (
            <div
              key={index}
              onClick={() => setContent(example)}
              className="p-3 border border-gray-200 rounded-lg hover:border-find-blue cursor-pointer transition-colors"
            >
              <p className="text-gray-700 text-sm">{example}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <span className="font-medium">ヒント：</span>
            具体的で実践的な内容ほど、高品質なInstagram投稿が生成されます。
            事実に基づいた内容を入力してください。
          </p>
        </div>
      </div>
    </div>
  )
}