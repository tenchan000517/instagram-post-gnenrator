/**
 * Phase C3: 投稿タイプ別最適化プロンプトテンプレート
 * 
 * Phase 7設計思想に基づく実装：
 * - ナレッジ = 実際の困った→解決した実例
 * - 投稿タイプ = フィルタリング機能のみ  
 * - ナレッジ自体が最適構造を内包
 * - 事実以外の情報追加は厳禁
 */

export interface PostTypePromptTemplate {
  postType: string
  description: string
  focusArea: string
  constraints: string[]
  expressionGuidance: string
  structurePreservation: string
  template: string
}

export class PromptTemplates {
  
  /**
   * 投稿タイプ1: キャリア悩み解決法（感情・共感重視）
   */
  static readonly CAREER_TROUBLES: PostTypePromptTemplate = {
    postType: 'キャリア悩み解決法',
    description: '共感・感情的サポートを重視した表現',
    focusArea: '読者の心理的負担軽減と安心感の提供',
    constraints: [
      'ナレッジの困りごと→解決体験の流れを完全保持',
      'ナレッジの感情フローとストーリー性を維持',
      '事実・体験に基づかない情報の追加禁止',
      '共感表現の優先（解決策よりも理解される安心感）'
    ],
    expressionGuidance: '共感→共感→理解→安心→行動の感情フローに調整',
    structurePreservation: 'ナレッジが持つ固有の共感構造とストーリー順序を厳格保持',
    template: `
あなたはキャリア悩み解決の専門家です。以下のナレッジを基に、読者の心に寄り添う共感型コンテンツを生成してください。

【重要な制約】
- ナレッジの事実・体験のみを使用（推測・想像による補完は厳禁）
- ナレッジの感情フローと表現順序を完全保持
- 困った→解決したの実体験ストーリーを崩さない
- 読者の「分かってもらいたい」気持ちを最優先

【ナレッジ情報】
{knowledgeContent}

【表現調整方針】
- 共感表現を重視（「その気持ち、よく分かります」等）
- 読者の心理的負担を軽減する温かい表現
- 安心感を与える表現に調整
- 実体験の重みと説得力を活かす
- 解決への希望を自然に示す

【厳守事項】
1. ナレッジにない情報は一切追加しない
2. ナレッジの構造・順序・表現の意図を尊重
3. 実体験の価値と特性を損なわない
4. ユーザーの意図「{userIntent}」に合わせた表現調整のみ

【出力要求】
ナレッジの構造を保持したまま、共感・感情的サポートを重視した表現に調整してください。
`
  }

  /**
   * 投稿タイプ2: スキルアップガイド（教育・学習重視）
   */
  static readonly SKILL_DEVELOPMENT: PostTypePromptTemplate = {
    postType: 'スキルアップガイド',
    description: '教育的・体系的な表現',
    focusArea: '段階的学習と技能習得の支援',
    constraints: [
      'ナレッジの学習プロセスと習得順序を完全保持',
      'ナレッジの教育的構造と体系性を維持',
      '事実・経験に基づかない理論の追加禁止',
      '教育効果を重視した論理的表現'
    ],
    expressionGuidance: '基礎→応用→実践→マスターの学習フローに調整',
    structurePreservation: 'ナレッジが持つ固有の学習構造と習得段階を厳格保持',
    template: `
あなたはスキルアップ指導の専門家です。以下のナレッジを基に、体系的で教育効果の高いコンテンツを生成してください。

【重要な制約】
- ナレッジの事実・経験のみを使用（理論追加は厳禁）
- ナレッジの学習構造と段階順序を完全保持
- 困った→解決したの習得プロセスを崩さない
- 教育的価値と実践的効果を最優先

【ナレッジ情報】
{knowledgeContent}

【表現調整方針】
- 体系的で分かりやすい教育表現
- 段階的習得プロセスの明確化
- 実践的で具体的な指導表現
- 学習者の理解促進に配慮
- 習得への道筋を論理的に提示

【厳守事項】
1. ナレッジにない情報は一切追加しない
2. ナレッジの構造・順序・表現の意図を尊重
3. 実経験の価値と特性を損なわない
4. ユーザーの意図「{userIntent}」に合わせた表現調整のみ

【出力要求】
ナレッジの構造を保持したまま、教育的・体系的な表現に調整してください。
`
  }

  /**
   * 投稿タイプ3: 業界・企業情報まとめ（情報・データ重視）
   */
  static readonly INDUSTRY_INFO: PostTypePromptTemplate = {
    postType: '業界・企業情報まとめ',
    description: '客観的・データ重視の表現',
    focusArea: '正確な情報提供と客観的分析',
    constraints: [
      'ナレッジのデータと情報源を完全保持',
      'ナレッジの客観性と情報構造を維持',
      '事実・データに基づかない推測の追加禁止',
      '情報の正確性と信頼性を最優先'
    ],
    expressionGuidance: '事実→分析→比較→結論の情報フローに調整',
    structurePreservation: 'ナレッジが持つ固有の情報構造とデータ配置を厳格保持',
    template: `
あなたは業界・企業分析の専門家です。以下のナレッジを基に、客観的で信頼性の高い情報コンテンツを生成してください。

【重要な制約】
- ナレッジの事実・データのみを使用（推測分析は厳禁）
- ナレッジの情報構造とデータ配置を完全保持
- 困った→解決したの情報収集プロセスを崩さない
- 情報の正確性と客観性を最優先

【ナレッジ情報】
{knowledgeContent}

【表現調整方針】
- 客観的で中立的な情報表現
- データの信頼性と出典の明確化
- 比較分析に基づく表現
- 読者の判断材料となる情報提供
- 事実に基づく論理的結論

【厳守事項】
1. ナレッジにない情報は一切追加しない
2. ナレッジの構造・順序・表現の意図を尊重
3. 実データの価値と特性を損なわない
4. ユーザーの意図「{userIntent}」に合わせた表現調整のみ

【出力要求】
ナレッジの構造を保持したまま、客観的・データ重視の表現に調整してください。
`
  }

  /**
   * 投稿タイプ4: 効率アップテクニック（実用・効率重視）
   */
  static readonly EFFICIENCY_TECHNIQUES: PostTypePromptTemplate = {
    postType: '効率アップテクニック',
    description: '実用的・即効性重視の表現',
    focusArea: '具体的手法と即効性のある解決策',
    constraints: [
      'ナレッジの実用的手法と効果を完全保持',
      'ナレッジの効率化プロセスと結果を維持',
      '事実・実証に基づかない手法の追加禁止',
      '実用性と即効性を最優先'
    ],
    expressionGuidance: '課題→手法→実践→効果の効率フローに調整',
    structurePreservation: 'ナレッジが持つ固有の効率化構造と手法順序を厳格保持',
    template: `
あなたは効率化テクニックの専門家です。以下のナレッジを基に、実用的で即効性のあるコンテンツを生成してください。

【重要な制約】
- ナレッジの事実・実証データのみを使用（仮説手法は厳禁）
- ナレッジの効率化構造と手法順序を完全保持
- 困った→解決したの効率化プロセスを崩さない
- 実用性と即効性を最優先

【ナレッジ情報】
{knowledgeContent}

【表現調整方針】
- 実用的で具体的な手法表現
- 即効性と効果の明確化
- 実践しやすい具体的指示
- 読者の時短・効率化支援
- 結果が見える表現

【厳守事項】
1. ナレッジにない情報は一切追加しない
2. ナレッジの構造・順序・表現の意図を尊重
3. 実証済み手法の価値と特性を損なわない
4. ユーザーの意図「{userIntent}」に合わせた表現調整のみ

【出力要求】
ナレッジの構造を保持したまま、実用的・即効性重視の表現に調整してください。
`
  }

  /**
   * 投稿タイプに応じたプロンプトテンプレートを取得
   */
  static getTemplateByType(postType: string): PostTypePromptTemplate {
    switch (postType) {
      case 'career-troubles':
      case 'キャリア悩み解決法':
        return this.CAREER_TROUBLES

      case 'skill-development':  
      case 'スキルアップガイド':
        return this.SKILL_DEVELOPMENT

      case 'industry-info':
      case '業界・企業情報まとめ':
        return this.INDUSTRY_INFO

      case 'efficiency-techniques':
      case '効率アップテクニック':
        return this.EFFICIENCY_TECHNIQUES

      default:
        // フォールバック: キャリア悩み解決法をデフォルトとする
        console.warn(`未知の投稿タイプ: ${postType}. デフォルトを使用します。`)
        return this.CAREER_TROUBLES
    }
  }

  /**
   * 全ての投稿タイプテンプレートを取得
   */
  static getAllTemplates(): PostTypePromptTemplate[] {
    return [
      this.CAREER_TROUBLES,
      this.SKILL_DEVELOPMENT, 
      this.INDUSTRY_INFO,
      this.EFFICIENCY_TECHNIQUES
    ]
  }

  /**
   * 投稿タイプの一覧を取得
   */
  static getPostTypes(): string[] {
    return [
      'キャリア悩み解決法',
      'スキルアップガイド',
      '業界・企業情報まとめ',
      '効率アップテクニック'
    ]
  }

  /**
   * 基本的なナレッジ構造保持制約（全タイプ共通）
   */
  static readonly COMMON_KNOWLEDGE_CONSTRAINTS = {
    structure: [
      'ナレッジの固有構造と表現順序を完全保持',
      'ナレッジが内包する最適フローを尊重',
      '感情の流れ・説得構造・ストーリー性を維持'
    ],
    facts: [
      'ナレッジの事実情報のみを使用',
      '推測・憶測・想像による情報追加を厳禁',
      'データの改変・誇張・歪曲を禁止'
    ],
    expression: [
      'ユーザー意図に合わせた表現調整のみ実施',
      'ナレッジの本質的価値を損なわない',
      '実体験・実例の重みと説得力を活かす'
    ]
  }
}