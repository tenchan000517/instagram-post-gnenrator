# ACTIVE-ROUTINES再編成完了メモ - 2025-08-25

## 🎯 再編成作業完了サマリー

### 作業概要
- **開始時刻**: 2025-08-25
- **作業内容**: ACTIVE-ROUTINESディレクトリの使用頻度別4階層整理
- **ファイル数**: 161個 → 161個（削除ゼロ、全ファイル保護）

### 新しいディレクトリ構造
```
ACTIVE-ROUTINES/
├── 📊 01_DAILY_USE/          # 毎日使用する重要ファイル
├── 📝 02_ACTIVE_CONTENTS/    # 現役コンテンツ（最新投稿・データベース）
├── 📚 03_REFERENCE/          # 参照資料（マニュアル・分析・テンプレート）
└── 📦 04_ARCHIVE/           # 過去バージョン保管庫
```

## 🔄 識別された日常ルーティーン（4つのメイン業務）

### 1. フィード投稿生成
- **起点**: `01_DAILY_USE/feed-posts/START-PROMPT.md`
- **対象**: Type001-004の投稿タイプ
- **活用**: 161ナレッジベース

#### フィード投稿生成ドキュメントフロー

🚀 **起点**
- `01_DAILY_USE/feed-posts/START-PROMPT.md`

📋 **Step 1: 基本データ参照**
1. **対象ナレッジJSON**
   - `app/data/knowledgeBase/knowledge/type00[X]/[ナレッジID].json`
2. **ターゲット関係性データ**
   - `app/data/knowledgeBase/type-target-persona-relations.json`

📋 **Step 2: Type別チェックリスト（重要）**
- **Type001**: `knowledge-quality-system/quality-checklists/type001/TYPE001-MASTER-CHECKLIST.md`
- **Type002**: `knowledge-quality-system/quality-checklists/type002/T010-checklist.md`
- **Type003**: `knowledge-quality-system/quality-checklists/type003/TYPE003-MASTER-CHECKLIST.md`
- **Type004**: `knowledge-quality-system/quality-checklists/type004/TYPE004-MASTER-CHECKLIST.md`

📋 **Step 3: キャラクター戦略**
- `knowledge-quality-system/character-strategies/CHARACTER-STRATEGY-MASTER-GUIDE.md`

📋 **Step 4: 品質基準**
- `knowledge-quality-system/core-system/master-standards/template-placement-ultimate-master.md`
- `knowledge-quality-system/core-system/master-standards/T007-ultimate-standard.md` (女性・99%品質)
- `knowledge-quality-system/core-system/master-standards/T010-male-ultimate-standard.md` (男性・95%品質)

📋 **Step 5: Type004専用（該当時）**
- `knowledge-quality-system/type004-system/core-documents/type004-task-tool-matching-final.md`

📋 **Step 6: 最終仕上げ**
- `knowledge-quality-system/character-strategies/FOOTER-TEXT-TEMPLATES.md`
- `knowledge-quality-system/character-strategies/FINAL-MESSAGE-TEMPLATES.md`

### 2. リール投稿作成
- **キャラクター**: King/Misaki/Ten/Iida（4キャラクター）
- **プロンプト**: `01_DAILY_USE/reel-master-prompts/`
- **現役投稿**: King5件、Misaki6件、Ten4件、Iida5件

#### リール投稿作成ドキュメントフロー

🚀 **起点**
- `01_DAILY_USE/reel-master-prompts/リール投稿作成_起動術式.md`

📋 **Step 1: マスタープロンプト参照**
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/13_マスタープロンプト_2025-08-23.md`

📋 **Step 2: STEP別マニュアル参照（段階的実行）**
**STEP1 (コア要素作成)**
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/01_テーマ選定マニュアル_2025-08-23.md`
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/02_ターゲット作成マニュアル_2025-08-22.md`
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/03_フック作成マニュアル_2025-08-22.md`

**STEP2 (内容構造作成)**
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/04_INDEX作成マニュアル_2025-08-23.md`
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/05_感情の動きマニュアル_2025-08-22.md`
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/06_問題原因分析マニュアル_2025-08-23.md`
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/07_共感後の希望作成マニュアル_2025-08-22.md`
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/08_改善策設計マニュアル_2025-08-23.md`
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/09_CTA作成マニュアル_2025-08-23.md`

**STEP3 (キャプション・ハッシュタグ)**
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/10_キャプション・ハッシュタグ生成マニュアル_2025-08-23.md`

**STEP4 (品質チェック)**
- `04_REFERENCE/manuals/コンテンツ作成マニュアル/00_完璧チェックリスト_満点品質保証システム_2025-08-23.md`

📋 **Step 3: 現役コンテンツ参考・保存**
- `02_ACTIVE_CONTENTS/king-posts/` (5投稿 + king_INDEX.md)
- `02_ACTIVE_CONTENTS/misaki-posts/` (6投稿 + misaki_INDEX.md)
- `02_ACTIVE_CONTENTS/ten-posts/` (4投稿 + ten_INDEX.md)
- `02_ACTIVE_CONTENTS/iida-posts/` (5投稿 + iida_INDEX.md)

### 3. ストーリーズクイズ生成
- **スキルアップ**: `01_DAILY_USE/quiz-generation/スキルアップクイズ作成_起動術式.md`
- **ビジネスマナー**: `01_DAILY_USE/quiz-generation/ビジネスマナークイズ作成_起動術式.md`
- **就職活動**: `01_DAILY_USE/quiz-generation/就職活動クイズ作成_起動術式.md`
- **キャリア**: `01_DAILY_USE/quiz-generation/キャリアクイズ作成_起動術式.md`
- **マスタープロンプト**: `04_REFERENCE/ストーリーズクイズ作成_マスタープロンプト.md`
- **品質ガイド**: `04_REFERENCE/クイズ品質共通マスターガイド.md`
- **キャリア専用**: `04_REFERENCE/キャリア系クイズ作成ガイドライン.md`
- **スキルアップ完成例**: `02_ACTIVE_CONTENTS/quiz-database/skillup-quiz-100.md`
- **ビジネスマナー完成例**: `02_ACTIVE_CONTENTS/quiz-database/business-manner-quiz-100.md`
- **就職活動完成例**: `02_ACTIVE_CONTENTS/quiz-database/jobhunting-quiz-100.md`
- **キャリア完成例**: `02_ACTIVE_CONTENTS/quiz-database/career-quiz-100.md`

### 4. 習慣ランキング作成
- **システム概要**: `01_DAILY_USE/habit-ranking/README.md`
- **マスタープラン**: `01_DAILY_USE/habit-ranking/習慣行動ランキングシステム完全マスタープラン.md`
- **データベース**: `01_DAILY_USE/habit-ranking/habit-behavior-database.json` (35習慣)
- **構築プロンプト**: `01_DAILY_USE/habit-ranking/データベース初期構築プロンプト.md`
- **完全版構築**: `01_DAILY_USE/habit-ranking/完全版_仕事ができる人の習慣データベース構築プロンプト.md`
- **リサーチプロンプト**: `01_DAILY_USE/habit-ranking/究極リサーチプロンプト_1000%限界超え版.md`
- **完成品DB**: `02_ACTIVE_CONTENTS/kikuyo-rankings/` (31ファイル、28ランキング+3分析)

## 📝 重要な修正事項

### INDEXファイルの再配置
- **判断ミス**: 初期にold-indexesに移動
- **修正**: 全INDEXファイルを02_ACTIVE_CONTENTSに再配置
  - `king_INDEX.md` → `02_ACTIVE_CONTENTS/king-posts/`
  - `misaki_INDEX.md` → `02_ACTIVE_CONTENTS/misaki-posts/`
  - `ten_INDEX.md` → `02_ACTIVE_CONTENTS/ten-posts/`
  - `iida_INDEX.md` → `02_ACTIVE_CONTENTS/iida-posts/`

## 🎯 次のフェーズ: より使いやすくする改善

### 現在の検討事項
- 4つのメインルーティーンの使いやすさ向上
- 日々の管理業務の効率化
- アクセス性の改善

### 保護ルール確認
1. **削除厳禁**: 全ファイルが唯一のコピー
2. **移動のみ**: 不要になったら04_ARCHIVE/へ
3. **命名維持**: 日付ベースファイル名は変更禁止
4. **順次更新**: 古いものはアーカイブ、新しいものを追加

## 📊 各ディレクトリの役割

### 01_DAILY_USE（毎日使用）
- システムマスター・起動コマンド
- 最新マスタープロンプト集
- クイズ生成フロー・習慣データベース

### 02_ACTIVE_CONTENTS（現役コンテンツ）
- 各キャラクター最新投稿 + INDEXファイル
- KIKUYO習慣ランキング28個
- 現役クイズ400問

### 03_REFERENCE（参照資料）
- 13個の詳細作成マニュアル
- キャラクター別分析レポート
- タイトル100選・テンプレート集

### 04_ARCHIVE（保管庫）
- 過去の投稿・プロンプト
- 引き継ぎ書・開発履歴
- バージョン管理

---

**次世代Claude Code**: このメモを参照して、さらなる使いやすさ改善に取り組んでください。