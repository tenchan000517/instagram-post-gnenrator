# 11. Instagram投稿生成システム - システム拡張完全ガイド

## 🚀 システム拡張概要

Instagram投稿生成システムは、**拡張性**を重視した設計により、新しいテンプレート・ジャンル・機能の追加が安全かつ効率的に行えます。本ガイドでは、システムの影響範囲を完全に理解した上で、確実な拡張手順を提供します。

### 拡張可能な要素
- **新テンプレート追加**: 新しい表示パターンの作成
- **新ジャンル追加**: 新しいコンテンツカテゴリの対応
- **新エディター追加**: 専用編集機能の実装
- **AI プロンプト改善**: 生成品質の向上
- **UI/UX 機能拡張**: ユーザー体験の向上

## 📋 新テンプレート追加完全手順

### Phase 1: 設計・計画

#### 1-1. テンプレート仕様定義
```typescript
// 新テンプレート設計書
interface NewTemplateSpec {
  // 基本情報
  templateName: string              // 'comparison-table'
  displayName: string               // '比較表'
  complexity: 'simple' | 'medium' | 'complex'  // 'medium'
  
  // 用途・適用条件
  suitableFor: {
    contentTypes: string[]          // ['comparison', 'pros-cons', 'evaluation']
    dataStructures: string[]        // ['table-like', 'comparison']
    genres: string[]                // ['strategy', 'knowhow']
    useCase: string                 // '2つ以上の選択肢を比較する場合'
  }
  
  // データ構造要件
  dataStructure: {
    title: { required: true, maxLength: 35 }
    subtitle?: { required: false, maxLength: 25 }
    compareItems: {
      required: true,
      type: 'array',
      minItems: 2,
      maxItems: 4,
      itemStructure: {
        name: { required: true, maxLength: 20 }
        features: { 
          required: true, 
          type: 'array', 
          maxItems: 5,
          itemMaxLength: 15
        }
        pros?: { type: 'array', maxItems: 3 }
        cons?: { type: 'array', maxItems: 3 }
        score?: { type: 'number', min: 0, max: 100 }
      }
    }
    badgeText?: { required: false, maxLength: 15 }
  }
  
  // 文字数制限
  characterLimits: {
    totalCharacters: 300
    titleMax: 35
    itemNameMax: 20
    featureMax: 15
  }
}
```

#### 1-2. 影響範囲分析
```typescript
// 新テンプレート追加の影響ファイル一覧
const IMPACT_ANALYSIS = {
  // 必須更新ファイル (16ファイル)
  critical: [
    'app/components/templates/TemplateTypes.ts',           // 型定義追加
    'app/components/templates/ComparisonTableTemplate.tsx', // 新テンプレート作成
    'app/components/editors/ComparisonTableEditor.tsx',    // 新エディター作成
    'app/components/EditablePostGenerator.tsx',            // templateComponents登録
    'app/components/templateRegistry.ts',                  // メタデータ登録
    'app/services/pageStructureAnalyzer.ts',              // AI選択指針追加
    'app/services/templateStructureDefinitions.ts',       // 構造定義追加
    'app/services/contentLayoutService.ts',               // 変換ロジック追加
    'app/services/templateMatchingService.ts'             // UI表示対応
  ],
  
  // 推奨更新ファイル (3ファイル)
  recommended: [
    'docs/08_TEMPLATE_SPECIFICATIONS.md',                 // ドキュメント更新
    'tests/templates/ComparisonTableTemplate.test.tsx',   // テスト追加
    'docs/13_DATA_SAMPLES.md'                            // サンプルデータ追加
  ],
  
  // 影響を受ける可能性があるファイル (5ファイル)
  potential: [
    'app/services/templateRecommendationService.ts',      // 推奨ロジック
    'app/utils/validationRules.ts',                      // バリデーション
    'app/hooks/useTemplateSelection.ts',                 // テンプレート選択
    'app/components/TemplateViewer.tsx',                 // プレビュー機能
    'app/services/bulkDownloadService.ts'                // 一括ダウンロード
  ]
}
```

### Phase 2: 実装

#### 2-1. 型定義の追加
```typescript
// app/components/templates/TemplateTypes.ts
// ❌ 危険: 既存の型定義を変更しない
export type TemplateType = 
  | 'index' | 'enumeration' | 'list' | 'explanation2' 
  | 'simple3' | 'table' | 'simple5' | 'simple6' 
  | 'section-items' | 'two-column-section-items' 
  | 'title-description-only' | 'checklist-enhanced' 
  | 'item-n-title-content' | 'single-section-no-items' 
  | 'ranking' | 'graph'
  | 'comparison-table'  // ✅ 新しい型を末尾に追加

// 新テンプレート専用データ型
interface ComparisonTableData {
  title: string
  subtitle?: string
  compareItems: Array<{
    name: string
    features: string[]
    pros?: string[]
    cons?: string[]
    score?: number
  }>
  badgeText?: string
}

// TemplateData型の拡張 (既存の[key: string]: any で対応済み)
```

#### 2-2. テンプレートコンポーネント作成
```tsx
// app/components/templates/ComparisonTableTemplate.tsx
import React from 'react'
import { InstagramPostTemplate } from './InstagramPostTemplate'
import { TemplateProps } from './TemplateTypes'

export const ComparisonTableTemplate: React.FC<TemplateProps> = ({ templateData }) => {
  const compareItems = templateData.compareItems || []

  return (
    <InstagramPostTemplate>
      <div className="h-full flex flex-col justify-between p-6">
        {/* ヘッダー */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-bold text-white mb-2">
            {templateData.title || 'タイトル'}
          </h1>
          {templateData.subtitle && (
            <p className="text-white/80 text-sm">{templateData.subtitle}</p>
          )}
          {templateData.badgeText && (
            <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs mt-2">
              {templateData.badgeText}
            </div>
          )}
        </div>

        {/* 比較テーブル */}
        <div className="flex-1">
          <div className="bg-white/90 rounded-lg overflow-hidden">
            <div className="grid grid-cols-2 gap-px bg-gray-300">
              {compareItems.slice(0, 4).map((item, index) => (
                <div key={index} className="bg-white p-3">
                  {/* 項目名 */}
                  <div className="text-center mb-3">
                    <h3 className="font-bold text-gray-800 text-sm mb-1">
                      {item.name}
                    </h3>
                    {item.score !== undefined && (
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {item.score}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 特徴一覧 */}
                  {item.features && item.features.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-xs font-semibold text-gray-700 mb-1">特徴</h4>
                      <ul className="space-y-1">
                        {item.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-1">
                            <span className="w-1 h-1 bg-blue-400 rounded-full flex-shrink-0"></span>
                            <span className="text-xs text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 長所・短所 */}
                  <div className="space-y-2">
                    {item.pros && item.pros.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-green-700 mb-1">✓ 長所</h4>
                        <ul className="space-y-1">
                          {item.pros.slice(0, 2).map((pro, proIndex) => (
                            <li key={proIndex} className="text-xs text-green-600">
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {item.cons && item.cons.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-red-700 mb-1">✗ 短所</h4>
                        <ul className="space-y-1">
                          {item.cons.slice(0, 2).map((con, conIndex) => (
                            <li key={conIndex} className="text-xs text-red-600">
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InstagramPostTemplate>
  )
}

// メタデータ定義
export const comparisonTableMetadata = {
  id: 'comparison-table',
  name: '比較表',
  description: '複数選択肢の比較・評価表示',
  suitableFor: {
    contentTypes: ['comparison', 'evaluation', 'pros-cons'],
    genres: ['strategy', 'knowhow', 'general'],
    dataStructure: ['comparison', 'evaluation'],
    complexity: 'medium',
    pageCount: { min: 1, max: 3 }
  },
  characterLimits: {
    title: 35,
    content: 200,
    subtitle: 25,
    items: 15
  },
  keywords: ['比較', '選択', '評価', 'メリット', 'デメリット', '違い']
}
```

#### 2-3. エディター実装
```tsx
// app/components/editors/ComparisonTableEditor.tsx
import React from 'react'
import { useEditorState } from '@/hooks/useEditorState'
import { BaseEditorProps } from '@/types/editorTypes'

export const ComparisonTableEditor: React.FC<BaseEditorProps> = ({ 
  templateData, 
  onChange 
}) => {
  const {
    localData,
    isModified,
    validationErrors,
    handleFieldChange
  } = useEditorState(templateData, onChange)

  const addCompareItem = () => {
    const newItems = [
      ...(localData.compareItems || []),
      { name: '', features: [''], pros: [''], cons: [], score: 80 }
    ]
    handleFieldChange('compareItems', newItems)
  }

  const removeCompareItem = (index: number) => {
    const newItems = localData.compareItems?.filter((_, i) => i !== index) || []
    handleFieldChange('compareItems', newItems)
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...(localData.compareItems || [])]
    newItems[index] = { ...newItems[index], [field]: value }
    handleFieldChange('compareItems', newItems)
  }

  const addFeature = (itemIndex: number) => {
    const newItems = [...(localData.compareItems || [])]
    newItems[itemIndex] = {
      ...newItems[itemIndex],
      features: [...(newItems[itemIndex].features || []), '']
    }
    handleFieldChange('compareItems', newItems)
  }

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg max-h-96 overflow-y-auto">
      {/* 基本フィールド */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">タイトル</label>
          <input
            type="text"
            value={localData.title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={35}
            placeholder="比較表のタイトル"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">サブタイトル</label>
          <input
            type="text"
            value={localData.subtitle || ''}
            onChange={(e) => handleFieldChange('subtitle', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={25}
            placeholder="サブタイトル"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">バッジテキスト</label>
          <input
            type="text"
            value={localData.badgeText || ''}
            onChange={(e) => handleFieldChange('badgeText', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={15}
            placeholder="バッジテキスト"
          />
        </div>
      </div>

      {/* 比較項目編集 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium">比較項目</label>
          <button
            onClick={addCompareItem}
            disabled={(localData.compareItems?.length || 0) >= 4}
            className="text-blue-500 hover:text-blue-700 text-sm disabled:opacity-50"
          >
            + 項目追加
          </button>
        </div>

        {localData.compareItems?.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">項目 {index + 1}</h4>
              <button
                onClick={() => removeCompareItem(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                削除
              </button>
            </div>

            {/* 項目名 */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">項目名</label>
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                maxLength={20}
                placeholder="比較項目名"
              />
            </div>

            {/* スコア */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">スコア (0-100)</label>
              <input
                type="number"
                value={item.score || 0}
                onChange={(e) => updateItem(index, 'score', parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded-md"
                min="0"
                max="100"
              />
            </div>

            {/* 特徴 */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium">特徴</label>
                <button
                  onClick={() => addFeature(index)}
                  disabled={(item.features?.length || 0) >= 5}
                  className="text-blue-500 hover:text-blue-700 text-xs disabled:opacity-50"
                >
                  + 特徴追加
                </button>
              </div>
              
              {item.features?.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center space-x-2 mb-1">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...(item.features || [])]
                      newFeatures[featureIndex] = e.target.value
                      updateItem(index, 'features', newFeatures)
                    }}
                    className="flex-1 p-1 border border-gray-300 rounded text-sm"
                    maxLength={15}
                    placeholder="特徴"
                  />
                  <button
                    onClick={() => {
                      const newFeatures = item.features?.filter((_, i) => i !== featureIndex) || []
                      updateItem(index, 'features', newFeatures)
                    }}
                    className="text-red-500 hover:text-red-700 text-xs px-2"
                  >
                    削除
                  </button>
                </div>
              ))}
            </div>

            {/* 長所・短所 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">長所</label>
                {item.pros?.map((pro, proIndex) => (
                  <div key={proIndex} className="flex items-center space-x-2 mb-1">
                    <input
                      type="text"
                      value={pro}
                      onChange={(e) => {
                        const newPros = [...(item.pros || [])]
                        newPros[proIndex] = e.target.value
                        updateItem(index, 'pros', newPros)
                      }}
                      className="flex-1 p-1 border border-gray-300 rounded text-sm"
                      maxLength={20}
                      placeholder="長所"
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newPros = [...(item.pros || []), '']
                    updateItem(index, 'pros', newPros)
                  }}
                  disabled={(item.pros?.length || 0) >= 3}
                  className="text-green-500 hover:text-green-700 text-xs disabled:opacity-50"
                >
                  + 長所追加
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-red-700 mb-1">短所</label>
                {item.cons?.map((con, conIndex) => (
                  <div key={conIndex} className="flex items-center space-x-2 mb-1">
                    <input
                      type="text"
                      value={con}
                      onChange={(e) => {
                        const newCons = [...(item.cons || [])]
                        newCons[conIndex] = e.target.value
                        updateItem(index, 'cons', newCons)
                      }}
                      className="flex-1 p-1 border border-gray-300 rounded text-sm"
                      maxLength={20}
                      placeholder="短所"
                    />
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newCons = [...(item.cons || []), '']
                    updateItem(index, 'cons', newCons)
                  }}
                  disabled={(item.cons?.length || 0) >= 3}
                  className="text-red-500 hover:text-red-700 text-xs disabled:opacity-50"
                >
                  + 短所追加
                </button>
              </div>
            </div>
          </div>
        ))}

        {(!localData.compareItems || localData.compareItems.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">比較項目がありません</p>
            <button
              onClick={addCompareItem}
              className="text-blue-500 hover:text-blue-700"
            >
              最初の項目を追加
            </button>
          </div>
        )}
      </div>

      {isModified && (
        <div className="text-sm text-blue-600">
          ⚡ 変更を保存中...
        </div>
      )}
    </div>
  )
}
```

#### 2-4. システム統合
```typescript
// app/components/EditablePostGenerator.tsx
const templateComponents: Record<TemplateType, React.ComponentType<any>> = {
  // 既存のテンプレート...
  'comparison-table': ComparisonTableTemplate,  // ✅ 新テンプレート追加
}

const editorComponents: Record<string, React.ComponentType<any>> = {
  // 既存のエディター...
  'comparison-table': ComparisonTableEditor,    // ✅ 新エディター追加
}

// app/components/templates/templateRegistry.ts
export const templateRegistry: Record<TemplateType, TemplateMetadata> = {
  // 既存のメタデータ...
  'comparison-table': comparisonTableMetadata,  // ✅ メタデータ追加
}
```

#### 2-5. AI統合設定
```typescript
// app/services/pageStructureAnalyzer.ts
const prompt = `
【テンプレート選択指針】
// 既存の指針...
**comparison-table**: 複数の選択肢やサービスを比較する場合、メリット・デメリットの対比がある場合

【入力内容】
${input}
`

// app/services/templateStructureDefinitions.ts
const templateDefinitions = {
  // 既存の定義...
  'comparison-table': {
    description: '比較表 - 複数選択肢の特徴・長所・短所を比較',
    dataStructure: {
      title: true,
      subtitle: false,
      compareItems: true,
      badgeText: false
    },
    example: {
      title: "転職サイト比較",
      compareItems: [
        {
          name: "リクルート",
          features: ["求人数No.1", "大手企業多数"],
          pros: ["選択肢豊富", "信頼性高"],
          cons: ["競争激しい"],
          score: 85
        }
      ]
    },
    validationRules: [
      'compareItems配列は必須（2-4個）',
      '各項目nameは必須（20文字以内）',
      'featuresは配列（最大5個）'
    ],
    importantNotes: [
      '比較項目は2-4個に制限',
      'スコアは0-100の数値',
      '長所・短所は各3個まで'
    ],
    commonMistakes: [
      'compareItemsが配列でない',
      '項目数が多すぎる',
      'スコアが数値でない'
    ]
  }
}

// app/services/contentLayoutService.ts
case 'comparison-table':
  return {
    title: removeMarkdown(content.title || ''),
    subtitle: removeMarkdown(content.subtitle || ''),
    compareItems: (content.compareItems || []).map(item => ({
      name: removeMarkdown(item.name || ''),
      features: (item.features || []).map(f => removeMarkdown(f)),
      pros: (item.pros || []).map(p => removeMarkdown(p)),
      cons: (item.cons || []).map(c => removeMarkdown(c)),
      score: typeof item.score === 'number' ? item.score : undefined
    })),
    badgeText: removeMarkdown(content.badgeText || ''),
    
    // 他テンプレート用の空フィールド
    items: [],
    sections: [],
    steps: [],
    // ...
  }
```

### Phase 3: テスト・検証

#### 3-1. 単体テスト
```typescript
// tests/components/ComparisonTableTemplate.test.tsx
import { render, screen } from '@testing-library/react'
import { ComparisonTableTemplate } from '@/components/templates/ComparisonTableTemplate'

describe('ComparisonTableTemplate', () => {
  const mockData = {
    title: '転職サイト比較',
    subtitle: '特徴とメリット・デメリット',
    compareItems: [
      {
        name: 'サイトA',
        features: ['求人数多数', '大手企業'],
        pros: ['選択肢豊富'],
        cons: ['競争激しい'],
        score: 85
      },
      {
        name: 'サイトB',
        features: ['専門特化', '高年収'],
        pros: ['質が高い'],
        cons: ['求人数少'],
        score: 75
      }
    ],
    badgeText: '転職'
  }

  it('renders title and subtitle correctly', () => {
    render(<ComparisonTableTemplate templateData={mockData} />)
    expect(screen.getByText('転職サイト比較')).toBeInTheDocument()
    expect(screen.getByText('特徴とメリット・デメリット')).toBeInTheDocument()
  })

  it('renders all compare items', () => {
    render(<ComparisonTableTemplate templateData={mockData} />)
    expect(screen.getByText('サイトA')).toBeInTheDocument()
    expect(screen.getByText('サイトB')).toBeInTheDocument()
    expect(screen.getByText('85')).toBeInTheDocument()
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('renders features, pros and cons', () => {
    render(<ComparisonTableTemplate templateData={mockData} />)
    expect(screen.getByText('求人数多数')).toBeInTheDocument()
    expect(screen.getByText('選択肢豊富')).toBeInTheDocument()
    expect(screen.getByText('競争激しい')).toBeInTheDocument()
  })

  it('handles empty data gracefully', () => {
    const emptyData = { title: 'テスト', compareItems: [] }
    render(<ComparisonTableTemplate templateData={emptyData} />)
    expect(screen.getByText('テスト')).toBeInTheDocument()
  })
})
```

#### 3-2. 統合テスト
```typescript
// tests/integration/comparisonTableFlow.test.ts
describe('Comparison Table Integration', () => {
  it('generates comparison table from AI analysis', async () => {
    const input = `
      【ジャンル】: strategy
      
      転職サイト比較：あなたに最適なサービスはどれ？
      
      リクルートエージェント
      - 求人数業界No.1
      - 大手企業の案件多数
      - サポート充実
      メリット：選択肢が豊富、信頼性が高い
      デメリット：競争が激しい
      
      ビズリーチ
      - ハイクラス特化
      - 高年収案件
      - ヘッドハンター制
      メリット：年収アップ期待、質の高い求人
      デメリット：求人数限定、審査あり
    `

    const result = await contentGeneratorService.generateContent(input)
    
    // comparison-tableテンプレートが選択されることを確認
    const comparisonPage = result.pages.find(p => p.templateType === 'comparison-table')
    expect(comparisonPage).toBeDefined()
    
    // データ構造の確認
    expect(comparisonPage.templateData.compareItems).toHaveLength(2)
    expect(comparisonPage.templateData.compareItems[0].name).toContain('リクルート')
    expect(comparisonPage.templateData.compareItems[1].name).toContain('ビズリーチ')
  }, 30000)
})
```

## 🎨 新ジャンル追加完全手順

### Phase 1: ジャンル設計

#### 1-1. ジャンル仕様定義
```typescript
// 新ジャンル設計書
interface NewGenreSpec {
  genreName: 'career-change'  // 転職・キャリアチェンジ
  displayName: 'キャリアチェンジ'
  
  // ジャンル特性
  characteristics: {
    description: '転職・キャリアチェンジの戦略的サポート'
    keywords: ['転職', 'キャリア', '職業', '業界', '年収', 'スキル', '面接', '履歴書']
    optimalItemRange: { min: 4, max: 7 }  // やや多めの情報量
    contentStructure: ['strategy', 'preparation', 'execution', 'tips']
  }
  
  // 推奨テンプレート
  preferredTemplates: [
    'section-items',      // メイン：カテゴリ別情報整理
    'checklist-enhanced', // 準備チェックリスト
    'comparison-table',   // 選択肢比較（新テンプレート）
    'ranking',           // 重要ポイントランキング
    'simple5'            // ステップバイステップ
  ]
  
  // コンテンツガイドライン
  contentGuidelines: {
    tone: 'professional'  // プロフェッショナル
    focus: 'actionable'   // 実行可能性重視
    depth: 'detailed'     // 詳細な情報提供
  }
}
```

#### 1-2. 影響範囲分析
```typescript
const GENRE_IMPACT_ANALYSIS = {
  // 必須更新ファイル (4ファイル)
  critical: [
    'app/types/genre.ts',                    // Genre型とGENRE_CONFIGS更新
    'app/services/genreDetector.ts',         // キーワード検出ロジック
    'app/services/pageStructureAnalyzer.ts', // ジャンル特性の活用
    'app/services/itemCountOptimizer.ts'     // 最適項目数の調整
  ],
  
  // 推奨更新ファイル (3ファイル)
  recommended: [
    'app/services/hashtags.ts',             // ジャンル特化ハッシュタグ
    'docs/05_AI_INTEGRATION_GUIDE.md',      // AI統合ガイド更新
    'tests/integration/genreDetection.test.ts' // テスト追加
  ]
}
```

### Phase 2: 実装

#### 2-1. ジャンル型定義の追加
```typescript
// app/types/genre.ts
export type Genre = 
  | 'knowhow' 
  | 'book-recommendation' 
  | 'internship-deadline' 
  | 'entry-deadline' 
  | 'industry-features' 
  | 'strategy' 
  | 'step-learning' 
  | 'general'
  | 'career-change'  // ✅ 新ジャンル追加

export const GENRE_CONFIGS: GenreConfig[] = [
  // 既存のジャンル設定...
  {
    genre: 'career-change',
    description: '転職・キャリアチェンジの戦略的サポート',
    keywords: [
      '転職', 'キャリア', '職業', '業界', '年収', 'スキル', 
      '面接', '履歴書', '職務経歴書', 'エージェント', 
      'ヘッドハンター', '求人', '採用', '内定'
    ],
    optimalItemRange: { min: 4, max: 7 },
    contentStructure: ['strategy', 'preparation', 'execution', 'tips']
  }
]
```

#### 2-2. ジャンル検出ロジック更新
```typescript
// app/services/genreDetector.ts
export class GenreDetector {
  static detectGenre(content: string): Genre | null {
    const lowerContent = content.toLowerCase()
    
    // 新ジャンルの検出ロジック
    const careerChangeIndicators = [
      '転職', 'キャリアチェンジ', '職業変更', '業界変更',
      '転職活動', '求人', '面接', '履歴書', '職務経歴書',
      'エージェント', '年収アップ', 'スキルアップ'
    ]
    
    const careerChangeScore = this.calculateKeywordScore(lowerContent, careerChangeIndicators)
    
    // 他のジャンルとの競合チェック
    const allScores = {
      'career-change': careerChangeScore,
      'strategy': this.calculateKeywordScore(lowerContent, getGenreConfig('strategy').keywords),
      'knowhow': this.calculateKeywordScore(lowerContent, getGenreConfig('knowhow').keywords),
      // ... 他のジャンル
    }
    
    // 最高スコアのジャンルを選択（閾値0.3以上）
    const maxScore = Math.max(...Object.values(allScores))
    if (maxScore >= 0.3) {
      const detectedGenre = Object.entries(allScores)
        .find(([_, score]) => score === maxScore)?.[0] as Genre
      
      return detectedGenre || null
    }
    
    return null
  }
  
  private static calculateKeywordScore(content: string, keywords: string[]): number {
    const matches = keywords.filter(keyword => content.includes(keyword.toLowerCase()))
    return matches.length / keywords.length
  }
}
```

#### 2-3. AI プロンプト最適化
```typescript
// app/services/pageStructureAnalyzer.ts
const genreSpecificInstructions = {
  'career-change': `
【キャリアチェンジ特化指針】
- 戦略的アプローチを重視（準備→実行→フォロー）
- 具体的なアクションアイテムを含める
- 比較・選択肢の提示を積極的に行う
- チェックリスト形式での整理を推奨
- 転職市場の現実的な情報を含める

【推奨テンプレート優先度】
1. section-items: カテゴリ別情報整理（転職準備、面接対策等）
2. checklist-enhanced: 転職活動チェックリスト
3. comparison-table: 転職サイト・エージェント比較
4. ranking: 重要ポイント・優先度ランキング
5. simple5: 転職活動ステップ
  `,
  
  // 他のジャンル...
}

const prompt = `
あなたはInstagram投稿構造の専門家です。以下のコンテンツを分析し、最適なページ構造を決定してください。

【ジャンル分析結果】
- 判定ジャンル: ${detectedGenre}
- 最適項目数: ${genreConfig.optimalItemRange.min}-${genreConfig.optimalItemRange.max}個

${genreSpecificInstructions[detectedGenre] || ''}

【テンプレート選択指針】
${getTemplateSelectionGuidelines()}

【入力内容】
${input}
`
```

#### 2-4. ハッシュタグ最適化
```typescript
// app/services/hashtags.ts
const GENRE_HASHTAG_STRATEGIES = {
  'career-change': {
    large: ['転職', 'キャリアチェンジ', '転職活動', '求人', 'キャリア', '職業', '仕事'],
    medium: [
      '転職サイト', '転職エージェント', '面接対策', '履歴書', '職務経歴書',
      '年収アップ', 'スキルアップ', '業界研究', '企業研究', '内定'
    ],
    small: [
      '転職のコツ', '面接のポイント', '履歴書の書き方', '転職成功',
      'キャリア設計', '転職準備', '転職市場', '求人情報', '転職相談',
      'キャリアアップ', '職業選択', '転職体験談', '転職ノウハウ'
    ]
  },
  
  // 既存のジャンル戦略...
}
```

### Phase 3: 検証・調整

#### 3-1. ジャンル検出テスト
```typescript
// tests/services/genreDetector.test.ts
describe('Genre Detection - Career Change', () => {
  it('detects career-change genre from typical content', () => {
    const content = `
      転職活動を成功させる5つのステップ
      
      転職を考えているあなたへ。キャリアチェンジを成功させるための
      具体的なステップを解説します。
      
      1. 自己分析とキャリア設計
      2. 転職市場の調査
      3. 履歴書・職務経歴書の作成
      4. 転職エージェントの活用
      5. 面接対策と内定獲得
    `
    
    const detectedGenre = GenreDetector.detectGenre(content)
    expect(detectedGenre).toBe('career-change')
  })

  it('distinguishes from strategy genre', () => {
    const strategyContent = `
      面接対策の基本戦略
      
      就活生向けの面接対策です。
      基本的な準備から実践的なコツまで解説します。
    `
    
    const detectedGenre = GenreDetector.detectGenre(strategyContent)
    expect(detectedGenre).toBe('strategy') // career-changeではなくstrategy
  })
})
```

#### 3-2. エンドツーエンドテスト
```typescript
// tests/integration/careerChangeFlow.test.ts
describe('Career Change Genre Flow', () => {
  it('generates appropriate content for career change topic', async () => {
    const input = `
      【ジャンル】: career-change
      
      30代の転職成功マニュアル
      
      転職を成功させるための準備
      □ 自己分析とキャリアの棚卸し
      □ 転職市場の動向調査
      □ 必要スキルの習得
      
      転職活動の実践
      □ 転職サイト・エージェントの選択
      □ 応募書類の作成
      □ 面接対策と実践
    `

    const result = await contentGeneratorService.generateContent(input)
    
    // ジャンル特性の確認
    expect(result.pages).toHaveLength(4-7) // career-changeの範囲
    
    // 推奨テンプレートの使用確認
    const templateTypes = result.pages.map(p => p.templateType)
    expect(templateTypes).toContain('section-items')
    expect(templateTypes).toContain('checklist-enhanced')
    
    // ハッシュタグの確認
    expect(result.hashtags.large).toContain('転職')
    expect(result.hashtags.large).toContain('キャリアチェンジ')
  }, 30000)
})
```

## 🔧 AI プロンプト改善手順

### プロンプトA/Bテスト実装
```typescript
// app/services/promptExperiments.ts
export class PromptExperiments {
  private static readonly EXPERIMENT_CONFIGS = {
    'template-selection-v2': {
      enabled: process.env.ENABLE_PROMPT_EXPERIMENTS === 'true',
      trafficPercentage: 50, // 50%のトラフィックで実験
      variants: {
        control: 'existing-prompt',
        variant: 'improved-prompt-v2'
      }
    }
  }
  
  static getPromptVariant(experimentName: string, userId?: string): string {
    const config = this.EXPERIMENT_CONFIGS[experimentName]
    if (!config?.enabled) return 'control'
    
    // ユーザーIDベースの一貫した振り分け
    const hash = this.hashString(userId || 'anonymous')
    const bucket = hash % 100
    
    return bucket < config.trafficPercentage ? 'variant' : 'control'
  }
  
  static logExperimentResult(
    experimentName: string,
    variant: string,
    input: string,
    output: any,
    metrics: any
  ) {
    // 実験結果の記録
    console.log('Experiment Result:', {
      experiment: experimentName,
      variant,
      inputLength: input.length,
      outputPages: output?.pages?.length,
      metrics
    })
  }
  
  private static hashString(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // 32bit整数に変換
    }
    return Math.abs(hash)
  }
}

// 使用例
const promptVariant = PromptExperiments.getPromptVariant('template-selection-v2')
const prompt = promptVariant === 'variant' ? improvedPrompt : originalPrompt
```

### プロンプト品質メトリクス
```typescript
// app/utils/promptMetrics.ts
export class PromptMetrics {
  static measurePromptEffectiveness(
    input: string,
    prompt: string,
    response: any,
    expectedStructure: any
  ) {
    const metrics = {
      // 応答構造の適合度
      structureMatch: this.calculateStructureMatch(response, expectedStructure),
      
      // JSON解析成功率
      jsonParseSuccess: this.validateJSONStructure(response),
      
      // 内容の関連性
      contentRelevance: this.calculateContentRelevance(input, response),
      
      // テンプレート選択の適切性
      templateAppropriatenesss: this.evaluateTemplateSelection(input, response),
      
      // 応答時間
      responseTime: performance.now()
    }
    
    return metrics
  }
  
  private static calculateStructureMatch(response: any, expected: any): number {
    if (!response || !expected) return 0
    
    const responseKeys = Object.keys(response)
    const expectedKeys = Object.keys(expected)
    const matchedKeys = responseKeys.filter(key => expectedKeys.includes(key))
    
    return matchedKeys.length / expectedKeys.length
  }
  
  private static validateJSONStructure(response: any): boolean {
    try {
      if (typeof response === 'string') {
        JSON.parse(response)
      }
      return Array.isArray(response?.pages) || Array.isArray(response)
    } catch {
      return false
    }
  }
  
  private static calculateContentRelevance(input: string, response: any): number {
    if (!response?.pages) return 0
    
    const inputWords = input.toLowerCase().match(/\w+/g) || []
    const responseText = JSON.stringify(response).toLowerCase()
    const sharedWords = inputWords.filter(word => responseText.includes(word))
    
    return sharedWords.length / inputWords.length
  }
}
```

## 📊 システム監視・メトリクス

### パフォーマンス監視
```typescript
// app/utils/systemMetrics.ts
export class SystemMetrics {
  private static metrics: Map<string, any[]> = new Map()
  
  static recordMetric(name: string, value: any, metadata?: any) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    
    this.metrics.get(name)!.push({
      value,
      timestamp: Date.now(),
      metadata
    })
    
    // 古いデータの削除（24時間）
    this.cleanOldMetrics(name)
  }
  
  static getMetricsSummary(name: string) {
    const data = this.metrics.get(name) || []
    if (data.length === 0) return null
    
    const values = data.map(d => d.value).filter(v => typeof v === 'number')
    
    return {
      count: data.length,
      average: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      latest: data[data.length - 1]
    }
  }
  
  static exportMetrics() {
    const summary = {}
    for (const [name, _] of this.metrics) {
      summary[name] = this.getMetricsSummary(name)
    }
    return summary
  }
  
  private static cleanOldMetrics(name: string) {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000 // 24時間前
    const data = this.metrics.get(name) || []
    const filtered = data.filter(d => d.timestamp > cutoff)
    this.metrics.set(name, filtered)
  }
}

// 使用例
SystemMetrics.recordMetric('ai_response_time', responseTime, { templateType, genre })
SystemMetrics.recordMetric('template_selection', templateType, { genre, confidence })
SystemMetrics.recordMetric('user_edit_count', editCount, { templateType })
```

### 品質監視ダッシュボード
```typescript
// app/components/admin/MetricsDashboard.tsx
export const MetricsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>({})
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(SystemMetrics.exportMetrics())
    }, 10000) // 10秒ごと更新
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">システムメトリクス</h2>
      
      {/* AI応答時間 */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">AI応答時間</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {metrics.ai_response_time?.average?.toFixed(0) || 0}ms
            </div>
            <div className="text-sm text-gray-600">平均</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {metrics.ai_response_time?.min || 0}ms
            </div>
            <div className="text-sm text-gray-600">最小</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {metrics.ai_response_time?.max || 0}ms
            </div>
            <div className="text-sm text-gray-600">最大</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-600">
              {metrics.ai_response_time?.count || 0}
            </div>
            <div className="text-sm text-gray-600">呼び出し数</div>
          </div>
        </div>
      </div>
      
      {/* テンプレート使用状況 */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">テンプレート使用状況</h3>
        <div className="space-y-2">
          {Object.entries(metrics.template_selection || {}).map(([template, data]: [string, any]) => (
            <div key={template} className="flex justify-between">
              <span>{template}</span>
              <span className="font-semibold">{data.count}回</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

## 🎯 拡張ベストプラクティス

### 1. 段階的ロールアウト
```typescript
// 新機能の段階的有効化
const FEATURE_FLAGS = {
  NEW_TEMPLATE_COMPARISON_TABLE: {
    enabled: process.env.NODE_ENV === 'development' || 
             process.env.ENABLE_COMPARISON_TABLE === 'true',
    rolloutPercentage: 10 // 10%のユーザーに限定
  },
  
  NEW_GENRE_CAREER_CHANGE: {
    enabled: process.env.ENABLE_CAREER_CHANGE_GENRE === 'true',
    rolloutPercentage: 25 // 25%のユーザーに限定
  }
}

export const useFeatureFlag = (flagName: string) => {
  const flag = FEATURE_FLAGS[flagName]
  if (!flag) return false
  
  if (!flag.enabled) return false
  
  // ユーザーベースの一貫した判定
  const userId = getCurrentUserId() // セッションID等
  const hash = hashString(userId + flagName) % 100
  
  return hash < flag.rolloutPercentage
}
```

### 2. 後方互換性の保証
```typescript
// 新機能追加時の既存データ保護
const migrateLegacyData = (templateData: any, templateType: TemplateType): TemplateData => {
  // 既存データの構造を新形式に移行
  if (templateType === 'comparison-table' && !templateData.compareItems) {
    // 古い形式からの移行ロジック
    return {
      ...templateData,
      compareItems: templateData.items?.map(item => ({
        name: item,
        features: [],
        pros: [],
        cons: [],
        score: 50
      })) || []
    }
  }
  
  return templateData
}
```

### 3. 拡張性確保の設計パターン
```typescript
// プラグイン式アーキテクチャの例
interface TemplatePlugin {
  templateType: TemplateType
  component: React.ComponentType<TemplateProps>
  editor: React.ComponentType<BaseEditorProps>
  metadata: TemplateMetadata
  aiInstructions: string
  dataConverter: (content: any) => TemplateData
}

class TemplateRegistry {
  private static plugins: Map<TemplateType, TemplatePlugin> = new Map()
  
  static registerPlugin(plugin: TemplatePlugin) {
    this.plugins.set(plugin.templateType, plugin)
  }
  
  static getPlugin(templateType: TemplateType): TemplatePlugin | null {
    return this.plugins.get(templateType) || null
  }
  
  static getAllTemplateTypes(): TemplateType[] {
    return Array.from(this.plugins.keys())
  }
}

// 新テンプレートの動的登録
const comparisonTablePlugin: TemplatePlugin = {
  templateType: 'comparison-table',
  component: ComparisonTableTemplate,
  editor: ComparisonTableEditor,
  metadata: comparisonTableMetadata,
  aiInstructions: '複数の選択肢やサービスを比較する場合',
  dataConverter: convertToComparisonTableData
}

TemplateRegistry.registerPlugin(comparisonTablePlugin)
```

---

このシステム拡張ガイドにより、新テンプレート・ジャンルの安全で効率的な追加、AI機能の改善、システムの継続的な進化が可能になります。次の「12_QUALITY_ASSURANCE_GUIDE.md」で、品質保証の詳細について学習してください。