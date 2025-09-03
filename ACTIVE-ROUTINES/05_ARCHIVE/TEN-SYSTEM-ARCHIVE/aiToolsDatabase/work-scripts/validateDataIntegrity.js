const fs = require('fs');
const path = require('path');

// マスターデータベース読み込み
const masterDataPath = path.join(__dirname, 'aiToolsMasterData.json');
const rawData = JSON.parse(fs.readFileSync(masterDataPath, 'utf-8'));
const masterData = rawData.tools || rawData;

console.log('=== AIツールデータベース整合性検証 ===\n');

// 1. トータルスコア整合性検証
console.log('📊 1. トータルスコア整合性検証');
console.log('================================');

const integrityIssues = [];
const undefinedIssues = [];

masterData.forEach((tool, index) => {
  const evaluation = tool.tenEvaluation;
  
  // undefined問題チェック
  if (!tool.toolName || tool.toolName === 'undefined' || tool.toolName === '') {
    undefinedIssues.push({
      index,
      toolName: tool.toolName || 'undefined',
      category: tool.category,
      officialUrl: tool.officialUrl,
      totalScore: evaluation.totalScore
    });
  }
  
  // スコア整合性チェック
  const calculatedTotal = 
    evaluation.immediacy + 
    evaluation.simplicity + 
    evaluation.popularity + 
    evaluation.costPerformance + 
    evaluation.specialization + 
    evaluation.productivityGain;
  
  const recordedTotal = evaluation.totalScore;
  const difference = calculatedTotal - recordedTotal;
  
  if (difference !== 0) {
    integrityIssues.push({
      index,
      toolName: tool.toolName,
      calculatedTotal,
      recordedTotal,
      difference,
      evaluation: {
        immediacy: evaluation.immediacy,
        simplicity: evaluation.simplicity,
        popularity: evaluation.popularity,
        costPerformance: evaluation.costPerformance,
        specialization: evaluation.specialization,
        productivityGain: evaluation.productivityGain
      }
    });
  }
});

// 整合性結果表示
console.log(`✅ 正常: ${masterData.length - integrityIssues.length}ツール`);
console.log(`🚨 不整合: ${integrityIssues.length}ツール\n`);

if (integrityIssues.length > 0) {
  console.log('--- 不整合詳細 ---');
  integrityIssues.forEach(issue => {
    console.log(`🔴 ${issue.toolName}:`);
    console.log(`   計算値: ${issue.calculatedTotal}点 vs 記録値: ${issue.recordedTotal}点 (差異: ${issue.difference > 0 ? '+' : ''}${issue.difference})`);
    console.log(`   詳細: immediacy(${issue.evaluation.immediacy}) + simplicity(${issue.evaluation.simplicity}) + popularity(${issue.evaluation.popularity}) + costPerformance(${issue.evaluation.costPerformance}) + specialization(${issue.evaluation.specialization}) + productivityGain(${issue.evaluation.productivityGain}) = ${issue.calculatedTotal}`);
    console.log('');
  });
}

// 2. undefined問題検証
console.log('\n🔍 2. undefined問題検証');
console.log('========================');

console.log(`🚨 undefined問題: ${undefinedIssues.length}ツール\n`);

if (undefinedIssues.length > 0) {
  console.log('--- undefined問題詳細 ---');
  undefinedIssues.forEach(issue => {
    console.log(`🔴 Index ${issue.index}:`);
    console.log(`   ツール名: "${issue.toolName}"`);
    console.log(`   カテゴリ: ${issue.category}`);
    console.log(`   URL: ${issue.officialUrl || 'N/A'}`);
    console.log(`   スコア: ${issue.totalScore}点`);
    console.log('');
  });
  
  // URL からツール名推定
  console.log('--- 推定ツール名 ---');
  undefinedIssues.forEach(issue => {
    if (issue.officialUrl) {
      const url = issue.officialUrl;
      let suggestedName = 'Unknown';
      
      if (url.includes('adobe.com/products/firefly')) suggestedName = 'Adobe Firefly';
      else if (url.includes('rytr.me')) suggestedName = 'Rytr';
      else if (url.includes('writesonic.com')) suggestedName = 'Writesonic';
      else if (url.includes('jasper.ai')) suggestedName = 'Jasper AI';
      else if (url.includes('copy.ai')) suggestedName = 'Copy.ai';
      else if (url.includes('luma.ai')) suggestedName = 'Luma AI';
      else if (url.includes('runway.com')) suggestedName = 'Runway Gen-3';
      else if (url.includes('ideogram.ai')) suggestedName = 'Ideogram';
      else {
        // ドメインから推定
        const domain = url.replace(/^https?:\/\//, '').split('/')[0];
        suggestedName = domain.split('.')[0];
      }
      
      console.log(`🔧 Index ${issue.index}: "${issue.toolName}" → "${suggestedName}"`);
      console.log(`   URL: ${url}`);
      console.log(`   カテゴリ: ${issue.category}`);
      console.log('');
    }
  });
}

// 3. TOP10検証
console.log('\n🏆 3. TOP10検証');
console.log('=================');

const sortedTools = [...masterData]
  .filter(tool => tool.toolName && tool.toolName !== 'undefined')
  .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore)
  .slice(0, 10);

console.log('現在のTOP10:');
sortedTools.forEach((tool, index) => {
  console.log(`${(index + 1).toString().padStart(2)}. ${tool.toolName} (${tool.tenEvaluation.totalScore}点) ${tool.tenEvaluation.starRating || '★★★★'}`);
});

// 4. サマリー
console.log('\n📋 4. 検証サマリー');
console.log('=================');
console.log(`総ツール数: ${masterData.length}`);
console.log(`スコア整合性問題: ${integrityIssues.length}ツール`);
console.log(`undefined問題: ${undefinedIssues.length}ツール`);
console.log(`正常ツール数: ${masterData.length - integrityIssues.length - undefinedIssues.length}`);

// 修正用データ出力
const fixData = {
  integrityIssues,
  undefinedIssues,
  timestamp: new Date().toISOString()
};

fs.writeFileSync(
  path.join(__dirname, 'integrity_validation_report.json'),
  JSON.stringify(fixData, null, 2),
  'utf-8'
);

console.log('\n✅ 検証完了: integrity_validation_report.json に詳細レポートを出力しました');