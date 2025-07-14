export type Genre = 
  | 'knowhow'           // ノウハウ系
  | 'book-recommendation' // 書籍紹介系
  | 'internship-deadline' // インターン締切系
  | 'entry-deadline'      // エントリー締切系
  | 'industry-features'   // 業種特徴系
  | 'strategy'           // 対策系
  | 'step-learning'      // ステップ学習系
  | 'general'            // その他

export interface GenreConfig {
  genre: Genre
  description: string
  keywords: string[]
  optimalItemRange: { min: number; max: number }
  contentStructure: string[]
}

export const GENRE_CONFIGS: GenreConfig[] = [
  {
    genre: 'knowhow',
    description: '実践的なテクニック・方法論の紹介',
    keywords: ['方法', 'テクニック', 'コツ', 'ポイント', '手順', 'やり方', 'ノウハウ', 'つの方法', 'つのコツ', 'つのポイント'],
    optimalItemRange: { min: 3, max: 5 },
    contentStructure: ['手順解説', '実践方法', 'チェックリスト']
  },
  {
    genre: 'book-recommendation',
    description: '書籍・参考資料の推薦とレビュー',
    keywords: ['書籍', '本', '参考書', '必読', 'おすすめ', 'ランキング', '読むべき'],
    optimalItemRange: { min: 5, max: 5 },
    contentStructure: ['書名・著者・要約', '評価・レビュー', 'カテゴリ別分類']
  },
  {
    genre: 'internship-deadline',
    description: 'インターン応募の締切情報管理',
    keywords: ['インターン', '締切', '応募', '募集', '期限', 'サマー', 'ウィンター'],
    optimalItemRange: { min: 4, max: 5 },
    contentStructure: ['企業名・締切日・概要', '応募条件', '準備事項']
  },
  {
    genre: 'entry-deadline',
    description: '本選考エントリーの締切情報管理',
    keywords: ['エントリー', '本選考', '締切', '応募', '新卒', '就活', '採用'],
    optimalItemRange: { min: 4, max: 5 },
    contentStructure: ['企業名・締切日・職種', '応募条件', '選考フロー']
  },
  {
    genre: 'industry-features',
    description: '業界・業種の特徴と比較分析',
    keywords: ['業界', '業種', '特徴', '違い', '比較', 'メリット', 'デメリット'],
    optimalItemRange: { min: 4, max: 6 },
    contentStructure: ['業界概要', 'メリット・デメリット', '求められるスキル']
  },
  {
    genre: 'strategy',
    description: '面接・ES・試験対策の具体的アドバイス',
    keywords: ['対策', '攻略', '準備', 'コツ', '注意点', '面接', 'ES', '試験'],
    optimalItemRange: { min: 4, max: 6 },
    contentStructure: ['準備事項', '実践方法', '注意点・失敗例']
  },
  {
    genre: 'step-learning',
    description: '段階的な学習プロセスの指導',
    keywords: ['ステップ', '段階', '学習', 'プロセス', '流れ', '順番', '手順'],
    optimalItemRange: { min: 3, max: 5 },
    contentStructure: ['学習手順', '各段階の目標', '進捗確認方法']
  },
  {
    genre: 'general',
    description: 'その他の一般的なコンテンツ',
    keywords: [],
    optimalItemRange: { min: 3, max: 6 },
    contentStructure: ['一般的な構成']
  }
]

export function getGenreConfig(genre: Genre): GenreConfig {
  return GENRE_CONFIGS.find(config => config.genre === genre) || GENRE_CONFIGS[GENRE_CONFIGS.length - 1]
}