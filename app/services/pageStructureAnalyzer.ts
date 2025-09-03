import { PageStructure, PremiumTemplateType } from '../types/pageStructure'
import { getGeminiModel } from './geminiClientSingleton'
import { GenreDetector } from './genreDetector'
import { Genre, getGenreConfig } from '../types/genre'
import { KnowledgeBaseParams } from '../types/knowledgeBase'
import { PageStructureMatcher } from './knowledgeBase/PageStructureMatcher'
import { TemplateItemMapper } from './knowledgeBase/TemplateItemMapper'
import { MasterDataService } from './knowledgeBase/MasterDataService'
import { KnowledgeBasedContentGenerator } from './knowledgeBase/KnowledgeBasedContentGenerator'

export class PageStructureAnalyzer {

  private model: any
  private genreDetector: GenreDetector
  constructor() {
    this.model = getGeminiModel()
    this.genreDetector = new GenreDetector()
  }

  async analyzePageStructureAndTemplates(
    input: string,
    knowledgeBaseParams?: KnowledgeBaseParams
  ): Promise<PageStructure[]> {
    // 入力テキストからジャンル情報を抽出
    const specifiedGenre = this.extractGenreFromInput(input)

    // ジャンル判定（指定がある場合は優先、なければ自動判定）
    let detectedGenre: Genre
    let confidence: number

    if (specifiedGenre) {
      detectedGenre = specifiedGenre
      confidence = 1.0 // 明示的に指定されている場合は100%
      console.log('🎯 ジャンル指定検出:', specifiedGenre)
    } else {
      const genreAnalysis = this.genreDetector.getGenreAnalysis(input)
      detectedGenre = genreAnalysis.detectedGenre
      confidence = genreAnalysis.confidence
      console.log('🎯 ジャンル自動判定:', detectedGenre)
    }

    const genreConfig = getGenreConfig(detectedGenre)

    console.log('🎯 ジャンル判定結果:', {
      genre: detectedGenre,
      confidence: confidence,
      optimalItemRange: genreConfig.optimalItemRange
    })

    // ナレッジベース明示的選択モードの場合は統合システムを実行
    if (knowledgeBaseParams?.useKnowledgeBase && knowledgeBaseParams.typeId && knowledgeBaseParams.targetId) {
      console.log('🚀 ナレッジベース統合システム実行 - PageStructureMatcher & TemplateItemMapper使用');
      return this.generateStructuredContent(input, knowledgeBaseParams);
    }

    const basePrompt = `
あなたはInstagram投稿構造の専門家です。以下のコンテンツを分析し、最適なページ構造を決定してください。

【ジャンル分析結果】
- 判定ジャンル: ${detectedGenre}
- 最適項目数: ${genreConfig.optimalItemRange.min}-${genreConfig.optimalItemRange.max}個

【分析ステップ】
1. コンテンツから有益性の高い情報を抽出
2. Instagram投稿に適した構造で分類
3. 各セクションに最適なテンプレートを選択（データ構造に基づく）
4. 視覚的魅力と読みやすさを考慮

【重要制約】
- 入力内容の情報のみ使用（推測・憶測禁止）
- **4-8ページの適切な分量**（充実した価値あるコンテンツを重視）
- テンプレート多様性を重視
- Instagram特化の簡潔性
- **ジャンル別最適項目数の必須遵守**: ${genreConfig.optimalItemRange.min}-${genreConfig.optimalItemRange.max}個の項目を必ず含める

${detectedGenre === 'industry-features' ? `
【業種特徴系特別指針】
- **データ可視化の積極活用**: ランキング・グラフテンプレートを優先選択
- **複数のランキングやハウツーがある場合は適切に分割**: 情報を削らずページ構成で整理
- **統計データの構造化**: 数値データがある場合は必ずranking・graphテンプレートを選択
- **出典情報の重視**: データソース（組織名・年度・発表日）を明記` : ''}

【入力内容】
${input}

【テンプレート選択指針】
**🎯 データ構造による最適選択 🎯**

**データ構造による選択**
**two-column-section-items**: 以下の対比構造は必ずtwo-column-section-itemsを選択
- VS比較（A vs B、明確に2つの選択肢を左右で比較）
- 対比概念（メリット｜デメリット、準備すること｜避けること）
- 左右で異なるカテゴリの項目リスト
- **重要**: 「vs」「対」「メリット・デメリット」などの対比キーワードがある場合

**ranking**: 以下のランキング構造は必ずrankingを選択
- 順位付きデータ（1位〜5位など明確な順序）
- "ワースト"や"ベスト"など順位表現
- パーセンテージや数値付きランキング
- 順位・項目・数値の3要素が揃ったデータ
- **重要**: 「ランキング」「順位」「位」「ワースト」「ベスト」キーワードがある場合

**graph**: 以下のデータ可視化は必ずgraphを選択  
- 円グラフ向け：割合データ（%表記が含まれる）
- 棒グラフ向け：数値比較データ（時間・件数・金額など単位付き）
- データ出典情報あり（組織名・年度・発表日など）
- 複数の数値データポイントを比較する内容
- **重要**: 「グラフ」「データ」「割合」「%」「時間」「比較」「出典」キーワードがある場合

**table**: 以下の構造化データは必ずtableを選択
- 3行以上のデータ一覧（企業名｜業界｜年収など）
- 複雑な比較表（3つ以上の比較対象・多列データ）
- ツール一覧（ツール名｜機能｜価格｜評価など）
- 行と列で整理された体系的な情報（ランキング・グラフ以外）
- **重要**: 「一覧」「比較表」「ツール」キーワードがある場合（ランキング・グラフを除く）

**simple5**: 連続する手順・プロセス・ステップの詳細説明がある場合（異なるカテゴリの並列は避ける）
**list**: シンプルなチェックリスト・行動項目一覧（詳細説明なし）がある場合
**checklist-enhanced**: 各チェック項目に詳細説明がある準備リスト・手順リストがある場合  
**section-items**: 複数カテゴリ+各項目説明がある場合（概要・まとめページに最適）
**index**: 目次・インデックス形式の場合（「INDEX」「目次」「インデックス」「構成」「一覧」「ページ」キーワード）
**single-section-no-items**: 単一セクションの詳細説明（「について」「技術」「スキル」「方法」「能力」キーワード）
**two-column-section-items**: 2つのカテゴリーの比較・分類（「比較」「2つ」「カテゴリー」「分類」「準備と実行」「段階」キーワード）
**item-n-title-content**: 独立した概念・ポイントの詳細説明（**必ず${genreConfig.optimalItemRange.min}-${genreConfig.optimalItemRange.max}個の項目を生成**）

【品質基準】
- 具体的数値・期間・手法を含む実用性
- スマホ画面での瞬間理解度
- 行動につながる価値提供
- **各ページに${genreConfig.optimalItemRange.min}-${genreConfig.optimalItemRange.max}個の充実した項目を含める**
- **2個以下は物足りないため禁止**

【出力形式JSON】
[
  {
    "概要": "具体的内容要約",
    "有益性": "読者への価値",
    "template": "最適テンプレート名",
    "title": "魅力的タイトル",
    "theme": "詳細テーマ説明"
  }
]

**重要**: 各ページは必ず${genreConfig.optimalItemRange.min}-${genreConfig.optimalItemRange.max}個の項目を含むよう設計し、2個以下の少ない項目数は避けること。
`

    try {
      // 🚫 AI API呼び出しをコメントアウト - 緊急対応
// const result = await this.model.generateContent(basePrompt)
      const response = await result.response
      const text = response.text()

      console.log('🎯 PageStructureAnalyzer - 生のレスポンス:', text)

      const cleanText = text.replace(/```json\n?|```\n?/g, '').trim()
      const parsed = JSON.parse(cleanText)

      console.log('✅ PageStructureAnalyzer - パース済み:', parsed)

      return parsed as PageStructure[]
    } catch (error: any) {
      console.error('PageStructureAnalyzer error:', error)

      // API制限エラーの場合、より具体的なメッセージを表示
      if (error?.message?.includes('quota') || error?.message?.includes('429')) {
        throw new Error('Gemini APIの無料プラン制限（1日200回）に達しました。明日再度お試しいただくか、有料プランへのアップグレードをご検討ください。')
      }

      throw new Error('ページ構造分析に失敗しました')
    }
  }

  /**
   * 入力テキストからジャンル指定を抽出する
   * @param input 入力テキスト
   * @returns 指定されたジャンル（なければnull）
   */
  private extractGenreFromInput(input: string): Genre | null {
    // 【ジャンル】: xxxxx 形式を探す
    const genreMatch = input.match(/【ジャンル】\s*[:：]\s*([a-zA-Z-]+)/i)

    if (genreMatch) {
      const genreString = genreMatch[1].toLowerCase().trim()

      // 有効なジャンルかチェック
      const validGenres: Genre[] = [
        'knowhow', 'book-recommendation', 'internship-deadline',
        'entry-deadline', 'industry-features', 'strategy',
        'step-learning', 'general'
      ]

      if (validGenres.includes(genreString as Genre)) {
        return genreString as Genre
      }
    }

    return null
  }

  /**
   * 新統合システム：厳密マッチング + テンプレート項目マッピング
   */
private async generateStructuredContent(
  input: string,
  params: KnowledgeBaseParams
): Promise<PageStructure[]> {
  console.log('🎯 新統合システム開始:', {
    typeId: params.typeId,
    targetId: params.targetId
  });

  try {
    let pattern: any;
    let structure: any;

    // Step 1: 選択済みナレッジからpageStructurePatternを確認
    if (params.knowledgeContents && params.knowledgeContents.length > 0) {
      const selectedKnowledgeInfo = params.knowledgeContents[0] as any;
      const selectedKnowledgeId = selectedKnowledgeInfo.knowledgeId;
      
      // フルデータを取得
      const fullKnowledgeData = await MasterDataService.getKnowledgeContent(selectedKnowledgeId);
      
      if (fullKnowledgeData && fullKnowledgeData.pageStructurePattern && fullKnowledgeData.pageStructurePattern.trim() !== '') {
        console.log('📋 ナレッジからページ構造パターンを取得:', fullKnowledgeData.pageStructurePattern);
        
        // templateOverridesを取得
        const templateOverrides = fullKnowledgeData.templateOverrides;
        if (templateOverrides) {
          console.log('🔧 テンプレートオーバーライド検出:', templateOverrides);
        }
        
        // ハードコード済みの構造を取得（templateOverridesを適用）
        structure = PageStructureMatcher.loadPageStructure(fullKnowledgeData.pageStructurePattern, templateOverrides);
        
        // 模擬的なpatternオブジェクトを作成
        pattern = {
          matchingKey: `${params.typeId}-${params.targetId}`,
          description: `ナレッジベース由来: ${fullKnowledgeData.problemDescription || 'ナレッジデータから取得'}`,
          pageStructureId: fullKnowledgeData.pageStructurePattern,
          reasoning: fullKnowledgeData.postTypeReason || 'ナレッジデータから取得'
        };
        
      } else {
        console.log('📋 従来のマッチング方法を使用');
        // 従来の方法でページ構造を取得
        const result = PageStructureMatcher.getCompletePageStructure(
          params.typeId!,
          params.targetId!
        );
        pattern = result.pattern;
        structure = result.structure;
      }
    } else {
      // フォールバック
      const result = PageStructureMatcher.getCompletePageStructure(
        params.typeId!,
        params.targetId!
      );
      pattern = result.pattern;
      structure = result.structure;
    }

    console.log('✅ ページ構造マッチング成功:', pattern.description);

    // Step 2: 従来通りのTemplateItemMapperで処理継続
    const mapper = new TemplateItemMapper();
    const mappingResult = await mapper.mapContentToPages(input, structure, params.knowledgeContents);

    // 以下は従来通り...
    console.log('✅ テンプレート項目マッピング完了');

    const pageStructures: PageStructure[] = mappingResult.pages.map(page => ({
      概要: `ナレッジベース統合システムによる最適化コンテンツ（${pattern.description}）`,
      有益性: `選択済みナレッジを活用した最適化された価値提供`,
      template: page.templateId as PremiumTemplateType,
      title: page.title,
      theme: JSON.stringify(page.mappedItems),
      isStructuredGeneration: true
    }));

    return pageStructures;

  } catch (error) {
    console.error('❌ 新統合システムエラー:', error);
    throw new Error(`統合システム処理失敗: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
  /**
   * マッピングされたコンテンツをtheme形式に変換（未使用関数）
   */
  /*
  private formatMappedContentAsTheme(mappedItems: any, templateId: string): string {
    try {
      if (mappedItems.sections) {
        return mappedItems.sections.map((section: any) => 
          `${section.sectionTitle}:\n${section.items.join('\n')}`
        ).join('\n\n');
      }

      if (mappedItems.enumeration) {
        return mappedItems.enumeration.join('\n');
      }

      if (mappedItems.ranking) {
        return mappedItems.ranking.map((item: any) => 
          `${item.rank}位: ${item.item}\n${item.description || ''}`
        ).join('\n\n');
      }

      if (mappedItems.items) {
        return mappedItems.items.join('\n');
      }

      // その他の形式の場合はJSON文字列として返す
      return JSON.stringify(mappedItems, null, 2);

    } catch (error) {
      console.error('❌ テーマ形式変換エラー:', error);
      return JSON.stringify(mappedItems, null, 2);
    }
  }
  */
}