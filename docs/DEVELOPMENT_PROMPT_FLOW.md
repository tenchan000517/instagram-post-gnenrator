# 🚀 Template System Implementation - Sequential Prompt Flow

**目標:** K008エラー解決 + 全テンプレートシステム完成  
**実行方法:** 以下のプロンプトを順番に実行して完全実装を達成

---

## 📋 **Phase 1: K008優先実装 (Critical)**

### **PROMPT 1: K008対応テンプレート作成**
```
K008のpageStructurePatternに設定する「problem-solution-carousel-9page」テンプレートを作成してください。

要件:
- ファイル名: /app/services/knowledgeBase/data/pageStructures/problem-solution-carousel-9page.json
- 9ページ構成: Title Cover → Problem Intro → Problem Lists (3x) → Authority → Solution → Service → CTA  
- 各ページに適切なtemplateId, role, itemAssignments設定
- contents-008の構造に最適化された設定

参考:
- docs/template-structure-analysis-complete.json のA1パターン
- 既存の empathy-strategic-solution-5page.json の構造
- K008.json の実際のコンテンツ構造

完成後、PageStructureMatcher.tsに新テンプレートのインポートと登録も追加してください。
```

### **PROMPT 2: K008 pageStructurePattern設定**
```
K008.json の pageStructurePattern フィールドを更新してください。

変更内容:
- 現在: "pageStructurePattern": ""
- 変更後: "pageStructurePattern": "problem-solution-carousel-9page"

ファイル: /app/data/knowledgeBase/knowledge/K008.json
```

### **PROMPT 3: K008エラー解決テスト**
```
K008のエラーが解決されたかテストしてください。

確認項目:
1. PageStructureMatcher.loadPageStructure("problem-solution-carousel-9page") が正常動作
2. generateStructuredContent でエラーが発生しないこと
3. K008選択時に適切なテンプレート構造が読み込まれること

テスト方法:
- ブラウザでK008を選択してコンテンツ生成を実行
- エラーログの確認
- 生成されたページ構造の確認
```

---

## 🏗️ **Phase 2: 主要テンプレート実装 (High Priority)**

### **PROMPT 4: 主要3テンプレート作成**
```
残りの主要テンプレートを作成してください。

作成対象:
1. problem-solution-bridge-10page.json (A2パターン - 10ページ構成)
2. instructional-sequence-6page.json (B1パターン - 6ページ構成)  
3. procedure-summary-3page.json (D1パターン - 3ページ構成)

各テンプレートの要件:
- docs/template-structure-analysis-complete.json の該当パターン参照
- 適切なページ構造とitemAssignments設定
- 既存テンプレートとの一貫性保持

完成後、PageStructureMatcher.tsにインポートと登録を追加してください。
```

### **PROMPT 5: PageStructureMatcher統合テスト**
```
新しく作成した4つのテンプレートがPageStructureMatcherで正常に読み込まれるかテストしてください。

テスト対象:
- problem-solution-carousel-9page
- problem-solution-bridge-10page
- instructional-sequence-6page
- procedure-summary-3page

確認項目:
1. PageStructureMatcher.loadPageStructure() で各テンプレートが読み込める
2. エラーが発生しない
3. 返される構造が期待通り

問題があれば修正してください。
```

---

## 🧩 **Phase 3: 全テンプレート完成 (Medium Priority)**

### **PROMPT 6: 残り5テンプレート作成**
```
残りの5つのテンプレートを作成してください。

作成対象:
1. deep-dive-analysis-11page.json (B2パターン)
2. company-benefits-carousel-11page.json (C1パターン)
3. question-bank-6page.json (D2パターン)
4. anxiety-relief-content-8page.json (E1パターン)
5. universal-fallback-template.json (エッジケース対応)

要件:
- docs/template-structure-analysis-complete.json の仕様に従う
- 各パターンの特徴を適切に反映
- universal-fallback-templateは汎用的な構造で作成

完成後、PageStructureMatcher.tsの更新も行ってください。
```

### **PROMPT 7: 全テンプレート統合確認**
```
9つの全テンプレートがシステムに正しく統合されているか確認してください。

確認対象テンプレート:
1. problem-solution-carousel-9page
2. problem-solution-bridge-10page
3. instructional-sequence-6page
4. procedure-summary-3page
5. deep-dive-analysis-11page
6. company-benefits-carousel-11page
7. question-bank-6page
8. anxiety-relief-content-8page
9. universal-fallback-template

確認項目:
- PageStructureMatcher.tsに全て登録済み
- loadPageStructure()で全て読み込み可能
- JSON構造に不備がない
- 一貫性のあるテンプレート設計

問題があれば修正してください。
```

---

## 📊 **Phase 4: ナレッジベース完全統合**

### **PROMPT 8: ナレッジファイル分析とマッピング**
```
全104個のナレッジファイルを分析し、適切なテンプレートパターンをマッピングしてください。

実行内容:
1. 各ナレッジファイルの構造分析
2. raw-analysis結果との照合
3. 最適なテンプレートパターンの決定
4. マッピング表の作成

出力:
- knowledge-template-mapping.json ファイル
- マッピング根拠の説明
- 特殊ケースの識別

フォーマット:
{
  "K001": "problem-solution-carousel-9page",
  "K002": "instructional-sequence-6page",
  ...
}
```

### **PROMPT 9: ナレッジファイル一括更新**
```
前のプロンプトで作成したマッピング表を使用して、全104個のナレッジファイルのpageStructurePatternを更新してください。

実行内容:
1. knowledge-template-mapping.json の読み込み
2. 各ナレッジファイルのpageStructurePattern更新
3. バックアップファイルの作成（更新前）
4. 更新完了の確認

安全のため:
- 一度に10ファイルずつ更新
- 各バッチ後に動作確認
- エラー時は即座に報告

完了後、更新結果サマリーを提供してください。
```

---

## ✅ **Phase 5: 品質保証・最終テスト**

### **PROMPT 10: 全システム統合テスト**
```
テンプレートシステム全体の統合テストを実行してください。

テスト項目:
1. 全104ナレッジファイルでエラーが発生しないこと
2. 各テンプレートが適切に読み込まれること
3. ページ構造が正しく生成されること
4. K008を含む代表的なナレッジでの動作確認

テスト方法:
- 各テンプレートパターンから1-2個のナレッジを選択
- ブラウザでの実際のコンテンツ生成テスト
- エラーログの確認
- パフォーマンス測定（目標<100ms）

結果をレポート形式で提供してください。
```

### **PROMPT 11: パフォーマンス最適化**
```
テンプレートシステムのパフォーマンスを最適化してください。

最適化項目:
1. テンプレート読み込みの高速化
2. メモリ使用量の最適化
3. エラーハンドリングの改善
4. キャッシュ機能の実装（必要に応じて）

目標:
- テンプレートマッチング時間 <50ms
- メモリ使用量最小化
- エラー率 0%
- 拡張性の確保

実装後、パフォーマンステストを実行し結果を報告してください。
```

### **PROMPT 12: 最終品質確認**
```
テンプレートシステム実装の最終品質確認を行ってください。

確認項目:
✅ 全104ナレッジファイルが有効なpageStructurePattern保持
✅ 9つのテンプレートが全て正常動作
✅ K008エラーが完全解決
✅ PageStructureMatcherが全パターン対応
✅ エラー率0%達成
✅ パフォーマンス目標達成
✅ ドキュメントとの整合性確認

成功指標の達成状況をレポートし、未完了項目があれば修正方針を提示してください。

完了時に実装サマリーレポートを作成してください。
```

---

## 🎯 **プロンプト実行ガイドライン**

### **実行ルール**
1. **順番を守る:** 必ず上から順番に実行
2. **完了確認:** 各プロンプト完了後、次に進む前に動作確認
3. **エラー対応:** エラー発生時は即座に修正してから次へ
4. **テスト重視:** 特にPhase 1完了後は必ず動作テスト実行

### **チェックポイント**
- **Phase 1完了後:** K008エラー解決確認必須
- **Phase 2完了後:** 主要テンプレート動作確認
- **Phase 4完了後:** 全ナレッジファイル更新確認  
- **Phase 5完了後:** 最終品質目標達成確認

### **想定時間**
- **Phase 1:** 2-3時間（K008優先解決）
- **Phase 2:** 2-3時間（主要テンプレート）
- **Phase 3:** 1-2時間（残りテンプレート）
- **Phase 4:** 2-3時間（全ナレッジ統合）
- **Phase 5:** 1-2時間（品質保証）

**総実装時間: 8-13時間**

---

**このプロンプトフローを順次実行することで、K008エラー解決から全104ナレッジファイルの完全なテンプレート統合まで、確実に実装完了できます。**