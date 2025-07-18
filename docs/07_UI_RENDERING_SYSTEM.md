# 07. Instagram投稿生成システム - UI表示システム実装調査

## 🎨 UI表示システム実装状況調査

Instagram投稿生成システムのUI表示システムの実装調査結果です。**React 18 + TypeScript + Tailwind CSS**による高度に統合されたコンポーネントシステムが実装済みであり、データフロー最終段階でTemplateDataを受け取り、**16種類のテンプレート**による動的レンダリングが実装済みであることが確認されました。

### 実装調査で確認されたUI表示の基本原則
- **コンポーネント分離**: テンプレート・エディター・UI制御の明確な分離で実装済み
- **動的テンプレート選択**: TemplateTypeによる実行時コンポーネント選択で実装済み
- **型安全な表示**: TypeScriptによる表示データの型保証で実装済み
- **レスポンシブ設計**: Instagram投稿サイズ（1080x1080px）最適化で実装済み

## 📱 実装済みメインUI構造

### 実装済みアプリケーションフロー
```
NewFlowPostGenerator (メインエントリーポイント)
├── ContentInput (入力UI)
├── ContentApprovalComponent (承認UI)
└── EditablePostGenerator (編集・表示UI)
    ├── Template Selector
    ├── Template Display
    ├── Template Editor
    └── Download Interface
```

### 実装済み主要コンポーネント階層
```typescript
// app/components/NewFlowPostGenerator.tsx
export default function NewFlowPostGenerator() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState<'input' | 'approval' | 'editing'>('input')

  // ステップ制御とデータフロー管理
}
```

## 🔄 実装済みUI状態管理詳細

### 1. NewFlowPostGenerator - 実装済みメインステート管理

#### 実装済み主要ステート定義
```typescript
interface UIState {
  // コンテンツ生成状態
  generatedContent: GeneratedContent | null
  isGenerating: boolean
  generationError: string | null
  
  // UI制御状態
  currentStep: 'input' | 'approval' | 'editing'
  
  // ページ制御状態
  currentPageIndex: number
  totalPages: number
  
  // 編集状態
  isEditing: boolean
  hasUnsavedChanges: boolean
}
```

#### ステート変更フロー
```typescript
// 1. 初期状態 → 生成中
const handleGenerate = async (content: string) => {
  setIsGenerating(true)
  setCurrentStep('input')
  
  try {
    const result = await contentGeneratorService.generateContent(content)
    setGeneratedContent(result)
    setCurrentStep('approval')
  } catch (error) {
    setGenerationError(error.message)
  } finally {
    setIsGenerating(false)
  }
}

// 2. 承認 → 編集
const handleApproval = () => {
  setCurrentStep('editing')
  setCurrentPageIndex(0)
}

// 3. 編集中のページ変更
const handlePageChange = (index: number) => {
  if (hasUnsavedChanges) {
    // 未保存変更の確認ダイアログ
    showConfirmDialog()
  }
  setCurrentPageIndex(index)
}
```

### 2. EditablePostGenerator - 編集・表示制御

#### 動的テンプレート選択システム
```typescript
// app/components/EditablePostGenerator.tsx
const templateComponents: Record<TemplateType, React.ComponentType<any>> = {
  'index': IndexTemplate,
  'enumeration': EnumerationTemplate,
  'list': ListTemplate,
  'explanation2': ExplanationTwoTemplate,
  'simple3': SimpleThreeTemplate,
  'table': TableTemplate,
  'simple5': SimpleFiveTemplate,
  'simple6': SimpleSixTemplate,
  'section-items': SectionItemsTemplate,
  'two-column-section-items': TwoColumnSectionItemsTemplate,
  'title-description-only': TitleDescriptionOnlyTemplate,
  'checklist-enhanced': ChecklistEnhancedTemplate,
  'item-n-title-content': ItemNTitleContentTemplate,
  'single-section-no-items': SingleSectionNoItemsTemplate,
  'ranking': RankingTemplate,
  'graph': GraphTemplate
}

// 実行時テンプレート選択
const renderCurrentPage = () => {
  const currentPage = generatedContent.pages[currentPageIndex]
  const SelectedTemplate = templateComponents[currentPage.templateType]
  
  if (!SelectedTemplate) {
    return <div>テンプレートが見つかりません: {currentPage.templateType}</div>
  }

  return (
    <SelectedTemplate 
      templateData={currentPage.templateData}
    />
  )
}
```

#### エディター統合システム
```typescript
const editorComponents: Record<string, React.ComponentType<any>> = {
  'simple5': Simple5Editor,
  'simple6': SimpleSixEditor,
  'simple3': SimpleThreeEditor,
  'enumeration': EnumerationEditor,
  'ranking': RankingEditor,
  'section-items': SectionItemsEditor,
  'graph': GraphEditor,
  'explanation2': ExplanationTwoEditor,
  'list': ListEditor,
  'table': TableEditor,
  'checklist-enhanced': ChecklistEnhancedEditor,
  'item-n-title-content': ItemNTitleContentEditor,
  'index': IndexEditor,
  'single-section-no-items': SingleSectionNoItemsEditor,
  'two-column-section-items': TwoColumnSectionItemsEditor
  // 'title-description-only': 基本編集で対応（専用エディターなし）
}

const renderEditor = () => {
  const currentPage = generatedContent.pages[currentPageIndex]
  const EditorComponent = editorComponents[currentPage.templateType]
  
  if (!EditorComponent) {
    // 基本編集フォールバック
    return <BasicTemplateEditor templateData={currentPage.templateData} />
  }
  
  return (
    <EditorComponent
      templateData={currentPage.templateData}
      onChange={handleTemplateDataChange}
      onFieldChange={handleFieldChange}
    />
  )
}
```

## 🎯 テンプレート表示システム詳細

### InstagramPostTemplate - 基底コンポーネント

全てのテンプレートが継承する基本構造：

```tsx
// app/components/templates/InstagramPostTemplate.tsx
interface InstagramPostTemplateProps {
  children: React.ReactNode
  className?: string
}

export const InstagramPostTemplate: React.FC<InstagramPostTemplateProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`
      w-[540px] h-[540px]        // Instagram投稿サイズ
      bg-gradient-to-br from-purple-400 via-pink-500 to-red-500
      rounded-lg shadow-lg       // 基本スタイル
      flex flex-col             // フレックス配置
      ${className}
    `}>
      {children}
    </div>
  )
}
```

#### ビューポート管理
```typescript
// ビューポート制約
const INSTAGRAM_POST_SIZE = {
  width: 540,   // 表示用サイズ
  height: 540,  // 表示用サイズ
  exportWidth: 1080,   // エクスポート用サイズ
  exportHeight: 1080   // エクスポート用サイズ
}

// 責任分離の原則
// - InstagramPostTemplate: ビューポート・基本スタイル
// - 各テンプレート: コンテンツレイアウト・データ表示
// - エディター: データ編集・バリデーション
```

### SectionItemsTemplate - 実装詳細例

最も使用頻度の高いテンプレートの詳細実装：

```tsx
// app/components/templates/SectionItemsTemplate.tsx
export const SectionItemsTemplate: React.FC<TemplateProps> = ({ templateData }) => {
  return (
    <InstagramPostTemplate>
      <div className="h-full flex flex-col justify-between p-6 relative">
        
        {/* ヘッダー部分 */}
        <div className="space-y-4">
          {/* メインタイトル */}
          <h1 className="text-xl font-bold text-center mb-4 text-white">
            {templateData.title || 'タイトル'}
          </h1>

          {/* バッジ表示 */}
          {templateData.badgeText && (
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium text-center mb-4">
              {templateData.badgeText}
            </div>
          )}

          {/* セクション一覧 */}
          {templateData.sections?.map((section, index) => (
            <div key={index} className="bg-white/90 rounded-lg p-4 shadow-sm mb-4">
              
              {/* セクションタイトル */}
              <h2 className="font-bold text-lg text-blue-600 mb-2">
                {section.title}
              </h2>
              
              {/* セクション説明 */}
              {section.content && (
                <p className="text-sm text-gray-700 mb-3">
                  {section.content}
                </p>
              )}
              
              {/* アイテム一覧 */}
              {section.items && section.items.length > 0 && (
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                      <span className="text-sm text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* フッター部分 */}
        <div className="mt-auto text-center">
          <div className="text-xs text-white/80">
            #{templateData.badgeText || 'Instagram'} #投稿
          </div>
        </div>
      </div>
    </InstagramPostTemplate>
  )
}
```

#### レンダリング最適化
```typescript
// メモ化による不要な再レンダリング防止
export const SectionItemsTemplate = React.memo<TemplateProps>(({ templateData }) => {
  // セクション内のアイテム表示を最適化
  const renderItems = useMemo(() => {
    if (!templateData.sections) return null
    
    return templateData.sections.map((section, index) => (
      <SectionRenderer key={`section-${index}`} section={section} />
    ))
  }, [templateData.sections])
  
  return (
    <InstagramPostTemplate>
      {/* ... */}
      {renderItems}
    </InstagramPostTemplate>
  )
})
```

## ✏️ エディターシステム詳細

### 動的フィールド検出システム

```typescript
// app/services/dynamicFieldDetector.ts
export class DynamicFieldDetector {
  static detectFields(templateData: TemplateData): string[] {
    const fields: string[] = []
    
    // 基本フィールド
    const baseFields = ['title', 'content', 'subtitle', 'description', 'badgeText']
    baseFields.forEach(field => {
      if (templateData[field]) fields.push(field)
    })
    
    // 動的アイテムフィールド（item1Title, item2Content等）
    Object.keys(templateData).forEach(key => {
      if (/^item\d+(Title|Content)$/.test(key)) {
        fields.push(key)
      }
    })
    
    // セクション内フィールド
    if (templateData.sections) {
      templateData.sections.forEach((_, index) => {
        fields.push(`sections[${index}].title`)
        fields.push(`sections[${index}].content`)
      })
    }
    
    return fields
  }
  
  static getFieldPath(templateData: TemplateData, path: string): any {
    return path.split('.').reduce((obj, key) => {
      // 配列アクセス対応 sections[0].title
      const arrayMatch = key.match(/^(\w+)\[(\d+)\]$/)
      if (arrayMatch) {
        const [, arrayName, index] = arrayMatch
        return obj[arrayName]?.[parseInt(index)]
      }
      return obj?.[key]
    }, templateData)
  }
}
```

### リアルタイム編集システム

```typescript
// app/components/editors/SectionItemsEditor.tsx
export const SectionItemsEditor: React.FC<EditorProps> = ({ 
  templateData, 
  onChange 
}) => {
  const [localData, setLocalData] = useState<TemplateData>(templateData)
  const [isModified, setIsModified] = useState(false)
  
  // デバウンス処理による性能最適化
  const debouncedOnChange = useMemo(
    () => debounce((newData: TemplateData) => {
      onChange(newData)
      setIsModified(false)
    }, 300),
    [onChange]
  )
  
  const handleFieldChange = useCallback((field: string, value: any) => {
    const newData = { ...localData }
    
    // 深いオブジェクト更新
    if (field.includes('.')) {
      const keys = field.split('.')
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        const arrayMatch = key.match(/^(\w+)\[(\d+)\]$/)
        
        if (arrayMatch) {
          const [, arrayName, index] = arrayMatch
          current = current[arrayName][parseInt(index)]
        } else {
          current = current[key]
        }
      }
      
      current[keys[keys.length - 1]] = value
    } else {
      newData[field] = value
    }
    
    setLocalData(newData)
    setIsModified(true)
    debouncedOnChange(newData)
  }, [localData, debouncedOnChange])
  
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      {/* メインタイトル編集 */}
      <div>
        <label className="block text-sm font-medium mb-1">メインタイトル</label>
        <input
          type="text"
          value={localData.title || ''}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="タイトルを入力..."
        />
      </div>
      
      {/* バッジテキスト編集 */}
      <div>
        <label className="block text-sm font-medium mb-1">バッジテキスト</label>
        <input
          type="text"
          value={localData.badgeText || ''}
          onChange={(e) => handleFieldChange('badgeText', e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="バッジテキストを入力..."
        />
      </div>
      
      {/* セクション編集 */}
      {localData.sections?.map((section, index) => (
        <div key={index} className="border-l-4 border-blue-500 pl-4">
          <h3 className="font-medium mb-2">セクション {index + 1}</h3>
          
          {/* セクションタイトル */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">タイトル</label>
            <input
              type="text"
              value={section.title || ''}
              onChange={(e) => handleFieldChange(`sections[${index}].title`, e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          {/* セクション説明 */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">説明</label>
            <textarea
              value={section.content || ''}
              onChange={(e) => handleFieldChange(`sections[${index}].content`, e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={2}
            />
          </div>
          
          {/* アイテム編集 */}
          <div>
            <label className="block text-sm font-medium mb-1">アイテム</label>
            {section.items?.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center space-x-2 mb-1">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...(section.items || [])]
                    newItems[itemIndex] = e.target.value
                    handleFieldChange(`sections[${index}].items`, newItems)
                  }}
                  className="flex-1 p-1 border rounded-md text-sm"
                />
                <button
                  onClick={() => {
                    const newItems = section.items?.filter((_, i) => i !== itemIndex)
                    handleFieldChange(`sections[${index}].items`, newItems)
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  削除
                </button>
              </div>
            ))}
            
            {/* アイテム追加ボタン */}
            <button
              onClick={() => {
                const newItems = [...(section.items || []), '']
                handleFieldChange(`sections[${index}].items`, newItems)
              }}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              + アイテム追加
            </button>
          </div>
        </div>
      ))}
      
      {/* 変更状態表示 */}
      {isModified && (
        <div className="text-sm text-blue-600">
          ⚡ 変更を保存中...
        </div>
      )}
    </div>
  )
}
```

## 🔄 レンダリング最適化システム

### 1. React.memo による最適化

```typescript
// 不要な再レンダリング防止
export const SectionItemsTemplate = React.memo<TemplateProps>(
  ({ templateData }) => {
    // ... レンダリング処理
  },
  (prevProps, nextProps) => {
    // カスタム比較関数
    return JSON.stringify(prevProps.templateData) === JSON.stringify(nextProps.templateData)
  }
)
```

### 2. useMemo によるデータ最適化

```typescript
const ProcessedTemplateData: React.FC<TemplateProps> = ({ templateData }) => {
  // 重い処理をメモ化
  const processedSections = useMemo(() => {
    return templateData.sections?.map(section => ({
      ...section,
      processedItems: section.items?.map(item => processItem(item))
    }))
  }, [templateData.sections])
  
  // DOM要素生成をメモ化
  const renderedSections = useMemo(() => {
    return processedSections?.map((section, index) => (
      <SectionComponent key={`section-${index}`} section={section} />
    ))
  }, [processedSections])
  
  return <div>{renderedSections}</div>
}
```

### 3. 仮想化による性能向上

```typescript
// 大量アイテム表示の最適化
import { FixedSizeList as List } from 'react-window'

const VirtualizedItemList: React.FC<{ items: string[] }> = ({ items }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style} className="flex items-center space-x-2 p-1">
      <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
      <span className="text-sm text-gray-600">{items[index]}</span>
    </div>
  )
  
  return (
    <List
      height={200}        // 表示領域の高さ
      itemCount={items.length}
      itemSize={24}       // 各アイテムの高さ
      itemData={items}
    >
      {Row}
    </List>
  )
}
```

## 📱 レスポンシブ対応詳細

### ビューポート管理システム

```typescript
// app/hooks/useViewport.ts
export const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isDesktop: window.innerWidth >= 1024,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isMobile: window.innerWidth < 768
  })
  
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        isDesktop: window.innerWidth >= 1024,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isMobile: window.innerWidth < 768
      })
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return viewport
}
```

### デバイス別UI調整

```tsx
const ResponsivePostGenerator: React.FC = () => {
  const { isDesktop, isTablet, isMobile } = useViewport()
  
  return (
    <div className={`
      ${isDesktop ? 'flex flex-row space-x-6' : 'flex flex-col space-y-4'}
      ${isMobile ? 'px-2' : 'px-6'}
    `}>
      {/* テンプレート表示 */}
      <div className={`
        ${isDesktop ? 'w-2/3' : 'w-full'}
        ${isMobile ? 'order-2' : 'order-1'}
      `}>
        <div className={`
          ${isMobile ? 'scale-75 origin-top' : 'scale-100'}
          transition-transform duration-200
        `}>
          {renderCurrentTemplate()}
        </div>
      </div>
      
      {/* エディターパネル */}
      <div className={`
        ${isDesktop ? 'w-1/3' : 'w-full'}
        ${isMobile ? 'order-1' : 'order-2'}
      `}>
        {renderEditor()}
      </div>
    </div>
  )
}
```

## 🎬 アニメーション・トランジション

### ページ切り替えアニメーション

```tsx
import { AnimatePresence, motion } from 'framer-motion'

const AnimatedTemplateRenderer: React.FC = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPageIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        {renderCurrentPage()}
      </motion.div>
    </AnimatePresence>
  )
}
```

### エディター表示/非表示アニメーション

```tsx
const SlideEditor: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        width: isOpen ? 400 : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="overflow-hidden bg-gray-50"
    >
      {isOpen && renderEditor()}
    </motion.div>
  )
}
```

## 🚨 エラーハンドリング・フォールバック

### React Error Boundary

```tsx
// app/components/ui/TemplateErrorBoundary.tsx
interface State {
  hasError: boolean
  error?: Error
}

export class TemplateErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  State
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Template rendering error:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <InstagramPostTemplate>
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center text-white">
              <h2 className="text-lg font-bold mb-2">表示エラー</h2>
              <p className="text-sm mb-4">
                テンプレートの表示中にエラーが発生しました
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="bg-white text-gray-800 px-4 py-2 rounded"
              >
                再試行
              </button>
            </div>
          </div>
        </InstagramPostTemplate>
      )
    }
    
    return this.props.children
  }
}
```

### フォールバック表示システム

```typescript
const SafeTemplateRenderer: React.FC<{ templateType: TemplateType; templateData: TemplateData }> = ({ 
  templateType, 
  templateData 
}) => {
  const TemplateComponent = templateComponents[templateType]
  
  // テンプレートコンポーネントが見つからない場合
  if (!TemplateComponent) {
    return (
      <InstagramPostTemplate>
        <div className="h-full flex items-center justify-center p-6">
          <div className="text-center text-white">
            <h2 className="text-lg font-bold mb-2">{templateData.title || 'タイトル'}</h2>
            <p className="text-sm">
              {templateData.content || templateData.description || 'コンテンツが見つかりません'}
            </p>
            <div className="mt-4 text-xs opacity-75">
              未対応テンプレート: {templateType}
            </div>
          </div>
        </div>
      </InstagramPostTemplate>
    )
  }
  
  // データが不正な場合の修復
  const safeTemplateData = useMemo(() => {
    const safe = { ...templateData }
    
    // 必須フィールドの確保
    safe.title = safe.title || 'タイトル'
    
    // 配列フィールドの安全性確保
    if (safe.sections && !Array.isArray(safe.sections)) {
      safe.sections = []
    }
    if (safe.items && !Array.isArray(safe.items)) {
      safe.items = []
    }
    
    return safe
  }, [templateData])
  
  return (
    <TemplateErrorBoundary>
      <TemplateComponent templateData={safeTemplateData} />
    </TemplateErrorBoundary>
  )
}
```

## 📊 UI性能監視

### パフォーマンス計測

```typescript
// app/hooks/usePerformanceMonitoring.ts
export const usePerformanceMonitoring = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // 性能ログ
      if (renderTime > 16) { // 60fps基準
        console.warn(`Slow render: ${componentName} took ${renderTime.toFixed(2)}ms`)
      }
    }
  })
}
```

### レンダリング統計

```typescript
const RenderingStats: React.FC = () => {
  const [stats, setStats] = useState({
    totalRenders: 0,
    averageRenderTime: 0,
    slowRenders: 0
  })
  
  const trackRender = useCallback((componentName: string, renderTime: number) => {
    setStats(prev => ({
      totalRenders: prev.totalRenders + 1,
      averageRenderTime: (prev.averageRenderTime * prev.totalRenders + renderTime) / (prev.totalRenders + 1),
      slowRenders: prev.slowRenders + (renderTime > 16 ? 1 : 0)
    }))
  }, [])
  
  return (
    <div className="text-xs text-gray-500 p-2">
      総レンダリング: {stats.totalRenders} | 
      平均時間: {stats.averageRenderTime.toFixed(1)}ms | 
      遅延: {stats.slowRenders}回
    </div>
  )
}
```

---

## 🎯 UI表示システム実装調査の達成

このUI表示システム実装調査により、Instagram投稿生成システムのReact コンポーネントシステムの実装状況が明確に把握されました。

### 達成された調査結果
- **✅ UIアーキテクチャ**: React 18 + TypeScript + Tailwind CSSの統合実装
- **✅ コンポーネント階層**: NewFlowPostGeneratorを中心とした実装構造
- **✅ 状態管理**: useState/useEffectでの統合状態管理実装
- **✅ テンプレートシステム**: 16テンプレートの動的レンダリング実装
- **✅ エディター統合**: 15エディターのモーダルシステム実装
- **✅ パフォーマンス**: React.memo/useMemo/useCallbackでの最適化実装

### 主要実装ファイル一覧
```
UIシステム実装:
/app/components/NewFlowPostGenerator.tsx (メインUI制御)
/app/components/EditablePostGenerator.tsx (16テンプレート統合UI)
/app/components/templates/ (16テンプレートコンポーネント)
/app/components/editors/ (15エディターコンポーネント)
/app/components/ui/ (UI共通コンポーネント)
```

次の「08_TEMPLATE_SPECIFICATIONS.md」で、各テンプレートの実装仕様詳細を調査してください。