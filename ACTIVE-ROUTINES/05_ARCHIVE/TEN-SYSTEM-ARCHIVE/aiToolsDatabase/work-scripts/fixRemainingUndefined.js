const fs = require('fs');

// 現在のデータを読み込み
const data = JSON.parse(fs.readFileSync('aiToolsMasterData.json', 'utf8'));

// 残りのundefined修正マッピング
const undefinedFixes = [
  {
    id: '18',
    newData: {
      toolName: 'Stable Diffusion',
      companyName: 'Stability AI',
      officialUrl: 'https://stability.ai',
      category: 'AI Image Generation'
    }
  },
  {
    id: '20', 
    newData: {
      toolName: 'Adobe Creative Cloud AI',
      companyName: 'Adobe',
      officialUrl: 'https://www.adobe.com/creativecloud',
      category: 'Integrated AI Creative Suite'
    }
  },
  {
    id: '22',
    newData: {
      toolName: 'Microsoft 365 Copilot',
      companyName: 'Microsoft',
      officialUrl: 'https://www.microsoft.com/microsoft-365/copilot',
      category: 'Integrated Productivity AI'
    }
  },
  {
    id: '17',
    newData: {
      toolName: 'DALL-E 3',
      companyName: 'OpenAI',
      officialUrl: 'https://openai.com/dall-e-3',
      category: 'AI Image Generation'
    }
  },
  {
    id: '19',
    newData: {
      toolName: 'ComfyUI',
      companyName: 'Community',
      officialUrl: 'https://github.com/comfyanonymous/ComfyUI',
      category: 'Open Source AI Image Generation'
    }
  }
];

console.log('Fixing remaining undefined tools...');

// undefined修正を適用
data.tools = data.tools.map(tool => {
  const fix = undefinedFixes.find(f => f.id === tool.id);
  
  if (fix) {
    console.log(`Fixed: ${tool.id} -> ${fix.newData.toolName}`);
    return {
      ...tool,
      toolName: fix.newData.toolName,
      companyName: fix.newData.companyName,
      officialUrl: fix.newData.officialUrl,
      category: fix.newData.category
    };
  }
  
  return tool;
});

// バックアップを作成
fs.writeFileSync('aiToolsMasterData_before_undefined_fix.json', JSON.stringify(data, null, 2));

// 修正されたデータを保存
fs.writeFileSync('aiToolsMasterData.json', JSON.stringify(data, null, 2));

console.log('✅ All undefined tools fixed!');
console.log('Fixed tools:');
undefinedFixes.forEach(fix => {
  console.log(`- ${fix.id}: ${fix.newData.toolName}`);
});