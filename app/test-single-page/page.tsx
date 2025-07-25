'use client'

import { useState } from 'react'
import { ContentGeneratorService } from '../services/contentGeneratorService'
import { templateComponents } from '../components/templates'
import Viewport from '../components/Viewport'

export default function TestSinglePage() {
  const [generatedPage, setGeneratedPage] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedPage, setSelectedPage] = useState(1)

  const testK115Page = async (pageNumber: number) => {
    setIsLoading(true)
    setError('')
    
    try {
      // K115.jsonを読み込み (既存システムと同じ動的インポート)
      const module = await import(`../data/knowledgeBase/knowledge/K115.json`)
      const k115Data = module.default || module
      
      console.log('='.repeat(50))
      console.log(`🧪 K115 Page${pageNumber} テスト開始`)
      console.log('='.repeat(50))
      console.log('K115データ:', k115Data)
      console.log(`ページ${pageNumber}の構造:`, k115Data.detailedContent[`page${pageNumber}`])
      
      // 本番と同じフロー：ContentGeneratorServiceを使用
      const contentGenerator = new ContentGeneratorService()
      const generatedContent = await contentGenerator.generateHighQualityContent("副業や複業で失敗続きで何をすれば良いかわからない", {
        typeId: k115Data.postType,
        targetId: 'T001', // デフォルト値
        useKnowledgeBase: true,
        knowledgeContents: [k115Data]
      })
      
      console.log('🏗️ ContentGeneratorService結果:', generatedContent)
      
      // 該当ページを取得
      const targetPage = generatedContent.pages.find(p => p.pageNumber === pageNumber)
      if (!targetPage) {
        throw new Error(`Page ${pageNumber} not found in generated content`)
      }
      
      console.log('📋 Page', pageNumber, 'の生成結果:', targetPage)
      console.log('📋 使用されたテンプレート:', targetPage.templateType)
      
      // 生成成功の場合、結果を設定
      const pageKey = `page${pageNumber}`
      const pageStructure = k115Data.detailedContent[pageKey as keyof typeof k115Data.detailedContent]
      
      console.log('📊 K115ページ構造:', pageStructure)
      console.log('🔍 Pageのcontent詳細:', JSON.stringify(pageStructure?.content, null, 2))
      console.log('🎯 生成されたテンプレートデータ:', targetPage.templateData)
      
      setGeneratedPage(targetPage.templateData)
      setSelectedTemplate(targetPage.templateType)
      
    } catch (err) {
      console.error('❌ テストエラー:', err)
      setError(err instanceof Error ? err.message : '不明なエラー')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">K115 失敗エピソード テスト</h1>
        
        {/* テスト設定 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">テスト設定</h2>
          
          <div className="flex gap-4 items-center mb-4">
            <label className="font-medium">テストページ:</label>
            <select 
              value={selectedPage} 
              onChange={(e) => setSelectedPage(Number(e.target.value))}
              className="border rounded px-3 py-2"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>Page {num}</option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={() => testK115Page(selectedPage)} 
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? '生成中...' : `K115 Page${selectedPage} 生成テスト`}
          </button>
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-red-800">エラー</h3>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* 生成結果表示 */}
        {generatedPage && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">生成結果</h2>
            
            {/* 生成されたコンテンツの詳細 */}
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">生成データ (JSON)</h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(generatedPage, null, 2)}
              </pre>
            </div>

            {/* テンプレート選択結果 */}
            {selectedTemplate && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-green-800 mb-2">🎯 実際のテンプレート選択結果</h3>
                <p className="text-green-700">選択されたテンプレート: <span className="font-mono font-bold">{selectedTemplate}</span></p>
              </div>
            )}

            {/* テンプレート表示 */}
            <div className="border rounded-lg overflow-hidden">
              <h3 className="font-semibold p-4 bg-gray-100">テンプレート表示</h3>
              <div className="p-4 flex justify-center">
                <Viewport width={400} height={400}>
                  {(() => {
                    // 実際のシステムと同じテンプレート選択ロジックを使用
                    const templateType = selectedTemplate || 'failure_story_intro'
                    const TemplateComponent = templateComponents[templateType]
                    
                    console.log('🎨 使用テンプレート:', templateType)
                    
                    if (!TemplateComponent) {
                      return (
                        <div className="p-8 text-center text-red-600">
                          <h3 className="text-lg font-bold mb-2">テンプレートが見つかりません</h3>
                          <p>{templateType} テンプレートが登録されていません</p>
                          <p className="mt-2 text-sm">選択されたテンプレート: {selectedTemplate}</p>
                        </div>
                      )
                    }
                    
                    return (
                      <TemplateComponent data={generatedPage} />
                    )
                  })()}
                </Viewport>
              </div>
            </div>
          </div>
        )}
        
        {/* 期待される構造の説明 */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">期待される K113 構造</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Page 1:</strong> section="intro", template="basic_intro"</p>
            <p><strong>Page 2-7:</strong> section="mainContent", template="feature_parallel_info"</p>
            <p><strong>Page 8:</strong> section="summary", template="basic_summary"</p>
          </div>
        </div>
      </div>
    </div>
  )
}