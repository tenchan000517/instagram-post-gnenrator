# コンテンツ編集機能強化 - 実装計画

## 📋 プロジェクト概要
- **目標**: コンテンツ編集機能を「タイトルのみ」から「全項目編集可能」へ拡張
- **期間**: 2-4週間（段階的実装）
- **優先度**: 高（ユーザビリティ大幅向上）

## 🎯 実装方針

### 段階的実装アプローチ
1. **Phase 1**: 動的フィールド編集機能（高優先度）
2. **Phase 2**: テンプレート固有編集機能（中優先度）
3. **Phase 3**: 完全編集システム（低優先度）

### 技術的アプローチ
- **非破壊的**: 既存システムを壊さない安全な実装
- **段階的**: 各段階で完全に動作する状態を保持
- **拡張可能**: 新テンプレート追加時の自動対応

## 📊 Phase 1: 動的フィールド編集機能

### 🎯 目標
`item-n-title-content`テンプレートの完全編集対応

### 対象テンプレート
- **item-n-title-content**: 書籍紹介等で頻繁に使用

### 実装内容

#### 1. 動的フィールド検出システム
```typescript
// 新規ファイル: app/utils/dynamicFieldDetector.ts
export interface DynamicField {
  index: number;
  titleKey: string;
  contentKey: string;
  titleValue: string;
  contentValue: string;
}

export const detectDynamicFields = (
  templateData: TemplateData, 
  templateType: TemplateType
): DynamicField[] => {
  const fields: DynamicField[] = [];
  
  if (templateType === 'item-n-title-content') {
    for (let i = 1; i <= 6; i++) {
      const titleKey = `item${i}Title`;
      const contentKey = `item${i}Content`;
      
      if (templateData[titleKey] || templateData[contentKey]) {
        fields.push({
          index: i,
          titleKey,
          contentKey,
          titleValue: templateData[titleKey] || '',
          contentValue: templateData[contentKey] || ''
        });
      }
    }
  }
  
  return fields;
}
```

#### 2. 動的フィールド編集UI
```typescript
// 新規コンポーネント: app/components/DynamicFieldEditor.tsx
interface DynamicFieldEditorProps {
  fields: DynamicField[];
  onFieldChange: (index: number, field: 'title' | 'content', value: string) => void;
}

export const DynamicFieldEditor: React.FC<DynamicFieldEditorProps> = ({ 
  fields, 
  onFieldChange 
}) => {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.index} className="border rounded p-4">
          <h4 className="font-semibold mb-2">項目 {field.index}</h4>
          
          {/* タイトル編集 */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              タイトル
            </label>
            <input
              type="text"
              value={field.titleValue}
              onChange={(e) => onFieldChange(field.index, 'title', e.target.value)}
              className="w-full p-2 border rounded"
              maxLength={50}
            />
          </div>
          
          {/* コンテンツ編集 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              コンテンツ
            </label>
            <textarea
              value={field.contentValue}
              onChange={(e) => onFieldChange(field.index, 'content', e.target.value)}
              className="w-full p-2 border rounded h-20"
              maxLength={200}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
```

#### 3. 既存編集コンポーネントの拡張
```typescript
// 修正: app/components/EditablePostGenerator.tsx
import { detectDynamicFields, DynamicField } from '../utils/dynamicFieldDetector';
import { DynamicFieldEditor } from './DynamicFieldEditor';

// 既存のhandlePageTextEdit関数を拡張
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

// 編集モーダルに動的フィールド編集を追加
const renderDynamicFieldEditor = (page: GeneratedPage, pageIndex: number) => {
  const dynamicFields = detectDynamicFields(page.templateData, page.templateType);
  
  if (dynamicFields.length === 0) return null;
  
  return (
    <DynamicFieldEditor
      fields={dynamicFields}
      onFieldChange={(fieldIndex, fieldType, value) => 
        handleDynamicFieldChange(pageIndex, fieldIndex, fieldType, value)
      }
    />
  );
};
```

### 実装ファイル
1. **新規作成**:
   - `app/utils/dynamicFieldDetector.ts` - 動的フィールド検出
   - `app/components/DynamicFieldEditor.tsx` - 動的フィールド編集UI

2. **修正**:
   - `app/components/EditablePostGenerator.tsx` - 編集機能拡張

### テスト計画
- **単体テスト**: 動的フィールド検出の正確性
- **統合テスト**: 編集→保存→表示の一連動作
- **ユーザビリティテスト**: 実際の編集操作の使いやすさ

## 📊 Phase 2: テンプレート固有編集機能

### 🎯 目標
テーブル、チェックリスト等の専用編集UI実装

### 対象テンプレート
- **table**: テーブルデータ編集
- **checklist-enhanced**: チェックリスト項目編集
- **enumeration**: badgeText編集

### 実装内容

#### 1. テーブル編集コンポーネント
```typescript
// 新規コンポーネント: app/components/TableEditor.tsx
interface TableEditorProps {
  tableData: {
    headers: string[];
    rows: string[][];
  };
  onChange: (newTableData: any) => void;
}

export const TableEditor: React.FC<TableEditorProps> = ({ tableData, onChange }) => {
  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...tableData.rows];
    newRows[rowIndex][colIndex] = value;
    onChange({
      ...tableData,
      rows: newRows
    });
  };

  const handleHeaderChange = (colIndex: number, value: string) => {
    const newHeaders = [...tableData.headers];
    newHeaders[colIndex] = value;
    onChange({
      ...tableData,
      headers: newHeaders
    });
  };

  return (
    <div className="space-y-4">
      {/* ヘッダー編集 */}
      <div>
        <h4 className="font-semibold mb-2">テーブルヘッダー</h4>
        <div className="grid grid-cols-3 gap-2">
          {tableData.headers.map((header, index) => (
            <input
              key={index}
              type="text"
              value={header}
              onChange={(e) => handleHeaderChange(index, e.target.value)}
              className="p-2 border rounded"
              maxLength={25}
            />
          ))}
        </div>
      </div>

      {/* データ行編集 */}
      <div>
        <h4 className="font-semibold mb-2">テーブルデータ</h4>
        {tableData.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-2 mb-2">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className="p-2 border rounded"
                maxLength={25}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
```

#### 2. チェックリスト編集コンポーネント
```typescript
// 新規コンポーネント: app/components/ChecklistEditor.tsx
interface ChecklistEditorProps {
  checklistItems: string[];
  onChange: (newItems: string[]) => void;
}

export const ChecklistEditor: React.FC<ChecklistEditorProps> = ({ 
  checklistItems, 
  onChange 
}) => {
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...checklistItems];
    newItems[index] = value;
    onChange(newItems);
  };

  const addItem = () => {
    onChange([...checklistItems, '']);
  };

  const removeItem = (index: number) => {
    const newItems = checklistItems.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">チェックリスト項目</h4>
        <button 
          onClick={addItem}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
        >
          項目追加
        </button>
      </div>

      {checklistItems.map((item, index) => (
        <div key={index} className="flex gap-2">
          <textarea
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
            className="flex-1 p-2 border rounded h-16"
            placeholder={`チェックリスト項目 ${index + 1}`}
            maxLength={100}
          />
          <button
            onClick={() => removeItem(index)}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            削除
          </button>
        </div>
      ))}
    </div>
  );
};
```

#### 3. 統一編集インターフェース
```typescript
// 新規: app/components/TemplateSpecificEditor.tsx
interface TemplateSpecificEditorProps {
  templateType: TemplateType;
  templateData: TemplateData;
  onChange: (newData: TemplateData) => void;
}

export const TemplateSpecificEditor: React.FC<TemplateSpecificEditorProps> = ({
  templateType,
  templateData,
  onChange
}) => {
  switch (templateType) {
    case 'table':
      return (
        <TableEditor
          tableData={templateData.tableData}
          onChange={(newTableData) => onChange({...templateData, tableData: newTableData})}
        />
      );
    
    case 'checklist-enhanced':
      return (
        <ChecklistEditor
          checklistItems={templateData.checklistItems || []}
          onChange={(newItems) => onChange({...templateData, checklistItems: newItems})}
        />
      );
    
    case 'enumeration':
      return (
        <div>
          <label className="block text-sm font-medium mb-1">バッジテキスト</label>
          <input
            type="text"
            value={templateData.badgeText || ''}
            onChange={(e) => onChange({...templateData, badgeText: e.target.value})}
            className="w-full p-2 border rounded"
            maxLength={20}
          />
        </div>
      );
    
    default:
      return null;
  }
};
```

## 📊 Phase 3: 完全編集システム

### 🎯 目標
全テンプレートの完全編集対応と統一された編集UX

### 対象テンプレート
- **ranking**: ランキングデータ編集
- **graph**: グラフデータ編集
- **その他**: 新規テンプレート対応

### 実装内容

#### 1. 統一編集フレームワーク
```typescript
// 新規: app/utils/editingFramework.ts
export interface EditableFieldDefinition {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'array' | 'object' | 'dynamic';
  maxLength?: number;
  validation?: (value: any) => boolean;
  component?: React.ComponentType<any>;
}

export const generateEditableFields = (
  templateData: TemplateData, 
  templateType: TemplateType
): EditableFieldDefinition[] => {
  const fields: EditableFieldDefinition[] = [];
  
  // 基本フィールド
  fields.push({
    key: 'title',
    label: 'タイトル',
    type: 'text',
    maxLength: 50
  });
  
  // テンプレート固有フィールド
  switch (templateType) {
    case 'item-n-title-content':
      fields.push({
        key: 'dynamicFields',
        label: '動的フィールド',
        type: 'dynamic',
        component: DynamicFieldEditor
      });
      break;
    
    case 'table':
      fields.push({
        key: 'tableData',
        label: 'テーブルデータ',
        type: 'object',
        component: TableEditor
      });
      break;
    
    // 他のテンプレート...
  }
  
  return fields;
};
```

#### 2. 自動検証システム
```typescript
// 新規: app/utils/validation.ts
export const validateTemplateData = (
  templateData: TemplateData, 
  templateType: TemplateType
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // 基本検証
  if (!templateData.title || templateData.title.trim() === '') {
    errors.push('タイトルは必須です');
  }
  
  // テンプレート固有検証
  switch (templateType) {
    case 'item-n-title-content':
      const dynamicFields = detectDynamicFields(templateData, templateType);
      if (dynamicFields.length === 0) {
        errors.push('少なくとも1つの項目が必要です');
      }
      break;
    
    case 'table':
      if (!templateData.tableData || !templateData.tableData.headers) {
        errors.push('テーブルヘッダーは必須です');
      }
      break;
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

## 🔄 実装スケジュール

### Week 1: Phase 1 実装
- **Day 1-2**: 動的フィールド検出システム
- **Day 3-4**: 動的フィールド編集UI
- **Day 5-7**: 既存システムとの統合・テスト

### Week 2: Phase 2 実装
- **Day 1-3**: テーブル編集コンポーネント
- **Day 4-5**: チェックリスト編集コンポーネント
- **Day 6-7**: 統一編集インターフェース

### Week 3: Phase 3 実装
- **Day 1-3**: 統一編集フレームワーク
- **Day 4-5**: 自動検証システム
- **Day 6-7**: 全体テスト・バグ修正

### Week 4: 最終調整
- **Day 1-3**: パフォーマンス最適化
- **Day 4-5**: ユーザビリティ改善
- **Day 6-7**: ドキュメント整備・リリース準備

## 🎯 成功指標

### 技術的指標
- **編集対応率**: 90%以上（全テンプレート）
- **バグ発生率**: 0%（既存機能への影響なし）
- **パフォーマンス**: 編集レスポンス時間 < 200ms

### ユーザビリティ指標
- **編集完了率**: 95%以上
- **編集時間**: 平均50%短縮
- **エラー発生率**: 5%以下

## 🚀 期待される効果

### 短期効果
- **ユーザビリティ大幅向上**: 全項目編集可能
- **効率向上**: 再生成不要で即座に修正
- **満足度向上**: 直感的な編集操作

### 長期効果
- **保守性向上**: 統一された編集フレームワーク
- **拡張性向上**: 新テンプレート対応の自動化
- **品質向上**: 検証システムによる品質保証

---

**次のステップ**: Phase 1の詳細な技術仕様書作成と実装開始