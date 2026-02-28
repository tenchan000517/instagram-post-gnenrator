/**
 * バッチ1とバッチ3の詳細比較分析スクリプト
 * 対象: batch-01-Q001-Q015.json vs batch-03-Q031-Q045.json
 */

const fs = require('fs');
const path = require('path');

// ファイルパス
const batch1Path = './research-batches/batch-01-Q001-Q015.json';
const batch3Path = './research-batches/batch-03-Q031-Q045.json';

// データ読み込み
const batch1 = JSON.parse(fs.readFileSync(batch1Path, 'utf8'));
const batch3 = JSON.parse(fs.readFileSync(batch3Path, 'utf8'));

console.log('='.repeat(80));
console.log('バッチ1 vs バッチ3 詳細比較分析レポート');
console.log('='.repeat(80));

// 1. 基本情報比較
console.log('\n1. 基本データ比較');
console.log('-'.repeat(40));
console.log(`バッチ1: ${batch1.qualifications.length}件の資格データ (${batch1.metadata?.qualificationRange || 'Q001-Q015'})`);
console.log(`バッチ3: ${batch3.qualifications.length}件の資格データ (${batch3.batchInfo?.idRange || 'Q031-Q045'})`);

// 2. JSON構造比較
console.log('\n2. JSON構造比較');
console.log('-'.repeat(40));

// バッチ1のメタデータ構造
console.log('バッチ1 メタデータ構造:');
if (batch1.metadata) {
  console.log(`  - batchId: ${batch1.metadata.batchId || 'なし'}`);
  console.log(`  - qualificationRange: ${batch1.metadata.qualificationRange || 'なし'}`);
  console.log(`  - dataVersion: ${batch1.metadata.dataVersion || 'なし'}`);
  console.log(`  - verificationStatus: ${batch1.metadata.verificationStatus || 'なし'}`);
}

// バッチ3のメタデータ構造
console.log('バッチ3 メタデータ構造:');
if (batch3.batchInfo) {
  console.log(`  - batchNumber: ${batch3.batchInfo.batchNumber || 'なし'}`);
  console.log(`  - idRange: ${batch3.batchInfo.idRange || 'なし'}`);
  console.log(`  - version: ${batch3.batchInfo.version || 'なし'}`);
  console.log(`  - completedDate: ${batch3.batchInfo.completedDate || 'なし'}`);
}

// 3. データ品質比較
console.log('\n3. データ品質比較');
console.log('-'.repeat(40));

let batch1Errors = [];
let batch3Errors = [];

// バリデーション関数
function validateQualification(qual, batchName, errors) {
  const id = qual.id;
  
  // 必須フィールドチェック
  const requiredFields = [
    'basicInfo.name',
    'basicInfo.category',
    'basicInfo.qualificationType',
    'acquisitionInfo.acquisitionMethod',
    'learningInfo.standardStudyHours',
    'practicalInfo.mainIndustries',
    'evaluationScores'
  ];
  
  requiredFields.forEach(field => {
    const keys = field.split('.');
    let value = qual;
    for (let key of keys) {
      value = value?.[key];
    }
    if (value === undefined || value === null || value === '') {
      errors.push(`${batchName} ${id}: 必須フィールド "${field}" が欠落または空`);
    }
  });
  
  // 評価スコア構造チェック
  if (qual.evaluationScores) {
    const batch1Format = typeof qual.evaluationScores.difficultyLevel === 'number';
    const batch3Format = typeof qual.evaluationScores.difficultyLevel === 'object' &&
                         qual.evaluationScores.difficultyLevel.score !== undefined;
    
    if (!batch1Format && !batch3Format) {
      errors.push(`${batchName} ${id}: 評価スコア形式が不正`);
    }
  }
  
  // 数値フィールドの妥当性チェック
  if (qual.learningInfo?.standardStudyHours !== null && 
      (isNaN(qual.learningInfo.standardStudyHours) || qual.learningInfo.standardStudyHours < 0)) {
    errors.push(`${batchName} ${id}: standardStudyHours が不正な値`);
  }
  
  if (qual.acquisitionInfo?.passingRate !== null && 
      (isNaN(qual.acquisitionInfo.passingRate) || qual.acquisitionInfo.passingRate < 0 || qual.acquisitionInfo.passingRate > 100)) {
    errors.push(`${batchName} ${id}: passingRate が不正な範囲 (${qual.acquisitionInfo.passingRate})`);
  }
}

// バリデーション実行
batch1.qualifications.forEach(qual => validateQualification(qual, 'バッチ1', batch1Errors));
batch3.qualifications.forEach(qual => validateQualification(qual, 'バッチ3', batch3Errors));

console.log(`バッチ1 エラー数: ${batch1Errors.length}`);
console.log(`バッチ3 エラー数: ${batch3Errors.length}`);

if (batch1Errors.length > 0) {
  console.log('\nバッチ1 エラー詳細:');
  batch1Errors.slice(0, 10).forEach(error => console.log(`  - ${error}`));
  if (batch1Errors.length > 10) console.log(`  ... および${batch1Errors.length - 10}件の追加エラー`);
}

if (batch3Errors.length > 0) {
  console.log('\nバッチ3 エラー詳細:');
  batch3Errors.slice(0, 10).forEach(error => console.log(`  - ${error}`));
  if (batch3Errors.length > 10) console.log(`  ... および${batch3Errors.length - 10}件の追加エラー`);
}

// 4. 評価スコア形式比較
console.log('\n4. 評価スコア形式比較');
console.log('-'.repeat(40));

const batch1Sample = batch1.qualifications[0]?.evaluationScores;
const batch3Sample = batch3.qualifications[0]?.evaluationScores;

console.log('バッチ1 評価スコア形式 (サンプル):');
console.log(`  difficultyLevel: ${typeof batch1Sample?.difficultyLevel} (値: ${batch1Sample?.difficultyLevel})`);
console.log(`  breakdown構造: ${batch1Sample?.breakdown ? 'あり' : 'なし'}`);

console.log('\nバッチ3 評価スコア形式 (サンプル):');
console.log(`  difficultyLevel: ${typeof batch3Sample?.difficultyLevel} (スコア: ${batch3Sample?.difficultyLevel?.score})`);
console.log(`  description: ${batch3Sample?.difficultyLevel?.description ? 'あり' : 'なし'}`);
console.log(`  detailFactors: ${batch3Sample?.difficultyLevel?.detailFactors ? 'あり' : 'なし'}`);

// 5. 難易度分布比較
console.log('\n5. 難易度分布比較');
console.log('-'.repeat(40));

function getDifficultyScore(evalScores) {
  if (typeof evalScores.difficultyLevel === 'number') {
    return evalScores.difficultyLevel;
  }
  return evalScores.difficultyLevel?.score || 0;
}

const batch1Difficulties = batch1.qualifications.map(q => getDifficultyScore(q.evaluationScores)).filter(d => d > 0);
const batch3Difficulties = batch3.qualifications.map(q => getDifficultyScore(q.evaluationScores)).filter(d => d > 0);

function getDifficultyDistribution(difficulties) {
  const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  difficulties.forEach(d => {
    if (d >= 1 && d <= 5) dist[d]++;
  });
  return dist;
}

const batch1Dist = getDifficultyDistribution(batch1Difficulties);
const batch3Dist = getDifficultyDistribution(batch3Difficulties);

console.log('バッチ1 難易度分布:');
Object.entries(batch1Dist).forEach(([level, count]) => {
  console.log(`  難易度${level}: ${count}件`);
});

console.log('\nバッチ3 難易度分布:');
Object.entries(batch3Dist).forEach(([level, count]) => {
  console.log(`  難易度${level}: ${count}件`);
});

// 6. 5軸評価スコア比較
console.log('\n6. 5軸評価スコア比較');
console.log('-'.repeat(40));

function getScoreValue(evalScores, axis) {
  const value = evalScores[axis];
  return typeof value === 'number' ? value : (value?.score || 0);
}

function calculateAverageScores(qualifications) {
  const axes = ['difficultyLevel', 'specialization', 'careerValue', 'incomeImpact', 'acquisitionEase'];
  const totals = {};
  const counts = {};
  
  axes.forEach(axis => {
    totals[axis] = 0;
    counts[axis] = 0;
  });
  
  qualifications.forEach(qual => {
    if (qual.evaluationScores) {
      axes.forEach(axis => {
        const score = getScoreValue(qual.evaluationScores, axis);
        if (score > 0) {
          totals[axis] += score;
          counts[axis]++;
        }
      });
    }
  });
  
  const averages = {};
  axes.forEach(axis => {
    averages[axis] = counts[axis] > 0 ? (totals[axis] / counts[axis]).toFixed(2) : 0;
  });
  
  return averages;
}

const batch1Averages = calculateAverageScores(batch1.qualifications);
const batch3Averages = calculateAverageScores(batch3.qualifications);

console.log('バッチ1 平均スコア:');
Object.entries(batch1Averages).forEach(([axis, score]) => {
  console.log(`  ${axis}: ${score}`);
});

console.log('\nバッチ3 平均スコア:');
Object.entries(batch3Averages).forEach(([axis, score]) => {
  console.log(`  ${axis}: ${score}`);
});

// 7. 講習系資格の比較
console.log('\n7. 講習系資格(workshopOnly)比較');
console.log('-'.repeat(40));

const batch1Workshops = batch1.qualifications.filter(q => q.workshopOnly?.isWorkshopOnly).length;
const batch3Workshops = batch3.qualifications.filter(q => q.workshopOnly?.isWorkshopOnly).length;

console.log(`バッチ1 講習系資格: ${batch1Workshops}件`);
console.log(`バッチ3 講習系資格: ${batch3Workshops}件`);

// 8. カテゴリ分布比較
console.log('\n8. カテゴリ分布比較');
console.log('-'.repeat(40));

function getCategoryDistribution(qualifications) {
  const dist = {};
  qualifications.forEach(qual => {
    const category = qual.basicInfo?.category || '不明';
    dist[category] = (dist[category] || 0) + 1;
  });
  return dist;
}

const batch1Categories = getCategoryDistribution(batch1.qualifications);
const batch3Categories = getCategoryDistribution(batch3.qualifications);

console.log('バッチ1 カテゴリ分布:');
Object.entries(batch1Categories).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}件`);
});

console.log('\nバッチ3 カテゴリ分布:');
Object.entries(batch3Categories).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}件`);
});

// 9. 総合評価と結論
console.log('\n9. 総合評価と結論');
console.log('-'.repeat(40));

console.log('【データ品質評価】');
console.log(`バッチ1: エラー${batch1Errors.length}件 - ${batch1Errors.length === 0 ? '完璧' : batch1Errors.length <= 5 ? '良好' : batch1Errors.length <= 15 ? '要改善' : '不良'}`);
console.log(`バッチ3: エラー${batch3Errors.length}件 - ${batch3Errors.length === 0 ? '完璧' : batch3Errors.length <= 5 ? '良好' : batch3Errors.length <= 15 ? '要改善' : '不良'}`);

console.log('\n【構造一貫性評価】');
console.log('バッチ1: 古い形式、シンプルな数値スコア');
console.log('バッチ3: 新しい形式、詳細な構造化スコア');

console.log('\n【推奨判定】');
const batch1Quality = batch1Errors.length === 0 ? 5 : batch1Errors.length <= 5 ? 4 : batch1Errors.length <= 15 ? 3 : 2;
const batch3Quality = batch3Errors.length === 0 ? 5 : batch3Errors.length <= 5 ? 4 : batch3Errors.length <= 15 ? 3 : 2;

if (batch3Quality > batch1Quality) {
  console.log('✓ バッチ3が推奨 - エラーが少なく、より詳細な構造');
} else if (batch1Quality > batch3Quality) {
  console.log('✓ バッチ1が推奨 - データ品質が高い');
} else {
  console.log('✓ 品質は同等 - 用途に応じて選択');
}

console.log('\n【統合時の注意点】');
console.log('- 評価スコア形式の統一が必要');
console.log('- メタデータ構造の標準化が必要');
console.log('- バリデーションルールの統一が必要');

console.log('\n' + '='.repeat(80));
console.log('比較分析完了');
console.log('='.repeat(80));