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
  graph: GraphTemplate
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