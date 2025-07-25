# 残り24個ナレッジ個別分析 プロンプトフロー書

**作成日時**: 2025-01-24  
**目的**: 未完了24個ナレッジの個別詳細構造分析完了  
**重要原則**: 先入観排除・期待収束回避・客観的事実のみに基づく分析  

---

## 📊 分析対象概要

### **🎯 未完了分析ナレッジ一覧（24個）**

**グループ1 (8個)**: K004, K008, K009, K059, K060, K075, K081, K082  
**グループ2 (8個)**: K083, K084, K085, K086, K087, K088, K089, K090  
**グループ3 (8個)**: K103, K104, K105, K106, K107, K108, K109, K110

### **📈 進捗状況**
- **分析可能総数**: 103個（K001-K116のうち存在するもの）
- **完了済み**: 80個
- **未完了**: **24個**
- **完了率**: 77.7%

### **🔍 データソース確認済み**
- **Phase 1分析記録**: 9ファイル（全て存在）
- **生観察データ**: 90ファイル存在
- **ナレッジベース**: 103ファイル存在

### **⚠️ 重要修正事項**
**元プロンプトの「欠番」記述は誤りでした**:
- ❌ **誤**: K004, K008, K009等は欠番
- ✅ **正**: これらは全データソースが存在し分析可能

**実際の欠番**:
- **K013, K014, K015**: Phase1記録にあるが実ファイル存在しない
- **K019, K020**: Phase1記録にあるが実ファイル存在しない
- **K066-K070**: 完全に存在しない
- **K094, K095**: 存在しない

---

## Phase 1: 個別ナレッジ詳細構造分析（残り24個）

### セクション1-10: K004,K008,K009,K059,K060,K075,K081,K082 個別分析

**タスク**: K004,K008,K009,K059,K060,K075,K081,K082の8個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: 
  - K004: `/docs/phase1-analysis/session1-K001-K010-analysis.md`
  - K008: `/docs/phase1-analysis/session1-K001-K010-analysis.md`
  - K009: `/docs/phase1-analysis/session1-K001-K010-analysis.md`
  - K059: `/docs/phase1-analysis/session2-K046-K059-analysis.md`
  - K060: 該当セクションなし（注意：K060は欠番扱いされているがファイルは存在）
  - K075: `/docs/phase1-analysis/session3-K061-K080-analysis.md`
  - K081: `/docs/phase1-analysis/session3-K061-K080-analysis.md`
  - K082: `/docs/phase1-analysis/session3-K061-K080-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-004-observation.json` ～ `/docs/raw-analysis/contents-082-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K004.json` ～ `/app/data/knowledgeBase/knowledge/K082.json`

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K004,K008,K009,K059,K060,K075,K081,K082
  sourceData: {
    phase1Record: string;                 // Phase1分析の参照
    rawObservation: string;               // 生観察データの参照
    knowledgeBase: string;                // ナレッジベースの参照
  };
  problemSolutionFlow: {
    problem: string;                      // 解決する問題
    flowStages: string[];                 // 解決フローの段階
    completionState: string;              // 解決完了状態
  };
  pageStructureRequirements: {
    totalPages: number;                   // 総ページ数
    pageRoles: Array<{                    // 各ページの役割
      pageNumber: number;
      role: string;
      description: string;
    }>;
    flowOrder: string[];                  // 情報提示の順序
  };
  templateRequirements: {
    layoutConstraints: string[];          // レイアウト制約
    requiredElements: string[];           // 必須表現要素
    informationArrangement: string;       // 情報配置方法
  };
}
```

**実行指示**:
```
各ナレッジ（K004,K008,K009,K059,K060,K075,K081,K082）について：

1. 3つのデータソースからの情報統合
   - Phase1分析記録の該当セクション読み込み（K060はPhase1記録なしのため生観察データとナレッジベースのみ使用）
   - 生観察データ(contents-XXX-observation.json)読み込み  
   - ナレッジベース(KXXX.json)読み込み

2. 問題解決フローの客観的抽出
   - 記録された実際の問題を特定
   - 解決フローの段階を事実に基づいて抽出
   - 解決完了状態を記録に基づいて特定

3. ページ構成要求の客観的抽出
   - 記録された総ページ数を確認
   - 各ページの役割を事実に基づいて抽出
   - 情報提示順序を記録に基づいて特定

4. テンプレート要求の客観的抽出
   - 記録されたレイアウト制約を抽出
   - 必須表現要素を事実に基づいて特定
   - 情報配置方法を記録に基づいて抽出

5. IndividualAnalysis形式でのJSON出力
   - /docs/phase2-analysis/individual/K004-analysis.json
   - /docs/phase2-analysis/individual/K008-analysis.json
   - /docs/phase2-analysis/individual/K009-analysis.json
   - /docs/phase2-analysis/individual/K059-analysis.json
   - /docs/phase2-analysis/individual/K060-analysis.json
   - /docs/phase2-analysis/individual/K075-analysis.json
   - /docs/phase2-analysis/individual/K081-analysis.json
   - /docs/phase2-analysis/individual/K082-analysis.json
```

**出力要求**:
```
- K004-analysis.json, K008-analysis.json, K009-analysis.json, K059-analysis.json, K060-analysis.json, K075-analysis.json, K081-analysis.json, K082-analysis.json
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **データソース統合**: 利用可能なデータソースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

---

### セクション1-11: K083,K084,K085,K086,K087,K088,K089,K090 個別分析

**タスク**: K083,K084,K085,K086,K087,K088,K089,K090の8個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: K083-K090は81-90範囲内のため、該当するPhase1記録を確認（session3-K061-K080-analysis.mdまたはsession3-K091-K100-analysis.md）
- **生観察データ**: `/docs/raw-analysis/contents-083-observation.json` ～ `/docs/raw-analysis/contents-090-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K083.json` ～ `/app/data/knowledgeBase/knowledge/K090.json`

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K083,K084,K085,K086,K087,K088,K089,K090
  sourceData: {
    phase1Record: string;                 // Phase1分析の参照
    rawObservation: string;               // 生観察データの参照
    knowledgeBase: string;                // ナレッジベースの参照
  };
  problemSolutionFlow: {
    problem: string;                      // 解決する問題
    flowStages: string[];                 // 解決フローの段階
    completionState: string;              // 解決完了状態
  };
  pageStructureRequirements: {
    totalPages: number;                   // 総ページ数
    pageRoles: Array<{                    // 各ページの役割
      pageNumber: number;
      role: string;
      description: string;
    }>;
    flowOrder: string[];                  // 情報提示の順序
  };
  templateRequirements: {
    layoutConstraints: string[];          // レイアウト制約
    requiredElements: string[];           // 必須表現要素
    informationArrangement: string;       // 情報配置方法
  };
}
```

**実行指示**:
```
各ナレッジ（K083,K084,K085,K086,K087,K088,K089,K090）について：

1. 3つのデータソースからの情報統合
   - Phase1分析記録の該当セクション読み込み（K081-K090範囲を含む記録を確認）
   - 生観察データ(contents-XXX-observation.json)読み込み  
   - ナレッジベース(KXXX.json)読み込み

2. 問題解決フローの客観的抽出
   - 記録された実際の問題を特定
   - 解決フローの段階を事実に基づいて抽出
   - 解決完了状態を記録に基づいて特定

3. ページ構成要求の客観的抽出
   - 記録された総ページ数を確認
   - 各ページの役割を事実に基づいて抽出
   - 情報提示順序を記録に基づいて特定

4. テンプレート要求の客観的抽出
   - 記録されたレイアウト制約を抽出
   - 必須表現要素を事実に基づいて特定
   - 情報配置方法を記録に基づいて抽出

5. IndividualAnalysis形式でのJSON出力
   - /docs/phase2-analysis/individual/K083-analysis.json
   - /docs/phase2-analysis/individual/K084-analysis.json
   - /docs/phase2-analysis/individual/K085-analysis.json
   - /docs/phase2-analysis/individual/K086-analysis.json
   - /docs/phase2-analysis/individual/K087-analysis.json
   - /docs/phase2-analysis/individual/K088-analysis.json
   - /docs/phase2-analysis/individual/K089-analysis.json
   - /docs/phase2-analysis/individual/K090-analysis.json
```

**出力要求**:
```
- K083-analysis.json ～ K090-analysis.json (全8ファイル)
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **データソース統合**: 利用可能なデータソースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

---

### セクション1-12: K103,K104,K105,K106,K107,K108,K109,K110 個別分析

**タスク**: K103,K104,K105,K106,K107,K108,K109,K110の8個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/session3-K101-K110-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-103-observation.json` ～ `/docs/raw-analysis/contents-110-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K103.json` ～ `/app/data/knowledgeBase/knowledge/K110.json`

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K103,K104,K105,K106,K107,K108,K109,K110
  sourceData: {
    phase1Record: string;                 // Phase1分析の参照
    rawObservation: string;               // 生観察データの参照
    knowledgeBase: string;                // ナレッジベースの参照
  };
  problemSolutionFlow: {
    problem: string;                      // 解決する問題
    flowStages: string[];                 // 解決フローの段階
    completionState: string;              // 解決完了状態
  };
  pageStructureRequirements: {
    totalPages: number;                   // 総ページ数
    pageRoles: Array<{                    // 各ページの役割
      pageNumber: number;
      role: string;
      description: string;
    }>;
    flowOrder: string[];                  // 情報提示の順序
  };
  templateRequirements: {
    layoutConstraints: string[];          // レイアウト制約
    requiredElements: string[];           // 必須表現要素
    informationArrangement: string;       // 情報配置方法
  };
}
```

**実行指示**:
```
各ナレッジ（K103,K104,K105,K106,K107,K108,K109,K110）について：

1. 3つのデータソースからの情報統合
   - Phase1分析記録の該当セクション読み込み
   - 生観察データ(contents-XXX-observation.json)読み込み  
   - ナレッジベース(KXXX.json)読み込み

2. 問題解決フローの客観的抽出
   - 記録された実際の問題を特定
   - 解決フローの段階を事実に基づいて抽出
   - 解決完了状態を記録に基づいて特定

3. ページ構成要求の客観的抽出
   - 記録された総ページ数を確認
   - 各ページの役割を事実に基づいて抽出
   - 情報提示順序を記録に基づいて特定

4. テンプレート要求の客観的抽出
   - 記録されたレイアウト制約を抽出
   - 必須表現要素を事実に基づいて特定
   - 情報配置方法を記録に基づいて抽出

5. IndividualAnalysis形式でのJSON出力
   - /docs/phase2-analysis/individual/K103-analysis.json
   - /docs/phase2-analysis/individual/K104-analysis.json
   - /docs/phase2-analysis/individual/K105-analysis.json
   - /docs/phase2-analysis/individual/K106-analysis.json
   - /docs/phase2-analysis/individual/K107-analysis.json
   - /docs/phase2-analysis/individual/K108-analysis.json
   - /docs/phase2-analysis/individual/K109-analysis.json
   - /docs/phase2-analysis/individual/K110-analysis.json
```

**出力要求**:
```
- K103-analysis.json ～ K110-analysis.json (全8ファイル)
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **データソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

---

## 🎯 完了基準

### **📋 各セクション完了確認**
```bash
# セクション1-10完了確認
ls -la /docs/phase2-analysis/individual/K004-analysis.json
ls -la /docs/phase2-analysis/individual/K008-analysis.json
ls -la /docs/phase2-analysis/individual/K009-analysis.json
ls -la /docs/phase2-analysis/individual/K059-analysis.json
ls -la /docs/phase2-analysis/individual/K060-analysis.json
ls -la /docs/phase2-analysis/individual/K075-analysis.json
ls -la /docs/phase2-analysis/individual/K081-analysis.json
ls -la /docs/phase2-analysis/individual/K082-analysis.json

# セクション1-11完了確認
ls -la /docs/phase2-analysis/individual/K083-analysis.json
ls -la /docs/phase2-analysis/individual/K084-analysis.json
ls -la /docs/phase2-analysis/individual/K085-analysis.json
ls -la /docs/phase2-analysis/individual/K086-analysis.json
ls -la /docs/phase2-analysis/individual/K087-analysis.json
ls -la /docs/phase2-analysis/individual/K088-analysis.json
ls -la /docs/phase2-analysis/individual/K089-analysis.json
ls -la /docs/phase2-analysis/individual/K090-analysis.json

# セクション1-12完了確認
ls -la /docs/phase2-analysis/individual/K103-analysis.json
ls -la /docs/phase2-analysis/individual/K104-analysis.json
ls -la /docs/phase2-analysis/individual/K105-analysis.json
ls -la /docs/phase2-analysis/individual/K106-analysis.json
ls -la /docs/phase2-analysis/individual/K107-analysis.json
ls -la /docs/phase2-analysis/individual/K108-analysis.json
ls -la /docs/phase2-analysis/individual/K109-analysis.json
ls -la /docs/phase2-analysis/individual/K110-analysis.json
```

### **🏁 全体完了確認**
```bash
# 個別分析ファイル総数確認（103個であることを確認）
ls -la /docs/phase2-analysis/individual/*.json | wc -l

# 期待値: 103個（80完了済み + 24新規完了）
```

---

## 📝 注意事項

### **⚠️ データソース制約**
- **K060**: Phase1分析記録なし（生観察データとナレッジベースのみ使用）
- **K081-K090**: Phase1記録の範囲確認が必要
- **Phase1記録の範囲**: 実際の記録内容で対象範囲を確認

### **🔍 品質保証**
- **事実ベース**: 推測・類推を完全排除
- **独立分析**: 各ナレッジを他の結果に影響されず分析
- **検証可能性**: 全ての分析結果の根拠を明確化
- **100点ルール**: 完璧なマッチング以外は専用テンプレート不足と判定

### **📊 進捗管理**
- **セクション別実行**: 8個ずつ3セクションで管理
- **完了確認**: 各セクション完了後に次セクション開始
- **最終確認**: 全103個分析完了の総合確認

---

**🎯 本プロンプトフロー完了により、103個全ナレッジの個別分析が完了し、次フェーズのパターン分析・組み合わせ検証に進行可能となります。**