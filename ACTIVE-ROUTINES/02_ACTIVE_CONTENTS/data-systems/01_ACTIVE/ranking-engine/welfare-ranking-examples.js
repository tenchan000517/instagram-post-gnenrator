/**
 * 福利厚生ランキングジェネレーター使用例
 */

const fs = require('fs');
const ExtendedCompanyRankingGenerator = require('./rankingGenerator_extended.js');

// 拡張データ読み込み
const companyData = JSON.parse(fs.readFileSync('./companyMasterData_extended.json', 'utf8'));
const generator = new ExtendedCompanyRankingGenerator(companyData);

console.log('=== 福利厚生ランキングジェネレーター使用例 ===\n');

// 1. 福利厚生総合ランキング
console.log('【1. 福利厚生総合ランキング トップ10】');
const welfareRanking = generator.generateWelfareRanking(10);
welfareRanking.forEach(company => {
  console.log(`${company.rank}位: ${company.name} (${company.welfareGrade}級)`);
  if (company.housingAllowance) {
    console.log(`    住宅手当: 月${(company.housingAllowance / 10000).toFixed(1)}万円`);
  }
  if (company.cafeteria) {
    console.log(`    食事: ${company.cafeteria}`);
  }
  if (company.uniqueBenefits) {
    console.log(`    特徴: ${company.uniqueBenefits}`);
  }
  console.log('');
});

// 2. 住宅手当ランキング
console.log('【2. 住宅手当ランキング トップ8】');
const housingRanking = generator.generateHousingAllowanceRanking(8);
housingRanking.forEach(company => {
  console.log(`${company.rank}位: ${company.name}`);
  console.log(`    住宅手当: 月${(company.housingAllowance / 10000).toFixed(1)}万円`);
  console.log(`    年収: ${(company.salary / 10000).toFixed(0)}万円, 休日: ${company.holidays}日\n`);
});

// 3. カフェテリア・食事補助ランキング
console.log('【3. カフェテリア・食事補助ランキング】');
const cafeteriaRanking = generator.generateCafeteriaRanking(8);
cafeteriaRanking.forEach(company => {
  console.log(`${company.rank}位: ${company.name}`);
  console.log(`    ${company.cafeteria}\n`);
});

// 4. ユニーク福利厚生ランキング
console.log('【4. ユニーク福利厚生ランキング】');
const uniqueRanking = generator.generateUniqueBenefitsRanking(8);
uniqueRanking.forEach(company => {
  console.log(`${company.rank}位: ${company.name} (${company.welfareGrade}級)`);
  console.log(`    ${company.uniqueBenefits}\n`);
});

// 5. 福利厚生グレード別企業一覧
console.log('【5. S級福利厚生企業一覧】');
const sGradeCompanies = generator.getCompaniesByWelfareGrade('S');
sGradeCompanies.forEach((company, index) => {
  console.log(`${index + 1}. ${company.name}`);
  console.log(`   業界: ${company.industry}`);
  if (company.housingAllowance) {
    console.log(`   住宅手当: 月${(company.housingAllowance / 10000).toFixed(1)}万円`);
  }
  if (company.cafeteria) {
    console.log(`   食事: ${company.cafeteria}`);
  }
  if (company.uniqueBenefits) {
    console.log(`   特徴: ${company.uniqueBenefits}`);
  }
  console.log(`   年収: ${(company.salary / 10000).toFixed(0)}万円, 休日: ${company.holidays}日\n`);
});

console.log('【6. A級福利厚生企業一覧】');
const aGradeCompanies = generator.getCompaniesByWelfareGrade('A');
aGradeCompanies.forEach((company, index) => {
  console.log(`${index + 1}. ${company.name} (${company.industry})`);
  if (company.housingAllowance) {
    console.log(`   住宅手当: 月${(company.housingAllowance / 10000).toFixed(1)}万円`);
  }
  console.log('');
});

// 7. 既存ランキングとの組み合わせ例
console.log('【7. 年収1000万円以上 & 福利厚生A級以上の企業】');
const highSalaryWithWelfare = generator.companies
  .filter(c => 
    c.metrics.salary >= 10000000 && 
    c.welfare && 
    (c.welfare.welfareGrade === 'S' || c.welfare.welfareGrade === 'A')
  )
  .sort((a, b) => b.metrics.salary - a.metrics.salary)
  .map((company, index) => ({
    rank: index + 1,
    name: company.companyName,
    salary: company.metrics.salary,
    welfareGrade: company.welfare.welfareGrade,
    housingAllowance: company.welfare.housingAllowance,
    industry: company.industry
  }));

highSalaryWithWelfare.forEach(company => {
  console.log(`${company.rank}位: ${company.name} (${company.welfareGrade}級)`);
  console.log(`    年収: ${(company.salary / 10000).toFixed(0)}万円`);
  if (company.housingAllowance) {
    console.log(`    住宅手当: 月${(company.housingAllowance / 10000).toFixed(1)}万円`);
  }
  console.log(`    業界: ${company.industry}\n`);
});

console.log('\n=== 活用方法 ===');
console.log('1. Instagram投稿「住宅手当月10万円企業ランキング」作成');
console.log('2. 転職サイト向け「福利厚生充実企業特集」コンテンツ');
console.log('3. 新卒向け「ユニーク福利厚生企業紹介」記事');
console.log('4. 業界別福利厚生比較レポート作成');
console.log('5. 条件別企業検索機能への活用');