const fs = require('fs');

// 除外対象の非AIツール定義
const NON_AI_TOOLS = {
  // 実行環境・開発環境
  "Google Colab": "実行環境提供のみ",
  "Replit": "開発環境提供のみ",
  "Jupyter AI": "実行環境提供のみ",
  
  // プラットフォーム・インフラ
  "Poe": "他AIへのアクセス提供のみ",
  "Hugging Face": "AIモデルプラットフォーム・インフラ",
  "Replicate": "AIモデル実行プラットフォーム・インフラ",
  
  // API・開発者向けサービス
  "Claude API": "API提供・インフラ",
  "OpenAI API": "API提供・インフラ",
  
  // 非AI動画編集ツール
  "InVideo": "動画編集ツール（AI生成なし）",
  "Loom": "画面録画ツール（AI機能なし）",
  
  // その他インフラ系
  "GitHub": "コード管理プラットフォーム",
  "VS Code": "エディタ（AI機能なし）"
};

// カテゴリベースでの除外判定
const NON_AI_CATEGORIES = [
  "AI研究・実行環境",
  "AIモデルプラットフォーム・コミュニティ", 
  "AI モデル実行プラットフォーム",
  "AI API・開発者向けプラットフォーム",
  "Enterprise AI API",
  "Enterprise AI API Platform",
  "マルチAIプラットフォーム"
];

function filterTrueAITools(data) {
  console.log('🔧 非AIツール除外システム 開始...');
  console.log(`処理前ツール数: ${data.tools.length}`);
  
  const originalTools = [...data.tools];
  const excludedTools = [];
  
  // 除外処理
  const filteredTools = data.tools.filter(tool => {
    const toolName = tool.toolName || 'undefined';
    const category = tool.category || 'undefined';
    
    // 名前ベースでの除外
    if (NON_AI_TOOLS[toolName]) {
      excludedTools.push({
        tool: toolName,
        category: category,
        reason: NON_AI_TOOLS[toolName],
        score: tool.tenEvaluation?.totalScore || 'no score'
      });
      return false;
    }
    
    // カテゴリベースでの除外
    if (NON_AI_CATEGORIES.includes(category)) {
      excludedTools.push({
        tool: toolName,
        category: category,
        reason: `カテゴリ除外: ${category}`,
        score: tool.tenEvaluation?.totalScore || 'no score'
      });
      return false;
    }
    
    // undefined名前の場合、カテゴリで個別判定
    if (toolName === 'undefined') {
      // API・プラットフォーム系カテゴリは除外
      const isInfraCategory = category.includes('API') || 
                             category.includes('Platform') || 
                             category.includes('プラットフォーム');
      if (isInfraCategory) {
        excludedTools.push({
          tool: 'undefined',
          category: category,
          reason: 'undefined名前 + インフラ系カテゴリ',
          score: tool.tenEvaluation?.totalScore || 'no score'
        });
        return false;
      }
    }
    
    return true; // 真のAIツールとして保持
  });
  
  console.log('\\n=== 除外されたツール一覧 ===');
  excludedTools.forEach((excluded, i) => {
    console.log(`${i+1}. ${excluded.tool} [${excluded.category}] - ${excluded.score}`);
    console.log(`   理由: ${excluded.reason}`);
  });
  
  console.log(`\\n📊 除外結果:`);
  console.log(`処理前: ${originalTools.length}ツール`);
  console.log(`除外: ${excludedTools.length}ツール`);
  console.log(`処理後: ${filteredTools.length}ツール`);
  
  // 更新されたデータ構造
  const cleanedData = {
    ...data,
    tools: filteredTools,
    totalTools: filteredTools.length,
    excludedTools: excludedTools,
    excludedCount: excludedTools.length,
    lastCleaned: new Date().toISOString().split('T')[0],
    cleaningNote: "非AIツール（実行環境・プラットフォーム・API）を除外"
  };
  
  return cleanedData;
}

function generateCleanedRanking(cleanedData) {
  console.log('\\n🏆 クリーンアップ後ランキング生成...');
  
  const rankedTools = cleanedData.tools
    .filter(t => t.tenEvaluation && t.tenEvaluation.totalScore > 0)
    .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);
  
  console.log('\\n=== 真のAIツール TOP 15 ===');
  rankedTools.slice(0, 15).forEach((tool, i) => {
    const toolName = tool.toolName || 'undefined';
    console.log(`${i+1}. ${toolName} [${tool.category}] - ${tool.tenEvaluation.totalScore}`);
  });
  
  // カテゴリ分散確認
  console.log('\\n=== TOP 15 カテゴリ分散（クリーンアップ後） ===');
  const categoryDistribution = {};
  rankedTools.slice(0, 15).forEach(tool => {
    const cat = tool.category || 'undefined';
    categoryDistribution[cat] = (categoryDistribution[cat] || 0) + 1;
  });
  
  Object.entries(categoryDistribution)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`${category}: ${count}`);
    });
  
  return rankedTools;
}

// メイン実行
try {
  console.log('🚀 非AIツール除外 & 真のAIツールランキング生成 開始');
  
  // データ読み込み
  const rawData = fs.readFileSync('aiToolsMasterData.json', 'utf8');
  const originalData = JSON.parse(rawData);
  
  // 非AIツール除外
  const cleanedData = filterTrueAITools(originalData);
  
  // クリーンアップ後ランキング生成
  const rankedTools = generateCleanedRanking(cleanedData);
  
  // クリーンアップ済みデータベース保存
  fs.writeFileSync('aiToolsMasterData_Cleaned.json', JSON.stringify(cleanedData, null, 2));
  
  // トップ3の変化確認
  console.log('\\n=== TOP 3 変化確認 ===');
  const originalTop3 = originalData.tools
    .filter(t => t.tenEvaluation && t.tenEvaluation.totalScore > 0)
    .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore)
    .slice(0, 3)
    .map(t => t.toolName || 'undefined');
    
  const cleanedTop3 = rankedTools.slice(0, 3).map(t => t.toolName || 'undefined');
  
  console.log(`除外前 TOP3: ${originalTop3.join(', ')}`);
  console.log(`除外後 TOP3: ${cleanedTop3.join(', ')}`);
  
  console.log('\\n✅ 非AIツール除外完了');
  console.log('📁 出力: aiToolsMasterData_Cleaned.json');
  
} catch (error) {
  console.error('❌ エラー発生:', error.message);
  process.exit(1);
}