import { PageStructure, GeneratedPage } from '../types/pageStructure'
import { TemplateType } from '../components/templates/TemplateTypes'
import { getGeminiModel } from './geminiClientSingleton'

export class StructureConstrainedGenerator {
  private model: any

  constructor() {
    this.model = getGeminiModel()
  }

  async generatePageWithConstraints(
    originalInput: string,
    pageStructure: PageStructure
  ): Promise<GeneratedPage> {
    
    const prompt = `
【元入力内容】
${originalInput}

【Instagram投稿向けコンテンツ有益性要求】
- 小学生レベルの常識は除外、ただし専門用語の羅列も禁止
- 「へぇ、知らなかった！」レベルの適度な専門性を重視
- 複雑な概念を簡潔で分かりやすい言葉で濃縮表現
- スマホ画面で瞬時に理解できる視覚的読みやすさ
- 具体的な数値・手法・期間を含めるが、難しすぎない表現で
- スクロール中に「おっ」と思わせる瞬間的価値

【Instagram特化の情報密度要求】
- 1文で核心を伝える簡潔性（ブログ的長文は禁止）
- 要点の凝縮（無駄な前置きや説明は完全削除）
- 3秒以内で要点把握できる瞬間的理解度
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

【${pageStructure.template}構造要件】
${this.getTemplateStructureRequirements(pageStructure.template)}

【出力形式】
有効なJSON形式で回答してください。文字列内に引用符が含まれる場合は必ずエスケープ（\"）してください。
{
  "title": "${pageStructure.title}",
  "templateType": "${pageStructure.template}",
  "content": {
    // テンプレート構造に適した有益性の高い内容
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
        jsonText = jsonText.replace(/:(\s*)"([^"]*)"([^"]*)"([^"]*)"(\s*[,}])/g, (match, p1, p2, p3, p4, p5) => {
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
          }
        };
      }
      
      console.log('✅ StructureConstrainedGenerator - パース済み:', parsed)
      
      return {
        title: parsed.title,
        templateType: parsed.templateType as TemplateType,
        content: parsed.content
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
          }
        };
      }
      
      throw new Error('構造制約生成に失敗しました')
    }
  }

  private getTemplateStructureRequirements(template: string): string {
    const requirements: Record<string, string> = {
      'table': `比較テーブル構造（必須）:
{
  "headers": ["列1見出し", "列2見出し", "列3見出し"],
  "rows": [
    ["行1データ1", "行1データ2", "行1データ3"],
    ["行2データ1", "行2データ2", "行2データ3"],
    ["行3データ1", "行3データ2", "行3データ3"]
  ]
}
※headers配列とrows配列は必須。最低3行以上のデータを含む。`,
      'simple5': 'ステップ形式 - 3-5個のアクション項目。step + title + descriptionの配列',
      'section-items': '1セクション + 3-7個のアクション項目。sections配列（title + content + items）',
      'two-column-section-items': '2つのセクション + 各々に項目。sections配列（2個、各々title + content + items）',
      'checklist-enhanced': '詳細チェックリスト - 各項目に説明付き。checklistItems配列（text + description）',
      'item-n-title-content': `独立コンセプトボックス構造（必須）:
{
  "items": [
    {"title": "タイトル1", "content": "説明1"},
    {"title": "タイトル2", "content": "説明2"},
    {"title": "タイトル3", "content": "説明3"}
  ]
}
※items配列は必須。最低3個以上のtitle+contentオブジェクトを含む。`
    }
    return requirements[template] || 'テンプレート構造に適合する内容を生成してください'
  }
}