# テンプレート作成手順書

## 📋 概要

新しいInstagram投稿テンプレートを作成し、システムに完全統合するための詳細手順書です。この手順に従うことで、TypeScriptエラーなく機能するテンプレートを作成できます。

## 🎯 作業前の確認事項

- [ ] 新テンプレートの用途・特徴が明確
- [ ] 既存の9テンプレートと重複しない独自性がある
- [ ] デザイン・レイアウトの設計が完了

## 📝 Step 1: テンプレートコンポーネント作成

### 1.1 ファイル作成
```bash
touch app/components/templates/YourTemplateName.tsx
```

### 1.2 デザインシステム・共通パターン

#### 🎨 Instagram投稿用デザイン原則

**モバイル最適化**: Instagramは主にモバイルで閲覧されるため、以下を重視：
- **大きめテキスト**: 最小`text-base`(16px)、タイトルは`text-2xl`〜`text-3xl`
- **高コントラスト**: 暗いテキスト(`text-gray-800`)と明るい背景
- **タッチフレンドリー**: アイコン最小`w-6 h-6`、十分なパディング

#### 🎨 共通カラーパレット

```typescript
// 全テンプレート共通の配色規則
const colorSystem = {
  // プライマリブルー系
  primary: 'bg-blue-400',      // バッジ背景
  secondary: 'bg-blue-500',    // ヘッダーグラデーション
  light: 'bg-blue-50',         // 背景グラデーション
  border: 'border-blue-100',   // カード境界線
  text: 'text-blue-600',       // アクセントテキスト

  // テキストカラー
  primaryText: 'text-gray-800', // メインテキスト
  secondaryText: 'text-gray-700', // セカンダリテキスト
  whiteText: 'text-white',     // 白文字（カラー背景用）

  // 背景
  cardBg: 'bg-white',          // コンテンツカード
  gradients: [
    'bg-gradient-to-b from-slate-50 to-blue-50',
    'bg-gradient-to-br from-blue-50 to-white'
  ]
}
```

#### 📐 スペーシング・サイズ規格

```typescript
const sizingSystem = {
  // テキストサイズ
  title: ['text-2xl', 'text-3xl'],
  sectionHeader: ['text-lg', 'text-xl'],
  bodyText: 'text-base',        // 16px - Instagram最適
  smallText: 'text-sm',
  badgeText: 'text-xl',

  // アイコンサイズ
  pageIcon: 'w-5 h-5',         // バッジ内アイコン
  contentIcon: ['w-6 h-6', 'w-8 h-8'],
  numberIcon: 'w-8 h-8',       // 列挙番号

  // パディング/マージン
  containerPadding: ['p-5', 'p-6'],
  cardPadding: ['p-4', 'p-8'],
  badgePadding: 'px-4 py-2',
  sectionSpacing: ['mb-4', 'mb-6'],
  itemSpacing: ['space-y-3', 'space-y-4'],

  // 角丸
  smallRadius: 'rounded-sm',    // バッジ
  mediumRadius: 'rounded-xl',   // カード
  largeRadius: 'rounded-2xl',   // メインカード
  fullRadius: 'rounded-full',   // 装飾要素
}
```

### 1.3 テンプレートコンポーネント実装

```typescript
// app/components/templates/YourTemplateName.tsx
import React from 'react'
import { TemplateData, splitTitleForBadge, getPageNumberIcon } from './TemplateTypes'
import { CheckCircle, ArrowRight } from 'lucide-react' // 共通アイコン

interface YourTemplateNameProps {
  data: TemplateData
}

export function YourTemplateName({ data }: YourTemplateNameProps) {
  // 🔧 必須: タイトルとバッジの分離（全テンプレート共通）
  const { badge, title } = splitTitleForBadge(data.title)
  
  // 🔧 必須: ページ番号アイコン取得（全テンプレート共通）
  const PageIcon = getPageNumberIcon(data.pageNumber || 1)

  return (
    {/* 🎨 標準レイアウト構造 */}
    <div className="w-full h-full relative bg-gradient-to-b from-slate-50 to-blue-50 flex flex-col">
      
      {/* 🎨 背景装飾（共通パターン） */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>

      {/* 📱 コンテンツコンテナ（相対位置・z-index） */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        
        {/* 🏷️ 標準ヘッダー（バッジ＋タイトル） */}
        <div className="mb-6">
          {/* バッジ（ページアイコン付き） */}
          <div className="inline-flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-sm text-xl font-medium mb-3">
            <PageIcon className="w-5 h-5" />
            <span>{data.badgeText || badge}</span>
          </div>
          
          {/* メインタイトル */}
          <h1 className="text-3xl font-bold text-gray-800 leading-tight">
            {title}
          </h1>
          
          {/* サブタイトル（オプション） */}
          {data.subtitle && (
            <p className="text-lg text-gray-700 mt-3">{data.subtitle}</p>
          )}
        </div>

        {/* 📄 メインコンテンツエリア */}
        <div className="flex-1">
          {/* コンテンツカード（標準パターン） */}
          {data.content && (
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
              <p className="text-base font-medium text-gray-800 leading-relaxed">
                {typeof data.content === 'string' ? data.content : (data.content as any)?.content}
              </p>
            </div>
          )}

          {/* アイテムリスト（標準パターン） */}
          {data.items && data.items.length > 0 && (
            <div className="space-y-3">
              {data.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  {/* アイコン（タッチフレンドリーサイズ） */}
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  {/* テキストコンテンツ */}
                  <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                    <p className="text-base font-medium text-gray-800 leading-relaxed">
                      {typeof item === 'string' ? item : item.content || item.title || ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🔚 フッター/サブタイトル（標準パターン） */}
        {data.subtitle && (
          <div className="mt-6">
            <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-600">
              <p className="text-base text-blue-800 font-medium">
                {data.subtitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// メタデータ（必須）
export const yourTemplateNameMetadata = {
  id: 'your-template-name',
  name: 'あなたのテンプレート名',
  description: 'テンプレートの説明文',
  suitableFor: {
    contentTypes: ['コンテンツタイプ1', 'コンテンツタイプ2'],
    genres: ['ジャンル1', 'ジャンル2'],
    dataStructure: ['データ構造の説明'],
    complexity: 'medium' as const, // 'simple' | 'medium' | 'complex'
    pageCount: { min: 1, max: 3 }
  },
  characterLimits: {
    title: 30,       // タイトル文字数制限
    content: 100,    // メインコンテンツ文字数制限
    subtitle: 40,    // サブタイトル文字数制限
    items: 50        // アイテム文字数制限
  },
  keywords: ['キーワード1', 'キーワード2', 'キーワード3'], // 必須！
  structureRequirements: {
    // テンプレート固有の構造要件
    itemsCount: 3,
    sectionsMax: 2
  }
}
```

## 🔧 Step 2: 型定義の更新

### 2.1 TemplateTypeに追加

```typescript
// app/components/templates/TemplateTypes.ts
export type TemplateType = 
  | 'enumeration'
  | 'list'
  | 'explanation2'
  | 'simple3'
  | 'table'
  | 'simple5'
  | 'simple6'
  | 'section-items'
  | 'two-column-section-items'
  | 'your-template-name'  // ← 追加
```

## 📦 Step 3: テンプレート登録

### 3.1 index.tsでエクスポート・登録

```typescript
// app/components/templates/index.ts

// インポート追加
export { YourTemplateName } from './YourTemplateName'
import { YourTemplateName } from './YourTemplateName'

// templateComponentsオブジェクトに追加
export const templateComponents = {
  enumeration: EnumerationTemplate,
  list: ListTemplate,
  explanation2: ExplanationTwoTemplate,
  simple3: SimpleThreeTemplate,
  table: TableTemplate,
  simple5: SimpleFiveTemplate,
  simple6: SimpleSixTemplate,
  'section-items': SectionItemsTemplate,
  'two-column-section-items': TwoColumnSectionItemsTemplate,
  'your-template-name': YourTemplateName  // ← 追加
} as const
```

### 3.2 TemplateRegistryに登録

```typescript
// app/components/templates/TemplateRegistry.ts

// メタデータインポート追加
import { yourTemplateNameMetadata } from './YourTemplateName'

// templateRegistryオブジェクトに追加
export const templateRegistry: Record<TemplateType, TemplateMetadata> = {
  enumeration: enumerationMetadata,
  list: listMetadata,
  explanation2: explanationTwoMetadata,
  simple3: simpleThreeMetadata,
  table: tableMetadata,
  simple5: simpleFiveMetadata,
  simple6: simpleSixMetadata,
  'section-items': sectionItemsMetadata,
  'two-column-section-items': twoColumnSectionItemsMetadata,
  'your-template-name': yourTemplateNameMetadata  // ← 追加
}

// ジャンルマッピングに追加（該当するジャンルに）
export const genreTemplateMapping = {
  'インターン・エントリー〆切系': ['table', 'list', 'simple5'],
  'ナレッジ系': ['explanation2', 'enumeration', 'section-items', 'your-template-name'], // ← 例
  '〇〇選みたいな感じでの紹介系': ['list', 'enumeration', 'simple3'],
  'ノウハウ系': ['explanation2', 'simple5', 'simple6', 'two-column-section-items']
}
```

## ⚙️ Step 4: サービスファイル更新（7ファイル）

### 4.1 pureStructureMatchingService.ts

```typescript
// structurePatternsに新パターン追加
const structurePatterns: StructurePattern[] = [
  // 既存パターン...
  
  // 新テンプレート用パターン
  {
    templateType: 'your-template-name',
    priority: 0.9, // 優先度設定
    structureCheck: (content) => {
      // 構造チェックロジック
      const items = content?.items || []
      const hasDescription = !!content?.description
      
      return items.length >= 2 && items.length <= 5 && hasDescription
    },
    structureScore: (content) => {
      const items = content?.items || []
      const hasDescription = !!content?.description
      
      if (items.length >= 2 && items.length <= 5 && hasDescription) {
        return 1.0 // 完璧なマッチ
      }
      return 0.0
    }
  }
]
```

### 4.2 structureBasedTemplateSelector.ts

```typescript
// 適切な箇所に新テンプレート判定ロジック追加
if (analysis.hasYourSpecificStructure) {
  return 'your-template-name'
}
```

### 4.3 templateMatchingService.ts

```typescript
// templateCharacteristicsに追加
const templateCharacteristics: TemplateCharacteristics[] = [
  // 既存特徴...
  {
    templateType: 'your-template-name',
    primaryFeatures: ['特徴1', '特徴2'],
    contentStructure: ['構造1', '構造2'],
    visualElements: ['要素1', '要素2'],
    targetAudience: ['対象者1', '対象者2']
  }
]

// volumeRequirements（2箇所）に追加
const volumeRequirements: Record<TemplateType, { min: number; max: number }> = {
  // 既存要件...
  'your-template-name': { min: 2, max: 5 }
}
```

### 4.4 intelligentContentProcessor.ts

```typescript
// 4つの関数に新ケース追加

// selectOptimalTemplateType
private static selectOptimalTemplateType(dataType: ContentSection['dataType']): TemplateType {
  switch (dataType) {
    // 既存ケース...
    case 'your-data-type':
      return 'your-template-name'
  }
}

// generateTemplateData
private static generateTemplateData(section: ContentSection, templateType: TemplateType): any {
  switch (templateType) {
    // 既存ケース...
    case 'your-template-name':
      return {
        title,
        badgeText,
        content: 'テンプレート固有コンテンツ生成',
        items: beneficialItems.slice(0, 5)
      }
  }
}

// getContentTypeDescription
private static getContentTypeDescription(templateType: TemplateType): string {
  switch (templateType) {
    // 既存ケース...
    case 'your-template-name': return 'あなたのテンプレート説明'
  }
}

// getContentTypeKeyword
private static getContentTypeKeyword(templateType: TemplateType): string {
  switch (templateType) {
    // 既存ケース...
    case 'your-template-name': return 'keyword'
  }
}
```

### 4.5 geminiService.ts

```typescript
// プロンプト生成でテンプレート選択肢に追加
case 'your-template-name':
  return `テンプレート固有のプロンプト指示`
```

### 4.6 contentGeneratorService.ts

```typescript
// テンプレート判定ロジックに追加
if (templateType === 'your-template-name' && /* 条件 */) {
  // テンプレート固有処理
}
```

### 4.7 templateRecommendationService.ts

```typescript
// ALL_TEMPLATESに追加
const ALL_TEMPLATES: TemplateType[] = [
  'enumeration', 'explanation2', 'table', 'list',
  'simple3', 'simple5', 'simple6', 'section-items', 'two-column-section-items',
  'your-template-name'  // ← 追加
]

// 各種スコア計算関数に追加
const getTemplateComplexityScore = (templateType: TemplateType): number => {
  const scores: Record<TemplateType, number> = {
    // 既存スコア...
    'your-template-name': 7  // 複雑さスコア（1-10）
  }
}

const getTemplateDescriptiveText = (templateType: TemplateType): string => {
  const descriptions: Record<TemplateType, string> = {
    // 既存説明...
    'your-template-name': 'あなたのテンプレート説明文'
  }
}
```

## 🧪 Step 5: テスト・確認

### 5.1 TypeScriptコンパイルチェック
```bash
npx tsc --noEmit
```

### 5.2 TemplateViewerで表示確認
1. ブラウザで `/template-viewer` にアクセス
2. 新テンプレートが表示されることを確認
3. サンプルデータでレイアウトが正しく表示されることを確認

### 5.3 実際の生成フローでテスト
1. メイン画面でコンテンツ生成
2. 新テンプレートが選択候補に表示されることを確認
3. 選択時に正しくレンダリングされることを確認

## ✅ 完成チェックリスト

- [ ] テンプレートコンポーネント作成完了
- [ ] メタデータに`keywords`配列を含む
- [ ] TemplateTypes.tsの型定義更新
- [ ] index.tsでインポート・エクスポート追加
- [ ] TemplateRegistry.tsに登録
- [ ] 7つのサービスファイル更新完了
- [ ] TypeScriptエラーなし
- [ ] TemplateViewerで表示確認
- [ ] 実際の生成フローでテスト完了

#### 🧩 共通コンポーネントパターン

```typescript
// 🏷️ バッジコンポーネント（全テンプレート標準）
const standardBadge = (
  <div className="inline-flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-sm text-xl font-medium mb-3">
    <PageIcon className="w-5 h-5" />
    <span>{badgeText}</span>
  </div>
)

// 📄 コンテンツカード（標準パターン）
const contentCard = (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100">
    {/* コンテンツ */}
  </div>
)

// 🎨 背景装飾（共通パターン）
const backgroundDecorations = (
  <>
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-40"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>
  </>
)

// 🔗 アイコン付きアイテム（標準パターン）
const iconItem = (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div className="flex-1 bg-white rounded-xl p-4 shadow-sm border border-blue-100">
      <p className="text-base font-medium text-gray-800 leading-relaxed">
        {content}
      </p>
    </div>
  </div>
)

// 🔚 フッター/サブタイトル（標準パターン）
const standardFooter = (
  <div className="bg-white rounded-2xl p-4 border-l-4 border-blue-600">
    <p className="text-base text-blue-800 font-medium">
      {subtitle}
    </p>
  </div>
)
```

#### 📱 Instagram特有の配慮事項

1. **視認性最優先**:
   - 最小テキストサイズ: `text-base` (16px)
   - アイコンサイズ: 最小 `w-6 h-6`
   - 十分なコントラスト: `text-gray-800` on `bg-white`

2. **タッチフレンドリー**:
   - パディング最小: `p-4`
   - アイテム間スペース: `space-y-3` 以上
   - タップ可能領域の確保

3. **モバイル最適化**:
   - シングルカラムレイアウト優先
   - 縦スクロール考慮した設計
   - 画面サイズに依存しない相対的配置

#### 🎯 必須実装パターン

**全テンプレートで必須の要素**:
- [ ] `splitTitleForBadge()` でタイトル分離
- [ ] `getPageNumberIcon()` でページアイコン取得
- [ ] `bg-gradient-to-b from-slate-50 to-blue-50` 背景グラデーション
- [ ] `relative z-10` コンテンツコンテナ
- [ ] 標準バッジ（ページアイコン付き）
- [ ] `text-3xl font-bold text-gray-800` タイトル
- [ ] `bg-white rounded-2xl` コンテンツカード
- [ ] 背景装飾円（2個、opacity-40）

## 📝 新テンプレート追加後の必須更新チェックリスト（2025-07-13追加）

### 🔍 TemplateType追加後の必須更新箇所（6ファイル）

新しいTemplateTypeを追加した後、以下のファイルでRecord<TemplateType, ...>型エラーが発生するため必ず更新が必要：

#### 1. **ContentApprovalComponent.tsx** ⚠️
```typescript
// エラー: Type '{ enumeration: string; ... }' is missing properties 'new-template'
const getTemplateTypeDisplayName = (templateType: TemplateType): string => {
  const names: Record<TemplateType, string> = {
    // 既存テンプレート...
    'new-template': '新テンプレート名'  // ← 追加必要
  }
}
```

#### 2. **TemplateSelectionComponent.tsx** ⚠️
```typescript
// 2箇所で更新必要
const getTemplateDisplayName: Record<TemplateType, string> = {
  'new-template': '新テンプレート表示名'  // ← 追加
}
const getTemplateDescription: Record<TemplateType, string> = {
  'new-template': '新テンプレート説明文'  // ← 追加
}
```

#### 3. **TemplateViewer.tsx** ⚠️
```typescript
// サンプルデータ追加
const sampleData = {
  // 既存データ...
  'new-template': {
    title: 'サンプルタイトル',
    description: 'サンプル説明'
  }  // ← 追加必要
}
```

#### 4. **contentLayoutService.ts** ⚠️
```typescript
// badgeMap更新
const badgeMap: Record<TemplateType, string[]> = {
  'new-template': ['新テンプレート', 'バッジ']  // ← 追加
}

// mapToTemplateDataにswitch case追加
case 'new-template':
  return { title, content: mappedContent.description }
```

#### 5. **templateMatchingService.ts** ⚠️
```typescript
// 2箇所のvolumeRequirements更新必要
const volumeRequirements: Record<TemplateType, { min: number; max: number }> = {
  'new-template': { min: 1, max: 5 }  // ← 両方の関数で追加
}

// getTemplateDisplayName更新
const displayNames: Record<TemplateType, string> = {
  'new-template': '新テンプレート表示名'  // ← 追加
}
```

#### 6. **templateRecommendationService.ts** ⚠️
```typescript
// 複数のRecord<TemplateType, ...>オブジェクト更新
const lengthFitRequirements: Record<TemplateType, [number, number]> = {
  'new-template': [100, 300]  // ← 追加
}
const complexityScores: Record<TemplateType, number> = {
  'new-template': 5  // ← 追加
}
const descriptions: Record<TemplateType, string> = {
  'new-template': '新テンプレート説明'  // ← 追加
}
```

### ⚠️ 最も忘れやすいエラーTop3

1. **TemplateViewer.tsx** のサンプルデータ（コンパイル時に型エラー）
2. **templateMatchingService.ts** の2箇所のvolumeRequirements（コンパイル時に型エラー）
3. **contentLayoutService.ts** のbadgeMap（実行時にundefinedエラー）

## 🚨 よくある失敗と対処法

### ❌ TypeScriptエラー集（実例追加）

**Critical Priority実装時の実エラー例と解決法**:

#### 1. **Record<TemplateType, ...>型エラー（最頻出）**
```typescript
// ❌ エラー例
app/components/ContentApprovalComponent.tsx(88,11): error TS2739: 
Type '{ enumeration: string; list: string; ... }' is missing the following properties 
from type 'Record<TemplateType, string>': "title-description-only", "checklist-enhanced", "item-n-title-content"

// ✅ 解決法
const names: Record<TemplateType, string> = {
  enumeration: '列挙型',
  // 既存テンプレート...
  'title-description-only': 'タイトル+説明型',      // ← 追加
  'checklist-enhanced': 'チェックリスト詳細型',      // ← 追加
  'item-n-title-content': '独立ボックス型'          // ← 追加
}
```

#### 2. **switch文の無効なcase（型不一致）**
```typescript
// ❌ エラー例
app/services/structureBasedTemplateSelector.ts(31,12): error TS2678: 
Type '"checklist-format"' is not comparable to type '"title-list" | "title-subtitle-descriptions" | ...

// ✅ 解決法
// switch文のcaseが型定義に含まれていない場合は削除
switch (structure.type) {
  case 'title-list':
    return 'enumeration'
  // case 'checklist-format': ← 削除（型定義に無い）
  default:
    return 'simple3'
}

// または既存のcase内で新テンプレートを返す
case 'title-list':
  if (isChecklistContent) {
    return 'checklist-enhanced'  // ← 既存case内で新テンプレート返却
  }
  return 'enumeration'
```

#### 3. **implicitなany型（map関数）**
```typescript
// ❌ エラー例
app/components/templates/ChecklistEnhancedTemplate.tsx(63,36): error TS7006: 
Parameter 'item' implicitly has an 'any' type.

// ✅ 解決法
{checklistItems.map((item: any, index: number) => (  // ← 明示的型追加
  <div key={index}>
    {item.text}
  </div>
))}
```

#### 4. **インデックスアクセス型エラー**
```typescript
// ❌ エラー例
app/components/TemplateViewer.tsx(194,16): error TS7053: 
Element implicitly has an 'any' type because expression of type 'TemplateType' 
can't be used to index type '{ enumeration: {...}; ... }'.
Property 'title-description-only' does not exist on type...

// ✅ 解決法
const sampleData = {
  enumeration: { title: 'サンプル', items: ['項目1'] },
  // 既存データ...
  'title-description-only': {           // ← 新テンプレートのサンプルデータ追加
    title: 'サンプルタイトル',
    description: 'サンプル説明文です。',
    badgeText: 'サンプル'
  },
  'checklist-enhanced': {
    title: 'チェックリストサンプル',
    checklistItems: [
      { text: 'サンプル項目1', checked: true, description: '詳細説明1' }
    ],
    badgeText: 'チェック'
  }
}
```

### 📋 エラー発生順序と対処優先度

**Phase 1: TemplateType追加直後（コンパイル時）**
1. Record<TemplateType, ...>型エラー（6ファイル） - **最優先**
2. switch文の無効なcase - **高優先**
3. インデックスアクセス型エラー - **高優先**

**Phase 2: 実装中（開発時）**
4. implicitなany型エラー - **中優先**
5. keywordsプロパティ不足 - **中優先**

**Phase 3: テスト時（実行時）**
6. undefined参照エラー（badgeMap等） - **低優先**（型チェックで事前発見可能）

**`Property 'keywords' is missing`**
```typescript
// ❌ 間違い
export const metadata = {
  id: 'template',
  name: 'Template'
  // keywordsが無い
}

// ✅ 正解
export const metadata = {
  id: 'template', 
  name: 'Template',
  keywords: ['keyword1', 'keyword2']  // 必須
}
```

**`Type 'string' is not assignable to type 'ReactNode'`**
```typescript
// ❌ 間違い
<p>{item}</p>

// ✅ 正解
<p>{typeof item === 'string' ? item : item.content || item.title || ''}</p>
```

**`Parameter 's' implicitly has an 'any' type`**
```typescript
// ❌ 間違い
items.every(item => item.title)

// ✅ 正解
items.every((item: any) => item.title)
```

### ⚠️ 忘れやすいポイント

1. **volumeRequirements重複**: templateMatchingService.tsの2箇所で同じ定義が必要
2. **switch文漏れ**: intelligentContentProcessor.tsの4つの関数すべてにケース追加
3. **インポート忘れ**: index.tsとTemplateRegistry.tsの両方でインポートが必要

## 🎉 完成！

このガイドに従えば、新テンプレートが完全に機能し、システム全体に統合されます。何か問題が発生した場合は、チェックリストを再確認してください。

---

## 📋 Quick Reference（新テンプレート追加時の緊急チェックリスト）

### 💥 TemplateType追加直後に必ずやること（TypeScriptエラー回避）

```bash
# 1. コンパイルチェック
npx tsc --noEmit

# 2. 以下のエラーが出たら対象ファイルを即座に更新：
```

**Record<TemplateType, ...>エラー → 6ファイル緊急更新**:
- [ ] `ContentApprovalComponent.tsx` - getTemplateTypeDisplayName
- [ ] `TemplateSelectionComponent.tsx` - 2箇所のRecord更新
- [ ] `TemplateViewer.tsx` - sampleData追加
- [ ] `contentLayoutService.ts` - badgeMap追加
- [ ] `templateMatchingService.ts` - 2箇所のvolumeRequirements
- [ ] `templateRecommendationService.ts` - 複数のRecord更新

**switch文エラー → case削除または修正**:
- [ ] `structureBasedTemplateSelector.ts` - 無効なcase削除

### 🔥 Critical Priority実装の教訓

**今回発見した隠れた更新箇所（追加リスト）**:
1. ContentApprovalComponent.tsx（見落としやすい）
2. TemplateSelectionComponent.tsx（2箇所更新）
3. TemplateViewer.tsx（サンプルデータ重要）
4. contentLayoutService.ts（実行時エラー原因）
5. templateMatchingService.ts（2箇所のvolumeRequirements）
6. templateRecommendationService.ts（複数のRecord）

**エラー回避の鉄則**:
- TemplateType追加 → 即座にコンパイルチェック
- Record<TemplateType, ...>エラー → 該当箇所を機械的に全更新
- 型エラーは妥協せず完全解決

**効率的なデバッグ順序**:
1. `npx tsc --noEmit` でエラー一覧取得
2. Record型エラーを最優先で解決（6ファイル）
3. switch文エラーを次に解決
4. その他の型エラーを最後に解決

この手順により、Critical Priority級の大規模テンプレート追加でも安全確実に実装できます。