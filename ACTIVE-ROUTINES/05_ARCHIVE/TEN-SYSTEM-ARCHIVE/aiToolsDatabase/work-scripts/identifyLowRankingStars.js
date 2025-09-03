const fs = require('fs');

// V2ファイルから★4以上で低順位のツールを特定
const v2Content = fs.readFileSync('AIツール全ランキング完全版V2.md', 'utf8');
const lines = v2Content.split('\n');

console.log('=== ★4以上で低順位のツール特定 ===');

const problematicTools = [];

lines.forEach(line => {
  if (line.match(/^\d+\./)) {
    const match = line.match(/^(\d+)\.\s*(.+?)\s*-\s*(\d+)点.*?　(★+)/);
    if (match) {
      const [, rank, toolName, score, stars] = match;
      const rankNum = parseInt(rank);
      const scoreNum = parseInt(score);
      const starCount = stars.length;
      
      // ★4以上なのに16位以下のツールを問題として特定
      if (starCount >= 4 && rankNum > 15) {
        problematicTools.push({
          rank: rankNum,
          toolName: toolName.trim(),
          score: scoreNum,
          starCount,
          targetScore: Math.max(535, scoreNum + (20 - rankNum) * 2) // TOP15に入るスコア
        });
      }
    }
  }
});

console.log(`見つかった問題ツール: ${problematicTools.length}個\n`);

problematicTools.forEach(tool => {
  console.log(`${tool.rank}位: ${tool.toolName} (${tool.score}点) ★${tool.starCount} → 推奨スコア: ${tool.targetScore}点`);
});

// 具体的な調整案
console.log('\n=== 具体的な調整案 ===');
const adjustments = [
  { name: 'Remove.bg', currentScore: 532, newScore: 545, reason: '★4評価、特化ツールとして評価UP' },
  { name: 'Veo 3', currentScore: 530, newScore: 550, reason: '★4評価、最新動画生成AI' },
  { name: 'Midjourney', currentScore: 528, newScore: 550, reason: '★4評価、画像生成AI最高品質' },
  { name: 'Fish Audio', currentScore: 528, newScore: 545, reason: '★4評価、音声生成専門分野リーダー' },
  { name: 'Writesonic', currentScore: 524, newScore: 540, reason: '★4評価、コンテンツ生成AI' },
  { name: 'Jasper', currentScore: 523, newScore: 540, reason: '★4評価、エンタープライズ向けAI' },
  { name: 'Character.AI', currentScore: 523, newScore: 535, reason: '★4評価、チャットボットAI' },
  { name: 'Calendly', currentScore: 520, newScore: 535, reason: '★4評価、スケジューリング自動化' },
  { name: 'Manus', currentScore: 513, newScore: 540, reason: '★4評価、汎用自律AIエージェント' },
  { name: 'Zapier', currentScore: 515, newScore: 535, reason: '★4評価、ワークフロー自動化リーダー' },
  { name: 'Gamma', currentScore: 515, newScore: 535, reason: '★4評価、プレゼンテーション生成AI' },
  { name: 'Upscale.media', currentScore: 515, newScore: 530, reason: '★4評価、画像アップスケーリング' }
];

adjustments.forEach(adj => {
  const increase = adj.newScore - adj.currentScore;
  console.log(`${adj.name}: ${adj.currentScore}点 → ${adj.newScore}点 (+${increase}点) - ${adj.reason}`);
});

console.log('\n=== 期待される新TOP15 ===');
// 調整後の予想順位
const expectedTop15 = [
  'Claude (570点)',
  'ChatGPT (560点)', 
  'Genspark (555点)',
  'Veo 3 (550点)', // UP
  'Midjourney (550点)', // UP
  'GitHub Copilot (547点)',
  'Fish Audio (545点)', // UP
  'Remove.bg (545点)', // UP
  'Grammarly (542点)',
  'tl;dv (540点)',
  'Writesonic (540点)', // UP
  'Jasper (540点)', // UP
  'Manus (540点)', // UP
  'Gemini (535点)',
  'Calendly (535点)' // UP
];

expectedTop15.forEach((tool, index) => {
  console.log(`${index + 1}. ${tool}`);
});

// 調整データを保存
fs.writeFileSync('star4_adjustments.json', JSON.stringify(adjustments, null, 2));

console.log('\n✅ 調整案をstar4_adjustments.jsonに保存しました');