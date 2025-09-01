const fs = require('fs');
const path = require('path');

// 新しい12ツールの完全データ
const newTools = [
  {
    "id": "AI073",
    "toolName": "V0",
    "category": "開発支援・コーディング",
    "subCategory": "AI Web UI生成",
    "companyName": "Vercel Labs",
    "officialUrl": "https://v0.dev",
    "tenEvaluation": {
      "immediacy": 92,
      "simplicity": 88,
      "popularity": 85,
      "costPerformance": 82,
      "specialization": 95,
      "productivityGain": 90,
      "totalScore": 532
    },
    "batchNumber": 10
  },
  {
    "id": "AI074", 
    "toolName": "NapkinAI",
    "category": "プレゼンテーション・資料作成",
    "subCategory": "AIビジュアルストーリーテリング", 
    "companyName": "Napkin AI",
    "officialUrl": "https://www.napkin.ai",
    "tenEvaluation": {
      "immediacy": 95,
      "simplicity": 92,
      "popularity": 78,
      "costPerformance": 88,
      "specialization": 89,
      "productivityGain": 90,
      "totalScore": 532
    },
    "batchNumber": 10
  },
  {
    "id": "AI075",
    "toolName": "Gladia",
    "category": "音声関連",
    "subCategory": "AI音声認識・文字起こし",
    "companyName": "Gladia",
    "officialUrl": "https://www.gladia.io",
    "tenEvaluation": {
      "immediacy": 98,
      "simplicity": 85,
      "popularity": 88,
      "costPerformance": 89,
      "specialization": 95,
      "productivityGain": 92,
      "totalScore": 547
    },
    "batchNumber": 10
  },
  {
    "id": "AI076",
    "toolName": "Lark",
    "category": "生産性・スケジュール管理",
    "subCategory": "統合協業プラットフォーム",
    "companyName": "ByteDance",
    "officialUrl": "https://www.larksuite.com",
    "tenEvaluation": {
      "immediacy": 85,
      "simplicity": 90,
      "popularity": 75,
      "costPerformance": 95,
      "specialization": 82,
      "productivityGain": 90,
      "totalScore": 517
    },
    "batchNumber": 10
  },
  {
    "id": "AI077",
    "toolName": "Felo",
    "category": "検索・情報収集",
    "subCategory": "AI多言語検索エンジン",
    "companyName": "Felo Inc.",
    "officialUrl": "https://felo.ai",
    "tenEvaluation": {
      "immediacy": 93,
      "simplicity": 88,
      "popularity": 72,
      "costPerformance": 89,
      "specialization": 95,
      "productivityGain": 91,
      "totalScore": 528
    },
    "batchNumber": 10
  },
  {
    "id": "AI078",
    "toolName": "ImageFX",
    "category": "画像生成・編集",
    "subCategory": "AI画像生成",
    "companyName": "Google Labs",
    "officialUrl": "https://labs.google/fx/tools/image-fx",
    "tenEvaluation": {
      "immediacy": 90,
      "simplicity": 95,
      "popularity": 88,
      "costPerformance": 100,
      "specialization": 85,
      "productivityGain": 92,
      "totalScore": 550
    },
    "batchNumber": 10
  },
  {
    "id": "AI079",
    "toolName": "イルシル",
    "category": "プレゼンテーション・資料作成",
    "subCategory": "AIスライド自動生成",
    "companyName": "株式会社イルシル",
    "officialUrl": "https://irusiru.jp",
    "tenEvaluation": {
      "immediacy": 88,
      "simplicity": 95,
      "popularity": 85,
      "costPerformance": 92,
      "specialization": 90,
      "productivityGain": 93,
      "totalScore": 543
    },
    "batchNumber": 10
  },
  {
    "id": "AI080",
    "toolName": "Recraft",
    "category": "画像生成・編集",
    "subCategory": "AIデザイン・ベクター生成",
    "companyName": "Recraft",
    "officialUrl": "https://www.recraft.ai",
    "tenEvaluation": {
      "immediacy": 87,
      "simplicity": 83,
      "popularity": 92,
      "costPerformance": 91,
      "specialization": 96,
      "productivityGain": 94,
      "totalScore": 543
    },
    "batchNumber": 10
  },
  {
    "id": "AI081",
    "toolName": "Clove note",
    "category": "ノート・記録",
    "subCategory": "AIノート・音声転写（推定）",
    "companyName": "不明",
    "officialUrl": "不明",
    "tenEvaluation": {
      "immediacy": 75,
      "simplicity": 70,
      "popularity": 45,
      "costPerformance": 60,
      "specialization": 55,
      "productivityGain": 65,
      "totalScore": 370
    },
    "batchNumber": 10,
    "note": "情報不足のため推定評価"
  },
  {
    "id": "AI082",
    "toolName": "Kling",
    "category": "動画生成・編集",
    "subCategory": "AI動画生成",
    "companyName": "快手（Kuaishou）",
    "officialUrl": "https://app.klingai.com",
    "tenEvaluation": {
      "immediacy": 85,
      "simplicity": 90,
      "popularity": 95,
      "costPerformance": 98,
      "specialization": 92,
      "productivityGain": 93,
      "totalScore": 553
    },
    "batchNumber": 10
  },
  {
    "id": "AI083",
    "toolName": "Vidu",
    "category": "動画生成・編集",
    "subCategory": "AIアニメ動画生成",
    "companyName": "生数科技（Shengshu Technology）",
    "officialUrl": "https://www.vidau.ai",
    "tenEvaluation": {
      "immediacy": 88,
      "simplicity": 85,
      "popularity": 82,
      "costPerformance": 89,
      "specialization": 95,
      "productivityGain": 91,
      "totalScore": 530
    },
    "batchNumber": 10
  },
  {
    "id": "AI084",
    "toolName": "Pika",
    "category": "動画生成・編集", 
    "subCategory": "AI動画・アニメーション生成",
    "companyName": "Pika Labs",
    "officialUrl": "https://pika.art",
    "tenEvaluation": {
      "immediacy": 92,
      "simplicity": 94,
      "popularity": 89,
      "costPerformance": 88,
      "specialization": 90,
      "productivityGain": 93,
      "totalScore": 546
    },
    "batchNumber": 10
  }
];

console.log('新しい12ツールの統計:');
console.log('総ツール数:', newTools.length);
console.log('平均TENスコア:', (newTools.reduce((sum, tool) => sum + tool.tenEvaluation.totalScore, 0) / newTools.length).toFixed(2));
console.log('最高スコア:', Math.max(...newTools.map(tool => tool.tenEvaluation.totalScore)));
console.log('最低スコア:', Math.min(...newTools.map(tool => tool.tenEvaluation.totalScore)));

const validTools = newTools.filter(tool => tool.tenEvaluation.totalScore >= 520);
console.log('520点以上のツール数:', validTools.length, '/', newTools.length);

// カテゴリ別統計
const categoryStats = {};
newTools.forEach(tool => {
  if (!categoryStats[tool.category]) {
    categoryStats[tool.category] = [];
  }
  categoryStats[tool.category].push(tool);
});

console.log('\nカテゴリ別統計:');
Object.entries(categoryStats).forEach(([category, tools]) => {
  const avgScore = tools.reduce((sum, tool) => sum + tool.tenEvaluation.totalScore, 0) / tools.length;
  console.log(`${category}: ${tools.length}ツール, 平均${avgScore.toFixed(1)}点`);
});

console.log('\n統合準備完了');