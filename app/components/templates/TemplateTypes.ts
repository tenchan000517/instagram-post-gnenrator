// テンプレートの型定義とメタデータ

export interface TemplateMetadata {
  id: string
  name: string
  description: string
  suitableFor: {
    contentTypes: string[]
    genres: string[]
    dataStructure: string[]
    complexity: 'simple' | 'medium' | 'complex'
    pageCount: { min: number, max: number }
  }
  characterLimits: {
    title: number
    content: number
    subtitle: number
    items: number
  }
  keywords: string[]
}

export interface TemplateData {
  title: string
  content?: string
  subtitle?: string
  description?: string  // 説明文
  badgeText?: string  // バッジに表示するテキスト
  items?: (string | { title?: string; content?: string })[]
  points?: Array<{
    title: string
    description: string
  }>
  checklist?: Array<{
    text: string
    checked: boolean
  }>
  tableData?: {
    headers: string[]
    rows: string[][]
  }
  boxes?: Array<{
    title: string
    content: string
  }>
  twoColumn?: {
    left: (string | { title?: string; content?: string })[]
    right: (string | { title?: string; content?: string })[]
  }
  sections?: Array<{
    title: string
    content: string
    items?: (string | { title?: string; content?: string })[]
  }>
  [key: string]: any  // For dynamic field access
}

// 13個のテンプレートタイプ（純粋構造ベース設計）
export type TemplateType = 
  | 'enumeration'      // ①列挙型
  | 'explanation'      // ②説明型
  | 'story'            // ③一枚ストーリー型
  | 'list'             // ④リスト型
  | 'explanation2'     // ⑤解説型２
  | 'simple'           // ⑥シンプル型
  | 'simple2'          // ⑦シンプル型２
  | 'simple3'          // ⑧シンプル型３
  | 'table'            // ⑨表型
  | 'simple4'          // ⑩シンプル型４
  | 'simple5'          // ⑪シンプル型５
  | 'simple6'          // ⑫シンプル型６
  | 'section-items'    // ⑬セクション+アイテム型（純粋構造ベース）
  | 'two-column-section-items' // ⑭2カラムセクション+アイテム型