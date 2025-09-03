# TEN DATABASE 完全ワークフローシステム

作成日: 2025-08-30
目的: リサーチ → データベース構築 → K投稿生成の完全自動化フロー

## 🎯 ワークフロー概要

```
Step1: リサーチ → Step2: データベース → Step3: ランキング → Step4: K投稿 → Step5: Web表示
     ↓              ↓                ↓              ↓             ↓
  ChatGPT活用    JSON構造化       TENスコア計算   8ページ生成    テンプレート表示
```

## 📋 Step1: 徹底リサーチフェーズ

### 1-1. ChatGPT用リサーチプロンプト設計

#### **ガジェットリサーチ起動術式**
```markdown
以下のガジェットリストについて詳細なリサーチを実行してください

**リサーチ対象ガジェット**：
・CIO ホットマスク
・ヒツジのいらない枕
・NAISU N1
・Teching Robot
・katamaki
・PIXEL POCKET
・LAVA ball
・MagGo USB-C カードリーダー
・ROBOTOYS
・ROG Ally X
・iPad mini（第7世代）
・Analog Pocket
・遊べる貯金箱スペースインベーダーテーブル
・MagSafe対応ウォーターボトル
・デジタルTLR
・canox
・AirCard
・SR-32 ポータブルラジオ
・ハンディファン
・MagOn Ultra Slim 5000
・Thumby Color
・Vacmagu Stand
・Hidock H1
・のぞき見防止フィルム
・Anker 絡まないケーブル
・Boyata PC スタンド
・Logicool K380
・CIO Smart Coby Pro
・CIO NovaPort Duo 65W
・Logicool M575 トラックボール

### 必須データ項目
- ✅ 2024-2025年最新データ使用
- ✅ 公式情報のみ（推測・憶測禁止）
- ✅ 価格データは実売価格必須
- ✅ 「データなし」の場合はnull値で統一

**必須出力フォーマット**：
以下のJSON形式で各ガジェットのデータを出力してください

```json
[
  {
    "id": "GADGET_001",
    "name": "[正式製品名]",
    "brand": "[メーカー名]",
    "category": "[大カテゴリ]",
    "subCategory": "[小カテゴリ]",
    "pricing": {
      "marketPrice": [実売価格数値],
      "listPrice": [定価数値],
      "amazonPrice": [Amazon価格],
      "rakutenPrice": [楽天価格]
    },
    "specifications": {
      "dimensions": "[サイズ]",
      "weight": "[重量]",
      "connectivity": ["接続方式"],
      "compatibility": ["対応機器"],
      "warranty": "[保証期間]"
    },
    "features": {
      "keyFeatures": ["[主要機能1]", "[主要機能2]"],
      "uniquePoints": "[独自の特徴]",
      "useCases": ["[使用場面1]", "[使用場面2]"]
    },
    "availability": {
      "inStock": [true/false],
      "releaseDate": "[発売日]",
      "discontinued": [true/false]
    },
    "reviews": {
      "amazonRating": [Amazon評価],
      "priceComRating": "[価格.com評価]",
      "reviewCount": [レビュー数]
    },
    "verification": {
      "officialSite": "[公式サイトURL]",
      "amazonUrl": "[AmazonURL]",
      "sources": ["[情報源1]", "[情報源2]"]
    }
  }
]
```

## 🔍 データソース優先順位

### 1. 最優先ソース（信頼度A）
- **メーカー公式サイト**
- **Amazon・楽天公式ストア**
- **価格.com製品ページ**

### 2. 準拠ソース（信頼度B）
- **家電量販店公式サイト（ヨドバシ、ビックカメラ等）**
- **ITmedia・Impress Watch等専門メディア**
- **YouTube公式チャンネルレビュー**

### 3. 参考ソース（信頼度C）
- **個人ブログ（実機レビューあり）**
- **SNS投稿（写真・動画あり）**
- **クラウドファンディングページ**

### 4. 使用禁止（信頼度D）
- ❌ **未確認の個人ブログ**
- ❌ **推測・憶測記事**
- ❌ **古い情報（2023年以前）**

## ⚠️ 品質基準

### 必須チェック項目
- [ ] 全ガジェットID採番統一（GADGET_001-030）
- [ ] pricing項目の価格データ完全性
- [ ] specifications項目の正確性
- [ ] verification項目のURL有効性
- [ ] JSON形式の構文エラーチェック

### エラー回避事項
- **推測値使用禁止**: 「約○○円」「○○円程度」等の曖昧表現避ける
- **古いデータ禁止**: 2024-2025年以外のデータは使用しない
- **存在確認必須**: 製品の実在性を複数ソースで確認
- **一貫性保持**: 同カテゴリ内でのデータ項目統一

## 🔄 **必須調査フロー（1製品完了基準）**

### **✅ 1製品につき必須実行手順**
**各ガジェットにつき以下5ソースを網羅的に調査：**

1. **WebSearch**: [製品名] 公式サイト → 正式名称・スペック・価格
2. **WebSearch**: [製品名] Amazon → 実売価格・レビュー・在庫状況
3. **WebSearch**: [製品名] 価格.com → 価格比較・詳細レビュー
4. **WebSearch**: [製品名] レビュー 2024 → 最新レビュー・使用感
5. **WebSearch**: [製品名] 使い方 → 実際の使用シーン・効果

### **📋 1製品完了→即保存ルール**
- **5ソース調査完了**時点で1製品完了とする
- **即座にJSONファイルに保存**（蓄積式追加）
- **次の製品調査に移行**

### **🎯 null値の正しい基準**
**5ソース網羅調査後もデータが見つからない場合のみnull使用**

❌ **間違い**: 1つのサイトで見つからない→null  
✅ **正解**: 5ソース全て確認→見つからない→null

**重要事項**：
- **5ソース網羅調査が1製品完了の絶対条件**
- **データが見つからない項目のみ null で記載**
- **推測・憶測は絶対に禁止**
- **2024-2025年最新データのみ使用**
- **1製品完了毎に即座にJSONファイル保存**
- **全ガジェットを上記JSON形式で出力**
```

### 1-2. 資格リサーチ起動術式

#### **資格リサーチ用プロンプト**
```markdown
以下の資格リストについて詳細なリサーチを実行してください

**リサーチ対象資格**：
・FP技能検定3級
・FP技能検定2級
・簿記検定3級
・簿記検定2級
・ITパスポート
・基本情報技術者
・宅地建物取引士
・登録販売者
・食品衛生責任者
・防火管理者
・普通自動車免許
・TOEIC L&R
・秘書検定3級
・ウェブデザイン技能検定
・整理収納アドバイザー

### 必須データ項目
- ✅ 2024-2025年最新試験データ
- ✅ 公式試験機関情報のみ
- ✅ 合格率・受験者数は正確な数値
- ✅ 受験費用は最新料金

**必須出力フォーマット**：
```json
[
  {
    "id": "CERT_001",
    "name": "[正式資格名]",
    "displayName": "[一般呼称]",
    "level": [級数値],
    "category": "[資格カテゴリ]",
    "type": "national/public/private",
    "examInfo": {
      "frequency": "[試験回数]",
      "examFee": [受験料数値],
      "applicationFee": [申込手数料],
      "examDuration": "[試験時間]",
      "examFormat": "[試験形式]"
    },
    "difficulty": {
      "passRate": [合格率%],
      "studyHours": [標準学習時間],
      "studyPeriod": "[学習期間]",
      "difficultyLevel": [1-5]
    },
    "benefits": {
      "jobOpportunities": ["[就職有利業界]"],
      "salaryBoost": "[年収アップ額]",
      "allowanceAmount": "[資格手当月額]",
      "careerAdvancement": "[キャリア効果]"
    },
    "requirements": {
      "ageLimit": [年齢制限],
      "educationRequirement": "[学歴要件]",
      "experienceRequired": "[実務経験要件]",
      "prerequisiteCerts": ["[前提資格]"]
    },
    "verification": {
      "officialSite": "[公式サイトURL]",
      "examBody": "[試験実施機関]",
      "sources": ["[情報源]"]
    }
  }
]
```
```

### 1-3. AIツールリサーチ起動術式

#### **AIツール専用プロンプト**
```markdown
以下のAI・生産性ツールについて詳細なリサーチを実行してください

**リサーチ対象ツール**：
・ChatGPT
・Claude
・Perplexity
・Notion
・Canva
・Midjourney
・notta
・ラッコキーワード
・Googleカレンダー
・Trello
・Loom
・DeepL

### 必須データ項目
- ✅ 2024-2025年最新機能・料金
- ✅ 公式サイト情報のみ
- ✅ 無料版制限は正確に
- ✅ 有料プラン価格は最新

**必須出力フォーマット**：
```json
[
  {
    "id": "TOOL_001",
    "name": "[正式サービス名]",
    "company": "[運営会社]",
    "category": "[ツールカテゴリ]",
    "pricing": {
      "freeTier": [true/false],
      "freeLimit": "[無料版制限]",
      "paidPlans": {
        "basic": [月額料金],
        "pro": [月額料金],
        "business": [月額料金]
      }
    },
    "features": {
      "keyFeatures": ["[主要機能]"],
      "aiPowered": [true/false],
      "integration": ["[連携サービス]"],
      "platforms": ["[対応プラットフォーム]"]
    },
    "usageStats": {
      "globalUsers": "[ユーザー数]",
      "japanUsers": "[日本ユーザー数]",
      "appStoreRating": [評価点],
      "launchDate": "[サービス開始日]"
    },
    "verification": {
      "officialSite": "[公式サイトURL]",
      "pricingPage": "[料金ページURL]",
      "sources": ["[情報源]"]
    }
  }
]
```
```

## 📊 Step2: データベース構築フェーズ

### 2-1. JSON統合処理

#### **統合スクリプト: `createTENMasterDatabase.js`**
```javascript
/**
 * TEN生産性データベース統合システム v2.0
 * 全カテゴリのデータを統合し、TENスコアを自動計算
 */

class TENDatabaseBuilder {
  constructor() {
    this.categories = {
      'tools': 'ai_productivity_tools.json',
      'gadgets': 'trending_gadgets_2025.json',
      'certificates': 'popular_certificates.json',
      'apps': 'mobile_productivity_apps.json',
      'routines': 'daily_routines.json'
    }
    this.masterData = {
      tools: [],
      gadgets: [],
      certificates: [],
      metadata: {}
    }
  }

  // メイン統合処理
  async buildMasterDatabase() {
    console.log('🚀 TENマスターデータベース構築開始...')
    
    // 各カテゴリデータ読み込み
    for (const [category, filename] of Object.entries(this.categories)) {
      const data = await this.loadCategoryData(category, filename)
      if (data && data.length > 0) {
        this.masterData[category] = data.map(item => this.enhanceWithTENScores(item))
        console.log(`✅ ${category}: ${data.length}件 読み込み完了`)
      }
    }
    
    // 統計計算
    this.masterData.metadata = this.calculateStatistics()
    
    // 出力
    await this.saveMasterDatabase()
    console.log('🎉 TENマスターデータベース構築完了！')
  }

  // TENスコア自動計算
  enhanceWithTENScores(item) {
    const enhanced = { ...item }
    
    // カテゴリ別TENスコア計算
    if (item.type === 'tool' || item.type === 'app') {
      enhanced.ten_scores = this.calculateToolTENScores(item)
    } else if (item.type === 'gadget') {
      enhanced.ten_scores = this.calculateGadgetTENScores(item)
    } else if (item.type === 'certificate') {
      enhanced.ten_scores = this.calculateCertTENScores(item)
    }
    
    // 総合TENスコア計算
    enhanced.overall_ten_score = this.calculateOverallTENScore(enhanced.ten_scores)
    
    return enhanced
  }

  // ツール用TENスコア
  calculateToolTENScores(tool) {
    return {
      immediate_effect: this.calculateImmediateEffect(tool),
      low_barrier: this.calculateLowBarrier(tool),
      trend_factor: this.calculateTrendFactor(tool),
      cost_effectiveness: this.calculateCostEffectiveness(tool),
      lazy_friendly: this.calculateLazyFriendly(tool)
    }
  }

  // ガジェット用TENスコア
  calculateGadgetTENScores(gadget) {
    return {
      immediate_effect: this.calculateGadgetImmediateEffect(gadget),
      setup_simplicity: this.calculateSetupSimplicity(gadget),
      trend_factor: this.calculateGadgetTrendFactor(gadget),
      cost_performance: this.calculateGadgetCostPerformance(gadget),
      comfort_boost: this.calculateComfortBoost(gadget)
    }
  }

  // 資格用TENスコア
  calculateCertTENScores(cert) {
    return {
      quick_acquisition: this.calculateQuickAcquisition(cert),
      low_cost: this.calculateLowCost(cert),
      market_demand: this.calculateMarketDemand(cert),
      roi_speed: this.calculateROISpeed(cert),
      study_ease: this.calculateStudyEase(cert)
    }
  }
}

// 実行
const builder = new TENDatabaseBuilder()
builder.buildMasterDatabase()
```

### 2-2. データ品質チェック

#### **自動検証システム**
```javascript
class TENDataValidator {
  validate(data) {
    const errors = []
    
    // 必須フィールドチェック
    if (!data.id || !data.name) {
      errors.push('必須フィールド不足: id, name')
    }
    
    // 価格データ検証
    if (data.pricing && data.pricing.marketPrice) {
      if (typeof data.pricing.marketPrice !== 'number') {
        errors.push('価格は数値である必要があります')
      }
    }
    
    // URL有効性チェック
    if (data.verification && data.verification.officialSite) {
      if (!this.isValidURL(data.verification.officialSite)) {
        errors.push('無効なURL: ' + data.verification.officialSite)
      }
    }
    
    return errors
  }
}
```

## 🏆 Step3: ランキング生成フェーズ

### 3-1. 高度ランキングエンジン

#### **`advancedTENRankingGenerator.js`**
```javascript
class AdvancedTENRankingGenerator {
  constructor(masterData) {
    this.data = masterData
  }

  // メインランキング生成関数
  generateRanking(config) {
    const {
      category,           // 'tools', 'gadgets', 'certificates'
      criteria,          // 'overall_ten_score', 'immediate_effect'
      filters = {},      // 価格帯、機能等のフィルター
      limit = 10,        // 取得件数
      targetAudience     // 'student', 'working', 'freelance'
    } = config

    // データフィルタリング
    let items = this.filterItems(this.data[category], filters, targetAudience)
    
    // スコア計算・ソート
    items = this.sortByCriteria(items, criteria)
    
    // TOP N抽出
    const ranking = items.slice(0, limit).map((item, index) => ({
      rank: index + 1,
      ...item,
      score: this.getScoreForCriteria(item, criteria),
      explanation: this.generateExplanation(item, criteria)
    }))

    return {
      title: this.generateRankingTitle(config),
      ranking,
      metadata: this.generateMetadata(config, ranking)
    }
  }

  // ランキングタイトル自動生成
  generateRankingTitle(config) {
    const categoryMap = {
      'tools': 'ツール',
      'gadgets': 'ガジェット', 
      'certificates': '資格'
    }
    
    const audienceMap = {
      'student': '学生向け',
      'working': '社会人向け',
      'freelance': 'フリーランス向け'
    }

    let title = ''
    if (config.targetAudience) {
      title += audienceMap[config.targetAudience]
    }
    title += categoryMap[config.category]
    title += 'TOP' + config.limit

    return title
  }
}
```

### 3-2. ランキングパターン生成

#### **定番ランキング自動生成**
```javascript
const RANKING_TEMPLATES = {
  // 即効性ランキング
  immediate: {
    title: "5分で効果を実感できる{category}TOP10",
    criteria: "immediate_effect",
    filters: { setup_time: "<=5分" }
  },
  
  // コスパランキング
  cospa: {
    title: "コスパ最強の{category}TOP10", 
    criteria: "cost_effectiveness",
    filters: { price_range: "<=10000" }
  },
  
  // 学生向け
  student: {
    title: "大学生が取るべき{category}TOP10",
    criteria: "overall_ten_score",
    targetAudience: "student"
  },
  
  // 無料限定
  free: {
    title: "完全無料の{category}TOP10",
    criteria: "overall_ten_score", 
    filters: { cost: 0 }
  }
}
```

## 📝 Step4: K投稿生成フェーズ

### 4-1. Type003投稿生成エンジン

#### **`generateKnowledgePost.js`**
```javascript
class KnowledgePostGenerator {
  constructor(rankingData) {
    this.ranking = rankingData
    this.knowledgeId = this.generateKnowledgeId()
  }

  // メイン生成関数
  async generateType003Post() {
    const post = {
      knowledgeId: this.knowledgeId,
      title: this.ranking.title,
      type: "003",
      pageStructurePattern: "unified-template-12-productivity-tool",
      targetIds: ["T004"],
      
      basicInfo: this.generateBasicInfo(),
      detailedContent: await this.generate8Pages(),
      summary: this.generateSummary(),
      
      metadata: {
        createdAt: new Date().toISOString(),
        category: this.ranking.category,
        itemCount: this.ranking.ranking.length
      }
    }

    // ファイル出力
    await this.saveKnowledgePost(post)
    await this.generateCaption(post)
    
    return post
  }

  // 8ページ構成生成
  async generate8Pages() {
    const pages = {}
    
    // Page1: TEN導入
    pages.page1 = {
      section: "introduction",
      template: "ten_intro",
      content: this.generateIntroPage()
    }
    
    // Page2: 一覧ページ
    pages.page2 = {
      section: "showcase", 
      template: "tool_showcase",
      content: this.generateShowcasePage()
    }
    
    // Page3-7: 詳細ページ（2アイテムずつ）
    for (let i = 3; i <= 7; i++) {
      const itemIndex = (i - 3) * 2
      pages[`page${i}`] = {
        section: `detail_${i}`,
        template: "enhanced_tool_detail",
        content: this.generateDetailPage(itemIndex, itemIndex + 1)
      }
    }
    
    // Page8: まとめページ
    pages.page8 = {
      section: "summary",
      template: "ten_summary", 
      content: this.generateSummaryPage()
    }
    
    return pages
  }

  // TEN導入ページ
  generateIntroPage() {
    return {
      title: this.ranking.title,
      catchphrase: this.generateTENCatchphrase(),
      problems: this.generateTENProblems(),
      solution: this.generateTENSolution(),
      tenCharacter: {
        message: this.generateTENMessage(),
        tone: "古風な武士口調"
      }
    }
  }

  // TENキャッチフレーズ生成
  generateTENCatchphrase() {
    const templates = [
      "効率化への道は、{category}から始まるなり！",
      "めんどくさがりでも続く{category}を厳選したであるぞ",
      "5分で始められる{category}で、生産性を爆上げなり"
    ]
    return this.randomSelect(templates).replace('{category}', this.getCategoryName())
  }
}
```

### 4-2. キャプション自動生成

#### **Instagram用キャプション生成**
```javascript
class InstagramCaptionGenerator {
  generateCaption(knowledgePost) {
    const ranking = knowledgePost.ranking
    
    let caption = `【${knowledgePost.title}】\n\n`
    
    // TEN風導入文
    caption += `効率化したいけど、何から始めればいいかわからぬ...\n`
    caption += `そんな拙者と同じ悩みを持つ者へ！\n\n`
    
    // TOP3表示
    ranking.ranking.slice(0, 3).forEach((item, index) => {
      const medal = ['🥇', '🥈', '🥉'][index]
      caption += `${medal} ${item.name} → ${item.explanation}\n`
    })
    
    // 行動促進
    caption += `\n全て5分以内で始められて、効果は即座に実感なり！\n`
    caption += `保存して、今日から1つでも試してみるなり！\n\n`
    
    // ハッシュタグ
    caption += this.generateHashtags(knowledgePost)
    
    return caption
  }
}
```

## 🌐 Step5: Web表示フェーズ

### 5-1. テンプレート自動登録

#### **テンプレート登録システム**
```javascript
// 新しいKnowledgeが生成された際の自動処理
class KnowledgeTemplateManager {
  async registerNewKnowledge(knowledgePost) {
    // type-target-persona-relations.json更新
    await this.updateRelations(knowledgePost)
    
    // ui-names.json更新
    await this.updateUINames(knowledgePost)
    
    // PageStructureMatcher更新
    await this.updatePageStructureMatcher(knowledgePost)
    
    console.log(`✅ ${knowledgePost.knowledgeId} Web表示準備完了`)
  }
}
```

## 🚀 完全自動化実行

### マスター実行スクリプト

#### **`runTENWorkflow.js`**
```javascript
async function runCompleteTENWorkflow() {
  console.log('🎯 TEN完全ワークフロー開始...')
  
  try {
    // Step1: データベース構築
    console.log('📊 Step1: データベース構築中...')
    const builder = new TENDatabaseBuilder()
    await builder.buildMasterDatabase()
    
    // Step2: ランキング生成
    console.log('🏆 Step2: ランキング生成中...')
    const generator = new AdvancedTENRankingGenerator(masterData)
    
    const rankings = [
      generator.generateRanking({
        category: 'tools',
        criteria: 'overall_ten_score',
        limit: 10,
        targetAudience: 'working'
      }),
      generator.generateRanking({
        category: 'gadgets', 
        criteria: 'immediate_effect',
        limit: 10,
        filters: { price_range: '<=10000' }
      }),
      generator.generateRanking({
        category: 'certificates',
        criteria: 'quick_acquisition',
        limit: 10,
        targetAudience: 'student'
      })
    ]
    
    // Step3: K投稿生成
    console.log('📝 Step3: K投稿生成中...')
    for (const ranking of rankings) {
      const postGenerator = new KnowledgePostGenerator(ranking)
      const knowledgePost = await postGenerator.generateType003Post()
      
      // Step4: Web表示準備
      const templateManager = new KnowledgeTemplateManager()
      await templateManager.registerNewKnowledge(knowledgePost)
    }
    
    console.log('🎉 TEN完全ワークフロー完了！')
    console.log(`生成されたK投稿: ${rankings.length}件`)
    
  } catch (error) {
    console.error('❌ ワークフロー実行エラー:', error)
  }
}

// 実行
runCompleteTENWorkflow()
```

## 📅 運用スケジュール

### 月次実行計画
```
第1週: 新規データリサーチ（10-20アイテム）
第2週: データベース更新・品質チェック
第3週: 新ランキング生成（5-10パターン）
第4週: K投稿生成・Web公開
```

### 自動化レベル
- **Level 1**: 手動実行（各Step個別）
- **Level 2**: 半自動（マスタースクリプト実行）
- **Level 3**: 完全自動（cron + GitHub Actions）

これにより、**リサーチから投稿まで一気通貫**の効率的なワークフローが完成します。