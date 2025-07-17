# 🔄 開発ワークフロー（次世代Claude Code専用）

## 🎯 このドキュメントの目的

**情報ギャップを完全に排除**し、セクションが変わってもスムーズに作業を継続できるようにする。

## 📋 必須の開始手順

### Step 1: 現在の状況確認
```bash
# 必ず最初に実行
1. CURRENT_STATUS.md を開く
2. 現在のフェーズを確認
3. 前回の作業内容を把握
4. 次の作業項目を確認
```

### Step 2: 参照資料の確認
```bash
# 情報収集（他のドキュメントは参照しない）
1. REFERENCE_MATERIALS/SYSTEM_OVERVIEW.md
2. REFERENCE_MATERIALS/TECHNICAL_SPECIFICATIONS.md
3. 担当ジャンルのワークスペース内資料
```

### Step 3: 作業ディレクトリの確認
```bash
# 作業場所の確認
cd dev/genre-optimization-workspace/
ls -la GENRE_WORKSPACES/
```

## 🔄 開発フェーズ別フロー

### Phase 1: 環境整備フェーズ

#### 目標
- 作業環境の完全セットアップ
- 必要な資料の集約
- 検証ツールの準備

#### 作業手順
```bash
1. 専用ワークスペースの作成 ✅
2. 参照資料の集約 ✅
3. 開発フローの確立 ← 現在ここ
4. 検証ツールの準備
```

#### 完了条件
- [ ] 全ての参照資料が集約済み
- [ ] 開発フローが確立済み
- [ ] 検証ツールが準備済み

### Phase 2: ジャンル別最適化設計フェーズ

#### 目標
- 各ジャンルの最適なページ構成を決定
- 推奨テンプレートの具体的な配分を決定
- フォーマッター入力の最適化

#### 作業手順（各ジャンル）
```bash
1. ジャンルの特性分析
   - 表現意図の明確化
   - ユーザーニーズの把握
   - 既存問題の分析

2. テンプレート選択戦略の策定
   - 推奨テンプレートの決定
   - 使用率の目標設定
   - 避けるべきテンプレートの特定

3. 具体的なページ構成の設計
   - 4-8ページの最適構成
   - 各ページのテンプレート指定
   - コンテンツ特性の定義

4. 設計書の作成
   - 詳細な設計ドキュメント
   - 実装指針
   - テストケース
```

#### 完了条件
- [ ] 全5ジャンルの設計完了
- [ ] 具体的なテンプレート配分決定
- [ ] 実装可能な設計書作成

### Phase 3: システム実装フェーズ

#### 目標
- PageStructureAnalyzer.tsの修正
- genre.tsの拡張
- templateStructureDefinitions.tsの更新

#### 作業手順
```bash
1. 影響範囲の事前確認
   - 修正対象ファイルの確認
   - 依存関係の把握
   - テストケースの準備

2. 段階的実装
   - genre.ts拡張（ジャンル特性追加）
   - templateStructureDefinitions.ts更新
   - pageStructureAnalyzer.ts修正

3. 各段階での検証
   - TypeScriptコンパイル確認
   - 単体テスト実行
   - 統合テスト実行
```

#### 完了条件
- [ ] 全ての修正が完了
- [ ] TypeScriptエラーなし
- [ ] 基本動作確認済み

### Phase 4: テストと検証フェーズ

#### 目標
- 各ジャンルでのテンプレート選択テスト
- 全体動作確認
- パフォーマンス検証

#### 作業手順
```bash
1. テンプレート選択精度テスト
   - 各ジャンルの代表的入力でテスト
   - 期待テンプレート選択率の確認
   - section-items使用率の検証

2. 全体動作確認
   - 16テンプレートの動作確認
   - 編集機能の動作確認
   - 画像生成機能の確認

3. パフォーマンス検証
   - 応答時間の測定
   - メモリ使用量の確認
   - エラー発生率の監視
```

#### 完了条件
- [ ] 全テストケースが合格
- [ ] 品質指標が目標値を達成
- [ ] 本番環境での動作確認済み

## 🎯 各セクションでの作業指針

### 新しいセクション開始時の手順

#### 1. 状況確認（必須）
```bash
# 必ず最初に実行
1. CURRENT_STATUS.md を開く
2. 前回の作業内容を確認
3. 現在のフェーズを把握
4. 次の作業項目を確認
```

#### 2. 必要な情報の収集
```bash
# このワークスペース内のみ参照
1. REFERENCE_MATERIALS/ の該当資料
2. 担当ジャンルのワークスペース
3. IMPLEMENTATION_GUIDES/ の該当ガイド
```

#### 3. 作業の実行
```bash
# 段階的な作業実行
1. 小さな単位での作業
2. 各段階での確認
3. 問題発生時の即座対応
```

#### 4. 進捗の記録
```bash
# 必ず記録
1. CURRENT_STATUS.md の更新
2. 作業ログの記録
3. 問題点の記録
4. 次の作業項目の更新
```

### 情報参照の原則

#### ✅ 参照すべき情報源
```bash
# このワークスペース内のみ
- REFERENCE_MATERIALS/
- GENRE_WORKSPACES/
- IMPLEMENTATION_GUIDES/
- VALIDATION_TOOLS/
- TESTING/
```

#### ❌ 参照してはいけない情報源
```bash
# 関係ないドキュメント
- docs/ 配下の他のドキュメント
- dev/ 配下の他のプロジェクト
- 古いバージョンの計画書
- 未確認の技術仕様
```

### エラー対応の原則

#### 1. 情報の再確認
```bash
# エラー発生時の対応
1. CURRENT_STATUS.md で状況確認
2. REFERENCE_MATERIALS/ で技術仕様確認
3. VALIDATION_TOOLS/ で検証実行
```

#### 2. 段階的なロールバック
```bash
# 問題解決の手順
1. 最小限の修正で解決を試行
2. 部分的なロールバック
3. 必要に応じて全体ロールバック
```

#### 3. 問題の記録
```bash
# 必ず記録
1. 問題の詳細な記録
2. 解決方法の記録
3. 予防策の記録
```

## 🔧 実装時の注意事項

### 修正対象ファイル

#### 1. app/services/pageStructureAnalyzer.ts
```typescript
// 修正箇所（76-134行）
【テンプレート選択指針】
// ここを修正する
```

#### 2. app/lib/genre.ts
```typescript
// 拡張箇所
export interface GenreConfig {
  // 既存設定
  optimalItemRange: { min: number; max: number }
  
  // 新規追加
  primaryTemplates: TemplateType[]
  secondaryTemplates: TemplateType[]
  avoidTemplates: TemplateType[]
  characteristicKeywords: string[]
  expressionIntent: string
}
```

#### 3. app/services/contentGeneratorService.ts
```typescript
// 修正箇所
convertToTemplateData(content: any, templateType: TemplateType): TemplateData
```

### 危険な修正パターン（絶対禁止）

#### 1. templateMatchingService.ts
```bash
# 理由: UI表示専用のため修正は慎重に
# 実際の選択はPageStructureAnalyzerが行う
```

#### 2. 型定義の安易な変更
```typescript
// ❌ 危険
export type TemplateType = 'new-type' | 'enumeration' | ...

// ✅ 安全
export type TemplateType = 'enumeration' | ... | 'new-template'
```

### 品質確保のチェックポイント

#### 実装前チェック
- [ ] 影響範囲の確認
- [ ] 依存関係の確認
- [ ] テストケースの準備

#### 実装中チェック
- [ ] TypeScriptエラーの確認
- [ ] 単体テストの実行
- [ ] 段階的な動作確認

#### 実装後チェック
- [ ] 全体動作の確認
- [ ] パフォーマンスの確認
- [ ] エラーハンドリングの確認

## 📊 成功指標

### 定量的指標
- **テンプレート選択精度**: > 80%
- **section-items使用率**: < 30%
- **AI生成成功率**: > 95%
- **UI応答性**: < 500ms

### 定性的指標
- **ジャンル特性の反映**: 各ジャンルの特性が明確に反映される
- **テンプレート多様性**: 複数のテンプレートが適切に使用される
- **ユーザー体験**: 直感的で使いやすいインターフェース

## 🎯 最終確認事項

### 完了時の必須チェック
```bash
1. 全ての修正が完了している
2. TypeScriptエラーがない
3. 全テストケースが合格
4. CURRENT_STATUS.md が更新済み
5. 次の作業項目が明確
```

### 引き継ぎ時の必須事項
```bash
1. CURRENT_STATUS.md の詳細更新
2. 作業ログの完全記録
3. 問題点と解決方法の記録
4. 次の作業担当者への明確な指示
```

---

**⚠️ 重要**: このワークフローに厳密に従うことで、情報ギャップを完全に排除し、高品質な実装を実現できます。