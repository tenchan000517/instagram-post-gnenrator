import { GoogleGenerativeAI } from '@google/generative-ai'
import { StrategyType } from '../types/post'

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
      templateType?: 'table' | 'checklist' | 'labeled-list' | 'point-explanation' | 'hybrid' | 'standard'
      templateData?: any
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
- 長文は要点を3-5個に絞る
- 具体例や数字を含める
- 行動につながる実用的な情報を重視
- 感情に訴える表現を使う
- 1スライドあたり20-30文字程度の簡潔さ

【選択された戦略】
${strategy}

【利用可能な戦略】
- self-realization: 自己実現（憧れ・理想）
- loss-avoidance: 損失回避（失敗回避）
- investment: 投資（リターン期待）
- urgency: 緊急性（今すぐ行動）
- relationships: 人間関係（仲間・メンター）

【分析項目】
1. コンテンツの主要テーマと感情的トーン
2. ターゲットオーディエンス
3. 最適な戦略（選択された戦略が最適か、別の戦略を推奨するか）
4. 最適なページ数と構成
5. 各ページの内容配分
6. 効果的なハッシュタグ
7. エンゲージメントを高めるキャプション

【利用可能なテンプレートタイプ】
- table: 表形式での比較や一覧表示に適している（スケジュール、比較表、データ表示など）
- checklist: チェックリスト形式（やることリスト、確認事項、条件リストなど）
- labeled-list: ラベル付きリスト（企業リスト、締切リスト、ランキングなど）
- point-explanation: ポイントと説明の組み合わせ（手順説明、理由説明、メリット説明など）
- hybrid: 複数の要素を組み合わせた複合型
- standard: 通常のビジュアル重視のテンプレート

【テンプレート選択の指針】
- 数値データや比較が多い → table
- 確認事項や条件が多い → checklist
- 企業名や締切情報など → labeled-list
- 詳細な説明が必要 → point-explanation
- 複数の情報タイプ → hybrid
- シンプルなメッセージ → standard

【利用可能なハッシュタグカテゴリ】
- キャリア系: #キャリア #キャリアアップ #就職活動 #自己成長 #夢を叶える #成功 #社会人 #働き方 #働く女性 #キャリアデザイン #転職 #ポジティブ #やりがい #目標設定 #自己啓発 #大学生 #キャリア支援 #インスピレーション
- 就活系: #就活 #就職活動 #内定 #就活生 #就活中 #自己分析 #大学生 #学生生活 #企業研究 #面接 #ES提出 #選考 #ジョブハント #オープンキャンパス #エントリーシート #就業体験
- 自己成長系: #自己成長 #自己理解 #自己分析 #自己認識 #モチベーションアップ #自分らしさ #就活 #自己啓発 #スキルアップ #instagood

【FIND to DO について】
学生向けビジネスモデル。学生の「何もない」を「これがある」に変えるプロジェクトを提供。実践的なスキルアップ、一生続く仲間との出会い、企業との直接連携、自分の可能性発見を支援。

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
        "templateType": "table/checklist/labeled-list/point-explanation/hybrid/standard",
        "templateData": {
          "// table用": {"headers": ["列1", "列2"], "rows": [["データ1", "データ2"]]},
          "// checklist用": {"items": ["項目1", "項目2"], "checkedItems": [0]},
          "// labeled-list用": {"items": [{"label": "締切", "title": "企業A", "subtitle": "詳細"}]},
          "// point-explanation用": {"points": [{"title": "ポイント1", "explanation": "説明"}]},
          "// hybrid用": {"sections": [{"type": "checklist", "data": {}}]}
        }
      }
    ]
  },
  "hashtags": {
    "primary": ["主要ハッシュタグ"],
    "secondary": ["補助ハッシュタグ"],
    "trending": ["トレンドハッシュタグ"]
  },
  "caption": "完全なキャプション文"
}
`

    // リトライ機能付きでAPIを呼び出し
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Gemini API attempt ${attempt}...`)
        
        const result = await this.model.generateContent(prompt)
        const response = await result.response
        const text = response.text()
        
        console.log('Gemini API response received')
        
        // JSONレスポンスを解析
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0])
          console.log('Successfully parsed AI analysis')
          return parsed
        }
        
        throw new Error('Invalid JSON response from Gemini')
        
      } catch (error: any) {
        console.error(`Gemini API Error (attempt ${attempt}):`, error)
        
        // 503エラー（過負荷）の場合は待機してリトライ
        if (error.message?.includes('overloaded') || error.message?.includes('503')) {
          if (attempt < 3) {
            const waitTime = attempt * 3000 // 3秒、6秒と待機時間を増加
            console.log(`API overloaded, waiting ${waitTime}ms before retry...`)
            await new Promise(resolve => setTimeout(resolve, waitTime))
            continue
          }
        }
        
        // レート制限エラーの場合も同様に処理
        if (error.message?.includes('429') || error.message?.includes('rate')) {
          if (attempt < 3) {
            const waitTime = attempt * 5000 // 5秒、10秒と待機時間を増加
            console.log(`Rate limited, waiting ${waitTime}ms before retry...`)
            await new Promise(resolve => setTimeout(resolve, waitTime))
            continue
          }
        }
        
        // 最後の試行でも失敗した場合はフォールバック
        if (attempt === 3) {
          console.log('All API attempts failed, using fallback analysis')
          return this.getFallbackAnalysis(content, strategy)
        }
      }
    }
    
    // 到達しないはずだが、型安全性のため
    return this.getFallbackAnalysis(content, strategy)
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
    const analyzeTemplateType = (text: string): { type: 'table' | 'checklist' | 'labeled-list' | 'point-explanation' | 'hybrid' | 'standard', data?: any } => {
      // 表形式のキーワード
      if (text.includes('比較') || text.includes('スケジュール') || text.includes('時間') || text.includes('日程')) {
        return { type: 'table', data: { headers: ['項目', '詳細'], rows: [['サンプル', 'データ']] } }
      }
      // チェックリストのキーワード
      if (text.includes('チェック') || text.includes('確認') || text.includes('必要な') || text.includes('条件')) {
        return { type: 'checklist', data: { items: ['項目1', '項目2', '項目3'], checkedItems: [0] } }
      }
      // ラベル付きリストのキーワード
      if (text.includes('企業') || text.includes('締切') || text.includes('期限') || text.includes('募集')) {
        return { type: 'labeled-list', data: { items: [{ label: '締切', title: '企業名', subtitle: '詳細' }] } }
      }
      // ポイント説明のキーワード
      if (text.includes('理由') || text.includes('ポイント') || text.includes('メリット') || text.includes('手順')) {
        return { type: 'point-explanation', data: { points: [{ title: 'ポイント1', explanation: '説明' }] } }
      }
      return { type: 'standard' }
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
      hashtags: {
        primary: ['#FIND_to_DO', '#学生成長', '#就活'],
        secondary: ['#キャリア', '#スキルアップ', '#大学生'],
        trending: ['#自己成長', '#instagood']
      },
      caption: `✨ 学生の成長を応援！\n\n${content.substring(0, 100)}...\n\nFIND to DO で一緒に成長しませんか？\n\n#学生成長 #就活 #キャリア`
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