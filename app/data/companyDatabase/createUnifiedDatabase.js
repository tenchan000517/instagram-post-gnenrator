const fs = require('fs');
const path = require('path');

// Industry file mappings
const industryFiles = [
    // 既存15業界
    { file: 'IT_companies.json', id: 'IT', name: 'IT業界' },
    { file: 'trading_companies.json', id: 'TRADING', name: '商社業界' },
    { file: 'electronics_companies.json', id: 'ELECTRONICS', name: '総合電機業界' },
    { file: 'gaming_companies.json', id: 'GAMING', name: 'ゲーム・エンターテインメント業界' },
    { file: 'financial_companies.json', id: 'FINANCIAL', name: '金融業界' },
    { file: 'consulting_companies.json', id: 'CONSULTING', name: 'コンサルティング業界' },
    { file: 'automotive_companies.json', id: 'AUTOMOTIVE', name: '自動車業界' },
    { file: 'media_companies.json', id: 'MEDIA', name: 'メディア・広告業界' },
    { file: 'realestate_companies.json', id: 'REALESTATE', name: '不動産・建設業界' },
    { file: 'chemical_companies.json', id: 'CHEMICAL', name: '化学業界' },
    { file: 'foreign_it_companies.json', id: 'FOREIGN_IT', name: '外資系IT・EC業界' },
    { file: 'retail_companies.json', id: 'RETAIL', name: '小売・サービス業界' },
    { file: 'pharmaceutical_companies.json', id: 'PHARMACEUTICAL', name: '製薬業界' },
    { file: 'telecom_companies.json', id: 'TELECOM', name: '通信インフラ業界' },
    { file: 'infrastructure_companies.json', id: 'INFRASTRUCTURE', name: 'インフラ業界' },
    
    // 新規追加6業界
    { file: 'government_companies.json', id: 'GOVERNMENT', name: '官公庁・公社・団体' },
    { file: 'medical_companies.json', id: 'MEDICAL', name: '医療・調剤薬局' },
    { file: 'transport_companies.json', id: 'TRANSPORT', name: '鉄道・航空' },
    { file: 'machinery_companies.json', id: 'MACHINERY', name: '機械' },
    { file: 'hr_companies.json', id: 'HR', name: '人材サービス' },
    { file: 'banking_companies.json', id: 'BANKING', name: '銀行・証券' },
    
    // 拡張業界2業界
    { file: 'food_companies.json', id: 'FOOD', name: '食品・農林・水産' },
    { file: 'logistics_companies.json', id: 'LOGISTICS', name: '運輸・物流・エネルギー' }
];

const industriesDir = path.join(__dirname, 'industries');
const outputFile = path.join(__dirname, 'companyMasterData.json');

function createUnifiedDatabase() {
    const unifiedData = {
        version: "2025-08-28",
        lastUpdated: "2025-08-28",
        totalIndustries: industryFiles.length,
        totalCompanies: 0,
        industries: [],
        categories: {
            industry: industryFiles.map(item => item.name)
        }
    };

    console.log('Creating unified company database...');

    industryFiles.forEach(({ file, id, name }) => {
        const filePath = path.join(industriesDir, file);
        
        try {
            if (fs.existsSync(filePath)) {
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                
                // Handle both array format [...] and object format {companies: [...]}
                const companies = Array.isArray(data) ? data : (data.companies || []);
                
                // Calculate average salary if not provided
                let averageSalary = 0;
                if (data.averageSalary) {
                    averageSalary = data.averageSalary;
                } else if (companies.length > 0) {
                    const salaries = companies
                        .map(c => c.metrics?.salary)
                        .filter(s => s != null && s > 0);
                    if (salaries.length > 0) {
                        averageSalary = Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length);
                    }
                }
                
                const industryData = {
                    industryId: id,
                    industryName: name,
                    totalCompanies: companies.length,
                    averageSalary: averageSalary,
                    companies: companies
                };

                unifiedData.industries.push(industryData);
                unifiedData.totalCompanies += industryData.totalCompanies;
                
                console.log(`✓ Processed ${name}: ${industryData.totalCompanies} companies`);
            } else {
                console.log(`⚠️  File not found: ${file}`);
            }
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error.message);
        }
    });

    // Write unified database
    fs.writeFileSync(outputFile, JSON.stringify(unifiedData, null, 2), 'utf8');
    
    console.log('\n🎉 Unified database created successfully!');
    console.log(`📊 Total Industries: ${unifiedData.totalIndustries}`);
    console.log(`🏢 Total Companies: ${unifiedData.totalCompanies}`);
    console.log(`📁 Output: ${outputFile}`);
    
    return unifiedData;
}

// Execute if run directly
if (require.main === module) {
    createUnifiedDatabase();
}

module.exports = createUnifiedDatabase;