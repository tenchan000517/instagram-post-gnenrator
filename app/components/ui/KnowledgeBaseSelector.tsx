/**
 * ナレッジベース選択コンポーネント
 * Type → Target → Theme の3段階選択UI
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import { TypeID, TargetID, ThemeID, SelectionState, KnowledgeBaseParams } from '../../types/knowledgeBase'
import { Brain, Target, Lightbulb, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'

interface TypeOption {
  id: TypeID
  name: string
  description: string
  emotionRatioRange: string
  characteristics: string[]
  recommendedFor: string[]
  color: string
}

interface TargetOption {
  id: TargetID
  name: string
  description: string
  compatibleTypes: TypeID[]
  characteristics: string[]
}

interface ThemeOption {
  id: ThemeID
  name: string
  description: string
  compatibleTypes: TypeID[]
  compatibleTargets: TargetID[]
}

const TYPE_OPTIONS: TypeOption[] = [
  {
    id: '001',
    name: 'キャリアの悩み解決法',
    description: '感情・共感重視のアプローチで心理的サポートを提供',
    emotionRatioRange: '感情重視',
    characteristics: ['共感誘導', '心理的サポート', '感情フック', 'ストーリー性'],
    recommendedFor: ['不安解消', 'キャリア相談', '悩み共有', '励まし'],
    color: 'bg-pink-500'
  },
  {
    id: '002', 
    name: 'スキルアップガイド',
    description: '教育・学習重視の体系的知識伝達による段階的スキル習得支援',
    emotionRatioRange: '学習重視',
    characteristics: ['体系性', '段階的習得', '教育的', 'スキル向上'],
    recommendedFor: ['学習指導', 'ハウツー', '手法解説', 'スキルアップ'],
    color: 'bg-blue-500'
  },
  {
    id: '003',
    name: '業界・企業情報まとめ', 
    description: '情報・データ重視の客観的データによる選択支援',
    emotionRatioRange: 'データ重視',
    characteristics: ['客観性', 'データ重視', '比較可能性', '情報提供'],
    recommendedFor: ['企業情報', '業界研究', 'データ比較', '選択支援'],
    color: 'bg-green-500'
  },
  {
    id: '004',
    name: '効率アップテクニック',
    description: '実用・効率重視の即効性のある具体的手法の提供',
    emotionRatioRange: '実用重視', 
    characteristics: ['効率性', '実用性', '即効性', '具体的成果'],
    recommendedFor: ['時短術', '効率化', '実践的手法', '問題解決'],
    color: 'bg-orange-500'
  }
]

const TARGET_OPTIONS: TargetOption[] = [
  // キャリアの悩み解決法（001）のターゲット
  {
    id: 'T001',
    name: '就活に不安を感じている学生',
    description: '就活の不安や迷いを感情的サポートで和らげたい学生',
    compatibleTypes: ['001'],
    characteristics: ['不安感', '共感欲求', '心理的サポート', '安心感欲求']
  },
  {
    id: 'T002',
    name: '仕事のストレスで悩んでいる人',
    description: '職場のストレスや人間関係に悩む社会人',
    compatibleTypes: ['001'],
    characteristics: ['ストレス', '感情的負担', '共感', '心のケア']
  },
  {
    id: 'T003',
    name: '転職すべきか迷っている人',
    description: '転職への迷いや不安を感情面からサポートしてほしい人',
    compatibleTypes: ['001'],
    characteristics: ['転職迷い', '決断不安', '感情的支援', '背中押し']
  },
  // スキルアップガイド（002）のターゲット
  {
    id: 'T004',
    name: '就活で差をつけたい学生',
    description: '体系的な学習で就活競争力を高めたい学生',
    compatibleTypes: ['002'],
    characteristics: ['競争力向上', '体系的学習', '段階的成長', 'スキル習得']
  },
  {
    id: 'T005',
    name: '新しいスキルを身につけたい人',
    description: '新技術や新分野のスキルを効率的に習得したい人',
    compatibleTypes: ['002'],
    characteristics: ['新スキル習得', '教育重視', '学習方法', '成長志向']
  },
  {
    id: 'T006',
    name: 'キャリアアップしたい人',
    description: '昇進や昇格のための体系的スキル向上を目指す社会人',
    compatibleTypes: ['002'],
    characteristics: ['キャリア向上', '専門性', '継続学習', '成長計画']
  },
  // 業界・企業情報まとめ（003）のターゲット
  {
    id: 'T007',
    name: '業界研究をしている就活生',
    description: '客観的な業界情報・データを求める就活生',
    compatibleTypes: ['003'],
    characteristics: ['業界研究', 'データ重視', '情報収集', '客観的判断']
  },
  {
    id: 'T008',
    name: '転職先を探している人',
    description: '転職候補企業の詳細情報を比較検討したい人',
    compatibleTypes: ['003'],
    characteristics: ['企業比較', '転職情報', 'データ分析', '選択支援']
  },
  {
    id: 'T009',
    name: '企業選択で迷っている人',
    description: '複数企業の比較情報で最適な選択をしたい人',
    compatibleTypes: ['003'],
    characteristics: ['企業選択', '比較検討', '情報整理', '意思決定']
  },
  // 効率アップテクニック（004）のターゲット
  {
    id: 'T010',
    name: 'AIを仕事に活かしたい人',
    description: 'AI技術を活用して業務効率を上げたい人',
    compatibleTypes: ['004'],
    characteristics: ['AI活用', '新技術', '効率化', '実用重視']
  },
  {
    id: 'T011',
    name: '生産性を上げたい人',
    description: '仕事の生産性向上のための実践的手法を求める人',
    compatibleTypes: ['004'],
    characteristics: ['生産性向上', '効率化', '実践的', '結果重視']
  },
  {
    id: 'T012',
    name: '時短で結果を出したい就活生',
    description: '限られた時間で最大の就活成果を得たい学生',
    compatibleTypes: ['004'],
    characteristics: ['時短', '効率性', '最短ルート', '実用的手法']
  }
]

const THEME_OPTIONS: ThemeOption[] = [
  { id: 'TH001', name: '感情支援・心理ケア', description: '体験談共有・感情共感による心理的サポート', compatibleTypes: ['001'], compatibleTargets: ['T001', 'T002', 'T003'] },
  { id: 'TH002', name: '体系教育・技能習得', description: '段階的教育・体系的スキル習得・方法論提供', compatibleTypes: ['002'], compatibleTargets: ['T004', 'T005', 'T006'] },
  { id: 'TH003', name: '実績証明・権威活用', description: '数値実績・権威性・専門性による信頼構築', compatibleTypes: ['003'], compatibleTargets: ['T007', 'T008', 'T009'] },
  { id: 'TH004', name: '情報提供・選択支援', description: '客観的情報提供・比較可能な選択肢の提示', compatibleTypes: ['003'], compatibleTargets: ['T007', 'T008', 'T009'] },
  { id: 'TH005', name: '戦略設計・最適化', description: '戦略的計画・継続的最適化・長期的成功実現', compatibleTypes: ['002', '003'], compatibleTargets: ['T005', 'T006', 'T008', 'T009'] },
  { id: 'TH006', name: '現実対応・問題解決', description: '現実的課題・具体的問題の即効解決', compatibleTypes: ['001', '002', '004'], compatibleTargets: ['T001', 'T002', 'T003', 'T004', 'T010', 'T011', 'T012'] },
  { id: 'TH007', name: 'サービス活用・行動促進', description: 'サービス利用促進・行動喚起・CTA設計', compatibleTypes: ['004'], compatibleTargets: ['T010', 'T011', 'T012'] }
]

interface KnowledgeBaseSelectorProps {
  onSelectionChange: (params: KnowledgeBaseParams) => void
  initialSelection?: Partial<SelectionState>
}

export function KnowledgeBaseSelector({ onSelectionChange, initialSelection }: KnowledgeBaseSelectorProps) {
  const [selectionState, setSelectionState] = useState<SelectionState>({
    useKnowledgeBase: initialSelection?.useKnowledgeBase ?? false,
    step: 'type',
    ...initialSelection
  })

  const [currentTargets, setCurrentTargets] = useState<TargetOption[]>([])
  const [currentThemes, setCurrentThemes] = useState<ThemeOption[]>([])

  useEffect(() => {
    if (selectionState.typeId) {
      const compatibleTargets = TARGET_OPTIONS.filter(target => 
        target.compatibleTypes.includes(selectionState.typeId!)
      )
      setCurrentTargets(compatibleTargets)
    }
  }, [selectionState.typeId])

  useEffect(() => {
    if (selectionState.typeId && selectionState.targetId) {
      const compatibleThemes = THEME_OPTIONS.filter(theme =>
        theme.compatibleTypes.includes(selectionState.typeId!) &&
        theme.compatibleTargets.includes(selectionState.targetId!)
      )
      setCurrentThemes(compatibleThemes)
    }
  }, [selectionState.typeId, selectionState.targetId])

  useEffect(() => {
    onSelectionChange({
      typeId: selectionState.typeId || '',
      targetId: selectionState.targetId,
      themeId: selectionState.themeId,
      useKnowledgeBase: selectionState.useKnowledgeBase
    })
  }, [selectionState, onSelectionChange])

  const handleTypeSelect = (typeId: TypeID) => {
    setSelectionState(prev => ({
      ...prev,
      typeId,
      targetId: undefined,
      themeId: undefined,
      step: 'target'
    }))
  }

  const handleTargetSelect = (targetId: TargetID) => {
    setSelectionState(prev => ({
      ...prev,
      targetId,
      themeId: undefined,
      step: 'theme'
    }))
  }

  const handleThemeSelect = (themeId: ThemeID) => {
    setSelectionState(prev => ({
      ...prev,
      themeId,
      step: 'complete'
    }))
  }

  const handleKnowledgeBaseToggle = (enabled: boolean) => {
    setSelectionState(prev => ({
      ...prev,
      useKnowledgeBase: enabled,
      step: enabled ? 'type' : 'complete'
    }))
  }

  const handleBack = () => {
    switch (selectionState.step) {
      case 'target':
        setSelectionState(prev => ({ ...prev, step: 'type', targetId: undefined }))
        break
      case 'theme':
        setSelectionState(prev => ({ ...prev, step: 'target', themeId: undefined }))
        break
      case 'complete':
        setSelectionState(prev => ({ ...prev, step: 'theme' }))
        break
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <CardTitle>ナレッジベース生成</CardTitle>
            {selectionState.useKnowledgeBase && <Sparkles className="h-4 w-4 text-yellow-500" />}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">実証データベース活用</span>
            <Switch
              checked={selectionState.useKnowledgeBase}
              onCheckedChange={handleKnowledgeBaseToggle}
            />
          </div>
        </div>
        {selectionState.useKnowledgeBase && (
          <p className="text-sm text-gray-600">
            4つの投稿タイプから最適なアプローチを選択 → 各タイプ3ターゲットから詳細な読者層を特定
          </p>
        )}
      </CardHeader>

      {selectionState.useKnowledgeBase && (
        <CardContent className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-sm">
            <div className={`flex items-center gap-2 ${selectionState.step === 'type' ? 'text-blue-600 font-medium' : selectionState.typeId ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${selectionState.typeId ? 'bg-green-500 text-white' : selectionState.step === 'type' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>1</div>
              投稿タイプ
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className={`flex items-center gap-2 ${selectionState.step === 'target' ? 'text-blue-600 font-medium' : selectionState.targetId ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${selectionState.targetId ? 'bg-green-500 text-white' : selectionState.step === 'target' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>2</div>
              ターゲット
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className={`flex items-center gap-2 ${selectionState.step === 'theme' ? 'text-blue-600 font-medium' : selectionState.themeId ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${selectionState.themeId ? 'bg-green-500 text-white' : selectionState.step === 'theme' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>3</div>
              テーマ
            </div>
          </div>

          {/* Back Button */}
          {selectionState.step !== 'type' && (
            <Button variant="outline" size="sm" onClick={handleBack} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
          )}

          {/* Step 1: Type Selection */}
          {selectionState.step === 'type' && (
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Brain className="h-4 w-4" />
                投稿タイプを選択してください
              </h3>
              <p className="text-sm text-gray-600">
                コンテンツのアプローチ方法を決定します。各タイプに3つのターゲット読者層が設定されています。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TYPE_OPTIONS.map(option => (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${selectionState.typeId === option.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleTypeSelect(option.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                        <h4 className="font-medium text-sm">{option.name}</h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{option.description}</p>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {option.characteristics.map(char => (
                            <Badge key={char} variant="secondary" className="text-xs">{char}</Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">感情:論理比率 {option.emotionRatioRange}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Target Selection */}
          {selectionState.step === 'target' && (
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                ターゲットを選択してください
              </h3>
              <p className="text-sm text-gray-600">
                選択した投稿タイプに対応する{currentTargets.length}つのターゲット読者層から、最も適したものを選択してください。
              </p>
              <div className="grid grid-cols-1 gap-3">
                {currentTargets.map(option => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${selectionState.targetId === option.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleTargetSelect(option.id)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm mb-2">{option.name}</h4>
                      <p className="text-xs text-gray-600 mb-3">{option.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {option.characteristics.map(char => (
                          <Badge key={char} variant="outline" className="text-xs">{char}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Theme Selection */}
          {selectionState.step === 'theme' && (
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                テーマを選択してください
              </h3>
              <p className="text-sm text-gray-600">
                選択した投稿タイプとターゲットに対応する{currentThemes.length}つのテーマから、最適なアプローチを選択してください。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentThemes.map(option => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${selectionState.themeId === option.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleThemeSelect(option.id)}
                  >
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm mb-1">{option.name}</h4>
                      <p className="text-xs text-gray-600">{option.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Selection Summary */}
          {selectionState.step === 'complete' && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">選択完了</h3>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">投稿タイプ:</span> {TYPE_OPTIONS.find(t => t.id === selectionState.typeId)?.name}</div>
                <div><span className="font-medium">ターゲット:</span> {TARGET_OPTIONS.find(t => t.id === selectionState.targetId)?.name}</div>
                <div><span className="font-medium">テーマ:</span> {THEME_OPTIONS.find(t => t.id === selectionState.themeId)?.name}</div>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default KnowledgeBaseSelector