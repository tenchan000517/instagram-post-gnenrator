# 📊 Career ジャンル専用ワークスペース

## 🎯 Career ジャンルの特性

### 表現意図
**「データに基づく客観的判断材料」**
- 統計データ、ランキング、比較表による情報提供
- 「調べてみたい」「比較検討したい」と思わせる
- 主観的な意見よりも客観的なデータを重視

### 現在の問題
- データ可視化テンプレートが選択されにくい
- section-items で統計情報が表示されている
- 視覚的インパクトが不足している

### 理想的な結果
- ページ1-2: `ranking` = 年収・企業ランキング
- ページ3-4: `graph` = 統計データの可視化
- ページ5-6: `table` = 比較表・一覧表
- データの権威性と客観性を強調

## 📊 推奨テンプレート構成

### 優先度別テンプレート
```typescript
'career': {
  primaryTemplates: ['ranking', 'graph', 'table'],          // 40% + 30% + 30%
  secondaryTemplates: ['section-items'],                    // 必要に応じて
  avoidTemplates: ['checklist-enhanced'],                   // 実行手順は不適
  characteristicKeywords: ['データ', '統計', '年収', '企業', '比較', 'ランキング', '順位'],
  expressionIntent: 'データに基づく客観的判断材料'
}
```

### 具体的な配分目標
- **ranking**: 40%（年収・企業ランキング）
- **graph**: 30%（統計データの可視化）
- **table**: 30%（比較表・企業一覧）
- **section-items**: 0%（データ表示には不適）

## 📋 テンプレート選択戦略

### 1. ranking が適用される条件
```typescript
// 以下の条件を満たす場合
- 「ランキング」「順位」「位」キーワード
- 「1位」「2位」「TOP」「ワースト」表現
- 数値付きの順位データ
- 「年収」「企業」「業界」での順位比較
- career ジャンルで最優先選択
```

### 2. graph が適用される条件
```typescript
// 以下の条件を満たす場合
- 「%」「割合」「分布」「推移」キーワード
- 円グラフ・棒グラフ向けの数値データ
- 「出典」「調査」「統計」情報の明記
- データの可視化が効果的な内容
- career ジャンルで第2優先選択
```

### 3. table が適用される条件
```typescript
// 以下の条件を満たす場合
- 「比較」「一覧」「企業名」キーワード
- 3行以上の構造化データ
- 複数の項目を比較する内容
- 「企業名｜業界｜年収」形式のデータ
- career ジャンルで第3優先選択
```

## 🔧 実装方針

### Phase 1: ジャンル特性の強化
```typescript
// app/lib/genre.ts での設定強化
'career': {
  optimalItemRange: { min: 4, max: 6 },
  primaryTemplates: ['ranking', 'graph', 'table'],
  secondaryTemplates: ['section-items'],
  avoidTemplates: ['checklist-enhanced'],
  characteristicKeywords: ['データ', '統計', '年収', '企業', '比較', 'ランキング', '順位', '業界', '推移', '分布'],
  expressionIntent: 'データに基づく客観的判断材料'
}
```

### Phase 2: プロンプト最適化
```typescript
// pageStructureAnalyzer.ts での career ジャンル特化
【ジャンル特性による強制適用】
career ジャンルの場合：
- 最優先テンプレート: ranking, graph, table
- 推奨テンプレート: section-items
- 避けるべきテンプレート: checklist-enhanced
- 特性キーワード: データ, 統計, 年収, 企業, 比較

【career ジャンル専用判定】
- 順位データ + 数値 → ranking 強制選択
- 統計データ + 出典 → graph 強制選択
- 比較表データ → table 強制選択
- データ可視化を最優先
```

### Phase 3: データ品質の向上
```typescript
// career ジャンル向けデータ生成の最適化
1. 出典情報の必須化（組織名・調査年・発表日）
2. 数値データの正確性重視
3. 比較可能な構造化データ
4. 視覚的なインパクトを考慮した構成
```

## 📝 テストケース

### 基本テストケース
```typescript
const careerTestCases = [
  {
    input: 'IT業界年収ランキング2024\n1位: 外資系IT企業 850万円\n2位: メガベンチャー 720万円\n3位: 大手SIer 650万円\n【出典】: 厚生労働省 2024年賃金構造基本統計調査',
    expectedPrimaryTemplate: 'ranking',
    expectedSecondaryTemplate: 'graph',
    avoidTemplate: 'checklist-enhanced'
  },
  {
    input: 'IT業界年収分布\n700万円以上: 35%\n500-700万円: 40%\n400-500万円: 18%\n400万円未満: 7%\n【出典】: 厚生労働省 2024年調査',
    expectedPrimaryTemplate: 'graph',
    expectedSecondaryTemplate: 'ranking',
    avoidTemplate: 'checklist-enhanced'
  },
  {
    input: '就活サイト比較表\n企業名 | 特徴 | 年収レンジ\nGoogle | AI・検索 | 800-1200万\nMeta | SNS・VR | 750-1100万\nAmazon | EC・クラウド | 700-1000万',
    expectedPrimaryTemplate: 'table',
    expectedSecondaryTemplate: 'ranking',
    avoidTemplate: 'checklist-enhanced'
  }
]
```

### 期待される結果
```typescript
// 6ページ生成時の期待構成
Page 1: ranking (年収・企業ランキング)
Page 2: ranking (業界別ランキング)
Page 3: graph (統計データの円グラフ)
Page 4: graph (推移データの棒グラフ)
Page 5: table (企業比較表)
Page 6: table (業界比較表)

// データ可視化テンプレートの使用率向上を目指す
```

## 📊 成功指標

### 定量的指標
- **ranking 使用率**: 40% 以上
- **graph 使用率**: 30% 以上
- **table 使用率**: 30% 以上
- **データ可視化率**: 100%（ranking + graph + table）

### 定性的指標
- **客観性**: 主観的意見ではなく客観的データ
- **信頼性**: 出典情報が明記されている
- **比較性**: 複数の選択肢を比較できる
- **視覚的効果**: 一目で理解できるデータ表示

## 📋 データ品質基準

### 1. ranking テンプレート
```typescript
// 必須要素
- 明確な順位（1位、2位、3位...）
- 数値データ（年収、件数、パーセンテージ）
- 項目名（企業名、業界名、職種名）
- 出典情報（【出典】: 組織名 調査年年調査）

// 品質基準
- 最低3項目、最大5項目
- 数値は具体的で信頼性のあるもの
- 順位は連続している（1,2,3...）
```

### 2. graph テンプレート
```typescript
// 必須要素
- グラフタイプ（pie または bar）
- 数値データ（パーセンテージまたは実数）
- カテゴリ名（項目名）
- 出典情報（source オブジェクト）

// 品質基準
- 円グラフ: 合計100%
- 棒グラフ: 単位の統一
- 最低3項目、最大6項目
- 色分けで視覚的差別化
```

### 3. table テンプレート
```typescript
// 必須要素
- ヘッダー（列名）
- 行データ（企業・業界・職種情報）
- 比較可能な構造化データ

// 品質基準
- 最低2列、最大4列
- 最低3行、最大6行
- 各セルは15文字以内
- 比較しやすい形式
```

## 📋 検証項目

### 1. テンプレート選択精度
```bash
# careerジャンルでの期待テンプレート選択率
Target: ranking 40% + graph 30% + table 30%
Current: section-items 80% + others 20%
```

### 2. データ品質
```bash
# 出典情報の確認
- 【出典】形式で組織名・調査年が明記されているか
- 数値データの正確性
- 比較可能な構造化データか
```

### 3. 視覚的効果
```bash
# データ可視化の効果
- 一目で理解できるデータ表示か
- 色分けやレイアウトで差別化されているか
- 統計的な説得力があるか
```

## 📝 作業ログ

### [日付] 作業項目
- [ ] データ可視化テンプレートの選択条件分析
- [ ] 出典情報の品質基準策定
- [ ] 統計データの構造化方法検討
- [ ] テストケースの作成
- [ ] 実装方針の確定

### 次のアクション
1. **データ可視化テンプレートの優先度向上**
2. **出典情報の品質確保**
3. **統計データの正確性向上**
4. **視覚的効果の最大化**

---

**⚠️ 重要**: career ジャンルはデータの正確性と出典の信頼性が最重要です。必ず出典情報を確認してください。