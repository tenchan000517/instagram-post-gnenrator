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
      
      // 🔍 テンプレートデータ詳細検証を追加
      const templateDataValidation = validateTemplateData(page.templateData, page.templateType, page.content)
      analysis.templateDataValidation = templateDataValidation
      
      analysisResults.push(analysis)
      
      // 構造スコアとテンプレートデータ完全性の両方で判定
      const isStructurePerfect = analysis.isPerfect
      const isDataComplete = templateDataValidation.completenessScore >= 95 && templateDataValidation.dataIntegrityScore >= 95
      const isTotallyPerfect = isStructurePerfect && isDataComplete
      
      if (isTotallyPerfect) {
        perfectCount++
      }

      const perfectMark = isTotallyPerfect ? '💯' : isStructurePerfect ? '⚠️' : '❌'
      console.log(`📄 ページ${i + 1}: ${analysis.selectedTemplate} (構造: ${analysis.bestScore.toFixed(3)}) ${perfectMark}`)
      console.log(`   📊 データ完全性: ${templateDataValidation.completenessScore.toFixed(1)}% | 整合性: ${templateDataValidation.dataIntegrityScore.toFixed(1)}%`)
      
      if (!isStructurePerfect) {
        console.log(`   ⚠️  構造: ${analysis.structureKey}`)
        console.log(`   💡 提案テンプレート: ${analysis.suggestedTemplate}`)
      }
      
      if (!isDataComplete) {
        if (templateDataValidation.missingFields.length > 0) {
          console.log(`   ❌ 不足フィールド: ${templateDataValidation.missingFields.join(', ')}`)
        }
        if (templateDataValidation.lostData.length > 0) {
          console.log(`   📉 データ損失: ${templateDataValidation.lostData.join(', ')}`)
        }
      }
      
      console.log('')
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

// 🔍 テンプレートデータ詳細検証機能
function validateTemplateData(templateData: any, templateType: string, originalContent: any) {
  if (!templateData) {
    return {
      completenessScore: 0,
      dataIntegrityScore: 0,
      missingFields: ['templateData'],
      lostData: ['全データ'],
      isValid: false
    }
  }

  const validation = {
    completenessScore: 100,
    dataIntegrityScore: 100,
    missingFields: [] as string[],
    lostData: [] as string[],
    isValid: true
  }

  // テンプレート別必須フィールドチェック
  const expectedFields = getExpectedFields(templateType)
  let validFields = 0

  expectedFields.required.forEach(field => {
    const value = getNestedValue(templateData, field)
    const isValid = validateFieldValue(value, field)
    
    if (isValid) {
      validFields++
    } else {
      validation.missingFields.push(field)
      validation.isValid = false
    }
  })

  // 完全性スコア計算
  validation.completenessScore = (validFields / expectedFields.required.length) * 100

  // データ整合性チェック（元データとの比較）
  const dataLossAnalysis = analyzeDataLoss(originalContent, templateData)
  validation.dataIntegrityScore = dataLossAnalysis.integrityScore
  validation.lostData = dataLossAnalysis.lostFields

  return validation
}

// テンプレート別期待フィールド定義
function getExpectedFields(templateType: string) {
  const fieldMap: Record<string, { required: string[], optional: string[] }> = {
    'enumeration': { required: ['title', 'items'], optional: ['description', 'badgeText'] },
    'list': { required: ['title', 'items'], optional: ['description', 'badgeText'] },
    'simple6': { required: ['title', 'content', 'items'], optional: ['description', 'badgeText'] },
    'simple3': { required: ['title', 'twoColumn'], optional: ['description', 'badgeText'] },
    'table': { required: ['title', 'tableData'], optional: ['description', 'badgeText'] },
    'explanation2': { required: ['title', 'points'], optional: ['description', 'badgeText'] },
    'simple5': { required: ['title'], optional: ['steps', 'checklist', 'description', 'badgeText'] },
    'section-items': { required: ['title', 'sections'], optional: ['description', 'badgeText'] },
    'two-column-section-items': { required: ['title', 'sections'], optional: ['description', 'badgeText'] },
    'title-description-only': { required: ['title'], optional: ['description', 'content', 'badgeText'] },
    'checklist-enhanced': { required: ['title', 'checklist'], optional: ['description', 'badgeText'] },
    'item-n-title-content': { required: ['title', 'items'], optional: ['description', 'badgeText'] },
    'single-section-no-items': { required: ['title', 'sections'], optional: ['description', 'badgeText'] }
  }
  
  return fieldMap[templateType] || { required: ['title'], optional: [] }
}

// ネストされた値の取得
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

// フィールド値の妥当性チェック
function validateFieldValue(value: any, field: string): boolean {
  if (value === undefined || value === null) return false
  
  if (field.includes('items') || field.includes('sections') || field.includes('points') || 
      field.includes('checklist') || field === 'twoColumn') {
    return Array.isArray(value) && value.length > 0
  }
  
  if (field === 'tableData') {
    return value && Array.isArray(value.headers) && value.headers.length > 0 && 
           Array.isArray(value.rows) && value.rows.length > 0
  }
  
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  
  return true
}

// データ損失分析
function analyzeDataLoss(originalContent: any, templateData: any) {
  const lostFields: string[] = []
  let totalElements = 0
  let preservedElements = 0

  // タイトルチェック
  totalElements++
  if (originalContent?.title && templateData?.title) {
    preservedElements++
  } else if (originalContent?.title) {
    lostFields.push('title')
  }

  // 説明文チェック
  if (originalContent?.description) {
    totalElements++
    if (templateData?.description || templateData?.content) {
      preservedElements++
    } else {
      lostFields.push('description')
    }
  }

  // アイテム数チェック
  if (originalContent?.items?.length > 0) {
    totalElements++
    const originalCount = originalContent.items.length
    const templateCount = templateData?.items?.length || 0
    
    if (templateCount >= originalCount) {
      preservedElements++
    } else {
      lostFields.push(`items (${originalCount} → ${templateCount})`)
    }
  }

  // セクション数チェック
  if (originalContent?.sections?.length > 0) {
    totalElements++
    const originalCount = originalContent.sections.length
    const templateCount = templateData?.sections?.length || 0
    
    if (templateCount >= originalCount) {
      preservedElements++
    } else {
      lostFields.push(`sections (${originalCount} → ${templateCount})`)
    }
  }

  // テーブルデータチェック
  if (originalContent?.tableData?.headers?.length > 0) {
    totalElements++
    if (templateData?.tableData?.headers?.length > 0) {
      preservedElements++
    } else {
      lostFields.push('tableData')
    }
  }

  const integrityScore = totalElements > 0 ? (preservedElements / totalElements) * 100 : 100

  return {
    integrityScore,
    lostFields
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