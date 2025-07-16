import { PageStructure, GeneratedPage } from '../types/pageStructure'
import { TemplateType } from '../components/templates/TemplateTypes'
import { getGeminiModel } from './geminiClientSingleton'
import { TemplateStructureDefinitions } from './templateStructureDefinitions'

export class StructureConstrainedGenerator {
  private model: any

  constructor() {
    this.model = getGeminiModel()
  }

  async generateAllPagesWithConstraints(
    originalInput: string,
    pageStructures: PageStructure[]
  ): Promise<GeneratedPage[]> {
    
    // 各テンプレートの詳細構造要件を動的に生成
    const templateStructureInstructions = pageStructures.map((ps, i) => {
      const structurePrompt = TemplateStructureDefinitions.generateStructurePrompt(ps.template)
      return `
========================================
ページ${i + 1}: ${ps.title}
テンプレート: ${ps.template}
テーマ: ${ps.theme}

${structurePrompt}
========================================`
    }).join('\n')

    const prompt = `
以下の入力内容と決定済みページ構造に基づいて、全ページのコンテンツを一括生成してください。

【元入力内容】
${originalInput}

【決定済みページ構造 + 完全なテンプレート構造要件】
${templateStructureInstructions}

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
`

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      console.log('🎯 StructureConstrainedGenerator - 一括生成レスポンス:', text)
      
      // 🔧 一括生成でも同じ堅牢なJSON解析処理を使用
      const parsed = this.parseGeneratedJSON(text)
      
      // pageNumberを正しく設定（スプレッド演算子による文字列分解を回避）
      const pagesWithPageNumbers = parsed.pages.map((page: any, index: number) => {
        page.pageNumber = index + 1
        return page
      })
      
      return pagesWithPageNumbers as GeneratedPage[]
    } catch (error: any) {
      console.error('一括生成エラー:', error)
      
      // フォールバック: 個別生成
      console.log('🔄 個別生成にフォールバック')
      const pages: GeneratedPage[] = []
      for (const [index, structure] of pageStructures.entries()) {
        const page = await this.generatePageWithConstraints(originalInput, structure)
        // pageNumberを正しく設定
        page.pageNumber = index + 1
        pages.push(page)
      }
      return pages
    }
  }

  async generatePageWithConstraints(
    originalInput: string,
    pageStructure: PageStructure
  ): Promise<GeneratedPage> {
    
    // 指定されたテンプレートの詳細構造要件を取得
    const structurePrompt = TemplateStructureDefinitions.generateStructurePrompt(pageStructure.template)
    
    const prompt = `
【元入力内容】
${originalInput}

【ページ情報】
タイトル: ${pageStructure.title}
テンプレート: ${pageStructure.template}
テーマ: ${pageStructure.theme}

${structurePrompt}

【Instagram投稿向けコンテンツ有益性要求】
- 小学生レベルの常識は除外、ただし専門用語の羅列も禁止
- 「へぇ、知らなかった！」レベルの適度な専門性を重視
- 複雑な概念を簡潔で分かりやすい言葉で濃縮表現
- スマホ画面で瞬時に理解できる視覚的読みやすさ
- 具体的な数値・手法・期間を含めるが、難しすぎない表現で
- スクロール中に「おっ」と思わせる瞬間的価値

【Instagram特化の情報密度要求】
- 1文から2文で核心を伝える簡潔性（ブログ的長文は禁止）
- checklist項目は1行20文字前後、全体で4-5項目に制限
- 読者が実際に行動できる具体的な手順や方法を含める
- テンプレート構造に応じた適切な情報量で充実させる
- 専門知識を分かりやすく噛み砕いた表現

【Instagram適切レベルの抽出基準例】
❌ 簡単すぎる: "面接では清潔感が大切"
❌ 難しすぎる: "非言語的コミュニケーションにおけるメラビアンの法則により..."
✅ Instagram適切: "面接官は最初の7秒で印象の70%を決める"

❌ 簡単すぎる: "履歴書は丁寧に書く"
❌ 難しすぎる: "行動結果記述法における構造化面接技法として..."
✅ Instagram適切: "STAR法で話すと説得力が3倍アップ"

【ページ指定】
- テーマ: ${pageStructure.theme}
- タイトル: ${pageStructure.title}
- 必須テンプレート: ${pageStructure.template}

【絶対制約】
- 元入力の内容のみ使用（推測・憶測・仮説・外部情報は完全禁止）
- ${pageStructure.theme}に関連する「学習価値の高い部分」のみ抽出
- ${pageStructure.template}テンプレート構造に適合
- コンテンツ量は現状維持（レイアウトをはみ出さない）

【${pageStructure.template}完全構造要件】
${TemplateStructureDefinitions.generateStructurePrompt(pageStructure.template)}

【📝 厳密な出力形式指示】
🚨 重要：${pageStructure.template}テンプレートの必須フィールドを完全に守ってください。

${this.getTemplateSpecificInstructions(pageStructure.template)}

有効なJSON形式で回答してください。文字列内に引用符が含まれる場合は必ずエスケープ（\"）してください。
{
  "title": "${pageStructure.title}",
  "templateType": "${pageStructure.template}",
  "content": {
    // 上記の${pageStructure.template}テンプレート専用構造に100%適合した内容
    // 必須フィールドを絶対に漏らさない
    // 注意: 文字列内の引用符は \"これは\\\"引用\\\"です\" のようにエスケープ
  }
}
`

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      console.log('🎯 StructureConstrainedGenerator - 生のレスポンス:', text)
      
      // JSON部分を抽出（複数の方法を試す）
      let jsonText = text;
      
      // 方法1: コードブロックを除去
      jsonText = jsonText.replace(/```json\n?|```\n?/g, '').trim();
      
      // 方法2: 最初の{から最後の}までを抽出
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      }
      
      // 方法3: 不正な文字を除去
      jsonText = jsonText
        .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // 制御文字を除去
        .replace(/,\s*}}/g, '}}') // 末尾のカンマを除去
        .replace(/,\s*]/g, ']'); // 配列末尾のカンマを除去
      
      // 方法4: AIの応答でよくある問題を修正
      // "文字列は"これ"です" のようなパターンを修正
      try {
        // 一旦パースを試みる
        JSON.parse(jsonText);
      } catch (e) {
        // パースエラーの場合、問題のある引用符をエスケープ
        // 値の中の引用符をエスケープ（キーと値の区切りは除外）
        jsonText = jsonText.replace(/:(\s*)"([^"]*)"([^"]*)"([^"]*)"(\s*[,}])/g, (_match: string, p1: string, p2: string, p3: string, p4: string, p5: string) => {
          // : "値は"これ"です", → : "値は\"これ\"です",
          return `:${p1}"${p2}\\"${p3}\\"${p4}"${p5}`;
        });
        
        // スマートクォートを通常の引用符に変換
        jsonText = jsonText
          .replace(/"/g, '"')  // 左ダブルクォート
          .replace(/"/g, '"')  // 右ダブルクォート
          .replace(/'/g, "'")  // 左シングルクォート
          .replace(/'/g, "'"); // 右シングルクォート
      }
      
      console.log('🔧 クリーンアップ後のJSON:', jsonText)
      
      let parsed;
      try {
        parsed = JSON.parse(jsonText);
      } catch (parseError) {
        console.error('JSON解析エラー:', parseError);
        console.error('問題のあるJSON:', jsonText);
        
        // フォールバック: 基本的な構造を返す
        return {
          title: pageStructure.title || 'タイトル',
          templateType: pageStructure.template as TemplateType,
          content: {
            title: pageStructure.title || 'タイトル',
            description: '内容を生成中にエラーが発生しました。',
            items: []
          },
          pageNumber: 1 // デフォルト値、呼び出し元で正しく設定される
        };
      }
      
      console.log('✅ StructureConstrainedGenerator - パース済み:', parsed)
      
      return {
        title: parsed.title,
        templateType: parsed.templateType as TemplateType,
        content: parsed.content,
        pageNumber: 1 // デフォルト値、呼び出し元で正しく設定される
      }
    } catch (error: any) {
      console.error('StructureConstrainedGenerator error:', error)
      
      // API制限エラーの場合
      if (error?.message?.includes('quota') || error?.message?.includes('429')) {
        throw new Error('Gemini APIの無料プラン制限に達しました。明日再度お試しください。')
      }
      
      // JSONパースエラーの場合
      if (error instanceof SyntaxError) {
        console.error('JSON解析エラーが発生しました。AIからの応答が不正な形式です。')
        
        // フォールバック: 基本的な構造を返す
        return {
          title: pageStructure.title || 'タイトル',
          templateType: pageStructure.template as TemplateType,
          content: {
            title: pageStructure.title || 'タイトル',
            description: 'コンテンツ生成中にエラーが発生しました。',
            items: []
          },
          pageNumber: 1 // デフォルト値、呼び出し元で正しく設定される
        };
      }
      
      throw new Error('構造制約生成に失敗しました')
    }
  }

  /**
   * テンプレート固有の詳細指示を生成
   */
  private getTemplateSpecificInstructions(templateType: string): string {
    switch (templateType) {
      case 'item-n-title-content':
        return `
🎯 item-n-title-content専用指示：
✅ 必須："items"配列（2-6個のオブジェクト）
✅ 各itemオブジェクト：{"title": "項目名", "content": "詳細内容"}
❌ 禁止：content単体、item_n、content2/content3/content4形式
❌ 禁止：items配列を文字列配列にする

正しい例：
"items": [
  {"title": "ポイント1", "content": "詳細説明1"},
  {"title": "ポイント2", "content": "詳細説明2"}
]`

      case 'section-items':
        return `
🎯 section-items専用指示：
✅ 必須："sections"配列（通常1個のオブジェクト）
✅ sectionsオブジェクト：{"title": "セクション名", "content": "説明", "items": ["項目1", "項目2"]}
❌ 禁止：items直接配列、introduction、sectionsなしの構造

正しい例：
"sections": [{
  "title": "重要ポイント",
  "content": "以下の項目が重要です",
  "items": ["項目1", "項目2", "項目3"]
}]`

      case 'two-column-section-items':
        return `
🎯 two-column-section-items専用指示：
✅ 必須："sections"配列（必ず2個のオブジェクト）
✅ 各sectionsオブジェクト：{"title": "セクション名", "content": "説明", "items": ["項目1", "項目2"]}
❌ 禁止：column1/column2、left_column/right_column、sectionsが2個以外

正しい例：
"sections": [
  {"title": "左側タイトル", "content": "左側説明", "items": ["左項目1", "左項目2"]},
  {"title": "右側タイトル", "content": "右側説明", "items": ["右項目1", "右項目2"]}
]`

      case 'checklist-enhanced':
        return `
🎯 checklist-enhanced専用指示：
✅ 必須："checklistItems"配列（3-8個のオブジェクト）
✅ 各checklistItemオブジェクト：{"text": "項目名", "description": "詳細", "checked": false}
❌ 禁止：checklist、items、checklistItemsなしの構造

正しい例：
"checklistItems": [
  {"text": "項目1", "description": "詳細説明1", "checked": false},
  {"text": "項目2", "description": "詳細説明2", "checked": false}
]`

      case 'simple5':
        return `
🎯 simple5専用指示：
✅ 必須："steps"配列（3-6個のオブジェクト）
✅ 各stepオブジェクト：{"step": 数値, "title": "ステップ名", "description": "説明"}
❌ 禁止：items、text1/text2/text3形式、stepなしの構造

正しい例：
"steps": [
  {"step": 1, "title": "ステップ1", "description": "説明1"},
  {"step": 2, "title": "ステップ2", "description": "説明2"}
]`

      case 'list':
        return `
🎯 list専用指示：
✅ 必須："items"配列（3-8個の文字列）
❌ 禁止：itemsをオブジェクト配列にする、checklistItemsとの混同

正しい例：
"items": ["項目1", "項目2", "項目3", "項目4"]`

      case 'table':
        return `
🎯 table専用指示：
✅ 必須："tableData"オブジェクト（headers配列、rows配列）
✅ tableData構造：{"headers": ["列1", "列2"], "rows": [["データ1", "データ2"]]}
❌ 禁止：table、tableDataなしの構造

正しい例：
"tableData": {
  "headers": ["項目", "内容"],
  "rows": [["データ1", "内容1"], ["データ2", "内容2"]]
}`

      case 'title-description-only':
        return `
🎯 title-description-only専用指示：
✅ 必須："description"フィールド（100-300文字）
❌ 禁止：items、sections、tableDataなど他の配列/オブジェクト

正しい例：
"description": "詳細な説明文が100文字以上300文字以内で記載されます..."`

      case 'ranking':
        return `
🎯 ranking専用指示：
✅ 必須："rankingData"配列（3-5個のオブジェクト）
✅ 各rankingDataオブジェクト：{"rank": 数値, "name": "項目名", "value": "数値・単位", "description": "詳細（オプション）"}
✅ 必須："content"フィールドに出典情報（【出典】: 組織名 調査年年調査）
❌ 禁止：items、sections、rankingDataなしの構造

正しい例：
"rankingData": [
  {"rank": 1, "name": "外資系IT企業", "value": "850万円", "description": "グローバル展開企業の高水準"},
  {"rank": 2, "name": "メガベンチャー", "value": "720万円", "description": "急成長企業の競争力"}
]`

      case 'graph':
        return `
🎯 graph専用指示：
✅ 必須："graphData"オブジェクト（type、data必須）
✅ graphData.type："pie" または "bar"
✅ graphData.data：[{"name": "項目名", "value": 数値, "color": "#カラーコード（オプション）"}]
✅ 棒グラフの場合：categories、series配列も必要
✅ 必須："content"フィールドに出典情報（【出典】: 組織名 調査年年調査）
❌ 禁止：items、sections、graphDataなしの構造

正しい例：
"graphData": {
  "type": "pie",
  "data": [
    {"name": "700万円以上", "value": 35, "color": "#3B82F6"},
    {"name": "500-700万円", "value": 40, "color": "#10B981"}
  ],
  "source": {"organization": "厚生労働省", "year": "2024"}
}`

      default:
        return `テンプレート「${templateType}」の専用指示が定義されていません。基本構造に従ってください。`
    }
  }

  // 動的テンプレート構造定義システムに移行済み
  // getTemplateStructureRequirements は TemplateStructureDefinitions.generateStructurePrompt に置き換え

  /**
   * 堅牢なJSON解析処理（一括生成と個別生成で共通使用）
   */
  private parseGeneratedJSON(text: string): any {
    // JSON部分を抽出（複数の方法を試す）
    let jsonText = text;
    
    // 方法1: コードブロックを除去
    jsonText = jsonText.replace(/```json\n?|```\n?/g, '').trim();
    
    // 方法2: 最初の{から最後の}までを抽出
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }
    
    // 方法3: 不正な文字を除去
    jsonText = jsonText
      .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // 制御文字を除去
      .replace(/,\s*}}/g, '}}') // 末尾のカンマを除去
      .replace(/,\s*]/g, ']'); // 配列末尾のカンマを除去
    
    // 方法4: AIの応答でよくある問題を修正
    // "文字列は"これ"です" のようなパターンを修正
    try {
      // 一旦パースを試みる
      JSON.parse(jsonText);
    } catch (e) {
      // パースエラーの場合、問題のある引用符をエスケープ
      // 値の中の引用符をエスケープ（キーと値の区切りは除外）
      jsonText = jsonText.replace(/:(\s*)"([^"]*)"([^"]*)"([^"]*)"(\s*[,}])/g, (_match: string, p1: string, p2: string, p3: string, p4: string, p5: string) => {
        // : "値は"これ"です", → : "値は\"これ\"です",
        return `:${p1}"${p2}\\"${p3}\\"${p4}"${p5}`;
      });
      
      // スマートクォートを通常の引用符に変換
      jsonText = jsonText
        .replace(/"/g, '"')  // 左ダブルクォート
        .replace(/"/g, '"')  // 右ダブルクォート
        .replace(/'/g, "'")  // 左シングルクォート
        .replace(/'/g, "'"); // 右シングルクォート
    }
    
    console.log('🔧 クリーンアップ後のJSON:', jsonText)
    
    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON解析エラー:', parseError);
      console.error('問題のあるJSON:', jsonText);
      throw new Error(`JSON解析に失敗しました: ${parseError.message}`);
    }
    
    return parsed;
  }
}