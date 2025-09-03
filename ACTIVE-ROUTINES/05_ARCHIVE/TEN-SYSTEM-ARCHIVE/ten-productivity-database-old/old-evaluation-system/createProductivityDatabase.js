const fs = require('fs');
const path = require('path');

/**
 * 生産性データベース統合システム
 * 企業データベースのcreateUnifiedDatabase.jsの構造を完全踏襲
 */

// カテゴリファイルマッピング
const categoryFiles = [
    // 生産性ツール系
    { file: 'productivity_tools.json', id: 'TOOLS', name: '生産性ツール' },
    { file: 'note_apps.json', id: 'NOTE', name: 'ノートアプリ' },
    { file: 'task_management.json', id: 'TASK', name: 'タスク管理' },
    { file: 'automation_tools.json', id: 'AUTOMATION', name: '自動化ツール' },
    { file: 'password_managers.json', id: 'PASSWORD', name: 'パスワード管理' },
    
    // デバイス・ガジェット系
    { file: 'keyboards.json', id: 'KEYBOARD', name: 'キーボード' },
    { file: 'mice.json', id: 'MOUSE', name: 'マウス' },
    { file: 'monitors.json', id: 'MONITOR', name: 'モニター' },
    { file: 'headphones.json', id: 'HEADPHONE', name: 'ヘッドホン' },
    { file: 'desk_accessories.json', id: 'DESK', name: 'デスクアクセサリー' },
    
    // モバイルアプリ系
    { file: 'mobile_productivity.json', id: 'MOBILE', name: 'モバイル生産性' },
    { file: 'learning_apps.json', id: 'LEARNING', name: '学習アプリ' },
    { file: 'habit_apps.json', id: 'HABIT', name: '習慣化アプリ' },
    
    // ルーティン・習慣系
    { file: 'morning_routines.json', id: 'MORNING', name: '朝活ルーティン' },
    { file: 'work_routines.json', id: 'WORK', name: '仕事効率化ルーティン' },
    
    // 資格・スキルアップ系
    { file: 'quick_certificates.json', id: 'CERT', name: 'すぐとれる資格' },
    { file: 'skill_platforms.json', id: 'SKILL', name: 'スキル学習プラットフォーム' }
];

const categoriesDir = path.join(__dirname, '../');
const outputFile = path.join(__dirname, 'productivityMasterData.json');

function createProductivityDatabase() {
    const unifiedData = {
        version: "2025-08-29",
        lastUpdated: "2025-08-29",
        totalCategories: categoryFiles.length,
        totalItems: 0,
        categories: [],
        metadata: {
            target_persona: "TEN",
            target_age: "26-29",
            psychology: "手段は決まっているが行動しない層",
            focus: "即効性・簡単さ・人気度・コスパ"
        }
    };

    console.log('🚀 生産性データベース統合開始...');

    categoryFiles.forEach(({ file, id, name }) => {
        const filePath = path.join(categoriesDir, getSubDirectory(id), file);
        
        try {
            if (fs.existsSync(filePath)) {
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                
                // データ形式の正規化（配列またはオブジェクト対応）
                const items = Array.isArray(data) ? data : (data.items || []);
                
                // 平均スコア計算
                let averageScore = 0;
                if (data.averageScore) {
                    averageScore = data.averageScore;
                } else if (items.length > 0) {
                    const scores = items
                        .map(item => item.ten_criteria?.immediate_effect || item.metrics?.productivity_score)
                        .filter(s => s != null && s > 0);
                    if (scores.length > 0) {
                        averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
                    }
                }
                
                const categoryData = {
                    categoryId: id,
                    categoryName: name,
                    totalItems: items.length,
                    averageScore: averageScore,
                    items: items.map(item => ({
                        ...item,
                        categoryId: id,
                        categoryName: name
                    }))
                };

                unifiedData.categories.push(categoryData);
                unifiedData.totalItems += categoryData.totalItems;
                
                console.log(`✅ 処理完了: ${name} - ${categoryData.totalItems}アイテム`);
            } else {
                console.log(`⚠️ ファイル未作成: ${file} (後で作成予定)`);
                
                // 空のカテゴリを追加（将来の拡張用）
                const emptyCategory = {
                    categoryId: id,
                    categoryName: name,
                    totalItems: 0,
                    averageScore: 0,
                    items: []
                };
                unifiedData.categories.push(emptyCategory);
            }
        } catch (error) {
            console.error(`❌ エラー ${file}:`, error.message);
        }
    });

    // 統合データベースファイル出力
    fs.writeFileSync(outputFile, JSON.stringify(unifiedData, null, 2), 'utf8');
    
    console.log('\n🎉 生産性データベース統合完了！');
    console.log(`📊 総カテゴリ数: ${unifiedData.totalCategories}`);
    console.log(`🛠️ 総アイテム数: ${unifiedData.totalItems}`);
    console.log(`📁 出力ファイル: ${outputFile}`);
    
    return unifiedData;
}

// カテゴリIDからサブディレクトリ名を取得
function getSubDirectory(categoryId) {
    const mapping = {
        'TOOLS': 'tools',
        'NOTE': 'tools', 
        'TASK': 'tools',
        'AUTOMATION': 'tools',
        'PASSWORD': 'tools',
        'KEYBOARD': 'gadgets',
        'MOUSE': 'gadgets',
        'MONITOR': 'gadgets',
        'HEADPHONE': 'gadgets', 
        'DESK': 'gadgets',
        'MOBILE': 'apps',
        'LEARNING': 'apps',
        'HABIT': 'apps',
        'MORNING': 'routines',
        'WORK': 'routines',
        'CERT': 'certificates',
        'SKILL': 'certificates'
    };
    return mapping[categoryId] || 'tools';
}

// TEN特化スコア計算関数
function calculateTenScore(item) {
    const criteria = item.ten_criteria || {};
    const weights = {
        immediate_effect: 0.25,
        low_barrier: 0.25,
        trend_factor: 0.20,
        cost_effectiveness: 0.20,
        lazy_friendly: 0.10
    };
    
    let totalScore = 0;
    Object.keys(weights).forEach(key => {
        if (criteria[key]) {
            totalScore += criteria[key] * weights[key];
        }
    });
    
    return Math.round(totalScore);
}

// 統計情報生成
function generateStats(unifiedData) {
    const stats = {
        total_items: unifiedData.totalItems,
        categories_with_data: unifiedData.categories.filter(c => c.totalItems > 0).length,
        top_category: null,
        average_ten_score: 0
    };
    
    // 最大カテゴリ
    const maxCategory = unifiedData.categories.reduce((max, cat) => 
        cat.totalItems > max.totalItems ? cat : max
    );
    stats.top_category = maxCategory.categoryName;
    
    // 平均TENスコア
    let allItems = [];
    unifiedData.categories.forEach(cat => {
        allItems.push(...cat.items);
    });
    
    if (allItems.length > 0) {
        const tenScores = allItems.map(item => calculateTenScore(item)).filter(s => s > 0);
        if (tenScores.length > 0) {
            stats.average_ten_score = Math.round(tenScores.reduce((a, b) => a + b, 0) / tenScores.length);
        }
    }
    
    return stats;
}

// 直接実行時
if (require.main === module) {
    const result = createProductivityDatabase();
    const stats = generateStats(result);
    
    console.log('\n📈 統計情報:');
    console.log(`🏆 最大カテゴリ: ${stats.top_category}`);
    console.log(`📊 平均TENスコア: ${stats.average_ten_score}`);
    console.log(`✅ データありカテゴリ: ${stats.categories_with_data}/${result.totalCategories}`);
}

module.exports = {
    createProductivityDatabase,
    calculateTenScore,
    generateStats
};