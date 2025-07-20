# 10. Instagram投稿生成システム - 開発・デバッグ完全ガイド

## 🛠️ 開発環境セットアップ

### 必要な環境
```bash
# Node.js (推奨バージョン)
node --version  # v18.17.0 以上

# パッケージマネージャー
npm --version   # v9.0.0 以上
# または
yarn --version  # v1.22.0 以上

# Git
git --version   # v2.30.0 以上
```

### プロジェクトセットアップ
```bash
# 1. プロジェクトクローン
git clone <repository-url>
cd instagram-post-generator

# 2. 依存関係インストール
npm install
# または
yarn install

# 3. 環境変数設定
cp .env.example .env.local
# .env.localにGemini API キーを設定
echo "NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here" >> .env.local

# 4. 開発サーバー起動
npm run dev
# または
yarn dev
```

### VS Code推奨設定
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.tsx": "typescriptreact"
  }
}
```

### 推奨VS Code拡張機能
```json
// .vscode/extensions.json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🔍 デバッグ手法

### 1. ブラウザ開発者ツール活用

#### React Developer Tools
```javascript
// コンポーネント状態の確認
// React DevToolsでコンポーネントを選択後、Console で:
$r.props     // コンポーネントのprops
$r.state     // コンポーネントのstate (クラスコンポーネント)
$r.hooks     // Hooksの状態 (関数コンポーネント)

// TemplateDataの中身を確認
console.log('Current TemplateData:', $r.props.templateData)
```

#### ネットワークタブでのAPI監視
```javascript
// Gemini API呼び出しの監視
// Network タブで以下をフィルタ:
// - generativelanguage.googleapis.com
// - POST リクエスト
// - Response: AI応答内容の確認
// - Request: 送信プロンプトの確認
```

### 2. デバッグ用コンソールログ

#### 構造化ログ出力
```typescript
// app/utils/debugLogger.ts
export class DebugLogger {
  private static isDevelopment = process.env.NODE_ENV === 'development'
  
  static logDataFlow(stage: string, data: any, metadata?: any) {
    if (!this.isDevelopment) return
    
    console.group(`🔄 Data Flow: ${stage}`)
    console.log('📊 Data:', data)
    if (metadata) console.log('📋 Metadata:', metadata)
    console.log('⏰ Timestamp:', new Date().toISOString())
    console.groupEnd()
  }
  
  static logAICall(prompt: string, response: any, duration: number) {
    if (!this.isDevelopment) return
    
    console.group('🤖 AI Call')
    console.log('📤 Prompt:', prompt)
    console.log('📥 Response:', response)
    console.log('⏱️ Duration:', `${duration}ms`)
    console.groupEnd()
  }
  
  static logError(context: string, error: Error, additionalData?: any) {
    console.group(`❌ Error in ${context}`)
    console.error('Error:', error)
    console.log('Stack:', error.stack)
    if (additionalData) console.log('Additional Data:', additionalData)
    console.groupEnd()
  }
  
  static logPerformance(operation: string, startTime: number) {
    if (!this.isDevelopment) return
    
    const duration = performance.now() - startTime
    const severity = duration > 1000 ? '🐌' : duration > 500 ? '⚠️' : '✅'
    console.log(`${severity} Performance: ${operation} took ${duration.toFixed(2)}ms`)
  }
}

// 使用例
const startTime = performance.now()
const result = await processData(input)
DebugLogger.logDataFlow('ProcessData', result)
DebugLogger.logPerformance('ProcessData', startTime)
```

### 3. AI応答デバッグ

#### プロンプト・応答トレース
```typescript
// app/services/aiDebugger.ts
export class AIDebugger {
  static tracePageStructureAnalysis(input: string, response: any) {
    console.group('🎯 Page Structure Analysis Debug')
    
    // 入力内容の分析
    console.log('📝 Input Analysis:')
    console.log('- Length:', input.length)
    console.log('- Genre pattern:', input.match(/【ジャンル】\s*[:：]\s*([a-zA-Z-]+)/i))
    console.log('- Structure markers:', {
      bullets: (input.match(/[□■●○]/g) || []).length,
      numbers: (input.match(/\d+\./g) || []).length,
      sections: (input.match(/[【】]/g) || []).length / 2
    })
    
    // AI応答の検証
    console.log('🤖 AI Response Validation:')
    if (Array.isArray(response)) {
      console.log('- Page count:', response.length)
      response.forEach((page, index) => {
        console.log(`- Page ${index + 1}:`, {
          template: page.template,
          titleLength: page.title?.length || 0,
          hasTheme: !!page.theme,
          hasDescription: !!page.概要
        })
      })
    } else {
      console.error('- Invalid response format:', typeof response)
    }
    
    console.groupEnd()
  }
  
  static traceContentGeneration(pages: any[], response: any) {
    console.group('📄 Content Generation Debug')
    
    console.log('📥 Input Pages:', pages.map(p => ({
      template: p.template,
      title: p.title
    })))
    
    if (response?.pages) {
      console.log('📤 Generated Content:')
      response.pages.forEach((page: any, index: number) => {
        console.log(`Page ${index + 1}:`, {
          templateType: page.templateType,
          hasContent: !!page.content,
          contentKeys: Object.keys(page.content || {}),
          contentSizes: Object.entries(page.content || {}).map(([key, value]) => [
            key, 
            Array.isArray(value) ? `Array(${value.length})` : typeof value
          ])
        })
      })
    }
    
    console.groupEnd()
  }
}
```

### 4. テンプレート表示デバッグ

#### コンポーネント境界の可視化
```typescript
// app/utils/templateDebugger.ts
export const TemplateDebugger = {
  highlightBoundaries: (enabled: boolean = true) => {
    if (enabled && process.env.NODE_ENV === 'development') {
      const style = document.createElement('style')
      style.textContent = `
        [data-template] {
          outline: 2px solid #3B82F6 !important;
          position: relative;
        }
        [data-template]:before {
          content: attr(data-template);
          position: absolute;
          top: -20px;
          left: 0;
          background: #3B82F6;
          color: white;
          padding: 2px 6px;
          font-size: 10px;
          z-index: 1000;
        }
        [data-field] {
          outline: 1px dashed #EF4444 !important;
        }
        [data-field]:hover:after {
          content: attr(data-field);
          position: absolute;
          background: #EF4444;
          color: white;
          padding: 2px 4px;
          font-size: 9px;
          pointer-events: none;
        }
      `
      document.head.appendChild(style)
    }
  },
  
  logTemplateData: (templateType: string, templateData: any) => {
    console.group(`🎨 Template: ${templateType}`)
    console.log('Data:', templateData)
    
    // フィールド存在チェック
    const requiredFields = {
      'section-items': ['title', 'sections'],
      'enumeration': ['title', 'items'],
      'ranking': ['title', 'rankingData'],
      'table': ['title', 'tableData'],
      'graph': ['title', 'graphData']
    }
    
    const required = requiredFields[templateType] || ['title']
    const missing = required.filter(field => !templateData[field])
    
    if (missing.length > 0) {
      console.warn('❌ Missing required fields:', missing)
    } else {
      console.log('✅ All required fields present')
    }
    
    console.groupEnd()
  }
}

// テンプレートコンポーネントでの使用
export const SectionItemsTemplate: React.FC<TemplateProps> = ({ templateData }) => {
  useEffect(() => {
    TemplateDebugger.logTemplateData('section-items', templateData)
  }, [templateData])
  
  return (
    <InstagramPostTemplate>
      <div data-template="section-items">
        <h1 data-field="title">{templateData.title}</h1>
        {/* ... */}
      </div>
    </InstagramPostTemplate>
  )
}
```

## 🚨 よくある問題とトラブルシューティング

### 1. AI関連のエラー

#### Gemini API エラー
```typescript
// 問題: API制限に達した
/* エラーメッセージ例:
   "Quota exceeded" 
   "Rate limit exceeded"
*/

// 解決策1: API キーの確認
console.log('API Key exists:', !!process.env.NEXT_PUBLIC_GEMINI_API_KEY)
console.log('API Key length:', process.env.NEXT_PUBLIC_GEMINI_API_KEY?.length)

// 解決策2: レート制限対応
class AIErrorHandler {
  static async retryWithBackoff(apiCall: () => Promise<any>, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await apiCall()
      } catch (error: any) {
        if (error.message.includes('rate limit') && i < maxRetries - 1) {
          const delay = Math.pow(2, i) * 1000 // 指数バックオフ
          console.log(`Rate limited, retrying in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
          continue
        }
        throw error
      }
    }
  }
}
```

#### JSON解析エラー
```typescript
// 問題: AI応答のJSON解析失敗
/* エラー例:
   "Unexpected token in JSON"
   "Invalid JSON format"
*/

// デバッグ手法
const debugJSONParsing = (rawResponse: string) => {
  console.group('🔍 JSON Parsing Debug')
  
  console.log('Raw response length:', rawResponse.length)
  console.log('Raw response preview:', rawResponse.substring(0, 200) + '...')
  
  // JSONコードブロックの検出
  const jsonBlocks = rawResponse.match(/```json\n?([\s\S]*?)\n?```/g)
  if (jsonBlocks) {
    console.log('Found JSON blocks:', jsonBlocks.length)
    jsonBlocks.forEach((block, i) => {
      console.log(`Block ${i + 1}:`, block.substring(0, 100) + '...')
    })
  }
  
  // JSON部分の抽出
  const jsonMatch = rawResponse.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    console.log('Extracted JSON:', jsonMatch[0].substring(0, 100) + '...')
    
    try {
      const parsed = JSON.parse(jsonMatch[0])
      console.log('✅ Parsing successful')
      console.log('Parsed structure:', Object.keys(parsed))
    } catch (error) {
      console.error('❌ Parsing failed:', error)
      
      // 文字エンコーディング問題の確認
      console.log('Character issues:')
      console.log('- Smart quotes:', /[""'']/g.test(jsonMatch[0]))
      console.log('- Control chars:', /[\x00-\x1F\x7F]/g.test(jsonMatch[0]))
      console.log('- Unicode issues:', /[^\x00-\x7F]/g.test(jsonMatch[0]))
    }
  } else {
    console.error('❌ No JSON structure found')
  }
  
  console.groupEnd()
}
```

### 2. テンプレート表示エラー

#### テンプレートが見つからない
```typescript
// 問題: テンプレートコンポーネントが存在しない
/* エラー例:
   "Template not found: unknown-template"
   "Cannot read property of undefined"
*/

// デバッグ手法
const debugTemplateSelection = (templateType: string) => {
  console.group('🎨 Template Selection Debug')
  
  console.log('Requested template:', templateType)
  console.log('Available templates:', Object.keys(templateComponents))
  
  // 最も近いテンプレート名を提案
  const available = Object.keys(templateComponents)
  const suggestions = available.filter(name => 
    name.includes(templateType) || templateType.includes(name)
  )
  
  if (suggestions.length > 0) {
    console.log('💡 Possible matches:', suggestions)
  }
  
  // テンプレート登録状況の確認
  console.log('Template registration check:')
  available.forEach(name => {
    const component = templateComponents[name]
    console.log(`- ${name}:`, typeof component, component?.name || 'Anonymous')
  })
  
  console.groupEnd()
}

// 安全なテンプレート選択
const getSafeTemplate = (templateType: TemplateType) => {
  const Template = templateComponents[templateType]
  
  if (!Template) {
    debugTemplateSelection(templateType)
    console.warn(`Template "${templateType}" not found, using fallback`)
    
    // フォールバックテンプレート
    return ({ templateData }: TemplateProps) => (
      <InstagramPostTemplate>
        <div className="h-full flex items-center justify-center p-6">
          <div className="text-center text-white">
            <h2 className="text-lg font-bold mb-2">{templateData.title}</h2>
            <p className="text-sm">{templateData.content || templateData.description}</p>
            <div className="mt-4 text-xs opacity-75">
              Template: {templateType} (fallback)
            </div>
          </div>
        </div>
      </InstagramPostTemplate>
    )
  }
  
  return Template
}
```

#### データ構造の不一致
```typescript
// 問題: テンプレートデータの構造が期待と異なる
/* エラー例:
   "Cannot read property 'map' of undefined"
   "sections is not an array"
*/

// データ構造検証ツール
const validateTemplateData = (templateType: TemplateType, data: TemplateData) => {
  console.group(`🔍 Data Validation: ${templateType}`)
  
  const validators = {
    'section-items': (data: TemplateData) => {
      const issues = []
      if (!data.title) issues.push('Missing title')
      if (!Array.isArray(data.sections)) issues.push('sections is not an array')
      if (data.sections) {
        data.sections.forEach((section, i) => {
          if (!section.title) issues.push(`Section ${i}: missing title`)
          if (!Array.isArray(section.items)) issues.push(`Section ${i}: items is not an array`)
        })
      }
      return issues
    },
    
    'enumeration': (data: TemplateData) => {
      const issues = []
      if (!data.title) issues.push('Missing title')
      if (!Array.isArray(data.items)) issues.push('items is not an array')
      return issues
    },
    
    'ranking': (data: TemplateData) => {
      const issues = []
      if (!data.title) issues.push('Missing title')
      if (!Array.isArray(data.rankingData)) issues.push('rankingData is not an array')
      if (data.rankingData) {
        data.rankingData.forEach((item, i) => {
          if (typeof item.rank !== 'number') issues.push(`Rank ${i}: invalid rank`)
          if (!item.name) issues.push(`Rank ${i}: missing name`)
        })
      }
      return issues
    }
  }
  
  const validator = validators[templateType]
  if (validator) {
    const issues = validator(data)
    if (issues.length > 0) {
      console.warn('❌ Data validation issues:', issues)
    } else {
      console.log('✅ Data validation passed')
    }
  } else {
    console.log('⚠️ No validator for template type')
  }
  
  console.log('Data structure:', {
    keys: Object.keys(data),
    types: Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key, 
        Array.isArray(value) ? `Array(${value.length})` : typeof value
      ])
    )
  })
  
  console.groupEnd()
}
```

### 3. パフォーマンス問題

#### 長い生成時間
```typescript
// 問題: コンテンツ生成に時間がかかりすぎる
// 測定ツール
class PerformanceProfiler {
  private static timers: Map<string, number> = new Map()
  
  static start(label: string) {
    this.timers.set(label, performance.now())
    console.log(`⏱️ Started: ${label}`)
  }
  
  static end(label: string) {
    const startTime = this.timers.get(label)
    if (startTime) {
      const duration = performance.now() - startTime
      const severity = duration > 5000 ? '🐌' : duration > 2000 ? '⚠️' : '✅'
      console.log(`${severity} Completed: ${label} (${duration.toFixed(2)}ms)`)
      this.timers.delete(label)
      return duration
    }
    return 0
  }
  
  static profile<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label)
    return fn().finally(() => this.end(label))
  }
}

// 使用例
const generateContent = async (input: string) => {
  return PerformanceProfiler.profile('Content Generation', async () => {
    // 各段階の測定
    const pageStructures = await PerformanceProfiler.profile(
      'Page Structure Analysis',
      () => pageStructureAnalyzer.analyzePageStructureAndTemplates(input)
    )
    
    const generatedPages = await PerformanceProfiler.profile(
      'Content Generation',
      () => structureConstrainedGenerator.generateAllPagesWithConstraints(input, pageStructures)
    )
    
    return { pageStructures, generatedPages }
  })
}
```

#### メモリリーク検出
```typescript
// メモリ使用量監視
class MemoryMonitor {
  private static logInterval: NodeJS.Timeout | null = null
  
  static startMonitoring() {
    if (this.logInterval) return
    
    this.logInterval = setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        const used = Math.round(memory.usedJSHeapSize / 1024 / 1024)
        const total = Math.round(memory.totalJSHeapSize / 1024 / 1024)
        const limit = Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
        
        console.log(`💾 Memory: ${used}MB / ${total}MB (limit: ${limit}MB)`)
        
        if (used > limit * 0.9) {
          console.warn('⚠️ High memory usage detected!')
        }
      }
    }, 10000) // 10秒ごと
  }
  
  static stopMonitoring() {
    if (this.logInterval) {
      clearInterval(this.logInterval)
      this.logInterval = null
    }
  }
}

// アプリケーション開始時
if (process.env.NODE_ENV === 'development') {
  MemoryMonitor.startMonitoring()
}
```

### 4. データフロー問題

#### 状態の不整合
```typescript
// 問題: React状態とUIの同期がとれない
// State変更トレーサー
const useStateTracer = <T>(name: string, initialState: T) => {
  const [state, setState] = useState<T>(initialState)
  
  const tracedSetState = useCallback((newState: T | ((prev: T) => T)) => {
    console.group(`🔄 State Change: ${name}`)
    console.log('Previous:', state)
    
    const nextState = typeof newState === 'function' 
      ? (newState as Function)(state) 
      : newState
    
    console.log('Next:', nextState)
    console.log('Changed keys:', findChangedKeys(state, nextState))
    console.groupEnd()
    
    setState(newState)
  }, [name, state])
  
  return [state, tracedSetState] as const
}

const findChangedKeys = (prev: any, next: any): string[] => {
  if (prev === next) return []
  if (typeof prev !== 'object' || typeof next !== 'object') return ['value']
  
  const allKeys = new Set([...Object.keys(prev || {}), ...Object.keys(next || {})])
  return Array.from(allKeys).filter(key => prev[key] !== next[key])
}
```

## 🧪 テスト・検証手法

### 1. 手動テストチェックリスト

#### 基本フロー確認
```
□ アプリケーション起動
  □ http://localhost:3000 にアクセス
  □ ページが正常に表示される
  □ コンソールエラーがない

□ コンテンツ生成フロー
  □ テキスト入力が可能
  □ 生成ボタンが機能する
  □ ローディング状態が表示される
  □ 結果が表示される

□ テンプレート表示
  □ 各テンプレートが正しく表示される
  □ データが正しく反映される
  □ レスポンシブ対応している

□ 編集機能
  □ エディターが開く
  □ リアルタイム反映される
  □ バリデーションが動作する
  □ 保存が正常に動作する

□ ダウンロード機能
  □ 画像として保存できる
  □ 一括ダウンロードが動作する
  □ ファイル名が適切である
```

#### エラーケーステスト
```
□ 不正な入力
  □ 空文字列
  □ 極端に長いテキスト
  □ 特殊文字を含むテキスト
  □ HTMLタグを含むテキスト

□ API エラー
  □ ネットワーク接続なし
  □ API制限に達した場合
  □ 不正なレスポンス

□ ブラウザ互換性
  □ Chrome (最新)
  □ Firefox (最新)
  □ Safari (最新)
  □ Edge (最新)

□ デバイス対応
  □ デスクトップ (1920x1080)
  □ タブレット (768x1024)
  □ モバイル (375x667)
```

### 2. 自動テスト実装

#### コンポーネントテスト例
```typescript
// tests/components/SectionItemsTemplate.test.tsx
import { render, screen } from '@testing-library/react'
import { SectionItemsTemplate } from '@/components/templates/SectionItemsTemplate'

describe('SectionItemsTemplate', () => {
  const mockData = {
    title: 'テストタイトル',
    badgeText: 'テスト',
    sections: [
      {
        title: 'セクション1',
        content: 'セクション説明',
        items: ['アイテム1', 'アイテム2', 'アイテム3']
      }
    ]
  }

  it('renders title correctly', () => {
    render(<SectionItemsTemplate templateData={mockData} />)
    expect(screen.getByText('テストタイトル')).toBeInTheDocument()
  })

  it('renders badge text', () => {
    render(<SectionItemsTemplate templateData={mockData} />)
    expect(screen.getByText('テスト')).toBeInTheDocument()
  })

  it('renders all section items', () => {
    render(<SectionItemsTemplate templateData={mockData} />)
    expect(screen.getByText('アイテム1')).toBeInTheDocument()
    expect(screen.getByText('アイテム2')).toBeInTheDocument()
    expect(screen.getByText('アイテム3')).toBeInTheDocument()
  })

  it('handles empty sections gracefully', () => {
    const emptyData = { ...mockData, sections: [] }
    render(<SectionItemsTemplate templateData={emptyData} />)
    expect(screen.getByText('テストタイトル')).toBeInTheDocument()
  })
})
```

#### API統合テスト例
```typescript
// tests/integration/contentGeneration.test.ts
import { contentGeneratorService } from '@/services/contentGeneratorService'

describe('Content Generation Integration', () => {
  it('generates content for strategy genre', async () => {
    const input = `
      【ジャンル】: strategy
      
      面接対策の基本ステップ
      
      □ 企業研究を徹底する
      □ 志望動機を明確にする
      □ 想定質問の回答を準備する
    `

    const result = await contentGeneratorService.generateContent(input)

    expect(result).toBeDefined()
    expect(result.pages).toHaveLength(4) // strategy ジャンルは4-6ページ
    expect(result.caption).toBeTruthy()
    expect(result.hashtags).toBeTruthy()

    // 各ページの構造確認
    result.pages.forEach(page => {
      expect(page.templateType).toBeTruthy()
      expect(page.templateData).toBeDefined()
      expect(page.templateData.title).toBeTruthy()
    })
  }, 30000) // AI呼び出しのため30秒タイムアウト

  it('handles invalid input gracefully', async () => {
    const invalidInput = ''

    await expect(
      contentGeneratorService.generateContent(invalidInput)
    ).rejects.toThrow()
  })
})
```

## 🔧 開発ツールとワークフロー

### 1. デバッグ用開発コマンド

```bash
# 開発サーバー (デバッグ有効)
npm run dev:debug

# 型チェック (ウォッチモード)
npm run type-check:watch

# Linting (自動修正)
npm run lint:fix

# テスト (ウォッチモード)
npm run test:watch

# ビルド確認
npm run build:analyze
```

### 2. Git フック設定

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# TypeScript型チェック
npm run type-check

# Linting
npm run lint

# テスト実行
npm run test

# コミット前のファイル整理
npm run format
```

### 3. デバッグ用環境変数

```bash
# .env.development
# デバッグモード有効化
DEBUG=true
DEBUG_AI_CALLS=true
DEBUG_DATA_FLOW=true
DEBUG_PERFORMANCE=true

# 詳細ログ出力
LOG_LEVEL=debug

# AI応答の生キャッシュ (開発用)
CACHE_AI_RESPONSES=true

# テンプレート境界の表示
SHOW_TEMPLATE_BOUNDARIES=true
```

### 4. プロダクション準備チェックリスト

```
□ 環境変数の確認
  □ API キーが本番用に設定されている
  □ デバッグフラグが無効化されている
  □ 不要な環境変数が削除されている

□ パフォーマンス確認
  □ Lighthouse スコア 90+ 
  □ Core Web Vitals が基準内
  □ バンドルサイズが適切

□ セキュリティ確認
  □ API キーがクライアントサイドに露出していない
  □ XSS対策が実装されている
  □ HTTPS が有効化されている

□ 互換性確認
  □ 主要ブラウザでの動作確認
  □ モバイル端末での動作確認
  □ アクセシビリティ基準を満たしている

□ エラーハンドリング
  □ 適切なエラーメッセージ表示
  □ フォールバック処理の実装
  □ ログ監視システムの設定

□ ドキュメント更新
  □ README.md の更新
  □ API ドキュメントの更新
  □ 変更ログの記録
```

## 🚀 デプロイメント・監視

### 1. ビルド最適化

```typescript
// next.config.js
const nextConfig = {
  // バンドル分析
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      }
    }
    return config
  },
  
  // 画像最適化
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 実験的機能
  experimental: {
    optimizeCss: true,
  },
  
  // 圧縮設定
  compress: true,
}
```

### 2. エラー監視設定

```typescript
// app/utils/errorReporting.ts
class ErrorReporter {
  static report(error: Error, context: any = {}) {
    if (process.env.NODE_ENV === 'production') {
      // 本番環境でのエラー報告
      console.error('Error reported:', { error, context })
      
      // 外部監視サービスへの送信
      // Sentry, LogRocket, など
    } else {
      // 開発環境での詳細ログ
      console.group('🚨 Error Report')
      console.error('Error:', error)
      console.log('Context:', context)
      console.log('Stack:', error.stack)
      console.groupEnd()
    }
  }
  
  static reportPerformance(metric: string, value: number, context: any = {}) {
    if (value > 1000) { // 1秒以上の処理
      this.report(new Error(`Performance issue: ${metric}`), {
        metric,
        value,
        ...context
      })
    }
  }
}

// React Error Boundary との統合
export const withErrorReporting = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        ErrorReporter.report(error, { errorInfo, props })
      }}
    >
      <Component {...props} />
    </ErrorBoundary>
  )
}
```

---

この開発・デバッグガイドにより、効率的な開発環境の構築、問題の迅速な特定・解決、高品質なコードの維持が可能になります。次の「11_SYSTEM_EXTENSION_GUIDE.md」で、システム拡張の詳細について学習してください。