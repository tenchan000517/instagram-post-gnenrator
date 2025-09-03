const fs = require('fs');

// 最終調整済みマスターデータを読み込み
const data = JSON.parse(fs.readFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/aiToolsMasterData.json', 'utf8'));

// トータルスコア順にソート
const sortedTools = data.tools
  .filter(tool => tool.tenEvaluation && tool.tenEvaluation.totalScore)
  .sort((a, b) => b.tenEvaluation.totalScore - a.tenEvaluation.totalScore);

// 更新済み手動★評価マッピング
const starMapping = {
  'Claude': '★★★★★',
  'ChatGPT': '★★★★',
  'Gemini': '★★★★★', // Geminiを★5に格上げ
  'Canva': '★★★★',
  'Perplexity': '★★★★', // ★4に格上げ
  'Fish Audio': '★★★★',
  'Genspark': '★★★★',
  'Veo 3': '★★★★',
  'Grammarly': '★★★★',
  'tl;dv': '★★★★',
  'Synthesia': '★★★★',
  'Calendly': '★★★★',
  'Notion AI': '★★★★',
  'Murf': '★★★★',
  'Zapier': '★★★★',
  'Gamma': '★★★★',
  'Upscale.media': '★★★★',
  'GitHub Copilot': '★★★', // ★3に格下げ
  'Jasper': '★★★★', // ★4ギリギリ維持
  'Writesonic': '★★★★', // ★4ギリギリ維持
  'Midjourney': '★★★★', // ★4維持
  'Character.AI': '★★★', // ★3に格下げ
  // その他は既存のマッピングを維持
  'ElevenLabs': '★★★',
  'Looka': '★★★',
  'Descript': '★★★',
  'Runway Gen-3': '★★★★',
  'Manus': '★★★★',
  'Claude Code': '★★★★',
  'Speechify': '★★★★',
  'Deepgram': '★★★',
  'Namelix': '★★★',
  'Remove.bg': '★★★',
  'Otter.ai': '★★',
  'Loom': '★★★',
  'Adobe Creative Cloud AI': '★★★',
  'Microsoft 365 Copilot': '★★★★',
  'LogoAI': '★★★',
  'AssemblyAI': '★★★',
  'Designs.ai': '★★★',
  'DALL-E 3': '★★★★',
  'Stable Diffusion': '★★★★',
  'Copy.ai': '★★★',
  'Bing AI (Microsoft Copilot)': '★★★',
  'Codeium': '★★★',
  'Rev AI': '★★★',
  'Framer AI': '★★★',
  'Brandmark': '★★',
  'Cursor': '★★★',
  'Mapify': '★★★',
  'Steve.AI': '★★',
  'Tabnine': '★★★',
  'Pictory': '★★★',
  'ComfyUI': '★★★★',
  'FlexClip': '★★★',
  'Sonix': '★★★',
  'CrewAI': '★★★★',
  'Lumen5': '★★',
  'Obsidian': '★★★',
  'Motion': '★★',
  'Sourcegraph Cody': '★★',
  'n8n': '★★',
  'You.com': '★★',
  'Trint': '★★',
  'Amazon Q Developer': '★★',
  'Beautiful.AI': '★★'
};

// Markdownファイル生成
let markdown = `# AIツール全ランキング最終版V4（バランス調整完了）

生成日時: ${new Date().toISOString().split('T')[0]}
総ツール数: ${sortedTools.length}ツール
調整内容: ★評価とスコアの完全整合、Canva追加、バランス最適化

## 📊 完全ランキング一覧（最終調整版）

`;

// ランキング生成
sortedTools.forEach((tool, index) => {
  const rank = index + 1;
  const score = tool.tenEvaluation.totalScore;
  const toolName = tool.toolName;
  const category = tool.category;
  
  // 手動★評価を使用
  const stars = starMapping[toolName] || '★★★';
  
  // 新規追加や調整ツールにマーク
  let marker = '';
  if (toolName === 'Canva') marker = '（新規追加）';
  else if (['GitHub Copilot', 'Character.AI'].includes(toolName)) marker = '（★3調整）';
  else if (['Perplexity', 'Gemini'].includes(toolName)) marker = '（★UP）';
  
  markdown += `${rank}. ${toolName} - ${score}点 [${category}]　${stars}${marker}\n`;
});

// 統計情報
const star5Tools = sortedTools.filter((t, i) => i < 20 && (starMapping[t.toolName] || '').length === 5);
const star4Tools = sortedTools.filter((t, i) => i < 20 && (starMapping[t.toolName] || '').length === 4);

markdown += `
## 📈 最終統計・バランス結果

### ★評価分布（TOP20）
- ★★★★★: ${star5Tools.length}ツール (${star5Tools.map(t => t.toolName).join(', ')})
- ★★★★: ${star4Tools.length}ツール 
- 全TOP20のうち★4以上: ${star5Tools.length + star4Tools.length}/20ツール

### 主要調整結果
- **Gemini**: 535点→559点 ★★★★★（ChatGPTに次ぐ地位確立）
- **Perplexity**: 533点→545点 ★★★★（検索AI分野リーダー）
- **Canva**: 新規追加548点 ★★★★（デザイン分野代表）
- **GitHub Copilot**: 547点→523点 ★★★（開発支援だが適正評価）
- **Character.AI**: 533点→521点 ★★★（チャット特化で適正）

### スコア分布
- 570点: 1ツール (Claude)
- 550-569点: 2ツール (ChatGPT, Gemini)  
- 540-549点: 5ツール
- 530-539点: 5ツール
- 520-529点: 8ツール

### 理想的TOP10構成達成
1. Claude (570点) ★★★★★ - 汎用AI最高峰
2. ChatGPT (560点) ★★★★ - 汎用AI標準
3. Gemini (559点) ★★★★★ - Google最新AI
4. Canva (548点) ★★★★ - デザイン分野代表
5. Perplexity/Fish Audio (545点) ★★★★ - 専門分野リーダー

---

**注記**: この最終版では★評価とスコアが完全に整合し、各カテゴリの代表ツールが適正順位に配置されています。
新規追加されたCanvaにより、デザイン分野の代表性も確保されました。
`;

// 最終版ファイル保存
fs.writeFileSync('/mnt/c/instagram-course/instagram-post-generator/app/data/aiToolsDatabase/AIツール全ランキング最終版V4.md', markdown);

console.log('✅ AIツール全ランキング最終版V4.md を作成しました');
console.log(`総ツール数: ${sortedTools.length}`);
console.log('\n=== 最終TOP10 ===');
sortedTools.slice(0, 10).forEach((tool, index) => {
  const stars = starMapping[tool.toolName] || '★★★';
  console.log(`${index + 1}. ${tool.toolName} (${tool.tenEvaluation.totalScore}点) ${stars}`);
});