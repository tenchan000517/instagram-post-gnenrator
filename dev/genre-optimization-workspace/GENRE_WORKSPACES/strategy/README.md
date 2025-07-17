# 🎯 Strategy ジャンル専用ワークスペース

## 🎯 Strategy ジャンルの特性

### 表現意図
**「実践的準備手順」**
- ユーザーが具体的に行動できる手順を提供
- 「やってみたい」と思わせる実行可能感を重視
- 理論よりも実践、概要よりも具体的手順

### 現在の問題
- 4ページ全てが「section-items」テンプレート
- 理論的な分類整理に留まっている
- 実行可能感よりも網羅性重視になっている

### 理想的な結果
- ページ1-3: `checklist-enhanced` = 実践的準備リスト
- ページ4: `simple5` = 段階的実行手順
- 視覚的に「今すぐ始められる」感を提供

## 📊 推奨テンプレート構成

### 優先度別テンプレート
```typescript
'strategy': {
  primaryTemplates: ['checklist-enhanced', 'simple5'],      // 60% + 30%
  secondaryTemplates: ['item-n-title-content'],             // 10%
  avoidTemplates: ['section-items'],                        // 原則避ける
  characteristicKeywords: ['準備', '対策', '手順', '実践', '攻略'],
  expressionIntent: '実践的準備手順'
}
```

### 具体的な配分目標
- **checklist-enhanced**: 60%（実践的準備リスト）
- **simple5**: 30%（段階的実行手順）
- **item-n-title-content**: 10%（独立した重要概念）
- **section-items**: 0%（避ける）

## 📋 テンプレート選択戦略

### 1. checklist-enhanced が適用される条件
```typescript
// 以下の条件を満たす場合
- 「□」記号が含まれる
- 「準備」「対策」「チェック」「確認」キーワード
- 各項目に詳細説明が付随
- 実行可能な具体的アクション
- strategy ジャンルで最優先選択
```

### 2. simple5 が適用される条件
```typescript
// 以下の条件を満たす場合
- 「ステップ」「段階」「手順」キーワード
- 連続する実行プロセス
- 各ステップに詳細説明
- 時系列または順序性がある
- strategy ジャンルで第2優先選択
```

### 3. section-items を避ける条件
```typescript
// 以下の場合は section-items を選択しない
- strategy ジャンルの場合
- 「準備」「対策」「手順」キーワードがある場合
- 実行可能なアクションが含まれる場合
- ユーザーが具体的に行動できる内容の場合
```

## 🔧 実装方針

### Phase 1: ジャンル特性の強化
```typescript
// app/lib/genre.ts での設定強化
'strategy': {
  optimalItemRange: { min: 4, max: 6 },
  primaryTemplates: ['checklist-enhanced', 'simple5'],
  secondaryTemplates: ['item-n-title-content'],
  avoidTemplates: ['section-items'],
  characteristicKeywords: ['準備', '対策', '手順', '実践', '攻略', 'チェック', '確認'],
  expressionIntent: '実践的準備手順'
}
```

### Phase 2: プロンプト最適化
```typescript
// pageStructureAnalyzer.ts での戦略ジャンル特化
【ジャンル特性による強制適用】
strategy ジャンルの場合：
- 最優先テンプレート: checklist-enhanced, simple5
- 推奨テンプレート: item-n-title-content
- 避けるべきテンプレート: section-items
- 特性キーワード: 準備, 対策, 手順, 実践, 攻略

【strategy ジャンル専用判定】
- 「□」記号 + 準備・対策内容 → checklist-enhanced 強制選択
- 「ステップ」「段階」「手順」 → simple5 強制選択
- section-items は strategy ジャンルでは原則選択禁止
```

### Phase 3: コンテンツ最適化
```typescript
// strategy ジャンル向けコンテンツ生成の最適化
1. 実行可能な具体的アクション重視
2. 「やってみたい」感情を喚起する表現
3. 初心者でも実行可能な手順
4. 失敗しないための注意点を含む
```

## 📝 テストケース

### 基本テストケース
```typescript
const strategyTestCases = [
  {
    input: '志望動機が見つからない！内定獲得へ導く企業研究×自己分析攻略法！\n□ 自己分析徹底！過去の経験から「自分軸」を発見\n□ 企業研究徹底！企業の魅力と自分の強みを繋げる',
    expectedPrimaryTemplate: 'checklist-enhanced',
    expectedSecondaryTemplate: 'simple5',
    avoidTemplate: 'section-items'
  },
  {
    input: 'ES通過率を上げる5つのステップ\nステップ1: 質問の意図を理解\nステップ2: 結論から書く\nステップ3: 具体的エピソードで根拠',
    expectedPrimaryTemplate: 'simple5',
    expectedSecondaryTemplate: 'checklist-enhanced',
    avoidTemplate: 'section-items'
  },
  {
    input: '面接対策の完全準備リスト\n□ 企業研究の徹底\n□ 志望動機の明確化\n□ 想定質問への回答準備\n□ 逆質問の準備',
    expectedPrimaryTemplate: 'checklist-enhanced',
    expectedSecondaryTemplate: 'simple5',
    avoidTemplate: 'section-items'
  }
]
```

### 期待される結果
```typescript
// 4ページ生成時の期待構成
Page 1: checklist-enhanced (実践的準備チェックリスト)
Page 2: checklist-enhanced (詳細な対策チェックリスト)
Page 3: simple5 (段階的実行手順)
Page 4: item-n-title-content (重要概念の詳細説明)

// section-items は 0% の使用率を目指す
```

## 📊 成功指標

### 定量的指標
- **checklist-enhanced 使用率**: 60% 以上
- **simple5 使用率**: 30% 以上
- **section-items 使用率**: 0%
- **テンプレート多様性**: 2-3種類/4ページ

### 定性的指標
- **実行可能感**: ユーザーが「やってみたい」と感じる
- **具体性**: 抽象的でなく具体的なアクション
- **段階性**: 段階的に実行できる構成
- **初心者対応**: 初心者でも理解・実行可能

## 📋 検証項目

### 1. テンプレート選択精度
```bash
# strategyジャンルでの期待テンプレート選択率
Target: checklist-enhanced 60% + simple5 30% + item-n-title-content 10%
Current: section-items 90% + others 10%
```

### 2. コンテンツ品質
```bash
# 実行可能性の確認
- 具体的なアクションが含まれているか
- 初心者でも理解できる説明か
- 段階的な実行手順になっているか
```

### 3. ユーザー体験
```bash
# 感情的反応の確認
- 「やってみたい」感を喚起するか
- 「できそう」感を与えるか
- 「すぐ始められる」感があるか
```

## 📝 作業ログ

### [日付] 作業項目
- [ ] ジャンル特性の詳細分析
- [ ] テンプレート選択戦略の具体化
- [ ] プロンプト最適化案の作成
- [ ] テストケースの作成
- [ ] 実装方針の確定

### 次のアクション
1. **genre.ts の拡張実装**
2. **pageStructureAnalyzer.ts のプロンプト修正**
3. **テストケースでの検証**
4. **結果の測定と改善**

---

**⚠️ 重要**: strategy ジャンルの成功が他ジャンルの参考になるため、高品質な実装を目指してください。