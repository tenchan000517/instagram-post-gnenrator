const fs = require('fs');

// マスターデータを読み込み
const data = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf8'));

// トータルスコア順にシンプルにソート（補正なし）
const sortedTools = data.tools
  .filter(tool => tool.tenEvaluation && tool.tenEvaluation.totalScore) // スコアがあるもののみ
  .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);

// Markdownファイルの内容を生成
let markdown = `# AIツール全ランキングV2（補正なし・純粋なトータルスコア順）

生成日時: ${new Date().toISOString().split('T')[0]}
総ツール数: ${sortedTools.length}ツール
調整基準: ★評価フィードバックを反映したスコア

## 📊 完全ランキング一覧（トータルスコア順）

`;

// ランキング生成
sortedTools.forEach((tool, index) => {
  const rank = index + 1;
  const score = tool.tenEvaluation.totalScore;
  const toolName = tool.toolName;
  const category = tool.category;
  
  // 人気度に基づいて自動で星を付ける
  let stars = '';
  if (tool.tenEvaluation.popularity >= 95) {
    stars = '★★★★★';
  } else if (tool.tenEvaluation.popularity >= 85) {
    stars = '★★★★';
  } else if (tool.tenEvaluation.popularity >= 75) {
    stars = '★★★';
  } else if (tool.tenEvaluation.popularity >= 65) {
    stars = '★★';
  } else if (tool.tenEvaluation.popularity >= 50) {
    stars = '★';
  }
  
  markdown += `${rank}. ${toolName} - ${score}点 [${category}]　${stars}\n`;
});

// スコア分布統計を追加
const scoreRanges = [
  { range: '570点以上', tools: sortedTools.filter(t => t.tenEvaluation.totalScore >= 570) },
  { range: '550-569点', tools: sortedTools.filter(t => t.tenEvaluation.totalScore >= 550 && t.tenEvaluation.totalScore < 570) },
  { range: '530-549点', tools: sortedTools.filter(t => t.tenEvaluation.totalScore >= 530 && t.tenEvaluation.totalScore < 550) },
  { range: '520-529点', tools: sortedTools.filter(t => t.tenEvaluation.totalScore >= 520 && t.tenEvaluation.totalScore < 530) },
  { range: '510-519点', tools: sortedTools.filter(t => t.tenEvaluation.totalScore >= 510 && t.tenEvaluation.totalScore < 520) },
  { range: '500-509点', tools: sortedTools.filter(t => t.tenEvaluation.totalScore >= 500 && t.tenEvaluation.totalScore < 510) },
  { range: '490-499点', tools: sortedTools.filter(t => t.tenEvaluation.totalScore >= 490 && t.tenEvaluation.totalScore < 500) },
  { range: '480-489点', tools: sortedTools.filter(t => t.tenEvaluation.totalScore >= 480 && t.tenEvaluation.totalScore < 490) },
  { range: '470-479点', tools: sortedTools.filter(t => t.tenEvaluation.totalScore >= 470 && t.tenEvaluation.totalScore < 480) },
  { range: '450-469点', tools: sortedTools.filter(t => t.tenEvaluation.totalScore >= 450 && t.tenEvaluation.totalScore < 470) }
];

markdown += `
## 📈 統計情報

### スコア分布
`;

scoreRanges.forEach(({range, tools}) => {
  if (tools.length > 0) {
    markdown += `- ${range}: ${tools.length}ツール\n`;
  }
});

// カテゴリ別集計
const categoryCount = {};
sortedTools.forEach(tool => {
  if (!categoryCount[tool.category]) {
    categoryCount[tool.category] = 0;
  }
  categoryCount[tool.category]++;
});

markdown += `
### カテゴリ別ツール数
`;

// カテゴリをツール数順にソート
const sortedCategories = Object.entries(categoryCount)
  .sort((a, b) => b[1] - a[1]);

sortedCategories.forEach(([category, count]) => {
  markdown += `- ${category}: ${count}ツール\n`;
});

// TOP10とボトム10
markdown += `
### TOP10平均スコア
${(sortedTools.slice(0, 10).reduce((sum, t) => sum + t.tenEvaluation.totalScore, 0) / 10).toFixed(1)}点

### 全体平均スコア
${(sortedTools.reduce((sum, t) => sum + t.tenEvaluation.totalScore, 0) / sortedTools.length).toFixed(1)}点

### 最高スコア
${sortedTools[0].toolName}: ${sortedTools[0].tenEvaluation.totalScore}点

### 最低スコア
${sortedTools[sortedTools.length - 1].toolName}: ${sortedTools[sortedTools.length - 1].tenEvaluation.totalScore}点

---

**注記**: このランキングは純粋にtenEvaluationのtotalScore順で並べています。
カテゴリ重要度補正や手動調整は一切適用していません。
★評価は各ツールのpopularityスコアに基づいて自動付与されています。
`;

// ファイルを保存
fs.writeFileSync('AIツール全ランキング完全版V2.md', markdown);

console.log('✅ AIツール全ランキング完全版V2.md を作成しました');
console.log(`総ツール数: ${sortedTools.length}`);
console.log(`最高スコア: ${sortedTools[0].toolName} (${sortedTools[0].tenEvaluation.totalScore}点)`);
console.log(`最低スコア: ${sortedTools[sortedTools.length - 1].toolName} (${sortedTools[sortedTools.length - 1].tenEvaluation.totalScore}点)`);
console.log(`平均スコア: ${(sortedTools.reduce((sum, t) => sum + t.tenEvaluation.totalScore, 0) / sortedTools.length).toFixed(1)}点`);