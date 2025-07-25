/**
 * ナレッジベース専用型定義
 * 既存のTemplateTypesを拡張してナレッジベース情報を統合
 */

// import { TemplateData } from './templateTypes';

export interface KnowledgeSource {
  contentId: string;          // contents-001等の参照元
  typeId: string;            // TypeID=001~004
  typeName: string;          // 投稿タイプ名
  targetId: string;          // TargetID (T001~T012)
  targetName: string;        // ペルソナ名
  emotionLogicRatio: string; // "85:15"等の比率
  trustScore: number;        // 信頼度スコア
  psychologicalNeeds: string[];    // 心理的ニーズ
  triggerMoments: string[];        // トリガーモーメント
  emotionalState: string[];        // 感情状態
  urgencyLevel: string;            // 緊急度
}

export interface EnhancedTemplateData {
  knowledgeSource?: KnowledgeSource;
  generationMethod?: 'knowledge_based' | 'traditional';
  enhancementApplied?: boolean;
}

// ナレッジコンテンツのデータ構造
export interface KnowledgeContent {
  source: string;
  problemCategory: string;
  problemDescription: string;
  postType: string;
  postTypeReason: string;
  solutionContent: {
    概要: string;
    具体的手順: string[];
    提供情報: string[];
    実用的なアドバイス: string[];
  };
  effectiveExpressions: string[];
  searchKeywords: string[];
  emotionalTriggers: string[];
  marketingStage: string;
  knowledgeId: string;
  pageStructurePattern: string;
  actualTitle: string;
  pageCount: number;
  hashTag: string;
  detailedContent?: Record<string, any>;
}

export interface KnowledgeBaseParams {
  typeId: string;
  targetId?: string;
  personaIds?: string[];
  knowledgeIds?: string[];
  knowledgeContents?: KnowledgeContent[];
  knowledgeData?: any;  // 選択済みナレッジデータ
  useKnowledgeBase: boolean;
}

export interface GenerationResult {
  templateData: EnhancedTemplateData;
  knowledgeApplied: boolean;
  patternMatched?: string;
  confidenceScore?: number;
}

// TypeID選択用の型定義
export type TypeID = '001' | '002' | '003' | '004';

export interface TypeOption {
  id: TypeID;
  name: string;
  description: string;
  emotionRatioRange: string;
  characteristics: string[];
  recommendedFor: string[];
}

// TargetID 選択用の型定義（12ターゲット：4投稿タイプ×3ターゲット）
export type TargetID = 'T001' | 'T002' | 'T003' | 'T004' | 'T005' | 'T006' | 'T007' | 'T008' | 'T009' | 'T010' | 'T011' | 'T012';

export interface TargetOption {
  id: TargetID;
  name: string;
  description: string;
  compatibleTypes: TypeID[];
  characteristics: string[];
}


// 統計・分析用の型定義
export interface PatternStats {
  totalPatterns: number;
  byType: Record<TypeID, number>;
  avgTrustScore: number;
  topTemplates: Array<{
    template: string;
    count: number;
    avgTrustScore: number;
  }>;
}

export interface ContentAnalysis {
  estimatedType: TypeID;
  confidence: number;
  reasoning: string;
  recommendedTargets: TargetID[];
}

// UIコンポーネント用の型定義
export interface SelectionState {
  typeId?: TypeID;
  targetId?: TargetID;
  useKnowledgeBase: boolean;
  step: 'type' | 'target' | 'complete';
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

// フォーム用の型定義
export interface KnowledgeBaseForm {
  content: string;
  selectionState: SelectionState;
  autoDetection: boolean;
  analysisResult?: ContentAnalysis;
}

// エラーハンドリング用の型定義
export interface KnowledgeBaseError {
  code: string;
  message: string;
  details?: any;
  recoverable: boolean;
  fallbackAvailable: boolean;
}

// パフォーマンス測定用の型定義
export interface PerformanceMetrics {
  analysisTime: number;
  patternMatchingTime: number;
  promptGenerationTime: number;
  totalProcessingTime: number;
  cacheHit: boolean;
}

// A/Bテスト用の型定義
export interface ABTestVariant {
  variantId: 'knowledge_based' | 'traditional' | 'hybrid';
  applied: boolean;
  expectedImprovement: number;
  actualImprovement?: number;
}

export interface GenerationContext {
  sessionId: string;
  userId?: string;
  timestamp: Date;
  sourceFlow: 'research_formatter' | 'direct_input' | 'knowledge_selector';
  abTestVariant?: ABTestVariant;
  performanceMetrics?: PerformanceMetrics;
}