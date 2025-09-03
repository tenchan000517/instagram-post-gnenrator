# 🚀 TEN DATABASE 構築起動術式

**目的**: Claude Codeセッション開始時の即座の理解と作業開始  
**所要時間**: 3分  
**最終更新**: 2025-08-30 (V3リサーチプロンプト完成・TEN評価軸統一対応)

---

## 📋 起動手順（必ず順番通りに実行）

### STEP 1: 基本ドキュメント読み込み（1分）

以下のファイルを読み込んでください：

```bash
# 1. 共有ドキュメント（最優先）
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/TEN_DATABASE_構築共有ドキュメント.md

# 2. マスタープラン
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/TEN_MASTER_PLAN.md
```

---

### STEP 2: 現状確認（30秒）

以下を確認してください：

#### 既存リソース確認
```bash
# 1. 既存のTENコンテンツ
/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K901.json

# 2. 習慣データベース（活用対象）
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/data-systems/03_DATABASE/habit-databases/habit-behavior-database.json

# 3. V3リサーチマスタープロンプト（6カテゴリ完了）
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TEN-DATABASE/
- 01_AIツールトレンド発見マスタープロンプト_V3.md
- 02_生産性向上ツール・ソフトウェア・アプリリサーチマスタープロンプト_V1.md
- 03_資格リサーチマスタープロンプト_V1.md
- 04_ガジェットリサーチマスタープロンプト_V1.md
- 05_習慣・ルーティーンリサーチマスタープロンプト_V1.md
- 06_書籍リサーチマスタープロンプト_V1.md

# 4. AIツールバッチ起動術式（5バッチ完了）
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TEN-DATABASE/BATCH-RESEARCH/
- 01_AIツールバッチ1詳細リサーチ起動術式_1-15.md
- 02_AIツールバッチ2詳細リサーチ起動術式_16-30.md
- 03_AIツールバッチ3詳細リサーチ起動術式_31-45.md
- 04_AIツールバッチ4詳細リサーチ起動術式_46-60.md
- 05_AIツールバッチ5詳細リサーチ起動術式_61-72.md

# 5. 統一JSON構造定義
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TEN-DATABASE/TEN_DATABASE_JSON_SCHEMA.md

# 6. 詳細リサーチプロンプト（1/6カテゴリ完了）
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TEN-DATABASE/DETAIL-RESEARCH/
- 01_AIツール詳細リサーチプロンプト_V1.md
```

---

### STEP 3: KIKUYOシステム理解（1分）

成功事例として以下を参照：

```bash
# 1. KIKUYOマスタープロンプト（参考）
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TYPE003企業ランキング/TYPE003-KIKUYO-MASTER-PROMPT.md

# 2. 企業データベースシステム（参考実装）
/mnt/c/instagram-course/instagram-post-generator/app/data/companyDatabase/
- companyMasterData.json
- generateAllRankingsV2.js
- targetNeedsPatternsV2.js
```

---

### STEP 4: 作業状況確認（30秒）

#### チェックリスト（V5更新版・6カテゴリ全体）

##### **準備フェーズ完了状況**
- [x] リサーチマスタープロンプト作成状況（✅ 6/6カテゴリ完了）
- [x] AIツールバッチ起動術式（✅ 5/5バッチ完了）
- [x] JSON構造定義（✅ 30+項目完全スキーマ）
- [x] ディレクトリ整備（✅ 完了）

##### **カテゴリ別実行状況**
**1. AIツール（72ツール）**
- [ ] バッチ1-5実行（❌ 0/5バッチ実行）
- [ ] aiToolsMasterData.json構築（❌ 未実装）

**2. 生産性ソフト（数未確定）**
- [ ] 発見フェーズ実行（❌ 未実行）
- [ ] 総数確定（❌ 発見フェーズ後に決定）
- [ ] 詳細リサーチ（❌ 未実行）

**3. 資格・スキル（数未確定）**
- [ ] 発見フェーズ実行（❌ 未実行）
- [ ] 総数確定（❌ 発見フェーズ後に決定）
- [ ] 詳細リサーチ（❌ 未実行）

**4. ガジェット（数未確定）**
- [ ] 発見フェーズ実行（❌ 未実行）
- [ ] 総数確定（❌ 発見フェーズ後に決定）
- [ ] 詳細リサーチ（❌ 未実行）

**5. 習慣・ルーティーン（数未確定）**
- [x] 既存データ確認（✅ habit-behavior-database.json・45習慣）
- [ ] 発見フェーズ実行（❌ 未実行・追加習慣発見）
- [ ] 総数確定（❌ 既存45+新発見後に決定）
- [ ] 統合DB・TEN形式変換（❌ 未実行）

**6. 書籍（数未確定）**
- [ ] 発見フェーズ実行（❌ 未実行）
- [ ] 総数確定（❌ 発見フェーズ後に決定）
- [ ] 詳細リサーチ（❌ 未実行）

##### **統合システム**
- [ ] ランキング生成システム（❌ 未実装）
- [ ] K902-K999作成状況（✅ K901のみ存在）

---

## 🎯 理解すべき核心ポイント

### 1. **KIKUYOベース完全フロー構造**
```
フェーズ1: リサーチ起動術式実行
├─ バッチ1: AIツール1-15の詳細リサーチ起動術式
├─ バッチ2: AIツール16-30の詳細リサーチ起動術式
├─ バッチ3: AIツール31-45の詳細リサーチ起動術式
├─ バッチ4: AIツール46-60の詳細リサーチ起動術式
└─ バッチ5: AIツール61-72の詳細リサーチ起動術式
↓
フェーズ2: リサーチ結果JSON保存起動術式
├─ 各バッチのJSON検証・保存
└─ カテゴリ別ディレクトリ整理
↓
フェーズ3: データベース統合起動術式
├─ aiToolsMasterData.json生成（72ツール完全データ）
└─ 全項目の実データ埋め込み完了
↓
フェーズ4: ランキング生成起動術式
├─ targetNeedsPatternsV2.js相当の実装
└─ generateAllRankingsV2.js実行
↓
フェーズ5: Kxxxx作成（K902-K999）
```
**KIKUYOと同じ品質基準で構築が必須**

### 2. **TEN評価軸（V3統一版）**
```
即効性(20%) + 簡単さ(20%) + 人気度(15%) + コスパ(15%) + 機能専門性(20%) + 生産性UP度(10%)
```
「めんどくさがり対応」→「生産性UP度」に変更、機能専門性追加

### 3. **キャラクター設定**
- 武士口調（なり、であるぞ）
- 生産性向上・効率化重視
- 実用性・即効性重視

### 4. **V5での追加改善点（6カテゴリ完全対応）**
- **AIツール完全準備**: 72ツール5バッチ起動術式完成
- **JSON統一化**: 30+項目完全スキーマ・KIKUYOレベル品質
- **6カテゴリ構造**: AI、生産性ソフト、資格、ガジェット、習慣、書籍
- **段階的実行**: カテゴリ別・優先度別実行体制
- **習慣DB活用**: 既存45習慣データの有効活用
- **K番号体系**: K902-K999の体系的配分（各カテゴリ総数確定後に決定）

---

## 💬 作業開始時の宣言

以下をコピペして宣言してください：

```
TEN DATABASE構築作業を開始します（V5版・6カテゴリ完全対応）。

✅ 読了確認：
- TEN_DATABASE_構築共有ドキュメント.md（V5・6カテゴリ対応版）
- TEN_MASTER_PLAN.md
- 既存リソース（K901.json、habit-database等）
- V3リサーチマスタープロンプト（6カテゴリ完了）
- AIツールバッチ起動術式（5バッチ完了）
- 統一JSON構造定義（30+項目完全スキーマ）

📊 現在の理解：
- V5フロー：6カテゴリ統合システム・段階的実行
- TEN評価軸：即効性(20%)+簡単さ(20%)+人気度(15%)+コスパ(15%)+機能専門性(20%)+生産性UP度(10%)
- 完了状況：準備フェーズ100%完了、実行フェーズ0%
- カテゴリ構成：AI(72確定)、生産性ソフト(未確定)、資格(未確定)、ガジェット(未確定)、習慣(45+α未確定)、書籍(未確定)

🎯 本日の作業：
[ここに具体的な作業内容を記載]
```

---

## 🔧 トラブルシューティング

### Q: どこから始めればいいか分からない
A: AIツール詳細リサーチから着手（プロンプト完成済み、フロー検証に最適）

### Q: リサーチマスタープロンプトと詳細リサーチプロンプトの違いは？
A: マスター=70+項目発見・TEN評価、詳細=上位5-10項目の詳細情報収集

### Q: TEN評価軸のV3変更点は？
A: 「めんどくさがり対応」→「生産性UP度」、機能専門性(20%)追加

### Q: STEP 0でなぜ評価しないのか？
A: 比較対象が揃った状態で相対評価するため、一括評価が効率的・正確

### Q: カテゴリ別詳細リサーチの進め方は？
A: 5-10項目ずつまとめて処理、JSON構造化データ + Instagram用データ出力

---

## 📝 作業記録テンプレート

作業終了時に以下を記録：

```markdown
## 作業記録 [日付]

### 完了項目
- [ ] 項目1
- [ ] 項目2

### 次回継続事項
- 

### 課題・質問
- 

### 更新ファイル
- 
```

---

## ⚡ クイックコマンド

よく使うパスのコピペ用：

```bash
# TENメインディレクトリ
cd /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/

# V3リサーチマスタープロンプトディレクトリ
cd /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TEN-DATABASE/

# 詳細リサーチプロンプトディレクトリ
cd /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TEN-DATABASE/DETAIL-RESEARCH/

# K901確認
cat /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K901.json

# 習慣DB確認
cat /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/data-systems/03_DATABASE/habit-databases/habit-behavior-database.json
```

---

**この起動術式により、3分で前回と同じ理解レベルに到達できます**
**V3更新により、最新の進捗状況と改善されたフローを即座に把握可能**