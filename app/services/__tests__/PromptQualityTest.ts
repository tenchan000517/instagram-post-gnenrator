/**
 * Phase C3: プロンプト品質検証テスト
 * 
 * 作成したプロンプトシステムの動作確認と品質検証
 */

import { PromptGenerator, PromptGenerationRequest } from '../PromptGenerator'
import { PromptTemplates } from '../PromptTemplates'
import { KnowledgeStructurePreserver } from '../KnowledgeStructurePreserver'
import { FactualConstraintsEnforcer } from '../FactualConstraintsEnforcer'

/**
 * テスト用サンプルナレッジデータ
 */
const SAMPLE_KNOWLEDGE = {
  careerTroubles: `
面接で緊張して声が震えてしまう悩みを抱えていました。
何度も練習しても本番では同じことの繰り返し。
そこで実際に試してみた3つの方法が効果的でした。

1. 面接前の深呼吸法
面接会場に着いたら、必ず5分間の深呼吸を実践。
4秒で息を吸い、8秒で息を吐く。これを5回繰り返す。

2. 手のひらに「人」を書く
昔からの方法ですが、実際に心理的効果があります。
面接直前に手のひらに「人」の字を3回書いて、それを飲み込む動作をする。

3. 第一声は練習通りに
「よろしくお願いします」の部分だけは必ず練習通りに言う。
最初がうまくいくと、その後の流れも改善されました。

実際にこの方法で、声の震えは90%以上改善。
3社の面接全てで内定をいただくことができました。
`,

  skillDevelopment: `
プレゼンテーション能力向上のための体系的学習法について説明します。

基礎段階（1-2週目）
- 発声練習：毎日15分の発声トレーニング
- 姿勢改善：鏡の前でのポスチャー確認
- アイコンタクト：家族・友人との練習

理論学習（3-4週目）
- ストーリーテリングの構造理解
- データビジュアルの効果的活用法
- 聴衆分析の手法習得

実践練習（5-6週目）
- 1分間プレゼンテーション（毎日実施）
- フィードバック収集と改善
- 緊張対策の実践

応用・マスター（7-8週目）
- 実際のプレゼンテーション機会での実践
- 録画での自己分析
- 継続的改善プランの策定

8週間でプレゼンテーション評価が5点満点中3.2点から4.6点に向上しました。
`,

  industryInfo: `
IT業界の年収データ分析結果（2024年調査）

企業規模別平均年収
- 大手企業（従業員1000人以上）：720万円
- 中堅企業（従業員100-999人）：580万円  
- スタートアップ（従業員100人未満）：650万円

職種別年収ランキング
1位：AIエンジニア（平均年収：850万円）
2位：データサイエンティスト（平均年収：780万円）
3位：セキュリティエンジニア（平均年収：740万円）
4位：フルスタックエンジニア（平均年収：680万円）
5位：フロントエンドエンジニア（平均年収：620万円）

地域別格差
- 東京都：平均650万円（全国比+18%）
- 大阪府：平均580万円（全国比+5%）
- 愛知県：平均560万円（全国比+2%）
- 福岡県：平均520万円（全国比-6%）

出典：IT人材白書2024（経済産業省、2024年3月発表）
`,

  efficiency: `
レポート作成時間を3分の1に短縮する効率化テクニック

問題：1つのレポートに8時間かかっていた
解決：以下の手法で2.5時間に短縮

手法1：テンプレート活用
- レポート構成テンプレートを事前作成
- 各章の文字数目安を明記
- チェックリスト形式の確認項目準備
効果：構成決定時間が20分→5分に短縮

手法2：情報収集の効率化  
- 情報源リストの事前準備
- ブックマーク整理で検索時間削減
- AIツールによる要約機能活用
効果：情報収集時間が3時間→45分に短縮

手法3：執筆環境の最適化
- デュアルモニター環境構築
- 音声入力ツールの併用
- 集中時間の確保（タイマー使用）
効果：執筆時間が4時間→1.5時間に短縮

総合効果：8時間→2.5時間（68%の時間短縮）
3ヶ月継続で、レポート品質も向上しました。
`
}

/**
 * プロンプト品質検証テストスイート
 */
export class PromptQualityTest {

  /**
   * 基本機能テスト
   */
  static runBasicFunctionTests(): void {
    console.log('🧪 基本機能テスト開始')
    
    // 1. 投稿タイプテンプレート取得テスト
    console.log('\n1. 投稿タイプテンプレート取得テスト')
    try {
      const postTypes = PromptTemplates.getPostTypes()
      console.log('✅ 取得成功:', postTypes)
      
      postTypes.forEach(type => {
        const template = PromptTemplates.getTemplateByType(type)
        console.log(`  - ${type}: ${template.description}`)
      })
    } catch (error) {
      console.error('❌ テンプレート取得エラー:', error)
    }
    
    // 2. ナレッジ構造分析テスト
    console.log('\n2. ナレッジ構造分析テスト')
    try {
      const structure = KnowledgeStructurePreserver.analyzeKnowledgeStructure(
        SAMPLE_KNOWLEDGE.careerTroubles
      )
      console.log('✅ 構造分析成功:', {
        structureType: structure.structureType,
        flowPattern: structure.flowPattern,
        keyElementsCount: structure.keyElements.length
      })
    } catch (error) {
      console.error('❌ 構造分析エラー:', error)
    }
    
    // 3. 事実厳守制約テスト
    console.log('\n3. 事実厳守制約テスト')
    try {
      const constraints = FactualConstraintsEnforcer.generateFactualConstraintsPrompt()
      console.log('✅ 制約生成成功:', constraints.length, '文字')
      
      // 推測表現検出テスト
      const testText = 'おそらく効果があると思われます。一般的には良い結果が期待されるでしょう。'
      const detected = FactualConstraintsEnforcer.detectSpeculativeLanguage(testText)
      console.log('  推測表現検出:', detected)
    } catch (error) {
      console.error('❌ 制約生成エラー:', error)
    }
  }

  /**
   * 投稿タイプ別プロンプト生成テスト
   */
  static runPostTypePromptTests(): void {
    console.log('\n🎯 投稿タイプ別プロンプト生成テスト開始')
    
    const testCases = [
      {
        postType: 'キャリア悩み解決法',
        knowledge: SAMPLE_KNOWLEDGE.careerTroubles,
        userIntent: '面接で緊張する人の不安を和らげる投稿にしたい'
      },
      {
        postType: 'スキルアップガイド',  
        knowledge: SAMPLE_KNOWLEDGE.skillDevelopment,
        userIntent: '体系的な学習方法を教える投稿にしたい'
      },
      {
        postType: '業界・企業情報まとめ',
        knowledge: SAMPLE_KNOWLEDGE.industryInfo,
        userIntent: '客観的なデータを伝える投稿にしたい'
      },
      {
        postType: '効率アップテクニック',
        knowledge: SAMPLE_KNOWLEDGE.efficiency,
        userIntent: '実用的な時短術を紹介する投稿にしたい'
      }
    ]
    
    testCases.forEach((testCase, index) => {
      console.log(`\n${index + 1}. ${testCase.postType}テスト`)
      try {
        const request: PromptGenerationRequest = {
          knowledgeContent: testCase.knowledge,
          postType: testCase.postType,
          userIntent: testCase.userIntent
        }
        
        const result = PromptGenerator.generateOptimizedPrompt(request)
        
        console.log('✅ プロンプト生成成功')
        console.log(`  - プロンプト長: ${result.prompt.length}文字`)
        console.log(`  - 構造タイプ: ${result.structure.structureType}`)
        console.log(`  - 品質スコア: ${result.metadata.quality.overallScore}/100`)
        console.log(`  - 警告数: ${result.metadata.warnings.length}件`)
        console.log(`  - 推奨事項: ${result.metadata.recommendations.length}件`)
        
        if (result.metadata.warnings.length > 0) {
          console.log('  警告:', result.metadata.warnings[0])
        }
        
      } catch (error) {
        console.error(`❌ ${testCase.postType}生成エラー:`, error)
      }
    })
  }

  /**
   * プロンプト品質検証テスト
   */
  static runQualityValidationTests(): void {
    console.log('\n📊 プロンプト品質検証テスト開始')
    
    // テストケース：良質なプロンプト
    console.log('\n1. 良質なプロンプトテスト')
    try {
      const request: PromptGenerationRequest = {
        knowledgeContent: SAMPLE_KNOWLEDGE.careerTroubles,
        postType: 'キャリア悩み解決法',
        userIntent: '読者に共感と安心感を与える投稿'
      }
      
      const generated = PromptGenerator.generateOptimizedPrompt(request)
      const validation = PromptGenerator.validatePrompt(generated, SAMPLE_KNOWLEDGE.careerTroubles)
      
      console.log('✅ 品質検証完了')
      console.log(`  - 有効性: ${validation.isValid ? '有効' : '無効'}`)
      console.log(`  - 構造スコア: ${validation.structureScore}/100`)
      console.log(`  - 事実スコア: ${validation.factualScore}/100`)
      console.log(`  - 違反数: ${validation.violations.length}件`)
      
    } catch (error) {
      console.error('❌ 品質検証エラー:', error)
    }
    
    // テストケース：問題のあるテキストでの検証
    console.log('\n2. 問題のあるテキスト検証テスト')
    try {
      const problematicText = `
      おそらく面接では緊張すると思われます。
      一般的に深呼吸が効果的でしょう。
      推測ですが90%以上の人に効果があるはずです。
      `
      
      const detectedIssues = FactualConstraintsEnforcer.detectSpeculativeLanguage(problematicText)
      console.log('✅ 問題検出成功')
      console.log('  - 推測表現:', detectedIssues)
      
      const compliance = FactualConstraintsEnforcer.calculateFactualComplianceScore(
        SAMPLE_KNOWLEDGE.careerTroubles,
        problematicText
      )
      console.log(`  - 事実厳守スコア: ${compliance.score}/100`)
      console.log(`  - 重大な違反: ${compliance.criticalViolations}件`)
      
    } catch (error) {
      console.error('❌ 問題検出エラー:', error)
    }
  }

  /**
   * バッチ処理テスト
   */
  static runBatchProcessingTests(): void {
    console.log('\n🔄 バッチ処理テスト開始')
    
    try {
      const results = PromptGenerator.generateMultiTypePrompts(
        SAMPLE_KNOWLEDGE.careerTroubles,
        '読者に寄り添う投稿にしたい',
        ['キャリア悩み解決法', 'スキルアップガイド', '効率アップテクニック']
      )
      
      console.log('✅ バッチ処理成功')
      console.log(`  - 生成件数: ${results.size}件`)
      
      const generatedPrompts = Array.from(results.values())
      const statistics = PromptGenerator.getGenerationStatistics(generatedPrompts)
      
      console.log('📈 統計情報:')
      console.log(`  - 平均構造スコア: ${statistics.averageStructureScore}/100`)
      console.log(`  - 平均事実スコア: ${statistics.averageFactualScore}/100`)
      console.log(`  - 平均総合スコア: ${statistics.averageOverallScore}/100`)
      console.log(`  - 最高パフォーマンス: ${statistics.bestPerformingType}`)
      console.log('  - 品質分布:', statistics.qualityDistribution)
      
    } catch (error) {
      console.error('❌ バッチ処理エラー:', error)
    }
  }

  /**
   * パフォーマンステスト
   */
  static runPerformanceTests(): void {
    console.log('\n⚡ パフォーマンステスト開始')
    
    const iterations = 10
    const startTime = performance.now()
    
    try {
      for (let i = 0; i < iterations; i++) {
        const request: PromptGenerationRequest = {
          knowledgeContent: SAMPLE_KNOWLEDGE.careerTroubles,
          postType: 'キャリア悩み解決法',
          userIntent: `テスト実行${i + 1}回目`
        }
        
        PromptGenerator.generateOptimizedPrompt(request)
      }
      
      const endTime = performance.now()
      const averageTime = (endTime - startTime) / iterations
      
      console.log('✅ パフォーマンステスト完了')
      console.log(`  - 実行回数: ${iterations}回`)
      console.log(`  - 総実行時間: ${Math.round(endTime - startTime)}ms`)
      console.log(`  - 平均実行時間: ${Math.round(averageTime)}ms/回`)
      
      // パフォーマンス評価
      if (averageTime < 50) {
        console.log('🚀 優秀: 50ms未満')
      } else if (averageTime < 100) {
        console.log('✅ 良好: 100ms未満')
      } else {
        console.log('⚠️ 改善推奨: 100ms以上')
      }
      
    } catch (error) {
      console.error('❌ パフォーマンステストエラー:', error)
    }
  }

  /**
   * 全テスト実行
   */
  static runAllTests(): void {
    console.log('🧪===============================')
    console.log('🧪 Phase C3 プロンプト品質検証テスト')
    console.log('🧪===============================')
    
    try {
      this.runBasicFunctionTests()
      this.runPostTypePromptTests()
      this.runQualityValidationTests()
      this.runBatchProcessingTests()
      this.runPerformanceTests()
      
      console.log('\n🎉===============================')
      console.log('🎉 全テスト実行完了')
      console.log('🎉===============================')
      
    } catch (error) {
      console.error('❌ テスト実行中にエラーが発生:', error)
    }
  }

  /**
   * 実際のナレッジデータでのテスト実行
   */
  static runWithRealKnowledgeData(knowledgeData: string): void {
    console.log('\n🔍 実際のナレッジデータでのテスト')
    
    const postTypes = ['キャリア悩み解決法', 'スキルアップガイド', '業界・企業情報まとめ', '効率アップテクニック']
    
    postTypes.forEach(postType => {
      try {
        const request: PromptGenerationRequest = {
          knowledgeContent: knowledgeData,
          postType,
          userIntent: '読者にとって価値のある投稿にしたい'
        }
        
        const result = PromptGenerator.generateOptimizedPrompt(request)
        const validation = PromptGenerator.validatePrompt(result, knowledgeData)
        
        console.log(`\n${postType}:`)
        console.log(`  スコア: ${result.metadata.quality.overallScore}/100`)
        console.log(`  有効性: ${validation.isValid ? '✅' : '❌'}`)
        console.log(`  警告: ${result.metadata.warnings.length}件`)
        
        if (result.metadata.warnings.length > 0) {
          result.metadata.warnings.forEach(warning => {
            console.log(`    - ${warning}`)
          })
        }
        
      } catch (error) {
        console.error(`❌ ${postType}テストエラー:`, error)
      }
    })
  }
}

// テスト実行用のエクスポート
export { SAMPLE_KNOWLEDGE }