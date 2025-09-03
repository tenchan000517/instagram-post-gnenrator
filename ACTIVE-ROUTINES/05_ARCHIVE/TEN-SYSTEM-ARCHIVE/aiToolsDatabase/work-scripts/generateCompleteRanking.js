const fs = require('fs');

// マスターデータを読み込み
const data = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf8'));

// スコア順にソート
const sortedTools = data.tools.sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);

// Markdownファイルの内容を生成
let markdown = `# AIツール全ランキング（補正なし・オリジナルスコア）

生成日時: ${new Date().toISOString().split('T')[0]}
総ツール数: ${data.totalTools}ツール

## 📊 完全ランキング一覧

`;

// ランキング生成
sortedTools.forEach((tool, index) => {
  const rank = index + 1;
  const score = tool.tenEvaluation.totalScore;
  const toolName = tool.toolName;
  const category = tool.category;
  
  // 人気度に基づいて星を付ける
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

// 統計情報を追加
markdown += `
## 📈 統計情報

### カテゴリ別ツール数
`;

// カテゴリ別集計
const categoryCount = {};
sortedTools.forEach(tool => {
  if (!categoryCount[tool.category]) {
    categoryCount[tool.category] = 0;
  }
  categoryCount[tool.category]++;
});

// カテゴリをツール数順にソート
const sortedCategories = Object.entries(categoryCount)
  .sort((a, b) => b[1] - a[1]);

sortedCategories.forEach(([category, count]) => {
  markdown += `- ${category}: ${count}ツール\n`;
});

// スコア分布
markdown += `
### スコア分布
- 550点以上: ${sortedTools.filter(t => t.tenEvaluation.totalScore >= 550).length}ツール
- 500-549点: ${sortedTools.filter(t => t.tenEvaluation.totalScore >= 500 && t.tenEvaluation.totalScore < 550).length}ツール
- 450-499点: ${sortedTools.filter(t => t.tenEvaluation.totalScore >= 450 && t.tenEvaluation.totalScore < 500).length}ツール
- 400-449点: ${sortedTools.filter(t => t.tenEvaluation.totalScore >= 400 && t.tenEvaluation.totalScore < 450).length}ツール
- 400点未満: ${sortedTools.filter(t => t.tenEvaluation.totalScore < 400).length}ツール

### トップ10の平均スコア
${(sortedTools.slice(0, 10).reduce((sum, t) => sum + t.tenEvaluation.totalScore, 0) / 10).toFixed(1)}点

### 全体平均スコア
${(sortedTools.reduce((sum, t) => sum + t.tenEvaluation.totalScore, 0) / sortedTools.length).toFixed(1)}点
`;

// ファイルを保存
fs.writeFileSync('AIツール全ランキング完全版.md', markdown);

console.log('✅ AIツール全ランキング完全版.md を更新しました');
console.log(`総ツール数: ${data.totalTools}`);