# テンプレート作成作業ログ

## K113 Page2 - feature_parallel_info テンプレート

### Page2特有データ構造
```json
{
  "featureNumber": "1",              // 機能番号（数値文字列）
  "featureName": "スタンプゲーム",     // 機能名（短め）
  "description": "DMで...",          // 機能説明（1文、簡潔）
  "effect": "遊び心のある...",        // 効果説明（メリット強調）
  "bottomNote": "集客は..."          // 締めメッセージ（K113特有）
}
```

### feature_parallel_info配置
- **機能番号**: 左上
- **機能名**: 中央上部
- **説明**: 中央
- **効果**: 中央下部
- **bottomNote**: 最下部

### Page2特有の修正点
- **bottomNote追加**: テンプレート表示(行50-59) + 生成構造(行227)
- **K113専用設計**: 実際の投稿画像を参考

### 動作確認済み
- ✅ K113正解パターンから直接テンプレート取得
- ✅ 生成データ構造完全適合  
- ✅ UI表示正常

### 修正作業 (実施順序)
1. **テンプレートコンポーネント作成**
   - ファイル: `app/components/templates/FeatureParallelInfoTemplate.tsx`
   - 内容: 上記構造に対応するReactコンポーネント

2. **レジストリ import追加**
   - ファイル: `app/components/templates/TemplateRegistry.ts`
   - 行20: `import { featureParallelInfoMetadata } from './FeatureParallelInfoTemplate'`

3. **レジストリ登録追加**
   - ファイル: `app/components/templates/TemplateRegistry.ts`
   - 行41: `feature_parallel_info: featureParallelInfoMetadata`

4. **コンポーネントindex export追加**
   - ファイル: `app/components/templates/index.ts`
   - 行18: `export { FeatureParallelInfoTemplate } from './FeatureParallelInfoTemplate'`

5. **コンポーネントindex import追加**
   - ファイル: `app/components/templates/index.ts`
   - 行48: `import { FeatureParallelInfoTemplate } from './FeatureParallelInfoTemplate'`

6. **テンプレートマップ追加**
   - ファイル: `app/components/templates/index.ts`
   - 行76: `feature_parallel_info: FeatureParallelInfoTemplate,`

7. **AI生成構造定義追加**
   - ファイル: `app/services/knowledgeBase/KnowledgeBasedContentGenerator.ts`
   - 行222-228: feature_parallel_info構造定義

8. **bottomNote対応**
   - ファイル: `KnowledgeBasedContentGenerator.ts` 行227: `bottomNote: 'string?'`
   - ファイル: `FeatureParallelInfoTemplate.tsx` 行50-59: bottomNote表示追加

---

## 共通作業パターン（参考）
新テンプレート作成時は基本8ステップ:
コンポーネント作成 → レジストリ(import+登録) → index(export+import+マップ) → 生成構造定義 → 特殊対応

---

## K113 Page3 - feature_detail_tips テンプレート

### Page3特有データ構造
```json
{
  "explanation": "インスタ集客に欠かせない...",   // 説明文
  "tips": [                                      // Tips配列（3個）
    "ちょっと印象が残るマイスタンプ...",
    "これは普通にストーリーの切り抜きで...",
    "わたしはピクセルアートをマイスタンプ..."
  ]
}
```

### feature_detail_tips配置
- **説明文**: 上部（紫枠）
- **Tips見出し**: 中央
- **Tips一覧**: 番号付きリスト

### Page3特有の問題と解決
- **問題**: AIがPage2と同じ内容を生成（DMフレーズ重複）
- **原因**: プロンプトにナレッジ全文含まれ、Page3固有内容が薄まる
- **解決**: 
  1. 新テンプレート作成（feature_detail_tips）
  2. プロンプト最適化（不要情報削除、ページ固有情報を最優先配置）
  3. 「参考例」→「必須コンテンツ」に変更

### 動作確認済み
- ✅ feature_detail_tipsテンプレート作成・統合
- ✅ プロンプト最適化実施
- ⏳ Page3再テスト待ち

---

## プロンプト最適化の記録

### 削除した不要情報
- 安全確認済み表現事例
- 感情トリガー

### プロンプト構造変更
```
旧: 投稿意図 → 解決策 → ページ情報 → コンテンツ参考例
新: ページ情報 → 必須コンテンツ → テンプレート構造 → 投稿意図
```

### 重要な発見
- **ナレッジ全文がプロンプトに含まれると個別ページの固有性が失われる**
- **「参考例」という表現はAIに軽視される**
- **ページ固有情報を最優先にすることで精度向上**

---

**記録日時**: 2025-07-25  
**テスト状況**: K113 Page2 完了、Page3 テスト中、Page4-8 継続予定
**次世代への申し送り**: Page3再テスト実行後、同様の手法でPage4-8を進める