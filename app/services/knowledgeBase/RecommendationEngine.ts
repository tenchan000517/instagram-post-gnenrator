/**
 * ナレッジ推奨エンジン
 * フィルタリング済みナレッジ群からの最適推奨・優先順位決定システム
 */

import { SimilaritySearchService, SimilarityScore, SimilaritySearchResult } from './SimilaritySearchService';
import { KnowledgeSearchEngine, SearchResult } from './KnowledgeSearchEngine';
import problemSolutionPairs from './data/problemSolutionPairs.json';

export interface RecommendationConfig {
  // スコア関連
  minSimilarityScore?: number; // デフォルト: 0.4
  excellentScoreThreshold?: number; // デフォルト: 0.8
  goodScoreThreshold?: number; // デフォルト: 0.6
  
  // 推奨件数
  maxRecommendations?: number; // デフォルト: 5
  minRecommendations?: number; // デフォルト: 1
  
  // 多様性考慮
  categoryDiversityWeight?: number; // デフォルト: 0.2
  personaDiversityWeight?: number; // デフォルト: 0.1
  
  // フィルタリング
  excludeCategories?: string[];
  excludePersonas?: string[];
  prioritizeCategories?: string[];
  prioritizePersonas?: string[];
}

export interface KnowledgeRecommendation {
  knowledgeId: string;
  originalScore: number; // 類似度スコア
  adjustedScore: number; // 調整後推奨スコア
  confidenceLevel: 'excellent' | 'good' | 'fair' | 'low';
  recommendationReason: string;
  strengthPoints: string[];
  potentialConcerns: string[];
  
  // ナレッジ詳細
  title: string;
  problemDescription: string;
  solutionSummary: string;
  targetPersona: string;
  category: string;
  
  // メタデータ
  diversityBonus: number;
  categoryMatch: boolean;
  personaMatch: boolean;
}

export interface RecommendationResult {
  recommendations: KnowledgeRecommendation[];
  searchSummary: {
    totalAnalyzed: number;
    totalRecommended: number;
    averageScore: number;
    processingTime: number;
  };
  qualityDistribution: {
    excellent: number;
    good: number;
    fair: number;
    low: number;
  };
  diversityStats: {
    categoriesRepresented: number;
    personasRepresented: number;
    diversityScore: number;
  };
  userGuidance: {
    topChoice: string | null;
    alternativeChoices: string[];
    selectionAdvice: string;
  };
}

export class RecommendationEngine {
  private similarityService: SimilaritySearchService;
  private searchEngine: KnowledgeSearchEngine;
  private defaultConfig: RecommendationConfig;

  constructor() {
    this.similarityService = new SimilaritySearchService();
    this.searchEngine = new KnowledgeSearchEngine();
    
    this.defaultConfig = {
      minSimilarityScore: 0.4,
      excellentScoreThreshold: 0.8,
      goodScoreThreshold: 0.6,
      maxRecommendations: 5,
      minRecommendations: 1,
      categoryDiversityWeight: 0.2,
      personaDiversityWeight: 0.1,
      excludeCategories: [],
      excludePersonas: [],
      prioritizeCategories: [],
      prioritizePersonas: []
    };
  }

  /**
   * メイン推奨機能
   */
  async generateRecommendations(
    userInput: string,
    filteredKnowledgeIds?: string[],
    config?: Partial<RecommendationConfig>
  ): Promise<RecommendationResult> {
    const startTime = performance.now();
    const finalConfig = { ...this.defaultConfig, ...config };
    
    console.log('🎯 ナレッジ推奨エンジン開始:', { userInput, filteredKnowledgeIds, config: finalConfig });

    // 1. 類似度検索実行
    const searchResult = await this.similarityService.searchSimilarKnowledge({
      userInput,
      filteredKnowledgeIds,
      minScore: finalConfig.minSimilarityScore,
      maxResults: finalConfig.maxRecommendations! * 2 // 多様性考慮のため多めに取得
    });

    console.log(`📊 類似度検索結果: ${searchResult.topResults.length}件`);

    // 2. 推奨スコア調整・多様性考慮
    const adjustedRecommendations = await this.adjustRecommendationScores(
      searchResult.topResults,
      userInput,
      finalConfig
    );

    // 3. 最終推奨リスト生成
    const finalRecommendations = this.selectFinalRecommendations(
      adjustedRecommendations,
      finalConfig
    );

    // 4. ユーザーガイダンス生成
    const userGuidance = this.generateUserGuidance(finalRecommendations, userInput);

    const processingTime = performance.now() - startTime;

    const result: RecommendationResult = {
      recommendations: finalRecommendations,
      searchSummary: {
        totalAnalyzed: searchResult.totalAnalyzed,
        totalRecommended: finalRecommendations.length,
        averageScore: this.calculateAverageScore(finalRecommendations),
        processingTime
      },
      qualityDistribution: this.calculateQualityDistribution(finalRecommendations),
      diversityStats: this.calculateDiversityStats(finalRecommendations),
      userGuidance
    };

    console.log(`✅ 推奨エンジン完了 - 推奨数: ${finalRecommendations.length}, 処理時間: ${Math.round(processingTime)}ms`);
    return result;
  }

  /**
   * 推奨スコア調整・多様性考慮
   */
  private async adjustRecommendationScores(
    similarityResults: SimilarityScore[],
    userInput: string,
    config: RecommendationConfig
  ): Promise<KnowledgeRecommendation[]> {
    const recommendations: KnowledgeRecommendation[] = [];
    const categoryCount: Record<string, number> = {};
    const personaCount: Record<string, number> = {};

    for (const similarity of similarityResults) {
      // 多様性ボーナス計算
      const categoryBonus = this.calculateCategoryDiversityBonus(
        similarity.category, 
        categoryCount, 
        config.categoryDiversityWeight!
      );
      
      const personaBonus = this.calculatePersonaDiversityBonus(
        similarity.targetPersona,
        personaCount,
        config.personaDiversityWeight!
      );

      const diversityBonus = categoryBonus + personaBonus;

      // 優先度ボーナス
      const priorityBonus = this.calculatePriorityBonus(similarity, config);

      // 調整後スコア
      const adjustedScore = Math.min(
        1.0,
        similarity.score + diversityBonus + priorityBonus
      );

      const recommendation: KnowledgeRecommendation = {
        knowledgeId: similarity.knowledgeId,
        originalScore: similarity.score,
        adjustedScore,
        confidenceLevel: this.determineConfidenceLevel(adjustedScore, config),
        recommendationReason: await this.generateRecommendationReason(similarity, userInput),
        strengthPoints: this.identifyStrengthPoints(similarity),
        potentialConcerns: this.identifyPotentialConcerns(similarity),
        
        title: similarity.knowledgeTitle,
        problemDescription: similarity.problemDescription,
        solutionSummary: similarity.solutionSummary,
        targetPersona: similarity.targetPersona,
        category: similarity.category,
        
        diversityBonus,
        categoryMatch: config.prioritizeCategories?.includes(similarity.category) || false,
        personaMatch: config.prioritizePersonas?.includes(similarity.targetPersona) || false
      };

      recommendations.push(recommendation);

      // カウント更新
      categoryCount[similarity.category] = (categoryCount[similarity.category] || 0) + 1;
      personaCount[similarity.targetPersona] = (personaCount[similarity.targetPersona] || 0) + 1;
    }

    return recommendations.sort((a, b) => b.adjustedScore - a.adjustedScore);
  }

  /**
   * 推奨理由生成
   */
  private async generateRecommendationReason(
    similarity: SimilarityScore,
    userInput: string
  ): Promise<string> {
    const scoreLevel = similarity.score >= 0.8 ? '非常に高い' : 
                     similarity.score >= 0.6 ? '高い' : 
                     similarity.score >= 0.4 ? '中程度の' : '低い';

    let reason = `このナレッジはあなたの要求と${scoreLevel}類似度（${Math.round(similarity.score * 100)}%）を示しています。`;

    // カテゴリマッチ
    if (similarity.category) {
      reason += `「${similarity.category}」分野での実例として`;
    }

    // ターゲット類似性
    if (similarity.targetPersona) {
      reason += `、${similarity.targetPersona}向けの解決策を提供します。`;
    }

    // AI分析理由を含める
    if (similarity.reasoning && similarity.reasoning !== '類似度分析結果') {
      reason += ` ${similarity.reasoning}`;
    }

    return reason;
  }

  /**
   * 最終推奨リスト選択
   */
  private selectFinalRecommendations(
    adjustedRecommendations: KnowledgeRecommendation[],
    config: RecommendationConfig
  ): KnowledgeRecommendation[] {
    let finalList = adjustedRecommendations;

    // 除外フィルタリング
    if (config.excludeCategories?.length) {
      finalList = finalList.filter(r => !config.excludeCategories!.includes(r.category));
    }
    if (config.excludePersonas?.length) {
      finalList = finalList.filter(r => !config.excludePersonas!.includes(r.targetPersona));
    }

    // 最小推奨スコアでフィルタリング
    finalList = finalList.filter(r => r.adjustedScore >= config.minSimilarityScore!);

    // 最大件数制限
    finalList = finalList.slice(0, config.maxRecommendations);

    // 最小件数保証のため、必要に応じて基準を緩和
    if (finalList.length < config.minRecommendations!) {
      const relaxedList = adjustedRecommendations
        .filter(r => r.adjustedScore >= Math.max(0.2, config.minSimilarityScore! - 0.2))
        .slice(0, config.minRecommendations);
      
      console.log(`⚠️ 最小件数確保のため推奨基準を緩和: ${finalList.length} → ${relaxedList.length}`);
      finalList = relaxedList;
    }

    return finalList;
  }

  /**
   * ユーザーガイダンス生成
   */
  private generateUserGuidance(
    recommendations: KnowledgeRecommendation[],
    userInput: string
  ): {
    topChoice: string | null;
    alternativeChoices: string[];
    selectionAdvice: string;
  } {
    if (recommendations.length === 0) {
      return {
        topChoice: null,
        alternativeChoices: [],
        selectionAdvice: '申し訳ございませんが、お求めの内容に適したナレッジが見つかりませんでした。検索条件を変更してみてください。'
      };
    }

    const topChoice = recommendations[0];
    const alternatives = recommendations.slice(1, 4);

    let selectionAdvice = '';
    
    if (topChoice.confidenceLevel === 'excellent') {
      selectionAdvice = `最上位の推奨ナレッジは類似度${Math.round(topChoice.adjustedScore * 100)}%で、あなたの要求に非常に適合しています。`;
    } else if (topChoice.confidenceLevel === 'good') {
      selectionAdvice = `推奨ナレッジは類似度${Math.round(topChoice.adjustedScore * 100)}%で、適度な適合性を示しています。`;
    } else {
      selectionAdvice = `推奨ナレッジの類似度は${Math.round(topChoice.adjustedScore * 100)}%です。より適合するナレッジを探すため、条件を調整することをお勧めします。`;
    }

    if (alternatives.length > 0) {
      selectionAdvice += `他にも${alternatives.length}件の代替選択肢があります。`;
    }

    return {
      topChoice: topChoice.knowledgeId,
      alternativeChoices: alternatives.map(r => r.knowledgeId),
      selectionAdvice
    };
  }

  // ヘルパーメソッド群
  private calculateCategoryDiversityBonus(
    category: string, 
    categoryCount: Record<string, number>, 
    weight: number
  ): number {
    const currentCount = categoryCount[category] || 0;
    return currentCount === 0 ? weight : weight * Math.max(0, 1 - currentCount * 0.3);
  }

  private calculatePersonaDiversityBonus(
    persona: string,
    personaCount: Record<string, number>,
    weight: number
  ): number {
    const currentCount = personaCount[persona] || 0;
    return currentCount === 0 ? weight : weight * Math.max(0, 1 - currentCount * 0.2);
  }

  private calculatePriorityBonus(
    similarity: SimilarityScore,
    config: RecommendationConfig
  ): number {
    let bonus = 0;
    if (config.prioritizeCategories?.includes(similarity.category)) {
      bonus += 0.1;
    }
    if (config.prioritizePersonas?.includes(similarity.targetPersona)) {
      bonus += 0.05;
    }
    return bonus;
  }

  private determineConfidenceLevel(
    score: number,
    config: RecommendationConfig
  ): 'excellent' | 'good' | 'fair' | 'low' {
    if (score >= config.excellentScoreThreshold!) return 'excellent';
    if (score >= config.goodScoreThreshold!) return 'good';
    if (score >= config.minSimilarityScore!) return 'fair';
    return 'low';
  }

  private identifyStrengthPoints(similarity: SimilarityScore): string[] {
    const points: string[] = [];
    
    if (similarity.score >= 0.8) {
      points.push('高い類似度');
    }
    if (similarity.problemDescription.length > 50) {
      points.push('詳細な問題分析');
    }
    if (similarity.solutionSummary.length > 30) {
      points.push('具体的な解決策');
    }
    
    return points.length ? points : ['実用的なナレッジ'];
  }

  private identifyPotentialConcerns(similarity: SimilarityScore): string[] {
    const concerns: string[] = [];
    
    if (similarity.score < 0.5) {
      concerns.push('類似度が低め');
    }
    if (!similarity.reasoning || similarity.reasoning.includes('フォールバック')) {
      concerns.push('自動分析の制約');
    }
    
    return concerns;
  }

  private calculateAverageScore(recommendations: KnowledgeRecommendation[]): number {
    if (recommendations.length === 0) return 0;
    return recommendations.reduce((sum, r) => sum + r.adjustedScore, 0) / recommendations.length;
  }

  private calculateQualityDistribution(recommendations: KnowledgeRecommendation[]): {
    excellent: number;
    good: number;
    fair: number;
    low: number;
  } {
    const distribution = { excellent: 0, good: 0, fair: 0, low: 0 };
    recommendations.forEach(r => distribution[r.confidenceLevel]++);
    return distribution;
  }

  private calculateDiversityStats(recommendations: KnowledgeRecommendation[]): {
    categoriesRepresented: number;
    personasRepresented: number;
    diversityScore: number;
  } {
    const categories = new Set(recommendations.map(r => r.category));
    const personas = new Set(recommendations.map(r => r.targetPersona));
    
    const diversityScore = recommendations.length > 0 
      ? (categories.size + personas.size) / (recommendations.length * 2)
      : 0;

    return {
      categoriesRepresented: categories.size,
      personasRepresented: personas.size,
      diversityScore: Math.round(diversityScore * 100) / 100
    };
  }

  /**
   * 高速推奨（簡易版）
   */
  async getQuickRecommendations(
    userInput: string,
    maxResults: number = 3
  ): Promise<KnowledgeRecommendation[]> {
    const result = await this.generateRecommendations(userInput, undefined, {
      maxRecommendations: maxResults,
      minSimilarityScore: 0.3,
      categoryDiversityWeight: 0.1,
      personaDiversityWeight: 0.05
    });

    return result.recommendations;
  }
}