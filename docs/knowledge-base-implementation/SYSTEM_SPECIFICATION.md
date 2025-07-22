# ナレッジベース統合システム 技術仕様書

## 📋 システム概要

### 目的
TypeID×TargetID×ThemeIDの組み合わせから厳密なページ構成パターンをマッチングし、テンプレート項目への具体的内容抽出を行う統合システム。

### 設計思想
- **100%厳密マッチング**: フォールバック機能なし
- **既存システム保護**: 新機能はオプション扱い
- **品質最優先**: 妥協のない最適化コンテンツ生成

---

## 🏗️ システム構成

```
app/services/knowledgeBase/
├── PageStructureMatcher.ts          # 厳密マッチング処理
├── TemplateItemMapper.ts            # テンプレート項目マッピング
├── data/
│   ├── pageStructureMatching.json   # マッチング定義（267パターン）
│   ├── pageStructures/              # ページ構成パターン定義（5パターン）
│   ├── masterData/                  # マスターデータ
│   │   ├── personas.json           # ペルソナ定義（P001-P008）
│   │   ├── themes.json             # テーマ定義（T001-T021）
│   │   └── templates.json          # テンプレート定義
│   ├── expressionMethodologies.json # 表現手法方法論
│   └── knowledgeMethodologies.json  # ナレッジ方法論
```

---

## ⚙️ 技術仕様

### 1. PageStructureMatcher.ts

#### 主要機能
- TypeID×TargetID×ThemeID組み合わせの厳密マッチング
- ページ構成パターンファイルの読み込み
- マッチングエラーの詳細レポート

#### 主要メソッド

```typescript
// 厳密マッチング
static findExactMatch(typeId: string, targetId: string, themeId: string): MatchingPattern

// ページ構造読み込み
static loadPageStructure(pageStructureId: string): PageStructure

// 完全処理
static getCompletePageStructure(typeId: string, targetId: string, themeId: string): {
  pattern: MatchingPattern;
  structure: PageStructure;
}
```

#### エラー処理
```typescript
export class PageStructureMatchingError extends Error {
  constructor(
    message: string,
    public readonly matchingKey: string,
    public readonly availablePatterns?: string[]
  )
}
```

### 2. TemplateItemMapper.ts

#### 主要機能
- ページ構成定義に基づく項目抽出
- テンプレート別の具体的内容マッピング
- Gemini AIを使用した高精度抽出

#### 主要メソッド

```typescript
// 全ページマッピング
async mapContentToPages(input: string, pageStructure: PageStructure): Promise<MappingResult>

// 単一ページマッピング（private）
private async mapSinglePage(input: string, page: PageDefinition, targetCombination: string): Promise<MappedContent>
```

#### サポートテンプレート
- `section-items`: セクション形式項目
- `enumeration`: 列挙形式項目
- `ranking`: ランキング形式項目
- `two-column-section-items`: 2列比較形式
- `simple5`: 段階的ステップ形式
- `list`: シンプルリスト形式
- `checklist-enhanced`: 詳細チェックリスト形式

---

## 🔧 統合ポイント

### pageStructureAnalyzer.ts統合

#### 分岐条件
```typescript
if (knowledgeBaseParams?.useKnowledgeBase && 
    knowledgeBaseParams.useStructuredGeneration && 
    knowledgeBaseParams.targetId && 
    knowledgeBaseParams.themeId) {
  return this.generateStructuredContent(input, knowledgeBaseParams);
}
```

#### 処理フロー
1. **厳密マッチング**: PageStructureMatcher.getCompletePageStructure()
2. **項目マッピング**: TemplateItemMapper.mapContentToPages()
3. **形式変換**: formatMappedContentAsTheme()

---

## 📊 データ構造

### MatchingPattern
```typescript
interface MatchingPattern {
  matchingKey: string;          // "001-P001-T006"
  description: string;          // 組み合わせ説明
  pageStructureId: string;      // ページ構成ID
  reasoning: string;            // マッチング理由
}
```

### PageStructure
```typescript
interface PageStructure {
  pageStructureId: string;
  name: string;
  targetCombination: string;
  description: string;
  pages: PageDefinition[];
}
```

### PageDefinition
```typescript
interface PageDefinition {
  pageNumber: number;
  templateId: string;
  role: string;
  title: string;
  itemAssignments: {
    title: string;
    sections?: Array<{
      sectionTitle: string;
      itemType: string;
      extractionRule: string;
      itemCount: number;
    }>;
    enumeration?: {
      itemType: string;
      extractionRule: string;
      itemCount: number;
    };
  };
}
```

---

## 🎯 品質保証

### フォールバック禁止原則
- マッチしない組み合わせは明確なエラー
- 品質劣化する代替案は提供しない
- エラー時は利用可能パターンを表示

### パフォーマンス指標
- マッチング処理: < 10ms
- 項目マッピング処理: < 3000ms/ページ
- 総処理時間: < 15000ms

### ログ出力
```
🎯 新統合システム開始: {typeId, targetId, themeId}
✅ ページ構造マッチング成功: [description]
✅ テンプレート項目マッピング完了: {pagesCount, totalExtractions, processingTime}
🎉 新統合システム完了: {generatedPages, matchingPattern}
```

---

## 🔍 デバッグ機能

### 利用可能パターン確認
```typescript
PageStructureMatcher.getAvailablePatterns()
PageStructureMatcher.getPatternsForType("001")
PageStructureMatcher.getPatternsForTarget("P001")
PageStructureMatcher.getPatternsForTheme("T006")
```

### エラー情報詳細
- 要求されたマッチングキー
- 利用可能パターンリスト（最初の5件）
- 総パターン数

---

## 📈 拡張性

### 新パターン追加
1. `pageStructureMatching.json`に新パターン追加
2. `pageStructures/`に対応するページ構成ファイル作成
3. 自動的にシステムが認識

### 新テンプレート対応
1. `TemplateItemMapper.ts`の`getTemplateSpecificInstructions()`に追加
2. `getOutputFormat()`に出力形式定義追加
3. `formatMappedContentAsTheme()`に変換ロジック追加

---

## ⚠️ 制約事項

### 必須条件
- `typeId`, `targetId`, `themeId`の全てが指定されている必要
- 指定された組み合わせがマッチングファイルに存在する必要
- ページ構成ファイルが存在する必要

### システム制限
- フォールバック機能なし
- 部分マッチング非対応
- 動的パターン生成なし

---

## 🔄 バージョン管理

### v1.0.0 (現在)
- 基本マッチング機能
- 主要テンプレート対応
- エラーハンドリング

### 今後の展開
- パフォーマンス最適化
- 新テンプレート追加
- マッチングパターン拡張