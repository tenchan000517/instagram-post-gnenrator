# ナレッジベースシステム実装 実行プロンプト集

**使用方法**: 各セッションのプロンプトをコピー&ペーストして順番に実行してください。コンテキストが20%以下になったら次のセッションに移行してください。

---

## セッション1: 分析データ読み込み・ペルソナマスター作成

**必要ドキュメント**: 
- `docs/knowledge-base-implementation/batch-analysis-master-data-plan.md`

**実行プロンプト**:
```
以下のタスクを実行してください：

1. 以下のパスから分析結果を読み込み：
- docs/content-analysis/analytics/step5-personas/working/batches

2. 読み込んだ内容から以下のファイルを作成：
- app/services/knowledgeBase/data/masterData/personas.json

フォーマット:
{
  "P001": {
    "id": "P001",
    "name": "戦略的就活生",
    "characteristics": ["効率重視", "データ志向", "計画的"],
    "psychologicalNeeds": ["確実性", "優位性", "効率性"],
    "triggerMoments": ["就活準備開始時", "選考対策時"],
    "compatibleTypes": ["002", "003"],
    "compatibleThemes": ["T001", "T006", "T013"]
  }
}

分析結果からペルソナパターンを抽出し、既存のP001-P005形式に統合してJSONファイルを作成してください。
```

---

## セッション2: テーママスター作成

**必要ドキュメント**: 
- `docs/knowledge-base-implementation/batch-analysis-master-data-plan.md`

**実行プロンプト**:
```
以下のタスクを実行してください：

1. 以下のパスから分析結果を読み込み：
- docs/content-analysis/analytics/step8-themes/working

2. 読み込んだ内容から以下のファイルを作成：
- app/services/knowledgeBase/data/masterData/themes.json

フォーマット:
{
  "T001": {
    "id": "T001", 
    "name": "自己分析手法",
    "category": "キャリア戦略",
    "description": "効果的な自己分析の進め方",
    "compatibleTypes": ["001", "002"],
    "compatiblePersonas": ["P001", "P002"],
    "keywords": ["自己分析", "強み発見", "価値観"]
  }
}

分析結果からテーマパターンを抽出し、既存のT001-T021形式に統合してJSONファイルを作成してください。
```

---

## セッション3: テンプレートマスター・表現手法マスター作成

**必要ドキュメント**: 
- `docs/knowledge-base-implementation/batch-analysis-master-data-plan.md`

**実行プロンプト**:
```
以下のタスクを実行してください：

1. 既存テンプレートを確認し、以下のパスから表現手法分析結果を読み込み：
- docs/content-analysis/analytics/step7-expression-methods/working

2. 以下のファイルを作成：
- app/services/knowledgeBase/data/masterData/templates.json
- app/services/knowledgeBase/data/expressionMethodologies.json

templates.jsonフォーマット:
{
  "ranking": {
    "id": "ranking",
    "name": "ランキングテンプレート", 
    "itemFields": {
      "title": "required",
      "dataSource": "required",
      "rankingItems": "required_array",
      "interpretation": "optional"
    },
    "constraints": {
      "minItems": 3,
      "maxItems": 10,
      "dataSourceRequired": true
    }
  }
}

expressionMethodologies.jsonフォーマット:
{
  "engagementPatterns": {
    "emotional-hook": {
      "method": "共感フック技法",
      "specificTechniques": ["痛み点の言語化", "共通体験の想起"],
      "effectiveExpressions": ["同じ悩みを", "実は〇〇の人が", "あなたも経験ありませんか"]
    }
  }
}

現在の16テンプレートの定義と表現手法の方法論化を行い、JSONファイルを作成してください。
```

---

## セッション4: ページ構成マッチング定義作成

**必要ドキュメント**: 
- `docs/knowledge-base-implementation/batch-analysis-master-data-plan.md`
- 前セッションで作成したpersonas.json、themes.json

**実行プロンプト**:
```
以下のタスクを実行してください：

1. 前セッションで作成したマスターデータを読み込み：
- app/services/knowledgeBase/data/masterData/personas.json
- app/services/knowledgeBase/data/masterData/themes.json

2. 以下のパスから投稿タイプ分析結果を読み込み：
- docs/content-analysis/analytics/step1-post-types

3. 以下のファイルを作成：
- app/services/knowledgeBase/data/pageStructureMatching.json

フォーマット:
{
  "patterns": [
    {
      "matchingKey": "001-P001-T006",
      "description": "共感型×戦略的就活生×自己分析",
      "pageStructureId": "empathy-strategic-analysis-5page",
      "reasoning": "戦略的思考ユーザーには感情共感から論理的手法への段階的移行が効果的"
    }
  ]
}

TypeID×TargetID×ThemeIDの組み合わせを分析し、各組み合わせに最適なページ構成パターンをマッピングしてJSONファイルを作成してください。
```

---

## セッション5: ページ構成パターン詳細定義作成

**必要ドキュメント**: 
- `docs/knowledge-base-implementation/batch-analysis-master-data-plan.md`
- 前セッションで作成したpageStructureMatching.json

**実行プロンプト**:
```
以下のタスクを実行してください：

1. 前セッションで作成したマッチングファイルを読み込み：
- app/services/knowledgeBase/data/pageStructureMatching.json

2. pageStructuresディレクトリを作成し、主要なページ構成パターンファイルを3-5個作成：
- app/services/knowledgeBase/data/pageStructures/empathy-strategic-analysis-5page.json
- app/services/knowledgeBase/data/pageStructures/educational-anxiety-interview-4page.json
- app/services/knowledgeBase/data/pageStructures/data-practical-analysis-3page.json

各ページ構成パターンのフォーマット:
{
  "pageStructureId": "empathy-strategic-analysis-5page",
  "name": "感情共感→戦略的分析5ページ構成",
  "targetCombination": "001-P001-T006",
  "pages": [
    {
      "pageNumber": 1,
      "templateId": "section-items",
      "role": "emotional-hook",
      "itemAssignments": {
        "title": "自己分析で迷う就活生の共通パターン",
        "sections": [
          {
            "sectionTitle": "よくある悩み",
            "itemType": "empathy-statement",
            "extractionRule": "入力から不安・迷いを抽出"
          }
        ]
      }
    }
  ]
}

pageStructureMatchingで定義した主要パターンの詳細な項目マッピングを含むJSONファイルを作成してください。
```

---

## セッション6: ナレッジフォーマット正規化

**必要ドキュメント**: 
- `docs/knowledge-base-implementation/implementation-plan.md`

**実行プロンプト**:
```
以下のタスクを実行してください：

1. 現在のナレッジファイルを読み込み：
- app/services/knowledgeBase/data/successPatterns.json

2. 有益性分析結果を読み込み：
- docs/content-analysis/analytics/step6-beneficial-value/working/batches

3. 以下のファイルを作成：
- app/services/knowledgeBase/data/knowledgeMethodologies.json

フォーマット:
{
  "knowledgeId": "methodology-001-P001-T006",
  "problemSolvingMethodology": {
    "issueIdentification": "問題特定の具体的手順",
    "solutionDesignProcess": "解決策設計の段階的方法論",
    "implementationSteps": "実行可能なアクション手順"
  },
  "expressionMethodology": {
    "engagementPatterns": "効果的な関心引き付け手法",
    "credibilityBuilding": "信頼性構築方法",
    "actionInduction": "行動誘導表現技術"
  }
}

現在のsuccessPatterns.jsonの完成コンテンツから「方法論」を抽出し、有益性を生む具体的手順として再構造化してJSONファイルを作成してください。
```

---

## セッション7: 統合システム実装

**必要ドキュメント**: 
- `docs/knowledge-base-implementation/implementation-plan.md`
- 前セッションで作成した全マスターデータファイル

**実行プロンプト**:
```
以下のタスクを実行してください：

1. 既存システムファイルを読み込み：
- app/services/pageStructureAnalyzer.ts
- app/types/knowledgeBase.ts

2. 以下のTypeScriptファイルを作成：
- app/services/knowledgeBase/PageStructureMatcher.ts
- app/services/knowledgeBase/TemplateItemMapper.ts

3. 既存ファイルを最小限修正（useStructuredGeneration分岐追加のみ）：
- app/services/pageStructureAnalyzer.ts
- app/types/knowledgeBase.ts

PageStructureMatcher.ts要件:
- pageStructureMatching.jsonを使用した厳密マッチング
- フォールバック機能なし（エラー時は明確なエラー）

TemplateItemMapper.ts要件:
- ページ構成定義に基づくテンプレート項目マッピング
- 各テンプレート項目への具体的内容抽出・変換

既存システムへの影響を最小限に抑え、新機能はuseStructuredGeneration=true時のみ有効化する統合システムを実装してください。
```

---

**全セッション完了後、ナレッジベースシステム統合実装が完了します。各セッションは独立して実行可能です。**