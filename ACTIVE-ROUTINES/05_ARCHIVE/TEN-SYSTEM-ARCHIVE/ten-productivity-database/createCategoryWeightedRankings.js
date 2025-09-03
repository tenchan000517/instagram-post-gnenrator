const fs = require('fs');

// AIツール用カテゴリ重要度定義
const AI_TOOLS_CATEGORY_WEIGHTS = {
  // 汎用・統合系 (最重要)
  "汎用AIアシスタント": 1.0,
  "AI検索・統合アシスタント": 1.0,
  "マルチAIプラットフォーム": 1.0,
  "Integrated Productivity AI": 1.0,
  
  // 研究・開発環境 (高重要)
  "AI研究・実行環境": 0.95,
  "AI モデル実行プラットフォーム": 0.95,
  "AIモデルプラットフォーム・コミュニティ": 0.95,
  "開発支援・コーディング": 0.9,
  "AI API・開発者向けプラットフォーム": 0.9,
  
  // コンテンツ生成 (中重要)
  "AI Writing Assistance": 0.85,
  "AI Content Generation": 0.85,
  "文書作成・ナレッジマネジメント": 0.85,
  "ナレッジマネジメント": 0.8,
  "AI画像生成": 0.8,
  "AI動画生成": 0.8,
  "AI動画生成・編集": 0.8,
  
  // 統合クリエイティブ (中重要)
  "AI統合デザインプラットフォーム": 0.75,
  "Integrated AI Creative Suite": 0.75,
  "AI-Powered Design Platform": 0.75,
  
  // ワークフロー・業務支援 (中重要)
  "ワークフロー自動化": 0.7,
  "AI Workflow Automation": 0.7,
  "AI Scheduling": 0.65,
  
  // 専門・特化ツール (低重要)
  "AI Webデザイン・開発": 0.6,
  "AI ロゴ・ブランドデザイン": 0.5,  // 過度に上位に来ている
  "AI 画像編集・加工": 0.5,          // Remove.bg問題の原因
  "AI 会社名・ブランド名生成": 0.45,
  "AI音声認識・文字起こし": 0.4,
  "AIマインドマップ生成": 0.4,
  "AI Video/Audio Editing": 0.4,
  "AI Video Recording": 0.4,
  "AI チャットボット・キャラクター": 0.35,
  
  // エンタープライズ専用 (調整対象)
  "Enterprise AI API": 0.8,
  "Enterprise AI API Platform": 0.8,
  "Open Source AI Image Generation": 0.7,
  
  // 未分類・その他
  "AI Image Generation": 0.6,
  "AI検索・チャット": 0.65
};

function adjustRankingsWithCategoryWeights(data) {
  console.log('🔧 カテゴリ重要度補正ランキング生成開始...');
  
  const tools = data.tools.filter(t => t.tenEvaluation && t.tenEvaluation.totalScore > 0);
  
  // 重要度補正スコア計算
  const adjustedTools = tools.map(tool => {
    const originalScore = tool.tenEvaluation.totalScore;
    const categoryWeight = AI_TOOLS_CATEGORY_WEIGHTS[tool.category] || 0.3; // 未定義カテゴリは低重要度
    const adjustedScore = originalScore * categoryWeight;
    
    return {
      ...tool,
      originalTenScore: originalScore,
      categoryWeight: categoryWeight,
      adjustedTenScore: Math.round(adjustedScore * 100) / 100,
      adjustmentInfo: {
        category: tool.category,
        originalRank: null, // 後で設定
        adjustedRank: null  // 後で設定
      }
    };
  });
  
  // 元のランキング設定
  const originalRanked = [...tools].sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);
  originalRanked.forEach((tool, index) => {
    const adjustedTool = adjustedTools.find(t => t.id === tool.id);
    if (adjustedTool) {
      adjustedTool.adjustmentInfo.originalRank = index + 1;
    }
  });
  
  // 補正後ランキング
  const adjustedRanked = adjustedTools.sort((a, b) => b.adjustedTenScore - a.adjustedTenScore);
  adjustedRanked.forEach((tool, index) => {
    tool.adjustmentInfo.adjustedRank = index + 1;
  });
  
  return {
    metadata: {
      adjustmentDate: new Date().toISOString().split('T')[0],
      totalTools: adjustedRanked.length,
      adjustmentMethod: "category-weighted-ranking",
      categoryWeights: AI_TOOLS_CATEGORY_WEIGHTS
    },
    rankings: {
      top10: adjustedRanked.slice(0, 10),
      top20: adjustedRanked.slice(0, 20),
      full: adjustedRanked
    }
  };
}

function generateAdjustmentReport(originalData, adjustedResults) {
  console.log('\n📊 ランキング調整レポート生成...');
  
  const top10Original = originalData.tools
    .filter(t => t.tenEvaluation && t.tenEvaluation.totalScore > 0)
    .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore)
    .slice(0, 10);
    
  const top10Adjusted = adjustedResults.rankings.top10;
  
  console.log('\n=== 調整前 TOP 10 ===');
  top10Original.forEach((tool, i) => {
    console.log(`${i+1}. ${tool.toolName} [${tool.category}] - ${tool.tenEvaluation.totalScore}`);
  });
  
  console.log('\n=== 調整後 TOP 10 ===');
  top10Adjusted.forEach((tool, i) => {
    const rankChange = tool.adjustmentInfo.originalRank - tool.adjustmentInfo.adjustedRank;
    const changeIcon = rankChange > 0 ? '↑' : rankChange < 0 ? '↓' : '=';
    console.log(`${i+1}. ${tool.toolName} [${tool.category}] - ${tool.adjustedTenScore} ${changeIcon}${Math.abs(rankChange)}`);
  });
  
  // カテゴリ分散改善確認
  console.log('\n=== カテゴリ分散改善 ===');
  const originalCategories = {};
  const adjustedCategories = {};
  
  top10Original.forEach(tool => {
    originalCategories[tool.category] = (originalCategories[tool.category] || 0) + 1;
  });
  
  top10Adjusted.forEach(tool => {
    adjustedCategories[tool.category] = (adjustedCategories[tool.category] || 0) + 1;
  });
  
  console.log('調整前カテゴリ分布:', originalCategories);
  console.log('調整後カテゴリ分布:', adjustedCategories);
  
  return {
    originalTop10: top10Original,
    adjustedTop10: top10Adjusted,
    categoryDistribution: {
      original: originalCategories,
      adjusted: adjustedCategories
    }
  };
}

// メイン実行
try {
  console.log('🚀 AIツールランキング カテゴリ重要度補正 開始');
  
  // データ読み込み
  const rawData = fs.readFileSync('aiToolsMasterData.json', 'utf8');
  const originalData = JSON.parse(rawData);
  
  // 補正実行
  const adjustedResults = adjustRankingsWithCategoryWeights(originalData);
  
  // レポート生成
  const report = generateAdjustmentReport(originalData, adjustedResults);
  
  // 調整済みランキング保存
  fs.writeFileSync('aiToolsRankings_CategoryAdjusted.json', JSON.stringify(adjustedResults, null, 2));
  
  // レポート保存
  fs.writeFileSync('ranking_adjustment_report.json', JSON.stringify({
    ...report,
    metadata: adjustedResults.metadata
  }, null, 2));
  
  console.log('\n✅ カテゴリ重要度補正完了');
  console.log('📁 出力ファイル:');
  console.log('  - aiToolsRankings_CategoryAdjusted.json');
  console.log('  - ranking_adjustment_report.json');
  
} catch (error) {
  console.error('❌ エラー発生:', error.message);
  process.exit(1);
}