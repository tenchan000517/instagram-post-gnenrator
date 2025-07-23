/**
 * フィルタリングサービス - 統合実装
 * 
 * 機能：
 * 1. 投稿タイプ→ターゲット→ペルソナ→ナレッジの段階的絞り込み
 * 2. 投稿タイプによるペルソナ最終フィルタリング
 * 3. フィルタリング結果の整合性確保
 * 
 * 設計思想：
 * - ナレッジ = 実際の困った→解決した実例
 * - 投稿タイプ = フィルタリング機能のみ
 * - ナレッジ自体が最適構造を内包
 * - 事実以外の情報追加は厳禁
 */

import { TypeID, TargetID, ThemeID } from '../../types/knowledgeBase'
// import problemSolutionPairs from '../../data/knowledgeBase/problemSolutionPairs.json' // 新システム：個別ファイル読み込みに変更
import personas from './data/masterData/personas.json'

// フィルタリング結果の型定義
export interface FilterResult<T> {
  success: boolean
  data: T[]
  metadata: FilterMetadata
  errors?: FilterError[]
}

export interface FilterMetadata {
  totalCount: number
  filteredCount: number
  filterCriteria: Record<string, any>
  timestamp: Date
  performance: {
    executionTime: number
    cacheHit: boolean
  }
}

export interface FilterError {
  type: 'VALIDATION_ERROR' | 'DATA_CONSISTENCY_ERROR' | 'FILTERING_ERROR'
  message: string
  details?: any
}

// ペルソナフィルタリング結果
export interface PersonaFilterResult {
  personaId: string
  personaData: any
  compatibilityScore: number
  matchingCriteria: string[]
}

// ナレッジフィルタリング結果  
export interface KnowledgeFilterResult {
  knowledgeId: string
  knowledgeData: any
  associatedPersonas: string[]
  category: string
  compatibilityScore: number
}

// フィルタリング設定
export interface FilteringConfig {
  enableCache: boolean
  enablePerformanceLogging: boolean
  strictMode: boolean // 厳密なフィルタリング（100点ルール適用）
  maxResults: number
}

/**
 * フィルタリングサービス - 統合実装
 */
export class FilteringService {
  private config: FilteringConfig
  private cache: Map<string, any>
  private performanceLog: any[]

  constructor(config: Partial<FilteringConfig> = {}) {
    this.config = {
      enableCache: true,
      enablePerformanceLogging: true,
      strictMode: true,
      maxResults: 1000,
      ...config
    }
    
    this.cache = new Map()
    this.performanceLog = []
  }

  // ==========================================================================
  // Stage 1: 投稿タイプによるターゲットフィルタリング
  // ==========================================================================

  /**
   * 投稿タイプに紐づくターゲットを取得
   */
  public filterTargetsByPostType(postType: TypeID): FilterResult<TargetID> {
    const startTime = performance.now()
    const cacheKey = `targets_${postType}`

    try {
      // キャッシュチェック
      if (this.config.enableCache && this.cache.has(cacheKey)) {
        return this.buildFilterResult(
          this.cache.get(cacheKey),
          { postType },
          startTime,
          true
        )
      }

      // 投稿タイプとターゲットの対応マップ（4投稿タイプ×3ターゲット）
      const targetMapping: Record<TypeID, TargetID[]> = {
        '001': ['T001', 'T002', 'T003'], // キャリアの悩み解決法
        '002': ['T004', 'T005', 'T006'], // スキルアップガイド
        '003': ['T007', 'T008', 'T009'], // 業界・企業情報まとめ
        '004': ['T010', 'T011', 'T012']  // 効率アップテクニック
      }

      const targets = targetMapping[postType] || []

      // キャッシュに保存
      if (this.config.enableCache) {
        this.cache.set(cacheKey, targets)
      }

      return this.buildFilterResult(
        targets,
        { postType },
        startTime,
        false
      )

    } catch (error) {
      return this.buildErrorResult(
        'FILTERING_ERROR',
        `Failed to filter targets for post type ${postType}`,
        error,
        startTime
      )
    }
  }

  // ==========================================================================
  // Stage 2: ターゲットによるペルソナフィルタリング
  // ==========================================================================

  /**
   * ターゲットに紐づくペルソナを取得
   */
  public filterPersonasByTarget(target: TargetID): FilterResult<PersonaFilterResult> {
    const startTime = performance.now()
    const cacheKey = `personas_${target}`

    try {
      if (this.config.enableCache && this.cache.has(cacheKey)) {
        return this.buildFilterResult(
          this.cache.get(cacheKey),
          { target },
          startTime,
          true
        )
      }

      const personaResults: PersonaFilterResult[] = []

      // ペルソナデータから該当するものを抽出
      Object.entries(personas).forEach(([personaId, personaData]: [string, any]) => {
        // compatibleThemesからターゲット関連性を判定
        // 実際の実装では、ターゲット-ペルソナの関係マップを使用
        const compatibilityScore = this.calculatePersonaTargetCompatibility(personaData, target)
        
        if (compatibilityScore > 0.5) { // 閾値は調整可能
          personaResults.push({
            personaId,
            personaData,
            compatibilityScore,
            matchingCriteria: this.getPersonaMatchingCriteria(personaData, target)
          })
        }
      })

      // 互換性スコア順でソート
      personaResults.sort((a, b) => b.compatibilityScore - a.compatibilityScore)

      // 結果制限
      const limitedResults = personaResults.slice(0, this.config.maxResults)

      if (this.config.enableCache) {
        this.cache.set(cacheKey, limitedResults)
      }

      return this.buildFilterResult(
        limitedResults,
        { target },
        startTime,
        false
      )

    } catch (error) {
      return this.buildErrorResult(
        'FILTERING_ERROR',
        `Failed to filter personas for target ${target}`,
        error,
        startTime
      )
    }
  }

  // ==========================================================================
  // Stage 3: ペルソナによるナレッジフィルタリング
  // ==========================================================================

  /**
   * フィルタされたペルソナに紐づくナレッジを取得
   */
  public filterKnowledgeByPersonas(personaIds: string[]): FilterResult<KnowledgeFilterResult> {
    const startTime = performance.now()
    const cacheKey = `knowledge_${personaIds.sort().join('_')}`

    try {
      if (this.config.enableCache && this.cache.has(cacheKey)) {
        return this.buildFilterResult(
          this.cache.get(cacheKey),
          { personaIds },
          startTime,
          true
        )
      }

      const knowledgeResults: KnowledgeFilterResult[] = []

      // problemSolutionPairs.json からペルソナに対応するナレッジを抽出
      Object.entries(problemSolutionPairs.pairs).forEach(([knowledgeId, knowledgeData]: [string, any]) => {
        const targetPersona = knowledgeData.targetPersona
        
        if (personaIds.includes(targetPersona)) {
          knowledgeResults.push({
            knowledgeId,
            knowledgeData,
            associatedPersonas: [targetPersona], // 実際は複数ペルソナ対応
            category: knowledgeData.problemCategory,
            compatibilityScore: 1.0 // ペルソナ完全マッチの場合
          })
        }
      })

      // カテゴリ別、スコア順でソート
      knowledgeResults.sort((a, b) => {
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category)
        }
        return b.compatibilityScore - a.compatibilityScore
      })

      const limitedResults = knowledgeResults.slice(0, this.config.maxResults)

      if (this.config.enableCache) {
        this.cache.set(cacheKey, limitedResults)
      }

      return this.buildFilterResult(
        limitedResults,
        { personaIds },
        startTime,
        false
      )

    } catch (error) {
      return this.buildErrorResult(
        'FILTERING_ERROR',
        `Failed to filter knowledge for personas ${personaIds.join(', ')}`,
        error,
        startTime
      )
    }
  }

  // ==========================================================================
  // Stage 4: 投稿タイプによるペルソナ最終フィルタリング
  // ==========================================================================

  /**
   * 投稿タイプによるペルソナの最終フィルタリング
   * 複数ペルソナから投稿タイプに適合するもののみに絞り込み
   */
  public finalFilterPersonasByPostType(
    personas: string[],
    postType: TypeID
  ): FilterResult<PersonaFilterResult> {
    const startTime = performance.now()
    const cacheKey = `final_personas_${personas.sort().join('_')}_${postType}`

    try {
      if (this.config.enableCache && this.cache.has(cacheKey)) {
        return this.buildFilterResult(
          this.cache.get(cacheKey),
          { personas, postType },
          startTime,
          true
        )
      }

      const finalPersonaResults: PersonaFilterResult[] = []

      personas.forEach(personaId => {
        const personaData = (personas as any)[personaId]
        if (!personaData) return

        // 投稿タイプとの互換性チェック
        const compatibilityScore = this.calculatePersonaPostTypeCompatibility(
          personaData,
          postType
        )

        if (this.config.strictMode) {
          // 100点ルール適用：完璧な適合のみ
          if (compatibilityScore === 1.0) {
            finalPersonaResults.push({
              personaId,
              personaData,
              compatibilityScore,
              matchingCriteria: this.getPersonaPostTypeMatchingCriteria(personaData, postType)
            })
          }
        } else {
          // 柔軟モード：閾値以上
          if (compatibilityScore >= 0.7) {
            finalPersonaResults.push({
              personaId,
              personaData,
              compatibilityScore,
              matchingCriteria: this.getPersonaPostTypeMatchingCriteria(personaData, postType)
            })
          }
        }
      })

      // 互換性スコア順でソート
      finalPersonaResults.sort((a, b) => b.compatibilityScore - a.compatibilityScore)

      if (this.config.enableCache) {
        this.cache.set(cacheKey, finalPersonaResults)
      }

      return this.buildFilterResult(
        finalPersonaResults,
        { personas, postType },
        startTime,
        false
      )

    } catch (error) {
      return this.buildErrorResult(
        'FILTERING_ERROR',
        `Failed to final filter personas for post type ${postType}`,
        error,
        startTime
      )
    }
  }

  // ==========================================================================
  // フィルタリング品質チェック・整合性確保
  // ==========================================================================

  /**
   * フィルタリング結果の整合性チェック
   */
  public validateFilteringConsistency(
    postType: TypeID,
    target: TargetID,
    personas: string[],
    knowledge: string[]
  ): { isValid: boolean; errors: FilterError[] } {
    const errors: FilterError[] = []

    try {
      // 1. 投稿タイプ-ターゲット関係の整合性
      const validTargets = this.filterTargetsByPostType(postType).data
      if (!validTargets.includes(target)) {
        errors.push({
          type: 'DATA_CONSISTENCY_ERROR',
          message: `Target ${target} is not compatible with post type ${postType}`,
          details: { postType, target, validTargets }
        })
      }

      // 2. ターゲット-ペルソナ関係の整合性  
      const validPersonas = this.filterPersonasByTarget(target).data.map(p => p.personaId)
      const invalidPersonas = personas.filter(p => !validPersonas.includes(p))
      if (invalidPersonas.length > 0) {
        errors.push({
          type: 'DATA_CONSISTENCY_ERROR',
          message: `Personas ${invalidPersonas.join(', ')} are not compatible with target ${target}`,
          details: { target, invalidPersonas, validPersonas }
        })
      }

      // 3. ペルソナ-ナレッジ関係の整合性
      const validKnowledge = this.filterKnowledgeByPersonas(personas).data.map(k => k.knowledgeId)
      const invalidKnowledge = knowledge.filter(k => !validKnowledge.includes(k))
      if (invalidKnowledge.length > 0) {
        errors.push({
          type: 'DATA_CONSISTENCY_ERROR',
          message: `Knowledge ${invalidKnowledge.join(', ')} are not associated with personas ${personas.join(', ')}`,
          details: { personas, invalidKnowledge, validKnowledge }
        })
      }

      return {
        isValid: errors.length === 0,
        errors
      }

    } catch (error) {
      errors.push({
        type: 'VALIDATION_ERROR',
        message: 'Failed to validate filtering consistency',
        details: error
      })

      return {
        isValid: false,
        errors
      }
    }
  }

  // ==========================================================================
  // ユーティリティ・ヘルパーメソッド
  // ==========================================================================

  /**
   * キャッシュクリア
   */
  public clearCache(): void {
    this.cache.clear()
  }

  /**
   * パフォーマンスログ取得
   */
  public getPerformanceLog(): any[] {
    return [...this.performanceLog]
  }

  /**
   * 設定更新
   */
  public updateConfig(newConfig: Partial<FilteringConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  // ==========================================================================
  // Private Methods
  // ==========================================================================

  private calculatePersonaTargetCompatibility(personaData: any, target: TargetID): number {
    // ペルソナとターゲットの互換性計算
    // 実際の実装では、compatibleThemes、characteristics等を考慮
    // 仮実装：compatibleTypesからの類推
    const compatibleTypes = personaData.compatibleTypes || []
    const targetToTypeMapping: Record<string, TypeID[]> = {
      'T001': ['001'], 'T002': ['001'], 'T003': ['001'],
      'T004': ['002'], 'T005': ['002'], 'T006': ['002'],
      'T007': ['003'], 'T008': ['003'], 'T009': ['003'],
      'T010': ['004'], 'T011': ['004'], 'T012': ['004']
    }
    
    const targetTypes = targetToTypeMapping[target] || []
    const overlap = compatibleTypes.filter((type: string) => targetTypes.includes(type)).length
    
    return overlap > 0 ? 1.0 : 0.0 // 簡易実装
  }

  private calculatePersonaPostTypeCompatibility(personaData: any, postType: TypeID): number {
    // ペルソナと投稿タイプの互換性計算
    const compatibleTypes = personaData.compatibleTypes || []
    return compatibleTypes.includes(postType) ? 1.0 : 0.0
  }

  private getPersonaMatchingCriteria(personaData: any, target: TargetID): string[] {
    // ペルソナとターゲットのマッチング基準を取得
    return personaData.characteristics || []
  }

  private getPersonaPostTypeMatchingCriteria(personaData: any, postType: TypeID): string[] {
    // ペルソナと投稿タイプのマッチング基準を取得
    return personaData.characteristics || []
  }

  private buildFilterResult<T>(
    data: T[],
    criteria: Record<string, any>,
    startTime: number,
    cacheHit: boolean
  ): FilterResult<T> {
    const executionTime = performance.now() - startTime

    if (this.config.enablePerformanceLogging) {
      this.performanceLog.push({
        timestamp: new Date(),
        executionTime,
        cacheHit,
        criteria,
        resultCount: data.length
      })
    }

    return {
      success: true,
      data,
      metadata: {
        totalCount: data.length,
        filteredCount: data.length,
        filterCriteria: criteria,
        timestamp: new Date(),
        performance: {
          executionTime,
          cacheHit
        }
      }
    }
  }

  private buildErrorResult<T>(
    type: FilterError['type'],
    message: string,
    error: any,
    startTime: number
  ): FilterResult<T> {
    const executionTime = performance.now() - startTime

    return {
      success: false,
      data: [],
      metadata: {
        totalCount: 0,
        filteredCount: 0,
        filterCriteria: {},
        timestamp: new Date(),
        performance: {
          executionTime,
          cacheHit: false
        }
      },
      errors: [{
        type,
        message,
        details: error
      }]
    }
  }
}

/**
 * シングルトンインスタンス
 */
let globalFilteringService: FilteringService | null = null

export const getFilteringService = (config?: Partial<FilteringConfig>): FilteringService => {
  if (!globalFilteringService) {
    globalFilteringService = new FilteringService(config)
  }
  return globalFilteringService
}

export const resetFilteringService = (): void => {
  globalFilteringService = null
}