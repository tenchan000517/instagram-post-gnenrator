# セッション指示書 - ステップ⑤ペルソナ完全カテゴライズ

## 📋 指示書の使い方

新しいセッションで作業を開始する際は、該当するPhaseの指示をコピーして使用してください。

## 🎯 Phase 1: データ抽出セッション

### Phase 1-A: 初回データ抽出開始

<!-- ```
【ステップ⑤】ペルソナ詳細分析・完全カテゴライズを担当します。Phase 1の個別データ抽出を実行してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step5-personas/STEP5_ANALYSIS_PLAN.md
- docs/master/SYSTEM_REQUIREMENTS_DEFINITION.md
- docs/master/COMPLETE_ANALYSIS_FRAMEWORK_V2.md

【分析対象データ】
- docs/content-analysis/results/page-structure/contents-XXX-structure.md
- docs/content-analysis/results/beneficial-value/contents-XXX-value.md
- docs/content-analysis/results/content-analysis/contents-XXX-content.md
- docs/content-analysis/results/persona-target/contents-XXX-persona.md

【現在フェーズ】Phase 1: 全100投稿の個別ペルソナ詳細分析
【担当範囲】contents-041 〜 contents-060
【作業記録先】docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch1-contents041-060.md

【分析項目】
1. ペルソナ基本属性（年代、職業、状況）
2. ペルソナ特性パターン
3. ペルソナ分類要素
4. ペルソナ判定要素

重要：Phase1では「ペルソナタイプ分類」は行わず、純粋なデータ抽出のみ実施。plan.mdの分析項目に従って記録。
``` -->

### Phase 1-B: データ抽出継続（2回目以降）

<!-- ```
【ステップ⑤】ペルソナ詳細分析・完全カテゴライズを担当します。Phase 1の個別データ抽出を継続してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step5-personas/STEP5_ANALYSIS_PLAN.md
- docs/content-analysis/analytics/step5-personas/working/batches/（進捗確認）

【分析対象データ】
- docs/content-analysis/results/page-structure/contents-XXX-structure.md
- docs/content-analysis/results/beneficial-value/contents-XXX-value.md
- docs/content-analysis/results/content-analysis/contents-XXX-content.md
- docs/content-analysis/results/persona-target/contents-XXX-persona.md

【現在フェーズ】Phase 1: 全100投稿の個別ペルソナ詳細分析
【担当範囲】contents-081 〜 contents-100 ※範囲は進捗に応じて調整
【作業記録先】docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch2-contents081-100.md
【前回完了範囲】contents-061 〜 contents-080 ※進捗に応じて調整

重要：既存の記録フォーマットに従い、ペルソナタイプ分類なしでデータ抽出のみ継続。20投稿ずつバッチ分割で記録。
``` -->

## 📊 Phase 2: パターン分析セッション
<!-- 
```
【ステップ⑤】ペルソナ詳細分析・完全カテゴライズを担当します。Phase 2の横断的パターン分析を実行してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step5-personas/STEP5_ANALYSIS_PLAN.md
- docs/content-analysis/analytics/step5-personas/working/batches/（全バッチデータ）
- docs/master/SYSTEM_REQUIREMENTS_DEFINITION.md

【現在フェーズ】Phase 2: 横断的パターン分析・ペルソナクラスタリング
【前提条件】Phase 1で100投稿すべてのペルソナデータ抽出完了
【作業記録先】docs/content-analysis/analytics/step5-personas/working/phase2-persona-clustering.md

【実行内容】
1. 純粋なデータ分析（基本属性分布プロット）
2. 自然なペルソナタイプの発見（クラスタリング）
3. 重複パターンの発見

重要：データから自然に浮かび上がるペルソナクラスターを発見し、客観的に分類。仮説に囚われず、純粋にデータ駆動で分析。
``` -->

## 📝 Phase 3: 最終文書化セッション

<!-- ```
【ステップ⑤】ペルソナ詳細分析・完全カテゴライズを担当します。Phase 3の最終まとめを実行してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step5-personas/STEP5_ANALYSIS_PLAN.md
- docs/content-analysis/analytics/step5-personas/working/phase2-persona-clustering.md
- docs/master/SYSTEM_REQUIREMENTS_DEFINITION.md

【現在フェーズ】Phase 3: PersonaID確定・完全カテゴライズ
【成果物作成先】docs/content-analysis/analytics/step5-personas/PERSONA_CATEGORIZATION_COMPLETE.md
【作業記録先】docs/content-analysis/analytics/step5-personas/working/phase3-personaid-definitions.md

【実行内容】
1. PersonaID体系確定（P001, P002...）
2. 完全カテゴライズ実行（全100投稿にPersonaID割り当て）
3. 次ステップ引き継ぎ仕様策定

重要：確定したペルソナタイプの定義、判定基準、該当投稿リストを完全に文書化。システム要件定義書に基づくPersonaIDの割り当て。
``` -->

## ⚠️ 重要な注意事項

### Phase 1での絶対禁止事項
- ペルソナタイプ分類の実行
- 仮説による先入観
- 投稿の価値判断や評価

### 各Phase共通の注意事項
- 必読ドキュメントを必ず最初に確認
- 作業記録は必ず指定されたファイルに保存
- 前回の作業内容を確認してから継続
- 判断根拠を必ず記録
- IDベース三次元連携システム（PersonaID + TypeID + ThemeID）を意識

### 担当範囲の調整方法
- Phase 1-Bの担当範囲は進捗に応じて調整（20投稿ずつが目安）
- 完了範囲は作業記録ファイルで確認
- セッション時間に応じて柔軟に範囲を設定

### システム要件との連携
- PersonaIDはシステム共通言語として機能
- ペルソナマスタ：PersonaID, 名称, 特徴, 有益性パターン
- テーマ×ペルソナ連携テーブルへの基盤構築

---

**作成日**: 2025-07-20  
**用途**: セッションリフレッシュ時の継続作業指示  
**対象**: ステップ⑤ペルソナ詳細分析・完全カテゴライズ