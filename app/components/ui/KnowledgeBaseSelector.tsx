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
    name: '共感・感情誘導型',
    description: '感情的共感から信頼関係を構築し、解決策を提示',
    emotionRatioRange: '40:60～85:15',
    characteristics: ['感情フック', 'ストーリー性', '共感誘導', '心理的サポート'],
    recommendedFor: ['不安解消', 'キャリア相談', '悩み共有', '励まし'],
    color: 'bg-pink-500'
  },
  {
    id: '002', 
    name: '教育・学習特化型',
    description: '体系的知識伝達による段階的スキル習得支援',
    emotionRatioRange: '15:85～30:70',
    characteristics: ['体系性', '段階的', '教育的', 'スキル習得支援'],
    recommendedFor: ['学習指導', 'ハウツー', '手法解説', 'スキルアップ'],
    color: 'bg-blue-500'
  },
  {
    id: '003',
    name: '情報提供・データ型', 
    description: '客観的データ・実証済み手法による確実な成果獲得支援',
    emotionRatioRange: '5:95～30:70',
    characteristics: ['客観性', 'データ重視', '比較可能性', '実証性'],
    recommendedFor: ['企業情報', 'ツール紹介', 'データ比較', '統計情報'],
    color: 'bg-green-500'
  },
  {
    id: '004',
    name: '効率・実用特化型',
    description: '感情共感+実用性の組み合わせによる効率的目標達成支援',
    emotionRatioRange: '25:75～50:50', 
    characteristics: ['効率性', '実用性', '即効性', '具体的成果'],
    recommendedFor: ['時短術', '効率化', '実践的手法', '問題解決'],
    color: 'bg-orange-500'
  }
]

const TARGET_OPTIONS: TargetOption[] = [
  {
    id: 'P001',
    name: '戦略的就活生',
    description: '効率的で根拠のある就活戦略を求める学生',
    compatibleTypes: ['001', '002', '003', '004'],
    characteristics: ['計画性', '効率重視', '根拠志向', '戦略的思考']
  },
  {
    id: 'P002', 
    name: '不安解消型就活生',
    description: '就活への不安を和らげ安心感を求める学生',
    compatibleTypes: ['001', '002', '004'],
    characteristics: ['不安感', '安心感欲求', '段階的習得', '丁寧な説明']
  },
  {
    id: 'P003',
    name: '実用主義就活生',
    description: '具体的で実用的な情報を重視する学生', 
    compatibleTypes: ['001', '003', '004'],
    characteristics: ['実用性重視', '具体性志向', '行動派', '結果重視']
  },
  {
    id: 'P004',
    name: '効率化志向ビジネスパーソン',
    description: '作業効率化と生産性向上を求める会社員',
    compatibleTypes: ['003', '004'],
    characteristics: ['効率性', '生産性', 'ツール志向', '時短重視']
  },
  {
    id: 'P005',
    name: 'スキル向上志向社会人',
    description: '継続的なスキルアップを目指す社会人',
    compatibleTypes: ['002', '003'],
    characteristics: ['学習志向', '成長欲求', '継続性', '専門性']
  }
]

const THEME_OPTIONS: ThemeOption[] = [
  { id: 'T001', name: '感情支援・心理ケア', description: '体験談共有・感情共感による心理的サポート', compatibleTypes: ['001', '002'], compatibleTargets: ['P001', 'P002'] },
  { id: 'T002', name: '体系教育・技能習得', description: '段階的教育・体系的スキル習得・方法論提供', compatibleTypes: ['002', '003'], compatibleTargets: ['P001', 'P003'] },
  { id: 'T003', name: '実績証明・権威活用', description: '数値実績・権威性・専門性による信頼構築', compatibleTypes: ['003'], compatibleTargets: ['P001', 'P003'] },
  { id: 'T004', name: '情報提供・選択支援', description: '客観的情報提供・比較可能な選択肢の提示', compatibleTypes: ['002', '003'], compatibleTargets: ['P001', 'P002', 'P003'] },
  { id: 'T005', name: '戦略設計・最適化', description: '戦略的計画・継続的最適化・長期的成功実現', compatibleTypes: ['002', '003'], compatibleTargets: ['P001', 'P005'] },
  { id: 'T006', name: '現実対応・問題解決', description: '現実的課題・具体的問題の即効解決', compatibleTypes: ['001', '002', '003'], compatibleTargets: ['P001', 'P002', 'P003', 'P005'] },
  { id: 'T007', name: 'サービス活用・行動促進', description: 'サービス利用促進・行動喚起・CTA設計', compatibleTypes: ['001', '004'], compatibleTargets: ['P003', 'P005'] }
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
            12投稿の分析結果から最適なパターンを適用します
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