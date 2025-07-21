# 📋 ナレッジフォーマット設計 v1.0 - 実証分析結果

**作成日時**: 2025-07-21  
**分析対象**: Contents/2（女性キャリア不安）、Contents/4（自己分析方法）、Contents/91（就活攻略術）、Contents/92（生成AIツール紹介）  
**目的**: ニーズ別ナレッジフォーマットの設計・使い分け仕様確定

---

## 🎯 分析結果サマリー

### **重要な発見**
1. **同ジャンルでも投稿タイプが異なる**: 就活ジャンル内でも共感型vs効率型
2. **ペルソナ×緊急度でフォーマット決定**: 女性×低緊急度=共感型、学生×高緊急度=効率型
3. **フォーマット構造の明確な差**: empathy_hook型 vs practical_strategies型 vs information_catalog型
4. **4つの投稿タイプ完全実証**: TypeID=001（共感型）、TypeID=002（教育型）、TypeID=003（情報型）、TypeID=004（効率型）

---

## 📊 4投稿の比較分析

### **Contents/2: 女性キャリア不安投稿**

#### **基本情報**
```json
{
  "ニーズ": "現在・将来のキャリアに不安のある女性",
  "緊急度": "低",
  "ペルソナ": "女性・提案型・共感重視",
  "投稿タイプ": "TypeID=001 共感・感情誘導型",
  "解決方法": "7つのポイント提案による安心感提供"
}
```

#### **重要な洞察**
- **閲覧動機**: 「キャリア」検索→「困らない」「安心」への期待
- **女性特有解決スタイル**: 提案型（男性の根性論と対比）
- **緊急度低**: 「一生安心」の長期視点
- **共感の価値**: 具体的手法より方向性・安心感が重要

### **Contents/4: 自己分析方法投稿**

#### **基本情報**
```json
{
  "ニーズ": "自己分析を体系的に学びたい就活生",
  "緊急度": "中",
  "ペルソナ": "学習志向・理解重視・段階的習得型",
  "投稿タイプ": "TypeID=002 教育・学習特化型",
  "解決方法": "5つの手法による体系的学習支援"
}
```

#### **重要な特徴**
- **体系的知識伝達**: なぜ必要か？の理論から実践手法まで
- **段階的習得設計**: 基礎→応用→実践の学習フロー
- **教育的構成**: 各手法の詳細説明・注意点・図解付き
- **スキル定着**: 繰り返しによる深化プロセス重視
- **感情・論理比率**: 10:90（論理・教育重視）

### **Contents/91: 就活攻略術投稿**

#### **基本情報**
```json
{
  "ニーズ": "就活で効率的に情報収集・対策したい学生",
  "緊急度": "中〜高",
  "ペルソナ": "就活生・効率重視・実践型",
  "投稿タイプ": "TypeID=004 効率・実用特化型",
  "解決方法": "4つの具体的攻略手法"
}
```

#### **重要な特徴**
- **タイムリミット**: サマーインターン開始という緊急性
- **具体性重視**: 「毎週チェック」「広く浅く」等の明確な手法
- **効率性追求**: 最短距離での成果獲得
- **実践型**: すぐ使えるツール・方法の提示

### **Contents/92: 生成AIツール紹介投稿**

#### **基本情報**
```json
{
  "ニーズ": "AI活用で作業効率化したい会社員・フリーランス",
  "緊急度": "低〜中",
  "ペルソナ": "効率化志向・情報収集重視・ツール活用型",
  "投稿タイプ": "TypeID=003 情報提供・データ型",
  "解決方法": "5つの実用的AIツールの客観的情報提供"
}
```

#### **重要な特徴**
- **客観的情報提供**: 各AIツールの機能・特徴を客観的に紹介
- **データ駆動**: 具体的ツール名・機能詳細・使用例
- **リソース提供**: ユーザーが選択・活用できる情報集
- **網羅性**: 5つのツールを体系的に整理
- **感情・論理比率**: 5:95（圧倒的に論理・情報重視）

---

## 🏗️ ナレッジフォーマット設計

### **フォーマット1: 共感・感情誘導型（TypeID=001）**

```json
{
  "knowledge_id": "female-career-anxiety-001",
  "version": "1.0",
  
  "needs_definition": {
    "primary_need": "現在・将来のキャリアに不安のある女性",
    "urgency_level": "low",
    "emotional_state": ["不安", "迷い", "心配"],
    "trigger_moments": [
      "同僚の妊娠・退職を見た時",
      "転職サイトで年齢制限に気づいた時", 
      "結婚・介護の話で将来を考えた時"
    ]
  },
  
  "persona_profile": {
    "gender": "女性",
    "solution_style": "提案型・共感重視",
    "psychological_needs": ["安心感", "共感", "方向性", "所属感"]
  },
  
  "post_configuration": {
    "type_id": "001",
    "type_name": "共感・感情誘導型",
    "template_preference": ["Enumeration", "Simple5", "List"]
  },
  
  "content_structure": {
    "empathy_hook": {
      "opening_question": "あなたはこんなことないですか？",
      "anxiety_list": [
        "これからの未来に不安しかない",
        "このままでいいのか迷う", 
        "結婚/出産/介護に振り回されたくない"
      ]
    },
    
    "main_solution": {
      "core_message": "7つのポイントを意識すれば安心",
      "solution_points": [
        {
          "point_id": 1,
          "title": "働き方の選択肢＝人生の選択肢",
          "summary": "ライフイベント分岐点の準備",
          "detail": "女性はライフイベントによってキャリアの分岐点が多い。だからこそ、\"今\"から備えるとラクに○",
          "effectiveness": 3
        }
        // ... 7つのポイント全て格納
      ]
    },
    
    "comfort_closing": {
      "reassurance_message": "準備しておくことで差が出る",
      "action_encouragement": "今の職場が合わなくても、選べる状態が安心"
    }
  }
}
```

### **フォーマット2: 教育・学習特化型（TypeID=002）**

```json
{
  "knowledge_id": "self-analysis-methods-001",
  "version": "1.0",
  
  "needs_definition": {
    "primary_need": "自己分析を体系的に学びたい就活生",
    "urgency_level": "medium",
    "goal": "自己理解の深化と適切なアピール力向上",
    "learning_outcome": "5つの分析手法の習得・実践"
  },
  
  "persona_profile": {
    "target": "学習志向の就活生",
    "solution_style": "理解重視・段階的習得型",
    "psychological_needs": ["体系的理解", "スキル習得", "成長実感", "確実性"]
  },
  
  "post_configuration": {
    "type_id": "002",
    "type_name": "教育・学習特化型",
    "template_preference": ["Simple5", "Enumeration", "Section-items"]
  },
  
  "content_structure": {
    "learning_foundation": {
      "importance_explanation": "そもそもなぜ自己分析が必要？",
      "purpose_breakdown": [
        "自分自身を適切にアピールするため",
        "企業や仕事を選ぶ軸を決めるため", 
        "キャリア形成を考えるため"
      ],
      "mindset_setting": "自己分析は繰り返しやることが大事！早い時期から継続的に"
    },
    
    "systematic_methods": [
      {
        "method_id": 1,
        "name": "自分史の作成",
        "category": "基礎的振り返り",
        "description": "これまで何をして何を考えてきたのかをまとめる作業",
        "process": [
          "小学校～大学で印象に残ったできことを書き出す",
          "各段階もしくは各学年ごとに一つ、印象に残った理由も記録する",
          "その中から特に印象に残っているものを深掘り"
        ],
        "tips": "特別な経歴がなくアピールできるものがないという方はまずここから始める",
        "cautions": ["複数の項目で深掘りすると共通するポイントが見えやすくなります"]
      },
      {
        "method_id": 2,
        "name": "「なぜ」の深掘り",
        "category": "思考深化",
        "description": "印象に残ったできごとに対して「なぜ」を追求する",
        "process": [
          "自分の考え方の根底にあるものが見えてきます"
        ],
        "examples": [
          "なぜマーケティングに魅力を感じるのか？",
          "商品やサービスが売れる仕組みを考えるのが好きなのか？",
          "なぜ商品やサービスが売れる仕組みを考えるのが好きなのか？"
        ],
        "cautions": ["さらに複数の項目で深掘りすると共通するポイントが見つけやすくなります"]
      },
      {
        "method_id": 3,
        "name": "モチベーショングラフの作成",
        "category": "視覚化ツール",
        "description": "年齢ごとのできごととそのときの感情の動きを示すグラフ",
        "purpose": "どんなときに感情が動くのかを視覚的に表すことができます",
        "process": [
          "「嬉しいと感じたとき」「落ち込んだとき」を記録",
          "それぞれにどのような出来事があったのかをまとめる",
          "共通する項目が見つかる！"
        ],
        "cautions": ["「なぜそう感じたのか」を深掘りすることで価値観が見つかりやすくなります"],
        "visual_aid": "グラフ例付き"
      },
      {
        "method_id": 4,
        "name": "マインドマップの作成",
        "category": "体系化手法",
        "description": "テーマに沿って考えを広げていく手法",
        "process": [
          "「自分」を中心に「好きなこと、苦手なこと、頑張ったこと」などを自分の行動や感情を示すような枝を描く",
          "各項目にあてはまると思う単語を記入する",
          "各単語からさらに枝を広げて、思いついたことをどんどん書き足していく",
          "その中から自分の価値観を示すような言葉をピックアップ！"
        ],
        "benefit": "自分がどのような価値観を持っているのかが分かりやすくなります",
        "visual_aid": "マインドマップ例付き"
      },
      {
        "method_id": 5,
        "name": "「ジョハリの窓」の活用",
        "category": "心理学的分析",
        "description": "心理学者のジョセフ・ルフトとハリー・イングラムが考案した自己分析の手法",
        "framework": "自分の認識と他者が持っている自分に対するイメージのギャップを埋めるために活用できます",
        "process": [
          "人の性格や性格を表す言葉をできるだけたくさん書き出す",
          "その中から自分に当てはまる言葉を同僚の人に選んでもらう",
          "自分で自分に当てはまると思う言葉を選ぶ",
          "開放の窓/盲点の窓/秘密の窓/未知の窓 という4つに分類する"
        ],
        "benefit": "自分に対するイメージのズレを認識し、「開放の窓」と「盲点の窓」にある言葉を活用することで、自己PRを作りやすくなります",
        "visual_aid": "ジョハリの窓マトリックス図付き"
      }
    ],
    
    "mastery_guidance": {
      "continuation_importance": "自己分析は一度やれば終わりではありません",
      "deepening_process": "早い時期から繰り返しおこない、自己理解を深めていくのがおすすめです",
      "practical_application": "就活準備では、入社後のキャリアについても考える必要があり、自分の価値観が分かっていることが役立つはずです"
    }
  }
}
```

### **フォーマット3: 情報提供・データ型（TypeID=003）**

```json
{
  "knowledge_id": "ai-tools-information-001",
  "version": "1.0",
  
  "needs_definition": {
    "primary_need": "AI活用で作業効率化したい会社員・フリーランス",
    "urgency_level": "low-medium",
    "goal": "適切なAIツール選択・活用による生産性向上",
    "information_type": "ツール比較・機能紹介"
  },
  
  "persona_profile": {
    "target": "効率化志向の会社員・フリーランス",
    "solution_style": "情報収集重視・客観的判断型",
    "psychological_needs": ["選択肢の理解", "客観的比較", "信頼できる情報"]
  },
  
  "post_configuration": {
    "type_id": "003",
    "type_name": "情報提供・データ型",
    "template_preference": ["Table", "Index", "Enumeration"]
  },
  
  "content_structure": {
    "problem_awareness": {
      "current_pain": "調べ物、文章作成、メール返信...多すぎて私が10人いても足らん",
      "solution_concept": "生成AI使えば一瞬で終わる"
    },
    
    "information_catalog": [
      {
        "item_id": 1,
        "name": "ChatGPT",
        "category": "万能型生成AI",
        "description": "言わずと知れた生成AIの代表選手",
        "key_features": ["調べ物", "文章作成", "タスク整理", "人生相談"],
        "use_cases": ["確定申告のキャプション文章アレンジ"],
        "credibility": "全部任せられる万能すぎる相棒",
        "recommendation_level": "essential"
      },
      {
        "item_id": 2,
        "name": "Gemini",
        "category": "Google連携型",
        "description": "Googleが作った生成AI",
        "key_features": ["Google連携", "カレンダー連携", "マップ連携", "ドキュメント連携"],
        "use_cases": ["旅行先での近くの美味しいお店探し"],
        "credibility": "Googleツールと連携できるのが最大の強み",
        "recommendation_level": "useful"
      },
      {
        "item_id": 3,
        "name": "NotebookLM",
        "category": "情報処理特化型",
        "description": "Googleが作った生成AI",
        "key_features": ["PDF・YouTube・音声ファイル読み込み", "ピンポイント回答+根拠提示", "文字起こし"],
        "use_cases": ["規約・会議議事録・情報収集処理"],
        "credibility": "情報の信頼性が抜群（地味に大事）",
        "recommendation_level": "specialized"
      }
      // 残り2つも同様の構造
    ],
    
    "selection_guidance": {
      "core_message": "相棒AIがいるかどうかで生産性が天と地ほど変わる",
      "decision_factors": ["作業内容", "連携ツール", "信頼性要求"],
      "recommendation": "まず間に合うか...✨"
    }
  }
}
```

### **フォーマット4: 効率・実用特化型（TypeID=004）**

```json
{
  "knowledge_id": "job-hunting-strategy-001",
  "version": "1.0",
  
  "needs_definition": {
    "primary_need": "就活で効率的に情報収集・対策したい学生",
    "urgency_level": "medium-high",
    "goal": "インターン選考・本選考での成功",
    "deadline_factor": "サマーインターン開始"
  },
  
  "persona_profile": {
    "target": "就活生（性別問わず）",
    "solution_style": "効率重視・実践型",
    "psychological_needs": ["確実性", "効率性", "差別化"]
  },
  
  "post_configuration": {
    "type_id": "004",
    "type_name": "効率・実用特化型",
    "template_preference": ["Index", "Enumeration", "Checklist-enhanced"]
  },
  
  "content_structure": {
    "opening_hook": {
      "urgency_trigger": "2027サマーインターン開始！",
      "core_concept": "就活は情報戦",
      "value_proposition": "今のうちに知っておくべき4つのこと"
    },
    
    "practical_strategies": [
      {
        "strategy_id": 1,
        "title": "自己分析は\"今\"が勝負！",
        "timing": "就活本格化前の今",
        "specific_methods": ["マインドマップ", "モチベーショングラフ"],
        "benefit": "面接で自信を持って話せる",
        "actionability": "high"
      },
      {
        "strategy_id": 2,
        "title": "業界研究は\"広く浅く\"がコツ！",
        "approach": "最初から絞りすぎず幅広く進める",
        "specific_methods": ["業界地図活用", "就活サイト比較", "ビジネスモデル理解"],
        "benefit": "意外な選択肢の発見",
        "actionability": "high"
      },
      {
        "strategy_id": 3,
        "title": "インターン情報は\"毎週\"チェック！",
        "frequency": "毎週",
        "specific_methods": ["就活サイト定期確認", "スカウト型アプリ併用", "公式サイト直接確認"],
        "benefit": "募集見逃し防止・適合企業発見",
        "actionability": "high"
      },
      {
        "strategy_id": 4,
        "title": "SNS・口コミは\"リアル\"を知る武器！",
        "purpose": "企業のリアル情報収集",
        "specific_methods": ["直近投稿・レビュー優先", "複数サイト情報収集", "個人主観の見極め"],
        "caution": "うのみにしすぎない",
        "actionability": "medium"
      }
    ],
    
    "execution_guidance": {
      "priority_order": [1, 2, 3, 4],
      "time_allocation": "自己分析重点、他は並行実行",
      "success_metrics": "選考通過率、企業理解度向上"
    }
  }
}
```

---

## 🔧 システム統合仕様

### **ナレッジ選択ロジック**

```python
def select_knowledge_format(needs, persona, urgency):
    if urgency == "low" and persona.gender == "女性" and "不安" in needs:
        return "empathy_emotional_format"  # TypeID=001
    elif "ツール" in needs or "情報収集" in needs or "データ" in needs:
        return "information_data_format"  # TypeID=003
    elif urgency in ["medium", "high"] and "効率" in needs:
        return "efficiency_practical_format"  # TypeID=004
    elif urgency in ["medium", "high"] and "学習" in needs:
        return "educational_learning_format"  # TypeID=002
```

### **コンテンツ生成プロンプト**

#### **共感型用**
```
このナレッジを使用してTypeID=001の共感・感情誘導型Instagram投稿を生成してください。
1. 共感部分から始まり、ユーザーの不安に寄り添う
2. {solution_points.length}つの提案を優しく提示
3. 安心感のある励ましの締めくくりで終わる
4. トーン: 優しい・理解がある・共感的
```

#### **教育型用**
```
このナレッジを使用してTypeID=002の教育・学習特化型Instagram投稿を生成してください。
1. 学習の必要性・重要性から開始
2. {systematic_methods.length}つの手法を段階的・体系的に解説
3. 継続学習・実践を促す指導的な結論で締める
4. トーン: 教育的・論理的・習得支援重視
```

#### **情報型用**
```
このナレッジを使用してTypeID=003の情報提供・データ型Instagram投稿を生成してください。
1. 問題意識を簡潔に提示
2. {information_catalog.length}つの選択肢を客観的・体系的に紹介
3. 選択・活用を促す中立的な結論で締める
4. トーン: 客観的・信頼性重視・情報豊富
```

#### **効率型用**
```
このナレッジを使用してTypeID=004の効率・実用特化型Instagram投稿を生成してください。
1. 緊急性・重要性を冒頭で明示
2. {practical_strategies.length}つの具体的手法を実践可能な形で提示
3. 行動を促す明確な結論で締める
4. トーン: 効率的・実践的・結果重視
```

---

## 📈 拡張・改善計画

### **短期改善**
- [x] TypeID=003（情報型）のフォーマット追加 ✅ 完了
- [x] TypeID=002（教育型）のフォーマット追加 ✅ 完了
- [x] 4つの投稿タイプ完全網羅 ✅ 完成
- [ ] effectivenessスコアの効果測定・調整
- [ ] 使用実績によるconfidence_score更新

### **中期拡張**
- [ ] 複数ナレッジの組み合わせパターン
- [ ] ペルソナ×緊急度マトリックスの詳細化
- [ ] バリエーション生成のための要素分解

### **長期発展**
- [ ] AIによる自動ナレッジ抽出・分類
- [ ] 効果測定フィードバックループ
- [ ] 動的ナレッジ最適化システム

---

## ⚠️ 重要な設計原則

### **1. ペルソナファースト**
- ナレッジはペルソナの心理的ニーズを最優先に設計
- 男性型（具体手順重視）vs 女性型（共感・方向性重視）の明確な区別

### **2. 緊急度による詳細レベル調整**
- 低緊急度: 方向性・安心感提供（What中心）
- 高緊急度: 具体的手順・即実行可能（How中心）

### **3. 投稿タイプとの完全連携**
- ナレッジフォーマット ↔ 投稿タイプ ↔ テンプレート選択の一貫性
- TypeIDを軸とした統一的なコンテンツ生成

### **4. 改善可能性の確保**
- バージョン管理による段階的改善
- 効果測定データの蓄積・活用
- 新たな投稿分析による継続的フォーマット進化

---

---

## 🎉 フォーマット設計完成

### **達成成果**
- **4つの投稿タイプ完全分析**: TypeID=001～004 全網羅
- **実証ベース設計**: 実際の投稿4件から抽出した確実なパターン
- **システム連携対応**: 検索・生成・管理の全フロー対応

### **完成したフォーマット**
1. **TypeID=001（共感・感情誘導型）**: empathy_hook → solution_points → comfort_closing
2. **TypeID=002（教育・学習特化型）**: learning_foundation → systematic_methods → mastery_guidance  
3. **TypeID=003（情報提供・データ型）**: problem_awareness → information_catalog → selection_guidance
4. **TypeID=004（効率・実用特化型）**: opening_hook → practical_strategies → execution_guidance

### **実装準備完了項目**
- [x] ナレッジフォーマット4種類
- [x] ペルソナ×緊急度マッピング  
- [x] システム統合仕様
- [x] コンテンツ生成プロンプト

**次のステップ**: この設計をベースに実際のナレッジ収集・分析・蓄積フローを開始し、各TypeIDにつき3パターンずつ（計12パターン）のナレッジベースシステム本格構築を進める。