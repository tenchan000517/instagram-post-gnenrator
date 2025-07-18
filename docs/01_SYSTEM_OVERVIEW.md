# 01. Instagram投稿生成システム - システム概要とアーキテクチャ

## 🎯 システムの目的とビジョン

Instagram投稿生成システムは、キャリア・就活・インターンジャンルに特化したコンテンツを、**複数のテンプレートパターンで自動生成**する高度なAI統合システムです。

### コアビジョン
- **100点ルール**: 完璧なマッチング以外は全て改善対象
- **ジャンル特化**: 7つの専門ジャンルでの最適化
- **テンプレート多様性**: 16種類の表現パターン
- **AI駆動**: 5段階のAI統合による高品質生成

## 🏗️ システムアーキテクチャ概要

### 完全システムフロー（実装済み）
```
【段階0: テーマ選択・フォーマッター】
ResearchFormatter.tsx (/app/research-formatter/page.tsx)
┣━ 7ジャンル選択UI: knowhow, strategy, book-recommendation等
┣━ AI呼び出し1: geminiClientSingleton.ts経由でジャンル特化フォーマット変換
┗━ LocalStorage + URLパラメータ連携

【段階1: メイン受け取り】
ContentInput.tsx (/app/components/ContentInput.tsx)
┣━ URLパラメータ検出: new URLSearchParams().get('input')
┣━ LocalStorage検出: localStorage.getItem('formatted_content')
┗━ 【ジャンル】: xxx 付きテキスト確定

【段階2: ページ構造分析】
PageStructureAnalyzer.ts (/app/services/pageStructureAnalyzer.ts)
┣━ extractGenreFromInput(): 【ジャンル】パターンマッチング
┣━ GenreDetector.detectGenre(): 自動判定またはユーザー指定優先
┣━ AI呼び出し2: ジャンル特化ページ構造分析 + テンプレート選択指針
┗━ PageStructure[]出力: 各ページのtemplate, title, theme

【段階3: 構造制約生成】
StructureConstrainedGenerator.ts (/app/services/structureConstrainedGenerator.ts)
┣━ TemplateStructureDefinitions.generateStructurePrompt(): 16テンプレート構造要件
┣━ AI呼び出し3: 決定済み構造 + テンプレート制約下での一括コンテンツ生成
┗━ parseGeneratedJSON(): 堅牢なJSON解析

【段階4: データ変換・補助生成】
ContentGeneratorService.ts (/app/services/contentGeneratorService.ts)
┣━ convertToTemplateData(): AI動的フィールド → テンプレート固定フィールド
┣━ AI呼び出し4: Instagram最適化キャプション生成
┣━ AI呼び出し5: カテゴリ別ハッシュタグ生成
┗━ GeneratedContent最終完成

【段階5: UI表示・ダウンロード】
EditablePostGenerator.tsx + BulkDownloadService.ts
┣━ 16テンプレートコンポーネント動的選択・表示
┣━ html2canvas: HTML要素 → PNG画像変換（850x899px）
┣━ JSZip: 複数ページZIP圧縮
┗━ キャプション・ハッシュタグファイル付きダウンロード
```

### アーキテクチャの特徴

#### 1. **分離されたコンポーネント設計**
- **フォーマッター**: 独立したリサーチデータ最適化
- **メインシステム**: コア生成エンジン
- **UI層**: 表示・編集専用レイヤー

#### 2. **段階的データ変換**
- **段階1**: 生テキスト → 構造化テキスト
- **段階2**: 構造化テキスト → ページ構造定義
- **段階3**: ページ構造 → 構造制約コンテンツ
- **段階4**: 生成コンテンツ → テンプレートデータ
- **段階5**: テンプレートデータ → UI表示

#### 3. **AI統合の5段階（完全実装済み）**
1. **フォーマッター**: ResearchFormatter → geminiClientSingleton → ジャンル特化フォーマット変換
2. **構造分析**: PageStructureAnalyzer → Gemini API → ページ構造・テンプレート選択
3. **一括生成**: StructureConstrainedGenerator → Gemini API → 構造制約下コンテンツ生成
4. **キャプション**: ContentGeneratorService → Gemini API → Instagram最適化キャプション
5. **ハッシュタグ**: ContentGeneratorService → Gemini API → カテゴリ別ハッシュタグ生成

**Gemini設定** (geminiClientSingleton.ts):
- model: 'gemini-2.0-flash-lite'
- temperature: 0.7, topP: 0.8, topK: 40, maxOutputTokens: 8192

## 🧩 主要コンポーネント詳細

### Core Services（システム中核）

#### 1. PageStructureAnalyzer
- **役割**: 実際のテンプレート選択を行うシステムの心臓部
- **処理**: ジャンル判定 → AI分析 → テンプレート決定
- **重要度**: Critical（10/10）
- **影響範囲**: システム全体のテンプレート選択

#### 2. ContentGeneratorService
- **役割**: 2段階フローによる高品質コンテンツ生成統合
- **処理**: ページ構造分析 → 構造制約生成 → データ変換
- **重要度**: Critical（10/10）
- **影響範囲**: メインフロー全体

#### 3. StructureConstrainedGenerator
- **役割**: 決定済み構造への100%適合コンテンツ生成
- **処理**: テンプレート構造要件 → AI一括生成 → JSON解析
- **重要度**: High（9/10）
- **影響範囲**: コンテンツ品質

#### 4. EditablePostGenerator
- **役割**: 16テンプレート統合編集UI
- **処理**: 動的テンプレート選択 → 編集機能 → ダウンロード
- **重要度**: Critical（10/10）
- **影響範囲**: ユーザー体験

### Template System（表現エンジン）

#### テンプレート分類
1. **リスト系**: enumeration, list, checklist-enhanced
2. **セクション系**: section-items, two-column-section-items
3. **ステップ系**: simple5, simple6, simple3
4. **データ系**: table, ranking, graph
5. **コンテンツ系**: explanation2, title-description-only
6. **特殊系**: index, item-n-title-content, single-section-no-items

#### エディター対応（完全実装済み）
- **実装完了**: 16/16 テンプレート（100%）
- **専用エディター**: 14種類の専用エディターが/app/components/editors/に実装済み
- **動的フィールド**: ItemNTitleContentEditor, ChecklistEnhancedEditor等
- **統合**: EditablePostGenerator.tsxに全エディター統合済み
- **リアルタイム**: 即座のプレビュー更新と品質検証

### Genre System（ジャンル最適化）

#### 7つの専門ジャンル
1. **knowhow**: ノウハウ・テクニック共有
2. **strategy**: 面接・ES・試験対策
3. **book-recommendation**: 書籍紹介・レビュー
4. **industry-features**: 業界特徴・データ分析
5. **internship-deadline**: インターン応募期限
6. **entry-deadline**: 本選考応募期限
7. **step-learning**: 段階的学習ガイド

#### ジャンル最適化要素
- **キーワード**: 自動判定精度向上
- **項目数**: ジャンル別最適範囲
- **テンプレート親和性**: 推奨テンプレートパターン

## 🔧 技術スタック詳細

### フロントエンド
- **React 18**: 最新のHooks、Concurrent Features
- **Next.js 14**: App Router、Server Components
- **TypeScript 5**: 厳密な型安全性
- **Tailwind CSS**: ユーティリティファースト
- **Lucide React**: 一貫したアイコンシステム

### AI・データ処理
- **Gemini 2.0 Flash**: Google最新AI モデル
- **カスタムプロンプト**: ジャンル・テンプレート特化
- **JSON Schema**: 構造化応答の保証
- **Fallback システム**: 堅牢なエラー処理

### 開発・ビルド
- **ESLint**: コード品質保証
- **Prettier**: コードフォーマット統一
- **Git**: バージョン管理
- **VS Code**: 開発環境最適化

## 📊 データフロー概観

### 入力データの変遷
```typescript
// 段階1: 生入力
string: "【ジャンル】: strategy\n志望動機が見つからない！..."

// 段階2: 構造分析結果
PageStructure[]: [
  { template: "section-items", title: "自己分析徹底攻略", theme: "..." }
]

// 段階3: 生成コンテンツ
GeneratedPage[]: [
  { templateType: "section-items", content: { title: "...", sections: [...] } }
]

// 段階4: テンプレートデータ
TemplateData: {
  title: "自己分析で「自分軸」を発見！",
  sections: [{ title: "過去の経験を棚卸し", content: "...", items: [...] }]
}

// 段階5: UI要素
JSX.Element: <SectionItemsTemplate templateData={...} />
```

### 型安全性の保証
- **コンパイル時**: TypeScript型チェック
- **実行時**: 型ガードによる検証
- **AI応答**: JSON Schema バリデーション
- **フォールバック**: デフォルト値による安全性

## 🚨 重要な設計原則

### 1. 100点ルール
**「100点じゃないものは全てテンプレートが存在しない」**
- structureScore = 1.0 → 完璧なマッチ → 適切なテンプレート
- structureScore < 1.0 → 改善対象
- 妥協禁止、専用テンプレート作成を優先

### 2. 蝶の羽ばたき効果への配慮
- **一行の修正**: システム全体への波及を常に意識
- **型定義変更**: 49ファイルへの影響
- **テンプレート追加**: 16ファイルの同期更新

### 3. AI統合の品質保証
- **プロンプトエンジニアリング**: ジャンル・テンプレート特化
- **構造制約**: 100%適合を保証
- **多段階検証**: 5回のAI呼び出しで品質向上

### 4. 拡張性の確保
- **新テンプレート**: 明確な追加手順
- **新ジャンル**: 設定ベースの追加
- **新機能**: コンポーネント分離による安全な拡張

## 🎯 システムの強み

### 技術的強み
1. **完全な型安全性**: TypeScript + 実行時検証
2. **AI統合の堅牢性**: 多段階フォールバック
3. **コンポーネント分離**: 疎結合な設計
4. **拡張性**: 明確な拡張パターン

### 機能的強み
1. **16テンプレート**: 豊富な表現パターン
2. **7ジャンル特化**: 専門性の高い最適化
3. **リアルタイム編集**: 即座のフィードバック
4. **品質保証**: 100点ルールによる妥協なし

### 運用的強み
1. **保守性**: 明確なアーキテクチャ
2. **デバッグ性**: 段階的な問題特定
3. **パフォーマンス**: 最適化されたレンダリング
4. **スケーラビリティ**: 負荷分散対応

## 🎯 システム実装状況

### 完全実装済み機能
- **✅ テーマ選択**: 7ジャンル対応ResearchFormatterシステム
- **✅ 5段階AI統合**: Gemini API 5回呼び出しフロー
- **✅ 16テンプレートシステム**: 全テンプレート + 専用エディター
- **✅ 画像生成・ダウンロード**: html2canvas + JSZip高度システム
- **✅ キャプション・ハッシュタグ**: 自動生成・再生成機能
- **✅ UI統合**: EditablePostGenerator完全統合

### 主要ファイルパス
```
メインフロー:
/app/page.tsx → NewFlowPostGenerator.tsx
/app/research-formatter/page.tsx → ResearchFormatter.tsx

AI統合:
/app/services/geminiClientSingleton.ts
/app/services/contentGeneratorService.ts
/app/services/pageStructureAnalyzer.ts
/app/services/structureConstrainedGenerator.ts

テンプレート:
/app/components/templates/*.tsx (16ファイル)
/app/components/editors/*.tsx (14専用エディター)
/app/services/templateStructureDefinitions.ts

ダウンロード:
/app/services/bulkDownloadService.ts
```

---

このシステム概要により、Instagram投稿生成システムの**全体像**、**設計思想**、**技術的基盤**を完全に理解できます。次の「02_COMPLETE_DATA_FLOW.md」で、具体的なデータ変換プロセスを詳細に学習してください。