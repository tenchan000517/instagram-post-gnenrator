/**
 * Phase C3: プロンプト生成サービス
 * 
 * Phase 7設計思想に基づく統合実装：
 * - PromptTemplates: 投稿タイプ別最適化
 * - KnowledgeStructurePreserver: ナレッジ構造保持
 * - FactualConstraintsEnforcer: 事実厳守制約
 */

import { PromptTemplates, PostTypePromptTemplate } from './PromptTemplates'
import { KnowledgeStructurePreserver, KnowledgeStructure } from './KnowledgeStructurePreserver'
import { FactualConstraintsEnforcer, FactualViolation } from './FactualConstraintsEnforcer'

export interface PromptGenerationRequest {
  knowledgeContent: string      // ナレッジの内容
  postType: string             // 投稿タイプ
  userIntent: string           // ユーザーの意図
  targetAudience?: string      // ターゲット読者
  additionalConstraints?: string[] // 追加制約
}

export interface GeneratedPrompt {
  prompt: string               // 生成されたプロンプト
  structure: KnowledgeStructure // 分析されたナレッジ構造
  template: PostTypePromptTemplate // 使用されたテンプレート
  constraints: string[]        // 適用された制約
  metadata: {
    generationTime: Date
    quality: {
      structureScore: number   // 構造保持スコア
      factualScore: number     // 事実厳守スコア
      overallScore: number     // 総合スコア
    }
    warnings: string[]         // 警告事項
    recommendations: string[]  // 推奨事項
  }
}

export interface PromptValidationResult {
  isValid: boolean
  violations: FactualViolation[]
  structureScore: number
  factualScore: number
  recommendations: string[]
}

export class PromptGenerator {

  /**
   * メイン処理: 投稿タイプ別最適化プロンプトを生成
   */
  static generateOptimizedPrompt(request: PromptGenerationRequest): GeneratedPrompt {
    console.log('🚀 投稿タイプ別最適化プロンプト生成開始:', request.postType)
    
    // Step 1: ナレッジ構造分析
    const structure = KnowledgeStructurePreserver.analyzeKnowledgeStructure(request.knowledgeContent)
    console.log('📋 ナレッジ構造分析完了:', structure.structureType)
    
    // Step 2: 投稿タイプテンプレート取得
    const template = PromptTemplates.getTemplateByType(request.postType)
    console.log('📝 投稿タイプテンプレート取得:', template.postType)
    
    // Step 3: 事実厳守制約生成
    const factualConstraints = FactualConstraintsEnforcer.generateFactualConstraintsPrompt()
    
    // Step 4: 構造保持制約生成
    const structureConstraints = KnowledgeStructurePreserver.generatePreservationConstraints(structure)
    
    // Step 5: 統合プロンプト組み立て
    const integratedPrompt = this.assembleIntegratedPrompt(
      request,
      template,
      structure,
      factualConstraints,
      structureConstraints
    )
    
    // Step 6: プロンプト品質評価
    const qualityAssessment = this.assessPromptQuality(
      request.knowledgeContent,
      integratedPrompt,
      structure
    )
    
    const result: GeneratedPrompt = {
      prompt: integratedPrompt,
      structure,
      template,
      constraints: [
        ...structureConstraints.structuralConstraints,
        ...structureConstraints.contentConstraints,
        ...structureConstraints.expressionConstraints,
        ...structureConstraints.flowConstraints
      ],
      metadata: {
        generationTime: new Date(),
        quality: qualityAssessment,
        warnings: this.generateWarnings(request, structure),
        recommendations: this.generateRecommendations(request, structure, qualityAssessment)
      }
    }
    
    console.log('✅ プロンプト生成完了 - 品質スコア:', qualityAssessment.overallScore)
    return result
  }

  /**
   * 統合プロンプト組み立て
   */
  private static assembleIntegratedPrompt(
    request: PromptGenerationRequest,
    template: PostTypePromptTemplate,
    structure: KnowledgeStructure,
    factualConstraints: string,
    structureConstraints: any
  ): string {
    
    // テンプレートの変数置換
    const processedTemplate = template.template
      .replace('{knowledgeContent}', request.knowledgeContent)
      .replace('{userIntent}', request.userIntent)
    
    return `
${factualConstraints}

【投稿タイプ別最適化】
投稿タイプ: ${template.postType}
最適化方針: ${template.description}
重点分野: ${template.focusArea}

【ナレッジ構造情報】
- 構造タイプ: ${structure.structureType}
- フローパターン: ${structure.flowPattern}
- ストーリーフロー: ${structure.storyFlow.join(' → ')}
- 感情フロー: ${structure.emotionalFlow.join(' → ')}
- 説得構造: ${structure.persuasionStructure.join(' → ')}

【構造保持制約】
${structureConstraints.structuralConstraints.map((c: string) => `- ${c}`).join('\n')}
${structureConstraints.contentConstraints.map((c: string) => `- ${c}`).join('\n')}
${structureConstraints.expressionConstraints.map((c: string) => `- ${c}`).join('\n')}
${structureConstraints.flowConstraints.map((c: string) => `- ${c}`).join('\n')}

${processedTemplate}

【最終確認事項】
1. ナレッジの事実情報のみを使用しているか？
2. ナレッジの構造・フローを保持しているか？
3. 投稿タイプの特性を適切に反映しているか？
4. ユーザー意図「${request.userIntent}」に応えているか？
5. 推測・憶測による情報追加がないか？

【出力形式】
ナレッジの構造とフローを完全に保持しながら、投稿タイプ「${template.postType}」の特性に最適化されたコンテンツを生成してください。
`
  }

  /**
   * プロンプト品質評価
   */
  private static assessPromptQuality(
    originalKnowledge: string,
    generatedPrompt: string,
    structure: KnowledgeStructure
  ): { structureScore: number, factualScore: number, overallScore: number } {
    
    // 構造保持スコア（模擬評価）
    const structureValidation = KnowledgeStructurePreserver.validateStructurePreservation(
      originalKnowledge,
      generatedPrompt,
      structure
    )
    
    // 事実厳守スコア（模擬評価） 
    const factualValidation = FactualConstraintsEnforcer.calculateFactualComplianceScore(
      originalKnowledge,
      generatedPrompt
    )
    
    const structureScore = structureValidation.score
    const factualScore = factualValidation.score
    const overallScore = Math.round((structureScore + factualScore) / 2)
    
    return {
      structureScore,
      factualScore,
      overallScore
    }
  }

  /**
   * 警告事項生成
   */
  private static generateWarnings(
    request: PromptGenerationRequest,
    structure: KnowledgeStructure
  ): string[] {
    const warnings: string[] = []
    
    // ナレッジ構造の複雑性チェック
    if (structure.keyElements.length > 10) {
      warnings.push('ナレッジに多数の重要要素が含まれています。生成時に全要素の保持に注意してください。')
    }
    
    // 投稿タイプとナレッジ構造の適合性チェック
    if (request.postType === 'キャリア悩み解決法' && structure.structureType !== 'narrative') {
      warnings.push('投稿タイプとナレッジ構造の不適合が検出されました。感情的共感の表現に注意してください。')
    }
    
    if (request.postType === '業界・企業情報まとめ' && structure.structureType !== 'analytical') {
      warnings.push('情報系投稿には客観的データ表現が重要です。推測表現を避けてください。')
    }
    
    // ユーザー意図の曖昧性チェック
    if (request.userIntent.length < 10) {
      warnings.push('ユーザー意図の記述が不十分です。表現調整の方向性が不明確になる可能性があります。')
    }
    
    return warnings
  }

  /**
   * 推奨事項生成
   */
  private static generateRecommendations(
    request: PromptGenerationRequest,
    structure: KnowledgeStructure,
    quality: { structureScore: number, factualScore: number, overallScore: number }
  ): string[] {
    const recommendations: string[] = []
    
    // 品質スコアに基づく推奨
    if (quality.structureScore < 80) {
      recommendations.push('ナレッジの構造保持に注意し、原文のフローを重視してください。')
    }
    
    if (quality.factualScore < 80) {
      recommendations.push('事実厳守制約を再確認し、推測表現を完全に排除してください。')
    }
    
    // 投稿タイプ別推奨
    switch (request.postType) {
      case 'キャリア悩み解決法':
        recommendations.push('読者の感情に寄り添う表現を重視し、共感→理解→行動のフローを維持してください。')
        break
      case 'スキルアップガイド':
        recommendations.push('段階的学習プロセスを明確にし、実践的な指導表現を心がけてください。')
        break
      case '業界・企業情報まとめ':
        recommendations.push('客観的データと出典情報を重視し、中立的な情報提供を心がけてください。')
        break
      case '効率アップテクニック':
        recommendations.push('即効性と実用性を強調し、具体的な手法の説明を重視してください。')
        break
    }
    
    // 構造特性に基づく推奨
    if (structure.structureType === 'narrative') {
      recommendations.push('ストーリー性と感情の流れを重視した表現を維持してください。')
    } else if (structure.structureType === 'educational') {
      recommendations.push('体系的で分かりやすい教育的表現を心がけてください。')
    }
    
    return recommendations
  }

  /**
   * プロンプト事前検証
   */
  static validatePrompt(
    generatedPrompt: GeneratedPrompt,
    originalKnowledge: string
  ): PromptValidationResult {
    console.log('🔍 プロンプト品質検証開始')
    
    // 事実厳守検証
    const factualValidation = FactualConstraintsEnforcer.calculateFactualComplianceScore(
      originalKnowledge,
      generatedPrompt.prompt
    )
    
    // 構造保持検証
    const structureValidation = KnowledgeStructurePreserver.validateStructurePreservation(
      originalKnowledge, 
      generatedPrompt.prompt,
      generatedPrompt.structure
    )
    
    const isValid = factualValidation.criticalViolations === 0 && structureValidation.score >= 70
    
    const result: PromptValidationResult = {
      isValid,
      violations: factualValidation.violations,
      structureScore: structureValidation.score,
      factualScore: factualValidation.score,
      recommendations: [
        ...structureValidation.recommendations,
        ...factualValidation.recommendations
      ]
    }
    
    console.log('📊 検証完了:', {
      valid: isValid,
      structureScore: result.structureScore,
      factualScore: result.factualScore,
      violationsCount: result.violations.length
    })
    
    return result
  }

  /**
   * プロンプト改善提案
   */
  static suggestPromptImprovements(
    validationResult: PromptValidationResult,
    originalPrompt: GeneratedPrompt
  ): string[] {
    const improvements: string[] = []
    
    // 重要な違反に基づく改善提案
    const criticalViolations = validationResult.violations.filter(v => v.severity === 'critical')
    if (criticalViolations.length > 0) {
      improvements.push('🚨 重大な制約違反が検出されました。以下を修正してください：')
      criticalViolations.forEach(violation => {
        improvements.push(`- ${violation.description}: ${violation.suggestion}`)
      })
    }
    
    // スコア改善提案
    if (validationResult.structureScore < 70) {
      improvements.push('📋 ナレッジ構造の保持が不十分です。原文の構造・フロー・順序を再確認してください。')
    }
    
    if (validationResult.factualScore < 70) {
      improvements.push('🔍 事実厳守に問題があります。ナレッジの事実情報のみを使用し、推測表現を排除してください。')
    }
    
    // 一般的改善提案
    improvements.push('✅ Phase 7設計思想の遵守：ナレッジ自体が最適構造を内包していることを重視してください。')
    improvements.push('⚠️ 投稿タイプはフィルタリング機能のみ：構造を変更せず、表現調整のみ実施してください。')
    
    return improvements
  }

  /**
   * バッチプロンプト生成（複数投稿タイプ対応）
   */
  static generateMultiTypePrompts(
    knowledgeContent: string,
    userIntent: string,
    postTypes: string[]
  ): Map<string, GeneratedPrompt> {
    console.log('🔄 複数投稿タイプ対応プロンプト生成開始')
    
    const results = new Map<string, GeneratedPrompt>()
    
    postTypes.forEach(postType => {
      try {
        const request: PromptGenerationRequest = {
          knowledgeContent,
          postType,
          userIntent
        }
        
        const generated = this.generateOptimizedPrompt(request)
        results.set(postType, generated)
        
        console.log(`✅ ${postType}用プロンプト生成完了`)
      } catch (error) {
        console.error(`❌ ${postType}用プロンプト生成失敗:`, error)
      }
    })
    
    console.log('🎉 バッチ生成完了:', results.size, '件')
    return results
  }

  /**
   * プロンプトテンプレート情報取得
   */
  static getAvailablePostTypes(): string[] {
    return PromptTemplates.getPostTypes()
  }

  /**
   * プロンプト生成統計情報
   */
  static getGenerationStatistics(results: GeneratedPrompt[]): {
    averageStructureScore: number
    averageFactualScore: number  
    averageOverallScore: number
    bestPerformingType: string
    commonWarnings: string[]
    qualityDistribution: Record<string, number>
  } {
    if (results.length === 0) {
      return {
        averageStructureScore: 0,
        averageFactualScore: 0,
        averageOverallScore: 0,
        bestPerformingType: '',
        commonWarnings: [],
        qualityDistribution: {}
      }
    }
    
    const averageStructureScore = results.reduce((sum, r) => sum + r.metadata.quality.structureScore, 0) / results.length
    const averageFactualScore = results.reduce((sum, r) => sum + r.metadata.quality.factualScore, 0) / results.length
    const averageOverallScore = results.reduce((sum, r) => sum + r.metadata.quality.overallScore, 0) / results.length
    
    const bestPerforming = results.reduce((best, current) => 
      current.metadata.quality.overallScore > best.metadata.quality.overallScore ? current : best
    )
    
    const allWarnings = results.flatMap(r => r.metadata.warnings)
    const warningCounts = allWarnings.reduce((acc, warning) => {
      acc[warning] = (acc[warning] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const commonWarnings = Object.entries(warningCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([warning]) => warning)
    
    const qualityDistribution = results.reduce((dist, result) => {
      const score = result.metadata.quality.overallScore
      const range = score >= 90 ? 'Excellent' : score >= 80 ? 'Good' : score >= 70 ? 'Fair' : 'Poor'
      dist[range] = (dist[range] || 0) + 1
      return dist
    }, {} as Record<string, number>)
    
    return {
      averageStructureScore: Math.round(averageStructureScore),
      averageFactualScore: Math.round(averageFactualScore),
      averageOverallScore: Math.round(averageOverallScore),
      bestPerformingType: bestPerforming.template.postType,
      commonWarnings,
      qualityDistribution
    }
  }
}