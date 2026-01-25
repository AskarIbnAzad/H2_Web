import React from 'react';
import { HeartOutlined, ArrowRightOutlined } from '@ant-design/icons';

const ProfessionalCTASection = ({ navigate }) => {
  const themeColor = '#214a78';

  const handleJoinCommunity = () => {
    window.open('https://molecularhydrogeninstitute.org/mhi-community/', '_blank');
  };

  const handleUpgradePremium = () => {
    if (navigate) {
      navigate('/subscription');
    } else {
      window.location.href = '/subscription';
    }
  };

  return (
    <div  className="mt-16 relative overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-100">
      {/* Top accent line */}
      <div  className="h-1 bg-gradient-to-r from-[#214a78] via-blue-500 to-purple-500"></div>
      
      <div  className="p-12 text-center">
        {/* Icon */}
        <div  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#214a78] to-[#1a3a5f] rounded-2xl mb-6 shadow-lg">
          <HeartOutlined style={{ fontSize: '24px', color: 'white' }} />
        </div>

        {/* Main heading */}
        <h2  className="text-4xl font-bold text-[#214a78] mb-6 leading-tight">
          Do you like this? Help Advance Hydrogen Research
        </h2>
        
        {/* Subtitle */}
        <div  className="text-xl font-semibold text-gray-700 mb-6">
          Join the MHI Community
        </div>

        {/* Description */}
        <p  className="text-lg text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
          Your monthly contribution directly supports the growth of the world's leading hydrogen research database. 
          Together, we're advancing the science, education, and global awareness of H₂ as a medical gas.
        </p>

        {/* Buttons */}
        <div  className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleJoinCommunity}
             className="group bg-[#214a78] hover:bg-[#214a78]/90 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
          >
            Join the MHI Community
            <ArrowRightOutlined  className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          
          <button 
            onClick={handleUpgradePremium}
             className="group border-2 border-[#214a78] text-[#214a78] hover:bg-[#214a78] hover:text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center gap-2"
          >
            Upgrade to Premium
            <ArrowRightOutlined  className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Trust indicators */}
        <div  className="mt-8 pt-6 border-t border-gray-100">
          <div  className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div  className="flex items-center gap-2">
              <div  className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
            <div  className="flex items-center gap-2">
              <div  className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>501(c)(3) nonprofit</span>
            </div>
            <div  className="flex items-center gap-2">
              <div  className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Starting from $7/month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCTASection;