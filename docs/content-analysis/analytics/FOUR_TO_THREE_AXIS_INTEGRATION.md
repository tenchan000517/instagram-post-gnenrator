# 4軸→3軸統合ロジック設計書

## 🎯 目的

Step5-8の4軸詳細分析（PersonaID詳細、BenefitID、ExpressionID、ThemeID詳細）を、システム要件の3軸（TypeID + PersonaID + ThemeID）に統合するロジックを明確化する。

## 📊 統合の基本方針

### **現状の構造**
```
【4軸詳細分析】
- Step5: PersonaID詳細（例：P001:自己分析初心者型、P002:効率化重視型...）
- Step6: BenefitID（例：B001:詳細+整理+精度型、B002:簡潔+実用性型...）
- Step7: ExpressionID（例：E001:教育+親しみやすさ型、E002:図解+ステップ重視型...）
- Step8: ThemeID詳細（例：T001:自己分析手法解説型、T002:ES効率化技術型...）

【3軸システム要件】
- TypeID（4種確定済み）
- PersonaID（7種確定済み）
- ThemeID（15種確定済み）
```

### **統合の基本原則**
1. **情報の保持**: 4軸の詳細情報を失わない
2. **実装の簡潔性**: システムは3軸で動作
3. **拡張性**: 将来的な詳細活用を可能に

## 🔄 統合ロジック

### **1. PersonaID統合（Step5 → Step2のPersonaID）**

```yaml
# PersonaID詳細 → PersonaID（基本7種）へのマッピング
PersonaID統合ルール:
  P001（自己分析初心者型）→ PersonaID=2（転職検討層）
  P002（効率化重視型）→ PersonaID=3（時短・効率重視層）
  P003（体験共感型）→ PersonaID=5（情報収集層）
  # ... 以下、詳細PersonaIDを基本7種にグルーピング

統合方法:
  - 詳細PersonaIDの特性を分析
  - 最も近い基本PersonaIDに割り当て
  - persona_detail_mappingテーブルで管理
```

### **2. BenefitID統合（Step6 → PersonaIDの属性）**

```yaml
# BenefitIDをPersonaIDの有益性パターンとして組み込み
PersonaID拡張属性:
  PersonaID=1:
    primary_benefit: B001（詳細+整理+精度型）
    secondary_benefits: [B003, B005]
  PersonaID=2:
    primary_benefit: B002（簡潔+実用性型）
    secondary_benefits: [B004, B006]

実装方法:
  - persona_masterテーブルに benefit_pattern カラム追加
  - JSON形式で複数BenefitIDを格納
```

### **3. ExpressionID統合（Step7 → TypeIDの属性）**

```yaml
# ExpressionIDをTypeIDの推奨表現方法として組み込み
TypeID拡張属性:
  TypeID=001（共感型）:
    primary_expression: E001（教育+親しみやすさ型）
    compatible_expressions: [E003, E005]
  TypeID=002（学習型）:
    primary_expression: E002（図解+ステップ重視型）
    compatible_expressions: [E004, E006]

実装方法:
  - type_masterテーブルに expression_pattern カラム追加
  - 投稿タイプごとの最適表現方法を定義
```

### **4. ThemeID統合（Step8 → 既存ThemeIDの詳細化）**

```yaml
# ThemeID詳細分析結果を既存15種の詳細属性として組み込み
ThemeID拡張:
  ThemeID=001（ES/履歴書）:
    sub_themes: 
      - T001:自己分析手法解説型
      - T002:ES効率化技術型
    depth_level: 詳細
    approach_patterns: [方法論重視, 実践重視]

実装方法:
  - theme_masterテーブルに詳細属性追加
  - 階層的テーマ管理を実現
```

## 📋 データベース設計更新

### **新規テーブル**

```sql
-- PersonaID詳細マッピング
CREATE TABLE persona_detail_mapping (
  detail_persona_id VARCHAR(10) PRIMARY KEY,
  base_persona_id INT,
  mapping_score FLOAT,
  characteristics JSON
);

-- BenefitIDマスタ
CREATE TABLE benefit_master (
  benefit_id VARCHAR(10) PRIMARY KEY,
  benefit_name VARCHAR(100),
  benefit_pattern JSON
);

-- ExpressionIDマスタ
CREATE TABLE expression_master (
  expression_id VARCHAR(10) PRIMARY KEY,
  expression_name VARCHAR(100),
  expression_techniques JSON
);
```

### **既存テーブル拡張**

```sql
-- persona_master拡張
ALTER TABLE persona_master 
ADD COLUMN benefit_patterns JSON,
ADD COLUMN detail_persona_ids JSON;

-- type_master拡張
ALTER TABLE type_master 
ADD COLUMN expression_patterns JSON,
ADD COLUMN recommended_expressions JSON;

-- theme_master拡張
ALTER TABLE theme_master 
ADD COLUMN sub_themes JSON,
ADD COLUMN depth_attributes JSON;
```

## 🔧 実装時の処理フロー

### **1. リクエスト時の処理**
```
1. ユーザー選択：TypeID + PersonaID + ThemeID
2. システム内部処理：
   - PersonaID → 詳細PersonaIDs取得 → BenefitIDs取得
   - TypeID → ExpressionIDs取得
   - ThemeID → サブテーマ・詳細属性取得
3. 統合情報でプロンプト生成
```

### **2. 4軸情報の活用例**
```python
def generate_research_prompt(type_id, persona_id, theme_id):
    # 3軸から4軸情報を展開
    persona_details = get_persona_details(persona_id)
    benefit_ids = persona_details['benefit_patterns']
    expression_ids = get_expression_patterns(type_id)
    theme_details = get_theme_details(theme_id)
    
    # 詳細情報を使用してプロンプト生成
    prompt = build_prompt_with_4axis_info(
        type_id, persona_id, theme_id,
        benefit_ids, expression_ids, theme_details
    )
    return prompt
```

## 📊 統合後の利点

### **1. システムシンプリシティ**
- UIは3軸選択のまま維持
- 内部で4軸情報を自動展開

### **2. 詳細情報の保持**
- 4軸分析の成果を完全活用
- 将来的な詳細分析にも対応

### **3. 段階的実装可能**
- まず3軸で基本実装
- 順次4軸情報を組み込み

## 🚀 移行ステップ

### **Phase 1: 基本統合（1週間）**
1. マッピングテーブル作成
2. 統合ルール実装
3. 基本動作確認

### **Phase 2: 詳細活用（2週間）**
1. 4軸情報を使用したプロンプト最適化
2. 成功パターンの詳細分析
3. 品質向上確認

### **Phase 3: 継続的改善（ongoing）**
1. ユーザーフィードバック収集
2. 統合ルールの調整
3. 新パターンの追加

---

**作成日**: 2025-07-20  
**バージョン**: 1.0  
**目的**: 4軸詳細分析と3軸システム要件の統合