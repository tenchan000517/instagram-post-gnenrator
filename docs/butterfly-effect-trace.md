# Instagram投稿生成システム - 蝶の羽ばたき効果完全トレース

## 🎯 入力データ（完全版）

```
【ジャンル】: strategy

志望動機が見つからない！内定獲得へ導く企業研究×自己分析攻略法！

□ 自己分析徹底！過去の経験から「自分軸」を発見
    *   過去の経験を棚卸しし、成功・失敗体験、興味をリストアップ。MBTIやストレングスファインダーで強み・弱みを客観的に把握し、家族・友人・キャリアセンターに意見を求める（ステップ1-3）。
    *   自己分析不足で抽象的な志望動機を作成してしまう失敗を回避。自己分析ツールや過去の経験の棚卸しを通じて、自分の強みや価値観を明確にしましょう。
    *   キャリアコンサルタントA氏「志望動機が思いつかない原因の一つは、自己分析の不足です。自分の強みや価値観を理解していないと、企業との接点を見つけることが難しくなります。」

□ 企業研究徹底！企業の魅力と自分の強みを繋げる
    *   企業のホームページ、IR情報、ニュースリリース、SNS、社員インタビューを参考に、事業内容、ビジョン、企業文化、求める人物像を収集。競合他社を分析し、業界動向を把握（ステップ1-3）。
    *   企業研究不足で表面的な情報だけで志望動機を作成してしまう失敗を回避。企業のホームページ、IR情報、SNSなどを活用し、企業を深く理解し、社員インタビューや説明会に参加しましょう。
    *   採用担当者B氏「企業のホームページだけでなく、IR情報や社員インタビューなどを参考に、企業の事業内容やビジョンを深く理解することが重要です。」

□ 自己分析と企業研究の融合！「なぜ、どのように」を具体的に説明
    *   自己分析と企業研究の結果を照らし合わせ、自分の強み、価値観、経験が、企業の求める人物像や事業内容とどのように合致するかを探す。具体的なエピソードを選定し、どのように貢献できるかを説明（ステップ1-3）。STAR法を活用し、状況（S）、課題（T）、行動（A）、結果（R）を記述。
    *   企業と自分の接点がない、単なる自己PRになってしまう失敗を回避。企業研究と自己分析を並行して行い、両者の共通点を探し、具体的なエピソードを用いて、どのように貢献できるかを説明しましょう。
    *   IT企業に内定したCさんの場合。自己分析で「問題解決能力」と「チームワーク」を強みと認識。企業研究では、そのIT企業が抱える課題と、Cさんの強みがどのように貢献できるかを具体的に説明し、内定を獲得。

□ テンプレートからの脱却！「自分らしさ」を表現
    *   テンプレートを参考にしつつ、自分の言葉で表現。自分の経験や価値観を盛り込み、オリジナリティのある志望動機を作成。
    *   テンプレートをそのまま使用し、オリジナリティのない志望動機を作成してしまう失敗を回避。テンプレートを参考にしつつ、自分の言葉で表現し、自分の経験や価値観を盛り込みましょう。

□ 最新トレンドを意識！多様性、デジタルスキル、SDGsへの貢献をアピール
    *   多様な価値観を重視する企業が増加。ITスキルやデータ分析能力など、デジタルスキルを持つ人材への需要が高まっている。SDGsへの貢献意欲を示す志望動機も評価される傾向。
    *   事実と異なることを述べたり、能力を誇張したりする失敗を回避。誠実に、事実に基づいた情報を伝えましょう。
    *   2023年卒の内定辞退率は55.1%。学生が企業とのミスマッチを感じ、自身の志望動機が曖昧なまま就職活動を進めている可能性を示唆。
```

## 🔄 完全フロートレース

### **ステップ1: 入力受け取り**

#### ファイル: `/app/components/ContentInput.tsx`
#### 関数: `useEffect(() => {}, [])`
#### 行: 25-35
```typescript
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const inputParam = urlParams.get('input')
  
  if (inputParam) {
    const decodedInput = decodeURIComponent(inputParam)
    setInput(decodedInput) // ← 上記完全テキストがinput stateに設定
  }
}, [])
```
#### 結果: `input` state = 上記の完全テキスト

---

### **ステップ2: 生成開始**

#### ファイル: `/app/components/NewFlowPostGenerator.tsx`
#### 関数: `handleGenerate()`
#### 行: 32-40
```typescript
const handleGenerate = async () => {
  setIsGenerating(true)
  setError(null)
  
  try {
    const result = await contentGeneratorService.generateHighQualityContent(input)
    // ← input（上記完全テキスト）をcontentGeneratorServiceに渡す
    setGeneratedContent(result)
  } catch (error) {
    setError(error.message)
  } finally {
    setIsGenerating(false)
  }
}
```

---

### **ステップ3: メイン生成サービス開始**

#### ファイル: `/app/services/contentGeneratorService.ts`
#### 関数: `generateHighQualityContent(userInput: string)`
#### 行: 62-85
```typescript
async generateHighQualityContent(userInput: string): Promise<GeneratedContent> {
  if (this.isGenerating) {
    throw new Error('AI生成が進行中です。少し待ってから再度お試しください。')
  }

  this.isGenerating = true
  
  try {
    console.log('🚀 2段階フロー開始...')
    
    // 1段階目: ページ構造決定
    console.log('📋 段階1: ページ構造分析中...')
    const pageStructureAnalyzer = new PageStructureAnalyzer()
    const pageStructures = await pageStructureAnalyzer.analyzePageStructureAndTemplates(userInput)
    // ← userInput（完全テキスト）をPageStructureAnalyzerに渡す
    
    console.log('✅ ページ構造決定完了:', pageStructures.length, 'ページ')
    
    // 2段階目: 全ページ一括生成
    console.log('🎨 段階2: 一括構造制約生成開始...')
    const structureConstrainedGenerator = new StructureConstrainedGenerator()
    
    const generatedPages = await structureConstrainedGenerator.generateAllPagesWithConstraints(userInput, pageStructures)
    // ← userInput（完全テキスト）とpageStructuresをStructureConstrainedGeneratorに渡す
```

---

### **ステップ4: ページ構造分析**

#### ファイル: `/app/services/pageStructureAnalyzer.ts`
#### 関数: `analyzePageStructureAndTemplates(input: string)`
#### 行: 18-50

#### 4-1: ジャンル抽出
```typescript
// 行: 20-30
const specifiedGenre = this.extractGenreFromInput(input)

// extractGenreFromInput() 内部
private extractGenreFromInput(input: string): Genre | null {
  const genrePattern = /【ジャンル】:\s*(\w+)/
  const match = input.match(genrePattern)
  return match ? match[1] as Genre : null
}
// 結果: specifiedGenre = 'strategy'
```

#### 4-2: ジャンル設定取得
```typescript
// 行: 37-43
if (specifiedGenre) {
  detectedGenre = specifiedGenre // 'strategy'
  confidence = 1.0
  console.log('🎯 ジャンル指定検出:', specifiedGenre)
} else {
  // 自動判定の処理
}

const genreConfig = getGenreConfig(detectedGenre)
```

#### 4-3: `/app/types/genre.ts` の `getGenreConfig('strategy')`
```typescript
// 行: 75-80
'strategy': {
  keywords: ['面接', '対策', 'ES', 'エントリーシート', '志望動機', '自己PR', '準備', '練習'],
  optimalItemRange: { min: 4, max: 6 },
  description: '面接・ES・試験対策の具体的指導'
}
// 結果: genreConfig.optimalItemRange = { min: 4, max: 6 }
```

#### 4-4: AIプロンプト生成と実行
```typescript
// 行: 45-134
const prompt = `
あなたはInstagram投稿構造の専門家です。以下のコンテンツを分析し、最適なページ構造を決定してください。

【ジャンル分析結果】
- 判定ジャンル: strategy
- 最適項目数: 4-6個

【分析ステップ】
1. コンテンツから有益性の高い情報を抽出
2. Instagram投稿に適した構造で分類
3. 各セクションに最適なテンプレートを選択（データ構造に基づく）
4. 視覚的魅力と読みやすさを考慮

【重要制約】
- 入力内容の情報のみ使用（推測・憶測禁止）
- **4-8ページの適切な分量**（充実した価値あるコンテンツを重視）
- テンプレート多様性を重視
- Instagram特化の簡潔性
- **ジャンル別最適項目数の必須遵守**: 4-6個の項目を必ず含める

【入力内容】
志望動機が見つからない！内定獲得へ導く企業研究×自己分析攻略法！

□ 自己分析徹底！過去の経験から「自分軸」を発見
    *   過去の経験を棚卸しし、成功・失敗体験、興味をリストアップ。MBTIやストレングスファインダーで強み・弱みを客観的に把握し、家族・友人・キャリアセンターに意見を求める（ステップ1-3）。
[... 完全な入力内容 ...]

【テンプレート選択指針】
**checklist-enhanced**: 各チェック項目に詳細説明がある準備リスト・手順リストがある場合
**section-items**: 複数カテゴリ+各項目説明がある場合（概要・まとめページに最適）
[... 他のテンプレート指針 ...]
`

const result = await this.model.generateContent(prompt)
```

#### 4-5: AI出力（実際のログから）
```json
[
  {
    "概要": "就活の第一歩！自己分析の重要性と具体的なステップを解説。過去の経験から強みを発見し、自己理解を深める方法を紹介。",
    "有益性": "自己分析の重要性を理解し、具体的なステップを踏むことで、自分自身の強みや価値観を明確にし、志望動機作成に役立てる。",
    "template": "section-items",
    "title": "自己分析徹底攻略！内定獲得への第一歩",
    "theme": "自己分析の基礎と実践"
  },
  {
    "概要": "企業研究の重要性と、企業の魅力と自分の強みを繋げる方法を解説。具体的な情報収集方法と、企業理解を深めるためのポイントを紹介。",
    "有益性": "企業研究の重要性を理解し、具体的な情報収集方法を学ぶことで、企業の求める人物像を把握し、効果的な志望動機を作成できるようになる。",
    "template": "section-items",
    "title": "企業研究徹底攻略！魅力的な志望動機作成術",
    "theme": "企業研究の基礎と実践"
  },
  {
    "概要": "自己分析と企業研究を融合させ、具体的なエピソードを用いて、どのように貢献できるかを説明する方法を解説。STAR法を活用した効果的なアピール方法を紹介。",
    "有益性": "自己分析と企業研究の結果を融合させることで、企業が求める人物像と自分の強みを結びつけ、効果的な自己PRができるようになる。",
    "template": "section-items",
    "title": "自己分析×企業研究！最強の志望動機作成術",
    "theme": "自己分析と企業研究の融合"
  },
  {
    "概要": "テンプレートを活用しつつ、自分らしさを表現し、オリジナリティのある志望動機を作成する方法を解説。最新トレンドを取り入れ、多様性、デジタルスキル、SDGsへの貢献をアピールする。",
    "有益性": "テンプレートを参考にしつつ、自分の言葉で表現することで、オリジナリティのある志望動機を作成し、面接官の印象に残るようにする。",
    "template": "section-items",
    "title": "自分らしさ全開！内定を掴む志望動機作成術",
    "theme": "オリジナリティとトレンド"
  }
]
```

#### 4-6: JSON解析結果
```typescript
// 行: 141-150
const cleanText = text.replace(/```json\n?|```\n?/g, '').trim()
const parsed = JSON.parse(cleanText)

console.log('✅ PageStructureAnalyzer - パース済み:', parsed)

return parsed as PageStructure[]
```
#### 結果: 4ページ全て template: "section-items"

---

### **ステップ5: 構造制約コンテンツ生成**

#### ファイル: `/app/services/structureConstrainedGenerator.ts`
#### 関数: `generateAllPagesWithConstraints(originalInput, pageStructures)`
#### 行: 13-95

#### 5-1: テンプレート構造要件取得
```typescript
// 行: 19-29
const templateStructureInstructions = pageStructures.map((ps, i) => {
  const structurePrompt = TemplateStructureDefinitions.generateStructurePrompt(ps.template)
  return `
========================================
ページ${i + 1}: ${ps.title}
テンプレート: ${ps.template}
テーマ: ${ps.theme}

${structurePrompt}
========================================`
}).join('\n')
```

#### 5-2: `/app/services/templateStructureDefinitions.ts`
#### 関数: `generateStructurePrompt('section-items')`
```typescript
// 行: 150-200付近（section-itemsの定義）
'section-items': {
  description: 'セクション+アクション項目構造',
  dataStructure: {
    title: 'string',
    sections: '[{title: string, content: string, items: string[]}]',
    badgeText: 'string (optional)'
  },
  example: {
    title: 'キャリア設計の基本',
    sections: [
      {
        title: '自己理解を深める',
        content: '自分の価値観、興味、能力を客観的に分析し、将来のキャリアビジョンを明確にする重要な第一歩。',
        items: ['価値観の明確化', '興味・関心の整理', '能力・スキルの棚卸し']
      }
    ],
    badgeText: 'キャリア'
  },
  // 構造要件の詳細指示を返す
}
```

#### 5-3: AI一括生成プロンプト
```typescript
// 行: 31-62
const prompt = `
以下の入力内容と決定済みページ構造に基づいて、全ページのコンテンツを一括生成してください。

【元入力内容】
志望動機が見つからない！内定獲得へ導く企業研究×自己分析攻略法！
[... 完全な入力内容 ...]

【決定済みページ構造 + 完全なテンプレート構造要件】
========================================
ページ1: 自己分析徹底攻略！内定獲得への第一歩
テンプレート: section-items
[... section-itemsの詳細構造要件 ...]
========================================
ページ2: 企業研究徹底攻略！魅力的な志望動機作成術
テンプレート: section-items
[... section-itemsの詳細構造要件 ...]
========================================
ページ3: 自己分析×企業研究！最強の志望動機作成術
テンプレート: section-items
[... section-itemsの詳細構造要件 ...]
========================================
ページ4: 自分らしさ全開！内定を掴む志望動機作成術
テンプレート: section-items
[... section-itemsの詳細構造要件 ...]
========================================

【🚨 最重要制約 🚨】
- 元入力の内容のみ使用（推測・憶測・外部情報禁止）
- 各テンプレートの構造要件に100%適合（フィールド名、データ型を正確に）
- 絵文字使用禁止（テキストのみ）

const result = await this.model.generateContent(prompt)
```

#### 5-4: AI生成結果（実際のログから）
```json
{
  "pages": [
    {
      "pageNumber": 1,
      "title": "自己分析徹底攻略！内定獲得への第一歩",
      "templateType": "section-items",
      "content": {
        "title": "自己分析で「自分軸」を発見！",
        "sections": [
          {
            "title": "過去の経験を棚卸し",
            "content": "成功・失敗体験、興味をリストアップ。MBTIやストレングスファインダーで強み・弱みを客観的に把握し、家族・友人・キャリアセンターに意見を求める（ステップ1-3）。",
            "items": [
              "過去の経験をリストアップ",
              "MBTI/ストレングスファインダーで自己分析",
              "家族・友人・キャリアセンターに意見を求める"
            ]
          }
        ],
        "badgeText": "自己分析"
      }
    },
    {
      "pageNumber": 2,
      "title": "企業研究徹底攻略！魅力的な志望動機作成術",
      "templateType": "section-items",
      "content": {
        "title": "企業の魅力と自分の強みを繋げる！",
        "sections": [
          {
            "title": "企業研究の基本",
            "content": "企業のホームページ、IR情報、ニュースリリース、SNS、社員インタビューを参考に、事業内容、ビジョン、企業文化、求める人物像を収集。競合他社を分析し、業界動向を把握（ステップ1-3）。",
            "items": [
              "企業のホームページをチェック",
              "IR情報、ニュースリリースを分析",
              "SNSや社員インタビューを参考にする"
            ]
          }
        ],
        "badgeText": "企業研究"
      }
    },
    {
      "pageNumber": 3,
      "title": "自己分析×企業研究！最強の志望動機作成術",
      "templateType": "section-items",
      "content": {
        "title": "「なぜ、どのように」を具体的に説明！",
        "sections": [
          {
            "title": "自己分析と企業研究の融合",
            "content": "自己分析と企業研究の結果を照らし合わせ、自分の強み、価値観、経験が、企業の求める人物像や事業内容とどのように合致するかを探す。具体的なエピソードを選定し、どのように貢献できるかを説明（ステップ1-3）。STAR法を活用し、状況（S）、課題（T）、行動（A）、結果（R）を記述。",
            "items": [
              "強みと企業の求める人物像を照合",
              "具体的なエピソードで説明",
              "STAR法を活用"
            ]
          }
        ],
        "badgeText": "自己分析×企業研究"
      }
    },
    {
      "pageNumber": 4,
      "title": "自分らしさ全開！内定を掴む志望動機作成術",
      "templateType": "section-items",
      "content": {
        "title": "テンプレートからの脱却！",
        "sections": [
          {
            "title": "オリジナリティを表現！",
            "content": "テンプレートを参考にしつつ、自分の言葉で表現。自分の経験や価値観を盛り込み、オリジナリティのある志望動機を作成。",
            "items": [
              "テンプレートを参考に",
              "自分の言葉で表現",
              "経験や価値観を盛り込む"
            ]
          }
        ],
        "badgeText": "自分らしさ"
      }
    }
  ]
}
```

#### 5-5: JSON解析処理
```typescript
// 行: 71-80
const parsed = this.parseGeneratedJSON(text)

// parseGeneratedJSON() 内部処理
private parseGeneratedJSON(text: string): any {
  const cleanText = text.replace(/```json\n?|```\n?/g, '').trim()
  return JSON.parse(cleanText)
}

const pagesWithPageNumbers = parsed.pages.map((page: any, index: number) => {
  page.pageNumber = index + 1
  return page
})

return pagesWithPageNumbers as GeneratedPage[]
```

---

### **ステップ6: データ変換処理**

#### ファイル: `/app/services/contentGeneratorService.ts`
#### 関数: `convertToTemplateData(content, templateType)`
#### 行: 528-795

#### 各ページの変換処理（ページ1の例）
```typescript
// 行: 688-720付近（section-itemsのcase）
case 'section-items':
  const result = {
    title: content.title || '',                    // "自己分析で「自分軸」を発見！"
    content: content.content || '',                // ""
    description: content.description || '',        // ""
    subtitle: content.subtitle || '',              // ""
    badgeText: content.badgeText || '',            // "自己分析"
    items: content.items || [],                    // []
    sections: content.sections || [],              // [{ title: "過去の経験を棚卸し", content: "成功・失敗体験...", items: [...] }]
    steps: [],
    checklistItems: [],
    tableData: { headers: [], rows: [] },
    points: [],
    checklist: [],
    twoColumn: { left: [], right: [] },
    rankingData: [],
    graphData: null
  }
  
  console.log('📤 convertToTemplateData完了（完璧優先版） - templateType: section-items')
  console.log('📤 出力データ:', result)
  
  return result
```

#### 変換後のTemplateData（ページ1）
```typescript
{
  title: "自己分析徹底攻略！内定獲得への第一歩",
  content: "",
  description: "",
  subtitle: "",
  badgeText: "自己分析",
  items: [],
  sections: [
    {
      title: "過去の経験を棚卸し",
      content: "成功・失敗体験、興味をリストアップ。MBTIやストレングスファインダーで強み・弱みを客観的に把握し、家族・友人・キャリアセンターに意見を求める（ステップ1-3）。",
      items: [
        "過去の経験をリストアップ",
        "MBTI/ストレングスファインダーで自己分析",
        "家族・友人・キャリアセンターに意見を求める"
      ]
    }
  ],
  steps: [],
  checklistItems: [],
  tableData: { headers: [], rows: [] },
  points: [],
  checklist: [],
  twoColumn: { left: [], right: [] },
  rankingData: [],
  graphData: null
}
```

---

### **ステップ7: テンプレート表示**

#### ファイル: `/app/components/EditablePostGenerator.tsx`
#### 関数: `renderCurrentPage()`
#### 行: 450-470付近
```typescript
const renderCurrentPage = () => {
  if (!generatedContent || !generatedContent.pages || generatedContent.pages.length === 0) {
    return null
  }

  const currentPage = generatedContent.pages[currentPageIndex]
  const SelectedTemplate = templateComponents[currentPage.templateType]
  // SelectedTemplate = SectionItemsTemplate（全ページ共通）

  if (!SelectedTemplate) {
    return <div>テンプレートが見つかりません: {currentPage.templateType}</div>
  }

  return (
    <SelectedTemplate 
      templateData={currentPage.templateData}
      // templateData = 上記のTemplateData
    />
  )
}
```

#### ファイル: `/app/components/templates/SectionItemsTemplate.tsx`
#### 関数: `SectionItemsTemplate` React Component
```tsx
export const SectionItemsTemplate: React.FC<TemplateProps> = ({ templateData }) => {
  return (
    <InstagramPostTemplate>
      <div className="h-full flex flex-col justify-between p-6 relative">
        
        {/* メインタイトル表示 */}
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-center mb-4">
            {templateData.title}
            {/* 表示される内容: "自己分析徹底攻略！内定獲得への第一歩" */}
          </h1>

          {/* バッジ表示 */}
          {templateData.badgeText && (
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium text-center mb-4">
              {templateData.badgeText}
              {/* 表示される内容: "自己分析" */}
            </div>
          )}

          {/* セクション一覧表示 */}
          {templateData.sections?.map((section, index) => (
            <div key={index} className="bg-white/90 rounded-lg p-4 shadow-sm mb-4">
              
              {/* セクションタイトル */}
              <h2 className="font-bold text-lg text-blue-600 mb-2">
                {section.title}
                {/* 表示される内容: "過去の経験を棚卸し" */}
              </h2>
              
              {/* セクション説明 */}
              <p className="text-sm text-gray-700 mb-3">
                {section.content}
                {/* 表示される内容: "成功・失敗体験、興味をリストアップ。MBTIやストレングスファインダーで強み・弱みを客観的に把握し、家族・友人・キャリアセンターに意見を求める（ステップ1-3）。" */}
              </p>
              
              {/* アイテム一覧 */}
              {section.items && section.items.length > 0 && (
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      <span className="text-sm text-gray-600">
                        {item}
                        {/* 
                        itemIndex=0: "過去の経験をリストアップ"
                        itemIndex=1: "MBTI/ストレングスファインダーで自己分析"
                        itemIndex=2: "家族・友人・キャリアセンターに意見を求める"
                        */}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </InstagramPostTemplate>
  )
}
```

---

## 🎯 最終表示結果

### **ページ1の実際の表示内容**

#### メインタイトル（h1.text-xl.font-bold.text-center）
```
自己分析徹底攻略！内定獲得への第一歩
```

#### バッジ（div.bg-blue-500.text-white.px-3.py-1.rounded-full）
```
自己分析
```

#### セクションタイトル（h2.font-bold.text-lg.text-blue-600）
```
過去の経験を棚卸し
```

#### セクション説明（p.text-sm.text-gray-700）
```
成功・失敗体験、興味をリストアップ。MBTIやストレングスファインダーで強み・弱みを客観的に把握し、家族・友人・キャリアセンターに意見を求める（ステップ1-3）。
```

#### アイテム一覧（li > span.text-sm.text-gray-600）
```
• 過去の経験をリストアップ
• MBTI/ストレングスファインダーで自己分析  
• 家族・友人・キャリアセンターに意見を求める
```

### **他3ページも同様のSectionItemsTemplateで表示**
- ページ2: 企業研究の内容
- ページ3: 融合アプローチの内容  
- ページ4: オリジナリティ表現の内容

---

## 🦋 蝶の羽ばたき効果の具体例

### **もし genre.ts の1行を変更したら**
```typescript
// 行: 75-80
'strategy': {
  optimalItemRange: { min: 4, max: 6 } → { min: 3, max: 5 }
}
```

#### 影響範囲:
1. **PageStructureAnalyzer.ts:43** - genreConfig.optimalItemRange変更
2. **AIプロンプト内容変更** - "4-6個" → "3-5個"  
3. **AI判定基準変更** - ページ数・項目数の判断基準変更
4. **生成コンテンツ変更** - sections[].items配列の要素数変更
5. **最終表示変更** - li要素の個数変更

### **もし SectionItemsTemplate.tsx の1つのclassNameを変更したら**
```tsx
// 変更例
<span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      ↓
<span className="w-3 h-3 bg-red-400 rounded-full"></span>
```

#### 影響:
- 全4ページのアイテム一覧の装飾（青い小丸 → 赤い中丸）が変更
- 視覚的一貫性への影響

---

これが「蝶の羽ばたき」レベルでの完全なシステム理解です。