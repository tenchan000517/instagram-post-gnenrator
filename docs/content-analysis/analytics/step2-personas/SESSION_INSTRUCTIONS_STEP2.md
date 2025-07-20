# セッション指示書 - ステップ②ペルソナID体系構築

## 📋 指示書の使い方

Step2の作業開始時は、該当するPhaseの指示をコピーして使用してください。

## 🎯 Phase 1: TypeID別ペルソナ統合分析

```
【ステップ②】ペルソナID体系構築分析を担当します。Phase 1のTypeID別ペルソナ統合分析を実行してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step2-personas/STEP2_ANALYSIS_PLAN.md
- docs/content-analysis/analytics/step1-post-types/POST_TYPE_CATEGORIZATION_COMPLETE.md（Step1成果物）

【分析対象データ】
- docs/content-analysis/results/persona-target/contents-XXX-persona.md（全100投稿）

【前提条件】
- Step1でTypeID体系が確定していること
- 全100投稿のTypeID割り当てが完了していること

【現在フェーズ】Phase 1: TypeID別ペルソナ統合分析
【作業記録先】docs/content-analysis/analytics/step2-personas/working/phase1-typeid-persona-extraction.md

重要：Step1で確定したTypeID分類に従い、TypeID別にペルソナを統合分析。PersonaID割り当ては Phase 2 で実施。
```

## 👥 Phase 2: PersonaID体系構築

```
【ステップ②】ペルソナID体系構築分析を担当します。Phase 2のPersonaID体系構築を実行してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step2-personas/STEP2_ANALYSIS_PLAN.md
- docs/content-analysis/analytics/step2-personas/working/phase1-typeid-persona-extraction.md（Phase1成果物）

【前提条件】
- Phase 1でTypeID別ペルソナ統合が完了していること

【現在フェーズ】Phase 2: PersonaID体系構築
【作業記録先】docs/content-analysis/analytics/step2-personas/working/phase2-personaid-construction.md

重要：全TypeID横断でペルソナを分析し、PersonaID=001~0XX の体系を構築。システム要件定義のIDベース連携に準拠。
```

## 🔗 Phase 3: TypeID×PersonaID連携設計

```
【ステップ②】ペルソナID体系構築分析を担当します。Phase 3のTypeID×PersonaID連携設計を実行してください。

【必読ドキュメント】
- docs/content-analysis/analytics/step2-personas/STEP2_ANALYSIS_PLAN.md
- docs/content-analysis/analytics/step2-personas/working/phase2-personaid-construction.md（Phase2成果物）
- docs/master/SYSTEM_REQUIREMENTS_DEFINITION.md（IDベース連携設計）

【前提条件】
- Phase 2でPersonaID体系が確定していること

【現在フェーズ】Phase 3: TypeID×PersonaID連携設計
【作業記録先】docs/content-analysis/analytics/step2-personas/working/phase3-typeid-personaid-mapping.md
【最終成果物】docs/content-analysis/analytics/step2-personas/PERSONA_ID_SYSTEM.md

重要：TypeID×PersonaIDの最適連携を設計し、ユーザーフローに実装可能な仕様を策定。Step3への完全な引き継ぎ準備。
```

## ⚠️ 重要な注意事項

### Step1依存関係の確認
- 作業開始前にStep1成果物の存在を必ず確認
- TypeID体系が確定していない場合は作業を停止
- TypeID変更があった場合は本Step全体を再実行

### PersonaID体系設計原則
- PersonaID=001から順次割り当て
- 重複・欠番のない連続体系を維持
- 将来の拡張を考慮した番号設計

### 品質保証要件
- PersonaID重複・矛盾の防止
- TypeID×PersonaID連携の論理的整合性
- 次ステップ（Step3）への完全引き継ぎ

---

**作成日**: 2025-07-19  
**用途**: Step2セッション継続作業指示  
**対象**: ペルソナID体系構築分析