#!/usr/bin/env node

/**
 * AIツールランキング自動生成システム V1
 * TEN DATABASE専用ランキング生成エンジン
 * KIKUYOシステム（企業DB）のパターンを完全踏襲
 */

const fs = require('fs');
const path = require('path');

// パスの設定
const DATA_FILE = path.join(__dirname, 'aiToolsMasterData.json');
const PATTERNS_FILE = path.join(__dirname, 'aiToolsTargetPatternsV1.js');
const OUTPUT_DIR = path.join(__dirname, 'rankingsV1');

// ターゲット別の出力ディレクトリ（TEN専用）
const TARGET_DIRS = {
  tenProductive: 'tenProductive'
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
    console.log(`- TEN生産性向け: ${patterns.tenProductive.length}パターン`);
    console.log(`- 合計: ${patterns.tenProductive.length}パターン`);
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
          console.log(`  ✅ 成功: ${ranking.tools.length}ツール取得 → ${pattern.name}.json`);
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
    console.error('❌ システムエラー:', error.message);
    process.exit(1);
  }
}

/**
 * マスターデータ読み込み
 */
function loadMasterData() {
  console.log('📁 マスターデータ読み込み中...');
  
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(`マスターデータファイルが見つかりません: ${DATA_FILE}`);
  }
  
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`✅ マスターデータ読み込み完了: バージョン ${data.version}`);
  
  return data;
}

/**
 * パターン定義読み込み
 */
function loadPatterns() {
  console.log('📋 パターン定義読み込み中...');
  
  if (!fs.existsSync(PATTERNS_FILE)) {
    throw new Error(`パターンファイルが見つかりません: ${PATTERNS_FILE}`);
  }
  
  delete require.cache[require.resolve(PATTERNS_FILE)];
  const patterns = require(PATTERNS_FILE);
  console.log('✅ パターン定義読み込み完了');
  
  return patterns;
}

/**
 * 全AIツールデータを1次元配列に変換
 */
function extractAllTools(masterData) {
  console.log('🔧 AIツールデータ変換中...');
  
  const tools = masterData.tools || [];
  
  // バッチ情報を各ツールに保持（デバッグ用）
  tools.forEach(tool => {
    if (!tool.batchNumber) {
      tool.batchNumber = 'unknown';
    }
  });
  
  console.log(`✅ データ変換完了: ${tools.length}ツール`);
  return tools;
}

/**
 * 出力ディレクトリ作成
 */
function createOutputDirectories() {
  console.log('📁 出力ディレクトリ作成中...');
  
  // メインディレクトリ
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // ターゲット別ディレクトリ
  for (const dir of Object.values(TARGET_DIRS)) {
    const targetDir = path.join(OUTPUT_DIR, dir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  }
  
  console.log('✅ ディレクトリ作成完了');
}

/**
 * ランキング生成（メイン処理）
 */
function generateRanking(allTools, pattern) {
  // 1. フィルタリング
  let filteredTools = filterTools(allTools, pattern.filters || {});
  
  // 2. ソート
  const sortedTools = sortTools(filteredTools, pattern);
  
  // 3. 上位N件取得
  const topTools = sortedTools.slice(0, pattern.limit || 10);
  
  // 4. ランキング構造作成
  const ranking = {
    rankingId: pattern.id,
    rankingName: pattern.name,
    description: pattern.description || '',
    generatedAt: new Date().toISOString(),
    criteria: pattern.criteria,
    filters: pattern.filters || {},
    totalCandidates: filteredTools.length,
    displayCount: topTools.length,
    tools: topTools.map((tool, index) => ({
      rank: index + 1,
      toolId: tool.id || tool.toolName || `tool_${index}`,
      name: tool.toolName || 'Unknown Tool',
      category: tool.category || 'Unknown',
      developer: tool.companyName || 'Unknown',
      totalScore: calculateTotalScore(tool), // 正しい合計スコア（600点満点）
      tenScore: tool.tenEvaluation?.tenScore || 0, // 参考値（0-100点）
      grade: tool.tenEvaluation?.grade || 'N/A',
      keyFeatures: tool.coreFeatures?.uniqueFeatures || tool.keyFeatures || [],
      pricingTier: tool.pricing?.freeTier ? 'Free' : (tool.pricing?.starterPrice > 0 ? 'Paid' : 'Unknown'),
      criteriaValue: getCriteriaValue(tool, pattern.criteria),
      batchNumber: tool.batchNumber || 'unknown'
    }))
  };
  
  return ranking;
}

/**
 * ツールフィルタリング
 */
function filterTools(tools, filters) {
  return tools.filter(tool => {
    for (const [key, value] of Object.entries(filters)) {
      if (!checkFilterCondition(tool, key, value)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * フィルタ条件チェック（ブラッシュアップ対象）
 */
function checkFilterCondition(tool, filterKey, filterValue) {
  switch (filterKey) {
    case 'category':
      return tool.category === filterValue;
      
    case 'pricingTier':
      if (filterValue === 'free') {
        return tool.pricing?.freeTier || tool.pricing?.starterPrice === 0;
      } else if (filterValue === 'paid') {
        return tool.pricing?.starterPrice > 0 || tool.pricing?.proPrice > 0;
      }
      return false;
      
    case 'tenScoreMin':
      return (tool.tenEvaluation?.tenScore || 0) >= filterValue;
      
    case 'tenScoreMax':
      return (tool.tenEvaluation?.tenScore || 0) <= filterValue;
      
    case 'hasFreeVersion':
      return filterValue ? (tool.pricing?.freeTier !== null || tool.pricing?.starterPrice === 0) : !tool.pricing?.freeTier;
      
    case 'supportsJapanese':
      return tool.localization?.japaneseSupport === '完全対応' || tool.localization?.japaneseUI === true;
      
    case 'hasAPI':
      return tool.platform?.apiAccess === filterValue;
      
    case 'easinessMin':
      return (tool.tenEvaluation?.easiness || 0) >= filterValue;
      
    case 'costEffectivenessMin':
      return (tool.tenEvaluation?.costEffectiveness || 0) >= filterValue;
      
    case 'productivityBoostMin':
      return (tool.tenEvaluation?.productivityBoost || 0) >= filterValue;
      
    // 新しいフィルタに対応
    case 'maxPrice':
      return (tool.pricing?.starterPrice || 0) <= filterValue;
      
    case 'difficultyLevel':
      if (filterValue === 'beginner') {
        return tool.usability?.learningCurve === 'Easy' || tool.usability?.targetUserLevel?.includes('初心者');
      }
      return true;
      
    case 'releaseYearMin':
      // リリース年の情報がないため、全てパスさせる
      return true;
      
    case 'establishedTool':
      // 確立されたツールの判定（コミュニティサイズなどで判定）
      return (tool.community?.communitySize || 0) > 100000;
      
    case 'recommendedByTen':
      // TEN推奨ツール（TENスコア85点以上とする）
      return (tool.tenEvaluation?.tenScore || 0) >= 85;
      
    default:
      console.warn(`⚠️  未対応フィルタ: ${filterKey}`);
      return true;
  }
}

/**
 * ツールソート
 */
function sortTools(tools, pattern) {
  const criteria = pattern.criteria;
  const sortOrder = pattern.sortOrder || 'desc';
  
  return tools.sort((a, b) => {
    const valueA = getCriteriaValue(a, criteria);
    const valueB = getCriteriaValue(b, criteria);
    
    if (sortOrder === 'asc') {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
}

/**
 * ソート基準値取得（totalScore修正版）
 */
function getCriteriaValue(tool, criteria) {
  switch (criteria) {
    case 'tenScore':
      // totalScoreを計算して使用（加重合計：600点満点）
      return calculateTotalScore(tool);
      
    case 'immediacy':
      return tool.tenEvaluation?.immediacy || 0;
      
    case 'easiness':
    case 'simplicity':
      return tool.tenEvaluation?.simplicity || 0;
      
    case 'popularity':
      return tool.tenEvaluation?.popularity || 0;
      
    case 'costEffectiveness':
    case 'costPerformance':
      return tool.tenEvaluation?.costPerformance || 0;
      
    case 'functionalSpecialty':
    case 'specialization':
      return tool.tenEvaluation?.specialization || 0;
      
    case 'productivityBoost':
    case 'productivityGain':
      return tool.tenEvaluation?.productivityGain || 0;
      
    default:
      console.warn(`⚠️  未対応ソート基準: ${criteria}`);
      return 0;
  }
}

/**
 * 正しいtotalScore計算（単純合計：600点満点）
 */
function calculateTotalScore(tool) {
  if (!tool.tenEvaluation) return 0;
  
  const eval_ = tool.tenEvaluation;
  
  // 既にtotalScoreが存在する場合はそれを使用
  if (eval_.totalScore && eval_.totalScore > 0) {
    return eval_.totalScore;
  }
  
  // 6項目の単純合計（各項目0-100点）
  const totalScore = 
    (eval_.immediacy || 0) +           // 即効性
    (eval_.simplicity || 0) +          // 簡単さ  
    (eval_.popularity || 0) +          // 人気度
    (eval_.costPerformance || 0) +     // コスパ
    (eval_.specialization || 0) +      // 機能専門性
    (eval_.productivityGain || 0);     // 生産性UP度
  
  return totalScore;
}

/**
 * ランキング保存
 */
function saveRanking(targetKey, pattern, ranking) {
  const targetDir = TARGET_DIRS[targetKey];
  const fileName = `${pattern.name}.json`; // 日本語名をそのまま使用
  const filePath = path.join(OUTPUT_DIR, targetDir, fileName);
  
  fs.writeFileSync(filePath, JSON.stringify(ranking, null, 2), 'utf8');
}

/**
 * ファイル名サニタイズ
 */
function sanitizeFileName(name) {
  return name
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
}

/**
 * ターゲット表示名取得
 */
function getTargetDisplayName(targetKey) {
  const displayNames = {
    tenProductive: 'TEN生産性向け'
  };
  return displayNames[targetKey] || targetKey;
}

/**
 * サマリー表示
 */
function displaySummary(stats) {
  console.log('\n📊 実行サマリー');
  console.log('============================================================');
  console.log(`総実行数: ${stats.total}`);
  console.log(`成功数: ${stats.success}`);
  console.log(`エラー数: ${stats.errors.length}`);
  console.log(`成功率: ${((stats.success / stats.total) * 100).toFixed(1)}%`);
  
  // ターゲット別統計
  for (const [target, targetStats] of Object.entries(stats.targetStats)) {
    const displayName = getTargetDisplayName(target);
    console.log(`\n${displayName}:`);
    console.log(`  成功: ${targetStats.success}/${targetStats.total}`);
  }
  
  // エラー詳細
  if (stats.errors.length > 0) {
    console.log('\n❌ エラー詳細:');
    stats.errors.forEach((error, index) => {
      console.log(`  ${index + 1}. ${error.pattern}: ${error.error}`);
    });
  }
}

/**
 * サマリーレポート保存
 */
function saveSummaryReport(stats) {
  const summaryPath = path.join(OUTPUT_DIR, 'execution_summary.json');
  const summary = {
    executedAt: new Date().toISOString(),
    version: 'V1',
    statistics: stats,
    outputDirectory: OUTPUT_DIR
  };
  
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`\n📄 サマリーレポート保存: ${summaryPath}`);
}

// Execute if run directly
if (require.main === module) {
  generateAllAIToolsRankings();
}

module.exports = generateAllAIToolsRankings;