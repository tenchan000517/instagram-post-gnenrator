/**
 * 純粋構造ベーステンプレートマッチングサービス
 * TEMPLATE_SYSTEM_IDEAL_DESIGN_CORRECTED.mdに基づく新しいアプローチ
 */
import { TemplateType } from '../components/templates/TemplateTypes'
import { GeneratedPage } from './contentGeneratorService'

interface StructurePattern {
  templateType: TemplateType
  description: string
  structureCheck: (content: any) => boolean
  structureScore: (content: any) => number
  priority: number
}

export class PureStructureMatchingService {
  private structurePatterns: StructurePattern[] = [
    // Pattern A: sections + items型 (発見された主要パターン)
    {
      templateType: 'section-items',
      description: '1セクション + アイテムリスト構造',
      structureCheck: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        // sections配列に1個のセクションがあり、そのセクションにitemsがある
        // かつ直接のitemsは空
        return sections.length === 1 && 
               sections[0].items && 
               sections[0].items.length >= 3 &&
               directItems.length === 0
      },
      structureScore: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        if (sections.length === 1 && sections[0].items) {
          const itemCount = sections[0].items.length
          const hasTitle = !!sections[0].title
          const hasContent = !!sections[0].content
          const isDirectItemsEmpty = directItems.length === 0
          
          let score = 0
          // アイテム数が適正範囲（3-7個）
          if (itemCount >= 3 && itemCount <= 7) score += 3
          else if (itemCount >= 2 && itemCount <= 8) score += 2
          else score += 1
          
          // セクション構造が完全
          if (hasTitle && hasContent) score += 2
          else if (hasTitle || hasContent) score += 1
          
          // 直接itemsが空（純粋パターン）
          if (isDirectItemsEmpty) score += 1
          
          return score / 6 // 最大6点で正規化
        }
        return 0
      },
      priority: 10 // 最高優先度
    },

    // Pattern B: items型 (発見された副パターン) 
    {
      templateType: 'enumeration',
      description: '直接アイテムリスト構造',
      structureCheck: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        // sectionsは空で、直接itemsに3-8個のアイテムがある
        return sections.length === 0 && 
               directItems.length >= 3 &&
               directItems.length <= 8
      },
      structureScore: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        if (sections.length === 0 && directItems.length > 0) {
          const itemCount = directItems.length
          const hasTitle = !!content?.title
          const hasDescription = !!content?.description
          
          let score = 0
          // アイテム数が適正範囲
          if (itemCount >= 3 && itemCount <= 7) score += 3
          else if (itemCount >= 2 && itemCount <= 8) score += 2
          else score += 1
          
          // 基本構造要素
          if (hasTitle) score += 1
          if (hasDescription) score += 1
          
          // sectionsが空（純粋パターン）
          if (sections.length === 0) score += 1
          
          return score / 6 // 最大6点で正規化
        }
        return 0
      },
      priority: 9
    },

    // フォールバック: 既存テンプレート（低優先度）
    {
      templateType: 'story',
      description: 'セクション構造（フォールバック）',
      structureCheck: (content) => {
        const sections = content?.sections || []
        return sections.length === 1
      },
      structureScore: (content) => {
        const sections = content?.sections || []
        if (sections.length === 1) return 0.5
        return 0
      },
      priority: 3
    },

    {
      templateType: 'simple',
      description: 'アイテムリスト（フォールバック）',
      structureCheck: (content) => {
        const directItems = content?.items || []
        return directItems.length > 0
      },
      structureScore: (content) => {
        const directItems = content?.items || []
        if (directItems.length > 0) return 0.4
        return 0
      },
      priority: 2
    },

    {
      templateType: 'explanation',
      description: '基本構造（最終フォールバック）',
      structureCheck: (content) => {
        return !!content?.title
      },
      structureScore: (content) => {
        return content?.title ? 0.3 : 0
      },
      priority: 1
    }
  ]

  /**
   * 純粋構造ベースマッチング（メイン関数）
   */
  matchTemplateToContent(pages: GeneratedPage[]): GeneratedPage[] {
    return pages.map(page => {
      const bestTemplate = this.findBestTemplate(page)
      
      // templateDataにsectionsデータを追加（section-items型用）
      const updatedTemplateData = { ...page.templateData }
      if (bestTemplate === 'section-items' && page.content?.sections) {
        updatedTemplateData.sections = page.content.sections
      }
      
      return {
        ...page,
        templateType: bestTemplate,
        templateData: updatedTemplateData
      }
    })
  }

  /**
   * 最適テンプレート選択
   */
  findBestTemplate(page: GeneratedPage): TemplateType {
    console.log('🎯 純粋構造ベーステンプレートマッチング開始')
    console.log('================================================================================')
    console.log(`📄 ページ${page.pageNumber}の構造分析:`)
    
    // 構造の詳細分析
    const content = page.content
    const sections = content?.sections || []
    const directItems = content?.items || []
    const hasTitle = !!content?.title
    const hasDescription = !!content?.description
    
    console.log(`  🏗️  構造詳細:`)
    console.log(`    ├─ タイトル: ${hasTitle ? '✅' : '❌'}`)
    console.log(`    ├─ 説明文: ${hasDescription ? '✅' : '❌'}`)
    console.log(`    ├─ セクション数: ${sections.length}`)
    console.log(`    └─ 直接アイテム数: ${directItems.length}`)
    
    if (sections.length > 0) {
      console.log(`  📦 セクション詳細:`)
      sections.forEach((section, index) => {
        console.log(`    └─ セクション${index + 1}: "${section.title || 'タイトルなし'}"`)
        console.log(`       ├─ 内容: ${section.content ? '✅' : '❌'}`)
        console.log(`       └─ アイテム数: ${section.items?.length || 0}`)
      })
    }
    
    console.log('')

    // 各パターンでのスコア計算
    const scores = this.structurePatterns.map(pattern => {
      const isMatch = pattern.structureCheck(content)
      const structureScore = pattern.structureScore(content)
      const finalScore = structureScore * pattern.priority
      
      console.log(`📊 ${pattern.templateType}:`)
      console.log(`  ├─ 構造チェック: ${isMatch ? '✅ 適合' : '❌ 不適合'}`)
      console.log(`  ├─ 構造スコア: ${structureScore.toFixed(3)}`)
      console.log(`  ├─ 優先度: ${pattern.priority}`)
      console.log(`  ├─ 最終スコア: ${finalScore.toFixed(3)}`)
      console.log(`  └─ 説明: ${pattern.description}`)
      console.log('')
      
      return {
        templateType: pattern.templateType,
        isMatch,
        structureScore,
        priority: pattern.priority,
        finalScore,
        description: pattern.description
      }
    })

    // 最高スコアのテンプレートを選択
    scores.sort((a, b) => b.finalScore - a.finalScore)
    
    const winner = scores[0]
    const runnerUp = scores[1]
    
    console.log('🏆 マッチング結果:')
    console.log(`  🥇 1位: ${winner.templateType} (スコア: ${winner.finalScore.toFixed(3)})`)
    console.log(`  🥈 2位: ${runnerUp.templateType} (スコア: ${runnerUp.finalScore.toFixed(3)})`)
    console.log(`  📏 差分: ${(winner.finalScore - runnerUp.finalScore).toFixed(3)}`)
    
    if (page.templateType !== winner.templateType) {
      console.log(`🔄 テンプレート変更: ${page.templateType} → ${winner.templateType}`)
    } else {
      console.log(`✅ テンプレート維持: ${winner.templateType}`)
    }
    console.log('================================================================================')
    console.log('')

    return winner.templateType
  }

  /**
   * 構造パターン統計の取得
   */
  getStructureStatistics(pages: GeneratedPage[]): {
    totalPages: number
    patternCounts: Record<string, number>
    patternPercentages: Record<string, number>
  } {
    const totalPages = pages.length
    const patternCounts: Record<string, number> = {}
    
    pages.forEach(page => {
      const content = page.content
      const sections = content?.sections || []
      const directItems = content?.items || []
      
      let patternType = 'unknown'
      
      if (sections.length === 1 && sections[0].items && sections[0].items.length > 0 && directItems.length === 0) {
        patternType = 'sections_items'
      } else if (sections.length === 0 && directItems.length > 0) {
        patternType = 'items_only'
      } else if (sections.length > 0) {
        patternType = 'sections_only'
      } else {
        patternType = 'basic'
      }
      
      patternCounts[patternType] = (patternCounts[patternType] || 0) + 1
    })
    
    const patternPercentages: Record<string, number> = {}
    Object.keys(patternCounts).forEach(pattern => {
      patternPercentages[pattern] = (patternCounts[pattern] / totalPages) * 100
    })
    
    return {
      totalPages,
      patternCounts,
      patternPercentages
    }
  }
}

export const pureStructureMatchingService = new PureStructureMatchingService()