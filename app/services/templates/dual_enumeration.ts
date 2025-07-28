// 2つのアイテムを並列表示するテンプレート（typeID002専用）
export interface DualEnumerationTemplate {
  title?: string;
  leftItem: {
    number: string;
    title: string;
    description: string;
    illustration?: string;
  };
  rightItem: {
    number: string;
    title: string;
    description: string;
    illustration?: string;
  };
  pageIndicator?: string; // "3/10" のような表示
}

export const DUAL_ENUMERATION_TEMPLATE = 'dual_enumeration';