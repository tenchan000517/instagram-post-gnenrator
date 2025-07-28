// アクティブテンプレートコンポーネントのエクスポート（Critical Priority + INDEX + データ可視化追加）
export { IndexTemplate } from './IndexTemplate'
export { EnumerationTemplate } from './EnumerationTemplate'
export { ListTemplate } from './ListTemplate'
export { ExplanationTwoTemplate } from './ExplanationTwoTemplate'
export { SimpleThreeTemplate } from './SimpleThreeTemplate'
export { TableTemplate } from './TableTemplate'
export { SimpleFiveTemplate } from './SimpleFiveTemplate'
export { SimpleSixTemplate } from './SimpleSixTemplate'
export { SectionItemsTemplate } from './SectionItemsTemplate'
export { TwoColumnSectionItemsTemplate } from './TwoColumnSectionItemsTemplate'
export { TitleDescriptionOnlyTemplate } from './TitleDescriptionOnlyTemplate'
export { ChecklistEnhancedTemplate } from './ChecklistEnhancedTemplate'
export { ItemNTitleContentTemplate } from './ItemNTitleContentTemplate'
export { SingleSectionNoItemsTemplate } from './SingleSectionNoItemsTemplate'
export { default as RankingTemplate } from './RankingTemplate'
export { default as GraphTemplate } from './GraphTemplate'
export { FeatureParallelInfoTemplate } from './FeatureParallelInfoTemplate'
export { FeatureDetailTipsTemplate } from './FeatureDetailTipsTemplate'
export { SequentialDependencyTemplate } from './SequentialDependencyTemplate'
export { DualEnumerationTemplate } from './DualEnumerationTemplate'

// K115用テンプレート
export { FailureEpisodeTemplate } from './FailureEpisodeTemplate'
export { FailureStoryIntroTemplate } from './FailureStoryIntroTemplate'
export { ProfileOfferTemplate } from './ProfileOfferTemplate'

// K117用テンプレート
export { NgGoodComparisonTemplate } from './NgGoodComparisonTemplate'
export { CategoryExplanationTemplate } from './CategoryExplanationTemplate'
export { VisionStrengthMatrixTemplate } from './VisionStrengthMatrixTemplate'

// 新しいサマリー系テンプレート
export { CategorySummaryTemplate } from './CategorySummaryTemplate'
export { GridSummaryTemplate } from './GridSummaryTemplate'
export { ToolFeatureTemplate } from './ToolFeatureTemplate'
export { EfficiencyTipsTemplate } from './EfficiencyTipsTemplate'

// 複数アイテム表示テンプレート
export { MultipleItemsDisplayTemplate } from './MultipleItemsDisplayTemplate'

// 新しいK004テスト用テンプレート
export { ProblemIntroductionTemplate } from './ProblemIntroductionTemplate'
export { MethodDetailCardTemplate } from './MethodDetailCardTemplate'
export { MethodVisualGuideTemplate } from './MethodVisualGuideTemplate'
export { MethodSummaryKeywordsTemplate } from './MethodSummaryKeywordsTemplate'
export { ActionCallChecklistTemplate } from './ActionCallChecklistTemplate'

// K002用テンプレート
export { default as BasicIntroTemplate } from './BasicIntroTemplate'
export { default as StepGuideAchievementTemplate } from './StepGuideAchievementTemplate'
export { default as AchievementSummaryTemplate } from './AchievementSummaryTemplate'

// TypeID004用テンプレート
export { default as ToolsIntroTemplate } from './ToolsIntroTemplate'

// K001用テンプレート
export { default as EmotionEmpathyListTemplate } from './EmotionEmpathyListTemplate'

// Type003用業界情報テンプレート
export { default as IndustryRankingTemplate } from './IndustryRankingTemplate'
export { default as CompanyDetailTemplate } from './CompanyDetailTemplate'
export { default as IndustryInfographicTemplate } from './IndustryInfographicTemplate'

// 型定義とユーティリティ
export * from './TemplateTypes'
export * from './TemplateRegistry'

// アクティブテンプレートコンポーネントマップ（Critical Priority + INDEX + データ可視化追加）
import { IndexTemplate } from './IndexTemplate'
import { EnumerationTemplate } from './EnumerationTemplate'
import { ListTemplate } from './ListTemplate'
import { ExplanationTwoTemplate } from './ExplanationTwoTemplate'
import { SimpleThreeTemplate } from './SimpleThreeTemplate'
import { TableTemplate } from './TableTemplate'
import { SimpleFiveTemplate } from './SimpleFiveTemplate'
import { SimpleSixTemplate } from './SimpleSixTemplate'
import { SectionItemsTemplate } from './SectionItemsTemplate'
import { TwoColumnSectionItemsTemplate } from './TwoColumnSectionItemsTemplate'
import { TitleDescriptionOnlyTemplate } from './TitleDescriptionOnlyTemplate'
import { ChecklistEnhancedTemplate } from './ChecklistEnhancedTemplate'
import { ItemNTitleContentTemplate } from './ItemNTitleContentTemplate'
import { SingleSectionNoItemsTemplate } from './SingleSectionNoItemsTemplate'
import RankingTemplate from './RankingTemplate'
import GraphTemplate from './GraphTemplate'
import { FeatureParallelInfoTemplate } from './FeatureParallelInfoTemplate'
import { FeatureDetailTipsTemplate } from './FeatureDetailTipsTemplate'
import { SequentialDependencyTemplate } from './SequentialDependencyTemplate'
import { DualEnumerationTemplate } from './DualEnumerationTemplate'

// K115用テンプレートのインポート
import { FailureEpisodeTemplate } from './FailureEpisodeTemplate'
import { FailureStoryIntroTemplate } from './FailureStoryIntroTemplate'
import { ProfileOfferTemplate } from './ProfileOfferTemplate'

// 新しいK004テスト用テンプレートのインポート
import { ProblemIntroductionTemplate } from './ProblemIntroductionTemplate'
import { MethodDetailCardTemplate } from './MethodDetailCardTemplate'
import { MethodVisualGuideTemplate } from './MethodVisualGuideTemplate'
import { MethodSummaryKeywordsTemplate } from './MethodSummaryKeywordsTemplate'
import { ActionCallChecklistTemplate } from './ActionCallChecklistTemplate'

// K002用テンプレートのインポート
import BasicIntroTemplate from './BasicIntroTemplate'
import StepGuideAchievementTemplate from './StepGuideAchievementTemplate'
import AchievementSummaryTemplate from './AchievementSummaryTemplate'

// TypeID004用テンプレートのインポート
import ToolsIntroTemplate from './ToolsIntroTemplate'

// K001用テンプレートのインポート
import EmotionEmpathyListTemplate from './EmotionEmpathyListTemplate'

// Type003用業界情報テンプレートのインポート
import IndustryRankingTemplate from './IndustryRankingTemplate'
import CompanyDetailTemplate from './CompanyDetailTemplate'
import IndustryInfographicTemplate from './IndustryInfographicTemplate'

// K117用テンプレートのインポート
import { NgGoodComparisonTemplate } from './NgGoodComparisonTemplate'
import { CategoryExplanationTemplate } from './CategoryExplanationTemplate'
import { VisionStrengthMatrixTemplate } from './VisionStrengthMatrixTemplate'

// 新しいサマリー系テンプレートのインポート
import { CategorySummaryTemplate } from './CategorySummaryTemplate'
import { GridSummaryTemplate } from './GridSummaryTemplate'
import { ToolFeatureTemplate } from './ToolFeatureTemplate'
import { EfficiencyTipsTemplate } from './EfficiencyTipsTemplate'

// 複数アイテム表示テンプレートのインポート
import { MultipleItemsDisplayTemplate } from './MultipleItemsDisplayTemplate'

import { TemplateType } from './TemplateTypes'

export const templateComponents = {
  index: IndexTemplate,
  enumeration: EnumerationTemplate,
  list: ListTemplate,
  explanation2: ExplanationTwoTemplate,
  simple3: SimpleThreeTemplate,
  table: TableTemplate,
  simple5: SimpleFiveTemplate,
  simple6: SimpleSixTemplate,
  'section-items': SectionItemsTemplate,
  'two-column-section-items': TwoColumnSectionItemsTemplate,
  'title-description-only': TitleDescriptionOnlyTemplate,
  'checklist-enhanced': ChecklistEnhancedTemplate,
  'item-n-title-content': ItemNTitleContentTemplate,
  'single-section-no-items': SingleSectionNoItemsTemplate,
  ranking: RankingTemplate,
  graph: GraphTemplate,
  feature_parallel_info: FeatureParallelInfoTemplate,
  feature_detail_tips: FeatureDetailTipsTemplate,
  sequential_dependency: SequentialDependencyTemplate,
  dual_enumeration: DualEnumerationTemplate,
  // K115用テンプレート
  failure_episode: FailureEpisodeTemplate,
  failure_story_intro: FailureStoryIntroTemplate,
  profile_offer: ProfileOfferTemplate,
  // 新しいK004テスト用テンプレート
  'problem-introduction': ProblemIntroductionTemplate,
  'method-detail-card': MethodDetailCardTemplate,
  'method-visual-guide': MethodVisualGuideTemplate,
  'method-summary-keywords': MethodSummaryKeywordsTemplate,
  'action-call-checklist': ActionCallChecklistTemplate,
  // K002用テンプレート
  'basic_intro': BasicIntroTemplate,
  'step_guide_achievement': StepGuideAchievementTemplate,
  'achievement_summary': AchievementSummaryTemplate,
  // TypeID004用テンプレート
  'tools_intro': ToolsIntroTemplate,
  // K001用テンプレート
  'emotion_empathy_intro': EmotionEmpathyListTemplate,
  'emotion_empathy_list': EmotionEmpathyListTemplate,
  'emotion_empathy_summary': EmotionEmpathyListTemplate,
  // K117用テンプレート
  'ng_good_comparison': NgGoodComparisonTemplate,
  'category_explanation': CategoryExplanationTemplate,
  'vision_strength_matrix': VisionStrengthMatrixTemplate,
  // 新しいサマリー系テンプレート
  'category_summary': CategorySummaryTemplate,
  'grid_summary': GridSummaryTemplate,
  'tool_feature': ToolFeatureTemplate,
  'efficiency_tips': EfficiencyTipsTemplate,
  // 複数アイテム表示テンプレート
  'multiple_items_display': MultipleItemsDisplayTemplate,
  // Type003用業界情報テンプレート
  'industry_ranking': IndustryRankingTemplate,
  'company_detail': CompanyDetailTemplate,
  'industry_infographic': IndustryInfographicTemplate
} as const

// テンプレートレンダラー
export function renderTemplate(
  templateType: TemplateType, 
  data: any, 
  additionalProps?: { postType?: string, targetId?: string }
) {
  const TemplateComponent = templateComponents[templateType]
  if (!TemplateComponent) {
    console.warn(`Unknown template type: ${templateType}`)
    return null
  }
  
  // BasicIntroTemplateの場合のみ追加propsを渡す
  if (templateType === 'basic_intro') {
    return TemplateComponent({ 
      data, 
      postType: additionalProps?.postType as '001' | '002' | '003' | '004', 
      targetId: additionalProps?.targetId 
    })
  }
  
  return TemplateComponent({ data })
}