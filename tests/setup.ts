/**
 * Jest テストセットアップファイル
 */

// グローバルテスト設定
beforeAll(async () => {
  console.log('🚀 Phase C4統合テスト開始')
})

afterAll(async () => {
  console.log('✅ Phase C4統合テスト完了')
})

// タイムアウト設定
jest.setTimeout(30000)

// グローバルエラーハンドラー
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

// テスト用環境変数設定
process.env.NODE_ENV = 'test'