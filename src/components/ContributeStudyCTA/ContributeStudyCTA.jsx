import React from "react";
import { Tooltip } from "antd";

const ContributeStudyCTA = ({ className = "", buttonText = "Add a Study", url = "https://stagging.h2research.org/admin" }) => (
  <div className={`text-center mt-10 ${className}`}>
    <span className="text-base text-gray-700 mr-2">Want to contribute?</span>
    <Tooltip 
      title="Add peer-reviewed hydrogen studies to our database. Submissions are reviewed and verified to help keep this resource accurate and complete."
      placement="top"
    >
      <button
        className="inline-block px-5 py-2 bg-[#214a78] text-white rounded-full hover:bg-[#003355] transition-colors font-medium"
        onClick={() => window.open(url, "_blank")}
      >
        {buttonText}
      </button>
    </Tooltip>
  </div>
);

export default ContributeStudyCTA;
