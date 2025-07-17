# 🗺️ システム全体概要（参照専用）

## 📊 データフロー全体

### 5つのフェーズ

```
1. リサーチフェーズ
   ├── ResearchFormatter.tsx
   ├── URLパラメータ変換
   └── LocalStorage保存

2. AI処理フェーズ
   ├── PageStructureAnalyzer.ts (テンプレート選択)
   ├── StructureConstrainedGenerator.ts (コンテンツ生成)
   └── ContentGeneratorService.ts (統合処理)

3. データ変換フェーズ
   ├── convertToTemplateData (型変換)
   ├── TemplateData統一形式
   └── 品質チェック

4. UI表示フェーズ
   ├── EditablePostGenerator.tsx
   ├── 16個のテンプレート
   └── 16個のエディタ

5. 画像生成フェーズ
   ├── html2canvas
   ├── 画像ダウンロード
   └── ZIP生成
```

## 🎯 重要な原則

### 100点ルール
- **structureScore = 1.0**: 完璧なマッチ → 適切なテンプレート存在
- **structureScore < 1.0**: 部分的マッチ → 専用テンプレート不足

### 蝶の羽ばたき効果
- **1行の修正がシステム全体に波及**
- **修正前に影響範囲を完全に把握**
- **段階的な修正アプローチを採用**

## 📋 現在の問題

### 根本原因
1. **PageStructureAnalyzer.tsのプロンプト設計問題**
2. **AI判定パターン**: `□記号 + 複数カテゴリ + まとめページ性質 → section-items`
3. **ジャンル特性が反映されない**

### 主要修正対象
- **app/services/pageStructureAnalyzer.ts** (76-134行)
- **app/lib/genre.ts** (ジャンル特性強化)
- **app/services/templateStructureDefinitions.ts** (テンプレート構造定義)

## 🔧 修正方向性

### 1. ジャンル特性の強制適用
```typescript
// 各ジャンルの推奨テンプレート設定
'strategy': {
  primaryTemplates: ['checklist-enhanced', 'simple5'],
  secondaryTemplates: ['item-n-title-content'],
  avoidTemplates: ['section-items']
}
```

### 2. section-items選択条件の厳格化
```typescript
// 厳格な選択条件
- 5つ以上の完全に独立した概念カテゴリ
- 「まとめ」「総括」「概要」の明示的キーワード
- 包括的な知識整理が主目的
```

### 3. 多様性確保メカニズム
```typescript
// 連続同一テンプレート回避
if (previousPageTemplate === candidateTemplate && 
    candidateTemplate === 'section-items') {
  return selectAlternativeTemplate()
}
```

## 🎯 各ジャンルの最適化方針

### strategy ジャンル
- **表現意図**: 実践的準備手順
- **推奨**: checklist-enhanced(60%) + simple5(30%) + item-n-title-content(10%)
- **避ける**: section-items

### career ジャンル
- **表現意図**: データに基づく客観的判断材料
- **推奨**: ranking(40%) + graph(30%) + table(30%)
- **特徴**: 統計データ重視

### interview ジャンル
- **表現意図**: 実践的面接対策
- **推奨**: checklist-enhanced(50%) + simple5(30%) + two-column-section-items(20%)
- **特徴**: 準備・手順重視

### skill ジャンル
- **表現意図**: 段階的スキル習得
- **推奨**: simple5(40%) + item-n-title-content(35%) + enumeration(25%)
- **特徴**: プロセス重視

### internship ジャンル
- **表現意図**: 機会活用促進
- **推奨**: table(40%) + ranking(30%) + list(30%)
- **特徴**: 情報整理重視

---

**⚠️ 注意**: このファイルは参照専用です。実装時は必ず最新の技術仕様を確認してください。