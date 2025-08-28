#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
コンテンツタイトルの-タイプと÷タイプを全て8選に統一するスクリプト
"""

import re

def convert_to_8_selections(file_path):
    """
    ファイル内の-タイプと÷タイプの数字を8に変更
    """
    # ファイルを読み込み
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # パターンマッチングと置換
    # -タイプの数字を8に変更（5選、6選、7選、9選、10選など）
    content = re.sub(r'(\*\*-タイプ\*\*.*?)([5-79]|10)選', r'\g<1>8選', content)
    
    # ÷タイプの数字を8に変更
    content = re.sub(r'(\*\*÷タイプ\*\*.*?)([5-79]|10)選', r'\g<1>8選', content)
    
    # 特殊な形式も処理
    content = re.sub(r'(\*\*÷タイプ\*\*.*?)([5-79]|10)(つの|個の)', r'\g<1>8\g<3>', content)
    content = re.sub(r'(\*\*-タイプ\*\*.*?)([5-79]|10)(つの|個の)', r'\g<1>8\g<3>', content)
    
    # ファイルに書き戻し
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("変換完了: -タイプと÷タイプを8選に統一しました")

if __name__ == "__main__":
    file_path = "/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/misaki-posts/コンテンツタイトル02/コンテンツタイトル02.md"
    convert_to_8_selections(file_path)