// 構造ベースのテンプレート選択システム
import { ContentStructure, ContentElement } from './contentExtractor'
import { TemplateType } from '../components/templates/TemplateTypes'

export class StructureBasedTemplateSelector {
  /**
   * コンテンツの構造に基づいてテンプレートを選択
   */
  static selectByStructure(structure: ContentStructure): TemplateType {
    console.log('🎯 構造ベーステンプレート選択:', structure.type)
    
    switch (structure.type) {
      case 'title-list':
        return this.selectForTitleList(structure.elements)
        
      case 'title-subtitle-descriptions':
        return this.selectForTitleSubtitleDescriptions(structure.elements)
        
      case 'step-by-step':
        return this.selectForStepByStep(structure.elements)
        
      case 'comparison-table':
        return 'table'
        
      case 'story-narrative':
        return 'story'
        
      case 'qa-format':
        return 'explanation'
        
      default:
        return 'simple'
    }
  }

  /**
   * タイトル＋リスト構造の場合
   */
  private static selectForTitleList(elements: ContentElement[]): TemplateType {
    const listItems = elements.filter(el => el.type === 'list-item')
    
    // リストアイテムの数に応じて選択
    if (listItems.length >= 5) {
      return 'list' // リスト型テンプレート
    } else if (listItems.length >= 3) {
      return 'enumeration' // 列挙型テンプレート
    } else {
      return 'simple2' // シンプル型
    }
  }

  /**
   * タイトル＋サブタイトル＋説明構造の場合
   */
  private static selectForTitleSubtitleDescriptions(elements: ContentElement[]): TemplateType {
    const subtitles = elements.filter(el => el.type === 'subtitle')
    const descriptions = elements.filter(el => el.type === 'description')
    
    // サブタイトルと説明の組み合わせパターン
    if (subtitles.length >= 3 && descriptions.length >= 3) {
      return 'explanation2' // 解説型2
    } else if (subtitles.length >= 2 && descriptions.length >= 2) {
      return 'explanation' // 解説型
    } else {
      return 'simple3' // シンプル型3
    }
  }

  /**
   * ステップバイステップ構造の場合
   */
  private static selectForStepByStep(elements: ContentElement[]): TemplateType {
    const steps = elements.filter(el => el.type === 'list-item')
    
    // ステップ数に応じて選択
    if (steps.length >= 5) {
      return 'enumeration' // 列挙型（番号付き）
    } else if (steps.length >= 3) {
      return 'list' // リスト型
    } else {
      return 'simple2' // シンプル型
    }
  }

  /**
   * コンテンツの表現密度を分析
   */
  static analyzeExpressionDensity(structure: ContentStructure): {
    density: number
    complexity: 'simple' | 'medium' | 'complex'
    recommendedTemplate: TemplateType
  } {
    let density = 0
    let elementCount = structure.elements.length
    
    // 要素タイプの多様性を計算
    const elementTypes = [...new Set(structure.elements.map(el => el.type))]
    const diversity = elementTypes.length / 6 // 最大6種類の要素タイプ
    
    // 内容の長さを計算
    const totalLength = structure.elements.reduce((sum, el) => sum + el.content.length, 0)
    const averageLength = totalLength / elementCount
    
    // 密度スコア計算
    density = (diversity * 0.4) + (Math.min(averageLength / 50, 1) * 0.6)
    
    // 複雑度判定
    let complexity: 'simple' | 'medium' | 'complex'
    if (density > 0.7) complexity = 'complex'
    else if (density > 0.4) complexity = 'medium'
    else complexity = 'simple'
    
    // 推奨テンプレート
    const recommendedTemplate = this.selectByStructure(structure)
    
    return {
      density,
      complexity,
      recommendedTemplate
    }
  }

  /**
   * 複数のコンテンツから最適なものを選択
   */
  static selectBestContent(contents: Array<{
    structure: ContentStructure
    density: number
    title: string
    category: string
  }>): {
    selected: any
    alternatives: any[]
  } {
    if (contents.length === 0) {
      throw new Error('コンテンツが提供されていません')
    }
    
    // 密度スコアと構造の複雑さを考慮してランキング
    const scored = contents.map(content => {
      const analysis = this.analyzeExpressionDensity(content.structure)
      
      // 総合スコア計算
      const structureScore = this.calculateStructureScore(content.structure)
      const densityScore = content.density
      const totalScore = (structureScore * 0.6) + (densityScore * 0.4)
      
      return {
        ...content,
        analysis,
        totalScore
      }
    })
    
    // スコア順にソート
    scored.sort((a, b) => b.totalScore - a.totalScore)
    
    console.log('📊 コンテンツ選択結果:', scored.map(s => ({
      title: s.title,
      score: s.totalScore,
      template: s.analysis.recommendedTemplate
    })))
    
    return {
      selected: scored[0],
      alternatives: scored.slice(1, 4) // 最大3つの代替案
    }
  }

  /**
   * 構造スコアを計算
   */
  private static calculateStructureScore(structure: ContentStructure): number {
    const elementCount = structure.elements.length
    const typeVariety = [...new Set(structure.elements.map(el => el.type))].length
    
    // 要素数と種類の多様性を評価
    const elementScore = Math.min(elementCount / 10, 1) // 最大10要素
    const varietyScore = typeVariety / 6 // 最大6種類
    
    return (elementScore * 0.7) + (varietyScore * 0.3)
  }
}