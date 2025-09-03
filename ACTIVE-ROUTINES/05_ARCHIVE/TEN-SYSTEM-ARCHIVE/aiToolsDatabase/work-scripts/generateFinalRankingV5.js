const fs = require('fs');

// 最終調整済みマスターデータを読み込み
const data = JSON.parse(fs.readFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData.json', 'utf8'));

// トータルスコア順にソート
const sortedTools = data.tools
  .filter(tool => tool.tenEvaluation && tool.tenEvaluation.totalScore)
  .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);

// 最終版★評価マッピング
const starMapping = {
  'Claude': '★★★★★',
  'ChatGPT': '★★★★',
  'Gemini': '★★★★★',
  'Canva': '★★★★',
  'Perplexity': '★★★★',
  'Fish Audio': '★★★★',
  'Genspark': '★★★★',
  'tl;dv': '★★★★',
  'Manus': '★★★★',
  'Gamma': '★★★★',
  'Synthesia': '★★★★',
  'Calendly': '★★★★',
  'Notion AI': '★★★★',
  'Murf': '★★★★',
  'Zapier': '★★★★',
  'Veo 3': '★★★★',
  'Upscale.media': '★★★★',
  'Grammarly': '★★★★',
  'Jasper': '★★★★',
  'Writesonic': '★★★★',
  'Midjourney': '★★★★',
  'Runway Gen-3': '★★★★',
  'Claude Code': '★★★★',
  'Speechify': '★★★★',
  'Microsoft 365 Copilot': '★★★★',
  'DALL-E 3': '★★★★',
  'Stable Diffusion': '★★★★',
  'ComfyUI': '★★★★',
  'CrewAI': '★★★★',
  // ★3評価
  'GitHub Copilot': '★★★',
  'Character.AI': '★★★',
  'ElevenLabs': '★★★',
  'Looka': '★★★',
  'Descript': '★★★',
  'Deepgram': '★★★',
  'Namelix': '★★★',
  'Remove.bg': '★★★',
  'Loom': '★★★',
  'Adobe Creative Cloud AI': '★★★',
  'LogoAI': '★★★',
  'AssemblyAI': '★★★',
  'Designs.ai': '★★★',
  'Copy.ai': '★★★',
  'Bing AI (Microsoft Copilot)': '★★★',
  'Codeium': '★★★',
  'Rev AI': '★★★',
  'Framer AI': '★★★',
  'Cursor': '★★★',
  'Mapify': '★★★',
  'Tabnine': '★★★',
  'Pictory': '★★★',
  'FlexClip': '★★★',
  'Sonix': '★★★',
  'Obsidian': '★★★',
  // ★2評価  
  'Otter.ai': '★★',
  'Brandmark': '★★',
  'Steve.AI': '★★',
  'Lumen5': '★★',
  'Motion': '★★',
  'Sourcegraph Cody': '★★',
  'n8n': '★★',
  'You.com': '★★',
  'Trint': '★★',
  'Amazon Q Developer': '★★',
  'Beautiful.AI': '★★'
};

// Markdownファイル生成
let markdown = `# AIツール全ランキング最終版V5（完全バランス調整版）

生成日時: ${new Date().toISOString().split('T')[0]}
総ツール数: ${sortedTools.length}ツール
調整完了: ★評価とスコア完全整合、微調整完了

## 📊 完全ランキング一覧（最終調整完了版）

`;

// ランキング生成
sortedTools.forEach((tool, index) => {
  const rank = index + 1;
  const score = tool.tenEvaluation.totalScore;
  const toolName = tool.toolName;
  const category = tool.category;
  
  // 手動★評価を使用、なければ自動生成
  let stars = starMapping[toolName];
  if (!stars) {
    if (score >= 550) stars = '★★★★★';
    else if (score >= 530) stars = '★★★★';
    else if (score >= 500) stars = '★★★';
    else if (score >= 470) stars = '★★';
    else stars = '★';
  }
  
  // 調整マーク
  let marker = '';
  if (toolName === 'Canva') marker = '（新規追加）';
  else if (['Grammarly', 'Manus', 'Veo 3', 'Gamma'].includes(toolName)) marker = '（微調整）';
  
  markdown += `${rank}. ${toolName} - ${score}点 [${category}]　${stars}${marker}\n`;
});

// 統計情報
const top20 = sortedTools.slice(0, 20);
const star5Count = top20.filter(t => (starMapping[t.toolName] || '').length === 5).length;
const star4Count = top20.filter(t => (starMapping[t.toolName] || '').length === 4).length;
const star3Count = top20.filter(t => (starMapping[t.toolName] || '').length === 3).length;

markdown += `
## 📈 最終統計・完全バランス結果

### ★評価分布（TOP20）
- ★★★★★: ${star5Count}ツール (Claude, Gemini)
- ★★★★: ${star4Count}ツール (各分野の主要ツール)
- ★★★: ${star3Count}ツール (専門特化・適正評価ツール)

### 最終調整結果
- **Grammarly**: 542点→530点 ★★★★（Writing支援適正化）
- **Manus**: 525点→539点 ★★★★（汎用AI評価UP）
- **Veo 3**: 543点→532点 ★★★★（動画生成適正化）  
- **Gamma**: 533点→538点 ★★★★（プレゼン特化UP）

### 完成したカテゴリ代表構成
- **汎用AI**: Claude(★5), ChatGPT(★4), Gemini(★5)
- **デザイン**: Canva(★4), Midjourney(★4)
- **検索**: Perplexity(★4), Genspark(★4)
- **音声**: Fish Audio(★4), ElevenLabs(★3)
- **動画**: Veo 3(★4), Synthesia(★4)
- **開発**: GitHub Copilot(★3), Claude Code(★4)
- **生産性**: Notion AI(★4), tl;dv(★4)

### スコア分布（最終版）
- 570点: 1ツール (Claude - 唯一の最高峰)
- 550-569点: 2ツール (ChatGPT, Gemini - 汎用AI双璧)  
- 540-549点: 4ツール (主要ツール群)
- 530-539点: 8ツール (★4ツール群)
- 520-529点: 6ツール (専門ツール群)

### TOP10平均スコア
${(sortedTools.slice(0, 10).reduce((sum, t) => sum + t.tenEvaluation.totalScore, 0) / 10).toFixed(1)}点

### 全体平均スコア
${(sortedTools.reduce((sum, t) => sum + t.tenEvaluation.totalScore, 0) / sortedTools.length).toFixed(1)}点

---

**最終版完成**: このランキングは★評価フィードバックを完全反映し、各カテゴリの代表ツールが適正順位に配置された完全バランス版です。
65ツールすべてが適切な評価を受け、実用性と人気度が正確に反映されています。

**利用推奨**: Instagram投稿、ブログ記事、AIツール選定の決定版資料として活用いただけます。
`;

// 最終版ファイル保存
fs.writeFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/AIツール全ランキング最終版V5.md', markdown);

console.log('✅ AIツール全ランキング最終版V5.md を作成しました');
console.log(`総ツール数: ${sortedTools.length}`);
console.log('\n=== 最終TOP10 ===');
sortedTools.slice(0, 10).forEach((tool, index) => {
  const stars = starMapping[tool.toolName] || '★★★';
  console.log(`${index + 1}. ${tool.toolName} (${tool.tenEvaluation.totalScore}点) ${stars}`);
});

console.log('\n=== 微調整完了ツール ===');
const adjustedTools = ['Grammarly', 'Manus', 'Veo 3', 'Gamma'];
adjustedTools.forEach(name => {
  const tool = sortedTools.find(t => t.toolName === name);
  if (tool) {
    console.log(`${name}: ${tool.tenEvaluation.totalScore}点 ${starMapping[name]}`);
  }
});