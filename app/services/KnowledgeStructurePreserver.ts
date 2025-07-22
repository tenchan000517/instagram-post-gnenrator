/**
 * Phase C3: ナレッジ構造保持のためのプロンプト構造設計
 * 
 * Phase 7設計思想に基づく実装：
 * - ナレッジ固有のストーリーフロー維持
 * - 感情の流れ・説得構造の保持
 * - ページ構成・表現順序の尊重
 */

export interface KnowledgeStructure {
  // ナレッジの基本構造
  storyFlow: string[]           // ストーリーフロー（起承転結など）
  emotionalFlow: string[]       // 感情の流れ（共感→理解→行動など）
  persuasionStructure: string[] // 説得構造（AIDMA、問題→解決など）
  pageComposition: string[]     // ページ構成・表現順序
  
  // 構造の特性
  structureType: 'narrative' | 'educational' | 'analytical' | 'practical'
  flowPattern: 'linear' | 'cyclical' | 'branching' | 'layered'
  
  // 重要な要素
  keyElements: string[]         // 保持すべき重要要素
  criticalPoints: string[]      // 絶対に変更してはいけない要素
  connectionPoints: string[]    // 要素間の重要な接続点
}

export interface KnowledgePreservationConstraints {
  structuralConstraints: string[]  // 構造的制約
  contentConstraints: string[]     // 内容的制約  
  expressionConstraints: string[]  // 表現的制約
  flowConstraints: string[]        // フロー的制約
}

export class KnowledgeStructurePreserver {

  /**
   * ナレッジからその固有構造を分析・抽出
   */
  static analyzeKnowledgeStructure(knowledgeContent: string): KnowledgeStructure {
    // ナレッジの構造パターンを分析
    const structureType = this.detectStructureType(knowledgeContent)
    const flowPattern = this.detectFlowPattern(knowledgeContent)
    
    return {
      storyFlow: this.extractStoryFlow(knowledgeContent, structureType),
      emotionalFlow: this.extractEmotionalFlow(knowledgeContent, structureType),
      persuasionStructure: this.extractPersuasionStructure(knowledgeContent, structureType),
      pageComposition: this.extractPageComposition(knowledgeContent),
      
      structureType,
      flowPattern,
      
      keyElements: this.identifyKeyElements(knowledgeContent),
      criticalPoints: this.identifyCriticalPoints(knowledgeContent),
      connectionPoints: this.identifyConnectionPoints(knowledgeContent)
    }
  }

  /**
   * ナレッジ構造保持のためのプロンプト制約を生成
   */
  static generatePreservationConstraints(structure: KnowledgeStructure): KnowledgePreservationConstraints {
    return {
      structuralConstraints: [
        `ナレッジの${structure.structureType}構造を完全保持`,
        `${structure.flowPattern}フローパターンを維持`,
        'ページ構成と表現順序を厳格遵守',
        'ナレッジが内包する最適構造を尊重'
      ],
      
      contentConstraints: [
        'ナレッジの事実情報のみを使用',
        '推測・憶測による情報追加を厳禁',
        'データの改変・誇張・歪曲を禁止',
        'ナレッジの本質的価値を損なわない'
      ],
      
      expressionConstraints: [
        'ナレッジ固有の表現意図を保持',
        '感情的トーンと文体の一貫性維持',
        '専門性レベルと対象読者層の維持',
        'ユーザー意図に合わせた調整のみ実施'
      ],
      
      flowConstraints: [
        `ストーリーフロー: ${structure.storyFlow.join(' → ')}を保持`,
        `感情フロー: ${structure.emotionalFlow.join(' → ')}を維持`,
        `説得構造: ${structure.persuasionStructure.join(' → ')}を遵守`,
        '重要な接続点・転換点を保護'
      ]
    }
  }

  /**
   * 構造保持プロンプトテンプレートを生成
   */
  static generateStructurePreservationPrompt(
    knowledgeContent: string,
    postType: string,
    userIntent: string
  ): string {
    const structure = this.analyzeKnowledgeStructure(knowledgeContent)
    const constraints = this.generatePreservationConstraints(structure)

    return `
【ナレッジ構造保持プロンプト】

あなたはナレッジ構造保持の専門家です。以下のナレッジが持つ固有の構造と価値を完全に保持しながら、投稿タイプに適した表現調整を行ってください。

【ナレッジ固有構造】
- 構造タイプ: ${structure.structureType}
- フローパターン: ${structure.flowPattern}
- ストーリーフロー: ${structure.storyFlow.join(' → ')}
- 感情フロー: ${structure.emotionalFlow.join(' → ')}
- 説得構造: ${structure.persuasionStructure.join(' → ')}

【重要要素】
- 保持すべき要素: ${structure.keyElements.join(', ')}
- 絶対変更禁止: ${structure.criticalPoints.join(', ')}
- 重要接続点: ${structure.connectionPoints.join(', ')}

【構造的制約】
${constraints.structuralConstraints.map(c => `- ${c}`).join('\n')}

【内容的制約】  
${constraints.contentConstraints.map(c => `- ${c}`).join('\n')}

【表現的制約】
${constraints.expressionConstraints.map(c => `- ${c}`).join('\n')}

【フロー的制約】
${constraints.flowConstraints.map(c => `- ${c}`).join('\n')}

【ナレッジ内容】
${knowledgeContent}

【調整指示】
投稿タイプ「${postType}」の特性に合わせ、ユーザー意図「${userIntent}」を反映した表現調整を行ってください。
ただし、上記の構造保持制約を絶対に遵守してください。

【出力要求】
ナレッジの構造・フロー・本質を完全に保持したまま、投稿タイプに最適化されたコンテンツを生成してください。
`
  }

  /**
   * 構造タイプを検出（private methods）
   */
  private static detectStructureType(content: string): KnowledgeStructure['structureType'] {
    // キーワードベースの構造分析
    if (this.containsNarrativeElements(content)) return 'narrative'
    if (this.containsEducationalElements(content)) return 'educational' 
    if (this.containsAnalyticalElements(content)) return 'analytical'
    return 'practical'
  }

  private static detectFlowPattern(content: string): KnowledgeStructure['flowPattern'] {
    // フローパターンの検出ロジック
    if (this.hasLinearFlow(content)) return 'linear'
    if (this.hasCyclicalFlow(content)) return 'cyclical'
    if (this.hasBranchingFlow(content)) return 'branching'
    return 'layered'
  }

  private static extractStoryFlow(content: string, type: string): string[] {
    switch (type) {
      case 'narrative':
        return ['導入', '展開', '転換', '結論']
      case 'educational':
        return ['基礎', '理論', '実践', '応用']
      case 'analytical':
        return ['現状', '分析', '考察', '結論']
      case 'practical':
        return ['課題', '方法', '実行', '効果']
      default:
        return ['開始', '展開', '結論']
    }
  }

  private static extractEmotionalFlow(content: string, type: string): string[] {
    switch (type) {
      case 'narrative':
        return ['共感', '理解', '安心', '行動']
      case 'educational':  
        return ['興味', '理解', '納得', '習得']
      case 'analytical':
        return ['関心', '理解', '判断', '決定']
      case 'practical':
        return ['課題認識', '期待', '実行', '満足']
      default:
        return ['注意', '興味', '行動']
    }
  }

  private static extractPersuasionStructure(content: string, type: string): string[] {
    switch (type) {
      case 'narrative':
        return ['注意', '関心', '感情共鳴', '行動']
      case 'educational':
        return ['問題提起', '解決提示', '理解促進', '実践誘導']
      case 'analytical':
        return ['現状認識', '問題分析', '解決策', '判断材料']
      case 'practical':
        return ['課題', '解決法', '実証', '活用']
      default:
        return ['認知', '理解', '行動']
    }
  }

  private static extractPageComposition(content: string): string[] {
    // ページ構成の抽出（実装は簡略化）
    const lines = content.split('\n').filter(line => line.trim())
    return lines.slice(0, Math.min(10, lines.length)) // 最初の10行程度の構成を抽出
  }

  private static identifyKeyElements(content: string): string[] {
    // 重要要素の特定（キーワードベース）
    const keyPatterns = [
      /困った/g, /解決/g, /実際に/g, /経験/g, /効果/g,
      /方法/g, /手順/g, /ポイント/g, /重要/g, /注意/g
    ]
    
    const elements: string[] = []
    keyPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        elements.push(...matches.map(match => match))
      }
    })
    
    return [...new Set(elements)]
  }

  private static identifyCriticalPoints(content: string): string[] {
    // 絶対に変更してはいけない要素の特定
    const criticalPatterns = [
      /具体的な数値/g,
      /実際の体験/g, 
      /データ/g,
      /出典/g,
      /結果/g
    ]
    
    return ['具体的数値', '実体験', '実証データ', '出典情報', '効果結果']
  }

  private static identifyConnectionPoints(content: string): string[] {
    // 重要な接続点の特定
    const connectionWords = [
      'そして', 'しかし', 'また', 'さらに', 'つまり', 
      'なぜなら', 'その結果', 'このように', 'ただし'
    ]
    
    return connectionWords.filter(word => content.includes(word))
  }

  // ヘルパーメソッド群
  private static containsNarrativeElements(content: string): boolean {
    return /体験|経験|ストーリー|物語|実際に/.test(content)
  }

  private static containsEducationalElements(content: string): boolean {
    return /学習|習得|理解|説明|教育|指導/.test(content)
  }

  private static containsAnalyticalElements(content: string): boolean {
    return /分析|データ|統計|比較|評価|研究/.test(content)
  }

  private static hasLinearFlow(content: string): boolean {
    return /ステップ|段階|順序|手順/.test(content)
  }

  private static hasCyclicalFlow(content: string): boolean {
    return /サイクル|循環|繰り返し|反復/.test(content)
  }

  private static hasBranchingFlow(content: string): boolean {
    return /選択肢|場合|ケース|パターン/.test(content)
  }

  /**
   * 構造保持品質を検証
   */
  static validateStructurePreservation(
    originalKnowledge: string,
    generatedContent: string,
    structure: KnowledgeStructure
  ): {
    score: number
    violations: string[]
    recommendations: string[]
  } {
    const violations: string[] = []
    const recommendations: string[] = []
    
    // 重要要素の保持チェック
    structure.keyElements.forEach(element => {
      if (!generatedContent.includes(element)) {
        violations.push(`重要要素「${element}」が欠落`)
        recommendations.push(`重要要素「${element}」を復元してください`)
      }
    })
    
    // 批判的要素の変更チェック  
    structure.criticalPoints.forEach(point => {
      if (originalKnowledge.includes(point) && !generatedContent.includes(point)) {
        violations.push(`批判的要素「${point}」が改変`)
        recommendations.push(`批判的要素「${point}」を原文通りに保持してください`)
      }
    })
    
    // 接続点の保持チェック
    structure.connectionPoints.forEach(connection => {
      if (originalKnowledge.includes(connection) && !generatedContent.includes(connection)) {
        violations.push(`接続点「${connection}」が失われた`)
        recommendations.push(`接続点「${connection}」でフローを維持してください`)
      }
    })
    
    // スコア計算（100点満点）
    const totalChecks = structure.keyElements.length + structure.criticalPoints.length + structure.connectionPoints.length
    const violationCount = violations.length
    const score = totalChecks > 0 ? Math.max(0, 100 - (violationCount * 100 / totalChecks)) : 100
    
    return {
      score: Math.round(score),
      violations,
      recommendations
    }
  }
}