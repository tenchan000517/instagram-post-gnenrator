/**
 * 単一ファイル検証スクリプト
 * API制限を考慮して一個ずつ丁寧に実行
 */

const http = require('http')

const fileIndex = process.argv[2] || 0

async function runSingleTest(index) {
  const postData = JSON.stringify({
    testMode: 'single',
    fileIndex: parseInt(index)
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

  console.log(`🔍 ファイル${index} (${['1.txt', '2.txt', '3.txt', '4.txt', '5.txt', '6.txt', '7.txt'][index]}) 検証開始...`)
  console.log('📡 Gemini AI生成中... (時間がかかる場合があります)')
  
  const req = http.request(options, (res) => {
    let data = ''
    
    res.on('data', (chunk) => {
      data += chunk
    })
    
    res.on('end', () => {
      console.log('\n✅ 検証完了')
      try {
        const result = JSON.parse(data)
        if (result.error) {
          console.error('❌ エラー:', result.error)
          return
        }
        
        console.log(`📊 ${result.filename} 結果:`)
        console.log(`  - 総ページ数: ${result.totalPages}`)
        console.log(`  - 完璧マッチ: ${result.perfectCount}/${result.totalPages} (${result.perfectRate})`)
        console.log(`  - 不完全マッチ: ${result.imperfectCount}`)
        
        if (result.pageAnalysis) {
          console.log(`\n📄 ページ別詳細:`)
          result.pageAnalysis.forEach(page => {
            const mark = page.isPerfect ? '💯' : '⚠️'
            console.log(`  ページ${page.pageNumber}: ${page.selectedTemplate} (${page.bestScore.toFixed(3)}) ${mark}`)
            if (!page.isPerfect && page.runnerUp) {
              console.log(`    次点: ${page.runnerUp.template} (${page.runnerUp.score.toFixed(3)}) 差分: ${page.runnerUp.gap}`)
            }
          })
        }
        
      } catch (e) {
        console.error('レスポンス解析エラー:', e.message)
        console.log('Raw response:', data.substring(0, 500))
      }
    })
  })

  req.on('error', (e) => {
    console.error('❌ API呼び出しエラー:', e.message)
    console.log('Next.jsサーバーが起動していることを確認してください')
  })

  req.write(postData)
  req.end()
}

runSingleTest(fileIndex)