# 📋 ナレッジベース分析手順書・指示書

**作成日**: 2025-07-21  
**分析実行者**: Claude  
**分析対象**: 12投稿（TypeID=001～004 各4投稿）  
**目的**: 同じ深度と解像度でのニーズ・解決策分析手順の完全記録

---

## 🎯 分析の全体概要

### 実行された分析
- **分析範囲**: 100投稿中から選定された12投稿の深度ニーズ分析
- **分析深度**: 共有されたナレッジフォーマットデザインと同等レベル
- **分析目標**: 「どのようなニーズを解決しているか」「どのような解決方法を提供しているか」の完全把握
- **最終成果**: ナレッジベースシステム実装準備完了

---

## 📚 参照・活用したドキュメント一覧

### 1. 基盤ドキュメント（必読・理解必須）

#### **プロジェクト理解の基盤**
```
/CLAUDE.md - Claude開発ガイド
/NOTES.md - 開発ナレッジベース
```
**用途**: システム全体理解、重要な設計思想の把握

#### **現状把握の必須文書**
```
/docs/knowledge-based-system/HANDOVER.md - 引き継ぎドキュメント
/docs/knowledge-based-system/SYSTEM_REQUIREMENTS_EVOLUTION.md - 思考プロセス要件定義
/docs/knowledge-based-system/COMPREHENSIVE_SYSTEM_HYPOTHESIS.md - 包括的システム仮説
/docs/knowledge-based-system/KNOWLEDGE_BASE_SYSTEM_DESIGN.md - ナレッジベースシステム設計
/docs/knowledge-based-system/NEEDS_RESEARCH_PLAN.md - ニーズ調査計画書
```
**用途**: 開発背景理解、設計思想把握、分析方針決定

#### **フォーマット設計の基準文書**
```
/docs/knowledge-based-system/KNOWLEDGE_FORMAT_DESIGN_V1.md - ナレッジフォーマット設計v1.0
```
**用途**: 分析深度・解像度の基準、JSONフォーマット構造の参考

### 2. 個別投稿分析用ドキュメント

#### **Contents分析ファイル（各投稿につき4ファイルセット）**
```
/docs/content-analysis/results/content-analysis/contents-XXX-content.md
/docs/content-analysis/results/page-structure/contents-XXX-structure.md  
/docs/content-analysis/results/beneficial-value/contents-XXX-value.md
/docs/content-analysis/results/persona-target/contents-XXX-persona.md
```
**用途**: 各投稿の詳細内容、構造、価値、ターゲット分析

#### **投稿分析データ**
```
提供された投稿リスト（Contents ID、TypeID、感情:論理比率、価値要素、判定スコア、信頼度）
```
**用途**: 分析対象選定、基本データ確認

---

## 🔍 実行した分析手順（完全版）

### Phase 1: 事前準備・理解フェーズ

#### Step 1.1: プロジェクト全体理解
1. **HANDOVER.md読み込み**
   - 現在の開発状況把握
   - 重要な問題発見内容理解
   - 新システム設計思想の把握

2. **NOTES.md読み込み**
   - 開発段階横断のナレッジ確認
   - システムフロー理解
   - テンプレート選択メカニズムの真実把握

3. **基盤設計文書群の読み込み**
   - システム要件定義の思考プロセス理解
   - パターンベース仮説の把握
   - 7ステップ包括アプローチの理解

#### Step 1.2: 分析基準・フォーマット理解
1. **KNOWLEDGE_FORMAT_DESIGN_V1.md詳細分析**
   - 4つの投稿タイプ実証分析の確認
   - JSONフォーマット構造の理解
   - 価値要素組み合わせパターンの把握
   - 感情:論理比率実現方法の理解

2. **分析深度・解像度の基準設定**
   - Contents/2（女性キャリア不安）レベルの深度確認
   - needs_definition、persona_profile、solution_approachの詳細度確認
   - trigger_moments、psychological_needsの具体性レベル確認

### Phase 2: 投稿選定・分析実行フェーズ

#### Step 2.1: 分析対象投稿の戦略的選定
**選定基準**:
1. 各TypeID（001～004）から4投稿ずつ
2. 高信頼度投稿を優先的に選定
3. 感情:論理比率の多様性確保
4. 価値要素の組み合わせパターン多様性確保

**選定結果**:
- **TypeID=001**: contents-001, contents-008, contents-024, contents-027
- **TypeID=002**: contents-002, contents-004, contents-010, contents-023  
- **TypeID=003**: contents-003, contents-021, contents-022, contents-026
- **TypeID=004**: contents-005, contents-006, contents-007, contents-009

#### Step 2.2: 投稿別深度分析の実行

**各投稿の分析手順**:
1. **Task Tool活用による詳細分析**
   - 投稿内容ファイルパス検索・読み込み
   - 4つのファイルセット（content, structure, value, persona）の横断分析
   - 基本データ（感情:論理比率、価値要素、信頼度）との照合

2. **ニーズ定義の深度分析**
   ```
   - primary_need: 主要ニーズの特定
   - urgency_level: 緊急度レベル判定
   - emotional_state: 感情状態の詳細分析
   - trigger_moments: きっかけとなる瞬間の具体化
   ```

3. **ペルソナプロファイルの詳細化**
   ```
   - target: ターゲット層の詳細特定
   - solution_style: 解決スタイルの分析
   - psychological_needs: 心理的ニーズの特定
   ```

4. **解決アプローチの構造分析**
   ```
   - emotion_logic_ratio: 感情:論理比率の実測・効果分析
   - structure: 解決提供構造の詳細解明
   - why_effective: 効果的である理由の根拠分析
   - unique_value: 独自価値・差別化要素の特定
   ```

#### Step 2.3: TypeID内比較・横断分析
**各TypeID内での4投稿比較**:
1. 感情:論理比率の幅とその意味分析
2. 価値要素組み合わせパターンの違いと効果
3. 信頼度差異の要因分析
4. ペルソナ対応の多様性確認

**TypeID間での横断比較**:
1. 根本的なニーズ構造の違い特定
2. 解決アプローチの本質的差異分析
3. 適用可能性と限界の明確化

### Phase 3: 結果統合・フォーマット化フェーズ

#### Step 3.1: ナレッジフォーマット形式での保存
1. **KNOWLEDGE_DATABASE_001_COMPLETE.json作成**
   - 12投稿の分析結果をJSONフォーマットで完全記録
   - TypeID別構造化
   - 横断分析インサイトの統合

2. **フォーマット準拠性確保**
   - KNOWLEDGE_FORMAT_DESIGN_V1.mdとの一貫性確認
   - 深度・解像度の同等性保証
   - 実装準備完了状態の確認

#### Step 3.2: 実用的リスト作成
1. **NEEDS_SOLUTION_MAPPING_LIST.md作成**
   - ニーズと解決策の対応表形式
   - 具体的解決手順の明記
   - パターン分析サマリー付与

---

## 📊 分析品質保証の仕組み

### 1. 一貫性保証メカニズム
- **基準文書準拠**: KNOWLEDGE_FORMAT_DESIGN_V1.mdの深度・解像度に完全準拠
- **比較検証**: 実証済み分析（Contents/2, Contents/4等）との品質比較
- **構造統一**: 全投稿で同一分析項目・深度での分析実行

### 2. 正確性検証プロセス
- **複数ファイル照合**: content, structure, value, personaファイルの横断確認
- **データ整合性確認**: 提供データとファイル内容の一致性検証
- **論理的一貫性検査**: 感情:論理比率と実際の内容構成の整合性確認

### 3. 完全性担保システム
- **網羅性確認**: TypeID×4投稿の12投稿完全分析
- **深度統一**: 全分析項目での同等レベル深度確保
- **実装準備**: ナレッジベースシステム構築に即活用可能な形式

---

## 🔧 分析ツール・手法の活用

### 使用したClaude機能
1. **Task Tool**: 個別投稿の詳細分析実行
2. **Read Tool**: ドキュメントファイルの読み込み・理解
3. **Write Tool**: 分析結果のフォーマット化・保存
4. **TodoWrite Tool**: 分析進捗の管理・追跡

### 分析アプローチ手法
1. **段階的深度分析**: 概要→詳細→比較→統合の4段階
2. **横断的比較分析**: TypeID内比較→TypeID間比較の二重構造
3. **実証的検証**: 既存分析結果との比較による品質確保
4. **構造化記録**: JSONフォーマットによる再利用可能な形式化

---

## 📋 今後の分析実行指示（再現手順）

### 前提条件
1. **必読文書の完全理解**
   - HANDOVER.md, NOTES.md等の基盤文書の内容把握
   - KNOWLEDGE_FORMAT_DESIGN_V1.mdの深度・解像度基準理解

2. **分析対象の明確化**
   - 投稿リストから戦略的選定（高信頼度、多様性考慮）
   - 各投稿の4ファイルセットの存在確認

### 分析実行ステップ
1. **個別投稿分析** (各投稿につき実行)
   ```
   Task Tool使用:
   "contents-XXXの投稿内容を読み込み、TypeID=XXXの深度ニーズを分析してください。
   
   重要な分析ポイント：
   1. 感情:論理比率XX:XXの特徴と効果
   2. 価値要素「XXX/XXX/XXX」の組み合わせ効果  
   3. 信頼度X.X/4.0の理由分析
   4. 他投稿との比較・差異化要因
   
   contents-XXXのファイルパスを探してから分析を行ってください。"
   ```

2. **比較分析の実行** (TypeID単位で実行)
   ```
   同一TypeID内での4投稿比較:
   - 感情:論理比率の幅と戦略的意味
   - 価値要素組み合わせの違いと効果
   - 信頼度差異の根本要因
   - ペルソナ適応の多様性
   ```

3. **結果の構造化保存**
   ```
   JSONフォーマットでの保存:
   - needs_definition (primary_need, urgency_level, emotional_state, trigger_moments)
   - persona_profile (target, solution_style, psychological_needs)  
   - solution_approach (emotion_logic_ratio, structure, why_effective, unique_value)
   ```

### 品質確保の必須チェック
- [ ] KNOWLEDGE_FORMAT_DESIGN_V1.mdと同等の深度・解像度
- [ ] 全12投稿で統一された分析項目・深度
- [ ] trigger_moments、psychological_needsの具体化
- [ ] solution_approachの構造的理解と効果根拠
- [ ] TypeID別・横断的比較分析の完了

---

## ✅ 成果物・達成結果

### 作成された成果物
1. **KNOWLEDGE_DATABASE_001_COMPLETE.json** - 12投稿の完全ナレッジフォーマット化
2. **NEEDS_SOLUTION_MAPPING_LIST.md** - ニーズ・解決策対応表
3. **ANALYSIS_METHODOLOGY_GUIDE.md** - 本分析手順書（このファイル）

### 達成された分析品質
- **深度統一性**: 全投稿でKNOWLEDGE_FORMAT_DESIGN_V1.mdと同等レベル
- **構造的理解**: 感情:論理比率の戦略的意味と実現方法の完全把握
- **実装準備**: ナレッジベースシステム構築に即活用可能な状態
- **再現可能性**: この手順書により同等品質の分析を再現可能

### 重要な発見・インサイト
1. **感情:論理比率の戦略的幅広さ**: 各TypeIDが柔軟な比率調整により多様なニーズに対応
2. **価値要素の組み合わせパターン**: 基本3要素から最大6要素までの戦略的構成
3. **ペルソナ適応性**: 同一TypeID内でも複数ペルソナへの柔軟対応可能
4. **実用化準備完了**: 12パターンのナレッジベースによるシステム構築基盤確立

---

**このドキュメントにより、同等品質のナレッジベース分析を誰でも再現可能な状態が確保されました。**