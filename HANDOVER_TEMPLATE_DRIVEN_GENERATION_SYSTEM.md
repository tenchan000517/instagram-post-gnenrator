# HANDOVER: テンプレート駆動生成システム実装

## 🎯 実装目標

現在の「コンテンツ生成→テンプレート選択→埋める」フローを、**「テンプレート構造理解→構造駆動生成→自然な100点マッチング」**フローに根本的に変更する。

## 📋 現状分析

### 現在の問題
- 補完的テンプレート（explanation2, simple3, simple6, title-description-only等）が積極選択される
- 優秀なテンプレートの構造要件を満たすコンテンツが生成されない
- 生成後に「埋める」作業が発生する不自然なフロー

### 優秀テンプレート（優先すべき）
1. **表型（table）** - 比較データ構造
2. **シンプル５（simple5）** - ステップ/チェックリスト構造  
3. **セクション+アイテム型（section-items）** - セクション+アクション項目構造
4. **２カラムセクション+アイテム型（two-column-section-items）** - 複数セクション+項目構造
5. **チェックリスト詳細型（checklist-enhanced）** - 詳細チェック項目構造
6. **独立ボックス型（item-n-title-content）** - 独立概念ボックス構造

## 🔧 実装要求

### Phase 1: テンプレート構造分析システム
```typescript
// app/services/templateStructureAnalyzer.ts
export class TemplateStructureAnalyzer {
  // 各優秀テンプレートの理想的構造要件を定義
  static getTemplateRequirements(templateType: PremiumTemplateType): StructureRequirements
  
  // 入力内容から最適な優秀テンプレート候補を特定
  static analyzeInputForOptimalTemplate(input: string): PremiumTemplateCandidate[]
}
```

### Phase 2: 構造駆動コンテンツ生成
```typescript
// app/services/structureDrivenGenerator.ts
export class StructureDrivenGenerator {
  // テンプレート構造に基づくコンテンツ生成
  async generateForTemplate(
    input: string, 
    targetTemplate: PremiumTemplateType
  ): Promise<StructureMatchedContent>
  
  // 優秀テンプレート用の特化プロンプト
  private createStructureSpecificPrompt(
    input: string, 
    requirements: StructureRequirements
  ): string
}
```

### Phase 3: 統合フローの実装
```typescript
// app/services/nextGenContentGenerator.ts
export class NextGenContentGenerator {
  async generateOptimalContent(input: string): Promise<GeneratedContent> {
    // 1. 入力分析 → 最適テンプレート特定
    const candidates = TemplateStructureAnalyzer.analyzeInputForOptimalTemplate(input)
    
    // 2. 優秀テンプレート優先で構造駆動生成
    for (const candidate of candidates) {
      const content = await StructureDrivenGenerator.generateForTemplate(input, candidate.type)
      if (content.structureScore === 1.0) return content // 100点達成
    }
    
    // 3. フォールバック（シンプルテンプレート）
    // 4. 最終手段（補完テンプレート）
  }
}
```

## 📝 具体的な構造要件例

### 表型（table）
```typescript
requirements: {
  structure: "comparison_data",
  minComparisons: 3,
  categories: ["特徴", "メリット", "デメリット", "適用場面"],
  contentPattern: "比較可能な要素を持つ内容"
}
```

### セクション+アイテム型（section-items）
```typescript
requirements: {
  structure: "section_with_actions",
  sections: 1,
  itemsPerSection: 3-7,
  contentPattern: "1つのメインテーマ + 具体的アクション項目"
}
```

## 🎯 プロンプト改善方針

### 現在のプロンプト問題
- テンプレート構造を意識しない汎用的生成
- 生成後のマッチング頼み

### 新プロンプト戦略
```
【入力】: ユーザー内容
【分析】: 最適テンプレート = table（比較要素あり）
【指示】: 表型構造で生成してください
- 比較項目: 3つ以上
- カテゴリ: 特徴、メリット、デメリット、適用場面
- データ形式: headers + rows配列
```

## 📁 ファイル変更対象

### 新規作成
- `app/services/templateStructureAnalyzer.ts`
- `app/services/structureDrivenGenerator.ts`  
- `app/services/nextGenContentGenerator.ts`
- `app/types/templateStructure.ts`

### 既存修正
- `app/services/contentGeneratorService.ts` - 新システム統合
- `app/services/templateMatchingService.ts` - 優先度調整
- `app/components/NewFlowPostGenerator.tsx` - 新生成サービス利用

## 🔍 品質検証

### 実装後の期待結果
1. **優秀テンプレート使用率**: 80%以上
2. **100点マッチング率**: 95%以上  
3. **補完テンプレート使用**: 10%以下（品質不足コンテンツのみ）

### テスト要求
```bash
# 各テンプレート構造の生成テスト
npm test -- template-driven-generation
```

## 🚀 実装優先度

1. **HIGH**: Phase 1 - 構造分析システム
2. **HIGH**: Phase 2 - 構造駆動生成  
3. **MEDIUM**: Phase 3 - 統合フロー
4. **MEDIUM**: 既存システムとの互換性確保

## 📊 成功指標

- [ ] 表型が比較データに自動選択される
- [ ] ステップ系コンテンツが自動的にsimple5にマッチング
- [ ] section-itemsが段階的アクション構造で生成される
- [ ] 補完テンプレート使用率が大幅減少
- [ ] 全体的なコンテンツ品質向上

---

## 🎉 最終目標

**「コンテンツに合わせてテンプレートを選ぶ」から「テンプレートに合わせてコンテンツを生成する」**

これにより、優秀なテンプレートが自然に選択され、高品質なコンテンツが構造的に保証されるシステムを実現する。

---
*作成日: 2025-01-13*
*実装担当: 次世代Claude Code*
*ステータス: 実装準備完了*