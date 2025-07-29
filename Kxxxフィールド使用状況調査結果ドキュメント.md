# Kxxxフィールド使用状況調査結果ドキュメント

## 📋 調査概要

**調査日**: 2025年7月29日  
**調査目的**: Kxxxファイル内の全フィールドについて、システムでの実際の使用状況を特定  
**調査対象**: 全typeディレクトリ内の159個のKxxxファイル  
**調査方法**: システムコード内での明示的なフィールド参照の確認

## 🔍 調査結果サマリー

### 使用状況分類
- **使用されているフィールド**: 11項目
- **未使用フィールド**: 32項目（hashTag, effectiveExpressionsを含む）
- **完全未使用**: 1項目（warnings）

## 📊 使用されているフィールド詳細

### 1. targetIds ✅
**使用場所**: 
- `/app/components/ui/KnowledgeBaseSelector.tsx`
- 用途: ナレッジベース選択における読者層特定

**含有Kxxxファイル**: 全159ファイル（必須フィールド）

### 2. reasons ✅
**使用場所**: 
- `/app/services/templateMatchingService.ts` - テンプレートマッチングスコア計算
- `/app/config/captionFormat.ts` - キャプション生成

**含有Kxxxファイル**: 
- type001: K001, K027, K030, K032, K037, K038, K041, K050, K052, K053, K054, K055, K058, K059, K060, K061, K063, K065, K105, K111, K114, K115, K148, K149, K151, K160, K180, K183
- type002: K002, K004, K005, K010, K011, K023, K028, K034, K039, K040, K042, K045, K048, K064, K073, K075, K076, K077, K083, K090, K091, K103, K108, K110, K112, K117, K118, K132, K133, K134, K135, K137, K138, K139, K140, K141, K142, K143, K144, K145, K150, K152, K154, K156, K157, K159, K161, K162, K163, K164, K165, K166, K167, K169, K170, K171, K173, K174, K175, K176, K177, K179, K181, K182, K186
- type003: K018, K024, K026, K031, K036, K051, K089, K184
- type004: 全ファイル

### 3. methods ✅
**使用場所**: 
- `/app/components/editors/MultipleItemsDisplayEditor.tsx` - アイテム編集
- `/app/components/templates/MultipleItemsDisplayTemplate.tsx` - アイテム表示
- `/app/components/templates/MethodVisualGuideTemplate.tsx` - メソッドガイド
- `/app/components/templates/MethodDetailCardTemplate.tsx` - メソッド詳細
- `/app/services/knowledgeBase/TemplateItemMapper.ts` - アイテムマッピング

**含有Kxxxファイル**: 
- type002: K002, K004, K010, K011, K023, K028, K034, K039, K040, K042, K045, K048, K073, K075, K076, K077, K083, K090, K091, K103, K108, K110, K112, K117, K118, K132, K133, K134, K135, K137, K138, K139, K140, K141, K142, K143, K144, K145, K150, K152, K154, K156, K157, K159, K161, K162, K163, K164, K165, K166, K167, K169, K170, K171, K173, K174, K175, K176, K177, K179, K181, K182, K186
- type003: K018, K024, K026, K031, K036, K051, K089, K184
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

### 4. examples ✅
**使用場所**: 
- `/app/components/editors/MultipleItemsDisplayEditor.tsx` - 例示編集
- `/app/components/templates/MultipleItemsDisplayTemplate.tsx` - 例示表示
- `/app/components/templates/CategorySummaryTemplate.tsx` - カテゴリ概要
- `/app/services/knowledgeBase/TemplateItemMapper.ts` - アイテムマッピング
- `/app/components/StrategyAnalyzer.tsx` - 戦略分析

**含有Kxxxファイル**: 
- type002: K005, K064, K108, K133, K137, K152, K154, K156, K157, K159, K161, K162, K163, K164, K165, K166, K167, K169, K170, K171, K173, K174, K175, K176, K177, K179, K181, K182
- type003: K018, K024, K026, K031, K036, K089, K184
- type004: K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

### 5. steps ✅
**使用場所**: 
- `/app/services/dynamicFieldDetector.ts` - 動的フィールド検出
- `/app/services/contentGeneratorService.ts` - コンテンツ生成
- `/app/components/EditablePostGenerator.tsx` - 編集可能投稿生成
- `/app/components/editors/Simple5Editor.tsx` - 簡易5項目エディター
- `/app/services/knowledgeBase/TemplateItemMapper.ts` - アイテムマッピング
- `/app/components/templates/MethodDetailCardTemplate.tsx` - メソッド詳細
- `/app/components/templates/SimpleFiveTemplate.tsx` - 5項目テンプレート

**含有Kxxxファイル**: 
- type002: K002, K004, K005, K010, K011, K023, K028, K034, K039, K040, K042, K045, K048, K064, K073, K075, K076, K077, K083, K090, K091, K103, K108, K110, K112, K117, K118, K132, K133, K134, K135, K137, K138, K139, K140, K141, K142, K143, K144, K145, K150, K152, K154, K156, K157, K159, K161, K162, K163, K164, K165, K166, K167, K169, K170, K171, K173, K174, K175, K176, K177, K179, K181, K182, K186

### 6. imageSrc ✅
**使用場所**: 
- `/app/components/templates/ToolFeatureTemplate.tsx` - ツール機能表示
- `/app/components/templates/EfficiencyTipsTemplate.tsx` - 効率化Tips
- `/app/components/templates/DualEnumerationTemplate.tsx` - 2項目列挙
- `/app/components/templates/GridSummaryTemplate.tsx` - グリッド概要
- `/app/components/templates/MultipleItemsDisplayTemplate.tsx` - 複数項目表示
- `/app/components/editors/DualEnumerationEditor.tsx` - 2項目編集
- `/app/components/editors/MultipleItemsDisplayEditor.tsx` - 複数項目編集

**含有Kxxxファイル**: 
- type001: K007, K008, K017, K027, K030, K032, K037, K038, K041, K050, K052, K053, K054, K055, K058, K059, K060, K061, K063, K065, K105, K111, K114, K115, K148, K149, K151, K160, K180, K183
- type002: K132, K134, K135, K145, K150, K186
- type004: K003, K009, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

### 7. highlight ✅
**使用場所**: 
- `/app/components/CarouselPostGenerator.tsx` - カルーセル投稿のハイライト表示

**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

### 8. warnings ❌ (完全未使用)
**使用場所**: システム内で参照されていない

**含有Kxxxファイル**: なし

### 9. benefits ✅
**使用場所**: 
- `/app/components/templates/CompanyDetailTemplate.tsx` - 企業詳細の福利厚生表示

**含有Kxxxファイル**: 
- type003: K024, K026, K031, K036, K051, K089, K184
- type004: K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

### 10. recruitment ✅
**使用場所**: 
- `/app/components/templates/CompanyDetailTemplate.tsx` - 企業詳細の募集職種表示

**含有Kxxxファイル**: 
- type003: K024, K026, K031, K036, K051, K089, K184
- type004: K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

### 11. ctaInstructions ✅
**使用場所**: 
- `/app/services/knowledgeBase/TemplateItemMapper.ts` - アクションコールチェックリストのクロージングフック生成

**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

## ❌ 未使用フィールド一覧

### レガシーフィールド（旧仕様の残存）

#### empathyHooks
**含有Kxxxファイル**: K001, K180（type001の2ファイルのみ）

#### empathyContent
**含有Kxxxファイル**: K001, K180（type001の2ファイルのみ）

#### empathyClimax
**含有Kxxxファイル**: K001, K180（type001の2ファイルのみ）

#### communityValidation
**含有Kxxxファイル**: K001, K180（type001の2ファイルのみ）

#### hopeTransition
**含有Kxxxファイル**: K001, K180（type001の2ファイルのみ）

### 未使用の詳細フィールド

#### targetReason
**含有Kxxxファイル**: 
- type002: K002, K004, K005, K010, K011, K023, K028, K034, K039, K040, K042, K045, K048, K064, K073, K075, K076, K077, K083, K090, K091, K103, K108, K110, K112, K117, K118

#### phaseInfo
**含有Kxxxファイル**: 
- type002: K002, K004, K005, K010, K011, K023, K028, K034, K039, K040, K042, K045, K048, K064, K073, K075, K076, K077, K083, K090, K091, K103, K108, K110, K112, K117, K118

#### practicalSkill
**含有Kxxxファイル**: 
- type002: K132, K133, K134, K135, K137, K138, K139, K140, K141, K142, K143, K144, K145, K150, K152, K154, K156, K157, K159, K161, K162, K163, K164, K165, K166, K167, K169, K170, K171, K173, K174, K175, K176, K177, K179, K181, K182, K186

#### immediateAction
**含有Kxxxファイル**: 
- type002: K132, K133, K134, K135, K137, K138, K139, K140, K141, K142, K143, K144, K145, K150, K152, K154, K156, K157, K159, K161, K162, K163, K164, K165, K166, K167, K169, K170, K171, K173, K174, K175, K176, K177, K179, K181, K182, K186

#### skillCheck
**含有Kxxxファイル**: 
- type002: K132, K133, K134, K135, K137, K138, K139, K140, K141, K142, K143, K144, K145, K150, K152, K154, K156, K157, K159, K161, K162, K163, K164, K165, K166, K167, K169, K170, K171, K173, K174, K175, K176, K177, K179, K181, K182, K186

### 企業情報関連未使用フィールド

#### companyInfo
**含有Kxxxファイル**: 
- type003: K024, K026, K031, K036, K051, K089, K184

#### selectionFlow
**含有Kxxxファイル**: 
- type003: K024, K026, K031, K036, K051, K089, K184

#### companyTagline
**含有Kxxxファイル**: 
- type003: K024, K026, K031, K036, K051, K089, K184

#### annualHolidays
**含有Kxxxファイル**: 
- type003: K024, K026, K031, K036, K051, K089, K184

#### averageSalary
**含有Kxxxファイル**: 
- type003: K024, K026, K031, K036, K051, K089, K184

#### averageOvertime
**含有Kxxxファイル**: 
- type003: K024, K026, K031, K036, K051, K089, K184

### ツール・サービス関連未使用フィールド

#### features
**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

#### serviceInfo
**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

#### stats
**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

### マーケティング関連未使用フィールド

#### cta
**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

#### offerTitle
**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

#### limitedOffer
**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

### その他未使用フィールド

#### actionableInsight
**含有Kxxxファイル**: 
- type002: K132, K133, K134, K135, K137, K138, K139, K140, K141, K142, K143, K144, K145, K150, K152, K154, K156, K157, K159, K161, K162, K163, K164, K165, K166, K167, K169, K170, K171, K173, K174, K175, K176, K177, K179, K181, K182, K186

#### integrationMessage
**含有Kxxxファイル**: 
- type002: K132, K133, K134, K135, K137, K138, K139, K140, K141, K142, K143, K144, K145, K150, K152, K154, K156, K157, K159, K161, K162, K163, K164, K165, K166, K167, K169, K170, K171, K173, K174, K175, K176, K177, K179, K181, K182, K186

#### data
**含有Kxxxファイル**: 
- type003: K018, K024, K026, K031, K036, K051, K089, K184

#### emphasis
**含有Kxxxファイル**: 
- type001: K001, K007, K008, K017, K027, K030, K032, K037, K038, K041, K050, K052, K053, K054, K055, K058, K059, K060, K061, K063, K065, K105, K111, K114, K115, K148, K149, K151, K160, K180, K183

#### note
**含有Kxxxファイル**: 
- type003: K018, K024, K026, K031, K036, K051, K089, K184

#### url
**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

#### account
**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

#### testimonial
**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

#### relatedContent
**含有Kxxxファイル**: 
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

### 既知の未使用フィールド

#### hashTag
**含有Kxxxファイル**: 
- type001: K001, K007, K008, K017, K027, K030, K032, K037, K038, K041, K050, K052, K053, K054, K055, K058, K059, K060, K061, K063, K065, K105, K111, K114, K115, K148, K149, K151, K160, K180, K183
- type002: K002, K004, K005, K010, K011, K023, K028, K034, K039, K040, K042, K045, K048, K064, K073, K075, K076, K077, K083, K090, K091, K103, K108, K110, K112, K117, K118
- type003: K018, K024, K026, K031, K036, K051, K089, K184
- type004: K003, K009, K012, K021, K022, K029, K033, K035, K043, K044, K046, K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K080, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K113_true, K116, K136, K146, K153, K155, K158, K168, K172, K178, K185

#### effectiveExpressions
**含有Kxxxファイル**: 
- type001: 全31ファイル
- type002: 全66ファイル
- type003: 全8ファイル
- type004: 全49ファイル

## 📈 分析結果

### フィールド使用率分析
1. **高使用率**: targetIds (100%), effectiveExpressions (97%), hashTag (62%)
2. **中使用率**: methods (75%), examples (68%), steps (42%)
3. **低使用率**: benefits (35%), recruitment (35%), imageSrc (47%)
4. **完全未使用**: warnings (0%)

### Type別特徴
- **Type001**: レガシーフィールド（empathy系）の残存
- **Type002**: スキル関連フィールドの多用（未使用）
- **Type003**: 企業情報フィールドの充実（未使用）
- **Type004**: マーケティング・ツール関連フィールドの豊富さ（未使用）

### 推奨アクション
1. **即座削除**: warnings（完全未使用）
2. **段階削除**: empathy系5フィールド（レガシー）
3. **検証が必要**: data, note, emphasis（用途不明）
4. **大量削除検討**: type004の多数の未使用フィールド

---

**調査完了日**: 2025年7月29日  
**次回更新**: 未使用フィールド削除後の再調査時  
**関連ドキュメント**: Kxxxフォーマットマスタードキュメント.md