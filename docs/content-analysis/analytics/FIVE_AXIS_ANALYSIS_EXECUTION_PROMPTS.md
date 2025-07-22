# 5軸詳細分析 実行プロンプト集

## 🎯 プロンプト集概要

この文書は、投稿タイプ分析（Step1）と同じ詳細度・精密さで5軸分析を実行するためのコピペ実行可能なプロンプト集です。上から順にコピペして実行すれば、Step1と同レベルの分析が完了します。

## 📋 実行順序

1. **Step5: ペルソナ詳細分析** → PersonaID体系確定
2. **Step6: 有益性詳細分析** → BenefitID体系確定  
3. **Step7: 表現方法詳細分析** → ExpressionID体系確定
4. **Step8: テーマ詳細分析** → ThemeID体系確定
5. **Step9: 5軸統合** → 100IDベース相互参照システム完成

---

## 🎯 Step5: ペルソナ詳細分析

### Step5 Phase1 実行プロンプト

```
【Step5 Phase1: 個別ペルソナ詳細分析実行】

前提確認:
1. `/docs/content-analysis/analytics/step5-personas/STEP5_ANALYSIS_PLAN.md` を読む
2. `/docs/content-analysis/results/` 配下の4軸分析結果を確認

実行内容:
全100投稿を個別に詳細分析し、以下のフォーマットで記録

記録ファイル: `/docs/content-analysis/analytics/step5-personas/working/phase1-individual-analysis.md`

分析フォーマット（各contents-XXXに対して）:
## contents-XXX
- **基本属性**: [年代][職業][状況] (根拠: [具体的な分析箇所])
- **特性パターン**: [主要特性][組み合わせ]
- **分類要素**: [ターゲット層]/[レベル]/[ニーズ特徴]
- **判定要素**: [判定基準要素][差異点]
- **備考**: [特徴的な要素があれば記録]

重要制約:
- Phase1では「ペルソナタイプ分類」は絶対禁止
- 純粋なデータ抽出のみ実施

完了判定基準:
- 全100投稿の個別分析完了
- 上記フォーマットでの詳細記録完了
```

### Step5 Phase2 実行プロンプト

```
【Step5 Phase2: 横断的パターン分析・ペルソナクラスタリング実行】

前提確認:
Phase1完了：全100投稿の個別ペルソナ分析が完備されていること

実行内容:
Phase1結果の横断的パターン分析を実行

記録ファイル: `/docs/content-analysis/analytics/step5-personas/working/phase2-persona-clustering.md`

2-1. 純粋なデータ分析:
- 基本属性の分布分析（年代軸での分布プロット、年代順でソート）
- 職業・状況の組み合わせパターン分析
- 経験レベルの分布とクラスタリング
- 各パターンの出現頻度とcontents-ID一覧

- ペルソナ特性パターンの頻度分析とグルーピング
- 特性パターンの類型化と出現頻度
- 特性組み合わせの統計分析
- 各特性パターンごとのcontents-ID分布

- 分類要素の組み合わせパターン分析
- ターゲット層×レベル×ニーズの統合分析
- 多次元での類似性分析とクラスター境界の明確化

2-2. 自然なペルソナタイプの発見:
- データから自然に形成されるペルソナクラスターを観察
- 各クラスターの境界線を数値化・明確化
- クラスター間の差異を定量的に分析
- 重複パターンの発見・妥当性評価

完了判定基準:
- 自然なペルソナクラスターの発見完了
- 各クラスターの特徴・境界線の明確化完了
- 重複パターンの評価完了
```

### Step5 Phase3 実行プロンプト

```
【Step5 Phase3: PersonaID確定・完全カテゴライズ実行】

前提確認:
Phase2完了：ペルソナクラスター発見が完了していること

実行内容:
PersonaID体系確定と完全カテゴライズを実行

記録ファイル: `/docs/content-analysis/analytics/step5-personas/PERSONA_CATEGORIZATION_COMPLETE.md`

3-1. PersonaID体系確定:
- PersonaID=P001, P002, P003... の割り当て
- 各PersonaIDの名称・特徴・判定基準を確定

PersonaID定義フォーマット例:
【PersonaID=P001: 自己分析初心者型】
- **名称**: Self-Analysis Beginner Type
- **特徴**: 21-22歳女性、自己分析初心者、段階的学習好き、体系性重視、権威性重視
- **判定基準**:
  - 年代: 20-23歳
  - 経験レベル: 初心者
  - 学習スタイル: 段階的学習好き AND 体系性重視
  - 心理状態: 不安×体系的理解願望
  - 判定閾値: スコア≥3.0/4.0

3-2. 完全カテゴライズ実行:
全100投稿PersonaID割り当て結果フォーマット:
contents-001: [基本属性] [心理状態] → スコア X.X/4.0 ✅/❌
contents-002: [基本属性] [心理状態] → スコア X.X/4.0 ✅/❌
contents-004: 21-22歳女性 自己分析初心者 → スコア 4.0/4.0 ✅
...
全100投稿の個別スコア算出・判定

PersonaID別確定リスト:
**確定PersonaID=P001投稿**: X投稿
- contents-004, XXX, XXX... (contents-ID一覧)

完了判定基準:
- PersonaID体系の完全確定
- 全100投稿のPersonaID割り当て完了
- Step1レベルの詳細性保持確認
```

---

## 🎯 Step6: 有益性詳細分析

### Step6 Phase1 実行プロンプト

```
【Step6 Phase1: 個別有益性詳細分析実行】

前提確認:
1. `/docs/content-analysis/analytics/step6-beneficial-value/STEP6_ANALYSIS_PLAN.md` を読む
2. `/docs/content-analysis/results/` 配下の4軸分析結果を確認

実行内容:
全100投稿を個別に詳細分析し、以下のフォーマットで記録

記録ファイル: `/docs/content-analysis/analytics/step6-beneficial-value/working/phase1-individual-analysis.md`

分析フォーマット（各contents-XXXに対して）:
## contents-XXX
- **基本要素**: [詳細性][整理性][精度] (根拠: [具体的な分析箇所])
- **価値パターン**: [主要価値要素][組み合わせ]
- **分類要素**: [価値特徴]/[強度]/[持続性]
- **判定要素**: [判定基準要素][差異点]
- **備考**: [特徴的な要素があれば記録]

重要制約:
- Phase1では「有益性タイプ分類」は絶対禁止
- 純粋なデータ抽出のみ実施

完了判定基準:
- 全100投稿の個別分析完了
- 上記フォーマットでの詳細記録完了
```

### Step6 Phase2 実行プロンプト

```
【Step6 Phase2: 横断的パターン分析・有益性クラスタリング実行】

前提確認:
Phase1完了：全100投稿の個別有益性分析が完備されていること

実行内容:
Phase1結果の横断的パターン分析を実行

記録ファイル: `/docs/content-analysis/analytics/step6-beneficial-value/working/phase2-benefit-clustering.md`

2-1. 純粋なデータ分析:
- 価値要素の組み合わせパターン分析（詳細性×整理性×精度の分布プロット）
- 価値要素の組み合わせパターン分類と出現頻度
- 各パターンの出現頻度とcontents-ID一覧

- 価値パターンの頻度分析とグルーピング
- 価値パターンの類型化と出現頻度
- パターン組み合わせの統計分析

2-2. 自然な有益性タイプの発見:
- データから自然に形成される有益性クラスターを観察
- 各クラスターの境界線を数値化・明確化

完了判定基準:
- 自然な有益性クラスターの発見完了
- 各クラスターの特徴・境界線の明確化完了
```

### Step6 Phase3 実行プロンプト

```
【Step6 Phase3: BenefitID確定・完全カテゴライズ実行】

前提確認:
Phase2完了：有益性クラスター発見が完了していること

実行内容:
BenefitID体系確定と完全カテゴライズを実行

記録ファイル: `/docs/content-analysis/analytics/step6-beneficial-value/BENEFICIAL_VALUE_CATEGORIZATION_COMPLETE.md`

3-1. BenefitID体系確定:
BenefitID定義フォーマット例:
【BenefitID=B001: 詳細+整理+精度型】
- **名称**: Detail+Organization+Accuracy Type
- **特徴**: 5つの手法網羅+段階構成+心理学根拠+図表活用による価値提供
- **判定基準**:
  - 価値要素: 詳細性 AND 整理性 AND 精度
  - 実現方法: 複数手法網羅 AND 段階的構成 AND 根拠提示
  - 効果設計: 段階的理解促進 AND 実践可能性重視
  - 判定閾値: スコア≥3.5/4.0

3-2. 完全カテゴライズ実行:
全100投稿BenefitID割り当て結果フォーマット:
contents-001: [価値要素] [実現方法] → スコア X.X/4.0 ✅/❌
contents-002: [価値要素] [実現方法] → スコア X.X/4.0 ✅/❌
...

完了判定基準:
- BenefitID体系の完全確定
- 全100投稿のBenefitID割り当て完了
```

---

## 🎯 Step7: 表現方法詳細分析

### Step7 Phase1 実行プロンプト

```
【Step7 Phase1: 個別表現方法詳細分析実行】

前提確認:
1. `/docs/content-analysis/analytics/step7-expression-methods/STEP7_ANALYSIS_PLAN.md` を読む
2. `/docs/content-analysis/results/` 配下の4軸分析結果を確認

実行内容:
全100投稿を個別に詳細分析し、以下のフォーマットで記録

記録ファイル: `/docs/content-analysis/analytics/step7-expression-methods/working/phase1-individual-analysis.md`

分析フォーマット（各contents-XXXに対して）:
## contents-XXX
- **基本要素**: [視覚][文体][構成] (根拠: [具体的な分析箇所])
- **技法パターン**: [主要技法][組み合わせ]
- **分類要素**: [表現特徴]/[強度]/[一貫性]
- **判定要素**: [判定基準要素][差異点]
- **備考**: [特徴的な要素があれば記録]

重要制約:
- Phase1では「表現方法タイプ分類」は絶対禁止
- 純粋なデータ抽出のみ実施

完了判定基準:
- 全100投稿の個別分析完了
- 上記フォーマットでの詳細記録完了
```

### Step7 Phase2 実行プロンプト

```
【Step7 Phase2: 横断的パターン分析・表現方法クラスタリング実行】

前提確認:
Phase1完了：全100投稿の個別表現方法分析が完備されていること

実行内容:
Phase1結果の横断的パターン分析を実行

記録ファイル: `/docs/content-analysis/analytics/step7-expression-methods/working/phase2-expression-clustering.md`

2-1. 純粋なデータ分析:
- 基本要素の分布分析（視覚×文体×構成の組み合わせプロット）
- 技法パターンの頻度分析とグルーピング
- 分類要素の組み合わせパターン分析

2-2. 自然な表現方法タイプの発見:
- データから自然に形成される表現方法クラスターを観察
- 各クラスターの境界線を数値化・明確化

完了判定基準:
- 自然な表現方法クラスターの発見完了
- 各クラスターの特徴・境界線の明確化完了
```

### Step7 Phase3 実行プロンプト

```
【Step7 Phase3: ExpressionID確定・完全カテゴライズ実行】

前提確認:
Phase2完了：表現方法クラスター発見が完了していること

実行内容:
ExpressionID体系確定と完全カテゴライズを実行

記録ファイル: `/docs/content-analysis/analytics/step7-expression-methods/EXPRESSION_METHODS_CATEGORIZATION_COMPLETE.md`

3-1. ExpressionID体系確定:
ExpressionID定義フォーマット例:
【ExpressionID=E001: 教育+親しみやすさ型】
- **名称**: Educational+Friendly Type
- **特徴**: 図表活用+親しみやすい呼びかけ+継続設計+感嘆符による励まし
- **判定基準**:
  - 視覚表現: 図表活用 AND 視覚的誘導
  - 文体トーン: 親しみやすさ AND 感情表現豊富
  - 構成展開: 段階的理解促進 AND 継続設計
  - 判定閾値: スコア≥3.0/4.0

3-2. 完全カテゴライズ実行:
全100投稿ExpressionID割り当て結果フォーマット:
contents-001: [視覚表現] [文体トーン] → スコア X.X/4.0 ✅/❌
contents-002: [視覚表現] [文体トーン] → スコア X.X/4.0 ✅/❌
...

完了判定基準:
- ExpressionID体系の完全確定
- 全100投稿のExpressionID割り当て完了
```

---

## 🎯 Step8: テーマ詳細分析

### Step8 Phase1 実行プロンプト

```
【Step8 Phase1: 個別テーマ詳細分析実行】

前提確認:
1. `/docs/content-analysis/analytics/step8-themes/STEP8_ANALYSIS_PLAN.md` を読む
2. `/docs/content-analysis/results/` 配下の4軸分析結果を確認

実行内容:
全100投稿を個別に詳細分析し、以下のフォーマットで記録

記録ファイル: `/docs/content-analysis/analytics/step8-themes/working/phase1-individual-analysis.md`

分析フォーマット（各contents-XXXに対して）:
## contents-XXX
- **基本要素**: [主要テーマ][サブテーマ] (根拠: [具体的な分析箇所])
- **特性パターン**: [主要特性][組み合わせ]
- **分類要素**: [内容特徴]/[深度範囲]/[実用性]
- **判定要素**: [判定基準要素][差異点]
- **備考**: [特徴的な要素があれば記録]

重要制約:
- Phase1では「テーマタイプ分類」は絶対禁止
- 純粋なデータ抽出のみ実施

完了判定基準:
- 全100投稿の個別分析完了
- 上記フォーマットでの詳細記録完了
```

### Step8 Phase2 実行プロンプト

```
【Step8 Phase2: 横断的パターン分析・テーマクラスタリング実行】

前提確認:
Phase1完了：全100投稿の個別テーマ分析が完備されていること

実行内容:
Phase1結果の横断的パターン分析を実行

記録ファイル: `/docs/content-analysis/analytics/step8-themes/working/phase2-theme-clustering.md`

2-1. 純粋なデータ分析:
- 基本要素の分布分析（主要テーマ×サブテーマの組み合わせプロット）
- 特性パターンの頻度分析とグルーピング
- 分類要素の組み合わせパターン分析

2-2. 自然なテーマタイプの発見:
- データから自然に形成されるテーマクラスターを観察
- 各クラスターの境界線を数値化・明確化

完了判定基準:
- 自然なテーマクラスターの発見完了
- 各クラスターの特徴・境界線の明確化完了
```

### Step8 Phase3 実行プロンプト

```
【Step8 Phase3: ThemeID確定・完全カテゴライズ実行】

前提確認:
Phase2完了：テーマクラスター発見が完了していること

実行内容:
ThemeID体系確定と完全カテゴライズを実行

記録ファイル: `/docs/content-analysis/analytics/step8-themes/THEMES_CATEGORIZATION_COMPLETE.md`

3-1. ThemeID体系確定:
ThemeID定義フォーマット例:
【ThemeID=T001: 自己分析手法解説型】
- **名称**: Self-Analysis Method Guide Type
- **特徴**: 自己分析の方法5選+実践重視+具体的手法解説
- **判定基準**:
  - テーマ内容: 自己分析手法 AND 複数手法提示
  - 範囲深度: 具体的手法解説 AND 実践重視
  - アプローチ: 段階的解説 AND 網羅的提供
  - 判定閾値: スコア≥3.0/4.0

3-2. 完全カテゴライズ実行:
全100投稿ThemeID割り当て結果フォーマット:
contents-001: [テーマ内容] [範囲深度] → スコア X.X/4.0 ✅/❌
contents-002: [テーマ内容] [範囲深度] → スコア X.X/4.0 ✅/❌
...

完了判定基準:
- ThemeID体系の完全確定
- 全100投稿のThemeID割り当て完了
```

---

## 🎯 Step9: 5軸統合

### Step9 統合実行プロンプト

```
【Step9: 5軸統合実行】

前提確認:
Step5-8のすべてが完了していることを確認
各ステップの *_CATEGORIZATION_COMPLETE.md ファイルの存在確認

実行内容:

統合マトリックス構築:
contents-001: TypeID=XXX, PersonaID=XXX, BenefitID=XXX, ExpressionID=XXX, ThemeID=XXX
contents-002: TypeID=XXX, PersonaID=XXX, BenefitID=XXX, ExpressionID=XXX, ThemeID=XXX
contents-003: TypeID=XXX, PersonaID=XXX, BenefitID=XXX, ExpressionID=XXX, ThemeID=XXX
...
全100投稿の完全マッピング

重複パターンの体系化:
- 各軸での重複パターン一覧
- 重複を活かした柔軟な連携仕様
- N連携システムの設計仕様

記録ファイル: `/docs/content-analysis/analytics/step9-integration/FIVE_AXIS_INTEGRATION_COMPLETE.md`

完了判定基準:
- 全100投稿の5軸完全マッピング完了
- 重複パターンの体系化完了
- Step1と同レベルの品質での5軸統合システム構築完了
```

---

## ⚠️ 重要な留意事項

1. **順次実行**: 上から順にコピペして実行
2. **Phase完了確認**: 各Phaseを完了してから次に進む
3. **ファイル保存**: 指定されたファイルパスに必ず保存
4. **フォーマット遵守**: 指定されたフォーマットを厳密に遵守

---

**作成日**: 2025-07-20  
**バージョン**: 4.0  
**修正内容**: 純粋コピペ実行可能形式に修正、相互参照削除、順次実行形式