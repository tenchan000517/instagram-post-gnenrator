/**
 * problemSolutionPairs.json のナレッジID移行スクリプト
 * 
 * 変更内容:
 * targetPersona フィールドを knowledgeId に変更し、PXXX を KXXX に変換
 */

const fs = require('fs');
const path = require('path');

const INPUT_FILE = '../app/services/knowledgeBase/data/problemSolutionPairs.json';
const OUTPUT_FILE = '../app/services/knowledgeBase/data/problemSolutionPairs_migrated.json';

function migrateKnowledgeIds() {
  try {
    // ファイル読み込み
    const filePath = path.join(__dirname, INPUT_FILE);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    console.log('🔄 ナレッジID移行開始...');
    console.log(`📊 処理対象: ${Object.keys(data.pairs).length}個のペア`);
    
    let processedCount = 0;
    
    // pairs の各項目を処理
    Object.keys(data.pairs).forEach(key => {
      const pair = data.pairs[key];
      
      // targetPersona フィールドを削除
      if (pair.targetPersona) {
        delete pair.targetPersona;
      }
      
      // source の contents-XXX から knowledgeId: K-XXX を作成
      if (pair.source && pair.source.startsWith('contents-')) {
        const number = pair.source.replace('contents-', '');
        pair.knowledgeId = `K${number}`;
        processedCount++;
      }
    });
    
    // ファイル出力
    const outputPath = path.join(__dirname, OUTPUT_FILE);
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
    
    console.log(`✅ 移行完了: ${processedCount}個のペアを処理`);
    console.log(`📁 出力ファイル: ${outputPath}`);
    console.log('');
    console.log('🔍 変更例:');
    console.log('  source: "contents-004" → knowledgeId: "K004"');
    console.log('  source: "contents-008" → knowledgeId: "K008"');
    console.log('  targetPersona フィールドは削除');
    
    // 最初の3件をサンプル表示
    console.log('');
    console.log('📋 移行後データサンプル:');
    const sampleKeys = Object.keys(data.pairs).slice(0, 3);
    sampleKeys.forEach(key => {
      const pair = data.pairs[key];
      console.log(`  ${key}:`);
      console.log(`    knowledgeId: ${pair.knowledgeId}`);
      console.log(`    source: ${pair.source} (変更なし)`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ 移行エラー:', error.message);
    process.exit(1);
  }
}

// 直接実行
console.log('📋 ナレッジID移行スクリプト');
console.log('==========================');
console.log('');
console.log('このスクリプトは以下の変更を行います:');
console.log('- targetPersona フィールドを削除');
console.log('- source: "contents-XXX" から knowledgeId: "KXXX" を作成');
console.log('');

migrateKnowledgeIds();