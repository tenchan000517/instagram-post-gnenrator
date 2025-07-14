'use client'

import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import Viewport from './Viewport'
import { templateComponents, TemplateType } from './templates'
import html2canvas from 'html2canvas'

// アクティブテンプレートのサンプルデータ（アーカイブ済みテンプレートを除外）
const sampleData = {
  index: {
    title: 'INDEX：就活成功の5つのステップ',
    subtitle: '全5ページの構成',
    content: 'このコンテンツは5つの項目で構成されています。',
    items: ['企業研究', '自己分析', '面接対策', 'ES対策', '選考準備'],
    badgeText: 'INDEX'
  },
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
  simple3: {
    title: '朝活のススメ',
    pageNumber: 2,
    twoColumn: {
      left: [{
        title: 'NG習慣：二度寝・スマホいじり',
        description: '睡眠の質を低下させ、集中力を阻害します。情報過多にもなりがちです。'
      }],
      right: [{
        title: '推奨習慣：朝食・軽い運動・身だしなみ',
        description: '脳を活性化し、自己肯定感を高めます。1日の始まりに達成感を得て、活動への意欲を向上させましょう。'
      }]
    }
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
  simple5: {
    title: '効率的なスケジュール管理術：ToDoリストとデジタルツール',
    content: '計画的なスケジュール管理は必須。ToDoリストとデジタルツールを駆使し、効率的にタスクをこなしましょう。',
    pageNumber: 2,
    steps: [
      {
        step: 1,
        title: 'ToDoリスト作成',
        description: '抱えているタスクを全て書き出し、「今日中」「今週中」「今月中」に分類。色分けして時間帯を決める。'
      },
      {
        step: 2,
        title: 'デジタルツール活用',
        description: 'Googleカレンダー（スケジュール管理）、Googleスプレッドシート（企業リスト・面接日程）、Googleドキュメント/スライド（ES/履歴書作成）、Googleドライブ（資料共有）、Gmail（企業との連絡）を活用。'
      },
      {
        step: 3,
        title: 'アナログ手帳との併用',
        description: '手書きで予定を書き込むことで記憶定着。月間カレンダーで全体像を、週間カレンダーで詳細を管理。優先度の高いタスクには付箋や記号を使用。'
      },
      {
        step: 4,
        title: 'ハイブリッド戦略',
        description: 'デジタルとアナログの特性を理解し、自分に合ったツールを使い分け、タスク管理の精度を最大化。エントリー忘れ、選考対策時間の確保、プライベートとの両立を実現。'
      },
      {
        step: 5,
        title: '振り返り',
        description: '定期的に進捗状況を振り返り、タスクの優先順位を見直す。週に1度は週間のスケジュールを見直し、タスクの進捗と改善点を確認。'
      }
    ]
  },
  simple6: {
    title: 'まとめ：内定獲得への道',
    pageNumber: 7,
    content: 'これらの習慣を実践し、自己管理能力を高めることで、就職活動を有利に進めることができます。継続は力なり。日々の努力が、必ず結果に繋がります。',
    items: [
      '早起き',
      'ToDoリスト作成',
      'デジタルツール活用',
      '情報収集',
      '就活日記',
      'セルフケア'
    ]
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
  },
  'title-description-only': {
    title: '内定獲得の秘訣',
    content: '就職活動において最も重要なのは、自分らしさを保ちながら、企業が求める人材像に合わせることです。毎日の積み重ねが、必ず内定へと導きます。',
    pageNumber: 3
  },
  'checklist-enhanced': {
    title: '面接対策チェックリスト',
    content: '面接で最高のパフォーマンスを発揮するための重要ポイントをチェックしましょう。',
    pageNumber: 2,
    checklistItems: [
      {
        text: '企業研究の完了',
        description: '事業内容、経営理念、最近のニュースを調査し、志望動機を明確にする',
        checked: false
      },
      {
        text: '自己PRの準備',
        description: '具体的なエピソードを交えて、自分の強みや経験をアピールする準備',
        checked: false
      },
      {
        text: '逆質問の準備',
        description: '企業への関心と成長意欲を示す質問を３つ以上準備する',
        checked: false
      },
      {
        text: '身だしなみのチェック',
        description: 'スーツのシワ、髭の手入れ、時計や靴の確認など、第一印象の最終チェック',
        checked: false
      }
    ]
  },
  'item-n-title-content': {
    title: 'キャリア選択のポイント',
    subtitle: '理想のキャリアを築くための重要要素',
    content: 'キャリア選択は人生の大きな分かれ道です。以下のポイントを参考に、自分に適した道を選びましょう。',
    pageNumber: 1,
    items: [
      {
        title: '情熱と興味',
        content: '自分が本当に情熱を注げる分野を選ぶことで、長期間のモチベーションを維持できます'
      },
      {
        title: '将来性と成長性',
        content: '業界の将来性や技術革新の影響を考慮し、成長が期待できる分野を選択しましょう'
      },
      {
        title: 'ワークライフバランス',
        content: '自分のライフスタイルや働き方の希望と一致する環境を選ぶことが重要です'
      }
    ]
  },
  'single-section-no-items': {
    title: '単一セクション：詳細解説',
    description: '特定のトピックについて詳細に解説する際に使用するテンプレートです。',
    sections: [{
      title: '解説セクション',
      content: 'このセクションでは詳細な情報を提供します。アイテムリストは使用せず、文章による説明に特化しています。',
      description: 'セクション内容の補足説明や詳細情報をここに記載できます。'
    }],
    badgeText: 'セクション型'
  }
}

export default function TemplateViewer() {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>('index')
  const [isDownloading, setIsDownloading] = useState(false)
  const downloadRef = useRef<HTMLDivElement>(null)
  
  // アクティブテンプレートのみ（アーカイブ済みを除外: explanation, story, simple, simple2, simple4）
  const templates: { type: TemplateType; name: string; description: string }[] = [
    { type: 'index', name: '⓪INDEX型', description: '目次ページ（メインテーマ+項目リスト）' },
    { type: 'enumeration', name: '①列挙型', description: '順番・ソートありの単純リスト専用' },
    { type: 'list', name: '②リスト型', description: '順番なしチェックリスト専用' },
    { type: 'explanation2', name: '③解説型２', description: 'タイトル→解説の繰り返し構造' },
    { type: 'simple3', name: '④シンプル型３', description: '2カラム比較構造専用' },
    { type: 'table', name: '⑤表型', description: 'テーブル構造専用（特殊ケース）' },
    { type: 'simple5', name: '⑥シンプル型５', description: 'ステップ型（完成度高）' },
    { type: 'simple6', name: '⑦シンプル型６', description: 'まとめ構造専用' },
    { type: 'section-items', name: '⑧セクション+アイテム型', description: 'コンテンツ+アクションリスト（新規実装）' },
    { type: 'two-column-section-items', name: '⑨2カラムセクション+アイテム型', description: '2セクション左右配置+各アイテムリスト（新規実装）' },
    { type: 'title-description-only', name: '⑩タイトル+説明型', description: 'シンプルなメッセージ伝達専用' },
    { type: 'checklist-enhanced', name: '⑪チェックリスト詳細型', description: 'チェックリスト+詳細説明付き' },
    { type: 'item-n-title-content', name: '⑫独立ボックス型', description: '独立したトピックを並列表示' },
    { type: 'single-section-no-items', name: '⑬単一セクション・アイテム無し型', description: '6箇所以上対応のHigh Priority' }
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

  // ダウンロード機能（EditablePostGeneratorと同じロジック）
  const handleDownload = async () => {
    if (!downloadRef.current) return

    setIsDownloading(true)

    try {
      // EditablePostGeneratorと同じhtml2canvasオプション
      const canvas = await html2canvas(downloadRef.current, {
        background: '#ffffff',
        width: 850,
        height: 899,
        useCORS: true,
        allowTaint: true,
        logging: false
      })

      // 画像データをBlobに変換
      const imageData = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = imageData
      link.download = `template-${currentTemplate}-preview.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
      alert('ダウンロードに失敗しました')
    } finally {
      setIsDownloading(false)
    }
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
            14種類のアクティブテンプレートデザインを確認できます
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
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="mt-3 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isDownloading ? 'ダウンロード中...' : 'PNGダウンロード'}
                </button>
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
            
            {/* ダウンロード用隠しエリア（EditablePostGeneratorと同じ設定） */}
            <div
              ref={downloadRef}
              style={{
                width: '850px',
                height: '899px',
                position: 'fixed',
                top: '0',
                left: '-100vw',
                zIndex: 9999,
                visibility: 'visible',
                overflow: 'hidden',
                display: 'block',
                backgroundColor: '#ffffff',
                fontFamily: 'inherit'
              }}
            >
              {TemplateComponent && (
                <TemplateComponent data={data} />
              )}
            </div>
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
                {currentTemplate === 'title-description-only' && (
                  <>
                    <li>• シンプルなメッセージ伝達</li>
                    <li>• インパクト重視のコンテンツ</li>
                    <li>• 最小限の情報で最大効果</li>
                  </>
                )}
                {currentTemplate === 'checklist-enhanced' && (
                  <>
                    <li>• チェックリスト+詳細説明</li>
                    <li>• タスク管理や手順書</li>
                    <li>• 実用的なアクションアイテム</li>
                  </>
                )}
                {currentTemplate === 'item-n-title-content' && (
                  <>
                    <li>• 独立したトピックの並列</li>
                    <li>• コンセプトやカテゴリの紹介</li>
                    <li>• 選択肢やオプションの提示</li>
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