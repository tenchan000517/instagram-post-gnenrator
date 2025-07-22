/**
 * ナレッジベース生成フローの統合コントローラー
 * 確定フローの9段階を統合管理
 * 
 * 【確定フロー】
 * 1. 投稿タイプ選択（4種類）
 * 2. ターゲット選択（選択投稿タイプに紐づく3ターゲット）
 * 3. ペルソナ自動フィルタリング（選択ターゲットに紐づくペルソナ群）
 * 4. ナレッジ自動フィルタリング（フィルタされたペルソナに紐づくナレッジ群）
 * 5. ユーザー入力投入
 * 6. AI類似度検索（フィルタされたナレッジ群 vs ユーザー入力）
 * 7. 最適ナレッジ選択（AIスコア付き推奨からユーザー選択）
 * 8. 投稿タイプによるペルソナフィルタリング
 * 9. 3要素同時確定（ページ構成・テンプレート・最終ペルソナ・コンテンツ）
 */

import { TypeID, TargetID, ThemeID } from '../../types/knowledgeBase'
import { SimilaritySearchService } from './SimilaritySearchService'
import { RecommendationEngine } from './RecommendationEngine'

// フロー状態管理の型定義
export interface FlowState {
  currentStep: FlowStep
  completedSteps: FlowStep[]
  data: FlowData
  errors: FlowError[]
  isLoading: boolean
}

export type FlowStep = 
  | 'POST_TYPE_SELECTION'
  | 'TARGET_SELECTION'
  | 'PERSONA_FILTERING'
  | 'KNOWLEDGE_FILTERING'
  | 'USER_INPUT'
  | 'SIMILARITY_SEARCH'
  | 'KNOWLEDGE_SELECTION'
  | 'PERSONA_FINAL_FILTERING'
  | 'FINAL_DETERMINATION'

export interface FlowData {
  // Step 1-2: 選択データ
  selectedPostType?: TypeID
  selectedTarget?: TargetID
  selectedTheme?: ThemeID
  
  // Step 3-4: フィルタリング結果
  filteredPersonas?: string[]
  filteredKnowledge?: any[]
  
  // Step 5: ユーザー入力
  userInput?: string
  
  // Step 6-7: AI検索・選択結果
  similarityResults?: any[]
  selectedKnowledge?: any
  
  // Step 8: 最終フィルタリング
  finalPersonas?: string[]
  
  // Step 9: 最終確定データ
  pageStructure?: any
  templatePattern?: string
  finalPersona?: string
  generatedContent?: any
}

export interface FlowError {
  step: FlowStep
  message: string
  details?: any
  timestamp: Date
}

// フロー結果の型定義
export interface FlowResult {
  success: boolean
  data?: FlowData
  error?: FlowError
  nextStep?: FlowStep
}

// フロー設定の型定義
export interface FlowConfig {
  enableAutoAdvance: boolean
  enableRollback: boolean
  maxRetries: number
  timeoutMs: number
}

/**
 * ナレッジベース生成フローの統合コントローラー
 */
export class KnowledgeBaseFlowController {
  private state: FlowState
  private config: FlowConfig
  private similarityService: SimilaritySearchService
  private recommendationEngine: RecommendationEngine

  constructor(config: Partial<FlowConfig> = {}) {
    this.config = {
      enableAutoAdvance: false,
      enableRollback: true,
      maxRetries: 3,
      timeoutMs: 30000,
      ...config
    }

    this.state = {
      currentStep: 'POST_TYPE_SELECTION',
      completedSteps: [],
      data: {},
      errors: [],
      isLoading: false
    }

    this.similarityService = new SimilaritySearchService()
    this.recommendationEngine = new RecommendationEngine()
  }

  /**
   * フローの初期化
   */
  public initialize(): void {
    this.state = {
      currentStep: 'POST_TYPE_SELECTION',
      completedSteps: [],
      data: {},
      errors: [],
      isLoading: false
    }
  }

  /**
   * Step 1: 投稿タイプ選択
   */
  public async selectPostType(postType: TypeID): Promise<FlowResult> {
    try {
      this.state.isLoading = true
      
      // 投稿タイプの妥当性チェック
      if (!this.validatePostType(postType)) {
        throw new Error(`Invalid post type: ${postType}`)
      }

      this.state.data.selectedPostType = postType
      
      return this.advanceToStep('TARGET_SELECTION')
      
    } catch (error) {
      return this.handleError('POST_TYPE_SELECTION', error as Error)
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * Step 2: ターゲット選択
   */
  public async selectTarget(target: TargetID): Promise<FlowResult> {
    try {
      this.state.isLoading = true

      // ターゲットと投稿タイプの互換性チェック
      if (!this.validateTargetCompatibility(this.state.data.selectedPostType!, target)) {
        throw new Error(`Target ${target} is not compatible with post type ${this.state.data.selectedPostType}`)
      }

      this.state.data.selectedTarget = target

      return this.advanceToStep('PERSONA_FILTERING')

    } catch (error) {
      return this.handleError('TARGET_SELECTION', error as Error)
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * Step 3: ペルソナ自動フィルタリング
   */
  public async executePersonaFiltering(): Promise<FlowResult> {
    try {
      this.state.isLoading = true

      const filteredPersonas = await this.filterPersonasByTarget(
        this.state.data.selectedTarget!
      )

      this.state.data.filteredPersonas = filteredPersonas

      return this.advanceToStep('KNOWLEDGE_FILTERING')

    } catch (error) {
      return this.handleError('PERSONA_FILTERING', error as Error)
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * Step 4: ナレッジ自動フィルタリング
   */
  public async executeKnowledgeFiltering(): Promise<FlowResult> {
    try {
      this.state.isLoading = true

      const filteredKnowledge = await this.filterKnowledgeByPersonas(
        this.state.data.filteredPersonas!
      )

      this.state.data.filteredKnowledge = filteredKnowledge

      return this.advanceToStep('USER_INPUT')

    } catch (error) {
      return this.handleError('KNOWLEDGE_FILTERING', error as Error)
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * Step 5: ユーザー入力投入
   */
  public async submitUserInput(input: string): Promise<FlowResult> {
    try {
      this.state.isLoading = true

      if (!input || input.trim().length === 0) {
        throw new Error('User input is required')
      }

      this.state.data.userInput = input

      return this.advanceToStep('SIMILARITY_SEARCH')

    } catch (error) {
      return this.handleError('USER_INPUT', error as Error)
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * Step 6: AI類似度検索
   */
  public async executeSimilaritySearch(): Promise<FlowResult> {
    try {
      this.state.isLoading = true

      const searchResults = await this.similarityService.searchSimilar(
        this.state.data.userInput!,
        this.state.data.filteredKnowledge!
      )

      // 推奨エンジンでスコア付け・順位付け
      const recommendations = await this.recommendationEngine.generateRecommendations(
        searchResults,
        {
          postType: this.state.data.selectedPostType!,
          target: this.state.data.selectedTarget!,
          userInput: this.state.data.userInput!
        }
      )

      this.state.data.similarityResults = recommendations

      return this.advanceToStep('KNOWLEDGE_SELECTION')

    } catch (error) {
      return this.handleError('SIMILARITY_SEARCH', error as Error)
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * Step 7: 最適ナレッジ選択
   */
  public async selectKnowledge(knowledgeId: string): Promise<FlowResult> {
    try {
      this.state.isLoading = true

      const selectedKnowledge = this.state.data.similarityResults?.find(
        item => item.knowledgeId === knowledgeId
      )

      if (!selectedKnowledge) {
        throw new Error(`Knowledge with ID ${knowledgeId} not found in search results`)
      }

      this.state.data.selectedKnowledge = selectedKnowledge

      return this.advanceToStep('PERSONA_FINAL_FILTERING')

    } catch (error) {
      return this.handleError('KNOWLEDGE_SELECTION', error as Error)
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * Step 8: 投稿タイプによるペルソナ最終フィルタリング
   */
  public async executeFinalPersonaFiltering(): Promise<FlowResult> {
    try {
      this.state.isLoading = true

      const finalPersonas = await this.filterPersonasByPostType(
        this.state.data.selectedKnowledge!.personas,
        this.state.data.selectedPostType!
      )

      this.state.data.finalPersonas = finalPersonas

      return this.advanceToStep('FINAL_DETERMINATION')

    } catch (error) {
      return this.handleError('PERSONA_FINAL_FILTERING', error as Error)
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * Step 9: 3要素同時確定
   */
  public async executeFinalDetermination(): Promise<FlowResult> {
    try {
      this.state.isLoading = true

      // ページ構成・テンプレートパターン確定
      const pageStructure = await this.determinePageStructure()
      const templatePattern = await this.determineTemplatePattern()
      const finalPersona = this.selectFinalPersona()

      // 最終コンテンツ生成準備
      const generatedContent = {
        pageStructure,
        templatePattern,
        persona: finalPersona,
        knowledge: this.state.data.selectedKnowledge,
        userInput: this.state.data.userInput,
        postType: this.state.data.selectedPostType,
        target: this.state.data.selectedTarget
      }

      this.state.data.pageStructure = pageStructure
      this.state.data.templatePattern = templatePattern
      this.state.data.finalPersona = finalPersona
      this.state.data.generatedContent = generatedContent

      this.completeFlow()

      return {
        success: true,
        data: this.state.data
      }

    } catch (error) {
      return this.handleError('FINAL_DETERMINATION', error as Error)
    } finally {
      this.state.isLoading = false
    }
  }

  /**
   * フローのロールバック
   */
  public rollbackToStep(targetStep: FlowStep): FlowResult {
    if (!this.config.enableRollback) {
      return {
        success: false,
        error: {
          step: this.state.currentStep,
          message: 'Rollback is disabled',
          timestamp: new Date()
        }
      }
    }

    try {
      this.state.currentStep = targetStep
      this.state.completedSteps = this.state.completedSteps.filter(
        step => this.getStepOrder(step) <= this.getStepOrder(targetStep)
      )

      // ロールバックに応じてデータをクリア
      this.clearDataFromStep(targetStep)

      return {
        success: true,
        data: this.state.data,
        nextStep: targetStep
      }

    } catch (error) {
      return this.handleError(targetStep, error as Error)
    }
  }

  /**
   * 現在の状態取得
   */
  public getCurrentState(): FlowState {
    return { ...this.state }
  }

  /**
   * フローの完了チェック
   */
  public isComplete(): boolean {
    return this.state.completedSteps.includes('FINAL_DETERMINATION')
  }

  // ==========================================================================
  // Private Methods
  // ==========================================================================

  private advanceToStep(nextStep: FlowStep): FlowResult {
    this.state.completedSteps.push(this.state.currentStep)
    this.state.currentStep = nextStep

    return {
      success: true,
      data: this.state.data,
      nextStep
    }
  }

  private completeFlow(): void {
    this.state.completedSteps.push('FINAL_DETERMINATION')
    this.state.currentStep = 'FINAL_DETERMINATION'
  }

  private handleError(step: FlowStep, error: Error): FlowResult {
    const flowError: FlowError = {
      step,
      message: error.message,
      details: error,
      timestamp: new Date()
    }

    this.state.errors.push(flowError)

    return {
      success: false,
      error: flowError
    }
  }

  private validatePostType(postType: TypeID): boolean {
    const validTypes = ['001', '002', '003', '004']
    return validTypes.includes(postType)
  }

  private validateTargetCompatibility(postType: TypeID, target: TargetID): boolean {
    // 投稿タイプとターゲットの互換性チェック
    const compatibilityMap: Record<TypeID, TargetID[]> = {
      '001': ['T001', 'T002', 'T003'], // キャリアの悩み解決法
      '002': ['T004', 'T005', 'T006'], // スキルアップガイド
      '003': ['T007', 'T008', 'T009'], // 業界・企業情報まとめ
      '004': ['T010', 'T011', 'T012']  // 効率アップテクニック
    }

    return compatibilityMap[postType]?.includes(target) ?? false
  }

  private async filterPersonasByTarget(target: TargetID): Promise<string[]> {
    // ターゲットに紐づくペルソナのフィルタリング実装
    // 実際の実装では problemSolutionPairs.json から関連ペルソナを抽出
    // ここでは仮実装
    return ['P001', 'P002', 'P003'] // 実際は動的に決定
  }

  private async filterKnowledgeByPersonas(personas: string[]): Promise<any[]> {
    // ペルソナに紐づくナレッジのフィルタリング実装
    // 実際の実装では problemSolutionPairs.json から該当ナレッジを抽出
    // ここでは仮実装
    return [] // 実際は動的に決定
  }

  private async filterPersonasByPostType(personas: string[], postType: TypeID): Promise<string[]> {
    // 投稿タイプによるペルソナの最終フィルタリング
    // 複数ペルソナから投稿タイプに適合するもののみを絞り込み
    return personas.filter(persona => {
      // 実際の実装では各ペルソナの投稿タイプ適合性をチェック
      return true // 仮実装
    })
  }

  private async determinePageStructure(): Promise<any> {
    // ナレッジの固有構造に基づいてページ構成を決定
    // Phase 7の設計思想に基づく実装
    return {} // 実際の実装が必要
  }

  private async determineTemplatePattern(): Promise<string> {
    // ナレッジの構造から最適なテンプレートパターンを決定
    return 'default' // 実際の実装が必要
  }

  private selectFinalPersona(): string {
    // 最終ペルソナの選択ロジック
    return this.state.data.finalPersonas?.[0] ?? 'P001'
  }

  private getStepOrder(step: FlowStep): number {
    const order: Record<FlowStep, number> = {
      'POST_TYPE_SELECTION': 1,
      'TARGET_SELECTION': 2,
      'PERSONA_FILTERING': 3,
      'KNOWLEDGE_FILTERING': 4,
      'USER_INPUT': 5,
      'SIMILARITY_SEARCH': 6,
      'KNOWLEDGE_SELECTION': 7,
      'PERSONA_FINAL_FILTERING': 8,
      'FINAL_DETERMINATION': 9
    }
    return order[step]
  }

  private clearDataFromStep(targetStep: FlowStep): void {
    const stepOrder = this.getStepOrder(targetStep)
    
    if (stepOrder <= 1) {
      delete this.state.data.selectedPostType
    }
    if (stepOrder <= 2) {
      delete this.state.data.selectedTarget
    }
    if (stepOrder <= 3) {
      delete this.state.data.filteredPersonas
    }
    if (stepOrder <= 4) {
      delete this.state.data.filteredKnowledge
    }
    if (stepOrder <= 5) {
      delete this.state.data.userInput
    }
    if (stepOrder <= 6) {
      delete this.state.data.similarityResults
    }
    if (stepOrder <= 7) {
      delete this.state.data.selectedKnowledge
    }
    if (stepOrder <= 8) {
      delete this.state.data.finalPersonas
    }
    if (stepOrder <= 9) {
      delete this.state.data.pageStructure
      delete this.state.data.templatePattern
      delete this.state.data.finalPersona
      delete this.state.data.generatedContent
    }
  }
}

/**
 * シングルトンインスタンス（グローバル状態管理）
 */
let globalFlowController: KnowledgeBaseFlowController | null = null

export const getFlowController = (config?: Partial<FlowConfig>): KnowledgeBaseFlowController => {
  if (!globalFlowController) {
    globalFlowController = new KnowledgeBaseFlowController(config)
  }
  return globalFlowController
}

export const resetFlowController = (): void => {
  globalFlowController = null
}