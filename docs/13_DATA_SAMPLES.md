# 13_DATA_SAMPLES.md - 完全データサンプル集

## 📋 目次

1. [データサンプル概要](#1-データサンプル概要)
2. [16テンプレート別完全サンプル](#2-16テンプレート別完全サンプル)
3. [ジャンル別生成例](#3-ジャンル別生成例)
4. [エラーケースサンプル](#4-エラーケースサンプル)
5. [開発・テスト用データセット](#5-開発テスト用データセット)
6. [AI応答形式リファレンス](#6-ai応答形式リファレンス)
7. [データ変換サンプル](#7-データ変換サンプル)

---

## 1. データサンプル概要

### 1.1 サンプルデータの構成

Instagram Post Generatorシステムで使用される全データサンプルを、実装にそのまま使用可能な形式で提供します。

#### 📊 サンプル種別
- **最小データ**: 必須フィールドのみ（エラー回避用）
- **標準データ**: 通常利用レベル（実用参考用）
- **最大データ**: 制限値ギリギリ（限界テスト用）

#### 🎯 活用用途
- **開発**: コンポーネント実装・テスト
- **デバッグ**: 問題再現・修正検証
- **品質保証**: エッジケース検証
- **ドキュメント**: 仕様理解・サンプル提供

### 1.2 共通TemplateData型定義

```typescript
// 基本共通フィールド
interface TemplateData {
  title: string          // 必須：タイトル
  content?: string       // オプション：メインコンテンツ
  subtitle?: string      // オプション：サブタイトル
  description?: string   // オプション：説明文
  badgeText?: string     // オプション：バッジテキスト
  pageNumber?: number    // オプション：ページ番号
}

// テンプレート固有フィールドが追加される
// 例: items, sections, tableData, rankingData, graphData等
```

---

## 2. 16テンプレート別完全サンプル

### 2.1 IndexTemplate (index) - 目次ページ

#### 📋 最小データ
```typescript
const indexMinimalData: TemplateData = {
  title: "就活準備INDEX",
  items: ["自己分析", "企業研究"]
}
```

#### 📋 標準データ
```typescript
const indexStandardData: TemplateData = {
  title: "就活完全攻略ガイド",
  subtitle: "内定獲得への7ステップ",
  content: "本格的な就職活動を始める前に押さえておきたい基本項目をまとめました。",
  items: [
    "自己分析・価値観の整理",
    "業界・企業研究の方法",
    "ES・履歴書作成のコツ",
    "面接対策・実践演習",
    "内定後の意思決定"
  ],
  badgeText: "完全版",
  pageNumber: 1
}
```

#### 📋 最大データ
```typescript
const indexMaximalData: TemplateData = {
  title: "新卒就活攻略完全マニュアル", // 25文字制限
  subtitle: "内定率95%達成のための実践的戦略フレームワーク", // 40文字制限
  content: "3年間で1000名以上の就活生をサポートした実績から導き出された、科学的根拠に基づく就活攻略法", // 80文字制限
  items: [
    "自己分析・価値観整理術", // 20文字制限
    "業界企業研究完全版",
    "ES履歴書作成テクニック",
    "面接対策実践演習法",
    "内定獲得後意思決定術",
    "給与交渉・条件調整法",
    "入社準備・心構え完成"
  ],
  badgeText: "実績証明済",
  pageNumber: 1
}
```

### 2.2 EnumerationTemplate (enumeration) - 番号付きリスト

#### 📋 最小データ
```typescript
const enumerationMinimalData: TemplateData = {
  title: "面接の基本ステップ",
  items: ["準備", "実践"]
}
```

#### 📋 標準データ
```typescript
const enumerationStandardData: TemplateData = {
  title: "効果的な面接対策の5ステップ",
  subtitle: "内定率を高める実践的アプローチ",
  items: [
    "企業研究と業界分析の徹底",
    "想定質問への回答準備",
    "模擬面接による実践練習",
    "当日の服装・マナー確認",
    "面接後のフォローアップ"
  ],
  badgeText: "実証済み",
  pageNumber: 3
}
```

#### 📋 最大データ
```typescript
const enumerationMaximalData: TemplateData = {
  title: "面接対策完全マスター法", // 25文字制限
  subtitle: "内定獲得率95%達成のための戦略的準備術", // 40文字制限
  items: [
    "企業研究・業界分析・競合他社比較調査", // 30文字制限
    "自己PRストーリー構築・エピソード整理",
    "想定質問100選への完璧回答準備完了",
    "模擬面接・実践練習・フィードバック活用",
    "当日マナー・服装・持参物最終確認",
    "面接官心理理解・印象操作テクニック",
    "面接後フォローアップ・お礼状作成法",
    "複数内定時の意思決定・条件交渉術",
    "最終面接突破・役員対応特別戦略"
  ],
  badgeText: "完全版",
  pageNumber: 3
}
```

### 2.3 ListTemplate (list) - チェックボックス付きリスト

#### 📋 最小データ
```typescript
const listMinimalData: TemplateData = {
  title: "就活準備チェック",
  items: ["履歴書作成", "面接練習"]
}
```

#### 📋 標準データ
```typescript
const listStandardData: TemplateData = {
  title: "面接前日チェックリスト",
  subtitle: "忘れ物・準備不足を防ぐ最終確認項目",
  items: [
    "企業情報・面接官情報の最終確認",
    "想定質問への回答内容の暗記",
    "スーツ・靴・鞄の状態チェック",
    "履歴書・エントリーシート持参確認",
    "交通手段・到着時間の再確認"
  ],
  badgeText: "必須",
  pageNumber: 5
}
```

#### 📋 最大データ
```typescript
const listMaximalData: TemplateData = {
  title: "完璧面接準備チェックリスト", // 25文字制限
  subtitle: "内定獲得のための徹底的準備項目・当日までに必ず確認すべき全要素", // 60文字制限
  items: [
    "企業詳細情報・最新ニュース・競合他社比較完了", // 35文字制限
    "自己PR・志望動機・逆質問内容の完全暗記",
    "スーツクリーニング・靴磨き・鞄整理完了",
    "履歴書・ES・成績証明書・ポートフォリオ準備",
    "交通手段確認・所要時間計測・代替ルート設定",
    "体調管理・睡眠時間確保・朝食準備完了",
    "面接官情報・企業文化・求める人材像理解",
    "緊急連絡先・遅刻時対応・トラブル対策準備"
  ],
  badgeText: "完全版",
  pageNumber: 5
}
```

### 2.4 ExplanationTwoTemplate (explanation2) - 複数ポイント解説

#### 📋 最小データ
```typescript
const explanation2MinimalData: TemplateData = {
  title: "自己PR作成法",
  points: [
    {
      title: "強みの発見",
      description: "過去の経験を振り返る"
    }
  ]
}
```

#### 📋 標準データ
```typescript
const explanation2StandardData: TemplateData = {
  title: "効果的な自己PR作成の3つのポイント",
  subtitle: "面接官に響く自己アピール術",
  points: [
    {
      title: "具体的なエピソードを用意する",
      description: "数字や事実を交えた具体的な体験談を準備し、説得力のある自己PRを構築します。"
    },
    {
      title: "企業との関連性を明確にする",
      description: "自分の強みが志望企業でどのように活かせるかを明確に伝えることが重要です。"
    },
    {
      title: "結論ファーストで簡潔に話す",
      description: "最初に結論を述べ、その後に根拠を示す構成で、相手に分かりやすく伝えます。"
    }
  ],
  badgeText: "実践的",
  pageNumber: 4
}
```

#### 📋 最大データ
```typescript
const explanation2MaximalData: TemplateData = {
  title: "自己PR完全マスター戦略", // 25文字制限
  subtitle: "面接官を魅了する効果的アピール術の全て", // 40文字制限
  points: [
    {
      title: "STAR法による構造化ストーリー作成テクニック", // 50文字制限
      description: "Situation（状況）、Task（課題）、Action（行動）、Result（結果）の4要素を用いて、論理的で説得力のある自己PR構成を作成する実践的手法"
    },
    {
      title: "企業研究連動型強み訴求アプローチ戦略",
      description: "志望企業の求める人材像、企業文化、事業課題を徹底分析し、自分の経験・スキル・価値観を戦略的に関連付ける高度なマッチング技術"
    },
    {
      title: "数値化・視覚化による説得力最大化手法",
      description: "定量的データ、具体的成果、ビフォーアフター比較を活用し、面接官に強烈なインパクトを与える科学的アピール構築メソッド"
    }
  ],
  badgeText: "上級者向",
  pageNumber: 4
}
```

### 2.5 SimpleThreeTemplate (simple3) - 2カラム比較

#### 📋 最小データ
```typescript
const simple3MinimalData: TemplateData = {
  title: "働き方の比較",
  twoColumn: {
    left: [{ content: "安定重視" }],
    right: [{ content: "成長重視" }]
  }
}
```

#### 📋 標準データ
```typescript
const simple3StandardData: TemplateData = {
  title: "大手企業 VS ベンチャー企業",
  twoColumn: {
    left: [
      { title: "大手企業", content: "安定した収入と福利厚生" },
      { content: "充実した研修制度" },
      { content: "社会的信頼度が高い" },
      { content: "転職時の評価" }
    ],
    right: [
      { title: "ベンチャー企業", content: "裁量権とスピード感" },
      { content: "幅広い業務経験" },
      { content: "経営陣との距離が近い" },
      { content: "成長性と将来性" }
    ]
  },
  badgeText: "比較",
  pageNumber: 2
}
```

#### 📋 最大データ
```typescript
const simple3MaximalData: TemplateData = {
  title: "大手企業VSベンチャー完全比較", // 25文字制限
  twoColumn: {
    left: [
      { 
        title: "大手企業の特徴", 
        content: "安定収入・充実福利厚生・体系的研修制度・社会的信頼" // 80文字制限
      },
      { content: "月収25-35万・年収400-600万・住宅手当・退職金制度" }, // 20文字制限
      { content: "新人研修3ヶ月・OJT1年・スキルアップ支援" },
      { content: "東証一部上場・業界シェアトップクラス・安定経営" },
      { content: "転職市場高評価・キャリア選択肢豊富・経験価値高" }
    ],
    right: [
      { 
        title: "ベンチャー企業の特徴", 
        content: "高裁量権・スピード感・多様業務・成長機会・経営参加"
      },
      { content: "月収20-40万・年収300-800万・ストックオプション" },
      { content: "実務中心・OJT重視・自己学習・外部研修活用" },
      { content: "急成長市場・革新的サービス・社会課題解決・将来性" },
      { content: "実力主義・スキル重視・起業経験・専門性評価" }
    ]
  },
  badgeText: "詳細版",
  pageNumber: 2
}
```

### 2.6 TableTemplate (table) - テーブル表示

#### 📋 最小データ
```typescript
const tableMinimalData: TemplateData = {
  title: "企業比較表",
  tableData: {
    headers: ["企業名", "規模"],
    rows: [["A社", "大手"]]
  }
}
```

#### 📋 標準データ
```typescript
const tableStandardData: TemplateData = {
  title: "主要IT企業比較表",
  subtitle: "新卒採用の基本情報",
  tableData: {
    headers: ["企業名", "初任給", "勤務地", "特徴"],
    rows: [
      ["Google Japan", "580万円", "東京", "グローバル"],
      ["楽天", "480万円", "東京", "Eコマース"],
      ["サイバーエージェント", "420万円", "東京", "広告・ゲーム"],
      ["メルカリ", "500万円", "東京", "フリマアプリ"]
    ]
  },
  badgeText: "2024年版",
  pageNumber: 6
}
```

#### 📋 最大データ
```typescript
const tableMaximalData: TemplateData = {
  title: "IT企業待遇比較完全版", // 25文字制限
  subtitle: "新卒採用条件・福利厚生・成長環境詳細比較", // 40文字制限
  tableData: {
    headers: ["企業名", "初任給", "賞与", "勤務地", "特徴"], // 15文字制限/項目
    rows: [
      ["Google", "580万", "年2回", "東京六本木", "AI・クラウド"],
      ["Meta", "650万", "年1回", "東京渋谷", "SNS・VR"],
      ["Amazon", "520万", "株式", "東京目黒", "EC・AWS"],
      ["Microsoft", "550万", "年2回", "東京品川", "OS・Azure"],
      ["Apple", "600万", "年1回", "東京表参道", "iOS・Mac"],
      ["楽天", "480万", "年2回", "東京世田谷", "EC・決済"],
      ["ソフトバンク", "450万", "年2回", "東京港区", "通信・AI"],
      ["DeNA", "500万", "年2回", "東京渋谷", "ゲーム・AI"]
    ]
  },
  badgeText: "最新版",
  pageNumber: 6
}
```

### 2.7 SimpleFiveTemplate (simple5) - ステップ型

#### 📋 最小データ
```typescript
const simple5MinimalData: TemplateData = {
  title: "面接準備ステップ",
  steps: [
    { step: 1, title: "企業研究", description: "基本情報確認" }
  ]
}
```

#### 📋 標準データ
```typescript
const simple5StandardData: TemplateData = {
  title: "内定獲得までの5ステップ",
  steps: [
    {
      step: 1,
      title: "自己分析の実施",
      description: "価値観、強み、キャリア目標を明確化し、企業選択の軸を定める"
    },
    {
      step: 2,
      title: "業界・企業研究",
      description: "志望業界の動向と企業の特徴を調査し、志望動機を具体化する"
    },
    {
      step: 3,
      title: "ES・履歴書作成",
      description: "自己PRと志望動機を論理的に構成し、説得力のある応募書類を作成"
    },
    {
      step: 4,
      title: "面接対策・練習",
      description: "想定質問への回答準備と模擬面接による実践練習を重ねる"
    },
    {
      step: 5,
      title: "最終確認・面接",
      description: "準備内容の最終チェックを行い、自信を持って面接に臨む"
    }
  ],
  badgeText: "確実",
  pageNumber: 1
}
```

#### 📋 最大データ
```typescript
const simple5MaximalData: TemplateData = {
  title: "内定獲得完全攻略ロードマップ", // 25文字制限
  steps: [
    {
      step: 1,
      title: "自己分析・価値観整理", // 40文字制限（subtitle）
      description: "過去の経験、価値観、強み・弱み、将来のビジョンを徹底的に分析し、キャリア選択の明確な軸を確立する。性格診断ツールやワークシートを活用し、客観的な自己理解を深める。" // 45文字制限（items）
    },
    {
      step: 2,
      title: "業界研究・企業分析・競合比較",
      description: "志望業界の市場動向、成長性、課題を調査。企業の事業内容、経営方針、企業文化、競合他社との差別化要因を分析し、説得力のある志望動機を構築する。"
    },
    {
      step: 3,
      title: "ES・履歴書・ポートフォリオ作成",
      description: "自己PR、志望動機、学生時代の経験を論理的に構成。企業ごとに内容をカスタマイズし、面接官の印象に残る応募書類を作成。添削を重ねて完成度を高める。"
    },
    {
      step: 4,
      title: "面接対策・実践練習・フィードバック",
      description: "頻出質問への回答準備、模擬面接の実施、第三者からのフィードバック収集。話し方、表情、姿勢も含めた総合的な面接スキルの向上を図る。"
    },
    {
      step: 5,
      title: "最終準備・本番実践・アフターフォロー",
      description: "持参物確認、交通手段の下調べ、当日のタイムスケジュール設定。面接後のお礼状送付、結果通知への対応、複数内定時の意思決定準備まで完了させる。"
    }
  ],
  badgeText: "完全版",
  pageNumber: 1
}
```

### 2.8 SimpleSixTemplate (simple6) - コンパクトリスト

#### 📋 最小データ
```typescript
const simple6MinimalData: TemplateData = {
  title: "就活まとめ",
  items: ["準備", "実践"]
}
```

#### 📋 標準データ
```typescript
const simple6StandardData: TemplateData = {
  title: "まとめ：内定獲得への道",
  subtitle: "成功する就活生の共通点",
  content: "これらの習慣を実践し、継続することで内定獲得の確率を大幅に向上させることができます。",
  items: [
    "早起きと規則正しい生活習慣",
    "毎日のToDoリスト作成と実行",
    "デジタルツールを活用した効率化",
    "継続的な学習とスキルアップ",
    "ポジティブマインドの維持",
    "適度な息抜きとストレス管理"
  ],
  badgeText: "重要",
  pageNumber: 7
}
```

#### 📋 最大データ
```typescript
const simple6MaximalData: TemplateData = {
  title: "内定獲得者共通成功法則", // 25文字制限
  subtitle: "勝ち組就活生の実践習慣・行動パターン", // 30文字制限
  content: "内定獲得率95%以上の就活生が実践している習慣を分析。これらの行動を継続することで、確実に結果を出すことができる実証済みの成功パターンです。", // content制限なし
  items: [
    "朝5時起床・夜10時就寝の規則正しい生活習慣確立", // 35文字制限
    "毎日のToDoリスト作成・優先順位設定・進捗管理",
    "Notion・Trello活用による効率的タスク管理システム",
    "業界ニュース・書籍読書・オンライン学習の継続",
    "ポジティブ思考・失敗からの学習・メンタル強化",
    "趣味・運動・友人との時間によるストレス解消法"
  ],
  badgeText: "実証済",
  pageNumber: 7
}
```

### 2.9 SectionItemsTemplate (section-items) - セクション+アイテム

#### 📋 最小データ
```typescript
const sectionItemsMinimalData: TemplateData = {
  title: "面接体験談",
  sections: [
    {
      title: "準備段階",
      content: "企業研究を実施"
    }
  ]
}
```

#### 📋 標準データ
```typescript
const sectionItemsStandardData: TemplateData = {
  title: "私の就活体験談：失敗から学んだ教訓",
  subtitle: "挫折を乗り越えて内定獲得まで",
  content: "就活を通じて学んだ貴重な経験と教訓をシェアします。",
  sections: [
    {
      title: "準備不足による最初の挫折",
      content: "企業研究が甘く、志望動機が曖昧だった結果、面接で全く話せませんでした。",
      items: [
        "業界理解の浅さが露呈",
        "志望動機が具体性に欠ける",
        "逆質問の準備不足"
      ]
    },
    {
      title: "戦略的な準備への転換",
      content: "失敗を反省し、徹底的な準備と戦略的なアプローチに変更しました。",
      items: [
        "1社あたり5時間の企業研究",
        "STAR法による経験の整理",
        "模擬面接の繰り返し実施"
      ]
    }
  ],
  badgeText: "体験談",
  pageNumber: 8
}
```

#### 📋 最大データ
```typescript
const sectionItemsMaximalData: TemplateData = {
  title: "新卒就活完全攻略実体験レポート", // 30文字制限
  subtitle: "偏差値50大学から大手IT企業内定獲得までの軌跡", // 40文字制限
  content: "平凡な大学生だった私が、戦略的な就活により第一志望の大手IT企業から内定を獲得するまでの全プロセスを詳細に公開します。同じ境遇の学生の参考になれば幸いです。", // 100文字制限
  sections: [
    {
      title: "就活スタート時の現実と課題認識",
      content: "大学3年秋、就活解禁と同時に直面した厳しい現実と、自分の立ち位置を客観視して見えてきた根本的な課題を整理しました。",
      items: [
        "学歴フィルターの壁・ES通過率10%以下の現実", // 40文字制限
        "自己分析不足・強みや価値観の曖昧さ",
        "業界知識ゼロ・企業研究の仕方が分からない",
        "面接経験なし・コミュニケーション力への不安"
      ]
    },
    {
      title: "戦略的準備フェーズ・基盤構築期間",
      content: "現状を受け入れた上で、限られた時間の中で最大の成果を出すための戦略的な準備計画を立案し、実行に移しました。",
      items: [
        "自己分析ツール活用・価値観と強みの明確化",
        "業界研究・企業分析・競合比較の体系的実施",
        "ES添削サービス利用・応募書類の完成度向上",
        "模擬面接・グループディスカッション練習参加"
      ]
    },
    {
      title: "実践・修正・改善サイクルの継続実行",
      content: "準備した内容を実際の選考で試し、結果を分析して改善点を特定。PDCAサイクルを高速で回し続けました。",
      items: [
        "第一志望群・練習企業・滑り止めの戦略的受験",
        "面接後の振り返り・フィードバック収集と分析",
        "不合格理由の特定・弱点克服のための対策強化",
        "成功パターンの標準化・再現性のある型の確立"
      ]
    }
  ],
  badgeText: "完全版",
  pageNumber: 8
}
```

### 2.10 TwoColumnSectionItemsTemplate (two-column-section-items) - 2カラムセクション

#### 📋 最小データ
```typescript
const twoColumnSectionItemsMinimalData: TemplateData = {
  title: "準備と実行",
  sections: [
    { title: "準備", content: "企業研究" },
    { title: "実行", content: "面接対策" }
  ]
}
```

#### 📋 標準データ
```typescript
const twoColumnSectionItemsStandardData: TemplateData = {
  title: "効果的な就活戦略：準備と実行",
  subtitle: "成功する就活生の行動パターン",
  content: "就活を「準備フェーズ」と「実行フェーズ」に分けて取り組むことで、効率的に成果を上げることができます。",
  sections: [
    {
      title: "準備フェーズ（3-6月）",
      content: "基盤となる知識とスキルを身につける期間",
      items: [
        "自己分析と価値観の整理",
        "業界研究と企業分析",
        "ES・履歴書の作成と添削"
      ]
    },
    {
      title: "実行フェーズ（7-12月）",
      content: "実際の選考に挑戦し、経験を積む期間",
      items: [
        "エントリー・ES提出",
        "面接・グループディスカッション",
        "内定獲得・意思決定"
      ]
    }
  ],
  badgeText: "戦略的",
  pageNumber: 2
}
```

#### 📋 最大データ
```typescript
const twoColumnSectionItemsMaximalData: TemplateData = {
  title: "就活成功の二段階戦略", // 25文字制限
  subtitle: "準備期間・実践期間の最適化による効率的内定獲得法", // 40文字制限
  content: "就活を「基盤構築期」と「実践最適化期」の2つのフェーズに明確に分けることで、限られた時間の中で最大の成果を生み出す戦略的アプローチを実現します。", // 80文字制限
  sections: [
    {
      title: "基盤構築期（大学3年9月-翌年2月）",
      content: "就活の土台となる知識・スキル・マインドセットを体系的に構築し、実践に向けた万全の準備を整える重要な期間です。",
      items: [
        "自己分析・価値観整理・キャリアビジョン設計", // 30文字制限
        "業界研究・企業分析・競合比較調査実施",
        "ES・履歴書・ポートフォリオ作成・添削",
        "面接練習・GD練習・プレゼン力向上訓練"
      ]
    },
    {
      title: "実践最適化期（大学3年3月-4年12月）",
      content: "構築した基盤を実際の選考で活用し、結果を分析して改善を重ねながら内定獲得まで突き進む実践期間です。",
      items: [
        "戦略的エントリー・ES提出・書類選考突破",
        "面接・GD・プレゼン・最終選考での実践",
        "結果分析・弱点克服・成功パターン標準化",
        "内定獲得・条件交渉・最終意思決定実行"
      ]
    }
  ],
  badgeText: "完全版",
  pageNumber: 2
}
```

### 2.11 TitleDescriptionOnlyTemplate (title-description-only) - タイトル+説明文

#### 📋 最小データ
```typescript
const titleDescriptionOnlyMinimalData: TemplateData = {
  title: "就活のポイント",
  content: "準備が重要です"
}
```

#### 📋 標準データ
```typescript
const titleDescriptionOnlyStandardData: TemplateData = {
  title: "就活で最も重要なのは「準備」",
  subtitle: "成功する就活生の共通点",
  content: "内定を獲得する就活生に共通するのは、徹底した準備です。企業研究、自己分析、面接練習など、事前の準備にどれだけ時間を投資できるかが成否を分けます。準備不足は面接で必ず露呈し、どんなに優秀な学生でも良い結果を得ることはできません。",
  badgeText: "重要",
  pageNumber: 9
}
```

#### 📋 最大データ
```typescript
const titleDescriptionOnlyMaximalData: TemplateData = {
  title: "就活成功の絶対法則：完璧な準備が全てを決める", // 35文字制限
  subtitle: "内定獲得率95%の就活生が実践する準備の本質と具体的実行法", // 50文字制限
  content: "就活において最も重要な要素は「準備の質と量」です。内定を獲得する学生と獲得できない学生の決定的な違いは、準備への取り組み方にあります。企業研究の深さ、自己分析の徹底度、面接練習の回数、志望動機の具体性、逆質問の準備など、全ての要素において圧倒的な準備をした学生だけが内定を獲得できるのです。面接は準備の発表会であり、準備不足は必ず露呈します。どんなに学歴が高く、どんなに優秀な学生であっても、準備不足では良い結果は得られません。逆に、平凡な学生であっても徹底した準備により大手企業から内定を獲得することは十分可能です。", // 200文字制限
  badgeText: "絶対法則",
  pageNumber: 9
}
```

### 2.12 ChecklistEnhancedTemplate (checklist-enhanced) - 詳細説明付きチェックリスト

#### 📋 最小データ
```typescript
const checklistEnhancedMinimalData: TemplateData = {
  title: "面接準備",
  checklistItems: [
    {
      text: "企業研究",
      description: "基本情報を確認",
      checked: false
    }
  ]
}
```

#### 📋 標準データ
```typescript
const checklistEnhancedStandardData: TemplateData = {
  title: "面接対策チェックリスト",
  subtitle: "面接で最高のパフォーマンスを発揮するために",
  content: "面接前に確認すべき重要項目をまとめました。全てチェックして万全の準備で面接に臨みましょう。",
  checklistItems: [
    {
      text: "企業研究の完了",
      description: "事業内容、経営理念、最近のニュースを調査し、企業への理解を深める。",
      checked: false
    },
    {
      text: "自己PRの準備",
      description: "具体的なエピソードを交えた自己PRを3パターン準備し、暗記する。",
      checked: false
    },
    {
      text: "志望動機の明確化",
      description: "なぜその企業を選んだのか、論理的で説得力のある理由を整理する。",
      checked: false
    },
    {
      text: "逆質問の準備",
      description: "企業への関心と意欲を示す質の高い逆質問を5つ以上準備する。",
      checked: false
    }
  ],
  badgeText: "必須",
  pageNumber: 4
}
```

#### 📋 最大データ
```typescript
const checklistEnhancedMaximalData: TemplateData = {
  title: "完璧面接準備チェックリスト", // 30文字制限
  subtitle: "内定獲得確率を最大化する徹底準備項目", // 40文字制限
  content: "面接で100%のパフォーマンスを発揮し、内定獲得確率を最大化するための完全準備チェックリスト。各項目の完了により面接への自信と成功確率が格段に向上します。", // 80文字制限
  checklistItems: [
    {
      text: "企業研究・業界分析・競合他社比較調査の完全実施", // 60文字制限
      description: "事業内容、経営方針、企業文化、最新ニュース、業界動向、競合他社との差別化要因を徹底的に調査し、企業への深い理解と愛着を形成する。面接官が感心するレベルの知識を身につけ、志望度の高さを証明できる状態にする。",
      checked: false
    },
    {
      text: "自己PR・志望動機・学生時代の経験の完全ストーリー化",
      description: "STAR法を用いて具体的なエピソードを構造化し、企業の求める人材像と自分の強みを戦略的に関連付けた説得力のあるストーリーを作成。3パターンの自己PRと企業別カスタマイズした志望動機を完全暗記する。",
      checked: false
    },
    {
      text: "想定質問100選への完璧回答準備・模擬面接実践",
      description: "頻出質問、圧迫質問、技術質問への回答を準備し、第三者との模擬面接を最低5回実施。録画による客観的分析を行い、話し方、表情、姿勢、声のトーンまで細部にわたって改善を重ねる。",
      checked: false
    },
    {
      text: "逆質問・最終確認・当日準備・緊急時対応の完全整備",
      description: "企業への深い関心を示す質の高い逆質問を10個準備。履歴書、交通手段、服装、持参物の最終確認を実施。遅刻時の連絡先、代替交通手段、トラブル時の対応策まで完全に準備する。",
      checked: false
    }
  ],
  badgeText: "完全版",
  pageNumber: 4
}
```

### 2.13 ItemNTitleContentTemplate (item-n-title-content) - 独立ボックス構造

#### 📋 最小データ
```typescript
const itemNTitleContentMinimalData: TemplateData = {
  title: "就活スキル",
  items: [
    { title: "準備力", content: "事前準備の徹底" }
  ]
}
```

#### 📋 標準データ
```typescript
const itemNTitleContentStandardData: TemplateData = {
  title: "就活で身につけるべき4つのスキル",
  subtitle: "内定獲得に必要な能力",
  content: "就活を通じて身につけるべき重要なスキルを4つの観点から解説します。",
  items: [
    {
      title: "情報収集力",
      content: "企業情報、業界動向、選考情報を効率的に収集し、戦略的に活用する能力"
    },
    {
      title: "論理的思考力",
      content: "自分の経験や考えを論理的に整理し、相手に分かりやすく伝える能力"
    },
    {
      title: "コミュニケーション力",
      content: "面接官との対話を通じて自分の魅力を効果的にアピールする能力"
    },
    {
      title: "自己管理力",
      content: "長期間の就活プロセスを計画的に進め、モチベーションを維持する能力"
    }
  ],
  badgeText: "必須スキル",
  pageNumber: 3
}
```

#### 📋 最大データ
```typescript
const itemNTitleContentMaximalData: TemplateData = {
  title: "就活成功に必要な6つの核心能力", // 30文字制限
  subtitle: "内定獲得者が共通して持つ重要スキルセット", // 40文字制限
  content: "内定獲得率95%以上の就活生が共通して身につけている6つの核心能力を分析。これらのスキルを意識的に向上させることで就活成功確率が劇的に向上します。", // 60文字制限
  items: [
    {
      title: "戦略的情報収集・分析・活用能力", // 80文字制限（title）
      content: "企業研究、業界分析、選考情報の効率的収集と戦略的活用。OB訪問、企業説明会、ネット情報を組み合わせた多角的な情報収集により、面接官を唸らせる深い企業理解を実現する高度な情報活用スキル" // 80文字制限（content）
    },
    {
      title: "論理的思考・構造化・説得力向上技術",
      content: "自分の経験、考え、価値観を論理的に整理し、相手の立場に立って分かりやすく伝える技術。STAR法、ピラミッド構造を活用した説得力のあるストーリー構築と、面接官の心に響く効果的なプレゼンテーション能力"
    },
    {
      title: "高度コミュニケーション・対人影響力",
      content: "面接官との対話を通じて自分の魅力を最大限にアピールし、相手に強烈な印象を残すコミュニケーション技術。非言語コミュニケーション、傾聴力、共感力を含む総合的な対人スキルと影響力発揮能力"
    },
    {
      title: "自己管理・計画実行・継続改善力",
      content: "長期間の就活プロセスを計画的に進め、モチベーションを維持し続ける自己管理能力。PDCA サイクルによる継続的な改善と、挫折からの迅速な回復力を含む包括的なセルフマネジメントスキル"
    },
    {
      title: "ストレス管理・メンタル強化・回復力",
      content: "不合格によるストレス、将来への不安、周囲からのプレッシャーに対する適切な対処能力。メンタルヘルス維持、ストレス解消法の実践、ポジティブマインドの維持による精神的な強靭さと回復力"
    },
    {
      title: "適応力・柔軟性・問題解決・創造力",
      content: "予期しない質問、想定外の状況、困難な課題に対する柔軟な対応力と創造的な問題解決能力。変化する就活環境への適応力と、独自性のあるアプローチによる差別化戦略の創造と実行力"
    }
  ],
  badgeText: "完全版",
  pageNumber: 3
}
```

### 2.14 SingleSectionNoItemsTemplate (single-section-no-items) - 単一セクション

#### 📋 最小データ
```typescript
const singleSectionNoItemsMinimalData: TemplateData = {
  title: "面接のコツ",
  sections: [
    {
      title: "基本",
      content: "準備が重要"
    }
  ]
}
```

#### 📋 標準データ
```typescript
const singleSectionNoItemsStandardData: TemplateData = {
  title: "面接で差をつける「逆質問」の技術",
  subtitle: "面接官に強い印象を残す質問のコツ",
  description: "面接の最後に必ず聞かれる「何か質問はありますか？」への対応方法を解説します。",
  sections: [
    {
      title: "効果的な逆質問のポイント",
      content: "逆質問は単なる質問ではなく、あなたの企業への関心と理解度を示す重要なアピールの場です。事前に企業研究を行い、ホームページや求人情報では得られない深い情報を求める質問を準備しましょう。",
      description: "企業への本気度と準備の徹底さを印象づける戦略的な質問技術"
    }
  ],
  badgeText: "テクニック",
  pageNumber: 6
}
```

#### 📋 最大データ
```typescript
const singleSectionNoItemsMaximalData: TemplateData = {
  title: "面接官を魅了する逆質問マスター技術", // 35文字制限
  subtitle: "一流企業内定者が実践する戦略的質問法の全て", // 50文字制限
  description: "面接の最終段階で行われる逆質問は、合否を決定づける重要な局面です。準備された質問により面接官に強烈な印象を残し、内定獲得確率を飛躍的に向上させる実践的技術を詳解します。", // 120文字制限
  sections: [
    {
      title: "戦略的逆質問による差別化とインパクト創造の実践技術", // 60文字制限
      content: "逆質問は単なる情報収集ではなく、あなたの企業への深い関心、業界理解、問題意識、成長意欲を総合的にアピールする戦略的なプレゼンテーションの場です。事前の徹底的な企業研究を基に、ホームページや一般的な情報では得られない核心的な情報を求める質の高い質問を準備し、面接官との建設的な対話を通じて相互理解を深めながら、あなたの優秀さと企業適性を印象づける高度な質問技術を実践することで、他の候補者との明確な差別化を図り、面接官の記憶に強く残る存在になることができます。効果的な逆質問により、面接官に「この学生は本当に優秀で、我が社で活躍してくれそうだ」という確信を抱かせ、内定獲得への道筋を確実に築きます。", // content制限なし
      description: "企業研究の深さと本気度を証明し、面接官との質の高い対話により強烈なインパクトを残す戦略的アプローチ" // 60文字制限
    }
  ],
  badgeText: "上級者向",
  pageNumber: 6
}
```

### 2.15 RankingTemplate (ranking) - ランキング表示

#### 📋 最小データ
```typescript
const rankingMinimalData: TemplateData = {
  title: "人気業界",
  rankingData: [
    { rank: 1, name: "IT", value: "30%" }
  ]
}
```

#### 📋 標準データ
```typescript
const rankingStandardData: TemplateData = {
  title: "新卒就活人気業界ランキング TOP5",
  subtitle: "2024年度新卒採用",
  content: "【出典】: 就職みらい研究所「就職白書2024」",
  rankingData: [
    { 
      rank: 1, 
      name: "情報通信業", 
      value: "22.3%",
      description: "IT・Web・ゲーム業界の人気が継続"
    },
    { 
      rank: 2, 
      name: "製造業", 
      value: "18.7%",
      description: "自動車・電機・化学メーカーなど"
    },
    { 
      rank: 3, 
      name: "金融・保険業", 
      value: "15.2%",
      description: "銀行・証券・保険会社"
    },
    { 
      rank: 4, 
      name: "サービス業", 
      value: "12.9%",
      description: "コンサル・人材・教育など"
    },
    { 
      rank: 5, 
      name: "商業・流通業", 
      value: "10.4%",
      description: "商社・小売・EC業界"
    }
  ],
  badgeText: "2024年版",
  pageNumber: 2
}
```

#### 📋 最大データ
```typescript
const rankingMaximalData: TemplateData = {
  title: "サービス残業率ワースト5業界", // 30文字制限
  subtitle: "業界別無給残業の実態", // 20文字制限
  content: "【出典】: 連合総研「労働時間・年収に関する実態調査2024」（2024年7月19日発表）/ 調査対象：正社員3,000名 / 調査期間：2024年5月1日-5月31日 / 無給残業率 = 月間サービス残業時間 ÷ 月間総労働時間 × 100", // 150文字制限
  rankingData: [
    { 
      rank: 1, 
      name: "教育・学習支援業", 
      value: "50.0%",
      description: "教師・塾講師・研修講師などの職種で2人に1人が無給残業を経験。授業準備、教材作成、保護者対応などの業務が勤務時間外に集中する構造的問題が深刻化している現状" // 80文字制限
    },
    { 
      rank: 2, 
      name: "医療・福祉・介護業", 
      value: "45.8%",
      description: "看護師、介護士、ソーシャルワーカーなどの職種で人手不足が慢性化。患者・利用者への責任感から時間外での記録作成、ケアプラン作成などの業務が常態化"
    },
    { 
      rank: 3, 
      name: "情報通信・IT業", 
      value: "42.3%",
      description: "システムエンジニア、プログラマー、Webデザイナーなどで納期の厳しいプロジェクトが多く、デバッグ、仕様変更対応、緊急対応などでサービス残業が発生"
    },
    { 
      rank: 4, 
      name: "広告・宣伝・PR業", 
      value: "39.7%",
      description: "クリエイティブ職、営業職、プランナーなどでクライアントの要求に応じた修正作業、企画書作成、プレゼン準備などが時間外に集中し、創造性を要する業務特性も影響"
    },
    { 
      rank: 5, 
      name: "小売・サービス業", 
      value: "35.2%",
      description: "店舗スタッフ、接客業、販売員などで顧客対応後の売上集計、在庫管理、清掃業務、翌日準備などが営業時間外に実施される店舗運営の構造的課題が背景"
    }
  ],
  badgeText: "最新データ",
  pageNumber: 7
}
```

### 2.16 GraphTemplate (graph) - グラフ表示

#### 📋 最小データ（円グラフ）
```typescript
const graphMinimalDataPie: TemplateData = {
  title: "業界分布",
  graphData: {
    type: "pie",
    data: [
      { name: "IT", value: 40 },
      { name: "金融", value: 30 }
    ]
  }
}
```

#### 📋 標準データ（円グラフ）
```typescript
const graphStandardDataPie: TemplateData = {
  title: "新卒採用における業界別志望度分布",
  subtitle: "2024年度就活生アンケート結果",
  content: "【出典】: 就職みらい研究所（2024年3月調査）",
  description: "全国の就活生3,000名を対象とした業界志望度調査の結果",
  graphData: {
    type: "pie",
    data: [
      { name: "IT・情報通信", value: 28, color: "#3B82F6" },
      { name: "製造業", value: 22, color: "#EF4444" },
      { name: "金融・保険", value: 18, color: "#10B981" },
      { name: "商社・流通", value: 15, color: "#F59E0B" },
      { name: "コンサル・サービス", value: 12, color: "#8B5CF6" },
      { name: "その他", value: 5, color: "#6B7280" }
    ],
    source: {
      organization: "就職みらい研究所",
      year: "2024",
      date: "2024年3月",
      url: "https://www.recruit.co.jp/newsroom/pressrelease/2024/"
    }
  },
  badgeText: "2024年版",
  pageNumber: 4
}
```

#### 📋 最大データ（棒グラフ）
```typescript
const graphMaximalDataBar: TemplateData = {
  title: "業界別平均年収・残業時間比較", // 30文字制限
  subtitle: "新卒3年目の実態調査", // 20文字制限
  content: "【出典】: 厚生労働省「賃金構造基本統計調査2024」/ 総務省「労働力調査2024年度版」/ 各業界団体公開データを基に算出", // 100文字制限
  description: "大学卒業後3年目時点での業界別平均年収と月間残業時間の実態。転職市場動向と企業選択の参考指標として活用可能な最新データを提供", // 60文字制限
  graphData: {
    type: "bar",
    categories: ["IT・情報通信", "金融・保険", "製造業", "商社・流通", "コンサル", "広告・メディア"],
    series: [
      {
        name: "平均年収",
        data: [520, 480, 450, 470, 580, 420],
        unit: "万円"
      },
      {
        name: "月間残業時間",
        data: [35, 25, 30, 28, 45, 40],
        unit: "時間"
      }
    ],
    source: {
      organization: "厚生労働省・総務省",
      year: "2024",
      date: "2024年6月発表",
      url: "https://www.mhlw.go.jp/toukei/itiran/roudou/chingin/kouzou/z2024/"
    }
  },
  badgeText: "最新統計",
  pageNumber: 8
}
```

---

## 3. ジャンル別生成例

### 3.1 knowhow（ノウハウ系）

#### 🎯 入力例と期待テンプレート
```typescript
const knowhowInputSamples = {
  // 面接対策 → enumeration/simple5
  input1: "面接で成功するための5つの基本ステップ",
  expectedTemplate: "enumeration",
  
  // プレゼン技術 → explanation2/section-items  
  input2: "効果的なプレゼンテーションのコツと実践方法",
  expectedTemplate: "explanation2",
  
  // 時間管理 → checklist-enhanced/simple5
  input3: "学生のための効率的な時間管理術チェックリスト",
  expectedTemplate: "checklist-enhanced"
};
```

#### 📋 実際の生成例（enumeration）
```typescript
const knowhowEnumerationSample: TemplateData = {
  title: "面接成功への5つの基本ステップ",
  items: [
    "徹底した企業研究と業界分析の実施",
    "自己PRと志望動機の明確化と練習",
    "想定質問への回答準備と模擬面接",
    "適切な服装と持参物の最終確認",
    "面接当日の心構えとマナーの実践"
  ],
  badgeText: "実践的",
  pageNumber: 1
}
```

### 3.2 book-recommendation（書籍紹介系）

#### 🎯 入力例と期待テンプレート
```typescript
const bookRecommendationInputSamples = {
  // おすすめ書籍 → ranking/list
  input1: "就活生におすすめの自己啓発書ベスト5",
  expectedTemplate: "ranking",
  
  // 書籍比較 → simple3/table
  input2: "面接対策本の特徴比較と選び方",
  expectedTemplate: "table",
  
  // 読書リスト → list/checklist-enhanced
  input3: "内定獲得に役立つ必読書チェックリスト",
  expectedTemplate: "list"
};
```

#### 📋 実際の生成例（ranking）
```typescript
const bookRecommendationRankingSample: TemplateData = {
  title: "就活生必読！自己啓発書TOP5",
  subtitle: "内定獲得に直結する良書厳選",
  content: "【選定基準】: 実用性・読みやすさ・就活への応用度を総合評価",
  rankingData: [
    {
      rank: 1,
      name: "7つの習慣",
      value: "★★★★★",
      description: "成功の原則を学び、面接での自己PRに活用できる名著"
    },
    {
      rank: 2,
      name: "人を動かす",
      value: "★★★★☆",
      description: "コミュニケーション力向上に直結する実践的内容"
    },
    {
      rank: 3,
      name: "思考の整理学",
      value: "★★★★☆",
      description: "論理的思考力を鍛え、ES作成や面接に応用可能"
    }
  ],
  badgeText: "厳選",
  pageNumber: 1
}
```

### 3.3 industry-features（業種特徴系）

#### 🎯 入力例と期待テンプレート
```typescript
const industryFeaturesInputSamples = {
  // 業界分析 → section-items/graph
  input1: "IT業界の特徴と将来性分析",
  expectedTemplate: "section-items",
  
  // データ比較 → graph/table
  input2: "業界別年収と働き方の比較データ",
  expectedTemplate: "graph",
  
  // 業界構造 → explanation2/item-n-title-content
  input3: "金融業界の主要職種と業務内容",
  expectedTemplate: "item-n-title-content"
};
```

#### 📋 実際の生成例（graph）
```typescript
const industryFeaturesGraphSample: TemplateData = {
  title: "業界別平均年収比較（新卒3年目）",
  subtitle: "2024年度最新データ",
  content: "【出典】: 厚生労働省賃金構造基本統計調査",
  graphData: {
    type: "bar",
    categories: ["IT", "金融", "製造", "商社", "コンサル"],
    series: [
      {
        name: "平均年収",
        data: [520, 480, 450, 470, 580],
        unit: "万円"
      }
    ],
    source: {
      organization: "厚生労働省",
      year: "2024",
      date: "2024年6月"
    }
  },
  badgeText: "最新版",
  pageNumber: 1
}
```

---

## 4. エラーケースサンプル

### 4.1 不正データサンプル

#### ❌ 型不一致エラー
```typescript
// 文字列型フィールドに数値を入力
const typeErrorSample = {
  title: 12345, // string型に number型
  items: "not an array", // string[]型に string型
  badgeText: true // string型に boolean型
}

// 期待される自動修正
const typeErrorCorrected: TemplateData = {
  title: "12345", // string化
  items: ["not an array"], // 配列化
  badgeText: "true" // string化
}
```

#### ❌ 必須フィールド不足
```typescript
// タイトルなしデータ
const missingTitleSample = {
  content: "タイトルが設定されていません",
  items: ["項目1", "項目2"]
  // title フィールドが存在しない
}

// 期待されるフォールバック
const missingTitleCorrected: TemplateData = {
  title: "コンテンツ", // デフォルトタイトル
  content: "タイトルが設定されていません",
  items: ["項目1", "項目2"]
}
```

#### ❌ 配列型フィールドの異常
```typescript
// 空配列・null・undefined
const arrayErrorSamples = {
  emptyArray: { title: "テスト", items: [] },
  nullArray: { title: "テスト", items: null },
  undefinedArray: { title: "テスト", items: undefined },
  nonArrayItems: { title: "テスト", items: "単一文字列" }
}

// 期待される自動修正
const arrayErrorCorrected = {
  emptyArray: { title: "テスト", items: ["項目が設定されていません"] },
  nullArray: { title: "テスト", items: ["項目が設定されていません"] },
  undefinedArray: { title: "テスト", items: ["項目が設定されていません"] },
  nonArrayItems: { title: "テスト", items: ["単一文字列"] }
}
```

### 4.2 文字数制限超過サンプル

#### ❌ 制限値超過データ
```typescript
const characterLimitExceedSample: TemplateData = {
  title: "これは25文字制限を大幅に超過したタイトルの例です。実際の使用では自動的に切り詰められます。", // 25文字超過
  subtitle: "これは40文字制限を超過したサブタイトルの例です。システムにより自動調整されます。", // 40文字超過
  content: "これは80文字制限を超過したコンテンツの例です。実際の生成時には適切な長さに調整され、読みやすい形で表示されるように最適化されます。" // 80文字超過
}

// 期待される自動調整
const characterLimitCorrected: TemplateData = {
  title: "これは25文字制限を大幅に超過したタイ", // 25文字に切り詰め
  subtitle: "これは40文字制限を超過したサブタイトルの例です。シ", // 40文字に切り詰め
  content: "これは80文字制限を超過したコンテンツの例です。実際の生成時には適切な長さに調整され、読みやすい形で表示さ" // 80文字に切り詰め
}
```

### 4.3 AI応答異常サンプル

#### ❌ 不正JSON応答
```typescript
// AI応答の構造異常例
const malformedAIResponses = {
  invalidJSON: "{ title: '不正なJSON', content: incomplete",
  missingQuotes: "{ title: invalid, content: test }",
  extraComma: "{ \"title\": \"テスト\", \"content\": \"内容\", }",
  wrongStructure: "{ data: { title: \"ネストが間違っている\" } }"
}

// 期待されるフォールバック応答
const fallbackResponse: TemplateData = {
  title: "コンテンツ", // デフォルトタイトル
  content: "AI応答の解析に失敗しました。デフォルトコンテンツを表示しています。",
  badgeText: "フォールバック"
}
```

#### ❌ 必須フィールド不完全
```typescript
// AI生成データの不完全例
const incompleteAIResponse = {
  title: "面接対策", // タイトルのみ存在
  // content, items等が欠落
}

// 期待される補完処理
const completedResponse: TemplateData = {
  title: "面接対策",
  content: "詳細な内容は準備中です", // デフォルト補完
  items: ["準備中"], // 必要に応じて補完
  badgeText: "生成中"
}
```

---

## 5. 開発・テスト用データセット

### 5.1 単体テスト用最小データセット

#### 🧪 基本テスト用データ
```typescript
// 各テンプレート用の最小テストデータ
export const minimalTestDataSet = {
  index: {
    title: "テスト",
    items: ["項目1"]
  },
  enumeration: {
    title: "テスト",
    items: ["項目1"]
  },
  list: {
    title: "テスト", 
    items: ["項目1"]
  },
  explanation2: {
    title: "テスト",
    points: [{ title: "ポイント1", description: "説明1" }]
  },
  simple3: {
    title: "テスト",
    twoColumn: {
      left: [{ content: "左側" }],
      right: [{ content: "右側" }]
    }
  },
  table: {
    title: "テスト",
    tableData: {
      headers: ["列1"],
      rows: [["データ1"]]
    }
  },
  simple5: {
    title: "テスト",
    steps: [{ step: 1, title: "ステップ1", description: "説明1" }]
  },
  simple6: {
    title: "テスト",
    items: ["項目1"]
  },
  "section-items": {
    title: "テスト",
    sections: [{ title: "セクション1", content: "内容1" }]
  },
  "two-column-section-items": {
    title: "テスト",
    sections: [
      { title: "セクション1", content: "内容1" },
      { title: "セクション2", content: "内容2" }
    ]
  },
  "title-description-only": {
    title: "テスト",
    content: "説明文"
  },
  "checklist-enhanced": {
    title: "テスト",
    checklistItems: [{ text: "項目1", description: "説明1", checked: false }]
  },
  "item-n-title-content": {
    title: "テスト",
    items: [{ title: "項目1", content: "内容1" }]
  },
  "single-section-no-items": {
    title: "テスト",
    sections: [{ title: "セクション1", content: "内容1" }]
  },
  ranking: {
    title: "テスト",
    rankingData: [{ rank: 1, name: "項目1", value: "値1" }]
  },
  graph: {
    title: "テスト",
    graphData: {
      type: "pie",
      data: [{ name: "項目1", value: 50 }]
    }
  }
}
```

### 5.2 パフォーマンステスト用大容量データ

#### ⚡ 高負荷テスト用データ
```typescript
// 制限値ギリギリの大容量データ
export const performanceTestDataSet = {
  // enumeration: 最大9項目
  enumerationHeavy: {
    title: "パフォーマンステスト用の長いタイトル",
    items: [
      "非常に長い項目名を持つ第1番目の列挙項目です",
      "非常に長い項目名を持つ第2番目の列挙項目です", 
      "非常に長い項目名を持つ第3番目の列挙項目です",
      "非常に長い項目名を持つ第4番目の列挙項目です",
      "非常に長い項目名を持つ第5番目の列挙項目です",
      "非常に長い項目名を持つ第6番目の列挙項目です",
      "非常に長い項目名を持つ第7番目の列挙項目です",
      "非常に長い項目名を持つ第8番目の列挙項目です",
      "非常に長い項目名を持つ第9番目の列挙項目です"
    ]
  },
  
  // item-n-title-content: 最大6項目
  itemNTitleContentHeavy: {
    title: "独立ボックス構造パフォーマンステスト",
    items: [
      {
        title: "非常に長いタイトルを持つ第1番目の独立ボックス項目",
        content: "非常に詳細で長い説明文を持つ第1番目の独立ボックス項目の内容です。この内容は制限値ギリギリまで文字数を増やしてパフォーマンステストに使用されます。"
      },
      {
        title: "非常に長いタイトルを持つ第2番目の独立ボックス項目",
        content: "非常に詳細で長い説明文を持つ第2番目の独立ボックス項目の内容です。この内容は制限値ギリギリまで文字数を増やしてパフォーマンステストに使用されます。"
      },
      {
        title: "非常に長いタイトルを持つ第3番目の独立ボックス項目",
        content: "非常に詳細で長い説明文を持つ第3番目の独立ボックス項目の内容です。この内容は制限値ギリギリまで文字数を増やしてパフォーマンステストに使用されます。"
      },
      {
        title: "非常に長いタイトルを持つ第4番目の独立ボックス項目",
        content: "非常に詳細で長い説明文を持つ第4番目の独立ボックス項目の内容です。この内容は制限値ギリギリまで文字数を増やしてパフォーマンステストに使用されます。"
      },
      {
        title: "非常に長いタイトルを持つ第5番目の独立ボックス項目",
        content: "非常に詳細で長い説明文を持つ第5番目の独立ボックス項目の内容です。この内容は制限値ギリギリまで文字数を増やしてパフォーマンステストに使用されます。"
      },
      {
        title: "非常に長いタイトルを持つ第6番目の独立ボックス項目",
        content: "非常に詳細で長い説明文を持つ第6番目の独立ボックス項目の内容です。この内容は制限値ギリギリまで文字数を増やしてパフォーマンステストに使用されます。"
      }
    ]
  },
  
  // table: 大量行データ
  tableHeavy: {
    title: "大容量テーブルパフォーマンステスト",
    tableData: {
      headers: ["企業名", "業界", "初任給", "勤務地", "特徴"],
      rows: Array.from({ length: 20 }, (_, i) => [
        `企業${i + 1}`,
        `業界${i + 1}`,
        `${400 + i * 10}万円`,
        `都市${i + 1}`,
        `特徴${i + 1}`
      ])
    }
  }
}
```

### 5.3 境界値テスト用データ

#### 🎯 エッジケース検証用
```typescript
export const boundaryTestDataSet = {
  // 文字数制限ギリギリ
  characterLimitBoundary: {
    title25: "12345678901234567890123456", // 25文字ちょうど
    title24: "1234567890123456789012345",  // 24文字（制限内）
    title26: "123456789012345678901234567", // 26文字（超過）
    
    subtitle40: "1234567890123456789012345678901234567890", // 40文字ちょうど
    subtitle39: "123456789012345678901234567890123456789",  // 39文字（制限内）
    subtitle41: "12345678901234567890123456789012345678901", // 41文字（超過）
    
    content80: "12345678901234567890123456789012345678901234567890123456789012345678901234567890", // 80文字ちょうど
    content79: "1234567890123456789012345678901234567890123456789012345678901234567890123456789",  // 79文字（制限内）
    content81: "123456789012345678901234567890123456789012345678901234567890123456789012345678901" // 81文字（超過）
  },
  
  // 配列要素数境界値
  arrayBoundary: {
    items0: [], // 空配列
    items1: ["項目1"], // 1項目
    items9: Array.from({ length: 9 }, (_, i) => `項目${i + 1}`), // 9項目（enumeration最大）
    items10: Array.from({ length: 10 }, (_, i) => `項目${i + 1}`) // 10項目（超過想定）
  },
  
  // 特殊文字・記号
  specialCharacters: {
    emoji: {
      title: "😀😃😄就活成功への道😊😋😎",
      content: "絵文字を含むコンテンツのテスト🎉🎊✨"
    },
    symbols: {
      title: "@#$%^&*()_+-=[]{}|;':\"<>?",
      content: "特殊記号を含むコンテンツのテスト!@#$%"
    },
    japanese: {
      title: "ひらがなカタカナ漢字混在テスト",
      content: "あいうえおアイウエオ愛上恵於"
    },
    mixed: {
      title: "Mixed言語123テスト!@#",
      content: "日本語English中文한글ที่"
    }
  }
}
```

---

## 6. AI応答形式リファレンス

### 6.1 段階別AI応答サンプル

#### 🤖 段階1: フォーマッター応答
```typescript
// ジャンル別最適化後の形式
const formatterResponse = {
  optimizedInput: "【ノウハウ系】面接で成功するための5つの基本ステップを解説。準備段階から当日の実践まで、内定獲得に直結する実用的なアドバイスを提供します。",
  genre: "knowhow",
  keywords: ["面接", "成功", "ステップ", "準備", "実践", "内定"]
}
```

#### 🤖 段階2: 構造分析応答
```typescript
const structureAnalysisResponse = {
  recommendedTemplate: "enumeration",
  reasoning: "5つのステップという順序性のある内容のため、番号付きリストが最適",
  pageCount: 1,
  confidence: 0.95
}
```

#### 🤖 段階3: 一括生成応答
```typescript
const batchGenerationResponse = {
  pages: [
    {
      pageNumber: 1,
      templateType: "enumeration",
      title: "面接成功への5つの基本ステップ",
      content: {
        items: [
          "徹底した企業研究と業界分析の実施",
          "自己PRと志望動機の明確化と練習", 
          "想定質問への回答準備と模擬面接",
          "適切な服装と持参物の最終確認",
          "面接当日の心構えとマナーの実践"
        ]
      }
    }
  ]
}
```

#### 🤖 段階4: キャプション生成応答
```typescript
const captionResponse = {
  caption: "面接で成功するための5つの基本ステップを解説！\n\n1️⃣ 企業研究の徹底\n2️⃣ 自己PRの明確化\n3️⃣ 想定質問の準備\n4️⃣ 服装・持参物確認\n5️⃣ 当日の心構え\n\n内定獲得に直結する実践的なアドバイスをまとめました✨\n\n就活生の皆さん、一緒に頑張りましょう！💪",
  characterCount: 187
}
```

#### 🤖 段階5: ハッシュタグ生成応答
```typescript
const hashtagResponse = {
  hashtags: [
    "#就活", "#面接対策", "#就職活動", "#新卒採用",
    "#面接準備", "#内定獲得", "#就活ノウハウ", "#面接コツ",
    "#企業研究", "#自己PR", "#就活生", "#キャリア"
  ],
  category: "knowhow"
}
```

### 6.2 テンプレート固有AI応答形式

#### 📊 GraphTemplate用AI応答
```typescript
const graphAIResponse = {
  templateType: "graph",
  title: "業界別平均年収比較",
  graphData: {
    type: "bar",
    categories: ["IT", "金融", "製造", "コンサル"],
    series: [
      {
        name: "平均年収",
        data: [520, 480, 450, 580],
        unit: "万円"
      }
    ],
    source: {
      organization: "厚生労働省",
      year: "2024"
    }
  }
}
```

#### 🏆 RankingTemplate用AI応答
```typescript
const rankingAIResponse = {
  templateType: "ranking",
  title: "人気業界ランキング TOP5",
  rankingData: [
    { rank: 1, name: "IT・情報通信", value: "28%", description: "圧倒的人気の成長業界" },
    { rank: 2, name: "製造業", value: "22%", description: "安定性と技術力が魅力" },
    { rank: 3, name: "金融・保険", value: "18%", description: "高収入と社会的地位" },
    { rank: 4, name: "商社・流通", value: "15%", description: "グローバルな事業展開" },
    { rank: 5, name: "コンサル", value: "12%", description: "問題解決とスキル向上" }
  ]
}
```

---

## 7. データ変換サンプル

### 7.1 AI応答からTemplateDataへの変換例

#### 🔄 contentLayoutService変換処理
```typescript
// AI生成データ → TemplateData変換の実例

// 入力：AI生成データ
const aiGeneratedContent = {
  title: "面接対策の基本",
  items: [
    "企業研究の実施",
    "自己PRの準備", 
    "想定質問への対応"
  ]
}

// 出力：TemplateData
const convertedTemplateData: TemplateData = {
  title: "面接対策の基本",
  items: [
    "企業研究の実施",
    "自己PRの準備",
    "想定質問への対応"
  ],
  badgeText: "実践的", // システム自動付与
  pageNumber: 1        // システム自動付与
}
```

#### 🔄 複雑な構造変換例（explanation2）
```typescript
// AI応答（points配列形式）
const aiPointsData = {
  title: "効果的な自己PR作成法",
  points: [
    {
      title: "具体的なエピソード",
      description: "数字や事実を交えた体験談を準備"
    },
    {
      title: "企業との関連性",
      description: "志望企業での活用方法を明確化"
    }
  ]
}

// 変換後TemplateData
const convertedExplanation2Data: TemplateData = {
  title: "効果的な自己PR作成法",
  points: [
    {
      title: "具体的なエピソード",
      description: "数字や事実を交えた体験談を準備"
    },
    {
      title: "企業との関連性", 
      description: "志望企業での活用方法を明確化"
    }
  ],
  subtitle: "面接で差をつけるテクニック", // 自動生成
  badgeText: "実践的"                    // 自動付与
}
```

### 7.2 エディター更新データの逆変換

#### 🔄 エディター → TemplateData → AI形式
```typescript
// エディターでの編集後データ
const editedData = {
  title: "修正されたタイトル",
  items: [
    "編集された項目1",
    "新しく追加された項目2",
    "削除予定の項目3" // ユーザーが削除予定
  ]
}

// 保存用TemplateData
const savedTemplateData: TemplateData = {
  title: "修正されたタイトル",
  items: [
    "編集された項目1", 
    "新しく追加された項目2"
    // 削除された項目は除外
  ],
  badgeText: "編集済み", // 編集フラグ
  pageNumber: 1
}

// AI再生成用形式（必要時）
const regenerationInput = {
  templateType: "enumeration",
  modifiedContent: {
    title: "修正されたタイトル",
    items: [
      "編集された項目1",
      "新しく追加された項目2"
    ]
  },
  userInstructions: "項目を2つに絞り、より具体的な内容に修正"
}
```

---

## 📝 まとめ

### 🎯 データサンプル活用ガイドライン

1. **開発時**: 最小データでコンポーネント実装・動作確認
2. **テスト時**: 境界値データでエッジケース検証
3. **デバッグ時**: エラーケースで問題再現・修正確認
4. **品質保証時**: 最大データでパフォーマンス・制限値確認
5. **ドキュメント時**: 標準データで仕様説明・サンプル提供

### 🔧 実装時の注意点

- **型安全性**: 全サンプルはTypeScript型に準拠
- **文字数制限**: 各テンプレートの制限値を厳守
- **フォールバック**: エラー時の適切なデフォルト値設定
- **パフォーマンス**: 大容量データでの動作確認必須
- **互換性**: 既存データとの下位互換性保持

### 📊 継続的更新

このデータサンプル集は、システムの拡張・改善に合わせて継続的に更新され、常に最新の実装と一致する実用的なリファレンスとして機能します。