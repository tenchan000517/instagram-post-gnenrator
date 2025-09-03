const fs = require('fs');

// マスターデータを読み込み
const data = JSON.parse(fs.readFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData.json', 'utf8'));

console.log('=== 大規模スコア調整開始 ===');

// 調整対象ツールとその新スコア
const adjustments = [
  // スコア下げ調整
  { name: 'GitHub Copilot', newScore: 520, reason: '★3相当に下方修正' },
  { name: 'Jasper', newScore: 525, reason: '★4のギリギリスコアに調整' },
  { name: 'Genspark', newScore: 545, reason: '10点下げ調整' },
  { name: 'Character.AI', newScore: 523, reason: '10点下げ調整' },
  { name: 'Writesonic', newScore: 525, reason: '15点下げ調整' },
  { name: 'Midjourney', newScore: 530, reason: '10点下げ調整' },
  { name: 'Notion AI', newScore: 535, reason: 'スコア微調整' },
  
  // スコア上げ調整
  { name: 'Perplexity', newScore: 545, reason: '★4相当に上方修正' },
  { name: 'Gemini', newScore: 558, reason: 'ChatGPTに次ぐスコアに上方修正' }
];

// バックアップを作成
fs.writeFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData_before_massive_adjustment.json', JSON.stringify(data, null, 2));

let adjustedCount = 0;

// スコア調整を適用
data.tools = data.tools.map(tool => {
  const adjustment = adjustments.find(adj => adj.name === tool.toolName);
  
  if (adjustment) {
    const oldScore = tool.tenEvaluation.totalScore;
    const scoreDiff = adjustment.newScore - oldScore;
    
    // 各項目のスコアを均等調整
    const perItemAdjustment = Math.round(scoreDiff / 6);
    
    const newEvaluation = {
      immediacy: Math.max(40, Math.min(100, tool.tenEvaluation.immediacy + perItemAdjustment)),
      simplicity: Math.max(40, Math.min(100, tool.tenEvaluation.simplicity + perItemAdjustment)),
      popularity: Math.max(40, Math.min(100, tool.tenEvaluation.popularity + perItemAdjustment)),
      costPerformance: Math.max(40, Math.min(100, tool.tenEvaluation.costPerformance + perItemAdjustment)),
      specialization: Math.max(40, Math.min(100, tool.tenEvaluation.specialization + perItemAdjustment)),
      productivityGain: Math.max(40, Math.min(100, tool.tenEvaluation.productivityGain + perItemAdjustment))
    };
    
    const actualTotal = Object.values(newEvaluation).reduce((sum, val) => sum + val, 0);
    
    console.log(`${tool.toolName}: ${oldScore}点 → ${actualTotal}点 (${adjustment.reason})`);
    adjustedCount++;
    
    return {
      ...tool,
      tenEvaluation: {
        ...newEvaluation,
        totalScore: actualTotal
      }
    };
  }
  
  return tool;
});

// Canvaを新規追加
const canvaTool = {
  "id": "AI092",
  "toolName": "Canva",
  "category": "AI統合デザインプラットフォーム",
  "subCategory": "総合デザイン・コンテンツ作成",
  "companyName": "Canva Pty Ltd",
  "officialUrl": "https://www.canva.com/",
  "releaseInfo": {
    "initialRelease": "2013-01",
    "latestUpdate": "2025-08",
    "version": "Magic Studio 2025",
    "developmentStatus": "Active"
  },
  "userMetrics": {
    "userCount": 220000000,
    "monthlyActiveUsers": 220000000,
    "downloadCount": null,
    "githubStars": null,
    "appStoreRating": 4.7,
    "userReviews": {
      "positive": 89,
      "neutral": 8,
      "negative": 3
    }
  },
  "technicalMetrics": {
    "responseTime": "即時",
    "accuracy": 92,
    "supportedLanguages": 100,
    "platformIntegration": ["Web", "Mobile", "Desktop", "API"],
    "apiAvailable": true,
    "sdkAvailable": true
  },
  "pricingModel": {
    "free": true,
    "freeTierLimit": "基本機能",
    "subscription": {
      "basic": 0,
      "professional": 12.99,
      "enterprise": "Custom"
    },
    "payAsYouGo": false,
    "customPricing": true
  },
  "tenEvaluation": {
    "immediacy": 92,
    "simplicity": 95,
    "popularity": 89,
    "costPerformance": 88,
    "specialization": 91,
    "productivityGain": 93,
    "totalScore": 548
  }
};

data.tools.push(canvaTool);
data.totalTools = data.tools.length;

console.log(`\n✅ Canvaを新規追加しました (548点)`);

// 調整されたデータを保存
fs.writeFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData.json', JSON.stringify(data, null, 2));

console.log(`\n✅ ${adjustedCount}ツールのスコアを調整しました`);
console.log(`総ツール数: ${data.totalTools}`);

// 調整後のTOP15を表示
console.log('\n=== 調整後のTOP15予想 ===');
const adjustedTools = data.tools
  .filter(tool => tool.tenEvaluation && tool.tenEvaluation.totalScore)
  .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);

adjustedTools.slice(0, 15).forEach((tool, index) => {
  console.log(`${index + 1}. ${tool.toolName}: ${tool.tenEvaluation.totalScore}点`);
});