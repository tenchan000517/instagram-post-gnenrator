# データシステム統合ディレクトリ

**作成日**: 2025年8月27日  
**更新日**: 2025年8月27日  
**目的**: ランキングシステム統合管理  
**統合対象**: 習慣ランキング・企業ランキング・コンテンツランキング

---

## 📁 ディレクトリ構造 (5階層システム)

### 🟢 01_ACTIVE/ - 運用中システム
現在進行形で使用中のシステム・エンジン・実行ファイル

#### ranking-engine/
- **統合ランキング生成エンジン**: rankingGenerator.js
- **4段階起動術式**: 01〜04究極リサーチ・統合・生成・改善
- **マスタープラン**: 最終改善版実行プロンプト集

**用途**: 実際にランキングを生成する際に使用

### 🟡 02_REFERENCE/ - 参照・ガイド・マニュアル
参照用ドキュメント・プロンプト・ガイドライン・手順書

#### research-prompts/
- **8バッチリサーチプロンプト**: 業界別データ収集手順
- **調査用プロンプト集**: データ収集・調査用プロンプト

#### workflow-manuals/
- **作業フロー**: システム運用手順・プロセス
- **データベース構築フロー**: 企業情報データベース構築手順

#### classification-guides/
- **9分類システム**: 難易度・費用・時間・効果別分類
- **分類基準**: カテゴリ管理ルール

**用途**: 新規開発・運用時のガイドライン参照

### 🗄️ 03_DATABASE/ - データベース・データソース
各種データベースファイル・マスターデータ・データソース

#### habit-databases/
- **habit-behavior-database.json**: 習慣データベース（45エントリ）
- **productivity-tools-database.json**: 生産性ツールデータベース
- **分類済みデータベース**: 9種類の分類別データ

#### company-databases/
- **companyMasterData.json**: 企業マスターデータ
- **companyMasterData_extended.json**: 企業拡張データ
- **業界別企業データ**: 15業界の企業情報

**用途**: ランキング生成の元データソース

### 🎨 04_CONTENTS/ - コンテンツ・テンプレート
高品質コンテンツ・テンプレート・完成品サンプル

#### high-quality-templates/
- **type003ランキングテンプレート**: ナレッジベース由来の高品質コンテンツ
- **Instagram投稿フォーマット**: 即座に使用可能なテンプレート

#### content-samples/
- **成功事例**: 高品質コンテンツの参考例
- **フォーマット**: 投稿テンプレート集

**用途**: 既存の高品質コンテンツ活用・テンプレート利用

### 🗂️ 05_ARCHIVE/ - アーカイブ・履歴・保管
過去コンテンツ・開発履歴・分析データ・実験結果

#### generated-content-archive/
- **kikuyo-rankings/**: 習慣データベース生成済み投稿（35ファイル）
- **過去生成コンテンツ**: 実際の生成結果アーカイブ

#### development-history/
- **Phase1開発記録**: プロトタイプ段階の記録
- **システム進化履歴**: 開発経緯・改善履歴

#### research-results/
- **15業界データベース結果**: 調査・分析結果
- **効果検証データ**: パフォーマンス分析結果

**用途**: 参考資料・学習材料・改善検討材料

---

## 🔄 統合元システム → 新5階層構造

| 統合元 | 新統合先 | 状態 |
|--------|--------|------|
| `ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/` | `01_ACTIVE/` + `03_DATABASE/` | ✅ 統合完了 |
| `app/data/companyDatabase/` | `01_ACTIVE/` + `03_DATABASE/` | ✅ 統合完了 |
| `app/data/knowledgeBase/knowledge/type003/` | `04_CONTENTS/high-quality-templates/` | ✅ 統合完了 |
| `knowledge-quality-system/specialized-systems/type003-ranking/research-prompts/` | `02_REFERENCE/research-prompts/` | ✅ 統合完了 |
| `knowledge-quality-system/specialized-systems/habit-ranking-system/` | `05_ARCHIVE/development-history/` | ✅ 統合完了 |
| `ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/` | `05_ARCHIVE/generated-content-archive/` | ✅ アーカイブ完了 |

---

## 🎯 5階層システム使用方法

### 🟢 01_ACTIVE - ランキング生成実行
```bash
# 4段階起動術式で実行
1. 01究極リサーチ_起動術式.md → データ収集
2. 02データベース統合_起動術式.md → データ統合  
3. 03ランキング生成_起動術式.md → ランキング作成
4. 04評価・分析・改善_起動術式.md → 品質管理
```

### 🟡 02_REFERENCE - 手順書・ガイド参照
```bash
# 新規開発・運用時の参照
- research-prompts/ → データ収集手順
- workflow-manuals/ → 作業プロセス
- classification-guides/ → 分類基準
```

### 🗄️ 03_DATABASE - データソース管理
```bash
# データベース選択・組み合わせ
- habit-databases/ → 習慣データ
- company-databases/ → 企業データ
- 分類済みDB → 目的別データ
```

### 🎨 04_CONTENTS - 高品質テンプレート活用
```bash
# 既存コンテンツ利用
- high-quality-templates/ → 完成度高テンプレート
- content-samples/ → 成功事例・フォーマット
```

### 🗂️ 05_ARCHIVE - 参考・学習資料
```bash
# 過去事例・開発履歴参照
- generated-content-archive/ → 過去の生成例
- development-history/ → システム進化履歴
- research-results/ → 調査・分析結果
```

---

## 📊 システム統計

- **総統合ファイル数**: 120+ファイル
- **アクティブシステム**: 運用可能状態
- **参照資料**: 体系化完了
- **分析データ**: 構造化保管
- **アーカイブ**: 適切な保管完了

---

**管理者**: Claude Code  
**最終更新**: 2025年8月27日  
**ステータス**: 統合・アーカイブ完了