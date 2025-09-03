# Type003 TEN マスタープロンプト

**目的**: 生産性ランキングJSONからType003投稿を生成するための完全情報  
**対象**: Claude Code（セッション変更対応）  
**基準**: K901同等品質・TEN特化評価軸  
**参考ファイル**: /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K805.json  
**テンプレート更新**: 2025-09-01 キーメトリクス実用化対応済み（V2.1）

---

## 🎯 基本情報

### 保存先自動決定システム
```
TEN（生産性系）保存先ルール:
- K60x番台を使用（K601, K602, K603...）
- 既存ファイル確認→次の空き番号自動割り当て
- 例: TEN001 → K601, TEN002 → K602, TEN003 → K603

自動ファイル名生成:
1. /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/配下確認
2. K60x番台の最大番号取得
3. +1して新しいファイル名決定
4. 重複回避チェック
```

### type-target-persona-relations.json更新手順
```
【重要】K番号とP番号の紐付け登録
1. ファイルパス: /mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/type-target-persona-relations.json
2. T018（Type003のTENターゲット）にP番号追加
3. personaToKnowledgeセクションにP番号とK番号のマッピング追加
4. メタデータ更新（updateDate、analysisData）

例:
- T018に追加: "T018": ["P601", "P602", ...]
- マッピング追加: "P601": ["K601"], "P602": ["K602"], ...
- メタデータ: updateDate更新、analysisDataに追加内容記載
```

### AIツールロゴパス一覧
```
✅ 使用可能なAIツールロゴ（43個取得済み）:

## A-C
/public/imag/ai_logo/amazon-q.png                      # Amazon Q Developer ✅
/public/imag/ai_logo/assembly.png                      # AssemblyAI ✅
/public/imag/ai_logo/calendly.png                      # Calendly AI ✅
/public/imag/ai_logo/canva_1280x1280_original.png     # Canva ✅
/public/imag/ai_logo/character.ai.png                  # Character.AI ✅
/public/imag/ai_logo/chatgpt_1000x1000_original.png   # ChatGPT ✅
/public/imag/ai_logo/claude-ai-icon.png               # Claude ✅
/public/imag/ai_logo/claude_code.png                   # Claude Code ✅
/public/imag/ai_logo/cdnlogo.com_codeium.png          # Codeium ✅
/public/imag/ai_logo/copilot.png                      # Microsoft Copilot ✅
/public/imag/ai_logo/copy_ai.png                      # Copy.ai ✅
/public/imag/ai_logo/crewai.svg                       # CrewAI ✅

## D-G
/public/imag/ai_logo/DALL-E.png                       # DALL-E ✅
/public/imag/ai_logo/Deepgram.jpeg                    # Deepgram ✅
/public/imag/ai_logo/elevenlabs_1280x1280_original.png # ElevenLabs ✅
/public/imag/ai_logo/firefly.png                      # Adobe Firefly ✅
/public/imag/ai_logo/fish_audio.png                   # Fish Audio ✅
/public/imag/ai_logo/gamma_1280x1280_original.png     # Gamma ✅
/public/imag/ai_logo/Google-Gemini-1.png              # Gemini ✅
/public/imag/ai_logo/gemini_1280x1280_original.png    # Gemini (alt) ✅
/public/imag/ai_logo/genspark.png                     # Genspark ✅
/public/imag/ai_logo/github_copilot.png               # GitHub Copilot ✅
/public/imag/ai_logo/grammarly_1280x1280_original.png # Grammarly ✅

## J-N
/public/imag/ai_logo/jasper.png                       # Jasper AI ✅
/public/imag/ai_logo/looka_1280x1280_original.png     # Looka ✅
/public/imag/ai_logo/loom.png                         # Loom AI ✅
/public/imag/ai_logo/manus_1280x1280_original.png     # Manus ✅
/public/imag/ai_logo/midjourney_1280x1280_original.png # Midjourney ✅
/public/imag/ai_logo/murf.png                         # Murf ✅
/public/imag/ai_logo/mymind.png                       # MyMind ✅
/public/imag/ai_logo/namelix.png                      # Namelix ✅
/public/imag/ai_logo/NotebookLM_logo.png              # NotebookLM ✅
/public/imag/ai_logo/Notion_logo.png                  # Notion AI ✅

## O-S
/public/imag/ai_logo/otter_ai.png                     # Otter.ai ✅
/public/imag/ai_logo/perplexity_1280x308_original.png # Perplexity ✅
/public/imag/ai_logo/remove.bg.png                    # Remove.bg ✅
/public/imag/ai_logo/Sourcegraph_Cody.png             # Sourcegraph Cody ✅
/public/imag/ai_logo/speechify.svg                    # Speechify ✅
/public/imag/ai_logo/Stable                           # Stable Diffusion ✅
/public/imag/ai_logo/synthesia_1280x1280_original.png # Synthesia ✅

## T-Z
/public/imag/ai_logo/tabnine.png                      # Tabnine ✅
/public/imag/ai_logo/tldv.png                         # tl;dv ✅
/public/imag/ai_logo/writesonic.png                   # Writesonic ✅
/public/imag/ai_logo/Zapier.png                       # Zapier AI ✅

⚠️ 未取得ツール（テキストのみ表示）:
- Upscale.media, Rev AI, LogoAI, Designs.ai, Bing AI
- Framer AI, Brandmark, Mapify, Steve.AI, FlexClip, Sonix
- Pictory, Lumen5, Motion, Runway Gen-3, n8n, You.com
- Trint, Obsidian, Beautiful.AI, Veo 3
- その他未収集ツール（約22個）

注意: 未取得ツールはプレースホルダーアイコンまたはテキスト表示推奨
```

---

## 📋 Type003 JSON構造（TEN版）

### 1. 基本構造
```json
{
  "source": "contents-ranking-productivity-601",
  "problemCategory": "生産性向上・効率化",
  "knowledgeId": "K601",
  "postType": "003",
  "pageCount": 8,
  "pageStructurePattern": "unified-template-12-productivity-tool",
  "targetIds": ["T004"],
  "detailedContent": {
    "page1": {...},
    "page2": {...},
    "page3": {...},
    "page4": {...},
    "page5": {...},
    "page6": {...},
    "page7": {...},
    "page8": {...}
  }
}
```

---

## 📝 各ページ詳細フォーマット

### Page1: 導入・問題提起（ten_introテンプレート）

#### ten_intro構成ルール
1. **problems**: 読者視点の悩み（自然な口調・キャラクター性なし）
2. **introMessage**: 三角下の紹介メッセージ（「「XX」を紹介！」形式のみ・「今回は」禁止）  
3. **solution**: 悩み反復 + 改行 + 選定根拠での紹介

#### problems選定ルール
**基本原則**: ランキングで紹介するツール・内容に対応する悩みを設定

##### パターン1: カテゴリ特化型ランキング
- **ランキング内容**: 同一カテゴリのツール群（例：タスク管理ツール、経理ツール）
- **problems構成**: 各ツールが解決する具体的悩み
- **例**: フリーランス必須ツール
  ```json
  "problems": [
    "安心できるお仕事サイトを探してる",      // → ランサーズ・ココナラ
    "税金や経費の管理が苦手",              // → マネーフォワード  
    "開業届けってどう出せばいいの？"        // → freee開業
  ]
  ```

##### パターン2: カテゴリ横断型ランキング
- **ランキング内容**: 異なるカテゴリのツール群（例：AI文章・音声・画像ツール）
- **problems構成**: 選択肢過多 + 機能認知不足 + 用途不明
- **例**: AIツール厳選ランキング
  ```json
  "problems": [
    "生産性を上げたいけど結局どれ使ったらいいかわからない", // 目的達成手段不明
    "AIツール多すぎて結局何がいいのかわからない",        // 選択肢過多
    "チャット系AIツール以外に使えるものってあるの？"      // 機能多様性認知不足
  ]
  ```

#### solution固定テンプレート
```
私なりに「【ランキング根拠】」で選んだ生産性爆上げの「【ランキングジャンル】」を紹介いたす！
```

**変数部分**：
- **ランキング根拠**: 実際のランキング基準に応じてTEN評価項目変換対応表から選択
- **ランキングジャンル**: ジャンル変換対応表から選択

#### TEN評価項目変換対応表
| システム内項目 | わかりやすい表現 |
|--------------|--------------|
| 即効性 | すぐ使える |
| 簡単さ | 簡単さ |
| 人気度 | 人気度 |
| コスパ | コスパ |
| 機能専門性 | できることの多さ |
| 生産性UP度 | 生産性UP期待度 |

#### ジャンル変換対応表
| システム内ジャンル | わかりやすい表現 |
|-----------------|--------------|
| AIツール | AIツール |
| 生産性ソフト | 爆上げツール |
| 資格・スキル | 資格・スキル |
| ガジェット | ガジェット |
| 習慣・ルーティーン | 習慣・ルーティーン |
| 書籍 | 書籍 |

---

## 🔄 V2.1 キーメトリクス実用化アップデート（2025-09-01）

### **重要変更: 実用的なキーメトリクス情報へ変更**

#### **変更理由**
- 従来: 「利用者数」「対応環境」「セットアップ」→ 読者の選択判断に寄与しない
- V2.1: **事実ベースで読者の導入判断に直結する実用情報**に変更

#### **新キーメトリクス構造**
```typescript
interface KeyMetrics {
  price: string           // 価格（維持）
  suitableTasks: string   // 向いてる作業
  freeLimit: string       // 無料の枠
  outputFormats: string   // 対応出力
}
```

#### **新4項目の表示ラベル**
```
価格 → 価格
セットアップ → 向いてる作業
利用者数 → 無料の枠  
対応環境 → 対応出力
```

#### **データ抽出ルール（事実ベース厳守）**

##### **1. price（価格）**
- **元データ**: `pricing.freeTier` 
- **表示例**: 「15GB無料」「月40分無料」「基本機能無料」
- **禁止**: 推測・憶測による価格情報

##### **2. suitableTasks（向いてる作業）**
- **元データ**: `coreFeatures.primaryFunction` + `uniqueFeatures`
- **表示例**: 「ファイル保存・共有」「画面録画・説明動画」「英文校正・文章チェック」
- **表記ルール**: 動詞形式、2-3用途まで、読者が「あ、これ自分の作業だ」と分かる表現

##### **3. freeLimit（無料の枠）**
- **元データ**: `pricing.freeCredits` + `technicalSpecs.responseTime` 等の組み合わせ
- **表示例**: 「15GB・同期無制限」「月5時間・HD画質」「3アプレット・基本トリガー」
- **表記ルール**: 容量・回数・時間制限を具体的に、制限なしは「無制限」と明記

##### **4. outputFormats（対応出力）**
- **元データ**: `coreFeatures.outputFormats` 
- **表示例**: 「PDF・Word・Excel」「MP4・リンク共有」「修正文・提案・統計」
- **表記ルール**: ファイル形式・共有方法・実用的な出力形式、2-3形式まで

#### **実装済み事例（K901.json）**
```json
// Google Drive
"keyMetrics": {
  "price": "15GB無料",
  "suitableTasks": "ファイル保存・共有",
  "freeLimit": "15GB・同期無制限", 
  "outputFormats": "全形式対応"
}

// Loom
"keyMetrics": {
  "price": "月5時間無料",
  "suitableTasks": "画面録画・説明動画",
  "freeLimit": "月5時間・HD画質",
  "outputFormats": "MP4・リンク共有"
}

// Notion
"keyMetrics": {
  "price": "個人利用無料",
  "suitableTasks": "ノート・データベース・Wiki",
  "freeLimit": "個人無制限・同期全端末",
  "outputFormats": "PDF・HTML・Markdown"
}
```

#### **重要：事実ベース原則**
- ✅ **許可**: データベースに記録済みの情報のみ使用
- ❌ **禁止**: 推測・憶測・一般論での補完
- ✅ **不明データ**: 空文字または「要確認」と明記
- ✅ **検証**: 元データとの対応関係を必ず確認

---

## 🔄 V2.2 ツール概要の事実ベース化（2025-09-01）

### **重要変更: 宣伝文句から事実ベース表現へ**

#### **変更理由**
- 従来: 「革命的」「最強」「〜の王者」→ 誇張・主観的表現
- V2.2: **事実のみ、数値・機能・利用実績で価値を表現**

#### **ツール概要（overview）作成ルール**

##### **❌ 禁止表現**
1. **主観的評価**: 「最も」「最強」「革命的」「画期的」
2. **誇張表現**: 「劇的に向上」「飛躍的に」「〜の王者」
3. **宣伝文句**: 「あなたの」「必須ツール」「相棒」
4. **冗長表現**: 「AI搭載」（AIツールなら当然）
5. **虚偽の数値**: 「3秒で要約」「5分で完成」等の非現実的な処理時間

##### **✅ 推奨表現**
1. **具体的数値**: 利用者数、トークン数、テンプレート数
2. **機能の事実**: 「〜に対応」「〜を自動生成」「〜と統合」
3. **利用条件**: 「学生無料」「個人利用無料」「月○回無料」
4. **処理能力**: 「100万トークン処理」「全言語対応」

#### **事実ベース概要の構成要素**
```
1. 主要機能・処理能力（数値付き）
2. 利用実績・規模（利用者数等）
3. 特徴的な機能・差別化要素
4. 価格・利用条件（無料枠等）
```

#### **実装済み事例（K601）**
```json
// Claude
"overview": "100万トークン（約20万文字）を一度に処理。文章作成・コード生成・画像認識に対応。"

// ChatGPT  
"overview": "7億人が利用。GPT-5無料利用可。動画・画像・音声・テキスト全対応。プラグイン3000個以上。"

// GitHub Copilot
"overview": "コメントや関数名からコード自動生成。全主要プログラミング言語対応。学生・オープンソース開発者は無料。"

// Canva
"overview": "1億3000万人利用のデザインツール。テンプレート100万個以上。AI機能で背景除去・画像生成も可能。"
```

#### **データソース対応表**
| 概要の要素 | データベースのフィールド |
|-----------|----------------------|
| 利用者数 | `userMetrics.userCount` |
| 処理能力 | `technicalSpecs.maxTokens` |
| 主要機能 | `coreFeatures.primaryFunction` |
| 特徴機能 | `coreFeatures.uniqueFeatures` |
| 価格条件 | `pricing.freeTier` |
| 対応範囲 | `platform` / `localization` |

#### **重要：事実確認の必須性**
- データベースに記録された情報のみ使用
- 不明な情報は記載しない（推測禁止）
- 数値は最新の確認済みデータを使用
- 処理時間等は現実的な範囲で表現

#### 実装例
```json
{
  "section": "introduction", 
  "template": "ten_intro",
  "content": {
    "problems": [
      "AIツール多すぎて、どれを使えばいいかわからない",
      "ChatGPT以外に使えるものってあるの？", 
      "生産性を上げたいけど結局何がベストなのかわからない"
    ],
    "introMessage": "「AI生産性向上ツール」を紹介！",
    "solution": "私なりに「すぐ使える・簡単さ・人気度」で選んだ生産性爆上げの「AIツール」を紹介いたす！"
  }
}
```

#### 注意事項
- **problems**: 読者共感型・キャラクター口調禁止
- **solution**: 共感文（「その悩み、わかります」等）不要
- **余計な修飾語**: 「のTENスコア」「10選」「します」等削除
- **核心特定**: problemsからランキングで整理することで解決する悩み1つをsolutionに記載

### Page2: ランキング一覧
```json
{
  "section": "ranking",
  "template": "ranking_display",
  "content": {
    "title": "生産性向上ツールランキング",
    "subtitle": "TEN厳選・即効性重視",
    "displayType": "ranking",
    "items": [
      {
        "rank": 1,
        "name": "Google Drive",
        "primaryValue": "TENスコア: 95点",
        "secondaryValue": "無料で始められる",
        "description": "クラウドストレージ",
        "category": "無料"
      },
      // ... 10位まで
    ]
  }
}
```

### Page3-7: 詳細ページ（2ツールずつ）
**重要**: useCasesは必ず4つ指定してください（2カラム2行で表示されます）
```json
{
  "section": "detail_3",
  "template": "enhanced_tool_detail",
  "content": {
    "title": "1位・2位",
    "subtitle": "詳細データ",
    "displayType": "enhanced_detail_grid",
    "tools": [
      {
        "rank": 1,
        "name": "Google Drive",
        "category": "クラウドストレージ",
        "mainMetrics": {
          "TENスコア": "95点",
          "即効性": "95点",
          "導入簡単": "100点",
          "人気度": "100点"
        },
        "subMetrics": {
          "価格": "無料版あり",
          "設定時間": "2分",
          "学習コスト": "95点",
          "信頼性": "95点"
        },
        "parameterGraph": {
          "timeReduction": 95,
          "simplicity": 100,
          "versatility": 85,
          "reliability": 90,
          "trendiness": 100
        },
        "features": {
          "type": "AI会話・アシスタント",
          "developer": "Anthropic",
          "launched": "2022-07",
          "specialization": "Constitutional AI・安全性重視"
        },
        "details": {
          "overview": "100万トークン（約20万文字）を一度に処理。文章作成・コード生成・画像認識に対応。",
          "useCases": ["主要用途1", "主要用途2", "主要用途3", "主要用途4"],
          "pros": ["Constitutional AI", "1Mトークンコンテキスト", "長文読解・要約", "コードレビュー・生成"],
          "tips": [
            "具体的操作・コマンド系の文（80文字以内）",
            "隠れた機能・裏技系の文（80文字以内）", 
            "時短テクニック系の文（80文字以内）"
          ]
        },
        "tenRecommendation": "Constitutional AIで安全性重視。企業利用での信頼性が高い。",
        "logoPath": "/imag/ai_logo/claude-ai-icon.png"
      },
      // 2位のツール
    ]
  }
}
```

### Page7: ツール一覧表示（showcase）
```json
{
  "section": "showcase",
  "template": "tool_showcase",
  "content": {
    "title": "AI生産性向上ツール",
    "subtitle": "TENスコア順位",
    "displayType": "showcase_grid",
    "tools": [
      {
        "position": 1,
        "name": "Claude",
        "category": "AI会話・アシスタント",
        "primaryScore": "TENスコア: 570点",
        "highlight": "無料版あり",
        "icon": "/imag/ai_logo/claude-ai-icon.png"
      },
      {
        "position": 2,
        "name": "ChatGPT",
        "category": "AI会話・アシスタント", 
        "primaryScore": "TENスコア: 560点",
        "highlight": "無料版あり",
        "icon": "/imag/ai_logo/chatgpt_1000x1000_original.png"
      }
      // ... 全10ツール
    ],
    "evaluationNote": "TENスコア = 即効性25% + 導入簡単25% + 人気度20% + コスパ20% + 生産性UP度10%",
    "tenComment": "上位3つは全て無料版があり、1分で始められる。\nまずは1つでも試して、AI時代の生産性向上を体感しましょう！"
  }
}
```

### Page8: 最終まとめ・アクションステップ
```json
{
  "section": "summary",
  "template": "ten_summary",
  "content": {
    "title": "TEN DATABASE",
    "subtitle": "AI生産性向上ツール完全ガイド",
    "summaryPoints": [
      "上位3ツール全て無料版あり・1分で導入可能",
      "評価は即効性・簡単さ・人気度で算出", 
      "実際に使って効果があったツールのみ厳選",
      "用途別に選べる多様なAIツールラインナップ"
    ],
    "actionSteps": [
      {
        "step": "1つ選ぶ",
        "description": "まずは上位3つから気になるAIツール1つを選択"
      },
      {
        "step": "1分で導入",
        "description": "アカウント作成から初回利用まで超高速で完了"
      },
      {
        "step": "即効果実感", 
        "description": "その日からAIによる生産性向上を実感"
      }
    ],
    "finalMessage": "今日から1つでも導入して、AI時代の生産性を体感してください！",
    "databaseImage": "/images/ten-database-ai-tools.png",
    "additionalInfo": "詳細データはプロフィールのリンクから確認"
  }
}
```

---

## 📝 キャプション作成ルール

### キャプション構造（固定フォーマット）
```
1. 掴み文（1-2文）
2. 空行
3. @find_to_do←他の投稿はこちら
4. ━━━━━━━━━━━━━━━━━━━━
5. 空行
6. ▶ 構造化された投稿補足説明（15行程度）
7. 空行
8. ━━━━━━━━━━━━━━━━━━━━
9. FIND to DO固定メッセージブロック
10. ━━━━━━━━━━━━━━━━━━━━
11. 感謝・フォロー促進メッセージ
12. ━━━━━━━━━━━━━━━━━━━━
13. ハッシュタグ（12個）
```

### TEN掴み文パターン
```
効率価値型: 「効率化ツール多すぎて、どれを使えばいいかわからない...そんな悩みを解決する効率化ツールを厳選して紹介！」
時短効果型: 「この方法で作業時間を半分に短縮できるので実践！」
システム提案型: 「効率的なフレームワークを使えば生産性向上！」
改善促進型: 「効率が悪いなと普段からボヤっと悩んでいる人の悩みを一発解決！」
```

### 投稿補足説明作成
```
▶ [ランキングテーマに関連したタイトル]（3行程度）
ランキング内容の背景・なぜこのツールが必要なのかの補足

▶ [紹介効率化ツールのタイトル]
  ① [効率化ツール1のタイトル]（3行程度）
  特徴と概要とできること
  
  ② [効率化ツール2のタイトル]（3行程度）
  特徴と概要とできること
  
  ③ [効率化ツール3のタイトル]（3行程度）
  特徴と概要とできること

  ④ [効率化ツール4のタイトル]（3行程度）
  特徴と概要とできること

  ⑤ [効率化ツール5のタイトル]（3行程度）
  特徴と概要とできること

▶ [行動促進に関連したタイトル]（3行程度）
```

### JSON追加フィールド
```json
{
  "caption": "完全なキャプション文（上記フォーマット準拠）"
}
```

---

## 💬 キャプション生成ルール

### 構成要素
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/manuals/コンテンツ作成マニュアル/10_キャプション・ハッシュタグ生成マニュアル_2025-08-23.md

### FIND to DO固定メッセージブロック（完全固定文）
```
「自分には何もない」から
「自分にはこれがある」が見つかるコミュニティ

最初は誰でも初心者。
ここで見つけた「得意」が、人生を変えるきっかけになる。

一人で頑張るより、みんなで挑戦する方が圧倒的に早く成長できる。

プロフィール欄のURLからお気軽にご参加ください！

@find_to_do
```

### 感謝・フォロー促進メッセージ（完全固定文）
```
いいね・コメント・シェアありがとうございます！

FIND to DO(@find_to_do)では
✅ 毎日キャリアに役立つクイズをストーリーで配信
✅ 開催イベントの情報をお届け
✅ キャリアに役立つノウハウを配信中

フォローして参考にしてください！
```

---

## ⚠️ TEN特有の注意事項

### 評価軸（TENスコア算出）
```
TENスコア = 
  即効性(25%) + 
  導入の簡単さ(25%) + 
  トレンド・人気度(20%) + 
  コスパ(20%) + 
  生産性向上期待度(10%)
```

### 必須要素
- **無料または格安**: 初期費用なし
- **導入5分以内**: 複雑な設定不要
- **即効性がある**: すぐ効果実感
- **みんな使ってる感**: 人気・定番ツール

### 避けるべき要素
- 複雑な設定手順
- 高額な月額課金
- 学習コストが高い
- マニアックすぎるツール
- 英語のみのサービス

---

## 🔄 V2.3 Tips最適化（2025-09-01）

### **重要変更: 一般的な情報から実用的なアドバイスへ**

#### **変更理由**
- 従来: 「長文の要約や分析に最適」「コードの説明を詳しく求める」→ 一般的で実践しにくい
- V2.3: **読者が即座に実践できる具体的なアドバイス**に変更

#### **Tips作成の4原則**

##### **1. 具体性重視**
- ❌ 「長文の要約や分析に最適」（どうやって？）
- ✅ 「Artifacts機能でコード・文書をリアルタイム編集・実行」（操作方法明確）

##### **2. ツール固有機能**
- ❌ 「複雑な質問は段階的に聞く」（どのAIでも同じ）
- ✅ 「Tab押しでコード補完、Ctrl+Enterで複数提案表示」（GitHub Copilot特有）

##### **3. 実践的コマンド・操作**
- ❌ 「プラグインを活用する」（抽象的）
- ✅ 「/imagine プロンプト --ar 16:9で横長、--v 7で最新版」（実際のコマンド）

##### **4. 80文字制限対応**
- テンプレートでsubstring(0, 80)で切られることを前提
- 重要な情報を前半に配置
- 冗長な表現を削除

#### **NGフレーズ一覧**

##### **冗長表現**
- ❌ "AI機能で" → ✅ そのまま削除（AIツール紹介なので当然）
- ❌ "Magic Design機能で" → ✅ "Magic Designで"
- ❌ "～機能で" → ✅ 機能名のみ

##### **一般論・抽象的表現**
- ❌ "最適"、"効率的"、"便利"
- ❌ "活用する"、"心がける"、"参考にする"
- ❌ "段階的に"、"詳しく"、"積極的に"

#### **Tips配列の必須構造**

**IMPORTANT: Tipsは必ず3つの文で構成される配列**

```json
"tips": [
  "具体的操作・コマンド系の文（80文字以内）",
  "隠れた機能・裏技系の文（80文字以内）", 
  "時短テクニック系の文（80文字以内）"
]
```

#### **Tips 3カテゴリ詳細**

##### **1. 具体的操作・コマンド系**
- **目的**: 実際の操作方法・入力コマンドを具体的に示す
- **形式**: 「[入力内容]で[実行結果]」「[操作方法]で[効果]」
- **例**:
```json
// Claude
"「200万文字の資料を要約して」で長文一括処理"

// GitHub Copilot
"Tab押しでコード補完、Ctrl+Enterで複数提案表示"

// Midjourney
"/imagine プロンプト --ar 16:9で横長、--v 7で最新版"
```

##### **2. 隠れた機能・裏技系**
- **目的**: 知られていない機能や上級テクニックを紹介
- **形式**: 「[機能名]で[特殊な使い方]」「[裏技]で[効果]」
- **例**:
```json
// Perplexity
"「ソース付きで教えて」でエビデンス付き回答を確実取得"

// NotebookLM
"複数PDF同時アップロードで「共通点をまとめて」で比較分析"

// Canva
"Background Removerで「背景透明にして」で瞬時に切り抜き"
```

##### **3. 時短テクニック系**
- **目的**: 効率化・自動化による時間短縮方法
- **形式**: 「[連携機能]で[自動化内容]」「[効率化手法]で[時短効果]」
- **例**:
```json
// ChatGPT
"o1推論モデルで複雑な数学・論理問題を段階的に解決"

// Gemini
"Gmail・Docs連携で「メール要約」「文書自動作成」"

// Notion AI
"「議事録を作って」「TODOリスト化」を自動実行"
```

#### **Tips作成フロー（3カテゴリ必須対応）**

##### **STEP 1: ツール分析**
1. **uniqueFeatures確認**
   - データベースから独自機能抽出
   - 他ツールとの差別化ポイント特定

2. **coreFeatures確認**
   - 主要機能3-5個を特定
   - 実際の使用シーンを想定

##### **STEP 2: 3カテゴリTips作成**

**1. 具体的操作・コマンド系Tips**
- **ソース**: ツールのインターフェース・コマンド・操作方法
- **作成法**: 「[具体的入力]で[明確な結果]」形式
- **検証**: 実際に試してみて動作確認

**2. 隠れた機能・裏技系Tips**
- **ソース**: uniqueFeatures、マニュアルに書かれていない使い方
- **作成法**: 「[機能名]で[意外な活用法]」形式
- **検証**: その機能がそのツール固有かどうか確認

**3. 時短テクニック系Tips**
- **ソース**: 連携機能、自動化機能、効率化設定
- **作成法**: 「[連携・設定]で[時短効果]」形式
- **検証**: どの程度時短できるか具体的効果を確認

##### **STEP 3: 80文字制限最適化**
- **前半重点**: 最重要情報を前半20文字に配置
- **冗長削除**: 「AI機能で」「～することで」等の無駄削除
- **読者視点**: 「試してみたい」と思える具体性

#### **Tips品質基準（3カテゴリ共通）**

##### **必須要件**
- **配列構造**: 必ず3つの文で構成される配列
- **カテゴリ順序**: [1]操作・コマンド → [2]隠れ機能・裏技 → [3]時短テクニック
- **80文字制限**: 各文は80文字以内（テンプレート切り取り対応）
- **事実ベース**: データベース情報・公式情報のみ使用

##### **品質評価基準**
1. **即実践可能性**: 読んですぐ試せる具体性があるか
2. **ツール特化性**: そのツールでしかできない内容か
3. **結果明確性**: 何ができるようになるか明示されているか
4. **価値提供性**: ユーザーにとって実用的な価値があるか

##### **実装必須チェック**
```json
// 正しい実装例
"tips": [
  "具体的操作例（80文字以内）",
  "隠れ機能例（80文字以内）",
  "時短テクニック例（80文字以内）"
]

// NG実装例
"tips": ["1つだけのTips"]  // ❌ 必ず3つ必要
"tips": "文字列"          // ❌ 配列でなければならない
```

#### **logoPath（画像パス）指定ルール**

##### **必須形式**
```json
"logoPath": "/imag/ai_logo/ツール名.png"
```

##### **重要事項**
- **NEVER**: `/public/imag/ai_logo/...` (❌ publicは不要)
- **ALWAYS**: `/imag/ai_logo/...` (✅ 正しいNext.js publicアセット参照)
- **必須確認**: 画像ファイルが`public/imag/ai_logo/`ディレクトリに存在すること
- **空文字禁止**: `"logoPath": ""` は使用不可、必ず有効なパス指定

##### **画像ファイル命名規則**
- **標準形式**: `toolname_1280x1280_original.png`
- **簡易形式**: `toolname.png`
- **特殊形式**: `toolname_1280x308_original.png` (横長ロゴ用)

##### **実装チェック例**
```json
// ✅ 正しい実装
"logoPath": "/imag/ai_logo/claude-ai-icon.png"
"logoPath": "/imag/ai_logo/chatgpt_1000x1000_original.png"

// ❌ 間違った実装
"logoPath": "/public/imag/ai_logo/claude-ai-icon.png"  // publicが不要
"logoPath": ""                                          // 空文字禁止
"logoPath": "images/claude.png"                        // パス形式間違い
```

---

## 🔄 V2.4 価格・無料枠の重複解消（2025-09-01）

### **重要変更: キーメトリクスの情報精度向上**

#### **変更理由**
- 従来: 価格と無料枠で同じ情報が重複（例：価格「基本機能無料」、無料枠「基本機能・無制限」）
- V2.4: **役割を明確に分離し、事実に基づいた正確な情報提供**

#### **価格・無料枠の役割分担**

##### **price（価格）の役割**
- **目的**: 有料版の料金プラン情報
- **表示内容**: 月額・年額・プラン名
- **表記例**: 
  - "有料版月$20"
  - "有料Pro版月$30"
  - "月$10〜"
  - "Google製・無料"（完全無料サービスのみ）

##### **freeLimit（無料枠）の役割**
- **目的**: 無料版の具体的制限・利用条件
- **表示内容**: 回数・容量・機能制限
- **表記例**:
  - "月20メッセージ・全機能"
  - "月15回まで無料"
  - "学生無料・オープンソース無料"
  - "日5回検索・基本機能"

#### **V2.4改善実施内容**

##### **重複解消例**
```json
// 改善前（重複問題）
"price": "基本機能無料",
"freeLimit": "基本機能・無制限"

// 改善後（役割分担）
"price": "有料版月$20", 
"freeLimit": "月15回まで無料"
```

##### **事実確認・修正例**
```json
// Claude（1位）
"price": "有料版月$20",
"freeLimit": "月20メッセージ・全機能"

// ChatGPT（2位）  
"price": "有料版月$20",
"freeLimit": "GPT-4o無料・有制限"

// Gemini（3位）
"price": "有料版月$20",
"freeLimit": "月15回まで無料"

// GitHub Copilot（4位）
"price": "有料版月$10", 
"freeLimit": "学生無料・オープンソース無料"

// NotebookLM（7位）
"price": "Google製・無料",
"freeLimit": "完全無料・無制限"
```

#### **事実確認ルール（V2.4）**

##### **完全無料サービスの判定基準**
- ✅ **許可**: 本当に料金不要で全機能利用可能
- ❌ **禁止**: 制限ありの無料版を「完全無料」表記
- ✅ **例**: NotebookLM、Remove.bg（基本機能）
- ❌ **例**: Claude、ChatGPT、Gemini（月額制限あり）

##### **有料サービスの価格表記**
- **公式料金**: 最新の公式サイト料金に基づく
- **USD表記**: "$20"形式で統一
- **プラン名**: "Pro"、"Plus"等の正式名称使用
- **レンジ表記**: 複数プランは"$10〜"形式

##### **無料版制限の表記**
- **数値具体化**: "月20回"、"日5回"等
- **機能範囲**: "基本機能"、"全機能"、"限定機能"
- **条件付き**: "学生無料"、"個人利用無料"
- **容量制限**: "5GB"、"15GB"等

#### **品質基準（V2.4）**
1. **情報の独立性**: 価格と無料枠で重複しない
2. **事実の正確性**: 公式情報に基づく料金・制限
3. **読者価値**: 導入判断に直結する情報
4. **更新頻度**: 料金変更時の即時対応

#### **今後の維持ルール**
- 新ツール追加時は価格・無料枠の役割分担を厳守
- 料金変更の定期チェック（3ヶ月ごと）
- "無料"表記の厳格な事実確認
- 読者視点での情報価値検証

---

## 🔄 品質チェックリスト

### 必須確認項目
- [ ] K60x番台で保存
- [ ] 8ページ構成
- [ ] TOP10全て記載
- [ ] キャプション生成

### データ整合性
- [ ] ランキング順位正確
- [ ] ツール名統一
- [ ] カテゴリ分類適切
- [ ] 数値データ正確
- [ ] 特徴説明適切

---

**作成日**: 2025-08-29  
**対応ナレッジ**: K601〜K699  
