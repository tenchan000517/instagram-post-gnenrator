const fs = require('fs');

// JSONファイルを読み込み
const data = JSON.parse(fs.readFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/interview-question/面接質問データベース.json', 'utf8'));

// 企画別質問数を計算
const questions = data.questions;

// 企画1: frequency >= 4
const pattern1 = questions.filter(q => q.frequency >= 4);
console.log('企画1（面接で絶対に聞かれる質問）:', pattern1.length + '問');

// 企画2: importance = 5 AND frequency <= 3
const pattern2 = questions.filter(q => q.importance === 5 && q.frequency <= 3);
console.log('企画2（面接で差がつく想定外の質問）:', pattern2.length + '問');

// 企画3: difficulty >= 4
const pattern3 = questions.filter(q => q.difficulty >= 4);
console.log('企画3（準備してないと答えられない質問）:', pattern3.length + '問');

// 企画4: importance >= 4 AND difficulty >= 3
const pattern4 = questions.filter(q => q.importance >= 4 && q.difficulty >= 3);
console.log('企画4（面接で差がつく質問）:', pattern4.length + '問');

// カテゴリ別統計
const categories = [...new Set(questions.map(q => q.category))];
console.log('\n=== カテゴリ別内訳 ===');

categories.forEach(category => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const cat1 = categoryQuestions.filter(q => q.frequency >= 4).length;
    const cat2 = categoryQuestions.filter(q => q.importance === 5 && q.frequency <= 3).length;
    const cat3 = categoryQuestions.filter(q => q.difficulty >= 4).length;
    const cat4 = categoryQuestions.filter(q => q.importance >= 4 && q.difficulty >= 3).length;
    
    console.log(`${category}: 企画1=${cat1}問, 企画2=${cat2}問, 企画3=${cat3}問, 企画4=${cat4}問`);
});

// 投稿数計算（3問1セット）
console.log('\n=== 投稿数計算 ===');
console.log('グローバル投稿数:');
console.log(`企画1: ${Math.floor(pattern1.length / 3)}投稿`);
console.log(`企画2: ${Math.floor(pattern2.length / 3)}投稿`);
console.log(`企画3: ${Math.floor(pattern3.length / 3)}投稿`);
console.log(`企画4: ${Math.floor(pattern4.length / 3)}投稿`);

let totalCategoryPosts = 0;
categories.forEach(category => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const cat1 = Math.floor(categoryQuestions.filter(q => q.frequency >= 4).length / 3);
    const cat2 = Math.floor(categoryQuestions.filter(q => q.importance === 5 && q.frequency <= 3).length / 3);
    const cat3 = Math.floor(categoryQuestions.filter(q => q.difficulty >= 4).length / 3);
    const cat4 = Math.floor(categoryQuestions.filter(q => q.importance >= 4 && q.difficulty >= 3).length / 3);
    
    const categoryTotal = cat1 + cat2 + cat3 + cat4;
    totalCategoryPosts += categoryTotal;
    console.log(`${category}: ${categoryTotal}投稿`);
});

const globalTotal = Math.floor(pattern1.length / 3) + Math.floor(pattern2.length / 3) + Math.floor(pattern3.length / 3) + Math.floor(pattern4.length / 3);
console.log(`\n総投稿数: グローバル${globalTotal}投稿 + カテゴリ別${totalCategoryPosts}投稿 = ${globalTotal + totalCategoryPosts}投稿`);