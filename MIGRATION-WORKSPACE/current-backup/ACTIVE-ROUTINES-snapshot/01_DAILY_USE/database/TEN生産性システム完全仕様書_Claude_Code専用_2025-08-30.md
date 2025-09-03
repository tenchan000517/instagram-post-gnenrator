# 🔟 TEN生産性ツールランキングシステム完全仕様書

**作成日**: 2025年8月30日  
**対象**: 次世代Claude Code開発者  
**目的**: TENシステムの完全理解・確実な保守・拡張作業支援  
**緊急度**: 最高（システム保守・拡張の必須資料）

---

## 📋 目次

1. [システム概要](#システム概要)
2. [全体アーキテクチャ](#全体アーキテクチャ)  
3. [データベース作成フロー](#データベース作成フロー)
4. [ランキング生成システム](#ランキング生成システム)
5. [Type003投稿生成システム](#type003投稿生成システム)
6. [TEN専用テンプレートシステム](#ten専用テンプレートシステム)
7. [Webアプリ表示システム](#webアプリ表示システム)
8. [設定・連携ファイル](#設定連携ファイル)
9. [完全ファイルマップ](#完全ファイルマップ)
10. [データフロー詳細](#データフロー詳細)
11. [重要制約・ルール](#重要制約ルール)
12. [修正時影響範囲](#修正時影響範囲)
13. [トラブルシューティング](#トラブルシューティング)
14. [今後の拡張方針](#今後の拡張方針)

---

## システム概要

### 🎯 システムの目的
Instagram投稿用の生産性ツールランキングコンテンツを**完全自動化**で生成するシステム。TEN（めんどくさがり向け効率化）キャラクター特化。

### 🏗️ システムの特徴
- **データ駆動**: 構造化されたツールデータベース
- **独自評価軸**: TENスコア（5項目重み付け）
- **完全自動化**: リサーチ→ランキング→投稿生成→Web表示
- **拡張性**: 99パターンの生産性ランキング作成基盤

---

## 全体アーキテクチャ

### 📊 システム全体図
```
【データ層】
├─ toolDataStructure.js ─────── データ構造定義
├─ productivity_tools.json ──── 生データ（10ツール）
└─ productivityMasterData.json ─ 統合データベース

【処理層】  
├─ createProductivityDatabase.js ─── データベース統合処理
├─ productivityRankingGenerator.js ── ランキング生成処理
└─ generateType003FeedV2.js ───── Type003投稿生成

【定義層】
├─ unified-template-12-productivity-tool.json ─ ページ構造定義  
└─ type-target-persona-relations.json ────── ターゲット関係定義

【表示層】
├─ contentGeneratorService.ts ──── コンテンツ生成制御
├─ PageStructureMatcher.ts ─────── テンプレートマッピング
├─ TenIntroTemplate.tsx ───────── TEN専用テンプレート4種
└─ ui-names.json ─────────────── UI表示名定義

【出力層】
├─ K901.json ────────────────── 構造化投稿データ（8ページ）
└─ K901_caption.txt ─────────── Instagram キャプション
```

### 🔄 基本データフロー
```
生データ → 統合DB → ランキング生成 → Type003投稿 → Web表示
  (10)      (10)       (TENスコア)    (8ページ)    (テンプレート)
```

---

## データベース作成フロー

### 📁 **ファイルパス**
```
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/database/
```

### 🛠️ **A. データ構造定義**

#### ファイル: `toolDataStructure.js`
**役割**: 全生産性ツールの標準データ構造を定義

**重要な構造**:
```javascript
// 基本情報
{
  id: "T001",
  toolName: "Google Drive", 
  category: "クラウドストレージ",
  
  // 従来メトリクス（10項目）
  metrics: {
    productivity_score: 80,    // 生産性スコア
    ease_of_use: 90,          // 使いやすさ
    setup_time: 2,            // セットアップ時間
    popularity: 100,          // 人気度
    price_score: 95           // 価格スコア
  },
  
  // TEN専用評価軸（5項目 - 最重要）
  ten_criteria: {
    immediate_effect: 95,     // 即効性 (25%)
    low_barrier: 100,         // 導入障壁の低さ (25%)  
    trend_factor: 85,         // トレンド・人気度 (20%)
    cost_effectiveness: 100,  // コストパフォーマンス (20%)
    lazy_friendly: 95         // めんどくさがり対応度 (10%)
  },
  
  // 価格情報
  pricing: {
    free: true,               // 無料版あり
    paid_plans: []           // 有料プラン
  },
  
  // 機能フラグ
  features: {
    ai_powered: true,         // AI搭載
    team_collaboration: true, // チーム協業
    mobile_app: true,        // スマホ対応
    offline_support: false   // オフライン対応
  }
}
```

#### **データ制約・ルール**:
- **必須項目**: `id`, `toolName`, `category`, `ten_criteria`
- **TEN評価軸**: 5項目固定（重み付け変更時は全体再計算必要）
- **スコア範囲**: 0-100点
- **無料版フラグ**: ランキング対象判定に使用

---

### 🏭 **B. データベース統合システム**

#### ファイル: `createProductivityDatabase.js`
**役割**: 17カテゴリのJSONファイルを単一データベースに統合

**処理フロー**:
```javascript
// 1. カテゴリ定義（17種類）
const CATEGORIES = {
  'tools': 'productivity_tools.json',        // ✅実装済み（10アイテム）
  'note_apps': 'note_apps.json',            // 🚧未実装
  'task_management': 'task_management.json', // 🚧未実装
  // ... 残り14カテゴリ
}

// 2. 統合処理
for (const [category, filename] of Object.entries(CATEGORIES)) {
  const data = loadCategoryData(filename)
  if (data) allItems.push(...data)
}

// 3. 統計計算
const stats = calculateStatistics(allItems)

// 4. 出力
writeToFile('productivityMasterData.json', {
  items: allItems,
  statistics: stats,
  metadata: { totalItems: allItems.length }
})
```

**実行コマンド**:
```bash
cd /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/database
node createProductivityDatabase.js
```

**現在の状況**:
- ✅ **完了**: `productivity_tools.json`（10ツール）
- ⚠️ **未実装**: 他16カテゴリ（後で作成予定）
- 📊 **統計**: 総カテゴリ17、総アイテム10、平均TENスコア85

---

### 📊 **C. 実データファイル**

#### メインファイル: `tools/productivity_tools.json`
**内容**: 10の厳選生産性ツール
```json
[
  {
    "id": "T001",
    "toolName": "Google Drive",
    "category": "クラウドストレージ", 
    "ten_criteria": {
      "immediate_effect": 95,
      "low_barrier": 100,
      "trend_factor": 85,
      "cost_effectiveness": 100,
      "lazy_friendly": 95
    },
    "pricing": { "free": true }
  }
  // ... 残り9ツール
]
```

#### 統合後ファイル: `productivityMasterData.json`
**役割**: 全カテゴリ統合後の最終データベース  
**現在**: 10アイテム（1カテゴリのみ）  
**将来**: 最大数百アイテム（17カテゴリ対応）

---

## ランキング生成システム

### 📁 **ファイルパス**
```
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/database/productivityRankingGenerator.js
```

### 🏆 **A. ランキングエンジン**

#### メインクラス: `ProductivityRankingGenerator`
```javascript
class ProductivityRankingGenerator {
  constructor() {
    this.data = require('./productivityMasterData.json')
  }
  
  // メイン関数
  generateAdvancedRanking(criteria, limit = 10, filters = {}) {
    // 1. データフィルタリング  
    // 2. スコア計算
    // 3. ソート・ランキング
    // 4. 結果フォーマット
  }
}
```

### 🧮 **B. TENスコア計算式（最重要）**

```javascript
// 重み付け設定（変更時は全体に影響）
const TEN_WEIGHTS = {
  immediate_effect: 0.25,      // 即効性 25%
  low_barrier: 0.25,          // 導入簡単さ 25% 
  trend_factor: 0.20,         // トレンド・人気度 20%
  cost_effectiveness: 0.20,   // コストパフォーマンス 20%
  lazy_friendly: 0.10         // めんどくさがり対応度 10%
}

// 計算式
function calculateTENScore(tool) {
  const criteria = tool.ten_criteria
  return (
    criteria.immediate_effect * TEN_WEIGHTS.immediate_effect +
    criteria.low_barrier * TEN_WEIGHTS.low_barrier +
    criteria.trend_factor * TEN_WEIGHTS.trend_factor +
    criteria.cost_effectiveness * TEN_WEIGHTS.cost_effectiveness +
    criteria.lazy_friendly * TEN_WEIGHTS.lazy_friendly
  )
}
```

### 🔍 **C. 高度フィルター機能**

#### 価格フィルター
```javascript
const PRICE_FILTERS = {
  free: tool => tool.pricing?.free === true,
  paid: tool => tool.pricing?.paid_plans?.length > 0,
  freemium: tool => tool.pricing?.free && tool.pricing?.paid_plans?.length > 0
}
```

#### 機能フィルター  
```javascript
const FEATURE_FILTERS = {
  ai_powered: tool => tool.features?.ai_powered === true,
  team_collaboration: tool => tool.features?.team_collaboration === true,
  mobile_app: tool => tool.features?.mobile_app === true
}
```

### 📋 **D. ランキング実行例**

**無料ツール限定ランキング**:
```javascript
const freeToolsRanking = generator.generateAdvancedRanking(
  'ten_score',           // TENスコアでランキング
  10,                    // TOP10
  { price: 'free' }      // 無料ツール限定
)
```

**実行コマンド**:
```bash
node testRankingGeneration.js
```

**現在の結果**:
1. Google Drive (95点)
2. Todoist (90点) 
3. Loom (89点)
4. Trello (88点)
5. Zoom (86点)
6. Grammarly (85点)
7. Notion (80点)
8. Slack (78点)
9. Bitwarden (78点)  
10. IFTTT (78点)

---

## Type003投稿生成システム

### 📁 **ファイルパス**
```
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/database/generateType003FeedV2.js
```

### 📝 **A. 投稿生成エンジン**

#### 基本設定
```javascript
const CONFIG = {
  knowledgeId: 'K901',
  postType: '003',                    // 業界・企業情報まとめ
  targetIds: ['T004'],               // 就活準備支援
  pageCount: 8,                      // 8ページ固定
  pageStructurePattern: 'unified-template-12-productivity-tool'
}
```

#### 生成プロセス
```javascript
// 1. ランキングデータ取得
const rankingData = generator.generateAdvancedRanking('ten_score', 10, {
  price: 'free',           // 無料ツール限定
  ten_score_min: 70       // TENスコア70点以上
})

// 2. TENキャラクター設定
const TEN_CHARACTER = {
  tone: '古風な武士口調',
  catchphrases: ['〜なり', '〜であるぞ', '拙者'],
  personality: 'めんどくさがりだが効率化マニア'
}

// 3. 8ページ構成生成
const pages = {
  page1: generateTenIntroPage(rankingData),
  page2: generateToolShowcasePage(rankingData), 
  page3: generateDetailPage(rankingData, [1, 2]), // 1-2位
  page4: generateDetailPage(rankingData, [3, 4]), // 3-4位
  page5: generateDetailPage(rankingData, [5, 6]), // 5-6位  
  page6: generateDetailPage(rankingData, [7, 8]), // 7-8位
  page7: generateDetailPage(rankingData, [9, 10]), // 9-10位
  page8: generateTenSummaryPage(rankingData)
}
```

### 📄 **B. ページ構成詳細（8ページ）**

#### Page1: TEN専用導入（`ten_intro`）
```javascript
{
  section: "introduction",
  template: "ten_intro", 
  content: {
    title: "無料で使える生産性向上ツールTOP10",
    catchphrase: "効率化への道は、無料ツールから始まるなり！",
    problems: [
      "仕事が終わらない...でも残業はしたくないであるぞ",
      "効率化ツール多すぎて、どれを使えばいいか分からぬなり"
    ],
    solution: "心配無用！拙者が厳選した無料ツール10選で、今日から生産性爆上げなり",
    tenCharacter: {
      message: "全て無料で始められて、5分で導入できるものばかりであるぞ",
      tone: "古風な武士口調"
    }
  }
}
```

#### Page2: ツール一覧（`tool_showcase`）
```javascript
{
  section: "showcase",
  template: "tool_showcase",
  content: {
    title: "TEN厳選ツールコレクション", 
    displayType: "showcase",  // ランキング表示なし
    tools: [
      {
        position: 1,
        name: "Google Drive",
        category: "クラウドストレージ", 
        primaryScore: "TENスコア: 95点",
        highlight: "完全無料！",
        icon: "☁️"
      }
      // ... 残り9ツール
    ],
    evaluationNote: "TENスコア = 即効性25% + 導入簡単25% + 人気度20% + コスパ20% + めんどくさがり対応10%"
  }
}
```

#### Page3-7: 詳細ページ（`enhanced_tool_detail`）
```javascript
{
  section: "detail_1",  // detail_1, detail_3, detail_5, detail_7, detail_9
  template: "enhanced_tool_detail",
  content: {
    displayMode: "grid",
    tools: [
      {
        toolName: "Google Drive",
        category: "クラウドストレージ",
        position: 1,
        tenScores: {
          immediateEffect: 95,
          easeOfUse: 100,
          popularity: 85,
          costEffectiveness: 100,
          lazyFriendly: 95
        },
        keyMetrics: {
          price: "無料版あり",
          setupTime: "2分",
          userBase: "数億ユーザー"
        },
        parameterGraph: {
          timeReduction: 90,
          simplicity: 95,
          versatility: 85,
          reliability: 95
        },
        tenRecommendation: "無料版でも十分すぎる機能！コスパ最強の一品であるぞ"
      }
      // 2ツール目
    ]
  }
}
```

#### Page8: まとめ（`ten_summary`）
```javascript
{
  section: "summary",
  template: "ten_summary",
  content: {
    title: "TEN DATABASE",
    subtitle: "生産性向上ツール完全ガイド",
    summaryPoints: [
      "全ツール無料版あり・5分で導入可能なり",
      "TENスコアは即効性・簡単さ・人気度で算出",
      "めんどくさがりでも続けられる設計"
    ],
    actionSteps: [
      {
        step: "1つ選ぶ",
        description: "まずは気になるツール1つから始めるなり"
      }
    ],
    finalMessage: "今日から1つでも導入して、生産性を爆上げするなり！",
    databaseImage: "/images/ten_point.png"
  }
}
```

### 📝 **C. キャプション生成**

#### 出力ファイル: `K901_caption.txt`
```
【無料で使える生産性向上ツールTOP10】

効率化したいけど、何から始めればいいかわからぬ...
そんな拙者と同じ悩みを持つ者へ！

🥇 Google Drive → 完全無料！TENスコア95点
🥈 Todoist → 完全無料！TENスコア90点  
🥉 Loom → 完全無料！TENスコア89点

全て無料で始められて、導入も5分以内なり！
保存して、今日から1つでも試してみるなり！

#生産性向上 #効率化 #無料ツール #TEN
```

**実行コマンド**:
```bash
node generateType003FeedV2.js
```

**生成ファイル**:
- ✅ `K901.json` (8ページ構造化データ)
- ✅ `K901_caption.txt` (Instagram キャプション)

---

## TEN専用テンプレートシステム

### 📁 **ファイルパス**
```
/mnt/c/instagram-course/instagram-post-generator/app/services/knowledgeBase/data/pageStructures/unified/unified-template-12-productivity-tool.json
```

### 🎨 **A. ページ構造定義**

#### テンプレート名: `unified-template-12-productivity-tool`
```json
{
  "pageStructureId": "unified-template-12-productivity-tool",
  "name": "Unified Template 12 - Productivity Tool Pattern",
  "description": "TEN専用：導入・ツール一覧・詳細説明・まとめ構成（ランキング表示なし）",
  
  "colorScheme": {
    "primary": "#2D5016",     // メイン緑
    "secondary": "#4A7C2A",   // セカンダリ緑  
    "accent": "#6B9F3E",      // アクセント緑
    "background": "#F8FBF4",  // 背景色
    "text": "#1A1A1A"         // テキスト色
  },
  
  "pages": [
    {
      "pageNumber": 1,
      "templateId": "ten_intro"
    },
    {
      "pageNumber": 2, 
      "templateId": "tool_showcase"
    },
    {
      "pageNumber": "dynamic",
      "templateId": "enhanced_tool_detail"
    },
    {
      "pageNumber": "last",
      "templateId": "ten_summary"
    }
  ]
}
```

### 🧩 **B. TEN専用テンプレート4種類**

#### **📂 テンプレートコンポーネント場所**
```
/mnt/c/instagram-course/instagram-post-generator/app/components/templates/unified/
├─ TenIntroTemplate.tsx
├─ ToolShowcaseTemplate.tsx  
├─ EnhancedToolDetailTemplate.tsx
└─ TenSummaryTemplate.tsx
```

#### **1. TenIntroTemplate.tsx** (`ten_intro`)
**役割**: TEN専用導入ページ
**特徴**:
- 武士口調のTENキャラクター
- 問題提起→解決策→行動促進の構成
- TENカラースキーム適用

#### **2. ToolShowcaseTemplate.tsx** (`tool_showcase`)  
**役割**: ツール一覧表示（ランキングなし）
**特徴**:
- 10ツールを2列5行で表示
- TENスコア表示
- カテゴリアイコン付き
- 評価ロジック説明

#### **3. EnhancedToolDetailTemplate.tsx** (`enhanced_tool_detail`)
**役割**: ツール詳細情報（2ツールずつ）
**特徴**:
- パラメータグラフ表示
- TENスコア5項目詳細
- 使用方法・Tips
- TEN推奨コメント

#### **4. TenSummaryTemplate.tsx** (`ten_summary`)
**役割**: まとめ・行動促進
**特徴**:
- TEN DATABASE ロゴ
- アクションステップ3段階
- 最終メッセージ（武士口調）

### 🔗 **C. テンプレート登録システム**

#### **templates/index.ts** での登録
```typescript
// インポート
import TenIntroTemplate from './unified/TenIntroTemplate'
import ToolShowcaseTemplate from './unified/ToolShowcaseTemplate'  
import EnhancedToolDetailTemplate from './unified/EnhancedToolDetailTemplate'
import TenSummaryTemplate from './unified/TenSummaryTemplate'

// templateComponents マップ
export const templateComponents = {
  // ... 既存テンプレート
  
  // TEN専用テンプレート
  'ten_intro': TenIntroTemplate,
  'tool_showcase': ToolShowcaseTemplate,
  'enhanced_tool_detail': EnhancedToolDetailTemplate, 
  'ten_summary': TenSummaryTemplate
} as const
```

#### **TemplateTypes.ts** での型定義
```typescript
export type TemplateType = 
  // ... 既存タイプ
  
  // TEN専用テンプレート
  | 'ten_intro'                    // 🔟TEN導入型
  | 'tool_showcase'                // 🔟ツール一覧型
  | 'enhanced_tool_detail'         // 🔟強化ツール詳細型
  | 'ten_summary'                  // 🔟TENまとめ型
```

---

## Webアプリ表示システム

### 📁 **ファイルパス**
```
/mnt/c/instagram-course/instagram-post-generator/app/services/
```

### 🎮 **A. コンテンツ生成サービス**

#### メインファイル: `contentGeneratorService.ts`
**役割**: ナレッジベース起点のコンテンツ生成制御

#### 生成プロセス
```typescript
class ContentGeneratorService {
  // メイン生成関数
  async generateWithKnowledgeBase(
    userInput: string, 
    knowledgeBaseParams: KnowledgeBaseParams
  ): Promise<GeneratedContent> {
    
    // 1. ナレッジデータ取得
    const knowledgeData = knowledgeBaseParams.knowledgeContents?.[0]
    const pageStructureId = knowledgeData.pageStructurePattern
    
    // 2. ページ構造読み込み
    const pageStructure = PageStructureMatcher.loadPageStructure(pageStructureId)
    
    // 3. 各ページ生成
    const generator = new KnowledgeBasedContentGenerator()
    const pages: GeneratedPage[] = []
    
    for (const pageInfo of pageStructure.pages) {
      if (pageInfo.pageNumber === "dynamic") {
        // 🔥 dynamicページ展開処理（修正済み）
        const dynamicPages = Object.keys(knowledgeData.detailedContent || {})
          .filter(key => {
            const pageData = knowledgeData.detailedContent?.[key]
            return pageData?.section === "mainContent" || 
                   (pageData?.section && pageData.section.startsWith("detail_"))
          })
          .map(key => parseInt(key.replace('page', '')))
          .sort((a, b) => a - b)
          
        // 各dynamicページを生成
        for (const actualPageNumber of dynamicPages) {
          const result = await generator.generatePageContent({
            userInput,
            knowledgeData,
            pageStructure,
            templateStructure: pageInfo.templateStructure,
            pageNumber: actualPageNumber
          })
          
          if (result.success) {
            const generatedPage: GeneratedPage = {
              pageNumber: actualPageNumber,
              templateType: pageInfo.templateId,
              templateData: result.generatedContent,
              content: result.generatedContent
            }
            pages.push(generatedPage)
          }
        }
      } else {
        // 通常ページ生成
        // ... 処理
      }
    }
    
    return { pages, totalPages: pages.length }
  }
}
```

#### **重要な修正箇所**:
```typescript
// 修正前: mainContentセクションのみ
return pageData?.section === "mainContent"

// 修正後: detail_*セクションも対応
return pageData?.section === "mainContent" || 
       (pageData?.section && pageData.section.startsWith("detail_"))
```

### 🗺️ **B. ページ構造マッチャー**

#### ファイル: `PageStructureMatcher.ts`  
**役割**: テンプレートIDとページ構造定義の紐づけ

#### テンプレート読み込み
```typescript
// インポート追加（修正済み）
import unifiedTemplate12ProductivityTool from './data/pageStructures/unified/unified-template-12-productivity-tool.json'

// pageStructureMap への登録（修正済み）
private static readonly pageStructureMap = {
  // ... 既存テンプレート
  'unified-template-12-productivity-tool': unifiedTemplate12ProductivityTool,
}

// ページ構造読み込み
static loadPageStructure(pageStructureId: string): PageStructure | null {
  const structure = this.pageStructureMap[pageStructureId]
  if (!structure) {
    throw new Error(`Page structure '${pageStructureId}' not found`)
  }
  return structure
}
```

### 🎭 **C. ナレッジベースコンテンツ生成**

#### ファイル: `knowledgeBase/KnowledgeBasedContentGenerator.ts`
**役割**: 単一ページのコンテンツ生成

#### 生成ロジック（一時的にAI生成をバイパス）
```typescript
async generatePageContent(request: KnowledgeBasedGenerationRequest): Promise<KnowledgeBasedGenerationResult> {
  // 🚀 現在は一時的にAI生成をバイパス
  // ナレッジデータをそのまま使用
  const pageKey = `page${request.pageNumber}`
  const currentPageData = request.knowledgeData.detailedContent[pageKey]
  
  if (!currentPageData) {
    throw new Error(`ページ${request.pageNumber}のナレッジデータが見つかりません`)
  }
  
  // ナレッジデータの content 部分をそのまま使用
  const parsedContent = currentPageData.content
  
  return {
    success: true,
    generatedContent: parsedContent
  }
}
```

---

## 設定・連携ファイル

### 📁 **ファイルパス**
```
/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/
```

### 🔗 **A. ターゲット関係定義**

#### ファイル: `type-target-persona-relations.json`
**役割**: 投稿タイプ・ターゲット・ペルソナ・ナレッジの関係定義

#### 重要な紐づけ
```json
{
  "typeToTargets": {
    "003": ["T013", "T014", "T015", "T016", "T017", "T018"]
  },
  "targetToPersonas": {
    "T004": ["P901"],  // ← TEN生産性ツール専用（修正済み）
    "T018": ["P901"]   // ← 既存のマッピング
  },
  "personaToKnowledge": {
    "P901": ["K901"]   // ← TEN生産性→K901
  }
}
```

#### **重要な修正箇所**:
```json
// 修正前
"T004": [],

// 修正後  
"T004": ["P901"],
```

### 🏷️ **B. UI表示名定義**

#### ファイル: `ui-names.json`
**役割**: UIに表示する名称の定義

#### 重要な定義
```json
{
  "types": {
    "003": "業界・企業情報まとめ"
  },
  "targets": {
    "T004": "就活をいつ始めたらいいかわからない・何から始めたらいいかわからない学生"
  },
  "personas": {
    "P901": "TEN（生産性向上ツール愛好家）"
  },
  "knowledge": {
    "K901": "無料で使える生産性向上ツールTOP10"
  }
}
```

---

## 完全ファイルマップ

### 🗂️ **データ層**
```
📁 /ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/
├── 📄 database/
│   ├── toolDataStructure.js          ★ データ構造定義
│   ├── createProductivityDatabase.js ★ DB統合処理
│   ├── productivityRankingGenerator.js ★ ランキング生成
│   ├── testRankingGeneration.js      ★ ランキングテスト
│   ├── generateType003FeedV2.js      ★ Type003投稿生成
│   └── productivityMasterData.json   ★ 統合DB（出力）
├── 📄 tools/
│   └── productivity_tools.json       ★ 生データ（10ツール）
└── 📄 rankings/
    └── TEN_無料生産性ツールTOP10.json ★ ランキング結果
```

### 🎨 **テンプレート層**
```
📁 /app/components/templates/unified/
├── TenIntroTemplate.tsx              ★ TEN導入テンプレート
├── ToolShowcaseTemplate.tsx          ★ ツール一覧テンプレート
├── EnhancedToolDetailTemplate.tsx    ★ ツール詳細テンプレート
├── TenSummaryTemplate.tsx            ★ TENまとめテンプレート
└── index.ts                          ★ テンプレート登録

📁 /app/components/templates/
├── TemplateTypes.ts                  ★ 型定義
└── TemplateRegistry.ts               ★ メタデータ登録
```

### ⚙️ **サービス層**
```
📁 /app/services/
├── contentGeneratorService.ts        ★ メインコンテンツ生成
├── 📄 knowledgeBase/
│   ├── PageStructureMatcher.ts       ★ テンプレートマッピング  
│   ├── KnowledgeBasedContentGenerator.ts ★ ページ生成
│   └── 📄 data/pageStructures/unified/
│       └── unified-template-12-productivity-tool.json ★ ページ構造定義
```

### 📊 **データ連携層**
```
📁 /app/data/knowledgeBase/
├── type-target-persona-relations.json ★ 関係定義（修正済み）
├── ui-names.json                      ★ UI名称定義
└── 📄 knowledge/type003/
    ├── K901.json                      ★ 構造化投稿データ（出力）
    └── K901_caption.txt               ★ キャプション（出力）
```

### 🔧 **設定ファイル**
```
📁 プロジェクトルート/
├── TEN生産性システム完全仕様書_Claude_Code専用_2025-08-30.md ★ 本仕様書
└── 次世代Claude_Code完全引き継ぎ書_TEN生産性システム完全実装プロジェクト_2025-08-30.md ★ 引き継ぎ書
```

---

## データフロー詳細

### 🔄 **完全データフロー**

```
【ステップ1: データ準備】
productivity_tools.json (10ツール)
    ↓ createProductivityDatabase.js
productivityMasterData.json (統合DB)

【ステップ2: ランキング生成】  
productivityMasterData.json
    ↓ productivityRankingGenerator.js
    ↓ (TENスコア計算 + 無料フィルター)
ランキング結果 (TOP10)

【ステップ3: 投稿生成】
ランキング結果
    ↓ generateType003FeedV2.js  
    ↓ (8ページ構成 + TENキャラクター)
K901.json + K901_caption.txt

【ステップ4: Web表示準備】
K901.json
    ↓ type-target-persona-relations.json (T004→P901→K901)
    ↓ unified-template-12-productivity-tool.json (ページ構造)
Web表示準備完了

【ステップ5: Web表示】  
ユーザー操作 (Type003選択→T004選択→P901選択)
    ↓ contentGeneratorService.ts
    ↓ PageStructureMatcher.loadPageStructure()
    ↓ KnowledgeBasedContentGenerator.generatePageContent()  
    ↓ (dynamicページ展開: page3-7生成)
    ↓ templateComponents['ten_intro'] etc.
8ページ Instagram投稿表示完了
```

### 📊 **数値フロー**
```
10ツール → TENスコア計算 → ランキング → 8ページ → Web表示
(生データ)   (95-78点)     (TOP10)   (構造化)   (テンプレート)
```

### ⚡ **実行フロー**
```bash
# 1. データベース生成
cd /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/database
node createProductivityDatabase.js

# 2. ランキング生成（テスト）
node testRankingGeneration.js  

# 3. Type003投稿生成
node generateType003FeedV2.js

# 4. Webアプリ起動
cd /mnt/c/instagram-course/instagram-post-generator
npm run dev

# 5. ブラウザでアクセス
# http://localhost:3000 → Type003選択 → T004選択 → K901生成・表示
```

---

## 重要制約・ルール

### ⚠️ **A. データ制約**

#### **TENスコア関連**
- **評価軸**: 5項目固定（immediate_effect, low_barrier, trend_factor, cost_effectiveness, lazy_friendly）
- **重み付け**: 25%, 25%, 20%, 20%, 10% （変更時は全体再計算必要）
- **スコア範囲**: 0-100点  
- **計算精度**: 小数点以下切り捨て

#### **ツールデータ関連**
- **必須項目**: id, toolName, category, ten_criteria, pricing.free
- **IDフォーマット**: T001形式（3桁数字）
- **カテゴリ**: 17種類定義済み（現在1種類のみ実装）
- **無料版フラグ**: ランキング対象判定に必須

#### **データベース制約**
- **最大アイテム数**: 理論上無制限（実用性を考慮して各カテゴリ50アイテム程度推奨）
- **ファイルサイズ**: productivityMasterData.json は10MB未満推奨
- **更新頻度**: データ変更時は全工程再実行必要

### 🎨 **B. テンプレート制約**

#### **ページ構成制約**
- **ページ数**: 8ページ固定（Page1, Page2, Page3-7動的, Page8）
- **テンプレートタイプ**: 4種類固定（ten_intro, tool_showcase, enhanced_tool_detail, ten_summary）
- **動的ページ**: Page3-7はdetail_*セクションで自動展開
- **ツール配置**: 詳細ページは2ツールずつ表示

#### **デザイン制約**
- **カラースキーム**: TEN専用5色固定
- **キャラクター**: TEN（古風な武士口調）必須
- **アイコン**: 各カテゴリ対応絵文字必須  
- **フォント**: システムフォント使用

#### **コンテンツ制約**
- **文字数制限**: 
  - タイトル: 50文字以内
  - キャッチフレーズ: 30文字以内
  - 推奨コメント: 100文字以内
- **TEN口調**: 「〜なり」「〜であるぞ」「拙者」必須
- **ランキング表示**: showcaseモード（順位番号なし）

### 🔗 **C. システム連携制約**

#### **ファイル依存関係**
- **K901.json**: unified-template-12-productivity-tool.json に完全依存
- **テンプレート**: PageStructureMatcher, templateComponents に登録必須
- **ターゲット関係**: T004→P901→K901の固定マッピング

#### **実行順序制約**
1. `createProductivityDatabase.js` (データベース統合)
2. `generateType003FeedV2.js` (投稿生成) 
3. Webアプリ起動 (表示)
※順序変更不可（データ依存関係のため）

---

## 修正時影響範囲

### 🛠️ **A. データ構造変更時の影響範囲**

#### **toolDataStructure.js 修正時**
```
📊 影響度: 最大 ★★★★★
🎯 影響ファイル:
├── createProductivityDatabase.js     (データ読み込みエラー)
├── productivityRankingGenerator.js   (計算エラー) 
├── generateType003FeedV2.js         (生成エラー)
├── productivityMasterData.json      (構造変更)
├── K901.json                        (データ変更)
└── 全TENテンプレート                 (表示エラー)

🔧 必要な対応:
1. 全データファイルの再生成
2. テンプレートのデータアクセス修正
3. 型定義の更新
4. バリデーション処理の調整
```

#### **TENスコア計算式変更時**
```
📊 影響度: 大 ★★★★☆
🎯 影響ファイル:
├── productivityRankingGenerator.js   (計算ロジック)
├── K901.json                        (ランキング順位変更)
├── K901_caption.txt                 (順位表示変更)
└── ToolShowcaseTemplate.tsx         (スコア表示変更)

🔧 必要な対応:
1. 重み付け設定の更新
2. 全ランキングの再計算・再生成  
3. テストケースの更新
4. ドキュメントの更新
```

### 🎨 **B. テンプレート変更時の影響範囲**

#### **unified-template-12-productivity-tool.json 修正時**
```
📊 影響度: 中 ★★★☆☆
🎯 影響ファイル:
├── generateType003FeedV2.js         (ページ構造変更)
├── K901.json                        (データ構造調整)
├── contentGeneratorService.ts       (生成ロジック調整)
└── 全TENテンプレート                 (レンダリング調整)

🔧 必要な対応:
1. ページ生成ロジックの調整
2. K901.jsonの再生成
3. テンプレートコンポーネントの修正
4. 動作テストの実行
```

#### **TENテンプレートコンポーネント修正時**
```
📊 影響度: 小 ★★☆☆☆
🎯 影響ファイル:
├── 該当テンプレートのみ             (表示変更)
└── templates/index.ts              (インポート調整)

🔧 必要な対応:
1. コンポーネントの修正
2. 表示テストの実行
3. デザイン確認
```

### ⚙️ **C. システム設定変更時の影響範囲**

#### **type-target-persona-relations.json 修正時**
```
📊 影響度: 中 ★★★☆☆
🎯 影響ファイル:
├── Webアプリの選択肢表示           (UI変更)
├── contentGeneratorService.ts      (マッピング変更)
└── ナレッジベース選択ロジック      (選択肢変更)

🔧 必要な対応:
1. 関係定義の整合性チェック
2. UI表示テスト
3. ナレッジ生成テスト
```

---

## トラブルシューティング

### 🚨 **A. よくある問題と解決策**

#### **問題1: Page structure not found エラー**
```
❌ エラー: Page structure 'unified-template-12-productivity-tool' not found
```
**原因**: PageStructureMatcher.ts にテンプレートが登録されていない

**解決策**:
```typescript
// 1. インポート追加
import unifiedTemplate12ProductivityTool from './data/pageStructures/unified/unified-template-12-productivity-tool.json'

// 2. pageStructureMap に追加
private static readonly pageStructureMap = {
  // ... 既存
  'unified-template-12-productivity-tool': unifiedTemplate12ProductivityTool,
}
```

#### **問題2: テンプレートが表示されない**
```
❌ エラー: Unknown template type: ten_intro
```
**原因**: templateComponents にTENテンプレートが登録されていない

**解決策**:
```typescript
// templates/index.ts
export const templateComponents = {
  // ... 既存
  'ten_intro': TenIntroTemplate,
  'tool_showcase': ToolShowcaseTemplate,
  'enhanced_tool_detail': EnhancedToolDetailTemplate,
  'ten_summary': TenSummaryTemplate
} as const
```

#### **問題3: Page3-7が生成されない**
```  
❌ 現象: Page1, Page2, Page8のみ生成される
```
**原因**: dynamicページのフィルタリング条件が不適切

**解決策**:
```typescript
// contentGeneratorService.ts
const dynamicPages = Object.keys(knowledgeData.detailedContent || {})
  .filter(key => {
    const pageData = knowledgeData.detailedContent?.[key]
    return pageData?.section === "mainContent" || 
           (pageData?.section && pageData.section.startsWith("detail_"))  // この行を追加
  })
```

#### **問題4: TENスコアが0点表示**
```
❌ 現象: 全ツールのTENスコアが0点
```
**原因**: ten_criteria データが不正または計算エラー

**解決策**:
```javascript
// 1. データ確認
console.log('Tool data:', tool.ten_criteria)

// 2. 計算ロジック確認  
function calculateTENScore(tool) {
  if (!tool.ten_criteria) return 0
  
  const criteria = tool.ten_criteria
  return Math.round(
    criteria.immediate_effect * 0.25 +
    criteria.low_barrier * 0.25 +
    criteria.trend_factor * 0.20 +
    criteria.cost_effectiveness * 0.20 +
    criteria.lazy_friendly * 0.10
  )
}

// 3. productivityMasterData.json 再生成
node createProductivityDatabase.js
```

#### **問題5: ターゲット選択でK901が表示されない**
```
❌ 現象: T004選択してもK901が選択肢に出ない
```
**原因**: type-target-persona-relations.json の設定不備

**解決策**:
```json
// type-target-persona-relations.json
{
  "targetToPersonas": {
    "T004": ["P901"]  // これを追加・修正
  },
  "personaToKnowledge": {
    "P901": ["K901"]  // これを確認
  }
}
```

### 📋 **B. デバッグ手順**

#### **データフロー確認**
```bash
# 1. データベース状態確認
node -e "console.log(JSON.stringify(require('./productivityMasterData.json'), null, 2))"

# 2. ランキング結果確認
node testRankingGeneration.js

# 3. Type003投稿確認
node generateType003FeedV2.js
cat K901.json | jq '.detailedContent | keys'

# 4. Web表示確認
npm run dev
# ブラウザでType003→T004→K901を選択
```

#### **テンプレート状態確認**
```typescript
// ブラウザ開発者ツールで実行
console.log('Available templates:', Object.keys(templateComponents))
console.log('Page structure:', PageStructureMatcher.loadPageStructure('unified-template-12-productivity-tool'))
```

---

## 今後の拡張方針

### 🚀 **A. 短期拡張計画（次の4週間）**

#### **1. データ拡張**
```
✅ 完了: productivity_tools.json (10ツール)
🚧 進行中: 他16カテゴリのデータ整備
  ├── note_apps.json (ノートアプリ 20ツール)
  ├── task_management.json (タスク管理 15ツール) 
  ├── automation_tools.json (自動化 12ツール)
  └── 他13カテゴリ

🎯 目標: 200+ツールの完全データベース構築
```

#### **2. ランキングバリエーション**
```
✅ 完了: TENスコアランキング
🚧 計画中: 追加評価軸
  ├── コスパ重視ランキング
  ├── 初心者向けランキング  
  ├── 上級者向けランキング
  └── カテゴリ別ランキング

🎯 目標: TEN002-020の多彩なランキング作成
```

#### **3. 自動化強化**
```
現在: 手動実行（3コマンド）
計画: 完全自動化
  ├── データ更新検知システム
  ├── 自動ランキング再計算
  ├── 自動投稿生成  
  └── 自動Web反映

🎯 目標: ワンクリック→完成までの自動化
```

### 🌟 **B. 中期拡張計画（次の3ヶ月）**

#### **1. マルチテンプレート対応**
```
現在: unified-template-12専用
計画: 複数テンプレート対応
  ├── unified-template-13 (ステップガイド型)
  ├── unified-template-14 (比較型)
  └── unified-template-15 (インフォグラフィック型)

🎯 目標: 10+テンプレートでの多様な表現
```

#### **2. AI生成強化**
```  
現在: データ直接流し込み
計画: AI生成システム活用
  ├── コンテンツ生成の精度向上
  ├── 自然な文章生成
  ├── パーソナライズ対応
  └── 多言語対応

🎯 目標: 高品質な自動生成システム
```

#### **3. 品質管理システム**
```
現在: 手動チェック
計画: 自動品質管理
  ├── データバリデーション
  ├── テンプレート表示テスト
  ├── パフォーマンス監視
  └── エラー検知・通知

🎯 目標: 確実な品質保証システム
```

### 🏆 **C. 長期ビジョン（6ヶ月以降）**

#### **1. 完全生産性データベース**
```
🎯 最終目標:
  ├── 17カテゴリ完全対応
  ├── 1000+ツール・サービス収録
  ├── リアルタイムデータ更新
  ├── ユーザー評価システム
  └── AI推奨エンジン

📊 期待効果:
  └── 生産性向上分野の決定版データベース
```

#### **2. Instagram投稿完全自動化プラットフォーム**
```
🎯 最終目標:
  ├── TEN001-999の自動生成
  ├── 他キャラクター対応（KIKUYO, KING, MISAKI）
  ├── マルチプラットフォーム対応
  ├── スケジュール投稿
  └── 効果測定・改善

📊 期待効果:
  └── Instagram運用の完全自動化実現
```

---

## まとめ

### ✅ **本仕様書の成果**

1. **完全理解**: TENシステムの全体像を詳細に把握
2. **確実な保守**: 修正時の影響範囲と対応方法を明確化  
3. **効率的拡張**: 今後の拡張方針と実装手順を整理
4. **トラブル対応**: よくある問題の解決策を事前準備

### 🎯 **次世代Claude Code への期待**

この完全仕様書により、次世代Claude Code は以下が可能になります:

- **確実な修正**: どのファイルを修正すれば良いかが明確
- **安全な拡張**: 影響範囲を理解した上での機能追加
- **迅速なトラブル対応**: 問題パターンと解決策を事前把握
- **品質の維持**: システム全体の整合性を保った開発

### 🚀 **最終メッセージ**

TEN生産性ツールランキングシステムは、Instagram投稿自動化の基盤となる重要なシステムです。この仕様書を基に、確実で効率的なシステム発展を実現してください。

**プロジェクトの成功をお祈りしています！**

---

**📞 引き継ぎ完了**  
**作成者**: 現世代Claude Code  
**引き継ぎ先**: 次世代Claude Code  
**作成日時**: 2025年8月30日  
**ドキュメントバージョン**: 1.0.0