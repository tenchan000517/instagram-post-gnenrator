# Instagram投稿分析実行ガイド - 完全作業指示書

## 🚨 このガイドの目的

**新しい分析担当者が即座に作業を開始し、品質を一切落とすことなく分析を継続できるようにする**

## 📋 事前準備：必読ドキュメント

### **1. プロジェクト理解（必須読了）**
```
/mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/session-handover-complete-updated.md
→ プロジェクト全体像と3段階システム設計

/mnt/c/instagram-course/instagram-post-generator/docs/HANDOVER_REMAINING_TASKS.md
→ 現在の進捗状況と継続指針

/mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/KEY_DISCOVERIES_10_POSTS.md
→ 重要な科学的発見事項

/mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/COMPREHENSIVE_18_POSTS_ANALYSIS.md
→ 18投稿での第1回総合パターン発見

/mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/INTERIM_22_POSTS_ANALYSIS.md
→ 最新の22投稿分析結果
```

### **2. 分析方法理解（必須読了）**
```
/mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/RANDOM_SAMPLING_ANALYSIS_GUIDE.md
→ ランダムサンプリング手順詳細

/mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/analysis-guidelines-for-analysts.md
→ 分析担当者向けガイドライン

/mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/analysis-integration-guidelines.md
→ 4つの分析統合ガイドライン
```

### **3. 分析済み投稿確認（重複回避）**
```
/mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/ANALYZED_POSTS_TRACKER.md
→ 分析済み22投稿の完全リスト
```

## ⚡ 即座実行：分析作業手順

### **STEP 1: 分析済み投稿確認**
```bash
# 分析済みリスト確認
Read: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/ANALYZED_POSTS_TRACKER.md

# 現在分析済み（重複禁止）：
contents-007, 012, 014, 019, 021, 023, 025, 029, 030, 047, 035, 042, 048, 031, 038, 044, 049, 050, 032, 036, 039, 041, 043, 045
```

### **STEP 2: 未分析投稿からランダム選択**
```
対象範囲: contents-001 ～ contents-100
除外: 上記分析済み24投稿
方法: 手動ランダム選択（システム使用禁止）
選択数: 3-5投稿を同時並行分析
```

### **STEP 3: 4軸分析データ読み取り**

#### **各投稿につき以下4ファイルを読み取り：**

**A. ページ構成分析**
```
パス: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/page-structure/contents-XXX-structure.md
内容: 構成タイプ、ページ数、心理誘導ロジック
```

**B. 価値要素分析**
```
パス: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/beneficial-value/contents-XXX-value.md
内容: 詳細性、整理性、精度等の価値要素
```

**C. コンテンツ分析**
```
パス: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/content-analysis/contents-XXX-content.md
内容: テーマ、ターゲット、レベル、CTA等
```

**D. ペルソナ分析**
```
パス: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/persona-target/contents-XXX-persona.md
内容: 想定読者、悩み、価値観、行動パターン
注意: このディレクトリは存在しない可能性あり。その場合は個別ファイルを確認
```

### **STEP 4: 個別投稿分析実行**

#### **分析フォーマット（厳守）：**

```markdown
## contents-XXX分析

### 構成特徴
- タイプ: [具体的構成タイプ名]
- ページ数: X枚
- 心理誘導: [導入→展開→結論の流れ]

### 価値要素
- 主要価値: [詳細性+α要素]
- 価値構成: [単一/複合価値]
- 特徴: [具体的価値要素の組み合わせ]

### 内容特性
- テーマ: [具体的テーマ]
- ターゲット: [具体的対象層]
- レベル: [2/3/4のレベル]
- CTA: [アクション系/マーケティング系/なし]

### ペルソナ要素
- 想定読者: [年代、特徴]
- 悩み: [具体的な悩み・不安]
- 価値観: [重視する要素]
- 行動: [行動パターン]

### 成功要因統合
構成×価値×内容×ペルソナ = [成功公式]
```

### **STEP 5: パターン発見記録**

#### **既存パターンとの比較：**
```
1. 詳細性の出現確認（絶対法則検証）
2. 新しい構成タイプの発見
3. 新しいペルソナタイプの発見
4. 新しい価値組み合わせパターン
5. 既存法則の検証・修正点
```

#### **記録必須項目：**
```
- 投稿ID完全保持
- 自然発生的パターン記述
- 推測・解釈の完全排除
- 個別分析の独立性維持
```

## 🚨 絶対禁止事項

### **❌ やってはいけないこと**
1. **システムによるランダム選択** → 手動選択必須
2. **画像からの直接分析** → 既存分析結果ファイル読み取り必須
3. **統合分析** → 個別分析独立性必須
4. **推測・解釈追加** → 実データのみ
5. **仮説先行分析** → 仮説汚染完全回避
6. **効率化重視** → 品質最優先

### **❌ 前任者の失敗パターン**
```
- 画像を直接読み取ろうとする
- システムツールでランダム選択する
- 存在しないファイルパスを想定する
- 分析方法を理解せずに作業開始する
- 重複投稿を分析する
```

## 📁 重要ファイル場所マップ

### **分析結果データ保存場所**
```
基本パス: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/

├── page-structure/
│   ├── contents-001-structure.md
│   ├── contents-002-structure.md
│   └── ... (contents-060まで確認済み)
│
├── beneficial-value/
│   ├── contents-001-value.md
│   ├── contents-002-value.md
│   └── ... (contents-064まで確認済み)
│
├── content-analysis/
│   ├── contents-001-content.md
│   ├── contents-002-content.md
│   └── ... (contents-050まで確認済み)
│
└── persona-target/
    └── (存在可能性不明 - 確認必要)
```

### **投稿画像保存場所**
```
基本パス: /mnt/c/instagram-course/instagram-post-generator/contents/

├── 1/
│   ├── S__16236569_0.jpg
│   ├── S__16236571_0.jpg
│   └── ... (複数枚)
├── 2/
└── ... (100まで)

注意: 画像は参考用のみ。分析は既存分析結果ファイルから実行
```

### **ドキュメント保存場所**
```
/mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/
├── ANALYZED_POSTS_TRACKER.md (分析済みリスト)
├── KEY_DISCOVERIES_10_POSTS.md (重要発見)
├── COMPREHENSIVE_18_POSTS_ANALYSIS.md (18投稿総合)
├── INTERIM_22_POSTS_ANALYSIS.md (22投稿最新)
├── RANDOM_SAMPLING_ANALYSIS_GUIDE.md (手順詳細)
└── session-handover-complete-updated.md (全体像)
```

## 📊 分析結果記録先

### **継続分析結果記録ファイル**
```
新規作成: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/analysis-workspace/NEW_ANALYSIS_RESULTS.md

内容:
- 新規分析投稿詳細
- パターン発見事項
- 既存法則検証結果
- 新発見法則
```

### **分析済み投稿追加更新**
```
更新対象: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/analysis-workspace/ANALYSIS_PROGRESS_TRACKER.md

追加内容:
- 新規分析投稿ID
- 分析日
- 主な特徴
```

## 🎯 品質保証チェックリスト

### **分析開始前チェック**
- [ ] 全必読ドキュメント読了完了
- [ ] 分析済み投稿リスト確認完了
- [ ] 未分析投稿からランダム選択完了
- [ ] 4軸分析ファイル存在確認完了

### **分析実行中チェック**
- [ ] 4軸全ての分析結果読み取り完了
- [ ] 個別分析独立性維持
- [ ] 推測・解釈排除
- [ ] 投稿ID完全保持

### **分析完了後チェック**
- [ ] 詳細性絶対法則確認
- [ ] 新パターン発見記録
- [ ] 成功公式統合分析
- [ ] トラッカー更新完了

## 🚀 即座開始コマンド例

```bash
# 1. 分析済み確認
Read: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/analysis-workspace/ANALYSIS_PROGRESS_TRACKER.md

# 2. 未分析投稿選択（例：contents-053）
Read: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/page-structure/contents-053-structure.md
Read: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/beneficial-value/contents-053-value.md
Read: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/content-analysis/contents-053-content.md

# 3. 分析実行（上記フォーマット使用）

# 4. 結果記録
# NEW_ANALYSIS_RESULTS.mdに追記
# ANALYSIS_PROGRESS_TRACKER.mdに追加
```

## 💡 成功のポイント

1. **品質最優先**: 効率より精度を重視
2. **仮説汚染回避**: 事前期待を一切持たない
3. **個別分析徹底**: 統合分析は絶対禁止
4. **完全トレーサビリティ**: 投稿ID必須保持
5. **自然発見重視**: パターンの自然発生的記録

---

**このガイドに従えば、無駄なやり取りなく即座に高品質分析を開始・継続できます。**

**作成日**: 2025-07-19  
**目的**: 分析継続の完全自動化と品質保証  
**効果**: 新規分析者の即座実行可能性確保