const fs = require('fs');
const path = require('path');
const ProductivityRankingGenerator = require('./productivityRankingGenerator');

/**
 * TEN生産性ランキング → Type003投稿生成システム V2
 * unified-template-12-productivity-tool専用版
 */

async function generateType003FeedV2() {
    console.log('🚀 Type003投稿生成V2開始...');
    
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
        
        // 3. Type003 JSON生成（新テンプレート対応）
        const knowledgeId = 'K901';
        const type003Post = {
            source: `contents-ranking-productivity-901`,
            problemCategory: "生産性向上・効率化",
            knowledgeId: knowledgeId,
            postType: "003",
            pageCount: 8,
            pageStructurePattern: "unified-template-12-productivity-tool",
            targetIds: ["T004"],
            detailedContent: {
                page1: generatePage1V2(),
                page2: generatePage2V2(ranking),
                page3: generateDetailPageV2(ranking[0], ranking[1]),
                page4: generateDetailPageV2(ranking[2], ranking[3]),
                page5: generateDetailPageV2(ranking[4], ranking[5]),
                page6: generateDetailPageV2(ranking[6], ranking[7]),
                page7: generateDetailPageV2(ranking[8], ranking[9]),
                page8: generatePage8V2()
            }
        };
        
        // 4. JSONファイル保存
        const outputPath = '/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K901.json';
        fs.writeFileSync(outputPath, JSON.stringify(type003Post, null, 2), 'utf8');
        console.log(`✅ Type003 JSON保存完了: ${outputPath}`);
        
        // 5. キャプション生成
        const caption = generateCaptionV2(ranking);
        const captionPath = '/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type003/K901_caption.txt';
        fs.writeFileSync(captionPath, caption, 'utf8');
        console.log(`✅ キャプション保存完了: ${captionPath}`);
        
        console.log('\n🎉 Type003投稿生成V2完了！');
        console.log('📝 K901: 無料で使える生産性向上ツールTOP10 (Template12対応)');
        
    } catch (error) {
        console.error('❌ エラー:', error.message);
        console.error(error.stack);
    }
}

// Page1: TEN専用導入ページ
function generatePage1V2() {
    return {
        section: "introduction",
        template: "ten_intro",
        content: {
            title: "無料で使える生産性向上ツールTOP10",
            catchphrase: "効率化への道は、無料ツールから始まるなり！",
            problems: [
                "仕事が終わらない...でも残業はしたくないであるぞ",
                "効率化ツール多すぎて、どれを使えばいいか分からぬなり", 
                "有料ツールは高すぎる...無料でいいツールないのか？"
            ],
            solution: "心配無用！拙者が厳選した無料ツール10選で、今日から生産性爆上げなり",
            callToAction: "このリストを保存して、今すぐ1つでも導入するのじゃ！",
            tenCharacter: {
                message: "全て無料で始められて、5分で導入できるものばかりであるぞ",
                tone: "古風な武士口調"
            }
        }
    };
}

// Page2: ツール一覧表示（ランキング表示なし）
function generatePage2V2(ranking) {
    const tools = ranking.map((item, index) => ({
        position: index + 1,
        name: item.name,
        category: item.category,
        primaryScore: `TENスコア: ${item.tenScore}点`,
        highlight: getToolHighlightV2(item),
        icon: getToolIcon(item.category)
    }));
    
    return {
        section: "showcase",
        template: "tool_showcase",
        content: {
            title: "TEN厳選ツールコレクション",
            subtitle: "即効性・簡単さ・人気度で選抜",
            displayType: "showcase",
            tools: tools,
            evaluationNote: "TENスコア = 即効性25% + 導入簡単25% + 人気度20% + コスパ20% + めんどくさがり対応10%",
            tenComment: "全て拙者が実際に使って効果を確認済みなり！"
        }
    };
}

// Page3-7: 詳細ページ（新テンプレート対応）
function generateDetailPageV2(tool1, tool2) {
    return {
        section: `detail_${tool1.rank}`,
        template: "enhanced_tool_detail", 
        content: {
            displayMode: "grid",
            tools: [
                generateToolDetailV2(tool1),
                generateToolDetailV2(tool2)
            ]
        }
    };
}

// ツール詳細生成（新構造）
function generateToolDetailV2(tool) {
    const toolData = tool.metrics || {};
    const tenCriteria = toolData.ten_criteria || {};
    const pricingData = tool.pricing || {};
    const featuresData = tool.features || {};
    
    return {
        toolName: tool.name,
        category: tool.category,
        position: tool.rank,
        tenScores: {
            immediateEffect: tenCriteria.immediate_effect || 0,
            easeOfUse: tenCriteria.low_barrier || 0,
            popularity: toolData.popularity || 0,
            costEffectiveness: tenCriteria.cost_effectiveness || 0,
            lazyFriendly: tenCriteria.lazy_friendly || 0
        },
        keyMetrics: {
            price: pricingData.free ? "無料版あり" : "有料のみ",
            setupTime: `${toolData.setup_time || "不明"}分`,
            platforms: extractPlatforms(tool.platforms || {}),
            userBase: getUserBaseDescription(toolData.popularity || 0)
        },
        parameterGraph: {
            timeReduction: Math.min(100, (tenCriteria.immediate_effect || 0) * 1.1),
            simplicity: tenCriteria.low_barrier || 0,
            versatility: toolData.feature_richness || 0,
            reliability: toolData.reliability || 0,
            trendiness: tenCriteria.trend_factor || 0
        },
        features: {
            type: tool.category,
            developer: tool.company_info?.developer || "不明",
            launched: tool.company_info?.founded || "不明",
            specialization: getSpecialization(tool)
        },
        details: {
            overview: generateOverview(tool),
            useCases: tool.use_cases || ["汎用的な生産性向上"],
            pros: tool.pros || ["使いやすい", "効果的"],
            tips: generateTips(tool)
        },
        tenRecommendation: generateTenRecommendation(tool)
    };
}

// Page8: TEN専用まとめページ
function generatePage8V2() {
    return {
        section: "summary",
        template: "ten_summary",
        content: {
            title: "TEN DATABASE",
            subtitle: "生産性向上ツール完全ガイド",
            summaryPoints: [
                "全ツール無料版あり・5分で導入可能なり",
                "TENスコアは即効性・簡単さ・人気度で算出",
                "実際に使って効果があったツールのみ厳選",
                "めんどくさがりでも続けられる設計"
            ],
            actionSteps: [
                {
                    step: "1つ選ぶ",
                    description: "まずは気になるツール1つから始めるなり"
                },
                {
                    step: "5分で導入",
                    description: "アカウント作成から設定まで短時間で完了"
                },
                {
                    step: "即効果実感",
                    description: "その日から生産性向上を実感できるぞ"
                }
            ],
            finalMessage: "今日から1つでも導入して、生産性を爆上げするなり！",
            databaseImage: "/images/ten_point.png",
            additionalInfo: "詳細データはプロフィールのリンクから確認できるぞ"
        }
    };
}

// ヘルパー関数群
function getToolHighlightV2(item) {
    const toolData = item.metrics || {};
    const tenCriteria = toolData.ten_criteria || {};
    
    if (tenCriteria.immediate_effect >= 90) {
        return "導入即効果！";
    } else if (tenCriteria.low_barrier >= 90) {
        return "設定不要！";
    } else if (item.pricing?.free) {
        return "完全無料！";
    } else {
        return "人気急上昇！";
    }
}

function getToolIcon(category) {
    const iconMap = {
        "クラウドストレージ": "☁️",
        "タスク管理": "✅",
        "コミュニケーション": "💬",
        "プロジェクト管理": "📊",
        "文章校正": "✏️",
        "ノートアプリ": "📝",
        "パスワード管理": "🔐",
        "自動化": "⚙️"
    };
    return iconMap[category] || "🛠️";
}

function extractPlatforms(platforms) {
    const available = [];
    if (platforms.web) available.push("Web");
    if (platforms.windows) available.push("Windows");
    if (platforms.mac) available.push("Mac");
    if (platforms.ios) available.push("iOS");
    if (platforms.android) available.push("Android");
    return available.slice(0, 3); // 上位3つまで
}

function getUserBaseDescription(popularity) {
    if (popularity >= 90) return "数億ユーザー";
    if (popularity >= 80) return "数千万ユーザー";
    if (popularity >= 70) return "数百万ユーザー";
    return "十万ユーザー以上";
}

function getSpecialization(tool) {
    const category = tool.category;
    const specMap = {
        "クラウドストレージ": "ファイル保存・共有",
        "タスク管理": "タスク整理・進捗管理",
        "コミュニケーション": "チーム連携・情報共有",
        "プロジェクト管理": "プロジェクト可視化",
        "文章校正": "文章品質向上",
        "ノートアプリ": "知識管理・整理",
        "パスワード管理": "セキュリティ管理", 
        "自動化": "作業自動化・効率化"
    };
    return specMap[category] || "生産性向上";
}

function generateOverview(tool) {
    return `${tool.category}の定番ツール。${tool.name}は${getSpecialization(tool)}に特化し、多くのユーザーに愛用されている。`;
}

function generateTips(tool) {
    const defaultTips = [
        "まずは基本機能から使い始める",
        "チュートリアルを一通り確認",
        "他ツールとの連携を活用"
    ];
    
    // カテゴリ別の具体的なTips
    const categoryTips = {
        "タスク管理": ["自然言語入力を活用", "ラベルで分類整理", "定期タスクを設定"],
        "クラウドストレージ": ["共有リンクを活用", "自動同期設定", "容量を定期確認"],
        "コミュニケーション": ["通知設定を最適化", "ショートカットを覚える", "チャンネルを整理"]
    };
    
    return categoryTips[tool.category] || defaultTips;
}

function generateTenRecommendation(tool) {
    const tenCriteria = tool.metrics?.ten_criteria || {};
    
    if (tenCriteria.immediate_effect >= 90) {
        return "導入した瞬間から効果を実感できる逸品なり！拙者も毎日使っているぞ";
    } else if (tenCriteria.low_barrier >= 90) {
        return "設定不要で即使える最強ツール！めんどくさがりにピッタリなり";
    } else if (tool.pricing?.free) {
        return "無料版でも十分すぎる機能！コスパ最強の一品であるぞ";
    } else {
        return "多くの人が愛用している信頼の定番ツール。間違いない選択なり";
    }
}

function generateCaptionV2(ranking) {
    const top3 = ranking.slice(0, 3);
    
    const caption = `【無料で使える生産性向上ツールTOP10】

効率化したいけど、何から始めればいいかわからぬ...
そんな拙者と同じ悩みを持つ者へ！

実は無料で使える最強ツールがこんなにあるのであるぞ🔥

🥇 ${ranking[0].name}
→ ${getToolHighlightV2(ranking[0])}TENスコア${ranking[0].tenScore}点

🥈 ${ranking[1].name}
→ ${getToolHighlightV2(ranking[1])}TENスコア${ranking[1].tenScore}点

🥉 ${ranking[2].name}
→ ${getToolHighlightV2(ranking[2])}TENスコア${ranking[2].tenScore}点

全て無料で始められて、導入も5分以内なり！
めんどくさがりの拙者でも続いているツールばかりであるぞ

保存して、今日から1つでも試してみるなり！

#生産性向上 #効率化 #無料ツール #タスク管理 #時短術
#リモートワーク #ビジネスツール #仕事効率化 #ライフハック
#${ranking[0].name} #${ranking[1].name} #${ranking[2].name}`;
    
    return caption;
}

// 実行
if (require.main === module) {
    generateType003FeedV2();
}

module.exports = generateType003FeedV2;