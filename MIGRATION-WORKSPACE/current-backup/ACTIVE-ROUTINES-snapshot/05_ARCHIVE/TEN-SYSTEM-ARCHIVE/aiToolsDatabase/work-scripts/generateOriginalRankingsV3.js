#!/usr/bin/env node

/**
 * AIツール オリジナルランキング生成システム V3
 * 補正なし（元スコア）でのランキング生成 + 順位・名前一覧ドキュメント作成
 */

const fs = require('fs');
const path = require('path');

// パスの設定
const MASTER_DATA_FILE = path.join(__dirname, 'aiToolsMasterData.json');
const PATTERNS_FILE = path.join(__dirname, 'aiToolsRankingPatternsV1.js');
const OUTPUT_DIR = path.join(__dirname, 'rankingsV3_Original');

// ターゲット別の出力ディレクトリ
const TARGET_DIRS = {
  generalUsers: 'generalUsers',
  developers: 'developers', 
  creators: 'creators'
};

/**
 * メイン実行関数
 */
async function generateOriginalRankings() {
  console.log('🚀 AIツール オリジナルランキング生成システム V3 開始');
  console.log('============================================================');
  
  try {
    // データ読み込み
    const masterData = loadMasterData();
    const patterns = loadPatterns();
    
    // 全AIツールデータを配列に変換（補正なし）
    const allTools = extractAllToolsOriginal(masterData);
    
    console.log(`✅ データロード完了: ${allTools.length}ツール`);
    console.log(`📊 実行パターン統計:`);
    console.log(`- 一般ユーザー向け: ${patterns.generalUsers.length}パターン`);
    console.log(`- 開発者向け: ${patterns.developers.length}パターン`);
    console.log(`- クリエイター向け: ${patterns.creators.length}パターン`);
    console.log(`- 合計: ${patterns.generalUsers.length + patterns.developers.length + patterns.creators.length}パターン`);
    console.log('');
    
    // 出力ディレクトリ作成
    createOutputDirectories();
    
    // 実行統計とランキング一覧収集
    let totalGenerated = 0;
    let successCount = 0;
    let errorCount = 0;
    const allRankingsList = [];
    
    // 各ターゲット別ランキング生成
    for (const [targetType, targetPatterns] of Object.entries(patterns)) {
      console.log(`\\n🎯 ${targetType} オリジナルランキング生成開始 (${targetPatterns.length}パターン)`);
      
      for (const pattern of targetPatterns) {
        try {
          const ranking = generateOriginalRanking(allTools, pattern, targetType);
          const outputPath = path.join(OUTPUT_DIR, TARGET_DIRS[targetType], `${pattern.id}_${pattern.name}.json`);
          
          fs.writeFileSync(outputPath, JSON.stringify(ranking, null, 2));
          
          // ランキング一覧に追加
          const rankingList = {
            id: pattern.id,
            title: pattern.name,
            targetType: targetType,
            topTools: ranking.tools.slice(0, Math.min(5, ranking.tools.length)).map(tool => tool.toolName)
          };
          allRankingsList.push(rankingList);
          
          console.log(`  ✅ ${pattern.id}: ${pattern.name} (${ranking.tools.length}ツール)`);
          successCount++;
          
        } catch (error) {
          console.error(`  ❌ ${pattern.id}: ${error.message}`);
          errorCount++;
        }
        
        totalGenerated++;
      }
    }
    
    // ランキング一覧ドキュメント生成
    generateRankingsDocument(allRankingsList);
    
    // 統計レポート
    console.log('\\n📊 生成統計:');
    console.log(`総パターン数: ${totalGenerated}`);
    console.log(`成功: ${successCount}`);
    console.log(`エラー: ${errorCount}`);
    console.log(`成功率: ${((successCount/totalGenerated)*100).toFixed(1)}%`);
    
    console.log('\\n🎉 全オリジナルランキング生成 + ドキュメント作成完了！');
    console.log('📁 出力先:');
    console.log('  - rankingsV3_Original/ (補正なしランキング)');
    console.log('  - AIツール全ランキング一覧.md (順位・名前一覧)');
    
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
  
  delete require.cache[require.resolve(PATTERNS_FILE)];
  const patterns = require(PATTERNS_FILE);
  return patterns;
}

/**
 * 全AIツールデータを配列に抽出（オリジナルスコア）
 */
function extractAllToolsOriginal(masterData) {
  if (Array.isArray(masterData.tools)) {
    // 非AIツール除外のみ適用、スコア補正はなし
    const NON_AI_TOOLS = ["Google Colab", "Replit", "InVideo", "Poe", "Hugging Face", "Replicate", "Claude API", "Jupyter AI"];
    const NON_AI_CATEGORIES = ["AI研究・実行環境", "AIモデルプラットフォーム・コミュニティ", "AI モデル実行プラットフォーム", "AI API・開発者向けプラットフォーム", "Enterprise AI API", "Enterprise AI API Platform", "マルチAIプラットフォーム"];
    
    return masterData.tools.filter(tool => {
      const toolName = tool.toolName || 'undefined';
      const category = tool.category || 'undefined';
      
      if (NON_AI_TOOLS.includes(toolName)) return false;
      if (NON_AI_CATEGORIES.includes(category)) return false;
      if (toolName === 'undefined' && (category.includes('API') || category.includes('Platform') || category.includes('プラットフォーム'))) return false;
      
      return true;
    });
  }
  
  throw new Error('AIツールデータの形式が不正です');
}

/**
 * 出力ディレクトリ作成
 */
function createOutputDirectories() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  for (const dirName of Object.values(TARGET_DIRS)) {
    const targetDir = path.join(OUTPUT_DIR, dirName);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  }
}

/**
 * 個別オリジナルランキング生成
 */
function generateOriginalRanking(tools, pattern, targetType) {
  // フィルタリング
  const filtered = filterTools(tools, pattern.filters);
  
  if (filtered.length === 0) {
    throw new Error('フィルター条件に該当するツールが見つかりません');
  }
  
  // ソート（オリジナルスコア使用）
  const sorted = sortToolsOriginal(filtered, pattern.criteria, pattern.sortOrder || 'desc');
  
  // 上位N件取得
  const topTools = sorted.slice(0, pattern.limit);
  
  // ターゲット別の説明とカテゴリ設定
  const targetInfo = getTargetInfo(targetType);
  
  return {
    id: pattern.id,
    title: pattern.name + ' (補正なし)',
    description: `${targetInfo.description}向けの${pattern.name}です。オリジナルスコア（補正なし）に基づいて選出しています。`,
    category: targetInfo.category,
    targetAudience: targetInfo.audience,
    criteria: pattern.criteria,
    filters: pattern.filters,
    generatedAt: new Date().toISOString(),
    totalMatched: filtered.length,
    scoreType: 'original', // 補正なし
    tools: topTools.map((tool, index) => ({
      rank: index + 1,
      toolName: tool.toolName || 'undefined',
      category: tool.category || 'undefined',
      companyName: tool.companyName || 'undefined',
      score: tool.tenEvaluation?.totalScore || 0, // オリジナルスコア
      officialUrl: tool.officialUrl || '',
      metrics: {
        immediacy: tool.tenEvaluation?.immediacy || 0,
        simplicity: tool.tenEvaluation?.simplicity || 0,
        popularity: tool.tenEvaluation?.popularity || 0,
        costPerformance: tool.tenEvaluation?.costPerformance || 0,
        specialization: tool.tenEvaluation?.specialization || 0,
        productivityGain: tool.tenEvaluation?.productivityGain || 0
      }
    }))
  };
}

/**
 * AIツールフィルタリング（補正版と同じ）
 */
function filterTools(tools, filters) {
  let result = [...tools];
  
  if (filters.category) {
    result = result.filter(tool => tool.category === filters.category);
  }
  
  if (filters.categories && filters.categories.length > 0) {
    result = result.filter(tool => filters.categories.includes(tool.category));
  }
  
  if (filters.hasFreeVersion === true) {
    result = result.filter(tool => tool.pricing?.freeTier || tool.pricing?.starterPrice === 0);
  }
  
  if (filters.isPaidOnly === true) {
    result = result.filter(tool => !tool.pricing?.freeTier && tool.pricing?.starterPrice > 0);
  }
  
  if (filters.supportsJapanese === true) {
    result = result.filter(tool => 
      tool.coreFeatures?.languages?.includes('Japanese') || 
      tool.coreFeatures?.languages?.includes('日本語') ||
      (tool.toolName && ['ChatGPT', 'Gemini', 'Claude'].includes(tool.toolName))
    );
  }
  
  if (filters.releaseYear) {
    result = result.filter(tool => {
      const releaseDate = tool.releaseInfo?.initialRelease;
      return releaseDate && releaseDate.includes(filters.releaseYear);
    });
  }
  
  if (filters.hasAPIAccess === true) {
    result = result.filter(tool => tool.platform?.apiAccess === true);
  }
  
  return result;
}

/**
 * AIツールソート（オリジナルスコア）
 */
function sortToolsOriginal(tools, criteria, sortOrder = 'desc') {
  const sorted = [...tools].sort((a, b) => {
    let valueA, valueB;
    
    switch (criteria) {
      case 'adjustedTenScore': // オリジナルスコアに読み替え
        valueA = a.tenEvaluation?.totalScore || 0;
        valueB = b.tenEvaluation?.totalScore || 0;
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
        valueA = a.tenEvaluation?.totalScore || 0;
        valueB = b.tenEvaluation?.totalScore || 0;
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
 * ランキング一覧ドキュメント生成
 */
function generateRankingsDocument(allRankingsList) {
  console.log('\\n📝 ランキング一覧ドキュメント生成中...');
  
  let document = `# AIツール全ランキング一覧（補正なし・オリジナルスコア）

生成日時: ${new Date().toISOString().split('T')[0]}
総パターン数: ${allRankingsList.length}

## 📊 ランキング一覧

`;

  // ターゲット別にグループ化
  const groupedRankings = {
    generalUsers: [],
    developers: [],
    creators: []
  };
  
  allRankingsList.forEach(ranking => {
    groupedRankings[ranking.targetType].push(ranking);
  });
  
  // 一般ユーザー向け
  document += `### 🎯 一般ユーザー向け (${groupedRankings.generalUsers.length}パターン)

`;
  groupedRankings.generalUsers.forEach(ranking => {
    document += `#### ${ranking.id}: ${ranking.title}
`;
    ranking.topTools.forEach((tool, i) => {
      document += `${i + 1}. ${tool}\\n`;
    });
    document += `\\n`;
  });
  
  // 開発者向け
  document += `### 👨‍💻 開発者向け (${groupedRankings.developers.length}パターン)

`;
  groupedRankings.developers.forEach(ranking => {
    document += `#### ${ranking.id}: ${ranking.title}
`;
    ranking.topTools.forEach((tool, i) => {
      document += `${i + 1}. ${tool}\\n`;
    });
    document += `\\n`;
  });
  
  // クリエイター向け
  document += `### 🎨 クリエイター向け (${groupedRankings.creators.length}パターン)

`;
  groupedRankings.creators.forEach(ranking => {
    document += `#### ${ranking.id}: ${ranking.title}
`;
    ranking.topTools.forEach((tool, i) => {
      document += `${i + 1}. ${tool}\\n`;
    });
    document += `\\n`;
  });
  
  // ファイル保存
  const docPath = path.join(__dirname, 'AIツール全ランキング一覧.md');
  fs.writeFileSync(docPath, document);
  
  console.log('✅ ランキング一覧ドキュメント生成完了');
}

// メイン実行
if (require.main === module) {
  generateOriginalRankings();
}

module.exports = {
  generateOriginalRankings
};