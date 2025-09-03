以下の企業リストについて詳細なリサーチを実行してください

**リサーチ対象企業**：
・ソニーミュージックグループ株式会社
・株式会社博報堂DYホールディングス
・株式会社集英社
・株式会社電通
・株式会社講談社
・東宝株式会社
・株式会社KADOKAWA
・株式会社小学館
・読売新聞グループ本社
・株式会社フジテレビジョン
・株式会社TBSホールディングス
・日本放送協会（NHK）
・株式会社テレビ朝日ホールディングス
・日本テレビホールディングス株式会社
・株式会社新潮社
・ポニーキャニオン株式会社
・エイベックス株式会社
・ユニバーサルミュージック合同会社
・朝日新聞社
・毎日新聞グループホールディングス

### 必須データ項目
- ✅ 2024-2025年最新データ使用
- ✅ 公式情報のみ（推測・憶測禁止）
- ✅ 数値データは具体的数字必須
- ✅ 「データなし」の場合はnull値で統一

**必須出力フォーマット**：
以下のJSON形式で各企業のデータを出力してください

```json
[
  {
    "id": "MEDIA001",
    "companyName": "[企業名]",
    "industry": "[詳細業種]",
    "metrics": {
      "salary": [平均年収数値],
      "initialSalary": [大卒初任給数値],
      "initialSalaryGrad": [院卒初任給数値],
      "holidays": [年間休日数],
      "overtime": [月平均残業時間],
      "employees": [従業員数],
      "operatingMarginRate": [営業利益率],
      "roe": [ROE],
      "vacationRate": [有給取得率],
      "parentalLeaveReturn": [育休復帰率],
      "maleParentalLeaveRate": [男性育休取得率],
      "femaleParentalLeaveRate": [女性育休取得率],
      "turnoverRate3Years": [3年離職率],
      "averageTenure": [平均勤続年数]
    },
    "features": {
      "businessModel": "[事業モデル50文字以内]",
      "specialization": "[専門分野・強み50文字以内]",
      "workStyle": "[働き方・勤務形態50文字以内]",
      "growth": "[成長機会・キャリア50文字以内]"
    },
    "recruitment": {
      "positions": ["[募集職種1]", "[募集職種2]", "[募集職種3]"],
      "annualHiring": "[年間採用数]",
      "midCareer": "[中途採用状況]",
      "internship": "[インターン状況]"
    },
    "welfare": {
      "housingAllowance": "[住宅手当詳細]",
      "transportationAllowance": "[交通費詳細]",
      "familyAllowance": "[家族手当詳細]",
      "cafeteria": "[食堂・昼食補助]",
      "trainingSupport": "[研修・資格支援]",
      "uniqueBenefits": "[独自福利厚生]",
      "welfareGrade": "[A/B/C/D]",
      "clubActivities": "[部活・サークル]"
    },
    "workEnvironment": {
      "averageAge": [平均年齢],
      "genderRatio": "[男女比率]",
      "remoteWork": "[リモートワーク制度]",
      "flextime": "[フレックス制度]",
      "dressCode": "[服装規定]",
      "officeLocation": "[本社・主要拠点]",
      "workCulture": "[企業文化・風土]"
    },
    "corporate": {
      "established": [設立年],
      "capital": [資本金],
      "listing": "[上場区分]",
      "employees": [連結従業員数],
      "revenue": [売上高],
      "operatingIncome": [営業利益],
      "netIncome": [当期純利益]
    }
  }
]
```

## 🔍 データソース優先順位

### 1. 最優先ソース（信頼度A）
- **有価証券報告書**
- **IR資料・決算説明資料**
- **公式採用サイト**

### 2. 準拠ソース（信頼度B）
- **就職四季報2025年版**
- **マイナビ・リクナビ掲載情報**
- **厚生労働省データベース**

### 3. 参考ソース（信頼度C）
- **業界専門誌・レポート**
- **日経新聞等主要メディア**
- **企業公式プレスリリース**

### 4. 使用禁止（信頼度D）
- ❌ **口コミサイト（OpenWork等）**
- ❌ **推測・憶測データ**
- ❌ **古いデータ（2023年以前）**

## ⚠️ 品質基準

### 必須チェック項目
- [ ] 全企業ID採番統一（MEDIA001-MEDIA020）
- [ ] metrics項目の数値データ完全性
- [ ] features項目の文字数制限遵守
- [ ] welfare項目のwelfareGrade評価基準統一
- [ ] JSON形式の構文エラーチェック

### エラー回避事項
- **推測値使用禁止**: 「約○○万円」「○○万円程度」等の曖昧表現避ける
- **古いデータ禁止**: 2024-2025年以外のデータは使用しない
- **重複チェック**: 既存企業データとの重複確認
- **一貫性保持**: 同業界内でのデータ項目統一

**重要事項**：
- データが見つからない項目は null で記載
- 推測・憶測は絶対に禁止
- 2024-2025年最新データのみ使用
- 全企業を上記JSON形式で出力