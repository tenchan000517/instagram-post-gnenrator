# detailedContent修正エビデンス - Type002 (実践習得型)

## 作業概要
**対象**: Type002 実践習得型ナレッジ（66ファイル）  
**作業目的**: pageStructurePattern配置後に必要なdetailedContent修正内容を記録

## 対象ディレクトリ・ファイル
**ディレクトリ**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type002/`

#### 基本情報
- **ファイルパス**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type002/[ファイル名].json`
- **テンプレート定義ファイル**: `/mnt/c/instagram-course/instagram-post-generator/app/services/knowledgeBase/data/pageStructures/unified/[テンプレート名].json`

**対象ファイル一覧**:
K002.json, K003.json, K004.json, K005.json, K010.json, K011.json, K023.json, K028.json, K034.json, K039.json, K040.json, K042.json, K045.json, K048.json, K064.json, K073.json, K075.json, K076.json, K077.json, K083.json, K090.json, K091.json, K103.json, K108.json, K110.json, K112.json, K117.json, K118.json, K132.json, K133.json, K134.json, K135.json, K137.json, K138.json, K139.json, K140.json, K141.json, K142.json, K143.json, K144.json, K145.json, K150.json, K152.json, K154.json, K156.json, K157.json, K159.json, K161.json, K162.json, K163.json, K164.json, K165.json, K166.json, K167.json, K169.json, K170.json, K171.json, K173.json, K174.json, K175.json, K176.json, K177.json, K179.json, K181.json, K182.json, K186.json

## 使用可能Unifiedテンプレート一覧

1. `unified-template-01-simple-intro` - シンプル導入型
2. `unified-template-02-dual-section` - デュアルセクション型
3. `unified-template-03-ranking-display` - ランキング表示型
4. `unified-template-04-item-grid` - アイテムグリッド型
5. `unified-template-05-comparison` - 比較型
6. `unified-template-06-company-detail` - 企業詳細型
7. `unified-template-07-item-list` - アイテムリスト型
8. `unified-template-08-section-blocks` - セクションブロック型
9. `unified-template-09-dynamic-boxes` - 動的ボックス型
10. `unified-template-10-image-point` - 画像ポイント型

## Type002の使用可能な画像リソース

### **内容的に配置した方が伝わる場合のみ画像配置する**

テキストだけでは伝わらないと判断したら（基本的にテキストだけで伝わるナレッジになっているはず）プレースホルダーや架空のパスを記載するのではなく必要な画像の概要をその箇所に記載する

例：Geminiのウェブインターフェースの開始画面など　※無理に入れようとしない

## 以下のテンプレートを選択し、上記画像が該当しない場合は適切な使用可能キャラクターを配置する（配置構造はテンプレートに準拠する）

ImagePointTemplate.tsx
SectionBlocksTemplate.tsx
SimpleIntroTemplate.tsx
DualSectionTemplate.tsx

### 使用可能キャラクター画像（実践ガイド向け）
- **プロフェッショナル表現**: misaki.png（ビジネス女性向け）, ten.png（汎用ガイド）
- **学習・説明**: iida.png（説明役）, king.png（男性向けガイド）

### AIツール画像（該当コンテンツのみ）
**パス**: `/mnt/c/instagram-course/instagram-post-generator/public/imag/ai/`
- Adobe_Firefly_Logo.png, ChatGPT-Logo.png, claude-ai-icon.png, copilot.png, gamma.png, Google-Gemini-1.png, mymind.png, Napkin-ai.png, NotebookLM_logo.png, perplexity.png

## 修正エビデンス記録フォーマット

---

### 🔧 [ファイル名] detailedContent修正エビデンス
- **配置済みテンプレート**: [pageStructurePatternに設定されたテンプレート]

#### 修正後のdetailedContent構造
```json
{
  // 修正後の構造をここに記載
}
```

#### 🎨 Type002画像配置戦略

##### 実践ガイド向けキャラクター選択
- **ビジネススキル**: misaki.png（女性向け）, ten.png（汎用）
- **技術スキル**: king.png（男性向け）, iida.png（説明役）
- **学習サポート**: 通常表情を基本使用（困り顔は最小限）

---

## Type002修正エビデンス一覧

### 🔧 K002.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: section-blocksテンプレートの構造に適合させるため、7つの実践スキルを各セクションに配置し、Type002専用セクション統一ルール（introduction/mainContent）に準拠

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introduction）
- page2: /misaki_work.png（実践スキル習得の意欲的なイメージ）
- page3: /misaki_study.png（学習・スキル向上のイメージ）
- page4: /kikuyo_work.png（準備状態維持のプロフェッショナルなイメージ）
- page5: /misaki_worry.png（冷静な判断が必要な状況のイメージ）
- page6: /kikuyo.png（働き方多様化に対応する女性のイメージ）
- page7: /kikuyo_point.png（重要ポイント説明のイメージ）
- page8: /misaki_study.png（継続的な学習・成長のイメージ）

**画像選択理由**: Type002実践習得型の特性に合わせ、女性向けキャリア実践スキルを身につける過程を表現。各フェーズの進行に応じて適切なキャラクター表情を選択し、同一画像の連続使用を回避。

### 🔧 K003.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: section-blocksテンプレートの構造に適合させるため、AIプロンプト作成の7ステップを各セクションに配置し、Type002専用セクション統一ルール（introduction/mainContent）に準拠

#### 🎨 画像配置戦略
**画像要否**: 必要（既存の技術系画像を最大限活用）
**具体的配置**:
- page1: 画像不要（introduction）
- page2: /imag/003/2.png（Google AI Studio登録画面の実際のスクリーンショット）
- page3: /imag/003/3.png（Gemini 2.5 Pro選択画面）
- page4: /imag/003/3.png（Temperature設定画面・同じ設定画面内の要素）
- page5: /imag/003/4.png（Grounding設定画面）
- page6: /imag/003/4.png（URL context設定画面・同じ設定画面内の要素）
- page7: 画像不要（プロンプトテキスト重視）
- page8: /imag/003/6.png（実行結果画面）
- page9: /king_point.png（重要ポイント説明・スキル習得完了アピール）

**画像選択理由**: AIツール実践ガイドとして、実際の操作画面を最大限活用し視覚的理解を促進。最終ページでキャラクターを配置してスキル習得完了を強調。

### 🔧 K004.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: section-blocksテンプレートの構造に適合させるため、自己分析の4つの手法を各セクションに配置し、Type002専用セクション統一ルール（introduction/mainContent）に準拠

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introduction）
- page2: /misaki_study.png（自分史作成・学習のイメージ）
- page3: /misaki_work.png（分析作業・仕事のイメージ）
- page4: /kikuyo_point.png（重要ポイント説明・他者視点取り入れのイメージ）
- page5: /misaki_study.png（統合的理解完成・継続学習のイメージ）

**画像選択理由**: 包括的自己分析の各段階に応じて適切なキャラクター画像を選択。学習・分析・説明・完成の流れを視覚的に表現し、同一画像の連続使用を回避。

### 🔧 K005.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: section-blocksテンプレートの構造に適合させるため、副業成功の7つのステップを各セクションに配置し、Type002専用セクション統一ルール（introduction/mainContent）に準拠

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introduction）
- page2: /misaki_work.png（副業種類検討・作業のイメージ）
- page3: /kikuyo.png（目標設定・計画のイメージ）
- page4: /kikuyo_point.png（重要ポイント説明・ジャンル選択のイメージ）
- page5: /misaki.png（信頼構築・コミュニケーションのイメージ）
- page6: /kikuyo_work.png（ツール活用・効率的な作業のイメージ）
- page7: /misaki_work.png（成功事例・実際の作業風景のイメージ）
- page8: /misaki_study.png（継続的な学習・成長のイメージ）

**画像選択理由**: 副業スタートから成功までの各段階に応じて適切なキャラクター画像を選択。学習・作業・説明・成長の流れを視覚的に表現し、同一画像の連続使用を回避。

### 🔧 K010.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: テンプレート適合のためsection-blocks構造に完全変更。左上カラムにキャラクター配置、装飾フィールド削除、warning項目は適切な構造に変換、ページ数を6→7に変更。

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png (女性の勉強中の様子で導入に適している)
- page2: kikuyo_point.png (重要ポイントを教えてくれるポーズ・女性向け)
- page3: king.png (男性キャラクターでバランスを取る)
- page4: misaki_work.png (実践フェーズに適した働く女性の様子)
- page5: ten.png (汎用的な中性的キャラクター)
- page6: iida_fighting.png (やる気の出る男性キャラクター)
- page7: team_work.png (チームワーク・協力のイメージ)

### 🔧 K004.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: テンプレート適合のためsection-blocks構造に完全変更。自己分析の4つの手法を各セクションに配置し、Type002専用セクション統一ルールに準拠。

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png (自分史作成・学習のイメージ)
- page2: kikuyo_point.png (重要ポイント説明・方法説明のイメージ)
- page3: king.png (深掘り分析・男性キャラクターでバランス)
- page4: misaki_work.png (分析作業・仕事のイメージ)
- page5: team_work.png (チームワーク・他者視点取り入れのイメージ)

### 🔧 K005.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: テンプレート適合のためsection-blocks構造に完全変更。副業成功の7つのステップを各セクションに配置し、Type002専用セクション統一ルールに準拠。

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_work.png (副業に取り組む女性のイメージ)
- page2: kikuyo.png (副業種類説明・基本的な女性キャラクター)
- page3: kikuyo_point.png (重要ポイント説明・目標設定のイメージ)
- page4: misaki.png (ジャンル選択・コミュニケーションのイメージ)
- page5: kikuyo_work.png (信頼構築・効率的な作業のイメージ)
- page6: ten.png (ツール活用・汎用的キャラクター)
- page7: iida_fighting.png (やる気・成功への意欲のイメージ)
- page8: misaki_study.png (継続的な学習・成長のイメージ)

### 🔧 K011.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: Type002フォルダ内だがpostType003のため、Type002として処理。テンプレート適合のためsection-blocks構造に完全変更。業界と職種の理解を段階的に習得する構成に変更、ページ数を4→5に変更。

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png (就活準備・学習のイメージ)
- page2: kikuyo_point.png (重要ポイント説明・業界職種の違い解説)
- page3: king.png (職種紹介・男性キャラクターでバランス)
- page4: misaki_work.png (専門職種紹介・働く女性のイメージ)
- page5: team_work.png (総合職・チームワークのイメージ)

### 🔧 K023.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: テンプレート適合のためsection-blocks構造に完全変更。インターン準備7つのスキルを段階的に配置し、Type002専用セクション統一ルールに準拠。

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png (インターン準備・学習のイメージ)
- page2: kikuyo_point.png (基礎準備フェーズ・重要ポイント説明)
- page3: king.png (実践準備フェーズ・男性キャラクターでバランス)
- page4: misaki_work.png (応用準備フェーズ・働く女性のイメージ)
- page5: iida_fighting.png (完成フェーズ・やる気のイメージ)
- page6: ten.png (テンプレート活用・汎用的キャラクター)
- page7: kikuyo_work.png (学習サイクル・効率的作業のイメージ)
- page8: team_work.png (まとめ・チームワーク・協力のイメージ)

### 🔧 K028.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 元の構造はテンプレート非準拠の独自構造（role、question、points等）だったため、unified-template-08-section-blocksの要求構造（section、blocks配列構造）に完全変更

**主要修正内容**:
- page1: introduction構造に変更（title + description）
- page2-6: mainContent構造に変更（blocks配列、各blockでimageSrc + title + description + details + modelAnswer）
- 全情報保持: 元の質問、ポイント、模範回答を全て新構造に移行
- 最終ページのまとめ情報も完全保持

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introductionページ）
- page2: /misaki_study.png（面接準備をする女性）
- page3: /king_point.png（ポイントを教える男性）
- page4: /kikuyo_point.png（アドバイスをする女性）
- page5: /misaki_work.png（楽しそうに仕事をする女性）
- page6: /team_work.png（チームワークのイラスト）

**キャラクター使い分け**: 混合ターゲット向けに男女キャラクターをバランス良く配置、pointシリーズでアドバイス感を演出

### 🔧 K034.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 元の構造はテンプレート非準拠の独自構造（role、questions、items等）だったため、unified-template-08-section-blocksの要求構造（section、blocks配列構造）に完全変更

**主要修正内容**:
- page1: introduction構造に変更（title + description）
- page2-8: mainContent構造に変更（blocks配列、各blockでimageSrc + title + description + 詳細内容）
- 全情報保持: 元のSTEP詳細、質問リスト、目標設定を全て新構造に移行
- 質問グループ化: 自己分析質問を期間別、面接質問をカテゴリ別に整理

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introductionページ）
- page2: /misaki_study.png（学習する女性・PDCA学習のイメージ）
- page3: /king_point.png（目標を説明する男性・目標設定のイメージ）
- page4: /kikuyo_point.png（エントリーシートを説明する女性・ES作成のイメージ）
- page5: /misaki_work.png（自己分析をする女性・分析作業のイメージ）
- page6: /ten.png（汎用キャラクター・継続的な分析のイメージ）
- page7: /iida_fighting.png（モチベーション高い男性・面接対策への意欲）
- page8: /team_work.png（チームワークのイラスト・総合的な成功イメージ）

**キャラクター使い分け**: 27卒就活生の混合ターゲット向けに男女キャラクターをバランス良く配置、各STEPの特性に応じた表情・状況を選択

### 🔧 K039.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: section-blocksテンプレートの構造適合性向上。page4のネスト構造をフラット化し、page8のsummaryセクションをmainContentに統一、Type002専用セクション統一ルールに完全準拠

**主要修正内容**:
- page4: blocks配列からフラット構造（imageSrc + title + description + points）に変更
- page8: summaryセクション→mainContentセクションに変更、構造をsection-blocks標準形式に統一
- 全情報保持: ES添削メソッドの詳細情報を全て保持し新構造に適合

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introductionページ）
- page2: 画像不要（事例提示ページ）
- page3: 画像不要（分析ページ）
- page4: /kikuyo_point.png（アドバイスする女性・既存配置維持）
- page5: 画像不要（詳細分析ページ）
- page6: 画像不要（改善案提示ページ）
- page7: 画像不要（改善成果ページ）
- page8: /kikuyo_work.png（仕事中の女性・新規配置）

**画像選択理由**: ES添削という実践的スキル習得コンテンツに適した女性キャラクターを中心に配置。重要なアドバイス箇所とまとめ箇所のみ画像配置し、情報密度の高いページは画像なしで集中力を維持

### 🔧 K040.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-07-item-listテンプレートの構造に完全適合。5つのカテゴリーから6ページ構成に変更し、30のエピソード例を体系的に整理、Type002専用セクション統一ルール適用

**主要修正内容**:
- pageCount: 5→6に変更（エピソードがない人への励ましページ追加）
- 全ページ: item-list構造に統一（number + title + description）
- カテゴリー別構成: アルバイト、部活・サークル、学業・ゼミ、留学・インターン、励ましメッセージに再編成
- 情報価値の完全保持: 30のエピソード例を全て詳細化し新構造に移行
- section統一: introduction/mainContentによる統一

#### 🎨 画像配置戦略
**画像要否**: 不要
**具体的配置**: 全ページ画像なし
**画像選択理由**: 30選という情報密度の高いコンテンツのため、画像を配置せずテキスト情報への集中を促進。item-listテンプレートの簡潔な構造で読みやすさを最優先

### 🔧 K042.json detailedContent修正エビデンス  
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: Type002フォルダ内でpostType003のファイルをType002として処理。unified-template-08-section-blocksテンプレートの構造に完全適合、時系列の就活スケジュール情報を段階的に配置、Type002専用セクション統一ルール適用

**主要修正内容**:
- page1: introduction構造に変更（title + description）
- page2-5: mainContent構造に変更（imageSrc + title + description + points）
- 時系列構成: 6月、7-8月、9-11月、12月以降の4段階で整理
- 全情報保持: 元のスケジュール情報とタスクを全てpointsに統合し新構造に移行
- section統一: introduction/mainContentによる統一

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introductionページ）
- page2: /misaki_study.png（学習する女性・就活準備のイメージ）
- page3: /king_point.png（ポイントを教える男性・面接アドバイスのイメージ）
- page4: /kikuyo_point.png（アドバイスする女性・早期選考の重要性説明）
- page5: /misaki_work.png（希望を持つ女性・就活成功への励ましイメージ）

**画像選択理由**: 大学3年生の混合ターゲット向けに男女キャラクターをバランス良く配置。各時期の特性（準備→実践→選考→成功）に応じたキャラクター表情を選択し、pointシリーズでアドバイス感を演出

### 🔧 K045.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレートの構造に完全適合。適性検査対策の段階的説明を4つのセクションに再構成、Type002専用セクション統一ルール適用

**主要修正内容**:
- page1: introduction構造に変更（title + description）
- page2-4: mainContent構造に変更（imageSrc + title + description + points）
- 段階的構成: 種類と基本対策→3つのコツ→URL見分け方の実践的構成
- 全情報保持: 元の詳細情報を全てpointsに統合し新構造に移行
- 装飾フィールド削除: role、illustration等を削除
- section統一: introduction/mainContentによる統一

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introductionページ）
- page2: /king_point.png（ポイントを教える男性・基本知識説明）
- page3: /kikuyo_point.png（アドバイスする女性・コツの説明）
- page4: /misaki_study.png（学習する女性・実践的知識習得のイメージ）

**画像選択理由**: 適性検査対策という実践的スキル習得コンテンツに適した男女キャラクターを配置。基本説明→コツ解説→実践知識の流れで、pointシリーズを活用してアドバイス感を演出し、最後に学習イメージで完結

### 🔧 K048.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレートの構造に完全適合。企業研究の段階的習得プロセスを7つのセクションに配置、Type002専用セクション統一ルール適用

**主要修正内容**:
- page1: introduction構造に変更（title + content + imageSrc）
- page2-7: mainContent構造に変更（blocks配列、各blockでcontent + imageSrc（選択的））  
- 段階的構成: 目的→メリット→注意点→確認場所→分析手順→まとめの実践的構成
- 全情報保持: 元の詳細な企業研究手順を全て新構造に移行
- 装飾フィールド削除: role、illustration、cta等を削除
- section統一: introduction/mainContentによる統一

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_study.png（企業研究を学ぶ女性・導入イメージ）
- page2: /kikuyo_point.png（目的を説明する女性・重要ポイント）
- page3: /misaki_work.png（メリットを実感する働く女性）
- page4: /king_point.png（注意点を教える男性・バランス配慮）
- page5: /kikuyo_work.png（サイト確認作業をする女性）
- page6: /team_work.png（分析作業のチームワーク）
- page7: /misaki.png（まとめと励ましの基本表情）

**画像選択理由**: 企業研究という実践的スキル習得コンテンツに適した女性中心の配置。男女キャラクターをバランス良く配置し、各段階の特性（学習→説明→実感→注意→作業→協力→完成）に応じたキャラクター選択

### 🔧 K064.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレートの構造に完全適合。5つの指示整理術を各セクションに配置し、Type002専用セクション統一ルール適用

**主要修正内容**:
- page1: introduction構造に変更（title + content + imageSrc）
- page2-7: mainContent構造に変更（blocks配列、各blockでcontent + imageSrc）  
- 段階的構成: 5つのテクニック個別説明→まとめの実践的構成
- 全情報保持: 元の詳細なテクニック説明を全て新構造に移行
- 装飾フィールド削除: role、visualElement、dialogue等を削除
- section統一: introduction/mainContentによる統一
- pageCount変更なし: 7ページ構成を維持

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（指示の混乱に悩む女性・導入イメージ）
- page2: /team_work.png（直接話し合いのチームワーク）
- page3: /king_point.png（時間制限を説明する男性・重要ポイント）
- page4: /kikuyo_work.png（議事録作成作業をする女性）
- page5: /kikuyo_point.png（権威活用を説明する女性・重要ポイント）
- page6: /misaki_study.png（学習する女性・テクニック習得イメージ）
- page7: /misaki.png（まとめと完成の基本表情）

**画像選択理由**: マネジメントスキル習得コンテンツに適した男女キャラクターのバランス配置。各テクニックの特性（悩み→協力→説明→作業→説明→習得→完成）に応じたキャラクター選択

### 🔧 K073.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレートの構造に完全適合。AI就活の7つの手法を各セクションに配置し、Type002専用セクション統一ルール適用

**主要修正内容**:
- page1: introduction構造に変更（title + content + imageSrc）
- page2-9: mainContent構造に変更（blocks配列、各blockでcontent + imageSrc）  
- 段階的構成: 使い分け→ES作成→面接対策→業界研究→自己PR→企業研究→スタートガイド→まとめの実践的構成
- 全情報保持: 元の詳細なAI活用手法を全て新構造に移行
- 装飾フィールド削除: role、layout、pageNumber等を削除
- section統一: introduction/mainContentによる統一
- pageCount変更: 8→9ページに変更（まとめページ追加）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /imag/ai/ChatGPT-Logo.png（AI就活の象徴・導入イメージ）
- page2: /misaki_work.png（AI活用で効率的に働く女性）
- page3: /king_point.png（ES作成方法を説明する男性・重要ポイント）
- page4: /kikuyo_point.png（面接対策を説明する女性・重要ポイント）
- page5: /imag/ai/Google-Gemini-1.png（業界研究用AIツール）
- page6: /misaki_study.png（自己分析・学習する女性）
- page7: /kikuyo_work.png（企業研究作業をする女性）
- page8: /misaki.png（スタートガイド・基本表情）
- page9: /team_work.png（まとめ・チームワーク）

**画像選択理由**: AI就活スキル習得コンテンツに適した実際のAIツール画像と男女キャラクターのバランス配置。各手法の特性（導入→活用→説明→対策→研究→分析→作業→完成→協力）に応じた選択

### 🔧 K075.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレートの構造に完全適合。生成AI就活活用の4つの段階を各セクションに配置し、Type002専用セクション統一ルール適用

**主要修正内容**:
- page1: introduction構造に変更（title + content + imageSrc）
- page2-4: mainContent構造に変更（blocks配列、各blockでcontent + imageSrc）  
- 段階的構成: 実態調査→活用ランキング→適切な方法→プロンプト例の教育的構成
- 全情報保持: 元のマイナビ調査データと活用方法を全て新構造に移行
- 装飾フィールド削除: role、layout等を削除
- section統一: introduction/mainContentによる統一
- pageCount変更なし: 4ページ構成を維持

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /imag/ai/ChatGPT-Logo.png（生成AI就活の象徴・導入イメージ）
- page2: /misaki_work.png（活用データを確認する働く女性）
- page3: /king_point.png（適切な活用方法を説明する男性・重要ポイント）
- page4: /misaki_study.png（プロンプト学習をする女性）

**画像選択理由**: 生成AI就活活用コンテンツに適した実際のAIツール画像とバランスの良い男女キャラクター配置。各段階の特性（導入→確認→説明→学習）に応じたキャラクター選択で理解促進

### 🔧 K076.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレートの構造に完全適合。AI活用術の3つの手法を各セクションに配置し、Type002専用セクション統一ルール適用

**主要修正内容**:
- page1: introduction構造に変更（title + content + imageSrc）
- page2-8: mainContent構造に変更（blocks配列、各blockでcontent + imageSrc）  
- 段階的構成: 活用術1（基本）→活用術1（応用）→活用術2（基本）→活用術2（応用）→活用術3（基本）→活用術3（応用）→まとめの実践的構成
- 全情報保持: 元の詳細なAI活用術を全て新構造に移行
- 装飾フィールド削除: role、elements、icon等を削除
- section統一: introduction/mainContentによる統一
- summaryセクション削除: page8もmainContentに統一

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_study.png（AI活用を学ぶ女性・導入イメージ）
- page2: /kikuyo_work.png（AIで効率化する働く女性）
- page3: /king_point.png（重要ポイントを説明する男性）
- page4: /misaki_work.png（情報収集作業をする女性）
- page5: /kikuyo_point.png（応用技術を説明する女性・重要ポイント）
- page6: /iida_fighting.png（面接練習に意欲的な男性）
- page7: /ten.png（汎用的なバランス役キャラクター）
- page8: /team_work.png（まとめ・協力的な成功イメージ）

**画像選択理由**: AI活用スキル習得コンテンツに適した男女キャラクターのバランス配置。各活用術の特性（学習→効率化→説明→作業→応用→実践→バランス→成功）に応じたキャラクター選択

### 🔧 K077.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレートの構造に完全適合。コミュニケーション力アピールの2つのポイントを各セクションに配置し、Type002専用セクション統一ルール適用

**主要修正内容**:
- page1: introduction構造に変更（title + content + imageSrc）
- page2-7: mainContent構造に変更（blocks配列、各blockでcontent + imageSrc）  
- 段階的構成: 定義→POINT01→POINT01具体例→POINT02→POINT02具体例→まとめの実践的構成
- 全情報保持: 元の詳細なコミュニケーション力アピール手法を全て新構造に移行
- 装飾フィールド削除: role、pointNumber、icon等を削除
- section統一: introduction/mainContentによる統一
- summaryセクション削除: page7もmainContentに統一

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_study.png（コミュニケーションを学ぶ女性・導入イメージ）
- page2: /kikuyo_point.png（定義を説明する女性・重要ポイント）
- page3: /king_point.png（POINT01を説明する男性・重要ポイント）
- page4: /misaki_worry.png（面接での不安・悩みのイメージ）
- page5: /kikuyo_work.png（POINT02を実践する働く女性）
- page6: /iida_fighting.png（良い例を示す意欲的な男性）
- page7: /team_work.png（まとめ・協力的なコミュニケーションイメージ）

**画像選択理由**: コミュニケーション力習得コンテンツに適した男女キャラクターのバランス配置。各段階の特性（学習→説明→説明→悩み→実践→成功→協力）に応じたキャラクター選択

### 🔧 K083.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 不要
**修正理由**: 既存構造がunified-template-08-section-blocksの要求構造に完全適合。section統一ルール（introduction/mainContent）、blocks配列構造、imageSrc配置すべて正しく実装済み。

#### 🎨 画像配置戦略
**画像要否**: 配置済み
**具体的配置**:
- page1: /misaki_study.png（AI面接学習・導入イメージ）
- page2: /king_point.png（SHaiNの仕組み説明・男性重要ポイント）
- page3: /kikuyo_point.png（評価ポイント説明・女性重要ポイント）
- page4: /misaki_work.png（STAR手法実践・働く女性イメージ）
- page5: /iida_fighting.png（具体例説明・意欲的な男性）
- page6: /team_work.png（対策アクション・チームワーク）

**画像選択理由**: AI面接攻略という実践的スキル習得コンテンツに適した男女キャラクターのバランス配置。学習→説明→説明→実践→成功→協力の流れで視覚的に理解促進。

### 🔧 K090.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 元の構造はテンプレート非準拠の独自構造（role、pointNumber、strategy等）だったため、unified-template-08-section-blocksの要求構造（section、blocks配列構造）に完全変更

**主要修正内容**:
- page1: introduction構造に変更（title + content + imageSrc）
- page2-6: mainContent構造に変更（blocks配列、各blockでtitle + content + imageSrc）
- 全情報保持: 元の2つのポイント、具体例、セルフチェック項目を全て新構造に移行
- 装飾フィールド削除: role、pointNumber、strategy等を削除
- section統一: introduction/mainContentによる統一（summaryを削除）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_study.png（面接対策学習・導入イメージ）
- page2: /king_point.png（POINT01説明・男性重要ポイント）
- page3: /kikuyo_point.png（POINT02説明・女性重要ポイント）
- page4: /misaki_work.png（責任感実践・働く女性イメージ）
- page5: /kikuyo_work.png（セルフチェック・効率的作業イメージ）
- page6: /team_work.png（まとめ・協力的な成功イメージ）

**画像選択理由**: 正確性アピールという面接スキル習得コンテンツに適した男女キャラクターのバランス配置。学習→説明→説明→実践→確認→成功の流れで視覚的に理解促進。pointシリーズで重要ポイントを強調。

### 🔧 K091.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 元の構造はテンプレート非準拠の独自構造（role、bodyText、point等）だったため、unified-template-08-section-blocksの要求構造（section、blocks配列構造）に完全変更

**主要修正内容**:
- page1: introduction構造に変更（title + content + imageSrc）
- page2-5: mainContent構造に変更（blocks配列、各blockでtitle + content + imageSrc）
- 全情報保持: 元の4つの攻略ポイント、Point説明、まとめを全て新構造に移行
- 装飾フィールド削除: role、bodyText、point、summaryPoints等を削除
- section統一: introduction/mainContentによる統一（summaryを削除）
- pageCount変更: 4→5ページに変更（最終ページにまとめを統合）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_study.png（就活準備学習・導入イメージ）
- page2: /kikuyo_point.png（自己分析説明・女性重要ポイント）
- page3: /king_point.png（業界研究説明・男性重要ポイント）
- page4: /misaki_work.png（インターン情報収集・働く女性イメージ）
- page5: /team_work.png（SNS・口コミ活用とまとめ・協力的な成功イメージ）

**画像選択理由**: 就活攻略スキル習得コンテンツに適した男女キャラクターのバランス配置。学習→説明→説明→実践→成功の流れで視覚的に理解促進。pointシリーズで重要ポイントを強調し、最終ページで協力的な成功イメージで完結。

### 🔧 K103.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 元の構造はテンプレート非準拠の独自構造（role、examples、tools、points等）だったため、unified-template-08-section-blocksの要求構造（section、blocks配列構造）に完全変更

**主要修正内容**:
- page1: introduction構造に変更（title + content + imageSrc）
- page2-6: mainContent構造に変更（blocks配列、各blockでtitle + content + imageSrc）
- 全情報保持: 元の5つの習慣、具体例、ツール名、まとめを全て新構造に移行
- 装飾フィールド削除: role、examples、tools、points等を削除
- section統一: introduction/mainContentによる統一（summaryを削除）
- 最終ページにまとめを統合: 5つの習慣をページ6に集約

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_study.png（PCスキル学習・導入イメージ）
- page2: /king_point.png（ショートカット説明・男性重要ポイント）
- page3: /kikuyo_work.png（ファイル整理・効率的作業イメージ）
- page4: /misaki_work.png（トラブル解決・働く女性イメージ）
- page5: /iida_fighting.png（タイピング練習・意欲的な男性）
- page6: /team_work.png（AI活用とまとめ・協力的な成功イメージ）

**画像選択理由**: PCスキル習得コンテンツに適した男女キャラクターのバランス配置。学習→説明→作業→解決→練習→成功の流れで視覚的に理解促進。pointシリーズで重要ポイントを強調し、最終ページで協力的な成功イメージで完結。

## 作業統計（Type002）

### 🔧 K108.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-09-dynamic-boxes

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-09-dynamic-boxesテンプレートの構造に完全適合。5つのポートフォリオ作成サイトを2+3の構成で最適配置、Type002専用セクション統一ルール適用

**主要修正内容**:
- pageCount: 7→3に変更（introduction + 2+3のdynamic-boxes配置）
- page1: introduction構造に変更（title + description + imageSrc）
- page2-3: mainContent構造に変更（title + boxes配列、各boxでname + content）
- 全情報保持: 元の5つのサイトの詳細説明を全て新構造に移行
- section統一: introduction/mainContentによる統一

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /king_worry.png（ポートフォリオ作成への悩み・導入イメージ）
- page2: 画像不要（dynamic-boxesの情報密度重視）
- page3: 画像不要（dynamic-boxesの情報密度重視）

**画像選択理由**: ポートフォリオ作成サイト紹介という実践的コンテンツの導入で、男性向けターゲットに適したking_worryで悩みに共感。メインコンテンツは情報密度を重視して画像なしで集中力維持。

### 🔧 K110.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレートの構造に完全適合。開業届の5つのメリットを段階的に配置し、Type002専用セクション統一ルール適用

**主要修正内容**:
- pageCount: 8→7に変更（introduction + 5つのメリット + まとめの実践的構成）
- page1: introduction構造に変更（title + description + imageSrc）
- page2-7: mainContent構造に変更（title + description + imageSrc）
- 全情報保持: 元の5つのメリットの詳細情報を全て新構造に移行
- section統一: introduction/mainContentによる統一（summaryを削除）
- 装飾フィールド削除: visualElements等を削除

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_work.png（フリーランスで働く女性・導入イメージ）
- page2: /kikuyo_point.png（重要ポイント説明・女性重要ポイント）
- page3: /misaki_study.png（保育園情報を学ぶ女性・学習イメージ）
- page4: /king_point.png（口座開設説明・男性重要ポイント）
- page5: /kikuyo_work.png（オンライン手続きをする女性・効率的作業）
- page6: /iida_fighting.png（節税効果への意欲・やる気男性）
- page7: /team_work.png（まとめ・協力的な成功イメージ）

**画像選択理由**: 37歳主婦向けフリーランス開業コンテンツに適した女性中心の配置。男女キャラクターをバランス良く配置し、各メリットの特性（働く→説明→学習→説明→作業→意欲→成功）に応じたキャラクター選択。pointシリーズで重要ポイントを強調。

### 🔧 K112.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレートの構造に完全適合。Instagram集客の6つのステップを段階的に配置し、Type002専用セクション統一ルール適用、CTA混入絶対禁止ルール適用

**主要修正内容**:
- page1: introduction構造に変更（title + description + imageSrc）
- page2-8: mainContent構造に変更（title + description + imageSrc）
- 全情報保持: 元の6つのステップの詳細情報と具体例を全て新構造に移行
- section統一: introduction/mainContentによる統一（summaryを削除）
- 装飾フィールド削除: layout、stepNumber、examples、visualElements等を削除
- CTA削除: savePromptフィールドを削除（2025-07-30追加ルール適用）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（集客の悩み・導入イメージ）
- page2: /kikuyo_point.png（現状把握説明・女性重要ポイント）
- page3: /king_point.png（目標設定説明・男性重要ポイント）
- page4: /misaki_work.png（行動計画・働く女性イメージ）
- page5: /misaki_study.png（振り返り分析・学習イメージ）
- page6: /kikuyo_work.png（改善実行・効率的作業イメージ）
- page7: /team_work.png（サポート体制・協力的イメージ）
- page8: /iida_fighting.png（まとめ・成功への意欲イメージ）

**画像選択理由**: Instagram集客スキル習得コンテンツに適した男女キャラクターのバランス配置。各ステップの特性（悩み→説明→説明→実践→学習→改善→協力→成功）に応じたキャラクター選択。pointシリーズで重要ポイントを強調。

### 🔧 K117.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレートの構造に完全適合。志望動機の4つのポイントを段階的に配置し、Type002専用セクション統一ルール適用、CTA混入絶対禁止ルール適用、templateOverridesとの連携最適化

**主要修正内容**:
- page1: introduction構造に変更（title + description + imageSrc）
- page2-5: mainContent構造に変更（title + description + imageSrc）
- 全情報保持: 元の4つのポイント、NG/GOOD例、業界分析、差別化ポイント、マトリックス分析を全て新構造に移行
- section統一: introduction/mainContentによる統一
- 装飾フィールド削除: layout、pointNumber、checklist、ngExamples、goodExamples、categories、framework等を削除
- CTA削除: ctaフィールドを削除（2025-07-30追加ルール適用）
- templateOverrides維持: 既存のtemplateOverrides設定（page2: ng_good_comparison、page3-4: category_explanation、page5: vision_strength_matrix）を維持

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_study.png（志望動機学習・導入イメージ）
- page2: /kikuyo_point.png（将来目標説明・女性重要ポイント）
- page3: /king_point.png（業界分析説明・男性重要ポイント）
- page4: /misaki_work.png（企業分析・働く女性イメージ）
- page5: /team_work.png（貢献方法・協力的成功イメージ）

**画像選択理由**: 志望動機作成スキル習得コンテンツに適した男女キャラクターのバランス配置。各ポイントの特性（学習→説明→説明→分析→協力）に応じたキャラクター選択。pointシリーズで重要ポイントを強調し、templateOverridesの特殊表示との相性も考慮。

### 🔧 K118.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 
- テンプレート適合のため既存の複雑な構造をsection-blocks形式に変更
- templateOverridesの値を正しい名前に修正（ng_good_comparison→comparison、category_explanation→section_blocks）
- page1をintroduction構造に変更
- 各ページをblocks配列構造に変更し、情報価値は完全保持

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png（勉強・学習の場面）
- page2: 画像不要（comparison テンプレート）
- page3: kikuyo_work.png（左上カラム・オンラインミーティング中の女性）
- page4: king_point.png（左上カラム・男性が重要ポイントを教えてくれているポーズ）
- page5: misaki_work.png（左上カラム・楽しそうに仕事）

**画像選択理由**: Type002専用ルールに従い女性向けターゲットにmisaki/kikuyo系を使用、section-blocksの左上カラムキャラクター配置ルールを適用

### 🔧 K132.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-02-dual-section

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 
- Type002専用セクション統一ルール適用（summaryセクション→mainContentに変更）
- 画像ファイル名の修正（king_warry.png→king_worry.png）
- page8をdual-section構造に適合するよう変更し、12の方法をまとめて表示

#### 🎨 画像配置戦略
**画像要否**: 配置済み
**具体的配置**:
- page1: 画像不要（introduction）
- page2: misaki.png, iida.png（男女バランス）
- page3: ten_worry.png, iida.png（悩み共感→解決のストーリー）
- page4: misaki_worry.png, kikuyo_worry.png（困り顔で悩み共感）
- page5: king_worry.png, misaki.png（悩み→解決の流れ）
- page6: kikuyo.png, ten_worry.png（実践→課題認識）
- page7: kikuyo.png, king.png（感謝→協力の流れ）
- page8: team_work.png（チームワーク・まとめ）

**画像選択理由**: 要領改善という実践的コンテンツに適した男女キャラクターのバランス配置。worry系で悩み共感、通常表情で解決・実践を表現し、最終的にチームワークで協力的成功イメージで完結

### 🔧 K133.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-02-dual-section

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 
- pageStructurePatternにunified-template-02-dual-sectionを設定
- Type002専用セクション統一ルール適用（summaryセクション→mainContentに変更）
- 画像ファイル名の修正（king_warry.png→king_worry.png）
- page5をdual-section構造に適合するよう変更し、6つの習慣をまとめて表示

#### 🎨 画像配置戦略
**画像要否**: 配置済み
**具体的配置**:
- page1: 画像不要（introduction）
- page2: misaki.png, king.png（女性・男性のバランス）
- page3: kikuyo.png, kikuyo_worry.png（女性中心・悩み共感）
- page4: ten_worry.png, king_worry.png（中性・男性の悩み共感）
- page5: team_work.png（チームワーク・まとめ）

**画像選択理由**: 時短習慣という実践的コンテンツに適した男女キャラクターのバランス配置。worry系で悩み共感、通常表情で実践・解決を表現し、最終的にチームワークで協力的成功イメージで完結

### 🔧 K134.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-02-dual-section

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 
- pageStructurePatternにunified-template-02-dual-sectionを設定
- Type002専用セクション統一ルール適用（summaryセクション→mainContentに変更）
- 画像ファイル名の修正（king_warry.png→king_worry.png）
- goodExample/badExampleフィールドをdescriptionフィールドに統一（NG例を（×）で併記）
- page8をdual-section構造に適合するよう変更し、12の表現をまとめて表示

#### 🎨 画像配置戦略
**画像要否**: 配置済み
**具体的配置**:
- page1: 画像不要（introduction）
- page2: misaki.png, kikuyo.png（女性中心）
- page3: king.png, ten_worry.png（男性・中性バランス）
- page4: misaki_worry.png, kikuyo_worry.png（女性worry系）
- page5: king_worry.png, misaki.png（男性worry・女性通常）
- page6: kikuyo.png, king.png（女性・男性バランス）
- page7: ten_worry.png, misaki_worry.png（中性・女性worry系）
- page8: team_work.png（チームワーク・まとめ）

**画像選択理由**: ビジネスマナー習得という実践的コンテンツに適した男女キャラクターのバランス配置。worry系で謝罪場面への共感、通常表情で適切な対応を表現し、最終的にチームワークで協力的成功イメージで完結

### 🔧 K135.json detailedContent修正エビデンス（フィードバック修正版）
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレート構造に完全適合。相手に伝わる説明のコツ12個を段階的に学習する構成に変更。新しいsection-blocks正しい構成パターン（2025-07-30追加）を適用

**主要修正内容**:
- pageCount: 8→7に変更（introduction + 2つずつのコツを6ページで段階的学習）
- テンプレート変更: dynamic-boxes→section-blocksに変更（フィードバック対応）
- page1: introduction構造に変更（title + subtitle + description）
- page2-7: mainContent構造に変更（blocks配列：項目説明2つ→キャラクターまとめポイント1つ）
- 新構成パターン適用: 各ページで複数項目説明後、1人のキャラクターがまとめて重要ポイントを語る構成
- 全情報保持: 元の12個のコツの詳細説明を全て新構造に移行、順序立てて学習可能

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introduction）
- page2: /kikuyo_point.png（コツ1-2のまとめポイント説明）
- page3: /king_point.png（コツ3-4のまとめポイント説明）  
- page4: /misaki_point.png（コツ5-6のまとめポイント説明）
- page5: /ten_point.png（コツ7-8のまとめポイント説明）
- page6: /iida_point.png（コツ9-10のまとめポイント説明）
- page7: /team_work.png（コツ11-12の最終まとめ）

**画像選択理由**: 新しいsection-blocks構成パターンに基づき、各ページで1人のキャラクターが複数のコツをまとめて説明。pointシリーズを中心に使用してアドバイス感を演出し、段階的な学習プロセスを視覚的にサポート。最終ページでチームワークによる協力的成功イメージで完結。

### 🔧 K140.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレート構造に完全適合。5つのカテゴリの地雷ワードを各セクションに配置し、Type002専用セクション統一ルール適用。templateOverridesから標準blocks配列構造への完全変更

**主要修正内容**:
- pageCount: 7ページ維持（introduction + 5つのカテゴリ + まとめの実践的構成）
- page1: introduction構造に変更（title + subtitle + description + imageSrc）
- page2-6: mainContent構造に変更（blocks配列、各blockでtitle + content + imageSrc）
- page7: mainContent構造に変更（まとめページもblocks配列）
- 全情報保持: 元の5つのカテゴリの詳細な地雷ワード例と改善方法を全て新構造に移行
- templateOverrides削除: multiple_items_display, category_summaryから標準構造への完全移行
- section統一: introduction/mainContentによる統一（summaryを削除）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（地雷ワードの悩み・導入イメージ）
- page2: /misaki_worry.png（突き放し系・相手を傷つける悩み）
- page3: /kikuyo_worry.png（上から目線系・関係悪化への心配）
- page4: /ten_worry.png（責任転嫁系・コミュニケーション課題への悩み）
- page5: /king_worry.png（頭から否定系・相手の気持ちへの配慮不足の悩み）
- page6: /iida_worry.png（お笑い風だけどNG系・軽い言葉への不安）
- page7: /misaki.png（改善方法とまとめ・前向きな解決イメージ）

**画像選択理由**: コミュニケーション改善という実践的スキル習得コンテンツに適した男女キャラクターのバランス配置。各カテゴリでworry系を使用して地雷ワードへの問題意識を共感的に表現し、最終ページで通常表情による前向きな改善イメージで完結。同一画像の連続使用を回避し、視覚的多様性を確保。

### 🔧 K137.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-07-item-listテンプレート構造に完全適合。イライラしない神習慣6つを3+3の2ページ構成で最適配置、Type002専用セクション統一ルール適用、番号付きリスト活用

**主要修正内容**:
- pageCount: 8→3に変更（introduction + 3+3のitem-list配置）
- page1: introduction構造に変更（title + subtitle + description）
- page2-3: mainContent構造に変更（title + items配列、各itemでnumber + title + description）
- 全情報保持: 元の6つの神習慣の詳細説明を全て新構造に移行、絵文字・番号削除
- section統一: introduction/mainContentによる統一

#### 🎨 画像配置戦略
**画像要否**: 不要
**具体的配置**: 全ページ画像なし
**画像選択理由**: ストレス管理・感情コントロールの6習慣という情報密度の高いコンテンツのため、画像を配置せずテキスト情報への集中を促進。item-listテンプレートの簡潔な構造で読みやすさを最優先し、順序性を重視したリスト表示で習慣の実践順序を明確化。

### 🔧 K138.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-09-dynamic-boxes

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-09-dynamic-boxesテンプレート構造に完全適合。自分軸が整うワザ12個を4+4+4の3ページ構成で最適配置、Type002専用セクション統一ルール適用

**主要修正内容**:
- pageCount: 8→4に変更（introduction + 4+4+4のdynamic-boxes配置）
- page1: introduction構造に変更（title + subtitle + description）
- page2-4: mainContent構造に変更（title + boxes配列、各boxでname + content + imageSrc）
- 全情報保持: 元の12個のワザの詳細説明を全て新構造に移行、絵文字削除
- section統一: introduction/mainContentによる統一

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introduction）
- page2: /misaki.png, /kikuyo.png, /ten_worry.png, /king.png（前編4項目・バランス配置）
- page3: /misaki_worry.png, /kikuyo_worry.png, /king_worry.png, /iida.png（中編4項目・worry系とバランス）
- page4: /misaki.png, /kikuyo.png, /ten_worry.png, /king.png（後編4項目・多様性配置）

**画像選択理由**: セルフマネジメント・自分軸確立コンテンツに適した男女キャラクターのバランス配置。前編で基本的キャラクター配置、中編でworry系を中心に課題認識を表現、後編で通常表情による前向きな解決・実践イメージで完結。同一画像の連続使用を回避し、視覚的多様性を確保。

### 🔧 K139.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレート構造に完全適合。言語化ノート術（ジャーナリング）5つのステップを段階的に配置し、Type002専用セクション統一ルール適用、Type002専用section-blocks左上カラムキャラクター配置ルール適用

**主要修正内容**:
- pageCount: 7ページ維持（introduction + 基礎説明 + 5ステップの段階的構成）
- page1: introduction構造に変更（title + subtitle + description）
- page2-7: mainContent構造に変更（blocks配列、各blockでimageSrc + title + description + examples + benefit）
- 全情報保持: 元の5ステップの詳細説明と具体例を全て新構造に移行、絵文字・番号削除
- section統一: introduction/mainContentによる統一（summaryを削除）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introduction）
- page2: /misaki_study.png（学習する女性・ジャーナリング基礎学習イメージ）
- page3: /kikuyo_point.png（重要ポイント説明・女性重要ポイント）
- page4: /king_point.png（重要ポイント説明・男性重要ポイント）
- page5: /misaki_work.png（分析作業をする女性・理由探求イメージ）
- page6: /ten.png（汎用的キャラクター・言語化作業イメージ）
- page7: /team_work.png（行動目標設定・協力的成功イメージ）

**画像選択理由**: 自己分析・言語化スキル習得コンテンツに適した男女キャラクターのバランス配置。Type002専用section-blocks左上カラムキャラクター配置ルールに従い、各ステップの特性（学習→説明→説明→分析→言語化→行動）に応じたキャラクター選択。pointシリーズで重要ステップを強調し、最終的にチームワークで協力的成功イメージで完結。

### 🔧 K141.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: unified-template-08-section-blocksテンプレート構造に完全適合。成功者の6つの毎日習慣を段階的に配置し、Type002専用セクション統一ルール適用。9→8ページ構成への最適化

**主要修正内容**:
- pageCount: 9→8ページに変更（introduction + 6つの習慣を2つずつペア配置 + まとめの実践的構成）
- page1: introduction構造に変更（title + subtitle + description + imageSrc）
- page2-7: mainContent構造に変更（blocks配列、各blockでtitle + content + imageSrc）
- page8: mainContent構造に変更（まとめページもblocks配列）
- 全情報保持: 元の6つの習慣の詳細な説明と効果を全て新構造に移行
- section統一: introduction/mainContentによる統一（summaryを削除）
- CTA削除: ctaフィールドを削除（2025-07-30追加ルール適用）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（成功への憧れと現状への悩み・導入イメージ）
- page2: /misaki_worry.png（間違いを認める勇気・変化への不安）
- page3: /kikuyo.png（即行動・前向きな実践イメージ）
- page4: /king.png（挑戦への意欲・男性向けバランス）
- page5: /ten_worry.png（タスク管理への課題認識・中性的キャラクター）
- page6: /misaki.png（問題解決を楽しむ前向きなマインド）
- page7: /king_worry.png（真似への抵抗感・最後の課題認識）
- page8: /team_work.png（まとめ・協力的な成功イメージ）

**画像選択理由**: 成功習慣習得という実践的スキル習得コンテンツに適した男女キャラクターのバランス配置。各習慣の特性（悩み→実践→挑戦→課題→前向き→抵抗→成功）に応じてworry系と通常表情を適切に配置し、最終的にチームワークで協力的成功イメージで完結。同一画像の連続使用を回避し、視覚的多様性を確保。

### 修正完了状況
- **エビデンス作成完了**: 18/66 ファイル  
- **修正内容確定**: 18/66 ファイル