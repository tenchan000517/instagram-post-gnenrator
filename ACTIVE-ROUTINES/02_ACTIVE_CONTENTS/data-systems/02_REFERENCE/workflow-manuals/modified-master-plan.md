# 全ランキング完全作成マスタープラン（修正版）- 実行プロンプト集

**作成日**: 2025-08-25  
**目的**: 提案された全ランキングを100%確実に作成する  
**ゴール**: 40種類のランキング（キャプション・ハッシュタグ付き）完成  
**制約**: 既存データベース膨張禁止、リサーチ必須項目あり

---

## 📋 STEP 1: 既存データベースの最適化（膨張なし）

### プロンプト1-1: 既存DBの効率化

```markdown
あなたはデータベース最適化の専門家です。

【タスク】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/habit-behavior-database.json
から既存DB活用用の分類済みファイルを作成してください。

【作業内容】
1. 元のファイルは変更せず、コピーして分類
2. characterRecommendationフィールドを削除（無意味なため）
3. 以下の分類でファイル作成：

- high-productivity-habits.json: productivityスコア85点以上
- high-wellbeing-habits.json: wellbeingスコア85点以上  
- high-career-habits.json: careerスコア85点以上
- high-learning-habits.json: learningスコア85点以上
- easy-habits.json: difficulty="低"の習慣
- medium-habits.json: difficulty="中"の習慣
- hard-habits.json: difficulty="高"の習慣
- free-habits.json: cost="無料"の習慣
- morning-habits.json: 朝実施系習慣（habitNameで判定）

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/classified-dbs/
配下に各ファイル保存
```

---

## 📋 STEP 2: リサーチ必須データベース作成

### プロンプト2-1: 業界別習慣リサーチ（金融業界）

```markdown
あなたは金融業界の成功習慣研究の専門家です。

【ROLE】
金融業界のエキスパートとして、トップパフォーマーの共通習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
金融業界で成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- 投資銀行、証券会社、保険会社のトップパフォーマー
- 市場分析、リスク管理、顧客対応の専門性
- グローバル市場対応、規制対応力
- ストレス耐性、判断力、継続学習力

【必須習慣例（参考）】
- 市場オープン前の情報収集ルーチン
- リスクシナリオの事前想定
- 規制変更の継続監視
- 顧客ポートフォリオの定期見直し

【データ構造】
```json
{
  "financeHabits": [
    {
      "habitId": "FIN001",
      "habitName": "市場オープン前情報収集",
      "shortDescription": "5:30-8:30に前日分析と当日予測",
      "overallScore": 95,
      "difficulty": "中",
      "cost": "低額",
      "timeRequired": "朝2時間",
      "evidence": "Goldman Sachs Performance Study 2024",
      "benefit": "判断精度40%向上",
      "targetPersona": ["投資銀行員", "アナリスト", "ファンドマネージャー"],
      "tags": ["金融", "朝型", "情報分析", "リスク管理"]
    }
  ]
}
```

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/finance-habits.json
```

### プロンプト2-2: 業界別習慣リサーチ（医療業界）

```markdown
あなたは医療業界の成功習慣研究の専門家です。

【ROLE】
医療業界のエキスパートとして、優秀な医療従事者の共通習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
医療業界で成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- 医師、看護師、医療技術者のトップパフォーマー
- 患者安全、継続学習、チーム連携
- ストレス管理、集中力維持、判断精度
- 最新医療技術のキャッチアップ

【データ構造】
finance-habits.jsonと同じ形式で、medicalHabitsとして作成

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/medical-habits.json
```

### プロンプト2-3: 業界別習慣リサーチ（製造業）

```markdown
あなたは製造業界の成功習慣研究の専門家です。

【ROLE】
製造業界のエキスパートとして、優秀なマネージャー・エンジニアの共通習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
製造業界で成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- 工場長、生産管理、品質管理のトップパフォーマー
- 安全管理、効率化、コスト削減
- チームマネジメント、現場改善
- IoT・DX対応、継続的改善

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/manufacturing-habits.json
```

### プロンプト2-4: 業界別習慣リサーチ（IT・スタートアップ）

```markdown
あなたはIT・スタートアップ業界の成功習慣研究の専門家です。

【ROLE】
IT・スタートアップ業界のエキスパートとして、成功する起業家・エンジニアの共通習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
IT・スタートアップ業界で成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- 成功した起業家、CTO、リードエンジニア
- 技術トレンドキャッチアップ、スピード重視
- チーム作り、ピボット判断、資金調達
- イノベーション創出、失敗からの学習

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/startup-habits.json
```

### プロンプト2-5: 業界別習慣リサーチ（クリエイティブ）

```markdown
あなたはクリエイティブ業界の成功習慣研究の専門家です。

【ROLE】
クリエイティブ業界のエキスパートとして、成功するデザイナー・クリエイターの共通習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
クリエイティブ業界で成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- トップデザイナー、アートディレクター、映像クリエイター
- インスピレーション収集、アイデア発想
- 集中力維持、締切管理、クライアント対応
- 技術習得、トレンド追従、作品品質向上

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/creative-habits.json
```

### プロンプト2-6: 特殊テーマ習慣リサーチ（AIツール活用）

```markdown
あなたはAIツール活用の専門家です。

【ROLE】
AIツールを使いこなして生産性を極限まで高めている専門家として、実践的なAI活用習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
AIツールを活用して成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- ChatGPT、Claude、Copilot、Midjourney等の効果的活用
- プロンプトエンジニアリング、ワークフロー自動化
- AI×人間の協働、創造的活用法
- AI学習・実験の継続習慣

【必須習慣例（参考）】
- 毎日のプロンプト改良実験
- AIツール新機能の週次チェック
- AI生成物の品質検証プロセス

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/ai-tools-habits.json
```

### プロンプト2-7: 特殊テーマ習慣リサーチ（リモートワーク）

```markdown
あなたはリモートワーク成功法の専門家です。

【ROLE】
リモートワークで高いパフォーマンスを実現している専門家として、在宅勤務・分散チームでの成功習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
リモートワークで成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- 自宅環境の最適化、集中力維持
- オンラインコミュニケーション、チーム連携
- ワークライフバランス、孤立感対策
- デジタルツール活用、生産性測定

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/remote-work-habits.json
```

### プロンプト2-8: 特殊テーマ習慣リサーチ（グローバル人材）

```markdown
あなたはグローバル人材育成の専門家です。

【ROLE】
国際的に活躍するグローバル人材の習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
グローバルで成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- 多言語習得、異文化理解
- 国際チーム運営、時差対応
- グローバル情報収集、視野拡大
- ダイバーシティ活用、包摂的リーダーシップ

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/global-habits.json
```

### プロンプト2-9: 特殊テーマ習慣リサーチ（チームリーダー）

```markdown
あなたはチームリーダーシップの専門家です。

【ROLE】
優秀なチームリーダーの習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
チームリーダーとして成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- 1on1実施、フィードバック文化構築
- 心理的安全性、チームビルディング
- 目標設定、進捗管理、成果創出
- メンバー育成、モチベーション管理

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/leadership-habits.json
```

### プロンプト2-10: 特殊テーマ習慣リサーチ（イノベーション創出）

```markdown
あなたはイノベーション創出の専門家です。

【ROLE】
イノベーションを継続的に生み出している人の習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
イノベーション創出で成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- アイデア発想法、創造的思考
- 実験とプロトタイピング
- 失敗から学習、ピボット判断
- 異業種交流、知識の融合

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/innovation-habits.json
```

### プロンプト2-11: 年代別習慣リサーチ（20代）

```markdown
あなたは20代キャリア成功の専門家です。

【ROLE】
20代で圧倒的な成果を出している人の習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
20代で成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- 基礎スキル構築、学習習慣確立
- 人脈形成、メンター探し
- 失敗を恐れない挑戦、経験蓄積
- 長期視点でのキャリア設計

【必須習慣例（参考）】
- 月1回の新しいスキル学習開始
- 業界のトップ5%の人との接点作り
- 毎日の振り返りと改善記録

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/twenties-habits.json
```

### プロンプト2-12: 年代別習慣リサーチ（30代）

```markdown
あなたは30代管理職成功の専門家です。

【ROLE】
30代でマネジメント責任を果たしながら成果を出している人の習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
30代で成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- マネジメントスキル、部下育成
- 専門性の深化、業界での地位確立
- ワークライフバランス、家族との両立
- 次のキャリアステップ準備

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/thirties-habits.json
```

### プロンプト2-13: 年代別習慣リサーチ（40代）

```markdown
あなたは40代エグゼクティブ成功の専門家です。

【ROLE】
40代でエグゼクティブレベルの成果を出している人の習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
40代で成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- 事業責任、戦略立案・実行
- 大規模チーム運営、組織変革
- ステークホルダー調整、外部ネットワーク
- 健康管理、持続可能な働き方

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/forties-habits.json
```

### プロンプト2-14: 年代別習慣リサーチ（50代以降）

```markdown
あなたは50代以降のキャリア継続成功の専門家です。

【ROLE】
50代以降でもトップパフォーマンスを維持している人の習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
50代以降で成功している人の習慣を10個リサーチし、データベース化してください。

【リサーチ視点】
- 知識・経験の継承、メンタリング
- セカンドキャリア、新分野挑戦
- 健康維持、体力管理の最適化
- ライフワークバランス、生きがい

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/fifties-habits.json
```

### プロンプト2-15: 夜型・隙間時間習慣リサーチ

```markdown
あなたは時間活用最適化の専門家です。

【ROLE】
夜型人間や隙間時間を効果的に活用している人の習慣を科学的にリサーチし、エビデンスベースでデータベース化する専門家

【タスク】
夜型人間と隙間時間活用で成功している人の習慣を15個リサーチし、データベース化してください。

【リサーチ視点】
夜型習慣（10個）：
- 夜20時以降のゴールデンタイム活用
- 深夜の集中力を活かした創作活動
- 夜間のリフレクション・計画立て

隙間時間習慣（5個）：
- 通勤時間、待ち時間の効果的活用
- 5-15分で完結する習慣
- スマホ・デジタルツールでの学習

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/research-dbs/night-anytime-habits.json
```

---

## 📋 STEP 3: 既存DB活用ランキング作成（17種）

### プロンプト3-1: 効果別ランキング4種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【ROLE】
KIKUYO（データ分析・効率化系）として、エビデンスベースのランキングを生成し、完全なInstagram投稿パッケージを作成する専門家

【タスク】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/01_DAILY_USE/habit-ranking/classified-dbs/
配下の効果別DBを使用して、以下のランキングを作成してください。

【作成ランキング】
1. 生産性最大化習慣TOP10（high-productivity-habits.json使用）
2. ウェルビーイング向上習慣TOP10（high-wellbeing-habits.json使用）
3. キャリア成長加速習慣TOP10（high-career-habits.json使用）
4. 学習効率化習慣TOP10（high-learning-habits.json使用）

【各ランキング必須要素】
1. ランキング本体（TOP10、スコア表示）
2. フック（データの数値を強調したKIKUYO口調）
3. ターゲット（その効果を求める具体的な人の悩み）
4. キャプション（KIKUYOの完全フォーマット）
5. ハッシュタグ12個（4+4+4構成）

【参照マニュアル】
- /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/manuals/コンテンツ作成マニュアル/10_キャプション・ハッシュタグ生成マニュアル_2025-08-23.md
- /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/manuals/コンテンツ作成マニュアル/02_ターゲット作成マニュアル_2025-08-22.md
- /mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/04_REFERENCE/manuals/コンテンツ作成マニュアル/03_フック作成マニュアル_2025-08-22.md

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/effects/
```

### プロンプト3-2: 難易度別ランキング3種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
classified-dbs/配下の難易度別DBを使用して、以下のランキングを作成してください。

【作成ランキング】
1. 今日から始められる簡単習慣TOP10（easy-habits.json）
2. 1週間で身につく中級習慣TOP10（medium-habits.json）
3. 上級者向けハード習慣TOP10（hard-habits.json）

【フック例】
- 簡単：「その習慣、今から30分で人生変わるなのです」
- 中級：「1週間後のあなたは別人になってるなのです」
- 上級：「これができたら上位1%の存在なのです」

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/difficulty/
```

### プロンプト3-3: コスト別ランキング3種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
classified-dbs/とresearch-dbs/を組み合わせて、以下のランキングを作成してください。

【作成ランキング】
1. 無料で始められる習慣TOP10（free-habits.json + 各research-dbsの無料習慣）
2. 投資価値の高い有料習慣TOP10（効果95点以上の有料習慣）
3. コスパ最強習慣TOP10（効果/コスト比計算で選定）

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/cost/
```

### プロンプト3-4: 朝型ランキング作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
classified-dbs/morning-habits.jsonを使用して、以下のランキングを作成してください。

【作成ランキング】
1. 朝型人間の最強習慣TOP10

【フック例】
「その朝の使い方、年間1000時間損してるなのです」

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/time/
```

### プロンプト3-5: Tier表・マトリックス4種作成

```markdown
あなたはデータビジュアライゼーションとKIKUYO分析の専門家です。

【ROLE】
全データを統合分析して、視覚的で実用的なTier表・マトリックスを作成し、KIKUYO口調で解説する専門家

【タスク】
classified-dbs/とresearch-dbs/の全データを統合分析して、以下の4つを作成してください。

【作成物】
1. 習慣効果×実践難易度マトリックス
   - 縦軸：効果スコア（100-90-80-70-60）
   - 横軸：難易度（低・中・高）
   - 各習慣をS/A/B/C/Dランクに分類

2. ペルソナ別習慣Tierリスト
   - 経営者向けS/A/B/C/D
   - 管理職向けS/A/B/C/D  
   - 若手向けS/A/B/C/D
   - フリーランス向けS/A/B/C/D

3. 即効性×持続効果分類表
   - 即効型（1週間以内）
   - 短期型（1ヶ月以内）
   - 中期型（3ヶ月以内）
   - 長期型（6ヶ月以上）

4. 習慣相乗効果マップ
   - 最強2習慣コンボTOP5
   - 完璧3習慣セットTOP3
   - 究極5習慣フルスタックTOP1

【各項目に必須要素】
- タイトル
- フック
- ターゲット
- 解説（KIKUYOキャプション）
- ハッシュタグ

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/matrix/
```

---

## 📋 STEP 4: リサーチDB活用ランキング作成（23種）

### プロンプト4-1: 業界別ランキング5種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
research-dbs/配下の業界別DBを使用して、以下5つのランキングを作成してください。

【作成ランキング】
1. 金融業界で成功する習慣TOP10（finance-habits.json）
2. 医療業界プロフェッショナル習慣TOP10（medical-habits.json）
3. 製造業マネージャー必須習慣TOP10（manufacturing-habits.json）
4. スタートアップ起業家習慣TOP10（startup-habits.json）
5. クリエイティブ職習慣TOP10（creative-habits.json）

【各業界特有のフック例】
- 金融：「その投資判断、データが示す失敗パターンなのです」
- 医療：「その診断精度、習慣で20%向上するなのです」
- 製造：「その生産効率、トヨタ式習慣で40%改善なのです」
- IT：「そのコード品質、シリコンバレー式習慣で2倍なのです」
- クリエイティブ：「そのアイデア力、天才の習慣で10倍なのです」

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/industry/
```

### プロンプト4-2: 特殊テーマランキング5種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
research-dbs/配下の特殊テーマDBを使用して、以下5つのランキングを作成してください。

【作成ランキング】
1. AIツール活用習慣TOP10（ai-tools-habits.json）
2. リモートワーク成功習慣TOP10（remote-work-habits.json）
3. グローバル人材習慣TOP10（global-habits.json）
4. チームリーダー必須習慣TOP10（leadership-habits.json）
5. イノベーション創出習慣TOP10（innovation-habits.json）

【各テーマ特有のフック例】
- AI：「そのAI使い方、生産性5倍の差が出るなのです」
- リモート：「その在宅勤務、集中力70%も下がってるなのです」
- グローバル：「その英語力、習慣で1年で別人になるなのです」
- リーダー：「そのマネジメント、部下のやる気50%削いでるなのです」
- イノベーション：「そのアイデア発想法、天才の10%も出てないなのです」

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/special/
```

### プロンプト4-3: 年代別ランキング4種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
research-dbs/配下の年代別DBを使用して、以下4つのランキングを作成してください。

【作成ランキング】
1. 20代で身につけるべき習慣TOP10（twenties-habits.json）
2. 30代管理職の必須習慣TOP10（thirties-habits.json）
3. 40代エグゼクティブ習慣TOP10（forties-habits.json）
4. 50代以降のキャリア維持習慣TOP10（fifties-habits.json）

【各年代特有のフック例】
- 20代：「その20代の過ごし方、生涯年収3000万円変わるなのです」
- 30代：「その30代の働き方、管理職失格のパターンなのです」
- 40代：「その40代の習慣、役員昇格の80%が実践してるなのです」
- 50代：「その50代の準備不足、セカンドキャリアで絶対後悔するなのです」

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/age/
```

### プロンプト4-4: 夜型・隙間時間ランキング2種作成

```markdown
あなたはKIKUYO専用ランキング生成の専門家です。

【タスク】
research-dbs/night-anytime-habits.jsonを使用して、以下2つのランキングを作成してください。

【作成ランキング】
1. 夜型人間の生産性習慣TOP10（夜型習慣部分を抽出）
2. 隙間時間活用習慣TOP10（隙間時間習慣部分を抽出）

【フック例】
- 夜型：「その夜の使い方、朝型の2倍効率悪いなのです」
- 隙間：「その隙間時間、年間200時間無駄にしてるなのです」

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/time/
```

---

## 📋 STEP 5: 品質保証と完成確認

### プロンプト5-1: 全ランキング品質チェック

```markdown
あなたは品質管理の専門家です。

【ROLE】
作成された全40ランキングの品質を厳格にチェックし、不合格項目は具体的な修正指示を出す品質管理責任者

【タスク】
以下のディレクトリ配下の全ランキングファイルをチェックしてください：

【チェック対象】
- /ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/effects/（4ファイル）
- /ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/difficulty/（3ファイル）
- /ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/cost/（3ファイル）
- /ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/time/（3ファイル）
- /ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/matrix/（4ファイル）
- /ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/industry/（5ファイル）
- /ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/special/（5ファイル）
- /ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/age/（4ファイル）

【チェック項目】
1. **フォーマット確認**
   - ランキング本体（TOP10完備、スコア表示）
   - フック（ドキッとする一文、KIKUYO口調）
   - ターゲット（具体的な悩みを持つ人）
   - キャプション（2000文字以内、完全フォーマット）
   - ハッシュタグ（12個、4+4+4構成）

2. **KIKUYO口調確認**
   - 「〜なのです」で統一されているか
   - データ・エビデンス・数値が強調されているか
   - 論理的で分析的な構成か

3. **マニュアル準拠確認**
   - キャプション構成が完全フォーマット通りか
   - ハッシュタグが推奨パターンに準拠しているか
   - フック・ターゲットが3つのマニュアルに準拠しているか

【不合格時の対応】
- 具体的な修正箇所を明記
- 修正後の例文を提示
- 再チェック実施

【最終レポート】
全40ランキングの合格/不合格状況をまとめたレポートを作成

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/品質チェック完了報告書_2025-08-25.md
```

### プロンプト5-2: 完全版マスターINDEX作成

```markdown
あなたはドキュメント管理の専門家です。

【ROLE】
完成した全ランキングを分類・整理し、使いやすいマスターインデックスを作成する情報整理の専門家

【タスク】
完成した全40の新規ランキング + 既存31ランキングを統合した完全版マスターINDEXを作成してください。

【INDEX構成】
```markdown
# KIKUYOランキング完全版マスターINDEX

## 📊 新規作成ランキング（40種）

### 業界別ランキング（5種）
1. [金融業界で成功する習慣TOP10](相対パス)
2. [医療業界プロフェッショナル習慣TOP10](相対パス)
3. [製造業マネージャー必須習慣TOP10](相対パス)
4. [スタートアップ起業家習慣TOP10](相対パス)
5. [クリエイティブ職習慣TOP10](相対パス)

### 効果別ランキング（4種）
1. [生産性最大化習慣TOP10](相対パス)
2. [ウェルビーイング向上習慣TOP10](相対パス)
3. [キャリア成長加速習慣TOP10](相対パス)
4. [学習効率化習慣TOP10](相対パス)

### 難易度別ランキング（3種）
1. [今日から始められる簡単習慣TOP10](相対パス)
2. [1週間で身につく中級習慣TOP10](相対パス)
3. [上級者向けハード習慣TOP10](相対パス)

### コスト別ランキング（3種）
1. [無料で始められる習慣TOP10](相対パス)
2. [投資価値の高い有料習慣TOP10](相対パス)
3. [コスパ最強習慣TOP10](相対パス)

### 時間帯別ランキング（3種）
1. [朝型人間の最強習慣TOP10](相対パス)
2. [夜型人間の生産性習慣TOP10](相対パス)
3. [隙間時間活用習慣TOP10](相対パス)

### 年代別ランキング（4種）
1. [20代で身につけるべき習慣TOP10](相対パス)
2. [30代管理職の必須習慣TOP10](相対パス)
3. [40代エグゼクティブ習慣TOP10](相対パス)
4. [50代以降のキャリア維持習慣TOP10](相対パス)

### 特殊テーマランキング（5種）
1. [AIツール活用習慣TOP10](相対パス)
2. [リモートワーク成功習慣TOP10](相対パス)
3. [グローバル人材習慣TOP10](相対パス)
4. [チームリーダー必須習慣TOP10](相対パス)
5. [イノベーション創出習慣TOP10](相対パス)

### Tier表・マトリックス（4種）
1. [習慣効果×実践難易度マトリックス](相対パス)
2. [ペルソナ別習慣Tierリスト](相対パス)
3. [即効性×持続効果分類表](相対パス)
4. [習慣相乗効果マップ](相対パス)

### 既存改良ランキング（5種）
1. [仕事ができる人がやってることTOP10（完全版）](相対パス)
...

## 📋 既存ランキング（31種）
[既存ファイルのリンク一覧]

---
**総計：71ランキング完成**
**Instagram投稿準備完了**
```

【保存先】
/mnt/c/instagram-course/instagram-post-generator/ACTIVE-ROUTINES/02_ACTIVE_CONTENTS/kikuyo-rankings/MASTER_INDEX_完全版.md
```

---

## 🎯 実行順序と所要時間（修正版）

### Phase 1: データ準備（2時間）
- STEP 1: 既存DB分類（30分）
- STEP 2: リサーチDB作成（90分 = 15プロンプト×6分）

### Phase 2: ランキング作成（4時間）
- STEP 3: 既存DB活用ランキング（17種×8分 = 136分）
- STEP 4: リサーチDB活用ランキング（23種×6分 = 138分）

### Phase 3: 品質保証（1時間）
- STEP 5: 品質チェック・INDEX作成（60分）

**総所要時間**: 約7時間（集中作業時）

## ✅ 修正版の特徴

1. **リサーチ必須項目を明確に分離**（15種類）
2. **既存DB活用で作成可能な項目を最大活用**（17種類）
3. **データベース膨張を完全回避**（小規模専用DB×15）
4. **各プロンプトにROLE・参照先・保存先を完全記載**
5. **品質保証プロセスを強化**

**実行開始**: プロンプト1-1から順番に実行してください。