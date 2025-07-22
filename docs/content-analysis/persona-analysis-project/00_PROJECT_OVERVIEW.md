# 真のペルソナ分析プロジェクト - 全体計画書

## 🎯 プロジェクトの目的

**抽象的カテゴリではなく、具体的で実在する人物像を抽出し、その人が本当に知りたい独自価値のある情報を特定する。**

## 🚨 解決すべき重大な問題

### 前回分析の完全失敗
- **タイトル**: 「仕事で使えるChatGPT活用法」
- **対象**: P004「効率化志向ビジネスパーソン（25-35歳）」
- **結果**: 個人効率化を求める人に企業DX情報を提供（完全ミスマッチ）

### 失敗の根本原因
1. **抽象的すぎるペルソナ**: 「25-35歳会社員」では誰を指しているか不明
2. **有益性の欠如**: ChatGPTでメール作成等の既知情報のみ
3. **ターゲット外れ**: 求めるニーズと提供情報の完全不一致

## 📋 プロジェクト原則

### 絶対遵守事項
1. **抽象表現完全禁止**: 「会社員」「ビジネスパーソン」等の使用厳禁
2. **具体性強制**: 年齢・職業・状況は具体的記述必須
3. **実在性検証**: 「この人物は本当に実在するか？」の必須確認
4. **有益性検証**: 「この情報は本当に有益か？」の必須確認
5. **妥協禁止**: 品質基準未達は次工程進行禁止

### 成功の定義
- **具体的人物像**: 年齢3歳以内、詳細職種、具体状況
- **独自有益性**: 他では得られない価値、実体験ベース情報
- **完全マッチング**: ターゲットニーズと情報内容の100%一致

## 🏗️ プロジェクト構造

### ディレクトリ構成
```
/docs/content-analysis/persona-analysis-project/
├── 00_PROJECT_OVERVIEW.md                 # 本ドキュメント
├── 01_SESSION_GUIDELINES.md               # 各セッション共通ルール
├── 02_QUALITY_STANDARDS.md                # 品質基準・検証方法
├── sessions/
│   ├── session-01/                        # Phase 1: 生データ抽出
│   │   ├── SESSION_01_PROMPT.md           # 実行プロンプト
│   │   ├── raw-data-extraction/           # 抽出データ保存
│   │   └── session-01-results.md          # セッション成果
│   ├── session-02/                        # Phase 2: 人物像構築
│   │   ├── SESSION_02_PROMPT.md
│   │   ├── persona-construction/
│   │   └── session-02-results.md
│   ├── session-03/                        # Phase 3: 有益性分析
│   │   ├── SESSION_03_PROMPT.md
│   │   ├── value-analysis/
│   │   └── session-03-results.md
│   ├── session-04/                        # Phase 4: 統合判定
│   │   ├── SESSION_04_PROMPT.md
│   │   ├── integration-analysis/
│   │   └── session-04-results.md
│   └── session-05/                        # Phase 5: 品質保証・テスト
│       ├── SESSION_05_PROMPT.md
│       ├── quality-verification/
│       └── FINAL_RESULTS.md               # 最終成果物
└── handover/
    └── NEXT_PHASE_HANDOVER.md              # 次フェーズ引き継ぎ
```

## 📊 セッション別実行計画

### **Session 01: 生データ抽出 [効率重視]**
**目的**: バッチ分析20ファイルから具体的人物描写のみ抽出
**時間**: 集中的データ抽出
**成果**: 具体的人物描写リスト（抽象表現完全除外済み）
**品質**: 年齢・職業・状況の具体性100%

### **Session 02: 人物像構築 [深度重視]**
**目的**: 抽出データからの実在人物像構築
**時間**: 深度重視の人物像精緻化
**成果**: 実在性検証済み具体的ペルソナ群
**品質**: 三重検証（実在性・具体性・一意性）合格

### **Session 03: 有益性分析 [最高深度]**
**目的**: 各人物像の真の有益性ニーズ抽出
**時間**: 最高深度の価値分析
**成果**: 独自価値・実用性検証済みニーズマップ
**品質**: 既知情報・一般論完全排除

### **Session 04: 統合判定 [慎重実施]**
**目的**: 類似ペルソナの統合 vs 独立判定
**時間**: 慎重な判定・検証
**成果**: 最適化されたターゲット体系
**品質**: 統合精度100%（妥協統合禁止）

### **Session 05: 品質保証・テスト [徹底検証]**
**目的**: 全成果物の最終検証・テスト生成
**時間**: 徹底的品質管理
**成果**: 実用性確認済み最終ペルソナ・リサーチ体系
**品質**: テスト生成での実証確認必須

## 🔄 セッション間継承ルール

### データ継承方法
1. **前セッション成果の完全活用**: 各セッションは前回成果を必ず読み込み
2. **品質基準の段階的向上**: 各セッションで品質をさらに向上
3. **問題発見時の前工程フィードバック**: 問題発見は前セッション見直し
4. **最終統合での一貫性確保**: 全セッション成果の整合性確認

### 失敗時の対処
- **品質基準未達**: そのセッションをやり直し
- **データ不整合**: 該当セッション以前に戻って修正
- **セッション切り替え**: 必要データを全て保存済み状態で実行

## ⚡ 効率性と深度の両立戦略

### 効率性確保
1. **セッション特化**: 各セッション単一目的集中
2. **自動化要素**: 機械的処理可能部分の効率化
3. **明確判定基準**: 迷いなく判定できる基準設定
4. **テンプレート活用**: 統一フォーマットでの作業効率化

### 深度確保
1. **セッション独立性**: 1セッション1深掘り
2. **品質検証強制**: 各セッション終了時必須検証
3. **妥協禁止ルール**: 基準未達は進行停止
4. **実証テスト**: 机上の空論排除

## 📋 データソース

### 主要データソース（20ファイル）
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

### 参考データ（失敗例として）
- `/docs/content-analysis/analytics/step5-personas/PERSONA_CATEGORIZATION_COMPLETE.md` - 抽象的ペルソナの失敗例
- `/docs/master/integration-analysis-memos/PERSONA_TARGET_INTEGRATION_COMPLETE_V2.md` - 前回の統合分析結果（問題含有）

## 🎯 最終成果物

### 期待される最終成果
1. **具体的ペルソナ群**: 実在性・具体性・独自性を満たす人物像
2. **真の有益性マップ**: 各ペルソナが本当に求める独自価値情報
3. **最適化リサーチ体系**: 有効性実証済みプロンプト生成システム
4. **品質保証システム**: 継続的品質維持のための検証体制

### 成功指標
- **実在性**: 年齢3歳以内、具体職種、現実的状況
- **有益性**: 既知情報排除、独自価値提供、実用性確保
- **有効性**: テスト生成での機能実証、ターゲットマッチング確認

## 🚨 プロジェクト実行上の注意

### 絶対に避けるべき失敗パターン
1. **抽象化への逃避**: 具体性を求められた時の「まとめる」誘惑
2. **効率性重視の妥協**: 「まあこの程度で」という品質妥協
3. **一般論への回帰**: 「よくある情報でも」という価値妥協
4. **検証の省略**: 「たぶん大丈夫」という確認不足

### プロジェクト成功の鍵
1. **具体性への執着**: 抽象的表現の完全排除
2. **品質基準の徹底**: 妥協なき検証実行
3. **実証主義**: 理論ではなく実際の動作確認
4. **継続的改善**: 問題発見時の迅速修正

---

**作成日**: 2025-07-21  
**目的**: 真のペルソナ分析プロジェクトの完全設計  
**重要度**: 最高（プロジェクト成功の基盤）  
**次のアクション**: Session 01実行準備  
**実行場所**: `/docs/content-analysis/persona-analysis-project/`