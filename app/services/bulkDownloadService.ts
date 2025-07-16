import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import { GeneratedContent } from './contentGeneratorService'

export interface DownloadItem {
  id: string
  pageNumber: number
  title: string
  selected: boolean
  element?: HTMLElement
}

export class BulkDownloadService {
  /**
   * 選択されたページを一括でダウンロード
   */
  async downloadSelectedPages(
    items: DownloadItem[],
    content: GeneratedContent,
    format: 'png' | 'pdf' | 'zip' = 'zip'
  ): Promise<void> {
    const selectedItems = items.filter(item => item.selected)
    
    if (selectedItems.length === 0) {
      throw new Error('ダウンロードするページが選択されていません')
    }

    if (selectedItems.length === 1) {
      // 単一ページの場合は直接ダウンロード
      await this.downloadSinglePage(selectedItems[0], content)
    } else {
      // 複数ページの場合はZIP形式でダウンロード
      await this.downloadAsZip(selectedItems, content)
    }
  }

  /**
   * 単一ページのダウンロード
   */
  private async downloadSinglePage(
    item: DownloadItem,
    content: GeneratedContent
  ): Promise<void> {
    if (!item.element) {
      throw new Error('ダウンロード対象の要素が見つかりません')
    }

    try {
      const canvas = await html2canvas(item.element, {
        background: '#ffffff',
        width: 850,
        height: 899,
        useCORS: true,
        logging: false,
        allowTaint: true
      })

      const link = document.createElement('a')
      link.download = `${this.sanitizeFileName(item.title)}-page-${item.pageNumber}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Single page download failed:', error)
      throw new Error(`ページ ${item.pageNumber} のダウンロードに失敗しました`)
    }
  }

  /**
   * ZIP形式での一括ダウンロード
   */
  private async downloadAsZip(
    items: DownloadItem[],
    content: GeneratedContent
  ): Promise<void> {
    const zip = new JSZip()
    const folder = zip.folder('instagram-posts')

    try {
      // 各ページを画像として追加
      for (const item of items) {
        if (!item.element) {
          console.warn(`Page ${item.pageNumber} element not found, skipping`)
          continue
        }

        const canvas = await html2canvas(item.element, {
            background: '#ffffff',
          width: 850,
          height: 899,
          useCORS: true,
          logging: false,
          allowTaint: true,
        })

        const imageData = canvas.toDataURL('image/png').split(',')[1]
        const fileName = `${String(item.pageNumber).padStart(2, '0')}-${this.sanitizeFileName(item.title)}.png`
        
        folder?.file(fileName, imageData, { base64: true })
      }

      // キャプションとハッシュタグをテキストファイルとして追加
      const captionContent = this.generateCaptionFile(content)
      folder?.file('caption-and-hashtags.txt', captionContent)

      // 投稿情報をJSONファイルとして追加
      const postInfo = this.generatePostInfo(content, items)
      folder?.file('post-info.json', JSON.stringify(postInfo, null, 2))

      // ZIPファイルを生成してダウンロード
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(zipBlob)
      link.download = `instagram-posts-${this.formatDate(new Date())}.zip`
      link.click()

      // メモリクリーンアップ
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Bulk download failed:', error)
      throw new Error('一括ダウンロードに失敗しました')
    }
  }

  /**
   * キャプションファイルを生成
   */
  private generateCaptionFile(content: GeneratedContent): string {
    const lines = [
      '=== Instagram投稿用キャプション ===',
      '',
      content.caption,
      '',
      '=== ハッシュタグ ===',
      '',
      '【メインハッシュタグ】',
      content.hashtags.primary.join(' '),
      '',
      '【サブハッシュタグ】',
      content.hashtags.secondary.join(' '),
      '',
      '【トレンドハッシュタグ】',
      content.hashtags.trending?.join(' ') || '',
      '',
      '=== 投稿情報 ===',
      `総ページ数: ${content.totalPages}`,
      `生成日時: ${this.formatDateTime(new Date())}`,
      '',
      '=== 使用方法 ===',
      '1. 画像をInstagramにアップロード',
      '2. キャプションをコピー＆ペースト',
      '3. ハッシュタグを追加',
      '4. 投稿完了！'
    ]

    return lines.join('\n')
  }

  /**
   * 投稿情報を生成
   */
  private generatePostInfo(content: GeneratedContent, items: DownloadItem[]): any {
    return {
      metadata: {
        totalPages: content.totalPages,
        selectedPages: items.length,
        generatedAt: new Date().toISOString(),
        downloadedAt: new Date().toISOString()
      },
      content: {
        summary: content.summary,
        caption: content.caption,
        hashtags: content.hashtags
      },
      pages: items.map(item => ({
        pageNumber: item.pageNumber,
        title: item.title,
        fileName: `${String(item.pageNumber).padStart(2, '0')}-${this.sanitizeFileName(item.title)}.png`
      }))
    }
  }

  /**
   * ファイル名をサニタイズ
   */
  private sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/[<>:"/\\|?*]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50)
  }

  /**
   * 日付フォーマット
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]
  }

  /**
   * 日時フォーマット
   */
  private formatDateTime(date: Date): string {
    return date.toLocaleString('ja-JP')
  }

  /**
   * 進捗状況を監視するためのコールバック付きダウンロード
   */
  async downloadWithProgress(
    items: DownloadItem[],
    content: GeneratedContent,
    onProgress?: (current: number, total: number) => void
  ): Promise<void> {
    const selectedItems = items.filter(item => item.selected)
    
    if (selectedItems.length === 0) {
      throw new Error('ダウンロードするページが選択されていません')
    }

    if (selectedItems.length === 1) {
      onProgress?.(1, 1)
      await this.downloadSinglePage(selectedItems[0], content)
      return
    }

    const zip = new JSZip()
    const folder = zip.folder('instagram-posts')

    try {
      // 各ページを処理
      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i]
        onProgress?.(i + 1, selectedItems.length + 2) // +2 for caption and zip generation

        if (!item.element) {
          console.warn(`Page ${item.pageNumber} element not found, skipping`)
          continue
        }

        // デバッグ用：要素の存在確認
        console.log(`Processing page ${item.pageNumber}, element info:`, {
          width: item.element.offsetWidth,
          height: item.element.offsetHeight,
          visible: item.element.offsetParent !== null,
          className: item.element.className,
          innerHTML: item.element.innerHTML.substring(0, 100) + '...'
        })

        // 少し待機してからキャプチャを実行
        await new Promise(resolve => setTimeout(resolve, 500))

        try {
          const canvas = await html2canvas(item.element, {
                background: '#ffffff',
            width: 850,
            height: 899,
            useCORS: true,
            logging: false,
            allowTaint: true
          })

          const imageData = canvas.toDataURL('image/png').split(',')[1]
          const fileName = `${String(item.pageNumber).padStart(2, '0')}-${this.sanitizeFileName(item.title)}.png`
          
          folder?.file(fileName, imageData, { base64: true })
        } catch (pageError) {
          console.error(`Failed to capture page ${item.pageNumber}:`, pageError)
          // スキップして次のページへ
          continue
        }
      }

      // キャプションとメタデータを追加
      onProgress?.(selectedItems.length + 1, selectedItems.length + 2)
      const captionContent = this.generateCaptionFile(content)
      folder?.file('caption-and-hashtags.txt', captionContent)

      const postInfo = this.generatePostInfo(content, selectedItems)
      folder?.file('post-info.json', JSON.stringify(postInfo, null, 2))

      // ZIPファイルを生成してダウンロード
      onProgress?.(selectedItems.length + 2, selectedItems.length + 2)
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(zipBlob)
      link.download = `instagram-posts-${this.formatDate(new Date())}.zip`
      link.click()

      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Bulk download with progress failed:', error)
      if (error instanceof Error) {
        throw new Error(`一括ダウンロードに失敗しました: ${error.message}`)
      } else {
        throw new Error('一括ダウンロードに失敗しました')
      }
    }
  }
}

export const bulkDownloadService = new BulkDownloadService()