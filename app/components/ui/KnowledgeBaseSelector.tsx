/**
 * ナレッジベース選択コンポーネント
 * Type → Target → Theme の3段階選択UI
 * マスターテーブル参照版
 */

'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'
import { TypeID, TargetID, SelectionState, KnowledgeBaseParams } from '../../types/knowledgeBase'
import { Brain, Target, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import { MasterDataService } from '../../services/knowledgeBase/MasterDataService'
import uiNames from '../../data/knowledgeBase/ui-names.json'

interface TypeOption {
  id: TypeID
  name: string
}

interface TargetOption {
  id: TargetID
  name: string
}


// マスターテーブルから動的生成
const getTypeOptions = (): TypeOption[] => {
  return Object.entries(uiNames.types).map(([id, name]) => ({
    id: id as TypeID,
    name
  }))
}

// マスターテーブルから動的生成
const getTargetOptionsForType = (typeId: string): TargetOption[] => {
  const targetIds = MasterDataService.getTargetsForType(typeId)
  return targetIds.map(targetId => ({
    id: targetId as TargetID,
    name: uiNames.targets[targetId as keyof typeof uiNames.targets]
  }))
}


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
  const [currentPersonas, setCurrentPersonas] = useState<string[]>([])

  useEffect(() => {
    if (selectionState.typeId) {
      // マスターテーブルからターゲットを取得
      const compatibleTargets = getTargetOptionsForType(selectionState.typeId)
      setCurrentTargets(compatibleTargets)
    }
  }, [selectionState.typeId])

  useEffect(() => {
    if (selectionState.targetId) {
      // ターゲット選択時に紐づくペルソナIDを全て取得
      const personas = MasterDataService.getPersonasForTarget(selectionState.targetId)
      setCurrentPersonas(personas)
      console.log(`✅ ターゲット ${selectionState.targetId} に紐づくペルソナID:`, personas)
    } else {
      setCurrentPersonas([])
    }
  }, [selectionState.targetId])


  useEffect(() => {
    onSelectionChange({
      typeId: selectionState.typeId || '',
      targetId: selectionState.targetId,
      personaIds: currentPersonas,
      useKnowledgeBase: selectionState.useKnowledgeBase
    })
  }, [selectionState, currentPersonas, onSelectionChange])

  const handleTypeSelect = (typeId: TypeID) => {
    setSelectionState(prev => ({
      ...prev,
      typeId,
      targetId: undefined,
      step: 'target'
    }))
  }

  const handleTargetSelect = (targetId: TargetID) => {
    setSelectionState(prev => ({
      ...prev,
      targetId,
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
      case 'complete':
        setSelectionState(prev => ({ ...prev, step: 'target' }))
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
          <div className="flex items-center justify-center text-sm">
            <div className={`flex items-center gap-2 ${selectionState.step === 'type' ? 'text-blue-600 font-medium' : selectionState.typeId ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${selectionState.typeId ? 'bg-green-500 text-white' : selectionState.step === 'type' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>1</div>
              投稿タイプ
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400 mx-4" />
            <div className={`flex items-center gap-2 ${selectionState.step === 'target' ? 'text-blue-600 font-medium' : selectionState.targetId ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${selectionState.targetId ? 'bg-green-500 text-white' : selectionState.step === 'target' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>2</div>
              ターゲット
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
                {getTypeOptions().map(option => (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${selectionState.typeId === option.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleTypeSelect(option.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-sm">{option.name}</h4>
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
                <div><span className="font-medium">投稿タイプ:</span> {uiNames.types[selectionState.typeId as keyof typeof uiNames.types]} ({selectionState.typeId})</div>
                <div><span className="font-medium">ターゲット:</span> {selectionState.targetId ? uiNames.targets[selectionState.targetId as keyof typeof uiNames.targets] : ''} ({selectionState.targetId})</div>
                <div><span className="font-medium">紐づくペルソナID:</span> {currentPersonas.length > 0 ? currentPersonas.join(', ') : '取得中...'}</div>
                <div className="text-xs text-gray-500 mt-2">
                  このターゲットには{currentPersonas.length}個のペルソナが紐づいています
                </div>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

export default KnowledgeBaseSelector