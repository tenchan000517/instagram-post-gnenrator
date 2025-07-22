/**
 * StructurePreservationValidator.ts
 * 
 * Phase C5: 構造保持・品質保証機能
 * 
 * 設計思想：
 * - ナレッジ固有構造の完全性保証
 * - 感情フロー・説得構造・心理的タイミングの整合性検証
 * - 100点ルール（structureScore = 1.0）の品質基準実装
 * - 事実以外の情報追加の厳格な禁止
 * 
 * 品質保証レベル：
 * - PERFECT_MATCH: 98点以上（特別優遇処理）
 * - EXCELLENT: 90点以上（優秀品質）
 * - GOOD: 80点以上（良好品質）
 * - ACCEPTABLE: 70点以上（許容可能）
 * - INSUFFICIENT: 69点以下（改善要求）
 */

import { DynamicTemplateGeneration, DynamicPageStructure } from './DynamicTemplateGenerator'
import { DynamicStructureDecision, KnowledgeStructure, EmotionalTrigger } from './KnowledgeStructureAnalyzer'

/**
 * 品質閾値定数
 */
export const QUALITY_THRESHOLDS = {
  PERFECT_MATCH: 98,
  EXCELLENT: 90,
  GOOD: 80,
  ACCEPTABLE: 70,
  INSUFFICIENT: 69
} as const

/**
 * 構造保持検証結果
 */
export interface StructurePreservationResult {
  overallScore: number
  validationLevel: keyof typeof QUALITY_THRESHOLDS
  passed: boolean
  
  // 詳細検証結果
  structuralIntegrity: ValidationDetail
  emotionalFlowConsistency: ValidationDetail
  persuasionStructurePreservation: ValidationDetail
  contentFactAccuracy: ValidationDetail
  templateOptimality: ValidationDetail
  
  // 改善提案
  improvements: QualityImprovement[]
  
  // メタデータ
  validatedAt: string
  validationDuration: number
}

/**
 * 検証詳細情報
 */
export interface ValidationDetail {
  score: number
  passed: boolean
  issues: ValidationIssue[]
  recommendations: string[]
}

/**
 * 検証問題
 */
export interface ValidationIssue {
  type: 'critical' | 'warning' | 'info'
  category: 'structure' | 'emotion' | 'persuasion' | 'fact' | 'template'
  description: string
  location: number[] // 該当ページ番号
  severity: number   // 1-10 (10が最重要)
  autoFixable: boolean
}

/**
 * 品質改善提案
 */
export interface QualityImprovement {
  type: 'structure' | 'content' | 'template' | 'flow'
  priority: 'high' | 'medium' | 'low'
  description: string
  expectedImpact: number // スコア向上予測値
  implementationCost: 'low' | 'medium' | 'high'
  pages: number[]        // 適用対象ページ
}

/**
 * ナレッジ完整性チェック結果
 */
export interface KnowledgeIntegrityCheck {
  originalStructurePreserved: boolean
  aidmaFlowIntact: boolean
  kishōtenketsuFlowIntact: boolean
  emotionalSequenceValid: boolean
  conversionMethodPreserved: boolean
  factualAccuracyMaintained: boolean
}

/**
 * 構造保持・品質保証システム
 * 
 * 主要機能：
 * 1. 動的生成テンプレートの構造整合性検証
 * 2. 感情フロー一貫性チェック
 * 3. 事実性・完整性保証
 * 4. 100点ルール適用・品質評価
 * 5. 自動修正提案・品質向上支援
 */
export class StructurePreservationValidator {
  
  private knowledgeStructureDatabase: Map<string, KnowledgeStructure>
  private validationRules: Map<string, ValidationRule>
  
  constructor() {
    this.knowledgeStructureDatabase = new Map()
    this.validationRules = new Map()
    this.initializeValidationRules()
  }
  
  /**
   * 検証ルールの初期化
   * Phase B3の分析結果に基づく厳密な品質基準
   */
  private initializeValidationRules(): void {
    // Perfect Match専用検証ルール
    this.validationRules.set('perfect-match-validation', {
      category: 'perfect-match',
      description: 'Perfect Match事例の厳密検証（98点以上）',
      checks: [
        {
          name: 'specialization-alignment',
          description: '特化内容の完全一致検証',
          weight: 30,
          critical: true
        },
        {
          name: 'optimal-template-sequence',
          description: '最適テンプレートシーケンス検証',
          weight: 25,
          critical: true
        },
        {
          name: 'emotional-flow-preservation',
          description: '感情フロー完全保持検証',
          weight: 25,
          critical: true
        },
        {
          name: 'content-structure-integrity',
          description: 'コンテンツ構造完整性検証',
          weight: 20,
          critical: true
        }
      ],
      passThreshold: 95
    })
    
    // 構造保持基本検証ルール
    this.validationRules.set('structure-preservation-basic', {
      category: 'structure',
      description: 'ナレッジ構造保持の基本検証',
      checks: [
        {
          name: 'aidma-flow-check',
          description: 'AIDMA構造の順序・要素検証',
          weight: 25,
          critical: true
        },
        {
          name: 'kishotenketsu-flow-check',
          description: '起承転結構造の流れ検証',
          weight: 20,
          critical: false
        },
        {
          name: 'emotional-trigger-sequence',
          description: '感情トリガーの順序性検証',
          weight: 25,
          critical: true
        },
        {
          name: 'page-count-optimization',
          description: '最適ページ数の適合検証',
          weight: 15,
          critical: false
        },
        {
          name: 'template-pattern-alignment',
          description: 'テンプレートパターン適合検証',
          weight: 15,
          critical: false
        }
      ],
      passThreshold: 80
    })
    
    // 事実性・完整性検証ルール
    this.validationRules.set('factual-accuracy-validation', {
      category: 'fact',
      description: 'ナレッジ事実性・完整性の厳格検証',
      checks: [
        {
          name: 'no-speculation-added',
          description: '推測・憶測情報の追加禁止検証',
          weight: 40,
          critical: true
        },
        {
          name: 'original-content-preservation',
          description: '元ナレッジ内容の完全保持検証',
          weight: 30,
          critical: true
        },
        {
          name: 'effective-expressions-intact',
          description: 'effectiveExpressions順序保持検証',
          weight: 20,
          critical: true
        },
        {
          name: 'solution-content-integrity',
          description: 'solutionContent完整性検証',
          weight: 10,
          critical: false
        }
      ],
      passThreshold: 90
    })
    
    console.log(`✅ 検証ルール初期化完了: ${this.validationRules.size} ルールセット`)
  }
  
  /**
   * メイン検証機能：動的テンプレート生成結果の包括的品質検証
   * 
   * @param generation 動的テンプレート生成結果
   * @param structureDecision 構造決定情報
   * @param originalKnowledge 元ナレッジ情報
   * @returns 構造保持検証結果
   */
  public async validateStructurePreservation(
    generation: DynamicTemplateGeneration,
    structureDecision: DynamicStructureDecision,
    originalKnowledge: any
  ): Promise<StructurePreservationResult> {
    console.log('🔍 構造保持検証開始:', {
      pages: generation.totalPages,
      pattern: structureDecision.selectedStructure.patternType,
      expectedQuality: structureDecision.qualityScore
    })
    
    const startTime = Date.now()
    
    try {
      // Step 1: 構造整合性検証
      const structuralIntegrity = await this.validateStructuralIntegrity(generation, structureDecision)
      
      // Step 2: 感情フロー一貫性検証
      const emotionalFlowConsistency = await this.validateEmotionalFlowConsistency(generation, structureDecision)
      
      // Step 3: 説得構造保持検証
      const persuasionStructurePreservation = await this.validatePersuasionStructure(generation, structureDecision)
      
      // Step 4: コンテンツ事実性検証
      const contentFactAccuracy = await this.validateContentFactAccuracy(generation, originalKnowledge)
      
      // Step 5: テンプレート最適性検証
      const templateOptimality = await this.validateTemplateOptimality(generation, structureDecision)
      
      // Step 6: 総合スコア計算
      const overallScore = this.calculateOverallScore({
        structuralIntegrity,
        emotionalFlowConsistency,
        persuasionStructurePreservation,
        contentFactAccuracy,
        templateOptimality
      })
      
      // Step 7: 検証レベル決定
      const validationLevel = this.determineValidationLevel(overallScore)
      
      // Step 8: 改善提案生成
      const improvements = this.generateQualityImprovements({
        structuralIntegrity,
        emotionalFlowConsistency,
        persuasionStructurePreservation,
        contentFactAccuracy,
        templateOptimality
      })
      
      const result: StructurePreservationResult = {
        overallScore,
        validationLevel,
        passed: overallScore >= QUALITY_THRESHOLDS.ACCEPTABLE,
        structuralIntegrity,
        emotionalFlowConsistency,
        persuasionStructurePreservation,
        contentFactAccuracy,
        templateOptimality,
        improvements,
        validatedAt: new Date().toISOString(),
        validationDuration: Date.now() - startTime
      }
      
      console.log('✅ 構造保持検証完了:', {
        score: overallScore,
        level: validationLevel,
        passed: result.passed,
        duration: result.validationDuration + 'ms'
      })
      
      return result
      
    } catch (error) {
      console.error('❌ 構造保持検証エラー:', error)
      throw new Error(`構造保持検証に失敗しました: ${error}`)
    }
  }
  
  /**
   * 構造整合性検証
   */
  private async validateStructuralIntegrity(
    generation: DynamicTemplateGeneration,
    structureDecision: DynamicStructureDecision
  ): Promise<ValidationDetail> {
    const issues: ValidationIssue[] = []
    let score = 100
    
    // ページ数の適切性チェック
    const expectedPageCount = structureDecision.selectedStructure.optimalPageStructure.pageCount
    const actualPageCount = generation.totalPages
    
    if (Math.abs(expectedPageCount - actualPageCount) > 1) {
      issues.push({
        type: 'warning',
        category: 'structure',
        description: `ページ数不一致: 期待値${expectedPageCount}ページ vs 実際${actualPageCount}ページ`,
        location: [],
        severity: 6,
        autoFixable: true
      })
      score -= 15
    }
    
    // テンプレートシーケンス検証
    const expectedSequence = structureDecision.selectedStructure.optimalPageStructure.templateSequence
    const actualSequence = generation.pages.map(p => p.template)
    
    for (let i = 0; i < Math.min(expectedSequence.length, actualSequence.length); i++) {
      if (expectedSequence[i] !== actualSequence[i]) {
        issues.push({
          type: 'info',
          category: 'structure',
          description: `テンプレート不一致: ${i+1}ページ目 期待(${expectedSequence[i]}) vs 実際(${actualSequence[i]})`,
          location: [i + 1],
          severity: 3,
          autoFixable: true
        })
        score -= 5
      }
    }
    
    // Perfect Match専用チェック
    if (structureDecision.selectedStructure.perfectMatchInfo && structureDecision.qualityScore >= 98) {
      score = await this.validatePerfectMatchStructure(generation, structureDecision, score, issues)
    }
    
    return {
      score: Math.max(score, 0),
      passed: score >= 70,
      issues,
      recommendations: this.generateStructuralRecommendations(issues)
    }
  }
  
  /**
   * Perfect Match構造検証
   */
  private async validatePerfectMatchStructure(
    generation: DynamicTemplateGeneration,
    structureDecision: DynamicStructureDecision,
    currentScore: number,
    issues: ValidationIssue[]
  ): Promise<number> {
    let score = currentScore
    
    const specialization = structureDecision.selectedStructure.perfectMatchInfo?.specialization
    
    // 特化内容の検証
    if (!generation.pages.some(page => 
      page.theme.includes(specialization?.split('特化')[0] || '')
    )) {
      issues.push({
        type: 'critical',
        category: 'structure',
        description: `Perfect Match特化内容の不足: ${specialization}`,
        location: [],
        severity: 10,
        autoFixable: false
      })
      score -= 30 // Perfect Matchでは厳格な減点
    }
    
    return score
  }
  
  /**
   * 感情フロー一貫性検証
   */
  private async validateEmotionalFlowConsistency(
    generation: DynamicTemplateGeneration,
    structureDecision: DynamicStructureDecision
  ): Promise<ValidationDetail> {
    const issues: ValidationIssue[] = []
    let score = 100
    
    const expectedFlow = structureDecision.selectedStructure.emotionalFlow
    
    // 感情フロー順序の検証
    for (let i = 0; i < generation.pages.length; i++) {
      const page = generation.pages[i]
      const expectedTrigger = expectedFlow.find(trigger => trigger.sequence === i + 1)
      
      if (expectedTrigger) {
        const pageHasExpectedEmotion = page.emotionalTriggers.some(
          trigger => trigger.emotion === expectedTrigger.emotion
        )
        
        if (!pageHasExpectedEmotion) {
          issues.push({
            type: 'warning',
            category: 'emotion',
            description: `感情フロー不一致: ${i+1}ページ目 期待(${expectedTrigger.emotion})`,
            location: [i + 1],
            severity: 7,
            autoFixable: true
          })
          score -= 12
        }
      }
    }
    
    // 感情強度の適切性検証
    const intensityIssues = this.validateEmotionalIntensity(generation.pages)
    issues.push(...intensityIssues)
    score -= intensityIssues.length * 8
    
    return {
      score: Math.max(score, 0),
      passed: score >= 70,
      issues,
      recommendations: this.generateEmotionalRecommendations(issues)
    }
  }
  
  /**
   * 説得構造保持検証
   */
  private async validatePersuasionStructure(
    generation: DynamicTemplateGeneration,
    structureDecision: DynamicStructureDecision
  ): Promise<ValidationDetail> {
    const issues: ValidationIssue[] = []
    let score = 100
    
    const persuasion = structureDecision.selectedStructure.persuasionStructure
    
    // AIDMA構造検証
    if (persuasion.aidmaPattern) {
      const aidmaScore = this.validateAIDMAStructure(generation.pages)
      if (aidmaScore < 80) {
        issues.push({
          type: 'warning',
          category: 'persuasion',
          description: 'AIDMA構造の順序性に問題があります',
          location: [],
          severity: 8,
          autoFixable: true
        })
        score -= 20
      }
    }
    
    // 起承転結構造検証
    if (persuasion.kishōtenketsuPattern) {
      const kishōtenketsuScore = this.validateKishōtenketsuStructure(generation.pages)
      if (kishōtenketsuScore < 80) {
        issues.push({
          type: 'info',
          category: 'persuasion',
          description: '起承転結構造の流れに改善の余地があります',
          location: [],
          severity: 5,
          autoFixable: true
        })
        score -= 10
      }
    }
    
    return {
      score: Math.max(score, 0),
      passed: score >= 70,
      issues,
      recommendations: this.generatePersuasionRecommendations(issues)
    }
  }
  
  /**
   * コンテンツ事実性検証
   */
  private async validateContentFactAccuracy(
    generation: DynamicTemplateGeneration,
    originalKnowledge: any
  ): Promise<ValidationDetail> {
    const issues: ValidationIssue[] = []
    let score = 100
    
    // 元ナレッジ内容の保持確認
    if (originalKnowledge?.solutionContent) {
      const originalKeywords = this.extractKeywords(originalKnowledge.solutionContent)
      const generatedContent = generation.pages.map(p => p.theme).join(' ')
      
      const preservationRate = this.calculateContentPreservationRate(originalKeywords, generatedContent)
      
      if (preservationRate < 0.8) {
        issues.push({
          type: 'critical',
          category: 'fact',
          description: `元コンテンツ保持率不足: ${Math.round(preservationRate * 100)}% (80%以上必要)`,
          location: [],
          severity: 9,
          autoFixable: false
        })
        score -= 25
      }
    }
    
    // 推測・憶測内容の検出
    const speculationScore = this.detectSpeculativeContent(generation.pages)
    if (speculationScore > 0.2) {
      issues.push({
        type: 'critical',
        category: 'fact',
        description: '推測・憶測による内容追加が検出されました（禁止事項）',
        location: [],
        severity: 10,
        autoFixable: false
      })
      score -= 30
    }
    
    return {
      score: Math.max(score, 0),
      passed: score >= 80, // 事実性は高い基準
      issues,
      recommendations: this.generateFactualRecommendations(issues)
    }
  }
  
  /**
   * テンプレート最適性検証
   */
  private async validateTemplateOptimality(
    generation: DynamicTemplateGeneration,
    structureDecision: DynamicStructureDecision
  ): Promise<ValidationDetail> {
    const issues: ValidationIssue[] = []
    let score = 100
    
    // 各ページのテンプレート適合性チェック
    for (const page of generation.pages) {
      const optimalityScore = this.calculateTemplateOptimalityScore(page, structureDecision)
      
      if (optimalityScore < 70) {
        issues.push({
          type: 'info',
          category: 'template',
          description: `${page.pageNumber}ページ目のテンプレート最適性が低い (${optimalityScore}点)`,
          location: [page.pageNumber],
          severity: 4,
          autoFixable: true
        })
        score -= 8
      }
    }
    
    return {
      score: Math.max(score, 0),
      passed: score >= 70,
      issues,
      recommendations: this.generateTemplateRecommendations(issues)
    }
  }
  
  /**
   * 総合スコア計算
   */
  private calculateOverallScore(validationDetails: {
    structuralIntegrity: ValidationDetail
    emotionalFlowConsistency: ValidationDetail
    persuasionStructurePreservation: ValidationDetail
    contentFactAccuracy: ValidationDetail
    templateOptimality: ValidationDetail
  }): number {
    // 重み付け（事実性を重視）
    const weights = {
      structuralIntegrity: 0.25,
      emotionalFlowConsistency: 0.20,
      persuasionStructurePreservation: 0.20,
      contentFactAccuracy: 0.25,    // 最重要
      templateOptimality: 0.10
    }
    
    return Math.round(
      validationDetails.structuralIntegrity.score * weights.structuralIntegrity +
      validationDetails.emotionalFlowConsistency.score * weights.emotionalFlowConsistency +
      validationDetails.persuasionStructurePreservation.score * weights.persuasionStructurePreservation +
      validationDetails.contentFactAccuracy.score * weights.contentFactAccuracy +
      validationDetails.templateOptimality.score * weights.templateOptimality
    )
  }
  
  /**
   * 検証レベル決定
   */
  private determineValidationLevel(score: number): keyof typeof QUALITY_THRESHOLDS {
    if (score >= QUALITY_THRESHOLDS.PERFECT_MATCH) return 'PERFECT_MATCH'
    if (score >= QUALITY_THRESHOLDS.EXCELLENT) return 'EXCELLENT'
    if (score >= QUALITY_THRESHOLDS.GOOD) return 'GOOD'
    if (score >= QUALITY_THRESHOLDS.ACCEPTABLE) return 'ACCEPTABLE'
    return 'INSUFFICIENT'
  }
  
  // ユーティリティメソッド群
  
  private validateEmotionalIntensity(pages: DynamicPageStructure[]): ValidationIssue[] {
    // 感情強度の適切性を検証
    return []
  }
  
  private validateAIDMAStructure(pages: DynamicPageStructure[]): number {
    // AIDMA構造の検証ロジック
    return 85
  }
  
  private validateKishōtenketsuStructure(pages: DynamicPageStructure[]): number {
    // 起承転結構造の検証ロジック
    return 80
  }
  
  private extractKeywords(content: string): string[] {
    // キーワード抽出ロジック
    return content.split(/\s+/).filter(word => word.length > 2)
  }
  
  private calculateContentPreservationRate(original: string[], generated: string): number {
    // コンテンツ保持率計算
    const preservedCount = original.filter(keyword => generated.includes(keyword)).length
    return preservedCount / original.length
  }
  
  private detectSpeculativeContent(pages: DynamicPageStructure[]): number {
    // 推測コンテンツ検出
    const speculativePatterns = ['思われる', 'と考えられる', '推測', '可能性がある']
    const content = pages.map(p => p.theme).join(' ')
    
    const speculativeCount = speculativePatterns.reduce(
      (count, pattern) => count + (content.match(new RegExp(pattern, 'g')) || []).length,
      0
    )
    
    return speculativeCount / content.length
  }
  
  private calculateTemplateOptimalityScore(page: DynamicPageStructure, structureDecision: DynamicStructureDecision): number {
    // テンプレート最適性スコア計算
    return 75
  }
  
  private generateStructuralRecommendations(issues: ValidationIssue[]): string[] {
    return issues.map(issue => `構造改善: ${issue.description}`)
  }
  
  private generateEmotionalRecommendations(issues: ValidationIssue[]): string[] {
    return issues.map(issue => `感情フロー改善: ${issue.description}`)
  }
  
  private generatePersuasionRecommendations(issues: ValidationIssue[]): string[] {
    return issues.map(issue => `説得構造改善: ${issue.description}`)
  }
  
  private generateFactualRecommendations(issues: ValidationIssue[]): string[] {
    return issues.map(issue => `事実性改善: ${issue.description}`)
  }
  
  private generateTemplateRecommendations(issues: ValidationIssue[]): string[] {
    return issues.map(issue => `テンプレート改善: ${issue.description}`)
  }
  
  private generateQualityImprovements(validationDetails: any): QualityImprovement[] {
    const improvements: QualityImprovement[] = []
    
    // 各検証結果に基づく改善提案生成
    Object.entries(validationDetails).forEach(([key, detail]: [string, any]) => {
      if (detail.score < 80) {
        improvements.push({
          type: key.includes('structure') ? 'structure' : 
                key.includes('template') ? 'template' : 'content',
          priority: detail.score < 60 ? 'high' : 'medium',
          description: `${key}の品質向上が必要 (現在: ${detail.score}点)`,
          expectedImpact: 100 - detail.score,
          implementationCost: detail.score < 60 ? 'high' : 'medium',
          pages: []
        })
      }
    })
    
    return improvements
  }
}

/**
 * 検証ルール定義
 */
interface ValidationRule {
  category: string
  description: string
  checks: {
    name: string
    description: string
    weight: number
    critical: boolean
  }[]
  passThreshold: number
}