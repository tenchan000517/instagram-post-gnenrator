const fs = require('fs');
const path = require('path');

// Batch file mappings (バッチ1-9)
const batchFiles = [
    { file: 'batch1-complete-results.json', batchNumber: 1, toolRange: '1-8' },
    { file: 'batch2-complete-results.json', batchNumber: 2, toolRange: '9-16' },
    { file: 'batch3-complete-results.json', batchNumber: 3, toolRange: '17-24' },
    { file: 'batch4-complete-results.json', batchNumber: 4, toolRange: '25-32' },
    { file: 'batch5-complete-results.json', batchNumber: 5, toolRange: '33-40' },
    { file: 'batch6-complete-results.json', batchNumber: 6, toolRange: '41-48' },
    { file: 'batch7-complete-results.json', batchNumber: 7, toolRange: '49-56' },
    { file: 'batch8-complete-results.json', batchNumber: 8, toolRange: '57-64' },
    { file: 'batch9-complete-results.json', batchNumber: 9, toolRange: '65-72' }
];

const researchResultsDir = path.join(__dirname, '../../../ACTIVE-ROUTINES/01_DAILY_USE/ten-productivity-database/research-results');
const outputFile = path.join(__dirname, 'aiToolsMasterData.json');

function createAIToolsMasterDatabase() {
    const unifiedData = {
        version: "V2-2025-08-31",
        lastUpdated: "2025-08-31",
        databaseType: "AITools",
        totalBatches: batchFiles.length,
        totalTools: 0,
        batches: [],
        tools: [],
        categories: {},
        tenEvaluationCriteria: {
            "即効性": { weight: 0.20, description: "結果取得までの速度" },
            "簡単さ": { weight: 0.20, description: "学習コスト・操作の直感性" },
            "人気度": { weight: 0.15, description: "ユーザー数・市場認知度" },
            "コスパ": { weight: 0.15, description: "価格対機能・価値" },
            "機能専門性": { weight: 0.20, description: "独自機能・差別化要素" },
            "生産性UP度": { weight: 0.10, description: "実際の作業効率向上" }
        }
    };

    console.log('🚀 Creating AI Tools Master Database...');
    console.log(`📁 Research Results Directory: ${researchResultsDir}`);

    batchFiles.forEach(({ file, batchNumber, toolRange }) => {
        const filePath = path.join(researchResultsDir, file);
        
        try {
            if (fs.existsSync(filePath)) {
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                
                // Extract tools from batch data (support multiple formats)
                const tools = data.tools || data.completedTools || [];
                
                // Calculate batch statistics
                const batchStats = {
                    batchNumber: batchNumber,
                    toolRange: toolRange,
                    totalTools: tools.length,
                    averageTotalScore: 0,
                    topTotalScore: 0,
                    dataQuality: data.batchInfo?.dataQuality || "unknown"
                };

                // Calculate average and top Total scores
                if (tools.length > 0) {
                    const totalScores = tools
                        .map(t => t.tenEvaluation?.totalScore)
                        .filter(s => s != null && s > 0);
                    
                    if (totalScores.length > 0) {
                        batchStats.averageTotalScore = Math.round((totalScores.reduce((a, b) => a + b, 0) / totalScores.length) * 100) / 100;
                        batchStats.topTotalScore = Math.max(...totalScores);
                    }
                }

                // Add batch info
                unifiedData.batches.push(batchStats);
                
                // Add tools to master list (exclude invalid ones)
                let validToolsCount = 0;
                tools.forEach(tool => {
                    // Skip tools with invalid tenEvaluation
                    if (!tool.tenEvaluation || tool.tenEvaluation.totalScore === null) {
                        console.log(`   ⚠️  Skipping invalid tool: ${tool.toolName || tool.name || 'Unknown'}`);
                        return;
                    }
                    
                    // Add batch info to each tool
                    tool.batchNumber = batchNumber;
                    tool.toolRange = toolRange;
                    
                    // Category tracking (support multiple formats)
                    const category = tool.basicInfo?.category || tool.category || 'Unknown';
                    if (!unifiedData.categories[category]) {
                        unifiedData.categories[category] = 0;
                    }
                    unifiedData.categories[category]++;
                    
                    unifiedData.tools.push(tool);
                    validToolsCount++;
                });
                
                unifiedData.totalTools += validToolsCount;
                
                console.log(`✅ Processed Batch ${batchNumber} (${toolRange}): ${validToolsCount}/${tools.length} valid tools`);
                console.log(`   📊 Average Total Score: ${batchStats.averageTotalScore}`);
                console.log(`   🏆 Top Total Score: ${batchStats.topTotalScore}`);
            } else {
                console.log(`⚠️  File not found: ${file}`);
            }
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error.message);
        }
    });

    // Sort tools by totalScore (highest first)
    unifiedData.tools.sort((a, b) => {
        const scoreA = a.tenEvaluation?.totalScore || 0;
        const scoreB = b.tenEvaluation?.totalScore || 0;
        return scoreB - scoreA;
    });

    // Calculate overall statistics based on totalScore
    const allTotalScores = unifiedData.tools
        .map(t => t.tenEvaluation?.totalScore)
        .filter(s => s != null && s > 0);
    
    const overallStats = {
        totalValidScores: allTotalScores.length,
        averageTotalScore: allTotalScores.length > 0 ? Math.round((allTotalScores.reduce((a, b) => a + b, 0) / allTotalScores.length) * 100) / 100 : 0,
        topTotalScore: allTotalScores.length > 0 ? Math.max(...allTotalScores) : 0,
        scoreDistribution: {
            score500Plus: allTotalScores.filter(s => s >= 500).length,
            score400To499: allTotalScores.filter(s => s >= 400 && s < 500).length,
            score300To399: allTotalScores.filter(s => s >= 300 && s < 400).length,
            scoreBelow300: allTotalScores.filter(s => s < 300).length
        }
    };

    unifiedData.statistics = overallStats;

    // Write unified database
    fs.writeFileSync(outputFile, JSON.stringify(unifiedData, null, 2), 'utf8');
    
    console.log('\n🎉 AI Tools Master Database created successfully!');
    console.log(`📊 Total Batches: ${unifiedData.totalBatches}`);
    console.log(`🔧 Total AI Tools: ${unifiedData.totalTools}`);
    console.log(`📈 Average Total Score: ${overallStats.averageTotalScore}`);
    console.log(`🏆 Top Total Score: ${overallStats.topTotalScore}`);
    console.log(`📚 Categories: ${Object.keys(unifiedData.categories).length}`);
    console.log(`📁 Output: ${outputFile}`);
    
    // Show top 5 tools
    console.log('\n🏆 Top 5 AI Tools by Total Score:');
    unifiedData.tools.slice(0, 5).forEach((tool, index) => {
        const totalScore = tool.tenEvaluation?.totalScore || 0;
        const name = tool.toolName || tool.name || 'Unknown';
        console.log(`   ${index + 1}. ${name}: ${totalScore}点`);
    });
    
    return unifiedData;
}

// Execute if run directly
if (require.main === module) {
    createAIToolsMasterDatabase();
}

module.exports = createAIToolsMasterDatabase;