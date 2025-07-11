'use client'

import { useState } from 'react'
import NewFlowPostGenerator from './components/NewFlowPostGenerator'
import Header from './components/Header'

export default function Home() {
  // 新フローのみ使用 - 従来フローの全てのステート管理は削除
  const resetFlow = () => {
    // リセット処理は新フロー内で処理
  }

  // 新フローのみを使用
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <NewFlowPostGenerator onBack={resetFlow} onReset={resetFlow} />
      </main>
    </div>
  )
}