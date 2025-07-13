# 📚 ドキュメントインデックス - Instagram Post Generator

## 🎯 新規参入Claude Code用ナビゲーション

**最終更新**: 2025-07-13  
**目的**: プロジェクトの全体像把握とタスク理解のための包括的ドキュメントガイド

---

## 🔥 **最優先読了ドキュメント（必読）**

### 1. **CLAUDE.md** 
🏠 **プロジェクトのホーム** - 必ず最初に読む
- プロジェクト概要・技術スタック
- **100点ルール設計思想**（重要）
- 開発ルール・テンプレートマッチング基本思想

### 2. **NOTES.md**
📋 **現在の開発状況** - リアルタイム情報
- 最新の開発進捗
- 重要な連絡事項・注意点

### 3. **HANDOVER_CONTENT_GENERATION_INVESTIGATION.md**
🔄 **現在のメインタスク** - 最新の引き継ぎ
- コンテンツ生成ロジック調査指示
- 237ページテスト結果サマリー
- 次に実施すべき調査内容

---

## 🎯 **タスク理解用ドキュメント**

### **完了済み分析結果**

#### **MISSING_TEMPLATES_COMPREHENSIVE.md**
📊 **不足テンプレート決定版** - 作成すべきテンプレート一覧
- **6種類の確定不足テンプレート**（Critical 3 + High Priority 3）
- 理論的不足テンプレートは実際には不要と判明
- 完全100点化への道筋

#### **TEMPLATE_ANALYSIS.md** 
📈 **実テスト結果詳細** - 237ページの分析結果
- 全テストファイル（input/0-12.txt）の結果
- 100点未満パターンの具体例
- JSON構造と問題発生箇所

#### **TEST_METHODOLOGY.md**
🧪 **テスト実施方法** - テストの基本手順
- 個別ファイルテストコマンド
- 結果記録方法
- 100点ルール検証手順

---

## 🔧 **実装・理解用ドキュメント**

### **システム要件・設計**

#### **REQUIREMENTS.md**
📋 **要件定義書** - システム全体の要求仕様

#### **ISSUES.md** 
🚨 **既知の問題** - 解決待ちタスクリスト

### **過去の実装ガイド**

#### **TEMPLATE_CREATION_GUIDE.md**
🔨 **テンプレート作成方法** - 新テンプレート実装手順

#### **HANDOVER_CRITICAL_PRIORITY_TEMPLATE_IMPLEMENTATION.md**
⚡ **Critical優先度テンプレート実装** - 以前の引き継ぎ

---

## 📂 **重要なコードファイル構造**

### **コアサービス** 
```
app/services/
├── intelligentContentProcessor.ts    # 🔍 調査対象 - Geminiプロンプト
├── contentLayoutService.ts          # 🔍 調査対象 - コンテンツ生成
├── templateMatchingService.ts       # テンプレートマッチング
├── pureStructureMatchingService.ts  # 構造スコア計算
└── geminiService.ts                 # Gemini API
```

### **テンプレート**
```
app/components/templates/
├── TitleDescriptionOnlyTemplate.tsx      # ✅ 既実装
├── ChecklistEnhancedTemplate.tsx         # ✅ 既実装  
├── SingleSectionNoItemsTemplate.tsx      # ✅ 既実装
├── SectionItemsTemplate.tsx              # 参考用
├── SimpleThreeTemplate.tsx               # 参考用
└── TemplateRegistry.ts                   # 登録管理
```

### **テストファイル**
```
input/          # テスト用入力ファイル（0-12.txt）
test-results/   # テスト結果JSON
test-direct.ts  # 個別ファイルテスト実行
```

---

## 🗂️ **アーカイブ・参考ドキュメント**

### **archive/ フォルダ**
- 過去のHANDOVERファイル
- 旧設計ドキュメント
- 過去の分析結果
**注意**: 基本的に読む必要なし（現在は無効）

### **その他**
- **README.md**: 一般的なプロジェクト説明
- **ui/**: 生成された画像ファイル
- **pages/**: Next.js API

---

## 🎯 **タスク別推奨読書順序**

### **コンテンツ生成調査タスク（現在メイン）**

1. **CLAUDE.md** → プロジェクト理解
2. **HANDOVER_CONTENT_GENERATION_INVESTIGATION.md** → タスク詳細
3. **MISSING_TEMPLATES_COMPREHENSIVE.md** → 不足テンプレート理解
4. **TEMPLATE_ANALYSIS.md** → 問題箇所確認
5. **app/services/intelligentContentProcessor.ts** → コード調査開始

### **テンプレート実装タスク**

1. **MISSING_TEMPLATES_COMPREHENSIVE.md** → 作成対象確認
2. **TEMPLATE_CREATION_GUIDE.md** → 実装方法
3. **app/components/templates/** → 既存テンプレート参考
4. **app/services/templateMatchingService.ts** → マッチング条件

### **問題調査・デバッグタスク**

1. **ISSUES.md** → 既知問題確認
2. **TEMPLATE_ANALYSIS.md** → 具体的問題箇所
3. **TEST_METHODOLOGY.md** → テスト方法
4. **test-direct.ts** → 実際のテスト実行

---

## 🚨 **重要な注意事項**

### **100点ルール設計思想**
- **「100点じゃないものは全てテンプレートが存在しない」**
- 妥協的なマッチング完全排除
- 新しい構造には専用テンプレート作成

### **現在の状況**
- **テスト完了**: 237ページ分析済み
- **100点率**: 75.9% (180/237ページ)
- **確定不足テンプレート**: 6種類
- **次のタスク**: コンテンツ生成ロジック調査

### **迷子防止**
- わからないことがあったら **CLAUDE.md** に戻る
- 最新情報は **NOTES.md** で確認
- 具体的なタスクは **HANDOVER_*.md** で確認

---

**📍 現在地**: テンプレート不足問題の解決策検討段階  
**🎯 次の目標**: コンテンツ生成ロジックの詳細調査による根本解決  
**💡 最終目標**: 100点ルール完全達成（100%の完璧なテンプレートマッチング）