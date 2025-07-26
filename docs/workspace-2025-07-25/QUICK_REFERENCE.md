# クイックリファレンス - 必要情報一覧

## 🎯 最重要情報（30秒で把握）

### **✅ 完了した分析**
- **TypeID=003**: 36件 → 3パターン（体系化18件、実践12件、データ6件）
- **TypeID=004**: 34件 → 3パターン（ツール16件、企業11件、活用7件）
- **全体**: 116件 → 15パターン完全分類

### **❌ 最重要未実装（4つで70.7%カバー）**
1. `SystematicInformationTemplate.tsx` - 18件対応
2. `ToolServiceIntroductionTemplate.tsx` - 16件対応  
3. `PracticalGuideTemplate.tsx` - 12件対応
4. `CompanyInfoIntroductionTemplate.tsx` - 11件対応

---

## 📊 パターン別詳細

### **TypeID=003（情報提供・データ型）**
```
パターン1: 体系化情報提供型（18件）
├─ 特徴: 番号付きリスト、カテゴリ別整理、教育的内容
├─ フロー: 導入 → カテゴリ別情報 → 詳細解説 → まとめ → CTA
└─ 例: K004自己分析5選、K011業界職種、K018業界マップ

パターン2: 実践ガイド型（12件）  
├─ 特徴: ステップバイステップ、模範例、テンプレート提供
├─ フロー: 課題設定 → 具体的手順 → 事例・模範回答 → 実践方法 → CTA
└─ 例: K003AI記事作成、K025電話マナー、K028面接対策

パターン3: データ提示型（6件）
├─ 特徴: 調査結果、統計データ、ランキング形式、比較情報
├─ フロー: 導入 → データ提示 → 分析・解釈 → 活用方法 → CTA
└─ 例: K024大手企業5社、K026インターンTOP50、K036夏インターン18選
```

### **TypeID=004（効率・実用特化型）**
```
パターン1: ツール・サービス紹介型（16件）
├─ 特徴: 具体的ツール名、スクリーンショット、効果説明
├─ フロー: 導入 → ツール並列紹介（6-12個）→ 各ツール詳細 → 実践促進
└─ 例: K009AIツール×6、K043Webサービス×12、K102実用ツール×10

パターン2: 企業・制度情報型（11件）
├─ 特徴: 企業名、制度内容、数値データ、比較検討フォーマット  
├─ フロー: 導入 → 企業並列紹介（6-10社）→ 制度説明 → 検討促進
└─ 例: K012副業OK×8、K021住宅手当×10、K022在宅勤務×8

パターン3: 活用・機能紹介型（7件）
├─ 特徴: 身近なサービス・アプリの隠れた機能、即実践可能
├─ フロー: 導入 → 機能並列紹介（6-8個）→ 使い方・効果説明 → 実践促進
└─ 例: K093スマホ×8、K097Google×8、K099Excel×6
```

---

## 🔧 実装テンプレート場所

### **✅ 実装済み（18個）**
**場所**: `/app/components/templates/`

**基本**: Index, Enumeration, List, ExplanationTwo, SimpleThree, Table, SimpleFive, SimpleSix, SectionItems, TwoColumnSectionItems, TitleDescriptionOnly, ChecklistEnhanced, ItemNTitleContent, SingleSectionNoItems, Ranking, Graph

**新規**: FeatureParallelInfo, FeatureDetailTips

### **❌ 未実装（必要4個）**
**作成場所**: `/app/components/templates/`

1. `SystematicInformationTemplate.tsx`
2. `ToolServiceIntroductionTemplate.tsx` 
3. `PracticalGuideTemplate.tsx`
4. `CompanyInfoIntroductionTemplate.tsx`

---

## 📋 設定ファイル

### **テンプレート管理**
- **TemplateRegistry.ts**: テンプレート登録・選択システム
- **TemplateTypes.ts**: 型定義とメタデータ  
- **index.ts**: エクスポート管理

### **選択ロジック**
- **TemplateSelector.selectOptimalTemplate()**: 自動選択
- **高優先度パターン検出**: 特定コンテンツ形式識別
- **ジャンルベース選択**: 4ジャンルカテゴリ対応

---

## 📈 開発インパクト

### **数値目標**
- **Phase 1完了**: 70.7%（82件/116件）カバー
- **実装工数**: 4テンプレート × 2日 = 8日  
- **ROI**: 最小工数で最大カバレッジ

### **品質保証**
- ✅ 全70件ファイル実読・分析済み
- ✅ 憶測排除・事実ベース分析
- ✅ TypeID=001,002と同等品質維持

---

## 🚀 即座に着手すべき作業

1. **SystematicInformationTemplate.tsx**の設計・実装
2. **ToolServiceIntroductionTemplate.tsx**の設計・実装

これにより、システムの実用性が劇的に向上し、ナレッジベース生成システムが本格稼働可能になります。

---

**最終更新**: 2025-07-25  
**参照元**: workspace-2025-07-25/INDEX.md  
**使用目的**: 開発者の即座の情報把握