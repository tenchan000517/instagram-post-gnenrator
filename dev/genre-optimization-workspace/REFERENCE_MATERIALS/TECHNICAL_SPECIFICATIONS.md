# 🔧 技術仕様（参照専用）

## 📄 重要なファイル一覧

### 修正対象ファイル

#### 1. app/services/pageStructureAnalyzer.ts
```typescript
// 現在の問題箇所（76-134行）
**section-items**: 複数カテゴリ+各項目説明がある場合（概要・まとめページに最適）

// 修正が必要な関数
analyzePageStructureAndTemplates(input: string): Promise<PageStructure[]>
```

#### 2. app/lib/genre.ts
```typescript
// 現在の構造
export interface GenreConfig {
  optimalItemRange: { min: number; max: number }
}

// 拡張が必要な構造
export interface GenreConfig {
  optimalItemRange: { min: number; max: number }
  primaryTemplates: TemplateType[]
  secondaryTemplates: TemplateType[]
  avoidTemplates: TemplateType[]
  characteristicKeywords: string[]
  expressionIntent: string
}
```

#### 3. app/services/contentGeneratorService.ts
```typescript
// 修正対象関数
convertToTemplateData(content: any, templateType: TemplateType): TemplateData

// 実装方針
1. AIの完璧なデータを最優先使用
2. 分解された文字列オブジェクトの自動再構築
3. 空配列検出時のみ代替処理実行
4. 型安全性の確保
```

### 参照のみファイル

#### 1. app/components/templates/TemplateTypes.ts
```typescript
// 16個のテンプレート型定義
export type TemplateType = 
  | 'index' | 'enumeration' | 'list' | 'explanation2'
  | 'simple3' | 'table' | 'simple5' | 'simple6'
  | 'section-items' | 'two-column-section-items'
  | 'title-description-only' | 'checklist-enhanced'
  | 'item-n-title-content' | 'single-section-no-items'
  | 'ranking' | 'graph'

// 統一データ構造
export interface TemplateData {
  title: string
  content?: string
  subtitle?: string
  description?: string
  badgeText?: string
  items?: (string | { title?: string; content?: string })[]
  sections?: Array<{
    title: string
    content: string
    items?: (string | { title?: string; content?: string })[]
  }>
  steps?: Array<{
    step: number
    title: string
    description: string
  }>
  checklistItems?: Array<{
    text: string
    description: string
    checked: boolean
  }>
  rankingData?: Array<{
    rank: number
    name: string
    value: string
    description?: string
  }>
  graphData?: {
    type: 'pie' | 'bar'
    data?: Array<{
      name: string
      value: number
      color?: string
    }>
  }
  tableData?: {
    headers: string[]
    rows: string[][]
  }
  twoColumn?: {
    left: (string | { title?: string; content?: string })[]
    right: (string | { title?: string; content?: string })[]
  }
}
```

#### 2. app/services/templateStructureDefinitions.ts
```typescript
// 各テンプレートの構造定義
export interface TemplateStructureDefinition {
  templateType: string
  description: string
  requiredFields: string[]
  optionalFields: string[]
  dataStructure: string
  jsonExample: string
  validationRules: string[]
  commonMistakes: string[]
}

// 動的プロンプト生成
static generateStructurePrompt(templateType: string): string
```

## 🎯 新テンプレート追加手順

### Step 1: 型定義の追加
```typescript
// app/components/templates/TemplateTypes.ts
export type TemplateType = 
  | 'existing-templates'
  | 'new-template'  // ← 追加
```

### Step 2: テンプレートコンポーネントの作成
```typescript
// app/components/templates/NewTemplate.tsx
import React from 'react'
import { TemplateData } from './TemplateTypes'
import { InstagramPostTemplate } from './InstagramPostTemplate'

export const NewTemplate: React.FC<{templateData: TemplateData}> = ({ templateData }) => {
  return (
    <InstagramPostTemplate>
      {/* テンプレート固有のJSX */}
    </InstagramPostTemplate>
  )
}
```

### Step 3: 専用エディタの作成
```typescript
// app/components/editors/NewTemplateEditor.tsx
import { DynamicFieldDetector } from './DynamicFieldDetector'

export const NewTemplateEditor: React.FC<Props> = ({ page, onUpdate }) => {
  return (
    <DynamicFieldDetector 
      page={page} 
      onUpdate={onUpdate}
      templateType="new-template"
    />
  )
}
```

### Step 4: 構造定義の追加
```typescript
// app/services/templateStructureDefinitions.ts
'new-template': {
  templateType: 'new-template',
  description: 'テンプレートの説明',
  requiredFields: ['title', 'newField'],
  optionalFields: ['content', 'subtitle'],
  dataStructure: `{"title": "メインタイトル", "newField": "新フィールド"}`,
  jsonExample: `{"title": "実際の例", "newField": "例の値"}`,
  validationRules: ['newField は必須', 'title は30文字以内'],
  commonMistakes: ['newField の型間違い', 'title の長さ超過']
}
```

### Step 5: システム統合
```typescript
// app/services/pageStructureAnalyzer.ts
**new-template**: 新テンプレートの選択条件

// app/services/contentGeneratorService.ts
case 'new-template':
  return {
    title: content.title || '',
    newField: content.newField || '',
  }

// app/components/EditablePostGenerator.tsx
const templateComponents = {
  'new-template': NewTemplate,
}
const editorComponents = {
  'new-template': NewTemplateEditor,
}
```

## ⚠️ 危険な修正パターン

### 絶対に避けるべき修正

#### 1. 型定義の安易な変更
```typescript
// ❌ 危険: 既存型の変更
export type TemplateType = 'new-type' | 'enumeration' | ...

// ✅ 安全: 新しい型の追加
export type TemplateType = 'enumeration' | ... | 'new-template'
```

#### 2. AIプロンプトの大幅変更
```typescript
// ❌ 危険: 応答形式の変更
"以下のXML形式で応答してください"

// ✅ 安全: 指示の改善
"以下のJSON形式で、より詳細に応答してください"
```

#### 3. templateMatchingService.tsの修正
```typescript
// ❌ 危険: UI表示専用のため修正は慎重に
// 実際の選択はPageStructureAnalyzerが行う
```

## 🛡️ エラーパターンと対処法

### 1. AI生成エラー
```typescript
// Gemini APIの503エラー対策
if (error?.message?.includes('quota')) {
  throw new Error('API制限に達しました')
}

// JSON解析エラー対策
const cleanJson = response
  .replace(/```json\n?|```\n?/g, '')
  .replace(/,\s*}}/g, '}}')
```

### 2. 型エラー
```typescript
// オプショナルチェーンの活用
{page.templateData?.items?.map((item, index) => ...)}

// デフォルト値の設定
const items = page.templateData?.items || []
```

### 3. UI表示エラー
```typescript
// テンプレートコンポーネント未発見対策
const TemplateComponent = templateComponents[page.templateType]
if (!TemplateComponent) {
  return <div className="text-red-500">テンプレートが見つかりません</div>
}
```

## 📊 品質指標

### 必須テストケース
- **テンプレート選択精度**: 期待テンプレート選択率 > 80%
- **AI生成成功率**: JSON解析成功率 > 95%
- **UI応答性**: 編集反映時間 < 500ms
- **画像生成成功率**: ダウンロード成功率 > 98%

### パフォーマンス監視
- **API応答時間**: 平均 < 3秒
- **メモリ使用量**: < 100MB
- **エラー発生率**: < 2%

---

**⚠️ 注意**: このファイルは参照専用です。実装時は必ず最新のコードを確認してください。