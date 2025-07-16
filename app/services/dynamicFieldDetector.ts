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
        // （配列は別の方法で処理するため、ここでは個別フィールドとして扱わない）
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
  static generateDefaultValue(field: string, type: FieldType): any {
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
        .forEach((oldIndex, i) => {
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
    
    return currentData
  }
}