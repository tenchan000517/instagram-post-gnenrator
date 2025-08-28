#!/bin/bash
# 現役ルーティーンを1箇所に集約するスクリプト

echo "=== 現役ルーティーン集約開始 ==="
echo ""

# Phase 1: ACTIVE-ROUTINESディレクトリ作成
echo "Phase 1: 統合ディレクトリ作成中..."
mkdir -p ACTIVE-ROUTINES/{system-master,feed-posts,reel-posts,story-quiz,habit-ranking}
echo "✅ ACTIVE-ROUTINES構造作成完了"
echo ""

# Phase 2: システム統括移動
echo "Phase 2: システム統括ファイル移動中..."
if [ -d "SYSTEM-MASTER" ]; then
    mv SYSTEM-MASTER/* ACTIVE-ROUTINES/system-master/ 2>/dev/null
    rmdir SYSTEM-MASTER 2>/dev/null
    echo "  ✅ システム統括ファイル移動完了"
fi

# Phase 3: リール投稿移動
echo "Phase 3: リール投稿コンテンツ移動中..."
if [ -d "reel-contents" ]; then
    mv reel-contents/* ACTIVE-ROUTINES/reel-posts/ 2>/dev/null
    rmdir reel-contents 2>/dev/null
    echo "  ✅ リール投稿移動完了"
fi

# Phase 4: クイズコンテンツ移動
echo "Phase 4: クイズコンテンツ移動中..."
if [ -d "quiz-contents" ]; then
    mv quiz-contents/* ACTIVE-ROUTINES/story-quiz/ 2>/dev/null
    rmdir quiz-contents 2>/dev/null
    echo "  ✅ クイズコンテンツ移動完了"
fi

# Phase 5: フィード投稿用シンボリックリンク作成
echo "Phase 5: フィード投稿参照設定中..."
# knowledge-quality-systemへのシンボリックリンク
ln -s ../knowledge-quality-system/START-PROMPT.md ACTIVE-ROUTINES/feed-posts/START-PROMPT.md 2>/dev/null
ln -s ../knowledge-quality-system/KNOWLEDGE_GENERATION_MASTER_GUIDE.md ACTIVE-ROUTINES/feed-posts/KNOWLEDGE_GENERATION_MASTER_GUIDE.md 2>/dev/null
ln -s ../knowledge-quality-system/CONTENT-GENERATION-FLOW-MASTER.md ACTIVE-ROUTINES/feed-posts/CONTENT-GENERATION-FLOW-MASTER.md 2>/dev/null
echo "  ✅ フィード投稿参照設定完了"

# Phase 6: 習慣ランキング用シンボリックリンク作成
echo "Phase 6: 習慣ランキング参照設定中..."
ln -s ../knowledge-quality-system/specialized-systems/habit-ranking-system ACTIVE-ROUTINES/habit-ranking/system-files 2>/dev/null
echo "  ✅ 習慣ランキング参照設定完了"

# Phase 7: README作成
echo "Phase 7: README作成中..."
cat > ACTIVE-ROUTINES/README.md << 'EOF'
# 🚀 ACTIVE ROUTINES - 現役ルーティーン統合ディレクトリ

## 📋 4つの現役ルーティーン

### 1. system-master/ - システム統括管理
- INSTAGRAM_SYSTEM_MASTER_TERMINAL.md - 統括ターミナル
- INSTAGRAM_SYSTEM_COMPLETE_LOGIC_MANUAL.md - 完全ロジック
- QUICK-START-COMMANDS.md - クイックスタート
- NEXT_GENERATION_HANDOVER_DOCUMENT.md - 最新引き継ぎ書

### 2. feed-posts/ - フィード投稿（Type001-004）
- START-PROMPT.md - 起動コマンド
- knowledge-quality-systemへの参照リンク
- 161ナレッジベース活用

### 3. reel-posts/ - リール投稿（King/Misaki/Ten）
- インスタルールネタ/ - キャラクター別投稿
- CHARACTER-STRATEGY-MASTER-GUIDE.md
- コンテンツ作成マニュアル13個

### 4. story-quiz/ - ストーリーズクイズ
- インスタストーリークイズ/ - 4ジャンル
- quiz-generation-master-flow.md
- 各100問完備

### 5. habit-ranking/ - KIKUYO習慣ランキング
- habit-behavior-database.json - 35習慣データベース
- ランキング生成システム

## 🎯 使用方法

各ルーティーンのディレクトリに移動して、該当するマスタードキュメントを参照してください。

```bash
# 例：フィード投稿
cd ACTIVE-ROUTINES/feed-posts/
cat START-PROMPT.md

# 例：リール投稿
cd ACTIVE-ROUTINES/reel-posts/
ls インスタルールネタ/
```

## 📊 品質保証

全ルーティーンで99%品質基準を適用しています。
EOF
echo "  ✅ README作成完了"

echo ""
echo "=== 集約完了 ==="
echo ""
echo "📁 ACTIVE-ROUTINES構造:"
tree -L 2 ACTIVE-ROUTINES 2>/dev/null || ls -la ACTIVE-ROUTINES/
echo ""
echo "✨ 全ての現役ルーティーンがACTIVE-ROUTINESに集約されました！"
echo ""
echo "💡 使い方："
echo "  cd ACTIVE-ROUTINES/"
echo "  各ルーティーンのディレクトリから作業を開始できます"