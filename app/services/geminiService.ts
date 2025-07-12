import { GoogleGenerativeAI } from '@google/generative-ai'
import { StrategyType } from '../types/post'
import { TemplateType, TemplateData, TemplateSelector } from '../components/templates'
import { hashtagService } from '../config/hashtags'

// Gemini AI クライアントの初期化
const getGeminiClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please set GEMINI_API_KEY in .env file.')
  }
  return new GoogleGenerativeAI(apiKey)
}

export interface AIAnalysisResult {
  contentAnalysis: {
    mainThemes: string[]
    emotionalTone: string
    targetAudience: string
    keyMessages: string[]
    urgencyLevel: number
    actionability: number
  }
  optimalStrategy: StrategyType
  pageStructure: {
    recommendedPages: number
    pageTypes: string[]
    contentDistribution: {
      pageNumber: number
      type: string
      content: string
      highlight: string
      visualSuggestion: string
      emphasis: string[]
      templateType: TemplateType
      templateData: TemplateData
    }[]
  }
  hashtags: {
    primary: string[]
    secondary: string[]
    trending: string[]
  }
  caption: string
}

export class GeminiService {
  private client: GoogleGenerativeAI
  private model: any

  constructor() {
    this.client = getGeminiClient()
    // より安定したモデルに変更
    this.model = this.client.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      }
    })
  }

  // コンテンツを分析して最適な投稿構造を提案
  async analyzeContentForOptimalPost(
    content: string, 
    strategy: StrategyType
  ): Promise<AIAnalysisResult> {
    const templateSelectionPrompt = TemplateSelector.generateSelectionPrompt()
    
    const prompt = `
あなたはInstagram投稿戦略の専門家です。以下のコンテンツを分析して、Instagram投稿に最適化された内容を抽出・要約し、投稿構造を提案してください。

【重要な処理ステップ】
1. コンテンツから有益性スコアの高い情報を抽出
2. Instagram投稿に適した形に要約・リライト
3. 読者にとって価値の高い内容のみを選別
4. 視覚的に魅力的な構成に最適化
5. 各ページに最適なテンプレートタイプを選択

【分析対象コンテンツ】
${content}

【コンテンツ最適化の指針】
- 絵文字は使用せず、テキストのみで表現
- 各テンプレートの文字数制限を厳守
- 具体例や数字を含める
- 行動につながる実用的な情報を重視
- 感情に訴える表現を使う
- デザイン崩れを防ぐため制限内に収める

【選択された戦略】
${strategy}

【利用可能な戦略】
- self-realization: 自己実現（憧れ・理想）
- loss-avoidance: 損失回避（失敗回避）
- investment: 投資（リターン期待）
- urgency: 緊急性（今すぐ行動）
- relationships: 人間関係（仲間・メンター）

${templateSelectionPrompt}

【利用可能なハッシュタグカテゴリ】
- キャリア系: #キャリア #キャリアアップ #就職活動 #自己成長 #夢を叶える #成功 #社会人 #働き方 #働く女性 #キャリアデザイン #転職 #ポジティブ #やりがい #目標設定 #自己啓発 #大学生 #キャリア支援 #インスピレーション
- 就活系: #就活 #就職活動 #内定 #就活生 #就活中 #自己分析 #大学生 #学生生活 #企業研究 #面接 #ES提出 #選考 #ジョブハント #オープンキャンパス #エントリーシート #就業体験
- 自己成長系: #自己成長 #自己理解 #自己分析 #自己認識 #モチベーションアップ #自分らしさ #就活 #自己啓発 #スキルアップ #instagood

【FIND to DO について】
学生向けビジネスモデル。学生の「何もない」を「これがある」に変えるプロジェクトを提供。実践的なスキルアップ、一生続く仲間との出会い、企業との直接連携、自分の可能性発見を支援。

【キャプション生成ルール】
- キャプションにはハッシュタグを絶対に含めない
- キャプションとハッシュタグは独立した要素として処理
- ハッシュタグはhashtags配列で別途生成

以下のJSON形式で回答してください：

{
  "contentAnalysis": {
    "mainThemes": ["テーマ1", "テーマ2", "テーマ3"],
    "emotionalTone": "感情的トーン",
    "targetAudience": "ターゲット層",
    "keyMessages": ["メッセージ1", "メッセージ2"],
    "urgencyLevel": 1-10の数値,
    "actionability": 1-10の数値
  },
  "optimalStrategy": "最適な戦略",
  "pageStructure": {
    "recommendedPages": 推奨ページ数,
    "pageTypes": ["page1タイプ", "page2タイプ"],
    "contentDistribution": [
      {
        "pageNumber": 1,
        "type": "intro",
        "content": "ページ1の内容",
        "highlight": "ハイライト文",
        "visualSuggestion": "ビジュアル提案",
        "emphasis": ["強調ポイント1", "強調ポイント2"],
        "templateType": "enumeration/explanation2/section-items/list/explanation2/simple3/simple3/simple3/table/simple5/simple5/simple6",
        "templateData": {
          "title": "テンプレートタイトル",
          "content": "メインコンテンツ",
          "subtitle": "サブタイトル",
          "items": ["項目1", "項目2"],
          "points": [{"title": "ポイント1", "description": "説明"}],
          "checklist": [{"text": "チェック項目", "checked": true}],
          "tableData": {"headers": ["列1", "列2"], "rows": [["データ1", "データ2"]]},
          "boxes": [{"title": "ボックス1", "content": "内容"}],
          "twoColumn": {"left": ["左項目1"], "right": ["右項目1"]}
        }
      }
    ]
  },
  "hashtags": {
    "primary": ["主要ハッシュタグ"],
    "secondary": ["補助ハッシュタグ"],
    "trending": ["トレンドハッシュタグ"]
  },
  "caption": "完全なキャプション文（ハッシュタグは絶対に含めない）"
}
`

    // 単一試行のみ（リトライなし、負荷軽減）
    try {
      console.log('Gemini API call...')
      
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      console.log('Gemini API response received')
      
      // JSONレスポンスを解析
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          // 制御文字を除去してからパース
          const cleanJson = jsonMatch[0]
            .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // 制御文字を除去
            .replace(/\n/g, '\\n') // 改行をエスケープ
            .replace(/\r/g, '\\r') // 復帰文字をエスケープ
            .replace(/\t/g, '\\t') // タブをエスケープ
          
          const parsed = JSON.parse(cleanJson)
          console.log('Successfully parsed AI analysis')
          
          // 🎯 生成された生のデータをコンソールに出力
          console.log('='.repeat(60))
          console.log('🤖 AI生成成功 - 生のデータ')
          console.log('='.repeat(60))
          console.log('📝 生のレスポンステキスト:')
          console.log(text)
          console.log('-'.repeat(40))
          console.log('🗂️ パース済みデータ:')
          console.log(JSON.stringify(parsed, null, 2))
          console.log('='.repeat(60))
          
          return parsed
        } catch (parseError) {
          console.error('JSON parse error:', parseError)
          console.error('Raw response:', jsonMatch[0])
          throw new Error('Failed to parse JSON response from Gemini')
        }
      }
      
      throw new Error('Invalid JSON response from Gemini')
      
    } catch (error: any) {
      console.error('Gemini API Error:', error)
      throw error // エラーをそのまま投げる（PostGeneratorでハンドリング）
    }
  }

  // コンテンツを要約・最適化する関数
  private optimizeContentForInstagram(content: string): string[] {
    const sentences = content.split(/[。！？]/).filter(s => s.trim().length > 0)
    
    // 重要度の高い文章を選別（キーワードベース）
    const importantKeywords = [
      '方法', '効果', '結果', '成功', '失敗', '注意', '重要', '秘訣', 'コツ',
      '実践', '経験', '学び', '気づき', '発見', '解決', '改善', '向上',
      '具体的', '実際', '例えば', 'ポイント', '理由', '原因'
    ]
    
    // 文章を重要度でスコアリング
    const scoredSentences = sentences.map(sentence => {
      let score = 0
      
      // キーワードの存在
      importantKeywords.forEach(keyword => {
        if (sentence.includes(keyword)) score += 2
      })
      
      // 数字の存在（具体性）
      if (/\d+/.test(sentence)) score += 1
      
      // 疑問符・感嘆符（エンゲージメント）
      if (/[！？]/.test(sentence)) score += 1
      
      // 文章の長さ（適度な長さを好む）
      if (sentence.length >= 15 && sentence.length <= 40) score += 1
      
      return { sentence, score }
    })
    
    // スコア順にソートして上位を選択
    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.min(6, Math.max(4, Math.ceil(sentences.length / 3))))
      .map(item => item.sentence)
    
    return topSentences
  }

  // フォールバック分析結果
  private getFallbackAnalysis(content: string, strategy: StrategyType): AIAnalysisResult {
    const optimizedContent = this.optimizeContentForInstagram(content)
    const recommendedPages = optimizedContent.length
    
    // コンテンツを分析してテンプレートタイプを決定
    const analyzeTemplateType = (text: string): { type: TemplateType, data: TemplateData } => {
      // TemplateSelector を使用して最適なテンプレートを選択
      const templateType = TemplateSelector.selectOptimalTemplate(text)
      
      // テンプレートタイプに応じたサンプルデータを生成
      const generateSampleData = (type: TemplateType): TemplateData => {
        switch (type) {
          case 'table':
            return {
              title: text.substring(0, 25),
              tableData: { headers: ['項目', '詳細'], rows: [['サンプル', 'データ']] }
            }
          case 'simple5':
          case 'simple5':
          case 'simple6':
            return {
              title: text.substring(0, 25),
              checklist: [
                { text: '項目1', checked: true },
                { text: '項目2', checked: false }
              ],
              points: [
                { title: 'ポイント1', description: '説明1' },
                { title: 'ポイント2', description: '説明2' }
              ]
            }
          case 'section-items':
            return {
              title: text.substring(0, 30),
              boxes: [
                { title: '問題', content: '課題の説明' },
                { title: '解決策', content: '解決方法' },
                { title: '結果', content: '成果' }
              ]
            }
          case 'enumeration':
          case 'list':
            return {
              title: text.substring(0, 25),
              items: ['項目1', '項目2', '項目3']
            }
          case 'simple3':
            return {
              title: text.substring(0, 25),
              boxes: [
                { title: 'ボックス1', content: '内容1' },
                { title: 'ボックス2', content: '内容2' }
              ]
            }
          case 'simple3':
            return {
              title: text.substring(0, 25),
              twoColumn: {
                left: ['左項目1', '左項目2'],
                right: ['右項目1', '右項目2']
              },
              content: '重要ポイント'
            }
          default:
            return {
              title: text.substring(0, 25),
              content: text.substring(0, 120)
            }
        }
      }
      
      return { type: templateType, data: generateSampleData(templateType) }
    }
    
    return {
      contentAnalysis: {
        mainThemes: ['学生成長', 'キャリア支援', 'スキルアップ'],
        emotionalTone: '前向き・励まし',
        targetAudience: '大学生・就活生',
        keyMessages: ['実践的成長', '仲間との出会い', '将来への投資'],
        urgencyLevel: strategy === 'urgency' ? 8 : 5,
        actionability: 7
      },
      optimalStrategy: strategy,
      pageStructure: {
        recommendedPages,
        pageTypes: ['intro', 'problem', 'solution', 'result', 'cta'],
        contentDistribution: optimizedContent.map((sentence, index) => {
          const templateAnalysis = analyzeTemplateType(sentence)
          return {
            pageNumber: index + 1,
            type: index === 0 ? 'intro' : index === optimizedContent.length - 1 ? 'cta' : 'content',
            content: sentence,
            highlight: sentence.length > 30 ? sentence.substring(0, 30) + '...' : sentence,
            visualSuggestion: '青基調のデザイン、大きな文字',
            emphasis: ['重要ポイント'],
            templateType: templateAnalysis.type,
            templateData: templateAnalysis.data
          }
        })
      },
      hashtags: (() => {
        const properHashtags = hashtagService.selectHashtags(content)
        return {
          primary: properHashtags.large,
          secondary: properHashtags.medium,
          trending: properHashtags.small,
          large: properHashtags.large,
          medium: properHashtags.medium,
          small: properHashtags.small,
          all: properHashtags.all
        }
      })(),
      caption: `✨ 学生の成長を応援！\n\n${content.substring(0, 100)}...\n\nFIND to DO で一緒に成長しませんか？`
    }
  }

  // ハッシュタグを最適化
  async optimizeHashtags(content: string, strategy: StrategyType): Promise<string[]> {
    const prompt = `
以下のコンテンツと戦略に最適なInstagramハッシュタグを15-20個選択してください。

コンテンツ: ${content}
戦略: ${strategy}

利用可能なハッシュタグ:
キャリア系: #キャリア #キャリアアップ #就職活動 #自己成長 #夢を叶える #成功 #社会人 #働き方 #働く女性 #キャリアデザイン #転職 #ポジティブ #やりがい #目標設定 #自己啓発 #大学生 #キャリア支援 #インスピレーション
就活系: #就活 #就職活動 #内定 #就活生 #就活中 #自己分析 #大学生 #学生生活 #企業研究 #面接 #ES提出 #選考 #ジョブハント #オープンキャンパス #エントリーシート #就業体験
自己成長系: #自己成長 #自己理解 #自己分析 #自己認識 #モチベーションアップ #自分らしさ #就活 #自己啓発 #スキルアップ #instagood

カンマ区切りで回答してください。
`

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      return text.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.startsWith('#'))
    } catch (error) {
      console.error('Hashtag optimization error:', error)
      return ['#就活', '#学生成長', '#キャリア', '#スキルアップ', '#自己成長']
    }
  }
}

export const geminiService = new GeminiService()