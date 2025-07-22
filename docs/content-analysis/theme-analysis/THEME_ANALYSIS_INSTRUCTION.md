# テーマ分析実行指示書

## 🎯 目的
既存のInstagramコンテンツから「何について・どのように」を先入観なしで抽出・分析する

## 📚 必読ドキュメント（実行前必須）
1. **CLAUDE.md** - プロジェクト全体像とテンプレートマッチング設計思想
2. **NOTES.md** - 現在の開発状況と重要な連絡事項  
3. **dev/current-work-status.md** - 作業状況と開始方法

## 📂 読み込み対象（元のcontentソース）
以下のファイルから元のコンテンツを読み込み：
```
/mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/
├── contents-1-analysis.md
├── contents-2-analysis.md
├── contents-3-analysis.md
...
├── contents-100-analysis.md
```

**全100ファイルの個別contents分析ファイル**から読み込むこと

## 🔍 実行手順

### Phase 1: contents 1-20 (contents-1-analysis.md ~ contents-20-analysis.md)
### Phase 2: contents 21-40 (contents-21-analysis.md ~ contents-40-analysis.md)
### Phase 3: contents 41-60 (contents-41-analysis.md ~ contents-60-analysis.md)  
### Phase 4: contents 61-80 (contents-61-analysis.md ~ contents-80-analysis.md)
### Phase 5: contents 81-100 (contents-81-analysis.md ~ contents-100-analysis.md)

## 📋 各コンテンツから抽出する項目

### **基本情報**
- **Content ID**: contents-XXX
- **メインテーマ**: 何について話している？
- **サブテーマ**: 副次的に触れているトピック

### **表現分析**
- **プレゼンテーション手法**: どのように伝えている？
  - 例: ステップバイステップ、リスト形式、問題→解決、体験談等
- **具体的アプローチ**: どんな角度から？
  - 例: 初心者向け、効率化重視、失敗回避、実体験ベース等
- **キーメッセージ**: 何を伝えたい？
- **使用されている構造・フォーマット**

### **詳細分析例**
```
Excelがテーマの場合:
- Excelの何について？ → 関数、ショートカット、自動化、グラフ作成等
- どう伝えている？ → 手順解説、時短テクニック、失敗事例、before/after等  
- 何のために？ → 作業効率化、ミス削減、スキルアップ、時間節約等
```

## 🚨 抽出ルール

### **やるべきこと**
- ✅ 実際にそこに書かれていることだけを抽出
- ✅ 先入観や推測を排除
- ✅ 具体的な表現・手法・アプローチを記録
- ✅ パターンや傾向は後で分析（抽出段階では記録のみ）

### **やってはいけないこと**  
- ❌ 「こうあるべき」という先入観での分類
- ❌ 勝手にカテゴライズして情報を削る
- ❌ 推測や解釈の追加
- ❌ 抽象化や一般化

## 📊 記録フォーマット

```markdown
## Content-XXX

### 基本情報
- **メインテーマ**: 
- **サブテーマ**: 

### 表現分析
- **プレゼンテーション手法**: 
- **アプローチ**: 
- **キーメッセージ**: 
- **構造・フォーマット**: 

### 原文引用
- **重要な表現**: "[原文のまま引用]"
```

## 💾 保存場所

### **Phase別保存先**
```
/docs/content-analysis/theme-analysis/extraction/
├── phase1-contents001-020-themes.md
├── phase2-contents021-040-themes.md  
├── phase3-contents041-060-themes.md
├── phase4-contents061-080-themes.md
└── phase5-contents081-100-themes.md
```

### **統合結果**
```
/docs/content-analysis/theme-analysis/results/
├── theme-extraction-summary.md    # 全体サマリー
├── presentation-methods-analysis.md    # 表現手法分析
└── theme-approach-patterns.md    # テーマ×アプローチパターン
```

## 🔄 実行プロセス

1. **必読ドキュメント確認** - CLAUDE.md, NOTES.md, current-work-status.md
2. **Phase 1実行** - contents 1-20の抽出
3. **Phase 2-5順次実行** - 各20件ずつ
4. **統合分析** - パターン・傾向の分析
5. **結果保存** - 指定フォーマットで保存

## ⚠️ 注意事項

- **元のcontentsソースファイルを必ず確認**してから実行開始
- **先入観を完全に排除**して純粋に抽出のみ実行
- **分析・カテゴライズは抽出完了後**に別途実行
- **原文の表現を大切に**記録・保存

---

**作成日**: 2025-07-21  
**目的**: テーマの実態把握とプレゼンテーション手法の分析  
**実行者**: 指示書に従って段階的に実行