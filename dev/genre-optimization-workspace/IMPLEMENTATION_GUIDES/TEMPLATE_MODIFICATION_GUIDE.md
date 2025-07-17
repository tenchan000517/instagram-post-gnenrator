# 🔧 テンプレート修正ガイド

## 🎯 目的

既存テンプレートの選択ロジックを修正し、各ジャンルの最適なテンプレート選択を実現する。

## 📋 修正対象ファイル

### 1. app/services/pageStructureAnalyzer.ts

#### 現在の問題箇所（76-134行）
```typescript
【テンプレート選択指針】
**🎯 データ構造による最適選択 🎯**

// 現在の問題のある記述
**section-items**: 複数カテゴリ+各項目説明がある場合（概要・まとめページに最適）
```

#### 修正方向
```typescript
// 1. ジャンル特性の前置
【ジャンル特性による強制適用】
${genre} ジャンルの場合：
- 最優先テンプレート: ${genreConfig.primaryTemplates.join(', ')}
- 推奨テンプレート: ${genreConfig.secondaryTemplates.join(', ')}
- 避けるべきテンプレート: ${genreConfig.avoidTemplates.join(', ')}

// 2. section-items選択条件の厳格化
**section-items**: 以下の厳格な条件を全て満たす場合のみ選択
❌ 単純な□記号リストは対象外
❌ 準備・手順・チェックリストは対象外
✅ 5つ以上の完全に独立した概念カテゴリ
✅ 「まとめ」「総括」「概要」「全体像」の明示的キーワード
✅ 包括的な知識整理が主目的
✅ 実行よりも理解が目的

// 3. 判定優先順位の明確化
【判定優先順位】
1. ジャンル特性による強制適用
2. データ構造による明確な識別（ranking, graph, table等）
3. 実行性質による分類（checklist-enhanced, simple5）
4. 最後の手段としてのsection-items
```

#### 具体的な修正手順
```typescript
// Step 1: ジャンル特性の取得
const genreConfig = getGenreConfig(specifiedGenre)

// Step 2: プロンプトの修正
const prompt = `
【ジャンル分析結果】
- 判定ジャンル: ${specifiedGenre}
- 最適項目数: ${genreConfig.optimalItemRange.min}-${genreConfig.optimalItemRange.max}個
- 表現意図: ${genreConfig.expressionIntent}

【ジャンル特性による強制適用】
${specifiedGenre} ジャンルの場合：
- 最優先テンプレート: ${genreConfig.primaryTemplates.join(', ')}
- 推奨テンプレート: ${genreConfig.secondaryTemplates.join(', ')}
- 避けるべきテンプレート: ${genreConfig.avoidTemplates.join(', ')}
- 特性キーワード: ${genreConfig.characteristicKeywords.join(', ')}

【テンプレート選択指針】
// 既存のデータ構造による選択指針...

// section-itemsの厳格化
**section-items**: 以下の厳格な条件を全て満たす場合のみ選択
❌ ${specifiedGenre}ジャンルでは避けるべき（${genreConfig.avoidTemplates.includes('section-items') ? '避けるべき指定' : '条件付き使用'}）
❌ 単純な□記号リストは対象外
❌ 準備・手順・チェックリストは対象外
✅ 5つ以上の完全に独立した概念カテゴリ
✅ 「まとめ」「総括」「概要」「全体像」の明示的キーワード
✅ 包括的な知識整理が主目的
✅ 実行よりも理解が目的
✅ 汎用的な情報提供が目的

【入力内容】
${input}
`
```

### 2. app/lib/genre.ts

#### 現在の構造
```typescript
export interface GenreConfig {
  optimalItemRange: { min: number; max: number }
}
```

#### 修正後の構造
```typescript
export interface GenreConfig {
  // 既存設定
  optimalItemRange: { min: number; max: number }
  
  // 新規追加
  primaryTemplates: TemplateType[]      // 最優先テンプレート
  secondaryTemplates: TemplateType[]    // 推奨テンプレート
  avoidTemplates: TemplateType[]        // 避けるべきテンプレート
  characteristicKeywords: string[]      // ジャンル特性キーワード
  expressionIntent: string              // 表現意図
}
```

#### 各ジャンルの具体的設定
```typescript
export const genreConfigs: Record<string, GenreConfig> = {
  'strategy': {
    optimalItemRange: { min: 4, max: 6 },
    primaryTemplates: ['checklist-enhanced', 'simple5'],
    secondaryTemplates: ['item-n-title-content'],
    avoidTemplates: ['section-items'],
    characteristicKeywords: ['準備', '対策', '手順', '実践', '攻略'],
    expressionIntent: '実践的準備手順'
  },
  
  'career': {
    optimalItemRange: { min: 4, max: 6 },
    primaryTemplates: ['ranking', 'graph', 'table'],
    secondaryTemplates: ['section-items'],
    avoidTemplates: ['checklist-enhanced'],
    characteristicKeywords: ['データ', '統計', '年収', '企業', '比較'],
    expressionIntent: 'データに基づく客観的判断材料'
  },
  
  'interview': {
    optimalItemRange: { min: 4, max: 6 },
    primaryTemplates: ['checklist-enhanced', 'simple5'],
    secondaryTemplates: ['two-column-section-items'],
    avoidTemplates: ['graph'],
    characteristicKeywords: ['面接', '準備', '質問', '回答', '対策'],
    expressionIntent: '実践的面接対策'
  },
  
  'skill': {
    optimalItemRange: { min: 3, max: 5 },
    primaryTemplates: ['simple5', 'item-n-title-content'],
    secondaryTemplates: ['enumeration'],
    avoidTemplates: ['table'],
    characteristicKeywords: ['スキル', '習得', '成長', '学習', '向上'],
    expressionIntent: '段階的スキル習得'
  },
  
  'internship': {
    optimalItemRange: { min: 4, max: 5 },
    primaryTemplates: ['table', 'ranking'],
    secondaryTemplates: ['list'],
    avoidTemplates: ['simple5'],
    characteristicKeywords: ['インターン', '締切', '企業', '募集', '選考'],
    expressionIntent: '機会活用促進'
  },
  
  'general': {
    optimalItemRange: { min: 3, max: 6 },
    primaryTemplates: ['section-items', 'item-n-title-content'],
    secondaryTemplates: ['simple5', 'simple6'],
    avoidTemplates: [],
    characteristicKeywords: ['一般', '汎用', '基本', '概要'],
    expressionIntent: '汎用的情報提供'
  }
}
```

### 3. app/services/contentGeneratorService.ts

#### 修正対象関数
```typescript
convertToTemplateData(content: any, templateType: TemplateType): TemplateData
```

#### 修正方向
```typescript
// 完璧優先変換の実装
const convertToTemplateData = (content: any, templateType: TemplateType): TemplateData => {
  // 1. 基本的な清掃処理
  const cleanTitle = MarkdownUtils.removeMarkdown(reconstructString(content.title || ''))
  const cleanContent = content.content ? MarkdownUtils.removeMarkdown(reconstructString(content.content)) : ''
  
  // 2. テンプレート別の最適化処理
  switch (templateType) {
    case 'checklist-enhanced':
      return {
        title: cleanTitle,
        content: cleanContent,
        checklistItems: content.checklistItems || [],
        badgeText: content.badgeText || '',
        // 他のフィールドは空配列・空文字で初期化
        items: [],
        sections: [],
        steps: [],
        rankingData: [],
        graphData: null,
        tableData: { headers: [], rows: [] },
        points: [],
        checklist: [],
        twoColumn: { left: [], right: [] }
      }
    
    case 'simple5':
      return {
        title: cleanTitle,
        content: cleanContent,
        steps: content.steps || [],
        badgeText: content.badgeText || '',
        // 他のフィールドは空配列・空文字で初期化
        items: [],
        sections: [],
        checklistItems: [],
        rankingData: [],
        graphData: null,
        tableData: { headers: [], rows: [] },
        points: [],
        checklist: [],
        twoColumn: { left: [], right: [] }
      }
    
    case 'section-items':
      return {
        title: cleanTitle,
        content: cleanContent,
        sections: content.sections || [],
        badgeText: content.badgeText || '',
        // 他のフィールドは空配列・空文字で初期化
        items: [],
        steps: [],
        checklistItems: [],
        rankingData: [],
        graphData: null,
        tableData: { headers: [], rows: [] },
        points: [],
        checklist: [],
        twoColumn: { left: [], right: [] }
      }
    
    // 他のテンプレートも同様に処理
    default:
      return {
        title: cleanTitle,
        content: cleanContent,
        // 全フィールドを安全に初期化
        items: [],
        sections: [],
        steps: [],
        checklistItems: [],
        rankingData: [],
        graphData: null,
        tableData: { headers: [], rows: [] },
        points: [],
        checklist: [],
        twoColumn: { left: [], right: [] },
        badgeText: ''
      }
  }
}

// 分解された文字列オブジェクトの再構築
const reconstructString = (obj: any): string => {
  if (typeof obj === 'string') return obj
  
  if (obj && typeof obj === 'object') {
    const keys = Object.keys(obj)
    const isNumericKeys = keys.every(key => /^\d+$/.test(key))
    
    if (isNumericKeys && keys.length > 0) {
      const sortedKeys = keys.sort((a, b) => parseInt(a) - parseInt(b))
      return sortedKeys.map(key => obj[key]).join('')
    }
  }
  
  return obj ? String(obj) : ''
}
```

## 🔧 実装手順

### Phase 1: genre.ts の拡張
```bash
1. GenreConfig インターフェースの拡張
2. 各ジャンルの設定追加
3. TypeScript コンパイル確認
4. 既存機能の動作確認
```

### Phase 2: pageStructureAnalyzer.ts の修正
```bash
1. プロンプトの修正
2. ジャンル特性の組み込み
3. section-items 条件の厳格化
4. 判定優先順位の実装
```

### Phase 3: contentGeneratorService.ts の修正
```bash
1. convertToTemplateData の品質向上
2. 完璧優先変換の実装
3. 分解された文字列の再構築
4. 型安全性の確保
```

### Phase 4: 統合テスト
```bash
1. 各ジャンルでのテンプレート選択確認
2. section-items 使用率の測定
3. 全体動作確認
4. パフォーマンス確認
```

## ⚠️ 注意事項

### 危険な修正パターン
```typescript
// ❌ 絶対に避ける
1. templateMatchingService.ts の修正
2. 型定義の安易な変更
3. AIプロンプトの大幅変更
```

### 必須チェック項目
```bash
1. TypeScript エラーなし
2. 全テンプレートの動作確認
3. 編集機能の動作確認
4. 画像生成機能の確認
```

### 品質確保
```bash
1. 各段階での動作確認
2. エラーハンドリングの実装
3. 適切なログ出力
4. パフォーマンス監視
```

---

**⚠️ 重要**: このガイドに従って段階的に実装することで、安全で確実な修正を実現できます。