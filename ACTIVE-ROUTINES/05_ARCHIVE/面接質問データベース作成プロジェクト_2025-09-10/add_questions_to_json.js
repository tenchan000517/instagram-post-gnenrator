const fs = require('fs');

// 既存のJSONファイルを読み込み
const jsonPath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問データベース.json';
const existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Q023-Q100の質問データ
const newQuestions = [
  // カテゴリ3: 志望動機・企業研究系
  {
    id: "Q023",
    question: "この業界を選んだ理由を教えてください",
    category: "志望動機・企業研究系",
    importance: 5,
    frequency: 5,
    difficulty: 3,
    total_score: 13,
    interview_type: ["人事面接"],
    tags: ["必須", "業界理解", "志望動機"]
  },
  {
    id: "Q024",
    question: "弊社の強みは何だと思いますか？",
    category: "志望動機・企業研究系",
    importance: 5,
    frequency: 5,
    difficulty: 3,
    total_score: 13,
    interview_type: ["人事面接"],
    tags: ["必須", "企業研究", "企業理解"]
  },
  {
    id: "Q025",
    question: "弊社の課題は何だと思いますか？",
    category: "志望動機・企業研究系",
    importance: 4,
    frequency: 4,
    difficulty: 4,
    total_score: 12,
    interview_type: ["人事面接"],
    tags: ["企業研究", "分析力", "批判的思考"]
  },
  {
    id: "Q026",
    question: "10年後の業界はどうなっていると思いますか？",
    category: "業界・経営視点・その他系",
    importance: 3,
    frequency: 3,
    difficulty: 4,
    total_score: 10,
    interview_type: ["最終面接"],
    tags: ["業界理解", "将来予測", "ビジョン"]
  },
  {
    id: "Q027",
    question: "入社後にやりたい仕事は何ですか？",
    category: "キャリアビジョン・将来計画系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接"],
    tags: ["キャリアプラン", "仕事理解", "意欲"]
  },
  {
    id: "Q028",
    question: "なぜ他の業界ではなく、この業界なのですか？",
    category: "志望動機・企業研究系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接"],
    tags: ["業界理解", "志望動機", "差別化"]
  },
  {
    id: "Q029",
    question: "弊社の企業理念についてどう思いますか？",
    category: "志望動機・企業研究系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接", "最終面接"],
    tags: ["企業研究", "価値観", "共感性"]
  },
  {
    id: "Q030",
    question: "弊社のサービス・商品について知っていることを教えてください",
    category: "志望動機・企業研究系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接"],
    tags: ["企業研究", "事業理解", "準備度"]
  },
  {
    id: "Q031",
    question: "弊社で実現したい目標はありますか？",
    category: "キャリアビジョン・将来計画系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接", "最終面接"],
    tags: ["目標設定", "成長意欲", "貢献意識"]
  },
  {
    id: "Q032",
    question: "弊社の経営方針についてどう評価しますか？",
    category: "業界・経営視点・その他系",
    importance: 3,
    frequency: 3,
    difficulty: 4,
    total_score: 10,
    interview_type: ["最終面接"],
    tags: ["経営理解", "分析力", "批判的思考"]
  },
  {
    id: "Q033",
    question: "競合他社と比較して弊社を選ぶ理由は？",
    category: "志望動機・企業研究系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接", "最終面接"],
    tags: ["企業研究", "差別化", "志望度"]
  },
  {
    id: "Q034",
    question: "弊社のニュースで最近印象に残ったものはありますか？",
    category: "志望動機・企業研究系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["人事面接"],
    tags: ["企業研究", "情報感度", "関心度"]
  },
  
  // カテゴリ1: 自己紹介・人物像系
  {
    id: "Q035",
    question: "どのような性格だと思いますか？",
    category: "自己紹介・人物像系",
    importance: 4,
    frequency: 4,
    difficulty: 2,
    total_score: 10,
    interview_type: ["人事面接"],
    tags: ["自己分析", "性格", "自己理解"]
  },
  {
    id: "Q036",
    question: "友人からどのような人だと言われますか？",
    category: "自己紹介・人物像系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["人事面接"],
    tags: ["他者評価", "客観性", "人間関係"]
  },
  {
    id: "Q037",
    question: "人生で最も影響を受けた出来事は何ですか？",
    category: "自己紹介・人物像系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["人事面接"],
    tags: ["価値観", "転機", "成長"]
  },
  {
    id: "Q038",
    question: "大切にしている価値観は何ですか？",
    category: "自己紹介・人物像系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接", "最終面接"],
    tags: ["価値観", "信念", "人生観"]
  },
  {
    id: "Q039",
    question: "理想の上司像を教えてください",
    category: "仕事・働き方の価値観系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["人事面接"],
    tags: ["仕事観", "理想像", "期待値"]
  },
  {
    id: "Q040",
    question: "どのような環境で力を発揮できますか？",
    category: "仕事・働き方の価値観系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接"],
    tags: ["適性", "環境適応", "パフォーマンス"]
  },
  {
    id: "Q041",
    question: "人と協力する際に心がけていることはありますか？",
    category: "仕事・働き方の価値観系",
    importance: 4,
    frequency: 4,
    difficulty: 2,
    total_score: 10,
    interview_type: ["人事面接"],
    tags: ["協調性", "チームワーク", "コミュニケーション"]
  },
  {
    id: "Q042",
    question: "自分を動物に例えると何ですか？",
    category: "自己紹介・人物像系",
    importance: 1,
    frequency: 1,
    difficulty: 3,
    total_score: 5,
    interview_type: ["人事面接"],
    tags: ["アイスブレイク", "創造性", "自己表現"]
  },
  
  // カテゴリ8: 基本スキル・能力系
  {
    id: "Q043",
    question: "パソコンスキルはどの程度ですか？",
    category: "基本スキル・能力系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["人事面接"],
    tags: ["スキル", "IT", "実務能力"]
  },
  {
    id: "Q044",
    question: "英語力はどの程度ですか？",
    category: "基本スキル・能力系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["人事面接"],
    tags: ["語学力", "グローバル", "スキル"]
  },
  {
    id: "Q045",
    question: "数字に対する苦手意識はありますか？",
    category: "基本スキル・能力系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["人事面接"],
    tags: ["数値感覚", "分析力", "適性"]
  },
  {
    id: "Q046",
    question: "プレッシャーに強いですか？",
    category: "強み・弱み・自己PR系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接"],
    tags: ["ストレス耐性", "メンタル", "対処能力"]
  },
  {
    id: "Q047",
    question: "新しい環境に適応するのは得意ですか？",
    category: "基本スキル・能力系",
    importance: 4,
    frequency: 4,
    difficulty: 2,
    total_score: 10,
    interview_type: ["人事面接"],
    tags: ["適応力", "柔軟性", "変化対応"]
  },
  {
    id: "Q048",
    question: "体力・健康管理について教えてください",
    category: "基本スキル・能力系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["人事面接"],
    tags: ["健康", "自己管理", "体力"]
  },
  {
    id: "Q049",
    question: "コミュニケーション能力について自己評価してください",
    category: "強み・弱み・自己PR系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接"],
    tags: ["コミュニケーション", "自己評価", "対人スキル"]
  },
  {
    id: "Q050",
    question: "時間管理は得意ですか？",
    category: "基本スキル・能力系",
    importance: 4,
    frequency: 4,
    difficulty: 2,
    total_score: 10,
    interview_type: ["人事面接"],
    tags: ["時間管理", "計画性", "効率性"]
  },
  
  // カテゴリ7: 入社意思・志望度確認系（最終面接）
  {
    id: "Q051",
    question: "内定を出したら入社していただけますか？",
    category: "入社意思・志望度確認系",
    importance: 5,
    frequency: 5,
    difficulty: 2,
    total_score: 12,
    interview_type: ["最終面接"],
    tags: ["必須", "入社意思", "最終確認"]
  },
  {
    id: "Q052",
    question: "他社からも内定が出たらどうしますか？",
    category: "入社意思・志望度確認系",
    importance: 5,
    frequency: 5,
    difficulty: 3,
    total_score: 13,
    interview_type: ["最終面接"],
    tags: ["必須", "志望度", "選考状況"]
  },
  {
    id: "Q053",
    question: "弊社が第一志望の理由を改めて教えてください",
    category: "入社意思・志望度確認系",
    importance: 5,
    frequency: 5,
    difficulty: 3,
    total_score: 13,
    interview_type: ["最終面接"],
    tags: ["必須", "第一志望", "志望度確認"]
  },
  {
    id: "Q054",
    question: "最終的に弊社に決めた決め手は何ですか？",
    category: "入社意思・志望度確認系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["決定要因", "志望理由", "価値観"]
  },
  {
    id: "Q055",
    question: "内定をもらえなかった場合の就職活動はどうしますか？",
    category: "入社意思・志望度確認系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["最終面接"],
    tags: ["就活計画", "代替案", "覚悟"]
  },
  {
    id: "Q056",
    question: "給与や待遇について何か質問はありますか？",
    category: "入社意思・志望度確認系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["最終面接"],
    tags: ["待遇", "条件確認", "関心事項"]
  },
  {
    id: "Q057",
    question: "転職する可能性はありますか？",
    category: "入社意思・志望度確認系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["定着性", "長期勤続", "キャリア観"]
  },
  {
    id: "Q058",
    question: "何年後に結果を出せると思いますか？",
    category: "入社意思・志望度確認系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["成果意識", "目標設定", "現実性"]
  },
  {
    id: "Q059",
    question: "配属部署の希望はありますか？",
    category: "入社意思・志望度確認系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["最終面接"],
    tags: ["配属希望", "柔軟性", "キャリア"]
  },
  {
    id: "Q060",
    question: "勤務地について希望はありますか？",
    category: "入社意思・志望度確認系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["最終面接"],
    tags: ["勤務地", "転勤", "生活設計"]
  },
  {
    id: "Q061",
    question: "同期との競争についてどう考えますか？",
    category: "仕事・働き方の価値観系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["最終面接"],
    tags: ["競争意識", "成長意欲", "協調性"]
  },
  {
    id: "Q062",
    question: "弊社で働くことへの不安はありますか？",
    category: "困難・失敗・対処法系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["最終面接"],
    tags: ["不安要素", "率直さ", "自己開示"]
  },
  
  // カテゴリ6: キャリアビジョン・将来計画系
  {
    id: "Q063",
    question: "10年後のあなたはどうなっていたいですか？",
    category: "キャリアビジョン・将来計画系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["将来ビジョン", "キャリアプラン", "成長意欲"]
  },
  {
    id: "Q064",
    question: "将来、管理職になりたいと思いますか？",
    category: "キャリアビジョン・将来計画系",
    importance: 4,
    frequency: 4,
    difficulty: 2,
    total_score: 10,
    interview_type: ["最終面接"],
    tags: ["マネジメント", "リーダーシップ", "昇進意欲"]
  },
  {
    id: "Q065",
    question: "専門性を高めたいですか？それとも幅広い経験を積みたいですか？",
    category: "キャリアビジョン・将来計画系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["最終面接"],
    tags: ["キャリアタイプ", "成長志向", "適性"]
  },
  {
    id: "Q066",
    question: "海外で働くことに興味はありますか？",
    category: "キャリアビジョン・将来計画系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["最終面接"],
    tags: ["グローバル", "海外勤務", "挑戦意欲"]
  },
  {
    id: "Q067",
    question: "起業することは考えていますか？",
    category: "キャリアビジョン・将来計画系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["最終面接"],
    tags: ["起業家精神", "独立志向", "長期展望"]
  },
  {
    id: "Q068",
    question: "どのような分野の専門家になりたいですか？",
    category: "キャリアビジョン・将来計画系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["専門性", "キャリア目標", "成長分野"]
  },
  {
    id: "Q069",
    question: "会社に対してどのような貢献をしたいですか？",
    category: "キャリアビジョン・将来計画系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["貢献意識", "価値提供", "目標設定"]
  },
  {
    id: "Q070",
    question: "理想の働き方はありますか？",
    category: "仕事・働き方の価値観系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["最終面接"],
    tags: ["働き方", "ワークスタイル", "価値観"]
  },
  {
    id: "Q071",
    question: "社会に対してどのような影響を与えたいですか？",
    category: "キャリアビジョン・将来計画系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["最終面接"],
    tags: ["社会貢献", "ビジョン", "使命感"]
  },
  {
    id: "Q072",
    question: "プライベートとのバランスはどう考えますか？",
    category: "仕事・働き方の価値観系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["最終面接"],
    tags: ["ワークライフバランス", "価値観", "生活設計"]
  },
  
  // カテゴリ10: 業界・経営視点・その他系
  {
    id: "Q073",
    question: "弊社の今後の課題は何だと思いますか？",
    category: "業界・経営視点・その他系",
    importance: 4,
    frequency: 4,
    difficulty: 4,
    total_score: 12,
    interview_type: ["最終面接"],
    tags: ["企業分析", "課題認識", "批判的思考"]
  },
  {
    id: "Q074",
    question: "弊社の競合他社についてどう思いますか？",
    category: "志望動機・企業研究系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["最終面接"],
    tags: ["競合分析", "業界理解", "差別化"]
  },
  {
    id: "Q075",
    question: "弊社のビジネスモデルの特徴は何だと思いますか？",
    category: "志望動機・企業研究系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["ビジネス理解", "企業研究", "分析力"]
  },
  {
    id: "Q076",
    question: "金融業界の将来性についてどう思いますか？",
    category: "業界・経営視点・その他系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["最終面接"],
    tags: ["業界展望", "将来予測", "マクロ視点"]
  },
  {
    id: "Q077",
    question: "今後10年で金融業界はどう変わると思いますか？",
    category: "業界・経営視点・その他系",
    importance: 3,
    frequency: 3,
    difficulty: 4,
    total_score: 10,
    interview_type: ["最終面接"],
    tags: ["業界変化", "技術革新", "将来展望"]
  },
  {
    id: "Q078",
    question: "弊社が今後注力すべき分野は何だと思いますか？",
    category: "業界・経営視点・その他系",
    importance: 4,
    frequency: 4,
    difficulty: 4,
    total_score: 12,
    interview_type: ["最終面接"],
    tags: ["戦略提案", "成長分野", "経営視点"]
  },
  {
    id: "Q079",
    question: "もし弊社の新規事業を企画するとしたら？",
    category: "業界・経営視点・その他系",
    importance: 3,
    frequency: 3,
    difficulty: 4,
    total_score: 10,
    interview_type: ["最終面接"],
    tags: ["企画力", "創造性", "事業開発"]
  },
  {
    id: "Q080",
    question: "弊社の企業価値を高めるために何が重要だと思いますか？",
    category: "業界・経営視点・その他系",
    importance: 4,
    frequency: 4,
    difficulty: 4,
    total_score: 12,
    interview_type: ["最終面接"],
    tags: ["企業価値", "経営理解", "戦略思考"]
  },
  
  // カテゴリ1: 自己紹介・人物像系（追加分）
  {
    id: "Q081",
    question: "人生で最も大切にしていることは何ですか？",
    category: "自己紹介・人物像系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["価値観", "人生観", "信念"]
  },
  
  // カテゴリ9: 困難・失敗・対処法系
  {
    id: "Q082",
    question: "失敗した時にどのように立ち直りますか？",
    category: "困難・失敗・対処法系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["レジリエンス", "回復力", "メンタル"]
  },
  {
    id: "Q083",
    question: "他人と意見が対立した時はどうしますか？",
    category: "困難・失敗・対処法系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["対立解決", "調整力", "コミュニケーション"]
  },
  {
    id: "Q084",
    question: "正義感を持って行動した経験はありますか？",
    category: "困難・失敗・対処法系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["最終面接"],
    tags: ["倫理観", "正義感", "行動力"]
  },
  {
    id: "Q085",
    question: "リーダーシップを発揮する上で大切なことは何だと思いますか？",
    category: "困難・失敗・対処法系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["リーダーシップ", "マネジメント", "組織論"]
  },
  {
    id: "Q086",
    question: "最近失敗したことはありますか？その時どう対処しましたか？",
    category: "困難・失敗・対処法系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["失敗経験", "問題解決", "学習能力"]
  },
  {
    id: "Q087",
    question: "残業や休日出勤についてどう思いますか？",
    category: "仕事・働き方の価値観系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["最終面接"],
    tags: ["労働観", "働き方", "柔軟性"]
  },
  {
    id: "Q088",
    question: "上司や同僚と意見が対立した時、どう対処しますか？",
    category: "困難・失敗・対処法系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["対人関係", "調整力", "協調性"]
  },
  {
    id: "Q089",
    question: "ストレス解消法を教えてください",
    category: "基本スキル・能力系",
    importance: 3,
    frequency: 3,
    difficulty: 2,
    total_score: 8,
    interview_type: ["人事面接"],
    tags: ["ストレス管理", "自己管理", "健康"]
  },
  {
    id: "Q090",
    question: "チームワークで大切なことは何だと思いますか？",
    category: "仕事・働き方の価値観系",
    importance: 4,
    frequency: 4,
    difficulty: 2,
    total_score: 10,
    interview_type: ["人事面接"],
    tags: ["チームワーク", "協調性", "組織観"]
  },
  {
    id: "Q091",
    question: "入社後5年間でどんな成長をしたいですか？",
    category: "キャリアビジョン・将来計画系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["成長計画", "目標設定", "キャリア"]
  },
  {
    id: "Q092",
    question: "当社の企業理念についてどう思いますか？",
    category: "志望動機・企業研究系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["企業理念", "価値観共有", "企業研究"]
  },
  {
    id: "Q093",
    question: "最後に自己PRをお願いします",
    category: "強み・弱み・自己PR系",
    importance: 5,
    frequency: 5,
    difficulty: 3,
    total_score: 13,
    interview_type: ["人事面接", "最終面接"],
    tags: ["必須", "自己PR", "最終アピール"]
  },
  {
    id: "Q094",
    question: "内定を出したら本当に入社してくれますか？",
    category: "入社意思・志望度確認系",
    importance: 5,
    frequency: 5,
    difficulty: 2,
    total_score: 12,
    interview_type: ["最終面接"],
    tags: ["必須", "入社意思", "最終確認"]
  },
  {
    id: "Q095",
    question: "弊社で実現したい夢はありますか？",
    category: "キャリアビジョン・将来計画系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["最終面接"],
    tags: ["夢", "ビジョン", "目標"]
  },
  {
    id: "Q096",
    question: "もし不採用だったらどうしますか？",
    category: "入社意思・志望度確認系",
    importance: 3,
    frequency: 3,
    difficulty: 3,
    total_score: 9,
    interview_type: ["最終面接"],
    tags: ["就活計画", "代替案", "覚悟"]
  },
  {
    id: "Q097",
    question: "最近読んだ本で感銘を受けたものはありますか？",
    category: "業界・経営視点・その他系",
    importance: 2,
    frequency: 2,
    difficulty: 2,
    total_score: 6,
    interview_type: ["人事面接"],
    tags: ["読書", "学習意欲", "教養"]
  },
  {
    id: "Q098",
    question: "SNSはやっていますか？どのような使い方をしていますか？",
    category: "基本スキル・能力系",
    importance: 2,
    frequency: 2,
    difficulty: 2,
    total_score: 6,
    interview_type: ["人事面接"],
    tags: ["SNS", "情報リテラシー", "自己管理"]
  },
  {
    id: "Q099",
    question: "当社以外にどのような会社を受けていますか？詳しく教えてください",
    category: "志望動機・企業研究系",
    importance: 4,
    frequency: 4,
    difficulty: 3,
    total_score: 11,
    interview_type: ["人事面接", "最終面接"],
    tags: ["選考状況", "業界軸", "志望度"]
  },
  {
    id: "Q100",
    question: "最後に、今日の面接の感想を聞かせてください",
    category: "業界・経営視点・その他系",
    importance: 2,
    frequency: 2,
    difficulty: 2,
    total_score: 6,
    interview_type: ["最終面接"],
    tags: ["感想", "振り返り", "クロージング"]
  }
];

// 既存の質問配列に新しい質問を追加
existingData.questions = existingData.questions.concat(newQuestions);

// 更新されたJSONを保存
fs.writeFileSync(jsonPath, JSON.stringify(existingData, null, 2), 'utf8');

console.log('✅ Q023-Q100を追加しました');
console.log(`総質問数: ${existingData.questions.length}問`);