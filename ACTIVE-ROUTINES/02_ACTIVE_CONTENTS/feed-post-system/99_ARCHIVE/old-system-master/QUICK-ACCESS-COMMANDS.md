# ⚡ フィード投稿システム クイックアクセス

**作成日**: 2025-08-28  
**目的**: よく使用するコマンド・ファイルへの高速アクセス

---

## 🚀 **基本起動コマンド**

### **既存ナレッジ改善（最も使用頻度高）**
```bash
# 起動術式ファイル表示
cat "ACTIVE-ROUTINES/01_DAILY_USE/feed-posts/フィード投稿ナレッジ作成_起動術式.md"

# START-PROMPT直接表示
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/00_SYSTEM_MASTER/START-PROMPT.md"
```

### **新規ナレッジ作成（新機能）**
```bash
# 新規作成フロー表示
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/00_SYSTEM_MASTER/NEW-KNOWLEDGE-CREATION-FLOW.md"
```

---

## 📋 **Type別チェックリスト高速アクセス**

### **Type001（感情共感型）- 105項目**
```bash
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/01_QUALITY_CONTROL/type001/TYPE001-MASTER-CHECKLIST.md"
```

### **Type002（実践習得型）- 140項目**  
```bash
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/01_QUALITY_CONTROL/type002/T010-checklist.md"
```

### **Type003（ランキング情報型）- 105項目**
```bash
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/01_QUALITY_CONTROL/type003/TYPE003-MASTER-CHECKLIST.md"
```

### **Type004（効率アップテクニック）- 122項目**
```bash
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/01_QUALITY_CONTROL/type004/TYPE004-MASTER-CHECKLIST.md"
```

---

## 🎭 **キャラクター戦略・テンプレート**

### **キャラクター選択基準**
```bash
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/02_CHARACTER_STRATEGIES/CHARACTER-STRATEGY-MASTER-GUIDE.md"
```

### **テンプレート配置マスター**
```bash
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/03_TEMPLATE_STANDARDS/template-placement-ultimate-master.md"
```

### **品質基準**
```bash
# T007（女性99%品質）
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/03_TEMPLATE_STANDARDS/T007-ultimate-standard.md"

# T010（男性95%品質）  
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/03_TEMPLATE_STANDARDS/T010-male-ultimate-standard.md"
```

---

## 🔧 **Type別専門システム**

### **Type001 専門ガイド**
```bash
# 設計ガイドライン
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type001-female/type001-design-guidelines.md"

# Section-Blocks専用  
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type001-female/type001-section-blocks-design-guidelines.md"
```

### **Type002 専門ガイド**
```bash
# T010専用140項目チェック
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type002-male/T010-checklist.md"
```

### **Type004 専門ガイド**
```bash
# 最終マッチング結果
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-task-tool-matching-final.md"

# 実証型フロー
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-evidence-based-flow-complete.md"
```

---

## 📊 **システム管理・参照**

### **システム全体把握**
```bash  
# システムインデックス
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/00_SYSTEM_MASTER/FEED-POST-SYSTEM-INDEX.md"

# データ参照マップ
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/00_SYSTEM_MASTER/DATA-REFERENCE-MAP.md"
```

### **ナレッジベースデータ確認**
```bash
# ターゲット関係性データ
cat "app/data/knowledgeBase/type-target-persona-relations.json"

# 最新ナレッジ確認
ls -la "app/data/knowledgeBase/knowledge/type001/" | tail -5
ls -la "app/data/knowledgeBase/knowledge/type002/" | tail -5  
ls -la "app/data/knowledgeBase/knowledge/type003/" | tail -5
ls -la "app/data/knowledgeBase/knowledge/type004/" | tail -5
```

---

## 🎯 **よく使用するワンライナー**

### **特定ナレッジ確認**
```bash
# K001確認例
cat "app/data/knowledgeBase/knowledge/type001/K001.json" | head -20

# Type002最新確認
ls "app/data/knowledgeBase/knowledge/type002/" | sort -V | tail -1
```

### **システム起動（ワンコマンド）**
```bash
# 既存改善モード
echo "【ナレッジ改善実行】\n\n対象: [ナレッジID]\n\n以下の手順で統合品質管理システムを実行:"

# 新規作成モード  
echo "【新規ナレッジ作成】\n\nType判定: [001/002/003/004]\n投稿内容: [詳細内容]\n\n新規作成フローを実行:"
```

---

## 📱 **緊急時・トラブル対応**

### **参照パス確認**
```bash
# DAILY_USEからの参照パス確認
grep -r "feed-post-system" "ACTIVE-ROUTINES/01_DAILY_USE/feed-posts/"

# システム整合性確認
find "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/" -name "*.md" | wc -l
```

### **バックアップ・復旧**
```bash
# システム全体バックアップ
cp -r "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/" "backup-feed-post-system-$(date +%Y%m%d)"

# 重要ファイル個別バックアップ
cp "ACTIVE-ROUTINES/01_DAILY_USE/feed-posts/フィード投稿ナレッジ作成_起動術式.md" "backup-startup-$(date +%Y%m%d).md"
```

---

## 💡 **効率化 Tips**

### **エイリアス設定例**
```bash
# ~/.bashrc または ~/.zshrc に追加
alias feed-start='cat "ACTIVE-ROUTINES/01_DAILY_USE/feed-posts/フィード投稿ナレッジ作成_起動術式.md"'
alias feed-new='cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/00_SYSTEM_MASTER/NEW-KNOWLEDGE-CREATION-FLOW.md"'  
alias feed-index='cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/00_SYSTEM_MASTER/FEED-POST-SYSTEM-INDEX.md"'
```

### **よく使用する組み合わせ**
```bash
# Type001作業セット
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/01_QUALITY_CONTROL/type001/TYPE001-MASTER-CHECKLIST.md" && \
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type001-female/type001-design-guidelines.md"

# 新規作成 → チェックリスト確認セット  
echo "新規作成フロー確認:" && \
cat "ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/00_SYSTEM_MASTER/NEW-KNOWLEDGE-CREATION-FLOW.md" | head -50
```

**これらのコマンドにより、フィード投稿システムの効率的な運用が可能になります。**