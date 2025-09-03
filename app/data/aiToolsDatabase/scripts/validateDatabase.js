const fs = require('fs');
const path = require('path');

/**
 * AIツールデータベース検証スクリプト
 * 
 * 使用方法:
 * node scripts/validateDatabase.js
 */

console.log('=== AI Tools Database - Validation ===\n');

const masterDataPath = 'aiToolsMasterData.json';

// ファイル存在確認
if (!fs.existsSync(masterDataPath)) {
  console.error(`❌ エラー: マスターデータが見つかりません: ${masterDataPath}`);
  process.exit(1);
}

try {
  // データ読み込み
  console.log('📥 データ読み込み中...');
  const masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf-8'));
  
  console.log(`📊 総ツール数: ${masterData.tools.length}`);
  console.log(`📊 メタデータ記載総数: ${masterData.totalTools || 'なし'}`);
  
  // 検証結果格納
  const validationResults = {
    errors: [],
    warnings: [],
    info: [],
    statistics: {}
  };
  
  // 1. 基本構造検証
  console.log('\n🔍 基本構造検証...');
  
  if (!masterData.tools || !Array.isArray(masterData.tools)) {
    validationResults.errors.push('tools配列が存在しません');
  }
  
  if (masterData.totalTools !== masterData.tools.length) {
    validationResults.warnings.push(`totalTools (${masterData.totalTools}) と実際のツール数 (${masterData.tools.length}) が一致しません`);
  }
  
  // 2. ID重複チェック
  console.log('🔍 ID重複チェック...');
  const ids = masterData.tools.map(tool => tool.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  
  if (duplicateIds.length > 0) {
    validationResults.errors.push(`重複ID検出: ${[...new Set(duplicateIds)].join(', ')}`);
  }
  
  // 3. 必須フィールドチェック
  console.log('🔍 必須フィールドチェック...');
  const requiredFields = ['id', 'toolName', 'category', 'tenEvaluation'];
  const missingFields = {};
  
  masterData.tools.forEach((tool, index) => {
    requiredFields.forEach(field => {
      if (!tool[field]) {
        if (!missingFields[field]) missingFields[field] = [];
        missingFields[field].push(`${tool.id || `index:${index}`}`);
      }
    });
    
    // TEN評価フィールドチェック
    if (tool.tenEvaluation) {
      const tenFields = ['immediacy', 'simplicity', 'popularity', 'costPerformance', 'specialization', 'productivityGain', 'totalScore'];
      tenFields.forEach(tenField => {
        if (typeof tool.tenEvaluation[tenField] !== 'number') {
          if (!missingFields[`tenEvaluation.${tenField}`]) missingFields[`tenEvaluation.${tenField}`] = [];
          missingFields[`tenEvaluation.${tenField}`].push(tool.id || `index:${index}`);
        }
      });
    }
  });
  
  Object.keys(missingFields).forEach(field => {
    validationResults.errors.push(`${field} が欠落: ${missingFields[field].slice(0, 5).join(', ')}${missingFields[field].length > 5 ? ' ...' : ''}`);
  });
  
  // 4. スコア整合性チェック
  console.log('🔍 スコア整合性チェック...');
  const scoreInconsistencies = [];
  
  masterData.tools.forEach(tool => {
    if (tool.tenEvaluation && typeof tool.tenEvaluation.totalScore === 'number') {
      const calculatedTotal = (
        (tool.tenEvaluation.immediacy || 0) +
        (tool.tenEvaluation.simplicity || 0) +
        (tool.tenEvaluation.popularity || 0) +
        (tool.tenEvaluation.costPerformance || 0) +
        (tool.tenEvaluation.specialization || 0) +
        (tool.tenEvaluation.productivityGain || 0)
      );
      
      if (Math.abs(calculatedTotal - tool.tenEvaluation.totalScore) > 1) {
        scoreInconsistencies.push(`${tool.id}: 計算値${calculatedTotal} vs 記録値${tool.tenEvaluation.totalScore}`);
      }
    }
  });
  
  if (scoreInconsistencies.length > 0) {
    validationResults.warnings.push(`スコア不整合: ${scoreInconsistencies.slice(0, 3).join(', ')}${scoreInconsistencies.length > 3 ? ' ...' : ''}`);
  }
  
  // 5. 統計情報生成
  console.log('📊 統計情報生成...');
  
  const categories = {};
  const scores = [];
  const companies = {};
  
  masterData.tools.forEach(tool => {
    // カテゴリ分析
    if (tool.category) {
      categories[tool.category] = (categories[tool.category] || 0) + 1;
    }
    
    // スコア分析
    if (tool.tenEvaluation && typeof tool.tenEvaluation.totalScore === 'number') {
      scores.push(tool.tenEvaluation.totalScore);
    }
    
    // 企業分析
    if (tool.companyName) {
      companies[tool.companyName] = (companies[tool.companyName] || 0) + 1;
    }
  });
  
  validationResults.statistics = {
    totalTools: masterData.tools.length,
    categories: Object.keys(categories).length,
    topCategories: Object.entries(categories)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5),
    scoreStats: scores.length > 0 ? {
      average: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 100) / 100,
      min: Math.min(...scores),
      max: Math.max(...scores),
      count: scores.length
    } : null,
    uniqueCompanies: Object.keys(companies).length
  };
  
  // 結果出力
  console.log('\n' + '='.repeat(50));
  console.log('📋 検証結果');
  console.log('='.repeat(50));
  
  if (validationResults.errors.length > 0) {
    console.log('\n❌ エラー:');
    validationResults.errors.forEach(error => console.log(`  - ${error}`));
  }
  
  if (validationResults.warnings.length > 0) {
    console.log('\n⚠️  警告:');
    validationResults.warnings.forEach(warning => console.log(`  - ${warning}`));
  }
  
  if (validationResults.info.length > 0) {
    console.log('\nℹ️  情報:');
    validationResults.info.forEach(info => console.log(`  - ${info}`));
  }
  
  console.log('\n📊 統計情報:');
  const stats = validationResults.statistics;
  console.log(`  総ツール数: ${stats.totalTools}`);
  console.log(`  カテゴリ数: ${stats.categories}`);
  console.log(`  ユニーク企業数: ${stats.uniqueCompanies}`);
  
  if (stats.scoreStats) {
    console.log(`  スコア統計: 平均${stats.scoreStats.average}点 (${stats.scoreStats.min}-${stats.scoreStats.max}点)`);
  }
  
  console.log('\n📈 主要カテゴリ:');
  stats.topCategories.forEach(([category, count]) => {
    console.log(`  - ${category}: ${count}ツール`);
  });
  
  // 検証結果ファイル保存
  const reportPath = `validation-report-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(reportPath, JSON.stringify(validationResults, null, 2));
  console.log(`\n📄 詳細レポート保存: ${reportPath}`);
  
  // 総合判定
  if (validationResults.errors.length === 0) {
    console.log('\n✅ データベース検証完了: エラーなし');
    process.exit(0);
  } else {
    console.log(`\n❌ データベース検証完了: ${validationResults.errors.length}個のエラー`);
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ 検証中にエラーが発生しました:', error.message);
  process.exit(1);
}