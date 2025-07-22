/**
 * AI類似度検索サービス
 * ユーザー入力とフィルタリング済みナレッジ群の意味的類似度計算・推奨機能
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import problemSolutionPairs from './data/problemSolutionPairs.json';

export interface SimilarityScore {
  knowledgeId: string;
  score: number; // 0.0-1.0
  reasoning: string;
  knowledgeTitle: string;
  problemDescription: string;
  solutionSummary: string;
  targetPersona: string;
  category: string;
}

export interface TextEmbedding {
  text: string;
  vector: number[];
  normalized?: number[];
}

export interface SimilaritySearchParams {
  userInput: string;
  filteredKnowledgeIds?: string[];
  minScore?: number; // デフォルト: 0.3
  maxResults?: number; // デフォルト: 5
  useSemanticSearch?: boolean; // デフォルト: true
}

export interface SimilaritySearchResult {
  topResults: SimilarityScore[];
  searchQuery: string;
  totalAnalyzed: number;
  averageScore: number;
  searchMetadata: {
    useSemanticSearch: boolean;
    minScore: number;
    processingTime: number;
  };
}

export class SimilaritySearchService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key is required for similarity search');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * メイン類似度検索機能
   */
  async searchSimilarKnowledge(params: SimilaritySearchParams): Promise<SimilaritySearchResult> {
    const startTime = performance.now();
    
    console.log('🔍 類似度検索開始:', params);

    const {
      userInput,
      filteredKnowledgeIds,
      minScore = 0.3,
      maxResults = 5,
      useSemanticSearch = true
    } = params;

    // 対象ナレッジの特定
    const targetKnowledge = this.getTargetKnowledge(filteredKnowledgeIds);
    console.log(`📚 対象ナレッジ数: ${targetKnowledge.length}`);

    let similarityScores: SimilarityScore[];

    if (useSemanticSearch) {
      // AI意味的類似度検索
      similarityScores = await this.performSemanticSimilaritySearch(userInput, targetKnowledge);
    } else {
      // キーワードベース類似度検索
      similarityScores = this.performKeywordSimilaritySearch(userInput, targetKnowledge);
    }

    // スコアフィルタリング・ソート
    const filteredScores = similarityScores
      .filter(score => score.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);

    const processingTime = performance.now() - startTime;
    const averageScore = similarityScores.length > 0 
      ? similarityScores.reduce((sum, s) => sum + s.score, 0) / similarityScores.length
      : 0;

    const result: SimilaritySearchResult = {
      topResults: filteredScores,
      searchQuery: userInput,
      totalAnalyzed: targetKnowledge.length,
      averageScore,
      searchMetadata: {
        useSemanticSearch,
        minScore,
        processingTime
      }
    };

    console.log(`✅ 類似度検索完了 - 推奨数: ${filteredScores.length}, 処理時間: ${Math.round(processingTime)}ms`);
    return result;
  }

  /**
   * AI意味的類似度検索（Gemini AI活用）
   */
  private async performSemanticSimilaritySearch(
    userInput: string, 
    knowledgeList: any[]
  ): Promise<SimilarityScore[]> {
    console.log('🤖 AI意味的類似度検索実行中...');

    const batchSize = 5; // API負荷軽減のためのバッチ処理
    const results: SimilarityScore[] = [];

    for (let i = 0; i < knowledgeList.length; i += batchSize) {
      const batch = knowledgeList.slice(i, i + batchSize);
      const batchResults = await this.processSimilarityBatch(userInput, batch);
      results.push(...batchResults);
      
      // API負荷軽減のため短時間待機
      if (i + batchSize < knowledgeList.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    return results;
  }

  /**
   * バッチ処理による類似度計算
   */
  private async processSimilarityBatch(
    userInput: string, 
    knowledgeBatch: any[]
  ): Promise<SimilarityScore[]> {
    try {
      const prompt = this.buildSimilarityPrompt(userInput, knowledgeBatch);
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      return this.parseSimilarityResponse(text, knowledgeBatch);
    } catch (error) {
      console.error('❌ バッチ処理エラー:', error);
      // フォールバック: キーワードベース検索
      return this.performKeywordSimilaritySearch(userInput, knowledgeBatch);
    }
  }

  /**
   * 類似度計算プロンプトの構築
   */
  private buildSimilarityPrompt(userInput: string, knowledgeBatch: any[]): string {
    const knowledgeContext = knowledgeBatch.map((knowledge, index) => {
      return `
ナレッジ${index + 1}:
ID: ${knowledge.id}
タイトル: ${knowledge.actualTitle}
問題: ${knowledge.problemDescription}
解決概要: ${this.extractSolutionSummary(knowledge.solutionContent)}
`;
    }).join('\n');

    return `
あなたは高精度なコンテンツ類似度分析の専門家です。

【分析対象】
ユーザー入力: "${userInput}"

【比較対象ナレッジ群】
${knowledgeContext}

【分析指示】
ユーザー入力と各ナレッジの意味的類似度を0.0-1.0のスコアで評価してください。

【評価基準】
1. 問題の性質・種類の類似性 (40%)
2. 求めている解決策の方向性の類似性 (30%)
3. 対象者・状況の類似性 (20%)
4. 表現・キーワードの類似性 (10%)

【出力形式】
各ナレッジについて以下のJSONフォーマットで出力してください:
{
  "knowledgeId": "ナレッジID",
  "score": 0.0-1.0の数値,
  "reasoning": "類似度の根拠を具体的に説明"
}

JSON配列として出力し、余計な説明は不要です。`;
  }

  /**
   * AI応答の解析
   */
  private parseSimilarityResponse(responseText: string, knowledgeBatch: any[]): SimilarityScore[] {
    try {
      const jsonText = responseText.replace(/```json|```/g, '').trim();
      const parsedResults = JSON.parse(jsonText);

      return parsedResults.map((result: any) => {
        const knowledge = knowledgeBatch.find(k => k.id === result.knowledgeId);
        if (!knowledge) return null;

        return {
          knowledgeId: result.knowledgeId,
          score: Math.max(0, Math.min(1, result.score)), // 0-1に正規化
          reasoning: result.reasoning || '類似度分析結果',
          knowledgeTitle: knowledge.actualTitle,
          problemDescription: knowledge.problemDescription,
          solutionSummary: this.extractSolutionSummary(knowledge.solutionContent),
          targetPersona: knowledge.targetPersona,
          category: knowledge.problemCategory
        };
      }).filter(Boolean);
    } catch (error) {
      console.error('❌ AI応答解析エラー:', error);
      // フォールバック処理
      return knowledgeBatch.map(knowledge => ({
        knowledgeId: knowledge.id,
        score: 0.5, // 中立スコア
        reasoning: 'AI解析失敗のためフォールバックスコア',
        knowledgeTitle: knowledge.actualTitle,
        problemDescription: knowledge.problemDescription,
        solutionSummary: this.extractSolutionSummary(knowledge.solutionContent),
        targetPersona: knowledge.targetPersona,
        category: knowledge.problemCategory
      }));
    }
  }

  /**
   * キーワードベース類似度検索（フォールバック機能）
   */
  private performKeywordSimilaritySearch(
    userInput: string, 
    knowledgeList: any[]
  ): SimilarityScore[] {
    console.log('🔤 キーワードベース類似度検索実行中...');

    const userKeywords = this.extractKeywords(userInput.toLowerCase());

    return knowledgeList.map(knowledge => {
      const knowledgeText = `${knowledge.actualTitle} ${knowledge.problemDescription}`;
      const knowledgeKeywords = this.extractKeywords(knowledgeText.toLowerCase());

      const commonKeywords = userKeywords.filter(keyword => 
        knowledgeKeywords.some(kw => kw.includes(keyword) || keyword.includes(kw))
      );

      const score = commonKeywords.length / Math.max(userKeywords.length, 1);

      return {
        knowledgeId: knowledge.id,
        score: Math.min(score, 1.0),
        reasoning: `共通キーワード: ${commonKeywords.join(', ') || 'なし'}`,
        knowledgeTitle: knowledge.actualTitle,
        problemDescription: knowledge.problemDescription,
        solutionSummary: this.extractSolutionSummary(knowledge.solutionContent),
        targetPersona: knowledge.targetPersona,
        category: knowledge.problemCategory
      };
    });
  }

  /**
   * 対象ナレッジの取得
   */
  private getTargetKnowledge(filteredKnowledgeIds?: string[]): any[] {
    const allPairs = problemSolutionPairs.pairs;
    
    if (filteredKnowledgeIds && filteredKnowledgeIds.length > 0) {
      return filteredKnowledgeIds
        .map(id => ({ id, ...allPairs[id as keyof typeof allPairs] }))
        .filter(Boolean);
    }

    // フィルタリング指定がない場合は全ナレッジを対象
    return Object.entries(allPairs).map(([id, data]) => ({ id, ...data }));
  }

  /**
   * 解決策の要約抽出
   */
  private extractSolutionSummary(solutionContent: any): string {
    if (typeof solutionContent === 'string') {
      return solutionContent.length > 100 
        ? solutionContent.substring(0, 100) + '...'
        : solutionContent;
    }

    if (solutionContent?.keyMessage) {
      return solutionContent.keyMessage;
    }

    if (solutionContent?.methods && Array.isArray(solutionContent.methods)) {
      return solutionContent.methods.slice(0, 2).map((m: any) => m.name || m.title || '解決法').join(', ');
    }

    return '問題解決手法';
  }

  /**
   * キーワード抽出
   */
  private extractKeywords(text: string): string[] {
    // 日本語テキストから重要キーワードを抽出
    const stopWords = ['です', 'である', 'ます', 'した', 'する', 'される', 'こと', 'もの', 'ため', 'よう', 'など'];
    const words = text
      .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 1 && !stopWords.includes(word));

    return [...new Set(words)]; // 重複削除
  }

  /**
   * ベクトル計算による類似度（将来の拡張用）
   */
  async calculateVectorSimilarity(text1: string, text2: string): Promise<number> {
    // 将来的にはテキストをベクトル化して
    // コサイン類似度を計算する機能を実装予定
    // 現在はプレースホルダー
    return 0.5;
  }

  /**
   * 検索統計情報の取得
   */
  getSearchStats(): {
    totalKnowledge: number;
    availablePersonas: string[];
    availableCategories: string[];
  } {
    const pairs = problemSolutionPairs.pairs;
    const personas = new Set<string>();
    const categories = new Set<string>();

    Object.values(pairs).forEach((pair: any) => {
      personas.add(pair.targetPersona);
      categories.add(pair.problemCategory);
    });

    return {
      totalKnowledge: Object.keys(pairs).length,
      availablePersonas: [...personas].sort(),
      availableCategories: [...categories].sort()
    };
  }
}