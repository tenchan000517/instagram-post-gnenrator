# 投稿タイプシステム設計ドキュメント

## 📋 概要

本ドキュメントは、既存のジャンル判定システムを投稿タイプシステムに置き換え、4つの分析フレームワークの価値を確実に実現するための設計を記録したものです。

**作成日**: 2025-07-19  
**ステータス**: 基本設計完了、実装準備段階  
**前提**: 統合分析・設計ドキュメントに基づく具体的実装アプローチ

## 🎯 投稿タイプカテゴライズ（仮説版）

### 確認済み投稿タイプ（3つ）

#### 1. **共感型ファネル構成** (`empathy-funnel`)
- **分析元**: contents-1
- **特徴**: 段階的共感醸成→心理誘導→CTA
- **構成**: 9枚（問題認識→共感深化→解決策→行動）
- **心理設計**: AIDMA完全実装、感情85%：論理15%

#### 2. **教育型コンテンツマーケティング構成** (`educational-content`)
- **分析元**: contents-2  
- **特徴**: 体系的教育→信頼関係構築→継続的関係
- **構成**: 10枚（問題提起→7つのPoint→行動促進）
- **価値設計**: 理論と実践のバランス、教育的価値提供

#### 3. **要約→証明→行動促進型** (`proof-driven`)
- **分析元**: contents-3
- **特徴**: 手順要約→実績証明→オファー提示
- **構成**: 3枚（まとめ→証明→CTA）
- **戦略**: 社会的証明による信頼性構築

### 仮説的追加投稿タイプ（3つ）

#### 4. **リスト型情報提供構成** (`list-informational`)
- **想定**: 「転職に必要な5つの準備」「面接でよく聞かれる質問10選」
- **特徴**: 情報整理→価値提供→実践促進
- **構成**: 5-7枚（タイトル→リスト項目→詳細→まとめ）

#### 5. **ステップ型ガイド構成** (`step-guide`)
- **想定**: 「ES作成の完全ガイド」「自己分析の手順」
- **特徴**: 手順説明→実践支援→成果保証
- **構成**: 6-8枚（概要→各ステップ→注意点→完了）

#### 6. **体験談型ストーリー構成** (`story-experience`)
- **想定**: 「内定獲得までの実体験」「転職成功談」
- **特徴**: ストーリー展開→共感→学び→行動促進
- **構成**: 8-10枚（背景→困難→転機→成果→学び）

## 📊 各投稿タイプの必要データ構造

### 1. 共感型ファネル構成 (`empathy-funnel`)
```typescript
interface EmpathyFunnelData {
  // 問題提起フェーズ
  problems: Array<{
    title: string
    examples: string[]
    emotionalDescription: string
    emphasis: string
    comment?: string
  }>
  
  // 共感深化フェーズ  
  empathyScenarios: Array<{
    title: string
    scenario: string
    realization: string
    struggle: string
  }>
  
  // 転換点フェーズ
  transition: {
    questions: string[]
    emotionalResponse: string
    understanding: string
    transitionMessage: string
  }
  
  // 解決策・CTA
  solution: {
    serviceTitle: string
    subtitle: string
    problemExamples: string[]
    callToAction: string
    additionalResource?: string
  }
}
```

### 2. 教育型コンテンツマーケティング構成 (`educational-content`)
```typescript
interface EducationalContentData {
  // メインタイトル
  mainTitle: string
  titleLines: string[]
  
  // 問題提起
  problemIntro: {
    title: string
    question: string
    checklist: Array<{text: string, checked: boolean}>
    closingMessage: string
  }
  
  // Point構造
  points: Array<{
    pointNumber: number
    title: string
    content?: string
    currentState?: string
    recommendation?: string
    actionItems?: string[]
    explanation?: string
    comparison?: string
    actionAdvice?: string
    encouragement?: string
  }>
  
  // 行動促進・CTA
  actionCTA: {
    mainMessage: string
    primaryCTA: string
    actionAdvice: string
    additionalInfo: string
    phoneScreen?: string
  }
}
```

### 3. 要約→証明→行動促進型 (`proof-driven`)
```typescript
interface ProofDrivenData {
  // 手順要約
  summary: {
    title: string
    subtitle: string
    steps: Array<{
      step: number
      title: string
      description?: string
    }>
    bottomCallToAction: string
  }
  
  // 実績証明
  proof: {
    title: string
    badgeText: string
    subtitle: string
    testimonial: {
      screenshot: string
      username: string
      mention?: string
      achievement: string
      details: string
    }
    bottomCallToAction: string
  }
  
  // オファー提示
  offer: {
    title: string
    badges: string[]
    subtitle: string
    description: string
    benefits: Array<{
      title: string
      image: string
    }>
    finalCallToAction: {
      instruction: string
      keyword: string
      result: string
    }
  }
}
```

### 4. リスト型情報提供構成 (`list-informational`)
```typescript
interface ListInformationalData {
  mainTitle: string
  itemCount: number
  
  introduction: {
    title: string
    description: string
    targetAudience: string
  }
  
  listItems: Array<{
    number: number
    title: string
    description: string
    details?: string[]
    tips?: string
  }>
  
  conclusion: {
    summary: string
    nextSteps: string
    callToAction: string
  }
}
```

### 5. ステップ型ガイド構成 (`step-guide`)
```typescript
interface StepGuideData {
  guideTitle: string
  totalSteps: number
  estimatedTime: string
  
  overview: {
    title: string
    description: string
    whatYouWillGet: string[]
  }
  
  steps: Array<{
    stepNumber: number
    title: string
    description: string
    actionItems: string[]
    tips?: string
    warnings?: string
    timeRequired?: string
  }>
  
  completion: {
    checklistTitle: string
    checklist: string[]
    nextSteps: string
    support: string
  }
}
```

### 6. 体験談型ストーリー構成 (`story-experience`)
```typescript
interface StoryExperienceData {
  storyTitle: string
  narrator: string
  timeframe: string
  
  background: {
    title: string
    situation: string
    challenges: string[]
  }
  
  journey: Array<{
    phase: string
    title: string
    situation: string
    feelings: string
    actions: string[]
    results: string
  }>
  
  learnings: {
    title: string
    keyLearnings: string[]
    advice: string
    inspiration: string
  }
  
  actionPrompt: {
    message: string
    specificActions: string[]
    support: string
  }
}
```

## 🎨 必要テンプレート要件（投稿タイプ別）

### 共感型ファネル - 4つのテンプレート
1. `empathy-problem-intro` - 問題提起+例示+感情表現
2. `empathy-scenario` - シナリオ描写+実感+複合感情
3. `empathy-transition` - 複数疑問+感情反応+転換メッセージ  
4. `empathy-solution-cta` - サービス紹介+問題例+CTA

### 教育型コンテンツ - 3つのテンプレート
1. `educational-title` - 複数行強調+背景統合
2. `educational-point` - Point番号+多様な構造対応
3. `educational-multi-cta` - 複数CTA+行動アドバイス

### 証明型 - 3つのテンプレート
1. `proof-summary` - 手順要約+ページ番号+誘導
2. `proof-testimonial` - 実績証明+スクリーンショット統合
3. `proof-offer` - 複数バッジ+特典グリッド+最終CTA

## 🔄 既存ジャンルシステムからの置き換え設計

### 現在のジャンルシステム構造
```typescript
// app/types/genre.ts
type Genre = 'knowhow' | 'book-recommendation' | 'internship-deadline' | ...

interface GenreConfig {
  genre: Genre
  description: string
  keywords: string[]
  optimalItemRange: { min: number; max: number }
  contentStructure: string[]
}

// app/services/genreDetector.ts  
class GenreDetector {
  detectGenre(content: string): Genre
  calculateScore(content: string, keywords: string[]): number
}
```

### 投稿タイプシステムへの置き換え
```typescript
// app/types/postType.ts (新規作成)
export type PostType = 
  | 'empathy-funnel'           // 共感型ファネル構成
  | 'educational-content'      // 教育型コンテンツマーケティング構成  
  | 'proof-driven'            // 要約→証明→行動促進型
  | 'list-informational'      // リスト型情報提供構成
  | 'step-guide'              // ステップ型ガイド構成
  | 'story-experience'        // 体験談型ストーリー構成
  | 'general'                 // その他

export interface PostTypeConfig {
  postType: PostType
  description: string
  keywords: string[]
  pageRange: { min: number; max: number }
  templateTypes: string[]
  dataStructure: string[]
  
  // 強制力を持つ新要素
  requiredPages: PageTemplate[]        // 必須ページ構成
  requiredDataStructure: DataStructure // 必須データ構造
  forcedTemplateSelection: boolean     // テンプレート強制適用
}

export const POST_TYPE_CONFIGS: PostTypeConfig[] = [
  {
    postType: 'empathy-funnel',
    description: '段階的共感醸成による心理誘導',
    keywords: ['不安', '悩み', 'あるある', '女性', '共感', '辛い', '困る'],
    pageRange: { min: 8, max: 10 },
    templateTypes: ['empathy-problem-intro', 'empathy-scenario', 'empathy-transition', 'empathy-cta'],
    dataStructure: ['problems', 'empathyScenarios', 'transition', 'solution'],
    requiredPages: [
      { templateType: 'empathy-problem-intro', dataRequirements: ['problems'] },
      { templateType: 'empathy-scenario', dataRequirements: ['empathyScenarios'] },
      { templateType: 'empathy-transition', dataRequirements: ['transition'] },
      { templateType: 'empathy-solution-cta', dataRequirements: ['solution'] }
    ],
    forcedTemplateSelection: true
  },
  {
    postType: 'educational-content',
    description: '体系的教育による信頼関係構築',
    keywords: ['ポイント', 'つのコツ', 'つの方法', '学ぶ', '知る', 'ステップ'],
    pageRange: { min: 8, max: 12 },
    templateTypes: ['educational-title', 'educational-point', 'educational-multi-cta'],
    dataStructure: ['mainTitle', 'problemIntro', 'points', 'actionCTA'],
    requiredPages: [
      { templateType: 'educational-title', dataRequirements: ['mainTitle'] },
      { templateType: 'educational-point', dataRequirements: ['points'] },
      { templateType: 'educational-multi-cta', dataRequirements: ['actionCTA'] }
    ],
    forcedTemplateSelection: true
  }
  // ... 他の投稿タイプ
]
```

### DetectorクラスのPost Type版
```typescript
// app/services/postTypeDetector.ts (genreDetector.tsを改良)
export class PostTypeDetector {
  private postTypeConfigs: PostTypeConfig[] = POST_TYPE_CONFIGS

  detectPostType(content: string): PostType {
    // 既存のgenreDetectorロジックをそのまま活用
    const normalizedContent = content.toLowerCase()
    
    const scores = this.postTypeConfigs.map(config => ({
      postType: config.postType,
      score: this.calculateScore(normalizedContent, config.keywords)
    }))
    
    const bestMatch = scores.reduce((best, current) => 
      current.score > best.score ? current : best
    )
    
    return bestMatch.score >= 0.1 ? bestMatch.postType : 'general'
  }

  // 既存のcalculateScoreメソッドをそのまま活用
  private calculateScore(content: string, keywords: string[]): number {
    // genreDetectorのロジックと同一
    if (keywords.length === 0) return 0
    
    let matchCount = 0
    let totalWeight = 0
    
    keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase()
      const matches = (content.match(new RegExp(keywordLower, 'g')) || []).length
      
      if (matches > 0) {
        matchCount += Math.min(matches, 3)
        totalWeight += 3
      } else {
        totalWeight += 1
      }
    })
    
    return totalWeight > 0 ? matchCount / totalWeight : 0
  }
}
```

## 🚨 現状ジャンル判定の限界と解決策

### 現状の限界理解

#### 現在のジャンル判定の実際の影響
```typescript
// pageStructureAnalyzer.ts から判明した現実
1. ジャンル判定 → genreConfig.optimalItemRange (項目数の範囲のみ)
2. プロンプトに「ジャンル情報」として渡される
3. でも実際の生成は：汎用的なプロンプト + テンプレート選択ロジック
```

#### ジャンル判定の弱い強制力
- **項目数の範囲指定**のみ（min-max項目数）
- **プロンプトでの参考情報**程度
- **テンプレート選択への影響は間接的**
- **データ構造やページ構成への強制力なし**

### 投稿タイプシステムでの解決策

#### 強制力を持つ設計
```typescript
interface PostTypeConfig {
  postType: PostType
  // 確定的な構成要素
  requiredPages: PageTemplate[]        // 必須ページ構成
  requiredDataStructure: DataStructure // 必須データ構造
  forcedTemplateSelection: boolean     // テンプレート強制適用
  
  // 現在の弱い要素も保持
  suggestedItemRange: { min: number; max: number }
  keywords: string[]
}
```

#### 実装での確実性確保
```typescript
class PostTypeBasedGenerator {
  generateContent(postType: PostType, input: string) {
    const config = getPostTypeConfig(postType)
    
    // 1. 確定的なページ構成
    const pageStructure = config.requiredPages
    
    // 2. 投稿タイプ専用プロンプト
    const prompt = this.buildPostTypeSpecificPrompt(postType, input)
    
    // 3. データ構造の強制適用
    const result = await this.generateWithStructure(prompt, config.requiredDataStructure)
    
    return result
  }
  
  private buildPostTypeSpecificPrompt(postType: PostType, input: string): string {
    const config = getPostTypeConfig(postType)
    
    switch(postType) {
      case 'empathy-funnel':
        return `
あなたは共感型ファネル構成の専門家です。以下の投稿を段階的共感醸成による心理誘導構成で生成してください。

【必須構成】
1. 問題提起フェーズ: 具体的事例+感情表現+強調メッセージ
2. 共感深化フェーズ: シナリオ描写+実感+複合感情
3. 転換点フェーズ: 複数疑問+感情反応+転換メッセージ
4. 解決策CTA: サービス紹介+問題例+行動促進

【必須データ構造】
- problems: 問題提起+examples+emotionalDescription+emphasis+comment
- empathyScenarios: scenario+realization+struggle
- transition: questions+emotionalResponse+understanding+transitionMessage
- solution: serviceTitle+problemExamples+callToAction

【入力内容】
${input}
        `
      
      case 'educational-content':
        return `
あなたは教育型コンテンツマーケティングの専門家です。以下の投稿を体系的教育による信頼関係構築構成で生成してください。

【必須構成】
1. メインタイトル: 複数行強調+背景統合
2. 問題提起: 質問+チェックリスト+締めくくりメッセージ
3. Point構造: 番号付き+多様な内容対応+行動アドバイス
4. 行動促進CTA: 複数CTA+具体的行動指示

【必須データ構造】
- mainTitle: titleLines
- problemIntro: question+checklist+closingMessage
- points: pointNumber+title+content/recommendation/actionItems/comparison/encouragement
- actionCTA: mainMessage+primaryCTA+actionAdvice+additionalInfo

【入力内容】
${input}
        `
      
      default:
        return `汎用的なプロンプト for ${input}`
    }
  }
}
```

## 🚀 実装アプローチ

### Phase 1: 最小侵襲での移行
1. **`postType.ts`と`postTypeDetector.ts`作成**
2. **既存システムとの並行運用**（フラグで切り替え）
3. **UIに投稿タイプ選択を追加**
4. **段階的にジャンルから投稿タイプに移行**

### Phase 2: 完全移行
1. **全てのジャンル参照を投稿タイプに変更**
2. **`genre.ts`と`genreDetector.ts`を削除**
3. **投稿タイプ別データ構造とテンプレートの完全実装**

### 置き換えファイル構造
```
app/types/genre.ts → app/types/postType.ts
app/services/genreDetector.ts → app/services/postTypeDetector.ts
app/services/pageStructureAnalyzer.ts → 投稿タイプ対応に修正
```

## 📈 期待される効果

### 従来ジャンルシステムとの違い
```
現在：ジャンル → 項目数範囲 → 汎用プロンプト → AI判断 → テンプレート
改善：投稿タイプ → 専用テンプレートセット決定 → 専用プロンプト → 確実な表現
```

### 投稿タイプシステムの強制力
1. **直接的なテンプレート決定**
2. **データ構造の強制適用**
3. **ページ構成の確実性**
4. **投稿タイプ専用プロンプトによる品質向上**

### 革新的価値の実現
- **4つの分析フレームワーク**の価値が確実に実現
- **投稿タイプ別最適化**により表現力が飛躍的に向上
- **段階的実装**により既存機能への影響なし
- **強制力の強化**により分析結果の価値を確実に反映

## 🎯 次のステップ

1. **Phase 1実装**: 共感型ファネル構成の最小実装
2. **テンプレート作成**: empathy-problem-intro等の新テンプレート
3. **UI層統合**: 投稿タイプ選択インターフェース
4. **段階的拡張**: 教育型、証明型の順次追加

---

**この設計により、既存のジャンル判定システムの限界を克服し、4つの分析フレームワークの革新的価値を確実に実現する投稿タイプシステムが構築される。**