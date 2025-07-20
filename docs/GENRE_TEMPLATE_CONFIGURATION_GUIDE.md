# 🔧 ジャンル別テンプレート設定ガイド

## 概要
各ジャンルの構成担当者が、ページ構成決定後にテンプレート選択を実現するための完全手順書。

## 各構成担当者の作業フロー

### Step 1: ページ構成の分析・決定
1. **ページ分割方針** - 何ページ構成にするか
2. **各ページの内容構造** - どんな情報をどう整理するか  
3. **最適テンプレート** - 各ページに最適なテンプレート選択

### Step 2: システム設定の更新

#### 📄 `app/types/genre.ts` - ジャンル設定更新
```typescript
{
  genre: 'YOUR_GENRE',
  description: '既存説明',
  keywords: ['既存キーワード'],
  optimalItemRange: { min: X, max: Y },
  contentStructure: ['既存構造'],
  
  // 新規追加（あなたが決定）
  primaryTemplates: ['決定した最優先テンプレート'],      // 最優先
  secondaryTemplates: ['決定した推奨テンプレート'],       // 推奨  
  avoidTemplates: ['避けるべきテンプレート'],           // 避ける
  characteristicKeywords: ['ジャンル特性キーワード'],    // 特性
  expressionIntent: 'ジャンルの表現意図'               // 意図
}
```

#### 📄 `app/services/pageStructureAnalyzer.ts` - AIプロンプト修正
```typescript
// 75-125行あたりの【テンプレート選択指針】セクション
【テンプレート選択指針】
**🎯 ジャンル特性による優先選択 🎯**

**【${detectedGenre} ジャンル特性による強制適用】**
**最優先テンプレート**: ${genreConfig.primaryTemplates.join(', ')}
**推奨テンプレート**: ${genreConfig.secondaryTemplates.join(', ')}
**避けるべきテンプレート**: ${genreConfig.avoidTemplates.join(', ')}
**表現意図**: ${genreConfig.expressionIntent}
**特性キーワード**: ${genreConfig.characteristicKeywords.join(', ')}

// 以下データ構造による選択...
```

### Step 3: 特定テンプレートの選択条件詳細化
```typescript
// 該当テンプレートの選択条件を明確化
**your-template**: 以下の条件で優先選択
✅ YOUR_GENRE ジャンルの特定コンテンツ
✅ 具体的な選択条件1
✅ 具体的な選択条件2
```

## 🚨 修正時の重要注意事項

### 絶対に触ってはいけない箇所
- `templateMatchingService.ts` - UI表示専用
- 既存の型定義の変更 - 破壊的影響
- AIの応答形式変更 - 全体システム影響

### 安全な修正方法
1. **段階的追加** - 既存設定を削除せず追加
2. **影響範囲確認** - grep検索で使用箇所特定
3. **TypeScript確認** - `npx tsc --noEmit`で型チェック

## 📋 設定例（Strategy ジャンル）

```typescript
{
  genre: 'strategy',
  description: '面接・ES・試験対策の具体的アドバイス',
  keywords: ['対策', '攻略', '準備', 'コツ', '注意点', '面接', 'ES', '試験'],
  optimalItemRange: { min: 4, max: 6 },
  contentStructure: ['準備事項', '実践方法', '注意点・失敗例'],
  
  // 新規追加
  primaryTemplates: ['checklist-enhanced', 'simple5'],
  secondaryTemplates: ['item-n-title-content'],
  avoidTemplates: ['section-items'],
  characteristicKeywords: ['準備', '対策', '手順', '実践'],
  expressionIntent: '実践的準備手順'
}
```

## 🔍 動作確認方法

1. **TypeScript確認**: `npx tsc --noEmit`
2. **テスト実行**: リサーチ→フォーマッター→テンプレート選択
3. **結果確認**: 期待テンプレートが選択されているか

## 🎯 各担当者の成果物

1. **ページ構成分析書** - 決定した構成の根拠
2. **テンプレート設定** - genre.tsへの追加設定
3. **動作確認結果** - 期待テンプレート選択の検証

これにより「ページ構成決定→システム反映」の流れが完全に実現されます。