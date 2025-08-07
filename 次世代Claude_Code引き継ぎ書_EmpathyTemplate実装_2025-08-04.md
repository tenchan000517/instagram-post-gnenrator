# 次世代Claude Code引き継ぎ書 - EmpathyTemplate実装

## 📋 引き継ぎ概要
**作業日**: 2025年8月4日  
**引き継ぎ理由**: EmpathyTemplateの登録とシステム統合作業の完了  
**緊急度**: 高（Type001の共感ページ機能に直結）

## 🎯 作業の背景・目的
Type001（感情共感型）でpage2を第二導入（共感）ページとして機能させるため、以下の変更を実施中：

1. **システム変更**: `contentGeneratorService.ts`でindex→empathyに変更済み
2. **テンプレート作成**: EmpathyTemplate.tsx作成済み（unifiedディレクトリ）
3. **未完了**: テンプレート登録とシステム統合

## 📁 作業対象ファイル

### ✅ 完了済みファイル
1. **`/app/services/contentGeneratorService.ts`** (328-339行目)
   ```typescript
   // 共感ページの処理チェック
   if (pageInfo.templateId === 'index_template' && pageInfo.optional) {
     // 共感セクションのページを特定
     const empathyPages = Object.keys(knowledgeData.detailedContent || {})
       .filter(key => {
         const pageData = knowledgeData.detailedContent?.[key]
         return pageData?.section === "empathy"  // index→empathyに変更済み
       })
   ```

2. **`/app/components/templates/unified/EmpathyTemplate.tsx`** 
   - 共感ページ用テンプレート作成済み
   - メタデータ定義済み
   - 既存の命名規則・コメント規則に準拠して作成

### 🚧 未完了（要実装）ファイル

#### 1. **テンプレート登録** - `/app/components/templates/unified/index.ts`
**追加箇所**: 62行目付近
```typescript
// 共感テンプレート: Type001第二導入ページ用
export { 
  EmpathyTemplate, 
  empathyMetadata 
} from './EmpathyTemplate'
```

**UNIFIED_TEMPLATE_MAP追加**:
```typescript
// 共感テンプレート
'empathy': {
  component: 'EmpathyTemplate',
  metadata: 'empathyMetadata'
}
```

**UNIFIED_TEMPLATES配列追加**:
```typescript
export const UNIFIED_TEMPLATES = [
  'simple_intro',
  'dual_section', 
  'ranking_display',
  'item_grid',
  'comparison',
  'company_detail',
  'item_list',
  'section_blocks',
  'dynamic_boxes',
  'image_point',
  'empathy'  // ← 追加
] as const
```

#### 2. **メインindex.ts登録** - `/app/components/templates/index.ts`
**exportセクション追加** (52行目付近):
```typescript
export { EmpathyTemplate } from './unified/EmpathyTemplate'
```

**importセクション追加** (155行目付近):
```typescript
import { EmpathyTemplate } from './unified/EmpathyTemplate'
```

**templateComponentsマップ追加** (225行目付近):
```typescript
export const templateComponents = {
  // ... 既存
  'image_point': ImagePointTemplate,
  'empathy': EmpathyTemplate  // ← 追加
} as const
```

**unifiedTemplates配列更新** (258行目付近):
```typescript
const unifiedTemplates = [
  'section_blocks', 'item_list', 'dual_section', 'ranking_display',
  'item_grid', 'comparison', 'unified_company_detail', 'dynamic_boxes', 'image_point', 'empathy'  // ← empathy追加
]
```

#### 3. **pageStructureファイル更新**
**対象**: 全unifiedテンプレートの`index_template`→`empathy_template`変更

**ファイルリスト**:
- `/app/services/knowledgeBase/data/pageStructures/unified/unified-template-01-simple-intro.json`
- `/app/services/knowledgeBase/data/pageStructures/unified/unified-template-02-dual-section.json`
- `/app/services/knowledgeBase/data/pageStructures/unified/unified-template-03-ranking-display.json`
- `/app/services/knowledgeBase/data/pageStructures/unified/unified-template-04-item-grid.json`
- `/app/services/knowledgeBase/data/pageStructures/unified/unified-template-05-comparison.json`
- `/app/services/knowledgeBase/data/pageStructures/unified/unified-template-06-company-detail.json`
- `/app/services/knowledgeBase/data/pageStructures/unified/unified-template-07-item-list.json`
- `/app/services/knowledgeBase/data/pageStructures/unified/unified-template-08-section-blocks.json`
- `/app/services/knowledgeBase/data/pageStructures/unified/unified-template-09-dynamic-boxes.json`
- `/app/services/knowledgeBase/data/pageStructures/unified/unified-template-10-image-point.json`

**変更内容** (各ファイル19-21行目):
```json
{
  "pageNumber": 2,
  "templateId": "empathy_template",  // index_template → empathy_template
  "optional": true
}
```

#### 4. **contentGeneratorService.ts更新**
**変更箇所**: 328行目
```typescript
if (pageInfo.templateId === 'empathy_template' && pageInfo.optional) {  // index_template → empathy_template
```

## 🎨 コメント・命名規則

### **既存ルールの踏襲**
1. **コメント形式**: `// テンプレート○○: ○○○○型` 
2. **export形式**: ブロック単位でのexport
3. **メタデータ命名**: `○○Metadata` (camelCase)
4. **配列要素**: シングルクォート使用
5. **const assertion**: `as const` 必須

### **EmpathyTemplate固有命名**
- **テンプレートID**: `'empathy'`
- **コンポーネント名**: `'EmpathyTemplate'`
- **メタデータ名**: `'empathyMetadata'`
- **説明**: `'Type001第二導入ページ用'`

## 🚨 重要注意事項

### **システム整合性**
1. **section判定**: `pageData?.section === "empathy"` で動作
2. **テンプレート構造**: 既存のSimpleIntroTemplateと同等の構造
3. **データフィールド**: `empathyMessage`, `imageSrc`, `imageAlt`対応
4. **ログ出力**: `console.log('🎨 テンプレートデータ挿入 - empathy')`

### **K059テスト用**
- **page2のsection**: `"empathy"`に変更
- **テンプレート**: EmpathyTemplateが適用されることを確認
- **データ構造**: `empathyMessage`フィールド使用

## ✅ 検証項目

### **実装後確認**
1. [ ] EmpathyTemplateがtemplateComponentsに登録済み
2. [ ] unifiedTemplates配列にempathy追加済み
3. [ ] 10個のpageStructureファイル更新済み
4. [ ] contentGeneratorServiceでempathy_template判定済み
5. [ ] K059でpage2がEmpathyTemplateで表示される

### **動作確認**
1. [ ] K059投稿生成でpage2が共感ページとして表示
2. [ ] empathyメッセージが正しく表示
3. [ ] キャラクター画像が正しく表示
4. [ ] 他のType001投稿に影響なし

## 🔧 トラブルシューティング

### **よくある問題**
1. **テンプレート未登録**: templateComponentsマップ確認
2. **import/export漏れ**: index.tsの両方確認
3. **型エラー**: UnifiedTemplateId型定義更新
4. **構造不一致**: pageStructureファイルの更新確認

---

**🚨 重要**: この引き継ぎ内容は **Type001の共感ページ機能** に直結します。すべての項目を **完全実装** してからテストを行ってください。

**作成者**: Claude Code (2025-08-04)  
**次世代実装者**: 次世代Claude Code  
**優先度**: 最高 - 即座実装必須