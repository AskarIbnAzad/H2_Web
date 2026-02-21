import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaGraduationCap,
  FaRegistered,
  FaJournalWhills,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="bg-[#214a78] text-white pb-[3.8rem] pt-[22px] apple-font" >
      {/* <div  className="max-w-7xl mx-auto px-4 md:px-8"> */}
      {/* <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1920px:max-w-[1800px] mx-auto p-4"> */}
      <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
        {/* Top Section with Social Icons, Logo, and Copyright */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16">
          {/* Social Icons */}
          <div className="flex justify-start space-x-1 h-full items-center icons-footer gap-[0.3rem]">
            <a href="#" className="p-2 bg-white rounded-[3px] text-[#2C4A74] hover:scale-105 transition !ml-0">
              {/* <FaFacebookF size={20} /> */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <title>Facebook</title>
                <path d="M31.997 15.999c0-8.836-7.163-15.999-15.999-15.999s-15.999 7.163-15.999 15.999c0 7.985 5.851 14.604 13.499 15.804v-11.18h-4.062v-4.625h4.062v-3.525c0-4.010 2.389-6.225 6.043-6.225 1.75 0 3.581 0.313 3.581 0.313v3.937h-2.017c-1.987 0-2.607 1.233-2.607 2.498v3.001h4.437l-0.709 4.625h-3.728v11.18c7.649-1.2 13.499-7.819 13.499-15.804z" />
              </svg>
            </a>
            {/* <a href="#"  className="p-2 bg-white rounded-[3px] text-[#2C4A74] hover:scale-105 transition !ml-0">
              <svg width="26" height="28" viewBox="0 0 26 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <title>Twitter</title>
                <path d="M25.312 6.375c-0.688 1-1.547 1.891-2.531 2.609 0.016 0.219 0.016 0.438 0.016 0.656 0 6.672-5.078 14.359-14.359 14.359-2.859 0-5.516-0.828-7.75-2.266 0.406 0.047 0.797 0.063 1.219 0.063 2.359 0 4.531-0.797 6.266-2.156-2.219-0.047-4.078-1.5-4.719-3.5 0.313 0.047 0.625 0.078 0.953 0.078 0.453 0 0.906-0.063 1.328-0.172-2.312-0.469-4.047-2.5-4.047-4.953v-0.063c0.672 0.375 1.453 0.609 2.281 0.641-1.359-0.906-2.25-2.453-2.25-4.203 0-0.938 0.25-1.797 0.688-2.547 2.484 3.062 6.219 5.063 10.406 5.281-0.078-0.375-0.125-0.766-0.125-1.156 0-2.781 2.25-5.047 5.047-5.047 1.453 0 2.766 0.609 3.687 1.594 1.141-0.219 2.234-0.641 3.203-1.219-0.375 1.172-1.172 2.156-2.219 2.781 1.016-0.109 2-0.391 2.906-0.781z" />
              </svg>
            </a> */}
            <a href="#" className="p-2 bg-white rounded-[3px] text-[#2C4A74] hover:scale-105 transition !ml-0">
              <svg width="26" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <title>X</title>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="p-2 bg-white rounded-[3px] text-[#2C4A74] hover:scale-105 transition !ml-0">
              {/* <FaInstagram size={20} /> */}
              <svg className="kadence-svg-icon kadence-instagram-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>Instagram</title><path d="M21.138 0.242c3.767 0.007 3.914 0.038 4.65 0.144 1.52 0.219 2.795 0.825 3.837 1.821 0.584 0.562 0.987 1.112 1.349 1.848 0.442 0.899 0.659 1.75 0.758 3.016 0.021 0.271 0.031 4.592 0.031 8.916s-0.009 8.652-0.030 8.924c-0.098 1.245-0.315 2.104-0.743 2.986-0.851 1.755-2.415 3.035-4.303 3.522-0.685 0.177-1.304 0.26-2.371 0.31-0.381 0.019-4.361 0.024-8.342 0.024s-7.959-0.012-8.349-0.029c-0.921-0.044-1.639-0.136-2.288-0.303-1.876-0.485-3.469-1.784-4.303-3.515-0.436-0.904-0.642-1.731-0.751-3.045-0.031-0.373-0.039-2.296-0.039-8.87 0-2.215-0.002-3.866 0-5.121 0.006-3.764 0.037-3.915 0.144-4.652 0.219-1.518 0.825-2.795 1.825-3.833 0.549-0.569 1.105-0.975 1.811-1.326 0.915-0.456 1.756-0.668 3.106-0.781 0.374-0.031 2.298-0.038 8.878-0.038h5.13zM15.999 4.364v0c-3.159 0-3.555 0.014-4.796 0.070-1.239 0.057-2.084 0.253-2.824 0.541-0.765 0.297-1.415 0.695-2.061 1.342s-1.045 1.296-1.343 2.061c-0.288 0.74-0.485 1.586-0.541 2.824-0.056 1.241-0.070 1.638-0.070 4.798s0.014 3.556 0.070 4.797c0.057 1.239 0.253 2.084 0.541 2.824 0.297 0.765 0.695 1.415 1.342 2.061s1.296 1.046 2.061 1.343c0.74 0.288 1.586 0.484 2.825 0.541 1.241 0.056 1.638 0.070 4.798 0.070s3.556-0.014 4.797-0.070c1.239-0.057 2.085-0.253 2.826-0.541 0.765-0.297 1.413-0.696 2.060-1.343s1.045-1.296 1.343-2.061c0.286-0.74 0.482-1.586 0.541-2.824 0.056-1.241 0.070-1.637 0.070-4.797s-0.015-3.557-0.070-4.798c-0.058-1.239-0.255-2.084-0.541-2.824-0.298-0.765-0.696-1.415-1.343-2.061s-1.295-1.045-2.061-1.342c-0.742-0.288-1.588-0.484-2.827-0.541-1.241-0.056-1.636-0.070-4.796-0.070zM14.957 6.461c0.31-0 0.655 0 1.044 0 3.107 0 3.475 0.011 4.702 0.067 1.135 0.052 1.75 0.241 2.16 0.401 0.543 0.211 0.93 0.463 1.337 0.87s0.659 0.795 0.871 1.338c0.159 0.41 0.349 1.025 0.401 2.16 0.056 1.227 0.068 1.595 0.068 4.701s-0.012 3.474-0.068 4.701c-0.052 1.135-0.241 1.75-0.401 2.16-0.211 0.543-0.463 0.93-0.871 1.337s-0.794 0.659-1.337 0.87c-0.41 0.16-1.026 0.349-2.16 0.401-1.227 0.056-1.595 0.068-4.702 0.068s-3.475-0.012-4.702-0.068c-1.135-0.052-1.75-0.242-2.161-0.401-0.543-0.211-0.931-0.463-1.338-0.87s-0.659-0.794-0.871-1.337c-0.159-0.41-0.349-1.025-0.401-2.16-0.056-1.227-0.067-1.595-0.067-4.703s0.011-3.474 0.067-4.701c0.052-1.135 0.241-1.75 0.401-2.16 0.211-0.543 0.463-0.931 0.871-1.338s0.795-0.659 1.338-0.871c0.41-0.16 1.026-0.349 2.161-0.401 1.073-0.048 1.489-0.063 3.658-0.065v0.003zM16.001 10.024c-3.3 0-5.976 2.676-5.976 5.976s2.676 5.975 5.976 5.975c3.3 0 5.975-2.674 5.975-5.975s-2.675-5.976-5.975-5.976zM16.001 12.121c2.142 0 3.879 1.736 3.879 3.879s-1.737 3.879-3.879 3.879c-2.142 0-3.879-1.737-3.879-3.879s1.736-3.879 3.879-3.879zM22.212 8.393c-0.771 0-1.396 0.625-1.396 1.396s0.625 1.396 1.396 1.396 1.396-0.625 1.396-1.396c0-0.771-0.625-1.396-1.396-1.396v0.001z"></path>
              </svg>

            </a>
            <a href="#" className="p-2 bg-white rounded-[3px] text-[#2C4A74] hover:scale-105 transition !ml-0">
              {/* <FaYoutube size={20} /> */}
              <svg className="kadence-svg-icon kadence-youtube-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><title>YouTube</title><path d="M11.109 17.625l7.562-3.906-7.562-3.953v7.859zM14 4.156c5.891 0 9.797 0.281 9.797 0.281 0.547 0.063 1.75 0.063 2.812 1.188 0 0 0.859 0.844 1.109 2.781 0.297 2.266 0.281 4.531 0.281 4.531v2.125s0.016 2.266-0.281 4.531c-0.25 1.922-1.109 2.781-1.109 2.781-1.062 1.109-2.266 1.109-2.812 1.172 0 0-3.906 0.297-9.797 0.297v0c-7.281-0.063-9.516-0.281-9.516-0.281-0.625-0.109-2.031-0.078-3.094-1.188 0 0-0.859-0.859-1.109-2.781-0.297-2.266-0.281-4.531-0.281-4.531v-2.125s-0.016-2.266 0.281-4.531c0.25-1.937 1.109-2.781 1.109-2.781 1.062-1.125 2.266-1.125 2.812-1.188 0 0 3.906-0.281 9.797-0.281v0z"></path>
              </svg>
            </a>
            <a href="#" className="p-2 bg-white rounded-[3px] text-[#2C4A74] hover:scale-105 transition !ml-0">
              {/* <FaLinkedin size={20} /> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#0077B5" d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56c0 .95.8 1.72 1.77 1.72h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.5H3.56V9h3.56v11.5zM5.34 7.5a2.08 2.08 0 1 1 0-4.16 2.08 2.08 0 0 1 0 4.16zm15.16 13H17V14.5c0-1.43-.52-2.4-1.83-2.4-1 0-1.6.67-1.86 1.32-.1.24-.13.57-.13.91V20.5h-3.56V9h3.42v1.52h.05a3.78 3.78 0 0 1 3.41-1.87c2.45 0 4.3 1.6 4.3 5.04V20.5z" />
              </svg>

            </a>
            <a href="#" className="bg-white rounded-[3px] text-[#2C4A74] hover:scale-105 transition !ml-0">
              {/* <FaGraduationCap size={20} /> */}
              <img src="https://molecularhydrogeninstitute.org/wp-content/uploads/2023/02/logos-2.png" alt="Social Icon" width="36" />

            </a>
            <a href="#" className="bg-white rounded-[3px] text-[#2C4A74] hover:scale-105 transition !ml-0">
              {/* <FaRegistered size={20} /> */}
              <img src="https://molecularhydrogeninstitute.org/wp-content/uploads/2023/02/researchgate-logo.png" alt="ResearchGate logo" width="36" />

            </a>
            <a href="#" className="bg-white rounded-[3px] text-[#2C4A74] hover:scale-105 transition !ml-0">
              {/* <FaJournalWhills size={20} /> */}
              <img src="https://molecularhydrogeninstitute.org/wp-content/uploads/2023/02/logos-3.png" alt="Logo representing Academia" width="36" />
            </a>
          </div>

          {/* Logo */}
          <div className="flex justify-start">
            <img src="https://molecularhydrogeninstitute.org/wp-content/uploads/2023/02/logo1-1.png" alt="MHI Logo" height={"86"} />
          </div>

          {/* Copyright */}
          <div className=" text-sm text-[#FFF] my-[1rem] font-weight-[400]">
            © 2013-2025 MHI
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-3">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-1">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="/" className="hover:underline font-light">
                  Home
                </a>
              </li>
              <li>
                <a href={`${import.meta.env.VITE_WEB_BASE_URL}/explore-data`} className="hover:underline font-light">
                  H2 Data
                </a>
              </li>
              <li>
                <a href="https://molecularhydrogeninstitute.org/level-1-certification/" target="_blank" className="hover:underline font-light">
                  Level 1 Certification
                </a>
              </li>
              <li>
                <a href="https://molecularhydrogeninstitute.org/mhi-community/" target="_blank" className="hover:underline font-light">
                  MHI Community
                </a>
              </li>
              <li>
                <a href="https://molecularhydrogeninstitute.org/articles/" target="_blank" className="hover:underline font-light">
                  Articles
                </a>
              </li>
              <li>
                <a href="https://molecularhydrogeninstitute.org/research/" target="_blank" className="hover:underline font-light">
                  Research
                </a>
              </li>
              <li>
                <a href="https://molecularhydrogeninstitute.org/events/" target="_blank" className="hover:underline font-light">
                  Events
                </a>
              </li>
              <li>
                <a href="https://molecularhydrogeninstitute.org/about/guidelines-to-reference-mhi/" target="_blank" className="hover:underline font-light">
                  Reference MHI
                </a>
              </li>
              <li>
                <a href="https://www.paypal.com/donate/?hosted_button_id=25E4KWZ7QPH6J" target="_blank" className="hover:underline font-light">
                  Donate
                </a>
              </li>
              <li>
                <a href={`${import.meta.env.VITE_API_BASE_URL}/contact-us`} target="_blank" className="hover:underline font-light">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Description Section */}
          <div>
            <p className="text-[17px] text-white font-light">
              MHI is a 501(c)3 science-based nonprofit. We do not represent,
              endorse, or recommend any specific hydrogen products/companies.
              The information provided has not been evaluated by the Food and
              Drug Administration. All information presented is not intended to
              replace the guidance from your healthcare practitioner.
            </p>
          </div>

          <div className="">
            <ul className="space-y-1">
              <li>
                <a href="https://molecularhydrogeninstitute.org/disclaimer/" target="_blank" className="hover:underline font-light cursor-pointer">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="https://molecularhydrogeninstitute.org/terms-conditions/" target="_blank" className="hover:underline font-light cursor-pointer">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="https://molecularhydrogeninstitute.org/privacy-policy/" target="_blank" className="hover:underline font-light cursor-pointer">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}

      </div>
    </footer>
  );
};

export default Footer;
