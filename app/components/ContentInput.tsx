'use client'

import { useState } from 'react'
import { FileText, Send, Lightbulb } from 'lucide-react'

interface ContentInputProps {
  onSubmit: (content: string) => void
}

export default function ContentInput({ onSubmit }: ContentInputProps) {
  const [content, setContent] = useState('')
  const [postType, setPostType] = useState<'reel' | 'story' | 'feed'>('reel')

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content)
    }
  }

  const exampleContents = {
    reel: [
      "大学生活で何もしていない学生が、3ヶ月でエンジニア内定を獲得した体験談",
      "就活で後悔する学生の共通点と対策方法",
      "文系からデザイナーになるための具体的なステップ"
    ],
    story: [
      "プロジェクトメンバーの成長ストーリー",
      "Discord コミュニティの日常風景",
      "メンターからの学生へのメッセージ"
    ],
    feed: [
      "Webアプリ開発プロジェクトの詳細な成果報告",
      "プログラミング初心者が3ヶ月でスキルアップする方法",
      "企業との連携プロジェクト事例紹介"
    ]
  }

  return (
    <div className="space-y-6">
      {/* 投稿タイプ選択 */}
      <div className="post-preview">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-find-blue" />
          投稿タイプを選択
        </h2>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(['reel', 'story', 'feed'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setPostType(type)}
              className={`p-4 rounded-xl border-2 transition-all ${
                postType === type
                  ? 'border-find-blue bg-find-blue/10 text-find-blue'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <div className="font-medium capitalize mb-1">
                  {type === 'reel' && 'リール'}
                  {type === 'story' && 'ストーリー'}
                  {type === 'feed' && 'フィード'}
                </div>
                <div className="text-xs text-gray-600">
                  {type === 'reel' && '15-30秒動画'}
                  {type === 'story' && '24時間限定'}
                  {type === 'feed' && '詳細投稿'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* コンテンツ入力 */}
      <div className="post-preview">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          投稿したい内容を入力してください
        </h2>
        
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`${postType === 'reel' ? 'リール' : postType === 'story' ? 'ストーリー' : 'フィード'}投稿の内容やアイデアを入力してください...`}
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
            <span>戦略分析へ進む</span>
          </button>
        </div>
      </div>

      {/* 例文表示 */}
      <div className="post-preview">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <Lightbulb className="w-5 h-5 mr-2 text-find-orange" />
          {postType === 'reel' && 'リール'}
          {postType === 'story' && 'ストーリー'}
          {postType === 'feed' && 'フィード'}
          投稿の例
        </h3>
        
        <div className="space-y-3">
          {exampleContents[postType].map((example, index) => (
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
            FIND to DO の価値（実践的成長支援・企業連携・仲間作り）を含む内容ほど、
            効果的な投稿が作成されます
          </p>
        </div>
      </div>
    </div>
  )
}