# 実際の実行トレース - strategyジャンル志望動機攻略法

## 📋 入力データ

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

---

## 🔄 実際の実行トレース

### **段階1: ContentInput.tsx - 入力受け取り**

#### 処理ファイル: `/app/components/ContentInput.tsx`
#### 処理関数: `useEffect(() => { ... }, [])`

```typescript
// URLパラメータチェック
const urlParams = new URLSearchParams(window.location.search)
const inputParam = urlParams.get('input')

// または LocalStorage チェック
const storedResult = localStorage.getItem('formatted-result')

// 最終的に上記テキストが input state に設定される
setInput(decodeURIComponent(inputParam) || storedResult)
```

**結果**: input state に上記の【ジャンル】: strategy付きテキストが設定

---

### **段階2: NewFlowPostGenerator.tsx - メインフロー開始**

#### 処理ファイル: `/app/components/NewFlowPostGenerator.tsx`
#### 処理関数: `handleGenerate()`

```typescript
const handleGenerate = async () => {
  const result = await contentGeneratorService.generateHighQualityContent(input)
  setGeneratedContent(result)
}
```

**実行**: `ContentGeneratorService.generateHighQualityContent()` に上記テキストを渡す

---

### **段階3: ContentGeneratorService.ts - 2段階フロー開始**

#### 処理ファイル: `/app/services/contentGeneratorService.ts`
#### 処理関数: `generateHighQualityContent(userInput: string)`

```typescript
// 1段階目: ページ構造決定
const pageStructureAnalyzer = new PageStructureAnalyzer()
const pageStructures = await pageStructureAnalyzer.analyzePageStructureAndTemplates(userInput)

// 2段階目: 一括構造制約生成
const structureConstrainedGenerator = new StructureConstrainedGenerator()
const generatedPages = await structureConstrainedGenerator.generateAllPagesWithConstraints(userInput, pageStructures)
```

---

### **段階4: PageStructureAnalyzer.ts - ジャンル判定・ページ構造決定**

#### 処理ファイル: `/app/services/pageStructureAnalyzer.ts`
#### 処理関数: `analyzePageStructureAndTemplates(input: string)`

#### 4-1: ジャンル抽出
```typescript
// extractGenreFromInput() 実行
const genrePattern = /【ジャンル】:\s*(\w+)/
const match = input.match(genrePattern)
// 結果: 'strategy' を抽出
```

#### 4-2: ジャンル設定取得
```typescript
// /app/types/genre.ts から
const genreConfig = getGenreConfig('strategy')
// 結果: { optimalItemRange: { min: 4, max: 6 }, ... }
```

#### 4-3: AI呼び出し（Gemini API）
```typescript
const prompt = `
あなたはInstagram投稿構造の専門家です。以下のコンテンツを分析し、最適なページ構造を決定してください。

【ジャンル分析結果】
- 判定ジャンル: strategy
- 最適項目数: 4-6個

【入力内容】
志望動機が見つからない！内定獲得へ導く企業研究×自己分析攻略法！
[... 全入力内容 ...]

【テンプレート選択指針】
**checklist-enhanced**: 各チェック項目に詳細説明がある準備リスト・手順リストがある場合
**two-column-section-items**: 2つのカテゴリーの比較・分類（「比較」「2つ」「カテゴリー」「分類」「準備と実行」「段階」キーワード）
**section-items**: 複数カテゴリ+各項目説明がある場合（概要・まとめページに最適）
[... その他テンプレート選択指針 ...]
`

const result = await this.model.generateContent(prompt)
```

#### 4-4: AI出力予測（PageStructure[]）
```json
[
  {
    "概要": "志望動機作成の第一歩となる自己分析の重要性と具体的手順を解説",
    "有益性": "自分の強みや価値観を明確にし、企業との接点を見つける基盤作り",
    "template": "checklist-enhanced",
    "title": "自己分析で「自分軸」発見！志望動機の土台作り",
    "theme": "自己分析の実践方法"
  },
  {
    "概要": "企業研究の効果的な進め方と情報収集のポイントを詳細解説",
    "有益性": "企業理解を深め、説得力ある志望動機作成につなげる",
    "template": "checklist-enhanced", 
    "title": "企業研究徹底攻略！魅力発見のチェックポイント",
    "theme": "企業研究の実践方法"
  },
  {
    "概要": "自己分析と企業研究を融合し、STAR法を使った具体的アピール方法",
    "有益性": "説得力ある志望動機を構築し、面接での差別化を図る",
    "template": "section-items",
    "title": "自己分析×企業研究！最強志望動機の作成術",
    "theme": "融合アプローチ"
  },
  {
    "概要": "志望動機作成で避けるべき失敗パターンと成功のコツ",
    "有益性": "よくある失敗を回避し、オリジナリティあふれる志望動機を作成",
    "template": "two-column-section-items",
    "title": "志望動機の成功パターン vs 失敗パターン",
    "theme": "成功と失敗の分析"
  }
]
```

---

### **段階5: StructureConstrainedGenerator.ts - コンテンツ生成**

#### 処理ファイル: `/app/services/structureConstrainedGenerator.ts`
#### 処理関数: `generateAllPagesWithConstraints()`

#### 5-1: テンプレート構造要件取得
```typescript
// templateStructureDefinitions.ts から各テンプレートの構造要件を取得
const structurePrompt1 = TemplateStructureDefinitions.generateStructurePrompt('checklist-enhanced')
const structurePrompt2 = TemplateStructureDefinitions.generateStructurePrompt('section-items')
const structurePrompt3 = TemplateStructureDefinitions.generateStructurePrompt('two-column-section-items')
```

#### 5-2: AI呼び出し（一括生成）
```typescript
const prompt = `
以下の入力内容と決定済みページ構造に基づいて、全ページのコンテンツを一括生成してください。

【元入力内容】
志望動機が見つからない！内定獲得へ導く企業研究×自己分析攻略法！
[... 全入力内容 ...]

【決定済みページ構造 + 完全なテンプレート構造要件】
ページ1: 自己分析で「自分軸」発見！志望動機の土台作り
テンプレート: checklist-enhanced
[... checklist-enhanced の詳細構造要件 ...]

ページ2: 企業研究徹底攻略！魅力発見のチェックポイント  
テンプレート: checklist-enhanced
[... checklist-enhanced の詳細構造要件 ...]

ページ3: 自己分析×企業研究！最強志望動機の作成術
テンプレート: section-items
[... section-items の詳細構造要件 ...]

ページ4: 志望動機の成功パターン vs 失敗パターン
テンプレート: two-column-section-items
[... two-column-section-items の詳細構造要件 ...]
`

const result = await this.model.generateContent(prompt)
```

#### 5-3: AI出力予測（GeneratedPage[]）
```json
{
  "pages": [
    {
      "pageNumber": 1,
      "title": "自己分析で「自分軸」発見！志望動機の土台作り",
      "templateType": "checklist-enhanced",
      "content": {
        "title": "自己分析で「自分軸」発見！志望動機の土台作り",
        "checklistItems": [
          {
            "text": "過去の経験を徹底棚卸し（成功・失敗・興味分析）",
            "description": "学業、部活、アルバイト、趣味の経験をリストアップ。どんな時にモチベーションを感じ、何に苦労したかを振り返り、パターンを発見する。"
          },
          {
            "text": "自己分析ツールで客観的な強み・弱み把握",
            "description": "MBTI、ストレングスファインダー、適職診断などを活用。複数ツールの結果を比較し、共通点を見つけて自分の特性を客観視する。"
          },
          {
            "text": "周囲からのフィードバック収集（360度評価）",
            "description": "家族、友人、先輩、キャリアセンター職員に意見を求める。自分では気づかない強みや改善点を発見し、多角的な自己理解を深める。"
          },
          {
            "text": "価値観・信念の明確化と言語化",
            "description": "大切にしている価値観、将来のビジョン、働く上で重視したいことを明文化。企業選択の軸となる「自分らしさ」を定義する。"
          }
        ]
      }
    },
    {
      "pageNumber": 2,
      "title": "企業研究徹底攻略！魅力発見のチェックポイント",
      "templateType": "checklist-enhanced",
      "content": {
        "title": "企業研究徹底攻略！魅力発見のチェックポイント",
        "checklistItems": [
          {
            "text": "公式情報の網羅的収集（HP・IR・ニュース）",
            "description": "企業HP、IR情報、ニュースリリース、採用サイトを徹底調査。事業内容、財務状況、将来戦略、企業文化を多角的に理解する。"
          },
          {
            "text": "競合分析で企業の独自性・強みを発見",
            "description": "同業他社と比較し、その企業ならではの特徴や競争優位性を特定。業界内でのポジションと差別化要因を明確にする。"
          },
          {
            "text": "社員の生の声収集（インタビュー・説明会）",
            "description": "社員インタビュー記事、OB・OG訪問、会社説明会に積極参加。実際の働き方、やりがい、課題を直接聞き、リアルな企業像を把握。"
          },
          {
            "text": "業界動向・将来性の徹底分析",
            "description": "業界レポート、市場調査、専門メディアで業界トレンドを調査。企業の将来性と成長可能性を客観的に評価する。"
          }
        ]
      }
    },
    {
      "pageNumber": 3,
      "title": "自己分析×企業研究！最強志望動機の作成術",
      "templateType": "section-items",
      "content": {
        "title": "自己分析×企業研究！最強志望動機の作成術",
        "sections": [
          {
            "title": "強みと企業ニーズのマッチング分析",
            "content": "自己分析で発見した強みと、企業研究で明らかになった求める人物像を照合。どの強みがどの業務に活かせるかを具体的に分析する。",
            "items": [
              "強み・価値観と企業理念の接点発見",
              "スキル・経験と業務内容のマッチング確認",
              "将来ビジョンと企業キャリアパスの整合性検証"
            ]
          },
          {
            "title": "STAR法による具体的エピソード構築",
            "content": "状況（Situation）、課題（Task）、行動（Action）、結果（Result）の枠組みで、強みを裏付ける具体的エピソードを構築する。",
            "items": [
              "状況設定：背景と課題の明確な説明",
              "具体的行動：自分が取った行動の詳細描写", 
              "成果・学び：定量的結果と得られた気づき"
            ]
          }
        ]
      }
    },
    {
      "pageNumber": 4,
      "title": "志望動機の成功パターン vs 失敗パターン",
      "templateType": "two-column-section-items",
      "content": {
        "title": "志望動機の成功パターン vs 失敗パターン",
        "leftColumn": {
          "title": "✅ 成功パターン",
          "sections": [
            {
              "title": "オリジナリティあふれる表現",
              "items": [
                "自分の言葉で体験を語る",
                "具体的なエピソード・数値を含む",
                "企業との明確な接点を示す"
              ]
            },
            {
              "title": "論理的で説得力ある構成",
              "items": [
                "根拠→結論の明確な流れ",
                "STAR法での体系的説明", 
                "企業への貢献を具体的に提示"
              ]
            }
          ]
        },
        "rightColumn": {
          "title": "❌ 失敗パターン",
          "sections": [
            {
              "title": "ありきたりなテンプレート使用",
              "items": [
                "どの企業にも当てはまる内容",
                "抽象的で曖昧な表現",
                "企業研究不足が露呈"
              ]
            },
            {
              "title": "自己PRと志望動機の混同",
              "items": [
                "企業との接点が不明確",
                "一方的な自分語り",
                "企業への貢献が見えない"
              ]
            }
          ]
        }
      }
    }
  ]
}
```

---

### **段階6: ContentGeneratorService.ts - データ変換**

#### 処理ファイル: `/app/services/contentGeneratorService.ts`
#### 処理関数: `convertToTemplateData(content, templateType)`

#### 6-1: checklist-enhanced テンプレート変換
```typescript
case 'checklist-enhanced':
  return {
    title: content.title || '',
    content: content.content || '',
    description: content.description || '',
    subtitle: content.subtitle || '',
    badgeText: content.badgeText || '',
    checklistItems: content.checklistItems || [],
    // ... 他のフィールドは空配列・null
  }
```

#### 6-2: section-items テンプレート変換
```typescript
case 'section-items':
  return {
    title: content.title || '',
    content: content.content || '',
    description: content.description || '',
    subtitle: content.subtitle || '',
    badgeText: content.badgeText || '',
    sections: content.sections || [],
    // ... 他のフィールドは空配列・null
  }
```

#### 6-3: two-column-section-items テンプレート変換
```typescript
case 'two-column-section-items':
  return {
    title: content.title || '',
    content: content.content || '',
    description: content.description || '',
    subtitle: content.subtitle || '',
    badgeText: content.badgeText || '',
    leftColumn: content.leftColumn || { title: '', sections: [] },
    rightColumn: content.rightColumn || { title: '', sections: [] },
    // ... 他のフィールドは空配列・null
  }
```

---

### **段階7: AI呼び出し（キャプション・ハッシュタグ生成）**

#### 処理ファイル: `/app/services/contentGeneratorService.ts`
#### 処理関数: `generateCaptionWithFormat()` & ハッシュタグ生成

#### 7-1: キャプション生成プロンプト
```typescript
const captionPrompt = `
以下のInstagram投稿内容から、魅力的なキャプションを作成してください。

【投稿内容】
ページ1: 自己分析で「自分軸」発見！志望動機の土台作り
ページ2: 企業研究徹底攻略！魅力発見のチェックポイント
ページ3: 自己分析×企業研究！最強志望動機の作成術
ページ4: 志望動機の成功パターン vs 失敗パターン

【形式】
@find_to_do←他の投稿はこちら
━━━━━━━━━━━━━━━━━━━━

✅各ページタイトルを魅力的にまとめ
[各ページの要約]

志望動機作成で迷っているあなたへ、内定獲得への確実なステップをお届けします！
`
```

#### 7-2: ハッシュタグ生成
```typescript
const hashtagPrompt = `
志望動機、自己分析、企業研究、就活対策に関する最適なハッシュタグを生成してください。

大カテゴリ（#就活 #志望動機 #自己分析）
中カテゴリ（#企業研究 #面接対策 #内定獲得）
小カテゴリ（#STAR法 #キャリア分析 #就活生）
`
```

---

### **段階8: 最終出力（GeneratedContent）**

#### 処理結果: `GeneratedContent` オブジェクト
```typescript
{
  pages: [
    {
      pageNumber: 1,
      templateType: 'checklist-enhanced',
      templateData: {
        title: '自己分析で「自分軸」発見！志望動機の土台作り',
        checklistItems: [
          {
            text: '過去の経験を徹底棚卸し（成功・失敗・興味分析）',
            description: '学業、部活、アルバイト、趣味の経験をリストアップ。どんな時にモチベーションを感じ、何に苦労したかを振り返り、パターンを発見する。'
          },
          // ... 4項目
        ],
        // 他のフィールドは空
      }
    },
    {
      pageNumber: 2,
      templateType: 'checklist-enhanced',
      templateData: {
        title: '企業研究徹底攻略！魅力発見のチェックポイント',
        checklistItems: [
          {
            text: '公式情報の網羅的収集（HP・IR・ニュース）',
            description: '企業HP、IR情報、ニュースリリース、採用サイトを徹底調査。事業内容、財務状況、将来戦略、企業文化を多角的に理解する。'
          },
          // ... 4項目
        ]
      }
    },
    {
      pageNumber: 3,
      templateType: 'section-items',
      templateData: {
        title: '自己分析×企業研究！最強志望動機の作成術',
        sections: [
          {
            title: '強みと企業ニーズのマッチング分析',
            content: '自己分析で発見した強みと、企業研究で明らかになった求める人物像を照合...',
            items: [
              '強み・価値観と企業理念の接点発見',
              'スキル・経験と業務内容のマッチング確認',
              '将来ビジョンと企業キャリアパスの整合性検証'
            ]
          },
          {
            title: 'STAR法による具体的エピソード構築',
            content: '状況（Situation）、課題（Task）、行動（Action）、結果（Result）の枠組みで...',
            items: [
              '状況設定：背景と課題の明確な説明',
              '具体的行動：自分が取った行動の詳細描写',
              '成果・学び：定量的結果と得られた気づき'
            ]
          }
        ]
      }
    },
    {
      pageNumber: 4,
      templateType: 'two-column-section-items',
      templateData: {
        title: '志望動機の成功パターン vs 失敗パターン',
        leftColumn: {
          title: '✅ 成功パターン',
          sections: [
            {
              title: 'オリジナリティあふれる表現',
              items: [
                '自分の言葉で体験を語る',
                '具体的なエピソード・数値を含む',
                '企業との明確な接点を示す'
              ]
            },
            {
              title: '論理的で説得力ある構成',
              items: [
                '根拠→結論の明確な流れ',
                'STAR法での体系的説明',
                '企業への貢献を具体的に提示'
              ]
            }
          ]
        },
        rightColumn: {
          title: '❌ 失敗パターン',
          sections: [
            {
              title: 'ありきたりなテンプレート使用',
              items: [
                'どの企業にも当てはまる内容',
                '抽象的で曖昧な表現',
                '企業研究不足が露呈'
              ]
            },
            {
              title: '自己PRと志望動機の混同',
              items: [
                '企業との接点が不明確',
                '一方的な自分語り',
                '企業への貢献が見えない'
              ]
            }
          ]
        }
      }
    }
  ],
  totalPages: 4,
  caption: "志望動機で悩むあなたへ、内定獲得の確実なステップ...",
  hashtags: {
    primary: ['#志望動機', '#自己分析', '#企業研究'],
    secondary: ['#就活対策', '#面接準備', '#内定獲得'],
    // ...
  }
}
```

---

### **段階9: テンプレート表示**

#### 処理ファイル: `/app/components/EditablePostGenerator.tsx`
#### 処理関数: `renderCurrentPage()`

```typescript
const SelectedTemplate = templateComponents[currentPage.templateType]
return (
  <SelectedTemplate templateData={currentPage.templateData} />
)
```

#### 9-1: ChecklistEnhancedTemplate.tsx（ページ1・2）
```tsx
// /app/components/templates/ChecklistEnhancedTemplate.tsx
export const ChecklistEnhancedTemplate: React.FC<TemplateProps> = ({ templateData }) => {
  return (
    <InstagramPostTemplate>
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-center">
          {templateData.title} // "自己分析で「自分軸」発見！志望動機の土台作り"
        </h1>
        
        {templateData.checklistItems?.map((item, index) => (
          <div key={index} className="bg-white/90 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 border-2 border-blue-400 rounded"></div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {item.text} // "過去の経験を徹底棚卸し（成功・失敗・興味分析）"
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.description} // "学業、部活、アルバイト、趣味の経験をリストアップ..."
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InstagramPostTemplate>
  )
}
```

#### 9-2: SectionItemsTemplate.tsx（ページ3）
```tsx
// /app/components/templates/SectionItemsTemplate.tsx
export const SectionItemsTemplate: React.FC<TemplateProps> = ({ templateData }) => {
  return (
    <InstagramPostTemplate>
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-center">
          {templateData.title} // "自己分析×企業研究！最強志望動機の作成術"
        </h1>
        
        {templateData.sections?.map((section, index) => (
          <div key={index} className="bg-white/90 rounded-lg p-4">
            <h2 className="font-bold text-lg text-blue-600 mb-2">
              {section.title} // "強みと企業ニーズのマッチング分析"
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              {section.content} // "自己分析で発見した強みと、企業研究で明らかになった..."
            </p>
            <ul className="space-y-1">
              {section.items?.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  <span className="text-sm text-gray-600">
                    {item} // "強み・価値観と企業理念の接点発見"
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </InstagramPostTemplate>
  )
}
```

#### 9-3: TwoColumnSectionItemsTemplate.tsx（ページ4）
```tsx
// /app/components/templates/TwoColumnSectionItemsTemplate.tsx
export const TwoColumnSectionItemsTemplate: React.FC<TemplateProps> = ({ templateData }) => {
  return (
    <InstagramPostTemplate>
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-center">
          {templateData.title} // "志望動機の成功パターン vs 失敗パターン"
        </h1>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 左カラム */}
          <div className="bg-green-50 rounded-lg p-4">
            <h2 className="font-bold text-green-700 mb-3">
              {templateData.leftColumn?.title} // "✅ 成功パターン"
            </h2>
            {templateData.leftColumn?.sections?.map((section, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-sm text-green-600 mb-1">
                  {section.title} // "オリジナリティあふれる表現"
                </h3>
                <ul className="space-y-1">
                  {section.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-xs text-green-700">
                      • {item} // "自分の言葉で体験を語る"
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* 右カラム */}
          <div className="bg-red-50 rounded-lg p-4">
            <h2 className="font-bold text-red-700 mb-3">
              {templateData.rightColumn?.title} // "❌ 失敗パターン"
            </h2>
            {templateData.rightColumn?.sections?.map((section, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-semibold text-sm text-red-600 mb-1">
                  {section.title} // "ありきたりなテンプレート使用"
                </h3>
                <ul className="space-y-1">
                  {section.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-xs text-red-700">
                      • {item} // "どの企業にも当てはまる内容"
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InstagramPostTemplate>
  )
}
```

---

## 🎯 最終予測結果

### **生成される4ページの構成**
1. **ページ1**: ChecklistEnhancedTemplate - 自己分析の4つのチェック項目
2. **ページ2**: ChecklistEnhancedTemplate - 企業研究の4つのチェック項目  
3. **ページ3**: SectionItemsTemplate - 融合アプローチの2セクション
4. **ページ4**: TwoColumnSectionItemsTemplate - 成功 vs 失敗の比較

### **テンプレート選択理由**
- **strategy ジャンル**: チェックリスト・対策重視 → checklist-enhanced 優先
- **□ 記号の存在**: チェックリスト構造を示唆
- **比較要素**: 成功 vs 失敗 → two-column-section-items
- **融合・統合要素**: section-items で複数観点整理

### **実際の表示内容予測**
各テンプレートで、生成されたcontentの各フィールドが対応するUIコンポーネントに正確にマッピングされ、Instagram投稿形式で表示される。

---

**この予測が実際の生成結果と100%一致すれば、システム理解度100%達成となります。**