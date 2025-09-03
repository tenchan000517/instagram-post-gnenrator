# 🚀 TEN DATABASE 構築起動術式 V2

**目的**: Claude Codeセッション開始時の即座の理解と作業開始  
**所要時間**: 3分  
**最終更新**: 2025-08-31 (V2: 8ツールバッチ対応・配置統一)

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

#### AIツールバッチ起動術式確認（V2: 8ツールバッチ）
```bash
# V2統一配置: 9バッチ完了（72ツール・8ずつ）
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/database/
- 00_AIツールバッチ1詳細リサーチ起動術式_1-8.md ★完了
- 00_AIツールバッチ2詳細リサーチ起動術式_9-16.md ★完了
- 00_AIツールバッチ3詳細リサーチ起動術式_17-24.md ★完了
- 00_AIツールバッチ4詳細リサーチ起動術式_25-32.md ★完了
- 00_AIツールバッチ5詳細リサーチ起動術式_33-40.md ★完了
- 00_AIツールバッチ6詳細リサーチ起動術式_41-48.md ★完了
- 00_AIツールバッチ7詳細リサーチ起動術式_49-56.md ★完了
- 00_AIツールバッチ8詳細リサーチ起動術式_57-64.md ★完了
- 00_AIツールバッチ9詳細リサーチ起動術式_65-72.md ★完了
```

#### 既存リソース確認
```bash
# 1. 既存のTENコンテンツ
/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K901.json

# 2. 習慣データベース（活用対象）
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/data-systems/03_DATABASE/habit-databases/habit-behavior-database.json

# 3. バッチ1完了データ（実績）
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/research-results/
- batch1-complete-results.json ★15ツール→8ツール仕様変更
- batch1-final-report.md ★実績フロー確立
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

#### チェックリスト（V2: 8バッチ対応・6カテゴリ）

##### **準備フェーズ完了状況**
- [x] AIツールバッチ起動術式（✅ 9/9バッチ完了・8ツール構成）
- [x] JSON構造定義（✅ 30+項目完全スキーマ）
- [x] ディレクトリ統一（✅ /database/配下に集約）
- [x] フロー確立（✅ バッチ1で実証済み）

##### **カテゴリ別実行状況**
**1. AIツール（72ツール・9バッチ構成）**
- [x] バッチ1実行済み（✅ 8ツール→15ツール実績）
- [ ] バッチ2-9実行（❌ 0/8バッチ実行）
- [ ] aiToolsMasterData.json構築（❌ 未実装）

**2-6. その他カテゴリ**
- [ ] 発見フェーズ実行（❌ 未実行）
- [ ] 詳細リサーチ（❌ 未実行）

---

## 🎯 V2での重要変更点

### 1. **8ツールバッチ構成（コンテキスト最適化）**
```
旧: 15ツール×5バッチ = 75ツール（コンテキスト制限問題）
新: 8ツール×9バッチ = 72ツール（コンテキスト最適化）
```

### 2. **ファイル配置統一**
```
旧: /ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TEN-DATABASE/BATCH-RESEARCH/
新: /ACTIVE-ROUTINES/01_DAILY_USE/database/  ★一貫性重視
```

### 3. **バッチフロー確立**
- **実証済み効率**: 8ツール×4時間=効率的
- **品質保証**: 5ソース確認・30+項目・TEN評価
- **継続性**: JSON構造・評価軸統一

### 4. **TEN評価フロー確立済み（V2.1追加）**
- **絶対評価方式**: バッチ内相対評価ではなく100点満点絶対評価
- **rank項目削除**: バッチ内ランキングは無意味のため削除済み
- **JSON保存必須**: 各バッチ完了時に指定パスへの保存を義務化
- **他カテゴリ適用**: 資格・ガジェット・習慣データベースでも同一フロー適用

### 5. **統一TEN評価軸（V3）**
```
TENスコア = 即効性(20%) + 簡単さ(20%) + 人気度(15%) + コスパ(15%) + 機能専門性(20%) + 生産性UP度(10%)
```

#### **各項目の評価基準:**
1. **即効性(20%)**: 結果取得までの速度（0-100点）
2. **簡単さ(20%)**: 学習コスト・操作の直感性（0-100点）
3. **人気度(15%)**: ユーザー数・市場認知度（0-100点）
4. **コスパ(15%)**: 価格対機能・価値（0-100点）
5. **機能専門性(20%)**: 独自機能・差別化要素（0-100点）
6. **生産性UP度(10%)**: 実際の作業効率向上（0-100点）

---

## 💬 作業開始時の宣言

以下をコピペして宣言してください：

```
TEN DATABASE構築作業を開始します（V2版・8ツールバッチ最適化対応）。

✅ 読了確認：
- TEN_DATABASE_構築共有ドキュメント.md
- TEN_MASTER_PLAN.md
- バッチ1実績データ（15ツール実証済み）
- V2改善版: 8ツールバッチ起動術式（9バッチ完備）
- 配置統一: /database/配下集約完了

📊 現在の理解：
- V2最適化：8ツールバッチでコンテキスト制限解決
- 実証済みフロー：バッチ1で品質・効率確立
- 9バッチ準備完了：72ツール効率的調査体制
- 配置統一：databaseディレクトリ一貫性確保

🎯 本日の作業：
[ここに具体的な作業内容を記載]
```

---

## 🔧 トラブルシューティング

### Q: V2での変更点の意味は？
A: コンテキスト制限回避（15→8ツール）＋配置統一（一貫性向上）

### Q: バッチ1の15ツール実績はどう活用？
A: フロー確立済み。今後は8ツール構成で効率化

### Q: 72ツールの調査時間は？
A: 8ツール×4時間×9バッチ=36時間（従来45時間から短縮）

---

## ⚡ クイックコマンド

よく使うパス（V2統一版）：

```bash
# TENメインディレクトリ
cd /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/

# V2起動術式ディレクトリ（統一配置）
cd /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/database/

# バッチ1実績確認
cat /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/research-results/batch1-final-report.md
```

---

**この起動術式V2により、最適化されたバッチフローで効率的なTEN DATABASE構築が可能です**  
**コンテキスト制限解決・配置統一により、次世代Claude Codeの継続作業効率が大幅向上**