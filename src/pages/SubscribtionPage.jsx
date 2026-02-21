// import React, { useState } from "react";
// import VolunteerContributorModal from "../components/VolunteerContributorModal/VolunteerContributorModal";
// import { Card, Col, Row, Typography, Button } from "antd";
// const { Title, Text, Paragraph } = Typography;
// import { CheckCircleOutlined } from "@ant-design/icons";
// const SubscriptionPage = () => {
//   const [showVolunteerModal, setShowVolunteerModal] = useState(false);

//   const handleVolunteerSubmit = async (formData) => {
//     // Handle the form submission
//     // Send to your API
//   };

//   const membershipTiers = [
//     {
//       name: "Supporter",
//       price: "$7/month",
//       description: "Perfect for advocates and learners",
//       features: [
//         "MHI Community Access",
//         "Monthly Q&A Sessions",
//         "Resource Library",
//         "Volunteer Opportunities",
//       ],
//       buttonText: "Start Supporting",
//       buttonType: "default",
//     },
//     {
//       name: "Premium",
//       price: "$25/month",
//       description: "Ideal for professionals and researchers",
//       features: [
//         "All Supporter Benefits",
//         "Database Save & Export",
//         "Advanced Search Tools",
//         "Priority Support",
//       ],
//       buttonText: "Go Premium",
//       buttonType: "primary",
//       popular: true,
//     },
//     {
//       name: "Partner",
//       price: "$100/month",
//       description: "For organizations and dedicated supporters",
//       features: [
//         "All Premium Benefits",
//         "Priority Contact",
//         "Research Consultation",
//         "Custom Support",
//       ],
//       buttonText: "Become a Partner",
//       buttonType: "default",
//     },
//   ];

//   const handleViewPlans = () => {
//     window.location.href = "/subscription";
//   };

//   const handleJoinCommunity = () => {
//     window.open(
//       "https://molecularhydrogeninstitute.org/mhi-community/",
//       "_blank"
//     );
//   };

//   const themeColor = "#214a78";
//   return (
//     <div  className="bg-white">
//       {/* Header Section */}
//       <div  className="bg-[#f0f8ff] py-16 px-6 lg:px-32 text-center text-[#214a78]">
//         <div  className="max-w-[1280px] mx-auto">
//           <h1  className="text-5xl font-extrabold mb-6 leading-tight">
//             Join the Mission. Power the Research.
//           </h1>
//           <p  className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
//             MHI is building the world's most trusted hydrogen health research
//             database—and we want{" "}
//             <span  className="font-semibold italic">you</span> to be part of it.
//             Whether you're here to learn, contribute, or lead, there's a place
//             for you in the MHI ecosystem.
//           </p>
//         </div>
//       </div>

//       {/* Why Subscribe Section */}
//       <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4 py-16">
//         <div  className="text-center mb-16">
//           <h2  className="text-3xl font-bold text-[#214a78] mb-6">
//             Why Subscribe to MHI?
//           </h2>
//           <div  className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-4">
//             <p>
//               MHI is a science-based 501(c)(3) nonprofit advancing research,
//               education, and global awareness of hydrogen as a medical gas. We
//               don't sell hydrogen products. We provide education about hydrogen
//               therapy.
//             </p>
//             <p>
//               As the leading authority on hydrogen wellness, we're trusted by
//               researchers, guided by evidence, and powered by a global community
//               of volunteers. By joining the MHI Community, you're not just
//               subscribing, you're helping shape the future of hydrogen health.
//             </p>
//           </div>
//         </div>

//         {/* Choose Plan Section */}
//         <div  className="text-center mb-12">
//           <h2  className="text-3xl font-bold text-[#214a78] mb-4">
//             Choose the plan for you. Join us today.
//           </h2>
//         </div>

//         {/* Pricing Cards Section */}
//         <div  className=" mb-16">
//           <Row gutter={[24, 24]} justify="center">
//             {membershipTiers.map((tier, index) => (
//               <Col xs={24} md={8} key={index}>
//                 <Card
//                    className={`h-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
//                     tier.popular ? "ring-2 ring-blue-200" : ""
//                   }`}
//                   style={{
//                     borderRadius: "20px",
//                     border: tier.popular
//                       ? `2px solid ${themeColor}`
//                       : "1px solid #e5e7eb",
//                     position: "relative",
//                   }}
//                   bodyStyle={{ padding: "32px 24px" }}
//                 >
//                   {tier.popular && (
//                     <div  className="absolute -top-3 left-1/2 transform -translate-x-1/2">
//                       <div
//                          className="px-6 py-2 rounded-full text-white text-sm font-semibold"
//                         style={{ backgroundColor: themeColor }}
//                       >
//                         Most Popular
//                       </div>
//                     </div>
//                   )}

//                   <div  className="text-center">
//                     <Title
//                       level={3}
//                       style={{ color: themeColor, marginBottom: "8px" }}
//                     >
//                       {tier.name}
//                     </Title>
//                     <div  className="mb-4">
//                       <span
//                          className="text-3xl font-bold"
//                         style={{ color: themeColor }}
//                       >
//                         {tier.price}
//                       </span>
//                     </div>
//                     <Paragraph  className="text-gray-600 mb-6">
//                       {tier.description}
//                     </Paragraph>

//                     <div  className="mb-8 text-left">
//                       {tier.features.map((feature, featureIndex) => (
//                         <div
//                           key={featureIndex}
//                            className="flex items-center mb-3"
//                         >
//                           <CheckCircleOutlined
//                             style={{
//                               color: "#10b981",
//                               marginRight: "12px",
//                               fontSize: "16px",
//                             }}
//                           />
//                           <Text  className="text-gray-700">{feature}</Text>
//                         </div>
//                       ))}
//                     </div>

//                     <Button
//                       type={tier.buttonType}
//                       size="large"
//                       onClick={
//                         tier.popular ? handleJoinCommunity : handleViewPlans
//                       }
//                        className="w-full"
//                       style={{
//                         height: "48px",
//                         fontSize: "16px",
//                         fontWeight: "600",
//                         borderRadius: "12px",
//                         ...(tier.buttonType === "primary"
//                           ? {
//                               backgroundColor: themeColor,
//                               borderColor: themeColor,
//                             }
//                           : {
//                               borderColor: themeColor,
//                               color: themeColor,
//                             }),
//                       }}
//                     >
//                       {tier.buttonText}
//                     </Button>
//                   </div>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>

//         {/* Billing Note */}
//         <div  className="bg-blue-50 border-l-4 border-[#214a78] p-6 mb-12 rounded-r-lg">
//           <div  className="flex items-start">
//             <span  className="text-2xl mr-3">📌</span>
//             <div>
//               <h4  className="font-semibold text-[#214a78] mb-2">
//                 Note on Billing
//               </h4>
//               <p  className="text-gray-700 italic">
//                 Want to pay annually instead of monthly? Contact us and we'll
//                 get you set up.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Researcher Section */}
//         <div  className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 text-center mb-12">
//           <h3  className="text-2xl font-bold text-[#214a78] mb-4">
//             Are You a Researcher or Student?
//           </h3>
//           <p  className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
//             We offer{" "}
//             <span  className="font-semibold">free contributor access</span> to
//             students, scientists, and researchers, helping to expand the
//             database. This includes submitting research, verifying articles, and
//             collaborating with our team.
//           </p>
//           <button
//             onClick={() => setShowVolunteerModal(true)}
//              className="bg-white text-[#214a78] border-2 border-[#214a78] py-3 px-8 rounded-lg font-semibold hover:bg-[#214a78] hover:text-white transition-all duration-300"
//           >
//             Apply to Volunteer as a Contributor
//           </button>
//         </div>

//         {/* Mission Statement */}
//         <div  className="text-center">
//           <p  className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
//             We connect the science with real-world experience. MHI is where
//             evidence meets lived outcomes and together, we're shaping the future
//             of H₂ therapy. Be a part of the movement today.
//           </p>
//         </div>
//       </div>

//       <VolunteerContributorModal
//         visible={showVolunteerModal}
//         onClose={() => setShowVolunteerModal(false)}
//         onSubmit={handleVolunteerSubmit}
//       />
//     </div>
//   );
// };

// export default SubscriptionPage;



import React, { useState } from "react";
import VolunteerContributorModal from "../components/VolunteerContributorModal/VolunteerContributorModal";
import { Card, Col, Row, Typography, Button } from "antd";
const { Title, Text, Paragraph } = Typography;
import { CheckCircleOutlined } from "@ant-design/icons";

const SubscriptionPage = () => {
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  const handleVolunteerSubmit = (formData) => {
    // Handle the form submission
    // Send to your API
  };

  const membershipTiers = [
    {
      name: "Supporter",
      price: "$7/month",
      description: "Perfect for advocates and learners",
      features: [
        "MHI Community Access",
        "Monthly Q&A Sessions",
        "Resource Library",
        "Volunteer Opportunities",
      ],
      buttonText: "Start Supporting",
      buttonType: "default",
      url: "https://molecularhydrogeninstitute.org/mhi-community/",
    },
    {
      name: "Premium",
      price: "$25/month",
      description: "Ideal for professionals and researchers",
      features: [
        "All Supporter Benefits",
        "Database Save & Export",
        "Advanced Search Tools",
        "Priority Support",
      ],
      buttonText: "Go Premium",
      buttonType: "primary",
      popular: true,
      url: "https://molecularhydrogeninstitute.org/mhi-community/",
    },
    {
      name: "Partner",
      price: "$100/month",
      description: "For organizations and dedicated supporters",
      features: [
        "All Premium Benefits",
        "Priority Contact",
        "Research Consultation",
        "Custom Support",
      ],
      buttonText: "Become a Partner",
      buttonType: "default",
      url: "https://molecularhydrogeninstitute.org/mhi-community/",
    },
  ];

  const handleTierClick = (tier) => {
    window.open(tier.url, "_blank");
  };

  const themeColor = "#214a78";

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-[#f0f8ff] py-16 px-6 lg:px-32 text-center text-[#214a78]">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Join the Mission. Power the Research.
          </h1>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
            MHI is building the world's most trusted hydrogen health research
            database—and we want{" "}
            <span className="font-semibold italic">you</span> to be part of it.
            Whether you're here to learn, contribute, or lead, there's a place
            for you in the MHI ecosystem.
          </p>
        </div>
      </div>

      {/* Why Subscribe Section */}
      <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#214a78] mb-6">
            Why Subscribe to MHI?
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              MHI is a science-based 501(c)(3) nonprofit advancing research,
              education, and global awareness of hydrogen as a medical gas. We
              don't sell hydrogen products. We provide education about hydrogen
              therapy.
            </p>
            <p>
              As the leading authority on hydrogen wellness, we're trusted by
              researchers, guided by evidence, and powered by a global community
              of volunteers. By joining the MHI Community, you're not just
              subscribing, you're helping shape the future of hydrogen health.
            </p>
          </div>
        </div>

        {/* Choose Plan Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#214a78] mb-4">
            Choose the plan for you. Join us today.
          </h2>
        </div>

        {/* Pricing Cards Section */}
        <div className="mb-16">
          <Row gutter={[24, 24]} justify="center">
            {membershipTiers.map((tier, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  className={`h-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${tier.popular ? "ring-2 ring-blue-200" : ""
                    }`}
                  style={{
                    borderRadius: "20px",
                    border: tier.popular
                      ? `2px solid ${themeColor}`
                      : "1px solid #e5e7eb",
                    position: "relative",
                  }}
                  bodyStyle={{ padding: "32px 24px" }}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div
                        className="px-6 py-2 rounded-full text-white text-sm font-semibold"
                        style={{ backgroundColor: themeColor }}
                      >
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <Title
                      level={3}
                      style={{ color: themeColor, marginBottom: "8px" }}
                    >
                      {tier.name}
                    </Title>
                    <div className="mb-4">
                      <span
                        className="text-3xl font-bold"
                        style={{ color: themeColor }}
                      >
                        {tier.price}
                      </span>
                    </div>
                    <Paragraph className="text-gray-600 mb-6">
                      {tier.description}
                    </Paragraph>

                    <div className="mb-8 text-left">
                      {tier.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center mb-3"
                        >
                          <CheckCircleOutlined
                            style={{
                              color: "#10b981",
                              marginRight: "12px",
                              fontSize: "16px",
                            }}
                          />
                          <Text className="text-gray-700">{feature}</Text>
                        </div>
                      ))}
                    </div>

                    <Button
                      type={tier.buttonType}
                      size="large"
                      onClick={() => handleTierClick(tier)}
                      className="w-full"
                      style={{
                        height: "48px",
                        fontSize: "16px",
                        fontWeight: "600",
                        borderRadius: "12px",
                        ...(tier.buttonType === "primary"
                          ? {
                            backgroundColor: themeColor,
                            borderColor: themeColor,
                          }
                          : {
                            borderColor: themeColor,
                            color: themeColor,
                          }),
                      }}
                    >
                      {tier.buttonText}
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Support Message */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Your support helps fund research access, volunteer training, and global
            education efforts. Thank you for investing in the mission.
          </p>
        </div>

        {/* Billing Note */}
        <div className="bg-blue-50 border-l-4 border-[#214a78] p-6 mb-12 rounded-r-lg">
          <div className="flex items-start">
            <span className="text-2xl mr-3">📌</span>
            <div>
              <h4 className="font-semibold text-[#214a78] mb-2">
                Note on Billing
              </h4>
              <p className="text-gray-700 italic">
                Want to pay annually instead of monthly? Contact us and we'll
                get you set up.
              </p>
            </div>
          </div>
        </div>

        {/* Researcher Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 text-center mb-12">
          <h3 className="text-2xl font-bold text-[#214a78] mb-4">
            Are You a Researcher or Student?
          </h3>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
            We offer{" "}
            <span className="font-semibold">free contributor access</span> to
            students, scientists, and researchers, helping to expand the
            database. This includes submitting research, verifying articles, and
            collaborating with our team.
          </p>
          <button
            onClick={() => setShowVolunteerModal(true)}
            className="bg-white text-[#214a78] border-2 border-[#214a78] py-3 px-8 rounded-lg font-semibold hover:bg-[#214a78] hover:text-white transition-all duration-300"
          >
            Apply to Volunteer as a Contributor
          </button>
        </div>

        {/* Mission Statement */}
        <div className="text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            We connect the science with real-world experience. MHI is where
            evidence meets lived outcomes and together, we're shaping the future
            of H₂ therapy. Be a part of the movement today.
          </p>
        </div>
      </div>

      <VolunteerContributorModal
        visible={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
        onSubmit={handleVolunteerSubmit}
      />
    </div>
  );
};

export default SubscriptionPage;