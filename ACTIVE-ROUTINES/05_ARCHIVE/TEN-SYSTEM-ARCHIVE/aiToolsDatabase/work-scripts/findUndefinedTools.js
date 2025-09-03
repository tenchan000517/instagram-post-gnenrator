const fs = require('fs');
const data = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf8'));

// undefinedのツールを探す
const undefinedTools = data.tools.filter(tool => !tool.toolName || tool.toolName === 'undefined');
console.log('Undefined tools found:', undefinedTools.length);

// 各undefinedツールの詳細を表示
undefinedTools.forEach(tool => {
  console.log('---');
  console.log('ID:', tool.id);
  console.log('Category:', tool.category);
  console.log('Company:', tool.companyName);
  console.log('URL:', tool.officialUrl);
});

// 重複を探す
const toolNames = {};
const duplicates = [];

data.tools.forEach(tool => {
  if (toolNames[tool.toolName]) {
    duplicates.push({
      name: tool.toolName,
      ids: [toolNames[tool.toolName], tool.id]
    });
  } else {
    toolNames[tool.toolName] = tool.id;
  }
});

console.log('\n=== Duplicates found ===');
duplicates.forEach(dup => {
  console.log(`${dup.name}: ${dup.ids.join(', ')}`);
});