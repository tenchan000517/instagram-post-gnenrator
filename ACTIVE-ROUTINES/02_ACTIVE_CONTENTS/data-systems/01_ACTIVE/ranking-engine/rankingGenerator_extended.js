/**
 * 拡張版企業ランキング動的生成システム
 * 福利厚生ランキング機能を追加
 */

class ExtendedCompanyRankingGenerator {
  constructor(companyData) {
    this.companies = companyData.companies;
    this.categories = companyData.categories;
  }

  /**
   * 福利厚生ランキング生成
   * @param {number} limit - 上位何社まで取得するか
   * @param {string} criteria - ソート基準（welfareGrade, housingAllowance, overall）
   */
  generateWelfareRanking(limit = 15, criteria = 'welfareGrade') {
    return this.companies
      .filter(c => c.welfare && (c.welfare.welfareGrade || c.welfare.housingAllowance))
      .sort((a, b) => {
        if (criteria === 'welfareGrade') {
          const gradeOrder = { 'S': 3, 'A': 2, 'B': 1, null: 0 };
          const gradeDiff = gradeOrder[b.welfare.welfareGrade] - gradeOrder[a.welfare.welfareGrade];
          if (gradeDiff !== 0) return gradeDiff;
          // 同グレードの場合は住宅手当で比較
          return (b.welfare.housingAllowance || 0) - (a.welfare.housingAllowance || 0);
        }
        if (criteria === 'housingAllowance') {
          return (b.welfare.housingAllowance || 0) - (a.welfare.housingAllowance || 0);
        }
        return this.getOverallScore(b) - this.getOverallScore(a);
      })
      .slice(0, limit)
      .map((company, index) => ({
        rank: index + 1,
        name: company.companyName,
        industry: company.industry,
        welfareGrade: company.welfare.welfareGrade,
        housingAllowance: company.welfare.housingAllowance,
        cafeteria: company.welfare.cafeteria,
        uniqueBenefits: company.welfare.uniqueBenefits,
        description: this.generateWelfareDescription(company)
      }));
  }

  /**
   * 住宅手当ランキング生成
   * @param {number} limit - 上位何社まで取得するか
   */
  generateHousingAllowanceRanking(limit = 15) {
    return this.companies
      .filter(c => c.welfare && c.welfare.housingAllowance > 0)
      .sort((a, b) => b.welfare.housingAllowance - a.welfare.housingAllowance)
      .slice(0, limit)
      .map((company, index) => ({
        rank: index + 1,
        name: company.companyName,
        industry: company.industry,
        housingAllowance: company.welfare.housingAllowance,
        salary: company.metrics.salary,
        holidays: company.metrics.holidays,
        description: `住宅手当月${(company.welfare.housingAllowance / 10000).toFixed(1)}万円。${company.welfare.uniqueBenefits || company.industry}。`
      }));
  }

  /**
   * カフェテリア・食事補助充実企業ランキング
   * @param {number} limit - 上位何社まで取得するか
   */
  generateCafeteriaRanking(limit = 10) {
    return this.companies
      .filter(c => c.welfare && c.welfare.cafeteria)
      .sort((a, b) => {
        // 3食無料 > 社員食堂完備 > その他の順
        const cafeteriaScore = (cafeteria) => {
          if (cafeteria.includes('3食無料') || cafeteria.includes('無料')) return 3;
          if (cafeteria.includes('社員食堂') && cafeteria.includes('完備')) return 2;
          if (cafeteria.includes('社員食堂')) return 1;
          return 0;
        };
        return cafeteriaScore(b.welfare.cafeteria) - cafeteriaScore(a.welfare.cafeteria);
      })
      .slice(0, limit)
      .map((company, index) => ({
        rank: index + 1,
        name: company.companyName,
        industry: company.industry,
        cafeteria: company.welfare.cafeteria,
        description: `${company.welfare.cafeteria}。${company.welfare.uniqueBenefits || company.features.specialization}。`
      }));
  }

  /**
   * ユニーク福利厚生企業ランキング
   * @param {number} limit - 上位何社まで取得するか
   */
  generateUniqueBenefitsRanking(limit = 10) {
    return this.companies
      .filter(c => c.welfare && c.welfare.uniqueBenefits)
      .sort((a, b) => this.getOverallScore(b) - this.getOverallScore(a))
      .slice(0, limit)
      .map((company, index) => ({
        rank: index + 1,
        name: company.companyName,
        industry: company.industry,
        uniqueBenefits: company.welfare.uniqueBenefits,
        welfareGrade: company.welfare.welfareGrade,
        description: `${company.welfare.uniqueBenefits}。${company.industry}。`
      }));
  }

  /**
   * 福利厚生グレード別企業リスト
   * @param {string} grade - S, A, B
   */
  getCompaniesByWelfareGrade(grade) {
    return this.companies
      .filter(c => c.welfare && c.welfare.welfareGrade === grade)
      .sort((a, b) => (b.welfare.housingAllowance || 0) - (a.welfare.housingAllowance || 0))
      .map(company => ({
        name: company.companyName,
        industry: company.industry,
        housingAllowance: company.welfare.housingAllowance,
        cafeteria: company.welfare.cafeteria,
        uniqueBenefits: company.welfare.uniqueBenefits,
        salary: company.metrics.salary,
        holidays: company.metrics.holidays
      }));
  }

  /**
   * 既存のメソッドを継承
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

  generateWhiteCompanyRanking(limit = 15) {
    return this.companies
      .filter(c => c.metrics.holidays && c.metrics.overtime)
      .sort((a, b) => {
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

  generateWelfareDescription(company) {
    const features = [];
    if (company.welfare.housingAllowance) {
      features.push(`住宅手当月${(company.welfare.housingAllowance / 10000).toFixed(1)}万円`);
    }
    if (company.welfare.cafeteria) features.push(company.welfare.cafeteria);
    if (company.welfare.uniqueBenefits) features.push(company.welfare.uniqueBenefits);
    
    return `${company.industry}。${features.join('、')}。`;
  }

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
    if (company.welfare && company.welfare.healthSupport) features.push(company.welfare.healthSupport);
    if (company.features.workStyle) features.push(company.features.workStyle);
    
    return `${company.industry}。年間休日${company.metrics.holidays}日、残業月${company.metrics.overtime}時間。${features.join('、')}。`;
  }

  /**
   * 働きやすさ数値型ランキング生成
   * @param {number} limit - 上位何社まで取得するか
   * @param {string} criteria - ソート基準（turnoverRate, averageTenure, vacationRate, satisfactionScore）
   */
  generateWorkplaceEnvironmentRanking(limit = 15, criteria = 'turnoverRate') {
    return this.companies
      .filter(c => c.workplaceMetrics && c.workplaceMetrics.turnoverRate !== undefined)
      .sort((a, b) => {
        if (criteria === 'turnoverRate') {
          // 離職率は低い方が良いので昇順
          return a.workplaceMetrics.turnoverRate - b.workplaceMetrics.turnoverRate;
        }
        if (criteria === 'averageTenure') {
          return (b.workplaceMetrics.averageTenure || 0) - (a.workplaceMetrics.averageTenure || 0);
        }
        if (criteria === 'vacationRate') {
          return (b.workplaceMetrics.vacationRate || 0) - (a.workplaceMetrics.vacationRate || 0);
        }
        if (criteria === 'satisfactionScore') {
          return (b.workplaceMetrics.satisfactionScore || 0) - (a.workplaceMetrics.satisfactionScore || 0);
        }
        // 総合評価：離職率の低さ、勤続年数の長さ、有給取得率、満足度のバランス
        return this.getWorkplaceScore(b) - this.getWorkplaceScore(a);
      })
      .slice(0, limit)
      .map((company, index) => ({
        rank: index + 1,
        name: company.companyName,
        industry: company.industry,
        turnoverRate: company.workplaceMetrics.turnoverRate,
        averageTenure: company.workplaceMetrics.averageTenure,
        vacationRate: company.workplaceMetrics.vacationRate,
        satisfactionScore: company.workplaceMetrics.satisfactionScore,
        workplaceGrade: company.workplaceMetrics.workplaceGrade,
        description: this.generateWorkplaceDescription(company)
      }));
  }

  /**
   * 働きやすさ総合スコア計算
   */
  getWorkplaceScore(company) {
    const metrics = company.workplaceMetrics;
    if (!metrics) return 0;
    
    // 離職率の低さ（10%から引いた値、マイナス値は0）
    const turnoverScore = Math.max(0, 10 - (metrics.turnoverRate || 10)) * 20;
    // 平均勤続年数（30年を上限として正規化）
    const tenureScore = Math.min((metrics.averageTenure || 0) / 30, 1) * 25;
    // 有給取得率（100%を上限）
    const vacationScore = (metrics.vacationRate || 0) * 0.25;
    // 従業員満足度（100点満点を想定）
    const satisfactionScore = (metrics.satisfactionScore || 0) * 0.25;
    
    return turnoverScore + tenureScore + vacationScore + satisfactionScore;
  }

  /**
   * 働きやすさ説明文生成
   */
  generateWorkplaceDescription(company) {
    const features = [];
    const metrics = company.workplaceMetrics;
    
    if (metrics.turnoverRate < 2) features.push(`離職率${metrics.turnoverRate}%（業界最低水準）`);
    else if (metrics.turnoverRate < 5) features.push(`離職率${metrics.turnoverRate}%`);
    
    if (metrics.averageTenure > 20) features.push(`平均勤続年数${metrics.averageTenure}年（長期安定）`);
    else if (metrics.averageTenure > 15) features.push(`平均勤続年数${metrics.averageTenure}年`);
    
    if (metrics.vacationRate > 85) features.push(`有給取得率${metrics.vacationRate}%（高水準）`);
    else if (metrics.vacationRate > 75) features.push(`有給取得率${metrics.vacationRate}%`);
    
    if (metrics.satisfactionScore > 75) features.push(`従業員満足度${metrics.satisfactionScore}点`);
    
    if (metrics.maternityReturnRate > 90) features.push(`育休復帰率${metrics.maternityReturnRate}%`);
    
    return `${company.industry}。${features.join('、')}。${company.features.workStyle || company.features.growth || ''}`;
  }

  /**
   * 働きやすさグレード別企業検索
   */
  getCompaniesByWorkplaceGrade(grade) {
    return this.companies
      .filter(c => c.workplaceMetrics && c.workplaceMetrics.workplaceGrade === grade)
      .map(company => ({
        name: company.companyName,
        industry: company.industry,
        turnoverRate: company.workplaceMetrics.turnoverRate,
        averageTenure: company.workplaceMetrics.averageTenure,
        vacationRate: company.workplaceMetrics.vacationRate,
        satisfactionScore: company.workplaceMetrics.satisfactionScore,
        description: this.generateWorkplaceDescription(company)
      }));
  }
}

// 使用例
/*
const companyData = require('./companyMasterData_extended.json');
const generator = new ExtendedCompanyRankingGenerator(companyData);

// 働きやすさ数値型ランキング
const workplaceRanking = generator.generateWorkplaceEnvironmentRanking(15);

// 離職率順ランキング
const turnoverRanking = generator.generateWorkplaceEnvironmentRanking(15, 'turnoverRate');

// 平均勤続年数順ランキング
const tenureRanking = generator.generateWorkplaceEnvironmentRanking(15, 'averageTenure');

// 有給取得率順ランキング
const vacationRanking = generator.generateWorkplaceEnvironmentRanking(15, 'vacationRate');

// 従業員満足度順ランキング
const satisfactionRanking = generator.generateWorkplaceEnvironmentRanking(15, 'satisfactionScore');

// S級働きやすさ企業一覧
const sGradeWorkplace = generator.getCompaniesByWorkplaceGrade('S');

// 福利厚生総合ランキング
const welfareRanking = generator.generateWelfareRanking(15);

// 住宅手当ランキング
const housingRanking = generator.generateHousingAllowanceRanking(10);

// カフェテリア・食事補助ランキング
const cafeteriaRanking = generator.generateCafeteriaRanking(10);

// ユニーク福利厚生ランキング
const uniqueRanking = generator.generateUniqueBenefitsRanking(10);

// S級福利厚生企業一覧
const sGradeCompanies = generator.getCompaniesByWelfareGrade('S');
*/

module.exports = ExtendedCompanyRankingGenerator;