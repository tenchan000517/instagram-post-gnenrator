# 次世代Claude Code引き継ぎ書 - 詳細版（2025年7月29日）

## プロジェクト全体概要
**プロジェクト**: Instagram投稿生成ツール - ナレッジ理想形実現作業
**最終ゴール**: 全てのKxxxを理想的なナレッジデータベース形式に統一すること
**現在のPhase**: Phase 2-1 pageStructurePattern配置作業

## 作業の背景・経緯

### これまでの経緯
1. **問題認識**: 既存のナレッジデータが不統一で、テンプレートとの親和性が低い
2. **Phase 1完了**: 投稿タイプ再分類基準確定（2025-07-29完了）
3. **Phase 2開始**: テンプレート配置と構造再構成（3段階優先作業）

### Phase 1の成果
**投稿タイプ分類基準確定:**
- **Type001 (感情共感型)**: 「あるある」体験で共感コミュニティ形成
- **Type002 (実践習得型)**: 具体的で実行可能なスキルを段階的習得  
- **Type003 (情報型)**: ランキング&Tier表、企業詳細による構造化情報提供
- **Type004 (情報リソース型)**: 順番非依存の並列紹介

## 現在の作業：Phase 2の3段階構造

### Phase 2の全体設計
**第1優先**: pageStructurePatternフィールド配置 ← **現在ココ**
**[一旦停止ポイント]**: Phase 2-1と2-2の間で一旦停止
**第2優先**: detailedContent再構成
**第3優先**: フィードバック基づく内容最適化

### Phase 2-1の具体的作業内容
**作業概要**: 全186個のナレッジファイルに適切なUnifiedテンプレートを配置
**重要な制約**: 
- pageStructurePattern配置時点では構造改変は行わない
- 既存情報の完全保持（一切欠損させない）
- 一つずつ完了報告と進捗記録が必須

## 使用可能リソース

### Unifiedテンプレート10種類（唯一使用可能）
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

### テンプレート定義ファイルパス
**場所**: `/mnt/c/instagram-course/instagram-post-generator/app/services/knowledgeBase/data/pageStructures/unified/`
**例**: `unified-template-01-simple-intro.json`

### Reactコンポーネントパス  
**場所**: `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/unified/`
**例**: `SimpleIntroTemplate.tsx`

## 作業対象ファイル（全186個）

### Type001 (感情共感型) - 31ファイル
**ディレクトリ**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type001/`
**ファイル**: K001.json, K007.json, K008.json, K017.json, K027.json, K030.json, K032.json, K037.json, K038.json, K041.json, K050.json, K052.json, K053.json, K054.json, K055.json, K058.json, K059.json, K060.json, K061.json, K063.json, K065.json, K105.json, K111.json, K114.json, K115.json, K148.json, K149.json, K151.json, K160.json, K180.json, K183.json

### Type002 (実践習得型) - 66ファイル  
**ディレクトリ**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type002/`
**ファイル**: K002.json, K003.json, K004.json, K005.json, K010.json, K011.json, K023.json, K028.json, K034.json, K039.json, K040.json, K042.json, K045.json, K048.json, K064.json, K073.json, K075.json, K076.json, K077.json, K083.json, K090.json, K091.json, K103.json, K108.json, K110.json, K112.json, K117.json, K118.json, K132.json, K133.json, K134.json, K135.json, K137.json, K138.json, K139.json, K140.json, K141.json, K142.json, K143.json, K144.json, K145.json, K150.json, K152.json, K154.json, K156.json, K157.json, K159.json, K161.json, K162.json, K163.json, K164.json, K165.json, K166.json, K167.json, K169.json, K170.json, K171.json, K173.json, K174.json, K175.json, K176.json, K177.json, K179.json, K181.json, K182.json, K186.json

### Type003 (情報型) - 8ファイル
**ディレクトリ**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/`  
**ファイル**: K018.json, K024.json, K026.json, K031.json, K036.json, K051.json, K089.json, K184.json
**注意**: Type003は推奨テンプレートがほぼ確定（ランキング表示・企業詳細中心）

### Type004 (情報リソース型) - 39ファイル
**ディレクトリ**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type004/`
**ファイル**: K009.json, K012.json, K021.json, K022.json, K029.json, K033.json, K035.json, K043.json, K044.json, K046.json, K047.json, K049.json, K056.json, K057.json, K062.json, K071.json, K072.json, K074.json, K078.json, K079.json, K080.json, K081.json, K082.json, K084.json, K085.json, K088.json, K092.json, K093.json, K096.json, K097.json, K098.json, K099.json, K100.json, K101.json, K102.json, K104.json, K106.json, K107.json, K109.json, K113.json, K116.json, K136.json, K146.json, K153.json, K155.json, K158.json, K168.json, K172.json, K178.json, K185.json

## 重要なルール・制約

### オーバーライド機能（K118参考例）
**templateOverridesフィールドの使用例**:
```json
"templateOverrides": {
  "2": "ng_good_comparison",
  "3": "category_explanation", 
  "4": "category_explanation"
}
```
**重要**: ページ単位で異なるテンプレートを指定可能

### 画像使用ガイドライン

#### Type001用キャラクター画像
**パス**: `/mnt/c/instagram-course/instagram-post-generator/public/`
- **女性向け**: misaki.png/misaki_worry.png, kikuyo.png/kikuyo_worry.png
- **男性向け**: king.png/king_warry.png, ten.png/ten_worry.png  
- **汎用**: iida.png/iida_worry.png
**ルール**: 困りごと→worry、解決→通常表情、連続使用禁止

#### AIツール画像（Type002, Type004用）
**パス**: `/mnt/c/instagram-course/instagram-post-generator/public/imag/ai/`
**ファイル**: Adobe_Firefly_Logo.png, ChatGPT-Logo.png, claude-ai-icon.png, copilot.png, gamma.png, Google-Gemini-1.png, mymind.png, Napkin-ai.png, NotebookLM_logo.png, perplexity.png

#### 企業画像（Type003用）
**パス**: `/mnt/c/instagram-course/instagram-post-generator/public/imag/company/`  
**ファイル**: accenture.png, baincompany.png, bcg.png, canon.png, goldmansachs.png, google.png, honda.png, keyence.png, mckinsey.png, meta.png, mitsubishisyouji.png, mitsuibussan.png, nttdata.png, nufg.png, rakuten.png, softbank.png, sony.png, sumitomosyouji.png, takeda.png, tokiomarine.png

## 作成済みドキュメント

### 1. テンプレート配置ルールマスタードキュメント
**パス**: `/mnt/c/instagram-course/instagram-post-generator/docs/template-placement-rules-master.md`
**内容**: 配置の基本原則、オーバーライド機能、画像ガイドライン、作業フロー

### 2. 進捗報告書フォーマット
**パス**: `/mnt/c/instagram-course/instagram-post-generator/pageStructurePattern配置作業進捗報告.md`
**用途**: 一つずつ完了報告、全186ファイルのトラッキング

### 3. 投稿タイプ別エビデンスファイル（4つ）
- **Type001**: `/mnt/c/instagram-course/instagram-post-generator/detailedContent修正エビデンス_Type001.md` ← **ユーザー修正済み**
- **Type002**: `/mnt/c/instagram-course/instagram-post-generator/detailedContent修正エビデンス_Type002.md`
- **Type003**: `/mnt/c/instagram-course/instagram-post-generator/detailedContent修正エビデンス_Type003.md`
- **Type004**: `/mnt/c/instagram-course/instagram-post-generator/detailedContent修正エビデンス_Type004.md`

## 直前のフィードバック内容

### Type001エビデンスファイルへのフィードバック（重要）
**ユーザーが実際に修正した内容**:
1. **構造簡略化**: 冗長な説明を削除、実用的なフォーマットに変更
2. **画像方針明確化**: 「内容的に配置した方が伝わる場合のみ画像配置」
3. **推奨テンプレート削除**: 使用可能10種類一覧のみ表示（Type003除く）
4. **エビデンス記録の簡略化**: 実用的なフォーマットに変更

### 重要な指示
- **Type003のみ推奨テンプレートを残す**（ほぼ確定しているため）
- **Type002, Type004をType001の修正方針に合わせて修正する**

## 次にやるべきこと

### 即座に実行すべき作業
1. **Type002エビデンスファイル修正**: Type001のフィードバック内容を反映
2. **Type004エビデンスファイル修正**: Type001のフィードバック内容を反映  
3. **Type003は推奨テンプレートを維持**: 変更不要

### その後の作業フロー
1. **実際のナレッジファイル確認**: 各ナレッジの内容を個別確認
2. **最適テンプレート選択**: コンテンツに最適なUnifiedテンプレートを選択
3. **pageStructurePattern配置**: 選択したテンプレートをフィールドに設定
4. **進捗報告**: 一つずつ完了報告とエビデンス記録
5. **detailedContent修正要請**: Phase 2-2のための具体的修正内容記録

## 品質管理の重要ポイント

### 絶対に守るべきルール
1. **情報欠損禁止**: 既存情報を一切欠損させない
2. **段階的実行**: 一つずつ完了してから次に進む  
3. **ですます調統一**: 全コンテンツのですます調統一
4. **エビデンス記録**: detailedContent修正担当へのエビデンス必須

### 避けるべき失敗パターン
1. **推奨テンプレートに引きずられる**: 実際の内容を無視した機械的選択
2. **無理な画像追加**: Type003情報型にキャラクター画像等
3. **構造改変の先走り**: Phase 2-1では構造改変禁止

## システム技術情報

### 主要技術スタック
- React (Next.js)
- TypeScript  
- Tailwind CSS
- Lucide React (アイコン)
- Gemini AI (コンテンツ生成)
- html2canvas (画像生成)

### 重要な制約
- **pageStructurePattern**: 10種類のUnifiedテンプレートのみ使用可能
- **templateOverrides**: 特定ページでのテンプレート個別指定
- **detailedContent**: Phase 2-2での構造改変対象

## 期待される成果物

### Phase 2-1完了時点での成果
1. **全186ファイルのpageStructurePattern配置完了**
2. **進捗報告書の完全記録**  
3. **detailedContent修正エビデンスの整理**
4. **Phase 2-2への明確な引き継ぎ情報**

この引き継ぎ情報により、次世代Claude Codeが迷わずに作業を継続できるはずです。