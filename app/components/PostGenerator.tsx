'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Download, RefreshCw, Instagram, Share2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { StrategyType, PostData } from '../types/post'
import { 
  PostSlide, 
  Illustrations, 
  FindToDoPostTemplate, 
  PerfectionistToCompletionistPost,
  TableTemplate,
  ChecklistTemplate,
  LabeledListTemplate,
  PointExplanationTemplate,
  HybridTemplate
} from './InstagramPostTemplate'
import CarouselPostGenerator from './CarouselPostGenerator'
import Viewport from './Viewport'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { geminiService, AIAnalysisResult } from '../services/geminiService'

interface PostGeneratorProps {
  content: string
  strategy: StrategyType
  onPostGenerated: (data: PostData) => void
  onBack: () => void
  onReset: () => void
}

export default function PostGenerator({ 
  content, 
  strategy, 
  onPostGenerated, 
  onBack, 
  onReset 
}: PostGeneratorProps) {
  const [generating, setGenerating] = useState(true)
  const [postData, setPostData] = useState<PostData | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null)
  const [previewType, setPreviewType] = useState<'reel' | 'story' | 'feed' | 'carousel'>('carousel')
  const [aiOptimized, setAiOptimized] = useState(false)
  const [generatingStatus, setGeneratingStatus] = useState('AI分析中...')
  const [currentCarouselPage, setCurrentCarouselPage] = useState(0)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    generatePost()
  }, [content, strategy])

  const generatePost = async () => {
    setGenerating(true)
    setAiOptimized(false)
    setGeneratingStatus('コンテンツを分析中...')
    
    // レイアウトテスト用モック
    setGeneratingStatus('モック分析中...')
    await new Promise(resolve => setTimeout(resolve, 500)) // 0.5秒待機
    
    // フォールバック: 従来の方法で生成
    const generatedPost = createPostFromStrategy(content, strategy)
    setPostData(generatedPost)
    onPostGenerated(generatedPost)
    setGeneratingStatus('生成完了!')
    
    setGenerating(false)
    
    /* 本番用AI呼び出し（コメントアウト）
    try {
      setGeneratingStatus('AI分析でコンテンツを最適化中...')
      // Gemini AIを使用してコンテンツを分析
      const analysis = await geminiService.analyzeContentForOptimalPost(content, strategy)
      setAiAnalysis(analysis)
      
      setGeneratingStatus('投稿構造を生成中...')
      // AI分析結果を基に投稿データを生成
      const generatedPost = createPostFromAIAnalysis(content, analysis)
      setPostData(generatedPost)
      onPostGenerated(generatedPost)
      setAiOptimized(true)
      setGeneratingStatus('生成完了!')
    } catch (error: any) {
      console.error('AI analysis failed, using fallback:', error)
      
      // エラーの種類に応じてメッセージを変更
      if (error.message?.includes('overloaded') || error.message?.includes('503')) {
        setGeneratingStatus('AI分析が混雑中です。従来の方法で生成中...')
      } else if (error.message?.includes('429') || error.message?.includes('rate')) {
        setGeneratingStatus('API制限に達しました。従来の方法で生成中...')
      } else {
        setGeneratingStatus('フォールバック分析を実行中...')
      }
      
      // フォールバック: 従来の方法で生成
      const generatedPost = createPostFromStrategy(content, strategy)
      setPostData(generatedPost)
      onPostGenerated(generatedPost)
      setGeneratingStatus('生成完了!')
    }
    
    setGenerating(false)
    */
  }

  // コンテンツ分析してキーワードを抽出
  const analyzeContent = (content: string): Record<string, number> => {
    const keywords = {
      problem: ['問題', '課題', '困る', '悩み', '難しい', '苦手', 'できない', '失敗'],
      solution: ['解決', '方法', '対策', 'やり方', 'コツ', '秘訣', 'ポイント', '改善'],
      result: ['成功', '結果', '効果', '変化', '成長', '達成', '実現', '向上'],
      warning: ['注意', '危険', '避ける', '失敗', 'ダメ', '間違い', '後悔', 'リスク'],
      benefit: ['メリット', '利益', '価値', '得', '良い', '素晴らしい', 'プラス', '恩恵'],
      action: ['行動', '実践', '始める', 'やる', '取り組む', 'チャレンジ', '挑戦', 'スタート'],
      urgency: ['今すぐ', '急ぎ', '時間', '期限', '遅れる', '間に合わない', 'タイムリミット'],
      community: ['仲間', 'チーム', '一緒', 'みんな', 'コミュニティ', '人脈', '友達']
    } as const

    const contentLower = content.toLowerCase()
    const scores: Record<string, number> = {}
    
    Object.entries(keywords).forEach(([category, keywordList]) => {
      scores[category] = keywordList.reduce((score: number, keyword: string) => {
        return score + (contentLower.split(keyword).length - 1)
      }, 0)
    })

    return scores
  }

  // 最適なテンプレートを選択
  const selectOptimalTemplate = (content: string, pageType: string, pageNumber: number, totalPages: number): 'intro' | 'problem' | 'solution' | 'result' | 'cta' | 'warning' | 'problems' | 'consequences' | 'solutions' | 'opportunity' | 'benefits' | 'methods' | 'timeline' | 'deadline' | 'risks' | 'actions' | 'connection' | 'community' | 'growth' | 'content' | 'urgency' => {
    const analysis = analyzeContent(content)
    const maxScore = Math.max(...Object.values(analysis))
    const dominantTheme = Object.keys(analysis).find(key => analysis[key] === maxScore) || 'content'

    // ページ位置による調整
    if (pageNumber === 1) return 'intro'
    if (pageNumber === totalPages) return 'cta'
    
    // コンテンツ分析による最適化
    if (analysis.problem > 2) return 'problem'
    if (analysis.solution > 2) return 'solution'
    if (analysis.result > 1) return 'result'
    if (analysis.warning > 1) return 'warning'
    if (analysis.benefit > 1) return 'benefits'
    if (analysis.urgency > 1) return 'urgency'
    if (analysis.community > 1) return 'community'

    // デフォルトの型チェック付きの戻り値
    const validTypes = ['intro', 'problem', 'solution', 'result', 'cta', 'warning', 'problems', 'consequences', 'solutions', 'opportunity', 'benefits', 'methods', 'timeline', 'deadline', 'risks', 'actions', 'connection', 'community', 'growth', 'content', 'urgency'] as const
    
    if (validTypes.includes(pageType as any)) {
      return pageType as any
    }
    
    return 'content'
  }

  // 重要部分を抽出してハイライト
  const extractHighlights = (content: string, templateType: string) => {
    const sentences = content.split(/[。！？]/).filter(s => s.trim().length > 0)
    
    const highlightPatterns = {
      intro: ['初めて', '始まり', 'スタート', '最初'],
      problem: ['問題', '課題', '困る', '悩み', '難しい'],
      solution: ['解決', '方法', '対策', 'やり方', 'コツ'],
      result: ['成功', '結果', '効果', '変化', '成長'],
      warning: ['注意', '危険', '避ける', '失敗', 'ダメ'],
      benefits: ['メリット', '利益', '価値', '得', '良い'],
      urgency: ['今すぐ', '急ぎ', '時間', '期限'],
      community: ['仲間', 'チーム', '一緒', 'みんな'],
      cta: ['始めよう', 'やってみる', 'チャレンジ', '行動']
    } as const

    const patterns = highlightPatterns[templateType as keyof typeof highlightPatterns] || []
    const highlights = sentences.filter((sentence: string) => 
      patterns.some((pattern: string) => sentence.includes(pattern))
    )

    return highlights.length > 0 ? highlights[0] : sentences[0]
  }

  // 投稿内容を複数ページに分割する関数（改良版）
  const splitContentIntoPages = (content: string, strategy: StrategyType) => {
    const sentences = content.split(/[。！？]/).filter(s => s.trim().length > 0)
    const pages = []
    
    // 戦略別のページ構成
    const strategyConfig = {
      'self-realization': {
        pageTypes: ['intro', 'problem', 'solution', 'result', 'cta'],
        minPages: 4,
        maxPages: 6
      },
      'loss-avoidance': {
        pageTypes: ['warning', 'problems', 'consequences', 'solutions', 'cta'],
        minPages: 4,
        maxPages: 7
      },
      'investment': {
        pageTypes: ['opportunity', 'benefits', 'methods', 'timeline', 'cta'],
        minPages: 4,
        maxPages: 6
      },
      'urgency': {
        pageTypes: ['deadline', 'risks', 'actions', 'timeline', 'cta'],
        minPages: 4,
        maxPages: 5
      },
      'relationships': {
        pageTypes: ['connection', 'benefits', 'community', 'growth', 'cta'],
        minPages: 4,
        maxPages: 6
      }
    }

    const config = strategyConfig[strategy]
    const targetPages = Math.min(config.maxPages, Math.max(config.minPages, Math.ceil(sentences.length / 2)))
    
    // センテンスをページに分割
    const sentencesPerPage = Math.ceil(sentences.length / targetPages)
    
    for (let i = 0; i < targetPages; i++) {
      const startIndex = i * sentencesPerPage
      const endIndex = Math.min(startIndex + sentencesPerPage, sentences.length)
      const pageContent = sentences.slice(startIndex, endIndex).join('。') + '。'
      const baseType = config.pageTypes[i] || 'content'
      
      // 最適なテンプレートを選択
      const optimalType = selectOptimalTemplate(pageContent, baseType, i + 1, targetPages)
      
      // 重要部分を抽出
      const highlight = extractHighlights(pageContent, optimalType)
      
      pages.push({
        pageNumber: i + 1,
        totalPages: targetPages,
        content: pageContent,
        type: optimalType,
        highlight: highlight,
        template: optimalType
      })
    }

    return pages
  }

  // AI分析結果から投稿データを作成
  const createPostFromAIAnalysis = (content: string, analysis: AIAnalysisResult): PostData => {
    const allHashtags = [
      ...analysis.hashtags.primary,
      ...analysis.hashtags.secondary,
      ...analysis.hashtags.trending
    ]

    // AI分析によるページ構造を使用
    const aiPages = analysis.pageStructure.contentDistribution.map(page => ({
      pageNumber: page.pageNumber,
      totalPages: analysis.pageStructure.recommendedPages,
      content: page.content,
      type: page.type as any, // 型アサーション（必要に応じて型を調整）
      highlight: page.highlight,
      template: page.type
    }))

    return {
      type: 'carousel',
      strategy: analysis.optimalStrategy,
      title: analysis.contentAnalysis.mainThemes[0] || 'FIND to DO で成長しよう',
      content: content,
      pages: aiPages,
      hashtags: allHashtags,
      caption: analysis.caption,
      cta: '詳しくはプロフィールから'
    }
  }

  // 効果的なハッシュタグシステム
  const getEffectiveHashtags = (strategy: StrategyType, content: string) => {
    const careerHashtags = [
      '#キャリア', '#キャリアアップ', '#就職活動', '#自己成長', '#夢を叶える', 
      '#成功', '#社会人', '#働き方', '#働く女性', '#キャリアデザイン', 
      '#転職', '#ポジティブ', '#やりがい', '#目標設定', '#自己啓発', 
      '#大学生', '#キャリア支援', '#インスピレーション'
    ]
    
    const jobHuntingHashtags = [
      '#就活', '#就職活動', '#内定', '#就活生', '#就活中', '#自己分析', 
      '#大学生', '#学生生活', '#企業研究', '#面接', '#ES提出', '#選考', 
      '#ジョブハント', '#オープンキャンパス', '#エントリーシート', '#就業体験'
    ]
    
    const selfGrowthHashtags = [
      '#自己成長', '#自己理解', '#自己分析', '#自己認識', '#モチベーションアップ', 
      '#自分らしさ', '#就活', '#自己啓発', '#スキルアップ', '#instagood'
    ]

    const strategySpecificHashtags = {
      'self-realization': [...careerHashtags.slice(0, 8), ...selfGrowthHashtags.slice(0, 6), '#夢を叶える', '#成功', '#自己実現'],
      'loss-avoidance': [...jobHuntingHashtags.slice(0, 10), '#失敗回避', '#注意点', '#対策'],
      'investment': [...careerHashtags.slice(0, 6), '#自己投資', '#将来性', '#ROI', '#スキルアップ'],
      'urgency': [...jobHuntingHashtags.slice(0, 8), '#緊急性', '#ラストチャンス', '#今すぐ'],
      'relationships': [...selfGrowthHashtags.slice(0, 6), '#仲間募集', '#コミュニティ', '#一緒に成長']
    }

    return strategySpecificHashtags[strategy] || careerHashtags.slice(0, 15)
  }

  const createPostFromStrategy = (content: string, strategy: StrategyType): PostData => {
    
    const strategyTemplates = {
      'self-realization': {
        title: '夢を実現した学生の体験談',
        reelScript: {
          timeline: [
            { startTime: 0, endTime: 3, text: '何もない大学生だった私が', action: '問題提起', visual: '暗い背景' },
            { startTime: 3, endTime: 6, text: '3ヶ月後に人生が変わった', action: '結果提示', visual: '明るい変化' },
            { startTime: 6, endTime: 12, text: '実際にやったこと3つ', action: '方法解説', visual: 'ステップ表示' },
            { startTime: 12, endTime: 18, text: 'あなたも変われる', action: 'CTA', visual: '希望のメッセージ' }
          ],
          totalDuration: 18,
          keyPoints: ['具体的な変化', '実践的な方法', '希望の提示']
        },
        hashtags: getEffectiveHashtags('self-realization', content),
        cta: 'あなたも一緒に成長しませんか？'
      },
      'loss-avoidance': {
        title: '就活で後悔しないために',
        reelScript: {
          timeline: [
            { startTime: 0, endTime: 3, text: '就活で後悔する学生の共通点', action: '問題提起', visual: '警告色' },
            { startTime: 3, endTime: 15, text: '5つの失敗パターン', action: '問題列挙', visual: 'カウントダウン' },
            { startTime: 15, endTime: 18, text: '今すぐ対策しよう', action: 'CTA', visual: '行動促進' }
          ],
          totalDuration: 18,
          keyPoints: ['具体的な失敗例', '回避方法', '緊急性']
        },
        hashtags: getEffectiveHashtags('loss-avoidance', content),
        cta: '手遅れになる前に行動を！'
      },
      'investment': {
        title: '今の投資が将来を決める',
        reelScript: {
          timeline: [
            { startTime: 0, endTime: 3, text: '今やれば3年後に10倍返ってくること', action: '投資提案', visual: '数字強調' },
            { startTime: 3, endTime: 15, text: '5つの投資分野', action: '具体例', visual: 'リスト表示' },
            { startTime: 15, endTime: 18, text: '今日から始めよう', action: 'CTA', visual: '行動促進' }
          ],
          totalDuration: 18,
          keyPoints: ['投資対効果', '具体的分野', '即行動']
        },
        hashtags: getEffectiveHashtags('investment', content),
        cta: '投資は今がチャンス！'
      },
      'urgency': {
        title: '今しかできない挑戦',
        reelScript: {
          timeline: [
            { startTime: 0, endTime: 3, text: '就活まで残り1年でやるべきこと', action: '緊急性提示', visual: '時計・カレンダー' },
            { startTime: 3, endTime: 15, text: 'タイムライン別行動', action: '計画提示', visual: 'スケジュール' },
            { startTime: 15, endTime: 18, text: '今日から始めよう', action: 'CTA', visual: '行動促進' }
          ],
          totalDuration: 18,
          keyPoints: ['時間の制約', '段階的行動', '即開始']
        },
        hashtags: getEffectiveHashtags('urgency', content),
        cta: '時間は待ってくれません！'
      },
      'relationships': {
        title: '仲間と一緒に成長しよう',
        reelScript: {
          timeline: [
            { startTime: 0, endTime: 3, text: '一生続く仲間の作り方', action: '関係性重視', visual: '人とのつながり' },
            { startTime: 3, endTime: 15, text: '仲間がもたらす5つの価値', action: '価値提示', visual: 'チームワーク' },
            { startTime: 15, endTime: 18, text: '一緒に成長しよう', action: 'CTA', visual: 'コミュニティ' }
          ],
          totalDuration: 18,
          keyPoints: ['人間関係', '相互成長', 'コミュニティ']
        },
        hashtags: getEffectiveHashtags('relationships', content),
        cta: '素敵な仲間を見つけよう！'
      }
    }

    const template = strategyTemplates[strategy]
    const pages = splitContentIntoPages(content, strategy)
    
    return {
      type: 'carousel',
      strategy,
      title: template.title,
      content: content,
      pages: pages,
      reelScript: template.reelScript,
      hashtags: template.hashtags,
      caption: generateCaption(content, strategy),
      cta: template.cta
    }
  }

  const generateCaption = (content: string, strategy: StrategyType): string => {
    const intro = strategy === 'self-realization' ? '✨ 夢を叶えた学生の体験談をシェア！' :
                  strategy === 'loss-avoidance' ? '⚠️ 就活で後悔しないために知っておくべきこと' :
                  strategy === 'investment' ? '💰 今の行動が将来の価値を決める' :
                  strategy === 'urgency' ? '⏰ 今しかできない重要なアクション' :
                  '🤝 仲間と一緒だからできること'

    return `${intro}

${content.substring(0, 100)}...

FIND to DO では、学生の「何もない」を「これがある」に変えるプロジェクトを多数用意しています。

🎯 実践的なスキルアップ
🤝 一生続く仲間との出会い
💼 企業との直接連携
✨ 自分の可能性発見

あなたも一緒に成長しませんか？

#学生起業 #就活 #大学生 #スキルアップ #ガクチカ`
  }

  const downloadImage = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current)
      
      const link = document.createElement('a')
      if (previewType === 'carousel' && postData?.pages) {
        link.download = `find-to-do-${strategy}-page-${currentCarouselPage + 1}-${Date.now()}.png`
      } else {
        link.download = `find-to-do-${strategy}-${Date.now()}.png`
      }
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const downloadPDF = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current)
      const imgData = canvas.toDataURL('image/png')
      
      const pdf = new jsPDF()
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`find-to-do-${strategy}-${Date.now()}.pdf`)
    }
  }

  if (generating) {
    return (
      <div className="post-preview text-center py-12">
        <div className="animate-pulse">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-16 h-16 text-find-blue mx-auto animate-spin" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          🤖 Gemini AI で最適化中...
        </h2>
        <p className="text-gray-600 mb-2">
          {generatingStatus}
        </p>
        <p className="text-sm text-gray-500">
          コンテンツから有益性の高い情報を抽出し<br />
          Instagram投稿に最適化しています
        </p>
        <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-blue-600">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    )
  }

  if (!postData) return null

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* ヘッダー */}
      <div className="post-preview">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-800">
              投稿生成完了
            </h2>
            {aiOptimized && (
              <div className="flex items-center space-x-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI最適化済み</span>
              </div>
            )}
          </div>
          <div className="flex space-x-3">
            <button onClick={onBack} className="btn-secondary flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>戻る</span>
            </button>
            <button onClick={onReset} className="btn-secondary flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>最初から</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {(['reel', 'story', 'feed', 'carousel'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setPreviewType(type)}
              className={`p-3 rounded-lg border transition-all ${
                previewType === type
                  ? 'border-find-blue bg-find-blue/10 text-find-blue'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {type === 'reel' && 'リール'}
              {type === 'story' && 'ストーリー'}
              {type === 'feed' && 'フィード'}
              {type === 'carousel' && 'カルーセル'}
            </button>
          ))}
        </div>
      </div>

      {/* プレビューエリア（独立） */}
      <div className="post-preview" style={{ 
        border: '5px solid magenta',
        width: '900px',
        height: '900px'
      }}>
        {/* プレビューエリア全体コンテナ - マゼンタライン */}
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          プレビュー
        </h3>
        
        <Viewport 
          width={850} 
          height={800}
        >
          <div ref={previewRef} style={{ 
            width: '95%', 
            height: '95%',
            border: '4px solid red',
            margin: 'auto'
          }}>
            {previewType === 'reel' && strategy === 'self-realization' && (
              <PostSlide
                    title={postData.title}
                    highlight="実際にできるようになったこと"
                    illustration={Illustrations.success}
                    content={
                      <div>
                        <p className="mb-4">3ヶ月前は何もできなかった私が</p>
                        <p className="text-4xl font-bold text-orange-600">今では企業案件をこなせるように！</p>
                      </div>
                    }
                    subText="あなたも必ず変われる✨"
                ctaButton={{
                  text: "詳しくはプロフィールから"
                }}
              />
            )}
            {previewType === 'reel' && strategy === 'loss-avoidance' && (
              <PostSlide
                title={postData.title}
                highlight="当てはまったら要注意⚠️"
                    content={
                      <div className="space-y-4 text-left">
                        {postData.reelScript?.timeline.map((item, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <p className="flex-1 text-2xl">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    }
                ctaButton={{
                  text: "今すぐ対策を始める"
                }}
              />
            )}
            {previewType === 'reel' && strategy === 'investment' && (
              <PostSlide
                title={postData.title}
                illustration={Illustrations.growth}
                    content={
                      <div>
                        <p className="text-3xl mb-6">学生時代の投資が</p>
                        <p className="text-5xl font-bold text-orange-600 mb-6">年収100万円の差に！</p>
                        <p className="text-2xl text-gray-600">今始めれば3年後に大きなリターン</p>
                      </div>
                    }
                ctaButton={{
                  text: "投資を始める"
                }}
              />
            )}
            {previewType === 'reel' && strategy === 'urgency' && (
              <PostSlide
                title={postData.title}
                highlight="今やらないと間に合わない！"
                    illustration={<div className="text-8xl">⏰</div>}
                    content={
                      <div className="space-y-4">
                        <p className="text-3xl">就活まで<span className="text-6xl font-bold text-orange-600">残り365日</span></p>
                        <p className="text-2xl text-gray-600">今始めないと手遅れになる理由</p>
                      </div>
                    }
                ctaButton={{
                  text: "今すぐ行動する"
                }}
              />
            )}
            {previewType === 'reel' && strategy === 'relationships' && (
              <PostSlide
                title={postData.title}
                illustration={Illustrations.teamWork}
                    content={
                      <div>
                        <p className="text-3xl mb-6">一人じゃできないことも</p>
                        <p className="text-4xl font-bold text-orange-600 mb-6">仲間となら実現できる</p>
                        <p className="text-2xl text-gray-600">切磋琢磨できる環境で成長</p>
                      </div>
                    }
                subText="一生続く仲間を見つけよう🤝"
              />
            )}
            
            {previewType === 'feed' && (
              <PostSlide
                  title="FIND to DO"
                  highlight={postData.title}
                  illustration={<Instagram className="w-32 h-32 text-find-blue" />}
                  content={
                    <div>
                      <p className="text-2xl mb-4">学生の「何もない」を</p>
                      <p className="text-3xl font-bold text-orange-600">「これがある」に変える</p>
                    </div>
                  }
                  subText="実践的な成長支援プラットフォーム"
                  ctaButton={{
                    text: "詳しくはプロフィールから"
                  }}
              />
            )}
            
            {previewType === 'story' && (
              <PostSlide
                  title="FIND to DO"
                  highlight={postData.title}
                  backgroundColor="#667eea"
                  textColor="white"
                  content={
                    <div className="text-white">
                      <p className="text-3xl mb-4">学生の成長を</p>
                      <p className="text-4xl font-bold">全力サポート！</p>
                    </div>
                  }
                  ctaButton={{
                    text: "もっと詳しく"
                  }}
              />
            )}
            
            {previewType === 'carousel' && postData.pages && postData.pages.length > 0 && (
              <PostSlide
                title={postData.title}
                number={postData.pages[currentCarouselPage].pageNumber}
                highlight={postData.pages[currentCarouselPage].highlight || (currentCarouselPage === 0 ? "重要なポイントをご紹介" : undefined)}
                content={
                  <div>
                    <p className="text-3xl leading-relaxed" style={{ color: '#1e40af' }}>
                      {postData.pages[currentCarouselPage].content}
                    </p>
                    {currentCarouselPage === postData.pages.length - 1 && (
                      <div className="mt-8">
                        <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
                          <p className="text-2xl font-bold text-blue-700">
                            FIND to DO で一緒に成長しませんか？
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                }
                {...(currentCarouselPage === postData.pages.length - 1 && { 
                  ctaButton: { text: "詳しくはプロフィールから" }
                })}
              />
            )}
          </div>
        </Viewport>
        
        {/* カルーセルナビゲーション（ビューポート外） */}
        {previewType === 'carousel' && postData?.pages && postData.pages.length > 1 && (
          <div className="flex justify-between items-center mt-4 px-4">
            <button
              onClick={() => setCurrentCarouselPage(prev => Math.max(0, prev - 1))}
              disabled={currentCarouselPage === 0}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2">
              {postData.pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarouselPage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentCarouselPage ? 'bg-gray-800' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setCurrentCarouselPage(prev => Math.min(postData.pages!.length - 1, prev + 1))}
              disabled={currentCarouselPage === postData.pages.length - 1}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
        
        {/* 非表示の個別ページ（ダウンロード用） */}
        {previewType === 'carousel' && postData.pages && postData.pages.length > 0 && (
          <div className="hidden">
            {postData.pages.map((page, index) => {
              const totalPages = postData.pages?.length || 0
              return (
                <div key={`download-page-${index}`} data-page={index} className="inline-block">
                  <div style={{ width: '1080px', height: '1080px' }}>
                    <PostSlide
                      title={postData.title}
                      number={page.pageNumber}
                      highlight={page.highlight || (index === 0 ? "重要なポイントをご紹介" : undefined)}
                      content={
                        <div>
                          <p className="text-3xl leading-relaxed" style={{ color: '#1e40af' }}>
                            {page.content}
                          </p>
                          {index === totalPages - 1 && (
                            <div className="mt-8">
                              <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
                                <p className="text-2xl font-bold text-blue-700">
                                  FIND to DO で一緒に成長しませんか？
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      }
                      {...(index === totalPages - 1 && { 
                        ctaButton: { text: "詳しくはプロフィールから" }
                      })}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* AI分析結果 */}
      {aiAnalysis && aiOptimized && (
        <div className="post-preview">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
            AI分析結果
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">コンテンツ分析</h4>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
                <p><span className="font-medium">主要テーマ:</span> {aiAnalysis.contentAnalysis.mainThemes.join(', ')}</p>
                <p><span className="font-medium">感情的トーン:</span> {aiAnalysis.contentAnalysis.emotionalTone}</p>
                <p><span className="font-medium">ターゲット:</span> {aiAnalysis.contentAnalysis.targetAudience}</p>
                <p><span className="font-medium">緊急性レベル:</span> {aiAnalysis.contentAnalysis.urgencyLevel}/10</p>
                <p><span className="font-medium">行動促進度:</span> {aiAnalysis.contentAnalysis.actionability}/10</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">最適化提案</h4>
              <div className="bg-green-50 p-4 rounded-lg space-y-2 text-sm">
                <p><span className="font-medium">推奨戦略:</span> {aiAnalysis.optimalStrategy}</p>
                <p><span className="font-medium">推奨ページ数:</span> {aiAnalysis.pageStructure.recommendedPages}ページ</p>
                <p><span className="font-medium">キーメッセージ:</span></p>
                <ul className="list-disc list-inside ml-2">
                  {aiAnalysis.contentAnalysis.keyMessages.map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 投稿詳細エリア */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ページ情報 */}
        {previewType === 'carousel' && postData.pages && postData.pages.length > 0 && (
          <div className="post-preview">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                ページ構成（{postData.pages.length}ページ）
              </h3>
              <div className="space-y-3">
                {postData.pages.map((page, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="text-blue-600 font-semibold min-w-0">
                      {page.pageNumber}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-blue-800">{page.type}</p>
                        {page.template && page.template !== page.type && (
                          <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded">
                            最適化: {page.template}
                          </span>
                        )}
                      </div>
                      {page.highlight && (
                        <p className="text-sm font-medium text-blue-600 mb-1">💡 {page.highlight}</p>
                      )}
                      <p className="text-sm text-gray-600 line-clamp-2">{page.content.substring(0, 100)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        )}

        {/* リール台本 */}
        {previewType === 'reel' && postData.reelScript && (
          <div className="post-preview">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              リール台本（{postData.reelScript.totalDuration}秒）
            </h3>
            <div className="space-y-3">
              {postData.reelScript.timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-find-blue font-semibold min-w-0">
                    {item.startTime}-{item.endTime}s
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.text}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* キャプション */}
        <div className="post-preview">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              キャプション
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 font-japanese">
                {postData.caption}
              </pre>
            </div>
          </div>

          {/* ハッシュタグ */}
          <div className="post-preview">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                ハッシュタグ
              </h3>
              {aiOptimized && (
                <button
                  onClick={async () => {
                    try {
                      const optimizedTags: string[] = await geminiService.optimizeHashtags(content, strategy)
                      setPostData(prev => prev ? { ...prev, hashtags: optimizedTags } : null)
                    } catch (error) {
                      console.error('Hashtag optimization failed:', error)
                    }
                  }}
                  className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg flex items-center space-x-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI再最適化</span>
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {postData.hashtags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-find-blue/10 text-find-blue rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ダウンロード */}
          <div className="post-preview">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              ダウンロード
            </h3>
            <div className="space-y-3">
              <button
                onClick={downloadImage}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>
                  {previewType === 'carousel' && postData?.pages && postData.pages.length > 1 
                    ? `PNG画像でダウンロード（${postData.pages.length}ページ）`
                    : 'PNG画像でダウンロード'
                  }
                </span>
              </button>
              <button
                onClick={downloadPDF}
                className="btn-secondary w-full flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>PDF台本でダウンロード</span>
              </button>
            </div>
          </div>
        </div>

      {/* 成功ポイント */}
      <div className="post-preview">
        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <Share2 className="w-5 h-5 mr-2 text-find-green" />
          この投稿の成功ポイント
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">戦略活用</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• {strategy === 'self-realization' && '成功体験で憧れを喚起'}</li>
              <li>• {strategy === 'loss-avoidance' && '失敗回避で行動促進'}</li>
              <li>• {strategy === 'investment' && '投資効果で価値提示'}</li>
              <li>• {strategy === 'urgency' && '緊急性で即行動促進'}</li>
              <li>• {strategy === 'relationships' && '人間関係で共感獲得'}</li>
              <li>• FIND to DO の価値と自然に連携</li>
              <li>• 学生目線でのメッセージ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">アルゴリズム対策</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• 最初の3秒で興味付け</li>
              <li>• 価値提供8割：プロモーション2割</li>
              <li>• 適切なハッシュタグ選定</li>
              <li>• エンゲージメント促進CTA</li>
              <li>• 一貫したジャンル認知</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}