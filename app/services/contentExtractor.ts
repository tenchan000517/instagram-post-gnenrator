// コンテンツ抽出・分析システム
export interface ExtractedContent {
  id: string
  title: string
  category: string
  density: number // 情報密度スコア
  structure: ContentStructure
  rawContent: string
  keywords: string[]
}

export interface ContentStructure {
  type: 'title-list' | 'title-subtitle-descriptions' | 'step-by-step' | 'comparison-table' | 'story-narrative' | 'qa-format'
  elements: ContentElement[]
}

export interface ContentElement {
  type: 'title' | 'subtitle' | 'description' | 'list-item' | 'table-header' | 'table-row' | 'story-section'
  content: string
  metadata?: any
}

export class ContentExtractor {
  /**
   * リサーチ結果やリストから有益なコンテンツを抽出
   */
  static extractBeneficialContent(input: string, targetHashtags: string[]): ExtractedContent[] {
    console.log('📋 コンテンツ抽出開始:', { inputLength: input.length, targetHashtags })
    
    // 1. 入力内容を意味のあるセクションに分割
    const sections = this.splitIntoSections(input)
    console.log('📄 セクション分割結果:', { sectionCount: sections.length, sections: sections.map(s => s.substring(0, 50) + '...') })
    
    // 2. 各セクションから有益なコンテンツを抽出
    const extractedContents: ExtractedContent[] = []
    
    sections.forEach((section, index) => {
      // ハッシュタグとの関連性チェック
      const relevanceScore = this.calculateRelevance(section, targetHashtags)
      console.log(`🔍 セクション${index + 1} 関連性スコア:`, relevanceScore)
      
      if (relevanceScore > 0.1) { // 閾値を下げる（0.3 → 0.1）
        // 密度の高いコンテンツを抽出
        const densified = this.densifyContent(section, targetHashtags)
        console.log(`💡 セクション${index + 1} 密度化結果:`, densified ? '成功' : '失敗')
        
        if (densified) {
          extractedContents.push({
            id: `content_${index}`,
            title: densified.title,
            category: densified.category,
            density: densified.density,
            structure: this.analyzeContentStructure(densified.content),
            rawContent: densified.content,
            keywords: densified.keywords
          })
        }
      }
    })
    
    console.log('✅ 最終抽出結果:', { extractedCount: extractedContents.length })
    
    // 4. コンテンツが見つからない場合はフォールバック
    if (extractedContents.length === 0) {
      console.log('⚠️ 有益なコンテンツが見つからないため、フォールバック処理を実行')
      return this.createFallbackContent(input, targetHashtags)
    }
    
    // 3. 密度スコアでソート
    return extractedContents.sort((a, b) => b.density - a.density)
  }

  /**
   * 入力内容を意味のあるセクションに分割
   */
  private static splitIntoSections(input: string): string[] {
    // 改行、見出し、番号付きリストなどで分割
    let sections = input.split(/\n\s*\n|\n(?=\d+\.|\n(?=[①②③④⑤⑥⑦⑧⑨⑩])|(?=【|■|▼))/)
      .map(s => s.trim())
      .filter(s => s.length > 10) // 条件を緩和（20 → 10）
    
    // セクションが見つからない場合は、より柔軟な分割を試行
    if (sections.length === 0) {
      sections = input.split(/[。！？]/)
        .map(s => s.trim())
        .filter(s => s.length > 10)
    }
    
    // それでもセクションが見つからない場合は、入力全体を1つのセクションとして扱う
    if (sections.length === 0) {
      sections = [input]
    }
    
    return sections
  }

  /**
   * ハッシュタグとの関連性を計算
   */
  private static calculateRelevance(section: string, targetHashtags: string[]): number {
    const sectionLower = section.toLowerCase()
    let score = 0
    
    // ハッシュタグがない場合は基本スコアを与える
    if (targetHashtags.length === 0) {
      return 0.5
    }
    
    targetHashtags.forEach(tag => {
      const tagClean = tag.replace('#', '').toLowerCase()
      if (sectionLower.includes(tagClean)) {
        score += 1
      }
    })
    
    // 一般的なキャリア関連キーワードでもスコアを加算
    const careerKeywords = ['就活', '転職', 'キャリア', '仕事', '面接', '自己分析', '企業', '選考', 'インターン', '内定', '就職']
    careerKeywords.forEach(keyword => {
      if (sectionLower.includes(keyword)) {
        score += 0.3
      }
    })
    
    return Math.min(score / targetHashtags.length, 1.0)
  }

  /**
   * コンテンツの密度を高める（憶測・推測は含まない）
   */
  private static densifyContent(section: string, targetHashtags: string[]): {
    title: string
    category: string
    density: number
    content: string
    keywords: string[]
  } | null {
    
    // 具体的な情報を抽出
    const concreteInfo = this.extractConcreteInfo(section)
    
    if (concreteInfo.length < 1) return null // 具体的な情報が少ない場合は除外（条件を緩和）
    
    // カテゴリを特定
    const category = this.identifyCategory(section, targetHashtags)
    
    // タイトルを生成
    const title = this.generateTitle(section, category)
    
    // 密度スコアを計算
    const density = this.calculateDensity(concreteInfo, section.length)
    
    return {
      title,
      category,
      density,
      content: concreteInfo.join('\n'),
      keywords: this.extractKeywords(section)
    }
  }

  /**
   * 具体的な情報を抽出（憶測・推測は除く）
   */
  private static extractConcreteInfo(section: string): string[] {
    const sentences = section.split(/[。！？]/).filter(s => s.trim().length > 0)
    const concreteInfo: string[] = []
    
    sentences.forEach(sentence => {
      // 具体的な情報の特徴をチェック
      const isConcrete = this.isConcreteInformation(sentence)
      
      if (isConcrete) {
        concreteInfo.push(sentence.trim())
      }
    })
    
    // 具体的な情報が少ない場合は、より緩い条件で追加
    if (concreteInfo.length < 2) {
      sentences.forEach(sentence => {
        if (sentence.trim().length > 15 && !concreteInfo.includes(sentence.trim())) {
          concreteInfo.push(sentence.trim())
        }
      })
    }
    
    return concreteInfo
  }

  /**
   * 具体的な情報かどうかを判定
   */
  private static isConcreteInformation(sentence: string): boolean {
    // 具体的な情報の特徴
    const concretePatterns = [
      /\d+年|\d+月|\d+日/, // 具体的な日付
      /\d+%|\d+円|\d+人/, // 具体的な数値
      /方法|手順|ステップ/, // 具体的な方法
      /企業名|会社名|サービス名/, // 具体的な名称
      /結果|効果|成果/, // 具体的な結果
    ]
    
    // 推測・憶測の特徴
    const speculativePatterns = [
      /思う|考える|かもしれない|だろう|推測|憶測/,
      /〜と思われる|〜の可能性/,
      /一般的に|通常|普通は/
    ]
    
    // 具体的な情報かつ推測でない
    const hasConcrete = concretePatterns.some(pattern => pattern.test(sentence))
    const hasSpeculative = speculativePatterns.some(pattern => pattern.test(sentence))
    
    return hasConcrete && !hasSpeculative
  }

  /**
   * カテゴリを特定
   */
  private static identifyCategory(section: string, targetHashtags: string[]): string {
    const sectionLower = section.toLowerCase()
    
    // 主要カテゴリの特定
    if (/自己分析|自己理解/.test(sectionLower)) return '自己分析'
    if (/面接|選考/.test(sectionLower)) return '面接対策'
    if (/エントリーシート|ES/.test(sectionLower)) return 'ES対策'
    if (/インターン/.test(sectionLower)) return 'インターン'
    if (/企業研究/.test(sectionLower)) return '企業研究'
    if (/就活|就職活動/.test(sectionLower)) return '就活一般'
    
    // ハッシュタグから推定
    const relevantTag = targetHashtags.find(tag => 
      sectionLower.includes(tag.replace('#', '').toLowerCase())
    )
    
    return relevantTag ? relevantTag.replace('#', '') : 'その他'
  }

  /**
   * タイトルを生成
   */
  private static generateTitle(section: string, category: string): string {
    const firstSentence = section.split(/[。！？]/)[0]
    
    // カテゴリに応じたタイトル生成
    switch (category) {
      case '自己分析':
        return '自己分析の具体的方法'
      case '面接対策':
        return '面接で評価される回答法'
      case 'ES対策':
        return 'ES通過率を上げる書き方'
      case 'インターン':
        return 'インターン選考突破法'
      case '企業研究':
        return '効果的な企業研究手順'
      default:
        return firstSentence.substring(0, 20) || 'キャリア情報'
    }
  }

  /**
   * 情報密度スコアを計算
   */
  private static calculateDensity(concreteInfo: string[], totalLength: number): number {
    const concreteLength = concreteInfo.join('').length
    const density = concreteLength / totalLength
    
    // 具体的な情報の数も考慮
    const informationCount = concreteInfo.length
    const countBonus = Math.min(informationCount * 0.1, 0.5)
    
    return Math.min(density + countBonus, 1.0)
  }

  /**
   * キーワードを抽出
   */
  private static extractKeywords(section: string): string[] {
    const keywords: string[] = []
    const sectionLower = section.toLowerCase()
    
    // 重要なキーワードパターン
    const keywordPatterns = [
      /自己分析|自己理解|自己認識/g,
      /面接|選考|採用/g,
      /エントリーシート|ES|志望動機/g,
      /インターン|インターンシップ/g,
      /企業研究|業界研究/g,
      /就活|就職活動|キャリア/g
    ]
    
    keywordPatterns.forEach(pattern => {
      const matches = sectionLower.match(pattern)
      if (matches) {
        keywords.push(...matches)
      }
    })
    
    return [...new Set(keywords)] // 重複除去
  }

  /**
   * フォールバックコンテンツを生成
   */
  private static createFallbackContent(input: string, targetHashtags: string[]): ExtractedContent[] {
    // 単純に入力内容全体を1つのコンテンツとして扱う
    const fallbackContent: ExtractedContent = {
      id: 'fallback_content',
      title: 'キャリア情報',
      category: 'その他',
      density: 0.5,
      structure: this.analyzeContentStructure(input),
      rawContent: input,
      keywords: targetHashtags.map(tag => tag.replace('#', ''))
    }
    
    return [fallbackContent]
  }

  /**
   * コンテンツの構造を分析
   */
  private static analyzeContentStructure(content: string): ContentStructure {
    const lines = content.split('\n').filter(line => line.trim().length > 0)
    
    // 構造パターンの分析
    const hasNumberedList = /^\d+\.|\d+\)|[①②③④⑤⑥⑦⑧⑨⑩]/.test(lines.join('\n'))
    const hasBulletList = /^[・•\-]/.test(lines.join('\n'))
    const hasTableStructure = lines.some(line => line.includes('|') || line.includes('\t'))
    const hasStoryStructure = /問題|課題|解決|結果|変化/.test(content)
    const hasQAStructure = /\?|？|質問|回答|Q&A/.test(content)
    
    // 構造タイプの決定
    let structureType: ContentStructure['type']
    
    if (hasTableStructure) {
      structureType = 'comparison-table'
    } else if (hasNumberedList) {
      structureType = 'step-by-step'
    } else if (hasBulletList) {
      structureType = 'title-list'
    } else if (hasStoryStructure) {
      structureType = 'story-narrative'
    } else if (hasQAStructure) {
      structureType = 'qa-format'
    } else {
      structureType = 'title-subtitle-descriptions'
    }
    
    // 要素の抽出
    const elements = this.extractElements(lines, structureType)
    
    return {
      type: structureType,
      elements
    }
  }

  /**
   * 構造に応じた要素を抽出
   */
  private static extractElements(lines: string[], structureType: ContentStructure['type']): ContentElement[] {
    const elements: ContentElement[] = []
    
    switch (structureType) {
      case 'title-list':
        elements.push({ type: 'title', content: lines[0] })
        lines.slice(1).forEach(line => {
          elements.push({ type: 'list-item', content: line.replace(/^[・•\-]\s*/, '') })
        })
        break
        
      case 'title-subtitle-descriptions':
        elements.push({ type: 'title', content: lines[0] })
        for (let i = 1; i < lines.length; i += 2) {
          if (lines[i]) elements.push({ type: 'subtitle', content: lines[i] })
          if (lines[i + 1]) elements.push({ type: 'description', content: lines[i + 1] })
        }
        break
        
      case 'step-by-step':
        elements.push({ type: 'title', content: lines[0] })
        lines.slice(1).forEach(line => {
          elements.push({ type: 'list-item', content: line.replace(/^\d+\.?\s*|^[①②③④⑤⑥⑦⑧⑨⑩]\s*/, '') })
        })
        break
        
      default:
        lines.forEach(line => {
          elements.push({ type: 'description', content: line })
        })
    }
    
    return elements
  }
}