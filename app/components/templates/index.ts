// アクティブテンプレートコンポーネントのエクスポート（アーカイブ済みを除外）
export { EnumerationTemplate } from './EnumerationTemplate'
export { ListTemplate } from './ListTemplate'
export { ExplanationTwoTemplate } from './ExplanationTwoTemplate'
export { SimpleThreeTemplate } from './SimpleThreeTemplate'
export { TableTemplate } from './TableTemplate'
export { SimpleFiveTemplate } from './SimpleFiveTemplate'
export { SimpleSixTemplate } from './SimpleSixTemplate'
export { SectionItemsTemplate } from './SectionItemsTemplate'
export { TwoColumnSectionItemsTemplate } from './TwoColumnSectionItemsTemplate'

// 型定義とユーティリティ
export * from './TemplateTypes'
export * from './TemplateRegistry'

// アクティブテンプレートコンポーネントマップ（アーカイブ済みを除外）
import { EnumerationTemplate } from './EnumerationTemplate'
import { ListTemplate } from './ListTemplate'
import { ExplanationTwoTemplate } from './ExplanationTwoTemplate'
import { SimpleThreeTemplate } from './SimpleThreeTemplate'
import { TableTemplate } from './TableTemplate'
import { SimpleFiveTemplate } from './SimpleFiveTemplate'
import { SimpleSixTemplate } from './SimpleSixTemplate'
import { SectionItemsTemplate } from './SectionItemsTemplate'
import { TwoColumnSectionItemsTemplate } from './TwoColumnSectionItemsTemplate'

import { TemplateType } from './TemplateTypes'

export const templateComponents = {
  enumeration: EnumerationTemplate,
  list: ListTemplate,
  explanation2: ExplanationTwoTemplate,
  simple3: SimpleThreeTemplate,
  table: TableTemplate,
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