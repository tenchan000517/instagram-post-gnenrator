#!/usr/bin/env node

/**
 * リサーチ結果フォーマット修正スクリプト
 * 全バッチにtotalScoreを追加し、統一フォーマットに修正
 */

const fs = require('fs');
const path = require('path');

const RESEARCH_DIR = path.join(__dirname, 'research-results');

/**
 * TEN評価からtotalScoreを計算
 */
function calculateTotalScore(tenEvaluation) {
  if (!tenEvaluation) return 0;
  
  const totalScore = 
    (tenEvaluation.immediacy || 0) * 0.20 * 6 +           // 即効性 20%
    (tenEvaluation.simplicity || 0) * 0.20 * 6 +          // 簡単さ 20%  
    (tenEvaluation.popularity || 0) * 0.15 * 6 +          // 人気度 15%
    (tenEvaluation.costPerformance || 0) * 0.15 * 6 +     // コスパ 15%
    (tenEvaluation.specialization || 0) * 0.20 * 6 +      // 機能専門性 20%
    (tenEvaluation.productivityGain || 0) * 0.10 * 6;     // 生産性UP度 10%
  
  return Math.round(totalScore * 100) / 100; // 小数点2桁
}

/**
 * バッチファイル処理
 */
function fixBatchFile(batchNumber) {
  const fileName = `batch${batchNumber}-complete-results.json`;
  const filePath = path.join(RESEARCH_DIR, fileName);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ファイルが見つかりません: ${fileName}`);
    return false;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let modified = false;
    
    // tools配列の各ツールを処理
    if (data.tools && Array.isArray(data.tools)) {
      data.tools.forEach(tool => {
        if (tool.tenEvaluation) {
          // totalScoreが存在しない場合は計算して追加
          if (!tool.tenEvaluation.totalScore) {
            tool.tenEvaluation.totalScore = calculateTotalScore(tool.tenEvaluation);
            modified = true;
          }
        }
      });
    }
    
    // 修正があった場合のみファイルを書き直し
    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✅ ${fileName}: totalScoreを追加しました`);
      return true;
    } else {
      console.log(`⏭️  ${fileName}: 既にtotalScoreが存在します`);
      return true;
    }
    
  } catch (error) {
    console.error(`❌ ${fileName}の処理でエラー:`, error.message);
    return false;
  }
}

/**
 * 全バッチファイル処理
 */
function fixAllBatchFiles() {
  console.log('🚀 リサーチ結果フォーマット修正開始');
  console.log('================================================');
  
  const results = {
    success: 0,
    error: 0,
    notFound: 0
  };
  
  // バッチ1-9を処理
  for (let i = 1; i <= 9; i++) {
    const result = fixBatchFile(i);
    if (result === true) {
      results.success++;
    } else if (result === false) {
      results.error++;
    } else {
      results.notFound++;
    }
  }
  
  console.log('\n📊 処理結果サマリー');
  console.log('================================================');
  console.log(`✅ 成功: ${results.success}ファイル`);
  console.log(`❌ エラー: ${results.error}ファイル`);
  console.log(`⚠️  未発見: ${results.notFound}ファイル`);
  
  if (results.success > 0) {
    console.log('\n🎉 totalScore追加処理完了！');
    console.log('次のステップ: マスターデータベース再構築を実行してください');
  }
}

// 実行
if (require.main === module) {
  fixAllBatchFiles();
}

module.exports = { fixAllBatchFiles, calculateTotalScore };