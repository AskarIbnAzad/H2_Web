import React, { useState } from "react";
import Modal from "react-modal";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const SocialMediaModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open and close handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Link to open modal */}
      <button
        onClick={openModal}
         className="text-gray-700 hover:underline"
      >
        Follow Us on Social Media
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={{
          content: {
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
            borderRadius: "16px",
            border: "none",
            overflow: "hidden",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
            height:"fit-content"
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div  className="text-center">
          <h2  className="text-2xl font-bold text-[#346896] mb-4">Follow Us on Social Media</h2>
          <p  className="text-gray-700 mb-6">
            Stay connected and join the conversation by following us on our social media platforms.
          </p>
          <div  className="flex justify-center gap-4 text-2xl text-white">
            <a
              href="https://www.facebook.com/molecularhydrogeninstitute"
              target="_blank"
              rel="noopener noreferrer"
               className="bg-blue-600 p-3 rounded-full hover:opacity-90 transition-all"
              title="Facebook"
            >
              <FaFacebookF />
            </a>
            {/* <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
               className="bg-blue-400 p-3 rounded-full hover:opacity-90 transition-all"
              title="Twitter"
            >
              <FaTwitter />
            </a> */}
            <a
              href="https://www.instagram.com/h2mhi/"
              target="_blank"
              rel="noopener noreferrer"
               className="bg-pink-500 p-3 rounded-full hover:opacity-90 transition-all"
              title="Instagram"
            >
              <FaInstagram />
            </a>
            {/* <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
               className="bg-blue-700 p-3 rounded-full hover:opacity-90 transition-all"
              title="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
               className="bg-red-600 p-3 rounded-full hover:opacity-90 transition-all"
              title="YouTube"
            >
              <FaYoutube />
            </a> */}
          </div>
          <button
            onClick={closeModal}
             className="mt-6 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SocialMediaModal;
