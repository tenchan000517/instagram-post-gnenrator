# 【ステップ②】ペルソナID体系構築分析計画書

## 📋 分析概要

### 目的
Step1で確定したTypeID体系を基に、ペルソナを統合分析してPersonaID体系を構築し、TypeID×PersonaIDの最適連携を設計する。

### 前提条件
- Step1のPOST_TYPE_CATEGORIZATION_COMPLETE.mdが完成していること
- 確定したTypeID体系（TypeID=001, 002, 003...）が利用可能であること

### 最終成果物
- `PERSONA_ID_SYSTEM.md` - 完全確定したPersonaID体系
- PersonaID体系 (例: PersonaID=015:方法論重視型就活生)
- TypeID×PersonaID推奨連携マップ
- 各PersonaIDの詳細定義・特徴
- Step3（テーマ統合）への引き継ぎ仕様

## 📊 分析手順

### Phase 1: TypeID別ペルソナ統合分析

#### 1-1. TypeID別データ分離
```
作業内容：
- Step1で確定したTypeIDを基に投稿を分類
- TypeID=001の全投稿のペルソナ分析結果を抽出
- TypeID=002の全投稿のペルソナ分析結果を抽出
- TypeID=003の全投稿のペルソナ分析結果を抽出
```

#### 1-2. TypeID内ペルソナ統合
```
作業内容：
- 同一TypeID内の類似ペルソナを特定
- 重複・類似ペルソナのマージ基準策定
- TypeID別統合ペルソナリストの作成
```

### Phase 2: PersonaID体系構築

#### 2-1. 全TypeID横断ペルソナ分析
```
作業内容：
- 全TypeIDの統合ペルソナを横断比較
- 完全重複ペルソナの特定・統合
- ユニークペルソナの抽出・整理
```

#### 2-2. PersonaID割り当て
```
作業内容：
- システム要件定義に準拠したPersonaID体系構築
- PersonaID=001~0XX の順次割り当て
- 各PersonaIDの名称・特徴・属性の標準化
```

#### 2-3. ペルソナ詳細定義
```
作業内容：
- 各PersonaIDの詳細プロファイル作成
- 年代・職業・状況・心理状態等の構造化
- 有益性パターン・情報収集行動の特定
```

### Phase 3: TypeID×PersonaID連携設計

#### 3-1. 相性分析
```
作業内容：
- TypeID×PersonaIDの組み合わせ分析
- 高エンゲージメント組み合わせの特定
- 各TypeIDの推奨PersonaIDリスト作成
```

#### 3-2. 連携マッピング
```
作業内容：
- TypeID別推奨PersonaIDの優先順位付け
- ユーザーフロー（投稿タイプ選択→ペルソナ推奨）の設計
- システム実装用の連携テーブル作成
```

#### 3-3. 次ステップ引き継ぎ仕様
```
作業内容：
- Step3（テーマ統合）への引き継ぎ要件定義
- TypeID×PersonaID×ThemeID三次元連携の前提整理
- データアクセス・活用方法の標準化
```

## 📁 作業ファイル構成

```
/docs/content-analysis/analytics/step2-personas/
├── STEP2_ANALYSIS_PLAN.md（本文書）
├── SESSION_INSTRUCTIONS_STEP2.md（セッション指示書）
├── working/
│   ├── phase1-typeid-persona-extraction.md（TypeID別ペルソナ抽出）
│   ├── phase2-personaid-construction.md（PersonaID体系構築）
│   └── phase3-typeid-personaid-mapping.md（連携マッピング）
└── PERSONA_ID_SYSTEM.md（最終成果物）
```

## 📊 分析項目詳細

### TypeID別ペルソナ抽出項目
```
各ペルソナについて：
1. 基本属性（年代・性別・職業・状況・レベル）
2. 心理状態（悩み・目標・不安・モチベーション）
3. 行動パターン（情報収集方法・価値観・ライフスタイル）
4. このTypeIDとの親和性（なぜこのタイプが有効か）
```

### PersonaID統合基準
```
統合判断基準：
1. 基本属性の一致度（80%以上で統合検討）
2. 心理状態の類似性（主要な悩み・目標の共通性）
3. 行動パターンの共通性（情報収集・価値観の一致）
4. TypeIDとの親和性パターンの類似性
```

### 連携分析項目
```
TypeID×PersonaID組み合わせごと：
1. エンゲージメント推定（高/中/低）
2. 有益性マッチング度（完全一致/部分一致/不一致）
3. 実装優先度（推奨/選択可能/非推奨）
4. 根拠・理由の記録
```

## ⚠️ 重要な留意事項

### Step1依存関係
- Step1のTypeID体系確定が大前提
- TypeID変更時は本Step全体の再実行必要
- Step1成果物の整合性を常に確認

### PersonaID体系設計原則
- システム要件定義のIDベース連携に準拠
- 拡張性を考慮した番号体系（001~999等）
- 重複・矛盾のない一意性保証

### 品質保証要件
- PersonaID重複・矛盾の防止
- TypeID×PersonaID連携の論理的整合性
- 次ステップへの完全な引き継ぎ保証

---

**作成日**: 2025-07-19  
**前提**: Step1完了（TypeID体系確定）  
**目標**: PersonaID体系構築とTypeID×PersonaID連携設計