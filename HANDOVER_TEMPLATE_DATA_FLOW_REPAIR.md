# HANDOVER: テンプレートデータフロー修復プロジェクト

## 🎯 プロジェクト概要
Instagram投稿生成ツールのテンプレートマッチング・データ変換システムの根本的修復プロジェクト

## 📋 完全計画書の場所
**メイン計画書**: `/mnt/c/instagram-course/instagram-post-generator/TEMPLATE_DATA_FLOW_REPAIR_PLAN.md`

## 🚨 根本問題（修復対象）
1. **データ構造重複**: `templateData` と `content` の2つが並存し、どちらが使用されるか不明
2. **必須項目大量欠損**: 各テンプレートの必須項目が空文字や空配列
3. **データマッピング失敗**: AI生成データが適切にテンプレート形式に変換されていない
4. **テンプレート選択ミス**: 必須項目が揃わないテンプレートが選択される

## ✅ 完了済み作業

### 1. テンプレート整理・アーカイブ化 ✅
**低完成度テンプレート（5個）をアーカイブ**:
- `StoryTemplate.tsx`
- `SimpleTemplate.tsx`  
- `SimpleTwoTemplate.tsx`
- `ExplanationTemplate.tsx`
- `SimpleFourTemplate.tsx`

**移動先**: `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/archive/`

### 2. アクティブテンプレート（9個）を確定 ✅
**高完成度・必要テンプレート**:
1. **EnumerationTemplate** - 順番・ソートありの単純リスト専用
2. **ListTemplate** - 順番なしチェックリスト専用  
3. **ExplanationTwoTemplate** - タイトル→解説の繰り返し構造
4. **SimpleThreeTemplate** - 2カラム比較構造専用
5. **TableTemplate** - テーブル構造専用（特殊ケース）
6. **SimpleFiveTemplate** - ステップ型（完成度高）
7. **SimpleSixTemplate** - まとめ構造専用
8. **SectionItemsTemplate** - セクション+アイテム型（新規実装）
9. **TwoColumnSectionItemsTemplate** - 2カラムセクション+アイテム型（新規実装）

### 3. 関連ファイル修正完了 ✅
- **TemplateViewer.tsx**: アーカイブ済みテンプレートを除外、9種類に更新
- **TemplateRegistry.ts**: アクティブテンプレートのみのレジストリに更新
- **index.ts**: アクティブテンプレートのみのエクスポートに更新
- **TemplateTypes.ts**: アクティブテンプレート（9個）の型定義に更新

## 🎯 次の作業（ステップ1）
**ステップ1: データフロー完全調査**

### 実行内容
#### 1.1 contentGeneratorService.ts の調査
- AI生成からパース完了までの処理フロー確認
- `templateData` と `content` の生成タイミング特定
- データ変換ロジックの場所特定

**確認ポイント**:
- どこで `templateData` が作られるか？
- どこで `content` が作られるか？
- 変換処理は何回実行されるか？

#### 1.2 pureStructureMatchingService.ts の調査
- `matchTemplateToContent` メソッドの詳細分析
- テンプレート選択後のデータマッピング処理確認
- `updatedTemplateData` の生成ロジック確認

**確認ポイント**:
- テンプレート選択基準は正しいか？
- データマッピングは全テンプレート（9個）で実装されているか？
- 欠損データの処理は適切か？

#### 1.3 テンプレートでの実際のデータ使用確認
- 各テンプレートが `data.xxx` でアクセスしているフィールド確認
- `templateData` と `content` のどちらを参照しているか確認

### 対象ファイル
- `app/services/contentGeneratorService.ts` - AI生成とパース処理
- `app/services/pureStructureMatchingService.ts` - テンプレート選択ロジック
- `app/components/templates/*Template.tsx` - アクティブ9テンプレート

## 📊 実際のデータ問題例（分析済み）

### 現在のデータ構造問題
```javascript
// 問題のある構造（重複・欠損）
{
  templateData: { /* テンプレート用？欠損多数 */ },
  content: { /* 元データ？どちらが使用される？ */ }
}
```

### 具体的欠損例
| ページ | テンプレート | 欠損項目 | 影響 |
|--------|------------|---------|-----|
| 2 | simple2 | `boxes` (空構造) | ボックス表示不可 |
| 3 | simple4 | `content` (空文字) | 説明文表示不可 |
| 5 | simple3 | `twoColumn` (存在しない) | 2カラム表示不可 |

## 🛠️ 修復戦略（計画書より）

### 統一データ構造への移行
```typescript
// 目標構造
interface UnifiedPageData {
  pageNumber: number
  templateType: TemplateType
  data: TemplateData  // 統一されたデータ
}
```

### 各テンプレート専用マッピング
- 9テンプレート用の完全マッピング関数作成
- 必須項目の完全変換実装
- 欠損データの適切な処理実装

## ⚠️ 重要な注意事項

1. **一貫性維持**: 既存の動作を破壊しない
2. **完全性確保**: 中途半端な実装は行わない  
3. **検証徹底**: 各ステップ完了時に必ず動作確認
4. **9テンプレート集中**: アーカイブ済みは対象外

## 📁 重要ファイル一覧

### 計画書
- `/mnt/c/instagram-course/instagram-post-generator/TEMPLATE_DATA_FLOW_REPAIR_PLAN.md`

### 主要対象ファイル
- `/mnt/c/instagram-course/instagram-post-generator/app/services/contentGeneratorService.ts`
- `/mnt/c/instagram-course/instagram-post-generator/app/services/pureStructureMatchingService.ts`

### アクティブテンプレートファイル
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/EnumerationTemplate.tsx`
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/ListTemplate.tsx`
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/ExplanationTwoTemplate.tsx`
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/SimpleThreeTemplate.tsx`
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/TableTemplate.tsx`
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/SimpleFiveTemplate.tsx`
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/SimpleSixTemplate.tsx`
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/SectionItemsTemplate.tsx`
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/TwoColumnSectionItemsTemplate.tsx`

### 設定ファイル
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/TemplateTypes.ts` (更新済み)
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/TemplateRegistry.ts` (更新済み)
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/index.ts` (更新済み)

### アーカイブディレクトリ
- `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/archive/`

## 🎯 成功基準
1. **データ欠損ゼロ**: 全ページで必須項目が完全に表示される
2. **テンプレート適合100%**: 選択されたテンプレートが完全に表示可能
3. **データ一貫性**: `templateData` と `content` の重複が完全に排除される

## 🚀 次のアクション
**ステップ1: データフロー完全調査** を開始してください。

**指示**: 計画書の「ステップ1」セクションに従って、データフロー調査を実行し、問題発生箇所を特定してください。

---
**このHANDOVERを読んで、ステップ1から作業を継続してください。**