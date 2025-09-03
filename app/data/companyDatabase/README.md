# 企業データベース・ランキングシステム
## 2025年8月28日版

## 概要
15業界84社の企業データを統合し、90パターンのランキング生成とInstagram投稿用ナレッジファイル作成を支援するシステムです。

## ファイル構成

```
companyDatabase/
├── companyMasterData.json       # 84社統合データベース
├── createUnifiedDatabase.js    # DB統合スクリプト
├── advancedRankingGenerator.js # 高度ランキング生成エンジン
├── generateAllRankings.js      # 90パターン一括実行
├── targetNeedsPatterns.js      # 90パターン定義
├── /industries/                # 15業界個別JSONファイル
├── /rankings/                  # 90パターン生成済みランキング
└── README.md                   # このファイル
```

## 基本的な使用方法

### 1. 90パターンランキング一括生成
```bash
# 90パターン全自動生成
node generateAllRankings.js

# 結果は /rankings/ フォルダに出力
```

### 2. 個別ランキング生成
```javascript
const AdvancedRankingGenerator = require('./advancedRankingGenerator.js');
const companyData = require('./companyMasterData.json');
const generator = new AdvancedRankingGenerator(companyData);

// 初任給ランキング
const salaryRanking = generator.generateInitialSalaryRanking(10);

// ワークライフバランス企業
const wlbRanking = generator.generateWorkLifeBalanceRanking(10, {
  holidaysRange: [125, null],
  overtimeRange: [null, 25]
});

// 年収ランキング（男性社会人向け）
const highSalaryRanking = generator.generateHighSalaryRanking(20);
```

### 3. ターゲット別パターン
```javascript
const patterns = require('./targetNeedsPatterns.js');

// 就活生向け30パターン
const jobSeekerPatterns = patterns.jobSeekers;

// 女性キャリア向け30パターン  
const femaleCareerPatterns = patterns.femaleCareer;

// 男性社会人向け30パターン
const maleProfessionalPatterns = patterns.maleProfessional;
```

## 利用可能なメソッド

| メソッド名 | 説明 | パラメータ例 |
|-----------|------|-------------|
| `generateInitialSalaryRanking(limit)` | 初任給ランキング | `(10)` |
| `generateHighSalaryRanking(limit)` | 高年収ランキング | `(20)` |
| `generateWorkLifeBalanceRanking(limit, filters)` | WLBランキング | `(10, {holidaysRange: [125, null]})` |
| `generateOverallRanking(limit)` | 総合評価ランキング | `(15)` |
| `generateIndustrySpecificRanking(industry, criteria, limit)` | 業界別ランキング | `('IT', 'salary', 10)` |

## データ構造

### 企業データ統合DB (companyMasterData.json)
```json
{
  "version": "2025-08-28",
  "lastUpdated": "2025-08-28",
  "totalIndustries": 15,
  "totalCompanies": 84,
  "industries": [
    {
      "industryId": "IT",
      "industryName": "IT業界", 
      "totalCompanies": 6,
      "companies": [企業データ配列]
    }
  ]
}
```

### 15業界個別JSONファイル
- `IT_companies.json` - IT業界6社
- `trading_companies.json` - 商社業界5社
- `electronics_companies.json` - 総合電機業界5社
- `gaming_companies.json` - ゲーム業界5社
- `financial_companies.json` - 金融業界6社
- `consulting_companies.json` - コンサル業界4社
- `automotive_companies.json` - 自動車業界5社
- `media_companies.json` - メディア・広告業界5社
- `realestate_companies.json` - 不動産・建設業界5社
- `chemical_companies.json` - 化学業界5社
- `foreign_it_companies.json` - 外資系IT業界6社
- `retail_companies.json` - 小売・サービス業界6社
- `pharmaceutical_companies.json` - 製薬業界5社
- `telecom_companies.json` - 通信インフラ業界6社
- `infrastructure_companies.json` - インフラ業界5社

**合計**: 15業界84社

## Instagram投稿への活用

### Type003 KIKUYO起動術式での活用
1. **90パターンランキング** → **K801〜K890ナレッジファイル**
2. **unified-template-11-company-ranking**形式で投稿生成
3. **ターゲット別最適化**（就活生・女性キャリア・男性社会人）

### 参考ガイド
- Type003起動術式: `/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/02_TYPE_ACTIVATION/TYPE003-KIKUYO-ACTIVATION.md`
- 新規ランキング作成: `/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/data-systems/02_REFERENCE/ranking-creation-guides/NEW-RANKING-CREATION-GUIDE.md`

## 実行方法

```bash
# 90パターン一括生成
node generateAllRankings.js

# DB統合スクリプト実行（業界JSONファイル更新時）
node createUnifiedDatabase.js

# 個別テスト
node -e "
const generator = require('./advancedRankingGenerator.js');
const data = require('./companyMasterData.json');
const g = new generator(data);
console.log(g.generateInitialSalaryRanking(5));
"
```

## 90パターン生成結果

### ターゲット別パターン数
- **就活生向け**: 30パターン (`/rankings/jobSeekers/`)
- **女性キャリア向け**: 30パターン (`/rankings/femaleCareer/`) 
- **男性社会人向け**: 30パターン (`/rankings/maleProfessional/`)

### 生成状況
- **成功率**: 100% (90/90パターン)
- **最終実行日**: 2025年8月28日
- **実行ログ**: `/rankings/execution_summary.json`

## 注意事項

- レガシーファイルは`99_ARCHIVE/company-database-legacy/`に移動済み
- 新規ランキング追加は`NEW-RANKING-CREATION-GUIDE.md`を参照
- データ更新後は`createUnifiedDatabase.js`→`generateAllRankings.js`の順で実行
- K801〜K890番台はこのシステム専用のナレッジID

## システム拡張予定

### 企業ランキング系（追加予定）
- 成長企業ランキング
- 女性活躍企業ランキング  
- ESG経営企業ランキング
- リモートワーク充実企業ランキング

### 新規データベース系
- **MBTI適職ランキング** (K900番台～)
- **習慣ランキング**
- **ガジェットランキング** 
- **ツールランキング**

---

**作成**: Claude Code  
**最終更新**: 2025年8月28日  
**現在のステータス**: Phase1-2完了、Phase3移行準備完了