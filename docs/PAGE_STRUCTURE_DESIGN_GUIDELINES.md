# ページ構造設計ガイドライン

**作成日**: 2025-07-23  
**目的**: ナレッジベース起点システムのページ構造設計を体系化

---

## 🎯 **設計原則**

### **1. ナレッジデータ構造の理解**

#### **標準データ構造**
```json
{
  "solutionContent": {
    "概要": "string",
    "具体的手順": ["string"],
    "提供情報": ["string"], 
    "実用的なアドバイス": ["string"]
  }
}
```

#### **投稿タイプ別特性**
- **001 キャリアの悩み解決法**: 感情的共感、ストーリーテリング
- **002 スキルアップガイド**: 段階的手順、教育的構成
- **003 業界・企業情報まとめ**: 客観的データ、情報整理
- **004 効率アップテクニック**: 即効性、実用性重視

---

## 📐 **templatePattern設計規則**

### **1. 基本テンプレートタイプ**

#### **A. section-items 型**
```json
{
  "title": "string",
  "sections": [
    {
      "sectionTitle": "string",
      "items": ["string"]
    }
  ]
}
```
**適用場面**: 複数カテゴリの情報を構造化して提示

#### **B. enumeration 型**
```json
{
  "title": "string", 
  "enumeration": {
    "items": ["string"]
  }
}
```
**適用場面**: リスト形式、箇条書き、選択肢提示

### **2. データマッピング規則**

#### **ナレッジデータ → templatePattern 対応**
- `具体的手順` → section-items の items 配列
- `提供情報` → enumeration の items 配列
- `実用的なアドバイス` → section-items の items 配列

---

## 🏗️ **ページ構造作成フロー**

### **Step 1: ナレッジ分析**
1. **投稿タイプ確認** (001-004)
2. **ページ数確認** (3-10ページ)
3. **内容分析** (手順系 vs 情報系 vs 悩み系)
4. **データ構造確認** (具体的手順の有無等)

### **Step 2: 構造設計**
1. **ページ役割定義** (導入→展開→結論)
2. **テンプレートID選択** (section-items/enumeration)
3. **templatePattern定義** (AI生成構造指定)
4. **itemAssignments定義** (抽出ルール指定)

### **Step 3: 整合性確認**
1. **データ活用確認** (ナレッジデータが適切に活用されるか)
2. **UI表示確認** (templatePatternがUI要件を満たすか)
3. **一貫性確認** (同タイプ投稿との統一性)

---

## 📊 **現在の問題事例: K009**

### **問題点**
- **ナレッジ内容**: AIツール12選 (効率化情報)
- **使用構造**: 就活情報3ページ構成
- **結果**: 内容とテンプレートの完全不一致

### **正しい設計案**

#### **K009専用構造: "ai-tools-list-3page"**
```json
{
  "pageStructureId": "ai-tools-list-3page",
  "name": "AIツール紹介3ページ構成",
  "pages": [
    {
      "pageNumber": 1,
      "templateId": "section-items",
      "role": "problem-hook",
      "title": "AIツール活用の課題提起",
      "templatePattern": {
        "title": "string",
        "sections": [
          {
            "sectionTitle": "string",
            "items": ["string"]
          }
        ]
      }
    },
    {
      "pageNumber": 2,
      "templateId": "enumeration",
      "role": "tools-showcase",
      "title": "厳選AIツール一覧",
      "templatePattern": {
        "title": "string",
        "enumeration": {
          "items": ["string"]
        }
      }
    },
    {
      "pageNumber": 3,
      "templateId": "section-items",
      "role": "usage-advice",
      "title": "効果的な活用方法",
      "templatePattern": {
        "title": "string",
        "sections": [
          {
            "sectionTitle": "string", 
            "items": ["string"]
          }
        ]
      }
    }
  ]
}
```

---

## 🎯 **今後の開発方針**

### **優先作業**
1. **K009専用構造作成** (ai-tools-list-3page.json)
2. **既存構造のtemplatePattern追加**
3. **ナレッジ×構造マッピング表作成**

### **長期目標**
1. **投稿タイプ別標準構造** (001-004用テンプレート)
2. **自動構造選択システム** (ナレッジ分析による自動マッチング)
3. **templatePattern生成ツール** (手動作成の効率化)

---

## 📚 **参考情報**

### **既存構造ファイル**
- `problem-solution-carousel-9page.json` (9ページ問題解決型)
- `efficiency-practical-info-3page.json` (3ページ効率情報型)
- `mock-method-5page.json` (5ページ手法紹介型)

### **関連システム**
- `KnowledgeBasedContentGenerator.ts` (AI生成エンジン)
- `PageStructureMatcher.ts` (構造マッチング)

---

**結論**: 現在の応急処置を体系化し、将来の効率的な開発基盤を構築する必要がある。