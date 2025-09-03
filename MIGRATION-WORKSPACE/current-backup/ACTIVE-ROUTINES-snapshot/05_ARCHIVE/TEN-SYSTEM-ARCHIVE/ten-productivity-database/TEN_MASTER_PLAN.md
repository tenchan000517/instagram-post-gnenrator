# TEN DATABASE マスタープラン完全版

作成日: 2025-08-30  
目的: KIKUYOフロー完全理解に基づく、4カテゴリ独立データベース構築計画

## 📋 KIKUYO完全フロー分析結果

### 🔍 KIKUYOフロー（企業ランキングシステム）完全版
```
①ChatGPTリサーチ → ②JSON保存 → ③データベース統合 → ④ランキング生成 → ⑤Type003投稿作成 → ⑥Web表示登録
```

#### **詳細フロー解析**

##### **Step1: ChatGPTリサーチ**
```
ファイル: 00_ChatGPT用企業リサーチ起動術式_[業界].md（14業界分）
- 物流エネルギー、電機、医療、公務員等
- 各20社程度、LOG001形式でID採番
- 5ソース確認必須: 有価証券報告書→IR資料→公式採用サイト→就職四季報→厚労省DB
- 推測・憶測絶対禁止、null値統一
```

##### **Step2: JSON保存**
```
ファイル: 01_リサーチ結果JSON保存起動術式.md
- ChatGPTから受け取ったJSONを業界別ファイルに分類保存
- `/industries/`配下の8ファイル（government_companies.json等）
- 構文検証・重複チェック・業界自動判定
```

##### **Step3: データベース統合**
```
ファイル: 03_データベース統合起動術式.md
- createUnifiedDatabase.js実行で23業界統合
- companyMasterData.json生成
- generateAllRankings.js実行
```

##### **Step4: ランキング生成**
```
ファイル: 04_ランキング生成起動術式.md
- targetNeedsPatterns.jsに新パターン追加
- JS031-038, FC031-038, MP031-038の24パターン追加
- 90→114パターンに拡張
```

#### **マスタープロンプト体系（完全調査済み）**
```
/ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TYPE003企業ランキング/
├── TYPE003-KIKUYO-MASTER-PROMPT.md ★就活生向け
├── TYPE003-KING-MASTER-PROMPT.md
├── TYPE003-MISAKI-MASTER-PROMPT.md
├── 01_リサーチ結果JSON保存マスタープロンプト.md
├── 02_新ランキング追加マスタープロンプト.md
└── TYPE003生産性ランキング/
    └── TYPE003-TEN-MASTER-PROMPT.md ★既存TEN用
```

#### KIKUYO成功要因（調査完了）
1. **質重視**: 自動化ではなく、各ステップでの品質確保
2. **独立性**: 各ステップが独立してテスト・改善可能
3. **マスタープロンプト**: 詳細なマスタープロンプトで一貫性確保
4. **起動術式**: 実行を簡単にする起動術式でワークフロー効率化
5. **5ソース確認**: 信頼性確保のための徹底リサーチ
6. **段階的拡張**: 90→114パターンへの体系的拡張

## 🎯 TEN DATABASE 4カテゴリ独立フロー

### **対象カテゴリ**
1. **ツール系** - AI・生産性ツール（トレンド重視）
2. **ガジェット系** - 物理的デバイス（トレンド重視）
3. **資格系** - 国家・民間資格（トレンド関係なし・需要重視）
4. **習慣系** - 既存データベース活用（生産性向上習慣）

## 🏗️ 各カテゴリ独立フロー設計

### 📱 **ツール系データベースフロー**

#### ①調べるものを調べる
- **目的**: 2025年トレンドツールの発見
- **方法**: WebSearch + トレンド調査

#### ②詳細リサーチ
- **目的**: 選定ツールの詳細情報収集
- **方法**: 5ソース確認（公式→EC→レビュー→使用例→価格）

#### ③個別データベース作成
- **出力**: `tools/[カテゴリ]_tools_2025.json`
- **構造**: TEN評価軸対応

#### ④マスターデータベース統合
- **実行**: `createToolsMasterDatabase.js`

### 🔧 **ガジェット系データベースフロー**

#### ①調べるものを調べる  
- **目的**: 2025年話題ガジェットの発見
- **方法**: WebSearch + トレンド調査

#### ②詳細リサーチ
- **目的**: 選定ガジェットの詳細情報収集
- **方法**: 5ソース確認（公式→Amazon→価格.com→レビュー→実用性）

#### ③個別データベース作成
- **出力**: `gadgets/[カテゴリ]_gadgets_2025.json`
- **構造**: TEN評価軸対応（即効性・コスパ・快適性）

#### ④マスターデータベース統合
- **実行**: `createGadgetsMasterDatabase.js`

### 📜 **資格系データベースフロー（トレンド関係なし）**

#### ①調べるものを調べる
- **目的**: 高需要資格の選定
- **方法**: 需要調査（就職・転職・独立・スキルアップ）

#### ②詳細リサーチ  
- **目的**: 選定資格の詳細情報収集
- **方法**: 5ソース確認（公式機関→試験概要→合格率→費用→就職効果）

#### ③個別データベース作成
- **出力**: `certificates/[カテゴリ]_certificates.json`
- **構造**: TEN評価軸対応（取得速度・コスパ・市場価値）

#### ④マスターデータベース統合
- **実行**: `createCertificatesMasterDatabase.js`

### 🔄 **習慣系データベースフロー（既存活用）**

#### ①既存データベース活用
- **対象**: `/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/data-systems/03_DATABASE/habit-databases/habit-behavior-database.json`
- **内容**: 45の生産性向上習慣（信頼性A級）

#### ②TEN評価軸変換
- **目的**: 既存習慣データをTEN評価軸に変換

#### ③個別データベース作成
- **出力**: `routines/productivity_habits.json`
- **構造**: TEN評価軸対応

#### ④マスターデータベース統合
- **実行**: `createHabitsMasterDatabase.js`

## 📁 完全ファイル構造

### **作成済みドキュメント**
```
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/
├── TEN生産性システム完全仕様書_Claude_Code専用_2025-08-30.md ★既存
├── DATABASE_ARCHITECTURE_V2.md ★作成済み（ツール・資格・ガジェット独立管理）
├── GADGET_DATABASE_STRUCTURE.md ★作成済み（ガジェット専用構造）
├── DATA_VERIFICATION_SYSTEM.md ★作成済み（信頼性確保システム）
├── UNIFIED_DATABASE_ARCHITECTURE.md ★作成済み（統合アーキテクチャ）
├── COMPLETE_WORKFLOW_SYSTEM.md ★作成済み（完全ワークフロー）
├── TEN_RESEARCH_PRIORITY_PLAN.md ★作成済み（リサーチ優先順位）
├── TEN_RANKING_IDEAS_100.md ★既存（100のランキングアイデア）
├── CERTIFICATES_MASTER_LIST.md ★作成済み（資格マスターリスト）
├── tools/
│   ├── GOD_TOOLS_MASTER_LIST.md ★作成済み（92個の神ツール）
│   └── productivity_tools.json ★既存（10ツール）
└── gadgets/
    ├── TRENDING_GADGETS_2025.md ★作成済み（初回ガジェット）
    └── EXTENDED_TRENDING_GADGETS_2025.md ★作成済み（拡張ガジェット）
```

### **必要な追加ドキュメント（KIKUYO方式完全準拠）**

#### **マスタープロンプト（8ファイル）**
```
/ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TEN-DATABASE/
├── 01_ツールトレンド発見マスタープロンプト.md          ★KIKUYOの00_ChatGPT用企業リサーチ起動術式相当
├── 02_ツール詳細リサーチマスタープロンプト.md          ★5ソース確認方式適用
├── 03_ガジェット系トレンド発見マスタープロンプト.md    ★Amazon・価格.com重視版
├── 04_ガジェット系詳細リサーチマスタープロンプト.md    ★実売価格・レビュー重視版
├── 05_資格需要調査マスタープロンプト.md              ★公式機関・試験実施団体重視版
├── 06_資格詳細リサーチマスタープロンプト.md          ★合格率・就職効果重視版
├── 07_TENランキング生成マスタープロンプト.md         ★KIKUYOの02_新ランキング追加相当
└── 08_TENコンテンツ作成マスタープロンプト.md         ★TYPE003-TEN-MASTER-PROMPT強化版
```

  📊 企業データベースシステム完全把握

  システム構成

  companyDatabase/
  ├── companyMasterData.json ★23業界152社統合DB
  ├── createUnifiedDatabase.js ★DB統合スクリプト
  ├── generateAllRankingsV2.js ★V2ランキング生成（150+パターン）
  ├── generateAllRankings.js ★V1ランキング生成（90パターン）
  ├── targetNeedsPatternsV2.js ★150+パターン定義
  ├── README.md ★システム概要
  └── /rankingsV2/ ★生成済みランキング格納

  データフロー理解

  23業界152社JSON → createUnifiedDatabase.js → companyMasterData.json
                                                      ↓
  targetNeedsPatternsV2.js → generateAllRankingsV2.js → 150+ランキング生成

  システム進化

  - V1: 90パターン（各ターゲット30）
  - V2: 150+パターン（各ターゲット50+）
  - データ: 84社→152社に拡張
  - 業界: 15業界→23業界に拡張

  ランキング生成エンジンV2の特徴

  1. 高度フィルタリング: 業界・従業員数・年収・残業時間等の複合条件
  2. 業界マッピング: IT業界の細分化対応
  3. ターゲット別最適化: 就活生・女性キャリア・男性社会人
  4. 完全自動化: ワンコマンドで150+パターン生成

  targetNeedsPatternsV2.jsの構造

  // 各ターゲット50+パターン × 3 = 150+パターン
  {
    jobSeekers: [74パターン] // JS001-JS074
    femaleCareer: [60パターン] // FC001-FC060  
    maleProfessional: [55パターン] // MP001-MP055
  }

  🎯 TEN DATABASEへの完全適用準備完了

  この企業データベースシステムの成功パターンをTEN DATABASEに完全適用し、4カテゴリ（ツ
  ール・ガジェット・資格・習慣）で同レベルのシステムを構築する準備が整いました！

  特に重要なのは:
  - 段階的拡張: V1→V2への進化過程
  - データ駆動: 152社の豊富なデータ活用
  - 自動化: ワンコマンド実行
  - 品質管理: execution_summary.jsonでの実行結果追跡


#### **起動術式（7ファイル）**
```
/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/起動術式/
├── STEP1_トレンド発見起動術式.md              ★KIKUYOの00_起動術式方式
├── STEP2_詳細リサーチ起動術式.md              ★5ソース確認チェックリスト版
├── STEP3_JSON保存起動術式.md                 ★KIKUYOの01_リサーチ結果JSON保存相当
├── STEP4_統合処理起動術式.md                 ★KIKUYOの03_データベース統合相当
├── STEP5_ランキング生成起動術式.md            ★KIKUYOの04_ランキング生成相当
├── STEP6_K投稿作成起動術式.md                ★TYPE003投稿生成フロー
└── STEP7_関係登録起動術式.md                 ★type-target-persona-relations.json登録
```

#### **KIKUYOとの対応関係**
```
KIKUYO企業DB                          TEN生産性DB
├── 00_ChatGPTリサーチ起動術式      → 01_ツールトレンド発見 + 02_詳細リサーチ
├── 01_JSON保存起動術式            → 03_JSON保存起動術式  
├── 03_データベース統合起動術式      → 04_統合処理起動術式
├── 04_ランキング生成起動術式        → 05_ランキング生成起動術式
├── TYPE003-KIKUYO-MASTER-PROMPT  → 08_TENコンテンツ作成マスタープロンプト
└── （Web表示登録は手動）           → 07_関係登録起動術式
```

## 📊 既存システム参照・連携

### **習慣データベース（既存活用）**
```
パス: /ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/data-systems/03_DATABASE/habit-databases/habit-behavior-database.json
内容: 45の生産性習慣、信頼性A級
活用方法: TEN評価軸に変換してマスターDBに統合
```

### **KIKUYOシステム（参考・流用）**
```
マスタープロンプト: /ACTIVE-ROUTINES/04_REFERENCE/master-prompts/TYPE003企業ランキング/TYPE003-KIKUYO-MASTER-PROMPT.md
起動術式: /ACTIVE-ROUTINES/01_DAILY_USE/feed-posts/TYPE003_RANKING-SYSTEM/TYPE003-KIKUYO-起動術式.md
成功実績: K805等、複数の企業ランキング投稿作成済み
```

### **type-target-persona-relations.json（最終登録先）**
```
パス: /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/type-target-persona-relations.json
現在の設定: T004→P901→K901（TEN生産性ツール）
必要な作業: 新規K投稿作成後の関係登録
```

## 🎯 実行優先順位

### **Phase 1: マスタープロンプト・起動術式作成（Week 1）**
1. 8つのマスタープロンプト作成
2. 7つの起動術式作成  
3. KIKUYO方式の完全適用

### **Phase 2: ツール系データベース構築（Week 2）**
1. トレンドツール発見（30-50ツール）
2. 詳細リサーチ（5ソース確認）
3. 個別データベース作成
4. マスターDB統合

### **Phase 3: ガジェット系データベース構築（Week 3）**
1. トレンドガジェット発見（30-50ガジェット）
2. 詳細リサーチ（実売価格・レビュー等）
3. 個別データベース作成
4. マスターDB統合

### **Phase 4: 資格系データベース構築（Week 4）**
1. 高需要資格調査（30-50資格）
2. 詳細リサーチ（試験情報・就職効果等）
3. 個別データベース作成
4. マスターDB統合

### **Phase 5: 習慣系データベース統合（Week 5）**
1. 既存習慣DBのTEN評価軸変換
2. マスターDB統合
3. 全カテゴリ統合完了

### **Phase 6: ランキング・K投稿生成（Week 6-8）**
1. 各カテゴリ別ランキング作成（20-30パターン）
2. K投稿生成（K902-K950程度）
3. type-target-persona-relations.json登録

## 🔑 成功の鍵（KIKUYOからの学び）

### **1. 品質最優先**
- 各ステップで妥協なし
- 信頼性確保システム必須
- 推測・憶測は絶対禁止

### **2. 独立性確保**
- 各ステップが独立してテスト可能
- 問題発生時の影響範囲限定
- 段階的改善が可能

### **3. 詳細マスタープロンプト**
- 曖昧さ完全排除
- 具体的な実行手順
- 品質基準明確化

### **4. 効率的起動術式**
- 実行時の迷い排除
- ワンクリックで手順明確
- 進捗管理システム

## 📈 期待成果

### **データベース規模**
- ツール: 100-150アイテム
- ガジェット: 100-150アイテム  
- 資格: 50-80アイテム
- 習慣: 45アイテム（既存）
- **合計: 300-400アイテム**

### **ランキング種類**
- 各カテゴリ10-20パターン
- クロスカテゴリ10パターン
- **合計: 50-70ランキング**

### **K投稿数**
- K902-K950（約50投稿）
- 全てTENキャラクター対応
- Web表示完全対応

## 🚀 最終目標

**「TEN DATABASE = 生産性向上の決定版情報源」**として確立し、TENキャラクター（T004ターゲット）向けの最強コンテンツ生成基盤を構築する。

KIKUYOの成功事例を完全に踏襲し、品質・独立性・効率性を兼ね備えたシステムを実現する。