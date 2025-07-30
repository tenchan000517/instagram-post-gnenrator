# 🚀 企業データ統合クイックチェックリスト

## 新データ到着時の必須作業一覧

### ⚡ 即座に実行（5分以内）
- [ ] **データ受領確認** - 提供元・形式・信頼性をチェック
- [ ] **次のK番号確認** - `ls app/data/knowledgeBase/knowledge/type003/ | grep "K2" | sort -V | tail -1`
- [ ] **カテゴリ分類決定** - 既存4カテゴリ or 新カテゴリ
- [ ] **テンプレート選択** - ランキング形式なら`unified-template-03-ranking-display`

---

### 📝 Phase 1: ナレッジファイル作成（15分）
```bash
# 1. ファイル作成
touch app/data/knowledgeBase/knowledge/type003/K[番号].json

# 2. テンプレートコピー＆編集
# K203.jsonをベースにコピー推奨
```

**必須修正項目**:
- [ ] `knowledgeId`: K[番号]
- [ ] `actualTitle`: 魅力的なタイトル
- [ ] `source`: 企業データベース-[カテゴリ名]
- [ ] `problemDescription`: 具体的な悩み
- [ ] `solutionContent.概要`: カテゴリ説明
- [ ] `solutionContent.具体的情報`: 10-15社のリスト
- [ ] `detailedContent`: 5ページ構成
- [ ] `platformTags`: カテゴリ関連タグ

---

### 🗃️ Phase 2: データベース拡張（10分）

**既存企業への項目追加**:
```json
"newCategoryField": {
  "value": null,
  "grade": null, 
  "ranking": null,
  "features": null
}
```

**新企業データ追加**:
```json
{
  "id": "C[次の番号]",
  "companyName": "[企業名]",
  "industry": "[業界]",
  "metrics": { /* 基本データ */ },
  "newCategoryField": { /* 新カテゴリデータ */ },
  "scores": {
    "salary": "[S/A/B/null]",
    "worklife": "[S/A/B/null]",  
    "overall": "[S/A/B/null]",
    "newCategory": "[S/A/B/null]"
  }
}
```

---

### 🔧 Phase 3: ランキングジェネレーター拡張（10分）

**新メソッド追加テンプレート**:
```javascript
generateNewCategoryRanking(limit = 15) {
  return this.companies
    .filter(c => c.newCategoryField && c.newCategoryField.value)
    .sort((a, b) => b.newCategoryField.value - a.newCategoryField.value)
    .slice(0, limit)
    .map((company, index) => ({
      rank: index + 1,
      name: company.companyName,
      value: company.newCategoryField.value,
      description: `${company.industry}。${company.newCategoryField.features}。`
    }));
}
```

---

### 📋 Phase 4: システム登録（5分）

**type-target-persona-relations.json更新**:
```json
// 1. personaToKnowledge追加
"P[番号]": ["K[番号]"],

// 2. T013に追加  
"T013": ["P018", "P024", "P026", "P031", "P036", "P200", "P201", "P202", "P203", "P[番号]"],
```

---

### ✅ Phase 5: 品質確認（5分）

**必須チェック**:
- [ ] `cat K[番号].json | jq '.'` でJSON構文エラーなし
- [ ] セクション名が`mainContent`（`ranking`ではない）
- [ ] 絵文字・hashTagフィールドなし
- [ ] ですます調統一
- [ ] `node [category]-ranking-examples.js`で動作確認

---

### 🎯 ワンライナーコマンド集

```bash
# 最新K番号確認
ls app/data/knowledgeBase/knowledge/type003/ | grep -E "K[0-9]+" | sort -V | tail -1

# JSON構文チェック
find app/data/knowledgeBase/knowledge/type003/ -name "K*.json" -exec sh -c 'echo "Checking $1..."; cat "$1" | jq "." > /dev/null && echo "✓ Valid" || echo "✗ Invalid"' _ {} \;

# 全ランキング動作テスト
cd app/data/companyDatabase && node welfare-ranking-examples.js

# ナレッジファイル数確認  
ls app/data/knowledgeBase/knowledge/type003/K*.json | wc -l
```

---

### 📊 所要時間目安

| フェーズ | 作業時間 | 累計時間 |
|---------|---------|---------|
| データ分析・K番号確認 | 5分 | 5分 |
| ナレッジファイル作成 | 15分 | 20分 |
| データベース拡張 | 10分 | 30分 |
| ランキングジェネレーター拡張 | 10分 | 40分 |
| システム登録 | 5分 | 45分 |
| 品質確認・テスト | 5分 | **50分** |

**合計: 約50分で新カテゴリの統合完了**

---

### 🚨 緊急時クイックフィックス

**ナレッジファイルが表示されない場合**:
```bash
# 1. JSON構文チェック
cat app/data/knowledgeBase/knowledge/type003/K[番号].json | jq '.'

# 2. 登録確認
grep "K[番号]" app/data/knowledgeBase/type-target-persona-relations.json

# 3. セクション名確認
grep -n "section.*ranking" app/data/knowledgeBase/knowledge/type003/K[番号].json
# → "ranking"が見つかったら"mainContent"に修正
```

**ランキングが生成されない場合**:
```bash
# 1. 企業データ確認
grep -A 5 -B 5 "newCategoryField" app/data/companyDatabase/companyMasterData_extended.json

# 2. フィルター条件確認
node -e "
const data = require('./companyMasterData_extended.json');
console.log('Total companies:', data.companies.length);
console.log('With newCategory:', data.companies.filter(c => c.newCategoryField).length);
"
```

---

### 💡 効率化のコツ

1. **テンプレート活用**: 既存のK203.jsonをベースにコピー＆編集
2. **VSCode拡張**: JSON構文ハイライト・自動フォーマット活用
3. **バッチ処理**: 複数企業の一括データ追加はスクリプト化
4. **命名規則統一**: 新カテゴリ名は既存パターンに準拠
5. **テスト自動化**: ランキング生成テストをスクリプト化

---

このチェックリストに従えば、新しい企業ランキングデータを**約50分**で確実にシステムに統合できます。