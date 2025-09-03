#!/usr/bin/env node
/**
 * 全バッチデータの最終品質チェッカー
 * データベース統合前の品質確認ツール
 */

const fs = require('fs');
const path = require('path');

const RESEARCH_DIR = path.join(__dirname, 'research-results');

function checkAllBatches() {
  console.log('🔍 全バッチデータ最終品質チェック開始');
  console.log('='.repeat(70));
  
  let totalTools = 0;
  let validTools = 0;
  let invalidTools = [];
  const batchSummary = [];
  
  for (let batchNumber = 1; batchNumber <= 9; batchNumber++) {
    const filename = `batch${batchNumber}-complete-results.json`;
    const filePath = path.join(RESEARCH_DIR, filename);
    
    console.log(`\n📁 バッチ${batchNumber}: ${filename}`);
    
    if (!fs.existsSync(filePath)) {
      console.log('  ❌ ファイルが存在しません');
      continue;
    }
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const tools = getToolsArray(data);
      
      if (!tools || tools.length === 0) {
        console.log('  ⚠️  ツール配列が存在しません');
        continue;
      }
      
      console.log(`  📊 ${tools.length}ツール検出`);
      
      const batchResult = {
        batchNumber,
        totalTools: tools.length,
        validTools: 0,
        incompleteTools: [],
        nullScoreTools: [],
        missingFieldTools: []
      };
      
      // 各ツールの品質チェック
      tools.forEach((tool, idx) => {
        totalTools++;
        const result = validateTool(tool, batchNumber);
        
        if (result.isValid) {
          validTools++;
          batchResult.validTools++;
        } else {
          const toolId = tool.id || tool.toolId;
          const toolName = tool.toolName || tool.name;
          invalidTools.push({
            batchNumber,
            toolId: toolId,
            toolName: toolName,
            issues: result.issues
          });
          
          if (result.issues.includes('missing-tenEvaluation')) {
            batchResult.missingFieldTools.push(toolName || 'unknown');
          } else if (result.issues.includes('null-totalScore')) {
            batchResult.nullScoreTools.push(toolName || 'unknown');
          } else {
            batchResult.incompleteTools.push(toolName || 'unknown');
          }
        }
      });
      
      batchSummary.push(batchResult);
      console.log(`  ✅ 有効ツール: ${batchResult.validTools}/${batchResult.totalTools}`);
      
      if (batchResult.missingFieldTools.length > 0) {
        console.log(`  ⚠️  tenEvaluation欠損: ${batchResult.missingFieldTools.join(', ')}`);
      }
      if (batchResult.nullScoreTools.length > 0) {
        console.log(`  ⚠️  totalScoreがnull: ${batchResult.nullScoreTools.join(', ')}`);
      }
      if (batchResult.incompleteTools.length > 0) {
        console.log(`  ⚠️  不完全評価: ${batchResult.incompleteTools.join(', ')}`);
      }
      
    } catch (error) {
      console.log(`  ❌ エラー: ${error.message}`);
    }
  }
  
  // 最終サマリー
  console.log('\n' + '='.repeat(70));
  console.log('📈 最終品質チェック結果');
  console.log('='.repeat(70));
  console.log(`合計ツール数: ${totalTools}`);
  console.log(`有効ツール数: ${validTools}`);
  console.log(`無効ツール数: ${invalidTools.length}`);
  console.log(`データベース統合可能率: ${((validTools/totalTools)*100).toFixed(1)}%`);
  
  if (invalidTools.length > 0) {
    console.log('\n❌ 問題のあるツール詳細:');
    invalidTools.forEach(item => {
      console.log(`  バッチ${item.batchNumber}: ${item.toolName} (${item.toolId})`);
      console.log(`    問題: ${item.issues.join(', ')}`);
    });
  }
  
  console.log('\n📊 バッチ別サマリー:');
  batchSummary.forEach(batch => {
    console.log(`  バッチ${batch.batchNumber}: ${batch.validTools}/${batch.totalTools}ツール有効`);
  });
  
  return {
    totalTools,
    validTools,
    invalidTools,
    batchSummary,
    readyForIntegration: invalidTools.length === 0
  };
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

/**
 * ツールの品質チェック
 */
function validateTool(tool, batchNumber) {
  const issues = [];
  let isValid = true;
  
  // 基本フィールドチェック（複数パターンに対応）
  const toolId = tool.id || tool.toolId;
  const toolName = tool.toolName || tool.name;
  
  if (!toolId) {
    issues.push('missing-id');
    isValid = false;
  }
  if (!toolName) {
    issues.push('missing-toolName');
    isValid = false;
  }
  
  // tenEvaluationフィールドチェック
  if (!tool.tenEvaluation) {
    issues.push('missing-tenEvaluation');
    isValid = false;
    return { isValid, issues };
  }
  
  const eval = tool.tenEvaluation;
  const requiredFields = ['immediacy', 'simplicity', 'popularity', 'costPerformance', 'specialization', 'productivityGain', 'totalScore'];
  
  // 必須フィールド存在チェック
  requiredFields.forEach(field => {
    if (!(field in eval)) {
      issues.push(`missing-${field}`);
      isValid = false;
    }
  });
  
  // 値の有効性チェック
  const scoreFields = ['immediacy', 'simplicity', 'popularity', 'costPerformance', 'specialization', 'productivityGain'];
  scoreFields.forEach(field => {
    const value = eval[field];
    if (value !== null && (typeof value !== 'number' || value < 0 || value > 100)) {
      issues.push(`invalid-${field}-value`);
      isValid = false;
    }
  });
  
  // totalScoreチェック
  if (eval.totalScore === null || eval.totalScore === undefined) {
    issues.push('null-totalScore');
    isValid = false;
  } else if (typeof eval.totalScore !== 'number') {
    issues.push('invalid-totalScore-type');
    isValid = false;
  }
  
  // totalScoreの計算チェック（全ての評価項目が有効な場合）
  const nonNullScores = scoreFields.filter(field => eval[field] !== null).map(field => eval[field]);
  if (nonNullScores.length === 6) {
    const expectedTotal = nonNullScores.reduce((sum, val) => sum + val, 0);
    if (Math.abs(eval.totalScore - expectedTotal) > 1) { // 小数点誤差を考慮
      issues.push('incorrect-totalScore-calculation');
      isValid = false;
    }
  }
  
  return { isValid, issues };
}

if (require.main === module) {
  const result = checkAllBatches();
  console.log('\n' + '='.repeat(70));
  if (result.readyForIntegration) {
    console.log('🎉 全データが統合準備完了！データベース統合を開始できます。');
  } else {
    console.log('⚠️  統合前に修正が必要な問題があります。');
  }
  process.exit(result.readyForIntegration ? 0 : 1);
}

module.exports = { checkAllBatches };