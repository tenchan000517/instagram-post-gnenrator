const fs = require('fs');
const path = require('path');

/**
 * 資格データベース統合スクリプト
 * ChatGPT調査結果と国家資格リストを統合して完全なマスターデータを作成
 */

// 講習のみで取得可能な資格を特定する関数
function identifyLectureOnlyQualifications(qualifications) {
    const lectureOnlyKeywords = [
        '講習', '研修', '受講', 'セミナー', '講座', 
        '衛生責任者', '防災士', '司書', '食品衛生',
        'アドバイザー', 'インストラクター', 'コーディネーター'
    ];
    
    return qualifications.map(qual => {
        const isLectureOnly = lectureOnlyKeywords.some(keyword => 
            qual.name.includes(keyword) || 
            qual.description.includes(keyword) ||
            qual.examType === '講習会のみ' ||
            qual.examType === '講習+試験'
        );
        
        return {
            ...qual,
            isLectureOnly: isLectureOnly
        };
    });
}

// 評価スコア計算関数
function calculateQualificationScores(qualifications) {
    return qualifications.map(qual => {
        // 基本スコア計算
        let jobRelevanceScore = 5; // デフォルト
        let salaryImpactScore = 5;
        let careerValueScore = 5;
        
        // 資格区分による調整
        if (qual.type === '国家資格') {
            jobRelevanceScore += 3;
            salaryImpactScore += 2;
            careerValueScore += 3;
        } else if (qual.type === '公的資格') {
            jobRelevanceScore += 2;
            salaryImpactScore += 1;
            careerValueScore += 2;
        }
        
        // 難易度による調整
        switch (qual.difficulty) {
            case '最高難度':
                salaryImpactScore += 3;
                careerValueScore += 3;
                break;
            case '高難度':
                salaryImpactScore += 2;
                careerValueScore += 2;
                break;
            case '中難度':
                salaryImpactScore += 1;
                careerValueScore += 1;
                break;
        }
        
        // 業界重要度による調整
        const highDemandCategories = [
            'IT・情報技術系', '医療・看護・介護系', 
            'ビジネス・経営系', '建築・工事・技術系'
        ];
        
        if (highDemandCategories.includes(qual.category)) {
            jobRelevanceScore += 2;
            salaryImpactScore += 1;
        }
        
        // 10点満点に正規化
        return {
            ...qual,
            jobRelevance: Math.min(jobRelevanceScore, 10),
            salaryImpact: Math.min(salaryImpactScore, 10),
            careerValue: Math.min(careerValueScore, 10),
            totalScore: Math.min(jobRelevanceScore + salaryImpactScore + careerValueScore, 30)
        };
    });
}

// メイン処理
function createMasterDatabase() {
    try {
        // 既存のマスターデータを読み込み
        const masterDataPath = path.join(__dirname, 'qualificationMasterData.json');
        let masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf8'));
        
        console.log(`現在のデータ数: ${masterData.qualifications.length}資格`);
        
        // 講習のみ資格の特定
        masterData.qualifications = identifyLectureOnlyQualifications(masterData.qualifications);
        
        // 評価スコア計算
        masterData.qualifications = calculateQualificationScores(masterData.qualifications);
        
        // 重複チェック（名前ベース）
        const uniqueQualifications = [];
        const nameSet = new Set();
        
        masterData.qualifications.forEach(qual => {
            if (!nameSet.has(qual.name)) {
                nameSet.add(qual.name);
                uniqueQualifications.push(qual);
            } else {
                console.log(`重複を検出して削除: ${qual.name}`);
            }
        });
        
        masterData.qualifications = uniqueQualifications;
        
        // 統計情報更新
        masterData.metadata = {
            ...masterData.metadata,
            totalQualifications: masterData.qualifications.length,
            lastUpdated: new Date().toISOString().split('T')[0],
            lectureOnlyCount: masterData.qualifications.filter(q => q.isLectureOnly).length,
            nationalLicenseCount: masterData.qualifications.filter(q => q.type === '国家資格').length,
            publicLicenseCount: masterData.qualifications.filter(q => q.type === '公的資格').length,
            privateLicenseCount: masterData.qualifications.filter(q => q.type === '民間資格').length
        };
        
        // 結果を保存
        fs.writeFileSync(masterDataPath, JSON.stringify(masterData, null, 2), 'utf8');
        
        console.log('=== 資格データベース統合完了 ===');
        console.log(`総資格数: ${masterData.metadata.totalQualifications}`);
        console.log(`講習のみ資格: ${masterData.metadata.lectureOnlyCount}`);
        console.log(`国家資格: ${masterData.metadata.nationalLicenseCount}`);
        console.log(`公的資格: ${masterData.metadata.publicLicenseCount}`);
        console.log(`民間資格: ${masterData.metadata.privateLicenseCount}`);
        
        // 講習のみ資格リスト出力
        const lectureOnlyQuals = masterData.qualifications
            .filter(q => q.isLectureOnly)
            .sort((a, b) => b.totalScore - a.totalScore);
        
        console.log('\\n=== 講習のみで取得可能な資格TOP10 ===');
        lectureOnlyQuals.slice(0, 10).forEach((qual, index) => {
            console.log(`${index + 1}. ${qual.name} (${qual.type}) - スコア: ${qual.totalScore}`);
        });
        
        return masterData;
        
    } catch (error) {
        console.error('エラーが発生しました:', error);
        process.exit(1);
    }
}

// スクリプト実行
if (require.main === module) {
    createMasterDatabase();
}

module.exports = { createMasterDatabase, calculateQualificationScores, identifyLectureOnlyQualifications };