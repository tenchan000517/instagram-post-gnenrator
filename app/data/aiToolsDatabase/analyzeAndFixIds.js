const fs = require('fs');

console.log('🔍 ID分析・修正スクリプト');

// ファイル読み込み
const dataPath = './aiToolsMasterData.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 全IDを収集
const usedIds = new Set();
const duplicateInfo = {};

data.tools.forEach((tool, index) => {
  const id = tool.id;
  if (usedIds.has(id)) {
    if (!duplicateInfo[id]) {
      duplicateInfo[id] = [];
    }
    duplicateInfo[id].push({
      index,
      name: tool.toolName,
      category: tool.category
    });
  } else {
    usedIds.add(id);
  }
});

// 最初の出現も追加
Object.keys(duplicateInfo).forEach(id => {
  const firstIndex = data.tools.findIndex(t => t.id === id);
  duplicateInfo[id].unshift({
    index: firstIndex,
    name: data.tools[firstIndex].toolName,
    category: data.tools[firstIndex].category
  });
});

console.log('\n📊 現在の状況:');
console.log(`総ツール数: ${data.tools.length}`);
console.log(`ユニークID数: ${usedIds.size}`);

if (Object.keys(duplicateInfo).length > 0) {
  console.log('\n❌ 重複ID:');
  Object.entries(duplicateInfo).forEach(([id, tools]) => {
    console.log(`\n${id} (${tools.length}個):`);
    tools.forEach(t => {
      console.log(`  [${t.index}] ${t.name} (${t.category})`);
    });
  });
}

// 利用可能なAI系IDを探す
console.log('\n🔎 利用可能なIDを探索中...');
const availableIds = [];
for (let i = 1; i <= 200; i++) {
  const id = `AI${String(i).padStart(3, '0')}`;
  if (!usedIds.has(id) && !Object.keys(duplicateInfo).includes(id)) {
    availableIds.push(id);
    if (availableIds.length >= 20) break;
  }
}

console.log('\n✨ 利用可能なID (最初の20個):');
console.log(availableIds.join(', '));

// 修正提案
if (Object.keys(duplicateInfo).length > 0) {
  console.log('\n💡 修正提案:');
  let nextAvailableIndex = 0;
  
  Object.entries(duplicateInfo).forEach(([id, tools]) => {
    // 最初のものは保持、2番目以降を変更
    for (let i = 1; i < tools.length; i++) {
      const newId = availableIds[nextAvailableIndex++];
      console.log(`  ${tools[i].name}: ${id} → ${newId}`);
    }
  });
  
  console.log('\n実行するには fixIds.js を実行してください');
} else {
  console.log('\n✅ ID重複なし！');
}