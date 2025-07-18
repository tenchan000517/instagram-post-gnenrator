# 02. Instagram投稿生成システム - 完全データフロー解析

## 🔄 完全データフロー解析（テーマ選択〜ダウンロード）

Instagram投稿生成システムは、**テーマ選択からダウンロードまでの6段階の完全なデータ変換**により、生の入力テキストを最終的なPNG画像ダウンロードまで変換します。実装済みのシステムでは、各段階での実際のファイルパス・関数名・処理内容を完全に把握することで、システムの動作を100%予測可能になります。

## 📋 段階別データ変換詳細（実装済みシステム）

### 段階0: テーマ選択・フォーマッター処理（ResearchFormatter）

#### 実装ファイルパス
- **メイン**: `/app/research-formatter/page.tsx`
- **AI統合**: `/app/services/geminiClientSingleton.ts`
- **UIコンポーネント**: `ResearchFormatter.tsx`

#### テーマ選択機能
```typescript
// 7ジャンル対応の選択UI
const GENRE_OPTIONS = [
  { id: 'knowhow', label: 'ノウハウ・テクニック' },
  { id: 'strategy', label: '戦略・対策' },
  { id: 'book-recommendation', label: '書籍紹介' },
  { id: 'industry-features', label: '業界特徴' },
  { id: 'internship-deadline', label: 'インターン期限' },
  { id: 'entry-deadline', label: '本選考期限' },
  { id: 'step-learning', label: '段階的学習' }
]
```

#### AI呼び出し1: ジャンル特化フォーマット変換
```typescript
// 実際の処理: geminiClientSingleton.generateContent()
const formatPrompt = `あなたは${selectedGenre}ジャンルのエキスパートです。
以下の生データを、【ジャンル】: ${selectedGenre}形式でフォーマットしてください...`

// AI出力例
const formattedOutput = `【ジャンル】: strategy

志望動機が見つからない！内定獲得へ導く企業研究×自己分析攻略法！...`
```

#### URLパラメータ + LocalStorage連携
```typescript
// handleUseInSystem()
const targetUrl = '/?input=' + encodeURIComponent(formattedResult.formatted)
localStorage.setItem('formatted_content', formattedResult.formatted)
localStorage.setItem('formatted_content_timestamp', Date.now().toString())
window.open(targetUrl, '_blank')
```

---

### 段階1: メインシステムでのデータ受け取り（ContentInput）

#### 入力データ形式
```typescript
// ResearchFormatter.tsx での出力
interface FormatterOutput {
  formatted: string  // 【ジャンル】: xxx 形式の構造化テキスト
  source: 'formatter' | 'direct'
}
```

#### 実際のデータ例
```text
【ジャンル】: strategy

志望動機が見つからない！内定獲得へ導く企業研究×自己分析攻略法！

□ 自己分析徹底！過去の経験から「自分軸」を発見
    * 過去の経験を棚卸しし、成功・失敗体験、興味をリストアップ。
    * MBTIやストレングスファインダーで強み・弱みを客観的に把握し、
      家族・友人・キャリアセンターに意見を求める（ステップ1-3）。

□ 企業研究徹底！企業の魅力と自分の強みを繋げる
    * 企業のホームページ、IR情報、ニュースリリース、SNS、
      社員インタビューを参考に、事業内容、ビジョン、企業文化、
      求める人物像を収集。競合他社を分析し、業界動向を把握（ステップ1-3）。

[... 続く ...]
```

#### ContentInput.tsx での受取処理
```typescript
// app/components/ContentInput.tsx
useEffect(() => {
  // 1. LocalStorage優先（5分以内のデータ）
  const stored = localStorage.getItem('formatted_content')
  if (stored) {
    const parsed = JSON.parse(stored)
    const isRecent = Date.now() - parsed.timestamp < 5 * 60 * 1000 // 5分
    if (isRecent) {
      setContent(parsed.content)
      return
    }
  }
  
  // 2. URLパラメータフォールバック
  const urlParams = new URLSearchParams(window.location.search)
  const inputParam = urlParams.get('input')
  if (inputParam) {
    const decodedInput = decodeURIComponent(inputParam)
    setContent(decodedInput)
  }
}, [])
```

#### 出力データ形式
```typescript
// ContentInput state
content: string  // デコード済みの完全テキスト
// 例: "【ジャンル】: strategy\n\n志望動機が見つからない！..."

// メインフローに渡し：NewFlowPostGenerator.handleContentSubmit()
```

---

### 段階2-1: 高品質コンテンツ生成統合処理（ContentGeneratorService）

#### 実装ファイルパス
- **メイン**: `/app/services/contentGeneratorService.ts`
- **関数**: `generateHighQualityContent(input: string): Promise<GeneratedContent>`

#### 処理フロー
```typescript
// 段階2-1: メイン統合処理
export const contentGeneratorService = {
  async generateHighQualityContent(input: string): Promise<GeneratedContent> {
    // 1. ページ構造分析（AI呼び出し2）
    const pageStructures = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input)
    
    // 2. 構造制約コンテンツ生成（AI呼び出し3）
    const generatedPages = await structureConstrainedGenerator.generateAllPagesWithConstraints(pageStructures, input)
    
    // 3. テンプレートデータ変換
    const convertedPages = generatedPages.map(page => this.convertToTemplateData(page))
    
    // 4. キャプション生成（AI呼び出し4）
    const caption = await this.generateCaptionForPages(convertedPages)
    
    // 5. ハッシュタグ生成（AI呼び出し5）
    const hashtags = await this.generateHashtagsForContent(convertedPages)
    
    return { pages: convertedPages, caption, hashtags, ... }
  }
}
```

### 段階2-2: ページ構造分析（AI呼び出し2）

#### 実装ファイルパス
- **メイン**: `/app/services/pageStructureAnalyzer.ts`
- **関数**: `analyzePageStructureAndTemplates(input: string): Promise<PageStructure[]>`
- **AI統合**: `geminiClientSingleton.ts`

#### 入力データ形式
```typescript
// pageStructureAnalyzer.analyzePageStructureAndTemplates()
input: string  // 段階1からの完全テキスト
```

#### 処理フロー詳細

##### 2-1: ジャンル抽出
```typescript
// app/services/pageStructureAnalyzer.ts - extractGenreFromInput()
private extractGenreFromInput(input: string): Genre | null {
  const genrePattern = /【ジャンル】\s*[:：]\s*([a-zA-Z-]+)/i
  const match = input.match(genrePattern)
  return match ? match[1] as Genre : null
}

// 結果例: "strategy"
```

##### 2-2: ジャンル検証・設定取得
```typescript
// app/services/genreDetector.ts - detectGenre()
export const genreDetector = {
  detectGenre(input: string, userHint?: Genre): Genre {
    const extractedGenre = this.extractGenreFromInput(input)
    return userHint || extractedGenre || 'knowhow'  // デフォルト
  }
}

// app/services/genreDetector.ts - getGenreConfig()
const genreConfig = {
  strategy: {
    optimalItemCount: { min: 4, max: 6 },
    keywords: ['面接', '対策', 'ES', '志望動機', '自己分析'],
    preferredTemplates: ['section-items', 'simple5', 'checklist-enhanced']
  }
}
```

##### 2-3: AI構造分析実行
```typescript
// AI呼び出し2実行
const prompt = `あなたは${genre}分野のエキスパートです。以下のコンテンツを分析し、
最適なページ構造とテンプレートを選択してください...`

const aiResponse = await geminiClientSingleton.generateContent([
  { role: 'user', parts: [{ text: prompt }] }
])

// AI応答例
const structureResult = {
  "pages": [
    {
      "pageNumber": 1,
      "title": "自己分析で「自分軸」を発見！",
      "template": "section-items",
      "theme": "自己分析徹底攻略",
      "reasoning": "複数のステップがあり、セクション構造が最適"
    },
    {
      "pageNumber": 2,
      "title": "企業研究徹底攻略！",
      "template": "section-items", 
      "theme": "企業研究手法",
      "reasoning": "詳細な分析手順をセクション分けで表現"
    }
    // ... 4ページ構成
  ]
}
```

#### 出力データ形式
```typescript
interface PageStructure {
  pageNumber: number      // 1
  title: string          // "自己分析で「自分軸」を発見！"
  template: TemplateType // "section-items"
  theme: string          // "自己分析徹底攻略"
  reasoning: string      // "複数のステップがあり、セクション構造が最適"
}

// 結果: PageStructure[] （通常4ページ）
```

---

### 段階3: 構造制約コンテンツ生成（AI呼び出し3）

#### 実装ファイルパス
- **メイン**: `/app/services/structureConstrainedGenerator.ts`
- **関数**: `generateAllPagesWithConstraints(structures: PageStructure[], originalInput: string): Promise<GeneratedPage[]>`

#### 入力データ形式
```typescript
structures: PageStructure[]  // 段階2の結果
originalInput: string        // 元の完全テキスト
```

#### 処理フロー詳細

##### 3-1: 構造制約プロンプト生成
```typescript
// app/services/templateStructureDefinitions.ts - generateStructurePrompt()
import { templateStructureDefinitions } from './templateStructureDefinitions'

const getConstraintsForTemplate = (templateType: TemplateType): string => {
  return templateStructureDefinitions[templateType]?.constraints || ''
}

// 例: section-itemsテンプレートの制約
const sectionItemsConstraints = `
# section-items テンプレート構造制約

## 必須フィールド
- title: メインタイトル (20文字以内)
- sections: セクション配列 (2-4個)
  - title: セクションタイトル (15文字以内) 
  - content: セクション説明 (100文字以内)
  - items: アイテム配列 (2-5個、各30文字以内)

## 禁止事項
- マークダウン記法の使用
- 外部リンクの挿入
- 改行の多用
`
```

##### 3-2: AI一括生成実行
```typescript
// 一括生成プロンプト構築
const generatePrompt = `以下のページ構造に従って、完全なコンテンツを生成してください：

${structures.map(structure => `
ページ${structure.pageNumber}: ${structure.title}
テンプレート: ${structure.template}
テーマ: ${structure.theme}

${getConstraintsForTemplate(structure.template)}
`).join('\n')}

元コンテンツ：
${originalInput}

出力形式：JSON
{ "pages": [{ "pageNumber": 1, "title": "...", "content": {...} }] }`

// AI呼び出し3実行
const aiResponse = await geminiClientSingleton.generateContent([
  { role: 'user', parts: [{ text: generatePrompt }] }
])
```

##### 3-3: AI生成結果例
```json
{
  "pages": [
    {
      "pageNumber": 1,
      "title": "自己分析で「自分軸」を発見！",
      "content": {
        "title": "自己分析で「自分軸」を発見！",
        "sections": [
          {
            "title": "過去の経験を棚卸し",
            "content": "成功・失敗体験、興味をリストアップ。MBTIやストレングスファインダーで強み・弱みを客観的に把握し、家族・友人・キャリアセンターに意見を求める",
            "items": [
              "過去の経験をリストアップ", 
              "MBTI/ストレングスファインダーで自己分析",
              "家族・友人・キャリアセンターに意見を求める"
            ]
          }
        ],
        "badgeText": "自己分析"
      }
    },
    // 他3ページも同様の構造
  ]
}
```

##### 3-4: 堅牢なJSON解析処理
```typescript
// app/services/structureConstrainedGenerator.ts - parseGeneratedJSON()
private parseGeneratedJSON(text: string): any {
  try {
    // 1. コードブロック除去
    let cleanText = text.replace(/```json\n?|```\n?/g, '').trim()
    
    // 2. 制御文字除去
    cleanText = cleanText.replace(/[\x00-\x1F\x7F]/g, '')
    
    // 3. スマートクォート変換
    cleanText = cleanText.replace(/[""]/g, '"').replace(/['']/g, "'")
    
    // 4. JSON抽出
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      cleanText = jsonMatch[0]
    }
    
    // 5. 解析実行
    return JSON.parse(cleanText)
  } catch (error) {
    console.error('JSON解析エラー:', error)
    throw new Error(`JSON解析に失敗: ${error.message}`)
  }
}
```

#### 出力データ形式
```typescript
interface GeneratedPage {
  pageNumber: number
  title: string
  templateType: TemplateType  // "section-items"
  content: {
    [key: string]: any  // 構造化されたコンテンツ
  }
  rankingData?: any[]
  graphData?: any
}

// 結果: GeneratedPage[]（4ページの配列）
```

---

### 段階4: テンプレートデータ変換

#### 入力データ形式
```typescript
// contentGeneratorService.convertToTemplateData()
content: any          // GeneratedPage.contentの構造化データ
templateType: TemplateType  // "section-items"
```

#### 処理フロー詳細

##### 4-1: マークダウン除去処理
```typescript
// app/utils/markdownUtils.ts
function removeMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // **bold** → bold
    .replace(/\*(.*?)\*/g, '$1')      // *italic* → italic
    .replace(/`(.*?)`/g, '$1')        // `code` → code
    .replace(/#{1,6}\s?/g, '')        // # header → header
    .replace(/^\s*[-*+]\s+/gm, '')    // - list → list
    .replace(/^\s*\d+\.\s+/gm, '')    // 1. list → list
    .trim()
}
```

##### 4-2: section-itemsテンプレートの変換ロジック
```typescript
// app/services/contentGeneratorService.ts - convertToTemplateData()
case 'section-items':
  // マークダウン除去
  const cleanTitle = removeMarkdown(content.title || '')
  const cleanSections = (content.sections || []).map(section => ({
    title: removeMarkdown(section.title || ''),
    content: removeMarkdown(section.content || ''),
    items: (section.items || []).map(item => removeMarkdown(item))
  }))
  
  // テンプレートデータ構築
  const result = {
    title: cleanTitle,                          // "自己分析で「自分軸」を発見！"
    content: removeMarkdown(content.content || ''),      // ""
    description: removeMarkdown(content.description || ''), // ""
    subtitle: removeMarkdown(content.subtitle || ''),    // ""
    badgeText: removeMarkdown(content.badgeText || ''),  // "自己分析"
    items: content.items || [],                 // []
    sections: cleanSections,                    // [{ title: "過去の経験を棚卸し", content: "...", items: [...] }]
    
    // 他テンプレート用の空フィールド
    steps: [],
    checklistItems: [],
    tableData: { headers: [], rows: [] },
    points: [],
    checklist: [],
    twoColumn: { left: [], right: [] },
    rankingData: [],
    graphData: null
  }
  
  return result
```

##### 4-3: 分解文字列オブジェクトの再構築
```typescript
// 文字列が数値キーオブジェクトに分解された場合の対処
function reconstructString(obj: any): string {
  if (typeof obj === 'string') return obj
  if (typeof obj === 'object' && obj !== null) {
    const keys = Object.keys(obj).sort((a, b) => parseInt(a) - parseInt(b))
    if (keys.every(key => /^\d+$/.test(key))) {
      return keys.map(key => obj[key]).join('')
    }
  }
  return String(obj)
}
```

#### 出力データ形式
```typescript
interface TemplateData {
  title: string                           // "自己分析で「自分軸」を発見！"
  content: string                         // ""
  description: string                     // ""
  subtitle: string                        // ""
  badgeText: string                       // "自己分析"
  items: []                              // []
  sections: Array<{                      // メインデータ
    title: string                        // "過去の経験を棚卸し"
    content: string                      // "成功・失敗体験、興味をリストアップ..."
    items: string[]                      // ["過去の経験をリストアップ", ...]
  }>
  // ... 他16個のフィールド（全て初期化済み）
}
```

---

### 段階5: UI表示レンダリング

#### 入力データ形式
```typescript
// React コンポーネントでの受取
interface GeneratedPage {
  pageNumber: number
  templateType: TemplateType              // "section-items"
  templateData: TemplateData              // 段階4の変換結果
}
```

#### 処理フロー詳細

##### 5-1: 動的コンポーネント選択
```typescript
// app/components/EditablePostGenerator.tsx - renderCurrentPage()
const currentPage = generatedContent.pages[currentPageIndex]
const SelectedTemplate = templateComponents[currentPage.templateType]
// SelectedTemplate = SectionItemsTemplate

if (!SelectedTemplate) {
  return <div>テンプレートが見つかりません: {currentPage.templateType}</div>
}

return (
  <SelectedTemplate 
    templateData={currentPage.templateData}
  />
)
```

##### 5-2: SectionItemsTemplateでの表示処理
```tsx
// app/components/templates/SectionItemsTemplate.tsx
export const SectionItemsTemplate: React.FC<TemplateProps> = ({ templateData }) => {
  return (
    <InstagramPostTemplate>
      <div className="h-full flex flex-col justify-between p-6 relative">
        
        {/* メインタイトル表示 */}
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-center mb-4">
            {templateData.title}
            {/* 表示される内容: "自己分析で「自分軸」を発見！" */}
          </h1>

          {/* バッジ表示 */}
          {templateData.badgeText && (
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium text-center mb-4">
              {templateData.badgeText}
              {/* 表示される内容: "自己分析" */}
            </div>
          )}

          {/* セクション一覧表示 */}
          {templateData.sections?.map((section, index) => (
            <div key={index} className="bg-white/90 rounded-lg p-4 shadow-sm mb-4">
              
              {/* セクションタイトル */}
              <h2 className="font-bold text-lg text-blue-600 mb-2">
                {section.title}
                {/* 表示される内容: "過去の経験を棚卸し" */}
              </h2>
              
              {/* セクション説明 */}
              <p className="text-sm text-gray-700 mb-3">
                {section.content}
                {/* 表示される内容: "成功・失敗体験、興味をリストアップ。MBTIやストレングスファインダーで..." */}
              </p>
              
              {/* アイテム一覧 */}
              {section.items && section.items.length > 0 && (
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      <span className="text-sm text-gray-600">
                        {item}
                        {/* 表示される内容: "過去の経験をリストアップ", "MBTI/ストレングスファインダーで自己分析", ... */}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </InstagramPostTemplate>
  )
}
```

##### 5-3: 最終的なDOM要素
```html
<!-- メインタイトル -->
<h1 class="text-xl font-bold text-center mb-4">
  自己分析で「自分軸」を発見！
</h1>

<!-- バッジ -->
<div class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium text-center mb-4">
  自己分析
</div>

<!-- セクション -->
<div class="bg-white/90 rounded-lg p-4 shadow-sm mb-4">
  <h2 class="font-bold text-lg text-blue-600 mb-2">
    過去の経験を棚卸し
  </h2>
  <p class="text-sm text-gray-700 mb-3">
    成功・失敗体験、興味をリストアップ。MBTIやストレングスファインダーで強み・弱みを客観的に把握し、家族・友人・キャリアセンターに意見を求める（ステップ1-3）。
  </p>
  <ul class="space-y-1">
    <li class="flex items-center space-x-2">
      <span class="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
      <span class="text-sm text-gray-600">過去の経験をリストアップ</span>
    </li>
    <li class="flex items-center space-x-2">
      <span class="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
      <span class="text-sm text-gray-600">MBTI/ストレングスファインダーで自己分析</span>
    </li>
    <li class="flex items-center space-x-2">
      <span class="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
      <span class="text-sm text-gray-600">家族・友人・キャリアセンターに意見を求める</span>
    </li>
  </ul>
</div>
```

---

### 段階6: 画像生成・ダウンロード（BulkDownloadService）

#### 実装ファイルパス
- **メイン**: `/app/services/bulkDownloadService.ts`
- **UI統合**: `EditablePostGenerator.tsx`
- **ライブラリ**: `html2canvas`, `JSZip`

#### 単一ページダウンロード
```typescript
// 実際の処理: handleDownload()
const currentPageElement = downloadPageRefs.current[pageIndex]
const canvas = await html2canvas(currentPageElement, {
  background: '#ffffff',
  width: 850,
  height: actualHeight,  // 実際の要素高さを使用
  useCORS: true,
  allowTaint: false
})

const link = document.createElement('a')
link.download = `instagram-post-page-${currentPage + 1}.png`
link.href = canvas.toDataURL('image/png')
link.click()
```

#### 一括ダウンロード（ZIP形式）
```typescript
// BulkDownloadService.downloadSelectedPages()
const zip = new JSZip()
const folder = zip.folder('instagram-posts')

// 各ページを画像として追加
for (const item of selectedItems) {
  const canvas = await html2canvas(item.element, {
    background: '#ffffff',
    width: 850,
    height: 899,
    useCORS: true,
    allowTaint: true
  })
  
  const imageData = canvas.toDataURL('image/png').split(',')[1]
  const fileName = `${String(item.pageNumber).padStart(2, '0')}-${title}.png`
  folder?.file(fileName, imageData, { base64: true })
}

// キャプション・ハッシュタグファイル追加
folder?.file('caption-and-hashtags.txt', captionContent)
folder?.file('post-info.json', JSON.stringify(postInfo, null, 2))

// ZIPファイル生成・ダウンロード
const zipBlob = await zip.generateAsync({ type: 'blob' })
const link = document.createElement('a')
link.href = URL.createObjectURL(zipBlob)
link.download = `instagram-posts-${formatDate(new Date())}.zip`
link.click()
```

#### ダウンロードファイル構成
```
instagram-posts-2025-07-18.zip
├── 01-自己分析で「自分軸」を発見！.png
├── 02-企業研究徹底！.png
├── 03-志望動機作成のコツ.png
├── 04-面接対策完全ガイド.png
├── caption-and-hashtags.txt
└── post-info.json
```

#### 出力最終結果
- **PNG画像**: 850x899pxの高品質画像ファイル
- **キャプションファイル**: Instagram投稿用テキスト
- **メタデータ**: 生成情報・JSONファイル
- **使用方法**: Instagramアップロード手順

---

## 🔄 完全データフローマップ（実装済み）

### 全段階の統合フロー
```
【段階0】 テーマ選択・フォーマッター
生データ → [ResearchFormatter] → AI呼び出し1 → 【ジャンル】:フォーマット済みテキスト
↓ URLパラメータ + LocalStorage
【段階1】 メインシステム受け取り
フォーマット済みテキスト → [ContentInput] → 完全テキスト
↓ ContentGeneratorService
【段階2-1】 高品質コンテンツ生成統合
完全テキスト → [ContentGeneratorService] → GeneratedContent
  ┣━ [PageStructureAnalyzer] → AI呼び出し2 → PageStructure[]
  ┣━ [StructureConstrainedGenerator] → AI呼び出し3 → GeneratedPage[]
  ┣━ [convertToTemplateData] → TemplateData[]
  ┣━ AI呼び出し4 → キャプション
  ┗━ AI呼び出し5 → ハッシュタグ
↓ EditablePostGenerator
【段階5】 UI表示・編集
GeneratedContent → [16テンプレート] → DOM表示
↓ BulkDownloadService
【段階6】 画像生成・ダウンロード
DOM表示 → [html2canvas] → PNG画像 → [JSZip] → ダウンロード
```

### Gemini API呼び出し詳細（5回）
1. **フォーマッター**: 生データ → ジャンル特化フォーマット
2. **ページ構造分析**: フォーマット済み → ページ構造・テンプレート選択
3. **構造制約生成**: 構造要件 → 完全コンテンツ
4. **キャプション生成**: ページ内容 → Instagram最適化キャプション
5. **ハッシュタグ生成**: コンテンツ → カテゴリ別ハッシュタグ

### 主要ファイルパス一覧
```
テーマ選択・フォーマッター:
/app/research-formatter/page.tsx

メインフロー:
/app/page.tsx → NewFlowPostGenerator.tsx
/app/components/ContentInput.tsx
/app/components/EditablePostGenerator.tsx

AI統合・コンテンツ生成:
/app/services/geminiClientSingleton.ts
/app/services/contentGeneratorService.ts
/app/services/pageStructureAnalyzer.ts
/app/services/structureConstrainedGenerator.ts

テンプレートシステム:
/app/components/templates/ (16ファイル)
/app/components/editors/ (14ファイル)
/app/services/templateStructureDefinitions.ts

ダウンロードシステム:
/app/services/bulkDownloadService.ts
```

## 😨 エラーハンドリングとフォールバック

### 各段階でのエラー対策

#### 段階0-1: データ受け渡しエラー
```typescript
// URLパラメータ制限超過 → LocalStorageフォールバック
// LocalStorage期限切れ → 手動入力促進
// デコードエラー → エラー表示とリセット
```

#### 段階2-5: AI応答エラー
```typescript
// AI応答失敗 → リトライ機構（最大3回）
// JSON解析失敗 → 構造分析結果のフォールバック
// 生成コンテンツ不備 → デフォルトテンプレート適用
// 制限時間超過 → 段階的降級処理
```

#### 段階6: ダウンロードエラー
```typescript
// html2canvas失敗 → エラーログとスキップ
// ZIP生成失敗 → 個別ダウンロードに切り替え
// ブラウザ制限 → ユーザー操作促進
```

### データ整合性保証
```typescript
// 型ガードによる実行時検証
// フィールド存在チェック
// デフォルト値による安全性確保
// エラー境界によるUI保護
```

## 🎯 システムフロー完全理解の達成

この完全データフロー解析により、Instagram投稿生成システムの**テーマ選択からダウンロードまでの全段階**、**実装済み機能詳細**、**実際のファイルパス・関数名**を完全に理解できます。

### 達成された理解レベル
- **✅ テーマ選択機能**: 7ジャンル対応ResearchFormatterの完全理解
- **✅ 5段階AI統合**: Gemini API 5回呼び出しの詳細フロー
- **✅ 16テンプレートシステム**: データ変換からUI表示まで
- **✅ ダウンロードシステム**: html2canvas + JSZipの高度システム
- **✅ エラーハンドリング**: 各段階の堅牢なフォールバック

次の「03_BUTTERFLY_EFFECT_ANALYSIS.md」で、システム修正時の影響範囲予測を学習してください。