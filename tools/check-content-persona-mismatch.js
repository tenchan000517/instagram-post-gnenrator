#!/usr/bin/env node

/**
 * コンテンツIDとペルソナ番号の不一致チェッカー
 */

const fs = require('fs');
const path = require('path');

function checkMismatch() {
    const filePath = path.join(process.cwd(), 'app', 'services', 'knowledgeBase', 'data', 'problemSolutionPairs.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    const mismatches = [];
    const duplicatePersonas = {};
    
    Object.entries(data.pairs || {}).forEach(([key, entry]) => {
        const source = entry.source;
        const persona = entry.targetPersona;
        
        if (!source || !persona) return;
        
        // contents-XXX から番号を抽出
        const contentMatch = source.match(/contents-0*(\d+)/);
        if (!contentMatch) return;
        
        const contentNumber = parseInt(contentMatch[1]);
        const expectedPersona = `P${contentNumber.toString().padStart(3, '0')}`;
        
        // 不一致チェック
        if (persona !== expectedPersona) {
            mismatches.push({
                key,
                source,
                actual: persona,
                expected: expectedPersona,
                title: entry.actualTitle
            });
        }
        
        // 重複ペルソナカウント
        if (!duplicatePersonas[persona]) {
            duplicatePersonas[persona] = [];
        }
        duplicatePersonas[persona].push({
            key,
            source,
            title: entry.actualTitle,
            category: entry.problemCategory
        });
    });
    
    console.log('🔍 コンテンツID-ペルソナ不一致チェック結果\n');
    
    // 不一致表示
    console.log(`❌ 不一致件数: ${mismatches.length}件\n`);
    mismatches.slice(0, 20).forEach(mismatch => {
        console.log(`${mismatch.source} → ${mismatch.actual} (期待値: ${mismatch.expected})`);
        console.log(`   タイトル: ${mismatch.title}\n`);
    });
    
    if (mismatches.length > 20) {
        console.log(`... 他${mismatches.length - 20}件\n`);
    }
    
    // 重複ペルソナ表示
    const duplicates = Object.entries(duplicatePersonas).filter(([persona, entries]) => entries.length > 1);
    console.log(`🔄 重複ペルソナ: ${duplicates.length}件\n`);
    
    duplicates.forEach(([persona, entries]) => {
        console.log(`${persona}: ${entries.length}件`);
        entries.forEach(entry => {
            console.log(`  - ${entry.source}: ${entry.title} (${entry.category})`);
        });
        console.log();
    });
    
    // 修正提案
    if (mismatches.length > 0) {
        console.log('📋 修正提案:');
        console.log('1. コンテンツ番号とペルソナ番号を一致させる');
        console.log('2. または、ペルソナ割り当てを内容に基づいて適切に修正する');
        console.log('3. 重複ペルソナは統合または分離を検討');
    }
}

checkMismatch();