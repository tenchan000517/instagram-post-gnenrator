const fs = require('fs');

console.log('🔧 ID重複修正実行スクリプト');

// ファイル読み込み
const dataPath = './aiToolsMasterData.json';
const backupPath = './aiToolsMasterData_backup_before_fix.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// バックアップ作成
console.log('\n💾 バックアップ作成中...');
fs.writeFileSync(backupPath, fs.readFileSync(dataPath, 'utf8'));
console.log(`  ✅ 保存: ${backupPath}`);

// 修正前の状況
console.log('\n📊 修正前:');
console.log(`  総ツール数: ${data.tools.length}`);

// 重複を修正
let fixCount = 0;
const fixes = [];

// AI015の重複を探して修正
let ai015Found = false;
data.tools.forEach((tool, index) => {
  if (tool.id === 'AI015') {
    if (!ai015Found) {
      // 最初のAI015（Grammarly）は保持
      ai015Found = true;
      console.log(`  保持: AI015 - ${tool.toolName}`);
    } else {
      // 2つ目のAI015（Otter.ai）をAI017に変更
      const oldId = tool.id;
      tool.id = 'AI017';
      fixes.push({
        index,
        name: tool.toolName,
        oldId,
        newId: tool.id
      });
      fixCount++;
      console.log(`  修正: ${tool.toolName}: ${oldId} → ${tool.id}`);
    }
  }
});

// 検証
const idSet = new Set();
const duplicates = [];
data.tools.forEach(tool => {
  if (idSet.has(tool.id)) {
    duplicates.push(tool.id);
  }
  idSet.add(tool.id);
});

if (duplicates.length === 0) {
  // 保存
  console.log('\n💾 修正済みデータ保存中...');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  console.log('\n✅ 修正完了！');
  console.log(`  修正数: ${fixCount}`);
  console.log(`  総ツール数: ${data.tools.length}`);
  console.log(`  ユニークID数: ${idSet.size}`);
  
  if (fixes.length > 0) {
    console.log('\n📝 修正内容:');
    fixes.forEach(fix => {
      console.log(`  [${fix.index}] ${fix.name}: ${fix.oldId} → ${fix.newId}`);
    });
  }
} else {
  console.log('\n❌ エラー: まだ重複があります');
  console.log(`  重複ID: ${duplicates.join(', ')}`);
}