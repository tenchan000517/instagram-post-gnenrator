const fs = require('fs');

// マスターデータを読み込み
const data = JSON.parse(fs.readFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData.json', 'utf8'));

console.log('=== 指定4ツールのスコア修正 ===');

// 指定された調整
const specificAdjustments = [
  { name: 'Grammarly', newScore: 530, reason: '指定スコアに調整' },
  { name: 'Manus', newScore: 539, reason: '指定スコアに調整' },
  { name: 'Veo 3', newScore: 532, reason: '指定スコアに調整' },
  { name: 'Gamma', newScore: 538, reason: '指定スコアに調整' }
];

// バックアップを作成
fs.writeFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData_before_specific_adjustment.json', JSON.stringify(data, null, 2));

let adjustedCount = 0;

// スコア調整を適用
data.tools = data.tools.map(tool => {
  const adjustment = specificAdjustments.find(adj => adj.name === tool.toolName);
  
  if (adjustment) {
    const oldScore = tool.tenEvaluation.totalScore;
    const targetScore = adjustment.newScore;
    const scoreDiff = targetScore - oldScore;
    
    // 各項目を調整して正確なスコアに設定
    let newEvaluation = { ...tool.tenEvaluation };
    
    // まず均等に配分
    const baseAdjustment = Math.floor(scoreDiff / 6);
    const remainder = scoreDiff - (baseAdjustment * 6);
    
    newEvaluation.immediacy = Math.max(40, Math.min(100, newEvaluation.immediacy + baseAdjustment));
    newEvaluation.simplicity = Math.max(40, Math.min(100, newEvaluation.simplicity + baseAdjustment));
    newEvaluation.popularity = Math.max(40, Math.min(100, newEvaluation.popularity + baseAdjustment));
    newEvaluation.costPerformance = Math.max(40, Math.min(100, newEvaluation.costPerformance + baseAdjustment));
    newEvaluation.specialization = Math.max(40, Math.min(100, newEvaluation.specialization + baseAdjustment));
    newEvaluation.productivityGain = Math.max(40, Math.min(100, newEvaluation.productivityGain + baseAdjustment));
    
    // 余りを最初の項目に追加
    if (remainder !== 0) {
      newEvaluation.immediacy = Math.max(40, Math.min(100, newEvaluation.immediacy + remainder));
    }
    
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
fs.writeFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData.json', JSON.stringify(data, null, 2));

console.log(`\n✅ ${adjustedCount}ツールのスコアを修正しました`);

// 修正後のTOP15を表示
console.log('\n=== 修正後のTOP15 ===');
const adjustedTools = data.tools
  .filter(tool => tool.tenEvaluation && tool.tenEvaluation.totalScore)
  .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);

adjustedTools.slice(0, 15).forEach((tool, index) => {
  console.log(`${index + 1}. ${tool.toolName}: ${tool.tenEvaluation.totalScore}点`);
});