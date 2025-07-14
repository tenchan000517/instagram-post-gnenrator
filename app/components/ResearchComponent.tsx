'use client'

import { useState } from 'react'
import { getGeminiModel } from '../services/geminiClientSingleton'

// research-themes.jsonの型定義
interface Theme {
  id: string
  title: string
  category: string
  description: string
}

interface GenreData {
  name: string
  description: string
  themes: Theme[]
}

interface ResearchThemes {
  [key: string]: GenreData
}

interface ResearchResult {
  result: string
  error?: string
}

interface SavedResearchResult {
  themeId: string
  themeTitle: string
  genreId: string
  researchResult: string
  timestamp: number
  expiresAt: number
}

export default function ResearchComponent() {
  const [researchThemes, setResearchThemes] = useState<ResearchThemes | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [selectedTheme, setSelectedTheme] = useState<string>('')
  const [researchResult, setResearchResult] = useState<ResearchResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingThemes, setIsLoadingThemes] = useState(false)
  const [savedResults, setSavedResults] = useState<SavedResearchResult[]>([])

  // 保存された結果の読み込み
  const loadSavedResults = () => {
    try {
      const saved = localStorage.getItem('saved_research_results')
      if (saved) {
        const results: SavedResearchResult[] = JSON.parse(saved)
        // 期限切れの結果を削除
        const validResults = results.filter(result => result.expiresAt > Date.now())
        setSavedResults(validResults)
        
        // 期限切れがあった場合は保存し直す
        if (validResults.length !== results.length) {
          localStorage.setItem('saved_research_results', JSON.stringify(validResults))
        }
      }
    } catch (error) {
      console.error('保存された結果の読み込みエラー:', error)
    }
  }

  // テーマデータの読み込み
  const loadThemes = async () => {
    if (researchThemes) return // 既に読み込み済み

    setIsLoadingThemes(true)
    try {
      const response = await fetch('/research-themes.json')
      if (!response.ok) {
        throw new Error('テーマデータの読み込みに失敗しました')
      }
      const themes = await response.json()
      setResearchThemes(themes)
      loadSavedResults() // テーマ読み込み後に保存結果も読み込む
    } catch (error) {
      console.error('テーマ読み込みエラー:', error)
      alert('テーマデータの読み込みに失敗しました')
    } finally {
      setIsLoadingThemes(false)
    }
  }

  // リサーチプロンプトの生成
  const generateResearchPrompt = (themeTitle: string, themeDescription: string) => {
    return `【リサーチ指示】

以下のテーマについて、Instagram投稿作成に必要な詳細で実践的な情報をリサーチしてください。

【テーマ】: ${themeTitle}
【概要】: ${themeDescription}

【リサーチ要件】
1. **具体的な統計データ・数値情報**
   - 最新の調査結果、パーセンテージ、ランキング情報
   - 信頼できる機関（厚労省、経産省、大手調査会社等）のデータ

2. **専門家の見解・アドバイス**
   - 業界専門家、キャリアコンサルタント、採用担当者のコメント
   - 実際の成功事例とその背景

3. **具体的な実践方法・手順**
   - ステップバイステップの方法論
   - 実際に使えるテンプレートやフレームワーク

4. **失敗パターンと回避策**
   - よくある間違いとその対処法
   - 注意すべきポイント

5. **最新トレンド・変化**
   - 2024-2025年の最新動向
   - コロナ後の変化、AI時代の影響

【出力形式】
- 情報源を明記した詳細な内容
- 固有名詞、数値、日付を正確に記載
- 実践で使える具体的な情報を中心に
- 推測や憶測は避け、事実ベースの情報のみ

【重要】
- 存在しない情報は作らない
- 「〜と言われています」等の曖昧な表現は避ける
- 具体的で検証可能な情報を優先
- 最新性を重視（2024年以降の情報を優先）

このテーマについて、上記要件を満たす詳細なリサーチ結果を提供してください。`
  }

  // リサーチ実行
  const handleResearch = async () => {
    if (!selectedTheme) {
      alert('テーマを選択してください')
      return
    }

    const selectedThemeData = getSelectedThemeData()
    if (!selectedThemeData) {
      alert('選択されたテーマのデータが見つかりません')
      return
    }

    setIsLoading(true)
    setResearchResult(null)

    try {
      const model = getGeminiModel()
      const prompt = generateResearchPrompt(selectedThemeData.title, selectedThemeData.description)
      
      console.log('🔍 リサーチプロンプト:', prompt)
      
      const result = await model.generateContent(prompt)
      const response = await result.response
      const researchText = response.text()
      
      console.log('✅ リサーチ結果:', researchText)
      
      setResearchResult({ result: researchText })
      
      // 結果を保存
      saveResearchResult(selectedTheme, selectedThemeData.title, selectedGenre, researchText)
    } catch (error: any) {
      console.error('❌ リサーチエラー:', error)
      
      let errorMessage = 'リサーチ処理に失敗しました'
      if (error?.message?.includes('quota') || error?.message?.includes('429')) {
        errorMessage = 'Gemini APIの制限に達しました。しばらく時間をおいてから再度お試しください。'
      }
      
      setResearchResult({ result: '', error: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  // 選択されたテーマデータを取得
  const getSelectedThemeData = () => {
    if (!researchThemes || !selectedGenre || !selectedTheme) return null
    
    const genre = researchThemes[selectedGenre]
    if (!genre) return null
    
    return genre.themes.find(theme => theme.id === selectedTheme) || null
  }

  // リサーチ結果を保存
  const saveResearchResult = (themeId: string, themeTitle: string, genreId: string, result: string) => {
    try {
      const newResult: SavedResearchResult = {
        themeId,
        themeTitle,
        genreId,
        researchResult: result,
        timestamp: Date.now(),
        expiresAt: Date.now() + (60 * 24 * 60 * 60 * 1000) // 60日間有効
      }
      
      // 既存の結果を更新または追加
      const updatedResults = savedResults.filter(r => r.themeId !== themeId)
      updatedResults.push(newResult)
      
      setSavedResults(updatedResults)
      localStorage.setItem('saved_research_results', JSON.stringify(updatedResults))
      
      console.log('✅ リサーチ結果を保存しました:', themeTitle)
    } catch (error) {
      console.error('❌ リサーチ結果の保存エラー:', error)
    }
  }

  // 保存された結果を読み込み
  const loadSavedResult = (themeId: string) => {
    const saved = savedResults.find(r => r.themeId === themeId)
    if (saved) {
      setResearchResult({ result: saved.researchResult })
      console.log('✅ 保存された結果を読み込みました:', saved.themeTitle)
    }
  }

  // テーマが保存済みかチェック
  const isSaved = (themeId: string) => {
    return savedResults.some(r => r.themeId === themeId)
  }

  // フォーマッターに転送
  const handleSendToFormatter = () => {
    if (researchResult?.result) {
      // LocalStorageに保存
      localStorage.setItem('research_data', researchResult.result)
      localStorage.setItem('research_data_timestamp', Date.now().toString())
      
      // フォーマッターページを開く
      window.open('/research-formatter', '_blank')
    }
  }

  // コピー機能
  const handleCopy = () => {
    if (researchResult?.result) {
      navigator.clipboard.writeText(researchResult.result)
      alert('リサーチ結果をコピーしました！')
    }
  }

  // ダウンロード機能（MD形式）
  const downloadAsMarkdown = () => {
    if (!researchResult?.result) return
    
    const selectedThemeData = getSelectedThemeData()
    if (!selectedThemeData) return
    
    const content = `# ${selectedThemeData.title}

**カテゴリー**: ${selectedThemeData.category}
**概要**: ${selectedThemeData.description}
**リサーチ日時**: ${new Date().toLocaleString('ja-JP')}

---

${researchResult.result}`
    
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedThemeData.title.replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '_')}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ダウンロード機能（TXT形式）
  const downloadAsText = () => {
    if (!researchResult?.result) return
    
    const selectedThemeData = getSelectedThemeData()
    if (!selectedThemeData) return
    
    const content = `${selectedThemeData.title}

カテゴリー: ${selectedThemeData.category}
概要: ${selectedThemeData.description}
リサーチ日時: ${new Date().toLocaleString('ja-JP')}

${'='.repeat(50)}

${researchResult.result}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedThemeData.title.replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '_')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          🔍 就活テーマリサーチャー
        </h1>
        <p className="text-gray-600 mb-6">
          厳選された就活テーマについて詳細なリサーチを実行します。結果はフォーマッターでInstagram投稿用に最適化できます。
        </p>

        {/* テーマ読み込みボタン */}
        {!researchThemes && (
          <div className="mb-6">
            <button
              onClick={loadThemes}
              disabled={isLoadingThemes}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoadingThemes ? '📚 テーマデータ読み込み中...' : '📚 テーマデータを読み込む'}
            </button>
          </div>
        )}

        {/* ジャンル選択 */}
        {researchThemes && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              📋 ジャンル選択
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(researchThemes).map(([genreId, genreData]) => (
                <label key={genreId} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="genre"
                    value={genreId}
                    checked={selectedGenre === genreId}
                    onChange={(e) => {
                      setSelectedGenre(e.target.value)
                      setSelectedTheme('') // テーマ選択をリセット
                    }}
                    className="mt-1 text-blue-600"
                  />
                  <div>
                    <div className="font-medium text-gray-800">{genreData.name}</div>
                    <div className="text-sm text-gray-600">{genreData.description}</div>
                    <div className="text-xs text-gray-500 mt-1">{genreData.themes.length}テーマ</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* テーマ選択 */}
        {selectedGenre && researchThemes && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              🎯 テーマ選択 ({researchThemes[selectedGenre].name})
            </label>
            <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto border rounded-lg p-3">
              {researchThemes[selectedGenre].themes.map((theme) => (
                <label key={theme.id} className="flex items-start space-x-3 p-2 rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="theme"
                    value={theme.id}
                    checked={selectedTheme === theme.id}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="mt-1 text-blue-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-gray-800 text-sm">{theme.title}</div>
                      {isSaved(theme.id) && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          💾 保存済み
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">{theme.description}</div>
                    <div className="text-xs text-blue-600 mt-1">{theme.category}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* リサーチ実行ボタン */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleResearch}
            disabled={isLoading || !selectedTheme}
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '🔄 リサーチ中...' : (selectedTheme && isSaved(selectedTheme) ? '🔄 再リサーチ実行' : '🔍 リサーチ実行')}
          </button>
          
          {/* 保存済み結果読み込みボタン */}
          {selectedTheme && isSaved(selectedTheme) && (
            <button
              onClick={() => loadSavedResult(selectedTheme)}
              disabled={isLoading}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              💾 保存済み結果を読み込む
            </button>
          )}
        </div>

        {/* リサーチ結果 */}
        {researchResult && (
          <div className="space-y-4">
            {researchResult.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800 font-medium mb-2">❌ エラー</div>
                <div className="text-red-700">{researchResult.error}</div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-800">✅ リサーチ結果</h3>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={handleCopy}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                    >
                      📋 コピー
                    </button>
                    <button
                      onClick={handleSendToFormatter}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      🔄 フォーマッターに送る
                    </button>
                    <button
                      onClick={downloadAsMarkdown}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                    >
                      📥 MD形式で保存
                    </button>
                    <button
                      onClick={downloadAsText}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                    >
                      📄 TXT形式で保存
                    </button>
                  </div>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-white p-4 rounded border max-h-96 overflow-y-auto">
                  {researchResult.result}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 使用方法の説明 */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-green-800 mb-3">📖 使用方法</h3>
        <div className="space-y-2 text-green-700">
          <div>1. <strong>テーマデータ読み込み</strong>: 176の厳選されたテーマを読み込み</div>
          <div>2. <strong>ジャンル選択</strong>: 7つのジャンルから興味のある分野を選択</div>
          <div>3. <strong>テーマ選択</strong>: 具体的なリサーチテーマを選択</div>
          <div>4. <strong>リサーチ実行</strong>: AIが詳細なリサーチを実行（保存済みの場合は再リサーチ）</div>
          <div>5. <strong>結果活用</strong>: リサーチ結果をコピー、フォーマッター送信、またはローカル保存</div>
        </div>
      </div>
      
      {/* 保存機能の注意書き */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-yellow-800 mb-3">💾 保存機能について</h3>
        <div className="space-y-2 text-yellow-700">
          <div>• <strong>自動保存</strong>: リサーチ結果は自動的にブラウザに保存されます</div>
          <div>• <strong>保存期間</strong>: 60日間保存され、期限後は自動削除されます</div>
          <div>• <strong>ローカル保存</strong>: MD/TXT形式でダウンロード可能（永続保存）</div>
          <div>• <strong>再リサーチ</strong>: 保存済みテーマでも最新情報で再実行可能</div>
        </div>
      </div>
    </div>
  )
}