const fs = require('fs');
const path = require('path');
const ProductivityRankingGenerator = require('./productivityRankingGenerator');

/**
 * TEN生産性ランキング → Type003投稿完全自動生成システム
 * K805.jsonの構造を完全踏襲
 */

async function generateType003Feed() {
    console.log('🚀 Type003投稿生成開始...');
    
    try {
        // 1. 統合データベース読み込み
        const dataPath = path.join(__dirname, 'productivityMasterData.json');
        const productivityData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        
        // 2. ランキング生成
        const generator = new ProductivityRankingGenerator(productivityData);
        const ranking = generator.generateAdvancedRanking('ten_score', 10, {
            priceType: 'free',
            immediateEffect: 70,
            lowBarrier: 70
        });
        
        // 3. Type003 JSON生成
        const knowledgeId = 'K901';
        const type003Post = {
            source: `contents-ranking-productivity-901`,
            problemCategory: "生産性向上・効率化",
            knowledgeId: knowledgeId,
            postType: "003",
            pageCount: 8,
            pageStructurePattern: "unified-template-11-productivity-ranking",
            targetIds: ["T004"],
            detailedContent: {
                page1: generatePage1(),
                page2: generatePage2(ranking),
                page3: generateDetailPage(ranking[0], ranking[1]),
                page4: generateDetailPage(ranking[2], ranking[3]),
                page5: generateDetailPage(ranking[4], ranking[5]),
                page6: generateDetailPage(ranking[6], ranking[7]),
                page7: generateDetailPage(ranking[8], ranking[9]),
                page8: generatePage8()
            }
        };
        
        // 4. JSONファイル保存
        const outputPath = '/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K901.json';
        fs.writeFileSync(outputPath, JSON.stringify(type003Post, null, 2), 'utf8');
        console.log(`✅ Type003 JSON保存完了: ${outputPath}`);
        
        // 5. キャプション生成
        const caption = generateCaption(ranking);
        const captionPath = '/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K901_caption.txt';
        fs.writeFileSync(captionPath, caption, 'utf8');
        console.log(`✅ キャプション保存完了: ${captionPath}`);
        
        console.log('\n🎉 Type003投稿生成完了！');
        console.log('📝 K901: 無料で使える生産性向上ツールTOP10');
        
    } catch (error) {
        console.error('❌ エラー:', error.message);
        console.error(error.stack);
    }
}

function generatePage1() {
    return {
        section: "introduction",
        template: "basic_intro",
        content: {
            title: "無料で使える生産性向上ツールTOP10",
            targetAudience: "効率化したいけど何から始めていいかわからない？",
            problems: [
                "仕事が終わらない...でも残業はしたくないであるぞ",
                "効率化ツール多すぎて、どれを使えばいいか分からぬなり",
                "有料ツールは高すぎる...無料でいいツールないのか？"
            ],
            additionalMessage: "ワシが実際に使って効果があったツール10選なり！\n全て無料で始められて、5分で導入できるものばかりであるぞ",
            savePrompt: "このランキングを保存して、今日から生産性を爆上げするなり"
        }
    };
}

function generatePage2(ranking) {
    const items = ranking.map(item => ({
        rank: item.rank,
        name: item.name,
        primaryValue: `TENスコア: ${item.tenScore}点`,
        secondaryValue: getSecondaryValue(item),
        description: item.category,
        category: "無料"
    }));
    
    return {
        section: "ranking",
        template: "ranking_display",
        content: {
            title: "生産性向上ツールランキング",
            subtitle: "TEN厳選・即効性重視",
            displayType: "ranking",
            items: items
        }
    };
}

function generateDetailPage(tool1, tool2) {
    return {
        section: `detail_${tool1.rank}`,
        template: "enhanced_tool_detail",
        content: {
            title: `${tool1.rank}位・${tool2.rank}位`,
            subtitle: "詳細データ",
            displayType: "enhanced_detail_grid",
            tools: [
                generateToolDetail(tool1),
                generateToolDetail(tool2)
            ]
        }
    };
}

function generateToolDetail(tool) {
    // データアクセスの修正
    const toolData = tool.metrics || {};
    const tenCriteria = toolData.ten_criteria || {};
    const pricingData = tool.pricing || {};
    const featuresData = tool.features || {};
    
    return {
        rank: tool.rank,
        name: tool.name,
        category: tool.category,
        mainMetrics: {
            "TENスコア": `${tool.tenScore}点`,
            "即効性": `${tenCriteria.immediate_effect || 0}点`,
            "導入簡単": `${tenCriteria.low_barrier || 0}点`,
            "人気度": `${toolData.popularity || 0}点`
        },
        subMetrics: {
            "価格": pricingData.free ? "無料版あり" : "有料のみ",
            "設定時間": `${toolData.setup_time || "不明"}分`,
            "学習コスト": `${toolData.learning_curve || 0}点`,
            "信頼性": `${toolData.reliability || 0}点`
        },
        features: extractTopFeatures(featuresData),
        specialNote: generateSpecialNote(tool)
    };
}

function generatePage8() {
    return {
        section: "summary",
        template: "resource_summary",
        content: {
            title: "TEN DATABASE",
            subtitle: "生産性向上ツール完全ガイド",
            summaryPoints: [
                "全ツール無料版あり・5分で導入可能なり",
                "TENスコアは即効性・簡単さ・人気度で算出",
                "実際に使って効果があったツールのみ厳選"
            ],
            callToAction: "今日から1つでも導入して、生産性を爆上げするなり！",
            databaseImage: "/images/ten-database-productivity.png",
            additionalInfo: "詳細データはプロフィールのリンクから確認できるぞ"
        }
    };
}

function getSecondaryValue(item) {
    const toolData = item.metrics || {};
    const pricingData = item.pricing || {};
    
    if (pricingData.free) {
        return "無料で始められる";
    } else if (toolData.setup_time && toolData.setup_time <= 5) {
        return "5分で導入完了";
    } else if (toolData.ten_criteria?.immediate_effect >= 90) {
        return "即効性抜群";
    } else {
        return "人気急上昇中";
    }
}

function extractTopFeatures(features) {
    const topFeatures = [];
    if (features.ai_powered) topFeatures.push("AI搭載");
    if (features.collaboration) topFeatures.push("チーム協業");
    if (features.mobile_app) topFeatures.push("スマホ対応");
    if (features.offline_support) topFeatures.push("オフライン可");
    return topFeatures.slice(0, 4);
}

function generateSpecialNote(tool) {
    const toolData = tool.metrics || {};
    const tenCriteria = toolData.ten_criteria || {};
    const pricingData = tool.pricing || {};
    
    if (tenCriteria.immediate_effect >= 90) {
        return "導入した瞬間から効果を実感できるであるぞ！";
    } else if (tenCriteria.low_barrier >= 90) {
        return "設定不要で即使える最強ツールなり！";
    } else if (pricingData.free) {
        return "無料版でも十分な機能が使えるのです！";
    } else {
        return "多くの人が愛用している定番ツールなり！";
    }
}

function generateCaption(ranking) {
    const top3 = ranking.slice(0, 3);
    const topTools = top3.map(t => t.name).join('、');
    
    const caption = `【無料で使える生産性向上ツールTOP10】

効率化したいけど、何から始めればいいかわからぬ...そんな拙者と同じ悩みを持つ者へ！

実は無料で使える最強ツールがこんなにあるのであるぞ🔥

🥇 1位: ${ranking[0].name}
→ ${getToolHighlight(ranking[0])}

🥈 2位: ${ranking[1].name}
→ ${getToolHighlight(ranking[1])}

🥉 3位: ${ranking[2].name}
→ ${getToolHighlight(ranking[2])}

全て無料で始められて、導入も5分以内なり！
めんどくさがりの拙者でも続いているツールばかりであるぞ

保存して、今日から1つでも試してみるなり！

#生産性向上 #効率化 #無料ツール #タスク管理 #時短術
#リモートワーク #ビジネスツール #仕事効率化 #ライフハック
#${topTools.replace(/、/g, ' #')}`;
    
    return caption;
}

function getToolHighlight(tool) {
    const toolData = tool.metrics || {};
    const tenCriteria = toolData.ten_criteria || {};
    const pricingData = tool.pricing || {};
    
    if (tenCriteria.immediate_effect >= 90) {
        return "導入即効果！";
    } else if (tenCriteria.low_barrier >= 90) {
        return "設定不要で簡単！";
    } else if (pricingData.free) {
        return "完全無料で使える！";
    } else {
        return "みんな使ってる定番！";
    }
}

// 実行
if (require.main === module) {
    generateType003Feed();
}

module.exports = generateType003Feed;