const fs = require('fs');

// 真のAIツール用カテゴリ重要度定義（クリーンアップ後専用）
const AI_TOOLS_CATEGORY_WEIGHTS = {
  // 汎用AI（最重要度）
  "AI会話・アシスタント": 1.0,           // ChatGPT, Gemini等
  
  // 開発・ビジネス支援（高重要度）
  "開発支援・コーディング": 0.95,        // GitHub Copilot等
  "AI Writing Assistance": 0.9,          // 文章作成支援
  "検索・情報収集": 0.85,               // Perplexity等
  "AI Workflow Automation": 0.8,         // ワークフロー自動化
  
  // コンテンツ生成（中重要度）
  "音声生成・クローニング": 0.75,        // ElevenLabs等
  "音声生成・処理": 0.75,               // Fish Audio等
  "AI音声認識・文字起こし": 0.7,        // Otter.ai等
  "音声認識・転写": 0.7,                // Deepgram等
  "テキスト読み上げ": 0.65,             // Speechify等
  "AI Video Recording": 0.6,            // 動画録画
  "AI Scheduling": 0.6,                 // スケジューリング
  
  // 特化ツール（低重要度）★補正対象
  "AI 画像編集・加工": 0.5,             // Remove.bg等 - 上位進出抑制
  "AI ロゴ・ブランドデザイン": 0.45,     // Looka等
  "AI 会社名・ブランド名生成": 0.4,      // Namelix等
  
  // 未分類
  "undefined": 0.3                       // カテゴリ未定義は低重要度
};

function applyFinalCategoryWeights(data) {
  console.log('🔧 最終カテゴリ重要度補正システム 開始...');
  console.log(`対象ツール数: ${data.tools.length}`);
  
  const tools = data.tools.filter(t => t.tenEvaluation && t.tenEvaluation.totalScore > 0);
  console.log(`評価済みツール: ${tools.length}`);
  
  // 重要度補正スコア計算
  const adjustedTools = tools.map(tool => {
    const originalScore = tool.tenEvaluation.totalScore;
    const category = tool.category || 'undefined';
    const categoryWeight = AI_TOOLS_CATEGORY_WEIGHTS[category] || 0.3;
    const adjustedScore = originalScore * categoryWeight;
    
    return {
      ...tool,
      originalTenScore: originalScore,
      categoryWeight: categoryWeight,
      adjustedTenScore: Math.round(adjustedScore * 100) / 100,
      adjustmentInfo: {
        category: category,
        originalRank: null,
        adjustedRank: null,
        rankChange: null
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
    tool.adjustmentInfo.rankChange = tool.adjustmentInfo.originalRank - tool.adjustmentInfo.adjustedRank;
  });
  
  return {
    metadata: {
      adjustmentDate: new Date().toISOString().split('T')[0],
      totalTools: adjustedRanked.length,
      adjustmentMethod: "cleaned-ai-tools-category-weighted-ranking",
      categoryWeights: AI_TOOLS_CATEGORY_WEIGHTS,
      purpose: "特化ツール（Remove.bg等）上位抑制・汎用AI（ChatGPT等）優先",
      sourceData: "aiToolsMasterData_Cleaned.json"
    },
    rankings: {
      top10: adjustedRanked.slice(0, 10),
      top15: adjustedRanked.slice(0, 15),
      top20: adjustedRanked.slice(0, 20),
      full: adjustedRanked
    }
  };
}

function generateFinalComparisonReport(cleanedData, adjustedResults) {
  console.log('\\n📊 最終ランキング比較レポート生成...');
  
  const originalTop10 = cleanedData.tools
    .filter(t => t.tenEvaluation && t.tenEvaluation.totalScore > 0)
    .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore)
    .slice(0, 10);
    
  const adjustedTop10 = adjustedResults.rankings.top10;
  
  console.log('\\n=== クリーンアップ後（補正前） TOP 10 ===');
  originalTop10.forEach((tool, i) => {
    const toolName = tool.toolName || 'undefined';
    const category = tool.category || 'undefined';
    console.log(`${i+1}. ${toolName} [${category}] - ${tool.tenEvaluation.totalScore}`);
  });
  
  console.log('\\n=== 最終補正後 TOP 10 ===');
  adjustedTop10.forEach((tool, i) => {
    const toolName = tool.toolName || 'undefined';
    const category = tool.category || 'undefined';
    const rankChange = tool.adjustmentInfo.rankChange;
    const changeIcon = rankChange > 0 ? `↑${rankChange}` : rankChange < 0 ? `↓${Math.abs(rankChange)}` : '=0';
    console.log(`${i+1}. ${toolName} [${category}] - ${tool.adjustedTenScore} ${changeIcon}`);
  });
  
  // 主要変化の確認
  console.log('\\n=== 主要ランキング変化 ===');
  
  const removeBgBefore = originalTop10.findIndex(t => (t.toolName || '').includes('Remove.bg')) + 1;
  const removeBgAfter = adjustedTop10.findIndex(t => (t.toolName || '').includes('Remove.bg')) + 1;
  const chatGPTBefore = originalTop10.findIndex(t => (t.toolName || '').includes('ChatGPT')) + 1;
  const chatGPTAfter = adjustedTop10.findIndex(t => (t.toolName || '').includes('ChatGPT')) + 1;
  
  console.log(`Remove.bg: ${removeBgBefore}位 → ${removeBgAfter}位`);
  console.log(`ChatGPT: ${chatGPTBefore}位 → ${chatGPTAfter}位`);
  
  // 新TOP3の確認
  console.log('\\n=== 新TOP3（理想的順位） ===');
  adjustedTop10.slice(0, 3).forEach((tool, i) => {
    const toolName = tool.toolName || 'undefined';
    console.log(`${i+1}. ${toolName} - ${tool.adjustedTenScore}点`);
  });
  
  return {
    originalTop10,
    adjustedTop10,
    majorChanges: {
      removeBg: { before: removeBgBefore, after: removeBgAfter },
      chatGPT: { before: chatGPTBefore, after: chatGPTAfter }
    }
  };
}

// メイン実行
try {
  console.log('🚀 最終カテゴリ重要度補正システム 開始');
  
  // 元データ読み込み & その場でクリーンアップ適用
  const rawData = fs.readFileSync('aiToolsMasterData.json', 'utf8');
  const originalData = JSON.parse(rawData);
  
  // 非AIツール除外（統合処理）
  const NON_AI_TOOLS = ["Google Colab", "Replit", "InVideo", "Poe", "Hugging Face", "Replicate", "Claude API", "Jupyter AI"];
  const NON_AI_CATEGORIES = ["AI研究・実行環境", "AIモデルプラットフォーム・コミュニティ", "AI モデル実行プラットフォーム", "AI API・開発者向けプラットフォーム", "Enterprise AI API", "Enterprise AI API Platform", "マルチAIプラットフォーム"];
  
  const cleanedData = {
    ...originalData,
    tools: originalData.tools.filter(tool => {
      const toolName = tool.toolName || 'undefined';
      const category = tool.category || 'undefined';
      
      if (NON_AI_TOOLS.includes(toolName)) return false;
      if (NON_AI_CATEGORIES.includes(category)) return false;
      if (toolName === 'undefined' && (category.includes('API') || category.includes('Platform') || category.includes('プラットフォーム'))) return false;
      
      return true;
    })
  };
  
  // 最終カテゴリ重要度補正実行
  const adjustedResults = applyFinalCategoryWeights(cleanedData);
  
  // 比較レポート生成
  const report = generateFinalComparisonReport(cleanedData, adjustedResults);
  
  // 最終補正済みランキング保存
  fs.writeFileSync('aiToolsRankings_Final.json', JSON.stringify(adjustedResults, null, 2));
  
  // 最終レポート保存
  fs.writeFileSync('final_ranking_report.json', JSON.stringify({
    ...report,
    metadata: adjustedResults.metadata
  }, null, 2));
  
  console.log('\\n✅ 最終カテゴリ重要度補正完了');
  console.log('📁 出力ファイル:');
  console.log('  - aiToolsRankings_Final.json (最終補正ランキング)');
  console.log('  - final_ranking_report.json (最終比較レポート)');
  
  console.log('\\n🎯 ミッション完了: Remove.bg特化ツール上位問題の解決');
  
} catch (error) {
  console.error('❌ エラー発生:', error.message);
  process.exit(1);
}