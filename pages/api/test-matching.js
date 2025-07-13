/**
 * 100点ルール検証API
 * 
 * 完全な生成フローを再現：
 * 1. 実際のGemini AI生成
 * 2. 実際のテンプレートマッチング
 * 3. 実際のstructureScore測定
 * 4. 100点未満パターンの特定
 * 
 * モック一切禁止 - 全て本物のフロー
 */

import { contentGeneratorService } from '../../app/services/contentGeneratorService'
import { pureStructureMatchingService } from '../../app/services/pureStructureMatchingService'
import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST method required' })
  }

  const { testMode = 'single', fileIndex = 0 } = req.body

  try {
    console.log('🎯 100点ルール検証API開始')
    
    if (testMode === 'all') {
      // 全ファイルテスト
      const results = await runAllFilesTest()
      return res.status(200).json(results)
    } else {
      // 単一ファイルテスト
      const result = await runSingleFileTest(fileIndex)
      return res.status(200).json(result)
    }

  } catch (error) {
    console.error('❌ テストAPI実行エラー:', error)
    return res.status(500).json({ 
      error: 'テスト実行に失敗しました',
      details: error.message 
    })
  }
}

async function runAllFilesTest() {
  const inputDir = path.join(process.cwd(), 'input')
  const inputFiles = fs.readdirSync(inputDir)
    .filter(file => file.endsWith('.txt'))
    .sort()

  console.log(`📁 テスト対象: ${inputFiles.length}ファイル`)

  const allResults = []
  let totalPages = 0
  let perfectMatches = 0

  for (let i = 0; i < inputFiles.length; i++) {
    const filename = inputFiles[i]
    console.log(`🔍 処理中: ${filename} (${i + 1}/${inputFiles.length})`)
    
    try {
      const result = await processSingleFile(filename, i + 1)
      allResults.push(result)
      totalPages += result.totalPages
      perfectMatches += result.perfectCount
    } catch (error) {
      console.error(`❌ ${filename} 処理エラー:`, error.message)
      allResults.push({
        fileIndex: i + 1,
        filename,
        error: error.message,
        success: false
      })
    }
  }

  // 総合分析
  const imperfectMatches = totalPages - perfectMatches
  const perfectRate = totalPages > 0 ? (perfectMatches / totalPages * 100).toFixed(1) : 0

  // 100点未満パターンの分析
  const imperfectPages = []
  const structureGroups = {}

  allResults.forEach(result => {
    if (result.success && result.pageAnalysis) {
      result.pageAnalysis.forEach(page => {
        if (!page.isPerfect) {
          const structureKey = getStructureKey(page.structureInfo)
          imperfectPages.push({
            file: result.filename,
            page: page.pageNumber,
            template: page.selectedTemplate,
            score: page.bestScore,
            structure: structureKey
          })

          if (!structureGroups[structureKey]) {
            structureGroups[structureKey] = []
          }
          structureGroups[structureKey].push({
            file: result.filename,
            page: page.pageNumber,
            score: page.bestScore
          })
        }
      })
    }
  })

  // 新テンプレート提案
  const templateSuggestions = Object.entries(structureGroups).map(([structure, pages]) => ({
    structurePattern: structure,
    suggestedTemplate: suggestTemplateName(structure),
    affectedPages: pages.length,
    averageScore: (pages.reduce((sum, p) => sum + p.score, 0) / pages.length).toFixed(3),
    examples: pages.slice(0, 3)
  }))

  return {
    summary: {
      totalFiles: inputFiles.length,
      totalPages,
      perfectMatches,
      imperfectMatches,
      perfectRate: `${perfectRate}%`
    },
    detailResults: allResults,
    imperfectPages,
    templateSuggestions,
    conclusion: perfectMatches === totalPages ? 
      '🎉 全ページ100点！新テンプレート不要' : 
      `⚠️ ${imperfectMatches}ページが100点未満。${templateSuggestions.length}種類の新テンプレートが必要`,
    timestamp: new Date().toISOString()
  }
}

async function runSingleFileTest(fileIndex) {
  const inputDir = path.join(process.cwd(), 'input')
  const inputFiles = fs.readdirSync(inputDir)
    .filter(file => file.endsWith('.txt'))
    .sort()

  if (fileIndex >= inputFiles.length) {
    throw new Error(`ファイルインデックス ${fileIndex} が範囲外です (0-${inputFiles.length - 1})`)
  }

  const filename = inputFiles[fileIndex]
  console.log(`🔍 単一ファイルテスト: ${filename}`)

  return await processSingleFile(filename, fileIndex + 1)
}

async function processSingleFile(filename, fileIndex) {
  const inputPath = path.join(process.cwd(), 'input', filename)
  const userInput = fs.readFileSync(inputPath, 'utf-8')

  console.log(`📖 ${filename}: ${userInput.length}文字`)

  // 🚀 実際のGemini AI生成（モックなし）
  console.log('🚀 Gemini AI生成実行中...')
  const generatedContent = await contentGeneratorService.generateHighQualityContent(userInput)
  
  console.log(`📄 生成完了: ${generatedContent.pages.length}ページ`)

  // 🎯 実際のテンプレートマッチング（モックなし）
  console.log('🎯 テンプレートマッチング実行中...')
  const matchedPages = pureStructureMatchingService.matchTemplateToContent(generatedContent.pages)

  // 📊 各ページの詳細分析
  const pageAnalysis = []
  let perfectCount = 0

  for (let i = 0; i < matchedPages.length; i++) {
    const page = matchedPages[i]
    const analysis = await analyzePageMatching(page, i + 1)
    pageAnalysis.push(analysis)
    
    if (analysis.isPerfect) {
      perfectCount++
    }

    const perfectMark = analysis.isPerfect ? '💯' : '⚠️'
    console.log(`  📄 ページ${i + 1}: ${analysis.selectedTemplate} (${analysis.bestScore.toFixed(3)}) ${perfectMark}`)
  }

  return {
    fileIndex,
    filename,
    success: true,
    inputLength: userInput.length,
    totalPages: matchedPages.length,
    perfectCount,
    imperfectCount: matchedPages.length - perfectCount,
    perfectRate: `${(perfectCount / matchedPages.length * 100).toFixed(1)}%`,
    pageAnalysis,
    rawGeneratedContent: {
      caption: generatedContent.caption,
      summary: generatedContent.summary,
      totalPages: generatedContent.totalPages
    },
    timestamp: new Date().toISOString()
  }
}

async function analyzePageMatching(page, pageNumber) {
  const content = page.content

  // 構造情報詳細取得
  const sections = content?.sections || []
  const directItems = content?.items || []
  const hasTitle = !!content?.title
  const hasDescription = !!content?.description
  const hasTableData = !!(content?.tableData?.headers?.length && content?.tableData?.rows?.length)
  const hasChecklist = !!(content?.checklist?.length)

  // 🔬 実際のstructureScore測定（モックなし）
  const patterns = pureStructureMatchingService.structurePatterns
  const scores = patterns.map(pattern => {
    const isMatch = pattern.structureCheck(content)
    const structureScore = pattern.structureScore(content)
    const finalScore = structureScore * pattern.priority
    
    return {
      templateType: pattern.templateType,
      description: pattern.description,
      isMatch,
      structureScore,
      priority: pattern.priority,
      finalScore,
      isPerfect: structureScore === 1.0
    }
  })

  // 最高スコア順にソート
  scores.sort((a, b) => b.finalScore - a.finalScore)
  const bestMatch = scores[0]
  const runnerUp = scores[1]

  return {
    pageNumber,
    selectedTemplate: bestMatch.templateType,
    bestScore: bestMatch.structureScore,
    finalScore: bestMatch.finalScore,
    isPerfect: bestMatch.structureScore === 1.0,
    runnerUp: runnerUp ? {
      template: runnerUp.templateType,
      score: runnerUp.structureScore,
      gap: (bestMatch.finalScore - runnerUp.finalScore).toFixed(3)
    } : null,
    allScores: scores.slice(0, 5), // トップ5のみ
    structureInfo: {
      hasTitle,
      hasDescription,
      sectionsCount: sections.length,
      directItemsCount: directItems.length,
      hasTableData,
      hasChecklist
    },
    contentPreview: {
      title: content.title?.substring(0, 50) + (content.title?.length > 50 ? '...' : ''),
      itemsType: directItems.length > 0 ? typeof directItems[0] : 'none',
      firstSectionTitle: sections.length > 0 ? sections[0].title?.substring(0, 30) : null
    },
    templateData: {
      hasRequiredFields: checkRequiredFields(page.templateData, bestMatch.templateType),
      fieldCount: Object.keys(page.templateData || {}).length
    }
  }
}

function checkRequiredFields(templateData, templateType) {
  if (!templateData) return false

  // テンプレート別必須フィールドチェック
  switch (templateType) {
    case 'enumeration':
    case 'list':
      return !!(templateData.title && templateData.items?.length)
    case 'simple6':
      return !!(templateData.title && templateData.content && templateData.items?.length)
    case 'simple3':
      return !!(templateData.title && templateData.twoColumn)
    case 'table':
      return !!(templateData.title && templateData.tableData?.headers?.length)
    case 'explanation2':
      return !!(templateData.title && templateData.points?.length)
    case 'simple5':
      return !!(templateData.title && (templateData.steps?.length || templateData.checklist?.length))
    case 'section-items':
    case 'two-column-section-items':
      return !!(templateData.title && templateData.sections?.length)
    default:
      return !!(templateData.title)
  }
}

function getStructureKey(structure) {
  const parts = []
  
  if (structure.hasTitle) parts.push('title')
  if (structure.hasDescription) parts.push('description')
  if (structure.sectionsCount > 0) parts.push(`sections:${structure.sectionsCount}`)
  if (structure.directItemsCount > 0) parts.push(`items:${structure.directItemsCount}`)
  if (structure.hasTableData) parts.push('table')
  if (structure.hasChecklist) parts.push('checklist')
  
  return parts.join('+')
}

function suggestTemplateName(structureKey) {
  if (structureKey.includes('description+items:')) {
    return 'DescriptionListTemplate'
  }
  if (structureKey.includes('title+items:') && !structureKey.includes('description')) {
    return 'TitleListTemplate'
  }
  if (structureKey.includes('sections:') && structureKey.includes('items:')) {
    return 'SectionItemsTemplate'
  }
  if (structureKey.includes('table')) {
    return 'TableTemplate'
  }
  if (structureKey.includes('checklist')) {
    return 'ChecklistTemplate'
  }
  
  return `CustomTemplate_${structureKey.replace(/[+:]/g, '_')}`
}