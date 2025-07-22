# ピンポイントナレッジ検索システム設計書

## 🎯 目的

AI想像によるコンテンツ生成の70%を、ナレッジベースからのピンポイント検索に置き換え、ペルソナが真に欲しい情報を実データから提供する。

---

## ❌ 現在の問題点

### **問題1: AI想像依存の構造**
```typescript
// 現在のTemplateItemMapper.ts
const mappingPrompt = `入力から抽出してください...`;
const result = await this.model.generateContent(mappingPrompt); // AI想像
```

### **問題2: 実コンテンツデータの不足**
- successPatterns.json → 構造定義のみ
- 実際の成功タイトル・内容・項目例が不在

### **問題3: 広く浅い情報取得**
- 汎用的な情報提供
- ペルソナ固有の課題に対するピンポイント解決策不足

---

## ✅ 新システム設計

### **Phase 1: 実コンテンツデータベース構築**

#### 1.1 成功コンテンツ実例DB
**ファイル**: `app/services/knowledgeBase/data/contentExamples.json`
```json
{
  "P001-T006-emotional-hook": {
    "titles": [
      "戦略的思考が裏目に？：自己分析で陥る3つの罠",
      "データ重視派必見！：感情を無視した自己分析の限界",
      "効率求めて失敗する：戦略的就活生の共通パターン"
    ],
    "sectionTitles": [
      "こんな『計画倒れ』ありませんか？",
      "戦略的だからこそ感じる不安",
      "データ派が見落としがちな盲点"
    ],
    "items": [
      "自己分析のフレームワークはあるのに、なぜか手が止まる",
      "論理的に考えているのに、面接官に響かない自己PRになってしまう",
      "効率的にやりたいのに、他の人の方法が気になって迷ってしまう"
    ]
  }
}
```

#### 1.2 ペルソナ別課題DB
**ファイル**: `app/services/knowledgeBase/data/personaInsights.json`
```json
{
  "P001": {
    "psychologicalPainPoints": [
      "『本当にこのやり方で合ってるの？』という不安",
      "効率を求めるあまり本質を見失う恐れ",
      "データに頼りすぎて感情面を軽視してしまう傾向"
    ],
    "desiredOutcomes": [
      "確実に内定につながる自己分析手法",
      "論理的だが面接官の心に響く自己PR",
      "時間対効果の高い就活戦略"
    ],
    "triggerWords": [
      "本当に正しい", "効率的", "確実に", "戦略的",
      "データに基づく", "論理的", "フレームワーク"
    ]
  }
}
```

### **Phase 2: ピンポイント検索エンジン**

#### 2.1 検索クエリ生成
**ファイル**: `app/services/knowledgeBase/SearchQueryBuilder.ts`
```typescript
class SearchQueryBuilder {
  generateSearchQuery(targetId: string, themeId: string, role: string): SearchQuery {
    // ペルソナ特性 × テーマ × ページ役割から精密検索クエリ生成
    const persona = this.getPersonaInsights(targetId);
    const theme = this.getThemeContext(themeId);
    
    return {
      psychologicalMatch: persona.psychologicalPainPoints,
      desiredOutcome: persona.desiredOutcomes,
      contextualTriggers: theme.effectiveTriggers,
      contentType: role // emotional-hook, problem-analysis等
    };
  }
}
```

#### 2.2 検索実行エンジン
**ファイル**: `app/services/knowledgeBase/KnowledgeSearchEngine.ts`
```typescript
class KnowledgeSearchEngine {
  searchExactMatch(query: SearchQuery): SearchResult {
    // 1. 完全一致検索
    const exactMatch = this.findExactContentMatch(query);
    if (exactMatch) return exactMatch;
    
    // 2. 類似パターン検索
    const similarPatterns = this.findSimilarPatterns(query);
    
    // 3. ペルソナ特性ベース検索
    const personaMatch = this.searchByPersonaTraits(query);
    
    return this.combineResults([exactMatch, similarPatterns, personaMatch]);
  }
}
```

### **Phase 3: 検索ベース生成システム**

#### 3.1 修正版TemplateItemMapper
```typescript
class TemplateItemMapper {
  async mapContentToPages(input: string, structure: PageStructureDefinition) {
    const results = [];
    
    for (const page of structure.pages) {
      // 🔥 AI想像を排除 - 検索ベース生成
      const searchQuery = this.buildSearchQuery(page, structure.targetCombination);
      const knowledgeResult = await this.searchEngine.searchExactMatch(searchQuery);
      
      // 実データからコンテンツ構築
      const pageContent = this.buildContentFromKnowledge(knowledgeResult, page);
      
      results.push(pageContent);
    }
    
    return results;
  }
  
  private buildSearchQuery(page: PageDefinition, combination: string): SearchQuery {
    const [typeId, targetId, themeId] = combination.split('-');
    
    return {
      targetPersona: targetId,     // P001
      theme: themeId,             // T006  
      role: page.role,            // emotional-hook
      itemType: page.itemAssignments.sections[0].itemType, // empathy-statement
      extractionIntent: page.itemAssignments.sections[0].extractionRule
    };
  }
}
```

#### 3.2 コンテンツ組み立てロジック
```typescript
private buildContentFromKnowledge(knowledge: SearchResult, page: PageDefinition): PageContent {
  return {
    title: knowledge.exactMatches.titles[0] || knowledge.generatedTitle,
    sections: [{
      title: knowledge.exactMatches.sectionTitles[0] || knowledge.generatedSectionTitle,
      items: knowledge.exactMatches.items || knowledge.similarItems
    }]
  };
}
```

---

## 🎯 実装ロードマップ

### **Stage 1: データベース構築（即効性）**
1. **既存成功コンテンツの構造化**
   - contents-001〜200の分析・分類
   - ペルソナ×テーマ別の成功パターン抽出
   
2. **contentExamples.json作成**
   - 実績のあるタイトル・項目の収録
   - ペルソナ別の効果的表現の体系化

### **Stage 2: 検索エンジン実装（中期）**
1. **SearchQueryBuilder実装**
   - ペルソナ特性ベースのクエリ生成
   - 心理的ニーズとの精密マッチング

2. **KnowledgeSearchEngine実装**  
   - 完全一致 > 類似パターン > 生成の優先順位
   - AI想像を最後の手段に限定

### **Stage 3: 統合システム（長期）**
1. **TemplateItemMapper大幅修正**
   - 検索ファーストのロジックに変更
   - AI想像依存度70%削減の実現

2. **効果測定・改善**
   - 実データ使用率の測定
   - ペルソナ適合度の向上

---

## 🔢 成功指標

### **定量目標**
- **AI想像依存度**: 現在80% → 目標30%（-50%削減）
- **実データ活用率**: 現在20% → 目標70%（+50%向上）  
- **ペルソナ適合度**: 現在40% → 目標85%（+45%向上）

### **定性目標**
- ペルソナが「これは自分のことだ」と感じる確度向上
- 具体性・実用性の大幅な向上
- 一般的でない、ピンポイントな価値提供

---

## 💡 核心的な設計思想

### **検索ファースト原則**
```
1. 実績データ検索 (優先度: 最高)
2. 類似パターン検索 (優先度: 高)  
3. AI生成補完 (優先度: 低) ← 最後の手段のみ
```

### **ペルソナセントリック**
- 広く浅い情報提供から脱却
- 特定ペルソナの特定課題に対する特化型解決策
- 「その人だけが抱える悩み」への的確な回答

### **実証ベース品質**
- 想像・推測の排除
- 実際に効果のあったコンテンツのみ活用
- データドリブンなコンテンツ最適化

この設計により、「ありきたりな一般論」から「このペルソナだけの特化型価値」への転換を実現します。