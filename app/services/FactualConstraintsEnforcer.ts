/**
 * Phase C3: 事実厳守のための制約指示
 * 
 * Phase 7設計思想に基づく実装：
 * - ナレッジにない情報の追加禁止
 * - 推測・想像による補完禁止  
 * - データの改変・誇張禁止
 */

export interface FactualConstraint {
  type: 'prohibition' | 'requirement' | 'validation'
  category: 'information' | 'data' | 'interpretation' | 'expression'
  constraint: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  enforcementMethod: string
}

export interface FactualViolation {
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  location: string
  suggestion: string
}

export class FactualConstraintsEnforcer {

  /**
   * 事実厳守制約の定義
   */
  static readonly FACTUAL_CONSTRAINTS: FactualConstraint[] = [
    // 情報追加の禁止
    {
      type: 'prohibition',
      category: 'information', 
      constraint: 'ナレッジにない情報の追加を厳格禁止',
      severity: 'critical',
      enforcementMethod: '元データとの差分チェック'
    },
    {
      type: 'prohibition',
      category: 'information',
      constraint: '推測・憶測による情報補完を厳格禁止',
      severity: 'critical', 
      enforcementMethod: '推測キーワード検出'
    },
    {
      type: 'prohibition',
      category: 'information',
      constraint: '想像・創作による内容追加を厳格禁止',
      severity: 'critical',
      enforcementMethod: '創作表現検出'
    },
    
    // データの保護
    {
      type: 'prohibition',
      category: 'data',
      constraint: '数値・統計データの改変を厳格禁止',
      severity: 'critical',
      enforcementMethod: '数値データ照合'
    },
    {
      type: 'prohibition',
      category: 'data',
      constraint: 'データの誇張・歪曲を厳格禁止',
      severity: 'critical',
      enforcementMethod: 'データ表現比較'
    },
    {
      type: 'prohibition', 
      category: 'data',
      constraint: '出典情報の変更・削除を厳格禁止',
      severity: 'high',
      enforcementMethod: '出典情報一致確認'
    },
    
    // 解釈の制限
    {
      type: 'prohibition',
      category: 'interpretation',
      constraint: 'ナレッジの意味・解釈の勝手な変更を禁止',
      severity: 'high', 
      enforcementMethod: '意味分析比較'
    },
    {
      type: 'requirement',
      category: 'interpretation',
      constraint: 'ナレッジの文脈と意図を完全保持',
      severity: 'high',
      enforcementMethod: '文脈一貫性チェック'
    },
    
    // 表現の制限
    {
      type: 'requirement',
      category: 'expression',
      constraint: 'ユーザー意図に合わせた表現調整のみ許可',
      severity: 'medium',
      enforcementMethod: '調整範囲検証'
    },
    {
      type: 'prohibition',
      category: 'expression', 
      constraint: 'ナレッジの本質的価値を損なう表現変更を禁止',
      severity: 'high',
      enforcementMethod: '価値保持評価'
    }
  ]

  /**
   * 事実厳守プロンプト制約を生成
   */
  static generateFactualConstraintsPrompt(): string {
    const criticalConstraints = this.FACTUAL_CONSTRAINTS.filter(c => c.severity === 'critical')
    const highConstraints = this.FACTUAL_CONSTRAINTS.filter(c => c.severity === 'high')
    
    return `
【事実厳守制約】

🚨 **絶対遵守事項（CRITICAL）** 🚨
${criticalConstraints.map(c => `- ${c.constraint}`).join('\n')}

⚠️ **必須遵守事項（HIGH）** ⚠️ 
${highConstraints.map(c => `- ${c.constraint}`).join('\n')}

【禁止行為の具体例】
❌ ナレッジにない情報の追加
   - 「おそらく〜だろう」「〜と推測される」
   - 「一般的に〜である」「通常は〜」
   - 「〜の可能性が高い」「〜と考えられる」

❌ 推測・憶測による補完
   - データの空欄を推測で埋める
   - 不明な情報を常識で補う
   - 関連情報から類推して追加

❌ データの改変・誇張
   - 「約〜」を具体的数値に変更
   - 効果を大げさに表現
   - 統計データの四捨五入・概算化

❌ 意味・解釈の変更
   - ナレッジの主旨を別の意味に変更
   - 文脈を無視した一部分の抜粋
   - 因果関係の勝手な解釈

【許可される調整の範囲】
✅ 投稿タイプに合わせた表現調整
   - 感情的表現 ↔ 客観的表現
   - 丁寧語調整・文体統一
   - 読みやすさのための構成調整

✅ ユーザー意図の反映
   - 「〜な投稿にしたい」に応じた表現調整
   - ターゲット読者に合わせた語調調整
   - 伝達目的に応じた強調調整

【検証方法】
1. 情報の源泉確認：全ての情報がナレッジに存在するか
2. データの一致確認：数値・統計が完全一致しているか
3. 意味の保持確認：ナレッジの意図が保持されているか
4. 調整範囲確認：許可された調整範囲内か

【違反した場合】
- 生成を即座に中断
- ナレッジの事実のみを使用して再生成
- 違反箇所を明確に指摘
`
  }

  /**
   * 推測・憶測表現を検出
   */
  static detectSpeculativeLanguage(content: string): string[] {
    const speculativePatterns = [
      /おそらく|恐らく/g,
      /〜だろう|〜でしょう/g,
      /と思われる|と考えられる/g,
      /推測される|予想される/g,
      /可能性が高い|と見られる/g,
      /一般的に|通常は|普通は/g,
      /〜かもしれない|〜のはず/g,
      /多分|たぶん|きっと/g
    ]
    
    const detectedExpressions: string[] = []
    speculativePatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        detectedExpressions.push(...matches)
      }
    })
    
    return [...new Set(detectedExpressions)]
  }

  /**
   * データ改変を検出
   */
  static detectDataManipulation(originalData: string, generatedData: string): FactualViolation[] {
    const violations: FactualViolation[] = []
    
    // 数値データの比較
    const originalNumbers = this.extractNumbers(originalData)
    const generatedNumbers = this.extractNumbers(generatedData)
    
    // 数値の増減チェック
    originalNumbers.forEach((num, index) => {
      if (generatedNumbers[index] && generatedNumbers[index] !== num) {
        violations.push({
          type: 'data_manipulation',
          severity: 'critical',
          description: `数値データが${num}から${generatedNumbers[index]}に変更されています`,
          location: `数値[${index}]`,
          suggestion: `元の数値${num}を使用してください`
        })
      }
    })
    
    // 欠落した数値のチェック
    if (originalNumbers.length > generatedNumbers.length) {
      violations.push({
        type: 'data_loss',
        severity: 'high',
        description: '元データの数値情報が欠落しています',
        location: '数値データ',
        suggestion: '全ての数値データを保持してください'
      })
    }
    
    return violations
  }

  /**
   * 事実に基づかない情報追加を検出
   */
  static detectUnfoundedInformation(
    originalKnowledge: string, 
    generatedContent: string
  ): FactualViolation[] {
    const violations: FactualViolation[] = []
    
    // 生成コンテンツの各文を分析
    const generatedSentences = generatedContent.split(/[。！？]/)
    
    generatedSentences.forEach((sentence, index) => {
      if (sentence.trim().length === 0) return
      
      // 元ナレッジに存在しない重要な情報かチェック
      if (this.containsSignificantInformation(sentence) && 
          !this.isInformationPresentInKnowledge(sentence, originalKnowledge)) {
        
        violations.push({
          type: 'unfounded_information',
          severity: 'critical',
          description: 'ナレッジに存在しない情報が追加されています',
          location: `文[${index}]: ${sentence.substring(0, 50)}...`,
          suggestion: 'ナレッジの事実情報のみを使用してください'
        })
      }
    })
    
    return violations
  }

  /**
   * 事実厳守スコアを計算
   */
  static calculateFactualComplianceScore(
    originalKnowledge: string,
    generatedContent: string
  ): {
    score: number
    violations: FactualViolation[]
    criticalViolations: number
    highViolations: number
    recommendations: string[]
  } {
    const allViolations: FactualViolation[] = []
    
    // 各種違反検出
    allViolations.push(...this.detectDataManipulation(originalKnowledge, generatedContent))
    allViolations.push(...this.detectUnfoundedInformation(originalKnowledge, generatedContent))
    
    // 推測表現の検出
    const speculativeExpressions = this.detectSpeculativeLanguage(generatedContent)
    speculativeExpressions.forEach(expr => {
      allViolations.push({
        type: 'speculative_language',
        severity: 'critical',
        description: `推測表現「${expr}」が使用されています`,
        location: '推測表現',
        suggestion: '確実な事実のみを記述してください'
      })
    })
    
    // 違反レベル別カウント
    const criticalViolations = allViolations.filter(v => v.severity === 'critical').length
    const highViolations = allViolations.filter(v => v.severity === 'high').length
    
    // スコア計算（100点満点）
    const totalPenalty = (criticalViolations * 20) + (highViolations * 10)
    const score = Math.max(0, 100 - totalPenalty)
    
    // 推奨事項の生成
    const recommendations = this.generateRecommendations(allViolations)
    
    return {
      score,
      violations: allViolations,
      criticalViolations,
      highViolations,
      recommendations
    }
  }

  /**
   * 制約違反に基づく推奨事項を生成
   */
  private static generateRecommendations(violations: FactualViolation[]): string[] {
    const recommendations: string[] = []
    
    if (violations.some(v => v.type === 'unfounded_information')) {
      recommendations.push('ナレッジに明記されている事実のみを使用してください')
    }
    
    if (violations.some(v => v.type === 'data_manipulation')) {
      recommendations.push('数値データは元の通りに正確に記載してください')
    }
    
    if (violations.some(v => v.type === 'speculative_language')) {
      recommendations.push('推測・憶測表現を排除し、確実な事実のみを記述してください')
    }
    
    return recommendations
  }

  // ヘルパーメソッド群
  private static extractNumbers(text: string): string[] {
    const numberPattern = /\d+(?:\.\d+)?(?:[%％万円年歳時間分秒])?/g
    return text.match(numberPattern) || []
  }

  private static containsSignificantInformation(sentence: string): boolean {
    // 重要な情報を含む文を判定
    const significantPatterns = [
      /\d+/,           // 数値
      /効果|結果|成果/, // 効果・結果
      /方法|手順|手法/, // 方法・手順  
      /理由|原因|要因/, // 理由・原因
      /データ|統計|調査/ // データ・統計
    ]
    
    return significantPatterns.some(pattern => pattern.test(sentence))
  }

  private static isInformationPresentInKnowledge(sentence: string, knowledge: string): boolean {
    // 簡単な類似度チェック（実装は簡略化）
    const sentenceWords = sentence.split(/\s+/)
    const importantWords = sentenceWords.filter(word => word.length >= 2)
    
    return importantWords.every(word => knowledge.includes(word)) ||
           knowledge.includes(sentence.substring(0, Math.min(20, sentence.length)))
  }

  /**
   * リアルタイム事実チェック
   */
  static performRealTimeFactCheck(
    originalKnowledge: string,
    partialGeneration: string,
    onViolation: (violation: FactualViolation) => void
  ): void {
    // リアルタイムでの違反検出
    const violations = this.detectUnfoundedInformation(originalKnowledge, partialGeneration)
    violations.forEach(violation => {
      if (violation.severity === 'critical') {
        onViolation(violation)
      }
    })
  }
}