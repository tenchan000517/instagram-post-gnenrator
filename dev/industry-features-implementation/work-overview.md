# 業種特徴系データ可視化実装 - 作業全容

## 🎯 作業概要
業種特徴系ジャンルでランキング・グラフテンプレートを使用したデータ可視化機能の実装

## 📋 現在の進捗
**Phase 0: 環境整備完了**
- Phase 0のREADMEに調査指針を記載完了
- 次のアクション: Phase 0の完全調査実行

## 📚 作業開始前の必読ドキュメント（順序重要）

1. **作業継続状況**: `HANDOVER.md` ← 【最優先】現在の進捗確認
2. **業種特徴系進捗報告書**: `progress-report.md`
3. **要件定義書**: `requirements/data-visualization-templates.md`
4. **実装ロードマップ**: `roadmap/INDUSTRY-GENRE-ROADMAP.md`
5. **Phase詳細**: 該当Phaseディレクトリ内のREADME.md

## 📖 作業の進め方

### 各Phase完了時の作業
1. **このwork-overview.mdの進捗更新**
   - 現在の進捗セクションを更新
   - 完了したPhaseを記録

2. **DEVELOPER_GUIDE.mdの現在作業状況削除**
   - 全作業完了時に現在作業状況セクションを削除

3. **PROGRESS_REPORT.md更新**
   - 業種特徴系の進捗率を更新
   - 完了事項リストに追加

### 問題・課題の記録
- **発見したISSUE**: `dev/issues/` に保存
- **技術的課題**: 各Phaseディレクトリ内に記録
- **改善提案**: `dev/improvements/` に保存

### セッションリフレッシュ時の引き継ぎ
- **HANDOVER.md更新**: `dev/industry-features-implementation/HANDOVER.md`
  - コンテキスト制限によるセッションリフレッシュ時用
  - 現在の進捗状況・次のアクション・重要な発見事項を記録
  - 各Phase完了時や重要な発見があった時点で随時更新

#### HANDOVERフォーマット
```markdown
# HANDOVER - 業種特徴系データ可視化実装

## 📋 基本情報
- プロジェクト: 業種特徴系ジャンル - データ可視化テンプレート実装
- 引き継ぎ日: [日付]
- 進捗率: [X%]

## 🎯 現在の状況
### 完了事項
- [Phase X]: [具体的な完了内容]

### 進行中
- [現在のPhase]: [具体的な作業内容]

### 次のアクション
1. [具体的な次の作業]
2. [参照すべきファイル]

## 🔍 重要な発見事項
- [技術的発見]
- [問題・課題]
- [回避すべき事項]

## 📂 作業ディレクトリ
`dev/industry-features-implementation/`

## 🚀 作業再開方法
開発ルールに従って作業を開始 → CLAUDE.md → current-work-status.md → work-overview.md
```

### 最終完成時の成果物
- **他ジャンルへの適用ガイド**: `dev/data-visualization-guide.md`
- **次世代開発者向け完了報告**: PROGRESS_REPORT.mdに反映

## 🚀 次のアクション
**Phase 0開始**: `phase-0-system-analysis/README.md` から調査を開始

## ⚠️ 重要事項
- ファイルは必ず全文読み込み（limitパラメータ禁止）
- 断片的読み込みは重複実装リスクを生む
- 既存関数の見落とし防止が最優先

## 🎯 最終目標
5ページ構成（INDEX + ランキング + 円グラフ + 棒グラフ + ハウツー）のデータ可視化テンプレート完成

---

最終更新: Phase 0環境整備完了時点