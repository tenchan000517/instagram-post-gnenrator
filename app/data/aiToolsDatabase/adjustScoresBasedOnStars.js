const fs = require('fs');

// マスターデータを読み込み
const data = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf8'));

// スコア調整マッピング（★評価に基づく）
const scoreAdjustments = [
  // ★★★★★ツール (550-580点推奨)
  { name: 'Claude', newScore: 570, reason: '★★★★★評価に相応しい最高評価' },
  
  // ★★★★ツール (520-549点推奨) - 現在低すぎるもの
  { name: 'Perplexity', newScore: 535, reason: '★★★★評価、検索AI分野のリーダー' },
  { name: 'Microsoft 365 Copilot', newScore: 535, reason: '★★★★評価、統合生産性AI' },
  { name: 'Descript', newScore: 530, reason: '★★★★評価、動画編集AI' },
  { name: 'Fish Audio', newScore: 530, reason: '★★★★評価、音声生成専門' },
  { name: 'DALL-E 3', newScore: 530, reason: '★★★★評価、画像生成AI' },
  { name: 'Stable Diffusion', newScore: 530, reason: '★★★★評価、画像生成AI' },
  { name: 'Jasper', newScore: 525, reason: '★★★★評価、コンテンツ生成' },
  { name: 'Character.AI', newScore: 525, reason: '★★★★評価、チャットボット' },
  { name: 'Writesonic', newScore: 525, reason: '★★★★評価、コンテンツ生成' },
  { name: 'Midjourney', newScore: 535, reason: '★★★★評価、画像生成AI最高品質' },
  { name: 'ComfyUI', newScore: 520, reason: '★★★★評価、オープンソース画像生成' },
  { name: 'Manus', newScore: 520, reason: '★★★★評価、汎用自律AI' },
  
  // 高スコアなのに★が少ないもの（少し下方修正）
  { name: 'Remove.bg', newScore: 530, reason: '★1だが特化ツールとして優秀' },
  { name: 'Namelix', newScore: 520, reason: '★1だが専門分野で高評価' },
  
  // ★★★評価で適切なもの（軽微な上方修正）
  { name: 'Pictory', newScore: 485, reason: '★★★評価に合わせて微上方修正' },
  { name: 'Runway Gen-3', newScore: 480, reason: '★★★評価に合わせて微上方修正' },
  { name: 'CrewAI', newScore: 480, reason: '★★★評価、開発支援フレームワーク' },
  { name: 'Obsidian', newScore: 470, reason: '★★★評価、知識管理ツール' },
  
  // GitHub Copilot、Grammarly等の調整（★★評価だが高品質）
  { name: 'GitHub Copilot', newScore: 545, reason: '開発支援分野トップ、★★から★★★★へ' },
  { name: 'Grammarly', newScore: 540, reason: 'Writing支援分野トップ、★★から★★★★へ' }
];

console.log('=== スコア調整開始 ===');

// バックアップを作成
fs.writeFileSync('aiToolsMasterData_before_star_adjustment.json', JSON.stringify(data, null, 2));

let adjustedCount = 0;

// スコア調整を適用
data.tools = data.tools.map(tool => {
  const adjustment = scoreAdjustments.find(adj => adj.name === tool.toolName);
  
  if (adjustment) {
    const oldScore = tool.tenEvaluation.totalScore;
    const scoreDiff = adjustment.newScore - oldScore;
    
    // 各項目のスコアを均等に調整
    const perItemAdjustment = Math.round(scoreDiff / 6);
    
    const newEvaluation = {
      immediacy: Math.max(40, Math.min(100, tool.tenEvaluation.immediacy + perItemAdjustment)),
      simplicity: Math.max(40, Math.min(100, tool.tenEvaluation.simplicity + perItemAdjustment)),
      popularity: Math.max(40, Math.min(100, tool.tenEvaluation.popularity + perItemAdjustment)),
      costPerformance: Math.max(40, Math.min(100, tool.tenEvaluation.costPerformance + perItemAdjustment)),
      specialization: Math.max(40, Math.min(100, tool.tenEvaluation.specialization + perItemAdjustment)),
      productivityGain: Math.max(40, Math.min(100, tool.tenEvaluation.productivityGain + perItemAdjustment))
    };
    
    // 実際の合計を計算
    const actualTotal = Object.values(newEvaluation).reduce((sum, val) => sum + val, 0);
    
    console.log(`${tool.toolName}: ${oldScore}点 → ${actualTotal}点 (${adjustment.reason})`);
    adjustedCount++;
    
    return {
      ...tool,
      tenEvaluation: {
        ...newEvaluation,
        totalScore: actualTotal
      }
    };
  }
  
  return tool;
});

// 調整されたデータを保存
fs.writeFileSync('aiToolsMasterData.json', JSON.stringify(data, null, 2));

console.log(`\n✅ ${adjustedCount}ツールのスコアを調整しました`);
console.log('調整後のマスターデータを保存しました');

// 調整結果のサマリー
console.log('\n=== 調整結果サマリー ===');
const adjustedTools = data.tools.filter(tool => 
  scoreAdjustments.some(adj => adj.name === tool.toolName)
);

// スコア順でソート
adjustedTools.sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);

adjustedTools.forEach((tool, index) => {
  console.log(`${index + 1}. ${tool.toolName}: ${tool.tenEvaluation.totalScore}点`);
});