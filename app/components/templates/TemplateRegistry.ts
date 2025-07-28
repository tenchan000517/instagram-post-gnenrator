// テンプレート登録・選択システム
import { TemplateMetadata, TemplateType } from './TemplateTypes'

// アクティブテンプレートのメタデータをインポート（Critical Priority + INDEX + データ可視化追加）
import { indexMetadata } from './IndexTemplate'
import { enumerationMetadata } from './EnumerationTemplate'
import { listMetadata } from './ListTemplate'
import { explanationTwoMetadata } from './ExplanationTwoTemplate'
import { simpleThreeMetadata } from './SimpleThreeTemplate'
import { tableMetadata } from './TableTemplate'
import { simpleFiveMetadata } from './SimpleFiveTemplate'
import { simpleSixMetadata } from './SimpleSixTemplate'
import { sectionItemsMetadata } from './SectionItemsTemplate'
import { twoColumnSectionItemsMetadata } from './TwoColumnSectionItemsTemplate'
import { titleDescriptionOnlyMetadata } from './TitleDescriptionOnlyTemplate'
import { checklistEnhancedMetadata } from './ChecklistEnhancedTemplate'
import { itemNTitleContentMetadata } from './ItemNTitleContentTemplate'
import { singleSectionNoItemsMetadata } from './SingleSectionNoItemsTemplate'
import { rankingMetadata } from './RankingTemplate'
import { graphMetadata } from './GraphTemplate'
import { featureParallelInfoMetadata } from './FeatureParallelInfoTemplate'
import { featureDetailTipsMetadata } from './FeatureDetailTipsTemplate'
import { sequentialDependencyMetadata } from './SequentialDependencyTemplate'
import { dualEnumerationMetadata } from './DualEnumerationTemplate'

// K002用テンプレートのメタデータインポート
import { basicIntroMetadata } from './BasicIntroTemplate'
import { stepGuideAchievementMetadata } from './StepGuideAchievementTemplate'
import { achievementSummaryMetadata } from './AchievementSummaryTemplate'

// K117用テンプレートのメタデータインポート
import { ngGoodComparisonMetadata } from './NgGoodComparisonTemplate'
import { categoryExplanationMetadata } from './CategoryExplanationTemplate'
import { visionStrengthMatrixMetadata } from './VisionStrengthMatrixTemplate'

// 新しいサマリー系テンプレートのメタデータインポート
import { categorySummaryMetadata } from './CategorySummaryTemplate'
import { gridSummaryMetadata } from './GridSummaryTemplate'
import { toolFeatureMetadata } from './ToolFeatureTemplate'
import { efficiencyTipsMetadata } from './EfficiencyTipsTemplate'

// 複数アイテム表示テンプレートのメタデータインポート
import { multipleItemsDisplayMetadata } from './MultipleItemsDisplayTemplate'

// アクティブテンプレートレジストリ（Critical Priority + INDEX + データ可視化追加）
export const templateRegistry: Record<TemplateType, TemplateMetadata> = {
  index: indexMetadata,
  enumeration: enumerationMetadata,
  list: listMetadata,
  explanation2: explanationTwoMetadata,
  simple3: simpleThreeMetadata,
  table: tableMetadata,
  simple5: simpleFiveMetadata,
  simple6: simpleSixMetadata,
  'section-items': sectionItemsMetadata,
  'two-column-section-items': twoColumnSectionItemsMetadata,
  'title-description-only': titleDescriptionOnlyMetadata,
  'checklist-enhanced': checklistEnhancedMetadata,
  'item-n-title-content': itemNTitleContentMetadata,
  'single-section-no-items': singleSectionNoItemsMetadata,
  ranking: rankingMetadata,
  graph: graphMetadata,
  feature_parallel_info: featureParallelInfoMetadata,
  feature_detail_tips: featureDetailTipsMetadata,
  sequential_dependency: sequentialDependencyMetadata,
  dual_enumeration: dualEnumerationMetadata,
  // K002用テンプレート
  basic_intro: basicIntroMetadata,
  step_guide_achievement: stepGuideAchievementMetadata,
  achievement_summary: achievementSummaryMetadata,
  // K117用テンプレート
  ng_good_comparison: ngGoodComparisonMetadata,
  category_explanation: categoryExplanationMetadata,
  vision_strength_matrix: visionStrengthMatrixMetadata,
  // 新しいサマリー系テンプレート
  category_summary: categorySummaryMetadata,
  grid_summary: gridSummaryMetadata,
  tool_feature: toolFeatureMetadata,
  efficiency_tips: efficiencyTipsMetadata,
  // 複数アイテム表示テンプレート
  multiple_items_display: multipleItemsDisplayMetadata
}

// アクティブテンプレートのジャンル対応（Critical Priority追加）
export const genreTemplateMapping = {
  'インターン・エントリー〆切系': ['table', 'list', 'simple5', 'checklist-enhanced'] as TemplateType[],
  'ナレッジ系': ['explanation2', 'enumeration', 'section-items', 'title-description-only', 'single-section-no-items'] as TemplateType[],
  '〇〇選みたいな感じでの紹介系': ['list', 'enumeration', 'simple3', 'item-n-title-content'] as TemplateType[],
  'ノウハウ系': ['explanation2', 'simple5', 'simple6', 'two-column-section-items', 'checklist-enhanced', 'item-n-title-content'] as TemplateType[]
}

// テンプレート選択ロジック
export class TemplateSelector {
  /**
   * コンテンツを分析して最適なテンプレートを選択
   */
  static selectOptimalTemplate(content: string, genre?: string, originalContent?: string): TemplateType {
    const contentLower = content.toLowerCase()
    
    // 全体コンテンツを考慮した一貫性のあるテンプレート選択
    const fullContentLower = originalContent?.toLowerCase() || contentLower
    
    // 高優先度パターンマッチング（元のコンテンツ全体から判断）
    const highPriorityMatch = this.detectHighPriorityPatterns(originalContent || content)
    if (highPriorityMatch) {
      console.log(`🎯 高優先度パターン検出: ${highPriorityMatch}`)
      return highPriorityMatch
    }
    
    // ジャンルベースの選択
    if (genre && genreTemplateMapping[genre as keyof typeof genreTemplateMapping]) {
      const candidates = genreTemplateMapping[genre as keyof typeof genreTemplateMapping]
      return this.selectFromCandidates(content, candidates)
    }
    
    // コンテンツ分析による選択（元のコンテンツの特徴を保持）
    const analysisResult = this.analyzeContent(originalContent || content)
    const selectedTemplate = this.selectByAnalysis(analysisResult)
    
    // 後半ページでsimple5/6が選択されるのを防ぐ
    if ((selectedTemplate === 'simple5' || selectedTemplate === 'simple6') && originalContent) {
      // 元のコンテンツの特徴に基づいて適切なテンプレートを選択
      if (analysisResult.hasTableData) return 'table'
      if (analysisResult.hasEnumerationStructure) return 'enumeration'
      if (analysisResult.hasChecklistStructure) return 'list'
      return 'simple3' // デフォルトをより適切なテンプレートに
    }
    
    return selectedTemplate
  }

  /**
   * 高優先度パターンを検出（特定のコンテンツ形式）
   */
  private static detectHighPriorityPatterns(content: string): TemplateType | null {
    const contentLower = content.toLowerCase()
    
    // 「○○選」系コンテンツ（リスト・ランキング形式）
    if (/\d+選|選び|オススメ|おすすめ|ランキング|best|top\d+/.test(contentLower)) {
      // 表形式データが含まれる場合はtableテンプレート
      if (/日程|スケジュール|締切|企業|料金|価格/.test(contentLower)) {
        return 'table'
      }
      // そうでなければ列挙型
      return 'enumeration'
    }
    
    // インターン・エントリー〆切系（明確に表形式データ）
    if (/インターン.*締切|エントリー.*締切|〆切|応募期限|申込期限/.test(contentLower)) {
      return 'table'
    }
    
    // 体験談・事例系（セクション+アイテム形式）
    if (/体験談|事例|実体験|実際に|やってみた|レビュー/.test(contentLower)) {
      return 'section-items'
    }
    
    // 比較系（表形式）
    if (/比較|違い|対比|vs|メリット.*デメリット/.test(contentLower)) {
      return 'table'
    }
    
    // ポイント・コツ系（列挙型）
    if (/ポイント|コツ|秘訣|要点|重要|注意/.test(contentLower) && /[1-9]|①|②|③/.test(content)) {
      return 'enumeration'
    }
    
    // 順序依存ステップ系（typeID002パターン）
    if (/Point\s*[1-9]|ポイント\s*[1-9]|困らない|働き方|キャリア|備える|身に着ける/.test(contentLower)) {
      return 'sequential_dependency'
    }
    
    return null
  }

  /**
   * 候補テンプレートから最適なものを選択
   */
  private static selectFromCandidates(content: string, candidates: TemplateType[]): TemplateType {
    const scores: Record<TemplateType, number> = {} as any
    
    candidates.forEach(templateType => {
      const metadata = templateRegistry[templateType]
      let score = 0
      
      // キーワードマッチング
      metadata.keywords.forEach(keyword => {
        if (content.includes(keyword)) {
          score += 2
        }
      })
      
      // コンテンツタイプマッチング
      metadata.suitableFor.contentTypes.forEach(type => {
        if (content.includes(type)) {
          score += 3
        }
      })
      
      scores[templateType] = score
    })
    
    // 最高スコアのテンプレートを選択
    const bestTemplate = Object.entries(scores).reduce((best, [template, score]) => 
      score > best.score ? { template: template as TemplateType, score } : best,
      { template: candidates[0], score: 0 }
    )
    
    return bestTemplate.template
  }

  /**
   * コンテンツ分析による選択
   */
  private static selectByAnalysis(analysis: ContentAnalysis): TemplateType {
    // 表形式データの検出
    if (analysis.hasTableData) return 'table'
    
    // ストーリー性の検出
    if (analysis.hasStoryStructure) return 'section-items'
    
    // チェックリストの検出
    if (analysis.hasChecklistStructure) return 'list'
    
    // 列挙型の検出
    if (analysis.hasEnumerationStructure) return 'enumeration'
    
    // 比較構造の検出
    if (analysis.hasComparisonStructure) return 'simple3'
    
    // 複数セクションの検出
    if (analysis.hasMultipleExplanations) return 'explanation2'
    
    // デフォルト
    return 'simple6'
  }

  /**
   * コンテンツの構造分析
   */
  private static analyzeContent(content: string): ContentAnalysis {
    const contentLower = content.toLowerCase()
    
    return {
      hasTableData: /日程|スケジュール|締切|企業|比較|一覧|ランキング|選|インターン|エントリー/.test(contentLower),
      hasStoryStructure: /問題|悩み|結果|変化|体験|実際|例えば|失敗|成功|きっかけ/.test(contentLower),
      hasChecklistStructure: /チェック|確認|必要|条件|準備|・|•|-\s/.test(contentLower),
      hasEnumerationStructure: /①|②|③|１|２|３|ポイント|方法|[1-9]\.|\d+\)|第\d+/.test(contentLower),
      hasComparisonStructure: /比較|違い|対比|vs|選択|料金|価格/.test(contentLower),
      hasMultipleExplanations: /手順|ステップ|段階|方法|やり方|フロー|プロセス/.test(contentLower) && content.split('。').length > 3
    }
  }

  /**
   * Gemini用のテンプレート選択プロンプトを生成
   */
  static generateSelectionPrompt(): string {
    const templateDescriptions = Object.entries(templateRegistry)
      .map(([type, metadata]) => 
        `${type}: ${metadata.name} - ${metadata.description} (適用: ${metadata.suitableFor.contentTypes.join(', ')})`
      )
      .join('\n')
    
    return `
利用可能なテンプレート:
${templateDescriptions}

各テンプレートの文字数制限:
${Object.entries(templateRegistry)
  .map(([type, metadata]) => 
    `${type}: タイトル${metadata.characterLimits.title}文字, 内容${metadata.characterLimits.content}文字, 項目${metadata.characterLimits.items}文字`
  )
  .join('\n')
}

コンテンツの構造と内容を分析し、最適なテンプレートを選択してください。
選択理由と共に、文字数制限に収まるよう内容を調整してください。
`
  }
}

interface ContentAnalysis {
  hasTableData: boolean
  hasStoryStructure: boolean
  hasChecklistStructure: boolean
  hasEnumerationStructure: boolean
  hasComparisonStructure: boolean
  hasMultipleExplanations: boolean
}

// 全テンプレートの文字数制限一覧
export const allCharacterLimits = Object.entries(templateRegistry).reduce((acc, [type, metadata]) => {
  acc[type as TemplateType] = metadata.characterLimits
  return acc
}, {} as Record<TemplateType, TemplateMetadata['characterLimits']>)