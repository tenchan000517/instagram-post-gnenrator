const fs = require('fs');
const path = require('path');

// ランキングパターンとマスターデータ読み込み
const RANKING_PATTERNS = require('./aiToolsRankingPatternsV1');
const rawData = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf-8'));
const masterTools = rawData.tools.filter(tool => tool.toolName && tool.toolName !== 'undefined');

console.log('=== AIツール完全データランキングV5生成 ===\n');
console.log(`✅ 有効ツール数: ${masterTools.length}`);
console.log(`📊 総パターン数: ${Object.values(RANKING_PATTERNS).flat().length}`);

// ランキング生成関数
function generateRanking(pattern) {
  let filteredTools = [...masterTools];
  
  // フィルタリング処理
  if (pattern.filters) {
    Object.entries(pattern.filters).forEach(([key, value]) => {
      switch (key) {
        case 'category':
          filteredTools = filteredTools.filter(tool => tool.category === value);
          break;
        case 'hasFreeVersion':
          filteredTools = filteredTools.filter(tool => {
            if (!tool.pricing) return false;
            if (typeof tool.pricing === 'object') {
              return tool.pricing.freePlan || tool.pricing.freeplan || tool.pricing.freeTier;
            }
            if (typeof tool.pricing === 'string') {
              return tool.pricing.toLowerCase().includes('free');
            }
            return false;
          });
          break;
        case 'supportsJapanese':
          filteredTools = filteredTools.filter(tool => 
            tool.languageSupport && tool.languageSupport.includes('Japanese')
          );
          break;
        case 'releaseYear':
          filteredTools = filteredTools.filter(tool => 
            tool.releaseDate && tool.releaseDate.includes(value)
          );
          break;
        case 'isLatest':
          filteredTools = filteredTools.filter(tool => 
            tool.releaseDate && (tool.releaseDate.includes('2024') || tool.releaseDate.includes('2025')) ||
            tool.lastUpdate && (tool.lastUpdate.includes('2024') || tool.lastUpdate.includes('2025'))
          );
          break;
        case 'isVersatile':
          filteredTools = filteredTools.filter(tool => 
            tool.tenEvaluation.totalScore >= 550
          );
          break;
        case 'isHallOfFame':
          filteredTools = filteredTools.filter(tool => 
            tool.tenEvaluation.totalScore >= 560
          );
          break;
      }
    });
  }
  
  // スコア計算とソート
  const scored = filteredTools.map(tool => {
    let rankingScore;
    switch (pattern.criteria) {
      case 'adjustedTenScore':
        rankingScore = tool.tenEvaluation.totalScore;
        break;
      case 'simplicity':
        rankingScore = tool.tenEvaluation.simplicity;
        break;
      case 'immediacy':
        rankingScore = tool.tenEvaluation.immediacy;
        break;
      case 'popularity':
        rankingScore = tool.tenEvaluation.popularity;
        break;
      case 'costPerformance':
        rankingScore = tool.tenEvaluation.costPerformance;
        break;
      case 'specialization':
        rankingScore = tool.tenEvaluation.specialization;
        break;
      case 'productivityGain':
        rankingScore = tool.tenEvaluation.productivityGain;
        break;
      default:
        rankingScore = tool.tenEvaluation.totalScore;
        break;
    }
    
    return {
      ...tool,
      rankingScore
    };
  });
  
  // スコアで降順ソート
  scored.sort((a, b) => b.rankingScore - a.rankingScore);
  
  // 上位N個取得
  const topTools = scored.slice(0, pattern.limit);
  
  return {
    patternId: pattern.id,
    patternName: pattern.name,
    criteria: pattern.criteria,
    limit: pattern.limit,
    filters: pattern.filters || {},
    generatedAt: new Date().toISOString(),
    totalMatched: filteredTools.length,
    tools: topTools.map((tool, index) => ({
      rank: index + 1,
      toolName: tool.toolName,
      score: tool.rankingScore,
      totalScore: tool.tenEvaluation.totalScore,
      starRating: tool.tenEvaluation.starRating || '★★★★',
      
      // 基本情報（実際のフィールド名に修正）
      id: tool.id,
      toolName: tool.toolName,
      category: tool.category,
      subCategory: tool.subCategory,
      companyName: tool.companyName,
      officialUrl: tool.officialUrl,
      
      // リリース情報
      releaseInfo: tool.releaseInfo,
      
      // ユーザーメトリクス
      userMetrics: tool.userMetrics,
      
      // プラットフォーム情報
      platform: tool.platform,
      
      // 価格情報（完全版）
      pricing: tool.pricing,
      
      // 機能・特徴（完全版）
      coreFeatures: tool.coreFeatures,
      
      // 技術仕様
      technicalSpecs: tool.technicalSpecs,
      
      // ローカライゼーション
      localization: tool.localization,
      
      // 使いやすさ
      usability: tool.usability,
      
      // パフォーマンス
      performance: tool.performance,
      
      // コミュニティ
      community: tool.community,
      
      // 競合分析
      competitiveAnalysis: tool.competitiveAnalysis,
      
      // ビジネスメトリクス
      businessMetrics: tool.businessMetrics,
      
      // 評価詳細
      tenEvaluation: tool.tenEvaluation,
      
      // メタデータ
      batchNumber: tool.batchNumber,
      toolRange: tool.toolRange,
      dataCollectionBatch: tool.dataCollectionBatch,
      lastVerified: tool.lastVerified,
      sources: tool.sources,
      additionalNotes: tool.additionalNotes
    }))
  };
}

// ディレクトリ作成
const rankingsDir = path.join(__dirname, 'rankingsV5');
['generalUsers', 'developers', 'creators', 'universal'].forEach(target => {
  const targetDir = path.join(rankingsDir, target);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
});

// 全パターンランキング生成
let totalGenerated = 0;
const generationSummary = {};

Object.entries(RANKING_PATTERNS).forEach(([targetType, patterns]) => {
  console.log(`\n🎯 ${targetType} ランキング生成中... (${patterns.length}パターン)`);
  
  let successCount = 0;
  let errorCount = 0;
  
  patterns.forEach(pattern => {
    try {
      const ranking = generateRanking(pattern);
      
      // 3件以下は除外
      if (ranking.tools.length <= 3) {
        console.log(`  ⚠️  スキップ: ${pattern.name} (${ranking.tools.length}件 - 3件以下)`);
        return;
      }
      
      // ファイル名はpattern.nameを使用
      const fileName = `${pattern.name}.json`;
      const filePath = path.join(rankingsDir, targetType, fileName);
      
      fs.writeFileSync(filePath, JSON.stringify(ranking, null, 2));
      
      console.log(`  ✅ ${fileName} (${ranking.tools.length}件)`);
      successCount++;
      totalGenerated++;
    } catch (error) {
      console.log(`  ❌ ${pattern.name} - エラー: ${error.message}`);
      errorCount++;
    }
  });
  
  generationSummary[targetType] = {
    total: patterns.length,
    success: successCount,
    error: errorCount
  };
  
  console.log(`📁 ${targetType}/ 保存完了 (成功:${successCount}, エラー:${errorCount})`);
});

// 完了サマリー
console.log('\n🎉 完全データランキングV5生成完了');
console.log(`📊 生成成功: ${totalGenerated}パターン（4件以上のみ）`);
console.log('📁 生成構造:');
Object.entries(generationSummary).forEach(([target, summary]) => {
  console.log(`  rankingsV5/${target}/ - ${summary.success}個のJSONファイル`);
});
console.log('\n✅ 各ツールの完全データが含まれたランキング生成完了！');