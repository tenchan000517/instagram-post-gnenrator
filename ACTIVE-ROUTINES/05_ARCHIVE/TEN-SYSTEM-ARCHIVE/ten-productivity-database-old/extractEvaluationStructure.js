#!/usr/bin/env node
/**
 * 72ツール全てのevaluationフィールド構造抽出スクリプト
 * 各バッチのTEN評価データ形式を分析・統一化準備
 */
const fs = require('fs');
const path = require('path');

const BATCH_FILES = [
  { file: 'batch1-complete-results.json', batchNumber: 1 },
  { file: 'batch2-complete-results.json', batchNumber: 2 },
  { file: 'batch3-complete-results.json', batchNumber: 3 },
  { file: 'batch4-complete-results.json', batchNumber: 4 },
  { file: 'batch5-complete-results.json', batchNumber: 5 },
  { file: 'batch6-complete-results.json', batchNumber: 6 },
  { file: 'batch7-complete-results.json', batchNumber: 7 },
  { file: 'batch8-complete-results.json', batchNumber: 8 },
  { file: 'batch9-complete-results.json', batchNumber: 9 }
];

function extractEvaluationStructures() {
  console.log('🔍 72ツール全てのevaluation構造抽出開始');
  console.log('='.repeat(60));

  const results = {
    totalTools: 0,
    batchAnalysis: {},
    evaluationPatterns: {},
    inconsistencies: []
  };

  BATCH_FILES.forEach(({ file, batchNumber }) => {
    console.log(`\n📁 バッチ${batchNumber} - ${file}`);
    
    try {
      const filePath = path.join(__dirname, 'research-results', file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (!data.tools || !Array.isArray(data.tools)) {
        console.log(`  ❌ tools配列が存在しません`);
        return;
      }

      const batchResult = {
        toolCount: data.tools.length,
        evaluationFields: {},
        samples: []
      };

      data.tools.forEach((tool, index) => {
        results.totalTools++;
        
        // evaluation関連フィールドを全て検出
        const evaluationFields = findEvaluationFields(tool);
        
        // パターン分析
        Object.keys(evaluationFields).forEach(fieldPath => {
          const fieldType = typeof evaluationFields[fieldPath];
          const patternKey = `${fieldPath}:${fieldType}`;
          
          if (!results.evaluationPatterns[patternKey]) {
            results.evaluationPatterns[patternKey] = {
              count: 0,
              batches: new Set(),
              samples: []
            };
          }
          results.evaluationPatterns[patternKey].count++;
          results.evaluationPatterns[patternKey].batches.add(batchNumber);
          
          if (results.evaluationPatterns[patternKey].samples.length < 3) {
            results.evaluationPatterns[patternKey].samples.push({
              batch: batchNumber,
              tool: tool.toolName || tool.name || `Tool${index}`,
              value: evaluationFields[fieldPath]
            });
          }
        });

        // サンプルとして最初の2ツールの詳細を保存
        if (batchResult.samples.length < 2) {
          batchResult.samples.push({
            toolName: tool.toolName || tool.name || `Tool${index}`,
            evaluationFields: evaluationFields
          });
        }
      });

      results.batchAnalysis[batchNumber] = batchResult;
      console.log(`  ✅ ${batchResult.toolCount}ツール処理完了`);
      
    } catch (error) {
      console.log(`  ❌ エラー: ${error.message}`);
      results.inconsistencies.push({
        batch: batchNumber,
        error: error.message
      });
    }
  });

  // パターンを配列に変換（Setをstringifyできないため）
  Object.keys(results.evaluationPatterns).forEach(key => {
    results.evaluationPatterns[key].batches = Array.from(results.evaluationPatterns[key].batches);
  });

  console.log(`\n📊 全体統計`);
  console.log(`総ツール数: ${results.totalTools}`);
  console.log(`評価パターン数: ${Object.keys(results.evaluationPatterns).length}`);
  
  // 結果保存
  const outputFile = path.join(__dirname, 'evaluation-structure-analysis.json');
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n📄 詳細分析結果: ${outputFile}`);
  
  // 重要なパターンを表示
  console.log(`\n🔍 主要評価パターン:`);
  Object.entries(results.evaluationPatterns)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)
    .forEach(([pattern, info]) => {
      console.log(`  ${pattern}: ${info.count}回, バッチ[${info.batches.join(',')}]`);
    });

  return results;
}

/**
 * ツールオブジェクトからevaluation関連のフィールドを再帰的に抽出
 */
function findEvaluationFields(obj, prefix = '', result = {}) {
  Object.keys(obj).forEach(key => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    
    // evaluation関連のキーワードを含むフィールドを検出
    if (key.toLowerCase().includes('evaluation') || 
        key.toLowerCase().includes('score') || 
        key.toLowerCase().includes('ten') ||
        ['immediacy', 'simplicity', 'popularity', 'costPerformance', 'specialization', 'productivityGain', 'totalScore', 'grade'].includes(key)) {
      
      result[fullKey] = value;
      
      // オブジェクトの場合は中身も展開
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        findEvaluationFields(value, fullKey, result);
      }
    }
  });
  
  return result;
}

if (require.main === module) {
  extractEvaluationStructures();
}

module.exports = { extractEvaluationStructures };