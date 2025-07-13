// INDEX生成サービス - 生成コンテンツから目次ページを作成
import { TemplateData } from '../components/templates/TemplateTypes'

export interface IndexData {
  title: string
  subtitle?: string
  content?: string
  items: string[]
}

export class IndexGeneratorService {
  /**
   * 生成されたコンテンツリストから INDEX データを生成
   * @param generatedContents 生成されたコンテンツの配列
   * @param mainTheme 全体のメインテーマ（ユーザー入力から）
   * @returns INDEX テンプレート用のデータ
   */
  static generateIndexData(generatedContents: TemplateData[], mainTheme: string): TemplateData {
    console.log('🏗️ INDEX データ生成開始')
    console.log('================================================================================')
    console.log(`📝 メインテーマ: "${mainTheme}"`)
    console.log(`📄 コンテンツ数: ${generatedContents.length}ページ`)
    
    // 各ページのタイトルから項目リストを作成
    const items = generatedContents.map((content, index) => {
      const originalTitle = content.title || `ページ${index + 1}`
      
      // タイトルから最大5文字程度の短縮版を作成
      const shortTitle = this.createShortTitle(originalTitle)
      
      console.log(`  ${index + 1}. 元タイトル: "${originalTitle}" → 短縮: "${shortTitle}"`)
      
      return shortTitle
    })
    
    const indexData: TemplateData = {
      title: `INDEX：${mainTheme}`,
      subtitle: `全${generatedContents.length}ページの構成`,
      content: `このコンテンツは${generatedContents.length}つの項目で構成されています。`,
      items: items,
      badgeText: 'INDEX',
      pageNumber: 0 // INDEXページは特別扱い
    }
    
    console.log('✅ INDEX データ生成完了')
    console.log(`📋 生成された項目:`)
    items.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item}`)
    })
    console.log('================================================================================')
    
    return indexData
  }
  
  /**
   * タイトルから短縮版を作成（最大5文字程度）
   * @param originalTitle 元のタイトル
   * @returns 短縮されたタイトル
   */
  private static createShortTitle(originalTitle: string): string {
    // 「：」で分割されている場合は後半部分を使用
    let cleanTitle = originalTitle
    if (originalTitle.includes('：')) {
      cleanTitle = originalTitle.split('：')[1]?.trim() || originalTitle
    }
    
    // 不要な文字を除去
    cleanTitle = cleanTitle
      .replace(/【.*?】/g, '') // 【】内を除去
      .replace(/\[.*?\]/g, '') // []内を除去
      .replace(/（.*?）/g, '') // （）内を除去
      .replace(/\(.*?\)/g, '') // ()内を除去
      .replace(/\s+/g, '') // 空白を除去
      .trim()
    
    // 5文字以内に短縮
    if (cleanTitle.length <= 5) {
      return cleanTitle
    }
    
    // 単語の境界で分割を試みる
    const words = cleanTitle.split(/[・、。！？]/)
    if (words[0] && words[0].length <= 5) {
      return words[0]
    }
    
    // それでも長い場合は単純に切り取り
    return cleanTitle.substring(0, 5)
  }
  
  /**
   * 選択された画像のみでINDEXを生成（ダウンロード用）
   * @param selectedContents 選択された（ダウンロード対象の）コンテンツ
   * @param mainTheme 全体のメインテーマ
   * @returns 選択されたコンテンツのみのINDEXデータ
   */
  static generateIndexDataForSelected(selectedContents: TemplateData[], mainTheme: string): TemplateData {
    console.log('🏗️ 選択コンテンツ用 INDEX データ生成開始')
    console.log('================================================================================')
    console.log(`📝 メインテーマ: "${mainTheme}"`)
    console.log(`📄 選択されたコンテンツ数: ${selectedContents.length}ページ`)
    
    // 選択されたコンテンツのみから項目リストを作成
    const items = selectedContents.map((content, index) => {
      const originalTitle = content.title || `ページ${index + 1}`
      const shortTitle = this.createShortTitle(originalTitle)
      
      console.log(`  ${index + 1}. 元タイトル: "${originalTitle}" → 短縮: "${shortTitle}"`)
      
      return shortTitle
    })
    
    const indexData: TemplateData = {
      title: `INDEX：${mainTheme}`,
      subtitle: `選択した${selectedContents.length}ページの構成`,
      content: `選択されたコンテンツは${selectedContents.length}つの項目で構成されています。`,
      items: items,
      badgeText: 'INDEX',
      pageNumber: 0
    }
    
    console.log('✅ 選択コンテンツ用 INDEX データ生成完了')
    console.log('================================================================================')
    
    return indexData
  }
  
  /**
   * コンテンツリストにINDEXページを先頭に挿入
   * @param contents 既存のコンテンツリスト
   * @param indexData INDEXデータ
   * @returns INDEXを含む新しいコンテンツリスト
   */
  static insertIndexAtBeginning(contents: TemplateData[], indexData: TemplateData): TemplateData[] {
    console.log('📝 コンテンツリストにINDEXを挿入')
    
    // INDEXを先頭に追加し、他のページ番号を調整
    const updatedContents = [indexData, ...contents.map((content, index) => ({
      ...content,
      pageNumber: index + 1 // INDEXを除いて1から開始
    }))]
    
    console.log(`✅ INDEXページを先頭に挿入完了（全${updatedContents.length}ページ）`)
    
    return updatedContents
  }
}