/**
 * 企業ランキング動的生成システム
 * 様々な条件でランキングを組み換え可能
 */

class CompanyRankingGenerator {
  constructor(companyData) {
    this.companies = companyData.companies;
    this.categories = companyData.categories;
  }

  /**
   * 年収ランキング生成
   * @param {number} limit - 上位何社まで取得するか
   * @param {string} industry - 業界フィルター（オプション）
   */
  generateSalaryRanking(limit = 15, industry = null) {
    let filteredCompanies = this.companies;
    
    if (industry) {
      const industryCompanies = this.categories.industry[industry] || [];
      filteredCompanies = this.companies.filter(c => industryCompanies.includes(c.id));
    }

    return filteredCompanies
      .sort((a, b) => b.metrics.salary - a.metrics.salary)
      .slice(0, limit)
      .map((company, index) => ({
        rank: index + 1,
        name: company.companyName,
        salary: company.metrics.salary,
        industry: company.industry,
        description: this.generateSalaryDescription(company)
      }));
  }

  /**
   * ホワイト企業ランキング生成
   * @param {number} limit - 上位何社まで取得するか
   */
  generateWhiteCompanyRanking(limit = 15) {
    return this.companies
      .filter(c => c.metrics.holidays && c.metrics.overtime)
      .sort((a, b) => {
        // 年間休日数の降順、残業時間の昇順でソート
        const holidayDiff = b.metrics.holidays - a.metrics.holidays;
        if (holidayDiff !== 0) return holidayDiff;
        return a.metrics.overtime - b.metrics.overtime;
      })
      .slice(0, limit)
      .map((company, index) => ({
        rank: index + 1,
        name: company.companyName,
        holidays: company.metrics.holidays,
        overtime: company.metrics.overtime,
        vacationRate: company.metrics.vacationRate || null,
        description: this.generateWhiteCompanyDescription(company)
      }));
  }

  /**
   * 業界別ランキング生成
   * @param {string} industry - 業界名
   * @param {string} criteria - ソート基準（salary, holidays, overall等）
   */
  generateIndustryRanking(industry, criteria = 'salary') {
    const industryCompanies = this.categories.industry[industry] || [];
    const filteredCompanies = this.companies.filter(c => industryCompanies.includes(c.id));

    return filteredCompanies
      .sort((a, b) => {
        if (criteria === 'salary') return b.metrics.salary - a.metrics.salary;
        if (criteria === 'holidays') return b.metrics.holidays - a.metrics.holidays;
        if (criteria === 'overall') return this.getOverallScore(b) - this.getOverallScore(a);
        return 0;
      })
      .map((company, index) => ({
        rank: index + 1,
        name: company.companyName,
        value: this.getCriteriaValue(company, criteria),
        description: this.generateIndustryDescription(company, criteria)
      }));
  }

  /**
   * 総合評価ランキング生成
   * @param {number} limit - 上位何社まで取得するか
   */
  generateOverallRanking(limit = 15) {
    return this.companies
      .sort((a, b) => this.getOverallScore(b) - this.getOverallScore(a))
      .slice(0, limit)
      .map((company, index) => ({
        rank: index + 1,
        name: company.companyName,
        salary: company.metrics.salary,
        holidays: company.metrics.holidays,
        overallScore: this.getOverallScore(company),
        scores: company.scores,
        description: this.generateOverallDescription(company)
      }));
  }

  /**
   * カスタム条件でのランキング生成
   * @param {Object} conditions - 条件オブジェクト
   */
  generateCustomRanking(conditions) {
    let filteredCompanies = this.companies;

    // 業界フィルター
    if (conditions.industry) {
      const industryCompanies = this.categories.industry[conditions.industry] || [];
      filteredCompanies = filteredCompanies.filter(c => industryCompanies.includes(c.id));
    }

    // 年収範囲フィルター
    if (conditions.salaryRange) {
      const [min, max] = conditions.salaryRange;
      filteredCompanies = filteredCompanies.filter(c => 
        c.metrics.salary >= min && c.metrics.salary <= max
      );
    }

    // 休日数フィルター
    if (conditions.holidayRange) {
      const [min, max] = conditions.holidayRange;
      filteredCompanies = filteredCompanies.filter(c => 
        c.metrics.holidays >= min && c.metrics.holidays <= max
      );
    }

    // ソート
    filteredCompanies.sort((a, b) => {
      if (conditions.sortBy === 'salary') return b.metrics.salary - a.metrics.salary;
      if (conditions.sortBy === 'holidays') return b.metrics.holidays - a.metrics.holidays;
      if (conditions.sortBy === 'overall') return this.getOverallScore(b) - this.getOverallScore(a);
      return 0;
    });

    return filteredCompanies
      .slice(0, conditions.limit || 15)
      .map((company, index) => ({
        rank: index + 1,
        name: company.companyName,
        salary: company.metrics.salary,
        holidays: company.metrics.holidays,
        industry: company.industry,
        description: this.generateCustomDescription(company, conditions)
      }));
  }

  // ヘルパーメソッド
  getOverallScore(company) {
    const salaryScore = this.normalizeScore(company.metrics.salary, 0, 30000000);
    const holidayScore = this.normalizeScore(company.metrics.holidays, 100, 140);
    const overtimeScore = this.normalizeScore(140 - (company.metrics.overtime || 0), 100, 140);
    const marginScore = this.normalizeScore(company.metrics.operatingMarginRate || 0, 0, 60);
    
    return (salaryScore * 0.3 + holidayScore * 0.25 + overtimeScore * 0.25 + marginScore * 0.2);
  }

  normalizeScore(value, min, max) {
    return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  }

  getCriteriaValue(company, criteria) {
    if (criteria === 'salary') return company.metrics.salary;
    if (criteria === 'holidays') return company.metrics.holidays;
    if (criteria === 'overall') return this.getOverallScore(company);
    return 0;
  }

  // 説明文生成メソッド
  generateSalaryDescription(company) {
    const features = [];
    if (company.metrics.operatingMarginRate > 20) features.push(`営業利益率${company.metrics.operatingMarginRate}%`);
    if (company.metrics.roe > 15) features.push(`ROE${company.metrics.roe}%`);
    if (company.features.specialization) features.push(company.features.specialization);
    
    return `${company.industry}。${features.join('、')}。${company.features.growth || ''}`;
  }

  generateWhiteCompanyDescription(company) {
    const features = [];
    if (company.metrics.vacationRate) features.push(`有給取得率${company.metrics.vacationRate}%`);
    if (company.metrics.parentalLeaveReturn) features.push(`産休育休復帰率${company.metrics.parentalLeaveReturn}%`);
    if (company.features.workStyle) features.push(company.features.workStyle);
    
    return `${company.industry}。年間休日${company.metrics.holidays}日、残業月${company.metrics.overtime}時間。${features.join('、')}。`;
  }

  generateOverallDescription(company) {
    return `${company.industry}。${company.features.specialization || ''}。${company.features.growth || ''}`;
  }

  generateIndustryDescription(company, criteria) {
    return this.generateOverallDescription(company);
  }

  generateCustomDescription(company, conditions) {
    return this.generateOverallDescription(company);
  }
}

// 使用例
/*
const companyData = require('./companyMasterData.json');
const generator = new CompanyRankingGenerator(companyData);

// 年収トップ10
const salaryTop10 = generator.generateSalaryRanking(10);

// 商社業界の年収ランキング
const tradingCompanySalary = generator.generateIndustryRanking('商社', 'salary');

// ホワイト企業トップ15
const whiteCompanies = generator.generateWhiteCompanyRanking(15);

// カスタム条件（年収1000万円以上、休日130日以上）
const customRanking = generator.generateCustomRanking({
  salaryRange: [10000000, 50000000],
  holidayRange: [130, 140],
  sortBy: 'overall',
  limit: 10
});
*/

module.exports = CompanyRankingGenerator;