import { PageStructure, PremiumTemplateType } from '../types/pageStructure'
import { getGeminiModel } from './geminiClientSingleton'

export class PageStructureAnalyzer {
  private model: any

  constructor() {
    this.model = getGeminiModel()
  }

  async analyzePageStructureAndTemplates(input: string): Promise<PageStructure[]> {
    const prompt = `
あなたはInstagram投稿構造の専門家です。以下のコンテンツを分析し、最適なページ構造を決定してください。

【分析ステップ】
1. コンテンツから有益性の高い情報を抽出
2. Instagram投稿に適した構造で分類
3. 各セクションに最適なテンプレートを選択
4. 視覚的魅力と読みやすさを考慮

【重要制約】
- 入力内容の情報のみ使用（推測・憶測禁止）
- **4-8ページの適切な分量**（充実した価値あるコンテンツを重視）
- テンプレート多様性を重視
- Instagram特化の簡潔性

【入力内容】
${input}

【テンプレート選択指針】
**🚨 表形式データ最優先認識 🚨**
**table**: 以下のような構造化データは必ずtableを選択
- 「カテゴリ｜ツール名｜機能｜メリット」型
- 「項目｜説明｜価格｜評価」型  
- 「企業名｜業界｜特徴｜年収」型
- 行と列の組み合わせで情報が整理されている全てのデータ
- 比較表、一覧表、データベース的な情報

**simple5**: 連続する手順・プロセス・ステップの詳細説明がある場合（異なるカテゴリの並列は避ける）
**list**: シンプルなチェックリスト・行動項目一覧（詳細説明なし）がある場合
**checklist-enhanced**: 各チェック項目に詳細説明がある準備リスト・手順リストがある場合  
**section-items**: 複数カテゴリ+各項目説明がある場合（概要・まとめページに最適）
**item-n-title-content**: 独立した概念・ポイントの詳細説明
**two-column-section-items**: 左右2カラムで異なるカテゴリを並列表示する場合（表形式ではない）

【品質基準】
- 具体的数値・期間・手法を含む実用性
- スマホ画面での瞬間理解度
- 行動につながる価値提供

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
}