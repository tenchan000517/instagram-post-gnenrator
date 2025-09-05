/**
 * マスターデータ参照サービス
 * 投稿タイプ→ターゲット→ペルソナの紐づけ関係を管理
 */

import masterRelations from '../../data/knowledgeBase/type-target-persona-relations.json'
// import problemSolutionPairs from '../../data/knowledgeBase/problemSolutionPairs.json' // 不要：個別ファイル読み込みに変更

export interface TypeTargetPersonaRelations {
  typeToTargets: Record<string, string[]>
  targetToPersonas: Record<string, string[]>
  personaToKnowledge: Record<string, string[]>
}

export class MasterDataService {
  private static relations: TypeTargetPersonaRelations = masterRelations

  /**
   * 投稿タイプに紐づくターゲット一覧を取得
   * @param typeId 投稿タイプID (001-004)
   * @returns ターゲットID配列
   */
  static getTargetsForType(typeId: string): string[] {
    return this.relations.typeToTargets[typeId] || []
  }

  /**
   * ターゲットに紐づくペルソナ一覧を取得
   * @param targetId ターゲットID (T001-T012)
   * @returns ペルソナID配列
   */
  static getPersonasForTarget(targetId: string): string[] {
    return this.relations.targetToPersonas[targetId] || []
  }

  /**
   * 投稿タイプから直接ペルソナ一覧を取得
   * @param typeId 投稿タイプID (001-004)
   * @returns ペルソナID配列（重複除去済み）
   */
  static getPersonasForType(typeId: string): string[] {
    const targets = this.getTargetsForType(typeId)
    const personas = targets.flatMap(targetId => 
      this.getPersonasForTarget(targetId)
    )
    // 重複除去
    return [...new Set(personas)]
  }

  /**
   * ターゲットが指定された投稿タイプと互換性があるかチェック
   * @param targetId ターゲットID
   * @param typeId 投稿タイプID
   * @returns 互換性があればtrue
   */
  static isTargetCompatibleWithType(targetId: string, typeId: string): boolean {
    const targets = this.getTargetsForType(typeId)
    return targets.includes(targetId)
  }

  /**
   * ペルソナが指定されたターゲットと互換性があるかチェック
   * @param personaId ペルソナID
   * @param targetId ターゲットID
   * @returns 互換性があればtrue
   */
  static isPersonaCompatibleWithTarget(personaId: string, targetId: string): boolean {
    const personas = this.getPersonasForTarget(targetId)
    return personas.includes(personaId)
  }

  /**
   * 全マスターデータ関係を取得（デバッグ用）
   */
  static getAllRelations(): TypeTargetPersonaRelations {
    return this.relations
  }

  /**
   * TargetIDをPersonaIDに変換する重要な関数
   * UI選択(T001-T012) → データベース検索(P001-P116)のマッピング
   * @param targetId ターゲットID (T001-T012)
   * @returns 対応するPersonaID (P001-P116), 見つからない場合null
   */
  static mapTargetIdToPersonaId(targetId: string): string | null {
    const personas = this.getPersonasForTarget(targetId)
    // 最初のペルソナIDを返す（複数ある場合の優先順位は仕様により決定）
    return personas.length > 0 ? personas[0] : null
  }

  /**
   * 複数のPersonaIDを取得（TargetIDに対応する全ペルソナ）
   * @param targetId ターゲットID (T001-T012)
   * @returns 対応するPersonaID配列
   */
  static getAllPersonaIdsForTarget(targetId: string): string[] {
    return this.getPersonasForTarget(targetId)
  }

  /**
   * ペルソナIDからナレッジIDを取得
   * @param personaId ペルソナID (P001-P109)
   * @returns 対応するナレッジID (K001-K109), 見つからない場合null
   */
  static getKnowledgeIdForPersona(personaId: string): string | null {
    const knowledgeIds = this.relations.personaToKnowledge[personaId]
    return knowledgeIds && knowledgeIds.length > 0 ? knowledgeIds[0] : null
  }

  /**
   * ペルソナIDから全ナレッジID配列を取得
   * @param personaId ペルソナID (P001-P109)
   * @returns 対応するナレッジID配列
   */
  static getAllKnowledgeIdsForPersona(personaId: string): string[] {
    return this.relations.personaToKnowledge[personaId] || []
  }

  /**
   * 複数のペルソナIDからナレッジID配列を取得
   * @param personaIds ペルソナID配列
   * @returns 対応するナレッジID配列
   */
  static getKnowledgeIdsForPersonas(personaIds: string[]): string[] {
    return personaIds
      .map(personaId => this.getKnowledgeIdForPersona(personaId))
      .filter((knowledgeId): knowledgeId is string => knowledgeId !== null)
  }

  /**
   * ナレッジIDからナレッジ内容を取得
   * @param knowledgeId ナレッジID (K001-K116+)
   * @returns ナレッジ内容、見つからない場合null
   */
  static async getKnowledgeContent(knowledgeId: string): Promise<any | null> {
    // 各typeディレクトリを試行
    const typeDirectories = ['type001', 'type002', 'type003', 'type004', 'type005']
    
    for (const typeDir of typeDirectories) {
      try {
        // 動的インポートでナレッジファイルを読み込み
        // K001 → /app/data/knowledgeBase/knowledge/type001/K001.json
        const module = await import(`../../data/knowledgeBase/knowledge/${typeDir}/${knowledgeId}.json`)
        const knowledgeData = module.default || module
        
        console.log(`✅ ナレッジファイル読み込み成功: ${typeDir}/${knowledgeId}`)
        return knowledgeData
        
      } catch (error) {
        // このtypeディレクトリにファイルがない場合は次を試行
        continue
      }
    }
    
    // 全てのディレクトリで見つからなかった場合
    console.error(`❌ ナレッジファイル読み込みエラー (${knowledgeId}): ファイルが見つかりません`)
    return null
  }

  /**
   * 複数のナレッジIDからナレッジ内容配列を取得
   * @param knowledgeIds ナレッジID配列
   * @returns ナレッジ内容配列
   */
  static async getKnowledgeContents(knowledgeIds: string[]): Promise<any[]> {
    console.log(`📋 複数ナレッジ読み込み開始: ${knowledgeIds.join(', ')}`)
    
    const results = await Promise.all(
      knowledgeIds.map(async (knowledgeId) => {
        const content = await this.getKnowledgeContent(knowledgeId)
        if (content === null) {
          console.warn(`⚠️ ナレッジが見つかりません: ${knowledgeId}`)
        }
        return content
      })
    )
    
    const filteredResults = results.filter(content => content !== null)
    console.log(`✅ ナレッジ読み込み完了: ${filteredResults.length}/${knowledgeIds.length} 件成功`)
    return filteredResults
  }

  /**
   * マスターデータの整合性チェック
   * @returns チェック結果
   */
  static validateRelations(): {
    isValid: boolean
    errors: string[]
  } {
    const errors: string[] = []

    // TypeIDの存在チェック
    const expectedTypes = ['001', '002', '003', '004', '005']
    for (const typeId of expectedTypes) {
      if (!this.relations.typeToTargets[typeId]) {
        errors.push(`Missing typeId: ${typeId}`)
      }
    }

    // ターゲット数チェック（各タイプに6つのターゲット）
    for (const [typeId, targets] of Object.entries(this.relations.typeToTargets)) {
      if (targets.length !== 6) {
        errors.push(`TypeId ${typeId} should have 6 targets, but has ${targets.length}`)
      }
    }

    // ターゲットIDの一意性チェック
    const allTargets = Object.values(this.relations.typeToTargets).flat()
    const uniqueTargets = new Set(allTargets)
    if (allTargets.length !== uniqueTargets.size) {
      errors.push('Duplicate target IDs found')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }
}