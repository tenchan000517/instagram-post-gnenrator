import React from 'react';

interface CompanyFeatures {
  industry: string;
  salary?: string;
  deadline?: string;
  workingHours?: string;
  holidays?: string;
  employees?: string;
  overtime?: string;
}

interface CompanyDetails {
  overview: string;
  recruitment: string[];
  hiringCount?: string;
  benefits?: string[];
}

interface CompanyDetailTemplateData {
  companyName: string;
  catchphrase?: string;
  logo?: string;
  backgroundImage?: string;
  features: CompanyFeatures;
  details: CompanyDetails;
  selectionProcess?: string[];
  illustration?: string;
  highlightMessage?: string;
  additionalInfo?: string;
}

interface CompanyDetailTemplateProps {
  data: CompanyDetailTemplateData;
}

const CompanyDetailTemplate: React.FC<CompanyDetailTemplateProps> = ({ data }) => {
  const {
    companyName,
    catchphrase,
    logo,
    backgroundImage,
    features,
    details,
    selectionProcess,
    illustration,
    highlightMessage,
    additionalInfo
  } = data;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* ヘッダーセクション */}
      <div 
        className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8"
        style={backgroundImage ? { 
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(67, 56, 202, 0.8)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
        {/* 企業ロゴ */}
        {logo && (
          <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center">
            <img src={logo} alt={`${companyName}ロゴ`} className="max-w-full max-h-full object-contain" />
          </div>
        )}
        
        {/* 企業名 */}
        <h1 className="text-4xl font-bold mb-2">{companyName}</h1>
        
        {/* キャッチフレーズ */}
        {catchphrase && (
          <p className="text-xl opacity-90 mb-4">{catchphrase}</p>
        )}
        
        {/* ハイライトメッセージ */}
        {highlightMessage && (
          <div className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg inline-block font-semibold">
            ✨ {highlightMessage}
          </div>
        )}
      </div>

      <div className="p-8">
        {/* 基本情報セクション */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 企業特徴 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2">
              企業情報
            </h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <span className="font-semibold text-blue-800 w-20">業界:</span>
                <span className="text-gray-700">{features.industry}</span>
              </div>
              {features.salary && (
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold text-green-800 w-20">年収:</span>
                  <span className="text-gray-700 font-bold">{features.salary}</span>
                </div>
              )}
              {features.holidays && (
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-semibold text-purple-800 w-20">休日数:</span>
                  <span className="text-gray-700">{features.holidays}</span>
                </div>
              )}
              {features.overtime && (
                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-semibold text-orange-800 w-20">残業:</span>
                  <span className="text-gray-700">{features.overtime}</span>
                </div>
              )}
              {features.employees && (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-800 w-20">従業員:</span>
                  <span className="text-gray-700">{features.employees}</span>
                </div>
              )}
            </div>
          </div>

          {/* 採用情報 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-green-500 pb-2">
              採用情報
            </h2>
            <div className="space-y-3">
              {details.hiringCount && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold text-green-800">採用予定数: </span>
                  <span className="text-gray-700 font-bold">{details.hiringCount}</span>
                </div>
              )}
              {features.deadline && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <span className="font-semibold text-red-800">応募締切: </span>
                  <span className="text-gray-700 font-bold">{features.deadline}</span>
                </div>
              )}
              <div className="p-3 bg-blue-50 rounded-lg">
                <span className="font-semibold text-blue-800 block mb-2">募集職種:</span>
                <ul className="space-y-1 ml-4">
                  {details.recruitment.map((position, index) => (
                    <li key={index} className="text-gray-700 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {position}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 企業概要 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-4">
            企業概要
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{details.overview}</p>
          </div>
        </div>

        {/* 福利厚生 */}
        {details.benefits && details.benefits.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-purple-500 pb-2 mb-4">
              福利厚生・特徴
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {details.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 選考プロセス */}
        {selectionProcess && selectionProcess.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-500 pb-2 mb-4">
              選考フロー
            </h2>
            <div className="flex flex-wrap gap-2">
              {selectionProcess.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold">
                    {step}
                  </div>
                  {index < selectionProcess.length - 1 && (
                    <div className="flex items-center">
                      <span className="text-gray-400 text-2xl">→</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* 追加情報 */}
        {additionalInfo && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-start">
              <span className="text-yellow-600 text-xl mr-2">💡</span>
              <p className="text-gray-700">{additionalInfo}</p>
            </div>
          </div>
        )}

        {/* イラスト */}
        {illustration && (
          <div className="mt-8 text-center">
            <img 
              src={illustration} 
              alt="企業イラスト" 
              className="max-w-full h-auto mx-auto rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetailTemplate;