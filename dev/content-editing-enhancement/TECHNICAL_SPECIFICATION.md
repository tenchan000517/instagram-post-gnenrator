# コンテンツ編集機能強化 - 技術仕様書

## 📋 システム構成

### 現在のアーキテクチャ
```
EditablePostGenerator.tsx
├── renderTextEditModal() - 編集モーダル
├── handlePageTextEdit() - 編集処理
└── getEditableFields() - 編集可能フィールド取得
```

### 強化後のアーキテクチャ
```
EditablePostGenerator.tsx
├── renderTextEditModal() - 編集モーダル（拡張）
├── renderDynamicFieldEditor() - 動的フィールド編集
├── renderTemplateSpecificEditor() - テンプレート固有編集
├── handlePageTextEdit() - 基本編集処理
├── handleDynamicFieldChange() - 動的フィールド編集処理
└── handleTemplateSpecificChange() - 特殊データ編集処理

新規コンポーネント:
├── DynamicFieldEditor.tsx - 動的フィールド編集UI
├── TableEditor.tsx - テーブル編集UI
├── ChecklistEditor.tsx - チェックリスト編集UI
├── TemplateSpecificEditor.tsx - テンプレート固有編集UI
└── ValidationProvider.tsx - 検証システム

新規ユーティリティ:
├── dynamicFieldDetector.ts - 動的フィールド検出
├── editingFramework.ts - 統一編集フレームワーク
└── validation.ts - 検証システム
```

## 🔧 Phase 1: 動的フィールド編集機能

### 1. 動的フィールド検出システム

#### インターフェース定義
```typescript
// app/types/editing.ts
export interface DynamicField {
  index: number;
  titleKey: string;
  contentKey: string;
  titleValue: string;
  contentValue: string;
  titleLabel: string;
  contentLabel: string;
}

export interface DynamicFieldPattern {
  templateType: TemplateType;
  maxItems: number;
  titlePattern: string;
  contentPattern: string;
  validator?: (data: TemplateData) => boolean;
}
```

#### 検出システム実装
```typescript
// app/utils/dynamicFieldDetector.ts
export const DYNAMIC_FIELD_PATTERNS: DynamicFieldPattern[] = [
  {
    templateType: 'item-n-title-content',
    maxItems: 6,
    titlePattern: 'item{n}Title',
    contentPattern: 'item{n}Content',
    validator: (data) => Object.keys(data).some(key => key.startsWith('item') && key.includes('Title'))
  },
  // 将来的に他のパターンを追加
];

export const detectDynamicFields = (
  templateData: TemplateData,
  templateType: TemplateType
): DynamicField[] => {
  const pattern = DYNAMIC_FIELD_PATTERNS.find(p => p.templateType === templateType);
  if (!pattern) return [];

  const fields: DynamicField[] = [];
  
  for (let i = 1; i <= pattern.maxItems; i++) {
    const titleKey = pattern.titlePattern.replace('{n}', i.toString());
    const contentKey = pattern.contentPattern.replace('{n}', i.toString());
    
    // データが存在する場合のみ追加
    if (templateData[titleKey] || templateData[contentKey]) {
      fields.push({
        index: i,
        titleKey,
        contentKey,
        titleValue: templateData[titleKey] || '',
        contentValue: templateData[contentKey] || '',
        titleLabel: `項目${i} タイトル`,
        contentLabel: `項目${i} コンテンツ`
      });
    }
  }
  
  return fields;
};

export const getAllDynamicFields = (
  templateData: TemplateData,
  templateType: TemplateType
): DynamicField[] => {
  const pattern = DYNAMIC_FIELD_PATTERNS.find(p => p.templateType === templateType);
  if (!pattern) return [];

  const fields: DynamicField[] = [];
  
  // 全ての可能な項目を表示（空の項目も含む）
  for (let i = 1; i <= pattern.maxItems; i++) {
    const titleKey = pattern.titlePattern.replace('{n}', i.toString());
    const contentKey = pattern.contentPattern.replace('{n}', i.toString());
    
    fields.push({
      index: i,
      titleKey,
      contentKey,
      titleValue: templateData[titleKey] || '',
      contentValue: templateData[contentKey] || '',
      titleLabel: `項目${i} タイトル`,
      contentLabel: `項目${i} コンテンツ`
    });
  }
  
  return fields;
};
```

### 2. 動的フィールド編集UI

#### コンポーネント実装
```typescript
// app/components/DynamicFieldEditor.tsx
import React, { useState } from 'react';
import { DynamicField } from '../types/editing';

interface DynamicFieldEditorProps {
  fields: DynamicField[];
  onFieldChange: (index: number, field: 'title' | 'content', value: string) => void;
  maxLength?: {
    title: number;
    content: number;
  };
  showEmpty?: boolean;
}

export const DynamicFieldEditor: React.FC<DynamicFieldEditorProps> = ({
  fields,
  onFieldChange,
  maxLength = { title: 50, content: 200 },
  showEmpty = false
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  
  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const visibleFields = showEmpty 
    ? fields 
    : fields.filter(f => f.titleValue || f.contentValue);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">動的フィールド編集</h4>
        <span className="text-sm text-gray-500">
          {visibleFields.length} / {fields.length} 項目
        </span>
      </div>

      {visibleFields.map((field) => {
        const isExpanded = expandedItems.has(field.index);
        const hasContent = field.titleValue || field.contentValue;
        
        return (
          <div 
            key={field.index} 
            className={`border rounded-lg p-4 transition-all ${
              hasContent ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-base">
                項目 {field.index}
              </h5>
              <button
                onClick={() => toggleExpanded(field.index)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {isExpanded ? '折りたたむ' : '展開'}
              </button>
            </div>

            {/* 簡易表示 */}
            {!isExpanded && (
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">タイトル:</span> 
                  <span className="ml-2 text-gray-700">
                    {field.titleValue || '(未設定)'}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">コンテンツ:</span> 
                  <span className="ml-2 text-gray-700">
                    {field.contentValue ? 
                      `${field.contentValue.substring(0, 50)}${field.contentValue.length > 50 ? '...' : ''}` : 
                      '(未設定)'
                    }
                  </span>
                </div>
              </div>
            )}

            {/* 詳細編集 */}
            {isExpanded && (
              <div className="space-y-4">
                {/* タイトル編集 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.titleLabel}
                  </label>
                  <input
                    type="text"
                    value={field.titleValue}
                    onChange={(e) => onFieldChange(field.index, 'title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={maxLength.title}
                    placeholder="タイトルを入力してください"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {field.titleValue.length} / {maxLength.title} 文字
                  </div>
                </div>

                {/* コンテンツ編集 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.contentLabel}
                  </label>
                  <textarea
                    value={field.contentValue}
                    onChange={(e) => onFieldChange(field.index, 'content', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    maxLength={maxLength.content}
                    placeholder="コンテンツを入力してください"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {field.contentValue.length} / {maxLength.content} 文字
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
```

### 3. 既存システムとの統合

#### EditablePostGenerator.tsx の拡張
```typescript
// app/components/EditablePostGenerator.tsx に追加
import { detectDynamicFields, getAllDynamicFields } from '../utils/dynamicFieldDetector';
import { DynamicFieldEditor } from './DynamicFieldEditor';

// 新しい状態管理
const [editingMode, setEditingMode] = useState<'basic' | 'dynamic' | 'template'>('basic');

// 動的フィールド変更ハンドラー
const handleDynamicFieldChange = (
  pageIndex: number,
  fieldIndex: number,
  fieldType: 'title' | 'content',
  value: string
) => {
  const updatedPages = currentContent.pages.map((page, index) => {
    if (index === pageIndex) {
      const key = fieldType === 'title' ? `item${fieldIndex}Title` : `item${fieldIndex}Content`;
      return {
        ...page,
        templateData: {
          ...page.templateData,
          [key]: value
        }
      };
    }
    return page;
  });
  
  setCurrentContent({...currentContent, pages: updatedPages});
};

// 編集モーダルの拡張
const renderEnhancedEditModal = (page: GeneratedPage, pageIndex: number) => {
  const dynamicFields = getAllDynamicFields(page.templateData, page.templateType);
  const hasDynamicFields = dynamicFields.length > 0;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">ページ編集</h3>
          <button
            onClick={() => setEditingPageIndex(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 編集モード切り替え */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setEditingMode('basic')}
              className={`px-4 py-2 rounded ${
                editingMode === 'basic' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              基本項目
            </button>
            {hasDynamicFields && (
              <button
                onClick={() => setEditingMode('dynamic')}
                className={`px-4 py-2 rounded ${
                  editingMode === 'dynamic' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                動的フィールド
              </button>
            )}
          </div>
        </div>

        {/* 編集内容 */}
        <div className="space-y-6">
          {editingMode === 'basic' && (
            <div>
              {/* 既存の基本項目編集UI */}
              {renderBasicFieldEditor(page, pageIndex)}
            </div>
          )}
          
          {editingMode === 'dynamic' && hasDynamicFields && (
            <DynamicFieldEditor
              fields={dynamicFields}
              onFieldChange={(fieldIndex, fieldType, value) => 
                handleDynamicFieldChange(pageIndex, fieldIndex, fieldType, value)
              }
              showEmpty={true}
            />
          )}
        </div>

        {/* 保存・キャンセルボタン */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setEditingPageIndex(null)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            キャンセル
          </button>
          <button
            onClick={() => {
              setEditingPageIndex(null);
              setEditingMode('basic');
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};
```

## 🔧 Phase 2: テンプレート固有編集機能

### 1. テーブル編集コンポーネント

#### 実装仕様
```typescript
// app/components/TableEditor.tsx
import React, { useState } from 'react';

interface TableData {
  headers: string[];
  rows: string[][];
}

interface TableEditorProps {
  tableData: TableData;
  onChange: (newTableData: TableData) => void;
  maxCellLength?: number;
}

export const TableEditor: React.FC<TableEditorProps> = ({
  tableData,
  onChange,
  maxCellLength = 25
}) => {
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  
  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    if (value.length > maxCellLength) return;
    
    const newRows = [...tableData.rows];
    newRows[rowIndex] = [...newRows[rowIndex]];
    newRows[rowIndex][colIndex] = value;
    
    onChange({
      ...tableData,
      rows: newRows
    });
  };

  const handleHeaderChange = (colIndex: number, value: string) => {
    if (value.length > maxCellLength) return;
    
    const newHeaders = [...tableData.headers];
    newHeaders[colIndex] = value;
    
    onChange({
      ...tableData,
      headers: newHeaders
    });
  };

  const addRow = () => {
    const newRow = new Array(tableData.headers.length).fill('');
    onChange({
      ...tableData,
      rows: [...tableData.rows, newRow]
    });
  };

  const removeRow = (rowIndex: number) => {
    const newRows = tableData.rows.filter((_, index) => index !== rowIndex);
    onChange({
      ...tableData,
      rows: newRows
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">テーブル編集</h4>
        <button
          onClick={addRow}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
        >
          行追加
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          {/* ヘッダー */}
          <thead>
            <tr className="bg-gray-100">
              {tableData.headers.map((header, colIndex) => (
                <th key={colIndex} className="border border-gray-300 p-2">
                  <input
                    type="text"
                    value={header}
                    onChange={(e) => handleHeaderChange(colIndex, e.target.value)}
                    className="w-full p-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    maxLength={maxCellLength}
                    placeholder={`列 ${colIndex + 1}`}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {header.length}/{maxCellLength}
                  </div>
                </th>
              ))}
              <th className="border border-gray-300 p-2 w-16">操作</th>
            </tr>
          </thead>

          {/* データ行 */}
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      onFocus={() => setSelectedCell({row: rowIndex, col: colIndex})}
                      onBlur={() => setSelectedCell(null)}
                      className={`w-full p-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                        selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                          ? 'bg-blue-50 border-blue-300'
                          : ''
                      }`}
                      maxLength={maxCellLength}
                      placeholder={`行${rowIndex + 1}列${colIndex + 1}`}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {cell.length}/{maxCellLength}
                    </div>
                  </td>
                ))}
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => removeRow(rowIndex)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    disabled={tableData.rows.length <= 1}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

### 2. 統一編集インターフェース

#### 実装仕様
```typescript
// app/components/TemplateSpecificEditor.tsx
import React from 'react';
import { TableEditor } from './TableEditor';
import { ChecklistEditor } from './ChecklistEditor';
import { DynamicFieldEditor } from './DynamicFieldEditor';
import { detectDynamicFields } from '../utils/dynamicFieldDetector';

interface TemplateSpecificEditorProps {
  templateType: TemplateType;
  templateData: TemplateData;
  onChange: (newData: TemplateData) => void;
  pageIndex: number;
}

export const TemplateSpecificEditor: React.FC<TemplateSpecificEditorProps> = ({
  templateType,
  templateData,
  onChange,
  pageIndex
}) => {
  const renderEditor = () => {
    switch (templateType) {
      case 'table':
        return (
          <TableEditor
            tableData={templateData.tableData || { headers: [], rows: [] }}
            onChange={(newTableData) => onChange({ ...templateData, tableData: newTableData })}
          />
        );

      case 'checklist-enhanced':
        return (
          <ChecklistEditor
            checklistItems={templateData.checklistItems || []}
            onChange={(newItems) => onChange({ ...templateData, checklistItems: newItems })}
          />
        );

      case 'item-n-title-content':
        const dynamicFields = detectDynamicFields(templateData, templateType);
        return (
          <DynamicFieldEditor
            fields={dynamicFields}
            onFieldChange={(fieldIndex, fieldType, value) => {
              const key = fieldType === 'title' ? `item${fieldIndex}Title` : `item${fieldIndex}Content`;
              onChange({ ...templateData, [key]: value });
            }}
            showEmpty={true}
          />
        );

      case 'enumeration':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                バッジテキスト
              </label>
              <input
                type="text"
                value={templateData.badgeText || ''}
                onChange={(e) => onChange({ ...templateData, badgeText: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={20}
                placeholder="バッジテキストを入力"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-500 text-center py-8">
            このテンプレートは特殊な編集機能がありません
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {templateType} テンプレート編集
        </h3>
        <span className="text-sm text-gray-500">
          ページ {pageIndex + 1}
        </span>
      </div>
      
      {renderEditor()}
    </div>
  );
};
```

## 🔧 Phase 3: 統一編集フレームワーク

### 1. 編集フレームワーク

#### 実装仕様
```typescript
// app/utils/editingFramework.ts
export interface EditingCapability {
  templateType: TemplateType;
  supportedFields: string[];
  dynamicFields: boolean;
  specialEditor: boolean;
  validation: ValidationRule[];
}

export interface ValidationRule {
  field: string;
  type: 'required' | 'maxLength' | 'minLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any) => boolean;
}

export const EDITING_CAPABILITIES: EditingCapability[] = [
  {
    templateType: 'item-n-title-content',
    supportedFields: ['title', 'subtitle', 'content'],
    dynamicFields: true,
    specialEditor: true,
    validation: [
      { field: 'title', type: 'required', message: 'タイトルは必須です' },
      { field: 'title', type: 'maxLength', value: 50, message: 'タイトルは50文字以内です' }
    ]
  },
  {
    templateType: 'table',
    supportedFields: ['title', 'subtitle'],
    dynamicFields: false,
    specialEditor: true,
    validation: [
      { field: 'title', type: 'required', message: 'タイトルは必須です' },
      { field: 'tableData', type: 'custom', message: 'テーブルデータが必要です', 
        validator: (data) => data.tableData && data.tableData.headers.length > 0 }
    ]
  },
  // 他のテンプレート...
];

export const getEditingCapability = (templateType: TemplateType): EditingCapability | null => {
  return EDITING_CAPABILITIES.find(cap => cap.templateType === templateType) || null;
};

export const canEditTemplate = (templateType: TemplateType): boolean => {
  return EDITING_CAPABILITIES.some(cap => cap.templateType === templateType);
};
```

### 2. 自動検証システム

#### 実装仕様
```typescript
// app/utils/validation.ts
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  type: 'error';
}

export interface ValidationWarning {
  field: string;
  message: string;
  type: 'warning';
}

export const validateTemplateData = (
  templateData: TemplateData,
  templateType: TemplateType
): ValidationResult => {
  const capability = getEditingCapability(templateType);
  if (!capability) {
    return { isValid: true, errors: [], warnings: [] };
  }

  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // 基本検証
  capability.validation.forEach(rule => {
    const value = templateData[rule.field];
    
    switch (rule.type) {
      case 'required':
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          errors.push({
            field: rule.field,
            message: rule.message,
            type: 'error'
          });
        }
        break;
        
      case 'maxLength':
        if (typeof value === 'string' && value.length > rule.value) {
          errors.push({
            field: rule.field,
            message: rule.message,
            type: 'error'
          });
        }
        break;
        
      case 'minLength':
        if (typeof value === 'string' && value.length < rule.value) {
          warnings.push({
            field: rule.field,
            message: rule.message,
            type: 'warning'
          });
        }
        break;
        
      case 'custom':
        if (rule.validator && !rule.validator(templateData)) {
          errors.push({
            field: rule.field,
            message: rule.message,
            type: 'error'
          });
        }
        break;
    }
  });

  // 動的フィールド検証
  if (capability.dynamicFields) {
    const dynamicFields = detectDynamicFields(templateData, templateType);
    if (dynamicFields.length === 0) {
      warnings.push({
        field: 'dynamicFields',
        message: '少なくとも1つの項目を設定することを推奨します',
        type: 'warning'
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};
```

## 🎯 実装ガイドライン

### コーディング規約
- **TypeScript**: 厳密な型チェック
- **React**: 関数コンポーネント + Hooks
- **CSS**: Tailwind CSS を使用
- **エラーハンドリング**: 必須

### テスト要件
- **単体テスト**: 各コンポーネントの動作確認
- **統合テスト**: 編集→保存→表示の一連動作
- **回帰テスト**: 既存機能への影響確認

### パフォーマンス要件
- **レスポンス時間**: 200ms以内
- **メモリ使用量**: 最小限
- **レンダリング**: 最適化必須

---

**次のステップ**: Phase 1の実装開始