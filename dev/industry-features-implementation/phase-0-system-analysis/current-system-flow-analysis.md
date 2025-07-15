# 現在のシステム生成フロー完全理解

## 🔍 実際の生成フロー分析

### **Step 1: コンテンツ入力**
- **コンポーネント**: `ContentInput`
- **役割**: ユーザーからの入力受付
- **出力**: 文字列コンテンツ

### **Step 2: AI生成処理**
- **サービス**: `contentGeneratorService.generateHighQualityContent(content)`
- **入力**: 文字列コンテンツ
- **出力**: `GeneratedContent`型オブジェクト

### **Step 3: 承認・確認**
- **コンポーネント**: `ContentApprovalComponent`
- **役割**: 生成されたコンテンツの確認・承認

### **Step 4: 編集・調整**
- **コンポーネント**: `EditablePostGenerator`
- **役割**: 最終調整とテンプレート表示

## 🔧 分析すべき重要ファイル

### **1. contentGeneratorService**
- ファイル: `/app/services/contentGeneratorService.ts`
- 役割: 実際のAI生成を担当
- **最重要**: どのAIインスタンスを使用しているか？

### **2. ContentInput**
- ファイル: `/app/components/ContentInput.tsx`
- 役割: 入力処理（LocalStorageサポート含む）

### **3. 生成されるデータ構造**
- 型定義: `GeneratedContent`
- どのような構造でコンテンツが生成されるか？

### **4. テンプレート選択ロジック**
- どこでテンプレートが選択されるか？
- 業種特徴系はどう判定されるか？

## 🎯 理解すべきポイント

### **A. AIインスタンスの特定**
- 使用しているAIサービス（Gemini？OpenAI？）
- API呼び出し方法
- プロンプト構造

### **B. データ構造の理解**
- `GeneratedContent`の詳細構造
- ページ構成の仕組み
- テンプレート選択の仕組み

### **C. ジャンル判定の仕組み**
- どこでジャンルが判定されるか？
- 業種特徴系の判定条件
- テンプレート選択への影響

## 📋 分析手順

1. **contentGeneratorService詳細分析**
2. **GeneratedContent型定義確認**
3. **実際の生成プロセス追跡**
4. **テンプレート選択ロジック確認**
5. **業種特徴系の現在の動作確認**

---

作成日: 2025年1月15日
目的: 現在システムの完全理解による共通認識構築