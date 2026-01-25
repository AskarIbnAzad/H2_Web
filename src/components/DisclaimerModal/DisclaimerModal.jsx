import React from "react";
import ReactModal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import { FaExclamationTriangle } from "react-icons/fa";

const DisclaimerModal = ({ showModal, handleCloseModal }) => {


  return (
    <ReactModal
      isOpen={showModal}
      onRequestClose={handleCloseModal}
   style={{
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem", // Adds margin around modal on small screens
  },
  content: {
    position: "relative",
    inset: "unset", // Removes default positioning
    width: "100%",
    maxWidth: "600px",
    maxHeight: "90vh", // Limits modal height
    overflowY: "auto", // Makes it scrollable
    padding: "0",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
}}
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#004C78] to-[#008DBA] text-white p-4 flex items-center justify-between outline-none">
        {/* <div  className="flex items-center space-x-2">
          <FaExclamationTriangle size={24} />
          <h2  className="text-lg font-bold">Disclaimer</h2>
        </div> */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#004c78] to-[#0066a3] rounded-full">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v8a2 2 0 002 2h6a2 2 0 002-2V8M9 12h6" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Welcome to H₂ Research!</h2>
            <p className="text-sm text-white">Important Information & Disclaimer</p>
          </div>
        </div>
        <RxCross2
          onClick={handleCloseModal}
          className="cursor-pointer text-white text-2xl hover:opacity-90"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 text-left text-[#4A4A4A] font-normal text-sm leading-relaxed">



        <p className="mb-4">
          MHI is a <strong>501(c)(3) science-based nonprofit organization</strong>. The information provided in this database is for <strong>educational purposes only</strong> and is not intended to replace professional medical advice, diagnosis, or treatment. MHI does not represent, endorse, or recommend any specific hydrogen products or companies. This information has not been evaluated by the Food and Drug Administration.
        </p>

        <p className="mb-4">
          Do not use this information for diagnosing or treating any medical condition, or as a substitute for guidance from a qualified healthcare practitioner. Do not duplicate, copy, or distribute any content from this website without prior written consent from MHI.
        </p>

        <p className="font-semibold text-[#004C78] mb-2">By proceeding, you agree to the terms and conditions.</p>

        {/* <ul  className="list-disc pl-6 text-sm text-[#4A4A4A] mb-4">
          <li>You will not scrape, duplicate, or distribute any content from this website without prior written consent from MHI.</li>
          <li>You acknowledge and accept the terms of this disclaimer.</li>
        </ul> */}
      </div>

      {/* Footer Section */}
      <div className="bg-gray-100 px-6 py-4 flex justify-end">
        <button
          className="bg-[#004C78] text-white rounded-3xl py-2 px-6 font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition"
          onClick={handleCloseModal}
        >
          Accept
        </button>
      </div>
    </ReactModal>
  );
};

export default DisclaimerModal;
