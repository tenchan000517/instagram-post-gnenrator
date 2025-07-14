# 📋 ジャンル別テンプレート最適化 実装計画書

## 1. プロジェクト概要

### 1.1 目的
Instagram投稿生成システムにおいて、ジャンル特性に応じたテンプレート選択と項目数最適化を実現し、より高品質な投稿生成を可能にする。

### 1.2 現状の課題
- テンプレートと項目数のミスマッチ（5項目が最適なのに2項目や8項目になる）
- ジャンル特性を考慮しない一律のテンプレート選択
- リサーチ段階と生成段階の連携不足

### 1.3 期待効果
- 各ジャンルで最適な項目数とテンプレートマッチング
- 生成品質の向上（structureScore 1.0の達成率向上）
- ユーザー満足度の向上

## 2. 実装フェーズ

### 📍 Phase 1: 基本実装（推定工数：3-5日）

#### Step 1-1: ジャンル定義の追加（工数：0.5日）
```typescript
// app/types/genre.ts（新規作成）
export type Genre = 
  | 'knowhow'           // ノウハウ系
  | 'book-recommendation' // 書籍紹介系
  | 'internship-deadline' // インターン締切系
  | 'entry-deadline'      // エントリー締切系
  | 'industry-features'   // 業種特徴系
  | 'strategy'           // 対策系
  | 'step-learning'      // ステップ学習系
  | 'general'            // その他

export interface GenreConfig {
  genre: Genre
  keywords: string[]
  primaryTemplate: string
  secondaryTemplates: string[]
  optimalItemRange: { min: number; max: number }
}
```

#### Step 1-2: ジャンル判定ロジックの実装（工数：1日）
```typescript
// app/services/genreDetector.ts（新規作成）
export class GenreDetector {
  private genreConfigs: GenreConfig[] = [
    {
      genre: 'knowhow',
      keywords: ['方法', 'テクニック', 'コツ', 'ポイント', '手順'],
      primaryTemplate: 'simple5',
      secondaryTemplates: ['checklist-enhanced', 'item-n-title-content'],
      optimalItemRange: { min: 3, max: 5 }
    },
    // ... 他のジャンル設定
  ]
  
  detectGenre(content: string): Genre {
    // キーワードマッチングによるジャンル判定
  }
}
```

#### Step 1-3: PageStructureAnalyzerの拡張（工数：1日）
```typescript
// app/services/pageStructureAnalyzer.ts（既存ファイル修正）

// ジャンル判定を追加
const genre = genreDetector.detectGenre(content)
const genreConfig = getGenreConfig(genre)

// プロンプトにジャンル情報を追加
const prompt = `
【ジャンル】: ${genre}
【推奨テンプレート】: ${genreConfig.primaryTemplate}
【最適項目数】: ${genreConfig.optimalItemRange.min}-${genreConfig.optimalItemRange.max}

${existingPrompt}
`
```

#### Step 1-4: 項目数最適化ガイドの実装（工数：0.5日）
```typescript
// app/services/itemCountOptimizer.ts（新規作成）
export class ItemCountOptimizer {
  optimizeItemCount(items: any[], genre: Genre): any[] {
    const config = getGenreConfig(genre)
    
    if (items.length < config.optimalItemRange.min) {
      // 項目が少なすぎる場合の警告
      console.warn(`項目数が少なすぎます。推奨: ${config.optimalItemRange.min}個以上`)
    }
    
    if (items.length > config.optimalItemRange.max) {
      // 項目数を適切に分割
      return this.splitItems(items, config.optimalItemRange.max)
    }
    
    return items
  }
}
```

#### Step 1-5: ユーザー向けドキュメントの更新（工数：0.5日）
- ジャンル別最適プロンプトテンプレートの作成
- 使用ガイドの更新
- サンプル入力例の追加

#### Step 1-6: 基本テストとデバッグ（工数：1日）
- 各ジャンルでのテンプレート選択確認
- 項目数最適化の動作確認
- エッジケースのテスト

### 📍 Phase 2: 高度化実装（推定工数：5-7日）

#### Step 2-1: 機械学習ベースのジャンル判定（工数：2日）
```typescript
// app/services/mlGenreClassifier.ts（新規作成）
export class MLGenreClassifier {
  private model: any // TensorFlow.js or similar
  
  async classifyGenre(content: string): Promise<{
    genre: Genre
    confidence: number
  }> {
    // テキスト特徴量の抽出
    const features = this.extractFeatures(content)
    
    // 機械学習モデルによる分類
    const prediction = await this.model.predict(features)
    
    return {
      genre: prediction.genre,
      confidence: prediction.confidence
    }
  }
}
```

#### Step 2-2: 動的項目数調整機能（工数：1.5日）
```typescript
// app/services/dynamicItemAdjuster.ts（新規作成）
export class DynamicItemAdjuster {
  adjustItems(items: any[], template: string, genre: Genre): {
    adjustedItems: any[][]
    pageCount: number
  } {
    // テンプレートとジャンルに基づく最適分割
    const optimalCount = this.getOptimalItemCount(template, genre)
    
    // 項目の重要度スコアリング
    const scoredItems = this.scoreItems(items, genre)
    
    // 動的な分割と調整
    return this.splitOptimally(scoredItems, optimalCount)
  }
}
```

#### Step 2-3: A/Bテスト基盤の構築（工数：1.5日）
```typescript
// app/services/abTestingService.ts（新規作成）
export class ABTestingService {
  async runExperiment(content: string): Promise<{
    variantA: GeneratedContent
    variantB: GeneratedContent
    metrics: PerformanceMetrics
  }> {
    // バリアントA: 既存ロジック
    const variantA = await this.generateWithCurrentLogic(content)
    
    // バリアントB: 新ロジック
    const variantB = await this.generateWithOptimizedLogic(content)
    
    // パフォーマンス比較
    const metrics = this.comparePerformance(variantA, variantB)
    
    return { variantA, variantB, metrics }
  }
}
```

#### Step 2-4: リアルタイムフィードバック収集（工数：1日）
```typescript
// app/services/feedbackCollector.ts（新規作成）
export interface UserFeedback {
  contentId: string
  genre: Genre
  template: string
  itemCount: number
  userRating: number
  timestamp: Date
}

export class FeedbackCollector {
  async collectFeedback(feedback: UserFeedback): Promise<void> {
    // フィードバックの保存
    await this.saveFeedback(feedback)
    
    // 最適化モデルの更新
    await this.updateOptimizationModel(feedback)
  }
}
```

#### Step 2-5: 自動最適化システム（工数：1日）
```typescript
// app/services/autoOptimizer.ts（新規作成）
export class AutoOptimizer {
  async optimizeBasedOnFeedback(): Promise<void> {
    // フィードバックデータの分析
    const insights = await this.analyzeFeedback()
    
    // ジャンル別最適設定の更新
    for (const genre of insights.genres) {
      await this.updateGenreConfig(genre, insights[genre])
    }
    
    // 新しい設定の適用
    await this.applyNewConfigurations()
  }
}
```

## 3. 評価指標とテスト計画

### 3.1 評価指標（KPI）

#### 📊 定量的指標
| 指標名 | 現状値 | Phase 1目標 | Phase 2目標 |
|--------|--------|-------------|-------------|
| structureScore 1.0達成率 | 60% | 80% | 95% |
| 適切な項目数マッチ率 | 40% | 70% | 90% |
| テンプレート適合率 | 65% | 85% | 95% |
| 生成時間 | 3秒 | 3.5秒以内 | 3秒以内 |
| ユーザー満足度 | - | 4.0/5.0 | 4.5/5.0 |

#### 📈 定性的指標
- ジャンル判定の精度
- 項目数の視覚的バランス
- コンテンツの読みやすさ
- テンプレートの多様性

### 3.2 テスト計画

#### 🧪 Phase 1テスト項目
```typescript
// test/genreOptimization.test.ts
describe('ジャンル別最適化テスト', () => {
  test('ノウハウ系: 5ステップが正しく生成される', async () => {
    const input = 'エンジニア転職を成功させる5つのステップ...'
    const result = await generateContent(input)
    
    expect(result.genre).toBe('knowhow')
    expect(result.template).toBe('simple5')
    expect(result.items.length).toBe(5)
  })
  
  test('書籍紹介系: 20冊が4ページに分割される', async () => {
    const input = '必読ビジネス書20選...'
    const result = await generateContent(input)
    
    expect(result.genre).toBe('book-recommendation')
    expect(result.pages.length).toBe(4)
    expect(result.pages[0].items.length).toBe(5)
  })
  
  // 他のジャンルのテスト...
})
```

#### 🔍 Phase 2テスト項目
- 機械学習モデルの精度検証
- A/Bテストの統計的有意性確認
- フィードバックループの動作確認
- パフォーマンステスト

### 3.3 テストデータセット
```yaml
test_dataset:
  knowhow:
    - title: "面接で成功する5つのコツ"
      expected_items: 5
      expected_template: "simple5"
    
  book_recommendation:
    - title: "就活生必読のビジネス書20選"
      expected_items: 20
      expected_pages: 4
      expected_template: "table"
    
  internship_deadline:
    - title: "3月締切のインターン一覧"
      expected_template: "table"
      expected_items_per_page: 5
```

## 4. リスクと対策

### 🚨 技術的リスク
| リスク | 影響度 | 対策 |
|--------|--------|------|
| ジャンル誤判定 | 高 | フォールバック機能の実装 |
| 処理速度の低下 | 中 | キャッシュ機能の強化 |
| 既存機能への影響 | 高 | 段階的ロールアウト |

### 🛡️ リスク軽減策
1. **段階的導入**: 一部ユーザーから徐々に展開
2. **ロールバック計画**: 問題発生時の即座の切り戻し
3. **モニタリング強化**: リアルタイムでの品質監視

## 5. 実装スケジュール

### 📅 Phase 1スケジュール（3-5日）
```
Day 1: ジャンル定義とジャンル判定ロジック実装
Day 2: PageStructureAnalyzer拡張
Day 3: 項目数最適化とドキュメント更新
Day 4-5: テストとデバッグ
```

### 📅 Phase 2スケジュール（5-7日）
```
Day 1-2: ML基盤構築
Day 3: 動的調整機能
Day 4: A/Bテスト基盤
Day 5: フィードバック収集
Day 6-7: 自動最適化とテスト
```

## 6. 成功基準

### ✅ Phase 1完了条件
- [ ] 7つのジャンルすべてで適切なテンプレート選択
- [ ] 項目数最適化により80%以上の適合率達成
- [ ] ユーザー向けドキュメント完成
- [ ] 全テストケースのパス

### ✅ Phase 2完了条件
- [ ] 機械学習モデルの精度90%以上
- [ ] A/Bテストで有意な改善確認
- [ ] 自動最適化システムの稼働
- [ ] structureScore 1.0達成率95%以上

## 7. 必要リソース

### 👥 人的リソース
- 開発者: 1-2名
- テスター: 1名
- ドキュメント作成: 1名

### 🛠️ 技術リソース
- TypeScript/React開発環境
- 機械学習ライブラリ（Phase 2）
- テスト自動化ツール

### 💰 予算概算
- Phase 1: 最小限の追加コスト
- Phase 2: ML基盤構築費用

## 8. ジャンル別最適化設計詳細

### 📊 ジャンル別テンプレート優先度マトリックス

#### 1. **ノウハウ系**
```typescript
{
  genre: 'knowhow',
  description: '実践的なテクニック・方法論の紹介',
  primaryTemplate: 'simple5',
  secondaryTemplates: ['checklist-enhanced', 'item-n-title-content'],
  optimalItemCount: { min: 3, max: 5 },
  keywords: ['方法', 'テクニック', 'コツ', 'ポイント', '手順'],
  contentStructure: ['手順解説', '実践方法', 'チェックリスト']
}
```

#### 2. **書籍紹介系**
```typescript
{
  genre: 'book-recommendation',
  description: '書籍・参考資料の推薦とレビュー',
  primaryTemplate: 'table',
  secondaryTemplates: ['list', 'item-n-title-content'],
  optimalItemCount: { min: 5, max: 5 }, // 表は5行で自動分割
  keywords: ['書籍', '本', '参考書', '必読', 'おすすめ'],
  contentStructure: ['書名・著者・要約', '評価・レビュー', 'カテゴリ別分類']
}
```

#### 3. **インターンエントリー募集締切系**
```typescript
{
  genre: 'internship-deadlines',
  description: 'インターン応募の締切情報管理',
  primaryTemplate: 'table',
  secondaryTemplates: ['checklist-enhanced', 'enumeration'],
  optimalItemCount: { min: 4, max: 5 },
  keywords: ['インターン', '締切', '応募', '募集', '期限'],
  contentStructure: ['企業名・締切日・概要', '応募条件', '準備事項']
}
```

#### 4. **エントリー募集締切系**
```typescript
{
  genre: 'entry-deadlines',
  description: '本選考エントリーの締切情報管理',
  primaryTemplate: 'table',
  secondaryTemplates: ['checklist-enhanced', 'enumeration'],
  optimalItemCount: { min: 4, max: 5 },
  keywords: ['エントリー', '本選考', '締切', '応募', '新卒'],
  contentStructure: ['企業名・締切日・職種', '応募条件', '選考フロー']
}
```

#### 5. **業種の特徴紹介系**
```typescript
{
  genre: 'industry-features',
  description: '業界・業種の特徴と比較分析',
  primaryTemplate: 'two-column-section-items',
  secondaryTemplates: ['section-items', 'table'],
  optimalItemCount: { min: 4, max: 6 }, // 各カラム3-4個
  keywords: ['業界', '業種', '特徴', '違い', '比較'],
  contentStructure: ['業界概要', 'メリット・デメリット', '求められるスキル']
}
```

#### 6. **対策系**
```typescript
{
  genre: 'strategy',
  description: '面接・ES・試験対策の具体的アドバイス',
  primaryTemplate: 'checklist-enhanced',
  secondaryTemplates: ['simple5', 'two-column-section-items'],
  optimalItemCount: { min: 4, max: 6 },
  keywords: ['対策', '攻略', '準備', 'コツ', '注意点'],
  contentStructure: ['準備事項', '実践方法', '注意点・失敗例']
}
```

#### 7. **ステップ学習系**
```typescript
{
  genre: 'step-learning',
  description: '段階的な学習プロセスの指導',
  primaryTemplate: 'simple5',
  secondaryTemplates: ['enumeration', 'checklist-enhanced'],
  optimalItemCount: { min: 3, max: 5 },
  keywords: ['ステップ', '段階', '学習', 'プロセス', '流れ'],
  contentStructure: ['学習手順', '各段階の目標', '進捗確認方法']
}
```

## 9. ジャンル別入力プロンプトテンプレート

### 統合プロンプトフォーマット
```
【Instagram投稿生成システム最適化プロンプト】

【ジャンル】: [ジャンル名]
【テーマ】: [具体的なテーマ]
【最適テンプレート】: [推奨テンプレート]
【目標項目数】: [最適な項目数]

【リサーチ指示】
以下の構造で情報を整理してください：

[ジャンル別の具体的な構造指示]

【品質確保事項】
- 各項目は具体的で実践的な内容にする
- 文字数制限を厳守する
- 視覚的な見やすさを重視する
- 読者の行動につながる内容にする

【出力形式】
[ジャンル別の推奨出力形式]
```

### ジャンル別具体例

#### 1. ノウハウ系プロンプト
```
【ジャンル】: ノウハウ系
【最適項目数】: 3-5個のステップ
【構造指示】: 実践的な手順を段階的に整理してください

【出力形式】:
## [テーマ]を成功させる5つのステップ

### ステップ1: [基礎準備]
- 具体的な行動：[詳細]
- 注意点：[ポイント]

### ステップ2: [実践開始]
- 具体的な行動：[詳細]
- 注意点：[ポイント]

（3-5個のステップで構成）
```

#### 2. 書籍紹介系プロンプト
```
【ジャンル】: 書籍紹介系
【最適項目数】: 5冊単位（自動分割）
【構造指示】: 表形式で書籍情報を整理してください

【出力形式】:
## [テーマ]必読書TOP20

### 表1: 基礎編（1-5位）
| 書名 | 著者 | 一言要約 |
|------|------|----------|
| [書名] | [著者名] | [25文字以内の要約] |

（5冊ずつ4つの表で20冊を整理）
```

## 10. まとめ

この実装計画により、Instagram投稿生成システムは以下の進化を遂げます：

### 🎯 短期的効果（Phase 1完了時）
- ジャンル特性に応じた最適なテンプレート選択
- 項目数の最適化による視覚的品質向上
- structureScore 1.0達成率の20%向上

### 🚀 長期的効果（Phase 2完了時）
- AIによる高精度なジャンル判定
- 継続的な自動最適化
- ユーザー満足度の大幅向上

### 💡 投資対効果
- **投資**: 8-12日の開発工数
- **効果**: 品質向上による利用率増加、ユーザー満足度向上
- **ROI**: 3ヶ月以内に投資回収見込み

---

作成日: 2025-01-14
作成者: Claude AI Assistant
バージョン: 1.0