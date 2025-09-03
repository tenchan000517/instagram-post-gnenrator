const fs = require('fs');

// マスターデータを読み込み
const data = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf8'));

// ★4以上ツールの大幅スコア調整
const majorBoosts = [
  // TOP10入りを目指すツール
  { name: 'Veo 3', newScore: 550, reason: '★4評価、最新動画生成AI - Google DeepMind製' },
  { name: 'Midjourney', newScore: 550, reason: '★4評価、画像生成AI最高品質' },
  { name: 'Fish Audio', newScore: 545, reason: '★4評価、音声生成専門分野で高評価' },
  { name: 'Remove.bg', newScore: 545, reason: '★4評価、背景除去専門ツール' },
  
  // TOP15入りを目指すツール
  { name: 'Writesonic', newScore: 540, reason: '★4評価、コンテンツ生成AIリーダー' },
  { name: 'Jasper', newScore: 540, reason: '★4評価、エンタープライズ向けAI' },
  { name: 'Manus', newScore: 540, reason: '★4評価、汎用自律AIエージェント' },
  { name: 'Character.AI', newScore: 535, reason: '★4評価、チャットボットAI' },
  { name: 'Calendly', newScore: 535, reason: '★4評価、スケジューリング自動化' },
  { name: 'Zapier', newScore: 535, reason: '★4評価、ワークフロー自動化リーダー' },
  { name: 'Gamma', newScore: 535, reason: '★4評価、プレゼンテーション生成AI' },
  { name: 'Notion AI', newScore: 535, reason: '★4評価、統合生産性プラットフォーム' },
  { name: 'Synthesia', newScore: 535, reason: '★4評価、AI動画生成' },
  { name: 'Murf', newScore: 535, reason: '★4評価、音声生成ツール' },
  
  // 適度な調整
  { name: 'Claude Code', newScore: 530, reason: '★4評価、開発支援ツール' },
  { name: 'Runway Gen-3', newScore: 530, reason: '★4評価、動画生成・編集' },
  { name: 'CrewAI', newScore: 525, reason: '★4評価、マルチエージェントフレームワーク' },
  { name: 'Upscale.media', newScore: 530, reason: '★4評価、画像アップスケーリング' }
];

console.log('=== ★4以上ツールのスコア大幅調整開始 ===');

// バックアップを作成
fs.writeFileSync('aiToolsMasterData_before_star4_boost.json', JSON.stringify(data, null, 2));

let adjustedCount = 0;

// スコア調整を適用
data.tools = data.tools.map(tool => {
  const boost = majorBoosts.find(b => b.name === tool.toolName);
  
  if (boost) {
    const oldScore = tool.tenEvaluation.totalScore;
    const scoreDiff = boost.newScore - oldScore;
    
    // 各項目のスコアを調整（特にpopularityを重点的に上げる）
    const popularityBoost = Math.round(scoreDiff * 0.4); // 40%をpopularityに
    const otherBoost = Math.round(scoreDiff * 0.12); // 残りを5項目に均等配分
    
    const newEvaluation = {
      immediacy: Math.max(40, Math.min(100, tool.tenEvaluation.immediacy + otherBoost)),
      simplicity: Math.max(40, Math.min(100, tool.tenEvaluation.simplicity + otherBoost)),
      popularity: Math.max(40, Math.min(100, tool.tenEvaluation.popularity + popularityBoost)),
      costPerformance: Math.max(40, Math.min(100, tool.tenEvaluation.costPerformance + otherBoost)),
      specialization: Math.max(40, Math.min(100, tool.tenEvaluation.specialization + otherBoost)),
      productivityGain: Math.max(40, Math.min(100, tool.tenEvaluation.productivityGain + otherBoost))
    };
    
    // 実際の合計を計算
    const actualTotal = Object.values(newEvaluation).reduce((sum, val) => sum + val, 0);
    
    console.log(`${tool.toolName}: ${oldScore}点 → ${actualTotal}点 (+${actualTotal - oldScore}点) - ${boost.reason}`);
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

console.log(`\n✅ ${adjustedCount}ツールのスコアを大幅調整しました`);

// 調整後のTOP20を表示
console.log('\n=== 調整後のTOP20予想 ===');
const adjustedTools = data.tools
  .filter(tool => tool.tenEvaluation && tool.tenEvaluation.totalScore)
  .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);

adjustedTools.slice(0, 20).forEach((tool, index) => {
  console.log(`${index + 1}. ${tool.toolName}: ${tool.tenEvaluation.totalScore}点`);
});