# 103個ナレッジ完全走査分析 プロンプトフロー書

**作成日時**: 2025-01-24  
**目的**: ページ構成×テンプレート組み合わせアプローチの検証  
**重要原則**: 先入観排除・期待収束回避・客観的事実のみに基づく分析  

---

## Phase 0: データ存在確認とセットアップ

### セクション0-1: 全データソース存在確認

**タスク**: 分析に必要な全データファイルの存在確認と読み込み可能性検証

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/` 内の9つのセッションファイル
- **生観察データ**: `/docs/raw-analysis/contents-XXX-observation.json` (001-116)
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/KXXX.json` (K001-K116)

**分析対象**: 103個のナレッジ（K001-K116のうち存在するもの）
**欠番**: K004, K008, K009, K013, K014, K015, K019, K020, K066-K070, K075, K094, K095, K110

**実行指示**:
```
1. Phase 1分析記録の確認（9ファイル）
   - /docs/phase1-analysis/session1-K001-K010-analysis.md の存在・読み込み確認
   - /docs/phase1-analysis/session1-K011-K018-analysis.md の存在・読み込み確認
   - /docs/phase1-analysis/session1-K021-K030-analysis.md の存在・読み込み確認
   - /docs/phase1-analysis/session2-K031-K045-analysis.md の存在・読み込み確認
   - /docs/phase1-analysis/session2-K046-K059-analysis.md の存在・読み込み確認
   - /docs/phase1-analysis/session3-K061-K080-analysis.md の存在・読み込み確認
   - /docs/phase1-analysis/session3-K091-K100-analysis.md の存在・読み込み確認
   - /docs/phase1-analysis/session3-K101-K110-analysis.md の存在・読み込み確認
   - /docs/phase1-analysis/session3-K111-K116-analysis.md の存在・読み込み確認

2. 生観察データの確認（対象ファイルのみ）
   - /docs/raw-analysis/ 配下の contents-XXX-observation.json存在確認
   - 欠番ファイル（contents-004, contents-008等）の不存在確認

3. ナレッジベースの確認（対象ファイルのみ）
   - /app/data/knowledgeBase/knowledge/ 配下の KXXX.json存在確認
   - 欠番ファイル（K004.json, K008.json等）の不存在確認
```

**出力要求**:
```
- 存在ファイル一覧（完全リスト）
- 不存在ファイル一覧（欠番確認）
- 読み込み不可能ファイル一覧（サイズ制限等）
- 分析可能なナレッジ総数の確定
```

**品質基準**:
- **100%走査**: 103個全存在ナレッジの漏れなき確認
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **検証可能性**: 全ての確認結果の検証可能性確保

---

### セクション0-2: 出力ディレクトリ作成

**タスク**: 分析結果保存用ディレクトリ構造の作成

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**作成するディレクトリ構造**:
```
/docs/phase2-analysis/
├── individual/          # 個別分析結果 (103ファイル)
├── patterns/           # パターン分析結果
├── matrix/             # 組み合わせ検証
└── (final-coverage-report.mdは最後に作成)
```

**実行指示**:
```
1. /docs/phase2-analysis/ ディレクトリ作成
2. /docs/phase2-analysis/individual/ ディレクトリ作成
3. /docs/phase2-analysis/patterns/ ディレクトリ作成
4. /docs/phase2-analysis/matrix/ ディレクトリ作成
5. 各ディレクトリの書き込み権限確認
```

**出力要求**:
```
- 作成完了したディレクトリ一覧
- 権限確認結果
- セットアップ完了の確認
```

<!-- ---

## Phase 1: 個別ナレッジ詳細構造分析

### セクション1-1: K001-K010 個別分析

**タスク**: K001-K010の10個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/session1-K001-K010-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-001-observation.json` ～ `/docs/raw-analysis/contents-010-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K001.json` ～ `/app/data/knowledgeBase/knowledge/K010.json`

**注意**: K004, K008, K009は欠番のため対象外

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K001-K010
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
各ナレッジ（K001, K002, K003, K005, K006, K007, K010）について：

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
   - /docs/phase2-analysis/individual/K001-analysis.json
   - /docs/phase2-analysis/individual/K002-analysis.json
   - ... (対象ナレッジ全て)
```

**出力要求**:
```
- K001-analysis.json ～ K010-analysis.json (K004, K008, K009除く)
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **3ソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

---

### セクション1-2: K011-K018 個別分析

**タスク**: K011-K018の8個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/session1-K011-K018-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-011-observation.json` ～ `/docs/raw-analysis/contents-018-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K011.json` ～ `/app/data/knowledgeBase/knowledge/K018.json`

**注意**: K013, K014, K015は欠番のため対象外

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K011-K018
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
各ナレッジ（K011, K012, K016, K017, K018）について：

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
   - /docs/phase2-analysis/individual/K011-analysis.json
   - /docs/phase2-analysis/individual/K012-analysis.json
   - ... (対象ナレッジ全て)
```

**出力要求**:
```
- K011-analysis.json, K012-analysis.json, K016-analysis.json, K017-analysis.json, K018-analysis.json
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **3ソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

---

### セクション1-3: K021-K030 個別分析

**タスク**: K021-K030の10個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/session1-K021-K030-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-021-observation.json` ～ `/docs/raw-analysis/contents-030-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K021.json` ～ `/app/data/knowledgeBase/knowledge/K030.json`

**注意**: K019, K020は欠番のため対象外（ただしK021-K030は全て存在）

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K021-K030
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
各ナレッジ（K021-K030の全10個）について：

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
   - /docs/phase2-analysis/individual/K021-analysis.json
   - /docs/phase2-analysis/individual/K022-analysis.json
   - ... (K030まで全て)
```

**出力要求**:
```
- K021-analysis.json ～ K030-analysis.json (全10ファイル)
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **3ソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

--- -->
<!-- 
### セクション1-4: K031-K045 個別分析

**タスク**: K031-K045の15個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/session2-K031-K045-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-031-observation.json` ～ `/docs/raw-analysis/contents-045-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K031.json` ～ `/app/data/knowledgeBase/knowledge/K045.json`

**注意**: K031-K045は全て存在

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K031-K045
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
各ナレッジ（K031-K045の全15個）について：

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
   - /docs/phase2-analysis/individual/K031-analysis.json
   - /docs/phase2-analysis/individual/K032-analysis.json
   - ... (K045まで全て)
```

**出力要求**:
```
- K031-analysis.json ～ K045-analysis.json (全15ファイル)
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **3ソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

---

### セクション1-5: K046-K059 個別分析

**タスク**: K046-K059の14個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/session2-K046-K059-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-046-observation.json` ～ `/docs/raw-analysis/contents-059-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K046.json` ～ `/app/data/knowledgeBase/knowledge/K059.json`

**注意**: K046-K059は全て存在

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K046-K059
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
各ナレッジ（K046-K059の全14個）について：

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
   - /docs/phase2-analysis/individual/K046-analysis.json
   - /docs/phase2-analysis/individual/K047-analysis.json
   - ... (K059まで全て)
```

**出力要求**:
```
- K046-analysis.json ～ K059-analysis.json (全14ファイル)
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **3ソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

---

### セクション1-6: K061-K080 個別分析

**タスク**: K061-K080の20個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/session3-K061-K080-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-061-observation.json` ～ `/docs/raw-analysis/contents-080-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K061.json` ～ `/app/data/knowledgeBase/knowledge/K080.json`

**注意**: K066-K070は欠番のため対象外

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K061-K080（欠番除く）
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
各ナレッジ（K061-K065, K071-K080）について：

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
   - /docs/phase2-analysis/individual/K061-analysis.json
   - /docs/phase2-analysis/individual/K062-analysis.json
   - ... (K066-K070を除く全て)
```

**出力要求**:
```
- K061-K065, K071-K080のanalysis.json (15ファイル)
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **3ソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

--- -->

<!-- ### セクション1-7: K091-K100 個別分析

**タスク**: K091-K100の10個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/session3-K091-K100-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-091-observation.json` ～ `/docs/raw-analysis/contents-100-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K091.json` ～ `/app/data/knowledgeBase/knowledge/K100.json`

**注意**: K094, K095は欠番のため対象外

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K091-K100（欠番除く）
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
各ナレッジ（K091-K093, K096-K100）について：

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
   - /docs/phase2-analysis/individual/K091-analysis.json
   - /docs/phase2-analysis/individual/K092-analysis.json
   - ... (K094, K095を除く全て)
```

**出力要求**:
```
- K091-K093, K096-K100のanalysis.json (8ファイル)
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **3ソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

---

### セクション1-8: K101-K109 個別分析

**タスク**: K101-K109の9個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/session3-K101-K110-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-101-observation.json` ～ `/docs/raw-analysis/contents-109-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K101.json` ～ `/app/data/knowledgeBase/knowledge/K109.json`

**注意**: K110は欠番のため対象外

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K101-K109
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
各ナレッジ（K101-K109の全9個）について：

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
   - /docs/phase2-analysis/individual/K101-analysis.json
   - /docs/phase2-analysis/individual/K102-analysis.json
   - ... (K109まで全て)
```

**出力要求**:
```
- K101-analysis.json ～ K109-analysis.json (全9ファイル)
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **3ソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

--- -->

<!-- ### セクション1-9: K111-K116 個別分析

**タスク**: K111-K116の6個のナレッジの個別詳細構造分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **独立分析**: 各ナレッジを他の結果に影響されず独立して分析
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **Phase 1分析記録**: `/docs/phase1-analysis/session3-K111-K116-analysis.md`
- **生観察データ**: `/docs/raw-analysis/contents-111-observation.json` ～ `/docs/raw-analysis/contents-116-observation.json`
- **ナレッジベース**: `/app/data/knowledgeBase/knowledge/K111.json` ～ `/app/data/knowledgeBase/knowledge/K116.json`

**注意**: K111-K116は全て存在

**分析項目**:
```typescript
interface IndividualAnalysis {
  knowledgeId: string;                    // K111-K116
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
各ナレッジ（K111-K116の全6個）について：

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
   - /docs/phase2-analysis/individual/K111-analysis.json
   - /docs/phase2-analysis/individual/K112-analysis.json
   - ... (K116まで全て)
```

**出力要求**:
```
- K111-analysis.json ～ K116-analysis.json (全6ファイル)
- 各ファイルはIndividualAnalysis型に準拠
- 全ての項目が記録事実に基づいて記載
- 推測・類推による記載は一切なし
```

**品質基準**:
- **3ソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保

--- -->

## Phase 2: ページ構成パターン抽出

### セクション2-1: 全個別分析結果の統合読み込み

**タスク**: 103個の個別分析結果の完全統合とパターン抽出準備

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **帰納的抽出**: データから自然にパターンを導出
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **個別分析結果**: `/docs/phase2-analysis/individual/` 内の全103ファイル
- 各ファイルは IndividualAnalysis 型に準拠したJSON

**実行指示**:
```
1. 全個別分析結果ファイルの読み込み
   - /docs/phase2-analysis/individual/ 内の全JSONファイル読み込み
   - 各ファイルの IndividualAnalysis 構造確認
   - 読み込みエラーファイルの特定

2. pageStructureRequirements の統合抽出
   - 全103個のナレッジから pageStructureRequirements を抽出
   - totalPages の分布確認
   - pageRoles の種類と出現頻度確認
   - flowOrder の種類と出現頻度確認

3. パターン候補の初期特定
   - 類似した pageStructureRequirements のグループ化
   - 同じ totalPages を持つナレッジのグループ化
   - 同じ flowOrder を持つナレッジのグループ化
   - 同じ pageRoles 構成を持つナレッジのグループ化
```

**出力要求**:
```
- 読み込み完了ファイル数（103個であることを確認）
- pageStructureRequirements の統計情報
  - totalPages の分布（例：5ページ: 20個、7ページ: 15個等）
  - pageRoles の種類一覧
  - flowOrder の種類一覧
- 初期パターン候補リスト
```

**品質基準**:
- **100%統合**: 103個全ファイルの完全読み込み
- **事実のみ**: 記録されたデータのみを使用、推測・類推を排除
- **検証可能性**: 全ての統計情報の検証可能性確保

---

### セクション2-2: ページ構成パターンの帰納的抽出

**タスク**: 統合データから客観的なページ構成パターンの帰納的抽出

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **帰納的抽出**: データから自然にパターンを導出
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」
- **パターン数制限なし**: 最終パターン数が10個でも100個でも事実として受け入れる

**データソース**:
- **セクション2-1の統合結果**: pageStructureRequirements の統計情報と初期パターン候補

**抽出基準**:
1. **解決フローの段階数**: 実際の記録に基づく段階
2. **ページ役割の種類**: 導入・分析・解決・行動等の実際の役割
3. **情報提示の順序**: 時系列・論理構造・感情フロー等
4. **完結性**: 問題から解決まで完結するか

**パターン抽出フォーマット**:
```typescript
interface PageStructurePattern {
  patternId: string;                      // 自動生成されるパターンID
  patternName: string;                    // データから抽出された名称
  characteristics: {
    typicalPageCount: number[];           // 典型的なページ数
    flowType: string;                     // フローのタイプ（段階的、循環的等）
    roleSequence: string[];               // ページ役割の典型的な順序
  };
  applicableKnowledges: string[];         // このパターンが適用可能なナレッジID
  constraints: string[];                  // このパターンの制約条件
}
```

**実行指示**:
```
1. 類似構造のクラスタリング
   - 同じ flowOrder を持つナレッジをグループ化
   - 同じ pageRoles 構成を持つナレッジをグループ化
   - 同じ totalPages を持つナレッジをグループ化

2. パターンの客観的特定
   - 各クラスターの共通特徴を抽出
   - パターンの本質的特徴を事実に基づいて記録
   - パターンの制約条件を事実に基づいて記録

3. パターンの命名と分類
   - データから自然に導出される名称を付与
   - flowType の客観的分類
   - roleSequence の客観的記録

4. 適用可能性の確認
   - 各パターンがどのナレッジに適用可能かを記録
   - 適用時の制約条件を記録
```

**出力要求**:
```
- 抽出されたページ構成パターン数（事前予想なし）
- 各パターンの PageStructurePattern 形式での記録
- 各パターンの適用可能ナレッジ数
- パターン化できないナレッジのリスト（もしあれば）
```

**出力先**: `/docs/phase2-analysis/patterns/page-structures.json`

**品質基準**:
- **帰納的抽出**: データから自然に導出されたパターンのみ
- **事実のみ**: 記録されたデータのみを使用、推測・類推を排除
- **完全性**: 103個全ナレッジのパターン適用可能性確認
- **検証可能性**: 全てのパターンの検証可能性確保

---

## Phase 3: テンプレートパターン抽出

### セクション3-1: テンプレート要求の統合分析

**タスク**: 103個の個別分析結果からテンプレート要求の統合分析

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **帰納的抽出**: データから自然にパターンを導出
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **個別分析結果**: `/docs/phase2-analysis/individual/` 内の全103ファイル
- 各ファイルの templateRequirements セクション

**実行指示**:
```
1. templateRequirements の統合抽出
   - 全103個のナレッジから templateRequirements を抽出
   - layoutConstraints の種類と出現頻度確認
   - requiredElements の種類と出現頻度確認
   - informationArrangement の種類と出現頻度確認

2. レイアウト特徴の分類
   - layoutConstraints の客観的分類
   - 情報密度の客観的分類（記録に基づく）
   - 視覚構造の客観的分類（記録に基づく）

3. テンプレート候補の初期特定
   - 類似した templateRequirements のグループ化
   - 同じ layoutConstraints を持つナレッジのグループ化
   - 同じ requiredElements を持つナレッジのグループ化
   - 同じ informationArrangement を持つナレッジのグループ化
```

**出力要求**:
```
- templateRequirements の統計情報
  - layoutConstraints の種類一覧と出現頻度
  - requiredElements の種類一覧と出現頻度
  - informationArrangement の種類一覧と出現頻度
- 初期テンプレート候補リスト
```

**品質基準**:
- **100%統合**: 103個全ファイルの完全分析
- **事実のみ**: 記録されたデータのみを使用、推測・類推を排除
- **検証可能性**: 全ての統計情報の検証可能性確保

---

### セクション3-2: テンプレートパターンの帰納的抽出

**タスク**: 統合データから客観的なテンプレートパターンの帰納的抽出

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **帰納的抽出**: データから自然にパターンを導出
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」
- **パターン数制限なし**: 最終パターン数が10個でも100個でも事実として受け入れる

**データソース**:
- **セクション3-1の統合結果**: templateRequirements の統計情報と初期テンプレート候補

**抽出基準**:
1. **情報配置方法**: リスト・カード・対比・階層等
2. **項目提示形式**: 番号付き・チェック・段階・一覧等
3. **構造複雑度**: 単純・中程度・複雑な情報構造
4. **必須要素**: そのナレッジで絶対に必要な表現要素

**テンプレートパターンフォーマット**:
```typescript
interface TemplatePattern {
  patternId: string;                      // 自動生成されるパターンID
  patternName: string;                    // データから抽出された名称
  characteristics: {
    layoutType: string;                   // レイアウトタイプ
    informationDensity: string;           // 情報密度（低・中・高）
    visualStructure: string;              // 視覚的構造
  };
  requiredElements: string[];             // 必須の表現要素
  applicableKnowledges: string[];         // このパターンが適用可能なナレッジID
}
```

**実行指示**:
```
1. 類似テンプレート要求のクラスタリング
   - 同じ layoutConstraints を持つナレッジをグループ化
   - 同じ requiredElements を持つナレッジをグループ化
   - 同じ informationArrangement を持つナレッジをグループ化

2. テンプレートパターンの客観的特定
   - 各クラスターの共通特徴を抽出
   - パターンの本質的特徴を事実に基づいて記録
   - 必須表現要素を事実に基づいて記録

3. パターンの命名と分類
   - データから自然に導出される名称を付与
   - layoutType の客観的分類
   - informationDensity の客観的分類
   - visualStructure の客観的記録

4. 適用可能性の確認
   - 各パターンがどのナレッジに適用可能かを記録
   - 適用時の制約条件を記録
```

**出力要求**:
```
- 抽出されたテンプレートパターン数（事前予想なし）
- 各パターンの TemplatePattern 形式での記録
- 各パターンの適用可能ナレッジ数
- パターン化できないナレッジのリスト（もしあれば）
```

**出力先**: `/docs/phase2-analysis/patterns/template-patterns.json`

**品質基準**:
- **帰納的抽出**: データから自然に導出されたパターンのみ
- **事実のみ**: 記録されたデータのみを使用、推測・類推を排除
- **完全性**: 103個全ナレッジのパターン適用可能性確認
- **検証可能性**: 全てのパターンの検証可能性確保

---

## Phase 4: 組み合わせマトリックス作成

### セクション4-1: パターン組み合わせマトリックス作成

**タスク**: 抽出されたページ構成パターン×テンプレートパターンの全組み合わせ検証

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **完全表現可能性検証**: 各ナレッジが100点で表現可能かを厳格に判定
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **ページ構成パターン**: `/docs/phase2-analysis/patterns/page-structures.json`
- **テンプレートパターン**: `/docs/phase2-analysis/patterns/template-patterns.json`
- **個別分析結果**: `/docs/phase2-analysis/individual/` 内の全103ファイル

**検証基準**:
1. **完全表現可能性**: そのナレッジの本質的解決フローを損なわずに表現可能
2. **必須要素充足**: そのナレッジで必要な全ての表現要素を含む
3. **品質維持**: 元の分析で記録された品質水準を維持可能
4. **制約適合**: そのナレッジ固有の制約に適合

**実行指示**:
```
1. 全組み合わせの生成
   - 全ページ構成パターン × 全テンプレートパターンの組み合わせ生成
   - 各組み合わせの理論的特徴記録

2. 各ナレッジでの適用可能性検証
   - 103個の各ナレッジについて、全組み合わせでの適用可能性を個別検証
   - 完全表現可能: ○、部分表現可能: △、表現不可: ×での判定
   - 判定理由の詳細記録

3. マトリックス作成
   - ページ構成パターン（行）×テンプレートパターン（列）のマトリックス
   - 各セルに適用可能ナレッジ数を記録
   - 完全表現可能、部分表現可能、表現不可の分類

4. 詳細検証結果の記録
   - 各組み合わせで表現可能なナレッジのリスト
   - 各組み合わせで表現不可能なナレッジのリストと理由
```

**組み合わせマトリックスフォーマット**:
```typescript
interface CombinationMatrix {
  pageStructurePatterns: string[];        // ページ構成パターンID一覧
  templatePatterns: string[];             // テンプレートパターンID一覧
  matrix: Array<Array<{
    combinationId: string;                // 組み合わせID
    fullyCompatible: string[];            // 完全表現可能ナレッジ
    partiallyCompatible: Array<{          // 部分表現可能ナレッジ
      knowledgeId: string;
      constraints: string[];
    }>;
    incompatible: Array<{                 // 表現不可能ナレッジ
      knowledgeId: string;
      reasons: string[];
    }>;
  }>>;
}
```

**出力要求**:
```
- 全組み合わせ数
- 各組み合わせでの適用可能ナレッジ数
- 完全表現可能率の高い組み合わせ上位10個
- 表現不可能ナレッジが多い組み合わせと理由分析
```

**出力先**: `/docs/phase2-analysis/matrix/combination-matrix.json`

**品質基準**:
- **全組み合わせ検証**: パターン数に関係なく全組み合わせを検証
- **事実のみ**: 記録されたデータのみを使用、推測・類推を排除
- **厳格判定**: 100点ルールに基づく厳格な適用可能性判定
- **検証可能性**: 全ての判定結果の検証可能性確保

---

## Phase 5: カバレッジ完全検証

### セクション5-1: 103個ナレッジ完全カバレッジ検証

**タスク**: 103個全ナレッジの組み合わせでの表現可能性を1つずつ個別検証

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **個別検証**: 各ナレッジを統計的推測ではなく個別に検証
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **組み合わせマトリックス**: `/docs/phase2-analysis/matrix/combination-matrix.json`
- **個別分析結果**: `/docs/phase2-analysis/individual/` 内の全103ファイル

**検証手順**:
```
各ナレッジ（K001-K116の存在するもの）について：

1. 最適組み合わせの特定
   - そのナレッジが完全表現可能な組み合わせをリスト
   - 最も適合度の高い組み合わせを特定
   - 適合度の判定根拠を記録

2. 表現品質の検証
   - 選択した組み合わせでの表現品質を検証
   - 元の分析で記録された要求を100%満たすかを確認
   - 品質劣化がある場合は詳細記録

3. 制約条件の確認
   - そのナレッジ固有の制約条件への適合確認
   - 制約違反がある場合は詳細記録

4. 代替案の検討
   - 完全表現が不可能な場合の代替組み合わせ検討
   - 代替案での制約と品質影響を記録
```

**カバレッジ検証フォーマット**:
```typescript
interface CoverageVerification {
  totalKnowledges: number;                // 103
  fullySupported: Array<{
    knowledgeId: string;
    optimalCombination: string;           // 最適な組み合わせID
    qualityScore: number;                 // 1.0 = 100点
    verificationNotes: string;
  }>;
  partiallySupported: Array<{
    knowledgeId: string;
    bestCombination: string;              // 最良の組み合わせID
    qualityScore: number;                 // < 1.0
    constraints: string[];
    limitationNotes: string;
  }>;
  unsupported: Array<{
    knowledgeId: string;
    reasons: string[];
    requiredNewPattern: {
      pageStructureNeeds: string;
      templateNeeds: string;
    };
  }>;
}
```

**実行指示**:
```
1. 全ナレッジの個別検証実行
   - K001からK116まで、存在する全103個を個別に検証
   - 各ナレッジの最適組み合わせを特定
   - 完全・部分・不可の分類

2. 統計的サマリー作成
   - 完全表現可能ナレッジ数とパーセンテージ
   - 部分表現可能ナレッジ数とパーセンテージ
   - 表現不可能ナレッジ数とパーセンテージ

3. 例外ケース詳細分析
   - 表現不可能ナレッジの詳細分析
   - 必要な新パターンの特定
   - 品質劣化の原因分析

4. 改善提案の作成
   - カバレッジ向上のための改善案
   - 新規パターン追加の提案
```

**出力要求**:
```
- 完全カバレッジ検証結果（CoverageVerification形式）
- カバレッジ率（完全表現可能率）
- 例外ケースの詳細分析
- システム改善提案
```

**品質基準**:
- **100%個別検証**: 103個全ナレッジの漏れなき個別検証
- **事実のみ**: 記録されたデータのみを使用、推測・類推を排除
- **厳格判定**: 100点ルールに基づく厳格な品質判定
- **検証可能性**: 全ての検証結果の検証可能性確保

---

### セクション5-2: 最終検証結果報告書作成

**タスク**: 全分析結果の統合と最終検証結果報告書の作成

**重要原則**:
- **先入観排除**: 期待される結果に無理に収束させない
- **客観的報告**: 分析結果を事実として客観的に報告
- **客観性**: 推測・類推を排除し、記録された事実のみを使用
- **100点ルール**: 「100点じゃないものは全てテンプレートが存在しない」

**データソース**:
- **全Phase結果**: Phase1-5の全分析結果
- **カバレッジ検証結果**: セクション5-1の検証結果

**報告書構成**:
```markdown
# 103個ナレッジ完全走査分析 最終検証結果報告書

## 1. 分析概要
- 分析期間
- 分析対象（103個ナレッジの詳細）
- 分析方法論の要約

## 2. 抽出されたパターン
### 2.1 ページ構成パターン
- 抽出されたパターン数
- 各パターンの特徴と適用可能ナレッジ数

### 2.2 テンプレートパターン
- 抽出されたパターン数
- 各パターンの特徴と適用可能ナレッジ数

## 3. 組み合わせマトリックス検証結果
- 全組み合わせ数
- 高効率組み合わせの特定
- 組み合わせ効果の分析

## 4. 完全カバレッジ検証結果
### 4.1 カバレッジ統計
- 完全表現可能: [実数]個 ([パーセンテージ]%)
- 部分表現可能: [実数]個 ([パーセンテージ]%)
- 表現不可: [実数]個 ([パーセンテージ]%)

### 4.2 例外ケース詳細分析
- 表現不可能ナレッジの詳細分析
- 原因分析と対策提案

## 5. システム実現可能性評価
- ページ構成×テンプレート組み合わせアプローチの実現可能性
- 品質への影響評価
- 開発効率への影響評価

## 6. 実装推奨事項
- 優先実装すべき組み合わせ
- 段階的実装計画
- 品質保証手法

## 7. 今後の課題と改善提案
- カバレッジ向上のための改善案
- 新規パターン追加の必要性
- システム拡張の方向性
```

**実行指示**:
```
1. 全分析結果の統合
   - Phase1-5の全結果を統合
   - 数値データの正確性確認
   - 矛盾点の確認と修正

2. 客観的評価の実施
   - 仮説「ページ構成×テンプレート組み合わせで表現可能」の検証結果
   - カバレッジ率の客観的評価
   - 品質影響の客観的評価

3. 実装指針の作成
   - 実装チーム向けの具体的指針
   - 優先順位付けされた実装計画
   - 品質保証の具体的手法

4. 改善提案の作成
   - データに基づく改善提案
   - 具体的な実装方針
   - 将来拡張の指針
```

**出力要求**:
```
- 最終検証結果報告書（Markdown形式）
- 実装チーム向け指針書
- 数値データの詳細資料
- 改善提案書
```

**出力先**: `/docs/phase2-analysis/final-coverage-report.md`

**品質基準**:
- **客観的報告**: 事実に基づく客観的な報告
- **完全性**: 全分析結果の漏れなき統合
- **実用性**: 実装チームが直接使用可能な具体性
- **検証可能性**: 全ての結論の検証可能性確保

---

## 品質保証とチェックポイント

### 各セクション共通チェックポイント

**作業前チェック**:
- [ ] 重要原則の確認（先入観排除・独立分析・客観性・100点ルール）
- [ ] データソースの存在確認
- [ ] 出力先ディレクトリの確認

**作業中チェック**:
- [ ] 推測・類推を使用していないか
- [ ] 事実に基づく記録になっているか
- [ ] 他のナレッジの結果に影響されていないか

**作業後チェック**:
- [ ] 出力フォーマットの準拠確認
- [ ] 必須項目の記載確認
- [ ] 検証可能性の確保確認

**最終品質基準**:
- **100%走査**: 103個全存在ナレッジの漏れなき分析
- **3ソース統合**: Phase1記録・生観察データ・ナレッジベースの完全統合
- **事実のみ**: 記録された事実のみを使用、推測・類推を排除
- **独立性**: 各ナレッジの独立した分析
- **検証可能性**: 全ての分析結果の検証可能性確保
- **帰納的抽出**: データから自然に導出されたパターンのみ
- **厳格判定**: 100点ルールに基づく厳格な品質判定

---

## 緊急時対応

**データ不整合発見時**:
1. 作業を一時停止
2. 不整合内容の詳細記録
3. 原因調査の実施
4. 修正方針の決定後に作業再開

**想定外パターン発見時**:
1. 事実として受け入れ
2. 詳細な記録と分析
3. 既存分析への影響確認
4. 必要に応じて前段階の見直し

**品質基準未達時**:
1. 該当セクションの完全やり直し
2. 品質基準クリアまで繰り返し
3. 妥協による品質劣化は絶対禁止

---

**このプロンプトフロー書は、103個ナレッジの完全走査分析を確実に成功させるための詳細指示書です。各セクションを順次実行し、客観的事実に基づく分析を徹底してください。**