const fs = require('fs');
const path = require('path');

// Function to extract page roles from detailedContent
function extractPageRoles(detailedContent) {
    const roles = [];
    if (!detailedContent) return roles;
    
    // Get all page keys (page1, page2, etc.) and sort them
    const pageKeys = Object.keys(detailedContent).sort((a, b) => {
        const numA = parseInt(a.replace('page', ''));
        const numB = parseInt(b.replace('page', ''));
        return numA - numB;
    });
    
    pageKeys.forEach(pageKey => {
        const page = detailedContent[pageKey];
        if (page.role) {
            roles.push(page.role);
        } else if (page.type) {
            roles.push(page.type);
        } else {
            roles.push('unknown');
        }
    });
    
    return roles;
}

// Function to count role types
function countRoleTypes(roles) {
    const counts = {
        title: 0,
        cover: 0,
        problem: 0,
        solution: 0,
        cta: 0,
        information: 0,
        other: 0
    };
    
    roles.forEach(role => {
        if (role.includes('title') || role.includes('cover')) {
            counts.title++;
        } else if (role.includes('problem') || role.includes('identification')) {
            counts.problem++;
        } else if (role.includes('solution') || role.includes('point') || role.includes('method') || role.includes('advice')) {
            counts.solution++;
        } else if (role.includes('cta') || role.includes('engagement') || role.includes('profile')) {
            counts.cta++;
        } else if (role.includes('information') || role.includes('company') || role.includes('introduction')) {
            counts.information++;
        } else {
            counts.other++;
        }
    });
    
    return counts;
}

// Function to extract character count patterns
function extractCharacterPatterns(detailedContent) {
    const patterns = {
        averageTextLength: 0,
        maxTextLength: 0,
        minTextLength: Infinity,
        totalTextCount: 0
    };
    
    if (!detailedContent) return patterns;
    
    const textLengths = [];
    
    Object.values(detailedContent).forEach(page => {
        if (page.content) {
            if (Array.isArray(page.content)) {
                const totalLength = page.content.join(' ').length;
                textLengths.push(totalLength);
            } else if (typeof page.content === 'string') {
                textLengths.push(page.content.length);
            }
        }
        
        if (page.mainMessage) {
            textLengths.push(page.mainMessage.length);
        }
        
        if (page.title) {
            textLengths.push(page.title.length);
        }
    });
    
    if (textLengths.length > 0) {
        patterns.averageTextLength = Math.round(textLengths.reduce((a, b) => a + b, 0) / textLengths.length);
        patterns.maxTextLength = Math.max(...textLengths);
        patterns.minTextLength = Math.min(...textLengths);
        patterns.totalTextCount = textLengths.length;
    }
    
    return patterns;
}

// Function to extract layout patterns
function extractLayoutPatterns(detailedContent) {
    const layouts = [];
    
    if (!detailedContent) return layouts;
    
    Object.values(detailedContent).forEach(page => {
        const layout = {
            hasIllustration: !!(page.illustration || page.visualElements || page.elements),
            hasNumbers: !!(page.number || page.pointNumber || page.stepTitle),
            hasBackgroundImage: !!(page.backgroundImage || page.officeImage),
            designStyle: page.design || page.visualElements || 'unknown'
        };
        layouts.push(layout);
    });
    
    return layouts;
}

// Main analysis function
function analyzeAllFiles() {
    const dataDir = path.join(__dirname, 'app/data/knowledgeBase/knowledge');
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));
    
    const analysis = [];
    
    files.forEach(file => {
        try {
            const filePath = path.join(dataDir, file);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            
            const pageRoles = extractPageRoles(content.detailedContent);
            const roleCounts = countRoleTypes(pageRoles);
            const charPatterns = extractCharacterPatterns(content.detailedContent);
            const layoutPatterns = extractLayoutPatterns(content.detailedContent);
            
            analysis.push({
                knowledgeId: content.knowledgeId || file.replace('.json', ''),
                actualTitle: content.actualTitle || 'Unknown',
                pageCount: content.pageCount || 0,
                postType: content.postType || 'Unknown',
                problemCategory: content.problemCategory || 'Unknown',
                
                // 1. Page Role Sequence Analysis
                pageRoleSequence: pageRoles,
                openingSequence: pageRoles.slice(0, 3),
                closingSequence: pageRoles.slice(-3),
                
                // 2. Role Type Count Analysis
                roleCounts: roleCounts,
                
                // 3. Character Pattern Analysis
                characterPatterns: charPatterns,
                
                // 4. Layout Pattern Analysis
                layoutPatterns: layoutPatterns,
                hasConsistentLayout: layoutPatterns.every(layout => 
                    layout.designStyle === layoutPatterns[0]?.designStyle
                ),
                illustrationUsage: layoutPatterns.filter(layout => layout.hasIllustration).length / layoutPatterns.length
            });
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    });
    
    return analysis;
}

// Function to find similar patterns
function findSimilarPatterns(analysis) {
    const groups = [];
    
    // Group by exact page role sequences
    const sequenceGroups = {};
    analysis.forEach(item => {
        const sequenceKey = item.pageRoleSequence.join('|');
        if (!sequenceGroups[sequenceKey]) {
            sequenceGroups[sequenceKey] = [];
        }
        sequenceGroups[sequenceKey].push(item);
    });
    
    // Group by similar role counts
    const roleCountGroups = {};
    analysis.forEach(item => {
        const countKey = `${item.roleCounts.title}-${item.roleCounts.problem}-${item.roleCounts.solution}-${item.roleCounts.cta}`;
        if (!roleCountGroups[countKey]) {
            roleCountGroups[countKey] = [];
        }
        roleCountGroups[countKey].push(item);
    });
    
    // Group by page count
    const pageCountGroups = {};
    analysis.forEach(item => {
        if (!pageCountGroups[item.pageCount]) {
            pageCountGroups[item.pageCount] = [];
        }
        pageCountGroups[item.pageCount].push(item);
    });
    
    return {
        exactSequenceMatches: Object.entries(sequenceGroups).filter(([_, items]) => items.length > 1),
        roleCountMatches: Object.entries(roleCountGroups).filter(([_, items]) => items.length > 1),
        pageCountMatches: Object.entries(pageCountGroups).filter(([_, items]) => items.length > 1)
    };
}

// Generate comparison matrix
function generateComparisonMatrix(analysis) {
    const matrix = analysis.map(item => ({
        knowledgeId: item.knowledgeId,
        actualTitle: item.actualTitle,
        pageCount: item.pageCount,
        postType: item.postType,
        pageRoleSequence: item.pageRoleSequence.join(' → '),
        openingPattern: item.openingSequence.join(' → '),
        closingPattern: item.closingSequence.join(' → '),
        roleCounts: `T:${item.roleCounts.title} P:${item.roleCounts.problem} S:${item.roleCounts.solution} C:${item.roleCounts.cta}`,
        avgCharLength: item.characterPatterns.averageTextLength,
        illustrationUsage: Math.round(item.illustrationUsage * 100) + '%'
    }));
    
    return matrix;
}

// Run analysis
const analysis = analyzeAllFiles();
const similarPatterns = findSimilarPatterns(analysis);
const comparisonMatrix = generateComparisonMatrix(analysis);

// Output results
const results = {
    totalFiles: analysis.length,
    summary: {
        uniqueSequences: Object.keys(similarPatterns.exactSequenceMatches).length,
        uniqueRoleCounts: Object.keys(similarPatterns.roleCountMatches).length,
        uniquePageCounts: Object.keys(similarPatterns.pageCountMatches).length
    },
    exactSequenceMatches: similarPatterns.exactSequenceMatches.map(([sequence, items]) => ({
        sequence: sequence.replace(/\|/g, ' → '),
        count: items.length,
        files: items.map(item => item.knowledgeId)
    })),
    roleCountMatches: similarPatterns.roleCountMatches.map(([counts, items]) => ({
        pattern: counts,
        count: items.length,
        files: items.map(item => item.knowledgeId)
    })),
    pageCountMatches: similarPatterns.pageCountMatches.map(([count, items]) => ({
        pageCount: parseInt(count),
        count: items.length,
        files: items.map(item => item.knowledgeId)
    })),
    comparisonMatrix: comparisonMatrix,
    detailedAnalysis: analysis
};

// Write results to file
fs.writeFileSync('uniqueness_patterns_analysis.json', JSON.stringify(results, null, 2));
console.log('Analysis complete! Results written to uniqueness_patterns_analysis.json');
console.log(`Analyzed ${results.totalFiles} files`);
console.log(`Found ${results.exactSequenceMatches.length} groups with identical sequences`);
console.log(`Found ${results.roleCountMatches.length} groups with identical role counts`);
console.log(`Found ${results.pageCountMatches.length} groups with identical page counts`);