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

// K115用テンプレート
export { FailureEpisodeTemplate } from './FailureEpisodeTemplate'
export { FailureStoryIntroTemplate } from './FailureStoryIntroTemplate'
export { ProfileOfferTemplate } from './ProfileOfferTemplate'

// 新しいK004テスト用テンプレート
export { ProblemIntroductionTemplate } from './ProblemIntroductionTemplate'
export { MethodDetailCardTemplate } from './MethodDetailCardTemplate'
export { MethodVisualGuideTemplate } from './MethodVisualGuideTemplate'
export { MethodSummaryKeywordsTemplate } from './MethodSummaryKeywordsTemplate'
export { ActionCallChecklistTemplate } from './ActionCallChecklistTemplate'

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
  // K115用テンプレート
  failure_episode: FailureEpisodeTemplate,
  failure_story_intro: FailureStoryIntroTemplate,
  profile_offer: ProfileOfferTemplate,
  // 新しいK004テスト用テンプレート
  'problem-introduction': ProblemIntroductionTemplate,
  'method-detail-card': MethodDetailCardTemplate,
  'method-visual-guide': MethodVisualGuideTemplate,
  'method-summary-keywords': MethodSummaryKeywordsTemplate,
  'action-call-checklist': ActionCallChecklistTemplate
} as const

// テンプレートレンダラー
export function renderTemplate(templateType: TemplateType, data: any) {
  const TemplateComponent = templateComponents[templateType]
  if (!TemplateComponent) {
    console.warn(`Unknown template type: ${templateType}`)
    return null
  }
  return TemplateComponent({ data })
}