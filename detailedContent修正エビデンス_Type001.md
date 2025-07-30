# detailedContent修正エビデンス - Type001 (感情共感型)

## 作業概要
**対象**: Type001 感情共感型ナレッジ（31ファイル）  
**作業目的**: pageStructurePattern配置後に必要なdetailedContent修正内容を記録

## 対象ディレクトリ・ファイル
**ディレクトリ**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type001/`


#### 基本情報
- **ファイルパス**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type001/[ファイル名].json`
- **テンプレート定義ファイル**: `/mnt/c/instagram-course/instagram-post-generator/app/services/knowledgeBase/data/pageStructures/unified/[テンプレート名].json`

**対象ファイル一覧**:
K001.json, K007.json, K008.json, K017.json, K027.json, K030.json, K032.json, K037.json, K038.json, K041.json, K050.json, K052.json, K053.json, K054.json, K055.json, K058.json, K059.json, K060.json, K061.json, K063.json, K065.json, K105.json, K111.json, K114.json, K115.json, K148.json, K149.json, K151.json, K160.json, K180.json, K183.json

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

## Type001の使用可能な画像リソース

### **内容的にを配置した方が伝わる内容の場合は画像を配置する**

## 以下のテンプレートを選択した場合は適切な使用可能キャラクターを配置する（配置構造はテンプレートに準拠する）

ImagePointTemplate.tsx
SectionBlocksTemplate.tsx
SimpleIntroTemplate.tsx
DualSectionTemplate.tsx

### キャラクター画像（ターゲット・内容別選択）
- **女性向けコンテンツ**: misaki.png/misaki_worry.png, kikuyo.png/kikuyo_worry.png
- **男性向けコンテンツ**: king.png/king_worry.png, ten.png/ten_worry.png
- **汎用コンテンツ**: iida.png/iida_worry.png
- **仕事関連コンテンツ**: misaki_work.png（楽しそうに仕事）, misaki_busy.png（忙しそうに仕事）
- **学習・状態コンテンツ**: misaki_study.png（勉強中）, iida_fighting.png（モチベーション高）, iida_sleepy.png（眠そう）, iida_sorry.png（謝罪）

### 画像選択基準（Type001特化）
- **共感シーン**: 困り顔画像 (_worry.png) を使用
- **解決・希望シーン**: 通常表情画像 (.png) を使用
- **連続使用回避**: 同一ページ内で同じキャラクターの画像を連続使用しない

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

#### 🎨 Type001画像配置戦略

##### キャラクター選択ルール
- **ターゲット判定**: `marketingStage`や`problemCategory`などから判定
- **感情表現**: 困りごと→worry、解決→通常表情
- **バランス配慮**: ページ間での画像バリエーション確保　同一キャラクターは基本的に使用しない

---

## Type001修正エビデンス一覧

### 🔧 K001.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
既存構造を維持（感情共感型に適合）
- page1: 導入・共感誘発
- page2-7: 各あるある（simple-introで感情的共感重視）
- page8: 感情的クライマックスから希望転換

#### 🎨 画像配置戦略
- 各ページにキャラクター画像で感情共感を演出
- 推奨キャラ: misaki_worry.png（働く女性ターゲット）

---

### 🔧 K007.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: page2の5つの特徴を6ページに分割して感情共感型に最適化、pageCountを2→6に変更、各特徴を個別ページで深く共感できる構成に変更

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: ten.png
- page2: king.png
- page3: iida.png
- page4: misaki.png
- page5: kikuyo.png
- page6: ten_worry.png

### 🔧 K055.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-04-item-grid

#### 修正後のdetailedContent構造
既存のリスト構造をグリッド型に最適化
- page1-7: 各ページ3項目をグリッド表示（項目1にキャラクター、項目2-3はテキストのみ）
- page8: まとめページ（既存構造維持）

#### 🎨 画像配置戦略
- ページ1-7の各ページ項目1にキャラクター画像配置
- 21項目リストのため全項目にキャラクターは不要
- 推奨キャラ: misaki.png, king.png, kikuyo.png, ten.png, iida.png, misaki_worry.png, iida_worry.png（7ページ用）

### 🔧 K054.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
既存構造を維持（内向型タイプ別セクション構造に適合）
- page1: 導入・問題提起
- page2-5: 各内向型タイプの特徴と適職（セクションブロック形式）
- page6-7: 仕事選びのコツと追加アドバイス

#### 🎨 画像配置戦略
- 各ページにキャラクター画像で繊細な内向型への共感演出
- 推奨キャラ: misaki_worry.png（繊細女性ターゲット）, kikuyo.png, iida.png等

### 🔧 K008.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: 4ページ構成を8ページに分割して感情共感型に最適化、各悩みを個別ページで深く共感できる構成に変更、pageCountを4→8に変更

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: /iida_worry.png
- page2: /misaki_worry.png
- page3: /ten_worry.png
- page4: /king_worry.png
- page5: /kikuyo_worry.png
- page6: /iida_worry.png
- page7: /iida.png
- page8: /misaki.png

### 🔧 K017.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: ネストした複雑なcontent構造をシンプルなtitle/content構造に統一、感情共感型に最適化、ですます調統一

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: /kikuyo.png
- page2: /misaki_worry.png
- page3: /iida.png
- page4: /ten_worry.png
- page5: /kikuyo.png
- page6: /king.png
- page7: /misaki.png

### 🔧 K027.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: 8つの質問を7→11ページに分割、各質問を個別ページで深く共感できる構成に変更、pageCountを7→11に変更、文体統一（ですます調）、固有名詞・絵文字排除

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: /misaki_worry.png
- page2: /iida_worry.png
- page3: /ten_worry.png
- page4: /kikuyo.png
- page5: /king.png
- page6: /misaki_worry.png
- page7: /iida.png
- page8: /ten_worry.png
- page9: /kikuyo_worry.png
- page10: /king_worry.png
- page11: /misaki.png

### 🔧 K030.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: ネストしたcontent構造をシンプルなtitle/content/imageSrc構造に統一、文体統一（ですます調）、絵文字排除、感情共感型に最適化

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: /misaki_worry.png
- page2: /ten_worry.png
- page3: /iida.png
- page4: /kikuyo.png
- page5: /king.png
- page6: /misaki.png

### 🔧 K032.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: 複雑なマンガ形式構造（scene/character/speech等のネスト）をシンプルなtitle/content/imageSrc構造に変更、就活不安→成功体験のストーリー流れは保持、文体統一（ですます調）

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: /misaki_worry.png
- page2: /ten_worry.png
- page3: /iida_worry.png
- page4: /kikuyo_worry.png
- page5: /king_worry.png
- page6: /iida.png
- page7: /king.png
- page8: /misaki.png
- page9: /ten.png

### 🔧 K053.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
既存構造を維持（職場の特徴を順次紹介する構成に適合）
- page1: 導入・問題提起
- page2-7: 各特徴を1ページずつ紹介（simple-introで感情的共感重視）
- page8: チェックリスト形式まとめ

#### 🎨 画像配置戦略
- 各ページにキャラクター画像で職場環境への共感演出
- 推奨キャラ: iida.png（働く社会人ターゲット）, king.png, misaki.png等

---

### 🔧 K052.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: 
- 9ページから10ページに拡張、7つのマインドセットを具体的に展開
- 複雑なcontent構造をシンプルなtitle/content/imageSrc構造に統一
- 各マインドセットの説明を深化させ、実践的なアドバイスを含む完結型コンテンツに修正

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: /misaki_worry.png（導入）
- page2: /iida_worry.png（現実認識）
- page3: /ten_worry.png（できない）
- page4: /kikuyo_worry.png（失敗）
- page5: /king_worry.png（楽しくない）
- page6: /iida_worry.png（キャパ）
- page7: /misaki.png（偉い）
- page8: /ten.png（他責）
- page9: /kikuyo.png（働き方）
- page10: /misaki.png（まとめ）

### 🔧 K050.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: 
- 9ページから10ページに拡張、7つの特徴を明確に定義して展開
- 複雑なcontent構造をシンプルなtitle/content/imageSrc構造に統一
- 特徴の説明だけでなく改善方法も含めた完結型コンテンツに修正

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: /misaki_worry.png（導入）
- page2: /iida_worry.png（特徴1）
- page3: /ten_worry.png（特徴2）
- page4: /kikuyo_worry.png（特徴3）
- page5: /king_worry.png（特徴4）
- page6: /iida_worry.png（特徴5）
- page7: /misaki_worry.png（特徴6）
- page8: /ten_worry.png（特徴7）
- page9: /kikuyo.png（改善方法）
- page10: /misaki.png（まとめ）

### 🔧 K041.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: 
- 7ページから9ページに拡張、7つのアドバイスを個別ページで展開
- 複雑なcontent構造をシンプルなtitle/content/imageSrc構造に統一
- タイトルの誤字修正（「何してでも」→「何していいかわからない」）
- 各ページに内容に沿った具体的なタイトルを設定

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: /misaki_worry.png（導入）
- page2: /iida.png（インターン）
- page3: /ten.png（ベンチャー）
- page4: /kikuyo.png（企業選択）
- page5: /king.png（業界研究）
- page6: /iida_worry.png（ES落ち）
- page7: /misaki_worry.png（アピール）
- page8: /ten.png（経験作り）
- page9: /misaki.png（励まし）

### 🔧 K038.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: 
- 8ページの問題点指摘のみから10ページの完結型コンテンツに拡張
- 文字化け・不明瞭な内容を整理し、シンプルなtitle/content/imageSrc構造に統一
- 問題点の指摘だけでなく、解決策と具体的アドバイスを追加
- プロフィール誘導のCTAを排除し、投稿内で価値を完結

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: /misaki_worry.png（導入）
- page2: /iida_worry.png（問題1）
- page3: /ten_worry.png（問題2）
- page4: /kikuyo_worry.png（問題3）
- page5: /king_worry.png（問題4）
- page6: /iida_worry.png（問題5）
- page7: /ten.png（問題6）
- page8: /kikuyo.png（気づき）
- page9: /iida.png（対策）
- page10: /misaki.png（励まし）

### 🔧 K037.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: 
- 2ページの不完全構造を7ページの完結型コンテンツに拡張
- 失敗体験の共感だけでなく、具体的な教訓と実践的アドバイスを追加
- 「変わりたいなら...」で終わる虚偽的CTAを排除し、投稿内で価値を完結

#### 🎨 画像配置戦略
**画像要否**: 完了
**具体的配置**:
- page1: /misaki.png（成功体験）
- page2: /king.png（油断）
- page3: /iida_worry.png（失敗）
- page4: /ten_worry.png（気づき）
- page5: /kikuyo_worry.png（反省）
- page6: /iida.png（解決策）
- page7: /misaki.png（励まし）

### 🔧 K058.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 不要
**修正理由**: 現在の構造はitem-listテンプレートに適合している。8つの職種を2つずつ4ページに分けて紹介する形式で情報が適切に配置されており、一覧性も確保されている

#### 🎨 画像配置戦略
**画像要否**: 不要
**具体的配置**: 
- 各ページ画像不要（職種情報は画像より情報の分かりやすさを重視）

### 🔧 K059.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-05-comparison

#### 修正後のdetailedContent構造
**修正要否**: 完了
**修正理由**: 廃止されたtemplateOverrides（ng_good_comparison）を削除済み。unified-template-05-comparison (ComparisonTemplate.tsx) で5つのNG/GOOD比較を適切に表示可能

#### 🎨 画像配置戦略
**画像要否**: 不要
**具体的配置**:
- page1: /misaki_worry.png（既存設定維持）
- page8: /misaki.png（既存設定維持）
- page2-7: 画像不要（比較コンテンツ重視）

### 🔧 K060.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 不要
**修正理由**: 現在の構造はitem-listテンプレートに適合している。21の考え方を3つずつ7ページに分けて紹介する形式で、まとめページも含めて情報が適切に配置されている

#### 🎨 画像配置戦略
**画像要否**: 不要
**具体的配置**:
- 各ページ画像不要（21項目のリストコンテンツは情報の一覧性を重視）

### 🔧 K061.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-08-section-blocks

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 3つの習慣をセクション別に分けた構造をテンプレートに適合させ、introduction/mainContent/summaryのセクション統一が必要

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: misaki_worry.png（メンタルの悩みを表現）
- page2: king.png（解決策リスト提示）
- page3: ten.png（専門家理論解説）
- page4: misaki_study.png（実践方法学習）
- page5: iida.png（空気を読まない強さ）
- page6: kikuyo.png（コミュニケーション方法）
- page7: king_point.png（経営者の実践例）
- page8: misaki_work.png（仕事での実践）
- page9: team_work.png（まとめ・チーム効果）

### 🔧 K063.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 複雑なネスト構造をシンプルなtitle/content/imageSrc構造に統一、5つのNG行動を明確に分離したitem-list形式に最適化、タイトル整合性向上

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（職場関係の悩み）
- page2: /iida_worry.png（コミュニケーション回避）
- page3: /ten.png（自分の特性説明）
- page4: /kikuyo.png（感謝・褒める）
- page5: /king.png（メリハリ・仕事力）
- page6: /iida.png（悪口注意）
- page7: /misaki.png（関係改善メリット）
- page8: /team_work.png（まとめ・良好な関係）

### 🔧 K065.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 複雑なネスト構造・文字化け・不適切な表現をシンプルなtitle/content/imageSrc構造に統一、感情共感型に最適化、文体統一（ですます調）、絵文字排除、タイトル整合性向上

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（優等生の悩み導入）
- page2: /iida_worry.png（プライベート・仕事両方の悩み）
- page3: /ten_worry.png（優等生の呪縛分析）
- page4: /kikuyo_worry.png（完璧主義のクセ）
- page5: /king_worry.png（動けない理由）
- page6: /iida_worry.png（恐怖心の詳細）
- page7: /ten.png（大人の戦略理解）
- page8: /kikuyo_point.png（60%戦略のポイント説明）
- page9: /misaki.png（励まし・エンパワーメント）

### 🔧 K105.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 複雑なネスト構造をシンプルなtitle/content/imageSrc構造に統一、7つの特徴をitem-list形式に最適化、タイトル整合性向上、文体統一（ですます調）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（人生の悩み導入）
- page2: /iida.png（自分の感覚を大切にする）
- page3: /ten.png（主体的な選択）
- page4: /kikuyo.png（納得による選択）
- page5: /king.png（人間関係の強さ）
- page6: /misaki_study.png（自己成長への集中）
- page7: /iida_fighting.png（挑戦する勇気）
- page8: /misaki.png（幸福の自己決定・まとめ）

### 🔧 K111.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-02-dual-section

#### 修正後のdetailedContent構造
**修正要否**: 不要
**修正理由**: 現在の構造はdual-sectionテンプレートに適合している。Page2-8が全て上下2分割レイアウトでMBTI16タイプを2つずつ説明する構造で、情報配置が適切

#### 🎨 画像配置戦略
**画像要否**: 不要
**具体的配置**:
- page1-8: 画像不要（MBTI診断は情報の正確性と一覧性を重視）

### 🔧 K114.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-05-comparison

#### 修正後のdetailedContent構造
**修正要否**: 不要
**修正理由**: 現在の構造はcomparisonテンプレートに適合している。行動できる人vs行動できない人の対比構造が7パターン続く構成で、比較型テンプレートの設計意図と一致

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（行動できない悩み導入）
- page8: /misaki.png（最終ページの励まし・キャラクター既存設定維持）
- page2-7: 画像不要（対比コンテンツ重視）

### 🔧 K115.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 複雑なepisode構造をシンプルなtitle/content/imageSrc構造に統一、各失敗体験を感情共感型に最適化、文体統一（ですます調）、絵文字排除

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（副業失敗の悩み導入）
- page2: /iida_worry.png（ポイ活の時間浪費）
- page3: /ten_worry.png（ブログの心が折れる体験）
- page4: /kikuyo_worry.png（ハンドメイドの収益問題）
- page5: /king_worry.png（低単価作業の疲弊）
- page6: /iida_worry.png（物販の赤字リスク）
- page7: /misaki.png（動画編集の競争激化・学びまとめ）

### 🔧 K148.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-04-item-grid

#### 修正後のdetailedContent構造
**修正要否**: 不要
**修正理由**: 現在の構造はitem-gridテンプレートに適合している。15の特徴を3つずつ5ページに分けたグリッド表示で、各項目にキャラクター画像も適切に配置済み

#### 🎨 画像配置戦略
**画像要否**: 不要
**具体的配置**:
- page1: 画像不要（導入ページ）
- page2-6: 各項目に既存キャラクター画像配置済み（kikuyo.png, king.png, ten.png, misaki.png のローテーション）
- page7: 画像不要（チェックリストまとめページ）

### 🔧 K149.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-05-comparison

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: NG思考/OK思考の対比形式をcomparisonテンプレートに最適化、複雑なネスト構造をシンプル化、文体統一（ですます調）、templateOverridesが必要

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（完璧主義の悩み導入）
- page2: 画像不要（問題共感ページ）
- page3: 画像不要（解決方法概要）
- page4-8: 各思い込みページに既存画像配置済み（worry系中心）
- page9: /misaki.png（まとめ・励まし）

### 🔧 K151.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-05-comparison

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: NG思考/OK思考の対比形式をcomparisonテンプレートに最適化、複雑なネスト構造をシンプル化、文体統一（ですます調）、templateOverridesが必要

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（メンタル不安定の悩み導入）
- page2: 画像不要（問題共感ページ）
- page3-8: 各メンタル安定方法ページに既存画像配置済み（worry系とポジティブ系のバランス）
- page9: /misaki.png（まとめ・励まし）

### 🔧 K160.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-07-item-list

#### 修正後のdetailedContent構造
**修正要否**: 不要
**修正理由**: 現在の構造はitem-listテンプレートに適合している。10個のメンタル安定習慣を2つずつ5ページに分けて紹介するリスト形式で、各項目にキャラクター画像も適切に配置済み

#### 🎨 画像配置戦略
**画像要否**: 不要
**具体的配置**:
- page1: 画像不要（導入ページ）
- page2: /misaki.png（既存設定維持）
- page3-7: 各習慣ページに既存画像配置済み（worry系とポジティブ系のバランス良い配置）
- page8: /ten_worry.png（既存設定維持・まとめページ）

### 🔧 K180.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 複雑なネスト構造（innerVoice、emotionalExpression等）をシンプルなtitle/content/imageSrc構造に統一、AI疲れあるあるを感情共感型に最適化、文体統一（ですます調）

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（AI疲れの悩み導入）
- page2: /iida_worry.png（ツールラッシュ疲れ）
- page3: /ten_worry.png（効率化の本末転倒）
- page4: /kikuyo_worry.png（周りについて行けない焦り）
- page5: /king_worry.png（情報収集で時間消費）
- page6: /iida_worry.png（完璧主義で動けない）
- page7: /misaki_worry.png（選択疲れ）
- page8: /misaki.png（希望への転換・励まし）

### 🔧 K183.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-01-simple-intro

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: 複雑なネスト構造をシンプルなtitle/content/imageSrc構造に統一、副業不安に対する感情共感型に最適化、文体統一（ですます調）、各ページの深い共感体験の流れを保持

#### 🎨 画像配置戦略
**画像要否**: 必要
**具体的配置**:
- page1: /misaki_worry.png（副業への不安導入）
- page2: /iida_worry.png（不安リスト・共感）
- page3: /ten.png（みんな同じ体験・安心）
- page4: /kikuyo_point.png（視点転換・ポイント説明）
- page5: /king.png（小さな一歩の価値）
- page6: /misaki_work.png（成功事例・実践）
- page7: /iida_fighting.png（挑戦への許可・励まし）
- page8: /misaki.png（希望への転換・温かいサポート）

## 作業統計（Type001）

### 修正完了状況
- **エビデンス作成完了**: 0/31 ファイル
- **修正内容確定**: 0/31 ファイル
