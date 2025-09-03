/**
 * 生産性ツールデータ構造定義
 * 企業データベースの構造を参考に作成
 */

// 生産性ツール用データ構造（単一ツール）
const toolDataStructure = {
  id: "T001",                    // ツールID（例: T001, G001, A001）
  toolName: "Notion",            // ツール名
  category: "ノートアプリ",        // カテゴリ
  subCategory: "オールインワン",   // サブカテゴリ
  
  metrics: {
    productivity_score: 95,      // 生産性向上度（0-100）
    ease_of_use: 80,            // 使いやすさ（0-100）
    setup_time: 15,             // セットアップ時間（分）
    learning_curve: 70,         // 学習の簡単さ（0-100）
    popularity: 90,             // 人気度（0-100、利用者数ベース）
    price_score: 85,            // コスパスコア（0-100）
    feature_richness: 90,       // 機能の豊富さ（0-100）
    reliability: 85,            // 安定性・信頼性（0-100）
    support_quality: 75,        // サポート品質（0-100）
    update_frequency: 80        // アップデート頻度（0-100）
  },
  
  pricing: {
    free: true,                 // 無料版あり
    freeTier: "個人利用無制限",    // 無料版の内容
    paid: {
      monthly: 800,             // 月額（円）
      yearly: 8000,             // 年額（円）
      enterprise: 1600          // エンタープライズ（円）
    },
    trial: {
      available: true,          // トライアルあり
      duration: 30              // 期間（日）
    }
  },
  
  features: {
    ai_powered: true,           // AI搭載
    collaboration: true,        // チーム協業
    mobile_app: true,           // スマホアプリ
    offline_support: false,     // オフライン対応
    automation: true,           // 自動化機能
    integration: true,          // 他サービス連携
    customization: true,        // カスタマイズ性
    security: true,             // セキュリティ機能
    backup: true,               // バックアップ機能
    multi_platform: true       // マルチプラットフォーム
  },
  
  platforms: {
    web: true,                  // Web版
    windows: true,              // Windows
    mac: true,                  // Mac
    ios: true,                  // iPhone/iPad
    android: true,              // Android
    linux: false                // Linux
  },
  
  target_users: [              // 対象ユーザー
    "ビジネスパーソン",
    "フリーランス", 
    "学生",
    "チームリーダー"
  ],
  
  use_cases: [                 // 主な用途
    "メモ・ノート管理",
    "プロジェクト管理",
    "ドキュメント作成",
    "データベース構築"
  ],
  
  pros: [                      // メリット
    "豊富な機能",
    "カスタマイズ性が高い",
    "チーム協業に最適",
    "テンプレートが豊富"
  ],
  
  cons: [                      // デメリット
    "学習コストがやや高い",
    "オフライン機能が限定的",
    "高機能すぎて複雑"
  ],
  
  company_info: {
    developer: "Notion Labs Inc.",
    headquarters: "San Francisco, CA",
    founded: 2016,
    employees: "約1,000人",
    funding: "シリーズC"
  },
  
  alternatives: [              // 競合・代替ツール
    "Obsidian",
    "Roam Research", 
    "Evernote",
    "OneNote"
  ],
  
  ratings: {
    app_store: 4.5,            // App Store評価
    google_play: 4.2,          // Google Play評価
    product_hunt: 4.8,         // Product Hunt評価
    capterra: 4.7              // Capterra評価
  },
  
  ten_criteria: {              // TEN特化評価軸
    immediate_effect: 85,       // 即効性（0-100）
    low_barrier: 70,           // 導入障壁の低さ（0-100）
    trend_factor: 95,          // トレンド・人気度（0-100）
    cost_effectiveness: 90,    // 無料・格安度（0-100）
    lazy_friendly: 75          // めんどくさがり対応度（0-100）
  }
};

// カテゴリ定義
const categoryDefinitions = {
  tools: {
    "ノートアプリ": ["オールインワン", "シンプル", "マークダウン"],
    "タスク管理": ["個人", "チーム", "プロジェクト"],
    "自動化": ["IFTTT系", "RPA", "スクリプト"],
    "パスワード管理": ["個人", "チーム", "企業"],
    "コミュニケーション": ["チャット", "会議", "非同期"]
  },
  gadgets: {
    "入力デバイス": ["キーボード", "マウス", "トラックパッド"],
    "出力デバイス": ["モニター", "プロジェクター", "プリンター"],
    "音響機器": ["ヘッドホン", "スピーカー", "マイク"],
    "ストレージ": ["SSD", "HDD", "クラウド連携"],
    "アクセサリー": ["スタンド", "ケーブル", "充電器"]
  },
  apps: {
    "モバイル生産性": ["メモ", "カレンダー", "タスク管理"],
    "学習アプリ": ["語学", "プログラミング", "資格"],
    "健康・習慣": ["瞑想", "運動", "睡眠"],
    "ビジネス": ["名刺管理", "経費", "CRM"]
  }
};

// TEN専用評価基準
const tenEvaluationCriteria = {
  // 行動しない層への訴求要素
  psychology_triggers: [
    "無料で試せる",
    "5分で始められる", 
    "みんな使ってる",
    "すぐ効果が出る",
    "設定不要",
    "スマホでOK"
  ],
  
  // 避けるべき要素
  barriers: [
    "複雑な設定",
    "学習が必要",
    "高額月額",
    "チーム必須",
    "英語のみ",
    "PC専用"
  ],
  
  // スコア計算重み
  scoring_weights: {
    immediate_effect: 0.25,    // 即効性 25%
    low_barrier: 0.25,         // 導入の簡単さ 25%
    trend_factor: 0.20,        // トレンド 20%
    cost_effectiveness: 0.20,  // コスト 20%
    lazy_friendly: 0.10        // めんどくさがり対応 10%
  }
};

module.exports = {
  toolDataStructure,
  categoryDefinitions,
  tenEvaluationCriteria
};