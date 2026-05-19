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
            and discover what H₂ can do.
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

