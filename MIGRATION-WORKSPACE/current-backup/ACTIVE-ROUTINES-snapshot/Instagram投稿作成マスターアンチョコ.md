# 📚 Instagram投稿作成マスターアンチョコ（完全INDEX版）

## 🎯 このドキュメントの役割
ACTIVE-ROUTINESシステムで作成可能な全Instagram投稿タイプの網羅的INDEX。  
必要な機能・ファイル・コマンドを即座に参照可能。

---

## 🗂️ システム構成マップ

### 📂 必須参照ドキュメント
```
【全体構造】
📄 ACTIVE-ROUTINES_完全ファイルツリーリスト_2025-08-27.md
📄 ACTIVE-ROUTINES-完全コンテンツ作成ガイド_2025-08-27.md

【今回作成】
📄 リール→フィード変換アンチョコ.md
```

---

## 🚀 作成可能コンテンツ一覧

### 1️⃣ **リール投稿（10ページ構成）**

#### 📍 作成方法A：マスタープロンプトベース
```
起動ファイル：/01_DAILY_USE/reel-master-prompts/リール投稿作成_起動術式.md
対応キャラ：King・Misaki・Iida・Ten（全対応）
コマンド例：「kingの投稿を5個作成してください」
```

#### 📍 作成方法B：コンテンツベース
```
【MISAKI専用】
起動：/01_DAILY_USE/misaki-content-creation/MISAKI_リール動画作成_起動術式.md
元データ：/03_ANALYSIS_DATA/x-post-analysis/archive/女性向けコンテンツ100個02.md

【KING専用】  
マニュアル：/03_ANALYSIS_DATA/x-post-analysis/01KING_リール動画作成マニュアル_2025-08-27.md
元データ：/03_ANALYSIS_DATA/x-post-analysis/contents/社会人向けコンテンツ100個02.md

【IIDA専用】
マニュアル：/03_ANALYSIS_DATA/x-post-analysis/01IIDA_リール動画作成マニュアル_2025-08-27.md
元データ：/03_ANALYSIS_DATA/x-post-analysis/contents/学生向けコンテンツ100個02.md
```

---

### 2️⃣ **フィード投稿（8ページ構成）**

#### 📍 通常作成
```
起動：/01_DAILY_USE/feed-posts/フィード投稿ナレッジ作成_起動術式.md
コマンド：【ナレッジ改善実行】対象: K001 実行してください。
```

#### 📍 新規作成（Type別特性）
```
Type001（女性感情共感）：/knowledge/type001/
  - 構造：section_blocks（共感→問題分析→希望→解決）
  - 対象：T001-T006（女性ターゲット）

Type002（男性成長支援）：/knowledge/type002/
  - 構造：step_by_step（実践ステップ形式）
  - 対象：T007-T012（男性・成長志向）

Type003（ランキング情報）：/knowledge/type003/ ⚠️特別構造
  - 構造：company-ranking（データベース連携必須）
  - データソース：企業情報データベース2025.md
  - テンプレート：unified-template-11/12（ランキング専用）
  - 対象：T013-T018（就活・転職者）

Type004（効率テクニック）：/knowledge/type004/
  - 構造：step_by_step（実証型アプローチ）
  - 対象：T019-T024（効率化・生産性）

品質チェック：
- Type001：/quality-checklists/type001/TYPE001-MASTER-CHECKLIST.md
- Type002：/quality-checklists/type002/T010-checklist.md
- Type003：/quality-checklists/type003/TYPE003-MASTER-CHECKLIST.md（データベース整合性重視）
- Type004：/quality-checklists/type004/TYPE004-MASTER-CHECKLIST.md
```

#### 📍 リール→フィード変換（NEW!）
```
変換マッピング：
社会人向け → Type002（K1008作成済）
女性向け → Type001（K1009作成済）
学生向け → Type002（K1010作成済）

作成済みナレッジ：
K1006：GPT-5公式データ解説（Type004）
K1007：Slack通知最適化（Type004）
K1008：感情コントロール術（Type002）
K1009：80%働き方（Type001）
K1010：ワクワク目標設定（Type002）
```

---

### 3️⃣ **ストーリーズクイズ（○×形式）**

```
【起動ファイル】
ビジネスマナー：/01_DAILY_USE/quiz-generation/ビジネスマナークイズ作成_起動術式.md
キャリア：/01_DAILY_USE/quiz-generation/キャリアクイズ作成_起動術式.md
就活：/01_DAILY_USE/quiz-generation/就職活動クイズ作成_起動術式.md
スキルアップ：/01_DAILY_USE/quiz-generation/スキルアップクイズ作成_起動術式.md

【完成データベース】
/02_ACTIVE_CONTENTS/quiz-database/
- business-manner-quiz-100.md
- career-quiz-100.md
- jobhunting-quiz-100.md
- skillup-quiz-100.md
```

---

### 4️⃣ **習慣ランキング（KIKUYO）**

```
起動：/01_DAILY_USE/habit-ranking/全ランキング完全作成マスタープラン_最終改善版_実行プロンプト集_2025-08-25.md

メインDB：/01_DAILY_USE/habit-ranking/habit-behavior-database.json
分類DB：/01_DAILY_USE/habit-ranking/classified-dbs/

完成ランキング：/02_ACTIVE_CONTENTS/kikuyo-rankings/（37種類）

コマンド例：
「habit-behavior-database.jsonから年収アップのための行動TOP10を生成してください」
```

---

## 📊 キャラクター別対応表

| キャラクター | リール(A) | リール(B) | フィード | 特徴 |
|------------|----------|----------|---------|------|
| **King** | ✅ | ✅ | Type002 | 筋トレ・成長・マインド |
| **Misaki** | ✅ | ✅ | Type001 | 共感・癒し・バランス |
| **Iida** | ✅ | ✅ | Type002 | 就活・キャリア・誠実 |
| **Ten** | ✅ | ❌ | Type004 | 効率化・生産性・技術 |

---

## 🔥 クイックスタートコマンド

### リール投稿
```bash
kingの投稿を5個作成してください
misakiの投稿を8個作成してください
iidaの投稿を10個作成してください
tenの投稿を7個作成してください
```

### フィード投稿
```bash
【ナレッジ改善実行】
対象: K001
実行してください。
```

### ストーリーズクイズ
```bash
ジャンル：ビジネスマナー
問題数：100問
品質レベル：マスターガイド準拠
出力形式：Instagram ストーリーズ対応
```

### 習慣ランキング
```bash
「habit-behavior-database.json」から「仕事ができる人の習慣TOP10」を生成してください。
出力形式：CANVA用1ページ
対象キャラクター：king
```

---

## 📁 重要ファイルパス一覧

### 🎯 起動術式（メイン実行ファイル）
```
/01_DAILY_USE/reel-master-prompts/リール投稿作成_起動術式.md ⭐
/01_DAILY_USE/feed-posts/フィード投稿ナレッジ作成_起動術式.md ⭐
/01_DAILY_USE/misaki-content-creation/MISAKI_リール動画作成_起動術式.md ⭐
/01_DAILY_USE/quiz-generation/[各種クイズ]_起動術式.md ⭐
/01_DAILY_USE/habit-ranking/全ランキング完全作成マスタープラン_最終改善版_実行プロンプト集_2025-08-25.md ⭐
```

### 📚 マニュアル・ガイド
```
/04_REFERENCE/manuals/コンテンツ作成マニュアル/（14種類）
/04_REFERENCE/CHARACTER-STRATEGY-MASTER-GUIDE.md
/04_REFERENCE/ストーリーズクイズ作成_マスタープロンプト.md
/04_REFERENCE/日本語表現品質ガイドライン_2025-08-24.md
```

### 💾 データベース・元コンテンツ
```
/01_DAILY_USE/habit-ranking/habit-behavior-database.json
/02_ACTIVE_CONTENTS/（全アクティブコンテンツ）
/03_ANALYSIS_DATA/x-post-analysis/contents/（元コンテンツ100個×3）
/03_ANALYSIS_DATA/buzz-analysis/（バズ分析データ）
```

### ✅ 品質管理
```
/knowledge-quality-system/quality-checklists/type001-004/
/knowledge-quality-system/core-system/master-standards/
```

---

## 🎨 投稿タイプ別使い分けガイド

| 目的 | 推奨タイプ | キャラクター | 備考 |
|-----|----------|------------|------|
| バズ狙い | リール | King/Misaki | 10ページ構成、音楽付き |
| 感情共感 | フィードType001 | 女性キャラ必須 | section_blocks構造 |
| 実践ノウハウ | フィードType002 | King/Iida | step_by_stepで具体的手順 |
| 企業ランキング | フィードType003 | Iida | ⚠️データベース連携必須 |
| 効率化テク | フィードType004 | Ten | 実証型・統計データ基盤 |
| エンゲージメント | ストーリーズ | - | ○×クイズでインタラクション |
| 習慣提案 | KIKUYOランキング | - | habit-behavior-database基盤 |

---

## 📈 実績データ

### 既存コンテンツ数
- **リール投稿**: 95本（King:76, Misaki:8, Iida:7, Ten:4）
- **フィード投稿**: 10本（K1001-K1010）
- **ストーリーズクイズ**: 400問（4ジャンル×100問）
- **習慣ランキング**: 37種類
- **元コンテンツ**: 300個（100個×3ターゲット）

### システム能力
- **推定作成可能数**: 数千〜数万投稿
- **品質保証**: 99%品質基準
- **対応ターゲット**: 24種類（T001-T024）
- **キャラクター**: 4種類（King, Misaki, Iida, Ten）

---

## 🚨 注意事項

1. **Type別品質基準を必ず守る**（チェックリスト確認必須）
2. **キャラクター性別一致**（女性向け→女性キャラ必須）
3. **禁止表現回避**（「効率的」「最適化」等のAI臭さ）
4. **自然な日本語**（明日やってみようと思える表現）

---

## 📝 最新更新履歴
- 2025-08-27: リール→フィード変換機能追加（K1008-K1010）
- 2025-08-27: Type004ナレッジ2本追加（K1006-K1007）
- 2025-08-27: マスターアンチョコ作成

---

**💡 このアンチョコ1つで、ACTIVE-ROUTINES全機能にアクセス可能！**