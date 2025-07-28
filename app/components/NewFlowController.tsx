'use client'
import React, { useState } from 'react'
import { TemplateType, TemplateData } from './templates/TemplateTypes'
import { ContentLayoutService } from '../services/contentLayoutService'
import { TemplateRecommendationService } from '../services/templateRecommendationService'
import TemplateSelectionComponent from './TemplateSelectionComponent'
import PartialEditComponent from './PartialEditComponent'
import { templateComponents } from './templates'
import { CheckCircle, FileText, Layout, Edit3, Download, ArrowRight } from 'lucide-react'

interface NewFlowControllerProps {
  generatedContent: string
  fullGeneratedContent?: { postType?: string; targetId?: string } // BasicIntroTemplate用の動的情報
  onComplete: (finalData: { templateType: TemplateType; templateData: TemplateData }) => void
  onCancel: () => void
}

type FlowStep = 'template-selection' | 'layout-preview' | 'partial-edit' | 'final-preview'

export default function NewFlowController({
  generatedContent,
  fullGeneratedContent,
  onComplete,
  onCancel
}: NewFlowControllerProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('template-selection')
  const [selectedTemplateType, setSelectedTemplateType] = useState<TemplateType | null>(null)
  const [layoutedData, setLayoutedData] = useState<TemplateData | null>(null)
  const [finalData, setFinalData] = useState<TemplateData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // ステップ2: テンプレート選択後の処理
  const handleTemplateSelection = async (templateType: TemplateType) => {
    setIsProcessing(true)
    setSelectedTemplateType(templateType)
    
    try {
      // AIによるコンテンツ配置（改変なし）
      const layoutResult = ContentLayoutService.layoutContentToTemplate(
        generatedContent,
        templateType
      )
      
      if (layoutResult.layoutSuccess) {
        setLayoutedData(layoutResult.templateData)
        setCurrentStep('layout-preview')
      } else {
        alert('テンプレートへの配置に失敗しました: ' + layoutResult.layoutNotes.join(', '))
      }
    } catch (error) {
      console.error('Layout failed:', error)
      alert('テンプレートへの配置中にエラーが発生しました')
    } finally {
      setIsProcessing(false)
    }
  }

  // ステップ3: レイアウト結果の確認
  const handleLayoutConfirm = () => {
    setCurrentStep('partial-edit')
  }

  // ステップ4: 部分編集の保存
  const handlePartialEditSave = (updatedData: TemplateData) => {
    setFinalData(updatedData)
    setCurrentStep('final-preview')
  }

  // ステップ5: 最終確認と完了
  const handleFinalComplete = () => {
    if (selectedTemplateType && finalData) {
      onComplete({
        templateType: selectedTemplateType,
        templateData: finalData
      })
    }
  }

  // ステップ表示
  const renderStepIndicator = () => {
    const steps = [
      { key: 'template-selection', label: 'テンプレート選択', icon: Layout },
      { key: 'layout-preview', label: 'レイアウト確認', icon: FileText },
      { key: 'partial-edit', label: '部分編集', icon: Edit3 },
      { key: 'final-preview', label: '最終確認', icon: CheckCircle }
    ]

    return (
      <div className="mb-8 bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === step.key
            const isCompleted = steps.findIndex(s => s.key === currentStep) > index
            const Icon = step.icon
            
            return (
              <div key={step.key} className="flex items-center">
                <div className={`flex items-center space-x-2 ${
                  isActive ? 'text-find-blue' : 
                  isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-find-blue text-white' :
                    isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 mx-4 text-gray-300" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ローディング画面
  if (isProcessing) {
    return (
      <div className="post-preview">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-find-blue"></div>
          <span className="ml-4 text-gray-600">コンテンツを配置中...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {renderStepIndicator()}

      {/* ステップ1: テンプレート選択 */}
      {currentStep === 'template-selection' && (
        <TemplateSelectionComponent
          content={generatedContent}
          onTemplateSelect={handleTemplateSelection}
          onCancel={onCancel}
        />
      )}

      {/* ステップ2: レイアウト確認 */}
      {currentStep === 'layout-preview' && selectedTemplateType && layoutedData && (
        <div className="post-preview">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              📱 レイアウト確認
            </h2>
            <p className="text-gray-600">
              AIがコンテンツを配置しました。内容を確認してください。
            </p>
          </div>

          {/* レイアウト結果の表示 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* プレビュー */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">プレビュー</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                {React.createElement(templateComponents[selectedTemplateType], {
                  data: layoutedData,
                  ...(selectedTemplateType === 'basic_intro' ? {
                    postType: fullGeneratedContent?.postType || '001',
                    targetId: fullGeneratedContent?.targetId || 'T001'
                  } : {})
                })}
              </div>
            </div>

            {/* 配置データ詳細 */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">配置データ</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>テンプレート:</strong> {selectedTemplateType}
                </div>
                <div>
                  <strong>タイトル:</strong> {layoutedData.title}
                </div>
                {layoutedData.badgeText && (
                  <div>
                    <strong>バッジ:</strong> {layoutedData.badgeText}
                  </div>
                )}
                {layoutedData.subtitle && (
                  <div>
                    <strong>サブタイトル:</strong> {layoutedData.subtitle}
                  </div>
                )}
                {layoutedData.items && (
                  <div>
                    <strong>項目数:</strong> {layoutedData.items.length}個
                  </div>
                )}
                {layoutedData.content && (
                  <div>
                    <strong>コンテンツ:</strong> {layoutedData.content.substring(0, 100)}...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep('template-selection')}
              className="btn-secondary"
            >
              テンプレートを変更
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setFinalData(layoutedData)
                  setCurrentStep('final-preview')
                }}
                className="btn-secondary"
              >
                このまま完了
              </button>
              <button
                onClick={handleLayoutConfirm}
                className="btn-primary"
              >
                編集して調整
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ステップ3: 部分編集 */}
      {currentStep === 'partial-edit' && selectedTemplateType && layoutedData && (
        <PartialEditComponent
          templateType={selectedTemplateType}
          templateData={layoutedData}
          onSave={handlePartialEditSave}
          onCancel={() => setCurrentStep('layout-preview')}
        />
      )}

      {/* ステップ4: 最終確認 */}
      {currentStep === 'final-preview' && selectedTemplateType && finalData && (
        <div className="post-preview">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              最終確認
            </h2>
            <p className="text-gray-600">
              完成したコンテンツを確認してください。
            </p>
          </div>

          {/* 最終プレビュー */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3">最終プレビュー</h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              {React.createElement(templateComponents[selectedTemplateType], {
                data: finalData,
                ...(selectedTemplateType === 'basic_intro' ? {
                  postType: fullGeneratedContent?.postType || '001',
                  targetId: fullGeneratedContent?.targetId || 'T001'
                } : {})
              })}
            </div>
          </div>

          {/* 変更履歴 */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">✅ 処理完了</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <div>• コンテンツを{selectedTemplateType}テンプレートに配置</div>
              <div>• 部分編集により最適化</div>
              <div>• 高品質なInstagram投稿が完成</div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep('partial-edit')}
              className="btn-secondary"
            >
              再編集
            </button>
            
            <button
              onClick={handleFinalComplete}
              className="btn-primary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>完了・ダウンロード</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}