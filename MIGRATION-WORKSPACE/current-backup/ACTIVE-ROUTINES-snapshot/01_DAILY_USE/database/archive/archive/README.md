# TEN DATABASE ディレクトリ構造

**作成日**: 2025-08-30  
**目的**: TEN生産性データベース構築プロジェクトの完全管理

---

## 📁 ディレクトリ構造

```
ten-productivity-database/
├── README.md                           # このファイル
├── TEN_DATABASE_構築起動術式.md           # セッション開始時に実行
├── TEN_DATABASE_構築共有ドキュメント.md     # 状況共有・最優先参照
├── TEN_MASTER_PLAN.md                  # 全体マスタープラン
├── research-results/                   # リサーチ結果保存
│   ├── batch1-ai-tools-1-15.json     # バッチ1結果（予定）
│   ├── batch2-ai-tools-16-30.json    # バッチ2結果（予定）
│   ├── batch3-ai-tools-31-45.json    # バッチ3結果（予定）
│   ├── batch4-ai-tools-46-60.json    # バッチ4結果（予定）
│   └── batch5-ai-tools-61-72.json    # バッチ5結果（予定）
├── database/                          # 統合データベース
│   ├── aiToolsMasterData.json         # 72ツール統合DB（予定）
│   └── metadata.json                  # データベース管理情報（予定）
└── rankings/                          # ランキング生成結果
    ├── all-tools-ranking.json         # 全ツールランキング（予定）
    ├── category-rankings/             # カテゴリ別ランキング（予定）
    └── ten-score-analysis.json        # TENスコア分析（予定）
```

---

## 🚀 フェーズ別作業フロー

### **フェーズ1: リサーチ起動術式実行**
- [ ] バッチ1実行（ChatGPT/Claude）
- [ ] バッチ2実行（ChatGPT/Claude）  
- [ ] バッチ3実行（ChatGPT/Claude）
- [ ] バッチ4実行（ChatGPT/Claude）
- [ ] バッチ5実行（ChatGPT/Claude）

### **フェーズ2: リサーチ結果JSON保存**
- [ ] `research-results/batch1-ai-tools-1-15.json`
- [ ] `research-results/batch2-ai-tools-16-30.json`
- [ ] `research-results/batch3-ai-tools-31-45.json`
- [ ] `research-results/batch4-ai-tools-46-60.json`
- [ ] `research-results/batch5-ai-tools-61-72.json`

### **フェーズ3: データベース統合**
- [ ] `database/aiToolsMasterData.json` - 72ツール統合データベース
- [ ] `database/metadata.json` - 管理情報・統計

### **フェーズ4: ランキング生成**
- [ ] `rankings/all-tools-ranking.json` - 全ツール総合ランキング
- [ ] `rankings/category-rankings/` - カテゴリ別各種ランキング
- [ ] `rankings/ten-score-analysis.json` - 詳細スコア分析

### **フェーズ5: Kxxxx作成**
- [ ] K902-K999の自動生成
- [ ] unified-template適用

---

## 📊 現在の進捗状況

### ✅ 完了項目
- [x] ディレクトリ構造構築
- [x] バッチ1起動術式作成
- [x] JSON構造定義完了
- [x] 基本ファイル整備

### 🔄 進行中
- [ ] バッチ1実行準備

### ⏳ 未着手
- [ ] フェーズ1: バッチリサーチ実行（0/5）
- [ ] フェーズ2: JSON保存作業
- [ ] フェーズ3: データベース統合
- [ ] フェーズ4: ランキング生成システム
- [ ] フェーズ5: K902-K999作成

---

## 🎯 品質基準（KIKUYOレベル）

### **データ品質**
- ✅ 5ソース確認必須
- ✅ 推測・憶測絶対禁止
- ✅ 30+項目完全データ収集
- ✅ 2025年最新データのみ

### **システム品質**
- ✅ KIKUYOと同等の信頼性
- ✅ 自動化ランキング生成対応
- ✅ 拡張可能な構造設計

---

## 🔧 参照ファイル

### **重要参照**
- `../../04_REFERENCE/master-prompts/TEN-DATABASE/BATCH-RESEARCH/01_AIツールバッチ1詳細リサーチ起動術式_1-15.md`
- `../../04_REFERENCE/master-prompts/TEN-DATABASE/TEN_DATABASE_JSON_SCHEMA.md`

### **KIKUYOシステム参考**
- `/app/data/companyDatabase/companyMasterData.json`
- `/app/data/companyDatabase/generateAllRankingsV2.js`
- `/app/data/companyDatabase/targetNeedsPatternsV2.js`

---

**次のアクション**: バッチ1起動術式をChatGPT/Claudeで実行  
**目標**: 72ツール完全データベース構築完了