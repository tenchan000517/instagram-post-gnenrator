// テンプレート選択改善のテスト
console.log('🧪 テンプレート選択改善テスト開始')

// テストケース定義
const testCases = [
  {
    name: 'インターン締切5選',
    content: 'インターン締切5選！1月15日までに応募必須の企業一覧。A社は1月10日、B社は1月15日締切です。',
    expected: 'table'
  },
  {
    name: 'おすすめ企業3選',
    content: 'おすすめ企業3選をご紹介！①IT企業なら成長性抜群、②商社なら安定性重視、③コンサルなら高収入。',
    expected: 'enumeration'
  },
  {
    name: '就活体験談',
    content: '就活体験談です。最初は何も分からない状態でしたが、実際に行動してみると変化が起きました。',
    expected: 'story'
  },
  {
    name: '企業比較',
    content: '企業比較をしてみました。A社とB社の違いを料金、サービス、将来性で比較検討します。',
    expected: 'table'
  },
  {
    name: '成功のポイント',
    content: '成功のポイント3つ。①準備が重要、②行動力が必要、③継続することが大切です。',
    expected: 'enumeration'
  }
]

// 結果記録
const results = []

// Note: 実際のテストは手動で行う必要があります
// このファイルは設計確認用です

testCases.forEach(testCase => {
  console.log(`\n📋 テストケース: ${testCase.name}`)
  console.log(`📝 コンテンツ: ${testCase.content}`)
  console.log(`🎯 期待値: ${testCase.expected}`)
  
  results.push({
    name: testCase.name,
    content: testCase.content,
    expected: testCase.expected,
    // actual: TemplateSelector.selectOptimalTemplate(testCase.content) // 実際のテスト時に使用
  })
})

console.log('\n✅ テスト準備完了')
console.log('ブラウザでアプリケーションを実行し、これらのコンテンツでテンプレート選択を確認してください。')