/**
 * 全ランキング生成実行スクリプト
 * 90パターン（就活生30 + 女性キャリア30 + 男性社会人30）のランキングを生成
 */

const fs = require('fs');
const path = require('path');
const AdvancedRankingGenerator = require('./advancedRankingGenerator.js');
const TARGET_NEEDS_PATTERNS = require('./targetNeedsPatterns.js');

class RankingExecutor {
  constructor() {
    console.log('🚀 企業ランキング生成システム開始');
    console.log('=' .repeat(60));
    
    // データベース読み込み
    const companyData = JSON.parse(fs.readFileSync('./companyMasterData.json', 'utf8'));
    this.generator = new AdvancedRankingGenerator(companyData);
    
    // 出力ディレクトリ作成
    this.outputDir = './rankings';
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
    
    this.results = {
      success: 0,
      error: 0,
      patterns: []
    };
  }

  /**
   * 全パターン実行
   */
  async executeAllPatterns() {
    console.log('📊 実行パターン統計:');
    console.log(`- 就活生向け: ${TARGET_NEEDS_PATTERNS.jobSeekers.length}パターン`);
    console.log(`- 女性キャリア向け: ${TARGET_NEEDS_PATTERNS.femaleCareer.length}パターン`);
    console.log(`- 男性社会人向け: ${TARGET_NEEDS_PATTERNS.maleProfessional.length}パターン`);
    console.log(`- 合計: ${this.getTotalPatterns()}パターン\n`);

    // 各ターゲット実行
    await this.executeTargetPatterns('就活生', 'jobSeekers', TARGET_NEEDS_PATTERNS.jobSeekers);
    await this.executeTargetPatterns('女性キャリア', 'femaleCareer', TARGET_NEEDS_PATTERNS.femaleCareer);
    await this.executeTargetPatterns('男性社会人', 'maleProfessional', TARGET_NEEDS_PATTERNS.maleProfessional);
    
    // 結果サマリー
    this.generateSummaryReport();
  }

  /**
   * ターゲット別パターン実行
   */
  async executeTargetPatterns(targetName, targetKey, patterns) {
    console.log(`\n🎯 ${targetName}向けランキング生成開始 (${patterns.length}パターン)`);
    console.log('-' .repeat(50));
    
    // ターゲット別ディレクトリ作成
    const targetDir = path.join(this.outputDir, targetKey);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];
      try {
        console.log(`[${i + 1}/${patterns.length}] ${pattern.id}: ${pattern.name}`);
        
        // ランキング生成
        const ranking = this.generator.generateAdvancedRanking(
          pattern.criteria,
          pattern.limit,
          pattern.filters
        );
        
        // 結果保存
        const result = {
          id: pattern.id,
          name: pattern.name,
          target: targetName,
          criteria: pattern.criteria,
          limit: pattern.limit,
          filters: pattern.filters,
          generatedAt: new Date().toISOString(),
          resultCount: ranking.length,
          ranking: ranking
        };
        
        const fileName = `${pattern.id}_${pattern.name.replace(/[^a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '_')}.json`;
        const filePath = path.join(targetDir, fileName);
        
        fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf8');
        
        console.log(`  ✅ 成功: ${ranking.length}社取得 → ${fileName}`);
        
        this.results.success++;
        this.results.patterns.push({
          id: pattern.id,
          name: pattern.name,
          target: targetName,
          success: true,
          resultCount: ranking.length,
          fileName: fileName
        });
        
      } catch (error) {
        console.log(`  ❌ エラー: ${error.message}`);
        this.results.error++;
        this.results.patterns.push({
          id: pattern.id,
          name: pattern.name,
          target: targetName,
          success: false,
          error: error.message
        });
      }
    }
  }

  /**
   * サマリーレポート生成
   */
  generateSummaryReport() {
    console.log('\n' + '=' .repeat(60));
    console.log('📋 実行結果サマリー');
    console.log('=' .repeat(60));
    
    console.log(`✅ 成功: ${this.results.success}パターン`);
    console.log(`❌ エラー: ${this.results.error}パターン`);
    console.log(`📊 成功率: ${((this.results.success / this.getTotalPatterns()) * 100).toFixed(1)}%`);
    
    // ターゲット別統計
    const targetStats = this.getTargetStats();
    console.log('\n📊 ターゲット別統計:');
    Object.keys(targetStats).forEach(target => {
      const stats = targetStats[target];
      console.log(`  ${target}: ${stats.success}/${stats.total} (${((stats.success/stats.total)*100).toFixed(1)}%)`);
    });
    
    // エラー詳細
    if (this.results.error > 0) {
      console.log('\n❌ エラー詳細:');
      this.results.patterns.filter(p => !p.success).forEach(pattern => {
        console.log(`  ${pattern.id} (${pattern.target}): ${pattern.error}`);
      });
    }
    
    // サマリーファイル出力
    const summary = {
      executedAt: new Date().toISOString(),
      totalPatterns: this.getTotalPatterns(),
      successCount: this.results.success,
      errorCount: this.results.error,
      successRate: (this.results.success / this.getTotalPatterns()) * 100,
      targetStats: targetStats,
      patterns: this.results.patterns
    };
    
    fs.writeFileSync(
      path.join(this.outputDir, 'execution_summary.json'),
      JSON.stringify(summary, null, 2),
      'utf8'
    );
    
    console.log(`\n💾 サマリーレポート保存: ${this.outputDir}/execution_summary.json`);
    console.log('🎉 全ランキング生成完了！');
  }

  /**
   * ターゲット別統計計算
   */
  getTargetStats() {
    const stats = {};
    this.results.patterns.forEach(pattern => {
      if (!stats[pattern.target]) {
        stats[pattern.target] = { total: 0, success: 0 };
      }
      stats[pattern.target].total++;
      if (pattern.success) {
        stats[pattern.target].success++;
      }
    });
    return stats;
  }

  /**
   * 合計パターン数取得
   */
  getTotalPatterns() {
    return TARGET_NEEDS_PATTERNS.jobSeekers.length + 
           TARGET_NEEDS_PATTERNS.femaleCareer.length + 
           TARGET_NEEDS_PATTERNS.maleProfessional.length;
  }

  /**
   * 特定パターンのみ実行（デバッグ用）
   */
  async executePattern(targetKey, patternId) {
    const patterns = TARGET_NEEDS_PATTERNS[targetKey];
    const pattern = patterns.find(p => p.id === patternId);
    
    if (!pattern) {
      console.log(`❌ パターンが見つかりません: ${patternId}`);
      return;
    }
    
    console.log(`🔍 テスト実行: ${pattern.id} - ${pattern.name}`);
    
    try {
      const ranking = this.generator.generateAdvancedRanking(
        pattern.criteria,
        pattern.limit,
        pattern.filters
      );
      
      console.log(`✅ 成功: ${ranking.length}社取得`);
      console.log('\n📋 結果プレビュー:');
      ranking.slice(0, 5).forEach((company, index) => {
        console.log(`  ${index + 1}位: ${company.name} (${company.formattedValue}) - ${company.industry}`);
      });
      
      return ranking;
      
    } catch (error) {
      console.log(`❌ エラー: ${error.message}`);
      return null;
    }
  }
}

// 実行制御
async function main() {
  const args = process.argv.slice(2);
  const executor = new RankingExecutor();
  
  if (args.length === 0) {
    // 全パターン実行
    await executor.executeAllPatterns();
  } else if (args.length === 2) {
    // 特定パターンテスト
    const [targetKey, patternId] = args;
    await executor.executePattern(targetKey, patternId);
  } else {
    console.log('使用方法:');
    console.log('  node generateAllRankings.js                    # 全パターン実行');
    console.log('  node generateAllRankings.js jobSeekers JS001  # 特定パターンテスト');
  }
}

// 実行
if (require.main === module) {
  main().catch(console.error);
}

module.exports = RankingExecutor;