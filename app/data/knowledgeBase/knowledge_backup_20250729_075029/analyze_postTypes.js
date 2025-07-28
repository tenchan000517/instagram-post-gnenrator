const fs = require('fs');
const path = require('path');

// 結果を格納するオブジェクト
const results = {
  type001: [],
  type002: [],
  type003: [],
  type004: [],
  noPostType: [],
  errorFiles: []
};

// ディレクトリ内のファイルを読み込む
const directoryPath = __dirname;
const files = fs.readdirSync(directoryPath);

// K*.jsonファイルのみを処理
const kFiles = files.filter(file => /^K\d+.*\.json$/.test(file));

kFiles.forEach(filename => {
  try {
    const filePath = path.join(directoryPath, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    if (data.postType) {
      switch(data.postType) {
        case '001':
          results.type001.push({ filename, postType: data.postType });
          break;
        case '002':
          results.type002.push({ filename, postType: data.postType });
          break;
        case '003':
          results.type003.push({ filename, postType: data.postType });
          break;
        case '004':
          results.type004.push({ filename, postType: data.postType });
          break;
        default:
          results.noPostType.push({ filename, postType: data.postType });
      }
    } else {
      results.noPostType.push({ filename, postType: 'undefined' });
    }
  } catch (error) {
    results.errorFiles.push({ filename, error: error.message });
  }
});

// 結果を出力
console.log('=== PostType分析結果 ===\n');

console.log(`1. type001に分類されるファイル一覧 (${results.type001.length}件):`);
results.type001.forEach(item => console.log(`   - ${item.filename}`));

console.log(`\n2. type002に分類されるファイル一覧 (${results.type002.length}件):`);
results.type002.forEach(item => console.log(`   - ${item.filename}`));

console.log(`\n3. type003に分類されるファイル一覧 (${results.type003.length}件):`);
results.type003.forEach(item => console.log(`   - ${item.filename}`));

console.log(`\n4. type004に分類されるファイル一覧 (${results.type004.length}件):`);
results.type004.forEach(item => console.log(`   - ${item.filename}`));

console.log(`\n5. postTypeが設定されていないファイル一覧 (${results.noPostType.length}件):`);
results.noPostType.forEach(item => console.log(`   - ${item.filename} (postType: ${item.postType})`));

if (results.errorFiles.length > 0) {
  console.log(`\n6. エラーが発生したファイル一覧 (${results.errorFiles.length}件):`);
  results.errorFiles.forEach(item => console.log(`   - ${item.filename}: ${item.error}`));
}

// サマリー
console.log('\n=== サマリー ===');
console.log(`総ファイル数: ${kFiles.length}`);
console.log(`type001: ${results.type001.length}件`);
console.log(`type002: ${results.type002.length}件`);
console.log(`type003: ${results.type003.length}件`);
console.log(`type004: ${results.type004.length}件`);
console.log(`postType未設定: ${results.noPostType.length}件`);
console.log(`エラー: ${results.errorFiles.length}件`);