/**
 * 各テンプレートの完全な構造定義システム
 * StructureConstrainedGenerator で動的にプロンプトに注入
 */

export interface TemplateStructureDefinition {
  templateType: string
  description: string
  requiredFields: string[]
  optionalFields: string[]
  dataStructure: string
  jsonExample: string
  validationRules: string[]
  commonMistakes: string[]
}

export class TemplateStructureDefinitions {
  
  private static definitions: Record<string, TemplateStructureDefinition> = {
    
    'simple5': {
      templateType: 'simple5',
      description: 'ステップ型レイアウト - 各ステップに番号、タイトル、説明を含む',
      requiredFields: ['title', 'steps'],
      optionalFields: ['content', 'subtitle', 'badgeText'],
      dataStructure: `
{
  "title": "メインタイトル",
  "steps": [
    {
      "step": 1,
      "title": "ステップ1のタイトル",
      "description": "ステップ1の詳細説明"
    },
    {
      "step": 2,
      "title": "ステップ2のタイトル", 
      "description": "ステップ2の詳細説明"
    }
  ],
  "badgeText": "ステップ確認",
  "subtitle": "サブタイトル（オプション）"
}`,
      jsonExample: `{
  "title": "面接準備：5つの必須ステップ",
  "steps": [
    {
      "step": 1,
      "title": "企業研究を徹底する",
      "description": "企業のビジョン、事業内容、競合他社との違いを調べる"
    },
    {
      "step": 2, 
      "title": "志望動機を明確化する",
      "description": "なぜその企業でなければならないのかを具体的に言語化"
    },
    {
      "step": 3,
      "title": "想定質問への回答準備",
      "description": "自己紹介、長所・短所、逆質問など基本項目を準備"
    }
  ],
  "badgeText": "面接対策"
}`,
      validationRules: [
        'steps配列は必須（最低3個、最大6個）',
        '各stepオブジェクトにstep（数値）、title、descriptionが必要',
        'step番号は1から順番に連続する必要がある',
        'titleは25文字以内、descriptionは45文字以内'
      ],
      commonMistakes: [
        'stepsではなくitemsを使う',
        'step番号が連続していない（1,2,4など）',
        'descriptionが長すぎる（45文字超過）',
        'stepオブジェクトの構造が不正'
      ]
    },

    'checklist-enhanced': {
      templateType: 'checklist-enhanced',
      description: 'チェックリスト（詳細説明付き） - 各項目にtext（項目名）とdescription（詳細）を含む',
      requiredFields: ['title', 'checklistItems'],
      optionalFields: ['content', 'subtitle', 'badgeText'],
      dataStructure: `
{
  "title": "メインタイトル",
  "checklistItems": [
    {
      "text": "チェック項目名",
      "description": "この項目の詳細説明",
      "checked": false
    }
  ],
  "badgeText": "チェックリスト",
  "subtitle": "サブタイトル（オプション）"
}`,
      jsonExample: `{
  "title": "ES提出前：最終チェックリスト",
  "checklistItems": [
    {
      "text": "誤字脱字の確認",
      "description": "音読して不自然な表現や変換ミスがないかチェック",
      "checked": false
    },
    {
      "text": "文字数の確認", 
      "description": "指定文字数の80%以上、100%以内に収まっているか",
      "checked": false
    },
    {
      "text": "具体性の確認",
      "description": "抽象的な表現ではなく具体的なエピソードが含まれているか",
      "checked": false
    }
  ],
  "badgeText": "提出前チェック"
}`,
      validationRules: [
        'checklistItems配列は必須（最低3個、最大8個）',
        '各checklistItemにtext、description、checkedが必要',
        'textは60文字以内、descriptionは80文字以内',
        'checkedはboolean値（通常false）'
      ],
      commonMistakes: [
        'checklistItemsではなくitemsを使う',
        'textとdescriptionが逆になっている',
        'checkedフィールドがない',
        'descriptionが長すぎる（80文字超過）'
      ]
    },

    'item-n-title-content': {
      templateType: 'item-n-title-content',
      description: '独立ボックス構造 - 各項目にtitle（タイトル）とcontent（内容）を含む独立したボックス',
      requiredFields: ['title', 'items'],
      optionalFields: ['content', 'subtitle', 'badgeText'],
      dataStructure: `
{
  "title": "メインタイトル",
  "items": [
    {
      "title": "項目のタイトル",
      "content": "項目の詳細内容"
    }
  ],
  "badgeText": "重要概念",
  "subtitle": "サブタイトル（オプション）"
}`,
      jsonExample: `{
  "title": "面接で差がつく：3つの回答テクニック",
  "items": [
    {
      "title": "STAR法を使った回答",
      "content": "Situation（状況）、Task（課題）、Action（行動）、Result（結果）の順で構造化して話す"
    },
    {
      "title": "数値を使った具体性",
      "content": "「売上を向上させた」ではなく「売上を20%向上させた」と数値で示す"
    },
    {
      "title": "逆質問で意欲をアピール",
      "content": "「入社後に期待される成果は何ですか？」など成長意欲を示す質問をする"
    }
  ],
  "badgeText": "回答テクニック"
}`,
      validationRules: [
        'items配列は必須（最低4個、最大5個）【重要】：ジャンル別最適項目数を祖守し、4個の充実した項目を含める',
        '各itemにtitle、contentが必要',
        'titleは30文字以内、contentは80文字以内',
        'items配列の各要素はオブジェクト形式',
        '【禁止】：2個以下の少ない項目数は物足りないため絶対禁止'
      ],
      commonMistakes: [
        'itemsが文字列配列になっている',
        'titleとcontentが逆になっている',
        'item1Title/item1Content形式で出力',
        'contentが長すぎる（80文字超過）',
        '【最大の間違い】：2個以下の少ない項目数で生成すること（必ず3個以上翕げる）'
      ]
    },

    'table': {
      templateType: 'table',
      description: 'テーブル（表）形式 - ヘッダーと行データで構成される表',
      requiredFields: ['title', 'tableData'],
      optionalFields: ['content', 'subtitle', 'badgeText'],
      dataStructure: `
{
  "title": "メインタイトル",
  "tableData": {
    "headers": ["列1見出し", "列2見出し", "列3見出し"],
    "rows": [
      ["行1データ1", "行1データ2", "行1データ3"],
      ["行2データ1", "行2データ2", "行2データ3"]
    ]
  },
  "badgeText": "比較データ"
}`,
      jsonExample: `{
  "title": "就活サイト比較：特徴と使い分け",
  "tableData": {
    "headers": ["サイト名", "特徴", "おすすめ用途"],
    "rows": [
      ["マイナビ", "求人数が多い", "幅広く企業を探したい時"],
      ["ワンキャリア", "選考体験記が豊富", "選考対策を重視したい時"],
      ["外資就活", "外資・コンサル特化", "特定業界を狙う時"]
    ]
  },
  "badgeText": "就活サイト比較"
}`,
      validationRules: [
        'tableData.headersは必須（最低2個、最大4個）',
        'tableData.rowsは必須（最低3行、最大6行）',
        '各行のデータ数はheaders数と一致する必要がある',
        '各セルは15文字以内'
      ],
      commonMistakes: [
        'tableDataではなくtableを使う',
        'headersとrowsの列数が一致しない',
        'rowsが文字列になっている（配列の配列である必要がある）',
        'セルのデータが長すぎる'
      ]
    },

    'section-items': {
      templateType: 'section-items',
      description: 'セクション+アイテム構造 - 1つのセクションに複数のアイテムを含む',
      requiredFields: ['title', 'sections'],
      optionalFields: ['content', 'subtitle', 'badgeText'],
      dataStructure: `
{
  "title": "メインタイトル",
  "sections": [
    {
      "title": "セクションタイトル",
      "content": "セクションの説明",
      "items": ["項目1", "項目2", "項目3"]
    }
  ],
  "badgeText": "セクション+アイテム"
}`,
      jsonExample: `{
  "title": "グループディスカッション：成功のポイント",
  "sections": [
    {
      "title": "発言で意識すべきこと",
      "content": "チーム全体の議論を活性化させる発言を心がける",
      "items": [
        "他の参加者の意見を要約して整理する",
        "対立意見を建設的にまとめる",
        "時間配分を意識した進行提案をする",
        "全員が発言できるよう促す"
      ]
    }
  ],
  "badgeText": "GD対策"
}`,
      validationRules: [
        'sections配列は必須（通常1個）',
        '各sectionにtitle、content、itemsが必要',
        'itemsは文字列配列（最低3個、最大7個）',
        'section.titleは25文字以内、各itemは20文字以内'
      ],
      commonMistakes: [
        'sectionsが複数になっている',
        'itemsがオブジェクト配列になっている',
        'section.contentがない',
        'itemsが長すぎる文章になっている'
      ]
    },

    'two-column-section-items': {
      templateType: 'two-column-section-items',
      description: '2カラムセクション+アイテム - 左右2つのセクション、各々にアイテムリスト',
      requiredFields: ['title', 'sections'],
      optionalFields: ['content', 'subtitle', 'badgeText'],
      dataStructure: `
{
  "title": "メインタイトル",
  "sections": [
    {
      "title": "左セクションタイトル",
      "content": "左セクションの説明",
      "items": ["左項目1", "左項目2", "左項目3"]
    },
    {
      "title": "右セクションタイトル",
      "content": "右セクションの説明", 
      "items": ["右項目1", "右項目2", "右項目3"]
    }
  ]
}`,
      jsonExample: `{
  "title": "面接対策：準備すべきこと vs やってはいけないこと",
  "sections": [
    {
      "title": "準備すべきこと",
      "content": "面接成功のために必要な準備項目",
      "items": [
        "企業研究を徹底する",
        "志望動機を具体的に準備",
        "逆質問を3つ以上用意"
      ]
    },
    {
      "title": "やってはいけないこと",
      "content": "面接で避けるべきNG行動",
      "items": [
        "企業名を間違える",
        "ネガティブな退職理由を話す",
        "逆質問で待遇ばかり聞く"
      ]
    }
  ],
  "badgeText": "面接対策"
}`,
      validationRules: [
        'sections配列は必須（ちょうど2個）',
        '各sectionにtitle、content、itemsが必要',
        '各sectionのitemsは文字列配列（最低3個、最大5個）',
        'section.titleは20文字以内、各itemは18文字以内'
      ],
      commonMistakes: [
        'sectionsが2個でない（1個や3個）',
        'itemsがオブジェクト配列になっている',
        '左右のバランスが悪い（片方だけ項目が多い）',
        'itemsが長すぎる文章になっている'
      ]
    },

    'list': {
      templateType: 'list',
      description: 'シンプルリスト - 簡潔な項目のリスト表示',
      requiredFields: ['title', 'items'],
      optionalFields: ['content', 'subtitle', 'badgeText'],
      dataStructure: `
{
  "title": "メインタイトル",
  "items": ["項目1", "項目2", "項目3", "項目4", "項目5"],
  "badgeText": "リスト"
}`,
      jsonExample: `{
  "title": "就活で必須：必ず登録すべきサイト5選",
  "items": [
    "マイナビ・リクナビ",
    "ワンキャリア",
    "外資就活ドットコム", 
    "OpenWork",
    "就活会議"
  ],
  "badgeText": "必須サイト"
}`,
      validationRules: [
        'items配列は必須（最低3個、最大8個）',
        'itemsは文字列配列',
        '各itemは20文字以内',
        'シンプルで簡潔な表現'
      ],
      commonMistakes: [
        'itemsがオブジェクト配列になっている',
        'itemsが長すぎる文章',
        'checklist形式との混同',
        '項目数が少なすぎる（2個以下）'
      ]
    },

    'enumeration': {
      templateType: 'enumeration',
      description: '列挙型 - 番号付きリスト表示',
      requiredFields: ['title', 'items'],
      optionalFields: ['content', 'subtitle', 'badgeText'],
      dataStructure: `
{
  "title": "メインタイトル",
  "items": ["項目1", "項目2", "項目3", "項目4"],
  "badgeText": "番号付きリスト"
}`,
      jsonExample: `{
  "title": "ES作成：4つの基本ステップ",
  "items": [
    "質問の意図を正確に理解する",
    "結論から先に書く",
    "具体的なエピソードで根拠を示す",
    "企業との接点を最後に述べる"
  ],
  "badgeText": "ES作成手順"
}`,
      validationRules: [
        'items配列は必須（最低3個、最大7個）',
        'itemsは文字列配列',
        '各itemは25文字以内',
        '順序性のある内容'
      ],
      commonMistakes: [
        'itemsがオブジェクト配列になっている',
        '順序性がない内容',
        'listテンプレートとの使い分けができていない',
        '項目が長すぎる'
      ]
    },

    'title-description-only': {
      templateType: 'title-description-only',
      description: 'タイトル+説明のみ - シンプルな説明中心のレイアウト',
      requiredFields: ['title', 'description'],
      optionalFields: ['subtitle', 'badgeText'],
      dataStructure: `
{
  "title": "メインタイトル",
  "description": "詳細な説明文",
  "badgeText": "説明",
  "subtitle": "サブタイトル（オプション）"
}`,
      jsonExample: `{
  "title": "STAR法とは：面接で使える回答フレームワーク",
  "description": "Situation（状況）、Task（課題）、Action（行動）、Result（結果）の4つの要素で構成される回答手法。具体的な体験談を論理的に伝えることで、面接官に説得力のある回答ができる。特に「学生時代に力を入れたこと」や「困難を乗り越えた経験」などの質問で効果的。",
  "badgeText": "回答テクニック"
}`,
      validationRules: [
        'descriptionは必須（100文字以上、300文字以内）',
        'titleは30文字以内',
        'items、sections、tableDataなどは含まない',
        '説明中心の内容'
      ],
      commonMistakes: [
        'descriptionが短すぎる（100文字未満）',
        'items配列を含めてしまう',
        '説明文が長すぎる（300文字超過）',
        'contentとdescriptionの混同'
      ]
    }
  }

  /**
   * 指定されたテンプレートタイプの構造定義を取得
   */
  static getDefinition(templateType: string): TemplateStructureDefinition | null {
    return this.definitions[templateType] || null
  }

  /**
   * 動的プロンプト生成：指定されたテンプレートの完全な構造要件
   */
  static generateStructurePrompt(templateType: string): string {
    const definition = this.getDefinition(templateType)
    
    if (!definition) {
      return `テンプレート「${templateType}」の構造定義が見つかりません。基本的なJSON構造で出力してください。`
    }

    return `
【${definition.templateType}テンプレート構造要件】

🎯 テンプレート概要：
${definition.description}

📋 必須フィールド：
${definition.requiredFields.map(field => `- ${field} (必須)`).join('\n')}

📝 オプションフィールド：
${definition.optionalFields.map(field => `- ${field} (オプション)`).join('\n')}

🏗️ データ構造：
${definition.dataStructure}

✅ 実際の例：
${definition.jsonExample}

⚠️ 重要な検証ルール：
${definition.validationRules.map(rule => `- ${rule}`).join('\n')}

❌ よくある間違い（絶対に避けること）：
${definition.commonMistakes.map(mistake => `- ${mistake}`).join('\n')}

🚨 重要：この構造に100%適合するJSONを生成してください。フィールド名、データ型、配列構造を正確に守ってください。
`
  }

  /**
   * 全テンプレートの構造定義一覧を取得
   */
  static getAllDefinitions(): Record<string, TemplateStructureDefinition> {
    return { ...this.definitions }
  }

  /**
   * テンプレートタイプの存在確認
   */
  static hasDefinition(templateType: string): boolean {
    return templateType in this.definitions
  }
}