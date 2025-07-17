# 🎤 Interview ジャンル専用ワークスペース

## 🎯 Interview ジャンルの特性

### 表現意図
**「実践的面接対策」**
- 面接で実際に使える具体的なテクニック
- 「準備したい」「対策したい」と思わせる
- 理論よりも実践的な準備に重点

### 現在の問題
- 面接準備なのに section-items で概要説明
- 具体的な準備手順が不明確
- 実践的な対策感が不足

### 理想的な結果
- ページ1-2: `checklist-enhanced` = 面接準備チェックリスト
- ページ3-4: `simple5` = 面接対策の段階的手順
- ページ5: `two-column-section-items` = 良い例vs悪い例
- 実践的で即座に使える内容

## 📊 推奨テンプレート構成

### 優先度別テンプレート
```typescript
'interview': {
  primaryTemplates: ['checklist-enhanced', 'simple5'],      // 50% + 30%
  secondaryTemplates: ['two-column-section-items'],         // 20%
  avoidTemplates: ['graph'],                                // 統計は不要
  characteristicKeywords: ['面接', '準備', '質問', '回答', '対策', 'チェック', '練習'],
  expressionIntent: '実践的面接対策'
}
```

### 具体的な配分目標
- **checklist-enhanced**: 50%（面接準備チェックリスト）
- **simple5**: 30%（段階的対策手順）
- **two-column-section-items**: 20%（良い例vs悪い例）
- **graph**: 0%（統計データは不要）

## 📋 テンプレート選択戦略

### 1. checklist-enhanced が適用される条件
```typescript
// 以下の条件を満たす場合
- 「面接準備」「チェックリスト」キーワード
- 「□」記号 + 準備項目
- 各項目に具体的な説明
- 実行可能な準備アクション
- interview ジャンルで最優先選択
```

### 2. simple5 が適用される条件
```typescript
// 以下の条件を満たす場合
- 「面接対策」「ステップ」「段階」キーワード
- 時系列的な準備手順
- 面接前→面接中→面接後の流れ
- 各段階での具体的アクション
- interview ジャンルで第2優先選択
```

### 3. two-column-section-items が適用される条件
```typescript
// 以下の条件を満たす場合
- 「良い例」「悪い例」「NG」「OK」キーワード
- 対比構造のある内容
- 「やるべきこと」vs「やってはいけないこと」
- 比較による理解促進
- interview ジャンルで第3優先選択
```

## 🔧 実装方針

### Phase 1: ジャンル特性の強化
```typescript
// app/lib/genre.ts での設定強化
'interview': {
  optimalItemRange: { min: 4, max: 6 },
  primaryTemplates: ['checklist-enhanced', 'simple5'],
  secondaryTemplates: ['two-column-section-items'],
  avoidTemplates: ['graph'],
  characteristicKeywords: ['面接', '準備', '質問', '回答', '対策', 'チェック', '練習', '当日', '前日'],
  expressionIntent: '実践的面接対策'
}
```

### Phase 2: プロンプト最適化
```typescript
// pageStructureAnalyzer.ts での interview ジャンル特化
【ジャンル特性による強制適用】
interview ジャンルの場合：
- 最優先テンプレート: checklist-enhanced, simple5
- 推奨テンプレート: two-column-section-items
- 避けるべきテンプレート: graph
- 特性キーワード: 面接, 準備, 質問, 回答, 対策

【interview ジャンル専用判定】
- 「面接準備」+ 「□」記号 → checklist-enhanced 強制選択
- 「面接対策」+ 「ステップ」→ simple5 強制選択
- 「良い例」vs「悪い例」→ two-column-section-items 強制選択
- 統計データよりも実践的内容を優先
```

### Phase 3: 実践的コンテンツの強化
```typescript
// interview ジャンル向けコンテンツ生成の最適化
1. 具体的な準備アクション
2. 実際の面接での使用例
3. 失敗を避けるためのポイント
4. 当日の流れに沿った準備
```

## 📝 テストケース

### 基本テストケース
```typescript
const interviewTestCases = [
  {
    input: '面接準備の完全チェックリスト\n□ 企業研究を徹底する\n□ 志望動機を明確化する\n□ 想定質問への回答準備\n□ 逆質問を3つ以上用意',
    expectedPrimaryTemplate: 'checklist-enhanced',
    expectedSecondaryTemplate: 'simple5',
    avoidTemplate: 'graph'
  },
  {
    input: '面接対策の5つのステップ\nステップ1: 面接前日の準備\nステップ2: 当日の身だしなみ\nステップ3: 面接室での振る舞い\nステップ4: 質問への回答方法\nステップ5: 面接後のフォロー',
    expectedPrimaryTemplate: 'simple5',
    expectedSecondaryTemplate: 'checklist-enhanced',
    avoidTemplate: 'graph'
  },
  {
    input: '面接での回答例：良い例vs悪い例\n■良い例\n・具体的なエピソード\n・数値を使った実績\n■悪い例\n・抽象的な表現\n・根拠のない主張',
    expectedPrimaryTemplate: 'two-column-section-items',
    expectedSecondaryTemplate: 'checklist-enhanced',
    avoidTemplate: 'graph'
  }
]
```

### 期待される結果
```typescript
// 5ページ生成時の期待構成
Page 1: checklist-enhanced (面接前日の準備チェックリスト)
Page 2: checklist-enhanced (面接当日の準備チェックリスト)
Page 3: simple5 (面接対策の段階的手順)
Page 4: simple5 (質問回答の準備手順)
Page 5: two-column-section-items (良い例vs悪い例)

// 実践的な準備内容を重視
```

## 📊 成功指標

### 定量的指標
- **checklist-enhanced 使用率**: 50% 以上
- **simple5 使用率**: 30% 以上
- **two-column-section-items 使用率**: 20% 以上
- **graph 使用率**: 0%

### 定性的指標
- **実践性**: 実際の面接で使える内容
- **具体性**: 抽象的でなく具体的なアクション
- **準備感**: 「準備できた」という安心感
- **対策感**: 「対策済み」という自信

## 📋 面接対策コンテンツの品質基準

### 1. checklist-enhanced テンプレート
```typescript
// 必須要素
- 面接準備の具体的アクション
- 各項目の詳細説明
- 実行可能な準備手順
- チェックボックスでの進捗管理

// 品質基準
- 項目数: 4-8個
- 各項目は実行可能
- 詳細説明は80文字以内
- 時系列または重要度順
```

### 2. simple5 テンプレート
```typescript
// 必須要素
- 面接対策の段階的手順
- 各ステップの詳細説明
- 連続する実行プロセス
- 時系列または論理的順序

// 品質基準
- ステップ数: 3-5個
- 各ステップは45文字以内
- 説明は具体的で実践的
- 順序に論理性がある
```

### 3. two-column-section-items テンプレート
```typescript
// 必須要素
- 対比構造（良い例vs悪い例）
- 左右のバランス
- 具体的な例とNG例
- 比較による理解促進

// 品質基準
- 各カラム3-5項目
- 項目は18文字以内
- 対比が明確
- 実践的な内容
```

## 📋 検証項目

### 1. テンプレート選択精度
```bash
# interviewジャンルでの期待テンプレート選択率
Target: checklist-enhanced 50% + simple5 30% + two-column-section-items 20%
Current: section-items 80% + others 20%
```

### 2. 実践的内容の確認
```bash
# 内容の実用性確認
- 実際の面接で使える内容か
- 具体的なアクションが含まれているか
- 準備から当日まで網羅されているか
```

### 3. 対策完了感の確認
```bash
# ユーザー体験の確認
- 「準備できた」という安心感があるか
- 「対策済み」という自信を与えるか
- 実践的な価値を提供するか
```

## 📝 面接対策の重要領域

### 1. 面接前の準備
```typescript
// 重要な準備項目
- 企業研究の徹底
- 志望動機の明確化
- 想定質問への回答準備
- 逆質問の準備
- 身だしなみの確認
```

### 2. 面接中の対応
```typescript
// 重要な対応項目
- 入室・退室のマナー
- 質問への回答方法
- 非言語コミュニケーション
- 緊張への対処法
- 印象的な自己PR
```

### 3. 面接後のフォロー
```typescript
// 重要なフォロー項目
- お礼メールの送信
- 振り返りと改善点の整理
- 次回面接への準備
- 結果への心構え
```

## 📝 作業ログ

### [日付] 作業項目
- [ ] 面接対策の重要領域分析
- [ ] 実践的コンテンツの品質基準策定
- [ ] 対比構造の効果的な使用方法検討
- [ ] テストケースの作成
- [ ] 実装方針の確定

### 次のアクション
1. **面接準備の実践性向上**
2. **段階的対策手順の最適化**
3. **対比構造の効果的活用**
4. **準備完了感の向上**

---

**⚠️ 重要**: interview ジャンルは実践的な価値が最重要です。理論よりも「実際に使える」内容を重視してください。