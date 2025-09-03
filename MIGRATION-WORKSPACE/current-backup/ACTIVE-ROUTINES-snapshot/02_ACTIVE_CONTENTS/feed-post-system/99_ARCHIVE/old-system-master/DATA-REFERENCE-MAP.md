# フィード投稿システム データ参照マップ

**作成日**: 2025-08-28  
**目的**: ドキュメントとJSONデータの参照関係を明確化

## 🎯 システム構成

### データ実体位置（移動しない）
```
app/data/knowledgeBase/knowledge/
├── type001/ - 感情共感型（32ファイル）
│   ├── K001.json, K007.json, K008.json...
├── type002/ - 実践習得型（67ファイル）  
│   ├── K002.json, K003.json, K004.json...
├── type003/ - ランキング情報型（19ファイル）
│   ├── K018.json, K024.json, K026.json...
└── type004/ - 効率アップテクニック（55ファイル）
    ├── K009.json, K012.json, K021.json...
```

### 管理ドキュメント位置（整理後）
```
ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/
├── 00_SYSTEM_MASTER/           # 統合管理
├── 01_QUALITY_CONTROL/         # 品質管理
├── 02_CHARACTER_STRATEGIES/    # キャラクター戦略
├── 03_TEMPLATE_STANDARDS/      # テンプレート基準
├── 04_SPECIALIZED_SYSTEMS/     # Type別専門システム
└── 05_ARCHIVE/                 # アーカイブ
```

## 🔗 参照関係マッピング

### Type001 感情共感型
**データ実体**: `../../../../app/data/knowledgeBase/knowledge/type001/*.json`  
**管理ドキュメント**:
- `01_QUALITY_CONTROL/type001/TYPE001-MASTER-CHECKLIST.md` (105項目)
- `04_SPECIALIZED_SYSTEMS/type001-female/type001-design-guidelines.md`
- `04_SPECIALIZED_SYSTEMS/type001-female/type001-section-blocks-design-guidelines.md`
- `04_SPECIALIZED_SYSTEMS/type001-female/type002-female-guidelines.md`

### Type002 実践習得型
**データ実体**: `../../../../app/data/knowledgeBase/knowledge/type002/*.json`  
**管理ドキュメント**:
- `01_QUALITY_CONTROL/type002/T010-checklist.md` (140項目)
- `04_SPECIALIZED_SYSTEMS/type002-male/T010-checklist.md`
- `04_SPECIALIZED_SYSTEMS/type002-male/T011-checklist.md`
- `04_SPECIALIZED_SYSTEMS/type002-male/T012-checklist.md`

### Type003 ランキング情報型
**データ実体**: `../../../../app/data/knowledgeBase/knowledge/type003/*.json`  
**管理ドキュメント**:
- `01_QUALITY_CONTROL/type003/TYPE003-MASTER-CHECKLIST.md` (105項目)
- `04_SPECIALIZED_SYSTEMS/type003-ranking/Type003企業ランキングコンテンツマスタードキュメント.md`
- `04_SPECIALIZED_SYSTEMS/type003-ranking/result/企業情報データベース2025.md`
- `04_SPECIALIZED_SYSTEMS/type003-ranking/result/女性人気副業データベース2025.md`
- `04_SPECIALIZED_SYSTEMS/type003-ranking/企業ランキングナレッジ生成プロンプト.md`
- `04_SPECIALIZED_SYSTEMS/type003-ranking/副業ランキング生成システム完全マスタードキュメント.md`

### Type004 効率アップテクニック
**データ実体**: `../../../../app/data/knowledgeBase/knowledge/type004/*.json`  
**管理ドキュメント**:
- `01_QUALITY_CONTROL/type004/TYPE004-MASTER-CHECKLIST.md` (122項目)
- `04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-evidence-based-flow-complete.md`
- `04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-evidence-based-design-requirements.md`
- `04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-practical-pattern-design-guide.md`
- `04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-japanese-daily-tasks-summary.md`
- `04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-task-tool-matching-final.md`

## 🚀 DAILY_USEからの参照パス

### 起動術式からの相対パス
```
ACTIVE-ROUTINES/01_DAILY_USE/feed-posts/フィード投稿ナレッジ作成_起動術式.md

参照先: ../02_ACTIVE_CONTENTS/feed-post-system/00_SYSTEM_MASTER/START-PROMPT.md
```

### 品質チェック時の参照パス
```
Type001: ../02_ACTIVE_CONTENTS/feed-post-system/01_QUALITY_CONTROL/type001/
Type002: ../02_ACTIVE_CONTENTS/feed-post-system/01_QUALITY_CONTROL/type002/
Type003: ../02_ACTIVE_CONTENTS/feed-post-system/01_QUALITY_CONTROL/type003/
Type004: ../02_ACTIVE_CONTENTS/feed-post-system/01_QUALITY_CONTROL/type004/
```

## 📋 統合テンプレートJSON参照

### アプリケーションが使用するJSON（移動しない）
```
app/services/knowledgeBase/data/pageStructures/unified/
├── unified-template-08-section-blocks.json ⭐
├── unified-template-11-company-ranking.json ⭐
├── unified-template-12-company-spotlight.json ⭐
└── unified-template-13-step-by-step.json ⭐
```

### マスターデータ（移動しない）
```
app/data/knowledgeBase/type-target-persona-relations.json ⭐
```

---

## 🔄 更新時の注意事項

1. **データ実体は移動しない**: `app/`配下のJSONファイルはアプリケーションが直接参照
2. **相対パス統一**: 全てのドキュメント参照は相対パスで記載
3. **参照整合性確認**: 移動後は全ての参照パスが正しく動作するか確認必要
4. **バックアップ必須**: 移動前に現在の構造を完全バックアップ

## 📞 クイックアクセス

- [システムインデックス](./FEED-POST-SYSTEM-INDEX.md)
- [クイックアクセスコマンド](./QUICK-ACCESS-COMMANDS.md)
- [起動プロンプト](./START-PROMPT.md)