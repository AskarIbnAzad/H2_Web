// import React, { useState } from 'react';
// import { MdFeedback } from 'react-icons/md';
// import FeedbackModal from '../FeedbackModal/FeedbackModal';

// const FeedbackButton = () => {
//   const [showModal, setShowModal] = useState(false);
//   const currentPageUrl = window.location.href;

//   const handleOpenModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <>
//       <button
//         onClick={handleOpenModal}
//          className="bg-[#346896] text-white rounded-md flex items-center gap-2 py-2 px-4 hover:bg-[#2a5478] transition-all"
//       >
//         <MdFeedback size={16} />
//         <span  className="font-medium text-sm">Provide Feedback</span>
//       </button>

//       {showModal && (
//         <FeedbackModal
//           onClose={handleCloseModal}
//           pageUrl={currentPageUrl}
//         />
//       )}
//     </>
//   );
// };

// export default FeedbackButton;

import React, { useState } from "react";
import { MdFeedback } from "react-icons/md";
import FeedbackModal from "../FeedbackModal/FeedbackModal";

const FeedbackButton = ({ modern = false }) => {
  const [showModal, setShowModal] = useState(false);
  const currentPageUrl = window.location.href;

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {modern ? (
        <button
          onClick={handleOpenModal}
           className="border border-[#346896] text-[#346896] bg-white rounded-md px-3 py-1.5 text-sm font-medium hover:bg-[#f0f6fb] hover:text-[#2a5478] transition-all flex items-center gap-1.5"
        >
          <MdFeedback size={16} />
          Provide Feedback
        </button>
      ) : (
        <button
          onClick={handleOpenModal}
           className="bg-[#346896] text-white rounded-md flex items-center gap-2 py-2 px-4 hover:bg-[#2a5478] transition-all"
        >
          <MdFeedback size={16} />
          <span  className="font-medium text-sm">Provide Feedback</span>
        </button>
      )}

      {showModal && (
        <FeedbackModal onClose={handleCloseModal} pageUrl={currentPageUrl} />
      )}
    </>
  );
};

export default FeedbackButton;
