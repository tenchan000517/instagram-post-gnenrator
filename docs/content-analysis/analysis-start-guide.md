# 分析開始ガイド - 分析担当者必読

## 🚨 分析開始前に必読

### **1. 絶対のルール（全担当者共通）**
**📖 必読ドキュメント**: `docs/content-analysis/analysis-guidelines-for-analysts.md`

**重要事項:**
- 統合分析は絶対禁止
- 投稿IDは必ず保持
- 個別分析のみ実行
- 勝手な判断・解釈は禁止

### **2. 分析対象ディレクトリ**
**📁 分析対象**: `docs/content-analysis/`
- contents-1-analysis.md 〜 contents-100-analysis.md
- 各ファイルを1つずつ個別に分析
- 絶対に複数ファイルをまとめて分析しない

### **3. 分析結果の保存場所**
**📁 保存先**: `docs/content-analysis/results/`
```
results/
├── page-structure/     # ページ構成分析結果
├── beneficial-value/   # 有益性分析結果  
├── content-analysis/   # 投稿内容分析結果
└── persona-target/     # ペルソナ・ターゲット分析結果
```

## 分析タイプ別の担当者向け情報

### **A. ページ構成パターン分析担当**

#### **追加で読むべきドキュメント**
- `docs/content-analysis/correct-analysis-approach-memo.md`

#### **分析手順書**
- `docs/content-analysis/page-structure-analysis-manual.md`

#### **保存場所**
- `docs/content-analysis/results/page-structure/contents-XX-structure.md`

---

### **B. 有益性分析担当**

#### **追加で読むべきドキュメント**
- `docs/content-analysis/beneficial-value-analysis-framework-memo.md`

#### **分析手順書**
- `docs/content-analysis/beneficial-value-analysis-manual.md`

#### **保存場所**
- `docs/content-analysis/results/beneficial-value/contents-XX-value.md`

---

### **C. 投稿内容分析担当**

#### **追加で読むべきドキュメント**
- `docs/content-analysis/content-analysis-discussion-summary.md`

#### **分析手順書**
- `docs/content-analysis/content-analysis-manual.md`

#### **保存場所**
- `docs/content-analysis/results/content-analysis/contents-XX-content.md`

---

### **D. ペルソナ・ターゲット分析担当**

#### **追加で読むべきドキュメント**
- `docs/content-analysis/persona-target-analysis-framework.md`

#### **分析手順書**
- `docs/content-analysis/persona-target-analysis-manual.md`

#### **保存場所**
- `docs/content-analysis/results/persona-target/contents-XX-persona.md`

## 分析結果のファイル命名規則

### **ファイル名形式**
```
contents-[投稿番号]-[分析タイプ].md

例:
contents-001-structure.md    # ページ構成分析
contents-001-value.md        # 有益性分析
contents-001-content.md      # 投稿内容分析
contents-001-persona.md      # ペルソナ分析
```

### **ファイル内の必須項目**
```markdown
# [分析タイプ]分析結果

## 投稿ID
contents-XXX

## 分析対象ファイル
docs/content-analysis/contents-XXX-analysis.md

## 分析結果
[詳細な分析内容]

## 分析根拠
[どの部分から判断したかの根拠]
```

## 品質チェック

### **提出前チェックリスト**
- [ ] 投稿IDは正しく記録されているか
- [ ] 統合分析になっていないか  
- [ ] ガイドラインに従っているか
- [ ] ファイル命名規則は正しいか
- [ ] 分析根拠は明確か

### **データの整合性**
- 各投稿につき4つの分析結果ファイルが作成される
- 合計400個のファイルが生成される予定
- 投稿IDで後日統合分析を実行

## 疑問・相談がある場合

### **判断に迷った場合**
- 勝手に判断せず確認を取る
- フレームワークから外れる場合は相談
- 一貫性を保つための基準統一が重要

### **技術的な問題**
- ファイルアクセスできない
- 保存場所が不明
- ドキュメントが見つからない

---

**このガイドに従って分析を開始してください。品質を落とすことは分析全体の価値を無にします。**