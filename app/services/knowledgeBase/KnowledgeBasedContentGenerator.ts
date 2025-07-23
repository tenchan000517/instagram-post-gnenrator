/**
 * ナレッジベース起点のコンテンツ生成サービス
 * 従来のAI推測ではなく、選択済みナレッジデータを活用した構造指定生成
 */

import { GoogleGenerativeAI } from '@google/generative-ai'

// 投稿タイプの定義
const POST_TYPES = {
  '001': {
    name: 'キャリアの悩み解決法',
    characteristics: '感情的共感を軸とした心理的サポート・価値観転換',
    contentStyle: '体験談活用、ストーリーテリング、感情誘導設計',
    value: '不安解消、励まし、共感、価値観転換、心理的変化促進'
  },
  '002': {
    name: 'スキルアップガイド', 
    characteristics: '体系的知識伝達・段階的スキル習得支援',
    contentStyle: '教育的構成、論理的展開、実践的指導',
    value: 'スキル習得、知識獲得、段階的成長、問題解決手法',
    requirement: '1ページ目から順番実行で目的達成、具体的手順必須'
  },
  '003': {
    name: '業界・企業情報まとめ',
    characteristics: '客観的データ・情報リソース提供',
    contentStyle: 'データ駆動、客観的分析、網羅的情報整理',
    value: '情報収集効率化、客観的判断材料、データベース機能'
  },
  '004': {
    name: '効率アップテクニック',
    characteristics: '即効性・実用性重視の時短・効率化',
    contentStyle: 'シンプル構成、実践重視、即効性訴求',
    value: '時短効果、実用性、効率化、直接的解決策'
  }
} as const

export interface KnowledgeBasedGenerationRequest {
  userInput: string
  knowledgeData: any
  pageStructure: any
  templateStructure: any
  pageNumber: number
}

export interface KnowledgeBasedGenerationResult {
  success: boolean
  generatedContent: any
  error?: string
}

export class KnowledgeBasedContentGenerator {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set')
    }
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  }

  /**
   * ナレッジベース起点でページコンテンツを生成
   */
  async generatePageContent(request: KnowledgeBasedGenerationRequest): Promise<KnowledgeBasedGenerationResult> {
    try {
      console.log(`🎯 ナレッジベース起点生成開始 - ページ${request.pageNumber}`)
      
      // プロンプトを構築
      const prompt = this.buildKnowledgeBasedPrompt(request)
      
      console.log('📝 生成プロンプト:', prompt.substring(0, 200) + '...')
      
      // AI生成実行
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const generatedText = response.text()
      
      console.log('✅ 生成完了:', generatedText.substring(0, 100) + '...')
      
      // JSONパース
      const parsedContent = this.parseGeneratedContent(generatedText)
      
      return {
        success: true,
        generatedContent: parsedContent
      }

    } catch (error) {
      console.error('❌ ナレッジベース起点生成エラー:', error)
      return {
        success: false,
        generatedContent: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * ナレッジベース起点のプロンプトを構築
   */
  private buildKnowledgeBasedPrompt(request: KnowledgeBasedGenerationRequest): string {
    const { userInput, knowledgeData, pageStructure, templateStructure, pageNumber } = request
    
    // 投稿タイプ情報を取得
    const typeId = knowledgeData.knowledgeId?.startsWith('K0') ? 
      knowledgeData.knowledgeId.substring(1, 4) : '002' // K004 -> 002
    const typeInfo = POST_TYPES[typeId as keyof typeof POST_TYPES] || POST_TYPES['002']
    
    // 現在のページ情報を取得
    const currentPage = pageStructure.pages.find((p: any) => p.pageNumber === pageNumber)
    
    return `
あなたはInstagram投稿の専門コンテンツクリエイターです。
ナレッジベースの情報を活用して、指定された構造に完璧に適合するコンテンツを生成してください。

【投稿意図】
${userInput}

【投稿タイプ】${typeInfo.name}
【特性】${typeInfo.characteristics}
【コンテンツスタイル】${typeInfo.contentStyle}
【提供価値】${typeInfo.value}
${typeInfo.requirement ? `【必須要求】${typeInfo.requirement}` : ''}

【解決すべき困った】
${knowledgeData.problemDescription}

【ターゲットの学習レベル】
${knowledgeData.marketingStage}

【活用すべき解決策】
${JSON.stringify(knowledgeData.solutionContent, null, 2)}

【安全確認済み表現事例】
${knowledgeData.effectiveExpressions?.join(', ')}
↑この程度の表現強度・トーンで生成してください

【感情トリガー】
${knowledgeData.emotionalTriggers?.join(', ')}

【ページ${pageNumber}の生成構造】
${JSON.stringify(currentPage.templatePattern, null, 2)}

【生成ルール】
1. 投稿意図を尊重しつつ、投稿タイプの特性に完全適合
2. 「困った」を必ず解決する内容にする
3. 学習レベルに適した表現の深さで作成
4. 表現事例と同レベルの適切なトーンで
5. 上記の生成構造に完璧に適合するJSONで出力
6. ナレッジの解決策を必須活用（参考程度ではない）
7. 解決密度を維持（一般化・抽象化禁止）

【出力形式】
上記の生成構造と完全に一致するJSONのみを出力してください。
説明文や追加のテキストは一切不要です。

生成構造: ${JSON.stringify(currentPage.templatePattern, null, 2)}
`
  }

  /**
   * 生成されたコンテンツをパース
   */
  private parseGeneratedContent(generatedText: string): any {
    try {
      // JSONブロック除去
      const cleanText = generatedText.replace(/```json\n?|```\n?/g, '').trim()
      
      // JSONパース
      const parsed = JSON.parse(cleanText)
      
      console.log('📊 パース済みコンテンツ:', JSON.stringify(parsed, null, 2))
      
      return parsed
      
    } catch (error) {
      console.error('❌ コンテンツパースエラー:', error)
      console.log('生のレスポンス:', generatedText)
      
      // フォールバック
      return {
        error: 'パース失敗',
        rawContent: generatedText
      }
    }
  }
}