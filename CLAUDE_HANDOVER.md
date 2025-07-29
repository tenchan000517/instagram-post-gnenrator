# Claude Code 引き継ぎドキュメント

## 🎯 プロジェクト状況

Instagram投稿生成ツールのナレッジベース最適化プロジェクトが進行中です。

## ✅ 完了済み作業

### 1. テンプレート①〜⑩の実装
**場所:** `/app/components/templates/unified/`

- SimpleIntroTemplate (①)
- DualSectionTemplate (②) 
- RankingDisplayTemplate (③)
- ItemGridTemplate (④)
- ComparisonTemplate (⑤)
- CompanyDetailTemplate (⑥)
- ItemListTemplate (⑦)
- SectionBlocksTemplate (⑧)
- DynamicBoxesTemplate (⑨)
- ImagePointTemplate (⑩)

**特徴:** 全て `description or list` 両対応（string | string[]）

### 2. ページ構成パターン10種類の作成
**場所:** `/app/services/knowledgeBase/data/pageStructures/unified/`

- unified-template-01-simple-intro.json
- unified-template-02-dual-section.json
- unified-template-03-ranking-display.json
- unified-template-04-item-grid.json
- unified-template-05-comparison.json
- unified-template-06-company-detail.json
- unified-template-07-item-list.json
- unified-template-08-section-blocks.json
- unified-template-09-dynamic-boxes.json
- unified-template-10-image-point.json

**構造:**
```json
{
  "pageNumber": 1,         // 導入
  "pageNumber": 2,         // INDEX (optional: true)
  "pageNumber": "dynamic", // メインコンテンツ
  "pageNumber": "last"     // まとめ (optional: true)
}
```

## 🔧 次に必要な作業

### 1. ページ構成の統合
新しいページ構成を既存システムに統合し、正しくプロンプトに渡せるようにする必要があります。

**確認ポイント:**
- pageStructureMatcher.tsでの新規ページ構成の認識
- contentGeneratorService.tsでのテンプレートマッピング
- KnowledgeBasedContentGenerator.tsでの処理フロー

### 2. テンプレートレジストリへの登録
`/app/components/templates/TemplateRegistry.ts` に新しいテンプレートを登録する必要があります。

### 3. Kxxxファイルの更新
既存のKxxxファイルを新しいdetailedContent構造に合わせて更新する必要があります。

**参考:** 思考プロセス①ドキュメントに各テンプレートの必要データ項目が記載されています。

## 📋 重要な概念

### dynamic pageNumber
- INDEXあり: 3ページ目から開始
- INDEXなし: 2ページ目から開始
- 複数ページ対応（コンテンツ量に応じて自動拡張）

### optional要素
- INDEX: あってもなくても良い
- サマリー: あってもなくても良い
- 最小構成: 導入 + メインコンテンツのみ

## 🚀 推奨される次のステップ

1. TemplateRegistryへの新テンプレート登録
2. pageStructureMatcherでの新規ページ構成対応
3. テストケースの作成と動作確認
4. 既存Kxxxファイルの段階的移行

## 📝 参考資料

- `/mnt/c/instagram-course/instagram-post-generator/思考プロセス①_ナレッジ理想形定義のためのフィードバック.md`
- `/mnt/c/instagram-course/instagram-post-generator/Kxxxフォーマットマスタードキュメント.md`

---

作成日: 2025-07-29
作成者: Claude Code
目的: 次世代Claudeへの引き継ぎ