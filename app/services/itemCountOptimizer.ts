import { Genre, getGenreConfig } from '../types/genre'

export class ItemCountOptimizer {
  /**
   * ジャンルに基づいて項目数を最適化する
   * @param items 最適化対象の項目配列
   * @param genre ジャンル
   * @returns 最適化された項目配列
   */
  optimizeItemCount<T>(items: T[], genre: Genre): T[] {
    const config = getGenreConfig(genre)
    
    // 項目数が適切な範囲内の場合はそのまま返す
    if (items.length >= config.optimalItemRange.min && items.length <= config.optimalItemRange.max) {
      return items
    }
    
    // 項目数が少なすぎる場合の警告
    if (items.length < config.optimalItemRange.min) {
      console.warn(`[ItemCountOptimizer] 項目数が少なすぎます。推奨: ${config.optimalItemRange.min}個以上（現在: ${items.length}個）`)
      return items // 項目を増やすことはできないので、そのまま返す
    }
    
    // 項目数が多すぎる場合の処理
    if (items.length > config.optimalItemRange.max) {
      console.info(`[ItemCountOptimizer] 項目数が多すぎます。最適化を実行します。（現在: ${items.length}個 → 推奨: ${config.optimalItemRange.max}個）`)
      
      // 書籍紹介系の場合は特別な処理（5個単位で分割）
      if (genre === 'book-recommendation') {
        return this.optimizeForBookRecommendation(items)
      }
      
      // その他のジャンルは最大数まで切り詰める
      return items.slice(0, config.optimalItemRange.max)
    }
    
    return items
  }

  /**
   * 書籍紹介系の特別な最適化処理
   * 5個単位で分割し、最初の5個を返す
   * @param items 書籍項目配列
   * @returns 最適化された項目配列
   */
  private optimizeForBookRecommendation<T>(items: T[]): T[] {
    // 5個単位で分割
    const chunked = this.chunkArray(items, 5)
    
    // 最初の5個を返す（テンプレートは自動分割で対応）
    return chunked[0] || []
  }

  /**
   * 配列を指定サイズで分割する
   * @param array 分割対象の配列
   * @param size 分割サイズ
   * @returns 分割された配列の配列
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

  /**
   * ジャンルに基づく項目数の妥当性をチェックする
   * @param itemCount 項目数
   * @param genre ジャンル
   * @returns 妥当性チェック結果
   */
  validateItemCount(itemCount: number, genre: Genre): {
    isValid: boolean
    recommendation: string
    severity: 'info' | 'warning' | 'error'
  } {
    const config = getGenreConfig(genre)
    
    if (itemCount >= config.optimalItemRange.min && itemCount <= config.optimalItemRange.max) {
      return {
        isValid: true,
        recommendation: `項目数は適切です（${itemCount}個）`,
        severity: 'info'
      }
    }
    
    if (itemCount < config.optimalItemRange.min) {
      return {
        isValid: false,
        recommendation: `項目数が少なすぎます。推奨: ${config.optimalItemRange.min}個以上（現在: ${itemCount}個）`,
        severity: 'warning'
      }
    }
    
    return {
      isValid: false,
      recommendation: `項目数が多すぎます。推奨: ${config.optimalItemRange.max}個以下（現在: ${itemCount}個）`,
      severity: 'error'
    }
  }

  /**
   * ジャンルに基づく最適な項目数を取得する
   * @param genre ジャンル
   * @returns 最適な項目数の範囲
   */
  getOptimalItemCount(genre: Genre): { min: number; max: number } {
    const config = getGenreConfig(genre)
    return config.optimalItemRange
  }

  /**
   * 項目数最適化のレポートを生成する
   * @param originalCount 元の項目数
   * @param optimizedCount 最適化後の項目数
   * @param genre ジャンル
   * @returns 最適化レポート
   */
  generateOptimizationReport(originalCount: number, optimizedCount: number, genre: Genre): {
    genre: Genre
    originalCount: number
    optimizedCount: number
    action: string
    improvement: string
  } {
    const config = getGenreConfig(genre)
    
    let action: string
    let improvement: string
    
    if (originalCount === optimizedCount) {
      action = '変更なし'
      improvement = '既に最適な項目数です'
    } else if (originalCount > optimizedCount) {
      action = '項目数削減'
      improvement = `${originalCount - optimizedCount}個削減により視覚的バランスが改善`
    } else {
      action = '項目数増加'
      improvement = `${optimizedCount - originalCount}個増加により情報量が充実`
    }
    
    return {
      genre,
      originalCount,
      optimizedCount,
      action,
      improvement
    }
  }
}