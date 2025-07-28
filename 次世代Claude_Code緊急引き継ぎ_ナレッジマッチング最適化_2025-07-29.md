# 次世代Claude Code緊急引き継ぎ - ナレッジマッチング最適化

## 🚨 緊急度：高

**ナレッジベース機能の根幹**であるナレッジマッチングシステムがGemini API過負荷により機能停止中。早急な最適化が必要。

---

## 📊 現状分析

### 問題の発生箇所
- **ファイル**: `app/services/knowledgeBase/KnowledgeMatchingService.ts`
- **行番号**: 67行目
- **メソッド**: `findRelevantKnowledge()`

### エラーの詳細
```typescript
const response = await makeModelRequest(prompt) // ここで503エラー発生
```

**エラーメッセージ**:
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent 503 (Service Unavailable)
[GoogleGenerativeAI Error]: The model is overloaded. Please try again later.
```

### 根本原因
1. **大量ナレッジ処理**: 一度に34個のナレッジを処理
2. **巨大プロンプト**: 各ナレッジの詳細な解決内容を全て含む膨大なテキスト
3. **API制限**: gemini-1.5-flashの処理能力超過

---

## 🔄 エラーの連鎖反応

```
Gemini API 503エラー
    ↓
ナレッジマッチング失敗
    ↓  
空のナレッジ配列でフォールバック実行
    ↓
PageStructureMatcher 002-T009パターン未登録エラー
    ↓
コンテンツ生成完全失敗
```

**影響範囲**: システム全体のナレッジベース機能が使用不可

---

## 🎯 最適化戦略

### Phase 1: 短期対策（即効性重視）

#### 1.1 リトライ機構の実装
```typescript
// KnowledgeMatchingService.ts に追加
private async makeRequestWithRetry(prompt: string, maxRetries = 3): Promise<any> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await makeModelRequest(prompt)
    } catch (error) {
      if (error.status === 503 && i < maxRetries - 1) {
        // 指数バックオフ: 2^i * 1000ms 待機
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
        continue
      }
      throw error
    }
  }
}
```

#### 1.2 プロンプト圧縮
```typescript
// ナレッジ情報の簡略化
const simplifiedKnowledge = knowledgeContents.map(k => ({
  knowledgeId: k.knowledgeId,
  title: k.actualTitle,
  category: k.problemCategory,
  keywords: k.searchKeywords?.slice(0, 5), // キーワード数制限
  summary: k.solutionContent?.概要?.substring(0, 200) // 概要を200文字に制限
}))
```

#### 1.3 バッチサイズ制限
```typescript
const BATCH_SIZE = 10 // 一度に処理するナレッジ数を制限
const batches = []
for (let i = 0; i < knowledgeContents.length; i += BATCH_SIZE) {
  batches.push(knowledgeContents.slice(i, i + BATCH_SIZE))
}
```

### Phase 2: 中期対策（安定性重視）

#### 2.1 分割処理システム
- 34個のナレッジを3-4個のバッチに分割
- 各バッチで独立してマッチング実行
- 結果をスコア順でマージ

#### 2.2 キャッシュ機構
```typescript
// LRUキャッシュの実装
private matchingCache = new Map<string, MatchingResult>()

private getCacheKey(userInput: string, knowledgeIds: string[]): string {
  return `${userInput.substring(0, 100)}_${knowledgeIds.sort().join(',')}`
}
```

#### 2.3 事前フィルタリング
```typescript
// postType別の事前絞り込み
const filteredKnowledge = knowledgeContents.filter(k => 
  k.postType === targetPostType || isCompatiblePostType(k.postType, targetPostType)
)
```

### Phase 3: 長期対策（根本解決）

#### 3.1 ベクトル検索導入
- 各ナレッジのベクトル化（事前処理）
- コサイン類似度による高速マッチング
- Gemini APIの使用量大幅削減

#### 3.2 軽量モデル活用
- 一次選別: 高速・軽量モデル（gemini-1.5-flash-8b等）
- 二次精査: 高性能モデル（選別された少数のナレッジのみ）

---

## 📁 関連ファイル

### 修正対象ファイル
1. `app/services/knowledgeBase/KnowledgeMatchingService.ts` - メイン修正箇所
2. `app/services/knowledgeBase/MasterDataService.ts` - ナレッジ読み込み最適化
3. `app/components/ContentInput.tsx` - エラーハンドリング強化

### 参考ファイル
1. `思考プロセス①_ページ構成.md` - 問題詳細とセクション名統一仕様
2. `knowledge-post-type-analysis.txt` - ナレッジ分布データ

---

## 🧪 テスト方針

### 負荷テスト
```typescript
// 34個ナレッジでの連続テスト
for (let i = 0; i < 10; i++) {
  const result = await knowledgeMatchingService.findRelevantKnowledge(testInput, allKnowledge)
  console.log(`Test ${i+1}: ${result.success ? 'SUCCESS' : 'FAILED'}`)
}
```

### 性能測定
- API呼び出し回数の測定
- レスポンス時間の計測
- 成功率の監視

---

## 🎯 成功指標

### 短期目標（1週間以内）
- [ ] 503エラーの発生率を80%以上削減
- [ ] ナレッジマッチング成功率90%以上
- [ ] レスポンス時間10秒以内

### 中期目標（1ヶ月以内）
- [ ] API使用量50%削減
- [ ] キャッシュヒット率60%以上
- [ ] 全ナレッジベース機能の安定動作

### 長期目標（3ヶ月以内）
- [ ] ベクトル検索システム完全移行
- [ ] API使用量80%削減
- [ ] サブ秒レスポンス実現

---

## 🚧 実装時の注意点

### エラーハンドリング
- 503エラー以外のAPI制限も考慮
- フォールバック時の品質担保
- ユーザーへの適切なフィードバック

### データ品質
- プロンプト圧縮時の情報損失最小化
- キャッシュの有効期限管理
- ナレッジ更新時のキャッシュ無効化

### 互換性
- 既存のナレッジファイル構造との互換性維持
- テンプレート生成システムとの連携確保

---

## 📋 引き継ぎチェックリスト

### 理解確認
- [ ] 現在のエラーの発生箇所と原因を理解
- [ ] 34個ナレッジ一括処理の問題点を把握
- [ ] エラーの連鎖反応による影響範囲を認識

### 実装準備
- [ ] KnowledgeMatchingService.tsの現在のコードを確認
- [ ] テスト環境でのエラー再現
- [ ] 最適化方針の優先順位付け

### 開発計画
- [ ] Phase 1実装のタイムライン作成
- [ ] テスト計画の策定
- [ ] リリース計画の立案

---

## 💬 引き継ぎ後の初回作業提案

1. **現状確認**: KnowledgeMatchingService.tsでエラー再現
2. **Phase 1-1**: リトライ機構の実装（最優先）
3. **Phase 1-2**: プロンプト圧縮の実装
4. **テスト**: 10回連続実行での成功率測定

**重要**: この問題は単なる一時的エラーではなく、システムの根幹に関わる性能問題です。段階的かつ慎重な最適化が必要です。

---

*作成日: 2025-07-29*  
*緊急度: 高*  
*推定作業期間: 1-2週間（Phase 1完了まで）*