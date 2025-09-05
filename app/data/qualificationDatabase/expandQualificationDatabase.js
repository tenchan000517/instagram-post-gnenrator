const fs = require('fs');
const path = require('path');

/**
 * ChatGPT調査結果を統合してマスターデータベースを拡張するスクリプト
 */

// ChatGPT調査データを構造化JSONに変換
const chatGPTData = [
    // IT・情報処理
    {
        name: "ITストラテジスト試験",
        category: "IT・情報技術系",
        organizer: "情報処理推進機構（IPA）",
        type: "国家資格",
        description: "企業のIT戦略立案や推進能力を認定する国家試験。経営視点でのIT活用力が問われる。",
        difficulty: "最高難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "ネットワークスペシャリスト試験",
        category: "IT・情報技術系",
        organizer: "情報処理推進機構（IPA）",
        type: "国家資格",
        description: "ネットワーク技術に関する高度な知識・技能を認定する国家試験。",
        difficulty: "最高難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "日商PC検定試験（文書デザイン）",
        category: "IT・情報技術系",
        organizer: "日本商工会議所",
        type: "公的資格",
        description: "WordやExcelなどオフィスソフトの利用能力を評価する検定。ビジネス実務でのPC活用力を認定。",
        difficulty: "初級",
        examType: "実技試験",
        isLectureOnly: false
    },
    {
        name: "AWS認定資格",
        category: "IT・情報技術系",
        organizer: "Amazon Web Services",
        type: "国際資格",
        description: "世界的に普及するクラウド「AWS」のサービス利用能力を認定する国際資格。各専門分野のレベル別試験がある。",
        difficulty: "高難度",
        examType: "CBT試験",
        isLectureOnly: false
    },
    {
        name: "Googleデジタルワークショップ認定",
        category: "IT・情報技術系",
        organizer: "Google",
        type: "民間資格",
        description: "Googleが提供するデジタルマーケティング基礎学習プログラム。修了試験合格で無料認定書が得られる。",
        difficulty: "初級",
        examType: "講習+試験",
        isLectureOnly: true
    },
    {
        name: "PHP技術者認定試験",
        category: "IT・情報技術系",
        organizer: "PHP技術者認定機構",
        type: "民間資格",
        description: "PHP言語の基礎知識・応用力を認定する資格試験。Web開発者向けの民間資格。",
        difficulty: "中難度",
        examType: "CBT試験",
        isLectureOnly: false
    },
    {
        name: "P検（ICTプロフィシエンシー検定）",
        category: "IT・情報技術系",
        organizer: "JIPDEC（日本情報処理開発協会）",
        type: "民間資格",
        description: "ビジネス現場で必要なICT活用能力を証明する検定。ワープロ・表計算操作など基礎ICTスキルを評価。",
        difficulty: "初級",
        examType: "CBT試験",
        isLectureOnly: false
    },
    {
        name: "Python3エンジニア認定基礎試験",
        category: "IT・情報技術系",
        organizer: "Python技術者認定機構",
        type: "民間資格",
        description: "汎用プログラミング言語Pythonの基礎知識を認定する資格。データ分析やAI開発に対応。",
        difficulty: "中難度",
        examType: "CBT試験",
        isLectureOnly: false
    },
    {
        name: "CCNA (Cisco Certified Network Associate)",
        category: "IT・情報技術系",
        organizer: "Cisco",
        type: "国際資格",
        description: "ネットワーク基礎技術を学ぶCisco社の国際資格。ルータ・スイッチの設定・運用能力を証明。",
        difficulty: "高難度",
        examType: "CBT試験",
        isLectureOnly: false
    },
    {
        name: "LPIC (Linux技術者認定)",
        category: "IT・情報技術系",
        organizer: "LPI Japan",
        type: "国際資格",
        description: "Linuxサーバ・ネットワークの知識・技能を証明する国際資格。レベル別試験がある。",
        difficulty: "中難度",
        examType: "CBT試験",
        isLectureOnly: false
    },
    {
        name: "情報検定（J検）",
        category: "IT・情報技術系",
        organizer: "情報検定協会",
        type: "公的資格",
        description: "情報社会で必要なICT活用能力を評価する検定試験。「創る・使う・伝える」の3種目から選択。",
        difficulty: "中難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "CGクリエイター検定",
        category: "IT・情報技術系",
        organizer: "CG-ARTS協会",
        type: "公的資格",
        description: "3DCGに関する知識と技能を証明する検定。クリエイター向けの公的資格。",
        difficulty: "中難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "Googleアナリティクス個人認定資格",
        category: "IT・情報技術系",
        organizer: "Google",
        type: "民間資格",
        description: "Google Analyticsの利用・解析能力を認定する国際資格。デジタルマーケティング担当者向け。",
        difficulty: "中難度",
        examType: "オンライン試験",
        isLectureOnly: false
    },
    {
        name: "情報処理安全確保支援士（登録セキスぺ）",
        category: "IT・情報技術系",
        organizer: "情報処理推進機構（IPA）",
        type: "国家資格",
        description: "情報システムや企業の情報セキュリティ運用能力を高度に認定する国家試験。",
        difficulty: "最高難度",
        examType: "筆記試験",
        isLectureOnly: false
    },

    // 医療・福祉（追加分）
    {
        name: "准看護師",
        category: "医療・看護・介護系",
        organizer: "厚生労働省",
        type: "国家資格",
        description: "看護師の補助を行う免許資格。看護系専門学校等修了＋国家試験合格で取得。",
        difficulty: "中難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "歯科技工士",
        category: "医療・看護・介護系",
        organizer: "厚生労働省",
        type: "国家資格",
        description: "歯科用補綴物（義歯等）を製作する専門技術者資格。養成校修了＋国家試験合格で取得。",
        difficulty: "高難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "はり師・きゅう師",
        category: "医療・看護・介護系",
        organizer: "厚生労働省",
        type: "国家資格",
        description: "東洋医学の鍼灸治療を行う国家資格。専門課程修了＋国家試験合格で取得。",
        difficulty: "高難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "介護支援専門員（ケアマネージャー）",
        category: "医療・看護・介護系",
        organizer: "市町村（指定試験機関）",
        type: "公的資格",
        description: "介護保険サービスのケアプラン作成を担う資格。介護福祉士等の国家資格保有者が受験可能。",
        difficulty: "高難度",
        examType: "筆記試験",
        isLectureOnly: false
    },

    // 法律・行政（追加分）
    {
        name: "土地家屋調査士",
        category: "司法・行政・法律系",
        organizer: "法務省",
        type: "国家資格",
        description: "土地・建物の調査測量を行う国家資格。土地境界の測量調査と登記手続きの代理を担当。",
        difficulty: "最高難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "公証人",
        category: "司法・行政・法律系",
        organizer: "法務省",
        type: "国家資格",
        description: "契約書類などの認証（公正証書作成）を行う特別職国家資格。司法試験合格後等に就任。",
        difficulty: "最高難度",
        examType: "任用試験",
        isLectureOnly: false
    },

    // 建築・不動産（追加分）
    {
        name: "木造建築士",
        category: "建築・工事・技術系",
        organizer: "国土交通省",
        type: "国家資格",
        description: "主に木造建築物等の設計・監理を行う国家資格。試験合格で取得。",
        difficulty: "高難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "インテリアコーディネーター",
        category: "建築・工事・技術系",
        organizer: "インテリア産業協会",
        type: "公的資格",
        description: "室内空間のデザイン・プランニング能力を認定する資格（公益社団法人認定）。",
        difficulty: "中難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "建築設備士",
        category: "建築・工事・技術系",
        organizer: "国土交通省",
        type: "国家資格",
        description: "設備工事（空調・衛生・電気等）の設計・工事監理を行う国家資格。試験合格で取得。",
        difficulty: "高難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "造園施工管理技士",
        category: "建築・工事・技術系",
        organizer: "国土交通省",
        type: "国家資格",
        description: "公園・庭園など造園工事の施工管理者資格。1級・2級があり、業法に基づく国家試験。",
        difficulty: "高難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },

    // ビジネス・経営・会計（追加分）
    {
        name: "MBA（経営学修士）",
        category: "ビジネス・経営系",
        organizer: "大学（民間資格）",
        type: "学位",
        description: "ビジネススクール修了で授与される学位。民間資格ではないが経営知識の証として広く認知。",
        difficulty: "最高難度",
        examType: "論文+面接",
        isLectureOnly: false
    },

    // 語学・国際（追加分）
    {
        name: "TOEFL®",
        category: "語学・国際系",
        organizer: "ETS（米国教育試験サービス）",
        type: "国際資格",
        description: "大学等への留学適性を測る国際試験。英語非母語話者の学術英語力を評価する。",
        difficulty: "高難度",
        examType: "CBT試験（4技能）",
        isLectureOnly: false
    },
    {
        name: "IELTS",
        category: "語学・国際系",
        organizer: "BC, CIE、IDP（共催）",
        type: "国際資格",
        description: "海外留学や移住用の英語能力試験。Listening/Speaking/Reading/Writingの4技能評価。",
        difficulty: "高難度",
        examType: "筆記試験+面接",
        isLectureOnly: false
    },
    {
        name: "実用中国語検定（HSK）",
        category: "語学・国際系",
        organizer: "中国国家外国語学考試委員会",
        type: "国際資格",
        description: "中国語能力を測る検定。6級まであり、中国政府認定の国際試験。",
        difficulty: "中難度",
        examType: "筆記試験+リスニング",
        isLectureOnly: false
    },
    {
        name: "ビジネス英検",
        category: "語学・国際系",
        organizer: "実業技能検定協会（旧実業英語検定協会）",
        type: "民間資格",
        description: "ビジネスシーンでの英語運用能力を評価する検定。TOEICに次いで企業導入が進む試験。",
        difficulty: "中難度",
        examType: "筆記試験+リスニング",
        isLectureOnly: false
    },
    {
        name: "貿易実務検定",
        category: "語学・国際系",
        organizer: "貿易実務検定協会",
        type: "民間資格",
        description: "国際貿易の実務知識を評価する検定。貿易事務に必要な英語・貿易ルールを問う。",
        difficulty: "中難度",
        examType: "筆記試験",
        isLectureOnly: false
    },

    // 教育・保育（追加分）
    {
        name: "中学校教諭免許状（各科目）",
        category: "教育系",
        organizer: "文部科学省",
        type: "国家資格",
        description: "中学校教諭になる免許。教科ごとの専門知識を身につけ、所定課程修了で取得。",
        difficulty: "高難度",
        examType: "教員採用試験",
        isLectureOnly: false
    },
    {
        name: "高等学校教諭免許状（各科目）",
        category: "教育系",
        organizer: "文部科学省",
        type: "国家資格",
        description: "高校教諭になる免許。大学での教科専門課程修了が必要。",
        difficulty: "高難度",
        examType: "教員採用試験",
        isLectureOnly: false
    },
    {
        name: "ベビーシッター技能認定資格",
        category: "教育系",
        organizer: "日本ベビーシッター協会",
        type: "民間資格",
        description: "家庭で乳幼児のケアをするシッターの技能を認定。協会主催の講習＋試験で取得。",
        difficulty: "初級",
        examType: "講習+試験",
        isLectureOnly: true
    },
    {
        name: "児童英語インストラクター",
        category: "教育系",
        organizer: "民間団体",
        type: "民間資格",
        description: "子ども向け英語指導の技能を認定する資格。英語力と指導法を評価する。",
        difficulty: "中難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },

    // 食・栄養・調理（追加分）
    {
        name: "製菓衛生師",
        category: "食・栄養・調理系",
        organizer: "厚生労働省",
        type: "国家資格",
        description: "製菓製パン製造に関する衛生指導・管理を行う国家資格。専門学校修了＋国家試験。",
        difficulty: "中難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "野菜ソムリエ",
        category: "食・栄養・調理系",
        organizer: "野菜ソムリエ協会",
        type: "民間資格",
        description: "野菜・果物の知識と料理提案力を認定する民間資格。講座受講＋試験で取得。",
        difficulty: "初級",
        examType: "講習+試験",
        isLectureOnly: true
    },
    {
        name: "ソムリエ",
        category: "食・栄養・調理系",
        organizer: "日本ソムリエ協会",
        type: "民間資格",
        description: "ワインなど酒類の知識・サービス技能を認定する民間資格。一次・二次試験合格。",
        difficulty: "高難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "食育スペシャリスト",
        category: "食・栄養・調理系",
        organizer: "日本野菜ソムリエ協会",
        type: "民間資格",
        description: "食育指導者としての能力を認定する資格。食育に関する知識と技術を評価する。",
        difficulty: "初級",
        examType: "講習+試験",
        isLectureOnly: true
    },
    {
        name: "フードコーディネーター",
        category: "食・栄養・調理系",
        organizer: "日本フードコーディネーター協会",
        type: "民間資格",
        description: "食・飲・栄養に関するコーディネート能力を認定する資格。講座修了で取得可能。",
        difficulty: "初級",
        examType: "講習修了",
        isLectureOnly: true
    },

    // 美容・ファッション（追加分）
    {
        name: "理容師",
        category: "美容・ファッション系",
        organizer: "厚生労働省",
        type: "国家資格",
        description: "理容業務（散髪・顔そり等）を行う国家資格。理容専門学校修了＋国家試験合格。",
        difficulty: "中難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "管理美容師（美容師免許所持者）",
        category: "美容・ファッション系",
        organizer: "厚生労働省",
        type: "国家資格",
        description: "美容室での店長等を務めるための上位資格。美容師免許取得後、管理講習修了で資格取得。",
        difficulty: "中難度",
        examType: "講習修了",
        isLectureOnly: true
    },
    {
        name: "メイクアップ検定",
        category: "美容・ファッション系",
        organizer: "日本メイクアップ技術検定協会",
        type: "民間資格",
        description: "メイク技術を評価する民間検定。各種級があり基礎から実践技術まで認定。",
        difficulty: "中難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "パーソナルカラーアナリスト",
        category: "美容・ファッション系",
        organizer: "日本パーソナルカラー協会",
        type: "民間資格",
        description: "個人に似合う色（パーソナルカラー）を診断する技能を認定する資格。講座受講で取得可。",
        difficulty: "初級",
        examType: "講習+試験",
        isLectureOnly: true
    },

    // 自然・環境・動物（追加分）
    {
        name: "動物看護師統一認定機構認定",
        category: "自然・環境・動物系",
        organizer: "動物看護師統一認定機構",
        type: "民間資格",
        description: "動物病院で動物ケアを行う動物看護師の資格認定機構による資格。講習+試験で取得。",
        difficulty: "中難度",
        examType: "講習+試験",
        isLectureOnly: true
    },
    {
        name: "環境計量士",
        category: "自然・環境・動物系",
        organizer: "環境省",
        type: "国家資格",
        description: "大気・水質など環境中の物質の測定・分析に必要な国家資格。特定分野で試験合格。",
        difficulty: "高難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "愛玩動物飼養管理士",
        category: "自然・環境・動物系",
        organizer: "日本愛玩動物協会",
        type: "民間資格",
        description: "飼い主がペットを適切に飼養するための知識・技能を認定する民間資格。3級〜1級。",
        difficulty: "初級",
        examType: "講習+試験",
        isLectureOnly: true
    },
    {
        name: "森林インストラクター",
        category: "自然・環境・動物系",
        organizer: "森林インストラクター協会",
        type: "民間資格",
        description: "森林保全や環境教育を行う専門家資格（民間団体認定）。研修修了・試験で取得。",
        difficulty: "中難度",
        examType: "講習+試験",
        isLectureOnly: true
    },

    // 芸術・デザイン・音楽（追加分）
    {
        name: "ウェブクリエイター能力認定試験",
        category: "芸術・デザイン・音楽系",
        organizer: "エルゴトロン",
        type: "民間資格",
        description: "Webデザイン・制作技術を認定する資格。HTML/CSSなどの技能を評価する。",
        difficulty: "中難度",
        examType: "実技試験",
        isLectureOnly: false
    },
    {
        name: "DTPエキスパート",
        category: "芸術・デザイン・音楽系",
        organizer: "エルゴトロン",
        type: "民間資格",
        description: "DTP（出版デザイン）の知識・技能を証明する資格。Illustrator/Photoshopなどを評価。",
        difficulty: "中難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "Illustrator®クリエイター能力認定試験",
        category: "芸術・デザイン・音楽系",
        organizer: "アドビ（アドビ認定試験運営会社）",
        type: "民間資格",
        description: "Illustratorの操作スキルを証明する資格試験。出版や印刷で実務に活用。",
        difficulty: "中難度",
        examType: "実技試験",
        isLectureOnly: false
    },
    {
        name: "Photoshop®クリエイター能力認定試験",
        category: "芸術・デザイン・音楽系",
        organizer: "アドビ（アドビ認定試験運営会社）",
        type: "民間資格",
        description: "Photoshopの操作スキルを評価する資格試験。画像編集・加工技術を認定する。",
        difficulty: "中難度",
        examType: "実技試験",
        isLectureOnly: false
    },
    {
        name: "音楽教員免許状（1種・2種）",
        category: "芸術・デザイン・音楽系",
        organizer: "文部科学省",
        type: "国家資格",
        description: "小中高で音楽を教えるための免許。音楽教育課程修了が必要。",
        difficulty: "高難度",
        examType: "教員採用試験",
        isLectureOnly: false
    },
    {
        name: "ピアノ調律技能士",
        category: "芸術・デザイン・音楽系",
        organizer: "文部科学省",
        type: "国家資格",
        description: "ピアノの調律・修理を行う国家資格。実技・理論試験に合格して取得。",
        difficulty: "高難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },

    // 趣味・実用・その他（追加分）
    {
        name: "運転免許（普通・大型・二輪等）",
        category: "運輸・交通系",
        organizer: "各都道府県公安委員会",
        type: "国家資格",
        description: "自動車等を運転するための免許（道路交通法）。免許センターの試験に合格して交付。",
        difficulty: "初級",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "第一種衛生管理者",
        category: "安全・防災系",
        organizer: "厚生労働省",
        type: "国家資格",
        description: "事業場の衛生管理を行う国家資格。産業保健の知識を問う試験に合格。",
        difficulty: "中難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "潜水士",
        category: "趣味・実用・その他系",
        organizer: "海上労働安全衛生法",
        type: "国家資格",
        description: "潜水業務に従事するための国家資格。水中の危険を考慮した知識を問う試験に合格。",
        difficulty: "中難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "漢字検定（日本漢字能力検定）",
        category: "趣味・実用・その他系",
        organizer: "日本漢字能力検定協会",
        type: "民間資格",
        description: "漢字や語彙力を測定する検定。10級〜1級・準1級があり、日本語力を広く評価。",
        difficulty: "中難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "囲碁・将棋・麻雀の各段位",
        category: "趣味・実用・その他系",
        organizer: "囲碁・将棋連盟等",
        type: "民間資格",
        description: "囲碁・将棋・麻雀の技能レベルを示す資格（段位）。各競技団体が認定。",
        difficulty: "中難度",
        examType: "実技試験",
        isLectureOnly: false
    },
    {
        name: "TOEIC®（Speaking&Writing）",
        category: "語学・国際系",
        organizer: "ETS",
        type: "民間資格",
        description: "ビジネス英語のスピーキング/ライティング能力を測る国際試験。スコアで能力認定。",
        difficulty: "中難度",
        examType: "CBT試験",
        isLectureOnly: false
    }
];

// 評価スコア計算
function calculateScores(qualification) {
    let jobRelevance = 5;
    let salaryImpact = 5;
    let careerValue = 5;
    
    // 資格区分による調整
    switch (qualification.type) {
        case '国家資格':
            jobRelevance += 3;
            salaryImpact += 2;
            careerValue += 3;
            break;
        case '公的資格':
            jobRelevance += 2;
            salaryImpact += 1;
            careerValue += 2;
            break;
        case '国際資格':
            jobRelevance += 3;
            salaryImpact += 2;
            careerValue += 2;
            break;
        case '民間資格':
            jobRelevance += 1;
            salaryImpact += 0;
            careerValue += 1;
            break;
    }
    
    // 難易度による調整
    switch (qualification.difficulty) {
        case '最高難度':
            salaryImpact += 3;
            careerValue += 3;
            break;
        case '高難度':
            salaryImpact += 2;
            careerValue += 2;
            break;
        case '中難度':
            salaryImpact += 1;
            careerValue += 1;
            break;
    }
    
    // 高需要カテゴリによる調整
    const highDemandCategories = [
        'IT・情報技術系', '医療・看護・介護系', 
        'ビジネス・経営系', '建築・工事・技術系'
    ];
    
    if (highDemandCategories.includes(qualification.category)) {
        jobRelevance += 2;
        salaryImpact += 1;
    }
    
    return {
        jobRelevance: Math.min(jobRelevance, 10),
        salaryImpact: Math.min(salaryImpact, 10),
        careerValue: Math.min(careerValue, 10),
        totalScore: Math.min(jobRelevance + salaryImpact + careerValue, 30)
    };
}

// メイン処理
function expandDatabase() {
    try {
        // 既存のマスターデータを読み込み
        const masterDataPath = path.join(__dirname, 'qualificationMasterData.json');
        let masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf8'));
        
        console.log(`統合前のデータ数: ${masterData.qualifications.length}資格`);
        
        // ChatGPTデータをマスターデータ形式に変換
        let idCounter = masterData.qualifications.length + 1;
        const newQualifications = chatGPTData.map(qual => {
            const scores = calculateScores(qual);
            
            return {
                id: `Q${String(idCounter++).padStart(3, '0')}`,
                name: qual.name,
                category: qual.category,
                organizer: qual.organizer,
                type: qual.type,
                description: qual.description,
                difficulty: qual.difficulty,
                examType: qual.examType,
                isLectureOnly: qual.isLectureOnly,
                jobRelevance: scores.jobRelevance,
                salaryImpact: scores.salaryImpact,
                careerValue: scores.careerValue,
                source: "ChatGPT調査",
                totalScore: scores.totalScore
            };
        });
        
        // 重複チェック（名前ベース）
        const existingNames = new Set(masterData.qualifications.map(q => q.name));
        const uniqueNewQualifications = newQualifications.filter(qual => {
            if (existingNames.has(qual.name)) {
                console.log(`重複スキップ: ${qual.name}`);
                return false;
            }
            existingNames.add(qual.name);
            return true;
        });
        
        // 新しいデータを追加
        masterData.qualifications = [...masterData.qualifications, ...uniqueNewQualifications];
        
        // 講習のみ資格の再計算
        masterData.qualifications = masterData.qualifications.map(qual => {
            const lectureKeywords = [
                '講習', '研修', '受講', 'セミナー', '講座', '修了',
                '衛生責任者', '防災士', '司書', '食品衛生',
                'アドバイザー', 'インストラクター', 'コーディネーター',
                'ソムリエ', 'デジタルワークショップ', 'ベビーシッター',
                '管理美容師', '野菜ソムリエ', '食育スペシャリスト',
                'フードコーディネーター', 'パーソナルカラー',
                '動物看護師統一認定', '愛玩動物飼養', '森林インストラクター'
            ];
            
            const isLectureOnly = lectureKeywords.some(keyword => 
                qual.name.includes(keyword) || 
                qual.description.includes(keyword) ||
                qual.examType === '講習会のみ' ||
                qual.examType === '講習+試験' ||
                qual.examType === '講習修了'
            );
            
            return { ...qual, isLectureOnly };
        });
        
        // 統計情報更新
        const lectureOnlyCount = masterData.qualifications.filter(q => q.isLectureOnly).length;
        const nationalCount = masterData.qualifications.filter(q => q.type === '国家資格').length;
        const publicCount = masterData.qualifications.filter(q => q.type === '公的資格').length;
        const privateCount = masterData.qualifications.filter(q => q.type === '民間資格').length;
        const internationalCount = masterData.qualifications.filter(q => q.type === '国際資格').length;
        
        masterData.metadata = {
            ...masterData.metadata,
            totalQualifications: masterData.qualifications.length,
            lastUpdated: new Date().toISOString().split('T')[0],
            lectureOnlyCount,
            nationalLicenseCount: nationalCount,
            publicLicenseCount: publicCount,
            privateLicenseCount: privateCount,
            internationalLicenseCount: internationalCount,
            addedFromChatGPT: uniqueNewQualifications.length
        };
        
        // 結果を保存
        fs.writeFileSync(masterDataPath, JSON.stringify(masterData, null, 2), 'utf8');
        
        console.log('=== 資格データベース拡張完了 ===');
        console.log(`総資格数: ${masterData.metadata.totalQualifications}`);
        console.log(`ChatGPTから追加: ${masterData.metadata.addedFromChatGPT}資格`);
        console.log(`講習のみ資格: ${masterData.metadata.lectureOnlyCount}`);
        console.log(`国家資格: ${masterData.metadata.nationalLicenseCount}`);
        console.log(`公的資格: ${masterData.metadata.publicLicenseCount}`);
        console.log(`民間資格: ${masterData.metadata.privateLicenseCount}`);
        console.log(`国際資格: ${masterData.metadata.internationalLicenseCount}`);
        
        // 講習のみ資格リスト（TOP15）
        const lectureOnlyQuals = masterData.qualifications
            .filter(q => q.isLectureOnly)
            .sort((a, b) => b.totalScore - a.totalScore);
        
        console.log('\\n=== 講習のみで取得可能な資格TOP15 ===');
        lectureOnlyQuals.slice(0, 15).forEach((qual, index) => {
            console.log(`${index + 1}. ${qual.name} (${qual.type}) - スコア: ${qual.totalScore}`);
        });
        
        return masterData;
        
    } catch (error) {
        console.error('エラーが発生しました:', error);
        process.exit(1);
    }
}

// スクリプト実行
if (require.main === module) {
    expandDatabase();
}

module.exports = { expandDatabase };