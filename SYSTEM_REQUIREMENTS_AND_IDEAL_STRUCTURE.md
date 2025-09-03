# Instagram投稿生成システム 要件定義・理想構造設計書

**作成日**: 2025-09-03  
**目的**: システム全体要件の整理と理想的ディレクトリ構造の設計

---

## 📋 システム要件定義

### 🎯 システムの基本構成

#### **1. コンテンツベース（3要素）**
```
📊 データベース
├── 企業データベース（17カテゴリ・ランキング生成）
├── AIツール・生産性ツールデータベース  
└── 就活・キャリア情報データベース

📝 コンテンツ
├── 女性向けコンテンツ（MISAKI専用）
├── 就活・転職コンテンツ
└── 生産性・効率化コンテンツ

🗺️ ロードマップ・マスターガイド
├── 就活マスターガイド（10章構成）
├── 企業分析・面接対策ガイド
└── キャリア戦略マップ
```

#### **2. 投稿システム（5キャラクター × 2形式）**
```
👥 キャラクター（5名）
├── MISAKI（女性向け・優しい口調）
├── KING（男性社会人向け・厳格）
├── IIDA（詳細不明・要調査）
├── KIKUYO（就活生向け・データ重視）
└── TEN（生産性向上・古風な武士口調）

📱 投稿形式（2種類）
├── フィード投稿（8ページ構成・Type003等）
└── リール投稿（10ページ構成・ナレーション付き）
```

#### **3. 起動術式システム（トリガー機能）**
```
🚀 起動術式の役割
├── 各フローの開始トリガー
├── 対応するマスタープロンプト読み込み指示
└── 実行手順・品質基準の適用

📝 起動術式の種類
├── リサーチ起動術式（データベース構築用）
├── キャラクター別フィード投稿起動術式（5種）
├── キャラクター別リール投稿起動術式（5種）
└── データベース統合・ランキング生成起動術式
```

#### **4. マスタープロンプト・ガイドラインシステム**
```
📖 マスタープロンプトの役割
├── 各フローの詳細ルール・品質基準
├── キャラクター別の投稿仕様
├── データ構造・テンプレート定義
└── 品質チェック・エラー対応手順

🔗 起動術式との関係
起動術式 → マスタープロンプト読み込み → フロー実行
```

### 🔄 システム実行フロー

```
1. 【リサーチフェーズ】
   リサーチ起動術式 → リサーチマスタープロンプト → データ収集・整理

2. 【データベース構築フェーズ】  
   データベース統合起動術式 → 統合マスタープロンプト → データベース生成

3. 【投稿作成フェーズ】
   キャラクター別起動術式 → 対応マスタープロンプト → 投稿生成

4. 【配信・管理フェーズ】
   Webアプリケーション → テンプレートシステム → Instagram配信
```

---

## 🏗️ 理想ディレクトリ構造設計

### 📁 既存システム分析結果

**現在の問題点**:
- 起動術式とマスタープロンプトが分散配置
- キャラクター別整理が不十分  
- データベースとコンテンツの混在
- 実行フローが見えにくい

### 🎯 理想ディレクトリ構造（草案）

```
instagram-post-generator/
│
├── 📁 SYSTEM-CORE/                           # システム中核
│   ├── 📁 LAUNCH-FORMULAS/                   # 起動術式（トリガー集）
│   │   ├── 📄 research-launch.md            # リサーチ起動術式
│   │   ├── 📄 database-integration-launch.md # DB統合起動術式
│   │   ├── 📁 FEED-POSTS/                   # フィード投稿起動術式
│   │   │   ├── 📄 misaki-feed-launch.md
│   │   │   ├── 📄 king-feed-launch.md  
│   │   │   ├── 📄 iida-feed-launch.md
│   │   │   ├── 📄 kikuyo-feed-launch.md
│   │   │   └── 📄 ten-feed-launch.md
│   │   └── 📁 REEL-POSTS/                   # リール投稿起動術式
│   │       ├── 📄 misaki-reel-launch.md
│   │       ├── 📄 king-reel-launch.md
│   │       ├── 📄 iida-reel-launch.md  
│   │       ├── 📄 kikuyo-reel-launch.md
│   │       └── 📄 ten-reel-launch.md
│   │
│   ├── 📁 MASTER-PROMPTS/                    # マスタープロンプト（詳細ルール）
│   │   ├── 📁 RESEARCH/                     # リサーチ系
│   │   │   ├── 📄 company-research-master.md
│   │   │   ├── 📄 ai-tools-research-master.md
│   │   │   └── 📄 industry-research-master.md
│   │   ├── 📁 DATABASE/                     # データベース系  
│   │   │   ├── 📄 company-db-master.md
│   │   │   ├── 📄 ai-tools-db-master.md
│   │   │   └── 📄 ranking-generation-master.md
│   │   ├── 📁 CHARACTERS/                   # キャラクター別
│   │   │   ├── 📁 MISAKI/
│   │   │   │   ├── 📄 misaki-feed-master.md
│   │   │   │   └── 📄 misaki-reel-master.md
│   │   │   ├── 📁 KING/
│   │   │   │   ├── 📄 king-feed-master.md
│   │   │   │   └── 📄 king-reel-master.md
│   │   │   ├── 📁 IIDA/
│   │   │   │   ├── 📄 iida-feed-master.md
│   │   │   │   └── 📄 iida-reel-master.md
│   │   │   ├── 📁 KIKUYO/
│   │   │   │   ├── 📄 kikuyo-feed-master.md
│   │   │   │   └── 📄 kikuyo-reel-master.md
│   │   │   └── 📁 TEN/
│   │   │       ├── 📄 ten-feed-master.md
│   │   │       └── 📄 ten-reel-master.md
│   │   └── 📁 QUALITY-CONTROL/              # 品質管理
│   │       ├── 📄 post-quality-standards.md
│   │       ├── 📄 character-consistency-check.md
│   │       └── 📄 template-validation-rules.md
│   │
│   └── 📁 SYSTEM-DOCS/                       # システム文書
│       ├── 📄 system-overview.md            # システム全体概要
│       ├── 📄 execution-flow-guide.md       # 実行フローガイド
│       ├── 📄 character-specifications.md   # キャラクター仕様書
│       └── 📄 troubleshooting-guide.md      # トラブルシューティング
│
├── 📁 CONTENT-BASE/                          # コンテンツベース
│   ├── 📁 DATABASES/                        # データベース
│   │   ├── 📁 COMPANIES/                    # 企業データベース
│   │   │   ├── 📄 master-data.json
│   │   │   ├── 📁 industries/               # 業界別データ
│   │   │   ├── 📁 rankings/                 # ランキング結果
│   │   │   └── 📁 scripts/                  # 生成スクリプト
│   │   ├── 📁 AI-TOOLS/                     # AIツールデータベース
│   │   │   ├── 📄 master-data.json
│   │   │   ├── 📁 categories/               # カテゴリ別
│   │   │   ├── 📁 rankings/                 # ランキング結果
│   │   │   └── 📁 scripts/                  # 生成スクリプト  
│   │   └── 📁 CAREER-INFO/                  # キャリア情報DB
│   │       ├── 📄 job-seeking-data.json
│   │       ├── 📄 interview-qa-data.json
│   │       └── 📄 industry-analysis-data.json
│   │
│   ├── 📁 CONTENT-MATERIALS/                # コンテンツ素材
│   │   ├── 📁 MISAKI-CONTENTS/              # MISAKI用コンテンツ
│   │   │   ├── 📄 female-career-content.md
│   │   │   └── 📄 work-life-balance-content.md
│   │   ├── 📁 GENERAL-CONTENTS/             # 汎用コンテンツ
│   │   │   ├── 📄 job-seeking-tips.md
│   │   │   └── 📄 productivity-methods.md
│   │   └── 📁 SPECIALIZED-CONTENTS/         # 専門コンテンツ
│   │       ├── 📄 technical-career.md
│   │       └── 📄 management-skills.md
│   │
│   └── 📁 ROADMAPS-GUIDES/                  # ロードマップ・ガイド
│       ├── 📁 JOB-SEEKING-MASTER-GUIDE/     # 就活マスターガイド
│       │   ├── 📄 01-mbti-career-mapping.md
│       │   ├── 📄 02-self-analysis.md
│       │   ├── 📄 03-company-analysis.md
│       │   └── 📄 ... (10章構成)
│       ├── 📁 CAREER-STRATEGY-MAPS/         # キャリア戦略マップ
│       └── 📁 SKILL-DEVELOPMENT-GUIDES/     # スキル開発ガイド
│
├── 📁 OUTPUT-GENERATION/                     # 生成物管理
│   ├── 📁 FEED-POSTS/                       # フィード投稿
│   │   ├── 📁 MISAKI/
│   │   │   ├── 📄 misaki_content_001.json
│   │   │   └── 📄 misaki_content_001_caption.txt
│   │   ├── 📁 KING/
│   │   ├── 📁 IIDA/
│   │   ├── 📁 KIKUYO/
│   │   └── 📁 TEN/
│   │       ├── 📄 K601.json
│   │       └── 📄 K601_caption.txt
│   │
│   ├── 📁 REEL-POSTS/                       # リール投稿
│   │   ├── 📁 MISAKI/
│   │   ├── 📁 KING/
│   │   ├── 📁 IIDA/
│   │   ├── 📁 KIKUYO/
│   │   └── 📁 TEN/
│   │
│   └── 📁 RESEARCH-RESULTS/                 # リサーチ結果
│       ├── 📁 COMPANY-RESEARCH/
│       ├── 📁 AI-TOOLS-RESEARCH/
│       └── 📁 INDUSTRY-ANALYSIS/
│
├── 📁 WEBAPP-SYSTEM/                        # Webアプリケーション（既存app/構造維持）
│   ├── 📁 components/
│   │   └── 📁 templates/
│   │       ├── 📁 misaki/
│   │       ├── 📁 king/ 
│   │       ├── 📁 iida/
│   │       ├── 📁 kikuyo/
│   │       └── 📁 ten/
│   ├── 📁 services/
│   ├── 📁 data/
│   └── 📄 ... (既存Next.js構造)
│
└── 📁 ARCHIVE/                              # アーカイブ
    ├── 📁 OLD-STRUCTURES/                   # 旧構造保管
    ├── 📁 DEPRECATED-CONTENT/               # 非推奨コンテンツ
    └── 📁 BACKUP/                           # バックアップ
```

---

## 🔄 移行・再配置計画

### **Phase 1: システム中核の整理**
1. 起動術式の整理・統合 (LAUNCH-FORMULAS/)
2. マスタープロンプトの体系化 (MASTER-PROMPTS/)
3. システム文書の作成 (SYSTEM-DOCS/)

### **Phase 2: コンテンツベースの再構築**  
1. データベースの統合 (DATABASES/)
2. コンテンツ素材の整理 (CONTENT-MATERIALS/)
3. ガイドの体系化 (ROADMAPS-GUIDES/)

### **Phase 3: 出力・管理システムの最適化**
1. 生成物の整理 (OUTPUT-GENERATION/)
2. Webアプリケーションの調整 (WEBAPP-SYSTEM/)
3. アーカイブの整備 (ARCHIVE/)

---

## 📊 期待効果

### **効率性向上**
- 起動術式から実行までのフロー短縮
- マスタープロンプトへのアクセス性向上
- キャラクター別作業の並列化

### **品質向上**  
- 一貫したクオリティ管理
- キャラクター特性の維持
- エラー・修正の最小化

### **拡張性確保**
- 新キャラクター追加の容易性
- 新投稿タイプ対応の柔軟性
- システム全体の保守性向上

---

**注意**: この構造は既存システムの理解を基に設計した草案です。実装前に詳細な移行計画と影響分析が必要です。