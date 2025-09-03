#!/usr/bin/env node
/**
 * evaluation構造統一スクリプト
 * 全バッチのTEN評価を統一形式に変換・totalScore自動計算
 */
const fs = require('fs');
const path = require('path');

const BATCH_FILES = [
  { file: 'batch2-complete-results.json', batchNumber: 2, hasData: true },
  { file: 'batch3-complete-results.json', batchNumber: 3, hasData: true },
  { file: 'batch4-complete-results.json', batchNumber: 4, hasData: true },
  { file: 'batch5-complete-results.json', batchNumber: 5, hasData: true },
  { file: 'batch6-complete-results.json', batchNumber: 6, hasData: true },
  { file: 'batch9-complete-results.json', batchNumber: 9, hasData: true }
];

function unifyEvaluationFormat() {
  console.log('🔧 evaluation構造統一開始');
  console.log('='.repeat(60));

  const unificationResults = {
    processedBatches: 0,
    processedTools: 0,
    conversions: {
      evaluationToTenEvaluation: 0,
      totalScoreCalculated: 0,
      alreadyCorrect: 0
    },
    errors: []
  };

  BATCH_FILES.forEach(({ file, batchNumber }) => {
    console.log(`\n📁 バッチ${batchNumber} - ${file}`);
    
    try {
      const filePath = path.join(__dirname, 'research-results', file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (!data.tools || !Array.isArray(data.tools)) {
        console.log(`  ⚠️  tools配列が存在しません - スキップ`);
        return;
      }

      let batchModified = false;
      
      data.tools.forEach((tool, index) => {
        const originalFormat = detectEvaluationFormat(tool);
        
        switch (originalFormat) {
          case 'evaluation':
            // evaluation → tenEvaluation + totalScore計算
            convertEvaluationFormat(tool);
            unificationResults.conversions.evaluationToTenEvaluation++;
            batchModified = true;
            break;
            
          case 'tenEvaluation_incomplete':
            // tenEvaluationあるがtotalScoreなし → 計算
            calculateTotalScore(tool);
            unificationResults.conversions.totalScoreCalculated++;
            batchModified = true;
            break;
            
          case 'tenEvaluation_complete':
            // 既に正しい形式
            unificationResults.conversions.alreadyCorrect++;
            break;
            
          case 'none':
            console.log(`    ⚠️  ${tool.toolName || `Tool${index}`}: 評価データなし`);
            break;
        }
        
        unificationResults.processedTools++;
      });

      if (batchModified) {
        // バックアップ作成
        const backupPath = filePath.replace('.json', '_backup.json');
        if (!fs.existsSync(backupPath)) {
          fs.writeFileSync(backupPath, fs.readFileSync(filePath, 'utf8'));
          console.log(`  💾 バックアップ作成: ${path.basename(backupPath)}`);
        }
        
        // 修正版を保存
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`  ✅ 修正完了: ${data.tools.length}ツール処理`);
      } else {
        console.log(`  ℹ️  変更なし: 既に正しい形式`);
      }
      
      unificationResults.processedBatches++;
      
    } catch (error) {
      const errorMsg = `バッチ${batchNumber}: ${error.message}`;
      console.log(`  ❌ エラー: ${errorMsg}`);
      unificationResults.errors.push(errorMsg);
    }
  });

  console.log(`\n📊 統一結果サマリー`);
  console.log(`処理バッチ数: ${unificationResults.processedBatches}`);
  console.log(`処理ツール数: ${unificationResults.processedTools}`);
  console.log(`変換実行:`);
  console.log(`  - evaluation→tenEvaluation: ${unificationResults.conversions.evaluationToTenEvaluation}`);
  console.log(`  - totalScore計算: ${unificationResults.conversions.totalScoreCalculated}`);
  console.log(`  - 既に正しい形式: ${unificationResults.conversions.alreadyCorrect}`);
  
  if (unificationResults.errors.length > 0) {
    console.log(`エラー: ${unificationResults.errors.length}件`);
    unificationResults.errors.forEach(err => console.log(`  - ${err}`));
  }

  return unificationResults;
}

/**
 * 評価データの形式を検出
 */
function detectEvaluationFormat(tool) {
  if (tool.tenEvaluation) {
    if (tool.tenEvaluation.totalScore && tool.tenEvaluation.totalScore > 0) {
      return 'tenEvaluation_complete'; // 完全
    } else {
      return 'tenEvaluation_incomplete'; // totalScoreなし
    }
  } else if (tool.evaluation) {
    return 'evaluation'; // 旧形式
  } else {
    return 'none'; // なし
  }
}

/**
 * evaluation形式をtenEvaluation形式に変換
 */
function convertEvaluationFormat(tool) {
  if (!tool.evaluation) return;
  
  const eval_ = tool.evaluation;
  
  // tenEvaluation形式に変換
  tool.tenEvaluation = {
    immediacy: eval_.immediacy || 0,
    simplicity: eval_.simplicity || 0,
    popularity: eval_.popularity || 0,
    costPerformance: eval_.costPerformance || 0,
    specialization: eval_.specialization || 0,
    productivityGain: eval_.productivityGain || 0,
    tenScore: eval_.tenScore || 0,
    grade: calculateGrade(eval_.tenScore || 0),
    evaluationDate: new Date().toISOString().split('T')[0],
    totalScore: calculateTotalScoreFromValues(eval_)
  };
  
  // 古いevaluationフィールドを削除
  delete tool.evaluation;
}

/**
 * totalScoreを計算してtenEvaluationに追加
 */
function calculateTotalScore(tool) {
  if (!tool.tenEvaluation) return;
  
  tool.tenEvaluation.totalScore = calculateTotalScoreFromValues(tool.tenEvaluation);
  
  if (!tool.tenEvaluation.grade) {
    tool.tenEvaluation.grade = calculateGrade(tool.tenEvaluation.tenScore || 0);
  }
  
  if (!tool.tenEvaluation.evaluationDate) {
    tool.tenEvaluation.evaluationDate = new Date().toISOString().split('T')[0];
  }
}

/**
 * 6項目の単純合計でtotalScoreを計算
 */
function calculateTotalScoreFromValues(evaluation) {
  const total = 
    (evaluation.immediacy || 0) +
    (evaluation.simplicity || 0) +
    (evaluation.popularity || 0) +
    (evaluation.costPerformance || 0) +
    (evaluation.specialization || 0) +
    (evaluation.productivityGain || 0);
  
  return total;
}

/**
 * tenScoreからgradeを計算
 */
function calculateGrade(tenScore) {
  if (tenScore >= 90) return 'A';
  if (tenScore >= 80) return 'B';
  if (tenScore >= 70) return 'C';
  if (tenScore >= 60) return 'D';
  return 'F';
}

if (require.main === module) {
  unifyEvaluationFormat();
}

module.exports = { unifyEvaluationFormat };