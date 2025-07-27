#!/usr/bin/env python3
import json
import os
from pathlib import Path
from typing import Dict, List, Any
import re

def analyze_post_type(knowledge_data: Dict[str, Any]) -> Dict[str, Any]:
    """ナレッジデータから投稿タイプを分析"""
    
    # 現在のpostTypeを取得
    current_post_type = knowledge_data.get("postType", "")
    
    # problemDescriptionとsolutionContentを分析
    problem_desc = knowledge_data.get("problemDescription", "")
    solution_content = knowledge_data.get("solutionContent", {})
    marketing_stage = knowledge_data.get("marketingStage", "")
    title = knowledge_data.get("actualTitle", knowledge_data.get("title", ""))
    
    # 投稿タイプの判定ロジック
    recommended_type = current_post_type  # デフォルトは現在の設定
    confidence = "medium"
    analysis_reason = ""
    
    # TypeID=001の判定（感情的共感、悩み解決）
    emotional_keywords = ["悩み", "不安", "困", "辛い", "心配", "モヤモヤ", "ストレス", "プレッシャー", "挫折", "失敗"]
    empathy_keywords = ["共感", "あるある", "わかる", "同じ", "気持ち", "経験", "体験談"]
    
    # TypeID=002の判定（スキル習得、手順解説）
    skill_keywords = ["スキル", "習得", "身につ", "向上", "伸ばす", "磨く", "ステップ", "段階", "手順", "方法"]
    achievement_keywords = ["達成", "目標", "ゴール", "成功", "結果", "効果", "実現"]
    
    # TypeID=003の判定（情報提供、データ）
    info_keywords = ["情報", "データ", "知識", "調査", "統計", "ランキング", "比較", "選択肢", "一覧"]
    research_keywords = ["研究", "分析", "調べる", "探す", "見つける", "収集"]
    
    # TypeID=004の判定（効率化、実用性）
    efficiency_keywords = ["効率", "便利", "実用", "活用", "ツール", "サービス", "機能", "裏技", "コツ"]
    immediate_keywords = ["明日から", "すぐに", "即効", "簡単", "手軽", "時短"]
    
    problem_text = problem_desc.lower()
    solution_text = str(solution_content).lower()
    title_text = title.lower()
    marketing_text = marketing_stage.lower()
    
    # 全テキストを結合して分析
    all_text = f"{problem_text} {solution_text} {title_text} {marketing_text}"
    
    # 各タイプのスコア計算
    type_scores = {
        "001": 0,
        "002": 0, 
        "003": 0,
        "004": 0
    }
    
    # TypeID=001のスコア計算
    for keyword in emotional_keywords + empathy_keywords:
        if keyword in all_text:
            type_scores["001"] += 1
    
    # TypeID=002のスコア計算  
    for keyword in skill_keywords + achievement_keywords:
        if keyword in all_text:
            type_scores["002"] += 1
            
    # TypeID=003のスコア計算
    for keyword in info_keywords + research_keywords:
        if keyword in all_text:
            type_scores["003"] += 1
            
    # TypeID=004のスコア計算
    for keyword in efficiency_keywords + immediate_keywords:
        if keyword in all_text:
            type_scores["004"] += 1
    
    # 最高スコアのタイプを推奨タイプとする
    max_score = max(type_scores.values())
    if max_score > 0:
        recommended_type = max(type_scores.keys(), key=lambda k: type_scores[k])
        confidence = "high" if max_score >= 3 else "medium"
    else:
        confidence = "low"
    
    # 分析理由の生成
    type_names = {
        "001": "共感・感情誘導型",
        "002": "教育・学習特化型", 
        "003": "情報提供・データ型",
        "004": "効率・実用特化型"
    }
    
    analysis_reason = f"{type_names.get(recommended_type, 'Unknown')}として分類。"
    if max_score > 0:
        analysis_reason += f"キーワード適合度スコア: {type_scores[recommended_type]}"
    
    return {
        "current_post_type": current_post_type,
        "recommended_post_type": recommended_type,
        "analysis_reason": analysis_reason,
        "confidence_level": confidence,
        "type_scores": type_scores
    }

def determine_target(knowledge_data: Dict[str, Any], post_type: str) -> Dict[str, Any]:
    """投稿タイプとマーケティングステージからターゲットを決定"""
    
    marketing_stage = knowledge_data.get("marketingStage", "")
    problem_desc = knowledge_data.get("problemDescription", "")
    
    # 投稿タイプ別のターゲット範囲
    type_target_ranges = {
        "001": ["T001", "T002", "T003", "T004", "T005", "T006"],  # キャリア悩み系
        "002": ["T007", "T008", "T009", "T010", "T011", "T012"],  # スキルアップ系 
        "003": ["T013", "T014", "T015", "T016", "T017", "T018"],  # 情報収集系
        "004": ["T019", "T020", "T021", "T022", "T023", "T024"]   # 効率化系
    }
    
    # デフォルトターゲット（投稿タイプの最初のターゲット）
    default_target = type_target_ranges.get(post_type, ["T001"])[0]
    
    # マーケティングステージからターゲットを推定
    text_to_analyze = f"{marketing_stage} {problem_desc}".lower()
    
    # ターゲット判定のキーワードマッピング
    target_keywords = {
        # TypeID=001対応（キャリア悩み系）
        "T001": ["働く女性", "女性", "職場", "性別", "仕事と育児", "両立"],
        "T002": ["キャリアアップ", "昇進", "管理職", "リーダー", "成長"],
        "T003": ["就活", "大学生", "学生", "就職活動", "新卒"],
        "T004": ["転職", "キャリアチェンジ", "中途", "転職活動"],
        "T005": ["副業", "複業", "サイドビジネス", "ダブルワーク"],
        "T006": ["働き方", "ワークライフバランス", "労働環境", "制度"],
        
        # TypeID=002対応（スキルアップ系）
        "T007": ["就活スキル", "面接", "ES", "自己PR", "ガクチカ"],
        "T008": ["ビジネススキル", "仕事力", "業務", "能力向上"],
        "T009": ["リーダーシップ", "マネジメント", "部下", "チーム"],
        "T010": ["デジタル", "IT", "AI", "テクノロジー", "ツール"],
        "T011": ["起業", "独立", "フリーランス", "開業"],
        "T012": ["専門スキル", "資格", "検定", "専門知識"],
        
        # TypeID=003対応（情報収集系）
        "T013": ["企業情報", "業界研究", "会社選び", "企業研究"],
        "T014": ["転職市場", "求人", "転職情報", "市場動向"],
        "T015": ["キャリア選択", "進路", "職種選び", "将来設計"],
        "T016": ["資格情報", "検定", "試験", "学習情報"],
        "T017": ["教育", "学習", "研修", "スキル習得"],
        "T018": ["トレンド", "動向", "最新情報", "市場"],
        
        # TypeID=004対応（効率化系）
        "T019": ["業務効率", "仕事効率", "生産性", "業務改善"],
        "T020": ["就活効率", "就職活動", "選考対策", "就活ツール"],
        "T021": ["転職効率", "転職活動", "転職ツール", "求職"],
        "T022": ["学習効率", "勉強法", "学習方法", "効率学習"],
        "T023": ["副業効率", "副収入", "収益化", "稼ぐ"],
        "T024": ["日常効率", "ライフハック", "便利", "時短"]
    }
    
    # 投稿タイプに対応するターゲット範囲内でスコア計算
    target_scores = {}
    for target in type_target_ranges.get(post_type, []):
        score = 0
        keywords = target_keywords.get(target, [])
        for keyword in keywords:
            if keyword in text_to_analyze:
                score += 1
        target_scores[target] = score
    
    # 最高スコアのターゲットを選択
    if target_scores and max(target_scores.values()) > 0:
        recommended_target = max(target_scores.keys(), key=lambda k: target_scores[k])
        max_score = target_scores[recommended_target]
        target_reason = f"マーケティングステージ分析によりキーワード適合度スコア {max_score} で選定"
    else:
        recommended_target = default_target
        target_reason = f"投稿タイプ {post_type} のデフォルトターゲットを適用"
    
    return {
        "recommended_target": recommended_target,
        "target_reason": target_reason,
        "target_scores": target_scores
    }

def main():
    """メイン分析処理"""
    knowledge_dir = Path("/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge")
    
    # 全ナレッジファイルを取得
    knowledge_files = []
    for file_path in knowledge_dir.glob("K*.json"):
        if re.match(r"K\d{3}\.json$", file_path.name):
            knowledge_files.append(file_path)
    
    knowledge_files.sort()
    print(f"分析対象ナレッジファイル数: {len(knowledge_files)}")
    
    results = []
    type_distribution = {"001": 0, "002": 0, "003": 0, "004": 0}
    target_distribution = {}
    changes_required = []
    
    for file_path in knowledge_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                knowledge_data = json.load(f)
            
            knowledge_id = knowledge_data.get("knowledgeId", file_path.stem)
            title = knowledge_data.get("actualTitle", knowledge_data.get("title", ""))
            
            # 投稿タイプ分析
            type_analysis = analyze_post_type(knowledge_data)
            
            # ターゲット分析  
            target_analysis = determine_target(knowledge_data, type_analysis["recommended_post_type"])
            
            # 変更が必要かチェック
            if type_analysis["current_post_type"] != type_analysis["recommended_post_type"]:
                changes_required.append(knowledge_id)
            
            # 分析結果を記録
            result = {
                "knowledgeId": knowledge_id,
                "title": title,
                "currentPostType": type_analysis["current_post_type"],
                "recommendedPostType": type_analysis["recommended_post_type"], 
                "analysisReason": type_analysis["analysis_reason"],
                "problemType": "extracted_from_content",
                "solutionType": "extracted_from_content",
                "recommendedTarget": target_analysis["recommended_target"],
                "targetReason": target_analysis["target_reason"],
                "confidenceLevel": type_analysis["confidence_level"]
            }
            
            results.append(result)
            
            # 分布カウント
            rec_type = type_analysis["recommended_post_type"]
            if rec_type in type_distribution:
                type_distribution[rec_type] += 1
                
            rec_target = target_analysis["recommended_target"]
            target_distribution[rec_target] = target_distribution.get(rec_target, 0) + 1
            
            print(f"分析完了: {knowledge_id} - Type:{rec_type}, Target:{rec_target}")
            
        except Exception as e:
            print(f"エラー: {file_path.name} - {str(e)}")
            continue
    
    # 分析結果をまとめ
    analysis_results = {
        "metadata": {
            "analysisDate": "2025-07-26",
            "totalKnowledge": len(results),
            "analysisVersion": "1.0"
        },
        "results": results,
        "summary": {
            "typeDistribution": type_distribution,
            "targetDistribution": target_distribution,
            "changesRequired": changes_required
        }
    }
    
    # 結果を保存
    output_path = Path("/mnt/c/instagram-course/instagram-post-generator/analysis-results/knowledge-analysis-results.json")
    output_path.parent.mkdir(exist_ok=True)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(analysis_results, f, ensure_ascii=False, indent=2)
    
    print(f"\n分析完了!")
    print(f"結果保存先: {output_path}")
    print(f"総ナレッジ数: {len(results)}")
    print(f"投稿タイプ分布: {type_distribution}")
    print(f"変更が必要なナレッジ数: {len(changes_required)}")
    
    return analysis_results

if __name__ == "__main__":
    main()