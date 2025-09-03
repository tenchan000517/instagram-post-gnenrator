// Unified Templates - 統一テンプレートシステム
// テンプレート①〜⑩の完全実装版

// テンプレート①: シンプル導入型
export { 
  SimpleIntroTemplate, 
  simpleIntroMetadata 
} from './SimpleIntroTemplate'

// テンプレート②: 2セクション上下配置型
export { 
  DualSectionTemplate, 
  dualSectionMetadata 
} from './DualSectionTemplate'

// テンプレート③: ランキング・Tier表示型
export { 
  default as RankingDisplayTemplate, 
  rankingDisplayMetadata 
} from './RankingDisplayTemplate'

// テンプレート④: アイテムボックス型
export { 
  ItemGridTemplate, 
  itemGridMetadata 
} from './ItemGridTemplate'

// テンプレート⑤: 比較用テンプレート
export { 
  ComparisonTemplate, 
  comparisonMetadata 
} from './ComparisonTemplate'

// テンプレート⑥: 企業詳細紹介型
export { 
  CompanyDetailTemplate, 
  companyDetailMetadata 
} from './CompanyDetailTemplate'

// テンプレート⑦: アイテムリスト型
export { 
  ItemListTemplate, 
  itemListMetadata 
} from './ItemListTemplate'

// テンプレート⑧: セクションブロック型
export { 
  SectionBlocksTemplate, 
  sectionBlocksMetadata 
} from './SectionBlocksTemplate'

// テンプレート⑨: 動的ボックス型
export { 
  DynamicBoxesTemplate, 
  dynamicBoxesMetadata 
} from './DynamicBoxesTemplate'

// テンプレート⑩: 画像+ポイント型
export { 
  ImagePointTemplate, 
  imagePointMetadata 
} from './ImagePointTemplate'

// 共感テンプレート: 感情共有型
export { 
  EmpathyTemplate, 
  empathyMetadata 
} from './EmpathyTemplate'

// 手順ガイド型テンプレート
export { 
  StepByStepTemplate, 
  stepByStepMetadata 
} from './StepByStepTemplate'

// TEN専用テンプレート群
export { 
  default as TenIntroTemplate, 
  tenIntroMetadata 
} from './TenIntroTemplate'

export { 
  default as ToolShowcaseTemplate, 
  toolShowcaseMetadata 
} from './ToolShowcaseTemplate'

export { 
  default as EnhancedToolDetailTemplate, 
  enhancedToolDetailMetadata 
} from './EnhancedToolDetailTemplate'

export { 
  default as TenSummaryTemplate, 
  tenSummaryMetadata 
} from './TenSummaryTemplate'

// KIKUYO専用テンプレート群
export { 
  default as KikuyoIntroTemplate, 
  kikuyoIntroMetadata 
} from './KikuyoIntroTemplate'

export { 
  default as KikuyoSummaryTemplate, 
  kikuyoSummaryMetadata 
} from './KikuyoSummaryTemplate'

// 統一テンプレートマッピング
export const UNIFIED_TEMPLATE_MAP = {
  // テンプレート①
  'simple_intro': {
    component: 'SimpleIntroTemplate',
    metadata: 'simpleIntroMetadata'
  },
  
  // テンプレート②
  'dual_section': {
    component: 'DualSectionTemplate', 
    metadata: 'dualSectionMetadata'
  },
  
  // テンプレート③
  'ranking_display': {
    component: 'RankingDisplayTemplate',
    metadata: 'rankingDisplayMetadata'
  },
  
  // テンプレート④
  'item_grid': {
    component: 'ItemGridTemplate',
    metadata: 'itemGridMetadata'
  },
  
  // テンプレート⑤
  'comparison': {
    component: 'ComparisonTemplate',
    metadata: 'comparisonMetadata'
  },
  
  // テンプレート⑥
  'company_detail': {
    component: 'CompanyDetailTemplate',
    metadata: 'companyDetailMetadata'
  },
  
  // テンプレート⑦
  'item_list': {
    component: 'ItemListTemplate',
    metadata: 'itemListMetadata'
  },
  
  // テンプレート⑧
  'section_blocks': {
    component: 'SectionBlocksTemplate',
    metadata: 'sectionBlocksMetadata'
  },
  
  // テンプレート⑨
  'dynamic_boxes': {
    component: 'DynamicBoxesTemplate',
    metadata: 'dynamicBoxesMetadata'
  },
  
  // テンプレート⑩
  'image_point': {
    component: 'ImagePointTemplate',
    metadata: 'imagePointMetadata'
  },
  
  // 共感テンプレート
  'empathy': {
    component: 'EmpathyTemplate',
    metadata: 'empathyMetadata'
  },
  
  // 手順ガイド型テンプレート
  'step_by_step': {
    component: 'StepByStepTemplate',
    metadata: 'stepByStepMetadata'
  },

  // TEN専用テンプレート群
  'ten_intro': {
    component: 'TenIntroTemplate',
    metadata: 'tenIntroMetadata'
  },
  'tool_showcase': {
    component: 'ToolShowcaseTemplate',
    metadata: 'toolShowcaseMetadata'
  },
  'enhanced_tool_detail': {
    component: 'EnhancedToolDetailTemplate',
    metadata: 'enhancedToolDetailMetadata'
  },
  'ten_summary': {
    component: 'TenSummaryTemplate',
    metadata: 'tenSummaryMetadata'
  },
  
  // KIKUYO専用テンプレート群
  'kikuyo_intro': {
    component: 'KikuyoIntroTemplate',
    metadata: 'kikuyoIntroMetadata'
  },
  'kikuyo_summary': {
    component: 'KikuyoSummaryTemplate',
    metadata: 'kikuyoSummaryMetadata'
  }
} as const

// 統一テンプレートリスト
export const UNIFIED_TEMPLATES = [
  'simple_intro',
  'dual_section', 
  'ranking_display',
  'item_grid',
  'comparison',
  'company_detail',
  'item_list',
  'section_blocks',
  'dynamic_boxes',
  'image_point',
  'empathy',
  'step_by_step',
  'ten_intro',
  'tool_showcase',
  'enhanced_tool_detail',
  'ten_summary',
  'kikuyo_intro',
  'kikuyo_summary'
] as const

// 型定義
export type UnifiedTemplateId = keyof typeof UNIFIED_TEMPLATE_MAP
export type UnifiedTemplateName = typeof UNIFIED_TEMPLATES[number]