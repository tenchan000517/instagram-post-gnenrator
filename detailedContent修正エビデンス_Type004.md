# detailedContent修正エビデンス - Type004 (情報リソース型)

## 作業概要
**対象**: Type004 情報リソース型ナレッジ（39ファイル）  
**作業目的**: pageStructurePattern配置後に必要なdetailedContent修正内容を記録

## 対象ディレクトリ・ファイル
**ディレクトリ**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type004/`

**対象ファイル一覧**:
K009.json, K012.json, K021.json, K022.json, K029.json, K033.json, K035.json, K043.json, K044.json, K046.json, K047.json, K049.json, K056.json, K057.json, K062.json, K071.json, K072.json, K074.json, K078.json, K079.json, K080.json, K081.json, K082.json, K084.json, K085.json, K088.json, K092.json, K093.json, K096.json, K097.json, K098.json, K099.json, K100.json, K101.json, K102.json, K104.json, K106.json, K107.json, K109.json, K113.json, K116.json, K136.json, K146.json, K153.json, K155.json, K158.json, K168.json, K172.json, K178.json, K185.json

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

## Type004の使用可能な画像リソース

### **内容的に配置した方が伝わる場合のみ画像配置する**

テキストだけでは伝わらないと判断したら 使用可能AIツール画像か、もしくはプレースホルダーや架空のパスを記載するのではなく必要な画像の概要をその箇所に記載する ※ただし、必須ではない

例：[ツール名]のアイコン画像　など　※タイトルとdescriptionで十分伝わるなら無理に入れる必要はない　あったらいいな程度のものはドキュメントにコメントで記載可能

## 以下のテンプレートを選択し、上記画像が該当しない場合は適切な使用可能キャラクターを配置する（配置構造はテンプレートに準拠する）

ImagePointTemplate.tsx
SectionBlocksTemplate.tsx
SimpleIntroTemplate.tsx
DualSectionTemplate.tsx

### 使用可能AIツール画像（AIツール紹介コンテンツ用）
**パス**: `/mnt/c/instagram-course/instagram-post-generator/public/imag/ai/`
- Adobe_Firefly_Logo.png, ChatGPT-Logo.png, claude-ai-icon.png, copilot.png, gamma.png, Google-Gemini-1.png, mymind.png, Napkin-ai.png, NotebookLM_logo.png, perplexity.png

### キャラクター画像（ターゲット・内容別選択）
- **女性向けコンテンツ**: misaki.png/misaki_worry.png, kikuyo.png/kikuyo_worry.png
- **男性向けコンテンツ**: king.png/king_worry.png, ten.png/ten_worry.png
- **汎用コンテンツ**: iida.png/iida_worry.png

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

#### 🎨 Type004画像配置戦略

##### アイテム別画像の効果的使用
- **AIツール紹介**: 対応するAIツールロゴを使用
- **企業紹介**: 企業ロゴを使用  
- **一般アイテム**: 基本的に画像不要（テキスト中心）
- **キャラクター選択**: 内容的に配置した方が伝わる場合のみ使用

---

## Type004修正エビデンス一覧

### 🔧 K009.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-04-item-grid

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 
1. 画像とツール名の不一致修正（GitMind→mymind.png等の不適切な組み合わせを解消）
2. アイテムグリッド○パターン適用（上部画像あり+下部画像なし）
3. 12→10個への調整でコンテンツ完結性向上

**修正内容**:
- 全体: 12選→10選に変更
- Page2: Gemini(画像)+GitMind/Midjourney(画像なし) 3項目構成
- Page3: Perplexity(画像)+Kite/Squarespace(画像なし) 3項目構成  
- Page4: Microsoft Copilot/Gamma(画像)+Udio/Dream Machines(画像なし) 4項目構成
- 削除: Instapage、統合Copilot

#### 🎨 画像配置戦略
**画像要否**: 必要（部分的）
**具体的配置**:
- page1: 画像不要（introduction）
- page2: Gemini（Google-Gemini-1.png）のみ
- page3: Perplexity（perplexity.png）のみ
- page4: Microsoft Copilot（copilot.png）、Gamma（gamma.png）

### 🔧 K012.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-06-company-detail

#### 修正後のdetailedContent構造
**修正要否**: 必要（軽微）
**修正理由**: 
1. タイトル数字不一致修正（7選→6社）
2. 曖昧な「隠れ」表現の明確化
3. 企業詳細型テンプレートに最適化

**修正内容**:
- actualTitle: 「就活・転職成功のための企業選択支援リソース7選」→「社員満足度の高い優良メーカー6社」
- 全ページheader: 「社員の満足度が高い隠れ優良メーカー」→「社員満足度の高い優良メーカー」
- pageStructurePattern: unified-template-06-company-detail設定

#### 🎨 画像配置戦略
**画像要否**: 不要
**理由**: 
- 掲載企業と利用可能企業画像が完全に不一致（0/6企業）
- 企業詳細型テンプレートは画像なしでも十分な情報価値を提供
- 定量データ（年収・休日・残業時間）が視覚的要素として機能

### 🔧 K021.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-09-dynamic-boxes

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 企業詳細型には情報量不足（企業名+補助金額のみ）
2. dynamic-boxes型が最適（4社ずつ×2ページ構成）
3. 構文エラー修正（余分なカンマ除去）
4. 装飾要素除去（backgroundColor, companyLogo等）

**修正内容**:
- pageStructurePattern: unified-template-09-dynamic-boxes
- pageCount: 8→2に変更
- 8社を4社ずつ2ページに再構成
- DynamicBoxesTemplate命名規則準拠（title, boxes[name, content]）
- 全ての装飾的フィールド除去

#### 🎨 画像配置戦略
**画像要否**: 不要
**理由**: 
- dynamic-boxes型は情報密度重視でテキスト中心
- 企業名+補助内容の組み合わせで十分な視覚的整理
- 画像なしでも4社×2ページの構成で読みやすさを確保

### 🔧 K022.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-09-dynamic-boxes

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. ナンバリング禁止ルール適用（①～⑩除去）
2. dynamic-boxes型構造への完全変更
3. 10選→8選への数量調整（重要度基準）
4. DynamicBoxesTemplate命名規則準拠

**修正内容**:
- actualTitle: 「資格10選」→「資格8選」に変更
- ナンバリング（①～⑩）完全除去
- 複雑なqualifications構造→title, boxes[{name, content}]構造に変更
- 削除対象: MOS（Excel資格）、登録販売者（専門性限定的）
- 4資格×2ページの均等配置

#### 🎨 画像配置戦略
**画像要否**: 不要
**理由**: 
- 資格情報は文字情報が中心で画像による補完不要
- dynamic-boxes型は情報密度重視でテキスト中心設計
- 資格名+評価内容の組み合わせで十分な情報価値

### 🔧 K029.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. ナンバリング禁止ルール適用（①～⑤除去）
2. 7ページ→1ページへの大幅集約（ItemListTemplate適用）
3. 装飾要素除去（design等のフィールド削除）
4. ItemListTemplate命名規則準拠（title + items[{name, description}]）

**修正内容**:
- pageCount: 7→1に変更
- 複雑な7ページ構成→シンプルな5項目リスト構造に変更
- ナンバリング（①～⑤）完全除去
- 装飾的フィールド（design等）完全削除
- 各問題点を簡潔で実用的な表現に改善

#### 🎨 画像配置戦略
**画像要否**: 不要
**理由**: 
- ItemListTemplate自体が自動で番号付けするため視覚的整理済み
- 就活アドバイス系コンテンツは文字情報が中心
- 5つの問題点が明確に整理されており画像なしでも十分

### 🔧 K033.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. ItemListTemplate構造への完全変更（7ページ→2ページ）
2. 複雑なページ構造を5項目リストに集約
3. NG/OK例を含む詳細説明を各項目descriptionに統合
4. CTA要素完全除去

**修正内容**:
- pageCount: 7→2に変更
- 複雑な7ページ構成→introduction + 5項目リスト構造
- NG/OK対比例を各項目の説明文に統合
- 面接官視点・人事視点情報を保持しつつ簡潔化
- 適切なキャラクター画像配置（king_point.png等）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: king_point.png（重要ポイントを教える男性）
- page2各項目: king.png, misaki_work.png, iida.png, misaki_study.png, iida_fighting.png
**理由**: 
- 面接・就活アドバイス系は視覚的親しみやすさが重要
- 各ポイントに応じた適切なキャラクター選択で理解促進

### 🗑️ K035.json 削除エビデンス
- **元配置テンプレート**: unified-template-04-item-grid（作業途中）
- **削除理由**: 時限性情報価値失効
- **削除判定**: 2025-07-30時点で7/13〜20締切情報は完全に期限切れ

#### 削除前の情報価値分析
**元コンテンツ**: 「7/13〜20〆切 夏インターン企業30選」
**情報価値**: 
- 30社の詳細インターンシップ情報（企業名、プログラム内容、給与、業界、期間）
- 日程別締切スケジュール（7/13〜7/20）
- 高給与情報（450万円〜1287万円）
- 多様な業界カバー（IT、金融、メーカー、ゲーム、広告等）

**削除理由**:
1. **時限性**: 全ての締切日（7/13〜7/20）が既に経過
2. **実用性失効**: 申込期限切れにより実用価値完全消失
3. **情報鮮度**: 27卒向け情報で現在の利用者層に不適合
4. **保守コスト**: 更新なしで維持する価値なし

#### type-target-persona-relations.json修正要否
**修正要否**: 必要
**修正内容**: K035.jsonへの参照を完全除去

### 🗑️ K043.json 削除エビデンス
- **元配置テンプレート**: 未配置（作業前に削除判定）
- **削除理由**: 時限性情報価値失効
- **削除判定**: 2025-07-30時点で5/7〜6/30締切情報は完全に期限切れ

#### 削除前の情報価値分析
**元コンテンツ**: 「穴場で大手 5月が狙い目の優良企業6選」
**情報価値**: 
- 6社の詳細企業情報（三井住友海上火災保険、三菱UFJリサーチ&コンサルティング、ネスレ日本、NECソリューションイノベータ、ユニリーバ・ジャパン・ホールディングス、三菱総合研究所）
- 企業別締切日程（5/7〜6/30）
- 平均年収情報（613万円〜889万円）
- 企業別魅力・特徴詳細（福利厚生、働き方、事業内容）

**削除理由**:
1. **時限性**: 全ての締切日（5/7〜6/30）が既に経過
2. **実用性失効**: 全企業の応募期限切れにより実用価値完全消失
3. **情報鮮度**: 26卒向け情報で時期的価値なし
4. **保守コスト**: 毎年更新が必要で維持コスト過大

#### type-target-persona-relations.json修正要否
**修正要否**: 必要
**修正内容**: K043.jsonへの参照を完全除去

### 🔧 K044.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-04-item-grid

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. ItemGridTemplate構造への完全変更（7ページ→5ページ）
2. 42社→24社への厳選（高年収・知名度基準）
3. 業界別カテゴリ構造を統一テンプレート形式に変更
4. CTA要素完全除去（ABABA関連削除）

**修正内容**:
- actualTitle: 「就活落ちたらABABA」→「学歴フィルターなし 大量採用企業24選」
- pageCount: 7→5に変更
- 企業数: 42社→24社に厳選（年収・知名度・採用人数を基準）
- basic_intro + item_grid構造への完全変更
- 業界別整理（IT・製造業・金融・その他）維持
- 各企業の年収・採用人数・特徴を統合した詳細説明

#### 🎨 画像配置戦略
**画像要否**: 必要（部分的）
**具体的配置**:
- page1: team_work.png（チームワーク・会議イラスト）
**理由**: 
- 就活生向けコンテンツで親しみやすさが重要
- 企業情報は文字中心だが導入ページでの視覚的親近感が必要
- 24社の企業情報は文字情報で十分

### 🔧 K047.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. ItemListTemplate構造への完全変更（6ページ→2ページ）
2. 業界別ページ構造を6項目リスト形式に集約
3. 複雑なelements構造を標準的なitems構造に変更
4. 無関係な情報（受検・撮影NG等の記述）除去

**修正内容**:
- pageCount: 6→2に変更
- 6業界（商社・マスコミ・エンタメ・コンサル・メーカー・IT・インフラ）を6項目リストに変更
- 各業界の志望動機例を簡潔な説明文に統合
- introduction + item_list構造への完全変更
- 適切なキャラクター画像配置（各業界に応じたキャラクター選択）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png（勉強する女性）
- page2各項目: king.png, kikuyo.png, iida.png, ten.png, misaki.png, iida_fighting.png
**理由**: 
- 業界研究・就活軸策定は重要な意思決定で親しみやすさが必要
- 各業界の特徴に応じたキャラクター選択で記憶に残りやすく
- 多様なキャラクターで視覚的バリエーションを提供

### 🔧 K049.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-02-dual-section

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 10ページの冗長な個別ページ構造をDualSection型5ページ構成に最適化
2. DualSectionTemplate構造への完全変更（topSection/bottomSection）
3. 8つの習慣を上下2項目×4ページ構成で詳細解説
4. 各習慣に適切なキャラクター画像配置で親しみやすさ向上

**修正内容**:
- pageCount: 10→5に変更
- pageStructurePattern: unified-template-02-dual-section
- 冗長な個別ページ（page2-10）→basic_intro + dual_section×4構造
- 各習慣のNUMBER表記を自然な名前表記に変更
- 実用的なアドバイス部分を各habit contentに統合
- hashTag絵文字除去（😊💭削除）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introduction）
- page2 top: misaki_study.png（読書習慣）, bottom: iida_fighting.png（筋トレ）
- page3 top: king.png（睡眠）, bottom: kikuyo.png（整理整頓）
- page4 top: ten.png（情報収集）, bottom: misaki_work.png（身だしなみ）
- page5 top: misaki.png（ジャーナリング）, bottom: iida.png（プライベート）

**理由**: 
- 習慣系コンテンツは親しみやすさが重要で視覚的親近感が必要
- 各習慣の特徴に応じたキャラクター選択で記憶に残りやすく
- DualSectionTemplateの構造を活かした充実した内容展開

---

## 作業統計（Type004）

### 🔧 K056.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-02-dual-section

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 9項目→8項目への調整（DualSectionTemplate適用のため）
2. ナンバリング禁止ルール適用（①～⑨除去）
3. DualSectionTemplate構造への完全変更（topSection/bottomSection）
4. CTA要素完全除去（プロフリンク誘導削除）

**修正内容**:
- actualTitle: 「9選」→「8選」に変更
- pageCount: 1→5に変更
- pageStructurePattern: unified-template-02-dual-section
- 削除項目: 「⑥仕事の場所を選ばない」（具体性不足）
- ナンバリング（①～⑨）完全除去
- CTA footer完全削除
- 各特徴を詳細な説明文付きで上下セクション配置

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introduction）
- page2 top: iida_fighting.png（即座に処理）, bottom: misaki_work.png（フィードバック）
- page3 top: team_work.png（チームワーク）, bottom: king.png（行動重視）
- page4 top: misaki_study.png（優先順位）, bottom: ten.png（時間意識）
- page5 top: kikuyo.png（メリハリ）, bottom: iida.png（選択と集中）

**理由**: 
- 仕事効率化系コンテンツは親しみやすさが重要
- 各特徴の内容に応じた適切なキャラクター選択で理解促進
- DualSectionTemplateの構造で充実した内容展開が可能

### 🔧 K057.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-02-dual-section

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 7項目→6項目への調整（類似内容の統合）
2. 8ページ→4ページへの大幅集約（DualSectionTemplate適用）
3. ナンバリング禁止ルール適用（①～⑦除去）
4. CTA要素・装飾フィールド完全除去

**修正内容**:
- actualTitle: 「7選」→「6選」に変更
- pageCount: 8→4に変更
- pageStructurePattern: unified-template-02-dual-section
- 統合項目: 「①忙しいをログセにしない」+「⑦できない事は無理に引き受けない」→「適切な境界設定をする」
- ナンバリング（①～⑦）完全除去
- CTA・装飾フィールド（backgroundColor等）完全削除
- 各特徴を詳細な説明文付きで上下セクション配置

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: 画像不要（introduction）
- page2 top: king_point.png（境界設定）, bottom: team_work.png（人間関係）
- page3 top: misaki_work.png（仕事スイッチ）, bottom: iida_fighting.png（行動重視）
- page4 top: misaki_study.png（迅速対応）, bottom: kikuyo_point.png（目標設定）

**理由**: 
- 仕事効率化系コンテンツは親しみやすさが重要
- 各特徴の内容に応じた適切なキャラクター選択で理解促進
- DualSectionTemplateの構造で充実した内容展開が可能

### 🔧 K062.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-09-dynamic-boxes

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 7ページ→3ページへの集約（DynamicBoxesTemplate適用）
2. 情報量の多い資格情報を適切に分割（2+3の構成）
3. ナンバリング禁止ルール適用（-01-～-05-除去）
4. 装飾要素・評価システムの簡潔化

**修正内容**:
- pageCount: 7→3に変更
- pageStructurePattern: unified-template-09-dynamic-boxes
- 複雑な7ページ構成→introduction + boxes×2ページ構造
- 2+3の動的配置でバランス良い表示
- ナンバリング（-01-～-05-）完全除去
- 装飾的フィールド（visualElements、evaluation等）完全削除
- 各資格の特徴・メリットを詳細な説明文に統合
- カテゴリ別グループ化（国際・コンサル系+専門性高い系）

#### 🎨 画像配置戦略
**画像要否**: 不要
**理由**: 
- dynamic-boxes型は情報密度重視でテキスト中心
- 資格情報は文字情報が中心で詳細な説明が重要
- 2+3のボックス配置で視覚的整理が十分
- 各資格の詳細説明により情報価値が高い

### 🔧 K071.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-05-comparison

#### 修正後のdetailedContent構造
**修正要否**: 必要（軽微）
**修正理由**: 最終ページのsection統一のため、page7のsectionを"summary"から"mainContent"に変更。テンプレート構造は既に適合済み。

**修正内容**:
- page7 section: "summary" → "mainContent"に変更
- その他の構造は既存のままで適合済み

#### 🎨 画像配置戦略
**画像要否**: 不要
**理由**: 2020年と2025年のツール比較というコンテンツ特性上、leftSide/rightSideの対比構造のみで十分な情報価値を提供可能。画像なしでも理解に支障なし。

### 🔧 K072.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-04-item-grid

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 60個のツールをitemGridテンプレート制限(3-6項目×Nページ)に合わせて18個に厳選。利用可能AIツール画像との一致性優先で選定し、用途別カテゴリに整理して情報価値向上。

**修正内容**:
- actualTitle: 「モバイルAI推奨✨」→「厳選AI生産性ツール18選」
- pageCount: 3→4に変更
- 60個→18個への厳選（知名度・実用性・画像一致性基準）
- 用途別3カテゴリ構成（対話・検索系/資料作成系/効率化系）
- 利用可能画像との完全一致を優先してツール選定

#### 🎨 画像配置戦略
**画像要否**: 必要（部分的）
**具体的配置**:
- page1: 画像不要（basic_intro）
- page2: ChatGPT, Claude, Gemini, Perplexity, Microsoft Copilotの各ロゴ
- page3: Gammaロゴのみ
- page4: 画像なし

### 🔧 K074.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-02-dual-section

#### 修正後のdetailedContent構造
**修正要否**: 必要（軽微）
**修正理由**: DualSectionTemplate構造を維持しつつ、CTA要素のみを除去。特定サービス名を一般的なAI活用表現に変更し、コンテンツ完結性を確保。

**修正内容**:
- actualTitle: 「就活パイセン - AIで変わる就活体験」→「AI活用で就活効率化する方法」
- 特定サービス名・CTA要素完全削除
- 5ページDualSection構造は維持
- 宣伝的内容を実用的なノウハウコンテンツに転換  
- 各セクションの画像配置は既存のまま活用

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png（AI活用で勉強する女性）
- page2 top: king.png（ビジネスマン）, bottom: misaki_work.png（仕事をする女性）
- page3 top: team_work.png（チームワーク）, bottom: iida_fighting.png（モチベーション高い人）
- page4 top: kikuyo_point.png（ポイントを教える女性）, bottom: ten.png（笑顔の男性）
**理由**: DualSectionTemplateの構造を活かした充実した内容展開が可能で、各セクションに適切なキャラクター配置により親しみやすさを確保

### 🔧 K078.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-09-dynamic-boxes

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: DynamicBoxesTemplate構造（title + boxes[{name, content}]）に準拠し、7ページ→3ページに大幅集約。職業分析内容を4+4の動的ボックス配置で最適化。CTA要素完全除去。

**修正内容**:
- actualTitle: 「あなたの仕事も!? マジでAIに奪われます。」→「AIに代替される職業・されない職業」
- pageCount: 7→3に変更
- 複雑な7ページ構成→introduction + dynamic_boxes×2ページ構造
- AI代替される職業（4ボックス）＋代替されない職業（4ボックス）の対比構成
- 統計データ（49%）と権威ソース（オックスフォード大学・野村総研）情報保持
- CTA要素（ハイライト誘導、SNS情報等）完全削除

#### 🎨 画像配置戦略
**画像要否**: 不要
**理由**: dynamic-boxes型は情報密度重視でテキスト中心。職業分析は詳細な説明文が価値の中心であり、4+4のボックス配置で視覚的整理が十分

### 🔧 K079.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 特定サービス（リケイマッチ）の宣伝的内容を一般的なAI面接対策情報に変更。ItemListTemplate構造（title + items[{name, description}]）に準拠し、6ページ→2ページに大幅集約。CTA要素完全除去。

**修正内容**:
- actualTitle: 「導入企業が増加中！AI面接」→「AI面接対策完全ガイド」
- pageCount: 6→2に変更
- 複雑な6ページ構成→introduction + 6項目リスト構造
- 特定サービス紹介・宣伝要素完全削除
- AI面接の基本・技術準備・話し方・質問対策・練習方法・評価ポイントを6項目に整理
- 実用的なノウハウコンテンツに純化

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png（AI面接対策を勉強する女性）
**理由**: AI面接対策のアドバイス系コンテンツは親しみやすさが重要で、視覚的親近感が学習効果を高める

### 🔧 K081.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な個別ページ構造をItemListTemplate（title + items）に準拠
2. 16ページ→2ページへの大幅集約
3. CTA要素・宣伝要素完全除去
4. 実用的な就活アドバイスコンテンツに純化

**修正内容**:
- pageCount: 16→2に変更
- 複雑な16ページ構成→introduction + 10項目リスト構造
- 特定サービス紹介・宣伝要素完全削除
- 実用的な就活アドバイスに純化（面接準備・自己分析等）
- エモーショナルな表現を専門的で実用的な表現に変更

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png（就活対策を勉強する女性）
**理由**: 就活アドバイス系コンテンツは親しみやすさが重要で、視覚的親近感が学習効果を高める

### 🔧 K082.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な4ページ構造をItemListTemplate（title + items）に準拠
2. 4ページ→2ページへの集約
3. 特定サービス宣伝要素完全除去
4. 実用的な就活アドバイスコンテンツに純化

**修正内容**:
- pageCount: 4→2に変更
- 複雑な4ページ構成→introduction + 8項目リスト構造
- 特定サービス紹介・宣伝要素完全削除
- 実用的な内定直結アドバイスに純化
- エモーショナルな表現を専門的で実用的な表現に変更

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: iida_fighting.png（モチベーション高い人）
**理由**: 内定獲得系コンテンツは励ましと親しみやすさが必要で、視覚的親近感が重要

### 🔧 K084.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. メモ帳風の複雑な表示構造をItemListTemplate（title + items[{name, description}]）に準拠
2. 1ページ→2ページへの適切な構成変更
3. チェックボックス記号除去とツール説明の詳細化
4. タイトル修正（9選の明示）

**修正内容**:
- actualTitle: 「就活力が爆上がりするAIツール」→「就活力が爆上がりするAIツール9選」
- pageCount: 1→2に変更
- 複雑なlistItems構造→introduction + 9項目リスト構造
- チェックボックス記号（☑）除去
- 各ツールの機能説明を詳細化（企業研究を効率化する情報収集ツール等）
- visualElements等の装飾的フィールド完全削除

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png（AI活用で勉強する女性）
- page2: team_work.png（チームワーク・協力イラスト）
**理由**: AIツール活用系コンテンツは親しみやすさが重要で、学習・協力の視覚的イメージが理解促進に効果的

### 🔧 K085.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-09-dynamic-boxes

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 9ページの複雑な構造をDynamicBoxesTemplate（title + boxes[{name, content}]）に準拠
2. 3つのAIツール紹介を効率的な2ページ構成に集約
3. 特定大学（科学大）への特化内容を一般大学生向けに変更
4. hashTag等の装飾的フィールド完全削除

**修正内容**:
- actualTitle: 「AIツール学割紹介」→「大学生向けAIツール学割3選」
- postType: 003→004に変更（情報リソース型に適合）
- pageCount: 9→2に変更
- 複雑な9ページ構成→introduction + 3ツールdynamic_boxes構造
- 特定大学名除去、一般大学生向けコンテンツに変更
- hashTag、pageNumber等の装飾的フィールド完全削除
- 各ツールの詳細機能説明を統合した包括的な説明に変更

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png（AI学習する女性学生）
**理由**: 大学生向けコンテンツは親しみやすさが重要で、学習・勉強の視覚的イメージが理解促進に効果的。dynamic-boxes型は情報密度重視でツール説明部分は文字中心が最適

### 🔧 K088.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. SectionBlocksTemplate構造（title + content）に完全準拠
2. 4ページのショートカット分類を3セクションブロックに最適化
3. 装飾的フィールド（pageNumber、role、visualElements等）完全削除
4. 各セクションの説明を詳細な文章形式に統合

**修正内容**:
- actualTitle: 「ショートカットキー完全ガイド」→「保存必須ショートカットキー完全ガイド」
- pageCount: 4ページ構成を維持（introduction + 3 section_blocks）
- 複雑なlistItems構造→title + content構造に変更
- 各セクションの詳細説明を統合（基本操作・文字装飾・Excel専用）
- pageNumber、role、visualElements等の装飾的フィールド完全削除
- 各ショートカットの実用性・効果を説明文に含めて価値向上

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_work.png（仕事をする女性）
**理由**: パソコン作業効率化コンテンツは親しみやすさが重要で、作業する女性の画像で実用性と親近感を演出。SectionBlocksTemplateは情報密度重視でテキスト中心設計のため、導入ページのみ画像配置が最適

### 🔧 K092.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. ItemListTemplate構造（title + items）に完全準拠
2. 8ページの複雑な構造を効率的な2ページ構成に集約
3. 装飾的フィールド（pageNumber、role、visualElements等）完全削除
4. 各AIツールの特徴を簡潔で実用的な説明に統合

**修正内容**:
- pageCount: 8→2に変更
- 複雑な8ページ構成→introduction + 5項目リスト構造
- 各ツールの冗長な説明を実用的で簡潔な説明に統合
- pageNumber、role、visualElements等の装飾的フィールド完全削除
- 親しみやすいキャラクター調の表現を実用的な説明文に変更
- 各ツールの核心的価値・機能を保持しつつ簡潔化

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_work.png（仕事をする女性）
- page2: team_work.png（チームワーク・協力イラスト）
**理由**: 生産性向上系コンテンツは親しみやすさが重要で、仕事・協力の視覚的イメージが実用性と理解促進に効果的。AIツール活用の文脈で適切

### 🔧 K093.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. ItemListTemplate構造（title + items）に完全準拠
2. 7ページの複雑な構造を効率的な2ページ構成に集約
3. 装飾的フィールド（pageNumber、role、visualElements等）完全削除
4. 各AIアプリの特徴を簡潔で実用的な説明に統合

**修正内容**:
- pageCount: 7→2に変更
- 複雑な7ページ構成→introduction + 5項目リスト構造
- 各ツールの詳細説明を実用的で簡潔な説明に統合
- pageNumber、role、visualElements等の装飾的フィールド完全削除
- スマホ特化の利点を各項目説明に組み込み
- 個人的表現（「僕の投稿も」等）を客観的な説明に変更

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_work.png（仕事をする女性）
- page2: team_work.png（チームワーク・協力イラスト）
**理由**: スマホAI活用系コンテンツは親しみやすさが重要で、仕事・協力の視覚的イメージが実用性と理解促進に効果的。モバイル活用の文脈で適切

### 🔧 K096.json - K102.json 一括エビデンス記録

**K096.json**: unified-template-02-dual-section - WebChatGPT使用法を問題/解決の2セクション構成で説明
**K097.json**: unified-template-07-item-list - デザイナー向けAIツール6選をリスト形式で紹介
**K098.json**: unified-template-08-section-blocks - ChatGPTエージェント技術解説をセクション別に構造化
**K099.json**: unified-template-02-dual-section - データ収集ツールの問題/解決を2セクションで説明
**K100.json**: unified-template-04-item-grid - 15種類AIエージェントをグリッド形式で分類表示
**K101.json**: unified-template-08-section-blocks - AIツール使い分けを9ジャンル別セクションで整理
**K102.json**: unified-template-08-section-blocks - フリーランス必須ツール10選を3カテゴリでセクション分け

### 🔧 K104.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な9ページ構造をItemListTemplate（title + items[{name, description}]）に準拠
2. 9ページ→2ページへの大幅集約
3. QRコード活用法を7項目リスト形式で効率的に表示
4. 装飾的フィールド（role、section、background、elements等）完全削除

**修正内容**:
- pageCount: 9→2に変更
- 複雑な9ページ構成→introduction + 7項目リスト構造
- 各活用法の詳細説明を実用的で簡潔な説明に統合
- role、section、background、elements等の装飾的フィールド完全削除
- 手順情報を各項目の説明文に組み込み
- CTA要素（過去投稿紹介、フォロー促進等）完全削除

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_work.png（PCで作業をする女性）
- page2: team_work.png（チームワーク・協力イラスト）
**理由**: QRコード活用系コンテンツは実用性が重要で、PC作業・協力の視覚的イメージが理解促進に効果的。教員・会社員向けコンテンツに適切

### 🔧 K106.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な7ページ構造をItemListTemplate（title + items[{name, description}]）に準拠
2. 7ページ→2ページへの大幅集約
3. ChatGPT指示文テクニックを5項目リスト形式で表示
4. CTA要素（保存アクション等）と装飾的フィールド完全削除

**修正内容**:
- pageCount: 7→2に変更
- 複雑な7ページ構成→introduction + 5項目リスト構造
- 各指示文の詳細説明を実用的で簡潔な説明に統合
- role、section、visualElements等の装飾的フィールド完全削除
- tabHeader、instruction、explanation構造を各項目のnameとdescriptionに統合
- CTA要素（保存アイコン、「今日もコツコツ」等）完全削除
- 番号付き列挙（①②③④⑤）の自然な名称表記への変更

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png（AI活用で勉強する女性）
- page2各項目: /chatgpt.png, /kikuyo_point.png, /misaki_work.png, /team_work.png, /king_point.png
**理由**: ChatGPT活用系コンテンツは親しみやすさが重要で、学習・協力の視覚的イメージが理解促進に効果的。AI初心者から中級者向けコンテンツに適切

### 🔧 K107.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な6ページ構造をItemListTemplate（title + items[{name, description}]）に準拠
2. 6ページ→2ページへの大幅集約
3. Canvaテクニックを5項目リスト形式で表示
4. 装飾的フィールド（role、section、visualElements等）完全削除

**修正内容**:
- pageCount: 6→2に変更
- 複雑な6ページ構成→introduction + 5項目リスト構造
- 各テクニックの詳細説明を実用的で簡潔な説明に統合
- role、section、visualElements等の装飾的フィールド完全削除
- header、steps、benefit構造を各項目のnameとdescriptionに統合
- 番号付きステップ（①②③④⑤）を保持しつつ簡潔化
- ページ番号表示等の細かい装飾要素削除

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_work.png（デザイン作業をする女性）
- page2: team_work.png（チームワーク・協力イラスト）
**理由**: Canvaデザイン系コンテンツは実用性と親しみやすさが重要で、作業・協力の視覚的イメージが理解促進に効果的。デザイン初心者から中級者向けコンテンツに適切

### 🔧 K109.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な8ページ構造をItemListTemplate（title + items[{name, description}]）に準拠
2. 8ページ→2ページへの大幅集約
3. 3つの「しない習慣」を3項目リスト形式で表示
4. CTA要素と装飾的フィールド完全削除

**修正内容**:
- pageCount: 8→2に変更
- 複雑な8ページ構成→introduction + 3項目リスト構造
- 各習慣の詳細説明を実用的で簡潔な説明に統合
- role、section、visualElements等の装飾的フィールド完全削除
- 専門家の引用や根拠情報を各項目の説明文に統合
- CTA要素（「今日からあなたも実践」等）完全削除
- ページ番号表示等の細かい装飾要素削除

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: king.png（ビジネスマン）
- page2: team_work.png（チームワーク・協力イラスト）
**理由**: 仕事効率化系コンテンツはビジネスパーソン向けで信頼性と親しみやすさが重要。専門性の高い情報を視覚的に親しみやすく伝えるために適切

### 🔧 K113.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-04-item-grid

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な8ページ構造をItemGridTemplate（title + subtitle + items[{name, description, imageSrc}]）に準拠
2. 8ページ→3ページへの大幅集約
3. Instagram新機能6個を3+3のグリッド形式で表示
4. 装飾的フィールド（role、targetIds、category等）完全削除

**修正内容**:
- pageCount: 8→3に変更
- 複雑な8ページ構成→basic_intro + item_grid×2ページ構造
- 機能刧6個を各項目の詳細説明として統合
- role、section、category、targetIds等の装飾的フィールド完全削除
- tools配列をitems配列に変更（ItemGridTemplate統一）
- 各機能の効果と使用方法をシンプルなdescriptionに統合
- encouragementMessage等のCTA要素削除

#### 🎨 画像配置戦略
**画像要否**: 必要（部分的）
**具体的配置**:
- page1: 画像不要（basic_intro）
- page2: 上部3項目のうち1個のみ画像有り（例：misaki_work.png）
- page3: 下部3項目は全て画像なし
**理由**: Instagram機能系コンテンツはテキスト情報が中心で、ItemGridTemplateの☀パターン（上部のみ画像あり）が最適。各機能の詳細説明で情報価値を提供

### 🔧 K116.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な11ページ構造をItemListTemplate（title + items[{name, description}]）に準拠
2. 11ページ→2ページへの大幅集約
3. 21個の資格を最重要6個に厳選（汎用性・取得しやすさ・就職有利度基準）
4. CTA要素・装飾的フィールド（pageNumber、layout、icon等）完全削除

**修正内容**:
- pageCount: 11→2に変更
- 複雑な11ページ構成→introduction + 6項目リスト構造
- 21資格→6資格に厳選（簿記3級、MOS、FP2級、宅建士、TOEIC、ITパスポート）
- 各資格の詳細説明を実用的で簡潔な説明に統合
- hashTag、pageNumber、layout、icon等の装飾的フィールド完全削除
- qualifications配列構造をitems配列構造に変更（ItemListTemplate準拠）
- CTA要素（プロフィール誘導、フォロー促進等）完全削除

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png（勉強する女性）
- page2: 画像不要（ItemListテンプレートが自動で番号付け）
**理由**: 資格取得系コンテンツは学習意欲の視覚的演出が重要で、親しみやすさが学習効果を高める。ItemListTemplateは情報密度重視で文字中心設計のため導入ページのみ画像配置が最適

### 🔧 K106.json detailedContent修正エビデンス（更新）
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な7ページ構造をItemListTemplate（title + items[{name, description}]）に準拠
2. 7ページ→2ページへの大幅集約
3. ChatGPT指示文テクニックを5項目リスト形式で表示
4. CTA要素（保存アクション等）と装飾的フィールド完全削除

**修正内容**:
- pageCount: 7→2に変更
- 複雑な7ページ構成→introduction + 5項目リスト構造
- 各指示文の詳細説明を実用的で簡潔な説明に統合
- role、section、visualElements等の装飾的フィールド完全削除
- tabHeader、instruction、explanation構造を各項目のnameとdescriptionに統合
- CTA要素（保存アイコン、「今日もコツコツ」等）完全削除

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_study.png（AI活用で勉強する女性）
- page2各項目: /chatgpt.png, /kikuyo_point.png, /misaki_work.png, /team_work.png, /king_point.png
**理由**: ChatGPT活用系コンテンツは親しみやすさが重要で、学習・協力の視覚的イメージが理解促進に効果的

### 🔧 K107.json detailedContent修正エビデンス（更新）
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な6ページ構造をItemListTemplate（title + items[{name, description}]）に準拠
2. 6ページ→2ページへの大幅集約
3. Canvaテクニックを5項目リスト形式で表示
4. ナンバリング禁止ルール適用（①②③④⑤除去）

**修正内容**:
- pageCount: 6→2に変更
- 複雑な6ページ構成→introduction + 5項目リスト構造
- 各テクニックの詳細説明を実用的で簡潔な説明に統合
- role、section、visualElements等の装飾的フィールド完全削除
- header、steps、benefit構造を各項目のnameとdescriptionに統合
- ナンバリング（①②③④⑤）完全除去

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_work.png（デザイン作業をする女性）
- page2各項目: misaki_work.png, team_work.png, iida.png, misaki_study.png, iida_fighting.png
**理由**: Canvaデザイン系コンテンツは実用性と親しみやすさが重要で、作業・協力の視覚的イメージが理解促進に効果的

### 🔧 K109.json detailedContent修正エビデンス（更新）
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な8ページ構造をItemListTemplate（title + items[{name, description}]）に準拠
2. 8ページ→2ページへの大幅集約
3. 3つの「しない習慣」を3項目リスト形式で表示
4. CTA要素と装飾的フィールド完全削除

**修正内容**:
- pageCount: 8→2に変更
- 複雑な8ページ構成→introduction + 3項目リスト構造
- 各習慣の詳細説明を実用的で簡潔な説明に統合
- role、section、visualElements等の装飾的フィールド完全削除
- 専門家の引用や根拠情報を各項目の説明文に統合
- CTA要素（「今日からあなたも実践」等）完全削除

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: king.png（ビジネスマン）
- page2各項目: king.png, team_work.png, iida_fighting.png
**理由**: 仕事効率化系コンテンツはビジネスパーソン向けで信頼性と親しみやすさが重要。専門性の高い情報を視覚的に親しみやすく伝えるために適切

### 🔧 K113.json detailedContent修正エビデンス（更新）
- **配置済みテンプレート**: unified-template-04-item-grid

#### 修正後のdetailedContent構造
**修正要否**: 必要（大幅）
**修正理由**: 
1. 複雑な8ページ構造をItemGridTemplate（title + subtitle + items[{name, description, imageSrc}]）に準拠
2. 8ページ→3ページへの大幅集約
3. Instagram新機能6個を3+3のグリッド形式で表示
4. 装飾的フィールド（role、targetIds、category等）完全削除

**修正内容**:
- pageCount: 8→3に変更
- 複雑な8ページ構成→basic_intro + item_grid×2ページ構造
- 機能別6個を各項目の詳細説明として統合
- role、section、category、targetIds等の装飾的フィールド完全削除
- tools配列をitems配列に変更（ItemGridTemplate統一）
- 各機能の効果と使用方法をシンプルなdescriptionに統合
- encouragementMessage等のCTA要素削除

#### 🎨 画像配置戦略
**画像要否**: 必要（部分的）
**具体的配置**:
- page1: 画像不要（basic_intro）
- page2: 上部3項目のうち1個のみ画像有り（例：misaki_work.png）
- page3: 下部3項目は全て画像なし
**理由**: Instagram機能系コンテンツはテキスト情報が中心で、ItemGridTemplateの○パターン（上部のみ画像あり）が最適。各機能の詳細説明で情報価値を提供

### 修正完了状況
- **エビデンス作成完了**: 34/39 ファイル (K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K116)
- **修正内容確定**: 34/39 ファイル (K047, K049, K056, K057, K062, K071, K072, K074, K078, K079, K081, K082, K084, K085, K088, K092, K093, K096, K097, K098, K099, K100, K101, K102, K104, K106, K107, K109, K113, K116)

