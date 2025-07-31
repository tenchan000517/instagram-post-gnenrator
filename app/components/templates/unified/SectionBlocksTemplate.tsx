import React from 'react'
import Image from 'next/image'
import { TemplateData, cleanMarkdown } from '../TemplateTypes'
import { Check } from 'lucide-react'

interface SectionBlocksTemplateProps {
  data: TemplateData
}

interface SectionBlock {
  name: string;
  content: string | string[];
  image?: string;
  footerText?: string;
}

interface SectionBlocksData extends TemplateData {
  title: string;
  sections: SectionBlock[];
  characterImage?: string;
  characterPosition?: 'left' | 'right';
}

export function SectionBlocksTemplate({ data }: SectionBlocksTemplateProps) {
  const sectionData = data as SectionBlocksData
  const { title, sections = [], characterImage, characterPosition = 'right', imageSrc } = sectionData
  
  // 画像パスの優先度: imageSrc > characterImage （デフォルト表示なし）
  const rawImagePath = imageSrc || characterImage
  
  // 画像パスの正規化（相対パス→絶対パス、不正URL除外）
  const normalizeImagePath = (path: string | undefined): string | null => {
    if (!path) return null
    
    // 外部URLをブロック
    if (path.includes('http://') || path.includes('https://')) {
      console.warn('🚫 外部URL画像をブロック:', path)
      return null
    }
    
    // 相対パスを絶対パスに変換
    if (path && !path.startsWith('/')) {
      return `/${path}`
    }
    
    return path
  }
  
  const finalCharacterImage = normalizeImagePath(rawImagePath)
  const shouldShowImage = !!finalCharacterImage

  // コンテンツ表示コンポーネント（description or list 対応）
  const ContentDisplay = ({ content }: { content: string | string[] }) => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700 font-semibold leading-relaxed">
                {cleanMarkdown(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    
    return (
      <p className="text-gray-700 font-semibold leading-relaxed">
        {cleanMarkdown(content)}
      </p>
    );
  };

  return (
    <div className="w-full h-full bg-white relative overflow-hidden">
      {/* ヘッダー */}
      {title && (
        <div className="px-8 py-6 relative">
          <h1 className="text-3xl font-bold text-black text-center leading-tight">
            {cleanMarkdown(title)}
          </h1>
          <div className="flex justify-center mt-8">
            <div className="w-3/4 border-b-2 border-dashed border-gray-400"></div>
          </div>
        </div>
      )}

      {/* メインコンテンツ */}
      <div className="p-8 flex flex-col">

        {/* セクションブロック */}
        <div className="flex-1 space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              {/* セクションヘッダー */}
              <div className="mb-3">
                <h2 className="text-2xl font-bold text-gray-800">
                  {cleanMarkdown(section.name)}
                </h2>
              </div>

              {/* セクション画像（オプショナル） */}
              {section.image && (
                <div className="flex justify-center mb-3">
                  <div className="w-32 h-32 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src={section.image}
                      alt={`${section.name}の画像`}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* セクションコンテンツボックス */}
              <div 
                className="bg-blue-50 p-4 shadow-sm border border-gray-200"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(150, 150, 150, 0.25) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(150, 150, 150, 0.25) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              >
                <ContentDisplay content={section.content} />
              </div>

              {/* セクション下テキスト（オプショナル） */}
              {section.footerText && (
                <div>
                  <p className="text-base text-gray-600 italic">
                    {cleanMarkdown(section.footerText)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 下部2カラムセクション（キャラクター付き） */}
        {characterImage && (
          <div className="mt-8 rounded-lg p-6">
            <div className={`flex ${characterPosition === 'left' ? 'flex-row-reverse' : 'flex-row'} gap-6 items-center`}>
              {/* テキストセクション */}
              <div className="flex-1 flex flex-col justify-center">
                <div 
                  className="bg-green-50 p-4 shadow-sm border border-gray-200"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(150, 150, 150, 0.25) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(150, 150, 150, 0.25) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                >
                  {data.bottomSectionName && (
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {cleanMarkdown(data.bottomSectionName)}
                    </h3>
                  )}
                  {data.bottomSectionContent && (
                    <ContentDisplay content={data.bottomSectionContent} />
                  )}
                </div>
              </div>

              {/* キャラクター画像（指定がある場合のみ表示） */}
              {shouldShowImage && (
                <div className="h-48 relative rounded-lg flex items-center justify-center overflow-hidden" style={{ width: 'auto' }}>
                  <img
                    src={finalCharacterImage}
                    alt="キャラクター"
                    className="h-full w-auto object-contain rounded-lg"
                    style={{ width: 'auto', height: '100%' }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* フォールバック: セクションがない場合 */}
        {sections.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-lg">表示するセクションがありません</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// メタデータ
export const sectionBlocksMetadata = {
  id: 'section_blocks',
  name: 'セクションブロック型',
  description: 'セクション名+コンテンツボックスの組み合わせ、下部2カラム+キャラクター対応テンプレート',
  suitableFor: {
    contentTypes: ['ステップ解説', 'セクション分割', '段階的説明', 'キャラクター付き解説'],
    genres: ['ナレッジ系', 'ノウハウ系', '教育系'],
    dataStructure: ['セクション構造', '段階説明', 'キャラクター連携'],
    complexity: 'complex' as const,
    pageCount: { min: 1, max: 8 }
  },
  characterLimits: {
    title: 40,
    sectionName: 30,
    sectionContent: 200,
    bottomSectionContent: 150
  },
  keywords: ['セクション', 'ブロック', 'ステップ', 'キャラクター', '段階', '解説']
}