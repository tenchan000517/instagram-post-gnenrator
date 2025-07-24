# Session 1: K011-K018 完全独立分析記録

**分析完了日時**: 2025-01-24
**分析対象**: K011-K018（6個のナレッジ）

---

## K011分析記録

### 基本情報
- 問題: 就活生が「業界研究」と「職種研究」の違いを理解できず、どちらを優先すべきか分からない
- 解決理由: 両者の定義を明確化し、どちらも重要だが目的が異なることを伝える情報提供型のコンテンツ

### 解決構造分析
- 解決の流れ: 定義の明確化→業界研究の説明→職種研究の説明（前半）→職種研究の説明（後半）→バランスの重要性
- 各ページ役割: page1:問題提起と関心喚起, page2:業界と職種の定義を対比表示, page3:業界研究の目的と方法, page4:8つの職種の前半紹介, page5:8つの職種の後半紹介, page6:両方のバランスの重要性
- 解決完了状態: 業界と職種の違いを理解し、両方の研究の必要性を認識し、バランス良く研究を進められる状態

### 必要なページ構造設計
- 総ページ数: 6ページ
- このナレッジ専用構成: 定義対比→詳細説明→リスト分割表示→統合メッセージ
- ページ分割理由: 概念説明と具体例を段階的に提示し、情報過多を防ぐため
- 構造ファイル名: definition-list-split-6page.json
- requirement: 定義の対比を明確に表示し、リスト情報は適切に分割して提示、順次実行必須

### 必要なテンプレート設計
- Page1 templatePattern: {"type": "problem-introduction", "title": "業界研究と職種研究の違い", "subtitle": "就活で迷いがちな2つの研究", "visualElement": "confused_character", "backgroundColor": "light_blue"}
- Page2 templatePattern: {"type": "definition-comparison", "leftDefinition": {"title": "業界研究", "description": "業界の特徴や動向を調べる"}, "rightDefinition": {"title": "職種研究", "description": "具体的な仕事内容を調べる"}, "backgroundColor": "white"}
- Page3 templatePattern: {"type": "detailed-explanation", "title": "業界研究の進め方", "mainText": "業界の全体像を把握する", "bulletPoints": ["市場規模の確認", "主要企業の把握", "成長性の分析"], "visualElement": "industry_icon"}
- Page4 templatePattern: {"type": "numbered-list-display", "title": "主な職種一覧（前半）", "items": [{"number": "1", "text": "営業職"}, {"number": "2", "text": "企画職"}, {"number": "3", "text": "マーケティング職"}, {"number": "4", "text": "エンジニア職"}], "pageIndicator": "前半"}
- Page5 templatePattern: {"type": "numbered-list-display", "title": "主な職種一覧（後半）", "items": [{"number": "5", "text": "人事職"}, {"number": "6", "text": "経理職"}, {"number": "7", "text": "総務職"}, {"number": "8", "text": "法務職"}], "pageIndicator": "後半"}
- Page6 templatePattern: {"type": "balanced-conclusion", "message": "両方の研究が重要", "emphasis": "バランスよく進めることが成功の鍵", "encouragement": "一歩ずつ着実に研究を進めましょう"}

### 実装要求（観察データベース）
- 配置要求: 定義は左右対比配置、リストは縦方向配置、ページ番号を明示、統一されたカードレイアウト
- 視覚表現要求: シンプルな対比表示、番号付きリスト、キャラクター表情変化、業界アイコン使用
- データ構造要求: 定義の対比構造、分割可能なリスト構造、職種詳細情報配列
- テンプレート名: DefinitionListComparisonTemplate.tsx

---

## K012分析記録

### 基本情報
- 問題: 大手企業だけでなく、隠れた優良メーカーを知りたい就活生のニーズ
- 解決理由: 具体的な7社の優良メーカーを数値データと特徴で紹介

### 解決構造分析
- 解決の流れ: タイトル提示→企業1→企業2→企業3→企業4→企業5→企業6→企業7→まとめ
- 各ページ役割: 
  - page1: タイトルと期待感醸成
  - page2-8: 各企業の詳細情報（1ページ1企業）
  - page9: 全体のまとめと行動促進
- 解決完了状態: 7つの優良メーカーを具体的に知り、視野が広がった状態

### 必要なページ構造設計
- 総ページ数: 9ページ
- このナレッジ専用構成: 統一フォーマットでの企業情報連続提示
- ページ分割理由: 1企業1ページで情報を整理し、比較しやすくする
- 構造ファイル名: company-showcase-9page.json
- requirement: 各企業を同じフォーマットで表示し、視覚的な統一感を保つ

### 必要なテンプレート設計
- Page1 templatePattern: {type: "title", content: {mainTitle: "string", number: "7", visualElement: "factory_icons"}}
- Page2-8 templatePattern: {type: "company_detail", content: {companyName: "string", industry: "string", metrics: [{label: "string", value: "string"}], features: ["string"], highlightBubble: "string"}}
- Page9 templatePattern: {type: "summary", content: {message: "string", encouragement: "string", actionPrompt: "string"}}

### 実装要求（観察データベース）
- 配置要求: 企業名を上部、3つの数値ボックスを中央、特徴を下部に配置
- 視覚表現要求: 統一されたカラーボックス、吹き出し強調、アイコン使用
- データ構造要求: 企業情報の構造化（名前、業界、数値、特徴）
- テンプレート名: CompanyShowcaseTemplate.tsx

---

## K016分析記録

### 基本情報
- 問題: くすりのアオキへの就職を検討しているが、実際の働き方や環境が分からない
- 解決理由: 良い面と厳しい面を交互に提示し、リアルな実態を伝える

### 解決構造分析
- 解決の流れ: 感情的導入→良い面1→厳しい面1→良い面2→厳しい面2→良い面3→厳しい面3→良い面4→総合評価→覚悟確認→応援
- 各ページ役割: 
  - page1: 感情的な問いかけで引き込む
  - page2-9: 良い面と厳しい面を交互に提示
  - page10: 総合的な評価
  - page11: 覚悟確認と応援メッセージ
- 解決完了状態: 企業の実態を理解し、自分に合うか判断できる状態

### 必要なページ構造設計
- 総ページ数: 11ページ
- このナレッジ専用構成: ストーリー形式での段階的情報開示
- ページ分割理由: 感情の起伏を作り、情報を消化しやすくする
- 構造ファイル名: story-reality-11page.json
- requirement: 良い面と厳しい面を交互に提示し、感情的な展開を維持

### 必要なテンプレート設計
- Page1 templatePattern: {type: "emotional_intro", content: {question: "string", characterEmotion: "curious"}}
- Page2,4,6,8 templatePattern: {type: "positive_aspect", content: {title: "string", description: "string", emoji: "string", characterEmotion: "happy"}}
- Page3,5,7,9 templatePattern: {type: "challenging_aspect", content: {title: "string", description: "string", emoji: "string", characterEmotion: "worried"}}
- Page10 templatePattern: {type: "overall_evaluation", content: {summary: "string", balancedView: "string"}}
- Page11 templatePattern: {type: "final_message", content: {checkMessage: "string", encouragement: "string", characterEmotion: "supportive"}}

### 実装要求（観察データベース）
- 配置要求: キャラクターの表情変化、吹き出し形式での情報提示
- 視覚表現要求: 感情に応じた色使い、キャラクター表情の多様性
- データ構造要求: ポジティブ/ネガティブの交互構造
- テンプレート名: StoryRealityTemplate.tsx

---

## K017分析記録

### 基本情報
- 問題: 5月時点で内定がなく、焦りや不安を感じている就活生
- 解決理由: 同じ状況の体験談と具体的なアドバイスで励ます

### 解決構造分析
- 解決の流れ: タイトル→体験談1＋アドバイス→体験談2＋アドバイス→体験談3＋アドバイス→体験談4＋アドバイス→体験談5＋アドバイス→総括
- 各ページ役割: 
  - page1: 共感を呼ぶタイトル
  - page2-6: 各体験談とそれに対するアドバイス
  - page7: 全体の励ましメッセージ
- 解決完了状態: 焦りが和らぎ、前向きな行動への意欲が湧いた状態

### 必要なページ構造設計
- 総ページ数: 7ページ
- このナレッジ専用構成: 体験談＋アドバイスの繰り返しパターン
- ページ分割理由: 1つの体験談と対応するアドバイスをセットで提示
- 構造ファイル名: experience-advice-7page.json
- requirement: 共感と励ましを交互に提供し、感情的なサポートを重視

### 必要なテンプレート設計
- Page1 templatePattern: {type: "empathy_title", content: {mainTitle: "string", month: "5月", number: "5選", characterEmotion: "understanding"}}
- Page2-6 templatePattern: {type: "experience_advice", content: {experienceNumber: "string", situation: "string", feeling: "string", advice: "string", encouragement: "string", characterEmotion: "supportive"}}
- Page7 templatePattern: {type: "final_encouragement", content: {message: "string", reminder: "string", characterEmotion: "cheering"}}

### 実装要求（観察データベース）
- 配置要求: 体験談を上部、アドバイスを下部に配置
- 視覚表現要求: 優しい色使い、共感的なキャラクター表情
- データ構造要求: 体験談とアドバイスのペア構造
- テンプレート名: ExperienceAdviceTemplate.tsx

---

## K018分析記録

### 基本情報
- 問題: 業界全体の関係性や位置づけが分からず、業界選択に迷っている
- 解決理由: 視覚的な業界マップで全体像を把握できるようにする

### 解決構造分析
- 解決の流れ: タイトル→マップ全体図→業界群1詳細→業界群2詳細→業界群3詳細→活用方法
- 各ページ役割: 
  - page1: タイトルと導入
  - page2: 2軸マップの全体図
  - page3-5: 各業界群の詳細情報
  - page6: マップの活用方法
- 解決完了状態: 業界の全体像を理解し、自分の志向に合う業界を見つけられる状態

### 必要なページ構造設計
- 総ページ数: 6ページ
- このナレッジ専用構成: 全体図→部分詳細の段階的展開
- ページ分割理由: 全体像から詳細へズームインする理解の流れ
- 構造ファイル名: industry-map-6page.json
- requirement: 視覚的なマップ表示と詳細情報の適切な関連付け

### 必要なテンプレート設計
- Page1 templatePattern: {type: "map_title", content: {mainTitle: "string", description: "string", visualElement: "map_preview"}}
- Page2 templatePattern: {type: "full_map", content: {axes: {x: {label: "string", left: "string", right: "string"}, y: {label: "string", top: "string", bottom: "string"}}, industries: [{name: "string", position: {x: number, y: number}}]}}
- Page3-5 templatePattern: {type: "industry_group_detail", content: {groupTitle: "string", industries: [{name: "string", characteristics: ["string"], examples: ["string"]}], commonFeature: "string"}}
- Page6 templatePattern: {type: "usage_guide", content: {howToUse: ["string"], benefits: ["string"], nextAction: "string"}}

### 実装要求（観察データベース）
- 配置要求: 2軸マップの明確な表示、業界の位置関係の視覚化
- 視覚表現要求: 手書き風の親しみやすさ、色分けによる分類
- データ構造要求: 座標情報を含む業界配置データ
- テンプレート名: IndustryMapTemplate.tsx

---

## 分析完了メモ
- 対象: K011, K012, K016, K017, K018（K013-K015は別場所のためスキップ）
- 各ナレッジの独自構造を完全独立で分析
- 既存テンプレートの概念を一切持ち込まず純粋に分析
- Phase 2での集計に向けた材料として記録