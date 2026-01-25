import React, { useState } from "react";

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission process (replace with actual API call)
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div  className="bg-white">
            <div  className=" py-10 flex items-center justify-center">
                <div  className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
                    <h1  className="text-2xl font-bold text-[#004C78] text-center mb-6">
                        Feedback Form
                    </h1>

                    {formSubmitted ? (
                        <div  className="text-center">
                            <p  className="text-green-600 text-lg font-semibold">
                                Thank you for your feedback!
                            </p>
                            <button
                                 className="mt-4 bg-[#004C78] text-white py-2 px-6 rounded-lg font-semibold hover:opacity-90 transition"
                                onClick={() => setFormSubmitted(false)}
                            >
                                Submit Another Feedback
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            {/* Name Field */}
                            <div  className="mb-4">
                                <label
                                    htmlFor="name"
                                     className="block text-gray-700 font-semibold mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                     className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C78]"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div  className="mb-4">
                                <label
                                    htmlFor="email"
                                     className="block text-gray-700 font-semibold mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                     className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C78]"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Message Field */}
                            <div  className="mb-6">
                                <label
                                    htmlFor="message"
                                     className="block text-gray-700 font-semibold mb-2"
                                >
                                    Feedback
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                     className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C78]"
                                    placeholder="Write your feedback here..."
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                 className="bg-[#004C78] text-white py-2 px-6 rounded-lg font-semibold hover:opacity-90 transition w-full"
                            >
                                Submit Feedback
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm;
