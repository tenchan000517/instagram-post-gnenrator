const fs = require('fs');
const data = JSON.parse(fs.readFileSync('uniqueness_patterns_analysis.json', 'utf8'));

// Get files with clear role patterns (not unknown)
const clearPatterns = data.comparisonMatrix.filter(item => 
  !item.pageRoleSequence.includes('unknown') && item.pageCount > 5
);

console.log('FILES WITH CLEAR ROLE PATTERNS (5+ PAGES):');
console.log('===========================================\n');

clearPatterns.slice(0, 15).forEach(item => {
  console.log(`${item.knowledgeId}: ${item.actualTitle}`);
  console.log(`  Pages: ${item.pageCount}, Type: ${item.postType}`);
  console.log(`  Sequence: ${item.pageRoleSequence}`);
  console.log(`  Role Counts: ${item.roleCounts}`);
  console.log(`  Avg Char Length: ${item.avgCharLength}, Illustration Usage: ${item.illustrationUsage}`);
  console.log('');
});

// Group by similar patterns
console.log('\nGROUPING BY SIMILAR PATTERNS:');
console.log('==============================\n');

// Group by role count patterns
const roleGroups = {};
clearPatterns.forEach(item => {
  const key = item.roleCounts;
  if (!roleGroups[key]) roleGroups[key] = [];
  roleGroups[key].push(item);
});

Object.entries(roleGroups).forEach(([pattern, items]) => {
  if (items.length > 1) {
    console.log(`Role Count Pattern "${pattern}": ${items.length} files`);
    items.forEach(item => {
      console.log(`  - ${item.knowledgeId}: ${item.actualTitle}`);
    });
    console.log('');
  }
});

// Group by page count
console.log('GROUPING BY PAGE COUNT:');
console.log('=======================\n');

const pageGroups = {};
clearPatterns.forEach(item => {
  const key = item.pageCount;
  if (!pageGroups[key]) pageGroups[key] = [];
  pageGroups[key].push(item);
});

Object.entries(pageGroups).forEach(([pageCount, items]) => {
  if (items.length > 1) {
    console.log(`${pageCount} Pages: ${items.length} files`);
    items.forEach(item => {
      console.log(`  - ${item.knowledgeId}: ${item.actualTitle} [${item.postType}]`);
    });
    console.log('');
  }
});

// Common opening/closing patterns
console.log('COMMON OPENING PATTERNS:');
console.log('========================\n');

const openingGroups = {};
clearPatterns.forEach(item => {
  const key = item.openingPattern;
  if (!openingGroups[key]) openingGroups[key] = [];
  openingGroups[key].push(item);
});

Object.entries(openingGroups).forEach(([pattern, items]) => {
  if (items.length > 1) {
    console.log(`Opening Pattern "${pattern}": ${items.length} files`);
    items.forEach(item => {
      console.log(`  - ${item.knowledgeId}: ${item.actualTitle}`);
    });
    console.log('');
  }
});