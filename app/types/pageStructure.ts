import { TemplateType } from '../components/templates/TemplateTypes'

export interface PageStructure {
  概要: string
  有益性: string
  template: PremiumTemplateType
  title: string
  theme: string
  isStructuredGeneration?: boolean  // 新統合システム識別フラグ
}

// 優秀テンプレート定義（計画書の優先順位通り）
export type PremiumTemplateType = 
  | 'table'                      // 比較データ構造
  | 'simple5'                    // ステップ/チェックリスト構造
  | 'section-items'              // セクション+アクション項目構造
  | 'two-column-section-items'   // 複数セクション+項目構造
  | 'checklist-enhanced'         // 詳細チェック項目構造
  | 'item-n-title-content'       // 独立概念ボックス構造

export interface GeneratedPage {
  pageNumber: number
  title: string
  templateType: TemplateType
  content: {
    [key: string]: any
  }
  rankingData?: any[]
  graphData?: any
}