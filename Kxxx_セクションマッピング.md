# Kxxx.json セクションマッピング

## 📋 概要

このドキュメントは、各ナレッジベース（Kxxx.json）の`detailedContent`内の各ページに`section`と`template`フィールドを追加するためのマッピングです。

**作成日**: 2025-07-25  
**目的**: 一括でKxxx.jsonに`section`と`template`フィールドを追記  
**基準**: 「テンプレートが変わる = セクションが分かれる」

## 🎯 作業の全体フロー

### **Phase 1: 詳細分析（104個分）**
1. **メインコンテンツのページ数特定**
   - 例：K113は7ページ（page3-9がmainContent）
2. **各ページのテンプレート種別特定**
   - 例：K113は全て「並列紹介テンプレート」
3. **テンプレートバリエーション分析**
   - 例：effect（効果説明）が短文型 vs 段落型

### **Phase 2: 拡張マッピング作成**
```javascript
const sectionTemplateMapping = {
  "K113": {
    "page1": { "section": "title", "template": null },
    "page2": { "section": "intro", "template": "basic_intro" },
    "page3": { "section": "mainContent", "template": "parallel_introduction_short_effect" },
    "page4": { "section": "mainContent", "template": "parallel_introduction_short_effect" },
    // ...
    "page10": { "section": "summary", "template": "action_promotion" }
  }
};
```

### **Phase 3: テンプレートパターン特定**
- 各テンプレートの具体的な要素構成を定義
- レイアウトパターン × カラム内容の組み合わせ分析
- バリエーション別のテンプレート設計
- 100点マッチングシステムの基盤完成

### **Phase 4: 一括スクリプトで実装**
全Kxxx.jsonに`section`と`template`フィールドを自動追加

---

## 🎯 セクション種別定義

### **基本セクション**
- **`intro`**: 導入・概要説明
- **`mainContent`**: メインコンテンツ（情報提供・解決策）
- **`summary`**: まとめ・行動促進

### **拡張セクション**
- **`problemEmpathy`**: 問題共感（感情的な困りごとへの共感）
- **`solutionIntro`**: 解決方法導入
- **`practicalTips`**: 実践的Tips
- **`pointsList`**: ポイントリスト（3つのポイント等）
- **`dataPresentation`**: データ提示
- **`stepProcess`**: ステップ解説
- **`qaSection`**: Q&A形式

---

## 📊 投稿別セクションマッピング

### **TypeID=001: 共感・感情誘導型**

#### **K006（導入開始型）**
```json
"page1": {"section": "title"},      // タイトルページ（スキップ対象）
"page2": {"section": "intro"},      // 導入
"page3": {"section": "mainContent"}, // STEP01
"page4": {"section": "mainContent"}, // STEP02  
"page5": {"section": "mainContent"}, // STEP03
"page6": {"section": "summary"}     // 行動促進
```

#### **K027（問題共感開始型）**
```json
"page1": {"section": "title"},         // タイトルページ（スキップ対象）
"page2": {"section": "problemEmpathy"}, // 問題共感
"page3": {"section": "solutionIntro"},  // 解決方法導入
"page4": {"section": "mainContent"},    // Q&A1-2
"page5": {"section": "mainContent"},    // Q&A3-4
"page6": {"section": "mainContent"},    // Q&A5-6
"page7": {"section": "mainContent"},    // Q&A7-8
"page8": {"section": "practicalTips"}   // 実践的Tips
```

#### **K030（ポイントリスト型）**
```json
"page1": {"section": "title"},         // タイトルページ（スキップ対象）
"page2": {"section": "problemEmpathy"}, // 問題共感
"page3": {"section": "mainContent"},    // 問題特定
"page4": {"section": "mainContent"},    // 洞察開示
"page5": {"section": "pointsList"},     // 企業視点（3つのポイント）
"page6": {"section": "mainContent"},    // 実践例
"page7": {"section": "summary"}         // 励ましメッセージ
```

#### **K032（時系列ストーリー型）**
```json
"page1": {"section": "title"},      // タイトルページ（スキップ対象）
"page2": {"section": "intro"},      // ストーリー導入
"page3": {"section": "mainContent"}, // 時点1
"page4": {"section": "mainContent"}, // 時点2
"page5": {"section": "mainContent"}, // 時点3
"page6": {"section": "mainContent"}, // 時点4
"page7": {"section": "mainContent"}, // 時点5
"page8": {"section": "mainContent"}, // 時点6
"page9": {"section": "mainContent"}, // 時点7
"page10": {"section": "mainContent"}, // 時点8
"page11": {"section": "summary"}     // 行動促進
```

### **TypeID=002: スキル習得・手順解説型**

#### **パターン1: 順序依存紹介型（K002, K023, K073）**
```json
"page1": {"section": "title"},      // タイトルページ（スキップ対象）
"page2": {"section": "intro"},      // 導入
"page3": {"section": "mainContent"}, // Point/Step 1
"page4": {"section": "mainContent"}, // Point/Step 2
"page5": {"section": "mainContent"}, // Point/Step 3
"page6": {"section": "mainContent"}, // Point/Step 4
"page7": {"section": "mainContent"}, // Point/Step 5
"page8": {"section": "mainContent"}, // Point/Step 6
"page9": {"section": "mainContent"}, // Point/Step 7
"page10": {"section": "summary"}    // 終了ページ（任意）
```

#### **パターン2: 並列紹介型（K040, K103, K108）**
```json
"page1": {"section": "title"},      // タイトルページ（スキップ対象）
"page2": {"section": "intro"},      // 導入
"page3": {"section": "mainContent"}, // カテゴリ1
"page4": {"section": "mainContent"}, // カテゴリ2
"page5": {"section": "mainContent"}, // カテゴリ3
"page6": {"section": "mainContent"}, // カテゴリ4
"page7": {"section": "mainContent"}, // カテゴリ5
"page8": {"section": "summary"}     // 終了ページ（任意）
```

#### **パターン3: ツール紹介型（K005, K048, K112）**
```json
"page1": {"section": "title"},      // タイトルページ（スキップ対象）
"page2": {"section": "intro"},      // 導入
"page3": {"section": "mainContent"}, // ツール1
"page4": {"section": "mainContent"}, // ツール2
"page5": {"section": "mainContent"}, // ツール3
"page6": {"section": "mainContent"}, // ツール4
"page7": {"section": "mainContent"}, // ツール5
"page8": {"section": "summary"}     // 終了ページ（任意）
```

### **TypeID=003: 情報提供・データ型**

#### **パターン1: 体系化情報提供型（K004, K011, K018）**
```json
"page1": {"section": "title"},         // タイトルページ（スキップ対象）
"page2": {"section": "intro"},         // 導入（問題提起・必要性）
"page3": {"section": "mainContent"},   // カテゴリ別情報提示
"page4": {"section": "mainContent"},   // 各項目の詳細解説1
"page5": {"section": "mainContent"},   // 各項目の詳細解説2
"page6": {"section": "mainContent"},   // 各項目の詳細解説3
"page7": {"section": "summary"},       // まとめ・整理
"page8": {"section": "practicalTips"}  // 保存促進・CTA
```

#### **パターン2: 実践ガイド型（K025, K003, K028）**
```json
"page1": {"section": "title"},       // タイトルページ（スキップ対象）
"page2": {"section": "intro"},       // 導入（課題設定・目標提示）
"page3": {"section": "stepProcess"}, // 具体的手順1
"page4": {"section": "stepProcess"}, // 具体的手順2
"page5": {"section": "stepProcess"}, // 具体的手順3
"page6": {"section": "mainContent"}, // 事例・テンプレート・模範回答
"page7": {"section": "practicalTips"}, // 実践方法・注意点
"page8": {"section": "summary"}      // 行動促進・継続学習CTA
```

#### **パターン3: データ提示型（K024, K026, K036）**
```json
"page1": {"section": "title"},           // タイトルページ（スキップ対象）
"page2": {"section": "intro"},           // 導入（データの重要性・背景）
"page3": {"section": "dataPresentation"}, // データ・事実の提示（ランキング・リスト）
"page4": {"section": "dataPresentation"}, // データの分析・解釈
"page5": {"section": "mainContent"},     // 活用方法・判断基準
"page6": {"section": "summary"}          // 意思決定支援・CTA
```

### **TypeID=004: 効率・実用特化型**

#### **基本構造（K113等の並列紹介型）**
```json
"page1": {"section": "title"},      // タイトルページ（スキップ対象）
"page2": {"section": "intro"},      // 導入・価値提示
"page3": {"section": "mainContent"}, // 情報の紹介1
"page4": {"section": "mainContent"}, // 情報の紹介2
"page5": {"section": "mainContent"}, // 情報の紹介3
"page6": {"section": "mainContent"}, // 情報の紹介4
"page7": {"section": "mainContent"}, // 情報の紹介5
"page8": {"section": "mainContent"}, // 情報の紹介6
"page9": {"section": "mainContent"}, // 情報の紹介7
"page10": {"section": "summary"}    // 総括
```

---

## 🔧 一括更新用スクリプト構造

### **更新対象フィールド**
```json
// 更新前
"page2": {
  "role": "導入・概要ページ",
  "layout": "世界地図背景 + 説明文",
  "content": { ... }
}

// 更新後
"page2": {
  "section": "intro",  // ← 追加
  "role": "導入・概要ページ",
  "layout": "世界地図背景 + 説明文",
  "content": { ... }
}
```

### **拡張マッピングテーブル例（section + template）**
```javascript
const sectionTemplateMapping = {
  "K006": {
    "page1": { "section": "title", "template": null },
    "page2": { "section": "intro", "template": "basic_intro" },
    "page3": { "section": "mainContent", "template": "sequential_step" },
    "page4": { "section": "mainContent", "template": "sequential_step" },
    "page5": { "section": "mainContent", "template": "sequential_step" },
    "page6": { "section": "summary", "template": "action_promotion" }
  },
  "K113": {
    "page1": { "section": "title", "template": null },
    "page2": { "section": "intro", "template": "basic_intro" },
    "page3": { "section": "mainContent", "template": "parallel_introduction_short_effect" },
    "page4": { "section": "mainContent", "template": "parallel_introduction_short_effect" },
    "page5": { "section": "mainContent", "template": "parallel_introduction_short_effect" },
    "page6": { "section": "mainContent", "template": "parallel_introduction_short_effect" },
    "page7": { "section": "mainContent", "template": "parallel_introduction_short_effect" },
    "page8": { "section": "mainContent", "template": "parallel_introduction_short_effect" },
    "page9": { "section": "mainContent", "template": "parallel_introduction_short_effect" },
    "page10": { "section": "summary", "template": "action_promotion" }
  }
  // ... 104個全て
};
```

### **テンプレート命名規則**
- **基本形**: `{レイアウト}_{内容種別}_{バリエーション}`
- **例**: 
  - `layout_1col_3div_parallel_introduction_short` （1カラム3分割・並列紹介・短文型）
  - `layout_2col_updown_21_qa_format` （上下2カラム2:1・Q&A形式）
  - `layout_1col_unified_points_list_3items` （1カラム統合・3項目ポイントリスト）

## 🎨 レイアウトパターン完全版

### **テンプレート設計の基本構造**

**テンプレート = レイアウト構造 × カラム内容 × 要素バリエーション**

#### **共通要素（全テンプレート共通・分析対象外）**
- **ページヘッダー**: ページインジケータ
- **基本タイトル**: タイトル構造
- **装飾要素**: キャラクター配置、背景色、フォント等

#### **分析対象要素**
1. **レイアウト構造**: どのパターンでページが分割されているか
2. **カラム内容**: 各カラム/セクションに何が配置されているか
3. **情報構造**: 文章量、配置位置、階層関係

### **全レイアウトパターン（最大10パターン）**

#### **1. 基本1カラム型**

**1-1: 縦3分割型**
```
┌─────────────────┐
│   上部カラム     │ ← 1/3
├─────────────────┤
│   中部カラム     │ ← 1/3
├─────────────────┤
│   下部カラム     │ ← 1/3
└─────────────────┘
```

**1-2: 統合型（全面1カラム）**
```
┌─────────────────┐
│                │
│   統合カラム     │ ← 全高
│                │
└─────────────────┘
```

#### **2. 基本2カラム型**

**2-1: 左右分割型（全高）**
```
┌─────────┬─────────┐
│         │         │
│  左カラム │ 右カラム │ ← 全高
│         │         │
└─────────┴─────────┘
```

**2-2: 上下分割型（高さ比率バリエーション）**

**2-2-1: 均等型（1:1）**
```
┌─────────────────┐
│   上部カラム     │ ← 1/2
├─────────────────┤
│   下部カラム     │ ← 1/2
└─────────────────┘
```

**2-2-2: 上部優位型（2:1）**
```
┌─────────────────┐
│                │
│   上部カラム     │ ← 2/3
├─────────────────┤
│   下部カラム     │ ← 1/3
└─────────────────┘
```

**2-2-3: 下部優位型（1:2）**
```
┌─────────────────┐
│   上部カラム     │ ← 1/3
├─────────────────┤
│                │
│   下部カラム     │ ← 2/3
└─────────────────┘
```

#### **3. 複合型（上下×左右）**

**3-1: 上部統合＋下部2カラム型**

**3-1-1: 上部優位型（2:1）**
```
┌─────────────────┐
│                │
│  上部統合カラム   │ ← 2/3
├─────────┬─────────┤
│  下部   │  下部   │ ← 1/3
│  左カラム │ 右カラム │
└─────────┴─────────┘
```

**3-1-2: 下部優位型（1:2）**
```
┌─────────────────┐
│  上部統合カラム   │ ← 1/3
├─────────┬─────────┤
│         │         │
│  下部   │  下部   │ ← 2/3
│  左カラム │ 右カラム │
└─────────┴─────────┘
```

**3-2: 上部2カラム＋下部統合型**

**3-2-1: 上部優位型（2:1）**
```
┌─────────┬─────────┐
│         │         │
│  上部   │  上部   │ ← 2/3
│  左カラム │ 右カラム │
├─────────┴─────────┤
│  下部統合カラム   │ ← 1/3
└─────────────────┘
```

**3-2-2: 下部優位型（1:2）**
```
┌─────────┬─────────┐
│  上部   │  上部   │ ← 1/3
│  左カラム │ 右カラム │
├─────────┴─────────┤
│                │
│  下部統合カラム   │ ← 2/3
└─────────────────┘
```

### **レイアウトパターン一覧表**

| No | パターンID | パターン名 | 構造 | 高さ比率 |
|----|-----------|-----------|------|----------|
| 1-1 | layout_1col_3div | 縦3分割型 | 上/中/下 | 1:1:1 |
| 1-2 | layout_1col_unified | 統合型 | 全面 | 1 |
| 2-1 | layout_2col_leftright | 左右分割型 | 左/右 | 全高 |
| 2-2-1 | layout_2col_updown_11 | 上下均等型 | 上/下 | 1:1 |
| 2-2-2 | layout_2col_updown_21 | 上部優位型 | 上/下 | 2:1 |
| 2-2-3 | layout_2col_updown_12 | 下部優位型 | 上/下 | 1:2 |
| 3-1-1 | layout_complex_up1_down2_21 | 上統合＋下2カラム(上優位) | 上統合/(下左/下右) | 2:1 |
| 3-1-2 | layout_complex_up1_down2_12 | 上統合＋下2カラム(下優位) | 上統合/(下左/下右) | 1:2 |
| 3-2-1 | layout_complex_up2_down1_21 | 上2カラム＋下統合(上優位) | (上左/上右)/下統合 | 2:1 |
| 3-2-2 | layout_complex_up2_down1_12 | 上2カラム＋下統合(下優位) | (上左/上右)/下統合 | 1:2 |

### **分析方針**

#### **理論フレームワーク完成**
- 最大10パターンの理論的枠組みを設定
- 実際のKxxxファイル分析で使用パターンを特定
- 使用されていないパターンは除外

#### **客観的分析アプローチ**
- **事実重視**: 実際に存在するレイアウトのみを抽出
- **無理な振り分け禁止**: 該当しないパターンに強制分類しない
- **実用性優先**: Instagram画面制約下で実際に選択されたパターンを採用

#### **期待される結果**
- 実際には**5-7パターン程度**に収束予想
- スマホ視認性・読みやすさから自然淘汰されたパターンあり
- 効果的なテンプレート体系の基盤完成

---

## 📝 注意事項

### **page1について**
- 全投稿でタイトルページのため`"section": "title"`を設定
- プロンプト生成時はスキップ対象
- 分析対象外として扱う

### **セクション判定の基準**
1. **role**フィールドの内容を確認
2. **layout**パターンを確認  
3. **content**の構造を確認
4. 同じテンプレート構造なら同じセクション
5. テンプレート構造が変わったら新セクション

### **特殊ケース**
- **K030のpage5**: `pointsList`セクション（3つのポイント構造）
- **複数ページのintro**: それぞれ異なるテンプレートの場合は個別セクション
- **ステップ解説**: `stepProcess`セクション使用
- **データ提示**: `dataPresentation`セクション使用

---

**このマッピングに基づいて、全Kxxx.jsonファイルに`section`フィールドを一括追加することで、新しいページ構成・テンプレート設計方針が実装できます。**