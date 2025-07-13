'use client'

import { useState } from 'react'
import NewFlowPostGenerator from './components/NewFlowPostGenerator'
import Header from './components/Header'

export default function Home() {
  // 新フローのみを使用
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <NewFlowPostGenerator />
      </main>
    </div>
  )
}