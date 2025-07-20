# Instagram投稿生成システム - 完全フロー解明書

## 🦋 蝶の羽ばたき効果への理解

> **「ほんの一行の修正がシステム全体に波及し、コンテンツがテンプレートにUIとして表示されるその瞬間まで影響する」**

この原理に基づき、フォーマッターから最終表示まで、全ての関連要素を完全に解明・記録します。

---

## 📊 実際のシステムフロー（完全版）

### **段階0: フォーマッター前処理**
```
【実際のユーザー入力】
生のリサーチ結果・統計データ・専門家見解・成功事例・実践的手法
↓
【ResearchFormatter.tsx】
┣━ 📁 /app/research-formatter/page.tsx (エントリーポイント)
┣━ 📁 /app/components/ResearchFormatter.tsx (メイン機能)
┣━ 🤖 AI呼び出し1: Gemini API
┃   ┣━ プロンプト: ジャンル別最適化フォーマット変換
┃   ┗━ 出力: 【ジャンル】: xxx 形式の構造化テキスト
┣━ URLパラメータ生成: /?input=encodeURIComponent(formatted)
┗━ LocalStorage保存: formatted-result
```

### **段階1: メインシステム受け取り**
```
【ContentInput.tsx】
┣━ URLパラメータ検出: new URLSearchParams(search).get('input')
┣━ LocalStorage検出: localStorage.getItem('formatted-result')
┣━ デコード処理: decodeURIComponent()
┗━ 【ジャンル】: xxx 付きテキスト確定
↓
【NewFlowPostGenerator.tsx】
┣━ ContentGeneratorService.generateHighQualityContent() 呼び出し
┗━ メインフロー開始
```

### **段階2: ジャンル判定・ページ構造決定**
```
【PageStructureAnalyzer.ts】
┣━ extractGenreFromInput(): 【ジャンル】: xxx パターンマッチング
┣━ GenreDetector.detectGenre(): 自動判定またはユーザー指定優先
┣━ getGenreConfig(): ジャンル別設定取得 (最適項目数・キーワード等)
┣━ 🤖 AI呼び出し2: Gemini API
┃   ┣━ プロンプト: ジャンル特化ページ構造分析
┃   ┣━ テンプレート選択指針埋め込み
┃   ┗━ 出力: PageStructure[] (各ページのtemplate, title, theme)
┗━ JSON解析: cleanText.replace(/```json\n?|```\n?/g, '').trim()
```

### **段階3: 構造制約コンテンツ生成**
```
【StructureConstrainedGenerator.ts】
┣━ generateAllPagesWithConstraints()
┣━ TemplateStructureDefinitions.generateStructurePrompt()
┃   ┗━ 16テンプレート分の詳細構造要件取得
┣━ 🤖 AI呼び出し3: Gemini API (一括生成)
┃   ┣━ プロンプト: 決定済み構造 + テンプレート構造要件
┃   ┗━ 出力: 全ページの具体的コンテンツ (JSON)
┣━ parseGeneratedJSON(): 堅牢なJSON解析
┃   ┣━ 複数パターンでの修復試行
┃   ┗━ フォールバック: 個別生成
┗━ GeneratedPage[] 確定
```

### **段階4: テンプレートデータ変換**
```
【ContentGeneratorService.ts】
┣━ convertToTemplateData(): AI動的フィールド → テンプレート固定フィールド
┃   ┣━ switch (templateType) による16パターン分岐
┃   ┣━ オブジェクト分解対策: Object.assign()
┃   ┗━ TemplateData形式統一
┣━ checkTemplateDataQuality(): 品質検証
┗━ splitLongTables(): 表分割処理
```

### **段階5: 補助コンテンツ生成**
```
【ContentGeneratorService.ts 続き】
┣━ 🤖 AI呼び出し4: キャプション生成
┃   ┣━ プロンプト: ページ内容からInstagram用キャプション
┃   ┗━ 出力: ✅形式のプロフェッショナルキャプション
┣━ 🤖 AI呼び出し5: ハッシュタグ生成
┃   ┣━ プロンプト: コンテンツ最適化ハッシュタグ
┃   ┗━ 出力: 大・中・小カテゴリハッシュタグセット
┗━ GeneratedContent 最終完成
```

### **段階6: テンプレート表示**
```
【EditablePostGenerator.tsx】
┣━ TemplateRegistry.getComponent(templateType)
┣━ templateComponents[templateType] 取得
┣━ React.createElement(SelectedTemplate, { templateData })
┗━ 16種テンプレートコンポーネントのいずれかでレンダリング

【各*Template.tsx】
┣━ TemplateData受け取り
┣━ 固有フィールド展開 (title, items, sections, steps, etc.)
┣━ InstagramPostTemplate.tsx でラップ
┗━ 最終UI表示
```

---

## 🔄 完全データフロー詳細

### **AI呼び出し完全マップ**
```
AI呼び出し1 (ResearchFormatter)
├─ 入力: 生リサーチデータ + ジャンル選択
├─ 処理: ジャンル特化フォーマット変換
└─ 出力: 【ジャンル】: xxx 形式構造化テキスト

AI呼び出し2 (PageStructureAnalyzer) 
├─ 入力: フォーマット済みテキスト + ジャンル設定
├─ 処理: ページ構造・テンプレート選択
└─ 出力: PageStructure[] (4-8ページ)

AI呼び出し3 (StructureConstrainedGenerator)
├─ 入力: PageStructure[] + 元入力 + テンプレート構造制約
├─ 処理: 構造要件100%適合コンテンツ生成
└─ 出力: GeneratedPage[] (完全なコンテンツ)

AI呼び出し4 (キャプション生成)
├─ 入力: GeneratedPage[] 
├─ 処理: Instagram最適化キャプション生成
└─ 出力: プロフェッショナルキャプション

AI呼び出し5 (ハッシュタグ生成)
├─ 入力: コンテンツ内容
├─ 処理: カテゴリ別ハッシュタグ最適化
└─ 出力: 階層化ハッシュタグセット
```

### **データ型変換フロー**
```
string (生データ)
    ↓ ResearchFormatter
string (【ジャンル】付き)
    ↓ URLパラメータ/LocalStorage
string (受信済み)
    ↓ PageStructureAnalyzer
PageStructure[] (構造決定)
    ↓ StructureConstrainedGenerator  
GeneratedPage[] (AI生成コンテンツ)
    ↓ convertToTemplateData()
TemplateData[] (テンプレート形式)
    ↓ React Component
JSX.Element[] (UI表示)
```

---

## 🎯 修正対象ファイル - 完全影響範囲

### **🔴 Critical Level: 一行の修正で全体崩壊リスク**

#### **型定義 (システム基盤)**
- `/app/components/templates/TemplateTypes.ts`
  - `TemplateType`: 16テンプレート定義の基盤
  - `TemplateData`: 全データ構造の基盤
  - 修正影響: **58ファイル + 200+関数**

- `/app/types/genre.ts`
  - `Genre`: ジャンル分岐の基盤
  - `GenreConfig`: ジャンル設定の基盤
  - 修正影響: **フォーマッター～最終表示まで全段階**

- `/app/types/pageStructure.ts`
  - `PageStructure`: ページ構造の基盤
  - 修正影響: **段階2～6まで全て**

#### **AI呼び出し中核 (5箇所の呼び出し全て)**
- `/app/services/geminiClientSingleton.ts`
  - Gemini APIクライアント管理
  - 修正影響: **全AI生成機能停止リスク**

#### **データ変換中核**
- `/app/services/contentGeneratorService.ts` → `convertToTemplateData()`
  - AI動的 → テンプレート固定フィールド変換
  - 修正影響: **全テンプレート表示破綻リスク**

### **🟡 High Level: 複数段階に波及**

#### **フォーマッター関連**
- `/app/components/ResearchFormatter.tsx`
  - 7ジャンル別フォーマット処理
  - 修正影響: **メインシステム全体の入力品質**

- `/app/research-formatter/page.tsx`  
  - フォーマッターエントリーポイント
  - 修正影響: **フォーマッター機能全体**

#### **メインフロー制御**
- `/app/components/NewFlowPostGenerator.tsx`
  - メインフロー統合制御
  - 修正影響: **段階1～6の連携**

- `/app/components/ContentInput.tsx`
  - URLパラメータ・LocalStorage処理
  - 修正影響: **フォーマッター連携・入力受け取り**

#### **AI生成サービス**
- `/app/services/pageStructureAnalyzer.ts`
  - ページ構造・テンプレート選択
  - 修正影響: **段階3～6の全て**

- `/app/services/structureConstrainedGenerator.ts`
  - 構造制約コンテンツ生成
  - 修正影響: **段階4～6の全て**

- `/app/services/templateStructureDefinitions.ts`
  - 16テンプレート構造制約定義
  - 修正影響: **AI生成品質・テンプレート整合性**

#### **ジャンル・項目管理**
- `/app/services/genreDetector.ts`
  - ジャンル判定ロジック
  - 修正影響: **ページ構成・テンプレート選択**

- `/app/services/itemCountOptimizer.ts`
  - ジャンル別項目数最適化
  - 修正影響: **コンテンツ分量・表示品質**

### **🟠 Medium Level: 特定領域に集中影響**

#### **テンプレート選択（競合システム）**
- `/app/services/templateMatchingService.ts`
  - 現在実質未使用だが潜在競合リスク
  - 修正影響: **テンプレート選択の混乱**

- `/app/services/structureBasedTemplateSelector.ts`
- `/app/services/pureStructureMatchingService.ts`  
- `/app/services/templateRecommendationService.ts`
  - 選択ロジック（現在バイパス状態）
  - 修正影響: **選択精度・パフォーマンス**

#### **テンプレート・エディター (32ファイル)**
- `/app/components/templates/*.tsx` (16ファイル)
  - 各テンプレートの表示ロジック
  - 修正影響: **特定テンプレートの表示**

- `/app/components/editors/*.tsx` (16ファイル)
  - 各テンプレートの編集機能
  - 修正影響: **特定テンプレートの編集**

- `/app/components/templates/TemplateRegistry.ts`
  - テンプレート管理・マッピング
  - 修正影響: **テンプレート取得・表示制御**

#### **表示統合**
- `/app/components/EditablePostGenerator.tsx`
  - テンプレート表示・編集統合
  - 修正影響: **UI全体の表示制御**

- `/app/components/InstagramPostTemplate.tsx`
  - テンプレート表示基盤
  - 修正影響: **全テンプレートの基本レイアウト**

### **🟢 Low Level: 局所的影響**

#### **データ処理・ユーティリティ**
- `/app/services/contentExtractor.ts`
- `/app/services/contentLayoutService.ts`
- `/app/services/dynamicFieldDetector.ts`
- `/app/utils/markdownUtils.ts`

#### **設定・補助**
- `/app/config/hashtags.ts`
- `/app/config/captionFormat.ts`
- `/app/services/intelligentContentProcessor.ts`
- `/app/services/indexGeneratorService.ts`

---

## ⚠️ システム脆弱性の発見

### **1. 直列化によるボトルネック**
```typescript
// contentGeneratorService.ts
if (this.isGenerating) {
  throw new Error('AI生成が進行中です')
}
```
- **影響**: 同時アクセス時の503エラー
- **波及**: フォーマッター→メインシステム連携中断

### **2. URLパラメータ長制限**
```typescript
// ResearchFormatter.tsx  
const targetUrl = '/?input=' + encodeURIComponent(formattedResult.formatted)
```
- **影響**: 長いフォーマット結果でURL制限超過
- **波及**: フォーマッター→メインシステム連携失敗

### **3. JSON解析脆弱性**
```typescript
// structureConstrainedGenerator.ts
const cleanText = text.replace(/```json\n?|```\n?/g, '').trim()
const parsed = JSON.parse(cleanText)
```
- **影響**: AI出力の不正JSON形式
- **波及**: コンテンツ生成完全停止

### **4. テンプレート選択競合**
```
PageStructureAnalyzer (段階2) → テンプレート選択
TemplateMatchingService (現在未使用) → 潜在的競合
```
- **影響**: 二重選択による不整合
- **波及**: 表示テンプレートと生成コンテンツの乖離

---

## 🎯 蝶の羽ばたき事例

### **例1: TemplateType一文字修正の波及**
```typescript
// TemplateTypes.ts
export type TemplateType = 'enumeration' | 'enumeraton' // ← タイポ修正
```
**波及範囲**: 
- 16テンプレートファイル
- 16エディターファイル  
- 12サービスファイル
- AI生成プロンプト
- 表示・編集全機能

### **例2: ジャンル設定一項目変更の波及**
```typescript
// genre.ts
'knowhow': { optimalItemRange: { min: 3, max: 6 } } // ← 5→6に変更
```
**波及範囲**:
- フォーマッタープロンプト
- ページ構造分析
- コンテンツ生成制約
- テンプレート選択
- 最終表示品質

### **例3: convertToTemplateData一行修正の波及**
```typescript
// contentGeneratorService.ts
case 'simple5':
  return { steps: content.step || [] } // ← steps → step に修正
```
**波及範囲**:
- AI生成データの受け渡し失敗
- Simple5Template表示破綻
- Simple5Editor編集不可
- 全simple5テンプレート使用不可

---

## 📋 修正作業時の必須確認事項

### **修正前チェックリスト**
1. **型定義への影響** - TemplateType, Genre, PageStructure
2. **AI呼び出しへの影響** - プロンプト、期待出力
3. **データフローへの影響** - 5段階の変換処理
4. **フォーマッター連携への影響** - URLパラメータ、LocalStorage
5. **テンプレート整合性への影響** - 16テンプレート × 構造制約

### **修正後検証事項**
1. **エンドツーエンドテスト** - フォーマッター→最終表示
2. **全ジャンルテスト** - 7ジャンル × 各段階
3. **全テンプレートテスト** - 16テンプレート × 表示・編集
4. **エラーハンドリング** - AI制限、JSON解析、URL制限
5. **同時アクセステスト** - 直列化制約の確認

---

## 📚 結論

このシステムは5回のAI呼び出し、6段階のデータ変換、58ファイルの連携による高度に統合されたシステムです。**一行の修正が蝶の羽ばたきとなり、システム全体に予想外の影響を与える可能性が極めて高い**ことを常に念頭に置いて作業する必要があります。

特に、型定義・AI呼び出し・データ変換の中核部分への修正は、必ず完全なシステムテストを実施してから適用してください。