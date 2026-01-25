import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Button, Card, Space } from "antd";
import {
  UserAddOutlined,
  TeamOutlined,
  //   FeedbackOutlined,
  DatabaseOutlined,
  BookOutlined,
  HeartOutlined,
  BugOutlined,
} from "@ant-design/icons";

const faqData = [
  {
    question: "What is the MHI H₂ Research Database?",
    answer:
      "The H₂ Research Database is a centralized collection of peer-reviewed studies designed to support researchers, healthcare professionals, and educators exploring the therapeutic potential of molecular hydrogen. It is curated by the Molecular Hydrogen Institute (MHI), a 501(c)(3) nonprofit.",
  },
  {
    question: "Who can access it?",
    answer:
      "Anyone. Basic access is free and includes keyword searches and article previews. Premium members can save and organize studies, access export tools, and support the ongoing development of the database.",
  },
  {
    question: "Is there a cost to use the database?",
    answer: `Browsing is free. Premium access is $25/month and directly supports MHI's nonprofit mission to keep research accessible and accurate.<br><br>👉 <a href="/subscription" style="color: #214a78; font-weight: 600; text-decoration: underline;">View subscription options</a>`,
  },
  {
    question: "How accurate is the information?",
    answer: `Every study is manually submitted through our internal process. As part of our growing quality control system, articles are reviewed by certified contributors and tagged with metadata. Verified articles are locked to preserve accuracy.<br><br>If you notice an error, <a href="/contact-us" style="color: #214a78; font-weight: 600; text-decoration: underline;">submit feedback here</a> or email us at info@molecularhydrogeninstitute.org.`,
  },
  {
    question: "How often is the database updated?",
    answer:
      "New studies are added continuously. Our team is working through a backlog of 3,000+ known articles to ensure the database becomes as complete as possible.",
  },
  {
    question: "Can I contribute to the database?",
    answer: `Yes! We welcome qualified students, scientists, and researchers to help us expand and verify the database. This FAQ page serves as the starting point for contributors. If you're accepted, we'll send step-by-step guidance on how to participate.<br><br>👉 <a href="https://docs.google.com/document/d/1K5PkJhq8trSa1Z_6zn-JIpntYHKYzhLXoEKGuC3S7rk/edit?tab=t.kp2ebou09lf8" target="_blank" style="color: #214a78; font-weight: 600; text-decoration: underline;">Apply to become a contributor</a>`,
  },
  {
    question: "Can I report errors or suggest improvements?",
    answer: `Absolutely. Use the <a href="/contact-us-us" style="color: #214a78; font-weight: 600; text-decoration: underline;">contact form</a> or email us directly at info@molecularhydrogeninstitute.org. Each page also has a "Submit Feedback" button you may use to help us!`,
  },
  {
    question: "How can I volunteer?",
    answer: `Join one of MHI's committees — such as the H₂ Research Committee — to help advance the mission. Volunteers may assist with database management, education, outreach, and more.<br><br>👉 <a href="/subscription" style="color: #214a78; font-weight: 600; text-decoration: underline;">Join an MHI Committee</a>`,
  },
];

const HelpPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const themeColor = "#214a78";

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleNavigation = (url, external = false) => {
    if (external) {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  };

  return (
    <div  className="bg-white">
      {/* Banner Section */}
      <div  className="bg-[#f0f8ff] py-12 px-6 lg:px-32 text-center">
        <div  className="max-w-[1280px] mx-auto p-6 md:p-10">
          <h1  className="text-4xl font-extrabold text-[#214a78] mb-4">
            FAQ’s and How-to Guide for H₂ Research Database
          </h1>
          <p  className="text-gray-700 text-lg leading-relaxed max-w-4xl mx-auto">
            This platform is more than a search tool — it's a living resource
            created by the Molecular Hydrogen Institute (MHI) and volunteers to organize,
            protect, and elevate the global body of hydrogen health research.
          </p>
          <div  className="mt-6 p-4 bg-white/85 rounded-lg backdrop-blur-sm max-w-3xl mx-auto">
            <p  className="text-[#214a78] text-base leading-relaxed">
              <strong>MHI is a science-based 501(c)(3) nonprofit.</strong> We
              don't endorse, promote, or sell hydrogen products — Our mission is focused on the
              research, education, and awareness of H₂ as a potential medical gas. We rely
               on volunteers and community members to make this science
              accessible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4 py-8">
        {/* Getting Started Section */}
        <section  className="mb-16">
          <h2  className="text-3xl font-bold text-[#214a78] mb-8">
            Getting Started with the Database
          </h2>
          <div  className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Search Section */}
            <Card
               className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ borderRadius: "12px" }}
            >
              <div  className="text-center p-4">
                <div style={{
                  backgroundColor: themeColor,
                }}  className="w-16 h-16 mx-auto mb-4 rounded-full  flex items-center justify-center">
                  <DatabaseOutlined
                    style={{ fontSize: "24px", color: "white" }}
                  />
                </div>
                <h3  className="text-xl font-semibold text-[#214a78] mb-4">
                  1. Search for Information
                </h3>
                <div  className="text-gray-700 text-left">
                  <p  className="mb-3">
                    Use the search bar to explore our collection of molecular
                    hydrogen research. Search by:
                  </p>
                  <ul  className="list-disc pl-4 space-y-2">
                    <li>
                      Keywords (e.g., biomarkers, conditions, or applications)
                    </li>
                    <li>
                      Filters (e.g., categories, publication date, or research
                      focus) to refine your results
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Save/Export Section */}
            <Card
               className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ borderRadius: "12px" }}
            >
              <div  className="text-center p-4">
                <div style={{
                  backgroundColor : themeColor,
                }}  className="w-16 h-16 mx-auto mb-4 rounded-full  flex items-center justify-center">
                  <BookOutlined
                    style={{ fontSize: "24px", color: "white" }}
                  />
                </div>
                <h3  className="text-xl font-semibold text-[#214a78] mb-4">
                  2. Save or Export Data
                </h3>
                <div  className="text-gray-700 text-left">
                  <p  className="mb-3">Premium users can:</p>
                  <ul  className="list-disc pl-4 space-y-2">
                    <li>Bookmark and organize studies (Coming Soon)</li>
                    <li>Export citations directly from articles</li>
                    <li>Download to tools like EndNote for research use</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Explore Section */}
            <Card
               className="shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ borderRadius: "12px" }}
            >
              <div  className="text-center p-4">
                <div  style={{
                  backgroundColor: themeColor,
                }} className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <TeamOutlined
                    style={{ fontSize: "24px", color: "white" }}
                  />
                </div>
                <h3  className="text-xl font-semibold text-[#214a78] mb-4">
                  3. Explore the Data
                </h3>
                <div  className="text-gray-700 text-left">
                  <p  className="mb-3">Browse hydrogen research by:</p>
                  <ul  className="list-disc pl-4 space-y-2">
                    <li>Organ system</li>
                    <li>Disease or condition</li>
                    <li>Biomarker</li>
                    <li>Species, method of administration, and more</li>
                  </ul>
                  <p  className="mt-3 text-sm italic">
                    This dynamic data view gives you a bird's-eye look at how H₂
                    has been studied across the world.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Ways You Can Support Section */}
        <section  className="mb-16">
          <h2  className="text-3xl font-bold text-[#214a78] mb-8 text-center">
            Ways You Can Support & Get Involved
          </h2>
          <div  className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Become a Supporter */}
            <Card
               className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              style={{
                borderRadius: "16px",
                border: `2px solid ${themeColor}`,
              }}
              onClick={() =>
                handleNavigation(
                  "https://molecularhydrogeninstitute.org/mhi-community/",
                  true
                )
              }
            >
              <div  className="text-center p-6">
                <div  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r bg-[${themeColor}] flex items-center justify-center`}>
                  <HeartOutlined style={{ fontSize: "32px", color: "white" }} />
                </div>
                <h3  className="text-xl font-semibold text-[#214a78] mb-3">
                  Become a Paid Supporter
                </h3>
                <p  className="text-gray-700 mb-4 leading-relaxed">
                  Support the database and join a global movement advancing H₂
                  science.
                </p>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    backgroundColor: themeColor,
                    borderColor: themeColor,
                  }}
                >
                  Join the MHI Community →
                </Button>
              </div>
            </Card>

            {/* Research Contributor */}
            <Card
               className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              style={{ borderRadius: "16px" }}
              onClick={() =>
                handleNavigation(
                  "https://docs.google.com/document/d/1K5PkJhq8trSa1Z_6zn-JIpntYHKYzhLXoEKGuC3S7rk/edit?tab=t.kp2ebou09lf8",
                  true
                )
              }
            >
              <div  className="text-center p-6">
               <div  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r bg-[${themeColor}] flex items-center justify-center`}>
                  <UserAddOutlined
                    style={{ fontSize: "32px", color: "white" }}
                  />
                </div>
                <h3  className="text-xl font-semibold text-[#214a78] mb-3">
                  Apply as a Research Contributor
                </h3>
                <p  className="text-gray-700 mb-4 leading-relaxed">
                  Students, scientists, and researchers can help expand the
                  database by submitting, tagging, or verifying research.
                </p>
                <Button
                  type="default"
                  size="large"
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  Apply to Contribute →
                </Button>
              </div>
            </Card>

            {/* Report Errors */}
            <Card
               className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              style={{ borderRadius: "16px" }}
              onClick={() => handleNavigation("/contact-us")}
            >
              <div  className="text-center p-6">
         <div  className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r bg-[${themeColor}] flex items-center justify-center`}>
                  <BugOutlined style={{ fontSize: "32px", color: "white" }} />
                </div>
                <h3  className="text-xl font-semibold text-[#214a78] mb-3">
                  Report Errors or Suggest Improvements
                </h3>
                <p  className="text-gray-700 mb-4 leading-relaxed">
                  Spotted something missing or incorrect?
                </p>
                <Button
                  type="default"
                  size="large"
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  Submit Feedback →
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section  className="mb-16">
          <h2  className="text-3xl font-bold text-[#214a78] mb-8">
            Frequently Asked Questions
          </h2>
          <div  className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                 className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div
                  onClick={() => toggleFAQ(index)}
                   className="flex items-center justify-between p-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition duration-200"
                >
                  <h3  className="text-lg font-semibold text-[#214a78]">
                    {faq.question}
                  </h3>
                  {openFAQ === index ? (
                    <FaChevronUp  className="text-gray-500 flex-shrink-0 ml-4" />
                  ) : (
                    <FaChevronDown  className="text-gray-500 flex-shrink-0 ml-4" />
                  )}
                </div>
                {openFAQ === index && (
                  <div
                     className="p-6 text-gray-700 bg-white border-t border-gray-100"
                    style={{ animation: "fadeIn 0.3s ease-in-out" }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Need More Help Section */}
        <section  className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg">
          <h2  className="text-2xl font-bold text-[#214a78] mb-4">
            Need More Help?
          </h2>
          <p  className="text-gray-700 leading-relaxed mb-6">
            If you have further questions or need additional support, don't
            hesitate to:
          </p>
          <div  className="space-y-4">
            <div  className="flex items-start">
              <span  className="w-2 h-2 bg-[#214a78] rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span  className="text-gray-700">
                Visit our{" "}
                <a
                  href="/contact-us"
                   className="text-[#214a78] font-semibold underline hover:opacity-80"
                >
                  Contact Page to Submit Feedback
                </a>
              </span>
            </div>
            <div  className="flex items-start">
              <span  className="w-2 h-2 bg-[#214a78] rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span  className="text-gray-700">
                Contact us directly at{" "}
                <a
                  href="mailto:info@molecularhydrogeninstitute.org"
                   className="text-[#214a78] font-semibold underline hover:opacity-80"
                >
                  info@molecularhydrogeninstitute.org
                </a>
                . Please note it may take us 5-7 business days to respond.
              </span>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HelpPage;
