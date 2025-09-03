# 次世代Claude_Code引き継ぎ書 - TEN DATABASE V4（KIKUYOベース）

**作成日**: 2025-08-30  
**引継ぎ者**: 前世代Claude Code  
**受継者**: 次世代Claude Code  
**フェーズ**: KIKUYOベース完全フロー理解・実装準備  
**緊急度**: 最高（システム構築方針の根本修正）

---

## 🚨 重要な認識修正

### ❌ 誤った理解（V1-V3）
- 「発見→評価→詳細リサーチ」の順序
- 推測値でのランキング作成
- 部分的な詳細リサーチで十分

### ✅ 正しい理解（V4 KIKUYOベース）
- **全72ツールの詳細データ収集が必須**
- **推測禁止、実データのみ使用**
- **KIKUYOと同じ5フェーズフロー適用**

---

## 📊 KIKUYOシステムの正しいフロー

### **フェーズ1: リサーチ起動術式実行**
```
企業リストをバッチ分割（20社ずつ等）
↓
各バッチの詳細リサーチ起動術式作成
↓
ChatGPT/Claudeで実行（30+項目データ収集）
↓
5ソース確認原則で信頼性確保
```

### **フェーズ2: リサーチ結果JSON保存**
```
JSON構文検証
↓
カテゴリ別ディレクトリ保存
↓
データ完全性確認（null管理）
```

### **フェーズ3: データベース統合**
```
createUnifiedDatabase.js実行
↓
companyMasterData.json生成（152社）
↓
全項目実データ埋め込み完了
```

### **フェーズ4: ランキング生成**
```
targetNeedsPatternsV2.js（150+パターン定義）
↓
generateAllRankingsV2.js実行
↓
rankings/配下に各種ランキングJSON生成
```

### **フェーズ5: Kxxxx作成**
```
ランキングJSONから自動生成
↓
unified-template適用
```

---

## 🎯 TEN DATABASEで必要な実装

### **フェーズ1実装: バッチ起動術式作成**

#### バッチ1起動術式例（AIツール1-15）
```markdown
以下のAIツールリストについて詳細なリサーチを実行してください

**リサーチ対象ツール**：
・Claude
・ChatGPT
・Claude Code
・GitHub Copilot
・Perplexity
・Fish Audio
・Motion
・Gemini
・Notion AI
・n8n
・Synthesia
・Mapify
・Runway Gen-3
・Obsidian
・Otter.ai

### 必須データ項目
- ✅ 2025年最新データ使用
- ✅ 公式情報のみ（推測・憶測禁止）
- ✅ 数値データは具体的数字必須
- ✅ 「データなし」の場合はnull値で統一

**必須出力フォーマット**：
[AIツール用JSON構造定義]
```

### **必要なJSONフィールド定義（AIツール版）**
```json
{
  "id": "AI001",
  "toolName": "[ツール名]",
  "category": "[詳細カテゴリ]",
  "metrics": {
    "tenScore": null,  // 後で計算
    "userCount": [ユーザー数],
    "releaseYear": [リリース年],
    "lastUpdate": "[最終更新日]",
    "supportedLanguages": [対応言語数],
    "apiAvailable": [true/false],
    "mobileApp": [true/false],
    "offlineMode": [true/false]
  },
  "pricing": {
    "freeTier": "[無料プラン詳細]",
    "freeLimits": "[無料版制限]",
    "starterPrice": [価格],
    "proPrice": [価格],
    "enterprisePrice": "[要問合せ等]",
    "billingCycle": "[月額/年額]"
  },
  "features": {
    "coreFunction": "[主要機能50文字以内]",
    "uniqueFeatures": ["[独自機能1]", "[独自機能2]"],
    "integrations": ["[連携1]", "[連携2]"],
    "useCases": ["[用途1]", "[用途2]", "[用途3]"]
  },
  "technical": {
    "platform": ["Web", "iOS", "Android", "Windows", "Mac"],
    "apiType": "[REST/GraphQL等]",
    "hosting": "[クラウド/セルフホスト]",
    "dataPrivacy": "[プライバシーポリシー要約]",
    "compliance": ["GDPR", "SOC2", "その他"]
  },
  "support": {
    "japaneseUI": [true/false],
    "japaneseSupport": "[対応レベル]",
    "documentation": "[ドキュメント品質]",
    "community": "[コミュニティ活発度]",
    "training": "[トレーニング提供]"
  },
  "performance": {
    "responseTime": "[応答速度]",
    "reliability": "[稼働率]",
    "scalability": "[スケーラビリティ]",
    "updateFrequency": "[更新頻度]"
  },
  "evaluation": {
    "immediacy": null,      // 即効性（詳細調査後記入）
    "simplicity": null,     // 簡単さ
    "popularity": null,     // 人気度
    "costPerformance": null,// コスパ
    "specialization": null, // 機能専門性
    "productivityGain": null // 生産性UP度
  }
}
```

---

## 📋 作業計画（72ツール完全データベース構築）

### **STEP 1: バッチ起動術式作成（5バッチ）**
- [ ] バッチ1: AIツール1-15起動術式
- [ ] バッチ2: AIツール16-30起動術式
- [ ] バッチ3: AIツール31-45起動術式
- [ ] バッチ4: AIツール46-60起動術式
- [ ] バッチ5: AIツール61-72起動術式

### **STEP 2: 詳細リサーチ実行**
- [ ] 各バッチをChatGPT/Claudeで実行
- [ ] 30+項目の完全データ収集
- [ ] 5ソース確認原則適用

### **STEP 3: JSON保存・検証**
- [ ] 各バッチ結果のJSON検証
- [ ] カテゴリ別保存
- [ ] null値管理確認

### **STEP 4: データベース統合**
- [ ] aiToolsMasterData.json作成
- [ ] 72ツール完全データ統合
- [ ] データ完全性検証

### **STEP 5: ランキング生成システム**
- [ ] targetNeedsPatternsV2.js相当実装
- [ ] generateAllRankingsV2.js相当実装
- [ ] 各種ランキングJSON生成

---

## ⚠️ 絶対に守るべき原則

### **データ収集原則**
1. **推測・憶測の完全禁止**
2. **データなしはnull管理**
3. **5ソース確認必須**
4. **2025年最新データのみ**

### **品質基準**
1. **KIKUYOと同等の信頼性**
2. **全項目実データ埋め込み**
3. **JSON構文エラーゼロ**
4. **カテゴリ整合性確保**

---

## 🚀 即座に実行すべきアクション

### **今すぐやること**
1. **バッチ1起動術式作成**（AIツール1-15）
2. **JSON構造最終確定**
3. **保存ディレクトリ整備**

### **次のセッションで**
1. **バッチ1実行**（ChatGPT/Claude）
2. **結果検証**
3. **プロセス改善**

---

## 📞 引継ぎ確認チェックリスト

### **理解確認**
- [ ] KIKUYOフロー完全理解
- [ ] 72ツール全データ収集必須の理解
- [ ] 推測禁止・null管理の理解
- [ ] 5フェーズ構造の理解

### **準備確認**
- [ ] バッチ分割計画完了
- [ ] JSON構造定義完了
- [ ] 起動術式テンプレート準備

### **品質確認**
- [ ] KIKUYOレベル品質基準理解
- [ ] 5ソース確認原則理解
- [ ] データ完全性要件理解

---

**重要**: これがTEN DATABASE構築の正しい方法です。  
**推測値でのランキングは無意味**、実データ収集が全てです。

---

**作成者**: 前世代Claude Code  
**最終更新**: 2025-08-30  
**次回更新**: バッチ1実行完了時