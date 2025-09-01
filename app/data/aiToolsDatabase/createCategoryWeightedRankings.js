#!/usr/bin/env node
/**
 * カテゴリ重要度補正ランキング生成システム
 * 
 * 目的: 
 * - 総合ランキングで汎用AI（ChatGPT・Claude）を上位に
 * - 特化ツール（Remove.bg等）の過度な上位進出を抑制
 * - 用途別ランキングで適切な結果を確保
 */

const fs = require('fs');
const path = require('path');

const MASTER_DATA_FILE = path.join(__dirname, 'aiToolsMasterData.json');
const OUTPUT_DIR = path.join(__dirname, 'rankingsV2');

// カテゴリ重要度定義（総合ランキング用）
const CATEGORY_WEIGHTS = {
  // 汎用・対話AI（最高重要度）
  "AI会話・アシスタント": 1.0,
  "汎用AIアシスタント": 1.0,
  "AI対話・チャット": 1.0,
  
  // コンテンツ生成・ビジネス活用（高重要度）
  "AI Content Generation": 0.95,
  "AI Writing Assistance": 0.95,
  "AIコンテンツ生成": 0.95,
  "AI文章生成・校正": 0.95,
  
  // 開発・API（高重要度）
  "AI API・開発者向けプラットフォーム": 0.9,
  "AIモデルプラットフォーム・コミュニティ": 0.9,
  "開発支援・コーディング": 0.9,
  "AI開発・実験": 0.9,
  
  // マルチプラットフォーム（高重要度）
  "マルチAIプラットフォーム": 0.9,
  "AI統合デザインプラットフォーム": 0.85,
  
  // 画像・動画・音声制作（中重要度）
  "AI Image Generation": 0.8,
  "AI画像生成": 0.8,
  "動画作成・編集": 0.8,
  "AI動画生成・編集": 0.8,
  "音声生成": 0.75,
  "音声生成・処理": 0.75,
  "音声認識・転写": 0.7,
  
  // ビジネスツール（中重要度）
  "AI Scheduling": 0.8,
  "AI Workflow Automation": 0.8,
  "AI Video/Audio Editing": 0.75,
  "AI Video Recording": 0.75,
  
  // 検索・情報収集（中重要度）
  "AI検索・チャット": 0.75,
  "AI検索・統合アシスタント": 0.75,
  "検索・情報収集": 0.7,
  
  // 特化・単機能ツール（低重要度）
  "AI 画像編集・加工": 0.6,
  "AI背景除去ツール": 0.6,
  "AI ロゴ・ブランドデザイン": 0.65,
  "AIロゴジェネレーター": 0.65,
  "AI 会社名・ブランド名生成": 0.6,
  "AIネーミングジェネレーター": 0.6,
  
  // その他・未分類
  "Unknown": 0.5
};

// 用途別ランキングパターン定義
const PURPOSE_RANKINGS = {
  "汎用AI": {
    title: "汎用AI・対話AITOP10",
    description: "ChatGPT・Claude等の汎用対話AIランキング",
    categories: ["AI会話・アシスタント", "汎用AIアシスタント", "AI対話・チャット", "マルチAIプラットフォーム"],
    filename: "汎用AI対話AITOP10.json"
  },
  "ビジネス生産性": {
    title: "ビジネス生産性AITOP10", 
    description: "業務効率化・コンテンツ生成AI",
    categories: ["AI Content Generation", "AI Writing Assistance", "AI Scheduling", "AI Workflow Automation"],
    filename: "ビジネス生産性AITOP10.json"
  },
  "開発者向け": {
    title: "開発者向けAITOP10",
    description: "API・開発支援・コーディングAI",  
    categories: ["AI API・開発者向けプラットフォーム", "AIモデルプラットフォーム・コミュニティ", "開発支援・コーディング", "AI開発・実験"],
    filename: "開発者向けAITOP10.json"
  },
  "クリエイティブ": {
    title: "クリエイティブAITOP10",
    description: "画像・動画・音声制作AI",
    categories: ["AI Image Generation", "AI画像生成", "動画作成・編集", "AI動画生成・編集", "音声生成", "音声生成・処理"],
    filename: "クリエイティブAITOP10.json"
  },
  "特化ツール": {
    title: "特化・専門ツールTOP10",
    description: "特定用途に特化した高性能AI",
    categories: ["AI 画像編集・加工", "AI ロゴ・ブランドデザイン", "音声認識・転写", "AI 会社名・ブランド名生成"],
    filename: "特化専門ツールTOP10.json"
  }
};

function createWeightedRankings() {
  console.log('🚀 カテゴリ重要度補正ランキング生成開始');
  console.log('='.repeat(60));
  
  if (!fs.existsSync(MASTER_DATA_FILE)) {
    console.log('❌ マスターデータファイルが見つかりません');
    return false;
  }
  
  try {
    // マスターデータ読み込み
    const masterData = JSON.parse(fs.readFileSync(MASTER_DATA_FILE, 'utf8'));
    const tools = masterData.tools || [];
    
    if (tools.length === 0) {
      console.log('❌ ツールデータが見つかりません');
      return false;
    }
    
    console.log(`📊 ${tools.length}ツールを処理開始`);
    
    // 出力ディレクトリ作成
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // 1. 総合ランキング（重要度補正版）
    generateWeightedOverallRanking(tools);
    
    // 2. 用途別ランキング
    generatePurposeBasedRankings(tools);
    
    console.log('\n🎉 全ランキング生成完了！');
    return true;
    
  } catch (error) {
    console.log(`❌ エラー: ${error.message}`);
    return false;
  }
}

function generateWeightedOverallRanking(tools) {
  console.log('\n📈 総合ランキング（重要度補正版）生成中...');
  
  // 各ツールに補正スコアを計算
  const weightedTools = tools.map(tool => {
    const category = tool.category || 'Unknown';
    const weight = CATEGORY_WEIGHTS[category] || CATEGORY_WEIGHTS['Unknown'];
    const originalScore = tool.tenEvaluation?.totalScore || 0;
    const weightedScore = Math.round(originalScore * weight);
    
    return {
      ...tool,
      categoryWeight: weight,
      weightedTotalScore: weightedScore,
      originalTotalScore: originalScore
    };
  });
  
  // 補正スコアでソート
  const topTools = weightedTools
    .sort((a, b) => b.weightedTotalScore - a.weightedTotalScore)
    .slice(0, 10);
  
  console.log('🏆 補正後TOP10:');
  topTools.forEach((tool, index) => {
    const toolName = tool.toolName || tool.name || 'Unknown';
    console.log(`   ${index + 1}. ${toolName}: ${tool.weightedTotalScore}点 (元:${tool.originalTotalScore}, 重み:${tool.categoryWeight})`);
  });
  
  // ファイル保存
  const rankingData = {
    version: "V2-2025-08-31",
    rankingType: "総合ランキング（重要度補正版）",
    description: "カテゴリ重要度を考慮した総合ランキング。汎用AI・ビジネス活用AIを重視。",
    generatedDate: new Date().toISOString(),
    totalCandidates: tools.length,
    selectedCount: topTools.length,
    categoryWeights: CATEGORY_WEIGHTS,
    ranking: topTools.map((tool, index) => {
      const toolName = tool.toolName || tool.name || 'Unknown';
      return {
        rank: index + 1,
        toolName: toolName,
        category: tool.category,
        weightedScore: tool.weightedTotalScore,
        originalScore: tool.originalTotalScore,
        categoryWeight: tool.categoryWeight,
        tenEvaluation: tool.tenEvaluation,
        companyName: tool.companyName,
        officialUrl: tool.officialUrl
      };
    })
  };
  
  const outputFile = path.join(OUTPUT_DIR, '総合ランキング_重要度補正版TOP10.json');
  fs.writeFileSync(outputFile, JSON.stringify(rankingData, null, 2), 'utf8');
  console.log(`✅ 保存完了: ${outputFile}`);
}

function generatePurposeBasedRankings(tools) {
  console.log('\n🎯 用途別ランキング生成中...');
  
  Object.entries(PURPOSE_RANKINGS).forEach(([purposeKey, config]) => {
    console.log(`\n📋 ${config.title} 生成中...`);
    
    // 該当カテゴリのツールをフィルタリング
    const categoryTools = tools.filter(tool => {
      const category = tool.category || 'Unknown';
      return config.categories.includes(category);
    });
    
    if (categoryTools.length === 0) {
      console.log(`   ⚠️  該当ツールなし`);
      // 空のランキングファイル作成
      const emptyRanking = {
        version: "V2-2025-08-31",
        rankingType: config.title,
        description: config.description,
        generatedDate: new Date().toISOString(),
        targetCategories: config.categories,
        totalCandidates: 0,
        selectedCount: 0,
        ranking: []
      };
      
      const outputFile = path.join(OUTPUT_DIR, config.filename);
      fs.writeFileSync(outputFile, JSON.stringify(emptyRanking, null, 2), 'utf8');
      return;
    }
    
    // スコア順でソート
    const topTools = categoryTools
      .sort((a, b) => (b.tenEvaluation?.totalScore || 0) - (a.tenEvaluation?.totalScore || 0))
      .slice(0, 10);
    
    console.log(`   📊 ${categoryTools.length}ツール中TOP${topTools.length}:`);
    topTools.slice(0, 5).forEach((tool, index) => {
      const toolName = tool.toolName || tool.name || 'Unknown';
      const score = tool.tenEvaluation?.totalScore || 0;
      console.log(`     ${index + 1}. ${toolName}: ${score}点`);
    });
    
    // ファイル保存
    const rankingData = {
      version: "V2-2025-08-31",
      rankingType: config.title,
      description: config.description,
      generatedDate: new Date().toISOString(),
      targetCategories: config.categories,
      totalCandidates: categoryTools.length,
      selectedCount: topTools.length,
      ranking: topTools.map((tool, index) => {
        const toolName = tool.toolName || tool.name || 'Unknown';
        return {
          rank: index + 1,
          toolName: toolName,
          category: tool.category,
          totalScore: tool.tenEvaluation?.totalScore || 0,
          tenEvaluation: tool.tenEvaluation,
          companyName: tool.companyName,
          officialUrl: tool.officialUrl
        };
      })
    };
    
    const outputFile = path.join(OUTPUT_DIR, config.filename);
    fs.writeFileSync(outputFile, JSON.stringify(rankingData, null, 2), 'utf8');
    console.log(`   ✅ 保存完了: ${config.filename}`);
  });
}

if (require.main === module) {
  const success = createWeightedRankings();
  console.log('\n' + '='.repeat(60));
  if (success) {
    console.log('🎉 カテゴリ重要度補正ランキングシステム完成！');
    console.log(`📁 出力先: ${OUTPUT_DIR}`);
    console.log('📋 生成ファイル:');
    console.log('  - 総合ランキング_重要度補正版TOP10.json');
    console.log('  - 汎用AI対話AITOP10.json');
    console.log('  - ビジネス生産性AITOP10.json'); 
    console.log('  - 開発者向けAITOP10.json');
    console.log('  - クリエイティブAITOP10.json');
    console.log('  - 特化専門ツールTOP10.json');
  } else {
    console.log('⚠️  ランキング生成に問題がありました。');
  }
  process.exit(success ? 0 : 1);
}

module.exports = { createWeightedRankings };