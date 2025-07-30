# 企業データ統合・ナレッジ化ワークフロー

## 概要
新しい企業ランキングデータが到着した際の、ナレッジ化→データベース拡張→登録までの標準化されたフローです。

---

## 📋 フェーズ1: データ分析・分類

### 1-1. データ受領・初期分析
- [ ] **新データの受領確認**
  - データ提供元の確認
  - データ形式の確認（JSON、テキスト、表形式等）
  - データ信頼性の評価

- [ ] **ランキング分類の決定**
  ```
  既存カテゴリ:
  ✓ 高収入企業 (K200)
  ✓ ホワイト企業 (K201) 
  ✓ 総合優良企業 (K202)
  ✓ 福利厚生充実企業 (K203)
  
  新カテゴリ例:
  - 成長企業ランキング
  - 女性活躍企業ランキング
  - ESG経営企業ランキング
  - リモートワーク充実企業ランキング
  - 研修制度充実企業ランキング
  - 初任給高額企業ランキング
  ```

- [ ] **データ項目のマッピング**
  - 既存データベース項目との対応関係確認
  - 新規項目の必要性評価
  - データ正規化の要否判定

### 1-2. ナレッジファイル構成検討
- [ ] **テンプレート選択**
  ```
  - unified-template-03-ranking-display: ランキング形式（推奨）
  - unified-template-04-item-grid: 企業詳細重視
  - unified-template-06-company-detail: 企業単体詳細
  ```

- [ ] **ページ構成設計**
  ```
  推奨5ページ構成:
  Page1: introduction - ランキング概要
  Page2: mainContent - トップ3企業
  Page3: mainContent - 4-7位企業
  Page4: mainContent - 注目企業・特徴的企業
  Page5: summary - 企業選び戦略
  ```

---

## 📝 フェーズ2: ナレッジファイル作成

### 2-1. K番号の決定
```bash
# 最新のK番号を確認
ls app/data/knowledgeBase/knowledge/type003/ | grep "K2" | sort -V | tail -1

# 次の連番を使用（例：K204, K205...）
```

### 2-2. ナレッジファイル作成テンプレート
```json
{
  "source": "企業データベース-[カテゴリ名]",
  "problemCategory": "就職・転職",
  "problemDescription": "[具体的な悩み・ニーズ]",
  "postType": "003",
  "postTypeReason": "[ランキング形式で紹介する理由]",
  "solutionContent": {
    "概要": "2024-2025年最新データによる[カテゴリ]ランキング15社の詳細情報",
    "具体的情報": [
      "[1位企業]（[スコア]）- [特徴]",
      "[2位企業]（[スコア]）- [特徴]",
      // ... 10-15社分
    ],
    "提供情報": [
      "[提供する情報の種類1]",
      "[提供する情報の種類2]",
      "[提供する情報の種類3]",
      "[提供する情報の種類4]"
    ],
    "実用的なアドバイス": [
      "[具体的なアドバイス1]",
      "[具体的なアドバイス2]",
      "[具体的なアドバイス3]",
      "[具体的なアドバイス4]"
    ]
  },
  "effectiveExpressions": [
    "[キャッチーなフレーズ1]",
    "[キャッチーなフレーズ2]",
    // ... 6個
  ],
  "searchKeywords": [
    "[メインキーワード]",
    "[関連キーワード1]",
    // ... 10個
  ],
  "emotionalTriggers": [
    "[感情的トリガー1]",
    "[感情的トリガー2]",
    // ... 5個
  ],
  "marketingStage": "就職・転職検討段階",
  "knowledgeId": "K[番号]",
  "primaryId": "type003",
  "secondaryId": "003",
  "actualTitle": "[魅力的なタイトル]",
  "pageCount": 5,
  "pageStructurePattern": "unified-template-03-ranking-display",
  "detailedContent": {
    // ページ構成（後述）
  },
  "mainTheme": "[メインテーマ]",
  "subTheme": "[サブテーマ]",
  "emotionalTone": "[感情トーン]",
  "actionGoal": "[行動目標]",
  "socialSharePotential": "高（[理由]）",
  "viewerBenefit": "[読者メリット]",
  "targetAudience": "[ターゲット層]",
  "engagementMetrics": {
    "expectedLikes": [予想いいね数],
    "expectedShares": [予想シェア数],
    "expectedSaves": [予想保存数]
  },
  "platformTags": [
    "#[メインタグ]",
    "#[関連タグ1]",
    // ... 10個
  ]
}
```

### 2-3. detailedContent構成テンプレート
```json
"detailedContent": {
  "page1": {
    "section": "introduction",
    "title": "[ランキングタイトル]",
    "content": "[ランキングの概要説明]"
  },
  "page2": {
    "section": "mainContent",
    "title": "[トップ3のカテゴリ名]",
    "items": [
      {
        "rank": 1,
        "name": "[企業名]",
        "score": "[スコア・指標]",
        "description": "[詳細説明]"
      },
      // ... 3社分
    ]
  },
  "page3": {
    "section": "mainContent", 
    "title": "[4-7位のカテゴリ名]",
    "items": [
      // ... 4社分
    ]
  },
  "page4": {
    "section": "mainContent",
    "title": "[注目企業のカテゴリ名]",
    "items": [
      // ... 3社分
    ]
  },
  "page5": {
    "section": "summary",
    "title": "[企業選び戦略タイトル]",
    "content": "[まとめと戦略アドバイス]"
  }
}
```

---

## 🗃️ フェーズ3: データベース拡張

### 3-1. 既存企業データの項目拡張
```javascript
// companyMasterData_extended.json の企業オブジェクトに追加
"newCategory": {
  "criteriaValue": null,          // 新指標の値
  "categorySpecificData": null,   // カテゴリ固有データ
  "ranking": null,                // このカテゴリでのランキング
  "grade": null,                  // S/A/B等のグレード
  "features": null                // 特徴・強み
}
```

### 3-2. 新企業データの追加
```javascript
{
  "id": "C[連番]",
  "companyName": "[企業名]",
  "industry": "[業界]",
  "metrics": {
    "salary": [年収],
    "holidays": [年間休日],
    "overtime": [月間残業時間],
    // ... 既存項目
    "newMetric": [新指標値]  // 新指標があれば追加
  },
  "newCategory": {
    // 新カテゴリのデータ
  },
  // ... 既存項目は継承
}
```

### 3-3. カテゴリ・ランキング定義の追加
```javascript
"rankings": {
  // ... 既存ランキング
  "newCategoryRanking": {
    "criteria": ["newMetric", "secondaryMetric"],
    "order": ["desc", "asc"],
    "top15": ["企業ID配列"]
  }
},
"categories": {
  // ... 既存カテゴリ
  "newCategoryGrade": {
    "S級": ["企業ID配列"],
    "A級": ["企業ID配列"],
    "B級": ["企業ID配列"]
  }
}
```

---

## 🔧 フェーズ4: ランキングジェネレーター拡張

### 4-1. 新ランキング生成メソッドの追加
```javascript
/**
 * [新カテゴリ]ランキング生成
 * @param {number} limit - 上位何社まで取得するか
 * @param {string} criteria - ソート基準
 */
generateNewCategoryRanking(limit = 15, criteria = 'defaultCriteria') {
  return this.companies
    .filter(c => c.newCategory && c.newCategory.criteriaValue)
    .sort((a, b) => {
      // ソート条件を定義
      if (criteria === 'criteriaValue') {
        return b.newCategory.criteriaValue - a.newCategory.criteriaValue;
      }
      // ... 他の条件
      return this.getOverallScore(b) - this.getOverallScore(a);
    })
    .slice(0, limit)
    .map((company, index) => ({
      rank: index + 1,
      name: company.companyName,
      industry: company.industry,
      criteriaValue: company.newCategory.criteriaValue,
      grade: company.newCategory.grade,
      description: this.generateNewCategoryDescription(company)
    }));
}

generateNewCategoryDescription(company) {
  const features = [];
  if (company.newCategory.criteriaValue) {
    features.push(`[指標名]${company.newCategory.criteriaValue}[単位]`);
  }
  if (company.newCategory.features) {
    features.push(company.newCategory.features);
  }
  return `${company.industry}。${features.join('、')}。`;
}
```

### 4-2. 使用例ファイルの作成
```javascript
// newcategory-ranking-examples.js
const generator = new ExtendedCompanyRankingGenerator(companyData);

// 新カテゴリランキング
const newRanking = generator.generateNewCategoryRanking(15);

// カテゴリ別企業検索
const sGradeCompanies = generator.getCompaniesByGrade('newCategory', 'S');

// 複合条件での検索例
const complexSearch = generator.generateCustomRanking({
  newCategoryRange: [minValue, maxValue],
  salaryRange: [10000000, 50000000],
  sortBy: 'newCategory',
  limit: 10
});
```

---

## 📋 フェーズ5: システム登録

### 5-1. type-target-persona-relations.json への登録
```json
// personaToKnowledge セクション
"P[番号]": ["K[番号]"],

// targetToPersonas セクション  
"T013": ["P018", "P024", "P026", "P031", "P036", "P200", "P201", "P202", "P203", "P[新番号]"],
```

### 5-2. 動作確認テスト
```bash
# ランキングジェネレーターのテスト
node newcategory-ranking-examples.js

# ナレッジファイルの構文チェック
cat K[番号].json | jq '.'

# システム全体での動作確認
# (KnowledgeBaseSelectorでの選択可能性確認)
```

---

## 🔄 フェーズ6: 品質保証・リリース

### 6-1. 品質チェックリスト
- [ ] **データ正確性**
  - [ ] 企業名・年収・各種数値の正確性確認
  - [ ] ランキング順位の正確性確認
  - [ ] 重複データの除去確認

- [ ] **ナレッジファイル品質**
  - [ ] K132フォーマット準拠確認
  - [ ] セクション名「mainContent」使用確認
  - [ ] 絵文字・不要フィールド除去確認
  - [ ] ですます調統一確認

- [ ] **システム統合性**
  - [ ] type-target-persona-relations.json登録確認
  - [ ] ランキングジェネレーター動作確認
  - [ ] 既存システムとの競合なし確認

### 6-2. ドキュメント更新
- [ ] **README.md更新**
  - 新カテゴリの使用方法追加
  - サンプルコード更新

- [ ] **usage-examples.js更新**
  - 新ランキングの使用例追加

---

## 📁 ファイル作成テンプレート

### 新カテゴリ対応時に作成するファイル
```
app/data/knowledgeBase/knowledge/type003/K[番号].json
app/data/companyDatabase/companyMasterData_extended_v[版番号].json
app/data/companyDatabase/rankingGenerator_extended_v[版番号].js
app/data/companyDatabase/[newcategory]-ranking-examples.js
app/data/companyDatabase/[newcategory]-integration-log.md
```

---

## ⚠️ 注意事項・ベストプラクティス

### 情報品質の確保
1. **データソースの信頼性確認**: 有価証券報告書、企業公式発表等の一次資料を優先
2. **更新頻度の統一**: 年1回（年度末）を基本とし、大幅変更時は随時更新
3. **データ整合性**: 既存データとの矛盾がないか必ず確認

### システム安定性の維持
1. **バックアップ**: 変更前は必ずバックアップを取得
2. **段階的展開**: テスト環境での動作確認後に本番環境へ
3. **ロールバック計画**: 問題発生時の元データ復旧手順を明確化

### 拡張性の確保
1. **スキーマ設計**: 将来の項目追加を考慮したデータ構造
2. **命名規則統一**: 一貫性のあるフィールド名・関数名を使用
3. **モジュール化**: 機能ごとに分離し、再利用可能な設計を心がける

---

## 📞 トラブルシューティング

### よくある問題と解決方法

**Q: ナレッジファイルが表示されない**
A: type-target-persona-relations.jsonの登録確認、JSON構文エラーチェック

**Q: ランキングが正しく生成されない**  
A: データベースの企業IDとカテゴリ定義の整合性確認

**Q: 既存ランキングと順位が異なる**
A: ソート条件とデータ更新日の確認、正規化処理の見直し

---

このワークフローに従うことで、新しい企業ランキングデータを効率的かつ確実にシステムに統合できます。