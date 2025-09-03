# TEN DATABASE JSON構造定義（完全版）

**作成日**: 2025-08-30  
**目的**: 72ツール統一データベースのJSON構造定義  
**基盤**: KIKUYOシステムのcompanyMasterData.json相当

---

## 📋 統一JSON構造（aiToolsMasterData.json）

### **ファイル概要**
```json
{
  "databaseInfo": {
    "name": "TEN Database - AI Tools Master Data",
    "version": "1.0",
    "totalTools": 72,
    "lastUpdated": "2025-08-30",
    "categories": ["AI会話", "開発支援", "音声生成", "動画生成", "プレゼン", "思考支援", "自動化", "検索"],
    "dataQuality": "5-source-verified",
    "dataCollectionMethod": "batch-research-detailed"
  },
  "tools": [
    {個別ツールデータ},
    {個別ツールデータ},
    ...
  ]
}
```

---

## 🔧 個別ツールデータ構造（30+項目）

```json
{
  "id": "AI001",
  "toolName": "Claude",
  "category": "AI会話・アシスタント",
  "subCategory": "汎用対話AI",
  "companyName": "Anthropic",
  "officialUrl": "https://claude.ai",
  
  "releaseInfo": {
    "initialRelease": "2022-07",
    "latestUpdate": "2025-01-15",
    "version": "Claude 3.5 Sonnet",
    "developmentStatus": "Active"
  },
  
  "userMetrics": {
    "userCount": 10000000,
    "monthlyActiveUsers": 5000000,
    "downloadCount": null,
    "githubStars": null,
    "appStoreRating": 4.5,
    "googlePlayRating": null
  },
  
  "platform": {
    "web": true,
    "ios": true,
    "android": true,
    "windows": false,
    "mac": false,
    "linux": false,
    "apiAccess": true,
    "browserExtension": false
  },
  
  "pricing": {
    "freeTier": "月20メッセージ制限、基本機能利用可",
    "freeCredits": null,
    "starterPrice": 20,
    "starterFeatures": "月間メッセージ無制限、優先アクセス",
    "proPrice": 25,
    "proFeatures": "Claude 3 Opus、高速応答、長文対応",
    "enterprisePrice": "要問合せ",
    "billingCycle": "月額",
    "currency": "USD"
  },
  
  "coreFeatures": {
    "primaryFunction": "汎用AI会話・文章作成・コーディング支援",
    "uniqueFeatures": [
      "長文読解・要約（最大200,000文字）",
      "コードレビュー・生成",
      "多言語翻訳・校正"
    ],
    "inputFormats": ["テキスト", "画像", "ドキュメント"],
    "outputFormats": ["テキスト", "コード", "マークダウン"],
    "integrations": ["API", "Slack", "Web"],
    "apiAvailability": "REST API、Python SDK、JavaScript SDK"
  },
  
  "technicalSpecs": {
    "responseTime": "2-5秒",
    "accuracyRate": "95%（文章生成）",
    "dataPrivacy": "会話データは学習に使用しない、30日後削除",
    "dataRetention": "30日",
    "compliance": ["SOC 2", "GDPR準拠"],
    "offline": false,
    "maxTokens": 200000,
    "supportedLanguages": 95
  },
  
  "localization": {
    "supportedLanguages": ["日本語", "英語", "中国語", "韓国語", "フランス語", "他90言語"],
    "japaneseUI": true,
    "japaneseSupport": "完全対応（ネイティブレベル）",
    "japaneseDocumentation": true,
    "localizedPricing": false
  },
  
  "usability": {
    "learningCurve": "Easy",
    "setupTime": 2,
    "dailyUsageTime": "10-60分",
    "targetUserLevel": "初心者〜上級者",
    "mobileOptimized": true,
    "keyboardShortcuts": true
  },
  
  "performance": {
    "reliability": "99.9%",
    "scalability": "高（クラウドベース）",
    "updateFrequency": "月1-2回",
    "bugReports": null,
    "serverLocation": "米国・欧州",
    "loadTime": "1-2秒"
  },
  
  "community": {
    "communitySize": 1000000,
    "documentationQuality": "Excellent",
    "tutorialAvailability": true,
    "communitySupport": "活発（Discord、Reddit）",
    "officialSupport": "メール・チャット",
    "userGenContent": true
  },
  
  "competitiveAnalysis": {
    "mainCompetitors": ["ChatGPT", "Gemini", "Microsoft Copilot"],
    "keyDifferentiators": [
      "constitutional AI（安全性重視）",
      "長文処理能力",
      "コンテキスト理解精度"
    ],
    "marketPosition": "プレミアム対話AI（安全性・品質重視）",
    "marketShare": "15%（対話AI市場）"
  },
  
  "tenEvaluation": {
    "immediacy": 95,
    "simplicity": 90,
    "popularity": 85,
    "costPerformance": 80,
    "specialization": 90,
    "productivityGain": 95,
    "tenScore": 89.25,
    "grade": "A",
    "evaluationDate": "2025-08-30"
  },
  
  "useCases": [
    "長文要約・分析",
    "プログラムコード生成・レビュー", 
    "多言語翻訳・校正",
    "創作支援・アイデア出し",
    "学習・研究支援"
  ],
  
  "strengths": [
    "高い安全性・倫理性",
    "長文処理能力",
    "コード生成精度",
    "多言語対応品質"
  ],
  
  "weaknesses": [
    "無料版の制限",
    "リアルタイム情報取得不可",
    "画像生成機能なし"
  ],
  
  "additionalNotes": "安全性を重視したconstitutional AIアプローチを採用。企業利用での信頼性が高い。",
  "lastVerified": "2025-08-30",
  "dataCollectionBatch": 1,
  "sources": [
    "https://claude.ai",
    "https://docs.anthropic.com",
    "https://www.anthropic.com/news",
    "https://techcrunch.com/tag/anthropic/",
    "https://twitter.com/AnthropicAI"
  ]
}
```

---

## 📁 カテゴリ分類システム

### **メインカテゴリ（8分類）**
1. **AI会話・アシスタント** - Claude, ChatGPT, Gemini等
2. **開発支援・コーディング** - GitHub Copilot, Claude Code, Cursor等
3. **音声生成・処理** - Fish Audio, ElevenLabs, Otter.ai等
4. **動画生成・編集** - Runway, Synthesia, Pika Labs等
5. **プレゼン・デザイン** - Gamma AI, TOME, Canva AI等
6. **思考支援・可視化** - Mapify, MindMeister AI, Whimsical等
7. **自動化・ワークフロー** - n8n, Zapier AI, Make等
8. **検索・情報収集** - Perplexity, You.com, Kagi等

### **サブカテゴリ例**
- AI会話・アシスタント
  - 汎用対話AI
  - 専門特化AI
  - 企業向けAI
  - API特化AI

---

## 🎯 TEN評価システム統合

### **評価項目詳細**
```json
"tenEvaluation": {
  "immediacy": 95,        // 即効性(20%)
  "simplicity": 90,       // 簡単さ(20%)
  "popularity": 85,       // 人気度(15%)
  "costPerformance": 80,  // コスパ(15%)
  "specialization": 90,   // 機能専門性(20%)
  "productivityGain": 95, // 生産性UP度(10%)
  "tenScore": 89.25,      // 総合スコア
  "grade": "A",           // S(95+)/A(90-94)/B(80-89)/C(70-79)/D(60-69)
  "evaluationDate": "2025-08-30",
  "evaluationMethod": "6-criteria-weighted"
}
```

### **スコア算出式**
```javascript
tenScore = (immediacy * 0.20) + (simplicity * 0.20) + (popularity * 0.15) + 
           (costPerformance * 0.15) + (specialization * 0.20) + (productivityGain * 0.10)
```

---

## 📊 データ品質管理

### **必須フィールド**
- ✅ 全30+項目記入必須
- ✅ null値での不明項目統一
- ✅ 数値は具体的数字（推測値禁止）
- ✅ 5ソース確認記録必須

### **品質チェック項目**
```json
"dataQuality": {
  "verified": true,
  "sourceCount": 5,
  "officialDataRatio": 80,
  "lastFactCheck": "2025-08-30",
  "confidence": "High"
}
```

---

## 🔄 バッチ管理システム

### **バッチ情報記録**
```json
{
  "dataCollectionBatch": 1,
  "batchRange": "1-15",
  "batchTheme": "メジャーAIツール",
  "collectionDate": "2025-08-30",
  "researcher": "ChatGPT/Claude",
  "reviewStatus": "Pending"
}
```

### **統合時の管理**
- バッチ1: AI001-AI015（メジャーAIツール）
- バッチ2: AI016-AI030（開発支援AI）  
- バッチ3: AI031-AI045（コンテンツ生成AI）
- バッチ4: AI046-AI060（専門特化AI）
- バッチ5: AI061-AI072（新興AIツール）

---

## ⚠️ 重要な構造設計原則

### **KIKUYOシステム準拠**
1. **同等の項目数**: 30+項目でKIKUYOの企業データと同等
2. **同等の品質基準**: 5ソース確認、推測禁止
3. **同等の構造化**: ランキング生成に最適化された構造
4. **同等の拡張性**: 新ツール追加に対応

### **TEN特化要素**
1. **生産性評価軸**: TEN 6項目評価の完全統合
2. **実用性重視**: 無料版詳細、日本語対応詳細
3. **効率化指標**: 導入時間、学習コスト、日常使用時間
4. **キャラクター対応**: TEN武士口調投稿に最適化

---

**このJSON構造により、72ツールの完全データベースを構築**  
**KIKUYOシステムと同等品質のTEN DATABASE実現**

---

**作成者**: Claude Code  
**最終更新**: 2025-08-30  
**用途**: aiToolsMasterData.json生成・ランキングシステム基盤