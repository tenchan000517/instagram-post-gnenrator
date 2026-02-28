const fs = require('fs');
const badAnswers = require('./bad_answers_database.js');

// ファイルパス設定
const inputPath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問データベース_完成版.json';
const outputPath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問データベース_最終版.json';

console.log('📖 面接質問データベースに悪い例を追加します...\n');

// JSONファイルを読み込み
console.log('📄 データベースファイルを読み込み中...');
let database;
try {
  database = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  console.log('✅ データベース読み込み成功');
} catch (error) {
  console.log('❌ データベース読み込み失敗:', error.message);
  process.exit(1);
}

console.log(`📊 現在の質問数: ${database.questions.length}問`);

// 悪い例を追加
console.log('\n📝 各質問に悪い例を追加中...');
let addedCount = 0;
let notFoundCount = 0;

database.questions = database.questions.map(question => {
  const questionId = question.id;
  
  if (badAnswers[questionId]) {
    addedCount++;
    console.log(`✅ ${questionId}: 悪い例を追加`);
    
    return {
      ...question,
      bad_answer: badAnswers[questionId]
    };
  } else {
    notFoundCount++;
    console.log(`⚠️ ${questionId}: 悪い例が見つかりません`);
    
    // 悪い例が見つからない場合も、フィールドは存在させる
    return {
      ...question,
      bad_answer: question.bad_answer || ''
    };
  }
});

// メタデータの更新
console.log('\n📊 メタデータを更新中...');
if (database.metadata) {
  database.metadata.last_updated = new Date().toISOString().split('T')[0];
  database.metadata.version = '1.0.0';
  database.metadata.description = '面接質問100問データベース（模範解答・悪い例・評価ポイント完備）';
  database.metadata.contains_bad_answers = true;
}

// 完成版データベースを保存
console.log('\n💾 最終版データベースを保存中...');
try {
  fs.writeFileSync(outputPath, JSON.stringify(database, null, 2), 'utf8');
  console.log('✅ 保存完了');
} catch (error) {
  console.log('❌ 保存失敗:', error.message);
  process.exit(1);
}

// データの品質チェック
console.log('\n🔍 データ品質チェック...');
const questionsWithGoodAnswers = database.questions.filter(q => q.good_answer && q.good_answer.length > 0).length;
const questionsWithBadAnswers = database.questions.filter(q => q.bad_answer && q.bad_answer.length > 0).length;
const questionsWithEvalPoints = database.questions.filter(q => q.evaluation_points && q.evaluation_points.length > 0).length;

// 結果レポート
console.log('\n' + '='.repeat(60));
console.log('📊 悪い例追加処理完了レポート');
console.log('='.repeat(60));
console.log(`📁 入力ファイル: ${inputPath}`);
console.log(`📁 出力ファイル: ${outputPath}`);
console.log('');
console.log('📈 処理結果:');
console.log(`  ✅ 悪い例を追加した質問: ${addedCount}問`);
console.log(`  ⚠️ 悪い例が見つからなかった質問: ${notFoundCount}問`);
console.log('');
console.log('📊 データ完成度:');
console.log(`  - 総質問数: ${database.questions.length}問`);
console.log(`  - 模範解答がある質問: ${questionsWithGoodAnswers}問 (${Math.round(questionsWithGoodAnswers/database.questions.length*100)}%)`);
console.log(`  - 悪い例がある質問: ${questionsWithBadAnswers}問 (${Math.round(questionsWithBadAnswers/database.questions.length*100)}%)`);
console.log(`  - 評価ポイントがある質問: ${questionsWithEvalPoints}問 (${Math.round(questionsWithEvalPoints/database.questions.length*100)}%)`);

// 完成度チェック
const isComplete = questionsWithGoodAnswers >= 85 && questionsWithBadAnswers === 100 && questionsWithEvalPoints >= 85;

if (isComplete) {
  console.log('\n🎉 データベースが完成しました！');
  console.log('✅ 本番環境での使用が可能です');
} else {
  console.log('\n⚠️ データベースに不完全な部分があります');
  console.log('🔧 追加の作業が必要な可能性があります');
}

console.log('\n✨ 処理完了！');

// 簡易統計の出力
console.log('\n📈 追加統計情報:');

// カテゴリ別の完成度
const categories = [...new Set(database.questions.map(q => q.category))];
console.log('\n📋 カテゴリ別完成度:');
categories.forEach(category => {
  const categoryQuestions = database.questions.filter(q => q.category === category);
  const withBadAnswers = categoryQuestions.filter(q => q.bad_answer && q.bad_answer.length > 0).length;
  const completionRate = Math.round(withBadAnswers / categoryQuestions.length * 100);
  console.log(`  ${category}: ${withBadAnswers}/${categoryQuestions.length}問 (${completionRate}%)`);
});

// 重要度別の統計
console.log('\n⭐ 重要度別統計:');
[5, 4, 3, 2, 1].forEach(importance => {
  const importanceQuestions = database.questions.filter(q => q.importance === importance);
  const withBadAnswers = importanceQuestions.filter(q => q.bad_answer && q.bad_answer.length > 0).length;
  console.log(`  重要度${importance}: ${withBadAnswers}/${importanceQuestions.length}問完成`);
});

console.log('\n' + '='.repeat(60));