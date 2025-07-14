# 👨‍💻 開発担当者向け作業ガイド

## 🚀 はじめに

このガイドは、Instagram投稿生成システムのジャンル別最適化プロジェクトに参加する開発担当者向けの包括的な作業指南書です。

## 📂 作業環境の理解

### devディレクトリ構成
```
dev/
├── README.md                           # プロジェクト概要
├── DEVELOPER_GUIDE.md                  # このファイル
├── planning-documents/                 # 📋 計画書・設計書
│   ├── GENRE_OPTIMIZATION_PLAN.md     # 実装計画書
│   ├── GENRE_OPTIMIZATION_PROMPTS.md  # プロンプト集
│   └── GENRE_PLOT_DESIGNS.md          # プロット設計書
├── research-prompts/                   # 🔬 リサーチプロンプト
├── test-cases/                         # 🧪 テストケース
├── template-tests/                     # 📐 テンプレート検証
└── validation-reports/                 # 📊 検証レポート
```

### 🎯 プロジェクトの目標
**「各ジャンルで100%キレイなレイアウトを実現する」**

## 🔄 開発フロー

### Phase 1: 基本実装（3-5日）
```mermaid
graph LR
    A[ジャンル定義] --> B[判定ロジック]
    B --> C[Analyzer拡張]
    C --> D[項目数最適化]
    D --> E[テスト]
```

### Phase 2: 高度化（5-7日）
```mermaid
graph LR
    A[ML判定] --> B[動的調整]
    B --> C[A/Bテスト]
    C --> D[フィードバック]
    D --> E[自動最適化]
```

## 📋 作業手順

### 1. 事前準備
```bash
# 作業ディレクトリに移動
cd dev/

# 計画書を確認
cat planning-documents/GENRE_OPTIMIZATION_PLAN.md

# プロット設計を確認
cat planning-documents/GENRE_PLOT_DESIGNS.md
```

### 2. 実装作業
```bash
# 新しいブランチを作成
git checkout -b feature/genre-optimization

# 実装ファイルの作成
mkdir -p ../app/types
mkdir -p ../app/services
```

### 3. 検証作業
```bash
# テストケースの実行
cd test-cases/

# リサーチプロンプトのテスト
cd ../research-prompts/
```

### 4. テンプレート最適化
```bash
# テンプレートビューワーでの確認
npm run dev
# localhost:3000/template-viewer にアクセス

# レイアウトのスクリーンショット保存
cd template-tests/screenshots/
```

## 🧪 検証方法

### 1. リサーチプロンプトの検証
```bash
# 各ジャンルのプロンプトを確認
ls research-prompts/

# 実際にAIでテスト実行
# 結果をtest-cases/output/に保存
```

### 2. 生成システムの検証
```bash
# システムで実際に生成
# 結果をtest-cases/validation/に保存
```

### 3. テンプレートレイアウトの検証
```bash
# テンプレートビューワーで確認
# ダウンロード機能でスクリーンショット保存
# template-tests/screenshots/に保存
```

## 📊 品質基準

### 最低基準
- [ ] 基本機能が動作する
- [ ] 致命的なエラーがない
- [ ] 文字数制限を守る

### 目標基準
- [ ] 期待テンプレートが選択される
- [ ] レイアウトが整っている
- [ ] ユーザビリティが良い

### 理想基準
- [ ] structureScore 1.0達成
- [ ] 100%キレイなレイアウト
- [ ] 完璧なユーザー体験

## 🔧 開発に必要なスキル

### 必須スキル
- TypeScript/JavaScript
- React/Next.js
- 基本的なCSS/Tailwind CSS

### 推奨スキル
- html2canvas の知識
- AI/機械学習の基礎知識
- テスト駆動開発

### 学習リソース
- [計画書](planning-documents/GENRE_OPTIMIZATION_PLAN.md)
- [プロンプト集](planning-documents/GENRE_OPTIMIZATION_PROMPTS.md)
- [プロット設計](planning-documents/GENRE_PLOT_DESIGNS.md)

## 🐛 トラブルシューティング

### よくある問題と解決策

#### 1. テンプレート選択が期待と異なる
```typescript
// app/services/pageStructureAnalyzer.ts を確認
// ジャンル判定ロジックを調整
```

#### 2. レイアウトが崩れる
```typescript
// 文字数制限をチェック
// テンプレートの characterLimits を確認
```

#### 3. 項目数が最適化されない
```typescript
// app/services/itemCountOptimizer.ts を確認
// 各ジャンルの optimalItemRange を調整
```

## 📝 コミット規約

### コミットメッセージ形式
```
type(scope): description

feat(genre): add genre detection logic
fix(template): fix layout overflow issue
docs(dev): update developer guide
test(validation): add test cases for knowhow genre
```

### コミットタイプ
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `test`: テスト
- `refactor`: リファクタリング
- `style`: スタイル修正

## 🤝 コラボレーション

### コードレビュー
- 機能実装後はプルリクエストを作成
- 最低1人の承認が必要
- テストケースの実行結果を含める

### 問題報告
- GitHubのIssueを活用
- 再現手順を明確に記載
- スクリーンショットを含める

### 知識共有
- 発見した問題と解決策を documentation に記録
- 新しいベストプラクティスを shared-knowledge に追加

## 📈 進捗管理

### 日次作業
- [ ] 作業開始前に最新のmainブランチを取得
- [ ] 作業終了後にコミット・プッシュ
- [ ] 進捗をSlack/Discordで報告

### 週次作業
- [ ] 週次進捗レポートの作成
- [ ] 来週の作業計画の策定
- [ ] 問題点の整理と解決策の検討

## 🎯 成功指標

### 短期目標（1-2週間）
- [ ] Phase 1の実装完了
- [ ] 基本的な検証の実施
- [ ] 主要な問題の特定と解決

### 中期目標（3-4週間）
- [ ] Phase 2の実装完了
- [ ] 全ジャンルでの検証完了
- [ ] レイアウト最適化の完了

### 長期目標（1-2ヶ月）
- [ ] structureScore 1.0達成率95%
- [ ] ユーザー満足度の向上
- [ ] 継続的改善システムの構築

## 💡 ベストプラクティス

### コード品質
- 型安全性を重視
- 適切なエラーハンドリング
- 読みやすいコード構造

### 検証作業
- 常に実際のデータでテスト
- 複数のジャンルで検証
- エッジケースも考慮

### ドキュメント
- 発見した問題は必ず記録
- 解決策は他の開発者と共有
- 継続的にガイドを更新

## 🔗 関連リソース

### プロジェクト関連
- [メインREADME](../README.md)
- [実装計画書](planning-documents/GENRE_OPTIMIZATION_PLAN.md)
- [プロンプト集](planning-documents/GENRE_OPTIMIZATION_PROMPTS.md)

### 技術関連
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### 検証関連
- [検証テンプレート](test-cases/validation-template.md)
- [品質基準](test-cases/quality-standards.md)

---

**開発チームで力を合わせて、最高品質のシステムを作り上げましょう！** 🚀

作成日: 2025-01-14
更新日: 2025-01-14
作成者: Claude AI Assistant