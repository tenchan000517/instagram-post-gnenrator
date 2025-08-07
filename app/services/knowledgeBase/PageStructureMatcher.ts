/**
 * ページ構造マッチングシステム
 * TypeID×TargetID×ThemeIDの組み合わせから厳密なページ構成パターンを取得
 */

import pageStructureMatchingData from './data/pageStructureMatching.json'
import empathyStrategicSolution5page from './data/pageStructures/empathy-strategic-solution-5page.json'
import efficiencyAnxietyAction3page from './data/pageStructures/efficiency-anxiety-action-3page.json'
import efficiencyPracticalInfo3page from './data/pageStructures/efficiency-practical-info-3page.json'
import educationComplexSolution5page from './data/pageStructures/education-complex-solution-5page.json'
import infoStrategicData4page from './data/pageStructures/info-strategic-data-4page.json'
import problemSolutionCarousel9page from './data/pageStructures/problem-solution-carousel-9page.json'
import typeID002SequentialDependency from './data/pageStructures/typeID002-sequential-dependency.json'
import typeID001EmotionEmpathyList from './data/pageStructures/typeID001-emotion-empathy-list.json'
import typeID002ParallelIntroduction from './data/pageStructures/typeID002-parallel-introduction.json'
import typeID002NgGoodComparisonPattern from './data/pageStructures/typeID002-ng-good-comparison-pattern.json'

// Unified templates import
import unifiedTemplate01SimpleIntro from './data/pageStructures/unified/unified-template-01-simple-intro.json'
import unifiedTemplate02DualSection from './data/pageStructures/unified/unified-template-02-dual-section.json'
import unifiedTemplate03RankingDisplay from './data/pageStructures/unified/unified-template-03-ranking-display.json'
import unifiedTemplate04ItemGrid from './data/pageStructures/unified/unified-template-04-item-grid.json'
import unifiedTemplate05Comparison from './data/pageStructures/unified/unified-template-05-comparison.json'
import unifiedTemplate06CompanyDetail from './data/pageStructures/unified/unified-template-06-company-detail.json'
import unifiedTemplate07ItemList from './data/pageStructures/unified/unified-template-07-item-list.json'
import unifiedTemplate08SectionBlocks from './data/pageStructures/unified/unified-template-08-section-blocks.json'
import unifiedTemplate09DynamicBoxes from './data/pageStructures/unified/unified-template-09-dynamic-boxes.json'
import unifiedTemplate10ImagePoint from './data/pageStructures/unified/unified-template-10-image-point.json'
import unifiedTemplate11CompanyRanking from './data/pageStructures/unified/unified-template-11-company-ranking.json'
import unifiedTemplate12CompanySpotlight from './data/pageStructures/unified/unified-template-12-company-spotlight.json'
import unifiedTemplate13StepByStep from './data/pageStructures/unified/unified-template-13-step-by-step.json'

export interface MatchingPattern {
  matchingKey: string;
  description: string;
  pageStructureId: string;
  reasoning: string;
}

export interface PageStructureMatchingData {
  patterns: MatchingPattern[];
}

export interface PageStructure {
  pageStructureId: string;
  name: string;
  targetCombination: string;
  description: string;
  pages: PageDefinition[];
}

export interface PageDefinition {
  pageNumber: number | "dynamic" | "last";
  templateId: string;
  role: string;
  title: string;
  itemAssignments: any;
  templateStructure?: Record<string, any>;
  optional?: boolean;
}

export class PageStructureMatchingError extends Error {
  constructor(
    message: string,
    public readonly matchingKey: string,
    public readonly availablePatterns?: string[]
  ) {
    super(message);
    this.name = 'PageStructureMatchingError';
  }
}

export class PageStructureMatcher {
  private static readonly pageStructureMap = {
    'empathy-strategic-solution-5page': empathyStrategicSolution5page,
    'efficiency-anxiety-action-3page': efficiencyAnxietyAction3page,
    'efficiency-practical-info-3page': efficiencyPracticalInfo3page,
    'education-complex-solution-5page': educationComplexSolution5page,
    'info-strategic-data-4page': infoStrategicData4page,
    'problem-solution-carousel-9page': problemSolutionCarousel9page,
    'typeID002-sequential-dependency': typeID002SequentialDependency,
    'typeID001-emotion-empathy-list': typeID001EmotionEmpathyList,
    'typeID002-parallel-introduction': typeID002ParallelIntroduction,
    'typeID002-ng-good-comparison-pattern': typeID002NgGoodComparisonPattern,
    // Unified templates
    'unified-template-01-simple-intro': unifiedTemplate01SimpleIntro,
    'unified-template-02-dual-section': unifiedTemplate02DualSection,
    'unified-template-03-ranking-display': unifiedTemplate03RankingDisplay,
    'unified-template-04-item-grid': unifiedTemplate04ItemGrid,
    'unified-template-05-comparison': unifiedTemplate05Comparison,
    'unified-template-06-company-detail': unifiedTemplate06CompanyDetail,
    'unified-template-07-item-list': unifiedTemplate07ItemList,
    'unified-template-08-section-blocks': unifiedTemplate08SectionBlocks,
    'unified-template-09-dynamic-boxes': unifiedTemplate09DynamicBoxes,
    'unified-template-10-image-point': unifiedTemplate10ImagePoint,
    'unified-template-11-company-ranking': unifiedTemplate11CompanyRanking,
    'unified-template-12-company-spotlight': unifiedTemplate12CompanySpotlight,
    'unified-template-13-step-by-step': unifiedTemplate13StepByStep
  };

  /**
   * マッチングデータを取得（直接インポート）
   */
  private static getMatchingData(): PageStructureMatchingData {
    return pageStructureMatchingData as PageStructureMatchingData;
  }

  /**
   * TypeID×TargetIDの組み合わせから厳密なページ構成パターンを取得
   * 
   * @param typeId - 投稿タイプID (001-004)
   * @param targetId - ターゲットID (T001-T012)
   * @returns マッチしたページ構成パターン
   * @throws PageStructureMatchingError - マッチするパターンが存在しない場合
   */
  static findExactMatch(typeId: string, targetId: string): MatchingPattern {
    const matchingData = this.getMatchingData();
    const matchingKey = `${typeId}-${targetId}`;

    console.log(`🔍 Searching for exact match: ${matchingKey}`);

    const pattern = matchingData.patterns.find(p => p.matchingKey === matchingKey);

    if (!pattern) {
      const availableKeys = matchingData.patterns.map(p => p.matchingKey);
      console.error(`❌ No exact match found for: ${matchingKey}`);
      console.error(`Available patterns: ${availableKeys.slice(0, 5).join(', ')}... (${availableKeys.length} total)`);
      
      throw new PageStructureMatchingError(
        `No page structure pattern found for combination: ${matchingKey}. This indicates that this specific TypeID×TargetID combination has not been analyzed and defined yet.`,
        matchingKey,
        availableKeys
      );
    }

    console.log(`✅ Exact match found: ${pattern.pageStructureId}`);
    console.log(`📝 Description: ${pattern.description}`);
    console.log(`💡 Reasoning: ${pattern.reasoning}`);

    return pattern;
  }

  /**
   * カンマ区切りテンプレートパターンから動的にページ構造を生成
   * 
   * @param templatePattern - "failure_story_intro,failure_episode,profile_offer" 形式
   * @returns 動的生成されたページ構造
   */
  static loadPageStructureFromPattern(templatePattern: string): PageStructure {
    const templates = templatePattern.split(',').map(t => t.trim());
    
    console.log(`🔄 動的ページ構造生成: ${templatePattern}`);
    console.log(`📋 テンプレート配列:`, templates);
    
    const pages: PageDefinition[] = templates.map((templateId, index) => ({
      pageNumber: index + 1,
      templateId: templateId,
      role: `Page ${index + 1} - ${templateId}`,
      title: `Page ${index + 1}`,
      itemAssignments: {}
    }));

    return {
      pageStructureId: templatePattern,
      name: `Dynamic Structure: ${templatePattern}`,
      targetCombination: 'dynamic',
      description: `Dynamically generated from template pattern: ${templatePattern}`,
      pages: pages
    };
  }

  /**
   * ページ構造の読み込み（静的ファイル優先、フォールバック対応）
   * 
   * @param pageStructureId - ページ構成パターンID
   * @param templateOverrides - テンプレートオーバーライド（オプション）
   * @returns 詳細なページ構造定義
   */
  static loadPageStructure(pageStructureId: string, templateOverrides?: Record<string, string>): PageStructure {
    // 静的ファイルを優先
    const pageStructure = this.pageStructureMap[pageStructureId as keyof typeof this.pageStructureMap];
    
    if (pageStructure) {
      console.log(`📄 静的ページ構造読み込み: ${pageStructure.name}`);
      console.log(`📊 Pages count: ${pageStructure.pages.length}`);
      
      // templateOverridesが指定されている場合は適用
      let modifiedStructure = pageStructure as PageStructure;
      if (templateOverrides && Object.keys(templateOverrides).length > 0) {
        modifiedStructure = this.applyTemplateOverrides(modifiedStructure, templateOverrides);
      }
      
      return modifiedStructure;
    }
    
    // カンマ区切りパターンの場合は動的生成
    if (pageStructureId.includes(',')) {
      return this.loadPageStructureFromPattern(pageStructureId);
    }
    
    // どちらでもない場合はエラー
    const availableIds = Object.keys(this.pageStructureMap);
    throw new Error(`Page structure '${pageStructureId}' not found. Available: ${availableIds.join(', ')}`);
  }

  /**
   * テンプレートオーバーライドを適用
   * 
   * @param structure - 元のページ構造
   * @param templateOverrides - オーバーライド設定
   * @returns オーバーライド適用後のページ構造
   */
  private static applyTemplateOverrides(
    structure: PageStructure, 
    templateOverrides: Record<string, string>
  ): PageStructure {
    console.log(`🔧 テンプレートオーバーライド適用:`, templateOverrides);
    
    const modifiedPages = structure.pages.map(page => {
      const pageNumberStr = page.pageNumber.toString();
      
      if (templateOverrides[pageNumberStr]) {
        const originalTemplateId = page.templateId;
        const newTemplateId = templateOverrides[pageNumberStr];
        
        console.log(`  📝 Page ${pageNumberStr}: ${originalTemplateId} → ${newTemplateId}`);
        
        return {
          ...page,
          templateId: newTemplateId,
          role: `${page.role} (Override: ${newTemplateId})`
        };
      }
      
      return page;
    });

    return {
      ...structure,
      pages: modifiedPages,
      name: `${structure.name} (Modified)`
    };
  }

  /**
   * 完全なマッチングプロセス：組み合わせからページ構造まで取得
   * 
   * @param typeId - 投稿タイプID
   * @param targetId - ターゲットID
   * @param templateOverrides - テンプレートオーバーライド（オプション）
   * @returns 完全なページ構造定義
   */
  static getCompletePageStructure(
    typeId: string, 
    targetId: string, 
    templateOverrides?: Record<string, string>
  ): {
    pattern: MatchingPattern;
    structure: PageStructure;
  } {
    const pattern = this.findExactMatch(typeId, targetId);
    const structure = this.loadPageStructure(pattern.pageStructureId, templateOverrides);

    return { pattern, structure };
  }

  /**
   * 利用可能なマッチングパターンのリストを取得（デバッグ用）
   */
  static getAvailablePatterns(): MatchingPattern[] {
    const matchingData = this.getMatchingData();
    return matchingData.patterns;
  }

  /**
   * 特定のTypeIDに対応するパターンを取得
   */
  static getPatternsForType(typeId: string): MatchingPattern[] {
    const matchingData = this.getMatchingData();
    return matchingData.patterns.filter(p => p.matchingKey.startsWith(`${typeId}-`));
  }

  /**
   * 特定のTargetIDに対応するパターンを取得
   */
  static getPatternsForTarget(targetId: string): MatchingPattern[] {
    const matchingData = this.getMatchingData();
    return matchingData.patterns.filter(p => p.matchingKey.includes(`-${targetId}-`));
  }

  /**
   * 特定のThemeIDに対応するパターンを取得
   */
  static getPatternsForTheme(themeId: string): MatchingPattern[] {
    const matchingData = this.getMatchingData();
    return matchingData.patterns.filter(p => p.matchingKey.endsWith(`-${themeId}`));
  }
}