import React, { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const SubscribeModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Open and close handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            {/* Link to trigger modal */}
            <Link
                 className="text-gray-700 cursor-pointer hover:underline"
                onClick={openModal}
            >
                Subscribe for Updates
            </Link>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Subscribe for Updates"
                ariaHideApp={false}
                style={{
                    content: {
                        maxWidth: "500px",
                        margin: "auto",
                        borderRadius: "16px",
                        padding: "24px",
                        border: "none",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                        // height: "auto",
                        background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                        height: "fit-content",
                    },
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1000,
                    },
                }}
            >
                {/* Header */}
                <div  className="flex justify-between items-center mb-4">
                    <h2  className="text-2xl font-bold text-[#346896]">
                        Subscribe to Updates
                    </h2>
                    <button
                        onClick={closeModal}
                         className="text-gray-400 hover:text-gray-600 text-2xl transition-transform transform hover:scale-125"
                    >
                        ✕
                    </button>
                </div>

                {/* New Animated Icon */}
                <div  className="flex justify-center mb-4">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3861/3861477.png"
                        alt="Newsletter Icon"
                         className="w-20 h-20 animate-pulse"
                    />
                </div>

                {/* Form Content */}
                <p  className="text-center text-gray-600 text-sm mb-6">
                    Stay in the loop! Subscribe to get the latest news, updates, and offers
                    straight to your inbox.
                </p>
                <form
                    onSubmit={closeModal}
                     className="flex flex-col gap-4"
                >
                    <label>
                        <span  className="block text-sm font-medium text-gray-800 mb-1">
                            Your Email Address
                        </span>
                        <input
                            type="email"
                            name="email_address"
                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#346896] transition-all"
                            placeholder="Enter your email"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                         className="w-full bg-gradient-to-r from-[#346896] to-[#1E3A8A] text-white font-bold py-2 rounded-md shadow-lg hover:opacity-90 transition-all hover:shadow-2xl"
                    >
                        Subscribe Now
                    </button>
                </form>

                {/* Footer */}
                <p  className="text-xs text-gray-500 mt-4 text-center">
                    We value your privacy. Unsubscribe anytime.
                </p>
            </Modal>
        </div>
    );
};

export default SubscribeModal;

