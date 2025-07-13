// ContentLayoutService - コンテンツをテンプレートに配置（改変なし）
import { TemplateType, TemplateData } from '../components/templates/TemplateTypes'
import { templateRegistry } from '../components/templates/TemplateRegistry'
import { MarkdownUtils } from '../utils/markdownUtils'

export interface ContentLayoutResult {
  templateType: TemplateType
  templateData: TemplateData
  layoutSuccess: boolean
  layoutNotes: string[]
}

export interface ContentStructure {
  title: string
  mainContent: string
  sections: Array<{
    title: string
    content: string
    items?: string[]
  }>
  items: string[]
  keywords: string[]
}

export class ContentLayoutService {
  /**
   * 生成されたコンテンツを指定されたテンプレートに配置
   * 🚨重要: コンテンツの改変は一切行わない
   */
  static layoutContentToTemplate(
    content: string, 
    templateType: TemplateType
  ): ContentLayoutResult {
    
    console.log('🔍 ContentLayoutService: 開始')
    console.log('📝 入力コンテンツ:', content.substring(0, 200) + '...')
    console.log('🎯 対象テンプレート:', templateType)
    
    // 1. コンテンツを構造化（改変なし）
    const structure = this.parseContentStructure(content)
    console.log('📊 構造化結果:', structure)
    
    // 2. テンプレートタイプに応じて配置
    const rawTemplateData = this.mapToTemplateData(structure, templateType)
    console.log('🎨 生テンプレートデータ:', rawTemplateData)
    
    // 3. 文字数制限に従って調整
    const templateData = this.trimContentToLimits(rawTemplateData, templateType)
    console.log('✂️ 調整後テンプレートデータ:', templateData)
    
    // 4. 配置結果を検証
    const validation = this.validateLayout(structure, templateData, templateType)
    
    const result = {
      templateType,
      templateData,
      layoutSuccess: validation.success,
      layoutNotes: validation.notes
    }
    
    console.log('✅ 配置結果:', result)
    
    return result
  }

  /**
   * Gemini生成コンテンツから構造化マーカーを除去
   */
  private static cleanGeminiStructureMarkers(content: string): string {
    console.log('🧹 構造化マーカー除去前:', content.substring(0, 200) + '...')
    
    let cleaned = content
      // 「セクション:」行を除去
      .replace(/^セクション:\s*$/gm, '')
      // 「項目:」行を除去
      .replace(/^項目:\s*$/gm, '')
      // 空行を整理
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // 先頭・末尾の空白を除去
      .trim()
    
    // マークダウン記法を除去
    cleaned = MarkdownUtils.removeMarkdown(cleaned)
    
    console.log('✨ 構造化マーカー・マークダウン除去後:', cleaned.substring(0, 200) + '...')
    return cleaned
  }

  /**
   * コンテンツを構造化（改変なし）- 柔軟な解析
   */
  private static parseContentStructure(content: string): ContentStructure {
    // 最初にGemini特有のマーカーを除去
    const cleanedContent = this.cleanGeminiStructureMarkers(content)
    const lines = cleanedContent.split('\n').filter(line => line.trim().length > 0)
    const structure: ContentStructure = {
      title: '',
      mainContent: '',
      sections: [],
      items: [],
      keywords: []
    }

    let currentSection: { title: string; content: string; items?: string[] } | null = null
    let mainContentLines: string[] = []
    let isInItemsList = false

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmedLine = line.trim()
      
      if (trimmedLine.length === 0) continue
      
      // タイトルを検出（最初の意味のある行）
      if (!structure.title && trimmedLine.length > 5 && !this.isListItem(trimmedLine)) {
        structure.title = trimmedLine
        continue
      }

      // セクション区切りを検出（複数パターン）
      if (this.isSectionDelimiter(trimmedLine)) {
        if (currentSection) {
          structure.sections.push(currentSection)
        }
        currentSection = { title: '', content: '', items: [] }
        isInItemsList = false
        continue
      }

      // 項目リストの開始を検出
      if (this.isItemsListStart(trimmedLine)) {
        isInItemsList = true
        continue
      }

      // リスト項目を検出
      if (this.isListItem(trimmedLine)) {
        const item = this.extractListItem(trimmedLine)
        if (item) {
          if (currentSection && currentSection.items) {
            currentSection.items.push(item)
          } else {
            structure.items.push(item)
          }
        }
        continue
      }

      // セクションタイトルを検出（短い行で、次の行が詳細）
      if (this.isSectionTitle(trimmedLine, lines[i + 1])) {
        if (currentSection) {
          structure.sections.push(currentSection)
        }
        currentSection = { title: trimmedLine, content: '', items: [] }
        isInItemsList = false
        continue
      }

      // 現在セクション内の処理
      if (currentSection) {
        if (currentSection.content.length > 0) {
          currentSection.content += '\n' + trimmedLine
        } else {
          currentSection.content = trimmedLine
        }
      } else {
        // メインコンテンツとして追加
        mainContentLines.push(trimmedLine)
      }
    }

    // 最後のセクションを追加
    if (currentSection) {
      structure.sections.push(currentSection)
    }

    // メインコンテンツを統合
    structure.mainContent = mainContentLines.join('\n')

    // 構造を最適化
    this.optimizeStructure(structure)

    return structure
  }

  /**
   * セクション区切りを検出
   */
  private static isSectionDelimiter(line: string): boolean {
    return /^(セクション|Section):|^#{1,3}\s|^[-=]{3,}$/.test(line)
  }

  /**
   * 項目リストの開始を検出
   */
  private static isItemsListStart(line: string): boolean {
    return /^(項目|Items?|リスト):\s*$/.test(line)
  }

  /**
   * リスト項目を検出
   */
  private static isListItem(line: string): boolean {
    // 従来のリスト形式 + コロン形式（デジタルツール:、アナログツール: など）
    return /^([・•\-*]|[\d+]+[.\)]|[①②③④⑤⑥⑦⑧⑨⑩])\s/.test(line) ||
           /^[a-zA-Z0-9ぁ-んァ-ヶー・]+\s*[：:]\s*/.test(line)
  }

  /**
   * セクションタイトルを検出
   */
  private static isSectionTitle(line: string, nextLine?: string): boolean {
    // 短い行で、次の行が詳細説明の場合
    return line.length > 5 && line.length < 50 && 
           !line.includes('。') && !line.includes('！') && !line.includes('？') &&
           Boolean(nextLine && nextLine.length > 20)
  }

  /**
   * リスト項目を抽出
   */
  private static extractListItem(line: string): string | null {
    // 従来のリスト形式
    const listMatch = line.match(/^([・•\-*]|[\d+]+[.\)]|[①②③④⑤⑥⑦⑧⑨⑩])\s*(.+)$/)
    if (listMatch) {
      return listMatch[2].trim()
    }
    
    // コロン形式（デジタルツール: 内容）
    const colonMatch = line.match(/^[a-zA-Z0-9ぁ-んァ-ヶー・]+\s*[：:]\s*(.+)$/)
    if (colonMatch) {
      return line.trim() // 全体を返す（タイトル: 内容）
    }
    
    return null
  }

  /**
   * 構造を最適化
   */
  private static optimizeStructure(structure: ContentStructure): void {
    // セクションが少ない場合、メインコンテンツから追加セクションを抽出
    if (structure.sections.length === 0 && structure.mainContent.length > 100) {
      const paragraphs = structure.mainContent.split('\n\n')
      if (paragraphs.length > 1) {
        structure.sections = paragraphs.map((para, index) => ({
          title: `ポイント${index + 1}`,
          content: para.trim()
        }))
      }
    }

    // 項目が少ない場合、セクションタイトルから抽出
    if (structure.items.length === 0 && structure.sections.length > 0) {
      structure.items = structure.sections.map(section => section.title).slice(0, 5)
    }
  }

  /**
   * 構造化されたコンテンツをテンプレートデータにマッピング
   */
  private static mapToTemplateData(
    structure: ContentStructure, 
    templateType: TemplateType
  ): TemplateData {
    
    const baseData: TemplateData = {
      title: structure.title || 'タイトル',
      content: structure.mainContent || '',
      subtitle: '',
      badgeText: ''
    }

    switch (templateType) {
      case 'enumeration':
        return {
          ...baseData,
          badgeText: this.extractBadgeText(structure.mainContent, 'enumeration'),
          items: structure.items.length > 0 ? structure.items.slice(0, 5) : 
                 this.extractItemsFromSections(structure.sections),
          subtitle: this.extractSubtitle(structure.sections)
        }

      case 'explanation2':
        return {
          ...baseData,
          badgeText: this.extractBadgeText(structure.mainContent, 'explanation2'),
          content: structure.sections.length > 0 ? 
                   structure.sections[0].content : 
                   structure.mainContent,
          subtitle: structure.sections.length > 1 ? 
                    structure.sections[1].title : 
                    ''
        }

      case 'explanation2':
        return {
          ...baseData,
          badgeText: this.extractBadgeText(structure.mainContent, 'explanation2'),
          content: structure.sections.length > 0 ? 
                   structure.sections.map(s => `${s.title}\n${s.content}`).join('\n\n') : 
                   structure.mainContent,
          subtitle: structure.sections.length > 0 ? 
                    `${structure.sections.length}つのポイント` : 
                    ''
        }

      case 'table':
        return {
          ...baseData,
          badgeText: this.extractBadgeText(structure.mainContent, 'table'),
          tableData: this.extractTableData(structure.sections, structure.items)
        }


      case 'list':
        return {
          ...baseData,
          badgeText: this.extractBadgeText(structure.mainContent, 'list'),
          items: structure.items.length > 0 ? structure.items : 
                 structure.sections.map(s => s.title)
        }

      case 'title-description-only':
        return {
          ...baseData,
          badgeText: this.extractBadgeText(structure.mainContent, 'title-description-only'),
          content: structure.mainContent || structure.sections[0]?.content || '',
          subtitle: structure.sections[0]?.title || ''
        }

      case 'checklist-enhanced':
        return {
          ...baseData,
          badgeText: this.extractBadgeText(structure.mainContent, 'checklist-enhanced'),
          content: structure.mainContent,
          checklistItems: structure.items.length > 0 ? 
            structure.items.map(item => ({
              text: item,
              description: '',
              checked: false
            })) : 
            structure.sections.map(section => ({
              text: section.title,
              description: section.content,
              checked: false
            }))
        }

      case 'item-n-title-content':
        return {
          ...baseData,
          badgeText: this.extractBadgeText(structure.mainContent, 'item-n-title-content'),
          subtitle: this.extractSubtitle(structure.sections),
          items: structure.sections.length > 0 ? 
                 structure.sections.map(section => ({
                   title: section.title,
                   content: section.content
                 })) :
                 structure.items.map(item => ({
                   title: item,
                   content: ''
                 }))
        }

      case 'single-section-no-items':
        return {
          ...baseData,
          badgeText: this.extractBadgeText(structure.mainContent, 'single-section-no-items'),
          description: structure.sections.length > 0 ? structure.sections[0].content : baseData.content,
          sections: structure.sections.length > 0 ? [structure.sections[0]] : undefined,
          subtitle: this.extractSubtitle(structure.sections)
        }

      default:
        return baseData
    }
  }

  /**
   * セクションから項目を抽出
   */
  private static extractItemsFromSections(sections: Array<{ title: string; content: string }>): string[] {
    if (sections.length === 0) return []
    
    // セクションタイトルを項目として使用
    return sections.map(section => section.title).slice(0, 5)
  }

  /**
   * サブタイトルを抽出
   */
  private static extractSubtitle(sections: Array<{ title: string; content: string }>): string {
    if (sections.length === 0) return ''
    
    // 最初のセクションの内容から要約を生成
    const firstSection = sections[0]
    const content = firstSection.content
    
    // 最初の文を抽出（最大50文字）
    const firstSentence = content.split(/[。！？]/).filter(s => s.trim().length > 0)[0]
    return firstSentence ? firstSentence.substring(0, 50) : ''
  }

  /**
   * バッジテキストを抽出
   */
  private static extractBadgeText(content: string, templateType: TemplateType): string {
    const contentLower = content.toLowerCase()
    
    // テンプレートタイプに応じたバッジテキスト
    const badgeMap: Record<TemplateType, string[]> = {
      enumeration: ['チェックリスト', 'ポイント', '項目'],
      explanation2: ['ステップ解説', '詳細解説', '分析'],
      table: ['比較', 'データ', '一覧'],
      list: ['リスト', 'まとめ', '一覧'],
      simple3: ['要約', 'まとめ', '結論'],
      simple5: ['バランス', '最適', '効率'],
      simple6: ['メッセージ', '重要', '核心'],
      'section-items': ['詳細リスト', 'セクション', '項目'],
      'two-column-section-items': ['2カラム', 'セクション', '比較'],
      'title-description-only': ['メッセージ', 'エッセンス', '重要'],
      'checklist-enhanced': ['チェックリスト', 'タスク', 'アクション'],
      'item-n-title-content': ['ポイント', 'カテゴリ', '要素'],
      'single-section-no-items': ['セクション', '詳細', '解説']
    }

    const candidates = badgeMap[templateType] || ['ポイント']
    
    // コンテンツに含まれるキーワードから選択
    for (const candidate of candidates) {
      if (contentLower.includes(candidate.toLowerCase())) {
        return candidate
      }
    }
    
    return candidates[0]
  }

  /**
   * テーブルデータを抽出
   */
  private static extractTableData(
    sections: Array<{ title: string; content: string }>, 
    items: string[]
  ): { headers: string[]; rows: string[][] } {
    
    if (sections.length >= 2) {
      // セクションベースのテーブル
      const headers = ['項目', '内容', '詳細']
      const rows = sections.slice(0, 5).map(section => [
        section.title,
        section.content.substring(0, 30),
        section.content.substring(30, 60) || '詳細'
      ])
      return { headers, rows }
    }
    
    if (items.length > 0) {
      // アイテムベースのテーブル
      const headers = ['項目', '内容', '重要度']
      const rows = items.slice(0, 5).map((item, index) => [
        `項目${index + 1}`,
        item,
        index % 2 === 0 ? '高' : '中'
      ])
      return { headers, rows }
    }
    
    // デフォルトテーブル
    return {
      headers: ['項目', '内容', '評価'],
      rows: [
        ['項目1', '内容1', '良い'],
        ['項目2', '内容2', '普通'],
        ['項目3', '内容3', '良い']
      ]
    }
  }

  /**
   * 文字数制限に従ってコンテンツを調整
   */
  static trimContentToLimits(
    templateData: TemplateData, 
    templateType: TemplateType
  ): TemplateData {
    const template = templateRegistry[templateType]
    if (!template) {
      return templateData
    }
    
    const limits = template.characterLimits
    const trimmed = { ...templateData }
    
    // タイトルの調整
    if (trimmed.title && trimmed.title.length > limits.title) {
      trimmed.title = trimmed.title.substring(0, limits.title - 3) + '...'
    }
    
    // コンテンツの調整
    if (trimmed.content && limits.content > 0 && trimmed.content.length > limits.content) {
      trimmed.content = trimmed.content.substring(0, limits.content - 3) + '...'
    }
    
    // サブタイトルの調整
    if (trimmed.subtitle && limits.subtitle > 0 && trimmed.subtitle.length > limits.subtitle) {
      trimmed.subtitle = trimmed.subtitle.substring(0, limits.subtitle - 3) + '...'
    }
    
    // 項目の調整
    if (trimmed.items && limits.items > 0) {
      trimmed.items = trimmed.items.map(item => {
        if (typeof item === 'string') {
          if (item.length > limits.items) {
            return item.substring(0, limits.items - 3) + '...'
          }
          return item
        } else {
          // Object type item
          const result = { ...item }
          if (result.title && result.title.length > limits.items) {
            result.title = result.title.substring(0, limits.items - 3) + '...'
          }
          if (result.content && result.content.length > limits.items) {
            result.content = result.content.substring(0, limits.items - 3) + '...'
          }
          return result
        }
      })
    }
    
    // テーブルデータの調整
    if (trimmed.tableData && limits.items > 0) {
      trimmed.tableData = {
        ...trimmed.tableData,
        rows: trimmed.tableData.rows.map(row => 
          row.map(cell => {
            if (cell.length > limits.items) {
              return cell.substring(0, limits.items - 3) + '...'
            }
            return cell
          })
        )
      }
    }
    
    return trimmed
  }

  /**
   * 配置結果を検証
   */
  private static validateLayout(
    structure: ContentStructure, 
    templateData: TemplateData, 
    templateType: TemplateType
  ): { success: boolean; notes: string[] } {
    
    const notes: string[] = []
    let success = true

    // テンプレートの文字数制限を取得
    const template = templateRegistry[templateType]
    if (!template) {
      notes.push(`テンプレート ${templateType} が見つかりません`)
      return { success: false, notes }
    }
    
    const limits = template.characterLimits

    // 基本的な検証
    if (!templateData.title) {
      notes.push('タイトルが設定されていません')
      success = false
    }

    // 文字数制限の検証
    if (templateData.title && templateData.title.length > limits.title) {
      notes.push(`タイトルが長すぎます (${templateData.title.length}文字/${limits.title}文字)`)
      success = false
    }
    
    if (templateData.content && limits.content > 0 && templateData.content.length > limits.content) {
      notes.push(`コンテンツが長すぎます (${templateData.content.length}文字/${limits.content}文字)`)
      success = false
    }
    
    if (templateData.subtitle && limits.subtitle > 0 && templateData.subtitle.length > limits.subtitle) {
      notes.push(`サブタイトルが長すぎます (${templateData.subtitle.length}文字/${limits.subtitle}文字)`)
      success = false
    }
    
    if (templateData.items && limits.items > 0) {
      templateData.items.forEach((item, index) => {
        const itemText = typeof item === 'string' ? item : (item.title || item.content || '')
        if (itemText.length > limits.items) {
          notes.push(`項目${index + 1}が長すぎます (${itemText.length}文字/${limits.items}文字)`)
          success = false
        }
      })
    }

    // テンプレートタイプ固有の検証
    switch (templateType) {
      case 'enumeration':
        if (!templateData.items || templateData.items.length === 0) {
          notes.push('項目リストが空です')
          success = false
        }
        break

      case 'explanation2':
        if (!templateData.content || templateData.content.length < 10) {
          notes.push('説明内容が不足しています')
          success = false
        }
        break

      case 'table':
        if (!templateData.tableData || templateData.tableData.rows.length === 0) {
          notes.push('テーブルデータが不足しています')
          success = false
        }
        // テーブルセルの文字数制限もチェック
        if (templateData.tableData && limits.items > 0) {
          templateData.tableData.rows.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
              if (cell.length > limits.items) {
                notes.push(`テーブル行${rowIndex + 1}列${cellIndex + 1}が長すぎます (${cell.length}文字/${limits.items}文字)`)
                success = false
              }
            })
          })
        }
        break
    }

    // 成功時のメッセージ
    if (success) {
      notes.push(`${templateType}テンプレートに正常に配置されました`)
    }

    return { success, notes }
  }
}