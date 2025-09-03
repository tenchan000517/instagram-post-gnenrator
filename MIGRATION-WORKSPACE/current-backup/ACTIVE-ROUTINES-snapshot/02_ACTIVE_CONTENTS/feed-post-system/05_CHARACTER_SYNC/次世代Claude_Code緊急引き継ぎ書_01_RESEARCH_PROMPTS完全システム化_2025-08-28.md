# 次世代Claude Code緊急引き継ぎ書
# 01_RESEARCH_PROMPTS完全システム化 - 調査完了版

**作成日**: 2025-08-28  
**緊急度**: 🚨最高  
**進捗**: 20%（調査完了、実装80%残存）  

---

## 🎯 本来やりたかったこと

### 根本的な目的
**01_RESEARCH_PROMPTSディレクトリを完全なシステム**にする

### 具体的なゴール
1. **①データベースリサーチ→②ナレッジ作成**の2段階フロー完全連携
2. **汎用データベース拡張システム**（習慣・企業・スキル・投資等）
3. **統合起動術式**でワンコマンド実行

---

## 📊 調査で判明した現状

### 🔍 データベース実態調査結果

#### 習慣系データベース（完成度：90%）
```
場所: /ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/data-systems/03_DATABASE/habit-databases/
メインDB: habit-behavior-database.json（1732行）
分類DB: classified-dbs/（9個の特化DB）
拡張フロー: /ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/（4段階完成）
```

#### 企業系データベース（完成度：60%）
```
実際のデータベース（発見）: 
/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/data-systems/05_ARCHIVE/research-results/
- 企業情報データベース2025.md（楽天・サイバーエージェント等含む）
- IT・システム業界データベース2025.md
- 金融業界データベース2025.md
- 商社業界データベース2025.md
- etc...（業界別12個のmdファイル）

使用中のJSONシステム:
/app/data/companyDatabase/
- companyMasterData.json（基本情報、一部企業のみ）
- companyMasterData_extended.json（福利厚生詳細、一部のみ）
- rankingGenerator.js（ランキング生成エンジン）

問題: mdデータベース↔JSONシステムが未統合
```

### 🔗 TYPE_ACTIVATION連携状況

#### TYPE003-KIKUYO-ACTIVATION（企業系）
```
場所: /feed-post-system/02_TYPE_ACTIVATION/TYPE003-KIKUYO-ACTIVATION.md
要求: TOP10企業の詳細データ（8ページナレッジ用）
出力: K800.json形式（unified-template-11-company-ranking）
```

#### 習慣系TYPE_ACTIVATION
```
現状: リール用のみ（1ページCANVA）
不足: フィード用TYPE_ACTIVATION（8ページナレッジ）
```

### 🚨 致命的フォーマット不適合問題

#### 現在の01_RESEARCH_PROMPTSの出力
```
❌ COMPANY-DATABASE-RESEARCH.md: フィードポスト本文形式
❌ HABIT-DATABASE-RESEARCH.md: フィードポスト本文形式
❌ 他全て: フィードポスト本文形式
```

#### TYPE_ACTIVATIONが求める入力
```
✅ 構造化データ（JSON形式）
✅ TOP10詳細情報（各社5ページ分コンテンツ）
✅ keyHighlights、parameterGraph、features、benefits等
```

**完全なフォーマット不適合**

---

## 🚀 完成への残り80%の作業

### Phase 1: データベース統合（30%）

#### 1-1. 企業系mdデータベース→JSON変換
```
作業内容:
- 企業情報データベース2025.md → companyMasterData.json完全版
- 12業界データベース → 統合JSON化
- K800.json再現テスト

期待結果:
- 楽天・サイバーエージェント等全企業データ完備
- rankingGenerator.jsで完全ランキング生成可能
```

#### 1-2. 習慣系フィード用TYPE_ACTIVATION作成
```
作業内容:
- 習慣系8ページナレッジJSON生成システム
- habit-behavior-database.json → K###.json（Type002形式？）

期待結果:
- 習慣系でもフィード投稿用ナレッジ生成可能
```

### Phase 2: リサーチプロンプト完全再設計（40%）

#### 2-1. 出力フォーマット統一
```
現在の問題:
全リサーチプロンプト → フィードポスト本文出力

修正後:
全リサーチプロンプト → TYPE_ACTIVATION用構造化データ出力

具体的修正:
- RESEARCH-MASTER-PROMPT.md
- COMPANY-DATABASE-RESEARCH.md  
- HABIT-DATABASE-RESEARCH.md
- PRODUCTIVITY-DATABASE-RESEARCH.md
- NEW-RESEARCH-PROMPT.md
```

#### 2-2. 汎用化テンプレート実装
```
汎用リサーチプロンプトテンプレート作成:
- 習慣系用
- 企業系用
- スキル系用（新規）
- 投資系用（新規）
- etc...

全て同じ4段階フロー適用:
①究極リサーチ→②DB統合→③コンテンツ生成→④評価改善
```

### Phase 3: 統合起動術式実装（10%）

#### 3-1. フロー連携システム
```
統合起動術式作成:
【テーマ入力】
    ↓ 自動判定
【①適切なリサーチプロンプト実行】
    ↓ 構造化データ出力
【②適切なTYPE_ACTIVATION実行】
    ↓ K###.json生成・保存
【完成】

エラーハンドリング・品質保証含む
```

---

## 🔧 具体的実装指示

### 最優先タスク（Phase 1-1）
**企業情報データベース2025.md → companyMasterData.json完全版変換**

```
手順:
1. 企業情報データベース2025.mdを読み込み
2. 既存companyMasterData.json形式に合わせて変換
3. K800.jsonの全企業（サイバーエージェント・楽天等）を確実に含める
4. rankingGenerator.jsでテスト実行
5. K800.json再現確認

重要事項:
- 既存JSON構造を完全踏襲
- データの正確性保持
- categories.industry更新も必須
```

### 第二優先（Phase 2-1）
**COMPANY-DATABASE-RESEARCH.mdの出力フォーマット修正**

```
現在の出力（修正対象）:
## 期待アウトプット
- フィードポスト本文（2200文字以内、KIKUYO口調）
- 企業ランキング表（視覚化対応）
- データ根拠・出典情報
- 関連ハッシュタグ12個
- フォローアップ分析案

修正後の出力:
## 期待アウトプット（TYPE_ACTIVATION用構造化データ）
- TOP10企業詳細データ（rankingGenerator.js活用）
- 各企業の8ページナレッジ用情報
- keyHighlights配列（7文字制限）
- parameterGraph、features、benefits、uniqueFeatures
- TYPE003-KIKUYO-ACTIVATION.md用完全データセット
```

---

## ⚠️ 重要な制約・注意事項

### データ品質要件
- **エビデンスレベルA/B限定**（既存システム踏襲）
- **実在企業データのみ**（推測・憶測禁止）
- **最新データ使用**（2024-2025年）

### システム連携要件
- **既存テンプレート完全準拠**（EnhancedCompanyDetailTemplate.tsx）
- **keyHighlights 7文字制限厳守**
- **unified-template-11-company-ranking形式**

### ファイル管理
- **ルートディレクトリにドキュメント作成禁止**
- **適切なディレクトリ内で作業**
- **既存構造を破壊しない**

---

## 🎯 完成時の理想状態

### 01_RESEARCH_PROMPTSディレクトリの完成形
```
RESEARCH-MASTER-PROMPT.md（統合起動術式）
├── 自動判定: テーマ→適切なリサーチプロンプト選択
├── ①COMPANY-DATABASE-RESEARCH.md → 構造化データ
├── ①HABIT-DATABASE-RESEARCH.md → 構造化データ  
├── ①PRODUCTIVITY-DATABASE-RESEARCH.md → 構造化データ
├── ①NEW-RESEARCH-PROMPT.md → 構造化データ
    ↓ 自動連携
├── ②TYPE003-KIKUYO-ACTIVATION.md → K###.json
├── ②TYPE002-MISAKI-ACTIVATION.md → K###.json（習慣系フィード）
├── ②TYPE004-TEN-ACTIVATION.md → K###.json
    ↓
完成したナレッジファイル（8ページ）
```

### 汎用データベース拡張エンジン
```
任意分野で同じフローが使用可能:
- 新スキル系データベース構築
- 新投資系データベース構築
- 新健康系データベース構築
- etc...

全て4段階フロー:
①究極リサーチ→②DB統合→③コンテンツ生成→④評価改善
```

---

## 💡 次世代Claude Codeへの最終指示

**この引き継ぎ書を完全に理解し、以下を実行してください**：

1. **企業データベース統合**（最優先）
   - mdデータベース→JSON変換
   - K800.json再現確認

2. **リサーチプロンプト出力修正**
   - 全プロンプトをTYPE_ACTIVATION用に変更
   - 構造化データ出力に統一

3. **統合起動術式実装**
   - ①リサーチ→②TYPE_ACTIVATION自動連携
   - エラーハンドリング完備

4. **汎用拡張システム完成**
   - 任意分野対応の4段階フロー
   - 継続的データベース拡張

**これで01_RESEARCH_PROMPTSディレクトリが真に完成します**

**現在の進捗20%から100%完成まで、よろしくお願いします！**