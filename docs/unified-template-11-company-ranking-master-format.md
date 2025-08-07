# unified-template-11-company-ranking 完全フォーマットマスタードキュメント

## 概要
企業ランキング→詳細ページ構成パターンの完全なフォーマット仕様書。K800初任給ランキングで確立された最適化済みフォーマット。

## ページ構成パターン

### 基本構成
- **Page 1**: basic_intro (導入ページ)
- **Page 2**: ranking_display (ランキング表示)  
- **Page 3-7**: enhanced_company_detail (企業詳細・2社ずつ表示)
- **Page 8**: resource_summary (まとめページ)

### 対応企業数
- **TOP10企業**: 8ページ構成
- **TOP5企業**: 5ページ構成
- **TOP20企業**: 12ページ構成

## データ構造仕様

### 1. Page1: basic_intro
```json
{
  "section": "introduction",
  "template": "basic_intro",
  "content": {
    "title": "○○が高い企業TOP10",
    "targetAudience": "初任給って実際どのくらいもらえるの？",
    "problems": [
      "○○の高い企業がどこかわからない",
      "企業選びで○○面を重視したい",
      "将来の生活設計のため○○を知りたい"
    ],
    "additionalMessage": "2025年度最新データで客観的ランキングなのです！企業選びをサポートするのです",
    "savePrompt": "このランキングを参考に、気になる企業をチェックしてください"
  }
}
```

#### basic_intro作成ガイドライン

##### targetAudience設計原則
- **自分事にする疑問形式**を採用（例：「初任給って実際どのくらいもらえるの？」）
- 「～のあなたへ」形式は距離感があるため避ける
- 下部のproblemsと内容が被らないよう配慮
- 読み手の率直な疑問を代弁する自然な表現

##### additionalMessage作成基準
- **文字数制限**: 30-40文字（日本語文字数）
- **キャラクター特性**: kikuyoの「なのです」口調で統一
- **内容**: データの客観性とサポートの意志を表現
- **例文**: 「2025年度最新データで客観的ランキングなのです！企業選びをサポートするのです」（40文字）

##### problems設計パターン
- 3項目で構成、各50文字以内
- targetAudienceと重複しない観点で作成
- 「わからない」「重視したい」「知りたい」のような行動意図を含む
- ランキング対象（初任給、年収等）に応じて○○部分を調整

### 2. Page2: ranking_display
```json
{
  "section": "ranking",
  "template": "ranking_display",
  "content": {
    "title": "○○が高い企業TOP10",
    "subtitle": "2025年度新卒採用データ",
    "displayType": "ranking",
    "items": [
      {
        "rank": 1,
        "name": "企業名",
        "primaryValue": "メイン数値",
        "secondaryValue": "補足情報",
        "description": "企業の特徴説明",
        "category": "業界カテゴリ"
      }
    ],
    "note": "データの出典情報",
    "source": "情報源"
  }
}
```

### 3. Page3-7: enhanced_company_detail

#### 企業データ構造
```json
{
  "section": "mainContent",
  "template": "enhanced_company_detail",
  "content": {
    "displayMode": "dual",
    "companies": [
      {
        "companyName": "企業名（30文字以内）",
        "rankInfo": {
          "rank": 1,
          "category": "ランキング種別",
          "score": "スコア値"
        },
        "keyMetrics": {
          "initialSalary": "初任給",
          "averageSalary": "平均年収",
          "bonus": "ボーナス情報",
          "holidays": "年間休日",
          "overtime": "残業時間"
        },
        "parameterGraph": {
          "salary": 95,      // 0-100の数値
          "benefits": 75,
          "workLifeBalance": 85,
          "growth": 90,
          "stability": 80
        },
        "features": {
          "industry": "業界情報",
          "employees": "従業員数",
          "established": "設立年",
          "headquarters": "本社所在地"
        },
        "details": {
          "overview": "企業概要（400文字以内）",
          "recruitment": ["募集職種配列"],
          "benefits": ["福利厚生配列（各50文字以内）"],
          "uniqueFeatures": ["独自特徴配列（各100文字以内）"],
          "keyHighlights": ["特徴4項目（各7文字以内）"]
        },
        "highlightMessage": "ハイライトメッセージ（80文字以内）"
      }
    ]
  }
}
```

### 4. Page8: resource_summary
```json
{
  "section": "summary",
  "template": "resource_summary",
  "content": {
    "title": "○○が高い企業TOP10",
    "summaryPoints": [
      "要約ポイント1（30-45文字、kikuyoの「なのです」口調）",
      "要約ポイント2（30-45文字、kikuyoの「なのです」口調）", 
      "要約ポイント3（30-45文字、kikuyoの「なのです」口調）"
    ],
    "resourceList": [
      {
        "title": "カテゴリタイトル",
        "items": ["リソース1", "リソース2", "リソース3"]
      }
    ],
    "finalMessage": "kikuyoキャラクター特性に合わせた「なのです」口調のメッセージ",
    "characterImage": "kikuyo_point.png",
    "characterPosition": "right"
  }
}
```

#### キャラクター特性要件（Page8専用）
- **summaryPoints**: 各項目30-45文字、kikuyoの「なのです」口調で統一
- **finalMessage**: kikuyoの特性（天然だが優秀なデータサイエンティスト）に合わせ、「なのです」口調で作成
- **キャラクター画像**: `kikuyo_point.png`を右側配置
- **口調例**: 「データ分析の結果～なのです」「総合的に判断が重要なのです」など
- **最終感嘆符**: finalMessageの最後は「なのです！」で締める

## UI仕様・最適化項目

### 1. ランキングバッジ
- **背景色**: `bg-amber-400`
- **テキスト**: `text-gray-800 font-bold`
- **形状**: `rounded-lg`（中程度の角丸）
- **余白**: `px-2 py-1`（DualCard）/ `px-3 py-1`（SingleCard）
- **html2canvas対応**: `<span className="inline-block pb-3">`

### 2. 4カラム特徴ボックス
- **配置**: 企業概要の下、主要特徴の上
- **レイアウト**: `grid-cols-4 gap-1`
- **背景色**: 順番にpurple, orange, indigo, green（100番台）
- **テキスト**: `font-bold`、`fontSize: '10px'`
- **文字数制限**: **7文字以内**（最重要）
- **html2canvas対応**: `<span className="mb-2">`

### 3. レーダーチャート仕様
- **DualCard用サイズ**:
  - `canvasSize`: 240 (height) / 280 (width)
  - `maxRadius`: 85
  - `labelRadius`: 115
- **SingleCard用サイズ**:
  - `canvasSize`: 260 (正方形)
  - `maxRadius`: 80
  - `labelRadius`: 105

### 4. 余白・レイアウト調整
- **ランキングラベル↔タイトル**: `mb-1`（DualCard）
- **初任給ランキング下**: `mb-4`
- **企業概要↔4カラムボックス**: `mb-4`
- **レーダーチャート上部**: `pt-2`

## 文字数制限一覧

| 項目 | 制限文字数 | 備考 |
|------|------------|------|
| **targetAudience** | **制限なし** | **疑問形式推奨** |
| **additionalMessage** | **30-40文字** | **kikuyo口調「なのです」** |
| problems | 50文字/項目 | 3項目推奨 |
| companyName | 30文字 | 企業名 |
| overview | 400文字 | 企業概要 |
| benefits | 50文字/項目 | 福利厚生 |
| uniqueFeatures | 100文字/項目 | 独自特徴 |
| **keyHighlights** | **7文字/項目** | **4カラムボックス用** |
| highlightMessage | 80文字 | ハイライト |

## html2canvas対応パターン

### バッジ系UI
```jsx
<span className="inline-block pb-3">テキスト</span>
```

### 通常テキスト
```jsx
<span className="mb-2">テキスト</span>
```

## テンプレート選択基準

### 適用条件
- **ランキング形式**のコンテンツ
- **企業比較**が主目的
- **数値データ**が豊富
- **詳細情報**の表示が必要

### 対象コンテンツ例
- 初任給ランキング
- 平均年収ランキング
- 福利厚生充実度ランキング
- 働きやすさランキング
- 成長性ランキング

## 品質チェックリスト

### データ品質
- [ ] 全企業のkeyHighlightsが7文字以内
- [ ] parameterGraphの数値が0-100範囲
- [ ] 必須フィールドの存在確認
- [ ] ランキング順位の整合性

### UI品質  
- [ ] レーダーチャートの表示確認
- [ ] 4カラムボックスの改行チェック
- [ ] ランキングバッジの位置確認
- [ ] 余白・レイアウトの統一性

### html2canvas品質
- [ ] テキスト位置のずれ確認
- [ ] バッジ内テキストの表示確認
- [ ] レーダーチャートの切り取り確認

## Instagramキャプション作成ガイドライン

### kikuyoキャラクター特性対応

#### 基本方針
- **口調統一**: 「なのです」で統一（最重要）
- **キャラクター設定**: 天然だが優秀なデータサイエンティスト
- **親しみやすさ**: データ分析好きだが、親近感のある表現

#### タイトル作成パターン
```
✅ 良い例:
「初任給ランキング調べてみたのです。」
「○○企業データ分析したのです。」

❌ 避ける例:
「目指すは、高待遇企業なのです。」（堅すぎる）
「驚きませんか？」（押し付けがましい）
```

#### 本文作成基準
- **導入部**: 疑問形で読み手との共感を作る
- **データ言及**: 数値への言及でデータサイエンティスト特性を表現
- **分析視点**: 「データで見ると面白い傾向」などの分析コメント
- **締めくくり**: 「なのです！」で統一、応援メッセージで終了

#### K800実例テンプレート
```
**初任給ランキング調べてみたのです。**
@find_to_do←他の投稿はこちら
━━━━━━━━━━━━━━━━━━━━

✅初任給が高い企業TOP10

初任給って実際どのくらいもらえるか気になりますよね！
2025年度の最新データを分析してみたところ、サイバーエージェントが42万円でトップなのです。
総合商社5社もランクインしていて、やっぱり商社は強いですね。
データで見ると面白い傾向が分かるのです。

✅初任給が高い企業TOP10

三菱商事の平均年収は2,033万円もあるんですね。
でも初任給だけじゃなくて、働き方や福利厚生も大切なポイントなのです。
伊藤忠商事は残業時間が月10.7時間で働きやすさも抜群ですし、
楽天は3食無料カフェテリアがあるんですって。総合的に判断するのが重要なのです。

✅初任給が高い企業TOP10

データ分析をしていると、企業選びって本当に奥が深いなって思うのです。
数字だけじゃ見えない企業の魅力もたくさんありますからね。
皆さんらしいキャリアを築くために、これらの情報を上手に活用してくださいなのです！
応援していますから、頑張ってくださいなのです！
```

#### 注意事項
- **一貫性**: 全ての文末を「なのです」で統一する
- **自然さ**: 押し付けがましい表現は避ける
- **データ活用**: 具体的な数値を積極的に言及
- **親近感**: 読み手との距離感を縮める表現を心がける

---

**作成日**: 2025-08-05  
**バージョン**: 1.1  
**対象テンプレート**: unified-template-11-company-ranking  
**基準データ**: K800初任給ランキング  
**最終更新**: Instagramキャプション作成ガイドライン追加