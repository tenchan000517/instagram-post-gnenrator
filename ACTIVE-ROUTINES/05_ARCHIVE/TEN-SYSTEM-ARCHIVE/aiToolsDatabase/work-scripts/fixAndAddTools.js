const fs = require('fs');

// 既存のデータを読み込み
const data = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf8'));

// バックアップを作成
fs.writeFileSync('aiToolsMasterData_backup_20250831.json', JSON.stringify(data, null, 2));

// 1. undefined問題の修正
const undefinedFixes = [
  { id: 'undefined', newId: 'AI080', toolName: 'Calendly', category: 'AI Scheduling', company: 'Calendly', url: 'https://calendly.com' },
  { id: 'undefined', newId: 'AI081', toolName: 'Loom', category: 'AI Video Recording', company: 'Loom', url: 'https://www.loom.com' },
  { id: 'undefined', newId: 'AI082', toolName: 'Zapier', category: 'AI Workflow Automation', company: 'Zapier', url: 'https://zapier.com' },
  { id: 'undefined', newId: 'AI083', toolName: 'Descript', category: 'AI Video/Audio Editing', company: 'Descript', url: 'https://www.descript.com' },
  { id: 'undefined', newId: 'AI084', toolName: 'Jasper', category: 'AI Content Generation', company: 'Jasper', url: 'https://www.jasper.ai' },
  { id: 'undefined', newId: 'AI085', toolName: 'Copy.ai', category: 'AI Content Generation', company: 'Copy.ai', url: 'https://www.copy.ai' },
  { id: 'undefined', newId: 'AI086', toolName: 'Writesonic', category: 'AI Content Generation', company: 'Writesonic', url: 'https://writesonic.com' },
  { id: '17', newId: 'AI017', toolName: 'DALL-E 3', category: 'AI Image Generation', company: 'OpenAI', url: 'https://openai.com/dall-e-3' },
  { id: '18', newId: 'AI018', toolName: 'Stable Diffusion', category: 'AI Image Generation', company: 'Stability AI', url: 'https://stability.ai' },
  { id: '19', newId: 'AI019', toolName: 'ComfyUI', category: 'Open Source AI Image Generation', company: 'Community', url: 'https://github.com/comfyanonymous/ComfyUI' },
  { id: '20', newId: 'AI020', toolName: 'Adobe Creative Cloud AI', category: 'Integrated AI Creative Suite', company: 'Adobe', url: 'https://www.adobe.com' },
  { id: '22', newId: 'AI022', toolName: 'Microsoft 365 Copilot', category: 'Integrated Productivity AI', company: 'Microsoft', url: 'https://www.microsoft.com/microsoft-365/copilot' }
];

// undefined修正
data.tools = data.tools.map(tool => {
  const fix = undefinedFixes.find(f => 
    (f.id === 'undefined' && !tool.id && tool.officialUrl === f.url) ||
    (f.id === tool.id)
  );
  
  if (fix) {
    return {
      ...tool,
      id: fix.newId,
      toolName: fix.toolName,
      companyName: fix.company,
      officialUrl: fix.url
    };
  }
  return tool;
});

// 2. 重複削除（最初の出現のみ保持）
const seenTools = new Set();
const uniqueTools = [];

data.tools.forEach(tool => {
  const key = `${tool.toolName}_${tool.id}`;
  if (!seenTools.has(key)) {
    seenTools.add(key);
    uniqueTools.push(tool);
  }
});

data.tools = uniqueTools;

// 3. 新しいツールを追加
const newTools = [
  {
    id: "AI087",
    toolName: "Genspark",
    category: "AI検索・リサーチ",
    subCategory: "AIパワード検索エンジン",
    companyName: "Mainfunc Inc.",
    officialUrl: "https://genspark.ai",
    releaseInfo: {
      initialRelease: "2023-09",
      latestUpdate: "2025-04",
      version: "Super Agent System",
      developmentStatus: "Active"
    },
    userMetrics: {
      userCount: 5000000,
      monthlyActiveUsers: 2000000,
      downloadCount: null,
      githubStars: null,
      appStoreRating: null,
      userReviews: {
        positive: 92,
        neutral: 6,
        negative: 2
      }
    },
    technicalMetrics: {
      responseTime: "1-30分（Deep Research）",
      accuracy: 98,
      supportedLanguages: 20,
      platformIntegration: ["Web", "Mobile", "API"],
      apiAvailable: true,
      sdkAvailable: false
    },
    pricingModel: {
      free: true,
      freeTierLimit: "無制限（現在）",
      subscription: {
        basic: 0,
        professional: null,
        enterprise: null
      },
      payAsYouGo: false,
      customPricing: true
    },
    tenEvaluation: {
      immediacy: 95,
      simplicity: 90,
      popularity: 85,
      costPerformance: 100,
      specialization: 95,
      productivityGain: 90,
      totalScore: 555
    }
  },
  {
    id: "AI088",
    toolName: "Veo 3",
    category: "動画生成・編集",
    subCategory: "AI動画生成",
    companyName: "Google DeepMind",
    officialUrl: "https://deepmind.google/models/veo/",
    releaseInfo: {
      initialRelease: "2024-05",
      latestUpdate: "2025-05",
      version: "Veo 3",
      developmentStatus: "Active"
    },
    userMetrics: {
      userCount: 50000000,
      monthlyActiveUsers: 10000000,
      downloadCount: null,
      githubStars: null,
      appStoreRating: 4.6,
      userReviews: {
        positive: 88,
        neutral: 8,
        negative: 4
      }
    },
    technicalMetrics: {
      responseTime: "30-120秒",
      accuracy: 95,
      supportedLanguages: 50,
      platformIntegration: ["Gemini", "Vertex AI", "API"],
      apiAvailable: true,
      sdkAvailable: true
    },
    pricingModel: {
      free: false,
      freeTierLimit: "Gemini無料枠内",
      subscription: {
        basic: 20,
        professional: 50,
        enterprise: "Custom"
      },
      payAsYouGo: true,
      customPricing: true
    },
    tenEvaluation: {
      immediacy: 80,
      simplicity: 85,
      popularity: 95,
      costPerformance: 75,
      specialization: 100,
      productivityGain: 95,
      totalScore: 530
    }
  },
  {
    id: "AI089",
    toolName: "tl;dv",
    category: "会議・コミュニケーション",
    subCategory: "会議録画・要約",
    companyName: "tl;dv",
    officialUrl: "https://tldv.io",
    releaseInfo: {
      initialRelease: "2021-03",
      latestUpdate: "2025-08",
      version: "5.0",
      developmentStatus: "Active"
    },
    userMetrics: {
      userCount: 1000000,
      monthlyActiveUsers: 500000,
      downloadCount: null,
      githubStars: null,
      appStoreRating: 4.7,
      userReviews: {
        positive: 91,
        neutral: 6,
        negative: 3
      }
    },
    technicalMetrics: {
      responseTime: "リアルタイム",
      accuracy: 96,
      supportedLanguages: 30,
      platformIntegration: ["Zoom", "Google Meet", "Teams", "Slack", "Salesforce"],
      apiAvailable: true,
      sdkAvailable: false
    },
    pricingModel: {
      free: true,
      freeTierLimit: "無制限録画・要約",
      subscription: {
        basic: 0,
        professional: 18,
        enterprise: 59
      },
      payAsYouGo: false,
      customPricing: true
    },
    tenEvaluation: {
      immediacy: 90,
      simplicity: 95,
      popularity: 80,
      costPerformance: 90,
      specialization: 90,
      productivityGain: 95,
      totalScore: 540
    }
  },
  {
    id: "AI090",
    toolName: "CrewAI",
    category: "開発支援・コーディング",
    subCategory: "マルチエージェントフレームワーク",
    companyName: "CrewAI Inc.",
    officialUrl: "https://www.crewai.com",
    releaseInfo: {
      initialRelease: "2023-11",
      latestUpdate: "2025-08",
      version: "2.0",
      developmentStatus: "Active"
    },
    userMetrics: {
      userCount: 500000,
      monthlyActiveUsers: 100000,
      downloadCount: 1000000,
      githubStars: 30500,
      appStoreRating: null,
      userReviews: {
        positive: 85,
        neutral: 10,
        negative: 5
      }
    },
    technicalMetrics: {
      responseTime: "変動",
      accuracy: 90,
      supportedLanguages: 15,
      platformIntegration: ["Python", "LangChain", "OpenAI", "Anthropic"],
      apiAvailable: true,
      sdkAvailable: true
    },
    pricingModel: {
      free: true,
      freeTierLimit: "コア機能",
      subscription: {
        basic: 0,
        professional: 50,
        enterprise: "Custom"
      },
      payAsYouGo: true,
      customPricing: true
    },
    tenEvaluation: {
      immediacy: 60,
      simplicity: 50,
      popularity: 85,
      costPerformance: 80,
      specialization: 100,
      productivityGain: 90,
      totalScore: 465
    }
  },
  {
    id: "AI091",
    toolName: "Manus",
    category: "AI会話・アシスタント",
    subCategory: "汎用自律AIエージェント",
    companyName: "Monica (Manus AI)",
    officialUrl: "https://manus.im",
    releaseInfo: {
      initialRelease: "2025-03",
      latestUpdate: "2025-08",
      version: "1.0 Beta",
      developmentStatus: "Beta"
    },
    userMetrics: {
      userCount: 100000,
      monthlyActiveUsers: 50000,
      downloadCount: null,
      githubStars: null,
      appStoreRating: null,
      userReviews: {
        positive: 93,
        neutral: 5,
        negative: 2
      }
    },
    technicalMetrics: {
      responseTime: "5-60秒",
      accuracy: 92,
      supportedLanguages: 10,
      platformIntegration: ["Claude 3.5", "Qwen", "Web"],
      apiAvailable: false,
      sdkAvailable: false
    },
    pricingModel: {
      free: false,
      freeTierLimit: null,
      subscription: {
        basic: 99,
        professional: 499,
        enterprise: "Custom"
      },
      payAsYouGo: false,
      customPricing: true
    },
    tenEvaluation: {
      immediacy: 40,
      simplicity: 85,
      popularity: 90,
      costPerformance: 70,
      specialization: 100,
      productivityGain: 95,
      totalScore: 480
    }
  }
];

// 新しいツールを追加
data.tools.push(...newTools);

// ツール数を更新
data.totalTools = data.tools.length;

// ファイルを保存
fs.writeFileSync('aiToolsMasterData.json', JSON.stringify(data, null, 2));

console.log('✅ データベース修正完了:');
console.log(`- undefined修正: ${undefinedFixes.length}件`);
console.log(`- 新規追加: ${newTools.length}件`);
console.log(`- 総ツール数: ${data.totalTools}件`);