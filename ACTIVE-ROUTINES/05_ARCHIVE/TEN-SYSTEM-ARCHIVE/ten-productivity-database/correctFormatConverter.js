#!/usr/bin/env node
/**
 * 正しいin-place変換スクリプト
 * 既存の各バッチファイルを直接編集して正解形式に統一
 * 
 * 正解形式:
 * "tenEvaluation": {
 *   "immediacy": number,       // 即効性 (0-100)
 *   "simplicity": number,      // 簡単さ (0-100)
 *   "popularity": number,      // 人気度 (0-100)
 *   "costPerformance": number, // コスパ (0-100)
 *   "specialization": number,  // 機能専門性 (0-100)
 *   "productivityGain": number,// 生産性UP度 (0-100)
 *   "totalScore": number       // 6項目の単純合計
 * }
 */

const fs = require('fs');
const path = require('path');

const RESEARCH_DIR = path.join(__dirname, 'research-results');
const BATCH_FILES = [
  'batch1-complete-results.json',
  'batch2-complete-results.json', 
  'batch3-complete-results.json',
  'batch4-complete-results.json',
  'batch5-complete-results.json',
  'batch6-complete-results.json',
  'batch7-complete-results.json',
  'batch8-complete-results.json',
  'batch9-complete-results.json'
];

function correctFormatConverter() {
  console.log('🔧 正しいin-place変換開始');
  console.log('='.repeat(60));
  
  let totalConverted = 0;
  
  BATCH_FILES.forEach((filename, index) => {
    const batchNumber = index + 1;
    const filePath = path.join(RESEARCH_DIR, filename);
    
    console.log(`\n📁 バッチ${batchNumber}: ${filename}`);
    
    if (!fs.existsSync(filePath)) {
      console.log('  ⚠️  ファイル存在しません');
      return;
    }
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      let tools = getToolsArray(data);
      
      if (!tools || tools.length === 0) {
        console.log('  ⚠️  ツール配列が存在しません');
        return;
      }
      
      console.log(`  📊 ${tools.length}ツール処理開始`);
      let convertedCount = 0;
      
      // 各ツールの評価データを正解形式に変換
      tools.forEach((tool, idx) => {
        const originalEval = extractEvaluationData(tool, batchNumber);
        const convertedEval = convertToCorrectFormat(originalEval, batchNumber);
        
        if (convertedEval) {
          // 既存の評価関連フィールドを削除
          delete tool.evaluation;
          delete tool.tenScore;
          delete tool.tenEvaluation;
          
          // 正解形式で設定
          tool.tenEvaluation = convertedEval;
          convertedCount++;
        }
      });
      
      // ファイルを直接上書き保存
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✅ ${convertedCount}ツール変換完了`);
      totalConverted += convertedCount;
      
    } catch (error) {
      console.log(`  ❌ エラー: ${error.message}`);
    }
  });
  
  console.log(`\n🎉 変換完了: 合計${totalConverted}ツール`);
  console.log('='.repeat(60));
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
 * ツールから評価データを抽出
 */
function extractEvaluationData(tool, batchNumber) {
  // バッチ別の評価データ抽出
  switch (batchNumber) {
    case 1:
      // evaluation形式（バッチ2,3と同じ）
      return tool.evaluation || null;
      
    case 2:
    case 3:
    case 5:
      // evaluation形式
      return tool.evaluation || null;
      
    case 4:
      // tenScore形式
      return tool.tenScore || null;
      
    case 6:
    case 9:
      // 既に正解形式
      return tool.tenEvaluation || null;
      
    case 7:
      // tenEvaluation形式（フィールド名違い）
      return tool.tenEvaluation || null;
      
    case 8:
      // tenEvaluation形式（overallTenScore）
      return tool.tenEvaluation || null;
      
    default:
      return null;
  }
}

/**
 * 正解形式に変換
 */
function convertToCorrectFormat(evalData, batchNumber) {
  if (!evalData) return null;
  
  const correctFormat = {
    immediacy: null,
    simplicity: null,
    popularity: null,
    costPerformance: null,
    specialization: null,
    productivityGain: null,
    totalScore: null
  };
  
  // バッチ別のフィールドマッピング
  switch (batchNumber) {
    case 1:
    case 2:
    case 3:
    case 5:
      // evaluation形式 → 正解形式
      correctFormat.immediacy = evalData.immediacy || null;
      correctFormat.simplicity = evalData.simplicity || null;
      correctFormat.popularity = evalData.popularity || null;
      correctFormat.costPerformance = evalData.costPerformance || null;
      correctFormat.specialization = evalData.specialization || null;
      correctFormat.productivityGain = evalData.productivityGain || null;
      break;
      
    case 4:
      // tenScore形式 → 正解形式（不完全データ）
      correctFormat.immediacy = evalData.immediacy || null;
      correctFormat.simplicity = evalData.simplicity || null;
      correctFormat.popularity = evalData.popularity || null;
      // costPerformance, specialization, productivityGain は null
      break;
      
    case 6:
      // 既に正解形式
      correctFormat.immediacy = evalData.immediacy || null;
      correctFormat.simplicity = evalData.simplicity || null;
      correctFormat.popularity = evalData.popularity || null;
      correctFormat.costPerformance = evalData.costPerformance || null;
      correctFormat.specialization = evalData.specialization || null;
      correctFormat.productivityGain = evalData.productivityGain || null;
      break;
      
    case 9:
      // バッチ9の実際のフィールド名でマッピング
      correctFormat.immediacy = evalData.immediateEffect || null;
      correctFormat.simplicity = evalData.simplicity || null;
      correctFormat.popularity = evalData.popularity || null;
      correctFormat.costPerformance = evalData.costEffectiveness || null;
      correctFormat.specialization = evalData.functionalSpecialty || null;
      correctFormat.productivityGain = evalData.productivityBoost || null;
      break;
      
    case 7:
      // フィールド名マッピング
      correctFormat.immediacy = evalData.immediateEffect || null;
      correctFormat.simplicity = evalData.easeOfUse || null;
      correctFormat.popularity = evalData.popularity || null;
      correctFormat.costPerformance = evalData.costEffectiveness || null;
      correctFormat.specialization = evalData.functionalSpecialization || null;
      correctFormat.productivityGain = evalData.productivityBoost || null;
      break;
      
    case 8:
      // tenEvaluation形式（overallTenScore）
      correctFormat.immediacy = evalData.immediacy || null;
      correctFormat.simplicity = evalData.simplicity || null;
      correctFormat.popularity = evalData.popularity || null;
      correctFormat.costPerformance = evalData.costPerformance || null;
      correctFormat.specialization = evalData.specialization || null;
      correctFormat.productivityGain = evalData.productivityGain || null;
      break;
  }
  
  // totalScore計算（有効な値がある場合のみ）
  const values = [
    correctFormat.immediacy,
    correctFormat.simplicity,
    correctFormat.popularity,
    correctFormat.costPerformance,
    correctFormat.specialization,
    correctFormat.productivityGain
  ].filter(val => val !== null && !isNaN(val));
  
  if (values.length === 6) {
    // 6項目すべて揃っている場合
    correctFormat.totalScore = values.reduce((sum, val) => sum + val, 0);
  } else if (values.length > 0) {
    // 部分的にデータがある場合（残りをnullのまま）
    correctFormat.totalScore = null;
  }
  
  return correctFormat;
}

if (require.main === module) {
  correctFormatConverter();
}

module.exports = { correctFormatConverter };