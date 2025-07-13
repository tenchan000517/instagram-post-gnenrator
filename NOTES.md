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

#### 4.3 サービスファイルの更新（計7ファイル）

1. **pureStructureMatchingService.ts**
   - `structurePatterns`配列に新パターンを追加
   - パターン内で使用する型を`TemplateType`に合わせる

2. **structureBasedTemplateSelector.ts**
   - 構造解析ロジックで新テンプレートタイプを返すケースを追加

3. **templateMatchingService.ts**
   - `templateCharacteristics`配列に新テンプレートの特徴を追加
   - `volumeRequirements`オブジェクトに新テンプレートの要件を追加（**両方の関数で**）

4. **intelligentContentProcessor.ts**
   - `selectOptimalTemplateType`関数のswitchケースに追加
   - `generateTemplateData`関数のswitchケースに追加
   - `getContentTypeDescription`関数のswitchケースに追加
   - `getContentTypeKeyword`関数のswitchケースに追加

5. **geminiService.ts**
   - プロンプト生成時のテンプレート選択肢に追加

6. **contentGeneratorService.ts**
   - テンプレート判定ロジックに新テンプレートを追加

7. **templateRecommendationService.ts**
   - `ALL_TEMPLATES`配列に追加
   - 各種推奨ロジックに新テンプレートを組み込み
   - `getTemplateComplexityScore`関数に追加
   - `getTemplateDescriptiveText`関数に追加

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

### 5. 今後の作業予定
1. 要件定義に基づく新テンプレート実装
2. デバッグラインの削除
3. Gemini呼び出しの復元
4. 文字数制限の実装