const fs = require('fs');

// ファイルパス設定
const jsonPath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問データベース.json';
const categorySourcePath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問100問_適切なカテゴリ分け_2025-09-10.md';

console.log('🔍 面接質問データベースのバリデーションを開始します...\n');

// JSONファイルを読み込み
let database;
try {
  database = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log('✅ JSONファイルの読み込み成功');
} catch (error) {
  console.log('❌ JSONファイルの読み込み失敗:', error.message);
  process.exit(1);
}

// バリデーション結果を格納する配列
const errors = [];
const warnings = [];
const info = [];

// 1. 基本構造のチェック
console.log('\n📋 基本構造のチェック...');

if (!database.metadata) {
  errors.push('metadata セクションが存在しません');
} else {
  info.push(`タイトル: ${database.metadata.title}`);
  info.push(`作成日: ${database.metadata.created_date}`);
  info.push(`想定質問数: ${database.metadata.total_questions}`);
}

if (!database.questions || !Array.isArray(database.questions)) {
  errors.push('questions 配列が存在しません');
  process.exit(1);
}

// 2. 質問数のチェック
console.log('\n🔢 質問数のチェック...');
const actualQuestionCount = database.questions.length;
const expectedQuestionCount = 100;

if (actualQuestionCount === expectedQuestionCount) {
  info.push(`✅ 質問数: ${actualQuestionCount}問 (期待値: ${expectedQuestionCount}問)`);
} else {
  errors.push(`質問数が期待値と異なります: ${actualQuestionCount}問 (期待値: ${expectedQuestionCount}問)`);
}

// 3. 質問番号の連続性チェック
console.log('\n🔗 質問番号の連続性チェック...');
const questionIds = database.questions.map(q => q.id);
const expectedIds = [];
for (let i = 1; i <= 100; i++) {
  expectedIds.push(`Q${String(i).padStart(3, '0')}`);
}

const missingIds = expectedIds.filter(id => !questionIds.includes(id));
const extraIds = questionIds.filter(id => !expectedIds.includes(id));

if (missingIds.length === 0 && extraIds.length === 0) {
  info.push('✅ 質問番号は完全に連続しています (Q001-Q100)');
} else {
  if (missingIds.length > 0) {
    errors.push(`欠損している質問番号: ${missingIds.join(', ')}`);
  }
  if (extraIds.length > 0) {
    errors.push(`余分な質問番号: ${extraIds.join(', ')}`);
  }
}

// 4. 必須フィールドのチェック
console.log('\n📝 必須フィールドのチェック...');
const requiredFields = ['id', 'question', 'category', 'importance', 'frequency', 'difficulty', 'total_score', 'interview_type', 'tags'];
const optionalFields = ['good_answer', 'bad_answer', 'evaluation_points'];

let fieldErrors = 0;
database.questions.forEach((question, index) => {
  requiredFields.forEach(field => {
    if (question[field] === undefined || question[field] === null) {
      errors.push(`${question.id || `質問${index + 1}`}: 必須フィールド '${field}' が存在しません`);
      fieldErrors++;
    }
  });
});

if (fieldErrors === 0) {
  info.push('✅ すべての必須フィールドが存在します');
} else {
  errors.push(`必須フィールドのエラー: ${fieldErrors}件`);
}

// 5. データ型のチェック
console.log('\n🔍 データ型のチェック...');
let typeErrors = 0;
database.questions.forEach(question => {
  // 数値フィールドのチェック
  ['importance', 'frequency', 'difficulty', 'total_score'].forEach(field => {
    if (typeof question[field] !== 'number') {
      errors.push(`${question.id}: '${field}' は数値である必要があります (現在: ${typeof question[field]})`);
      typeErrors++;
    }
  });
  
  // 配列フィールドのチェック
  ['interview_type', 'tags'].forEach(field => {
    if (!Array.isArray(question[field])) {
      errors.push(`${question.id}: '${field}' は配列である必要があります (現在: ${typeof question[field]})`);
      typeErrors++;
    }
  });
  
  // 文字列フィールドのチェック
  ['id', 'question', 'category'].forEach(field => {
    if (typeof question[field] !== 'string') {
      errors.push(`${question.id}: '${field}' は文字列である必要があります (現在: ${typeof question[field]})`);
      typeErrors++;
    }
  });
});

if (typeErrors === 0) {
  info.push('✅ すべてのデータ型が正しいです');
} else {
  errors.push(`データ型エラー: ${typeErrors}件`);
}

// 6. スコアの整合性チェック
console.log('\n📊 スコアの整合性チェック...');
let scoreErrors = 0;
database.questions.forEach(question => {
  const calculatedTotal = question.importance + question.frequency + question.difficulty;
  if (question.total_score !== calculatedTotal) {
    errors.push(`${question.id}: total_score の計算が正しくありません (${question.total_score} ≠ ${calculatedTotal})`);
    scoreErrors++;
  }
});

if (scoreErrors === 0) {
  info.push('✅ すべてのスコア計算が正しいです');
} else {
  errors.push(`スコア計算エラー: ${scoreErrors}件`);
}

// 7. カテゴリの一貫性チェック
console.log('\n🏷️ カテゴリの一貫性チェック...');
const categories = [...new Set(database.questions.map(q => q.category))];
const expectedCategories = [
  '自己紹介・人物像系',
  '強み・弱み・自己PR系', 
  '志望動機・企業研究系',
  'ガクチカ・学生時代の経験系',
  '仕事・働き方の価値観系',
  'キャリアビジョン・将来計画系',
  '入社意思・志望度確認系',
  '基本スキル・能力系',
  '困難・失敗・対処法系',
  '業界・経営視点・その他系'
];

info.push(`検出されたカテゴリ数: ${categories.length}個`);
categories.forEach(cat => info.push(`  - ${cat}`));

const unknownCategories = categories.filter(cat => !expectedCategories.includes(cat));
if (unknownCategories.length > 0) {
  warnings.push(`予期しないカテゴリ: ${unknownCategories.join(', ')}`);
}

// 8. 面接タイプの分布チェック
console.log('\n🎯 面接タイプの分布チェック...');
const humanResourceQuestions = database.questions.filter(q => 
  q.interview_type.includes('人事面接')
).length;
const finalInterviewQuestions = database.questions.filter(q => 
  q.interview_type.includes('最終面接')
).length;

info.push(`人事面接の質問: ${humanResourceQuestions}問`);
info.push(`最終面接の質問: ${finalInterviewQuestions}問`);

// 9. 重要度分布のチェック
console.log('\n⭐ 重要度分布のチェック...');
const importanceDistribution = {};
[1, 2, 3, 4, 5].forEach(level => {
  importanceDistribution[level] = database.questions.filter(q => q.importance === level).length;
});

Object.entries(importanceDistribution).forEach(([level, count]) => {
  info.push(`重要度${level}の質問: ${count}問`);
});

// 10. オプションフィールドの充足率チェック
console.log('\n📋 オプションフィールドの充足率チェック...');
optionalFields.forEach(field => {
  const filledCount = database.questions.filter(q => 
    q[field] && q[field] !== '' && q[field].length > 0
  ).length;
  const fillRate = Math.round((filledCount / database.questions.length) * 100);
  
  if (fillRate === 0) {
    warnings.push(`${field} フィールドが全く埋まっていません`);
  } else {
    info.push(`${field} の充足率: ${fillRate}% (${filledCount}/${database.questions.length})`);
  }
});

// 結果レポートの生成
console.log('\n' + '='.repeat(60));
console.log('📊 バリデーション結果レポート');
console.log('='.repeat(60));

if (errors.length === 0) {
  console.log('✅ エラーはありませんでした！');
} else {
  console.log(`❌ エラー: ${errors.length}件`);
  errors.forEach(error => console.log(`  - ${error}`));
}

if (warnings.length > 0) {
  console.log(`\n⚠️ 警告: ${warnings.length}件`);
  warnings.forEach(warning => console.log(`  - ${warning}`));
}

console.log(`\n📈 統計情報:`);
info.forEach(item => console.log(`  ${item}`));

// レポートファイルの作成
const reportContent = `# 面接質問データベース バリデーションレポート

**実行日時**: ${new Date().toLocaleString('ja-JP')}
**対象ファイル**: ${jsonPath}

## 📊 結果サマリー

- **エラー**: ${errors.length}件
- **警告**: ${warnings.length}件
- **総質問数**: ${actualQuestionCount}問

## ❌ エラー詳細

${errors.length === 0 ? 'エラーはありませんでした。' : errors.map(error => `- ${error}`).join('\n')}

## ⚠️ 警告詳細

${warnings.length === 0 ? '警告はありませんでした。' : warnings.map(warning => `- ${warning}`).join('\n')}

## 📈 統計情報

${info.map(item => `- ${item}`).join('\n')}

## 🎯 推奨事項

${errors.length === 0 && warnings.length === 0 ? 
  '✅ データベースは完全に検証されました。本番使用可能です。' : 
  '上記のエラーと警告を確認し、必要に応じて修正してください。'
}
`;

const reportPath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/validation_report.md';
fs.writeFileSync(reportPath, reportContent, 'utf8');

console.log(`\n📄 詳細レポートを生成しました: ${reportPath}`);
console.log('\n✨ バリデーション完了！');

// 終了コードの設定
process.exit(errors.length > 0 ? 1 : 0);