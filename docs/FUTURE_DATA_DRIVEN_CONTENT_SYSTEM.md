# 📊 将来構想: データ駆動型情報コンテンツシステム

**作成日**: 2025-07-22  
**対象投稿タイプ**: 業界・企業情報まとめ（003）  
**実装優先度**: 将来タスク（Phase E以降）

---

## 🎯 **システム概要**

### **基本コンセプト**
現在のナレッジベース方式から、**定量データベース + スコアマッチング + 自動表生成**方式への進化

### **対象コンテンツタイプ**
- **ホワイト企業10選** → 企業データベース
- **書籍紹介** → 書籍データベース  
- **プロンプト10選** → プロンプトデータベース
- **その他情報系コンテンツ** → 各種専門データベース

---

## 🏗️ **システム設計**

### **データフロー**
```
定量データベース → スコア計算 → 上位抽出 → 表形式テンプレート → コンテンツ生成
```

### **具体例: ホワイト企業10選**

#### **データベース構造**
```json
{
  "companies": {
    "company_001": {
      "name": "株式会社○○",
      "logo": "path/to/logo.png",
      "metrics": {
        "averageSalary": 850,
        "paidLeaveRate": 87.5,
        "overtimeHours": 15.2,
        "employeeSatisfaction": 4.2,
        "welfareScore": 92,
        "workLifeBalance": 4.5
      },
      "detailedInfo": {
        "industry": "IT・ソフトウェア",
        "employeeCount": 1250,
        "benefits": ["住宅手当", "育児支援", "フレックス制"]
      }
    }
  }
}
```

#### **スコア計算システム**
```typescript
interface ScoreWeights {
  averageSalary: number;      // 0.2
  paidLeaveRate: number;      // 0.25
  overtimeHours: number;      // 0.2 (逆計算)
  employeeSatisfaction: number; // 0.15
  welfareScore: number;       // 0.1
  workLifeBalance: number;    // 0.1
}

function calculateWhiteCompanyScore(company: Company, weights: ScoreWeights): number {
  // 加重平均計算ロジック
}
```

---

## 📋 **各データベース仕様**

### **1. 企業データベース**
```
ファイル: /data/databases/companies.json
用途: ホワイト企業、優良メーカー、隠れ優良企業等
メトリクス: 給与、有休、残業、満足度、福利厚生、成長性
```

### **2. 書籍データベース**
```  
ファイル: /data/databases/books.json
用途: 就活本、ビジネス書、スキル本等
メトリクス: Amazon評価、売上ランク、専門性、実用性、読みやすさ
```

### **3. プロンプトデータベース**
```
ファイル: /data/databases/prompts.json  
用途: ChatGPTプロンプト、AI活用術等
メトリクス: 効果性、汎用性、実用性、初心者度、成果事例
```

### **4. AIツールデータベース**
```
ファイル: /data/databases/ai_tools.json
用途: AI活用ツール、効率化ツール等  
メトリクス: 機能性、使いやすさ、コスパ、学習コスト、実績
```

---

## 🎨 **表示テンプレート設計**

### **基本テンプレート構造**
```typescript
interface TableTemplate {
  title: string;
  headers: string[];
  rows: TableRow[];
  visualElements: {
    logos: boolean;
    charts: boolean;
    badges: boolean;
  };
}
```

### **テンプレートバリエーション**

#### **企業ランキング表**
```
[ロゴ] | 企業名 | 平均年収 | 有休取得率 | 残業時間 | 総合スコア
```

#### **書籍比較表**  
```
[表紙] | 書籍名 | 著者 | 評価 | 価格 | 実用度
```

#### **ツール機能表**
```
[アイコン] | ツール名 | 機能 | 料金 | 学習コスト | おすすめ度  
```

---

## 🔧 **技術実装要件**

### **新規作成ファイル**
```
/app/services/dataBase/
├── DatabaseManager.ts        // データベース管理
├── ScoreCalculator.ts       // スコア計算エンジン
├── TableGenerator.ts        // 表形式生成
└── DataDrivenController.ts  // 統合制御

/data/databases/
├── companies.json
├── books.json  
├── prompts.json
└── ai_tools.json

/app/templates/dataDriven/
├── CompanyRankingTemplate.tsx
├── BookComparisonTemplate.tsx
└── ToolComparisonTemplate.tsx
```

### **既存システムとの統合**
```typescript
// 既存のナレッジフローに追加
if (postType === '003' && contentType === 'data-driven') {
  // データベース駆動型生成
  return DataDrivenController.generate(request);
} else {
  // 従来のナレッジベース型生成  
  return KnowledgeBaseController.generate(request);
}
```

---

## 📊 **運用フロー**

### **コンテンツ生成時**
1. **リクエスト受信**: "ホワイト企業10選を作って"
2. **データベース照会**: companies.jsonから全企業取得
3. **スコア計算**: 各企業のホワイト企業スコア算出
4. **上位抽出**: スコア上位10社を選択
5. **表生成**: CompanyRankingTemplateで表形式作成
6. **コンテンツ出力**: ロゴ付き企業ランキング表完成

### **データベース更新**
- **定期更新**: 四半期ごとに最新データで更新
- **ソース管理**: 信頼できるデータソース（厚労省、各社IR等）
- **品質保証**: データ検証・異常値チェック

---

## 🎯 **実装優先順序**

### **Phase E (データベース基盤)**
1. DatabaseManager基本機能
2. 企業データベース構築（100社程度）
3. スコア計算エンジン

### **Phase F (テンプレート)**  
1. 企業ランキング表テンプレート
2. 既存システムとの統合
3. UI・表示調整

### **Phase G (拡張)**
1. 書籍・プロンプト・ツールデータベース
2. 追加テンプレート
3. 自動更新システム

---

## ✅ **期待効果**

### **品質向上**
- **客観的データ**: 感情的判断を排除
- **定量評価**: 明確な根拠に基づく順位付け
- **最新性**: 定期更新による情報鮮度維持

### **効率化**
- **自動生成**: 手動調査・作成時間の大幅短縮  
- **一貫性**: 同一基準での公平な比較
- **拡張性**: 新しい情報系コンテンツへの応用

### **ユーザー価値**
- **信頼性**: データ根拠による説得力
- **実用性**: 意思決定に直接活用可能
- **比較性**: 並列比較による選択支援

---

**実装時期**: Phase D1完了後の将来フェーズ  
**関連タスク**: 情報系投稿タイプの高度化  
**責任者**: 次世代開発チーム