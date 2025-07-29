import React from 'react'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'
import { Check } from 'lucide-react'

interface DynamicBoxesTemplateProps {
  data: TemplateData
}

interface BoxSection {
  name: string;
  content: string | string[];
}

interface DynamicBoxesData extends TemplateData {
  title: string;
  boxes: BoxSection[];
}

export function DynamicBoxesTemplate({ data }: DynamicBoxesTemplateProps) {
  const boxData = data as DynamicBoxesData
  const { title, boxes = [] } = boxData
  
  // 最大4つまでのボックスを表示
  const displayBoxes = boxes.slice(0, 4)

  // コンテンツ表示コンポーネント（description or list 対応）
  const ContentDisplay = ({ content }: { content: string | string[] }) => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">
                {cleanMarkdown(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    
    return (
      <p className="text-gray-700 leading-relaxed">
        {cleanMarkdown(content)}
      </p>
    );
  };

  // グリッドレイアウト決定
  const getGridClass = (count: number) => {
    switch (count) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-1 md:grid-cols-2'
      case 3:
        return 'grid-cols-1 md:grid-cols-2'
      case 4:
        return 'grid-cols-1 md:grid-cols-2'
      default:
        return 'grid-cols-1 md:grid-cols-2'
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-white relative overflow-hidden">
      {/* メインコンテンツ */}
      <div className="p-8 h-full flex flex-col">
        {/* タイトル */}
        {title && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {cleanMarkdown(title)}
            </h1>
          </div>
        )}

        {/* 動的ボックスグリッド */}
        <div className="flex-1 flex items-center justify-center">
          <div className={`grid gap-6 w-full max-w-5xl ${getGridClass(displayBoxes.length)}`}>
            {displayBoxes.map((box, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {/* ボックスヘッダー */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <h2 className="text-lg font-bold text-gray-800">
                    {cleanMarkdown(box.name)}
                  </h2>
                </div>

                {/* ボックスコンテンツ */}
                <div className="pl-11">
                  <ContentDisplay content={box.content} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* フォールバック: ボックスがない場合 */}
        {displayBoxes.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg">表示するボックスがありません</p>
            </div>
          </div>
        )}

        {/* 4つを超える場合の注意表示 */}
        {boxes.length > 4 && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              ※ 最大4つのボックスまで表示されます（{boxes.length}個中4個を表示）
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// メタデータ
export const dynamicBoxesMetadata = {
  id: 'dynamic_boxes',
  name: '動的ボックス型',
  description: 'セクション名+コンテンツのボックスを動的に最大4つまで表示するテンプレート',
  suitableFor: {
    contentTypes: ['カテゴリ分割', 'セクション説明', '要点整理', '複数項目解説'],
    genres: ['ナレッジ系', 'ノウハウ系', '実践系'],
    dataStructure: ['セクション構造', 'ボックス表示', '動的レイアウト'],
    complexity: 'medium' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 40,
    boxName: 25,
    boxContent: 200,
    boxes: 4 // 最大ボックス数
  },
  keywords: ['ボックス', 'セクション', '動的', 'グリッド', '要点', '分割']
}