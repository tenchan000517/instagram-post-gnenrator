'use client'

import { useState } from 'react'
import { 
  PostSlide, 
  Illustrations,
  TableTemplate,
  ChecklistTemplate,
  LabeledListTemplate,
  PointExplanationTemplate,
  HybridTemplate
} from './InstagramPostTemplate'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselSlide {
  title: string
  highlight?: string
  content: any
  illustration?: any
  number?: number
  subText?: string
  ctaButton?: {
    text: string
    action?: () => void
  }
  templateType?: 'table' | 'checklist' | 'labeled-list' | 'point-explanation' | 'hybrid' | 'standard'
  templateData?: any
}

export default function CarouselPostGenerator({ 
  slides,
  strategy 
}: { 
  slides: CarouselSlide[]
  strategy: string 
}) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // FIND to DO向けのサンプルカルーセル投稿
  const sampleSlides: CarouselSlide[] = [
    {
      title: "就活で後悔する学生の共通点",
      highlight: "1つでも当てはまったら要注意⚠️",
      illustration: Illustrations.teamWork,
      content: (
        <div>
          <p className="mb-4">実は多くの学生が</p>
          <p className="text-3xl">同じ失敗をしています...</p>
        </div>
      ),
      subText: "次のスライドで詳しく解説します"
    },
    {
      title: "就活で後悔する学生の共通点",
      number: 1,
      content: (
        <div>
          <h3 className="text-3xl font-bold mb-4">実践経験がない</h3>
          <p className="text-2xl text-gray-600">
            面接で話せることがない...<br />
            理論だけでは説得力不足
          </p>
        </div>
      ),
      subText: "ガクチカに苦労する原因No.1"
    },
    {
      title: "就活で後悔する学生の共通点",
      number: 2,
      content: (
        <div>
          <h3 className="text-3xl font-bold mb-4">自分の強みがわからない</h3>
          <p className="text-2xl text-gray-600">
            自己PRが書けない...<br />
            他の学生との差別化ができない
          </p>
        </div>
      ),
      subText: "実践を通じて強みを発見しよう"
    },
    {
      title: "就活で後悔する学生の共通点",
      number: 3,
      content: (
        <div>
          <h3 className="text-3xl font-bold mb-4">業界研究が浅い</h3>
          <p className="text-2xl text-gray-600">
            実際の仕事内容がわからない...<br />
            志望動機に説得力がない
          </p>
        </div>
      ),
      subText: "企業と直接関わる経験が重要"
    },
    {
      title: "就活で後悔する学生の共通点",
      number: 4,
      content: (
        <div>
          <h3 className="text-3xl font-bold mb-4">人脈がない</h3>
          <p className="text-2xl text-gray-600">
            情報収集で出遅れる...<br />
            OB・OG訪問ができない
          </p>
        </div>
      ),
      subText: "仲間との繋がりが将来の財産に"
    },
    {
      title: "就活で後悔する学生の共通点",
      number: 5,
      illustration: Illustrations.success,
      content: (
        <div>
          <h3 className="text-3xl font-bold mb-4">行動を先延ばしにする</h3>
          <p className="text-2xl text-gray-600">
            「まだ時間がある」と思ってる...<br />
            気づいたら手遅れに
          </p>
        </div>
      ),
      ctaButton: {
        text: "今すぐ行動を始める"
      }
    }
  ]

  const displaySlides = slides.length > 0 ? slides : sampleSlides

  return (
    <div className="relative" style={{ 
      width: '800px',
      height: '800px'
    }}>
      {/* CarouselPostGenerator 外側コンテナ - 紫ライン */}
      <div className="overflow-hidden rounded-lg" style={{ 
        width: '800px',
        height: '800px'
      }}>
        {/* スライド表示エリア - オレンジライン */}
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`, 
            width: '800px',
            height: '800px'
          }}
        >
          {/* スライド移動コンテナ - シアンライン */}
          {displaySlides.map((slide, index) => (
            <div key={index} className="flex-shrink-0" data-page={index} style={{ 
              width: '800px',
              height: '800px'
            }}>
              {/* 個別スライド - 黄ライン */}
              <div className="flex justify-center items-center" style={{ 
                width: '800px',
                height: '800px', 
                overflow: 'hidden',
                position: 'relative'
              }}>
                {/* スライド内容配置エリア - ピンクライン */}
                <div style={{ 
                  width: '750px', 
                  height: '750px',
                  overflow: 'hidden'
                }}>
                  {/* テンプレートタイプに応じて適切なコンポーネントを表示 */}
                  {slide.templateType === 'table' && slide.templateData ? (
                    <TableTemplate
                      title={slide.title}
                      headers={slide.templateData.headers}
                      rows={slide.templateData.rows}
                      highlight={slide.highlight}
                      caption={slide.templateData.caption}
                    />
                  ) : slide.templateType === 'checklist' && slide.templateData ? (
                    <ChecklistTemplate
                      title={slide.title}
                      items={slide.templateData.items}
                      checkedItems={slide.templateData.checkedItems}
                      highlight={slide.highlight}
                      subText={slide.subText}
                    />
                  ) : slide.templateType === 'labeled-list' && slide.templateData ? (
                    <LabeledListTemplate
                      title={slide.title}
                      items={slide.templateData.items}
                      highlight={slide.highlight}
                      categoryLabel={slide.templateData.categoryLabel}
                    />
                  ) : slide.templateType === 'point-explanation' && slide.templateData ? (
                    <PointExplanationTemplate
                      title={slide.title}
                      points={slide.templateData.points}
                      highlight={slide.highlight}
                    />
                  ) : slide.templateType === 'hybrid' && slide.templateData ? (
                    <HybridTemplate
                      title={slide.title}
                      sections={slide.templateData.sections}
                      highlight={slide.highlight}
                    />
                  ) : (
                    <PostSlide {...slide} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ナビゲーション - 絶対位置で1080x1080内に配置 */}
      <div className="flex justify-between items-center" style={{ 
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        right: '10px',
        height: '60px'
      }}>
        {/* ナビゲーションコンテナ - 茶ライン */}
        <button
          onClick={prevSlide}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          {/* 前ボタン - 黒ライン */}
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* インジケーター */}
        <div className="flex gap-2">
          {/* インジケーターコンテナ - グレーライン */}
          {displaySlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentSlide === index ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          {/* 次ボタン - 黒ライン */}
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}