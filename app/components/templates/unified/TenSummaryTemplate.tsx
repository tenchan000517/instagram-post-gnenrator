import React from 'react'
import { cleanMarkdown } from '../TemplateTypes'
import { getT009DynamicFontClass } from '../../../utils/fontUtils'

interface TenSummaryTemplateProps {
  data: TenSummaryData
  targetId?: string
}

interface ActionStep {
  step: string
  description: string
}

interface TenSummaryData {
  title: string
  subtitle: string
  summaryPoints: string[]
  actionSteps: ActionStep[]
  finalMessage: string
  databaseImage: string
  additionalInfo: string
}

// TEN専用配色定義
const TEN_COLORS = {
  primary: '#2D5016',
  secondary: '#4A7C2A',
  accent: '#6B9F3E',
  background: '#F8FBF4',
  text: '#1A1A1A'
}

const TenSummaryTemplate: React.FC<TenSummaryTemplateProps> = ({ data, targetId }) => {
  const {
    summaryPoints = [],
    finalMessage
  } = data

  const dynamicFontClass = getT009DynamicFontClass(targetId)

  return (
    <div className="w-full max-w-3xl mx-auto px-16 py-4">
      <div className="w-auto mx-auto" style={{ width: 'fit-content' }}>
        <div className="bg-white shadow-lg p-2">

        {/* まとめポイント */}
        <div className="mb-3 flex justify-center">
          <div 
            className="w-4/5 p-6 border border-gray-200 rounded-2xl shadow-md"
            style={{
              backgroundColor: 'rgba(139, 69, 196, 0.1)',
              backgroundImage: `
                linear-gradient(rgba(128,128,128,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(128,128,128,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            <div className="space-y-1.5">
              {summaryPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-blue-600 font-bold mr-3 flex-shrink-0 text-lg" style={{transform: 'translateY(-5px)'}}>
                    {index + 1}.
                  </span>
                  <p className={`text-gray-700 text-base font-semibold ${dynamicFontClass}`} style={{lineHeight: '1.1', margin: 0, padding: 0}}>
                    {cleanMarkdown(point)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* データベース画像セクション */}
        <div className="mb-0">
          <div className="w-full">
            <div className="bg-gray-50 p-2 rounded-md">
              <img
                src="/imag/template/TEN_DATABASE.png"
                alt=""
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* 最終メッセージ（2カラム+キャラクター） */}
        {finalMessage && (
          <div className="mt-0 rounded-lg p-1 flex justify-center">
            <div className="w-4/5 flex flex-row gap-6 items-center">
              {/* キャラクター配置用空白スペース（左側） */}
              <div className="w-1/4 h-32">
                {/* CANVAでキャラクター画像を後から配置 */}
              </div>

              {/* テキストセクション（右側） */}
              <div className="w-3/4 flex flex-col justify-center">
                <div 
                  className="bg-white p-4 shadow-md border-2 border-indigo-400 rounded-2xl"
                >
                  <p className={`text-gray-700 leading-relaxed mb-2 font-bold ${dynamicFontClass}`}>
                    {cleanMarkdown(finalMessage)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  )
}

// メタデータ
export const tenSummaryMetadata = {
  templateId: 'ten_summary',
  name: 'TENまとめテンプレート',
  description: 'TEN専用のまとめページテンプレート（データベース画像・行動ステップ付き）',
  category: 'summary',
  dataStructure: {
    title: 'string',
    subtitle: 'string',
    summaryPoints: 'string[]',
    actionSteps: [{
      step: 'string',
      description: 'string'
    }],
    finalMessage: 'string',
    databaseImage: 'string',
    additionalInfo: 'string'
  },
  colorScheme: TEN_COLORS,
  targetTypes: ['T004'],
  usageNotes: [
    'まとめポイントと行動ステップの2カラム構成',
    'TEN DATABASE画像表示エリア',
    'TENキャラクターの最終メッセージ',
    '装飾要素で統一感を演出'
  ]
}

export default TenSummaryTemplate