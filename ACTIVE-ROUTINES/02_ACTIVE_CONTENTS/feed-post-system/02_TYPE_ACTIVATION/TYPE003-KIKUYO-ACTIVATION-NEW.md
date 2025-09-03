# Type003: KIKUYO ランキング情報型 起動術式（新システム対応版）

**キャラクター**: KIKUYO  
**対象**: 全般（情報収集志向）  
**特徴**: 企業ランキングJSONデータ活用の投稿生成

---

## 起動術式: 企業ランキング投稿生成プロンプト

### 基本フロー
1. **ユーザー**: 企業ランキングJSONファイルを選択（例：JS001_初任給ランキングTOP10.json）
2. **ユーザー**: 以下のプロンプトテンプレートを実行
3. **Claude Code**: 企業ランキングJSONを読み込み
4. **Claude Code**: unified-template-11-company-ranking形式でナレッジJSON生成
5. **Claude Code**: 品質チェック実施

---

## マスタープロンプトテンプレート

```
【Type003企業ランキング投稿生成】

## 入力データ
企業ランキングファイル: [JSONファイルパスを指定]
例：/app/data/companyDatabase/rankings/jobSeekers/JS001_初任給ランキングTOP10.json

## 必須参照資料
1. **テンプレート仕様**: /app/services/knowledgeBase/data/pageStructures/unified/unified-template-11-company-ranking.json
2. **フォーマット詳細**: /docs/unified-template-11-company-ranking-master-format.md  
3. **完成見本**: /app/data/knowledgeBase/knowledge/type003/K800.json

## 生成指示
1. 上記の企業ランキングJSONを読み込み、TOP10企業データを抽出
2. unified-template-11-company-ranking形式で8ページ構成生成
3. ランキングテーマは入力JSONの「name」フィールドから決定
4. ターゲットは入力JSONの「target」フィールドから自動判定
5. KIKUYO語尾（「なのです」）で表現統一

## ページ構成生成ルール

### Page1: basic_intro
- title: JSONのnameからランキングタイトル生成
- targetAudience: 疑問形式で自然な表現
- problems: ランキングテーマに応じた3つの悩み
- additionalMessage: 30-40文字、KIKUYO口調

### Page2: ranking_display
- JSONのrankingデータからTOP10抽出
- primaryValue: formattedValue使用
- secondaryValue: 企業の特徴的情報
- description: 企業の魅力ポイント
- category: industry情報

### Page3-7: enhanced_company_detail
- displayMode: "dual"で2社ずつ表示
- JSONのmetricsからkeyMetrics生成
- featuresからcompany情報構築
- keyHighlights: **必ず7文字以内**
- parameterGraph: 企業データから0-100で算出

### Page8: resource_summary
- summaryPoints: 3項目、KIKUYO口調
- resourceList: ランキングテーマに応じたリソース
- finalMessage: KIKUYO特性の励ましメッセージ

## 重要制限事項
- **keyHighlights**: 各項目必ず7文字以内（最重要）
- **pageStructurePattern**: "unified-template-11-company-ranking"固定
- **companyName**: 30文字以内
- **overview**: 400文字以内  
- **highlightMessage**: 80文字以内

## データ変換ルール

### metricsフィールド変換
- initialSalary → keyMetrics.initialSalary
- salary → keyMetrics.averageSalary（万円変換）
- overtime → keyMetrics.overtime
- holidays → keyMetrics.holidays
- employees → features.employees

### parameterGraph算出
- salary: 年収データから算出（最高2000万=100）
- benefits: welfareGradeから算出（S=100, A=80, B=60）
- workLifeBalance: 残業時間から逆算（0時間=100）
- growth: 業界特性から算出
- stability: 従業員数・設立年から算出

## 品質要件
- JSONデータ100%準拠の正確性
- テンプレート仕様書の完全遵守
- KIKUYO語尾の一貫した使用
- keyHighlights 7文字制限の厳守

## 出力形式
- 完全なType003 JSON構造
- pageStructurePattern: "unified-template-11-company-ranking"
- 8ページ構成（企業10社の場合）
```

---

## 使用例

### 初任給ランキング投稿生成
```
【Type003企業ランキング投稿生成】

企業ランキングファイル: /app/data/companyDatabase/rankings/jobSeekers/JS001_初任給ランキングTOP10.json

上記の手順でType003投稿を生成してください。
```

### ワークライフバランスランキング投稿生成  
```
【Type003企業ランキング投稿生成】

企業ランキングファイル: /app/data/companyDatabase/rankings/femaleCareer/FC001_ワークライフバランス企業TOP10.json

上記の手順でType003投稿を生成してください。
```

---

## KIKUYO表現スタイル

### 語尾・口調
- 「なのです」「ですよ」で統一
- 客観的・分析的なトーン
- データを重視した表現

### 共感フレーズ  
- 「データで見ると明確ですね」
- 「客観的に分析すると」
- 「ランキングから分かること」
- 「情報を整理すると」

### 締めくくりフレーズ
- 「皆さんらしいキャリアを築くために、これらの情報を上手に活用してくださいなのです！」
- 「データに基づいた客観的な判断で、最適な選択をしてくださいなのです！」

---

## 品質チェックリスト

### 生成前確認
- [ ] 企業ランキングJSONファイルが存在するか
- [ ] テンプレート仕様書を確認済みか
- [ ] K800.jsonの構造を理解しているか

### 生成中確認
- [ ] JSONデータの数値を正確に使用しているか
- [ ] **keyHighlights配列が7文字以内に制限されているか**
- [ ] pageStructurePattern設定されているか
- [ ] ランキング基準が一貫しているか
- [ ] KIKUYO語尾を使用しているか

### 生成後確認
- [ ] JSON構造がunified-template-11-company-ranking形式か
- [ ] 全企業のkeyHighlights配列が7文字以内か
- [ ] レーダーチャート用parameterGraph数値が0-100範囲か
- [ ] 企業情報にJSONデータとの齟齬がないか

---

## Type003 KIKUYO起動完了（新システム版）！

この起動術式を使用して、90パターンの企業ランキングJSONから効率的にType003投稿を生成してください。KIKUYOの分析的で客観的な視点で、価値ある情報を提供しましょう！