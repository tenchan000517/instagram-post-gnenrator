// TemplateRecommendationService - 生成コンテンツに最適なテンプレートを推奨
import { TemplateType } from '../components/templates/TemplateTypes'
import { ContentLayoutService } from './contentLayoutService'

export interface TemplateRecommendation {
  templateType: TemplateType
  confidence: number // 0-1の信頼度
  reason: string
  previewSummary: string
  fitScore: number // 0-100のフィット度
}

export interface RecommendationResult {
  primary: TemplateRecommendation
  alternatives: TemplateRecommendation[]
  contentAnalysis: {
    hasLists: boolean
    hasSections: boolean
    hasComparisons: boolean
    hasStoryElements: boolean
    contentLength: number
    structureType: string
  }
}

export class TemplateRecommendationService {
  /**
   * 生成されたコンテンツに対して最適なテンプレートを推奨
   */
  static recommendTemplates(content: string): RecommendationResult {
    // 1. コンテンツを分析
    const analysis = this.analyzeContent(content)
    
    // 2. 各テンプレートの適合性を評価
    const evaluations = this.evaluateAllTemplates(content, analysis)
    
    // 3. 推奨順でソート
    const sorted = evaluations.sort((a, b) => b.fitScore - a.fitScore)
    
    return {
      primary: sorted[0],
      alternatives: sorted.slice(1, 4), // 上位3つの代替案
      contentAnalysis: analysis
    }
  }

  /**
   * コンテンツを分析
   */
  private static analyzeContent(content: string) {
    const lines = content.split('\n').filter(line => line.trim().length > 0)
    
    return {
      hasLists: this.detectLists(content),
      hasSections: this.detectSections(content),
      hasComparisons: this.detectComparisons(content),
      hasStoryElements: this.detectStoryElements(content),
      contentLength: content.length,
      structureType: this.detectStructureType(content)
    }
  }

  /**
   * リスト要素を検出（強化版）
   */
  private static detectLists(content: string): boolean {
    const listPatterns = [
      /項目:\s*\n/,
      /^[・•\-*]/m,
      /^\d+[.\)]/m,
      /^[①②③④⑤⑥⑦⑧⑨⑩]/m,
      /^(１|２|３|４|５|６|７|８|９|０)/m,
      /^[ア-ワ][）\)]/m,
      /^[a-zA-Z][.\)]/m
    ]
    
    // 複数行でのリストパターンもチェック
    const lines = content.split('\n')
    let consecutiveListItems = 0
    
    for (const line of lines) {
      if (listPatterns.some(pattern => pattern.test(line))) {
        consecutiveListItems++
        if (consecutiveListItems >= 2) return true
      } else {
        consecutiveListItems = 0
      }
    }
    
    return false
  }

  /**
   * セクション構造を検出（強化版）
   */
  private static detectSections(content: string): boolean {
    const sectionPatterns = [
      /セクション:/,
      /^[^。！？\n]{5,20}$(?=\n[^。！？\n]{20,})/m, // セクションタイトル後に詳細
      /^## /m,
      /^### /m,
      /^【[^】]+】/m, // 【タイトル】形式
      /^「[^」]+」/m, // 「タイトル」形式
    ]
    
    // 段落構造もチェック
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0)
    const hasMultipleParagraphs = paragraphs.length >= 2
    
    // 各段落が構造化されているかチェック
    const structuredParagraphs = paragraphs.filter(para => {
      const lines = para.split('\n')
      return lines.length > 1 && lines[0].length < 50 && lines[1].length > 20
    })
    
    return sectionPatterns.some(pattern => pattern.test(content)) || 
           (hasMultipleParagraphs && structuredParagraphs.length >= 2)
  }

  /**
   * 比較要素を検出
   */
  private static detectComparisons(content: string): boolean {
    const comparisonPatterns = [
      /vs|対|比較|違い|差|メリット.*デメリット/i,
      /一方|他方|それに対して|しかし/,
      /デジタル.*アナログ|A.*B|前者.*後者/i
    ]
    
    return comparisonPatterns.some(pattern => pattern.test(content))
  }

  /**
   * ストーリー要素を検出
   */
  private static detectStoryElements(content: string): boolean {
    const storyPatterns = [
      /体験|経験|実際|事例|例えば/,
      /最初|その後|結果|最終的|今では/,
      /私|僕|彼|彼女|学生|友人/
    ]
    
    return storyPatterns.some(pattern => pattern.test(content))
  }

  /**
   * コンテンツの構造タイプを検出
   */
  private static detectStructureType(content: string): string {
    if (this.detectLists(content) && this.detectSections(content)) {
      return 'list-with-sections'
    }
    if (this.detectSections(content)) {
      return 'sectioned-content'
    }
    if (this.detectLists(content)) {
      return 'list-based'
    }
    if (this.detectComparisons(content)) {
      return 'comparison'
    }
    if (this.detectStoryElements(content)) {
      return 'narrative'
    }
    return 'simple-text'
  }

  /**
   * 全テンプレートの適合性を評価
   */
  private static evaluateAllTemplates(content: string, analysis: any): TemplateRecommendation[] {
    const templateTypes: TemplateType[] = [
      'enumeration', 'explanation2', 'table', 'section-items', 'list',
      'simple3', 'simple5', 'simple6', 'two-column-section-items',
      'title-description-only', 'checklist-enhanced', 'item-n-title-content',
      'ranking', 'graph'
    ]

    return templateTypes.map(templateType => 
      this.evaluateTemplate(content, analysis, templateType)
    )
  }

  /**
   * 特定のテンプレートの適合性を評価（強化版）
   */
  private static evaluateTemplate(
    content: string, 
    analysis: any, 
    templateType: TemplateType
  ): TemplateRecommendation {
    
    let fitScore = 0
    let reason = ''
    let confidence = 0

    // 基本適合性チェック
    const basicFit = this.checkBasicFit(content, analysis, templateType)
    fitScore += basicFit.score
    reason = basicFit.reason

    // 詳細評価
    switch (templateType) {
      case 'enumeration':
        if (analysis.hasLists) {
          fitScore += 40
          reason += '項目リストが明確に含まれています'
        }
        if (analysis.hasSections) {
          fitScore += 20
          reason += '、セクションで補完説明があります'
        }
        if (analysis.structureType === 'list-with-sections') {
          fitScore += 30
          reason += '、リスト+説明の理想的な構造です'
        }
        // 項目数に応じたボーナス
        const itemCount = this.countPotentialItems(content)
        if (itemCount >= 3 && itemCount <= 6) {
          fitScore += 15
          reason += `、${itemCount}項目の最適な量です`
        }
        break

      case 'explanation2':
        if (analysis.hasSections) {
          fitScore += 35
          reason += '詳細なセクション説明があります'
        }
        if (analysis.contentLength > 200) {
          fitScore += 25
          reason += '、十分な説明文があります'
        }
        if (!analysis.hasLists) {
          fitScore += 20
          reason += '、リスト形式ではない解説型です'
        }
        // 説明の深さを評価
        const explanationDepth = this.evaluateExplanationDepth(content)
        fitScore += explanationDepth * 10
        break

      case 'explanation2':
        if (analysis.hasSections && analysis.contentLength > 300) {
          fitScore += 45
          reason += '複数セクションの詳細解説です'
        }
        if (analysis.structureType === 'sectioned-content') {
          fitScore += 35
          reason += '、セクション構造化されています'
        }
        // セクション数に応じたボーナス
        const sectionCount = this.countPotentialSections(content)
        if (sectionCount >= 2 && sectionCount <= 4) {
          fitScore += 20
          reason += `、${sectionCount}セクションの最適な構成です`
        }
        break

      case 'table':
        if (analysis.hasComparisons) {
          fitScore += 50
          reason += '比較要素が含まれています'
        }
        if (analysis.hasLists && analysis.hasSections) {
          fitScore += 30
          reason += '、構造化されたデータがあります'
        }
        // データの表形式適合性
        const tableability = this.evaluateTableability(content)
        fitScore += tableability * 15
        break

      case 'section-items':
        if (analysis.hasStoryElements) {
          fitScore += 60
          reason += '体験談・事例の要素があります'
        }
        if (analysis.contentLength > 150) {
          fitScore += 20
          reason += '、ストーリー展開に十分な文量です'
        }
        // 時系列・感情の流れを評価
        const narrativeFlow = this.evaluateNarrativeFlow(content)
        fitScore += narrativeFlow * 10
        break

      case 'list':
        if (analysis.hasLists && !analysis.hasSections) {
          fitScore += 40
          reason += 'シンプルなリスト形式です'
        }
        if (analysis.structureType === 'list-based') {
          fitScore += 30
          reason += '、純粋なリスト構造です'
        }
        break

      case 'title-description-only':
        if (analysis.contentLength < 150) {
          fitScore += 50
          reason += '簡潔なメッセージです'
        }
        if (!analysis.hasLists && !analysis.hasSections) {
          fitScore += 40
          reason += '、シンプルな構造です'
        }
        if (analysis.structureType === 'simple-text') {
          fitScore += 30
          reason += '、タイトル+説明の理想形です'
        }
        break

      case 'checklist-enhanced':
        if (analysis.hasLists) {
          fitScore += 60
          reason += 'チェックリスト構造があります'
        }
        const checklistKeywords = ['チェック', '確認', 'タスク', '手順', '準備']
        const checklistMatches = checklistKeywords.filter(keyword => content.includes(keyword))
        if (checklistMatches.length > 0) {
          fitScore += 40
          reason += `、チェックリスト系キーワードが含まれています`
        }
        break

      case 'item-n-title-content':
        if (analysis.hasSections && analysis.contentLength > 200) {
          fitScore += 50
          reason += '複数のトピックがあります'
        }
        if (analysis.structureType === 'sectioned-content') {
          fitScore += 35
          reason += '、セクション化された構造です'
        }
        const conceptKeywords = ['ポイント', '要素', 'カテゴリ', '選択', '種類']
        const conceptMatches = conceptKeywords.filter(keyword => content.includes(keyword))
        if (conceptMatches.length > 0) {
          fitScore += 25
          reason += `、コンセプト系キーワードが含まれています`
        }
        break

      default:
        // simple系テンプレート
        if (analysis.contentLength < 200) {
          fitScore += 30
          reason += '簡潔なコンテンツです'
        }
        if (!analysis.hasLists && !analysis.hasSections) {
          fitScore += 25
          reason += '、シンプルな構造です'
        }
        break
    }

    // 実際の配置テストを行って精度を向上
    try {
      const layoutResult = ContentLayoutService.layoutContentToTemplate(content, templateType)
      if (layoutResult.layoutSuccess) {
        fitScore += 20
        reason += '、配置テストに成功しました'
      } else {
        fitScore -= 5
        reason += '、配置時に課題があります'
      }
    } catch (error) {
      fitScore -= 10
      reason += '、配置時にエラーが発生しました'
    }

    // 最終調整
    confidence = Math.min(fitScore / 100, 1)
    
    return {
      templateType,
      confidence,
      reason,
      previewSummary: this.generatePreviewSummary(content, templateType),
      fitScore: Math.min(fitScore, 100)
    }
  }

  /**
   * 基本適合性チェック
   */
  private static checkBasicFit(content: string, analysis: any, templateType: TemplateType): { score: number, reason: string } {
    // 文字数適合性
    const lengthFit = this.evaluateLengthFit(content.length, templateType)
    
    // 複雑度適合性
    const complexityFit = this.evaluateComplexityFit(analysis, templateType)
    
    return {
      score: lengthFit + complexityFit,
      reason: ''
    }
  }

  /**
   * 文字数適合性評価
   */
  private static evaluateLengthFit(length: number, templateType: TemplateType): number {
    const optimalLengths: Record<TemplateType, [number, number]> = {
      index: [50, 200],
      enumeration: [100, 400],
      explanation2: [200, 800],
      table: [150, 500],
      'section-items': [200, 600],
      list: [80, 300],
      simple3: [50, 200],
      simple5: [80, 350],
      simple6: [100, 450],
      'two-column-section-items': [200, 600],
      'title-description-only': [30, 150],
      'checklist-enhanced': [150, 500],
      'item-n-title-content': [200, 600],
      'single-section-no-items': [150, 400],
      'ranking': [200, 600],
      'graph': [150, 500]
    }
    
    const [min, max] = optimalLengths[templateType]
    if (length >= min && length <= max) {
      return 20
    } else if (length >= min * 0.7 && length <= max * 1.3) {
      return 10
    }
    return 0
  }

  /**
   * 複雑度適合性評価
   */
  private static evaluateComplexityFit(analysis: any, templateType: TemplateType): number {
    const complexityScores: Record<TemplateType, number> = {
      index: 5,
      enumeration: analysis.hasLists ? 15 : 5,
      explanation2: analysis.hasSections ? 15 : 5,
      table: analysis.hasComparisons ? 15 : 5,
      'section-items': analysis.hasStoryElements ? 15 : 5,
      list: analysis.hasLists ? 15 : 5,
      simple3: (!analysis.hasLists && !analysis.hasSections) ? 15 : 5,
      simple5: 10,
      simple6: 10,
      'two-column-section-items': 10,
      'title-description-only': (!analysis.hasLists && !analysis.hasSections) ? 15 : 5,
      'checklist-enhanced': analysis.hasLists ? 15 : 5,
      'item-n-title-content': analysis.hasSections ? 15 : 5,
      'single-section-no-items': analysis.hasSections && !analysis.hasLists ? 15 : 5,
      'ranking': analysis.hasLists && analysis.hasComparisons ? 20 : 5,
      'graph': analysis.hasComparisons || analysis.contentLength > 300 ? 18 : 8
    }
    
    return complexityScores[templateType] || 5
  }

  /**
   * 潜在的な項目数をカウント
   */
  private static countPotentialItems(content: string): number {
    const lines = content.split('\n')
    const listItems = lines.filter(line => 
      /^([・•\-*]|[\d+]+[.\)]|[①②③④⑤⑥⑦⑧⑨⑩])/.test(line.trim())
    )
    return listItems.length
  }

  /**
   * 潜在的なセクション数をカウント
   */
  private static countPotentialSections(content: string): number {
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0)
    return paragraphs.length
  }

  /**
   * 説明の深さを評価
   */
  private static evaluateExplanationDepth(content: string): number {
    const keywords = ['なぜなら', 'つまり', '具体的には', '例えば', 'その理由は']
    const keywordCount = keywords.reduce((count, keyword) => {
      return count + (content.split(keyword).length - 1)
    }, 0)
    return Math.min(keywordCount, 3)
  }

  /**
   * 表形式適合性を評価
   */
  private static evaluateTableability(content: string): number {
    const tableKeywords = ['比較', '対比', '違い', 'vs', 'データ', '数値', '統計']
    const keywordCount = tableKeywords.reduce((count, keyword) => {
      return count + (content.includes(keyword) ? 1 : 0)
    }, 0)
    return Math.min(keywordCount, 3)
  }

  /**
   * 物語の流れを評価
   */
  private static evaluateNarrativeFlow(content: string): number {
    const flowKeywords = ['最初', 'その後', '次に', '最終的に', '結果として', '今では']
    const keywordCount = flowKeywords.reduce((count, keyword) => {
      return count + (content.includes(keyword) ? 1 : 0)
    }, 0)
    return Math.min(keywordCount, 3)
  }

  /**
   * プレビュー要約を生成
   */
  private static generatePreviewSummary(content: string, templateType: TemplateType): string {
    const contentSummary = content.substring(0, 100) + '...'
    
    const templateDescriptions: Record<TemplateType, string> = {
      index: 'INDEX目次形式',
      enumeration: '項目リスト + 説明文で構成',
      explanation2: '詳細な解説文中心',
      table: '比較表形式で整理',
      'section-items': '体験談・事例として表現',
      list: 'シンプルなリスト形式',
      simple3: '簡潔なポイント形式',
      simple5: '核心要素強調',
      simple6: 'メッセージ型表現',
      'two-column-section-items': '2カラムセクション形式',
      'title-description-only': 'タイトル+説明のシンプル構成',
      'checklist-enhanced': 'チェックリスト+詳細説明付き',
      'item-n-title-content': '独立ボックス形式で構成',
      'single-section-no-items': '単一セクション詳細解説形式',
      'ranking': 'ランキング形式で順位データを表示',
      'graph': 'グラフによるデータ可視化表示'
    }

    return `${templateDescriptions[templateType]}\n→ ${contentSummary}`
  }

  /**
   * 推奨理由の詳細を生成
   */
  static getDetailedRecommendationReason(
    content: string, 
    templateType: TemplateType
  ): string {
    const analysis = this.analyzeContent(content)
    const evaluation = this.evaluateTemplate(content, analysis, templateType)
    
    return `
【適合度: ${evaluation.fitScore}/100】
${evaluation.reason}

【コンテンツ分析】
・リスト要素: ${analysis.hasLists ? 'あり' : 'なし'}
・セクション構造: ${analysis.hasSections ? 'あり' : 'なし'}
・比較要素: ${analysis.hasComparisons ? 'あり' : 'なし'}
・ストーリー要素: ${analysis.hasStoryElements ? 'あり' : 'なし'}
・構造タイプ: ${analysis.structureType}
・文字数: ${analysis.contentLength}文字

【表現方法】
${evaluation.previewSummary}
`.trim()
  }
}