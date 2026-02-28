const fs = require('fs');
const path = require('path');

// ファイルパス設定
const jsonPath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問データベース.json';
const humanResourcePath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/RESOURCES/career-roadmap/06面接質問/事例/面接質問事例①人事面接.md';
const finalInterviewPath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/RESOURCES/career-roadmap/06面接質問/事例/面接質問事例②最終面接.md';

// JSONファイルを読み込み
console.log('📖 JSONファイルを読み込み中...');
const database = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 事例ファイルから模範解答を抽出する関数
function extractAnswersFromFile(filePath, startQ, endQ) {
  console.log(`📄 ${path.basename(filePath)}を読み込み中...`);
  const content = fs.readFileSync(filePath, 'utf8');
  const answers = {};
  
  // 質問番号の範囲をループ
  for (let i = startQ; i <= endQ; i++) {
    const qNum = `Q${i}`;
    const qNumPadded = `Q${String(i).padStart(3, '0')}`;
    
    // Q番号のパターンを探す（例: **Q1.** または **Q51.**)
    const questionPattern = new RegExp(`\\*\\*${qNum}\\..*?\\*\\*([\\s\\S]*?)(?=\\*\\*Q\\d+\\.|$)`, 'g');
    const match = questionPattern.exec(content);
    
    if (match) {
      const section = match[1];
      
      // 模範解答を抽出（**: で囲まれた「」内のテキスト）
      const goodAnswerMatch = section.match(/\*\*模範解答\*\*:\s*「([^」]*)」/);
      const goodAnswer = goodAnswerMatch ? goodAnswerMatch[1].trim() : '';
      
      // 評価ポイントを抽出（**: で囲まれたテキスト）
      const evalPointsMatch = section.match(/\*\*評価ポイント\*\*:\s*([^*]*)/);
      const evaluationPoints = evalPointsMatch ? evalPointsMatch[1].trim() : '';
      
      answers[qNumPadded] = {
        good_answer: goodAnswer,
        bad_answer: '', // 空文字列で固定
        evaluation_points: evaluationPoints
      };
      
      if (goodAnswer) {
        console.log(`✅ ${qNumPadded}: 模範解答を抽出しました`);
      } else {
        console.log(`⚠️ ${qNumPadded}: 模範解答が見つかりませんでした`);
      }
    } else {
      console.log(`❌ ${qNumPadded}: 質問が見つかりませんでした`);
    }
  }
  
  return answers;
}

// 人事面接（Q1-Q50）の模範解答を抽出
console.log('\n🔍 人事面接（Q1-Q50）の模範解答を抽出中...');
const humanResourceAnswers = extractAnswersFromFile(humanResourcePath, 1, 50);

// 最終面接（Q51-Q100）の模範解答を抽出
console.log('\n🔍 最終面接（Q51-Q100）の模範解答を抽出中...');
const finalInterviewAnswers = extractAnswersFromFile(finalInterviewPath, 51, 100);

// すべての回答を統合
const allAnswers = { ...humanResourceAnswers, ...finalInterviewAnswers };

// データベースに模範解答を追加
console.log('\n📝 データベースに模範解答を追加中...');
let updatedCount = 0;
let notFoundCount = 0;

database.questions = database.questions.map(question => {
  if (allAnswers[question.id]) {
    updatedCount++;
    return {
      ...question,
      ...allAnswers[question.id]
    };
  } else {
    notFoundCount++;
    console.log(`⚠️ ${question.id}: 模範解答データが見つかりませんでした`);
    // 模範解答が見つからない場合も、フィールドは追加（空文字列）
    return {
      ...question,
      good_answer: '',
      bad_answer: '',
      evaluation_points: ''
    };
  }
});

// 更新されたJSONを保存
const outputPath = '/mnt/c/instagram-course/instagram-post-generator/INTEGRATED-SYSTEM/LAUNCH/reel-posts/面接質問データベース_完成版.json';
fs.writeFileSync(outputPath, JSON.stringify(database, null, 2), 'utf8');

// 結果レポート
console.log('\n' + '='.repeat(50));
console.log('📊 処理結果レポート');
console.log('='.repeat(50));
console.log(`✅ 模範解答を追加した質問数: ${updatedCount}問`);
console.log(`⚠️ 模範解答が見つからなかった質問数: ${notFoundCount}問`);
console.log(`📁 出力ファイル: ${outputPath}`);
console.log('\n✨ 処理が完了しました！');

// 簡易的な統計情報
const questionsWithAnswers = database.questions.filter(q => q.good_answer && q.good_answer.length > 0);
const questionsWithEval = database.questions.filter(q => q.evaluation_points && q.evaluation_points.length > 0);

console.log('\n📈 データベース統計');
console.log(`- 総質問数: ${database.questions.length}問`);
console.log(`- 模範解答がある質問: ${questionsWithAnswers.length}問`);
console.log(`- 評価ポイントがある質問: ${questionsWithEval.length}問`);