const fs = require('fs');
const path = require('path');

/**
 * 既存AIツール情報更新スクリプト
 * 
 * 使用方法:
 * node scripts/updateExistingTools.js <update-data-file.json>
 * 
 * 例:
 * node scripts/updateExistingTools.js updates/claude-pricing-update.json
 */

console.log('=== AI Tools Database - Existing Tools Update ===\n');

// コマンドライン引数チェック
if (process.argv.length < 3) {
  console.error('❌ エラー: 更新データファイルを指定してください');
  console.log('使用方法: node scripts/updateExistingTools.js <update-data-file.json>');
  process.exit(1);
}

const updateFilePath = process.argv[2];
const masterDataPath = 'aiToolsMasterData.json';

// ファイル存在確認
if (!fs.existsSync(updateFilePath)) {
  console.error(`❌ エラー: ファイルが見つかりません: ${updateFilePath}`);
  process.exit(1);
}

if (!fs.existsSync(masterDataPath)) {
  console.error(`❌ エラー: マスターデータが見つかりません: ${masterDataPath}`);
  process.exit(1);
}

// 深いマージ関数
function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

try {
  // データ読み込み
  console.log('📥 データ読み込み中...');
  const updateData = JSON.parse(fs.readFileSync(updateFilePath, 'utf-8'));
  const masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf-8'));
  
  console.log(`📊 既存データ: ${masterData.tools.length}ツール`);
  console.log(`🔄 更新対象: ${updateData.updates?.length || 0}ツール`);
  
  // バックアップ作成
  const backupPath = `aiToolsMasterData_backup_${new Date().toISOString().split('T')[0]}_${Date.now()}.json`;
  fs.writeFileSync(backupPath, JSON.stringify(masterData, null, 2));
  console.log(`💾 バックアップ作成: ${backupPath}`);
  
  let updatedCount = 0;
  const updateLog = [];
  
  // 更新処理
  if (updateData.updates && Array.isArray(updateData.updates)) {
    updateData.updates.forEach(update => {
      const toolIndex = masterData.tools.findIndex(tool => tool.id === update.id);
      
      if (toolIndex === -1) {
        console.warn(`⚠️  ツールが見つかりません: ${update.id}`);
        return;
      }
      
      const originalTool = masterData.tools[toolIndex];
      const toolName = originalTool.toolName;
      
      // 更新データをマージ
      masterData.tools[toolIndex] = deepMerge(originalTool, update.data);
      
      // lastVerified更新
      masterData.tools[toolIndex].lastVerified = new Date().toISOString().split('T')[0];
      
      updatedCount++;
      updateLog.push({
        id: update.id,
        toolName: toolName,
        updatedFields: Object.keys(update.data)
      });
      
      console.log(`✅ 更新完了: ${update.id} (${toolName})`);
    });
  }
  
  // マスターデータのメタ情報更新
  masterData.lastUpdated = new Date().toISOString().split('T')[0];
  
  if (updatedCount > 0) {
    // データベース保存
    fs.writeFileSync(masterDataPath, JSON.stringify(masterData, null, 2));
    
    console.log('\n✅ 更新完了!');
    console.log(`📊 更新ツール数: ${updatedCount}`);
    
    // 更新ログ出力
    console.log('\n📝 更新詳細:');
    updateLog.forEach(log => {
      console.log(`  - ${log.id}: ${log.toolName}`);
      console.log(`    更新フィールド: ${log.updatedFields.join(', ')}`);
    });
    
    // 更新ログファイル保存
    const logPath = `update-log-${new Date().toISOString().split('T')[0]}-${Date.now()}.json`;
    fs.writeFileSync(logPath, JSON.stringify({
      updateDate: new Date().toISOString(),
      updatedTools: updateLog,
      totalUpdated: updatedCount
    }, null, 2));
    
    console.log(`📋 更新ログ保存: ${logPath}`);
    
    console.log('\n🎯 次のステップ:');
    console.log('  1. node scripts/validateDatabase.js - データ整合性確認');
    console.log('  2. node generateCompleteRankingsV7.js - ランキング更新');
    
  } else {
    console.log('ℹ️  更新されたツールはありませんでした');
  }
  
} catch (error) {
  console.error('❌ エラーが発生しました:', error.message);
  console.error(error.stack);
  process.exit(1);
}