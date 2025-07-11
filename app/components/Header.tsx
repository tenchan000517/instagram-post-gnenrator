'use client'

import { Sparkles, Target, Users } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-heading">
                FIND to DO
              </h1>
              <p className="text-sm text-gray-600">
                Instagram投稿作成システム
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-find-blue" />
              <span>SNS戦略</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-find-green" />
              <span>学生成長支援</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-find-blue/10 to-find-purple/10 rounded-xl">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold">学習完了✅</span> 
            12章のInstagramコース戦略を基に、学生の「何もない」を「これがある」に変える投稿を自動生成します
          </p>
        </div>
      </div>
    </header>
  )
}