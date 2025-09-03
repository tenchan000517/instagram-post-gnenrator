const fs = require('fs');

// マスターデータを読み込み
const data = JSON.parse(fs.readFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData.json', 'utf8'));

console.log('=== Remove.bgのスコア修正 ===');

// Remove.bgを見つけて修正
data.tools = data.tools.map(tool => {
  if (tool.toolName === 'Remove.bg') {
    const oldScore = tool.tenEvaluation.totalScore;
    
    // ★3評価に相応しい532点に設定
    const targetScore = 532;
    const scoreDiff = targetScore - oldScore;
    const perItemAdjustment = Math.round(scoreDiff / 6);
    
    const newEvaluation = {
      immediacy: Math.max(40, Math.min(100, tool.tenEvaluation.immediacy + perItemAdjustment)),
      simplicity: Math.max(40, Math.min(100, tool.tenEvaluation.simplicity + perItemAdjustment)),
      popularity: Math.max(40, Math.min(100, tool.tenEvaluation.popularity + perItemAdjustment)),
      costPerformance: Math.max(40, Math.min(100, tool.tenEvaluation.costPerformance + perItemAdjustment)),
      specialization: Math.max(40, Math.min(100, tool.tenEvaluation.specialization + perItemAdjustment)),
      productivityGain: Math.max(40, Math.min(100, tool.tenEvaluation.productivityGain + perItemAdjustment))
    };
    
    const actualTotal = Object.values(newEvaluation).reduce((sum, val) => sum + val, 0);
    
    console.log(`Remove.bg: ${oldScore}点 → ${actualTotal}点 (★3評価に修正)`);
    
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

// 修正されたデータを保存
fs.writeFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData.json', JSON.stringify(data, null, 2));

console.log('✅ Remove.bgのスコア修正完了');

// 修正後の確認
const removebg = data.tools.find(t => t.toolName === 'Remove.bg');
console.log('修正後のRemove.bgスコア:', removebg.tenEvaluation.totalScore + '点');