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
    value: '不安解消、励まし、共感、価値観転換、心理的変化促進',
  },
  '002': {
    name: 'スキルアップガイド', 
    characteristics: '体系的知識伝達・段階的スキル習得支援',
    contentStyle: '教育的構成、論理的展開、実践的指導',
    value: 'スキル習得、知識獲得、段階的成長、問題解決手法'
  },
  '003': {
    name: '業界・企業情報まとめ',
    characteristics: '客観的データ・情報リソース提供',
    contentStyle: 'データ駆動、客観的分析、網羅的情報整理',
    value: '情報収集効率化、客観的判断材料、データベース機能',
  },
  '004': {
    name: '効率アップテクニック',
    characteristics: '即効性・実用性重視の時短・効率化',
    contentStyle: 'シンプル構成、実践重視、即効性訴求',
    value: '時短効果、実用性、効率化、直接的解決策',
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
      console.log('🔍 プロンプト全文:', prompt)
      
      // AI生成実行
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const generatedText = response.text()
      
      console.log('✅ 生成完了:', generatedText.substring(0, 100) + '...')
      
      // JSONパース
      const parsedContent = this.parseGeneratedContent(generatedText)
      
      // 🎯 画像フィールドを元データから補完
      const pageKey = `page${request.pageNumber}`
      const currentPageData = request.knowledgeData.detailedContent[pageKey]
      if (currentPageData?.content?.illustrationImage && !parsedContent.illustrationImage) {
        console.log('🖼️ 画像フィールドを補完:', currentPageData.content.illustrationImage)
        parsedContent.illustrationImage = currentPageData.content.illustrationImage
      }
      
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
    const { userInput, knowledgeData, pageStructure, pageNumber, templateStructure } = request
    
    // 投稿タイプ情報を取得（ナレッジのpostTypeフィールドから直接取得）
    const typeId = knowledgeData.postType || '002'
    const typeInfo = POST_TYPES[typeId as keyof typeof POST_TYPES] || POST_TYPES['002']
    
    // 現在のページ情報を取得（新方式: knowledgeData.detailedContentから直接取得）
    const pageKey = `page${pageNumber}`
    const currentPageData = knowledgeData.detailedContent[pageKey]
    
    if (!currentPageData) {
      throw new Error(`ページ${pageNumber}のデータが見つかりません`)
    }

    // テンプレート決定: pageStructureから基本テンプレート取得 → templateOverridesで上書き
    let baseTemplate = 'step_guide_achievement' // デフォルト
    
    // 対応するページ情報を探す
    const pageInfo = pageStructure.pages.find((p: any) => p.pageNumber === pageNumber) ||
                     pageStructure.pages.find((p: any) => p.pageNumber === "dynamic")
    
    if (pageInfo) {
      baseTemplate = pageInfo.templateId
    }
    
    const finalTemplate = knowledgeData.templateOverrides?.[pageNumber.toString()] || baseTemplate
    
    return `
あなたはInstagram投稿の専門コンテンツクリエイターです。
ナレッジベースの情報を活用して、指定されたテンプレート構造に完璧に適合するコンテンツを生成してください。

【生成対象ページ情報】
ページ番号: ${pageNumber}/${knowledgeData.contentPageCount || knowledgeData.pageCount}
ページの役割: ${currentPageData.role}
セクション: ${currentPageData.section}
テンプレート: ${finalTemplate}

【このページの必須コンテンツ】
${JSON.stringify(currentPageData.content, null, 2)}

【テンプレート構造】
${(() => {
  const isOverride = knowledgeData.templateOverrides?.[pageNumber.toString()];
  const structure = isOverride 
    ? this.getTemplateStructure(finalTemplate)
    : templateStructure;
  
  console.log(`🔍 テンプレート構造ログ - Page ${pageNumber}:`, {
    isOverride: !!isOverride,
    finalTemplate,
    overrideKey: pageNumber.toString(),
    overrideValue: knowledgeData.templateOverrides?.[pageNumber.toString()],
    structure
  });
  
  return JSON.stringify(structure, null, 2);
})()}

【投稿意図】
${userInput}
↑この投稿意図に合致する内容で生成してください

【ターゲットの学習レベル】
 ${knowledgeData.marketingStage || ''}

【投稿タイプ】${typeInfo.name}
【投稿タイプ理由】${knowledgeData.postTypeReason || ''}

【解決すべき困った】
${knowledgeData.problemDescription}

【活用すべき解決策】
${JSON.stringify(knowledgeData.solutionContent, null, 2)}

【検索キーワード】
${knowledgeData.searchKeywords?.join(', ') || ''}

【生成ルール】
1. 投稿意図に完璧に合致する内容で生成（ナレッジの単純コピーではない）
2. このページが全体の${pageNumber}/${knowledgeData.contentPageCount || knowledgeData.pageCount}ページ目であることを意識
3. ページの役割「${currentPageData.role}」に完璧に適合
4. **元のコンテンツと同程度の情報量を維持（Instagram投稿1ページに適した簡潔性重視）**
5. **長文・詳細説明・リスト羅列を避け、要点のみを簡潔に表現**
6. **CTA（「次のページへ」「保存してね」等）は含めない - コンテンツのみに集中**
7. 上記のテンプレート構造に完璧に適合するJSONで出力
8. ナレッジの解決策を必須活用（参考程度ではない）
9. 解決密度を維持（一般化・抽象化禁止）
10. **【重要】currentPageData.contentにillustrationImageが含まれている場合は、必ずそのまま出力JSONに含める**

【出力形式】
上記のテンプレート構造と完全に一致するJSONのみを出力してください。
説明文や追加のテキストは一切不要です。
`
  }

  /**
   * テンプレート構造定義を取得
   */
  private getTemplateStructure(templateName: string): any {
    const templateStructures = {
      // 既存テンプレート（基本構造のみ）
      'basic_intro': {
        title: 'string',
        subtitle: 'string?',
        description: 'string',
        content: 'string'
      },
      'basic_summary': {
        title: 'string',
        content: 'string',
        items: 'string[]?'
      },
      
      // 新テンプレート（優先度A - Critical）
      'sequential_step_learning': {
        stepNumber: 'number',
        stepTitle: 'string', 
        stepContent: 'string[]',
        questions: 'string[]?' // optional
      },
      'parallel_qa_discussion': {
        questionText: 'string',
        answerText: 'string',
        practicalAdvice: 'string'
      },
      'points_list_analysis': {
        pointsTitle: 'string',
        pointsList: 'string[]',
        summaryMessage: 'string'
      },
      'timeline_story_experience': {
        timePoint: 'string',
        scene: 'string',
        character: 'string',
        emotion: 'string',
        context: 'string'
      },
      'sequential_dependency': {
        pointNumber: 'number',
        stepTitle: 'string',
        stepContent: 'string[]',
        actionItems: 'string[]?'
      },
      'feature_parallel_info': {
        featureNumber: 'number',
        featureName: 'string',
        description: 'string',
        effect: 'string',
        bottomNote: 'string?' // optional
      },
      'feature_detail_tips': {
        explanation: 'string',
        tips: 'string[]'
      },
      'dual_enumeration': {
        title: 'string',
        items: '{number: string, name?: string, title?: string, description: string, imageSrc?: string}[] (厳密に2個のアイテムのみ)'
      },
      
      // 新テンプレート（優先度B - High）
      'category_content_learning': {
        categoryName: 'string',
        episodes: 'string[]',
        advice: 'string'
      },
      'step_guide_achievement': {
        pointNumber: 'string',
        title: 'string',
        content: 'string[]',
        actionItems: 'string[]?',
        illustrationImage: 'string?'
      },
      'method_systematic_info': {
        methodNumber: 'number',
        methodName: 'string',
        description: 'string',
        steps: 'string[]'
      },
      'practical_guide_conversation': {
        guideType: 'string',
        points: '{title: string, detail: string}[]',
        examples: '{phrase: string, usage: string}[]?' // optional
      },
      'company_data_list': {
        companyName: 'string',
        industry: 'string',
        salary: 'string',
        deadline: 'string',
        selectionFlow: 'string[]'
      },
      'usage_practical_steps': {
        stepNumber: 'number',
        title: 'string',
        content: 'string',
        practicalAdvice: 'string'
      },
      
      // 新しいサマリー系テンプレート
      'category_summary': {
        title: 'string',
        subtitle: 'string?',
        improvementExample: '{before: string, beforeIcon: string, after: string, afterIcon: string, tip: string}?',
        categorySummary: '{number: string, name: string, examples: string[]}[]'
      },
      'grid_summary': {
        title: 'string',
        subtitle: 'string?',
        grid: '{number: string, title: string, imageSrc?: string}[]',
        finalMessage: 'string?'
      },
      'tool_feature': {
        number: 'string',
        title: 'string',
        description: 'string',
        process: '{before: string, after: string}?',
        benefit: 'string',
        imageSrc: 'string?'
      },
      'efficiency_tips': {
        number: 'string',
        title: 'string',
        description: 'string',
        explanation: 'string?',
        benefit: 'string',
        imageSrc: 'string?'
      },
      
      // K117オーバーライド用テンプレート構造
      'ng_good_comparison': {
        ngSection: {
          title: 'string',
          examples: 'string[]'
        },
        goodSection: {
          title: 'string',
          examples: 'string[]'
        },
        bottomNote: 'string?'
      },
      'category_explanation': {
        categoryTitle: 'string',
        categoryDescription: 'string',
        examples: 'string[]',
        additionalTips: 'string?'
      },
      'vision_strength_matrix': {
        matrixTitle: 'string',
        rows: '{vision: string, strength: string, result: string}[]',
        conclusion: 'string'
      },
      
      // 複数アイテム表示テンプレート構造
      'multiple_items_display': {
        title: 'string',
        subtitle: 'string?',
        items: '{name?: string, title?: string, text?: string, description: string, imageSrc?: string}[] (2-5個の柔軟対応)'
      }
    }
    
    const structure = templateStructures[templateName as keyof typeof templateStructures]
    if (!structure) {
      console.warn(`⚠️ テンプレート構造が見つかりません: ${templateName}`)
      // フォールバック: 基本構造
      return {
        title: 'string',
        content: 'string',
        description: 'string?'
      }
    }
    
    return structure
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