# 次世代Claude Code作業指示書 - 全テンプレート編集機能実装

## 📋 プロジェクト概要
Instagram投稿生成ツールの16テンプレート全てに専用編集機能を実装する。

## 🎯 現在の進捗状況
- **完了**: 4/16テンプレート（25%）
- **完了済みテンプレート**:
  1. `item-n-title-content` - ItemNTitleContentEditor
  2. `checklist-enhanced` - ChecklistEnhancedEditor  
  3. `simple5` - Simple5Editor
  4. `title-description-only` - 基本編集で対応済み

## 🚨 重要な制約事項

### ❌ 絶対に触ってはいけない部分
- **templateMatchingService.ts**: マッチングロジックは完璧に調整済み
- **既存のテンプレート選択優先度**: 変更禁止
- **テンプレート選択キーワード**: 変更禁止

### ✅ 修正対象
- **編集機能のみ**: 専用エディタコンポーネントの実装
- **EditablePostGenerator.tsx**: エディタ統合
- **dynamicFieldDetector.ts**: 動的フィールド検出対応

## 🔧 実装パターン（Simple5Editorを参考に）

### 1. 各テンプレートの構造調査
```bash
# テンプレートファイルを確認
app/components/templates/[TemplateName]Template.tsx

# 重要確認項目:
# - data.○○で使用されているフィールド
# - 配列データの構造
# - 文字数制限（メタデータ）
# - 最大・最小個数制限
```

### 2. 専用エディタ作成
```bash
# ファイル作成
app/components/editors/[TemplateName]Editor.tsx

# 実装内容:
# - 配列データの動的編集
# - ドラッグ&ドロップ順序変更
# - 追加・削除機能
# - リアルタイムプレビュー
# - 文字数制限・個数制限
```

### 3. EditablePostGenerator統合
```typescript
// app/components/EditablePostGenerator.tsx
import { [TemplateName]Editor } from './editors/[TemplateName]Editor'

// 条件分岐追加
{page.templateType === 'template-name' && (
  <div className="border-t pt-6 mt-6">
    <[TemplateName]Editor
      data={page.templateData}
      onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
    />
  </div>
)}
```

### 4. 動的フィールド検出対応
```typescript
// app/services/dynamicFieldDetector.ts

// 基本フィールド追加
case 'template-name':
  return [
    ...commonFields,
    // 必要なフィールドを追加
  ]

// 動的フィールド検出追加
case 'template-name':
  // 配列データの動的フィールド検出
  break
```

## 📊 未実装テンプレート一覧（優先度順）

### Phase 2: High Priority (優先度8-9)
1. **enumeration** (優先度8)
   - 構造: `data.items` (配列)
   - 制限: 最大9個、各項目30文字
   - 特徴: 番号付きリスト形式

2. **ranking** (優先度8)
   - 構造: `data.rankingData` (配列)
   - 制限: 最大5個、ランキング形式
   - 特徴: 順位表示

3. **simple3** (優先度8-9)
   - 構造: `data.twoColumn.left/right` (2カラム)
   - 制限: 左右各3個まで
   - 特徴: 2カラム対比表示

4. **section-items** (優先度9)
   - 構造: `data.sections` (配列)
   - 制限: 最大4セクション
   - 特徴: セクション+アイテム形式

5. **graph** (優先度9)
   - 構造: `data.graphData` (配列)
   - 制限: 最大8個、グラフ形式
   - 特徴: データ可視化

### Phase 3: Medium Priority (優先度6-7)
6. **explanation2** (優先度6-7)
   - 構造: `data.sections` (配列)
   - 制限: 最大5セクション
   - 特徴: 説明・解説形式

7. **list** (優先度7)
   - 構造: `data.items` (配列)
   - 制限: 最大8個
   - 特徴: カード形式リスト

8. **table** (優先度7)
   - 構造: `data.tableData` (オブジェクト)
   - 制限: 最大10行
   - 特徴: テーブル形式

9. **simple6** (優先度6)
   - 構造: `data.items` (配列)
   - 制限: 最大8個
   - 特徴: 6つのポイント形式

### Phase 4: Missing Templates (定義不足)
10. **two-column-section-items** (定義不足)
    - templateMatchingService.tsに定義なし
    - 実装前に定義が必要

11. **single-section-no-items** (定義不足)
    - templateMatchingService.tsに定義なし
    - 実装前に定義が必要

### Phase 5: System Templates (低優先度)
12. **index** (システム用)
    - 編集不要の可能性あり

## 🛠️ 実装手順テンプレート

### Step 1: テンプレート構造調査
```bash
# テンプレートファイルを読み込み
Read app/components/templates/[TemplateName]Template.tsx

# 確認事項:
# 1. data.○○で使用されているフィールド名
# 2. 配列データの構造と処理方法
# 3. メタデータの文字数制限
# 4. 最大・最小個数制限
```

### Step 2: エディタコンポーネント作成
```typescript
// app/components/editors/[TemplateName]Editor.tsx
import React, { useState, useEffect } from 'react'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface [TemplateName]EditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

export function [TemplateName]Editor({ data, onUpdate }: [TemplateName]EditorProps) {
  // 実装内容:
  // - 初期データ設定
  // - 配列データの動的編集
  // - 追加・削除・並び替え機能
  // - バリデーション
  // - データ更新処理
}
```

### Step 3: 統合処理
```typescript
// EditablePostGenerator.tsx に統合
import { [TemplateName]Editor } from './editors/[TemplateName]Editor'

// 条件分岐追加
{page.templateType === 'template-name' && (
  <div className="border-t pt-6 mt-6">
    <[TemplateName]Editor
      data={page.templateData}
      onUpdate={(newData) => handlePageDataUpdate(editingPage, newData)}
    />
  </div>
)}
```

### Step 4: 動的フィールド検出対応
```typescript
// dynamicFieldDetector.ts に対応追加
case 'template-name':
  return [
    ...commonFields,
    // 必要なフィールドを追加
  ]

// 動的フィールド検出
case 'template-name':
  // 配列データの検出処理
  break
```

## 📝 実装参考例

### Simple5Editor実装例
```typescript
// 完全実装済み - 参考にしてください
app/components/editors/Simple5Editor.tsx
```

### 実装のポイント
1. **ドラッグ&ドロップ**: `onDragStart`, `onDragOver`, `onDrop`
2. **動的配列編集**: `useState`で状態管理
3. **バリデーション**: 最大・最小個数制限
4. **文字数制限**: `maxLength`属性とカウンター表示
5. **型安全性**: TypeScript完全対応

## 🎯 成功基準

### 各テンプレートの完成条件
1. **専用エディタ実装**: 配列データの完全編集
2. **統合完了**: EditablePostGeneratorに統合
3. **動的フィールド対応**: dynamicFieldDetectorに対応
4. **動作確認**: 実際のテンプレートで編集テスト
5. **型安全性**: TypeScriptエラーなし

### 全体完成条件
- **16/16テンプレート対応完了**: 100%編集機能実装
- **統一UX**: 一貫した編集体験
- **拡張性**: 新テンプレート追加時の自動対応

## 🔄 作業の進め方

### 1. 優先度順実装
Phase 2 → Phase 3 → Phase 4 → Phase 5

### 2. 実装後の確認
- 実際にテンプレートを生成してテスト
- 編集機能の動作確認
- TypeScriptエラーチェック

### 3. コミット・プッシュ
各テンプレート実装完了後に個別コミット

## 📚 重要ファイル一覧

### 実装対象ファイル
- `app/components/editors/[TemplateName]Editor.tsx` - 新規作成
- `app/components/EditablePostGenerator.tsx` - エディタ統合
- `app/services/dynamicFieldDetector.ts` - 動的フィールド対応

### 参考ファイル
- `app/components/templates/[TemplateName]Template.tsx` - 構造確認
- `app/components/editors/Simple5Editor.tsx` - 実装参考
- `app/components/editors/ChecklistEnhancedEditor.tsx` - 実装参考
- `app/components/editors/ItemNTitleContentEditor.tsx` - 実装参考

### 変更禁止ファイル
- `app/services/templateMatchingService.ts` - マッチングロジック
- 既存テンプレートファイル - 表示ロジック

## 🎉 最終目標

**全16テンプレート完全編集対応**により、Instagram投稿生成ツールの完全な実用化を達成し、保守性・拡張性の高いコードベースを構築する。

---

**次世代Claude Code**: この指示書に従って、残り12テンプレートの編集機能を段階的に実装してください。Simple5Editor実装パターンを参考に、効率的な開発を進めてください。