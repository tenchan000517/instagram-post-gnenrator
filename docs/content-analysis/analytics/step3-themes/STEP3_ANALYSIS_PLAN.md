# 【ステップ③】テーマ統合・三次元連携設計分析計画書

## 📋 分析概要

### 目的
Step1,2で確定したTypeID・PersonaID体系を基に、テーマを分析・体系化し、TypeID×PersonaID×ThemeIDの三次元連携システムを設計する。

### 前提条件
- Step1のPOST_TYPE_CATEGORIZATION_COMPLETE.mdが完成していること
- Step2のPERSONA_ID_SYSTEM.mdが完成していること
- TypeID×PersonaID連携マップが利用可能であること

### 最終成果物
- `THEME_INTEGRATION_MAPPING.md` - 三次元統合連携システム
- ThemeID体系 (例: ThemeID=001:ES書き方, 002:面接対策)
- TypeID×PersonaID×ThemeID三次元連携テーブル
- ユーザーフロー実装仕様（投稿タイプ選択→テーマ推奨→ペルソナ推奨）
- Step4（最終システム統合）への引き継ぎ仕様

## 📊 分析手順

### Phase 1: テーマ抽出・ThemeID体系構築

#### 1-1. 全投稿テーマ抽出
```
作業内容：
- 100投稿のコンテンツ分析からテーマキーワード抽出
- テーマの重複・類似性分析
- 主要テーマの分類・グルーピング
```

#### 1-2. ThemeID体系構築
```
作業内容：
- システム要件定義に準拠したThemeID体系設計
- ThemeID=001~0XX の順次割り当て
- 各ThemeIDの名称・説明・特徴の標準化
```

#### 1-3. TypeID×ThemeID基本連携
```
作業内容：
- 各ThemeIDがどのTypeIDに最適かの分析
- TypeID別推奨ThemeIDリストの作成
- ThemeID別対応TypeIDの整理
```

### Phase 2: 三次元連携分析

#### 2-1. TypeID×PersonaID×ThemeID組み合わせ分析
```
作業内容：
- 全ての組み合わせパターンの有効性評価
- 高エンゲージメント組み合わせの特定
- 各組み合わせの成功要因分析
```

#### 2-2. 推奨パターン設計
```
作業内容：
- TypeID選択時の推奨ThemeID算出ロジック
- ThemeID選択時の推奨PersonaID算出ロジック
- ユーザーの選択に応じた動的推奨システム設計
```

#### 2-3. 三次元連携テーブル構築
```
作業内容：
- TypeID×PersonaID×ThemeID連携テーブル作成
- 各組み合わせの推奨度・優先度設定
- 実装用データ構造の設計
```

### Phase 3: ユーザーフロー実装設計

#### 3-1. ユーザーフロー詳細設計
```
システム要件定義の理想的フローを実装レベルまで詳細化：

1. 投稿タイプ選択
   ユーザー: TypeIDから選択
   システム: 選択TypeIDの推奨ThemeIDリスト表示

2. テーマ選択
   ユーザー: 推奨ThemeIDから選択
   システム: TypeID×ThemeIDに最適なPersonaIDリスト表示

3. ペルソナ選択
   ユーザー: 推奨PersonaIDから選択
   システム: TypeID×PersonaID×ThemeID確定

4. タイトル入力→自動生成実行
```

#### 3-2. システム実装仕様策定
```
作業内容：
- データベース設計（テーブル構造・リレーション）
- API設計（各選択段階でのデータ取得・推奨算出）
- フロントエンド設計（UI/UX・選択肢表示ロジック）
```

#### 3-3. 次ステップ引き継ぎ仕様
```
作業内容：
- Step4（最終システム統合）への引き継ぎ要件定義
- 品質検証・実装検証の要件整理
- 最終システム仕様書作成の前提条件整備
```

## 📁 作業ファイル構成

```
/docs/content-analysis/analytics/step3-themes/
├── STEP3_ANALYSIS_PLAN.md（本文書）
├── SESSION_INSTRUCTIONS_STEP3.md（セッション指示書）
├── working/
│   ├── phase1-theme-extraction.md（テーマ抽出・ThemeID構築）
│   ├── phase2-three-dimension-analysis.md（三次元連携分析）
│   └── phase3-userflow-implementation.md（ユーザーフロー実装設計）
└── THEME_INTEGRATION_MAPPING.md（最終成果物）
```

## 📊 分析項目詳細

### テーマ抽出項目
```
各ThemeIDについて：
1. テーマ名・説明（ユーザー表示用）
2. 対象範囲・具体例（コンテンツ例示）
3. 主要対応TypeID（最適な投稿タイプ）
4. 関連キーワード・タグ（検索・分類用）
```

### 三次元連携評価項目
```
TypeID×PersonaID×ThemeID組み合わせごと：
1. 組み合わせ有効性（有効/部分有効/無効）
2. エンゲージメント推定（高/中/低）
3. コンテンツ生成成功率（高/中/低）
4. ユーザー満足度推定（高/中/低）
5. 実装優先度（必須/推奨/オプション）
```

### ユーザーフロー実装項目
```
各選択段階について：
1. 表示する選択肢の算出ロジック
2. 推奨順序・優先度の計算方法
3. ユーザー行動に応じた動的変更ルール
4. エラーハンドリング・フォールバック設計
```

## ⚠️ 重要な留意事項

### Step1,2依存関係
- TypeID・PersonaID体系確定が大前提
- 前Step変更時は本Step全体の再実行必要
- Step1,2成果物の整合性を常に確認

### 三次元連携設計原則
- システム要件定義のIDベース連携に完全準拠
- ユーザー体験最優先（直感的・効率的な選択フロー）
- 拡張性確保（新TypeID・PersonaID・ThemeID追加対応）

### 実装可能性の保証
- 技術的実装可能性の事前検証
- パフォーマンス要件の考慮
- 保守性・運用性の確保

---

**作成日**: 2025-07-19  
**前提**: Step1,2完了（TypeID・PersonaID体系確定）  
**目標**: TypeID×PersonaID×ThemeID三次元連携システム設計