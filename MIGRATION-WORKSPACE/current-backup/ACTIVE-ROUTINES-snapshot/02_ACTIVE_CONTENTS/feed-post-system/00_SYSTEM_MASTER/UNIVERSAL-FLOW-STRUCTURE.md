# 📊 Instagram投稿生成 統一フロー構造

## 🎯 基本フロー構造

### **前提: Type判定**
新規作成時は、まず5つのTypeから適切なものを選択：
- Type001: MISAKI（女性向け感情共感）
- Type002: KING（男性向け実践習得）
- Type003: KIKUYO（ランキング情報）
- Type004: TEN（効率化テクニック）
- Type005: IIDA（就活サポート）

---

## 📋 共通実行フロー

### **1. チェックリスト適用**
- **分岐**: Type別チェックリスト
  - Type001: TYPE001-MASTER-CHECKLIST.md
  - Type002: TYPE002-MASTER-CHECKLIST.md
  - Type003: TYPE003-MASTER-CHECKLIST.md
  - Type004: TYPE004-MASTER-CHECKLIST.md
  - Type005: TYPE005-MASTER-CHECKLIST.md（要作成）

### **2. キャラクター戦略**
- **共通**: CHARACTER-STRATEGY-MASTER-GUIDE.md
- **Type別固定キャラクター**:
  - Type001 → MISAKI
  - Type002 → KING
  - Type003 → KIKUYO
  - Type004 → TEN
  - Type005 → IIDA

### **3. 日本語表現品質**
- **共通**: japanese-expression-quality-guide.md
- 全Type共通の表現改善ガイドライン

### **4. テンプレート理解**
- **共通**: template-placement-ultimate-master.md
- **Type別推奨テンプレート**:
  - Type001: section-blocks（2セクション）
  - Type002: 8ステップ構造
  - Type003: ランキング・Tier表
  - Type004: 実証型構造
  - Type005: 未定（要設計）

### **5. フッターテキスト**
- **共通**: FOOTER-TEXT-TEMPLATES.md
- キャラクター別のフッターテキスト選択

### **6. ファイナルメッセージ**
- **共通**: FINAL-MESSAGE-TEMPLATES.md
- Type・キャラクター別の最終メッセージ選択

---

## 🔄 フロー図

```
[Type判定]
    ↓
[Type別分岐]
    ├─ Type001 → MISAKI → 001チェックリスト
    ├─ Type002 → KING → 002チェックリスト
    ├─ Type003 → KIKUYO → 003チェックリスト
    ├─ Type004 → TEN → 004チェックリスト
    └─ Type005 → IIDA → 005チェックリスト
                ↓
        [共通フロー]
            ├─ 日本語表現品質
            ├─ テンプレート理解
            ├─ フッターテキスト
            └─ ファイナルメッセージ
                ↓
            [JSON出力]
```

---

## 📝 重要な改善点

### **従来の問題点**
- Type判定前にキャラクター選択をしていた
- 必要な情報が後から提供される構造
- Type専用性が不明確

### **新フローの利点**
- Type判定を最初に実施
- キャラクターがType別に固定で明確
- 分岐と共通部分が明確に分離
- 必要な情報が適切なタイミングで提供

---

## 🚀 実装時の注意事項

1. **Type005の整備**
   - チェックリスト作成
   - テンプレート選定
   - サンプルナレッジ作成

2. **既存ナレッジの移行**
   - 新Type定義への再分類
   - キャラクター整合性確認

3. **ドキュメント更新**
   - START-PROMPT.mdの更新
   - 各チェックリストの見直し