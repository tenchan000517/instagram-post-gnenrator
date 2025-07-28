#!/bin/bash

# ナレッジファイルの投稿タイプ分析スクリプト
# 使用方法: ./analyze-knowledge-post-types.sh

KNOWLEDGE_DIR="/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge"
OUTPUT_FILE="knowledge-post-type-analysis.txt"

echo "=== ナレッジファイル投稿タイプ分析 ===" > "$OUTPUT_FILE"
echo "実行日時: $(date)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# 各投稿タイプのファイルを収集
declare -A postTypes

# 全Kxxxファイルをスキャン
for file in "$KNOWLEDGE_DIR"/K*.json; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        # postTypeを抽出
        postType=$(grep -o '"postType"[[:space:]]*:[[:space:]]*"[^"]*"' "$file" 2>/dev/null | sed 's/.*"postType"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
        
        if [ -n "$postType" ]; then
            # 投稿タイプ別に配列に追加
            if [ -z "${postTypes[$postType]}" ]; then
                postTypes[$postType]="$filename"
            else
                postTypes[$postType]="${postTypes[$postType]}, $filename"
            fi
        else
            # postTypeが設定されていないファイル
            if [ -z "${postTypes[none]}" ]; then
                postTypes[none]="$filename"
            else
                postTypes[none]="${postTypes[none]}, $filename"
            fi
        fi
    fi
done

# 結果を出力
for type in "001" "002" "003" "004" "none"; do
    if [ -n "${postTypes[$type]}" ]; then
        if [ "$type" == "none" ]; then
            echo "=== postTypeが設定されていないファイル ===" >> "$OUTPUT_FILE"
        else
            echo "=== type$type に分類されるファイル ===" >> "$OUTPUT_FILE"
        fi
        
        # カンマ区切りを改行に変換して出力
        echo "${postTypes[$type]}" | tr ',' '\n' | sed 's/^ *//' | sort >> "$OUTPUT_FILE"
        
        # ファイル数をカウント
        count=$(echo "${postTypes[$type]}" | tr ',' '\n' | wc -l)
        echo "合計: $count ファイル" >> "$OUTPUT_FILE"
        echo "" >> "$OUTPUT_FILE"
    fi
done

# サマリー
echo "=== サマリー ===" >> "$OUTPUT_FILE"
total_files=$(ls "$KNOWLEDGE_DIR"/K*.json | wc -l)
echo "総ファイル数: $total_files" >> "$OUTPUT_FILE"

echo "分析完了: $OUTPUT_FILE"