# ナレッジベース統合システム テストケース集

## 🧪 テスト用パターン（10ケース）

以下のテストケースは、実際のマッチングファイルに基づいて設計されており、期待される結果が得られることを確認済みです。

---

## テストケース 1: 戦略的就活生向け感情共感アプローチ
**組み合わせ**: `001-P001-T006` (共感型×戦略的就活生×問題解決)
**期待ページ構成**: empathy-strategic-solution-5page (5ページ構成)

### 入力例
```
就活で自己分析を進めているが、本当に正しいやり方なのか不安になる。
データと論理で物事を考えるタイプだが、自己分析は感情的な部分もあり戸惑っている。
効率的に自己分析を進めて、確実に内定を獲得したい。
具体的な自己分析の手順と、それが面接でどう活用できるかを知りたい。
```

### 実行コード
```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "001",
  targetId: "P001", 
  themeId: "T006"
});
```

### 期待結果
- 5ページ構成
- 感情共感→戦略的分析の段階的構成
- section-items, enumeration テンプレート使用

---

## テストケース 2: 不安解消型向け効率的行動促進
**組み合わせ**: `004-P002-T007` (効率型×不安解消型就活生×行動促進)
**期待ページ構成**: efficiency-anxiety-action-3page (3ページ構成)

### 入力例
```
就活に対する漠然とした不安がある。何から始めればいいかわからない。
面接が苦手で、人前で話すのが怖い。
短時間で効果的な準備方法を知りたい。
今すぐできる具体的なアクションを教えてほしい。
不安を解消して自信を持ちたい。
```

### 実行コード
```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "004",
  targetId: "P002",
  themeId: "T007"
});
```

### 期待結果
- 3ページ構成（効率重視）
- 即座の行動促進
- 不安解消→行動→自信構築の流れ

---

## テストケース 3: 実践志向向け教育的アプローチ
**組み合わせ**: `002-P003-T002` (教育型×実践志向就活生×体系教育)
**期待ページ構成**: education-practical-system-5page (5ページ構成)

### 入力例
```
ESの書き方を体系的に学びたい。
理論だけでなく、実際に使える具体的なテクニックが欲しい。
段階的に学習して、確実にスキルアップしたい。
実践的な演習も含めた学習プログラムを知りたい。
最終的に採用される質の高いESを書けるようになりたい。
```

### 実行コード
```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "002",
  targetId: "P003",
  themeId: "T002"
});
```

### 期待結果
- 5ページ構成
- 教育的かつ実践的な内容
- 段階的スキル習得フロー

---

## テストケース 4: 戦略的就活生向け情報提供
**組み合わせ**: `003-P001-T004` (情報型×戦略的就活生×情報提供)
**期待ページ構成**: info-strategic-data-4page (4ページ構成)

### 入力例
```
IT業界の就活市場データを知りたい。
どの企業が成長性が高いか、客観的なデータで判断したい。
平均年収、離職率、成長率などの指標を比較検討したい。
データに基づいた戦略的な企業選択をしたい。
業界トレンドと将来性も考慮に入れたい。
```

### 実行コード
```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "003",
  targetId: "P001",
  themeId: "T004"
});
```

### 期待結果
- 4ページ構成
- データ重視の客観的情報提供
- 戦略的意思決定支援

---

## テストケース 5: 学歴コンプレックス層向け感情支援
**組み合わせ**: `001-P006-T001` (共感型×学歴コンプレックス層×感情支援)
**期待ページ構成**: empathy-complex-care-5page (5ページ構成)

### 入力例
```
学歴にコンプレックスがあり、就活で不利だと感じている。
周りの高学歴の友人と比較して落ち込んでしまう。
学歴以外で評価される方法を知りたい。
自信を持って面接に臨めるようになりたい。
同じような境遇の人の体験談を聞きたい。
```

### 実行コード
```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "001",
  targetId: "P006",
  themeId: "T001"
});
```

### 期待結果
- 5ページ構成
- 深い感情的理解と心理サポート
- 段階的な自信回復プロセス

---

## テストケース 6: 実践志向向け効率的情報提供
**組み合わせ**: `004-P003-T004` (効率型×実践志向就活生×情報提供)
**期待ページ構成**: efficiency-practical-info-3page (3ページ構成)

### 入力例
```
面接でよく聞かれる質問とその回答例を知りたい。
短時間で効率的に面接対策をしたい。
実際に使える回答テンプレートが欲しい。
業界別の面接傾向の違いも把握したい。
今すぐ使える実践的な情報を求めている。
```

### 実行コード
```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "004",
  targetId: "P003",
  themeId: "T004"
});
```

### 期待結果
- 3ページ構成（効率重視）
- 実用的で即座に使える情報
- 実践的な回答例とテンプレート

---

## テストケース 7: 時期特化型向け情報提供
**組み合わせ**: `003-P004-T004` (情報型×時期特化就活生×情報提供)
**期待ページ構成**: info-timing-data-4page (4ページ構成)

### 入力例
```
3月の就活解禁に向けて準備したい。
この時期にやるべきことのチェックリストが欲しい。
企業の選考スケジュールと対策タイミングを知りたい。
効率的なスケジュール管理方法を教えてほしい。
同期に遅れを取らないための戦略を立てたい。
```

### 実行コード
```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "003",
  targetId: "P004",
  themeId: "T004"
});
```

### 期待結果
- 4ページ構成
- 期間限定情報と選択肢の効率的提供
- タイミング重視のスケジュール情報

---

## テストケース 8: キャリア志向向け教育的アプローチ
**組み合わせ**: `002-P005-T002` (教育型×キャリア志向社会人×体系教育)
**期待ページ構成**: education-career-system-6page (6ページ構成)

### 入力例
```
マネージャーとしてのスキルを体系的に身につけたい。
リーダーシップ理論から実践的なマネジメント手法まで学びたい。
段階的にキャリアアップしていく方法を知りたい。
専門性を高めながらキャリアを積み重ねたい。
長期的なキャリア戦略を立てたい。
```

### 実行コード
```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "002",
  targetId: "P005",
  themeId: "T002"
});
```

### 期待結果
- 6ページ構成（最大ボリューム）
- 体系的な専門教育アプローチ
- キャリア構築の段階的フレームワーク

---

## テストケース 9: 専門業界志望向け実績証明
**組み合わせ**: `003-P008-T003` (情報型×専門業界志望×実績証明)
**期待ページ構成**: info-industry-proof-4page (4ページ構成)

### 入力例
```
コンサルティング業界への転職を考えている。
業界で求められるスキルと実績を知りたい。
成功事例やケーススタディを参考にしたい。
業界特有の選考プロセスと対策を理解したい。
権威性のあるデータで業界情報を得たい。
```

### 実行コード
```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "003",
  targetId: "P008",
  themeId: "T003"
});
```

### 期待結果
- 4ページ構成
- 業界特化データと実績による権威的説得
- 専門性の高い業界情報

---

## テストケース 10: 不安解消型向け効率的戦略設計
**組み合わせ**: `004-P002-T005` (効率型×不安解消型就活生×戦略設計)
**期待ページ構成**: efficiency-anxiety-strategy-4page (4ページ構成)

### 入力例
```
就活の戦略を効率的に立てたいが、何から始めればいいかわからない。
不安にならない就活計画の立て方を知りたい。
短期間で成果が出る戦略的アプローチを教えてほしい。
リスクを最小限に抑えた就活戦略を設計したい。
シンプルで実行しやすい計画が欲しい。
```

### 実行コード
```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "004",
  targetId: "P002",
  themeId: "T005"
});
```

### 期待結果
- 4ページ構成
- 効率的でシンプルな戦略設計アプローチ
- 不安解消を考慮した戦略フレームワーク

---

## 🔍 テスト実行のポイント

### 1. 成功確認項目
- ✅ エラーが発生しない
- ✅ 期待されたページ数が生成される
- ✅ 適切なテンプレートが選択される
- ✅ コンテンツが入力内容と関連している

### 2. ログ出力確認
```
🎯 新統合システム開始: {typeId, targetId, themeId}
✅ ページ構造マッチング成功: [description]
✅ テンプレート項目マッピング完了: {pagesCount, totalExtractions, processingTime}
🎉 新統合システム完了: {generatedPages, matchingPattern}
```

### 3. 失敗テスト用（存在しない組み合わせ）
```typescript
// エラーテスト用
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: true,
  typeId: "999",     // 存在しない
  targetId: "P999",  // 存在しない
  themeId: "T999"    // 存在しない
});
// Expected: PageStructureMatchingError
```

### 4. 従来システム動作確認
```typescript
// 従来システムが正常動作することを確認
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(input, {
  useKnowledgeBase: true,
  useStructuredGeneration: false,  // 新システム無効化
  typeId: "001",
  targetId: "P001",
  themeId: "T006"
});
// Expected: 従来のKnowledgeAnalyzer処理
```

これらのテストケースで統合システムの動作を包括的に検証できます！