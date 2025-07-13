/**
 * API経由で100点ルール検証実行
 * ログを確認してstructureScore分析
 */

const https = require('http')

async function runTest(testAll = true) {
  const postData = JSON.stringify({
    testMode: testAll ? 'all' : 'single',
    fileIndex: 0
  })

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/test-matching',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  console.log('🚀 100点ルール検証開始...')
  console.log('📡 API呼び出し中...')
  
  const req = https.request(options, (res) => {
    let data = ''
    
    res.on('data', (chunk) => {
      data += chunk
    })
    
    res.on('end', () => {
      console.log('\n✅ API応答受信')
      try {
        const result = JSON.parse(data)
        console.log('📊 検証結果概要:')
        console.log(JSON.stringify(result.summary || result, null, 2))
      } catch (e) {
        console.log('Raw response:', data)
      }
    })
  })

  req.on('error', (e) => {
    console.error('❌ API呼び出しエラー:', e.message)
  })

  req.write(postData)
  req.end()
}

// 全ファイルテスト実行
runTest(true)