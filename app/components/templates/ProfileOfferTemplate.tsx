import React from 'react';
import { TemplateProps } from './TemplateTypes';

interface ProfileOfferData {
  offer: string;
  restriction: string;
  profile: {
    introduction: string;
    work: string;
    followMessage: string;
  };
}

export const ProfileOfferTemplate: React.FC<TemplateProps> = ({ data }) => {
  const profileData = data as ProfileOfferData;

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-pink-50 to-white flex flex-col">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-pink-100 rounded-full opacity-30" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-purple-100 rounded-full opacity-30" />

      {/* Content container */}
      <div className="relative z-10 p-10 flex flex-col h-full">
        {/* Offer section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">🎁</div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-gray-800 mb-2">
                無料プレゼント
              </div>
              <div className="text-xl text-gray-700 leading-relaxed">
                {profileData.offer}
              </div>
            </div>
          </div>
          <div className="text-lg text-red-500 font-bold text-center mt-4">
            {profileData.restriction}
          </div>
        </div>

        {/* Profile section */}
        <div className="flex-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
              <div className="text-5xl">👩</div>
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-gray-800 mb-4">
                プロフィール
              </div>
              <div className="text-lg text-gray-700 leading-relaxed mb-4">
                {profileData.profile.introduction}
              </div>
            </div>
          </div>

          {/* Work section */}
          <div className="bg-white rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💼</div>
              <div className="text-lg text-gray-700 leading-relaxed">
                {profileData.profile.work}
              </div>
            </div>
          </div>

          {/* Follow message */}
          <div className="mt-auto">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full p-6 text-center">
              <div className="text-xl font-bold">
                {profileData.profile.followMessage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};