import React from "react";
import sideImage from "../assets/images/signup.webp";
import { useNavigate } from "react-router-dom";

const AfterSignupSection = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-100 items-center my-10">
        {/* Left Section */}
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-gray-900 mb-4 text-3xl md:text-[36px] sm:text-[30px] xs:text-[24px]">
            Thank You for Joining the H₂ Researcher Network!
          </h1>

          <p className="text-[#767676] mb-6">
            Welcome to the Molecular Hydrogen Institute’s Researcher Portal —
            your gateway to advancing hydrogen science.
            <br /> <br />
            As a verified researcher, you will have access to specialized tools
             to the growing
            body of H₂ evidence.
          </p>

          <div className="flex flex-col items-start">
            <p className="text-[#767676] mb-6">Here’s what you can do next:</p>
            {/* <ul className="list-disc list-inside space-y-4 text-gray-700 mb-6">
              <li>
                <span role="img" aria-label="microscope">
                  🔬
                </span>{" "}
                <strong>Submit Your Research:</strong> Share peer-reviewed
                studies or ongoing research projects to help advance the field.
              </li>
              <li>
                <span role="img" aria-label="books">
                  📚
                </span>{" "}
                <strong>Explore the Research Database:</strong> Dive into a
                curated library of hydrogen studies, mechanisms, and clinical
                outcomes.
              </li>
              <li>
                <span role="img" aria-label="handshake">
                  🤝
                </span>{" "}
                <strong>Collaborate Globally:</strong> Connect with fellow
                researchers, clinicians, and thought leaders working on H₂
                applications.
              </li>
              <li>
                <span role="img" aria-label="tools">
                  🛠️
                </span>{" "}
                <strong>Access Tools & Insights:</strong> Use exclusive tools to
                tag, review, and analyze data across disciplines.
              </li>
            </ul> */}
            {/* <p className="text-[#767676] mb-6">
              <span role="img" aria-label="envelope">
                📩
              </span>{" "}
              Questions? Reach out to our research team any time.{" "}
              <a
                href="mailto:info@molecularhydrogeninstitute.org"
                className="text-[#346896] underline"
              >
                info@molecularhydrogeninstitute.org
              </a>
            </p> */}
            <div className="pt-6 w-full">
              <button
                onClick={() => {
                  //navigate to the h2research.org/admin/quality-assurance in a new tab
                  window.open(
                    "https://staggin.h2research.org/admin/quality-assurance",
                    "_blank"
                  );
                }}
                type="button"
                className="w-full bg-[#346896] text-white py-2 rounded-lg hover:bg-blue-950 transition duration-300"
              >
                Submit Research
              </button>
            </div>
          </div>

          {/* <div  className="pt-6 w-full">
                        <button
                            onClick={() => navigate("/")}
                            type="button"
                             className="w-full bg-[#346896] text-white py-2 rounded-lg hover:bg-blue-950 transition duration-300"
                        >
                            Explore Now
                        </button>
                    </div> */}
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center">
          <img
            src={sideImage}
            alt="After Signup"
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AfterSignupSection;
