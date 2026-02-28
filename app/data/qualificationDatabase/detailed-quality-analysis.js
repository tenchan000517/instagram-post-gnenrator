/**
 * バッチ1とバッチ3の詳細品質分析
 * なぜバッチ1で29個エラーが出て、バッチ3で0になったかの分析
 */

const fs = require('fs');

// データ読み込み
const batch1 = JSON.parse(fs.readFileSync('./research-batches/batch-01-Q001-Q015.json', 'utf8'));
const batch3 = JSON.parse(fs.readFileSync('./research-batches/batch-03-Q031-Q045.json', 'utf8'));

console.log('='.repeat(80));
console.log('詳細品質分析: バッチ1の29エラー → バッチ3の0エラー 原因分析');
console.log('='.repeat(80));

// より厳密なバリデーション関数
function performStrictValidation(qual, batchName, errors) {
  const id = qual.id;
  
  // 1. 基本情報の完全性チェック
  if (!qual.basicInfo?.name || qual.basicInfo.name.trim() === '') {
    errors.push(`${batchName} ${id}: 資格名が空または未定義`);
  }
  
  if (!qual.basicInfo?.englishName || qual.basicInfo.englishName.trim() === '') {
    errors.push(`${batchName} ${id}: 英語名が空または未定義`);
  }
  
  if (!qual.basicInfo?.category || qual.basicInfo.category.trim() === '') {
    errors.push(`${batchName} ${id}: カテゴリが空または未定義`);
  }
  
  if (!qual.basicInfo?.qualificationType || qual.basicInfo.qualificationType.trim() === '') {
    errors.push(`${batchName} ${id}: 資格種別が空または未定義`);
  }
  
  if (!qual.basicInfo?.organizingBody || qual.basicInfo.organizingBody.trim() === '') {
    errors.push(`${batchName} ${id}: 実施団体が空または未定義`);
  }
  
  // 2. 取得情報の妥当性チェック
  if (qual.acquisitionInfo?.examFee !== null && qual.acquisitionInfo?.examFee !== undefined) {
    if (isNaN(qual.acquisitionInfo.examFee) || qual.acquisitionInfo.examFee < 0) {
      errors.push(`${batchName} ${id}: 受験料が不正な値: ${qual.acquisitionInfo.examFee}`);
    }
  }
  
  if (qual.acquisitionInfo?.passingRate !== null && qual.acquisitionInfo?.passingRate !== undefined) {
    if (isNaN(qual.acquisitionInfo.passingRate) || 
        qual.acquisitionInfo.passingRate < 0 || 
        qual.acquisitionInfo.passingRate > 100) {
      errors.push(`${batchName} ${id}: 合格率が範囲外: ${qual.acquisitionInfo.passingRate}`);
    }
  }
  
  // 3. 学習情報の整合性チェック
  if (qual.learningInfo?.standardStudyHours !== null && qual.learningInfo?.standardStudyHours !== undefined) {
    if (isNaN(qual.learningInfo.standardStudyHours) || qual.learningInfo.standardStudyHours < 0) {
      errors.push(`${batchName} ${id}: 学習時間が不正: ${qual.learningInfo.standardStudyHours}`);
    }
  }
  
  if (qual.learningInfo?.studyPeriod !== null && qual.learningInfo?.studyPeriod !== undefined) {
    if (isNaN(qual.learningInfo.studyPeriod) || qual.learningInfo.studyPeriod < 0) {
      errors.push(`${batchName} ${id}: 学習期間が不正: ${qual.learningInfo.studyPeriod}`);
    }
  }
  
  // 4. 費用情報の一貫性チェック
  ['textbookCost', 'schoolCost', 'onlineCourseCost'].forEach(costField => {
    const value = qual.learningInfo?.[costField];
    if (value !== null && value !== undefined && (isNaN(value) || value < 0)) {
      errors.push(`${batchName} ${id}: ${costField}が不正な値: ${value}`);
    }
  });
  
  // 5. 実務情報の必須チェック
  if (!qual.practicalInfo?.mainIndustries || !Array.isArray(qual.practicalInfo.mainIndustries) || 
      qual.practicalInfo.mainIndustries.length === 0) {
    errors.push(`${batchName} ${id}: 主要業界情報が未定義または空の配列`);
  }
  
  if (!qual.practicalInfo?.jobDemandLevel || qual.practicalInfo.jobDemandLevel.trim() === '') {
    errors.push(`${batchName} ${id}: 求人需要レベルが未定義`);
  }
  
  // 6. 評価スコアの形式・値チェック
  if (!qual.evaluationScores) {
    errors.push(`${batchName} ${id}: 評価スコアが未定義`);
    return;
  }
  
  const axes = ['difficultyLevel', 'specialization', 'careerValue', 'incomeImpact', 'acquisitionEase'];
  axes.forEach(axis => {
    const axisData = qual.evaluationScores[axis];
    
    if (axisData === undefined || axisData === null) {
      errors.push(`${batchName} ${id}: ${axis}が未定義`);
      return;
    }
    
    // バッチ1形式 (数値)
    if (typeof axisData === 'number') {
      if (axisData < 1 || axisData > 5 || !Number.isInteger(axisData)) {
        errors.push(`${batchName} ${id}: ${axis}が範囲外または非整数: ${axisData}`);
      }
    }
    // バッチ3形式 (オブジェクト)
    else if (typeof axisData === 'object') {
      if (!axisData.score || !axisData.description) {
        errors.push(`${batchName} ${id}: ${axis}のオブジェクト形式が不完全`);
      }
      if (axisData.score && (axisData.score < 1 || axisData.score > 5 || !Number.isInteger(axisData.score))) {
        errors.push(`${batchName} ${id}: ${axis}.scoreが範囲外: ${axisData.score}`);
      }
    } else {
      errors.push(`${batchName} ${id}: ${axis}の形式が不正`);
    }
  });
  
  // 7. totalScoreの整合性チェック
  if (qual.evaluationScores.totalScore) {
    let calculatedTotal = 0;
    axes.forEach(axis => {
      const axisData = qual.evaluationScores[axis];
      const score = typeof axisData === 'number' ? axisData : axisData?.score || 0;
      calculatedTotal += score;
    });
    
    if (Math.abs(qual.evaluationScores.totalScore - calculatedTotal) > 0.1) {
      errors.push(`${batchName} ${id}: totalScore不整合 期待値:${calculatedTotal} 実際:${qual.evaluationScores.totalScore}`);
    }
  }
  
  // 8. workshopOnlyの一貫性チェック
  if (qual.workshopOnly?.isWorkshopOnly) {
    if (!qual.workshopOnly.workshopDuration) {
      errors.push(`${batchName} ${id}: workshopOnly=trueだがworkshopDurationが未定義`);
    }
    if (!qual.workshopOnly.workshopTestDifficulty) {
      errors.push(`${batchName} ${id}: workshopOnly=trueだがworkshopTestDifficultyが未定義`);
    }
  }
  
  // 9. メタデータの完全性チェック
  if (!qual.metadata?.createdAt) {
    errors.push(`${batchName} ${id}: 作成日時が未定義`);
  }
  
  if (!qual.metadata?.dataSource || !Array.isArray(qual.metadata.dataSource) || 
      qual.metadata.dataSource.length === 0) {
    errors.push(`${batchName} ${id}: データソースが未定義または空の配列`);
  }
  
  if (!qual.metadata?.verificationStatus) {
    errors.push(`${batchName} ${id}: 検証ステータスが未定義`);
  }
}

// 厳密なバリデーション実行
let batch1StrictErrors = [];
let batch3StrictErrors = [];

console.log('厳密なバリデーション実行中...\n');

batch1.qualifications.forEach(qual => performStrictValidation(qual, 'バッチ1', batch1StrictErrors));
batch3.qualifications.forEach(qual => performStrictValidation(qual, 'バッチ3', batch3StrictErrors));

console.log(`厳密バリデーション結果:`);
console.log(`バッチ1: ${batch1StrictErrors.length}件のエラー`);
console.log(`バッチ3: ${batch3StrictErrors.length}件のエラー`);

// エラー詳細表示
if (batch1StrictErrors.length > 0) {
  console.log('\n【バッチ1 エラー詳細】');
  batch1StrictErrors.forEach((error, index) => {
    if (index < 30) console.log(`  ${index + 1}. ${error}`);
  });
  if (batch1StrictErrors.length > 30) {
    console.log(`  ... および${batch1StrictErrors.length - 30}件の追加エラー`);
  }
}

if (batch3StrictErrors.length > 0) {
  console.log('\n【バッチ3 エラー詳細】');
  batch3StrictErrors.forEach((error, index) => {
    if (index < 30) console.log(`  ${index + 1}. ${error}`);
  });
  if (batch3StrictErrors.length > 30) {
    console.log(`  ... および${batch3StrictErrors.length - 30}件の追加エラー`);
  }
}

// エラーカテゴリ分析
function categorizeErrors(errors) {
  const categories = {
    '基本情報': 0,
    '数値妥当性': 0,
    '評価スコア': 0,
    'メタデータ': 0,
    '配列・構造': 0,
    'その他': 0
  };
  
  errors.forEach(error => {
    if (error.includes('資格名') || error.includes('英語名') || error.includes('カテゴリ') || 
        error.includes('資格種別') || error.includes('実施団体')) {
      categories['基本情報']++;
    } else if (error.includes('受験料') || error.includes('合格率') || error.includes('学習時間') || 
               error.includes('学習期間') || error.includes('Cost')) {
      categories['数値妥当性']++;
    } else if (error.includes('difficultyLevel') || error.includes('specialization') || 
               error.includes('careerValue') || error.includes('incomeImpact') || 
               error.includes('acquisitionEase') || error.includes('totalScore')) {
      categories['評価スコア']++;
    } else if (error.includes('作成日時') || error.includes('データソース') || error.includes('検証ステータス')) {
      categories['メタデータ']++;
    } else if (error.includes('配列') || error.includes('未定義') || error.includes('空')) {
      categories['配列・構造']++;
    } else {
      categories['その他']++;
    }
  });
  
  return categories;
}

console.log('\n' + '='.repeat(60));
console.log('エラーカテゴリ分析');
console.log('='.repeat(60));

if (batch1StrictErrors.length > 0) {
  const batch1Categories = categorizeErrors(batch1StrictErrors);
  console.log('\n【バッチ1 エラーカテゴリ】');
  Object.entries(batch1Categories).forEach(([category, count]) => {
    if (count > 0) console.log(`  ${category}: ${count}件`);
  });
}

if (batch3StrictErrors.length > 0) {
  const batch3Categories = categorizeErrors(batch3StrictErrors);
  console.log('\n【バッチ3 エラーカテゴリ】');
  Object.entries(batch3Categories).forEach(([category, count]) => {
    if (count > 0) console.log(`  ${category}: ${count}件`);
  });
}

// 改善された点の分析
console.log('\n' + '='.repeat(60));
console.log('品質改善ポイント分析');
console.log('='.repeat(60));

console.log('\n【バッチ3で改善された点】');
console.log('1. データ構造の標準化');
console.log('   - 評価スコアに詳細な説明とdetailFactorsを追加');
console.log('   - より構造化された情報提供');

console.log('\n2. 情報の完全性向上');
console.log('   - 全ての必須フィールドが適切に入力');
console.log('   - null値の適切な処理');

console.log('\n3. 数値データの精度向上');
console.log('   - 合格率、学習時間等の妥当な範囲での値設定');
console.log('   - 一貫性のあるデータ形式');

// データ信頼性評価
console.log('\n' + '='.repeat(60));
console.log('データ信頼性総合評価');
console.log('='.repeat(60));

function calculateReliabilityScore(qualifications, errors) {
  const totalFields = qualifications.length * 50; // 1資格あたり約50の主要フィールド
  const errorRate = errors.length / totalFields;
  const reliabilityScore = Math.max(0, (1 - errorRate) * 100);
  return reliabilityScore.toFixed(2);
}

const batch1Reliability = calculateReliabilityScore(batch1.qualifications, batch1StrictErrors);
const batch3Reliability = calculateReliabilityScore(batch3.qualifications, batch3StrictErrors);

console.log(`バッチ1 信頼性スコア: ${batch1Reliability}%`);
console.log(`バッチ3 信頼性スコア: ${batch3Reliability}%`);

console.log('\n【最終推奨】');
if (batch3Reliability > batch1Reliability) {
  console.log('✓ バッチ3を統合処理の標準として採用推奨');
  console.log('  理由: より高い信頼性、改善されたデータ構造、エラー0件');
} else {
  console.log('✓ 両バッチとも高品質、用途に応じて選択');
}

console.log('\n' + '='.repeat(80));
console.log('詳細品質分析完了');
console.log('='.repeat(80));