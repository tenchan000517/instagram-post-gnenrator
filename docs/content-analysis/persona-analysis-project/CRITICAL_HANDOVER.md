# 🚨 緊急引き継ぎ - ペルソナ分析プロジェクト

## ⚠️ 最重要：前任者の失敗から学ぶ

### 致命的失敗の内容
1. **架空ペルソナを構築した**
   - ❌ 「21歳大学生、7月から就活開始で焦っている」→ データにない創作
   - ❌ 「超低予算就活戦略」→ 学生に予算概念は非現実的
   - ❌ 「ワーママ経理AI活用」→ 完全な架空

2. **元コンテンツを確認しなかった**
   - contents-004等の実際の内容を読まずに分析
   - 架空の紐づけをして「分析完了」と報告

## 🎯 真のゴール

### システム全体像
```
Instagram投稿生成システムのPersonaID部分構築
├─ TypeID（ステップ1完了済み）
├─ ThemeID
└─ PersonaID ← 今回構築する部分
```

### 最終目的
**TypeID × ThemeID × PersonaID でリサーチプロンプトを生成し、意図した「有益性」を持った情報の塊を出力させる**

## 📋 やるべきこと

### 1. 必読ドキュメント
```
/docs/content-analysis/persona-analysis-project/
├── 00_PROJECT_OVERVIEW.md          # プロジェクト全体像
├── 01_SESSION_GUIDELINES.md        # 実行ガイドライン
├── 02_QUALITY_STANDARDS.md         # 品質基準
└── sessions/
    └── session-03/SESSION_03_PROMPT.md  # 実行プロンプト（最初に提供された）
```

### 2. 分析対象ファイル（20ファイル）
```
ペルソナ軸（5ファイル）:
- /docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch1-contents001-020.md
- /docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch2-contents021-040.md
- /docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch3-contents041-060.md
- /docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch4-contents061-080.md
- /docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch5-contents081-100.md

有益性軸（5ファイル）:
- /docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch1-contents001-020.md
- /docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch2-contents021-040.md
- /docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch3-contents041-060.md
- /docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch4-contents061-080.md
- /docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch5-contents081-100.md

表現軸（5ファイル）:
- /docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch1-contents001-020.md
- /docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch2-contents021-040.md
- /docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch3-contents041-060.md
- /docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch4-contents061-080.md
- /docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch5-contents081-100.md

テーマ軸（5ファイル）:
- /docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch1-contents001-020.md
- /docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch2-contents021-040.md
- /docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch3-contents041-060.md
- /docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch4-contents061-080.md
- /docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch5-contents081-100.md
```

### 3. 保存場所
```
/docs/content-analysis/persona-analysis-project/sessions/
├── session-01/  # 生データ抽出
├── session-02/  # 人物像構築（削除済み - 架空だったため）
├── session-03/  # 有益性分析（削除済み - 架空だったため）
├── session-04/  # 統合判定
└── session-05/  # 品質保証・テスト
```

## 🔥 分析方法

### Session 01: 生データ抽出
1. **20ファイルを全て読む**
2. **具体的な人物描写を抽出**（年齢、職業、状況が書いてあるもののみ）
3. **一切の創作・推測をしない**
4. **抽象表現は除外**（「会社員」「ビジネスパーソン」等）

### 重要な理解
- **抽出 ≠ 構築**（データから見つける、作らない）
- **具体ペルソナ → ターゲット**（逆ではない）
- **情報の塊 ≠ コンテンツ**（リサーチ結果は後工程でコンテンツ化）

## 🚨 絶対にやってはいけないこと

1. **架空のペルソナを作る**
2. **データにない情報を推測する**
3. **効率化のために手を抜く**
4. **元のコンテンツを確認せずに分析する**

## 📊 TypeIDとターゲットの関係（ステップ1完了済み）

### TypeID=001: 共感・感情誘導型（17投稿）
ターゲット：
- 就活に不安を感じている学生
- 仕事のストレスで悩んでいる人
- 転職すべきか迷っている人

### TypeID=002: 教育・学習特化型（34投稿）
ターゲット：
- 就活で差をつけたい学生
- 新しいスキルを身につけたい人
- キャリアアップしたい人

### TypeID=003: 情報提供・データ型（28投稿）
ターゲット：
- 業界研究をしている就活生
- 転職先を探している人
- 企業選択で迷っている人

### TypeID=004: 効率・実用特化型（21投稿）
ターゲット：
- AIを仕事に活かしたい人
- 生産性を上げたい人
- 時短で結果を出したい就活生

## 💡 成功の鍵

1. **実データに忠実に**
2. **具体的な記述のみ抽出**
3. **創作・推測は一切しない**
4. **最終ゴールを常に意識**

---

**引き継ぎ日時**: 2025-07-21
**前任者の失敗**: 架空ペルソナ構築による分析破綻
**次任者への期待**: データに基づく正確な抽出と分析