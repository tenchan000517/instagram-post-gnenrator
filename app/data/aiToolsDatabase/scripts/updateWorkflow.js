const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * 統合更新ワークフロー
 * 
 * 使用方法:
 * node scripts/updateWorkflow.js <operation> [options]
 * 
 * Operations:
 * - add-new: 新ツール追加
 * - update-existing: 既存ツール更新
 * - full-update: 完全更新（検証 + ランキング生成）
 * 
 * 例:
 * node scripts/updateWorkflow.js add-new research-results/batch11.json
 * node scripts/updateWorkflow.js update-existing updates/pricing-update.json
 * node scripts/updateWorkflow.js full-update
 */

console.log('=== AI Tools Database - Update Workflow ===\n');

// コマンドライン引数解析
const operation = process.argv[2];
const dataFile = process.argv[3];

if (!operation) {
  console.error('❌ エラー: オペレーションを指定してください');
  console.log('利用可能なオペレーション:');
  console.log('  - add-new <file>: 新ツール追加');
  console.log('  - update-existing <file>: 既存ツール更新');
  console.log('  - full-update: 完全更新');
  process.exit(1);
}

// プロセス実行関数
function runCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`🔄 実行中: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        console.warn('⚠️  Warning:', stderr);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

// メインワークフロー
async function executeWorkflow() {
  try {
    console.log(`🎯 オペレーション: ${operation}`);
    
    switch (operation) {
      case 'add-new':
        await addNewToolsWorkflow(dataFile);
        break;
        
      case 'update-existing':
        await updateExistingToolsWorkflow(dataFile);
        break;
        
      case 'full-update':
        await fullUpdateWorkflow();
        break;
        
      default:
        console.error(`❌ 不明なオペレーション: ${operation}`);
        process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ ワークフロー実行中にエラーが発生しました:', error.message);
    process.exit(1);
  }
}

// 新ツール追加ワークフロー
async function addNewToolsWorkflow(dataFile) {
  if (!dataFile) {
    console.error('❌ エラー: データファイルを指定してください');
    process.exit(1);
  }
  
  console.log('\n📋 新ツール追加ワークフロー開始');
  
  // ステップ1: データ追加
  await runCommand(`node scripts/addNewTools.js "${dataFile}"`);
  
  // ステップ2: データ検証
  await runCommand('node scripts/validateDatabase.js');
  
  // ステップ3: ランキング更新
  await runCommand('node generateCompleteRankingsV7.js');
  
  console.log('\n✅ 新ツール追加ワークフロー完了');
  console.log('🎯 次のアクション:');
  console.log('  - rankingsV7/ の内容確認');
  console.log('  - Instagram投稿用データの準備');
}

// 既存ツール更新ワークフロー
async function updateExistingToolsWorkflow(dataFile) {
  if (!dataFile) {
    console.error('❌ エラー: データファイルを指定してください');
    process.exit(1);
  }
  
  console.log('\n📋 既存ツール更新ワークフロー開始');
  
  // ステップ1: データ更新
  await runCommand(`node scripts/updateExistingTools.js "${dataFile}"`);
  
  // ステップ2: データ検証
  await runCommand('node scripts/validateDatabase.js');
  
  // ステップ3: ランキング更新
  await runCommand('node generateCompleteRankingsV7.js');
  
  console.log('\n✅ 既存ツール更新ワークフロー完了');
  console.log('🎯 次のアクション:');
  console.log('  - 更新されたランキングの確認');
  console.log('  - 影響を受けた投稿コンテンツの更新検討');
}

// 完全更新ワークフロー
async function fullUpdateWorkflow() {
  console.log('\n📋 完全更新ワークフロー開始');
  
  // ステップ1: データベース整合性チェック
  console.log('\n🔍 Phase 1: データベース検証');
  await runCommand('node scripts/validateDatabase.js');
  
  // ステップ2: ランキング再生成
  console.log('\n🏆 Phase 2: ランキング生成');
  await runCommand('node generateCompleteRankingsV7.js');
  
  // ステップ3: 生成結果の統計
  console.log('\n📊 Phase 3: 生成結果統計');
  await generateUpdateSummary();
  
  console.log('\n✅ 完全更新ワークフロー完了');
}

// 更新サマリー生成
async function generateUpdateSummary() {
  try {
    const masterData = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf-8'));
    const rankingsPath = 'rankingsV7';
    
    // ランキングファイル数カウント
    let totalRankings = 0;
    const categories = ['generalUsers', 'developers', 'creators', 'universal'];
    
    categories.forEach(category => {
      const categoryPath = path.join(rankingsPath, category);
      if (fs.existsSync(categoryPath)) {
        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.json'));
        totalRankings += files.length;
        console.log(`  📁 ${category}: ${files.length}ランキング`);
      }
    });
    
    console.log('\n📊 更新サマリー:');
    console.log(`  💾 総ツール数: ${masterData.totalTools}`);
    console.log(`  🏆 生成ランキング数: ${totalRankings}`);
    console.log(`  📅 最終更新: ${masterData.lastUpdated}`);
    console.log(`  🔢 バージョン: ${masterData.version}`);
    
    // サマリーファイル保存
    const summary = {
      updateDate: new Date().toISOString(),
      totalTools: masterData.totalTools,
      totalRankings: totalRankings,
      version: masterData.version,
      lastUpdated: masterData.lastUpdated
    };
    
    const summaryPath = `update-summary-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    console.log(`  📄 サマリー保存: ${summaryPath}`);
    
  } catch (error) {
    console.warn('⚠️  サマリー生成中にエラー:', error.message);
  }
}

// ワークフロー実行
executeWorkflow();