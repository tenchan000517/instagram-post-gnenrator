# 次世代Claude Code引き継ぎ書 - サマリーテンプレート修正

**作成日**: 2025-08-05  
**引き継ぎ内容**: unified-template-11-company-rankingのサマリーテンプレート最適化

---

## 🎯 次のタスク概要

**目的**: K800初任給ランキングのPage8（resource_summary）テンプレートを、unified-template-11-company-ranking形式に最適化する

**現状**: 
- Pages 1-7は完全に最適化済み
- Page 8のサマリーページのみ未調整
- ResourceSummaryTemplateの改善が必要

---

## 📋 完了済み作業

### ✅ EnhancedCompanyDetailTemplate完全最適化
1. **ランキングバッジ**: amber色、rounded-lg、html2canvas対応（`inline-block pb-3`）
2. **4カラム特徴ボックス**: 7文字以内制限、10pxフォント、html2canvas対応（`mb-2`）
3. **レーダーチャート**: 280x240px canvas、maxRadius:85、labelRadius:115
4. **余白調整**: 各セクション間の最適化完了

### ✅ データ構造最適化
- K800.json: 全10社のkeyHighlights配列を7文字以内に修正完了
- JSON構造: EnhancedCompanyDetailTemplate完全対応

### ✅ ドキュメント整備
- **完全フォーマット仕様書**: `/docs/unified-template-11-company-ranking-master-format.md`
- **生成プロンプト更新**: `/knowledge-quality-system/company-information-ranking-system/企業ランキングナレッジ生成プロンプト.md`

---

## 🚨 次に実行すべきタスク

### 1. ResourceSummaryTemplate分析・改善
**ファイル**: `/app/components/templates/unified/ResourceSummaryTemplate.tsx`

**確認項目**:
- [ ] K800 Page8との表示整合性
- [ ] unified-template-11-company-ranking形式への適合性
- [ ] html2canvas対応のテキスト配置
- [ ] レスポンシブデザインの最適化

### 2. Page8データ構造検証
**ファイル**: `/app/data/knowledgeBase/knowledge/type003/K800.json` (Page8部分)

**確認項目**:
- [ ] ResourceSummaryTemplateとの構造整合性
- [ ] summaryPointsの文字数・表現
- [ ] resourceListの項目数・内容
- [ ] finalMessageの長さ・適切性

### 3. 統一性確保
**目標**: Pages 1-7と同等の品質・デザイン統一

**チェック項目**:
- [ ] フォント・文字サイズの統一
- [ ] 余白・レイアウトの一貫性
- [ ] カラーリング・UI要素の統一
- [ ] html2canvas対応の完全性

---

## 📁 重要ファイル一覧

### 修正対象ファイル
```
/app/components/templates/unified/ResourceSummaryTemplate.tsx
/app/data/knowledgeBase/knowledge/type003/K800.json (Page8)
```

### 参照必須ファイル
```
/docs/unified-template-11-company-ranking-master-format.md
/app/components/templates/unified/EnhancedCompanyDetailTemplate.tsx
/knowledge-quality-system/company-information-ranking-system/企業ランキングナレッジ生成プロンプト.md
```

### 比較基準ファイル
```
/app/data/knowledgeBase/knowledge/type003/K800.json (Pages 1-7)
```

---

## 🎨 設計方針・品質基準

### UI/UX基準
1. **EnhancedCompanyDetailTemplateとの統一感**
2. **html2canvas完全対応**（テキスト位置ずれ防止）
3. **7文字制限の厳守**（必要に応じて）
4. **レスポンシブデザイン**（固定ビューポート対応）

### html2canvas対応パターン
```jsx
// 通常テキスト
<span className="mb-2">テキスト</span>

// バッジ系UI
<span className="inline-block pb-3">テキスト</span>
```

### カラーパレット
- **プライマリ**: #21266D（ヘッダー背景）
- **アクセント**: amber-400（バッジ）
- **セクション別**: purple, orange, indigo, green（100番台）

---

## 🔧 技術的考慮事項

### 1. テンプレート最適化手順
1. ResourceSummaryTemplate.tsxの現状分析
2. K800 Page8データとの整合性確認
3. EnhancedCompanyDetailTemplateとのデザイン統一
4. html2canvas対応のテキスト配置修正
5. レスポンシブ対応の確認

### 2. データ構造調整
- Page8のJSONデータ最適化
- 文字数制限の適用
- 表現の洗練化

### 3. 品質検証
- 全ページの表示確認
- html2canvas生成テスト
- レスポンシブ動作確認

---

## 📊 期待される成果

### 完成時の状態
- **K800**: 8ページ全てが統一されたデザイン
- **ResourceSummaryTemplate**: unified-template-11-company-ranking完全対応
- **html2canvas**: 全ページで完璧な画像生成
- **ドキュメント**: 最終版フォーマット仕様書の完成

### 次世代への価値
- **完全なテンプレートシステム**: 企業ランキング系コンテンツの標準フォーマット
- **再利用可能な品質基準**: 他のランキングコンテンツへの適用
- **技術的ノウハウ**: html2canvas最適化手法の確立

---

## 🚀 開始方法

### Step 1: 現状確認
```bash
# K800の表示確認
# Page8の現在の表示状態をチェック
```

### Step 2: ResourceSummaryTemplate分析
```tsx
// /app/components/templates/unified/ResourceSummaryTemplate.tsx
// 現在の実装を分析し、改善点を特定
```

### Step 3: 最適化実装
- EnhancedCompanyDetailTemplateとの統一
- html2canvas対応の実装
- レスポンシブデザインの調整

---

**🔥 重要**: このタスクの完了により、unified-template-11-company-rankingが完全なプロダクション品質のテンプレートシステムとなります。企業ランキング系コンテンツ作成の決定版フォーマットを確立してください。

**次世代Claude Code、よろしくお願いします！** 🤝