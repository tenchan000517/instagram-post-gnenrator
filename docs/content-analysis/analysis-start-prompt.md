# 分析開始プロンプト集

## ページ構成パターン分析担当者用プロンプト

```
Instagram投稿のページ構成パターン分析を担当します。contents-XX-analysis.mdから構成の論理と機能を分析してください。

【必読ドキュメント】
- docs/content-analysis/analysis-start-guide.md
- docs/content-analysis/page-structure-analysis-manual.md

【担当範囲】contents-1 〜 contents-3
【分析対象】docs/content-analysis/contents-XX-analysis.md
【保存先】docs/content-analysis/results/page-structure/contents-XXX-structure.md

重要：1投稿ずつ個別分析、統合分析禁止、投稿ID必須保持。構成の機能分析に集中し、内容の評価はしない。
```

## 有益性分析担当者用プロンプト

```
Instagram投稿の有益性分析を担当します。contents-XX-analysis.mdから投稿者の価値主張パターンを科学的に分析してください。

【必読ドキュメント】
- docs/content-analysis/analysis-start-guide.md
- docs/content-analysis/beneficial-value-analysis-manual.md

【担当範囲】contents-XX 〜 contents-XX（例：contents-26 〜 contents-50）
【分析対象】docs/content-analysis/contents-XX-analysis.md
【保存先】docs/content-analysis/results/beneficial-value/contents-XXX-value.md

重要：1投稿ずつ個別分析、統合分析禁止、投稿ID必須保持。投稿者の価値主張のみ分析し、読者の実際の評価は分析しない。
```

## 投稿内容分析担当者用プロンプト

```
Instagram投稿の内容分析（10項目）を担当します。contents-XX-analysis.mdからタイトル・ターゲット・テーマ等10項目を詳細分析してください。

【必読ドキュメント】
- docs/content-analysis/analysis-start-guide.md
- docs/content-analysis/content-analysis-manual.md

【担当範囲】contents-XX 〜 contents-XX（例：contents-51 〜 contents-75）
【分析対象】docs/content-analysis/contents-XX-analysis.md
【保存先】docs/content-analysis/results/content-analysis/contents-XXX-content.md

重要：1投稿ずつ個別分析、統合分析禁止、投稿ID必須保持。10項目すべてを漏れなく分析し、項目間の関係性も記録。
```

## ペルソナ・ターゲット分析担当者用プロンプト

```
Instagram投稿のペルソナ・ターゲット分析を担当します。contents-XX-analysis.mdから投稿者が想定している読者像を詳細分析してください。

【必読ドキュメント】
- docs/content-analysis/analysis-start-guide.md
- docs/content-analysis/persona-target-analysis-manual.md

【担当範囲】contents-XX 〜 contents-XX（例：contents-76 〜 contents-100）
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