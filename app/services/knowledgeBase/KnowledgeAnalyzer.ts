/**
 * ナレッジベース分析エンジン
 * 12投稿分析結果から最適なコンテンツ生成パターンを提供
 */

import successPatternsData from './data/successPatterns.json';

export interface SuccessPattern {
  contentId: string;
  typeId: string;
  typeName: string;
  targetId: string;
  targetName: string;
  themes: string[];
  templateType: string;
  emotionLogicRatio: string;
  trustScore: number;
  valueElements: string[];
  psychologicalNeeds: string[];
  triggerMoments: string[];
  emotionalState: string[];
  urgencyLevel: string;
  solutionApproach: {
    structure: string;
    whyEffective: string;
    uniqueValue: string;
  };
  structureConstraints: {
    maxItems?: number;
    emotionalHookRequired?: boolean;
    solutionCTARequired?: boolean;
    personalStoryRequired?: boolean;
    authorityRequired?: boolean;
    logicalFlowRequired?: boolean;
    dataDetailRequired?: boolean;
    actionabilityRequired?: boolean;
    strongEmotionalHookRequired?: boolean;
    practicalSolutionsRequired?: boolean;
    systematicApproachRequired?: boolean;
    longTermPerspectiveRequired?: boolean;
    theoreticalBackgroundRequired?: boolean;
    stepByStepRequired?: boolean;
    practicalSkillsRequired?: boolean;
    confidenceBuildingRequired?: boolean;
    timeSpecificRequired?: boolean;
    statisticalBackingRequired?: boolean;
    proofOfConceptRequired?: boolean;
    technicalDetailsRequired?: boolean;
    comparativeDataRequired?: boolean;
    unifiedFormatRequired?: boolean;
    emotionalCareRequired?: boolean;
    efficiencyFocused?: boolean;
    rankingDataRequired?: boolean;
  };
}

export interface TypeDefinition {
  name: string;
  emotionRatioRange: string;
  coreApproach: string;
  optimalTemplates: string[];
  keyCharacteristics: string[];
}

export class KnowledgeAnalyzer {
  private static patterns: SuccessPattern[] = successPatternsData.patterns;
  private static typeDefinitions: Record<string, TypeDefinition> = successPatternsData.typeDefinitions;
  
  static {
    console.log('🔧 KnowledgeAnalyzer初期化 - パターン数:', this.patterns.length);
    console.log('📋 利用可能contentId:', this.patterns.map(p => p.contentId));
  }

  /**
   * TypeID、TargetID、ThemeIDから最適な成功パターンを分析・取得
   */
  static analyzeOptimalApproach(
    typeId: string,
    targetId?: string,
    themeId?: string
  ): SuccessPattern {
    console.log('🔍 KnowledgeAnalyzer - パターン検索開始:', { typeId, targetId, themeId });
    
    // 完全マッチング検索
    let matchedPatterns = this.patterns.filter(pattern => pattern.typeId === typeId);
    console.log('📋 TypeID一致:', matchedPatterns.map(p => p.contentId));

    if (targetId) {
      matchedPatterns = matchedPatterns.filter(pattern => pattern.targetId === targetId);
      console.log('🎯 TargetID一致:', matchedPatterns.map(p => p.contentId));
    }

    if (themeId) {
      matchedPatterns = matchedPatterns.filter(pattern => pattern.themes.includes(themeId));
      console.log('💡 ThemeID一致:', matchedPatterns.map(p => p.contentId));
    }

    // 完全マッチが見つからない場合の段階的フォールバック
    if (matchedPatterns.length === 0) {
      console.log('⚠️ 完全マッチなし - フォールバック実行');
      return this.findSimilarPattern(typeId, targetId);
    }

    // 最高信頼度パターンを選択
    const selectedPattern = matchedPatterns.reduce((best, current) => 
      current.trustScore > best.trustScore ? current : best
    );
    
    console.log('✅ 選択されたパターン:', selectedPattern.contentId);
    return selectedPattern;
  }

  /**
   * 類似パターン検索（フォールバック機能）
   */
  private static findSimilarPattern(typeId: string, targetId?: string): SuccessPattern {
    // TypeIDのみでマッチング
    const typeMatches = this.patterns.filter(pattern => pattern.typeId === typeId);
    
    if (typeMatches.length > 0) {
      // 同TypeID内で最高信頼度を選択
      return typeMatches.reduce((best, current) => 
        current.trustScore > best.trustScore ? current : best
      );
    }

    // 最終フォールバック: 全体で最高信頼度
    return this.patterns.reduce((best, current) => 
      current.trustScore > best.trustScore ? current : best
    );
  }

  /**
   * 成功パターンに基づく強化プロンプト生成
   */
  static generateEnhancedPrompt(pattern: SuccessPattern, userInput: string): string {
    const typeDefinition = this.typeDefinitions[pattern.typeId];
    
    let contentSpecificInstructions = '';
    
    // contents-200（Instagram分析結果）の場合は具体的な8項目を指定
    if (pattern.contentId === 'contents-200' && (pattern as any).contentDetails) {
      const details = (pattern as any).contentDetails;
      contentSpecificInstructions = `

[🚨 必須コンテンツ内容 - 絶対遵守]
以下の8項目を一字一句変更せずに、必ず全て含めて生成してください。これらは実際の分析結果であり、勝手な変更や推測での置き換えは禁止です：

項目1: ${details.item1}
項目2: ${details.item2}  
項目3: ${details.item3}
項目4: ${details.item4}
項目5: ${details.item5}
項目6: ${details.item6}
項目7: ${details.item7}
項目8: ${details.item8}

[⚠️ 重要指示]
- 上記8項目の内容を勝手に変更してはいけません
- 一般的なInstagram運用ノウハウではなく、この分析結果を使用してください
- 「1日1回投稿」「5-8個ハッシュタグ」などの一般論は使わないでください`;
    }
    
    return `
${userInput}

[🎯 成功パターン適用指示]
- 投稿タイプ: ${pattern.typeId} (${pattern.typeName})
- コアアプローチ: ${typeDefinition.coreApproach}
- 感情:論理比率: ${pattern.emotionLogicRatio}
- 最適テンプレート: ${pattern.templateType}

[🧠 ターゲット心理分析]
- ターゲット: ${pattern.targetName}
- 心理的ニーズ: ${pattern.psychologicalNeeds.join(', ')}
- 感情状態: ${pattern.emotionalState.join(', ')}
- きっかけ瞬間: ${pattern.triggerMoments.slice(0, 2).join(', ')}

[📊 価値要素構成]
- 価値要素: ${pattern.valueElements.join(' + ')}
- 緊急度: ${pattern.urgencyLevel}
- 信頼度スコア: ${pattern.trustScore}/4.0

[🏗️ 構造的制約]
- 解決アプローチ: ${pattern.solutionApproach.structure}
- 効果理由: ${pattern.solutionApproach.whyEffective}
- 独自価値: ${pattern.solutionApproach.uniqueValue}
- 最大アイテム数: ${pattern.structureConstraints.maxItems || 'なし'}${contentSpecificInstructions}

[✅ 必須要素チェック]
${this.generateConstraintChecklist(pattern.structureConstraints)}

上記の実証済み成功パターン(${pattern.contentId})に基づいて、高エンゲージメントが期待できるコンテンツを生成してください。
特に感情:論理比率 ${pattern.emotionLogicRatio} を厳密に守り、ターゲットの心理的ニーズに完璧に応えるコンテンツを作成してください。
`;
  }

  /**
   * 構造制約チェックリスト生成
   */
  private static generateConstraintChecklist(constraints: any): string {
    const checklist: string[] = [];
    
    if (constraints.emotionalHookRequired) checklist.push('- 感情的フック必須');
    if (constraints.solutionCTARequired) checklist.push('- 解決策CTA必須');
    if (constraints.personalStoryRequired) checklist.push('- 個人的ストーリー必須');
    if (constraints.authorityRequired) checklist.push('- 権威性提示必須');
    if (constraints.logicalFlowRequired) checklist.push('- 論理的フロー必須');
    if (constraints.dataDetailRequired) checklist.push('- データ詳細必須');
    if (constraints.actionabilityRequired) checklist.push('- 行動可能性必須');
    if (constraints.practicalSolutionsRequired) checklist.push('- 実践的解決策必須');
    if (constraints.systematicApproachRequired) checklist.push('- 体系的アプローチ必須');
    if (constraints.theoreticalBackgroundRequired) checklist.push('- 理論的背景必須');
    if (constraints.statisticalBackingRequired) checklist.push('- 統計的根拠必須');
    if (constraints.technicalDetailsRequired) checklist.push('- 技術的詳細必須');
    if (constraints.comparativeDataRequired) checklist.push('- 比較データ必須');
    if (constraints.emotionalCareRequired) checklist.push('- 感情的配慮必須');
    if (constraints.efficiencyFocused) checklist.push('- 効率性重視必須');
    
    return checklist.join('\n');
  }

  /**
   * TypeIDの一覧取得
   */
  static getAvailableTypes(): Record<string, TypeDefinition> {
    return this.typeDefinitions;
  }

  /**
   * 特定TypeIDの成功パターン一覧取得
   */
  static getPatternsByType(typeId: string): SuccessPattern[] {
    return this.patterns.filter(pattern => pattern.typeId === typeId);
  }

  /**
   * パターン統計情報取得
   */
  static getPatternStats(): {
    totalPatterns: number;
    byType: Record<string, number>;
    avgTrustScore: number;
    topTemplates: Array<{template: string; count: number}>;
  } {
    const byType: Record<string, number> = {};
    const templateCount: Record<string, number> = {};
    
    this.patterns.forEach(pattern => {
      byType[pattern.typeId] = (byType[pattern.typeId] || 0) + 1;
      templateCount[pattern.templateType] = (templateCount[pattern.templateType] || 0) + 1;
    });

    const avgTrustScore = this.patterns.reduce((sum, pattern) => sum + pattern.trustScore, 0) / this.patterns.length;
    
    const topTemplates = Object.entries(templateCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([template, count]) => ({ template, count }));

    return {
      totalPatterns: this.patterns.length,
      byType,
      avgTrustScore: Math.round(avgTrustScore * 100) / 100,
      topTemplates
    };
  }

  /**
   * 入力テキストから最適TypeIDを推定
   */
  static estimateTypeFromContent(content: string): {
    typeId: string;
    confidence: number;
    reasoning: string;
  } {
    const contentLower = content.toLowerCase();
    const scores: Record<string, {score: number; keywords: string[]}> = {
      '001': { score: 0, keywords: [] },
      '002': { score: 0, keywords: [] },
      '003': { score: 0, keywords: [] },
      '004': { score: 0, keywords: [] }
    };

    // TypeID=001 (共感型) キーワード
    const empathyKeywords = ['悩み', '不安', '困っ', '辛い', '苦し', '心配', '怖い', '不満', '迷い', '悲し', '怒り', '共感', 'わかる', '同じ', '体験', 'ストーリー'];
    empathyKeywords.forEach(keyword => {
      if (contentLower.includes(keyword)) {
        scores['001'].score += 2;
        scores['001'].keywords.push(keyword);
      }
    });

    // TypeID=002 (教育型) キーワード
    const educationKeywords = ['方法', '手順', 'ステップ', '学習', '習得', '理解', '分析', '技法', '原則', '基本', '応用', '実践', '体系', '詳し', '解説'];
    educationKeywords.forEach(keyword => {
      if (contentLower.includes(keyword)) {
        scores['002'].score += 2;
        scores['002'].keywords.push(keyword);
      }
    });

    // TypeID=003 (情報型) キーワード  
    const informationKeywords = ['データ', '統計', '情報', '比較', 'ランキング', 'リスト', '一覧', 'まとめ', '企業', '制度', '条件', '詳細', '具体的'];
    informationKeywords.forEach(keyword => {
      if (contentLower.includes(keyword)) {
        scores['003'].score += 2;
        scores['003'].keywords.push(keyword);
      }
    });

    // TypeID=004 (効率型) キーワード
    const efficiencyKeywords = ['効率', '時短', '簡単', 'すぐ', '即座', '短時間', '最速', '楽', '便利', '実用', '使える', '役立つ', 'コツ', 'テクニック'];
    efficiencyKeywords.forEach(keyword => {
      if (contentLower.includes(keyword)) {
        scores['004'].score += 2;  
        scores['004'].keywords.push(keyword);
      }
    });

    // 最高スコアのTypeIDを選択
    const bestType = Object.entries(scores).reduce((best, [typeId, data]) => 
      data.score > best.data.score ? { typeId, data } : best
    );

    const confidence = Math.min(bestType.data.score / 10 * 100, 100);
    const reasoning = `検出キーワード: ${bestType.data.keywords.join(', ') || 'なし'} (スコア: ${bestType.data.score})`;

    return {
      typeId: bestType.typeId,
      confidence,
      reasoning
    };
  }
}