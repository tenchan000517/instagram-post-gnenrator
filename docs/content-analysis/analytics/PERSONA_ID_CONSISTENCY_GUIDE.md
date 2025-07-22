# PersonaID粒度整合性ガイド

## 🎯 目的

Step2で定義された基本PersonaID（7種）とStep5で分析される詳細PersonaIDの関係性を明確化し、システム全体での一貫性を確保する。

## 📊 PersonaID体系の全体像

### **Step2: 基本PersonaID（確定済み7種）**
```
PersonaID=1: 就活初心者層（迷い・不安型）
PersonaID=2: 転職検討層（キャリアチェンジ型）
PersonaID=3: 時短・効率重視層
PersonaID=4: 深掘り探求層（キャリア設計型）
PersonaID=5: 情報収集層（リサーチ型）
PersonaID=6: 即効性重視層（今すぐ型）
PersonaID=7: 経験者層（ノウハウ共有型）
```

### **Step5: 詳細PersonaID（分析予定）**
```
想定される詳細分類例：
P001: 自己分析初心者型（就活初心者層のサブタイプ）
P002: 効率化重視型（時短・効率重視層のサブタイプ）
P003: 体験共感型（複数の基本PersonaIDに跨る可能性）
... (20-30種程度を想定)
```

## 🔄 粒度整合性の設計

### **1. 階層構造アプローチ**

```yaml
基本PersonaID（親）:
  PersonaID=1（就活初心者層）:
    詳細PersonaID（子）:
      - P001: 自己分析初心者型
      - P007: ES作成初心者型
      - P013: 面接準備初心者型
    共通特性:
      - 経験不足による不安
      - 基礎知識の必要性
      - 段階的サポート需要

  PersonaID=3（時短・効率重視層）:
    詳細PersonaID（子）:
      - P002: 効率化重視型
      - P008: テンプレート活用型
      - P014: 自動化ツール希望型
    共通特性:
      - 時間制約の存在
      - 即効性の重視
      - 実用性優先
```

### **2. マッピングルール**

```python
# 詳細→基本への集約ルール
mapping_rules = {
    # 1対1マッピング（明確な親子関係）
    "P001": 1,  # 自己分析初心者型 → 就活初心者層
    "P002": 3,  # 効率化重視型 → 時短・効率重視層
    
    # 1対多マッピング（複数適合の場合）
    "P003": {
        "primary": 5,      # 主：情報収集層
        "secondary": [1],  # 副：就活初心者層
        "weight": 0.7      # 主への重み
    }
}
```

### **3. 分析時の記録フォーマット**

```markdown
## PersonaID詳細分析記録

### P001: 自己分析初心者型
- **基本PersonaID対応**: 1（就活初心者層）
- **対応根拠**: 
  - 自己分析の経験不足
  - 基礎的な手法を求める
  - 不安・迷いの存在
- **適合度**: 95%
- **副次的適合**: なし
```

## 📋 実装時の処理

### **1. システム内部での変換**

```python
class PersonaIDConverter:
    def get_base_persona_id(self, detail_persona_id):
        """詳細PersonaIDから基本PersonaIDを取得"""
        mapping = self.load_mapping_rules()
        
        if isinstance(mapping[detail_persona_id], int):
            # 1対1マッピング
            return mapping[detail_persona_id]
        else:
            # 1対多マッピング
            return mapping[detail_persona_id]["primary"]
    
    def get_all_related_personas(self, base_persona_id):
        """基本PersonaIDから関連する詳細PersonaIDsを取得"""
        detail_ids = []
        for detail_id, mapping in self.mapping_rules.items():
            if self._is_related(mapping, base_persona_id):
                detail_ids.append(detail_id)
        return detail_ids
```

### **2. 分析フェーズでの活用**

```yaml
Step5分析時:
  1. 100投稿から詳細PersonaIDを抽出
  2. 各詳細PersonaIDに基本PersonaID対応を記録
  3. 適合度・根拠を明記

システム実装時:
  1. ユーザーが基本PersonaIDを選択
  2. 関連する詳細PersonaIDsを自動取得
  3. 詳細な特性を考慮したコンテンツ生成
```

## 🔧 品質保証メカニズム

### **1. カバレッジ確認**
- 全詳細PersonaIDが基本PersonaIDに対応することを確認
- 孤立した詳細PersonaIDがないことを検証

### **2. 分布バランス**
- 各基本PersonaIDに適切な数の詳細PersonaIDが分布
- 極端な偏りがないことを確認

### **3. 一貫性チェック**
- 詳細PersonaIDの特性が基本PersonaIDと矛盾しない
- マッピングの論理的整合性を検証

## 📊 期待される成果

### **1. 詳細な分析と簡潔な実装の両立**
- Step5で詳細分析（20-30種）
- システムは7種の基本PersonaIDで動作
- 内部で詳細情報を活用

### **2. 将来の拡張性**
- 新しい詳細PersonaIDの追加が容易
- 基本PersonaIDは安定的に維持
- 段階的な詳細化が可能

### **3. ユーザー体験の向上**
- シンプルな選択肢（7種）
- 詳細なパーソナライゼーション
- 高品質なコンテンツ生成

## 🚀 Step5実行時の指針

### **分析時の注意点**
1. 必ず基本PersonaIDとの対応を意識
2. 適合度を数値で記録（%表示）
3. 複数適合の場合は優先順位を明記

### **記録必須項目**
- 詳細PersonaID（P001形式）
- 対応する基本PersonaID（1-7）
- 対応根拠（3つ以上）
- 適合度（%）
- 副次的適合（あれば）

---

**作成日**: 2025-07-20  
**バージョン**: 1.0  
**目的**: PersonaID体系の一貫性確保