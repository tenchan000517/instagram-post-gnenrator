#!/bin/bash
# Instagram投稿生成システム 高速ディレクトリ整理スクリプト
# バックアップなし版

echo "=== Instagram投稿生成システム 高速整理開始 ==="
echo "🔒 appディレクトリは完全保護します"
echo "⚠️  バックアップなしで実行します"
echo ""

# Phase 1: 新ディレクトリ作成
echo "Phase 1: 新ディレクトリ作成中..."
mkdir -p SYSTEM-MASTER
mkdir -p reel-contents
mkdir -p quiz-contents
mkdir -p archive/{handovers,analysis,legacy}
echo "✅ ディレクトリ作成完了"
echo ""

# Phase 2: システム統括ファイル移動
echo "Phase 2: システム統括ファイル移動中..."
[ -f "INSTAGRAM_SYSTEM_MASTER_TERMINAL.md" ] && mv INSTAGRAM_SYSTEM_MASTER_TERMINAL.md SYSTEM-MASTER/ && echo "  ✅ TERMINAL移動"
[ -f "INSTAGRAM_SYSTEM_COMPLETE_LOGIC_MANUAL.md" ] && mv INSTAGRAM_SYSTEM_COMPLETE_LOGIC_MANUAL.md SYSTEM-MASTER/ && echo "  ✅ LOGIC MANUAL移動"
[ -f "QUICK-START-COMMANDS.md" ] && mv QUICK-START-COMMANDS.md SYSTEM-MASTER/ && echo "  ✅ QUICK-START移動"
[ -f "NEXT_GENERATION_HANDOVER_DOCUMENT.md" ] && mv NEXT_GENERATION_HANDOVER_DOCUMENT.md SYSTEM-MASTER/ && echo "  ✅ 最新引き継ぎ書移動"
echo ""

# Phase 3: コンテンツディレクトリ移動
echo "Phase 3: コンテンツディレクトリ移動中..."
[ -d "インスタルールネタ" ] && mv インスタルールネタ reel-contents/ && echo "  ✅ リール投稿移動"
[ -d "インスタストーリークイズ" ] && mv インスタストーリークイズ quiz-contents/ && echo "  ✅ クイズ移動"
echo ""

# Phase 4: アーカイブ処理（小バッチ）
echo "Phase 4: ルートファイルのアーカイブ処理中..."

# 引き継ぎ書系を移動
for file in *次世代Claude* *引き継ぎ* HANDOVER_*; do
    [ -f "$file" ] && mv "$file" archive/handovers/ 2>/dev/null
done
echo "  ✅ 引き継ぎ書アーカイブ完了"

# 分析系を移動
for file in K[0-9]*.md *分析*.md *テンプレート*.md *チェック*.md; do
    [ -f "$file" ] && mv "$file" archive/analysis/ 2>/dev/null
done
echo "  ✅ 分析レポートアーカイブ完了"

# その他を移動
for file in FIND-to-DO* 思考プロセス* コンテンツ分析* *マスタードキュメント*; do
    [ -f "$file" ] && mv "$file" archive/legacy/ 2>/dev/null
done

for file in *フロー*.md *ガイドライン*.md *プロンプト*.md *作業*.md; do
    [ -f "$file" ] && mv "$file" archive/legacy/ 2>/dev/null
done

for file in *ハッシュタグ*.md *キャプション*.md *ターゲット*.md *企業*.md; do
    [ -f "$file" ] && mv "$file" archive/legacy/ 2>/dev/null
done

echo "  ✅ その他ファイルアーカイブ完了"

# ディレクトリ移動
[ -d "backup" ] && mv backup archive/ && echo "  ✅ backupディレクトリ移動"
[ -d "contents" ] && mv contents archive/ && echo "  ✅ contentsディレクトリ移動"

echo ""
echo "=== 整理完了 ==="
echo ""
echo "📁 現在のディレクトリ構造:"
ls -d */ 2>/dev/null | head -10
echo ""
echo "📈 統計:"
echo "ルートのファイル数: $(find . -maxdepth 1 -type f | wc -l)"
echo ""
echo "✨ 高速整理が完了しました！"