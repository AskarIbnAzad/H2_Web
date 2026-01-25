import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import {
  HeartOutlined,
  TeamOutlined,
  BookOutlined,
  DatabaseOutlined,
  UserOutlined,
  QuestionCircleOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const SupportMHISection = () => {
  const themeColor = '#214a78';

  const handleJoinCommunity = () => {
    window.open('https://molecularhydrogeninstitute.org/mhi-community/', '_blank');
  };

  const handleViewPlans = () => {
    window.location.href = '/subscription';
  };

  const benefits = [
    'Connect with leading H₂ researchers worldwide',
    'Monthly Q&A sessions with Dr. Tyler LeBaron',
    'Access exclusive research insights and resources',
   
    'Join committees advancing hydrogen science',
    'Priority support and expert consultation'
  ];

  const impactStats = [
    { number: '3,000+', label: 'Research Studies', icon: <DatabaseOutlined /> },
    { number: '50+', label: 'Countries Represented', icon: <TeamOutlined /> },
    { number: '500+', label: 'Community Members', icon: <UserOutlined /> },
    { number: '15+', label: 'Years of Research', icon: <BookOutlined /> }
  ];

  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-16 lg:py-20 px-4 sm:px-6">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-bl from-blue-100 to-transparent rounded-full opacity-60 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-tr from-purple-100 to-transparent rounded-full opacity-60 translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full opacity-40"></div>
      </div>

      <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-2 sm:p-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=25E4KWZ7QPH6J"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Donate to MHI via PayPal"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-4 sm:mb-6 lg:mb-8 rounded-full bg-gradient-to-r from-[#214a78] to-[#1a3a5f] shadow-2xl hover:scale-105 transition-transform duration-200">
              <HeartOutlined style={{ fontSize: '24px', color: 'white' }} className="sm:!text-3xl lg:!text-4xl" />
            </div>
          </a>

          <h2 level={1} style={{ color: themeColor, }} className='text-2xl sm:text-3xl lg:text-4xl mb-3 font-extrabold'>
            Support MHI
          </h2>

          <Paragraph className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
            Join the movement advancing molecular hydrogen science. Your support powers the world's most trusted H₂ research database and connects you with a global community of innovators.
          </Paragraph>

          <a
            href="https://www.paypal.com/donate/?hosted_button_id=25E4KWZ7QPH6J"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Donate to MHI via PayPal"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#004c78] to-[#0066a3] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold shadow-lg border border-white/20 hover:scale-105 transition-transform duration-200">
              <StarOutlined />
              <Text className="text-white font-semibold text-sm sm:text-base">501(c)(3) Science-Based Nonprofit</Text>
            </div>
          </a>
        </div>

        {/* Impact Stats */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <Row gutter={[16, 16]} justify="center">
            {impactStats.map((stat, index) => (
              <Col xs={12} sm={12} md={6} key={index}>
                <div className="text-center bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-2 sm:mb-3 lg:mb-4 rounded-full bg-gradient-to-r from-[#214a78] to-[#1a3a5f]">
                    {React.cloneElement(stat.icon, { style: { fontSize: '16px', color: 'white' } }, { className: 'sm:!text-xl lg:!text-2xl' })}
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#214a78] mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-xs sm:text-sm lg:text-base text-gray-600 font-medium leading-tight">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <Row gutter={0} align="middle">
            {/* Left Column - Benefits */}
            <Col xs={24} lg={12}>
              <div className="p-6 sm:p-8 lg:p-12">
                <div className="mb-6 sm:mb-8">
                  <h2 style={{ color: themeColor }} className='text-xl sm:text-2xl lg:text-3xl mb-3 font-extrabold'>
                    Why Join the MHI Community?
                  </h2>
                  <Paragraph className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    As a 501(c)(3) nonprofit, every membership directly funds database development,
                    research initiatives, and educational resources that benefit the entire hydrogen community.
                  </Paragraph>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center p-3 sm:p-4 bg-blue-50 rounded-xl sm:rounded-2xl">
                    <RocketOutlined style={{ fontSize: '20px', marginRight: '12px', color: '#3b82f6' }} className="sm:!text-2xl sm:!mr-4" />
                    <Text className="text-sm sm:text-lg text-gray-800 font-medium">
                      Accelerate breakthrough discoveries in hydrogen medicine
                    </Text>
                  </div>
                  <div className="flex items-center p-3 sm:p-4 bg-emerald-50 rounded-xl sm:rounded-2xl">
                    <TeamOutlined style={{ fontSize: '20px', marginRight: '12px', color: '#10b981' }} className="sm:!text-2xl sm:!mr-4" />
                    <Text className="text-sm sm:text-lg text-gray-800 font-medium">
                      Connect with the world's leading H₂ researchers
                    </Text>
                  </div>
                  <div className="flex items-center p-3 sm:p-4 bg-amber-50 rounded-xl sm:rounded-2xl">
                    <DatabaseOutlined style={{ fontSize: '20px', marginRight: '12px', color: '#f59e0b' }} className="sm:!text-2xl sm:!mr-4" />
                    <Text className="text-sm sm:text-lg text-gray-800 font-medium">
                      Access the most comprehensive hydrogen database
                    </Text>
                  </div>
                </div>
              </div>
            </Col>

            {/* Right Column - Member Benefits */}
            <Col xs={24} lg={12}>
              <div className="bg-gradient-to-br from-[#214a78] to-[#1a3a5f] p-6 sm:p-8 lg:p-12 h-full">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 style={{ color: 'white' }} className='text-xl sm:text-2xl lg:text-3xl mb-3 font-extrabold'>
                    🌟 Member Benefits
                  </h2>
                  <Text className="text-white/90 text-sm sm:text-base">
                    Everything you need to stay at the forefront of H₂ science
                  </Text>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircleOutlined
                        style={{
                          color: '#10b981',
                          marginRight: '12px',
                          marginTop: '4px',
                          fontSize: '16px'
                        }}
                        className="sm:!text-lg"
                      />
                      <Text className="text-white/90 text-sm sm:text-base leading-relaxed">{benefit}</Text>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <div className="mb-4 sm:mb-6">
                    <Text className="text-white/70 text-xs sm:text-sm uppercase tracking-wider font-semibold">
                      Starting from just
                    </Text>
                    <div className="text-3xl sm:text-4xl font-bold text-white mt-2">
                      $7<span className="text-lg sm:text-xl text-white/70">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <Button
                      type="primary"
                      size="large"
                      icon={<ArrowRightOutlined />}
                      onClick={handleJoinCommunity}
                      className="w-full"
                      style={{
                        backgroundColor: '#eab308',
                        borderColor: '#eab308',
                        color: '#000',
                        height: '48px',
                        fontSize: '16px',
                        fontWeight: '600',
                        borderRadius: '12px'
                      }}
                    >
                      <span className="hidden sm:inline">Join the MHI Community</span>
                      <span className="sm:hidden">Join MHI Community</span>
                    </Button>

                    <Button
                      size="large"
                      onClick={handleViewPlans}
                      className="w-full"
                      style={{
                        borderColor: 'white',
                        color: 'white',
                        backgroundColor: 'transparent',
                        height: '44px',
                        fontSize: '14px',
                        fontWeight: '500',
                        borderRadius: '12px'
                      }}
                    >
                      <span className="hidden sm:inline">View All Plans & Pricing</span>
                      <span className="sm:hidden">View Plans</span>
                    </Button>
                  </div>

                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
                    <Text className="text-white/70 text-xs sm:text-sm">
                      ✨ Cancel anytime • Trusted by researchers worldwide
                    </Text>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Bottom CTA */}
        <div onClick={() => {
          navigate('/signup')
        }} className=" cursor-pointer text-center mt-8 sm:mt-12 lg:mt-16">
          <div className="bg-gradient-to-r from-[#004c78] to-[#0066a3] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white shadow-2xl hover:shadow-[#004c78]/20 transition-all duration-500">
            <h2 style={{ color: 'white' }} className='text-xl sm:text-2xl lg:text-3xl mb-3 font-extrabold'>
              Ready to Shape the Future of Hydrogen Medicine?
            </h2>
            <Paragraph className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed">
              Your support doesn't just give you access — it powers the research that could transform healthcare.
              Join us in building the future of molecular hydrogen science.
            </Paragraph>
            <div className="flex items-center justify-center gap-2">
              <RocketOutlined style={{ fontSize: '16px' }} className="sm:!text-lg" />
              <Text className="text-white/80 text-sm sm:text-base text-center">
                Join thousands of researchers, practitioners, and advocates advancing H₂ science together
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportMHISection;