# 全ランキング完全作成マスタープラン - 実行プロンプト集

**作成日**: 2025-08-25  
**目的**: 提案された全ランキングを100%確実に作成する  
**ゴール**: 40種類のランキング（キャプション・ハッシュタグ付き）完成

---

## 📋 STEP 1: 既存データベースの最適化と分割

### プロンプト1-1: データベース構造の簡略化

```markdown
あなたはデータベース最適化の専門家です。

【タスク】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/habit-behavior-database.json
を読み込み、以下の最適化を実施してください。

【最適化内容】
1. characterRecommendationフィールドを全て削除
2. 以下の必須フィールドのみ残す：
   - habitId
   - habitName
   - shortDescription
   - effectiveness (overallScore, productivity, wellbeing, career, learning)
   - practiceRate
   - evidence (primarySourceのみ)
   - implementation (difficulty, cost, timeRequired)
   - targetPersona

3. 新規フィールド追加：
   - tags: [] (空配列で初期化)
   - timeOfDay: "朝/昼/夜/随時"
   - immediacy: 1-100 (即効性スコア、overallScoreと同値で初期化)

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/optimized-habit-db.json
```

---

## 📋 STEP 2: テーマ別データベース作成

### プロンプト2-1: 業界別習慣データベース作成

```markdown
あなたは業界研究とエビデンスベースの習慣分析の専門家です。

【タスク】
以下の5業界それぞれに最適な習慣を10個ずつリサーチし、統合データベースを作成してください。

【対象業界】
1. 金融業界
2. 医療業界
3. 製造業
4. IT・スタートアップ
5. クリエイティブ業界

【リサーチ方法】
各業界について：
1. その業界で成功している人の共通習慣を特定
2. 業界特有の課題を解決する習慣を発見
3. エビデンスレベルA/Bの情報源から抽出

【データ構造】
```json
{
  "industryHabits": {
    "金融": [
      {
        "habitName": "市場オープン前の情報収集",
        "score": 95,
        "difficulty": "中",
        "cost": "無料",
        "timeRequired": "朝30分",
        "evidence": "金融庁調査2024",
        "benefit": "判断精度40%向上",
        "tags": ["金融", "朝型", "情報収集"]
      }
    ],
    "医療": [...],
    "製造業": [...],
    "IT・スタートアップ": [...],
    "クリエイティブ": [...]
  }
}
```

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/industry-habits-db.json
```

### プロンプト2-2: 効果別習慣データベース作成

```markdown
あなたは生産性とウェルビーイング研究の専門家です。

【タスク】
optimized-habit-db.jsonから効果別に習慣を分類し、4つの特化型データベースを作成してください。

【分類基準と作成DB】
1. productivity-habits-db.json
   - productivityスコア85点以上の習慣を抽出
   - 上位15習慣を選定

2. wellbeing-habits-db.json
   - wellbeingスコア85点以上の習慣を抽出
   - 上位15習慣を選定

3. career-habits-db.json
   - careerスコア85点以上の習慣を抽出
   - 上位15習慣を選定

4. learning-habits-db.json
   - learningスコア85点以上の習慣を抽出
   - 上位15習慣を選定

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/effect-dbs/
配下に各ファイルを保存
```

### プロンプト2-3: 特殊テーマ習慣データベース作成

```markdown
あなたは最新トレンドと働き方改革の専門家です。

【タスク】
以下の5つの特殊テーマについて、各10習慣をリサーチしてデータベース化してください。

【テーマと視点】
1. AIツール活用習慣
   - ChatGPT、Claude、Copilot等の活用法
   - 自動化による効率化
   - AI時代の必須スキル

2. リモートワーク成功習慣
   - 在宅勤務の生産性向上
   - オンラインコミュニケーション
   - ワークライフバランス

3. グローバル人材習慣
   - 異文化対応力
   - 英語学習の習慣化
   - タイムゾーン管理

4. チームリーダー習慣
   - 1on1の実施方法
   - 心理的安全性の構築
   - フィードバック文化

5. イノベーション創出習慣
   - アイデア発想法
   - 実験的アプローチ
   - 失敗からの学習

【データ構造】
```json
{
  "specialThemes": {
    "AIツール活用": [...],
    "リモートワーク": [...],
    "グローバル": [...],
    "リーダーシップ": [...],
    "イノベーション": [...]
  }
}
```

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/special-themes-db.json
```

### プロンプト2-4: 難易度別・コスト別データベース作成

```markdown
あなたは習慣実装の専門家です。

【タスク】
optimized-habit-db.jsonの習慣を難易度とコストで分類してください。

【分類と抽出】
1. easy-habits-db.json（今日から始められる）
   - difficulty: "低"の習慣全て
   - cost: "無料"を優先
   - TOP10を選定

2. medium-habits-db.json（1週間で身につく）
   - difficulty: "中"の習慣全て
   - 実装期間7-21日のもの
   - TOP10を選定

3. hard-habits-db.json（上級者向け）
   - difficulty: "高"の習慣全て
   - 効果スコア90点以上優先
   - TOP10を選定

4. free-habits-db.json（無料習慣）
   - cost: "無料"の習慣全て
   - 効果スコア順
   - TOP10を選定

5. premium-habits-db.json（投資価値あり）
   - cost: "高額"でも効果95点以上
   - ROI計算を追加
   - TOP10を選定

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/difficulty-cost-dbs/
配下に各ファイルを保存
```

### プロンプト2-5: 時間帯別・年代別データベース作成

```markdown
あなたはライフスタイルと年代別キャリアの専門家です。

【タスク】
時間帯別および年代別の習慣データベースを作成してください。

【時間帯別分類】
1. morning-habits-db.json
   - 朝5-9時に実施する習慣
   - 朝のゴールデンタイム活用系
   - TOP10選定

2. night-habits-db.json
   - 夜20時以降に実施する習慣
   - 振り返り、準備、リラックス系
   - TOP10選定

3. anytime-habits-db.json
   - 隙間時間で実施可能
   - 5-15分で完結
   - TOP10選定

【年代別分類】
1. twenties-habits-db.json（20代向け）
   - 基礎スキル構築
   - 人脈形成
   - 学習習慣

2. thirties-habits-db.json（30代向け）
   - マネジメントスキル
   - 専門性深化
   - ワークライフバランス

3. forties-habits-db.json（40代向け）
   - エグゼクティブスキル
   - メンタリング
   - 健康管理

4. fifties-habits-db.json（50代以降）
   - 知識継承
   - セカンドキャリア
   - 健康維持

【各年代10習慣、リサーチベースで新規作成も可】

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/time-age-dbs/
配下に各ファイルを保存
```

---

## 📋 STEP 3: ランキング自動生成システムの実装

### プロンプト3-1: 統合ランキング生成システム構築

```markdown
あなたはランキング生成システムの開発者です。

【タスク】
全データベースに対応した統合ランキング生成システムを構築してください。

【システム要件】
1. 入力：テーマ名、使用DB指定
2. 処理：
   - 指定DBから関連習慣を抽出
   - スコア順にソート
   - TOP10選定
   - KIKUYO口調で記述
3. 出力：
   - ランキング本体
   - フック（マニュアル準拠）
   - ターゲット（マニュアル準拠）
   - キャプション（マニュアル準拠）
   - ハッシュタグ（マニュアル準拠）

【作成ファイル】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/統合ランキング生成_起動術式.md

【内容】
- 全DB対応のフレキシブルな設計
- STEP1-7の完全実装
- エラーハンドリング付き
```

---

## 📋 STEP 4: 40種類ランキングの一括生成

### プロンプト4-1: 業界別ランキング5種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
industry-habits-db.jsonを使用して、以下5つのランキングを作成してください。

【作成ランキング】
1. 金融業界で成功する習慣TOP10
2. 医療業界プロフェッショナル習慣TOP10
3. 製造業マネージャー必須習慣TOP10
4. スタートアップ起業家習慣TOP10
5. クリエイティブ職習慣TOP10

【各ランキングに必須要素】
- フック（その業界の痛みを突く一文）
- ターゲット（その業界の具体的な悩みを持つ人）
- キャプション（KIKUYO口調でデータ強調）
- ハッシュタグ12個（業界特化タグ含む）

【参照マニュアル】
- /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/manuals/コンテンツ作成マニュアル/10_キャプション・ハッシュタグ生成マニュアル_2025-08-23.md
- /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/manuals/コンテンツ作成マニュアル/02_ターゲット作成マニュアル_2025-08-22.md
- /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/manuals/コンテンツ作成マニュアル/03_フック作成マニュアル_2025-08-22.md

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/industry/
配下に各ファイル保存
```

### プロンプト4-2: 効果別ランキング4種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
effect-dbs/配下の4つのDBを使用して、以下のランキングを作成してください。

【作成ランキング】
1. 生産性最大化習慣TOP10（productivity-habits-db.json使用）
2. ウェルビーイング向上習慣TOP10（wellbeing-habits-db.json使用）
3. キャリア成長加速習慣TOP10（career-habits-db.json使用）
4. 学習効率化習慣TOP10（learning-habits-db.json使用）

【各ランキング必須要素】
- フック（効果の数値を強調）
- ターゲット（その効果を求める具体的な人）
- キャプション（エビデンスとデータ中心）
- ハッシュタグ12個

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/effects/
```

### プロンプト4-3: 難易度別ランキング3種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
difficulty-cost-dbs/配下のDBを使用して、以下のランキングを作成してください。

【作成ランキング】
1. 今日から始められる簡単習慣TOP10（easy-habits-db.json）
2. 1週間で身につく中級習慣TOP10（medium-habits-db.json）
3. 上級者向けハード習慣TOP10（hard-habits-db.json）

【フック例】
- 簡単：「今から30分で人生変わるなのです」
- 中級：「1週間後のあなたは別人なのです」
- 上級：「これができたら上位1%なのです」

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/difficulty/
```

### プロンプト4-4: コスト別ランキング3種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
difficulty-cost-dbs/配下のDBを使用して、以下のランキングを作成してください。

【作成ランキング】
1. 無料で始められる習慣TOP10（free-habits-db.json）
2. 投資価値の高い有料習慣TOP10（premium-habits-db.json）
3. コスパ最強習慣TOP10（効果/コスト比で再計算）

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/cost/
```

### プロンプト4-5: 時間帯別ランキング3種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
time-age-dbs/配下のDBを使用して、以下のランキングを作成してください。

【作成ランキング】
1. 朝型人間の最強習慣TOP10（morning-habits-db.json）
2. 夜型人間の生産性習慣TOP10（night-habits-db.json）
3. 隙間時間活用習慣TOP10（anytime-habits-db.json）

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/time/
```

### プロンプト4-6: 年代別ランキング4種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
time-age-dbs/配下のDBを使用して、以下のランキングを作成してください。

【作成ランキング】
1. 20代で身につけるべき習慣TOP10（twenties-habits-db.json）
2. 30代管理職の必須習慣TOP10（thirties-habits-db.json）
3. 40代エグゼクティブ習慣TOP10（forties-habits-db.json）
4. 50代以降のキャリア維持習慣TOP10（fifties-habits-db.json）

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/age/
```

### プロンプト4-7: 特殊ランキング5種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
special-themes-db.jsonを使用して、以下のランキングを作成してください。

【作成ランキング】
1. AIツール活用習慣TOP10
2. グローバル人材習慣TOP10
3. チームリーダー必須習慣TOP10
4. リモートワーク成功習慣TOP10
5. イノベーション創出習慣TOP10

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/special/
```

### プロンプト4-8: Tier表・マトリックス4種作成

```markdown
あなたはデータビジュアライゼーションとKIKUYO分析の専門家です。

【タスク】
全データベースを統合分析して、以下の4つのTier表/マトリックスを作成してください。

【作成物】
1. 習慣効果×実践難易度マトリックス（S/A/B/C/Dランク）
   - 縦軸：効果（100-80-60-40-20）
   - 横軸：難易度（低・中・高）
   - 9マスに習慣を配置

2. ペルソナ別習慣Tierリスト
   - 経営者向けS/A/B/C/D
   - 管理職向けS/A/B/C/D
   - 若手向けS/A/B/C/D
   - フリーランス向けS/A/B/C/D

3. 即効性×持続性習慣分類表
   - 即効型（1週間以内に効果）
   - 中期型（1ヶ月で効果）
   - 長期型（3ヶ月以上）

4. 習慣の相乗効果マップ
   - 組み合わせると効果2倍の習慣ペア
   - 相性の良い3習慣セット
   - 最強の5習慣コンボ

【形式】
Markdownテーブル形式で視覚的に作成

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/matrix/
```

---

## 📋 STEP 5: 品質保証と最終確認

### プロンプト5-1: 全ランキング品質チェック

```markdown
あなたは品質管理の専門家です。

【タスク】
作成された全40ランキングの品質チェックを実施してください。

【チェック項目】
1. フォーマット確認
   - ランキング本体（TOP10完備）
   - フック（ドキッとする一文）
   - ターゲット（具体的な悩み）
   - キャプション（2000文字以内）
   - ハッシュタグ（12個）

2. KIKUYO口調確認
   - 「〜なのです」統一
   - データ・エビデンス強調
   - 論理的な構成

3. マニュアル準拠確認
   - キャプション構成
   - ハッシュタグ4+4+4構成
   - 固定部分の配置

【不合格の場合】
修正箇所を明記して再生成指示

【最終レポート作成】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/
40ランキング完成報告書_2025-08-25.md
```

### プロンプト5-2: マスターINDEX作成

```markdown
あなたはドキュメント管理の専門家です。

【タスク】
完成した全40ランキングのマスターINDEXを作成してください。

【INDEX内容】
# KIKUYOランキング完全INDEX

## 業界別（5種）
1. [金融業界で成功する習慣TOP10](リンク)
2. [医療業界プロフェッショナル習慣TOP10](リンク)
...

## 効果別（4種）
...

## 難易度別（3種）
...

## コスト別（3種）
...

## 時間帯別（3種）
...

## 年代別（4種）
...

## 特殊テーマ（5種）
...

## Tier表・マトリックス（4種）
...

## 既存ランキング（31種）
...

**総計：71ランキング完成**

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/MASTER_INDEX.md
```

---

## 🎯 実行順序と所要時間

1. **STEP 1**: データベース最適化（30分）
2. **STEP 2**: テーマ別DB作成（各30分×5セット = 2.5時間）
3. **STEP 3**: 生成システム構築（30分）
4. **STEP 4**: 40ランキング作成（各10分×40 = 6.5時間）
5. **STEP 5**: 品質チェック・INDEX作成（30分）

**総所要時間**: 約10時間（集中作業時）

## ✅ 成功の保証

このプロンプト集を上から順に実行すれば：
- データベースの膨張を避けつつ
- 全40種類のランキングが作成され
- 各ランキングにフック・ターゲット・キャプション・ハッシュタグが付与され
- KIKUYO専用の品質基準を満たした
- 即座に投稿可能な状態で完成します

**実行開始**: プロンプト1-1から順番に実行してください。