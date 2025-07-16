# コンテンツ編集機能制限問題 - 詳細分析

## 📋 基本情報
- **問題**: コンテンツ編集機能がタイトルのみ編集可能
- **影響**: ユーザビリティの大幅な制限
- **調査日**: 2025-07-16
- **優先度**: 高

## 🔍 問題の詳細分析

### 現在の編集機能の制限

#### ✅ 編集可能な項目
- **基本項目**:
  - `title` - タイトル
  - `subtitle` - サブタイトル
  - `content` - メインコンテンツ
- **配列項目**:
  - `steps` - ステップ配列（simple5テンプレート用）
  - `points` - ポイント配列（explanation2テンプレート用）
  - `items` - アイテム配列（enumeration等用）
  - `boxes` - ボックス配列（simple2テンプレート用）

#### ❌ 編集不可能な項目
- **動的フィールド**: `item1Title`, `item2Title`, `item1Content`, `item2Content`等
- **テンプレート固有データ**: `tableData`, `graphData`, `rankingData`
- **チェックリスト**: `checklistItems`
- **特殊フィールド**: `badgeText`等

### テンプレート別編集対応状況

| テンプレート | 編集可能項目 | 編集不可項目 | 対応率 |
|-------------|-------------|-------------|--------|
| enumeration | title, subtitle, items配列 | badgeText | 80% |
| item-n-title-content | title, subtitle, content | item1Title, item2Title, item1Content, item2Content | 30% |
| simple5 | title, subtitle, content, steps配列 | - | 100% |
| explanation2 | title, subtitle, content, points配列 | - | 100% |
| table | title, subtitle | tableData | 20% |
| checklist-enhanced | title, subtitle, content | checklistItems | 40% |
| ranking | title, subtitle | rankingData | 20% |
| graph | title, subtitle | graphData | 20% |

## 🔧 技術的制限の根本原因

### 1. 動的フィールド問題
```typescript
// 現在の実装では動的フィールドが未対応
interface TemplateData {
  title?: string;
  subtitle?: string;
  content?: string;
  // 動的フィールドは型定義に含まれていない
  item1Title?: string;  // 編集UIで未対応
  item2Title?: string;  // 編集UIで未対応
}
```

### 2. テンプレート固有データ構造
```typescript
// 複雑なデータ構造の編集UIが未実装
interface TableData {
  headers: string[];
  rows: string[][];
}

interface GraphData {
  type: 'pie' | 'bar';
  data: {
    label: string;
    value: number;
  }[];
}
```

### 3. 編集UI実装の不完全性
```typescript
// 現在の編集フィールド検出ロジック
const getEditableFields = (templateData: TemplateData) => {
  const fields = [];
  
  // 基本フィールドのみ対応
  if (templateData.title) fields.push({key: 'title', label: 'タイトル'});
  if (templateData.subtitle) fields.push({key: 'subtitle', label: 'サブタイトル'});
  if (templateData.content) fields.push({key: 'content', label: 'コンテンツ'});
  
  // 動的フィールドは未対応
  // テンプレート固有データも未対応
  
  return fields;
}
```

## 📊 影響度分析

### 高影響テンプレート
1. **item-n-title-content**: 対応率30% - 動的フィールドが主要データ
2. **table**: 対応率20% - テーブルデータが編集不可
3. **ranking**: 対応率20% - ランキングデータが編集不可
4. **graph**: 対応率20% - グラフデータが編集不可

### 中影響テンプレート
1. **checklist-enhanced**: 対応率40% - チェックリスト項目が編集不可
2. **enumeration**: 対応率80% - badgeTextのみ未対応

### 低影響テンプレート
1. **simple5**: 対応率100% - 完全対応
2. **explanation2**: 対応率100% - 完全対応

## 🎯 解決すべき課題の優先順位

### Phase 1: 高優先度（緊急）
1. **動的フィールド編集機能**: `item1Title`, `item2Title`等の編集対応
2. **ItemNTitleContentTemplate**: 書籍紹介等で頻繁に使用される重要テンプレート

### Phase 2: 中優先度（重要）
1. **テーブルデータ編集**: 表形式データの編集UI
2. **チェックリスト編集**: チェックリスト項目の編集機能

### Phase 3: 低優先度（改善）
1. **グラフデータ編集**: 複雑なデータ可視化編集
2. **ランキングデータ編集**: ランキング項目の編集機能

## 🔄 解決アプローチ

### 短期解決策（1-2週間）
1. **動的フィールド検出機能**: 既存の`item1Title`等を自動検出
2. **基本編集UI拡張**: 動的フィールド用の編集インターフェース

### 中期解決策（2-4週間）
1. **テンプレート固有編集UI**: 各テンプレート専用の編集コンポーネント
2. **統一編集フレームワーク**: 一貫した編集UXの提供

### 長期解決策（1-2ヶ月）
1. **完全編集システム**: 全テンプレートの完全編集対応
2. **検証・保存機能**: 編集データの検証と保存機能強化

## 💡 技術的解決方針

### 1. 動的フィールド検出システム
```typescript
const detectDynamicFields = (templateData: TemplateData, templateType: TemplateType) => {
  const dynamicFields = [];
  
  // item-n-title-contentテンプレートの場合
  if (templateType === 'item-n-title-content') {
    for (let i = 1; i <= 6; i++) {
      const titleKey = `item${i}Title`;
      const contentKey = `item${i}Content`;
      
      if (templateData[titleKey] || templateData[contentKey]) {
        dynamicFields.push({
          index: i,
          titleKey,
          contentKey,
          titleValue: templateData[titleKey] || '',
          contentValue: templateData[contentKey] || ''
        });
      }
    }
  }
  
  return dynamicFields;
}
```

### 2. 統一編集インターフェース
```typescript
interface EditableField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'array' | 'object';
  value: any;
  validation?: (value: any) => boolean;
  maxLength?: number;
}

const generateEditableFields = (templateData: TemplateData, templateType: TemplateType): EditableField[] => {
  const fields: EditableField[] = [];
  
  // 基本フィールド
  fields.push(...getBasicFields(templateData));
  
  // 動的フィールド
  fields.push(...getDynamicFields(templateData, templateType));
  
  // テンプレート固有フィールド
  fields.push(...getTemplateSpecificFields(templateData, templateType));
  
  return fields;
}
```

### 3. テンプレート固有編集コンポーネント
```typescript
const TemplateSpecificEditor = ({ templateType, templateData, onChange }) => {
  switch (templateType) {
    case 'item-n-title-content':
      return <ItemNTitleContentEditor data={templateData} onChange={onChange} />;
    case 'table':
      return <TableEditor data={templateData} onChange={onChange} />;
    case 'graph':
      return <GraphEditor data={templateData} onChange={onChange} />;
    case 'ranking':
      return <RankingEditor data={templateData} onChange={onChange} />;
    default:
      return <DefaultEditor data={templateData} onChange={onChange} />;
  }
}
```

## 🚀 期待される効果

### ユーザビリティ向上
- **完全編集**: 全コンテンツ項目の編集が可能
- **直感的操作**: 一貫した編集UX
- **効率向上**: 再生成不要で即座に修正可能

### 技術的改善
- **型安全性**: 強化された型チェック
- **保守性**: 統一された編集フレームワーク
- **拡張性**: 新テンプレート追加時の編集機能自動対応

---

**次のステップ**: 具体的な実装計画の策定と開発環境の整備