# 分析開始プロンプト集

## ページ構成パターン分析担当者用プロンプト

<!-- ```
Instagram投稿のページ構成パターン分析を担当します。contents-XX-analysis.mdから構成の論理と機能を分析してください。

【必読ドキュメント】
- docs/content-analysis/analysis-start-guide.md
- docs/content-analysis/page-structure-analysis-manual.md

【担当範囲】contents-61 〜 contents-63
【分析対象】docs/content-analysis/contents-XX-analysis.md
【保存先】docs/content-analysis/results/page-structure/contents-XXX-structure.md

重要：1投稿ずつ個別分析、統合分析禁止、投稿ID必須保持。構成の機能分析に集中し、内容の評価はしない。
``` -->

## 有益性分析担当者用プロンプト

<!-- ```
Instagram投稿の有益性分析を担当します。contents-XX-analysis.mdから投稿者の価値主張パターンを科学的に分析してください。

【必読ドキュメント】
- docs/content-analysis/analysis-start-guide.md
- docs/content-analysis/beneficial-value-analysis-manual.md

【担当範囲】contents-90 〜 contents-100
【分析対象】docs/content-analysis/contents-XX-analysis.md
【保存先】docs/content-analysis/results/beneficial-value/contents-XXX-value.md

重要：1投稿ずつ個別分析、統合分析禁止、投稿ID必須保持。投稿者の価値主張のみ分析し、読者の実際の評価は分析しない。
``` -->

## 投稿内容分析担当者用プロンプト

<!-- ```
Instagram投稿の内容分析（10項目）を担当します。contents-XX-analysis.mdからタイトル・ターゲット・テーマ等10項目を詳細分析してください。

【必読ドキュメント】
- docs/content-analysis/analysis-start-guide.md
- docs/content-analysis/content-analysis-manual.md

【担当範囲】contents-90 〜 contents-100
【分析対象】docs/content-analysis/contents-XX-analysis.md
【保存先】docs/content-analysis/results/content-analysis/contents-XXX-content.md

重要：1投稿ずつ個別分析、統合分析禁止、投稿ID必須保持。10項目すべてを漏れなく分析し、項目間の関係性も記録。
``` -->

## ペルソナ・ターゲット分析担当者用プロンプト

```
Instagram投稿のペルソナ・ターゲット分析を担当します。contents-XX-analysis.mdから投稿者が想定している読者像を詳細分析してください。

【必読ドキュメント】
- docs/content-analysis/analysis-start-guide.md
- docs/content-analysis/persona-target-analysis-manual.md

【担当範囲】contents-91 〜 contents-100
【分析対象】docs/content-analysis/contents-XX-analysis.md
【保存先】docs/content-analysis/results/persona-target/contents-XXX-persona.md

重要：1投稿ずつ個別分析、統合分析禁止、投稿ID必須保持。投稿者が想定している読者像のみ分析し、実際の読者は分析対象外。
```

---

## 使用方法

1. **担当分析タイプを確認**
2. **該当するプロンプトをコピー**
3. **担当範囲（contents-XX 〜 contents-XX）を具体的な番号に置き換え**
4. **プロンプトを実行して分析開始**

例：ページ構成分析でcontents-10からcontents-20を担当する場合
```
【担当範囲】contents-10 〜 contents-20
```
に変更してプロンプト実行。

 🚀 Instagram投稿分析 作業開始プロンプト

  📋 作業概要

  Instagram投稿の4軸分析（構成・価値・内容・ペルソナ）を実行し、マーケティング戦略パターン
  を発見する。

  🎯 現在の状況

  - 完了済み: 50投稿分析完了（42+8投稿）
  - 確立法則: 詳細性96%、複合価値88%
  - 次の目標: 51-100投稿での継続分析

  📁 重要ファイル場所

  分析ガイド

  /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/RANDOM_SAMPLING_AN
  ALYSIS_GUIDE.md
  → 必読: ランダムサンプリング分析の詳細手順

  進捗管理ファイル

  /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/ANALYZED_POSTS_TRA
  CKER.md
  → 分析前必須確認: 分析済み50投稿リスト、重複回避用

  結果記録ファイル

  /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/CONTINUING_ANALYSI
  S_RESULTS.md
  → 分析結果追記先: 新しい分析結果をここに追記

  コンテンツデータ

  /mnt/c/instagram-course/instagram-post-generator/contents/[番号]/
  → 画像データ: S__16XXXXXX_0.jpg形式で格納

  🔍 分析手順

  ステップ1: 未分析投稿の特定

  # 分析済み投稿を確認
  Read: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/ANALYZED_POS
  TS_TRACKER.md

  # 51-100から未分析投稿をランダム選択（3-5投稿推奨）

  ステップ2: 4軸分析データ読み取り

  各投稿について以下5ファイルを読む：
  1. /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/contents-XXX-an
  alysis.md
  2. /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/page-st
  ructure/contents-XXX-structure.md
  3. /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/benefic
  ial-value/contents-XXX-value.md
  4. /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/content
  -analysis/contents-XXX-content.md
  5. /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/results/persona
  -target/contents-XXX-persona.md

  ステップ3: パターン抽出

  各投稿から以下を抽出：
  - 構成特徴: タイプ、ページ数、心理誘導
  - 価値要素: 主要価値、構成（単一/複合）、特徴
  - 内容特性: テーマ、ターゲット、レベル、CTA
  - ペルソナ要素: 想定読者、悩み、価値観、行動

  ステップ4: 結果記録

  # 新しい分析をCONTINUING_ANALYSIS_RESULTS.mdに追記
  Edit: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/CONTINUING_A
  NALYSIS_RESULTS.md

  # トラッカーを更新
  Edit: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/ANALYZED_POS
  TS_TRACKER.md

  ⚠️ 重要な注意事項

  必須確認

  - 分析前にANALYZED_POSTS_TRACKER.mdで重複確認
  - ランダムサンプリング（意図的選択禁止）
  - 4軸分析ファイル全読み（推測禁止）
  - 投稿ID完全保持

  禁止事項

  - 仮説先行の分析
  - 統合分析や一般化
  - 推測による要素追加
  - 効率化重視の浅い分析

  🎯 分析品質基準

  高品質分析の条件

  1. 4軸分析の完全読み取り: 全分析ファイルの詳細確認
  2. 実データ基盤: 推測ではなく実際のデータから抽出
  3. 個別分析独立性: 投稿ごとの独立した分析維持
  4. 投稿ID完全保持: 全ての発見に投稿IDを記録

  発見すべきパターン

  - 新しい構成タイプ
  - 価値要素の組み合わせ
  - ペルソナ×アプローチの関係性
  - 成功要因の4要素統合パターン

  🚀 作業開始コマンド例

  # 1. トラッカー確認
  Read: /mnt/c/instagram-course/instagram-post-generator/docs/content-analysis/ANALYZED_POS
  TS_TRACKER.md

  # 2. ランダム選択（例：contents-053, 057, 061を選択）
  Task: "Read 4-axis analysis files for contents-053, 057, 061 in parallel. 
  Extract構成特徴・価値要素・内容特性・ペルソナ要素 from each."

  # 3. 結果記録
  Edit: CONTINUING_ANALYSIS_RESULTS.mdに新しい## 🎯 第9回分析セクション追加

  📊 期待される成果

  継続検証項目

  - 詳細性法則の継続確認（現在96%）
  - 複合価値法則の継続確認（現在88%）
  - 新しい構成タイプの発見
  - レベル分布の多様性確認

  新発見の可能性

  - 8要素以上の複合価値
  - レベル5の出現
  - 新しいターゲット特化戦略
  - 革新的な心理誘導フロー

  ---作業者へ: このプロンプトに従って分析を開始し、高品質な4軸分析を継続してください。質問
  があれば、ガイドファイルを参照してから作業を進めてください。


  > C:\instagram-course\instagram-post-generator\docs\content-analysis\beneficial-value-analy
  sis-manual.md
  C:\instagram-course\instagram-post-generator\docs\content-analysis\content-analysis-manua
  l.md
  C:\instagram-course\instagram-post-generator\docs\content-analysis\correct-analysis-appro
  ach-memo.md
  C:\instagram-course\instagram-post-generator\docs\content-analysis\page-structure-analysi
  s-manual.md
  C:\instagram-course\instagram-post-generator\docs\content-analysis\persona-target-analysi
  s-manual.md C:\instagram-course\instagram-post-generator\docs\content-analysis\persona-in
  tegrated-system-design.md C:\instagram-course\instagram-post-generator\docs\content-analy
  sis\persona-target-analysis-framework.md  
  現在の４つの分析結果がどのようにして作成されてるのかの把握は分析結果を最大限100％引き出す
  重要なファクターです　また、ここまで同じような議論はしてきましたが、今回は仮説を立てるに
  沿うデータがあるのでアップグレードできるはずです　それを踏まえて、完全版の投稿タイプを起
  点とし、しっかりとペルソナも反映した成功パターンに沿った表面的ではなく、ペルソナに対して
  「有益な」情報をリサーチできるようにし、　そのリサーチ結果に対して「狙った「有益な」情報
  をコンテンツとして密度を高めて抜き出し（リサーチの段階では粒度が荒いはずですので※ただし、
  この時点では抜き出しページ構成に合わせてデータを整理するだけで、データ自体は生のデータの
  ままにする。整理とは情報をページごとに分割し、情報を欠損させることなくコンテンツ生成に渡
  す事です）生成コンテンツが選択された投稿タイプを表現するテンプレートに対して、適切にフォ
  ーマットし、　生成プロンプトは選択した投稿タイプとペルソナに対しての成功パターンの「有益
  性」に基づいて、決定してるテンプレートに合わせてフォーマットによって分割された情報をコン
  テンツに昇華し生成する　　　というフローを確立し、そのために必要な４分析の手順と方法のガ
  イドラインを作成してください　４分析は100投稿全て行うので、Claude 
  codeはコンテキストの関係でセクションは都度新しくするので、途中での統合分析は行わず、常に
  一貫した作業をさせ100投稿の分析が終わった時点で、統合分析担当に分析させるようにしてくださ
  い　それが終わったら完成形のフローの実装がそのデータを元に始まるようにその後の計画手順も
  記載したドキュメントを別途作成してください   途中でコンテキストコンパクトが起こってもいい
  ように、このドキュメント作成に関してもいつでも引き継げるようにしながら作業してください
