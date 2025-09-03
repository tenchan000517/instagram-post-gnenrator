const fs = require('fs');
const path = require('path');

// データベースファイルのパス
const dbPath = '/mnt/c/instagram-course/instagram-post-generator/app/data/companyDatabase/companyMasterData.json';

console.log('年収データの桁数修正を開始...');

try {
    // JSONファイルを読み込み
    const rawData = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(rawData);
    
    let fixedCount = 0;
    
    // 各業界を処理
    data.industries.forEach(industry => {
        industry.companies.forEach(company => {
            if (company.metrics && company.metrics.salary) {
                const salary = company.metrics.salary;
                
                // salaryが3桁または4桁の数字の場合（万円として扱われているべき）
                if (typeof salary === 'number' && salary >= 100 && salary <= 9999) {
                    // 万円を円に変換（×10000）
                    const correctedSalary = salary * 10000;
                    
                    console.log(`${company.companyName}: ${salary}万円 → ${correctedSalary}円 (${Math.floor(correctedSalary/10000)}万円)`);
                    
                    company.metrics.salary = correctedSalary;
                    fixedCount++;
                }
            }
        });
    });
    
    console.log(`\n修正完了: ${fixedCount}社の年収データを修正しました`);
    
    // 修正されたデータを保存
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    console.log('データベースファイルを更新しました');
    
} catch (error) {
    console.error('エラー:', error);
    process.exit(1);
}