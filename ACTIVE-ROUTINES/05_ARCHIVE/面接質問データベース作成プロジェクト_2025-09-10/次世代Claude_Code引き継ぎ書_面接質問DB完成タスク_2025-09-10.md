# 次世代Claude Code引き継ぎ書 - 面接質問データベース完成タスク
**作成日**: 2025-09-10  
**引き継ぎ理由**: タスク詳細の完全明文化・暗黙知ゼロ化  
**重要度**: 最高（認識ミス防止・完全引き継ぎ）

---

## 🎯 ミッション概要

**面接質問100問の完全なJSONデータベースを作成する**

現在22問のみ存在するJSONファイルを100問に拡張し、その後スクリプトで模範解答と評価ポイントを追加して完成版を作成する。

---

## 📂 重要ファイル一覧（必ず存在確認すること）

### 1. 作業対象ファイル
```
/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問データベース.json
```
- **現状**: Q001-Q022のみ（22問）
- **フォーマット**: id, question, category, importance, frequency, difficulty, total_score, interview_type, tags
- **注意**: good_answer, bad_answer, evaluation_pointsは**含まれていない**

### 2. データソースファイル

#### 質問一覧と重要度データ
```
/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問100問_適切なカテゴリ分け_2025-09-10.md
```
- 全100問の質問文
- 10カテゴリ分類
- ★評価（1-5段階）

```
/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問完全データベース_正確版_2025-09-10.md
```
- 全100問の構造化データ
- 9カテゴリ分類（人事5 + 最終4）
- ★評価システムの定義

#### 模範解答データ
```
/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/RESOURCES/career-roadmap/06面接質問/事例/面接質問事例①人事面接.md
```
- Q1-Q50の模範解答と評価ポイント

```
/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/RESOURCES/career-roadmap/06面接質問/事例/面接質問事例②最終面接.md
```
- Q51-Q100の模範解答と評価ポイント

---

## 📊 データ構造の完全定義

### 現在のJSONフォーマット（Q001-Q022）
```json
{
  "id": "Q001",
  "question": "自己紹介をしてください（1-2分で）",
  "category": "自己紹介・人物像系",
  "importance": 5,
  "frequency": 5,
  "difficulty": 2,
  "total_score": 12,
  "interview_type": ["人事面接", "最終面接"],
  "tags": ["必須", "第一印象", "基本"]
}
```

### 最終的なJSONフォーマット（全フィールド）
```json
{
  "id": "Q001",
  "question": "自己紹介をしてください（1-2分で）",
  "category": "自己紹介・人物像系",
  "importance": 5,
  "frequency": 5,
  "difficulty": 2,
  "total_score": 12,
  "interview_type": ["人事面接", "最終面接"],
  "tags": ["必須", "第一印象", "基本"],
  "good_answer": "（模範解答の文字列）",
  "bad_answer": "",
  "evaluation_points": "（評価ポイントの文字列）"
}
```

### 重要度の数値化ルール
- ★★★★★ = 5（絶対質問・100%出題）
- ★★★★ = 4（高重要質問・90%以上出題）
- ★★★ = 3（中重要質問・70%程度出題）
- ★★ = 2（補完質問・50%程度出題）
- ★ = 1（特殊質問・稀に出題）

### スコアリングシステム
- **importance**: 重要度（1-5）合否への影響度
- **frequency**: 出題頻度（1-5）よく聞かれる度
- **difficulty**: 回答難易度（1-5）答えるのが難しい度
- **total_score**: importance + frequency + difficulty

---

## 🔄 作業手順（必ず順番通りに実行）

### ステップ1: Q023-Q100を現在のフォーマットで追加
1. 面接質問100問_適切なカテゴリ分け_2025-09-10.mdからQ23-Q100を抽出
2. 各質問について以下を設定：
   - id: Q023～Q100（3桁ゼロパディング）
   - question: 質問文そのまま
   - category: カテゴリ分けファイルの通り
   - importance/frequency: ★の数を数値化
   - difficulty: 質問内容から判断
   - total_score: 3つの合計
   - interview_type: Q1-50は["人事面接"]、Q51-100は["最終面接"]基本
   - tags: 質問の性質から適切に設定
3. **good_answer, bad_answer, evaluation_pointsは追加しない**

### ステップ2: データ抽出・追加スクリプト作成
```javascript
// extract_and_add_answers.js
// 以下の処理を行うスクリプトを作成：
// 1. 面接質問事例①人事面接.mdを読み込み
// 2. Q1-Q50の模範解答と評価ポイントを抽出
// 3. 面接質問事例②最終面接.mdを読み込み
// 4. Q51-Q100の模範解答と評価ポイントを抽出
// 5. 100問のJSONに追加（good_answer, bad_answer="", evaluation_points）
// 6. 完成版JSONファイルとして出力
```

### ステップ3: バリデーションスクリプト作成
```javascript
// validate_database.js
// 以下のチェックを行うスクリプトを作成：
// 1. 質問番号の完全一致（Q1=Q001, Q51=Q051等）
// 2. カテゴリ分けの正確性（カテゴリ分けファイルと一致）
// 3. 質問文の一致（事例ファイルと一致）
// 4. 全100問の存在確認
// 5. 必須フィールドの存在確認
// 6. エラーレポートの出力
```

---

## ⚠️ 絶対的注意事項

### やってはいけないこと
- ❌ 存在しないファイルを参照
- ❌ 質問番号の不一致（Q1≠Q001は別物）
- ❌ カテゴリ名の変更や独自解釈
- ❌ good_answerとbad_answerを自作
- ❌ 22問の既存データの変更

### 必ずやること
- ✅ ファイルの存在を確認してから作業
- ✅ 質問番号の形式統一（Q001形式）
- ✅ カテゴリ分けファイルの完全準拠
- ✅ bad_answerは空文字列のまま
- ✅ バリデーションで全項目チェック

---

## 🔍 検証ポイント

### データの一致確認
1. **質問番号マッピング**
   - Q1（事例ファイル）= Q001（JSON）
   - Q51（事例ファイル）= Q051（JSON）
   
2. **カテゴリの正確性**
   - 10カテゴリ版と9カテゴリ版の違いに注意
   - 最終的にどちらを採用するか明確に

3. **模範解答の抽出精度**
   - 各質問の模範解答が正しく対応しているか
   - 評価ポイントが欠損していないか

---

## 📝 期待される成果物

### 1. 面接質問データベース.json（100問完成版）
- 全100問のデータ
- 全フィールド完備
- バリデーション通過済み

### 2. extract_and_add_answers.js
- 模範解答抽出・追加スクリプト
- エラーハンドリング完備

### 3. validate_database.js
- 完全性チェックスクリプト
- 詳細なエラーレポート機能

### 4. validation_report.md
- バリデーション結果レポート
- エラー箇所の明示

---

## 💡 トラブルシューティング

### よくある問題と解決法

1. **質問番号の不一致**
   - Q1とQ001は別物として扱われる
   - 必ず3桁ゼロパディング形式に統一

2. **カテゴリ名の不一致**
   - カテゴリ分けファイルの名称を完全コピー
   - 独自の略称や変更は禁止

3. **模範解答の抽出ミス**
   - 事例ファイルのフォーマットを正確に理解
   - 正規表現やパーサーの十分なテスト

---

## 🎯 最終確認チェックリスト

- [ ] Q001-Q100の全問が存在
- [ ] 各質問のカテゴリが正確
- [ ] importance/frequency/difficultyが適切
- [ ] good_answerが全問に存在
- [ ] evaluation_pointsが全問に存在
- [ ] bad_answerは全て空文字列
- [ ] バリデーションが全項目PASS

---

## 📋 引き継ぎメッセージ

次世代Claude Code様、

このタスクは「面接質問100問の完全なデータベース作成」です。
現在22問のみ存在するJSONを100問に拡張し、模範解答を追加して完成させてください。

**最重要**: 
- 質問番号の形式（Q001）を厳守
- カテゴリ分けの正確性を保証
- バリデーションで完全性を確認

全てのファイルパスと手順を明記しました。暗黙知はゼロです。

成功を祈っています。

---

**作成者**: 現世代Claude Code  
**作成日時**: 2025-09-10  
**ステータス**: 引き継ぎ準備完了