import React from "react";
import { useNavigate } from "react-router-dom";

const VerifiedTagPage = () => {
    const navigate = useNavigate()
    return (
        <div  className="bg-[#ffff]">
            {/* Header Section */}
            <div  className="bg-[#f0f8ff] py-12 px-6 lg:px-32 text-center">
                <div  className="max-w-[1280px] mx-auto p-6 md:p-10">
                    <h1  className="text-4xl  font-extrabold text-[#004C78] mb-4">
                    What Does the Verified Tag Mean?
                    </h1>
                    <p  className="text-gray-700 text-lg leading-relaxed">
                    At the Molecular Hydrogen Institute (MHI), credibility and scientific accuracy are our highest priorities.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4 pt-8 ">
                {/* Introduction */}
                <section  className="mb-10">
                    <h2  className="text-2xl font-bold text-[#004C78] mb-4">Introduction</h2>
                    <p  className="text-gray-700 leading-relaxed">
                        To ensure users have access to reliable information, we created the Verified Tag system, which identifies articles that meet rigorous review standards.
                    </p>
                </section>

                {/* How an Article Gets Verified */}
                <section  className="mb-10">
                    <h2  className="text-2xl font-bold text-[#004C78] mb-4">How an Article Gets Verified</h2>
                    <ul  className="list-disc list-inside text-gray-700 space-y-4">
                        <li>
                            <strong>Source Validation:</strong> We check that the research comes from peer-reviewed journals, reputable publishers, or credible organizations.
                        </li>
                        <li>
                            <strong>Content Review:</strong> Our team of experts examines the study to confirm the indexing of the article is accurate, scientifically valid, and relevant to molecular hydrogen research.
                        </li>
                        <li>
                            <strong>Relevance Assessment:</strong> We ensure the research aligns with the purpose of the database, focusing on advancing knowledge about hydrogen’s potential medical and health applications.
                        </li>
                    </ul>
                </section>

                {/* What the Verified Tag Does NOT Mean */}
                <section  className="mb-10">
                    <h2  className="text-2xl font-bold text-[#004C78] mb-4">What the Verified Tag Does NOT Mean</h2>
                    <ul  className="list-disc list-inside text-gray-700 space-y-4">
                        <li>
                            Verification does not imply endorsement of specific conclusions, products, or companies mentioned in the article.
                        </li>
                        <li>
                            It does not substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare practitioner for medical guidance.
                        </li>
                    </ul>
                </section>

                {/* How to Report Concerns */}
                <section  className="mb-10">
                    <h2  className="text-2xl font-bold text-[#004C78] mb-4">How to Report Concerns About Verified Articles</h2>
                    <p  className="text-gray-700 leading-relaxed mb-4">
                        If you find any errors or discrepancies in a verified article, please contact us at{" "}
                        <a href="mailto:info@molecularhydrogeninstitute.org"  className="text-[#346896] underline">
                            info@molecularhydrogeninstitute.org
                        </a>{" "}
                        or use the{" "}
                        <a onClick={()=> navigate("/FeedbackForm")}  className="text-[#346896] underline cursor-pointer">
                            Feedback Form
                        </a>. Our team will review the feedback and update the tag if necessary.
                    </p>
                </section>

                {/* Call-to-Action */}
                <div  className="bg-[#F9FAFB] p-6 sm:p-8 rounded-lg shadow-lg text-center">
                    <h2  className="text-2xl font-bold text-[#004C78] mb-4">Want to Learn More?</h2>
                    <p  className="text-gray-700 mb-6">
                        Explore how MHI ensures accuracy and scientific credibility across all its resources.
                    </p>
                    <a
                        onClick={()=> navigate("/about")}
                         className="bg-[#004C78] text-white py-3 px-6 rounded-lg text-lg font-bold  hover:opacity-90 transition transform hover:scale-105 cursor-pointer"
                    >
                        Learn More About MHI's Mission
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VerifiedTagPage;
