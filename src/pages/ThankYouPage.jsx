import React from 'react';
import { Button, Typography, Row, Col } from "antd";
import { 
  CheckCircleOutlined, 
  DatabaseOutlined,
  BookOutlined,
  TeamOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const ThankYouPage = () => {
  const themeColor = "#214a78";

  const nextSteps = [
    {
      icon: <DatabaseOutlined style={{ fontSize: '28px', color: themeColor }} />,
      title: "Browse our Research Database",
      description: "Explore thousands of peer-reviewed hydrogen research studies",
      link: "/explore-data",
      buttonText: "Explore Database"
    },
    {
      icon: <BookOutlined style={{ fontSize: '28px', color: themeColor }} />,
      title: "Courses & Certifications",
      description: "Learn from experts and earn professional certifications",
      link: "https://molecularhydrogeninstitute.org/certifications/",
      buttonText: "View Courses",
      external: true
    },
    {
      icon: <TeamOutlined style={{ fontSize: '28px', color: themeColor }} />,
      title: "Join the MHI Community",
      description: "Connect with researchers and practitioners worldwide",
      link: "https://molecularhydrogeninstitute.org/mhi-community/",
      buttonText: "Join Community",
      external: true,
      featured: true
    }
  ];

  const handleNavigation = (link, external = false) => {
    if (external) {
      window.open(link, '_blank');
    } else {
      window.location.href = link;
    }
  };

  return (
    <div  className="min-h-screen bg-white">
      <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
        
        {/* Main Content Container */}
        <div  className="min-h-screen flex items-center justify-center py-12">
          <div  className="w-full max-w-4xl">
            
            {/* Success Icon and Header */}
            <div  className="text-center mb-16">
              <div  className="mb-8">
                <div 
                   className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${themeColor}` }}
                >
                  <CheckCircleOutlined style={{ fontSize: "48px", color: "white" }} />
                </div>
                <Title 
                  level={1} 
                  style={{ 
                    color: themeColor, 
                    margin: 0, 
                    fontSize: "48px", 
                    fontWeight: "700",
                    lineHeight: "1.2" 
                  }}
                >
                  Thank You for Reaching Out!
                </Title>
              </div>
              
              <div  className="max-w-2xl mx-auto">
                <Paragraph 
                   className="text-xl text-gray-600 mb-8 leading-relaxed"
                  style={{ fontSize: "20px", lineHeight: "1.6" }}
                >
                  We've received your message and a member of the MHI team will get back to you within 5-7 business days.
                </Paragraph>
                
                <Title 
                  level={3} 
                  style={{ 
                    color: themeColor, 
                    marginBottom: "48px",
                    fontSize: "28px",
                    fontWeight: "600" 
                  }}
                >
                  In the meantime, feel free to explore:
                </Title>
              </div>
            </div>
            
            {/* Action Cards */}
            <Row gutter={[32, 32]}  className="mb-16">
              {nextSteps.map((step, index) => (
                <Col xs={24} lg={8} key={index}>
                  <div
                     className={`bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border ${
                      step.featured ? `border-2 border-[${themeColor}]` : 'border-gray-100'
                    }`}
                    onClick={() => handleNavigation(step.link, step.external)}
                  >
                    {step.featured && (
                      <div  className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div 
                           className="px-4 py-1 rounded-full text-white text-sm font-semibold"
                          style={{ backgroundColor: themeColor }}
                        >
                          Most Popular
                        </div>
                      </div>
                    )}
                    
                    <div  className="text-center">
                      <div 
                         className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: `${themeColor}10` }}
                      >
                        {step.icon}
                      </div>
                      
                      <Title 
                        level={4} 
                        style={{ 
                          color: themeColor, 
                          marginBottom: "16px",
                          fontSize: "22px",
                          fontWeight: "600" 
                        }}
                      >
                        {step.title}
                      </Title>
                      
                      <Paragraph 
                         className="text-gray-600 mb-8 leading-relaxed"
                        style={{ fontSize: "16px", lineHeight: "1.6" }}
                      >
                        {step.description}
                      </Paragraph>
                      
                      <Button
                        type={step.featured ? "primary" : "default"}
                        size="large"
                        icon={<ArrowRightOutlined />}
                         className="w-full font-semibold"
                        style={{
                          height: "52px",
                          fontSize: "16px",
                          borderRadius: "12px",
                          ...(step.featured ? {
                            backgroundColor: themeColor,
                            borderColor: themeColor,
                          } : {
                            borderColor: themeColor,
                            color: themeColor
                          })
                        }}
                      >
                        {step.buttonText}
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Bottom Message */}
            <div  className="text-center pt-12 border-t border-gray-100">
              <div  className="max-w-3xl mx-auto">
                <Paragraph 
                   className="text-gray-600 italic mb-6 leading-relaxed"
                  style={{ fontSize: "18px", lineHeight: "1.7" }}
                >
                  We're honored to have your interest in molecular hydrogen and grateful to be part of this journey with you.
                </Paragraph>
                
                <Text 
                  strong 
                  style={{ 
                    color: themeColor, 
                    fontSize: "20px",
                    fontWeight: "600" 
                  }}
                >
                  — The MHI Team
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;