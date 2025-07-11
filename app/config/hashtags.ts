// ハッシュタグ管理設定
// 簡単にメンテナンスできるハッシュタグ設定ファイル

export interface HashtagConfig {
  large: string[]      // 大カテゴリ群（4つ選択）
  medium: string[]     // 中カテゴリ群（4つ選択）
  small: string[]      // 小カテゴリ群（3つ選択）
}

export const hashtagConfig: HashtagConfig = {
  // 大カテゴリ群（4つ選択）
  large: [
    '#就活',
    '#キャリア',
    '#転職',
    '#新卒',
    '#インターン',
    '#仕事',
    '#働き方',
    '#スキルアップ',
    '#自己成長',
    '#自己理解',
    '#自己分析',
    '#自己認識',
    '#モチベーションアップ',
    '#自分らしさ',
    '#自己啓発'
  ],

  // 中カテゴリ群（4つ選択）
  medium: [
    '#就活生',
    '#面接対策',
    '#ES対策',
    '#自己分析',
    '#業界研究',
    '#企業研究',
    '#長期インターン',
    '#短期インターン',
    '#サマーインターン',
    '#ウィンターインターン',
    '#就活',
    '#就職活動',
    '#就活応援',
    '#就活仲間',
    '#就活アカウント',
    '#学生',
    '#就活準備',
    '#就活成功',
    '#内定',
    '#大学生',
    '#就活サイト',
    '#エントリーシート',
    '#説明会',
    '#企業説明会',
    '#インターンシップ',
    '#新卒採用'
  ],

  // 小カテゴリ群（3つ選択）
  small: [
    '#就活の教科書',
    '#就活ハック',
    '#就活メモ',
    '#就活ノート',
    '#就活情報',
    '#就活準備',
    '#就活対策',
    '#就活コツ',
    '#就活術',
    '#就活テクニック',
    '#内定獲得',
    '#内定者',
    '#内定承諾',
    '#内定辞退',
    '#キャリアアップ',
    '#キャリアチェンジ',
    '#キャリア相談',
    '#キャリア形成',
    '#スキル向上',
    '#成長',
    '#学び',
    '#経験',
    '#挑戦',
    '#目標',
    '#夢',
    '#未来',
    '#可能性',
    '#成功',
    '#努力',
    '#継続',
    '#改善',
    '#学生',
    '#大学生',
    '#院生',
    '#文系',
    '#理系',
    '#ビジネス',
    '#社会人',
    '#フレッシュマン',
    '#新人',
    '#若手',
    '#先輩',
    '#後輩',
    '#同期',
    '#仲間',
    '#ネットワーク',
    '#人脈',
    '#メンター',
    '#アドバイス',
    '#経験談',
    '#体験談',
    '#実体験',
    '#リアル',
    '#本音',
    '#裏話',
    '#キャリア',
    '#ビジネスパーソン',
    '#社会人',
    '#自己啓発',
    '#目標達成',
    '#受験',
    '#仕事',
    '#職場',
    '#スキルアップ',
    '#イベント',
    '#転職',
    '#就職活動',
    '#ES',
    '#ガクチカ'
  ]
}

// ハッシュタグ選択サービス
export class HashtagService {
  private config: HashtagConfig

  constructor(config: HashtagConfig = hashtagConfig) {
    this.config = config
  }

  /**
   * コンテンツに基づいて最適なハッシュタグを選択
   * 大カテゴリ4つ、中カテゴリ4つ、小カテゴリ3つ = 計11個
   */
  selectHashtags(content: string, additionalKeywords: string[] = []): {
    large: string[]
    medium: string[]
    small: string[]
    all: string[]
  } {
    const contentLower = content.toLowerCase()
    const allKeywords = [...additionalKeywords.map(k => k.toLowerCase())]

    // 大カテゴリから4つ選択
    const selectedLarge = this.selectFromCategory(
      this.config.large,
      contentLower,
      allKeywords,
      4
    )

    // 中カテゴリから4つ選択
    const selectedMedium = this.selectFromCategory(
      this.config.medium,
      contentLower,
      allKeywords,
      4
    )

    // 小カテゴリから3つ選択
    const selectedSmall = this.selectFromCategory(
      this.config.small,
      contentLower,
      allKeywords,
      3
    )

    return {
      large: selectedLarge,
      medium: selectedMedium,
      small: selectedSmall,
      all: [...selectedLarge, ...selectedMedium, ...selectedSmall]
    }
  }

  /**
   * カテゴリから指定数のハッシュタグを選択
   */
  private selectFromCategory(
    category: string[],
    content: string,
    keywords: string[],
    count: number
  ): string[] {
    // マッチング度でスコアリング
    const scored = category.map(hashtag => {
      let score = 0
      const hashtagLower = hashtag.toLowerCase().replace('#', '')

      // コンテンツとの直接マッチング
      if (content.includes(hashtagLower)) {
        score += 10
      }

      // 部分マッチング
      const hashtagWords = hashtagLower.split(/[^a-zA-Z0-9あ-ん]/g)
      hashtagWords.forEach(word => {
        if (word.length > 1 && content.includes(word)) {
          score += 5
        }
      })

      // キーワードマッチング
      keywords.forEach(keyword => {
        if (hashtagLower.includes(keyword) || keyword.includes(hashtagLower)) {
          score += 3
        }
      })

      // デフォルトの優先度（よく使われるハッシュタグ）
      const popularTags = [
        '#就活', '#キャリア', '#就活生', '#面接対策', '#就活の教科書',
        '#新卒', '#インターン', '#自己分析', '#ES対策', '#就活ハック'
      ]
      if (popularTags.includes(hashtag)) {
        score += 2
      }

      return { hashtag, score }
    })

    // スコア順でソートし、上位を選択
    scored.sort((a, b) => b.score - a.score)
    
    const selected = scored.slice(0, count).map(item => item.hashtag)
    
    // 足りない場合は残りをランダムに選択
    if (selected.length < count) {
      const remaining = category.filter(tag => !selected.includes(tag))
      const shuffled = remaining.sort(() => Math.random() - 0.5)
      selected.push(...shuffled.slice(0, count - selected.length))
    }

    return selected.slice(0, count)
  }

  /**
   * 設定を更新（メンテナンス用）
   */
  updateConfig(newConfig: Partial<HashtagConfig>) {
    this.config = { ...this.config, ...newConfig }
  }

  /**
   * 現在の設定を取得
   */
  getConfig(): HashtagConfig {
    return { ...this.config }
  }

  /**
   * 全ハッシュタグ数を取得
   */
  getTotalCount(): { large: number; medium: number; small: number; total: number } {
    return {
      large: this.config.large.length,
      medium: this.config.medium.length,
      small: this.config.small.length,
      total: this.config.large.length + this.config.medium.length + this.config.small.length
    }
  }
}

export const hashtagService = new HashtagService()