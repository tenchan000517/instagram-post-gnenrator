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
      fieldCount: Object.keys(page.templateData || {}).length,
      detailedValidation: validateTemplateDataCompleteness(page.templateData, bestMatch.templateType, content),
      dataLossAnalysis: analyzeDataLoss(content, page.templateData, bestMatch.templateType)
    }
  }
}

function checkRequiredFields(templateData, templateType) {
  if (!templateData) return false

  // 全13テンプレート別必須フィールドチェック（完全版）
  switch (templateType) {
    case 'enumeration':
    case 'list':
      return !!(templateData.title && templateData.items?.length)
    
    case 'simple6':
      return !!(templateData.title && templateData.content && templateData.items?.length)
    
    case 'simple3':
      return !!(templateData.title && templateData.twoColumn?.left?.length && templateData.twoColumn?.right?.length)
    
    case 'table':
      return !!(templateData.title && templateData.tableData?.headers?.length && templateData.tableData?.rows?.length)
    
    case 'explanation2':
      return !!(templateData.title && templateData.points?.length)
    
    case 'simple5':
      return !!(templateData.title && (templateData.steps?.length || templateData.checklist?.length))
    
    case 'section-items':
    case 'two-column-section-items':
      return !!(templateData.title && templateData.sections?.length && 
               templateData.sections.every(section => section.title && section.items?.length))
    
    case 'title-description-only':
      return !!(templateData.title && (templateData.description || templateData.content))
    
    case 'checklist-enhanced':
      return !!(templateData.title && templateData.checklist?.length && 
               templateData.checklist.every(item => item.text))
    
    case 'item-n-title-content':
      return !!(templateData.title && templateData.items?.length && 
               templateData.items.every(item => item.title || item.content))
    
    case 'single-section-no-items':
      return !!(templateData.title && templateData.sections?.length === 1 && 
               templateData.sections[0].title && templateData.sections[0].content)
    
    default:
      return !!(templateData.title)
  }
}

// 🔍 詳細なテンプレートデータ完全性検証
function validateTemplateDataCompleteness(templateData, templateType, originalContent) {
  if (!templateData) return { isComplete: false, missingFields: ['templateData'], score: 0 }
  
  const validation = {
    isComplete: true,
    missingFields: [],
    extraFields: [],
    fieldValidation: {},
    completenessScore: 0
  }

  // テンプレート別の期待フィールド定義
  const expectedFields = getExpectedFields(templateType)
  const actualFields = Object.keys(templateData)
  
  // 必須フィールドの検証
  expectedFields.required.forEach(field => {
    const value = getNestedValue(templateData, field)
    const isValid = validateFieldValue(value, field, templateType)
    
    validation.fieldValidation[field] = {
      exists: value !== undefined && value !== null,
      isValid,
      value: summarizeValue(value)
    }
    
    if (!isValid) {
      validation.isComplete = false
      validation.missingFields.push(field)
    }
  })
  
  // オプションフィールドの検証
  expectedFields.optional.forEach(field => {
    const value = getNestedValue(templateData, field)
    if (value !== undefined && value !== null) {
      validation.fieldValidation[field] = {
        exists: true,
        isValid: validateFieldValue(value, field, templateType),
        value: summarizeValue(value)
      }
    }
  })
  
  // 予期しない追加フィールドの検出
  actualFields.forEach(field => {
    if (!expectedFields.required.includes(field) && !expectedFields.optional.includes(field)) {
      validation.extraFields.push(field)
    }
  })
  
  // 完全性スコア計算
  const validRequiredFields = expectedFields.required.filter(field => 
    validation.fieldValidation[field]?.isValid
  ).length
  validation.completenessScore = (validRequiredFields / expectedFields.required.length) * 100
  
  return validation
}

// 📊 データ損失分析機能
function analyzeDataLoss(originalContent, templateData, templateType) {
  const analysis = {
    hasDataLoss: false,
    lostFields: [],
    preservedFields: [],
    transformationIssues: [],
    dataIntegrityScore: 100
  }
  
  // 元データの要素をカウント
  const originalStats = {
    title: !!originalContent.title,
    description: !!originalContent.description,
    itemsCount: originalContent.items?.length || 0,
    sectionsCount: originalContent.sections?.length || 0,
    tableData: !!(originalContent.tableData?.headers?.length && originalContent.tableData?.rows?.length),
    checklist: originalContent.checklist?.length || 0
  }
  
  // 変換後データの要素をカウント
  const templateStats = {
    title: !!templateData.title,
    description: !!(templateData.description || templateData.content),
    itemsCount: templateData.items?.length || 0,
    sectionsCount: templateData.sections?.length || 0,
    tableData: !!(templateData.tableData?.headers?.length && templateData.tableData?.rows?.length),
    checklist: templateData.checklist?.length || 0
  }
  
  // データ損失の検出
  if (originalStats.title && !templateStats.title) {
    analysis.hasDataLoss = true
    analysis.lostFields.push('title')
  } else if (originalStats.title) {
    analysis.preservedFields.push('title')
  }
  
  if (originalStats.description && !templateStats.description) {
    analysis.hasDataLoss = true
    analysis.lostFields.push('description/content')
  } else if (originalStats.description) {
    analysis.preservedFields.push('description/content')
  }
  
  // アイテム数の変化
  if (originalStats.itemsCount > templateStats.itemsCount) {
    analysis.hasDataLoss = true
    analysis.lostFields.push(`items (${originalStats.itemsCount} → ${templateStats.itemsCount})`)
  } else if (originalStats.itemsCount > 0) {
    analysis.preservedFields.push(`items (${templateStats.itemsCount})`)
  }
  
  // セクション数の変化
  if (originalStats.sectionsCount > templateStats.sectionsCount) {
    analysis.hasDataLoss = true
    analysis.lostFields.push(`sections (${originalStats.sectionsCount} → ${templateStats.sectionsCount})`)
  } else if (originalStats.sectionsCount > 0) {
    analysis.preservedFields.push(`sections (${templateStats.sectionsCount})`)
  }
  
  // データ整合性スコア計算
  const totalElements = Object.values(originalStats).reduce((sum, val) => 
    sum + (typeof val === 'boolean' ? (val ? 1 : 0) : val), 0
  )
  const lostElements = analysis.lostFields.length
  
  if (totalElements > 0) {
    analysis.dataIntegrityScore = Math.max(0, ((totalElements - lostElements) / totalElements) * 100)
  }
  
  return analysis
}

// ヘルパー関数群
function getExpectedFields(templateType) {
  const fieldDefinitions = {
    'enumeration': {
      required: ['title', 'items'],
      optional: ['description', 'badgeText', 'pageNumber']
    },
    'list': {
      required: ['title', 'items'],
      optional: ['description', 'badgeText', 'pageNumber']
    },
    'simple6': {
      required: ['title', 'content', 'items'],
      optional: ['description', 'badgeText', 'pageNumber']
    },
    'simple3': {
      required: ['title', 'twoColumn.left', 'twoColumn.right'],
      optional: ['description', 'badgeText', 'pageNumber']
    },
    'table': {
      required: ['title', 'tableData.headers', 'tableData.rows'],
      optional: ['description', 'badgeText', 'pageNumber']
    },
    'explanation2': {
      required: ['title', 'points'],
      optional: ['description', 'badgeText', 'pageNumber']
    },
    'simple5': {
      required: ['title'],
      optional: ['steps', 'checklist', 'description', 'badgeText', 'pageNumber']
    },
    'section-items': {
      required: ['title', 'sections'],
      optional: ['description', 'badgeText', 'pageNumber']
    },
    'two-column-section-items': {
      required: ['title', 'sections'],
      optional: ['description', 'badgeText', 'pageNumber']
    },
    'title-description-only': {
      required: ['title'],
      optional: ['description', 'content', 'badgeText', 'pageNumber']
    },
    'checklist-enhanced': {
      required: ['title', 'checklist'],
      optional: ['description', 'badgeText', 'pageNumber']
    },
    'item-n-title-content': {
      required: ['title', 'items'],
      optional: ['description', 'badgeText', 'pageNumber']
    },
    'single-section-no-items': {
      required: ['title', 'sections'],
      optional: ['description', 'badgeText', 'pageNumber']
    }
  }
  
  return fieldDefinitions[templateType] || { required: ['title'], optional: [] }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

function validateFieldValue(value, field, templateType) {
  if (value === undefined || value === null) return false
  
  if (field.includes('items') || field.includes('sections') || field.includes('points') || 
      field.includes('checklist') || field.includes('headers') || field.includes('rows')) {
    return Array.isArray(value) && value.length > 0
  }
  
  if (field.includes('twoColumn')) {
    return Array.isArray(value) && value.length > 0
  }
  
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  
  return true
}

function summarizeValue(value) {
  if (Array.isArray(value)) {
    return `Array[${value.length}]`
  }
  if (typeof value === 'string') {
    return value.length > 50 ? `"${value.substring(0, 50)}..."` : `"${value}"`
  }
  if (typeof value === 'object' && value !== null) {
    return `Object{${Object.keys(value).join(', ')}}`
  }
  return String(value)
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