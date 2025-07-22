# ナレッジベース統合システム 技術統合ガイド

## 🔧 開発者向け統合ガイド

このドキュメントは、ナレッジベース統合システムを既存システムに統合する開発者向けの技術ガイドです。

---

## 📋 前提条件

### 必要なファイル構成
```
app/services/knowledgeBase/
├── PageStructureMatcher.ts              ✅ 作成済み
├── TemplateItemMapper.ts                ✅ 作成済み  
├── data/
│   ├── pageStructureMatching.json       ✅ 267パターン
│   ├── pageStructures/                  ✅ 5構成パターン
│   └── masterData/                      ✅ 全マスターデータ
```

### TypeScript型定義
```typescript
// app/types/knowledgeBase.ts に追加済み
export interface KnowledgeBaseParams {
  typeId: string;
  targetId?: string;
  themeId?: string;
  useKnowledgeBase: boolean;
  useStructuredGeneration?: boolean;  // 新システム有効化フラグ
}
```

---

## 🚀 基本統合パターン

### 1. フロントエンド統合

#### React Component例
```typescript
import { useState } from 'react';
import { generateInstagramPost } from '../services/instagramGenerator';

interface KnowledgeFormProps {
  onGenerate: (result: any) => void;
}

export const KnowledgeBasedGenerator: React.FC<KnowledgeFormProps> = ({ onGenerate }) => {
  const [formData, setFormData] = useState({
    content: '',
    typeId: '001',
    targetId: 'P001', 
    themeId: 'T006',
    useStructuredGeneration: true
  });

  const handleGenerate = async () => {
    try {
      const result = await generateInstagramPost(formData.content, {
        useKnowledgeBase: true,
        useStructuredGeneration: formData.useStructuredGeneration,
        typeId: formData.typeId,
        targetId: formData.targetId,
        themeId: formData.themeId
      });
      
      onGenerate(result);
    } catch (error) {
      console.error('生成エラー:', error);
      // エラーハンドリング
    }
  };

  return (
    <div className="knowledge-generator">
      <div className="form-section">
        <label>コンテンツ入力</label>
        <textarea 
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          placeholder="分析したいコンテンツを入力..."
        />
      </div>

      <div className="selection-section">
        <select 
          value={formData.typeId}
          onChange={(e) => setFormData({...formData, typeId: e.target.value})}
        >
          <option value="001">001 - 共感型</option>
          <option value="002">002 - 教育型</option>
          <option value="003">003 - 情報型</option>
          <option value="004">004 - 効率型</option>
        </select>

        <select 
          value={formData.targetId}
          onChange={(e) => setFormData({...formData, targetId: e.target.value})}
        >
          <option value="P001">P001 - 戦略的就活生</option>
          <option value="P002">P002 - 不安解消型就活生</option>
          <option value="P003">P003 - 実践志向就活生</option>
          {/* ... 他のペルソナ */}
        </select>

        <select 
          value={formData.themeId}
          onChange={(e) => setFormData({...formData, themeId: e.target.value})}
        >
          <option value="T001">T001 - 感情支援</option>
          <option value="T002">T002 - 体系教育</option>
          <option value="T006">T006 - 問題解決</option>
          {/* ... 他のテーマ */}
        </select>
      </div>

      <button onClick={handleGenerate}>
        ナレッジベース生成
      </button>
    </div>
  );
};
```

### 2. API エンドポイント統合

#### Express.js API例
```typescript
import express from 'express';
import { PageStructureAnalyzer } from '../services/pageStructureAnalyzer';

const router = express.Router();

router.post('/api/generate-knowledge-based', async (req, res) => {
  try {
    const { content, typeId, targetId, themeId } = req.body;
    
    // バリデーション
    if (!typeId || !targetId || !themeId) {
      return res.status(400).json({
        error: 'typeId, targetId, themeId are required for knowledge-based generation'
      });
    }

    const analyzer = new PageStructureAnalyzer();
    const result = await analyzer.analyzePageStructureAndTemplates(content, {
      useKnowledgeBase: true,
      useStructuredGeneration: true,
      typeId,
      targetId,
      themeId
    });

    res.json({
      success: true,
      pages: result,
      metadata: {
        matchingKey: `${typeId}-${targetId}-${themeId}`,
        generationTime: new Date().toISOString(),
        systemVersion: 'v1.0.0'
      }
    });

  } catch (error) {
    console.error('Knowledge-based generation error:', error);
    
    res.status(500).json({
      error: 'Generation failed',
      details: error.message,
      fallbackAvailable: false // フォールバック無し
    });
  }
});

export default router;
```

---

## 🔄 エラーハンドリングパターン

### 1. 段階的エラーハンドリング
```typescript
async function generateWithErrorHandling(content: string, params: KnowledgeBaseParams) {
  try {
    // Step 1: パラメータ検証
    validateKnowledgeParams(params);
    
    // Step 2: マッチング検証
    await validatePatternExists(params.typeId!, params.targetId!, params.themeId!);
    
    // Step 3: 生成実行
    const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(content, params);
    
    return {
      success: true,
      data: result,
      metadata: {
        processingTime: Date.now(),
        matchingKey: `${params.typeId}-${params.targetId}-${params.themeId}`
      }
    };
    
  } catch (error) {
    return handleKnowledgeError(error, params);
  }
}

function validateKnowledgeParams(params: KnowledgeBaseParams) {
  if (!params.useStructuredGeneration) {
    throw new Error('useStructuredGeneration must be true for knowledge-based generation');
  }
  
  if (!params.typeId || !params.targetId || !params.themeId) {
    throw new Error('typeId, targetId, and themeId are required');
  }
  
  // 有効値チェック
  const validTypes = ['001', '002', '003', '004'];
  const validTargets = ['P001', 'P002', 'P003', 'P004', 'P005', 'P006', 'P007', 'P008'];
  
  if (!validTypes.includes(params.typeId)) {
    throw new Error(`Invalid typeId: ${params.typeId}`);
  }
  
  if (!validTargets.includes(params.targetId)) {
    throw new Error(`Invalid targetId: ${params.targetId}`);
  }
}

async function validatePatternExists(typeId: string, targetId: string, themeId: string) {
  try {
    await PageStructureMatcher.findExactMatch(typeId, targetId, themeId);
  } catch (error) {
    if (error instanceof PageStructureMatchingError) {
      throw new Error(`Pattern not found: ${error.matchingKey}. Available patterns: ${error.availablePatterns?.slice(0, 3).join(', ')}...`);
    }
    throw error;
  }
}

function handleKnowledgeError(error: any, params: KnowledgeBaseParams) {
  console.error('Knowledge generation error:', error);
  
  return {
    success: false,
    error: error.message,
    errorType: error.constructor.name,
    context: {
      attemptedPattern: `${params.typeId}-${params.targetId}-${params.themeId}`,
      systemAvailable: true,
      fallbackRecommendation: 'Try different combination or use traditional generation'
    }
  };
}
```

### 2. ユーザーフレンドリーエラー表示
```typescript
const ErrorMessages = {
  PATTERN_NOT_FOUND: (key: string) => 
    `組み合わせ「${key}」は現在サポートされていません。別の組み合わせをお試しください。`,
  
  MISSING_PARAMS: () => 
    '投稿タイプ、ペルソナ、テーマの選択が必要です。',
  
  GENERATION_FAILED: () => 
    'コンテンツ生成に失敗しました。入力内容を確認してください。',
  
  SYSTEM_ERROR: () => 
    'システムエラーが発生しました。しばらく待ってから再試行してください。'
};

function getErrorMessage(error: any, params: KnowledgeBaseParams): string {
  if (error instanceof PageStructureMatchingError) {
    return ErrorMessages.PATTERN_NOT_FOUND(error.matchingKey);
  }
  
  if (error.message.includes('required')) {
    return ErrorMessages.MISSING_PARAMS();
  }
  
  if (error.message.includes('Generation failed')) {
    return ErrorMessages.GENERATION_FAILED();
  }
  
  return ErrorMessages.SYSTEM_ERROR();
}
```

---

## 📊 モニタリング・ログ統合

### 1. ログ設定
```typescript
import winston from 'winston';

const knowledgeLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'knowledge-base-system' },
  transports: [
    new winston.transports.File({ filename: 'logs/knowledge-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/knowledge-combined.log' })
  ]
});

// 本番環境以外ではコンソール出力も追加
if (process.env.NODE_ENV !== 'production') {
  knowledgeLogger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export { knowledgeLogger };
```

### 2. メトリクス収集
```typescript
interface KnowledgeMetrics {
  generationAttempts: number;
  successfulGenerations: number;
  failedGenerations: number;
  averageProcessingTime: number;
  popularCombinations: Record<string, number>;
  errorTypes: Record<string, number>;
}

class KnowledgeMetricsCollector {
  private metrics: KnowledgeMetrics = {
    generationAttempts: 0,
    successfulGenerations: 0,
    failedGenerations: 0,
    averageProcessingTime: 0,
    popularCombinations: {},
    errorTypes: {}
  };

  recordAttempt(matchingKey: string) {
    this.metrics.generationAttempts++;
    this.metrics.popularCombinations[matchingKey] = 
      (this.metrics.popularCombinations[matchingKey] || 0) + 1;
    
    knowledgeLogger.info('Generation attempt', { matchingKey });
  }

  recordSuccess(matchingKey: string, processingTime: number) {
    this.metrics.successfulGenerations++;
    this.updateAverageProcessingTime(processingTime);
    
    knowledgeLogger.info('Generation success', { 
      matchingKey, 
      processingTime,
      successRate: this.getSuccessRate()
    });
  }

  recordError(matchingKey: string, errorType: string, error: string) {
    this.metrics.failedGenerations++;
    this.metrics.errorTypes[errorType] = 
      (this.metrics.errorTypes[errorType] || 0) + 1;
    
    knowledgeLogger.error('Generation error', {
      matchingKey,
      errorType,
      error,
      successRate: this.getSuccessRate()
    });
  }

  private updateAverageProcessingTime(newTime: number) {
    const total = this.metrics.averageProcessingTime * (this.metrics.successfulGenerations - 1) + newTime;
    this.metrics.averageProcessingTime = total / this.metrics.successfulGenerations;
  }

  private getSuccessRate(): number {
    return this.metrics.successfulGenerations / this.metrics.generationAttempts;
  }

  getMetrics(): KnowledgeMetrics {
    return { ...this.metrics };
  }
}

export const metricsCollector = new KnowledgeMetricsCollector();
```

---

## 🧪 テスト統合

### 1. 単体テスト例
```typescript
import { PageStructureMatcher } from '../PageStructureMatcher';
import { TemplateItemMapper } from '../TemplateItemMapper';

describe('Knowledge Base Integration', () => {
  describe('PageStructureMatcher', () => {
    test('should find exact match for valid combination', async () => {
      const pattern = await PageStructureMatcher.findExactMatch('001', 'P001', 'T006');
      
      expect(pattern).toBeDefined();
      expect(pattern.matchingKey).toBe('001-P001-T006');
      expect(pattern.pageStructureId).toBeTruthy();
    });

    test('should throw error for invalid combination', async () => {
      await expect(async () => {
        await PageStructureMatcher.findExactMatch('999', 'P999', 'T999');
      }).rejects.toThrow(PageStructureMatchingError);
    });
  });

  describe('TemplateItemMapper', () => {
    test('should map content to page structure', async () => {
      const mapper = new TemplateItemMapper();
      const mockStructure = {
        pageStructureId: 'test-structure',
        name: 'Test Structure',
        targetCombination: '001-P001-T006',
        description: 'Test',
        pages: [{
          pageNumber: 1,
          templateId: 'section-items',
          role: 'test',
          title: 'Test Page',
          itemAssignments: {
            title: 'Test',
            sections: [{
              sectionTitle: 'Test Section',
              itemType: 'test-item',
              extractionRule: 'Extract test items',
              itemCount: 3
            }]
          }
        }]
      };

      const result = await mapper.mapContentToPages('Test content', mockStructure);
      
      expect(result.pages).toHaveLength(1);
      expect(result.totalExtractions).toBeGreaterThan(0);
    });
  });
});
```

### 2. 統合テスト例
```typescript
import { PageStructureAnalyzer } from '../pageStructureAnalyzer';

describe('Knowledge Base System Integration', () => {
  let analyzer: PageStructureAnalyzer;

  beforeEach(() => {
    analyzer = new PageStructureAnalyzer();
  });

  test('should generate structured content successfully', async () => {
    const input = `
      就活で自己分析に悩む学生が多い。
      効果的な自己分析の方法を教えてほしい。
      具体的なステップを知りたい。
    `;

    const result = await analyzer.analyzePageStructureAndTemplates(input, {
      useKnowledgeBase: true,
      useStructuredGeneration: true,
      typeId: '001',
      targetId: 'P001',
      themeId: 'T006'
    });

    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].template).toBeTruthy();
    expect(result[0].title).toBeTruthy();
    expect(result[0].theme).toBeTruthy();
  });

  test('should fall back to traditional generation when structured disabled', async () => {
    const input = 'Test content';

    const result = await analyzer.analyzePageStructureAndTemplates(input, {
      useKnowledgeBase: true,
      useStructuredGeneration: false, // 無効化
      typeId: '001',
      targetId: 'P001',
      themeId: 'T006'
    });

    // 従来のシステムが動作することを確認
    expect(result).toBeDefined();
  });
});
```

---

## 🔄 継続的統合 (CI/CD)

### 1. ビルド検証
```yaml
# .github/workflows/knowledge-base-test.yml
name: Knowledge Base System Test

on: [push, pull_request]

jobs:
  test-knowledge-base:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Verify knowledge base data files
      run: |
        test -f app/services/knowledgeBase/data/pageStructureMatching.json
        test -f app/services/knowledgeBase/data/masterData/personas.json
        test -f app/services/knowledgeBase/data/masterData/themes.json
        
    - name: Validate JSON structure
      run: |
        node -e "
          const matching = require('./app/services/knowledgeBase/data/pageStructureMatching.json');
          console.log('Patterns count:', matching.patterns.length);
          console.log('Sample pattern:', matching.patterns[0]);
        "
        
    - name: Run knowledge base tests
      run: npm test -- --testPathPattern=knowledgeBase
      
    - name: Test integration
      run: npm run test:integration
```

### 2. データ整合性チェック
```typescript
// scripts/validate-knowledge-data.ts
import { PageStructureMatcher } from '../app/services/knowledgeBase/PageStructureMatcher';
import { readFileSync } from 'fs';
import { join } from 'path';

async function validateKnowledgeData() {
  console.log('🔍 Validating knowledge base data...');
  
  try {
    // 1. マッチングパターン検証
    const patterns = await PageStructureMatcher.getAvailablePatterns();
    console.log(`✅ Found ${patterns.length} matching patterns`);
    
    // 2. ページ構造ファイル存在確認
    const uniqueStructureIds = [...new Set(patterns.map(p => p.pageStructureId))];
    console.log(`📄 Checking ${uniqueStructureIds.length} page structure files...`);
    
    for (const structureId of uniqueStructureIds) {
      try {
        await PageStructureMatcher.loadPageStructure(structureId);
        console.log(`  ✅ ${structureId}.json - OK`);
      } catch (error) {
        console.error(`  ❌ ${structureId}.json - MISSING`);
        process.exit(1);
      }
    }
    
    // 3. マスターデータ検証
    const dataPath = join(process.cwd(), 'app/services/knowledgeBase/data/masterData');
    const requiredFiles = ['personas.json', 'themes.json', 'templates.json'];
    
    for (const file of requiredFiles) {
      try {
        const filePath = join(dataPath, file);
        const data = JSON.parse(readFileSync(filePath, 'utf-8'));
        console.log(`✅ ${file} - ${Object.keys(data).length} entries`);
      } catch (error) {
        console.error(`❌ ${file} - ERROR:`, error.message);
        process.exit(1);
      }
    }
    
    console.log('🎉 All knowledge base data validation passed!');
    
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

validateKnowledgeData();
```

---

## 📈 パフォーマンス最適化

### 1. キャッシュ戦略
```typescript
class KnowledgeCache {
  private static patternCache = new Map<string, any>();
  private static structureCache = new Map<string, any>();
  
  static getCachedPattern(matchingKey: string) {
    return this.patternCache.get(matchingKey);
  }
  
  static setCachedPattern(matchingKey: string, pattern: any) {
    this.patternCache.set(matchingKey, pattern);
  }
  
  static getCachedStructure(structureId: string) {
    return this.structureCache.get(structureId);
  }
  
  static setCachedStructure(structureId: string, structure: any) {
    this.structureCache.set(structureId, structure);
  }
  
  static clearCache() {
    this.patternCache.clear();
    this.structureCache.clear();
  }
}
```

### 2. 並列処理最適化
```typescript
async function optimizedGeneration(
  inputs: Array<{content: string, params: KnowledgeBaseParams}>
): Promise<any[]> {
  const batchSize = 3; // 同時実行数制限
  const results = [];
  
  for (let i = 0; i < inputs.length; i += batchSize) {
    const batch = inputs.slice(i, i + batchSize);
    const batchPromises = batch.map(input => 
      generateStructuredContent(input.content, input.params)
    );
    
    const batchResults = await Promise.allSettled(batchPromises);
    results.push(...batchResults);
  }
  
  return results;
}
```

---

## 🚀 本番環境デプロイ

### 1. 環境変数設定
```bash
# .env.production
KNOWLEDGE_BASE_ENABLED=true
KNOWLEDGE_BASE_VERSION=v1.0.0
KNOWLEDGE_DATA_PATH=/app/services/knowledgeBase/data
GEMINI_API_KEY=your_api_key_here
LOG_LEVEL=info
```

### 2. Docker設定
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# ナレッジベースデータをコピー
COPY app/services/knowledgeBase/data /app/services/knowledgeBase/data

# 権限設定
RUN chmod -R 644 /app/services/knowledgeBase/data

# アプリケーション起動
CMD ["npm", "start"]
```

統合システムの準備が完了しました！

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"id": "1", "content": "Create system specification document", "status": "completed", "priority": "high"}, {"id": "2", "content": "Create user manual document", "status": "completed", "priority": "high"}, {"id": "3", "content": "Create technical integration guide", "status": "completed", "priority": "medium"}]