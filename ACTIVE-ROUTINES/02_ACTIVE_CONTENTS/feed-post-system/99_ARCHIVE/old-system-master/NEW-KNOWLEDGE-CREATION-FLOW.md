# 🚀 新規ナレッジ作成フロー マスターガイド

**作成日**: 2025-08-28  
**目的**: 新規Kxxxナレッジ作成の完全手順書  
**対象**: 既存ナレッジ改善ではない、完全新規作成

---

## 📋 **新規作成フロー概要**

### **前提条件**
- 既存ナレッジJSONファイルは存在しない
- 人間による投稿内容企画・Type判定が必要
- 全工程手動実行（AI自動判定なし）

### **完成目標**
- 新しいKxxxナレッジJSONファイル作成
- 該当Typeの品質基準100%達成
- フィード投稿システムでの正常動作確認

---

## 🔄 **Step-by-Step 作成フロー**

### **Phase 1: 事前準備・分析（人間作業）**

#### **Step 1-1: 投稿内容企画**
```
投稿テーマ例: 「職場で孤立感を感じる人への共感とアドバイス」

分析要素:
- 誰に向けた投稿か？（ターゲット）
- どんな悩み・課題を扱うか？
- どんな価値を提供するか？
- 感情的 or 論理的アプローチか？
```

#### **Step 1-2: Type判定（最重要）**
```
判定基準:
Type001: 感情共感・心理的サポート・女性ターゲット
Type002: スキル習得・実践指導・男性ターゲット  
Type003: データ・情報整理・業界企業情報
Type004: 効率化・時短・実証テクニック

例: 「職場孤立感」→ 感情共感が必要 → Type001
```

#### **Step 1-3: 次番号確認**
```
最新番号確認:
Type001: app/data/knowledgeBase/knowledge/type001/ → 最新番号+1
Type002: app/data/knowledgeBase/knowledge/type002/ → 最新番号+1
Type003: app/data/knowledgeBase/knowledge/type003/ → 最新番号+1  
Type004: app/data/knowledgeBase/knowledge/type004/ → 最新番号+1

例: Type001最新がK1009 → 新規はK1010
```

### **Phase 2: Type別チェックリスト事前確認**

#### **Step 2-1: 該当チェックリスト参照**
```
Type001: feed-post-system/01_QUALITY_CONTROL/type001/TYPE001-MASTER-CHECKLIST.md（105項目）
Type002: feed-post-system/01_QUALITY_CONTROL/type002/T010-checklist.md（140項目）
Type003: feed-post-system/01_QUALITY_CONTROL/type003/TYPE003-MASTER-CHECKLIST.md（105項目）
Type004: feed-post-system/01_QUALITY_CONTROL/type004/TYPE004-MASTER-CHECKLIST.md（122項目）
```

#### **Step 2-2: 必須要件確認**
```
Type001例:
□ 感情共感→安心→希望の3段階フロー
□ Section-Blocks構造（2セクション固定）
□ 女性キャラクター必須
□ 感情的語り口調
□ 体験談・エピソード含有
```

### **Phase 3: キャラクター戦略決定**

#### **Step 3-1: キャラクター選択**
```
参照: feed-post-system/02_CHARACTER_STRATEGIES/CHARACTER-STRATEGY-MASTER-GUIDE.md

Type001 → Misaki（女性・共感・癒し系）絶対必須
Type002 → King（男性・論理・実践系）優先
Type003 → データ重視（キャラクター柔軟）
Type004 → Ten（効率・生産性重視）優先
```

#### **Step 3-2: メッセージ調確認**
```
Misaki: 共感的・温かい・「〜ですよね」「〜だと思います」
King: 論理的・実践的・「〜である」「〜すべきだ」
Ten: 効率重視・簡潔・「〜が最適」「〜で時短」
```

### **Phase 4: 専門システムガイドライン参照**

#### **Step 4-1: Type別専門ガイド確認**
```
Type001: feed-post-system/04_SPECIALIZED_SYSTEMS/type001-female/type001-design-guidelines.md
Type002: feed-post-system/04_SPECIALIZED_SYSTEMS/type002-male/T010-checklist.md
Type003: feed-post-system/04_SPECIALIZED_SYSTEMS/type003-ranking/ (企業ランキング関連)
Type004: feed-post-system/04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-task-tool-matching-final.md
```

#### **Step 4-2: 構造パターン確認**
```
Type001: Section-Blocks（2セクション）+ 感情フロー
Type002: 8ステップ思考プロセス + 具体実装重視
Type003: 8ページ構成 + データベース整合性
Type004: 5要件充足（普遍性・実用性・簡潔性・実証性・継続性）
```

### **Phase 5: JSON構造作成**

#### **Step 5-1: 基本構造作成**
```json
{
  "knowledgeId": "K1010",
  "postType": "001",
  "actualTitle": "[投稿タイトル]",
  "problemDescription": "[解決する問題]",
  "marketingStage": "[ターゲットの学習レベル]",
  "solutionContent": {
    "primarySolution": "[主要解決策]",
    "supportingSolutions": ["[サポート解決策1]", "[サポート解決策2]"]
  },
  "detailedContent": {
    "page1": {
      "role": "[ページの役割]",
      "section": "[セクション名]",
      "content": { /* テンプレート構造 */ }
    }
  },
  "searchKeywords": ["[キーワード1]", "[キーワード2]"],
  "contentPageCount": 3,
  "targetIds": ["[ターゲットID]"]
}
```

#### **Step 5-2: Type別必須フィールド追加**
```
Type001: characterStrategy, emotionalFlow, sectionBlocks
Type002: skillLevel, practicalSteps, implementationGuide  
Type003: dataSource, rankingCriteria, industryAnalysis
Type004: evidenceData, efficiencyMetrics, toolsRequired
```

### **Phase 6: 品質チェック・完成**

#### **Step 6-1: チェックリスト全項目確認**
```
該当Typeのチェックリスト全項目を✅
- Type001: 105項目全てチェック
- Type002: 140項目全てチェック
- Type003: 105項目全てチェック
- Type004: 122項目全てチェック
```

#### **Step 6-2: ファイル保存**
```
保存先: 
/app/data/knowledgeBase/knowledge/type00[X]/K[番号].json

例: /app/data/knowledgeBase/knowledge/type001/K1010.json
```

#### **Step 6-3: 動作確認**
```
起動術式で確認:
【ナレッジ改善実行】
対象: K1010
実行してください。

→ 正常にType001フローが動作することを確認
```

---

## 🚨 **重要な注意事項**

### **絶対禁止事項**
- ❌ Type判定の推測・憶測
- ❌ チェックリスト項目の省略・スキップ
- ❌ キャラクター性別不一致（Type001で男性キャラ等）
- ❌ JSON構造の不正・不完全

### **品質保証必須事項**  
- ✅ 該当Typeチェックリスト100%完了
- ✅ キャラクター戦略完全一致
- ✅ JSON構造完全準拠
- ✅ 情報欠損率0%

### **作成者必要スキル**
- Type001-004の特徴完全理解
- ターゲット分析・判定能力
- JSON構造作成技術
- 品質チェック実行能力

---

## 💡 **作成例: Type001新規ナレッジ**

### **企画段階**
```
テーマ: 「職場で理不尽な扱いを受けた時の心の持ち方」
ターゲット: 20-30代働く女性
アプローチ: 感情共感→安心感→希望提示
Type判定: Type001（感情共感型）
ナレッジID: K1010
キャラクター: Misaki
```

### **構造設計**
```
Page1: basic_intro（問題提示・共感）
Page2: section_blocks（具体例2セクション）  
Page3: achievement_summary（解決策・希望）

感情フロー: 共感→理解→安心→行動→希望
```

### **品質確認**
```
□ TYPE001-MASTER-CHECKLIST.md 105項目全て✅
□ 女性キャラクター（Misaki）確認
□ Section-Blocks 2セクション構造確認
□ 感情フロー3段階確認
□ 情報欠損なし確認
```

**この手順により、システム品質を保持した新規ナレッジの作成が可能になります。**