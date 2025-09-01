const fs = require('fs');
const path = require('path');

// ファイルパス
const existingDataPath = './aiToolsMasterData.json';
const newToolsPath = './new-12-tools-complete-data.json';

// データ読み込み
const existingData = JSON.parse(fs.readFileSync(existingDataPath, 'utf8'));
const newToolsData = JSON.parse(fs.readFileSync(newToolsPath, 'utf8'));

// 既存ツールのリスト作成
const existingTools = new Map();
let totalExistingTools = 0;

// 全ツールを収集
existingData.tools.forEach(tool => {
  existingTools.set(tool.id, tool.toolName);
  totalExistingTools++;
});

console.log(`\n📊 既存データベース統計:`);
console.log(`総ツール数: ${totalExistingTools}`);
console.log(`バッチ数: ${existingData.batches.length}`);

// 新規ツールのチェック
console.log(`\n📋 新規12ツールのチェック:`);
console.log(`新規ツール数: ${newToolsData.newToolsData.length}`);

// 重複チェック
const duplicateIds = [];
const duplicateNames = [];
const newToolIds = [];
const newToolNames = [];

newToolsData.newToolsData.forEach(newTool => {
  // IDの重複チェック
  if (existingTools.has(newTool.id)) {
    duplicateIds.push({
      id: newTool.id,
      newName: newTool.toolName,
      existingName: existingTools.get(newTool.id)
    });
  } else {
    newToolIds.push(newTool.id);
  }
  
  // 名前の重複チェック
  let nameExists = false;
  existingTools.forEach((existingName, existingId) => {
    if (existingName === newTool.toolName) {
      nameExists = true;
      duplicateNames.push({
        name: newTool.toolName,
        newId: newTool.id,
        existingId: existingId
      });
    }
  });
  
  if (!nameExists) {
    newToolNames.push(newTool.toolName);
  }
});

// 結果表示
console.log(`\n🔍 重複チェック結果:`);

if (duplicateIds.length > 0) {
  console.log(`\n❌ ID重複が見つかりました (${duplicateIds.length}件):`);
  duplicateIds.forEach(dup => {
    console.log(`  - ID: ${dup.id}`);
    console.log(`    新規: ${dup.newName}`);
    console.log(`    既存: ${dup.existingName}`);
  });
} else {
  console.log(`✅ ID重複なし`);
}

if (duplicateNames.length > 0) {
  console.log(`\n❌ 名前重複が見つかりました (${duplicateNames.length}件):`);
  duplicateNames.forEach(dup => {
    console.log(`  - 名前: ${dup.name}`);
    console.log(`    新規ID: ${dup.newId}`);
    console.log(`    既存ID: ${dup.existingId}`);
  });
} else {
  console.log(`✅ 名前重複なし`);
}

// 新規ツールのリスト
console.log(`\n✨ 追加予定の新規ツール (${newToolIds.length}件):`);
newToolsData.newToolsData.forEach(tool => {
  console.log(`  ${tool.id}: ${tool.toolName} (${tool.category})`);
});

// 統合後の予想
console.log(`\n📊 統合後の予想統計:`);
console.log(`総ツール数: ${totalExistingTools} + ${newToolIds.length} = ${totalExistingTools + newToolIds.length}`);

// 既存データベースのツールIDリスト
console.log(`\n📝 既存ツールIDリスト (確認用):`);
const existingIdsList = Array.from(existingTools.keys()).sort();
console.log(`最小ID: ${existingIdsList[0]}`);
console.log(`最大ID: ${existingIdsList[existingIdsList.length - 1]}`);

// AI073-AI084の範囲チェック
const targetRange = [];
for (let i = 73; i <= 84; i++) {
  const id = `AI${String(i).padStart(3, '0')}`;
  if (existingTools.has(id)) {
    targetRange.push({id, name: existingTools.get(id)});
  }
}

if (targetRange.length > 0) {
  console.log(`\n⚠️ AI073-AI084範囲に既存ツールが存在:`);
  targetRange.forEach(tool => {
    console.log(`  ${tool.id}: ${tool.name}`);
  });
} else {
  console.log(`\n✅ AI073-AI084範囲は空いています`);
}

// 最終確認
if (duplicateIds.length === 0 && duplicateNames.length === 0) {
  console.log(`\n✅ 統合可能: 重複なし、安全に統合できます`);
} else {
  console.log(`\n⚠️ 統合前に重複を解決する必要があります`);
}