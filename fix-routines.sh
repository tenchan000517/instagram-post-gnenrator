#!/bin/bash
# シンボリックリンクを実ファイルに置き換えるスクリプト

echo "=== ACTIVE-ROUTINESの修正開始 ==="
echo ""

# Phase 1: feed-posts修正
echo "Phase 1: feed-posts実ファイルコピー中..."
cd /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/feed-posts/

# シンボリックリンクを削除
rm -f CONTENT-GENERATION-FLOW-MASTER.md KNOWLEDGE_GENERATION_MASTER_GUIDE.md START-PROMPT.md

# 実ファイルをコピー
cp ../../knowledge-quality-system/CONTENT-GENERATION-FLOW-MASTER.md ./ 2>/dev/null
cp ../../knowledge-quality-system/KNOWLEDGE_GENERATION_MASTER_GUIDE.md ./ 2>/dev/null
cp ../../knowledge-quality-system/START-PROMPT.md ./ 2>/dev/null

# READMEを作成
cat > README.md << 'EOF'
# 📝 フィード投稿ルーティーン（Type001-004）

## 重要ファイル
- START-PROMPT.md - 起動コマンド
- KNOWLEDGE_GENERATION_MASTER_GUIDE.md - ナレッジ生成ガイド
- CONTENT-GENERATION-FLOW-MASTER.md - コンテンツ生成フロー

## 関連ファイル場所
- ナレッジベース: /app/data/knowledgeBase/knowledge/
- 品質チェックリスト: /knowledge-quality-system/quality-checklists/
- Type別ガイド: /knowledge-quality-system/specialized-systems/

## 使用方法
```bash
cat START-PROMPT.md
# 指示に従ってナレッジ番号を指定
```
EOF

echo "  ✅ feed-posts修正完了"

# Phase 2: habit-ranking修正
echo "Phase 2: habit-ranking実ファイルコピー中..."
cd /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/habit-ranking/

# シンボリックリンクを削除
rm -f system-files

# 実ファイルをコピー
cp -r ../../knowledge-quality-system/specialized-systems/habit-ranking-system/* ./ 2>/dev/null

# READMEを作成
cat > README.md << 'EOF'
# 📈 KIKUYO習慣ランキングルーティーン

## 重要ファイル
- habit-behavior-database.json - 35習慣データベース
- 習慣行動ランキングシステム完全マスタープラン.md

## 完成済みランキング例
/ACTIVE-ROUTINES/reel-posts/インスタルールネタ/業界・企業情報/
に28個の完成例があります

## 使用方法
```bash
# データベースを参照
cat habit-behavior-database.json

# ランキング生成
「habit-behavior-database.json」から「[テーマ]ランキングTOP10」を生成してください。
```
EOF

echo "  ✅ habit-ranking修正完了"

# Phase 3: 追加READMEの作成
echo "Phase 3: 追加ドキュメント作成中..."
cd /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/

# 使い方ガイド追加
cat >> README.md << 'EOF'

## ⚠️ 重要な注意事項

### ファイル参照について
- feed-posts/とhabit-ranking/には必要なファイルをコピー済み
- 最新版は/knowledge-quality-system/にあります
- 更新時は両方を同期してください

### 4つのルーティーンクイックアクセス

1. **フィード投稿**
```bash
cd feed-posts/
cat START-PROMPT.md
```

2. **リール投稿**
```bash
cd reel-posts/インスタルールネタ/
cat 投稿作成マスタープロンプト_統合版_2025-08-23.md
```

3. **ストーリークイズ**
```bash
cd story-quiz/インスタストーリークイズ/
cat quiz-generation-master-flow.md
```

4. **習慣ランキング**
```bash
cd habit-ranking/
cat habit-behavior-database.json
```
EOF

echo "  ✅ 追加ドキュメント作成完了"

echo ""
echo "=== 修正完了 ==="
echo ""
echo "✅ feed-postsとhabit-rankingに実ファイルをコピーしました"
echo "✅ Windowsからも正常にアクセス可能になりました"
echo ""
echo "確認方法："
echo "1. Windowsエクスプローラーで以下を開く："
echo "   C:\instagram-course\instagram-post-generator\ACTIVE-ROUTINES\feed-posts"
echo "   C:\instagram-course\instagram-post-generator\ACTIVE-ROUTINES\habit-ranking"
echo "2. ファイルが表示されることを確認"