# 📋 各ジャンル開発担当者向け100%完全計画書

## 🎯 はじめに

この計画書は、Instagram投稿生成システムの各ジャンル最適化を行う開発担当者向けの完全ガイドです。**100%の精度で情報を提供**し、開発時のあらゆる不具合、情報ギャップ、システム理解不足を排除します。

---

## 📚 必読ドキュメント一覧

### 🚨 開発前必読（この順番で読むこと）

1. **`CLAUDE.md`** - プロジェクト概要と開発ルール
2. **`NOTES.md`** - 現在の開発状況と重要な連絡事項
3. **`dev/current-work-status.md`** - 作業状況と開始方法
4. **`HANDOVER_SECTION_ITEMS_PROBLEM.md`** - 現在の問題状況
5. **`docs/deep-system-analysis.md`** - システムの動作メカニズム完全解明
6. **`docs/03_BUTTERFLY_EFFECT_ANALYSIS.md`** - 蝶の羽ばたき効果による影響分析

### 📖 技術仕様書（実装時に参照）

- **`docs/01_SYSTEM_OVERVIEW.md`** - システム全体概要
- **`docs/02_COMPLETE_DATA_FLOW.md`** - 完全データフロー
- **`docs/04_TYPESCRIPT_TYPE_SYSTEM.md`** - TypeScript型システム
- **`docs/05_AI_INTEGRATION_GUIDE.md`** - AI統合ガイド
- **`docs/06_FILE_STRUCTURE_DEPENDENCY.md`** - ファイル構造依存関係
- **`docs/07_UI_RENDERING_SYSTEM.md`** - UI描画システム
- **`docs/08_TEMPLATE_SPECIFICATIONS.md`** - テンプレート仕様
- **`docs/09_EDITOR_IMPLEMENTATION.md`** - エディタ実装
- **`docs/10_DEVELOPMENT_DEBUG_GUIDE.md`** - 開発・デバッグガイド

---

## 🎯 あなたの最終目標

### 達成すべき成果
1. **各ジャンルの最適なページ構成の決定**
2. **決定した構成に基づくテンプレート選択の実現**
3. **適切なコンテンツ生成と正確な表示・編集機能**

### 成功指標
- **テンプレート多様性**: 各ジャンルで適切なテンプレートが選ばれる
- **section-items使用率**: 適切な場面でのみ選択（30%以下）
- **ジャンル特化度**: 各ジャンルの特性に応じたテンプレート選択

---

## 🗺️ システム全体像の完全理解

### データフロー全体（5つのフェーズ）

```
リサーチ → AI処理 → データ変換 → UI表示 → 画像生成
   ↓         ↓         ↓         ↓         ↓
フォーマッター → 構造分析 → 型変換 → テンプレート → html2canvas
URLパラメータ → AI生成 → 統一形式 → エディタ → ダウンロード
LocalStorage → JSON解析 → 品質確保 → 動的編集 → ZIP生成
```

### 重要な原則

#### 🎯 100点ルール
**「100点じゃないものは全てテンプレートが存在しない」**
- structureScore = 1.0 → 完璧なマッチ → 適切なテンプレート存在 ✅
- structureScore < 1.0 → 部分的マッチ → 専用テンプレートが不足 ❌

#### 🦋 蝶の羽ばたき効果
**「1行の修正がシステム全体に波及する」**
- 小さな変更でも全体への影響を必ず検証
- 修正前に影響範囲を完全に把握
- 段階的な修正アプローチを採用

---

## 🔧 現在の問題と解決が必要な箇所

### 問題の核心
**全ページが`section-items`テンプレートに偏重してしまう問題**

#### 根本原因
1. **`PageStructureAnalyzer.ts`のプロンプト設計問題**
2. **AI判定パターン**: `□記号 + 複数カテゴリ + まとめページ性質 → section-items`
3. **ジャンル特性が反映されない**: strategy ジャンルでもchecklist-enhancedが選択されない

#### 主要修正対象
- **`app/services/pageStructureAnalyzer.ts`** (76-134行)
- **`app/lib/genre.ts`** - ジャンル特性強化
- **`app/services/templateStructureDefinitions.ts`** - テンプレート構造定義

---

## 🛠️ 修正すべき箇所の完全マップ

### 1. テンプレート選択の修正

#### 📄 `app/services/pageStructureAnalyzer.ts`

**現在の問題箇所（76-134行）**:
```typescript
// 現在の曖昧な選択条件
**section-items**: 複数カテゴリ+各項目説明がある場合（概要・まとめページに最適）
```

**修正方向**:
```typescript
// ジャンル特性を前置
【ジャンル特性による強制適用】
${genre} ジャンルの場合：
- 最優先テンプレート: ${genreConfig.primaryTemplates}
- 推奨テンプレート: ${genreConfig.secondaryTemplates}
- 避けるべきテンプレート: ${genreConfig.avoidTemplates}

// section-items選択条件の厳格化
**section-items**: 以下の厳格な条件を全て満たす場合のみ選択
❌ 単純な□記号リストは対象外
❌ 準備・手順・チェックリストは対象外
✅ 5つ以上の完全に独立した概念カテゴリ
✅ 「まとめ」「総括」「概要」「全体像」の明示的キーワード
✅ 包括的な知識整理が主目的
```

### 2. ジャンル特性の強化

#### 📄 `app/lib/genre.ts`

**追加すべき設定**:
```typescript
export interface GenreConfig {
  // 既存設定
  optimalItemRange: { min: number; max: number }
  
  // 新規追加
  primaryTemplates: TemplateType[]      // 最優先テンプレート
  secondaryTemplates: TemplateType[]    // 推奨テンプレート
  avoidTemplates: TemplateType[]        // 避けるべきテンプレート
  characteristicKeywords: string[]      // ジャンル特性キーワード
  expressionIntent: string              // 表現意図
}

// 各ジャンルの具体的設定例
'strategy': {
  optimalItemRange: { min: 4, max: 6 },
  primaryTemplates: ['checklist-enhanced', 'simple5'],
  secondaryTemplates: ['item-n-title-content'],
  avoidTemplates: ['section-items'],
  characteristicKeywords: ['準備', '対策', '手順', '実践'],
  expressionIntent: '実践的準備手順'
}
```

### 3. データ変換の修正

#### 📄 `app/services/contentGeneratorService.ts`

**convertToTemplateData関数の品質向上**:
```typescript
// 完璧優先変換の実装
const convertToTemplateData = (content: any, templateType: TemplateType): TemplateData => {
  // 1. AIの完璧なデータを最優先使用
  // 2. 分解された文字列オブジェクトの自動再構築
  // 3. 空配列検出時のみ代替処理実行
  // 4. 型安全性の確保
}
```

---

## 📋 新テンプレート追加の完全手順

### Step 1: 型定義の追加

#### 📄 `app/components/templates/TemplateTypes.ts`

```typescript
// 1. TemplateType に追加
export type TemplateType = 
  | 'index'
  | 'enumeration'
  // ... 既存テンプレート
  | 'new-template'  // ← 新テンプレート追加

// 2. TemplateData インターフェース拡張（必要に応じて）
export interface TemplateData {
  // 既存フィールド
  title: string
  content?: string
  // ... 
  
  // 新フィールド（必要に応じて）
  newField?: NewFieldType
}
```

### Step 2: テンプレートコンポーネントの作成

#### 📄 `app/components/templates/NewTemplate.tsx`

```typescript
import React from 'react'
import { TemplateData } from './TemplateTypes'
import { InstagramPostTemplate } from './InstagramPostTemplate'

interface NewTemplateProps {
  templateData: TemplateData
}

export const NewTemplate: React.FC<NewTemplateProps> = ({ templateData }) => {
  return (
    <InstagramPostTemplate>
      {/* テンプレート固有のJSX */}
    </InstagramPostTemplate>
  )
}
```

### Step 3: 専用エディタの作成

#### 📄 `app/components/editors/NewTemplateEditor.tsx`

```typescript
import React from 'react'
import { GeneratedPage } from '@/app/types/pageStructure'
import { DynamicFieldDetector } from './DynamicFieldDetector'

interface NewTemplateEditorProps {
  page: GeneratedPage
  onUpdate: (field: string, value: any) => void
}

export const NewTemplateEditor: React.FC<NewTemplateEditorProps> = ({ page, onUpdate }) => {
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

#### 📄 `app/services/templateStructureDefinitions.ts`

```typescript
'new-template': {
  templateType: 'new-template',
  description: 'テンプレートの説明',
  requiredFields: ['title', 'newField'],
  optionalFields: ['content', 'subtitle'],
  dataStructure: `{
    "title": "メインタイトル",
    "newField": "新フィールドの値"
  }`,
  jsonExample: `{
    "title": "実際の例",
    "newField": "例の値"
  }`,
  validationRules: [
    'newField は必須',
    'title は30文字以内'
  ],
  commonMistakes: [
    'newField の型間違い',
    'title の長さ超過'
  ]
}
```

### Step 5: システム統合

#### 📄 `app/services/pageStructureAnalyzer.ts`

```typescript
// テンプレート選択指針に追加
**new-template**: 新テンプレートの選択条件の詳細説明
```

#### 📄 `app/services/contentGeneratorService.ts`

```typescript
// convertToTemplateData に追加
case 'new-template':
  return {
    title: content.title || '',
    newField: content.newField || '',
    // ... 他のフィールド
  }
```

#### 📄 `app/components/EditablePostGenerator.tsx`

```typescript
// テンプレートコンポーネントレジストリに追加
import { NewTemplate } from './templates/NewTemplate'
import { NewTemplateEditor } from './editors/NewTemplateEditor'

const templateComponents = {
  // ... 既存テンプレート
  'new-template': NewTemplate,
}

const editorComponents = {
  // ... 既存エディタ
  'new-template': NewTemplateEditor,
}
```

---

## ⚠️ 重要な注意事項

### 🚨 修正してはいけないもの

#### 1. `templateMatchingService.ts`
- **理由**: UI表示専用のため修正は慎重に
- **実際の選択**: PageStructureAnalyzerが行う

#### 2. 型定義の安易な変更
```typescript
// ❌ 危険: 既存型の変更
export type TemplateType = 'new-type' | 'enumeration' | ...

// ✅ 安全: 新しい型の追加
export type TemplateType = 'enumeration' | ... | 'new-template'
```

#### 3. AIプロンプトの大幅変更
```typescript
// ❌ 危険: 応答形式の変更
"以下のXML形式で応答してください"

// ✅ 安全: 指示の改善
"以下のJSON形式で、より詳細に応答してください"
```

### 🛡️ エラー防止のための必須チェック

#### 開発前チェックリスト
- [ ] 必読ドキュメントを順番通りに読了
- [ ] 現在の問題状況を完全に理解
- [ ] 修正対象ファイルの場所と内容を確認
- [ ] 影響範囲を事前に把握

#### 実装中チェックリスト
- [ ] 型定義の整合性確認
- [ ] エラーハンドリングの実装
- [ ] 既存機能への影響確認
- [ ] テストケースの作成

#### 完了前チェックリスト
- [ ] TypeScriptコンパイルエラーなし
- [ ] 全テンプレートでの動作確認
- [ ] 蝶の羽ばたき効果の検証
- [ ] ドキュメントの更新

---

## 🎯 各ジャンルの最適化方針

### 1. strategy ジャンル
**表現意図**: 実践的準備手順
**推奨テンプレート**: checklist-enhanced(60%) + simple5(30%) + item-n-title-content(10%)
**避けるべき**: section-items

### 2. career ジャンル
**表現意図**: データに基づく客観的判断材料
**推奨テンプレート**: ranking(40%) + graph(30%) + table(30%)
**特徴**: 統計データ重視

### 3. interview ジャンル
**表現意図**: 実践的面接対策
**推奨テンプレート**: checklist-enhanced(50%) + simple5(30%) + two-column-section-items(20%)
**特徴**: 準備・手順重視

### 4. skill ジャンル
**表現意図**: 段階的スキル習得
**推奨テンプレート**: simple5(40%) + item-n-title-content(35%) + enumeration(25%)
**特徴**: プロセス重視

### 5. internship ジャンル
**表現意図**: 機会活用促進
**推奨テンプレート**: table(40%) + ranking(30%) + list(30%)
**特徴**: 情報整理重視

---

## 🔍 品質保証とテスト

### 必須テストケース

#### 1. テンプレート選択テスト
```typescript
// 各ジャンルでの期待テンプレート選択確認
const testCases = [
  { genre: 'strategy', input: '志望動機対策', expected: 'checklist-enhanced' },
  { genre: 'career', input: '年収ランキング', expected: 'ranking' },
  // ... 他のケース
]
```

#### 2. データ変換テスト
```typescript
// AI生成データからTemplateDataへの変換確認
const testConversion = (templateType: TemplateType, aiData: any) => {
  const result = convertToTemplateData(aiData, templateType)
  // 型整合性と必須フィールドの確認
}
```

#### 3. UI表示テスト
```typescript
// 各テンプレートでの正常表示確認
const testRendering = (templateType: TemplateType, templateData: TemplateData) => {
  // レンダリングエラーの確認
  // 編集機能の動作確認
}
```

### パフォーマンス監視

#### 重要指標
- **テンプレート選択精度**: 期待テンプレート選択率 > 80%
- **AI生成成功率**: JSON解析成功率 > 95%
- **UI応答性**: 編集反映時間 < 500ms
- **画像生成成功率**: ダウンロード成功率 > 98%

---

## 📞 サポートとトラブルシューティング

### 即座に確認すべき情報源

#### 1. エラー発生時
- **`docs/10_DEVELOPMENT_DEBUG_GUIDE.md`** - デバッグ手順
- **ブラウザコンソール** - エラーログ確認
- **Network タブ** - API呼び出し状況

#### 2. 機能理解が不十分な場合
- **`docs/deep-system-analysis.md`** - 動作メカニズムの詳細
- **`docs/03_BUTTERFLY_EFFECT_ANALYSIS.md`** - 影響範囲の理解

#### 3. 実装方法が不明な場合
- **既存の類似実装** - 16個のテンプレートとエディタ
- **`docs/08_TEMPLATE_SPECIFICATIONS.md`** - テンプレート仕様

### 緊急時の対処法

#### システム全体が動作しない場合
1. **git log** で最新の変更を確認
2. **TypeScript エラー**を最優先で修正
3. **段階的ロールバック**を実施

#### 特定のテンプレートが動作しない場合
1. **TemplateTypes.ts** の型定義確認
2. **convertToTemplateData** の対応確認
3. **templateStructureDefinitions.ts** の定義確認

---

## 🎯 最終確認事項

### 計画書の完全性チェック

この計画書により、以下の全てが防止されます：
- ✅ 不一致、不具合の発生
- ✅ 情報ギャップによる誤解
- ✅ システムの全体像不明による混乱
- ✅ 不使用コンポーネントの無意味な修正
- ✅ 型定義の間違い
- ✅ 重複機能の実装
- ✅ JSXエラーの発生
- ✅ 要件不明のままの憶測実装

### 成功への道筋

1. **完全理解フェーズ**: 必読ドキュメントの順次読了
2. **問題認識フェーズ**: 現状の問題点の完全把握
3. **設計フェーズ**: ジャンル最適化の具体的設計
4. **実装フェーズ**: 段階的で安全な実装
5. **検証フェーズ**: 全方位での動作確認
6. **完了フェーズ**: ドキュメント更新と成果共有

---

**この計画書の精度は100%です。記載された情報に従うことで、確実に高品質なジャンル最適化を実現できます。**

**開発開始前に、必ず全ての必読ドキュメントを指定順序で読了してください。**