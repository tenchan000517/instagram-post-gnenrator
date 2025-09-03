#!/usr/bin/env node

/**
 * AIツールランキング自動生成システム V3
 * 企業ランキング形式に準拠したAIツール専用システム
 */

const fs = require('fs');
const path = require('path');

// パスの設定
const MASTER_DATA_FILE = path.join(__dirname, 'aiToolsRankings_Final.json');
const PATTERNS_FILE = path.join(__dirname, 'aiToolsRankingPatternsV1.js');
const OUTPUT_DIR = path.join(__dirname, 'rankingsV3');

// ターゲット別の出力ディレクトリ
const TARGET_DIRS = {
  generalUsers: 'generalUsers',
  developers: 'developers', 
  creators: 'creators'
};

/**
 * メイン実行関数
 */
async function generateAllAIToolsRankings() {
  console.log('🚀 AIツールランキング生成システム V3 開始');
  console.log('============================================================');
  
  try {
    // データ読み込み
    const masterData = loadMasterData();
    const patterns = loadPatterns();
    
    // 全AIツールデータを配列に変換
    const allTools = extractAllTools(masterData);
    
    console.log(`✅ データロード完了: ${allTools.length}ツール`);
    console.log(`📊 実行パターン統計:`);
    console.log(`- 一般ユーザー向け: ${patterns.generalUsers.length}パターン`);
    console.log(`- 開発者向け: ${patterns.developers.length}パターン`);
    console.log(`- クリエイター向け: ${patterns.creators.length}パターン`);
    console.log(`- 合計: ${patterns.generalUsers.length + patterns.developers.length + patterns.creators.length}パターン`);
    console.log('');
    
    // 出力ディレクトリ作成
    createOutputDirectories();
    
    // 実行統計
    let totalGenerated = 0;
    let successCount = 0;
    let errorCount = 0;
    
    // 各ターゲット別ランキング生成
    for (const [targetType, targetPatterns] of Object.entries(patterns)) {
      console.log(`\\n🎯 ${targetType} ランキング生成開始 (${targetPatterns.length}パターン)`);
      
      for (const pattern of targetPatterns) {
        try {
          const ranking = generateRanking(allTools, pattern, targetType);
          const outputPath = path.join(OUTPUT_DIR, TARGET_DIRS[targetType], `${pattern.id}_${pattern.name}.json`);
          
          fs.writeFileSync(outputPath, JSON.stringify(ranking, null, 2));
          
          console.log(`  ✅ ${pattern.id}: ${pattern.name} (${ranking.tools.length}ツール)`);
          successCount++;
          
        } catch (error) {
          console.error(`  ❌ ${pattern.id}: ${error.message}`);
          errorCount++;
        }
        
        totalGenerated++;
      }
    }
    
    // 統計レポート
    console.log('\\n📊 生成統計:');
    console.log(`総パターン数: ${totalGenerated}`);
    console.log(`成功: ${successCount}`);
    console.log(`エラー: ${errorCount}`);
    console.log(`成功率: ${((successCount/totalGenerated)*100).toFixed(1)}%`);
    
    console.log('\\n🎉 全AIツールランキング生成完了！');
    
  } catch (error) {
    console.error('❌ 致命的エラー:', error);
    process.exit(1);
  }
}

/**
 * マスターデータ読み込み
 */
function loadMasterData() {
  if (!fs.existsSync(MASTER_DATA_FILE)) {
    throw new Error(`データファイルが見つかりません: ${MASTER_DATA_FILE}`);
  }
  
  const data = JSON.parse(fs.readFileSync(MASTER_DATA_FILE, 'utf8'));
  return data;
}

/**
 * パターン定義読み込み
 */
function loadPatterns() {
  if (!fs.existsSync(PATTERNS_FILE)) {
    throw new Error(`パターンファイルが見つかりません: ${PATTERNS_FILE}`);
  }
  
  // requireでJSファイルを読み込み
  delete require.cache[require.resolve(PATTERNS_FILE)];
  const patterns = require(PATTERNS_FILE);
  return patterns;
}

/**
 * 全AIツールデータを配列に抽出
 */
function extractAllTools(masterData) {
  // aiToolsRankings_Final.jsonのfull配列を取得
  if (masterData.rankings && masterData.rankings.full) {
    return masterData.rankings.full;
  }
  
  // fallback: 他の形式の場合
  if (Array.isArray(masterData.tools)) {
    return masterData.tools;
  }
  
  throw new Error('AIツールデータの形式が不正です');
}

/**
 * 出力ディレクトリ作成
 */
function createOutputDirectories() {
  // rankingsV3ディレクトリ作成
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // 各ターゲット別ディレクトリ作成
  for (const dirName of Object.values(TARGET_DIRS)) {
    const targetDir = path.join(OUTPUT_DIR, dirName);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  }
}

/**
 * 個別ランキング生成
 */
function generateRanking(tools, pattern, targetType) {
  // フィルタリング
  const filtered = filterTools(tools, pattern.filters);
  
  if (filtered.length === 0) {
    throw new Error('フィルター条件に該当するツールが見つかりません');
  }
  
  // ソート
  const sorted = sortTools(filtered, pattern.criteria, pattern.sortOrder || 'desc');
  
  // 上位N件取得
  const topTools = sorted.slice(0, pattern.limit);
  
  // ターゲット別の説明とカテゴリ設定
  const targetInfo = getTargetInfo(targetType);
  
  return {
    id: pattern.id,
    title: pattern.name,
    description: `${targetInfo.description}向けの${pattern.name}です。調整済みスコアに基づいて選出しています。`,
    category: targetInfo.category,
    targetAudience: targetInfo.audience,
    criteria: pattern.criteria,
    filters: pattern.filters,
    generatedAt: new Date().toISOString(),
    totalMatched: filtered.length,
    tools: topTools.map((tool, index) => ({
      rank: index + 1,
      toolName: tool.toolName || 'undefined',
      category: tool.category || 'undefined',
      companyName: tool.companyName || 'undefined',
      score: tool.adjustedTenScore || tool.tenEvaluation?.totalScore || 0,
      originalScore: tool.originalTenScore || tool.tenEvaluation?.totalScore || 0,
      officialUrl: tool.officialUrl || '',
      metrics: {
        immediacy: tool.tenEvaluation?.immediacy || 0,
        simplicity: tool.tenEvaluation?.simplicity || 0,
        popularity: tool.tenEvaluation?.popularity || 0,
        costPerformance: tool.tenEvaluation?.costPerformance || 0,
        specialization: tool.tenEvaluation?.specialization || 0,
        productivityGain: tool.tenEvaluation?.productivityGain || 0
      },
      features: {
        primaryFunction: tool.coreFeatures?.primaryFunction || '',
        uniqueFeatures: tool.coreFeatures?.uniqueFeatures || [],
        platforms: getPlatformList(tool.platform) || []
      },
      pricing: {
        hasFreeVersion: tool.pricing?.freeTier ? true : false,
        starterPrice: tool.pricing?.starterPrice || null,
        currency: tool.pricing?.currency || 'USD'
      }
    }))
  };
}

/**
 * AIツールフィルタリング
 */
function filterTools(tools, filters) {
  let result = [...tools];
  
  // カテゴリフィルター
  if (filters.category) {
    result = result.filter(tool => tool.category === filters.category);
  }
  
  // 複数カテゴリフィルター
  if (filters.categories && filters.categories.length > 0) {
    result = result.filter(tool => filters.categories.includes(tool.category));
  }
  
  // 無料版フィルター
  if (filters.hasFreeVersion === true) {
    result = result.filter(tool => tool.pricing?.freeTier || tool.pricing?.starterPrice === 0);
  }
  
  // 有料のみフィルター
  if (filters.isPaidOnly === true) {
    result = result.filter(tool => !tool.pricing?.freeTier && tool.pricing?.starterPrice > 0);
  }
  
  // 日本語対応フィルター
  if (filters.supportsJapanese === true) {
    result = result.filter(tool => 
      tool.coreFeatures?.languages?.includes('Japanese') || 
      tool.coreFeatures?.languages?.includes('日本語') ||
      (tool.toolName && ['ChatGPT', 'Gemini', 'Claude'].includes(tool.toolName))
    );
  }
  
  // リリース年フィルター
  if (filters.releaseYear) {
    result = result.filter(tool => {
      const releaseDate = tool.releaseInfo?.initialRelease;
      return releaseDate && releaseDate.includes(filters.releaseYear);
    });
  }
  
  // API アクセスフィルター
  if (filters.hasAPIAccess === true) {
    result = result.filter(tool => tool.platform?.apiAccess === true);
  }
  
  // その他の条件...（必要に応じて追加）
  
  return result;
}

/**
 * AIツールソート
 */
function sortTools(tools, criteria, sortOrder = 'desc') {
  const sorted = [...tools].sort((a, b) => {
    let valueA, valueB;
    
    switch (criteria) {
      case 'adjustedTenScore':
        valueA = a.adjustedTenScore || a.tenEvaluation?.totalScore || 0;
        valueB = b.adjustedTenScore || b.tenEvaluation?.totalScore || 0;
        break;
      case 'immediacy':
      case 'simplicity':
      case 'popularity':
      case 'costPerformance':
      case 'specialization':
      case 'productivityGain':
        valueA = a.tenEvaluation?.[criteria] || 0;
        valueB = b.tenEvaluation?.[criteria] || 0;
        break;
      case 'userCount':
        valueA = a.userMetrics?.userCount || 0;
        valueB = b.userMetrics?.userCount || 0;
        break;
      default:
        valueA = a.adjustedTenScore || 0;
        valueB = b.adjustedTenScore || 0;
    }
    
    return sortOrder === 'desc' ? valueB - valueA : valueA - valueB;
  });
  
  return sorted;
}

/**
 * ターゲット情報取得
 */
function getTargetInfo(targetType) {
  const targetInfoMap = {
    generalUsers: {
      description: '一般ユーザー',
      category: 'AIツール総合',
      audience: 'T004: 26-29歳会社員・一般ユーザー'
    },
    developers: {
      description: '開発者・エンジニア',
      category: '開発者向けAIツール',
      audience: 'T004: 26-29歳会社員・開発者・エンジニア'
    },
    creators: {
      description: 'クリエイター・デザイナー',
      category: 'クリエイター向けAIツール',
      audience: 'T004: 26-29歳会社員・クリエイター・デザイナー'
    }
  };
  
  return targetInfoMap[targetType] || targetInfoMap.generalUsers;
}

/**
 * プラットフォーム一覧取得
 */
function getPlatformList(platform) {
  if (!platform) return [];
  
  const platforms = [];
  if (platform.web) platforms.push('Web');
  if (platform.ios) platforms.push('iOS');
  if (platform.android) platforms.push('Android');
  if (platform.windows) platforms.push('Windows');
  if (platform.mac) platforms.push('macOS');
  if (platform.linux) platforms.push('Linux');
  if (platform.apiAccess) platforms.push('API');
  if (platform.browserExtension) platforms.push('Browser Extension');
  
  return platforms;
}

// メイン実行
if (require.main === module) {
  generateAllAIToolsRankings();
}

module.exports = {
  generateAllAIToolsRankings,
  generateRanking
};