import React from 'react';
import { TemplateProps } from './TemplateTypes';

interface FailureStoryIntroData {
  question: string;
  promise: string;
  finalPageOffer: string;
  cta: string;
}

export const FailureStoryIntroTemplate: React.FC<TemplateProps> = ({ data }) => {
  const introData = data as FailureStoryIntroData;

  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white" />
      </div>

      {/* Content container */}
      <div className="relative z-10 p-10 flex flex-col h-full">
        {/* Question header */}
        <div className="text-center mb-10">
          <div className="text-3xl text-gray-500 mb-4">── Question ──</div>
        </div>

        {/* Main question */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="text-3xl font-bold text-gray-800 leading-relaxed text-center">
            {introData.question}
          </div>
        </div>

        {/* Down arrow */}
        <div className="flex justify-center mb-8">
          <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center">
            <div className="text-white text-3xl">↓</div>
          </div>
        </div>

        {/* Promise section */}
        <div className="text-2xl text-gray-700 text-center mb-8 leading-relaxed">
          {introData.promise}
        </div>

        {/* Character illustration */}
        <div className="flex justify-start items-end mb-6">
          <div className="relative">
            <div className="w-48 h-48 flex items-center justify-center">
              <img 
                src="/misaki.png" 
                alt="Misaki character" 
                className="w-40 h-40 object-contain"
              />
            </div>
            <div className="absolute -right-4 -top-4 bg-white rounded-3xl shadow-lg p-6 max-w-sm">
              <div className="text-xl text-gray-700 leading-relaxed">
                {introData.finalPageOffer}
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="mt-auto flex items-center gap-4">
          <div className="bg-red-500 text-white text-4xl px-4 py-2">
            🚩
          </div>
          <div className="text-2xl text-gray-700">
            {introData.cta}
          </div>
          <div className="ml-auto text-gray-500 text-xl uppercase">
            SWIPE →
          </div>
        </div>
      </div>
    </div>
  );
};