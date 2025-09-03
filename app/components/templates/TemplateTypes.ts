// テンプレートの型定義とメタデータ
import React from 'react'
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

// タイトルを「：」または「！」で分割してバッジとタイトルに分ける関数
export const splitTitleForBadge = (title: string) => {
  if (title && title.includes('：')) {
    const parts = title.split('：')
    return {
      badge: parts[0].trim(),
      title: parts[1].trim()
    }
  }
  if (title && title.includes('！')) {
    const parts = title.split('！')
    if (parts.length >= 2 && parts[1].trim()) {
      return {
        badge: parts[1].trim(),
        title: parts[0].trim() + '！'
      }
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

// マークダウン記法と絵文字を除去する関数
export const cleanMarkdown = (text: string): string => {
  if (!text) return text
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // **bold** を除去
    .replace(/\*(.*?)\*/g, '$1')     // *italic* を除去
    .replace(/__(.*?)__/g, '$1')     // __bold__ を除去
    .replace(/_(.*?)_/g, '$1')       // _italic_ を除去
    .replace(/~~(.*?)~~/g, '$1')     // ~~strikethrough~~ を除去
    .replace(/`(.*?)`/g, '$1')       // `code` を除去
    .replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '') // 絵文字を除去
    .trim()
}

// 改行処理のためのテキスト分割関数（各テンプレートで使用）
export const splitTextByLines = (text: string): string[] => {
  if (!text) return ['']
  return cleanMarkdown(text).split('\n')
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
    footerDescription?: number
    [key: string]: number | undefined  // Allow additional properties
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
  }> | Array<{
    name: string
    content: string | string[]
  }>
  twoColumn?: {
    left: (string | { title?: string; content?: string })[]
    right: (string | { title?: string; content?: string })[]
  }
  sections?: Array<{
    title: string
    content: string
    items?: (string | { title?: string; content?: string })[]
  }> | Array<{
    name: string
    content: string | string[]
    image?: string
    footerText?: string
  }>
  steps?: Array<{
    step: number
    title: string
    description: string
  }>
  rankingData?: Array<{
    rank: number
    name: string
    value: string
    description?: string
  }>
  graphData?: {
    type: 'pie' | 'bar'
    data?: Array<{
      name: string
      value: number
      color?: string
    }>
    // 棒グラフ用の新しい形式
    categories?: string[]
    series?: Array<{
      name: string
      data: number[]
      unit?: string
    }>
    source?: {
      organization: string
      year: string
      date?: string
      url?: string
    }
  }
  
  // 新テンプレート用データ構造（優先度A - Critical）
  // sequential_step_learning用
  stepNumber?: number
  stepTitle?: string
  stepContent?: string[]
  questions?: string[]
  
  // sequential_dependency用
  pointNumber?: string
  actionItems?: string[]
  
  // parallel_qa_discussion用
  questionText?: string
  answerText?: string
  practicalAdvice?: string
  
  // points_list_analysis用
  pointsTitle?: string
  pointsList?: string[]
  summaryMessage?: string
  
  // timeline_story_experience用
  timePoint?: string
  scene?: string
  character?: string
  emotion?: string
  context?: string
  
  // feature_parallel_info用
  featureNumber?: number
  featureName?: string
  effect?: string
  
  // 新テンプレート用データ構造（優先度B - High）
  // category_content_learning用
  categoryName?: string
  episodes?: string[]
  advice?: string
  
  // step_guide_achievement用
  benefit?: string
  motivationalMessage?: string
  
  // method_systematic_info用
  methodNumber?: number
  methodName?: string
  
  // practical_guide_conversation用
  guideType?: string
  examples?: Array<{
    phrase: string
    usage: string
  }> | (string | { title?: string; content?: string })[]
  
  // company_data_list用
  companyName?: string
  industry?: string
  salary?: string
  deadline?: string
  selectionFlow?: string[]
  
  // Image properties for unified templates
  imageSrc?: string
  image?: string
  imageAlt?: string
  
  // Footer properties for unified templates
  footerDescription?: string
  
  // Additional array properties for unified templates  
  methods?: (string | { title?: string; content?: string })[]
  tools?: (string | { title?: string; content?: string })[]
  
  // Character properties for templates
  characterImage?: string
  characterPosition?: 'left' | 'right'
  
  [key: string]: any  // For dynamic field access
}

// アクティブテンプレートタイプ（既存16個 + 新テンプレート11個）
export type TemplateType = 
  // 既存テンプレート
  | 'index'            // ⓪INDEX型（目次ページ）
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
  | 'ranking'                  // ⑭ランキング表示型（データ可視化）
  | 'graph'                    // ⑮グラフ表示型（データ可視化・recharts使用）
  // 新テンプレート（優先度A - Critical）
  // | 'sequential_step_learning'     // ⑯順序依存ステップ型 (未実装)
  // | 'parallel_qa_discussion'       // ⑰Q&A並列紹介型 (未実装)
  // | 'points_list_analysis'         // ⑱ポイントリスト型 (未実装)
  // | 'timeline_story_experience'    // ⑲時系列ストーリー型 (未実装)
  | 'feature_parallel_info'        // ⑳機能紹介並列型
  | 'feature_detail_tips'          // ㉑機能詳細Tips型
  | 'sequential_dependency'        // ㉒順序依存ステップ型（typeID002対応）
  | 'dual_enumeration'             // ㉓2アイテム上下配置型（K132対応）
  // 新テンプレート（優先度B - High）
  // | 'category_content_learning'    // ㉑カテゴリ別コンテンツ学習型 (未実装)
  // | 'step_guide_achievement_old'   // ㉒ステップガイド達成型 (未実装・重複)
  // | 'method_systematic_info'       // ㉓方法論体系的情報型 (未実装)
  // | 'practical_guide_conversation' // ㉔実践ガイド会話型 (未実装)
  // | 'company_data_list'            // ㉕企業データリスト型 (未実装)
  // | 'usage_practical_steps'        // ㉖使用法実践ステップ型 (未実装)
  | 'failure_episode'              // ㉗失敗エピソード型
  | 'failure_story_intro'          // ㉘失敗ストーリー導入型
  | 'profile_offer'                // ㉙プロフィール・オファー型
  | 'basic_intro'                  // ㉚基本導入型（K002用）
  | 'step_guide_achievement'       // ㉛ステップガイド達成型（K002用・実装済み）
  | 'achievement_summary'          // ㉜達成まとめ型（K002用）
  | 'ng_good_comparison'           // ㉝NG/GOOD比較型（K117用）
  | 'category_explanation'         // ㉞カテゴリ説明型（K117用）
  | 'vision_strength_matrix'       // ㉟ビジョン×強みマトリックス型（K117用）
  | 'category_summary'             // ㊱カテゴリサマリー型（K140用）
  | 'grid_summary'                 // ㊲グリッドサマリー型（K150用）
  | 'tool_feature'                 // ㊳ツール機能紹介型（K168用）
  | 'efficiency_tips'              // ㊴効率化ヒケツ型（K155用）
  | 'multiple_items_display'       // ㊵複数アイテム表示型（2-5個柔軟対応）
  // Unified templates
  | 'simple_intro'                 // ㊶シンプル導入型（unified）
  | 'dual_section'                 // ㊷デュアルセクション型（unified）
  | 'ranking_display'              // ㊸ランキング表示型（unified）
  | 'item_grid'                    // ㊹アイテムグリッド型（unified）
  | 'comparison'                   // ㊺比較型（unified）
  | 'unified_company_detail'       // ㊻企業詳細型（unified）
  | 'item_list'                    // ㊼アイテムリスト型（unified）
  | 'section_blocks'               // ㊽セクションブロック型（unified）
  | 'dynamic_boxes'                // ㊾ダイナミックボックス型（unified）
  | 'image_point'                  // ㊿画像ポイント型（unified）
  // TEN専用テンプレート
  | 'ten_intro'                    // 🔟TEN導入型
  | 'tool_showcase'                // 🔟ツール一覧型
  | 'enhanced_tool_detail'         // 🔟強化ツール詳細型
  | 'ten_summary'                  // 🔟TENまとめ型

// テンプレートコンポーネントのプロパティ型
export interface TemplateProps {
  data: TemplateData
  pageNumber?: number
}