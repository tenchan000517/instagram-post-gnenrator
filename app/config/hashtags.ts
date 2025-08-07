// ハッシュタグ管理設定
// 簡単にメンテナンスできるハッシュタグ設定ファイル

export interface HashtagConfig {
  large: string[]      // 大カテゴリ群（4つ選択）
  medium: string[]     // 中カテゴリ群（4つ選択）
  small: string[]      // 小カテゴリ群（3つ選択）
}

export const hashtagConfig: HashtagConfig = {
  // 大カテゴリ群（4つ選択）- 広範囲で基本的なハッシュタグ
  large: [
    '#就活',
    '#キャリア',
    '#新卒',
    '#インターン',
    '#スキルアップ',
    '#自己分析',
  ],

  // 中カテゴリ群（4つ選択）- 具体的な活動や対象者
  medium: [
    '#就活生',
    '#面接対策',
    '#ES対策',
    '#業界研究',
    '#企業研究',
    '#長期インターン',
    '#短期インターン',
    '#サマーインターン',
    '#ウィンターインターン',
    '#就職活動',
    '#就活応援',
    '#就活仲間',
    '#就活アカウント',
    '#仕事',
    '#働き方',
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
    '#新卒採用',
    '#26卒',
    '#27卒',
    '#28卒'
  ],

  // 小カテゴリ群（3つ選択）- 特化したコンテンツや詳細なキーワード
  small: [
    '#就活の教科書',
    '#就活ハック',
    '#就活メモ',
    '#就活ノート',
    '#就活情報',
    '#就活対策',
    '#就活コツ',
    '#就活術',
    '#就活テクニック',
    '#自己認識',
    '#自己成長',
    '#自己理解',
    '#自分らしさ',
    '#自己啓発',
    '#内定獲得',
    '#内定者',
    '#内定承諾',
    '#内定辞退',
    '#モチベーションアップ',
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
    '#ビジネスパーソン',
    '#目標達成',
    '#受験',
    '#職場',
    '#イベント',
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
   * 大規模4個、中規模4個、小規模4個、メインジャンル1個 = 計13個
   */
  selectHashtags(
    content: string, 
    additionalKeywords: string[] = [],
    targetId?: string,
    postType?: string
  ): {
    large: string[]
    medium: string[]
    small: string[]
    all: string[]
  } {
    // 大規模ハッシュタグ（4個）- 投稿タイプ別
    const selectedLarge = this.getLargeHashtagsByPostType(postType, targetId)
    
    // 中規模ハッシュタグ（4個）- ターゲット別
    const selectedMedium = this.getMediumHashtagsByTarget(targetId)
    
    // 小規模ハッシュタグ（4個）- コンテンツ内容別
    const selectedSmall = this.getSmallHashtagsByContent(content, additionalKeywords)

    return {
      large: selectedLarge,
      medium: selectedMedium,
      small: selectedSmall,
      all: [...selectedLarge, ...selectedMedium, ...selectedSmall]
    }
  }

  /**
   * 大規模ハッシュタグを投稿タイプ別に選択
   */
  private getLargeHashtagsByPostType(postType?: string, targetId?: string): string[] {
    const baseTag = '#キャリア'
    
    switch (postType) {
      case '001': // 悩み解決
        const isStudent = targetId && ['T001', 'T004', 'T007', 'T008', 'T013', 'T019', 'T022'].includes(targetId)
        return [baseTag, '#仕事', '#日常', isStudent ? '#学生' : '#社会人']
      
      case '002': // スキルアップ
        return [baseTag, '#成長', '#自分磨き', '#仕事']
      
      case '003': // 業界情報
        const isStudentT3 = targetId && ['T001', 'T004', 'T007', 'T008', 'T013', 'T019', 'T022'].includes(targetId)
        return [baseTag, '#仕事', '#成長', isStudentT3 ? '#学生' : '#社会人']
      
      case '004': // 効率化
        return [baseTag, '#仕事', '#成長', '#ライフスタイル']
      
      default:
        return [baseTag, '#仕事', '#成長', '#社会人']
    }
  }

  /**
   * 中規模ハッシュタグをターゲット別に選択
   */
  private getMediumHashtagsByTarget(targetId?: string): string[] {
    
    const targetHashtagMap: { [key: string]: string[] } = {
      // 学生系
      'T001': ['#学生', '#就職活動', '#自己啓発', '#モチベーション'],
      'T004': ['#学生', '#就職活動', '#自己啓発', '#モチベーション'],
      'T007': ['#学生', '#就職活動', '#スキルアップ', '#自己啓発'],
      'T008': ['#学生', '#フリーランス', '#モチベーション', '#自己啓発'],
      'T013': ['#学生', '#就職活動', '#自己啓発', '#モチベーション'],
      'T019': ['#学生', '#就職活動', '#スキルアップ', '#自己啓発'],
      'T022': ['#学生', '#就職活動', '#スキルアップ', '#自己啓発'],
      
      // 女性系
      'T002': ['#ワーママ', '#働く女性', '#キャリアウーマン', '#ポジティブ'],
      'T005': ['#ワーママ', '#働く女性', '#転職', '#キャリアウーマン'],
      'T009': ['#ワーママ', '#働く女性', '#スキルアップ', '#自分磨き'],
      'T011': ['#女性起業家', '#働く女性', '#フリーランス', '#ポジティブ'],
      'T020': ['#ワーママ', '#働く女性', '#スキルアップ', '#フリーランス'],
      'T023': ['#ワーママ', '#働く女性', '#スキルアップ', '#フリーランス'],
      
      // 男性系
      'T003': ['#転職', '#フリーランス', '#モチベーション', '#自己啓発'],
      'T006': ['#転職', '#フリーランス', '#モチベーション', '#自己啓発'],
      'T010': ['#スキルアップ', '#フリーランス', '#モチベーション', '#自己啓発'],
      'T012': ['#フリーランス', '#モチベーション', '#スキルアップ', '#自己啓発'],
      'T021': ['#フリーランス', '#スキルアップ', '#モチベーション', '#自己啓発'],
      'T024': ['#フリーランス', '#スキルアップ', '#モチベーション', '#自己啓発'],
      
      // 一般系
      'T014': ['#転職', '#転職活動', '#フリーランス', '#モチベーション'],
      'T015': ['#フリーランス', '#女性起業家', '#モチベーション', '#自己啓発'],
      'T016': ['#自己啓発', '#モチベーション', '#スキルアップ', '#就職活動'],
      'T017': ['#自己啓発', '#モチベーション', '#スキルアップ', '#就職活動'],
      'T018': ['#フリーランス', '#スキルアップ', '#モチベーション', '#自己啓発']
    }
    
    const result = targetHashtagMap[targetId || ''] || ['#自己啓発', '#モチベーション', '#スキルアップ', '#就職活動']
    return result
  }

  /**
   * 小規模ハッシュタグをコンテンツ内容別に選択
   */
  private getSmallHashtagsByContent(content: string, additionalKeywords: string[]): string[] {
    // 大規模・中規模で使用されるハッシュタグを除外
    const smallHashtags = [
      '#コミュニティ', '#目標達成', '#働き方', '#アドバイス', 
      '#可能性', '#本音', '#自己成長', '#モチベーションアップ', '#人脈', '#キャリアアップ',
      '#時間管理', '#若手', '#ネットワーク', '#リーダーシップ', '#ライフハック', 
      '#メンター', '#体験談', '#仕事術', '#裏話', '#ビジネススキル', '#タスク管理'
    ]
    
    return this.selectFromCategory(smallHashtags, content.toLowerCase(), additionalKeywords, 4)
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