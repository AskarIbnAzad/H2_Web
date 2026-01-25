import React from "react";
import { FaFlask, FaDna } from "react-icons/fa";
import { FaArrowTrendDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BiomarkerSection = ({ data }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate("/articles", { state: { selectedCategory: category } });
  };
  return (
    <div  className="p-4 sm:p-6">
      {data && (
        <div  className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {data?.map((item, index) => {
            
           return <div
              key={index}
               className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 transition-all transform hover:scale-105 relative w-full"
            >
              {/* Top Border */}
              <div  className="absolute top-0 left-0 right-0 h-4 bg-[#346896] rounded-t-xl"></div>

              {/* Category */}
              <div  onClick={() => handleCategoryClick(item.category)}  className="mb-4 sm:mb-6 flex items-center space-x-3 sm:space-x-4 cursor-pointer">
                <div  className="p-2 sm:p-3 bg-[#346896] text-white rounded-full flex-shrink-0">
                  <FaFlask size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2  className="text-lg sm:text-xl font-bold text-[#346896] break-words">
                  {item.category}
                </h2>
              </div>

              {/* Marker */}
              <div  className="mb-4">
                <p  className="text-sm font-medium text-gray-500">Marker</p>
                <p  className="text-base sm:text-lg font-semibold text-gray-800 flex items-center space-x-2 break-words">
                  <FaDna  className="text-[#346896] flex-shrink-0" />
                  <span>{item.marker}</span>
                </p>
              </div>

              {/* Change */}
              <div  className="mb-4">
                <p  className="text-sm font-medium text-gray-500">Change</p>
                <ul  className="mt-2 space-y-2">
                  {item.Change.map((change, idx) => (
                    <li
                      key={idx}
                       className="flex items-center space-x-2 text-sm sm:text-base text-gray-800 break-words"
                    >
                      <FaArrowTrendDown  className="text-red-500 flex-shrink-0" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Protein */}
              <div>
                <p  className="text-sm font-medium text-gray-500">Protein</p>
                <p  className="text-base sm:text-lg font-semibold text-gray-800 break-words">
                  {item.Protein}
                </p>
              </div>
            </div>
})}
        </div>
      )}
    </div>
  );
};

export default BiomarkerSection;
