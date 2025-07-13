#!/usr/bin/env node

/**
 * 🔍 完全テンプレート挿入検証システム
 * 
 * 機能:
 * 1. 全13テンプレートの必須フィールド完全性チェック
 * 2. データ変換過程での情報損失分析
 * 3. テンプレートデータの詳細検証
 * 4. 実際の挿入状況の可視化レポート
 */

// ESモジュール形式での動的インポート
async function importServices() {
  const { contentGeneratorService } = await import('./app/services/contentGeneratorService.js')
  const { pureStructureMatchingService } = await import('./app/services/pureStructureMatchingService.js')
  return { contentGeneratorService, pureStructureMatchingService }
}

const fs = require('fs')
const path = require('path')

class CompleteValidationTester {
  constructor() {
    this.contentGenerator = null
    this.structureMatcher = null
    this.inputDir = path.join(__dirname, 'input')
    this.outputDir = path.join(__dirname, 'test-results')
    this.validationResults = []
  }

  async initialize() {
    const services = await importServices()
    this.contentGenerator = services.contentGeneratorService
    this.structureMatcher = services.pureStructureMatchingService
  }

  async runCompleteValidation() {
    await this.initialize()
    
    console.log('🔍 完全テンプレート挿入検証テスト開始')
    console.log('='.repeat(80))
    
    // 出力ディレクトリ作成
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true })
    }

    // 入力ファイル一覧を取得
    const inputFiles = fs.readdirSync(this.inputDir)
      .filter(file => file.endsWith('.txt'))
      .sort()

    console.log(`📁 検証対象ファイル: ${inputFiles.length}件`)
    console.log('')

    // 各ファイルを詳細検証
    for (const file of inputFiles) {
      await this.validateSingleFile(file)
    }

    // 包括的レポート生成
    this.generateCompleteReport()
    
    console.log('✅ 完全検証テスト完了')
  }

  async validateSingleFile(filename) {
    console.log(`🔍 完全検証実行: ${filename}`)
    console.log('-'.repeat(60))

    try {
      // 入力ファイル読み込み
      const inputPath = path.join(this.inputDir, filename)
      const userInput = fs.readFileSync(inputPath, 'utf-8')
      
      console.log(`📖 入力文字数: ${userInput.length}文字`)

      // AI生成実行
      console.log('🚀 Gemini AI生成中...')
      const startTime = Date.now()
      const generatedContent = await this.contentGenerator.generateHighQualityContent(userInput)
      const genTime = ((Date.now() - startTime) / 1000).toFixed(1)
      
      console.log(`✅ AI生成完了 (${genTime}秒)`)
      console.log(`📄 生成ページ数: ${generatedContent.pages.length}ページ`)

      // テンプレートマッチング実行
      console.log('🎯 テンプレートマッチング実行中...')
      const matchedPages = this.structureMatcher.matchTemplateToContent(generatedContent.pages)
      
      // 各ページの完全検証
      const pageValidations = []
      let totalDataIntegrityScore = 0
      let totalCompletenessScore = 0
      
      console.log('\n📊 ページ別完全検証結果:')
      console.log('-'.repeat(60))

      for (let i = 0; i < matchedPages.length; i++) {
        const page = matchedPages[i]
        const validation = this.validatePageCompleteness(page, i + 1)
        pageValidations.push(validation)
        
        totalDataIntegrityScore += validation.dataLossAnalysis.dataIntegrityScore
        totalCompletenessScore += validation.detailedValidation.completenessScore
        
        const integrityMark = validation.dataLossAnalysis.dataIntegrityScore >= 95 ? '💯' : 
                             validation.dataLossAnalysis.dataIntegrityScore >= 80 ? '⚠️' : '❌'
        const completenessMark = validation.detailedValidation.completenessScore >= 95 ? '💯' : 
                                validation.detailedValidation.completenessScore >= 80 ? '⚠️' : '❌'
        
        console.log(`📄 ページ${i + 1}: ${validation.selectedTemplate}`)
        console.log(`   📊 データ整合性: ${validation.dataLossAnalysis.dataIntegrityScore.toFixed(1)}% ${integrityMark}`)
        console.log(`   🔍 完全性: ${validation.detailedValidation.completenessScore.toFixed(1)}% ${completenessMark}`)
        
        if (validation.dataLossAnalysis.hasDataLoss) {
          console.log(`   ⚠️  データ損失: ${validation.dataLossAnalysis.lostFields.join(', ')}`)
        }
        
        if (!validation.detailedValidation.isComplete) {
          console.log(`   ❌ 不足フィールド: ${validation.detailedValidation.missingFields.join(', ')}`)
        }
        
        console.log('')
      }

      // ファイル全体の検証結果
      const averageIntegrity = totalDataIntegrityScore / matchedPages.length
      const averageCompleteness = totalCompletenessScore / matchedPages.length
      const perfectPages = pageValidations.filter(v => 
        v.dataLossAnalysis.dataIntegrityScore >= 95 && v.detailedValidation.completenessScore >= 95
      ).length

      console.log(`📈 ${filename} 検証サマリー:`)
      console.log(`  - 完璧ページ: ${perfectPages}/${matchedPages.length} (${(perfectPages/matchedPages.length*100).toFixed(1)}%)`)
      console.log(`  - 平均データ整合性: ${averageIntegrity.toFixed(1)}%`)
      console.log(`  - 平均完全性: ${averageCompleteness.toFixed(1)}%`)

      // 検証結果保存
      const validationResult = {
        filename,
        inputLength: userInput.length,
        totalPages: matchedPages.length,
        perfectPages,
        averageIntegrity,
        averageCompleteness,
        pageValidations,
        generationTime: `${genTime}秒`,
        timestamp: new Date().toISOString()
      }

      this.validationResults.push(validationResult)
      
      // 個別結果ファイル保存
      const outputPath = path.join(this.outputDir, `${filename.replace('.txt', '')}_complete_validation.json`)
      fs.writeFileSync(outputPath, JSON.stringify(validationResult, null, 2))
      
      console.log(`💾 完全検証結果保存: ${outputPath}`)
      console.log('')

    } catch (error) {
      console.error(`❌ エラー: ${filename}`, error.message)
      console.log('')
    }
  }

  validatePageCompleteness(page, pageNumber) {
    // より詳細な検証を実行
    const validation = {
      pageNumber,
      selectedTemplate: page.templateType,
      detailedValidation: this.validateTemplateDataCompleteness(page.templateData, page.templateType, page.content),
      dataLossAnalysis: this.analyzeDataLoss(page.content, page.templateData, page.templateType),
      renderingValidation: this.validateRenderingReadiness(page.templateData, page.templateType)
    }
    
    return validation
  }

  validateTemplateDataCompleteness(templateData, templateType, originalContent) {
    if (!templateData) return { isComplete: false, missingFields: ['templateData'], completenessScore: 0 }
    
    const validation = {
      isComplete: true,
      missingFields: [],
      extraFields: [],
      fieldValidation: {},
      completenessScore: 0
    }

    // テンプレート別の期待フィールド定義
    const expectedFields = this.getExpectedFields(templateType)
    const actualFields = Object.keys(templateData)
    
    // 必須フィールドの検証
    expectedFields.required.forEach(field => {
      const value = this.getNestedValue(templateData, field)
      const isValid = this.validateFieldValue(value, field, templateType)
      
      validation.fieldValidation[field] = {
        exists: value !== undefined && value !== null,
        isValid,
        value: this.summarizeValue(value)
      }
      
      if (!isValid) {
        validation.isComplete = false
        validation.missingFields.push(field)
      }
    })
    
    // オプションフィールドの検証
    expectedFields.optional.forEach(field => {
      const value = this.getNestedValue(templateData, field)
      if (value !== undefined && value !== null) {
        validation.fieldValidation[field] = {
          exists: true,
          isValid: this.validateFieldValue(value, field, templateType),
          value: this.summarizeValue(value)
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

  analyzeDataLoss(originalContent, templateData, templateType) {
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

  validateRenderingReadiness(templateData, templateType) {
    // テンプレートレンダリングの準備状況を検証
    const readiness = {
      isReady: true,
      issues: [],
      renderabilityScore: 100
    }
    
    // 基本的なレンダリング要件チェック
    if (!templateData.title || templateData.title.trim() === '') {
      readiness.isReady = false
      readiness.issues.push('タイトルが空または未定義')
    }
    
    // テンプレート特有のレンダリング要件
    switch (templateType) {
      case 'table':
        if (!templateData.tableData?.headers?.length || !templateData.tableData?.rows?.length) {
          readiness.isReady = false
          readiness.issues.push('テーブルデータが不完全')
        }
        break
        
      case 'simple3':
        if (!templateData.twoColumn?.left?.length || !templateData.twoColumn?.right?.length) {
          readiness.isReady = false
          readiness.issues.push('2カラムデータが不完全')
        }
        break
        
      case 'enumeration':
      case 'list':
        if (!templateData.items?.length) {
          readiness.isReady = false
          readiness.issues.push('アイテムリストが空')
        }
        break
    }
    
    // スコア計算
    readiness.renderabilityScore = readiness.isReady ? 100 : Math.max(0, 100 - (readiness.issues.length * 20))
    
    return readiness
  }

  generateCompleteReport() {
    console.log('\n📊 完全検証テスト総合レポート')
    console.log('='.repeat(80))

    const totalPages = this.validationResults.reduce((sum, result) => sum + result.totalPages, 0)
    const totalPerfectPages = this.validationResults.reduce((sum, result) => sum + result.perfectPages, 0)
    const averageIntegrity = this.validationResults.reduce((sum, result) => sum + result.averageIntegrity, 0) / this.validationResults.length
    const averageCompleteness = this.validationResults.reduce((sum, result) => sum + result.averageCompleteness, 0) / this.validationResults.length

    console.log(`📈 検証統計:`)
    console.log(`  - 総ページ数: ${totalPages}`)
    console.log(`  - 完璧ページ (95%以上): ${totalPerfectPages} (${(totalPerfectPages/totalPages*100).toFixed(1)}%)`)
    console.log(`  - 平均データ整合性: ${averageIntegrity.toFixed(1)}%`)
    console.log(`  - 平均完全性: ${averageCompleteness.toFixed(1)}%`)
    console.log('')

    // テンプレート別統計
    const templateStats = {}
    this.validationResults.forEach(result => {
      result.pageValidations.forEach(page => {
        if (!templateStats[page.selectedTemplate]) {
          templateStats[page.selectedTemplate] = {
            count: 0,
            perfectCount: 0,
            totalIntegrity: 0,
            totalCompleteness: 0
          }
        }
        const stats = templateStats[page.selectedTemplate]
        stats.count++
        stats.totalIntegrity += page.dataLossAnalysis.dataIntegrityScore
        stats.totalCompleteness += page.detailedValidation.completenessScore
        
        if (page.dataLossAnalysis.dataIntegrityScore >= 95 && page.detailedValidation.completenessScore >= 95) {
          stats.perfectCount++
        }
      })
    })

    console.log(`📋 テンプレート別検証結果:`)
    Object.entries(templateStats).forEach(([template, stats]) => {
      const perfectRate = (stats.perfectCount / stats.count * 100).toFixed(1)
      const avgIntegrity = (stats.totalIntegrity / stats.count).toFixed(1)
      const avgCompleteness = (stats.totalCompleteness / stats.count).toFixed(1)
      console.log(`  - ${template}: ${stats.perfectCount}/${stats.count} (${perfectRate}% 完璧)`)
      console.log(`    データ整合性: ${avgIntegrity}% | 完全性: ${avgCompleteness}%`)
    })
    console.log('')

    // レポートファイル保存
    const reportPath = path.join(this.outputDir, 'complete_validation_report.json')
    const report = {
      summary: {
        totalPages,
        totalPerfectPages,
        perfectRate: totalPerfectPages / totalPages,
        averageIntegrity,
        averageCompleteness
      },
      templateStats,
      validationResults: this.validationResults,
      generatedAt: new Date().toISOString()
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    console.log(`💾 完全検証レポート保存: ${reportPath}`)
  }

  // ヘルパー関数群
  getExpectedFields(templateType) {
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

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  validateFieldValue(value, field, templateType) {
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

  summarizeValue(value) {
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
}

// メイン実行
async function main() {
  const tester = new CompleteValidationTester()
  await tester.runCompleteValidation()
}

// Node.js環境での実行
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { CompleteValidationTester }