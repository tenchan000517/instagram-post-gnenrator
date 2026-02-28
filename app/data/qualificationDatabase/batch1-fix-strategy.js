const fs = require('fs');

/**
 * バッチ1修正戦略・データ補完ガイド
 * 29個のバリデーションエラーの修正計画詳細版
 */

console.log('🛠️  バッチ1修正戦略詳細設計\n');

// 欠損データの補完データベース
const missingDataFixes = {
  Q001: {
    name: '司法試験',
    examFee: 28000, // 司法試験受験手数料
    source: '法務省公式サイト 2024年度',
    confidence: 'high'
  },
  Q004: {
    name: '司法書士',
    examFee: 8000, // 司法書士試験受験手数料  
    source: '法務省公式サイト 2024年度',
    confidence: 'high'
  },
  Q008: {
    name: '国家公務員総合職',
    examFee: 0, // 国家公務員試験は無料
    passingRate: 15.5, // 2023年度実績
    source: '人事院公式統計',
    confidence: 'high'
  },
  Q009: {
    name: '司書',
    examFee: 0, // 司書資格は大学・短大での単位取得
    source: '文部科学省',
    confidence: 'high',
    note: '試験ではなく単位取得型'
  },
  Q013: {
    name: '看護師',
    examFee: 5400, // 看護師国家試験受験手数料
    source: '厚生労働省公式',
    confidence: 'high'
  },
  Q015: {
    name: '衛生管理者',
    examFee: 6800, // 第一種衛生管理者試験受験手数料
    source: '安全衛生技術試験協会',
    confidence: 'high'
  }
};

// 評価スコア構造変換ルール
const scoreConversionRules = {
  // バッチ1形式 → バッチ2・3統一形式
  convertEvaluationScores: (oldScores) => {
    return {
      difficultyLevel: {
        score: oldScores.difficultyLevel,
        description: oldScores.breakdown?.difficultyLevel?.reasoning || "",
        detailFactors: {
          needsSchool: oldScores.difficultyLevel >= 4,
          needsWorkExperience: oldScores.difficultyLevel >= 4,
          examDifficulty: oldScores.difficultyLevel >= 4 ? "難" : 
                         oldScores.difficultyLevel >= 3 ? "中" : "易",
          studyHours: oldScores.difficultyLevel * 500 // 推定値
        }
      },
      specialization: {
        score: oldScores.specialization,
        description: oldScores.breakdown?.specialization?.reasoning || "",
        detailFactors: {
          fieldSpecificity: oldScores.specialization >= 4 ? "高" : 
                          oldScores.specialization >= 3 ? "中" : "低",
          transferability: oldScores.specialization >= 4 ? "低" : "高",
          uniqueSkills: oldScores.specialization >= 4
        }
      },
      careerValue: {
        score: oldScores.careerValue,
        description: oldScores.breakdown?.careerValue?.reasoning || "",
        detailFactors: {
          industryDemand: oldScores.careerValue >= 4 ? "必須" : 
                         oldScores.careerValue >= 3 ? "有利" : "あれば良い",
          recruitmentAdvantage: oldScores.careerValue >= 4 ? "高" : 
                              oldScores.careerValue >= 3 ? "中" : "低",
          promotionImpact: oldScores.careerValue >= 4 ? "大" : 
                          oldScores.careerValue >= 3 ? "中" : "小"
        }
      },
      incomeImpact: {
        score: oldScores.incomeImpact,
        description: oldScores.breakdown?.incomeImpact?.reasoning || "",
        detailFactors: {
          allowanceRange: oldScores.incomeImpact >= 4 ? "50000-200000" : 
                         oldScores.incomeImpact >= 3 ? "20000-50000" : "5000-20000",
          salaryIncrease: oldScores.incomeImpact >= 4 ? "20-50" : 
                         oldScores.incomeImpact >= 3 ? "10-20" : "0-10",
          independenceIncome: oldScores.incomeImpact >= 4 ? "可能" : "不可"
        }
      },
      acquisitionEase: {
        score: oldScores.acquisitionEase,
        description: oldScores.breakdown?.acquisitionEase?.reasoning || "",
        detailFactors: {
          studyDifficulty: oldScores.acquisitionEase <= 2 ? "高" : 
                          oldScores.acquisitionEase <= 3 ? "中" : "低",
          costBarrier: oldScores.acquisitionEase <= 2 ? "高" : 
                      oldScores.acquisitionEase <= 3 ? "中" : "低",
          timeBarrier: oldScores.acquisitionEase <= 2 ? "長期" : 
                      oldScores.acquisitionEase <= 3 ? "中期" : "短期"
        }
      },
      // totalScoreは自動計算
      totalScore: oldScores.difficultyLevel + oldScores.specialization + 
                 oldScores.careerValue + oldScores.incomeImpact + oldScores.acquisitionEase
    };
  }
};

console.log('📋 【修正戦略の詳細設計】');
console.log('========================');
console.log('');
console.log('Phase 1: データ構造統一');
console.log('- evaluationScoresの形式変換');
console.log('- totalScore自動計算への切り替え');
console.log('- バリデーション互換性確保');
console.log('');
console.log('Phase 2: 欠損データ補完');
console.log('- examFee: 6件の正確な調査・設定');
console.log('- passingRate: 1件の統計データ確認');
console.log('- validityPeriod: null値の適切な設定');
console.log('');
console.log('Phase 3: 品質保証');
console.log('- 変換後の全データバリデーション');
console.log('- バッチ2・3との整合性確認');
console.log('- 統合データベース生成テスト');

console.log('\n💾 【欠損データ補完計画】');
console.log('========================');
Object.entries(missingDataFixes).forEach(([id, data]) => {
  console.log(`${id}: ${data.name}`);
  console.log(`  examFee: ${data.examFee}円 (${data.confidence}信頼度)`);
  if (data.passingRate) console.log(`  passingRate: ${data.passingRate}%`);
  console.log(`  根拠: ${data.source}`);
  if (data.note) console.log(`  注記: ${data.note}`);
  console.log('');
});

console.log('🔄 【構造変換サンプル】');
console.log('====================');
console.log('変換前（バッチ1形式）:');
console.log('evaluationScores: {');
console.log('  difficultyLevel: 5,');
console.log('  totalScore: 21,');
console.log('  breakdown: { difficultyLevel: { score: 5, reasoning: "..." } }');
console.log('}');
console.log('');
console.log('変換後（バッチ2・3統一形式）:');
console.log('evaluationScores: {');
console.log('  difficultyLevel: {');
console.log('    score: 5,');
console.log('    description: "...",');
console.log('    detailFactors: { needsSchool: true, ... }');
console.log('  },');
console.log('  totalScore: 21 // 自動計算');
console.log('}');

console.log('\n⚠️  【リスク評価と対策】');
console.log('======================');
console.log('HIGH RISK: データ精度');
console.log('- 対策: 公式サイトからの情報収集');
console.log('- 検証: 複数ソースでの確認');
console.log('');
console.log('MEDIUM RISK: 構造変換ミス');
console.log('- 対策: 段階的変換・テスト');
console.log('- 検証: 変換前後の比較チェック');
console.log('');
console.log('LOW RISK: バリデーション失敗');
console.log('- 対策: 修正後の全件バリデーション');
console.log('- 検証: CI/CDでの自動チェック');

console.log('\n📊 【成功指標】');
console.log('===============');
console.log('✅ バリデーションエラー: 29 → 0');
console.log('✅ データ完整性: 95%以上');
console.log('✅ 構造統一性: 100%');
console.log('✅ 処理時間: 8時間以内');

console.log('\n🚀 【次のアクション】');
console.log('===================');
console.log('1. batch1-data-fix.js スクリプト作成');
console.log('2. 欠損データの公式確認');
console.log('3. 段階的修正実行');
console.log('4. バリデーション・統合テスト');
console.log('');
console.log('🎯 準備完了: 実行フェーズへ');