// Markdown処理ユーティリティ
export class MarkdownUtils {
  /**
   * マークダウン記法を除去する
   */
  static removeMarkdown(text: string | any): string {
    if (!text || typeof text !== 'string') return String(text || '')
    
    return text
      // 絵文字を完全除去（結合文字・修飾子含む）
      .replace(/[\u{1F000}-\u{1FAFF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{200D}]/gu, '')
      // **太字** を除去
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      // *斜体* を除去
      .replace(/\*([^*]+)\*/g, '$1')
      // `コード` を除去
      .replace(/`([^`]+)`/g, '$1')
      // # ヘッダー を除去
      .replace(/^#{1,6}\s+/gm, '')
      // [リンク](URL) を除去
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // > 引用 を除去
      .replace(/^>\s+/gm, '')
      // --- 区切り線 を除去
      .replace(/^---+$/gm, '')
      // HTML tags を除去
      .replace(/<[^>]+>/g, '')
      // 連続する空白を正規化
      .replace(/\s+/g, ' ')
      .trim()
  }

  /**
   * マークダウン記法をHTMLに変換する（基本的な対応のみ）
   */
  static convertToHtml(text: string): string {
    if (!text) return text
    
    return text
      // **太字** → <strong>
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // *斜体* → <em>
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // `コード` → <code>
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // 改行を<br>に変換
      .replace(/\n/g, '<br>')
  }

  /**
   * マークダウン記法をReactのJSX記法に変換する
   */
  static convertToReactComponents(text: string): Array<{ type: 'text' | 'strong' | 'em' | 'code', content: string }> {
    if (!text) return [{ type: 'text', content: '' }]
    
    const parts: Array<{ type: 'text' | 'strong' | 'em' | 'code', content: string }> = []
    let currentText = text
    
    // **太字** を処理
    currentText = currentText.replace(/\*\*([^*]+)\*\*/g, (match, content) => {
      parts.push({ type: 'strong', content })
      return `__STRONG_${parts.length - 1}__`
    })
    
    // *斜体* を処理
    currentText = currentText.replace(/\*([^*]+)\*/g, (match, content) => {
      parts.push({ type: 'em', content })
      return `__EM_${parts.length - 1}__`
    })
    
    // `コード` を処理
    currentText = currentText.replace(/`([^`]+)`/g, (match, content) => {
      parts.push({ type: 'code', content })
      return `__CODE_${parts.length - 1}__`
    })
    
    // 残りのテキストを分割して結果を構築
    const result: Array<{ type: 'text' | 'strong' | 'em' | 'code', content: string }> = []
    const textParts = currentText.split(/(__(?:STRONG|EM|CODE)_\d+__)/)
    
    textParts.forEach(part => {
      if (part.startsWith('__STRONG_')) {
        const index = parseInt(part.match(/__STRONG_(\d+)__/)?.[1] || '0')
        result.push(parts[index])
      } else if (part.startsWith('__EM_')) {
        const index = parseInt(part.match(/__EM_(\d+)__/)?.[1] || '0')
        result.push(parts[index])
      } else if (part.startsWith('__CODE_')) {
        const index = parseInt(part.match(/__CODE_(\d+)__/)?.[1] || '0')
        result.push(parts[index])
      } else if (part) {
        result.push({ type: 'text', content: part })
      }
    })
    
    return result.length > 0 ? result : [{ type: 'text', content: text }]
  }
}