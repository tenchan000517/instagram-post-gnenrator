# 14_API_INTERFACE_SPEC.md - AI API統合仕様と呼び出し詳細

## 📋 目次

1. [API統合概要](#1-api統合概要)
2. [Gemini AI統合詳細](#2-gemini-ai統合詳細)
3. [内部API仕様](#3-内部api仕様)
4. [関数インターフェース](#4-関数インターフェース)
5. [エラーハンドリング戦略](#5-エラーハンドリング戦略)
6. [プロンプトテンプレート集](#6-プロンプトテンプレート集)
7. [レスポンス解析システム](#7-レスポンス解析システム)
8. [統合ガイドライン](#8-統合ガイドライン)

---

## 1. API統合概要

### 1.1 システムアーキテクチャ

Instagram Post GeneratorのAI統合は、**5段階の順序処理**により高品質なコンテンツを生成します。

#### 🤖 5段階AI呼び出しフロー
```typescript
interface AIProcessingStages {
  stage1: "フォーマッター";           // ジャンル別最適化変換
  stage2: "構造分析";               // ページ構造・テンプレート選択  
  stage3: "一括生成";               // 構造制約下でのコンテンツ生成
  stage4: "キャプション";           // Instagram最適化キャプション
  stage5: "ハッシュタグ";           // カテゴリ別ハッシュタグ生成
}
```

#### 📊 処理フロー図
```mermaid
graph TD
    A[ユーザー入力] --> B[Stage1: フォーマッター]
    B --> C[Stage2: 構造分析]
    C --> D[Stage3: 一括生成]
    D --> E[Stage4: キャプション]
    E --> F[Stage5: ハッシュタグ]
    F --> G[最終コンテンツ]
    
    B -.-> H[ジャンル判定]
    C -.-> I[テンプレートマッチング]
    D -.-> J[構造制約適用]
```

### 1.2 API統合の設計思想

#### 🎯 100点ルール適用
- **完璧な構造適合**: AI応答は100%テンプレート仕様に適合
- **妥協なき品質**: 部分的な成功は失敗として扱う
- **自動修復機能**: エラー時の自動フォールバック

#### 🔒 堅牢性保証
- **多段階JSON解析**: 4段階の解析プロセス
- **指数バックオフリトライ**: API制限時の自動復旧
- **詳細エラー分類**: 原因別の適切な対処

---

## 2. Gemini AI統合詳細

### 2.1 基本設定と認証

#### 🔑 API設定
```typescript
// geminiClientSingleton.ts
class GeminiClientSingleton {
  private static instance: GoogleGenerativeAI | null = null
  private static model: any = null

  static getClient(): GoogleGenerativeAI {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('Gemini API key not found. Please set GEMINI_API_KEY in .env file.')
    }
    return new GoogleGenerativeAI(apiKey)
  }

  static getModel() {
    const client = this.getClient()
    return client.getGenerativeModel({ 
      model: 'gemini-2.0-flash-lite',
      generationConfig: {
        temperature: 0.7,      // 創造性と一貫性のバランス
        topP: 0.8,            // 確率分布の上位80%から選択
        topK: 40,             // 上位40個のトークンから選択
        maxOutputTokens: 8192 // 最大出力トークン数
      }
    })
  }
}
```

#### 🌍 環境変数設定
```bash
# .env設定例
GEMINI_API_KEY=AIzaSyB2fqjY3f78rr4rmB0oqTc5FMn8lx-79mY
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyB2fqjY3f78rr4rmB0oqTc5FMn8lx-79mY
GEMINI_MODELS='gemini-2.0-flash-lite'
```

### 2.2 モデル仕様

#### 📋 Gemini 2.0 Flash Lite仕様
| 項目 | 設定値 | 説明 |
|------|--------|------|
| **model** | `gemini-2.0-flash-lite` | 高速・軽量版 |
| **temperature** | `0.7` | 創造性レベル（0-2） |
| **topP** | `0.8` | 累積確率閾値 |
| **topK** | `40` | 候補トークン数 |
| **maxOutputTokens** | `8192` | 最大出力トークン |

#### ⚡ パフォーマンス特性
- **レスポンス時間**: 平均3-8秒
- **同時リクエスト**: 1リクエスト/時（直列化）
- **日次制限**: 200回/日（無料プラン）
- **トークン制限**: 8192トークン/レスポンス

### 2.3 レート制限とクォータ管理

#### 🚦 制限値一覧
```typescript
interface GeminiLimits {
  freeQuota: {
    requestsPerDay: 200;           // 日次リクエスト制限
    requestsPerMinute: 15;         // 分次リクエスト制限
    tokensPerMinute: 32000;        // 分次トークン制限
    tokensPerDay: 50000;           // 日次トークン制限
  };
  errorCodes: {
    QUOTA_EXCEEDED: 429;           // クォータ超過
    RATE_LIMIT: 503;              // レート制限
    INVALID_API_KEY: 401;         // 無効なAPIキー
  };
}
```

#### 🔄 リトライ戦略
```typescript
// 指数バックオフによるリトライ実装
const retryWithExponentialBackoff = async (
  apiCall: () => Promise<any>,
  maxRetries: number = 3
): Promise<any> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error: any) {
      if (error?.status === 429 || error?.status === 503) {
        const delay = Math.pow(2, attempt) * 1000; // 1秒, 2秒, 4秒
        console.log(`⏳ リトライ ${attempt + 1}/${maxRetries} - ${delay}ms待機`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error; // 他のエラーは即座に再スロー
    }
  }
  throw new Error('最大リトライ回数に達しました');
};
```

---

## 3. 内部API仕様

### 3.1 Stage 1: フォーマッター段階

#### 🎯 フォーマッター機能（現在未実装・将来実装予定）
```typescript
// 将来実装予定のフォーマッター仕様
interface FormatterAPI {
  endpoint: "/api/format";
  method: "POST";
  input: {
    rawInput: string;           // 生の入力テキスト
    targetGenre?: Genre;        // 指定ジャンル（オプション）
  };
  output: {
    formattedInput: string;     // ジャンル最適化済みテキスト
    detectedGenre: Genre;       // 判定ジャンル
    keywords: string[];         // 抽出キーワード
    confidence: number;         // 判定信頼度
  };
}
```

### 3.2 Stage 2: 構造分析段階

#### 📋 PageStructureAnalyzer API
```typescript
interface StructureAnalysisAPI {
  className: "PageStructureAnalyzer";
  method: "analyzePageStructureAndTemplates";
  input: string;                    // フォーマット済み入力
  output: PageStructure[];          // ページ構造配列
}

interface PageStructure {
  概要: string;                     // 具体的内容要約
  有益性: string;                   // 読者への価値
  template: TemplateType;           // 最適テンプレート名
  title: string;                    // 魅力的タイトル
  theme: string;                    // 詳細テーマ説明
}

// 実際の呼び出し例
const pageStructureAnalyzer = new PageStructureAnalyzer();
const structures = await pageStructureAnalyzer.analyzePageStructureAndTemplates(
  "【ノウハウ系】面接で成功するための5つの基本ステップ"
);
```

#### 🔍 ジャンル判定ロジック
```typescript
// ジャンル判定の実装詳細
class PageStructureAnalyzer {
  private extractGenreFromInput(input: string): Genre | null {
    // 【ジャンル】: xxxxx 形式を探す
    const genreMatch = input.match(/【ジャンル】\s*[:：]\s*([a-zA-Z-]+)/i);
    
    if (genreMatch) {
      const genreString = genreMatch[1].toLowerCase().trim();
      const validGenres: Genre[] = [
        'knowhow', 'book-recommendation', 'internship-deadline', 
        'entry-deadline', 'industry-features', 'strategy', 
        'step-learning', 'general'
      ];
      
      if (validGenres.includes(genreString as Genre)) {
        return genreString as Genre;
      }
    }
    return null;
  }
}
```

### 3.3 Stage 3: 一括生成段階

#### 🏭 StructureConstrainedGenerator API
```typescript
interface BatchGenerationAPI {
  className: "StructureConstrainedGenerator";
  method: "generateAllPagesWithConstraints";
  input: {
    originalInput: string;          // 元入力テキスト
    pageStructures: PageStructure[]; // 決定済み構造
  };
  output: GeneratedPage[];          // 生成ページ配列
}

interface GeneratedPage {
  pageNumber: number;               // ページ番号
  title: string;                    // ページタイトル
  templateType: TemplateType;       // テンプレート種別
  content: any;                     // テンプレート固有コンテンツ
  rawContent?: string;              // 生コンテンツ（デバッグ用）
}
```

#### 🔧 フォールバック機構
```typescript
// 一括生成失敗時の個別生成フォールバック
try {
  const pages = await this.generateAllPagesWithConstraints(input, structures);
  return pages;
} catch (error) {
  console.log('🔄 個別生成にフォールバック');
  const pages: GeneratedPage[] = [];
  for (const [index, structure] of structures.entries()) {
    const page = await this.generatePageWithConstraints(input, structure);
    page.pageNumber = index + 1;
    pages.push(page);
  }
  return pages;
}
```

### 3.4 Stage 4: キャプション生成段階

#### 📝 CaptionService API
```typescript
interface CaptionGenerationAPI {
  service: "captionService";
  method: "generateInstagramCaption";
  input: {
    content: GeneratedContent;      // 生成済みコンテンツ
    genre: Genre;                   // ジャンル情報
  };
  output: {
    caption: string;                // Instagram最適化キャプション
    characterCount: number;         // 文字数
    hashtagCount: number;           // ハッシュタグ数
  };
}

// 実装例
const captionService = new CaptionService();
const result = await captionService.generateInstagramCaption(content, genre);
```

### 3.5 Stage 5: ハッシュタグ生成段階

#### 🏷️ HashtagService API
```typescript
interface HashtagGenerationAPI {
  service: "hashtagService";
  method: "generateCategorizedHashtags";
  input: {
    content: GeneratedContent;      // 生成済みコンテンツ
    genre: Genre;                   // ジャンル情報
  };
  output: {
    primary: string[];              // 主要ハッシュタグ
    secondary: string[];            // 補助ハッシュタグ
    trending: string[];             // トレンドハッシュタグ
    large: string[];                // 大規模ハッシュタグ
    medium: string[];               // 中規模ハッシュタグ
    small: string[];                // 小規模ハッシュタグ
    all: string[];                  // 全ハッシュタグ
  };
}
```

---

## 4. 関数インターフェース

### 4.1 メイン統合サービス

#### 🚀 ContentGeneratorService
```typescript
class ContentGeneratorService {
  // メイン生成関数
  async generateHighQualityContent(userInput: string): Promise<GeneratedContent> {
    // AI呼び出しの直列化（503エラー対策）
    if (this.isGenerating) {
      throw new Error('AI生成が進行中です。少し待ってから再度お試しください。');
    }
    
    this.isGenerating = true;
    
    try {
      // Stage 1-2: 構造分析（現在実装）
      const pageStructures = await this.analyzePageStructure(userInput);
      
      // Stage 3: コンテンツ生成
      const pages = await this.generatePages(userInput, pageStructures);
      
      // Stage 4-5: メタデータ生成（キャプション・ハッシュタグ）
      const metadata = await this.generateMetadata(pages);
      
      return {
        pages,
        totalPages: pages.length,
        ...metadata
      };
    } finally {
      this.isGenerating = false;
    }
  }

  // 個別ページ再生成
  async regenerateSpecificPage(
    pageNumber: number, 
    userInput: string, 
    specificInstructions: string
  ): Promise<GeneratedPage> {
    const prompt = this.buildRegenerationPrompt(pageNumber, userInput, specificInstructions);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return this.parseRegeneratedPage(text, pageNumber);
    } catch (error) {
      throw new Error('個別ページの再生成に失敗しました');
    }
  }

  // テンプレートデータ変換
  private convertToTemplateData(content: any, templateType: TemplateType): TemplateData {
    // 100%完璧な変換を目指す
    const converter = new TemplateDataConverter(templateType);
    return converter.convert(content);
  }
}
```

### 4.2 専門サービス関数

#### 🔬 PageStructureAnalyzer関数詳細
```typescript
class PageStructureAnalyzer {
  // メイン分析関数
  async analyzePageStructureAndTemplates(input: string): Promise<PageStructure[]> {
    // ジャンル判定
    const genre = this.extractGenreFromInput(input) || await this.detectGenre(input);
    const genreConfig = getGenreConfig(genre);
    
    // プロンプト構築
    const prompt = this.buildAnalysisPrompt(input, genre, genreConfig);
    
    // AI呼び出し
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // レスポンス解析
    return this.parseStructureResponse(text);
  }

  // ジャンル抽出（明示的指定）
  private extractGenreFromInput(input: string): Genre | null {
    const genreMatch = input.match(/【ジャンル】\s*[:：]\s*([a-zA-Z-]+)/i);
    return genreMatch ? genreMatch[1] as Genre : null;
  }

  // プロンプト構築
  private buildAnalysisPrompt(input: string, genre: Genre, config: GenreConfig): string {
    return `
あなたはInstagram投稿構造の専門家です。

【ジャンル分析結果】
- 判定ジャンル: ${genre}
- 最適項目数: ${config.optimalItemRange.min}-${config.optimalItemRange.max}個

【入力内容】
${input}

【テンプレート選択指針】
${this.getTemplateSelectionRules()}

【出力形式JSON】
[
  {
    "概要": "具体的内容要約",
    "有益性": "読者への価値", 
    "template": "最適テンプレート名",
    "title": "魅力的タイトル",
    "theme": "詳細テーマ説明"
  }
]
`;
  }
}
```

#### 🏭 StructureConstrainedGenerator関数詳細
```typescript
class StructureConstrainedGenerator {
  // 一括生成メイン関数
  async generateAllPagesWithConstraints(
    originalInput: string,
    pageStructures: PageStructure[]
  ): Promise<GeneratedPage[]> {
    
    const prompt = this.buildBatchGenerationPrompt(originalInput, pageStructures);
    
    try {
      const result = await this.model.generateContent(prompt);
      const text = await result.response.text();
      
      const parsed = this.parseGeneratedJSON(text);
      return parsed.pages.map((page: any, index: number) => ({
        ...page,
        pageNumber: index + 1
      }));
    } catch (error) {
      // フォールバック: 個別生成
      return await this.fallbackToIndividualGeneration(originalInput, pageStructures);
    }
  }

  // 個別生成フォールバック
  private async fallbackToIndividualGeneration(
    originalInput: string,
    pageStructures: PageStructure[]
  ): Promise<GeneratedPage[]> {
    const pages: GeneratedPage[] = [];
    
    for (const [index, structure] of pageStructures.entries()) {
      const page = await this.generatePageWithConstraints(originalInput, structure);
      page.pageNumber = index + 1;
      pages.push(page);
    }
    
    return pages;
  }

  // 堅牢なJSON解析
  private parseGeneratedJSON(text: string): any {
    let jsonText = text
      .replace(/```json\n?|```\n?/g, '')     // コードブロック除去
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '')  // 制御文字除去
      .replace(/,\s*}/g, '}')                // 末尾カンマ除去
      .replace(/,\s*]/g, ']');               // 配列末尾カンマ除去
    
    // 最初の{から最後の}までを抽出
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }
    
    // スマートクォート正規化
    jsonText = jsonText
      .replace(/"/g, '"')
      .replace(/"/g, '"')
      .replace(/'/g, "'")
      .replace(/'/g, "'");
    
    try {
      return JSON.parse(jsonText);
    } catch (error) {
      console.error('JSON解析エラー:', error);
      throw new Error(`JSON解析に失敗: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
```

### 4.3 ユーティリティ関数

#### 🔧 GeminiClient取得関数
```typescript
// シングルトンクライアント取得
export const getGeminiClient = (): GoogleGenerativeAI => {
  return GeminiClientSingleton.getClient();
};

export const getGeminiModel = (): any => {
  return GeminiClientSingleton.getModel();
};

// 使用例
const model = getGeminiModel();
const result = await model.generateContent(prompt);
```

---

## 5. エラーハンドリング戦略

### 5.1 エラー分類と対処

#### 🚨 エラーカテゴリ一覧
```typescript
interface APIErrorCategories {
  // 認証・設定エラー
  INVALID_API_KEY: {
    code: 401;
    message: "API設定を確認してください";
    action: "環境変数の再設定";
  };
  
  // レート制限エラー
  RATE_LIMIT_EXCEEDED: {
    code: 429;
    message: "API呼び出し制限に達しました";
    action: "指数バックオフリトライ";
  };
  
  // クォータ超過エラー
  QUOTA_EXCEEDED: {
    code: 429;
    message: "日次制限（200回）に達しました";
    action: "明日まで待機または有料プラン検討";
  };
  
  // ネットワークエラー
  NETWORK_ERROR: {
    code: 503;
    message: "ネットワーク接続に問題があります";
    action: "自動リトライ（最大3回）";
  };
  
  // JSON解析エラー
  PARSE_ERROR: {
    code: 500;
    message: "AI応答の解析に失敗しました";
    action: "フォールバックデータ使用";
  };
  
  // 生成品質エラー
  QUALITY_ERROR: {
    code: 422;
    message: "生成されたコンテンツが品質基準を満たしません";
    action: "再生成または手動修正";
  };
}
```

#### 🔄 エラーハンドリング実装
```typescript
class APIErrorHandler {
  static async handleAPIError(error: any, context: string): Promise<never> {
    console.error(`API Error in ${context}:`, error);
    
    // エラー種別判定
    if (error?.status === 401 || error?.message?.includes('API key')) {
      throw new Error('Gemini APIキーが無効です。環境変数を確認してください。');
    }
    
    if (error?.status === 429) {
      if (error?.message?.includes('quota')) {
        throw new Error('Gemini APIの日次制限（200回）に達しました。明日再度お試しいただくか、有料プランへのアップグレードをご検討ください。');
      } else {
        throw new Error('API呼び出し制限に達しました。少し時間をおいてから再度お試しください。');
      }
    }
    
    if (error?.status === 503 || error?.message?.includes('network')) {
      throw new Error('ネットワーク接続に問題があります。インターネット接続を確認してください。');
    }
    
    if (error instanceof SyntaxError) {
      throw new Error('AI応答の解析に失敗しました。再度お試しください。');
    }
    
    // その他のエラー
    throw new Error(`予期しないエラーが発生しました: ${error?.message || String(error)}`);
  }
  
  static createFallbackResponse(templateType: TemplateType): GeneratedPage {
    return {
      pageNumber: 1,
      title: 'コンテンツ',
      templateType,
      content: {
        title: 'コンテンツ',
        description: 'コンテンツ生成中にエラーが発生しました。再度お試しください。',
        items: ['エラーにより表示できません']
      }
    };
  }
}
```

### 5.2 堅牢性保証機能

#### 🛡️ 多段階フォールバック
```typescript
class RobustnessGuarantee {
  // レベル1: 一括生成
  async primaryGeneration(input: string, structures: PageStructure[]): Promise<GeneratedPage[]> {
    try {
      return await this.structureConstrainedGenerator.generateAllPagesWithConstraints(input, structures);
    } catch (error) {
      console.log('🔄 レベル2フォールバックへ移行');
      return await this.secondaryGeneration(input, structures);
    }
  }
  
  // レベル2: 個別生成
  async secondaryGeneration(input: string, structures: PageStructure[]): Promise<GeneratedPage[]> {
    const pages: GeneratedPage[] = [];
    
    for (const structure of structures) {
      try {
        const page = await this.generateIndividualPage(input, structure);
        pages.push(page);
      } catch (error) {
        console.log('🔄 レベル3フォールバックへ移行');
        const fallback = this.tertiaryGeneration(structure);
        pages.push(fallback);
      }
    }
    
    return pages;
  }
  
  // レベル3: 固定テンプレート
  tertiaryGeneration(structure: PageStructure): GeneratedPage {
    return APIErrorHandler.createFallbackResponse(structure.template);
  }
}
```

---

## 6. プロンプトテンプレート集

### 6.1 Stage 2: 構造分析プロンプト

#### 📋 基本構造分析プロンプト
```typescript
const STRUCTURE_ANALYSIS_PROMPT = `
あなたはInstagram投稿構造の専門家です。以下のコンテンツを分析し、最適なページ構造を決定してください。

【ジャンル分析結果】
- 判定ジャンル: {{GENRE}}
- 最適項目数: {{MIN_ITEMS}}-{{MAX_ITEMS}}個

【分析ステップ】
1. コンテンツから有益性の高い情報を抽出
2. Instagram投稿に適した構造で分類
3. 各セクションに最適なテンプレートを選択（データ構造に基づく）
4. 視覚的魅力と読みやすさを考慮

【重要制約】
- 入力内容の情報のみ使用（推測・憶測禁止）
- **4-8ページの適切な分量**（充実した価値あるコンテンツを重視）
- テンプレート多様性を重視
- Instagram特化の簡潔性
- **ジャンル別最適項目数の必須遵守**: {{MIN_ITEMS}}-{{MAX_ITEMS}}個の項目を必ず含める

【入力内容】
{{INPUT_CONTENT}}

【テンプレート選択指針】
{{TEMPLATE_SELECTION_RULES}}

【出力形式JSON】
[
  {
    "概要": "具体的内容要約",
    "有益性": "読者への価値",
    "template": "最適テンプレート名",
    "title": "魅力的タイトル",
    "theme": "詳細テーマ説明"
  }
]
`;
```

#### 🎯 テンプレート選択ルール
```typescript
const TEMPLATE_SELECTION_RULES = `
**🎯 データ構造による最適選択 🎯**

**ranking**: 以下のランキング構造は必ずrankingを選択
- 順位付きデータ（1位〜5位など明確な順序）
- "ワースト"や"ベスト"など順位表現
- パーセンテージや数値付きランキング
- 順位・項目・数値の3要素が揃ったデータ
- **重要**: 「ランキング」「順位」「位」「ワースト」「ベスト」キーワードがある場合

**graph**: 以下のデータ可視化は必ずgraphを選択  
- 円グラフ向け：割合データ（%表記が含まれる）
- 棒グラフ向け：数値比較データ（時間・件数・金額など単位付き）
- データ出典情報あり（組織名・年度・発表日など）
- 複数の数値データポイントを比較する内容
- **重要**: 「グラフ」「データ」「割合」「%」「時間」「比較」「出典」キーワードがある場合

**table**: 以下の構造化データは必ずtableを選択
- 3行以上のデータ一覧（企業名｜業界｜年収など）
- 複雑な比較表（3つ以上の比較対象・多列データ）
- ツール一覧（ツール名｜機能｜価格｜評価など）
- 行と列で整理された体系的な情報（ランキング・グラフ以外）
- **重要**: 「一覧」「比較表」「ツール」キーワードがある場合（ランキング・グラフを除く）

**two-column-section-items**: 以下の対比構造は必ずtwo-column-section-itemsを選択
- VS比較（A vs B、明確に2つの選択肢を左右で比較）
- 対比概念（メリット｜デメリット、準備すること｜避けること）
- 左右で異なるカテゴリの項目リスト
- **重要**: 「vs」「対」「メリット・デメリット」などの対比キーワードがある場合
`;
```

### 6.2 Stage 3: 一括生成プロンプト

#### 🏭 基本一括生成プロンプト
```typescript
const BATCH_GENERATION_PROMPT = `
以下の入力内容と決定済みページ構造に基づいて、全ページのコンテンツを一括生成してください。

【元入力内容】
{{ORIGINAL_INPUT}}

【決定済みページ構造 + 完全なテンプレート構造要件】
{{TEMPLATE_STRUCTURE_INSTRUCTIONS}}

【🚨 最重要制約 🚨】
- 元入力の内容のみ使用（推測・憶測・外部情報禁止）
- 各テンプレートの構造要件に100%適合（フィールド名、データ型を正確に）
- 上記の「よくある間違い」を絶対に犯さない
- Instagram特化の簡潔で有益なコンテンツ
- 絵文字使用禁止（テキストのみ）

【出力形式JSON】
{
  "pages": [
    {
      "pageNumber": 1,
      "title": "ページタイトル",
      "templateType": "指定テンプレート",
      "content": {
        // 上記の構造要件に100%適合した内容
      }
    }
  ]
}

🎯 重要：各テンプレートの「データ構造」と「実際の例」を参考に、正確なJSON構造で生成してください。
`;
```

#### 📄 個別生成プロンプト
```typescript
const INDIVIDUAL_GENERATION_PROMPT = `
【元入力内容】
{{ORIGINAL_INPUT}}

【ページ情報】
タイトル: {{PAGE_TITLE}}
テンプレート: {{TEMPLATE_TYPE}}
テーマ: {{PAGE_THEME}}

{{TEMPLATE_STRUCTURE_REQUIREMENTS}}

【Instagram投稿向けコンテンツ有益性要求】
- 小学生レベルの常識は除外、ただし専門用語の羅列も禁止
- 「へぇ、知らなかった！」レベルの適度な専門性を重視
- 複雑な概念を簡潔で分かりやすい言葉で濃縮表現
- スマホ画面で瞬時に理解できる視覚的読みやすさ
- 具体的な数値・手法・期間を含めるが、難しすぎない表現で
- スクロール中に「おっ」と思わせる瞬間的価値

【Instagram適切レベルの抽出基準例】
❌ 簡単すぎる: "面接では清潔感が大切"
❌ 難しすぎる: "非言語的コミュニケーションにおけるメラビアンの法則により..."
✅ Instagram適切: "面接官は最初の7秒で印象の70%を決める"

【絶対制約】
- 元入力の内容のみ使用（推測・憶測・仮説・外部情報は完全禁止）
- {{PAGE_THEME}}に関連する「学習価値の高い部分」のみ抽出
- {{TEMPLATE_TYPE}}テンプレート構造に適合
- コンテンツ量は現状維持（レイアウトをはみ出さない）

【出力形式JSON】
{
  "title": "{{PAGE_TITLE}}",
  "templateType": "{{TEMPLATE_TYPE}}",
  "content": {
    // {{TEMPLATE_TYPE}}テンプレート専用構造に100%適合した内容
  }
}
`;
```

### 6.3 テンプレート固有プロンプト

#### 🎯 ranking専用プロンプト
```typescript
const RANKING_TEMPLATE_PROMPT = `
🎯 ranking専用指示：
✅ 必須："rankingData"配列（3-5個のオブジェクト）
✅ 各rankingDataオブジェクト：{"rank": 数値, "name": "項目名", "value": "数値・単位", "description": "詳細（オプション）"}
✅ 必須："content"フィールドに出典情報（【出典】: 組織名 調査年年調査）
❌ 禁止：items、sections、rankingDataなしの構造

正しい例：
"rankingData": [
  {"rank": 1, "name": "外資系IT企業", "value": "850万円", "description": "グローバル展開企業の高水準"},
  {"rank": 2, "name": "メガベンチャー", "value": "720万円", "description": "急成長企業の競争力"}
]
`;
```

#### 📊 graph専用プロンプト
```typescript
const GRAPH_TEMPLATE_PROMPT = `
🎯 graph専用指示：
✅ 必須："graphData"オブジェクト（type、data必須）
✅ graphData.type："pie" または "bar"
✅ graphData.data：[{"name": "項目名", "value": 数値, "color": "#カラーコード（オプション）"}]
✅ 棒グラフの場合：categories、series配列も必要
✅ 必須："content"フィールドに出典情報（【出典】: 組織名 調査年年調査）
❌ 禁止：items、sections、graphDataなしの構造

円グラフ例：
"graphData": {
  "type": "pie",
  "data": [
    {"name": "700万円以上", "value": 35, "color": "#3B82F6"},
    {"name": "500-700万円", "value": 40, "color": "#10B981"}
  ],
  "source": {"organization": "厚生労働省", "year": "2024"}
}

棒グラフ例：
"graphData": {
  "type": "bar",
  "categories": ["IT", "金融", "製造"],
  "series": [
    {"name": "平均年収", "data": [520, 480, 450], "unit": "万円"}
  ]
}
`;
```

---

## 7. レスポンス解析システム

### 7.1 JSON解析パイプライン

#### 🔧 4段階解析プロセス
```typescript
class ResponseParser {
  // 段階1: 基本クリーンアップ
  private stage1_basicCleanup(text: string): string {
    return text
      .replace(/```json\n?|```\n?/g, '')    // コードブロック除去
      .trim();                              // 前後空白除去
  }
  
  // 段階2: JSON抽出
  private stage2_extractJSON(text: string): string {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? jsonMatch[0] : text;
  }
  
  // 段階3: 文字正規化
  private stage3_normalizeCharacters(text: string): string {
    return text
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // 制御文字除去
      .replace(/,\s*}/g, '}')                // 末尾カンマ除去
      .replace(/,\s*]/g, ']')                // 配列末尾カンマ除去
      .replace(/"/g, '"')                    // 左ダブルクォート
      .replace(/"/g, '"')                    // 右ダブルクォート
      .replace(/'/g, "'")                    // 左シングルクォート
      .replace(/'/g, "'");                   // 右シングルクォート
  }
  
  // 段階4: 引用符エスケープ
  private stage4_escapeQuotes(text: string): string {
    try {
      JSON.parse(text);
      return text; // パース成功時はそのまま返す
    } catch (e) {
      // 値内の引用符をエスケープ
      return text.replace(
        /:(\s*)"([^"]*)"([^"]*)"([^"]*)"(\s*[,}])/g,
        (_match, p1, p2, p3, p4, p5) => `:${p1}"${p2}\\"${p3}\\"${p4}"${p5}`
      );
    }
  }
  
  // 統合解析
  parseAIResponse(text: string): any {
    let processedText = text;
    
    // 4段階処理
    processedText = this.stage1_basicCleanup(processedText);
    processedText = this.stage2_extractJSON(processedText);
    processedText = this.stage3_normalizeCharacters(processedText);
    processedText = this.stage4_escapeQuotes(processedText);
    
    try {
      return JSON.parse(processedText);
    } catch (error) {
      console.error('JSON解析最終エラー:', error);
      console.error('処理済みテキスト:', processedText);
      throw new Error(`JSON解析に失敗: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
```

### 7.2 品質検証システム

#### 🔍 応答品質チェック
```typescript
class ResponseQualityChecker {
  // 構造完整性チェック
  validateStructure(parsed: any, expectedTemplate: TemplateType): boolean {
    const validator = new TemplateValidator(expectedTemplate);
    return validator.validate(parsed);
  }
  
  // 必須フィールドチェック
  validateRequiredFields(parsed: any, template: TemplateType): string[] {
    const required = this.getRequiredFields(template);
    const missing: string[] = [];
    
    for (const field of required) {
      if (!this.hasField(parsed, field)) {
        missing.push(field);
      }
    }
    
    return missing;
  }
  
  // データ型チェック
  validateDataTypes(parsed: any, template: TemplateType): boolean {
    const schema = this.getTemplateSchema(template);
    return this.validateAgainstSchema(parsed, schema);
  }
  
  // 文字数制限チェック
  validateCharacterLimits(parsed: any, template: TemplateType): string[] {
    const violations: string[] = [];
    const limits = this.getCharacterLimits(template);
    
    for (const [field, limit] of Object.entries(limits)) {
      const value = this.getFieldValue(parsed, field);
      if (typeof value === 'string' && value.length > limit) {
        violations.push(`${field}: ${value.length}文字 > ${limit}文字制限`);
      }
    }
    
    return violations;
  }
}
```

### 7.3 自動修復機能

#### 🔧 データ自動修復
```typescript
class AutoRepairSystem {
  // 不完全データの自動補完
  repairIncompleteData(parsed: any, template: TemplateType): any {
    const repaired = { ...parsed };
    
    // 必須フィールドの補完
    const requiredFields = this.getRequiredFields(template);
    for (const field of requiredFields) {
      if (!this.hasField(repaired, field)) {
        repaired[field] = this.getDefaultValue(field, template);
      }
    }
    
    // 配列フィールドの正規化
    if (template === 'enumeration' && !Array.isArray(repaired.items)) {
      repaired.items = typeof repaired.items === 'string' 
        ? [repaired.items] 
        : ['項目が設定されていません'];
    }
    
    // 文字数制限の自動調整
    this.enforceCharacterLimits(repaired, template);
    
    return repaired;
  }
  
  // 文字数制限自動調整
  private enforceCharacterLimits(data: any, template: TemplateType): void {
    const limits = this.getCharacterLimits(template);
    
    for (const [field, limit] of Object.entries(limits)) {
      const value = this.getFieldValue(data, field);
      if (typeof value === 'string' && value.length > limit) {
        this.setFieldValue(data, field, value.substring(0, limit));
      }
    }
  }
  
  // デフォルト値生成
  private getDefaultValue(field: string, template: TemplateType): any {
    const defaults: Record<string, any> = {
      title: 'コンテンツ',
      content: 'コンテンツを生成中です',
      description: 'コンテンツを生成中です',
      items: ['項目を生成中です'],
      sections: [{ title: 'セクション', content: '内容を生成中です' }],
      checklistItems: [{ text: 'チェック項目', description: '説明を生成中です', checked: false }],
      rankingData: [{ rank: 1, name: '項目', value: '値' }],
      graphData: { type: 'pie', data: [{ name: '項目', value: 100 }] }
    };
    
    return defaults[field] || '生成中';
  }
}
```

---

## 8. 統合ガイドライン

### 8.1 新API追加手順

#### 📝 Step-by-Step実装ガイド

##### Step 1: API仕様定義
```typescript
// 1. インターフェース定義
interface NewAPIInterface {
  endpoint?: string;              // REST APIの場合
  className?: string;             // クラスベースの場合  
  method: string;                 // メソッド名
  input: InputType;               // 入力型定義
  output: OutputType;             // 出力型定義
  errorHandling: ErrorStrategy;   // エラー戦略
}

// 2. 型定義
interface InputType {
  // 入力パラメータの定義
}

interface OutputType {
  // 出力データの定義  
}
```

##### Step 2: 実装クラス作成
```typescript
class NewAPIService {
  private model: any;
  
  constructor() {
    this.model = getGeminiModel();
  }
  
  async newAPIMethod(input: InputType): Promise<OutputType> {
    try {
      // プロンプト構築
      const prompt = this.buildPrompt(input);
      
      // AI呼び出し
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // レスポンス解析
      return this.parseResponse(text);
    } catch (error) {
      // エラーハンドリング
      return APIErrorHandler.handleAPIError(error, 'NewAPIService');
    }
  }
  
  private buildPrompt(input: InputType): string {
    // プロンプト構築ロジック
  }
  
  private parseResponse(text: string): OutputType {
    // レスポンス解析ロジック
  }
}
```

##### Step 3: 統合とテスト
```typescript
// 3. 既存システムへの統合
class ContentGeneratorService {
  private newAPIService: NewAPIService;
  
  constructor() {
    this.newAPIService = new NewAPIService();
  }
  
  async generateWithNewAPI(input: string): Promise<GeneratedContent> {
    // 新APIを組み込んだフロー
    const newResult = await this.newAPIService.newAPIMethod(input);
    // 既存フローとの統合
  }
}

// 4. テスト実装
describe('NewAPIService', () => {
  test('正常ケース', async () => {
    const service = new NewAPIService();
    const result = await service.newAPIMethod(testInput);
    expect(result).toBeDefined();
  });
  
  test('エラーケース', async () => {
    // エラーハンドリングのテスト
  });
});
```

### 8.2 テスト方法とモニタリング

#### 🧪 包括的テスト戦略

##### Unit Tests
```typescript
// API個別テスト
describe('PageStructureAnalyzer', () => {
  test('正常入力での構造分析', async () => {
    const analyzer = new PageStructureAnalyzer();
    const structures = await analyzer.analyzePageStructureAndTemplates(
      '面接対策の5つのステップ'
    );
    
    expect(structures).toHaveLength(1);
    expect(structures[0].template).toBe('enumeration');
    expect(structures[0].title).toContain('面接');
  });
  
  test('ジャンル指定での分析', async () => {
    const input = '【ジャンル】: knowhow\n面接対策について';
    const structures = await analyzer.analyzePageStructureAndTemplates(input);
    
    expect(structures[0].template).toMatch(/enumeration|simple5|checklist-enhanced/);
  });
});

// JSON解析テスト
describe('ResponseParser', () => {
  test('正常JSON解析', () => {
    const parser = new ResponseParser();
    const input = '```json\n{"title": "テスト"}\n```';
    const result = parser.parseAIResponse(input);
    
    expect(result.title).toBe('テスト');
  });
  
  test('不正JSON自動修復', () => {
    const input = '{"title": "テスト", "items": ["項目1",]}'; // 末尾カンマ
    const result = parser.parseAIResponse(input);
    
    expect(result.items).toEqual(['項目1']);
  });
});
```

##### Integration Tests
```typescript
// エンドツーエンドテスト
describe('Content Generation E2E', () => {
  test('完全フロー実行', async () => {
    const service = new ContentGeneratorService();
    const result = await service.generateHighQualityContent(
      '就活面接で成功するための具体的なアドバイス'
    );
    
    expect(result.pages).toHaveLength.greaterThan(0);
    expect(result.caption).toBeDefined();
    expect(result.hashtags.all).toHaveLength.greaterThan(0);
    
    // テンプレートデータの完整性確認
    for (const page of result.pages) {
      expect(page.templateData.title).toBeDefined();
      expect(page.templateType).toMatch(/enumeration|simple5|list|explanation2/);
    }
  });
});
```

##### Performance Tests
```typescript
// パフォーマンステスト
describe('API Performance', () => {
  test('レスポンス時間測定', async () => {
    const startTime = performance.now();
    
    const service = new ContentGeneratorService();
    await service.generateHighQualityContent('テスト入力');
    
    const duration = performance.now() - startTime;
    expect(duration).toBeLessThan(30000); // 30秒以内
  });
  
  test('大量データ処理', async () => {
    const largeInput = 'a'.repeat(5000); // 大容量入力
    const service = new ContentGeneratorService();
    
    expect(async () => {
      await service.generateHighQualityContent(largeInput);
    }).not.toThrow();
  });
});
```

#### 📊 リアルタイムモニタリング

##### APIメトリクス収集
```typescript
class APIMonitoring {
  private metrics: Map<string, any> = new Map();
  
  async trackAPICall<T>(
    apiName: string, 
    apiCall: () => Promise<T>
  ): Promise<T> {
    const startTime = performance.now();
    let success = false;
    let error: any = null;
    
    try {
      const result = await apiCall();
      success = true;
      return result;
    } catch (e) {
      error = e;
      throw e;
    } finally {
      const duration = performance.now() - startTime;
      this.recordMetrics(apiName, duration, success, error);
    }
  }
  
  private recordMetrics(apiName: string, duration: number, success: boolean, error: any): void {
    const metric = this.metrics.get(apiName) || {
      totalCalls: 0,
      successCount: 0,
      errorCount: 0,
      totalDuration: 0,
      averageDuration: 0,
      errors: []
    };
    
    metric.totalCalls++;
    metric.totalDuration += duration;
    metric.averageDuration = metric.totalDuration / metric.totalCalls;
    
    if (success) {
      metric.successCount++;
    } else {
      metric.errorCount++;
      metric.errors.push({
        timestamp: new Date(),
        error: error?.message || String(error),
        duration
      });
    }
    
    this.metrics.set(apiName, metric);
  }
  
  getMetrics(): Record<string, any> {
    return Object.fromEntries(this.metrics);
  }
}

// 使用例
const monitor = new APIMonitoring();

const trackedGeneration = await monitor.trackAPICall(
  'ContentGeneration',
  () => contentGenerator.generateHighQualityContent(input)
);
```

### 8.3 パフォーマンス最適化

#### ⚡ 最適化戦略

##### レスポンス時間改善
```typescript
class PerformanceOptimizer {
  // プロンプト最適化
  optimizePrompt(originalPrompt: string): string {
    return originalPrompt
      .replace(/\n\s*\n/g, '\n')      // 余分な改行除去
      .replace(/\s+/g, ' ')           // 余分なスペース除去
      .trim();                        // 前後空白除去
  }
  
  // 並列処理最適化
  async processInParallel<T>(
    tasks: Array<() => Promise<T>>,
    concurrency: number = 2
  ): Promise<T[]> {
    const results: T[] = [];
    
    for (let i = 0; i < tasks.length; i += concurrency) {
      const batch = tasks.slice(i, i + concurrency);
      const batchResults = await Promise.all(
        batch.map(task => task())
      );
      results.push(...batchResults);
    }
    
    return results;
  }
  
  // キャッシュシステム
  private cache = new Map<string, { data: any, timestamp: number }>();
  
  async getCachedResult<T>(
    key: string,
    generator: () => Promise<T>,
    ttl: number = 300000 // 5分
  ): Promise<T> {
    const cached = this.cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }
    
    const result = await generator();
    this.cache.set(key, { data: result, timestamp: Date.now() });
    
    return result;
  }
}
```

##### メモリ使用量最適化
```typescript
class MemoryOptimizer {
  // 大容量データの効率処理
  processLargeData<T>(
    data: T[],
    processor: (chunk: T[]) => void,
    chunkSize: number = 100
  ): void {
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      processor(chunk);
      
      // ガベージコレクションのヒント
      if (i % (chunkSize * 10) === 0) {
        // 大きなチャンクごとに一時停止
        setTimeout(() => {}, 0);
      }
    }
  }
  
  // WeakMapを使用したメモリリーク防止
  private weakCache = new WeakMap<object, any>();
  
  getWeakCached<T extends object, R>(
    obj: T,
    generator: () => R
  ): R {
    if (this.weakCache.has(obj)) {
      return this.weakCache.get(obj);
    }
    
    const result = generator();
    this.weakCache.set(obj, result);
    
    return result;
  }
}
```

---

## 📝 まとめ

### 🎯 API統合の核心価値

1. **5段階統合フロー**: フォーマッター → 構造分析 → 一括生成 → キャプション → ハッシュタグ
2. **100点ルール適用**: 完璧な構造適合と妥協なき品質
3. **堅牢性保証**: 多段階フォールバックと自動修復
4. **スケーラビリティ**: 新API追加とパフォーマンス最適化

### 🔧 実装時の重要ポイント

- **エラーハンドリング**: 分類別の適切な対処
- **JSON解析**: 4段階の堅牢な解析パイプライン  
- **プロンプト設計**: テンプレート固有の詳細指示
- **モニタリング**: リアルタイム品質・パフォーマンス監視

### 📊 継続的改善

このAPI統合仕様により、Instagram Post Generatorは安定した高品質コンテンツ生成を実現し、将来的な機能拡張にも柔軟に対応できるスケーラブルなアーキテクチャを構築しています。