// テンプレートの型定義とメタデータ
import { MdFilter1, MdFilter2, MdFilter3, MdFilter4, MdFilter5, MdFilter6, MdFilter7, MdFilter8, MdFilter9 } from 'react-icons/md'

// ページ番号アイコンのマッピング
export const PAGE_NUMBER_ICONS = {
  1: MdFilter1,
  2: MdFilter2,
  3: MdFilter3,
  4: MdFilter4,
  5: MdFilter5,
  6: MdFilter6,
  7: MdFilter7,
  8: MdFilter8,
  9: MdFilter9,
} as const

// タイトルを「：」で分割してバッジとタイトルに分ける関数
export const splitTitleForBadge = (title: string) => {
  if (title && title.includes('：')) {
    const parts = title.split('：')
    return {
      badge: parts[0].trim(),
      title: parts[1].trim()
    }
  }
  return {
    badge: '',
    title: title
  }
}

// ページ番号に対応するアイコンを取得する関数
export const getPageNumberIcon = (pageNumber: number) => {
  return PAGE_NUMBER_ICONS[pageNumber as keyof typeof PAGE_NUMBER_ICONS] || MdFilter1
}

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
  pageNumber?: number  // ページ番号（アイコン表示用）
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
  steps?: Array<{
    step: number
    title: string
    description: string
  }>
  [key: string]: any  // For dynamic field access
}

// アクティブテンプレートタイプ（13個、Critical Priority + High Priority追加）
export type TemplateType = 
  | 'enumeration'      // ①列挙型
  | 'list'             // ②リスト型
  | 'explanation2'     // ③解説型２
  | 'simple3'          // ④シンプル型３
  | 'table'            // ⑤表型
  | 'simple5'          // ⑥シンプル型５
  | 'simple6'          // ⑦シンプル型６
  | 'section-items'    // ⑧セクション+アイテム型
  | 'two-column-section-items' // ⑨2カラムセクション+アイテム型
  | 'title-description-only'   // ⑩タイトル+説明文のみ型（Critical Priority）
  | 'checklist-enhanced'       // ⑪チェックリスト詳細付き型（Critical Priority）
  | 'item-n-title-content'     // ⑫独立ボックス構造型（Critical Priority）
  | 'single-section-no-items'  // ⑬単一セクション・アイテム無し型（High Priority）