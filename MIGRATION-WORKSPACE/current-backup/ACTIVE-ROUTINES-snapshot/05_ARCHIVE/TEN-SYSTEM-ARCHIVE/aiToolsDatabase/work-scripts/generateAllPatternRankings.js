const fs = require('fs');
const path = require('path');

// ランキングパターンとマスターデータ読み込み
const RANKING_PATTERNS = require('./aiToolsRankingPatternsV1');
const rawData = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf-8'));
const masterTools = rawData.tools.filter(tool => tool.toolName && tool.toolName !== 'undefined');

console.log('=== AIツール全パターンランキング生成システム ===\n');
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
        case 'targetUser':
          // targetUserフィルタは現在のデータ構造では対応困難なため全ツール対象とする
          break;
        case 'releaseYear':
          filteredTools = filteredTools.filter(tool => 
            tool.releaseDate && tool.releaseDate.includes(value)
          );
          break;
        case 'isLatest':
          // 2024年以降リリース・更新されたツール
          filteredTools = filteredTools.filter(tool => 
            tool.releaseDate && (tool.releaseDate.includes('2024') || tool.releaseDate.includes('2025')) ||
            tool.lastUpdate && (tool.lastUpdate.includes('2024') || tool.lastUpdate.includes('2025'))
          );
          break;
        case 'isVersatile':
          // 総合スコア550点以上の万能ツール
          filteredTools = filteredTools.filter(tool => 
            tool.tenEvaluation.totalScore >= 550
          );
          break;
        case 'isHallOfFame':
          // 560点以上の殿堂入りツール
          filteredTools = filteredTools.filter(tool => 
            tool.tenEvaluation.totalScore >= 560
          );
          break;
        default:
          // その他のフィルタは一旦スキップ
          break;
      }
    });
  }
  
  // ソート処理
  let sortedTools;
  switch (pattern.criteria) {
    case 'adjustedTenScore':
      sortedTools = filteredTools.sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);
      break;
    case 'simplicity':
      sortedTools = filteredTools.sort((a, b) => b.tenEvaluation.simplicity - a.tenEvaluation.simplicity);
      break;
    case 'immediacy':
      sortedTools = filteredTools.sort((a, b) => b.tenEvaluation.immediacy - a.tenEvaluation.immediacy);
      break;
    case 'popularity':
      sortedTools = filteredTools.sort((a, b) => b.tenEvaluation.popularity - a.tenEvaluation.popularity);
      break;
    case 'costPerformance':
      sortedTools = filteredTools.sort((a, b) => b.tenEvaluation.costPerformance - a.tenEvaluation.costPerformance);
      break;
    case 'specialization':
      sortedTools = filteredTools.sort((a, b) => b.tenEvaluation.specialization - a.tenEvaluation.specialization);
      break;
    case 'productivityGain':
      sortedTools = filteredTools.sort((a, b) => b.tenEvaluation.productivityGain - a.tenEvaluation.productivityGain);
      break;
    default:
      sortedTools = filteredTools.sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);
      break;
  }
  
  // 上位N件取得
  const topTools = sortedTools.slice(0, pattern.limit);
  
  return {
    rankingId: pattern.id,
    rankingName: pattern.name,
    criteria: pattern.criteria,
    totalCandidates: filteredTools.length,
    displayCount: topTools.length,
    generatedAt: new Date().toISOString(),
    rankings: topTools.map((tool, index) => ({
      rank: index + 1,
      toolName: tool.toolName,
      totalScore: tool.tenEvaluation.totalScore,
      starRating: tool.tenEvaluation.starRating || '★★★★',
      category: tool.category,
      developer: tool.developer || tool.companyName || 'N/A',
      description: tool.description?.substring(0, 120) + '...' || 'N/A',
      criteriaScore: (() => {
        switch (pattern.criteria) {
          case 'simplicity': return tool.tenEvaluation.simplicity;
          case 'immediacy': return tool.tenEvaluation.immediacy;
          case 'popularity': return tool.tenEvaluation.popularity;
          case 'costPerformance': return tool.tenEvaluation.costPerformance;
          case 'specialization': return tool.tenEvaluation.specialization;
          case 'productivityGain': return tool.tenEvaluation.productivityGain;
          default: return tool.tenEvaluation.totalScore;
        }
      })(),
      evaluation: {
        immediacy: tool.tenEvaluation.immediacy,
        simplicity: tool.tenEvaluation.simplicity,
        popularity: tool.tenEvaluation.popularity,
        costPerformance: tool.tenEvaluation.costPerformance,
        specialization: tool.tenEvaluation.specialization,
        productivityGain: tool.tenEvaluation.productivityGain
      },
      officialUrl: tool.officialUrl || tool.officialWebsite || 'N/A',
      pricing: typeof tool.pricing === 'string' ? tool.pricing : JSON.stringify(tool.pricing) || 'N/A'
    }))
  };
}

// ディレクトリ作成
const rankingsDir = path.join(__dirname, 'rankingsV3');
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
  
  const targetRankings = {};
  let successCount = 0;
  let errorCount = 0;
  
  patterns.forEach(pattern => {
    try {
      const ranking = generateRanking(pattern);
      targetRankings[pattern.id] = ranking;
      
      console.log(`  ✅ ${pattern.id}: ${pattern.name} (${ranking.displayCount}件)`);
      successCount++;
      totalGenerated++;
    } catch (error) {
      console.log(`  ❌ ${pattern.id}: ${pattern.name} - エラー: ${error.message}`);
      errorCount++;
    }
  });
  
  // ターゲット別サマリー
  generationSummary[targetType] = {
    total: patterns.length,
    success: successCount,
    error: errorCount
  };
  
  // ファイル保存
  fs.writeFileSync(
    path.join(rankingsDir, targetType, 'allRankings.json'),
    JSON.stringify(targetRankings, null, 2)
  );
  
  console.log(`📁 ${targetType}/allRankings.json 保存完了 (成功:${successCount}, エラー:${errorCount})`);
});

// 統合レポート生成
const reportData = {
  generatedAt: new Date().toISOString(),
  databaseVersion: rawData.version,
  totalTools: masterTools.length,
  totalPatterns: Object.values(RANKING_PATTERNS).flat().length,
  totalGenerated,
  summary: generationSummary,
  patternBreakdown: Object.entries(RANKING_PATTERNS).map(([target, patterns]) => ({
    target,
    patternCount: patterns.length,
    patterns: patterns.map(p => ({ id: p.id, name: p.name, criteria: p.criteria, limit: p.limit }))
  }))
};

fs.writeFileSync(
  path.join(__dirname, 'ランキング生成レポート.json'),
  JSON.stringify(reportData, null, 2)
);

// 完了サマリー
console.log('\n🎉 全パターンランキング生成完了');
console.log(`📊 生成成功: ${totalGenerated}パターン`);
console.log('📁 生成ファイル:');
Object.keys(RANKING_PATTERNS).forEach(target => {
  console.log(`  - rankingsV3/${target}/allRankings.json`);
});
console.log('  - ランキング生成レポート.json');
console.log('\n✅ AIツール全60パターンランキングシステム完全構築!');