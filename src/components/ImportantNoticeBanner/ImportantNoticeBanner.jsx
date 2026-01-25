// import React from "react";
// import { FaExclamationTriangle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const ImportantNoticeBanner = () => {
//   const navigate = useNavigate()
//   return (
//     <div  className="bg-yellow-100 border border-yellow-300 rounded-md p-4 flex items-center justify-between  shadow-sm">
//       {/* Left Section: Icon and Text */}
//       <div  className="flex items-center space-x-4">
//         <FaExclamationTriangle  className="text-yellow-600 text-2xl" />
//         <div>
//           <h2  className="text-yellow-800 font-bold text-lg">
//             Important Notice
//           </h2>
//           <p  className="text-yellow-700 text-sm leading-relaxed">
//             This database is a work in progress, and the information may be
//             incomplete. If you'd like to contribute to expanding our database
//             and advancing hydrogen research, please{" "}
//             <a
//               onClick={() => navigate("/Collaborate")}
//                className="text-yellow-900 font-semibold underline hover:text-yellow-700 cursor-pointer"
//             >
//               click here
//             </a>
//             .
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImportantNoticeBanner;

import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ImportantNoticeBanner = () => {
  const navigate = useNavigate();
  return (
    <div  className="bg-yellow-50 border border-yellow-200 rounded-md py-2 px-3 flex items-start justify-between shadow-sm text-sm">
      {/* Left Section: Icon and Text */}
      <div  className="flex items-center space-x-3">
        <FaExclamationTriangle  className="text-yellow-500 text-xl mt-1" />
        <div>
          <h2  className="text-yellow-700 font-semibold text-base mb-1">
            Important Notice
          </h2>
          <p  className="text-yellow-600 leading-snug">
            This database is a work in progress, and the information may be
            incomplete. If you'd like to contribute to expanding our database
            and advancing hydrogen research, please{" "}
            <span
              onClick={() => navigate("/Collaborate")}
               className="text-yellow-800 font-medium underline hover:text-yellow-600 cursor-pointer"
            >
              click here
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportantNoticeBanner;
