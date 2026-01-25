import React from "react";

const Tag = ({ label }) => {
    return (
        <span  className="text-[#132B38] px-5 py-3 rounded-full text-xs" style={{
            fontWeight:'bold',
            background: "rgba(0, 76, 120, 0.10)"


        }}>
            {label}
        </span>
    );
};

export default Tag;
