const fs = require('fs');
const path = require('path');

/**
 * MENSA（メンサ）や知能・能力系資格を追加するスクリプト
 */

// 追加する知能・能力系資格データ
const additionalQualifications = [
    {
        name: "MENSA（メンサ）会員資格",
        category: "趣味・実用・その他系",
        organizer: "国際メンサ協会",
        type: "国際資格",
        description: "IQ上位2%（148以上）の人だけが入会できる国際的な高IQ団体の会員資格。知能の高さを証明する世界基準の資格。",
        difficulty: "最高難度",
        examType: "IQテスト",
        isLectureOnly: false
    },
    {
        name: "数学検定（実用数学技能検定）",
        category: "趣味・実用・その他系",
        organizer: "日本数学検定協会",
        type: "公的資格",
        description: "数学・算数の実用的な技能を測る検定。1級〜11級、準1級、準2級があり、数学的思考力を評価。",
        difficulty: "中難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "珠算能力検定（そろばん検定）",
        category: "趣味・実用・その他系",
        organizer: "全国珠算教育連盟",
        type: "公的資格",
        description: "そろばんを使った計算技能を認定する検定。段位から10級まであり、暗算力・計算力を評価。",
        difficulty: "中難度",
        examType: "実技試験",
        isLectureOnly: false
    },
    {
        name: "暗算検定",
        category: "趣味・実用・その他系",
        organizer: "全国珠算教育連盟",
        type: "公的資格",
        description: "暗算による計算技能を認定する検定。そろばんを使わない純粋な暗算力を測定。",
        difficulty: "中難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "記憶術検定",
        category: "趣味・実用・その他系",
        organizer: "日本記憶術協会",
        type: "民間資格",
        description: "記憶技術の習得レベルを認定する検定。効率的な記憶法や記憶力向上技術を評価。",
        difficulty: "中難度",
        examType: "筆記試験+実技",
        isLectureOnly: false
    },
    {
        name: "速読検定",
        category: "趣味・実用・その他系",
        organizer: "日本速読協会",
        type: "民間資格",
        description: "文章を素早く正確に読み取る能力を認定する検定。読書速度と理解度を総合的に評価。",
        difficulty: "中難度",
        examType: "実技試験",
        isLectureOnly: false
    },
    {
        name: "論理思考検定",
        category: "趣味・実用・その他系",
        organizer: "論理思考検定協会",
        type: "民間資格",
        description: "論理的思考力を測定・認定する検定。問題解決能力や批判的思考力を評価。",
        difficulty: "中難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "算盤技能検定（商工会議所主催）",
        category: "趣味・実用・その他系",
        organizer: "日本商工会議所",
        type: "公的資格",
        description: "商工会議所が認定するそろばん技能検定。ビジネス実務での計算力を重視した内容。",
        difficulty: "中難度",
        examType: "実技試験",
        isLectureOnly: false
    },
    {
        name: "クイズ検定",
        category: "趣味・実用・その他系",
        organizer: "日本クイズ協会",
        type: "民間資格",
        description: "幅広い知識とクイズ解答技術を認定する検定。一般教養から専門分野まで多様な問題を出題。",
        difficulty: "中難度",
        examType: "筆記試験",
        isLectureOnly: false
    },
    {
        name: "頭脳スポーツ検定",
        category: "趣味・実用・その他系",
        organizer: "頭脳スポーツ協会",
        type: "民間資格",
        description: "チェス、将棋、囲碁、オセロなどの頭脳スポーツの技能を総合的に認定する検定。",
        difficulty: "中難度",
        examType: "実技試験",
        isLectureOnly: false
    }
];

// 評価スコア計算
function calculateScores(qualification) {
    let jobRelevance = 5;
    let salaryImpact = 5;
    let careerValue = 5;
    
    // 資格区分による調整
    switch (qualification.type) {
        case '国家資格':
            jobRelevance += 3;
            salaryImpact += 2;
            careerValue += 3;
            break;
        case '公的資格':
            jobRelevance += 2;
            salaryImpact += 1;
            careerValue += 2;
            break;
        case '国際資格':
            jobRelevance += 3;
            salaryImpact += 2;
            careerValue += 2;
            break;
        case '民間資格':
            jobRelevance += 1;
            salaryImpact += 0;
            careerValue += 1;
            break;
    }
    
    // 難易度による調整
    switch (qualification.difficulty) {
        case '最高難度':
            salaryImpact += 3;
            careerValue += 3;
            break;
        case '高難度':
            salaryImpact += 2;
            careerValue += 2;
            break;
        case '中難度':
            salaryImpact += 1;
            careerValue += 1;
            break;
    }
    
    // MENSA特別調整（知名度・希少性による）
    if (qualification.name.includes('MENSA')) {
        careerValue += 2; // 話題性・差別化要素
        salaryImpact += 1; // 直接的な年収効果は限定的
    }
    
    // 知能・計算系資格は教育・学習分野で需要あり
    const mentalSkillKeywords = ['数学', '珠算', '暗算', '記憶', '速読', '論理'];
    if (mentalSkillKeywords.some(keyword => qualification.name.includes(keyword))) {
        jobRelevance += 1; // 教育関係での需要
    }
    
    return {
        jobRelevance: Math.min(jobRelevance, 10),
        salaryImpact: Math.min(salaryImpact, 10),
        careerValue: Math.min(careerValue, 10),
        totalScore: Math.min(jobRelevance + salaryImpact + careerValue, 30)
    };
}

// メイン処理
function addMensaAndOthers() {
    try {
        // 既存のマスターデータを読み込み
        const masterDataPath = path.join(__dirname, 'qualificationMasterData.json');
        let masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf8'));
        
        console.log(`追加前のデータ数: ${masterData.qualifications.length}資格`);
        
        // 新しい資格をマスターデータ形式に変換
        let idCounter = masterData.qualifications.length + 1;
        const newQualifications = additionalQualifications.map(qual => {
            const scores = calculateScores(qual);
            
            return {
                id: `Q${String(idCounter++).padStart(3, '0')}`,
                name: qual.name,
                category: qual.category,
                organizer: qual.organizer,
                type: qual.type,
                description: qual.description,
                difficulty: qual.difficulty,
                examType: qual.examType,
                isLectureOnly: qual.isLectureOnly,
                jobRelevance: scores.jobRelevance,
                salaryImpact: scores.salaryImpact,
                careerValue: scores.careerValue,
                source: "MENSA・知能系資格追加",
                totalScore: scores.totalScore
            };
        });
        
        // 重複チェック（名前ベース）
        const existingNames = new Set(masterData.qualifications.map(q => q.name));
        const uniqueNewQualifications = newQualifications.filter(qual => {
            if (existingNames.has(qual.name)) {
                console.log(`重複スキップ: ${qual.name}`);
                return false;
            }
            existingNames.add(qual.name);
            return true;
        });
        
        // 新しいデータを追加
        masterData.qualifications = [...masterData.qualifications, ...uniqueNewQualifications];
        
        // 統計情報更新
        const lectureOnlyCount = masterData.qualifications.filter(q => q.isLectureOnly).length;
        const nationalCount = masterData.qualifications.filter(q => q.type === '国家資格').length;
        const publicCount = masterData.qualifications.filter(q => q.type === '公的資格').length;
        const privateCount = masterData.qualifications.filter(q => q.type === '民間資格').length;
        const internationalCount = masterData.qualifications.filter(q => q.type === '国際資格').length;
        
        masterData.metadata = {
            ...masterData.metadata,
            totalQualifications: masterData.qualifications.length,
            lastUpdated: new Date().toISOString().split('T')[0],
            lectureOnlyCount,
            nationalLicenseCount: nationalCount,
            publicLicenseCount: publicCount,
            privateLicenseCount: privateCount,
            internationalLicenseCount: internationalCount,
            addedMensaAndOthers: uniqueNewQualifications.length
        };
        
        // 結果を保存
        fs.writeFileSync(masterDataPath, JSON.stringify(masterData, null, 2), 'utf8');
        
        console.log('=== MENSA・知能系資格追加完了 ===');
        console.log(`総資格数: ${masterData.metadata.totalQualifications}`);
        console.log(`今回追加: ${masterData.metadata.addedMensaAndOthers}資格`);
        console.log(`講習のみ資格: ${masterData.metadata.lectureOnlyCount}`);
        console.log(`国家資格: ${masterData.metadata.nationalLicenseCount}`);
        console.log(`公的資格: ${masterData.metadata.publicLicenseCount}`);
        console.log(`民間資格: ${masterData.metadata.privateLicenseCount}`);
        console.log(`国際資格: ${masterData.metadata.internationalLicenseCount}`);
        
        // 追加した資格一覧
        console.log('\\n=== 追加された資格一覧 ===');
        uniqueNewQualifications.forEach((qual, index) => {
            console.log(`${index + 1}. ${qual.name} (${qual.type}) - スコア: ${qual.totalScore}`);
        });
        
        // MENSAの詳細表示
        const mensaQual = masterData.qualifications.find(q => q.name.includes('MENSA'));
        if (mensaQual) {
            console.log('\\n=== MENSA詳細情報 ===');
            console.log(`名称: ${mensaQual.name}`);
            console.log(`区分: ${mensaQual.type}`);
            console.log(`主催: ${mensaQual.organizer}`);
            console.log(`難易度: ${mensaQual.difficulty}`);
            console.log(`就職関連度: ${mensaQual.jobRelevance}/10`);
            console.log(`年収影響: ${mensaQual.salaryImpact}/10`);
            console.log(`キャリア価値: ${mensaQual.careerValue}/10`);
            console.log(`総合スコア: ${mensaQual.totalScore}/30`);
        }
        
        return masterData;
        
    } catch (error) {
        console.error('エラーが発生しました:', error);
        process.exit(1);
    }
}

// スクリプト実行
if (require.main === module) {
    addMensaAndOthers();
}

module.exports = { addMensaAndOthers };