# リサーチ結果JSON保存マスタープロンプト

**目的**: ChatGPTリサーチ結果を業界別JSONファイルに保存  
**対象**: Claude Code（セッション変更対応）  
**基準**: 既存JSON構造完全準拠、データ整合性確保  

---

## 🎯 処理フロー

### 1. JSON構文検証
```
入力データ検証:
- JSON形式の正確性確認
- 必須フィールド存在確認
- データ型整合性確認
- エラーがある場合は修正指示
```

### 2. 企業業界自動判定
```
業界判定ロジック:
- companyName/industry フィールドから業界特定
- 以下8業界への自動分類

判定ルール:
「官公庁」「公社」「団体」「省」「庁」→ government_companies.json
「病院」「医療」「薬局」「クリニック」「医」→ medical_companies.json  
「鉄道」「航空」「JR」「ANA」「JAL」→ transport_companies.json
「機械」「重工」「製作所」「工機」→ machinery_companies.json
「人材」「リクルート」「派遣」「転職」→ hr_companies.json
「銀行」「証券」「信託」「金庫」→ banking_companies.json
「食品」「飲料」「農業」「水産」「食」→ food_companies.json
「運輸」「物流」「配送」「倉庫」「エネルギー」→ logistics_companies.json
```

### 3. IDの自動採番
```
採番ルール:
GOVERNMENT → GOV001, GOV002...
MEDICAL → MED001, MED002...
TRANSPORT → TRA001, TRA002...
MACHINERY → MAC001, MAC002...
HR → HR001, HR002...
BANKING → BAN001, BAN002...
FOOD → FOD001, FOD002...
LOGISTICS → LOG001, LOG002...

既存ファイル確認→次の空き番号自動割り当て
```

### 4. 既存JSONファイルへの追加
```
処理手順:
1. 対象業界JSONファイル読み込み
2. 既存companies配列に新企業追加
3. totalCompanies数値更新
4. averageSalary再計算
5. lastUpdated更新
6. ファイル保存
```

### 5. データ整合性確保
```
必須チェック項目:
- 重複企業の確認・回避
- JSON構文エラーなし
- 必須フィールド完全性
- 数値データ型統一
- null値適切処理
```

---

## 📋 保存形式

### ファイル構造
```json
{
  "version": "2025-08-28",
  "industry": "[業界名]",
  "lastUpdated": "2025-08-28",
  "totalCompanies": [企業数],
  "averageSalary": [平均年収],
  "companies": [
    {企業データ配列}
  ]
}
```

### 企業データ完全検証
```
必須フィールド確認:
✓ id, companyName, industry
✓ metrics (全12項目)
✓ features (4項目)
✓ recruitment (3項目)  
✓ welfare (8項目)
✓ workEnvironment (7項目)
✓ corporate (7項目)
```

---

## ⚠️ エラーハンドリング

### よくあるエラーと対処
```
1. JSON構文エラー → 修正箇所指摘・修正版提示
2. 業界判定不明 → 手動確認要求
3. ID重複 → 次番号自動割り当て
4. 必須項目欠損 → null値で補完
5. データ型不一致 → 適切な型に変換
```

### 保存失敗時の対応
```
1. ファイルパス確認
2. 書き込み権限確認  
3. JSON構文再検証
4. バックアップからの復旧手順提示
```

---

## 🔄 実行完了確認

### 必須確認事項
```
保存完了チェックリスト:
□ 対象JSONファイルに新企業追加確認
□ totalCompanies数値更新確認
□ averageSalary再計算確認
□ JSON構文エラーなし確認
□ 重複企業なし確認
```

### 次ステップ案内
```
保存完了後の推奨作業:
1. 02_データベース統合起動術式.md 実行
2. createUnifiedDatabase.js で統合DB更新
3. generateAllRankings.js でランキング生成
4. TYPE003起動術式での動作確認
```

---

**重要事項**:
- 既存データを破壊しない
- 必ずバックアップを意識した作業
- エラー時は詳細な状況説明を提供
- 保存成功時は具体的な変更内容を報告