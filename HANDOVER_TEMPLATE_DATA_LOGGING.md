# テンプレートデータ挿入ロギング実装タスク

## 🎯 実装目標
生成されたコンテンツがプレビューに表示されるテンプレートのどの項目にどのデータが挿入されたかを確認できるロギング機能を追加

## 📁 対象ファイル
- `/app/components/templates/*.tsx` - 各テンプレートコンポーネント
- `/app/services/contentGeneratorService.ts` - コンテンツ生成サービス
- `/app/components/NewFlowPostGenerator.tsx` - メインフロー

## 🔍 現在の状況
- ✅ AI生成の生データロギング完了
- ✅ テンプレートマッチングの詳細ロギング完了
- ❌ テンプレートデータ挿入の詳細ロギング未実装

## 📊 実装すべき機能

### 1. テンプレートデータマッピングログ
各テンプレートで以下を出力：
```
🎨 テンプレートデータ挿入 - [TemplateType]
================================================================================
📋 挿入データ詳細:
  - title: "🔥 失敗しない！内定獲得ロードマップ"
  - subtitle: "就活を制する最強ルーティーン"
  - content: "長期戦となる就職活動。心身の健康を維持し..."
  - items: [6個]
    └─ "ToDoリスト：タスクを可視化し、達成感を得る"
    └─ "Googleカレンダー：色分け、リマインダー設定で予定管理"
  - checklist: [3個]
  - tableData: headers[3], rows[4]
================================================================================
```

### 2. 実装場所
- 各テンプレートコンポーネントの先頭でロギング
- または `contentGeneratorService.ts` の `parseGeneratedContent` 内でロギング

### 3. 実装例
```typescript
// テンプレートコンポーネント内
export function EnumerationTemplate({ data }: EnumerationTemplateProps) {
  // 🎯 ロギング追加
  console.log('🎨 テンプレートデータ挿入 - enumeration')
  console.log('📋 挿入データ詳細:', JSON.stringify(data, null, 2))
  
  return (
    <div className="w-full h-full...">
      {/* 既存のJSX */}
    </div>
  )
}
```

## 📋 完了済み作業（前回のClaude実装）

### AI生成ログ追加箇所
1. `GeminiService.analyzeContentForOptimalPost` - AI分析成功時
2. `ContentGeneratorService.generateHighQualityContent` - 高品質コンテンツ生成
3. `ContentGeneratorService.regenerateCaption` - キャプション再生成
4. `ContentGeneratorService.regenerateSpecificPage` - ページ再生成
5. `NewFlowPostGenerator.handleContentSubmit` - フロー内コンテンツ生成

### テンプレートマッチングログ追加
- `templateMatchingService.ts` に詳細なスコア計算ロギングを実装
- 構造マッチ、キーワード、表現パターン、コンテンツ量の詳細分析
- 各テンプレートの評価理由と最終選択根拠を出力

### 分析資料
- `TEMPLATE_MATCHING_ANALYSIS.md` - 実際の生成データ分析レポート作成済み

## 🚀 次のアクション
新しいClaude Codeセッションで：
1. 各テンプレートコンポーネントにデータ挿入ロギングを追加
2. テンプレートごとのデータマッピング詳細を出力
3. プレビュー表示時のデータ流れを可視化

## 💡 実装のポイント
- 既存のロギング形式と統一感を保つ
- パフォーマンスに影響しないよう適切な条件分岐
- 開発環境でのみ動作するよう設定（必要に応じて）