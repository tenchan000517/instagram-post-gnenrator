/**
 * Phase C4統合テスト・エンドツーエンドテスト
 * 困った→解決生成フローのシステム統合テスト
 * 
 * テスト対象：
 * - KnowledgeBaseFlowController（フロー管理）
 * - FilteringService（フィルタリング）
 * - IntegratedKnowledgeController（統合制御）
 * - ErrorHandlingService（エラーハンドリング）
 * - 9段階の確定フロー統合動作
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals'
import { KnowledgeBaseFlowController, FlowStep, FlowResult } from '../../app/services/knowledgeBase/KnowledgeBaseFlowController'
import { FilteringService, PersonaFilterResult, KnowledgeFilterResult } from '../../app/services/knowledgeBase/FilteringService'
import { IntegratedKnowledgeController, IntegratedControlState } from '../../app/services/knowledgeBase/IntegratedKnowledgeController'
import { ErrorHandlingService, ErrorType } from '../../app/services/knowledgeBase/ErrorHandlingService'
import { TypeID, TargetID, ThemeID } from '../../app/types/knowledgeBase'

// ==========================================================================
// テストデータ・モック
// ==========================================================================

const TEST_POST_TYPE: TypeID = '001' // キャリアの悩み解決法
const TEST_TARGET: TargetID = 'T001' // 就活に不安を感じている学生
const TEST_THEME: ThemeID = 'TH001'
const TEST_USER_INPUT = 'インターンの面接で緊張してしまい、うまく自分をアピールできません。どうすれば落ち着いて話せるようになりますか？'

const MOCK_PERSONA_RESULT: PersonaFilterResult[] = [
  {
    personaId: 'P001',
    personaData: {
      id: 'P001',
      name: 'テスト面接不安学生',
      description: 'インターン面接に不安を抱く学生',
      characteristics: ['面接不安', '緊張しやすい', 'アピール苦手']
    },
    compatibilityScore: 1.0,
    matchingCriteria: ['面接対策', '緊張対策']
  }
]

const MOCK_KNOWLEDGE_RESULT: KnowledgeFilterResult[] = [
  {
    knowledgeId: 'interview-anxiety-solution',
    knowledgeData: {
      problemDescription: '面接で緊張してしまい、うまく話せない',
      solutionContent: '事前準備と呼吸法で緊張をコントロール',
      targetPersona: 'P001'
    },
    associatedPersonas: ['P001'],
    category: '面接対策',
    compatibilityScore: 0.95
  }
]

// ==========================================================================
// Phase C4統合テストスイート
// ==========================================================================

describe('Phase C4 統合テスト - 困った→解決生成フロー', () => {
  let flowController: KnowledgeBaseFlowController
  let filteringService: FilteringService
  let integratedController: IntegratedKnowledgeController
  let errorHandlingService: ErrorHandlingService

  beforeEach(() => {
    flowController = new KnowledgeBaseFlowController()
    filteringService = new FilteringService()
    errorHandlingService = new ErrorHandlingService()
    
    integratedController = new IntegratedKnowledgeController({
      enableAutoAdvance: true,
      strictFiltering: true,
      maxRecommendations: 5
    })
  })

  afterEach(() => {
    flowController.initialize()
    filteringService.clearCache()
    errorHandlingService.clearLogs()
  })

  // ==========================================================================
  // フロー管理サービステスト
  // ==========================================================================

  describe('KnowledgeBaseFlowController', () => {
    test('正常な9段階フロー実行', async () => {
      // Step 1: 投稿タイプ選択
      const step1Result = await flowController.selectPostType(TEST_POST_TYPE)
      expect(step1Result.success).toBe(true)
      expect(step1Result.nextStep).toBe('TARGET_SELECTION')

      // Step 2: ターゲット選択
      const step2Result = await flowController.selectTarget(TEST_TARGET)
      expect(step2Result.success).toBe(true)
      expect(step2Result.nextStep).toBe('PERSONA_FILTERING')

      // Step 3: ペルソナ自動フィルタリング
      const step3Result = await flowController.executePersonaFiltering()
      expect(step3Result.success).toBe(true)

      // Step 4: ナレッジ自動フィルタリング
      const step4Result = await flowController.executeKnowledgeFiltering()
      expect(step4Result.success).toBe(true)

      // Step 5: ユーザー入力投入
      const step5Result = await flowController.submitUserInput(TEST_USER_INPUT)
      expect(step5Result.success).toBe(true)

      // Step 6: AI類似度検索
      const step6Result = await flowController.executeSimilaritySearch()
      expect(step6Result.success).toBe(true)

      // Step 7: ナレッジ選択
      const step7Result = await flowController.selectKnowledge('interview-anxiety-solution')
      expect(step7Result.success).toBe(true)

      // Step 8: 最終ペルソナフィルタリング
      const step8Result = await flowController.executeFinalPersonaFiltering()
      expect(step8Result.success).toBe(true)

      // Step 9: 最終確定
      const step9Result = await flowController.executeFinalDetermination()
      expect(step9Result.success).toBe(true)

      // フロー完了確認
      expect(flowController.isComplete()).toBe(true)
    })

    test('投稿タイプ-ターゲット互換性チェック', async () => {
      // 正常ケース
      const validResult = await flowController.selectPostType('001')
      expect(validResult.success).toBe(true)

      const compatibleResult = await flowController.selectTarget('T001')
      expect(compatibleResult.success).toBe(true)

      // 異常ケース：非互換のターゲット選択
      await flowController.selectPostType('001')
      const incompatibleResult = await flowController.selectTarget('T010') // 効率アップ系ターゲット
      expect(incompatibleResult.success).toBe(false)
      expect(incompatibleResult.error?.message).toContain('not compatible')
    })

    test('フローのロールバック機能', async () => {
      // フローを途中まで進める
      await flowController.selectPostType(TEST_POST_TYPE)
      await flowController.selectTarget(TEST_TARGET)
      await flowController.executePersonaFiltering()

      // ロールバック実行
      const rollbackResult = flowController.rollbackToStep('TARGET_SELECTION')
      expect(rollbackResult.success).toBe(true)

      // 状態確認
      const state = flowController.getCurrentState()
      expect(state.currentStep).toBe('TARGET_SELECTION')
      expect(state.data.filteredPersonas).toBeUndefined()
    })
  })

  // ==========================================================================
  // フィルタリングサービステスト
  // ==========================================================================

  describe('FilteringService', () => {
    test('投稿タイプによるターゲットフィルタリング', () => {
      const result = filteringService.filterTargetsByPostType('001')
      
      expect(result.success).toBe(true)
      expect(result.data).toEqual(['T001', 'T002', 'T003'])
      expect(result.metadata.filteredCount).toBe(3)
    })

    test('ターゲットによるペルソナフィルタリング', () => {
      const result = filteringService.filterPersonasByTarget('T001')
      
      expect(result.success).toBe(true)
      expect(result.data.length).toBeGreaterThan(0)
      expect(result.data[0]).toHaveProperty('personaId')
      expect(result.data[0]).toHaveProperty('compatibilityScore')
    })

    test('100点ルール適用（厳密モード）', () => {
      const strictService = new FilteringService({ strictMode: true })
      
      const result = strictService.finalFilterPersonasByPostType(
        ['P001', 'P002'], 
        '001'
      )
      
      expect(result.success).toBe(true)
      // 厳密モードでは完全適合のみ
      result.data.forEach(persona => {
        expect(persona.compatibilityScore).toBe(1.0)
      })
    })

    test('フィルタリング整合性チェック', () => {
      const validationResult = filteringService.validateFilteringConsistency(
        '001',  // postType
        'T001', // target
        ['P001'], // personas
        ['interview-anxiety-solution'] // knowledge
      )
      
      expect(validationResult.isValid).toBe(true)
      expect(validationResult.errors.length).toBe(0)
    })
  })

  // ==========================================================================
  // 統合コントローラーテスト
  // ==========================================================================

  describe('IntegratedKnowledgeController', () => {
    let stateChanges: IntegratedControlState[] = []

    beforeEach(() => {
      stateChanges = []
      
      integratedController = new IntegratedKnowledgeController(
        {
          enableAutoAdvance: true,
          enableParallelProcessing: true
        },
        {
          onStateChange: (state) => stateChanges.push({ ...state }),
          onError: (error) => console.error('Test Error:', error),
          onComplete: (result) => console.log('Test Complete:', result)
        }
      )
    })

    test('エンドツーエンド統合フロー実行', async () => {
      // Step 1: 投稿タイプ選択
      await integratedController.selectPostType(TEST_POST_TYPE)
      
      let currentState = integratedController.getCurrentState()
      expect(currentState.uiState.selectedPostType).toBe(TEST_POST_TYPE)
      expect(currentState.uiState.availableTargets).toContain('T001')

      // Step 2: ターゲット選択
      await integratedController.selectTarget(TEST_TARGET)
      
      currentState = integratedController.getCurrentState()
      expect(currentState.uiState.selectedTarget).toBe(TEST_TARGET)
      expect(currentState.filteringResults.personas).toBeDefined()

      // Step 3: ユーザー入力とAI処理
      await integratedController.processUserInput(TEST_USER_INPUT)
      
      currentState = integratedController.getCurrentState()
      expect(currentState.uiState.userInput).toBe(TEST_USER_INPUT)
      expect(currentState.aiResults.recommendations).toBeDefined()

      // Step 4: ナレッジ選択と最終確定
      const recommendations = integratedController.getRecommendations()
      if (recommendations.length > 0) {
        await integratedController.selectKnowledge(recommendations[0].knowledgeId)
        
        currentState = integratedController.getCurrentState()
        expect(integratedController.isFlowComplete()).toBe(true)
        expect(currentState.finalResult).toBeDefined()
      }
    })

    test('並列AI処理の性能テスト', async () => {
      const startTime = performance.now()
      
      await integratedController.selectPostType(TEST_POST_TYPE)
      await integratedController.selectTarget(TEST_TARGET)
      await integratedController.processUserInput(TEST_USER_INPUT)
      
      const endTime = performance.now()
      const executionTime = endTime - startTime
      
      // 並列処理により10秒以内で完了することを期待
      expect(executionTime).toBeLessThan(10000)
    })

    test('状態変更イベントの発生', async () => {
      await integratedController.selectPostType(TEST_POST_TYPE)
      await integratedController.selectTarget(TEST_TARGET)
      
      // 状態変更イベントが発生していることを確認
      expect(stateChanges.length).toBeGreaterThan(0)
      
      const lastState = stateChanges[stateChanges.length - 1]
      expect(lastState.uiState.selectedPostType).toBe(TEST_POST_TYPE)
      expect(lastState.uiState.selectedTarget).toBe(TEST_TARGET)
    })
  })

  // ==========================================================================
  // エラーハンドリングテスト
  // ==========================================================================

  describe('ErrorHandlingService', () => {
    test('各種エラータイプの処理', async () => {
      // バリデーションエラー
      const validationError = errorHandlingService.handleValidationError(
        'POST_TYPE_SELECTION',
        'postType',
        '999',
        'valid post type (001-004)'
      )
      
      expect(validationError.type).toBe('VALIDATION_ERROR')
      expect(validationError.severity).toBe('LOW')
      expect(validationError.suggestedUserActions.length).toBeGreaterThan(0)

      // APIエラー
      const apiError = await errorHandlingService.handleApiError(
        'SIMILARITY_SEARCH',
        '/api/similarity',
        500,
        { error: 'Internal Server Error' }
      )
      
      expect(apiError.type).toBe('API_ERROR')
      expect(apiError.severity).toBe('MEDIUM')

      // タイムアウトエラー
      const timeoutError = await errorHandlingService.handleTimeoutError(
        'AI_PROCESSING',
        'Gemini API call',
        30000
      )
      
      expect(timeoutError.type).toBe('TIMEOUT_ERROR')
      expect(timeoutError.suggestedUserActions.some(action => 
        action.actionType === 'TRY_ALTERNATIVE'
      )).toBe(true)
    })

    test('エラー統計の集計', async () => {
      // 複数のエラーを発生
      await errorHandlingService.handleError('API_ERROR', 'SIMILARITY_SEARCH', 'API failed')
      await errorHandlingService.handleError('TIMEOUT_ERROR', 'AI_PROCESSING', 'Timeout')
      await errorHandlingService.handleError('API_ERROR', 'SIMILARITY_SEARCH', 'API failed again')

      const statistics = errorHandlingService.getErrorStatistics()
      
      expect(statistics.totalErrors).toBe(3)
      expect(statistics.errorsByType['API_ERROR']).toBe(2)
      expect(statistics.errorsByType['TIMEOUT_ERROR']).toBe(1)
      expect(statistics.errorsByStep['SIMILARITY_SEARCH']).toBe(2)
    })

    test('ユーザーフィードバックメッセージの生成', () => {
      const errorDetails = errorHandlingService.handleValidationError(
        'USER_INPUT',
        'input',
        '',
        'non-empty string'
      )

      const feedbackMessage = errorHandlingService.generateUserFeedbackMessage(errorDetails)
      
      expect(feedbackMessage).toContain('入力内容')
      expect(feedbackMessage).toContain('正しい形式')
      expect(typeof feedbackMessage).toBe('string')
      expect(feedbackMessage.length).toBeGreaterThan(0)
    })

    test('ログの記録・取得・フィルタリング', () => {
      errorHandlingService.logPerformance('TEST_STEP', {
        executionTime: 1500,
        apiCalls: 3,
        cacheHitRate: 0.75
      })

      const allLogs = errorHandlingService.getLogs()
      expect(allLogs.length).toBeGreaterThan(0)

      const infoLogs = errorHandlingService.getLogs({ level: 'INFO' })
      expect(infoLogs.every(log => log.level === 'INFO')).toBe(true)

      const testStepLogs = errorHandlingService.getLogs({ step: 'TEST_STEP' })
      expect(testStepLogs.every(log => log.step === 'TEST_STEP')).toBe(true)
    })
  })

  // ==========================================================================
  // データ整合性テスト
  // ==========================================================================

  describe('データ整合性・品質保証', () => {
    test('投稿タイプ-ターゲット-ペルソナ-ナレッジの関係整合性', async () => {
      const flowController = new KnowledgeBaseFlowController()
      const filteringService = new FilteringService()

      // 1. 投稿タイプ選択
      await flowController.selectPostType('001')
      
      // 2. 対応するターゲット取得
      const targetResult = filteringService.filterTargetsByPostType('001')
      expect(targetResult.success).toBe(true)
      expect(targetResult.data).toContain('T001')
      
      // 3. ターゲット選択・ペルソナフィルタリング
      await flowController.selectTarget('T001')
      const personaResult = filteringService.filterPersonasByTarget('T001')
      expect(personaResult.success).toBe(true)
      
      // 4. ペルソナに基づくナレッジフィルタリング
      const personaIds = personaResult.data.map(p => p.personaId)
      const knowledgeResult = filteringService.filterKnowledgeByPersonas(personaIds)
      expect(knowledgeResult.success).toBe(true)
      
      // 5. 全体の整合性チェック
      const consistencyResult = filteringService.validateFilteringConsistency(
        '001',
        'T001',
        personaIds,
        knowledgeResult.data.map(k => k.knowledgeId)
      )
      
      expect(consistencyResult.isValid).toBe(true)
      expect(consistencyResult.errors.length).toBe(0)
    })

    test('重複データの排除確認', () => {
      const targetResult = filteringService.filterTargetsByPostType('001')
      const targets = targetResult.data
      
      // 重複がないことを確認
      const uniqueTargets = [...new Set(targets)]
      expect(targets.length).toBe(uniqueTargets.length)
    })

    test('必須データの存在確認', async () => {
      const flowController = new KnowledgeBaseFlowController()
      
      // 投稿タイプ選択後の必須データチェック
      const result = await flowController.selectPostType('001')
      expect(result.success).toBe(true)
      
      const state = flowController.getCurrentState()
      expect(state.data.selectedPostType).toBeDefined()
      expect(state.completedSteps).toContain('POST_TYPE_SELECTION')
    })
  })

  // ==========================================================================
  // パフォーマンステスト
  // ==========================================================================

  describe('パフォーマンス・負荷テスト', () => {
    test('大量データでのフィルタリング性能', () => {
      const startTime = performance.now()
      
      // 複数投稿タイプでの同時フィルタリング
      const postTypes: TypeID[] = ['001', '002', '003', '004']
      const results = postTypes.map(postType => 
        filteringService.filterTargetsByPostType(postType)
      )
      
      const endTime = performance.now()
      const executionTime = endTime - startTime
      
      // 全ての結果が成功していることを確認
      results.forEach(result => {
        expect(result.success).toBe(true)
        expect(result.data.length).toBe(3) // 各投稿タイプに3つのターゲット
      })
      
      // 1秒以内で完了することを期待
      expect(executionTime).toBeLessThan(1000)
    })

    test('キャッシュ機能の効果測定', () => {
      const filteringService = new FilteringService({ enableCache: true })
      
      // 初回実行（キャッシュなし）
      const startTime1 = performance.now()
      const result1 = filteringService.filterTargetsByPostType('001')
      const endTime1 = performance.now()
      const firstExecution = endTime1 - startTime1
      
      expect(result1.metadata.performance.cacheHit).toBe(false)
      
      // 2回目実行（キャッシュあり）
      const startTime2 = performance.now()
      const result2 = filteringService.filterTargetsByPostType('001')
      const endTime2 = performance.now()
      const secondExecution = endTime2 - startTime2
      
      expect(result2.metadata.performance.cacheHit).toBe(true)
      expect(secondExecution).toBeLessThan(firstExecution)
    })

    test('メモリ使用量の監視', async () => {
      const initialMemory = process.memoryUsage().heapUsed
      
      // 複数回の統合フロー実行
      for (let i = 0; i < 5; i++) {
        const controller = new IntegratedKnowledgeController()
        await controller.selectPostType('001')
        await controller.selectTarget('T001')
        // コントローラーを明示的にリセット
        controller.resetFlow()
      }
      
      const finalMemory = process.memoryUsage().heapUsed
      const memoryIncrease = finalMemory - initialMemory
      
      // メモリ増加が10MB以下であることを確認（メモリリークの検出）
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024)
    })
  })
})

// ==========================================================================
// ヘルパー関数
// ==========================================================================

/**
 * テスト用データの検証
 */
function validateTestData(data: any): boolean {
  return data !== null && data !== undefined && typeof data === 'object'
}

/**
 * 非同期処理の待機
 */
async function waitFor(condition: () => boolean, timeoutMs: number = 5000): Promise<void> {
  const startTime = Date.now()
  
  while (!condition() && Date.now() - startTime < timeoutMs) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  if (!condition()) {
    throw new Error(`Condition not met within ${timeoutMs}ms`)
  }
}

/**
 * エラーの詳細比較
 */
function compareErrors(error1: any, error2: any): boolean {
  return error1.type === error2.type && 
         error1.step === error2.step && 
         error1.message === error2.message
}