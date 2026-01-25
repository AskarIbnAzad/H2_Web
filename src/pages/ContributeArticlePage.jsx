import React from "react";
import {
  FaUsers,
  FaLightbulb,
  FaCheckCircle,
  FaClipboardList,
  FaQuestionCircle,
} from "react-icons/fa";

const ContributeArticlePage = () => {
  return (
    <>
      {/* Hero Section */}
      <div  className="bg-[#f0f8ff] py-12 px-6 lg:px-32">
        <div  className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-10">
          <h1  className="text-4xl font-bold text-[#346896] mb-6 text-center">
            Contribute to Articles and Make an Impact
          </h1>
          <p  className="text-gray-700 text-lg text-center mb-8">
            Join our mission to enhance the quality of research articles by
            contributing your insights, corrections, and data. Together, we can
            build a stronger and more reliable research community.
          </p>
          <div  className="flex justify-center">
            <button
               className="bg-[#346896] text-white px-8 py-3 rounded-full text-xl font-medium hover:bg-[#245a78] transition-all"
              onClick={() => alert("Contribution Form Coming Soon!")}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      {/* Why Contribute Section */}
      <div  className="min-h-screen bg-gray-50 py-12 px-6 lg:px-32">
        <div  className="max-w-5xl mx-auto">
          <h2  className="text-3xl font-bold text-[#346896] mb-6">Why Contribute?</h2>
          <div  className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <FaUsers  className="text-[#346896] text-4xl" />,
                title: "Build the Community",
                description:
                  "Your contributions help create a reliable source of knowledge for researchers worldwide.",
              },
              {
                icon: <FaLightbulb  className="text-[#346896] text-4xl" />,
                title: "Share Your Knowledge",
                description:
                  "Add valuable insights and data that can enhance the accuracy of existing articles.",
              },
              {
                icon: <FaCheckCircle  className="text-[#346896] text-4xl" />,
                title: "Get Recognized",
                description:
                  "Your contributions will be credited, helping you gain recognition in the research community.",
              },
              {
                icon: <FaClipboardList  className="text-[#346896] text-4xl" />,
                title: "Support Future Research",
                description:
                  "Help other researchers by providing them with accurate data and useful insights.",
              },
            ].map((item, index) => (
              <div
                key={index}
                 className="bg-white shadow-md rounded-lg p-6 flex items-start space-x-4 hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                {item.icon}
                <div>
                  <h3  className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  <p  className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Get Involved Section */}
        <div  className="max-w-5xl mx-auto mt-16 bg-white shadow-lg rounded-xl p-10">
          <h2  className="text-3xl font-bold text-[#346896] mb-6">How to Get Involved?</h2>
          <ol  className="list-decimal list-inside text-gray-700 text-lg space-y-4">
            <li>Create an account or log in to our platform.</li>
            <li>Browse through available articles that need contributions.</li>
            <li>Submit your corrections, updates, or new data through the article contribution form.</li>
            <li>Wait for your submission to be reviewed and approved by our editors.</li>
          </ol>
        </div>

        {/* FAQ Section */}
        <div  className="max-w-5xl mx-auto mt-16 bg-white shadow-lg rounded-xl p-10">
          <h2  className="text-3xl font-bold text-[#346896] mb-6">Frequently Asked Questions</h2>
          {[
            {
              question: "What is article contribution?",
              answer:
                "Article contribution is a way for researchers to improve existing articles by providing corrections, additional data, and insights.",
            },
            {
              question: "Who can contribute?",
              answer:
                "Anyone with valuable insights and data can contribute, including researchers, students, and scholars.",
            },
            {
              question: "How will my contributions be credited?",
              answer:
                "Your name will be credited as a contributor on the respective article page after your submission is approved.",
            },
          ].map((item, index) => (
            <div key={index}  className="flex items-start space-x-4 mb-6">
              <FaQuestionCircle  className="text-[#346896] text-3xl" />
              <div>
                <h3  className="text-xl font-semibold text-gray-800">{item.question}</h3>
                <p  className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div  className="max-w-5xl mx-auto mt-16 bg-[#346896] text-white rounded-xl p-10 text-center">
          <h2  className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p  className="text-lg mb-6">
            Start your journey today and contribute to improving the quality of research articles.
          </p>
          <button
             className="bg-white text-[#346896] px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-all"
            onClick={() => alert("Contribution Form Coming Soon!")}
          >
            Start Contributing
          </button>
        </div>
      </div>
    </>
  );
};

export default ContributeArticlePage;
