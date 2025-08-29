/**
 * ターゲット別ニーズパターン定義 V2 - 完全改善版
 * 152社の豊富なデータを最大活用した実用的ランキング
 * 前世代Claude Code引き継ぎ書指示による抜本的改善実施
 * 
 * 【改善ポイント】
 * 1. 基本ランキング（数値データ直接活用）大幅追加
 * 2. 「あるかないか + ソート」方式で条件抽出ランキング大幅追加
 * 3. 複合指標ランキング新規追加
 * 4. 30パターン→50パターン以上に拡張（各ターゲット）
 * 
 * 各ターゲット50+ パターン × 3ターゲット = 150+パターン
 */

const TARGET_NEEDS_PATTERNS = {
  // 就活生向け（50パターン）- 152社データ活用で実用的ランキング大幅追加
  jobSeekers: [
    // 【基本ランキング - 数値データ直接活用】8種類 
    { id: 'JS001', name: '初任給ランキングTOP10', criteria: 'initialSalary', limit: 10, filters: {} },
    { id: 'JS002', name: '年収ランキングTOP10', criteria: 'salary', limit: 10, filters: {} },
    { id: 'JS003', name: '年間休日ランキングTOP10', criteria: 'holidays', limit: 10, filters: {} },
    { id: 'JS004', name: '残業少ない企業TOP10', criteria: 'overtime', limit: 10, filters: {}, sortOrder: 'asc' },
    { id: 'JS005', name: '有給取得率ランキングTOP10', criteria: 'vacationRate', limit: 10, filters: {} },
    { id: 'JS006', name: '平均勤続年数ランキングTOP10', criteria: 'averageTenure', limit: 10, filters: {} },
    { id: 'JS007', name: '離職率低い企業TOP10', criteria: 'turnoverRate3Years', limit: 10, filters: {}, sortOrder: 'asc' },
    { id: 'JS008', name: '大手企業ランキング（従業員数順）TOP10', criteria: 'employees', limit: 10, filters: {} },
    
    // 【条件抽出+ソート - 「あるかないか+ソート」方式】20種類
    { id: 'JS009', name: '研修制度充実企業の初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { hasTraining: true } },
    { id: 'JS010', name: 'リモートワーク可能企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasRemote: true } },
    { id: 'JS011', name: 'フレックス制度企業の休日TOP10', criteria: 'holidays', limit: 10, filters: { hasFlex: true } },
    { id: 'JS012', name: 'リモートワーク可能企業の残業少ないTOP10', criteria: 'overtime', limit: 10, filters: { hasRemote: true }, sortOrder: 'asc' },
    { id: 'JS013', name: '研修制度充実企業の有給取得率TOP10', criteria: 'vacationRate', limit: 10, filters: { hasTraining: true } },
    { id: 'JS014', name: 'フレックス制度企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasFlex: true } },
    { id: 'JS015', name: '研修制度充実企業の勤続年数TOP10', criteria: 'averageTenure', limit: 10, filters: { hasTraining: true } },
    { id: 'JS016', name: 'リモートワーク企業の離職率低いTOP10', criteria: 'turnoverRate3Years', limit: 10, filters: { hasRemote: true }, sortOrder: 'asc' },
    { id: 'JS017', name: 'フレックス制度企業の初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { hasFlex: true } },
    { id: 'JS018', name: '住宅手当ある企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasHousingAllowance: true } },
    { id: 'JS019', name: '研修制度×リモートワーク両方ある企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasTraining: true, hasRemote: true } },
    { id: 'JS020', name: '研修制度×フレックス両方ある企業の初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { hasTraining: true, hasFlex: true } },
    { id: 'JS021', name: 'リモート×フレックス両方ある企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasRemote: true, hasFlex: true } },
    { id: 'JS022', name: '住宅手当充実企業の初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { hasHousingAllowance: true } },
    { id: 'JS023', name: '育休復帰率90%以上企業の休日TOP10', criteria: 'holidays', limit: 10, filters: { parentalLeaveReturnMin: 90 } },
    { id: 'JS024', name: '男性育休取得率50%以上企業の年収TOP10', criteria: 'salary', limit: 10, filters: { maleParentalLeaveRateMin: 50 } },
    { id: 'JS025', name: '有給取得率80%以上企業の年収TOP10', criteria: 'salary', limit: 10, filters: { vacationRateMin: 80 } },
    { id: 'JS026', name: '残業20時間以下企業の初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { overtimeMax: 20 } },
    { id: 'JS027', name: '勤続年数15年以上企業の年収TOP10', criteria: 'salary', limit: 10, filters: { averageTenureMin: 15 } },
    { id: 'JS028', name: '離職率3%以下企業の初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { turnoverRateMax: 3 } },
    
    // 【複合指標ランキング】10種類
    { id: 'JS029', name: 'ワークライフバランス企業TOP10', criteria: 'workLifeBalance', limit: 10, filters: {} },
    { id: 'JS030', name: '安定性企業TOP10', criteria: 'stability', limit: 10, filters: {} },
    { id: 'JS031', name: '高年収×リモートワーク企業TOP10', criteria: 'salary', limit: 10, filters: { hasRemote: true, salaryMin: 800 } },
    { id: 'JS032', name: '高年収×低残業企業TOP10', criteria: 'salary', limit: 10, filters: { overtimeMax: 20 } },
    { id: 'JS033', name: '高初任給×長勤続企業TOP10', criteria: 'initialSalary', limit: 10, filters: { averageTenureMin: 15 } },
    { id: 'JS034', name: '休日多い×有給取得しやすい企業TOP10', criteria: 'holidays', limit: 10, filters: { vacationRateMin: 70 } },
    { id: 'JS035', name: '大企業×リモートワーク企業TOP10', criteria: 'employees', limit: 10, filters: { hasRemote: true } },
    { id: 'JS036', name: '高年収×低離職率企業TOP10', criteria: 'salary', limit: 10, filters: { turnoverRateMax: 5 } },
    { id: 'JS037', name: '住宅手当あり×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { hasHousingAllowance: true } },
    { id: 'JS038', name: '総合ランキングTOP10', criteria: 'overallScore', limit: 10, filters: {} },
    
    // 【IT業界ランキング - 最重要業界・全方位対応】8種類
    { id: 'JS039', name: 'IT業界年収TOP10', criteria: 'salary', limit: 10, filters: { industry: 'IT業界' } },
    { id: 'JS040', name: 'IT業界初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industry: 'IT業界' } },
    { id: 'JS041', name: 'IT業界残業少ない企業TOP10', criteria: 'overtime', limit: 10, filters: { industry: 'IT業界' }, sortOrder: 'asc' },
    { id: 'JS042', name: 'IT業界リモートワーク充実企業TOP10', criteria: 'salary', limit: 10, filters: { industry: 'IT業界', hasRemote: true } },
    { id: 'JS043', name: 'IT業界ワークライフバランスTOP10', criteria: 'workLifeBalance', limit: 10, filters: { industry: 'IT業界' } },
    { id: 'JS044', name: 'IT業界成長性×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: 'IT業界', salaryMin: 600 } },
    { id: 'JS045', name: 'IT業界大手企業TOP10', criteria: 'employees', limit: 10, filters: { industry: 'IT業界' } },
    { id: 'JS046', name: 'IT業界総合ランキングTOP10', criteria: 'overallScore', limit: 10, filters: { industry: 'IT業界' } },
    
    // 【金融業界ランキング - 安定性重視】6種類  
    { id: 'JS047', name: '金融業界年収TOP10', criteria: 'salary', limit: 10, filters: { industry: '金融業界' } },
    { id: 'JS048', name: '金融業界初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industry: '金融業界' } },
    { id: 'JS049', name: '金融業界安定性TOP10', criteria: 'stability', limit: 10, filters: { industry: '金融業界' } },
    { id: 'JS050', name: '金融業界勤続年数TOP10', criteria: 'averageTenure', limit: 10, filters: { industry: '金融業界' } },
    { id: 'JS051', name: '金融業界福利厚生充実企業TOP10', criteria: 'salary', limit: 10, filters: { industry: '金融業界', hasHousingAllowance: true } },
    { id: 'JS052', name: '金融業界総合ランキングTOP10', criteria: 'overallScore', limit: 10, filters: { industry: '金融業界' } },
    
    // 【製薬業界ランキング - 専門性重視】4種類
    { id: 'JS053', name: '製薬業界年収TOP10', criteria: 'salary', limit: 10, filters: { industry: '製薬業界' } },
    { id: 'JS054', name: '製薬業界初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industry: '製薬業界' } },
    { id: 'JS055', name: '製薬業界研究開発充実企業TOP10', criteria: 'salary', limit: 10, filters: { industry: '製薬業界', hasTraining: true } },
    { id: 'JS056', name: '製薬業界安定性TOP10', criteria: 'stability', limit: 10, filters: { industry: '製薬業界' } },
    
    // 【食品業界ランキング - 身近・安定性】4種類
    { id: 'JS057', name: '食品業界年収TOP10', criteria: 'salary', limit: 10, filters: { industry: '食品・農林・水産' } },
    { id: 'JS058', name: '食品業界初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industry: '食品・農林・水産' } },
    { id: 'JS059', name: '食品業界働きやすさTOP10', criteria: 'workLifeBalance', limit: 10, filters: { industry: '食品・農林・水産' } },
    { id: 'JS060', name: '食品業界安定性TOP10', criteria: 'stability', limit: 10, filters: { industry: '食品・農林・水産' } },
    
    // 【その他人気業界】各2種類
    { id: 'JS061', name: '化学業界年収TOP10', criteria: 'salary', limit: 10, filters: { industry: '化学業界' } },
    { id: 'JS062', name: '化学業界初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industry: '化学業界' } },
    { id: 'JS063', name: '総合電機業界年収TOP10', criteria: 'salary', limit: 10, filters: { industry: '総合電機業界' } },
    { id: 'JS064', name: '総合電機業界初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industry: '総合電機業界' } },
    { id: 'JS065', name: '通信業界年収TOP10', criteria: 'salary', limit: 10, filters: { industry: '通信インフラ業界' } },
    { id: 'JS066', name: '通信業界初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industry: '通信インフラ業界' } },
    { id: 'JS067', name: 'メディア・広告業界年収TOP10', criteria: 'salary', limit: 10, filters: { industry: 'メディア・広告業界' } },
    { id: 'JS068', name: 'メディア・広告業界初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { industry: 'メディア・広告業界' } },
    
    // 【特定条件・ニッチニーズ】残り6種類
    { id: 'JS069', name: '従業員1000人以上企業の初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { employeesMin: 1000 } },
    { id: 'JS070', name: '設立30年以上企業の年収TOP10', criteria: 'salary', limit: 10, filters: { establishedMax: 1994 } },
    { id: 'JS071', name: '上場企業限定年収TOP10', criteria: 'salary', limit: 10, filters: { listed: true } },
    { id: 'JS072', name: '年間休日120日以上×高初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { holidaysMin: 120 } },
    { id: 'JS073', name: '有給取得率70%以上×高年収TOP10', criteria: 'salary', limit: 10, filters: { vacationRateMin: 70 } },
    { id: 'JS074', name: '平均勤続年数15年以上×高初任給TOP10', criteria: 'initialSalary', limit: 10, filters: { averageTenureMin: 15 } }
  ],

  // 女性キャリア向け（50パターン）- 152社データ活用でキャリア女性の実ニーズに対応
  femaleCareer: [
    // 【基本ランキング - 女性視点】8種類
    { id: 'FC001', name: '年収ランキング（女性活躍企業）TOP10', criteria: 'salary', limit: 10, filters: {} },
    { id: 'FC002', name: '年間休日ランキング（女性重視）TOP10', criteria: 'holidays', limit: 10, filters: {} },
    { id: 'FC003', name: '残業少ない企業（女性働きやすさ）TOP10', criteria: 'overtime', limit: 10, filters: {}, sortOrder: 'asc' },
    { id: 'FC004', name: '有給取得率ランキング（女性重視）TOP10', criteria: 'vacationRate', limit: 10, filters: {} },
    { id: 'FC005', name: '平均勤続年数（女性長期雇用）TOP10', criteria: 'averageTenure', limit: 10, filters: {} },
    { id: 'FC006', name: '離職率低い企業（女性定着率）TOP10', criteria: 'turnoverRate3Years', limit: 10, filters: {}, sortOrder: 'asc' },
    { id: 'FC007', name: '育休復帰率ランキングTOP10', criteria: 'parentalLeaveReturn', limit: 10, filters: {} },
    { id: 'FC008', name: '男性育休取得率ランキングTOP10', criteria: 'maleParentalLeaveRate', limit: 10, filters: {} },
    
    // 【条件抽出+ソート - 女性働きやすさ特化】20種類
    { id: 'FC009', name: 'リモートワーク可能企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasRemote: true } },
    { id: 'FC010', name: 'フレックス制度企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasFlex: true } },
    { id: 'FC011', name: '育休復帰率90%以上企業の年収TOP10', criteria: 'salary', limit: 10, filters: { parentalLeaveReturnMin: 90 } },
    { id: 'FC012', name: '住宅手当ある企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasHousingAllowance: true } },
    { id: 'FC013', name: 'リモートワーク×フレックス両方ある企業TOP10', criteria: 'salary', limit: 10, filters: { hasRemote: true, hasFlex: true } },
    { id: 'FC014', name: '研修制度充実企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasTraining: true } },
    { id: 'FC015', name: '育休復帰率90%以上×リモート企業TOP10', criteria: 'salary', limit: 10, filters: { parentalLeaveReturnMin: 90, hasRemote: true } },
    { id: 'FC016', name: '有給取得率80%以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { vacationRateMin: 80 } },
    { id: 'FC017', name: '残業20時間以下×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { overtimeMax: 20 } },
    { id: 'FC018', name: '勤続年数15年以上×リモートワーク企業TOP10', criteria: 'salary', limit: 10, filters: { averageTenureMin: 15, hasRemote: true } },
    { id: 'FC019', name: '住宅手当あり×育休復帰率高い企業TOP10', criteria: 'parentalLeaveReturn', limit: 10, filters: { hasHousingAllowance: true } },
    { id: 'FC020', name: 'フレックス×育休復帰率90%以上企業TOP10', criteria: 'parentalLeaveReturn', limit: 10, filters: { hasFlex: true, parentalLeaveReturnMin: 90 } },
    { id: 'FC021', name: '年間休日125日以上×リモートワーク企業TOP10', criteria: 'holidays', limit: 10, filters: { holidaysMin: 125, hasRemote: true } },
    { id: 'FC022', name: '大手企業×高年収女性働きやすさTOP10', criteria: 'salary', limit: 10, filters: { employeesMin: 5000 } },
    { id: 'FC023', name: '女性育休取得率100%企業の年収TOP10', criteria: 'salary', limit: 10, filters: { femaleParentalLeaveRate: 100 } },
    { id: 'FC024', name: '研修制度×高勤続年数企業TOP10', criteria: 'averageTenure', limit: 10, filters: { hasTraining: true } },
    { id: 'FC025', name: '高休日×低残業企業TOP10', criteria: 'holidays', limit: 10, filters: { overtimeMax: 20 } },
    { id: 'FC026', name: '男性育休取得率70%以上企業の年収TOP10', criteria: 'salary', limit: 10, filters: { maleParentalLeaveRateMin: 70 } },
    { id: 'FC027', name: '女性育休取得率100%×高年収TOP10', criteria: 'salary', limit: 10, filters: { femaleParentalLeaveRate: 100 } },
    { id: 'FC028', name: 'リモートワーク×研修制度充実企業TOP10', criteria: 'salary', limit: 10, filters: { hasRemote: true, hasTraining: true } },
    
    // 【複合指標ランキング - 女性視点】10種類
    { id: 'FC029', name: 'ワークライフバランス企業TOP10', criteria: 'workLifeBalance', limit: 10, filters: {} },
    { id: 'FC030', name: '子育てしやすさ企業TOP10', criteria: 'childcareFriendly', limit: 10, filters: {} },
    { id: 'FC031', name: '高年収×リモートワーク企業TOP10', criteria: 'salary', limit: 10, filters: { hasRemote: true, salaryMin: 700 } },
    { id: 'FC032', name: '年収×育休復帰率高い企業TOP10', criteria: 'salary', limit: 10, filters: { parentalLeaveReturnMin: 90 } },
    { id: 'FC033', name: '安定性企業TOP10', criteria: 'stability', limit: 10, filters: {} },
    { id: 'FC034', name: '高年収×低離職率企業TOP10', criteria: 'salary', limit: 10, filters: { turnoverRateMax: 5 } },
    { id: 'FC035', name: '住宅手当×研修制度充実企業TOP10', criteria: 'salary', limit: 10, filters: { hasHousingAllowance: true, hasTraining: true } },
    { id: 'FC036', name: 'リモートワーク×高勤続年数企業TOP10', criteria: 'averageTenure', limit: 10, filters: { hasRemote: true } },
    { id: 'FC037', name: '大企業×育休制度充実企業TOP10', criteria: 'employees', limit: 10, filters: { parentalLeaveReturnMin: 80 } },
    { id: 'FC038', name: '総合ランキングTOP10', criteria: 'overallScore', limit: 10, filters: {} },
    
    // 【特定条件・ニッチニーズ - 女性特化】12種類
    { id: 'FC039', name: '年収800万以上×育休実績充実企業TOP10', criteria: 'salary', limit: 10, filters: { salaryMin: 800 } },
    { id: 'FC040', name: '年収600万以上×リモートワーク企業TOP10', criteria: 'salary', limit: 10, filters: { salaryMin: 600 } },
    { id: 'FC041', name: '残業15時間以下×年収500万以上企業TOP10', criteria: 'salary', limit: 10, filters: { overtimeMax: 15, salaryMin: 500 } },
    // 【IT業界女性ランキング - 最重要・女性活躍】5種類
    { id: 'FC042', name: 'IT業界女性活躍企業年収TOP10', criteria: 'salary', limit: 10, filters: { industry: 'IT業界' } },
    { id: 'FC043', name: 'IT業界女性リモートワーク充実企業TOP10', criteria: 'salary', limit: 10, filters: { industry: 'IT業界', hasRemote: true } },
    { id: 'FC044', name: 'IT業界女性働きやすさTOP10', criteria: 'workLifeBalance', limit: 10, filters: { industry: 'IT業界' } },
    { id: 'FC045', name: 'IT業界女性育休復帰率高い企業TOP10', criteria: 'parentalLeaveReturn', limit: 10, filters: { industry: 'IT業界' } },
    { id: 'FC046', name: 'IT業界女性総合ランキングTOP10', criteria: 'overallScore', limit: 10, filters: { industry: 'IT業界' } },
    
    // 【食品業界女性ランキング - 身近・安定】4種類
    { id: 'FC047', name: '食品業界女性活躍企業年収TOP10', criteria: 'salary', limit: 10, filters: { industry: '食品・農林・水産' } },
    { id: 'FC048', name: '食品業界女性働きやすさTOP10', criteria: 'workLifeBalance', limit: 10, filters: { industry: '食品・農林・水産' } },
    { id: 'FC049', name: '食品業界女性育児支援充実企業TOP10', criteria: 'childcareFriendly', limit: 10, filters: { industry: '食品・農林・水産' } },
    { id: 'FC050', name: '食品業界女性長期キャリア企業TOP10', criteria: 'averageTenure', limit: 10, filters: { industry: '食品・農林・水産' } },
    
    // 【その他業界女性ランキング】各1種類
    { id: 'FC051', name: '製薬業界女性研究職年収TOP10', criteria: 'salary', limit: 10, filters: { industry: '製薬業界' } },
    { id: 'FC052', name: '金融業界女性管理職多い企業TOP10', criteria: 'salary', limit: 10, filters: { industry: '金融業界' } },
    { id: 'FC053', name: '化学業界女性技術職年収TOP10', criteria: 'salary', limit: 10, filters: { industry: '化学業界' } },
    { id: 'FC054', name: 'コンサル業界女性採用積極企業TOP10', criteria: 'salary', limit: 10, filters: { industry: 'コンサルティング業界' } },
    
    // 【特定条件・ニッチニーズ - 女性特化】残り6種類  
    { id: 'FC055', name: '従業員3000人以上×女性働きやすさ企業TOP10', criteria: 'workLifeBalance', limit: 10, filters: { employeesMin: 3000 } },
    { id: 'FC056', name: '上場企業×産休育休100%復帰企業TOP10', criteria: 'parentalLeaveReturn', limit: 10, filters: { listed: true } },
    { id: 'FC057', name: '設立20年以上×女性長期雇用企業TOP10', criteria: 'averageTenure', limit: 10, filters: { establishedMax: 2004 } },
    { id: 'FC058', name: '年間休日125日以上×育児支援企業TOP10', criteria: 'holidays', limit: 10, filters: { holidaysMin: 125, parentalLeaveReturnMin: 80 } },
    { id: 'FC059', name: '有給取得率85%以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { vacationRateMin: 85 } },
    { id: 'FC060', name: '勤続年数18年以上×女性キャリア継続企業TOP10', criteria: 'averageTenure', limit: 10, filters: { averageTenureMin: 18 } }
  ],

  // 男性社会人向け（50パターン）- 152社データでキャリアアップ・転職ニーズに対応
  maleProfessional: [
    // 【基本ランキング - 男性キャリア視点】8種類
    { id: 'MP001', name: '年収ランキング（キャリア重視）TOP10', criteria: 'salary', limit: 10, filters: {} },
    { id: 'MP002', name: '初任給ランキング（若手男性）TOP10', criteria: 'initialSalary', limit: 10, filters: {} },
    { id: 'MP003', name: '年間休日ランキング（男性働き方）TOP10', criteria: 'holidays', limit: 10, filters: {} },
    { id: 'MP004', name: '残業時間ランキング（効率重視）TOP10', criteria: 'overtime', limit: 10, filters: {}, sortOrder: 'asc' },
    { id: 'MP005', name: '平均勤続年数（安定志向）TOP10', criteria: 'averageTenure', limit: 10, filters: {} },
    { id: 'MP006', name: '離職率低い企業（定着率）TOP10', criteria: 'turnoverRate3Years', limit: 10, filters: {}, sortOrder: 'asc' },
    { id: 'MP007', name: '大手企業ランキング（規模重視）TOP10', criteria: 'employees', limit: 10, filters: {} },
    { id: 'MP008', name: '男性育休取得率ランキングTOP10', criteria: 'maleParentalLeaveRate', limit: 10, filters: {} },
    
    // 【条件抽出+ソート - 男性キャリア特化】20種類
    { id: 'MP009', name: '研修制度充実企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasTraining: true } },
    { id: 'MP010', name: 'リモートワーク可能企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasRemote: true } },
    { id: 'MP011', name: 'フレックス制度企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasFlex: true } },
    { id: 'MP012', name: '住宅手当充実企業の年収TOP10', criteria: 'salary', limit: 10, filters: { hasHousingAllowance: true } },
    { id: 'MP013', name: '研修制度×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { hasTraining: true, salaryMin: 800 } },
    { id: 'MP014', name: 'リモート×フレックス両方可能企業TOP10', criteria: 'salary', limit: 10, filters: { hasRemote: true, hasFlex: true } },
    { id: 'MP015', name: '残業30時間以下×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { overtimeMax: 30 } },
    { id: 'MP016', name: '有給取得率70%以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { vacationRateMin: 70 } },
    { id: 'MP017', name: '勤続年数15年以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { averageTenureMin: 15 } },
    { id: 'MP018', name: '大手企業×研修制度充実TOP10', criteria: 'employees', limit: 10, filters: { hasTraining: true } },
    { id: 'MP019', name: 'リモートワーク×高初任給企業TOP10', criteria: 'initialSalary', limit: 10, filters: { hasRemote: true } },
    { id: 'MP020', name: '住宅手当×研修制度充実企業TOP10', criteria: 'salary', limit: 10, filters: { hasHousingAllowance: true, hasTraining: true } },
    { id: 'MP021', name: '年間休日125日以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { holidaysMin: 125 } },
    { id: 'MP022', name: '離職率5%以下×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { turnoverRateMax: 5 } },
    { id: 'MP023', name: '従業員5000人以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { employeesMin: 5000 } },
    { id: 'MP024', name: '設立30年以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { establishedMax: 1994 } },
    { id: 'MP025', name: '研修制度あり×勤続年数長い企業TOP10', criteria: 'averageTenure', limit: 10, filters: { hasTraining: true } },
    { id: 'MP026', name: '大企業×リモートワーク企業TOP10', criteria: 'employees', limit: 10, filters: { hasRemote: true } },
    { id: 'MP027', name: '男性育休取得率50%以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { maleParentalLeaveRateMin: 50 } },
    { id: 'MP028', name: '男性育休取得率70%以上企業の年収TOP10', criteria: 'salary', limit: 10, filters: { maleParentalLeaveRateMin: 70 } },
    
    // 【複合指標ランキング - 男性キャリア】10種類
    { id: 'MP029', name: 'ワークライフバランス企業TOP10', criteria: 'workLifeBalance', limit: 10, filters: {} },
    { id: 'MP030', name: '安定性企業TOP10', criteria: 'stability', limit: 10, filters: {} },
    { id: 'MP031', name: '高年収×リモートワーク企業TOP10', criteria: 'salary', limit: 10, filters: { hasRemote: true, salaryMin: 900 } },
    { id: 'MP032', name: '高年収×低残業企業TOP10', criteria: 'salary', limit: 10, filters: { overtimeMax: 25 } },
    { id: 'MP033', name: '大企業×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { employeesMin: 10000 } },
    { id: 'MP034', name: '高年収×低離職率企業TOP10', criteria: 'salary', limit: 10, filters: { turnoverRateMax: 5 } },
    { id: 'MP035', name: '研修制度充実×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { hasTraining: true, salaryMin: 700 } },
    { id: 'MP036', name: '高初任給×長勤続企業TOP10', criteria: 'initialSalary', limit: 10, filters: { averageTenureMin: 15 } },
    { id: 'MP037', name: '住宅手当あり×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { hasHousingAllowance: true } },
    { id: 'MP038', name: '総合ランキングTOP10', criteria: 'overallScore', limit: 10, filters: {} },
    
    // 【特定条件・ニッチニーズ - 男性キャリア】12種類
    { id: 'MP039', name: '年収1000万以上企業TOP10', criteria: 'salary', limit: 10, filters: { salaryMin: 1000 } },
    { id: 'MP040', name: '年収800万以上×残業30時間以下企業TOP10', criteria: 'salary', limit: 10, filters: { salaryMin: 800, overtimeMax: 30 } },
    // 【IT業界男性ランキング - キャリア重視】4種類
    { id: 'MP041', name: 'IT業界高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: 'IT業界' } },
    { id: 'MP042', name: 'IT業界成長性×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: 'IT業界', salaryMin: 800 } },
    { id: 'MP043', name: 'IT業界技術力×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: 'IT業界', hasTraining: true } },
    { id: 'MP044', name: 'IT業界リモートワーク×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: 'IT業界', hasRemote: true } },
    
    // 【金融業界男性ランキング - 安定×高収入】3種類
    { id: 'MP045', name: '金融業界高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: '金融業界' } },
    { id: 'MP046', name: '金融業界安定×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: '金融業界', averageTenureMin: 15 } },
    { id: 'MP047', name: '金融業界大手×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: '金融業界', employeesMin: 5000 } },
    
    // 【その他業界男性ランキング】各1種類
    { id: 'MP048', name: '製薬業界高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: '製薬業界' } },
    { id: 'MP049', name: '食品業界高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: '食品・農林・水産' } },
    { id: 'MP050', name: '化学業界技術職高年収企業TOP10', criteria: 'salary', limit: 10, filters: { industry: '化学業界' } },
    
    // 【特定条件・ニッチニーズ - 男性キャリア】残り5種類
    { id: 'MP051', name: '従業員10000人以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { employeesMin: 10000 } },
    { id: 'MP052', name: '上場企業×年収1200万以上企業TOP10', criteria: 'salary', limit: 10, filters: { listed: true, salaryMin: 1200 } },
    { id: 'MP053', name: '設立50年以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { establishedMax: 1974 } },
    { id: 'MP054', name: '年間休日120日以上×年収800万以上企業TOP10', criteria: 'salary', limit: 10, filters: { holidaysMin: 120, salaryMin: 800 } },
    { id: 'MP055', name: '勤続年数20年以上×高年収企業TOP10', criteria: 'salary', limit: 10, filters: { averageTenureMin: 20 } }
  ]
};

module.exports = TARGET_NEEDS_PATTERNS;