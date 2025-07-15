
# HANDOVER: テンプレート駆動生成システム実装計画書 v2.0

## 🎯 実装目標

現在の「コンテンツ生成→テンプレート選択」フローを「ページ構造事前決定→構造制約生成」フローに改善し、優秀テンプレートの自然な選択と高品質コンテンツ生成を実現する。

## 📋 現状分析

### 現在の問題
- 補完的テンプレート（explanation2, simple3, simple6等）が選択されがち
- タイトル生成の不安定性（`概要：有益性`構造の不一致）
- INDEXページの精度不足
- 優秀テンプレート使用率の低さ

### 優秀テンプレート（優先すべき）
1. **表型（table）** - 比較データ構造
2. **シンプル５（simple5）** - ステップ/チェックリスト構造  
3. **セクション+アイテム型（section-items）** - セクション+アクション項目構造
4. **２カラムセクション+アイテム型（two-column-section-items）** - 複数セクション+項目構造
5. **チェックリスト詳細型（checklist-enhanced）** - 詳細チェック項目構造
6. **独立ボックス型（item-n-title-content）** - 独立概念ボックス構造

## 🔧 実装要求：2段階フロー

### 1段階目: ページ構造 + テンプレート事前決定

```typescript
// app/services/pageStructureAnalyzer.ts
export interface PageStructure {
  概要: string          // ページの概要的テーマ
  有益性: string        // そのページの読者メリット
  template: PremiumTemplateType
  title: string         // "概要：有益性" 形式
  theme: string         // 生成時の詳細テーマ
}

export class PageStructureAnalyzer {
  async analyzePageStructureAndTemplates(input: string): Promise<PageStructure[]> {
    const prompt = `
以下の入力内容を分析し、最適なページ構造を決定してください。

【重要制約】
- 入力内容の情報のみ使用（推測・憶測・外部情報禁止）
- 8-10ページ程度の適切な分量
- 優秀テンプレート優先選択
- タイトル形式: "概要：有益性"

【入力内容】
${input}

【優秀テンプレート優先順位】
1. table（比較要素がある場合）
2. simple5（ステップ・手順・チェックリスト）
3. section-items（セクション+アクション項目）
4. two-column-section-items（複数セクション+項目）
5. checklist-enhanced（詳細チェック項目）
6. item-n-title-content（独立概念説明）

【出力形式JSON】
[
  {
    "概要": "面接準備",
    "有益性": "当日までのチェックリスト",
    "template": "checklist-enhanced",
    "title": "面接準備：当日までのチェックリスト",
    "theme": "面接当日までに準備すべき具体的項目"
  }
]
`
  }
}
```

### 2段階目: 元入力使用 + 構造制約生成 + 有益性最大化

```typescript
// app/services/structureConstrainedGenerator.ts
export class StructureConstrainedGenerator {
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
{
  "title": "${pageStructure.title}",
  "templateType": "${pageStructure.template}",
  "content": {
    // テンプレート構造に適した有益性の高い内容
  }
}
`
  }

  private getTemplateStructureRequirements(template: string): string {
    const requirements = {
      'table': '比較データ形式 - headers配列 + rows配列',
      'simple5': 'ステップ形式 - 3-5個のアクション項目',
      'section-items': '1セクション + 3-7個のアクション項目',
      'checklist-enhanced': '詳細チェックリスト - 各項目に説明付き',
      // ... 他のテンプレート要件
    }
    return requirements[template] || ''
  }
}
```

## 📁 具体的な実装ファイル

### 新規作成
- `app/services/pageStructureAnalyzer.ts`
- `app/services/structureConstrainedGenerator.ts`
- `app/types/pageStructure.ts`

### 既存修正
```typescript
// app/services/contentGeneratorService.ts
export class ContentGeneratorService {
  async generateHighQualityContent(input: string): Promise<GeneratedContent> {
    // 1段階目: ページ構造決定
    const pageStructures = await PageStructureAnalyzer.analyzePageStructureAndTemplates(input)
    
    // 2段階目: 各ページ生成
    const pages: GeneratedPage[] = []
    for (const [index, structure] of pageStructures.entries()) {
      const page = await StructureConstrainedGenerator.generatePageWithConstraints(input, structure)
      page.pageNumber = index + 1
      pages.push(page)
    }
    
    // ハッシュタグ生成（現状維持）
    const hashtags = await this.generateHashtags(input)
    
    // キャプション生成（改善: 実際の生成内容を反映）
    const caption = await this.generateCaptionWithFormat(input, pages)
    
    return {
      pages,
      totalPages: pages.length,
      hashtags,
      caption,
      summary: input
    }
  }

  // 新規: フォーマット統一キャプション生成
  async generateCaptionWithFormat(
    originalInput: string,
    generatedPages: GeneratedPage[]
  ): Promise<string> {
    
    const prompt = `
【元入力】${originalInput}
【実際の生成ページ】
${generatedPages.map(p => `${p.content.title}: ${p.content.description || ''}`).join('\n')}

【キャプション固定フォーマット】
タイトル

概要

✅ページタイトル
ページの簡潔な概要と補足説明

✅ページタイトル
簡潔な概要と補足説明

...

まとめ的な内容（「まとめ」という単語は使用禁止）

【要求】
- 実際に生成されたページ内容を正確に踏襲
- 上記フォーマットを厳密に遵守
- 各ページの価値を簡潔に表現
- Instagram投稿らしい親しみやすさ
- ハッシュタグは含めない（別セクション）
`
    
    const result = await this.model.generateContent(prompt)
    return result.response.text().trim()
  }
}
```

## 🎯 期待される改善結果

### 1. 優秀テンプレート使用率向上
- **現状**: 30-40% → **目標**: 80%以上
- table, simple5, section-items等が自然に選択される

### 2. タイトル生成精度向上
- **概要：有益性** 形式の安定化
- タイトル欠損の解消

### 3. INDEXページ精度向上
- 構造化されたページテーマ → 整理されたINDEX
- 各ページの役割明確化

### 4. ハルシネーション完全防止
- 元入力明示 → 推測・憶測・外部情報なし
- 入力内容の忠実な構造化のみ

### 5. Instagram特化コンテンツ品質向上
- **常識的内容の除外** + **専門用語羅列の回避** → 適度な専門性
- **瞬間的理解度向上** → 3秒で要点把握できる簡潔性
- **スマホ最適化** → 視覚的読みやすさと瞬間的インパクト
- **絶妙なバランス** → 難しすぎず簡単すぎない表現レベル

### 6. Instagram投稿としての読者体験向上
- 「へぇ、知らなかった！」レベルの発見
- スクロール中に「おっ」と止まらせる価値
- 複雑な概念の分かりやすい濃縮表現
- STAR法→「説得力3倍アップ」等の親しみやすい専門性

### 7. キャプション品質向上
- **フォーマット統一**: 固定構造による一定の見た目
- **内容整合性**: 実際の生成ページ内容を正確に反映
- **視覚的読みやすさ**: ✅マークによる構造化
- **ハッシュタグ分離**: キャプションとハッシュタグの明確な分離

## 🚀 実装手順

### Step 1: PageStructureAnalyzer実装
- 入力分析ロジック
- 優秀テンプレート優先判定
- ページ構造JSON生成

### Step 2: StructureConstrainedGenerator実装  
- テンプレート構造要件定義
- 制約付きコンテンツ生成
- ハルシネーション防止プロンプト

### Step 3: キャプション生成改善
- フォーマット統一システム実装
- 実際の生成内容との整合性確保
- ハッシュタグ生成は現状維持

### Step 4: ContentGeneratorService統合
- 2段階フロー実装
- 既存システムとの整合性確保

### Step 5: 品質検証
- 優秀テンプレート使用率測定
- タイトル生成精度確認
- ハルシネーション発生率チェック

## 🔍 成功指標

- [ ] 優秀テンプレート使用率 80%以上
- [ ] タイトル生成精度 95%以上（概要：有益性形式）
- [ ] ハルシネーション発生率 0%
- [ ] コンテンツ量適正性 100%（レイアウト適合）
- [ ] INDEXページ品質向上
- [ ] **Instagram特化コンテンツ品質向上**
  - 常識的内容の除外率 100%
  - 専門用語羅列の回避率 100%
  - 適度な専門性（難しすぎず簡単すぎない）達成率 90%以上
  - 瞬間理解度 90%以上（3秒以内で要点把握）
- [ ] **Instagram投稿体験向上**
  - 「へぇ、知らなかった！」要素の含有率 90%以上
  - スクロール停止価値（「おっ」と思わせる）達成率 85%以上
  - 視覚的読みやすさ（スマホ画面最適化）100%
- [ ] **キャプション品質向上**
  - フォーマット統一率 100%（固定構造遵守）
  - 生成内容との整合性 95%以上
  - ✅マークによる視覚的構造化の実現

## ⚠️ 重要な注意点

1. **コンテンツ量維持**: 現状の8-10ページ、適切な情報密度を保持
2. **レイアウト適合**: テンプレートからはみ出さない
3. **ハルシネーション厳禁**: 元入力以外の情報は一切使用しない
4. **構造制約遵守**: 事前決定したテンプレート構造に確実に適合
5. **Instagram特化表現**: 専門用語羅列は禁止、適度な専門性で親しみやすく
6. **瞬間的価値**: 3秒で理解、スクロール中に「おっ」と思わせる簡潔性
7. **キャプションフォーマット厳守**: 固定構造を完全遵守、実際の生成内容を反映
8. **ハッシュタグ生成維持**: 現状のロジックを変更せず維持

---

## 🎉 最終成果

**「コンテンツに合わせてテンプレートを選ぶ」から「最適な構造を事前決定してInstagram特化コンテンツを生成する」**

これにより、優秀なテンプレートが自然に選択され、Instagram投稿に最適化された高品質で瞬間的価値のあるコンテンツが構造的に保証される。

### 🎯 Instagram投稿としての最終品質
- スマホ画面での瞬間的理解
- 「へぇ、知らなかった！」レベルの適度な専門性
- スクロール中に止まらせる価値ある情報
- 難しすぎず簡単すぎない絶妙なバランス

---
*作成日: 2025-01-13*
*バージョン: v2.0*
*実装担当: 次世代Claude Code*
*ステータス: 完全実装計画書 - 実行準備完了*