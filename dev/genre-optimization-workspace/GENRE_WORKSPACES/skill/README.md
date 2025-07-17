# 🎯 Skill ジャンル専用ワークスペース

## 🎯 Skill ジャンルの特性

### 表現意図
**「段階的スキル習得」**
- 初心者から上級者への成長プロセス
- 「学習したい」「成長したい」と思わせる
- 段階的・継続的な学習を促進

### 現在の問題
- スキル習得プロセスが不明確
- 段階的な成長感が不足
- 学習モチベーションの維持が困難

### 理想的な結果
- ページ1-2: `simple5` = 段階的学習手順
- ページ3-4: `item-n-title-content` = 重要スキルの詳細
- ページ5: `enumeration` = 優先順位付きスキル一覧
- 成長実感と継続性を重視

## 📊 推奨テンプレート構成

### 優先度別テンプレート
```typescript
'skill': {
  primaryTemplates: ['simple5', 'item-n-title-content'],    // 40% + 35%
  secondaryTemplates: ['enumeration'],                       // 25%
  avoidTemplates: ['table'],                                 // 比較表は不適
  characteristicKeywords: ['スキル', '習得', '成長', '学習', '向上', 'ステップ', '段階'],
  expressionIntent: '段階的スキル習得'
}
```

### 具体的な配分目標
- **simple5**: 40%（段階的学習手順）
- **item-n-title-content**: 35%（重要スキルの詳細）
- **enumeration**: 25%（優先順位付きスキル一覧）
- **table**: 0%（比較表は学習には不適）

## 📋 テンプレート選択戦略

### 1. simple5 が適用される条件
```typescript
// 以下の条件を満たす場合
- 「学習」「習得」「ステップ」キーワード
- 段階的な学習プロセス
- 初心者→中級者→上級者の流れ
- 継続的な成長を促す内容
- skill ジャンルで最優先選択
```

### 2. item-n-title-content が適用される条件
```typescript
// 以下の条件を満たす場合
- 「重要スキル」「必須スキル」キーワード
- 個別スキルの詳細説明
- 独立した概念の説明
- 具体的な習得方法
- skill ジャンルで第2優先選択
```

### 3. enumeration が適用される条件
```typescript
// 以下の条件を満たす場合
- 「優先順位」「重要度」キーワード
- 番号付きのスキル一覧
- 学習順序の明確化
- 体系的なスキル整理
- skill ジャンルで第3優先選択
```

## 🔧 実装方針

### Phase 1: ジャンル特性の強化
```typescript
// app/lib/genre.ts での設定強化
'skill': {
  optimalItemRange: { min: 3, max: 5 },
  primaryTemplates: ['simple5', 'item-n-title-content'],
  secondaryTemplates: ['enumeration'],
  avoidTemplates: ['table'],
  characteristicKeywords: ['スキル', '習得', '成長', '学習', '向上', 'ステップ', '段階', '能力', '技術'],
  expressionIntent: '段階的スキル習得'
}
```

### Phase 2: プロンプト最適化
```typescript
// pageStructureAnalyzer.ts での skill ジャンル特化
【ジャンル特性による強制適用】
skill ジャンルの場合：
- 最優先テンプレート: simple5, item-n-title-content
- 推奨テンプレート: enumeration
- 避けるべきテンプレート: table
- 特性キーワード: スキル, 習得, 成長, 学習, 向上

【skill ジャンル専用判定】
- 「学習ステップ」+ 「段階」→ simple5 強制選択
- 「重要スキル」+ 詳細説明 → item-n-title-content 強制選択
- 「優先順位」+ 番号付き → enumeration 強制選択
- 成長プロセスを重視した選択
```

### Phase 3: 学習効果の最適化
```typescript
// skill ジャンル向けコンテンツ生成の最適化
1. 段階的な学習プロセス
2. 成長実感を得られる構成
3. 継続しやすい学習方法
4. 実践的なスキル習得
```

## 📝 テストケース

### 基本テストケース
```typescript
const skillTestCases = [
  {
    input: 'プログラミング学習の5つのステップ\nステップ1: 基礎文法の習得\nステップ2: 実践的な課題解決\nステップ3: ポートフォリオ作成\nステップ4: チーム開発経験\nステップ5: 継続的な学習',
    expectedPrimaryTemplate: 'simple5',
    expectedSecondaryTemplate: 'item-n-title-content',
    avoidTemplate: 'table'
  },
  {
    input: 'データ分析に必要な4つの重要スキル\nPythonプログラミング: データ処理とライブラリ活用\nSQL: データベースからの情報抽出\n統計学: データの分析と解釈\nビジネス理解: 課題設定と解決策の提案',
    expectedPrimaryTemplate: 'item-n-title-content',
    expectedSecondaryTemplate: 'simple5',
    avoidTemplate: 'table'
  },
  {
    input: 'フロントエンド開発者が優先すべきスキル\n1. HTML/CSS基礎\n2. JavaScript基礎\n3. React/Vue.js\n4. TypeScript\n5. モダンな開発環境',
    expectedPrimaryTemplate: 'enumeration',
    expectedSecondaryTemplate: 'simple5',
    avoidTemplate: 'table'
  }
]
```

### 期待される結果
```typescript
// 5ページ生成時の期待構成
Page 1: simple5 (スキル習得の段階的手順)
Page 2: simple5 (学習プロセスの詳細)
Page 3: item-n-title-content (重要スキルの詳細説明)
Page 4: item-n-title-content (実践的な習得方法)
Page 5: enumeration (優先順位付きスキル一覧)

// 成長プロセスを重視した構成
```

## 📊 成功指標

### 定量的指標
- **simple5 使用率**: 40% 以上
- **item-n-title-content 使用率**: 35% 以上
- **enumeration 使用率**: 25% 以上
- **table 使用率**: 0%

### 定性的指標
- **成長感**: 段階的な成長を実感できる
- **継続性**: 学習を継続したくなる
- **実践性**: 実際に習得できる方法
- **体系性**: 体系的なスキル整理

## 📋 スキル習得コンテンツの品質基準

### 1. simple5 テンプレート
```typescript
// 必須要素
- 段階的な学習手順
- 各ステップの詳細説明
- 継続的な成長プロセス
- 実践的な学習方法

// 品質基準
- ステップ数: 3-5個
- 各ステップは論理的順序
- 説明は具体的で実践的
- 初心者でも理解可能
```

### 2. item-n-title-content テンプレート
```typescript
// 必須要素
- 重要スキルの詳細説明
- 習得方法の具体的説明
- 独立した概念の整理
- 実践的な活用方法

// 品質基準
- 項目数: 3-5個
- タイトルは30文字以内
- コンテンツは80文字以内
- 各項目は独立している
```

### 3. enumeration テンプレート
```typescript
// 必須要素
- 優先順位付きスキル一覧
- 番号付きの明確な順序
- 学習順序の論理性
- 体系的なスキル整理

// 品質基準
- 項目数: 3-7個
- 各項目は25文字以内
- 優先順位が明確
- 順序に論理性がある
```

## 📋 検証項目

### 1. テンプレート選択精度
```bash
# skillジャンルでの期待テンプレート選択率
Target: simple5 40% + item-n-title-content 35% + enumeration 25%
Current: section-items 70% + others 30%
```

### 2. 学習効果の確認
```bash
# 学習促進効果の確認
- 段階的な成長プロセスが明確か
- 継続的な学習を促進するか
- 実践的な価値を提供するか
```

### 3. 成長実感の確認
```bash
# ユーザー体験の確認
- 「成長できそう」感があるか
- 「続けられそう」感があるか
- 「習得できそう」感があるか
```

## 📝 スキル習得の重要領域

### 1. 基礎スキルの習得
```typescript
// 重要な基礎領域
- 基本的な概念理解
- 基礎的な操作方法
- 基本的なツールの使い方
- 基礎的な問題解決能力
```

### 2. 実践スキルの向上
```typescript
// 重要な実践領域
- 実際の課題解決
- プロジェクト経験
- チームでの協働
- 継続的な改善
```

### 3. 応用スキルの発展
```typescript
// 重要な応用領域
- 高度な技術習得
- 創造的な活用
- 他分野との連携
- 継続的な学習
```

## 📝 学習モチベーション維持の要素

### 1. 成長の可視化
```typescript
// 成長実感の要素
- 段階的な目標設定
- 達成感の提供
- 進捗の可視化
- 成果の実感
```

### 2. 継続のしやすさ
```typescript
// 継続促進の要素
- 適切な難易度設定
- 小さな成功体験
- 明確な次のステップ
- 学習習慣の形成
```

### 3. 実践的な価値
```typescript
// 実用性の要素
- 実際の業務での活用
- 具体的な成果創出
- キャリアへの貢献
- 長期的な価値
```

## 📝 作業ログ

### [日付] 作業項目
- [ ] スキル習得プロセスの分析
- [ ] 学習効果の最適化方法検討
- [ ] 成長実感の向上方法検討
- [ ] テストケースの作成
- [ ] 実装方針の確定

### 次のアクション
1. **段階的学習プロセスの最適化**
2. **成長実感の向上**
3. **継続性の確保**
4. **実践的価値の向上**

---

**⚠️ 重要**: skill ジャンルは成長実感と継続性が最重要です。段階的な学習プロセスを重視してください。