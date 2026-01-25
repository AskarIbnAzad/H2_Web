import React from "react";
import { FaTable } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ExploreDataButton = ({ label = "Explore Data", className = "" }) => {
  const navigate = useNavigate();
  return (
    <div  className="flex justify-center my-7">
      <button
        onClick={() => navigate("/explore-data")}
         className={`flex items-center gap-2 py-3 px-6 bg-[#346896] hover:bg-[#2a5478] text-white rounded-md transition-colors font-medium text-base ${className}`}
        aria-label={label}
      >
        <FaTable  className="text-white" size={16} />
        <span>{label}</span>
      </button>
    </div>
  );
};

export default ExploreDataButton;
