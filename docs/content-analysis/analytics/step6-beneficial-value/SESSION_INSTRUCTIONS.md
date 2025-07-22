# セッション指示書 - ステップ⑥有益性完全カテゴライズ

## 📋 指示書の使い方

新しいセッションで作業を開始する際は、該当するPhaseの指示をコピーして使用してください。

## 🎯 Phase 1: データ抽出セッション

### Phase 1-A: 初回データ抽出開始

```
【ステップ⑥】有益性詳細分析・完全カテゴライズを担当します。Phase 1の個別データ抽出を実行してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step6-beneficial-value/STEP6_ANALYSIS_PLAN.md
- docs/master/SYSTEM_REQUIREMENTS_DEFINITION.md
- docs/master/COMPLETE_ANALYSIS_FRAMEWORK_V2.md

【分析対象データ】
- docs/content-analysis/results/page-structure/contents-XXX-structure.md
- docs/content-analysis/results/beneficial-value/contents-XXX-value.md
- docs/content-analysis/results/content-analysis/contents-XXX-content.md
- docs/content-analysis/results/persona-target/contents-XXX-persona.md

【現在フェーズ】Phase 1: 全100投稿の個別有益性詳細分析
【担当範囲】contents-001 〜 contents-020
【作業記録先】docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch1-contents001-020.md

【分析項目】
1. 有益性基本要素（詳細性、整理性、精度等）
2. 価値要素パターン
3. 価値分類要素
4. 価値判定要素

重要：Phase1では「有益性タイプ分類」は行わず、純粋なデータ抽出のみ実施。plan.mdの分析項目に従って記録。
```

### Phase 1-B: データ抽出継続（2回目以降）

```
【ステップ⑥】有益性詳細分析・完全カテゴライズを担当します。Phase 1の個別データ抽出を継続してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step6-beneficial-value/STEP6_ANALYSIS_PLAN.md
- docs/content-analysis/analytics/step6-beneficial-value/working/batches/（進捗確認）

【分析対象データ】
- docs/content-analysis/results/page-structure/contents-XXX-structure.md
- docs/content-analysis/results/beneficial-value/contents-XXX-value.md
- docs/content-analysis/results/content-analysis/contents-XXX-content.md
- docs/content-analysis/results/persona-target/contents-XXX-persona.md

【現在フェーズ】Phase 1: 全100投稿の個別有益性詳細分析
【担当範囲】contents-021 〜 contents-040 ※範囲は進捗に応じて調整
【作業記録先】docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch2-contents021-040.md
【前回完了範囲】contents-001 〜 contents-020 ※進捗に応じて調整

重要：既存の記録フォーマットに従い、有益性タイプ分類なしでデータ抽出のみ継続。20投稿ずつバッチ分割で記録。ペルソナに対する有益性の構成要素特定に重点を置く。
```

## 📊 Phase 2: パターン分析セッション

```
【ステップ⑥】有益性詳細分析・完全カテゴライズを担当します。Phase 2の横断的パターン分析を実行してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step6-beneficial-value/STEP6_ANALYSIS_PLAN.md
- docs/content-analysis/analytics/step6-beneficial-value/working/batches/（全バッチデータ）
- docs/master/SYSTEM_REQUIREMENTS_DEFINITION.md

【参考：他ステップの成功例】
- Step5 (ペルソナ): 6つのクラスター発見
- Step7 (表現方法): 6つのクラスター発見  
- Step8 (テーマ): 6つのクラスター発見

【現在フェーズ】Phase 2: 横断的パターン分析・有益性クラスタリング
【前提条件】Phase 1で100投稿すべての有益性データ抽出完了
【作業記録先】docs/content-analysis/analytics/step6-beneficial-value/working/phase2-benefit-clustering.md

【実行内容】
1. 全100投稿の有益性データを通読・理解
2. 自然に浮かび上がる6つの有益性タイプの発見（他ステップと同じ手法）
3. 重複パターンの発見と柔軟連携設計

⚠️重要：Python・機械学習・統計手法は使用しない。他ステップと同じシンプルな観察手法を使用。期待クラスター数は6個。
```

## 📝 Phase 3: 最終文書化セッション

```
【ステップ⑥】有益性詳細分析・完全カテゴライズを担当します。Phase 3の最終まとめを実行してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step6-beneficial-value/STEP6_ANALYSIS_PLAN.md
- docs/content-analysis/analytics/step6-beneficial-value/working/phase2-benefit-clustering.md
- docs/master/SYSTEM_REQUIREMENTS_DEFINITION.md

【現在フェーズ】Phase 3: BenefitID確定・完全カテゴライズ
【成果物作成先】docs/content-analysis/analytics/step6-beneficial-value/BENEFICIAL_VALUE_CATEGORIZATION_COMPLETE.md
【作業記録先】docs/content-analysis/analytics/step6-beneficial-value/working/phase3-benefitid-definitions.md

【実行内容】
1. BenefitID体系確定（B001, B002, B003, B004, B005, B006）
2. 完全カテゴライズ実行（全100投稿にBenefitID割り当て）
3. 次ステップ引き継ぎ仕様策定

重要：発見された6つの有益性タイプの定義、判定基準、該当投稿リストを完全に文書化。他ステップとの一貫性を保持。
```

## ⚠️ 重要な注意事項

### 絶対禁止事項（全Phase共通）
- **Python・機械学習・統計ソフトの使用**
- **数値化・定量分析・判別関数作成**
- **K-means・階層クラスタリング等の統計手法**
- **エルボー法・シルエットスコア等の計算**

### Phase 1での絶対禁止事項
- 有益性タイプ分類の実行
- 仮説による先入観
- 投稿の価値判断や評価

### Phase 2での必須遵守事項
- **他ステップと同じシンプル手法を使用**
- **6つのクラスター発見を目標**
- **複雑な分析手法は使用しない**

### 各Phase共通の注意事項
- 必読ドキュメントを必ず最初に確認
- 作業記録は必ず指定されたファイルに保存
- 前回の作業内容を確認してから継続
- 判断根拠を必ず記録
- ペルソナに対する有益性の構成要素特定を重視

### 担当範囲の調整方法
- Phase 1-Bの担当範囲は進捗に応じて調整（20投稿ずつが目安）
- 完了範囲は作業記録ファイルで確認
- セッション時間に応じて柔軟に範囲を設定

### システム要件との連携
- BenefitIDはリサーチプロンプト生成のための実証データ
- ペルソナマスタの有益性パターンと連携
- コンテンツ生成システムの有益性抽出・識別基盤

---

**作成日**: 2025-07-20  
**用途**: セッションリフレッシュ時の継続作業指示  
**対象**: ステップ⑥有益性詳細分析・完全カテゴライズ