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
}

interface SectionBlocksData extends TemplateData {
  title: string;
  sections: SectionBlock[];
  characterImage?: string;
  characterPosition?: 'left' | 'right';
}

export function SectionBlocksTemplate({ data }: SectionBlocksTemplateProps) {
  const sectionData = data as SectionBlocksData
  const { title, sections = [], characterImage, characterPosition = 'right' } = sectionData

  // コンテンツ表示コンポーネント（description or list 対応）
  const ContentDisplay = ({ content }: { content: string | string[] }) => {
    if (Array.isArray(content)) {
      return (
        <ul className="space-y-2">
          {content.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">
                {cleanMarkdown(item)}
              </span>
            </li>
          ))}
        </ul>
      );
    }
    
    return (
      <p className="text-gray-700 leading-relaxed">
        {cleanMarkdown(content)}
      </p>
    );
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* メインコンテンツ */}
      <div className="p-8 h-full flex flex-col">
        {/* タイトル */}
        {title && (
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {cleanMarkdown(title)}
            </h1>
          </div>
        )}

        {/* セクションブロック */}
        <div className="flex-1 space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              {/* セクションヘッダー */}
              <div className="flex items-center gap-3">
                <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <h2 className="text-xl font-bold text-gray-800">
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
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 ml-11">
                <ContentDisplay content={section.content} />
              </div>

              {/* セクション下テキスト（オプショナル） */}
              {section.footerText && (
                <div className="ml-11">
                  <p className="text-sm text-gray-600 italic">
                    {cleanMarkdown(section.footerText)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 下部2カラムセクション（キャラクター付き） */}
        {characterImage && (
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center ${
              characterPosition === 'left' ? '' : 'md:grid-flow-col-dense'
            }`}>
              {/* テキストセクション */}
              <div className={characterPosition === 'left' ? 'md:col-start-2' : ''}>
                {data.bottomSectionName && (
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {cleanMarkdown(data.bottomSectionName)}
                  </h3>
                )}
                {data.bottomSectionContent && (
                  <ContentDisplay content={data.bottomSectionContent} />
                )}
              </div>

              {/* キャラクター画像 */}
              <div className={`flex justify-center ${characterPosition === 'left' ? 'md:col-start-1' : ''}`}>
                <div className="w-48 h-48 relative bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
                  <Image
                    src={characterImage}
                    alt="キャラクター"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
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