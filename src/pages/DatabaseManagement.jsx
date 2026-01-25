import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMicroscope,
  FaUsers,
  FaBook,
  FaGlobe,
  FaPaw,
  FaUserTie,
  FaFileAlt,
  FaLightbulb,
  FaHeart,
  FaLungs,
  FaSyringe,
  FaUserShield,
  FaLayerGroup,
  FaUser,
  FaFlask,
  FaDna,
  FaStethoscope,
  FaDisease,
} from "react-icons/fa";
import ProfessionalCTASection from "../components/ProfessionalCTASection/ProfessionalCTASection";


const DatabaseManagement = () => {
  const navigate = useNavigate();

  // Reordered alphabetically with better icons and consistent styling
  const screens = [
    {
      name: "Article Type",
      icon: <FaFileAlt />,
      link: "/article-type",
      bgColor: "bg-gradient-to-r from-teal-400 to-teal-500",
      hoverBg: "hover:from-teal-500 hover:to-teal-600",
    },
    {
      name: "Authors",
      icon: <FaUser />,
      link: "/authors-library",
      bgColor: "bg-gradient-to-r from-yellow-400 to-yellow-500",
      hoverBg: "hover:from-yellow-500 hover:to-yellow-600",
    },
    {
      name: "Biomarkers",
      icon: <FaDna />, // Better icon for biomarkers
      link: "/biomarker",
      bgColor: "bg-gradient-to-r from-blue-400 to-blue-500",
      hoverBg: "hover:from-blue-500 hover:to-blue-600",
    },
    {
      name: "Countries",
      icon: <FaGlobe />,
      link: "/countries",
      bgColor: "bg-gradient-to-r from-purple-400 to-purple-500",
      hoverBg: "hover:from-purple-500 hover:to-purple-600",
    },
     {
      name: "Diseases",
      icon: <FaDisease />, 
      link: "/diseases",
      bgColor: "bg-gradient-to-r from-indigo-400 to-indigo-500",
      hoverBg: "hover:from-indigo-500 hover:to-indigo-600",
    },
    {
      name: "Methods",
      icon: <FaFlask />, // Better icon for methods
      link: "/methods-of-administration",
      bgColor: "bg-gradient-to-r from-emerald-400 to-emerald-500",
      hoverBg: "hover:from-emerald-500 hover:to-emerald-600",
    },
    {
      name: "Organs/Tissues",
      icon: <FaLungs />,
      link: "/organs-tissues",
      bgColor: "bg-gradient-to-r from-slate-400 to-slate-500",
      hoverBg: "hover:from-slate-500 hover:to-slate-600",
    },
    {
      name: "Physiological Systems",
      icon: <FaStethoscope />, // Better icon for physiological systems
      link: "/physiological-systems",
      bgColor: "bg-gradient-to-r from-pink-400 to-pink-500",
      hoverBg: "hover:from-pink-500 hover:to-pink-600",
    },
    {
      name: "Research Topic",
      icon: <FaLightbulb />,
      link: "/research-topic",
      bgColor: "bg-gradient-to-r from-orange-400 to-orange-500",
      hoverBg: "hover:from-orange-500 hover:to-orange-600",
    },
    {
      name: "Species",
      icon: <FaPaw />,
      link: "/species",
      bgColor: "bg-gradient-to-r from-red-400 to-red-500",
      hoverBg: "hover:from-red-500 hover:to-red-600",
    },
   
  ];

  return (
    <div>
      <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4 tracking-wide">
          Explore the Data
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Become familiar with the H₂ therapy research by exploring the options
          below.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {screens.map((screen, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              onClick={() => navigate(screen.link)}
            >
              <div
                className={`p-6 rounded-full ${screen.bgColor} ${screen.hoverBg} transition-all duration-300 ease-in-out shadow-lg group-hover:shadow-xl`}
              >
                {React.cloneElement(screen.icon, {
                  className: "text-4xl text-white transition-all duration-300",
                })}
              </div>
              <h2 className="text-lg font-semibold mt-4 text-gray-800 group-hover:text-[#004c78] transition-all duration-300 ease-in-out text-center">
                {screen.name}
              </h2>
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 text-sm text-gray-500 transition-opacity duration-300">
                Click to explore
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <ProfessionalCTASection />
      </div>
    </div>
  );
};

export default DatabaseManagement;