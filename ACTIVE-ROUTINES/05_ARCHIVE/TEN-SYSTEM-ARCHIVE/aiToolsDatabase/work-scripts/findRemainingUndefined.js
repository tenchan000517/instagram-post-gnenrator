const fs = require('fs');

// 現在のデータを読み込み
const data = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf8'));

console.log('=== Remaining undefined tools ===');

// 現在もundefinedなツールを探す
const stillUndefined = data.tools.filter(tool => 
  !tool.toolName || 
  tool.toolName === 'undefined' || 
  tool.toolName.includes('undefined')
);

console.log(`Found ${stillUndefined.length} tools with undefined names:`);

stillUndefined.forEach(tool => {
  console.log('---');
  console.log('ID:', tool.id);
  console.log('ToolName:', tool.toolName);
  console.log('Category:', tool.category);
  console.log('Company:', tool.companyName);
  console.log('URL:', tool.officialUrl);
  console.log('Score:', tool.tenEvaluation?.totalScore);
});

// 重複も再確認
console.log('\n=== Checking for duplicates ===');
const nameCount = {};
data.tools.forEach(tool => {
  if (tool.toolName && tool.toolName !== 'undefined') {
    nameCount[tool.toolName] = (nameCount[tool.toolName] || 0) + 1;
  }
});

Object.entries(nameCount).forEach(([name, count]) => {
  if (count > 1) {
    console.log(`${name}: ${count} duplicates`);
  }
});

console.log(`\nTotal tools in database: ${data.tools.length}`);