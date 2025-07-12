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
    // Pattern 0: Table型 (最優先パターン)
    {
      templateType: 'table',
      description: 'テーブル構造（最優先）',
      structureCheck: (content) => {
        const tableData = content?.tableData
        return !!(tableData?.headers?.length && tableData?.rows?.length)
      },
      structureScore: (content) => {
        const tableData = content?.tableData
        if (tableData?.headers?.length && tableData?.rows?.length) {
          return 1.0 // 完全スコア
        }
        return 0
      },
      priority: 15 // 最高優先度
    },

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

    // Pattern B: 2カラムセクション+アイテム型 (2セクション + 各セクションにアイテム)
    {
      templateType: 'two-column-section-items',
      description: '2セクション + 各セクションにアイテムリスト構造',
      structureCheck: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        // 正確に2個のセクションがあり、直接itemsは空で、各セクションにitemsがある
        return sections.length === 2 &&
               directItems.length === 0 &&
               sections.every(s => s.title && s.content) &&
               sections.every(s => s.items && s.items.length >= 3)
      },
      structureScore: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        if (sections.length === 2 && directItems.length === 0) {
          let score = 0
          
          // 正確に2セクション
          score += 3
          
          // 各セクションの品質チェック（title + content + items）
          const allSectionsComplete = sections.every(s => s.title && s.content && s.items && s.items.length >= 3)
          if (allSectionsComplete) score += 3
          else score += 1
          
          // タイトルがある場合
          if (content?.title) score += 1
          
          return score / 7 // 最大7点で正規化
        }
        return 0
      },
      priority: 11 // section-itemsより高い優先度
    },

    // Pattern C1: simple3型 (2カラム比較構造 - description必須)
    {
      templateType: 'simple3',
      description: '2カラム型構造（左右比較表示）',
      structureCheck: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        // sectionsは空で、直接itemsがちょうど2個、各アイテムにtitleとdescriptionがある（厳密）
        return sections.length === 0 && 
               directItems.length === 2 &&
               directItems.every(item => item.title && item.description)
      },
      structureScore: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        if (sections.length === 0 && directItems.length === 2) {
          const hasTitle = !!content?.title
          const hasDescription = !!content?.description
          const itemsComplete = directItems.every(item => 
            item.title && item.description
          )
          
          let score = 0
          // 2個ちょうどで完全スコア
          score += 3
          
          // アイテムの完全性（description必須で高スコア）
          if (itemsComplete) score += 3
          else score += 1
          
          // 基本構造要素
          if (hasTitle) score += 1
          if (hasDescription) score += 0.5
          
          return score / 7.5 // 最大7.5点で正規化
        }
        return 0
      },
      priority: 11 // simple2より高い優先度
    },

    // Pattern C2: list型 (チェックリスト構造)
    {
      templateType: 'list',
      description: 'チェックリスト型構造（順番なしリスト専用）',
      structureCheck: (content) => {
        const checklist = content?.checklist || []
        
        // checklistが明確にある場合のみマッチ（厳密化）
        return checklist.length > 0
      },
      structureScore: (content) => {
        const checklist = content?.checklist || []
        
        if (checklist.length > 0) {
          // checklist構造がある場合は高スコア
          let score = 0
          if (checklist.length >= 3 && checklist.length <= 7) score += 4
          else if (checklist.length >= 2 && checklist.length <= 8) score += 3
          else score += 2
          
          if (content?.title) score += 1
          
          return score / 5 // 最大5点で正規化
        }
        return 0
      },
      priority: 10 // チェックリスト専用として高優先度
    },

    // Pattern C1: simple5型 (ステップ構造 - step番号付きアイテム)
    {
      templateType: 'simple5',
      description: 'ステップ型構造（step番号付きアイテム）',
      structureCheck: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        // sectionsは空で、直接itemsが3-8個あり、すべてのアイテムにstep番号とdescriptionがある
        return sections.length === 0 && 
               directItems.length >= 3 &&
               directItems.length <= 8 &&
               directItems.every(item => 
                 typeof item.step === 'number' && 
                 item.title && 
                 (item.description || item.content)
               )
      },
      structureScore: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        if (sections.length === 0 && directItems.length >= 3 && directItems.length <= 8) {
          const hasTitle = !!content?.title
          const hasDescription = !!content?.description
          const allHaveSteps = directItems.every(item => typeof item.step === 'number')
          const allHaveDetails = directItems.every(item => 
            item.title && (item.description || item.content)
          )
          const stepsAreSequential = this.checkSequentialSteps(directItems)
          
          let score = 0
          // アイテム数が適正範囲
          if (directItems.length >= 3 && directItems.length <= 7) score += 3
          else if (directItems.length === 8) score += 2
          
          // ステップ番号の完全性
          if (allHaveSteps) score += 3
          else score += 1
          
          // 詳細説明の完全性
          if (allHaveDetails) score += 2
          else score += 1
          
          // ステップの連続性
          if (stepsAreSequential) score += 1
          
          // 基本構造要素
          if (hasTitle) score += 1
          if (hasDescription) score += 0.5
          
          return score / 10.5 // 最大10.5点で正規化
        }
        return 0
      },
      priority: 12 // enumerationより高い優先度（重要な特殊構造）
    },

    // Pattern C3: simple6型 (まとめ構造 - description + 文字列アイテムリスト)
    {
      templateType: 'simple6',
      description: 'まとめ型構造（結論+リスト）',
      structureCheck: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        // sectionsは空で、直接itemsが4-8個、descriptionがあり、itemsがすべて文字列
        return sections.length === 0 && 
               directItems.length >= 4 &&
               directItems.length <= 8 &&
               !!content?.description &&
               directItems.every(item => typeof item === 'string')
      },
      structureScore: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        if (sections.length === 0 && directItems.length >= 4 && directItems.length <= 8) {
          const hasTitle = !!content?.title
          const hasDescription = !!content?.description
          const allItemsAreStrings = directItems.every(item => typeof item === 'string')
          
          let score = 0
          // アイテム数が適正範囲（4-8個）
          if (directItems.length >= 4 && directItems.length <= 6) score += 3
          else if (directItems.length >= 7 && directItems.length <= 8) score += 2
          
          // descriptionの存在（必須）
          if (hasDescription) score += 3
          else score += 0
          
          // アイテムが文字列のみ（簡潔なまとめリスト）
          if (allItemsAreStrings) score += 2
          else score += 1
          
          // 基本構造要素
          if (hasTitle) score += 1
          
          return score / 9 // 最大9点で正規化
        }
        return 0
      },
      priority: 10 // enumerationより高い優先度
    },

    // Pattern D: points型 (複数ポイント解説構造)
    {
      templateType: 'explanation2',
      description: '複数ポイント解説構造（sections→pointsパターン）',
      structureCheck: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        // 2-4個のセクションがあり、直接itemsは空で、各セクションにitemsが少ないか無い（points相当）
        return sections.length >= 2 && sections.length <= 4 &&
               directItems.length === 0 &&
               sections.every(s => s.title && s.content) &&
               sections.every(s => !s.items || s.items.length <= 2) // セクション内itemsが少ないかゼロ
      },
      structureScore: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        if (sections.length >= 2 && sections.length <= 4 && directItems.length === 0) {
          let score = 0
          
          // セクション数が適正範囲（2-4個）
          if (sections.length >= 2 && sections.length <= 3) score += 3
          else if (sections.length === 4) score += 2
          
          // 各セクションの品質チェック（title + content）
          const allSectionsComplete = sections.every(s => s.title && s.content)
          if (allSectionsComplete) score += 2
          else score += 1
          
          // タイトルがある場合
          if (content?.title) score += 1
          
          return score / 6 // 最大6点で正規化
        }
        return 0
      },
      priority: 9
    },

    // Pattern C: items型 (発見された副パターン) 
    {
      templateType: 'enumeration',
      description: '直接アイテムリスト構造（順番・ソートあり）',
      structureCheck: (content) => {
        const sections = content?.sections || []
        const directItems = content?.items || []
        
        // sectionsは空で、直接itemsに3-8個のアイテムがある（元の条件に戻す）
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
          // アイテム数が適正範囲（元の条件に戻す）
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
      templateType: 'section-items',
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
      templateType: 'simple3',
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
      templateType: 'explanation2',
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
      
      // templateDataにデータを追加
      const updatedTemplateData = { ...page.templateData }
      if (bestTemplate === 'section-items' && page.content?.sections) {
        updatedTemplateData.sections = page.content.sections
      }
      if (bestTemplate === 'two-column-section-items' && page.content?.sections) {
        updatedTemplateData.sections = page.content.sections
      }
      if (bestTemplate === 'simple3' && page.content?.items && page.content.items.length === 2) {
        // simple3用のtwoColumn変換
        updatedTemplateData.twoColumn = {
          left: [page.content.items[0]],
          right: [page.content.items[1]]
        }
      }
      if (bestTemplate === 'simple6' && page.content?.items) {
        // simple6用の処理 - descriptionとitemsを適切に設定
        if (!updatedTemplateData.content && page.content?.description) {
          updatedTemplateData.content = page.content.description
        }
        updatedTemplateData.items = page.content.items
      }
      if (bestTemplate === 'explanation2') {
        // pointsデータの生成（直接pointsまたはsectionsから変換）
        if (page.content?.points) {
          updatedTemplateData.points = page.content.points
        } else if (page.content?.sections) {
          // sectionsをpointsに変換
          updatedTemplateData.points = page.content.sections.map(section => ({
            title: section.title,
            description: section.content
          }))
        }
      }
      if (bestTemplate === 'enumeration' && page.content?.items) {
        // enumeration用の処理 - itemsを適切に設定
        updatedTemplateData.items = page.content.items
      }
      if (bestTemplate === 'list' && page.content?.items) {
        // list用の処理 - itemsを適切に設定
        updatedTemplateData.items = page.content.items
      }
      if (bestTemplate === 'simple5') {
        // simple5用の処理 - steps, checklist, pointsを適切に設定
        if (page.content?.items) {
          // itemsにstep番号がある場合はstepsに変換
          const hasStepNumbers = page.content.items.some((item: any) => 
            typeof item === 'object' && typeof item.step === 'number'
          )
          if (hasStepNumbers) {
            updatedTemplateData.steps = page.content.items
          } else {
            updatedTemplateData.items = page.content.items
          }
        }
        if (page.content?.checklist) {
          updatedTemplateData.checklist = page.content.checklist
        }
        if (page.content?.points) {
          updatedTemplateData.points = page.content.points
        }
        if (page.content?.steps) {
          updatedTemplateData.steps = page.content.steps
        }
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
    const hasTableData = !!(content?.tableData?.headers?.length && content?.tableData?.rows?.length)
    
    console.log(`  🏗️  構造詳細:`)
    console.log(`    ├─ タイトル: ${hasTitle ? '✅' : '❌'}`)
    console.log(`    ├─ 説明文: ${hasDescription ? '✅' : '❌'}`)
    console.log(`    ├─ セクション数: ${sections.length}`)
    console.log(`    ├─ 直接アイテム数: ${directItems.length}`)
    console.log(`    └─ テーブルデータ: ${hasTableData ? '✅' : '❌'}`)
    
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
   * ステップ番号の連続性をチェック
   */
  private checkSequentialSteps(items: any[]): boolean {
    if (!items || items.length === 0) return false
    
    const steps = items
      .map(item => item.step)
      .filter(step => typeof step === 'number')
      .sort((a, b) => a - b)
    
    if (steps.length !== items.length) return false
    
    // 1から始まって連続している必要がある
    for (let i = 0; i < steps.length; i++) {
      if (steps[i] !== i + 1) return false
    }
    
    return true
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