/**
 * AIツール向けターゲット別ランキングパターン定義 V1
 * TEN DATABASE専用ランキング生成パターン
 * 
 * 【設計思想】
 * - TENキャラクター（T004: 効率化マニア・26-29歳）向けランキング
 * - TEN評価軸活用: 即効性・簡単さ・人気度・コスパ・機能専門性・生産性UP度
 * - 72のAIツールを多角的にランキング化
 * 
 * 【拡張可能設計】
 * - パターン追加・修正が容易な構造
 * - フィルタ条件・ソート基準の柔軟な変更対応
 * - ブラッシュアップによる段階的改善
 */

const AI_TOOLS_TARGET_PATTERNS = {
  
  // ==============================================
  // TEN向けランキングパターン（初期版・30パターン）
  // ==============================================
  
  tenProductive: [
    // 【基本ランキング - TEN評価軸直接活用】8種類
    {
      id: 'TEN001',
      name: 'TENスコア総合ランキングTOP10',
      criteria: 'tenScore',
      limit: 10,
      filters: {},
      description: 'TEN評価軸による総合スコアランキング'
    },
    {
      id: 'TEN002', 
      name: '即効性ランキングTOP10',
      criteria: 'immediacy',
      limit: 10,
      filters: {},
      description: '結果が出るまでの速度重視ランキング'
    },
    {
      id: 'TEN003',
      name: '簡単さランキングTOP10', 
      criteria: 'easiness',
      limit: 10,
      filters: {},
      description: '学習コスト・操作の直感性重視ランキング'
    },
    {
      id: 'TEN004',
      name: '人気度ランキングTOP10',
      criteria: 'popularity', 
      limit: 10,
      filters: {},
      description: 'ユーザー数・市場認知度重視ランキング'
    },
    {
      id: 'TEN005',
      name: 'コスパランキングTOP10',
      criteria: 'costEffectiveness',
      limit: 10, 
      filters: {},
      description: '価格対機能・価値重視ランキング'
    },
    {
      id: 'TEN006',
      name: '機能専門性ランキングTOP10',
      criteria: 'functionalSpecialty',
      limit: 10,
      filters: {},
      description: '独自機能・差別化要素重視ランキング' 
    },
    {
      id: 'TEN007',
      name: '生産性UP度ランキングTOP10',
      criteria: 'productivityBoost',
      limit: 10,
      filters: {},
      description: '実際の作業効率向上重視ランキング'
    },
    {
      id: 'TEN008',
      name: '無料ツールTOP10',
      criteria: 'tenScore',
      limit: 10, 
      filters: { pricingTier: 'free' },
      description: '完全無料で使えるAIツールランキング'
    },

    // 【カテゴリ別ランキング】8種類 ※データに応じて調整予定
    {
      id: 'TEN009',
      name: 'コーディング支援AITOP10',
      criteria: 'tenScore',
      limit: 10,
      filters: { category: 'coding' },
      description: 'プログラミング・開発支援AIツール'
    },
    {
      id: 'TEN010', 
      name: '画像生成AITOP10',
      criteria: 'tenScore',
      limit: 10,
      filters: { category: 'image-generation' },
      description: '画像生成・編集AIツール'
    },
    {
      id: 'TEN011',
      name: 'テキスト処理AITOP10', 
      criteria: 'tenScore',
      limit: 10,
      filters: { category: 'text-processing' },
      description: '文章作成・校正・翻訳AIツール'
    },
    {
      id: 'TEN012',
      name: 'データ分析AITOP10',
      criteria: 'tenScore', 
      limit: 10,
      filters: { category: 'data-analysis' },
      description: 'データ分析・可視化AIツール'
    },
    {
      id: 'TEN013',
      name: '動画制作AITOP10',
      criteria: 'tenScore',
      limit: 10,
      filters: { category: 'video-creation' },
      description: '動画作成・編集AIツール'
    },
    {
      id: 'TEN014', 
      name: 'チャットボット・対話AITOP10',
      criteria: 'tenScore',
      limit: 10,
      filters: { category: 'chatbot' },
      description: '会話・対話型AIツール'
    },
    {
      id: 'TEN015',
      name: 'AI研究・実験環境TOP10',
      criteria: 'tenScore',
      limit: 10, 
      filters: { category: 'research' },
      description: 'AI研究・実験プラットフォーム'
    },
    {
      id: 'TEN016',
      name: 'ビジネス活用AITOP10',
      criteria: 'tenScore',
      limit: 10,
      filters: { category: 'business' },
      description: 'ビジネス特化AIツール'
    },

    // 【価格帯別ランキング】6種類
    {
      id: 'TEN017',
      name: '有料ツール高コスパTOP10',
      criteria: 'costEffectiveness', 
      limit: 10,
      filters: { pricingTier: 'paid', hasFreeVersion: true },
      description: '有料だがコスパに優れるAIツール'
    },
    {
      id: 'TEN018',
      name: 'フリーミアムツールTOP10',
      criteria: 'tenScore',
      limit: 10,
      filters: { hasFreeVersion: true },
      description: '無料プランがあるAIツール'
    },
    {
      id: 'TEN019',
      name: '月額1000円以下ツールTOP10', 
      criteria: 'costEffectiveness',
      limit: 10,
      filters: { maxPrice: 1000 },
      description: '月額1000円以下で使えるAIツール'
    },
    {
      id: 'TEN020',
      name: '初心者向けツールTOP10',
      criteria: 'easiness',
      limit: 10,
      filters: { difficultyLevel: 'beginner' },
      description: '初心者でも簡単に使えるAIツール'
    },
    {
      id: 'TEN021',
      name: '日本語対応ツールTOP10',
      criteria: 'tenScore', 
      limit: 10,
      filters: { supportsJapanese: true },
      description: '日本語に完全対応するAIツール'
    },
    {
      id: 'TEN022',
      name: 'API提供ツールTOP10',
      criteria: 'functionalSpecialty',
      limit: 10,
      filters: { hasAPI: true }, 
      description: 'API連携可能なAIツール'
    },

    // 【複合条件ランキング】8種類 ※ブラッシュアップ重点領域
    {
      id: 'TEN023',
      name: '即効×簡単ツールTOP10',
      criteria: 'immediacy', 
      limit: 10,
      filters: { easinessMin: 80 },
      description: '即効性があり使いやすいAIツール'
    },
    {
      id: 'TEN024',
      name: '高機能×コスパツールTOP10',
      criteria: 'functionalSpecialty',
      limit: 10,
      filters: { costEffectivenessMin: 75 },
      description: '高機能でコスパも良いAIツール'
    },
    {
      id: 'TEN025',
      name: '人気×生産性UPツールTOP10', 
      criteria: 'popularity',
      limit: 10,
      filters: { productivityBoostMin: 80 },
      description: '人気があり生産性向上効果が高いツール'
    },
    {
      id: 'TEN026',
      name: 'Grade A（90点以上）ツールTOP10',
      criteria: 'tenScore',
      limit: 10,
      filters: { tenScoreMin: 90 },
      description: 'TEN評価でGrade Aを獲得したツール'
    },
    {
      id: 'TEN027', 
      name: 'Grade B（80-89点）コスパ重視TOP10',
      criteria: 'costEffectiveness',
      limit: 10,
      filters: { tenScoreMin: 80, tenScoreMax: 89 },
      description: 'Grade Bでコスパに優れるツール'
    },
    {
      id: 'TEN028',
      name: '新進気鋭ツール（2024-2025年）TOP10',
      criteria: 'tenScore',
      limit: 10, 
      filters: { releaseYearMin: 2024 },
      description: '2024年以降にリリースされた新ツール'
    },
    {
      id: 'TEN029',
      name: '定番・老舗ツールTOP10',
      criteria: 'popularity',
      limit: 10,
      filters: { establishedTool: true },
      description: '市場で定評のある定番AIツール' 
    },
    {
      id: 'TEN030',
      name: 'TEN総合おすすめTOP10',
      criteria: 'tenScore', 
      limit: 10,
      filters: { recommendedByTen: true },
      description: 'TENが特におすすめする最強ツール'
    }
  ]
};

// ==============================================
// エクスポート
// ==============================================
module.exports = AI_TOOLS_TARGET_PATTERNS;

// ==============================================
// 設計メモ・ブラッシュアップ対象
// ==============================================

/**
 * 【今後のブラッシュアップ予定】
 * 
 * 1. フィルタ条件の詳細化
 *    - 実際のデータ構造に応じてフィルタ条件を調整
 *    - category値の正確な分類
 *    - 価格帯の具体的な閾値設定
 * 
 * 2. ソート基準の最適化
 *    - tenScore以外の複合的なソート基準
 *    - 重み付きスコア計算の導入
 *    - 複数条件によるランキング精度向上
 * 
 * 3. パターンの拡充
 *    - 30パターン→50パターンへの拡張
 *    - 用途別・シーン別ランキングの追加
 *    - ターゲット細分化（初心者・中級者・上級者）
 * 
 * 4. TENキャラクター特化
 *    - 「めんどくさがり」視点の強化
 *    - 「武士口調」に対応したランキング名
 *    - T004（26-29歳）の具体的ニーズ反映
 */