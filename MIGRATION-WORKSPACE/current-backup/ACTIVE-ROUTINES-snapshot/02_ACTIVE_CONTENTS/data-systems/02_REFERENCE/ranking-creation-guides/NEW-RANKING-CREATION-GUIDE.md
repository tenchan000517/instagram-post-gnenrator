# 新規ランキングカテゴリ作成ガイド
## 2025年8月28日版

---

## 📌 作成予定の新ランキングカテゴリ

### 企業ランキング系（追加予定）
- 成長企業ランキング
- 女性活躍企業ランキング
- ESG経営企業ランキング
- リモートワーク充実企業ランキング
- 研修制度充実企業ランキング
- 初任給高額企業ランキング

### 新規データベース系（Type004対応）
- **MBTI適職ランキング**
- **習慣ランキング**
- **ガジェットランキング**
- **ツールランキング**

---

## 🎯 新規ランキング作成の基本フロー

### Step 1: データ収集・構造設計
```
1. ランキングテーマの決定
2. 評価基準の明確化
3. データ項目の定義
4. 収集方法の決定（調査・スクレイピング・公開データ活用）
```

### Step 2: データベース構築
```
1. 個別JSONファイル作成（カテゴリ別）
2. 統合スクリプト作成（必要に応じて）
3. ランキング生成ロジック実装
4. パターン定義（ターゲット別バリエーション）
```

### Step 3: Instagram投稿化
```
1. Type003 KIKUYO起動術式でナレッジファイル生成
2. K番号割り当て（K801〜K890：企業系、K900〜：新規DB系）
3. unified-template-11-company-ranking形式で作成
4. keyHighlights 7文字制限遵守
```

---

## 📊 企業ランキング追加の具体的手順

### 例：女性活躍企業ランキング

#### 1. データ項目定義
```javascript
{
  "femaleMetrics": {
    "femaleManagerRatio": null,      // 女性管理職比率
    "femaleExecutiveRatio": null,    // 女性役員比率
    "maternityLeaveRate": null,      // 産休取得率
    "returnRate": null,               // 復職率
    "nadeshikoStatus": null,          // なでしこ銘柄認定
    "workLifeBalanceScore": null     // WLBスコア
  }
}
```

#### 2. 既存企業データに追加
- companyMasterData.jsonの各企業に上記項目を追加
- 公開データ（有価証券報告書、CSRレポート等）から収集

#### 3. ランキング生成関数追加
```javascript
// advancedRankingGenerator.jsに追加
generateFemaleEmpowermentRanking(limit = 10) {
  return this.companies
    .filter(c => c.femaleMetrics && c.femaleMetrics.femaleManagerRatio)
    .sort((a, b) => {
      // 複合スコア計算
      const scoreA = this.calculateFemaleScore(a);
      const scoreB = this.calculateFemaleScore(b);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}
```

#### 4. targetNeedsPatternsに追加
```javascript
// 女性キャリア向けパターン追加
{
  id: 'FC031',
  name: '女性活躍企業TOP10',
  target: '女性キャリア',
  criteria: 'femaleEmpowerment',
  filters: {},
  limit: 10
}
```

---

## 🆕 新規データベース（MBTI・習慣等）作成手順

### 例：MBTI適職ランキング

#### 1. データ構造設計
```javascript
// mbtiCareerDatabase.json
{
  "version": "2025-08",
  "mbtiTypes": [
    {
      "type": "INTJ",
      "name": "建築家",
      "population": "2.1%",
      "careers": [
        {
          "rank": 1,
          "career": "戦略コンサルタント",
          "fitScore": 95,
          "reason": "長期的視野と分析力を活かせる"
        },
        // ...
      ]
    }
  ]
}
```

#### 2. 収集・整理
- 信頼できる心理学研究・キャリア研究データ
- 各MBTIタイプ×適職マッチング分析
- 16タイプ×10職種 = 160データポイント

#### 3. ランキング生成システム
```javascript
// mbtiRankingGenerator.js
class MBTIRankingGenerator {
  generateCareerRanking(mbtiType, limit = 10) {
    const typeData = this.database.mbtiTypes
      .find(t => t.type === mbtiType);
    
    return typeData.careers
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, limit);
  }
  
  generateByIndustry(industry) {
    // 業界別のMBTI適性ランキング
  }
}
```

---

## 📝 Type003/Type004使い分けルール

### Type003（KIKUYO）使用
- ランキング形式
- データ比較・分析系
- 客観的情報提供
- 例：企業ランキング、習慣ランキング

### Type004（TEN）使用  
- ツール・効率化系
- How-to形式
- 実践的ソリューション
- 例：ガジェット紹介、ツール活用法

---

## ✅ チェックリスト

### データベース作成前
- [ ] テーマの市場需要確認
- [ ] データ収集可能性の検証
- [ ] 信頼できる情報源の確保
- [ ] 更新頻度・メンテナンス計画

### 作成中
- [ ] データ構造の一貫性
- [ ] ランキング基準の明確化
- [ ] ターゲット別バリエーション設計
- [ ] 品質保証（データ正確性）

### 投稿化
- [ ] Type003/004の適切な選択
- [ ] K番号の体系的管理
- [ ] テンプレート仕様準拠
- [ ] keyHighlights文字数制限

---

## 🚀 次のアクション

1. **最優先：初任給高額企業ランキング**
   - 既存JS001を改良・拡張
   - K801として正式ナレッジ化

2. **企業DB拡張：女性活躍・ESG・リモートワーク**
   - 既存84社にデータ項目追加
   - 新ランキングパターン実装

3. **新規DB構築：MBTI適職**
   - 16タイプ×適職データ収集
   - 独立したDBシステム構築

4. **Type004対応：ツール・ガジェット**
   - 効率化ツールDB設計
   - TEN起動術式準備

---

## 📚 参考資料

- `/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/feed-post-system/02_TYPE_ACTIVATION/TYPE003-KIKUYO-ACTIVATION.md`
- 既存システム：`advancedRankingGenerator.js`、`targetNeedsPatterns.js`
- アーカイブ参考：`99_ARCHIVE/company-database-legacy/data-integration-workflow.md`

---

**作成者**: Claude Code  
**最終更新**: 2025年8月28日