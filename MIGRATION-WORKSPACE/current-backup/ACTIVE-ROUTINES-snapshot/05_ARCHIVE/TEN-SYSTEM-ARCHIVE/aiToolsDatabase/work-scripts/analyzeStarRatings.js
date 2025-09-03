const fs = require('fs');

// 完全版から★評価を抽出
const markdownContent = fs.readFileSync('AIツール全ランキング完全版.md', 'utf8');
const lines = markdownContent.split('\n');

// ★評価のパターン
const starRatings = [];

lines.forEach(line => {
  if (line.match(/^\d+\./)) {
    const match = line.match(/^(\d+)\.\s*(.+?)\s*-\s*(\d+)点.*?　(★*)(?:\s*|（.*?）)?$/);
    if (match) {
      const [, rank, toolName, score, stars] = match;
      const starCount = stars.length;
      starRatings.push({
        rank: parseInt(rank),
        toolName: toolName.trim(),
        score: parseInt(score),
        starCount,
        line: line.trim()
      });
    }
  }
});

console.log('=== ★評価分析結果 ===');
console.log(`総ツール数: ${starRatings.length}`);

// ★評価別の分布
const starDistribution = {};
starRatings.forEach(tool => {
  starDistribution[tool.starCount] = (starDistribution[tool.starCount] || 0) + 1;
});

console.log('\n★評価分布:');
Object.entries(starDistribution).sort((a, b) => b[0] - a[0]).forEach(([stars, count]) => {
  console.log(`★${stars}: ${count}ツール`);
});

// スコア範囲別の★評価
console.log('\n=== スコア範囲別★評価 ===');
const scoreRanges = [
  {range: '550-580点', tools: starRatings.filter(t => t.score >= 550)},
  {range: '530-549点', tools: starRatings.filter(t => t.score >= 530 && t.score < 550)},
  {range: '515-529点', tools: starRatings.filter(t => t.score >= 515 && t.score < 530)},
  {range: '500-514点', tools: starRatings.filter(t => t.score >= 500 && t.score < 515)},
  {range: '485-499点', tools: starRatings.filter(t => t.score >= 485 && t.score < 500)},
  {range: '450-484点', tools: starRatings.filter(t => t.score >= 450 && t.score < 485)}
];

scoreRanges.forEach(({range, tools}) => {
  console.log(`\n${range} (${tools.length}ツール):`);
  tools.forEach(tool => {
    console.log(`  ${tool.toolName} (${tool.score}点) → ★${tool.starCount}`);
  });
});

// 異常値を特定（高スコアなのに★が少ない、低スコアなのに★が多い）
console.log('\n=== 不整合の可能性がある評価 ===');

console.log('\n1. 高スコア(520点以上)なのに★が少ない(★★以下):');
starRatings.filter(t => t.score >= 520 && t.starCount <= 2).forEach(tool => {
  console.log(`  ${tool.toolName}: ${tool.score}点 → ★${tool.starCount} (要上方修正)`);
});

console.log('\n2. 中スコア(480-519点)なのに★が多い(★★★★以上):');
starRatings.filter(t => t.score >= 480 && t.score <= 519 && t.starCount >= 4).forEach(tool => {
  console.log(`  ${tool.toolName}: ${tool.score}点 → ★${tool.starCount} (スコア上方修正推奨)`);
});

console.log('\n3. 低スコア(479点以下)なのに★が多い(★★★以上):');
starRatings.filter(t => t.score <= 479 && t.starCount >= 3).forEach(tool => {
  console.log(`  ${tool.toolName}: ${tool.score}点 → ★${tool.starCount} (スコア上方修正推奨)`);
});

// 推奨調整案を出力
console.log('\n=== 推奨スコア調整案 ===');

// ★★★★★ = 550-580点推奨
const fiveStars = starRatings.filter(t => t.starCount === 5);
console.log('\n★★★★★ツール (550-580点推奨):');
fiveStars.forEach(tool => {
  if (tool.score < 550) {
    const recommendedScore = Math.max(550, tool.score + 40);
    console.log(`  ${tool.toolName}: ${tool.score}点 → ${recommendedScore}点に上方修正推奨`);
  } else {
    console.log(`  ${tool.toolName}: ${tool.score}点 (適切)`);
  }
});

// ★★★★ = 520-549点推奨
const fourStars = starRatings.filter(t => t.starCount === 4);
console.log('\n★★★★ツール (520-549点推奨):');
fourStars.forEach(tool => {
  if (tool.score < 520) {
    const recommendedScore = Math.max(520, tool.score + 20);
    console.log(`  ${tool.toolName}: ${tool.score}点 → ${recommendedScore}点に上方修正推奨`);
  } else if (tool.score >= 550) {
    console.log(`  ${tool.toolName}: ${tool.score}点 (★★★★★に変更検討)`);
  } else {
    console.log(`  ${tool.toolName}: ${tool.score}点 (適切)`);
  }
});

// ファイルに保存
fs.writeFileSync('star_rating_analysis.json', JSON.stringify({
  starDistribution,
  scoreRanges,
  recommendations: {
    fiveStars: fiveStars.map(t => ({
      name: t.toolName,
      currentScore: t.score,
      recommendedScore: t.score < 550 ? Math.max(550, t.score + 40) : t.score
    })),
    fourStars: fourStars.map(t => ({
      name: t.toolName,
      currentScore: t.score,
      recommendedScore: t.score < 520 ? Math.max(520, t.score + 20) : t.score
    }))
  }
}, null, 2));

console.log('\n✅ 分析結果をstar_rating_analysis.jsonに保存しました');