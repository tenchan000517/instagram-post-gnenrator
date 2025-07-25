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
  pageNumber: number;
  templateId: string;
  role: string;
  title: string;
  itemAssignments: any;
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
    'problem-solution-carousel-9page': problemSolutionCarousel9page
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
   * @returns 詳細なページ構造定義
   */
  static loadPageStructure(pageStructureId: string): PageStructure {
    // 静的ファイルを優先
    const pageStructure = this.pageStructureMap[pageStructureId as keyof typeof this.pageStructureMap];
    
    if (pageStructure) {
      console.log(`📄 静的ページ構造読み込み: ${pageStructure.name}`);
      console.log(`📊 Pages count: ${pageStructure.pages.length}`);
      return pageStructure as PageStructure;
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
   * 完全なマッチングプロセス：組み合わせからページ構造まで取得
   * 
   * @param typeId - 投稿タイプID
   * @param targetId - ターゲットID
   * @returns 完全なページ構造定義
   */
  static getCompletePageStructure(typeId: string, targetId: string): {
    pattern: MatchingPattern;
    structure: PageStructure;
  } {
    const pattern = this.findExactMatch(typeId, targetId);
    const structure = this.loadPageStructure(pattern.pageStructureId);

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