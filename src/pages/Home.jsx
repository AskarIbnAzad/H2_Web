import React from "react";
import "../home_page.css";
import {
  Microscope,
  molecule,
  Book,
  GetInvolved,
  StayUpdated,
} from "../assets/images";
import { BarChart } from "../components/Barchart";
import { PolarChart } from "../components/PolarChart";
import { DoughnutChart } from "../components/DougnutChart";
import { ArticlesTable } from "../components/HomeComponents/ArticlesTable";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Search from "../components/HomeComponents/Search";

import ReactModal from "react-modal";
import TrendingArticles from "../components/HomeComponents/TrendingArticles";
import DisclaimerModal from "../components/DisclaimerModal/DisclaimerModal";
import SubscribeModal from "../components/SubscribeModal/SubscribeModal";
import DashboardCharts from "../components/DashboardCharts/DashboardCharts";
import SocialMediaModal from "../components/SocialMediaModal/SocialMediaModal";
import { apiHandle } from "../config/apiHandle/apiHandle";
import ContactForm from "../components/ContactForm/ContactForm";
import { Link as ScrollLink } from "react-scroll";
import SupportMHISection from "../components/SupportMHISection/SupportMHISection";
import MolecularHydrogenHero from "./HeroSection";
import EnhancedInfoSection from "./EnhancedInfoSection";

ReactModal.setAppElement("#root");

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [homeData, setHomeData] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the modal has been shown in the last 24 hours
    const lastShown = localStorage.getItem("modalLastShown");
    const now = new Date().getTime();

    // If there's no record or the last shown time was more than 24 hours ago
    if (!lastShown || now - parseInt(lastShown) > 24 * 60 * 60 * 1000) {
      setShowModal(true);
      localStorage.setItem("modalLastShown", now.toString()); // Update the timestamp
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchHomePageData = async () => {
    try {
      setLoading(true);
      const response = await apiHandle.get(`home-page`);
      if (!!response.data) {
        setHomeData(response?.data?.data);
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomePageData();
  }, []);

  const dashboardChartData = {
    ArticlesByYearData: homeData?.yearsGraph,
    ResearchByTopicData: homeData?.researchTopics,
    StudyByTypeData: homeData?.studyTypes,
    StudyBySpeciesData: homeData?.species,
    StudyByOrganData: homeData?.organs,
  };

  return (
    <div>
     <MolecularHydrogenHero/>
     {/* <EnhancedInfoSection/> */}

      {/* <section className="seventh-sec" id="tranding-articles">
        <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
          <TrendingArticles
            articles={homeData?.trending_articles}
            loading={loading}
          />
        </div>
      </section> */}
      {/* <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
        <DashboardCharts data={dashboardChartData} />
      </div> */}
      <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
        <div className="mb-10">
          <h2 className="text-[#132B38] text-3xl mb-3 font-extrabold">
            Explore the Science Behind Hydrogen Therapy{" "}
          </h2>
          <p className="text-gray-600 text-[16px] leading-[1.7] max-w-[900px]">
            This dynamic database aims to organize and collect all the
            scientific publications (over 3,000) on hydrogen's therapeutic
            potential. Below you can see what’s been collected so far —
            categorized by organ, disease, method, and more. Browse the research
            and discover what H₂ can do this.
          </p>
        </div>

        <DashboardCharts data={dashboardChartData} />
      </div>

        <EnhancedInfoSection/>

      <section className="seventh-sec" id="tranding-articles">
        <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
          <TrendingArticles
            articles={homeData?.trending_articles}
            loading={loading}
          />
        </div>
      </section>

      {/* <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
        <ContactForm />
      </div> */}
      {/* <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4"> */}
      <SupportMHISection />
      {/* </div> */}

      <DisclaimerModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default Home;
// import React from "react";
// import "../home_page.css";
// import {
//   Microscope,
//   molecule,
//   Book,
//   GetInvolved,
//   StayUpdated,
// } from "../assets/images";
// import { BarChart } from "../components/Barchart";
// import { PolarChart } from "../components/PolarChart";
// import { DoughnutChart } from "../components/DougnutChart";
// import { ArticlesTable } from "../components/HomeComponents/ArticlesTable";
// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Search from "../components/HomeComponents/Search";

// import ReactModal from "react-modal";
// import TrendingArticles from "../components/HomeComponents/TrendingArticles";
// import DisclaimerModal from "../components/DisclaimerModal/DisclaimerModal";
// import SubscribeModal from "../components/SubscribeModal/SubscribeModal";
// import DashboardCharts from "../components/DashboardCharts/DashboardCharts";
// import SocialMediaModal from "../components/SocialMediaModal/SocialMediaModal";
// import { apiHandle } from "../config/apiHandle/apiHandle";
// import ContactForm from "../components/ContactForm/ContactForm";
// import { Link as ScrollLink } from "react-scroll";
// import SupportMHISection from "../components/SupportMHISection/SupportMHISection";

// ReactModal.setAppElement("#root");

// const Home = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [homeData, setHomeData] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     // Check if the modal has been shown in the last 24 hours
//     const lastShown = localStorage.getItem("modalLastShown");
//     const now = new Date().getTime();

//     // If there's no record or the last shown time was more than 24 hours ago
//     if (!lastShown || now - parseInt(lastShown) > 24 * 60 * 60 * 1000) {
//       setShowModal(true);
//       localStorage.setItem("modalLastShown", now.toString()); // Update the timestamp
//     }
//   }, []);

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const fetchHomePageData = async () => {
//     try {
//       setLoading(true);
//       const response = await apiHandle.get(`home-page`);
//       if (!!response.data) {
//         setHomeData(response?.data?.data);
//       }
//       setLoading(false);
//     } catch (err) {
//       setError("Error fetching data");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchHomePageData();
//   }, []);

//   const dashboardChartData = {
//     ArticlesByYearData: homeData?.years_graph,
//     ResearchByTopicData: homeData?.research_topics,
//     StudyByTypeData: homeData?.study_type,
//     StudyBySpeciesData: homeData?.specie_count,
//     StudyByOrganData: homeData?.organs,
//   };

//   return (
//     <div>
//       <div className="">
//         {/* <section  className="home-background-img rounded-b-[70px] ">
//           <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
//             <div  className="m-auto border-2x py-[9em] px-0">
//               <div
//                  className="text-[35px] text-primary  text-center md:text-[44px] font-extrabold leading-[80px] lg:text-[64px]    "
//                 style={{ lineHeight: "normal" }}
//               >
//                 Molecular Hydrogen
//                 <br />
//                 Research Data
//               </div>

//               <Search />
//             </div>
//           </div>
//         </section> */}
//         <section className="home-background-img rounded-b-[70px]">
//           <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
//             <div className="m-auto border-2x py-[9em] px-0">
//               <div
//                 className="text-[30px] text-primary text-center md:text-[38px] font-extrabold leading-[60px] lg:text-[52px]"
//                 style={{ lineHeight: "normal" }}
//               >
//                 Molecular Hydrogen Therapy
//                 <br />
//                 Research Database
//               </div>

//               <div
//                 className="text-[16px] mt-4 text-center text-gray-600 md:text-[18px] font-medium"
//                 style={{ lineHeight: "1.6" }}
//               >
//                 Powered by the Molecular Hydrogen Institute.
//               </div>
//               <div className="max-w-full md:max-w-5xl mx-auto ">

//                 <Search />
//               </div>
//             </div>
//           </div>
//         </section>

//         <span></span>
//         <span></span>
//       </div>

//       {/* <!-- second section box start --> */}
//       <section className="sec-second -mt-36">
//         <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
//           <div className="flex flex-wrap justify-center gap-5">
//             <div
//               className="w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 info-box"
//               onClick={() => navigate("/articles")}
//             >
//               <div className="col-inner">
//                 <div className="boxes  flex flex-col items-center">
//                   <img src={molecule} alt="" />
//                   {/* <h1>{homeData?.total_studies}</h1> */}
//                   <h1>3014</h1>
//                   <ul>
//                     <li>
//                       {/* <!-- <img src="./assets/images/ion_book-outline.svg" alt="" /> -->
//                   <!-- <i  className="fa-regular fa-book-open"></i> --> */}
//                       <i className="fa-solid fa-book-open mr-2"></i>
//                       <span>Total Studies</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 info-box"
//               onClick={() => navigate("/articles")}
//             >
//               <div className="col-inner">
//                 <div className="boxes  flex flex-col items-center">
//                   <img src={molecule} alt="" />
//                   {/* <h1>{homeData?.human_study_count}</h1> */}
//                   <h1>207</h1>
//                   <ul>
//                     <li>
//                       <i className="fa-solid fa-user mr-2"></i>
//                       <span>Human Studies</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div
//               className="w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 info-box"
//               onClick={() => navigate("/articles")}
//             >
//               <div className="col-inner">
//                 <div className="boxes  flex flex-col items-center">
//                   <img src={molecule} alt="" />
//                   {/* <h1>{homeData?.disease_model_count}</h1> */}
//                   <h1>203</h1>
//                   <ul>
//                     <li>
//                       <i className="fa-solid fa-viruses mr-2"></i>
//                       <span>Different Disease Models</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/*  */}
      // <section className="py-20">
      //   <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4 ">
      //     <div className="flex flex-col md:flex-row items-center flex-wrap justify-between">
      //       <div className=" flex-1 flex flex-col justify-center items-center">
      //         <img src={Book} alt="book" />
      //         <h3 className="text-2xl font-bold my-2">Learn</h3>
      //         <ul className="w-full">
      //           <li className="w-full   text-center  hover:underline  ">
      //             <Link
      //               className="text-[#346896] "
      //               to="https://molecularhydrogeninstitute.org/the-complete-guide-to-molecular-hydrogen-therapy/"
      //             >
      //               What is Molecular Hydrogen? Start Here
      //             </Link>
      //           </li>
      //           <li className="w-full text-center hover:underline">
      //             <Link
      //               className="text-[#346896]"
      //               to="about"
      //             >
      //               About MHI H₂ Research Database
      //             </Link>
      //           </li>
      //           <li className="w-full   text-center  hover:underline">
      //             <Link
      //               className="text-[#346896] "
      //               to="https://molecularhydrogeninstitute.org/certifications/"
      //             >
      //               About MHI Certifications
      //             </Link>
      //           </li>
      //           <li className="w-full   text-center  hover:underline">
      //             <Link
      //               className="text-[#346896] "
      //               to="FAQsGuide"
      //             >
      //               FAQs and How-To Guide
      //             </Link>
      //           </li>
      //         </ul>
      //       </div>
      //       <div className=" flex-1 flex flex-col justify-center items-center">
      //         <img src={Microscope} alt="Microscope" />
      //         <h3 className="text-2xl font-bold my-2">Find</h3>
      //         <ul className="w-full">
      //           <li className="w-full   text-center  hover:underline">
      //             <Link className="text-[#346896] " to="/articles">
      //               Search by Keyword
      //             </Link>
      //           </li>
      //           <li className="w-full   text-center  hover:underline">
      //             <Link className="text-[#346896]   " to="/explore-data">
      //               Explore the Data
      //             </Link>
      //           </li>
      //           <li className="w-full text-center hover:underline">
      //             <ScrollLink
      //               to="tranding-articles"
      //               smooth={true}
      //               duration={500}
      //               className="text-[#346896] cursor-pointer"
      //             >
      //               Discover What’s Trending
      //             </ScrollLink>
      //           </li>
      //           <li className="w-full   text-center  hover:underline">
      //             <Link
      //               className="text-[#346896] "
      //               to="https://molecularhydrogeninstitute.org/events/"
      //             >
      //               Events, Conferences, and Media
      //             </Link>
      //           </li>
      //         </ul>
      //       </div>
      //       <div className=" flex-1 flex flex-col justify-center items-center">
      //         <img src={GetInvolved} alt="GetInvolved" />
      //         <h3 className="text-2xl font-bold my-2">Get Involved</h3>
      //         <ul className="w-full">
      //           <li className="w-full   text-center  hover:underline">
      //             <Link
      //               className="text-[#346896] "
      //               to="https://molecularhydrogeninstitute.org/mhi-community/"
      //             >
      //               Join the MHI Community
      //             </Link>
      //           </li>
      //           <li className="w-full   text-center  hover:underline">
      //             <Link className="text-[#346896]   " to="/subscription">
      //               Upgrade to H₂ Research Premium Account
      //             </Link>
      //           </li>
      //           <li className="w-full   text-center  hover:underline">
      //             <Link
      //               className="text-[#346896] "
      //               to="contact-us"
      //             >
      //               Submit Research
      //             </Link>
      //           </li>
      //           <li className="w-full   text-center  hover:underline">
      //             <Link
      //               className="text-[#346896] "
      //               to="https://molecularhydrogeninstitute.org/level-1-certification/"
      //             >
      //               Become Certified
      //             </Link>
      //           </li>
      //           {/* <li  className="w-full   text-center  hover:underline">
      //             <Link
      //                className="text-[#346896] "
      //               to="https://h2research.org/"
      //             >
      //               Contribute to Articles
      //             </Link>
      //           </li> */}
      //         </ul>
      //       </div>
      //       <div className=" flex-1 flex flex-col justify-center items-center">
      //         <img src={StayUpdated} alt="StayUpdated" />
      //         <h3 className="text-2xl font-bold my-2">Stay Updated</h3>
      //         <ul className="w-full">
      //           <li className="w-full   text-center  hover:underline">
      //             <Link
      //               className="text-[#346896] "
      //               to="https://molecularhydrogeninstitute.org/articles/"
      //             >
      //               Read the latest educational articles
      //             </Link>
      //           </li>
      //           <li className="w-full   text-center  hover:underline">
      //             {/* <Link  className="text-[#346896]   " to="/">
      //               Subscribe for Updates
      //               </Link> */}
      //             <Link
      //               className="text-[#346896] "
      //               to="https://h2research.org/"
      //             >
      //               <SubscribeModal />
      //             </Link>
      //           </li>
      //           <li className="w-full   text-center  hover:underline">
      //             {/* <Link  className="text-[#346896] " to="/">
      //               Follow Us on Social Media
      //             </Link> */}
      //             <SocialMediaModal />
      //           </li>
      //         </ul>
      //       </div>
      //     </div>
      //   </div>
      // </section>

//       <section className="seventh-sec" id="tranding-articles">
//         <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
//           <TrendingArticles
//             articles={homeData?.latest_articles}
//             loading={loading}
//           />
//         </div>
//       </section>
//       {/* <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
//         <DashboardCharts data={dashboardChartData} />
//       </div> */}
//       <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
//         <div className="mb-10">
//           <h2 className="text-[#132B38] text-3xl mb-3 font-extrabold">
//             Explore the Science Behind Hydrogen Therapy{" "}
//           </h2>
//           <p className="text-gray-600 text-[16px] leading-[1.7] max-w-[900px]">
//             This dynamic database aims to organize and collect all the
//             scientific publications (over 3,000) on hydrogen's therapeutic
//             potential. Below you can see what’s been collected so far —
//             categorized by organ, disease, method, and more. Browse the research
//             and discover what H₂ can do.
//           </p>
//         </div>

//         <DashboardCharts data={dashboardChartData} />
//       </div>

//       <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4">
//         <ContactForm />
//       </div>
//       {/* <div  className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto p-4"> */}
//       <SupportMHISection />
//       {/* </div> */}

//       <DisclaimerModal
//         showModal={showModal}
//         handleCloseModal={handleCloseModal}
//       />
//     </div>
//   );
// };

// export default Home;
