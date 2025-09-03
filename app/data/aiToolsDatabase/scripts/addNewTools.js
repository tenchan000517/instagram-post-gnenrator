const fs = require('fs');
const path = require('path');

/**
 * 新AIツール追加スクリプト
 * 
 * 使用方法:
 * node scripts/addNewTools.js <research-result-file.json>
 * 
 * 例:
 * node scripts/addNewTools.js research-results/batch11-research-result.json
 */

console.log('=== AI Tools Database - New Tools Addition ===\n');

// コマンドライン引数チェック
if (process.argv.length < 3) {
  console.error('❌ エラー: リサーチ結果ファイルを指定してください');
  console.log('使用方法: node scripts/addNewTools.js <research-result-file.json>');
  process.exit(1);
}

const researchFilePath = process.argv[2];
const masterDataPath = 'aiToolsMasterData.json';

// ファイル存在確認
if (!fs.existsSync(researchFilePath)) {
  console.error(`❌ エラー: ファイルが見つかりません: ${researchFilePath}`);
  process.exit(1);
}

if (!fs.existsSync(masterDataPath)) {
  console.error(`❌ エラー: マスターデータが見つかりません: ${masterDataPath}`);
  process.exit(1);
}

try {
  // データ読み込み
  console.log('📥 データ読み込み中...');
  const researchData = JSON.parse(fs.readFileSync(researchFilePath, 'utf-8'));
  const masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf-8'));
  
  console.log(`📊 リサーチデータ: ${researchData.tools.length}ツール`);
  console.log(`📊 既存データ: ${masterData.tools.length}ツール`);
  
  // ID重複チェック
  const existingIds = new Set(masterData.tools.map(tool => tool.id));
  const newTools = [];
  const duplicateTools = [];
  
  researchData.tools.forEach(tool => {
    if (existingIds.has(tool.id)) {
      duplicateTools.push(tool.id);
    } else {
      newTools.push(tool);
    }
  });
  
  if (duplicateTools.length > 0) {
    console.warn(`⚠️  重複ID検出: ${duplicateTools.join(', ')}`);
  }
  
  if (newTools.length === 0) {
    console.log('ℹ️  追加する新ツールがありません');
    process.exit(0);
  }
  
  // バックアップ作成
  const backupPath = `aiToolsMasterData_backup_${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(backupPath, JSON.stringify(masterData, null, 2));
  console.log(`💾 バックアップ作成: ${backupPath}`);
  
  // 新ツール追加
  masterData.tools.push(...newTools);
  masterData.totalTools = masterData.tools.length;
  masterData.lastUpdated = new Date().toISOString().split('T')[0];
  
  // バッチ情報更新
  if (researchData.metaInfo) {
    const newBatchInfo = {
      batchNumber: researchData.metaInfo.batchNumber,
      toolRange: researchData.metaInfo.toolRange,
      totalTools: newTools.length,
      averageTotalScore: Math.round(newTools.reduce((sum, tool) => sum + tool.tenEvaluation.totalScore, 0) / newTools.length * 100) / 100,
      topTotalScore: Math.max(...newTools.map(tool => tool.tenEvaluation.totalScore)),
      dataQuality: researchData.metaInfo.dataQuality
    };
    
    if (!masterData.batches) {
      masterData.batches = [];
    }
    masterData.batches.push(newBatchInfo);
    masterData.totalBatches = masterData.batches.length;
  }
  
  // データベース保存
  fs.writeFileSync(masterDataPath, JSON.stringify(masterData, null, 2));
  
  console.log('✅ 新ツール追加完了!');
  console.log(`📊 追加ツール数: ${newTools.length}`);
  console.log(`📊 総ツール数: ${masterData.totalTools}`);
  console.log(`📊 新しいバッチ: ${researchData.metaInfo?.batchNumber || 'N/A'}`);
  
  // 追加されたツール一覧表示
  console.log('\n📝 追加されたツール:');
  newTools.forEach(tool => {
    console.log(`  - ${tool.id}: ${tool.toolName} (${tool.tenEvaluation.totalScore}点)`);
  });
  
  console.log('\n🎯 次のステップ:');
  console.log('  1. node scripts/validateDatabase.js - データ整合性確認');
  console.log('  2. node generateCompleteRankingsV7.js - ランキング更新');
  
} catch (error) {
  console.error('❌ エラーが発生しました:', error.message);
  process.exit(1);
}