import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { TemplateData, cleanMarkdown } from '../TemplateTypes';
import { getT009DynamicFontClass } from '../../../utils/fontUtils';

interface RankInfo {
  rank: number;
  category: string;
  score: string | number;
}

interface KeyMetrics {
  initialSalary: string;
  averageSalary: string;
  bonus: string;
  holidays: string;
  overtime: string;
}

interface ParameterGraph {
  salary: number;
  benefits: number;
  workLifeBalance: number;
  growth: number;
  stability: number;
}

interface CompanyFeatures {
  industry: string;
  employees: string;
  established: string;
  headquarters: string;
}

interface CompanyDetails {
  overview: string;
  recruitment: string[];
  benefits: string[];
  uniqueFeatures: string[];
  keyHighlights?: string[];
}

interface CompanyData {
  companyName: string;
  rankInfo: RankInfo;
  keyMetrics: KeyMetrics;
  parameterGraph: ParameterGraph;
  features: CompanyFeatures;
  details: CompanyDetails;
  highlightMessage?: string;
  logo?: string;
}

interface EnhancedCompanyDetailTemplateData extends TemplateData {
  displayMode: 'single' | 'dual';
  companies: CompanyData[];
}

interface EnhancedCompanyDetailTemplateProps {
  data: EnhancedCompanyDetailTemplateData;
  targetId?: string;
}

export function EnhancedCompanyDetailTemplate({ data, targetId }: EnhancedCompanyDetailTemplateProps) {
  const { displayMode, companies } = data;
  const dynamicFontClass = getT009DynamicFontClass(targetId);

  // 5角形レーダーチャートコンポーネント
  const ParameterRadarChart = ({ params, companyName, compact = false }: { params: ParameterGraph; companyName: string; compact?: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const parameters = [
      { name: '給与水準', value: params.salary },
      { name: '福利厚生', value: params.benefits },
      { name: 'WLB', value: params.workLifeBalance },
      { name: '成長性', value: params.growth },
      { name: '安定性', value: params.stability }
    ];

    const canvasSize = compact ? 200 : 240;
    const maxRadius = compact ? 50 : 85;
    const labelRadius = compact ? 50 : 115;

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // キャンバスクリア
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const numSides = 5;

      // 背景の5角形グリッドを描画
      for (let level = 1; level <= 5; level++) {
        const radius = (maxRadius * level) / 5;
        ctx.beginPath();
        for (let i = 0; i <= numSides; i++) {
          const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 軸線を描画
      for (let i = 0; i < numSides; i++) {
        const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
        const x = centerX + maxRadius * Math.cos(angle);
        const y = centerY + maxRadius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // データ値の5角形を描画
      ctx.beginPath();
      for (let i = 0; i <= numSides; i++) {
        const paramIndex = i % numSides;
        const value = parameters[paramIndex].value;
        const radius = (maxRadius * value) / 100;
        const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // データポイントを描画
      for (let i = 0; i < numSides; i++) {
        const value = parameters[i].value;
        const radius = (maxRadius * value) / 100;
        const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, compact ? 2 : 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = compact ? 1 : 2;
        ctx.stroke();
      }

      // ラベルを描画（コンパクト版では省略）
      if (!compact) {
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#374151';
        
        for (let i = 0; i < numSides; i++) {
          const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
          const x = centerX + labelRadius * Math.cos(angle);
          const y = centerY + labelRadius * Math.sin(angle);
          
          ctx.fillText(parameters[i].name, x, y);
        }

        // 数値ラベルを描画
        ctx.font = '10px sans-serif';
        ctx.fillStyle = '#1d4ed8';
        
        for (let i = 0; i < numSides; i++) {
          const value = parameters[i].value;
          const angle = (i * 2 * Math.PI) / numSides - Math.PI / 2;
          const valueRadius = (maxRadius * value) / 100 + 15;
          const x = centerX + valueRadius * Math.cos(angle);
          const y = centerY + valueRadius * Math.sin(angle);
          
          ctx.fillText(value.toString(), x, y);
        }
      }
    }, [params, compact]);

    return (
      <div className={compact ? "p-2" : "bg-gray-50 p-4 pb-0 rounded-lg"}>
        {!compact && companyName && (
          <h4 className={`text-lg font-semibold text-gray-800 mb-3 text-center ${dynamicFontClass}`}>
            {companyName} 企業評価
          </h4>
        )}
        <div className="flex justify-center pt-2">
          <canvas 
            ref={canvasRef}
            width={canvasSize + 40}
            height={canvasSize}
            className=""
          />
        </div>
      </div>
    );
  };

  // 単一企業表示コンポーネント
  const SingleCompanyCard = ({ company }: { company: CompanyData }) => (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* ヘッダーセクション */}
      <div className="relative text-white p-6" style={{backgroundColor: '#21266D'}}>
        {/* ランク表示 */}
        <div className="absolute top-4 left-4 bg-amber-400 text-gray-800 font-bold px-3 py-1 rounded-lg">
          <span className="inline-block pb-3">第{company.rankInfo.rank}位</span>
        </div>
        
        {/* 企業ロゴ */}
        {company.logo && (
          <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center">
            <Image 
              src={company.logo} 
              alt={`${company.companyName}ロゴ`}
              width={64}
              height={64}
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        )}
        
        {/* 企業名 */}
        <h1 className={`text-3xl font-bold mb-2 mt-6 ${dynamicFontClass}`}>
          {cleanMarkdown(company.companyName)}
        </h1>
        
        {/* ランキング情報 */}
        <p className={`text-lg opacity-90 mb-4 ${dynamicFontClass}`}>
          {company.rankInfo.category}: {company.rankInfo.score}
        </p>
        
        {/* ハイライトメッセージ */}
        {company.highlightMessage && (
          <div className={`bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg inline-block font-semibold ${dynamicFontClass}`}>
            ✨ {cleanMarkdown(company.highlightMessage)}
          </div>
        )}
      </div>

      <div className="p-6">
        {/* キーメトリクス */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className={`text-sm text-blue-600 font-medium ${dynamicFontClass}`}>初任給</div>
            <div className={`text-lg font-bold text-blue-800 ${dynamicFontClass}`}>
              {cleanMarkdown(company.keyMetrics.initialSalary)}
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className={`text-sm text-green-600 font-medium ${dynamicFontClass}`}>平均年収</div>
            <div className={`text-lg font-bold text-green-800 ${dynamicFontClass}`}>
              {cleanMarkdown(company.keyMetrics.averageSalary)}
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <div className={`text-sm text-purple-600 font-medium ${dynamicFontClass}`}>ボーナス</div>
            <div className={`text-lg font-bold text-purple-800 ${dynamicFontClass}`}>
              {cleanMarkdown(company.keyMetrics.bonus)}
            </div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className={`text-sm text-orange-600 font-medium ${dynamicFontClass}`}>年間休日</div>
            <div className={`text-lg font-bold text-orange-800 ${dynamicFontClass}`}>
              {cleanMarkdown(company.keyMetrics.holidays)}
            </div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-center">
            <div className={`text-sm text-red-600 font-medium ${dynamicFontClass}`}>平均残業</div>
            <div className={`text-lg font-bold text-red-800 ${dynamicFontClass}`}>
              {cleanMarkdown(company.keyMetrics.overtime)}
            </div>
          </div>
        </div>

        {/* メインコンテンツエリア */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左カラム: 企業情報 */}
          <div className="space-y-6">
            {/* 基本情報 */}
            <div>
              <h2 className={`text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 mb-4 ${dynamicFontClass}`}>
                基本情報
              </h2>
              <div className="space-y-2">
                <div className="flex">
                  <span className={`font-semibold text-gray-700 w-20 ${dynamicFontClass}`}>業界:</span>
                  <span className={`text-gray-600 ${dynamicFontClass}`}>{cleanMarkdown(company.features.industry)}</span>
                </div>
                <div className="flex">
                  <span className={`font-semibold text-gray-700 w-20 ${dynamicFontClass}`}>従業員:</span>
                  <span className={`text-gray-600 ${dynamicFontClass}`}>{cleanMarkdown(company.features.employees)}</span>
                </div>
                <div className="flex">
                  <span className={`font-semibold text-gray-700 w-20 ${dynamicFontClass}`}>設立:</span>
                  <span className={`text-gray-600 ${dynamicFontClass}`}>{cleanMarkdown(company.features.established)}</span>
                </div>
                <div className="flex">
                  <span className={`font-semibold text-gray-700 w-20 ${dynamicFontClass}`}>本社:</span>
                  <span className={`text-gray-600 ${dynamicFontClass}`}>{cleanMarkdown(company.features.headquarters)}</span>
                </div>
              </div>
            </div>

            {/* 企業概要 */}
            <div>
              <h2 className={`text-xl font-bold text-gray-800 border-b-2 border-green-500 pb-2 mb-4 ${dynamicFontClass}`}>
                企業概要
              </h2>
              <p className={`text-gray-700 leading-relaxed ${dynamicFontClass}`}>
                {cleanMarkdown(company.details.overview)}
              </p>
            </div>

            {/* 福利厚生 */}
            <div>
              <h2 className={`text-xl font-bold text-gray-800 border-b-2 border-purple-500 pb-2 mb-4 ${dynamicFontClass}`}>
                福利厚生・特徴
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {company.details.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center p-2 bg-purple-50 rounded-lg">
                    <span className="text-purple-600 mr-2">✓</span>
                    <span className={`text-gray-700 text-sm ${dynamicFontClass}`}>{cleanMarkdown(benefit)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右カラム: パラメータグラフと特徴 */}
          <div className="space-y-6">
            {/* パラメータグラフ */}
            <ParameterRadarChart params={company.parameterGraph} companyName={company.companyName} />

            {/* 独自の特徴 */}
            <div>
              <h2 className={`text-xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2 mb-4 ${dynamicFontClass}`}>
                この企業の特徴
              </h2>
              <div className="space-y-2">
                {company.details.uniqueFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-600 mr-2 mt-1">●</span>
                    <span className={`text-gray-700 ${dynamicFontClass}`}>{cleanMarkdown(feature)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 募集職種 */}
            <div>
              <h2 className={`text-xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-4 ${dynamicFontClass}`}>
                募集職種
              </h2>
              <div className="flex flex-wrap gap-2">
                {company.details.recruitment.map((position, index) => (
                  <span key={index} className={`bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium ${dynamicFontClass}`}>
                    {cleanMarkdown(position)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // デュアル表示コンポーネント
  const DualCompanyCard = ({ companies }: { companies: CompanyData[] }) => (
    <div className="w-full max-w-none mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
        {companies.slice(0, 2).map((company, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 flex-1">
            {/* ヘッダー */}
            <div className="text-white p-3 rounded-lg mb-3" style={{backgroundColor: '#21266D'}}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="bg-amber-400 text-gray-800 text-sm font-bold inline-block px-2 py-1 rounded-lg mb-1">
                    <span className="inline-block pb-3">第{company.rankInfo.rank}位</span>
                  </div>
                  <h2 className={`text-2xl font-bold ${dynamicFontClass}`}>
                    {cleanMarkdown(company.companyName)}
                  </h2>
                  <p className={`text-sm opacity-90 mb-4 ${dynamicFontClass}`}>
                    {company.rankInfo.category}: {company.rankInfo.score}
                  </p>
                </div>
                {company.logo && (
                  <div className="w-12 h-12 bg-white rounded p-1 flex items-center justify-center">
                    <Image 
                      src={company.logo} 
                      alt={`${company.companyName}ロゴ`}
                      width={48}
                      height={48}
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                )}
              </div>
            </div>

            {/* キーメトリクス（コンパクト版） */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-blue-50 p-2 rounded text-center">
                <div className={`text-xs text-blue-600 ${dynamicFontClass}`}>初任給</div>
                <div className={`text-sm font-bold text-blue-800 ${dynamicFontClass}`}>
                  {cleanMarkdown(company.keyMetrics.initialSalary)}
                </div>
              </div>
              <div className="bg-green-50 p-2 rounded text-center">
                <div className={`text-xs text-green-600 ${dynamicFontClass}`}>平均年収</div>
                <div className={`text-sm font-bold text-green-800 ${dynamicFontClass}`}>
                  {cleanMarkdown(company.keyMetrics.averageSalary)}
                </div>
              </div>
              <div className="bg-purple-50 p-2 rounded text-center">
                <div className={`text-xs text-purple-600 ${dynamicFontClass}`}>ボーナス</div>
                <div className={`text-sm font-bold text-purple-800 ${dynamicFontClass}`}>
                  {cleanMarkdown(company.keyMetrics.bonus)}
                </div>
              </div>
              <div className="bg-orange-50 p-2 rounded text-center">
                <div className={`text-xs text-orange-600 ${dynamicFontClass}`}>残業時間</div>
                <div className={`text-sm font-bold text-orange-800 ${dynamicFontClass}`}>
                  {cleanMarkdown(company.keyMetrics.overtime)}
                </div>
              </div>
            </div>

            {/* パラメータグラフ（コンパクト版） */}
            <div className="bg-white p-2 rounded-lg mb-3">
              <h4 className={`text-sm font-semibold text-gray-800 mb-2 ${dynamicFontClass}`}>企業評価</h4>
              <ParameterRadarChart params={company.parameterGraph} companyName="" compact={false} />
            </div>

            {/* 企業概要（短縮版） */}
            <div className="mb-4">
              <h3 className={`text-sm font-bold text-gray-800 mb-2 ${dynamicFontClass}`}>企業概要</h3>
              <p className={`text-sm text-gray-700 leading-relaxed ${dynamicFontClass}`}>
                {cleanMarkdown(company.details.overview.substring(0, 120))}
              </p>
            </div>

            {/* 4カラム特徴ボックス（1行） */}
            {company.details.keyHighlights && (
              <div className="mb-3">
                <div className="grid grid-cols-4 gap-1">
                  {company.details.keyHighlights.slice(0, 4).map((highlight, idx) => (
                    <div key={idx} className={`bg-${['purple', 'orange', 'indigo', 'green'][idx]}-100 border border-${['purple', 'orange', 'indigo', 'green'][idx]}-300 rounded px-1 py-0.5 flex items-center justify-center`}>
                      <span className={`text-xs font-bold text-${['purple', 'orange', 'indigo', 'green'][idx]}-700 mb-2 ${dynamicFontClass}`} style={{fontSize: '10px'}}>
                        {cleanMarkdown(highlight)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 主要な特徴（上位3つ） */}
            <div>
              <h3 className={`text-sm font-bold text-gray-800 mb-2 ${dynamicFontClass}`}>主要な特徴</h3>
              <div className="space-y-1">
                {company.details.uniqueFeatures.slice(0, 3).map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <span className="text-orange-600 mr-1 text-xs">●</span>
                    <span className={`text-xs text-gray-700 ${dynamicFontClass}`}>
                      {cleanMarkdown(feature.substring(0, 80))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full px-4">
      {displayMode === 'dual' && companies.length >= 2 ? (
        <DualCompanyCard companies={companies} />
      ) : (
        companies.map((company, index) => (
          <div key={index} className={index > 0 ? 'mt-8' : ''}>
            <SingleCompanyCard company={company} />
          </div>
        ))
      )}
    </div>
  );
}

// メタデータ
export const enhancedCompanyDetailMetadata = {
  id: 'enhanced_company_detail',
  name: '企業詳細表示（改良版）',
  description: 'ランキング対応・パラメータグラフ・2社同時表示対応の企業詳細テンプレート',
  suitableFor: {
    contentTypes: ['企業ランキング', '企業比較', '企業詳細紹介'],
    genres: ['就活系', '転職系', '企業研究系'],
    dataStructure: ['企業データ', 'ランキング情報', '数値データ'],
    complexity: 'complex' as const,
    pageCount: { min: 1, max: 10 }
  },
  characterLimits: {
    companyName: 30,
    overview: 400,
    benefits: 50,
    uniqueFeatures: 100,
    highlightMessage: 80
  },
  keywords: ['企業', 'ランキング', '比較', '詳細', '評価', 'パラメータ']
};

export default EnhancedCompanyDetailTemplate;