#!/usr/bin/env python3
import json
import os
from pathlib import Path
from typing import Dict, List, Any
import re

def analyze_post_type_improved(knowledge_data: Dict[str, Any]) -> Dict[str, Any]:
    """改良版投稿タイプ分析"""
    
    current_post_type = knowledge_data.get("postType", "")
    post_type_reason = knowledge_data.get("postTypeReason", "")
    problem_desc = knowledge_data.get("problemDescription", "")
    solution_content = knowledge_data.get("solutionContent", {})
    page_structure_pattern = knowledge_data.get("pageStructurePattern", "")
    actual_title = knowledge_data.get("actualTitle", "")
    detailed_content = knowledge_data.get("detailedContent", {})
    
    # 優先度1: 既存のpostTypeReasonを重視（内容が正確に記述されている場合）
    if post_type_reason:
        reason_lower = post_type_reason.lower()
        
        # TypeID=001の判定（感情的共感パターン）
        if any(keyword in reason_lower for keyword in ["感情的", "共感", "悩み", "困った状況", "あるある", "体験談"]):
            return {
                "recommended_post_type": "001",
                "analysis_reason": f"postTypeReasonから判定: {post_type_reason[:50]}...",
                "confidence_level": "high",
                "analysis_source": "postTypeReason"
            }
        
        # TypeID=002の判定（スキル習得・手順解説）
        elif any(keyword in reason_lower for keyword in ["スキル", "習得", "手順", "ステップ", "段階", "方法", "身に着ける", "目的達成型"]):
            return {
                "recommended_post_type": "002", 
                "analysis_reason": f"postTypeReasonから判定: {post_type_reason[:50]}...",
                "confidence_level": "high",
                "analysis_source": "postTypeReason"
            }
        
        # TypeID=003の判定（情報提供・データ）
        elif any(keyword in reason_lower for keyword in ["情報提供", "データ", "知識", "一覧", "選択肢", "比較", "調査"]):
            return {
                "recommended_post_type": "003",
                "analysis_reason": f"postTypeReasonから判定: {post_type_reason[:50]}...",
                "confidence_level": "high", 
                "analysis_source": "postTypeReason"
            }
        
        # TypeID=004の判定（効率・実用特化）
        elif any(keyword in reason_lower for keyword in ["有益情報", "実用", "効率", "便利", "ツール", "明日から", "役立つ"]):
            return {
                "recommended_post_type": "004",
                "analysis_reason": f"postTypeReasonから判定: {post_type_reason[:50]}...",
                "confidence_level": "high",
                "analysis_source": "postTypeReason"
            }
    
    # 優先度2: ページ構造パターンから判定
    if page_structure_pattern:
        pattern_lower = page_structure_pattern.lower()
        
        # TypeID=002のパターン（順序依存型）
        if "sequential" in pattern_lower or "dependency" in pattern_lower:
            return {
                "recommended_post_type": "002",
                "analysis_reason": f"ページ構造パターンから判定: {page_structure_pattern}",
                "confidence_level": "high",
                "analysis_source": "pageStructurePattern"
            }
        
        # TypeID=001のパターン（エピソード型、感情共感型）
        elif "episode" in pattern_lower or "empathy" in pattern_lower or "emotion" in pattern_lower:
            return {
                "recommended_post_type": "001",
                "analysis_reason": f"ページ構造パターンから判定: {page_structure_pattern}",
                "confidence_level": "high",
                "analysis_source": "pageStructurePattern"
            }
    
    # 優先度3: solutionContentの構造から判定
    if isinstance(solution_content, dict):
        
        # 具体的手順があるかチェック（TypeID=002の強い指標）
        steps = solution_content.get("具体的手順", [])
        if steps and len(steps) >= 3:
            step_analysis = analyze_steps_structure(steps)
            if step_analysis["is_sequential"]:
                return {
                    "recommended_post_type": "002",
                    "analysis_reason": f"段階的手順構造を検出: {len(steps)}ステップの順序依存型コンテンツ",
                    "confidence_level": "high",
                    "analysis_source": "solutionContent_steps"
                }
        
        # 提供情報の内容から判定
        provided_info = solution_content.get("提供情報", [])
        if provided_info:
            info_analysis = analyze_provided_info(provided_info)
            if info_analysis["type"]:
                return {
                    "recommended_post_type": info_analysis["type"],
                    "analysis_reason": f"提供情報の内容から判定: {info_analysis['reason']}",
                    "confidence_level": "medium",
                    "analysis_source": "solutionContent_info"
                }
    
    # 優先度4: タイトルと問題記述からのキーワード分析
    title_problem_analysis = analyze_title_and_problem(actual_title, problem_desc)
    if title_problem_analysis["confidence"] >= 0.7:
        return {
            "recommended_post_type": title_problem_analysis["type"],
            "analysis_reason": f"タイトル・問題記述分析: {title_problem_analysis['reason']}",
            "confidence_level": "medium",
            "analysis_source": "title_problem_analysis"
        }
    
    # 優先度5: デフォルト（現在の設定を維持）
    return {
        "recommended_post_type": current_post_type or "003",
        "analysis_reason": "明確な判定基準に該当せず、現在の設定を維持",
        "confidence_level": "low",
        "analysis_source": "default"
    }

def analyze_steps_structure(steps: List[str]) -> Dict[str, Any]:
    """手順の構造を分析して順序依存性を判定"""
    sequential_indicators = ["1.", "2.", "3.", "step", "ステップ", "段階", "まず", "次に", "最後に", "point"]
    
    steps_text = " ".join(steps).lower()
    sequential_count = sum(1 for indicator in sequential_indicators if indicator in steps_text)
    
    return {
        "is_sequential": sequential_count >= 2,
        "sequential_score": sequential_count,
        "total_steps": len(steps)
    }

def analyze_provided_info(provided_info: List[str]) -> Dict[str, Any]:
    """提供情報の内容から投稿タイプを判定"""
    info_text = " ".join(provided_info).lower()
    
    # TypeID=004の判定（ツール・サービス紹介）
    tool_keywords = ["ツール", "アプリ", "サービス", "webサイト", "プラットフォーム", "システム"]
    tool_count = sum(1 for keyword in tool_keywords if keyword in info_text)
    
    if tool_count >= 2:
        return {"type": "004", "reason": "ツール・サービス情報の提供"}
    
    # TypeID=003の判定（情報・データ提供）
    info_keywords = ["一覧", "リスト", "選択肢", "比較", "データ", "情報", "統計", "ランキング"]
    info_count = sum(1 for keyword in info_keywords if keyword in info_text)
    
    if info_count >= 2:
        return {"type": "003", "reason": "情報・データの体系的提供"}
    
    # TypeID=002の判定（手法・方法論）
    method_keywords = ["方法", "手法", "テクニック", "アドバイス", "コツ", "ポイント"]
    method_count = sum(1 for keyword in method_keywords if keyword in info_text)
    
    if method_count >= 2:
        return {"type": "002", "reason": "手法・方法論の習得支援"}
    
    return {"type": None, "reason": "判定不能"}

def analyze_title_and_problem(title: str, problem_desc: str) -> Dict[str, Any]:
    """タイトルと問題記述からの総合分析"""
    combined_text = f"{title} {problem_desc}".lower()
    
    # 各タイプの特徴的なキーワードとウェイト
    type_patterns = {
        "001": {
            "keywords": ["悩み", "不安", "困", "あるある", "体験談", "共感", "モヤモヤ", "失敗", "挫折"],
            "weight": [3, 3, 2, 3, 3, 3, 2, 2, 2]
        },
        "002": {
            "keywords": ["方法", "ステップ", "習得", "身につ", "スキル", "向上", "達成", "成功法", "攻略"],
            "weight": [2, 3, 3, 2, 3, 2, 2, 2, 2]
        },
        "003": {
            "keywords": ["情報", "データ", "選", "一覧", "比較", "ランキング", "調査", "研究", "分析"],
            "weight": [2, 2, 1, 2, 2, 2, 2, 2, 2]
        },
        "004": {
            "keywords": ["効率", "便利", "ツール", "アプリ", "活用", "実用", "裏技", "コツ", "時短"],
            "weight": [3, 3, 3, 3, 2, 2, 2, 2, 2]
        }
    }
    
    type_scores = {}
    for type_id, pattern in type_patterns.items():
        score = 0
        found_keywords = []
        for keyword, weight in zip(pattern["keywords"], pattern["weight"]):
            if keyword in combined_text:
                score += weight
                found_keywords.append(keyword)
        type_scores[type_id] = {"score": score, "keywords": found_keywords}
    
    # 最高スコアのタイプを選択
    max_score = max(type_scores.values(), key=lambda x: x["score"])["score"]
    if max_score > 0:
        best_type = max(type_scores.keys(), key=lambda k: type_scores[k]["score"])
        confidence = min(max_score / 10.0, 1.0)  # 最大スコア10で正規化
        reason = f"キーワード適合 (スコア:{max_score}, キーワード:{type_scores[best_type]['keywords']})"
        return {"type": best_type, "confidence": confidence, "reason": reason}
    
    return {"type": None, "confidence": 0.0, "reason": "該当キーワードなし"}

def determine_target_improved(knowledge_data: Dict[str, Any], post_type: str) -> Dict[str, Any]:
    """改良版ターゲット判定"""
    
    marketing_stage = knowledge_data.get("marketingStage", "")
    problem_desc = knowledge_data.get("problemDescription", "")
    actual_title = knowledge_data.get("actualTitle", "")
    
    # 投稿タイプ別のターゲット範囲
    type_target_ranges = {
        "001": ["T001", "T002", "T003", "T004", "T005", "T006"],
        "002": ["T007", "T008", "T009", "T010", "T011", "T012"],
        "003": ["T013", "T014", "T015", "T016", "T017", "T018"],
        "004": ["T019", "T020", "T021", "T022", "T023", "T024"]
    }
    
    # 詳細なターゲット判定キーワード
    target_detailed_keywords = {
        # TypeID=001対応
        "T001": ["働く女性", "女性", "職場", "性別格差", "育児", "両立", "出産", "結婚"],
        "T002": ["キャリアアップ", "昇進", "管理職", "成長", "リーダー", "上位職"],
        "T003": ["就活", "大学生", "学生", "就職活動", "新卒", "27卒", "26卒", "面接", "ES"],
        "T004": ["転職", "キャリアチェンジ", "中途採用", "転職活動", "転職市場"],
        "T005": ["副業", "複業", "サイドビジネス", "副収入", "ダブルワーク"],
        "T006": ["働き方改革", "ワークライフバランス", "労働環境", "制度", "福利厚生"],
        
        # TypeID=002対応  
        "T007": ["就活スキル", "面接対策", "自己PR", "ガクチカ", "志望動機", "就活準備"],
        "T008": ["ビジネススキル", "仕事力", "業務効率", "プレゼン", "コミュニケーション"],
        "T009": ["リーダーシップ", "マネジメント", "部下育成", "チームワーク", "指導"],
        "T010": ["IT", "AI", "デジタル", "テクノロジー", "プログラミング", "システム"],
        "T011": ["起業", "独立", "フリーランス", "開業", "自営業", "ビジネス"],
        "T012": ["資格", "検定", "専門知識", "認定", "スキル向上", "能力開発"],
        
        # TypeID=003対応
        "T013": ["企業情報", "業界研究", "会社選び", "企業分析", "求人情報"],
        "T014": ["転職市場", "求人動向", "転職情報", "市場分析", "業界動向"],
        "T015": ["キャリア選択", "進路決定", "職種選び", "将来設計", "キャリアパス"],
        "T016": ["資格情報", "試験対策", "学習方法", "教育制度", "スキル習得"],
        "T017": ["学習情報", "教育", "研修", "トレーニング", "自己啓発"],
        "T018": ["トレンド", "最新情報", "市場動向", "業界情報", "未来予測"],
        
        # TypeID=004対応
        "T019": ["業務効率化", "仕事効率", "生産性向上", "業務改善", "効率アップ"],
        "T020": ["就活効率化", "就職活動", "選考対策", "就活ツール", "効率的就活"],
        "T021": ["転職効率化", "転職活動", "転職ツール", "効率的転職", "求職活動"],
        "T022": ["学習効率化", "効率学習", "勉強法", "学習方法", "効果的学習"],
        "T023": ["副業効率化", "効率的副業", "収益化", "稼ぐ方法", "副業ツール"],
        "T024": ["日常効率化", "ライフハック", "便利ツール", "時短", "効率的生活"]
    }
    
    # 分析対象テキスト
    analysis_text = f"{marketing_stage} {problem_desc} {actual_title}".lower()
    
    # 投稿タイプに対応するターゲット範囲内でスコア計算
    target_scores = {}
    possible_targets = type_target_ranges.get(post_type, ["T001"])
    
    for target in possible_targets:
        score = 0
        matched_keywords = []
        keywords = target_detailed_keywords.get(target, [])
        
        for keyword in keywords:
            if keyword.lower() in analysis_text:
                score += 1
                matched_keywords.append(keyword)
        
        target_scores[target] = {
            "score": score,
            "keywords": matched_keywords
        }
    
    # 最高スコアのターゲットを選択
    if target_scores:
        max_score = max(target_scores.values(), key=lambda x: x["score"])["score"]
        if max_score > 0:
            best_target = max(target_scores.keys(), key=lambda k: target_scores[k]["score"])
            matched_kw = target_scores[best_target]["keywords"]
            reason = f"キーワード分析 (スコア:{max_score}, 適合:{matched_kw[:3]})"
        else:
            # デフォルトターゲット（投稿タイプの最初）
            best_target = possible_targets[0]
            reason = f"投稿タイプ {post_type} のデフォルトターゲット"
    else:
        best_target = "T001"
        reason = "フォールバック（T001）"
    
    return {
        "recommended_target": best_target,
        "target_reason": reason,
        "target_scores": target_scores
    }

def main():
    """改良版メイン分析処理"""
    knowledge_dir = Path("/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge")
    
    # ナレッジファイル取得
    knowledge_files = []
    for file_path in knowledge_dir.glob("K*.json"):
        if re.match(r"K\d{3}\.json$", file_path.name):
            knowledge_files.append(file_path)
    
    knowledge_files.sort()
    print(f"改良版分析開始 - 対象ファイル数: {len(knowledge_files)}")
    
    results = []
    type_distribution = {"001": 0, "002": 0, "003": 0, "004": 0}
    target_distribution = {}
    changes_required = []
    analysis_sources = {}
    
    for file_path in knowledge_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                knowledge_data = json.load(f)
            
            knowledge_id = knowledge_data.get("knowledgeId", file_path.stem)
            title = knowledge_data.get("actualTitle", knowledge_data.get("title", ""))
            current_type = knowledge_data.get("postType", "")
            
            # 改良版投稿タイプ分析
            type_analysis = analyze_post_type_improved(knowledge_data)
            
            # 改良版ターゲット分析
            target_analysis = determine_target_improved(knowledge_data, type_analysis["recommended_post_type"])
            
            # 変更が必要かチェック
            if current_type != type_analysis["recommended_post_type"]:
                changes_required.append(knowledge_id)
            
            # 分析ソース統計
            source = type_analysis.get("analysis_source", "unknown")
            analysis_sources[source] = analysis_sources.get(source, 0) + 1
            
            # 結果記録
            result = {
                "knowledgeId": knowledge_id,
                "title": title,
                "currentPostType": current_type,
                "recommendedPostType": type_analysis["recommended_post_type"],
                "analysisReason": type_analysis["analysis_reason"],
                "analysisSource": type_analysis["analysis_source"],
                "recommendedTarget": target_analysis["recommended_target"],
                "targetReason": target_analysis["target_reason"],
                "confidenceLevel": type_analysis["confidence_level"]
            }
            
            results.append(result)
            
            # 分布統計
            rec_type = type_analysis["recommended_post_type"]
            if rec_type in type_distribution:
                type_distribution[rec_type] += 1
            
            rec_target = target_analysis["recommended_target"]
            target_distribution[rec_target] = target_distribution.get(rec_target, 0) + 1
            
            # 変更があるもののみ表示
            if current_type != rec_type:
                print(f"変更提案: {knowledge_id} [{current_type}→{rec_type}] by {source}")
            
        except Exception as e:
            print(f"エラー: {file_path.name} - {str(e)}")
            continue
    
    # 改良版分析結果
    analysis_results = {
        "metadata": {
            "analysisDate": "2025-07-26",
            "totalKnowledge": len(results),
            "analysisVersion": "2.0_improved",
            "analysisSources": analysis_sources
        },
        "results": results,
        "summary": {
            "typeDistribution": type_distribution,
            "targetDistribution": target_distribution,
            "changesRequired": changes_required
        }
    }
    
    # 結果保存
    output_path = Path("/mnt/c/instagram-course/instagram-post-generator/analysis-results/knowledge-analysis-results-v2.json")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(analysis_results, f, ensure_ascii=False, indent=2)
    
    print(f"\n改良版分析完了!")
    print(f"結果保存先: {output_path}")
    print(f"総ナレッジ数: {len(results)}")
    print(f"投稿タイプ分布: {type_distribution}")
    print(f"変更提案数: {len(changes_required)}")
    print(f"分析ソース分布: {analysis_sources}")
    
    return analysis_results

if __name__ == "__main__":
    main()