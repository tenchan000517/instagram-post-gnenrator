# Kxxxフォーマットマスタードキュメント

## 📋 概要

このドキュメントは、ナレッジファイル（Kxxx.json）の標準フォーマットを定義します。システム調査に基づき、実際に使用されているフィールドのみを含む確定版フォーマットです。

## 🎯 基本原則

1. **システム実装準拠**: 実際にシステムで参照・使用されているフィールドのみを含む
2. **必須/オプショナル明記**: 各フィールドの必要性を明確に区分
3. **Type別拡張対応**: 投稿タイプごとの特有フィールドを考慮

## 📊 標準フォーマット

### **必須フィールド（システム動作に不可欠）**

```json
{
  "knowledgeId": "K001",
  "problemCategory": "string - 問題カテゴリ分類",
  "problemDescription": "string - 問題の詳細説明",
  "postType": "string - 投稿タイプ（001-004）",
  "actualTitle": "string - 実際の投稿タイトル",
  "pageCount": "number - 総ページ数",
  "pageStructurePattern": "string - ページ構造パターンID",
  "solutionContent": {
    "概要": "string - 解決策の概要",
    "具体的手順": "string[] - 実行手順リスト",
    "実用的なアドバイス": "string[] - 実践的アドバイス",
    "提供情報": "string[] - 提供する情報リスト（オプショナル）"
  },
  "detailedContent": {
    "page1": {
      "role": "string - ページの役割",
      "section": "string - セクション名",
      "template": "string - 使用テンプレート",
      "content": "object - ページ別詳細コンテンツ"
    },
    "page2": {
      "role": "string",
      "section": "string",
      "template": "string", 
      "content": "object"
    }
  },
  "searchKeywords": "string[] - 検索キーワード配列",
  "emotionalTriggers": "string[] - 感情的トリガー配列",
  "marketingStage": "string -   ターゲットの学習段階（何を得たいか）"
}"
}
```

### **オプショナルフィールド（機能拡張・カスタマイズ用）**

```json
{
  "source": "string - データ出典情報（Graph/Ranking系テンプレートで使用）",
  "postTypeReason": "string - 投稿タイプ選択理由",
  "contentPageCount": "number - コンテンツページ数（pageCountと異なる場合）",
  "templateOverrides": {
    "page番号": "string - オーバーライドテンプレート名"
  },
  "targetPersona": "string - ターゲットペルソナ（特定ケースで使用）"
}
```

### **削除対象フィールド（システムで未使用または不要）**

#### **ルートレベル削除対象フィールド**
```json
{
  "hashTag": "削除対象 - システムで参照されていない",
  "effectiveExpressions": "削除対象 - システムで参照されていない", 
  "warnings": "削除対象 - 完全未使用",
  "targetReason": "削除対象 - 不要フィールド",
  "empathyHooks": "削除対象 - レガシーフィールド（K001, K180のみ残存）",
  "empathyContent": "削除対象 - レガシーフィールド（K001, K180のみ残存）",
  "empathyClimax": "削除対象 - レガシーフィールド（K001, K180のみ残存）",
  "communityValidation": "削除対象 - レガシーフィールド（K001, K180のみ残存）",
  "hopeTransition": "削除対象 - レガシーフィールド（K001, K180のみ残存）"
}
```

#### **サンプル調査で発見されなかった不要フィールド**
```json
{
  "data": "削除対象 - サンプル調査で発見されず",
  "emphasis": "削除対象 - サンプル調査で発見されず",
  "note": "削除対象 - サンプル調査で発見されず", 
  "url": "削除対象 - サンプル調査で発見されず",
  "account": "削除対象 - サンプル調査で発見されず",
  "testimonial": "削除対象 - サンプル調査で発見されず",
  "relatedContent": "削除対象 - サンプル調査で発見されず",
  "companyInfo": "削除対象 - サンプル調査で発見されず",
  "annualHolidays": "削除対象 - サンプル調査で発見されず",
  "averageSalary": "削除対象 - サンプル調査で発見されず",
  "averageOvertime": "削除対象 - サンプル調査で発見されず",
  "features": "削除対象 - サンプル調査で発見されず",
  "serviceInfo": "削除対象 - サンプル調査で発見されず",
  "stats": "削除対象 - サンプル調査で発見されず"
}
```

#### **混入禁止フィールド（ナレッジの純粋性を阻害）**
```json
{
  "cta": "混入禁止 - Call-to-Action要素",
  "offerTitle": "混入禁止 - オファータイトル",
  "limitedOffer": "混入禁止 - 限定オファー"
}
```

## 🔍 フィールド詳細仕様

### 必須フィールド詳細

#### **knowledgeId**
- **型**: string
- **用途**: ナレッジアイテムの一意識別子
- **使用場所**: KnowledgeMatchingService, MasterDataService, contentGeneratorService
- **形式**: "K001", "K002", ... （必ずK+3桁数字の形式）

#### **problemCategory**
- **型**: string  
- **用途**: ナレッジの問題カテゴリ分類
- **使用場所**: KnowledgeMatchingService, contentGeneratorService
- **例**: "キャリアの悩み", "スキルアップ", "業界情報"

#### **postType**
- **型**: string
- **用途**: 投稿タイプによる処理分岐・テンプレート選択
- **使用場所**: KnowledgeBasedContentGenerator, BasicIntroTemplate, contentGeneratorService
- **値**: "001", "002", "003", "004"

#### **solutionContent**
- **型**: object
- **用途**: コンテンツ生成の核となる解決策情報
- **使用場所**: KnowledgeBasedContentGenerator, TemplateItemMapper, KnowledgeStructureAnalyzer
- **必須サブフィールド**:
  - `概要`: string
  - `具体的手順`: string[]
  - `実用的なアドバイス`: string[]

#### **detailedContent**
- **型**: object
- **用途**: ページ別詳細コンテンツ構造
- **使用場所**: KnowledgeBasedContentGenerator, contentGeneratorService, TemplateItemMapper
- **構造**: `page1`, `page2`, ... 各ページオブジェクト

#### **pageStructurePattern**
- **型**: string
- **用途**: ページ構造パターンID判定
- **使用場所**: contentGeneratorService, pageStructureAnalyzer
- **例**: "typeID001-emotion-empathy-list", "typeID002-parallel-introduction"

### オプショナルフィールド詳細

#### **source**
- **型**: string
- **用途**: データ出典情報表示
- **使用場所**: GraphTemplate, RankingTemplate, IndustryRankingTemplate
- **使用条件**: グラフ・ランキング系コンテンツのみ

#### **templateOverrides**
- **型**: object
- **用途**: ページ毎のテンプレートカスタマイズ
- **使用場所**: KnowledgeBasedContentGenerator, contentGeneratorService, PageStructureMatcher
- **構造**: `{ "page2": "CustomTemplate", "page3": "AnotherTemplate" }`

## 📝 detailedContent内フィールドについて

### 基本方針
detailedContent内のフィールドは**削除しない**
- **理由**: detailedContent内の全てはそのままプロンプトに送られるため
- **構造**: detailedContentのフォーマットはテンプレートごとに異なる
- **対応テンプレート**: メインコンテンツ用テンプレート10種類 + 導入・INDEX用 + サマリー・まとめ用

### detailedContent内で使用されるフィールド例
```json
{
  "detailedContent": {
    "page1": {
      "role": "string - ページの役割",
      "section": "string - セクション名", 
      "template": "string - 使用テンプレート",
      "content": {
        "actionableInsight": "string - 実行可能な洞察（detailedContent内のため保持）",
        "integrationMessage": "string - 統合メッセージ（detailedContent内のため保持）",
        "phaseInfo": "object - フェーズ情報（detailedContent内のため保持）",
        "practicalSkill": "string[] - 実践スキル（detailedContent内のため保持）",
        "immediateAction": "string[] - 即座のアクション（detailedContent内のため保持）",
        "skillCheck": "string[] - スキルチェック（detailedContent内のため保持）",
        "companyTagline": "string - 企業タグライン（detailedContent内のため保持）",
        "selectionFlow": "object - 選考フロー（detailedContent内のため保持）"
      }
    }
  }
}
```

## ✅ 品質管理チェックポイント

### 新規作成時のチェックリスト
- [ ] 必須フィールドが全て含まれている
- [ ] knowledgeIdがユニークである
- [ ] postTypeと実際のコンテンツが一致している
- [ ] pageStructurePatternが実在するパターンである
- [ ] detailedContentの構造が正しい
- [ ] 削除対象フィールドが含まれていない（hashTag, effectiveExpressions, warnings, targetReason, empathy系, サンプル未発見フィールド群）
- [ ] 混入禁止フィールド（cta, offerTitle, limitedOffer）が含まれていない

### 既存ファイル修正時のチェックリスト
- [ ] システムで参照されるフィールドを削除していない
- [ ] Type特有フィールドが適切に設定されている
- [ ] ページ数とdetailedContentの構造が一致している

## 🔄 移行作業

### 非推奨フィールドの削除
1. **hashTag**: 全Kxxxファイルから削除
2. **effectiveExpressions**: 全Kxxxファイルから削除

### 推奨作業
- 既存ファイルの段階的な標準化
- Type別特有フィールドの適切な設定
- pageStructurePatternの明確化

---

**作成日**: 2025-07-29  
**バージョン**: 1.0  
**更新内容**: システム調査に基づく確定版フォーマット策定  
**参照**: システム実装調査結果  
**重要度**: 最高 - ナレッジファイル作成・修正の基準