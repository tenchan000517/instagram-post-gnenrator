# Instagram Post Generator - テンプレートマッチング最適化ナレッジ

## 🎯 現在の状況と課題

### 完了済み項目
✅ **SectionItemsTemplate実装完了** (Issue #6部分完了)
- `section-items`型テンプレート新規実装
- pureStructureMatchingServiceとの連携完了
- sections[0].itemsからアクションアイテム表示成功

### 現在の課題
❌ **Points構造コンテンツの最適化が必要**
- 2個のpointsを持つコンテンツが`explanation`テンプレートに誤選択
- pointsデータが表示されない問題

## 📋 データ構造パターン分析

### Pattern A: Section-Items型（完了済み）
```json
{
  "templateType": "explanation", // AI選択
  "content": {
    "sections": [
      {
        "title": "朝の習慣で脳を活性化",
        "content": "説明文...",
        "items": ["項目1", "項目2", "項目3", "項目4"]
      }
    ]
  }
}
```
**結果**: `section-items`型に正しく変換 ✅

### Pattern B: Points型（要修正）
```json
{
  "templateType": "explanation", // AI選択
  "templateData": {
    "points": [
      {
        "title": "情報収集：多様な情報源からインプット",
        "description": "業界研究、企業研究、面接対策に役立つ情報を積極的に収集しましょう。"
      },
      {
        "title": "振り返り：自己分析と改善", 
        "description": "一日の終わりに、15分程度の就職活動日記をつけましょう。"
      }
    ]
  }
}
```
**問題**: `explanation`のままでpointsが表示されない ❌

## 🔧 技術実装詳細

### 1. pureStructureMatchingService.ts
**場所**: `/app/services/pureStructureMatchingService.ts`

**現在の実装状況**:
```typescript
export class PureStructureMatchingService {
  private structurePatterns: StructurePattern[] = [
    {
      templateType: 'section-items', // ✅ 実装済み
      structureCheck: (content) => sections.length === 1 && sections[0].items?.length >= 3,
      priority: 10
    },
    // ❌ points型パターンが不足
  ]
}
```

**必要な追加パターン**:
```typescript
{
  templateType: 'points-explanation', // 新規テンプレート型
  description: '複数ポイント解説構造',
  structureCheck: (content) => {
    const points = content?.points || []
    return points.length >= 2 && points.length <= 4 &&
           points.every(p => p.title && p.description)
  },
  priority: 9
}
```

### 2. テンプレート選択ロジック
**matchTemplateToContent()での処理**:
1. 各パターンの`structureCheck()`で適合判定
2. `structureScore()`でスコア計算
3. 最高スコア × 優先度で最終決定
4. `templateData`にデータ追加

**section-items実装例**:
```typescript
if (bestTemplate === 'section-items' && page.content?.sections) {
  updatedTemplateData.sections = page.content.sections
}
```

### 3. デザインコンセプト統一
**統一要素**:
- **配色**: `blue-600`系統（bg-blue-600, text-blue-600, border-blue-100）
- **背景**: `bg-gradient-to-br from-blue-50 to-white`
- **バッジ**: `bg-blue-600 text-white rounded-full`
- **カード**: `bg-white rounded-2xl shadow-sm border border-blue-100`
- **アイコン**: CheckCircle, ArrowRight (Lucide React)
- **フォント**: タイトル`text-2xl`、内容`text-base`

## 🛠️ 修正方針

### Step 1: Points型パターン追加
**ファイル**: `pureStructureMatchingService.ts`
1. points構造用のStructurePatternを追加
2. 適切な優先度設定（8-9推奨）
3. structureCheckでpoints配列の検証

### Step 2: Points対応テンプレートの決定
**選択肢A**: 既存`explanation2`テンプレートを改良
**選択肢B**: 新規`points-explanation`テンプレートを作成

**推奨**: 既存`explanation2`テンプレートの改良
- 理由: pointsデータ構造に既に対応
- 必要作業: デザインコンセプト統一のみ

### Step 3: ExplanationTwoTemplate改良
**ファイル**: `/app/components/templates/ExplanationTwoTemplate.tsx`
1. デザインコンセプトをblue系に統一
2. pointsデータの表示確認
3. 統一フォントサイズ適用

## 📁 重要ファイル一覧

### 必要ファイル
1. **`/app/services/pureStructureMatchingService.ts`** - マッチングロジック
2. **`/app/components/templates/ExplanationTwoTemplate.tsx`** - points表示テンプレート
3. **`/app/components/templates/TemplateTypes.ts`** - 型定義
4. **`/ISSUES.md`** - 進捗管理

### 参考ファイル
- **`/app/components/templates/SectionItemsTemplate.tsx`** - 実装例
- **`/app/components/templates/EnumerationTemplate.tsx`** - デザイン参考
- **`/app/components/TemplateViewer.tsx`** - テスト確認用

### 不要ファイル（無視）
- **`HANDOVER_*.md`** - 古い実装メモ
- **`TEMPLATE_*.md`** - 分析ドキュメント
- **他テンプレートファイル** - 今回の修正対象外

## 🎯 期待される最終結果

### Before（現在）
```
explanation テンプレート選択
├─ タイトル表示 ✓
├─ content表示 ✓  
└─ points表示 ❌（データが無視される）
```

### After（修正後）
```
explanation2 テンプレート選択
├─ タイトル表示 ✓
├─ content表示 ✓
└─ points表示 ✓
   ├─ 情報収集：多様な情報源からインプット
   └─ 振り返り：自己分析と改善
```

## 🚀 実装優先度

1. **高**: pureStructureMatchingServiceにpoints型パターン追加
2. **中**: ExplanationTwoTemplateのデザイン統一
3. **低**: TemplateViewerでの動作確認

## 💡 実装のコツ

1. **段階的実装**: 1つずつ修正してテスト
2. **ログ活用**: console.logで構造確認
3. **デザイン統一**: 既存テンプレートのスタイルをコピー
4. **型安全性**: TypeScriptエラーを必ず解決

---

**次世代Claude Code担当者へ**: このドキュメントの内容に従って、points構造コンテンツの最適化を実装してください。SectionItemsTemplateの実装例を参考に、同様の手順で進めることを推奨します。