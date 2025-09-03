# Type003 KIKUYO マスタープロンプト

**目的**: 企業ランキングJSONからType003投稿を生成するための完全情報  
**対象**: Claude Code（セッション変更対応）  
**基準**: 暗黙知完全排除、K800.json同等品質  
**参考ファイル**: /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K800.json

---

## 🎯 基本情報

### キャラクター: KIKUYO
- 天然だが優秀なデータサイエンティスト
- 語尾: 「なのです」「ですよ」
- トーン: 客観的・分析的
- 特徴: データを重視した表現
- 対象ターゲット: T013（就活生）
- 対応JSONディレクトリ: jobSeekers/JSxxx系

## 🤖 自動判定システム

### ユーザー指示→JSON自動判定ロジック
```
指示キーワード判定:
「初任給」「新卒」「就活」→ JS001_初任給ランキングTOP10.json
「ホワイト企業」「働きやすい」→ JS003_年間休日数ランキングTOP10.json
「安定」「離職率」→ JS004_3年離職率が低い企業TOP10.json
「福利厚生」→ JS005系
「業界別」→ 該当業界JS系ファイル

判定プロセス:
1. ユーザー指示からキーワード抽出
2. キーワード→JSONファイル自動マッピング
3. /mnt/c/instagram-course/instagram-post-generator/app/data/companyDatabase/rankings/jobSeekers/配下から該当ファイル特定
4. ファイル存在確認・読み込み
```

### 保存先自動決定システム
```
KIKUYO（就活生系）保存先ルール:
- K80x番台を使用（K801, K802, K803...）
- 既存ファイル確認→次の空き番号自動割り当て
- 例: JS001 → K801, JS003 → K803, JS004 → K804

自動ファイル名生成:
1. /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/配下確認
2. K80x番台の最大番号取得
3. +1して新しいファイル名決定
4. 重複回避チェック
```

### テンプレート: unified-template-11-company-ranking
- **テンプレート仕様**: /mnt/c/instagram-course/instagram-post-generator/app/services/knowledgeBase/data/pageStructures/unified/unified-template-11-company-ranking.json
- 8ページ構成（TOP10企業の場合）
- Page1: basic_intro
- Page2: ranking_display  
- Page3-7: enhanced_company_detail（2社ずつdual表示）
- Page8: resource_summary

### 最重要制限: keyHighlights
- **全項目7文字以内必須**
- 例: 「住宅手当」「交通費」「年休125日」
- NG: 「住宅手当支給」「交通費全額」

---

## 📋 データ構造理解

### 入力: 企業ランキングJSON
```javascript
{
  "id": "JS001",
  "name": "初任給ランキングTOP10",
  "target": "就活生",
  "ranking": [
    {
      "rank": 1,
      "name": "企業名",
      "value": 700000,
      "formattedValue": "70万円",
      "metrics": {
        "initialSalary": 700000,
        "salary": 16360000,
        "overtime": 13.3,
        "holidays": null,
        "employees": 1100
      },
      "features": {
        "businessModel": "事業概要",
        "specialization": "専門分野",
        "workStyle": "働き方",
        "growth": "成長機会"
      },
      "welfare": {
        "housingAllowance": "住宅手当情報",
        "uniqueBenefits": "独自福利厚生",
        "welfareGrade": "S"
      },
      "description": "企業説明"
    }
  ]
}
```

### 出力: Type003投稿JSON（K800.json形式）
```javascript
{
  "source": "contents-ranking-xxx",
  "problemCategory": "就活・転職支援",
  "knowledgeId": "Kxxx",
  "postType": "003",
  "pageCount": 8,
  "pageStructurePattern": "unified-template-11-company-ranking",
  "targetIds": ["T013"],
  "detailedContent": {
    "page1": { "section": "introduction", "template": "basic_intro", "content": {...} },
    "page2": { "section": "ranking", "template": "ranking_display", "content": {...} },
    "page3": { "section": "mainContent", "template": "enhanced_company_detail", "content": {...} },
    // ...
    "page8": { "section": "summary", "template": "resource_summary", "content": {...} }
  }
}
```

---

## 🛠️ データ変換ルール

### JSON → Type003項目マッピング

#### Page1: basic_intro
```
JSON.name → content.title
"初任給ランキングTOP10" → "初任給が高い企業TOP10"

targetAudience → 疑問形式
"初任給って実際どのくらいもらえるの？"

problems → ランキングテーマ対応3項目
["初任給の高い企業がどこかわからない", "企業選びで給与面を重視したい", "将来の生活設計のため初任給を知りたい"]

additionalMessage → 30-40文字、KIKUYO口調
"2025年度最新データで客観的ランキングなのです！企業選びをサポートするのです"
```

#### Page2: ranking_display
```
JSON.ranking[0-9] → content.items
rank → rank
name → name
formattedValue → primaryValue
metrics補足情報 → secondaryValue
features.specialization → description
features.businessModel → category
```

#### Page3-7: enhanced_company_detail
```
displayMode: "dual" 固定

企業基本情報:
JSON.name → companyName
JSON.rank → rankInfo.rank
JSON.formattedValue → rankInfo.score

キーメトリクス:
metrics.initialSalary → keyMetrics.initialSalary（万円表示）
metrics.salary → keyMetrics.averageSalary（万円表示）
metrics.overtime → keyMetrics.overtime（"月xx時間"）
metrics.holidays → keyMetrics.holidays（"年xx日"）

パラメーターグラフ（0-100）:
salary: 年収ベース（最高2000万=100）
benefits: welfareGradeベース（S=100, A=80, B=60）
workLifeBalance: 残業時間逆算（0時間=100, 80時間=0）
growth: 業界・企業規模から算出
stability: 従業員数・設立年から算出

企業特徴:
features.businessModel → features.industry
metrics.employees → features.employees（"x,xxx人"）
設立年推定 → features.established
本社推定 → features.headquarters

詳細情報:
features.specialization + businessModel → details.overview（400文字以内）
職種推定 → details.recruitment配列
welfare.uniqueBenefits → details.benefits配列
welfare全般 → details.uniqueFeatures配列
福利厚生要約 → details.keyHighlights配列（**7文字以内必須**）
```

#### Page8: resource_summary
```
title → ランキングタイトル
"IT業界年収TOP10"等

summaryPoints → 3項目、KIKUYO口調
["外資系テック企業が上位独占、1000万円超が当たり前なのです", "国内企業ではPFN・メルカリが高年収、AI技術が評価される時代なのです", "従来のSI企業も安定高年収、バランスが重要な選択基準なのです"]

databaseImage → 固定
"KIKUYO_DATABASE.png"

finalMessage → KIKUYO特性励ましメッセージ（改行\n使用）
"データ分析の結果、xxx点が重要ということが分かったのです。\n働きやすさ・成長機会も含めて総合判断が大切なのです。\n皆さんらしいキャリアを築くために応援しているのです！"

characterImage → 固定
"kikuyo_point.png"

characterPosition → 固定
"right"

※resourceListは削除（新フォーマットでは不要）
```

---

## 🎭 キャプション・ハッシュタグ生成

### **必須参照マニュアル**
```
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/manuals/コンテンツ作成マニュアル/10_キャプション・ハッシュタグ生成マニュアル_2025-08-23.md

上記マニュアルを必ず読み込み、以下の点を完全準拠すること：
- 完全な固定フォーマット使用（掴み文→@find_to_do→構造化補足→コミュニティ誘導→ハッシュタグ）
- キャラクター別掴み文パターン準拠
- 構造化された投稿補足説明（15行程度）作成
- ハッシュタグ戦略システム（4+4+4構成・12個）準拠
- 品質チェック基準完全クリア
```

### KIKUYO掴み文パターン（マニュアル準拠）
```
パターン1: データ分析型
「[ランキングテーマ]を調べてみたのです。」
「データ分析してみたところ、[結果]なのです。」

パターン2: ランキング発表型  
「[テーマ]ランキングを作成したのです。」
「[業界/項目]を客観的に分析してみたのです。」

パターン3: 発見共有型
「面白い傾向を発見したのです。」
「データで見ると意外な結果が出たのです。」

※マニュアルの「基本戦略」「掴み文パターン」に完全準拠すること
```

### 投稿補足説明（マニュアル完全準拠）
```
▶ [ランキング結果の背景分析]（3行程度）
具体的数値とその意味、業界傾向の解説
※マニュアルの「正しい補足説明の思考プロセス」に従う

▶ [企業選びのポイント解説] 
  ① [ポイント1]（3行程度）
  なぜ重要なのか・どう判断するかの補足
  ※「なぜ」と「どうすれば」の深掘り必須
  
  ② [ポイント2]（3行程度）
  なぜ重要なのか・どう判断するかの補足
  
  ③ [ポイント3]（3行程度）
  なぜ重要なのか・どう判断するかの補足

▶ [データサイエンティスト視点のアドバイス]（3行程度）
KIKUYOからの客観的で温かい激励メッセージ
※マニュアルの「キャラクターの言葉で伝える」に準拠

※絶対禁止事項：根拠のない数字、価値観の押し付け、薄っぺらい内容
```

### Type003ハッシュタグ（マニュアル完全準拠）
```
マニュアルのハッシュタグ戦略システム（4+4+4構成・12個）に完全準拠

大カテゴリ（4個・投稿タイプ別）:
- 003（業界情報・キャリア系）: #キャリア #仕事 #転職 #成長

中カテゴリ（4個・ターゲット属性別）:
- 就活生: #学生 #就職活動 #自己啓発 #モチベーション
- 女性キャリア: #ワーママ #働く女性 #キャリアウーマン #スキルアップ  
- 男性社会人: #転職 #スキルアップ #モチベーション #自己啓発

小カテゴリ（4個・コンテンツ内容別）:
マニュアルの選択肢プールから最適な4個を選択
#コミュニティ #目標達成 #働き方 #アドバイス 等

※マニュアルの「ハッシュタグ選択ルール」「選択方法」に完全準拠
```

---

## ⚡ 品質チェック要件

### データ精度チェック
- [ ] JSON数値が正確に反映されているか
- [ ] ランキング順位がJSON順序と一致しているか
- [ ] 企業名・業界情報に誤りがないか
- [ ] formattedValueが正確に使用されているか

### テンプレート準拠チェック
- [ ] pageStructurePattern = "unified-template-11-company-ranking"
- [ ] 8ページ構成（TOP10の場合）
- [ ] Page3-7がdual表示（2社ずつ）
- [ ] 全必須フィールドが存在するか

### 最重要制限チェック
- [ ] **全企業keyHighlights配列が7文字以内**
- [ ] parameterGraph数値が0-100範囲
- [ ] KIKUYO語尾「なのです」で統一
- [ ] targetIds配列が正しく設定

### キャプション品質チェック
- [ ] 具体的数値を含んでいるか
- [ ] 投稿内容の3倍価値提供ができているか
- [ ] 12個ハッシュタグが適切に選択されているか
- [ ] コミュニティ誘導が自然に含まれているか

---

## 🔧 トラブルシューティング

### よくある失敗と対処法

**keyHighlights 7文字超過**
```
NG: 「住宅手当3万円」「年間休日125日」「交通費全額支給」
OK: 「住宅手当」「年休125日」「交通費」
```

**parameterGraph数値不適切**
```
salary: 年収/2000万×100（三菱商事2033万=100基準）
benefits: S=100, A=80, B=60, C=40
workLifeBalance: (80-残業時間)/80×100（80時間=0, 0時間=100）
growth: 業界成長性×企業規模で算出
stability: 従業員数×設立年数で算出
```

**KIKUYO語尾不統一**
```
OK: 「なのです」「ですよ」「〜ということですね」
NG: 「だと思います」「でしょう」「〜ですから」
```

**データ変換ミス**
```
metrics.initialSalary → keyMetrics.initialSalary（単位変換：円→万円表示）
metrics.salary → keyMetrics.averageSalary（単位変換：円→万円表示）  
formattedValue → ranking表示用（"70万円"形式そのまま使用）
```

---

## 📊 成功パターン集

### KIKUYOらしい表現例
```
✅ 「データで見ると明確ですね」
✅ 「客観的に分析すると〜なのです」  
✅ 「ランキングから分かること」
✅ 「情報を整理すると〜なのです」
✅ 「皆さんらしいキャリアを築くために、これらの情報を上手に活用してくださいなのです！」

❌ 「絶対にオススメ！」（主観的）
❌ 「必ず成功する」（断定的）
❌ 「〜だと思います」（KIKUYO語尾でない）
```

### 効果的なkeyHighlights例
```
✅ 7文字以内: 「住宅手当」「交通費」「年休125日」「育休支援」「食堂無料」「研修充実」「株式付与」
❌ 8文字以上: 「住宅手当支給」「交通費全額」「年間休日125日」「育児休業支援」
```

### 自然なtargetAudience例
```
✅ 疑問形式: 「初任給って実際どのくらいもらえるの？」「働きやすい企業ってどこなの？」
❌ 呼びかけ: 「就活生のあなたへ」「転職を考えているあなた」
```

---

## 🎨 魅力的なタイトル・データソース作成ルール

### **ランキングタイトル改善指針**
❌ **ダサいパターン（使用禁止）**
- 「IT業界女性活躍企業年収TOP10」（硬い・魅力なし）
- 「〜業界〜ランキングTOP10」（TOP10は見たらわかる）
- 「〜企業一覧」「〜企業まとめ」（面白みがない）

✅ **魅力的なパターン（推奨）**
- 「女性が活躍してるIT企業年収ランキング」
- 「年収1000万超えが狙えるIT企業ランキング」
- 「働きやすさ抜群の金融企業ランキング」
- 「初任給が高い優良企業ランキング」

### **データソース・情報源**
❌ **虚偽・不正確（使用禁止）**
- 「企業情報データベース2025年版」（実在しない）
- 「各社公式発表に基づく」（虚偽）
- 「業界調査レポート」（曖昧）

✅ **正確・誠実（必須使用）**
- **source**: 「FIND to DO調べ・KIKUYOデータベース」
- **note**: 「FIND to DOコミュニティ独自調査による」
- **subtitle**: 「FIND to DOコミュニティ調べ」

### **タイトル作成の3原則**
1. **自然で親しみやすい表現**を使う
2. **「TOP10」は冗長なので削除**する
3. **ターゲットが興味を持つキーワード**を含める

---

## 🎯 最終出力フォーマット

### 1. Type003投稿JSON
- ファイル名: 指定されたKxxx.json
- 形式: /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K800.json完全準拠
- 品質: 上記チェック項目全クリア

### 2. キャプション
- KIKUYO掴み文
- 構造化投稿補足説明（15行程度）  
- 固定フォーマット部分
- 12個ハッシュタグ

### 3. 品質確認レポート
- データ精度確認結果
- keyHighlights文字数確認
- 主要制限事項準拠確認

---

**作成日**: 2025-08-28  
**対象**: 企業ランキングシステム90パターン  
**更新**: セッション変更時は本マスタープロンプト必読