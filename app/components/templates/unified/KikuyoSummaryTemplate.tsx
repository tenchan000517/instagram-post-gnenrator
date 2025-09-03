import React from 'react'
import { cleanMarkdown } from '../TemplateTypes'
import { getT009DynamicFontClass } from '../../../utils/fontUtils'

interface KikuyoSummaryTemplateProps {
  data: KikuyoSummaryData
  targetId?: string
}

interface ActionStep {
  step: string
  description: string
}

interface KikuyoSummaryData {
  title: string
  subtitle: string
  summaryPoints: string[]
  actionSteps: ActionStep[]
  finalMessage: string
  databaseImage: string
  additionalInfo: string
}

// KIKUYO専用配色定義
const KIKUYO_COLORS = {
  primary: '#F59E0B',    // アンバー-500
  secondary: '#FCD34D',  // アンバー-300
  accent: '#D97706',     // アンバー-600
  background: '#FEF3C7', // アンバー-100
  text: '#1A1A1A'        // テキスト色
}

const KikuyoSummaryTemplate: React.FC<KikuyoSummaryTemplateProps> = ({ data, targetId }) => {
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
              backgroundColor: 'rgba(251, 191, 36, 0.15)', // 薄アンバー透過15%
              backgroundImage: `
                linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            <div className="space-y-1.5">
              {summaryPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <span 
                    className="font-bold mr-3 flex-shrink-0 text-lg" 
                    style={{
                      color: KIKUYO_COLORS.accent,
                      transform: 'translateY(-5px)'
                    }}
                  >
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
                src="/imag/template/KIKUYO_DATABASE.png"
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
                  className="bg-white p-4 shadow-md border-2 rounded-2xl"
                  style={{ borderColor: KIKUYO_COLORS.primary }}
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
export const kikuyoSummaryMetadata = {
  templateId: 'kikuyo_summary',
  name: 'KIKUYOまとめテンプレート',
  description: 'KIKUYO専用のまとめページテンプレート（データベース画像・行動ステップ付き）',
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
  colorScheme: KIKUYO_COLORS,
  targetTypes: ['T005'], // KIKUYOのターゲット
  usageNotes: [
    'まとめポイントと行動ステップの2カラム構成',
    'KIKUYO DATABASE画像表示エリア',
    'KIKUYOキャラクターの最終メッセージ',
    '装飾要素で統一感を演出'
  ]
}

export default KikuyoSummaryTemplate