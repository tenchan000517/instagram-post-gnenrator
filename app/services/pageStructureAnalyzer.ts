import { PageStructure, PremiumTemplateType } from '../types/pageStructure'
import { getGeminiModel } from './geminiClientSingleton'

export class PageStructureAnalyzer {
  private model: any

  constructor() {
    this.model = getGeminiModel()
  }

  async analyzePageStructureAndTemplates(input: string): Promise<PageStructure[]> {
    const prompt = `
以下の入力内容を分析し、最適なページ構造を決定してください。

【重要制約】
- 入力内容の情報のみ使用（推測・憶測・外部情報禁止）
- 8-10ページ程度の適切な分量
- 優秀テンプレート優先選択
- タイトル形式: "概要：有益性"

【入力内容】
${input}

【優秀テンプレート優先順位】
1. table（比較要素がある場合）
2. simple5（ステップ・手順・チェックリスト）
3. section-items（セクション+アクション項目）
4. two-column-section-items（複数セクション+項目）
5. checklist-enhanced（詳細チェック項目）
6. item-n-title-content（独立概念説明）

【出力形式JSON】
[
  {
    "概要": "面接準備",
    "有益性": "当日までのチェックリスト",
    "template": "checklist-enhanced",
    "title": "面接準備：当日までのチェックリスト",
    "theme": "面接当日までに準備すべき具体的項目"
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