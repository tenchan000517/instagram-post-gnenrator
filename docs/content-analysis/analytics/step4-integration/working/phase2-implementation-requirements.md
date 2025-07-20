# 【Phase 2】実装要件確定実行記録

## 📋 Phase 2概要

### 実行日・担当
- **実行日**: 2025-07-19
- **担当**: ステップ④最終システム統合・品質検証分析チーム
- **フェーズ**: Phase 2 - 実装要件確定
- **前提**: Phase 1システム統合設計完了（三次元統合アーキテクチャ確定）
- **目標**: 4コンポーネント実装仕様確定・技術仕様書作成完了

## 🎯 Phase 2-1: 技術仕様書作成

### システムアーキテクチャ詳細仕様

#### 統合システムアーキテクチャ実装仕様
```typescript
interface SystemArchitectureImplementation {
  // メインアーキテクチャ実装
  coreArchitecture: {
    framework: 'Next.js 14 (App Router)';
    language: 'TypeScript 5.0+';
    styling: 'Tailwind CSS 3.4+';
    icons: 'Lucide React';
    stateManagement: 'Zustand（軽量・型安全）';
    database: 'PostgreSQL 15+（統合データ基盤）';
    ai: 'Google Gemini AI（コンテンツ生成）';
    imageGeneration: 'html2canvas（画像出力）';
  };
  
  // 統合制御層実装
  integrationControlLayer: {
    threeDimensionController: {
      implementation: 'TypeScript Class-based Controller';
      responsibility: 'TypeID×PersonaID×ThemeID組み合わせ制御';
      methods: [
        'calculateThreeDimensionScore()',
        'detectPerfectMatch()',
        'applyQualityBonus()',
        'generateAlternatives()',
        'validateQualityThreshold()'
      ];
      perfectMatchHandling: 'Special processing pipeline for 98-97 point combinations';
    };
    
    qualityAssuranceEngine: {
      implementation: 'Real-time validation system';
      responsibility: '70点品質基準自動保証・代替案提示';
      methods: [
        'validateCombinationQuality()',
        'blockLowQualityCombinations()',
        'suggestHighQualityAlternatives()',
        'displayQualityTransparency()'
      ];
      qualityStandards: '70点未満自動ブロック・品質劣化防止';
    };
  };
  
  // データ統合基盤実装
  dataIntegrationFoundation: {
    database: {
      schema: 'instagram_post_generator（専用スキーマ）';
      tables: [
        'type_master（TypeID=001~004）',
        'persona_master（PersonaID=001~007）',
        'theme_master（ThemeID=001~015）',
        'three_dimension_mapping（420組み合わせ）',
        'perfect_match_configs（Perfect Match特別設定）'
      ];
      indexing: '三次元検索最適化・Perfect Match高速アクセス';
      constraints: 'データ整合性・一意性制約完備';
    };
    
    orm: {
      tool: 'Prisma ORM';
      models: 'TypeScript型安全・自動マイグレーション';
      relations: '三次元リレーション・Perfect Match連携';
      performance: 'クエリ最適化・N+1問題回避';
    };
  };
}
```

### API設計書（エンドポイント・パラメータ・レスポンス）

#### 統合API仕様詳細
```typescript
interface APISpecification {
  // 基本設定
  baseConfiguration: {
    protocol: 'HTTP/2';
    baseUrl: '/api/v1';
    authentication: 'JWT Token（セッション管理）';
    rateLimit: '1000 requests/hour per user';
    responseFormat: 'JSON（統一レスポンス形式）';
  };
  
  // TypeID関連API
  typeIdApis: {
    '/api/v1/types': {
      method: 'GET';
      description: 'TypeID一覧取得（Perfect Match情報含む）';
      parameters: {
        includeStats?: 'boolean（統計情報含む）';
        includePerfectMatch?: 'boolean（Perfect Match数含む）';
      };
      response: {
        success: 'boolean';
        data: {
          types: Array<{
            typeId: string; // '001'~'004'
            typeName: string;
            typeNameEn: string;
            description: string;
            icon: string;
            color: string;
            perfectMatchCount: number;
            averageScore: number;
            totalPosts: number;
          }>;
        };
        meta: {
          total: number;
          perfectMatchAvailable: boolean;
        };
      };
    };
    
    '/api/v1/types/{typeId}/recommendations': {
      method: 'GET';
      description: '指定TypeIDの推奨ThemeID・PersonaID取得';
      parameters: {
        typeId: string; // '001'~'004'
        quality?: 'high' | 'standard'; // 品質フィルター
        includePerfectMatch?: boolean;
      };
      response: {
        success: boolean;
        data: {
          recommendedThemes: Array<{
            themeId: string;
            themeName: string;
            averageScore: number;
            isPerfectMatchAvailable: boolean;
          }>;
          recommendedPersonas: Array<{
            personaId: string;
            personaName: string;
            compatibilityScore: number;
            priority: 'highest' | 'recommended' | 'optional';
          }>;
        };
      };
    };
  };
  
  // 三次元組み合わせAPI
  threeDimensionApis: {
    '/api/v1/combinations/analyze': {
      method: 'POST';
      description: '三次元組み合わせ分析・スコア算出';
      parameters: {
        body: {
          typeId: string; // '001'~'004'
          personaId?: string; // '001'~'007'（任意）
          themeId?: string; // '001'~'015'（任意）
          userTitle?: string; // ユーザー入力タイトル（任意）
        };
      };
      response: {
        success: boolean;
        data: {
          combinations: Array<{
            typeId: string;
            personaId: string;
            themeId: string;
            totalScore: number;
            typeThemeScore: number;
            personaThemeScore: number;
            typePersonaScore: number;
            synergyBonus: number;
            priorityClassification: 'perfect' | 'high' | 'standard' | 'low';
            isPerfectMatch: boolean;
            marketImpact: number;
            uniqueValueProposition?: string;
          }>;
          perfectMatches: Array<any>; // Perfect Match組み合わせ
          recommendations: Array<any>; // 推奨組み合わせ
        };
        meta: {
          totalCombinations: number;
          perfectMatchCount: number;
          highQualityCount: number;
          averageScore: number;
        };
      };
    };
    
    '/api/v1/combinations/perfect-matches': {
      method: 'GET';
      description: 'Perfect Match組み合わせ専用取得';
      parameters: {
        typeId?: string;
        themeId?: string;
        personaId?: string;
      };
      response: {
        success: boolean;
        data: {
          perfectMatches: Array<{
            typeId: string;
            personaId: string;
            themeId: string;
            totalScore: number; // 98-97点
            badgeText: string;
            guaranteeMessage: string;
            marketingHeadline: string;
            specialFeatures: object;
            uniqueValueProposition: string;
          }>;
        };
        meta: {
          total: number;
          marketCoverage: string; // '11.34%'等
        };
      };
    };
  };
  
  // コンテンツ生成API
  contentGenerationApis: {
    '/api/v1/content/generate': {
      method: 'POST';
      description: '統合コンテンツ生成（4コンポーネント統合）';
      parameters: {
        body: {
          typeId: string;
          personaId: string;
          themeId: string;
          userTitle: string;
          options?: {
            perfectMatchOptimization?: boolean;
            qualityBonus?: boolean;
            advancedFormatting?: boolean;
          };
        };
      };
      response: {
        success: boolean;
        data: {
          content: {
            title: string;
            formattedContent: string;
            templateId: string;
            qualityScore: number;
            optimizationsApplied: Array<string>;
          };
          metadata: {
            generationId: string;
            processingTime: number;
            isPerfectMatch: boolean;
            qualityBonusApplied: boolean;
            componentsUsed: Array<string>;
          };
          quality: {
            overallScore: number;
            contentQuality: number;
            templateMatching: number;
            uniqueness: number;
          };
        };
        meta: {
          generatedAt: string;
          version: string;
        };
      };
    };
  };
  
  // 品質保証API
  qualityAssuranceApis: {
    '/api/v1/quality/validate': {
      method: 'POST';
      description: '品質検証・代替案提示';
      parameters: {
        body: {
          typeId: string;
          personaId: string;
          themeId: string;
        };
      };
      response: {
        success: boolean;
        data: {
          validation: {
            qualityScore: number;
            meetsStandards: boolean; // 70点以上かどうか
            qualityLevel: 'perfect' | 'high' | 'standard' | 'low';
          };
          alternatives?: Array<{
            typeId: string;
            personaId: string;
            themeId: string;
            improvedScore: number;
            reason: string;
          }>;
          recommendations: Array<string>;
        };
      };
    };
  };
}
```

### データベース設計書（物理設計・パフォーマンス考慮）

#### 物理データベース設計詳細
```sql
-- 【物理設計】Instagram投稿生成システムデータベース
-- PostgreSQL 15+ 対応・高パフォーマンス設計

-- 基本設定
CREATE DATABASE instagram_post_generator 
  WITH ENCODING = 'UTF8' 
       LC_COLLATE = 'ja_JP.UTF-8' 
       LC_CTYPE = 'ja_JP.UTF-8'
       TEMPLATE = template0;

CREATE SCHEMA IF NOT EXISTS instagram_post_generator;

-- 【高パフォーマンス設定】
-- 接続プール設定
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET work_mem = '16MB';
ALTER SYSTEM SET maintenance_work_mem = '128MB';
ALTER SYSTEM SET effective_cache_size = '1GB';

-- 【メインテーブル群】物理設計最適化済み

-- 1. TypeIDマスタテーブル（最適化版）
CREATE TABLE instagram_post_generator.type_master (
  type_id VARCHAR(3) PRIMARY KEY CHECK (type_id ~ '^00[1-4]$'),
  type_name VARCHAR(100) NOT NULL,
  type_name_en VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  
  -- 判定基準（数値最適化）
  emotion_logic_ratio_min DECIMAL(3,1) CHECK (emotion_logic_ratio_min >= 0 AND emotion_logic_ratio_min <= 10),
  emotion_logic_ratio_max DECIMAL(3,1) CHECK (emotion_logic_ratio_max >= 0 AND emotion_logic_ratio_max <= 10),
  required_value_elements JSONB NOT NULL,
  judgment_threshold DECIMAL(3,1) NOT NULL CHECK (judgment_threshold >= 0 AND judgment_threshold <= 4),
  
  -- UI設定
  icon VARCHAR(20) NOT NULL,
  color VARCHAR(7) NOT NULL CHECK (color ~ '^#[0-9A-Fa-f]{6}$'),
  template_preferences JSONB,
  success_keywords JSONB,
  
  -- 統計・品質（集計最適化）
  total_posts INTEGER DEFAULT 0 CHECK (total_posts >= 0),
  average_score DECIMAL(4,2) DEFAULT 0 CHECK (average_score >= 0 AND average_score <= 100),
  perfect_match_count INTEGER DEFAULT 0 CHECK (perfect_match_count >= 0),
  
  -- システム管理
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- TypeIDテーブル最適化インデックス
CREATE INDEX idx_type_master_active ON instagram_post_generator.type_master(is_active) WHERE is_active = true;
CREATE INDEX idx_type_master_perfect_match ON instagram_post_generator.type_master(perfect_match_count DESC) WHERE perfect_match_count > 0;
CREATE INDEX idx_type_master_score ON instagram_post_generator.type_master(average_score DESC);

-- 2. PersonaIDマスタテーブル（最適化版）
CREATE TABLE instagram_post_generator.persona_master (
  persona_id VARCHAR(3) PRIMARY KEY CHECK (persona_id ~ '^00[1-7]$'),
  persona_name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  
  -- ペルソナ特性（検索最適化）
  age_range VARCHAR(20) CHECK (age_range IN ('18-22', '22-26', '26-30', '30-35', 'all')),
  gender_preference VARCHAR(20) CHECK (gender_preference IN ('male', 'female', 'all')),
  occupation_category VARCHAR(50) NOT NULL,
  situation_description TEXT NOT NULL,
  level_category VARCHAR(20) CHECK (level_category IN ('beginner', 'intermediate', 'advanced', 'all')),
  
  -- 心理・行動パターン（JSONB最適化）
  psychological_state JSONB NOT NULL,
  behavior_patterns JSONB NOT NULL,
  value_priorities JSONB NOT NULL,
  
  -- 市場データ（分析最適化）
  market_percentage DECIMAL(5,2) NOT NULL CHECK (market_percentage >= 0 AND market_percentage <= 100),
  post_count INTEGER DEFAULT 0 CHECK (post_count >= 0),
  
  -- システム管理
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- PersonaIDテーブル最適化インデックス
CREATE INDEX idx_persona_master_active ON instagram_post_generator.persona_master(is_active) WHERE is_active = true;
CREATE INDEX idx_persona_master_market ON instagram_post_generator.persona_master(market_percentage DESC);
CREATE INDEX idx_persona_master_category ON instagram_post_generator.persona_master(occupation_category, level_category);
CREATE INDEX idx_persona_psychological ON instagram_post_generator.persona_master USING GIN (psychological_state);
CREATE INDEX idx_persona_behavior ON instagram_post_generator.persona_master USING GIN (behavior_patterns);

-- 3. ThemeIDマスタテーブル（最適化版）
CREATE TABLE instagram_post_generator.theme_master (
  theme_id VARCHAR(3) PRIMARY KEY CHECK (theme_id ~ '^0(0[1-9]|1[0-5])$'),
  theme_name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  
  -- テーマ特性（検索・分析最適化）
  market_frequency DECIMAL(5,2) NOT NULL CHECK (market_frequency >= 0 AND market_frequency <= 100),
  difficulty_level VARCHAR(20) NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  keywords JSONB NOT NULL,
  related_topics JSONB,
  
  -- Perfect Match情報（高速アクセス）
  has_perfect_match BOOLEAN DEFAULT false NOT NULL,
  perfect_match_count INTEGER DEFAULT 0 CHECK (perfect_match_count >= 0),
  
  -- システム管理
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- ThemeIDテーブル最適化インデックス
CREATE INDEX idx_theme_master_active ON instagram_post_generator.theme_master(is_active) WHERE is_active = true;
CREATE INDEX idx_theme_master_frequency ON instagram_post_generator.theme_master(market_frequency DESC);
CREATE INDEX idx_theme_master_difficulty ON instagram_post_generator.theme_master(difficulty_level);
CREATE INDEX idx_theme_master_perfect_match ON instagram_post_generator.theme_master(has_perfect_match) WHERE has_perfect_match = true;
CREATE INDEX idx_theme_keywords ON instagram_post_generator.theme_master USING GIN (keywords);

-- 4. TypeID×PersonaID連携テーブル（高速化）
CREATE TABLE instagram_post_generator.type_persona_mapping (
  mapping_id SERIAL PRIMARY KEY,
  type_id VARCHAR(3) NOT NULL REFERENCES instagram_post_generator.type_master(type_id) ON DELETE CASCADE,
  persona_id VARCHAR(3) NOT NULL REFERENCES instagram_post_generator.persona_master(persona_id) ON DELETE CASCADE,
  
  -- 連携スコア（範囲最適化）
  compatibility_score INTEGER NOT NULL CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
  priority_level VARCHAR(20) NOT NULL CHECK (priority_level IN ('highest', 'recommended', 'optional')),
  reasoning TEXT NOT NULL,
  
  -- 実装設定（計算最適化）
  is_recommended BOOLEAN GENERATED ALWAYS AS (compatibility_score >= 70) STORED,
  display_order INTEGER CHECK (display_order > 0),
  
  -- システム管理
  analysis_date DATE DEFAULT CURRENT_DATE NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  UNIQUE(type_id, persona_id)
);

-- TypeID×PersonaID最適化インデックス
CREATE INDEX idx_type_persona_mapping_recommended ON instagram_post_generator.type_persona_mapping(is_recommended, compatibility_score DESC) WHERE is_recommended = true;
CREATE INDEX idx_type_persona_mapping_type ON instagram_post_generator.type_persona_mapping(type_id, compatibility_score DESC);
CREATE INDEX idx_type_persona_mapping_persona ON instagram_post_generator.type_persona_mapping(persona_id, compatibility_score DESC);
CREATE INDEX idx_type_persona_mapping_priority ON instagram_post_generator.type_persona_mapping(priority_level, compatibility_score DESC);

-- 5. 三次元連携マスタテーブル（超高速化）
CREATE TABLE instagram_post_generator.three_dimension_mapping (
  mapping_id SERIAL PRIMARY KEY,
  type_id VARCHAR(3) NOT NULL REFERENCES instagram_post_generator.type_master(type_id) ON DELETE CASCADE,
  persona_id VARCHAR(3) NOT NULL REFERENCES instagram_post_generator.persona_master(persona_id) ON DELETE CASCADE,
  theme_id VARCHAR(3) NOT NULL REFERENCES instagram_post_generator.theme_master(theme_id) ON DELETE CASCADE,
  
  -- 三次元スコア（計算最適化）
  total_score INTEGER NOT NULL CHECK (total_score >= 0 AND total_score <= 100),
  type_theme_score INTEGER NOT NULL CHECK (type_theme_score >= 0 AND type_theme_score <= 100),
  persona_theme_score INTEGER NOT NULL CHECK (persona_theme_score >= 0 AND persona_theme_score <= 100),
  type_persona_score INTEGER NOT NULL CHECK (type_persona_score >= 0 AND type_persona_score <= 100),
  synergy_bonus INTEGER DEFAULT 0 CHECK (synergy_bonus >= 0 AND synergy_bonus <= 20),
  
  -- 優先度・分類（検索最適化）
  priority_classification VARCHAR(20) NOT NULL CHECK (priority_classification IN ('perfect', 'high', 'standard', 'low')),
  market_impact DECIMAL(5,2) NOT NULL CHECK (market_impact >= 0 AND market_impact <= 100),
  implementation_value VARCHAR(50),
  
  -- Perfect Match特別設定（高速判定）
  is_perfect_match BOOLEAN GENERATED ALWAYS AS (total_score >= 95) STORED,
  unique_value_proposition TEXT,
  special_optimizations JSONB,
  
  -- 詳細分析結果（JSONB最適化）
  success_factors JSONB,
  content_focus_areas JSONB,
  optimization_strategies JSONB,
  
  -- 品質保証
  quality_assurance_passed BOOLEAN DEFAULT false NOT NULL,
  validation_date DATE,
  
  -- システム管理
  analysis_version VARCHAR(10) DEFAULT '1.0' NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  UNIQUE(type_id, persona_id, theme_id)
);

-- 三次元連携テーブル超高速インデックス群
CREATE INDEX idx_three_dimension_score_desc ON instagram_post_generator.three_dimension_mapping(total_score DESC, is_active) WHERE is_active = true;
CREATE INDEX idx_three_dimension_perfect_match ON instagram_post_generator.three_dimension_mapping(is_perfect_match, total_score DESC) WHERE is_perfect_match = true;
CREATE INDEX idx_three_dimension_priority ON instagram_post_generator.three_dimension_mapping(priority_classification, total_score DESC) WHERE is_active = true;
CREATE INDEX idx_three_dimension_type_theme ON instagram_post_generator.three_dimension_mapping(type_id, theme_id, total_score DESC);
CREATE INDEX idx_three_dimension_persona_theme ON instagram_post_generator.three_dimension_mapping(persona_id, theme_id, total_score DESC);
CREATE INDEX idx_three_dimension_type_persona ON instagram_post_generator.three_dimension_mapping(type_id, persona_id, total_score DESC);
CREATE INDEX idx_three_dimension_quality ON instagram_post_generator.three_dimension_mapping(quality_assurance_passed, total_score DESC) WHERE quality_assurance_passed = true;

-- 複合検索用高速インデックス
CREATE INDEX idx_three_dimension_lookup ON instagram_post_generator.three_dimension_mapping(type_id, persona_id, theme_id) INCLUDE (total_score, is_perfect_match, priority_classification);

-- 6. Perfect Match設定テーブル（特別最適化）
CREATE TABLE instagram_post_generator.perfect_match_configs (
  config_id SERIAL PRIMARY KEY,
  type_id VARCHAR(3) NOT NULL,
  persona_id VARCHAR(3) NOT NULL,
  theme_id VARCHAR(3) NOT NULL,
  
  -- Perfect Match専用設定
  badge_text VARCHAR(50) NOT NULL,
  guarantee_message TEXT NOT NULL,
  marketing_headline TEXT,
  special_features JSONB,
  
  -- UI/UX最適化
  visual_effects JSONB,
  content_enhancements JSONB,
  user_guidance JSONB,
  
  -- 生成最適化
  prompt_optimizations JSONB,
  quality_bonuses JSONB,
  template_customizations JSONB,
  
  -- システム管理
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  FOREIGN KEY (type_id, persona_id, theme_id) 
    REFERENCES instagram_post_generator.three_dimension_mapping (type_id, persona_id, theme_id)
    ON DELETE CASCADE
);

-- Perfect Match高速アクセスインデックス
CREATE UNIQUE INDEX idx_perfect_match_configs_lookup ON instagram_post_generator.perfect_match_configs(type_id, persona_id, theme_id) WHERE is_active = true;
CREATE INDEX idx_perfect_match_configs_active ON instagram_post_generator.perfect_match_configs(is_active) WHERE is_active = true;

-- 【パフォーマンス最適化】パーティショニング
-- 大量データ対応の年別パーティション（将来対応）
-- CREATE TABLE instagram_post_generator.user_sessions_2025 PARTITION OF instagram_post_generator.user_sessions FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- 【統計情報・自動バキューム設定】
ALTER TABLE instagram_post_generator.three_dimension_mapping SET (
  autovacuum_vacuum_scale_factor = 0.1,
  autovacuum_analyze_scale_factor = 0.05
);

-- 【セキュリティ設定】
-- 読み取り専用ユーザー
CREATE ROLE instagram_readonly;
GRANT USAGE ON SCHEMA instagram_post_generator TO instagram_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA instagram_post_generator TO instagram_readonly;

-- アプリケーションユーザー
CREATE ROLE instagram_app;
GRANT USAGE ON SCHEMA instagram_post_generator TO instagram_app;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA instagram_post_generator TO instagram_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA instagram_post_generator TO instagram_app;
```

### フロントエンド設計書（UI/UX・コンポーネント設計）

#### フロントエンド統合設計詳細
```typescript
interface FrontendArchitectureSpecification {
  // 基本構成
  coreConfiguration: {
    framework: 'Next.js 14 (App Router)';
    typescript: 'TypeScript 5.0+ (Strict mode)';
    styling: 'Tailwind CSS 3.4+';
    components: 'React Server Components + Client Components';
    icons: 'Lucide React';
    state: 'Zustand (Client-side state)';
    forms: 'React Hook Form + Zod validation';
    animation: 'Framer Motion';
  };
  
  // 統合UI/UXコンポーネント設計
  uiComponentSystem: {
    // メインフロー統合コンポーネント
    mainFlowComponents: {
      ThreeDimensionSelector: {
        path: '/components/selectors/ThreeDimensionSelector.tsx';
        purpose: '三次元統合選択インターフェース';
        features: [
          'TypeID→ThemeID→PersonaID段階選択',
          'Perfect Match リアルタイム表示',
          '品質スコア可視化',
          '代替案自動提示'
        ];
        state: {
          selectedTypeId: 'string | null';
          selectedThemeId: 'string | null';
          selectedPersonaId: 'string | null';
          currentCombinationScore: 'number';
          availableCombinations: 'ThreeDimensionCombination[]';
          perfectMatches: 'PerfectMatchConfig[]';
        };
      };
      
      PerfectMatchDisplay: {
        path: '/components/display/PerfectMatchDisplay.tsx';
        purpose: 'Perfect Match特別表示コンポーネント';
        features: [
          'Perfect Matchバッジ・特別UI',
          '98-97点品質保証表示',
          '差別化要素プレビュー',
          '特別最適化適用状況'
        ];
        animations: 'Perfect Match発見時の特別エフェクト';
      };
      
      QualityAssuranceIndicator: {
        path: '/components/quality/QualityAssuranceIndicator.tsx';
        purpose: 'リアルタイム品質表示・透明性確保';
        features: [
          '三次元スコアリアルタイム計算',
          '70点品質基準チェック',
          '品質向上要因説明',
          '代替案提示UI'
        ];
      };
      
      ContentGenerationWorkflow: {
        path: '/components/generation/ContentGenerationWorkflow.tsx';
        purpose: '統合コンテンツ生成フロー';
        features: [
          '4コンポーネント統合処理',
          'Perfect Match特別処理表示',
          'リアルタイム生成状況',
          '品質検証・結果表示'
        ];
      };
    };
    
    // 三次元システム専用コンポーネント
    threeDimensionComponents: {
      TypeIdSelector: {
        path: '/components/selectors/TypeIdSelector.tsx';
        purpose: 'TypeID選択・Perfect Match情報表示';
        features: [
          '4種TypeID表示（001-004）',
          'Perfect Match保有数表示',
          '平均品質スコア表示',
          '選択時の推奨情報表示'
        ];
        ui: {
          layout: 'Grid 2x2 responsive layout';
          styling: 'Tailwind with custom TypeID colors';
          interaction: 'Hover effects + Perfect Match highlighting';
        };
      };
      
      ThemeIdSelector: {
        path: '/components/selectors/ThemeIdSelector.tsx';
        purpose: 'ThemeID選択・三次元最適化表示';
        features: [
          '15種ThemeID表示（001-015）',
          '市場頻度・難易度表示',
          'TypeID連携品質表示',
          'Perfect Match候補強調'
        ];
        ui: {
          layout: 'Responsive grid with search/filter';
          styling: 'Category-based color coding';
          interaction: 'Dynamic quality score updates';
        };
      };
      
      PersonaIdSelector: {
        path: '/components/selectors/PersonaIdSelector.tsx';
        purpose: 'PersonaID選択・最終最適化表示';
        features: [
          '7種PersonaID表示（001-007）',
          '三次元最終スコア表示',
          'Perfect Match自動検出',
          '最適化適用プレビュー'
        ];
        ui: {
          layout: 'Vertical list with detailed cards';
          styling: 'Persona-specific theming';
          interaction: 'Final score calculation animations';
        };
      };
    };
    
    // 品質保証・透明性コンポーネント
    qualityComponents: {
      ScoreVisualization: {
        path: '/components/quality/ScoreVisualization.tsx';
        purpose: '三次元スコア可視化・透明性確保';
        features: [
          '三次元スコア内訳表示',
          '品質向上要因説明',
          'Perfect Match判定表示',
          '代替案比較表示'
        ];
        visualization: 'Interactive charts with D3.js integration';
      };
      
      QualityGuarantee: {
        path: '/components/quality/QualityGuarantee.tsx';
        purpose: '品質保証・代替案提示';
        features: [
          '70点品質基準チェック',
          '低品質組み合わせブロック',
          '高品質代替案自動提示',
          '品質向上アドバイス'
        ];
        interaction: 'Automatic quality validation with user guidance';
      };
    };
    
    // Perfect Match専用コンポーネント
    perfectMatchComponents: {
      PerfectMatchBadge: {
        path: '/components/perfect-match/PerfectMatchBadge.tsx';
        purpose: 'Perfect Match専用バッジ・UI強調';
        features: [
          '98-97点スコア強調表示',
          '特別バッジ・アニメーション',
          '差別化要素アピール',
          '市場直撃率表示（11.34%）'
        ];
        styling: 'Premium gradient styling with animations';
      };
      
      PerfectMatchOptimization: {
        path: '/components/perfect-match/PerfectMatchOptimization.tsx';
        purpose: 'Perfect Match特別最適化表示';
        features: [
          '特別最適化適用状況',
          '品質ボーナス表示',
          '独自価値提案表示',
          '競合優位性アピール'
        ];
      };
    };
  };
  
  // ページ・ルーティング設計
  pageArchitecture: {
    routing: {
      basePath: '/';
      structure: {
        '/': 'ランディングページ（Perfect Match訴求）';
        '/generate': 'メイン生成フロー（三次元統合）';
        '/generate/[step]': '段階的選択フロー（step1-4）';
        '/result/[id]': '生成結果表示・共有';
        '/analytics': '品質分析・統計表示（管理者用）';
      };
    };
    
    pages: {
      MainGenerationPage: {
        path: '/app/generate/page.tsx';
        purpose: 'メイン生成フロー統合ページ';
        components: [
          'ThreeDimensionSelector',
          'PerfectMatchDisplay',
          'QualityAssuranceIndicator',
          'ContentGenerationWorkflow'
        ];
        layout: 'Step-by-step wizard with quality transparency';
      };
      
      ResultPage: {
        path: '/app/result/[id]/page.tsx';
        purpose: '生成結果表示・共有・品質詳細';
        components: [
          'GeneratedContentDisplay',
          'QualityScoreBreakdown',
          'OptimizationDetails',
          'ShareInterface'
        ];
        features: [
          'Perfect Match特別表示',
          '品質スコア詳細',
          '最適化適用状況',
          'SNS共有機能'
        ];
      };
    };
  };
  
  // 状態管理設計
  stateManagement: {
    zustandStores: {
      threeDimensionStore: {
        path: '/stores/threeDimensionStore.ts';
        purpose: '三次元選択状態・組み合わせ管理';
        state: {
          selectedTypeId: 'string | null';
          selectedThemeId: 'string | null';
          selectedPersonaId: 'string | null';
          currentScore: 'number';
          availableCombinations: 'ThreeDimensionCombination[]';
          perfectMatches: 'PerfectMatchConfig[]';
          qualityValidation: 'QualityValidationResult';
        };
        actions: [
          'selectTypeId',
          'selectThemeId',
          'selectPersonaId',
          'calculateScore',
          'validateQuality',
          'loadPerfectMatches'
        ];
      };
      
      qualityStore: {
        path: '/stores/qualityStore.ts';
        purpose: '品質保証・透明性管理';
        state: {
          currentQualityScore: 'number';
          qualityBreakdown: 'QualityBreakdown';
          qualityThresholdMet: 'boolean';
          alternatives: 'AlternativeCombination[]';
          perfectMatchDetected: 'boolean';
        };
        actions: [
          'updateQualityScore',
          'validateThreshold',
          'loadAlternatives',
          'checkPerfectMatch'
        ];
      };
      
      generationStore: {
        path: '/stores/generationStore.ts';
        purpose: 'コンテンツ生成・4コンポーネント統合';
        state: {
          generationStatus: 'idle | generating | completed | error';
          currentStep: 'research | format | generate | template';
          generatedContent: 'GeneratedContent | null';
          optimizationsApplied: 'string[]';
          finalQualityScore: 'number';
        };
        actions: [
          'startGeneration',
          'updateStep',
          'completeGeneration',
          'applyOptimizations'
        ];
      };
    };
  };
  
  // 型定義・インターフェース
  typeDefinitions: {
    coreTypes: {
      ThreeDimensionCombination: {
        typeId: 'string';
        personaId: 'string';
        themeId: 'string';
        totalScore: 'number';
        isPerfectMatch: 'boolean';
        priorityClassification: 'perfect | high | standard | low';
        uniqueValueProposition?: 'string';
      };
      
      PerfectMatchConfig: {
        typeId: 'string';
        personaId: 'string';
        themeId: 'string';
        badgeText: 'string';
        guaranteeMessage: 'string';
        marketingHeadline: 'string';
        specialFeatures: 'object';
      };
      
      QualityValidationResult: {
        score: 'number';
        meetsStandards: 'boolean';
        qualityLevel: 'perfect | high | standard | low';
        alternatives: 'AlternativeCombination[]';
        recommendations: 'string[]';
      };
    };
  };
}
```

## 🎯 Phase 2-2: コンポーネント実装仕様

### 1. リサーチプロンプト生成エンジン実装仕様

#### 三次元最適化リサーチプロンプト生成
```typescript
interface ResearchPromptGenerationEngine {
  // クラス設計
  classStructure: {
    className: 'ThreeDimensionResearchPromptGenerator';
    path: '/lib/engines/ResearchPromptGenerator.ts';
    extends: 'BaseEngine';
    implements: ['IPromptGenerator', 'IThreeDimensionOptimizer'];
  };
  
  // メイン機能実装
  coreImplementation: {
    generateThreeDimensionPrompt: {
      signature: '(params: ThreeDimensionPromptParams) => Promise<OptimizedPrompt>';
      purpose: 'TypeID×PersonaID×ThemeID最適化プロンプト生成';
      algorithm: {
        step1: 'TypeID特性抽出・プロンプト要素確定';
        step2: 'PersonaID心理パターン・行動要素統合';
        step3: 'ThemeID専門要素・市場要素統合';
        step4: '三次元相乗効果算出・最適化適用';
        step5: 'Perfect Match特別最適化適用';
      };
      implementation: `
        async generateThreeDimensionPrompt(params: ThreeDimensionPromptParams): Promise<OptimizedPrompt> {
          // Step 1: TypeID特性抽出
          const typeCharacteristics = await this.extractTypeCharacteristics(params.typeId);
          
          // Step 2: PersonaID心理パターン統合
          const personaPattern = await this.extractPersonaPattern(params.personaId);
          
          // Step 3: ThemeID専門要素統合
          const themeElements = await this.extractThemeElements(params.themeId);
          
          // Step 4: 三次元相乗効果算出
          const synergyBonus = await this.calculateThreeDimensionSynergy(
            typeCharacteristics, 
            personaPattern, 
            themeElements
          );
          
          // Step 5: Perfect Match特別最適化
          const perfectMatchOptimizations = await this.applyPerfectMatchOptimizations(
            params, 
            synergyBonus
          );
          
          // 最終プロンプト生成
          return await this.assembleOptimizedPrompt({
            userTitle: params.userTitle,
            typeCharacteristics,
            personaPattern,
            themeElements,
            synergyBonus,
            perfectMatchOptimizations
          });
        }
      `;
    };
    
    applyPerfectMatchOptimizations: {
      signature: '(params: any, synergyBonus: number) => Promise<PerfectMatchOptimizations>';
      purpose: 'Perfect Match組み合わせの特別最適化適用';
      perfectMatchLogic: {
        detection: '98-97点組み合わせの自動検出';
        specialPromptEnhancement: '差別化要素・独自価値の自動組み込み';
        qualityBonusApplication: '20-30%品質ボーナス適用';
        uniqueValueIntegration: '市場直撃11.34%要素の強調';
      };
    };
    
    calculateThreeDimensionSynergy: {
      signature: '(type: any, persona: any, theme: any) => Promise<number>';
      purpose: '三次元相乗効果算出・最適化係数計算';
      calculation: {
        typeThemeSynergy: 'TypeID×ThemeID適合度（0-40点）';
        personaThemeSynergy: 'PersonaID×ThemeID適合度（0-40点）';
        typePersonaSynergy: 'TypeID×PersonaID適合度（0-40点）';
        tripleBonus: '三次元完全適合ボーナス（0-20点）';
        perfectMatchMultiplier: 'Perfect Match時の1.2-1.3倍係数';
      };
    };
  };
  
  // Perfect Match特化実装
  perfectMatchImplementation: {
    detectPerfectMatch: {
      signature: '(combination: ThreeDimensionCombination) => boolean';
      purpose: 'Perfect Match組み合わせの自動検出';
      criteria: {
        scoreThreshold: '95点以上（98-97点想定）';
        uniqueValuePresence: '差別化要素の存在確認';
        marketImpactValidation: '市場インパクト検証';
        competitiveAdvantage: '競合優位性確認';
      };
    };
    
    generatePerfectMatchPrompt: {
      signature: '(params: PerfectMatchParams) => Promise<PremiumPrompt>';
      purpose: 'Perfect Match専用プレミアムプロンプト生成';
      enhancements: [
        '差別化要素の自動強調',
        '独自価値提案の組み込み',
        '市場直撃要素の最大活用',
        '競合優位性の自動訴求',
        '品質保証要素の統合'
      ];
    };
  };
  
  // プロンプトテンプレート管理
  promptTemplateManagement: {
    typeBasedTemplates: {
      empathy_emotional: 'TypeID=001用感情誘導特化テンプレート';
      educational_learning: 'TypeID=002用学習特化テンプレート';
      information_data: 'TypeID=003用情報提供特化テンプレート';
      efficiency_practical: 'TypeID=004用実用特化テンプレート';
    };
    
    personaBasedEnhancements: {
      job_hunting_basic: 'PersonaID=001用基本就活支援強化';
      job_hunting_practice: 'PersonaID=002用実践就活支援強化';
      efficiency_oriented: 'PersonaID=003用効率化特化強化';
      career_building: 'PersonaID=004用キャリア構築強化';
      emotional_empathy: 'PersonaID=005用感情共感強化';
      specialized_expert: 'PersonaID=006用専門特化強化';
      information_collector: 'PersonaID=007用情報収集特化強化';
    };
    
    themeBasedSpecializations: {
      es_resume: 'ThemeID=001 ES・履歴書専門化（Perfect Match保有）';
      interview_prep: 'ThemeID=002 面接対策専門化（High Priority）';
      industry_research: 'ThemeID=003 業界研究専門化（High Priority）';
      internship: 'ThemeID=004 インターンシップ専門化';
      job_hunting_psychology: 'ThemeID=005 就活心理専門化（Perfect Match保有）';
      self_analysis: 'ThemeID=006 自己分析専門化';
      gakuchika_pr: 'ThemeID=007 ガクチカ・自己PR専門化';
      spi_aptitude: 'ThemeID=008 SPI・適性検査専門化';
      ai_technology: 'ThemeID=009 AI・技術活用専門化（Perfect Match保有）';
      skill_certification: 'ThemeID=010 スキル習得専門化（High Priority）';
      job_hunting_planning: 'ThemeID=011 就活準備専門化';
      ob_og_visits: 'ThemeID=012 OB・OG訪問専門化';
      group_discussion: 'ThemeID=013 グループディスカッション専門化';
      job_offer_decision: 'ThemeID=014 内定・進路選択専門化';
      career_change: 'ThemeID=015 転職・キャリアチェンジ専門化';
    };
  };
  
  // パフォーマンス最適化
  performanceOptimization: {
    caching: {
      templateCaching: 'プロンプトテンプレートの長期キャッシュ';
      combinationCaching: '三次元組み合わせ結果のキャッシュ';
      perfectMatchCaching: 'Perfect Match結果の高優先度キャッシュ';
    };
    
    preprocessing: {
      typeCharacteristicsPreload: 'TypeID特性の事前読み込み';
      personaPatternPreload: 'PersonaID心理パターンの事前準備';
      themeElementsPreload: 'ThemeID専門要素の事前取得';
    };
    
    optimization: {
      parallelProcessing: '三次元要素の並列処理';
      batchGeneration: '複数組み合わせの一括生成';
      streamingResponse: 'プロンプト生成のストリーミング対応';
    };
  };
}
```

### 2. フォーマッターシステム実装仕様

#### TypeID構造適合フォーマッターシステム
```typescript
interface FormatterSystemImplementation {
  // クラス設計
  classStructure: {
    className: 'ThreeDimensionFormatter';
    path: '/lib/engines/FormatterSystem.ts';
    extends: 'BaseFormatter';
    implements: ['IStructureFormatter', 'IQualityOptimizer'];
  };
  
  // TypeID別構造適合実装
  typeIdStructureImplementation: {
    formatByTypeId: {
      signature: '(content: string, typeId: string, context: FormattingContext) => Promise<FormattedContent>';
      purpose: 'TypeID別最適構造適用・情報整理最適化';
      implementation: `
        async formatByTypeId(content: string, typeId: string, context: FormattingContext): Promise<FormattedContent> {
          // TypeID特性取得
          const typeCharacteristics = await this.getTypeCharacteristics(typeId);
          
          // 構造適合処理
          const structureOptimized = await this.applyTypeSpecificStructure(content, typeCharacteristics);
          
          // 三次元品質保証
          const qualityAssured = await this.applyThreeDimensionQualityAssurance(
            structureOptimized, 
            context
          );
          
          // Perfect Match特別処理
          if (context.isPerfectMatch) {
            return await this.applyPerfectMatchFormatting(qualityAssured, context);
          }
          
          return qualityAssured;
        }
      `;
    };
    
    typeSpecificFormatters: {
      empathy_emotional_formatter: {
        typeId: '001';
        purpose: '共感・感情誘導型構造適合';
        structure: {
          opening: '感情的フック・共感要素（25%）';
          development: 'ストーリー展開・感情誘導（50%）';
          climax: '感情ピーク・共感最大化（15%）';
          closing: '行動誘導・感情的締結（10%）';
        };
        optimizations: [
          '感情キーワード密度最適化',
          'ストーリーテリング構造強化',
          '共感要素の戦略的配置',
          '行動誘導の自然な組み込み'
        ];
      };
      
      educational_learning_formatter: {
        typeId: '002';
        purpose: '教育・学習特化型構造適合';
        structure: {
          learning_objective: '学習目標明示（15%）';
          knowledge_foundation: '基礎知識・前提整理（25%）';
          main_content: '核心的学習内容（45%）';
          practical_application: '実践応用・活用方法（15%）';
        };
        optimizations: [
          '段階的理解促進構造',
          '実践的応用例の組み込み',
          '学習効果最大化配列',
          '復習・定着要素の統合'
        ];
      };
      
      information_data_formatter: {
        typeId: '003';
        purpose: '情報提供・データ型構造適合';
        structure: {
          summary: '要約・核心情報（20%）';
          detailed_information: '詳細情報・データ（60%）';
          analysis: '分析・解釈（15%）';
          actionable_insights: '実行可能な洞察（5%）';
        };
        optimizations: [
          '情報密度最適化',
          'データ信頼性強化',
          '読みやすさ向上',
          '検索性・参照性向上'
        ];
      };
      
      efficiency_practical_formatter: {
        typeId: '004';
        purpose: '効率・実用特化型構造適合';
        structure: {
          quick_overview: '即効性概要（15%）';
          step_by_step: '段階的実行手順（60%）';
          tips_tricks: 'コツ・効率化要素（20%）';
          time_savings: '時短・効果測定（5%）';
        };
        optimizations: [
          '実行効率最大化',
          '時短要素の強調',
          '実用性の証明',
          '即効性の担保'
        ];
      };
    };
  };
  
  // 三次元品質保証フォーマット
  threeDimensionQualityFormatting: {
    applyThreeDimensionQualityAssurance: {
      signature: '(content: FormattedContent, context: FormattingContext) => Promise<QualityAssuredContent>';
      purpose: '三次元組み合わせ品質保証・最適化適用';
      qualityChecks: {
        typePersonaAlignment: 'TypeID×PersonaID適合度チェック';
        themePersonaRelevance: 'ThemeID×PersonaID関連性確認';
        typeThemeStructure: 'TypeID×ThemeID構造適合検証';
        overallCoherence: '全体的統一性・一貫性確保';
      };
      optimizations: {
        synergyEnhancement: '三次元相乗効果の最大化';
        qualityBonusApplication: '品質ボーナス要素の組み込み';
        uniqueValueIntegration: '差別化要素の自然な統合';
        competitiveAdvantageEmphasis: '競合優位性の強調';
      };
    };
    
    validateQualityThreshold: {
      signature: '(content: QualityAssuredContent) => QualityValidationResult';
      purpose: '70点品質基準チェック・代替案提示';
      validation: {
        structuralQuality: '構造品質評価（30%重み）';
        contentRelevance: 'コンテンツ関連性評価（25%重み）';
        personaAlignment: 'ペルソナ適合度評価（25%重み）';
        uniqueness: '独自性・差別化評価（20%重み）';
      };
      thresholdActions: {
        above70: '品質基準合格・そのまま進行';
        between60_70: '警告表示・改善提案・ユーザー選択';
        below60: '自動ブロック・代替案強制提示';
      };
    };
  };
  
  // Perfect Match特別フォーマット
  perfectMatchFormatting: {
    applyPerfectMatchFormatting: {
      signature: '(content: QualityAssuredContent, context: PerfectMatchContext) => Promise<PremiumFormattedContent>';
      purpose: 'Perfect Match特別フォーマット・差別化最大化';
      enhancements: {
        premiumStructure: 'Perfect Match専用プレミアム構造適用';
        uniqueValueAmplification: '独自価値提案の増幅';
        competitiveAdvantageMaximization: '競合優位性の最大化';
        qualityGuaranteeIntegration: '品質保証要素の統合';
      };
      specialElements: {
        perfectMatchBadging: 'Perfect Matchバッジ情報の統合';
        guaranteeMessaging: '品質保証メッセージの組み込み';
        differentiationHighlight: '差別化要素の戦略的強調';
        premiumValueProposition: 'プレミアム価値提案の展開';
      };
    };
  };
  
  // ページ構成適合ロジック
  pageStructureAdaptation: {
    adaptToPageStructure: {
      signature: '(content: FormattedContent, pageRequirements: PageRequirements) => AdaptedContent';
      purpose: 'Instagram投稿ページ構成への最適適合';
      adaptations: {
        characterLimiting: '文字数制限適合（投稿種類別）';
        visualElementIntegration: 'ビジュアル要素統合最適化';
        readabilityOptimization: 'スマホ読みやすさ最適化';
        engagementMaximization: 'エンゲージメント最大化構造';
      };
      instagramOptimizations: {
        hashtagIntegration: 'ハッシュタグ最適配置';
        callToActionPlacement: 'CTA最適配置';
        visualBreaking: 'ビジュアル区切り最適化';
        scrollabilityEnhancement: 'スクロール性向上';
      };
    };
  };
  
  // パフォーマンス・品質監視
  performanceMonitoring: {
    formatQualityMetrics: {
      purpose: 'フォーマット品質の継続監視';
      metrics: [
        'TypeID適合度スコア',
        '三次元品質スコア',
        'Perfect Match品質維持率',
        'ユーザー満足度指標'
      ];
    };
    
    optimizationFeedback: {
      purpose: 'フォーマット最適化の継続改善';
      feedback: [
        'A/Bテスト結果反映',
        'ユーザー行動データ分析',
        'エンゲージメント率向上',
        'Perfect Match効果測定'
      ];
    };
  };
}
```

### 3. コンテンツ生成システム実装仕様

#### TypeID×PersonaID有益性抽出システム
```typescript
interface ContentGenerationSystemImplementation {
  // クラス設計
  classStructure: {
    className: 'ThreeDimensionContentGenerator';
    path: '/lib/engines/ContentGenerationSystem.ts';
    extends: 'BaseContentGenerator';
    implements: ['IThreeDimensionOptimizer', 'IPerfectMatchHandler'];
  };
  
  // メインコンテンツ生成実装
  coreGenerationImplementation: {
    generateThreeDimensionContent: {
      signature: '(params: ThreeDimensionGenerationParams) => Promise<OptimizedContent>';
      purpose: 'TypeID×PersonaID×ThemeID最適化コンテンツ生成';
      process: {
        step1: 'リサーチプロンプト統合・AI指示最適化';
        step2: 'フォーマット構造適用・TypeID適合';
        step3: 'PersonaID有益性抽出・価値最大化';
        step4: 'ThemeID専門性統合・市場適合';
        step5: 'Perfect Match特別生成・差別化実現';
      };
      implementation: `
        async generateThreeDimensionContent(params: ThreeDimensionGenerationParams): Promise<OptimizedContent> {
          // Step 1: 統合プロンプト準備
          const optimizedPrompt = await this.researchPromptGenerator.generateThreeDimensionPrompt(params);
          
          // Step 2: フォーマット構造適用
          const structuredPrompt = await this.formatterSystem.formatByTypeId(
            optimizedPrompt.content, 
            params.typeId, 
            { isPerfectMatch: params.isPerfectMatch }
          );
          
          // Step 3: PersonaID有益性抽出
          const personaOptimizedContent = await this.extractPersonaBenefits(
            structuredPrompt, 
            params.personaId,
            params.themeId
          );
          
          // Step 4: ThemeID専門性統合
          const themeIntegratedContent = await this.integrateThemeExpertise(
            personaOptimizedContent,
            params.themeId,
            params.typeId
          );
          
          // Step 5: Perfect Match特別生成
          if (params.isPerfectMatch) {
            return await this.generatePerfectMatchContent(themeIntegratedContent, params);
          }
          
          // 最終品質保証
          return await this.applyFinalQualityAssurance(themeIntegratedContent, params);
        }
      `;
    };
    
    extractPersonaBenefits: {
      signature: '(content: string, personaId: string, themeId: string) => Promise<PersonaOptimizedContent>';
      purpose: 'PersonaID特性に基づく有益性抽出・価値最大化';
      personaSpecificBenefits: {
        job_hunting_basic: {
          personaId: '001';
          benefits: [
            '就活基礎知識の段階的習得',
            '不安解消・自信向上要素',
            '実践的ステップバイステップ',
            '失敗回避・成功確率向上'
          ];
          valueMaximization: '初心者向け安心感・確実性の強調';
        };
        
        job_hunting_practice: {
          personaId: '002';
          benefits: [
            '実践的スキル・テクニック',
            '即効性・結果直結要素',
            '差別化・競合優位性',
            '選考突破率向上'
          ];
          valueMaximization: '実践的成果・具体的優位性の強調';
        };
        
        efficiency_oriented: {
          personaId: '003';
          benefits: [
            '時短・効率化の具体的手法',
            '労力対効果最大化',
            'システマティック・体系的',
            '自動化・最適化要素'
          ];
          valueMaximization: '効率性・時短効果の数値化・証明';
        };
        
        career_building: {
          personaId: '004';
          benefits: [
            '長期キャリア価値',
            'スキル・経験の蓄積',
            '将来性・成長可能性',
            '市場価値向上要素'
          ];
          valueMaximization: '将来投資価値・ROI向上の明示';
        };
        
        emotional_empathy: {
          personaId: '005';
          benefits: [
            '感情的サポート・共感',
            '心理的安定・安心感',
            '仲間意識・所属感',
            'モチベーション向上'
          ];
          valueMaximization: '感情的価値・心理的効果の重視';
        };
        
        specialized_expert: {
          personaId: '006';
          benefits: [
            '専門性・深い知識',
            '技術的優位性',
            '業界特化・専門化',
            '競合差別化要素'
          ];
          valueMaximization: '専門価値・技術的優位性の証明';
        };
        
        information_collector: {
          personaId: '007';
          benefits: [
            '情報網羅性・完全性',
            '最新情報・トレンド',
            '情報の整理・体系化',
            '情報活用・応用方法'
          ];
          valueMaximization: '情報価値・活用可能性の最大化';
        };
      };
    };
    
    integrateThemeExpertise: {
      signature: '(content: PersonaOptimizedContent, themeId: string, typeId: string) => Promise<ThemeIntegratedContent>';
      purpose: 'ThemeID専門性統合・市場適合性確保';
      themeSpecificIntegration: {
        es_resume: 'ES・履歴書専門知識・テンプレート・成功例統合';
        interview_prep: '面接対策専門技術・質問対応・印象管理統合';
        industry_research: '業界研究方法論・情報源・分析手法統合';
        internship: 'インターンシップ戦略・選考・活用方法統合';
        job_hunting_psychology: '就活心理学・メンタル管理・動機維持統合';
        self_analysis: '自己分析手法・ツール・深掘り技術統合';
        gakuchika_pr: 'ガクチカ・自己PR構築・差別化・訴求統合';
        spi_aptitude: 'SPI対策・適性検査・効率学習法統合';
        ai_technology: 'AI活用・技術トレンド・就活応用統合';
        skill_certification: 'スキル習得・資格取得・価値証明統合';
        job_hunting_planning: '就活計画・スケジュール・進捗管理統合';
        ob_og_visits: 'OB・OG訪問・ネットワーク・情報収集統合';
        group_discussion: 'GD対策・チームワーク・発言技術統合';
        job_offer_decision: '内定判断・進路選択・意思決定統合';
        career_change: '転職戦略・キャリアチェンジ・市場分析統合';
      };
    };
  };
  
  // Perfect Match特別生成システム
  perfectMatchGeneration: {
    generatePerfectMatchContent: {
      signature: '(content: ThemeIntegratedContent, params: PerfectMatchParams) => Promise<PremiumContent>';
      purpose: 'Perfect Match特別コンテンツ生成・差別化最大化';
      premiumEnhancements: {
        uniqueValueAmplification: {
          description: '独自価値提案の3-5倍増幅';
          implementation: [
            '差別化要素の戦略的強調',
            '競合優位性の明確化',
            '独自性・希少性の訴求',
            '市場ポジションの確立'
          ];
        };
        
        qualityBonusApplication: {
          description: '20-30%品質ボーナス適用';
          implementation: [
            'Perfect Match専用コンテンツ拡張',
            '付加価値要素の追加',
            '詳細度・具体性の向上',
            '実行可能性の強化'
          ];
        };
        
        competitiveAdvantageMaximization: {
          description: '競合優位性最大化';
          implementation: [
            '競合分析要素の組み込み',
            '差別化ポイントの明確化',
            '優位性の数値化・証明',
            '選択理由の強化'
          ];
        };
        
        marketImpactIntegration: {
          description: '市場インパクト統合（11.34%直撃）';
          implementation: [
            '市場ニーズとの完全適合',
            'ターゲット市場の特化',
            '市場効果の予測・保証',
            'ROI・効果の明示'
          ];
        };
      };
    };
    
    perfectMatchQualityAssurance: {
      signature: '(content: PremiumContent) => QualityAssuranceResult';
      purpose: 'Perfect Match品質保証・98-97点維持';
      qualityStandards: {
        contentUniqueness: '独自性95%以上';
        personaAlignment: 'ペルソナ適合度98%以上';
        themeExpertise: '専門性深度90%以上';
        typeStructure: '構造適合度100%';
        marketRelevance: '市場関連性95%以上';
      };
    };
  };
  
  // テンプレート適合コンテンツ生成
  templateAdaptedGeneration: {
    adaptToTemplateRequirements: {
      signature: '(content: OptimizedContent, templateId: string) => Promise<TemplateAdaptedContent>';
      purpose: 'テンプレート要件への完全適合・100点ルール準拠';
      adaptationProcess: {
        templateAnalysis: 'テンプレート構造・要件分析';
        contentMapping: 'コンテンツ要素のマッピング';
        structureOptimization: '構造最適化・適合度向上';
        qualityValidation: '100点ルール適合性確認';
      };
      
      templateSpecificAdaptations: {
        carouselTemplate: 'カルーセル用分割・視覚最適化';
        singlePostTemplate: '単一投稿用集約・密度最適化';
        videoTemplate: '動画用ナレーション・タイミング最適化';
        storyTemplate: 'ストーリー用即効性・視認性最適化';
      };
    };
    
    ensureTemplateCompatibility: {
      signature: '(content: TemplateAdaptedContent, templateId: string) => CompatibilityResult';
      purpose: 'テンプレート適合性100%保証';
      compatibilityChecks: {
        structureMatching: '構造完全一致確認';
        characterLimits: '文字数制限厳守確認';
        visualElements: 'ビジュアル要素適合確認';
        readabilityStandards: '読みやすさ基準適合確認';
      };
    };
  };
  
  // 品質保証・最適化システム
  qualityAssuranceSystem: {
    applyFinalQualityAssurance: {
      signature: '(content: any, params: any) => Promise<QualityAssuredContent>';
      purpose: '最終品質保証・70点基準確保';
      qualityChecks: {
        threeDimensionOptimization: '三次元最適化完了確認';
        personaBenefitExtraction: 'ペルソナ有益性抽出完了確認';
        themeExpertiseIntegration: 'テーマ専門性統合完了確認';
        templateCompatibility: 'テンプレート適合性確認';
        uniquenessValidation: '独自性・差別化確認';
      };
    };
    
    generateQualityReport: {
      signature: '(content: QualityAssuredContent) => QualityReport';
      purpose: '品質レポート生成・透明性確保';
      report: {
        overallScore: '総合品質スコア';
        dimensionBreakdown: '三次元スコア内訳';
        optimizationDetails: '最適化適用詳細';
        perfectMatchStatus: 'Perfect Match適用状況';
        improvementSuggestions: '改善提案（該当時）';
      };
    };
  };
}
```

### 4. テンプレート選択システム実装仕様

#### TypeID完全対応・100点ルール準拠システム
```typescript
interface TemplateSelectionSystemImplementation {
  // クラス設計
  classStructure: {
    className: 'HundredPointTemplateSelector';
    path: '/lib/engines/TemplateSelectionSystem.ts';
    extends: 'BaseTemplateSelector';
    implements: ['IHundredPointRule', 'IPerfectMatchTemplate'];
  };
  
  // 100点ルール完全実装
  hundredPointRuleImplementation: {
    selectOptimalTemplate: {
      signature: '(content: GeneratedContent, context: SelectionContext) => Promise<TemplateSelection>';
      purpose: 'TypeID最適テンプレート確定・100点ルール適用';
      hundredPointLogic: {
        principle: '100点じゃないものは全てテンプレートが存在しない';
        implementation: {
          scoreThreshold: '100点（完璧なマッチ）のみ採用';
          fallbackPrevention: '妥協・緩和の完全排除';
          alternativeGeneration: '100点未満時の代替案自動生成';
          qualityGuarantee: '品質劣化の絶対防止';
        };
      };
      implementation: `
        async selectOptimalTemplate(content: GeneratedContent, context: SelectionContext): Promise<TemplateSelection> {
          // Step 1: TypeID別テンプレート候補取得
          const candidateTemplates = await this.getTypeIdTemplates(context.typeId);
          
          // Step 2: 100点ルール適用・完璧マッチング
          const perfectMatches = await this.findPerfectMatches(content, candidateTemplates);
          
          // Step 3: 100点未満の場合の対応
          if (perfectMatches.length === 0) {
            return await this.handleNonPerfectMatch(content, context);
          }
          
          // Step 4: Perfect Match優先選択
          const selectedTemplate = await this.selectBestPerfectMatch(perfectMatches, context);
          
          // Step 5: 品質保証・最終確認
          return await this.validateTemplateSelection(selectedTemplate, content, context);
        }
      `;
    };
    
    findPerfectMatches: {
      signature: '(content: GeneratedContent, templates: Template[]) => Promise<PerfectTemplateMatch[]>';
      purpose: '100点完璧マッチテンプレート検出';
      matchingCriteria: {
        structureCompatibility: '構造適合度100%';
        contentAlignment: 'コンテンツ適合度100%';
        typeIdOptimization: 'TypeID最適化度100%';
        visualHarmony: 'ビジュアル調和度100%';
        userExperience: 'UX最適度100%';
      };
      perfectMatchDetection: {
        algorithmicMatching: 'アルゴリズム完全マッチング';
        mlOptimization: '機械学習最適化';
        humanValidation: '人間による品質確認';
        continuousImprovement: '継続的精度向上';
      };
    };
    
    handleNonPerfectMatch: {
      signature: '(content: GeneratedContent, context: SelectionContext) => Promise<AlternativeSelection>';
      purpose: '100点未満時の代替案自動生成・品質保護';
      alternativeStrategies: {
        contentModification: 'コンテンツの100点適合修正';
        templateCreation: '新規100点テンプレート生成';
        hybridApproach: 'ハイブリッド最適化';
        userGuidance: 'ユーザー選択肢提示・説明';
      };
      qualityProtection: {
        noCompromise: '妥協・品質劣化の絶対回避';
        transparentCommunication: '状況・理由の透明な説明';
        valueProposition: '代替案の価値・メリット明示';
        userChoice: 'ユーザー最終選択権の保証';
      };
    };
  };
  
  // TypeID別テンプレート完全対応
  typeIdTemplateSpecialization: {
    typeIdTemplateMapping: {
      empathy_emotional_templates: {
        typeId: '001';
        specializedTemplates: [
          'emotional_story_template',
          'empathy_connection_template',
          'personal_experience_template',
          'emotional_journey_template',
          'heart_touching_template'
        ];
        perfectMatchFeatures: {
          emotionalResonance: '感情共鳴最大化';
          storytellingStructure: 'ストーリーテリング最適化';
          empathyTriggering: '共感誘発要素';
          emotionalCallToAction: '感情的行動誘導';
        };
      };
      
      educational_learning_templates: {
        typeId: '002';
        specializedTemplates: [
          'step_by_step_tutorial_template',
          'knowledge_building_template',
          'learning_journey_template',
          'skill_development_template',
          'educational_breakdown_template'
        ];
        perfectMatchFeatures: {
          progressivelearning: '段階的学習最適化';
          knowledgeRetention: '知識定着強化';
          practicalApplication: '実践応用促進';
          learningEffectiveness: '学習効果最大化';
        };
      };
      
      information_data_templates: {
        typeId: '003';
        specializedTemplates: [
          'data_visualization_template',
          'comprehensive_guide_template',
          'information_digest_template',
          'research_summary_template',
          'factual_presentation_template'
        ];
        perfectMatchFeatures: {
          informationDensity: '情報密度最適化';
          dataClarity: 'データ明確性向上';
          comprehensivenesss: '網羅性・完全性';
          accessibilityOptimization: 'アクセシビリティ最適化';
        };
      };
      
      efficiency_practical_templates: {
        typeId: '004';
        specializedTemplates: [
          'quick_action_template',
          'efficiency_hack_template',
          'time_saving_template',
          'practical_solution_template',
          'immediate_result_template'
        ];
        perfectMatchFeatures: {
          timeEfficiency: '時間効率最大化';
          immediateValue: '即効価値提供';
          practicalUtility: '実用性最適化';
          resultOrientation: '結果志向強化';
        };
      };
    };
    
    templateSelectionAlgorithm: {
      scoringFunction: {
        purpose: 'テンプレート選択スコア算出';
        formula: 'Score = (TypeId_Match * 0.4) + (Content_Fit * 0.3) + (UX_Optimization * 0.2) + (Perfect_Match_Bonus * 0.1)';
        perfectMatchThreshold: '95点以上で100点認定';
        qualityGuarantee: '100点未満は選択対象外';
      };
    };
  };
  
  // Perfect Match特別テンプレート
  perfectMatchTemplateSystem: {
    perfectMatchTemplateSelection: {
      signature: '(content: PremiumContent, perfectMatchContext: PerfectMatchContext) => Promise<PremiumTemplateSelection>';
      purpose: 'Perfect Match専用プレミアムテンプレート選択';
      premiumFeatures: {
        exclusiveTemplates: 'Perfect Match専用テンプレート';
        enhancedVisuals: '視覚的プレミアム要素';
        specialAnimations: '特別アニメーション効果';
        uniqueLayouts: '独自レイアウト・構成';
        qualityBadging: '品質保証バッジ統合';
      };
      
      perfectMatchTemplates: {
        premium_perfect_match_template: 'Perfect Match専用プレミアムテンプレート';
        exclusive_differentiation_template: '差別化特化テンプレート';
        market_impact_template: '市場インパクト最大化テンプレート';
        competitive_advantage_template: '競合優位性強調テンプレート';
        unique_value_template: '独自価値最大化テンプレート';
      };
    };
    
    applyPerfectMatchCustomizations: {
      signature: '(template: Template, perfectMatchConfig: PerfectMatchConfig) => CustomizedTemplate';
      purpose: 'Perfect Match設定に基づくテンプレートカスタマイズ';
      customizations: {
        badgeIntegration: 'Perfect Matchバッジの自動統合';
        visualEnhancements: '視覚的強化要素の適用';
        qualityGuaranteeDisplay: '品質保証メッセージの統合';
        differentiationHighlight: '差別化要素の視覚的強調';
        premiumExperience: 'プレミアムユーザーエクスペリエンス';
      };
    };
  };
  
  // マッチング精度向上システム
  matchingAccuracyImprovement: {
    enhanceMatchingPrecision: {
      signature: '(content: any, templates: Template[]) => MatchingResult';
      purpose: 'マッチング精度継続向上・100点ルール精緻化';
      precisionFactors: {
        structuralAnalysis: '構造的分析精度向上';
        semanticMatching: '意味的マッチング強化';
        contextualUnderstanding: '文脈理解向上';
        userBehaviorLearning: 'ユーザー行動学習';
      };
      
      machineLearningIntegration: {
        templateUsagePatterns: 'テンプレート使用パターン学習';
        userPreferenceLearning: 'ユーザー嗜好学習';
        qualityFeedbackLoop: '品質フィードバックループ';
        continuousOptimization: '継続的最適化';
      };
    };
    
    validateMatchingQuality: {
      signature: '(selection: TemplateSelection) => ValidationResult';
      purpose: 'マッチング品質検証・100点ルール確保';
      validation: {
        hundredPointCompliance: '100点ルール適合性確認';
        noCompromiseValidation: '妥協排除の検証';
        qualityStandardMaintenance: '品質基準維持確認';
        userSatisfactionPrediction: 'ユーザー満足度予測';
      };
    };
  };
  
  // 品質保証・継続改善
  qualityAssuranceAndImprovement: {
    templateQualityMonitoring: {
      purpose: 'テンプレート品質継続監視';
      monitoring: {
        usageAnalytics: 'テンプレート使用状況分析';
        userFeedback: 'ユーザーフィードバック収集';
        performanceMetrics: 'パフォーマンス指標監視';
        qualityDegradationDetection: '品質劣化の早期検出';
      };
    };
    
    continuousTemplateImprovement: {
      purpose: 'テンプレート継続改善・100点維持';
      improvement: {
        newTemplateCreation: '新規100点テンプレート作成';
        existingTemplateOptimization: '既存テンプレート最適化';
        userNeedAdaptation: 'ユーザーニーズ適応';
        technologyEvolution: '技術進化への対応';
      };
    };
  };
}
```

## 🎯 Phase 2-3: 統合テスト設計

### 単体テスト要件（各コンポーネント）

#### コンポーネント別単体テスト詳細設計
```typescript
interface UnitTestSpecification {
  // リサーチプロンプト生成エンジンテスト
  researchPromptGeneratorTests: {
    testSuite: 'ResearchPromptGenerator.test.ts';
    testCases: [
      {
        name: 'generateThreeDimensionPrompt_ValidInputs_ReturnsOptimizedPrompt';
        purpose: '正常な三次元入力での最適プロンプト生成確認';
        inputs: {
          typeId: '001';
          personaId: '003';
          themeId: '001';
          userTitle: 'ESで差別化する方法';
        };
        expectedOutputs: {
          promptQuality: '90点以上';
          threeDimensionOptimization: '適用済み';
          typeIdSpecialization: 'TypeID=001特化適用';
          personaIdAlignment: 'PersonaID=003適合確認';
        };
      },
      {
        name: 'detectPerfectMatch_PerfectMatchCombination_ReturnsTrue';
        purpose: 'Perfect Match組み合わせの正確検出';
        inputs: {
          combination: { typeId: '001', personaId: '005', themeId: '001', totalScore: 98 };
        };
        expectedOutputs: {
          isPerfectMatch: true;
          specialOptimizations: '適用済み';
          uniqueValueProposition: '設定済み';
        };
      },
      {
        name: 'generatePerfectMatchPrompt_PerfectMatchInputs_ReturnsPremiumPrompt';
        purpose: 'Perfect Match専用プレミアムプロンプト生成';
        inputs: {
          perfectMatchParams: { typeId: '001', personaId: '005', themeId: '001' };
        };
        expectedOutputs: {
          premiumQuality: '98点以上';
          differentiationElements: '組み込み済み';
          qualityBonus: '20-30%適用';
        };
      }
    ];
    performanceTests: [
      {
        name: 'promptGeneration_Performance_UnderTwoSeconds';
        requirement: 'プロンプト生成2秒以内完了';
        inputs: 'All valid TypeID×PersonaID×ThemeID combinations';
        expected: '95%以上が2秒以内完了';
      }
    ];
  };
  
  // フォーマッターシステムテスト
  formatterSystemTests: {
    testSuite: 'FormatterSystem.test.ts';
    testCases: [
      {
        name: 'formatByTypeId_TypeId001_AppliesEmotionalStructure';
        purpose: 'TypeID=001感情誘導型構造適用確認';
        inputs: {
          content: 'サンプルコンテンツ';
          typeId: '001';
          context: { isPerfectMatch: false };
        };
        expectedOutputs: {
          structure: '感情誘導型構造適用済み';
          emotionalElements: '25%以上含有';
          storytellingStructure: '適用済み';
        };
      },
      {
        name: 'validateQualityThreshold_LowQualityContent_ReturnsAlternatives';
        purpose: '70点未満コンテンツでの代替案自動提示';
        inputs: {
          content: '品質60点のコンテンツ';
        };
        expectedOutputs: {
          qualityValidation: { meetsStandards: false, qualityScore: 60 };
          alternatives: '3つ以上の高品質代替案';
          recommendations: '品質向上提案';
        };
      },
      {
        name: 'applyPerfectMatchFormatting_PerfectMatchContent_ReturnsPremiumFormat';
        purpose: 'Perfect Match特別フォーマット適用確認';
        inputs: {
          content: 'Perfect Match対象コンテンツ';
          context: { isPerfectMatch: true };
        };
        expectedOutputs: {
          premiumFormatting: '適用済み';
          differentiationHighlight: '強調済み';
          qualityGuaranteeIntegration: '統合済み';
        };
      }
    ];
    edgeCaseTests: [
      {
        name: 'formatByTypeId_InvalidTypeId_ThrowsValidationError';
        purpose: '無効TypeIDでの適切なエラーハンドリング';
        inputs: { typeId: '999' };
        expected: 'ValidationError例外';
      },
      {
        name: 'formatByTypeId_EmptyContent_ReturnsErrorResponse';
        purpose: '空コンテンツでの適切な対応';
        inputs: { content: '' };
        expected: 'Error response with guidance';
      }
    ];
  };
  
  // コンテンツ生成システムテスト
  contentGenerationSystemTests: {
    testSuite: 'ContentGenerationSystem.test.ts';
    testCases: [
      {
        name: 'generateThreeDimensionContent_ValidParams_ReturnsOptimizedContent';
        purpose: '三次元最適化コンテンツ生成確認';
        inputs: {
          typeId: '002';
          personaId: '003';
          themeId: '010';
          userTitle: 'AI活用スキル習得法';
        };
        expectedOutputs: {
          contentQuality: '80点以上';
          threeDimensionOptimization: '適用済み';
          personaBenefits: '効率化要素強化';
          themeExpertise: 'AI・スキル習得専門性統合';
        };
      },
      {
        name: 'extractPersonaBenefits_EfficiencyPersona_ExtractsTimeEfficiency';
        purpose: '効率化ペルソナでの時短要素抽出確認';
        inputs: {
          personaId: '003';
          content: 'スキル習得関連コンテンツ';
        };
        expectedOutputs: {
          timeSavingElements: '具体的時短手法含有';
          efficiencyBenefits: '労力対効果明示';
          systematicApproach: '体系的手法提示';
        };
      },
      {
        name: 'generatePerfectMatchContent_PerfectMatchParams_ReturnsPremiumContent';
        purpose: 'Perfect Match特別コンテンツ生成確認';
        inputs: {
          perfectMatchParams: { typeId: '004', personaId: '003', themeId: '009' };
        };
        expectedOutputs: {
          premiumQuality: '95点以上';
          uniqueValueAmplification: '3-5倍増幅適用';
          competitiveAdvantage: '明確化済み';
          marketImpact: '11.34%要素統合';
        };
      }
    ];
    integrationTests: [
      {
        name: 'endToEndGeneration_AllComponents_WorksTogether';
        purpose: '4コンポーネント統合動作確認';
        inputs: 'Complete generation flow';
        expected: '全コンポーネント連携正常動作';
      }
    ];
  };
  
  // テンプレート選択システムテスト
  templateSelectionSystemTests: {
    testSuite: 'TemplateSelectionSystem.test.ts';
    testCases: [
      {
        name: 'selectOptimalTemplate_PerfectMatchContent_Returns100PointTemplate';
        purpose: '100点ルール適用・完璧テンプレート選択確認';
        inputs: {
          content: '最適化済みコンテンツ';
          context: { typeId: '001', isPerfectMatch: true };
        };
        expectedOutputs: {
          templateScore: 100;
          perfectMatchTemplate: '選択済み';
          hundredPointCompliance: true;
        };
      },
      {
        name: 'findPerfectMatches_NonPerfectContent_ReturnsEmptyArray';
        purpose: '100点未満コンテンツでの完璧マッチなし確認';
        inputs: {
          content: '90点品質コンテンツ';
          templates: '全テンプレート';
        };
        expectedOutputs: {
          perfectMatches: [];
          requiresAlternative: true;
        };
      },
      {
        name: 'handleNonPerfectMatch_NoHundredPointMatch_ReturnsAlternatives';
        purpose: '100点未満時の代替案自動生成確認';
        inputs: {
          content: '90点コンテンツ';
          context: '標準コンテキスト';
        };
        expectedOutputs: {
          alternatives: '3つ以上の改善案';
          noCompromise: true;
          transparentCommunication: '理由・選択肢明示';
        };
      }
    ];
    hundredPointRuleTests: [
      {
        name: 'hundredPointRule_EnforcesNoCompromise';
        purpose: '100点ルール・妥協排除の確実実行';
        expected: '100点未満は一切選択されない';
      },
      {
        name: 'hundredPointRule_GeneratesQualityAlternatives';
        purpose: '品質代替案の確実生成';
        expected: '代替案は全て品質向上を提案';
      }
    ];
  };
}
```

### 結合テスト要件（コンポーネント間連携）

#### 三次元統合結合テスト設計
```typescript
interface IntegrationTestSpecification {
  // 三次元統合フローテスト
  threeDimensionIntegrationTests: {
    testSuite: 'ThreeDimensionIntegration.test.ts';
    testCases: [
      {
        name: 'fullGenerationFlow_ValidInputs_CompletesSuccessfully';
        purpose: '完全生成フロー正常動作確認';
        flow: [
          'TypeID選択',
          'ThemeID選択・三次元分析',
          'PersonaID選択・最終最適化',
          'コンテンツ生成・4コンポーネント統合',
          'テンプレート選択・100点ルール適用',
          '最終品質保証・結果出力'
        ];
        inputs: {
          userInput: 'AI活用で効率的に就活する方法';
          selections: { typeId: '004', personaId: '003', themeId: '009' };
        };
        expectedOutputs: {
          isPerfectMatch: true;
          finalQualityScore: '98点以上';
          allComponentsIntegrated: true;
          hundredPointTemplate: '選択済み';
        };
      },
      {
        name: 'perfectMatchDetection_AcrossAllComponents_WorksSeamlessly';
        purpose: '全コンポーネント間Perfect Match検出・連携確認';
        testFlow: {
          step1: 'リサーチプロンプト生成でPerfect Match検出';
          step2: 'フォーマッターでPerfect Match特別処理適用';
          step3: 'コンテンツ生成でPremium生成実行';
          step4: 'テンプレート選択でPerfect Match専用テンプレート適用';
        };
        expectedBehavior: '全コンポーネントでPerfect Match特別処理が連携動作';
      },
      {
        name: 'qualityThresholdEnforcement_AcrossComponents_MaintainsStandards';
        purpose: '全コンポーネント間品質基準（70点）維持確認';
        testScenarios: [
          '低品質入力での品質向上処理',
          '品質基準未達時の代替案提示',
          '品質保証の一貫性維持',
          'Perfect Match品質保証の確実実行'
        ];
        expectedBehavior: '全コンポーネントで一貫した品質基準維持';
      }
    ];
  };
  
  // データ統合・整合性テスト
  dataIntegrationTests: {
    testSuite: 'DataIntegration.test.ts';
    testCases: [
      {
        name: 'threeDimensionDataConsistency_AllCombinations_MaintainsIntegrity';
        purpose: '420組み合わせデータ整合性確認';
        testData: '全TypeID×PersonaID×ThemeID組み合わせ';
        validations: [
          'スコア計算の一貫性',
          'Perfect Match判定の正確性',
          '品質基準の適用一貫性',
          'データ更新時の整合性維持'
        ];
        expected: '全組み合わせで整合性100%維持';
      },
      {
        name: 'perfectMatchConfigIntegration_ConfigAndData_AlignsPerfectly';
        purpose: 'Perfect Match設定とデータの完全整合確認';
        testItems: [
          'Perfect Match判定の一致',
          '特別設定の適用確認',
          'バッジ・メッセージの整合性',
          '品質保証設定の連携'
        ];
        expected: 'Perfect Match設定とデータの100%整合';
      }
    ];
  };
  
  // API統合テスト
  apiIntegrationTests: {
    testSuite: 'APIIntegration.test.ts';
    testCases: [
      {
        name: 'fullAPIFlow_EndToEndGeneration_ReturnsCorrectResponse';
        purpose: 'API全体フロー正常動作確認';
        apiCalls: [
          'GET /api/v1/types（TypeID取得）',
          'GET /api/v1/types/{typeId}/recommendations（推奨取得）',
          'POST /api/v1/combinations/analyze（三次元分析）',
          'POST /api/v1/content/generate（コンテンツ生成）',
          'POST /api/v1/quality/validate（品質検証）'
        ];
        expectedBehavior: '全API連携で期待結果取得';
      },
      {
        name: 'perfectMatchAPIFlow_PerfectMatchScenario_ReturnsEnhancedResponse';
        purpose: 'Perfect Match API特別処理確認';
        scenario: 'Perfect Match組み合わせでのAPI実行';
        expectedEnhancements: [
          'Perfect Match情報の自動付与',
          '特別処理状況の表示',
          'プレミアム要素の含有',
          '品質保証情報の明示'
        ];
      }
    ];
  };
  
  // ユーザーフロー統合テスト
  userFlowIntegrationTests: {
    testSuite: 'UserFlowIntegration.test.ts';
    testCases: [
      {
        name: 'stepByStepSelection_UserGuidance_WorksIntuitively';
        purpose: 'ステップバイステップ選択フローの直感的動作確認';
        userActions: [
          'TypeID選択（Perfect Match表示含む）',
          'ThemeID選択（三次元スコア表示）',
          'PersonaID選択（最終最適化確認）',
          'コンテンツ生成実行',
          '結果確認・品質詳細表示'
        ];
        expectedUX: '直感的・透明性の高いユーザーエクスペリエンス';
      },
      {
        name: 'qualityTransparency_RealTimeDisplay_KeepsUserInformed';
        purpose: 'リアルタイム品質表示・透明性確保確認';
        displayElements: [
          '三次元スコアのリアルタイム計算',
          'Perfect Match検出の即座表示',
          '品質向上要因の説明',
          '代替案の自動提示'
        ];
        expectedTransparency: 'ユーザーが常に品質状況を理解できる';
      }
    ];
  };
}
```

### システムテスト要件（エンドツーエンド）

#### 完全システム統合テスト設計
```typescript
interface SystemTestSpecification {
  // エンドツーエンドテスト
  endToEndTests: {
    testSuite: 'EndToEndSystem.test.ts';
    testCases: [
      {
        name: 'completeInstagramPostGeneration_RealUserScenario_DeliversQuality';
        purpose: '実ユーザーシナリオでの完全Instagram投稿生成';
        scenario: {
          userPersona: '就活中の大学3年生（効率化志向）';
          userGoal: 'ES対策で差別化したい';
          userInput: 'AIを使って効率的にESを書く方法';
        };
        executionFlow: [
          'ユーザーがタイトル入力',
          'システムがTypeID推奨（教育型・実用型）',
          'ユーザーがTypeID=004選択',
          'システムがThemeID推奨（ES・履歴書、AI活用）',
          'ユーザーがThemeID=009選択（AI活用）',
          'システムがPersonaID推奨（効率化志向）',
          'ユーザーがPersonaID=003選択',
          'Perfect Match検出・特別処理実行',
          '4コンポーネント統合生成実行',
          '100点テンプレート選択・適用',
          '最終品質保証・結果出力'
        ];
        expectedResults: {
          isPerfectMatch: true;
          finalQualityScore: '98点以上';
          userSatisfaction: '高満足度';
          contentQuality: 'Instagram投稿として最適';
          differentiationAchieved: '明確な差別化実現';
        };
      },
      {
        name: 'multipleUserScenarios_DiverseInputs_ConsistentQuality';
        purpose: '多様なユーザーシナリオでの一貫品質確保';
        testScenarios: [
          {
            persona: '就活準備初心者';
            theme: '面接対策';
            expectedType: '感情誘導型・教育型';
            qualityExpectation: '75点以上';
          },
          {
            persona: 'キャリア構築志向';
            theme: '業界研究';
            expectedType: '情報提供型・教育型';
            qualityExpectation: '80点以上';
          },
          {
            persona: '専門特化志向';
            theme: 'スキル習得';
            expectedType: '実用型・情報型';
            qualityExpectation: '85点以上';
          }
        ];
        expectedConsistency: '全シナリオで品質基準以上達成';
      }
    ];
  };
  
  // Perfect Matchシステムテスト
  perfectMatchSystemTests: {
    testSuite: 'PerfectMatchSystem.test.ts';
    testCases: [
      {
        name: 'perfectMatchFullFlow_ThreeCombinations_DeliversPremiumExperience';
        purpose: '3つのPerfect Match組み合わせでのプレミアム体験確認';
        perfectMatchCombinations: [
          { typeId: '001', personaId: '005', themeId: '001' }, // 感情×共感×ES
          { typeId: '002', personaId: '005', themeId: '005' }, // 教育×共感×心理
          { typeId: '004', personaId: '003', themeId: '009' }  // 実用×効率×AI
        ];
        expectedPremiumFeatures: [
          'Perfect Match自動検出・表示',
          '98-97点品質保証',
          '差別化要素の自動強調',
          'プレミアムテンプレート適用',
          '競合優位性の明示',
          '市場直撃要素の統合'
        ];
        expectedBusinessValue: '11.34%市場に直撃する高価値コンテンツ';
      },
      {
        name: 'perfectMatchVsStandard_QualityComparison_ShowsClearAdvantage';
        purpose: 'Perfect MatchとStandard品質の明確な差別化確認';
        comparisonItems: [
          'コンテンツ品質スコア',
          '独自性・差別化度',
          'ユーザー価値提供',
          'エンゲージメント予測',
          '競合優位性'
        ];
        expectedAdvantage: 'Perfect Matchで20-30%以上の品質向上';
      }
    ];
  };
  
  // 品質保証システムテスト
  qualityAssuranceSystemTests: {
    testSuite: 'QualityAssuranceSystem.test.ts';
    testCases: [
      {
        name: 'qualityThresholdEnforcement_VariousInputs_NeverCompromises';
        purpose: '様々な入力での70点品質基準絶対維持確認';
        testInputs: [
          '低品質ユーザー入力',
          '曖昧な表現・要求',
          '矛盾する選択',
          '無効な組み合わせ'
        ];
        expectedBehavior: [
          '70点未満は絶対にブロック',
          '代替案の確実提示',
          '品質向上ガイダンス',
          '透明性の高い説明'
        ];
        qualityGuarantee: '100%の場合で70点以上確保または適切な代替案提示';
      },
      {
        name: 'hundredPointRule_StrictEnforcement_NeverCompromises';
        purpose: '100点ルール厳格実行・妥協完全排除確認';
        testScenarios: [
          '99点テンプレートマッチ',
          '95点高品質マッチ',
          '90点良品質マッチ'
        ];
        expectedBehavior: [
          '100点未満は一切選択されない',
          '代替案（100点達成方法）の自動提案',
          '妥協しない姿勢の一貫維持',
          'ユーザーへの明確な説明・選択肢提示'
        ];
        ruleCompliance: '100%の場合で100点ルール遵守';
      }
    ];
  };
  
  // パフォーマンス・スケーラビリティテスト
  performanceSystemTests: {
    testSuite: 'PerformanceSystem.test.ts';
    testCases: [
      {
        name: 'systemPerformance_HighLoad_MaintainsResponseTime';
        purpose: '高負荷時のシステムパフォーマンス維持確認';
        loadConditions: {
          concurrentUsers: 100;
          requestsPerSecond: 50;
          testDuration: '10分間';
        };
        performanceRequirements: {
          responseTime: '95%が3秒以内';
          throughput: '毎秒40リクエスト以上';
          errorRate: '1%以下';
          cpuUsage: '80%以下';
          memoryUsage: '2GB以下';
        };
      },
      {
        name: 'databasePerformance_ComplexQueries_OptimizedExecution';
        purpose: '複雑な三次元クエリの最適化実行確認';
        testQueries: [
          '420組み合わせ全件検索',
          'Perfect Match検索',
          '品質スコア降順ソート',
          '複合条件フィルタリング'
        ];
        performanceTargets: {
          simpleQuery: '100ms以内';
          complexQuery: '500ms以内';
          fullScanQuery: '2秒以内';
        };
      }
    ];
  };
}
```

### 性能テスト要件（レスポンス時間・同時処理）

#### パフォーマンステスト詳細設計
```typescript
interface PerformanceTestSpecification {
  // レスポンス時間テスト
  responseTimeTests: {
    testSuite: 'ResponseTimePerformance.test.ts';
    requirements: {
      componentResponseTimes: {
        researchPromptGeneration: '1.5秒以内';
        formatterSystem: '1.0秒以内';
        contentGeneration: '3.0秒以内';
        templateSelection: '0.5秒以内';
      };
      endToEndResponseTime: '5秒以内（95%パーセンタイル）';
      perfectMatchOptimization: '追加時間1秒以内';
    };
    
    testCases: [
      {
        name: 'fastestResponsePath_OptimalConditions_SubSecondResponse';
        purpose: '最速レスポンスパス（キャッシュ活用）での高速応答確認';
        conditions: [
          'TypeID情報キャッシュ済み',
          'PersonaID推奨結果キャッシュ済み',
          'ThemeID情報キャッシュ済み',
          'Perfect Match設定プリロード済み'
        ];
        expectedResponseTime: '1秒以内';
      },
      {
        name: 'averageResponsePath_StandardConditions_ThreeSecondResponse';
        purpose: '平均的レスポンスパス（通常条件）での標準応答確認';
        conditions: [
          '部分的キャッシュ',
          '標準的データアクセス',
          '通常的AI処理時間'
        ];
        expectedResponseTime: '3秒以内';
      },
      {
        name: 'worstCaseResponse_ColdStart_FiveSecondResponse';
        purpose: '最悪ケース（コールドスタート）での応答時間確認';
        conditions: [
          'キャッシュなし',
          'データベース初回アクセス',
          'AI初回リクエスト'
        ];
        expectedResponseTime: '5秒以内';
      }
    ];
  };
  
  // 同時処理テスト
  concurrentProcessingTests: {
    testSuite: 'ConcurrentProcessing.test.ts';
    requirements: {
      maxConcurrentUsers: 200;
      peakThroughput: '毎秒100リクエスト';
      sustainedThroughput: '毎秒50リクエスト';
      resourceUtilization: 'CPU 70%以下、メモリ3GB以下';
    };
    
    testCases: [
      {
        name: 'concurrentGeneration_100Users_MaintainsPerformance';
        purpose: '100同時ユーザーでのパフォーマンス維持確認';
        testSetup: {
          concurrentUsers: 100;
          requestPattern: '各ユーザーが1分間隔で生成リクエスト';
          testDuration: '15分間';
        };
        expectedMetrics: {
          averageResponseTime: '3秒以内';
          p95ResponseTime: '5秒以内';
          errorRate: '1%以下';
          throughput: '毎秒40リクエスト以上';
        };
      },
      {
        name: 'burstLoad_200Users_GracefulDegradation';
        purpose: '200ユーザーバースト負荷での適切な性能劣化確認';
        testSetup: {
          burstUsers: 200;
          burstDuration: '5分間';
          requestFrequency: '30秒間隔';
        };
        expectedBehavior: {
          gracefulDegradation: 'レスポンス時間は増加するが機能維持';
          maxResponseTime: '10秒以内';
          systemStability: 'システム安定性維持';
          errorHandling: '適切なエラーハンドリング';
        };
      }
    ];
  };
  
  // スケーラビリティテスト
  scalabilityTests: {
    testSuite: 'ScalabilityPerformance.test.ts';
    testCases: [
      {
        name: 'dataScalability_420Combinations_EfficientProcessing';
        purpose: '420組み合わせデータでの効率的処理確認';
        testData: {
          combinations: 420;
          queryTypes: [
            '単一組み合わせ検索',
            '条件絞り込み検索',
            'Perfect Match検索',
            '全件スコア計算'
          ];
        };
        performanceTargets: {
          singleQuery: '50ms以内';
          filteredQuery: '200ms以内';
          perfectMatchQuery: '100ms以内';
          fullCalculation: '1秒以内';
        };
      },
      {
        name: 'userScalability_MultipleSimultaneousFlows_IndependentProcessing';
        purpose: '複数同時フローでの独立処理確認';
        testScenario: {
          simultaneousFlows: 50;
          flowTypes: [
            '標準生成フロー',
            'Perfect Match生成フロー',
            '品質検証フロー',
            '代替案生成フロー'
          ];
        };
        expectedBehavior: {
          flowIndependence: '各フローが他に影響されない';
          resourceSharing: '効率的リソース共有';
          fairResourceAllocation: '公平なリソース配分';
        };
      }
    ];
  };
  
  // キャッシュ・最適化テスト
  cacheOptimizationTests: {
    testSuite: 'CacheOptimization.test.ts';
    testCases: [
      {
        name: 'cacheEffectiveness_RepeatedRequests_SignificantSpeedup';
        purpose: 'キャッシュ効果による大幅高速化確認';
        testPattern: {
          firstRequest: 'キャッシュなし初回リクエスト';
          subsequentRequests: '同一データでの繰り返しリクエスト';
          cacheTypes: [
            'TypeID情報キャッシュ',
            'PersonaID推奨キャッシュ',
            'ThemeID組み合わせキャッシュ',
            'Perfect Match設定キャッシュ'
          ];
        };
        expectedSpeedup: {
          typeIdCache: '3-5倍高速化';
          personaIdCache: '2-3倍高速化';
          themeIdCache: '4-6倍高速化';
          perfectMatchCache: '10倍以上高速化';
        };
      },
      {
        name: 'cacheInvalidation_DataUpdate_ProperInvalidation';
        purpose: 'データ更新時の適切なキャッシュ無効化確認';
        testScenarios: [
          'TypeID設定更新',
          'PersonaID推奨アルゴリズム更新',
          'ThemeID関連データ更新',
          'Perfect Match設定更新'
        ];
        expectedBehavior: {
          immediateInvalidation: '即座のキャッシュ無効化';
          consistentData: '一貫したデータ提供';
          noStaleData: '古いデータの提供なし';
        };
      }
    ];
  };
  
  // リソース使用量テスト
  resourceUtilizationTests: {
    testSuite: 'ResourceUtilization.test.ts';
    testCases: [
      {
        name: 'memoryUsage_ExtendedOperation_NoMemoryLeaks';
        purpose: '長時間運用でのメモリリーク防止確認';
        testDuration: '24時間連続運用';
        monitoringMetrics: [
          'メモリ使用量推移',
          'ガベージコレクション頻度',
          'オブジェクト生成・削除パターン',
          'キャッシュメモリ管理'
        ];
        expectedBehavior: {
          stableMemoryUsage: 'メモリ使用量安定',
          noMemoryLeaks: 'メモリリークなし',
          efficientGC: '効率的ガベージコレクション';
        };
      },
      {
        name: 'cpuUsage_HighComputationLoad_EfficientProcessing';
        purpose: '高計算負荷での効率的CPU使用確認';
        computationTypes: [
          '三次元スコア計算',
          'Perfect Match検出',
          '品質保証処理',
          'テンプレートマッチング'
        ];
        expectedCpuUsage: {
          averageUsage: '50%以下';
          peakUsage: '80%以下';
          sustainedUsage: '70%以下';
        };
      }
    ];
  };
}
```

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "\u5fc5\u8aad\u30c9\u30ad\u30e5\u30e1\u30f3\u30c8\u3092\u78ba\u8a8d\uff08STEP4_ANALYSIS_PLAN.md\uff09", "status": "completed", "priority": "high"}, {"id": "2", "content": "Phase1\u6210\u679c\u7269\u3092\u78ba\u8a8d\uff08phase1-system-integration.md\uff09", "status": "completed", "priority": "high"}, {"id": "3", "content": "Phase2\u5b9f\u88c5\u8981\u4ef6\u78ba\u5b9a\u306e\u5206\u6790\u5b9f\u884c", "status": "completed", "priority": "high"}, {"id": "4", "content": "4\u30b3\u30f3\u30dd\u30fc\u30cd\u30f3\u30c8\u306e\u5b9f\u88c5\u4ed5\u69d8\u78ba\u5b9a", "status": "completed", "priority": "high"}, {"id": "5", "content": "\u4f5c\u696d\u8a18\u9332\u3092phase2-implementation-requirements.md\u306b\u51fa\u529b", "status": "completed", "priority": "high"}]