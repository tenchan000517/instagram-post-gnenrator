/**
 * 直接実行版100点ルール検証
 * Next.js サーバー不要でESモジュール形式で実行
 */

import dotenv from 'dotenv'
dotenv.config()

import { contentGeneratorService } from './app/services/contentGeneratorService'
import { pureStructureMatchingService } from './app/services/pureStructureMatchingService'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function testSingleFile(fileIndex = 0) {
  const inputDir = path.join(__dirname, 'input')
  const inputFiles = fs.readdirSync(inputDir)
    .filter(file => file.endsWith('.txt'))
    .sort()

  if (fileIndex >= inputFiles.length) {
    console.error(`❌ ファイルインデックス ${fileIndex} が範囲外 (0-${inputFiles.length - 1})`)
    return
  }

  const filename = inputFiles[fileIndex]
  const inputPath = path.join(inputDir, filename)
  const userInput = fs.readFileSync(inputPath, 'utf-8')

  console.log('🎯 100点ルール検証テスト開始')
  console.log('='.repeat(60))
  console.log(`🔍 テスト対象: ${filename}`)
  console.log(`📖 入力文字数: ${userInput.length}文字`)
  console.log('')

  try {
    // 🚀 実際のGemini AI生成
    console.log('🚀 Gemini AI生成中...')
    const startTime = Date.now()
    const generatedContent = await contentGeneratorService.generateHighQualityContent(userInput)
    const genTime = ((Date.now() - startTime) / 1000).toFixed(1)
    
    console.log(`✅ AI生成完了 (${genTime}秒)`)
    console.log(`📄 生成ページ数: ${generatedContent.pages.length}ページ`)
    console.log('')

    // 🎯 実際のテンプレートマッチング
    console.log('🎯 テンプレートマッチング実行中...')
    const matchedPages = pureStructureMatchingService.matchTemplateToContent(generatedContent.pages)
    
    // 📊 各ページの詳細分析
    let perfectCount = 0
    const analysisResults = []

    console.log('📊 ページ別分析結果:')
    console.log('-'.repeat(60))

    for (let i = 0; i < matchedPages.length; i++) {
      const page = matchedPages[i]
      const analysis = analyzePageMatching(page, i + 1)
      analysisResults.push(analysis)
      
      if (analysis.isPerfect) {
        perfectCount++
      }

      const perfectMark = analysis.isPerfect ? '💯' : '⚠️'
      console.log(`📄 ページ${i + 1}: ${analysis.selectedTemplate} (${analysis.bestScore.toFixed(3)}) ${perfectMark}`)
      
      if (!analysis.isPerfect) {
        console.log(`   ⚠️  構造: ${analysis.structureKey}`)
        console.log(`   💡 提案テンプレート: ${analysis.suggestedTemplate}`)
      }
    }

    console.log('')
    console.log('📈 総合結果:')
    console.log(`  - 完璧マッチ: ${perfectCount}/${matchedPages.length} (${(perfectCount/matchedPages.length*100).toFixed(1)}%)`)
    console.log(`  - 不完全マッチ: ${matchedPages.length - perfectCount}`)

    if (perfectCount === matchedPages.length) {
      console.log('🎉 全ページ100点！新テンプレート追加不要')
    } else {
      console.log('⚠️  100点未満のページがあります。新テンプレートが必要です。')
    }

    // 結果をファイルに保存
    const outputDir = path.join(__dirname, 'test-results')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const result = {
      filename,
      inputLength: userInput.length,
      totalPages: matchedPages.length,
      perfectCount,
      imperfectCount: matchedPages.length - perfectCount,
      perfectRate: `${(perfectCount / matchedPages.length * 100).toFixed(1)}%`,
      pageAnalysis: analysisResults,
      generationTime: `${genTime}秒`,
      timestamp: new Date().toISOString()
    }

    const outputPath = path.join(outputDir, `${filename.replace('.txt', '')}_result.json`)
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))
    console.log(`💾 詳細結果保存: ${outputPath}`)

  } catch (error) {
    console.error('❌ テスト実行エラー:', (error as Error).message)
    console.error((error as Error).stack)
  }
}

function analyzePageMatching(page, pageNumber) {
  const content = page.content

  // 構造情報取得
  const sections = content?.sections || []
  const directItems = content?.items || []
  const hasTitle = !!content?.title
  const hasDescription = !!content?.description
  const hasTableData = !!(content?.tableData?.headers?.length && content?.tableData?.rows?.length)
  const hasChecklist = !!(content?.checklist?.length)

  // 構造キー生成
  const structureParts = []
  if (hasTitle) structureParts.push('title')
  if (hasDescription) structureParts.push('description')
  if (sections.length > 0) structureParts.push(`sections:${sections.length}`)
  if (directItems.length > 0) structureParts.push(`items:${directItems.length}`)
  if (hasTableData) structureParts.push('table')
  if (hasChecklist) structureParts.push('checklist')
  const structureKey = structureParts.join('+')

  // テンプレート提案
  let suggestedTemplate = 'Unknown'
  if (structureKey.includes('description+items:')) {
    suggestedTemplate = 'DescriptionListTemplate'
  } else if (structureKey.includes('title+items:') && !structureKey.includes('description')) {
    suggestedTemplate = 'TitleListTemplate'
  } else if (structureKey.includes('sections:') && structureKey.includes('items:')) {
    suggestedTemplate = 'SectionItemsTemplate'
  } else {
    suggestedTemplate = `CustomTemplate_${structureKey.replace(/[+:]/g, '_')}`
  }

  // structureScore計算
  const patterns = pureStructureMatchingService.structurePatterns
  const scores = patterns.map(pattern => {
    const structureScore = pattern.structureScore(content)
    const finalScore = structureScore * pattern.priority
    return {
      templateType: pattern.templateType,
      structureScore,
      finalScore,
      isPerfect: structureScore === 1.0
    }
  })

  scores.sort((a, b) => b.finalScore - a.finalScore)
  const bestMatch = scores[0]

  return {
    pageNumber,
    selectedTemplate: bestMatch.templateType,
    bestScore: bestMatch.structureScore,
    isPerfect: bestMatch.structureScore === 1.0,
    structureKey,
    suggestedTemplate,
    contentPreview: content.title?.substring(0, 50) + '...'
  }
}

// コマンドライン引数から取得
const fileIndex = parseInt(process.argv[2]) || 0
testSingleFile(fileIndex)