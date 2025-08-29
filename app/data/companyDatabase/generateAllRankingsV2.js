#!/usr/bin/env node

/**
 * 企業ランキング自動生成システム V2
 * マーケットイン視点の新しいランキングパターンに対応
 */

const fs = require('fs');
const path = require('path');
const RankingCriteriaCalculator = require('./rankingCriteriaCalculator');

// パスの設定
const DATA_FILE = path.join(__dirname, 'companyMasterData.json');
const PATTERNS_FILE = path.join(__dirname, 'targetNeedsPatternsV2.js');
const OUTPUT_DIR = path.join(__dirname, 'rankingsV2');

// ターゲット別の出力ディレクトリ
const TARGET_DIRS = {
  jobSeekers: 'jobSeekers',
  femaleCareer: 'femaleCareer',
  maleProfessional: 'maleProfessional'
};

/**
 * メイン実行関数
 */
async function generateAllRankings() {
  console.log('🚀 企業ランキング生成システム V2 開始');
  console.log('============================================================');
  
  try {
    // データ読み込み
    const masterData = loadMasterData();
    const patterns = loadPatterns();
    
    // 全企業データを1次元配列に変換
    const allCompanies = extractAllCompanies(masterData);
    
    console.log(`✅ データロード完了: ${allCompanies.length}社`);
    console.log(`📊 実行パターン統計:`);
    console.log(`- 就活生向け: ${patterns.jobSeekers.length}パターン`);
    console.log(`- 女性キャリア向け: ${patterns.femaleCareer.length}パターン`);
    console.log(`- 男性社会人向け: ${patterns.maleProfessional.length}パターン`);
    console.log(`- 合計: ${patterns.jobSeekers.length + patterns.femaleCareer.length + patterns.maleProfessional.length}パターン`);
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
          const ranking = generateRanking(allCompanies, pattern);
          saveRanking(targetKey, pattern, ranking);
          
          stats.success++;
          stats.targetStats[targetKey].success++;
          
          console.log(`[${i + 1}/${targetPatterns.length}] ${pattern.id}: ${pattern.name}`);
          console.log(`  ✅ 成功: ${ranking.companies.length}社取得 → ${pattern.id}_${sanitizeFileName(pattern.name)}.json`);
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
    
    console.log('\n🎉 全ランキング生成完了！');
    
  } catch (error) {
    console.error('❌ 致命的エラー:', error);
    process.exit(1);
  }
}

/**
 * マスターデータ読み込み
 */
function loadMasterData() {
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(`データファイルが見つかりません: ${DATA_FILE}`);
  }
  
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
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
 * 全企業データを1次元配列に抽出
 */
function extractAllCompanies(masterData) {
  const companies = [];
  
  if (masterData.industries && Array.isArray(masterData.industries)) {
    masterData.industries.forEach(industry => {
      if (industry.companies && Array.isArray(industry.companies)) {
        industry.companies.forEach(company => {
          // 業界情報を企業データに追加
          companies.push({
            ...company,
            industryName: industry.industryName,
            industryId: industry.industryId
          });
        });
      }
    });
  }
  
  return companies;
}

/**
 * 出力ディレクトリ作成
 */
function createOutputDirectories() {
  // メインディレクトリ
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // ターゲット別サブディレクトリ
  Object.values(TARGET_DIRS).forEach(dir => {
    const targetDir = path.join(OUTPUT_DIR, dir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
  });
}

/**
 * ランキング生成
 */
function generateRanking(companies, pattern) {
  // フィルタリング
  let filtered = filterCompanies(companies, pattern.filters || {});
  
  // スコア計算とソート
  const scored = filtered.map(company => ({
    ...company,
    rankingScore: RankingCriteriaCalculator.calculateScore(company, pattern.criteria)
  }));
  
  // スコアで降順ソート
  scored.sort((a, b) => b.rankingScore - a.rankingScore);
  
  // 上位N社を取得
  const topCompanies = scored.slice(0, pattern.limit);
  
  return {
    patternId: pattern.id,
    patternName: pattern.name,
    criteria: pattern.criteria,
    limit: pattern.limit,
    filters: pattern.filters,
    generatedAt: new Date().toISOString(),
    totalMatched: filtered.length,
    companies: topCompanies.map((company, index) => ({
      rank: index + 1,
      companyName: company.companyName,
      industry: company.industry || company.industryName,
      score: company.rankingScore,
      metrics: {
        salary: company.metrics?.salary,
        initialSalary: company.metrics?.initialSalary,
        holidays: company.metrics?.holidays,
        overtime: company.metrics?.overtime,
        vacationRate: company.metrics?.vacationRate,
        turnoverRate3Years: company.metrics?.turnoverRate3Years
      }
    }))
  };
}

/**
 * 企業フィルタリング
 */
function filterCompanies(companies, filters) {
  let result = [...companies];
  
  // 業界フィルター
  if (filters.industries && filters.industries.length > 0) {
    result = result.filter(c => 
      filters.industries.some(ind => 
        c.industryName === ind || c.industry === ind
      )
    );
  }
  
  // 従業員数範囲フィルター
  if (filters.employeesRange) {
    const [min, max] = filters.employeesRange;
    result = result.filter(c => {
      const emp = c.metrics?.employees;
      if (emp == null) return false;
      if (min !== null && emp < min) return false;
      if (max !== null && emp > max) return false;
      return true;
    });
  }
  
  // 設立年範囲フィルター
  if (filters.establishedRange) {
    const [min, max] = filters.establishedRange;
    result = result.filter(c => {
      const est = c.corporate?.established;
      if (est == null) return false;
      if (min !== null && est < min) return false;
      if (max !== null && est > max) return false;
      return true;
    });
  }
  
  // 年収範囲フィルター
  if (filters.salaryRange) {
    const [min, max] = filters.salaryRange;
    result = result.filter(c => {
      const sal = c.metrics?.salary;
      if (sal == null) return false;
      // 万円単位に変換
      const salaryInManYen = sal;
      if (min !== null && salaryInManYen < min) return false;
      if (max !== null && salaryInManYen > max) return false;
      return true;
    });
  }
  
  // 初任給範囲フィルター
  if (filters.initialSalaryRange) {
    const [min, max] = filters.initialSalaryRange;
    result = result.filter(c => {
      const sal = c.metrics?.initialSalary;
      if (sal == null) return false;
      if (min !== null && sal < min) return false;
      if (max !== null && sal > max) return false;
      return true;
    });
  }
  
  // 休日範囲フィルター
  if (filters.holidaysRange) {
    const [min, max] = filters.holidaysRange;
    result = result.filter(c => {
      const hol = c.metrics?.holidays;
      if (hol == null) return false;
      if (min !== null && hol < min) return false;
      if (max !== null && hol > max) return false;
      return true;
    });
  }
  
  // 残業時間範囲フィルター
  if (filters.overtimeRange) {
    const [min, max] = filters.overtimeRange;
    result = result.filter(c => {
      const ot = c.metrics?.overtime;
      if (ot == null) return false;
      if (min !== null && ot < min) return false;
      if (max !== null && ot > max) return false;
      return true;
    });
  }
  
  // 有給取得率範囲フィルター
  if (filters.vacationRateRange) {
    const [min, max] = filters.vacationRateRange;
    result = result.filter(c => {
      const vr = c.metrics?.vacationRate;
      if (vr == null) return false;
      if (min !== null && vr < min) return false;
      if (max !== null && vr > max) return false;
      return true;
    });
  }
  
  // 平均勤続年数範囲フィルター
  if (filters.tenureRange) {
    const [min, max] = filters.tenureRange;
    result = result.filter(c => {
      const tenure = c.metrics?.averageTenure;
      if (tenure == null) return false;
      if (min !== null && tenure < min) return false;
      if (max !== null && tenure > max) return false;
      return true;
    });
  }
  
  // 上場区分フィルター
  if (filters.listingStatus) {
    result = result.filter(c => 
      c.corporate?.listing === filters.listingStatus
    );
  }
  
  return result;
}

/**
 * ランキング保存
 */
function saveRanking(targetKey, pattern, ranking) {
  let saveDir = path.join(OUTPUT_DIR, TARGET_DIRS[targetKey]);
  
  // 業界別フィルターがある場合は業界別サブディレクトリに保存
  if (pattern.filters && pattern.filters.industry) {
    const industryDir = getIndustryDirectory(pattern.filters.industry);
    if (industryDir) {
      saveDir = path.join(OUTPUT_DIR, industryDir);
      // ディレクトリが存在しない場合は作成
      if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
      }
    }
  }
  
  const fileName = `${pattern.id}_${sanitizeFileName(pattern.name)}.json`;
  const filePath = path.join(saveDir, fileName);
  
  fs.writeFileSync(filePath, JSON.stringify(ranking, null, 2), 'utf8');
}

/**
 * 業界名からディレクトリ名を取得
 */
function getIndustryDirectory(industryName) {
  const industryMapping = {
    'IT業界': '01_IT業界',
    '食品・農林・水産': '02_食品業界',
    '金融業界': '03_金融業界',
    '製薬業界': '04_製薬業界',
    '化学業界': '05_化学業界',
    '総合電機業界': '06_総合電機業界',
    '通信インフラ業界': '07_通信業界',
    'メディア・広告業界': '08_メディア・広告業界',
    'コンサルティング業界': '09_コンサル業界'
  };
  
  return industryMapping[industryName] || null;
}

/**
 * ファイル名サニタイズ
 */
function sanitizeFileName(name) {
  return name
    .replace(/[<>:"/\\|?*]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/×/g, '_')
    .replace(/[()]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * ターゲット表示名取得
 */
function getTargetDisplayName(targetKey) {
  const names = {
    jobSeekers: '就活生向け',
    femaleCareer: '女性キャリア向け',
    maleProfessional: '男性社会人向け'
  };
  return names[targetKey] || targetKey;
}

/**
 * サマリー表示
 */
function displaySummary(stats) {
  console.log('\n============================================================');
  console.log('📋 実行結果サマリー');
  console.log('============================================================');
  console.log(`✅ 成功: ${stats.success}パターン`);
  console.log(`❌ エラー: ${stats.errors.length}パターン`);
  console.log(`📊 成功率: ${((stats.success / stats.total) * 100).toFixed(1)}%`);
  
  console.log('\n📊 ターゲット別統計:');
  Object.entries(stats.targetStats).forEach(([key, stat]) => {
    const name = getTargetDisplayName(key);
    const rate = ((stat.success / stat.total) * 100).toFixed(1);
    console.log(`  ${name}: ${stat.success}/${stat.total} (${rate}%)`);
  });
  
  if (stats.errors.length > 0) {
    console.log('\n❌ エラー詳細:');
    stats.errors.forEach(err => {
      console.log(`  ${err.pattern} (${getTargetDisplayName(err.target)}): ${err.error}`);
    });
  }
}

/**
 * サマリーレポート保存
 */
function saveSummaryReport(stats) {
  const reportPath = path.join(OUTPUT_DIR, 'execution_summary.json');
  const report = {
    executedAt: new Date().toISOString(),
    statistics: {
      total: stats.total,
      success: stats.success,
      errors: stats.errors.length,
      successRate: ((stats.success / stats.total) * 100).toFixed(1) + '%'
    },
    targetStatistics: stats.targetStats,
    errors: stats.errors
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n💾 サマリーレポート保存: ${reportPath}`);
}

// 実行
if (require.main === module) {
  generateAllRankings().catch(console.error);
}

module.exports = generateAllRankings;