import { Button, Card, Row, Col, Space } from "antd";
import {
  DatabaseOutlined,
  TeamOutlined,
  HeartOutlined,
  UserAddOutlined,
  BugOutlined,
  BookOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import missionImage from "../assets/images/about/mission.webp";
import databaseImage from "../assets/images/about/database.webp";
import BenefitImage from "../assets/images/about/Benefit.webp";
import HelpImage from "../assets/images/about/Help.webp";

const About = () => {
  const themeColor = "#214a78";

  const handleNavigation = (url, external = false) => {
    if (external) {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  };

  return (
    <div  className="bg-white">
      {/* Hero Section */}
      <section  className="bg-[#f0f8ff] py-16 px-6 lg:px-32 text-center">
        <div  className="max-w-[1280px] mx-auto">
          <h1  className="text-5xl font-extrabold text-[#214a78] mb-6 leading-tight">
            About MHI's H₂ Research Database
          </h1>
          <p  className="text-xl text-gray-700 leading-relaxed mb-6 max-w-4xl mx-auto">
            A centralized home for peer-reviewed hydrogen medicine research -
            accelerating the understanding and application of molecular
            hydrogen.
          </p>
          <div  className="max-w-3xl mx-auto">
            <p  className="text-lg text-gray-600 leading-relaxed">
              This platform exists to bring clarity, accessibility, and
              scientific integrity to a rapidly growing field — supporting
              researchers, healthcare professionals, educators, and advocates
              who believe in evidence-based innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4 py-8">
        {/* Our Mission */}
        <Section
          title="Our Mission"
          subtitle="Advancing the Research of H₂ Therapy"
          text="The H₂ Research Database was developed by the Molecular Hydrogen Institute (MHI), a science-based 501(c)3 nonprofit dedicated to advancing research, education, and awareness of hydrogen gas as a potential medical therapy."
          additionalText="By organizing published studies and simplifying access to emerging evidence, the database supports MHI's broader mission: to equip scientists, clinicians, and the public with trusted, up-to-date resources that move the field forward."
          image={missionImage}
          actionButton={{
            text: "→ Support this work by subscribing",
            link: "/subscription",
          }}
        />

        {/* What You'll Find in the Database */}
        <Section
          title="What You'll Find in the Database"
          text="The H₂ Research Database is a living, growing collection of peer-reviewed articles from across the field of hydrogen therapy. Built and maintained by the Molecular Hydrogen Institute, it's designed to make trusted research accessible, searchable, and usable for professionals, educators, and curious learners alike."
          list={[
            "Peer-Reviewed Studies: Explore published research from leading scientific journals, indexed and organized by MHI and MHI Volunteers.",
            "Searchable Categories: Filter studies by organ system, disease model, biomarkers, administration method, and more.",
            "Tools for Researchers: Premium users can save, sort, and export articles.",
            "Collaborative Contributions: Verified by certified contributors and researchers, this is a database built with the community, not just for it.",
            "Ongoing Growth: With thousands of studies that still need to be added, your feedback and participation directly shape the quality and impact of this database.",
          ]}
          image={databaseImage}
          reverse
          actionText="This project depends on trusted contributors, volunteers, and supporters. Join us in building the future of hydrogen science."
          actionButtons={[
            {
              text: "Apply to Contribute",
              link: "https://docs.google.com/document/d/1K5PkJhq8trSa1Z_6zn-JIpntYHKYzhLXoEKGuC3S7rk/edit?tab=t.kp2ebou09lf8",
              external: true,
            },
            { text: "Submit Feedback", link: "/contact-us" },
            { text: "Support the Mission", link: "/subscription" },
          ]}
        />

        {/* Who Can Benefit */}
        <Section
          title="Who Can Benefit from This Database?"
          text="Whether you're conducting clinical research, teaching future healthcare providers, or exploring the science behind emerging wellness tools, the H₂ Research Database was built to serve you."
          subtitle="This resource is ideal for:"
          list={[
            "Researchers looking for credible, peer-reviewed studies to inform their work and publications",
            "Healthcare Professionals exploring the therapeutic potential of molecular hydrogen in clinical or integrative settings",
            "Students & Educators seeking a reliable source of hydrogen-related scientific literature for learning and teaching",
            "Industry Leaders developing hydrogen-based tools, technologies, or wellness applications backed by evidence",
          ]}
          image={BenefitImage}
          actionText="If you believe in data-driven innovation, you're in the right place. Help us grow this resource — and make hydrogen science stronger for everyone."
          actionButtons={[
            {
              text: "Join the MHI Community",
              link: "https://molecularhydrogeninstitute.org/mhi-community/",
              external: true,
            },
            { text: "Explore the Database", link: "/explore-data" },
          ]}
        />

        {/* A Living Resource */}
        <section  className="mb-16">
          <div  className="flex flex-col md:flex-row items-center gap-8 md:flex-row-reverse">
            <div  className="flex-1">
              <h2  className="text-3xl font-bold text-[#214a78] mb-6">
                A Living Resource — Powered by a Mission-Driven Community
              </h2>
              <p  className="text-gray-700 text-lg leading-relaxed mb-6">
                Our H₂ Research Database is actively evolving. With hundreds of
                studies already included and thousands more to come, we're
                building the most trusted resource on hydrogen therapy — one
                entry, one contributor, and one volunteer at a time.
              </p>
              <p  className="text-gray-700 text-lg leading-relaxed mb-8">
                We're committed to accuracy, accessibility, and transparency —
                but we can't do it alone.
              </p>

              <div  className="mb-8">
                <h3  className="text-xl font-semibold text-[#214a78] mb-4">
                  How You Can Help:
                </h3>
                <p  className="text-gray-700 mb-4">
                  We invite anyone interested to get involved by:
                </p>
                <ul  className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    Contributing your expertise as a researcher, reviewer, or
                    volunteer
                  </li>
                  <li>Sharing your feedback to improve the experience</li>
                  <li>Support the mission by becoming a member or donor</li>
                </ul>
              </div>

              <p  className="text-gray-700 text-lg leading-relaxed font-medium">
                Your participation helps shape the future of hydrogen medicine —
                and keeps this resource free, trusted, and science-first.
              </p>
            </div>
            <div  className="flex-1">
              <img
                src={HelpImage}
                alt="Community Support"
                 className="rounded-lg shadow-md w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* Learn More Section */}
        <section  className="mb-16">
          <h2  className="text-3xl font-bold text-[#214a78] mb-8 text-center">
            Learn More About MHI and Get Involved
          </h2>

          <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* About MHI */}
            <Card
               className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full"
              style={{ borderRadius: "16px" }}
              onClick={() =>
                handleNavigation(
                  "https://molecularhydrogeninstitute.org/about/",
                  true
                )
              }
            >
              <div  className="text-center p-4">
                <div  className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <TeamOutlined
                    style={{ fontSize: "24px", color: themeColor }}
                  />
                </div>
                <h3  className="text-lg font-semibold text-[#214a78] mb-3">
                  About MHI
                </h3>
                <p  className="text-gray-700 text-sm leading-relaxed mb-4">
                  Our origin, mission, and nonprofit work
                </p>
                <Button
                  type="default"
                  icon={<ArrowRightOutlined />}
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  Learn More
                </Button>
              </div>
            </Card>

            {/* Scientific Advisory Panel */}
            <Card
               className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full"
              style={{ borderRadius: "16px" }}
              onClick={() =>
                handleNavigation(
                  "https://molecularhydrogeninstitute.org/advisory-panel/",
                  true
                )
              }
            >
              <div  className="text-center p-4">
                <div  className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                  <UserAddOutlined
                    style={{ fontSize: "24px", color: themeColor }}
                  />
                </div>
                <h3  className="text-lg font-semibold text-[#214a78] mb-3">
                  Scientific Advisory Panel
                </h3>
                <p  className="text-gray-700 text-sm leading-relaxed mb-4">
                  Trusted leaders in the field
                </p>
                <Button
                  type="default"
                  icon={<ArrowRightOutlined />}
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  Meet the Panel
                </Button>
              </div>
            </Card>

            {/* Note From Founder */}
            <Card
               className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full"
              style={{ borderRadius: "16px" }}
              onClick={() =>
                handleNavigation(
                  "https://molecularhydrogeninstitute.org/a-note-from-the-founder/",
                  true
                )
              }
            >
              <div  className="text-center p-4">
                <div  className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <HeartOutlined
                    style={{ fontSize: "24px", color: themeColor }}
                  />
                </div>
                <h3  className="text-lg font-semibold text-[#214a78] mb-3">
                  A Note From the Founder
                </h3>
                <p  className="text-gray-700 text-sm leading-relaxed mb-4">
                  Why This Matters
                </p>
                <Button
                  type="default"
                  icon={<ArrowRightOutlined />}
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  Read More
                </Button>
              </div>
            </Card>

            {/* Certifications */}
            <Card
               className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full"
              style={{ borderRadius: "16px" }}
              onClick={() =>
                handleNavigation(
                  "https://molecularhydrogeninstitute.org/certifications/",
                  true
                )
              }
            >
              <div  className="text-center p-4">
                <div  className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                  <BookOutlined
                    style={{ fontSize: "24px", color: themeColor }}
                  />
                </div>
                <h3  className="text-lg font-semibold text-[#214a78] mb-3">
                  Certifications
                </h3>
                <p  className="text-gray-700 text-sm leading-relaxed mb-4">
                  Advance your H₂ education
                </p>
                <Button
                  type="default"
                  icon={<ArrowRightOutlined />}
                  style={{ borderColor: themeColor, color: themeColor }}
                >
                  Get Certified
                </Button>
              </div>
            </Card>

            {/* Join MHI Community */}
            <Card
               className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer h-full"
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
              <div  className="text-center p-4">
                <div  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <TeamOutlined style={{ fontSize: "24px", color: "white" }} />
                </div>
                <h3  className="text-lg font-semibold text-[#214a78] mb-3">
                  Join the MHI Community
                </h3>
                <p  className="text-gray-700 text-sm leading-relaxed mb-4">
                  Help sustain this work
                </p>
                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  style={{
                    backgroundColor: themeColor,
                    borderColor: themeColor,
                  }}
                >
                  Join Now
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

const Section = ({
  title,
  subtitle,
  text,
  additionalText,
  list,
  image,
  reverse,
  actionText,
  actionButton,
  actionButtons,
}) => {
  const themeColor = "#214a78";

  const handleNavigation = (url, external = false) => {
    if (external) {
      window.open(url, "_blank");
    } else {
      window.location.href = url;
    }
  };

  return (
    <div
       className={`flex flex-col md:flex-row items-center gap-8 mb-20 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div  className="flex-1">
        <h2  className="text-3xl font-bold text-[#214a78] mb-4">{title}</h2>
        {subtitle && (
          <h3  className="text-xl font-semibold text-[#214a78] mb-6">
            {subtitle}
          </h3>
        )}
        <p  className="text-gray-700 text-lg leading-relaxed mb-6">{text}</p>
        {additionalText && (
          <p  className="text-gray-700 text-lg leading-relaxed mb-6">
            {additionalText}
          </p>
        )}
        {list && (
          <ul  className="list-disc pl-6 space-y-3 mb-6 text-gray-700">
            {list.map((item, index) => (
              <li key={index}  className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        )}
        {actionText && (
          <p  className="text-gray-700 text-lg leading-relaxed font-medium mb-6">
            {actionText}
          </p>
        )}
        {actionButton && (
          <div  className="mb-6">
            <Button
              type="primary"
              size="large"
              onClick={() => handleNavigation(actionButton.link)}
              style={{ backgroundColor: themeColor, borderColor: themeColor }}
            >
              {actionButton.text}
            </Button>
          </div>
        )}
        {actionButtons && (
          <Space wrap size="middle">
            {actionButtons.map((button, index) => (
              <Button
                key={index}
                type={index === 0 ? "primary" : "default"}
                size="large"
                onClick={() => handleNavigation(button.link, button.external)}
                style={
                  index === 0
                    ? { backgroundColor: themeColor, borderColor: themeColor }
                    : { borderColor: themeColor, color: themeColor }
                }
              >
                👉 {button.text}
              </Button>
            ))}
          </Space>
        )}
      </div>
      <div  className="flex-1">
        <img
          src={image}
          alt={title}
           className="rounded-lg shadow-md w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default About;
