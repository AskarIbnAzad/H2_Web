import React from "react";
import { useNavigate } from "react-router-dom";

const Collaborate = () => {
    const navigate = useNavigate();
    return (
        <div  className="bg-white">
            {/* Header Section */}
            <div  className="bg-[#f0f8ff] py-12 px-6 lg:px-32 text-center">
                <div  className="max-w-[1280px] mx-auto p-6 md:p-10">
                    <h1  className="text-4xl  font-extrabold text-[#004C78] mb-4">
                        Collaborate with MHI
                    </h1>
                    <p  className="text-gray-700 text-lg leading-relaxed">
                        Together, we can accelerate hydrogen research and advance education
                        about its potential.
                    </p>
                </div>
            </div>

            <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4 pt-8 ">

                {/* Content Sections */}
                <div  className=" p-8 rounded-lg  mb-8">
                    <h2  className="text-2xl font-bold mb-6">Why Your Help Matters</h2>
                    <p  className="text-gray-700 mb-6 leading-relaxed">
                        At the Molecular Hydrogen Institute (MHI), we believe that science
                        thrives through collaboration. A robust and comprehensive database is
                        essential for advancing the understanding and application of molecular
                        hydrogen (H<sub>2</sub>). By helping us expand and refine this resource,
                        you contribute to:
                    </p>
                    <ul  className="list-none space-y-4">
                        <li  className="flex items-center">
                            <span  className="bg-[#004C78] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">✔</span>
                            <p><strong>Accelerating Hydrogen Research:</strong> Accurate and easily accessible data empowers researchers and healthcare professionals to make informed decisions and drive innovation.</p>
                        </li>
                        <li  className="flex items-center">
                            <span  className="bg-[#004C78] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">✔</span>
                            <p><strong>Educating the World:</strong> A well-organized database provides a foundation for education, combating misinformation, and increasing awareness about hydrogen’s potential.</p>
                        </li>
                        <li  className="flex items-center">
                            <span  className="bg-[#004C78] text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">✔</span>
                            <p><strong>Advancing MHI’s Mission:</strong> As a 501(c)(3) science-based nonprofit, we rely on collective efforts to uphold our commitment to transparency, accuracy, and scientific progress.</p>
                        </li>
                    </ul>
                    <p  className="text-gray-700 mt-6">
                        Your support directly impacts the growth of this vital resource and
                        helps ensure it remains a trusted source of information for the global
                        community.
                    </p>
                </div>

                {/* Getting Involved Section */}
                <div  className=" py-12  rounded-lg mb-8">
                    <h2  className="text-3xl font-bold text-center mb-8 text-[#004C78]">Getting Involved is Easy!</h2>
                    <p  className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
                        Choose the option that works best for you and help us drive progress in hydrogen research and education.
                    </p>
                    <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Online Form Card */}
                        <div  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
                            <div  className="flex flex-col items-center">
                                <div  className="bg-blue-100 p-4 rounded-full mb-4">
                                    <span  className="text-blue-200 text-4xl">🌐</span>
                                </div>
                                <h3  className="text-xl font-bold text-[#004C78] mb-4">Online Form</h3>
                                <p  className="text-gray-600 text-center mb-6">
                                    Use our submission form to send us research articles, suggestions, or feedback.
                                </p>
                                <a
                                    href="/submit-form"
                                     className="bg-[#004C78] text-white py-2 px-4 rounded-lg font-semibold  hover:opacity-90 transition"
                                >
                                    Submit Here
                                </a>
                            </div>
                        </div>

                        {/* Email Us Card */}
                        <div  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
                            <div  className="flex flex-col items-center">
                                <div  className="bg-blue-100 p-4 rounded-full mb-4">
                                    <span  className="text-blue-200 text-4xl">📧</span>
                                </div>
                                <h3  className="text-xl font-bold text-[#004C78] mb-4">Email Us</h3>
                                <p  className="text-gray-600 text-center mb-6">
                                    Contact us directly to share your ideas, research contributions, or questions.
                                </p>
                                <a
                                    href="mailto:info@molecularhydrogeninstitute.org"
                                     className="bg-[#004C78] text-white py-2 px-4 rounded-lg font-semibold  hover:opacity-90 transition"
                                >
                                    Email Us
                                </a>
                            </div>
                        </div>

                        {/* Join the Community Card */}
                        <div  className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
                            <div  className="flex flex-col items-center">
                                <div  className="bg-blue-100 p-4 rounded-full mb-4">
                                    <span  className="text-blue-200 text-4xl">👥</span>
                                </div>
                                <h3  className="text-xl font-bold text-[#004C78] mb-4">Join the MHI Community</h3>
                                <p  className="text-gray-600 text-center mb-6">
                                    Become part of our growing network of researchers, professionals, and advocates.
                                </p>
                                <a
                                    href="https://molecularhydrogeninstitute.org/mhi-community/"
                                     className="bg-[#004C78] text-white py-2 px-4 rounded-lg font-semibold  hover:opacity-90 transition"
                                >
                                    Join the Community
                                </a>
                            </div>
                        </div>
                    </div>
                    <p  className="text-gray-700 text-center mt-8">
                        Every contribution, big or small, helps make a difference.{" "}
                        <a
                            href="https://molecularhydrogeninstitute.org/premium"
                             className="text-[#004C78] underline"
                        >
                            Become a Premium User
                        </a>
                    </p>
                </div>


                {/* Acknowledgment Section with Buttons */}
                <div  className="bg-[#004C78] text-white text-center justify-center items-center p-8 rounded-lg shadow-md mb-8">
                    <h2  className="text-2xl font-bold mb-6">Contributor Acknowledgment</h2>
                    <p  className="text-white  m-auto max-w-[800px] mb-6">
                        Contributors will be acknowledged through a leaderboard system (details to be determined). Your efforts will be recognized and appreciated as part of the collective advancement of hydrogen research.
                    </p>
                    <div  className="space-y-4 space-x-2 text-center">
                        <a
                        onClick={()=> navigate("/FeedbackForm")}
                            // href="/submit-form"
                             className="bg-white text-[#004C78] py-3 px-6 rounded-lg text-lg font-bold shadow-md hover:bg-gray-200 transition transform hover:scale-105 cursor-pointer"
                        >
                            Submit Research or Feedback
                        </a>
                        <a
                            href="/join"
                             className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-bold shadow-md hover:bg-green-700 transition transform hover:scale-105"
                        >
                            Join the Effort
                        </a>
                    </div>
                </div>

                {/* Disclaimer Section */}
                <div  className=" p-6  mt-8">
                    <p  className="text-gray-700 text-sm">
                        All submissions to the MHI H2 Research Database are subject to review and approval by our team to ensure accuracy, relevance, and alignment with MHI’s mission. MHI reserves the right to edit or exclude any information that does not meet our quality standards.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Collaborate;
