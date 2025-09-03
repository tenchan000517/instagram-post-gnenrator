/**
 * ターゲット別ニーズパターン定義
 * 各ターゲットが知りたい情報を30パターンずつ定義
 */

const TARGET_NEEDS_PATTERNS = {
  // 就活生向け（30パターン）
  jobSeekers: [
    // 基本情報系
    { id: 'JS001', name: '初任給ランキングTOP10', criteria: 'initialSalary', limit: 10, filters: {} },
    { id: 'JS002', name: '初任給ランキングTOP20', criteria: 'initialSalary', limit: 20, filters: {} },
    { id: 'JS003', name: '年間休日数ランキングTOP10', criteria: 'holidays', limit: 10, filters: {} },
    { id: 'JS004', name: '3年離職率が低い企業TOP10', criteria: 'turnoverRate', limit: 10, filters: {} },
    { id: 'JS005', name: '総合スコアTOP10', criteria: 'overall', limit: 10, filters: {} },
    
    // 業界別初任給
    { id: 'JS006', name: 'IT業界初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industries: ['IT業界'] } },
    { id: 'JS007', name: '商社業界初任給TOP5', criteria: 'initialSalary', limit: 5, filters: { industries: ['商社業界'] } },
    { id: 'JS008', name: '金融業界初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industries: ['金融業界'] } },
    { id: 'JS009', name: 'コンサル業界初任給TOP5', criteria: 'initialSalary', limit: 5, filters: { industries: ['コンサルティング業界'] } },
    { id: 'JS010', name: '外資系IT初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industries: ['外資系IT・EC業界'] } },
    
    // 業界別年間休日
    { id: 'JS011', name: 'IT業界年間休日TOP10', criteria: 'holidays', limit: 10, filters: { industries: ['IT業界'] } },
    { id: 'JS012', name: '金融業界年間休日TOP10', criteria: 'holidays', limit: 10, filters: { industries: ['金融業界'] } },
    { id: 'JS013', name: '商社業界年間休日TOP5', criteria: 'holidays', limit: 5, filters: { industries: ['商社業界'] } },
    { id: 'JS014', name: '自動車業界年間休日TOP5', criteria: 'holidays', limit: 5, filters: { industries: ['自動車業界'] } },
    { id: 'JS015', name: '総合電機業界年間休日TOP5', criteria: 'holidays', limit: 5, filters: { industries: ['総合電機業界'] } },
    
    // 企業規模別
    { id: 'JS016', name: '大企業(1万人以上)初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { employeesRange: [10000, null] } },
    { id: 'JS017', name: '中堅企業(1000-1万人)初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { employeesRange: [1000, 9999] } },
    { id: 'JS018', name: 'ベンチャー企業(1000人以下)初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { employeesRange: [null, 999] } },
    
    // 設立年別
    { id: 'JS019', name: '老舗企業(設立50年以上)初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { establishedRange: [null, 1974] } },
    { id: 'JS020', name: '成長企業(設立20年以内)初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { establishedRange: [2004, null] } },
    
    // 条件組み合わせ
    { id: 'JS021', name: 'IT業界×年間休日125日以上TOP10', criteria: 'initialSalary', limit: 10, filters: { industries: ['IT業界'], holidaysRange: [125, null] } },
    { id: 'JS022', name: '金融業界×大企業初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industries: ['金融業界'], employeesRange: [5000, null] } },
    { id: 'JS023', name: '商社業界×総合スコアTOP5', criteria: 'overall', limit: 5, filters: { industries: ['商社業界'] } },
    { id: 'JS024', name: 'コンサル業界×初任給TOP5', criteria: 'initialSalary', limit: 5, filters: { industries: ['コンサルティング業界'] } },
    
    // 上場区分別
    { id: 'JS025', name: '東証プライム企業初任給TOP15', criteria: 'initialSalary', limit: 15, filters: { listingStatus: '東証プライム' } },
    { id: 'JS026', name: '東証プライム企業年間休日TOP15', criteria: 'holidays', limit: 15, filters: { listingStatus: '東証プライム' } },
    
    // 複合業界
    { id: 'JS027', name: 'IT・外資系IT初任給TOP15', criteria: 'initialSalary', limit: 15, filters: { industries: ['IT業界', '外資系IT・EC業界'] } },
    { id: 'JS028', name: '金融・商社初任給TOP15', criteria: 'initialSalary', limit: 15, filters: { industries: ['金融業界', '商社業界'] } },
    { id: 'JS029', name: 'メーカー系(自動車・電機)初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industries: ['自動車業界', '総合電機業界'] } },
    { id: 'JS030', name: '全業界初任給30万円以上企業TOP20', criteria: 'initialSalary', limit: 20, filters: { salaryRange: [300000, null] } }
  ],

  // 女性キャリア向け（30パターン）
  femaleCareer: [
    // ワークライフバランス重視
    { id: 'FC001', name: 'ワークライフバランス企業TOP10', criteria: 'overall', limit: 10, filters: { holidaysRange: [125, null], overtimeRange: [null, 25] } },
    { id: 'FC002', name: '年間休日130日以上企業TOP10', criteria: 'holidays', limit: 10, filters: { holidaysRange: [130, null] } },
    { id: 'FC003', name: '残業月20時間以内企業TOP10', criteria: 'salary', limit: 10, filters: { overtimeRange: [null, 20] } },
    { id: 'FC004', name: '有給取得率80%以上企業TOP10', criteria: 'vacationRate', limit: 10, filters: { vacationRateRange: [80, null] } },
    { id: 'FC005', name: '男性育休取得率50%以上企業TOP10', criteria: 'maleParentalLeave', limit: 10, filters: {} },
    
    // 業界別ワークライフバランス  
    { id: 'FC006', name: 'IT業界×残業少ない企業TOP10', criteria: 'salary', limit: 10, filters: { industries: ['IT業界'], overtimeRange: [null, 25] } },
    { id: 'FC007', name: '金融業界×年間休日多い企業TOP10', criteria: 'holidays', limit: 10, filters: { industries: ['金融業界'], holidaysRange: [120, null] } },
    { id: 'FC008', name: '外資系×ワークライフバランスTOP10', criteria: 'overall', limit: 10, filters: { industries: ['外資系IT・EC業界'], holidaysRange: [120, null] } },
    { id: 'FC009', name: 'コンサル業界×働きやすさTOP5', criteria: 'overall', limit: 5, filters: { industries: ['コンサルティング業界'] } },
    { id: 'FC010', name: '商社業界×有給取得しやすいTOP5', criteria: 'vacationRate', limit: 5, filters: { industries: ['商社業界'] } },
    
    // 安定性重視
    { id: 'FC011', name: '平均勤続年数15年以上企業TOP10', criteria: 'tenure', limit: 10, filters: { tenureRange: [15, null] } },
    { id: 'FC012', name: '平均勤続年数20年以上企業TOP10', criteria: 'tenure', limit: 10, filters: { tenureRange: [20, null] } },
    { id: 'FC013', name: '大企業×平均勤続年数長いTOP10', criteria: 'tenure', limit: 10, filters: { employeesRange: [5000, null], tenureRange: [15, null] } },
    
    // 年収×ワークライフバランス
    { id: 'FC014', name: '年収800万以上×残業少ないTOP10', criteria: 'salary', limit: 10, filters: { salaryRange: [8000000, null], overtimeRange: [null, 30] } },
    { id: 'FC015', name: '年収600万以上×年間休日125日以上TOP15', criteria: 'salary', limit: 15, filters: { salaryRange: [6000000, null], holidaysRange: [125, null] } },
    { id: 'FC016', name: '年収1000万以上×ワークライフバランスTOP10', criteria: 'overall', limit: 10, filters: { salaryRange: [10000000, null], holidaysRange: [120, null] } },
    
    // 業界×条件複合
    { id: 'FC017', name: 'IT業界×年収700万以上×残業少ないTOP10', criteria: 'salary', limit: 10, filters: { industries: ['IT業界'], salaryRange: [7000000, null], overtimeRange: [null, 25] } },
    { id: 'FC018', name: '金融業界×年収800万以上×休日多いTOP10', criteria: 'salary', limit: 10, filters: { industries: ['金融業界'], salaryRange: [8000000, null], holidaysRange: [120, null] } },
    { id: 'FC019', name: '外資系×年収1000万以上×働きやすいTOP5', criteria: 'overall', limit: 5, filters: { industries: ['外資系IT・EC業界'], salaryRange: [10000000, null] } },
    
    // 企業規模×働きやすさ
    { id: 'FC020', name: '大企業×働きやすさTOP15', criteria: 'overall', limit: 15, filters: { employeesRange: [5000, null], holidaysRange: [120, null] } },
    { id: 'FC021', name: '中堅企業×ワークライフバランスTOP10', criteria: 'overall', limit: 10, filters: { employeesRange: [1000, 4999], overtimeRange: [null, 30] } },
    
    // 設立年×働きやすさ
    { id: 'FC022', name: '成長企業×働きやすさTOP10', criteria: 'overall', limit: 10, filters: { establishedRange: [2000, null], overtimeRange: [null, 30] } },
    { id: 'FC023', name: '老舗企業×安定性重視TOP10', criteria: 'tenure', limit: 10, filters: { establishedRange: [null, 1980], tenureRange: [15, null] } },
    
    // 特定条件
    { id: 'FC024', name: '東証プライム×女性働きやすいTOP15', criteria: 'overall', limit: 15, filters: { listingStatus: '東証プライム', overtimeRange: [null, 25] } },
    { id: 'FC025', name: '年収×休日×残業バランス最優秀TOP10', criteria: 'overall', limit: 10, filters: { salaryRange: [6000000, null], holidaysRange: [125, null], overtimeRange: [null, 25] } },
    
    // 業界横断比較
    { id: 'FC026', name: 'IT・金融・商社働きやすさTOP15', criteria: 'overall', limit: 15, filters: { industries: ['IT業界', '金融業界', '商社業界'] } },
    { id: 'FC027', name: '全業界×年収700万以上×働きやすいTOP20', criteria: 'overall', limit: 20, filters: { salaryRange: [7000000, null], overtimeRange: [null, 30] } },
    { id: 'FC028', name: 'メーカー系×女性働きやすいTOP10', criteria: 'overall', limit: 10, filters: { industries: ['自動車業界', '総合電機業界', '化学業界'] } },
    { id: 'FC029', name: 'サービス業×ワークライフバランスTOP10', criteria: 'overall', limit: 10, filters: { industries: ['小売・サービス業界', 'メディア・広告業界'] } },
    { id: 'FC030', name: '全業界×有給取得率90%以上企業TOP15', criteria: 'vacationRate', limit: 15, filters: { vacationRateRange: [90, null] } }
  ],

  // 男性社会人（転職志向）向け（30パターン）
  maleProfessional: [
    // 高年収重視
    { id: 'MP001', name: '年収ランキングTOP10', criteria: 'salary', limit: 10, filters: {} },
    { id: 'MP002', name: '年収ランキングTOP20', criteria: 'salary', limit: 20, filters: {} },
    { id: 'MP003', name: '年収1500万円以上企業TOP10', criteria: 'salary', limit: 10, filters: { salaryRange: [15000000, null] } },
    { id: 'MP004', name: '年収1000万円以上企業TOP20', criteria: 'salary', limit: 20, filters: { salaryRange: [10000000, null] } },
    { id: 'MP005', name: '年収2000万円以上企業TOP5', criteria: 'salary', limit: 5, filters: { salaryRange: [20000000, null] } },
    
    // 業界別年収
    { id: 'MP006', name: 'IT業界年収TOP10', criteria: 'salary', limit: 10, filters: { industries: ['IT業界'] } },
    { id: 'MP007', name: '商社業界年収TOP5', criteria: 'salary', limit: 5, filters: { industries: ['商社業界'] } },
    { id: 'MP008', name: '金融業界年収TOP10', criteria: 'salary', limit: 10, filters: { industries: ['金融業界'] } },
    { id: 'MP009', name: 'コンサル業界年収TOP5', criteria: 'salary', limit: 5, filters: { industries: ['コンサルティング業界'] } },
    { id: 'MP010', name: '外資系IT年収TOP10', criteria: 'salary', limit: 10, filters: { industries: ['外資系IT・EC業界'] } },
    
    // 年収×安定性
    { id: 'MP011', name: '年収1000万以上×平均勤続15年以上TOP10', criteria: 'salary', limit: 10, filters: { salaryRange: [10000000, null], tenureRange: [15, null] } },
    { id: 'MP012', name: '年収800万以上×大企業TOP15', criteria: 'salary', limit: 15, filters: { salaryRange: [8000000, null], employeesRange: [5000, null] } },
    { id: 'MP013', name: '年収1500万以上×東証プライムTOP10', criteria: 'salary', limit: 10, filters: { salaryRange: [15000000, null], listingStatus: '東証プライム' } },
    
    // 年収×業界複合
    { id: 'MP014', name: 'IT・外資系IT年収TOP15', criteria: 'salary', limit: 15, filters: { industries: ['IT業界', '外資系IT・EC業界'] } },
    { id: 'MP015', name: '金融・商社年収TOP10', criteria: 'salary', limit: 10, filters: { industries: ['金融業界', '商社業界'] } },
    { id: 'MP016', name: 'コンサル・外資系年収TOP10', criteria: 'salary', limit: 10, filters: { industries: ['コンサルティング業界', '外資系IT・EC業界'] } },
    
    // 企業規模別年収
    { id: 'MP017', name: '大企業(1万人以上)年収TOP10', criteria: 'salary', limit: 10, filters: { employeesRange: [10000, null] } },
    { id: 'MP018', name: '中堅企業(1000-1万人)年収TOP15', criteria: 'salary', limit: 15, filters: { employeesRange: [1000, 9999] } },
    { id: 'MP019', name: '成長企業(設立20年以内)年収TOP10', criteria: 'salary', limit: 10, filters: { establishedRange: [2004, null] } },
    
    // 総合評価重視
    { id: 'MP020', name: '年収×安定性×成長性総合TOP10', criteria: 'overall', limit: 10, filters: { salaryRange: [8000000, null] } },
    { id: 'MP021', name: '転職価値総合ランキングTOP15', criteria: 'overall', limit: 15, filters: { salaryRange: [7000000, null], employeesRange: [1000, null] } },
    { id: 'MP022', name: '30代で年収1000万到達可能企業TOP10', criteria: 'salary', limit: 10, filters: { salaryRange: [10000000, null], establishedRange: [null, 2010] } },
    
    // 年収×条件複合
    { id: 'MP023', name: '年収1200万以上×残業40時間以内TOP10', criteria: 'salary', limit: 10, filters: { salaryRange: [12000000, null], overtimeRange: [null, 40] } },
    { id: 'MP024', name: '年収1000万以上×年間休日120日以上TOP15', criteria: 'salary', limit: 15, filters: { salaryRange: [10000000, null], holidaysRange: [120, null] } },
    { id: 'MP025', name: '高年収×働きやすさバランスTOP10', criteria: 'overall', limit: 10, filters: { salaryRange: [10000000, null], overtimeRange: [null, 35] } },
    
    // 特定業界×高条件
    { id: 'MP026', name: 'IT業界×年収1000万以上×成長性TOP10', criteria: 'salary', limit: 10, filters: { industries: ['IT業界'], salaryRange: [10000000, null], establishedRange: [2000, null] } },
    { id: 'MP027', name: '金融業界×年収1200万以上×安定性TOP10', criteria: 'salary', limit: 10, filters: { industries: ['金融業界'], salaryRange: [12000000, null], tenureRange: [15, null] } },
    { id: 'MP028', name: '商社業界×年収1500万以上TOP5', criteria: 'salary', limit: 5, filters: { industries: ['商社業界'], salaryRange: [15000000, null] } },
    
    // 転職市場価値
    { id: 'MP029', name: '全業界×年収1000万超×転職価値TOP20', criteria: 'overall', limit: 20, filters: { salaryRange: [10000000, null], employeesRange: [1000, null] } },
    { id: 'MP030', name: '全業界×年収・規模・安定性最優秀TOP15', criteria: 'overall', limit: 15, filters: { salaryRange: [8000000, null], employeesRange: [3000, null], tenureRange: [12, null] } }
  ]
};

module.exports = TARGET_NEEDS_PATTERNS;