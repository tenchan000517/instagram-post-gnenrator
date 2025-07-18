# 08. Instagram投稿生成システム - 全16テンプレート実装仕様調査

## 📋 テンプレートシステム実装状況調査

Instagram投稿生成システムのテンプレートシステム実装調査結果です。**16種類の専用テンプレート**が実装済みであり、多様なコンテンツ構造に対応していることが確認されました。各テンプレートは独自のデータ構造、表示レイアウト、編集機能が実装済みであり、完全な型安全性を保ちながら動的に選択・表示されています。

### 実装調査で確認されたテンプレート設計原則
- **構造特化**: 各テンプレートは特定のデータ構造に最適化されて実装済み
- **視覚的差別化**: 明確に異なる表示パターンで単調性を回避して実装済み
- **編集可能性**: 全フィールドのリアルタイム編集対応で実装済み
- **型安全性**: TypeScriptによる厳密な型定義で実装済み

## 🎯 実装済みテンプレート分類

### 実装調査で確認されたコンテンツタイプ別分類
```
リスト系（6種類）
├── enumeration        # 番号付きリスト
├── list              # シンプルリスト
├── checklist-enhanced # チェックリスト
├── section-items     # セクション+アイテム
├── two-column-section-items # 2カラムセクション
└── item-n-title-content # 独立アイテム群

構造化系（4種類）
├── simple3           # 3要素比較
├── simple5           # 5ステップ
├── simple6           # 6要素
└── explanation2      # 2要素詳細解説

データ表示系（3種類）
├── table             # 表形式
├── ranking           # ランキング
└── graph             # グラフ・統計

特殊用途系（3種類）
├── index             # 目次・インデックス
├── title-description-only # シンプルメッセージ
└── single-section-no-items # 単一セクション
```

### 実装調査で確認された複雑度分類
- **Simple（5種類）**: title-description-only, list, simple3, single-section-no-items, enumerationで実装済み
- **Medium（7種類）**: section-items, checklist-enhanced, simple5, simple6, explanation2, two-column-section-items, indexで実装済み
- **Complex（4種類）**: item-n-title-content, table, ranking, graphで実装済み

## 📄 実装済みテンプレート詳細仕様

### 1. IndexTemplate - 実装済み目次・インデックス

#### 基本情報
```typescript
TemplateType: 'index'
複雑度: Medium
用途: 目次、インデックス、概要ページ
実装ファイル: app/components/templates/IndexTemplate.tsx
エディター: app/components/editors/IndexEditor.tsx ✅
```

#### データ構造要件
```typescript
interface IndexData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  items: Array<{                  // インデックス項目（必須）
    title: string                 // 項目タイトル
    description?: string          // 項目説明
    pageNumber?: number           // ページ番号
  }>
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- items配列は必須（最低3個、最大8個）
- 各item.titleは必須（30文字以内）
- item.descriptionは50文字以内
- 全体titleは40文字以内
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div>
      <h1 className="text-2xl font-bold text-white text-center mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-white/80 text-center mb-4">{subtitle}</p>
      )}
      {badgeText && (
        <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm text-center mb-6">
          {badgeText}
        </div>
      )}
    </div>

    {/* インデックス項目 */}
    <div className="flex-1 space-y-3">
      {items.map((item, index) => (
        <div key={index} className="bg-white/90 rounded-lg p-3 flex items-center">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
            {item.pageNumber || index + 1}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{item.title}</h3>
            {item.description && (
              <p className="text-sm text-gray-600">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</InstagramPostTemplate>
```

#### 使用例・適用場面
```typescript
// 適用条件
- 複数のトピックを網羅的に紹介する場合
- ステップバイステップガイドの目次として
- カテゴリ別情報の一覧表示

// 実際の使用例
{
  title: "就活完全攻略ロードマップ",
  subtitle: "内定獲得までの8ステップ",
  items: [
    { title: "自己分析", description: "強みと価値観の発見", pageNumber: 1 },
    { title: "業界研究", description: "志望業界の徹底理解", pageNumber: 2 },
    { title: "企業研究", description: "志望企業の詳細分析", pageNumber: 3 },
    // ...
  ],
  badgeText: "就活ガイド"
}
```

---

### 2. EnumerationTemplate - 番号付きリスト

#### 基本情報
```typescript
TemplateType: 'enumeration'
複雑度: Simple
用途: 順序のある手順、ランク付け項目
実装ファイル: app/components/templates/EnumerationTemplate.tsx
エディター: app/components/editors/EnumerationEditor.tsx ✅
```

#### データ構造要件
```typescript
interface EnumerationData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  items: string[]                 // 番号付き項目（必須）
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- items配列は必須（最低3個、最大7個）
- 各itemは30文字以内
- titleは40文字以内
- 順序性が重要なコンテンツに使用
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-6">
      <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
      {badgeText && (
        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      )}
    </div>

    {/* 番号付きリスト */}
    <div className="flex-1 space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
          </div>
          <div className="bg-white/90 rounded-lg p-3 flex-1">
            <p className="text-gray-800 text-sm leading-relaxed">{item}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</InstagramPostTemplate>
```

#### 使用例・適用場面
```typescript
// 適用条件
- 手順に順序性がある場合
- ステップバイステップの説明
- 重要度順のランキング

// 実際の使用例
{
  title: "面接成功の5ステップ",
  items: [
    "企業研究を徹底的に行う",
    "志望動機を具体的に準備する", 
    "STAR法で経験談を整理する",
    "逆質問を3つ以上準備する",
    "本番前に模擬面接で練習する"
  ],
  badgeText: "面接対策"
}
```

---

### 3. ListTemplate - シンプルリスト

#### 基本情報
```typescript
TemplateType: 'list'
複雑度: Simple
用途: シンプルなチェックリスト、項目一覧
実装ファイル: app/components/templates/ListTemplate.tsx
エディター: app/components/editors/ListEditor.tsx ✅
```

#### データ構造要件
```typescript
interface ListData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  items: string[]                 // リスト項目（必須）
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- items配列は必須（最低3個、最大8個）
- 各itemは25文字以内
- titleは35文字以内
- 順序性が不要なコンテンツに使用
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-6">
      <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
    </div>

    {/* シンプルリスト */}
    <div className="flex-1">
      <div className="bg-white/90 rounded-lg p-4">
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
              <span className="text-gray-800 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

---

### 4. ExplanationTwoTemplate - 2要素詳細解説

#### 基本情報
```typescript
TemplateType: 'explanation2'
複雑度: Medium
用途: 2つの要素の詳細解説、比較
実装ファイル: app/components/templates/ExplanationTwoTemplate.tsx
エディター: app/components/editors/ExplanationTwoEditor.tsx ✅
```

#### データ構造要件
```typescript
interface ExplanationTwoData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 全体説明
  points: Array<{                 // 解説ポイント（必須、2個固定）
    title: string                 // ポイントタイトル
    description: string           // 詳細説明
  }>
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- points配列は必須（2個固定）
- 各point.titleは25文字以内
- 各point.descriptionは80文字以内
- titleは40文字以内
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-6">
      <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
      {content && <p className="text-white/90 text-xs mt-2">{content}</p>}
    </div>

    {/* 2要素解説 */}
    <div className="flex-1 space-y-4">
      {points.map((point, index) => (
        <div key={index} className="bg-white/90 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
              {index + 1}
            </div>
            <h3 className="font-bold text-gray-800">{point.title}</h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed ml-9">
            {point.description}
          </p>
        </div>
      ))}
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

---

### 5. SimpleThreeTemplate - 3要素比較

#### 基本情報
```typescript
TemplateType: 'simple3'
複雑度: Simple
用途: 3要素の比較、選択肢提示
実装ファイル: app/components/templates/SimpleThreeTemplate.tsx
エディター: app/components/editors/SimpleThreeEditor.tsx ✅
```

#### データ構造要件
```typescript
interface SimpleThreeData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  items: string[]                 // 3要素（必須、3個固定）
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- items配列は必須（3個固定）
- 各itemは20文字以内
- titleは35文字以内
- 比較・選択肢の提示に使用
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-6">
      <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-sm">{subtitle}</p>}
    </div>

    {/* 3要素グリッド */}
    <div className="flex-1 flex flex-col justify-center space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white/90 rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
            {index + 1}
          </div>
          <p className="font-semibold text-gray-800">{item}</p>
        </div>
      ))}
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

---

### 6. TableTemplate - 表形式

#### 基本情報
```typescript
TemplateType: 'table'
複雑度: Complex
用途: 表形式データ、比較表
実装ファイル: app/components/templates/TableTemplate.tsx
エディター: app/components/editors/TableEditor.tsx ✅
```

#### データ構造要件
```typescript
interface TableData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  tableData: {                    // 表データ（必須）
    headers: string[]             // ヘッダー行
    rows: string[][]              // データ行
  }
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- tableData.headersは必須（2-4カラム）
- rowsは必須（2-6行）
- 各セルは15文字以内
- titleは30文字以内
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-4">
      <h1 className="text-lg font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-xs">{subtitle}</p>}
    </div>

    {/* テーブル */}
    <div className="flex-1">
      <div className="bg-white/90 rounded-lg overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-blue-500 text-white">
              {tableData.headers.map((header, index) => (
                <th key={index} className="p-2 text-center font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-2 text-center text-gray-800">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

---

### 7. SimpleFiveTemplate - 5ステップ

#### 基本情報
```typescript
TemplateType: 'simple5'
複雑度: Medium
用途: 5段階の手順、プロセス説明
実装ファイル: app/components/templates/SimpleFiveTemplate.tsx
エディター: app/components/editors/Simple5Editor.tsx ✅
```

#### データ構造要件
```typescript
interface SimpleFiveData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  steps: Array<{                  // ステップ（必須、5個固定）
    step: number                  // ステップ番号
    title: string                 // ステップタイトル
    description: string           // ステップ説明
  }>
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- steps配列は必須（5個固定）
- 各step.titleは20文字以内
- 各step.descriptionは40文字以内
- titleは35文字以内
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-4">
      <h1 className="text-lg font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-xs">{subtitle}</p>}
    </div>

    {/* 5ステップ */}
    <div className="flex-1 space-y-3">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 font-bold text-sm">{step.step}</span>
          </div>
          <div className="bg-white/90 rounded-lg p-3 flex-1">
            <h3 className="font-semibold text-gray-800 text-sm mb-1">{step.title}</h3>
            <p className="text-xs text-gray-600">{step.description}</p>
          </div>
        </div>
      ))}
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

---

### 8. SimpleSixTemplate - 6要素

#### 基本情報
```typescript
TemplateType: 'simple6'
複雑度: Medium
用途: 6要素の体系的説明
実装ファイル: app/components/templates/SimpleSixTemplate.tsx
エディター: app/components/editors/SimpleSixEditor.tsx ✅
```

#### データ構造要件
```typescript
interface SimpleSixData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  items: string[]                 // 6要素（必須、6個固定）
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- items配列は必須（6個固定）
- 各itemは18文字以内
- titleは30文字以内
- 6要素での体系的説明に使用
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-4">
      <h1 className="text-lg font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-xs">{subtitle}</p>}
    </div>

    {/* 6要素グリッド（2x3） */}
    <div className="flex-1">
      <div className="grid grid-cols-2 gap-3 h-full">
        {items.map((item, index) => (
          <div key={index} className="bg-white/90 rounded-lg p-3 flex flex-col items-center justify-center text-center">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mb-2">
              {index + 1}
            </div>
            <p className="text-xs font-medium text-gray-800 leading-tight">{item}</p>
          </div>
        ))}
      </div>
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

---

### 9. SectionItemsTemplate - セクション+アイテム

#### 基本情報
```typescript
TemplateType: 'section-items'
複雑度: Medium
用途: セクション別アイテム一覧、カテゴリ分類
実装ファイル: app/components/templates/SectionItemsTemplate.tsx
エディター: app/components/editors/SectionItemsEditor.tsx ✅
```

#### データ構造要件
```typescript
interface SectionItemsData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  sections: Array<{               // セクション（必須）
    title: string                 // セクションタイトル
    content: string               // セクション説明
    items: string[]               // セクション内アイテム
  }>
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- sections配列は必須（通常1個、最大2個）
- 各section.titleは25文字以内
- 各section.contentは60文字以内
- section.itemsは3-7個
- 各itemは20文字以内
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6 relative">
    {/* ヘッダー */}
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-center mb-4 text-white">
        {title}
      </h1>

      {badgeText && (
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium text-center mb-4">
          {badgeText}
        </div>
      )}

      {/* セクション一覧 */}
      {sections?.map((section, index) => (
        <div key={index} className="bg-white/90 rounded-lg p-4 shadow-sm mb-4">
          <h2 className="font-bold text-lg text-blue-600 mb-2">
            {section.title}
          </h2>
          <p className="text-sm text-gray-700 mb-3">
            {section.content}
          </p>
          {section.items && section.items.length > 0 && (
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </div>
</InstagramPostTemplate>
```

---

### 10. TwoColumnSectionItemsTemplate - 2カラムセクション

#### 基本情報
```typescript
TemplateType: 'two-column-section-items'
複雑度: Medium
用途: 2つのカテゴリでの分類表示
実装ファイル: app/components/templates/TwoColumnSectionItemsTemplate.tsx
エディター: app/components/editors/TwoColumnSectionItemsEditor.tsx ✅
```

#### データ構造要件
```typescript
interface TwoColumnSectionItemsData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  twoColumn: {                    // 2カラムデータ（必須）
    left: Array<string | {        // 左カラム
      title?: string
      content?: string
    }>
    right: Array<string | {       // 右カラム
      title?: string
      content?: string
    }>
  }
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- twoColumnは必須
- left/right配列はそれぞれ3-6個
- 各項目は25文字以内
- titleは35文字以内
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-4">
      <h1 className="text-lg font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-xs">{subtitle}</p>}
    </div>

    {/* 2カラムレイアウト */}
    <div className="flex-1">
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* 左カラム */}
        <div className="bg-white/90 rounded-lg p-4">
          <h3 className="font-bold text-blue-600 text-sm mb-3 text-center">カテゴリA</h3>
          <ul className="space-y-2">
            {twoColumn.left.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-1.5"></span>
                <span className="text-xs text-gray-700">
                  {typeof item === 'string' ? item : item.title || item.content}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 右カラム */}
        <div className="bg-white/90 rounded-lg p-4">
          <h3 className="font-bold text-blue-600 text-sm mb-3 text-center">カテゴリB</h3>
          <ul className="space-y-2">
            {twoColumn.right.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-1.5"></span>
                <span className="text-xs text-gray-700">
                  {typeof item === 'string' ? item : item.title || item.content}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

---

### 11. TitleDescriptionOnlyTemplate - シンプルメッセージ

#### 基本情報
```typescript
TemplateType: 'title-description-only'
複雑度: Simple
用途: シンプルメッセージ、重要告知
実装ファイル: app/components/templates/TitleDescriptionOnlyTemplate.tsx
エディター: 基本編集で対応（専用エディターなし）
```

#### データ構造要件
```typescript
interface TitleDescriptionOnlyData {
  title: string                    // メインタイトル（必須）
  description: string              // 説明文（必須）
  subtitle?: string               // サブタイトル
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- titleは必須（50文字以内）
- descriptionは必須（200文字以内）
- シンプルなメッセージ伝達に使用
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-center items-center p-8 text-center">
    {/* メインコンテンツ */}
    <div className="space-y-6">
      {badgeText && (
        <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
          {badgeText}
        </div>
      )}
      
      <h1 className="text-2xl font-bold text-white leading-tight">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-white/90 text-lg font-medium">
          {subtitle}
        </p>
      )}
      
      <div className="bg-white/90 rounded-lg p-6">
        <p className="text-gray-800 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
</InstagramPostTemplate>
```

---

### 12. ChecklistEnhancedTemplate - チェックリスト

#### 基本情報
```typescript
TemplateType: 'checklist-enhanced'
複雑度: Medium
用途: 詳細説明付きチェックリスト
実装ファイル: app/components/templates/ChecklistEnhancedTemplate.tsx
エディター: app/components/editors/ChecklistEnhancedEditor.tsx ✅
```

#### データ構造要件
```typescript
interface ChecklistEnhancedData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  checklistItems: Array<{         // チェックリスト項目（必須）
    text: string                  // チェック項目
    description: string           // 詳細説明
    checked: boolean              // チェック状態
  }>
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- checklistItems配列は必須（3-6個）
- 各item.textは30文字以内
- 各item.descriptionは50文字以内
- titleは40文字以内
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-4">
      <h1 className="text-lg font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-xs">{subtitle}</p>}
    </div>

    {/* チェックリスト */}
    <div className="flex-1 space-y-3">
      {checklistItems.map((item, index) => (
        <div key={index} className="bg-white/90 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                item.checked 
                  ? 'bg-green-500 border-green-500' 
                  : 'bg-white border-gray-300'
              }`}>
                {item.checked && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.text}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

---

### 13. ItemNTitleContentTemplate - 独立アイテム群

#### 基本情報
```typescript
TemplateType: 'item-n-title-content'
複雑度: Complex
用途: 独立性の高い複数項目の詳細説明
実装ファイル: app/components/templates/ItemNTitleContentTemplate.tsx
エディター: app/components/editors/ItemNTitleContentEditor.tsx ✅
```

#### データ構造要件
```typescript
interface ItemNTitleContentData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  // 動的フィールド（item1Title, item1Content, item2Title, item2Content...）
  [key: string]: any              // 動的アクセス用
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- item{N}Titleフィールドが必須（N=1,2,3...）
- item{N}Contentフィールドが必須
- 通常3-5個のアイテム
- 各titleは25文字以内
- 各contentは60文字以内
```

#### 動的フィールドアクセス
```typescript
// dynamicFieldDetector.tsによる動的フィールド検出
const detectItemFields = (templateData: TemplateData): Array<{title: string, content: string}> => {
  const items: Array<{title: string, content: string}> = []
  let index = 1
  
  while (templateData[`item${index}Title`] || templateData[`item${index}Content`]) {
    items.push({
      title: templateData[`item${index}Title`] || '',
      content: templateData[`item${index}Content`] || ''
    })
    index++
  }
  
  return items
}
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-4">
      <h1 className="text-lg font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-xs">{subtitle}</p>}
    </div>

    {/* アイテム一覧 */}
    <div className="flex-1 space-y-3">
      {detectedItems.map((item, index) => (
        <div key={index} className="bg-white/90 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

---

### 14. SingleSectionNoItemsTemplate - 単一セクション

#### 基本情報
```typescript
TemplateType: 'single-section-no-items'
複雑度: Simple
用途: 単一セクションの詳細説明
実装ファイル: app/components/templates/SingleSectionNoItemsTemplate.tsx
エディター: app/components/editors/SingleSectionNoItemsEditor.tsx ✅
```

#### データ構造要件
```typescript
interface SingleSectionNoItemsData {
  title: string                    // メインタイトル（必須）
  content: string                  // メインコンテンツ（必須）
  subtitle?: string               // サブタイトル
  description?: string            // 追加説明
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- contentは必須（150文字以内）
- titleは40文字以内
- descriptionは80文字以内
- 単一セクションの詳細説明に使用
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-center p-8">
    {/* メインコンテンツ */}
    <div className="text-center space-y-6">
      {badgeText && (
        <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
          {badgeText}
        </div>
      )}
      
      <h1 className="text-xl font-bold text-white">
        {title}
      </h1>
      
      {subtitle && (
        <p className="text-white/90 text-base font-medium">
          {subtitle}
        </p>
      )}
      
      <div className="bg-white/90 rounded-lg p-6">
        <p className="text-gray-800 text-sm leading-relaxed text-left">
          {content}
        </p>
        
        {description && (
          <p className="text-gray-600 text-xs mt-4 text-left">
            {description}
          </p>
        )}
      </div>
    </div>
  </div>
</InstagramPostTemplate>
```

---

### 15. RankingTemplate - ランキング

#### 基本情報
```typescript
TemplateType: 'ranking'
複雑度: Complex
用途: ランキング、順位データ
実装ファイル: app/components/templates/RankingTemplate.tsx
エディター: app/components/editors/RankingEditor.tsx ✅
```

#### データ構造要件
```typescript
interface RankingData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  rankingData: Array<{            // ランキングデータ（必須）
    rank: number                  // 順位
    name: string                  // 項目名
    value: string                 // 値・スコア
    description?: string          // 説明
  }>
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- rankingData配列は必須（3-6個）
- 各item.rankは1から連番
- 各item.nameは25文字以内
- 各item.valueは15文字以内
- titleは35文字以内
```

#### 表示レイアウト
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-4">
      <h1 className="text-lg font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-xs">{subtitle}</p>}
    </div>

    {/* ランキング */}
    <div className="flex-1 space-y-3">
      {rankingData.map((item, index) => (
        <div key={index} className="bg-white/90 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            {/* 順位バッジ */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
              item.rank === 1 ? 'bg-yellow-500 text-white' :
              item.rank === 2 ? 'bg-gray-400 text-white' :
              item.rank === 3 ? 'bg-orange-600 text-white' :
              'bg-blue-500 text-white'
            }`}>
              {item.rank}
            </div>
            
            {/* 項目情報 */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                <span className="text-blue-600 font-semibold text-sm">{item.value}</span>
              </div>
              {item.description && (
                <p className="text-xs text-gray-600 mt-1">{item.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

---

### 16. GraphTemplate - グラフ・統計

#### 基本情報
```typescript
TemplateType: 'graph'
複雑度: Complex
用途: グラフ、統計データ、視覚的データ表現
実装ファイル: app/components/templates/GraphTemplate.tsx
エディター: app/components/editors/GraphEditor.tsx ✅
```

#### データ構造要件
```typescript
interface GraphData {
  title: string                    // メインタイトル（必須）
  subtitle?: string               // サブタイトル
  content?: string                // 説明文
  graphData: {                    // グラフデータ（必須）
    type: 'pie' | 'bar'           // グラフタイプ
    data?: Array<{                // 円グラフ用
      name: string
      value: number
      color?: string
    }>
    categories?: string[]         // 棒グラフ用
    series?: Array<{              // 棒グラフ用
      name: string
      data: number[]
      unit?: string
    }>
    source?: {                    // データソース
      organization: string
      year: string
      date?: string
      url?: string
    }
  }
  badgeText?: string              // バッジテキスト
}

// 検証ルール
- graphDataは必須
- type = 'pie'の場合、data配列が必須（3-6個）
- type = 'bar'の場合、categories/series配列が必須
- 各data.nameは15文字以内
- titleは30文字以内
```

#### 表示レイアウト（円グラフ例）
```tsx
<InstagramPostTemplate>
  <div className="h-full flex flex-col justify-between p-6">
    {/* ヘッダー */}
    <div className="text-center mb-4">
      <h1 className="text-lg font-bold text-white mb-2">{title}</h1>
      {subtitle && <p className="text-white/80 text-xs">{subtitle}</p>}
    </div>

    {/* グラフ表示 */}
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white/90 rounded-lg p-4 w-full">
        {graphData.type === 'pie' && (
          <div className="space-y-4">
            {/* 簡易円グラフ表現 */}
            <div className="grid grid-cols-2 gap-2">
              {graphData.data?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color || `hsl(${index * 60}, 70%, 50%)` }}
                  ></div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-600">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* データソース */}
            {graphData.source && (
              <div className="text-xs text-gray-500 text-center border-t pt-2">
                出典: {graphData.source.organization} ({graphData.source.year})
              </div>
            )}
          </div>
        )}
        
        {graphData.type === 'bar' && (
          <div className="space-y-3">
            {/* 簡易棒グラフ表現 */}
            {graphData.categories?.map((category, index) => (
              <div key={index} className="space-y-1">
                <div className="text-xs font-medium text-gray-800">{category}</div>
                {graphData.series?.map((series, seriesIndex) => (
                  <div key={seriesIndex} className="flex items-center space-x-2">
                    <div className="w-16 text-xs text-gray-600">{series.name}</div>
                    <div className="flex-1 bg-gray-200 rounded h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded"
                        style={{ width: `${(series.data[index] / Math.max(...series.data)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600">
                      {series.data[index]}{series.unit || ''}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* フッター */}
    {badgeText && (
      <div className="text-center mt-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs">
          {badgeText}
        </span>
      </div>
    )}
  </div>
</InstagramPostTemplate>
```

## 📊 テンプレート選択マトリクス

### AI判定基準
```typescript
// pageStructureAnalyzer.tsでの選択ロジック
const TEMPLATE_SELECTION_CRITERIA = {
  'checklist-enhanced': '各チェック項目に詳細説明がある準備リスト・手順リストがある場合',
  'section-items': '複数カテゴリ+各項目説明がある場合（概要・まとめページに最適）',
  'item-n-title-content': '独立性の高い項目が複数ある場合',
  'enumeration': '順序のある番号付きリストの場合',
  'ranking': 'ランキング・順位データがある場合',
  'graph': 'グラフ・統計データがある場合',
  'table': '表形式データが最適な場合',
  'simple5': 'ステップバイステップの手順がある場合',
  'simple3': '3つの要素の比較・対比がある場合',
  'explanation2': '詳細な解説・説明が必要な場合',
  'title-description-only': 'シンプルなメッセージ伝達の場合',
  'two-column-section-items': '2つのカテゴリで分類される場合',
  'single-section-no-items': 'アイテムリストなしの単一セクション説明の場合',
  'list': 'シンプルなチェックリスト形式の場合',
  'index': '目次・インデックスページが必要な場合'
}
```

### コンテンツ特性別推奨テンプレート
```typescript
const CONTENT_TYPE_RECOMMENDATIONS = {
  // 手順・プロセス系
  'step-by-step': ['simple5', 'enumeration', 'checklist-enhanced'],
  'process': ['simple5', 'explanation2', 'section-items'],
  
  // リスト・一覧系
  'checklist': ['checklist-enhanced', 'list', 'enumeration'],
  'catalog': ['section-items', 'item-n-title-content', 'index'],
  
  // 比較・分析系
  'comparison': ['simple3', 'two-column-section-items', 'table'],
  'analysis': ['explanation2', 'section-items', 'graph'],
  
  // データ・統計系
  'statistics': ['graph', 'table', 'ranking'],
  'ranking': ['ranking', 'enumeration', 'table'],
  
  // メッセージ・告知系
  'announcement': ['title-description-only', 'single-section-no-items'],
  'summary': ['section-items', 'index', 'simple3']
}
```

## 🛠️ テンプレート開発・保守ガイド

### 新テンプレート追加手順
1. **TemplateType更新**: `app/components/templates/TemplateTypes.ts`
2. **テンプレートコンポーネント作成**: `app/components/templates/NewTemplate.tsx`
3. **エディター作成**: `app/components/editors/NewEditor.tsx`
4. **templateComponents登録**: `app/components/EditablePostGenerator.tsx`
5. **editorComponents登録**: `app/components/EditablePostGenerator.tsx`
6. **メタデータ追加**: `app/components/templates/templateRegistry.ts`
7. **AI選択指針追加**: `app/services/pageStructureAnalyzer.ts`

### テンプレート品質チェックリスト
- [ ] Instagram投稿サイズ（540x540px）で適切表示
- [ ] 文字数制限の遵守
- [ ] レスポンシブ対応
- [ ] エラーハンドリング実装
- [ ] アクセシビリティ考慮
- [ ] 型安全性確保
- [ ] エディター機能完備

---

## 🎯 テンプレート仕様実装調査の達成

このテンプレート仕様実装調査により、Instagram投稿生成システムの全16テンプレートの実装状況と仕様詳細が明確に把握されました。

### 達成された調査結果
- **✅ 全16テンプレート**: 全てのテンプレートが実装済みで動作確認済み
- **✅ コンテンツタイプ分類**: リスト系6種類、構造化系4種類、データ表示系3種類、特殊用途系3種類
- **✅ 複雑度分類**: Simple5種類、Medium7種類、Complex4種類の実装確認
- **✅ データ構造**: 各テンプレートの特化されたデータ構造実装
- **✅ 表示ロジック**: レスポンシブデザインとInstagram投稿サイズ最適化
- **✅ 編集機能**: 15/16テンプレートに専用エディター実装

### 主要実装ファイル一覧
```
テンプレートシステム実装:
/app/components/templates/ (16テンプレートコンポーネント)
/app/components/editors/ (15専用エディター)
/app/components/templates/TemplateTypes.ts (型定義)
/app/components/templates/templateRegistry.ts (メタデータ)
/app/components/EditablePostGenerator.tsx (統合UI)
```

次の「09_EDITOR_IMPLEMENTATION.md」で、エディター実装の詳細調査結果を確認してください。