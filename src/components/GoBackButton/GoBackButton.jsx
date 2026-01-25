import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({ label = "Go Back", onClick, className = "" }) => {
  const navigate  = useNavigate()
  const handleClick = () => {
    navigate("/explore-data")

  };

  return (
    <button
      onClick={handleClick}
       className={`flex items-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors ${className}`}
      aria-label={label}
    >
      <IoArrowBack size={16} />
      <span  className="font-medium text-sm">{label}</span>
    </button>
  );
};

export default GoBackButton;
