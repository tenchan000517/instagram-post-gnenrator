/**
 * エラーハンドリング・ユーザーフィードバックサービス
 * 
 * 機能：
 * 1. 各段階でのエラー検出・対処
 * 2. ユーザーへの適切なフィードバック表示
 * 3. デバッグ・ログ機能
 * 4. 自動復旧・リトライ機能
 * 5. パフォーマンス監視・アラート
 */

import { FlowStep } from './KnowledgeBaseFlowController'
import { TypeID, TargetID, ThemeID } from '../../types/knowledgeBase'

// エラータイプ定義
export type ErrorType = 
  | 'VALIDATION_ERROR'      // バリデーションエラー
  | 'DATA_CONSISTENCY_ERROR' // データ整合性エラー
  | 'API_ERROR'             // API呼び出しエラー
  | 'TIMEOUT_ERROR'         // タイムアウトエラー
  | 'FILTERING_ERROR'       // フィルタリングエラー
  | 'AI_PROCESSING_ERROR'   // AI処理エラー
  | 'SYSTEM_ERROR'          // システムエラー
  | 'USER_INPUT_ERROR'      // ユーザー入力エラー

// エラー重要度
export type ErrorSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO'

// エラー詳細情報
export interface ErrorDetails {
  type: ErrorType
  severity: ErrorSeverity
  step: FlowStep | string
  message: string
  userFriendlyMessage: string
  technicalDetails?: any
  context?: any
  timestamp: Date
  errorId: string
  
  // 自動対処情報
  autoRecoveryAttempted: boolean
  autoRecoverySuccess: boolean
  autoRecoveryMethod?: string
  
  // ユーザーアクション
  suggestedUserActions: UserAction[]
  preventionTips?: string[]
}

// ユーザーアクション定義
export interface UserAction {
  actionType: 'RETRY' | 'ROLLBACK' | 'RESET' | 'CONTACT_SUPPORT' | 'TRY_ALTERNATIVE'
  label: string
  description: string
  actionData?: any
}

// フィードバック表示レベル
export type FeedbackLevel = 'MINIMAL' | 'STANDARD' | 'DETAILED' | 'DEBUG'

// ログエントリ
export interface LogEntry {
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'
  timestamp: Date
  step: string
  message: string
  details?: any
  performanceData?: PerformanceData
  userId?: string
  sessionId: string
}

// パフォーマンスデータ
export interface PerformanceData {
  executionTime: number
  memoryUsage?: number
  apiCalls: number
  cacheHitRate: number
  throughput?: number
}

// エラー統計
export interface ErrorStatistics {
  totalErrors: number
  errorsByType: Record<ErrorType, number>
  errorsByStep: Record<string, number>
  averageRecoveryTime: number
  autoRecoverySuccessRate: number
  mostCommonErrors: Array<{ type: ErrorType; count: number; message: string }>
}

// 設定オプション
export interface ErrorHandlingConfig {
  enableAutoRecovery: boolean
  enableDetailedLogging: boolean
  enablePerformanceMonitoring: boolean
  maxRetryAttempts: number
  retryDelayMs: number
  feedbackLevel: FeedbackLevel
  enableErrorStatistics: boolean
  logRetentionDays: number
}

/**
 * エラーハンドリング・ユーザーフィードバックサービス
 */
export class ErrorHandlingService {
  private config: ErrorHandlingConfig
  private errorLog: LogEntry[]
  private errorStatistics: ErrorStatistics
  private sessionId: string
  private retryAttempts: Map<string, number>

  constructor(config: Partial<ErrorHandlingConfig> = {}) {
    this.config = {
      enableAutoRecovery: true,
      enableDetailedLogging: true,
      enablePerformanceMonitoring: true,
      maxRetryAttempts: 3,
      retryDelayMs: 1000,
      feedbackLevel: 'STANDARD',
      enableErrorStatistics: true,
      logRetentionDays: 7,
      ...config
    }

    this.errorLog = []
    this.errorStatistics = this.initializeStatistics()
    this.sessionId = this.generateSessionId()
    this.retryAttempts = new Map()
  }

  // ==========================================================================
  // エラー検出・処理
  // ==========================================================================

  /**
   * エラーの記録・処理
   */
  public async handleError(
    type: ErrorType,
    step: FlowStep | string,
    error: Error | string,
    context?: any
  ): Promise<ErrorDetails> {
    const errorId = this.generateErrorId()
    const timestamp = new Date()
    
    const errorDetails: ErrorDetails = {
      type,
      severity: this.determineSeverity(type, step),
      step,
      message: typeof error === 'string' ? error : error.message,
      userFriendlyMessage: this.generateUserFriendlyMessage(type, step),
      technicalDetails: typeof error === 'object' ? error : undefined,
      context,
      timestamp,
      errorId,
      autoRecoveryAttempted: false,
      autoRecoverySuccess: false,
      suggestedUserActions: this.generateUserActions(type, step)
    }

    // ログ記録
    this.logError(errorDetails)

    // 統計更新
    if (this.config.enableErrorStatistics) {
      this.updateStatistics(errorDetails)
    }

    // 自動復旧試行
    if (this.config.enableAutoRecovery && this.shouldAttemptAutoRecovery(type, step)) {
      await this.attemptAutoRecovery(errorDetails)
    }

    return errorDetails
  }

  /**
   * バリデーションエラーの処理
   */
  public handleValidationError(
    step: FlowStep | string,
    field: string,
    value: any,
    expectedFormat: string
  ): ErrorDetails {
    const context = { field, value, expectedFormat }
    const message = `Validation failed for ${field}: expected ${expectedFormat}, got ${typeof value}`
    
    return this.handleErrorSync('VALIDATION_ERROR', step, message, context)
  }

  /**
   * API エラーの処理
   */
  public async handleApiError(
    step: FlowStep | string,
    apiEndpoint: string,
    statusCode: number,
    responseBody?: any
  ): Promise<ErrorDetails> {
    const context = { apiEndpoint, statusCode, responseBody }
    const message = `API call failed: ${apiEndpoint} returned ${statusCode}`
    
    const errorDetails = await this.handleError('API_ERROR', step, message, context)
    
    // API エラーの場合、リトライロジックを適用
    if (this.shouldRetryApiCall(statusCode)) {
      errorDetails.suggestedUserActions.unshift({
        actionType: 'RETRY',
        label: 'リトライ',
        description: 'API呼び出しを再試行します',
        actionData: { endpoint: apiEndpoint }
      })
    }

    return errorDetails
  }

  /**
   * タイムアウトエラーの処理
   */
  public async handleTimeoutError(
    step: FlowStep | string,
    operation: string,
    timeoutMs: number
  ): Promise<ErrorDetails> {
    const context = { operation, timeoutMs }
    const message = `Operation timed out: ${operation} exceeded ${timeoutMs}ms`
    
    const errorDetails = await this.handleError('TIMEOUT_ERROR', step, message, context)
    
    // タイムアウトの場合、追加のアクション提案
    errorDetails.suggestedUserActions.push(
      {
        actionType: 'TRY_ALTERNATIVE',
        label: '入力を簡略化',
        description: 'より短い文章で再試行してみてください',
      },
      {
        actionType: 'RETRY',
        label: '再試行',
        description: 'しばらく待ってから再度お試しください',
      }
    )

    return errorDetails
  }

  // ==========================================================================
  // ユーザーフィードバック
  // ==========================================================================

  /**
   * ユーザー向けエラーメッセージの生成
   */
  public generateUserFeedbackMessage(errorDetails: ErrorDetails): string {
    switch (this.config.feedbackLevel) {
      case 'MINIMAL':
        return errorDetails.userFriendlyMessage

      case 'STANDARD':
        return this.formatStandardFeedback(errorDetails)

      case 'DETAILED':
        return this.formatDetailedFeedback(errorDetails)

      case 'DEBUG':
        return this.formatDebugFeedback(errorDetails)

      default:
        return errorDetails.userFriendlyMessage
    }
  }

  /**
   * プログレス・ステータス情報の生成
   */
  public generateProgressFeedback(
    currentStep: string,
    progress: number,
    isLoading: boolean,
    lastError?: ErrorDetails
  ): string {
    const stepNames: Record<string, string> = {
      'POST_TYPE_SELECTION': '投稿タイプ選択',
      'TARGET_SELECTION': 'ターゲット選択',
      'PERSONA_FILTERING': 'ペルソナ抽出',
      'KNOWLEDGE_FILTERING': 'ナレッジ抽出',
      'USER_INPUT': 'ユーザー入力',
      'SIMILARITY_SEARCH': 'AI類似度検索',
      'KNOWLEDGE_SELECTION': 'ナレッジ選択',
      'FINAL_GENERATION': '最終生成'
    }

    if (isLoading) {
      return `${stepNames[currentStep] || currentStep}を実行中... (${Math.round(progress * 100)}%)`
    }

    if (lastError) {
      return `エラーが発生しました: ${lastError.userFriendlyMessage}`
    }

    return `${stepNames[currentStep] || currentStep}が完了しました`
  }

  // ==========================================================================
  // 自動復旧・リトライ
  // ==========================================================================

  /**
   * 自動復旧の実行
   */
  private async attemptAutoRecovery(errorDetails: ErrorDetails): Promise<void> {
    const recoveryKey = `${errorDetails.step}_${errorDetails.type}`
    const attempts = this.retryAttempts.get(recoveryKey) || 0

    if (attempts >= this.config.maxRetryAttempts) {
      this.logInfo('AUTO_RECOVERY', `Max retry attempts reached for ${recoveryKey}`)
      return
    }

    this.retryAttempts.set(recoveryKey, attempts + 1)
    errorDetails.autoRecoveryAttempted = true

    try {
      await this.delay(this.config.retryDelayMs * Math.pow(2, attempts)) // 指数バックオフ

      switch (errorDetails.type) {
        case 'API_ERROR':
          await this.recoverFromApiError(errorDetails)
          break
        case 'TIMEOUT_ERROR':
          await this.recoverFromTimeoutError(errorDetails)
          break
        case 'FILTERING_ERROR':
          await this.recoverFromFilteringError(errorDetails)
          break
        default:
          this.logWarn('AUTO_RECOVERY', `No recovery method for error type: ${errorDetails.type}`)
          return
      }

      errorDetails.autoRecoverySuccess = true
      this.logInfo('AUTO_RECOVERY', `Successfully recovered from ${errorDetails.type} in step ${errorDetails.step}`)

    } catch (recoveryError) {
      errorDetails.autoRecoverySuccess = false
      this.logError({
        type: 'SYSTEM_ERROR',
        severity: 'HIGH',
        step: errorDetails.step,
        message: 'Auto recovery failed',
        userFriendlyMessage: '自動復旧に失敗しました',
        technicalDetails: recoveryError,
        context: errorDetails,
        timestamp: new Date(),
        errorId: this.generateErrorId(),
        autoRecoveryAttempted: false,
        autoRecoverySuccess: false,
        suggestedUserActions: []
      })
    }
  }

  // ==========================================================================
  // ログ・監視
  // ==========================================================================

  /**
   * エラーログの記録
   */
  private logError(errorDetails: ErrorDetails): void {
    const logEntry: LogEntry = {
      level: 'ERROR',
      timestamp: errorDetails.timestamp,
      step: errorDetails.step.toString(),
      message: errorDetails.message,
      details: {
        errorId: errorDetails.errorId,
        type: errorDetails.type,
        severity: errorDetails.severity,
        technicalDetails: errorDetails.technicalDetails,
        context: errorDetails.context
      },
      sessionId: this.sessionId
    }

    this.errorLog.push(logEntry)
    
    if (this.config.enableDetailedLogging) {
      console.error('[KnowledgeBase Error]', logEntry)
    }
  }

  /**
   * 警告ログの記録
   */
  private logWarn(step: string, message: string, details?: any): void {
    const logEntry: LogEntry = {
      level: 'WARN',
      timestamp: new Date(),
      step,
      message,
      details,
      sessionId: this.sessionId
    }

    this.errorLog.push(logEntry)
    
    if (this.config.enableDetailedLogging) {
      console.warn('[KnowledgeBase Warning]', logEntry)
    }
  }

  /**
   * 情報ログの記録
   */
  private logInfo(step: string, message: string, details?: any): void {
    const logEntry: LogEntry = {
      level: 'INFO',
      timestamp: new Date(),
      step,
      message,
      details,
      sessionId: this.sessionId
    }

    this.errorLog.push(logEntry)
    
    if (this.config.enableDetailedLogging) {
      console.info('[KnowledgeBase Info]', logEntry)
    }
  }

  /**
   * パフォーマンス監視データの記録
   */
  public logPerformance(
    step: string,
    performanceData: PerformanceData
  ): void {
    if (!this.config.enablePerformanceMonitoring) return

    const logEntry: LogEntry = {
      level: 'INFO',
      timestamp: new Date(),
      step,
      message: 'Performance metrics',
      performanceData,
      sessionId: this.sessionId
    }

    this.errorLog.push(logEntry)

    // パフォーマンス警告
    if (performanceData.executionTime > 10000) { // 10秒以上
      this.logWarn(step, `Slow execution detected: ${performanceData.executionTime}ms`, performanceData)
    }
  }

  // ==========================================================================
  // 統計・分析
  // ==========================================================================

  /**
   * エラー統計の取得
   */
  public getErrorStatistics(): ErrorStatistics {
    return { ...this.errorStatistics }
  }

  /**
   * ログの取得（フィルタ付き）
   */
  public getLogs(filter?: {
    level?: LogEntry['level']
    step?: string
    timeRange?: { from: Date; to: Date }
  }): LogEntry[] {
    let logs = [...this.errorLog]

    if (filter) {
      if (filter.level) {
        logs = logs.filter(log => log.level === filter.level)
      }
      if (filter.step) {
        logs = logs.filter(log => log.step === filter.step)
      }
      if (filter.timeRange) {
        logs = logs.filter(log => 
          log.timestamp >= filter.timeRange!.from && 
          log.timestamp <= filter.timeRange!.to
        )
      }
    }

    return logs
  }

  /**
   * ログのクリア
   */
  public clearLogs(): void {
    this.errorLog = []
    this.errorStatistics = this.initializeStatistics()
  }

  // ==========================================================================
  // Private Methods
  // ==========================================================================

  private handleErrorSync(
    type: ErrorType,
    step: FlowStep | string,
    error: Error | string,
    context?: any
  ): ErrorDetails {
    const errorId = this.generateErrorId()
    const timestamp = new Date()
    
    return {
      type,
      severity: this.determineSeverity(type, step),
      step,
      message: typeof error === 'string' ? error : error.message,
      userFriendlyMessage: this.generateUserFriendlyMessage(type, step),
      technicalDetails: typeof error === 'object' ? error : undefined,
      context,
      timestamp,
      errorId,
      autoRecoveryAttempted: false,
      autoRecoverySuccess: false,
      suggestedUserActions: this.generateUserActions(type, step)
    }
  }

  private determineSeverity(type: ErrorType, step: FlowStep | string): ErrorSeverity {
    if (type === 'SYSTEM_ERROR') return 'CRITICAL'
    if (type === 'DATA_CONSISTENCY_ERROR') return 'HIGH'
    if (type === 'API_ERROR' || type === 'AI_PROCESSING_ERROR') return 'MEDIUM'
    if (type === 'TIMEOUT_ERROR') return 'MEDIUM'
    if (type === 'USER_INPUT_ERROR' || type === 'VALIDATION_ERROR') return 'LOW'
    return 'MEDIUM'
  }

  private generateUserFriendlyMessage(type: ErrorType, step: FlowStep | string): string {
    const stepNames: Record<string, string> = {
      'POST_TYPE_SELECTION': '投稿タイプ選択',
      'TARGET_SELECTION': 'ターゲット選択',
      'USER_INPUT': 'ユーザー入力',
      'SIMILARITY_SEARCH': 'AI検索',
      'KNOWLEDGE_SELECTION': 'ナレッジ選択'
    }

    const stepName = stepNames[step] || step

    switch (type) {
      case 'VALIDATION_ERROR':
        return `${stepName}で入力内容に問題があります。正しい形式で入力してください。`
      case 'API_ERROR':
        return `${stepName}でサーバーとの通信に問題が発生しました。しばらく待ってから再度お試しください。`
      case 'TIMEOUT_ERROR':
        return `${stepName}の処理に時間がかかりすぎています。入力内容を短くするか、しばらく待ってから再度お試しください。`
      case 'AI_PROCESSING_ERROR':
        return `AI処理中にエラーが発生しました。異なる入力で再度お試しください。`
      case 'FILTERING_ERROR':
        return `データの抽出中にエラーが発生しました。選択内容を確認してください。`
      default:
        return `${stepName}でエラーが発生しました。再度お試しください。`
    }
  }

  private generateUserActions(type: ErrorType, step: FlowStep | string): UserAction[] {
    const actions: UserAction[] = []

    // 共通アクション
    actions.push({
      actionType: 'RETRY',
      label: '再試行',
      description: '同じ操作をもう一度実行します'
    })

    // タイプ別アクション
    if (type === 'USER_INPUT_ERROR' || type === 'VALIDATION_ERROR') {
      actions.push({
        actionType: 'TRY_ALTERNATIVE',
        label: '入力内容を変更',
        description: '異なる内容で再度入力してください'
      })
    }

    if (type === 'API_ERROR' || type === 'TIMEOUT_ERROR') {
      actions.push({
        actionType: 'TRY_ALTERNATIVE',
        label: 'しばらく待つ',
        description: '時間を置いてから再度お試しください'
      })
    }

    // ステップ別アクション
    if (step !== 'POST_TYPE_SELECTION') {
      actions.push({
        actionType: 'ROLLBACK',
        label: '前のステップに戻る',
        description: '前の選択からやり直します'
      })
    }

    actions.push({
      actionType: 'RESET',
      label: '最初から開始',
      description: 'フロー全体をリセットします'
    })

    return actions
  }

  private shouldAttemptAutoRecovery(type: ErrorType, step: FlowStep | string): boolean {
    if (type === 'USER_INPUT_ERROR' || type === 'VALIDATION_ERROR') return false
    if (type === 'SYSTEM_ERROR') return false
    return true
  }

  private shouldRetryApiCall(statusCode: number): boolean {
    return statusCode >= 500 || statusCode === 429 // Server errors or rate limit
  }

  private async recoverFromApiError(errorDetails: ErrorDetails): Promise<void> {
    // API エラーからの自動復旧ロジック
    // 実装例: フォールバック API、キャッシュ使用など
    throw new Error('API recovery not implemented')
  }

  private async recoverFromTimeoutError(errorDetails: ErrorDetails): Promise<void> {
    // タイムアウトエラーからの自動復旧ロジック
    // 実装例: タイムアウト時間の延長、処理の分割など
    throw new Error('Timeout recovery not implemented')
  }

  private async recoverFromFilteringError(errorDetails: ErrorDetails): Promise<void> {
    // フィルタリングエラーからの自動復旧ロジック
    // 実装例: フィルタ条件の緩和、デフォルトデータの使用など
    throw new Error('Filtering recovery not implemented')
  }

  private formatStandardFeedback(errorDetails: ErrorDetails): string {
    return `${errorDetails.userFriendlyMessage}\n\n推奨アクション: ${
      errorDetails.suggestedUserActions[0]?.description || '再試行してください'
    }`
  }

  private formatDetailedFeedback(errorDetails: ErrorDetails): string {
    const actions = errorDetails.suggestedUserActions
      .map(action => `• ${action.label}: ${action.description}`)
      .join('\n')
    
    return `${errorDetails.userFriendlyMessage}\n\n利用可能なアクション:\n${actions}\n\nエラーID: ${errorDetails.errorId}`
  }

  private formatDebugFeedback(errorDetails: ErrorDetails): string {
    return `【デバッグ情報】
エラー種別: ${errorDetails.type}
重要度: ${errorDetails.severity}
ステップ: ${errorDetails.step}
エラーID: ${errorDetails.errorId}
時刻: ${errorDetails.timestamp.toISOString()}
メッセージ: ${errorDetails.message}
ユーザーメッセージ: ${errorDetails.userFriendlyMessage}
自動復旧試行: ${errorDetails.autoRecoveryAttempted ? 'あり' : 'なし'}
自動復旧成功: ${errorDetails.autoRecoverySuccess ? '成功' : '失敗'}
技術詳細: ${JSON.stringify(errorDetails.technicalDetails, null, 2)}
コンテキスト: ${JSON.stringify(errorDetails.context, null, 2)}`
  }

  private initializeStatistics(): ErrorStatistics {
    return {
      totalErrors: 0,
      errorsByType: {} as Record<ErrorType, number>,
      errorsByStep: {},
      averageRecoveryTime: 0,
      autoRecoverySuccessRate: 0,
      mostCommonErrors: []
    }
  }

  private updateStatistics(errorDetails: ErrorDetails): void {
    this.errorStatistics.totalErrors++
    this.errorStatistics.errorsByType[errorDetails.type] = 
      (this.errorStatistics.errorsByType[errorDetails.type] || 0) + 1
    this.errorStatistics.errorsByStep[errorDetails.step] = 
      (this.errorStatistics.errorsByStep[errorDetails.step] || 0) + 1
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`
  }

  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substring(2)}`
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

/**
 * シングルトンインスタンス
 */
let globalErrorHandlingService: ErrorHandlingService | null = null

export const getErrorHandlingService = (config?: Partial<ErrorHandlingConfig>): ErrorHandlingService => {
  if (!globalErrorHandlingService) {
    globalErrorHandlingService = new ErrorHandlingService(config)
  }
  return globalErrorHandlingService
}

export const resetErrorHandlingService = (): void => {
  globalErrorHandlingService = null
}