# detailedContent修正エビデンス - Type003 (情報型)

## 作業概要
**対象**: Type003 情報型ナレッジ（8ファイル）  
**作業目的**: pageStructurePattern配置後に必要なdetailedContent修正内容を記録

## 対象ディレクトリ・ファイル
**ディレクトリ**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/`

#### 基本情報
- **ファイルパス**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/[ファイル名].json`
- **テンプレート定義ファイル**: `/mnt/c/instagram-course/instagram-post-generator/app/services/knowledgeBase/data/pageStructures/unified/[テンプレート名].json`

**対象ファイル一覧**:
K018.json, K024.json, K026.json, K031.json, K036.json, K051.json, K089.json, K184.json

## Type003推奨Unifiedテンプレート
1. `unified-template-03-ranking-display` - ランキング表示型（ランキング&Tier表向け）
2. `unified-template-06-company-detail` - 企業詳細型（企業詳細情報向け）
3. `unified-template-04-item-grid` - アイテムグリッド型（情報項目向け）

## Type003の使用可能な画像リソース

### **内容的に配置した方が伝わる場合のみ画像配置する**

### 企業画像（企業分析コンテンツ用）
**パス**: `/mnt/c/instagram-course/instagram-post-generator/public/imag/company/`
- accenture.png, baincompany.png, bcg.png, canon.png, goldmansachs.png, google.png, honda.png, keyence.png, mckinsey.png, meta.png, mitsubishisyouji.png, mitsuibussan.png, nttdata.png, nufg.png, rakuten.png, softbank.png, sony.png, sumitomosyouji.png, takeda.png, tokiomarine.png

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

#### 🎨 Type003画像配置戦略

##### キャラクター選択ルール
- **ターゲット判定**: `marketingStage`や`problemCategory`から判定
- **感情表現**: 困りごと→worry、解決→通常表情
- **バランス配慮**: ページ間での画像バリエーション確保

---

## Type003修正エビデンス一覧

### 🔧 K018.json detailedContent修正エビデンス
- **配置済みテンプレート**: unified-template-09-dynamic-boxes

#### 修正後のdetailedContent構造
**修正要否**: 必要
**修正理由**: dynamic-boxesテンプレートの要求構造 `{title, boxes: [{name, content}]}` に適合させるため、既存の複雑なindustries構造を再構成

#### 🎨 画像配置戦略
**画像要否**: 不要
**理由**: 業界マップの情報提供コンテンツであり、キャラクター配置よりも情報の視認性を重視

**具体的配置**:
- page1: 画像不要（introduction）
- page2-5: 画像不要（各業界の詳細情報に集中）

## 作業統計（Type003）

### 修正完了状況
- **エビデンス作成完了**: 0/8 ファイル
- **修正内容確定**: 0/8 ファイル

