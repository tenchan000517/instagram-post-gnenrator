# JSON解析の安定性問題

## 📋 問題概要
AIが生成するJSONレスポンスの解析において、完全な安定性が確保されていない状況

## 🚨 発生した問題
- **JSONパースエラー**: `Expected double-quoted property name in JSON at position 2335`
- **不完全なJSON**: AIが生成するJSONに構文エラーが含まれる場合がある
- **制御文字混入**: 予期しない文字がJSONに含まれる

## 🔧 現在の対策
### 実装済み対策 (コミット: 70eb6a4)
1. **堅牢なJSON解析処理**
   - 制御文字除去: `[\x00-\x1F\x7F-\x9F]`
   - 末尾カンマ除去: `,\s*}}`, `,\s*]`
   - 引用符エスケープ処理
   - スマートクォート変換

2. **共通メソッド化**
   - `parseGeneratedJSON()` メソッドを作成
   - 一括生成と個別生成で同じ処理を使用

3. **フォールバック処理**
   - JSON解析失敗時の個別生成への自動切り替え

## ⚠️ 残存リスク
1. **複雑なJSON構造**: 深いネストや特殊文字が含まれる場合
2. **AIの不安定性**: モデルの更新により新しいエラーパターンが発生する可能性
3. **パフォーマンス**: 複数回の解析試行によるレスポンス遅延

## 🔍 監視すべき箇所
- `app/services/structureConstrainedGenerator.ts:72` - 一括生成のJSON解析
- `app/services/structureConstrainedGenerator.ts:221` - 個別生成のJSON解析
- `app/services/contentGeneratorService.ts:513` - 再生成時のJSON解析
- `app/services/pageStructureAnalyzer.ts:141` - ページ構造分析のJSON解析

## 📈 改善提案
1. **より堅牢なJSON修正ロジック**
   - 正規表現の改良
   - エラーパターンの追加学習

2. **エラーログの改善**
   - 失敗したJSONの詳細保存
   - エラーパターン分析

3. **テスト強化**
   - 不正なJSONのテストケース追加
   - 境界値テストの実施

## 🎯 対処方針
- **短期**: 現在の対策で様子見（エラー発生時に追加対応）
- **中期**: エラーパターンの分析と修正ロジックの改良
- **長期**: AI生成プロンプトの改良によるJSON品質向上

## 📝 関連ファイル
- `app/services/structureConstrainedGenerator.ts` - メイン処理
- `app/services/contentGeneratorService.ts` - 再生成処理
- `app/services/pageStructureAnalyzer.ts` - 構造分析
- `app/services/geminiService.ts` - Gemini API処理

---
**作成日**: 2025-07-16
**最終更新**: 2025-07-16
**ステータス**: 監視中
**優先度**: 中