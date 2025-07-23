# 🎨 汎用テンプレート設計案
*生成日: 2025-07-23*

## 🎯 設計原則

### 100点ルール適用
- **structureScore = 1.0必須**: 完璧マッチのみ採用
- **妥協禁止**: 部分的マッチは専用テンプレート作成で対応
- **品質最優先**: 全ての生成コンテンツが最適テンプレートで表示

### アーキテクチャ方針
- **モジュラー設計**: 再利用可能なコンポーネント構成
- **動的適応**: コンテンツに応じた要素の表示/非表示
- **パフォーマンス重視**: 軽量かつ高速レンダリング

## 🏗️ 8つの汎用テンプレート詳細設計

### Template 1: Point構成テンプレート
```typescript
interface PointTemplateConfig {
  templateId: "point_structure_template"
  targetTypes: ["career_analysis"]
  applicabilityRate: 65 // Type001での適用率
  
  layout: {
    backgroundType: "gradient" | "person_photo"
    overlayStructure: "white_card_overlay"
    headerType: "title_header" | "hashtag_header"
    contentLayout: "point_progression"
  }
  
  pageStructure: {
    coverPage: true
    problemStatement: true
    pointPages: 3-7 // Point 1～7の段階展開
    summaryPage: true
    ctaPage: true
  }
  
  designElements: {
    colorScheme: ["beige", "white", "blue"]
    visualHierarchy: "number → title → content → supplement"
    trustSignals: ["expertise_badge", "data_citation", "source_reference"]
    typography: "gothic_hierarchical"
  }
  
  components: [
    "PointNumberBadge",
    "ProgressIndicator", 
    "ExpertiseDisplay",
    "ContentCard",
    "CTASection"
  ]
}
```

### Template 2: ランキング・データテンプレート
```typescript
interface RankingTemplateConfig {
  templateId: "ranking_data_template"
  targetTypes: ["data_ranking"]
  applicabilityRate: 95 // Type002での適用率
  
  layout: {
    backgroundType: "solid_color" | "gradient"
    overlayStructure: "table_card" | "list_card"
    headerType: "category_header"
    contentLayout: "ranking_table"
  }
  
  pageStructure: {
    coverPage: true
    dataOverview: true
    rankingPages: 4-8 // ランキング詳細展開
    analysisPage: true
    ctaPage: true
  }
  
  designElements: {
    colorScheme: ["blue", "orange", "white"]
    visualHierarchy: "rank → value → description → analysis"
    trustSignals: ["numerical_data", "ranking_format", "color_classification"]
    dataVisualization: "table_format"
  }
  
  components: [
    "RankingTable",
    "DataValueDisplay",
    "ComparisonChart",
    "CategoryBadge",
    "NumericHighlight"
  ]
}
```

### Template 3: ステップガイドテンプレート
```typescript
interface StepGuideTemplateConfig {
  templateId: "step_guide_template"
  targetTypes: ["howto_skills"]
  applicabilityRate: 80 // Type003での適用率
  
  layout: {
    backgroundType: "white" | "notebook_style"
    overlayStructure: "step_card_overlay"
    headerType: "step_header"
    contentLayout: "step_progression"
  }
  
  pageStructure: {
    introPage: true
    stepPages: 3-8 // Step 1～8の手順展開
    practiceExample: true
    summaryPage: true
    ctaPage: true
  }
  
  designElements: {
    colorScheme: ["green", "yellow", "white"]
    visualHierarchy: "step_number → method → example → caution"
    trustSignals: ["before_after", "practical_steps", "example_cases"]
    interactionElements: "checklist_format"
  }
  
  components: [
    "StepNumberBadge",
    "BeforeAfterComparison",
    "ChecklistItem",
    "ProcessFlow",
    "PracticeExample"
  ]
}
```

### Template 4: カテゴリ分類テンプレート
```typescript
interface CategoryTemplateConfig {
  templateId: "category_classification_template"
  targetTypes: ["tech_tools"]
  applicabilityRate: 75 // Type004での適用率
  
  layout: {
    backgroundType: "gradient" | "tech_themed"
    overlayStructure: "category_card" | "comparison_table"
    headerType: "category_header" | "brand_header"
    contentLayout: "category_grid"
  }
  
  pageStructure: {
    overviewPage: true
    categoryPages: 3-6 // カテゴリ別詳細
    featureComparison: true
    usageGuide: true
    ctaPage: true
  }
  
  designElements: {
    colorScheme: ["blue", "white", "tech_colors"]
    visualHierarchy: "category → tool_name → features → usage"
    trustSignals: ["tool_screenshots", "logo_usage", "feature_specs"]
    brandElements: "logo_integration"
  }
  
  components: [
    "CategoryGrid",
    "ToolComparison",
    "FeatureList",
    "BrandLogo",
    "UsageExample"
  ]
}
```

### Template 5: リスト・チェックテンプレート
```typescript
interface ListCheckTemplateConfig {
  templateId: "list_check_template"
  targetTypes: ["all_types"] // 横断適用
  applicabilityRate: 60 // 全タイプでの適用率
  
  layout: {
    backgroundType: "variable" // コンテンツに応じて変更
    overlayStructure: "list_card"
    headerType: "simple_header"
    contentLayout: "checklist_format"
  }
  
  pageStructure: {
    titlePage: true
    checklistPages: 2-6 // チェック項目群
    supplementPage: true
    ctaPage: true
  }
  
  designElements: {
    colorScheme: "adaptive" // コンテンツタイプに適応
    visualHierarchy: "check_mark → item → description"
    trustSignals: ["completion_indicators", "progress_tracking"]
    interactionElements: "checkmark_system"
  }
  
  components: [
    "CheckmarkItem",
    "ProgressTracker",
    "ItemDescription",
    "CompletionBadge",
    "ActionPrompt"
  ]
}
```

### Template 6: 比較・対比テンプレート
```typescript
interface ComparisonTemplateConfig {
  templateId: "comparison_contrast_template"
  targetTypes: ["career_analysis", "howto_skills"]
  applicabilityRate: 55 // Type001,003での適用率
  
  layout: {
    backgroundType: "split_color" | "gradient"
    overlayStructure: "split_card"
    headerType: "comparison_header"
    contentLayout: "before_after_split"
  }
  
  pageStructure: {
    currentState: true
    idealState: true
    transitionProcess: 2-4
    resultPage: true
    ctaPage: true
  }
  
  designElements: {
    colorScheme: ["contrast_colors", "before_after_distinction"]
    visualHierarchy: "comparison_axis → details → outcomes"
    trustSignals: ["before_after_evidence", "transformation_data"]
    layoutElements: "split_screen_design"
  }
  
  components: [
    "BeforeAfterSplit",
    "ComparisonAxis",
    "TransitionArrow",
    "ResultHighlight",
    "ContrastDisplay"
  ]
}
```

### Template 7: 情報密集テンプレート
```typescript
interface DenseInfoTemplateConfig {
  templateId: "dense_information_template"
  targetTypes: ["data_ranking", "tech_tools"]
  applicabilityRate: 45 // Type002,004での適用率
  
  layout: {
    backgroundType: "organized_grid"
    overlayStructure: "multi_layer_card"
    headerType: "structured_header"
    contentLayout: "information_hierarchy"
  }
  
  pageStructure: {
    overviewPage: true
    detailPages: 5-10 // 高密度情報群
    organizationPage: true
    ctaPage: true
  }
  
  designElements: {
    colorScheme: ["information_organization_colors"]
    visualHierarchy: "category → subcategory → details → references"
    trustSignals: ["comprehensive_data", "structured_presentation"]
    layoutElements: "multi_column_design"
  }
  
  components: [
    "InformationGrid",
    "CategoryDivider",
    "DetailExpander",
    "ReferenceLink",
    "OrganizationalChart"
  ]
}
```

### Template 8: シンプル説明テンプレート
```typescript
interface SimpleExplanationTemplateConfig {
  templateId: "simple_explanation_template"
  targetTypes: ["all_types"] // 補完用
  applicabilityRate: 35 // 全タイプ補完
  
  layout: {
    backgroundType: "clean_minimal"
    overlayStructure: "single_card"
    headerType: "minimal_header"
    contentLayout: "direct_explanation"
  }
  
  pageStructure: {
    titlePage: true
    coreExplanation: 2-4 // 核心説明
    keyPoints: true
    ctaPage: true
  }
  
  designElements: {
    colorScheme: ["minimal_palette"]
    visualHierarchy: "title → core_content → key_points"
    trustSignals: ["clarity_indicators", "direct_statements"]
    layoutElements: "clean_typography"
  }
  
  components: [
    "MinimalCard",
    "CoreContent",
    "KeyPointList",
    "CleanTypography",
    "DirectCTA"
  ]
}
```

## 🔧 共通コンポーネント設計

### 基本レイアウトコンポーネント
```typescript
// 全テンプレート共通の基盤コンポーネント
const CommonComponents = {
  PageContainer: "viewport + content separation",
  BackgroundLayer: "adaptive background rendering",
  ContentOverlay: "flexible overlay system",
  PageIndicator: "progress tracking",
  CTASection: "standardized call-to-action"
}
```

### 動的適応システム
```typescript
interface AdaptiveSystem {
  contentAnalysis: (content: ContentData) => TemplateMatch
  templateSelection: (matches: TemplateMatch[]) => Template
  componentConfiguration: (template: Template, content: ContentData) => ComponentConfig
  qualityValidation: (output: GeneratedContent) => QualityScore
}
```

## 🎯 実装ロードマップ

### Phase 1: 高優先度テンプレート（必須）
1. **Template 2**: ランキング・データ（95%適用率）
2. **Template 3**: ステップガイド（80%適用率）
3. **Template 4**: カテゴリ分類（75%適用率）

### Phase 2: 中優先度テンプレート（推奨）
4. **Template 1**: Point構成（65%適用率）
5. **Template 5**: リスト・チェック（60%横断適用）

### Phase 3: 補完テンプレート（最適化）
6. **Template 6**: 比較・対比（55%適用率）
7. **Template 7**: 情報密集（45%適用率）
8. **Template 8**: シンプル説明（35%補完率）

## 📊 品質保証指標

### テンプレート品質基準
- **構造マッチ度**: structureScore = 1.0必須
- **視覚的整合性**: デザイン要素の完全一致
- **コンテンツ適合性**: 情報構造の最適表示
- **ユーザビリティ**: 直感的理解と操作性

### 継続的改善
- **使用率追跡**: 各テンプレートの選択頻度分析
- **品質フィードバック**: 生成結果の品質評価
- **パフォーマンス監視**: レンダリング速度と資源使用量
- **ユーザー満足度**: 最終出力の満足度測定

---
*この設計により、「100点ルール」に基づく完璧なテンプレートマッチングシステムが実現される。*