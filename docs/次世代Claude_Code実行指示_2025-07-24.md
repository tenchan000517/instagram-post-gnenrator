# 次世代Claude Code実行指示書【強化版】

**作成日**: 2025-07-24  
**目的**: 116ナレッジ完全独立分析の実行  
**前提**: `/mnt/c/instagram-course/instagram-post-generator/docs/116ナレッジ完全独立分析計画書_2025-07-24.md`を必読

---

## 🚨 **過去の失敗を繰り返さないための警告**

### **前回発生した致命的ミス**
1. **分析の目的を履き違え** → 104個の個別ファイル作成を想定
2. **Phase分離を無視** → Phase 1で統合・サマリーを実施
3. **計画書の曲解** → 「作成すべきもの」を即座実装と誤解
4. **品質検証不備** → 実用性のない分析記録を大量生成

### **根本原因**
- **Phase 1の目的**: パターン化のための材料収集（分析記録作成）
- **Phase 2の目的**: 客観的サマリーとグルーピング分析
- **Phase 3の目的**: 実際のファイル作成（数種類のテンプレートのみ）

**Phase 1は実装ではなく、分析記録の蓄積が目的**

---

## 🎯 **30個ずつセッション実行フロー**

### **セッション1: K001-K030（30個）**
```
**過去の失敗を繰り返さないための警告**:
- Phase 1の目的: パターン化のための材料収集（分析記録作成）
- Phase 1は実装ではなく、分析記録の蓄積が目的
- 104個の個別ファイル作成を想定してはいけない
- Phase 1で統合・サマリーを実施してはいけない

**実行指示**:
K001からK030まで30個のナレッジの完全独立分析を実行してください。

**前提必読**:
`/mnt/c/instagram-course/instagram-post-generator/docs/116ナレッジ完全独立分析計画書_2025-07-24.md`を必読

**必須遵守条件**:
- 計画書`116ナレッジ完全独立分析計画書_2025-07-24.md`の完全遵守
- 10個分析した時点でコマメに保存しろ
- 各ナレッジを完全に独立して分析（他との比較・統合は絶対禁止）
- 既存テンプレートという概念を一切持ち込まない
- 分析記録の作成が目的（実装ファイル作成ではない）

**分析対象範囲**:
K001, K002, K003, K004, K005, K006, K007, K008, K009, K010, K011, K012, K016, K017, K018, K021, K022, K023, K024, K025, K026, K027, K028, K029, K030

**存在しないナレッジ（スキップ）**:
K013, K014, K015（別場所に存在）, K019, K020（完全に存在しない）

**データ参照先**:
- ナレッジデータ: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/Kxxx.json`
- 観察データ: `/mnt/c/instagram-course/instagram-post-generator/docs/raw-analysis/contents-xxx-observation.json`

**分析対象ページ**:
✅ 含む: カバーページ、中間ページ（メインコンテンツ）、投稿内容に直結した具体的アクション
❌ 除外: アカウント紹介ページ、別投稿紹介ページ、プレゼント企画ページ、投稿内容と無関係な一般的CTA

**出力形式**:
30個の個別分析記録（計画書の記録フォーマット使用）

**30個完了時の保存**:
`/docs/phase1-analysis/session1-K001-K030-analysis.md` として保存

**絶対遵守ルール**:
- ❌ 実装ファイルの作成
- ❌ パターンの発見・分類  
- ❌ テンプレートコンポーネントの設計
- ❌ 他のナレッジとの比較
- ❌ 効率化のための統合処理
- ❌ 類似パターンでの一括処理
- ❌ 「作成すべきもの」を即座実装と解釈
- ❌ 104個の個別ファイル作成を想定
- ✅ 分析記録の蓄積（Phase 2の材料作り）
- ✅ 1ナレッジ = 1独立分析の徹底
- ✅ Phase 1は材料収集、Phase 2でグルーピング、Phase 3で実装
```

---

### **セッション2: K031-K060（30個）**
```
**過去の失敗を繰り返さないための警告**:
- Phase 1の目的: パターン化のための材料収集（分析記録作成）
- Phase 1は実装ではなく、分析記録の蓄積が目的
- 104個の個別ファイル作成を想定してはいけない
- Phase 1で統合・サマリーを実施してはいけない

**実行指示**:
K031からK060まで30個のナレッジの完全独立分析を実行してください。

**必須遵守条件**:
- セッション1と同じ品質レベルで完全独立分析
- 各ナレッジを他のナレッジと比較・統合せず、そのナレッジ単体の事実のみを記録
- 既存テンプレートという概念を一切持ち込まない
- セッション1の結果は一切参照しない

**分析対象範囲**:
K031, K032, K033, K034, K035, K036, K037, K038, K039, K040, K041, K042, K043, K044, K045, K046, K047, K048, K049, K050, K051, K052, K053, K054, K055, K056, K057, K058, K059, K060

**データ参照先**:
- ナレッジデータ: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/Kxxx.json`
- 観察データ: `/mnt/c/instagram-course/instagram-post-generator/docs/raw-analysis/contents-xxx-observation.json`

**分析対象ページ**:
✅ 含む: カバーページ、中間ページ（メインコンテンツ）、投稿内容に直結した具体的アクション
❌ 除外: アカウント紹介ページ、別投稿紹介ページ、プレゼント企画ページ、投稿内容と無関係な一般的CTA

**出力形式**:
30個の個別分析記録（計画書の記録フォーマット使用）

**30個完了時の保存**:
`/docs/phase1-analysis/session2-K031-K060-analysis.md` として保存

**絶対遵守ルール**:
- ❌ 実装ファイルの作成
- ❌ パターンの発見・分類  
- ❌ テンプレートコンポーネントの設計
- ❌ 他のナレッジとの比較
- ❌ 効率化のための統合処理
- ❌ 類似パターンでの一括処理
- ❌ セッション1との比較・統合
- ❌ 「作成すべきもの」を即座実装と解釈
- ❌ 104個の個別ファイル作成を想定
- ✅ 分析記録の蓄積（Phase 2の材料作り）
- ✅ 1ナレッジ = 1独立分析の徹底
- ✅ Phase 1は材料収集、Phase 2でグルーピング、Phase 3で実装
```

---

### **セッション3: K061-K116（44個）**
```
**過去の失敗を繰り返さないための警告**:
- Phase 1の目的: パターン化のための材料収集（分析記録作成）
- Phase 1は実装ではなく、分析記録の蓄積が目的
- 104個の個別ファイル作成を想定してはいけない
- Phase 1で統合・サマリーを実施してはいけない

**実行指示**:
K001からK030まで30個のナレッジの完全独立分析を実行してください。

**前提必読**:
`/mnt/c/instagram-course/instagram-post-generator/docs/116ナレッジ完全独立分析計画書_2025-07-24.md`を必読

**必須遵守条件**:
- 計画書`116ナレッジ完全独立分析計画書_2025-07-24.md`の完全遵守
- 10個分析した時点でコマメに保存しろ
- 各ナレッジを完全に独立して分析（他との比較・統合は絶対禁止）
- 既存テンプレートという概念を一切持ち込まない
- 分析記録の作成が目的（実装ファイル作成ではない）

**実行指示**:
K081からK116までのナレッジの完全独立分析を実行してください。

**必須遵守条件**:
- セッション1・2と同じ品質レベルで完全独立分析
- 各ナレッジを他のナレッジと比較・統合せず、そのナレッジ単体の事実のみを記録
- 既存テンプレートという概念を一切持ち込まない
- 過去セッションの結果は一切参照しない

**分析対象範囲**:
K081, K082, K083, K084, K085, K086, K087, K088, K089, K090, K091, K092, K093, K096, K097, K098, K099, K100, K101, K102, K103, K104, K105, K106, K107, K108, K109, K110, K111, K112, K113, K114, K115, K116

**存在しないナレッジ（スキップ）**:
K094, K095

**データ参照先**:
- ナレッジデータ: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/Kxxx.json`
- 観察データ: `/mnt/c/instagram-course/instagram-post-generator/docs/raw-analysis/contents-xxx-observation.json`

**分析対象ページ**:
✅ 含む: カバーページ、中間ページ（メインコンテンツ）、投稿内容に直結した具体的アクション
❌ 除外: アカウント紹介ページ、別投稿紹介ページ、プレゼント企画ページ、投稿内容と無関係な一般的CTA

**出力形式**:
44個の個別分析記録（計画書の記録フォーマット使用）

**44個完了時の保存**:
`/docs/phase1-analysis/session3-K061-K116-analysis.md` として保存

**絶対遵守ルール**:
- ❌ 実装ファイルの作成
- ❌ パターンの発見・分類  
- ❌ テンプレートコンポーネントの設計
- ❌ 他のナレッジとの比較
- ❌ 効率化のための統合処理
- ❌ 類似パターンでの一括処理
- ❌ 過去セッションとの比較・統合
- ❌ 「作成すべきもの」を即座実装と解釈
- ❌ 104個の個別ファイル作成を想定
- ✅ 分析記録の蓄積（Phase 2の材料作り）
- ✅ 1ナレッジ = 1独立分析の徹底
- ✅ Phase 1は材料収集、Phase 2でグルーピング、Phase 3で実装
```

---

## 🔄 **セッション完了後の次ステップ**

### **全3セッション完了後**
```
**Phase 2実行指示**:
セッション1-3で作成した104個の分析記録を材料として、Phase 2の客観的サマリー作成を実行してください。

**参照ファイル**:
C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session1-K001-K010-analysis.md
C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session1-K011-K018-analysis.md
C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session1-K021-K030-analysis.md
C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session2-K031-K059-analysis.md
C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session3-K061-K080-analysis.md
C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session3-K091-K100-analysis.md
C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session3-K101-K110-analysis.md
C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session3-K111-K116-analysis.md

**Phase 2の目的**:
- 104個の分析記録を客観的に整理
- 事実のみの一覧・分類表示作成
- パターン化協議のための基礎資料準備

**Phase 2完了後**:
サマリー確認後にパターン化の方向性を協議決定
```

---

## 🚨 **絶対遵守ルール（再確認）**

### **Phase 1の目的を履き違えるな**
- ❌ 実装ファイルの作成
- ❌ パターンの発見・分類
- ❌ テンプレートコンポーネントの設計
- ✅ 分析記録の蓄積（Phase 2の材料作り）

### **分析の独立性を破るな**
- ❌ 他のナレッジとの比較
- ❌ 効率化のための統合処理
- ❌ 類似パターンでの一括処理
- ✅ 1ナレッジ = 1独立分析の徹底

### **計画書の曲解をするな**
- ❌ 「作成すべきもの」を即座実装と解釈
- ❌ 104個の個別ファイル作成を想定
- ✅ Phase 3での数種類テンプレート作成が最終目標
- ✅ Phase 1は材料収集、Phase 2でグルーピング、Phase 3で実装

---

**この強化指示書に従い、過去の失敗を繰り返すことなく、正確なPhase 1分析を30個ずつ3セッションで実行してください。**

C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session1-K001-K010-intermediate-analysis.md
  C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session2-K031-K059-analysis.md
  C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session3-K061-K080-partial.md
  C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session3-K091-K100-analysis.md
  C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session3-K101-K110-analysis.md
  C:\instagram-course\instagram-post-generator\docs\phase1-analysis\session3-K111-K116-analysis.md　　現在こちらの分析を行ったので
  すが、分析結果にバラつきがあり、フォーマットと記載内容が異なっています　基本的に正しいのは　C:\instagram-course\instagram-post-g
  enerator\docs\phase1-analysis\session3-K111-K116-analysis.md このパターンものが正しいです　データの参照先は- 観察データ: 
  `/mnt/c/instagram-course/instagram-post-generator/docs/raw-analysis/contents-xxx-observation.json` 
  こちらです　正しい記載内容じゃないものは正しく修正してもらえますか？　C:\instagram-course\instagram-post-g  │
  │   enerator\docs\phase1-analysis\session3-K111-K116-analysis.md　この正しいパターンを参考にしてください