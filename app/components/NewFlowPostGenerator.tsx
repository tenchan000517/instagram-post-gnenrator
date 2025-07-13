'use client'

import { useState } from 'react'
import { Sparkles, CheckCircle, RotateCcw, Settings } from 'lucide-react'
import ContentInput from './ContentInput'
import ContentApprovalComponent from './ContentApprovalComponent'
import EditablePostGenerator from './EditablePostGenerator'
import { contentGeneratorService, GeneratedContent } from '../services/contentGeneratorService'
// PureStructureMatchingService削除 - PageStructureAnalyzerの選択を信頼

type FlowStep = 'input' | 'generation' | 'approval' | 'editing' | 'final'

interface NewFlowPostGeneratorProps {
  // Props removed - component handles its own reset
}

export default function NewFlowPostGenerator({}: NewFlowPostGeneratorProps) {
  const [currentStep, setCurrentStep] = useState<FlowStep>('input')
  const [inputContent, setInputContent] = useState('')
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStatus, setGenerationStatus] = useState('')

  const handleReset = () => {
    setCurrentStep('input')
    setInputContent('')
    setGeneratedContent(null)
    setIsGenerating(false)
    setGenerationStatus('')
  }

  const handleContentSubmit = async (content: string) => {
    setInputContent(content)
    setCurrentStep('generation')
    setIsGenerating(true)
    setGenerationStatus('AIが高品質なコンテンツを生成中...')

    try {
      const generated = await contentGeneratorService.generateHighQualityContent(content)
      
      // 🎯 高品質コンテンツ生成データをコンソールに出力
      console.log('='.repeat(60))
      console.log('🎨 高品質コンテンツ生成成功 - 生のデータ')
      console.log('='.repeat(60))
      console.log('生成されたコンテンツ:', JSON.stringify(generated, null, 2))
      console.log('='.repeat(60))
      
      // PureStructureMatchingServiceを削除 - PageStructureAnalyzerの選択を信頼
      setGeneratedContent(generated)
      setCurrentStep('approval')
    } catch (error) {
      console.error('Content generation failed:', error)
      alert('コンテンツの生成に失敗しました。もう一度お試しください。')
      setCurrentStep('input')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleContentApproval = (content: GeneratedContent) => {
    setGeneratedContent(content)
    setCurrentStep('editing')
  }

  const handleContentRejection = () => {
    setCurrentStep('input')
    setGeneratedContent(null)
  }

  const handleContentUpdate = (content: GeneratedContent) => {
    setGeneratedContent(content)
  }

  const handleSave = (content: GeneratedContent) => {
    setGeneratedContent(content)
    setCurrentStep('final')
  }

  const renderStepIndicator = () => {
    const steps = [
      { id: 'input', label: '入力', icon: '📝' },
      { id: 'generation', label: 'AI生成', icon: '🤖' },
      { id: 'approval', label: '承認', icon: '✅' },
      { id: 'editing', label: '編集', icon: '🎨' },
      { id: 'final', label: '完了', icon: '🎯' }
    ]

    const currentStepIndex = steps.findIndex(step => step.id === currentStep)

    return (
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-800">Instagram投稿生成</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    index <= currentStepIndex 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStepIndex ? (
                      <CheckCircle size={20} />
                    ) : (
                      <span className="text-sm">{step.icon}</span>
                    )}
                  </div>
                  <span className={`ml-2 text-sm ${
                    index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      index < currentStepIndex ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            {currentStep !== 'input' && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
              >
                <RotateCcw size={16} />
                最初から開始
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'input':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Instagram投稿生成 - 新しいフロー
                </h2>
                <p className="text-gray-600">
                  AIが高品質なコンテンツを生成し、最適なテンプレートを自動選択します
                </p>
              </div>
              <ContentInput onSubmit={handleContentSubmit} />
            </div>
          </div>
        )

      case 'generation':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-sm p-12">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">AIがコンテンツを生成中...</h3>
                <p className="text-gray-600 mb-4">{generationStatus}</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 高品質で実践的なコンテンツを生成しています。数分かかる場合があります。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'approval':
        return generatedContent ? (
          <ContentApprovalComponent
            generatedContent={generatedContent}
            onApprove={handleContentApproval}
            onReject={handleContentRejection}
            onContentUpdate={handleContentUpdate}
            mainTheme={inputContent.split('\n')[0] || 'コンテンツ'}
          />
        ) : null

      case 'editing':
        return generatedContent ? (
          <EditablePostGenerator
            generatedContent={generatedContent}
            onBack={() => setCurrentStep('approval')}
            onSave={handleSave}
            mainTheme={inputContent.split('\n')[0] || 'コンテンツ'}
          />
        ) : null

      case 'final':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-sm p-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  投稿が完成しました！
                </h3>
                <p className="text-gray-600 mb-6">
                  {generatedContent?.pages.length}ページのInstagram投稿が正常に生成されました。
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setCurrentStep('editing')}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Settings size={20} />
                    編集に戻る
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    <Sparkles size={20} />
                    新しい投稿を作成
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {renderStepIndicator()}
      {renderCurrentStep()}
    </div>
  )
}