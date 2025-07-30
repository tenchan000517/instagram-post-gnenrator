# detailedContent修正エビデンス

## 作業概要
**作業内容**: Phase 2-2 detailedContent構造改変エビデンス記録  
**作業目的**: pageStructurePattern配置後に必要なdetailedContent修正内容を具体的に記録し、担当者が迷わず作業できるようにする

## 重要なパス情報

### 作業対象ディレクトリ
- **Type001**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type001/`
- **Type002**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type002/`
- **Type003**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/`
- **Type004**: `/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type004/`

### テンプレート定義ファイルパス
- **Unified Templates**: `/mnt/c/instagram-course/instagram-post-generator/app/services/knowledgeBase/data/pageStructures/unified/`
  - `unified-template-01-simple-intro.json`
  - `unified-template-02-dual-section.json`
  - `unified-template-03-ranking-display.json`
  - `unified-template-04-item-grid.json`
  - `unified-template-05-comparison.json`
  - `unified-template-06-company-detail.json`
  - `unified-template-07-item-list.json`
  - `unified-template-08-section-blocks.json`
  - `unified-template-09-dynamic-boxes.json`
  - `unified-template-10-image-point.json`

### テンプレートコンポーネントパス
- **React Components**: `/mnt/c/instagram-course/instagram-post-generator/app/components/templates/unified/`
  - `CompanyDetailTemplate.tsx`
  - `ComparisonTemplate.tsx`
  - `DualSectionTemplate.tsx`
  - `DynamicBoxesTemplate.tsx`
  - `ImagePointTemplate.tsx`
  - `ItemGridTemplate.tsx`
  - `ItemListTemplate.tsx`
  - `RankingDisplayTemplate.tsx`
  - `SectionBlocksTemplate.tsx`
  - `SimpleIntroTemplate.tsx`

### 画像リソースパス
- **AIツール画像**: `/mnt/c/instagram-course/instagram-post-generator/public/imag/ai/`
- **企業画像**: `/mnt/c/instagram-course/instagram-post-generator/public/imag/company/`
- **キャラクター画像**: `/mnt/c/instagram-course/instagram-post-generator/public/`

## 修正エビデンス記録フォーマット

### 🔧 [ファイル名] detailedContent修正エビデンス

#### 基本情報
- **ファイルパス**: [完全パス]
- **配置済みテンプレート**: [pageStructurePatternに設定されたテンプレート]
- **テンプレート定義ファイル**: [対応するunified-template-xx.jsonのパス]
- **React Component**: [対応するXxxTemplate.tsxのパス]

#### 現在のdetailedContent構造分析
```json
{
  "page1": {
    "role": "[現在のrole]",
    "section": "[現在のsection]",
    "content": {
      // 現在の構造をここに記載
    }
  }
  // 他のページも同様に記載
}
```

#### テンプレート要求構造
```json
{
  // テンプレート定義ファイルから必要な構造を記載
  "templateStructure": {
    // 必要なフィールド構造
  }
}
```

#### 🚨 必須修正事項

##### 1. フィールド名変更
- **変更前**: `[現在のフィールド名]`
- **変更後**: `[テンプレート要求フィールド名]`
- **理由**: [変更理由]

##### 2. データ構造変更  
- **変更前**: `[現在のデータ構造]`
- **変更後**: `[テンプレート要求データ構造]`
- **具体例**:
  ```json
  // Before
  "content": "文字列"
  
  // After  
  "content": {
    "title": "抽出されたタイトル",
    "description": "抽出された説明文"
  }
  ```

##### 3. 情報の再配置
- **移動元**: `page[X].content.[フィールド名]`
- **移動先**: `page[Y].content.[新フィールド名]`
- **移動理由**: [テンプレート構造への適合]

##### 4. 欠損情報の補完
- **不足情報**: [テンプレートに必要だが現在不足している情報]
- **補完方法**: [既存情報からの抽出方法または推定方法]
- **補完例**: 
  ```json
  // 既存情報から抽出
  "title": "K001のactualTitleから抽出: 働く女性の理不尽あるある７選"
  ```

#### 🎨 画像追加要請

##### 画像が必要なページ
- **ページ番号**: [page1, page2, etc.]
- **画像種別**: [AI/企業/キャラクター/その他]
- **具体的画像**: 
  - **既存リソース使用**: `[画像ファイル名.png]`
  - **新規画像必要**: `[必要な画像の詳細説明]`
- **配置位置**: `page[X].content.[フィールド名]`
- **Alt テキスト**: `[画像の説明文]`

##### 画像選択基準
- **ターゲット**: [男性/女性/汎用]
- **内容適合性**: [画像が内容とマッチする理由]
- **バランス考慮**: [他ページとの画像配置バランス]

#### 📝 templateOverrides要否判定

##### オーバーライド必要性
- **必要**: [Yes/No]
- **対象ページ**: [page2, page3, etc.]
- **使用テンプレート**: [ng_good_comparison, category_explanation, etc.]
- **実装例**:
  ```json
  "templateOverrides": {
    "2": "ng_good_comparison",
    "3": "category_explanation"
  }
  ```

#### ⚠️ 注意事項・制約条件
- **情報欠損禁止**: [特に注意すべき情報価値]
- **ですます調統一**: [文体調整が必要な箇所]
- **文字数制限**: [テンプレート固有の制限事項]
- **その他制約**: [特記事項]

#### ✅ 修正完了後の検証項目
- [ ] 全ての情報が適切に配置されている
- [ ] テンプレート構造に完全適合している  
- [ ] 画像が適切に配置されている
- [ ] ですます調で統一されている
- [ ] 情報の欠損がない
- [ ] templateOverridesが正しく動作する

---

## 修正エビデンス記録一覧

<!-- 各ファイルの修正エビデンスをここに追記 -->

### Type001 修正エビデンス

### Type002 修正エビデンス  

### Type003 修正エビデンス

### Type004 修正エビデンス

## 全体統計・サマリー

### 修正内容統計
- **フィールド名変更**: 0件
- **データ構造変更**: 0件  
- **情報再配置**: 0件
- **画像追加**: 0件
- **templateOverrides追加**: 0件

### 投稿タイプ別修正状況
- **Type001**: 0/31 ファイル修正エビデンス作成完了
- **Type002**: 0/66 ファイル修正エビデンス作成完了
- **Type003**: 0/8 ファイル修正エビデンス作成完了  
- **Type004**: 0/39 ファイル修正エビデンス作成完了

### 作業効率向上のためのリソース

#### よく使用される変更パターン
- **リスト構造→アイテム配列**: `"items": [{"name": "", "description": ""}]`
- **文字列→オブジェクト**: `{"title": "", "content": ""}`
- **単一セクション→複数セクション**: `"sections": [...]`

#### テンプレート別頻出フィールド
- **simple-intro**: `title`, `description`, `imageSrc`, `imageAlt`
- **dual-section**: `items[].title`, `items[].description`, `footerDescription`
- **item-list**: `items[].name`, `items[].description`
- **ranking-display**: `items[].rank`, `items[].name`, `items[].primaryValue`