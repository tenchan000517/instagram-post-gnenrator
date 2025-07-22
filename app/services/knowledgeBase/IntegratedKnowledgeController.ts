/**
 * 統合ナレッジコントローラー
 * Phase C1-C3機能の統合とUIからコンテンツ生成までの一貫制御
 * 
 * 統合機能：
 * - KnowledgeBaseSelector（UI）
 * - SimilaritySearchService（AI類似度検索）
 * - RecommendationEngine（推奨システム）
 * - PromptGenerator（プロンプト最適化）
 * - KnowledgeBaseFlowController（フロー管理）
 * - FilteringService（フィルタリング）
 */

import { TypeID, TargetID, ThemeID } from '../../types/knowledgeBase'
import { KnowledgeBaseFlowController, FlowState, FlowResult } from './KnowledgeBaseFlowController'
import { FilteringService, PersonaFilterResult, KnowledgeFilterResult } from './FilteringService'
import { SimilaritySearchService, SimilaritySearchResult } from './SimilaritySearchService'
import { RecommendationEngine, KnowledgeRecommendation } from './RecommendationEngine'

// 統合制御の状態管理
export interface IntegratedControlState {
  // 基本フロー状態
  flowState: FlowState
  
  // UI状態
  uiState: {
    selectedPostType?: TypeID
    selectedTarget?: TargetID
    selectedTheme?: ThemeID
    availableTargets: TargetID[]
    userInput?: string
    isLoading: boolean
    currentStep: string
  }

  // フィルタリング結果
  filteringResults: {
    personas?: PersonaFilterResult[]
    knowledge?: KnowledgeFilterResult[]
    finalPersonas?: PersonaFilterResult[]
  }

  // AI処理結果
  aiResults: {
    similarityResults?: SimilaritySearchResult[]
    recommendations?: KnowledgeRecommendation[]
    selectedKnowledge?: KnowledgeRecommendation
  }

  // 最終生成結果
  finalResult?: {
    pageStructure: any
    templatePattern: string
    persona: string
    generatedContent: any
    optimizedPrompt: string
  }
}

// 統合制御設定
export interface IntegratedControlConfig {
  // フロー制御設定
  enableAutoAdvance: boolean
  enableRollback: boolean
  maxRetries: number
  
  // フィルタリング設定
  strictFiltering: boolean
  maxPersonas: number
  maxKnowledge: number
  
  // AI処理設定
  enableParallelProcessing: boolean
  similarityThreshold: number
  maxRecommendations: number
  
  // UI設定
  enableRealTimeUpdates: boolean
  showDetailedProgress: boolean
}

// 統合イベントリスナー
export interface IntegratedEventListener {
  onStateChange?: (state: IntegratedControlState) => void
  onStepChange?: (currentStep: string, nextStep?: string) => void
  onError?: (error: any) => void
  onComplete?: (result: any) => void
}

/**
 * 統合ナレッジコントローラー
 */
export class IntegratedKnowledgeController {
  private state: IntegratedControlState
  private config: IntegratedControlConfig
  private eventListener?: IntegratedEventListener

  // サービスインスタンス
  private flowController: KnowledgeBaseFlowController
  private filteringService: FilteringService
  private similarityService: SimilaritySearchService
  private recommendationEngine: RecommendationEngine

  constructor(
    config: Partial<IntegratedControlConfig> = {},
    eventListener?: IntegratedEventListener
  ) {
    this.config = {
      enableAutoAdvance: true,
      enableRollback: true,
      maxRetries: 3,
      strictFiltering: true,
      maxPersonas: 50,
      maxKnowledge: 100,
      enableParallelProcessing: true,
      similarityThreshold: 0.4,
      maxRecommendations: 5,
      enableRealTimeUpdates: true,
      showDetailedProgress: true,
      ...config
    }

    this.eventListener = eventListener

    // サービス初期化
    this.flowController = new KnowledgeBaseFlowController({
      enableAutoAdvance: this.config.enableAutoAdvance,
      enableRollback: this.config.enableRollback,
      maxRetries: this.config.maxRetries
    })

    this.filteringService = new FilteringService({
      strictMode: this.config.strictFiltering,
      maxResults: Math.max(this.config.maxPersonas, this.config.maxKnowledge)
    })

    this.similarityService = new SimilaritySearchService()
    this.recommendationEngine = new RecommendationEngine()

    // 状態初期化
    this.initializeState()
  }

  // ==========================================================================
  // 公開API - フロー制御
  // ==========================================================================

  /**
   * Step 1: 投稿タイプ選択
   */
  public async selectPostType(postType: TypeID): Promise<void> {
    try {
      this.updateUIState({ isLoading: true, currentStep: 'POST_TYPE_SELECTION' })

      // フロー制御実行
      const flowResult = await this.flowController.selectPostType(postType)
      if (!flowResult.success) {
        throw new Error(flowResult.error?.message || 'Failed to select post type')
      }

      // ターゲット自動フィルタリング
      const targetFilterResult = this.filteringService.filterTargetsByPostType(postType)
      const availableTargets = targetFilterResult.data

      // UI状態更新
      this.updateUIState({
        selectedPostType: postType,
        availableTargets,
        selectedTarget: undefined,
        selectedTheme: undefined,
        currentStep: 'TARGET_SELECTION',
        isLoading: false
      })

      this.updateFlowState(this.flowController.getCurrentState())
      this.notifyStateChange()

    } catch (error) {
      this.handleError('POST_TYPE_SELECTION', error)
    }
  }

  /**
   * Step 2: ターゲット選択
   */
  public async selectTarget(target: TargetID): Promise<void> {
    try {
      this.updateUIState({ isLoading: true, currentStep: 'TARGET_SELECTION' })

      // フロー制御実行
      const flowResult = await this.flowController.selectTarget(target)
      if (!flowResult.success) {
        throw new Error(flowResult.error?.message || 'Failed to select target')
      }

      // ペルソナ自動フィルタリング実行
      await this.executePersonaFiltering(target)

      // UI状態更新
      this.updateUIState({
        selectedTarget: target,
        selectedTheme: undefined,
        currentStep: 'THEME_SELECTION',
        isLoading: false
      })

      this.notifyStateChange()

    } catch (error) {
      this.handleError('TARGET_SELECTION', error)
    }
  }

  /**
   * Step 3: テーマ選択（オプショナル）
   */
  public async selectTheme(theme: ThemeID): Promise<void> {
    try {
      this.updateUIState({ 
        selectedTheme: theme, 
        currentStep: 'USER_INPUT' 
      })

      this.notifyStateChange()

    } catch (error) {
      this.handleError('THEME_SELECTION', error)
    }
  }

  /**
   * Step 4: ユーザー入力とAI処理の実行
   */
  public async processUserInput(userInput: string): Promise<void> {
    try {
      this.updateUIState({ isLoading: true, currentStep: 'AI_PROCESSING' })

      // フロー制御: ユーザー入力投入
      const inputResult = await this.flowController.submitUserInput(userInput)
      if (!inputResult.success) {
        throw new Error(inputResult.error?.message || 'Failed to submit user input')
      }

      // 並列処理設定に応じてAI処理を実行
      if (this.config.enableParallelProcessing) {
        await this.executeParallelAIProcessing()
      } else {
        await this.executeSequentialAIProcessing()
      }

      this.updateUIState({
        userInput,
        currentStep: 'KNOWLEDGE_SELECTION',
        isLoading: false
      })

      this.notifyStateChange()

    } catch (error) {
      this.handleError('AI_PROCESSING', error)
    }
  }

  /**
   * Step 5: ナレッジ選択と最終確定
   */
  public async selectKnowledge(knowledgeId: string): Promise<void> {
    try {
      this.updateUIState({ isLoading: true, currentStep: 'FINAL_GENERATION' })

      // フロー制御: ナレッジ選択
      const selectionResult = await this.flowController.selectKnowledge(knowledgeId)
      if (!selectionResult.success) {
        throw new Error(selectionResult.error?.message || 'Failed to select knowledge')
      }

      // 最終処理実行
      await this.executeFinalProcessing()

      this.updateUIState({
        currentStep: 'COMPLETED',
        isLoading: false
      })

      this.notifyComplete()

    } catch (error) {
      this.handleError('FINAL_GENERATION', error)
    }
  }

  // ==========================================================================
  // フロー制御操作
  // ==========================================================================

  /**
   * フローのロールバック
   */
  public async rollbackToStep(step: string): Promise<void> {
    try {
      const flowStep = this.mapUIStepToFlowStep(step)
      const rollbackResult = this.flowController.rollbackToStep(flowStep)
      
      if (!rollbackResult.success) {
        throw new Error(rollbackResult.error?.message || 'Failed to rollback')
      }

      // 状態をクリア
      this.clearStateFromStep(step)
      
      this.updateUIState({
        currentStep: step,
        isLoading: false
      })

      this.notifyStateChange()

    } catch (error) {
      this.handleError('ROLLBACK', error)
    }
  }

  /**
   * フローのリセット
   */
  public resetFlow(): void {
    this.flowController.initialize()
    this.initializeState()
    this.notifyStateChange()
  }

  // ==========================================================================
  // 状態アクセサ
  // ==========================================================================

  /**
   * 現在の状態取得
   */
  public getCurrentState(): IntegratedControlState {
    return { ...this.state }
  }

  /**
   * フロー完了チェック
   */
  public isFlowComplete(): boolean {
    return this.state.finalResult !== undefined
  }

  /**
   * 利用可能なターゲット取得
   */
  public getAvailableTargets(): TargetID[] {
    return this.state.uiState.availableTargets
  }

  /**
   * AI推奨結果取得
   */
  public getRecommendations(): KnowledgeRecommendation[] {
    return this.state.aiResults.recommendations || []
  }

  // ==========================================================================
  // Private Methods - フロー実行
  // ==========================================================================

  private async executePersonaFiltering(target: TargetID): Promise<void> {
    // Step 3: ペルソナ自動フィルタリング実行
    const flowResult = await this.flowController.executePersonaFiltering()
    if (!flowResult.success) {
      throw new Error('Failed to execute persona filtering')
    }

    // フィルタリングサービスで詳細結果取得
    const personaResult = this.filteringService.filterPersonasByTarget(target)
    if (!personaResult.success) {
      throw new Error('Failed to filter personas by target')
    }

    this.state.filteringResults.personas = personaResult.data

    // Step 4: ナレッジ自動フィルタリング実行  
    const knowledgeFlowResult = await this.flowController.executeKnowledgeFiltering()
    if (!knowledgeFlowResult.success) {
      throw new Error('Failed to execute knowledge filtering')
    }

    const personaIds = personaResult.data.map(p => p.personaId)
    const knowledgeResult = this.filteringService.filterKnowledgeByPersonas(personaIds)
    if (!knowledgeResult.success) {
      throw new Error('Failed to filter knowledge by personas')
    }

    this.state.filteringResults.knowledge = knowledgeResult.data
  }

  private async executeParallelAIProcessing(): Promise<void> {
    // 並列AI処理実行
    const [similarityResult, flowResult] = await Promise.all([
      // AI類似度検索
      this.similarityService.searchSimilar(
        this.state.uiState.userInput!,
        this.state.filteringResults.knowledge || []
      ),
      // フロー制御: 類似度検索実行
      this.flowController.executeSimilaritySearch()
    ])

    if (!flowResult.success) {
      throw new Error('Failed to execute similarity search in flow')
    }

    // 推奨エンジンで結果統合・優先順位決定
    const recommendations = await this.recommendationEngine.generateRecommendations(
      similarityResult,
      {
        postType: this.state.uiState.selectedPostType!,
        target: this.state.uiState.selectedTarget!,
        userInput: this.state.uiState.userInput!
      }
    )

    this.state.aiResults.similarityResults = similarityResult
    this.state.aiResults.recommendations = recommendations
  }

  private async executeSequentialAIProcessing(): Promise<void> {
    // 順次AI処理実行
    const flowResult = await this.flowController.executeSimilaritySearch()
    if (!flowResult.success) {
      throw new Error('Failed to execute similarity search')
    }

    // 結果取得・処理
    const flowState = this.flowController.getCurrentState()
    this.state.aiResults.recommendations = flowState.data.similarityResults || []
  }

  private async executeFinalProcessing(): Promise<void> {
    // Step 8: 投稿タイプによるペルソナ最終フィルタリング
    const finalFilteringResult = await this.flowController.executeFinalPersonaFiltering()
    if (!finalFilteringResult.success) {
      throw new Error('Failed to execute final persona filtering')
    }

    // Step 9: 3要素同時確定
    const finalResult = await this.flowController.executeFinalDetermination()
    if (!finalResult.success) {
      throw new Error('Failed to execute final determination')
    }

    // 最終結果設定
    const finalData = finalResult.data!
    this.state.finalResult = {
      pageStructure: finalData.pageStructure,
      templatePattern: finalData.templatePattern,
      persona: finalData.finalPersona,
      generatedContent: finalData.generatedContent,
      optimizedPrompt: 'Generated with integrated prompt optimization' // 実装要
    }
  }

  // ==========================================================================
  // Private Methods - 状態管理
  // ==========================================================================

  private initializeState(): void {
    this.state = {
      flowState: this.flowController.getCurrentState(),
      uiState: {
        availableTargets: [],
        isLoading: false,
        currentStep: 'POST_TYPE_SELECTION'
      },
      filteringResults: {},
      aiResults: {}
    }
  }

  private updateUIState(updates: Partial<IntegratedControlState['uiState']>): void {
    this.state.uiState = { ...this.state.uiState, ...updates }
  }

  private updateFlowState(flowState: FlowState): void {
    this.state.flowState = flowState
  }

  private clearStateFromStep(step: string): void {
    switch (step) {
      case 'POST_TYPE_SELECTION':
        this.state.uiState.selectedPostType = undefined
        // fallthrough
      case 'TARGET_SELECTION':
        this.state.uiState.selectedTarget = undefined
        this.state.uiState.availableTargets = []
        this.state.filteringResults.personas = undefined
        this.state.filteringResults.knowledge = undefined
        // fallthrough
      case 'THEME_SELECTION':
        this.state.uiState.selectedTheme = undefined
        // fallthrough
      case 'USER_INPUT':
        this.state.uiState.userInput = undefined
        this.state.aiResults = {}
        // fallthrough
      case 'KNOWLEDGE_SELECTION':
        this.state.finalResult = undefined
        break
    }
  }

  private mapUIStepToFlowStep(uiStep: string): any {
    const mapping: Record<string, any> = {
      'POST_TYPE_SELECTION': 'POST_TYPE_SELECTION',
      'TARGET_SELECTION': 'TARGET_SELECTION',
      'THEME_SELECTION': 'PERSONA_FILTERING',
      'USER_INPUT': 'USER_INPUT',
      'AI_PROCESSING': 'SIMILARITY_SEARCH',
      'KNOWLEDGE_SELECTION': 'KNOWLEDGE_SELECTION',
      'FINAL_GENERATION': 'FINAL_DETERMINATION'
    }
    return mapping[uiStep]
  }

  private handleError(step: string, error: any): void {
    console.error(`Error in step ${step}:`, error)
    
    this.state.uiState.isLoading = false
    
    if (this.eventListener?.onError) {
      this.eventListener.onError({ step, error })
    }
  }

  private notifyStateChange(): void {
    if (this.eventListener?.onStateChange) {
      this.eventListener.onStateChange(this.state)
    }
  }

  private notifyComplete(): void {
    if (this.eventListener?.onComplete) {
      this.eventListener.onComplete(this.state.finalResult)
    }
  }
}

/**
 * シングルトンインスタンス（グローバル状態管理）
 */
let globalIntegratedController: IntegratedKnowledgeController | null = null

export const getIntegratedController = (
  config?: Partial<IntegratedControlConfig>,
  eventListener?: IntegratedEventListener
): IntegratedKnowledgeController => {
  if (!globalIntegratedController) {
    globalIntegratedController = new IntegratedKnowledgeController(config, eventListener)
  }
  return globalIntegratedController
}

export const resetIntegratedController = (): void => {
  globalIntegratedController = null
}