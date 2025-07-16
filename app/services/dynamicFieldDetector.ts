/**
 * 動的フィールド検出システム
 * テンプレートタイプとデータから編集可能フィールドを自動検出
 */

import { TemplateType } from '../components/templates/TemplateTypes'

export type FieldType = 'string' | 'array' | 'object' | 'number' | 'boolean' | 'text' | 'html'

export interface ValidationRule {
  type: 'required' | 'maxLength' | 'minLength' | 'pattern' | 'custom'
  value?: any
  message: string
  validator?: (value: any) => boolean
}

export interface EditableField {
  name: string                        // フィールド名
  type: FieldType                     // データ型
  displayName: string                 // 表示名
  required: boolean                   // 必須フラグ
  validation: ValidationRule[]        // 検証ルール
  defaultValue?: any                  // デフォルト値
  maxLength?: number                  // 最大長
  placeholder?: string                // プレースホルダー
}

export interface DynamicField extends EditableField {
  pattern: string                     // パターン（例: "item{n}Title"）
  index: number                       // インデックス
  maxCount: number                    // 最大個数
}

export class DynamicFieldDetector {
  /**
   * テンプレートタイプとデータから編集可能フィールドを検出
   */
  static detectFields(templateType: TemplateType, data: any): EditableField[] {
    const baseFields = this.getBaseFields(templateType)
    const dynamicFields = this.detectDynamicFields(templateType, data)
    
    return [...baseFields, ...dynamicFields]
  }
  
  /**
   * 基本フィールドの定義
   */
  private static getBaseFields(templateType: TemplateType): EditableField[] {
    const commonFields: EditableField[] = [
      {
        name: 'title',
        type: 'string',
        displayName: 'タイトル',
        required: true,
        validation: [
          { type: 'required', message: 'タイトルは必須です' },
          { type: 'maxLength', value: 100, message: 'タイトルは100文字以内で入力してください' }
        ],
        placeholder: 'タイトルを入力'
      }
    ]
    
    // テンプレート別の基本フィールド
    switch (templateType) {
      case 'item-n-title-content':
        return [
          ...commonFields,
          {
            name: 'subtitle',
            type: 'string',
            displayName: 'サブタイトル',
            required: false,
            validation: [
              { type: 'maxLength', value: 150, message: 'サブタイトルは150文字以内で入力してください' }
            ],
            placeholder: 'サブタイトルを入力（任意）'
          },
          {
            name: 'badgeText',
            type: 'string',
            displayName: 'バッジテキスト',
            required: false,
            validation: [
              { type: 'maxLength', value: 50, message: 'バッジテキストは50文字以内で入力してください' }
            ],
            placeholder: 'バッジテキストを入力（任意）'
          }
        ]
        
      case 'checklist-enhanced':
        return [
          ...commonFields,
          {
            name: 'subtitle',
            type: 'string',
            displayName: 'サブタイトル',
            required: false,
            validation: [
              { type: 'maxLength', value: 150, message: 'サブタイトルは150文字以内で入力してください' }
            ],
            placeholder: 'サブタイトルを入力（任意）'
          },
          {
            name: 'content',
            type: 'text',
            displayName: '詳細説明',
            required: false,
            validation: [
              { type: 'maxLength', value: 500, message: '詳細説明は500文字以内で入力してください' }
            ],
            placeholder: '詳細説明を入力（任意）'
          }
        ]
        
      case 'title-description-only':
        return [
          ...commonFields,
          {
            name: 'description',
            type: 'text',
            displayName: '説明文',
            required: true,
            validation: [
              { type: 'required', message: '説明文は必須です' },
              { type: 'maxLength', value: 1000, message: '説明文は1000文字以内で入力してください' }
            ],
            placeholder: '説明文を入力'
          },
          {
            name: 'subtitle',
            type: 'string',
            displayName: 'サブタイトル',
            required: false,
            validation: [
              { type: 'maxLength', value: 150, message: 'サブタイトルは150文字以内で入力してください' }
            ],
            placeholder: 'サブタイトルを入力（任意）'
          }
        ]
        
      case 'simple5':
        return [
          ...commonFields,
          {
            name: 'subtitle',
            type: 'string',
            displayName: 'サブタイトル',
            required: false,
            validation: [
              { type: 'maxLength', value: 150, message: 'サブタイトルは150文字以内で入力してください' }
            ],
            placeholder: 'サブタイトルを入力（任意）'
          },
          {
            name: 'badgeText',
            type: 'string',
            displayName: 'バッジテキスト',
            required: false,
            validation: [
              { type: 'maxLength', value: 50, message: 'バッジテキストは50文字以内で入力してください' }
            ],
            placeholder: 'バッジテキストを入力（任意）'
          }
        ]
        
      case 'enumeration':
        return [
          ...commonFields,
          {
            name: 'subtitle',
            type: 'string',
            displayName: 'サブタイトル',
            required: false,
            validation: [
              { type: 'maxLength', value: 40, message: 'サブタイトルは40文字以内で入力してください' }
            ],
            placeholder: 'サブタイトルを入力（任意）'
          },
          {
            name: 'badgeText',
            type: 'string',
            displayName: 'バッジテキスト',
            required: false,
            validation: [
              { type: 'maxLength', value: 50, message: 'バッジテキストは50文字以内で入力してください' }
            ],
            placeholder: 'バッジテキストを入力（任意）'
          }
        ]
        
      case 'ranking':
        return [
          ...commonFields,
          {
            name: 'description',
            type: 'string',
            displayName: '説明文',
            required: false,
            validation: [
              { type: 'maxLength', value: 150, message: '説明文は150文字以内で入力してください' }
            ],
            placeholder: '説明文を入力（任意）'
          },
          {
            name: 'badgeText',
            type: 'string',
            displayName: 'バッジテキスト',
            required: false,
            validation: [
              { type: 'maxLength', value: 50, message: 'バッジテキストは50文字以内で入力してください' }
            ],
            placeholder: 'バッジテキストを入力（任意）'
          }
        ]
        
      case 'simple3':
        return [
          ...commonFields,
          {
            name: 'content',
            type: 'text',
            displayName: 'ボックス解説文',
            required: false,
            validation: [
              { type: 'maxLength', value: 80, message: 'ボックス解説文は80文字以内で入力してください' }
            ],
            placeholder: 'ボックス解説文を入力（任意）'
          },
          {
            name: 'badgeText',
            type: 'string',
            displayName: 'バッジテキスト',
            required: false,
            validation: [
              { type: 'maxLength', value: 50, message: 'バッジテキストは50文字以内で入力してください' }
            ],
            placeholder: 'バッジテキストを入力（任意）'
          }
        ]
        
      case 'section-items':
        return [
          ...commonFields,
          {
            name: 'content',
            type: 'text',
            displayName: 'メイン説明文',
            required: false,
            validation: [
              { type: 'maxLength', value: 100, message: 'メイン説明文は100文字以内で入力してください' }
            ],
            placeholder: 'メイン説明文を入力（任意）'
          },
          {
            name: 'subtitle',
            type: 'string',
            displayName: 'サブタイトル',
            required: false,
            validation: [
              { type: 'maxLength', value: 40, message: 'サブタイトルは40文字以内で入力してください' }
            ],
            placeholder: 'サブタイトルを入力（任意）'
          },
          {
            name: 'badgeText',
            type: 'string',
            displayName: 'バッジテキスト',
            required: false,
            validation: [
              { type: 'maxLength', value: 50, message: 'バッジテキストは50文字以内で入力してください' }
            ],
            placeholder: 'バッジテキストを入力（任意）'
          }
        ]
        
      case 'graph':
        return [
          ...commonFields,
          {
            name: 'description',
            type: 'string',
            displayName: '説明文',
            required: false,
            validation: [
              { type: 'maxLength', value: 100, message: '説明文は100文字以内で入力してください' }
            ],
            placeholder: '説明文を入力（任意）'
          },
          {
            name: 'badgeText',
            type: 'string',
            displayName: 'バッジテキスト',
            required: false,
            validation: [
              { type: 'maxLength', value: 50, message: 'バッジテキストは50文字以内で入力してください' }
            ],
            placeholder: 'バッジテキストを入力（任意）'
          }
        ]
        
      default:
        return commonFields
    }
  }
  
  /**
   * 動的フィールド（item1Title, item2Title等）を検出
   */
  static detectDynamicFields(templateType: TemplateType, data: any): DynamicField[] {
    const dynamicFields: DynamicField[] = []
    
    switch (templateType) {
      case 'item-n-title-content':
        // itemNTitle/itemNContent パターンの検出
        const itemPattern = /^item(\d+)(Title|Content)$/
        const detectedItems = new Map<number, { hasTitle: boolean; hasContent: boolean }>()
        
        // データから動的フィールドを検出
        Object.keys(data || {}).forEach(key => {
          const match = key.match(itemPattern)
          if (match) {
            const index = parseInt(match[1])
            const type = match[2]
            
            if (!detectedItems.has(index)) {
              detectedItems.set(index, { hasTitle: false, hasContent: false })
            }
            
            const item = detectedItems.get(index)!
            if (type === 'Title') {
              item.hasTitle = true
            } else {
              item.hasContent = true
            }
          }
        })
        
        // 検出されたアイテムから動的フィールドを生成
        const maxItems = 6
        const itemCount = Math.max(...Array.from(detectedItems.keys()), 0)
        
        for (let i = 1; i <= Math.max(itemCount, 1); i++) {
          // タイトルフィールド
          dynamicFields.push({
            name: `item${i}Title`,
            type: 'string',
            displayName: `アイテム${i} タイトル`,
            required: i === 1, // 最初のアイテムは必須
            validation: [
              ...(i === 1 ? [{ type: 'required' as const, message: '最初のアイテムのタイトルは必須です' }] : []),
              { type: 'maxLength' as const, value: 50, message: `アイテム${i}のタイトルは50文字以内で入力してください` }
            ],
            placeholder: `アイテム${i}のタイトル`,
            pattern: 'item{n}Title',
            index: i,
            maxCount: maxItems
          })
          
          // コンテンツフィールド
          dynamicFields.push({
            name: `item${i}Content`,
            type: 'text',
            displayName: `アイテム${i} 内容`,
            required: i === 1, // 最初のアイテムは必須
            validation: [
              ...(i === 1 ? [{ type: 'required' as const, message: '最初のアイテムの内容は必須です' }] : []),
              { type: 'maxLength' as const, value: 200, message: `アイテム${i}の内容は200文字以内で入力してください` }
            ],
            placeholder: `アイテム${i}の内容`,
            pattern: 'item{n}Content',
            index: i,
            maxCount: maxItems
          })
        }
        break
        
      case 'checklist-enhanced':
        // checklistItems 配列の編集フィールドとして扱う
        // checklistItems配列データを特別に処理
        const checklistItems = data.checklistItems || []
        const maxChecklistItems = 8
        
        // checklistItems配列の編集フィールドを追加
        dynamicFields.push({
          name: 'checklistItems',
          type: 'array',
          displayName: 'チェックリスト項目',
          required: true,
          validation: [
            { type: 'required', message: 'チェックリスト項目は必須です' },
            { type: 'custom', message: '最低1個、最大8個まで', validator: (value: any[]) => value.length >= 1 && value.length <= 8 }
          ],
          pattern: 'checklistItems',
          index: 1,
          maxCount: maxChecklistItems
        })
        break
        
      case 'simple5':
        // steps 配列の編集フィールドとして扱う
        const steps = data.steps || []
        const maxSteps = 8
        
        // steps配列の編集フィールドを追加
        dynamicFields.push({
          name: 'steps',
          type: 'array',
          displayName: 'ステップ項目',
          required: true,
          validation: [
            { type: 'required', message: 'ステップ項目は必須です' },
            { type: 'custom', message: '最低1個、最大8個まで', validator: (value: any[]) => value.length >= 1 && value.length <= 8 }
          ],
          pattern: 'steps',
          index: 1,
          maxCount: maxSteps
        })
        break
        
      case 'enumeration':
        // items 配列の編集フィールドとして扱う
        const enumItems = data.items || []
        const maxEnumItems = 9
        
        // items配列の編集フィールドを追加
        dynamicFields.push({
          name: 'items',
          type: 'array',
          displayName: '列挙項目',
          required: true,
          validation: [
            { type: 'required', message: '列挙項目は必須です' },
            { type: 'custom', message: '最低1個、最大9個まで', validator: (value: any[]) => value.length >= 1 && value.length <= 9 }
          ],
          pattern: 'items',
          index: 1,
          maxCount: maxEnumItems
        })
        break
        
      case 'ranking':
        // rankingData 配列の編集フィールドとして扱う
        const rankingData = data.rankingData || []
        const maxRankingItems = 5
        
        // rankingData配列の編集フィールドを追加
        dynamicFields.push({
          name: 'rankingData',
          type: 'array',
          displayName: 'ランキング項目',
          required: true,
          validation: [
            { type: 'required', message: 'ランキング項目は必須です' },
            { type: 'custom', message: '最低1個、最大5個まで', validator: (value: any[]) => value.length >= 1 && value.length <= 5 }
          ],
          pattern: 'rankingData',
          index: 1,
          maxCount: maxRankingItems
        })
        break
        
      case 'simple3':
        // twoColumn 配列の編集フィールドとして扱う
        const twoColumn = data.twoColumn || { left: [], right: [] }
        const maxColumnItems = 3
        
        // twoColumn配列の編集フィールドを追加
        dynamicFields.push({
          name: 'twoColumn',
          type: 'object',
          displayName: '2カラム項目',
          required: true,
          validation: [
            { type: 'required', message: '2カラム項目は必須です' },
            { type: 'custom', message: '各カラム最低1個、最大3個まで', validator: (value: any) => 
              value.left && value.right && 
              value.left.length >= 1 && value.left.length <= 3 &&
              value.right.length >= 1 && value.right.length <= 3
            }
          ],
          pattern: 'twoColumn',
          index: 1,
          maxCount: maxColumnItems
        })
        break
        
      case 'section-items':
        // sections 配列の編集フィールドとして扱う
        const sections = data.sections || []
        const maxSectionItems = 7
        
        // sections配列の編集フィールドを追加
        dynamicFields.push({
          name: 'sections',
          type: 'array',
          displayName: 'セクション項目',
          required: true,
          validation: [
            { type: 'required', message: 'セクション項目は必須です' },
            { type: 'custom', message: '1セクション・アイテム最低1個最大7個まで', validator: (value: any[]) => 
              value.length === 1 && value[0].items && 
              value[0].items.length >= 1 && value[0].items.length <= 7
            }
          ],
          pattern: 'sections',
          index: 1,
          maxCount: maxSectionItems
        })
        break
        
      case 'graph':
        // graphData の編集フィールドとして扱う
        const graphData = data.graphData || { type: 'pie', data: [] }
        const maxGraphItems = 8
        
        // graphData配列の編集フィールドを追加
        dynamicFields.push({
          name: 'graphData',
          type: 'object',
          displayName: 'グラフデータ',
          required: true,
          validation: [
            { type: 'required', message: 'グラフデータは必須です' },
            { type: 'custom', message: '最低1個、最大8個まで', validator: (value: any) => 
              value.data && value.data.length >= 1 && value.data.length <= 8
            }
          ],
          pattern: 'graphData',
          index: 1,
          maxCount: maxGraphItems
        })
        break
        
      default:
        break
    }
    
    return dynamicFields
  }
  
  /**
   * フィールドの型情報を取得
   */
  static getFieldType(field: string): FieldType {
    // フィールド名から型を推測
    if (field.includes('Title') || field.includes('title')) {
      return 'string'
    }
    if (field.includes('Content') || field.includes('content') || field.includes('Description')) {
      return 'text'
    }
    if (field.includes('Items') || field.includes('items')) {
      return 'array'
    }
    if (field.includes('Data') || field.includes('data')) {
      return 'object'
    }
    
    return 'string'
  }
  
  /**
   * デフォルト値を生成
   */
  static generateDefaultValue(_field: string, type: FieldType): any {
    switch (type) {
      case 'string':
        return ''
      case 'text':
        return ''
      case 'array':
        return []
      case 'object':
        return {}
      case 'number':
        return 0
      case 'boolean':
        return false
      case 'html':
        return ''
      default:
        return ''
    }
  }
  
  /**
   * 動的フィールドの追加
   */
  static addDynamicField(templateType: TemplateType, currentData: any, fieldPattern: string): any {
    if (templateType === 'item-n-title-content' && fieldPattern === 'item{n}') {
      // 現在の最大インデックスを取得
      const itemPattern = /^item(\d+)(Title|Content)$/
      let maxIndex = 0
      
      Object.keys(currentData || {}).forEach(key => {
        const match = key.match(itemPattern)
        if (match) {
          const index = parseInt(match[1])
          maxIndex = Math.max(maxIndex, index)
        }
      })
      
      // 次のインデックスでフィールドを追加
      const nextIndex = maxIndex + 1
      if (nextIndex <= 6) { // 最大6個まで
        return {
          ...currentData,
          [`item${nextIndex}Title`]: '',
          [`item${nextIndex}Content`]: ''
        }
      }
    }
    
    if (templateType === 'checklist-enhanced' && fieldPattern === 'checklistItems') {
      // checklistItems配列にアイテムを追加
      const checklistItems = currentData.checklistItems || []
      if (checklistItems.length < 8) { // 最大8個まで
        return {
          ...currentData,
          checklistItems: [
            ...checklistItems,
            {
              text: '',
              description: '',
              checked: false
            }
          ]
        }
      }
    }
    
    return currentData
  }
  
  /**
   * 動的フィールドの削除
   */
  static removeDynamicField(templateType: TemplateType, currentData: any, fieldPattern: string, index: number): any {
    if (templateType === 'item-n-title-content' && fieldPattern === 'item{n}') {
      const newData = { ...currentData }
      
      // 指定インデックスのフィールドを削除
      delete newData[`item${index}Title`]
      delete newData[`item${index}Content`]
      
      // インデックスを詰める
      const itemPattern = /^item(\d+)(Title|Content)$/
      const remainingItems: { [key: number]: { title?: string; content?: string } } = {}
      
      Object.keys(newData).forEach(key => {
        const match = key.match(itemPattern)
        if (match) {
          const itemIndex = parseInt(match[1])
          const type = match[2]
          
          if (itemIndex > index) {
            if (!remainingItems[itemIndex]) {
              remainingItems[itemIndex] = {}
            }
            remainingItems[itemIndex][type.toLowerCase() as 'title' | 'content'] = newData[key]
            delete newData[key]
          }
        }
      })
      
      // インデックスを再割り当て
      Object.keys(remainingItems)
        .map(k => parseInt(k))
        .sort((a, b) => a - b)
        .forEach((oldIndex, _i) => {
          const newIndex = oldIndex - 1
          if (remainingItems[oldIndex].title !== undefined) {
            newData[`item${newIndex}Title`] = remainingItems[oldIndex].title
          }
          if (remainingItems[oldIndex].content !== undefined) {
            newData[`item${newIndex}Content`] = remainingItems[oldIndex].content
          }
        })
      
      return newData
    }
    
    if (templateType === 'checklist-enhanced' && fieldPattern === 'checklistItems') {
      // checklistItems配列から指定インデックスのアイテムを削除
      const checklistItems = currentData.checklistItems || []
      if (checklistItems.length > 1) { // 最低1個は残す
        const newChecklistItems = checklistItems.filter((_: any, i: number) => i !== index)
        return {
          ...currentData,
          checklistItems: newChecklistItems
        }
      }
    }
    
    return currentData
  }
}