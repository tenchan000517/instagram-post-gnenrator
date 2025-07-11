export type PostType = 'reel' | 'story' | 'feed' | 'highlight' | 'carousel'

export type StrategyType = 
  | 'self-realization'    // 自己実現（憧れ・理想）
  | 'loss-avoidance'      // 損失回避（失敗回避）
  | 'investment'          // 投資（リターン期待）
  | 'urgency'            // 緊急性（今すぐ行動）
  | 'relationships'       // 人間関係（仲間・メンター）

export interface PostData {
  type: PostType
  strategy: StrategyType
  title: string
  content: string
  reelScript?: ReelScript
  storySlides?: StorySlide[]
  feedContent?: FeedContent
  pages?: PostPage[]
  hashtags: string[]
  caption: string
  cta: string
}

export interface PostPage {
  pageNumber: number
  totalPages: number
  content: string
  type: 'intro' | 'problem' | 'solution' | 'result' | 'cta' | 'warning' | 'problems' | 'consequences' | 'solutions' | 'opportunity' | 'benefits' | 'methods' | 'timeline' | 'deadline' | 'risks' | 'actions' | 'connection' | 'community' | 'growth' | 'content' | 'urgency'
  highlight?: string
  template?: string
}

export interface ReelScript {
  timeline: TimelineItem[]
  totalDuration: number
  keyPoints: string[]
}

export interface TimelineItem {
  startTime: number
  endTime: number
  text: string
  action: string
  visual: string
}

export interface StorySlide {
  slideNumber: number
  title: string
  content: string
  background: string
  textColor: string
  interactive?: {
    type: 'poll' | 'question' | 'reaction'
    text: string
  }
}

export interface FeedContent {
  title: string
  mainText: string
  bulletPoints: string[]
  conclusion: string
  imageDescription: string
}

export interface StrategyPattern {
  type: StrategyType
  name: string
  description: string
  keywords: string[]
  structure: {
    hook: string
    body: string
    cta: string
  }
  examples: string[]
  findToDoApplication: string
}