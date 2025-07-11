# Instagram Post Generator - 連絡事項

## 現在の開発状況

### 1. Gemini呼び出しのコメントアウト
- **対象ファイル**: `/app/components/PostGenerator.tsx`
- **場所**: `generatePost`関数内（67-101行目）
- **理由**: レイアウトテスト中のため、高速化のためモック化
- **現在の動作**: 0.5秒待機後、従来の方法で生成
- **復元方法**: コメントアウト部分を有効化し、モック部分を削除

```javascript
// 現在有効（モック）
setGeneratingStatus('モック分析中...')
await new Promise(resolve => setTimeout(resolve, 500))
const generatedPost = createPostFromStrategy(content, strategy)

// コメントアウト中（本番用AI呼び出し）
/* 
const analysis = await geminiService.analyzeContentForOptimalPost(content, strategy)
...
*/
```

### 2. デバッグ用ラインの現在地
以下のファイルにデバッグ用カラーラインが存在：

#### PostGenerator.tsx
- マゼンタライン（最大親コンテナ）: `border: '5px solid magenta'`
- 赤ライン（コンテンツ最大親）: `border: '4px solid red'`

#### Viewport.tsx
- ダークブルーライン（ビューポート）: `border: '4px solid darkblue'`

#### CarouselPostGenerator.tsx（未使用）
- 各種カラーライン（紫、オレンジ、シアン、黄、ピンク、ライム、茶、黒、グレー）

### 3. 構造変更済み事項
- ビューポートコンポーネント分離完了
- カルーセルナビゲーションをビューポート外に移動完了
- 赤ライン以降の不要コンテナ削除完了
- PostSlideサイズ調整完了（w-full h-full対応）

### 4. 今後の作業予定
1. 要件定義に基づく新テンプレート実装
2. デバッグラインの削除
3. Gemini呼び出しの復元
4. 文字数制限の実装