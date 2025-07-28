#!/bin/bash

# ナレッジファイルをpostType別ディレクトリに移行するスクリプト

KNOWLEDGE_DIR="/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge"
BACKUP_DIR="/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge_backup_$(date +%Y%m%d_%H%M%S)"

echo "=== ナレッジファイル移行スクリプト ==="
echo "実行日時: $(date)"
echo ""

# バックアップ作成
echo "1. バックアップを作成中..."
cp -r "$KNOWLEDGE_DIR" "$BACKUP_DIR"
echo "   バックアップ完了: $BACKUP_DIR"
echo ""

# postType別ディレクトリ作成
echo "2. postType別ディレクトリを作成中..."
mkdir -p "$KNOWLEDGE_DIR/type001"
mkdir -p "$KNOWLEDGE_DIR/type002"
mkdir -p "$KNOWLEDGE_DIR/type003"
mkdir -p "$KNOWLEDGE_DIR/type004"
echo "   ディレクトリ作成完了"
echo ""

# ファイル移動
echo "3. ファイルを移動中..."

# 各ファイルを読み込んでpostTypeに基づいて移動
for file in "$KNOWLEDGE_DIR"/K*.json; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        
        # postTypeを抽出
        postType=$(grep -o '"postType"[[:space:]]*:[[:space:]]*"[^"]*"' "$file" 2>/dev/null | sed 's/.*"postType"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
        
        if [ -n "$postType" ]; then
            # postTypeに基づいて移動
            case "$postType" in
                "001")
                    mv "$file" "$KNOWLEDGE_DIR/type001/$filename"
                    echo "   $filename → type001/"
                    ;;
                "002")
                    mv "$file" "$KNOWLEDGE_DIR/type002/$filename"
                    echo "   $filename → type002/"
                    ;;
                "003")
                    mv "$file" "$KNOWLEDGE_DIR/type003/$filename"
                    echo "   $filename → type003/"
                    ;;
                "004")
                    mv "$file" "$KNOWLEDGE_DIR/type004/$filename"
                    echo "   $filename → type004/"
                    ;;
                *)
                    echo "   警告: $filename の postType が不明: $postType"
                    ;;
            esac
        else
            echo "   警告: $filename に postType が設定されていません"
        fi
    fi
done

echo ""
echo "4. 移行結果の確認..."
echo "   type001: $(ls -1 "$KNOWLEDGE_DIR/type001" | wc -l) ファイル"
echo "   type002: $(ls -1 "$KNOWLEDGE_DIR/type002" | wc -l) ファイル"
echo "   type003: $(ls -1 "$KNOWLEDGE_DIR/type003" | wc -l) ファイル"
echo "   type004: $(ls -1 "$KNOWLEDGE_DIR/type004" | wc -l) ファイル"

echo ""
echo "移行完了！"
echo "バックアップは以下に保存されています: $BACKUP_DIR"