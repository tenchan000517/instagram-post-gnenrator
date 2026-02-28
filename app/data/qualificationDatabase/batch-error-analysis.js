const fs = require('fs');

/**
 * バッチ1のエラー詳細分析スクリプト
 * 29個のバリデーションエラーを分類・分析し、修正計画を策定
 */

console.log('🔍 バッチ1エラー詳細分析開始\n');

// バッチファイル読み込み
const batch1 = JSON.parse(fs.readFileSync('./research-batches/batch-01-Q001-Q015.json', 'utf8'));
const batch2 = JSON.parse(fs.readFileSync('./research-batches/batch-02-Q016-Q030.json', 'utf8'));
const batch3 = JSON.parse(fs.readFileSync('./research-batches/batch-03-Q031-Q045.json', 'utf8'));

console.log('📊 バッチファイル読み込み完了');
console.log(`- バッチ1: ${batch1.qualifications.length}資格`);
console.log(`- バッチ2: ${batch2.qualifications.length}資格`);
console.log(`- バッチ3: ${batch3.qualifications.length}資格\n`);

// 1. エラー分類と優先度分析
console.log('🚨 【1. エラーの分類と優先度】');
console.log('===================================');

const errorCategories = {
  examFeeNull: [],
  passingRateNull: [],
  totalScoreInconsistent: [],
  validityPeriodNull: []
};

const errorAnalysis = [];

batch1.qualifications.forEach((q, index) => {
  const errors = {
    id: q.id,
    examFeeNull: q.acquisitionInfo.examFee === null,
    passingRateNull: q.acquisitionInfo.passingRate === null || q.acquisitionInfo.passingRate === undefined,
    totalScoreInconsistent: false,
    validityPeriodNull: q.acquisitionInfo.validityPeriod === null
  };
  
  // totalScore計算チェック
  if (q.evaluationScores) {
    const calculatedTotal = 
      (q.evaluationScores.difficultyLevel || 0) +
      (q.evaluationScores.specialization || 0) +
      (q.evaluationScores.careerValue || 0) +
      (q.evaluationScores.incomeImpact || 0) +
      (q.evaluationScores.acquisitionEase || 0);
    
    errors.totalScoreInconsistent = q.evaluationScores.totalScore !== calculatedTotal;
    errors.expectedTotal = calculatedTotal;
    errors.actualTotal = q.evaluationScores.totalScore;
  }
  
  errorAnalysis.push(errors);
  
  // カテゴリ別集計
  if (errors.examFeeNull) errorCategories.examFeeNull.push(q.id);
  if (errors.passingRateNull) errorCategories.passingRateNull.push(q.id);
  if (errors.totalScoreInconsistent) errorCategories.totalScoreInconsistent.push(q.id);
  if (errors.validityPeriodNull) errorCategories.validityPeriodNull.push(q.id);
});

console.log(`❌ examFee欠損: ${errorCategories.examFeeNull.length}件`);
console.log(`   ${errorCategories.examFeeNull.join(', ')}`);
console.log(`❌ passingRate欠損: ${errorCategories.passingRateNull.length}件`);
console.log(`   ${errorCategories.passingRateNull.join(', ')}`);
console.log(`❌ totalScore計算不整合: ${errorCategories.totalScoreInconsistent.length}件`);
console.log(`   ${errorCategories.totalScoreInconsistent.join(', ')}`);
console.log(`⚠️  validityPeriod null: ${errorCategories.validityPeriodNull.length}件\n`);

// 2. 評価スコア構造比較
console.log('🔄 【2. 評価スコア構造比較】');
console.log('==============================');

const batch1Sample = batch1.qualifications[0].evaluationScores;
const batch2Sample = batch2.qualifications[0].evaluationScores;

console.log('📋 バッチ1の評価スコア構造:');
console.log('- 形式: 数値直接格納 (difficultyLevel: 5)');
console.log('- breakdown内に詳細情報');
console.log('- totalScoreが手動設定されている');

console.log('\n📋 バッチ2の評価スコア構造:');
console.log('- 形式: オブジェクト格納 (difficultyLevel: { score: 2, description: "..." })');
console.log('- detailFactorsで詳細分析');
console.log('- totalScoreが自動計算可能');

// 3. バッチ1のtotalScore問題分析
console.log('\n🔧 【3. totalScore問題の根本原因】');
console.log('=====================================');

console.log('問題: バリデーターがオブジェクト形式のスコアを期待しているが、');
console.log('     バッチ1は数値直接格納形式を使用している');
console.log('\n解決方法の選択肢:');
console.log('A) バッチ1をバッチ2・3形式に統一（推奨）');
console.log('B) バリデーターを修正してバッチ1形式にも対応');
console.log('C) バッチ1のtotalScoreを手動で再計算');

// 4. 欠損データ分析
console.log('\n📊 【4. 欠損データの詳細分析】');
console.log('===============================');

errorAnalysis.forEach(error => {
  if (error.examFeeNull || error.passingRateNull) {
    const q = batch1.qualifications.find(qual => qual.id === error.id);
    console.log(`\n${error.id}: ${q.basicInfo.name}`);
    if (error.examFeeNull) console.log('  - examFee: null → 要調査・補完');
    if (error.passingRateNull) console.log('  - passingRate: null → 要調査・補完');
    console.log(`  - 資格種別: ${q.basicInfo.qualificationType}`);
    console.log(`  - 実施機関: ${q.basicInfo.organizingBody}`);
  }
});

// 5. 修正計画策定
console.log('\n📝 【5. 修正計画と工数評価】');
console.log('============================');

console.log('🎯 推奨修正方針: オプションA - バッチ2・3形式への統一');
console.log('\n修正作業項目:');
console.log('1. 評価スコア構造の統一変換');
console.log('   - 工数: 2-3時間');
console.log('   - リスク: 低（機械的変換）');
console.log('');
console.log('2. 欠損データの調査・補完');
console.log('   - examFee欠損: 6件 → 公式サイト調査');
console.log('   - passingRate欠損: 1件 → 統計データ確認');
console.log('   - 工数: 3-4時間');
console.log('   - リスク: 中（データ精度に依存）');
console.log('');
console.log('3. バリデーション・品質保証');
console.log('   - 工数: 1時間');
console.log('   - リスク: 低');
console.log('');
console.log('📊 総工数見積: 6-8時間');
console.log('🚨 主要リスク: データ調査時の情報精度');

// 6. 優先度付きタスクリスト
console.log('\n✅ 【6. 実行可能タスクリスト】');
console.log('==============================');
console.log('Priority 1: 構造統一（必須）');
console.log('  □ evaluationScoresをオブジェクト形式に変換');
console.log('  □ totalScore自動計算に切り替え');
console.log('');
console.log('Priority 2: データ補完（重要）');
console.log('  □ Q001(司法試験) examFee調査');
console.log('  □ Q004(税理士) examFee調査'); 
console.log('  □ Q008(社会保険労務士) examFee+passingRate調査');
console.log('  □ Q009(中小企業診断士) examFee調査');
console.log('  □ Q013(宅建士) examFee調査');
console.log('  □ Q015(簿記2級) examFee調査');
console.log('');
console.log('Priority 3: 品質向上（推奨）');
console.log('  □ validityPeriodのnull値精査');
console.log('  □ 統合後の全体バリデーション');
console.log('  □ データ品質レポート作成');

console.log('\n🎉 分析完了: 修正計画策定済み');