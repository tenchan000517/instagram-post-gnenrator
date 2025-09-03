/**
 * テンプレート項目マッピングシステム
 * ページ構成定義に基づいてコンテンツから各テンプレート項目への具体的内容を抽出・変換
 */

import { getGeminiModel } from '../geminiClientSingleton';
import { PageStructure, PageDefinition } from './PageStructureMatcher';

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

  constructor() {
    this.model = getGeminiModel();
  }

  /**
   * ページ構造定義に基づいてコンテンツから各ページの項目を抽出・マッピング
   * 
   * @param input - 入力コンテンツ
   * @param pageStructure - ページ構造定義
   * @param knowledgeContents - ナレッジベースコンテンツ（オプション）
   * @returns マッピング結果
   */
  async mapContentToPages(input: string, pageStructure: PageStructure, knowledgeContents?: any[]): Promise<MappingResult> {
    const startTime = Date.now();
    const mappedPages: MappedContent[] = [];
    let totalExtractions = 0;

    console.log(`🎯 Starting template item mapping for: ${pageStructure.name}`);
    console.log(`📄 Processing ${pageStructure.pages.length} pages`);

    for (const page of pageStructure.pages) {
      try {
        const mappedContent = await this.mapSinglePage(input, page, pageStructure.targetCombination, knowledgeContents);
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
    targetCombination: string,
    knowledgeContents?: any[]
  ): Promise<MappedContent> {
    const extractionRules = this.getExtractionRules(page);
    const itemTypes = this.getItemTypes(page);
    const itemCounts = this.getItemCounts(page);

    console.log(`🔍 Mapping page ${page.pageNumber}: ${page.role}`);
    console.log(`📋 Extraction rules: ${extractionRules.join(', ')}`);

    try {
      // 実データ検索によるコンテンツ抽出
      const mappedItems = await this.extractFromKnowledgeBase(input, page, targetCombination, knowledgeContents);

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
      
      // 🚫 AI生成フォールバックを無効化 - 緊急対応
      // const mappingPrompt = this.buildMappingPrompt(input, page, targetCombination);
      // const result = await this.model.generateContent(mappingPrompt);
      // const response = await result.response;
      // const text = response.text();
      
      // const cleanText = text.replace(/```json\n?|```\n?/g, '').trim();
      // const mappedItems = JSON.parse(cleanText);
      
      // 緊急フォールバック: エラー時は空データ返却
      console.error('🚫 AI生成無効化中 - 空のマッピング結果を返却');
      const mappedItems = [];

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
   * ナレッジベースからコンテンツを抽出
   */
  private async extractFromKnowledgeBase(
    input: string,
    page: PageDefinition,
    targetCombination: string,
    knowledgeContents?: any[]
  ): Promise<any> {
    // ナレッジベースコンテンツが提供されている場合はそれを使用
    if (knowledgeContents && knowledgeContents.length > 0) {
      console.log('📚 Using provided knowledge contents for extraction');
      
      // 最初のナレッジコンテンツから情報を抽出
      const knowledgeData = knowledgeContents[0];
      
      // テンプレート固有の抽出ロジック
      return this.extractFromKnowledgeData(knowledgeData, page);
    }
    
    // フォールバック: 空のデータ構造を返す（従来のAI生成にフォールバック）
    throw new Error('No knowledge base data available for extraction');
  }

  /**
   * ナレッジデータから情報を抽出（テンプレート別）
   */
  private extractFromKnowledgeData(knowledgeData: any, page: PageDefinition): any {
    const templateId = page.templateId;
    console.log(`🔍 Extracting data for template: ${templateId}`);
    
    // テンプレート別の抽出ロジック
    switch (templateId) {
      case 'problem-introduction':
        return this.extractProblemIntroduction(knowledgeData);
      case 'method-detail-card':
        return this.extractMethodDetailCard(knowledgeData);
      case 'method-visual-guide':
        return this.extractMethodVisualGuide(knowledgeData);
      case 'method-summary-keywords':
        return this.extractMethodSummaryKeywords(knowledgeData);
      case 'action-call-checklist':
        return this.extractActionCallChecklist(knowledgeData);
      // 従来のテンプレート対応
      case 'list':
        return this.extractListItems(knowledgeData);
      case 'simple3':
        return this.extractSimple3Items(knowledgeData);
      case 'enumeration':
        return this.extractEnumerationItems(knowledgeData);
      default:
        return this.extractDefaultItems(knowledgeData, page);
    }
  }

  /**
   * problem-introduction テンプレート用の抽出
   */
  private extractProblemIntroduction(knowledgeData: any): any {
    const page1 = knowledgeData.detailedContent?.page1;
    return {
      mainTitle: page1?.mainTitle || knowledgeData.actualTitle || 'タイトル',
      problemStatement: knowledgeData.problemDescription || '問題の説明',
      hookPhrases: [page1?.callToAction || 'アクションを起こそう！']
    };
  }

  /**
   * method-detail-card テンプレート用の抽出
   */
  private extractMethodDetailCard(knowledgeData: any): any {
    const page3 = knowledgeData.detailedContent?.page3;
    const methods = [];
    
    // method1とmethod2を抽出
    if (page3?.method1) {
      methods.push({
        methodName: page3.method1.name,
        steps: page3.method1.steps || [page3.method1.description],
        benefit: page3.method1.warning || page3.method1.description
      });
    }
    
    if (page3?.method2) {
      methods.push({
        methodName: page3.method2.name,
        steps: page3.method2.examples || [page3.method2.description],
        benefit: page3.method2.warning || page3.method2.description
      });
    }
    
    return {
      pageTitle: page3?.title || 'メソッド詳細',
      methods: methods.length > 0 ? methods : [{
        methodName: '方法1',
        steps: knowledgeData.solutionContent?.具体的手順?.slice(0, 2) || ['手順1', '手順2'],
        benefit: knowledgeData.solutionContent?.概要 || '効果的な方法です'
      }]
    };
  }

  /**
   * method-visual-guide テンプレート用の抽出
   */
  private extractMethodVisualGuide(knowledgeData: any): any {
    const page4 = knowledgeData.detailedContent?.page4;
    const page5 = knowledgeData.detailedContent?.page5;
    const methods = [];
    
    // method3とmethod4を抽出
    if (page4?.method3) {
      methods.push({
        methodName: page4.method3.name,
        description: page4.method3.description,
        effectiveness: page4.method3.warning || '効果的な手法です'
      });
    }
    
    if (page5?.method4) {
      methods.push({
        methodName: page5.method4.name,
        description: page5.method4.description,
        effectiveness: page5.method4.warning || '効果的な手法です'
      });
    }
    
    return {
      pageTitle: page4?.title || page5?.title || 'ビジュアルガイド',
      methods: methods.length > 0 ? methods : [{
        methodName: '方法3',
        description: knowledgeData.solutionContent?.概要 || '説明',
        effectiveness: '効果的な手法です'
      }]
    };
  }

  /**
   * method-summary-keywords テンプレート用の抽出
   */
  private extractMethodSummaryKeywords(knowledgeData: any): any {
    const page6 = knowledgeData.detailedContent?.page6;
    
    return {
      pageTitle: page6?.title || '手法まとめ',
      lastMethod: {
        name: page6?.method5?.name || '最終手法',
        description: page6?.method5?.description || knowledgeData.solutionContent?.概要 || '説明',
        effectiveness: page6?.method5?.warning || '効果的な手法です'
      },
      relatedKeywords: knowledgeData.searchKeywords?.slice(0, 4) || ['キーワード1', 'キーワード2'],
      emotionalBenefits: knowledgeData.emotionalTriggers?.slice(0, 3) || ['効果1', '効果2']
    };
  }

  /**
   * action-call-checklist テンプレート用の抽出
   */
  private extractActionCallChecklist(knowledgeData: any): any {
    const page7 = knowledgeData.detailedContent?.page7;
    const actionItems: Array<{action: string, reason: string}> = [];
    
    // 実用的なアドバイスからアクション項目を生成
    if (knowledgeData.solutionContent?.実用的なアドバイス) {
      knowledgeData.solutionContent.実用的なアドバイス.forEach((advice: string, index: number) => {
        actionItems.push({
          action: advice,
          reason: `効果的な取り組み${index + 1}`
        });
      });
    }
    
    return {
      pageTitle: page7?.title || 'アクションプラン',
      mainMessage: knowledgeData.solutionContent?.概要 || 'まとめメッセージ',
      actionItems: actionItems.length > 0 ? actionItems : [{
        action: '今すぐ始めよう',
        reason: '継続的な成長のため'
      }],
      closingHook: page7?.ctaInstructions?.[0] || 'さあ、始めましょう！'
    };
  }

  /**
   * リストテンプレート用の抽出（従来テンプレート）
   */
  private extractListItems(knowledgeData: any): any {
    return {
      title: knowledgeData.actualTitle || knowledgeData.problemDescription || 'タイトル',
      items: knowledgeData.solutionContent?.具体的手順 || ['項目1', '項目2', '項目3']
    };
  }

  /**
   * Simple3テンプレート用の抽出（従来テンプレート）
   */
  private extractSimple3Items(knowledgeData: any): any {
    return {
      title: knowledgeData.actualTitle || knowledgeData.problemDescription || 'タイトル',
      point1: knowledgeData.solutionContent?.概要 || 'ポイント1',
      point2: knowledgeData.solutionContent?.具体的手順?.[0] || 'ポイント2',
      point3: knowledgeData.solutionContent?.実用的なアドバイス?.[0] || 'ポイント3'
    };
  }

  /**
   * Enumerationテンプレート用の抽出（従来テンプレート）
   */
  private extractEnumerationItems(knowledgeData: any): any {
    return {
      title: knowledgeData.actualTitle || knowledgeData.problemDescription || 'タイトル',
      enumeration: knowledgeData.solutionContent?.具体的手順 || ['1. 項目1', '2. 項目2', '3. 項目3']
    };
  }

  /**
   * デフォルトの抽出（従来テンプレート）
   */
  private extractDefaultItems(knowledgeData: any, page: PageDefinition): any {
    return {
      title: knowledgeData.actualTitle || knowledgeData.problemDescription || page.title || 'タイトル',
      content: knowledgeData.solutionContent?.概要 || 'コンテンツ'
    };
  }

}