/**
 * ナレッジベース検索エンジン
 * AI想像依存を実データ検索に転換するピンポイント検索システム
 */

import problemSolutionPairs from './data/problemSolutionPairs.json';
import contentExamples from './data/contentExamples.json';
import personaInsights from './data/personaInsights.json';

export interface SearchQuery {
  personas?: string[];
  categories?: string[];
  roles?: string[];
  emotionalTriggers?: string[];
  keywords?: string[];
  marketingStage?: string[];
}

export interface SearchResult {
  id: string;
  source: string;
  targetPersona: string;
  problemCategory: string;
  role: string;
  actualTitle: string;
  problemDescription: string;
  solutionContent: any;
  effectiveExpressions: string[];
  searchKeywords: string[];
  emotionalTriggers: string[];
  marketingStage: string;
  conversionMethod: string;
  relevanceScore: number;
}

export interface PersonaInsight {
  name: string;
  psychologicalPainPoints: string[];
  desiredOutcomes: string[];
  triggerWords: string[];
  emotionalStates: string[];
  behaviorPatterns: string[];
  avoidancePatterns: string[];
}

export class KnowledgeSearchEngine {
  private readonly problemSolutionData: any;
  private readonly contentExamplesData: any;
  private readonly personaInsightsData: any;

  constructor() {
    this.problemSolutionData = problemSolutionPairs;
    this.contentExamplesData = contentExamples;
    this.personaInsightsData = personaInsights;
  }

  /**
   * ピンポイント検索 - 複数条件での精密マッチング
   */
  search(query: SearchQuery): SearchResult[] {
    console.log('🔍 Starting knowledge base search:', query);
    
    const results: SearchResult[] = [];
    const pairs = this.problemSolutionData.pairs;

    for (const [id, pair] of Object.entries(pairs)) {
      const relevanceScore = this.calculateRelevanceScore(pair as any, query);
      
      if (relevanceScore > 0.5) { // 50%以上の関連度でフィルタリング
        results.push({
          id,
          ...(pair as any),
          relevanceScore
        });
      }
    }

    // 関連度スコア順でソート
    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    
    console.log(`✅ Found ${results.length} relevant results`);
    return results;
  }

  /**
   * ペルソナ特化検索 - 特定ペルソナ向けのコンテンツを抽出
   */
  searchByPersona(personaId: string): SearchResult[] {
    console.log(`👤 Searching content for persona: ${personaId}`);
    
    return this.search({ personas: [personaId] });
  }

  /**
   * カテゴリ別検索 - 問題カテゴリでの検索
   */
  searchByCategory(category: string): SearchResult[] {
    console.log(`📂 Searching content for category: ${category}`);
    
    return this.search({ categories: [category] });
  }

  /**
   * 感情トリガー検索 - 特定の感情トリガーを持つコンテンツ
   */
  searchByEmotionalTrigger(trigger: string): SearchResult[] {
    console.log(`💭 Searching content for emotional trigger: ${trigger}`);
    
    return this.search({ emotionalTriggers: [trigger] });
  }

  /**
   * キーワード検索 - 検索キーワードでの部分マッチング
   */
  searchByKeywords(keywords: string[]): SearchResult[] {
    console.log(`🔤 Searching content for keywords:`, keywords);
    
    return this.search({ keywords });
  }

  /**
   * 複合検索 - ペルソナ + カテゴリ + 感情トリガーでの高精度検索
   */
  searchPinpoint(personaId: string, category?: string, emotionalTrigger?: string): SearchResult[] {
    console.log('🎯 Pinpoint search:', { personaId, category, emotionalTrigger });
    
    const query: SearchQuery = { personas: [personaId] };
    if (category) query.categories = [category];
    if (emotionalTrigger) query.emotionalTriggers = [emotionalTrigger];
    
    return this.search(query);
  }

  /**
   * ペルソナの心理分析データを取得
   */
  getPersonaInsights(personaId: string): PersonaInsight | null {
    const insight = this.personaInsightsData[personaId];
    if (!insight) {
      console.log(`⚠️ No insight found for persona: ${personaId}`);
      return null;
    }
    
    console.log(`📊 Retrieved insights for persona: ${personaId}`);
    return insight;
  }

  /**
   * コンテンツ例を取得
   */
  getContentExamples(templateType: string): any {
    const examples = this.contentExamplesData[templateType];
    if (!examples) {
      console.log(`⚠️ No content examples found for template: ${templateType}`);
      return null;
    }
    
    console.log(`📝 Retrieved content examples for template: ${templateType}`);
    return examples;
  }

  /**
   * 利用可能なペルソナ一覧を取得
   */
  getAvailablePersonas(): string[] {
    return this.problemSolutionData.metadata.personas || [];
  }

  /**
   * 利用可能なカテゴリ一覧を取得
   */
  getAvailableCategories(): string[] {
    return this.problemSolutionData.metadata.categories || [];
  }

  /**
   * 検索インデックスの統計情報を取得
   */
  getSearchIndexStats(): any {
    return {
      totalPairs: this.problemSolutionData.metadata.totalPairs,
      availablePersonas: this.getAvailablePersonas().length,
      availableCategories: this.getAvailableCategories().length,
      searchIndex: this.problemSolutionData.searchIndex
    };
  }

  /**
   * 関連度スコアを計算
   */
  private calculateRelevanceScore(pair: any, query: SearchQuery): number {
    let score = 0;
    let totalChecks = 0;

    // ペルソナマッチング (重要度: 30%)
    if (query.personas && query.personas.length > 0) {
      totalChecks++;
      if (query.personas.includes(pair.targetPersona)) {
        score += 0.3;
      }
    }

    // カテゴリマッチング (重要度: 25%)
    if (query.categories && query.categories.length > 0) {
      totalChecks++;
      if (query.categories.includes(pair.problemCategory)) {
        score += 0.25;
      }
    }

    // 役割マッチング (重要度: 20%)
    if (query.roles && query.roles.length > 0) {
      totalChecks++;
      if (query.roles.includes(pair.role)) {
        score += 0.2;
      }
    }

    // 感情トリガーマッチング (重要度: 15%)
    if (query.emotionalTriggers && query.emotionalTriggers.length > 0) {
      totalChecks++;
      const triggerMatch = query.emotionalTriggers.some(trigger => 
        pair.emotionalTriggers && pair.emotionalTriggers.includes(trigger)
      );
      if (triggerMatch) {
        score += 0.15;
      }
    }

    // キーワードマッチング (重要度: 10%)
    if (query.keywords && query.keywords.length > 0) {
      totalChecks++;
      const keywordMatch = query.keywords.some(keyword => 
        pair.searchKeywords && pair.searchKeywords.some((k: string) => 
          k.toLowerCase().includes(keyword.toLowerCase())
        )
      );
      if (keywordMatch) {
        score += 0.1;
      }
    }

    // マーケティングステージマッチング (追加スコア)
    if (query.marketingStage && query.marketingStage.length > 0) {
      if (query.marketingStage.includes(pair.marketingStage)) {
        score += 0.05;
      }
    }

    // 総チェック数で正規化（最低限のマッチがない場合は0）
    if (totalChecks === 0) {
      return 0;
    }

    return Math.min(score, 1.0); // 最大値1.0に制限
  }

  /**
   * デバッグ用: 全データの構造を表示
   */
  debugDataStructure(): void {
    console.log('📋 Knowledge Base Data Structure:');
    console.log('- Problem Solution Pairs:', Object.keys(this.problemSolutionData.pairs).length);
    console.log('- Content Examples:', Object.keys(this.contentExamplesData).length);
    console.log('- Persona Insights:', Object.keys(this.personaInsightsData).length);
    console.log('- Available Personas:', this.getAvailablePersonas());
    console.log('- Available Categories:', this.getAvailableCategories());
  }
}