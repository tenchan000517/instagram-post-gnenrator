# HANDOVER - 書籍紹介ジャンル確立

## 📋 基本情報
- **プロジェクト**: 書籍紹介ジャンル（book-recommendation）の実装
- **引き継ぎ日**: 2025-07-16
- **参考実装**: industry-features（業種特徴系データ可視化）
- **技術的基盤**: トレードオフ問題解決済みシステム

## 🎯 実装目標
Instagram投稿生成ツールに書籍紹介ジャンルを追加し、以下の機能を実現：
- 書籍ランキング表示
- レビュー・評価データ可視化
- 著者情報・出版社データ表示
- おすすめ書籍チェックリスト
- 出典情報の適切な表示

## 🚨 予想される技術的課題（industry-features経験より）

### 1. データ参照問題（高確率で発生）
**問題**: AIが生成するデータの配置場所が不一致
```typescript
// 予想される構造の違い
// パターン1: 直下配置
generatedPage.bookData = [...] 
generatedPage.reviewData = {...}
generatedPage.authorInfo = {...}

// パターン2: content内配置  
generatedPage.content.bookData = [...]
generatedPage.content.reviewData = {...}
generatedPage.content.authorInfo = {...}
```

**解決方法**: 統一的参照パターン適用
```typescript
// contentGeneratorService.ts での統一処理
bookData: generatedPage.bookData || generatedPage.content?.bookData,
reviewData: generatedPage.reviewData || generatedPage.content?.reviewData,
authorInfo: generatedPage.authorInfo || generatedPage.content?.authorInfo,
```

### 2. JSON解析エラー（必発）
**問題**: 書籍タイトルや著者名の特殊文字・引用符エラー
```json
// エラー発生例
{
  "title": "「これは"素晴らしい"本です」",  // 引用符エラー
  "author": "田中 太郎（翻訳：佐藤 花子）"    // 特殊文字エラー
}
```

**解決方法**: 既存の堅牢なJSON解析処理活用
- `parseGeneratedJSON()` メソッドがすでに実装済み
- 制御文字除去・引用符エスケープ対応済み

### 3. 文字列分解問題（高確率で発生）
**問題**: 書籍データが文字列として生成される場合の分解
```typescript
// 問題のある処理
Object.assign({}, generatedPage.content, {...})  // 文字列分解発生

// 解決済み処理
Object.assign({}, 
  typeof generatedPage.content === 'string' ? 
    { content: generatedPage.content } : 
    generatedPage.content,
  {...}
)
```

## 🔧 実装手順

### Phase 1: 基本構造準備
1. **ジャンル定義追加**
   - `app/services/genreDetector.ts` にbook-recommendation追加
   - キーワード設定（「書籍」「本」「読書」「著者」等）

2. **テンプレート定義**
   - `book-ranking`: 書籍ランキング表示
   - `book-review`: レビュー・評価データ
   - `author-info`: 著者情報表示
   - `book-checklist`: おすすめ書籍チェックリスト

### Phase 2: データ構造設計
```typescript
// 予想される書籍データ構造
interface BookData {
  title: string
  author: string
  publisher: string
  publishDate: string
  rating: number
  reviewCount: number
  price: number
  description: string
  genre: string[]
  isbn: string
}

interface ReviewData {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    5: number, 4: number, 3: number, 2: number, 1: number
  }
  topReviews: {
    rating: number
    comment: string
    reviewer: string
  }[]
}
```

### Phase 3: テンプレート実装
1. **BookRankingTemplate.tsx**
   - RankingTemplate.tsx をベースに実装
   - 書籍固有のデータ表示対応

2. **BookReviewTemplate.tsx**
   - GraphTemplate.tsx をベースに実装
   - レビュー評価の可視化

3. **BookChecklistTemplate.tsx**
   - ChecklistEnhancedTemplate.tsx をベースに実装
   - おすすめ書籍の選定基準チェックリスト

### Phase 4: データ統合処理
**重要**: 以下の処理を必ず実装
```typescript
// contentGeneratorService.ts での処理
const pages: GeneratedPage[] = generatedPages.map(generatedPage => ({
  templateData: this.convertToTemplateData(
    Object.assign({}, 
      typeof generatedPage.content === 'string' ? 
        { content: generatedPage.content } : 
        generatedPage.content,
      {
        title: generatedPage.title,
        bookData: generatedPage.bookData || generatedPage.content?.bookData,
        reviewData: generatedPage.reviewData || generatedPage.content?.reviewData,
        authorInfo: generatedPage.authorInfo || generatedPage.content?.authorInfo,
        checklistItems: generatedPage.checklistItems || generatedPage.content?.checklistItems
      }
    ),
    generatedPage.templateType
  ),
  content: {
    // 同様の統一処理
    bookData: generatedPage.bookData || generatedPage.content?.bookData,
    reviewData: generatedPage.reviewData || generatedPage.content?.reviewData,
    authorInfo: generatedPage.authorInfo || generatedPage.content?.authorInfo,
  }
}))
```

## 🎯 成功の鍵

### 1. 既存システムの活用
- JSON解析処理: `parseGeneratedJSON()` 使用
- データ参照統一: `|| generatedPage.content?.data` パターン
- 文字列分解防止: `typeof generatedPage.content === 'string'` チェック

### 2. テンプレート登録の確実性
**必須更新箇所** (NOTES.md参照):
- `TemplateTypes.ts` - 型定義追加
- `TemplateRegistry.ts` - メタデータ登録
- `templateMatchingService.ts` - 特徴・要件追加
- `templateRecommendationService.ts` - 推奨ロジック追加
- `contentLayoutService.ts` - バッジマップ・変換ロジック

### 3. 出典情報の適切な処理
```typescript
// 書籍データの出典表示
if (data.content && data.content.includes('【出典】')) {
  // 出典情報の表示処理
}
```

## ⚠️ 注意事項

### 1. 著作権・権利関係
- 書籍データの適切な引用
- 出版社・著者の権利尊重
- レビューデータの適切な利用

### 2. データの精度
- 正確な書籍情報の提供
- 評価データの客観性確保
- 偏りのない推奨システム

### 3. 技術的制約
- 長い書籍タイトルの表示対応
- 複数著者の適切な表示
- 国際的な書籍データの対応

## 📈 期待される成果
1. **書籍紹介投稿の自動生成**
   - ランキング形式での書籍紹介
   - 評価データの可視化
   - 読者向けのおすすめリスト

2. **技術的安定性**
   - industry-features同等の品質
   - エラーの最小化
   - 全機能の同時動作

3. **拡張性**
   - 他の商品紹介ジャンルへの応用
   - データ可視化システムの汎用化

## 📝 参考ファイル
- `app/services/contentGeneratorService.ts` - データ統合処理
- `app/services/structureConstrainedGenerator.ts` - JSON解析
- `app/components/templates/RankingTemplate.tsx` - ランキング表示
- `app/components/templates/GraphTemplate.tsx` - データ可視化
- `app/components/templates/ChecklistEnhancedTemplate.tsx` - チェックリスト

---
**作成日**: 2025-07-16
**技術的基盤**: トレードオフ問題解決済み (コミット: 70eb6a4)
**実装優先度**: 中
**推定工数**: 2-3週間