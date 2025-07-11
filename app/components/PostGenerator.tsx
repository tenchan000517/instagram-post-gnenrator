'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Download, RefreshCw, Instagram, Share2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { StrategyType, PostData } from '../types/post'
import { 
  PostSlide, 
  Illustrations, 
  FindToDoPostTemplate, 
  PerfectionistToCompletionistPost
} from './InstagramPostTemplate'
import { templateComponents, TemplateType, TemplateData, TemplateSelector } from './templates'
import { IntelligentContentProcessor, ProcessedContent } from '../services/intelligentContentProcessor'
import { ExtractedContent } from '../services/contentExtractor'
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
  const [processedContents, setProcessedContents] = useState<ProcessedContent[]>([])
  const [selectedContent, setSelectedContent] = useState<ProcessedContent | null>(null)
  const [showContentSelection, setShowContentSelection] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    generatePost()
  }, [content, strategy])

  const generatePost = async () => {
    setGenerating(true)
    setAiOptimized(true)
    setGeneratingStatus('AI分析を実行中...')
    
    try {
      // Gemini AIだけを使用してコンテンツを分析・生成
      const aiAnalysis = await geminiService.analyzeContentForOptimalPost(content, strategy)
      const generatedPost = createPostFromAIAnalysis(content, aiAnalysis)
      
      setPostData(generatedPost)
      onPostGenerated(generatedPost)
      setGeneratingStatus('生成完了!')
      setAiAnalysis(aiAnalysis)
      
    } catch (error: any) {
      console.error('Gemini API Error:', error)
      setGeneratingStatus('エラーが発生しました')
      
      // エラー時は単純なフォールバック（リトライなし）
      const fallbackPost: PostData = {
        type: 'carousel',
        strategy,
        title: 'コンテンツ生成エラー',
        content: content,
        pages: [{
          pageNumber: 1,
          totalPages: 1,
          content: 'エラーが発生しました。しばらく待ってから再度お試しください。',
          type: 'content' as const,
          highlight: 'エラー',
          template: 'simple' as TemplateType,
          templateType: 'simple' as TemplateType,
          templateData: { title: 'エラー', content: 'コンテンツの生成に失敗しました' }
        }],
        hashtags: ['#エラー'],
        caption: 'エラーが発生しました',
        cta: '再度お試しください'
      }
      
      setPostData(fallbackPost)
      onPostGenerated(fallbackPost)
    }
    
    setGenerating(false)
  }

  // 処理されたコンテンツから投稿を生成
  const generatePostFromProcessedContent = async (selectedContent: ProcessedContent) => {
    setGeneratingStatus('投稿を生成中...')
    
    // 全てのProcessedContentを使用して複数ページの投稿を生成
    const pages = processedContents.map((content, index) => ({
      pageNumber: index + 1,
      totalPages: processedContents.length,
      content: content.title,
      type: 'content' as const,
      highlight: content.title,
      template: content.templateType,
      templateType: content.templateType,
      templateData: content.templateData
    }))
    
    const generatedPost: PostData = {
      type: 'carousel',
      strategy,
      title: selectedContent.title,
      content: content,
      pages: pages, // 複数ページ
      hashtags: getEffectiveHashtags(strategy, content),
      caption: generateCaption(content, strategy),
      cta: 'FIND to DOで一緒に成長しよう！'
    }
    
    setPostData(generatedPost)
    onPostGenerated(generatedPost)
    setSelectedContent(selectedContent)
    setGeneratingStatus('生成完了!')
  }

  // 構造から適切なテンプレートデータを生成
  const generateTemplateDataFromStructure = (extractedContent: ExtractedContent): TemplateData => {
    const { structure } = extractedContent
    
    switch (structure.type) {
      case 'title-list':
        return {
          title: extractedContent.title,
          badgeText: generateBadgeText(extractedContent.rawContent, 'enumeration'),
          items: structure.elements
            .filter(el => el.type === 'list-item')
            .map(el => el.content)
            .slice(0, 5),
          subtitle: 'FIND to DOで実践しよう'
        }
        
      case 'title-subtitle-descriptions':
        const points = structure.elements
          .filter(el => el.type === 'subtitle')
          .map((el, i) => ({
            title: el.content,
            description: structure.elements.find(desc => 
              desc.type === 'description' && 
              structure.elements.indexOf(desc) === structure.elements.indexOf(el) + 1
            )?.content || ''
          }))
        
        return {
          title: extractedContent.title,
          badgeText: generateBadgeText(extractedContent.rawContent, 'explanation'),
          points: points.slice(0, 3),
          subtitle: 'FIND to DOで実践しよう'
        }
        
      case 'step-by-step':
        return {
          title: extractedContent.title,
          badgeText: generateBadgeText(extractedContent.rawContent, 'enumeration'),
          items: structure.elements
            .filter(el => el.type === 'list-item')
            .map(el => el.content)
            .slice(0, 5),
          subtitle: 'ステップバイステップで成長しよう'
        }
        
      case 'comparison-table':
        return {
          title: extractedContent.title,
          badgeText: generateBadgeText(extractedContent.rawContent, 'table'),
          tableData: {
            headers: ['項目', '内容', '評価'],
            rows: structure.elements
              .filter(el => el.type === 'table-row')
              .map(el => el.content.split('|'))
              .slice(0, 5)
          },
          subtitle: 'データで比較・検討しよう'
        }
        
      case 'story-narrative':
        return {
          title: extractedContent.title,
          badgeText: generateBadgeText(extractedContent.rawContent, 'story'),
          content: structure.elements
            .filter(el => el.type === 'story-section')
            .map(el => el.content)
            .join('\n\n'),
          subtitle: 'あなたも同じように成長できる'
        }
        
      default:
        return {
          title: extractedContent.title,
          badgeText: 'ポイント',
          content: extractedContent.rawContent.substring(0, 120),
          subtitle: 'FIND to DOで一緒に成長しよう'
        }
    }
  }

  // コンテンツ選択のハンドラー
  const handleContentSelection = async (content: ProcessedContent) => {
    setShowContentSelection(false)
    setGenerating(true)
    setGeneratingStatus('選択されたコンテンツで投稿を生成中...')
    
    await generatePostFromProcessedContent(content)
    setGenerating(false)
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

  // より有益で具体的なタイトルを生成
  const generateBetterTitle = (content: string, templateType: TemplateType, highlight?: string): string => {
    const contentLower = content.toLowerCase()
    
    // テンプレートタイプに応じたタイトル生成
    if (templateType === 'table') {
      if (/インターン|エントリー|締切/.test(contentLower)) {
        return 'インターン締切情報'
      }
      if (/企業|会社|選考/.test(contentLower)) {
        return '企業情報まとめ'
      }
      if (/比較|ランキング/.test(contentLower)) {
        return '項目別比較'
      }
    }
    
    if (templateType === 'enumeration') {
      if (/ポイント|コツ/.test(contentLower)) {
        return '成功のポイント'
      }
      if (/方法|やり方/.test(contentLower)) {
        return '実践的な方法'
      }
      if (/選|おすすめ/.test(contentLower)) {
        return 'おすすめ選択肢'
      }
    }
    
    if (templateType === 'story') {
      if (/体験|経験/.test(contentLower)) {
        return '実体験レポート'
      }
      if (/変化|成長/.test(contentLower)) {
        return '成長ストーリー'
      }
    }
    
    // デフォルト：コンテンツから重要な部分を抽出
    return highlight?.substring(0, 20) || content.substring(0, 20).replace(/[。！？].*$/, '')
  }

  // より有益なサブタイトルを生成
  const generateBetterSubtitle = (content: string, templateType: TemplateType): string => {
    const contentLower = content.toLowerCase()
    
    if (templateType === 'table') {
      return '今すぐ確認して行動しよう'
    }
    
    if (templateType === 'enumeration') {
      return '実践して結果を出そう'
    }
    
    if (templateType === 'story') {
      return 'あなたも同じように成長できる'
    }
    
    return 'FIND to DOで一緒に成長しよう'
  }

  // バッジテキストを生成
  const generateBadgeText = (content: string, templateType: TemplateType): string => {
    const contentLower = content.toLowerCase()
    
    // テンプレートタイプに応じたバッジテキスト
    if (templateType === 'table') {
      if (/インターン|エントリー|締切/.test(contentLower)) {
        return '締切情報'
      }
      if (/比較|ランキング/.test(contentLower)) {
        return '比較データ'
      }
      return 'データ'
    }
    
    if (templateType === 'enumeration') {
      if (/ポイント|コツ/.test(contentLower)) {
        return '重要ポイント'
      }
      if (/方法|やり方/.test(contentLower)) {
        return '実践方法'
      }
      return 'チェック'
    }
    
    if (templateType === 'story') {
      if (/体験|経験/.test(contentLower)) {
        return '体験談'
      }
      return 'ストーリー'
    }
    
    if (templateType === 'list') {
      if (/チェック|確認/.test(contentLower)) {
        return 'チェックリスト'
      }
      return 'リスト'
    }
    
    if (templateType === 'explanation' || templateType === 'explanation2') {
      if (/手順|ステップ/.test(contentLower)) {
        return 'ステップ解説'
      }
      return '詳細解説'
    }
    
    // デフォルト
    return 'ポイント'
  }

  // 列挙型のアイテムをより具体的に生成
  const generateEnumerationItems = (sentences: string[]): string[] => {
    return sentences.slice(0, 5).map((sentence, index) => {
      // 不要な文字を削除し、より読みやすく
      let item = sentence.replace(/^[①②③④⑤⑥⑦⑧⑨⑩]|^\d+\.?/, '').trim()
      
      // 文字数制限内で意味のある内容に
      if (item.length > 25) {
        item = item.substring(0, 22) + '...'
      }
      
      // 空の場合はデフォルト
      if (!item) {
        item = `ポイント${index + 1}`
      }
      
      return item
    })
  }

  // インターン締切テーブルの行を生成
  const generateInternDeadlineRows = (sentences: string[]): string[][] => {
    const companies = ['A社', 'B社', 'C社', 'D社', 'E社']
    const deadlines = ['1/15', '1/20', '1/25', '2/01', '2/05']
    
    return sentences.slice(0, 5).map((sentence, i) => [
      companies[i] || `企業${i + 1}`,
      deadlines[i] || `1/${15 + i}`,
      sentence.substring(0, 15) || '詳細確認'
    ])
  }

  // 比較テーブルの行を生成
  const generateComparisonRows = (sentences: string[]): string[][] => {
    const items = ['給与', '福利厚生', '成長性', '安定性', '働きやすさ']
    const evaluations = ['高', '中', '高', '中', '高']
    
    return sentences.slice(0, 5).map((sentence, i) => [
      items[i] || `項目${i + 1}`,
      sentence.substring(0, 20) || '特徴',
      evaluations[i] || (i % 2 === 0 ? '高' : '中')
    ])
  }

  // ランキングテーブルの行を生成
  const generateRankingRows = (sentences: string[]): string[][] => {
    return sentences.slice(0, 5).map((sentence, i) => [
      `${i + 1}位`,
      sentence.substring(0, 15) || `選択肢${i + 1}`,
      sentence.substring(15, 35) || '詳細理由'
    ])
  }

  // デフォルトテーブルの行を生成
  const generateDefaultTableRows = (sentences: string[]): string[][] => {
    const priorities = ['高', '中', '高', '中', '高']
    
    return sentences.slice(0, 5).map((sentence, i) => [
      `項目${i + 1}`,
      sentence.substring(0, 20) || '内容',
      priorities[i] || (i % 2 === 0 ? '高' : '中')
    ])
  }

  // 重要部分を抽出してハイライト
  const extractHighlights = (content: string, templateType: TemplateType) => {
    const sentences = content.split(/[。！？]/).filter(s => s.trim().length > 0)
    
    const highlightPatterns: Record<TemplateType, string[]> = {
      enumeration: ['ポイント', '項目', '方法', '手順'],
      explanation: ['説明', '解説', '詳細', '理由'],
      story: ['体験', '実例', '事例', '実際'],
      list: ['チェック', 'リスト', '確認', '項目'],
      explanation2: ['解説', '詳細', '分析', '考察'],
      simple: ['シンプル', '簡単', '基本', '要点'],
      simple2: ['重要', 'ポイント', '必要', '基本'],
      simple3: ['要約', 'まとめ', '結論', '要点'],
      table: ['比較', '違い', 'データ', '表'],
      simple4: ['基本', '必須', '重要', '核心'],
      simple5: ['バランス', '調和', '最適', '効率'],
      simple6: ['メッセージ', '伝達', '明確', '直接']
    }

    const patterns = highlightPatterns[templateType] || []
    const highlights = sentences.filter((sentence: string) => 
      patterns.some((pattern: string) => sentence.includes(pattern))
    )

    return highlights.length > 0 ? highlights[0] : sentences[0]
  }

  // テンプレートデータを生成する関数
  const generateTemplateData = (templateType: TemplateType, content: string, highlight?: string): TemplateData => {
    const sentences = content.split(/[。！？]/).filter(s => s.trim().length > 0)
    
    // より有益で具体的なタイトルを生成
    const title = generateBetterTitle(content, templateType, highlight)
    const subtitle = generateBetterSubtitle(content, templateType)
    const badgeText = generateBadgeText(content, templateType)
    
    // テンプレートタイプに応じてデータを生成
    switch (templateType) {
      case 'enumeration':
        return {
          title,
          subtitle,
          badgeText,
          items: generateEnumerationItems(sentences)
        }
      
      case 'explanation':
      case 'explanation2':
        return {
          title,
          content: sentences.slice(0, 3).join('。')?.substring(0, 120) || '',
          subtitle,
          badgeText
        }
      
      case 'story':
        return {
          title,
          content: sentences.slice(0, 2).join('。')?.substring(0, 80) || '',
          subtitle,
          badgeText,
          checklist: sentences.slice(0, 3).map(s => ({ text: s.substring(0, 25), checked: true }))
        }
      
      case 'list':
        return {
          title,
          badgeText,
          items: sentences.slice(0, 5).map(s => s.substring(0, 30))
        }
      
      case 'table':
        // コンテンツの内容に応じて適切なテーブルヘッダーを生成
        const isInternDeadline = /インターン|エントリー|〆切|締切/.test(content)
        const isComparison = /比較|違い|vs|料金|価格/.test(content)
        const isRanking = /選|ランキング|オススメ|おすすめ/.test(content)
        
        let headers: string[], rows: string[][]
        
        if (isInternDeadline) {
          headers = ['企業名', '締切日', '詳細']
          rows = generateInternDeadlineRows(sentences)
        } else if (isComparison) {
          headers = ['項目', '特徴', '評価']
          rows = generateComparisonRows(sentences)
        } else if (isRanking) {
          headers = ['順位', '項目', '理由']
          rows = generateRankingRows(sentences)
        } else {
          headers = ['項目', '内容', '重要度']
          rows = generateDefaultTableRows(sentences)
        }
        
        return {
          title,
          badgeText,
          tableData: { headers, rows }
        }
      
      case 'simple':
      case 'simple2':
      case 'simple3':
      case 'simple4':
      case 'simple5':
      case 'simple6':
        return {
          title,
          content: sentences.slice(0, 2).join('。')?.substring(0, 80) || '',
          subtitle,
          badgeText,
          checklist: sentences.slice(0, 3).map(s => ({ text: s.substring(0, 25), checked: true })),
          points: sentences.slice(0, 3).map(s => ({ 
            title: s.substring(0, 15), 
            description: s.substring(0, 30) 
          }))
        }
      
      default:
        return {
          title,
          content: content.substring(0, 120),
          subtitle,
          badgeText
        }
    }
  }

  // 投稿内容を複数ページに分割する関数（コンテンツ主導）
  const splitContentIntoPages = (content: string, strategy: StrategyType) => {
    const sentences = content.split(/[。！？]/).filter(s => s.trim().length > 0)
    const pages = []
    
    // コンテンツ量に応じたページ数を決定（4-8ページ）
    const targetPages = Math.min(8, Math.max(4, Math.ceil(sentences.length / 2)))
    
    // センテンスをページに分割
    const sentencesPerPage = Math.ceil(sentences.length / targetPages)
    
    for (let i = 0; i < targetPages; i++) {
      const startIndex = i * sentencesPerPage
      const endIndex = Math.min(startIndex + sentencesPerPage, sentences.length)
      const pageContent = sentences.slice(startIndex, endIndex).join('。') + '。'
      
      // 最適なテンプレートを選択（改善されたアルゴリズムを使用）
      const optimalType = TemplateSelector.selectOptimalTemplate(pageContent, undefined, content)
      
      // デバッグログ
      console.log(`📄 ページ${i + 1} テンプレート選択:`, {
        content: pageContent.substring(0, 50) + '...',
        selectedTemplate: optimalType,
        contentLength: pageContent.length
      })
      
      // 重要部分を抽出
      const highlight = extractHighlights(pageContent, optimalType)
      
      // テンプレートデータを生成
      const templateData = generateTemplateData(optimalType, pageContent, highlight)
      
      pages.push({
        pageNumber: i + 1,
        totalPages: targetPages,
        content: pageContent,
        type: 'content' as const, // シンプルに統一
        highlight: highlight,
        template: optimalType as TemplateType,
        templateType: optimalType,
        templateData: templateData
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
    const aiPages = analysis.pageStructure.contentDistribution.map(page => {
      const templateType = TemplateSelector.selectOptimalTemplate(page.content) as TemplateType
      const templateData = generateTemplateData(templateType, page.content, page.highlight)
      
      return {
        pageNumber: page.pageNumber,
        totalPages: analysis.pageStructure.recommendedPages,
        content: page.content,
        type: page.type as any, // 型アサーション（必要に応じて型を調整）
        highlight: page.highlight,
        template: templateType,
        templateType: templateType,
        templateData: templateData
      }
    })

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
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 850,
        height: 899,
        useCORS: true,
        allowTaint: true
      })
      
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
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: 850,
        height: 899,
        useCORS: true,
        allowTaint: true
      })
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

  // コンテンツ選択画面
  if (showContentSelection) {
    return (
      <div className="post-preview">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            📋 抽出されたコンテンツから選択
          </h2>
          <p className="text-gray-600">
            リサーチ内容から{processedContents.length}つの有益なコンテンツを抽出しました。投稿に使用するコンテンツを選択してください。
          </p>
        </div>
        
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {processedContents.map((content, index) => (
            <div
              key={content.id}
              className="border rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition-colors"
              onClick={() => handleContentSelection(content)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{content.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {content.contentType}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    優先度: {(content.priority * 100).toFixed(0)}%
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    {content.templateType}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                テンプレート: {content.templateType} | タイトル: {content.title}
              </p>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>コンテンツタイプ: {content.contentType}</span>
                <span>優先度: {content.priority.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowContentSelection(false)}
            className="btn-secondary"
          >
            キャンセル
          </button>
        </div>
      </div>
    )
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
          🔍 新しいコンテンツ分析システム
        </h2>
        <p className="text-gray-600 mb-2">
          {generatingStatus}
        </p>
        <p className="text-sm text-gray-500">
          リサーチ内容から密度の高い有益な情報を抽出し<br />
          構造に基づいて最適なテンプレートを選択しています
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
        width: '850px',
        height: '899px'
      }}>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          プレビュー
        </h3>
        
        <Viewport 
          width={850} 
          height={899}
        >
          <div ref={previewRef} style={{ 
            width: '850px', 
            height: '899px',
            overflow: 'hidden',
            position: 'relative'
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
              (() => {
                const currentPage = postData.pages[currentCarouselPage]
                const templateType = currentPage.templateType as TemplateType
                const TemplateComponent = templateComponents[templateType]
                
                // デバッグログ
                console.log('🔍 テンプレート選択デバッグ:', {
                  pageNumber: currentPage.pageNumber,
                  content: currentPage.content.substring(0, 100) + '...',
                  templateType,
                  hasTemplateComponent: !!TemplateComponent,
                  hasTemplateData: !!currentPage.templateData,
                  templateData: currentPage.templateData
                })
                
                if (TemplateComponent && currentPage.templateData) {
                  console.log('✅ 新しいテンプレートを使用:', templateType)
                  return <TemplateComponent data={currentPage.templateData} />
                }
                
                // フォールバック: 従来のPostSlideを使用
                console.log('⚠️ フォールバック処理を使用')
                return (
                  <PostSlide
                    title={postData.title}
                    number={currentPage.pageNumber}
                    highlight={currentPage.highlight || (currentCarouselPage === 0 ? "重要なポイントをご紹介" : undefined)}
                    content={
                      <div>
                        <p className="text-3xl leading-relaxed" style={{ color: '#1e40af' }}>
                          {currentPage.content}
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
                )
              })()
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
                        {page.template && (
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