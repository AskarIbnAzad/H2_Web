// import React, { useState } from "react";
// import {
//   Modal,
//   Form,
//   Input,
//   Select,
//   Checkbox,
//   Button,
//   Typography,
//   Space,
//   Divider,
//   message,
//   Row,
//   Col,
//   ConfigProvider,
//   Tooltip,
// } from "antd";
// import {
//   UserOutlined,
//   MailOutlined,
//   BankOutlined,
//   ReadOutlined,
//   CheckCircleOutlined,
//   GlobalOutlined,
//   CloseOutlined,
//   InfoCircleOutlined,
// } from "@ant-design/icons";

// const { Title, Text, Paragraph } = Typography;
// const { TextArea } = Input;
// const { Option } = Select;

// const VolunteerContributorModal = ({ visible, onClose, onSubmit }) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [showResearchSubmission, setShowResearchSubmission] = useState(false);

//   const themeColor = "#214a78";

//   // Theme configuration for Ant Design components
//   const themeConfig = {
//     token: {
//       colorPrimary: themeColor,
//     },
//     components: {
//       Input: {
//         colorPrimary: themeColor,
//         colorPrimaryHover: themeColor,
//         activeBorderColor: themeColor,
//         hoverBorderColor: themeColor,
//       },
//       Select: {
//         colorPrimary: themeColor,
//         colorPrimaryHover: themeColor,
//         activeBorderColor: themeColor,
//         hoverBorderColor: themeColor,
//       },
//       Checkbox: {
//         colorPrimary: themeColor,
//         colorPrimaryHover: themeColor,
//       },
//     },
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       // Check if they have published research
//       const hasPublishedResearch =
//         values.experience?.includes("Published research");

//       if (hasPublishedResearch) {
//         setShowResearchSubmission(true);
//         setLoading(false);
//         return;
//       }

//       // Handle form submission for users without published research
//       await onSubmit?.(values);
//       message.success(
//         "Application submitted successfully! We'll be in touch soon."
//       );
//       form.resetFields();
//       onClose();
//     } catch (error) {
//       message.error("Failed to submit application. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResearchSubmissionChoice = () => {

//     // Continue with regular application submission
//     const formValues = form.getFieldsValue();

//     onSubmit?.(formValues);
//     message.success(
//       "Application submitted successfully! We'll be in touch soon."
//     );

//     form.resetFields();
//     setShowResearchSubmission(false);
//     onClose();
//   };

//   // Custom checkbox with tooltip component
//   const CheckboxWithTooltip = ({ value, children, tooltip, ischeckBox = true }) => (
//     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//       {ischeckBox ? <Checkbox value={value}>{children}</Checkbox> : <span>{children}</span>}
//       <Tooltip title={tooltip} placement="right" overlayStyle={{ maxWidth: '300px' }}>
//         <InfoCircleOutlined style={{ color: '#999', fontSize: '14px', cursor: 'help' }} />
//       </Tooltip>
//     </div>
//   );

//   if (showResearchSubmission) {
//     return (
//       <ConfigProvider theme={themeConfig}>
//         <Modal
//           title={null}
//           open={visible}
//           onCancel={() => {
//             setShowResearchSubmission(false);
//             onClose();
//           }}
//           footer={null}
//           width={Math.min(600, window.innerWidth * 0.9)}
//           centered
//           closeIcon={
//             <CloseOutlined
//               style={{
//                 fontSize: "18px",
//                 color: "#666",
//                 cursor: "pointer",
//               }}
//             />
//           }
//           styles={{
//             content: {
//               borderRadius: "12px",
//               margin: "0 16px",
//             },
//           }}
//         >
//           <div className="text-center p-4 sm:p-6">
//             <div className="mb-6">
//               <CheckCircleOutlined
//                 style={{ fontSize: "48px", color: themeColor }}
//               />
//             </div>
//             <Title
//               level={3}
//               style={{ color: themeColor, marginBottom: "16px" }}
//             >
//               Great! You've Published H₂ Research
//             </Title>
//             <Paragraph className="text-base sm:text-lg text-gray-600 mb-8">
//               Since you've published hydrogen research, would you like to submit
//               your studies to our database manually through our research
//               submission form?
//             </Paragraph>

//             <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
//               <Button
//                 size="large"
//                 style={{
//                   height: "45px",
//                   fontSize: "16px",
//                   minWidth: "180px",
//                   width: "100%",
//                   maxWidth: "220px",
//                 }}
//                 onClick={() => handleResearchSubmissionChoice(false)}
//               >
//                 No, Just Complete Application
//               </Button>

//               <Button
//                 type="primary"
//                 size="large"
//                 style={{
//                   backgroundColor: themeColor,
//                   borderColor: themeColor,
//                   height: "45px",
//                   fontSize: "16px",
//                   minWidth: "180px",
//                   width: "100%",
//                   maxWidth: "220px",
//                 }}
//                 onClick={() => handleResearchSubmissionChoice(true)}
//               >
//                 Yes, Submit My Research
//               </Button>
//             </div>
//           </div>
//         </Modal>
//       </ConfigProvider>
//     );
//   }

//   return (
//     <ConfigProvider theme={themeConfig}>
//       <Modal
//         title={null}
//         open={visible}
//         onCancel={() => {
//           onClose();
//         }}
//         footer={null}
//         width={Math.min(800, window.innerWidth * 0.95)}
//         centered
//         closeIcon={null}
//         style={{ padding: 0 }}
//         styles={{
//           content: {
//             borderRadius: "12px",
//             margin: "0 8px",
//             maxHeight: "95vh",
//             overflow: "hidden",
//           },
//         }}
//       >
//         {/* Custom Header */}
//         <div className="bg-white p-4 sm:p-6 border-b relative">
//           <CloseOutlined
//             onClick={() => {
//               onClose();
//             }}
//             style={{
//               position: "absolute",
//               top: "16px",
//               right: "16px",
//               fontSize: "18px",
//               color: "#666",
//               cursor: "pointer",
//               padding: "4px",
//               zIndex: 10,
//             }}
//           />
//           <Title
//             level={window.innerWidth < 640 ? 4 : 3}
//             style={{
//               color: themeColor,
//               margin: 0,
//               textAlign: "center",
//               paddingRight: "40px",
//               fontSize: window.innerWidth < 640 ? "18px" : "24px",
//               lineHeight: window.innerWidth < 640 ? "24px" : "32px",
//             }}
//           >
//             Apply to Volunteer as a Contributor to the Database
//           </Title>
//           <Text className="text-center block mt-2 text-gray-600 text-sm sm:text-base px-4">
//             Help us expand and verify the world's most trusted hydrogen health
//             research database.
//           </Text>
//         </div>

//         <div className="p-4 sm:p-6 max-h-[calc(80vh-120px)] overflow-y-auto">
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={handleSubmit}
//             requiredMark={false}
//             onValuesChange={(changedValues, allValues) => { }}
//           >
//             {/* Basic Info Section */}
//             <div className="mb-6 sm:mb-8">
//               <Title
//                 level={4}
//                 style={{
//                   color: themeColor,
//                   marginBottom: "16px",
//                   fontSize: "16px",
//                 }}
//               >
//                 <UserOutlined className="mr-2" />
//                 Basic Info
//               </Title>

//               <Row gutter={[16, 16]}>
//                 <Col xs={24} sm={12}>
//                   <Form.Item
//                     label="Full Name"
//                     name="fullName"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please enter your full name",
//                       },
//                     ]}
//                   >
//                     <Input
//                       placeholder="Enter your full name"
//                       prefix={<UserOutlined style={{ color: themeColor }} />}
//                       size="large"
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col xs={24} sm={12}>
//                   <Form.Item
//                     label="Email Address"
//                     name="email"
//                     rules={[
//                       { required: true, message: "Please enter your email" },
//                       { type: "email", message: "Please enter a valid email" },
//                     ]}
//                   >
//                     <Input
//                       placeholder="Enter your email address"
//                       prefix={<MailOutlined style={{ color: themeColor }} />}
//                       size="large"
//                     />
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Row gutter={[16, 16]}>
//                 <Col xs={24} sm={12}>
//                   <Form.Item
//                     label="Institution or Affiliation"
//                     name="institution"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Please enter your institution",
//                       },
//                     ]}
//                   >
//                     <Input
//                       placeholder="University, Research Center, etc."
//                       prefix={<BankOutlined style={{ color: themeColor }} />}
//                       size="large"
//                     />
//                   </Form.Item>
//                 </Col>

//                 <Col xs={24} sm={12}>
//                   <Form.Item
//                     label="Role"
//                     name="role"
//                     rules={[
//                       { required: true, message: "Please select your role" },
//                     ]}
//                   >
//                     <Select placeholder="Select your role" size="large">
//                       <Option value="student">Student</Option>
//                       <Option value="researcher">Researcher</Option>
//                       <Option value="scientist">Scientist</Option>
//                       <Option value="educator">Educator</Option>
//                       <Option value="other">Other</Option>
//                     </Select>
//                   </Form.Item>
//                 </Col>
//               </Row>

//               <Form.Item
//                 label="Country of Residence"
//                 name="country"
//                 rules={[
//                   { required: true, message: "Please enter your country" },
//                 ]}
//               >
//                 <Input
//                   placeholder="Enter your country"
//                   prefix={<GlobalOutlined style={{ color: themeColor }} />}
//                   size="large"
//                 />
//               </Form.Item>
//             </div>

//             <Divider />

//             {/* Experience & Interests Section */}
//             <div className="mb-6 sm:mb-8">
//               <Title
//                 level={4}
//                 style={{
//                   color: themeColor,
//                   marginBottom: "16px",
//                   fontSize: "16px",
//                 }}
//               >
//                 <ReadOutlined className="mr-2" />
//                 Experience & Interests
//               </Title>

//               <Form.Item
//                 label="What best describes your current experience with hydrogen research?"
//                 name="experience"
//               >
//                 <Checkbox.Group>
//                   <div className="flex flex-col space-y-3">
//                     <CheckboxWithTooltip
//                       value="Published research"
//                       tooltip="You have authored or co-authored peer-reviewed research papers related to hydrogen therapy or molecular hydrogen"
//                     >
//                       Published research
//                     </CheckboxWithTooltip>
//                     <CheckboxWithTooltip
//                       value="Conducting research"
//                       tooltip="You are currently involved in active research projects related to hydrogen or molecular medicine"
//                     >
//                       Conducting research
//                     </CheckboxWithTooltip>
//                     <CheckboxWithTooltip
//                       value="Familiar with literature"
//                       tooltip="You regularly read and understand scientific literature about hydrogen research and its applications"
//                     >
//                       Familiar with literature
//                     </CheckboxWithTooltip>
//                     <CheckboxWithTooltip
//                       value="New to the field"
//                       tooltip="You are just beginning to learn about hydrogen research and would like to contribute while learning"
//                     >
//                       New to the field
//                     </CheckboxWithTooltip>
//                   </div>
//                 </Checkbox.Group>
//               </Form.Item>

//               <Form.Item
//                 label="What areas are you most interested in helping with?"
//                 name="interests"
//               >
//                 <Checkbox.Group>
//                   <div className="flex flex-col space-y-3">
//                     <CheckboxWithTooltip
//                       value="Submitting articles"
//                       tooltip="Help us grow the database by finding and uploading new hydrogen-related research studies"
//                     >
//                       Submitting articles
//                     </CheckboxWithTooltip>
//                     <CheckboxWithTooltip
//                       value="Verifying data"
//                       tooltip="Review submitted articles to ensure accuracy in titles, authors, journal info, and other key details"
//                     >
//                       Verifying data
//                     </CheckboxWithTooltip>
//                     <CheckboxWithTooltip
//                       value="Tagging metadata"
//                       tooltip="Add important tags and categories to research papers (biomarkers, research methods, medical conditions studied, etc.)"
//                     >
//                       Tagging metadata (biomarkers, methods, conditions)
//                     </CheckboxWithTooltip>
//                     <CheckboxWithTooltip
//                       value="Literature reviews"
//                       tooltip="Reading through multiple articles on a specific topic (e.g., hydrogen and inflammation), summarizing findings, and writing a clear review. These reviews help others quickly understand what the research says"
//                     >
//                       Literature reviews
//                     </CheckboxWithTooltip>
//                     <CheckboxWithTooltip
//                       value="Translating studies"
//                       tooltip="Taking articles written in other languages (e.g., Japanese, Korean, Chinese) and translating them into English—or vice versa—so more researchers can access the information"
//                     >
//                       Translating studies
//                     </CheckboxWithTooltip>
//                   </div>
//                 </Checkbox.Group>
//               </Form.Item>

//               <Form.Item
//                 name="otherInterests"
//                 label="Other interests (please specify)"
//               >
//                 <Input
//                   placeholder="Describe any other ways you'd like to help..."
//                   size="large"
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Please briefly describe your background and why you'd like to contribute."
//                 name="background"
//               >
//                 <TextArea
//                   rows={4}
//                   placeholder="Tell us about your background, experience, and motivation for contributing to the MHI database..."
//                   size="large"
//                 />
//               </Form.Item>
//             </div>

//             <Divider />

//             {/* Agreement Section */}
//             <div className="mb-6">

//               <Form.Item
//                 // label="Estimated hours/month you can contribute"
//                 label={
//                   <CheckboxWithTooltip
//                     ischeckBox={false}
//                     value="Estimated hours/month you can contribute"
//                     tooltip="This helps us track total volunteer contributions and plan support, recognition, and future database improvements. Just give your best guess—no commitment required."
//                   >
//                     Estimated hours/month you can contribute
//                   </CheckboxWithTooltip>
//                 }
//                 name="availability"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please estimate your availability",
//                   },
//                 ]}
//               >
//                 <Input
//                   placeholder="e.g., 5-10 hours, 2-3 hours, etc."
//                   suffix="hours/month"
//                   size="large"
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="consent"
//                 valuePropName="checked"
//                 rules={[
//                   {
//                     validator: (_, value) =>
//                       value
//                         ? Promise.resolve()
//                         : Promise.reject(
//                           "Please agree to the contributor guidelines"
//                         ),
//                   },
//                 ]}
//               >
//                 <Checkbox className="text-sm items-start">
//                   <span className="">
//                     I agree to keep all internal data confidential, follow contributor best practices, and uphold the accuracy and integrity of the MHI Research Database.
//                   </span>
//                 </Checkbox>
//               </Form.Item>
//             </div>

//             {/* Submit Buttons - Responsive */}
//             <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 size="large"
//                 loading={loading}
//                 style={{
//                   backgroundColor: themeColor,
//                   borderColor: themeColor,
//                   minWidth: "180px",
//                   height: "45px",
//                   fontSize: "16px",
//                   width: "100%",
//                   maxWidth: window.innerWidth < 640 ? "100%" : "200px",
//                 }}
//               >
//                 Submit Application
//               </Button>
//               <Button
//                 size="large"
//                 onClick={() => {
//                   onClose();
//                 }}
//                 style={{
//                   minWidth: "120px",
//                   height: "45px",
//                   fontSize: "16px",
//                   width: "100%",
//                   maxWidth: window.innerWidth < 640 ? "100%" : "140px",
//                 }}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </div>
//       </Modal>
//     </ConfigProvider>
//   );
// };

// export default VolunteerContributorModal;



import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Typography,
  Space,
  Divider,
  message,
  Row,
  Col,
  ConfigProvider,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  BankOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { apiHandle } from "../../config/apiHandle/apiHandle"; // Add this import

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const VolunteerContributorModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showResearchSubmission, setShowResearchSubmission] = useState(false);
  const [formData, setFormData] = useState(null);
  const themeColor = "#214a78";

  // Theme configuration for Ant Design components
  const themeConfig = {
    token: {
      colorPrimary: themeColor,
    },
    components: {
      Input: {
        colorPrimary: themeColor,
        colorPrimaryHover: themeColor,
        activeBorderColor: themeColor,
        hoverBorderColor: themeColor,
      },
      Select: {
        colorPrimary: themeColor,
        colorPrimaryHover: themeColor,
        activeBorderColor: themeColor,
        hoverBorderColor: themeColor,
      },
      Checkbox: {
        colorPrimary: themeColor,
        colorPrimaryHover: themeColor,
      },
    },
  };

  const handleSubmit = async (values) => {
    setFormData(values);
    setLoading(true);

    try {
      // Check if they have published research
      const hasPublishedResearch = values.experience?.includes("Published research");

      if (hasPublishedResearch) {
        setShowResearchSubmission(true);
        setLoading(false);
        return;
      }

      const bodyData = {
        fullName: values.fullName,
        email: values.email,
        institution: values.institution,
        role: values.role,
        country: values.country,
        experience: values.experience || [],
        interests: values.interests || [],
        otherInterests: values.otherInterests || "",
        background: values.background || "",
        availability: values.availability,
        consent: values.consent,
        hasPublishedResearch: false
      };

      // Call API
      const response = await apiHandle.post("add-contributor", bodyData);

      // Success message
      message.success("Application submitted successfully! We'll be in touch soon.");

      // Call parent onSubmit if provided
      if (onSubmit) {
        onSubmit(values);
      }

      form.resetFields();
      onClose();

    } catch (error) {
      console.error("API Error:", error);
      message.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResearchSubmissionChoice = async (submitResearch) => {
    setLoading(true);

    try {
      // if (submitResearch) {
      //   message.info("Redirecting to research submission form...");
      //   // Handle research submission navigation here
      // }

      // Use stored form data instead of getFieldsValue
      if (!formData) {
        message.error("Form data not available. Please try again.");
        setLoading(false);
        return;
      }

      // Prepare data for API submission
      const bodyData = {
        fullName: formData.fullName,
        email: formData.email,
        institution: formData.institution,
        role: formData.role,
        country: formData.country,
        experience: formData.experience || [],
        interests: formData.interests || [],
        otherInterests: formData.otherInterests || "",
        background: formData.background || "",
        availability: formData.availability,
        consent: formData.consent,
        hasPublishedResearch: true,
        wantsToSubmitResearch: submitResearch
      };

      // Call API
      const response = await apiHandle.post("add-contributor", bodyData);

      message.success("Application submitted successfully! We'll be in touch soon.");

      // Call parent onSubmit if provided
      if (onSubmit) {
        onSubmit(formData);
      }

      form.resetFields();
      setFormData(null); // Clear stored data
      setShowResearchSubmission(false);
      onClose();

    } catch (error) {
      console.error("Research submission API Error:", error);
      message.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Custom checkbox with tooltip component
  const CheckboxWithTooltip = ({ value, children, tooltip, ischeckBox = true }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {ischeckBox ? <Checkbox value={value}>{children}</Checkbox> : <span>{children}</span>}
      <Tooltip title={tooltip} placement="right" overlayStyle={{ maxWidth: '300px' }}>
        <InfoCircleOutlined style={{ color: '#999', fontSize: '14px', cursor: 'help' }} />
      </Tooltip>
    </div>
  );

  if (showResearchSubmission) {
    return (
      <ConfigProvider theme={themeConfig}>
        <Modal
          title={null}
          open={visible}
          onCancel={() => {
            setShowResearchSubmission(false);
            setFormData(null);
            onClose();
          }}
          footer={null}
          width={Math.min(600, window.innerWidth * 0.9)}
          centered
          closeIcon={
            <CloseOutlined
              style={{
                fontSize: "18px",
                color: "#666",
                cursor: "pointer",
              }}
            />
          }
          styles={{
            content: {
              borderRadius: "12px",
              margin: "0 16px",
            },
          }}
        >
          <div className="text-center p-4 sm:p-6">
            <div className="mb-6">
              <CheckCircleOutlined
                style={{ fontSize: "48px", color: themeColor }}
              />
            </div>
            <Title
              level={3}
              style={{ color: themeColor, marginBottom: "16px" }}
            >
              Great! You've Published H₂ Research
            </Title>
            <Paragraph className="text-base sm:text-lg text-gray-600 mb-8">
              Since you've published hydrogen research, would you like to submit
              your studies to our database manually through our research
              submission form?
            </Paragraph>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button
                size="large"
                loading={loading}
                style={{
                  height: "45px",
                  fontSize: "16px",
                  minWidth: "180px",
                  width: "100%",
                  maxWidth: "220px",
                }}
                onClick={() => handleResearchSubmissionChoice(false)}
              >
                No, Just Complete Application
              </Button>

              <Button
                type="primary"
                size="large"
                loading={loading}
                style={{
                  backgroundColor: themeColor,
                  borderColor: themeColor,
                  height: "45px",
                  fontSize: "16px",
                  minWidth: "180px",
                  width: "100%",
                  maxWidth: "220px",
                }}
                onClick={() => handleResearchSubmissionChoice(true)}
              >
                Yes, Submit My Research
              </Button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    );
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <Modal
        title={null}
        open={visible}
        onCancel={() => {
          onClose();
        }}
        footer={null}
        width={Math.min(800, window.innerWidth * 0.95)}
        centered
        closeIcon={null}
        style={{ padding: 0 }}
        styles={{
          content: {
            borderRadius: "12px",
            margin: "0 8px",
            maxHeight: "95vh",
            overflow: "hidden",
          },
        }}
      >
        {/* Custom Header */}
        <div className="bg-white p-4 sm:p-6 border-b relative">
          <CloseOutlined
            onClick={() => {
              onClose();
            }}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              fontSize: "18px",
              color: "#666",
              cursor: "pointer",
              padding: "4px",
              zIndex: 10,
            }}
          />
          <Title
            level={window.innerWidth < 640 ? 4 : 3}
            style={{
              color: themeColor,
              margin: 0,
              textAlign: "center",
              paddingRight: "40px",
              fontSize: window.innerWidth < 640 ? "18px" : "24px",
              lineHeight: window.innerWidth < 640 ? "24px" : "32px",
            }}
          >
            Apply to Volunteer as a Contributor to the Database
          </Title>
          <Text className="text-center block mt-2 text-gray-600 text-sm sm:text-base px-4">
            Help us expand and verify the world's most trusted hydrogen health
            research database.
          </Text>
        </div>

        <div className="p-4 sm:p-6 max-h-[calc(80vh-120px)] overflow-y-auto">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            onValuesChange={(changedValues, allValues) => {
            }}
          >
            {/* Basic Info Section */}
            <div className="mb-6 sm:mb-8">
              <Title
                level={4}
                style={{
                  color: themeColor,
                  marginBottom: "16px",
                  fontSize: "16px",
                }}
              >
                <UserOutlined className="mr-2" />
                Basic Info
              </Title>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter your full name"
                      prefix={<UserOutlined style={{ color: themeColor }} />}
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input
                      placeholder="Enter your email address"
                      prefix={<MailOutlined style={{ color: themeColor }} />}
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Institution or Affiliation"
                    name="institution"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your institution",
                      },
                    ]}
                  >
                    <Input
                      placeholder="University, Research Center, etc."
                      prefix={<BankOutlined style={{ color: themeColor }} />}
                      size="large"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                      { required: true, message: "Please select your role" },
                    ]}
                  >
                    <Select placeholder="Select your role" size="large">
                      <Option value="student">Student</Option>
                      <Option value="researcher">Researcher</Option>
                      <Option value="scientist">Scientist</Option>
                      <Option value="educator">Educator</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Country of Residence"
                name="country"
                rules={[
                  { required: true, message: "Please enter your country" },
                ]}
              >
                <Input
                  placeholder="Enter your country"
                  prefix={<GlobalOutlined style={{ color: themeColor }} />}
                  size="large"
                />
              </Form.Item>
            </div>

            <Divider />

            {/* Experience & Interests Section */}
            <div className="mb-6 sm:mb-8">
              <Title
                level={4}
                style={{
                  color: themeColor,
                  marginBottom: "16px",
                  fontSize: "16px",
                }}
              >
                <ReadOutlined className="mr-2" />
                Experience & Interests
              </Title>

              <Form.Item
                label="What best describes your current experience with hydrogen research?"
                name="experience"
              >
                <Checkbox.Group>
                  <div className="flex flex-col space-y-3">
                    <CheckboxWithTooltip
                      value="Published research"
                      tooltip="You have authored or co-authored peer-reviewed research papers related to hydrogen therapy or molecular hydrogen"
                    >
                      Published research
                    </CheckboxWithTooltip>
                    <CheckboxWithTooltip
                      value="Conducting research"
                      tooltip="You are currently involved in active research projects related to hydrogen or molecular medicine"
                    >
                      Conducting research
                    </CheckboxWithTooltip>
                    <CheckboxWithTooltip
                      value="Familiar with literature"
                      tooltip="You regularly read and understand scientific literature about hydrogen research and its applications"
                    >
                      Familiar with literature
                    </CheckboxWithTooltip>
                    <CheckboxWithTooltip
                      value="New to the field"
                      tooltip="You are just beginning to learn about hydrogen research and would like to contribute while learning"
                    >
                      New to the field
                    </CheckboxWithTooltip>
                  </div>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                label="What areas are you most interested in helping with?"
                name="interests"
              >
                <Checkbox.Group>
                  <div className="flex flex-col space-y-3">
                    <CheckboxWithTooltip
                      value="Submitting articles"
                      tooltip="Help us grow the database by finding and uploading new hydrogen-related research studies"
                    >
                      Submitting articles
                    </CheckboxWithTooltip>
                    <CheckboxWithTooltip
                      value="Verifying data"
                      tooltip="Review submitted articles to ensure accuracy in titles, authors, journal info, and other key details"
                    >
                      Verifying data
                    </CheckboxWithTooltip>
                    <CheckboxWithTooltip
                      value="Tagging metadata"
                      tooltip="Add important tags and categories to research papers (biomarkers, research methods, medical conditions studied, etc.)"
                    >
                      Tagging metadata (biomarkers, methods, conditions)
                    </CheckboxWithTooltip>
                    <CheckboxWithTooltip
                      value="Literature reviews"
                      tooltip="Reading through multiple articles on a specific topic (e.g., hydrogen and inflammation), summarizing findings, and writing a clear review. These reviews help others quickly understand what the research says"
                    >
                      Literature reviews
                    </CheckboxWithTooltip>
                    <CheckboxWithTooltip
                      value="Translating studies"
                      tooltip="Taking articles written in other languages (e.g., Japanese, Korean, Chinese) and translating them into English—or vice versa—so more researchers can access the information"
                    >
                      Translating studies
                    </CheckboxWithTooltip>
                  </div>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                name="otherInterests"
                label="Other interests (please specify)"
              >
                <Input
                  placeholder="Describe any other ways you'd like to help..."
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Please briefly describe your background and why you'd like to contribute."
                name="background"
              >
                <TextArea
                  rows={4}
                  placeholder="Tell us about your background, experience, and motivation for contributing to the MHI database..."
                  size="large"
                />
              </Form.Item>
            </div>

            <Divider />

            {/* Agreement Section */}
            <div className="mb-6">
              <Form.Item
                label={
                  <CheckboxWithTooltip
                    ischeckBox={false}
                    value="Estimated hours/month you can contribute"
                    tooltip="This helps us track total volunteer contributions and plan support, recognition, and future database improvements. Just give your best guess—no commitment required."
                  >
                    Estimated hours/month you can contribute
                  </CheckboxWithTooltip>
                }
                name="availability"
                rules={[
                  {
                    required: true,
                    message: "Please estimate your availability",
                  },
                ]}
              >
                <Input
                  placeholder="e.g., 5-10 hours, 2-3 hours, etc."
                  suffix="hours/month"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="consent"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(
                          "Please agree to the contributor guidelines"
                        ),
                  },
                ]}
              >
                <Checkbox className="text-sm items-start">
                  <span className="">
                    I agree to keep all internal data confidential, follow contributor best practices, and uphold the accuracy and integrity of the MHI Research Database.
                  </span>
                </Checkbox>
              </Form.Item>
            </div>

            {/* Submit Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                style={{
                  backgroundColor: themeColor,
                  borderColor: themeColor,
                  minWidth: "180px",
                  height: "45px",
                  fontSize: "16px",
                  width: "100%",
                  maxWidth: window.innerWidth < 640 ? "100%" : "200px",
                }}
              >
                Submit Application
              </Button>
              <Button
                size="large"
                onClick={() => {
                  onClose();
                }}
                style={{
                  minWidth: "120px",
                  height: "45px",
                  fontSize: "16px",
                  width: "100%",
                  maxWidth: window.innerWidth < 640 ? "100%" : "140px",
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default VolunteerContributorModal;