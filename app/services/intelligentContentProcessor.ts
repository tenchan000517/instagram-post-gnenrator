// インテリジェントコンテンツ処理システム
import { TemplateType } from '../components/templates/TemplateTypes'

export interface ProcessedContent {
  id: string
  title: string
  templateType: TemplateType
  templateData: any
  contentType: ContentType
  priority: number
}

export interface ContentSection {
  title: string
  content: string
  type: 'intro' | 'main' | 'detail' | 'summary'
  dataType: 'list' | 'comparison' | 'steps' | 'story' | 'qa' | 'tips'
  beneficialInfo: BeneficialInfo[]
}

export interface BeneficialInfo {
  type: 'action' | 'tool' | 'number' | 'authority' | 'result'
  content: string
  specificity: number // 具体性スコア
}

export type ContentType = 'routine' | 'comparison' | 'tips' | 'story' | 'qa' | 'steps'

export class IntelligentContentProcessor {
  /**
   * メイン処理：コンテンツ理解→有益情報抽出→最適表現
   */
  static processContent(input: string): ProcessedContent[] {
    console.log('🧠 インテリジェントコンテンツ処理開始')
    
    // 1. コンテンツの意味理解
    const sections = this.understandContent(input)
    console.log('📖 コンテンツセクション:', sections.map(s => s.title))
    
    // 2. 有益情報の抽出
    const processedSections = sections.map(section => this.extractBeneficialInfo(section))
    
    // 3. 最適表現への変換
    const contents = this.convertToOptimalExpression(processedSections)
    
    // 4. 優先度順にソート
    return contents.sort((a, b) => b.priority - a.priority)
  }

  /**
   * コンテンツの意味理解
   */
  private static understandContent(input: string): ContentSection[] {
    const sections: ContentSection[] = []
    
    // 全体テーマの把握
    const overallTheme = this.extractOverallTheme(input)
    console.log('🎯 全体テーマ:', overallTheme)
    
    // 章立て構造の認識
    const chapters = this.extractChapters(input)
    console.log('📚 章立て:', chapters.map(c => c.title))
    
    chapters.forEach((chapter, index) => {
      const section: ContentSection = {
        title: chapter.title,
        content: chapter.content,
        type: index === 0 ? 'intro' : 
              index === chapters.length - 1 ? 'summary' : 
              'detail',
        dataType: this.identifyDataType(chapter.content),
        beneficialInfo: []
      }
      sections.push(section)
    })
    
    return sections
  }

  /**
   * 全体テーマの抽出
   */
  private static extractOverallTheme(input: string): string {
    // タイトル行の抽出
    const firstLine = input.split('\n')[0]
    if (firstLine.includes('：') || firstLine.includes(':')) {
      return firstLine.split(/：|:/)[0].trim()
    }
    
    // キーワードベースの推定
    if (/ルーティーン|習慣|行動/.test(input)) return 'ルーティーン'
    if (/比較|違い|選択/.test(input)) return '比較'
    if (/方法|手順|ステップ/.test(input)) return '手順'
    if (/体験|事例|ストーリー/.test(input)) return '体験談'
    if (/質問|回答|Q&A/.test(input)) return 'Q&A'
    
    return 'キャリア情報'
  }

  /**
   * 章立て構造の抽出
   */
  private static extractChapters(input: string): { title: string; content: string }[] {
    const chapters: { title: string; content: string }[] = []
    
    // 章番号やタイトルで分割
    const chapterPattern = /第\d+章：|第\d+章　|■|▼|#{1,3}\s/
    const parts = input.split(chapterPattern)
    
    if (parts.length > 1) {
      // 章立てがある場合
      parts.slice(1).forEach((part, index) => {
        const lines = part.trim().split('\n')
        const title = lines[0]?.trim() || `セクション${index + 1}`
        const content = lines.slice(1).join('\n').trim()
        
        if (content.length > 50) {
          chapters.push({ title, content })
        }
      })
    } else {
      // 章立てがない場合は段落で分割
      const paragraphs = input.split('\n\n').filter(p => p.trim().length > 100)
      paragraphs.forEach((paragraph, index) => {
        const lines = paragraph.trim().split('\n')
        const title = lines[0]?.substring(0, 30) || `ポイント${index + 1}`
        chapters.push({ title, content: paragraph })
      })
    }
    
    return chapters
  }

  /**
   * データタイプの識別
   */
  private static identifyDataType(content: string): ContentSection['dataType'] {
    // リスト形式の検出
    if (/^[\s]*[・•\-]\s|^\d+\.\s|^[①②③④⑤⑥⑦⑧⑨⑩]/m.test(content)) {
      return 'list'
    }
    
    // 比較形式の検出
    if (/vs|比較|違い|対|メリット.*デメリット/i.test(content)) {
      return 'comparison'
    }
    
    // 手順形式の検出
    if (/手順|ステップ|段階|方法|やり方/.test(content)) {
      return 'steps'
    }
    
    // ストーリー形式の検出
    if (/体験|事例|実際|例えば|結果/.test(content)) {
      return 'story'
    }
    
    // Q&A形式の検出
    if (/質問|回答|Q&A|\?|？/.test(content)) {
      return 'qa'
    }
    
    return 'tips'
  }

  /**
   * 有益情報の抽出
   */
  private static extractBeneficialInfo(section: ContentSection): ContentSection {
    const beneficialInfo: BeneficialInfo[] = []
    
    // 具体的な行動の抽出
    const actions = this.extractActions(section.content)
    actions.forEach(action => {
      beneficialInfo.push({
        type: 'action',
        content: action,
        specificity: this.calculateSpecificity(action)
      })
    })
    
    // ツール・サービスの抽出
    const tools = this.extractTools(section.content)
    tools.forEach(tool => {
      beneficialInfo.push({
        type: 'tool',
        content: tool,
        specificity: this.calculateSpecificity(tool)
      })
    })
    
    // 数値・期間の抽出
    const numbers = this.extractNumbers(section.content)
    numbers.forEach(number => {
      beneficialInfo.push({
        type: 'number',
        content: number,
        specificity: 0.9 // 数値は常に具体的
      })
    })
    
    // 権威性の抽出
    const authorities = this.extractAuthorities(section.content)
    authorities.forEach(authority => {
      beneficialInfo.push({
        type: 'authority',
        content: authority,
        specificity: 0.8
      })
    })
    
    // 結果・効果の抽出
    const results = this.extractResults(section.content)
    results.forEach(result => {
      beneficialInfo.push({
        type: 'result',
        content: result,
        specificity: this.calculateSpecificity(result)
      })
    })
    
    return {
      ...section,
      beneficialInfo: beneficialInfo.sort((a, b) => b.specificity - a.specificity)
    }
  }

  /**
   * 具体的な行動の抽出
   */
  private static extractActions(content: string): string[] {
    const actions: string[] = []
    
    // 動詞を含む具体的な行動
    const actionPatterns = [
      /朝食を作る|コーヒーを入れる|ベッドを整える|アイロンをかける/g,
      /鏡に向かって笑顔|ToDoリストを作る|スケジュールを管理/g,
      /新聞を読む|ニュースをチェック|本屋に立ち寄る/g,
      /振り返りを記録|日記をつける|情報を整理/g
    ]
    
    actionPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        actions.push(...matches)
      }
    })
    
    return [...new Set(actions)]
  }

  /**
   * ツール・サービスの抽出
   */
  private static extractTools(content: string): string[] {
    const tools: string[] = []
    
    const toolPatterns = [
      /Googleカレンダー|Googleスプレッドシート|Googleドキュメント|Googleドライブ|Gmail/g,
      /手帳|ToDoリスト|付箋|アナログ/g,
      /アプリ|ツール|システム|プラットフォーム/g
    ]
    
    toolPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        tools.push(...matches)
      }
    })
    
    return [...new Set(tools)]
  }

  /**
   * 数値・期間の抽出
   */
  private static extractNumbers(content: string): string[] {
    const numbers: string[] = []
    
    // 数値パターン
    const numberPatterns = [
      /\d+分|\d+時間|\d+日|\d+週間|\d+ヶ月/g,
      /\d+回|\d+つ|\d+個|\d+項目/g,
      /\d+%|\d+倍|\d+年/g
    ]
    
    numberPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        numbers.push(...matches)
      }
    })
    
    return [...new Set(numbers)]
  }

  /**
   * 権威性の抽出
   */
  private static extractAuthorities(content: string): string[] {
    const authorities: string[] = []
    
    // 専門家・権威の言及
    const authorityPatterns = [
      /精神科医.*?氏|医師.*?氏|専門家.*?氏/g,
      /研究によると|調査結果|データによると/g,
      /成功者|大成功を収めた人|ビジネスで成功/g
    ]
    
    authorityPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        authorities.push(...matches)
      }
    })
    
    return [...new Set(authorities)]
  }

  /**
   * 結果・効果の抽出
   */
  private static extractResults(content: string): string[] {
    const results: string[] = []
    
    // 効果・結果の表現
    const resultPatterns = [
      /達成感を得られ|意欲を高める|効果が期待/g,
      /自己肯定感を高め|モチベーション維持|精神的な回復力/g,
      /効率的に|生産性の向上|質を高める/g
    ]
    
    resultPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        results.push(...matches)
      }
    })
    
    return [...new Set(results)]
  }

  /**
   * 具体性スコアの計算
   */
  private static calculateSpecificity(text: string): number {
    let score = 0.5
    
    // 具体的な動詞があるか
    if (/作る|入れる|整える|かける|書く|読む|チェック/.test(text)) {
      score += 0.2
    }
    
    // 具体的な名詞があるか
    if (/朝食|コーヒー|ベッド|鏡|手帳|アプリ/.test(text)) {
      score += 0.2
    }
    
    // 数値が含まれているか
    if (/\d+/.test(text)) {
      score += 0.1
    }
    
    return Math.min(score, 1.0)
  }

  /**
   * 最適表現への変換
   */
  private static convertToOptimalExpression(sections: ContentSection[]): ProcessedContent[] {
    const contents: ProcessedContent[] = []
    
    sections.forEach((section, index) => {
      // テンプレートタイプの決定
      const templateType = this.selectTemplateType(section)
      
      // テンプレートデータの生成
      const templateData = this.generateTemplateData(section, templateType)
      
      // 優先度の計算
      const priority = this.calculatePriority(section, index)
      
      contents.push({
        id: `content_${index}`,
        title: this.optimizeTitle(section.title, section.beneficialInfo),
        templateType,
        templateData,
        contentType: this.mapToContentType(section.dataType),
        priority
      })
    })
    
    return contents
  }

  /**
   * テンプレートタイプの選択
   */
  private static selectTemplateType(section: ContentSection): TemplateType {
    switch (section.dataType) {
      case 'list':
        return section.beneficialInfo.length > 5 ? 'list' : 'enumeration'
      case 'comparison':
        return 'table'
      case 'steps':
        return 'enumeration'
      case 'story':
        return 'section-items'
      case 'qa':
        return 'explanation2'
      default:
        return 'simple3'
    }
  }

  /**
   * テンプレートデータの生成
   */
  private static generateTemplateData(section: ContentSection, templateType: TemplateType): any {
    const beneficialItems = section.beneficialInfo
      .filter(info => info.specificity > 0.6)
      .slice(0, 5)
    
    const title = this.optimizeTitle(section.title, section.beneficialInfo)
    const badgeText = this.generateBadgeText(section.dataType)
    
    switch (templateType) {
      case 'enumeration':
      case 'list':
        return {
          title,
          badgeText,
          items: beneficialItems.map(item => this.conciseExpression(item.content)),
          subtitle: 'FIND to DOで実践しよう'
        }
        
      case 'table':
        return {
          title,
          badgeText,
          tableData: this.generateTableData(beneficialItems),
          subtitle: 'データで比較・検討しよう'
        }
        
      case 'story':
        return {
          title,
          badgeText,
          content: this.generateStoryContent(beneficialItems),
          subtitle: 'あなたも同じように成長できる'
        }
        
      default:
        return {
          title,
          badgeText,
          content: beneficialItems.map(item => this.conciseExpression(item.content)).join('。'),
          subtitle: 'FIND to DOで一緒に成長しよう'
        }
    }
  }

  /**
   * タイトルの最適化
   */
  private static optimizeTitle(title: string, beneficialInfo: BeneficialInfo[]): string {
    // 数値を含む場合は数値を強調
    const numbers = beneficialInfo.filter(info => info.type === 'number')
    if (numbers.length > 0) {
      const number = numbers[0].content.match(/\d+/)?.[0]
      if (number) {
        return `${title.split('：')[0]}${number}選`
      }
    }
    
    // 具体的な行動が多い場合
    const actions = beneficialInfo.filter(info => info.type === 'action')
    if (actions.length >= 3) {
      return `${title.split('：')[0]}の実践法`
    }
    
    return title.split('：')[0]
  }

  /**
   * バッジテキストの生成
   */
  private static generateBadgeText(dataType: ContentSection['dataType']): string {
    switch (dataType) {
      case 'list': return '重要ポイント'
      case 'comparison': return '比較データ'
      case 'steps': return 'ステップ解説'
      case 'story': return '体験談'
      case 'qa': return 'Q&A'
      default: return 'チェック'
    }
  }

  /**
   * 簡潔な表現への変換
   */
  private static conciseExpression(text: string): string {
    // 冗長な表現を削除
    let result = text
      .replace(/することで|することによって|するため|するために/g, '')
      .replace(/〜と言えるでしょう|〜ことができます/g, '')
      .replace(/また、|そして、|さらに、/g, '')
      .trim()
    
    // 25文字以内に収める
    if (result.length > 25) {
      result = result.substring(0, 22) + '...'
    }
    
    return result
  }

  /**
   * その他のヘルパーメソッド
   */
  private static generateTableData(items: BeneficialInfo[]): { headers: string[]; rows: string[][] } {
    return {
      headers: ['項目', '内容', '効果'],
      rows: items.slice(0, 5).map((item, i) => [
        `項目${i + 1}`,
        this.conciseExpression(item.content),
        item.type === 'result' ? '高' : '中'
      ])
    }
  }

  private static generateStoryContent(items: BeneficialInfo[]): string {
    const actions = items.filter(item => item.type === 'action')
    const results = items.filter(item => item.type === 'result')
    
    let story = ''
    if (actions.length > 0) {
      story += `実際に${actions[0].content}をやってみると、`
    }
    if (results.length > 0) {
      story += `${results[0].content}という効果がありました。`
    }
    
    return story || '具体的な行動が成果につながりました。'
  }

  private static mapToContentType(dataType: ContentSection['dataType']): ContentType {
    switch (dataType) {
      case 'list': return 'tips'
      case 'comparison': return 'comparison'
      case 'steps': return 'steps'
      case 'story': return 'story'
      case 'qa': return 'qa'
      default: return 'routine'
    }
  }

  private static calculatePriority(section: ContentSection, index: number): number {
    let priority = 0.5
    
    // 有益情報の数と質
    const highQualityInfo = section.beneficialInfo.filter(info => info.specificity > 0.7)
    priority += highQualityInfo.length * 0.1
    
    // セクションタイプ
    if (section.type === 'intro') priority += 0.3
    if (section.type === 'main') priority += 0.2
    
    // データタイプ
    if (section.dataType === 'list' || section.dataType === 'comparison') priority += 0.1
    
    return Math.min(priority, 1.0)
  }
}