#!/usr/bin/env node
/**
 * バッチ4の不完全評価補完スクリプト
 * 現在3項目（immediacy, simplicity, popularity）のみ評価済み
 * 残り3項目（costPerformance, specialization, productivityGain）を追加評価
 */

const fs = require('fs');
const path = require('path');

const RESEARCH_DIR = path.join(__dirname, 'research-results');
const BATCH4_FILE = path.join(RESEARCH_DIR, 'batch4-complete-results.json');

// バッチ4の8ツールの不足評価項目データ
const batch4AdditionalEvaluations = {
  "T025": { // Jasper AI
    toolName: "Jasper AI",
    additionalScores: {
      costPerformance: 75,  // $49/月は高めだがROI高
      specialization: 90,   // マーケティングコンテンツ特化
      productivityGain: 85  // ブランド一貫性で生産性大幅向上
    }
  },
  "T026": { // Copy.ai
    toolName: "Copy.ai",
    additionalScores: {
      costPerformance: 80,  // $49/月、GTMプラットフォーム
      specialization: 85,   // GTM・セールスコピー特化
      productivityGain: 90  // チームサイズ1/3削減の実績
    }
  },
  "T027": { // Grammarly
    toolName: "Grammarly",
    additionalScores: {
      costPerformance: 85,  // $12-15/月で高機能
      specialization: 80,   // 文章校正・改善特化
      productivityGain: 85  // 文章品質大幅向上
    }
  },
  "T028": { // Writesonic
    toolName: "Writesonic",
    additionalScores: {
      costPerformance: 90,  // $13-16/月でオールインワン
      specialization: 85,   // SEO・コンテンツマーケティング特化
      productivityGain: 80  // 10+ツール置換え
    }
  },
  "T029": { // Descript
    toolName: "Descript",
    additionalScores: {
      costPerformance: 75,  // $12-24/月、専門性考慮
      specialization: 95,   // 音声・動画編集AI特化
      productivityGain: 90  // テキストベース編集で劇的効率化
    }
  },
  "T030": { // Loom AI
    toolName: "Loom AI",
    additionalScores: {
      costPerformance: 70,  // $8-12/月だがAI機能制限
      specialization: 85,   // 動画コミュニケーション特化
      productivityGain: 95  // 会議削減（88M動画で202M会議削減）
    }
  },
  "T031": { // Calendly AI
    toolName: "Calendly AI",
    additionalScores: {
      costPerformance: 80,  // $8-16/月で高ROI
      specialization: 80,   // スケジューリング自動化特化
      productivityGain: 90  // スケジュール調整完全自動化
    }
  },
  "T032": { // Zapier AI
    toolName: "Zapier AI",
    additionalScores: {
      costPerformance: 70,  // $20+/月だが8000+アプリ連携
      specialization: 95,   // ワークフロー自動化最大手
      productivityGain: 95  // 業務自動化で劇的効率向上
    }
  }
};

function completeBatch4Evaluation() {
  console.log('🔧 バッチ4不完全評価補完開始');
  console.log('='.repeat(50));
  
  if (!fs.existsSync(BATCH4_FILE)) {
    console.log('❌ batch4-complete-results.json が見つかりません');
    return false;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(BATCH4_FILE, 'utf8'));
    const tools = data.tools || [];
    
    if (tools.length !== 8) {
      console.log(`⚠️  期待する8ツールと異なります: ${tools.length}ツール`);
    }
    
    console.log(`📊 ${tools.length}ツールの評価補完を開始`);
    let completedCount = 0;
    
    tools.forEach((tool) => {
      const toolId = tool.toolId;
      const additional = batch4AdditionalEvaluations[toolId];
      
      if (additional && tool.tenEvaluation) {
        const eval = tool.tenEvaluation;
        
        // 既存の評価状況確認
        console.log(`\n🔍 ${additional.toolName} (${toolId})`);
        console.log(`   現在: 即効性:${eval.immediacy} 簡単さ:${eval.simplicity} 人気度:${eval.popularity}`);
        console.log(`   現在: コスパ:${eval.costPerformance} 専門性:${eval.specialization} 生産性:${eval.productivityGain}`);
        
        // 不足項目を補完
        eval.costPerformance = additional.additionalScores.costPerformance;
        eval.specialization = additional.additionalScores.specialization;
        eval.productivityGain = additional.additionalScores.productivityGain;
        
        // totalScore再計算
        const totalScore = eval.immediacy + eval.simplicity + eval.popularity + 
                          eval.costPerformance + eval.specialization + eval.productivityGain;
        eval.totalScore = totalScore;
        
        console.log(`   補完後: コスパ:${eval.costPerformance} 専門性:${eval.specialization} 生産性:${eval.productivityGain}`);
        console.log(`   ✅ 総合スコア: ${totalScore}点`);
        
        completedCount++;
      } else {
        console.log(`⚠️  ${tool.name}: 評価データが見つかりません (${toolId})`);
      }
    });
    
    // ファイル保存
    fs.writeFileSync(BATCH4_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log(`\n🎉 バッチ4評価補完完了: ${completedCount}/${tools.length}ツール補完済み`);
    console.log(`📁 保存先: ${BATCH4_FILE}`);
    
    return completedCount === tools.length;
    
  } catch (error) {
    console.log(`❌ エラー: ${error.message}`);
    return false;
  }
}

if (require.main === module) {
  const success = completeBatch4Evaluation();
  console.log('\n' + '='.repeat(50));
  if (success) {
    console.log('🎉 バッチ4の全8ツール評価補完完了！');
    console.log('次は全78ツールでマスターデータベース再統合を行ってください。');
  } else {
    console.log('⚠️  評価補完に問題がありました。確認が必要です。');
  }
  process.exit(success ? 0 : 1);
}

module.exports = { completeBatch4Evaluation };