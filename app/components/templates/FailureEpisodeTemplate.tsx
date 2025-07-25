import React from 'react';
import { TemplateProps } from './TemplateTypes';

interface FailureEpisodeData {
  episodeNumber: string;
  title: string;
  logo?: string;
  description: string;
  failure: string;
  conclusion: string;
  savePrompt?: string;
  question?: string;
}

export const FailureEpisodeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const episodeData = data as FailureEpisodeData;

  return (
    <div className="relative w-full h-full bg-white flex flex-col">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }} />
      </div>

      {/* Content container */}
      <div className="relative z-10 p-10 flex flex-col h-full">
        {/* Episode header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="text-5xl font-light text-gray-600">
            episode
          </div>
          <div className="text-7xl font-bold text-blue-600">
            {episodeData.episodeNumber}
          </div>
          <div className="flex-1 bg-blue-600 text-white text-4xl font-bold py-4 px-8 rounded-full text-center">
            {episodeData.title}
          </div>
        </div>

        {/* Logo section if provided */}
        {episodeData.logo && (
          <div className="mb-6 flex justify-start">
            <div className="bg-teal-500 text-white text-3xl font-bold py-4 px-8 rounded-2xl">
              {episodeData.logo}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="text-2xl text-gray-700 mb-6 leading-relaxed">
          {episodeData.description}
        </div>

        {/* Failure box with arrow */}
        <div className="relative mb-8">
          <div className="text-center mb-2">
            <div className="inline-block">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-blue-600 mx-auto"></div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-3xl p-8">
            <div className="text-2xl text-gray-800 leading-relaxed">
              {episodeData.failure}
            </div>
          </div>
        </div>

        {/* Conclusion section */}
        <div className="flex-1 flex items-start">
          <div className="flex gap-6 items-start">
            <div className="bg-red-500 text-white rounded-full px-6 py-3 text-2xl font-bold flex items-center gap-2">
              結論！
              <div className="text-3xl">💡</div>
            </div>
            <div className="flex-1 bg-pink-50 rounded-3xl p-6">
              <div className="text-2xl text-gray-800 leading-relaxed">
                {episodeData.conclusion}
              </div>
            </div>
          </div>
        </div>

        {/* Save prompt or question */}
        {(episodeData.savePrompt || episodeData.question) && (
          <div className="mt-6 flex items-center gap-4">
            <div className="bg-red-500 text-white text-4xl px-4 py-2">
              🚩
            </div>
            <div className="text-2xl text-gray-700">
              {episodeData.savePrompt || episodeData.question}
            </div>
            {episodeData.savePrompt && (
              <div className="ml-auto text-gray-500 text-xl">
                SWIPE →
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};