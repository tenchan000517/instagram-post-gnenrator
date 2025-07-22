/**
 * ナレッジベース専用型定義
 * 既存のTemplateTypesを拡張してナレッジベース情報を統合
 */

import { TemplateData } from './templateTypes';

export interface KnowledgeSource {
  contentId: string;          // contents-001等の参照元
  typeId: string;            // TypeID=001~004
  typeName: string;          // 投稿タイプ名
  targetId: string;          // PersonaID (P001~P007)
  targetName: string;        // ペルソナ名
  emotionLogicRatio: string; // "85:15"等の比率
  trustScore: number;        // 信頼度スコア
  psychologicalNeeds: string[];    // 心理的ニーズ
  triggerMoments: string[];        // トリガーモーメント
  emotionalState: string[];        // 感情状態
  urgencyLevel: string;            // 緊急度
}

export interface EnhancedTemplateData extends TemplateData {
  knowledgeSource?: KnowledgeSource;
  generationMethod?: 'knowledge_based' | 'traditional';
  enhancementApplied?: boolean;
}

export interface KnowledgeBaseParams {
  typeId: string;
  targetId?: string;
  themeId?: string;
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

// TargetID (PersonaID) 選択用の型定義
export type TargetID = 'P001' | 'P002' | 'P003' | 'P004' | 'P005' | 'P006' | 'P007';

export interface TargetOption {
  id: TargetID;
  name: string;
  description: string;
  compatibleTypes: TypeID[];
  characteristics: string[];
}

// ThemeID選択用の型定義
export type ThemeID = 
  'T001' | 'T002' | 'T003' | 'T004' | 'T005' | 
  'T006' | 'T007' | 'T008' | 'T009' | 'T010' |
  'T011' | 'T012' | 'T013' | 'T014' | 'T015' |
  'T016' | 'T017' | 'T018' | 'T019' | 'T020' | 'T021';

export interface ThemeOption {
  id: ThemeID;
  name: string;
  description: string;
  compatibleTypes: TypeID[];
  compatibleTargets: TargetID[];
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
  recommendedThemes: ThemeID[];
}

// UIコンポーネント用の型定義
export interface SelectionState {
  typeId?: TypeID;
  targetId?: TargetID;
  themeId?: ThemeID;
  useKnowledgeBase: boolean;
  step: 'type' | 'target' | 'theme' | 'generate' | 'complete';
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