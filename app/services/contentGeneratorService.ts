import { GoogleGenerativeAI } from '@google/generative-ai'
import { TemplateType, TemplateData } from '../components/templates/TemplateTypes'
import { hashtagService } from '../config/hashtags'
import { captionService } from '../config/captionFormat'
import { MarkdownUtils } from '../utils/markdownUtils'

export interface GeneratedPage {
  pageNumber: number
  templateType: TemplateType
  templateData: TemplateData
  content: {
    title: string
    subtitle?: string
    description?: string
    items?: string[]
    sections?: {
      title: string
      content: string
      items?: string[]
    }[]
    tableData?: {
      headers: string[]
      rows: string[][]
    }
    badgeText?: string
    checklistItems?: {
      text: string
      description: string
    }[]
  }
  // 🚨 追加: 生のコンテンツを保存（削られる前の完全なコンテンツ）
  rawContent?: string
}

export interface GeneratedContent {
  pages: GeneratedPage[]
  totalPages: number
  caption: string
  hashtags: {
    primary: string[]
    secondary: string[]
    trending: string[]
    large: string[]
    medium: string[]
    small: string[]
    all: string[]
  }
  summary: string
}

export class ContentGeneratorService {
  private client: GoogleGenerativeAI
  private model: any
  private isGenerating: boolean = false // AI呼び出しの直列化用

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('Gemini API key not found. Please set GEMINI_API_KEY in .env file.')
    }
    this.client = new GoogleGenerativeAI(apiKey)
    this.model = this.client.getGenerativeModel({ model: 'gemini-2.0-flash-lite' })
  }

  async generateHighQualityContent(userInput: string): Promise<GeneratedContent> {
    // AI呼び出しの直列化（503エラー対策）
    if (this.isGenerating) {
      throw new Error('AI生成が進行中です。少し待ってから再度お試しください。')
    }

    this.isGenerating = true
    const prompt = this.createContentGenerationPrompt(userInput)
    
    try {
      console.log('🚀 AI生成開始...')
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      console.log('✅ AI生成成功')
      
      // 🎯 高品質コンテンツ生成の生のデータをコンソールに出力
      console.log('='.repeat(60))
      console.log('🎨 高品質コンテンツ生成 - 生のレスポンス')
      console.log('='.repeat(60))
      console.log('生のレスポンステキスト:', text)
      console.log('-'.repeat(40))
      
      const parsedContent = this.parseGeneratedContent(text)
      
      console.log('パース済みコンテンツ:', JSON.stringify(parsedContent, null, 2))
      console.log('='.repeat(60))
      
      return parsedContent
    } catch (error) {
      console.error('❌ AI生成失敗:', error)
      
      // エラーをそのまま投げる - 問題を隠さない
      if (error instanceof Error) {
        throw new Error(`AI生成に失敗しました: ${error.message}`)
      }
      throw new Error('AI生成に失敗しました。APIの状態を確認してください。')
    } finally {
      this.isGenerating = false
    }
  }


  async regenerateCaption(content: GeneratedContent): Promise<string> {
    // AI呼び出しの直列化（503エラー対策）
    if (this.isGenerating) {
      console.log('⏳ AI生成中のためキャプション再生成をスキップ...')
      throw new Error('他のAI生成が進行中です。少し待ってから再度お試しください。')
    }

    this.isGenerating = true
    const contentForCaption = content.pages.map(page => 
      `${page.content.title || ''} ${page.content.description || ''} ${page.content.subtitle || ''}`
    ).join(' ')

    const prompt = `
以下のコンテンツから、Instagram投稿用のプロフェッショナルなキャプションを生成してください。

【コンテンツ】
${contentForCaption}

【キャプション生成制約】
- キャプションにはハッシュタグを一切含めない
- キャプションはテキストのみで構成（ハッシュタグは別セクション）
- 絵文字は✅のみ使用可（他の絵文字は使用禁止）
- プロフェッショナルで上品なトーンで作成
- 就活・キャリア系の専門的な内容に相応しい文体
- 読者にとって価値のある情報を簡潔に伝える
- 「応援してるよー！」「頑張ろう！」等のカジュアルな表現は使用しない
- 敬語を適切に使用し、学生に対して有益な情報を提供する姿勢
- 400-500文字程度で適切なボリュームにまとめる

【文体の指針】
- 就活・キャリア系の専門的な内容に相応しい丁寧な文体
- 導入部分で背景や重要性を説明（2-3文）
- コンテンツの要点を✅を使って3-5個程度で整理
- 各✅項目に簡潔な説明を付加
- 読者にとって具体的で実践的な価値を提供
- 最後に投稿内容への誘導を自然に含める
- 句点（。）の後は必ず改行する（文章の区切りを明確に）
- 文章が長い場合は、適切な箇所で改行を入れて読みやすくする
- 適切なボリュームで情報量を確保する

【出力形式】
キャプションのテキストのみを出力してください。JSONやその他の形式は不要です。

【重要な改行ルール】
- 文章が終わったら必ず改行（改行コード\nを使用）
- 長い文章は読みやすくするため適切な箇所で改行
- ✅項目の間には空行を入れる
- 段落と段落の間には空行を入れる
`

    try {
      console.log('🚀 キャプション再生成開始...')
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const caption = response.text().trim()
      
      console.log('✅ キャプション再生成成功')
      
      // 🎯 キャプション再生成データをコンソールに出力
      console.log('='.repeat(60))
      console.log('📝 キャプション再生成成功 - 生のデータ')
      console.log('='.repeat(60))
      console.log('生のレスポンス:', response.text())
      console.log('-'.repeat(40))
      console.log('処理済みキャプション:', caption)
      console.log('='.repeat(60))
      
      return caption
    } catch (error) {
      console.error('Caption regeneration failed:', error)
      throw new Error('キャプションの再生成に失敗しました。もう一度お試しください。')
    } finally {
      this.isGenerating = false
    }
  }

  async regenerateSpecificPage(
    originalContent: GeneratedContent, 
    pageNumber: number, 
    additionalInstructions?: string
  ): Promise<GeneratedPage> {
    const targetPage = originalContent.pages.find(p => p.pageNumber === pageNumber)
    if (!targetPage) {
      throw new Error(`ページ ${pageNumber} が見つかりません`)
    }

    // AI呼び出しの直列化（503エラー対策）
    if (this.isGenerating) {
      console.log('⏳ AI生成中のため再生成をスキップ...')
      throw new Error('他のAI生成が進行中です。少し待ってから再度お試しください。')
    }

    this.isGenerating = true
    const prompt = this.createPageRegenerationPrompt(
      originalContent.summary,
      targetPage,
      additionalInstructions
    )

    try {
      console.log('🚀 ページ再生成開始...', pageNumber)
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      console.log('✅ ページ再生成成功')
      
      // 🎯 ページ再生成データをコンソールに出力
      console.log('='.repeat(60))
      console.log(`📄 ページ${pageNumber}再生成成功 - 生のデータ`)
      console.log('='.repeat(60))
      console.log('生のレスポンス:', text)
      console.log('-'.repeat(40))
      
      const parsedPage = this.parseRegeneratedPage(text, pageNumber)
      
      console.log('処理済みページデータ:', JSON.stringify(parsedPage, null, 2))
      console.log('='.repeat(60))
      
      return parsedPage
    } catch (error) {
      console.error('Page regeneration failed:', error)
      throw new Error('ページの再生成に失敗しました。もう一度お試しください。')
    } finally {
      this.isGenerating = false
    }
  }

  private createContentGenerationPrompt(userInput: string): string {
    return `
あなたは就活・インターンシップのプロフェッショナルです。以下のユーザー入力から、Instagram投稿用の高品質なコンテンツを生成してください。

【重要な制約（改善要件④対応）】
- 事実ベースのコンテンツのみ作成（憶測・推測は一切禁止）
- 絵文字の使用は一切禁止（テキストのみで表現）
- タイトル、キャプション、すべてのテキストで絵文字を使用しない
- 学生にとって実践的で価値のある情報
- 具体的で実用的な内容
- 高品質で専門的な内容（小学生レベルの内容は排除）
- 1ページあたりの情報密度を最大化し、関連する複数のトピックを統合する
- テキスト量を増やすのではなく、内容の質と実用性を向上させる
- 各項目に具体的な数値・手法・ツールを含める

【ユーザー入力】
${userInput}

【生成要件（密度向上対応）】
1. 3-7ページのカルーセル投稿を作成（情報を統合してページ数を最適化）
2. 各ページに適切なテンプレートタイプを選択
3. 全てのテキストを動的に生成（プレースホルダー禁止）
4. 実践的で具体的な内容
5. 学生が今すぐ使える情報
6. 関連する情報を統合して1つのページに集約し、情報密度を高める
7. 各ページが独立した価値を提供しつつ、全体として統合された知識体系を構築する
8. 曖昧な表現を避け、具体的な行動指針・数値データ・実践的ツールを含める

【利用可能なテンプレートタイプ】
- enumeration: 列挙型（①②③のリスト）
- explanation: 説明型（概要→詳細解説）
- explanation2: 解説型2（複数のタイトル→解説）
- list: リスト型（カード形式のリスト）
- simple: シンプル型（タイトル→箇条書き）
- simple2: シンプル型2（2つのポイント）
- simple3: シンプル型3（対比解説）
- simple4: シンプル型4（チェックリスト）
- simple5: シンプル型5（ステップ確認）
- simple6: シンプル型6（6つのポイント）
- story: ストーリー型（問題提起→解決）
- table: 表型（テーブル形式）

【出力形式】
以下のJSON形式で出力してください：

{
  "pages": [
    {
      "pageNumber": 1,
      "templateType": "explanation",
      "content": {
        "title": "具体的なタイトル",
        "subtitle": "副題（必要に応じて）",
        "description": "詳細な説明",
        "badgeText": "バッジテキスト",
        "items": ["項目1", "項目2", "項目3"],
        "sections": [
          {
            "title": "セクションタイトル",
            "content": "セクション内容",
            "items": ["詳細項目1", "詳細項目2"]
          }
        ],
        "tableData": {
          "headers": ["ヘッダー1", "ヘッダー2"],
          "rows": [["データ1", "データ2"], ["データ3", "データ4"]]
        },
        "checklistItems": [
          {
            "text": "チェック項目",
            "description": "詳細説明"
          }
        ]
      }
    }
  ],
  "totalPages": 7,
  "caption": "Instagram投稿用のキャプション",
  "hashtags": {
    "primary": ["#就活", "#インターン", "#キャリア"],
    "secondary": ["#就活生", "#23卒", "#24卒"],
    "trending": ["#就活の教科書", "#就活ハック"]
  },
  "summary": "生成されたコンテンツの要約"
}

【注意事項（密度向上重要ポイント）】
- 全てのテキストは動的に生成し、プレースホルダーは使用しない
- 事実に基づく具体的で実用的な情報のみ提供
- 学生が即座に活用できる内容を心がける
- 専門性と実用性を両立させる
- 希薄な情報は統合し、1ページあたりの価値を最大化する
- 具体的な数値・期間・ツール名・手法名を含める（例：「3週間で」「SWOT分析を使って」「上位10%に入るための」）
- 実践的なアクション項目を各ページに含める

【キャプション生成制約】
- キャプションにはハッシュタグを一切含めない
- キャプションはテキストのみで構成（ハッシュタグは別セクション）
- キャプションでは✅のみ使用可（他の絵文字は使用禁止）
- ハッシュタグとキャプションは完全に分離して生成
`;
  }

  private createPageRegenerationPrompt(
    contentSummary: string,
    targetPage: GeneratedPage,
    additionalInstructions?: string
  ): string {
    return `
以下のコンテンツの${targetPage.pageNumber}ページ目を再生成してください。

【元のコンテンツ概要】
${contentSummary}

【現在のページ内容】
${JSON.stringify(targetPage.content, null, 2)}

【テンプレートタイプ】
${targetPage.templateType}

【追加指示】
${additionalInstructions || '品質を向上させて再生成してください'}

【制約】
- 事実ベースのコンテンツのみ
- 絵文字の使用は一切禁止（テキストのみで表現）
- タイトル、キャプション、すべてのテキストで絵文字を使用しない
- 実践的で具体的な内容
- プレースホルダー禁止
- 学生にとって価値のある情報

【出力形式】
以下のJSON形式で出力してください：

{
  "pageNumber": ${targetPage.pageNumber},
  "templateType": "${targetPage.templateType}",
  "content": {
    "title": "改善されたタイトル",
    "subtitle": "改善された副題",
    "description": "改善された説明",
    "badgeText": "改善されたバッジテキスト",
    "items": ["改善された項目1", "改善された項目2"],
    "sections": [
      {
        "title": "改善されたセクションタイトル",
        "content": "改善されたセクション内容",
        "items": ["改善された詳細項目1", "改善された詳細項目2"]
      }
    ],
    "tableData": {
      "headers": ["改善されたヘッダー1", "改善されたヘッダー2"],
      "rows": [["改善されたデータ1", "改善されたデータ2"]]
    },
    "checklistItems": [
      {
        "text": "改善されたチェック項目",
        "description": "改善された詳細説明"
      }
    ]
  }
}
`;
  }

  private parseGeneratedContent(text: string): GeneratedContent {
    try {
      const cleanText = text.replace(/```json\n?|```\n?/g, '').trim()
      const parsed = JSON.parse(cleanText)
      
      // HashtagServiceを使用して適切なハッシュタグを生成
      const contentForHashtags = parsed.pages.map((page: any) => 
        `${page.content.title || ''} ${page.content.description || ''} ${page.content.subtitle || ''}`
      ).join(' ')
      
      const properHashtags = hashtagService.selectHashtags(contentForHashtags)
      
      return {
        pages: parsed.pages.map((page: any) => ({
          pageNumber: page.pageNumber,
          templateType: page.templateType as TemplateType,
          templateData: this.convertToTemplateData(page.content, page.templateType),
          content: page.content
        })),
        totalPages: parsed.totalPages,
        caption: parsed.caption,
        hashtags: {
          primary: properHashtags.large,
          secondary: properHashtags.medium,
          trending: properHashtags.small,
          large: properHashtags.large,
          medium: properHashtags.medium,
          small: properHashtags.small,
          all: properHashtags.all
        },
        summary: parsed.summary
      }
    } catch (error) {
      console.error('Failed to parse generated content:', error)
      throw new Error('生成されたコンテンツの解析に失敗しました')
    }
  }

  private parseRegeneratedPage(text: string, pageNumber: number): GeneratedPage {
    try {
      const cleanText = text.replace(/```json\n?|```\n?/g, '').trim()
      const parsed = JSON.parse(cleanText)
      
      return {
        pageNumber: pageNumber,
        templateType: parsed.templateType as TemplateType,
        templateData: this.convertToTemplateData(parsed.content, parsed.templateType),
        content: parsed.content
      }
    } catch (error) {
      console.error('Failed to parse regenerated page:', error)
      throw new Error('再生成されたページの解析に失敗しました')
    }
  }

  private convertToTemplateData(content: any, templateType: TemplateType): TemplateData {
    const baseData: TemplateData = {
      title: MarkdownUtils.removeMarkdown(content.title || ''),
      content: MarkdownUtils.removeMarkdown(content.description || ''),
      subtitle: MarkdownUtils.removeMarkdown(content.subtitle || ''),
      badgeText: MarkdownUtils.removeMarkdown(content.badgeText || ''),
      items: content.items ? content.items.map((item: any) => 
        typeof item === 'string' ? MarkdownUtils.removeMarkdown(item) : {
          title: MarkdownUtils.removeMarkdown(item.title || ''),
          content: MarkdownUtils.removeMarkdown(item.description || item.content || '')
        }
      ) : [],
      tableData: content.tableData || { headers: [], rows: [] }
    }

    // Convert sections to points if available
    if (content.sections && content.sections.length > 0) {
      baseData.points = content.sections.map((section: any) => ({
        title: MarkdownUtils.removeMarkdown(section.title || ''),
        description: MarkdownUtils.removeMarkdown(section.content || '')
      }))
    }

    // Convert checklist items to checklist format
    if (content.checklistItems && content.checklistItems.length > 0) {
      baseData.checklist = content.checklistItems.map((item: any) => ({
        text: MarkdownUtils.removeMarkdown(item.text || ''),
        checked: false
      }))
    }

    // Handle twoColumn data for SimpleThreeTemplate
    if (templateType === 'simple3' && content.sections && content.sections.length >= 2) {
      const leftItems = content.sections.slice(0, Math.ceil(content.sections.length / 2))
      const rightItems = content.sections.slice(Math.ceil(content.sections.length / 2))
      
      baseData.twoColumn = {
        left: leftItems.map((item: any) => typeof item === 'string' ? 
          MarkdownUtils.removeMarkdown(item) : 
          MarkdownUtils.removeMarkdown(item.title || item.content || String(item))
        ),
        right: rightItems.map((item: any) => typeof item === 'string' ? 
          MarkdownUtils.removeMarkdown(item) : 
          MarkdownUtils.removeMarkdown(item.title || item.content || String(item))
        )
      }
    }

    // Handle boxes data for SimpleTwoTemplate
    if (templateType === 'simple2' && content.items && content.items.length === 2) {
      baseData.boxes = content.items.map((item: any) => ({
        title: MarkdownUtils.removeMarkdown(item.title || ''),
        content: MarkdownUtils.removeMarkdown(item.description || item.content || '')
      }))
    }

    // Handle steps data for SimpleFiveTemplate
    if (templateType === 'simple5' && content.items) {
      baseData.steps = content.items.map((item: any) => ({
        step: item.step,
        title: MarkdownUtils.removeMarkdown(item.title || ''),
        description: MarkdownUtils.removeMarkdown(item.description || item.content || '')
      }))
    }

    return baseData
  }
}

export const contentGeneratorService = new ContentGeneratorService()