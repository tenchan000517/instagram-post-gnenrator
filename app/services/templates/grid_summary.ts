// 12項目をグリッド状に表示するまとめテンプレート
export interface GridSummaryTemplate {
  title: string;
  subtitle?: string;
  items: Array<{
    number: string;
    title: string;
    icon?: string;
  }>;
  callToAction: string; // "保存して後で復習にゃ！"
}

export const GRID_SUMMARY_TEMPLATE = 'grid_summary';