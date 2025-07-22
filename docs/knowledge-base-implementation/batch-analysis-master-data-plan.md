# バッチ分析結果からマスターデータ作成計画書

## 分析対象パス

```
C:\instagram-course\instagram-post-generator\docs\content-analysis\analytics\step1-post-types
C:\instagram-course\instagram-post-generator\docs\content-analysis\analytics\step5-personas\working\batches  
C:\instagram-course\instagram-post-generator\docs\content-analysis\analytics\step6-beneficial-value\working\batches
C:\instagram-course\instagram-post-generator\docs\content-analysis\analytics\step7-expression-methods\working
C:\instagram-course\instagram-post-generator\docs\content-analysis\analytics\step8-themes\working
```

## 作成するマスターデータ

### 1. personas.json
**出力先**: `app/services/knowledgeBase/data/masterData/personas.json`  
**データ源**: `step5-personas/working/batches`

**抽出内容**:
- ペルソナID (P001, P002, P003...)
- ペルソナ名・特徴
- 心理的ニーズ・トリガーモーメント
- 適合する投稿タイプ・テーマ

**フォーマット**:
```json
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
```

### 2. themes.json  
**出力先**: `app/services/knowledgeBase/data/masterData/themes.json`  
**データ源**: `step8-themes/working`

**抽出内容**:
- テーマID (T001, T002, T003...)  
- テーマ名・カテゴリ
- 適用条件・コンテキスト
- 関連する投稿タイプ・ペルソナ

**フォーマット**:
```json
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
```

### 3. templates.json
**出力先**: `app/services/knowledgeBase/data/masterData/templates.json`  
**データ源**: 既存テンプレート分析 + 分析結果からの不足特定

**内容**:
- 現在の16テンプレート定義
- 各テンプレートの項目・制約
- 不足テンプレートの要件

**フォーマット**:
```json
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
```

### 4. pageStructureMatching.json
**出力先**: `app/services/knowledgeBase/data/pageStructureMatching.json`  
**データ源**: step1-post-types + step5-personas + step8-themes の組み合わせ分析

**内容**:
- TypeID×TargetID×ThemeIDの全組み合わせ
- 各組み合わせに最適なページ構成パターンID

**フォーマット**:
```json
{
  "patterns": [
    {
      "matchingKey": "001-P001-T006",
      "description": "共感型×戦略的就活生×自己分析",
      "pageStructureId": "empathy-strategic-analysis-5page",
      "reasoning": "戦略的思考ユーザーには感情共感から論理的手法への段階的移行が効果的"
    },
    {
      "matchingKey": "002-P002-T011", 
      "description": "教育型×不安解消型×面接対策",
      "pageStructureId": "educational-anxiety-interview-4page",
      "reasoning": "不安解消には体系的で段階的な教育アプローチが最適"
    }
  ]
}
```

### 5. expressionMethodologies.json
**出力先**: `app/services/knowledgeBase/data/expressionMethodologies.json`  
**データ源**: `step7-expression-methods/working`

**内容**:
- 効果的な表現手法の方法論
- 感情誘導・信頼構築・行動促進の具体的技術

**フォーマット**:
```json
{
  "engagementPatterns": {
    "emotional-hook": {
      "method": "共感フック技法",
      "specificTechniques": ["痛み点の言語化", "共通体験の想起"],
      "effectiveExpressions": ["同じ悩みを", "実は〇〇の人が", "あなたも経験ありませんか"]
    }
  },
  "credibilityBuilding": {
    "data-backing": {
      "method": "データ根拠提示法", 
      "requiredElements": ["サンプル数", "期間", "出典", "分析手法"],
      "presentationFormat": "数値→パターン→実践提案の3段構成"
    }
  }
}
```

## 抽出・作成プロセス

### Phase 1: 分析データ読み込み
1. 各step*/workingディレクトリの全ファイルを確認
2. 投稿タイプ・ペルソナ・テーマ・表現手法・有益性パターンを抽出
3. 重複・矛盾の除去と正規化

### Phase 2: マスターデータ構造化
1. 既存のP001-P005、T001-T021形式に統合
2. 新規発見パターンの追加・拡張
3. 相互関連性（compatible）の定義

### Phase 3: ページ構成マッチング定義
1. 有効な TypeID×TargetID×ThemeID 組み合わせを特定
2. 各組み合わせに最適なページ構成パターンを設計
3. フォールバック不要な完全マッチングリストを作成

### Phase 4: 検証・最適化
1. 全マスターデータの整合性確認
2. 欠損パターンの特定と対策
3. システム統合準備完了