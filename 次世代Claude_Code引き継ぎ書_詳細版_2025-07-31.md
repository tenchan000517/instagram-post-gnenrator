# 次世代Claude Code引き継ぎ書_詳細版_2025-07-31

## 🎯 最新作業概要 - キャプション生成ロジック改善

**プロジェクト:** Instagram Post Generator - T009フォント対応完了・キャプション改善待機
**作業状況:** T009専用フォント完全実装・テンプレートUI大幅改善完了
**次のステップ:** キャプション生成ロジックの改善（ターゲット・投稿タイプ別対応）

## 🚀 前回完了：T009ターゲット専用フォント対応完全実装

### ✅ 実装完了内容
1. **T009フォント機能完全実装**
   - T009選択時：M PLUS Rounded 1c フォント自動適用
   - その他：Noto Sans JP フォント使用
   - Next.jsフォント最適化による確実なWebフォントロード

2. **全テンプレート対応完了（11個）**
   - BasicIntroTemplate ✅
   - AchievementSummaryTemplate ✅  
   - 全unifiedテンプレート（9個）✅

3. **テンプレートUI改善**
   - AchievementSummaryTemplate：ヘッダー形式に統一、位置ズレ解決
   - BasicIntroTemplate：レイアウト最適化（余白縮小・幅調整・背景削除）

### 🔧 技術実装詳細
**実装ファイル:**
```typescript
// app/utils/fontUtils.ts - T009判定・フォント適用
export function isT009Target(targetId?: string): boolean
export function getT009DynamicFontClass(targetId?: string): string
export function getT009BackgroundClass(targetId?: string): string

// app/layout.tsx - Next.jsフォント最適化
import { M_PLUS_Rounded_1c } from 'next/font/google'

// app/globals.css - T009専用CSS
.font-t009-special {
  font-family: var(--font-mplus-rounded), 'Comic Sans MS', cursive !important;
}
```

**解決した技術課題:**
- CSS詳細度問題：`!important`で解決
- h1要素位置ズレ：flexbox中央配置で解決
- Webフォントロード問題：Next.js最適化で解決

## 🎯 次タスク：キャプション生成ロジック改善

### 現状の問題点
1. **ターゲット別指示未対応**
   - 現在のキャプションがターゲット（T001-T023等）に応じた内容になっていない
   - 投稿タイプ（001-004）別の指示も反映されていない

2. **不要な煽りワード使用**
   - 「必見！」等の煽りワードが含まれている
   - より自然で価値提供重視の文言に変更が必要

3. **不適切な固定フレーズ**
   - 「4年間で40年分のキャリアネットワークを構築する。」
   - このフレーズは削除対象

### 改善方向性
- ターゲット特性に応じたパーソナライズされたキャプション
- 投稿タイプの目的に合致した文言
- 煽り表現を排除し、価値提供中心の自然な文章
- 固定フレーズの削除・最適化

### 次回作業指針
1. **現在のキャプション生成箇所を特定**
   - どのファイル・関数でキャプションを生成しているか
   - ターゲットIDや投稿タイプの参照状況

2. **ターゲット別特性の把握**
   - T001-T023各ターゲットの特徴
   - 適切な文言・トーンの設計

3. **投稿タイプ別目的の理解**
   - 001-004各タイプの目的・用途
   - タイプ別最適キャプション設計

### 削除・改善対象
- ❌ 「必見！」等の煽りワード
- ❌ 「4年間で40年分のキャリアネットワークを構築する。」
- ✅ 価値提供中心の自然な文章
- ✅ ターゲット・タイプ別パーソナライズ

---

## 📋 過去完了：K002構造統一作業

📋 完了済み作業

1. K002 Page2-6の構造統一完了

全ページでpracticalSkill構造 → sections構造への変換を完了
- Page2: 選択肢を増やす思考法 → description + list レイアウト
- Page3: 強みを活かせる働き方 → description + list レイアウト  
- Page4: 自信を持てる習慣 → description + actionplan レイアウト
- Page5: 冷静な判断習慣 → effect + method レイアウト（構成大幅改善）
- Page6: 働き方選択肢拡張 → description + list レイアウト

2. マスタードキュメント革新的強化

追加項目:
- 構造変換とセクション名設計の指針: テンプレート構造絶対維持・抽象語排除
- ブラッシュアップの思考プロセス: 一貫性確保・女性ターゲット向け用語選択・主体性向上・価値連結
- 「なります」冗長性回避ルール: 「〜ようになります」→「〜ように」省略
- footerText設計の高度な思考プロセス: ページ性質判断・暗黙動詞判定・一貫性維持
- sections.content表現の具体例集: 解釈の幅拡張という設計思想

🚨 重要な発見と新しい設計思想

1. 「解釈の幅の拡張」という設計思想の確立

発見: 単なる冗長性回避ではなく、読者の解釈可能性を広げることが本質
実例: "準備" = "準備する/しておく/します"等の複数解釈が可能

この思想により、より多くの読者にとって意味のある内容を提供可能

2. footerText設計の高度化

従来: 「ですます調維持」程度の理解
現在: ページ全体の性質に応じた戦略的設計

思考プロセス:
- roleから意図把握
- detailedContent全体分析  
- アクションプラン型 vs 効果説明型の判定
- 暗黙動詞の正確な判定（「する」系 vs 「なります」系）
- 一貫性維持した設計

3. セクション名の抽象語排除徹底

「メリット」「理由」「こうなれます」「ポイント」「方法」等の抽象語は完全NG
具体的な変化・状態を表現する直接的な名前が必須

🎯 残作業: Page7-8の修正

Phase 1: Page7の構造変換

現在の構造: chunkInfo + content（benefitsOfLearning + importantMessage）
目標: sections構造への統一変換

Page7の特徴:
- role: "苦手克服より得意を伸ばして輝く方法"
- 「方法」を約束しているが、現在は効果説明のみ
- Page5と同様の構成問題の可能性あり

期待される修正方向性:
1. ページ性質の判定: 方法提供 vs 効果説明
2. セクション名の具体化: 抽象語排除
3. 「なります」冗長性回避の適用
4. footerText設計の戦略的思考

Phase 2: Page8の構造変換

現在の構造: 独自のdetails構造
目標: sections構造への統一変換

Page8の特徴:
- 最終ページとしての特殊性
- まとめ的性格
- 実践的アクションプランの提供

📖 重要な学習ポイント

sections.content表現の3パターン

1. 「〜ように」パターン（意図・目的）:
   例: "自信を持てるように" = "自信を持てるようになります"の省略

2. 「〜ように」パターン（意図的行為）:
   例: "思えるように" = "思うようにする"の暗黙表現

3. 「名詞完結」パターン（解釈の幅拡張）:
   例: "準備" = "準備する/しておく/します"等の複数解釈が可能

footerText設計の判断基準

アクションプラン提供型: 行動促進で一貫性維持
例: "まずは立ち止まることから始めてみましょう"

効果説明型: 結果確認・完結感の提供
例: "選択肢があると心に余裕が生まれます"

判定方法:
1. roleから「方法」「習慣」等のキーワード確認
2. detailedContent全体の性質分析
3. セクション内容の暗黙動詞判定

🔧 実用的なリソース

マスタードキュメントパス（必読）

/mnt/c/instagram-course/instagram-post-generator/docs/template-placement-rules-master.md

特に重要な箇所:
- 構造変換とセクション名設計の指針
- ブラッシュアップの思考プロセス  
- footerText設計の高度な思考プロセス
- sections.content表現の具体例集

修正対象ファイル

/mnt/c/instagram-course/instagram-post-generator/app/data/knowledgeBase/knowledge/type002/K002.json

Page7: 行228-241
Page8: 行242-263

テンプレート構造定義

/mnt/c/instagram-course/instagram-post-generator/app/services/knowledgeBase/data/pageStructures/unified/unified-template-08-section-blocks.json

💡 継続のポイント

1. マスタードキュメントを最初に熟読 - 特にfooterText設計の高度な思考プロセス
2. Page2-6の完成品を参考にする - 同品質を目指す
3. 解釈の幅拡張という設計思想を意識 - 読者の立場に立った表現選択
4. 具体例集への新規パターン追加 - 継続的な知識蓄積

現在の品質レベル: Page2-6は女性ターゲット向けType002の理想形として完成。構造統一・表現洗練・設計思想の確立により、次世代Instagram投稿生成の新基準を設定。この水準でPage7-8も完成させることが目標。

🎯 成功の判断基準

1. sections構造への完全統一
2. 抽象語を排除した具体的なセクション名
3. 「なります」冗長性回避の適切な適用
4. ページ性質に応じたfooterText設計
5. 解釈の幅拡張を意識した表現選択
6. マスタードキュメントへの新規パターン追加

この引き継ぎ書により、次世代Claude Codeも同じ思考プロセスで同品質の修正が可能になることを期待する。