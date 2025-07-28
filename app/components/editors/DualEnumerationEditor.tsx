// DualEnumerationEditor - 2アイテム上下配置型コンテンツ編集機能
import React, { useState, useEffect } from 'react'
import { Image, Trash2, Upload } from 'lucide-react'
import { TemplateData } from '../templates/TemplateTypes'

interface DualEnumerationEditorProps {
  data: TemplateData
  onUpdate: (updatedData: TemplateData) => void
}

interface DualItem {
  number: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
}

export function DualEnumerationEditor({ data, onUpdate }: DualEnumerationEditorProps) {
  const [items, setItems] = useState<DualItem[]>([])

  // 初期データの設定
  useEffect(() => {
    const contentArray = (data as any).content || {};
    const dataItems = contentArray.items || data.items || [];
    
    if (dataItems.length > 0) {
      const formattedItems = dataItems.slice(0, 2).map((item: any, index: number) => ({
        number: item.number || (index + 1).toString(),
        title: item.title || '',
        description: item.description || '',
        imageSrc: item.imageSrc || item.image || '',
        imageAlt: item.imageAlt || item.alt || 'イラスト'
      }));
      
      // 2個未満の場合は空のアイテムで埋める
      while (formattedItems.length < 2) {
        formattedItems.push({
          number: (formattedItems.length + 1).toString(),
          title: '',
          description: '',
          imageSrc: '',
          imageAlt: 'イラスト'
        });
      }
      
      setItems(formattedItems);
    } else {
      // デフォルトの2項目
      setItems([
        {
          number: '1',
          title: '1つ目のタイトル',
          description: '1つ目の説明文',
          imageSrc: '',
          imageAlt: 'イラスト'
        },
        {
          number: '2',
          title: '2つ目のタイトル',
          description: '2つ目の説明文',
          imageSrc: '',
          imageAlt: 'イラスト'
        }
      ]);
    }
  }, [data])

  // データ更新
  const updateData = (newItems: DualItem[]) => {
    setItems(newItems)
    
    const updatedData = {
      ...data,
      content: {
        items: newItems
      }
    }
    onUpdate(updatedData)
  }

  // アイテム更新
  const updateItem = (index: number, field: keyof DualItem, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    updateData(newItems)
  }

  // 画像削除
  const removeImage = (index: number) => {
    updateItem(index, 'imageSrc', '')
  }

  // 利用可能な画像リスト
  const availableImages = [
    { path: '/misaki.png', name: 'みさき' },
    { path: '/kikuyo.png', name: 'きくよ' },
    { path: '/king.png', name: 'キング' },
    { path: '/ten_worry.png', name: 'てん（心配）' },
    { path: '/misaki_worry.png', name: 'みさき（心配）' },
    { path: '/kikuyo_worry.png', name: 'きくよ（心配）' },
    { path: '/king_warry.png', name: 'キング（心配）' },
    { path: '/iida.png', name: 'いいだ' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded"></div>
        <h3 className="text-lg font-semibold text-gray-800">2アイテム上下配置型 編集</h3>
      </div>

      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
              index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-orange-400 to-red-500'
            }`}>
              {item.number}
            </div>
            <span className="font-medium text-gray-700">アイテム {index + 1}</span>
          </div>

          {/* 番号 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              番号
            </label>
            <input
              type="text"
              value={item.number}
              onChange={(e) => updateItem(index, 'number', e.target.value)}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1"
            />
          </div>

          {/* タイトル */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              タイトル
            </label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => updateItem(index, 'title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="タイトルを入力"
            />
          </div>

          {/* 画像選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              画像（オプショナル）
            </label>
            
            {item.imageSrc ? (
              <div className="flex items-center gap-3">
                <img 
                  src={item.imageSrc} 
                  alt={item.imageAlt}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{item.imageSrc}</p>
                  <button
                    onClick={() => removeImage(index)}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    画像を削除
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-2">
                  {availableImages.map((img) => (
                    <button
                      key={img.path}
                      onClick={() => updateItem(index, 'imageSrc', img.path)}
                      className="p-2 border border-gray-300 rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      <img 
                        src={img.path} 
                        alt={img.name}
                        className="w-full h-12 object-cover rounded"
                      />
                      <p className="text-xs text-gray-600 mt-1">{img.name}</p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  画像を選択しない場合は、画像なしで表示されます
                </p>
              </div>
            )}
          </div>

          {/* 説明文 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              説明文
            </label>
            <textarea
              value={item.description}
              onChange={(e) => updateItem(index, 'description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="説明文を入力"
            />
            <p className="text-xs text-gray-500 mt-1">
              文字数: {item.description.length}/100文字
            </p>
          </div>
        </div>
      ))}

      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
        <p className="font-medium mb-1">📝 編集のヒント:</p>
        <ul className="space-y-1 text-xs">
          <li>• このテンプレートは常に2つのアイテムを表示します</li>
          <li>• 画像は任意で、選択しない場合は表示されません</li>
          <li>• タイトルは簡潔に、説明文は具体的に記入してください</li>
          <li>• 番号は数字や記号をカスタマイズできます</li>
        </ul>
      </div>
    </div>
  )
}