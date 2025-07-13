/**
 * 実際のコンテンツ生成フロー検証テスト
 * 
 * 実行方法:
 * npx tsx test-real-flow.tsx
 */

import * as fs from 'fs'
import * as path from 'path'
import { contentGeneratorService, GeneratedContent, GeneratedPage } from './app/services/contentGeneratorService'
import { TemplateStructureDefinitions } from './app/services/templateStructureDefinitions'

interface TestResult {
  fileName: string
  inputContent: string
  generatedContent: GeneratedContent | null
  error: string | null
  templateAnalysis: Array<{
    pageNumber: number
    templateType: string
    hasValidData: boolean
    requiredFieldsStatus: string[]
    dataStructure: any
    issues: string[]
  }>
  summary: {
    totalPages: number
    successfulTemplates: number
    dataIntegrityScore: number
    criticalIssues: string[]
  }
}

class RealFlowTester {
  private inputDir = '/mnt/c/instagram-course/instagram-post-generator/input'
  
  async runTest(fileName: string): Promise<TestResult> {
    console.log(`\n🧪 テスト開始: ${fileName}`)
    console.log('=' .repeat(60))
    
    const result: TestResult = {
      fileName,
      inputContent: '',
      generatedContent: null,
      error: null,
      templateAnalysis: [],
      summary: {
        totalPages: 0,
        successfulTemplates: 0,
        dataIntegrityScore: 0,
        criticalIssues: []
      }
    }
    
    try {
      // 入力ファイル読み込み
      const filePath = path.join(this.inputDir, fileName)
      result.inputContent = fs.readFileSync(filePath, 'utf-8')
      
      console.log(`📝 入力文字数: ${result.inputContent.length}文字`)
      console.log(`📄 入力プレビュー: ${result.inputContent.substring(0, 100)}...`)
      
      // 実際のフロー実行
      console.log(`\n🚀 フロー実行開始...`)
      result.generatedContent = await contentGeneratorService.generateHighQualityContent(result.inputContent)
      
      console.log(`✅ 生成完了！`)
      console.log(`📊 生成されたページ数: ${result.generatedContent.pages.length}`)
      
      // テンプレート分析
      result.templateAnalysis = this.analyzeTemplates(result.generatedContent.pages)
      result.summary = this.calculateSummary(result.templateAnalysis)
      
      // 結果表示
      this.displayResults(result)
      
    } catch (error) {
      result.error = error instanceof Error ? error.message : String(error)
      console.log(`❌ エラー発生: ${result.error}`)
    }
    
    return result
  }
  
  analyzeTemplates(pages: GeneratedPage[]): TestResult['templateAnalysis'] {
    return pages.map(page => {
      const templateType = page.templateType
      const templateData = page.templateData
      const definition = TemplateStructureDefinitions.getDefinition(templateType)
      
      const analysis = {
        pageNumber: page.pageNumber,
        templateType,
        hasValidData: false,
        requiredFieldsStatus: [] as string[],
        dataStructure: templateData,
        issues: [] as string[]
      }
      
      console.log(`\n🔍 ページ${page.pageNumber}分析 (${templateType})`)
      
      if (!definition) {
        analysis.issues.push('テンプレート定義が見つからない')
        console.log(`  ❌ テンプレート定義なし`)
        return analysis
      }
      
      // 必須フィールドチェック
      const requiredFields = definition.requiredFields
      for (const field of requiredFields) {
        const value = (templateData as any)?.[field]
        const hasValue = value && (Array.isArray(value) ? value.length > 0 : true)
        
        if (hasValue) {
          analysis.requiredFieldsStatus.push(`✅ ${field}: OK`)
        } else {
          analysis.requiredFieldsStatus.push(`❌ ${field}: 不足`)
          analysis.issues.push(`必須フィールド不足: ${field}`)
        }
      }
      
      // テンプレート固有の検証
      this.validateSpecificTemplate(analysis, templateType, templateData)
      
      analysis.hasValidData = analysis.issues.length === 0
      
      console.log(`  📋 必須フィールド:`)
      analysis.requiredFieldsStatus.forEach(status => console.log(`    ${status}`))
      
      if (analysis.issues.length > 0) {
        console.log(`  ⚠️  問題:`)
        analysis.issues.forEach(issue => console.log(`    - ${issue}`))
      } else {
        console.log(`  ✅ 完璧なデータ構造`)
      }
      
      return analysis
    })
  }
  
  validateSpecificTemplate(analysis: any, templateType: string, templateData: any) {
    switch (templateType) {
      case 'simple5':
        if (templateData.steps) {
          const validSteps = Array.isArray(templateData.steps) && 
            templateData.steps.every((step: any) => 
              typeof step.step === 'number' && 
              step.title && 
              step.description
            )
          if (!validSteps) {
            analysis.issues.push('steps配列の構造が不正')
          }
        }
        break
        
      case 'checklist-enhanced':
        if (templateData.checklistItems) {
          const validChecklist = Array.isArray(templateData.checklistItems) && 
            templateData.checklistItems.every((item: any) => 
              item.text && item.description
            )
          if (!validChecklist) {
            analysis.issues.push('checklistItems配列の構造が不正')
          }
        }
        break
        
      case 'table':
        if (templateData.tableData) {
          const validTable = 
            Array.isArray(templateData.tableData.headers) &&
            Array.isArray(templateData.tableData.rows) &&
            templateData.tableData.headers.length > 0 &&
            templateData.tableData.rows.length > 0
          if (!validTable) {
            analysis.issues.push('tableData構造が不正')
          }
        }
        break
        
      case 'item-n-title-content':
        if (templateData.items) {
          const validItems = Array.isArray(templateData.items) && 
            templateData.items.every((item: any) => 
              typeof item === 'object' && item.title && item.content
            )
          if (!validItems) {
            analysis.issues.push('items配列の構造が不正（title+content必須）')
          }
        }
        break
    }
  }
  
  calculateSummary(analysis: TestResult['templateAnalysis']): TestResult['summary'] {
    const totalPages = analysis.length
    const successfulTemplates = analysis.filter(a => a.hasValidData).length
    const dataIntegrityScore = Math.round((successfulTemplates / totalPages) * 100)
    
    const criticalIssues: string[] = []
    
    // 全ページで同じ問題がある場合は重大問題
    const commonIssues = analysis
      .flatMap(a => a.issues)
      .reduce((acc, issue) => {
        acc[issue] = (acc[issue] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    
    Object.entries(commonIssues).forEach(([issue, count]) => {
      if (count >= totalPages * 0.5) { // 50%以上のページで発生
        criticalIssues.push(`${issue} (${count}/${totalPages}ページで発生)`)
      }
    })
    
    return {
      totalPages,
      successfulTemplates,
      dataIntegrityScore,
      criticalIssues
    }
  }
  
  displayResults(result: TestResult) {
    const { summary, templateAnalysis } = result
    
    console.log(`\n📊 ${result.fileName} - 総合結果`)
    console.log('=' .repeat(60))
    console.log(`📄 総ページ数: ${summary.totalPages}`)
    console.log(`✅ 成功テンプレート: ${summary.successfulTemplates}/${summary.totalPages}`)
    console.log(`🎯 データ整合性スコア: ${summary.dataIntegrityScore}%`)
    
    if (summary.dataIntegrityScore >= 90) {
      console.log(`🎉 優秀！新システムが正常に動作しています`)
    } else if (summary.dataIntegrityScore >= 70) {
      console.log(`👍 良好ですが、いくつか改善点があります`)
    } else {
      console.log(`⚠️  問題があります。改善が必要です`)
    }
    
    if (summary.criticalIssues.length > 0) {
      console.log(`\n🚨 重大問題:`)
      summary.criticalIssues.forEach(issue => console.log(`  - ${issue}`))
    }
    
    // 使用されたテンプレート一覧
    const templateUsage = templateAnalysis.reduce((acc, page) => {
      acc[page.templateType] = (acc[page.templateType] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    console.log(`\n🎨 使用テンプレート:`)
    Object.entries(templateUsage).forEach(([template, count]) => {
      const successCount = templateAnalysis.filter(p => 
        p.templateType === template && p.hasValidData
      ).length
      console.log(`  - ${template}: ${count}ページ (成功: ${successCount}/${count})`)
    })
    
    // データ構造サンプル表示（最初のページのみ）
    if (templateAnalysis.length > 0) {
      console.log(`\n📋 データ構造サンプル (ページ1):`)
      console.log(JSON.stringify(templateAnalysis[0].dataStructure, null, 2))
    }
  }
  
  async runMultipleTests(fileNames: string[] = []) {
    console.log('🚀 実際の生成フロー検証テスト開始')
    console.log('=' .repeat(80))
    
    // ファイル名が指定されていない場合は最初の3つをテスト
    if (fileNames.length === 0) {
      fileNames = ['1.txt', '2.txt', '3.txt']
    }
    
    const results: TestResult[] = []
    
    for (const fileName of fileNames) {
      try {
        const result = await this.runTest(fileName)
        results.push(result)
      } catch (error) {
        console.log(`❌ ${fileName} でエラー: ${error}`)
      }
    }
    
    // 総合レポート
    this.generateOverallReport(results)
    
    return results
  }
  
  generateOverallReport(results: TestResult[]) {
    console.log('\n🏆 総合レポート')
    console.log('=' .repeat(80))
    
    const validResults = results.filter(r => r.generatedContent !== null)
    const avgScore = Math.round(
      validResults.reduce((sum, r) => sum + r.summary.dataIntegrityScore, 0) / validResults.length
    )
    
    console.log(`📊 テスト実行数: ${results.length}`)
    console.log(`✅ 成功テスト: ${validResults.length}/${results.length}`)
    console.log(`🎯 平均データ整合性: ${avgScore}%`)
    
    if (avgScore >= 90) {
      console.log(`\n🎉 素晴らしい！新しい動的テンプレート構造システムが期待通りに動作しています`)
      console.log(`   convertToTemplateDataの簡素化が成功し、精度が大幅に向上しました`)
    } else if (avgScore >= 70) {
      console.log(`\n👍 良好な結果です。いくつかの改善点はありますが、システムは正常に動作しています`)
    } else {
      console.log(`\n⚠️  改善が必要です。まだいくつかの問題が残っています`)
    }
    
    // 全体的な問題パターンの分析
    const allIssues = validResults.flatMap(r => r.summary.criticalIssues)
    if (allIssues.length > 0) {
      console.log(`\n🔧 改善が必要な共通問題:`)
      const issueCount = allIssues.reduce((acc, issue) => {
        acc[issue] = (acc[issue] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      Object.entries(issueCount)
        .sort(([,a], [,b]) => b - a)
        .forEach(([issue, count]) => {
          console.log(`  - ${issue} (${count}回発生)`)
        })
    }
  }
}

// テスト実行
async function main() {
  const tester = new RealFlowTester()
  
  try {
    // 最初の3つのファイルでテスト
    await tester.runMultipleTests(['1.txt', '2.txt', '3.txt'])
  } catch (error) {
    console.error('❌ テスト実行エラー:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export { RealFlowTester }