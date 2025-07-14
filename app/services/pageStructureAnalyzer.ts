import { PageStructure, PremiumTemplateType } from '../types/pageStructure'
import { getGeminiModel } from './geminiClientSingleton'
import { GenreDetector } from './genreDetector'
import { ItemCountOptimizer } from './itemCountOptimizer'
import { Genre, getGenreConfig } from '../types/genre'

export class PageStructureAnalyzer {
  private model: any
  private genreDetector: GenreDetector
  private itemCountOptimizer: ItemCountOptimizer

  constructor() {
    this.model = getGeminiModel()
    this.genreDetector = new GenreDetector()
    this.itemCountOptimizer = new ItemCountOptimizer()
  }

  async analyzePageStructureAndTemplates(input: string): Promise<PageStructure[]> {
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

    const prompt = `
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

**table**: 以下の構造化データは必ずtableを選択
- 3行以上のデータ一覧（企業名｜業界｜年収など）
- ランキング表（順位｜項目｜スコア/評価）
- ツール一覧（ツール名｜機能｜価格｜評価など）
- 比較表で3つ以上の比較対象がある場合
- 行と列で整理された体系的な情報
- **重要**: 「一覧」「ランキング」「比較表」「データ」キーワードがある場合

**simple5**: 連続する手順・プロセス・ステップの詳細説明がある場合（異なるカテゴリの並列は避ける）
**list**: シンプルなチェックリスト・行動項目一覧（詳細説明なし）がある場合
**checklist-enhanced**: 各チェック項目に詳細説明がある準備リスト・手順リストがある場合  
**section-items**: 複数カテゴリ+各項目説明がある場合（概要・まとめページに最適）
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
      const result = await this.model.generateContent(prompt)
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
}