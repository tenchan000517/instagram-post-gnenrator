# 業界別企業ディープリサーチプロンプト - テンプレート

**目的**: 新業界の上位企業詳細データ収集  
**形式**: バッチ10社単位  
**出力**: 既存companyMasterData.json形式準拠  

---

## 🎯 リサーチ対象企業リスト

**業界名**: [業界名を記入]  
**リサーチバッチ**: Batch-[番号]  
**企業選定基準**: [業界売上高/時価総額/従業員数]上位企業  

### 対象企業10社
1. [企業名1]（[業界内順位]位）
2. [企業名2]（[業界内順位]位）
3. [企業名3]（[業界内順位]位）
4. [企業名4]（[業界内順位]位）
5. [企業名5]（[業界内順位]位）
6. [企業名6]（[業界内順位]位）
7. [企業名7]（[業界内順位]位）
8. [企業名8]（[業界内順位]位）
9. [企業名9]（[業界内順位]位）
10. [企業名10]（[業界内順位]位）

---

## 📋 リサーチ指示

上記10社について、**既存companyMasterData.json形式**に完全準拠したデータを収集してください。

### 必須データ項目
- ✅ 2024-2025年最新データ使用
- ✅ 公式情報のみ（推測・憶測禁止）
- ✅ 数値データは具体的数字必須
- ✅ 「データなし」の場合はnull値で統一

---

## 🎯 出力フォーマット（JSON形式）

```json
{
  "industry": "[業界名]",
  "lastUpdated": "2025-08-28",
  "totalCompanies": 10,
  "averageSalary": [計算値],
  "companies": [
    {
      "id": "[業界ID][連番]",
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
        "positions": [
          "[募集職種1]",
          "[募集職種2]",
          "[募集職種3]"
        ],
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
}
```

---

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

---

## ⚠️ 品質基準

### 必須チェック項目
- [ ] 全企業ID採番統一（[業界ID][001-010]）
- [ ] metrics項目の数値データ完全性
- [ ] features項目の文字数制限遵守
- [ ] welfare項目のwelfareGrade評価基準統一
- [ ] JSON形式の構文エラーチェック

### エラー回避事項
- **推測値使用禁止**: 「約○○万円」「○○万円程度」等の曖昧表現避ける
- **古いデータ禁止**: 2024-2025年以外のデータは使用しない
- **重複チェック**: 既存84社との重複確認
- **一貫性保持**: 同業界内でのデータ項目統一

---

## 📊 出力後の次ステップ

1. **JSON構文チェック** → バリデーション実行
2. **既存DB重複確認** → companyMasterData.jsonとの照合
3. **業界ファイル作成** → `/industries/[業界名]_companies.json`
4. **統合DB更新** → `createUnifiedDatabase.js`実行
5. **ランキング再生成** → `generateAllRankings.js`実行

---

**リサーチ実行時の注意**: このテンプレートを業界名・企業リストを具体的に記入してから使用してください。