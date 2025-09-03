/**
 * ランキング評価基準計算モジュール
 * マーケットイン視点の新しいcriteriaに対応した評価ロジック
 */

class RankingCriteriaCalculator {
  /**
   * 企業データから指定されたcriteriaのスコアを計算
   * @param {Object} company - 企業データ
   * @param {string} criteria - 評価基準
   * @returns {number} スコア（高いほど良い）
   */
  static calculateScore(company, criteria) {
    const metrics = company.metrics || {};
    const features = company.features || {};
    const welfare = company.welfare || {};
    const workEnvironment = company.workEnvironment || {};
    const recruitment = company.recruitment || {};

    switch(criteria) {
      // === 基本的な数値指標 ===
      case 'initialSalary':
        return metrics.initialSalary || 0;
      
      case 'salary':
        return metrics.salary || 0;
      
      case 'holidays':
        return metrics.holidays || 0;
      
      case 'overall':
        return this.calculateOverallScore(company);
      
      case 'vacationRate':
        return metrics.vacationRate || 0;
      
      case 'tenure':
        return metrics.averageTenure || 0;
      
      case 'turnoverRate':
        // 離職率は低い方が良いので反転
        return metrics.turnoverRate3Years ? (100 - metrics.turnoverRate3Years) : 0;
      
      case 'maleParentalLeave':
        return metrics.maleParentalLeaveRate || 0;

      // === 就活生向けの新criteria ===
      case 'whiteCompany':
        // ホワイト企業度: 残業少、休日多、離職率低、有給取得率高
        return this.calculateWhiteCompanyScore(company);
      
      case 'hiddenGem':
        // 隠れ優良企業: 知名度は低いが条件が良い
        return this.calculateHiddenGemScore(company);
      
      case 'balancedStart':
        // 初任給高い×離職率低い
        const salary = metrics.initialSalary || 0;
        const retention = metrics.turnoverRate3Years ? (100 - metrics.turnoverRate3Years) : 50;
        return (salary / 1000) * (retention / 100);
      
      case 'growth':
        // 成長できる企業
        return this.calculateGrowthScore(company);
      
      case 'welfare':
        // 福利厚生充実度
        return this.calculateWelfareScore(company);
      
      case 'global':
        // グローバル度
        return this.calculateGlobalScore(company);
      
      case 'remote':
        // リモートワーク充実度
        return this.calculateRemoteScore(company);
      
      case 'youngAuthority':
        // 若手の裁量権
        return this.calculateYoungAuthorityScore(company);

      // === 女性キャリア向けの新criteria ===
      case 'parentalLeave':
        // 産休育休の取りやすさ
        return this.calculateParentalLeaveScore(company);
      
      case 'femaleManager':
        // 女性管理職比率（データがない場合は推定）
        return this.calculateFemaleManagerScore(company);
      
      case 'femaleTenure':
        // 女性が長く働ける度
        return this.calculateFemaleTenureScore(company);
      
      case 'actualOnTime':
        // 本当に定時で帰れる度
        const overtime = metrics.overtime || 30;
        return Math.max(0, 100 - overtime * 2);
      
      case 'flexRemote':
        // フレックス×リモート両立度
        return this.calculateFlexRemoteScore(company);

      // === 男性社会人向けの新criteria ===
      case 'salaryUp':
        // 転職での年収UP可能性
        return this.calculateSalaryUpScore(company);
      
      case 'salary1000at30':
        // 30代で1000万到達可能性
        return this.calculateSalary1000at30Score(company);
      
      case 'skill':
        // スキル習得度
        return this.calculateSkillScore(company);
      
      case 'marketValue':
        // 市場価値向上度
        return this.calculateMarketValueScore(company);
      
      case 'sideJobSalary':
        // 副業OK×高年収
        return this.calculateSideJobSalaryScore(company);

      default:
        // デフォルトは総合スコア
        return this.calculateOverallScore(company);
    }
  }

  // === 複合的なスコア計算メソッド ===

  static calculateOverallScore(company) {
    const metrics = company.metrics || {};
    let score = 0;
    
    // 年収（重み: 30%）
    if (metrics.salary) score += (metrics.salary / 20) * 0.3;
    
    // 初任給（重み: 20%）
    if (metrics.initialSalary) score += (metrics.initialSalary / 4000) * 0.2;
    
    // 休日（重み: 20%）
    if (metrics.holidays) score += (metrics.holidays / 130) * 0.2;
    
    // 残業の少なさ（重み: 15%）
    if (metrics.overtime !== null) {
      score += Math.max(0, (50 - metrics.overtime) / 50) * 0.15;
    }
    
    // 有給取得率（重み: 15%）
    if (metrics.vacationRate) score += (metrics.vacationRate / 100) * 0.15;
    
    return Math.round(score * 100);
  }

  static calculateWhiteCompanyScore(company) {
    const metrics = company.metrics || {};
    let score = 0;
    let factors = 0;
    
    // 残業時間（少ないほど高得点）
    if (metrics.overtime !== null && metrics.overtime !== undefined) {
      score += Math.max(0, 100 - metrics.overtime * 3);
      factors++;
    }
    
    // 年間休日数
    if (metrics.holidays) {
      score += (metrics.holidays / 130) * 100;
      factors++;
    }
    
    // 離職率（低いほど高得点）
    if (metrics.turnoverRate3Years !== null && metrics.turnoverRate3Years !== undefined) {
      score += Math.max(0, 100 - metrics.turnoverRate3Years * 5);
      factors++;
    }
    
    // 有給取得率
    if (metrics.vacationRate) {
      score += metrics.vacationRate;
      factors++;
    }
    
    // 平均勤続年数
    if (metrics.averageTenure) {
      score += Math.min(100, metrics.averageTenure * 5);
      factors++;
    }
    
    return factors > 0 ? Math.round(score / factors) : 0;
  }

  static calculateHiddenGemScore(company) {
    const metrics = company.metrics || {};
    const corporate = company.corporate || {};
    let score = 0;
    
    // 従業員数が少ない（知名度低い）
    if (metrics.employees && metrics.employees < 5000) {
      score += 30;
    }
    
    // でも条件は良い
    if (metrics.salary && metrics.salary > 600) score += 30;
    if (metrics.holidays && metrics.holidays > 125) score += 20;
    if (metrics.overtime !== null && metrics.overtime < 20) score += 20;
    
    return score;
  }

  static calculateGrowthScore(company) {
    const features = company.features || {};
    const welfare = company.welfare || {};
    let score = 0;
    
    // 成長に関するキーワードをチェック
    const growthKeywords = ['成長', 'キャリア', '研修', '教育', 'スキル', '挑戦'];
    const allText = JSON.stringify(features) + JSON.stringify(welfare);
    
    growthKeywords.forEach(keyword => {
      if (allText.includes(keyword)) score += 15;
    });
    
    // 若い会社は成長機会が多い
    const corporate = company.corporate || {};
    if (corporate.established && corporate.established > 2000) {
      score += 20;
    }
    
    return Math.min(100, score);
  }

  static calculateWelfareScore(company) {
    const welfare = company.welfare || {};
    let score = 0;
    let items = 0;
    
    // 各福利厚生項目をチェック
    if (welfare.housingAllowance && welfare.housingAllowance !== 'null') { score += 10; items++; }
    if (welfare.transportationAllowance) { score += 10; items++; }
    if (welfare.familyAllowance) { score += 10; items++; }
    if (welfare.cafeteria) { score += 10; items++; }
    if (welfare.trainingSupport) { score += 15; items++; }
    if (welfare.uniqueBenefits) { score += 20; items++; }
    if (welfare.clubActivities) { score += 10; items++; }
    
    // 福利厚生グレード
    if (welfare.welfareGrade === 'S') score += 25;
    else if (welfare.welfareGrade === 'A') score += 20;
    else if (welfare.welfareGrade === 'B') score += 10;
    
    return Math.min(100, score);
  }

  static calculateRemoteScore(company) {
    const workEnvironment = company.workEnvironment || {};
    const features = company.features || {};
    let score = 0;
    
    const remoteText = (workEnvironment.remoteWork || '') + (features.workStyle || '');
    
    if (remoteText.includes('フルリモート')) score = 100;
    else if (remoteText.includes('リモート') || remoteText.includes('在宅')) score = 70;
    else if (remoteText.includes('ハイブリッド')) score = 60;
    else if (remoteText.includes('一部')) score = 40;
    
    return score;
  }

  static calculateParentalLeaveScore(company) {
    const metrics = company.metrics || {};
    let score = 0;
    
    // 男性育休取得率（高いほど女性も取りやすい文化）
    if (metrics.maleParentalLeaveRate) {
      score += Math.min(50, metrics.maleParentalLeaveRate);
    }
    
    // 女性育休取得率
    if (metrics.femaleParentalLeaveRate) {
      score += Math.min(30, metrics.femaleParentalLeaveRate / 3);
    }
    
    // 育休復帰率
    if (metrics.parentalLeaveReturn) {
      score += Math.min(20, metrics.parentalLeaveReturn / 5);
    }
    
    return score;
  }

  static calculateSalaryUpScore(company) {
    const metrics = company.metrics || {};
    const recruitment = company.recruitment || {};
    let score = 0;
    
    // 高年収企業
    if (metrics.salary && metrics.salary > 800) score += 40;
    
    // 中途採用積極的
    if (recruitment.midCareer && recruitment.midCareer.includes('積極')) score += 30;
    
    // 成果主義（年収アップしやすい）
    const features = company.features || {};
    if (JSON.stringify(features).includes('成果')) score += 30;
    
    return score;
  }

  static calculateSkillScore(company) {
    const features = company.features || {};
    const welfare = company.welfare || {};
    let score = 0;
    
    // スキル関連キーワード
    const skillKeywords = ['技術', 'スキル', '専門', '資格', '研修', 'DX', 'AI', 'データ'];
    const allText = JSON.stringify(features) + JSON.stringify(welfare);
    
    skillKeywords.forEach(keyword => {
      if (allText.includes(keyword)) score += 12;
    });
    
    return Math.min(100, score);
  }

  static calculateMarketValueScore(company) {
    const companyName = company.companyName || '';
    const metrics = company.metrics || {};
    let score = 0;
    
    // 有名企業（転職時の市場価値高い）
    const famousCompanies = ['トヨタ', 'ソニー', 'リクルート', 'サイバーエージェント', '楽天', 'メルカリ', 'マッキンゼー'];
    if (famousCompanies.some(name => companyName.includes(name))) {
      score += 50;
    }
    
    // 高年収（市場価値の指標）
    if (metrics.salary && metrics.salary > 1000) score += 30;
    else if (metrics.salary && metrics.salary > 800) score += 20;
    
    // 成長業界
    if (company.industry && (company.industry.includes('IT') || company.industry.includes('コンサル'))) {
      score += 20;
    }
    
    return score;
  }

  // その他の補助メソッド
  static calculateGlobalScore(company) {
    const features = company.features || {};
    const text = JSON.stringify(features);
    let score = 0;
    
    const globalKeywords = ['グローバル', '海外', '国際', 'global', 'international'];
    globalKeywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword)) score += 20;
    });
    
    return Math.min(100, score);
  }

  static calculateYoungAuthorityScore(company) {
    const metrics = company.metrics || {};
    const features = company.features || {};
    let score = 0;
    
    // 平均年齢が若い
    const avgAge = company.workEnvironment?.averageAge;
    if (avgAge && avgAge < 35) score += 40;
    
    // 裁量権に関するキーワード
    const text = JSON.stringify(features);
    if (text.includes('裁量') || text.includes('挑戦') || text.includes('若手')) {
      score += 30;
    }
    
    // ベンチャー企業
    if (metrics.employees && metrics.employees < 1000) score += 30;
    
    return score;
  }

  static calculateFemaleManagerScore(company) {
    // 実際のデータがない場合は推定
    const metrics = company.metrics || {};
    let score = 50; // デフォルト
    
    // 女性育休取得率が高い会社は女性管理職も多い傾向
    if (metrics.femaleParentalLeaveRate && metrics.femaleParentalLeaveRate > 90) {
      score += 20;
    }
    
    // 男性育休取得率が高い会社も女性に優しい
    if (metrics.maleParentalLeaveRate && metrics.maleParentalLeaveRate > 50) {
      score += 20;
    }
    
    return score;
  }

  static calculateFemaleTenureScore(company) {
    const metrics = company.metrics || {};
    let score = 0;
    
    // 平均勤続年数
    if (metrics.averageTenure) {
      score += Math.min(50, metrics.averageTenure * 3);
    }
    
    // 離職率が低い
    if (metrics.turnoverRate3Years !== null) {
      score += Math.max(0, 50 - metrics.turnoverRate3Years * 5);
    }
    
    return score;
  }

  static calculateFlexRemoteScore(company) {
    const workEnvironment = company.workEnvironment || {};
    let score = 0;
    
    if (workEnvironment.flextime) score += 50;
    if (workEnvironment.remoteWork && workEnvironment.remoteWork.includes('リモート')) score += 50;
    
    return score;
  }

  static calculateSalary1000at30Score(company) {
    const metrics = company.metrics || {};
    
    // 平均年収から推定
    if (metrics.salary && metrics.salary > 1000) return 90;
    if (metrics.salary && metrics.salary > 800) return 60;
    if (metrics.salary && metrics.salary > 600) return 30;
    
    return 10;
  }

  static calculateSideJobSalaryScore(company) {
    const metrics = company.metrics || {};
    const features = company.features || {};
    let score = 0;
    
    // 高年収
    if (metrics.salary && metrics.salary > 800) score += 50;
    
    // 副業に関するキーワード
    const text = JSON.stringify(features) + JSON.stringify(company.welfare || {});
    if (text.includes('副業')) score += 50;
    
    return score;
  }
}

module.exports = RankingCriteriaCalculator;