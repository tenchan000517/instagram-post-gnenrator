'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Viewport from './Viewport'
import { templateComponents, TemplateType } from './templates'

// テンプレートのサンプルデータ
const sampleData = {
  enumeration: {
    title: '面接対策：基本的な準備ポイント',
    pageNumber: 1,
    items: [
      '企業研究を徹底的に行う',
      '自己分析で強みを把握している',
      '面接練習を欠かさない',
      'OB/OG訪問を積極的に行う',
      '早期からインターンに参加'
    ]
  },
  explanation: {
    title: '企業研究：効果的な情報収集方法',
    pageNumber: 2,
    content: '多くの学生が就活で失敗する理由は、企業研究不足にあります。企業の価値観や求める人材像を理解せずに、表面的な志望動機しか作れないからです。',
    subtitle: '本当に必要なのは深い企業理解'
  },
  story: {
    title: '失敗談：面接で緊張して撃沈した話',
    pageNumber: 3,
    content: '大手企業の最終面接で、準備万端だったはずなのに、想定外の質問で頭が真っ白になってしまいました。',
    subtitle: '準備不足が招いた結果'
  },
  list: {
    title: '面接で避けるべき失敗',
    items: [
      '準備不足で答えられない',
      '企業研究が浅く熱意が伝わらない',
      '自己PRが一方的で魅力に欠ける',
      '逆質問で成長意欲を示せない',
      'マナーや身だしなみが不適切'
    ]
  },
  explanation2: {
    title: 'インターンシップの真の価値',
    content: 'インターンシップは単なる職業体験ではありません。企業の内部を知り、自分の適性を確認し、将来のキャリアを設計する絶好の機会です。',
    points: [
      { title: '企業理解', description: '実際の業務を通して企業文化を理解' },
      { title: '適性発見', description: '自分の強みや興味を再確認' },
      { title: '人脈形成', description: '社員との繋がりで情報収集' }
    ]
  },
  simple: {
    title: '就活準備',
    content: 'まずは自己分析から始めましょう'
  },
  simple2: {
    title: '面接対策',
    content: '想定質問への準備が成功の鍵',
    subtitle: '練習が自信につながる'
  },
  simple3: {
    title: 'ES対策',
    content: '企業が求める人材像を意識した内容作成',
    subtitle: '差別化がポイント'
  },
  table: {
    title: '業界別平均年収',
    tableData: {
      headers: ['業界', '平均年収', '将来性'],
      rows: [
        ['IT', '600万円', '高'],
        ['金融', '700万円', '中'],
        ['商社', '800万円', '中'],
        ['メーカー', '650万円', '中'],
        ['コンサル', '900万円', '高']
      ]
    }
  },
  simple4: {
    title: 'ガクチカ作成チェックリスト',
    checklist: [
      { text: '結果だけでなく過程を重視', checked: true },
      { text: '具体的な数字や事実を含める', checked: true },
      { text: '学んだことと成長を明記', checked: true }
    ],
    points: [
      { description: '何をどのように達成したかの過程が重要' },
      { description: '定量的なデータで説得力を高める' },
      { description: '経験から得た学びを明確に示す' }
    ]
  },
  simple5: {
    title: '企業研究',
    content: '表面的な情報だけでは不十分',
    subtitle: '深い理解が差を生む'
  },
  simple6: {
    title: '内定獲得',
    content: '準備と実践の積み重ねが成果に',
    subtitle: '最後まで諦めない'
  },
  'section-items': {
    title: '内定獲得への道：最強就活ルーティーン構築術',
    subtitle: '長期戦を制する！心身の健康と効率的な行動習慣',
    content: '就職活動は、計画性と継続力が鍵です。心身のバランスを保ちながら、効果的なルーティーンを確立し、内定獲得という目標へ向かいましょう。',
    points: [
      {
        title: '朝の習慣で脳を活性化',
        description: '成功者は朝の習慣を重視します。起床後1時間以内に、身支度、軽い運動、食事を済ませましょう。これらは脳を活性化し、集中力を高めます。'
      }
    ],
    sections: [
      {
        title: '朝の習慣で脳を活性化',
        content: '成功者は朝の習慣を重視します。起床後1時間以内に、身支度、軽い運動、食事を済ませましょう。これらは脳を活性化し、集中力を高めます。',
        items: [
          '起床後30分以内に、コップ一杯の水を飲む',
          'ベッドメイキング、部屋の換気を行う', 
          '15分程度の軽いストレッチ'
        ]
      }
    ]
  },
  'two-column-section-items': {
    title: '情報収集：多様な情報源からのインプット術',
    pageNumber: 4,
    content: '情報収集と振り返りは、就職活動の質を高め、自己成長を促進します。日々の活動と振り返りを組み合わせることで、内定獲得へと繋がる好循環を生み出しましょう。',
    sections: [
      {
        title: '情報収集：多様な情報源からインプット',
        content: '業界研究、企業研究、面接対策に役立つ情報を積極的に収集しましょう。',
        items: [
          '新聞/ニュースサイトのチェック',
          'ランチでの新店舗開拓',
          '書店での情報収集',
          'ニュース/情報番組の視聴',
          '週1本以上の映画鑑賞',
          '交流会への参加'
        ]
      },
      {
        title: '振り返り：自己分析と改善',
        content: '一日の終わりに、15分程度の就職活動日記をつけましょう。具体的な記録は、自己分析を深め、改善に繋がります。',
        items: [
          '活動内容、学び、感情、自己分析の進展を記録',
          '説明会/面接の感想、反省点を記録',
          '具体的な気づきを記録（例：○○企業の戦略から得た学び）'
        ]
      }
    ]
  }
}

export default function TemplateViewer() {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>('enumeration')
  
  const templates: { type: TemplateType; name: string; description: string }[] = [
    { type: 'enumeration', name: '①列挙型', description: 'ポイントを箇条書きで整理' },
    { type: 'explanation', name: '②説明型', description: '詳しい解説とサブタイトル' },
    { type: 'story', name: '③ストーリー型', description: '体験談や事例紹介' },
    { type: 'list', name: '④リスト型', description: 'チェックリスト形式' },
    { type: 'explanation2', name: '⑤解説型２', description: 'ポイント別詳細解説' },
    { type: 'simple', name: '⑥シンプル型', description: '最小限の構成' },
    { type: 'simple2', name: '⑦シンプル型２', description: 'タイトル+コンテンツ+サブタイトル' },
    { type: 'simple3', name: '⑧シンプル型３', description: 'コンテンツ重視レイアウト' },
    { type: 'table', name: '⑨表型', description: 'テーブル形式の情報整理' },
    { type: 'simple4', name: '⑩シンプル型４', description: 'ミニマルデザイン' },
    { type: 'simple5', name: '⑪シンプル型５', description: 'バランス重視' },
    { type: 'simple6', name: '⑫シンプル型６', description: 'メッセージ特化' },
    { type: 'section-items', name: '⑬セクション+アイテム型', description: 'コンテンツ+アクションリスト' },
    { type: 'two-column-section-items', name: '⑭2カラムセクション+アイテム型', description: '2セクション左右配置+各アイテムリスト' }
  ]
  
  const currentIndex = templates.findIndex(t => t.type === currentTemplate)
  const currentTemplateInfo = templates[currentIndex]
  
  const goToPrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : templates.length - 1
    setCurrentTemplate(templates[prevIndex].type)
  }
  
  const goToNext = () => {
    const nextIndex = currentIndex < templates.length - 1 ? currentIndex + 1 : 0
    setCurrentTemplate(templates[nextIndex].type)
  }
  
  const TemplateComponent = templateComponents[currentTemplate]
  const data = sampleData[currentTemplate]
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Instagram投稿テンプレートビューワー
          </h1>
          <p className="text-gray-600">
            13種類のテンプレートデザインを確認できます
          </p>
        </div>
        
        {/* テンプレート選択 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {currentTemplateInfo.name}
              </h2>
              <p className="text-gray-600 text-sm">
                {currentTemplateInfo.description}
              </p>
            </div>
            
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* テンプレート選択ボタン */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {templates.map((template) => (
              <button
                key={template.type}
                onClick={() => setCurrentTemplate(template.type)}
                className={`p-2 rounded-lg border text-sm transition-all ${
                  currentTemplate === template.type
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* メインプレビューエリア */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-center mb-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  プレビュー - {currentTemplateInfo.name}
                </h3>
                <p className="text-sm text-gray-600">
                  850×800px（赤ライン内表示エリア）
                </p>
              </div>
            </div>
            
            <Viewport 
              width={850} 
              height={800}
              className="border-4 border-blue-500"
            >
              <div 
                style={{ 
                  width: '95%', 
                  height: '95%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {TemplateComponent && (
                  <TemplateComponent data={data} />
                )}
              </div>
            </Viewport>
          </div>
        </div>
        
        {/* テンプレート情報 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            {currentTemplateInfo.name} の特徴
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">適用場面</h4>
              <p className="text-sm text-gray-600 mb-4">
                {currentTemplateInfo.description}
              </p>
              <h4 className="font-medium text-gray-700 mb-2">サンプルデータ</h4>
              <div className="bg-gray-50 p-3 rounded-lg">
                <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">使用推奨例</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {currentTemplate === 'enumeration' && (
                  <>
                    <li>• ポイントを整理して伝えたい時</li>
                    <li>• 複数の項目を比較する時</li>
                    <li>• 箇条書きで分かりやすく</li>
                  </>
                )}
                {currentTemplate === 'explanation' && (
                  <>
                    <li>• 詳しい解説が必要な時</li>
                    <li>• 背景情報も含めて説明</li>
                    <li>• サブタイトルで補足</li>
                  </>
                )}
                {currentTemplate === 'story' && (
                  <>
                    <li>• 体験談を共有する時</li>
                    <li>• 感情に訴えかけたい時</li>
                    <li>• 実例で説得力を高める</li>
                  </>
                )}
                {currentTemplate === 'list' && (
                  <>
                    <li>• チェックリスト形式</li>
                    <li>• 注意点や失敗例</li>
                    <li>• 順序のない項目列挙</li>
                  </>
                )}
                {currentTemplate === 'table' && (
                  <>
                    <li>• 比較データの表示</li>
                    <li>• 数値データの整理</li>
                    <li>• 構造化された情報</li>
                  </>
                )}
                {(currentTemplate.includes('simple') || currentTemplate === 'explanation2') && (
                  <>
                    <li>• シンプルなメッセージ</li>
                    <li>• 印象に残りやすい</li>
                    <li>• 読みやすさ重視</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}