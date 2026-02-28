const fs = require('fs');
const badAnswersImproved = require('./bad_answers_database_improved.js');

// ファイルパス設定
const inputPath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問データベース_完成版.json';
const outputPath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問データベース.json';

console.log('📖 面接質問データベースに改善された悪い例を追加します...\n');

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

// 改善された悪い例を追加
console.log('\n📝 各質問に改善された悪い例を追加中...');
let addedCount = 0;
let notFoundCount = 0;

database.questions = database.questions.map(question => {
  const questionId = question.id;
  
  if (badAnswersImproved[questionId]) {
    addedCount++;
    console.log(`✅ ${questionId}: 改善された悪い例を追加`);
    
    return {
      ...question,
      bad_answer: badAnswersImproved[questionId]
    };
  } else {
    notFoundCount++;
    console.log(`⚠️ ${questionId}: 悪い例が見つかりません`);
    
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
  database.metadata.description = '面接質問100問データベース（模範解答・改善された悪い例・評価ポイント完備）';
  database.metadata.bad_answer_type = 'realistic_problematic';
  database.metadata.bad_answer_philosophy = '評価ポイントに対して守ってない、一見普通に聞こえる回答例';
}

// 最終版データベースを保存
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
console.log('📊 改善された悪い例追加処理完了レポート');
console.log('='.repeat(60));
console.log(`📁 入力ファイル: ${inputPath}`);
console.log(`📁 出力ファイル: ${outputPath}`);
console.log('');
console.log('📈 処理結果:');
console.log(`  ✅ 改善された悪い例を追加した質問: ${addedCount}問`);
console.log(`  ⚠️ 悪い例が見つからなかった質問: ${notFoundCount}問`);
console.log('');
console.log('📊 最終データベース完成度:');
console.log(`  - 総質問数: ${database.questions.length}問`);
console.log(`  - 模範解答完備: ${questionsWithGoodAnswers}問 (${Math.round(questionsWithGoodAnswers/database.questions.length*100)}%)`);
console.log(`  - 悪い例完備: ${questionsWithBadAnswers}問 (${Math.round(questionsWithBadAnswers/database.questions.length*100)}%)`);
console.log(`  - 評価ポイント完備: ${questionsWithEvalPoints}問 (${Math.round(questionsWithEvalPoints/database.questions.length*100)}%)`);

// 完成度チェック
const isComplete = questionsWithGoodAnswers >= 85 && questionsWithBadAnswers === 100 && questionsWithEvalPoints >= 85;

console.log('\n🎯 悪い例の改善ポイント:');
console.log('  ✅ 評価ポイントに対して「守ってない」回答');
console.log('  ✅ 一見普通に聞こえるが実は問題がある例');
console.log('  ✅ 学生が実際に陥りがちな間違い');
console.log('  ✅ 実践的で学習価値の高い内容');

if (isComplete) {
  console.log('\n🎉 面接質問データベースが完全に完成しました！');
  console.log('✅ 本番環境での使用が可能です');
  console.log('📚 学習効果の高い悪い例により、実践的な面接対策が可能');
} else {
  console.log('\n⚠️ データベースに不完全な部分があります');
  console.log('🔧 追加の作業が必要な可能性があります');
}

// サンプル表示（Q001の例）
console.log('\n📋 改善例サンプル（Q001）:');
const q001 = database.questions.find(q => q.id === 'Q001');
if (q001) {
  console.log('【質問】', q001.question);
  console.log('【悪い例】', q001.bad_answer.substring(0, 100) + '...');
  console.log('【問題点】抽象的で具体的成果なし、印象に残らない');
}

console.log('\n✨ 処理完了！');
console.log('📁 最終ファイル: 面接質問データベース.json');