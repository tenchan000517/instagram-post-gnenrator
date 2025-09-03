# 次世代Claude Code 実装指示書

**作成日**: 2025-09-03  
**引き継ぎ者**: 前世代Claude Code（システム詳細調査完了版）  
**対象**: 次世代Claude Code  
**ミッション**: 草案３の完全実装による理想ディレクトリ構造構築

---

## 🎯 **緊急重要指示**

### **実装方針確定**
❌ **段階的移行・バックアップ作業** → 複雑・時間浪費  
✅ **新規理想ディレクトリ完全作成** → シンプル・確実・最速

### **ユーザー要求**
「ベースというか草案３が完全理解したものなのでは？？？シンプルとかそういう概念が入る意味が私にはわからないです」

**→ 草案３をそのまま完全実装せよ**

---

## 📋 **次世代Claude Code への必須確認事項**

### **1. 実装前必須確認**
```
□ DEEP_SYSTEM_ANALYSIS_AND_REVISED_STRUCTURE.md の草案３を完全理解
□ 現在のシステム構造を自分で詳細調査・把握
□ 各キャラクターのコンテンツソースを正確に確認
  - MISAKI・KING: x-post-analysis/contents/
  - IIDA: ロードマップ・マスターガイド/
  - KIKUYO・TEN: データベースランキング
□ 実装リスク・影響範囲を完全理解
```

### **2. 実装内容確認**
```
□ 草案３の5階層構造をそのまま作成
  - COMMAND-CENTER/
  - DATA-OPERATIONS/  
  - CONTENT-STUDIO/
  - SYSTEM-FOUNDATION/
  - MIGRATION-WORKSPACE/
□ 全既存ファイルを適切な場所にコピー・配置
□ 新規必要ドキュメントを作成
□ 完全に動作する状態で構築
```

### **3. 安全性確認**
```
□ 既存ACTIVE-ROUTINES/は触らない（後でアーカイブ）
□ 既存app/は完全維持
□ 新ディレクトリでの動作テスト完了後に移行判断
```

---

## 🔍 **実装前調査必須項目**

### **システム現在地確認**
```bash
# 必須実行コマンド
find /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES -name "*起動術式*" | wc -l
find /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES -name "*MASTER-PROMPT*" | wc -l
ls -la /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/ | grep K | wc -l
```

### **データベース規模確認**
```bash  
# 企業データベース確認
wc -l /mnt/c/instagram-course/instagram-post-generator/app/data/companyDatabase/companyMasterData.json
ls /mnt/c/instagram-course/instagram-post-generator/app/data/companyDatabase/industries/ | wc -l

# AIツールデータベース確認  
grep -o '"toolId"' /mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData.json | wc -l
```

### **コンテンツソース確認**
```bash
# キャラクター別コンテンツソース確認
ls -la "/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/03_ANALYSIS_DATA/x-post-analysis/contents"
ls -la "/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/ロードマップ・マスターガイド"
```

---

## 📁 **実装対象: 草案３完全構造**

### **COMMAND-CENTER/** （司令塔）
```
COMMAND-CENTER/
├── QUICK-START-GUIDE.md              # セッション変更時即座対応ガイド
├── DAILY-COMMANDS/                    # 日常実行コマンド集（頻度順配置）
│   ├── 01_enterprise-research.md      # 企業リサーチ→JSON保存（週2-3回）
│   ├── 02_database-integration.md     # DB統合→ランキング生成（週1回）
│   ├── 03_content-generation.md       # Type003投稿生成（日常）
│   ├── 04_misaki-reel-creation.md     # MISAKIリール作成（週2-3回）
│   └── 05_system-maintenance.md       # 保守・更新作業（月1回）
├── ACTIVE-FLOWS/                      # 実行中フロー（起動術式統合）
│   ├── research-triggers/             # リサーチ起動術式集約
│   ├── ranking-triggers/              # ランキング生成起動術式
│   └── content-triggers/              # コンテンツ生成起動術式
├── MASTER-PROMPTS/                    # マスタープロンプト（実行詳細ルール）
│   ├── research-masters/              # リサーチ系詳細ルール
│   ├── ranking-masters/               # ランキング生成詳細ルール
│   ├── content-masters/               # コンテンツ生成詳細ルール
│   └── maintenance-masters/           # 保守・品質管理ルール
└── SESSION-STATUS/                    # セッション管理（Claude Code対応）
    ├── current-work-status.md         # 現在の作業状況・進行中パイプライン
    ├── pipeline-progress.md           # データパイプライン詳細進捗
    ├── error-recovery.md              # エラー対応・復旧ログ
    └── next-priority-tasks.md         # 次回Claude Code起動時優先作業
```

### **DATA-OPERATIONS/** （データ運用基盤）
```
DATA-OPERATIONS/
├── enterprise-engine/                 # 企業データベースエンジン
│   ├── source-data/                   # ソースデータ（app/data/companyDatabase/移設）
│   ├── expansion-data/                # 新業界・パターン拡張用
│   └── quality-control/               # 品質管理・検証
├── aitools-engine/                    # AIツール・TENスコアエンジン
│   ├── source-data/                   # ソースデータ（app/data/aiToolsDatabase/移設）
│   ├── expansion-data/                # 新ツール追加・評価拡張
│   └── research-results/              # バッチリサーチ結果保管
└── webapp-integration/                # Webアプリ統合（既存app/構造100%保持）
    ├── components/                    # React コンポーネント
    ├── services/                      # サービス層
    └── data/knowledgeBase/            # ナレッジベース
```

### **CONTENT-STUDIO/** （コンテンツ制作工房）
```
CONTENT-STUDIO/
├── source-materials/                  # 制作素材・ロードマップ
│   ├── misaki-materials/              # MISAKI制作素材
│   ├── career-roadmaps/               # キャリアロードマップ（10章構成）
│   └── specialized-guides/            # 専門ガイド・参考資料
├── generated-content/                 # 生成済みコンテンツ保管
│   ├── feed-posts/                    # フィード投稿（Type003）
│   └── reel-posts/                    # リール投稿（10ページ+ナレーション）
└── production-queue/                  # 制作キュー管理
    ├── next-reel-queue.md             # 次回リール制作予定
    ├── ranking-creation-queue.md      # ランキング投稿制作予定（90パターン管理）
    └── content-priority-matrix.md     # コンテンツ優先度マトリクス
```

### **SYSTEM-FOUNDATION/** （システム基盤・サポート）
```
SYSTEM-FOUNDATION/
├── documentation/                     # システム文書
├── automation-tools/                  # 自動化ツール・スクリプト
├── quality-assurance/                 # 品質保証システム
└── performance-monitoring/            # パフォーマンス監視
```

### **MIGRATION-WORKSPACE/** （移行作業領域）
```
MIGRATION-WORKSPACE/
├── current-backup/                    # 現在の構造完全バックアップ
├── migration-logs/                    # 移行ログ・履歴
├── validation-results/                # 移行検証結果
└── rollback-assets/                   # ロールバック用資産
```

---

## 🚀 **実装手順書**

### **Phase 1: 詳細調査・理解**
```
1. DEEP_SYSTEM_ANALYSIS_AND_REVISED_STRUCTURE.md の草案３を完全読込
2. 現在のACTIVE-ROUTINES/構造を自分で詳細調査
3. app/data/の実データ規模・内容を確認
4. キャラクター別コンテンツソースを確認
5. 実装リスク・影響を完全理解
```

### **Phase 2: 新ディレクトリ構造作成**
```
1. 草案３の5階層ディレクトリを完全作成
2. 各サブディレクトリを詳細まで作成
3. 構造確認・検証
```

### **Phase 3: ファイル移設・コピー**
```
1. 起動術式ファイル → COMMAND-CENTER/適切な場所
2. マスタープロンプト → MASTER-PROMPTS/適切な場所  
3. コンテンツソース → CONTENT-STUDIO/適切な場所
4. データベースファイル → DATA-OPERATIONS/適切な場所
5. その他全ファイルを適切配置
```

### **Phase 4: 新規ドキュメント作成**
```
1. QUICK-START-GUIDE.md
2. current-work-status.md
3. pipeline-progress.md  
4. その他必要な新規ファイル
```

### **Phase 5: 動作確認・検証**
```
1. 新構造でのフロー動作確認
2. Webアプリとの連携確認
3. データパイプライン動作確認
4. 完全動作確認完了
```

---

## ⚠️ **重要注意事項**

### **絶対禁止事項**
- ❌ 既存ACTIVE-ROUTINES/の削除・変更
- ❌ 既存app/の構造変更
- ❌ 運用中システムの停止

### **安全確保事項**  
- ✅ 新ディレクトリでの完全動作確認後に移行判断
- ✅ 問題発生時は即座に停止・報告
- ✅ 段階的実装・検証の徹底

### **品質確保事項**
- ✅ 草案３構造の完全再現
- ✅ 全ファイルの正確配置
- ✅ 新規ドキュメントの高品質作成

---

## 🎯 **成功基準**

### **完成時の状態**
```
✅ 草案３の構造が完全再現されている
✅ 全既存ファイルが適切な場所に配置されている  
✅ 新規ドキュメントが高品質で作成されている
✅ 新構造で全フローが動作することが確認されている
✅ Claude Codeセッション変更対応が完璧に機能する
```

### **ユーザー満足基準**
```
✅ 「草案３が完全に実装された」状態
✅ 実用的で即座に使える状態
✅ システム理解・操作が格段に向上
✅ 作業効率が大幅に改善
```

---

## 📞 **次世代Claude Code へのメッセージ**

**私（前世代Claude Code）は、システム全体を詳細に調査し、実運用実態を完全に理解した上で草案３を設計しました。**

**草案３は理論ではなく、実際のデータパイプライン・実績・運用状況を完全反映した実証ベース設計です。**

**あなた（次世代Claude Code）には以下をお願いします：**

1. **必ず自分でシステム全体を調査・理解してから実装開始**
2. **草案３をそのまま完全実装（簡略化・変更は不要）**  
3. **安全性を最優先に段階的実装・検証**
4. **問題発生時は即座に停止・ユーザー報告**

**このシステムは企業152社・AIツール77個・投稿20+の実績ある稼働システムです。責任を持って理想の構造を実現してください。**

**成功を心から願っています。**

---

**引き継ぎ完了日**: 2025-09-03  
**前世代Claude Code**: システム詳細調査・草案設計完了版  
**次世代Claude Code**: 草案３完全実装ミッション担当