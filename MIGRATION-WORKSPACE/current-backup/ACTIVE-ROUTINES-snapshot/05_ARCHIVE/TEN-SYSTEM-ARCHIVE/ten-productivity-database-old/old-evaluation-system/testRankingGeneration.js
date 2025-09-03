const fs = require('fs');
const path = require('path');
const ProductivityRankingGenerator = require('./productivityRankingGenerator');

/**
 * ランキング生成テストスクリプト
 * 「無料で使える生産性向上ツールTOP10」を生成してテスト
 */

async function testRankingGeneration() {
    console.log('🧪 ランキング生成テスト開始...');
    
    try {
        // 統合データベース読み込み
        const dataPath = path.join(__dirname, 'productivityMasterData.json');
        const productivityData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        console.log(`📊 データ読み込み完了: ${productivityData.totalItems}アイテム`);
        
        // ランキングジェネレーター初期化
        const generator = new ProductivityRankingGenerator(productivityData);
        
        // テスト1: TENスコアTOP10
        console.log('\n🏆 テスト1: TENスコア TOP10');
        const tenScoreRanking = generator.generateAdvancedRanking('ten_score', 10, {});
        displayRanking(tenScoreRanking, 'TENスコア');
        
        // テスト2: 無料ツールのTENスコアランキング
        console.log('\n💰 テスト2: 無料ツール TENスコア TOP10');
        const freeToolsRanking = generator.generateAdvancedRanking('ten_score', 10, {
            priceType: 'free'
        });
        displayRanking(freeToolsRanking, 'TENスコア（無料ツール）');
        
        // テスト3: 即効性ランキング
        console.log('\n⚡ テスト3: 即効性 TOP10');
        const immediateRanking = generator.generateAdvancedRanking('immediate_effect', 10, {});
        displayRanking(immediateRanking, '即効性');
        
        // テスト4: 導入の簡単さランキング
        console.log('\n🚀 テスト4: 導入の簡単さ TOP10');
        const easySetupRanking = generator.generateAdvancedRanking('low_barrier', 10, {});
        displayRanking(easySetupRanking, '導入の簡単さ');
        
        // テスト5: 人気度ランキング
        console.log('\n🔥 テスト5: 人気度 TOP10');
        const popularityRanking = generator.generateAdvancedRanking('popularity', 10, {});
        displayRanking(popularityRanking, '人気度');
        
        // 統計情報
        console.log('\n📊 統計情報:');
        const stats = generator.getStats();
        console.log(`総アイテム数: ${stats.totalItems}`);
        console.log(`利用可能カテゴリ: ${stats.categories.length}`);
        console.log(`平均TENスコア: ${stats.avgTenScore}`);
        console.log(`無料ツール数: ${stats.freeItemsCount}`);
        
        // TEN特化「無料で使える生産性向上ツールTOP10」ランキング生成
        console.log('\n🎯 最終テスト: 無料で使える生産性向上ツールTOP10（TEN特化）');
        const finalRanking = generator.generateAdvancedRanking('ten_score', 10, {
            priceType: 'free',
            immediateEffect: 70,    // 即効性70点以上
            lowBarrier: 70          // 導入障壁の低さ70点以上
        });
        
        console.log('📝 TOP10ランキング結果:');
        displayDetailedRanking(finalRanking);
        
        // JSONファイル出力
        const outputPath = path.join(__dirname, '../rankings/TEN_無料生産性ツールTOP10.json');
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        const rankingResult = {
            title: "無料で使える生産性向上ツールTOP10",
            subtitle: "TEN特化ランキング - 即効性・簡単さ・人気度重視",
            criteria: "TENスコア",
            filters: {
                priceType: "free",
                immediateEffect: 70,
                lowBarrier: 70
            },
            generated: new Date().toISOString(),
            ranking: finalRanking
        };
        
        fs.writeFileSync(outputPath, JSON.stringify(rankingResult, null, 2), 'utf8');
        console.log(`\n💾 ランキング結果を保存: ${outputPath}`);
        
        console.log('\n✅ ランキング生成テスト完了！');
        
    } catch (error) {
        console.error('❌ テストエラー:', error.message);
        console.error(error.stack);
    }
}

function displayRanking(ranking, criteriaName) {
    ranking.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} (${item.formattedValue}) - ${item.category}`);
    });
}

function displayDetailedRanking(ranking) {
    ranking.forEach((item, index) => {
        console.log(`${index + 1}位: ${item.name}`);
        console.log(`   カテゴリ: ${item.category}`);
        console.log(`   TENスコア: ${item.tenScore}点`);
        console.log(`   即効性: ${item.metrics?.ten_criteria?.immediate_effect || 'N/A'}点`);
        console.log(`   導入簡単: ${item.metrics?.ten_criteria?.low_barrier || 'N/A'}点`);
        console.log(`   人気度: ${item.metrics?.popularity || 'N/A'}点`);
        console.log(`   価格: ${item.pricing?.free ? '無料版あり' : '有料'}`);
        console.log(`   説明: ${item.description}`);
        console.log('');
    });
}

// 実行
if (require.main === module) {
    testRankingGeneration();
}

module.exports = testRankingGeneration;