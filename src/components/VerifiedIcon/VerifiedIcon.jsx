import React from "react";

const VerifiedIcon = ({ onClick, cursor }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            width="36px"
            height="36px"
            style={{
                display: "inline-block",
                verticalAlign: "middle",
                borderRadius: "50%",
                backgroundColor: "rgba(76, 175, 80, 0.1)", // Subtle green background
                padding: "4px",
                cursor: cursor
            }}
            onClick={onClick}
        >
            <circle cx="12" cy="12" r="10" fill="#4CAF50" opacity="0.15" />
            <circle
                cx="12"
                cy="12"
                r="8.5"
                stroke="#4CAF50"
                strokeWidth="1.5"
                fill="white"
            />
            <path
                d="M9 12.5l1.8 1.8 4.2-4.2"
                stroke="#4CAF50"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default VerifiedIcon;
