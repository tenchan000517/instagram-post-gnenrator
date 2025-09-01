const fs = require('fs');
const path = require('path');

console.log('🚀 AIツールデータベース統合スクリプト v1.0');
console.log('='.repeat(50));

// ファイルパス
const existingDataPath = './aiToolsMasterData.json';
const newToolsPath = './new-12-tools-complete-data.json';
const backupPath = './aiToolsMasterData_backup_pre77.json';
const outputPath = './aiToolsMasterData_77tools.json';

// データ読み込み
console.log('\n📂 データファイル読み込み中...');
const existingData = JSON.parse(fs.readFileSync(existingDataPath, 'utf8'));
const newToolsData = JSON.parse(fs.readFileSync(newToolsPath, 'utf8'));

// バックアップ作成
console.log('💾 バックアップ作成中...');
fs.writeFileSync(backupPath, JSON.stringify(existingData, null, 2));
console.log(`  ✅ バックアップ保存: ${backupPath}`);

// 統合前の統計
console.log('\n📊 統合前の統計:');
console.log(`  既存ツール数: ${existingData.tools.length}`);
console.log(`  新規ツール数: ${newToolsData.newToolsData.length}`);
console.log(`  予想統合後: ${existingData.tools.length + newToolsData.newToolsData.length}`);

// データ統合
console.log('\n🔧 データ統合処理開始...');
const integratedData = JSON.parse(JSON.stringify(existingData)); // Deep copy

// 新規ツールを追加
newToolsData.newToolsData.forEach(newTool => {
  integratedData.tools.push(newTool);
  console.log(`  ✅ 追加: ${newTool.id} - ${newTool.toolName}`);
});

// ツールをID順にソート
integratedData.tools.sort((a, b) => {
  // AI001形式とT001形式、数値形式の全てに対応
  const aId = String(a.id || '');
  const bId = String(b.id || '');
  const aNum = parseInt(aId.replace(/[^0-9]/g, '') || '0');
  const bNum = parseInt(bId.replace(/[^0-9]/g, '') || '0');
  return aNum - bNum;
});

// メタデータ更新
integratedData.version = 'V4-2025-09-01-77tools';
integratedData.lastUpdated = new Date().toISOString().split('T')[0];
integratedData.totalTools = integratedData.tools.length;

// バッチ10の情報更新（新規ツール追加）
const batch10 = integratedData.batches.find(b => b.batchNumber === 10);
if (batch10) {
  batch10.totalTools = 12; // 新規12ツール追加
  batch10.toolRange = '66-77';
  console.log('\n  ✅ バッチ10情報更新');
}

// カテゴリ統計の再計算
const categoryStats = {};
integratedData.tools.forEach(tool => {
  const category = tool.category || 'その他';
  categoryStats[category] = (categoryStats[category] || 0) + 1;
});
integratedData.categoryDistribution = categoryStats;

// スコア統計の再計算
const scores = integratedData.tools
  .filter(t => t.tenEvaluation && t.tenEvaluation.totalScore)
  .map(t => t.tenEvaluation.totalScore);

integratedData.statistics = {
  totalValidScores: scores.length,
  averageTotalScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 100) / 100,
  topTotalScore: Math.max(...scores),
  scoreDistribution: {
    score500Plus: scores.filter(s => s >= 500).length,
    score400To499: scores.filter(s => s >= 400 && s < 500).length,
    score300To399: scores.filter(s => s >= 300 && s < 400).length,
    scoreBelow300: scores.filter(s => s < 300).length
  }
};

// 検証
console.log('\n🔍 データ検証中...');

// ID重複の詳細チェック
const idCount = {};
integratedData.tools.forEach(t => {
  const id = t.id || 'NO_ID';
  idCount[id] = (idCount[id] || 0) + 1;
});

const duplicateIds = Object.entries(idCount)
  .filter(([id, count]) => count > 1)
  .map(([id, count]) => `${id} (${count}個)`);

if (duplicateIds.length > 0) {
  console.log('\n  ⚠️ 重複ID発見:');
  duplicateIds.forEach(dup => console.log(`    - ${dup}`));
}

const validation = {
  totalTools: integratedData.tools.length === 77,
  uniqueIds: new Set(integratedData.tools.map(t => t.id)).size === integratedData.tools.length,
  allHaveTenScore: integratedData.tools.every(t => t.tenEvaluation && t.tenEvaluation.totalScore),
  allHaveCategory: integratedData.tools.every(t => t.category)
};

console.log('  ツール数が77: ' + (validation.totalTools ? '✅' : '❌'));
console.log('  ID重複なし: ' + (validation.uniqueIds ? '✅' : '❌'));
console.log('  全ツールTENスコアあり: ' + (validation.allHaveTenScore ? '✅' : '❌'));
console.log('  全ツールカテゴリあり: ' + (validation.allHaveCategory ? '✅' : '❌'));

// 保存
if (Object.values(validation).every(v => v)) {
  console.log('\n💾 統合データ保存中...');
  fs.writeFileSync(outputPath, JSON.stringify(integratedData, null, 2));
  console.log(`  ✅ 保存完了: ${outputPath}`);
  
  // 最終統計
  console.log('\n📊 統合完了統計:');
  console.log(`  総ツール数: ${integratedData.tools.length}`);
  console.log(`  カテゴリ数: ${Object.keys(categoryStats).length}`);
  console.log(`  平均TENスコア: ${integratedData.statistics.averageTotalScore}`);
  console.log(`  最高TENスコア: ${integratedData.statistics.topTotalScore}`);
  
  console.log('\n✨ 統合成功！');
  console.log('次のステップ:');
  console.log('1. aiToolsMasterData_77tools.json を確認');
  console.log('2. 問題なければ aiToolsMasterData.json にリネーム');
  console.log('3. generateCompleteRankingsV7.js でランキング生成');
} else {
  console.log('\n❌ 検証エラー: 統合を中止しました');
  console.log('データを確認してください');
}