#!/usr/bin/env node
/**
 * 重複・古いツール名クリーニングスクリプト
 * 
 * 対象:
 * - Bard (Google Gemini) → 削除（Geminiに統合済み）
 * - 其他重複ツールの確認・削除
 */

const fs = require('fs');
const path = require('path');

const RESEARCH_DIR = path.join(__dirname, 'research-results');

// 削除対象ツール（古い名称・重複）
const TOOLS_TO_REMOVE = [
  {
    id: "AI037",
    toolName: "Bard (Google Gemini)",
    reason: "Gemini (AI001) と重複。2024年2月にリブランド済み",
    batchFile: "batch5-complete-results.json"
  }
];

// 統合・更新対象ツール
const TOOLS_TO_UPDATE = [
  {
    id: "AI001", 
    currentName: "Gemini",
    updatedInfo: {
      description: "Google Gemini - 2024年2月にBardからリブランド。最新のGemini 2.5 Proモデル搭載",
      notes: "元Bard。Google検索・Workspaceと深く統合されたマルチモーダルAI"
    }
  }
];

function cleanDuplicateTools() {
  console.log('🧹 重複・古いツール名クリーニング開始');
  console.log('='.repeat(50));
  
  let totalRemoved = 0;
  let totalUpdated = 0;
  
  // 1. 削除対象ツールの処理
  TOOLS_TO_REMOVE.forEach(target => {
    const filePath = path.join(RESEARCH_DIR, target.batchFile);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  ファイル未発見: ${target.batchFile}`);
      return;
    }
    
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const tools = data.tools || [];
      const initialCount = tools.length;
      
      // 該当ツールを削除
      const filteredTools = tools.filter(tool => tool.id !== target.id);
      const removedCount = initialCount - filteredTools.length;
      
      if (removedCount > 0) {
        data.tools = filteredTools;
        
        // バッチ情報更新
        if (data.batchInfo) {
          data.batchInfo.toolsCount = filteredTools.length;
          data.batchInfo.cleaningDate = new Date().toISOString().split('T')[0];
          data.batchInfo.cleaningNote = `Removed duplicate/obsolete tools: ${target.toolName}`;
        }
        
        // ファイル保存
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        
        console.log(`✅ 削除完了: ${target.toolName} (${target.id})`);
        console.log(`   理由: ${target.reason}`);
        console.log(`   ファイル: ${target.batchFile}`);
        console.log(`   削除数: ${removedCount}ツール`);
        
        totalRemoved += removedCount;
      } else {
        console.log(`⚠️  対象ツールが見つかりません: ${target.toolName}`);
      }
      
    } catch (error) {
      console.log(`❌ エラー (${target.batchFile}): ${error.message}`);
    }
  });
  
  // 2. 他の重複可能性チェック
  console.log('\n🔍 其他重複ツールチェック...');
  checkForOtherDuplicates();
  
  console.log('\n' + '='.repeat(50));
  console.log(`🎉 クリーニング完了:`);
  console.log(`   削除: ${totalRemoved}ツール`);
  console.log(`   更新: ${totalUpdated}ツール`);
  
  if (totalRemoved > 0) {
    console.log('\n⚠️  マスターデータベース再生成が必要です:');
    console.log('   node createAIToolsMasterDatabase.js');
    console.log('   node createCategoryWeightedRankings.js');
  }
  
  return totalRemoved > 0 || totalUpdated > 0;
}

function checkForOtherDuplicates() {
  const allTools = [];
  
  // 全バッチからツール収集
  for (let i = 1; i <= 9; i++) {
    const filename = `batch${i}-complete-results.json`;
    const filePath = path.join(RESEARCH_DIR, filename);
    
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const tools = data.tools || data.completedTools || [];
        
        tools.forEach(tool => {
          allTools.push({
            id: tool.id,
            toolName: tool.toolName || tool.name,
            category: tool.category,
            batchNumber: i,
            companyName: tool.companyName
          });
        });
      } catch (error) {
        console.log(`⚠️  ${filename} 読み込みエラー: ${error.message}`);
      }
    }
  }
  
  // 名前の類似性チェック
  const toolNames = {};
  allTools.forEach(tool => {
    const name = tool.toolName?.toLowerCase().trim();
    if (name) {
      if (!toolNames[name]) {
        toolNames[name] = [];
      }
      toolNames[name].push(tool);
    }
  });
  
  // 重複・類似ツールレポート
  const duplicates = Object.entries(toolNames).filter(([name, tools]) => tools.length > 1);
  
  if (duplicates.length > 0) {
    console.log('\n🚨 重複・類似ツール検出:');
    duplicates.forEach(([name, tools]) => {
      console.log(`\n📍 "${name}" (${tools.length}件):`);
      tools.forEach(tool => {
        console.log(`     バッチ${tool.batchNumber}: ${tool.id} - ${tool.companyName}`);
      });
    });
  } else {
    console.log('✅ 其他重複ツールは見つかりませんでした');
  }
  
  // 類似名称パターンチェック
  const similarPatterns = [
    ['openai', 'open ai'],
    ['chatgpt', 'chat gpt'],
    ['claude', 'claude api'],
    ['github copilot', 'copilot']
  ];
  
  similarPatterns.forEach(([pattern1, pattern2]) => {
    const matches1 = allTools.filter(t => t.toolName?.toLowerCase().includes(pattern1));
    const matches2 = allTools.filter(t => t.toolName?.toLowerCase().includes(pattern2));
    
    if (matches1.length > 0 && matches2.length > 0) {
      console.log(`\n🔍 類似パターン検出: "${pattern1}" vs "${pattern2}"`);
      console.log(`   ${pattern1}: ${matches1.map(t => t.toolName).join(', ')}`);
      console.log(`   ${pattern2}: ${matches2.map(t => t.toolName).join(', ')}`);
    }
  });
}

if (require.main === module) {
  const hasChanges = cleanDuplicateTools();
  process.exit(hasChanges ? 0 : 1);
}

module.exports = { cleanDuplicateTools };