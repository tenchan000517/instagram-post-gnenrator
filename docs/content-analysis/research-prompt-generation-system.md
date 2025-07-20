# リサーチプロンプト生成システム設計

## 🎯 システム概要

15件分析から抽出した8ペルソナ×6投稿タイプの組み合わせに基づき、ペルソナ特化の精密なリサーチプロンプトを自動生成するシステム。

## 📊 基盤データ構造

### 抽出された8ペルソナカテゴリ

```typescript
interface PersonaCategory {
  id: string
  name: string
  demographic: {
    age: string
    gender: string
    occupation: string
    situation: string
  }
  characteristics: {
    concerns: string[]
    language: string[]
    interests: string[]
    situations: string[]
    motivations: string[]
  }
  informationNeeds: {
    type: 'emotional' | 'logical' | 'practical'
    depth: 'basic' | 'intermediate' | 'advanced'
    format: 'step-by-step' | 'examples' | 'theory' | 'experience'
  }
}
```

#### ペルソナデータベース

```typescript
const PERSONA_DATABASE: PersonaCategory[] = [
  {
    id: "working-women-emotional",
    name: "働く女性（悩み・共感型）",
    demographic: {
      age: "20代後半-30代",
      gender: "女性",
      occupation: "会社員",
      situation: "悩み中"
    },
    characteristics: {
      concerns: ["職場での不平等", "ライフイベント両立", "将来不安", "理不尽な扱い"],
      language: ["モヤモヤ", "しんどい", "疲れた", "女性だから", "私だって"],
      interests: ["共感", "体験談", "感情サポート", "同世代の悩み"],
      situations: ["生理時の仕事", "雑用押し付け", "結婚プレッシャー", "キャリア迷い"],
      motivations: ["現状改善", "共感獲得", "精神的安定", "解決策発見"]
    },
    informationNeeds: {
      type: 'emotional',
      depth: 'basic',
      format: 'experience'
    }
  },
  
  {
    id: "career-women-growth",
    name: "キャリア女性（成長・学習型）",
    demographic: {
      age: "20代後半-30代",
      gender: "女性", 
      occupation: "会社員（キャリア構築期）",
      situation: "準備中/行動中"
    },
    characteristics: {
      concerns: ["将来への漠然とした不安", "キャリアプランが不明確", "ライフイベントとの両立"],
      language: ["具体的に", "体系的に", "どうすれば", "効果的な", "実践的な"],
      interests: ["キャリア構築", "スキルアップ", "自己分析", "長期計画"],
      situations: ["転職検討", "昇進準備", "スキル習得", "将来設計"],
      motivations: ["自己成長", "安定確保", "専門性向上", "選択肢拡大"]
    },
    informationNeeds: {
      type: 'logical',
      depth: 'intermediate',
      format: 'step-by-step'
    }
  },

  {
    id: "side-business-women",
    name: "副業志向女性（収益化型）",
    demographic: {
      age: "25-35歳",
      gender: "女性",
      occupation: "会社員・育児中",
      situation: "副業検討中"
    },
    characteristics: {
      concerns: ["時間制約", "収入不足", "スキル不安", "両立困難"],
      language: ["隙間時間で", "在宅で", "効率的に", "簡単に始められる"],
      interests: ["副業", "収益化", "時短テクニック", "在宅ワーク"],
      situations: ["育児中", "時間不足", "収入増希望", "スキル活用"],
      motivations: ["収入増加", "自由度向上", "将来備え", "自己実現"]
    },
    informationNeeds: {
      type: 'practical',
      depth: 'basic',
      format: 'step-by-step'
    }
  },

  {
    id: "ai-business-person",
    name: "AI活用ビジネスパーソン（効率化型）",
    demographic: {
      age: "25-45歳",
      gender: "男性中心",
      occupation: "フリーランス・会社員",
      situation: "AI活用中/検討中"
    },
    characteristics: {
      concerns: ["競争優位性", "効率化", "最新技術習得", "収益向上"],
      language: ["効率化", "自動化", "最新の", "革新的な", "競合優位"],
      interests: ["AI技術", "ツール活用", "収益化", "効率化手法"],
      situations: ["ツール選定", "業務効率化", "競争激化", "技術進歩"],
      motivations: ["競争優位", "効率向上", "収益最大化", "技術習得"]
    },
    informationNeeds: {
      type: 'practical',
      depth: 'advanced',
      format: 'examples'
    }
  },

  {
    id: "job-change-professional",
    name: "転職・中堅社会人（スキルアップ型）",
    demographic: {
      age: "28-35歳",
      gender: "男性中心",
      occupation: "中堅社会人",
      situation: "転職検討/スキルアップ中"
    },
    characteristics: {
      concerns: ["キャリアアップ", "市場価値", "転職成功", "スキル不足"],
      language: ["実務で", "実践的な", "即戦力", "市場価値", "差別化"],
      interests: ["転職戦略", "スキル習得", "業界動向", "キャリアアップ"],
      situations: ["転職活動", "昇進希望", "スキル強化", "市場研究"],
      motivations: ["キャリアアップ", "年収向上", "専門性強化", "安定確保"]
    },
    informationNeeds: {
      type: 'practical',
      depth: 'intermediate',
      format: 'examples'
    }
  },

  {
    id: "job-hunting-basic",
    name: "就活生（基礎学習型）",
    demographic: {
      age: "20-22歳",
      gender: "大学生",
      occupation: "大学生",
      situation: "就活準備期"
    },
    characteristics: {
      concerns: ["基礎知識不足", "何から始めるか", "業界理解", "自己分析"],
      language: ["わからない", "教えて", "基本的な", "初歩的な", "どうやって"],
      interests: ["就活基礎", "業界研究", "自己分析", "基本マナー"],
      situations: ["就活開始", "情報収集", "準備期間", "基礎学習"],
      motivations: ["基礎習得", "不安解消", "準備完了", "自信獲得"]
    },
    informationNeeds: {
      type: 'logical',
      depth: 'basic',
      format: 'step-by-step'
    }
  },

  {
    id: "job-hunting-practical",
    name: "就活生（実践・選考型）",
    demographic: {
      age: "21-23歳",
      gender: "大学生", 
      occupation: "大学生",
      situation: "就活本格期"
    },
    characteristics: {
      concerns: ["選考対策", "企業情報", "内定獲得", "競争優位"],
      language: ["具体的な", "実際の", "効果的な", "成功する", "内定に"],
      interests: ["選考対策", "企業研究", "面接準備", "ES作成"],
      situations: ["選考進行", "企業選定", "面接準備", "最終調整"],
      motivations: ["内定獲得", "第一志望合格", "競争優位", "成功確保"]
    },
    informationNeeds: {
      type: 'practical',
      depth: 'intermediate',
      format: 'examples'
    }
  },

  {
    id: "job-hunting-emotional",
    name: "就活生（感情サポート型）",
    demographic: {
      age: "21-22歳",
      gender: "大学生",
      occupation: "大学生", 
      situation: "就活中"
    },
    characteristics: {
      concerns: ["精神的不安", "孤独感", "プレッシャー", "自信喪失"],
      language: ["不安", "辛い", "大丈夫", "頑張って", "みんな"],
      interests: ["仲間意識", "励まし", "体験談", "感情共有"],
      situations: ["選考落ち", "不安増大", "孤独感", "モチベーション低下"],
      motivations: ["安心獲得", "仲間発見", "励まし", "自信回復"]
    },
    informationNeeds: {
      type: 'emotional',
      depth: 'basic',
      format: 'experience'
    }
  }
]
```

## 🔧 リサーチプロンプト生成エンジン

### 基本構造

```typescript
interface ResearchPromptGenerator {
  generatePrompt(input: {
    selectedPersona: string
    userTheme: string
    postType?: string
  }): string
}

class PersonaBasedResearchPromptGenerator implements ResearchPromptGenerator {
  
  generatePrompt(input: { selectedPersona: string, userTheme: string, postType?: string }): string {
    const persona = this.getPersonaData(input.selectedPersona)
    const promptTemplate = this.selectTemplate(persona, input.postType)
    
    return this.buildPrompt({
      persona,
      userTheme: input.userTheme,
      template: promptTemplate
    })
  }

  private buildPrompt(params: {
    persona: PersonaCategory,
    userTheme: string,
    template: PromptTemplate
  }): string {
    return `
【対象ペルソナ】${params.persona.name}

【ペルソナの詳細状況】
- 基本属性: ${params.persona.demographic.age}の${params.persona.demographic.gender}、${params.persona.demographic.occupation}
- 現在の状況: ${params.persona.demographic.situation}
- 具体的な悩み: ${params.persona.characteristics.concerns.join('、')}
- 使用する言葉: ${params.persona.characteristics.language.join('、')}
- 関心領域: ${params.persona.characteristics.interests.join('、')}
- 置かれている状況: ${params.persona.characteristics.situations.join('、')}
- モチベーション: ${params.persona.characteristics.motivations.join('、')}

【リサーチテーマ】${params.userTheme}

【リサーチ指示】
${this.generateSpecificInstructions(params.persona, params.userTheme)}

【情報要件】
${this.generateInformationRequirements(params.persona)}

【表現・言葉遣い要件】
${this.generateLanguageRequirements(params.persona)}

※投稿形式は一切指定せず、このペルソナに最適化された情報収集に特化してください
※抽象的な一般論ではなく、このペルソナの具体的な状況に根ざした情報を重視してください
`
  }

  private generateSpecificInstructions(persona: PersonaCategory, userTheme: string): string {
    const baseInstructions = [
      `このペルソナが「${userTheme}」について実際に抱えている悩み・課題`,
      `${persona.characteristics.situations.join('、')}の状況での具体的なエピソード`,
      `このペルソナに適した成功事例・解決策`,
      `このペルソナが理解しやすい表現での実践的方法`
    ]

    // ペルソナタイプ別の特別指示
    switch(persona.informationNeeds.type) {
      case 'emotional':
        baseInstructions.push(
          `感情的な体験談と共感できるエピソード`,
          `同じ立場の人の気持ちや感情の変化`,
          `心理的な支えとなる励ましの要素`
        )
        break
      case 'logical':
        baseInstructions.push(
          `体系的で段階的な学習内容`,
          `理論的背景と実践的応用の組み合わせ`,
          `継続的な成長につながる長期計画`
        )
        break
      case 'practical':
        baseInstructions.push(
          `即座に実践できる具体的な手法`,
          `効果測定可能な実用的ツール`,
          `ROIや効率性を重視した実例`
        )
        break
    }

    return baseInstructions.map((item, index) => `${index + 1}. ${item}`).join('\n')
  }

  private generateInformationRequirements(persona: PersonaCategory): string {
    const requirements = []

    // 深度要件
    switch(persona.informationNeeds.depth) {
      case 'basic':
        requirements.push('初心者でも理解できる基礎的な内容')
        requirements.push('専門用語は避けて分かりやすく説明')
        break
      case 'intermediate':
        requirements.push('ある程度の経験を前提とした実用的な内容')
        requirements.push('具体的な実践方法と応用例')
        break
      case 'advanced':
        requirements.push('専門性の高い詳細な内容')
        requirements.push('最新トレンドと高度なテクニック')
        break
    }

    // フォーマット要件
    switch(persona.informationNeeds.format) {
      case 'step-by-step':
        requirements.push('段階的で順序立てられた手順')
        requirements.push('チェックリストや実行プランの形式')
        break
      case 'examples':
        requirements.push('豊富な具体例と成功事例')
        requirements.push('実際の数値や実績データ')
        break
      case 'theory':
        requirements.push('理論的背景と体系的な知識')
        requirements.push('概念の説明と応用可能性')
        break
      case 'experience':
        requirements.push('実体験に基づく生の情報')
        requirements.push('感情的な共感を得られる体験談')
        break
    }

    return requirements.map((item, index) => `- ${item}`).join('\n')
  }

  private generateLanguageRequirements(persona: PersonaCategory): string {
    const language = persona.characteristics.language
    const concerns = persona.characteristics.concerns

    return `
- このペルソナが使用する自然な表現: ${language.join('、')}
- このペルソナの悩みに対応した共感的な言葉遣い
- ${persona.informationNeeds.type === 'emotional' ? '感情に寄り添う温かい表現' : 
       persona.informationNeeds.type === 'logical' ? '論理的で明確な説明' : 
       '実用的で行動を促す具体的な表現'}
- 専門用語は${persona.informationNeeds.depth === 'basic' ? '避けて' : '適度に使用し'}、
  ${persona.informationNeeds.depth === 'basic' ? '親しみやすく' : '正確で信頼性の高い'}表現を心がける
`
  }
}
```

## 🎯 ペルソナ別プロンプト例

### 例1: 働く女性（悩み・共感型）× 「キャリアアップ方法」

```
【対象ペルソナ】働く女性（悩み・共感型）

【ペルソナの詳細状況】
- 基本属性: 20代後半-30代の女性、会社員
- 現在の状況: 悩み中
- 具体的な悩み: 職場での不平等、ライフイベント両立、将来不安、理不尽な扱い
- 使用する言葉: モヤモヤ、しんどい、疲れた、女性だから、私だって
- 関心領域: 共感、体験談、感情サポート、同世代の悩み
- 置かれている状況: 生理時の仕事、雑用押し付け、結婚プレッシャー、キャリア迷い
- モチベーション: 現状改善、共感獲得、精神的安定、解決策発見

【リサーチテーマ】キャリアアップ方法

【リサーチ指示】
1. このペルソナが「キャリアアップ方法」について実際に抱えている悩み・課題
2. 生理時の仕事、雑用押し付け、結婚プレッシャー、キャリア迷いの状況での具体的なエピソード
3. このペルソナに適した成功事例・解決策
4. このペルソナが理解しやすい表現での実践的方法
5. 感情的な体験談と共感できるエピソード
6. 同じ立場の人の気持ちや感情の変化
7. 心理的な支えとなる励ましの要素

【情報要件】
- 初心者でも理解できる基礎的な内容
- 専門用語は避けて分かりやすく説明
- 実体験に基づく生の情報
- 感情的な共感を得られる体験談

【表現・言葉遣い要件】
- このペルソナが使用する自然な表現: モヤモヤ、しんどい、疲れた、女性だから、私だって
- このペルソナの悩みに対応した共感的な言葉遣い
- 感情に寄り添う温かい表現
- 専門用語は避けて、親しみやすい表現を心がける

※投稿形式は一切指定せず、このペルソナに最適化された情報収集に特化してください
※抽象的な一般論ではなく、このペルソナの具体的な状況に根ざした情報を重視してください
```

### 例2: AI活用ビジネスパーソン（効率化型）× 「AI自動化ツール」

```
【対象ペルソナ】AI活用ビジネスパーソン（効率化型）

【ペルソナの詳細状況】
- 基本属性: 25-45歳の男性中心、フリーランス・会社員
- 現在の状況: AI活用中/検討中
- 具体的な悩み: 競争優位性、効率化、最新技術習得、収益向上
- 使用する言葉: 効率化、自動化、最新の、革新的な、競合優位
- 関心領域: AI技術、ツール活用、収益化、効率化手法
- 置かれている状況: ツール選定、業務効率化、競争激化、技術進歩
- モチベーション: 競争優位、効率向上、収益最大化、技術習得

【リサーチテーマ】AI自動化ツール

【リサーチ指示】
1. このペルソナが「AI自動化ツール」について実際に抱えている悩み・課題
2. ツール選定、業務効率化、競争激化、技術進歩の状況での具体的なエピソード
3. このペルソナに適した成功事例・解決策
4. このペルソナが理解しやすい表現での実践的方法
5. 即座に実践できる具体的な手法
6. 効果測定可能な実用的ツール
7. ROIや効率性を重視した実例

【情報要件】
- 専門性の高い詳細な内容
- 最新トレンドと高度なテクニック
- 豊富な具体例と成功事例
- 実際の数値や実績データ

【表現・言葉遣い要件】
- このペルソナが使用する自然な表現: 効率化、自動化、最新の、革新的な、競合優位
- このペルソナの悩みに対応した共感的な言葉遣い
- 実用的で行動を促す具体的な表現
- 専門用語は適度に使用し、正確で信頼性の高い表現を心がける

※投稿形式は一切指定せず、このペルソナに最適化された情報収集に特化してください
※抽象的な一般論ではなく、このペルソナの具体的な状況に根ざした情報を重視してください
```

## 📱 実装インターフェース

### API設計

```typescript
// リサーチプロンプト生成API
interface ResearchPromptAPI {
  POST /api/research-prompt/generate
  
  Request: {
    personaId: string           // "working-women-emotional"
    userTheme: string          // "キャリアアップ方法"
    postType?: string          // オプション：投稿タイプ指定
    customizations?: {         // カスタマイズオプション
      industry?: string
      specificSituation?: string
      urgency?: 'low' | 'medium' | 'high'
    }
  }

  Response: {
    success: boolean
    data: {
      researchPrompt: string
      personaData: PersonaCategory
      estimatedTokens: number
      suggestedKeywords: string[]
    }
    metadata: {
      promptId: string
      generatedAt: timestamp
      version: string
    }
  }
}
```

### フロントエンド統合

```typescript
// ペルソナ選択→プロンプト生成の統合フロー
class ResearchPromptWorkflow {
  async generateResearchPrompt(
    selectedPersona: string,
    userTheme: string
  ): Promise<string> {
    
    // ペルソナデータ取得
    const personaData = await this.getPersonaData(selectedPersona)
    
    // プロンプト生成
    const prompt = await this.promptGenerator.generatePrompt({
      selectedPersona,
      userTheme
    })
    
    // 生成されたプロンプトの検証
    this.validatePrompt(prompt, personaData)
    
    return prompt
  }
}
```

## 🎯 次のステップ

1. **8ペルソナ×主要テーマのプロンプトテンプレート作成**
2. **動的生成エンジンの実装**
3. **フォーマット段階システムとの連携設計**

これで3段階システムの①リサーチ段階の基盤が完成です！