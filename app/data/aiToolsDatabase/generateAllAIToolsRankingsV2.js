#!/usr/bin/env node

/**
 * AIツールランキング自動生成システム V2
 * 77ツール対応・バッチ10新規ツール統合版
 * 2025-09-01 更新
 */

const fs = require('fs');
const path = require('path');

// パスの設定
const DATA_FILE = path.join(__dirname, 'aiToolsMasterData.json');
const PATTERNS_FILE = path.join(__dirname, 'aiToolsRankingPatternsV1.js');
const OUTPUT_DIR = path.join(__dirname, 'rankingV7');

// 新しい12ツールを含む統合データ（バッチ10）
const newBatch10Tools = [
  { id: "AI073", toolName: "V0", category: "開発支援・コーディング", totalScore: 532, batchNumber: 10 },
  { id: "AI074", toolName: "NapkinAI", category: "プレゼンテーション・資料作成", totalScore: 532, batchNumber: 10 },
  { id: "AI075", toolName: "Gladia", category: "音声関連", totalScore: 547, batchNumber: 10 },
  { id: "AI076", toolName: "Lark", category: "生産性・スケジュール管理", totalScore: 517, batchNumber: 10 },
  { id: "AI077", toolName: "Felo", category: "検索・情報収集", totalScore: 528, batchNumber: 10 },
  { id: "AI078", toolName: "ImageFX", category: "画像生成・編集", totalScore: 550, batchNumber: 10 },
  { id: "AI079", toolName: "イルシル", category: "プレゼンテーション・資料作成", totalScore: 543, batchNumber: 10 },
  { id: "AI080", toolName: "Recraft", category: "画像生成・編集", totalScore: 543, batchNumber: 10 },
  { id: "AI081", toolName: "Clove note", category: "ノート・記録", totalScore: 370, batchNumber: 10 },
  { id: "AI082", toolName: "Kling", category: "動画生成・編集", totalScore: 553, batchNumber: 10 },
  { id: "AI083", toolName: "Vidu", category: "動画生成・編集", totalScore: 530, batchNumber: 10 },
  { id: "AI084", toolName: "Pika", category: "動画生成・編集", totalScore: 546, batchNumber: 10 }
];

/**
 * データ読み込み
 */
function loadMasterData() {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    // 新しいツールを追加（仮想的に統合）
    const combinedTools = [...data.tools, ...newBatch10Tools.map(tool => ({
      id: tool.id,
      toolName: tool.toolName,
      category: tool.category,
      tenEvaluation: {
        totalScore: tool.totalScore
      },
      batchNumber: tool.batchNumber
    }))];
    
    return {
      ...data,
      totalTools: 77,
      tools: combinedTools
    };
  } catch (error) {
    console.error('❌ データファイル読み込みエラー:', error);
    process.exit(1);
  }
}

/**
 * パターン読み込み
 */
function loadPatterns() {
  try {
    // パターンファイルを動的にインポート
    delete require.cache[require.resolve(PATTERNS_FILE)];
    const patterns = require(PATTERNS_FILE);
    return patterns; // 直接パターンオブジェクトを返す
  } catch (error) {
    console.error('❌ パターンファイル読み込みエラー:', error);
    process.exit(1);
  }
}

/**
 * 出力ディレクトリ作成
 */
function createOutputDirectories() {
  // メインディレクトリ作成
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // サブディレクトリ作成
  ['generalUsers', 'developers', 'creators', 'universal'].forEach(dir => {
    const fullPath = path.join(OUTPUT_DIR, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
}

/**
 * 全ツール抽出（77ツール対応）
 */
function extractAllTools(masterData) {
  return masterData.tools.map(tool => ({
    id: tool.id,
    toolName: tool.toolName,
    category: tool.category || 'その他',
    subCategory: tool.subCategory || '',
    companyName: tool.companyName || '',
    totalScore: tool.tenEvaluation?.totalScore || 0,
    batchNumber: tool.batchNumber || 1,
    isNew: tool.batchNumber === 10 // 新規追加ツールフラグ
  })).filter(tool => tool.totalScore > 0);
}

/**
 * ランキング生成
 */
function generateRanking(tools, pattern) {
  let filteredTools = [...tools];
  
  // フィルタ適用
  if (pattern.filters) {
    if (pattern.filters.category) {
      filteredTools = filteredTools.filter(tool => 
        tool.category === pattern.filters.category
      );
    }
    
    if (pattern.filters.minScore) {
      filteredTools = filteredTools.filter(tool => 
        tool.totalScore >= pattern.filters.minScore
      );
    }
    
    if (pattern.filters.isNew) {
      filteredTools = filteredTools.filter(tool => tool.isNew);
    }
  }
  
  // ソート（totalScoreで降順）
  filteredTools.sort((a, b) => b.totalScore - a.totalScore);
  
  // 上位N件取得
  const rankedTools = filteredTools.slice(0, pattern.limit || 10);
  
  // メタデータ追加
  const ranking = {
    id: pattern.id,
    name: pattern.name,
    description: `${pattern.name}（77ツール中から選出）`,
    generatedAt: new Date().toISOString(),
    criteria: 'TENスコア（総合評価）',
    totalCandidates: filteredTools.length,
    selectedCount: rankedTools.length,
    averageScore: rankedTools.length > 0 
      ? Math.round(rankedTools.reduce((sum, tool) => sum + tool.totalScore, 0) / rankedTools.length)
      : 0,
    newToolsIncluded: rankedTools.filter(tool => tool.isNew).length,
    ranking: rankedTools.map((tool, index) => ({
      rank: index + 1,
      ...tool
    }))
  };
  
  return ranking;
}

/**
 * ファイル出力
 */
function saveRanking(ranking, targetType) {
  const filename = `${ranking.id}_${ranking.name.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')}.json`;
  const filepath = path.join(OUTPUT_DIR, targetType, filename);
  
  try {
    fs.writeFileSync(filepath, JSON.stringify(ranking, null, 2), 'utf8');
    return filepath;
  } catch (error) {
    console.error(`❌ ファイル出力エラー [${filename}]:`, error.message);
    return null;
  }
}

/**
 * メイン実行関数
 */
async function generateAllAIToolsRankings() {
  console.log('🚀 AIツールランキング生成システム V2 開始');
  console.log('🆕 77ツール対応・バッチ10新規ツール統合版');
  console.log('============================================================');
  
  try {
    // データ読み込み
    const masterData = loadMasterData();
    const patterns = loadPatterns();
    
    // 全AIツールデータを抽出（77ツール）
    const allTools = extractAllTools(masterData);
    const newTools = allTools.filter(tool => tool.isNew);
    
    console.log(`✅ データロード完了: ${allTools.length}ツール`);
    console.log(`🆕 新規追加ツール: ${newTools.length}ツール`);
    console.log(`📊 実行パターン統計:`);
    console.log(`- 一般ユーザー向け: ${patterns.generalUsers.length}パターン`);
    console.log(`- 開発者向け: ${patterns.developers.length}パターン`);
    console.log(`- クリエイター向け: ${patterns.creators.length}パターン`);
    console.log(`- 横断的: ${patterns.universal.length}パターン`);
    
    const totalPatterns = patterns.generalUsers.length + patterns.developers.length + 
                         patterns.creators.length + patterns.universal.length;
    console.log(`- 合計: ${totalPatterns}パターン`);
    console.log('');
    
    // 出力ディレクトリ作成
    createOutputDirectories();
    
    let successCount = 0;
    let failureCount = 0;
    const results = {
      generalUsers: [],
      developers: [],
      creators: [],
      universal: []
    };
    
    // 各ターゲット別にランキング生成
    for (const [targetType, patternList] of Object.entries(patterns)) {
      console.log(`📈 ${targetType} ランキング生成中...`);
      
      for (const pattern of patternList) {
        try {
          const ranking = generateRanking(allTools, pattern);
          const filepath = saveRanking(ranking, targetType);
          
          if (filepath) {
            results[targetType].push({
              id: pattern.id,
              name: pattern.name,
              filepath: filepath,
              toolCount: ranking.selectedCount,
              averageScore: ranking.averageScore,
              newToolsCount: ranking.newToolsIncluded
            });
            successCount++;
          } else {
            failureCount++;
          }
        } catch (error) {
          console.error(`❌ ランキング生成エラー [${pattern.id}]:`, error.message);
          failureCount++;
        }
      }
    }
    
    // 結果サマリー出力
    console.log('');
    console.log('============================================================');
    console.log('🎉 ランキング生成完了!');
    console.log(`✅ 成功: ${successCount}ファイル`);
    console.log(`❌ 失敗: ${failureCount}ファイル`);
    console.log(`📁 出力先: ${OUTPUT_DIR}`);
    console.log('');
    
    // 詳細統計
    Object.entries(results).forEach(([targetType, rankings]) => {
      if (rankings.length > 0) {
        const avgScore = Math.round(
          rankings.reduce((sum, r) => sum + r.averageScore, 0) / rankings.length
        );
        const totalNewTools = rankings.reduce((sum, r) => sum + r.newToolsCount, 0);
        
        console.log(`📊 ${targetType}: ${rankings.length}ファイル (平均スコア: ${avgScore}点, 新規ツール: ${totalNewTools}個含む)`);
      }
    });
    
    console.log('');
    console.log('🔗 次のステップ: 新Kxxxナレッジファイル作成');
    
  } catch (error) {
    console.error('💥 システムエラー:', error);
    process.exit(1);
  }
}

// スクリプト直接実行時の処理
if (require.main === module) {
  generateAllAIToolsRankings();
}

module.exports = {
  generateAllAIToolsRankings,
  loadMasterData,
  extractAllTools
};