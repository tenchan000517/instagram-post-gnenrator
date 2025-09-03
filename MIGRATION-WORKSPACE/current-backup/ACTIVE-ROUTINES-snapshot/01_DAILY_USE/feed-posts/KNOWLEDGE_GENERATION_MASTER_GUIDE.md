# 各タイプ別ナレッジ生成マスターガイド

## 🎯 **概要**
各Type（Type001-004）のナレッジを生成するために参照すべきドキュメントと手順を明確に整理したマスターガイド。

---

## 📋 **Type001（感情共感型）- 女性ターゲット専用**

### **📍 必要ドキュメント**
1. **基準ドキュメント**:
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type001-female/type001-design-guidelines.md` - Type001設計原則
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type001-female/type001-section-blocks-design-guidelines.md` - Section-Blocks専用ガイド

2. **品質基準**:
   - `../02_ACTIVE_CONTENTS/feed-post-system/03_TEMPLATE_STANDARDS/T007-ultimate-standard.md` - 99%品質基準（女性ターゲット）
   - `../02_ACTIVE_CONTENTS/feed-post-system/01_QUALITY_CONTROL/type001/TYPE001-MASTER-CHECKLIST.md` - ターゲット別チェックリスト

3. **キャラクター戦略**:
   - `../02_ACTIVE_CONTENTS/feed-post-system/02_CHARACTER_STRATEGIES/CHARACTER-STRATEGY-MASTER-GUIDE.md` - キャラクター選択基準
   - 女性ターゲット→女性キャラクター（misaki/kikuyo）必須

4. **テンプレート構造**:
   - `app/services/knowledgeBase/data/pageStructures/unified/unified-template-08-section-blocks.json`

### **🔄 生成プロセス**
1. **コンセプト設計**: 感情共感→安心→希望の流れ構築
2. **プロット分析**: 「何を伝えたいか」「どういう構成か」を完全理解
3. **情報完全保持**: 価値ある情報の欠損禁止
4. **キャラクター適用**: ターゲット性別一致（女性→女性キャラ）
5. **品質チェック**: T007基準で99%品質確保

### **🎨 主要テンプレート**
- **unified-template-08-section-blocks** - Type001メインテンプレート
- セクション1: 具体的状況・行動（リスト形式）
- セクション2: 解決策・対処法・心構え

---

## 📋 **Type002（実践習得型）- 主に男性ターゲット**

### **📍 必要ドキュメント**
1. **品質基準**:
   - `../02_ACTIVE_CONTENTS/feed-post-system/03_TEMPLATE_STANDARDS/T010-male-ultimate-standard.md` - 95%品質基準（男性ターゲット）
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type002-male/T010-checklist.md` - T010専用140項目チェック
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type002-male/T011-checklist.md` - T011専用チェック
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type002-male/T012-checklist.md` - T012専用チェック

2. **参考基準**:
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type001-female/type002-female-guidelines.md` - Type002設計指針

3. **キャラクター戦略**:
   - 男性ターゲット→男性キャラクター（king/iida）推奨

4. **テンプレート構造**:
   - 複数テンプレート対応（section-blocks, dual-section等）

### **🔄 生成プロセス**
1. **8ステップ思考プロセス**: T010基準の詳細分析手法適用
2. **禁止表現排除**: 「戦略的」「効率的」「システマティック」等禁止
3. **具体的実装**: 抽象論ではなく具体的な手順・方法
4. **AI生成感排除**: 不自然なビジネス表現を自然な日本語に変換
5. **品質チェック**: 140項目完全チェック実施

### **🎯 対象ナレッジ**
T010: K004, K005, K010, K011, K028, K034, K039, K040, K042, K045, K048, K073, K075, K076, K077, K083, K090, K091, K103, K108, K110, K112, K117, K118, K132, K133, K134, K135, K137, K138, K139, K142, K143, K144, K145, K150, K152

---

## 📋 **Type003（ランキング情報型）- 就活・転職者向け**

### **📍 必要ドキュメント**
1. **マスタードキュメント**:
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type003-ranking/Type003企業ランキングコンテンツマスタードキュメント.md`

2. **データベース**:
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type003-ranking/result/企業情報データベース2025.md` - 企業データ完全版
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type003-ranking/result/女性人気副業データベース2025.md` - 副業データ

3. **生成システム**:
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type003-ranking/企業ランキングナレッジ生成プロンプト.md`
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type003-ranking/副業ランキング生成システム完全マスタードキュメント.md`

4. **テンプレート構造**:
   - `app/services/knowledgeBase/data/pageStructures/unified/unified-template-11-company-ranking.json`
   - `app/services/knowledgeBase/data/pageStructures/unified/unified-template-12-company-spotlight.json`

### **🔄 生成プロセス**
1. **データベース取得**: 最新企業情報・副業情報の取得
2. **ランキング基準設定**: 順位根拠の明示
3. **Tier分類**: S/A/B/Cランクでの企業分類
4. **8ページ構成**: basic_intro → ranking_display → company_detail(×5) → resource_summary
5. **数値データ信頼性**: 全データの出典・根拠明示

### **🎨 ページ構成パターン**
- Page1: basic_intro（導入）
- Page2: ranking_display（ランキング表）
- Page3-7: enhanced_company_detail（企業詳細・2社ずつ）
- Page8: resource_summary（まとめ）

---

## 📋 **Type004（効率アップテクニック）- 実証型アプローチ**

### **📍 必要ドキュメント**
1. **核心システム**:
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-evidence-based-flow-complete.md` - 実証型フロー報告書
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-evidence-based-design-requirements.md` - 設計要件・品質基準
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-practical-pattern-design-guide.md` - 実用性パターン設計

2. **データベース**:
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-japanese-daily-tasks-summary.md` - 日本人継続作業DB
   - `../02_ACTIVE_CONTENTS/feed-post-system/04_SPECIALIZED_SYSTEMS/type004-efficiency/type004-task-tool-matching-final.md` - 最終マッチング結果

3. **完成済み候補**:
   - **最優先**: デジタル情報疲れ解放システム（25点満点）
   - **最優先**: メール処理革命プロンプトフロー（24点）
   - **最優先**: 就活効率化AI分析システム（23点）
   - **高優先**: 食洗機ROI最適化ガイド（22点）
   - **高優先**: スマート清掃自動化システム（21点）

### **🔄 生成プロセス**
1. **実証基盤確認**: 統計データ・効果測定・ROI計算の確認
2. **5つの必須要件充足**: 普遍性・実用性・簡潔性・実証性・継続性
3. **システム構築設計**: 表面的ツール紹介ではなく根本的効率化
4. **実装手順明確化**: 5-7ステップの具体的手順
5. **効果測定**: 時間短縮率・投資対効果の数値化

### **📊 品質基準（5軸評価）**
- **普遍性**: 日本人85%以上が継続実施する作業
- **実用性**: 本当に時間短縮効果のある手法
- **簡潔性**: 5-7ステップで実装完了
- **実証性**: 実測可能な効果・統計データ基盤
- **継続性**: 一度設定で永続的効果

---

## 🚀 **共通生成プロセス**

### **Step 1: 事前準備**
```
1. ../02_ACTIVE_CONTENTS/feed-post-system/00_SYSTEM_MASTER/START-PROMPT.md を参照
2. 対象ナレッジIDの特定
3. ターゲット判定（type-target-persona-relations.json参照）
4. 品質基準の選択（T007/T010等）
```

### **Step 2: 参照ファイル読み込み**
```
必須参照ファイル:
- 対象ナレッジJSON
- type-target-persona-relations.json
- CHARACTER-STRATEGY-MASTER-GUIDE.md
- template-placement-ultimate-master.md
- 適用品質基準（T007/T010）
- FOOTER-TEXT-TEMPLATES.md
- FINAL-MESSAGE-TEMPLATES.md
```

### **Step 3: 実行**
```
1. ナレッジ内容分析
2. ターゲット判定・targetIdsフィールド追加
3. キャラクター戦略決定
4. 品質基準適用
5. 構造現代化・キャラクター戦略統合
6. 完全改善版JSON出力
```

---

## 📊 **品質保証システム**

### **絶対遵守原則**
- **解釈の余地ゼロ**: 全項目Yes/No判断可能
- **情報欠損完全回避**: 価値ある情報削除禁止
- **ターゲット性別一致**: 女性→女性キャラ、男性→男性キャラ
- **禁止表現排除**: 「戦略的」「効率的」「最適化」等禁止
- **機械的表現排除**: 「1.」「2.」「ステップ1:」等禁止

### **品質評価指標**
- 構造品質: content構造完璧設定率100%
- 表現品質: 禁止表現出現率0%
- ターゲット品質: キャラクター性別一致率100%
- 完成度: 情報欠損率0%

---

**このガイドに従って、各Typeの特性を理解し、適切なドキュメントを参照してナレッジを生成してください。**