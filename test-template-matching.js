#!/usr/bin/env node

/**
 * 100点ルール検証スクリプト
 * 
 * 目的：
 * 1. 7つの入力ファイルでGemini AIから実際のコンテンツを生成
 * 2. 各ページのテンプレートマッチング結果を分析
 * 3. structureScoreが1.0未満のパターンを特定
 * 4. 不足している専用テンプレートを明確化
 */

// ESモジュール形式での動的インポート
async function importServices() {
  const { contentGeneratorService } = await import('./app/services/contentGeneratorService.js')
  const { pureStructureMatchingService } = await import('./app/services/pureStructureMatchingService.js')
  return { contentGeneratorService, pureStructureMatchingService }
}
const fs = require('fs')
const path = require('path')

class TemplateMatchingTester {
  constructor() {
    this.contentGenerator = null
    this.structureMatcher = null
    this.inputDir = path.join(__dirname, 'input')
    this.outputDir = path.join(__dirname, 'test-results')
    this.testResults = []
  }

  async initialize() {
    const services = await importServices()
    this.contentGenerator = services.contentGeneratorService
    this.structureMatcher = services.pureStructureMatchingService
  }

  async runFullTest() {
    // サービス初期化
    await this.initialize()
    
    console.log('🎯 100点ルール検証テスト開始')
    console.log('=' .repeat(60))
    
    // 出力ディレクトリ作成
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true })
    }

    // 入力ファイル一覧を取得
    const inputFiles = fs.readdirSync(this.inputDir)
      .filter(file => file.endsWith('.txt'))
      .sort()

    console.log(`📁 テスト対象ファイル: ${inputFiles.length}件`)
    inputFiles.forEach(file => console.log(`  - ${file}`))
    console.log('')

    // 各ファイルをテスト
    for (const file of inputFiles) {
      await this.testSingleInput(file)
    }

    // 結果分析とレポート生成
    this.generateDetailedReport()
    this.identifyMissingTemplates()
    
    console.log('✅ 100点ルール検証テスト完了')
  }

  async testSingleInput(filename) {
    console.log(`🔍 テスト実行: ${filename}`)
    console.log('-'.repeat(40))

    try {
      // 入力ファイル読み込み
      const inputPath = path.join(this.inputDir, filename)
      const userInput = fs.readFileSync(inputPath, 'utf-8')
      
      console.log(`📖 入力文字数: ${userInput.length}文字`)

      // AI生成実行
      console.log('🚀 Gemini AI生成中...')
      const generatedContent = await this.contentGenerator.generateHighQualityContent(userInput)
      
      console.log(`📄 生成ページ数: ${generatedContent.pages.length}ページ`)

      // 各ページのテンプレートマッチング分析
      const pageAnalysis = []
      
      for (let i = 0; i < generatedContent.pages.length; i++) {
        const page = generatedContent.pages[i]
        const analysis = this.analyzePageMatching(page, i + 1)
        pageAnalysis.push(analysis)
        
        console.log(`  📄 ページ${i + 1}: ${analysis.selectedTemplate} (スコア: ${analysis.bestScore.toFixed(3)})`)
        if (analysis.bestScore < 1.0) {
          console.log(`    ⚠️  100点未満: 専用テンプレート不足の可能性`)
        }
      }

      // テスト結果保存
      const testResult = {
        filename,
        inputLength: userInput.length,
        totalPages: generatedContent.pages.length,
        generatedContent,
        pageAnalysis,
        timestamp: new Date().toISOString()
      }

      this.testResults.push(testResult)
      
      // 個別結果ファイル保存
      const outputPath = path.join(this.outputDir, `${filename.replace('.txt', '')}_result.json`)
      fs.writeFileSync(outputPath, JSON.stringify(testResult, null, 2))
      
      console.log(`💾 結果保存: ${outputPath}`)
      console.log('')

    } catch (error) {
      console.error(`❌ エラー: ${filename}`, error.message)
      console.log('')
    }
  }

  analyzePageMatching(page, pageNumber) {
    console.log(`\n🔬 ページ${pageNumber}詳細分析:`)
    
    // 構造情報を取得
    const content = page.content
    const sections = content?.sections || []
    const directItems = content?.items || []
    const hasTitle = !!content?.title
    const hasDescription = !!content?.description
    const hasTableData = !!(content?.tableData?.headers?.length && content?.tableData?.rows?.length)
    const hasChecklist = !!(content?.checklist?.length)

    console.log(`  📊 構造情報:`)
    console.log(`    - タイトル: ${hasTitle ? '✅' : '❌'}`)
    console.log(`    - 説明文: ${hasDescription ? '✅' : '❌'}`)
    console.log(`    - セクション数: ${sections.length}`)
    console.log(`    - 直接アイテム数: ${directItems.length}`)
    console.log(`    - テーブルデータ: ${hasTableData ? '✅' : '❌'}`)
    console.log(`    - チェックリスト: ${hasChecklist ? '✅' : '❌'}`)

    // 各パターンのスコアを計算
    const patternScores = this.structureMatcher.structurePatterns.map(pattern => {
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
        isPerfe‌ct: structureScore === 1.0
      }
    })

    // スコア順にソート
    patternScores.sort((a, b) => b.finalScore - a.finalScore)
    
    console.log(`  🏆 マッチング結果:`)
    patternScores.slice(0, 3).forEach((score, index) => {
      const medal = ['🥇', '🥈', '🥉'][index]
      const perfect = score.isPerfe‌ct ? '💯' : '⚠️'
      console.log(`    ${medal} ${score.templateType}: ${score.finalScore.toFixed(3)} ${perfect}`)
      console.log(`       構造スコア: ${score.structureScore.toFixed(3)} | 優先度: ${score.priority}`)
    })

    const bestMatch = patternScores[0]
    
    return {
      pageNumber,
      selectedTemplate: bestMatch.templateType,
      bestScore: bestMatch.structureScore,
      finalScore: bestMatch.finalScore,
      isPerfect: bestMatch.isPerfe‌ct,
      allScores: patternScores,
      structureInfo: {
        hasTitle,
        hasDescription,
        sectionsCount: sections.length,
        directItemsCount: directItems.length,
        hasTableData,
        hasChecklist
      },
      rawContent: content
    }
  }

  generateDetailedReport() {
    console.log('\n📊 100点ルール検証レポート')
    console.log('=' .repeat(60))

    const totalPages = this.testResults.reduce((sum, result) => sum + result.totalPages, 0)
    const perfectMatches = this.testResults.reduce((sum, result) => 
      sum + result.pageAnalysis.filter(page => page.isPerfect).length, 0
    )
    const imperfectMatches = totalPages - perfectMatches

    console.log(`📈 総合統計:`)
    console.log(`  - 総ページ数: ${totalPages}`)
    console.log(`  - 完璧マッチ (100点): ${perfectMatches} (${(perfectMatches/totalPages*100).toFixed(1)}%)`)
    console.log(`  - 不完全マッチ (100点未満): ${imperfectMatches} (${(imperfectMatches/totalPages*100).toFixed(1)}%)`)
    console.log('')

    // テンプレート別統計
    const templateStats = {}
    this.testResults.forEach(result => {
      result.pageAnalysis.forEach(page => {
        if (!templateStats[page.selectedTemplate]) {
          templateStats[page.selectedTemplate] = { perfect: 0, imperfect: 0 }
        }
        if (page.isPerfect) {
          templateStats[page.selectedTemplate].perfect++
        } else {
          templateStats[page.selectedTemplate].imperfect++
        }
      })
    })

    console.log(`📋 テンプレート別統計:`)
    Object.entries(templateStats).forEach(([template, stats]) => {
      const total = stats.perfect + stats.imperfect
      const perfectRate = (stats.perfect / total * 100).toFixed(1)
      console.log(`  - ${template}: ${stats.perfect}/${total} (${perfectRate}% 完璧)`)
    })
    console.log('')

    // レポートファイル保存
    const reportPath = path.join(this.outputDir, 'matching_report.json')
    const report = {
      summary: {
        totalPages,
        perfectMatches,
        imperfectMatches,
        perfectRate: perfectMatches / totalPages
      },
      templateStats,
      testResults: this.testResults,
      generatedAt: new Date().toISOString()
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    console.log(`💾 詳細レポート保存: ${reportPath}`)
  }

  identifyMissingTemplates() {
    console.log('\n🎯 不足テンプレート特定')
    console.log('=' .repeat(60))

    const imperfectPages = []
    this.testResults.forEach(result => {
      result.pageAnalysis.forEach(page => {
        if (!page.isPerfect) {
          imperfectPages.push({
            file: result.filename,
            page: page.pageNumber,
            template: page.selectedTemplate,
            score: page.bestScore,
            structure: page.structureInfo,
            content: {
              title: page.rawContent.title,
              hasDescription: !!page.rawContent.description,
              itemsCount: page.rawContent.items?.length || 0,
              sectionsCount: page.rawContent.sections?.length || 0
            }
          })
        }
      })
    })

    if (imperfectPages.length === 0) {
      console.log('🎉 すべてのページが100点！専用テンプレート追加不要')
      return
    }

    console.log(`⚠️  100点未満のページ: ${imperfectPages.length}件`)
    console.log('')

    // 構造パターン別グループ化
    const structureGroups = {}
    imperfectPages.forEach(page => {
      const key = this.getStructureKey(page.structure)
      if (!structureGroups[key]) {
        structureGroups[key] = []
      }
      structureGroups[key].push(page)
    })

    console.log(`💡 必要な新テンプレート候補:`)
    Object.entries(structureGroups).forEach(([structureKey, pages]) => {
      console.log(`\n📋 構造パターン: ${structureKey}`)
      console.log(`  - 該当ページ数: ${pages.length}`)
      console.log(`  - 平均スコア: ${(pages.reduce((sum, p) => sum + p.score, 0) / pages.length).toFixed(3)}`)
      console.log(`  - 現在選択テンプレート: ${[...new Set(pages.map(p => p.template))].join(', ')}`)
      console.log(`  - 提案テンプレート名: ${this.suggestTemplateName(structureKey)}`)
      
      // 代表例を表示
      const example = pages[0]
      console.log(`  - 代表例: ${example.file} ページ${example.page}`)
      console.log(`    タイトル: "${example.content.title?.substring(0, 30)}..."`)
    })

    // 提案ファイル保存
    const suggestionsPath = path.join(this.outputDir, 'missing_templates.json')
    const suggestions = Object.entries(structureGroups).map(([structureKey, pages]) => ({
      structurePattern: structureKey,
      suggestedTemplateName: this.suggestTemplateName(structureKey),
      affectedPages: pages.length,
      averageScore: pages.reduce((sum, p) => sum + p.score, 0) / pages.length,
      examples: pages.slice(0, 3).map(p => ({
        file: p.file,
        page: p.page,
        title: p.content.title
      }))
    }))

    fs.writeFileSync(suggestionsPath, JSON.stringify(suggestions, null, 2))
    console.log(`\n💾 新テンプレート提案保存: ${suggestionsPath}`)
  }

  getStructureKey(structure) {
    const parts = []
    
    if (structure.hasTitle) parts.push('title')
    if (structure.hasDescription) parts.push('description')
    if (structure.sectionsCount > 0) parts.push(`sections:${structure.sectionsCount}`)
    if (structure.directItemsCount > 0) parts.push(`items:${structure.directItemsCount}`)
    if (structure.hasTableData) parts.push('table')
    if (structure.hasChecklist) parts.push('checklist')
    
    return parts.join('+')
  }

  suggestTemplateName(structureKey) {
    if (structureKey.includes('description+items:')) {
      return 'DescriptionListTemplate'
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
}

// メイン実行
async function main() {
  const tester = new TemplateMatchingTester()
  await tester.runFullTest()
}

// Node.js環境での実行
if (require.main === module) {
  main().catch(console.error)
}

module.exports = { TemplateMatchingTester }