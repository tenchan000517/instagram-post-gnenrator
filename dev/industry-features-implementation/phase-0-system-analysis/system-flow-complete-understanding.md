# システム生成フロー完全理解（共通認識）

## 🔥 重要発見：実際の生成プロセス

### **AIインスタンス**
- **使用AI**: Gemini（`getGeminiModel()`）
- **場所**: `/app/services/geminiClientSingleton.ts`
- **制約**: 直列化処理（503エラー対策）

### **2段階生成フロー**
```
📋 段階1: PageStructureAnalyzer
  ↓ ユーザー入力を分析してページ構造決定
🎨 段階2: StructureConstrainedGenerator  
  ↓ 決定された構造に基づいて全ページ一括生成
📊 後処理: 表の自動分割処理
```

## 🎯 実際に使用されている重要サービス

### **1. PageStructureAnalyzer**
- **ファイル**: `/app/services/pageStructureAnalyzer.ts`
- **役割**: ユーザー入力からページ構造とテンプレートタイプを決定
- **メソッド**: `analyzePageStructureAndTemplates(userInput)`
- **⚠️ 最重要**: ここでジャンル判定・テンプレート選択が行われる

### **2. StructureConstrainedGenerator**
- **ファイル**: `/app/services/structureConstrainedGenerator.ts`
- **役割**: 決定された構造制約の元で全ページを一括生成
- **メソッド**: `generateAllPagesWithConstraints(userInput, pageStructures)`

### **3. 後処理システム**
- **表分割**: `splitLongTables()` - 長い表を自動分割
- **ハッシュタグ生成**: `generateHashtags()`
- **キャプション生成**: `generateCaptionWithFormat()`

## 📊 データ構造（確定）

### **GeneratedContent（最終出力）**
```typescript
interface GeneratedContent {
  pages: GeneratedPage[]          // 生成されたページ配列
  totalPages: number             // 総ページ数
  caption: string                // Instagram用キャプション
  hashtags: object               // 各種ハッシュタグ
  summary: string                // 要約
}
```

### **GeneratedPage（各ページ）**
```typescript
interface GeneratedPage {
  pageNumber: number             // ページ番号
  templateType: TemplateType     // テンプレートタイプ
  templateData: TemplateData     // テンプレート用データ
  content: {                     // 実際のコンテンツ
    title: string
    subtitle?: string
    description?: string
    items?: string[]
    sections?: Section[]
    tableData?: TableData
    badgeText?: string
    checklistItems?: ChecklistItem[]
  }
  rawContent?: string            // 生のコンテンツ
}
```

## 🎯 業種特徴系に関する重要ポイント

### **現在のジャンル判定場所**
- **PageStructureAnalyzer内** でジャンル判定が実行される
- 業種特徴系は `industry-features` として判定される可能性
- テンプレート選択もここで決定される

### **現在対応しているテンプレート**
- `TemplateType` 型で定義されているテンプレート
- 業種特徴系では `two-column-section-items` が使用される可能性
- **データ可視化テンプレートは未実装**

### **データ可視化対応のために必要な変更点**
1. **新しいTemplateType追加** (ranking, graph)
2. **PageStructureAnalyzer拡張** (新テンプレート判定)
3. **StructureConstrainedGenerator対応** (新構造生成)
4. **テンプレートコンポーネント実装** (RankingTemplate, GraphTemplate)

## 🔍 次の分析対象

### **Phase 0 続行事項**
1. **PageStructureAnalyzer詳細分析** - ジャンル判定ロジック
2. **TemplateTypes確認** - 現在の型定義
3. **業種特徴系の現在の動作確認** - 実際のテスト実行

---

**共通理解**: Geminiを使用した2段階生成で、PageStructureAnalyzerがテンプレート選択の鍵となる