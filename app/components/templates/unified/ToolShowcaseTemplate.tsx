import React from 'react'
import { cleanMarkdown } from '../TemplateTypes'
import { getT009DynamicFontClass } from '../../../utils/fontUtils'
import TextWithLineBreaks from '../../common/TextWithLineBreaks'

// ===== 型定義 =====
interface ToolShowcaseTemplateProps {
  data: ToolShowcaseData
  targetId?: string
}

interface Tool {
  position: number
  name: string
  category: string
  primaryScore: string
  highlight: string
  icon: string
}

interface ToolShowcaseData {
  title: string
  subtitle: string
  displayType: string
  tools: Tool[]
  evaluationNote: string
  tenComment: string
}

// ===== 定数定義 =====
// TEN専用配色定義
const TEN_COLORS = {
  primary: '#2D5016',    // メイン緑
  secondary: '#4A7C2A',  // セカンダリ緑
  accent: '#6B9F3E',     // アクセント緑
  background: '#F8FBF4', // 背景色
  text: '#1A1A1A'        // テキスト色
}

// グリッド設定
const GRID_CONFIG = {
  columns: 5,
  maxTools: 10,
  toolImageSize: 'w-24 h-24',
  gridGap: 'gap-2',
  gridPadding: 'p-4'
}

// スタイル設定
const STYLES = {
  container: 'w-full max-w-4xl mx-auto px-16 py-4',
  mainCard: 'bg-white shadow-lg p-2',
  titleSection: 'text-center mb-10',
  dividerLine: 'h-0.5 bg-indigo-400 w-full',
  title: 'text-4xl font-bold text-gray-800',
  gridContainer: 'mb-3',
  gridBackground: {
    backgroundColor: 'rgba(139, 69, 196, 0.05)',
    backgroundImage: `linear-gradient(rgba(128,128,128,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.1) 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
    borderRadius: '12px'
  },
  toolCard: 'bg-white rounded-lg shadow-sm border border-gray-200 py-1 px-0 flex flex-col items-center text-center hover:shadow-md transition-shadow',
  toolImage: 'bg-gray-50 rounded-lg flex items-center justify-center mt-2 mx-2 overflow-hidden',
  toolName: 'text-gray-800 text-sm font-bold mb-2'
}

// コメントボックス設定
const COMMENT_BOX_STYLES = {
  container: 'mt-0.5 rounded-lg p-1',
  flexContainer: 'w-full flex flex-row gap-6 items-center',
  textSection: 'w-3/4 flex flex-col justify-center',
  shadowBox: 'absolute bg-indigo-400 rounded-sm w-full h-full',
  mainBox: 'relative bg-white p-4 shadow-md border-2 border-indigo-400 rounded-sm',
  characterSpace: 'w-1/4 h-52',
  shadowOffset: 'translate(6px, 6px)'
}

// ===== コンポーネント関数群 =====
/**
 * ツールカードを生成するコンポーネント
 */
const ToolCard: React.FC<{ tool: Tool; index: number; dynamicFontClass: string }> = ({ tool, index, dynamicFontClass }) => (
  <div key={index} className={STYLES.toolCard}>
    {/* ツール画像エリア */}
    <div className={`${GRID_CONFIG.toolImageSize} ${STYLES.toolImage}`}>
      {tool.icon ? (
        <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain" />
      ) : (
        <div className="w-22 h-22 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
          {tool.name.substring(0, 2)}
        </div>
      )}
    </div>
    
    {/* ツール名 */}
    <h3 className={`${STYLES.toolName} ${dynamicFontClass}`}>
      {cleanMarkdown(tool.name)}
    </h3>
  </div>
)

/**
 * タイトルセクションコンポーネント
 */
const TitleSection: React.FC<{ title: string; dynamicFontClass: string }> = ({ title, dynamicFontClass }) => (
  <div className={STYLES.titleSection}>
    <div className={`${STYLES.dividerLine} mb-6`}></div>
    <h1 className={`${STYLES.title} mb-6 ${dynamicFontClass}`}>
      {cleanMarkdown(title)}
    </h1>
    <div className={`${STYLES.dividerLine} mt-12`}></div>
  </div>
)

/**
 * ツールグリッドセクションコンポーネント
 */
const ToolGridSection: React.FC<{ tools: Tool[]; dynamicFontClass: string }> = ({ tools, dynamicFontClass }) => (
  <div className={STYLES.gridContainer}>
    <div 
      className={`grid grid-cols-5 ${GRID_CONFIG.gridGap} ${GRID_CONFIG.gridPadding}`}
      style={STYLES.gridBackground}
    >
      {tools.slice(0, GRID_CONFIG.maxTools).map((tool, index) => (
        <ToolCard 
          key={index}
          tool={tool} 
          index={index} 
          dynamicFontClass={dynamicFontClass} 
        />
      ))}
    </div>
  </div>
)

/**
 * TENコメントボックスコンポーネント
 */
const TenCommentBox: React.FC<{ tenComment: string; dynamicFontClass: string }> = ({ tenComment, dynamicFontClass }) => (
  <div className={COMMENT_BOX_STYLES.container}>
    <div className={COMMENT_BOX_STYLES.flexContainer}>
      {/* TENキャラクター配置用空白スペース（左側） */}
      <div className={COMMENT_BOX_STYLES.characterSpace}>
        {/* CANVAでキャラクター画像を後から配置 */}
      </div>

      {/* テキストセクション（右側） */}
      <div className={COMMENT_BOX_STYLES.textSection}>
        <div className="relative mr-2">
          {/* 後ろの四角（インディゴ・ハイライト） */}
          <div 
            className={COMMENT_BOX_STYLES.shadowBox}
            style={{ transform: COMMENT_BOX_STYLES.shadowOffset }}
          ></div>
          {/* 前の四角（メインコンテンツ） */}
          <div className={COMMENT_BOX_STYLES.mainBox}>
            <TextWithLineBreaks 
              text={tenComment}
              className={`text-gray-700 leading-relaxed mb-2 font-bold ${dynamicFontClass}`}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

// ===== メインコンポーネント =====
const ToolShowcaseTemplate: React.FC<ToolShowcaseTemplateProps> = ({ data, targetId }) => {
  // データ抽出
  const { title, tools = [], tenComment } = data
  const dynamicFontClass = getT009DynamicFontClass(targetId)

  return (
    <div className={STYLES.container}>
      <div className={STYLES.mainCard}>
        {/* タイトルセクション */}
        <TitleSection title={title} dynamicFontClass={dynamicFontClass} />
        
        {/* ツールグリッドセクション */}
        <ToolGridSection tools={tools} dynamicFontClass={dynamicFontClass} />
        
        {/* TENコメントセクション */}
        {tenComment && (
          <TenCommentBox tenComment={tenComment} dynamicFontClass={dynamicFontClass} />
        )}
      </div>
    </div>
  )
}

// メタデータ
export const toolShowcaseMetadata = {
  templateId: 'tool_showcase',
  name: 'ツールショーケーステンプレート',
  description: 'TEN専用のツール一覧表示テンプレート（ランキング表示なし）',
  category: 'showcase',
  dataStructure: {
    title: 'string',
    subtitle: 'string',
    displayType: 'string',
    tools: [{
      position: 'number',
      name: 'string',
      category: 'string',
      primaryScore: 'string',
      highlight: 'string',
      icon: 'string'
    }],
    evaluationNote: 'string',
    tenComment: 'string'
  },
  colorScheme: TEN_COLORS,
  targetTypes: ['T004'],
  usageNotes: [
    'ランキング形式ではなく、ツール紹介重視',
    'アイコンとスコアで視覚的に訴求',
    'TENキャラクターのコメント欄あり',
    'ポジションに応じた色分け'
  ]
}

export default ToolShowcaseTemplate