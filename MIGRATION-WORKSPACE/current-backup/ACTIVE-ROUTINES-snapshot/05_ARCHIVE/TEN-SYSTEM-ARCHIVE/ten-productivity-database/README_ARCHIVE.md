# ten-productivity-database アーカイブ

**アーカイブ日時**: 2025-09-01  
**移動理由**: TENランキングシステム整理完了に伴うクリーンアップ  

---

## 📁 このディレクトリについて

このディレクトリは、TENランキングシステム開発初期の作業環境でした。
現在は本番環境（`/app/data/aiToolsDatabase/`）に統合済みのため、アーカイブとして保管。

---

## 🔍 重要ファイル

### **GOD_TOOLS_MASTER_LIST.md（重要）**
- **元の場所**: `tools/GOD_TOOLS_MASTER_LIST.md`
- **新しい場所**: `/ACTIVE-ROUTINES/04_REFERENCE/TEN-DATABASE-REFERENCE/GOD_TOOLS_MASTER_LIST.md`
- **重要性**: ランキング品質の判断基準となる神ツール92選のマスターリスト
- **用途**: 新ジャンル構築時の品質チェック基準

### **その他の重要資料**
- `TEN_DATABASE_構築共有ドキュメント.md`: 開発プロセスの記録
- `TEN_MASTER_PLAN.md`: 初期計画書
- `README.md`: システム概要
- `certificates/`: 資格関連の調査資料
- `gadgets/`: ガジェット関連の調査資料

---

## 🔄 品質管理スクリプト（完了済み）

開発過程で使用された品質管理スクリプト群：
- `batchQualityChecker.js`: バッチ品質検証
- `cleanDuplicateTools.js`: 重複削除
- `correctFormatConverter.js`: フォーマット統一
- `createCategoryWeightedRankings.js`: カテゴリ重要度補正

これらのスクリプトは本番環境でも利用されています。

---

## 📊 開発履歴

1. **初期構想**: ten-productivity-database として開発開始
2. **AIツール実装**: 9バッチ体制でのリサーチ実行
3. **品質改善**: 統合・補正・ランキング生成
4. **本番移行**: app/data/aiToolsDatabase/ へ統合
5. **アーカイブ**: 開発履歴保管のため本ディレクトリへ移動

---

## 💡 活用価値

### **参考資料として**
- 新ジャンル構築時の参考プロセス
- 品質管理手法の事例
- トラブルシューティングの履歴

### **復元可能性**
- 必要に応じて本番環境への復元が可能
- 開発プロセスの再現・検証が可能

---

**本アーカイブにより、TENランキングシステムの開発履歴を完全保管し、今後の拡張・改善に活用可能**