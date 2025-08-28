#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
+タイプと×タイプを全て5選に統一するスクリプト
"""

import re

def convert_to_5_selections(file_path):
    """
    ファイル内の+タイプと×タイプの数字を5に変更
    """
    # ファイルを読み込み
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # +タイプの数字を5に変更（6選、7選、8選、9選、10選など）
    content = re.sub(r'(\*\*\+タイプ\*\*.*?)([6-9]|10)選', r'\g<1>5選', content)
    content = re.sub(r'(\*\*\+タイプ\*\*.*?)([6-9]|10)(つの|個の)', r'\g<1>5\g<3>', content)
    
    # ×タイプの数字を5に変更
    content = re.sub(r'(\*\*×タイプ\*\*.*?)([6-9]|10)選', r'\g<1>5選', content)
    content = re.sub(r'(\*\*×タイプ\*\*.*?)([6-9]|10)(つの|個の)', r'\g<1>5\g<3>', content)
    
    # ファイルに書き戻し
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("変換完了: +タイプと×タイプを5選に統一しました")

if __name__ == "__main__":
    file_path = "/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/misaki-posts/コンテンツタイトル02/コンテンツタイトル02.md"
    convert_to_5_selections(file_path)