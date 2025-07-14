import { TemplateType, TemplateData } from '../components/templates/TemplateTypes'
import { hashtagService } from '../config/hashtags'
import { captionService } from '../config/captionFormat'
import { MarkdownUtils } from '../utils/markdownUtils'
import { IndexGeneratorService } from './indexGeneratorService'
import { PageStructureAnalyzer } from './pageStructureAnalyzer'
import { StructureConstrainedGenerator } from './structureConstrainedGenerator'
import { getGeminiModel } from './geminiClientSingleton'

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
  private model: any
  private isGenerating: boolean = false // AI呼び出しの直列化用

  constructor() {
    this.model = getGeminiModel()
  }

  async generateHighQualityContent(userInput: string): Promise<GeneratedContent> {
    // AI呼び出しの直列化（503エラー対策）
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
      
      console.log('✅ ページ構造決定完了:', pageStructures.length, 'ページ')
      
      // 2段階目: 全ページ一括生成
      console.log('🎨 段階2: 一括構造制約生成開始...')
      const structureConstrainedGenerator = new StructureConstrainedGenerator()
      
      const generatedPages = await structureConstrainedGenerator.generateAllPagesWithConstraints(userInput, pageStructures)
      
      const pages: GeneratedPage[] = generatedPages.map(generatedPage => ({
        pageNumber: generatedPage.pageNumber,
        templateType: generatedPage.templateType,
        templateData: this.convertToTemplateData({
          ...generatedPage.content,
          title: generatedPage.title
        }, generatedPage.templateType),
        content: {
          title: generatedPage.title || generatedPage.content.title,
          subtitle: generatedPage.content.subtitle,
          description: generatedPage.content.description,
          items: generatedPage.content.items,
          sections: generatedPage.content.sections,
          tableData: generatedPage.content.tableData,
          badgeText: generatedPage.content.badgeText,
          checklistItems: generatedPage.content.checklistItems
        }
      }))
      
      console.log('✅ 全ページ生成完了')
      
      // 🎯 表の自動分割処理
      const finalPages = this.splitLongTables(pages)
      console.log(`📊 表分割完了: ${pages.length}ページ → ${finalPages.length}ページ`)
      
      // ハッシュタグ生成（現状維持）
      const hashtags = await this.generateHashtags(userInput, finalPages)
      
      // キャプション生成（改善: 実際の生成内容を反映）
      const caption = await this.generateCaptionWithFormat(userInput, finalPages)
      
      const generatedContent: GeneratedContent = {
        pages: finalPages,
        totalPages: finalPages.length,
        hashtags,
        caption,
        summary: userInput
      }
      
      console.log('🎉 2段階フロー完了')
      
      return generatedContent
    } catch (error) {
      console.error('❌ 2段階フロー失敗:', error)
      
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
- ですます調を基本とし、感嘆符（！）の多用は避ける
- カジュアルな親しみやすさを保ちつつ、フランクすぎない適度な距離感を維持
- 自然な丁寧語を心がける

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
      // マークダウン記法を除去
      const cleanCaption = MarkdownUtils.removeMarkdown(caption)
      
      console.log('✅ キャプション再生成成功')
      
      // 🎯 キャプション再生成データをコンソールに出力
      console.log('='.repeat(60))
      console.log('📝 キャプション再生成成功 - 生のデータ')
      console.log('='.repeat(60))
      console.log('生のレスポンス:', response.text())
      console.log('-'.repeat(40))
      console.log('処理済みキャプション:', cleanCaption)
      console.log('='.repeat(60))
      
      return cleanCaption
    } catch (error) {
      console.error('Caption regeneration failed:', error)
      throw new Error('キャプションの再生成に失敗しました。もう一度お試しください。')
    } finally {
      this.isGenerating = false
    }
  }

  /**
   * INDEXページを生成してコンテンツの先頭に挿入
   * @param content 既存のコンテンツ
   * @param mainTheme メインテーマ
   * @returns INDEXページが追加されたコンテンツ
   */
  generateContentWithIndex(content: GeneratedContent, mainTheme: string): GeneratedContent {
    console.log('🏗️ INDEXページ付きコンテンツ生成開始')
    
    // 既存のページからINDEXデータを生成
    const templateDataList = content.pages.map(page => page.templateData)
    const indexData = IndexGeneratorService.generateIndexData(templateDataList, mainTheme, content.caption)
    
    // INDEXページを作成
    const indexPage: GeneratedPage = {
      pageNumber: 0,
      templateType: 'index',
      templateData: indexData,
      content: {
        title: indexData.title,
        subtitle: indexData.subtitle,
        description: indexData.content,
        items: Array.isArray(indexData.items) ? indexData.items.map(item => 
          typeof item === 'string' ? item : (item?.title || item?.content || String(item))
        ) : undefined,
        badgeText: indexData.badgeText
      }
    }
    
    // 既存のページの番号を調整（1から開始）
    const adjustedPages = content.pages.map((page, index) => ({
      ...page,
      pageNumber: index + 1,
      templateData: {
        ...page.templateData,
        pageNumber: index + 1
      }
    }))
    
    // INDEXページを先頭に追加
    const pagesWithIndex = [indexPage, ...adjustedPages]
    
    const updatedContent: GeneratedContent = {
      ...content,
      pages: pagesWithIndex,
      totalPages: pagesWithIndex.length
    }
    
    console.log(`✅ INDEXページ付きコンテンツ生成完了（全${updatedContent.totalPages}ページ）`)
    
    return updatedContent
  }

  /**
   * 選択されたページのみでINDEXを生成（ダウンロード用）
   * @param selectedPages 選択されたページ
   * @param mainTheme メインテーマ
   * @returns INDEXページが追加された選択されたコンテンツ
   */
  generateIndexForSelectedPages(selectedPages: GeneratedPage[], mainTheme: string): GeneratedPage[] {
    console.log('🏗️ 選択ページ用INDEXページ生成開始')
    
    // 選択されたページからINDEXデータを生成
    const templateDataList = selectedPages.map(page => page.templateData)
    const indexData = IndexGeneratorService.generateIndexDataForSelected(templateDataList, mainTheme)
    
    // INDEXページを作成
    const indexPage: GeneratedPage = {
      pageNumber: 0,
      templateType: 'index',
      templateData: indexData,
      content: {
        title: indexData.title,
        subtitle: indexData.subtitle,
        description: indexData.content,
        items: Array.isArray(indexData.items) ? indexData.items.map(item => 
          typeof item === 'string' ? item : (item?.title || item?.content || String(item))
        ) : undefined,
        badgeText: indexData.badgeText
      }
    }
    
    // 選択されたページの番号を調整（1から開始）
    const adjustedPages = selectedPages.map((page, index) => ({
      ...page,
      pageNumber: index + 1,
      templateData: {
        ...page.templateData,
        pageNumber: index + 1
      }
    }))
    
    const pagesWithIndex = [indexPage, ...adjustedPages]
    
    console.log(`✅ 選択ページ用INDEXページ生成完了（全${pagesWithIndex.length}ページ）`)
    
    return pagesWithIndex
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

  // 🗑️ 削除: createContentGenerationPrompt は新システムでは不要
  // PageStructureAnalyzer + StructureConstrainedGenerator の2段階フローに移行済み

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

【タイトル形式の制約】
- タイトルは必ず「〇〇：〇〇」の形式で作成する
- コロン（：）の前後にそれぞれ意味のある単語・フレーズを配置する
- 例：「26卒必見！：必須の準備項目」「企業研究：効率的な情報収集法」

【テンプレート構造仕様】
指定されたテンプレートタイプのデータ構造に厳密に従ってください。

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

  // 🗑️ 削除: parseGeneratedContent は新システムでは不要
  // PageStructureAnalyzer + StructureConstrainedGenerator の2段階フローに移行済み

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
    console.log(`🔍 convertToTemplateData開始（完璧優先版） - templateType: ${templateType}`)
    console.log(`📥 入力データ:`, JSON.stringify(content, null, 2))
    
    // タイトルのみ必須チェック（フォールバック）
    let title = MarkdownUtils.removeMarkdown(content.title || '')
    if (!title || title.trim() === '') {
      title = 'コンテンツ'
      console.warn(`⚠️ タイトルが空のため自動生成: "${title}"`)
    }

    // 🎯 Step 1: AIの完璧なデータをまずそのまま使用
    const baseData: TemplateData = {
      title: title,
      content: content.content ? MarkdownUtils.removeMarkdown(content.content) : '',
      description: content.description ? MarkdownUtils.removeMarkdown(content.description) : '',
      subtitle: content.subtitle ? MarkdownUtils.removeMarkdown(content.subtitle) : '',
      badgeText: content.badgeText ? MarkdownUtils.removeMarkdown(content.badgeText) : '',
      
      // AIの完璧なデータをそのまま使用（完璧なら修正しない）
      items: content.items || [],
      sections: content.sections || [],
      steps: content.steps || [],
      checklistItems: content.checklistItems || [],
      tableData: content.tableData || { headers: [], rows: [] },
      points: content.points || [],
      checklist: content.checklist || [],
      twoColumn: content.twoColumn || { left: [], right: [] }
    }

    // 🎯 Step 2: 空配列や不足がある場合のみ代替処理
    switch (templateType) {
      case 'item-n-title-content':
        // itemsが空の場合の代替処理
        if (baseData.items?.length === 0) {
          if (Array.isArray(content.content)) {
            console.log('⚠️ items空配列検出 - content配列から変換')
            baseData.items = content.content.map((item: any, index: number) => ({
              title: `ポイント${index + 1}`,
              content: MarkdownUtils.removeMarkdown(item)
            }))
          } else if (typeof content.content === 'string' && content.content.trim()) {
            console.log('⚠️ items空配列検出 - content文字列を分割して変換')
            // 改行や段落で分割してitemsに変換
            const paragraphs = content.content.split(/\n\n+/).filter((paragraph: string) => paragraph.trim())
            baseData.items = paragraphs.map((paragraph: string, index: number) => ({
              title: `ポイント${index + 1}`,
              content: MarkdownUtils.removeMarkdown(paragraph.trim())
            }))
          }
        }
        break

      case 'two-column-section-items':
        // twoColumnが空で、column1Items/column2Itemsがある場合のみ変換
        if (baseData.twoColumn && baseData.twoColumn.left?.length === 0 && baseData.twoColumn.right?.length === 0) {
          if (content.column1Items || content.column2Items) {
            console.log('⚠️ twoColumn空配列検出 - column1Items/column2Itemsから変換')
            baseData.twoColumn = {
              left: content.column1Items || [],
              right: content.column2Items || []
            }
          }
        }
        break

      case 'checklist-enhanced':
        // checklistItemsが空で、checklistがある場合のみ変換
        if (baseData.checklistItems?.length === 0 && content.checklist && Array.isArray(content.checklist)) {
          console.log('⚠️ checklistItems空配列検出 - checklistから変換')
          baseData.checklistItems = content.checklist.map((item: any) => ({
            text: item.item || item.text || item,
            description: item.description || '',
            checked: false
          }))
          baseData.checklist = content.checklist
        }
        break

      case 'list':
        // itemsが空で、listItemsがある場合のみ変換
        if (baseData.items?.length === 0 && content.listItems) {
          console.log('⚠️ items空配列検出 - listItemsから変換')
          baseData.items = content.listItems
        }
        break
    }

    console.log(`📤 convertToTemplateData完了（完璧優先版） - templateType: ${templateType}`)
    console.log(`📤 出力データ:`, JSON.stringify(baseData, null, 2))
    
    // データ品質チェック
    const hasValidData = this.checkTemplateDataQuality(baseData, templateType)
    if (hasValidData) {
      console.log('✅ 完璧なデータまたは適切に修正されたデータを使用')
    } else {
      console.log('⚠️ データ不足が残っていますが、処理を継続')
    }
    console.log('================================================================================')
    
    return baseData
  }

  private checkTemplateDataQuality(data: TemplateData, templateType: TemplateType): boolean {
    switch (templateType) {
      case 'section-items':
        return (data.sections?.length || 0) > 0 || (data.items?.length || 0) > 0
      case 'item-n-title-content':
        return (data.items?.length || 0) > 0
      case 'two-column-section-items':
        return (data.twoColumn?.left?.length || 0) > 0 || (data.twoColumn?.right?.length || 0) > 0 || (data.sections?.length || 0) > 0
      case 'checklist-enhanced':
        return (data.checklistItems?.length || 0) > 0
      case 'list':
        return (data.items?.length || 0) > 0
      default:
        return true
    }
  }

  /**
   * 長い表を複数ページに自動分割
   */
  private splitLongTables(pages: any[]): any[] {
    const result: any[] = []
    let currentPageNumber = 1

    for (const page of pages) {
      if (page.templateType === 'table' && 
          page.templateData?.tableData?.rows?.length > 5) {
        
        const originalRows = page.templateData.tableData.rows
        const headers = page.templateData.tableData.headers
        const rowsPerPage = 5
        
        console.log(`📊 表分割開始: ${originalRows.length}行を${rowsPerPage}行ずつに分割`)
        
        // 5行ずつに分割
        for (let i = 0; i < originalRows.length; i += rowsPerPage) {
          const pageRows = originalRows.slice(i, i + rowsPerPage)
          
          const splitPage = {
            ...page,
            pageNumber: currentPageNumber++,
            templateData: {
              ...page.templateData,
              tableData: {
                headers: headers,
                rows: pageRows
              }
            }
          }
          
          result.push(splitPage)
          console.log(`📄 表ページ${splitPage.pageNumber}作成: ${pageRows.length}行`)
        }
      } else {
        // 表以外のページはそのまま
        result.push({
          ...page,
          pageNumber: currentPageNumber++
        })
      }
    }

    return result
  }

  /**
   * columns配列をsections配列に変換（two-column-section-items用）
   */
  private convertColumnsToSections(columns: any[]): any[] {
    if (!Array.isArray(columns) || columns.length === 0) {
      return []
    }
    
    return columns.map(column => ({
      title: column.title || '',
      content: column.content || '',
      items: column.items || []
    }))
  }

  /**
   * items配列をsteps配列に変換（simple5用）
   */
  private convertItemsToSteps(items: any[], templateType: string): any[] {
    if (templateType !== 'simple5' || !Array.isArray(items) || items.length === 0) {
      return []
    }
    
    return items.map((item, index) => ({
      step: index + 1,
      title: typeof item === 'string' ? item : item.title || `ステップ${index + 1}`,
      description: typeof item === 'string' ? '' : item.content || item.description || ''
    }))
  }

  /**
   * checklist配列をchecklistItems配列に変換（checklist-enhanced用）
   */
  private convertChecklistToItems(checklist: any[]): any[] {
    if (!Array.isArray(checklist) || checklist.length === 0) {
      return []
    }
    
    return checklist.map(item => {
      if (typeof item === 'string') {
        // "□ テキスト"形式から"□"を除去
        const text = item.replace(/^□\s*/, '')
        return {
          text: text,
          description: '',
          checked: false
        }
      }
      return {
        text: item.text || item.item || '',
        description: item.description || '',
        checked: item.checked || false
      }
    })
  }

  /**
   * ハッシュタグ生成（新システム用）
   */
  private async generateHashtags(_userInput: string, pages: GeneratedPage[]): Promise<GeneratedContent['hashtags']> {
    const contentForHashtags = pages.map(page => 
      `${page.content.title || ''} ${page.content.description || ''} ${page.content.subtitle || ''}`
    ).join(' ')
    
    const properHashtags = hashtagService.selectHashtags(contentForHashtags)
    
    return {
      primary: properHashtags.large,
      secondary: properHashtags.medium,
      trending: properHashtags.small,
      large: properHashtags.large,
      medium: properHashtags.medium,
      small: properHashtags.small,
      all: properHashtags.all
    }
  }

  /**
   * フォーマット統一キャプション生成（新システム用）
   */
  private async generateCaptionWithFormat(
    originalInput: string,
    generatedPages: GeneratedPage[]
  ): Promise<string> {
    
    const prompt = `
以下のコンテンツから、Instagram投稿用のプロフェッショナルなキャプションを生成してください。

【元入力】${originalInput}
【実際の生成ページ】
${generatedPages.map(p => `${p.content.title}: ${p.content.description || ''}`).join('\n')}

【キャプション固定フォーマット】
タイトル

概要

✅ページタイトル
ページの簡潔な概要と補足説明

✅ページタイトル
簡潔な概要と補足説明

...

まとめ的な内容（「まとめ」という単語は使用禁止）

【キャプション生成制約】
- キャプションにはハッシュタグを一切含めない
- キャプションはテキストのみで構成（ハッシュタグは別セクション）
- 絵文字は✅のみ使用可（他の絵文字は使用禁止）
- プロフェッショナルで上品なトーンで作成
- 就活・キャリア系の専門的な内容に相応しい文体
- 読者にとって価値のある情報を簡潔に伝える
- 敬語を適切に使用し、学生に対して有益な情報を提供する姿勢
- 400-500文字程度で適切なボリュームにまとめる
- ですます調を基本とし、感嘆符（！）の多用は避ける
- カジュアルな親しみやすさを保ちつつ、フランクすぎない適度な距離感を維持
- 自然な丁寧語を心がける

【文体の指針】
- 就活・キャリア系の専門的な内容に相応しい丁寧な文体
- 導入部分で背景や重要性を説明（2-3文）
- コンテンツの要点を✅を使って整理
- 各✅項目に簡潔な説明を付加
- 読者にとって具体的で実践的な価値を提供
- 最後に投稿内容への誘導を自然に含める
- 句点（。）の後は必ず改行する（文章の区切りを明確に）
- 文章が長い場合は、適切な箇所で改行を入れて読みやすくする

【重要な改行ルール】
- 文章が終わったら必ず改行（改行コード\nを使用）
- 長い文章は読みやすくするため適切な箇所で改行
- ✅項目の間には空行を入れる
- 段落と段落の間には空行を入れる

【要求】
- 実際に生成されたページ内容を正確に踏襲
- 上記フォーマットを厳密に遵守
- 各ページの価値を簡潔に表現
`
    
    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const caption = response.text().trim()
      // マークダウン記法を除去
      return MarkdownUtils.removeMarkdown(caption)
    } catch (error) {
      console.error('Caption generation failed:', error)
      // フォールバック: 簡易キャプション生成
      return `${originalInput}\n\n${generatedPages.map(p => `✅ ${p.content.title}`).join('\n')}`
    }
  }


  /**
   * ハッシュタグのみを再生成
   */
  async regenerateHashtags(content: GeneratedContent): Promise<GeneratedContent> {
    try {
      const model = this.model
      
      // コンテンツの概要を作成
      const contentSummary = `
        タイトル: ${content.summary}
        
        ページ内容:
        ${content.pages.map(page => `- ${page.content.title}: ${page.content.description || ''}`).join('\n')}
      `.trim()

      const prompt = `
以下のInstagram投稿コンテンツに最適化されたハッシュタグを再生成してください。

【コンテンツ内容】
${contentSummary}

【指示】
就活・キャリア・インターンシップ関連のハッシュタグを以下の形式で生成：

1. **大カテゴリ（4個）**: メインテーマに関する大きなハッシュタグ（例：#就活、#キャリア、#インターン、#転職）
2. **中カテゴリ（4個）**: より具体的なハッシュタグ（例：#就活生、#新卒採用、#ES対策、#面接対策）
3. **小カテゴリ（3個）**: 特化したハッシュタグ（例：#ES添削、#グループディスカッション、#志望動機）
4. **全体（11個）**: 上記の重複なしの全てのハッシュタグ

【重要な制約】
- ハッシュタグは重複させない
- 実際に使われている人気のハッシュタグを選ぶ
- 投稿内容に関連性の高いものを優先
- #記号を含めて出力

【出力形式（JSON）】
{
  "large": ["#就活", "#キャリア", "#インターン", "#転職"],
  "medium": ["#就活生", "#新卒採用", "#ES対策", "#面接対策"],
  "small": ["#ES添削", "#グループディスカッション", "#志望動機"],
  "all": ["#就活", "#キャリア", "#インターン", "#転職", "#就活生", "#新卒採用", "#ES対策", "#面接対策", "#ES添削", "#グループディスカッション", "#志望動機"]
}
`

      const result = await model.generateContent(prompt)
      const responseText = result.response.text()
      
      try {
        const cleanText = responseText.replace(/```json\n?|```\n?/g, '').trim()
        const newHashtags = JSON.parse(cleanText)
        
        return {
          ...content,
          hashtags: {
            ...content.hashtags,
            large: newHashtags.large || content.hashtags.large,
            medium: newHashtags.medium || content.hashtags.medium,
            small: newHashtags.small || content.hashtags.small,
            all: newHashtags.all || content.hashtags.all
          }
        }
      } catch (parseError) {
        console.error('Failed to parse new hashtags:', parseError)
        throw new Error('ハッシュタグの解析に失敗しました')
      }
    } catch (error) {
      console.error('Hashtag regeneration failed:', error)
      throw new Error('ハッシュタグの再生成に失敗しました')
    }
  }
}

export const contentGeneratorService = new ContentGeneratorService()