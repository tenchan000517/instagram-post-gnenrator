# ナレッジベース統合システム 取扱説明書

## 📖 はじめに

このシステムは、TypeID×TargetID×ThemeIDの組み合わせから最適化されたInstagram投稿コンテンツを自動生成します。従来のAI生成と異なり、**100%厳密マッチング**により、妥協のない高品質コンテンツを提供します。

---

## 🚀 基本的な使い方

### Step 1: システム有効化

```typescript
const result = await pageStructureAnalyzer.analyzePageStructureAndTemplates(
  input,
  {
    useKnowledgeBase: true,
    useStructuredGeneration: true,  // 新システム有効化
    typeId: "001",                  // 必須
    targetId: "P001",               // 必須  
    themeId: "T006"                 // 必須
  }
);
```

### Step 2: 結果の確認

```typescript
console.log('生成されたページ数:', result.length);
console.log('1ページ目:', result[0]);
```

---

## 🎯 TypeID×TargetID×ThemeID 選択ガイド

### TypeID（投稿タイプ）選択

| TypeID | 名称 | 特徴 | 適用場面 |
|--------|------|------|----------|
| **001** | 共感型 | 感情に訴求、心理的共感重視 | 不安解消、心理サポート |
| **002** | 教育型 | 体系的学習、スキル習得重視 | 知識提供、能力開発 |
| **003** | 情報型 | データ・実績重視、客観性 | 戦略立案、意思決定支援 |
| **004** | 効率型 | 時短・効率重視、実用性 | 即効性、実践的解決 |

### TargetID（ペルソナ）選択

| TargetID | 名称 | 特徴 | 心理的ニーズ |
|----------|------|------|-------------|
| **P001** | 戦略的就活生 | 効率重視、データ志向、計画的 | 確実性、優位性、効率性 |
| **P002** | 不安解消型就活生 | 共感重視、心理サポートニーズ | 安心感、共感、心理的安定 |
| **P003** | 実践志向就活生 | 実践重視、具体的手法ニーズ | 実用性、即効性、確実な成果 |
| **P004** | 時期特化就活生 | 時期意識、緊急性対応 | タイミング適合、期限達成 |
| **P005** | キャリア志向社会人 | 将来志向、安定性重視 | キャリア安定、専門性向上 |
| **P006** | 学歴コンプレックス層 | コンプレックス解消ニーズ | 自信回復、差別化 |
| **P007** | 地方就活生 | 地方特有の課題意識 | 地域適応、情報格差解消 |
| **P008** | 専門業界志望 | 業界特化ニーズ | 専門性、業界適応 |

### ThemeID（テーマ）選択

| ThemeID | 名称 | カテゴリ | 適用内容 |
|---------|------|----------|----------|
| **T001** | 感情支援 | 心理サポート | 不安解消、心理ケア |
| **T002** | 体系教育 | 学習支援 | スキル習得、知識体系 |
| **T003** | 実績証明 | 権威性 | データ提示、実績アピール |
| **T004** | 情報提供 | 客観情報 | 選択肢提示、比較データ |
| **T005** | 戦略設計 | 計画立案 | 戦略構築、ロードマップ |
| **T006** | 問題解決 | 課題対応 | 具体的解決策、実践手順 |
| **T007** | 行動促進 | アクション | 実行支援、行動変容 |

---

## 💡 実践的な組み合わせ例

### 🎯 効果的な組み合わせ

#### 1. 戦略的ユーザー向け感情共感アプローチ
```typescript
{
  typeId: "001",    // 共感型
  targetId: "P001", // 戦略的就活生
  themeId: "T006"   // 問題解決
}
```
**効果**: 論理的思考ユーザーに感情的側面から問題解決を提示

#### 2. 不安解消ユーザー向け効率的サポート
```typescript
{
  typeId: "004",    // 効率型
  targetId: "P002", // 不安解消型就活生  
  themeId: "T007"   // 行動促進
}
```
**効果**: 不安を抱えるユーザーに即効性のある行動促進

#### 3. 実践志向ユーザー向け教育的アプローチ
```typescript
{
  typeId: "002",    // 教育型
  targetId: "P003", // 実践志向就活生
  themeId: "T002"   // 体系教育
}
```
**効果**: 実践ニーズに体系的学習を組み合わせ

---

## 🔍 生成結果の理解

### ページ構成パターン例

#### empathy-strategic-solution-5page
```
ページ1: 感情的共感（問題認識）
ページ2: 問題分析（戦略的思考）
ページ3: 解決フレームワーク
ページ4: 実践的ステップ
ページ5: 行動促進まとめ
```

#### efficiency-anxiety-action-3page
```
ページ1: 不安共感（即座の理解）
ページ2: 効率的解決策
ページ3: 今すぐ実行アクション
```

### 出力形式
```typescript
interface PageStructure {
  概要: string;         // システムによる最適化説明
  有益性: string;       // 厳密マッチングによる価値
  template: string;     // 使用テンプレート
  title: string;        // ページタイトル
  theme: string;        // 具体的コンテンツ
}
```

---

## ⚠️ 重要な注意事項

### ❌ エラーが発生する場合

#### 1. 組み合わせが存在しない
```
Error: No page structure pattern found for combination: 001-P001-T999
```
**対処法**: 有効な組み合わせを確認し、存在するパターンを使用

#### 2. 必須パラメータ不足
```typescript
// ❌ 不正
{
  useStructuredGeneration: true,
  typeId: "001"
  // targetId, themeId が不足
}

// ✅ 正常
{
  useStructuredGeneration: true,
  typeId: "001",
  targetId: "P001", 
  themeId: "T006"
}
```

### 🔧 デバッグ方法

#### 利用可能パターン確認
```typescript
import { PageStructureMatcher } from './app/services/knowledgeBase/PageStructureMatcher';

// 全パターン確認
const allPatterns = PageStructureMatcher.getAvailablePatterns();
console.log('利用可能パターン数:', allPatterns.length);

// TypeID別パターン確認
const type001Patterns = PageStructureMatcher.getPatternsForType("001");
console.log('001タイプのパターン:', type001Patterns.map(p => p.matchingKey));
```

---

## 🎨 カスタマイズ

### 新しい組み合わせの追加

#### 1. マッチングパターン追加
`app/services/knowledgeBase/data/pageStructureMatching.json`に追加:

```json
{
  "matchingKey": "001-P009-T022",
  "description": "共感型×新ペルソナ×新テーマ",
  "pageStructureId": "custom-pattern-4page",
  "reasoning": "新しい組み合わせの効果的理由"
}
```

#### 2. ページ構成定義追加
`app/services/knowledgeBase/data/pageStructures/custom-pattern-4page.json`を作成

---

## 📊 効果測定

### パフォーマンス指標
- **マッチング時間**: 通常 < 10ms
- **コンテンツ生成時間**: 通常 < 15秒
- **抽出項目数**: ページ構成により可変

### 品質指標
- **マッチング成功率**: 100%（存在する組み合わせ）
- **コンテンツ品質**: 厳密マッチングによる最適化
- **一貫性**: パターン定義による統一性

---

## 🆘 トラブルシューティング

### よくある問題と解決策

#### Q1: "統合システム処理失敗" エラー
**原因**: ページ構成ファイルの不足またはGemini APIエラー
**解決**: ログを確認し、該当ファイルの存在とAPI接続を確認

#### Q2: 生成されたコンテンツが期待と異なる
**原因**: 入力コンテンツが抽出ルールに適合していない
**解決**: より具体的で構造化された入力を提供

#### Q3: パフォーマンスが遅い
**原因**: ページ数が多いまたはコンテンツ量が大量
**対策**: 入力コンテンツを適切なサイズに調整

---

## 📞 サポート

### ログの確認
システム実行時のコンソールログを確認:
```
🎯 新統合システム開始: {typeId, targetId, themeId}
✅ ページ構造マッチング成功: [description]  
✅ テンプレート項目マッピング完了: [statistics]
🎉 新統合システム完了: [summary]
```

### システム状態の確認
```typescript
// 利用可能なパターン数確認
console.log('総パターン数:', PageStructureMatcher.getAvailablePatterns().length);

// 特定の組み合わせ確認
try {
  const pattern = PageStructureMatcher.findExactMatch("001", "P001", "T006");
  console.log('マッチング成功:', pattern.description);
} catch (error) {
  console.error('マッチング失敗:', error.message);
}
```