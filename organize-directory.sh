#!/bin/bash
# Instagram投稿生成システム 安全なディレクトリ整理スクリプト
# appディレクトリ完全保護版

echo "=== Instagram投稿生成システム 安全な整理開始 ==="
echo "🔒 appディレクトリは完全保護します"
echo ""

# Phase 1: バックアップ作成
echo "Phase 1: バックアップ作成中..."
backup_dir="../instagram-backup-$(date +%Y%m%d-%H%M%S)"
cp -r . "$backup_dir"
echo "✅ バックアップ完了: $backup_dir"
echo ""

# Phase 2: 新ディレクトリ作成
echo "Phase 2: 新ディレクトリ作成中..."
mkdir -p SYSTEM-MASTER
mkdir -p reel-contents
mkdir -p quiz-contents
mkdir -p archive/{handovers,analysis,legacy}
echo "✅ ディレクトリ作成完了"
echo ""

# Phase 3: システム統括ファイル移動
echo "Phase 3: システム統括ファイル移動中..."
if [ -f "INSTAGRAM_SYSTEM_MASTER_TERMINAL.md" ]; then
    mv INSTAGRAM_SYSTEM_MASTER_TERMINAL.md SYSTEM-MASTER/
    echo "  ✅ TERMINAL移動完了"
fi

if [ -f "INSTAGRAM_SYSTEM_COMPLETE_LOGIC_MANUAL.md" ]; then
    mv INSTAGRAM_SYSTEM_COMPLETE_LOGIC_MANUAL.md SYSTEM-MASTER/
    echo "  ✅ LOGIC MANUAL移動完了"
fi

if [ -f "QUICK-START-COMMANDS.md" ]; then
    mv QUICK-START-COMMANDS.md SYSTEM-MASTER/
    echo "  ✅ QUICK-START移動完了"
fi

if [ -f "NEXT_GENERATION_HANDOVER_DOCUMENT.md" ]; then
    mv NEXT_GENERATION_HANDOVER_DOCUMENT.md SYSTEM-MASTER/
    echo "  ✅ 最新引き継ぎ書移動完了"
fi
echo ""

# Phase 4: コンテンツディレクトリ移動
echo "Phase 4: コンテンツディレクトリ移動中..."
if [ -d "インスタルールネタ" ]; then
    mv インスタルールネタ reel-contents/
    echo "  ✅ リール投稿コンテンツ移動完了"
fi

if [ -d "インスタストーリークイズ" ]; then
    mv インスタストーリークイズ quiz-contents/
    echo "  ✅ クイズコンテンツ移動完了"
fi
echo ""

# Phase 5: アーカイブ処理
echo "Phase 5: ルートファイルのアーカイブ処理中..."

# 引き継ぎ書系
echo "  引き継ぎ書をアーカイブ中..."
find . -maxdepth 1 -name "*次世代Claude_Code*" -type f -exec mv {} archive/handovers/ \; 2>/dev/null
find . -maxdepth 1 -name "*次世代Claude*" -type f -exec mv {} archive/handovers/ \; 2>/dev/null
find . -maxdepth 1 -name "HANDOVER_*" -type f -exec mv {} archive/handovers/ \; 2>/dev/null
find . -maxdepth 1 -name "*引き継ぎ*" -type f -exec mv {} archive/handovers/ \; 2>/dev/null
echo "  ✅ 引き継ぎ書アーカイブ完了"

# 分析レポート系
echo "  分析レポートをアーカイブ中..."
find . -maxdepth 1 -name "K[0-9]*" -type f -exec mv {} archive/analysis/ \; 2>/dev/null
find . -maxdepth 1 -name "*分析*" -type f -exec mv {} archive/analysis/ \; 2>/dev/null
find . -maxdepth 1 -name "*テンプレート*" -type f -exec mv {} archive/analysis/ \; 2>/dev/null
find . -maxdepth 1 -name "*チェックリスト*" -type f -exec mv {} archive/analysis/ \; 2>/dev/null
find . -maxdepth 1 -name "*フォーマット*" -type f -exec mv {} archive/analysis/ \; 2>/dev/null
find . -maxdepth 1 -name "*ナレッジ*" -type f -exec mv {} archive/analysis/ \; 2>/dev/null
echo "  ✅ 分析レポートアーカイブ完了"

# その他古いファイル
echo "  その他のファイルをアーカイブ中..."
find . -maxdepth 1 -name "FIND-to-DO*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "思考プロセス*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "コンテンツ分析*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*マスタードキュメント*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*フロー*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*ガイドライン*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*プロンプト*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*作業*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*ハッシュタグ*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*キャプション*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*リール*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*ターゲット*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*企業*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*Type*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "Phase*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*分類*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*整理*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*重複*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*既存*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*修正*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*完了*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
find . -maxdepth 1 -name "*記録*" -type f -exec mv {} archive/legacy/ \; 2>/dev/null
echo "  ✅ その他ファイルアーカイブ完了"

# backup/とcontents/ディレクトリ移動
if [ -d "backup" ]; then
    mv backup archive/
    echo "  ✅ backupディレクトリ移動完了"
fi

if [ -d "contents" ]; then
    mv contents archive/
    echo "  ✅ contentsディレクトリ移動完了"
fi

# archive/ディレクトリも移動
if [ -d "archive" ] && [ ! -d "archive/archive" ]; then
    # 既存のarchiveディレクトリがあれば、新しいarchiveに統合
    if [ "$(ls -A archive 2>/dev/null)" ]; then
        echo "  既存archiveディレクトリを統合中..."
    fi
fi

echo ""

# Phase 6: 最終確認
echo "=== 整理完了 ==="
echo "📊 整理結果:"
echo "- appディレクトリ: 🔒 完全保護（触っていません）"
echo "- knowledge-quality-system: 🔒 現状維持"
echo "- システム統括: SYSTEM-MASTER/に集約"
echo "- リール投稿: reel-contents/に移動"
echo "- クイズ: quiz-contents/に移動"
echo "- 古いファイル: archive/に保管"
echo ""
echo "🔍 ルートディレクトリの状態:"
echo "------------------------------"
ls -la | grep -E "^[^d].*\.(md|json|txt|js|ts)$" | head -20
echo ""
echo "📁 ディレクトリ構造:"
echo "------------------------------"
find . -maxdepth 1 -type d | sort | grep -v "^\.$"
echo ""
echo "📈 統計:"
echo "------------------------------"
echo "ルートのファイル数: $(find . -maxdepth 1 -type f | wc -l)"
echo "アーカイブ済み: $(find archive -type f 2>/dev/null | wc -l)"
echo ""
echo "✨ 整理が完了しました！"