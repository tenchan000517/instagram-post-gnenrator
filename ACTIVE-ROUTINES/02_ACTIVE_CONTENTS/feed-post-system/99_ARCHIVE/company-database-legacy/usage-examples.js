/**
 * ランキングジェネレーター使用例
 * companyMasterData.json と rankingGenerator.js を使った企業ランキング生成方法
 */

const fs = require('fs');
const path = require('path');
const CompanyRankingGenerator = require('./rankingGenerator.js');

// データ読み込み
const companyData = JSON.parse(fs.readFileSync('./companyMasterData.json', 'utf8'));
const generator = new CompanyRankingGenerator(companyData);

console.log('=== ランキングジェネレーター使用例 ===\n');

// 1. 基本的な年収ランキング（トップ10）
console.log('【1. 年収ランキング トップ10】');
const salaryTop10 = generator.generateSalaryRanking(10);
salaryTop10.forEach(company => {
  console.log(`${company.rank}位: ${company.name} - ${(company.salary / 10000).toFixed(0)}万円`);
  console.log(`    ${company.description}\n`);
});

// 2. 業界別ランキング（総合商社の年収順）
console.log('【2. 総合商社業界 年収ランキング】');
try {
  const tradingCompanies = generator.generateIndustryRanking('商社', 'salary');
  tradingCompanies.forEach(company => {
    console.log(`${company.rank}位: ${company.name} - ${(company.value / 10000).toFixed(0)}万円`);
  });
} catch (error) {
  console.log('総合商社のデータが見つかりません');
}
console.log('');

// 3. ホワイト企業ランキング（年間休日・有給取得率重視）
console.log('【3. ホワイト企業ランキング トップ5】');
const whiteCompanies = generator.generateWhiteCompanyRanking(5);
whiteCompanies.forEach(company => {
  console.log(`${company.rank}位: ${company.name}`);
  console.log(`    年間休日: ${company.holidays}日, 残業: 月${company.overtime}時間`);
  if (company.vacationRate) {
    console.log(`    有給取得率: ${company.vacationRate}%`);
  }
  console.log(`    ${company.description}\n`);
});

// 4. 総合評価ランキング
console.log('【4. 総合評価ランキング トップ5】');
const overallRanking = generator.generateOverallRanking(5);
overallRanking.forEach(company => {
  console.log(`${company.rank}位: ${company.name}`);
  console.log(`    年収: ${(company.salary / 10000).toFixed(0)}万円, 休日: ${company.holidays}日`);
  console.log(`    総合スコア: ${company.overallScore.toFixed(1)}`);
  console.log(`    評価: 年収${company.scores.salary}, 働きやすさ${company.scores.worklife}, 総合${company.scores.overall}\n`);
});

// 5. カスタム条件での検索
console.log('【5. カスタム検索: 年収1000万円以上 & 年間休日125日以上】');
const customResults = generator.generateCustomRanking({
  salaryRange: [10000000, 50000000],  // 1000万円〜5000万円
  holidayRange: [125, 140],           // 125日〜140日
  sortBy: 'salary',                   // 年収順でソート
  limit: 8
});

customResults.forEach(company => {
  console.log(`${company.rank}位: ${company.name} (${company.industry})`);
  console.log(`    年収: ${(company.salary / 10000).toFixed(0)}万円, 休日: ${company.holidays}日\n`);
});

// 6. 業界フィルター付きランキング
console.log('【6. 製薬業界限定 年収ランキング】');
const pharmaRanking = generator.generateSalaryRanking(10, '製薬');
if (pharmaRanking.length > 0) {
  pharmaRanking.forEach(company => {
    console.log(`${company.rank}位: ${company.name} - ${(company.salary / 10000).toFixed(0)}万円`);
  });
} else {
  console.log('製薬業界のデータが見つかりません');
}

console.log('\n=== 使用方法説明 ===');
console.log('1. companyMasterData.json にデータを追加');
console.log('2. rankingGenerator.js を require');
console.log('3. 各種メソッドを呼び出してランキング生成');
console.log('4. 結果を Instagram投稿やナレッジファイルに活用');