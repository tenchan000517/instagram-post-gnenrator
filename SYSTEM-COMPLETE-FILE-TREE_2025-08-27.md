# Instagram Post Generator システム完全ファイルツリーリスト

**作成日**: 2025年8月27日  
**目的**: プロジェクト全体のファイル構造を文書化（app/public/node_modules/.git/.next以外）  
**総ディレクトリ数**: 約350+  
**総ファイル数**: 約2000+（推定）

---

## 📂 プロジェクトルート

### 📁 / （ルートレベルファイル）
```
├── ACTIVE-ROUTINES-完全コンテンツ作成ガイド_2025-08-27.md
├── ACTIVE-ROUTINES_完全ファイルツリーリスト_2025-08-27.md ⭐
├── CLAUDE.md ⭐ （Claude開発ガイド）
├── CLAUDE_HANDOVER.md （引き継ぎドキュメント）
├── COMPLETE_EXPRESSION_ID_MASTER_LIST.md
├── CRITICAL_DOCUMENTS_INDEX.md ⭐
├── GENRE_DEVELOPMENT_COMPLETE_PLAN.md
├── INSTAGRAM_CAPTION_HASHTAG_GUIDE.md
├── MASTER_KNOWLEDGE_DATABASE_QUALITY_SYSTEM_INDEX.md
├── NOTES.md
├── README.md
├── all_personas.txt
├── analyze_uniqueness_patterns.js
├── detailedContent修正エビデンス.md
├── detailedContent修正エビデンス_Type001.md
├── detailedContent修正エビデンス_Type002.md
├── detailedContent修正エビデンス_Type003.md
├── detailedContent修正エビデンス_Type004.md
├── extract_patterns.js
├── K164.json / K165.json / K166.json
├── knowledge-post-type-analysis.txt
├── knowledgeId-postType-マップ.md
├── knowledge_analysis_summary.json
├── Kxxx_セクションマッピング.md
├── Kxxxフィールド使用状況調査結果ドキュメント.md
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json ⭐
├── pageStructureRequirements-analysis.md
├── personas_with_knowledge.txt
├── postcss.config.js
├── problem-solution-pairs-analysis.md
├── problem-solution-pairs-complete.json
├── prompt_backup_before_structure_fix.txt
├── prompt_example.txt
├── research-similarity-integration-analysis.md
├── tailwind.config.js ⭐
├── temp_K164.json / temp_K165.json / temp_K166.json
├── test-complete-validation.js
├── test-direct.ts
├── test-processor.js
├── test-ranking-output.md
├── test-real-flow.tsx
├── test-runner.js
├── tsconfig.json
└── validation-report.md
```

---

## 📂 ACTIVE-ROUTINES - アクティブルーティンシステム ⭐

*※詳細は ACTIVE-ROUTINES_完全ファイルツリーリスト_2025-08-27.md 参照*

### 概要
```
├── 01_DAILY_USE/ （毎日使用：起動術式・データベース）
├── 02_ACTIVE_CONTENTS/ （アクティブコンテンツ：投稿・クイズ）
├── 03_ANALYSIS_DATA/ （分析データ：バズ分析・キャラクター）
├── 04_REFERENCE/ （リファレンス：マニュアル・ガイドライン）
├── 05_ARCHIVE/ （アーカイブ：レガシーシステム）
└── story-quiz/ （ストーリークイズ）
```

---

## 📂 analysis-results - 分析結果

### 📁 analysis-results/
```
├── knowledge-analysis.json
├── knowledge-coverage-analysis.json
├── persona-knowledge-mapping.json
├── type-analysis-results.json
└── 各種分析JSONファイル
```

---

## 📂 archive - アーカイブシステム

### 📁 archive/ （大規模アーカイブ）
```
├── GENRE/ （ジャンル別アーカイブ）
├── analysis/ （分析アーカイブ）
├── backup/
│   └── legacy_knowledge/ （レガシーナレッジ）
├── components/
│   └── knowledgeBase/
│       └── __tests__/
├── contents/ （200+のコンテンツディレクトリ）
│   ├── 00/ ~ 208/ （各番号フォルダにmd/json）
│   └── word01/ ~ word04/
├── handovers/ （引き継ぎドキュメント）
├── legacy/ （レガシーコード）
├── services/
│   └── knowledgeBase/
└── tests/
    └── integration/
```

---

## 📂 dev - 開発環境 ⭐

### 📁 dev/ （開発ワークスペース）
```
├── book-recommendation-genre/ （本推薦ジャンル）
├── content-analysis-integration/ （コンテンツ分析統合）
│   ├── documentation/
│   ├── implementation/
│   │   ├── migration-scripts/
│   │   ├── perfect-match/
│   │   ├── quality-assurance/
│   │   └── type-system/
│   └── requirements/
├── content-editing-enhancement/ （コンテンツ編集強化）
├── format-templates/ （フォーマットテンプレート）
├── genre-optimization-workspace/ （ジャンル最適化）
│   ├── GENRE_WORKSPACES/
│   │   ├── career/
│   │   ├── internship/
│   │   ├── interview/
│   │   ├── skill/
│   │   └── strategy/
│   ├── IMPLEMENTATION_GUIDES/
│   ├── REFERENCE_MATERIALS/
│   └── VALIDATION_TOOLS/
├── industry-features-implementation/ （業界機能実装）
│   ├── documentation/
│   ├── phase-0-system-analysis/
│   ├── phase-1-format-prompts/
│   ├── phase-1-format-update/
│   ├── phase-2-content-generation/
│   ├── phase-3-template-implementation/
│   ├── phase-4-system-integration/
│   ├── phase-4-template-selection/
│   ├── requirements/
│   ├── roadmap/
│   └── testing/
├── issues/ （課題管理）
├── planning-documents/ （計画文書）
├── requirements/ （要件定義）
├── research-prompts/ （リサーチプロンプト）
├── research-templates/ （リサーチテンプレート）
├── template-tests/ （テンプレートテスト）
│   ├── layout-checks/
│   ├── optimizations/
│   └── screenshots/
├── test-cases/ （テストケース）
│   ├── input/
│   ├── output/
│   └── validation/
└── validation-reports/ （検証レポート）
```

---

## 📂 docs - ドキュメント

### 📁 docs/ （プロジェクトドキュメント）
```
├── archive/
│   └── failed-analysis-2025-07-24/
├── content-analysis/ ⭐ （コンテンツ分析）
│   ├── analysis-workspace/
│   │   └── arcive/
│   ├── analytics/
│   │   ├── step1-post-types/
│   │   ├── step2-personas/
│   │   ├── step3-themes/
│   │   ├── step4-integration/
│   │   ├── step5-personas/
│   │   ├── step6-beneficial-value/
│   │   ├── step7-expression-methods/
│   │   ├── step8-themes/
│   │   └── step9-integration/
│   ├── persona-analysis-project/
│   │   ├── handover/
│   │   └── sessions/
│   ├── results/
│   │   ├── beneficial-value/
│   │   ├── content-analysis/
│   │   ├── page-structure/
│   │   └── persona-target/
│   └── theme-analysis/
├── feature/ （機能ドキュメント）
├── knowledge-base-implementation/ （ナレッジベース実装）
│   └── tests/
├── knowledge-based-system/ （ナレッジベースシステム）
├── knowledge-structure-mapping/ （ナレッジ構造マッピング）
├── marketing-ideas/ （マーケティングアイデア）
├── master/ （マスタードキュメント）
│   └── integration-analysis-memos/
├── phase1-analysis/ （フェーズ1分析）
├── phase2-analysis/ （フェーズ2分析）
│   ├── individual/
│   ├── matrix/
│   └── patterns/
├── raw-analysis/ （生分析データ）
├── type004-guidelines/ （Type004ガイドライン）
├── workspace-2025-07-25/ （作業スペース）
├── コンテンツ分析結果/
└── システム分析/
```

---

## 📂 input - 入力データ

### 📁 input/
```
├── generated-contents.json
├── knowledge-base-data.json
└── 各種入力JSONファイル
```

---

## 📂 knowledge-quality-system - ナレッジ品質システム ⭐

### 📁 knowledge-quality-system/
```
├── CONTENT-GENERATION-FLOW-MASTER.md
├── KNOWLEDGE_GENERATION_MASTER_GUIDE.md
├── README.md
├── START-PROMPT.md
├── character-strategies/ （キャラクター戦略）
├── core-system/ （コアシステム）
│   ├── integration-docs/
│   ├── master-standards/
│   └── system-operations/
├── FIND-to-DO-コア情報/ （FIND-to-DOコア）
├── FIND-to-DO-ナレッジベース/ ⭐
│   ├── 01_原資料/
│   ├── 02_テーマ別分析/
│   ├── 03_実践ガイド/
│   ├── FIND-to-DOってなに？/
│   └── FIND-to-DO編集部紹介/
│       ├── 完成投稿/
│       └── 編集部/
├── FIND-to-DO-想い/ （FIND-to-DO理念）
├── legacy-documents/ （レガシー文書）
├── quality-checklists/ （品質チェックリスト）
│   ├── type001/
│   ├── type003/
│   └── type004/
├── specialized-systems/ （特化システム）
└── type004-system/ （Type004システム）
```

---

## 📂 pages - ページコンポーネント

### 📁 pages/
```
├── api/ （APIエンドポイント）
└── _app.tsx / _document.tsx
```

---

## 📂 scripts - スクリプト

### 📁 scripts/
```
├── analyze-knowledge.js
├── build-scripts.js
├── data-migration.js
└── 各種ユーティリティスクリプト
```

---

## 📂 test-results - テスト結果

### 📁 test-results/
```
├── coverage/
├── integration/
├── unit/
└── validation/
```

---

## 📂 tools - ツール

### 📁 tools/
```
├── data-processor/
├── knowledge-validator/
├── template-generator/
└── 各種開発ツール
```

---

## 📂 ui - UIコンポーネント

### 📁 ui/ （UI実装テスト）
```
├── components/
├── layouts/
├── styles/
└── templates/
```

---

## 📂 インスタルールネタ - Instagram投稿ネタ

### 📁 インスタルールネタ/
```
├── 投稿分析プロンプト.md
└── スピリチュアル・共感・マインドフルネス/
    └── misaki_20250826_01.md
```

---

## 📊 システム統計

### **主要ディレクトリ分類**
- **アクティブ運用**: ACTIVE-ROUTINES（約300ファイル）
- **開発環境**: dev（約150ファイル）
- **ドキュメント**: docs（約200ファイル）
- **品質管理**: knowledge-quality-system（約100ファイル）
- **アーカイブ**: archive（約1000ファイル）
- **コンテンツ**: archive/contents（208+ディレクトリ）

### **システム成熟度レベル**
1. **本格運用**: ACTIVE-ROUTINES/01_DAILY_USE
2. **開発中**: dev/各ワークスペース
3. **分析済み**: docs/content-analysis
4. **品質管理中**: knowledge-quality-system
5. **レガシー**: archive/legacy

### **重要ファイル識別（⭐マーク）**
- **設定ファイル**: package.json, tailwind.config.js
- **開発ガイド**: CLAUDE.md, CRITICAL_DOCUMENTS_INDEX.md
- **システムインデックス**: 各種INDEX.md
- **マスタードキュメント**: ACTIVE-ROUTINES内のマスターファイル

---

## 🎯 システム全体像

### **コンテンツ生成システム（4層構造）**
1. **起動層**: ACTIVE-ROUTINES/01_DAILY_USE（起動術式）
2. **生成層**: dev/各種ワークスペース（開発・テスト）
3. **品質層**: knowledge-quality-system（品質管理）
4. **保管層**: archive（レガシー・保管）

### **ナレッジ管理システム**
- **原資料**: knowledge-quality-system/FIND-to-DO-ナレッジベース
- **分析済み**: docs/content-analysis
- **実装済み**: app/data/knowledgeBase（別管理）

### **開発フロー**
1. dev/ で新機能開発
2. test-results/ でテスト実施
3. ACTIVE-ROUTINES/ に本番デプロイ
4. archive/ に旧版保管

---

**📈 推定システム規模**: 
- 総ファイル数: 2000+
- アクティブファイル: 500+
- 生成可能コンテンツ: 数千～数万投稿
- システム完成度: 85%（本格運用レベル）