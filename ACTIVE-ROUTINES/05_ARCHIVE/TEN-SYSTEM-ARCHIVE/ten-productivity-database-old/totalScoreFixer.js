#!/usr/bin/env node
/**
 * totalScore修正スクリプト
 * バッチ4,5のtotalScore=null問題を修正
 */

const fs = require('fs');
const path = require('path');

const RESEARCH_DIR = path.join(__dirname, 'research-results');

function fixTotalScores() {
  console.log('🔧 totalScore修正開始');
  console.log('='.repeat(50));
  
  const batchesToFix = [4, 5];
  let totalFixed = 0;
  
  batchesToFix.forEach(batchNumber => {
    const filename = `batch${batchNumber}-complete-results.json`;
    const filePath = path.join(RESEARCH_DIR, filename);
    
    console.log(`\n📁 バッチ${batchNumber}: ${filename}`);
    
    if (!fs.existsSync(filePath)) {
      console.log('  ❌ ファイルが存在しません');
      return;
    }
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const tools = getToolsArray(data);
      
      if (!tools || tools.length === 0) {
        console.log('  ⚠️  ツール配列が存在しません');
        return;
      }
      
      console.log(`  📊 ${tools.length}ツール処理開始`);
      let fixedCount = 0;
      
      tools.forEach((tool) => {
        if (tool.tenEvaluation && tool.tenEvaluation.totalScore === null) {
          const eval = tool.tenEvaluation;
          const scoreFields = ['immediacy', 'simplicity', 'popularity', 'costPerformance', 'specialization', 'productivityGain'];
          
          // 有効な値のみを合計
          const validScores = scoreFields.filter(field => eval[field] !== null && eval[field] !== undefined && typeof eval[field] === 'number');
          
          if (validScores.length > 0) {
            const totalScore = validScores.reduce((sum, field) => sum + eval[field], 0);
            eval.totalScore = totalScore;
            fixedCount++;
            console.log(`  ✅ ${tool.toolName || tool.name}: ${validScores.length}項目合計 = ${totalScore}`);
          } else {
            console.log(`  ⚠️  ${tool.toolName || tool.name}: 有効なスコアなし`);
          }
        }
      });
      
      // ファイル保存
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  🎉 ${fixedCount}ツールのtotalScore修正完了`);
      totalFixed += fixedCount;
      
    } catch (error) {
      console.log(`  ❌ エラー: ${error.message}`);
    }
  });
  
  console.log(`\n🎉 修正完了: 合計${totalFixed}ツールのtotalScoreを修正`);
  return totalFixed;
}

/**
 * データからツール配列を取得
 */
function getToolsArray(data) {
  if (data.tools && Array.isArray(data.tools)) {
    return data.tools;
  }
  if (data.completedTools && Array.isArray(data.completedTools)) {
    return data.completedTools;
  }
  return null;
}

if (require.main === module) {
  fixTotalScores();
}

module.exports = { fixTotalScores };