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

const researchResultsDir = path.join(__dirname, 'research-results');
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
                
                // Extract tools from batch data
                const tools = data.tools || [];
                
                // Calculate batch statistics
                const batchStats = {
                    batchNumber: batchNumber,
                    toolRange: toolRange,
                    totalTools: tools.length,
                    averageTenScore: 0,
                    topTenScore: 0,
                    dataQuality: data.batchInfo?.dataQuality || "unknown"
                };

                // Calculate average and top TEN scores
                if (tools.length > 0) {
                    const tenScores = tools
                        .map(t => t.tenEvaluation?.tenScore)
                        .filter(s => s != null && s > 0);
                    
                    if (tenScores.length > 0) {
                        batchStats.averageTenScore = Math.round((tenScores.reduce((a, b) => a + b, 0) / tenScores.length) * 100) / 100;
                        batchStats.topTenScore = Math.max(...tenScores);
                    }
                }

                // Add batch info
                unifiedData.batches.push(batchStats);
                
                // Add tools to master list
                tools.forEach(tool => {
                    // Add batch info to each tool
                    tool.batchNumber = batchNumber;
                    tool.toolRange = toolRange;
                    
                    // Category tracking
                    const category = tool.basicInfo?.category || 'Unknown';
                    if (!unifiedData.categories[category]) {
                        unifiedData.categories[category] = 0;
                    }
                    unifiedData.categories[category]++;
                    
                    unifiedData.tools.push(tool);
                });
                
                unifiedData.totalTools += tools.length;
                
                console.log(`✅ Processed Batch ${batchNumber} (${toolRange}): ${tools.length} tools`);
                console.log(`   📊 Average TEN Score: ${batchStats.averageTenScore}`);
                console.log(`   🏆 Top TEN Score: ${batchStats.topTenScore}`);
            } else {
                console.log(`⚠️  File not found: ${file}`);
            }
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error.message);
        }
    });

    // Sort tools by TEN score (highest first)
    unifiedData.tools.sort((a, b) => {
        const scoreA = a.tenEvaluation?.tenScore || 0;
        const scoreB = b.tenEvaluation?.tenScore || 0;
        return scoreB - scoreA;
    });

    // Calculate overall statistics
    const allTenScores = unifiedData.tools
        .map(t => t.tenEvaluation?.tenScore)
        .filter(s => s != null && s > 0);
    
    const overallStats = {
        totalValidScores: allTenScores.length,
        averageTenScore: allTenScores.length > 0 ? Math.round((allTenScores.reduce((a, b) => a + b, 0) / allTenScores.length) * 100) / 100 : 0,
        topTenScore: allTenScores.length > 0 ? Math.max(...allTenScores) : 0,
        gradeDistribution: {
            gradeA: allTenScores.filter(s => s >= 90).length,
            gradeB: allTenScores.filter(s => s >= 80 && s < 90).length,
            gradeC: allTenScores.filter(s => s >= 70 && s < 80).length,
            gradeD: allTenScores.filter(s => s < 70).length
        }
    };

    unifiedData.statistics = overallStats;

    // Write unified database
    fs.writeFileSync(outputFile, JSON.stringify(unifiedData, null, 2), 'utf8');
    
    console.log('\n🎉 AI Tools Master Database created successfully!');
    console.log(`📊 Total Batches: ${unifiedData.totalBatches}`);
    console.log(`🔧 Total AI Tools: ${unifiedData.totalTools}`);
    console.log(`📈 Average TEN Score: ${overallStats.averageTenScore}`);
    console.log(`🏆 Top TEN Score: ${overallStats.topTenScore}`);
    console.log(`📚 Categories: ${Object.keys(unifiedData.categories).length}`);
    console.log(`📁 Output: ${outputFile}`);
    
    // Show top 5 tools
    console.log('\n🏆 Top 5 AI Tools by TEN Score:');
    unifiedData.tools.slice(0, 5).forEach((tool, index) => {
        const score = tool.tenEvaluation?.tenScore || 0;
        const name = tool.basicInfo?.name || 'Unknown';
        const grade = tool.tenEvaluation?.grade || 'N/A';
        console.log(`   ${index + 1}. ${name}: ${score} (Grade ${grade})`);
    });
    
    return unifiedData;
}

// Execute if run directly
if (require.main === module) {
    createAIToolsMasterDatabase();
}

module.exports = createAIToolsMasterDatabase;