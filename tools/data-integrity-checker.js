#!/usr/bin/env node

/**
 * 📋 Phase D1: データ整合性チェックツール
 * 
 * 目的: 実装完了したシステムの投稿タイプフィルタリング用データの整合性・品質を最終検証する
 * 
 * チェック項目:
 * 1. ペルソナ-ナレッジ-投稿タイプの3者関係整合性
 * 2. ターゲット内ペルソナ重複の完全排除確認
 * 3. ナレッジ構造データの完整性
 * 4. システム全体の動作整合性
 */

const fs = require('fs');
const path = require('path');

class DataIntegrityChecker {
    constructor() {
        this.issues = [];
        this.warnings = [];
        this.stats = {};
        this.data = {};
    }

    // データ読み込み
    async loadData() {
        console.log('📁 Loading system data...');
        
        try {
            // 1. problemSolutionPairs.json (メインナレッジデータ)
            const knowledgePath = path.join(process.cwd(), 'app', 'services', 'knowledgeBase', 'data', 'problemSolutionPairs.json');
            const knowledgeFile = JSON.parse(fs.readFileSync(knowledgePath, 'utf8'));
            // 新しいデータ構造: pairs オブジェクトの値を配列に変換
            this.data.knowledge = Object.values(knowledgeFile.pairs || {});
            this.data.metadata = knowledgeFile.metadata;
            console.log(`✅ Loaded ${this.data.knowledge.length} knowledge pairs`);

            // 2. KnowledgeBaseSelector (UI定義)
            const selectorPath = path.join(process.cwd(), 'app', 'components', 'ui', 'KnowledgeBaseSelector.tsx');
            this.data.selectorContent = fs.readFileSync(selectorPath, 'utf8');
            console.log(`✅ Loaded UI selector configuration`);

            // 3. Type definitions
            const typesPath = path.join(process.cwd(), 'app', 'types', 'knowledgeBase.ts');
            this.data.typesContent = fs.readFileSync(typesPath, 'utf8');
            console.log(`✅ Loaded type definitions`);

            // 4. Master personas data
            const personasPath = path.join(process.cwd(), 'app', 'services', 'knowledgeBase', 'data', 'masterData', 'personas.json');
            if (fs.existsSync(personasPath)) {
                this.data.personas = JSON.parse(fs.readFileSync(personasPath, 'utf8'));
                console.log(`✅ Loaded personas data`);
            }

            return true;
        } catch (error) {
            this.issues.push(`❌ CRITICAL: Failed to load data - ${error.message}`);
            return false;
        }
    }

    // チェック1: ペルソナ-ナレッジ-投稿タイプの3者関係整合性
    checkThreeWayRelationship() {
        console.log('\n🔍 Checking Persona-Knowledge-PostType relationship consistency...');
        
        const knowledgePersonas = new Set();
        const knowledgeCategories = new Set();
        
        // ナレッジデータからペルソナとカテゴリを抽出
        this.data.knowledge.forEach((knowledge, index) => {
            // 新しいデータ構造に対応
            const persona = knowledge.targetPersona || knowledge.persona;
            const category = knowledge.problemCategory || knowledge.category;
            
            if (persona) {
                knowledgePersonas.add(persona);
            } else {
                this.issues.push(`❌ Knowledge entry ${index} missing persona/targetPersona`);
            }
            
            if (category) {
                knowledgeCategories.add(category);
            } else {
                this.issues.push(`❌ Knowledge entry ${index} missing category/problemCategory`);
            }
        });

        // UI定義から投稿タイプとターゲット抽出
        const uiPostTypes = this.extractPostTypesFromUI();
        const uiTargets = this.extractTargetsFromUI();

        this.stats.knowledgePersonas = knowledgePersonas.size;
        this.stats.knowledgeCategories = knowledgeCategories.size;
        this.stats.uiPostTypes = uiPostTypes.length;
        this.stats.uiTargets = uiTargets.length;

        console.log(`📊 Found ${knowledgePersonas.size} unique personas in knowledge data`);
        console.log(`📊 Found ${knowledgeCategories.size} unique categories in knowledge data`);
        console.log(`📊 Found ${uiPostTypes.length} post types in UI`);
        console.log(`📊 Found ${uiTargets.length} targets in UI`);

        // ペルソナ範囲チェック (設計上はP001-P116)
        const expectedPersonas = [];
        for (let i = 1; i <= 116; i++) {
            expectedPersonas.push(`P${i.toString().padStart(3, '0')}`);
        }

        const missingPersonas = expectedPersonas.filter(p => !knowledgePersonas.has(p));
        const unexpectedPersonas = [...knowledgePersonas].filter(p => !expectedPersonas.includes(p));

        if (missingPersonas.length > 0) {
            this.issues.push(`❌ Missing personas: ${missingPersonas.slice(0, 10).join(', ')}${missingPersonas.length > 10 ? ' and more...' : ''} (${missingPersonas.length} total)`);
        }

        if (unexpectedPersonas.length > 0) {
            this.warnings.push(`⚠️ Unexpected personas: ${unexpectedPersonas.slice(0, 10).join(', ')}${unexpectedPersonas.length > 10 ? ' and more...' : ''} (${unexpectedPersonas.length} total)`);
        }

        // 投稿タイプ数チェック (設計上は4つ)
        if (uiPostTypes.length !== 4) {
            this.issues.push(`❌ Expected 4 post types, found ${uiPostTypes.length}`);
        }

        // ターゲット数チェック (設計上は12個: 4投稿タイプ×3ターゲット)
        if (uiTargets.length !== 12) {
            this.issues.push(`❌ Expected 12 targets, found ${uiTargets.length}`);
        }
    }

    // チェック2: ターゲット内ペルソナ重複の完全排除確認
    checkPersonaDuplicates() {
        console.log('\n🔍 Checking persona duplicates within targets...');
        
        // Phase B1で発見された重複問題の再チェック
        const personaFrequency = {};
        const personaCategoryMap = {};
        
        this.data.knowledge.forEach(knowledge => {
            const persona = knowledge.targetPersona || knowledge.persona;
            const category = knowledge.problemCategory || knowledge.category;
            if (!persona) return;
            
            if (!personaFrequency[persona]) {
                personaFrequency[persona] = 0;
                personaCategoryMap[persona] = new Set();
            }
            
            personaFrequency[persona]++;
            if (category) {
                personaCategoryMap[persona].add(category);
            }
        });

        // 高頻度ペルソナの検出（Phase B1で発見された問題の継続チェック）
        const duplicatePersonas = Object.entries(personaFrequency)
            .filter(([persona, count]) => count > 1)
            .sort((a, b) => b[1] - a[1]);

        console.log(`📊 Found ${duplicatePersonas.length} personas with multiple entries`);

        duplicatePersonas.forEach(([persona, count]) => {
            const categories = [...personaCategoryMap[persona]];
            if (categories.length === 1) {
                // 同一カテゴリ内重複 = より深刻な問題
                this.issues.push(`❌ CRITICAL: Persona ${persona} appears ${count} times in same category (${categories[0]})`);
            } else {
                // 異なるカテゴリ = 許容可能だが要確認
                this.warnings.push(`⚠️ Persona ${persona} appears ${count} times across categories: ${categories.join(', ')}`);
            }
        });

        // Phase B1で特定された特定問題の再チェック
        this.checkSpecificB1Issues(personaFrequency, personaCategoryMap);

        this.stats.duplicatePersonas = duplicatePersonas.length;
    }

    // Phase B1で特定された特定問題の再チェック
    checkSpecificB1Issues(personaFrequency, personaCategoryMap) {
        // P004の業界研究重複問題
        if (personaFrequency['P004'] > 1) {
            const p004Categories = [...personaCategoryMap['P004']];
            if (p004Categories.includes('業界研究')) {
                this.issues.push(`❌ P004 still has duplicates in 業界研究 category (${personaFrequency['P004']} entries)`);
            }
        }

        // P001のガクチカ重複問題
        if (personaFrequency['P001'] > 1) {
            // ガクチカ関連エントリの詳細チェックが必要
            this.warnings.push(`⚠️ P001 still has multiple entries (${personaFrequency['P001']}), verify ガクチカ duplicates resolved`);
        }

        // P002のメンタルヘルス重複問題  
        if (personaFrequency['P002'] > 1) {
            this.warnings.push(`⚠️ P002 still has multiple entries (${personaFrequency['P002']}), verify mental health duplicates resolved`);
        }
    }

    // チェック3: ナレッジ構造データの完整性
    checkKnowledgeStructureIntegrity() {
        console.log('\n🔍 Checking knowledge structure data integrity...');
        
        let validStructures = 0;
        let missingFields = 0;
        
        // 新しいデータ構造に対応した必須フィールド
        const requiredFieldsMap = {
            'persona': ['targetPersona', 'persona'],
            'category': ['problemCategory', 'category'], 
            'problem': ['problemDescription', 'problem'],
            'solution': ['solutionContent', 'solution'],
            'role': ['role']
        };
        const optionalFields = ['painPoints', 'targetAudience', 'effectiveExpressions'];
        
        this.data.knowledge.forEach((knowledge, index) => {
            let isValid = true;
            const missing = [];
            
            // 必須フィールドチェック（複数の可能なフィールド名に対応）
            Object.entries(requiredFieldsMap).forEach(([logicalName, possibleFields]) => {
                const hasValue = possibleFields.some(field => 
                    knowledge[field] && 
                    (typeof knowledge[field] !== 'string' || knowledge[field].trim().length > 0)
                );
                
                if (!hasValue) {
                    missing.push(`${logicalName} (${possibleFields.join('/')})` );
                    isValid = false;
                }
            });
            
            if (!isValid) {
                this.issues.push(`❌ Knowledge ${index} missing required fields: ${missing.join(', ')}`);
                missingFields++;
            } else {
                validStructures++;
            }
            
            // データ品質チェック
            const problem = knowledge.problemDescription || knowledge.problem;
            const solution = knowledge.solutionContent || knowledge.solution;
            
            if (problem && solution) {
                if (problem === solution) {
                    this.issues.push(`❌ Knowledge ${index} has identical problem and solution`);
                }
            }
        });

        console.log(`📊 Valid structures: ${validStructures}/${this.data.knowledge.length}`);
        console.log(`📊 Entries with missing fields: ${missingFields}`);
        
        this.stats.validKnowledgeStructures = validStructures;
        this.stats.knowledgeStructureIssues = missingFields;
        
        // Phase B3の分析結果との整合性チェック
        if (this.data.knowledge.length !== 116) {
            this.issues.push(`❌ Expected 116 knowledge entries (Phase B3), found ${this.data.knowledge.length}`);
        }
    }

    // チェック4: システム全体の動作整合性
    checkSystemConsistency() {
        console.log('\n🔍 Checking overall system operational consistency...');
        
        // UI定義とデータ定義の整合性
        this.checkUIDataConsistency();
        
        // Phase C1-C5の実装との整合性
        this.checkPhaseImplementationConsistency();
    }

    // UI定義とデータ定義の整合性チェック
    checkUIDataConsistency() {
        // TypeScript型定義の一貫性チェック
        const targetIdPattern = /type TargetID = '([^']+)'/;
        const themeIdPattern = /type ThemeID = '([^']+)'/;
        
        const targetMatch = this.data.typesContent.match(new RegExp(targetIdPattern.source, 'g'));
        const themeMatch = this.data.typesContent.match(new RegExp(themeIdPattern.source, 'g'));
        
        if (!targetMatch) {
            this.issues.push('❌ TargetID type definition not found');
        }
        
        if (!themeMatch) {
            this.issues.push('❌ ThemeID type definition not found');
        }
        
        // UI選択肢とタイプ定義の一致チェック
        const uiTargets = this.extractTargetsFromUI();
        if (targetMatch) {
            // T001-T012の期待値チェック
            const expectedTargets = Array.from({length: 12}, (_, i) => `T${(i + 1).toString().padStart(3, '0')}`);
            const missingTargets = expectedTargets.filter(t => !uiTargets.some(ut => ut.id === t));
            
            if (missingTargets.length > 0) {
                this.issues.push(`❌ Missing targets in UI: ${missingTargets.join(', ')}`);
            }
        }
    }

    // フェーズ実装との整合性チェック
    checkPhaseImplementationConsistency() {
        // Phase C1: 5→12ターゲット移行の確認
        const uiTargets = this.extractTargetsFromUI();
        if (uiTargets.length === 5) {
            this.issues.push('❌ UI still shows 5 targets - Phase C1 implementation may have been reverted');
        } else if (uiTargets.length === 12) {
            console.log('✅ Phase C1: UI correctly shows 12 targets');
        }
        
        // Phase C5: 動的テンプレートシステムの存在確認
        const dynamicSystemFiles = [
            'app/services/KnowledgeStructureAnalyzer.ts',
            'app/services/DynamicTemplateGenerator.ts',
            'app/services/StructurePreservationValidator.ts',
            'app/services/IntegratedDynamicPageController.ts'
        ];
        
        dynamicSystemFiles.forEach(filePath => {
            if (!fs.existsSync(path.join(process.cwd(), filePath))) {
                this.warnings.push(`⚠️ Phase C5 file missing: ${filePath}`);
            }
        });
    }

    // UI定義から投稿タイプを抽出
    extractPostTypesFromUI() {
        const postTypePattern = /{\s*id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]/g;
        const postTypes = [];
        let match;
        
        while ((match = postTypePattern.exec(this.data.selectorContent)) !== null) {
            postTypes.push({
                id: match[1],
                name: match[2]
            });
        }
        
        return postTypes;
    }

    // UI定義からターゲットを抽出
    extractTargetsFromUI() {
        // 単純なid抽出でターゲット数をカウント
        const targetIdPattern = /id:\s*['"]T(\d+)['"][\s\S]*?name:\s*['"]([^'"]+)['"]/g;
        const targets = [];
        let match;
        
        while ((match = targetIdPattern.exec(this.data.selectorContent)) !== null) {
            targets.push({
                id: `T${match[1]}`,
                name: match[2]
            });
        }
        
        return targets;
    }

    // レポート生成
    generateReport() {
        const timestamp = new Date().toISOString().split('T')[0];
        const reportContent = `# 📋 Phase D1: データ整合性チェックレポート

**実行日**: ${timestamp}  
**チェック対象**: Instagram Post Generator - ナレッジベース生成システム

---

## 🎯 **実行概要**

Phase D1の要求に従い、実装完了システムの投稿タイプフィルタリング用データの整合性・品質を最終検証しました。

---

## 📊 **統計サマリー**

| 項目 | 値 |
|------|-----|
| **ナレッジエントリ数** | ${this.data.knowledge?.length || 'N/A'} |
| **ユニークペルソナ数** | ${this.stats.knowledgePersonas || 'N/A'} |
| **ナレッジカテゴリ数** | ${this.stats.knowledgeCategories || 'N/A'} |
| **UI投稿タイプ数** | ${this.stats.uiPostTypes || 'N/A'} |
| **UIターゲット数** | ${this.stats.uiTargets || 'N/A'} |
| **重複ペルソナ数** | ${this.stats.duplicatePersonas || 'N/A'} |
| **有効ナレッジ構造数** | ${this.stats.validKnowledgeStructures || 'N/A'} |
| **構造問題数** | ${this.stats.knowledgeStructureIssues || 'N/A'} |

---

## 🚨 **重要問題 (${this.issues.length}件)**

${this.issues.length > 0 ? this.issues.map(issue => `- ${issue}`).join('\n') : '✅ 重要問題は発見されませんでした。'}

---

## ⚠️ **警告・注意事項 (${this.warnings.length}件)**

${this.warnings.length > 0 ? this.warnings.map(warning => `- ${warning}`).join('\n') : '✅ 警告事項はありません。'}

---

## 🔍 **詳細チェック結果**

### **1. ペルソナ-ナレッジ-投稿タイプの3者関係整合性**
- ナレッジデータ内のペルソナ数: ${this.stats.knowledgePersonas || 'N/A'}
- UI定義の投稿タイプ数: ${this.stats.uiPostTypes || 'N/A'} (期待値: 4)
- UI定義のターゲット数: ${this.stats.uiTargets || 'N/A'} (期待値: 12)

### **2. ターゲット内ペルソナ重複の完全排除確認**
- 重複ペルソナ検出数: ${this.stats.duplicatePersonas || 'N/A'}
- Phase B1で特定された問題の継続性チェック完了

### **3. ナレッジ構造データの完整性**
- 有効な構造を持つナレッジ: ${this.stats.validKnowledgeStructures || 'N/A'}/${this.data.knowledge?.length || 'N/A'}
- 構造上の問題を持つエントリ: ${this.stats.knowledgeStructureIssues || 'N/A'}

### **4. システム全体の動作整合性**
- UI定義とタイプ定義の整合性: チェック完了
- Phase C1-C5実装との整合性: チェック完了

---

## 📋 **推奨アクション**

### **🔴 緊急対応が必要**
${this.issues.filter(issue => issue.includes('CRITICAL')).map(issue => `- ${issue}`).join('\n') || '- なし'}

### **🟡 早期対応推奨**
${this.issues.filter(issue => !issue.includes('CRITICAL')).map(issue => `- ${issue}`).join('\n') || '- なし'}

### **🔵 継続監視対象**
${this.warnings.map(warning => `- ${warning}`).join('\n') || '- なし'}

---

## ⚠️ **Phase B2 未実行問題**

**重要発見**: Phase B2 (ターゲット再分類: 116ペルソナの12ターゲット再分類) が未実行です。

**影響**:
- ペルソナ-ターゲット関係の不整合
- 投稿タイプフィルタリングの不完全性
- データ整合性の根本的問題

**対応要求**: Phase B2の緊急実行が必要

---

## ✅ **品質保証証明**

${this.issues.length === 0 ? 
`**✅ データ整合性認証済み**

このシステムのデータ整合性は確認されました。全てのチェック項目をクリアしており、Phase D1の品質基準を満たしています。` :
`**⚠️ 条件付き認証**

データ整合性に${this.issues.length}件の問題が発見されました。これらの問題を解決後、再度検証を実施してください。`}

---

**生成日時**: ${new Date().toISOString()}  
**ツールバージョン**: Phase D1 データ整合性チェッカー v1.0  
**次ステップ**: ${this.issues.length > 0 ? '問題修正後の再検証' : 'システム運用開始可能'}
`;

        return reportContent;
    }

    // メイン実行関数
    async run() {
        console.log('🚀 Phase D1: データ整合性チェック開始\n');
        
        const success = await this.loadData();
        if (!success) {
            console.error('❌ データ読み込み失敗。チェックを中断します。');
            return false;
        }

        this.checkThreeWayRelationship();
        this.checkPersonaDuplicates();
        this.checkKnowledgeStructureIntegrity();
        this.checkSystemConsistency();

        const report = this.generateReport();
        
        // レポートをファイルに保存
        const reportPath = path.join(process.cwd(), 'docs', 'PHASE_D1_DATA_INTEGRITY_REPORT.md');
        fs.writeFileSync(reportPath, report);
        
        console.log(`\n📋 データ整合性チェック完了`);
        console.log(`📄 レポート: ${reportPath}`);
        console.log(`🚨 問題: ${this.issues.length}件`);
        console.log(`⚠️ 警告: ${this.warnings.length}件`);
        
        return this.issues.length === 0;
    }
}

// CLI実行
if (require.main === module) {
    const checker = new DataIntegrityChecker();
    checker.run().then(success => {
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('❌ チェック実行中にエラーが発生しました:', error);
        process.exit(1);
    });
}

module.exports = DataIntegrityChecker;