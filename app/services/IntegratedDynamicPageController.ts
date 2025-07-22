/**
 * IntegratedDynamicPageController.ts
 * 
 * Phase C5: 既存システムと動的システムの統合コントローラー
 * 
 * 統合方針：
 * - 既存PageStructureAnalyzer.tsとの互換性維持
 * - 段階的移行による安全性確保
 * - 動的システム vs 固定システムの適切な使い分け
 * - フィーチャーフラグによる制御可能な切り替え
 * 
 * 設計思想：
 * - 既存システムの完全機能保持
 * - 新システムの段階的導入
 * - パフォーマンス・品質の比較測定
 * - ユーザー体験の継続性保証
 */

import { PageStructure, PremiumTemplateType } from '../types/pageStructure'
import { KnowledgeBaseParams } from '../types/knowledgeBase'
import { PageStructureAnalyzer } from './pageStructureAnalyzer'
import { KnowledgeStructureAnalyzer, DynamicStructureDecision } from './KnowledgeStructureAnalyzer'
import { DynamicTemplateGenerator, DynamicTemplateGeneration, ContentMapping } from './DynamicTemplateGenerator'
import { StructurePreservationValidator, StructurePreservationResult } from './StructurePreservationValidator'

/**
 * システム統合設定
 */
export interface IntegrationConfig {
  // フィーチャーフラグ
  enableDynamicSystem: boolean
  enableHybridMode: boolean
  enablePerformanceComparison: boolean
  
  // 段階的移行制御
  dynamicSystemRolloutPercentage: number  // 0-100
  hybridFallbackEnabled: boolean
  qualityThresholdForDynamic: number      // 動的システム適用の最低品質閾値
  
  // パフォーマンス制御
  dynamicSystemTimeout: number           // ms
  staticSystemFallbackTimeout: number    // ms
  
  // ログ・分析制御
  enableDetailedLogging: boolean
  enablePerformanceMetrics: boolean
  enableQualityComparison: boolean
}

/**
 * システム統合結果
 */
export interface IntegratedSystemResult {
  // 結果データ
  pages: PageStructure[]
  systemUsed: 'static' | 'dynamic' | 'hybrid'
  
  // パフォーマンス情報
  processingTime: number
  staticSystemTime?: number
  dynamicSystemTime?: number
  
  // 品質情報
  qualityScore?: number
  validationResult?: StructurePreservationResult
  
  // システム比較情報
  comparisonData?: SystemComparisonData
  
  // メタデータ
  processedAt: string
  configUsed: IntegrationConfig
}

/**
 * システム比較データ
 */
export interface SystemComparisonData {
  staticSystem: {
    processingTime: number
    pageCount: number
    templateVariety: number
    estimatedQuality: number
  }
  
  dynamicSystem: {
    processingTime: number
    pageCount: number
    structurePreservationScore: number
    qualityScore: number
    perfectMatchDetected: boolean
  }
  
  recommendation: 'use-static' | 'use-dynamic' | 'use-hybrid'
  reasoning: string
}

/**
 * 統合動的ページコントローラー
 * 
 * 主要機能：
 * 1. 既存システムと動的システムの統合制御
 * 2. フィーチャーフラグによる段階的移行
 * 3. パフォーマンス・品質比較
 * 4. ハイブリッドモード（フォールバック付き）
 * 5. 統合品質保証
 */
export class IntegratedDynamicPageController {
  
  private staticAnalyzer: PageStructureAnalyzer
  private knowledgeAnalyzer: KnowledgeStructureAnalyzer
  private dynamicGenerator: DynamicTemplateGenerator
  private qualityValidator: StructurePreservationValidator
  
  private config: IntegrationConfig
  
  constructor(config?: Partial<IntegrationConfig>) {
    this.staticAnalyzer = new PageStructureAnalyzer()
    this.knowledgeAnalyzer = new KnowledgeStructureAnalyzer()
    this.dynamicGenerator = new DynamicTemplateGenerator()
    this.qualityValidator = new StructurePreservationValidator()
    
    // デフォルト設定
    this.config = {
      enableDynamicSystem: true,
      enableHybridMode: true,
      enablePerformanceComparison: true,
      dynamicSystemRolloutPercentage: 50,  // 50%の段階的導入
      hybridFallbackEnabled: true,
      qualityThresholdForDynamic: 80,
      dynamicSystemTimeout: 10000,         // 10秒
      staticSystemFallbackTimeout: 5000,   // 5秒
      enableDetailedLogging: true,
      enablePerformanceMetrics: true,
      enableQualityComparison: true,
      ...config
    }
    
    console.log('🔧 統合動的ページコントローラー初期化完了:', this.config)
  }
  
  /**
   * メイン処理：統合システムによるページ構造分析
   * 
   * @param input ユーザー入力
   * @param knowledgeBaseParams ナレッジベースパラメータ
   * @returns 統合システム結果
   */
  public async analyzePageStructureIntegrated(
    input: string,
    knowledgeBaseParams?: KnowledgeBaseParams
  ): Promise<IntegratedSystemResult> {
    console.log('🚀 統合システム分析開始:', {
      dynamicEnabled: this.config.enableDynamicSystem,
      hybridMode: this.config.enableHybridMode,
      rollout: this.config.dynamicSystemRolloutPercentage + '%'
    })
    
    const startTime = Date.now()
    
    try {
      // Step 1: システム選択決定
      const systemDecision = this.decideSystemUsage(input, knowledgeBaseParams)
      console.log('📋 システム選択決定:', systemDecision)
      
      // Step 2: 選択されたシステムでの処理実行
      switch (systemDecision) {
        case 'static':
          return await this.executeStaticSystem(input, knowledgeBaseParams, startTime)
          
        case 'dynamic':
          return await this.executeDynamicSystem(input, knowledgeBaseParams, startTime)
          
        case 'hybrid':
          return await this.executeHybridSystem(input, knowledgeBaseParams, startTime)
          
        default:
          throw new Error(`未知のシステム選択: ${systemDecision}`)
      }
      
    } catch (error) {
      console.error('❌ 統合システム分析エラー:', error)
      
      // エラー時はフォールバック処理
      if (this.config.hybridFallbackEnabled) {
        console.log('🔄 フォールバック処理開始...')
        return await this.executeFallbackSystem(input, knowledgeBaseParams, startTime)
      }
      
      throw error
    }
  }
  
  /**
   * システム使用決定ロジック
   */
  private decideSystemUsage(
    input: string,
    knowledgeBaseParams?: KnowledgeBaseParams
  ): 'static' | 'dynamic' | 'hybrid' {
    // ナレッジベース明示的選択がある場合は動的システム優先
    if (knowledgeBaseParams?.useKnowledgeBase && 
        knowledgeBaseParams.typeId && 
        knowledgeBaseParams.targetId && 
        knowledgeBaseParams.themeId) {
      
      if (this.config.enableDynamicSystem) {
        return this.config.enableHybridMode ? 'hybrid' : 'dynamic'
      }
    }
    
    // 動的システムが無効な場合は静的システム
    if (!this.config.enableDynamicSystem) {
      return 'static'
    }
    
    // 段階的導入制御
    const rolloutDecision = Math.random() * 100 < this.config.dynamicSystemRolloutPercentage
    
    if (rolloutDecision) {
      return this.config.enableHybridMode ? 'hybrid' : 'dynamic'
    }
    
    return 'static'
  }
  
  /**
   * 静的システム実行
   */
  private async executeStaticSystem(
    input: string,
    knowledgeBaseParams?: KnowledgeBaseParams,
    startTime: number
  ): Promise<IntegratedSystemResult> {
    console.log('📊 静的システム実行')
    
    const staticStartTime = Date.now()
    
    const pages = await this.staticAnalyzer.analyzePageStructureAndTemplates(
      input,
      knowledgeBaseParams
    )
    
    const staticSystemTime = Date.now() - staticStartTime
    const totalTime = Date.now() - startTime
    
    return {
      pages,
      systemUsed: 'static',
      processingTime: totalTime,
      staticSystemTime,
      processedAt: new Date().toISOString(),
      configUsed: this.config
    }
  }
  
  /**
   * 動的システム実行
   */
  private async executeDynamicSystem(
    input: string,
    knowledgeBaseParams?: KnowledgeBaseParams,
    startTime: number
  ): Promise<IntegratedSystemResult> {
    console.log('🎯 動的システム実行')
    
    const dynamicStartTime = Date.now()
    
    try {
      // Step 1: ナレッジ構造分析
      const knowledgeContent = await this.extractKnowledgeContent(knowledgeBaseParams)
      const structureDecision = await this.knowledgeAnalyzer.analyzeKnowledgeStructure(
        knowledgeContent,
        input
      )
      
      // Step 2: 動的テンプレート生成
      const contentMapping: ContentMapping = {
        knowledgeContent,
        userInput: input,
        structureDecision,
        contentExtractionRules: this.generateExtractionRules(knowledgeBaseParams)
      }
      
      const dynamicGeneration = await this.dynamicGenerator.generateDynamicTemplate(
        structureDecision,
        contentMapping
      )
      
      // Step 3: 品質検証
      const validationResult = await this.qualityValidator.validateStructurePreservation(
        dynamicGeneration,
        structureDecision,
        knowledgeContent
      )
      
      // Step 4: 品質閾値チェック
      if (validationResult.overallScore < this.config.qualityThresholdForDynamic) {
        console.log('⚠️ 品質閾値未達、静的システムにフォールバック')
        return await this.executeFallbackSystem(input, knowledgeBaseParams, startTime)
      }
      
      // Step 5: PageStructure形式に変換
      const pages = this.convertDynamicPagesToPageStructures(dynamicGeneration)
      
      const dynamicSystemTime = Date.now() - dynamicStartTime
      const totalTime = Date.now() - startTime
      
      return {
        pages,
        systemUsed: 'dynamic',
        processingTime: totalTime,
        dynamicSystemTime,
        qualityScore: validationResult.overallScore,
        validationResult,
        processedAt: new Date().toISOString(),
        configUsed: this.config
      }
      
    } catch (error) {
      console.error('❌ 動的システム実行エラー:', error)
      
      if (this.config.hybridFallbackEnabled) {
        return await this.executeFallbackSystem(input, knowledgeBaseParams, startTime)
      }
      
      throw error
    }
  }
  
  /**
   * ハイブリッドシステム実行
   * 両システムを並行実行し、品質比較後に最適な結果を選択
   */
  private async executeHybridSystem(
    input: string,
    knowledgeBaseParams?: KnowledgeBaseParams,
    startTime: number
  ): Promise<IntegratedSystemResult> {
    console.log('🔀 ハイブリッドシステム実行')
    
    try {
      // 両システムを並行実行（タイムアウト制御付き）
      const [staticResult, dynamicResult] = await Promise.allSettled([
        this.executeSystemWithTimeout('static', input, knowledgeBaseParams, startTime),
        this.executeSystemWithTimeout('dynamic', input, knowledgeBaseParams, startTime)
      ])
      
      // 結果の評価・選択
      const bestResult = this.selectBestResult(staticResult, dynamicResult)
      
      // 比較データの生成
      if (this.config.enableQualityComparison) {
        bestResult.comparisonData = this.generateComparisonData(staticResult, dynamicResult)
      }
      
      bestResult.systemUsed = 'hybrid'
      bestResult.processedAt = new Date().toISOString()
      bestResult.configUsed = this.config
      
      return bestResult
      
    } catch (error) {
      console.error('❌ ハイブリッドシステム実行エラー:', error)
      return await this.executeFallbackSystem(input, knowledgeBaseParams, startTime)
    }
  }
  
  /**
   * タイムアウト制御付きシステム実行
   */
  private async executeSystemWithTimeout(
    systemType: 'static' | 'dynamic',
    input: string,
    knowledgeBaseParams?: KnowledgeBaseParams,
    startTime: number
  ): Promise<IntegratedSystemResult> {
    const timeout = systemType === 'dynamic' ? 
      this.config.dynamicSystemTimeout : 
      this.config.staticSystemFallbackTimeout
    
    return Promise.race([
      systemType === 'static' ? 
        this.executeStaticSystem(input, knowledgeBaseParams, startTime) :
        this.executeDynamicSystem(input, knowledgeBaseParams, startTime),
      
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error(`${systemType}システムタイムアウト`)), timeout)
      )
    ])
  }
  
  /**
   * 最適結果選択ロジック
   */
  private selectBestResult(
    staticResult: PromiseSettledResult<IntegratedSystemResult>,
    dynamicResult: PromiseSettledResult<IntegratedSystemResult>
  ): IntegratedSystemResult {
    // 動的システム成功 & 高品質の場合は動的を選択
    if (dynamicResult.status === 'fulfilled' && 
        dynamicResult.value.qualityScore && 
        dynamicResult.value.qualityScore >= this.config.qualityThresholdForDynamic) {
      console.log('✨ 動的システム結果採用 (品質:', dynamicResult.value.qualityScore, '点)')
      return dynamicResult.value
    }
    
    // 静的システム成功の場合は静的を選択
    if (staticResult.status === 'fulfilled') {
      console.log('📊 静的システム結果採用 (フォールバック)')
      return staticResult.value
    }
    
    // 両方失敗の場合は例外
    throw new Error('両システムとも実行に失敗しました')
  }
  
  /**
   * フォールバックシステム実行
   */
  private async executeFallbackSystem(
    input: string,
    knowledgeBaseParams?: KnowledgeBaseParams,
    startTime: number
  ): Promise<IntegratedSystemResult> {
    console.log('🆘 フォールバックシステム実行')
    
    try {
      return await this.executeStaticSystem(input, knowledgeBaseParams, startTime)
    } catch (error) {
      console.error('❌ フォールバックシステムも失敗:', error)
      
      // 最終的なフォールバック - 基本的なPageStructureを返す
      return {
        pages: this.generateEmergencyFallbackPages(input),
        systemUsed: 'static',
        processingTime: Date.now() - startTime,
        processedAt: new Date().toISOString(),
        configUsed: this.config
      }
    }
  }
  
  /**
   * 緊急フォールバックページ生成
   */
  private generateEmergencyFallbackPages(input: string): PageStructure[] {
    return [
      {
        概要: 'システム障害時の緊急対応ページ',
        有益性: 'ユーザー入力に基づく基本的なコンテンツ提供',
        template: 'title-description-only' as PremiumTemplateType,
        title: '緊急対応コンテンツ',
        theme: `入力内容: ${input.slice(0, 200)}${input.length > 200 ? '...' : ''}`
      }
    ]
  }
  
  /**
   * ナレッジコンテンツ抽出
   */
  private async extractKnowledgeContent(knowledgeBaseParams?: KnowledgeBaseParams): Promise<any> {
    if (!knowledgeBaseParams?.useKnowledgeBase) {
      return null
    }
    
    // 実際のナレッジベースからコンテンツを取得
    // ここでは簡略化した実装
    return {
      id: `${knowledgeBaseParams.typeId}-${knowledgeBaseParams.targetId}-${knowledgeBaseParams.themeId}`,
      solutionContent: 'サンプルソリューションコンテンツ',
      problemType: 'キャリア悩み',
      targetPersona: knowledgeBaseParams.targetId
    }
  }
  
  /**
   * 抽出ルール生成
   */
  private generateExtractionRules(knowledgeBaseParams?: KnowledgeBaseParams): any[] {
    return [
      {
        field: 'title',
        pattern: /^[^。]+/,
        fallback: 'デフォルトタイトル',
        required: true
      },
      {
        field: 'content',
        pattern: /。.+/,
        fallback: 'デフォルトコンテンツ',
        required: true
      }
    ]
  }
  
  /**
   * 動的ページをPageStructure形式に変換
   */
  private convertDynamicPagesToPageStructures(generation: DynamicTemplateGeneration): PageStructure[] {
    return generation.pages.map(page => ({
      概要: page.概要,
      有益性: page.有益性,
      template: page.template,
      title: page.title,
      theme: page.theme,
      // 動的システム固有情報は除外（PageStructure互換性のため）
    }))
  }
  
  /**
   * システム比較データ生成
   */
  private generateComparisonData(
    staticResult: PromiseSettledResult<IntegratedSystemResult>,
    dynamicResult: PromiseSettledResult<IntegratedSystemResult>
  ): SystemComparisonData {
    const staticData = staticResult.status === 'fulfilled' ? staticResult.value : null
    const dynamicData = dynamicResult.status === 'fulfilled' ? dynamicResult.value : null
    
    return {
      staticSystem: {
        processingTime: staticData?.staticSystemTime || -1,
        pageCount: staticData?.pages.length || 0,
        templateVariety: this.calculateTemplateVariety(staticData?.pages || []),
        estimatedQuality: 75 // 静的システムの推定品質
      },
      dynamicSystem: {
        processingTime: dynamicData?.dynamicSystemTime || -1,
        pageCount: dynamicData?.pages.length || 0,
        structurePreservationScore: dynamicData?.validationResult?.structuralIntegrity.score || 0,
        qualityScore: dynamicData?.qualityScore || 0,
        perfectMatchDetected: (dynamicData?.qualityScore || 0) >= 98
      },
      recommendation: this.generateSystemRecommendation(staticData, dynamicData),
      reasoning: this.generateRecommendationReasoning(staticData, dynamicData)
    }
  }
  
  /**
   * テンプレート多様性計算
   */
  private calculateTemplateVariety(pages: PageStructure[]): number {
    const uniqueTemplates = new Set(pages.map(p => p.template))
    return uniqueTemplates.size
  }
  
  /**
   * システム推奨生成
   */
  private generateSystemRecommendation(
    staticData: IntegratedSystemResult | null,
    dynamicData: IntegratedSystemResult | null
  ): 'use-static' | 'use-dynamic' | 'use-hybrid' {
    if (!dynamicData) return 'use-static'
    if (!staticData) return 'use-dynamic'
    
    // 品質重視の判定
    if ((dynamicData.qualityScore || 0) >= 90) {
      return 'use-dynamic'
    }
    
    // パフォーマンス重視の判定
    if ((staticData.processingTime || 0) < (dynamicData.processingTime || 0) * 0.5) {
      return 'use-static'
    }
    
    return 'use-hybrid'
  }
  
  /**
   * 推奨理由生成
   */
  private generateRecommendationReasoning(
    staticData: IntegratedSystemResult | null,
    dynamicData: IntegratedSystemResult | null
  ): string {
    if (!dynamicData) return '動的システム実行失敗のため静的システムを推奨'
    if (!staticData) return '静的システム実行失敗のため動的システムを推奨'
    
    const qualityDiff = (dynamicData.qualityScore || 0) - 75
    const timeDiff = (dynamicData.processingTime || 0) - (staticData.processingTime || 0)
    
    return `品質差: ${qualityDiff}点, 時間差: ${timeDiff}ms に基づく推奨`
  }
  
  /**
   * 設定更新メソッド
   */
  public updateConfig(newConfig: Partial<IntegrationConfig>): void {
    this.config = { ...this.config, ...newConfig }
    console.log('🔧 統合システム設定更新:', this.config)
  }
  
  /**
   * 統計情報取得
   */
  public getSystemStatistics(): any {
    return {
      config: this.config,
      initialized: new Date().toISOString()
    }
  }
}