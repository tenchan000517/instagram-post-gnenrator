#!/usr/bin/env node

/**
 * AIツールランキング自動生成システム V1
 * TENスコア修正後のデータベースに対応
 */

const fs = require('fs');
const path = require('path');

// パスの設定
const DATA_FILE = path.join(__dirname, 'aiToolsMasterData.json');
const PATTERNS_FILE = path.join(__dirname, 'aiToolsRankingPatternsV1.js');
const OUTPUT_DIR = path.join(__dirname, 'rankingV6');

// ターゲット別の出力ディレクトリ
const TARGET_DIRS = {
  generalUsers: 'generalUsers',
  developers: 'developers', 
  creators: 'creators',
  universal: 'universal'
};

/**
 * メイン実行関数
 */
async function generateAllAIToolsRankings() {
  console.log('🚀 AIツールランキング生成システム V1 開始');
  console.log('============================================================');
  
  try {
    // データ読み込み
    const masterData = loadMasterData();
    const patterns = loadPatterns();
    
    // 全AIツールデータを1次元配列に変換
    const allTools = extractAllTools(masterData);
    
    console.log(`✅ データロード完了: ${allTools.length}ツール`);
    console.log(`📊 実行パターン統計:`);
    console.log(`- 一般ユーザー向け: ${patterns.generalUsers.length}パターン`);
    console.log(`- 開発者向け: ${patterns.developers.length}パターン`);
    console.log(`- クリエイター向け: ${patterns.creators.length}パターン`);
    console.log(`- 横断的: ${patterns.universal.length}パターン`);
    console.log(`- 合計: ${patterns.generalUsers.length + patterns.developers.length + patterns.creators.length + patterns.universal.length}パターン`);
    console.log('');
    
    // 出力ディレクトリ作成
    createOutputDirectories();
    
    // 実行統計
    const stats = {
      total: 0,
      success: 0,
      errors: [],
      targetStats: {}
    };
    
    // ターゲット別にランキング生成
    for (const [targetKey, targetPatterns] of Object.entries(patterns)) {
      const targetName = getTargetDisplayName(targetKey);
      console.log(`\n🎯 ${targetName}ランキング生成開始 (${targetPatterns.length}パターン)`);
      console.log('--------------------------------------------------');
      
      stats.targetStats[targetKey] = { total: 0, success: 0 };
      
      for (let i = 0; i < targetPatterns.length; i++) {
        const pattern = targetPatterns[i];
        stats.total++;
        stats.targetStats[targetKey].total++;
        
        try {
          const ranking = generateRanking(allTools, pattern);
          saveRanking(targetKey, pattern, ranking);
          
          stats.success++;
          stats.targetStats[targetKey].success++;
          
          console.log(`[${i + 1}/${targetPatterns.length}] ${pattern.id}: ${pattern.name}`);
          console.log(`  ✅ 成功: ${ranking.tools.length}ツール取得 → ${pattern.id}_${sanitizeFileName(pattern.name)}.json`);
        } catch (error) {
          stats.errors.push({
            target: targetKey,
            pattern: pattern.id,
            name: pattern.name,
            error: error.message
          });
          
          console.log(`[${i + 1}/${targetPatterns.length}] ${pattern.id}: ${pattern.name}`);
          console.log(`  ❌ エラー: ${error.message}`);
        }
      }
    }
    
    // サマリー表示
    displaySummary(stats);
    
    // サマリーレポート保存
    saveSummaryReport(stats);
    
    console.log('\n🎉 全AIツールランキング生成完了！');
    
  } catch (error) {
    console.error('❌ 致命的エラーが発生しました:', error.message);
    process.exit(1);
  }
}

/**
 * マスターデータ読み込み
 */
function loadMasterData() {
  console.log('📂 マスターデータ読み込み中...');
  
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(`データファイルが見つかりません: ${DATA_FILE}`);
  }
  
  const rawData = fs.readFileSync(DATA_FILE, 'utf8');
  const data = JSON.parse(rawData);
  
  console.log(`✅ マスターデータロード完了`);
  return data;
}

/**
 * パターンファイル読み込み
 */
function loadPatterns() {
  console.log('📋 ランキングパターン読み込み中...');
  
  if (!fs.existsSync(PATTERNS_FILE)) {
    throw new Error(`パターンファイルが見つかりません: ${PATTERNS_FILE}`);
  }
  
  const patterns = require(PATTERNS_FILE);
  
  console.log(`✅ ランキングパターンロード完了`);
  return patterns;
}

/**
 * 全AIツールデータを1次元配列に変換
 */
function extractAllTools(masterData) {
  if (!masterData.tools || !Array.isArray(masterData.tools)) {
    throw new Error('マスターデータの形式が正しくありません（tools配列が見つかりません）');
  }
  
  return masterData.tools;
}

/**
 * 出力ディレクトリ作成
 */
function createOutputDirectories() {
  // メインディレクトリ作成
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // ターゲット別ディレクトリ作成
  for (const dirName of Object.values(TARGET_DIRS)) {
    const targetDir = path.join(OUTPUT_DIR, dirName);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  }
  
  console.log('📁 出力ディレクトリ準備完了');
}

/**
 * ランキング生成
 */
function generateRanking(allTools, pattern) {
  let filteredTools = [...allTools];
  
  // フィルター適用
  if (pattern.filters && Object.keys(pattern.filters).length > 0) {
    filteredTools = applyFilters(filteredTools, pattern.filters);
  }
  
  // ソート
  filteredTools = sortByCriteria(filteredTools, pattern.criteria);
  
  // 上位N件に制限
  if (pattern.limit) {
    filteredTools = filteredTools.slice(0, pattern.limit);
  }
  
  // ランキング形式に変換
  const ranking = {
    patternId: pattern.id,
    patternName: pattern.name,
    criteria: pattern.criteria,
    limit: pattern.limit,
    filters: pattern.filters || {},
    generatedAt: new Date().toISOString(),
    totalMatched: filteredTools.length,
    tools: filteredTools.map((tool, index) => ({
      rank: index + 1,
      toolName: tool.toolName,
      score: getCriteriaScore(tool, pattern.criteria),
      totalScore: tool.tenEvaluation?.totalScore || 0,
      starRating: generateStarRating(tool.tenEvaluation?.totalScore || 0),
      id: tool.id,
      category: tool.category,
      subCategory: tool.subCategory,
      companyName: tool.companyName,
      officialUrl: tool.officialUrl,
      releaseInfo: tool.releaseInfo,
      userMetrics: tool.userMetrics,
      platform: tool.platform,
      pricing: tool.pricing,
      coreFeatures: tool.coreFeatures,
      technicalSpecs: tool.technicalSpecs,
      localization: tool.localization,
      usability: tool.usability,
      performance: tool.performance,
      community: tool.community,
      competitiveAnalysis: tool.competitiveAnalysis,
      businessMetrics: tool.businessMetrics,
      tenEvaluation: tool.tenEvaluation,
      batchNumber: tool.batchNumber,
      toolRange: tool.toolRange,
      dataCollectionBatch: tool.dataCollectionBatch,
      lastVerified: tool.lastVerified,
      sources: tool.sources,
      additionalNotes: tool.additionalNotes
    }))
  };
  
  return ranking;
}

/**
 * フィルター適用
 */
function applyFilters(tools, filters) {
  return tools.filter(tool => {
    for (const [key, value] of Object.entries(filters)) {
      if (!checkFilter(tool, key, value)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * 個別フィルターチェック
 */
function checkFilter(tool, filterKey, filterValue) {
  switch (filterKey) {
    case 'category':
      return tool.category === filterValue;
    case 'subCategory':
      return tool.subCategory === filterValue;
    case 'hasFreeVersion':
      return tool.pricingModel?.free === filterValue;
    case 'supportsJapanese':
      return tool.technicalMetrics?.supportedLanguages >= 1; // 簡易判定
    case 'hasAPIAccess':
      return tool.technicalMetrics?.apiAvailable === filterValue;
    case 'releaseYear':
      return tool.releaseInfo?.initialRelease?.includes(filterValue);
    default:
      return true; // 未知のフィルターは無視
  }
}

/**
 * 基準でソート
 */
function sortByCriteria(tools, criteria) {
  return tools.sort((a, b) => {
    const scoreA = getCriteriaScore(a, criteria);
    const scoreB = getCriteriaScore(b, criteria);
    
    if (scoreB !== scoreA) {
      return scoreB - scoreA; // 降順
    }
    
    // 同点の場合はツール名でソート
    return a.toolName.localeCompare(b.toolName);
  });
}

/**
 * 基準スコア取得
 */
function getCriteriaScore(tool, criteria) {
  if (!tool.tenEvaluation) {
    return 0;
  }
  
  switch (criteria) {
    case 'adjustedTenScore':
    case 'totalScore':
      return tool.tenEvaluation.totalScore || 0;
    case 'immediacy':
      return tool.tenEvaluation.immediacy || 0;
    case 'simplicity':
      return tool.tenEvaluation.simplicity || 0;
    case 'popularity':
      return tool.tenEvaluation.popularity || 0;
    case 'costPerformance':
      return tool.tenEvaluation.costPerformance || 0;
    case 'specialization':
      return tool.tenEvaluation.specialization || 0;
    case 'productivityGain':
      return tool.tenEvaluation.productivityGain || 0;
    default:
      return tool.tenEvaluation.totalScore || 0;
  }
}

/**
 * スター評価生成
 */
function generateStarRating(totalScore) {
  if (totalScore >= 550) return '★★★★★';
  if (totalScore >= 530) return '★★★★☆';
  if (totalScore >= 510) return '★★★★';
  if (totalScore >= 490) return '★★★☆';
  if (totalScore >= 470) return '★★★';
  return '★★☆';
}

/**
 * ランキング保存
 */
function saveRanking(targetKey, pattern, ranking) {
  const fileName = `${pattern.id}_${sanitizeFileName(pattern.name)}.json`;
  const filePath = path.join(OUTPUT_DIR, TARGET_DIRS[targetKey], fileName);
  
  fs.writeFileSync(filePath, JSON.stringify(ranking, null, 2), 'utf8');
}

/**
 * ファイル名サニタイズ
 */
function sanitizeFileName(name) {
  return name
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}

/**
 * ターゲット表示名取得
 */
function getTargetDisplayName(targetKey) {
  const names = {
    generalUsers: '一般ユーザー',
    developers: '開発者',
    creators: 'クリエイター',
    universal: '横断的'
  };
  
  return names[targetKey] || targetKey;
}

/**
 * サマリー表示
 */
function displaySummary(stats) {
  console.log('\n📊 生成結果サマリー');
  console.log('============================================================');
  console.log(`✅ 成功: ${stats.success}/${stats.total} (${((stats.success / stats.total) * 100).toFixed(1)}%)`);
  
  if (stats.errors.length > 0) {
    console.log(`❌ エラー: ${stats.errors.length}件`);
    stats.errors.forEach(error => {
      console.log(`  - ${error.pattern}: ${error.error}`);
    });
  }
  
  console.log('\n📈 ターゲット別統計:');
  for (const [target, targetStat] of Object.entries(stats.targetStats)) {
    const targetName = getTargetDisplayName(target);
    console.log(`  ${targetName}: ${targetStat.success}/${targetStat.total} (${((targetStat.success / targetStat.total) * 100).toFixed(1)}%)`);
  }
}

/**
 * サマリーレポート保存
 */
function saveSummaryReport(stats) {
  const report = {
    executionTime: new Date().toISOString(),
    summary: {
      total: stats.total,
      success: stats.success,
      errorCount: stats.errors.length,
      successRate: ((stats.success / stats.total) * 100).toFixed(1) + '%'
    },
    targetStats: stats.targetStats,
    errors: stats.errors
  };
  
  const reportPath = path.join(OUTPUT_DIR, 'generation_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  
  console.log(`\n📄 実行レポート保存: ${reportPath}`);
}

// メイン実行
if (require.main === module) {
  generateAllAIToolsRankings();
}

module.exports = {
  generateAllAIToolsRankings,
  generateRanking
};