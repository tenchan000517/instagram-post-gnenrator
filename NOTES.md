# Instagram Post Generator - 連絡事項

## 現在の開発状況

### 4. 新テンプレート追加時の必須修正箇所（2025-07-12更新）

新しいテンプレートを追加する際は、以下の全ての箇所を更新する必要があります：

#### 4.1 型定義の更新
**ファイル**: `app/components/templates/TemplateTypes.ts`
- `TemplateType`型に新しいテンプレートタイプを追加
- 例: `export type TemplateType = 'enumeration' | 'list' | '新テンプレート名'`

#### 4.2 テンプレートレジストリの更新
**ファイル**: `app/components/templates/TemplateRegistry.ts`
- `templateRegistry`オブジェクトに新テンプレートのメタデータを追加
- `genreTemplateMapping`に適切なジャンル分類を追加
- 新テンプレートのメタデータで**必須**プロパティ:
  - `keywords: string[]` ← 必須！忘れやすい

#### 4.3 サービスファイルの更新（計3ファイル - 実際使用中のみ）

**✅ 実際に使用中のファイル**:

1. **templateMatchingService.ts**
   - `templateCharacteristics`配列に新テンプレートの特徴を追加
   - `volumeRequirements`オブジェクトに新テンプレートの要件を追加（**両方の関数で**）
   - `getTemplateDisplayName`にRecord<TemplateType, string>対応追加

2. **templateRecommendationService.ts**
   - `ALL_TEMPLATES`配列に追加
   - 各種推奨ロジックに新テンプレートを組み込み
   - `getTemplateComplexityScore`関数に追加
   - `getTemplateDescriptiveText`関数に追加
   - 複数のRecord<TemplateType, ...>オブジェクトに新テンプレート追加

3. **contentLayoutService.ts**
   - `badgeMap`にRecord<TemplateType, string[]>対応追加
   - `mapToTemplateData`に新テンプレート変換ロジック追加

**❌ 不使用（レガシー）ファイル - 更新不要**:
- ~~pureStructureMatchingService.ts~~ - 使用箇所なし
- ~~structureBasedTemplateSelector.ts~~ - 存在しない
- ~~intelligentContentProcessor.ts~~ - 使用箇所なし
- ~~geminiService.ts~~ - 現在のフローで使用されていない
- ~~contentGeneratorService.ts~~ - pageStructureAnalyzer.tsが主要システム

#### 4.4 よくある間違いと注意点

1. **keywordsプロパティの忘れ**: メタデータに`keywords: string[]`を必ず含める
2. **volumeRequirements重複**: templateMatchingService.tsの2箇所で同じキーを定義する
3. **存在しない型参照**: 古いテンプレート名（'story', 'simple2'等）を使わない
4. **暗黙的any型**: パラメータに明示的な型定義を追加（`(item: any)`, `(s: any)`等）
5. **switchケース漏れ**: 各サービスファイルのswitch文に新ケースを追加し忘れない

#### 4.5 テンプレートコンポーネント作成・登録

**新テンプレートファイル作成**:
1. `app/components/templates/NewTemplate.tsx`を作成
2. テンプレートコンポーネントとメタデータをエクスポート
3. 必須プロパティ: `keywords: string[]`を含むメタデータ

**テンプレート登録・インポート**:
1. **app/components/templates/index.ts**
   - 新テンプレートをインポート: `import { NewTemplate } from './NewTemplate'`
   - `templateComponents`オブジェクトに追加: `'new-template': NewTemplate`
   - エクスポートに追加: `export { NewTemplate } from './NewTemplate'`

2. **app/components/templates/TemplateRegistry.ts**
   - メタデータをインポート: `import { newTemplateMetadata } from './NewTemplate'`
   - `templateRegistry`オブジェクトに追加: `'new-template': newTemplateMetadata`

#### 4.6 テンプレート使用・レンダリング箇所

**実際にテンプレートが使用される箇所**:
1. **EditablePostGenerator.tsx** - メイン投稿レンダリング
   - `renderCurrentPage()`: プレビュー表示
   - `renderAllPagesForDownload()`: 画像エクスポート
   
2. **NewFlowController.tsx** - 新フロー生成
   - レイアウト段階でのプレビュー
   - 部分編集後の最終プレビュー

3. **TemplateViewer.tsx** - テンプレート開発・テスト
   - 全テンプレートの表示確認用

4. **TemplateSelectionComponent.tsx** - テンプレート選択UI
   - ユーザー向けテンプレート選択肢表示

#### 4.7 新テンプレート追加後の必須更新箇所（2025-07-13追加）

**新TemplateType追加後に必ず更新が必要な箇所**:

1. **ContentApprovalComponent.tsx**
   - `getTemplateTypeDisplayName`にRecord<TemplateType, string>対応追加

2. **TemplateSelectionComponent.tsx** 
   - `getTemplateDisplayName`と`getTemplateDescription`に新テンプレート追加

3. **TemplateViewer.tsx**
   - サンプルデータオブジェクトに新テンプレート用データ追加
   - templatesArray更新（総数変更）

4. **contentLayoutService.ts**
   - `badgeMap`にRecord<TemplateType, string[]>対応追加
   - `mapToTemplateData`に新テンプレート変換ロジック追加

5. **templateMatchingService.ts**
   - `volumeRequirements`オブジェクト（2箇所）にRecord<TemplateType, ...>対応追加
   - `getTemplateDisplayName`にRecord<TemplateType, string>対応追加

6. **templateRecommendationService.ts**
   - 複数のRecord<TemplateType, ...>オブジェクトに新テンプレート追加
   - `evaluateAllTemplates`のテンプレート配列に追加

**⚠️ 忘れやすい箇所Top3**:
1. TemplateViewer.tsxのサンプルデータ（型エラーで発覚）
2. contentLayoutService.tsのbadgeMap（実行時エラーで発覚）
3. templateMatchingService.tsの2箇所のvolumeRequirements（コンパイルエラーで発覚）

#### 4.8 TypeScript型エラー修正パターン（実例付き）

**基本パターン**:
- `Property 'description' does not exist` → `item.content`または`(item as any).description`を使用
- `Type 'string' is not assignable to type 'ReactNode'` → 型チェック追加: `typeof item === 'string' ? item : item.content`
- `Parameter 's' implicitly has an 'any' type` → `(s: any) =>`で明示的型付け
- `Property 'keywords' is missing` → メタデータに`keywords: string[]`を追加

**新テンプレート追加時特有のエラー**:
- `Property 'new-template' does not exist on type 'Record<TemplateType, ...>'` → 該当オブジェクトに新テンプレートエントリ追加
- `Type '"new-case"' is not comparable to type 'union-type'` → switch文のcaseが型定義に含まれていない → caseを削除または型定義更新
- `Element implicitly has an 'any' type because expression of type 'TemplateType' can't be used to index` → インデックスオブジェクトに新テンプレートキー追加

**Critical Priority実装時の実エラー例**:
```typescript
// ❌ エラー例
app/components/TemplateViewer.tsx(194,16): error TS7053: Element implicitly has an 'any' type because expression of type 'TemplateType' can't be used to index type '{ enumeration: {...}; ... }'.
Property 'title-description-only' does not exist on type ...

// ✅ 解決法
const sampleData = {
  // 既存データ...
  'title-description-only': { title: 'サンプル', description: 'サンプル説明' }
}
```

### 5. ダウンロード時はみ出し問題の解決方法（2025-07-16追加）

**問題**: 独立ボックス構造テンプレートで4個以上のアイテムがある場合、ダウンロード時に画像がビューポートからはみ出し、下部が切れる

**解決済み実装** (`EditablePostGenerator.tsx`のコミット`cf43d48`):

#### 5.1 動的高さ計算の実装
```typescript
// 4個以上のアイテムで高さを動的調整
if (itemCount >= 4) {
  const baseHeight = 280 + (itemCount * 170)
  const extraPadding = itemCount >= 5 ? 50 : 0 // 改行考慮
  const calculatedHeight = `${baseHeight + extraPadding}px`
}
```

#### 5.2 html2canvasオプションの修正
```typescript
// 固定高さ → 実際の要素高さを使用
const actualHeight = element.offsetHeight
const canvas = await html2canvas(element, {
  height: actualHeight, // 899px固定から変更
  overflow: 'visible'   // hiddenからvisibleに変更
})
```

#### 5.3 適用結果
- **4個のアイテム**: 960px（元899px → 収まる）
- **5個のアイテム**: 1180px（元899px → 収まる）
- **6個のアイテム**: 1350px（元899px → 収まる）

#### 5.4 他テンプレートへの応用可能性
この解決方法は以下のテンプレートでも同様の問題が発生する可能性があります：

**⚠️ 注意**: 以下の実装は**ユーザーからの指示があるまで勝手に実装しないこと**

**対象候補テンプレート**:
- `SimpleFiveTemplate` - ステップ数が多い場合
- `section-items` - セクション項目が多い場合  
- `enumeration` - 列挙項目が多い場合
- その他、垂直スクロールが発生する可能性のあるテンプレート

**適用方法**:
1. 各テンプレートのアイテム数を取得する関数を作成
2. `calculateHeight()`でテンプレートタイプ別の高さ計算を追加
3. `html2canvas`で実際の要素高さを使用

### 6. 今後の作業予定
1. 要件定義に基づく新テンプレート実装
2. デバッグラインの削除
3. Gemini呼び出しの復元
4. 文字数制限の実装