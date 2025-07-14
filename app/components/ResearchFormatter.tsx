'use client'

import { useState, useEffect } from 'react'
import { getGeminiModel } from '../services/geminiClientSingleton'

interface FormattedResult {
  formatted: string
  error?: string
}

interface GenreConfig {
  id: string
  name: string
  description: string
  template: string
  outputFormat: string
  specificRules: string[]
}

export default function ResearchFormatter() {
  const [researchInput, setResearchInput] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('knowhow')
  const [formattedResult, setFormattedResult] = useState<FormattedResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // URLパラメータまたはLocalStorageから入力データを取得
  useEffect(() => {
    // URLパラメータをチェック
    const urlParams = new URLSearchParams(window.location.search)
    const inputData = urlParams.get('input')
    if (inputData) {
      setResearchInput(decodeURIComponent(inputData))
      return
    }

    // LocalStorageをチェック
    const researchData = localStorage.getItem('research_data')
    const timestamp = localStorage.getItem('research_data_timestamp')
    
    if (researchData && timestamp) {
      // データが5分以内の場合のみ使用
      const dataAge = Date.now() - parseInt(timestamp)
      if (dataAge < 5 * 60 * 1000) { // 5分
        setResearchInput(researchData)
        // 使用後にLocalStorageをクリア
        localStorage.removeItem('research_data')
        localStorage.removeItem('research_data_timestamp')
      }
    }
  }, [])

  const genreConfigs: GenreConfig[] = [
    {
      id: 'knowhow',
      name: 'ノウハウ系',
      description: '実践的なテクニック・方法論',
      template: 'ステップ構成',
      outputFormat: `【ジャンル】: knowhow

[インデックスタイトル]：[ステップの有益性を表現する後半タイトル]

1. [ステップタイトル]
   [リサーチから得られた生の具体的な情報をそのまま記載]

2. [ステップタイトル]
   [リサーチから得られた生の具体的な情報をそのまま記載]

3. [ステップタイトル]
   [リサーチから得られた生の具体的な情報をそのまま記載]

4. [ステップタイトル]
   [リサーチから得られた生の具体的な情報をそのまま記載]

5. [ステップタイトル]
   [リサーチから得られた生の具体的な情報をそのまま記載]`,
      specificRules: [
        'リサーチ結果から実践的な4-5ステップを抽出',
        '論理的順序: 基礎→実践→応用→確認の流れで整理',
        '成功事例・ベストプラクティスから実践的手法を抽出',
        '失敗パターン・注意点を回避する方法として組み込み',
        '各ステップは独立して実行可能',
        '初心者でも理解できる表現'
      ]
    },
    {
      id: 'book-recommendation',
      name: '書籍紹介系',
      description: '書籍・参考資料の推薦',
      template: '表形式',
      outputFormat: `【ジャンル】: book-recommendation

[インデックスタイトル]：[書籍情報の有益性を表現する後半タイトル]

## 表1: [カテゴリ名]（1-5位）
| 書名 | 著者 | 一言要約 |
|------|------|----------|
| [書名] | [著者名] | [25文字以内の要約] |

## 表2: [カテゴリ名]（6-10位）
| 書名 | 著者 | 一言要約 |
|------|------|----------|
| [書名] | [著者名] | [25文字以内の要約] |`,
      specificRules: [
        'リサーチ結果から書籍情報を抽出し、5冊単位で整理',
        '著者名と書名は正確に記載',
        '専門家の推薦理由を要約に含める',
        '5冊ずつの表で自動分割対応',
        '存在しない書籍情報を作らない'
      ]
    },
    {
      id: 'internship-deadline',
      name: 'インターン締切系',
      description: 'インターン応募の締切情報',
      template: '表形式',
      outputFormat: `【ジャンル】: internship-deadline

[インデックスタイトル]：[締切情報の有益性を表現する後半タイトル]

## 表1: [期間別カテゴリ]（1-5位）
| 企業名 | 締切日 | 応募条件 |
|--------|--------|---------|
| [企業名] | [締切日] | [25文字以内の条件] |

## 表2: [期間別カテゴリ]（6-10位）
| 企業名 | 締切日 | 応募条件 |
|--------|--------|---------|
| [企業名] | [締切日] | [25文字以内の条件] |`,
      specificRules: [
        'リサーチ結果から締切情報を抽出し、5社単位で整理',
        '締切日は正確に記載（年月日形式）',
        '応募条件は簡潔に要約',
        '期間別（夏季・冬季など）でカテゴリ分け',
        '存在しない締切情報を作らない'
      ]
    },
    {
      id: 'entry-deadline',
      name: 'エントリー締切系',
      description: '本選考エントリーの締切情報',
      template: '表形式',
      outputFormat: `【ジャンル】: entry-deadline

[インデックスタイトル]：[締切情報の有益性を表現する後半タイトル]

## 表1: [業界別カテゴリ]（1-5位）
| 企業名 | 締切日 | 選考プロセス |
|--------|--------|-----------|
| [企業名] | [締切日] | [25文字以内の選考情報] |

## 表2: [業界別カテゴリ]（6-10位）
| 企業名 | 締切日 | 選考プロセス |
|--------|--------|-----------|
| [企業名] | [締切日] | [25文字以内の選考情報] |`,
      specificRules: [
        'リサーチ結果から本選考締切情報を抽出し、5社単位で整理',
        '締切日は正確に記載（年月日形式）',
        '選考プロセスは簡潔に要約',
        '業界別でカテゴリ分け',
        '存在しない締切情報を作らない'
      ]
    },
    {
      id: 'industry-features',
      name: '業種特徴系',
      description: '業界・業種の特徴と比較',
      template: '対比構造',
      outputFormat: `【ジャンル】: industry-features

[インデックスタイトル]：[業界比較の有益性を表現する後半タイトル]

## 左カラム: [業界A]の特徴
- [特徴1]: [リサーチから得られた生の具体的な情報]
- [特徴2]: [リサーチから得られた生の具体的な情報]
- [特徴3]: [リサーチから得られた生の具体的な情報]

## 右カラム: [業界B]の特徴
- [特徴1]: [リサーチから得られた生の具体的な情報]
- [特徴2]: [リサーチから得られた生の具体的な情報]
- [特徴3]: [リサーチから得られた生の具体的な情報]`,
      specificRules: [
        '2つの業界・業種を左右で比較',
        '各業界の特徴を3-4個ずつ整理',
        '統計情報や具体的な数値を含める',
        '専門家の業界分析を根拠として使用',
        '対比構造を明確に表現'
      ]
    },
    {
      id: 'strategy',
      name: '対策系',
      description: '面接・ES・試験対策',
      template: 'チェックリスト構造',
      outputFormat: `【ジャンル】: strategy

[インデックスタイトル]！[対策方法の有益性を表現する後半タイトル]

□ [対策項目1]
  [リサーチから得られた生の具体的な準備方法]
  [失敗パターンの回避策]

□ [対策項目2]
  [リサーチから得られた生の具体的な準備方法]
  [失敗パターンの回避策]

□ [対策項目3]
  [リサーチから得られた生の具体的な準備方法]
  [失敗パターンの回避策]`,
      specificRules: [
        '4-6個の対策項目をチェックリスト形式で整理',
        '具体的な準備方法と注意点を含める',
        '専門家のアドバイスを根拠として組み込み',
        '成功事例から具体的な行動を抽出',
        '失敗パターンを回避方法として表現'
      ]
    },
    {
      id: 'step-learning',
      name: 'ステップ学習系',
      description: '段階的な学習プロセス',
      template: 'ステップ構成',
      outputFormat: `【ジャンル】: step-learning

[インデックスタイトル]：[学習ステップの有益性を表現する後半タイトル]

1. [学習ステップ1]
   [リサーチから得られた生の学習内容と方法]

2. [学習ステップ2]
   [リサーチから得られた生の学習内容と方法]

3. [学習ステップ3]
   [リサーチから得られた生の学習内容と方法]

4. [学習ステップ4]
   [リサーチから得られた生の学習内容と方法]

5. [学習ステップ5]
   [リサーチから得られた生の学習内容と方法]`,
      specificRules: [
        '段階的な学習プロセスを3-5ステップで構成',
        '基礎→応用→実践の流れで整理',
        '各ステップの学習目標を明確に設定',
        '実際の学習方法と教材を具体的に記載',
        '進捗確認の方法を含める'
      ]
    }
  ]

  const generateFormatPrompt = (genre: string, researchData: string) => {
    const genreConfig = genreConfigs.find(config => config.id === genre)
    if (!genreConfig) {
      // フォールバック: knowhow形式
      return generateDynamicPrompt(genreConfigs[0], researchData)
    }
    return generateDynamicPrompt(genreConfig, researchData)
  }

  const generateDynamicPrompt = (config: GenreConfig, researchData: string) => {
    const titleFormatExplanation = config.id === 'strategy' ? 
      '「[インデックスタイトル]！[有益性を表現する後半タイトル]」形式で、strategy系は「！」を使用' :
      '「[インデックスタイトル]：[有益性を表現する後半タイトル]」形式で、「：」を使用'

    return `【リサーチ結果フォーマット変換指示】

以下の詳細なリサーチ結果を、Instagram投稿生成システム用の${config.name}フォーマットに変換してください。

【入力】: ${researchData}

【変換要件】
1. **ジャンル指定**: 冒頭に「【ジャンル】: ${config.id}」を必ず記載
2. **タイトル形式**: ${titleFormatExplanation}
   - インデックスタイトル: メインページの一覧で表示されるタイトル
   - 後半タイトル: ページの有益性を表現する部分
3. **${config.template}**: ${config.specificRules.join('、')}

【出力形式】
${config.outputFormat}

【重要な変換ルール】
✅ リサーチの生の情報をそのまま記載（要約や解釈しない）
✅ 専門家の見解を根拠として組み込み
✅ 成功事例から具体的な行動を抽出
✅ 失敗パターンを回避する方法として表現
✅ 最新トレンドを取り入れた現代的な手法
✅ リサーチから得た数値、統計、固有名詞、具体事例をそのまま使用

❌ 絵文字は一切使用しない
❌ 存在しない情報を勝手に補完しない
❌ 推測や憶測による肉付けは行わない
❌ リサーチにない根拠は作らない
❌ 情報の信頼性を損なう表現は避ける
❌ リサーチ情報を要約や解釈しない（生の情報を保持）

【最終チェック項目】
□ 【ジャンル】: ${config.id} が記載されている
□ タイトルが指定形式（前半：後半または前半！後半）
□ ${config.template}で適切に構成
□ 各項目が実践的で具体的
□ リサーチの生の情報がそのまま記載されている
□ 論理的な順序で配置されている
□ 初心者でも理解できる内容
□ 「やってみたい」と思わせる表現
`
  }


  const handleFormat = async () => {
    if (!researchInput.trim()) {
      setFormattedResult({ formatted: '', error: 'リサーチ結果を入力してください' })
      return
    }

    setIsLoading(true)
    setFormattedResult(null)

    try {
      const model = getGeminiModel()
      const prompt = generateFormatPrompt(selectedGenre, researchInput)
      
      console.log('🎯 フォーマット用プロンプト:', prompt)
      
      const result = await model.generateContent(prompt)
      const response = await result.response
      const formattedText = response.text()
      
      console.log('✅ フォーマット結果:', formattedText)
      
      setFormattedResult({ formatted: formattedText })
    } catch (error: any) {
      console.error('❌ フォーマットエラー:', error)
      
      let errorMessage = 'フォーマット処理に失敗しました'
      if (error?.message?.includes('quota') || error?.message?.includes('429')) {
        errorMessage = 'Gemini APIの制限に達しました。しばらく時間をおいてから再度お試しください。'
      }
      
      setFormattedResult({ formatted: '', error: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (formattedResult?.formatted) {
      navigator.clipboard.writeText(formattedResult.formatted)
      alert('フォーマット結果をコピーしました！')
    }
  }

  const handleUseInSystem = () => {
    if (formattedResult?.formatted) {
      // LocalStorageに保存してメイン生成システムに遷移
      localStorage.setItem('formatted_content', formattedResult.formatted)
      localStorage.setItem('formatted_content_timestamp', Date.now().toString())
      window.open('/', '_blank')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          🔄 リサーチ結果フォーマッター
        </h1>
        <p className="text-gray-600 mb-6">
          詳細なリサーチ結果を、Instagram投稿生成システム用の最適化されたフォーマットに変換します
        </p>

        {/* ジャンル選択 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            📋 ジャンル選択
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {genreConfigs.map((genre) => (
              <label key={genre.id} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="genre"
                  value={genre.id}
                  checked={selectedGenre === genre.id}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="mt-1 text-blue-600"
                />
                <div>
                  <div className="font-medium text-gray-800">{genre.name}</div>
                  <div className="text-sm text-gray-600">{genre.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* リサーチ結果入力 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📊 リサーチ結果
          </label>
          <textarea
            value={researchInput}
            onChange={(e) => setResearchInput(e.target.value)}
            placeholder="詳細なリサーチ結果をここに貼り付けてください..."
            className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
          <div className="mt-2 text-sm text-gray-500">
            💡 ヒント: 統計データ、専門家の見解、成功事例、実践的手法などを含む詳細な情報ほど高品質な結果が得られます
          </div>
        </div>

        {/* フォーマット実行ボタン */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={handleFormat}
            disabled={isLoading || !researchInput.trim()}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? '🔄 フォーマット中...' : '🎯 フォーマット実行'}
          </button>
        </div>

        {/* 結果表示 */}
        {formattedResult && (
          <div className="space-y-4">
            {formattedResult.error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800 font-medium mb-2">❌ エラー</div>
                <div className="text-red-700">{formattedResult.error}</div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-800">✅ フォーマット結果</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                    >
                      📋 コピー
                    </button>
                    <button
                      onClick={handleUseInSystem}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                    >
                      🚀 生成システムで使用
                    </button>
                  </div>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-white p-4 rounded border">
                  {formattedResult.formatted}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 使用方法の説明 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-800 mb-3">📖 使用方法</h3>
        <div className="space-y-2 text-blue-700">
          <div>1. <strong>ジャンル選択</strong>: 生成したいコンテンツのジャンルを選択</div>
          <div>2. <strong>リサーチ結果入力</strong>: 詳細なリサーチ結果を貼り付け</div>
          <div>3. <strong>フォーマット実行</strong>: AIが最適化された形式に変換</div>
          <div>4. <strong>結果活用</strong>: フォーマット結果をコピーして生成システムで使用</div>
        </div>
      </div>
    </div>
  )
}