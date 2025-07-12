// テンプレートコンポーネントのエクスポート
export { EnumerationTemplate } from './EnumerationTemplate'
export { ExplanationTemplate } from './ExplanationTemplate'
export { StoryTemplate } from './StoryTemplate'
export { ListTemplate } from './ListTemplate'
export { ExplanationTwoTemplate } from './ExplanationTwoTemplate'
export { SimpleTemplate } from './SimpleTemplate'
export { SimpleTwoTemplate } from './SimpleTwoTemplate'
export { SimpleThreeTemplate } from './SimpleThreeTemplate'
export { TableTemplate } from './TableTemplate'
export { SimpleFourTemplate } from './SimpleFourTemplate'
export { SimpleFiveTemplate } from './SimpleFiveTemplate'
export { SimpleSixTemplate } from './SimpleSixTemplate'
export { SectionItemsTemplate } from './SectionItemsTemplate'
export { TwoColumnSectionItemsTemplate } from './TwoColumnSectionItemsTemplate'

// 型定義とユーティリティ
export * from './TemplateTypes'
export * from './TemplateRegistry'

// テンプレートコンポーネントマップ
import { EnumerationTemplate } from './EnumerationTemplate'
import { ExplanationTemplate } from './ExplanationTemplate'
import { StoryTemplate } from './StoryTemplate'
import { ListTemplate } from './ListTemplate'
import { ExplanationTwoTemplate } from './ExplanationTwoTemplate'
import { SimpleTemplate } from './SimpleTemplate'
import { SimpleTwoTemplate } from './SimpleTwoTemplate'
import { SimpleThreeTemplate } from './SimpleThreeTemplate'
import { TableTemplate } from './TableTemplate'
import { SimpleFourTemplate } from './SimpleFourTemplate'
import { SimpleFiveTemplate } from './SimpleFiveTemplate'
import { SimpleSixTemplate } from './SimpleSixTemplate'
import { SectionItemsTemplate } from './SectionItemsTemplate'
import { TwoColumnSectionItemsTemplate } from './TwoColumnSectionItemsTemplate'

import { TemplateType } from './TemplateTypes'

export const templateComponents = {
  enumeration: EnumerationTemplate,
  explanation: ExplanationTemplate,
  story: StoryTemplate,
  list: ListTemplate,
  explanation2: ExplanationTwoTemplate,
  simple: SimpleTemplate,
  simple2: SimpleTwoTemplate,
  simple3: SimpleThreeTemplate,
  table: TableTemplate,
  simple4: SimpleFourTemplate,
  simple5: SimpleFiveTemplate,
  simple6: SimpleSixTemplate,
  'section-items': SectionItemsTemplate,
  'two-column-section-items': TwoColumnSectionItemsTemplate
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