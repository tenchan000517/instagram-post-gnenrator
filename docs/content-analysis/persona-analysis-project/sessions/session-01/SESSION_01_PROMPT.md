# Session 01 実行プロンプト - 生データ抽出

## 🎯 セッション使命

**バッチ分析20ファイルから「具体的人物描写」のみを抽出し、抽象的表現を完全除外する**

## 📋 絶対遵守ルール

### **抽象表現完全禁止**
以下の表現が1つでも含まれる記述は即座除外：
- ❌ 会社員、ビジネスパーソン、社会人、働く人
- ❌ XX代、中堅、若手、ベテラン、新人（年数不明）
- ❌ 効率化志向、成長志向、安定志向、向上心がある
- ❌ 企業、組織、チーム、部署（具体名なし）

### **具体性強制基準**
以下の基準を満たす記述のみ採用：
- ✅ 年齢: 「27歳」「29-31歳」等、3歳以内の幅
- ✅ 職業: 「営業職3年目」「経理担当者」「人事採用担当」等
- ✅ 状況: 「月末処理に追われる」「新人教育を任されている」等
- ✅ 悩み: 「Excel関数が覚えられない」「上司への報告が苦手」等

## 📂 データソース（20ファイル必読）

### ペルソナ軸バッチファイル（5個）
```
1. /docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch1-contents001-020.md
2. /docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch2-contents021-040.md
3. /docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch3-contents041-060.md
4. /docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch4-contents061-080.md
5. /docs/content-analysis/analytics/step5-personas/working/batches/phase1-batch5-contents081-100.md
```

### 有益性軸バッチファイル（5個）
```
6. /docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch1-contents001-020.md
7. /docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch2-contents021-040.md
8. /docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch3-contents041-060.md
9. /docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch4-contents061-080.md
10. /docs/content-analysis/analytics/step6-beneficial-value/working/batches/phase1-batch5-contents081-100.md
```

### 表現軸バッチファイル（5個）
```
11. /docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch1-contents001-020.md
12. /docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch2-contents021-040.md
13. /docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch3-contents041-060.md
14. /docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch4-contents061-080.md
15. /docs/content-analysis/analytics/step7-expression-methods/working/batches/phase1-batch5-contents081-100.md
```

### テーマ軸バッチファイル（5個）
```
16. /docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch1-contents001-020.md
17. /docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch2-contents021-040.md
18. /docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch3-contents041-060.md
19. /docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch4-contents061-080.md
20. /docs/content-analysis/analytics/step8-themes/working/batches/phase1-batch5-contents081-100.md
```

## 🔍 実行手順

### **Step 1: バッチファイル読み込み**
- 上記20ファイルを順次読み込み
- 各ファイルの contents-XXX ごとに人物描写を抽出
- 抽象表現含有の記述は読み飛ばし

### **Step 2: 具体的人物描写の抽出**
以下の情報を含む記述のみ抽出：
```
抽出対象例:
✅ "27歳の営業職で、毎日20件のメール対応に疲弊している"
✅ "32歳経理担当者、月末の売上集計作業が月20時間かかって困っている"
✅ "29歳マーケティング企画、新商品のデータ分析に時間を取られている"

除外対象例:
❌ "効率化を求めるビジネスパーソン"
❌ "20代後半の会社員"
❌ "生産性向上に関心のある社会人"
```

### **Step 3: ContentsIDとの紐づけ**
- 抽出した人物描写を該当するcontents-XXXと紐づけ
- 同一contentsから複数の人物描写が抽出される場合は全て記録
- 4軸（ペルソナ・有益性・表現・テーマ）からの抽出を区別

### **Step 4: 品質確認**
各抽出項目について以下を確認：
```
□ 年齢は具体的数値か？（XX歳、XX-XX歳で3歳以内）
□ 職業は詳細職種か？（業界・職種・経験年数）
□ 状況は具体的か？（抽象表現なし）
□ 悩みは現実的か？（実在しそうな困りごと）
```

## 📊 成果物フォーマット

### **保存先**: 
`/docs/content-analysis/persona-analysis-project/sessions/session-01/raw-data-extraction/`

### **ファイル構成**:
```
extracted-persona-descriptions.md     # 抽出された人物描写一覧
excluded-abstract-expressions.md      # 除外された抽象表現リスト
contents-mapping.md                   # ContentsIDとの紐づけ表
quality-check-report.md               # 品質確認レポート
```

### **抽出データ記録フォーマット**:
```markdown
## contents-XXX から抽出

### 抽出元軸: [ペルソナ軸/有益性軸/表現軸/テーマ軸]

### 具体的人物描写:
- **年齢**: XX歳
- **職業**: [具体的職種・経験年数]
- **状況**: [置かれた具体的状況]  
- **悩み**: [具体的な困りごと]
- **原文**: "[バッチファイルからの原文引用]"

### 品質確認:
- 年齢具体性: ✅/❌
- 職業具体性: ✅/❌
- 状況具体性: ✅/❌
- 悩み現実性: ✅/❌
```

## 🚨 品質基準

### **最低抽出目標**
- **抽出件数**: 最低50件（理想100-200件）
- **具体性達成率**: 100%（抽象表現0件）
- **ContentsID紐づけ率**: 100%
- **4軸バランス**: 各軸から均等に抽出

### **不合格基準**
以下の場合は作業やり直し：
- 抽象表現が1件でも混入
- 年齢幅が4歳以上の記述が含有
- 職業が「会社員」等の曖昧表現
- 抽出件数が50件未満

## 📋 実行チェックリスト

### **開始前確認**
- [ ] 20ファイル全てにアクセス可能
- [ ] 抽象表現禁止リストを理解
- [ ] 具体性基準を理解
- [ ] 成果物保存先を確認

### **実行中確認**
- [ ] 抽象表現の即座除外を実行
- [ ] 具体性基準を満たす記述のみ抽出
- [ ] ContentsIDとの紐づけを実行
- [ ] 品質確認を逐次実行

### **完了前確認**
- [ ] 抽出件数は最低50件以上
- [ ] 抽象表現混入ゼロ
- [ ] 全抽出項目が品質基準クリア
- [ ] 成果物が適切に保存

## 🔄 次セッションへの準備

### **Session 02用データ準備**
- 抽出された具体的人物描写リスト
- ContentsIDとの完全な紐づけ表
- 品質確認済み証明書
- 予備分類（類似人物のグルーピング）

### **引き継ぎ事項**
- 抽出過程で発見された特徴的パターン
- 特に具体性の高い優秀な記述例
- 除外された抽象表現の傾向分析
- Session 02での注意すべきポイント

---

**このプロンプトを完全に実行し、品質基準をクリアした成果物を作成してください。**

**重要**: 効率性重視のセッションですが、品質妥協は絶対禁止です。抽象表現が1つでも混入した場合は不合格として作業をやり直してください。