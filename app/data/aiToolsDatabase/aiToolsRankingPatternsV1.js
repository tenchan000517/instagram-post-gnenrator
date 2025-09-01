/**
 * AIツール用ランキングパターン定義 V1
 * 
 * 企業ランキング形式に準拠したAIツール専用パターン
 * 66の真のAIツール（非AIツール除外済み）を活用
 * 
 * 【ターゲット】
 * - generalUsers: 一般ユーザー向け
 * - developers: 開発者向け  
 * - creators: クリエイター向け
 */

const AI_TOOLS_RANKING_PATTERNS = {
  
  // 一般ユーザー向け（20パターン）
  generalUsers: [
    // 基本総合ランキング
    { id: 'AU001', name: 'AIツール総合ランキングTOP10', criteria: 'adjustedTenScore', limit: 10, filters: {} },
    { id: 'AU002', name: 'AIツール総合ランキングTOP20', criteria: 'adjustedTenScore', limit: 20, filters: {} },
    
    // 汎用AI会話アシスタント特化
    { id: 'AU003', name: '汎用AI会話アシスタントTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: 'AI会話・アシスタント' } },
    { id: 'AU004', name: '無料で使えるAI会話ツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: 'AI会話・アシスタント', hasFreeVersion: true } },
    
    // 文章・文書作成支援
    { id: 'AU005', name: 'AI文章作成・ライティング支援TOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: 'AI Writing Assistance' } },
    { id: 'AU006', name: '日本語対応AI文章ツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { supportsJapanese: true, category: 'AI Writing Assistance' } },
    
    // 検索・情報収集
    { id: 'AU007', name: 'AI検索・情報収集ツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: '検索・情報収集' } },
    
    // 音声関連
    { id: 'AU008', name: '音声生成・クローニングAITOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: '音声生成・クローニング' } },
    { id: 'AU009', name: 'AI文字起こし・音声認識TOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: 'AI音声認識・文字起こし' } },
    { id: 'AU010', name: 'テキスト読み上げAITOP3', criteria: 'adjustedTenScore', limit: 3, filters: { category: 'テキスト読み上げ' } },
    
    // ワークフロー・生産性
    { id: 'AU011', name: 'AIワークフロー自動化ツールTOP3', criteria: 'adjustedTenScore', limit: 3, filters: { category: 'AI Workflow Automation' } },
    { id: 'AU012', name: 'AIスケジューリング・管理ツールTOP3', criteria: 'adjustedTenScore', limit: 3, filters: { category: 'AI Scheduling' } },
    
    // 初心者向け・簡単操作
    { id: 'AU013', name: '初心者におすすめAIツールTOP10', criteria: 'simplicity', limit: 10, filters: {} },
    { id: 'AU014', name: '即効性重視AIツールTOP10', criteria: 'immediacy', limit: 10, filters: {} },
    { id: 'AU015', name: 'コスパ最強AIツールTOP10', criteria: 'costPerformance', limit: 10, filters: {} },
    
    // 人気・認知度
    { id: 'AU016', name: '人気AIツールTOP10', criteria: 'popularity', limit: 10, filters: {} },
    { id: 'AU017', name: '話題のAIツールTOP15', criteria: 'adjustedTenScore', limit: 15, filters: { releaseYear: '2024' } },
    
    // 無料・有料別
    { id: 'AU018', name: '無料で使えるAIツールTOP10', criteria: 'adjustedTenScore', limit: 10, filters: { hasFreeVersion: true } },
    { id: 'AU019', name: '有料でも使う価値があるAIツールTOP10', criteria: 'adjustedTenScore', limit: 10, filters: { isPaidOnly: true } },
    { id: 'AU020', name: '日本語完全対応AIツールTOP10', criteria: 'adjustedTenScore', limit: 10, filters: { supportsJapanese: true } }
  ],
  
  // 開発者向け（15パターン）
  developers: [
    // コーディング支援
    { id: 'DEV001', name: 'コーディング支援AITOP10', criteria: 'adjustedTenScore', limit: 10, filters: { category: '開発支援・コーディング' } },
    { id: 'DEV002', name: 'GitHub Copilot代替ツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: '開発支援・コーディング' } },
    { id: 'DEV003', name: '無料コーディング支援AITOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: '開発支援・コーディング', hasFreeVersion: true } },
    
    // API・統合
    { id: 'DEV004', name: '開発者向けAI APIサービス比較TOP5', criteria: 'adjustedTenScore', limit: 5, filters: { hasAPIAccess: true } },
    { id: 'DEV005', name: '企業導入向けAIツールTOP10', criteria: 'adjustedTenScore', limit: 10, filters: { isEnterpriseReady: true } },
    
    // 生産性・効率化
    { id: 'DEV006', name: '開発効率向上AITOP10', criteria: 'productivityGain', limit: 10, filters: { targetUser: 'developer' } },
    { id: 'DEV007', name: 'VSCode拡張対応AIツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { hasVSCodeExtension: true } },
    
    // 専門特化
    { id: 'DEV008', name: 'Python開発支援AITOP5', criteria: 'adjustedTenScore', limit: 5, filters: { supportsPython: true } },
    { id: 'DEV009', name: 'JavaScript・TypeScript支援AITOP5', criteria: 'adjustedTenScore', limit: 5, filters: { supportsJavaScript: true } },
    { id: 'DEV010', name: 'Web開発支援AITOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: 'AI Webデザイン・開発' } },
    
    // 学習・スキルアップ
    { id: 'DEV011', name: '学習・教育向けAIツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { isEducational: true } },
    { id: 'DEV012', name: 'コードレビュー・品質向上AITOP3', criteria: 'adjustedTenScore', limit: 3, filters: { hasCodeReview: true } },
    
    // 新興・注目
    { id: 'DEV013', name: '2024年注目の開発支援AITOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: '開発支援・コーディング', releaseYear: '2024' } },
    { id: 'DEV014', name: 'オープンソース系AIツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { isOpenSource: true } },
    { id: 'DEV015', name: '開発者満足度の高いAIツールTOP10', criteria: 'specialization', limit: 10, filters: { targetUser: 'developer' } }
  ],
  
  // クリエイター向け（15パターン）
  creators: [
    // 画像・デザイン
    { id: 'CR001', name: 'AI画像生成ツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: 'AI画像生成' } },
    { id: 'CR002', name: 'AI画像編集・加工ツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: 'AI 画像編集・加工' } },
    { id: 'CR003', name: 'AIロゴ・ブランドデザインTOP3', criteria: 'adjustedTenScore', limit: 3, filters: { category: 'AI ロゴ・ブランドデザイン' } },
    
    // 動画・音声
    { id: 'CR004', name: 'AI動画生成・編集ツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: 'AI動画生成・編集' } },
    { id: 'CR005', name: 'AI音声・ナレーション生成TOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: '音声生成・クローニング' } },
    { id: 'CR006', name: 'AI動画録画・配信支援TOP3', criteria: 'adjustedTenScore', limit: 3, filters: { category: 'AI Video Recording' } },
    
    // 文章・コンテンツ
    { id: 'CR007', name: 'クリエイター向けAI文章生成TOP5', criteria: 'adjustedTenScore', limit: 5, filters: { category: 'AI Writing Assistance', targetUser: 'creator' } },
    { id: 'CR008', name: 'ブログ・記事作成AITOP5', criteria: 'adjustedTenScore', limit: 5, filters: { contentType: 'blog' } },
    
    // 統合・複合
    { id: 'CR009', name: '統合クリエイティブAIプラットフォームTOP3', criteria: 'adjustedTenScore', limit: 3, filters: { isIntegratedPlatform: true } },
    { id: 'CR010', name: 'マルチメディア対応AIツールTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { supportsMultimedia: true } },
    
    // 特殊・ニッチ
    { id: 'CR011', name: 'AIネーミング・命名支援TOP3', criteria: 'adjustedTenScore', limit: 3, filters: { category: 'AI 会社名・ブランド名生成' } },
    { id: 'CR012', name: 'プレゼン・資料作成AITOP3', criteria: 'adjustedTenScore', limit: 3, filters: { category: 'プレゼンテーション・資料作成' } },
    
    // 効率・生産性
    { id: 'CR013', name: 'クリエイター生産性向上AITOP10', criteria: 'productivityGain', limit: 10, filters: { targetUser: 'creator' } },
    { id: 'CR014', name: '低コスト・高品質AIツールTOP10', criteria: 'costPerformance', limit: 10, filters: { targetUser: 'creator' } },
    { id: 'CR015', name: 'SNS投稿向けAIツールTOP10', criteria: 'adjustedTenScore', limit: 10, filters: { platform: 'social' } }
  ],

  // 横断的ランキング（全ターゲット共通・10パターン）
  universal: [
    // 能力別ランキング
    { id: 'UN001', name: '簡単さNo.1 AIツールTOP15', criteria: 'simplicity', limit: 15, filters: {} },
    { id: 'UN002', name: 'コスパ最強AIツールTOP15', criteria: 'costPerformance', limit: 15, filters: {} },
    { id: 'UN003', name: '生産性向上AIツールTOP15', criteria: 'productivityGain', limit: 15, filters: {} },
    { id: 'UN004', name: '人気度No.1 AIツールTOP15', criteria: 'popularity', limit: 15, filters: {} },
    { id: 'UN005', name: '即効性No.1 AIツールTOP15', criteria: 'immediacy', limit: 15, filters: {} },
    { id: 'UN006', name: '専門性の高いAIツールTOP15', criteria: 'specialization', limit: 15, filters: {} },
    
    // 総合・特別
    { id: 'UN007', name: 'AIツール総合ランキングTOP30', criteria: 'adjustedTenScore', limit: 30, filters: {} },
    { id: 'UN008', name: '2025年最注目AIツールTOP20', criteria: 'adjustedTenScore', limit: 20, filters: { isLatest: true } },
    { id: 'UN009', name: '万能AIツールTOP10', criteria: 'adjustedTenScore', limit: 10, filters: { isVersatile: true } },
    { id: 'UN010', name: 'AIツール殿堂入りTOP5', criteria: 'adjustedTenScore', limit: 5, filters: { isHallOfFame: true } }
  ]
};

// エクスポート
module.exports = AI_TOOLS_RANKING_PATTERNS;