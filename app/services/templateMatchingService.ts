import { TemplateType } from '../components/templates/TemplateTypes'
import { GeneratedPage } from './contentGeneratorService'

interface TemplateCharacteristics {
  templateType: TemplateType
  expressionPattern: string
  contentStructure: string[]
  bestFor: string[]
  matchingKeywords: string[]
  priority: number
}

export class TemplateMatchingService {
  private templateCharacteristics: TemplateCharacteristics[] = [
    {
      templateType: 'enumeration',
      expressionPattern: '列挙・リスト形式',
      contentStructure: ['title', 'items', 'description'],
      bestFor: ['ステップ別解説', '順序のある項目', '番号付きリスト'],
      matchingKeywords: ['①', '②', '③', 'ステップ', '手順', '方法', '段階'],
      priority: 8
    },
    {
      templateType: 'explanation',
      expressionPattern: '説明・解説形式',
      contentStructure: ['title', 'description', 'sections'],
      bestFor: ['概念説明', '詳細解説', '理論的内容'],
      matchingKeywords: ['とは', 'について', '解説', '説明', '理解'],
      priority: 7
    },
    {
      templateType: 'explanation2',
      expressionPattern: '複数トピック解説形式',
      contentStructure: ['title', 'sections'],
      bestFor: ['複数のポイント', '多面的な解説', '詳細なトピック'],
      matchingKeywords: ['ポイント', '要点', '重要な', '知っておくべき'],
      priority: 6
    },
    {
      templateType: 'list',
      expressionPattern: 'カード形式リスト',
      contentStructure: ['title', 'items'],
      bestFor: ['項目紹介', '選択肢提示', '比較項目'],
      matchingKeywords: ['一覧', 'リスト', '種類', '選択'],
      priority: 7
    },
    {
      templateType: 'simple',
      expressionPattern: 'シンプル箇条書き',
      contentStructure: ['title', 'items'],
      bestFor: ['簡潔な要点', '箇条書きリスト', '要約'],
      matchingKeywords: ['要点', 'まとめ', '簡潔', '箇条書き'],
      priority: 5
    },
    {
      templateType: 'simple2',
      expressionPattern: '2つのポイント形式',
      contentStructure: ['title', 'sections'],
      bestFor: ['対比説明', '2つの要素', 'Before/After'],
      matchingKeywords: ['2つ', '比較', '対比', 'VS', '違い'],
      priority: 8
    },
    {
      templateType: 'simple3',
      expressionPattern: '対比・比較形式',
      contentStructure: ['title', 'sections'],
      bestFor: ['対比説明', '比較項目', '良い例・悪い例'],
      matchingKeywords: ['対比', '比較', '良い', '悪い', 'OK', 'NG'],
      priority: 9
    },
    {
      templateType: 'simple4',
      expressionPattern: 'チェックリスト形式',
      contentStructure: ['title', 'checklistItems'],
      bestFor: ['チェックリスト', '確認項目', 'ToDoリスト'],
      matchingKeywords: ['チェック', '確認', '準備', 'やるべき', 'ToDo'],
      priority: 9
    },
    {
      templateType: 'simple5',
      expressionPattern: 'ステップ確認形式',
      contentStructure: ['title', 'checklistItems'],
      bestFor: ['ステップ確認', '段階的チェック', 'プロセス管理'],
      matchingKeywords: ['ステップ', '段階', 'プロセス', '進捗', '確認'],
      priority: 8
    },
    {
      templateType: 'simple6',
      expressionPattern: '6つのポイント形式',
      contentStructure: ['title', 'items'],
      bestFor: ['複数ポイント', '多項目リスト', '総合的な内容'],
      matchingKeywords: ['6つ', '複数', '多くの', '総合的', 'ポイント'],
      priority: 6
    },
    {
      templateType: 'story',
      expressionPattern: 'ストーリー・体験談形式',
      contentStructure: ['title', 'sections'],
      bestFor: ['体験談', 'ストーリー', '事例紹介'],
      matchingKeywords: ['体験', 'ストーリー', '事例', '実際に', '経験'],
      priority: 9
    },
    {
      templateType: 'table',
      expressionPattern: 'テーブル・表形式',
      contentStructure: ['title', 'tableData'],
      bestFor: ['データ比較', '表形式情報', '一覧データ'],
      matchingKeywords: ['データ', '表', '比較', '一覧', '情報'],
      priority: 7
    }
  ]

  /**
   * 生成されたコンテンツの各ページに最適なテンプレートを選択
   */
  matchTemplateToContent(pages: GeneratedPage[]): GeneratedPage[] {
    return pages.map(page => {
      const bestTemplate = this.findBestTemplate(page)
      return {
        ...page,
        templateType: bestTemplate
      }
    })
  }

  /**
   * 個別ページに最適なテンプレートを選択
   */
  findBestTemplate(page: GeneratedPage): TemplateType {
    const scores = this.templateCharacteristics.map(template => {
      const score = this.calculateTemplateScore(page, template)
      return {
        templateType: template.templateType,
        score: score,
        priority: template.priority
      }
    })

    // スコアと優先度を組み合わせて最適なテンプレートを選択
    scores.sort((a, b) => {
      const scoreA = a.score * a.priority
      const scoreB = b.score * b.priority
      return scoreB - scoreA
    })

    return scores[0].templateType
  }

  /**
   * 利用可能なテンプレートの推奨リストを取得
   */
  getRecommendedTemplates(page: GeneratedPage): Array<{
    templateType: TemplateType
    displayName: string
    score: number
    reason: string
  }> {
    const results = this.templateCharacteristics.map(template => {
      const score = this.calculateTemplateScore(page, template)
      return {
        templateType: template.templateType,
        displayName: this.getTemplateDisplayName(template.templateType),
        score: score,
        reason: this.generateMatchingReason(page, template)
      }
    })

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 5) // 上位5つを返す
  }

  /**
   * 全てのテンプレートをスコア順で取得（改善要件①対応）
   */
  getAllTemplatesWithScores(page: GeneratedPage): Array<{
    templateType: TemplateType
    displayName: string
    score: number
    reason: string
  }> {
    const results = this.templateCharacteristics.map(template => {
      const score = this.calculateTemplateScore(page, template)
      return {
        templateType: template.templateType,
        displayName: this.getTemplateDisplayName(template.templateType),
        score: score,
        reason: this.generateMatchingReason(page, template)
      }
    })

    return results
      .sort((a, b) => b.score - a.score) // スコア順でソート
  }

  private calculateTemplateScore(page: GeneratedPage, template: TemplateCharacteristics): number {
    let score = 0
    const content = page.content

    // コンテンツ構造の一致度チェック
    const structureScore = this.checkStructureMatch(content, template.contentStructure)
    score += structureScore * 3

    // キーワードマッチング
    const keywordScore = this.checkKeywordMatch(content, template.matchingKeywords)
    score += keywordScore * 2

    // 表現パターンマッチング
    const expressionScore = this.checkExpressionMatch(content, template.expressionPattern)
    score += expressionScore * 2

    // コンテンツ量の適合性
    const contentVolumeScore = this.checkContentVolume(content, template.templateType)
    score += contentVolumeScore

    return score
  }

  private checkStructureMatch(content: any, requiredStructure: string[]): number {
    let matches = 0
    
    if (requiredStructure.includes('title') && content.title) matches++
    if (requiredStructure.includes('items') && content.items?.length > 0) matches++
    if (requiredStructure.includes('description') && content.description) matches++
    if (requiredStructure.includes('sections') && content.sections?.length > 0) matches++
    if (requiredStructure.includes('tableData') && content.tableData?.headers?.length > 0) matches++
    if (requiredStructure.includes('checklistItems') && content.checklistItems?.length > 0) matches++

    return matches / requiredStructure.length
  }

  private checkKeywordMatch(content: any, keywords: string[]): number {
    const allText = [
      content.title || '',
      content.subtitle || '',
      content.description || '',
      ...(content.items || []),
      ...(content.sections?.map((s: any) => s.title + ' ' + s.content) || [])
    ].join(' ').toLowerCase()

    const matchingKeywords = keywords.filter(keyword => 
      allText.includes(keyword.toLowerCase())
    )

    return matchingKeywords.length / keywords.length
  }

  private checkExpressionMatch(content: any, expressionPattern: string): number {
    const allText = [
      content.title || '',
      content.subtitle || '',
      content.description || ''
    ].join(' ').toLowerCase()

    // 表現パターンに基づく簡単なマッチング
    const patterns = {
      '列挙・リスト形式': /[①②③④⑤⑥⑦⑧⑨]|[1-9]\.|ステップ|手順/,
      '説明・解説形式': /とは|について|解説|説明/,
      '複数トピック解説形式': /ポイント|要点|重要/,
      'カード形式リスト': /一覧|リスト|種類/,
      'シンプル箇条書き': /要点|まとめ|簡潔/,
      '2つのポイント形式': /2つ|比較|対比|VS/,
      '対比・比較形式': /対比|比較|良い|悪い|OK|NG/,
      'チェックリスト形式': /チェック|確認|準備|やるべき/,
      'ステップ確認形式': /ステップ|段階|プロセス/,
      '6つのポイント形式': /6つ|複数|多くの/,
      'ストーリー・体験談形式': /体験|ストーリー|事例|実際に/,
      'テーブル・表形式': /データ|表|比較|一覧/
    }

    const pattern = patterns[expressionPattern as keyof typeof patterns]
    return pattern && pattern.test(allText) ? 1 : 0
  }

  private checkContentVolume(content: any, templateType: TemplateType): number {
    const itemCount = content.items?.length || 0
    const sectionCount = content.sections?.length || 0
    const checklistCount = content.checklistItems?.length || 0

    // テンプレートタイプに適したコンテンツ量かチェック
    const volumeRequirements = {
      'enumeration': { min: 3, max: 7 },
      'explanation': { min: 1, max: 3 },
      'explanation2': { min: 2, max: 5 },
      'list': { min: 3, max: 8 },
      'simple': { min: 2, max: 6 },
      'simple2': { min: 2, max: 2 },
      'simple3': { min: 2, max: 4 },
      'simple4': { min: 3, max: 8 },
      'simple5': { min: 3, max: 6 },
      'simple6': { min: 4, max: 8 },
      'story': { min: 1, max: 4 },
      'table': { min: 2, max: 10 }
    }

    const requirement = volumeRequirements[templateType]
    const totalItems = itemCount + sectionCount + checklistCount

    if (totalItems >= requirement.min && totalItems <= requirement.max) {
      return 1
    } else if (totalItems < requirement.min) {
      return 0.5
    } else {
      return 0.3
    }
  }

  private generateMatchingReason(page: GeneratedPage, template: TemplateCharacteristics): string {
    const reasons: string[] = []

    // 構造的適合性
    if (template.contentStructure.includes('items') && page.content.items && page.content.items.length > 0) {
      reasons.push(`${page.content.items.length}個の項目リスト`)
    }
    if (template.contentStructure.includes('sections') && page.content.sections && page.content.sections.length > 0) {
      reasons.push(`${page.content.sections.length}個のセクション`)
    }
    if (template.contentStructure.includes('checklistItems') && page.content.checklistItems && page.content.checklistItems.length > 0) {
      reasons.push(`${page.content.checklistItems.length}個のチェック項目`)
    }

    // キーワードマッチング
    const matchingKeywords = template.matchingKeywords.filter(keyword => {
      const allText = [page.content.title || '', page.content.description || ''].join(' ').toLowerCase()
      return allText.includes(keyword.toLowerCase())
    })

    if (matchingKeywords.length > 0) {
      reasons.push(`キーワード適合: ${matchingKeywords.join(', ')}`)
    }

    return reasons.length > 0 ? reasons.join('、') : template.expressionPattern
  }

  private getTemplateDisplayName(templateType: TemplateType): string {
    const displayNames: Record<TemplateType, string> = {
      enumeration: '列挙型',
      explanation: '説明型',
      explanation2: '解説型2',
      list: 'リスト型',
      simple: 'シンプル型',
      simple2: 'シンプル型2',
      simple3: 'シンプル型3',
      simple4: 'シンプル型4',
      simple5: 'シンプル型5',
      simple6: 'シンプル型6',
      story: 'ストーリー型',
      table: '表型'
    }
    return displayNames[templateType] || templateType
  }
}

export const templateMatchingService = new TemplateMatchingService()