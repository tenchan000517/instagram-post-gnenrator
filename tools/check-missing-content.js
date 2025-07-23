#!/usr/bin/env node

/**
 * 不足しているコンテンツIDを特定するチェッカー
 */

const fs = require('fs');
const path = require('path');

function checkMissingContent() {
    const filePath = path.join(process.cwd(), 'app', 'services', 'knowledgeBase', 'data', 'problemSolutionPairs.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // 実際に存在するコンテンツIDを抽出
    const existingContents = new Set();
    Object.entries(data.pairs || {}).forEach(([key, entry]) => {
        if (entry.source) {
            const match = entry.source.match(/contents-(\d+)/);
            if (match) {
                existingContents.add(parseInt(match[1]));
            }
        }
    });
    
    // 期待されるコンテンツID範囲
    const expectedRanges = [
        { start: 1, end: 84 },   // contents-001 to contents-084
        { start: 101, end: 116 } // contents-101 to contents-116
    ];
    
    const expectedContents = new Set();
    expectedRanges.forEach(range => {
        for (let i = range.start; i <= range.end; i++) {
            expectedContents.add(i);
        }
    });
    
    // 不足しているコンテンツ
    const missingContents = [];
    expectedContents.forEach(id => {
        if (!existingContents.has(id)) {
            missingContents.push(id);
        }
    });
    
    // 期待範囲外の追加コンテンツ
    const extraContents = [];
    existingContents.forEach(id => {
        if (!expectedContents.has(id)) {
            extraContents.push(id);
        }
    });
    
    console.log('📋 コンテンツIDチェック結果\n');
    
    console.log(`📊 統計:`);
    console.log(`  期待コンテンツ数: ${expectedContents.size} (001-084: 84個, 101-116: 16個)`);
    console.log(`  実際のコンテンツ数: ${existingContents.size}`);
    console.log(`  不足: ${missingContents.length}個`);
    console.log(`  追加: ${extraContents.length}個\n`);
    
    if (missingContents.length > 0) {
        console.log(`❌ 不足しているコンテンツ (${missingContents.length}個):`);
        const missingFormatted = missingContents.map(id => `contents-${id.toString().padStart(3, '0')}`);
        console.log(missingFormatted.join(', '));
        console.log();
    }
    
    if (extraContents.length > 0) {
        console.log(`➕ 期待範囲外の追加コンテンツ (${extraContents.length}個):`);
        const extraFormatted = extraContents.map(id => `contents-${id.toString().padStart(3, '0')}`);
        console.log(extraFormatted.join(', '));
        console.log();
    }
    
    // 実際のcontents範囲を表示
    const sortedExisting = Array.from(existingContents).sort((a, b) => a - b);
    console.log(`📋 実際に存在するコンテンツ範囲:`);
    console.log(`  最小: contents-${sortedExisting[0].toString().padStart(3, '0')}`);
    console.log(`  最大: contents-${sortedExisting[sortedExisting.length-1].toString().padStart(3, '0')}`);
    
    // 連続していない部分を表示
    const gaps = [];
    for (let i = 1; i < sortedExisting.length; i++) {
        const current = sortedExisting[i];
        const previous = sortedExisting[i-1];
        if (current - previous > 1) {
            for (let gap = previous + 1; gap < current; gap++) {
                gaps.push(gap);
            }
        }
    }
    
    if (gaps.length > 0) {
        console.log(`\n🔍 連続していない部分 (${gaps.length}個):`);
        const gapsFormatted = gaps.map(id => `contents-${id.toString().padStart(3, '0')}`);
        console.log(gapsFormatted.join(', '));
    }
}

checkMissingContent();