# Type003 MISAKI マスタープロンプト

**目的**: 企業ランキングJSONからType003投稿を生成するための完全情報  
**対象**: Claude Code（セッション変更対応）  
**基準**: 暗黙知完全排除、K800.json同等品質

---

## 🎯 基本情報

### キャラクター: MISAKI
- 共感的で温かいスピリチュアル系キャリアコンサルタント
- 語尾: 「〜ですね」「〜なんです」「〜かもしれません」
- トーン: 共感的・優しい・女性目線
- 特徴: 寄り添う表現、癒しと安心感の提供
- 対象ターゲット: T014（女性キャリア）
- 対応JSONディレクトリ: femaleCareer/FCxxx系

## 🤖 自動判定システム

### ユーザー指示→JSON自動判定ロジック
```
指示キーワード判定:
「ホワイト企業」「働きやすい」「ワークライフバランス」→ FC001_ワークライフバランス企業TOP10.json
「残業少ない」「残業時間」→ FC003_残業月20時間以内企業TOP10.json
「育児支援」「育休」「男性育休」→ FC005_男性育休取得率50%以上企業TOP10.json
「有給」「年間休日」→ FC004_有給取得率80%以上企業TOP10.json
「女性活躍」「女性管理職」→ FC024_東証プライム_女性働きやすいTOP15.json

判定プロセス:
1. ユーザー指示からキーワード抽出
2. キーワード→JSONファイル自動マッピング
3. /app/data/companyDatabase/rankings/femaleCareer/配下から該当ファイル特定
4. ファイル存在確認・読み込み
```

### 保存先自動決定システム
```
MISAKI（女性キャリア系）保存先ルール:
- K81x番台を使用（K811, K812, K813...）
- 既存ファイル確認→次の空き番号自動割り当て
- 例: FC001 → K811, FC003 → K813, FC005 → K815

自動ファイル名生成:
1. /app/data/knowledgeBase/knowledge/type003/配下確認
2. K81x番台の最大番号取得
3. +1して新しいファイル名決定
4. 重複回避チェック
```

### テンプレート: unified-template-11-company-ranking
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
  "id": "FC001",
  "name": "ワークライフバランス企業TOP10",
  "target": "女性キャリア",
  "ranking": [
    {
      "rank": 1,
      "name": "企業名",
      "value": 85.4,
      "formattedValue": "85.4点",
      "metrics": {
        "initialSalary": 650000,
        "salary": 14500000,
        "overtime": 8.2,
        "holidays": 128,
        "employees": 950
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
  "problemCategory": "女性キャリア支援",
  "knowledgeId": "K81x",
  "postType": "003",
  "pageCount": 8,
  "pageStructurePattern": "unified-template-11-company-ranking",
  "targetIds": ["T014"],
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
"ワークライフバランス企業TOP10" → "働きやすい企業TOP10"

targetAudience → 疑問形式・女性目線
"働きやすい職場ってどんな環境なんだろう？"

problems → 女性キャリア特化の悩み3項目
["仕事と家庭の両立ができる企業を知りたい", "長く安心して働ける職場を見つけたい", "女性が活躍できる環境かどうか気になる"]

additionalMessage → 30-40文字、MISAKI口調
"あなたらしく輝ける職場が見つかりますように♪一緒に素敵な企業を見つけていきましょうね"
```

#### Page2: ranking_display
```
JSON.ranking[0-9] → content.items
rank → rank
name → name
formattedValue → primaryValue
welfare・workStyle → secondaryValue
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

パラメーターグラフ（0-100・女性重視指標）:
salary: 年収ベース（最高1500万=100）
benefits: welfareGradeベース（S=100, A=80, B=60）
workLifeBalance: 残業時間・有給取得率から算出（100点満点）
growth: 女性管理職比率・昇進可能性
stability: 勤続年数・離職率から算出

企業特徴:
features.businessModel → features.industry
metrics.employees → features.employees（"x,xxx人"）
設立年推定 → features.established
本社推定 → features.headquarters

詳細情報:
features.specialization + businessModel → details.overview（400文字以内）
女性向け職種 → details.recruitment配列
welfare.uniqueBenefits → details.benefits配列
女性支援制度 → details.uniqueFeatures配列
働きやすさポイント → details.keyHighlights配列（**7文字以内必須**）
```

#### Page8: resource_summary
```
summaryPoints → 3項目、MISAKI口調
["データを見ると、xxx企業が85.4点で1位なんですね。働きやすさの条件が揃っています", "平均残業時間xx時間は理想的で、プライベートも大切にできそうです", "あなたらしいキャリアを築くために、これらの情報を参考にしてくださいね"]

resourceList → 女性キャリア特化リソース
[{title: "働きやすい企業情報", items: [企業公式採用ページ×5]}, {title: "女性キャリア支援", items: [転職エージェント情報×4]}, {title: "ワークライフバランス", items: [両立のコツ等×4]}]

finalMessage → MISAKI特性励ましメッセージ
"あなたが心から安心して働ける場所が必ず見つかります。自分らしく輝けるキャリアを一緒に築いていきましょうね♪"
```

---

## 🎭 キャプション・ハッシュタグ生成

### **必須参照マニュアル**
```
ACTIVE-ROUTINES/04_REFERENCE/manuals/コンテンツ作成マニュアル/10_キャプション・ハッシュタグ生成マニュアル_2025-08-23.md

上記マニュアルを必ず読み込み、以下の点を完全準拠すること：
- 完全な固定フォーマット使用（掴み文→@find_to_do→構造化補足→コミュニティ誘導→ハッシュタグ）
- キャラクター別掴み文パターン準拠
- 構造化された投稿補足説明（15行程度）作成
- ハッシュタグ戦略システム（4+4+4構成・12個）準拠
- 品質チェック基準完全クリア
```

### MISAKI掴み文パターン（マニュアル準拠）
```
パターン1：共感寄り添い型
「同じように感じてる女性の方、きっと多いと思います。一緒に解決していきましょう」

パターン2：安心提供型
「大丈夫、あなたは一人じゃありません。働きやすい職場は必ず見つかります」

パターン3：優しい励まし型
「頑張りすぎないでくださいね。あなたのペースで素敵な企業を見つけていきましょう」

パターン4：癒し提供型
「仕事で疲れた時は、この情報があなたの心を少しでも軽くしてくれたら嬉しいです」

※マニュアルの「🌸 Misaki（共感・スピリチュアル系）」パターンに完全準拠すること
```

### 投稿補足説明（マニュアル完全準拠）
```
▶ [ランキング結果の背景分析]（3行程度）
女性の働きやすさに焦点を当てた具体的分析
※マニュアルの「正しい補足説明の思考プロセス」に従う

▶ [女性キャリアのポイント解説] 
  ① [ポイント1]（3行程度）
  なぜ女性にとって重要なのか・どう判断するかの補足
  ※「なぜ」と「どうすれば」の深掘り必須
  
  ② [ポイント2]（3行程度）
  ワークライフバランスの視点での補足
  
  ③ [ポイント3]（3行程度）
  女性特有のキャリア課題への対応

▶ [MISAKI視点のアドバイス]（3行程度）
共感的で優しい励ましメッセージ
※マニュアルの「キャラクターの言葉で伝える」に準拠

※絶対禁止事項：根拠のない数字、価値観の押し付け、薄っぺらい内容
```

### Type003ハッシュタグ（マニュアル完全準拠）
```
マニュアルのハッシュタグ戦略システム（4+4+4構成・12個）に完全準拠

大カテゴリ（4個・投稿タイプ別）:
- 003（業界情報・キャリア系）: #キャリア #仕事 #転職 #成長

中カテゴリ（4個・ターゲット属性別）:
- 女性キャリア: #ワーママ #働く女性 #キャリアウーマン #スキルアップ

小カテゴリ（4個・コンテンツ内容別）:
マニュアルの選択肢プールから最適な4個を選択
#コミュニティ #目標達成 #働き方 #アドバイス #体験談 等

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
- [ ] MISAKI語尾「〜ですね」「〜なんです」で統一
- [ ] targetIds配列が["T014"]に設定

### キャプション品質チェック
- [ ] 女性キャリアに特化した内容か
- [ ] 共感的で優しいトーンになっているか
- [ ] 12個ハッシュタグが適切に選択されているか
- [ ] コミュニティ誘導が自然に含まれているか

---

## 🔧 トラブルシューティング

### よくある失敗と対処法

**keyHighlights 7文字超過**
```
NG: 「育児休業支援」「住宅手当3万円」「フレックスタイム制」
OK: 「育休支援」「住宅手当」「フレックス」
```

**parameterGraph数値不適切（女性重視指標）**
```
salary: 年収/1500万×100（女性平均年収考慮）
benefits: S=100, A=80, B=60, C=40
workLifeBalance: (40-残業時間)/40×100 + 有給取得率（女性基準）
growth: 女性管理職比率×2
stability: 平均勤続年数×5
```

**MISAKI語尾不統一**
```
OK: 「〜ですね」「〜なんです」「〜かもしれません」「〜でしょうね」
NG: 「なのです」「だと思います」「〜ですから」
```

**女性目線不足**
```
NG: 一般的なキャリア表現
OK: 「両立」「安心」「長く働ける」「女性活躍」「育児支援」
```

---

## 📊 成功パターン集

### MISAKIらしい表現例
```
✅ 「同じように感じている方も多いと思います」
✅ 「あなたらしく働ける場所が見つかりますように」  
✅ 「安心して長く働ける環境って大切ですよね」
✅ 「一緒に素敵な職場を見つけていきましょうね♪」

❌ 「データ分析の結果」（KIKUYOらしい）
❌ 「君なら絶対できる」（KINGらしい）
❌ 客観的すぎる表現
```

### 効果的なkeyHighlights例（女性重視）
```
✅ 7文字以内: 「育休支援」「時短勤務」「女性管理職」「在宅可能」「保育支援」「フレックス」「産休制度」
❌ 8文字以上: 「育児休業支援」「時短勤務制度」「女性管理職登用」
```

### 自然なtargetAudience例（女性目線）
```
✅ 「働きやすい職場ってどんな環境なんだろう？」「仕事と家庭って両立できるのかな？」
❌ 「転職を考えているあなたへ」「キャリアアップしたい人は」
```

---

## 🎯 最終出力フォーマット

### 1. Type003投稿JSON
- ファイル名: 指定されたK81x.json
- 形式: K800.json完全準拠
- 品質: 上記チェック項目全クリア

### 2. キャプション
- MISAKI掴み文（共感・優しさ重視）
- 構造化投稿補足説明（15行程度・女性キャリア特化）  
- 固定フォーマット部分
- 12個ハッシュタグ（女性向け）

### 3. 品質確認レポート
- データ精度確認結果
- keyHighlights文字数確認
- 女性目線表現確認
- 主要制限事項準拠確認

---

**作成日**: 2025-08-28  
**対象**: 女性キャリア企業ランキングシステム30パターン  
**更新**: セッション変更時は本マスタープロンプト必読