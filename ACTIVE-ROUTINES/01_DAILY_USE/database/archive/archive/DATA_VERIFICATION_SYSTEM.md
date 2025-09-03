# データ信頼性確保システム - TEN DATABASE

作成日: 2025-08-30
目的: 虚偽情報を完全排除し、信頼性100%のデータベース構築

## 🚨 重要な品質基準

### 絶対的ルール
1. **虚偽情報は絶対禁止**
2. **推測・憶測は一切記載しない**
3. **存在しない製品は除外**
4. **価格・スペックは公式情報のみ**

## ❌ 疑わしい情報の削除

### 削除対象アイテム
```
❌ デジタルジャー - 存在確認不可、怪しい
❌ SmartPadlock - 具体的製品が特定できない
❌ Relacon - 実在性が疑わしい
❌ 遊べる貯金箱スペースインベーダーテーブル - 製品名が不明確
```

### 確認が必要なアイテム（リサーチ必須）
```
🔍 Thumby - 実在するが詳細確認必要
🔍 SmartTrack Card - Apple AirTag系の類似品？
🔍 heat it - 実在するか要確認
🔍 katamaki - 実在性要確認
🔍 NAISU N1 - 実在性要確認
🔍 Teching Robot - 実在性要確認
🔍 ROBOTOYS - 実在性要確認
🔍 canox - 実在性要確認
🔍 デジタルTLR - 具体的製品名要確認
```

## ✅ 信頼性確認済みアイテム

### 確実に実在する製品
```
✅ Logicool MX Master 3 - ロジクール公式製品
✅ Logicool K380 - ロジクール公式製品
✅ Logicool M575 - ロジクール公式製品
✅ iPad mini（第7世代） - Apple公式製品
✅ ROG Ally X - ASUS公式製品
✅ Analog Pocket - Analogue社公式製品
✅ Boyata PCスタンド - Amazon等で販売確認
✅ CIO製品群 - CIO公式メーカー製品
✅ Anker製品群 - Anker公式製品
✅ SwitchBot製品群 - SwitchBot公式製品
```

## 🔍 データ検証フロー

### Step 1: 存在確認
1. **公式サイト確認** - メーカー公式サイトでの掲載確認
2. **大手ECサイト確認** - Amazon、楽天、ヨドバシ等での販売確認
3. **レビューサイト確認** - 価格.com、ITmedia等でのレビュー存在確認

### Step 2: 情報精度確認
1. **価格の正確性** - 複数サイトでの価格比較
2. **スペックの正確性** - 公式仕様書との照合
3. **機能の正確性** - 実機レビューとの照合

### Step 3: 信頼性ランク付け
```
A級: 公式サイト+大手ECサイト+レビュー多数
B級: 大手ECサイト+レビュー複数
C級: 販売サイトあり+レビュー少数
D級: 情報不足・信頼性低い → 除外
```

## 📊 修正版データベース構造

### 信頼性メタデータ追加
```json
{
  "id": "GADGET_001",
  "name": "Logicool MX Master 3",
  "verification": {
    "reliability_rank": "A",
    "verified_date": "2025-08-30",
    "sources": [
      "https://www.logicool.co.jp/ja-jp/products/mice/mx-master-3.html",
      "https://www.amazon.co.jp/dp/B07W6JG6Z7",
      "https://kakaku.com/item/K0001199568/"
    ],
    "price_verified": true,
    "spec_verified": true,
    "review_count": 1247
  }
}
```

## 🎯 リサーチプロセス改善

### 新規アイテム追加時の必須確認事項

#### 1. 製品実在確認
```javascript
const verifyProduct = (productName) => {
  return {
    officialSite: checkOfficialSite(productName),
    amazonListing: checkAmazonListing(productName),
    priceComReview: checkPriceComReview(productName),
    reliability: calculateReliability()
  }
}
```

#### 2. 価格情報の正確性
- 公式価格との照合
- 複数ECサイトでの価格確認
- セール価格と通常価格の区別

#### 3. 機能・スペックの正確性
- 公式スペックシートとの照合
- 実機レビューでの機能確認
- 誇大広告の排除

## 📋 修正アクションプラン

### Phase 1: 既存データのクリーンアップ
1. **疑わしいアイテムの一時削除**
2. **確認済みアイテムのみ残す**
3. **各アイテムの信頼性ランク付け**

### Phase 2: 検証システムの実装
1. **自動検証スクリプト作成**
2. **信頼性メタデータ追加**
3. **定期的な情報更新システム**

### Phase 3: 品質保証プロセス
1. **新規追加時の必須チェックリスト**
2. **月次での情報更新確認**
3. **ユーザーフィードバック反映**

## ⚠️ 今後の注意事項

### 絶対に避けるべき行為
1. **存在しない製品の作成**
2. **価格・スペックの推測記載**
3. **機能の誇大表現**
4. **レビュー・評価の捏造**

### 推奨する情報源
```
✅ メーカー公式サイト
✅ Amazon・楽天等大手ECサイト
✅ 価格.com・ITmedia等信頼性高いレビューサイト
✅ YouTube等の実機レビュー動画
❌ 個人ブログの未確認情報
❌ SNSの噂・推測情報
❌ 海外サイトの翻訳情報（要検証）
```

## 🎯 最終目標

**「TEN DATABASEは100%信頼できる情報源」**として認知されること

- 全アイテムが実在する製品
- 価格・スペック情報が正確
- 機能説明に誇大表現なし
- ユーザーが安心して参考にできる

この品質基準を維持することで、TENブランドの信頼性向上と、ユーザーの実際の購買決定支援を実現する。