# 次世代Claude Code引き継ぎ - Kxxx.json修正作業

## 📋 緊急：前回セッションでの修正ミス

**前回セッション（2025-07-25）で、間違った修正を行いました。**

### **❌ 間違った修正内容**
1. **装飾要素の削除**：`pageIndicator`、`visualElements`、`backgroundDesign`等を削除
2. **重要なコンテンツ構造の削除**：`selectionFlow`、`emphasis`、`source`等を削除
3. **既存の詳細構造の簡略化**：複雑な`content`構造を単純な配列に変更

### **✅ 正しい修正方針**
**K113.jsonとK002.jsonの実装済みパターンに完全準拠**

```json
// ❌ 間違った修正例
"page2": {
  "section": "intro",
  "template": "basic_intro", 
  "content": ["要点1", "要点2", "要点3"]  // ← 既存構造を破壊
}

// ✅ 正しい修正例（K113パターン）
"page2": {
  "section": "intro",           // ← 追加
  "template": "basic_intro",    // ← 追加
  "role": "導入・概要ページ",
  "layout": "世界地図背景 + 説明文",
  "content": {                  // ← 既存構造は完全保持
    "subtitle": "集客に役立つインスタ新機能まとめ",
    "introText": "知ってる？売れる人は新機能を上手に使いこなしてる♪",
    "description": "インスタは日々進化中 最新の機能を取り入れて集客力アップを目指そう！",
    "visualElements": "Monotone Instagram*ヘッダー、世界地図、キャラクターイラスト"
  }
}
```

## 🎯 作業の目的と方針

### **目的**
各Kxxx.jsonファイルに`section`と`template`フィールドを追加し、新テンプレートシステムで完璧なマッチング（structureScore = 1.0）を実現する。

### **100点ルール**
- **structureScore = 1.0** → 完璧なマッチ → 適切なテンプレート存在 ✅
- **structureScore < 1.0** → 部分的マッチ → 専用テンプレートが不足 ❌
- **妥協禁止**: パターン条件の緩和は根本解決にならない

## 📖 必読ドキュメント（読まずに作業開始禁止）

### **1. 基盤理解（必須）**
```bash
1. /mnt/c/instagram-course/instagram-post-generator/次世代Claude_Code引き継ぎ_テンプレート設計システム理解_2025-07-25.md
2. /mnt/c/instagram-course/instagram-post-generator/Kxxx_セクションマッピング.md
3. /mnt/c/instagram-course/instagram-post-generator/テンプレート設計システム実装タスク_2025-07-25.md
```

### **2. 実装済みパターン確認（必須）**
```bash
# 正しい実装例を必ず確認
app/data/knowledgeBase/knowledge/K113.json  # TypeID=004実装例
app/data/knowledgeBase/knowledge/K002.json  # TypeID=002実装例
```

### **3. システム理解（必須）**
```bash
app/services/knowledgeBase/KnowledgeBasedContentGenerator.ts  # プロンプト生成システム
app/components/templates/TemplateTypes.ts                    # 新テンプレート構造定義
```

## 🔧 実装仕様（厳守）

### **追加フィールド（3つのみ）**
```json
{
  "pageCount": 10,
  "contentPageCount": 8,    // ← 追加：page1(title)とpage10(cta)を除いた数
  "detailedContent": {
    "page2": {               // page1はタイトルページなので対象外
      "section": "intro",    // ← 追加：セクション識別
      "template": "basic_intro", // ← 追加：新テンプレート名
      "role": "導入・概要ページ",    // ← 既存：保持
      "layout": "世界地図背景 + 説明文", // ← 既存：保持
      "content": { ... }     // ← 既存：完全保持
    }
  }
}
```

### **削除フィールド（1つのみ）**
```json
"pageStructurePattern": "",  // ← この行のみ削除
```

### **絶対に変更してはいけない要素**
- `content`の内部構造
- `role`、`layout`等の既存フィールド
- `pageIndicator`、`visualElements`等の装飾要素
- `selectionFlow`、`emphasis`、`source`等のコンテンツ要素

## 📊 contentPageCountの計算方法

### **基本ルール**
```
contentPageCount = pageCount - 2
```
- **-1**: page1（タイトルページ）を除外
- **-1**: 最終ページ（CTAページ）を除外

### **例外ケース**
```json
// K004の場合：7ページ
"pageCount": 7,
"contentPageCount": 5,  // 7 - 2 = 5

// K113の場合：10ページ  
"pageCount": 10,
"contentPageCount": 8,  // 10 - 2 = 8

// K002の場合：10ページ
"pageCount": 10, 
"contentPageCount": 8,  // 10 - 2 = 8
```

## 🎨 セクション・テンプレートマッピング

### **TypeID=001: 共感・感情誘導型**
```json
"page1": { "role": "title-cover" },                    // section追加なし
"page2": { "section": "intro", "template": "basic_intro" },
"page3": { "section": "mainContent", "template": "sequential_step_learning" },
"page4": { "section": "mainContent", "template": "sequential_step_learning" },
"pageN": { "section": "summary", "template": "basic_summary" }
```

### **TypeID=002: スキル習得・手順解説型**
```json
"page1": { "role": "title-cover" },                    // section追加なし
"page2": { "section": "intro", "template": "basic_intro" },
"page3": { "section": "mainContent", "template": "step_guide_achievement" },
"page4": { "section": "mainContent", "template": "step_guide_achievement" },
"pageN": { "section": "summary", "template": "basic_summary" }
```

### **TypeID=003: 情報提供・データ型**
```json
"page1": { "role": "title-cover" },                    // section追加なし
"page2": { "section": "intro", "template": "basic_intro" },
"page3": { "section": "mainContent", "template": "method_systematic_info" },
"page4": { "section": "mainContent", "template": "practical_guide_conversation" },
"pageN": { "section": "summary", "template": "basic_summary" }
```

### **TypeID=004: 効率・実用特化型**
```json
"page1": { "role": "title-cover" },                    // section追加なし
"page2": { "section": "intro", "template": "basic_intro" },
"page3": { "section": "mainContent", "template": "feature_parallel_info" },
"page4": { "section": "mainContent", "template": "feature_parallel_info" },
"pageN": { "section": "summary", "template": "basic_summary" }
```

## 📁 作業対象ファイル

### **修正が必要なファイル（10個）**
```bash
# TypeID=001: 共感・感情誘導型（4個）
app/data/knowledgeBase/knowledge/K006.json  # 要復元＋再修正
app/data/knowledgeBase/knowledge/K027.json  # 要復元＋再修正
app/data/knowledgeBase/knowledge/K030.json  # 要復元＋再修正
app/data/knowledgeBase/knowledge/K032.json  # 要復元＋再修正

# TypeID=002: スキル習得・手順解説型（2個）
app/data/knowledgeBase/knowledge/K040.json  # 要復元＋再修正
app/data/knowledgeBase/knowledge/K005.json  # 要復元＋再修正

# TypeID=003: 情報提供・データ型（3個）
app/data/knowledgeBase/knowledge/K004.json  # 要復元＋再修正
app/data/knowledgeBase/knowledge/K025.json  # 要修正
app/data/knowledgeBase/knowledge/K024.json  # 要修正

# TypeID=004: 効率・実用特化型（1個）
app/data/knowledgeBase/knowledge/K104.json  # 未作業
```

## ⚠️ 作業手順（厳守）

### **Step 1: 実装済みパターンの理解**
1. K113.jsonを読んで正しいパターンを確認
2. K002.jsonを読んで正しいパターンを確認
3. 追加する要素と保持する要素を明確に理解

### **Step 2: contentPageCountの追加**
```json
"pageCount": X,
"contentPageCount": X-2,  // pageCount - 2
```

### **Step 3: pageStructurePatternの削除**
```json
"pageStructurePattern": "",  // ← この行のみ削除
```

### **Step 4: 各ページにsection/template追加**
```json
"pageX": {
  "section": "適切なセクション",     // ← 追加
  "template": "適切なテンプレート", // ← 追加
  // 既存の全フィールドは完全保持
  "role": "...",
  "layout": "...", 
  "content": { ... }  // 既存構造を一切変更しない
}
```

### **Step 5: page1はスキップ**
```json
"page1": {
  "role": "title-cover",  // sectionもtemplateも追加しない
  // 既存構造は完全保持
}
```

## 🚨 絶対禁止事項

### **構造破壊の禁止**
- `content`内の既存フィールドを削除・変更禁止
- `pageIndicator`、`visualElements`等の装飾要素削除禁止  
- `selectionFlow`、`emphasis`等のコンテンツ要素削除禁止

### **命名規則の厳守**
- セクション名：`intro`、`mainContent`、`summary`のみ使用
- テンプレート名：実装済み11個のテンプレートのみ使用

### **安易な簡略化の禁止**
```json
// ❌ 絶対禁止
"content": ["簡略化した配列"]

// ✅ 正しい
"content": {
  "複雑な既存構造": "を完全保持",
  "selectionFlow": ["ES提出", "適性検査", "面接複数回"],
  "details": { ... }
}
```

## 📞 次世代Claude Codeへの引き継ぎ確認

### **作業開始前チェック**
- [ ] K113.jsonの実装パターンを確認済み
- [ ] K002.jsonの実装パターンを確認済み  
- [ ] 追加フィールド（section, template, contentPageCount）を理解済み
- [ ] 削除フィールド（pageStructurePatternのみ）を理解済み
- [ ] 既存構造の完全保持ルールを理解済み

### **作業中の注意点**
- 既存の`content`構造を見て「複雑だから簡略化しよう」と思った時点で間違い
- `selectionFlow`等を見て「これは不要」と思った時点で間違い
- K113、K002と同じパターンで追加のみ行う

### **完了確認**
- 追加フィールドが正しく設定されている
- 既存フィールドが一切削除・変更されていない
- K113、K002と同じ構造になっている

---

**この引き継ぎドキュメントの指示に従って、残り10個のKxxx.jsonファイルを正しく修正してください。前回の間違いを繰り返さないよう、必ず実装済みパターンを確認してから作業を開始してください。**