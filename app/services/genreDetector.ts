import { Genre, GenreConfig, GENRE_CONFIGS } from '../types/genre'

export class GenreDetector {
  private genreConfigs: GenreConfig[] = GENRE_CONFIGS

  /**
   * コンテンツからジャンルを判定する
   * @param content 判定対象のコンテンツ
   * @returns 判定されたジャンル
   */
  detectGenre(content: string): Genre {
    const normalizedContent = content.toLowerCase()
    
    // キーワードマッチスコアを計算
    const scores = this.genreConfigs.map(config => ({
      genre: config.genre,
      score: this.calculateScore(normalizedContent, config.keywords)
    }))
    
    // スコアが最も高いジャンルを選択
    const bestMatch = scores.reduce((best, current) => 
      current.score > best.score ? current : best
    )
    
    // 最低スコア閾値をチェック（0.1以上でマッチと判定）
    if (bestMatch.score >= 0.1) {
      return bestMatch.genre
    }
    
    // マッチしない場合は一般ジャンルを返す
    return 'general'
  }

  /**
   * キーワードマッチスコアを計算する
   * @param content 判定対象のコンテンツ
   * @param keywords マッチングキーワード
   * @returns スコア（0-1）
   */
  private calculateScore(content: string, keywords: string[]): number {
    if (keywords.length === 0) return 0
    
    let matchCount = 0
    let totalWeight = 0
    
    keywords.forEach(keyword => {
      const keywordLower = keyword.toLowerCase()
      const matches = (content.match(new RegExp(keywordLower, 'g')) || []).length
      
      // キーワードが複数回出現した場合は重み付けを行う
      if (matches > 0) {
        matchCount += Math.min(matches, 3) // 最大3回までカウント
        totalWeight += 3
      } else {
        totalWeight += 1
      }
    })
    
    return totalWeight > 0 ? matchCount / totalWeight : 0
  }

  /**
   * ジャンル判定の詳細情報を取得する
   * @param content 判定対象のコンテンツ
   * @returns 判定結果の詳細
   */
  getGenreAnalysis(content: string): {
    detectedGenre: Genre
    confidence: number
    scores: { genre: Genre; score: number }[]
  } {
    const normalizedContent = content.toLowerCase()
    
    const scores = this.genreConfigs.map(config => ({
      genre: config.genre,
      score: this.calculateScore(normalizedContent, config.keywords)
    }))
    
    const bestMatch = scores.reduce((best, current) => 
      current.score > best.score ? current : best
    )
    
    const detectedGenre = bestMatch.score >= 0.1 ? bestMatch.genre : 'general'
    
    return {
      detectedGenre,
      confidence: bestMatch.score,
      scores: scores.sort((a, b) => b.score - a.score)
    }
  }

  /**
   * 特定のジャンルに対する適合度を評価する
   * @param content 判定対象のコンテンツ
   * @param targetGenre 評価対象のジャンル
   * @returns 適合度スコア（0-1）
   */
  evaluateGenreMatch(content: string, targetGenre: Genre): number {
    const config = this.genreConfigs.find(c => c.genre === targetGenre)
    if (!config) return 0
    
    const normalizedContent = content.toLowerCase()
    return this.calculateScore(normalizedContent, config.keywords)
  }
}