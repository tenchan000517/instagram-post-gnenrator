# フィード投稿システム 統合インデックス

**作成日**: 2025-08-28  
**バージョン**: v1.0  
**システム範囲**: フィード投稿関連の全62ファイル管理

## 🎯 システム概要

### アーキテクチャ
- **データ実体**: `app/data/knowledgeBase/` (移動しない - アプリケーション直接参照)
- **管理ドキュメント**: 本ディレクトリ (整理済み - 運用・品質管理)
- **統合方式**: 2層構造（実行層 + 管理層）

### 処理フロー
```
ユーザー入力 → ナレッジマッチング → 品質チェック → テンプレート生成 → UI表示
```

## 📁 ディレクトリ構成

### 🔥 00_SYSTEM_MASTER
**役割**: システム全体の統合管理・起動制御
```
├── FEED-POST-SYSTEM-INDEX.md      ⭐ 本ファイル
├── DATA-REFERENCE-MAP.md          ⭐ データ参照関係
├── START-PROMPT.md                ⭐ 起動コマンド（既存ナレッジ改善用）
├── NEW-KNOWLEDGE-CREATION-FLOW.md ⭐ 新規ナレッジ作成フロー
└── QUICK-ACCESS-COMMANDS.md       ⭐ クイックアクセス（作成予定）
```

### 🔥 01_QUALITY_CONTROL  
**役割**: Type別品質管理・チェックリスト管理
```
├── type001/                       # 感情共感型 (105項目)
│   └── TYPE001-MASTER-CHECKLIST.md
├── type002/                       # 実践習得型 (140項目)
│   └── T010-checklist.md
├── type003/                       # ランキング情報型 (105項目)  
│   └── TYPE003-MASTER-CHECKLIST.md
└── type004/                       # 効率アップテクニック (122項目)
    └── TYPE004-MASTER-CHECKLIST.md
```

### 🔥 02_CHARACTER_STRATEGIES
**役割**: キャラクター戦略・メッセージテンプレート管理
```
├── CHARACTER-STRATEGY-MASTER-GUIDE.md  # キャラクター選択基準
├── FOOTER-TEXT-TEMPLATES.md            # フッターテンプレート
└── FINAL-MESSAGE-TEMPLATES.md          # 最終メッセージテンプレート
```

### 🔥 03_TEMPLATE_STANDARDS
**役割**: テンプレート基準・配置マスター管理
```
├── template-placement-ultimate-master.md  # テンプレート配置マスター
├── T007-ultimate-standard.md             # T007完全版基準（99%品質）
└── T010-male-ultimate-standard.md        # T010男性版基準（95%品質）
```

### 🔥 04_SPECIALIZED_SYSTEMS
**役割**: Type別専門システム・詳細ガイドライン
```
├── type001-female/                # 感情共感型（女性ターゲット）
│   ├── type001-design-guidelines.md
│   ├── type001-section-blocks-design-guidelines.md
│   └── type002-female-guidelines.md
├── type002-male/                  # 実践習得型（男性ターゲット）
│   ├── T010-checklist.md
│   ├── T011-checklist.md
│   └── T012-checklist.md
├── type003-ranking/               # ランキング情報型
│   ├── Type003企業ランキングコンテンツマスタードキュメント.md
│   ├── 企業ランキングナレッジ生成プロンプト.md
│   ├── 副業ランキング生成システム完全マスタードキュメント.md
│   └── result/
│       ├── 企業情報データベース2025.md
│       └── 女性人気副業データベース2025.md
└── type004-efficiency/            # 効率アップテクニック
    ├── type004-evidence-based-flow-complete.md
    ├── type004-evidence-based-design-requirements.md
    ├── type004-practical-pattern-design-guide.md
    ├── type004-japanese-daily-tasks-summary.md
    └── type004-task-tool-matching-final.md
```

### 🔥 05_ARCHIVE
**役割**: 今後使用予定のアーカイブ領域
```
# 今後の整理で使用予定
```

## 🚀 クイックアクセス

### Type別アクセス
- **[Type001 感情共感型](../04_SPECIALIZED_SYSTEMS/type001-female/)**
  - 対象: 女性・キャリア悩み解決
  - チェック: [105項目](../01_QUALITY_CONTROL/type001/TYPE001-MASTER-CHECKLIST.md)
  - 基準: 99%品質 ([T007](../03_TEMPLATE_STANDARDS/T007-ultimate-standard.md))

- **[Type002 実践習得型](../04_SPECIALIZED_SYSTEMS/type002-male/)**  
  - 対象: 男性・スキルアップガイド
  - チェック: [140項目](../01_QUALITY_CONTROL/type002/T010-checklist.md)
  - 基準: 95%品質 ([T010](../03_TEMPLATE_STANDARDS/T010-male-ultimate-standard.md))

- **[Type003 ランキング情報型](../04_SPECIALIZED_SYSTEMS/type003-ranking/)**
  - 対象: 業界・企業情報まとめ
  - チェック: [105項目](../01_QUALITY_CONTROL/type003/TYPE003-MASTER-CHECKLIST.md)  
  - データ: [企業DB](../04_SPECIALIZED_SYSTEMS/type003-ranking/result/企業情報データベース2025.md)

- **[Type004 効率アップテクニック](../04_SPECIALIZED_SYSTEMS/type004-efficiency/)**
  - 対象: 時短・効率化テクニック
  - チェック: [122項目](../01_QUALITY_CONTROL/type004/TYPE004-MASTER-CHECKLIST.md)
  - 実証: [マッチング結果](../04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-task-tool-matching-final.md)

### 起動・運用
- **[既存ナレッジ改善](./START-PROMPT.md)** - 基本実行コマンド（既存K***改善用）
- **[新規ナレッジ作成](./NEW-KNOWLEDGE-CREATION-FLOW.md)** - 新規K***作成フロー ⭐
- **[データ参照マップ](./DATA-REFERENCE-MAP.md)** - 参照関係一覧
- **[DAILY_USE起動術式](../../../../01_DAILY_USE/feed-posts/フィード投稿ナレッジ作成_起動術式.md)** - 毎日使用

### キャラクター・テンプレート
- **[キャラクター戦略](../02_CHARACTER_STRATEGIES/CHARACTER-STRATEGY-MASTER-GUIDE.md)** - 選択基準
- **[テンプレート配置マスター](../03_TEMPLATE_STANDARDS/template-placement-ultimate-master.md)** - 配置最適化

## 📊 システム統計

### ファイル分布
- **品質管理**: 4ファイル（Type別チェックリスト）
- **キャラクター戦略**: 3ファイル（戦略・テンプレート）  
- **テンプレート基準**: 3ファイル（配置・品質基準）
- **専門システム**: 20ファイル（Type別詳細ガイド）
- **システムマスター**: 4ファイル（統合管理）

### 品質保証レベル
- **Type001**: 105項目チェック → 99%品質保証
- **Type002**: 140項目チェック → 95%品質保証  
- **Type003**: 105項目チェック → データ完璧性確保
- **Type004**: 122項目チェック → 実証性100%達成

## 🔄 運用フロー

### 日常運用
1. [DAILY_USE起動術式](../../../../01_DAILY_USE/feed-posts/) でシステム起動
2. Type判定 → 該当する品質チェックリスト適用
3. キャラクター戦略に基づくキャラクター選択
4. テンプレート配置マスターで最適化
5. 完全改善版JSON出力

### システム保守
- データ参照マップの整合性確認
- 品質チェックリストの項目追加・修正
- Type別専門システムの拡張・改善

---

## 🎯 重要事項

### 禁止行為
- ❌ `app/data/knowledgeBase/` 配下の移動・変更
- ❌ 推測・憶測での品質チェック
- ❌ ターゲット性別不一致
- ❌ 禁止表現使用

### 品質保証  
- ✅ 全Type別チェックリスト完了率100%
- ✅ キャラクター性別一致率100%
- ✅ 情報欠損率0%
- ✅ 構造品質完璧設定率100%

**このシステムにより、高品質なフィード投稿コンテンツの安定生成が実現されています。**