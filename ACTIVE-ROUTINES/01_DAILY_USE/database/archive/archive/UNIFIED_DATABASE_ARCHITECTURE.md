# 統合型横断データベースアーキテクチャ設計書

作成日: 2025-08-30
目的: ツール・資格・ガジェット・ルーティンを横断した柔軟なランキング生成

## 🎯 核心課題と解決策

### 課題
異なるカテゴリ（ツール、資格、ガジェット等）を横断してランキングを作成する必要がある

### 解決策
**統一スキーマ**で全アイテムを管理し、**type属性**で分類する

## 📊 統合データベース構造

### マスタースキーマ（全アイテム共通）
```json
{
  "id": "UNIFIED_001",
  "type": "tool|certificate|gadget|routine|app",
  "name": "アイテム名",
  "category": "大カテゴリ",
  "subCategory": "小カテゴリ",
  
  // 共通評価軸（全アイテムで使用）
  "universal_scores": {
    "immediate_effect": 95,      // 即効性
    "low_barrier": 90,           // 導入の簡単さ
    "trend_factor": 85,          // トレンド度
    "cost_effectiveness": 100,   // コスパ
    "time_to_value": 95          // 価値実現までの時間
  },
  
  // TEN専用スコア
  "ten_scores": {
    "lazy_friendly": 95,         // めんどくさがり度
    "five_minute_setup": 90,     // 5分セットアップ
    "everyone_using": 85,        // みんな使ってる度
    "no_learning_curve": 88,     // 学習不要度
    "instant_gratification": 92  // 即座に満足度
  },
  
  // 共通メタ情報
  "meta": {
    "acquisition_time": "5分〜3ヶ月",  // 取得/導入時間
    "cost": 0,                         // 費用
    "monthly_cost": 0,                 // 月額費用
    "popularity_rank": 1,              // 人気順位
    "release_year": 2024,              // リリース/開始年
    "japanese_support": true,          // 日本語対応
    "mobile_support": true             // モバイル対応
  },
  
  // タイプ別詳細（typeに応じて変わる）
  "type_specific": {
    // tool の場合
    "features": [],
    "integrations": [],
    
    // certificate の場合
    "pass_rate": 0,
    "study_period": "",
    
    // gadget の場合
    "specs": {},
    "warranty": "",
    
    // routine の場合
    "duration": "",
    "frequency": ""
  },
  
  // 横断ランキング用タグ
  "tags": [
    "AI搭載",
    "無料",
    "1日で習得",
    "学生向け",
    "リモートワーク",
    "自動化",
    "生産性向上",
    "スキルアップ"
  ],
  
  // 使用シーン（横断検索用）
  "use_cases": [
    "朝のルーティン",
    "通勤時間",
    "仕事効率化",
    "副業",
    "就活",
    "転職",
    "独立準備"
  ]
}
```

## 🔄 横断ランキング例

### 1. 「5分で始められる生産性向上TOP10」
```javascript
// ツール、アプリ、ルーティン全て横断
filter: {
  meta.acquisition_time: "5分以内",
  tags: ["生産性向上"]
}
sort: universal_scores.immediate_effect
```
結果例:
1. ChatGPT (tool) - アカウント作成即利用可能
2. Google音声入力 (tool) - 設定不要で即使用
3. ポモドーロタイマー (app) - アプリDLですぐ開始
4. Googleカレンダー (tool) - Gmailあれば即利用
5. 2分間の深呼吸法 (routine) - 今すぐ実践可能
6. Trello (tool) - 無料登録で即カンバン作成
7. DeepL翻訳 (tool) - ブラウザで即利用
8. タイピング練習 (routine) - 寿司打で即開始
9. Slack (tool) - 個人ワークスペース即作成
10. デスクトップ整理 (routine) - 5分で完了

### 2. 「無料で今すぐ価値を得られるTOP10」
```javascript
filter: {
  meta.cost: 0,
  universal_scores.time_to_value: >= 90
}
sort: universal_scores.immediate_effect
```
結果例:
1. ChatGPT (tool) - GPT-3.5無料で即価値
2. Canva (tool) - 無料版でプロ級デザイン
3. Notion (tool) - 個人利用完全無料
4. Googleドキュメント (tool) - 共同編集即可能
5. ラッコキーワード (tool) - SEOリサーチ無料
6. 朝5分ストレッチ (routine) - 体調改善即効
7. タスクの書き出し習慣 (routine) - 頭の整理
8. Trello (tool) - タスク可視化
9. DeepL (tool) - 高精度翻訳無料
10. TimeTree (app) - 予定共有無料

### 3. 「学生が今すぐ始めるべきTOP10」
```javascript
filter: {
  tags: ["学生向け"],
  meta.cost: <= 10000
}
sort: ten_scores.everyone_using
```
結果例:
1. ITパスポート (certificate)
2. Notion (tool)
3. ChatGPT (tool)
4. 簿記3級 (certificate)
5. ポモドーロ学習法 (routine)

### 4. 「AI活用で差をつけるTOP10」
```javascript
filter: {
  tags: ["AI搭載"]
}
sort: universal_scores.trend_factor
```
結果例:
1. ChatGPT (tool)
2. Claude (tool)
3. Midjourney (tool)
4. Notion AI (tool)
5. Canva Magic (tool)

## 🏗️ データベース物理構造

```
/ten-productivity-database/
├── unified-database/
│   ├── masterData.json          # 全データ統合
│   ├── tools.json               # ツールのみ
│   ├── certificates.json        # 資格のみ
│   ├── gadgets.json            # ガジェットのみ
│   ├── routines.json           # ルーティンのみ
│   └── apps.json               # アプリのみ
├── rankings/
│   ├── cross-category/         # 横断ランキング
│   ├── tool-specific/          # ツール特化
│   ├── certificate-specific/   # 資格特化
│   └── generated/              # 自動生成済み
└── generator/
    ├── unifiedRankingGenerator.js
    └── crossCategoryFilters.js
```

## 🔍 フィルター設計

### 横断フィルター（全type共通）
```javascript
const CROSS_FILTERS = {
  // 費用フィルター
  free: item => item.meta.cost === 0,
  under_1000: item => item.meta.cost <= 1000,
  under_10000: item => item.meta.cost <= 10000,
  
  // 時間フィルター
  instant: item => item.meta.acquisition_time.includes("5分"),
  one_day: item => item.meta.acquisition_time.includes("1日"),
  one_week: item => item.meta.acquisition_time.includes("1週間"),
  
  // 対象者フィルター
  student: item => item.tags.includes("学生向け"),
  working: item => item.tags.includes("社会人向け"),
  freelance: item => item.tags.includes("フリーランス向け"),
  
  // 特性フィルター
  ai_powered: item => item.tags.includes("AI搭載"),
  japanese: item => item.meta.japanese_support === true,
  mobile: item => item.meta.mobile_support === true,
  
  // TEN特化フィルター
  lazy_perfect: item => item.ten_scores.lazy_friendly >= 90,
  trending_now: item => item.universal_scores.trend_factor >= 85,
  everyone_has: item => item.ten_scores.everyone_using >= 80
}
```

### ソート基準（優先順位付き）
```javascript
const SORT_CRITERIA = {
  // 第1ソート
  primary: 'universal_scores.immediate_effect',
  // 第2ソート（同点の場合）
  secondary: 'ten_scores.lazy_friendly',
  // 第3ソート
  tertiary: 'meta.popularity_rank'
}
```

## 🎯 想定される横断ランキング

### 時間軸ランキング
1. 5分で始められるTOP10
2. 1日で身につくTOP10
3. 1週間で変わるTOP10
4. 1ヶ月で差がつくTOP10

### 費用軸ランキング
5. 完全無料TOP10
6. 月1000円以下TOP10
7. 初期投資1万円以下TOP10

### シチュエーション軸
8. 朝のルーティンTOP10（ツール+ルーティン混合）
9. 通勤時間活用TOP10（アプリ+資格学習混合）
10. 在宅ワーク効率化TOP10（ツール+ガジェット混合）

### ターゲット軸
11. 大学生の必須TOP10（資格+ツール混合）
12. 転職準備TOP10（資格+スキル混合）
13. 副業開始TOP10（ツール+資格混合）

### トレンド軸
14. 2025年注目TOP10（全カテゴリ混合）
15. AI活用TOP10（AI搭載ツール横断）
16. みんな使ってるTOP10（人気度横断）

## 📈 実装優先度

### Phase 1: 基盤構築
1. 統一スキーマ定義
2. 既存データの移行
3. 基本フィルター実装

### Phase 2: 横断機能
4. 横断ランキングジェネレーター
5. マルチソート機能
6. タグベース検索

### Phase 3: 高度化
7. 重み付けスコアリング
8. 関連アイテム推薦
9. トレンド自動更新

## 🚀 期待効果

1. **柔軟性**: どんな切り口のランキングも生成可能
2. **発見性**: ユーザーが思いつかない組み合わせを提示
3. **網羅性**: 全カテゴリから最適解を選出
4. **拡張性**: 新カテゴリ追加が容易

これにより、「生産性向上」という大テーマの下で、ツール・資格・ガジェット・ルーティンを自由に組み合わせた価値あるランキングを無限に生成できる。