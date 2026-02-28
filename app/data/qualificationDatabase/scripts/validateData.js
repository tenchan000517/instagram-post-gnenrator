const fs = require('fs');
const path = require('path');

/**
 * 資格データのバリデーションスクリプト
 * ガイドラインに従ったデータ検証を実行
 */

// バリデーションルール
const validationRules = {
  // 数値フィールド
  examFee: { type: 'number', min: 0, max: 100000 },
  passingRate: { type: 'number', min: 0, max: 100 },
  standardStudyHours: { type: 'number', min: 0, max: 10000 },
  
  // 期間フィールド（月単位）
  studyPeriod: { type: 'number', min: 0, max: 120 },
  validityPeriod: { type: 'number', min: 0, max: 9999 },
  
  // スコアフィールド（1-5）
  'score': { type: 'integer', min: 1, max: 5 }
};

// 必須フィールド
const requiredFields = {
  basicInfo: ['name', 'category', 'qualificationType', 'organizingBody'],
  acquisitionInfo: ['acquisitionMethod', 'examFrequency', 'examFormat', 'onlineOption', 'examFee', 'passingRate'],
  learningInfo: ['standardStudyHours', 'studyPeriod'],
  practicalInfo: ['mainIndustries', 'jobDemandLevel'],
  evaluationScores: ['difficultyLevel', 'specialization', 'careerValue', 'incomeImpact', 'acquisitionEase', 'totalScore'],
  workshopOnly: ['isWorkshopOnly'],
  metadata: ['createdAt', 'updatedAt', 'dataSource', 'verificationStatus']
};

function validateQualification(qualification, qualificationIndex) {
  const errors = [];
  
  // 基本構造チェック
  if (!qualification.id) {
    errors.push(`Q${qualificationIndex + 1}: ID が必要です`);
  }
  
  // 必須フィールドチェック
  Object.keys(requiredFields).forEach(section => {
    if (!qualification[section]) {
      errors.push(`Q${qualificationIndex + 1}: ${section} セクションが必要です`);
      return;
    }
    
    requiredFields[section].forEach(field => {
      if (qualification[section][field] === undefined || qualification[section][field] === null) {
        errors.push(`Q${qualificationIndex + 1}: ${section}.${field} が必要です`);
      }
    });
  });
  
  // 数値フィールドの検証
  if (qualification.acquisitionInfo) {
    const { examFee, passingRate } = qualification.acquisitionInfo;
    
    if (typeof examFee !== 'number' || examFee < 0) {
      errors.push(`Q${qualificationIndex + 1}: examFee は0以上の数値である必要があります`);
    }
    
    if (typeof passingRate !== 'number' || passingRate < 0 || passingRate > 100) {
      errors.push(`Q${qualificationIndex + 1}: passingRate は0-100の数値である必要があります`);
    }
  }
  
  // 学習情報の検証
  if (qualification.learningInfo) {
    const { standardStudyHours, studyPeriod } = qualification.learningInfo;
    
    if (typeof standardStudyHours !== 'number' || standardStudyHours < 0) {
      errors.push(`Q${qualificationIndex + 1}: standardStudyHours は0以上の数値である必要があります`);
    }
    
    if (typeof studyPeriod !== 'number' || studyPeriod < 0) {
      errors.push(`Q${qualificationIndex + 1}: studyPeriod は0以上の数値である必要があります`);
    }
  }
  
  // 評価スコアの検証
  if (qualification.evaluationScores) {
    const scores = ['difficultyLevel', 'specialization', 'careerValue', 'incomeImpact', 'acquisitionEase'];
    scores.forEach(scoreType => {
      if (qualification.evaluationScores[scoreType] && qualification.evaluationScores[scoreType].score) {
        const score = qualification.evaluationScores[scoreType].score;
        if (typeof score !== 'number' || score < 1 || score > 5) {
          errors.push(`Q${qualificationIndex + 1}: ${scoreType}.score は1-5の整数である必要があります`);
        }
      }
    });
    
    // totalScoreの計算チェック
    if (qualification.evaluationScores.totalScore !== undefined) {
      const calculatedTotal = 
        (qualification.evaluationScores.difficultyLevel?.score || 0) +
        (qualification.evaluationScores.specialization?.score || 0) +
        (qualification.evaluationScores.careerValue?.score || 0) +
        (qualification.evaluationScores.incomeImpact?.score || 0) +
        (qualification.evaluationScores.acquisitionEase?.score || 0);
      
      if (qualification.evaluationScores.totalScore !== calculatedTotal) {
        errors.push(`Q${qualificationIndex + 1}: totalScore (${qualification.evaluationScores.totalScore}) が計算値 (${calculatedTotal}) と一致しません`);
      }
    }
  }
  
  return errors;
}

function validateBatchFile(filePath) {
  console.log(`\n🔍 バリデーション開始: ${path.basename(filePath)}`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ファイルが見つかりません: ${filePath}`);
    return false;
  }
  
  let data;
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error(`❌ JSONパースエラー: ${error.message}`);
    return false;
  }
  
  if (!data.qualifications || !Array.isArray(data.qualifications)) {
    console.error('❌ qualifications 配列が見つかりません');
    return false;
  }
  
  let totalErrors = 0;
  const qualifications = data.qualifications;
  
  console.log(`📊 検証対象: ${qualifications.length} 資格`);
  
  // 各資格のバリデーション
  qualifications.forEach((qualification, index) => {
    const errors = validateQualification(qualification, index);
    if (errors.length > 0) {
      console.log(`\n❌ ${qualification.id || `資格${index + 1}`} のエラー:`);
      errors.forEach(error => console.log(`   ${error}`));
      totalErrors += errors.length;
    }
  });
  
  // サマリー
  if (totalErrors === 0) {
    console.log('\n✅ バリデーション成功: エラーはありません');
    console.log(`📈 統計:`);
    console.log(`   - 総資格数: ${qualifications.length}`);
    console.log(`   - 講習のみ資格: ${qualifications.filter(q => q.workshopOnly?.isWorkshopOnly).length}`);
    console.log(`   - 国家資格: ${qualifications.filter(q => q.basicInfo?.qualificationType === '国家資格').length}`);
    console.log(`   - 平均総合スコア: ${(qualifications.reduce((sum, q) => sum + (q.evaluationScores?.totalScore || 0), 0) / qualifications.length).toFixed(1)}`);
    return true;
  } else {
    console.log(`\n❌ バリデーション失敗: ${totalErrors} 個のエラーが見つかりました`);
    return false;
  }
}

// コマンドライン実行
if (require.main === module) {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('使用法: node validateData.js <JSONファイルパス>');
    process.exit(1);
  }
  
  const success = validateBatchFile(filePath);
  process.exit(success ? 0 : 1);
}

module.exports = { validateBatchFile, validateQualification };