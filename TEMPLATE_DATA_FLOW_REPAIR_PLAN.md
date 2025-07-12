# テンプレートデータフロー修復計画書（完全指示書）

## 🚨 致命的問題の現状認識

### 根本問題
1. **データ構造重複**: `templateData` と `content` の2つが並存し、どちらが使用されるか不明
2. **必須項目大量欠損**: 各テンプレートの必須項目が空文字や空配列
3. **データマッピング失敗**: AI生成データが適切にテンプレート形式に変換されていない
4. **テンプレート選択ミス**: 必須項目が揃わないテンプレートが選択される

### 対象ファイル群
- `app/services/contentGeneratorService.ts` - AI生成とパース処理
- `app/services/pureStructureMatchingService.ts` - テンプレート選択ロジック
- `app/components/templates/*Template.tsx` - 全14テンプレート
- `app/components/templates/TemplateTypes.ts` - 型定義

## 📋 段階別実装計画

---

## ステップ1: データフロー完全調査 ✅ 開始
**目的**: 現在のデータ変換処理の全経路を特定し、問題発生箇所を明確化

### 1.1 contentGeneratorService.ts の調査
**実行内容**:
- AI生成からパース完了までの処理フロー確認
- `templateData` と `content` の生成タイミング特定
- データ変換ロジックの場所特定

**確認ポイント**:
- どこで `templateData` が作られるか？
- どこで `content` が作られるか？
- 変換処理は何回実行されるか？

### 1.2 pureStructureMatchingService.ts の調査
**実行内容**:
- `matchTemplateToContent` メソッドの詳細分析
- テンプレート選択後のデータマッピング処理確認
- `updatedTemplateData` の生成ロジック確認

**確認ポイント**:
- テンプレート選択基準は正しいか？
- データマッピングは全テンプレートで実装されているか？
- 欠損データの処理は適切か？

### 1.3 テンプレートでの実際のデータ使用確認
**実行内容**:
- 各テンプレートが `data.xxx` でアクセスしているフィールド確認
- `templateData` と `content` のどちらを参照しているか確認

---

## ステップ2: 統一データ構造設計
**目的**: `templateData` と `content` の重複を排除し、単一データソースに統一

### 2.1 新データ構造定義
```typescript
interface UnifiedPageData {
  pageNumber: number
  templateType: TemplateType
  data: TemplateData  // 統一されたデータ（旧templateDataとcontentを統合）
}
```

### 2.2 データ統合ルール
1. **基本項目**: `title`, `subtitle`, `badgeText`, `pageNumber` は直接コピー
2. **content vs description**: `description` → `content` に統一
3. **配列データ**: 空配列は削除、実データのみ保持
4. **オブジェクトデータ**: 空オブジェクトは削除、実データのみ保持

---

## ステップ3: テンプレート別完全マッピング実装
**目的**: AI生成データを各テンプレートの必須項目に完全に変換

### 3.1 テンプレート要件定義表
| テンプレート | 必須項目 | 任意項目 | 変換ルール |
|------------|---------|---------|-----------|
| explanation | title, content | subtitle | description→content |
| story | title, content | subtitle, checklist/items | description→content |
| simple | title, content, items | subtitle | description→content |
| enumeration | title, items | subtitle | - |
| explanation2 | title, points/sections | content, subtitle | sections→points変換 |
| simple2 | title, boxes | content, subtitle | sections→boxes変換 |
| simple3 | title, twoColumn | content, subtitle | items→twoColumn変換 |
| simple4 | title, checklist | subtitle, points | checklistItems→checklist+points |
| simple5 | title, steps/checklist | subtitle, points | - |
| simple6 | title, content, items | subtitle | description→content |
| list | title, items | subtitle | - |
| table | title, tableData | description | - |
| section-items | title, sections | content, subtitle | sections[0].itemsチェック |
| two-column-section-items | title, sections | content, subtitle | sections=2個チェック |

### 3.2 マッピング関数作成
各テンプレート用の専用マッピング関数を作成:
```typescript
const TEMPLATE_MAPPERS = {
  simple2: mapToSimple2,
  simple3: mapToSimple3,
  simple4: mapToSimple4,
  // ... 全テンプレート分
}
```

---

## ステップ4: テンプレート選択ロジック改善
**目的**: 必須項目が完全に揃うテンプレートのみを選択

### 4.1 評価システム変更
```typescript
// 旧: 構造ベース判定（不完全）
// 新: 必須項目充足度ベース判定

function calculateTemplateScore(data, templateType) {
  const requirements = TEMPLATE_REQUIREMENTS[templateType]
  let score = 0
  
  // 必須項目チェック（各100点）
  requirements.required.forEach(field => {
    if (hasCompleteData(data, field)) score += 100
  })
  
  // 任意項目チェック（各50点）
  requirements.optional.forEach(field => {
    if (hasCompleteData(data, field)) score += 50
  })
  
  return score
}
```

### 4.2 最低スコア基準設定
- 必須項目が1つでも欠損している場合は選択対象外
- 必須項目が全て揃っている場合のみ選択候補とする

---

## ステップ5: 検証システム実装
**目的**: データ完全性とテンプレート表示可能性を保証

### 5.1 データ検証関数
```typescript
function validateTemplateData(data, templateType) {
  const requirements = TEMPLATE_REQUIREMENTS[templateType]
  const missingFields = []
  
  requirements.required.forEach(field => {
    if (!hasCompleteData(data, field)) {
      missingFields.push(field)
    }
  })
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
    score: calculateTemplateScore(data, templateType)
  }
}
```

### 5.2 表示前チェック
テンプレート表示前に必ず検証を実行し、問題があればフォールバック処理

---

## 📋 実装チェックリスト

### ステップ1完了条件
- [ ] contentGeneratorService.ts のデータフロー完全把握
- [ ] pureStructureMatchingService.ts のマッピング処理把握
- [ ] テンプレートでの実際のデータ参照方法把握
- [ ] 問題発生箇所の特定完了

### ステップ2完了条件
- [ ] 統一データ構造の実装
- [ ] `templateData` と `content` の統合処理実装
- [ ] 重複データの完全排除

### ステップ3完了条件
- [ ] 全14テンプレート用マッピング関数作成
- [ ] 必須項目の完全変換実装
- [ ] 欠損データの適切な処理実装

### ステップ4完了条件
- [ ] 新しいテンプレート選択ロジック実装
- [ ] 必須項目充足度評価システム実装
- [ ] 最低スコア基準の適用

### ステップ5完了条件
- [ ] データ検証システム実装
- [ ] 表示前チェック機能実装
- [ ] フォールバック処理実装

## 🎯 成功基準

### 最終目標
1. **データ欠損ゼロ**: 全ページで必須項目が完全に表示される
2. **テンプレート適合100%**: 選択されたテンプレートが完全に表示可能
3. **データ一貫性**: `templateData` と `content` の重複が完全に排除される

### 検証方法
1. 全14テンプレートでのサンプル生成
2. 各ページでの必須項目完全表示確認
3. コンソールログでの欠損項目ゼロ確認

---

## ⚠️ 重要な注意事項

1. **一貫性維持**: どの段階でも既存の動作を破壊しない
2. **完全性確保**: 中途半端な実装は行わない
3. **検証徹底**: 各ステップ完了時に必ず動作確認
4. **ロールバック準備**: 問題発生時の復旧手順を用意

---

**この計画書に基づいて、確実に実装を進めます。**
**ステップ1から開始し、各段階で完全性を確認しながら進行します。**