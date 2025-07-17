# ✅ テスト・検証チェックリスト

## 🎯 目的

修正後のシステムが正常に動作し、目標を達成していることを確認する。

## 📋 実装前テスト

### 環境確認
- [ ] Node.js バージョン確認
- [ ] TypeScript コンパイル確認
- [ ] 依存関係の確認
- [ ] 環境変数の設定確認

### ベースライン測定
```bash
# 修正前の現状測定
1. 各ジャンルでのテンプレート選択率測定
2. section-items 使用率測定
3. AI生成成功率測定
4. 応答時間測定
```

#### 測定用入力データ
```typescript
const testCases = [
  {
    genre: 'strategy',
    input: '志望動機が見つからない！内定獲得へ導く企業研究×自己分析攻略法！\n□ 自己分析徹底！過去の経験から「自分軸」を発見\n□ 企業研究徹底！企業の魅力と自分の強みを繋げる',
    expectedTemplate: 'checklist-enhanced'
  },
  {
    genre: 'career',
    input: 'IT業界年収ランキング2024\n1位: 外資系IT企業 850万円\n2位: メガベンチャー 720万円\n3位: 大手SIer 650万円',
    expectedTemplate: 'ranking'
  },
  {
    genre: 'interview',
    input: '面接準備の完全チェックリスト\n□ 企業研究を徹底する\n□ 志望動機を明確化する\n□ 想定質問への回答準備',
    expectedTemplate: 'checklist-enhanced'
  },
  {
    genre: 'skill',
    input: 'プログラミング学習の5つのステップ\nステップ1: 基礎文法の習得\nステップ2: 実践的な課題解決\nステップ3: ポートフォリオ作成',
    expectedTemplate: 'simple5'
  },
  {
    genre: 'internship',
    input: '2024年夏季インターン締切一覧\n企業名 | 締切日 | 業界\nGoogle | 4月30日 | IT\nMcKinsey | 5月15日 | コンサル',
    expectedTemplate: 'table'
  }
]
```

## 📋 実装中テスト

### 段階的テスト

#### Phase 1: genre.ts 拡張テスト
```typescript
// 1. 型定義の確認
interface GenreConfig {
  optimalItemRange: { min: number; max: number }
  primaryTemplates: TemplateType[]
  secondaryTemplates: TemplateType[]
  avoidTemplates: TemplateType[]
  characteristicKeywords: string[]
  expressionIntent: string
}

// 2. 設定値の確認
const strategyConfig = getGenreConfig('strategy')
expect(strategyConfig.primaryTemplates).toContain('checklist-enhanced')
expect(strategyConfig.avoidTemplates).toContain('section-items')

// 3. 全ジャンルの設定確認
const allGenres = ['strategy', 'career', 'interview', 'skill', 'internship', 'general']
allGenres.forEach(genre => {
  const config = getGenreConfig(genre)
  expect(config.primaryTemplates).toBeDefined()
  expect(config.expressionIntent).toBeDefined()
})
```

#### Phase 2: pageStructureAnalyzer.ts 修正テスト
```typescript
// 1. プロンプト生成の確認
const analyzer = new PageStructureAnalyzer()
const prompt = analyzer.generatePrompt('strategy', testInput)
expect(prompt).toContain('最優先テンプレート: checklist-enhanced')
expect(prompt).toContain('避けるべきテンプレート: section-items')

// 2. テンプレート選択の確認
const result = await analyzer.analyzePageStructureAndTemplates(testInput)
expect(result[0].template).toBe('checklist-enhanced')
expect(result[0].template).not.toBe('section-items')
```

#### Phase 3: contentGeneratorService.ts 修正テスト
```typescript
// 1. データ変換の確認
const converted = convertToTemplateData(aiData, 'checklist-enhanced')
expect(converted.checklistItems).toBeDefined()
expect(converted.sections).toEqual([])
expect(converted.steps).toEqual([])

// 2. 分解された文字列の再構築テスト
const fragmentedString = { "0": "面", "1": "接", "2": "対", "3": "策" }
const reconstructed = reconstructString(fragmentedString)
expect(reconstructed).toBe('面接対策')
```

### TypeScript エラーチェック
```bash
# 各段階でのコンパイル確認
npx tsc --noEmit

# エラーがある場合は修正してから次の段階に進む
```

## 📋 実装後テスト

### 機能テスト

#### 1. テンプレート選択精度テスト
```typescript
const testTemplateSelection = async () => {
  const results = []
  
  for (const testCase of testCases) {
    const generated = await generateContent(testCase.input)
    const actualTemplate = generated.pages[0].templateType
    
    results.push({
      genre: testCase.genre,
      expected: testCase.expectedTemplate,
      actual: actualTemplate,
      match: actualTemplate === testCase.expectedTemplate
    })
  }
  
  const accuracy = results.filter(r => r.match).length / results.length
  console.log(`Template selection accuracy: ${accuracy * 100}%`)
  
  return accuracy > 0.8 // 80%以上の精度を期待
}
```

#### 2. section-items 使用率テスト
```typescript
const testSectionItemsUsage = async () => {
  const results = []
  
  for (const testCase of testCases) {
    const generated = await generateContent(testCase.input)
    const sectionItemsCount = generated.pages.filter(p => p.templateType === 'section-items').length
    const usageRate = sectionItemsCount / generated.pages.length
    
    results.push({
      genre: testCase.genre,
      sectionItemsUsage: usageRate
    })
  }
  
  const averageUsage = results.reduce((sum, r) => sum + r.sectionItemsUsage, 0) / results.length
  console.log(`Section-items usage rate: ${averageUsage * 100}%`)
  
  return averageUsage < 0.3 // 30%以下の使用率を期待
}
```

#### 3. テンプレート多様性テスト
```typescript
const testTemplateDiversity = async () => {
  const results = []
  
  for (const testCase of testCases) {
    const generated = await generateContent(testCase.input)
    const uniqueTemplates = new Set(generated.pages.map(p => p.templateType))
    
    results.push({
      genre: testCase.genre,
      uniqueTemplateCount: uniqueTemplates.size,
      totalPages: generated.pages.length
    })
  }
  
  const averageDiversity = results.reduce((sum, r) => sum + (r.uniqueTemplateCount / r.totalPages), 0) / results.length
  console.log(`Template diversity: ${averageDiversity * 100}%`)
  
  return averageDiversity > 0.5 // 50%以上の多様性を期待
}
```

### パフォーマンステスト

#### 1. 応答時間テスト
```typescript
const testResponseTime = async () => {
  const times = []
  
  for (const testCase of testCases) {
    const startTime = Date.now()
    await generateContent(testCase.input)
    const endTime = Date.now()
    
    times.push(endTime - startTime)
  }
  
  const averageTime = times.reduce((sum, time) => sum + time, 0) / times.length
  console.log(`Average response time: ${averageTime}ms`)
  
  return averageTime < 3000 // 3秒以内を期待
}
```

#### 2. エラー率テスト
```typescript
const testErrorRate = async () => {
  const results = []
  
  for (let i = 0; i < 50; i++) {
    try {
      const randomTestCase = testCases[Math.floor(Math.random() * testCases.length)]
      await generateContent(randomTestCase.input)
      results.push({ success: true })
    } catch (error) {
      results.push({ success: false, error: error.message })
    }
  }
  
  const successRate = results.filter(r => r.success).length / results.length
  console.log(`Success rate: ${successRate * 100}%`)
  
  return successRate > 0.95 // 95%以上の成功率を期待
}
```

### UI テスト

#### 1. テンプレート表示テスト
```typescript
const testTemplateRendering = async () => {
  const templateTypes = ['checklist-enhanced', 'simple5', 'ranking', 'table', 'section-items']
  
  for (const templateType of templateTypes) {
    const testData = generateTestData(templateType)
    
    try {
      const component = renderTemplate(templateType, testData)
      expect(component).toBeTruthy()
      console.log(`${templateType}: OK`)
    } catch (error) {
      console.error(`${templateType}: ERROR - ${error.message}`)
      return false
    }
  }
  
  return true
}
```

#### 2. 編集機能テスト
```typescript
const testEditingFunctionality = async () => {
  const templateTypes = ['checklist-enhanced', 'simple5', 'ranking', 'table']
  
  for (const templateType of templateTypes) {
    const testData = generateTestData(templateType)
    
    try {
      const editor = renderEditor(templateType, testData)
      
      // フィールド編集のテスト
      await editor.updateField('title', 'Updated Title')
      expect(editor.getData().title).toBe('Updated Title')
      
      console.log(`${templateType} editor: OK`)
    } catch (error) {
      console.error(`${templateType} editor: ERROR - ${error.message}`)
      return false
    }
  }
  
  return true
}
```

### 画像生成テスト

#### 1. 画像生成テスト
```typescript
const testImageGeneration = async () => {
  const testData = generateTestData('checklist-enhanced')
  
  try {
    const imageBlob = await generateImage(testData)
    expect(imageBlob.size).toBeGreaterThan(0)
    
    // 画像サイズの確認
    const image = new Image()
    image.src = URL.createObjectURL(imageBlob)
    await new Promise(resolve => image.onload = resolve)
    
    expect(image.width).toBe(850)
    expect(image.height).toBeGreaterThan(0)
    
    return true
  } catch (error) {
    console.error(`Image generation error: ${error.message}`)
    return false
  }
}
```

## 📊 成功基準

### 必須基準（全て達成必要）
- [ ] **テンプレート選択精度**: 80% 以上
- [ ] **section-items使用率**: 30% 以下
- [ ] **AI生成成功率**: 95% 以上
- [ ] **応答時間**: 3秒 以内
- [ ] **UI表示**: 全テンプレートで正常表示
- [ ] **編集機能**: 全テンプレートで正常動作
- [ ] **画像生成**: 正常に画像生成

### 推奨基準（達成推奨）
- [ ] **テンプレート多様性**: 50% 以上
- [ ] **エラー率**: 5% 以下
- [ ] **メモリ使用量**: 100MB 以下
- [ ] **ジャンル特化度**: 85% 以上

## 📋 テスト実行手順

### 1. 準備
```bash
# テスト環境の準備
npm install
npm run build
```

### 2. 基本テスト
```bash
# TypeScript コンパイル
npx tsc --noEmit

# 基本動作確認
npm run test:basic
```

### 3. 統合テスト
```bash
# 全体動作確認
npm run test:integration

# パフォーマンステスト
npm run test:performance
```

### 4. UI テスト
```bash
# UI 動作確認
npm run test:ui

# 画像生成テスト
npm run test:image
```

## 📝 テスト結果記録

### 結果記録フォーマット
```markdown
## テスト結果 - [日付]

### 基本テスト
- TypeScript コンパイル: ✅/❌
- 基本動作: ✅/❌

### 機能テスト
- テンプレート選択精度: XX%
- section-items使用率: XX%
- テンプレート多様性: XX%

### パフォーマンステスト
- 応答時間: XXXms
- エラー率: XX%

### UI テスト
- テンプレート表示: ✅/❌
- 編集機能: ✅/❌
- 画像生成: ✅/❌

### 問題点
- 問題1: 詳細説明と解決方法
- 問題2: 詳細説明と解決方法

### 次のアクション
- アクション1: 詳細説明
- アクション2: 詳細説明
```

---

**⚠️ 重要**: 全てのテストに合格してから本番環境に適用してください。