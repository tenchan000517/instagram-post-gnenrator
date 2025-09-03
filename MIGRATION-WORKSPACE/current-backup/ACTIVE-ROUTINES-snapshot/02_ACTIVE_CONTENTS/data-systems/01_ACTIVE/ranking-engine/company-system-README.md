# 企業ランキングジェネレーター

## 概要
就活・転職者向けの企業ランキングを動的に生成するシステムです。様々な条件でランキングを組み換え、Instagram投稿用のナレッジファイル作成に活用できます。

## ファイル構成

```
companyDatabase/
├── companyMasterData.json     # 企業詳細データ
├── rankingGenerator.js        # ランキング生成システム
├── usage-examples.js          # 使用例
└── README.md                  # このファイル
```

## 基本的な使用方法

### 1. セットアップ
```javascript
const CompanyRankingGenerator = require('./rankingGenerator.js');
const companyData = require('./companyMasterData.json');
const generator = new CompanyRankingGenerator(companyData);
```

### 2. 年収ランキング生成
```javascript
// トップ15社の年収ランキング
const salaryRanking = generator.generateSalaryRanking(15);

// 業界限定（例：総合商社）
const tradingRanking = generator.generateSalaryRanking(10, '商社');
```

### 3. ホワイト企業ランキング生成
```javascript
// 年間休日・残業時間重視のランキング
const whiteRanking = generator.generateWhiteCompanyRanking(15);
```

### 4. 総合評価ランキング生成
```javascript
// 年収・働きやすさ・将来性を総合評価
const overallRanking = generator.generateOverallRanking(15);
```

### 5. カスタム条件検索
```javascript
const customRanking = generator.generateCustomRanking({
  industry: '製薬',              // 業界フィルター
  salaryRange: [8000000, 20000000], // 年収範囲（800万〜2000万）
  holidayRange: [125, 135],      // 年間休日範囲
  sortBy: 'overall',             // ソート基準
  limit: 10                      // 取得件数
});
```

## 利用可能なメソッド

| メソッド名 | 説明 | パラメータ例 |
|-----------|------|-------------|
| `generateSalaryRanking(limit, industry)` | 年収ランキング | `(15, '商社')` |
| `generateWhiteCompanyRanking(limit)` | ホワイト企業ランキング | `(15)` |
| `generateIndustryRanking(industry, criteria)` | 業界別ランキング | `('製薬', 'salary')` |
| `generateOverallRanking(limit)` | 総合評価ランキング | `(15)` |
| `generateCustomRanking(conditions)` | カスタム条件検索 | 上記例参照 |

## データ追加方法

### 新しい企業を追加する場合
`companyMasterData.json`の`companies`配列に以下の形式で追加：

```json
{
  "id": "C009",
  "companyName": "新企業名",
  "industry": "業界名",
  "metrics": {
    "salary": 15000000,        // 年収（円）
    "holidays": 130,           // 年間休日数
    "overtime": 25,            // 月間残業時間
    "employees": 5000,         // 従業員数
    "operatingMarginRate": 15.5, // 営業利益率（%）
    "roe": 12.0               // ROE（%）
  },
  "features": {
    "businessModel": "事業モデル",
    "specialization": "専門分野",
    "workStyle": "働き方の特徴",
    "growth": "成長性"
  },
  "recruitment": {
    "positions": ["職種1", "職種2"],
    "annualHiring": "100-150"
  },
  "scores": {
    "salary": "A",
    "worklife": "B", 
    "overall": "A"
  }
}
```

### 新しい業界カテゴリを追加する場合
`categories.industry`に業界名とその企業IDリストを追加：

```json
"categories": {
  "industry": {
    "新業界": ["C009", "C010", "C011"]
  }
}
```

## Instagram投稿への活用

生成されたランキングデータは以下のように活用できます：

1. **ナレッジファイル作成**: ランキング結果をK200.json等の形式に変換
2. **投稿コンテンツ生成**: 企業説明文やハイライト情報を投稿文に活用
3. **条件別コンテンツ**: 業界別、年収帯別、働き方別等のテーマ別投稿作成

## 実行方法

```bash
# 使用例の実行
node usage-examples.js

# 独自のスクリプト作成
node your-custom-script.js
```

## 注意事項

- 企業データは定期的に更新してください
- 年収データは公開情報に基づく推定値です
- ランキング生成時は最新データを使用してください
- 新しい企業追加時は、categoriesの更新も忘れずに行ってください

## トラブルシューティング

**Q: ランキングに企業が表示されない**
A: `categories.industry`に企業IDが正しく登録されているか確認してください

**Q: カスタム検索で結果が0件**
A: 条件が厳しすぎる可能性があります。範囲を広げて再試行してください

**Q: 総合スコアの計算方法は？**
A: `getOverallScore()`メソッドで年収30%、休日25%、残業25%、営業利益率20%の重み付け平均で算出しています