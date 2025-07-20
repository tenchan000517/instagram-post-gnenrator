# Instagram Post Generator - 開発ナレッジベース

## 🎯 このドキュメントの役割

**開発段階横断のナレッジ集約**: システム開発で蓄積された重要な発見・解決方法・注意事項・ベストプラクティスを記録。進捗管理ではなく、技術的知見の継承を目的とする。

---

## 🔥 最重要ナレッジ（必読）

### 1. システムフロー理解の必須事項

**🚨 重要**: システム修正前には必ずフローを理解してください：

**参照ドキュメント**: 
- `docs/system-flow-analysis.md` - システム全体構造（理解用）
- `docs/complete-system-flow.md` - **完全フロー解明書（作業用・必読）**

**重要な理由**:
- **蝶の羽ばたき効果**: 一行の修正がシステム全体に波及
- **5回のAI呼び出し**: フォーマッターから最終表示までの複雑フロー
- **データフロー連携**: URLパラメータ、LocalStorage の詳細な連携
- **脆弱性の理解**: システムの弱点と修正時の注意点

### 2. テンプレート選択メカニズムの真実

**🔥 最重要発見**: 実際のテンプレート選択は `PageStructureAnalyzer` で行われる

**よくある誤解**: 
- ❌ `templateMatchingService.ts` がテンプレート選択を行う
- ✅ `templateMatchingService.ts` は **UI表示のみ**

**実際の動作**:
- **実際の選択**: `app/services/pageStructureAnalyzer.ts` の110-113行目
- **新テンプレート追加時**: 必ず `PageStructureAnalyzer` のプロンプトに追加必須
- **UI表示**: `templateMatchingService` は表示・推奨のみ

### 3. 100点ルール設計思想

**核心理念**: 「100点じゃないものは全てテンプレートが存在しない」

**実践原則**:
- `structureScore = 1.0` → 完璧なマッチ → 適切なテンプレート存在 ✅
- `structureScore < 1.0` → 部分的マッチ → 専用テンプレートが不足 ❌
- **妥協は品質劣化** → 100点未満は全て改善対象

---

## 🛠️ テンプレート開発ナレッジ

### 新テンプレート追加時の必須修正箇所

新しいテンプレートを追加する際は、以下の**全ての箇所**を更新する必要があります：

#### 1. 型定義の更新（必須）
**ファイル**: `app/components/templates/TemplateTypes.ts`
```typescript
export type TemplateType = 'enumeration' | 'list' | '新テンプレート名'
```

#### 2. テンプレートレジストリの更新（必須）
**ファイル**: `app/components/templates/TemplateRegistry.ts`
- `templateRegistry` オブジェクトにメタデータ追加
- **必須プロパティ**: `keywords: string[]` ← 忘れやすい！

#### 3. サービスファイルの更新（3ファイル）

**✅ 実際に使用中のファイル**:

1. **templateMatchingService.ts**
   - `templateCharacteristics` 配列に特徴追加
   - `volumeRequirements` オブジェクト（**2箇所**）に要件追加
   - `getTemplateDisplayName` にRecord対応追加

2. **templateRecommendationService.ts**
   - `ALL_TEMPLATES` 配列に追加
   - 複数のRecord<TemplateType, ...>オブジェクトに追加
   - 各種推奨ロジックに組み込み

3. **contentLayoutService.ts**
   - `badgeMap` にRecord対応追加
   - `mapToTemplateData` に変換ロジック追加

#### 4. コンポーネント更新（5箇所）

**忘れやすい箇所Top3**:
1. **TemplateViewer.tsx** のサンプルデータ（型エラーで発覚）
2. **contentLayoutService.ts** のbadgeMap（実行時エラーで発覚）
3. **templateMatchingService.ts** の2箇所のvolumeRequirements（コンパイルエラーで発覚）

### 意図的テンプレート選択ナレッジ

**🔥 重要発見**: 入力テキストでテンプレートを意図的に選択可能

**実証済みキーワード**:
- **enumeration**: 「①②③」「ステップ」「手順」「段階」
- **ranking**: 「ランキング」「1位」「2位」「位」「ワースト」「ベスト」
- **simple3**: 「対比」「比較」「VS」「良い」「悪い」「OK」「NG」
- **section-items**: 「体験」「ストーリー」「事例」「実際に」「経験」
- **graph**: 「グラフ」「円グラフ」「棒グラフ」「統計」「データ」「割合」

**活用方法**:
- フォーマッター段階でのキーワード埋め込みが効果的
- ユーザーガイドで意図したテンプレート選択を支援

---

## 🚨 重要な未解決問題

### INDEXページと実際のページ内容の不一致

**問題の本質**:
- **INDEXページ**: AIが入力テキストから推測した「理想的な構成」
- **実際のページ**: 入力テキストの具体的な内容
- **結果**: INDEXに「自己分析」「ES書き方」等が表示されるが、実際は「プレゼンテーション技術」のページ

**現在の動作メカニズム**:
- `PageStructureAnalyzer` が入力テキストを分析
- AIが入力内容から「理想的な全体構成」を推測
- 実際のページ生成とは独立して動作

**解決方針（優先度順）**:
1. **フォーマッター改善**: 入力テキストでINDEX構成を明示的に指定
2. **動的連携**: 生成されたページ内容を基にINDEXを更新
3. **テンプレート選択ロジック調整**: INDEXページ生成条件の見直し

---

## 🔧 技術的解決方法・ベストプラクティス

### ダウンロード時はみ出し問題の解決方法

**問題**: 独立ボックス構造テンプレートで4個以上のアイテムがある場合、ダウンロード時に画像下部が切れる

**解決済み実装**:
```typescript
// 動的高さ計算
if (itemCount >= 4) {
  const baseHeight = 280 + (itemCount * 170)
  const extraPadding = itemCount >= 5 ? 50 : 0
  const calculatedHeight = `${baseHeight + extraPadding}px`
}

// html2canvasオプション修正
const actualHeight = element.offsetHeight
const canvas = await html2canvas(element, {
  height: actualHeight, // 固定値から実際の高さに変更
  overflow: 'visible'   // hiddenからvisibleに変更
})
```

**他テンプレートへの応用可能性**:
- `SimpleFiveTemplate` - ステップ数が多い場合
- `section-items` - セクション項目が多い場合
- `enumeration` - 列挙項目が多い場合

### TypeScript型エラー修正パターン

**基本パターン**:
- `Property 'description' does not exist` → `item.content` または `(item as any).description` を使用
- `Type 'string' is not assignable to type 'ReactNode'` → 型チェック追加
- `Parameter 's' implicitly has an 'any' type` → `(s: any) =>` で明示的型付け
- `Property 'keywords' is missing` → メタデータに `keywords: string[]` を追加

**新テンプレート追加時特有のエラー**:
- `Property 'new-template' does not exist on type 'Record<TemplateType, ...>'` → 該当オブジェクトに新テンプレートエントリ追加
- `Element implicitly has an 'any' type` → インデックスオブジェクトに新テンプレートキー追加

---

## 📂 システムアーキテクチャナレッジ

### ファイル使用状況の整理

**✅ 実際に使用中のファイル**:
- `pageStructureAnalyzer.ts` - 主要システム・実際のテンプレート選択
- `templateMatchingService.ts` - UI表示・推奨表示
- `templateRecommendationService.ts` - 推奨ロジック
- `contentLayoutService.ts` - レイアウト変換

**❌ 不使用（レガシー）ファイル**:
- `pureStructureMatchingService.ts` - 使用箇所なし
- `structureBasedTemplateSelector.ts` - 存在しない
- `intelligentContentProcessor.ts` - 使用箇所なし
- `geminiService.ts` - 現在のフローで使用されていない
- `contentGeneratorService.ts` - pageStructureAnalyzer.ts が主要

### テンプレート使用・レンダリング箇所

**実際にテンプレートが使用される箇所**:
1. **EditablePostGenerator.tsx** - メイン投稿レンダリング
2. **NewFlowController.tsx** - 新フロー生成
3. **TemplateViewer.tsx** - テンプレート開発・テスト
4. **TemplateSelectionComponent.tsx** - ユーザー向けテンプレート選択肢表示

---

## 🎯 次世代開発者への重要指針

### 作業優先度
1. **INDEXページ問題の解決を最優先**に対応
2. **テンプレート選択メカニズムの完全理解**が必須
3. **`PageStructureAnalyzer` が実際の選択箇所**であることを常に意識

### 修正時の注意事項
1. **`templateMatchingService.ts` の修正は慎重**に（UI表示への影響）
2. **新テンプレート追加時は必ず `PageStructureAnalyzer` のプロンプト更新**
3. **システムフロー理解なしに修正しない**（蝶の羽ばたき効果）

### 技術的課題（緊急度高）
- **INDEXページとコンテンツの一貫性確保**（ユーザー体験に直結）
- **テンプレート選択の予測可能性向上**（コンテンツ品質に直結）
- **編集機能の完全実装**（機能完成度に直結）

---

## 📋 要調査事項

### 不明確な箇所（今後の調査対象）

1. **INDEXページ生成の詳細ロジック**:
   - `PageStructureAnalyzer` がINDEXを推測生成するメカニズム
   - 入力テキストから「理想的な構成」を導出する基準

2. **フォーマッター改善の具体的実装**:
   - 入力テキストでINDEX構成を明示的に指定する方法
   - AIプロンプトへの構成指示の反映方法

3. **動的連携の実装可能性**:
   - 生成されたページ内容を基にINDEXを更新する技術的課題
   - パフォーマンスへの影響

---

**最終更新**: 2025-07-20  
**文書種別**: 開発ナレッジベース  
**対象**: 全開発者・次世代継承者