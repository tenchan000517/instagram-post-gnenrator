# ナレッジベースシステム統合 実装計画書

## 実装方針

### 既存システム保護
- `pageStructureAnalyzer.ts`の既存フローを完全保持
- `KnowledgeBaseParams`に`useStructuredGeneration?: boolean`のみ追加
- 新機能は`useStructuredGeneration=true`時のみ有効化

### 追加実装ファイル構成

```
app/services/knowledgeBase/
├── PageStructureMatcher.ts          # TypeID×TargetID×ThemeIDマッチング
├── TemplateItemMapper.ts            # テンプレート項目への内容マッピング
├── data/
│   ├── pageStructureMatching.json   # マッチング定義
│   ├── pageStructures/              # ページ構成パターン定義
│   │   ├── empathy-strategic-5page.json
│   │   ├── educational-analysis-4page.json
│   │   └── data-practical-3page.json
│   ├── knowledgeMethodologies.json  # 真のナレッジ（方法論）
│   └── masterData/
│       ├── personas.json
│       ├── themes.json
│       └── templates.json
```

### 型定義拡張（最小限）

```typescript
// app/types/knowledgeBase.ts 追加
export interface KnowledgeBaseParams {
  useKnowledgeBase: boolean;
  typeId?: string;
  targetId?: string; 
  themeId?: string;
  useStructuredGeneration?: boolean; // 新規追加
}
```

### pageStructureAnalyzer.ts修正箇所

```typescript
async analyzePageStructureAndTemplates(
  input: string,
  knowledgeBaseParams?: KnowledgeBaseParams
): Promise<PageStructure[]> {
  
  // 新機能分岐追加
  if (knowledgeBaseParams?.useKnowledgeBase && knowledgeBaseParams.useStructuredGeneration) {
    return this.generateStructuredContent(input, knowledgeBaseParams);
  }
  
  // 既存処理は完全保持
  // ...
}

// 新メソッド追加
private async generateStructuredContent(
  input: string,
  params: KnowledgeBaseParams
): Promise<PageStructure[]> {
  // 新システム処理
}
```

## 実装ステップ

### Step 1: マスターデータ作成
1. 分析結果からペルソナ・テーマ・表現手法を抽出
2. JSON形式でマスターファイル作成

### Step 2: ページ構成マッチング定義
1. TypeID×TargetID×ThemeID組み合わせリスト作成
2. 各組み合わせに対応するページ構成パターン定義
3. テンプレート項目への具体的マッピング指示

### Step 3: ナレッジ方法論化
1. 現在のsuccessPatterns.jsonを分析
2. 完成コンテンツから「方法論」を抽出
3. 問題解決手順・表現技法を体系化

### Step 4: 統合システム実装
1. PageStructureMatcher.ts実装
2. TemplateItemMapper.ts実装  
3. pageStructureAnalyzer.ts分岐追加

## 品質保証方針

### フォールバック禁止
- 完全マッチングのみ実行
- マッチしない場合は明確なエラー
- 品質劣化する代替案は提供しない

### 既存システム影響ゼロ
- 新機能はオプション扱い
- 既存ユーザーは何も変わらず利用可能
- 段階的移行が可能

## 完成後の動作フロー

1. **マッチング**: TypeID×TargetID×ThemeID → ページ構成パターン
2. **項目マッピング**: ページ構成 → テンプレート項目への具体的内容指示  
3. **方法論適用**: ナレッジベース → 問題解決・表現手法の具体的方法論
4. **コンテンツ生成**: 方法論に基づく高品質コンテンツ出力