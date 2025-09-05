# TYPE003 KIKUYO実行（修正版）

**対象**: KIKUYOキャラクター・女性就活転職者向けコンテンツ  
**目的**: 企業ランキング情報型フィード投稿の自動生成  
**基準**: K805準拠・unified-template-11-company-ranking

---

## 🚀 基本実行コマンド

```
【企業ランキングナレッジ生成開始】

ランキングテーマ: [例：女性が働きやすいIT企業TOP10、初任給が高い企業TOP5...]
ターゲット: T013（就活生）またはT014（転職希望者）

以下のマスタープロンプトに基づいて、KIKUYOランキングコンテンツを作成してください
```

---

## 📋 必須参照ファイル（3個）

### 1. **企業データベース**
```
app/data/companyDatabase/companyMasterData.json
```

### 2. **フォーマット仕様**
```
docs/unified-template-11-company-ranking-master-format.md
```

### 3. **マスタープロンプト**
```
INTEGRATED-SYSTEM/RESOURCES/creation-manuals/企業ランキングナレッジ生成プロンプト.md
```

---

## 🛠️ 生成プロセス（7ステップ）

### **STEP1: マスタープロンプト確認**
**重要**: 必ず以下のマスタープロンプトを熟読してから作成
```
INTEGRATED-SYSTEM/RESOURCES/creation-manuals/企業ランキングナレッジ生成プロンプト.md
```
- [ ] フォーマット仕様書の完全な構造・制限事項を確認
- [ ] unified-template-11-company-ranking形式でページ構成
- [ ] **keyHighlights配列は必ず7文字以内に制限**

### **STEP2: ランキングテーマ決定**
- [ ] 女性就活転職者向けのテーマを選定
- [ ] ターゲット：T013（就活生）またはT014（転職希望者）を選択
- [ ] TOP5/TOP10の企業数を決定

### **STEP3: 企業データベースから抽出**
- [ ] 企業DB（152社・23業界）から該当企業を抽出・選定・順位付け
- [ ] 数値データの正確性確認
- [ ] ランキング根拠の明確化

### **STEP4: 8ページ構成作成**
- [ ] **Page 1**: basic_intro（導入・共感・問題提起）
- [ ] **Page 2**: ranking_display（TOP10ランキング表）
- [ ] **Page 3-7**: enhanced_company_detail（企業詳細・2社ずつDual表示）
- [ ] **Page 8**: resource_summary（まとめ・参考リソース）

### **STEP5: 重要制限事項遵守**
- [ ] **keyHighlights**: 各項目7文字以内（最重要）
- [ ] **companyName**: 30文字以内
- [ ] **overview**: 400文字以内
- [ ] **highlightMessage**: 80文字以内
- [ ] **pageStructurePattern**: "unified-template-11-company-ranking"

### **STEP6: KIKUYOキャラクター調整**
- [ ] 「なのです」口調で統一
- [ ] 女性就活転職者特化表現
- [ ] ワークライフバランス・キャリア成長の観点
- [ ] 2025年度最新データで客観的ランキングなのです！企業選びをサポートするのです

### **STEP7: JSON完全出力**
- [ ] 完全なType003 JSON構造で出力
- [ ] pageStructurePattern: "unified-template-11-company-ranking"
- [ ] データベース100%準拠の正確性

---

## ⚡ KIKUYO品質保証システム

### **フォーマット準拠チェック**
- [ ] K805と同等の詳細なJSON構造
- [ ] keyHighlights項目が7文字以内
- [ ] 8ページ構成（basic_intro→ranking_display→enhanced_company_detail×5→resource_summary）
- [ ] unified-template-11-company-ranking完全準拠

### **データ品質チェック**
- [ ] 企業データベースから正確な数値使用
- [ ] ランキング根拠が論理的で明確
- [ ] 女性就活転職者への実用性確認
- [ ] 2025年度最新データ使用

### **KIKUYOキャラクター品質チェック**
- [ ] 「なのです」口調で一貫
- [ ] 女性視点でのメリット・デメリット表記
- [ ] ワークライフバランス重視の観点
- [ ] 優しく寄り添う表現

---

## 📄 出力形式仕様

### **ファイル形式**
```json
{
  "source": "contents-ranking-XXX",
  "problemCategory": "就活・転職支援",
  "knowledgeId": "KXXX",
  "postType": "003",
  "pageCount": 8,
  "pageStructurePattern": "unified-template-11-company-ranking",
  "targetIds": ["T013"],
  "detailedContent": {
    "page1": { ... },
    "page2": { ... },
    ...
    "page8": { ... }
  }
}
```

### **保存先**
```
INTEGRATED-SYSTEM/OUTPUT/feed-posts/KIKUYO/kikuyo_ranking_XXX.json
```

---

## 🎯 成功例（K805参照）

### **良い例**
- K805: 女性が活躍してるIT企業年収ランキング
- 8ページ構成で詳細な企業情報提供
- keyHighlights各項目7文字以内
- 具体的な数値データ（年収・初任給・有給取得率等）

### **避けるべき例**
- 10ページ構成（間違い）
- keyHighlights項目が長すぎる
- 曖昧な企業情報
- 数値根拠の不明確さ

---

## 📝 実行例

```
【企業ランキングナレッジ生成開始】

ランキングテーマ: 女性が働きやすいIT企業TOP5
ターゲット: T013（就活生）

追加指示:
- 有給取得率、育休復職率、男性育休取得率を基準
- ワークライフバランス重視の観点
- KIKUYOの「なのです」口調で統一
- 8ページ構成のJSON形式で完全出力
```

---

**作成者**: 次世代Claude Code（第3世代）  
**作成日**: 2025-09-04  
**バージョン**: v2.0（マスタープロンプト準拠版）  
**参考**: K805企業ランキング構造・マスタープロンプト完全準拠