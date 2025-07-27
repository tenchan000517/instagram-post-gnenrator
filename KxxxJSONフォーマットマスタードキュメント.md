# KxxxJSONフォーマットマスタードキュメント

## 📋 概要

このドキュメントは、ナレッジベースコンテンツの標準JSON形式（KxxxJSON）を定義します。K117の実装を通じて確立された最新の仕様に基づいています。

## 🎯 基本原則

1. **`KnowledgeContent`インターフェース準拠**
2. **`templateOverrides`による柔軟なテンプレート制御**
3. **3つのマスタードキュメントとの整合性**
4. **既存データとの互換性**

## 📊 標準フォーマット仕様

### 必須フィールド

```typescript
export interface KnowledgeContent {
  source: string;                              // データソース識別子
  problemCategory: string;                     // 問題カテゴリ
  problemDescription: string;                  // 問題の詳細説明
  postType: string;                           // 投稿タイプ（"001"-"004"）
  postTypeReason: string;                     // 投稿タイプ選択理由
  solutionContent: {                          // ソリューション詳細
    概要: string;
    具体的手順: string[];
    提供情報: string[];
    実用的なアドバイス: string[];
  };
  effectiveExpressions: string[];             // 効果的な表現
  searchKeywords: string[];                   // 検索キーワード
  emotionalTriggers: string[];                // 感情的トリガー
  marketingStage: string;                     // マーケティング段階
  knowledgeId: string;                        // ナレッジID
  pageStructurePattern: string;               // ページ構造パターン
  actualTitle: string;                        // 実際のタイトル
  pageCount: number;                          // ページ数
}
```

### オプショナルフィールド

```typescript
interface KnowledgeContent {
  hashTag?: string;                           // ハッシュタグ（非推奨・未使用）
  detailedContent?: Record<string, any>;      // 詳細コンテンツ
  templateOverrides?: Record<string, string>; // テンプレートオーバーライド
}
```

## 🔧 templateOverridesの仕様

### 目的
標準ページ構造のテンプレートを個別に置換し、コンテンツ固有の表現を可能にする。

### 形式
```json
{
  "templateOverrides": {
    "ページ番号": "テンプレートID",
    "3": "ng_good_comparison",
    "4": "category_explanation",
    "5": "category_explanation",
    "6": "vision_strength_matrix"
  }
}
```

### 動作
1. **基本構造**: `pageStructurePattern`で指定されたページ構造を読み込み
2. **オーバーライド適用**: 指定ページ番号のテンプレートを置換
3. **他ページ維持**: 指定されていないページは元のテンプレートを使用

## 📝 実装例：K117

```json
{
  "source": "contents-117",
  "problemCategory": "就活スキル習得",
  "problemDescription": "志望動機の作り方がわからない・企業研究が浅い",
  "postType": "002",
  "postTypeReason": "志望動機作成の4つのポイントを段階的に学習する実践的ノウハウ伝授型コンテンツ",
  "solutionContent": {
    "概要": "志望動機に必要な4つのポイントとNG/GOOD例による具体的解説、企業分析フレームワーク",
    "具体的手順": [
      "将来成し遂げたいことを明確にする（具体性とエピソード化）",
      "なぜほかの業界ではダメなのかを業界分析で説明する",
      "なぜほかの企業ではダメなのかを差別化ポイントで説明する",
      "その企業にどう貢献するかを企業ビジョン×自分の強みで表現する"
    ],
    "提供情報": [
      "志望動機の4つの必須要素チェックリスト",
      "将来成し遂げたいことのNG/GOOD例",
      "業界分析の具体例",
      "企業差別化の3つの軸",
      "企業ビジョン×自分の強みのマトリックス分析方法"
    ],
    "実用的なアドバイス": [
      "「成し遂げたいと思ったキッカケ」をエピソードとして話せるとGOOD",
      "業界分析では各業界の具体的な強みと理由を明確にする",
      "企業差別化では業界内での強み・社風・制度の3軸で分析",
      "前ページの「その企業ならでは」の部分と組み合わせるのも効果的"
    ]
  },
  "effectiveExpressions": [
    "人事は志望動機のここ見てます",
    "できてない子が多すぎる...",
    "各項目をNG例と一緒に具体例を解説！",
    "「成し遂げたいと思ったキッカケ」がエピソードとして話せるとGOOD！",
    "これ当てはまってるとヤバい..."
  ],
  "searchKeywords": [
    "志望動機",
    "企業研究",
    "就活",
    "業界分析",
    "差別化",
    "企業分析",
    "NG例",
    "GOOD例"
  ],
  "emotionalTriggers": [
    "志望動機への不安解消",
    "具体的方法の提示",
    "NG例による気づき促進",
    "GOOD例による目標設定",
    "段階的学習による達成感"
  ],
  "marketingStage": "就活準備段階（企業研究・志望動機作成時期）",
  "knowledgeId": "K117",
  "pageStructurePattern": "typeID002-sequential-dependency",
  "actualTitle": "人事は志望動機のここ見てます",
  "pageCount": 6,
  "templateOverrides": {
    "3": "ng_good_comparison",
    "4": "category_explanation",
    "5": "category_explanation",
    "6": "vision_strength_matrix"
  },
  "detailedContent": {
    "page1": { /* 詳細構造 */ },
    "page2": { /* 詳細構造 */ },
    "page3": { /* 詳細構造 */ },
    "page4": { /* 詳細構造 */ },
    "page5": { /* 詳細構造 */ },
    "page6": { /* 詳細構造 */ }
  }
}
```

## 🎯 フィールド詳細説明

### postType
- **形式**: `"001"`, `"002"`, `"003"`, `"004"`
- **参照**: `投稿タイプ判断基準マスタードキュメント.md`
- **重要**: `TypeID=`は不要

### pageStructurePattern
- **形式**: 既存のページ構造パターンID
- **例**: `"typeID002-sequential-dependency"`
- **参照**: `/app/services/knowledgeBase/data/pageStructures/`

### templateOverrides（重要な新機能）
- **目的**: 標準パターンのテンプレート部分的置換
- **形式**: `Record<string, string>` (ページ番号 → テンプレートID)
- **システム動作**: `PageStructureMatcher.applyTemplateOverrides()`で処理

### detailedContent
- **目的**: 各ページの詳細構造保存
- **形式**: ページ別の構造化データ
- **用途**: テンプレート生成時の参照データ

## 🚨 重要な注意事項

### 必須要件
1. **3つのマスタードキュメント準拠**
   - 投稿タイプ判断基準マスタードキュメント
   - ターゲット判断基準マスタードキュメント  
   - ページ構成判断基準マスタードキュメント

2. **整合性チェック**
   - `postType`と`pageStructurePattern`の整合性
   - `templateOverrides`で指定するテンプレートの存在確認
   - ページ数と実際の構造の一致

### 禁止事項
1. **CTA要素の含有**
   - `savePrompt`, `cta`, `finalPageOffer`は削除対象
   - 純粋なコンテンツのみ記載

2. **具体的すぎる表現**
   - 「励ましメッセージ」→「まとめページ」
   - 汎用的な表現に統一

## 🔄 作成フロー

### 1. 基本情報設定
```typescript
// 3つのマスタードキュメントに基づく分析
postType: "002"                                    // 投稿タイプ判断
pageStructurePattern: "typeID002-sequential-dependency"  // ページ構成判断
```

### 2. templateOverrides設定
```typescript
// 標準構造で対応できない場合のみ設定
"templateOverrides": {
  "3": "ng_good_comparison",     // NG/GOOD比較が必要
  "4": "category_explanation",   // カテゴリ別説明が必要
  "6": "vision_strength_matrix"  // マトリックス分析が必要
}
```

### 3. 詳細コンテンツ構造化
```typescript
"detailedContent": {
  // 各ページの具体的な構造と内容
  // テンプレート生成時の参照用
}
```

## 📊 バリデーション

### 必須チェック項目
- [ ] 全必須フィールドの存在
- [ ] `postType`の有効値（"001"-"004"）
- [ ] `pageStructurePattern`の存在確認
- [ ] `templateOverrides`で指定するテンプレートの存在
- [ ] `pageCount`と`detailedContent`の整合性

### 推奨チェック項目
- [ ] 3つのマスタードキュメントとの整合性
- [ ] CTA要素の除去
- [ ] 汎用的な表現への統一

## 🎯 今後の拡張

### 予定される機能
1. **動的テンプレート選択**
   - コンテンツ内容に基づく自動テンプレート選択
   
2. **バリデーション自動化**
   - マスタードキュメント準拠の自動チェック
   
3. **テンプレート候補提案**
   - コンテンツ構造に最適なテンプレートの自動提案

---

**作成日**: 2025-07-27  
**バージョン**: 1.0  
**基準**: K117実装完了時点  
**重要度**: 最高 - 全ナレッジベース開発の基準  
**参照**: 
- `app/types/knowledgeBase.ts`
- `投稿タイプ判断基準マスタードキュメント.md`
- `ターゲット判断基準マスタードキュメント.md`
- `ページ構成判断基準マスタードキュメント.md`