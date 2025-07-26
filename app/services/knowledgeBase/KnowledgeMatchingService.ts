/**
 * ナレッジマッチングサービス
 * 入力データから類似するナレッジを判定・選択するAIサービス
 */

import { GoogleGenerativeAI } from '@google/generative-ai'

export interface KnowledgeMatchResult {
  knowledgeId: string
  score: number
}

export interface KnowledgeMatchingRequest {
  userInput: string
  knowledgeContents: any[]
}

export class KnowledgeMatchingService {
  private static genAI: GoogleGenerativeAI | null = null

  /**
   * Gemini AIインスタンスを初期化
   */
  private static initializeAI(): GoogleGenerativeAI {
    if (!this.genAI) {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set')
      }
      this.genAI = new GoogleGenerativeAI(apiKey)
    }
    return this.genAI
  }

  /**
   * 入力データに最も関連するナレッジを判定・選択
   * @param request マッチング要求データ
   * @returns マッチング結果配列（スコア順）
   */
  static async findRelevantKnowledge(request: KnowledgeMatchingRequest): Promise<KnowledgeMatchResult[]> {
    try {
      console.log('🔍 ナレッジマッチング開始:', {
        userInputLength: request.userInput.length,
        knowledgeCount: request.knowledgeContents.length
      })

      const genAI = this.initializeAI()
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

      // プロンプト構築前の確認
      console.log('🔍 プロンプト構築前のknowledgeContents:', request.knowledgeContents.map(k => ({
        knowledgeId: k.knowledgeId,
        hasActualTitle: !!k.actualTitle,
        hasProblemDescription: !!k.problemDescription
      })))
      
      let prompt: string
      try {
        prompt = this.buildMatchingPrompt(request)
        console.log('📝 生成されたプロンプト:', prompt)
      } catch (error) {
        console.error('❌ プロンプト構築エラー:', error)
        throw error
      }

      // AI判定実行
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      console.log('🤖 AI判定結果:', text)

      // 利用可能なナレッジIDリストを取得（リクエストのknowledgeContentsから）
      const availableKnowledgeIds = request.knowledgeContents
        .map(k => k.knowledgeId)
        .filter(Boolean) // undefined/null除外
        
      console.log('📋 利用可能ナレッジID:', availableKnowledgeIds)
      
      // レスポンス解析
      const matchResults = this.parseMatchingResponse(text, availableKnowledgeIds)

      console.log('📊 解析済みマッチング結果:', matchResults)

      return matchResults

    } catch (error) {
      console.error('❌ ナレッジマッチングエラー:', error)
      // フォールバック: 空配列を返す（エラー時は選択なし）
      return []
    }
  }

  /**
   * マッチング用プロンプトを構築
   */
  private static buildMatchingPrompt(request: KnowledgeMatchingRequest): string {
    const knowledgeData = request.knowledgeContents.map((knowledge, index) => {
      return `
ナレッジ${index + 1}:
- **ナレッジID: ${knowledge.knowledgeId}** ← これを出力に使用
- タイトル: ${knowledge.actualTitle}
- 問題: ${knowledge.problemDescription}
- カテゴリ: ${knowledge.problemCategory}
- 解決内容: ${JSON.stringify(knowledge.solutionContent || {}, null, 2)}
- キーワード: ${knowledge.searchKeywords?.join(', ') || ''}
- 感情トリガー: ${knowledge.emotionalTriggers?.join(', ') || ''}
`
    }).join('\n')

    return `
あなたはInstagram投稿生成のためのナレッジマッチング専門AIです。

【タスク】
ユーザーの入力内容に最も関連性の高いナレッジを判定してください。

【ユーザー入力】
${request.userInput}

【利用可能ナレッジ】
${knowledgeData}

【判定基準】
1. 内容の関連性（問題・解決策の一致度）
2. キーワードのマッチ度
3. ターゲット層の適合性
4. 感情・ニーズの一致度

【出力形式】
上記ナレッジリストの「**ナレッジID**」のみを使用して、関連性の高い順に出力してください。

出力例（実際のナレッジIDは上記リストのものを使用）：
${request.knowledgeContents.length >= 2 
  ? `${request.knowledgeContents[0].knowledgeId} 0.85
${request.knowledgeContents[1].knowledgeId} 0.7`
  : 'K### 0.85\nK### 0.7'}

要件：
- 必ず上記リストに記載されたナレッジIDのみ使用
- 改行区切りで1行に1つのナレッジIDとスコア
- 半角スペース区切りでスコア（0.0-1.0）を併記
- スコア0.5以上のもののみ出力
- 最大3個まで
- 余計な説明文やJSONは不要
`
  }

  /**
   * AI応答を解析してマッチング結果に変換
   */
  private static parseMatchingResponse(response: string, availableKnowledgeIds: string[] = []): KnowledgeMatchResult[] {
    try {
      const results: KnowledgeMatchResult[] = []
      
      // 改行区切りで各行を処理
      const lines = response.split('\n').map(line => line.trim()).filter(line => line)
      
      for (const line of lines) {
        // "K001 0.85" 形式をパース（大文字小文字対応）
        const match = line.match(/^([Kk]\d{3})\s+([\d.]+)$/)
        if (match) {
          // システム一貫形式に正規化（大文字K + 3桁数字）
          const knowledgeId = match[1].toUpperCase()
          const score = parseFloat(match[2])
          
          // バリデーション
          if (score >= 0 && score <= 1 && /^K\d{3}$/.test(knowledgeId)) {
            // 利用可能なナレッジIDリストがある場合は存在チェック
            if (availableKnowledgeIds.length === 0 || availableKnowledgeIds.includes(knowledgeId)) {
              results.push({ knowledgeId, score })
            } else {
              console.warn(`⚠️ 存在しないナレッジID: ${knowledgeId}`)
            }
          }
        }
      }
      
      // スコア降順でソート
      return results.sort((a, b) => b.score - a.score)

    } catch (error) {
      console.error('AI応答解析エラー:', error)
      return []
    }
  }

  /**
   * マッチング結果を絞り込み
   * @param results マッチング結果
   * @param threshold 最小スコア閾値
   * @param maxCount 最大返却数
   */
  static filterMatchResults(
    results: KnowledgeMatchResult[], 
    threshold: number = 0.5,
    maxCount: number = 3
  ): KnowledgeMatchResult[] {
    return results
      .filter(result => result.score >= threshold)
      .slice(0, maxCount)
  }
}