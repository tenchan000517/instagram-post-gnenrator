# 技術アーキテクチャ設計書 - 全16テンプレート編集機能

## 🏗️ システム全体アーキテクチャ

### **現在のアーキテクチャ分析**
```
📱 UI Layer
├── EditablePostGenerator.tsx        // メイン編集画面
├── PartialEditComponent.tsx         // 部分編集機能
├── ContentApprovalComponent.tsx     // コンテンツ承認
└── NewFlowController.tsx            // 新フロー制御

🔧 Service Layer
├── contentGeneratorService.ts       // コンテンツ生成
├── templateMatchingService.ts       // テンプレートマッチング
├── templateRecommendationService.ts // テンプレート推奨
└── pageStructureAnalyzer.ts        // ページ構造分析

📋 Template Layer
├── templates/                       // 16テンプレート
├── TemplateTypes.ts                // 型定義
├── TemplateRegistry.ts             // テンプレート登録
└── index.ts                        // エクスポート
```

### **新規アーキテクチャ設計**
```
📱 Enhanced UI Layer
├── EditablePostGenerator.tsx        // 🔄 拡張：動的フィールド検出
├── PartialEditComponent.tsx         // 🔄 拡張：全テンプレート対応
├── UnifiedEditingFramework.tsx      // 🆕 新規：統一編集基盤
└── editors/                         // 🆕 新規：テンプレート固有エディタ
    ├── ItemNTitleContentEditor.tsx
    ├── ChecklistEnhancedEditor.tsx
    ├── TwoColumnEditor.tsx
    └── ...

🔧 Enhanced Service Layer
├── DynamicFieldDetector.ts          // 🆕 新規：動的フィールド検出
├── EditingStateManager.ts           // 🆕 新規：編集状態管理
├── FieldValidationService.ts        // 🆕 新規：フィールド検証
└── existing services...             // 既存サービス（互換性維持）

📋 Enhanced Template Layer
├── templates/                       // 既存16テンプレート
├── TemplateEditingCapabilities.ts   // 🆕 新規：編集能力定義
├── TemplateFieldDefinitions.ts      // 🆕 新規：フィールド定義
└── existing files...                // 既存ファイル（互換性維持）
```

## 🎯 コアコンポーネント設計

### **1. DynamicFieldDetector (動的フィールド検出)**
```typescript
interface DynamicFieldDetector {
  /**
   * テンプレートタイプとデータから編集可能フィールドを検出
   */
  detectFields(templateType: TemplateType, data: any): EditableField[]
  
  /**
   * 動的フィールド（item1Title, item2Title等）を検出
   */
  detectDynamicFields(templateType: TemplateType, data: any): DynamicField[]
  
  /**
   * フィールドの型情報を取得
   */
  getFieldType(field: string): FieldType
  
  /**
   * デフォルト値を生成
   */
  generateDefaultValue(field: string, type: FieldType): any
}

interface EditableField {
  name: string                        // フィールド名
  type: FieldType                     // データ型
  displayName: string                 // 表示名
  required: boolean                   // 必須フラグ
  validation: ValidationRule[]        // 検証ルール
  defaultValue?: any                  // デフォルト値
  maxLength?: number                  // 最大長
  placeholder?: string                // プレースホルダー
}

interface DynamicField extends EditableField {
  pattern: string                     // パターン（例: "item{n}Title"）
  index: number                       // インデックス
  maxCount: number                    // 最大個数
}

type FieldType = 'string' | 'array' | 'object' | 'number' | 'boolean' | 'text' | 'html'

interface ValidationRule {
  type: 'required' | 'maxLength' | 'minLength' | 'pattern' | 'custom'
  value?: any
  message: string
  validator?: (value: any) => boolean
}
```

### **2. UnifiedEditingFramework (統一編集フレームワーク)**
```typescript
interface UnifiedEditingFramework {
  /**
   * テンプレート固有エディタの登録
   */
  registerEditor(templateType: TemplateType, editor: TemplateEditor): void
  
  /**
   * エディタの取得
   */
  getEditor(templateType: TemplateType): TemplateEditor | null
  
  /**
   * フィールドの更新処理
   */
  handleFieldUpdate(field: string, value: any): void
  
  /**
   * 全フィールドの検証
   */
  validateAllFields(): ValidationResult
  
  /**
   * 編集状態の管理
   */
  getEditingState(): EditingState
  setEditingState(state: EditingState): void
}

interface TemplateEditor {
  templateType: TemplateType
  supportedFields: string[]
  
  /**
   * 編集UIのレンダリング
   */
  renderEditUI(
    data: any, 
    onUpdate: (field: string, value: any) => void
  ): React.ReactNode
  
  /**
   * データの検証
   */
  validateData(data: any): ValidationResult
  
  /**
   * デフォルトデータの生成
   */
  generateDefaultData(): any
}

interface EditingState {
  currentTemplate: TemplateType
  editingFields: Record<string, any>
  validationErrors: Record<string, string>
  isDirty: boolean
  isValid: boolean
}

interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
  warnings?: Record<string, string>
}
```

### **3. TemplateEditingCapabilities (テンプレート編集能力)**
```typescript
interface TemplateEditingCapabilities {
  /**
   * テンプレートの編集能力を定義
   */
  getEditingCapability(templateType: TemplateType): EditingCapability
  
  /**
   * 編集可能フィールドの一覧を取得
   */
  getEditableFields(templateType: TemplateType): EditableField[]
  
  /**
   * 編集UI設定を取得
   */
  getEditingUIConfig(templateType: TemplateType): EditingUIConfig
}

interface EditingCapability {
  templateType: TemplateType
  supportLevel: 'full' | 'partial' | 'basic' | 'none'
  editableFields: EditableField[]
  dynamicFields: DynamicField[]
  specialFeatures: SpecialFeature[]
  limitations: string[]
}

interface EditingUIConfig {
  layout: 'vertical' | 'horizontal' | 'grid' | 'tabs'
  sections: UISection[]
  customComponents: CustomComponent[]
  validation: ValidationConfig
}

interface UISection {
  title: string
  fields: string[]
  collapsible: boolean
  priority: 'high' | 'medium' | 'low'
}

interface SpecialFeature {
  name: string
  description: string
  implementation: string
  requirements: string[]
}
```

## 🔧 テンプレート固有エディタ設計

### **Critical Priority エディタ**

#### **ItemNTitleContentEditor (独立ボックス構造編集)**
```typescript
interface ItemNTitleContentEditor extends TemplateEditor {
  templateType: 'item-n-title-content'
  
  /**
   * 動的アイテム管理
   */
  addItem(): void
  removeItem(index: number): void
  moveItem(from: number, to: number): void
  
  /**
   * アイテム編集
   */
  updateItemTitle(index: number, title: string): void
  updateItemContent(index: number, content: string): void
  
  /**
   * 検証
   */
  validateItem(index: number): ValidationResult
  validateAllItems(): ValidationResult
}

interface ItemNTitleContentData {
  title: string
  subtitle?: string
  badgeText?: string
  items: ItemData[]
}

interface ItemData {
  title: string
  content: string
  index: number
}
```

#### **ChecklistEnhancedEditor (チェックリスト詳細編集)**
```typescript
interface ChecklistEnhancedEditor extends TemplateEditor {
  templateType: 'checklist-enhanced'
  
  /**
   * チェックリスト項目管理
   */
  addChecklistItem(): void
  removeChecklistItem(index: number): void
  updateChecklistItem(index: number, item: ChecklistItem): void
  
  /**
   * 詳細説明管理
   */
  updateDetailedDescription(description: string): void
  
  /**
   * 検証
   */
  validateChecklistItems(): ValidationResult
}

interface ChecklistEnhancedData {
  title: string
  subtitle?: string
  content: string
  checklistItems: ChecklistItem[]
}

interface ChecklistItem {
  text: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  category?: string
}
```

### **High Priority エディタ**

#### **TwoColumnEditor (2カラム構造編集)**
```typescript
interface TwoColumnEditor extends TemplateEditor {
  templateType: 'simple3'
  
  /**
   * カラム編集
   */
  updateLeftColumn(data: ColumnData): void
  updateRightColumn(data: ColumnData): void
  
  /**
   * カラム間同期
   */
  syncColumns(): void
  
  /**
   * バランス調整
   */
  balanceColumns(): void
}

interface ColumnData {
  title: string
  content: string
  items?: string[]
}
```

#### **SectionItemsEditor (セクション+アイテム編集)**
```typescript
interface SectionItemsEditor extends TemplateEditor {
  templateType: 'section-items'
  
  /**
   * セクション管理
   */
  addSection(): void
  removeSection(index: number): void
  updateSection(index: number, section: SectionData): void
  
  /**
   * アイテム管理
   */
  addItemToSection(sectionIndex: number): void
  removeItemFromSection(sectionIndex: number, itemIndex: number): void
  updateSectionItem(sectionIndex: number, itemIndex: number, item: string): void
}

interface SectionData {
  title: string
  description?: string
  items: string[]
  priority: number
}
```

## 📊 データフロー設計

### **編集フロー**
```
1. テンプレート選択
   ↓
2. DynamicFieldDetector → 編集可能フィールド検出
   ↓
3. UnifiedEditingFramework → 適切なエディタ選択
   ↓
4. TemplateEditor → 編集UIレンダリング
   ↓
5. ユーザー編集
   ↓
6. リアルタイム検証
   ↓
7. データ更新
   ↓
8. プレビュー更新
```

### **状態管理**
```typescript
interface EditingGlobalState {
  currentTemplate: TemplateType
  templateData: Record<string, any>
  editingCapabilities: EditingCapability
  editingState: EditingState
  validationResults: ValidationResult
  previewData: any
}

// Redux/Zustand ストア設計
interface EditingStore {
  state: EditingGlobalState
  actions: {
    setTemplate: (template: TemplateType) => void
    updateField: (field: string, value: any) => void
    validateField: (field: string) => ValidationResult
    resetEditing: () => void
    saveChanges: () => Promise<void>
  }
}
```

## 🔐 型安全性設計

### **厳密な型定義**
```typescript
// テンプレートタイプ別データ型
type TemplateDataMap = {
  'item-n-title-content': ItemNTitleContentData
  'checklist-enhanced': ChecklistEnhancedData
  'title-description-only': TitleDescriptionOnlyData
  'simple3': Simple3Data
  'section-items': SectionItemsData
  // ... 他の全テンプレート
}

// 型安全な更新関数
function updateTemplateData<T extends TemplateType>(
  templateType: T,
  field: keyof TemplateDataMap[T],
  value: TemplateDataMap[T][typeof field]
): void {
  // 型安全な更新処理
}

// 型安全な検証関数
function validateTemplateData<T extends TemplateType>(
  templateType: T,
  data: TemplateDataMap[T]
): ValidationResult {
  // 型安全な検証処理
}
```

### **実行時型チェック**
```typescript
// zod等を使用した実行時型検証
import { z } from 'zod'

const ItemNTitleContentSchema = z.object({
  title: z.string().min(1).max(100),
  subtitle: z.string().optional(),
  badgeText: z.string().optional(),
  items: z.array(z.object({
    title: z.string().min(1).max(50),
    content: z.string().min(1).max(500)
  })).min(1).max(6)
})

function validateItemNTitleContent(data: any): ValidationResult {
  try {
    ItemNTitleContentSchema.parse(data)
    return { isValid: true, errors: {} }
  } catch (error) {
    return { isValid: false, errors: parseZodErrors(error) }
  }
}
```

## 🚀 パフォーマンス最適化

### **レンダリング最適化**
```typescript
// React.memo + useMemo でレンダリング最適化
const OptimizedTemplateEditor = React.memo(({ templateType, data, onUpdate }) => {
  const editableFields = useMemo(() => 
    DynamicFieldDetector.detectFields(templateType, data), 
    [templateType, data]
  )
  
  const editorComponent = useMemo(() => 
    UnifiedEditingFramework.getEditor(templateType), 
    [templateType]
  )
  
  return (
    <div>
      {editableFields.map(field => (
        <FieldEditor 
          key={field.name}
          field={field}
          value={data[field.name]}
          onChange={onUpdate}
        />
      ))}
    </div>
  )
})
```

### **状態更新最適化**
```typescript
// immer を使用した不変更新
import produce from 'immer'

const updateTemplateData = produce((draft: EditingGlobalState, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      draft.templateData[action.field] = action.value
      break
    case 'ADD_ITEM':
      draft.templateData.items.push(action.item)
      break
    // ... 他のアクション
  }
})
```

## 🧪 テスト戦略

### **単体テスト**
```typescript
describe('DynamicFieldDetector', () => {
  test('should detect item-n-title-content fields', () => {
    const data = {
      title: 'Test Title',
      item1Title: 'Item 1',
      item1Content: 'Content 1',
      item2Title: 'Item 2',
      item2Content: 'Content 2'
    }
    
    const fields = DynamicFieldDetector.detectFields('item-n-title-content', data)
    
    expect(fields).toContain(
      expect.objectContaining({ name: 'item1Title', type: 'string' })
    )
    expect(fields).toContain(
      expect.objectContaining({ name: 'item1Content', type: 'text' })
    )
  })
})
```

### **統合テスト**
```typescript
describe('EditingFramework Integration', () => {
  test('should handle complete editing flow', async () => {
    // 1. テンプレート設定
    const framework = new UnifiedEditingFramework()
    framework.setTemplate('item-n-title-content')
    
    // 2. フィールド更新
    framework.updateField('item1Title', 'New Title')
    
    // 3. 検証
    const result = framework.validateAllFields()
    expect(result.isValid).toBe(true)
    
    // 4. 保存
    await framework.saveChanges()
    
    // 5. 結果確認
    const finalData = framework.getTemplateData()
    expect(finalData.item1Title).toBe('New Title')
  })
})
```

## 📚 実装順序

### **Phase 1: 基盤実装**
1. **DynamicFieldDetector** - 動的フィールド検出システム
2. **UnifiedEditingFramework** - 統一編集フレームワーク
3. **TemplateEditingCapabilities** - テンプレート編集能力定義

### **Phase 2: Critical Priority エディタ**
1. **ItemNTitleContentEditor** - 独立ボックス構造編集
2. **ChecklistEnhancedEditor** - チェックリスト詳細編集
3. **TitleDescriptionOnlyEditor** - タイトル+説明文編集

### **Phase 3: High Priority エディタ**
1. **TwoColumnEditor** - 2カラム構造編集
2. **SectionItemsEditor** - セクション+アイテム編集
3. **その他High Priorityエディタ**

### **Phase 4: 統合・最適化**
1. **全エディタ統合テスト**
2. **パフォーマンス最適化**
3. **型安全性・エラーハンドリング強化**

---

**この技術アーキテクチャに基づいて、段階的に実装を進めることで、型安全で高パフォーマンス、かつ保守性の高い編集システムを構築できます。**