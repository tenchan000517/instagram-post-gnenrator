/**
 * 生産性ツールランキング生成システム
 * 企業データベースのadvancedRankingGenerator.jsの構造を完全踏襲
 * TEN特化の評価軸・フィルター・ソート機能を実装
 */

class ProductivityRankingGenerator {
  constructor(productivityData) {
    // 統合データベース構造に対応
    this.items = [];
    if (productivityData.categories && Array.isArray(productivityData.categories)) {
      // 全カテゴリのアイテムを平坦化
      productivityData.categories.forEach(category => {
        if (category.items && Array.isArray(category.items)) {
          this.items.push(...category.items);
        }
      });
    } else if (productivityData.items) {
      // 既存の平坦構造
      this.items = productivityData.items;
    }
    
    this.availableCategories = this.getUniqueCategories();
    console.log(`✅ 生産性データロード完了: ${this.items.length}アイテム, ${this.availableCategories.length}カテゴリ`);
  }

  /**
   * 高度ランキング生成メイン関数
   * @param {string} criteria - ソート基準 ('ten_score', 'productivity', 'popularity', 'price', 'ease_of_use', etc.)
   * @param {number} limit - 取得数
   * @param {Object} filters - フィルター条件
   */
  generateAdvancedRanking(criteria, limit = 10, filters = {}) {
    let filteredItems = [...this.items];
    
    // フィルター適用
    filteredItems = this.applyFilters(filteredItems, filters);
    
    // データ存在チェック
    filteredItems = this.filterByDataAvailability(filteredItems, criteria);
    
    // ソート
    filteredItems = this.sortByCriteria(filteredItems, criteria);
    
    // 結果生成
    return filteredItems.slice(0, limit).map((item, index) => ({
      rank: index + 1,
      id: item.id,
      name: item.toolName || item.name,
      category: item.category,
      subCategory: item.subCategory,
      value: this.getCriteriaValue(item, criteria),
      formattedValue: this.formatValue(this.getCriteriaValue(item, criteria), criteria),
      metrics: item.metrics,
      features: item.features,
      pricing: item.pricing,
      tenScore: this.calculateTenScore(item),
      description: this.generateDescription(item, criteria)
    }));
  }

  /**
   * フィルター適用
   */
  applyFilters(items, filters) {
    let filtered = items;

    // カテゴリフィルター（単数・複数両対応）
    if (filters.category || (filters.categories && filters.categories.length > 0)) {
      const categoryMapping = this.getCategoryMapping();
      let targetCategories = [];
      
      if (filters.category) {
        targetCategories = categoryMapping[filters.category] || [filters.category];
      }
      
      if (filters.categories && filters.categories.length > 0) {
        filters.categories.forEach(category => {
          const mapped = categoryMapping[category] || [category];
          targetCategories.push(...mapped);
        });
      }
      
      // 重複除去
      targetCategories = [...new Set(targetCategories)];
      
      filtered = filtered.filter(item => 
        targetCategories.includes(item.category) || 
        targetCategories.includes(item.subCategory)
      );
    }

    // 価格フィルター（無料のみ等）
    if (filters.priceType) {
      switch (filters.priceType) {
        case 'free':
          filtered = filtered.filter(item => item.pricing?.free === true);
          break;
        case 'paid':
          filtered = filtered.filter(item => item.pricing?.paid);
          break;
        case 'freemium':
          filtered = filtered.filter(item => 
            item.pricing?.free === true && item.pricing?.paid
          );
          break;
      }
    }

    // 価格範囲フィルター
    if (filters.priceRange) {
      filtered = this.applyRangeFilter(filtered, 'pricing.paid.monthly', filters.priceRange);
    }

    // プラットフォームフィルター
    if (filters.platform) {
      filtered = filtered.filter(item => item.platforms?.[filters.platform] === true);
    }

    // 機能フィルター
    if (filters.features && filters.features.length > 0) {
      filtered = filtered.filter(item => {
        return filters.features.every(feature => item.features?.[feature] === true);
      });
    }

    // TENスコア範囲フィルター
    if (filters.tenScoreRange) {
      filtered = filtered.filter(item => {
        const tenScore = this.calculateTenScore(item);
        const [min, max] = filters.tenScoreRange;
        if (min !== null && tenScore < min) return false;
        if (max !== null && tenScore > max) return false;
        return true;
      });
    }

    // 即効性フィルター（TEN特化）
    if (filters.immediateEffect && filters.immediateEffect > 0) {
      filtered = filtered.filter(item => 
        (item.ten_criteria?.immediate_effect || 0) >= filters.immediateEffect
      );
    }

    // 導入障壁フィルター（TEN特化）
    if (filters.lowBarrier && filters.lowBarrier > 0) {
      filtered = filtered.filter(item => 
        (item.ten_criteria?.low_barrier || 0) >= filters.lowBarrier
      );
    }

    return filtered;
  }

  /**
   * 範囲フィルター適用ヘルパー
   */
  applyRangeFilter(items, path, range) {
    return items.filter(item => {
      const value = this.getNestedValue(item, path);
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
  filterByDataAvailability(items, criteria) {
    return items.filter(item => {
      const value = this.getCriteriaValue(item, criteria);
      return value !== null && value !== undefined;
    });
  }

  /**
   * ソート実行
   */
  sortByCriteria(items, criteria) {
    return items.sort((a, b) => {
      const aValue = this.getCriteriaValue(a, criteria);
      const bValue = this.getCriteriaValue(b, criteria);
      
      // セットアップ時間は少ない方が良い（昇順）
      if (criteria === 'setup_time') {
        return aValue - bValue;
      }
      
      // その他は高い方が良い（降順）
      return bValue - aValue;
    });
  }

  /**
   * 基準値取得
   */
  getCriteriaValue(item, criteria) {
    switch (criteria) {
      case 'ten_score': return this.calculateTenScore(item);
      case 'productivity': return item.metrics?.productivity_score;
      case 'popularity': return item.metrics?.popularity;
      case 'ease_of_use': return item.metrics?.ease_of_use;
      case 'setup_time': return item.metrics?.setup_time;
      case 'learning_curve': return item.metrics?.learning_curve;
      case 'price_score': return item.metrics?.price_score;
      case 'feature_richness': return item.metrics?.feature_richness;
      case 'reliability': return item.metrics?.reliability;
      case 'immediate_effect': return item.ten_criteria?.immediate_effect;
      case 'low_barrier': return item.ten_criteria?.low_barrier;
      case 'trend_factor': return item.ten_criteria?.trend_factor;
      case 'cost_effectiveness': return item.ten_criteria?.cost_effectiveness;
      case 'lazy_friendly': return item.ten_criteria?.lazy_friendly;
      case 'overall': return this.calculateOverallScore(item);
      default: return null;
    }
  }

  /**
   * TEN特化スコア計算
   */
  calculateTenScore(item) {
    const criteria = item.ten_criteria || {};
    const weights = {
      immediate_effect: 0.25,    // 即効性 25%
      low_barrier: 0.25,         // 導入の簡単さ 25%
      trend_factor: 0.20,        // トレンド 20%
      cost_effectiveness: 0.20,  // コスト 20%
      lazy_friendly: 0.10        // めんどくさがり対応 10%
    };
    
    let totalScore = 0;
    Object.keys(weights).forEach(key => {
      if (criteria[key]) {
        totalScore += criteria[key] * weights[key];
      }
    });
    
    return Math.round(totalScore);
  }

  /**
   * 総合スコア計算
   */
  calculateOverallScore(item) {
    const productivity = item.metrics?.productivity_score || 0;
    const popularity = item.metrics?.popularity || 0;
    const easeOfUse = item.metrics?.ease_of_use || 0;
    const priceScore = item.metrics?.price_score || 0;
    
    const productivityScore = (productivity / 100) * 30;
    const popularityScore = (popularity / 100) * 25;
    const usabilityScore = (easeOfUse / 100) * 25;
    const costScore = (priceScore / 100) * 20;
    
    return productivityScore + popularityScore + usabilityScore + costScore;
  }

  /**
   * 値のフォーマット
   */
  formatValue(value, criteria) {
    if (value === null || value === undefined) return 'データなし';
    
    switch (criteria) {
      case 'ten_score':
      case 'productivity':
      case 'popularity':
      case 'ease_of_use':
      case 'learning_curve':
      case 'price_score':
      case 'feature_richness':
      case 'reliability':
      case 'immediate_effect':
      case 'low_barrier':
      case 'trend_factor':
      case 'cost_effectiveness':
      case 'lazy_friendly':
        return `${value}点`;
      case 'setup_time':
        return `${value}分`;
      case 'overall':
        return `${value.toFixed(1)}点`;
      default:
        return value.toString();
    }
  }

  /**
   * 説明文生成
   */
  generateDescription(item, criteria) {
    const features = [];
    
    if (item.features?.ai_powered) features.push('AI搭載');
    if (item.features?.collaboration) features.push('チーム協業');
    if (item.pricing?.free) features.push('無料版あり');
    if (item.features?.mobile_app) features.push('スマホ対応');
    
    const categoryDesc = `${item.category}。`;
    const featureDesc = features.length > 0 ? `${features.join('、')}。` : '';
    
    return categoryDesc + featureDesc;
  }

  /**
   * カテゴリマッピング定義
   */
  getCategoryMapping() {
    return {
      "生産性ツール": [
        "ノートアプリ",
        "タスク管理",
        "自動化ツール",
        "パスワード管理",
        "時間管理"
      ],
      "デバイス・ガジェット": [
        "キーボード",
        "マウス", 
        "モニター",
        "ヘッドホン",
        "デスクアクセサリー"
      ],
      "モバイルアプリ": [
        "モバイル生産性",
        "学習アプリ",
        "習慣化アプリ"
      ]
    };
  }

  /**
   * ユニークカテゴリ取得
   */
  getUniqueCategories() {
    return [...new Set(this.items.map(item => item.category))];
  }

  /**
   * 利用可能カテゴリ一覧取得
   */
  getAvailableCategories() {
    return this.availableCategories;
  }

  /**
   * アイテム数統計取得
   */
  getStats(filters = {}) {
    const filtered = this.applyFilters(this.items, filters);
    return {
      totalItems: filtered.length,
      categories: this.getUniqueCategories(),
      avgTenScore: this.calculateAverageTenScore(filtered),
      freeItemsCount: filtered.filter(item => item.pricing?.free).length
    };
  }

  calculateAverageTenScore(items) {
    const itemsWithScore = items.filter(item => this.calculateTenScore(item) > 0);
    if (itemsWithScore.length === 0) return 0;
    
    const total = itemsWithScore.reduce((sum, item) => sum + this.calculateTenScore(item), 0);
    return Math.round(total / itemsWithScore.length);
  }
}

module.exports = ProductivityRankingGenerator;