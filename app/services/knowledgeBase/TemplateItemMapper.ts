/**
 * テンプレート項目マッピングシステム
 * ページ構成定義に基づいてコンテンツから各テンプレート項目への具体的内容を抽出・変換
 */

import { getGeminiModel } from '../geminiClientSingleton';
import { PageStructure, PageDefinition } from './PageStructureMatcher';
import { KnowledgeSearchEngine, SearchResult } from './KnowledgeSearchEngine';

export interface MappedContent {
  pageNumber: number;
  templateId: string;
  title: string;
  mappedItems: any;
  extractionMetadata: {
    extractionRules: string[];
    itemTypes: string[];
    itemCounts: number[];
  };
}

export interface MappingResult {
  pages: MappedContent[];
  totalExtractions: number;
  processingTime: number;
}

export class TemplateItemMappingError extends Error {
  constructor(
    message: string,
    public readonly pageNumber: number,
    public readonly templateId: string,
    public readonly extractionRule?: string
  ) {
    super(message);
    this.name = 'TemplateItemMappingError';
  }
}

export class TemplateItemMapper {
  private model: any;
  private knowledgeSearch: KnowledgeSearchEngine;

  constructor() {
    this.model = getGeminiModel();
    this.knowledgeSearch = new KnowledgeSearchEngine();
  }

  /**
   * ページ構造定義に基づいてコンテンツから各ページの項目を抽出・マッピング
   * 
   * @param input - 入力コンテンツ
   * @param pageStructure - ページ構造定義
   * @returns マッピング結果
   */
  async mapContentToPages(input: string, pageStructure: PageStructure): Promise<MappingResult> {
    const startTime = Date.now();
    const mappedPages: MappedContent[] = [];
    let totalExtractions = 0;

    console.log(`🎯 Starting template item mapping for: ${pageStructure.name}`);
    console.log(`📄 Processing ${pageStructure.pages.length} pages`);

    for (const page of pageStructure.pages) {
      try {
        const mappedContent = await this.mapSinglePage(input, page, pageStructure.targetCombination);
        mappedPages.push(mappedContent);
        totalExtractions += this.countExtractions(mappedContent);
        
        console.log(`✅ Page ${page.pageNumber} mapped successfully (${mappedContent.templateId})`);
      } catch (error) {
        console.error(`❌ Failed to map page ${page.pageNumber}:`, error);
        throw new TemplateItemMappingError(
          `Failed to map content for page ${page.pageNumber}: ${error}`,
          page.pageNumber,
          page.templateId,
          this.getExtractionRules(page).join(', ')
        );
      }
    }

    const processingTime = Date.now() - startTime;

    console.log(`🎉 Template item mapping completed`);
    console.log(`⏱️ Processing time: ${processingTime}ms`);
    console.log(`📊 Total extractions: ${totalExtractions}`);

    return {
      pages: mappedPages,
      totalExtractions,
      processingTime
    };
  }

  /**
   * 単一ページのコンテンツマッピング
   * 実データ検索によるAI想像依存の排除
   */
  private async mapSinglePage(
    input: string,
    page: PageDefinition,
    targetCombination: string
  ): Promise<MappedContent> {
    const extractionRules = this.getExtractionRules(page);
    const itemTypes = this.getItemTypes(page);
    const itemCounts = this.getItemCounts(page);

    console.log(`🔍 Mapping page ${page.pageNumber}: ${page.role}`);
    console.log(`📋 Extraction rules: ${extractionRules.join(', ')}`);

    try {
      // 実データ検索によるコンテンツ抽出
      const mappedItems = await this.extractFromKnowledgeBase(input, page, targetCombination);

      return {
        pageNumber: page.pageNumber,
        templateId: page.templateId,
        title: page.title,
        mappedItems,
        extractionMetadata: {
          extractionRules,
          itemTypes,
          itemCounts
        }
      };
    } catch (error) {
      console.warn(`⚠️ Knowledge base extraction failed for page ${page.pageNumber}, falling back to AI generation`);
      
      // フォールバック: AI生成
      const mappingPrompt = this.buildMappingPrompt(input, page, targetCombination);
      const result = await this.model.generateContent(mappingPrompt);
      const response = await result.response;
      const text = response.text();
      
      const cleanText = text.replace(/```json\n?|```\n?/g, '').trim();
      const mappedItems = JSON.parse(cleanText);

      return {
        pageNumber: page.pageNumber,
        templateId: page.templateId,
        title: page.title,
        mappedItems,
        extractionMetadata: {
          extractionRules,
          itemTypes,
          itemCounts
        }
      };
    }
  }

  /**
   * コンテンツマッピング用のプロンプトを構築
   */
  private buildMappingPrompt(input: string, page: PageDefinition, targetCombination: string): string {
    const templateSpecificInstructions = this.getTemplateSpecificInstructions(page.templateId);
    
    return `
あなたは Instagram 投稿のコンテンツマッピング専門家です。

【タスク】
入力コンテンツから以下のページ定義に基づいて具体的な項目を抽出し、テンプレート形式にマッピングしてください。

【ページ情報】
- ページ番号: ${page.pageNumber}
- テンプレートID: ${page.templateId}
- ページ役割: ${page.role}
- ページタイトル: ${page.title}
- 対象組み合わせ: ${targetCombination}

【項目マッピング定義】
${JSON.stringify(page.itemAssignments, null, 2)}

【テンプレート別指示】
${templateSpecificInstructions}

【重要な抽出原則】
1. **入力コンテンツのみ使用**: 推測や外部知識は追加しない
2. **抽出ルール厳守**: extractionRule で指定された内容のみ抽出
3. **項目数遵守**: itemCount で指定された数を正確に生成
4. **項目タイプ適合**: itemType に適した内容形式で出力
5. **具体性重視**: 抽象的でなく具体的で実用的な内容

【タイトル形式の制約】
- タイトルは必ず「〇〇！：〇〇」または「〇〇：〇〇」の形式で作成する
- コロン（：）の前後にそれぞれ意味のある単語・フレーズを配置する
- 例：「26卒必見！：必須の準備項目」「企業研究：効率的な情報収集法」
- 感嘆符（！）は適度に使用し、多用は避ける

【入力コンテンツ】
${input}

【出力形式】
以下のJSON形式で出力してください：
${this.getOutputFormat(page.templateId)}

注意: JSON形式のみで回答し、説明文は不要です。
`;
  }

  /**
   * テンプレート別の詳細指示を取得
   */
  private getTemplateSpecificInstructions(templateId: string): string {
    const instructions: Record<string, string> = {
      'section-items': `
- sections配列の各セクションに対応する項目を生成
- 各項目は簡潔で具体的な内容にする
- セクションタイトルと項目内容の関連性を重視`,

      'enumeration': `
- enumeration配列として指定された数の項目を生成
- 各項目は並列で同等の重要度として扱う
- 簡潔で理解しやすい表現にする`,

      'ranking': `
- ランキング形式で順位付きの項目を生成
- 各項目に順位と内容を含める
- データ根拠がある場合は含める`,

      'two-column-section-items': `
- 左右2列の構成で項目を生成
- 対比や比較関係を明確にする
- 左右のバランスを考慮`,

      'simple5': `
- 段階的なステップとして項目を生成
- 実行可能で具体的な手順にする
- 順序性を重視`,

      'list': `
- シンプルなリスト形式で項目を生成
- 各項目は独立した価値を持つ
- 読みやすさを重視`,

      'checklist-enhanced': `
- チェックリスト形式で詳細説明付きの項目を生成
- 実行可能なアクション項目にする
- 各項目に説明を含める`
    };

    return instructions[templateId] || '- テンプレート形式に適した項目を生成してください';
  }

  /**
   * テンプレート別の出力形式を取得
   */
  private getOutputFormat(templateId: string): string {
    const formats: Record<string, string> = {
      'section-items': `{
  "title": "ページタイトル",
  "sections": [
    {
      "title": "セクション名",
      "items": ["項目1", "項目2", "項目3"]
    }
  ]
}`,

      'enumeration': `{
  "title": "ページタイトル", 
  "enumeration": ["項目1", "項目2", "項目3", "項目4", "項目5"]
}`,

      'ranking': `{
  "title": "ページタイトル",
  "ranking": [
    {"rank": 1, "item": "1位項目", "description": "説明"},
    {"rank": 2, "item": "2位項目", "description": "説明"}
  ]
}`
    };

    return formats[templateId] || `{
  "title": "ページタイトル",
  "items": ["項目1", "項目2", "項目3"]
}`;
  }

  /**
   * ページから抽出ルールを取得
   */
  private getExtractionRules(page: PageDefinition): string[] {
    const rules: string[] = [];
    
    if (page.itemAssignments.sections) {
      page.itemAssignments.sections.forEach((section: any) => {
        if (section.extractionRule) {
          rules.push(section.extractionRule);
        }
      });
    }
    
    if (page.itemAssignments.enumeration?.extractionRule) {
      rules.push(page.itemAssignments.enumeration.extractionRule);
    }

    return rules;
  }

  /**
   * ページから項目タイプを取得
   */
  private getItemTypes(page: PageDefinition): string[] {
    const types: string[] = [];
    
    if (page.itemAssignments.sections) {
      page.itemAssignments.sections.forEach((section: any) => {
        if (section.itemType) {
          types.push(section.itemType);
        }
      });
    }
    
    if (page.itemAssignments.enumeration?.itemType) {
      types.push(page.itemAssignments.enumeration.itemType);
    }

    return types;
  }

  /**
   * ページから項目数を取得
   */
  private getItemCounts(page: PageDefinition): number[] {
    const counts: number[] = [];
    
    if (page.itemAssignments.sections) {
      page.itemAssignments.sections.forEach((section: any) => {
        if (section.itemCount) {
          counts.push(section.itemCount);
        }
      });
    }
    
    if (page.itemAssignments.enumeration?.itemCount) {
      counts.push(page.itemAssignments.enumeration.itemCount);
    }

    return counts;
  }

  /**
   * マッピングされたコンテンツから抽出数をカウント
   */
  private countExtractions(mappedContent: MappedContent): number {
    let count = 0;
    
    if (mappedContent.mappedItems.sections) {
      mappedContent.mappedItems.sections.forEach((section: any) => {
        if (section.items) {
          count += section.items.length;
        }
      });
    }
    
    if (mappedContent.mappedItems.enumeration) {
      count += mappedContent.mappedItems.enumeration.length;
    }
    
    if (mappedContent.mappedItems.ranking) {
      count += mappedContent.mappedItems.ranking.length;
    }

    return count;
  }

  /**
   * ナレッジベースからの実データ抽出
   * AI想像を排除し、実際のコンテンツデータから項目を構築
   */
  private async extractFromKnowledgeBase(
    input: string,
    page: PageDefinition,
    targetCombination: string
  ): Promise<any> {
    console.log(`📊 Extracting from knowledge base for page ${page.pageNumber} (${page.role})`);

    // 入力からペルソナとカテゴリを推定
    const personaId = this.extractPersonaFromInput(input);
    const category = this.extractCategoryFromPageRole(page.role);
    const emotionalTrigger = this.extractEmotionalTriggerFromInput(input);

    console.log(`🎯 Search criteria - Persona: ${personaId}, Category: ${category}, Trigger: ${emotionalTrigger}`);

    // 実データ検索
    const searchResults = this.knowledgeSearch.searchPinpoint(personaId, category, emotionalTrigger);
    
    if (searchResults.length === 0) {
      throw new Error(`No matching knowledge base data found for criteria: ${JSON.stringify({ personaId, category, emotionalTrigger })}`);
    }

    const bestMatch = searchResults[0]; // 最高スコアの結果を使用
    console.log(`✅ Using best match: ${bestMatch.id} (score: ${bestMatch.relevanceScore})`);

    // テンプレート形式に変換
    return this.formatDataForTemplate(bestMatch, page);
  }

  /**
   * 入力からペルソナIDを推定
   */
  private extractPersonaFromInput(input: string): string {
    // 既存のペルソナ判定ロジックを使用または基本的なキーワードマッチング
    if (input.includes('戦略的') || input.includes('効率') || input.includes('データ')) {
      return 'P001'; // 戦略的就活生
    }
    if (input.includes('不安') || input.includes('将来')) {
      return 'P004'; // 将来不安型就活生
    }
    if (input.includes('女性') || input.includes('キャリア')) {
      return 'P002'; // キャリア志向女性
    }
    if (input.includes('AI') || input.includes('初心者')) {
      return 'P003'; // AI学習初心者
    }
    
    // デフォルトは P001
    return 'P001';
  }

  /**
   * ページ役割からカテゴリを推定
   */
  private extractCategoryFromPageRole(role: string): string | undefined {
    const roleToCategory: Record<string, string> = {
      'emotional-hook': '自己分析',
      'problem-analysis': '面接対策',
      'solution-framework': 'スキル習得',
      'practical-steps': '就活効率化',
      'call-to-action': '業界研究'
    };
    
    return roleToCategory[role];
  }

  /**
   * 入力から感情トリガーを推定
   */
  private extractEmotionalTriggerFromInput(input: string): string | undefined {
    if (input.includes('効率') || input.includes('時短')) {
      return '効率性';
    }
    if (input.includes('不安') || input.includes('心配')) {
      return '共感';
    }
    if (input.includes('優秀') || input.includes('差別化')) {
      return '優越感';
    }
    if (input.includes('安心') || input.includes('安全')) {
      return '安心感';
    }
    if (input.includes('危険') || input.includes('危機')) {
      return '危機感';
    }
    
    return undefined;
  }

  /**
   * 検索結果をテンプレート形式にフォーマット
   */
  private formatDataForTemplate(result: SearchResult, page: PageDefinition): any {
    const templateId = page.templateId;
    
    // テンプレート別のフォーマッティング
    switch (templateId) {
      case 'section-items':
        return this.formatAsSectionItems(result, page);
      case 'enumeration':
        return this.formatAsEnumeration(result, page);
      case 'ranking':
        return this.formatAsRanking(result, page);
      default:
        return this.formatAsDefault(result, page);
    }
  }

  /**
   * セクション項目形式でフォーマット
   */
  private formatAsSectionItems(result: SearchResult, page: PageDefinition): any {
    const solution = result.solutionContent;
    const sections = [];

    if (solution.methods) {
      sections.push({
        title: '実践方法',
        items: solution.methods.map((method: any) => 
          typeof method === 'string' ? method : method.name || method.description
        ).slice(0, 3)
      });
    }

    if (solution.problems) {
      sections.push({
        title: '具体的な問題',
        items: solution.problems.slice(0, 3)
      });
    }

    if (solution.steps) {
      sections.push({
        title: '実行ステップ',
        items: solution.steps.map((step: any) => 
          typeof step === 'string' ? step : step.name || step.description
        ).slice(0, 3)
      });
    }

    return {
      title: result.actualTitle,
      sections: sections.slice(0, 2) // 最大2セクション
    };
  }

  /**
   * 列挙形式でフォーマット
   */
  private formatAsEnumeration(result: SearchResult, page: PageDefinition): any {
    const solution = result.solutionContent;
    let items: string[] = [];

    // 複数のソースから項目を収集
    if (solution.methods) {
      items = items.concat(solution.methods.map((method: any) => 
        typeof method === 'string' ? method : method.name || method.description
      ));
    }
    if (solution.tools && solution.tools.length > 0) {
      items = items.concat(solution.tools.map((tool: any) => 
        typeof tool === 'string' ? tool : tool.name || tool.purpose
      ));
    }
    if (solution.problems) {
      items = items.concat(solution.problems);
    }

    // 効果的表現を追加
    if (result.effectiveExpressions) {
      items = items.concat(result.effectiveExpressions);
    }

    return {
      title: result.actualTitle,
      enumeration: items.slice(0, 5) // 最大5項目
    };
  }

  /**
   * ランキング形式でフォーマット
   */
  private formatAsRanking(result: SearchResult, page: PageDefinition): any {
    const solution = result.solutionContent;
    const ranking = [];

    if (solution.methods) {
      solution.methods.forEach((method: any, index: number) => {
        if (ranking.length < 5) {
          ranking.push({
            rank: index + 1,
            item: typeof method === 'string' ? method : method.name,
            description: typeof method === 'object' ? method.effectiveness || method.description : ''
          });
        }
      });
    }

    return {
      title: result.actualTitle,
      ranking
    };
  }

  /**
   * デフォルト形式でフォーマット
   */
  private formatAsDefault(result: SearchResult, page: PageDefinition): any {
    const solution = result.solutionContent;
    const items = [];

    // 利用可能な全てのコンテンツから項目を抽出
    if (solution.methods) {
      items.push(...solution.methods.map((method: any) => 
        typeof method === 'string' ? method : method.name || method.description
      ));
    }
    if (solution.problems) {
      items.push(...solution.problems);
    }
    if (result.effectiveExpressions) {
      items.push(...result.effectiveExpressions);
    }

    return {
      title: result.actualTitle,
      items: items.slice(0, 5)
    };
  }
}