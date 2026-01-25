// import React from "react";
// import sideImage from "../assets/images/signup.png";
// import { useNavigate } from "react-router-dom";

// const AfterSigninSection = () => {
//     const navigate = useNavigate()

//     return (
//         <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
//             <div  className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-100 items-center my-10">
//                 {/* Left Section */}
//                 <div  className="flex flex-col items-start">
//                     <h1  className="font-bold text-gray-900 mb-4 text-3xl md:text-[36px] sm:text-[30px] xs:text-[24px]">
//                         Welcome to MHI
//                     </h1>

//                     <p  className="text-[#767676] mb-6">
//                         Congratulations on signing in to the Molecular Hydrogen Institute (MHI), your gateway to cutting-edge insights, resources, and collaboration opportunities in health and research.
//                         <br /><br />
//                         At MHI, we’re on a mission to revolutionize the way professionals access, share, and advance scientific knowledge. Our platform is designed to empower you with the tools you need to excel in your field:
//                         <br /><br />
//                         <ul  className="list-disc list-inside space-y-2 text-gray-700">
//                             <li><strong>Comprehensive Research Library:</strong> Access a wealth of studies, publications, and articles curated to keep you at the forefront of innovation.</li>
//                             <li><strong>Expert Community:</strong> Join forums, discussions, and webinars to connect with like-minded professionals worldwide.</li>
//                             <li><strong>Personalized Insights:</strong> Tailored recommendations to help you stay updated on the latest breakthroughs in your area of expertise.</li>
//                             <li><strong>Collaborative Projects:</strong> Engage in research collaborations and initiatives that are shaping the future of health.</li>
//                         </ul>
//                         <br />
//                         Take a moment to explore the platform, connect with peers, and dive into groundbreaking studies. Together, we can drive meaningful change and improve health outcomes worldwide.
//                     </p>

//                     <div  className="pt-6 w-full">
//                         <button
//                             onClick={() => navigate("/")}
//                             type="submit"
//                              className="w-full bg-[#346896] text-white py-2 rounded-lg hover:bg-blue-950 transition duration-300"
//                         >
//                             Continue
//                         </button>
//                     </div>
//                 </div>

//                 {/* Right Section */}
//                 <div  className="flex items-center justify-center">
//                     <img src={sideImage} alt="signUp"  className="rounded-lg object-cover" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AfterSigninSection;

import React from "react";
import sideImage from "../assets/images/signin.webp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AfterSigninSection = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-100 items-center my-10">
        {/* Left Section */}
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-gray-900 mb-4 text-3xl md:text-[36px] sm:text-[30px] xs:text-[24px]">
            Welcome to the H₂ Research Database
          </h1>

          <p className="text-[#767676] mb-6 text-lg">
            You're signed in! Use your dashboard to:
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔍</span>
              <span className="text-gray-700 font-medium">
                Search and filter articles using advanced tools
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📁</span>
              <span className="text-gray-700 font-medium">
                Save and organize your favorite studies (Coming Soon)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">✏️</span>
              <span className="text-gray-700 font-medium">
                Submit or verify research (for contributors)
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-gray-900 mb-4">
              Start exploring here:
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600">👉</span>
                <button
                  onClick={() => {
                    window.open("https://stagging.h2research.org/admin", "_blank");
                  }}
                  className="text-[#346896] font-medium"
                >
                  Go to My Database Dashboard →
                </button>
              </div>
              {/* <div className="flex items-center space-x-2">
                <span className="text-yellow-600">👉</span>
                <button
                  onClick={() => {
                    //https://molecularhydrogeninstitute.org/mhi-community/
                    //navigate to the upper link
                    window.open(
                      "https://molecularhydrogeninstitute.org/mhi-community/",
                      "_blank"
                    );
                  }}
                  className="text-[#346896] font-medium"
                >
                  Go to MHI Community Platform →
                </button>
              </div> */}
              {/* <div className="flex items-center space-x-2">
                <span className="text-yellow-600">👉</span>
                <button
                  onClick={() => {
                    //https://molecularhydrogeninstitute.org/mhi-community/
                    //navigate to the upper link
                    window.open(
                      "https://molecularhydrogeninstitute.org/mhi-community/",
                      "_blank"
                    );
                  }}
                  className="text-[#346896] font-medium"
                >
                  Go to MHI Community Resource Library →
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600">👉</span>
                <button
                  onClick={() => {
                    toast.info(
                      "MHI Courses are currently under development. Please check back later."
                    );
                  }}
                  className="text-[#346896] font-medium"
                >
                  Go to MHI Courses →
                </button>
              </div> */}
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600">👉</span>
                <button
                  onClick={() => navigate("/articles")}
                  className="text-[#346896] font-medium"
                >
                  Explore All Articles →
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600">👉</span>
                <button
                  onClick={() => {
                    toast.info(
                      "Saved studies feature is under development. Please check back later."
                    );
                  }}
                  className="text-[#346896] font-medium"
                >
                  Access My Saved Studies (Coming Soon) →
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6 mt-6">
            <p className="text-gray-600">
              Need help accessing something?{" "}
              <button
                onClick={() => navigate("/contact-us")}
                className="text-[#346896] underline"
              >
                Contact Us
              </button>
            </p>
          </div>

          <div className="mb-2">
            <p className="text-gray-600">
              Or send us an email to{" "}
              <a
                href="mailto:info@molecularhydrogeninstitute.org"
                className="text-[#346896] underline"
              >
                info@molecularhydrogeninstitute.org
              </a>
            </p>
          </div>



          <div className="pt-6 w-full">
            <button
              onClick={() => {
                window.open("https://stagging.h2research.org/admin", "_blank");
              }}
              type="button"
              className="w-full bg-[#346896] text-white py-2 rounded-lg hover:bg-blue-950 transition duration-300"
            >
              Go to Your Database Dashboard
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center">
          <img
            src={sideImage}
            alt="H₂ Research Database Welcome"
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AfterSigninSection;
