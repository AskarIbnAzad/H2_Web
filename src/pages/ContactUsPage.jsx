// import {
//   MailOutlined,
//   BookOutlined,
//   DatabaseOutlined,
// } from "@ant-design/icons";
// import { Card, Typography } from "antd";
// import ContactForm from "../components/ContactForm/ContactForm";

// const { Title, Text, Paragraph } = Typography;

// const ContactUsPage = () => {
//   const themeColor = "#214a78";

//   const contactMethods = [
//     {
//       icon: <MailOutlined style={{ fontSize: "24px", color: themeColor }} />,
//       title: "📨 General Inquiries",
//       email: "info@molecularhydrogeninstitute.org",
//       description:
//         "Use this for: press, partnerships, database questions, or general info",
//     },
//     {
//       icon: <BookOutlined style={{ fontSize: "24px", color: themeColor }} />,
//       title: "🎓 Courses & Certification Support",
//       email: "courses@molecularhydrogeninstitute.org",
//       description:
//         "Use this for: course access, progress help, or technical issues",
//     },
//     {
//       icon: (
//         <DatabaseOutlined style={{ fontSize: "24px", color: themeColor }} />
//       ),
//       title: "🎓 Submit Research PDF's or URLs",
//       email: "info@h2research.org",
//       description: "Use this for: submitting missing research to the database",
//     },
//   ];

//   return (
//     <div  className="bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div  className="bg-[#f0f8ff] py-16 px-6 lg:px-32 text-center text-[#214a78]">
//         <div  className="max-w-[1280px] mx-auto">
//           <h1  className="text-5xl font-extrabold mb-6 leading-tight">
//             Contact Us
//           </h1>
//           <p  className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
//             Have a question or want to submit feedback about hydrogen research,
//             our certification programs, or getting involved with MHI? We'd love
//             to hear from you. Fill out the form below or connect with us
//             directly through one of the options listed.
//           </p>
//           <div  className="mt-6 p-4 bg-white/85 rounded-lg backdrop-blur-sm">
//             <Text  className="text-lg text-[#214a78]">
//               <strong>Please note:</strong> We're a small (but mighty) team.
//               Most inquiries are answered within 5–7 business days, though some
//               may take longer.
//             </Text>
//           </div>
//         </div>
//       </div>

//       <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4 -mt-8">
//         {/* Contact Methods Grid */}
//         <div  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           {contactMethods.map((method, index) => (
//             <Card
//               key={index}
//                className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0"
//               style={{ borderRadius: "12px" }}
//             >
//               <div  className="text-center p-4">
//                 <div  className="mb-4">{method.icon}</div>
//                 <Title
//                   level={4}
//                   style={{ color: themeColor, marginBottom: "12px" }}
//                 >
//                   {method.title}
//                 </Title>
//                 <div  className="mb-3">
//                   <Text strong style={{ color: themeColor, fontSize: "16px" }}>
//                     Email:
//                   </Text>
//                   <br />
//                   <a
//                     href={`mailto:${method.email}`}
//                      className="text-blue-600 hover:text-blue-800 transition-colors"
//                     style={{ fontSize: "15px", fontWeight: "500" }}
//                   >
//                     {method.email}
//                   </a>
//                 </div>
//                 <Text  className="text-gray-600 text-sm">
//                   <strong>Use this for:</strong> {method.description}
//                 </Text>
//               </div>
//             </Card>
//           ))}
//         </div>

//         {/* Main Content Grid */}
//         <ContactForm />
//       </div>
//     </div>
//   );
// };

// export default ContactUsPage;


import {
  MailOutlined,
  BookOutlined,
  DatabaseOutlined,
  PhoneOutlined,
  GlobalOutlined,
  TeamOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { Card, Typography, Row, Col, Space, Button } from "antd";
import ContactForm from "../components/ContactForm/ContactForm";

const { Title, Text, Paragraph } = Typography;

const ContactUsPage = () => {
  const themeColor = "#214a78";

  const contactMethods = [
    {
      icon: <MailOutlined style={{ fontSize: "32px", color: "white" }} />,
      title: "General Inquiries",
      email: "info@molecularhydrogeninstitute.org",
      description: "Press, partnerships, database questions, or general info",
        bgGradient: `from-[${themeColor}] to-[#1a3a5f]`
    },
    {
      icon: <BookOutlined style={{ fontSize: "32px", color: "white" }} />,
      title: "Courses & Certification",
      email: "courses@molecularhydrogeninstitute.org",
      description: "Course access, progress help, or technical issues",
       bgGradient: `from-[${themeColor}] to-[#1a3a5f]`
    },
    {
      icon: <DatabaseOutlined style={{ fontSize: "32px", color: "white" }} />,
      title: "Submit Research",
      email: "info@h2research.org",
      description: "Submitting missing research to the database",
      bgGradient: `from-[${themeColor}] to-[#1a3a5f]`
    },
  ];

  return (
    <div  className="bg-white min-h-screen">
      {/* Header Section - Keeping exactly as requested */}
      <div  className="bg-[#f0f8ff] py-16 px-6 lg:px-32 text-center text-[#214a78]">
        <div  className="max-w-[1280px] mx-auto">
          <h1  className="text-5xl font-extrabold mb-6 leading-tight">
            Contact Us
          </h1>
          <p  className="text-xl leading-relaxed max-w-4xl mx-auto mb-8">
            Have a question or want to submit feedback about hydrogen research,
            our certification programs, or getting involved with MHI? We'd love
            to hear from you. Fill out the form below or connect with us
            directly through one of the options listed.
          </p>
          <div  className="mt-6 p-4 bg-white/85 rounded-lg backdrop-blur-sm">
            <Text  className="text-lg text-[#214a78]">
              <strong>Please note:</strong> We're a small (but mighty) team.
              Most inquiries are answered within 5–7 business days, though some
              may take longer.
            </Text>
          </div>
        </div>
      </div>

      <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
        
        {/* Enhanced Contact Methods Grid */}
        <div  className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-12 mb-16 relative z-10">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
               className="shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden"
              style={{ borderRadius: "20px" }}
              bodyStyle={{ padding: 0 }}
            >
              {/* Card Header with Gradient */}
              <div  className={`bg-gradient-to-r ${method.bgGradient} p-6 text-center text-white`}>
                <div  className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {method.icon}
                </div>
                <Title level={4} style={{ color: "white", margin: 0, fontSize: "20px" }}>
                  {method.title}
                </Title>
              </div>
              
              {/* Card Body */}
              <div  className="p-6 text-center">
                <div  className="mb-4">
                  <Text strong style={{ color: themeColor, fontSize: "16px" }}>
                    Email:
                  </Text>
                  <br />
                  <a
                    href={`mailto:${method.email}`}
                     className="text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm"
                    style={{ wordBreak: "break-word" }}
                  >
                    {method.email}
                  </a>
                </div>
                <Text  className="text-gray-600 text-sm leading-relaxed">
                  <strong>Use this for:</strong> {method.description}
                </Text>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Section */}
       <ContactForm />
      </div>
    </div>
  );
};

export default ContactUsPage;