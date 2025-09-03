/**
 * 高度企業ランキング生成システム
 * 統一インターフェースで多様なフィルター・ランキングに対応
 */

class AdvancedRankingGenerator {
  constructor(companyData) {
    // 統合データベース構造に対応
    this.companies = [];
    if (companyData.industries && Array.isArray(companyData.industries)) {
      // 全業界の企業を平坦化
      companyData.industries.forEach(industry => {
        if (industry.companies && Array.isArray(industry.companies)) {
          this.companies.push(...industry.companies);
        }
      });
    } else if (companyData.companies) {
      // 既存の平坦構造
      this.companies = companyData.companies;
    }
    
    this.availableIndustries = this.getUniqueIndustries();
    console.log(`✅ データロード完了: ${this.companies.length}社, ${this.availableIndustries.length}業界`);
  }

  /**
   * 高度ランキング生成メイン関数
   * @param {string} criteria - ソート基準 ('salary', 'holidays', 'overtime', 'vacationRate', 'tenure', 'initialSalary', 'employees', 'overall')
   * @param {number} limit - 取得数
   * @param {Object} filters - フィルター条件
   */
  generateAdvancedRanking(criteria, limit = 10, filters = {}) {
    let filteredCompanies = [...this.companies];
    
    // フィルター適用
    filteredCompanies = this.applyFilters(filteredCompanies, filters);
    
    // データ存在チェック
    filteredCompanies = this.filterByDataAvailability(filteredCompanies, criteria);
    
    // ソート
    filteredCompanies = this.sortByCriteria(filteredCompanies, criteria);
    
    // 結果生成
    return filteredCompanies.slice(0, limit).map((company, index) => ({
      rank: index + 1,
      id: company.id,
      name: company.companyName,
      industry: company.industry,
      value: this.getCriteriaValue(company, criteria),
      formattedValue: this.formatValue(this.getCriteriaValue(company, criteria), criteria),
      metrics: company.metrics,
      features: company.features,
      welfare: company.welfare,
      description: this.generateDescription(company, criteria)
    }));
  }

  /**
   * フィルター適用
   */
  applyFilters(companies, filters) {
    let filtered = companies;

    // 業界フィルター（単数・複数両対応 + 業界マッピング）
    if (filters.industry || (filters.industries && filters.industries.length > 0)) {
      const industryMapping = this.getIndustryMapping();
      let targetIndustries = [];
      
      if (filters.industry) {
        // 単数形の場合、マッピングを使って関連業界を取得
        targetIndustries = industryMapping[filters.industry] || [filters.industry];
      }
      
      if (filters.industries && filters.industries.length > 0) {
        // 複数形の場合、各業界のマッピングを展開
        filters.industries.forEach(industry => {
          const mapped = industryMapping[industry] || [industry];
          targetIndustries.push(...mapped);
        });
      }
      
      // 重複除去
      targetIndustries = [...new Set(targetIndustries)];
      
      filtered = filtered.filter(c => targetIndustries.includes(c.industry));
    }

    // 年収範囲
    if (filters.salaryRange) {
      filtered = this.applyRangeFilter(filtered, 'metrics.salary', filters.salaryRange);
    }

    // 従業員数範囲
    if (filters.employeesRange) {
      filtered = this.applyRangeFilter(filtered, 'metrics.employees', filters.employeesRange);
    }

    // 設立年範囲
    if (filters.establishedRange) {
      filtered = this.applyRangeFilter(filtered, 'companyDetails.established', filters.establishedRange);
    }

    // 残業時間範囲
    if (filters.overtimeRange) {
      filtered = this.applyRangeFilter(filtered, 'metrics.overtime', filters.overtimeRange);
    }

    // 年間休日範囲
    if (filters.holidaysRange) {
      filtered = this.applyRangeFilter(filtered, 'metrics.holidays', filters.holidaysRange);
    }

    // 有給取得率範囲
    if (filters.vacationRateRange) {
      filtered = this.applyRangeFilter(filtered, 'metrics.vacationRate', filters.vacationRateRange);
    }

    // 平均勤続年数範囲
    if (filters.tenureRange) {
      filtered = this.applyRangeFilter(filtered, 'metrics.averageTenure', filters.tenureRange);
    }

    // 上場区分
    if (filters.listingStatus) {
      filtered = filtered.filter(c => 
        c.companyDetails.listingStatus && 
        c.companyDetails.listingStatus.includes(filters.listingStatus)
      );
    }

    return filtered;
  }

  /**
   * 範囲フィルター適用ヘルパー
   */
  applyRangeFilter(companies, path, range) {
    return companies.filter(company => {
      const value = this.getNestedValue(company, path);
      if (value === null || value === undefined) return false;
      
      const [min, max] = range;
      if (min !== null && value < min) return false;
      if (max !== null && value > max) return false;
      return true;
    });
  }

  /**
   * ネストされたプロパティ値取得
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
  }

  /**
   * データ存在チェック
   */
  filterByDataAvailability(companies, criteria) {
    return companies.filter(company => {
      const value = this.getCriteriaValue(company, criteria);
      return value !== null && value !== undefined;
    });
  }

  /**
   * ソート実行
   */
  sortByCriteria(companies, criteria) {
    return companies.sort((a, b) => {
      const aValue = this.getCriteriaValue(a, criteria);
      const bValue = this.getCriteriaValue(b, criteria);
      
      // 残業時間は少ない方が良い（昇順）
      if (criteria === 'overtime') {
        return aValue - bValue;
      }
      
      // その他は多い方が良い（降順）
      return bValue - aValue;
    });
  }

  /**
   * 基準値取得
   */
  getCriteriaValue(company, criteria) {
    switch (criteria) {
      case 'salary': return company.metrics.salary;
      case 'initialSalary': return company.metrics.initialSalary;
      case 'holidays': return company.metrics.holidays;
      case 'overtime': return company.metrics.overtime;
      case 'vacationRate': return company.metrics.vacationRate;
      case 'tenure': return company.metrics.averageTenure;
      case 'employees': return company.metrics.employees;
      case 'turnoverRate': return company.metrics.turnoverRate3Years;
      case 'maleParentalLeave': return company.metrics.maleParentalLeaveRate;
      case 'overall': return this.calculateOverallScore(company);
      default: return null;
    }
  }

  /**
   * 総合スコア計算
   */
  calculateOverallScore(company) {
    const salary = company.metrics.salary || 0;
    const holidays = company.metrics.holidays || 0;
    const overtime = company.metrics.overtime || 30; // デフォルト30時間
    
    const salaryScore = Math.min(100, (salary / 15000000) * 100);
    const holidayScore = Math.min(100, ((holidays - 100) / 40) * 100);
    const overtimeScore = Math.max(0, ((60 - overtime) / 60) * 100);
    
    return (salaryScore * 0.4 + holidayScore * 0.3 + overtimeScore * 0.3);
  }

  /**
   * 値のフォーマット
   */
  formatValue(value, criteria) {
    if (value === null || value === undefined) return 'データなし';
    
    switch (criteria) {
      case 'salary':
      case 'initialSalary':
        return `${(value / 10000).toFixed(0)}万円`;
      case 'holidays':
        return `${value}日`;
      case 'overtime':
        return `${value}時間/月`;
      case 'vacationRate':
      case 'maleParentalLeave':
        return `${value}%`;
      case 'tenure':
        return `${value}年`;
      case 'employees':
        return `${value.toLocaleString()}人`;
      case 'overall':
        return `${value.toFixed(1)}点`;
      default:
        return value.toString();
    }
  }

  /**
   * 説明文生成
   */
  generateDescription(company, criteria) {
    const features = [];
    
    if (company.features.specialization) {
      features.push(company.features.specialization);
    }
    if (company.features.workStyle) {
      features.push(company.features.workStyle);
    }
    
    return `${company.industry}。${features.join('、')}。`;
  }

  /**
   * 業界マッピング定義
   */
  getIndustryMapping() {
    return {
      "IT業界": [
        "システムインテグレーション業",
        "AI・テック業界",
        "IT・エンジニア人材サービス",
        "IT・医療人材サービス",
        "インターネット・IT・通信",
        "外資系IT業界",
        "外資系IT・EC業界"
      ],
      "食品・農林・水産": [
        "食品業界",
        "食品・調味料",
        "飲料・酒類・食品",
        "飲料・食品",
        "農林水産",
        "農業協同組合（JA）",
        "農業機械・建設機械メーカー",
        "農機・エンジン・船舶メーカー"
      ],
      "金融業界": [
        "金融業界",
        "銀行業界",
        "証券業界",
        "保険業界",
        "信託銀行業界",
        "ネット銀行",
        "フィンテック業界",
        "EC・フィンテック"
      ],
      "製薬業・医薬品製造業": [
        "製薬業・医薬品製造業",
        "製薬・医療機器業界",
        "医薬品・医療機器業界",
        "製薬業界"
      ],
      "化学業界": [
        "化学業界",
        "化学・素材業界",
        "石油化学業界"
      ],
      "総合電機業界": [
        "総合電機業界",
        "電機・電子業界",
        "電子部品業界",
        "精密機器業界"
      ],
      "通信業界": [
        "通信業界",
        "インターネットサービス・フィンテック・モバイル通信",
        "インターネット・IT・通信",
        "モバイル通信業界"
      ],
      "メディア・広告業界": [
        "メディア・広告業界",
        "インターネット広告業・メディア業・ゲーム業",
        "エンターテインメント・メディア業界",
        "ホールディングス（広告代理店）"
      ],
      "コンサル業界": [
        "コンサルティング業界",
        "経営コンサルティング業界",
        "ITコンサルティング業界"
      ]
    };
  }

  /**
   * ユニーク業界取得
   */
  getUniqueIndustries() {
    return [...new Set(this.companies.map(c => c.industry))];
  }

  /**
   * 利用可能業界一覧取得
   */
  getAvailableIndustries() {
    return this.availableIndustries;
  }

  /**
   * 企業数統計取得
   */
  getStats(filters = {}) {
    const filtered = this.applyFilters(this.companies, filters);
    return {
      totalCompanies: filtered.length,
      industries: this.getUniqueIndustries(),
      avgSalary: this.calculateAverageSalary(filtered)
    };
  }

  calculateAverageSalary(companies) {
    const companiesWithSalary = companies.filter(c => c.metrics.salary);
    if (companiesWithSalary.length === 0) return 0;
    
    const total = companiesWithSalary.reduce((sum, c) => sum + c.metrics.salary, 0);
    return Math.round(total / companiesWithSalary.length);
  }
}

module.exports = AdvancedRankingGenerator;