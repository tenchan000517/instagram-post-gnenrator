// キャプションフォーマット設定
// コースで定義された有用なキャプションフォーマット

export interface CaptionFormat {
  template: string
  description: string
  example: string
}

export const captionFormats: CaptionFormat[] = [
  {
    template: `{hook}

{content}

{cta}

{engagement}`,
    description: 'フック→コンテンツ→CTA→エンゲージメント',
    example: `面接でよく聞かれる質問について

今日は面接でよく聞かれる質問について解説します

詳しい回答例はプロフィールのリンクから

この投稿が役に立ったら「いいね」で教えてください`
  },
  {
    template: `{problem}

{solution}

{benefit}

{action}`,
    description: '問題提起→解決策→メリット→行動促進',
    example: `就活で何をすればいいか分からない方へ

そんな方にオススメなのが「逆算思考」です。

この方法で内定率の向上が期待できます

ぜひ実践してみてください`
  },
  {
    template: `{attention}

{reason}

{howto}

{result}`,
    description: '注意喚起→理由→方法→結果',
    example: `就活生の多くが知らないポイント

なぜなら大学では教えてくれないからです。

この3つのステップで解決できます

結果、内定獲得率の向上が期待できます`
  }
]

export interface CaptionConfig {
  maxLength: number
  includeHashtags: boolean
  includeEmojis: boolean
  tone: 'friendly' | 'professional' | 'casual'
  targetAudience: 'students' | 'professionals' | 'general'
}

export const defaultCaptionConfig: CaptionConfig = {
  maxLength: 2200,
  includeHashtags: true,
  includeEmojis: true,
  tone: 'friendly',
  targetAudience: 'students'
}

export class CaptionService {
  private config: CaptionConfig

  constructor(config: CaptionConfig = defaultCaptionConfig) {
    this.config = config
  }

  /**
   * コンテンツに基づいて最適なキャプションを生成
   */
  generateCaption(
    content: string,
    title: string,
    formatIndex: number = 0,
    customVariables?: { [key: string]: string }
  ): string {
    const format = captionFormats[formatIndex] || captionFormats[0]
    
    // デフォルト変数を設定
    const variables = {
      hook: this.generateHook(title),
      content: this.generateContent(content),
      cta: this.generateCTA(),
      engagement: this.generateEngagement(),
      problem: this.generateProblem(content),
      solution: this.generateSolution(content),
      benefit: this.generateBenefit(content),
      action: this.generateAction(),
      attention: this.generateAttention(),
      reason: this.generateReason(content),
      howto: this.generateHowTo(content),
      result: this.generateResult(content),
      ...customVariables
    }

    // テンプレートに変数を埋め込み
    let caption = format.template
    Object.entries(variables).forEach(([key, value]) => {
      caption = caption.replace(new RegExp(`{${key}}`, 'g'), value)
    })

    // 長さ制限チェック
    if (caption.length > this.config.maxLength) {
      caption = caption.substring(0, this.config.maxLength - 3) + '...'
    }

    return caption
  }

  private generateHook(title: string): string {
    const hooks = [
      `${title}について`,
      `${title}のポイント`,
      `${title}を解説`,
      `${title}の方法`,
      `${title}をご紹介`,
      `${title}のコツ`
    ]
    return hooks[Math.floor(Math.random() * hooks.length)]
  }

  private generateContent(content: string): string {
    const contentSummary = content.length > 100 
      ? content.substring(0, 100) + '...' 
      : content
    
    return `${contentSummary}

詳しい内容は画像をスワイプして確認してください`
  }

  private generateCTA(): string {
    const ctas = [
      '詳しくはプロフィールのリンクから確認できます',
      'より詳しい情報はプロフィールから',
      'プロフィールリンクで完全版をチェック',
      '続きはプロフィールのリンクで読めます'
    ]
    return ctas[Math.floor(Math.random() * ctas.length)]
  }

  private generateEngagement(): string {
    const engagements = [
      'この投稿が役に立ったら「いいね」で教えてください',
      '保存して後で見返してくださいね',
      'コメントで感想を聞かせてください',
      'シェアして仲間にも教えてあげてください',
      'フォローして最新情報をゲットしてください'
    ]
    return engagements[Math.floor(Math.random() * engagements.length)]
  }

  private generateProblem(content: string): string {
    const problems = [
      '就活で何をすればいいか分からない方へ',
      'エントリーシートが通らない方へ',
      '面接でうまく話せない方へ',
      '自己分析ができない方へ',
      '志望動機が書けない方へ'
    ]
    return problems[Math.floor(Math.random() * problems.length)]
  }

  private generateSolution(content: string): string {
    return `そんな方にオススメなのが今回紹介する方法です

画像の内容を実践すれば、きっと解決できるはずです`
  }

  private generateBenefit(content: string): string {
    const benefits = [
      'この方法で内定率の向上が期待できます',
      '実際に多くの学生が成功しています',
      '短期間で大きな成果が期待できます',
      '就活の不安が解消されます'
    ]
    return benefits[Math.floor(Math.random() * benefits.length)]
  }

  private generateAction(): string {
    const actions = [
      'ぜひ実践してみてください',
      'まずは1つから始めてみましょう',
      '今日から取り組んでみてください',
      'ぜひ行動に移してみてください'
    ]
    return actions[Math.floor(Math.random() * actions.length)]
  }

  private generateAttention(): string {
    const attentions = [
      '就活生の多くが知らないポイント',
      '知っておきたい重要なポイント',
      '重要なお知らせがあります',
      '注目すべき情報です'
    ]
    return attentions[Math.floor(Math.random() * attentions.length)]
  }

  private generateReason(content: string): string {
    const reasons = [
      'なぜなら大学では教えてくれないからです。',
      'その理由は意外と知られていません。',
      '実は多くの人が見落としているポイントなんです。',
      'これまで正しい方法を知らなかっただけです。'
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  private generateHowTo(content: string): string {
    return `この3つのステップで解決できます

画像で詳しく解説しています`
  }

  private generateResult(content: string): string {
    const results = [
      '結果、内定獲得率の向上が期待できます',
      '多くの学生が成功を実感しています',
      '短期間で大きな変化を実感できます',
      '就活の悩みが解消されました'
    ]
    return results[Math.floor(Math.random() * results.length)]
  }

  /**
   * 利用可能なフォーマット一覧を取得
   */
  getFormats(): CaptionFormat[] {
    return captionFormats
  }

  /**
   * 設定を更新
   */
  updateConfig(newConfig: Partial<CaptionConfig>) {
    this.config = { ...this.config, ...newConfig }
  }

  /**
   * 現在の設定を取得
   */
  getConfig(): CaptionConfig {
    return { ...this.config }
  }
}

export const captionService = new CaptionService()