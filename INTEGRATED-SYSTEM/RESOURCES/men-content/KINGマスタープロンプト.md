# Type003 KING マスタープロンプト

**目的**: 企業ランキングJSONからType003投稿を生成するための完全情報  
**対象**: Claude Code（セッション変更対応）  
**基準**: 暗黙知完全排除、K800.json同等品質  
**参考ファイル**: /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K800.json

---

## 🎯 基本情報

### キャラクター: KING
- 力強い成長志向の熱血コーチ
- 語尾: 「〜だ」「〜である」「〜だぞ」
- トーン: 熱血・力強い・成長重視・男性向け
- 特徴: 限界突破・挑戦促進・可能性への確信
- 対象ターゲット: T015（男性社会人）
- 対応JSONディレクトリ: maleProfessional/MPxxx系

## 🤖 自動判定システム

### ユーザー指示→JSON自動判定ロジック
```
指示キーワード判定:
「高年収」「年収」「年収ランキング」→ MP001_年収ランキングTOP10.json
「超高収入」「年収1500万」→ MP003_年収1500万円以上企業TOP10.json
「出世」「昇進」「管理職」→ MP005系管理職関連
「安定×高収入」「勤続×年収」→ MP011_年収1000万以上×平均勤続15年以上TOP10.json
「転職」「キャリアアップ」→ MP020系転職関連

判定プロセス:
1. ユーザー指示からキーワード抽出
2. キーワード→JSONファイル自動マッピング
3. /mnt/c/instagram-course/instagram-post-generator/app/data/companyDatabase/rankings/maleProfessional/配下から該当ファイル特定
4. ファイル存在確認・読み込み
```

### 保存先自動決定システム
```
KING（男性社会人系）保存先ルール:
- K82x番台を使用（K821, K822, K823...）
- 既存ファイル確認→次の空き番号自動割り当て
- 例: MP001 → K821, MP003 → K823, MP011 → K831

自動ファイル名生成:
1. /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/配下確認
2. K82x番台の最大番号取得
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
  "id": "MP001",
  "name": "年収ランキングTOP10",
  "target": "男性社会人",
  "ranking": [
    {
      "rank": 1,
      "name": "企業名",
      "value": 20330000,
      "formattedValue": "2033万円",
      "metrics": {
        "initialSalary": 700000,
        "salary": 20330000,
        "overtime": 25.8,
        "holidays": 118,
        "employees": 4500
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
  "problemCategory": "男性キャリア支援",
  "knowledgeId": "K82x",
  "postType": "003",
  "pageCount": 8,
  "pageStructurePattern": "unified-template-11-company-ranking",
  "targetIds": ["T015"],
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
"年収ランキングTOP10" → "年収が高い企業TOP10"

targetAudience → 疑問形式・成長志向
"本当に稼げる企業ってどこなんだ？"

problems → 男性社会人特化の悩み3項目
["高収入を得られる企業を知りたい", "キャリアアップで年収を上げたい", "将来的に管理職として成功したい"]

additionalMessage → 30-40文字、KING口調
"君の可能性を最大限に引き出す企業がここにある！一緒に頂点を目指そう！"
```

#### Page2: ranking_display
```
JSON.ranking[0-9] → content.items
rank → rank
name → name
formattedValue → primaryValue
成長可能性・昇進機会 → secondaryValue
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

パラメーターグラフ（0-100・成長重視指標）:
salary: 年収ベース（最高2500万=100）
benefits: welfareGradeベース（S=100, A=80, B=60）
growth: 昇進可能性・管理職比率・事業成長性
stability: 企業規模・業界地位・財務安定性
career: キャリアパス明確性・スキル向上機会

企業特徴:
features.businessModel → features.industry
metrics.employees → features.employees（"x,xxx人"）
設立年推定 → features.established
本社推定 → features.headquarters

詳細情報:
features.specialization + businessModel → details.overview（400文字以内）
管理職・エグゼクティブ職種 → details.recruitment配列
welfare.uniqueBenefits → details.benefits配列
昇進・成長制度 → details.uniqueFeatures配列
高収入ポイント → details.keyHighlights配列（**7文字以内必須**）
```

#### Page8: resource_summary
```
summaryPoints → 3項目、KING口調
["トップは年収2033万円だ！この水準に到達するための道筋は確実に存在する", "平均でも1500万円超えは圧倒的だ。君の実力なら必ず掴める高みだ", "年収だけでなく成長機会も豊富だ。限界を突破して頂点を目指そう！"]

resourceList → 男性キャリア特化リソース
[{title: "高収入企業情報", items: [企業公式採用ページ×5]}, {title: "キャリアアップ戦略", items: [転職エージェント情報×4]}, {title: "スキル向上リソース", items: [資格・研修情報×4]}]

finalMessage → KING特性励ましメッセージ
"君には無限の可能性がある！この情報を武器に、必ず理想のキャリアを掴み取ってみせろ！俺は君を信じているぞ！"
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

### KING掴み文パターン（マニュアル準拠）
```
パターン1：挑戦促進型
「君の可能性はこんなもんじゃない！この企業で自分を変えてみろ！」

パターン2：成長実感型
「筋トレと同じで、継続すれば必ず結果が出る。キャリアも今日から始めよう！」

パターン3：限界突破型
「できない理由を探すより、できる方法を試してみよう。君なら絶対できる！」

パターン4：仲間意識型
「一緒に成長していこう！この情報が君の人生を変えるきっかけになる！」

※マニュアルの「👑 King（成長系・筋トレ系）」パターンに完全準拠すること
```

### 投稿補足説明（マニュアル完全準拠）
```
▶ [年収ランキングの背景分析]（3行程度）
男性社会人の収入向上に焦点を当てた具体的分析
※マニュアルの「正しい補足説明の思考プロセス」に従う

▶ [キャリアアップのポイント解説] 
  ① [ポイント1]（3行程度）
  なぜ高収入を得られるのか・どう到達するかの補足
  ※「なぜ」と「どうすれば」の深掘り必須
  
  ② [ポイント2]（3行程度）
  成長機会・昇進可能性の視点での補足
  
  ③ [ポイント3]（3行程度）
  スキル向上・実力向上への具体的アドバイス

▶ [KING視点のアドバイス]（3行程度）
熱血で力強い激励メッセージ
※マニュアルの「キャラクターの言葉で伝える」に準拠

※絶対禁止事項：根拠のない数字、価値観の押し付け、薄っぺらい内容
```

### Type003ハッシュタグ（マニュアル完全準拠）
```
マニュアルのハッシュタグ戦略システム（4+4+4構成・12個）に完全準拠

大カテゴリ（4個・投稿タイプ別）:
- 003（業界情報・キャリア系）: #キャリア #仕事 #転職 #成長

中カテゴリ（4個・ターゲット属性別）:
- 男性社会人: #転職 #スキルアップ #モチベーション #自己啓発

小カテゴリ（4個・コンテンツ内容別）:
マニュアルの選択肢プールから最適な4個を選択
#モチベーションアップ #目標達成 #自己成長 #可能性 等

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
- [ ] KING語尾「〜だ」「〜である」で統一
- [ ] targetIds配列が["T015"]に設定

### キャプション品質チェック
- [ ] 男性社会人に特化した内容か
- [ ] 成長志向で力強いトーンになっているか
- [ ] 12個ハッシュタグが適切に選択されているか
- [ ] コミュニティ誘導が自然に含まれているか

---

## 🔧 トラブルシューティング

### よくある失敗と対処法

**keyHighlights 7文字超過**
```
NG: 「管理職登用制度」「年収アップ制度」「昇進可能性高い」
OK: 「管理職登用」「年収アップ」「昇進可能」
```

**parameterGraph数値不適切（成長重視指標）**
```
salary: 年収/2500万×100（男性高収入基準）
benefits: S=100, A=80, B=60, C=40
growth: 事業成長率×管理職比率×2
stability: 企業規模×業界地位×設立年数/100
career: キャリアパス明確性×昇進速度×スキル向上機会
```

**KING語尾不統一**
```
OK: 「〜だ」「〜である」「〜だぞ」「〜してみろ」
NG: 「〜ですね」「〜なのです」「〜かもしれません」
```

**男性社会人目線不足**
```
NG: 一般的な転職表現
OK: 「高収入」「昇進」「管理職」「実力主義」「成長機会」
```

---

## 📊 成功パターン集

### KINGらしい表現例
```
✅ 「君の可能性はこんなもんじゃない！」
✅ 「限界を突破して頂点を目指そう！」  
✅ 「必ず結果が出る。君なら絶対できる！」
✅ 「一緒に成長していこう！俺は君を信じているぞ！」

❌ 「データで見ると明確ですね」（KIKUYOらしい）
❌ 「あなたらしく働ける場所が」（MISAKIらしい）
❌ 優しすぎる表現
```

### 効果的なkeyHighlights例（成長重視）
```
✅ 7文字以内: 「年収2000万」「管理職登用」「実力主義」「昇進制度」「海外駐在」「株式報酬」「役員候補」
❌ 8文字以上: 「年収2000万円」「管理職登用制度」「実力主義評価」
```

### 自然なtargetAudience例（男性目線）
```
✅ 「本当に稼げる企業ってどこなんだ？」「どうすれば年収1000万円に到達できる？」
❌ 「働きやすい職場ってどんな環境？」「仕事と家庭って両立できる？」
```

---

## 🎨 魅力的なタイトル・データソース作成ルール

### **ランキングタイトル改善指針**
❌ **ダサいパターン（使用禁止）**
- 「IT業界高年収企業ランキングTOP10」（硬い・魅力なし）
- 「〜業界〜ランキングTOP10」（TOP10は見たらわかる）
- 「〜企業一覧」「〜企業まとめ」（面白みがない）

✅ **魅力的なパターン（推奨）**
- 「年収1000万超えが狙えるIT企業」
- 「男が稼げる高年収企業ランキング」
- 「キャリアアップできる優良企業」
- 「勝ち組になれる転職先ランキング」

### **データソース・情報源**
❌ **虚偽・不正確（使用禁止）**
- 「企業情報データベース2025年版」（実在しない）
- 「各社公式発表に基づく」（虚偽）
- 「業界調査レポート」（曖昧）

✅ **正確・誠実（必須使用）**
- **source**: 「FIND to DO調べ・KINGデータベース」
- **note**: 「FIND to DOコミュニティ独自調査による」
- **subtitle**: 「FIND to DOコミュニティ調べ」

### **タイトル作成の3原則**
1. **熱血・挑戦的な表現**を使う（KINGらしさ）
2. **「TOP10」は冗長なので削除**する
3. **冗長すぎると改行されるため適度な長さ**に抑える

---

## 🎯 最終出力フォーマット

### 1. Type003投稿JSON
- ファイル名: 指定されたK82x.json
- 形式: /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K800.json完全準拠
- 品質: 上記チェック項目全クリア

### 2. キャプション
- KING掴み文（熱血・成長志向重視）
- 構造化投稿補足説明（15行程度・男性キャリア特化）  
- 固定フォーマット部分
- 12個ハッシュタグ（男性向け）

### 3. 品質確認レポート
- データ精度確認結果
- keyHighlights文字数確認
- 男性目線表現確認
- 主要制限事項準拠確認

---

**作成日**: 2025-08-28  
**対象**: 男性社会人企業ランキングシステム30パターン  
**更新**: セッション変更時は本マスタープロンプト必読