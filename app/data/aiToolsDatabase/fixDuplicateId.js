const fs = require('fs');

console.log('🔧 AI015重複修正スクリプト');

// ファイル読み込み
const dataPath = './aiToolsMasterData.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log(`\n現在のツール数: ${data.tools.length}`);

// AI015を探す
let ai015Count = 0;
data.tools.forEach((tool, index) => {
  if (tool.id === 'AI015') {
    ai015Count++;
    console.log(`\nAI015 #${ai015Count}: ${tool.toolName} (index: ${index})`);
    
    // 2つ目のAI015（Otter.ai）をAI016に変更
    if (ai015Count === 2 && tool.toolName === 'Otter.ai') {
      tool.id = 'AI016';
      console.log(`  → ID変更: AI015 → AI016`);
    }
  }
});

// 検証
const idCount = {};
data.tools.forEach(tool => {
  const id = tool.id || 'NO_ID';
  idCount[id] = (idCount[id] || 0) + 1;
});

const duplicates = Object.entries(idCount)
  .filter(([id, count]) => count > 1);

if (duplicates.length === 0) {
  console.log('\n✅ 重複解決成功！');
  
  // バックアップ作成
  fs.writeFileSync('./aiToolsMasterData_backup_dup_fix.json', 
    fs.readFileSync(dataPath, 'utf8'));
  console.log('💾 バックアップ保存: aiToolsMasterData_backup_dup_fix.json');
  
  // 保存
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log('✅ aiToolsMasterData.json 更新完了');
  
  // 最終確認
  console.log('\n📊 最終統計:');
  console.log(`  総ツール数: ${data.tools.length}`);
  console.log(`  ユニークID数: ${Object.keys(idCount).length}`);
} else {
  console.log('\n❌ まだ重複があります:');
  duplicates.forEach(([id, count]) => {
    console.log(`  ${id}: ${count}個`);
  });
}