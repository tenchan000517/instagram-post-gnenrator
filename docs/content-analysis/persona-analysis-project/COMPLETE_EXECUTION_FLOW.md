# 真のペルソナ分析プロジェクト - 完全実行フロードキュメント

## 🎯 このドキュメントの使用方法

**上から順にコピー&ペーストで全セッションを完全実行できます**

各セッションのプロンプトを順次実行し、前セッションの成果を次セッションが自動継承する設計になっています。

---

# 📋 SESSION 01 実行プロンプト（全て含む）

```
# Session 01: 生データ抽出 - 具体的人物描写抽出

## 📋 必須読み込み（開始前に必ず実行）
以下のドキュメントを必ず読み込んでプロジェクトの背景・目的・品質基準を理解してください：

1. `/docs/content-analysis/persona-analysis-project/00_PROJECT_OVERVIEW.md` 
   - プロジェクト全体計画・前回失敗の問題認識・解決すべき課題を理解

2. `/docs/content-analysis/persona-analysis-project/01_SESSION_GUIDELINES.md`
   - セッション実行ガイドライン・絶対禁止事項・品質管理システムを理解

3. `/docs/content-analysis/persona-analysis-project/02_QUALITY_STANDARDS.md`
   - 品質基準・三重検証システム・不合格時の対処法を理解

## 🚨 重要な問題認識
前回の分析で「P004: 効率化志向ビジネスパーソン（25-35歳）」という抽象的ペルソナを作成し、
「仕事で使えるChatGPT活用法」で企業DX情報を生成して完全に失敗しました。
この失敗を絶対に繰り返さないための品質基準が設定されています。

## 🎯 使命
バッチ分析20ファイルから「具体的人物描写」のみを抽出し、抽象的表現を完全除外する

## 🚨 絶対禁止（抽象表現）
❌ 会社員、ビジネスパーソン、社会人、働く人
❌ XX代、中堅、若手、ベテラン、新人（年数不明）
❌ 効率化志向、成長志向、安定志向、向上心がある
❌ 企業、組織、チーム、部署（具体名なし）

## ✅ 必須採用基準
✅ 年齢: 「27歳」「29-31歳」等、3歳以内の幅
✅ 職業: 「営業職3年目」「経理担当者」「人事採用担当」等
✅ 状況: 「月末処理に追われる」「新人教育を任されている」等
✅ 悩み: 「Excel関数が覚えられない」「上司への報告が苦手」等

## 📂 必読データソース（20ファイル）
```
ペルソナ軸（5ファイル）:
/docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch1-contents001-020.md
/docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch2-contents021-040.md
/docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch3-contents041-060.md
/docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch4-contents061-080.md
/docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch5-contents081-100.md

有益性軸（5ファイル）:
/docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch1-contents001-020.md
/docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch2-contents021-040.md
/docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch3-contents041-060.md
/docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch4-contents061-080.md
/docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch5-contents081-100.md

表現軸（5ファイル）:
/docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch1-contents001-020.md
/docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch2-contents021-040.md
/docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch3-contents041-060.md
/docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch4-contents061-080.md
/docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch5-contents081-100.md

テーマ軸（5ファイル）:
/docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch1-contents001-020.md
/docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch2-contents021-040.md
/docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch3-contents041-060.md
/docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch4-contents061-080.md
/docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch5-contents081-100.md
```

## 🔍 実行手順
1. 上記20ファイルを順次読み込み
2. 各contents-XXXから具体的人物描写を抽出
3. 抽象表現含有記述は即座除外
4. ContentsIDと紐づけて記録

## 📊 成果物作成
保存先: `/docs/content-analysis/persona-analysis-project/sessions/session-01/`

以下のファイルを作成:
- `extracted-personas.md` (抽出した具体的人物描写)
- `excluded-abstracts.md` (除外した抽象表現)
- `contents-mapping.md` (ContentsIDとの紐づけ)
- `session-01-results.md` (セッション結果報告)

## 品質基準
- 最低抽出数: 50件
- 具体性達成率: 100%（抽象表現0件）
- 年齢幅: 3歳以内必須

**この基準を満たさない場合は作業をやり直してください**
```

---

# 📋 SESSION 02 実行プロンプト

```
# Session 02: 人物像構築 - 実在可能な具体的ペルソナ作成

## 📋 必須読み込み（開始前に必ず実行）
### 基盤ドキュメント（品質基準・ガイドライン理解）
- `/docs/content-analysis/persona-analysis-project/00_PROJECT_OVERVIEW.md`
- `/docs/content-analysis/persona-analysis-project/01_SESSION_GUIDELINES.md`  
- `/docs/content-analysis/persona-analysis-project/02_QUALITY_STANDARDS.md`

### 前セッション成果（データ継承）
- `/docs/content-analysis/persona-analysis-project/sessions/session-01/extracted-personas.md`
- `/docs/content-analysis/persona-analysis-project/sessions/session-01/contents-mapping.md`
- `/docs/content-analysis/persona-analysis-project/sessions/session-01/session-01-results.md`

## 🚨 重要な問題認識
P004失敗（抽象的ペルソナ）を絶対に繰り返さない。年齢3歳以内・具体職種・現実的状況必須。

## 🎯 使命
Session 01で抽出した具体的人物描写から、実在可能で一意性のある人物像を構築する

## 🚨 実在性検証基準
□ 年齢は3歳以内の幅か？
□ 職業は業界・職種・経験年数が明確か？
□ 状況・背景は現実的で具体的か？
□ そのような人が実際に存在しそうか？
□ 他と明確に区別できる一意性があるか？

## 🔍 実行手順
1. Session 01の抽出データを分析
2. 類似する人物描写をグループ化
3. 各グループから代表的な人物像を構築
4. 実在性・具体性・一意性を検証
5. 不合格ペルソナの修正または除外

## 📊 ペルソナ構築フォーマット
```markdown
## ペルソナ: [仮名]

### 基本属性
- **年齢**: XX歳（±1歳）
- **職業**: [具体的職種・経験年数]
- **勤務先**: [業界・企業規模]
- **役職・ポジション**: [具体的役職]

### 状況・背景
- **置かれた状況**: [具体的環境]
- **日常業務**: [具体的な仕事内容]
- **責任範囲**: [担当している業務範囲]

### 課題・悩み
- **主な悩み**: [具体的困りごと]
- **課題の背景**: [なぜその悩みが発生するか]
- **解決への障害**: [何が解決を阻んでいるか]

### 実在性検証
- 年齢具体性: ✅/❌
- 職業具体性: ✅/❌
- 状況現実性: ✅/❌
- 一意性: ✅/❌

### 統合元Contents
[このペルソナの元となったcontents-XXXのリスト]
```

## 📊 成果物作成
保存先: `/docs/content-analysis/persona-analysis-project/sessions/session-02/`

以下のファイルを作成:
- `constructed-personas.md` (構築された人物像群)
- `persona-verification.md` (実在性検証結果)
- `persona-uniqueness.md` (一意性分析)
- `session-02-results.md` (セッション結果報告)

## 品質基準
- 構築ペルソナ数: 10-20体
- 実在性検証: 全項目✅必須
- 一意性: 各ペルソナが明確に区別可能

**品質基準未達は作業やり直し**
```

---

# 📋 SESSION 03 実行プロンプト

```
# Session 03: 有益性分析 - 真の価値ある情報ニーズ抽出

## 📋 必須読み込み（開始前に必ず実行）
### 基盤ドキュメント（品質基準・ガイドライン理解）
- `/docs/content-analysis/persona-analysis-project/00_PROJECT_OVERVIEW.md`
- `/docs/content-analysis/persona-analysis-project/01_SESSION_GUIDELINES.md`  
- `/docs/content-analysis/persona-analysis-project/02_QUALITY_STANDARDS.md`

### 前セッション成果（データ継承）
- `/docs/content-analysis/persona-analysis-project/sessions/session-02/constructed-personas.md`
- `/docs/content-analysis/persona-analysis-project/sessions/session-02/persona-verification.md`
- `/docs/content-analysis/persona-analysis-project/sessions/session-02/session-02-results.md`

## 🚨 重要な問題認識
ChatGPTメール作成等の既知情報を完全排除。独自価値・実用性・具体性必須。

## 🎯 使命
各ペルソナが本当に知りたい独自性・実用性のある情報を特定し、既知情報を完全排除する

## 🚨 有益性判定基準
□ 既知情報・一般論ではないか？
□ その人特有のニーズに応えているか？
□ 他では得られない独自価値があるか？
□ 実践的で具体的な内容か？
□ その人の課題解決に直結するか？

## ❌ 絶対除外（既知情報例）
- 「ChatGPTでメール作成効率化」
- 「AI活用で生産性向上」
- 「時間管理術」
- 「コミュニケーション改善法」
- 「スキルアップの重要性」

## ✅ 採用すべき独自価値例
- 「営業特有の断り文句への対応プロンプト集」
- 「経理月次処理で見落としがちな項目チェックリスト」
- 「人事面接で応募者の本音を引き出す質問テクニック」
- 「マーケティングデータから隠れたトレンドを発見する分析手法」

## 🔍 実行手順
1. 各ペルソナの課題・状況を詳細分析
2. その人が置かれた状況での真のニーズを特定
3. 既存情報・一般論との差別化要素を抽出
4. 独自性・実用性・具体性を検証
5. 有益性スコアリング実施

## 📊 有益性分析フォーマット
```markdown
## ペルソナ: [名前] の有益性分析

### 課題の深掘り
- **表面的課題**: [一般的に見える課題]
- **真の課題**: [その人特有の根本的問題]
- **課題の特殊性**: [なぜその人だけがこの課題を持つか]

### 本当に知りたい情報
- **情報の種類**: [必要な情報のタイプ]
- **情報の深度**: [どこまで詳細な情報が必要か]
- **情報の角度**: [どんな視点・アプローチが必要か]
- **情報の文脈**: [どんな状況で使用する情報か]

### 独自価値の特定
- **既存情報との差別化**: [なぜ一般的情報では不十分か]
- **独自性要素**: [この人だけが求める特別な要素]
- **実用性**: [実際にどう使える情報か]
- **効果・成果**: [その情報でどんな成果が得られるか]

### 有益性検証
- 独自性: ✅/❌ [10点満点中X点]
- 具体性: ✅/❌ [10点満点中X点]
- 実用性: ✅/❌ [10点満点中X点]
- 課題解決性: ✅/❌ [10点満点中X点]

### 総合有益性スコア
[40点満点中X点] - 32点以上で合格
```

## 📊 成果物作成
保存先: `/docs/content-analysis/persona-analysis-project/sessions/session-03/`

以下のファイルを作成:
- `value-analysis.md` (各ペルソナの有益性分析)
- `unique-value-map.md` (独自価値マップ)
- `excluded-common-info.md` (除外した一般情報)
- `session-03-results.md` (セッション結果報告)

## 品質基準
- 有益性スコア: 32点以上必須
- 独自性: 既知情報完全排除
- 実用性: 明日から使える具体性

**基準未達は修正または除外**
```

---

# 📋 SESSION 04 実行プロンプト

```
# Session 04: 統合判定 - 最適ターゲット体系構築

## 🎯 使命
類似ペルソナの慎重な統合判定を行い、価値を失わない最適なターゲット体系を構築する

## 📋 必須読み込み（開始前に必ず実行）
### 基盤ドキュメント（品質基準・ガイドライン理解）
- `/docs/content-analysis/persona-analysis-project/00_PROJECT_OVERVIEW.md`
- `/docs/content-analysis/persona-analysis-project/01_SESSION_GUIDELINES.md`  
- `/docs/content-analysis/persona-analysis-project/02_QUALITY_STANDARDS.md`

## 📂 前セッション成果の読み込み
必ず以下を読み込んでから開始:
- `/docs/content-analysis/persona-analysis-project/sessions/session-03/value-analysis.md`
- `/docs/content-analysis/persona-analysis-project/sessions/session-03/unique-value-map.md`
- `/docs/content-analysis/persona-analysis-project/sessions/session-03/session-03-results.md`

## 🚨 統合判定基準
**統合条件（全て満たす場合のみ統合）:**
□ 基本属性（年齢・職業）が酷似
□ 置かれた状況・背景が同じ
□ 知りたい情報の種類・深度・角度が一致
□ 期待する独自価値が同質

**独立維持条件（一つでも該当すれば独立）:**
□ 職業・業界特有のニーズがある
□ 年齢・経験レベルによる情報ニーズの差
□ 置かれた状況の特殊性
□ 求める情報の専門性・深度の違い

## ⚠️ 統合時の注意事項
- 統合により価値が失われないか必須確認
- 「なんとなく似てる」での統合は禁止
- 独自性の高いペルソナは独立維持優先
- 統合より独立維持の方を重視

## 🔍 実行手順
1. 各ペルソナの有益性分析結果を比較
2. 類似度の高いペルソナペアを特定
3. 統合可能性を厳格に判定
4. 統合実行または独立維持を決定
5. 最終ターゲット体系を構築

## 📊 統合判定フォーマット
```markdown
## 統合判定: [ペルソナA] × [ペルソナB]

### 類似点分析
- **基本属性**: [年齢・職業の類似度]
- **状況・背景**: [置かれた環境の類似度]
- **課題・悩み**: [困りごとの類似度]
- **情報ニーズ**: [知りたいことの類似度]

### 相違点分析
- **特殊性**: [それぞれ固有の要素]
- **専門性**: [専門的ニーズの違い]
- **深度**: [求める情報の深度の違い]
- **文脈**: [使用場面・状況の違い]

### 統合判定
- **判定結果**: [統合/独立維持]
- **判定理由**: [なぜその判定になったか]
- **統合後の価値**: [統合する場合の価値保持確認]
- **独立理由**: [独立維持する場合の理由]

### 最終決定
[統合の場合]
- **統合ターゲット名**: [新しいターゲット名]
- **統合後属性**: [統合された属性]
- **統合後価値**: [統合された独自価値]

[独立の場合]
- **独立維持理由**: [なぜ独立を維持するか]
- **独自価値**: [そのペルソナ固有の価値]
```

## 📊 成果物作成
保存先: `/docs/content-analysis/persona-analysis-project/sessions/session-04/`

以下のファイルを作成:
- `integration-analysis.md` (統合判定分析)
- `final-target-system.md` (最終ターゲット体系)
- `integration-mapping.md` (統合前後のマッピング)
- `session-04-results.md` (セッション結果報告)

## 品質基準
- 統合判定: 全条件チェック済み
- 価値保持: 統合により価値減少なし
- 独自性維持: 特殊ペルソナの独立維持

**妥協統合は絶対禁止**
```

---

# 📋 SESSION 05 実行プロンプト

```
# Session 05: 品質保証・テスト - 最終検証と実用性確認

## 🎯 使命
全成果物の最終品質検証を行い、実際のテスト生成により有効性を実証する

## 📋 必須読み込み（開始前に必ず実行）
### 基盤ドキュメント（品質基準・ガイドライン理解）
- `/docs/content-analysis/persona-analysis-project/00_PROJECT_OVERVIEW.md`
- `/docs/content-analysis/persona-analysis-project/01_SESSION_GUIDELINES.md`  
- `/docs/content-analysis/persona-analysis-project/02_QUALITY_STANDARDS.md`

## 📂 前セッション成果の読み込み
必ず以下を読み込んでから開始:
- `/docs/content-analysis/persona-analysis-project/sessions/session-04/final-target-system.md`
- `/docs/content-analysis/persona-analysis-project/sessions/session-04/integration-analysis.md`
- `/docs/content-analysis/persona-analysis-project/sessions/session-04/session-04-results.md`

## 🔍 三重検証システム

### 1. 実在性検証
各最終ターゲットについて:
□ この人物は実在するか？
□ 具体性は十分か？
□ 現実的な設定か？
□ 年齢・職業・状況は適切か？

### 2. 有益性検証
各ターゲットの情報ニーズについて:
□ この情報は本当に有益か？
□ 既知情報ではないか？
□ 独自価値があるか？
□ 実用性・具体性があるか？

### 3. 有効性検証
リサーチプロンプトの機能について:
□ この設定は機能するか？
□ ターゲットとマッチするか？
□ 期待する情報が生成されるか？
□ 実際に価値を提供できるか？

## 🧪 実証テスト実行
最終ターゲット3-5体について実際にテスト実行:

### テストケース作成
各ターゲットについて:
```markdown
## テストケース: [ターゲット名]

### テスト用タイトル
「[そのターゲットが興味を持ちそうな具体的タイトル]」

### 予想されるリサーチプロンプト
[そのターゲット用に生成されるであろうプロンプト]

### 期待される情報
- [どんな情報が生成されることを期待するか]
- [その情報がなぜそのターゲットに有益か]
- [既存情報との差別化ポイント]

### 実際の生成結果
[実際にプロンプトを実行した結果]

### 結果評価
- 実在性: ✅/❌
- 有益性: ✅/❌ 
- 有効性: ✅/❌
- 総合評価: [合格/要修正/不合格]
```

## 📊 最終品質スコアリング
```markdown
## 最終品質評価: [ターゲット名]

### 実在性スコア (25点満点)
- 年齢具体性: X/5点
- 職業具体性: X/5点
- 状況具体性: X/5点
- 人物実在性: X/5点
- 情報要求自然性: X/5点

### 有益性スコア (50点満点)
- 独自性: X/15点
- 具体性: X/15点
- 実用性: X/10点
- 課題解決性: X/10点

### 有効性スコア (25点満点)
- ターゲットマッチング: X/10点
- プロンプト有効性: X/15点

### 総合スコア
[100点満点中X点] - 85点以上で合格
```

## 📊 最終成果物作成
保存先: `/docs/content-analysis/persona-analysis-project/sessions/session-05/`

以下のファイルを作成:
- `quality-verification.md` (品質検証結果)
- `test-execution.md` (実証テスト結果)
- `final-quality-scores.md` (最終品質スコア)
- `FINAL_RESULTS.md` (プロジェクト最終成果物)
- `implementation-guide.md` (実装ガイド)

## 🎯 FINAL_RESULTS.md フォーマット
```markdown
# 真のペルソナ分析プロジェクト - 最終成果

## 📊 確定ターゲット体系
[最終的に確定したターゲット一覧]

## 🎯 各ターゲット詳細
[各ターゲットの詳細プロファイル]

## 📋 リサーチプロンプト設計要素
[各ターゲット用のプロンプト生成要素]

## ✅ 品質保証結果
[全ターゲットの品質検証結果]

## 🧪 実証テスト結果
[実際のテスト実行結果]

## 🚀 実装ガイド
[システム実装への具体的指針]

## 📈 前回分析からの改善
[P004問題等の解決確認]
```

## 品質基準
- 全ターゲット: 85点以上必須
- 実証テスト: 全件合格必須
- 最終成果物: 実装可能レベル

**基準未達は該当セッション見直し**
```

---

# 🏁 プロジェクト完了確認

全セッション完了後、以下を確認:

## ✅ 最終チェックリスト
- [ ] Session 01: 具体的人物描写50件以上抽出
- [ ] Session 02: 実在可能なペルソナ10-20体構築
- [ ] Session 03: 独自価値情報の特定・既知情報排除
- [ ] Session 04: 慎重な統合判定・最適ターゲット体系構築
- [ ] Session 05: 三重検証・実証テスト・品質保証

## 🎯 成功指標達成確認
- [ ] 実在する具体的ペルソナ（年齢3歳以内、詳細職種、具体状況）
- [ ] 真の有益性情報（他にない独自価値、実用性確保）
- [ ] 完璧なマッチング（ターゲットニーズと情報の100%一致）
- [ ] 実証された有効性（テスト生成での機能確認）

## 🚀 前回失敗からの脱却確認
- [ ] P004問題解決（抽象的ペルソナの完全排除）
- [ ] 有益性確保（既知情報・一般論の完全排除）
- [ ] ターゲット精度（ミスマッチング問題の根絶）

**全項目✅で真のペルソナ分析プロジェクト完了**

---

**このドキュメントを上から順に実行することで、真に有効なペルソナ分析システムが完成します。各セッションのプロンプトをコピー&ペーストし、指示に従って実行してください。**