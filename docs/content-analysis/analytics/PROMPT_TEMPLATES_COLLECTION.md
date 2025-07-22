# システム実装用プロンプトテンプレート集

## 🎯 目的

4軸分析成果（TypeID、PersonaID詳細、BenefitID、ExpressionID、ThemeID詳細）を活用した、各コンポーネントの具体的プロンプトテンプレートを提供する。

## 📋 コンポーネント別プロンプトテンプレート

### **1. リサーチプロンプト生成エンジン**

#### **基本テンプレート**
```
# Instagram投稿リサーチプロンプト

## 投稿設定
- **投稿タイプ**: {type_name} ({type_id})
- **ターゲットペルソナ**: {persona_name} ({persona_id})
- **テーマ**: {theme_name} ({theme_id})
- **ユーザータイトル**: {user_title}

## ペルソナ詳細情報
{persona_details}

## 有益性要件
{benefit_requirements}

## リサーチ指示
{user_title}に関して、{persona_name}にとって最適な情報を以下の観点でリサーチしてください：

### 必須リサーチ項目
1. **基本情報・定義**
   - {theme_name}の基本的な概念・定義
   - 重要性・必要性の根拠

2. **実践的情報**
   - 具体的な手順・方法
   - 実際の活用例・事例

3. **ペルソナ特化情報**
   - {persona_name}が特に知りたい情報
   - {persona_name}の課題解決に直結する内容

4. **差別化要素**
   - 他の情報源にはない独自の視点
   - 最新のトレンド・変化

### 情報の品質要件
- **正確性**: 信頼できる情報源からの正確な情報
- **実用性**: すぐに活用できる具体的な内容
- **網羅性**: {persona_name}のニーズを包括的にカバー
- **独自性**: 差別化された価値ある情報

### 出力形式
構造化された情報として、各項目を明確に分けて提供してください。
```

#### **TypeID別カスタマイズ**
```python
type_customizations = {
    "001": {  # 共感・感情誘導型
        "additional_requirements": """
### 感情・共感要素の強化
- 体験談・実際のストーリーを含める
- 読者の感情に寄り添う表現・事例
- 不安解消・励ましにつながる情報
        """,
        "tone": "親しみやすく、共感的なトーン"
    },
    "002": {  # 教育・学習特化型
        "additional_requirements": """
### 教育・学習要素の強化
- 段階的な学習プロセス
- 体系的な知識構造
- 実践練習・応用方法
        """,
        "tone": "教育的で体系的なトーン"
    }
}
```

### **2. フォーマッター用プロンプト**

```
# Instagram投稿フォーマッタープロンプト

## 基本情報
- **投稿タイプ**: {type_name}
- **ペルソナ**: {persona_name}
- **テーマ**: {theme_name}
- **表現方法**: {expression_methods}

## リサーチ結果
{research_results}

## フォーマット指示
上記のリサーチ結果を、以下の構成で情報を整理・分割してください：

### ページ構成要件
{page_structure_requirements}

### 表現方法適用
{expression_application_rules}

### 情報分割原則
1. **情報の完全保持**: リサーチ結果の情報を一切失わない
2. **論理的分割**: ページ間の流れが自然になるよう分割
3. **ペルソナ最適化**: {persona_name}にとって理解しやすい順序
4. **表現方法統一**: {expression_methods}に従った一貫した表現

### 各ページの役割
{page_roles}

### 出力形式
```json
{
  "pages": [
    {
      "page_number": 1,
      "role": "導入",
      "content": "整理された情報",
      "key_points": ["重要ポイント1", "重要ポイント2"]
    }
  ]
}
```
```

### **3. コンテンツ生成用プロンプト**

```
# Instagram投稿コンテンツ生成プロンプト

## 設定情報
- **投稿タイプ**: {type_name} ({type_id})
- **ペルソナ**: {persona_name} ({persona_id})
- **テーマ**: {theme_name} ({theme_id})
- **有益性パターン**: {benefit_patterns}
- **表現技法**: {expression_techniques}

## 整理済み情報
{formatted_data}

## 成功パターン情報
{success_patterns}

## コンテンツ生成指示
整理済み情報を基に、以下の要件でInstagram投稿コンテンツを生成してください：

### 有益性の抽出・強調
{benefit_extraction_rules}

### 表現技法の適用
{expression_application}

### TypeID別特化要件
{type_specific_requirements}

### ペルソナ最適化
{persona_optimization}

### 品質基準
1. **情報の正確性**: 整理済み情報に基づく正確な内容
2. **有益性の明確化**: {benefit_patterns}を明確に感じられる構成
3. **表現の一貫性**: {expression_techniques}に従った統一された表現
4. **ペルソナ適合性**: {persona_name}にとって最適な内容・トーン

### 出力要件
1. **各ページのテキスト**: Instagram投稿として最適化されたテキスト
2. **キャプション**: 投稿全体を要約したキャプション
3. **ハッシュタグ**: ターゲットペルソナに適したハッシュタグ
```

### **4. テンプレート選択用プロンプト**

```
# テンプレート選択プロンプト

## 投稿情報
- **TypeID**: {type_id}
- **生成コンテンツ**: {generated_content}
- **ページ数**: {page_count}
- **構成特徴**: {structure_features}

## テンプレート選択基準
以下の基準で最適なテンプレートを選択してください：

### TypeID適合性
{type_template_mapping}

### 構成要素マッチング
- **ページ数**: {page_count}ページに対応
- **コンテンツタイプ**: {content_types}に最適
- **視覚的要素**: {visual_elements}をサポート

### 品質要件
- **100点ルール**: 完璧なマッチング（structureScore = 1.0）
- **情報表示**: 全情報が適切に表示可能
- **読みやすさ**: ターゲットペルソナにとって最適

### 選択結果
最適なテンプレートを選択し、以下の情報を提供：
1. **テンプレート名**: 選択されたテンプレート
2. **適合スコア**: 100点満点での評価
3. **選択理由**: 具体的な選択根拠
4. **調整要件**: 必要に応じた微調整指示
```

## 🔧 プロンプト変数の動的生成

### **変数マッピングテーブル**
```python
# 4軸分析結果からプロンプト変数を生成
def generate_prompt_variables(type_id, persona_id, theme_id, content_data):
    return {
        # 基本情報
        "type_name": get_type_name(type_id),
        "persona_name": get_persona_name(persona_id),
        "theme_name": get_theme_name(theme_id),
        
        # 詳細情報（4軸分析から）
        "persona_details": get_persona_details(persona_id),
        "benefit_requirements": get_benefit_requirements(persona_id),
        "expression_methods": get_expression_methods(type_id),
        "success_patterns": get_success_patterns(type_id, persona_id),
        
        # 動的生成
        "page_structure_requirements": generate_page_structure(type_id, theme_id),
        "expression_application_rules": generate_expression_rules(type_id),
        "benefit_extraction_rules": generate_benefit_rules(persona_id)
    }
```

## 📊 品質保証テンプレート

### **品質チェック用プロンプト**
```
# 生成コンテンツ品質チェック

## チェック対象
{generated_content}

## 品質基準
1. **ペルソナ適合性** (0-100点)
   - {persona_name}のニーズへの適合度
   - 言語・トーンの適切性

2. **有益性明確度** (0-100点)
   - {benefit_patterns}の明確な提示
   - 価値の伝達効果

3. **表現技法適用度** (0-100点)
   - {expression_techniques}の適切な適用
   - 一貫性の維持

4. **情報正確性** (0-100点)
   - 元リサーチ情報との整合性
   - 事実の正確性

## 改善提案
品質基準を満たさない項目について、具体的な改善提案を提供してください。
```

---

**作成日**: 2025-07-20  
**バージョン**: 1.0  
**目的**: 4軸分析成果を活用した実装用プロンプト集