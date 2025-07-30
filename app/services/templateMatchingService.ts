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
      templateType: 'explanation2',
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
      templateType: 'simple3',
      expressionPattern: 'シンプル箇条書き',
      contentStructure: ['title', 'items'],
      bestFor: ['簡潔な要点', '箇条書きリスト', '要約'],
      matchingKeywords: ['要点', 'まとめ', '簡潔', '箇条書き'],
      priority: 5
    },
    {
      templateType: 'simple3',
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
      templateType: 'simple5',
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
      priority: 10
    },
    {
      templateType: 'simple5',
      expressionPattern: 'ステップ型コンテンツ',
      contentStructure: ['title', 'items'],
      bestFor: ['ステップ解説', '段階的手順', '実践的手順'],
      matchingKeywords: ['ステップ', '手順', '方法', '段階', '実践的'],
      priority: 11
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
      templateType: 'section-items',
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
    },
    {
      templateType: 'ranking',
      expressionPattern: 'ランキング・順位形式',
      contentStructure: ['title', 'rankingData'],
      bestFor: ['ランキング表示', '順位データ', 'ワースト・ベスト'],
      matchingKeywords: ['ランキング', '位', 'ワースト', 'ベスト', 'トップ', '順位'],
      priority: 8
    },
    {
      templateType: 'graph',
      expressionPattern: 'グラフ・データ可視化形式',
      contentStructure: ['title', 'graphData'],
      bestFor: ['データ可視化', '統計グラフ', '円グラフ・棒グラフ'],
      matchingKeywords: ['グラフ', '円グラフ', '棒グラフ', '統計', 'データ', '割合'],
      priority: 9
    },
    {
      templateType: 'checklist-enhanced',
      expressionPattern: '詳細チェックリスト形式',
      contentStructure: ['title', 'checklistItems', 'content'],
      bestFor: ['詳細チェックリスト', '準備項目', '確認リスト'],
      matchingKeywords: ['チェックリスト', 'チェック', '確認', '準備', 'TODO', '項目'],
      priority: 12
    },
    {
      templateType: 'index',
      expressionPattern: '目次・インデックス形式',
      contentStructure: ['title', 'items'],
      bestFor: ['目次ページ', '項目一覧', '構成紹介'],
      matchingKeywords: ['INDEX', '目次', 'インデックス', '項目', '構成', '一覧', 'ページ'],
      priority: 15
    },
    {
      templateType: 'single-section-no-items',
      expressionPattern: '単一セクション説明形式',
      contentStructure: ['title', 'sections', 'description'],
      bestFor: ['単一トピック', '概要説明', 'セクション詳細'],
      matchingKeywords: ['セクション', '説明', '概要', '詳細', '情報', '単一', 'について'],
      priority: 7
    },
    {
      templateType: 'two-column-section-items',
      expressionPattern: '2カラム比較形式',
      contentStructure: ['title', 'sections'],
      bestFor: ['2つのカテゴリー', '左右比較', '分類説明'],
      matchingKeywords: ['比較', '2つ', 'カテゴリー', '分類', '対比', '左右', 'バランス', '種類'],
      priority: 8
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
    console.log('='.repeat(80))
    console.log(`🎯 テンプレートマッチング開始 - ページ${page.pageNumber}`)
    console.log('='.repeat(80))
    console.log(`📄 ページ情報:`)
    console.log(`  - タイトル: "${page.content.title}"`)
    console.log(`  - 元のテンプレート: ${page.templateType}`)
    console.log(`  - アイテム数: ${page.content.items?.length || 0}`)
    console.log(`  - セクション数: ${page.content.sections?.length || 0}`)
    console.log(`  - チェックリスト数: ${page.content.checklistItems?.length || 0}`)
    console.log(`  - テーブルデータ: ${page.content.tableData ? 'あり' : 'なし'}`)
    console.log('')

    const scores = this.templateCharacteristics.map(template => {
      const scoreDetails = this.calculateTemplateScoreWithDetails(page, template)
      const finalScore = scoreDetails.totalScore * template.priority

      console.log(`📊 ${template.templateType} (優先度: ${template.priority}):`)
      console.log(`  ├─ 構造マッチ: ${scoreDetails.structureScore.toFixed(2)} × 3 = ${(scoreDetails.structureScore * 3).toFixed(2)}`)
      console.log(`  ├─ キーワード: ${scoreDetails.keywordScore.toFixed(2)} × 2 = ${(scoreDetails.keywordScore * 2).toFixed(2)}`)
      console.log(`  ├─ 表現パターン: ${scoreDetails.expressionScore.toFixed(2)} × 2 = ${(scoreDetails.expressionScore * 2).toFixed(2)}`)
      console.log(`  ├─ コンテンツ量: ${scoreDetails.volumeScore.toFixed(2)} × 1 = ${scoreDetails.volumeScore.toFixed(2)}`)
      console.log(`  ├─ 基本スコア: ${scoreDetails.totalScore.toFixed(2)}`)
      console.log(`  └─ 最終スコア: ${finalScore.toFixed(2)} (基本 × 優先度)`)
      if (scoreDetails.details.length > 0) {
        console.log(`     理由: ${scoreDetails.details.join(', ')}`)
      }
      console.log('')

      return {
        templateType: template.templateType,
        score: scoreDetails.totalScore,
        priority: template.priority,
        finalScore: finalScore,
        details: scoreDetails
      }
    })

    // スコアと優先度を組み合わせて最適なテンプレートを選択
    scores.sort((a, b) => b.finalScore - a.finalScore)

    const winner = scores[0]
    const runnerUp = scores[1]

    console.log('🏆 マッチング結果:')
    console.log(`  1位: ${winner.templateType} (スコア: ${winner.finalScore.toFixed(2)})`)
    console.log(`  2位: ${runnerUp.templateType} (スコア: ${runnerUp.finalScore.toFixed(2)})`)
    console.log(`  差分: ${(winner.finalScore - runnerUp.finalScore).toFixed(2)}`)
    
    if (page.templateType !== winner.templateType) {
      console.log(`🔄 テンプレート変更: ${page.templateType} → ${winner.templateType}`)
    } else {
      console.log(`✅ テンプレート維持: ${winner.templateType}`)
    }
    console.log('='.repeat(80))

    return winner.templateType
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

  /**
   * 詳細なスコア計算（ロギング用）
   */
  private calculateTemplateScoreWithDetails(page: GeneratedPage, template: TemplateCharacteristics) {
    const content = page.content
    const details: string[] = []

    // コンテンツ構造の一致度チェック
    const structureResult = this.checkStructureMatchWithDetails(content, template.contentStructure)
    const structureScore = structureResult.score
    details.push(...structureResult.reasons)

    // キーワードマッチング
    const keywordResult = this.checkKeywordMatchWithDetails(content, template.matchingKeywords)
    const keywordScore = keywordResult.score
    details.push(...keywordResult.reasons)

    // 表現パターンマッチング
    const expressionResult = this.checkExpressionMatchWithDetails(content, template.expressionPattern)
    const expressionScore = expressionResult.score
    details.push(...expressionResult.reasons)

    // コンテンツ量の適合性
    const volumeResult = this.checkContentVolumeWithDetails(content, template.templateType)
    const volumeScore = volumeResult.score
    details.push(...volumeResult.reasons)

    const totalScore = (structureScore * 3) + (keywordScore * 2) + (expressionScore * 2) + volumeScore

    return {
      structureScore,
      keywordScore,
      expressionScore,
      volumeScore,
      totalScore,
      details
    }
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

  /**
   * 詳細な構造マッチング（ロギング用）
   */
  private checkStructureMatchWithDetails(content: any, requiredStructure: string[]) {
    let matches = 0
    const reasons: string[] = []
    
    for (const structure of requiredStructure) {
      switch (structure) {
        case 'title':
          if (content.title) {
            matches++
            reasons.push(`タイトルあり`)
          } else {
            reasons.push(`タイトルなし`)
          }
          break
        case 'items':
          if (content.items?.length > 0) {
            matches++
            reasons.push(`アイテム${content.items.length}個`)
          } else {
            reasons.push(`アイテムなし`)
          }
          break
        case 'description':
          if (content.description) {
            matches++
            reasons.push(`説明文あり`)
          } else {
            reasons.push(`説明文なし`)
          }
          break
        case 'sections':
          if (content.sections?.length > 0) {
            matches++
            reasons.push(`セクション${content.sections.length}個`)
          } else {
            reasons.push(`セクションなし`)
          }
          break
        case 'tableData':
          if (content.tableData?.headers?.length > 0) {
            matches++
            reasons.push(`テーブルデータあり`)
          } else {
            reasons.push(`テーブルデータなし`)
          }
          break
        case 'checklistItems':
          if (content.checklistItems?.length > 0) {
            matches++
            reasons.push(`チェックリスト${content.checklistItems.length}個`)
          } else {
            reasons.push(`チェックリストなし`)
          }
          break
      }
    }

    return {
      score: matches / requiredStructure.length,
      reasons
    }
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

  /**
   * 詳細なキーワードマッチング（ロギング用）
   */
  private checkKeywordMatchWithDetails(content: any, keywords: string[]) {
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

    const reasons: string[] = []
    if (matchingKeywords.length > 0) {
      reasons.push(`マッチしたキーワード: ${matchingKeywords.join(', ')}`)
    } else {
      reasons.push(`キーワードマッチなし`)
    }

    return {
      score: matchingKeywords.length / keywords.length,
      reasons
    }
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
      'ステップ型コンテンツ': /[0-9]+ステップ|実践的.*ステップ|ステップ.*方法|ステップ.*手順/,
      '6つのポイント形式': /6つ|複数|多くの/,
      'ストーリー・体験談形式': /体験|ストーリー|事例|実際に/,
      'テーブル・表形式': /データ|表|比較|一覧/,
      '目次・インデックス形式': /INDEX|目次|インデックス|項目|構成|一覧|ページ/,
      '単一セクション説明形式': /セクション|説明|概要|詳細|について/,
      '2カラム比較形式': /比較|2つ|カテゴリー|分類|対比|左右|バランス|種類/
    }

    const pattern = patterns[expressionPattern as keyof typeof patterns]
    return pattern && pattern.test(allText) ? 1 : 0
  }

  /**
   * 詳細な表現パターンマッチング（ロギング用）
   */
  private checkExpressionMatchWithDetails(content: any, expressionPattern: string) {
    const allText = [
      content.title || '',
      content.subtitle || '',
      content.description || ''
    ].join(' ').toLowerCase()

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
      'ステップ型コンテンツ': /[0-9]+ステップ|実践的.*ステップ|ステップ.*方法|ステップ.*手順/,
      '6つのポイント形式': /6つ|複数|多くの/,
      'ストーリー・体験談形式': /体験|ストーリー|事例|実際に/,
      'テーブル・表形式': /データ|表|比較|一覧/,
      '目次・インデックス形式': /INDEX|目次|インデックス|項目|構成|一覧|ページ/,
      '単一セクション説明形式': /セクション|説明|概要|詳細|について/,
      '2カラム比較形式': /比較|2つ|カテゴリー|分類|対比|左右|バランス|種類/
    }

    const pattern = patterns[expressionPattern as keyof typeof patterns]
    const match = pattern && pattern.test(allText)
    
    const reasons: string[] = []
    if (match) {
      const matches = allText.match(pattern)
      reasons.push(`表現パターンマッチ: "${matches?.[0]}"`)
    } else {
      reasons.push(`表現パターンマッチなし`)
    }

    return {
      score: match ? 1 : 0,
      reasons
    }
  }

  private checkContentVolume(content: any, templateType: TemplateType): number {
    const itemCount = content.items?.length || 0
    const sectionCount = content.sections?.length || 0
    const checklistCount = content.checklistItems?.length || 0

    // テンプレートタイプに適したコンテンツ量かチェック
    const volumeRequirements: Record<TemplateType, { min: number; max: number }> = {
      'index': { min: 1, max: 1 },
      'enumeration': { min: 3, max: 7 },
      'explanation2': { min: 2, max: 5 },
      'list': { min: 3, max: 8 },
      'simple3': { min: 2, max: 6 },
      'simple5': { min: 3, max: 8 },
      'simple6': { min: 4, max: 8 },
      'section-items': { min: 1, max: 4 },
      'table': { min: 2, max: 10 },
      'two-column-section-items': { min: 2, max: 6 },
      'title-description-only': { min: 1, max: 2 },
      'checklist-enhanced': { min: 3, max: 6 },
      'item-n-title-content': { min: 2, max: 5 },
      'single-section-no-items': { min: 1, max: 1 },
      'ranking': { min: 3, max: 5 },
      'graph': { min: 3, max: 8 },
      // 新テンプレートタイプ
      feature_parallel_info: { min: 2, max: 6 },
      feature_detail_tips: { min: 2, max: 5 },
      sequential_dependency: { min: 3, max: 8 },
      step_guide_achievement: { min: 3, max: 6 },
      failure_episode: { min: 1, max: 3 },
      failure_story_intro: { min: 1, max: 2 },
      profile_offer: { min: 1, max: 2 },
      // K002用テンプレート
      basic_intro: { min: 1, max: 3 },
      achievement_summary: { min: 2, max: 5 },
      // K117用テンプレート
      ng_good_comparison: { min: 2, max: 6 },
      category_explanation: { min: 2, max: 4 },
      vision_strength_matrix: { min: 3, max: 6 },
      // 追加テンプレート
      dual_enumeration: { min: 2, max: 2 },
      category_summary: { min: 2, max: 5 },
      grid_summary: { min: 4, max: 12 },
      tool_feature: { min: 2, max: 6 },
      efficiency_tips: { min: 3, max: 8 },
      multiple_items_display: { min: 2, max: 5 },
      // Unified templates
      simple_intro: { min: 1, max: 3 },
      dual_section: { min: 2, max: 2 },
      ranking_display: { min: 3, max: 10 },
      item_grid: { min: 2, max: 12 },
      comparison: { min: 2, max: 6 },
      unified_company_detail: { min: 2, max: 8 },
      item_list: { min: 2, max: 10 },
      section_blocks: { min: 2, max: 8 },
      dynamic_boxes: { min: 2, max: 6 },
      image_point: { min: 2, max: 5 }
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

  /**
   * 詳細なコンテンツ量チェック（ロギング用）
   */
  private checkContentVolumeWithDetails(content: any, templateType: TemplateType) {
    const itemCount = content.items?.length || 0
    const sectionCount = content.sections?.length || 0
    const checklistCount = content.checklistItems?.length || 0

    const volumeRequirements: Record<TemplateType, { min: number; max: number }> = {
      'index': { min: 1, max: 1 },
      'enumeration': { min: 3, max: 7 },
      'explanation2': { min: 2, max: 5 },
      'list': { min: 3, max: 8 },
      'simple3': { min: 2, max: 6 },
      'simple5': { min: 3, max: 8 },
      'simple6': { min: 4, max: 8 },
      'section-items': { min: 1, max: 4 },
      'table': { min: 2, max: 10 },
      'two-column-section-items': { min: 2, max: 6 },
      'title-description-only': { min: 1, max: 2 },
      'checklist-enhanced': { min: 3, max: 6 },
      'item-n-title-content': { min: 2, max: 5 },
      'single-section-no-items': { min: 1, max: 1 },
      'ranking': { min: 3, max: 5 },
      'graph': { min: 3, max: 8 },
      // 新テンプレートタイプ
      feature_parallel_info: { min: 2, max: 6 },
      feature_detail_tips: { min: 2, max: 5 },
      sequential_dependency: { min: 3, max: 8 },
      step_guide_achievement: { min: 3, max: 6 },
      failure_episode: { min: 1, max: 3 },
      failure_story_intro: { min: 1, max: 2 },
      profile_offer: { min: 1, max: 2 },
      // K002用テンプレート
      basic_intro: { min: 1, max: 3 },
      achievement_summary: { min: 2, max: 5 },
      // K117用テンプレート
      ng_good_comparison: { min: 2, max: 6 },
      category_explanation: { min: 2, max: 4 },
      vision_strength_matrix: { min: 3, max: 6 },
      // 追加テンプレート
      dual_enumeration: { min: 2, max: 2 },
      category_summary: { min: 2, max: 5 },
      grid_summary: { min: 4, max: 12 },
      tool_feature: { min: 2, max: 6 },
      efficiency_tips: { min: 3, max: 8 },
      multiple_items_display: { min: 2, max: 5 },
      // Unified templates
      simple_intro: { min: 1, max: 3 },
      dual_section: { min: 2, max: 2 },
      ranking_display: { min: 3, max: 10 },
      item_grid: { min: 2, max: 12 },
      comparison: { min: 2, max: 6 },
      unified_company_detail: { min: 2, max: 8 },
      item_list: { min: 2, max: 10 },
      section_blocks: { min: 2, max: 8 },
      dynamic_boxes: { min: 2, max: 6 },
      image_point: { min: 2, max: 5 }
    }

    const requirement = volumeRequirements[templateType]
    const totalItems = itemCount + sectionCount + checklistCount

    const reasons: string[] = []
    reasons.push(`総アイテム数: ${totalItems} (適正範囲: ${requirement.min}-${requirement.max})`)

    let score = 0
    if (totalItems >= requirement.min && totalItems <= requirement.max) {
      score = 1
      reasons.push(`コンテンツ量: 適正`)
    } else if (totalItems < requirement.min) {
      score = 0.5
      reasons.push(`コンテンツ量: 不足`)
    } else {
      score = 0.3
      reasons.push(`コンテンツ量: 過多`)
    }

    return {
      score,
      reasons
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
      index: 'INDEX型',
      enumeration: '列挙型',
      list: 'リスト型',
      explanation2: '解説型2',
      simple3: 'シンプル型3',
      table: '表型',
      simple5: 'シンプル型5',
      simple6: 'シンプル型6',
      'section-items': 'セクション+アイテム型',
      'two-column-section-items': '2カラムセクション+アイテム型',
      'title-description-only': 'タイトル+説明型',
      'checklist-enhanced': 'チェックリスト詳細型',
      'item-n-title-content': '独立ボックス型',
      'single-section-no-items': '単一セクション・アイテム無し型',
      'ranking': 'ランキング型',
      'graph': 'グラフ型',
      feature_parallel_info: '機能紹介並列型',
      feature_detail_tips: '機能詳細Tips型',
      sequential_dependency: '順序依存ステップ型',
      step_guide_achievement: 'ステップガイド達成型',
      failure_episode: '失敗エピソード型',
      failure_story_intro: '失敗ストーリー導入型',
      profile_offer: 'プロフィール・オファー型',
      // K002用テンプレート
      basic_intro: '基本導入型',
      achievement_summary: '達成まとめ型',
      // K117用テンプレート
      ng_good_comparison: 'NG/GOOD比較型',
      category_explanation: 'カテゴリ説明型',
      vision_strength_matrix: 'ビジョン×強みマトリックス型',
      // 追加テンプレート
      dual_enumeration: '2アイテム上下配置型',
      category_summary: 'カテゴリサマリー型',
      grid_summary: 'グリッドサマリー型',
      tool_feature: 'ツール機能紹介型',
      efficiency_tips: '効率化ヒケツ型',
      multiple_items_display: '複数アイテム表示型',
      // Unified templates
      simple_intro: 'シンプル導入型（unified）',
      dual_section: 'デュアルセクション型（unified）',
      ranking_display: 'ランキング表示型（unified）',
      item_grid: 'アイテムグリッド型（unified）',
      comparison: '比較型（unified）',
      unified_company_detail: '企業詳細型（unified）',
      item_list: 'アイテムリスト型（unified）',
      section_blocks: 'セクションブロック型（unified）',
      dynamic_boxes: 'ダイナミックボックス型（unified）',
      image_point: '画像ポイント型（unified）'
    }
    return displayNames[templateType] || templateType
  }
}

export const templateMatchingService = new TemplateMatchingService()