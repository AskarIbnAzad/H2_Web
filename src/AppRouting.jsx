import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Research from "./pages/Research";
import Certifications from "./pages/Certifications";
import Events from "./pages/Events";
import About from "./pages/About";
import MhiCommunity from "./pages/MhiCommunity";
import SubscriptionPage from "./pages/SubscribtionPage";
import SignupSection from "./pages/SignupSection";
import SigninSection from "./pages/SigninSection";
import AfterSigninSection from "./pages/AfterSigninSection";
import AfterSignupSection from "./pages/AfterSignupSection";
import ArticleDetails from "./pages/ArticleDetails";
import { useDispatch, useSelector } from "react-redux";
import { check_auth } from "./store/services/authSlice";
import {
  setAuthState,
  setIdleRegisterStatus,
  setIdleStatus,
} from "./store/slice/user_auth_slice";
import { asyncStatus, save_tokens_constant } from "./utils/asyncStatus";
import ContributeArticlePage from "./pages/ContributeArticlePage";
import HelpPage from "./pages/HelpPage";
import Collaborate from "./pages/Collaborate";
import VerifiedTagPage from "./pages/VerifiedTagPage";
import FeedbackForm from "./pages/FeedbackForm";
import DisclaimerPage from "./pages/DisclaimerPage";
import { PdfViewer } from "./components/PdfViewer/PdfViewer";
import DatabaseManagement from "./pages/DatabaseManagement";
import Biomarker from "./pages/DatabaseScreens/Biomarker";
import AuthorsLibrary from "./pages/DatabaseScreens/AuthorsLibrary";
import Country from "./pages/DatabaseScreens/Country";
import Species from "./pages/DatabaseScreens/Species";
import ArticleType from "./pages/DatabaseScreens/ArticleType";
import ResearchTopic from "./pages/DatabaseScreens/ResearchTopic";
import PhysiologicalSystems from "./pages/DatabaseScreens/PhysiologicalSystems";
import OrgansTissues from "./pages/DatabaseScreens/OrgansTissues";
import MethodsofAdministration from "./pages/DatabaseScreens/MethodsofAdministration";
import ContactUsPage from "./pages/ContactUsPage";
import ThankYouPage from "./pages/ThankYouPage";
import Diseases from "./pages/DatabaseScreens/Diseases";
import DiseaseDetails from "./pages/DatabaseScreens/DiseaseDetails.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/articles", element: <Articles /> },
  { path: "/research", element: <Research /> },
  { path: "/certifications", element: <Certifications /> },
  { path: "/events", element: <Events /> },
  { path: "/about", element: <About /> },
  { path: "/mhi-community", element: <MhiCommunity /> },
  { path: "/subscription", element: <SubscriptionPage /> },
  { path: "/signup", element: <SignupSection /> },
  { path: "/signin", element: <SigninSection /> },
  { path: "/after-signin", element: <AfterSigninSection /> },
  { path: "/after-signup", element: <AfterSignupSection /> },
  { path: "/ArticleDetails/:id", element: <ArticleDetails /> },
  { path: "/ContributeArticlePage", element: <ContributeArticlePage /> },
  { path: "/FAQsGuide", element: <HelpPage /> },
  { path: "/Collaborate", element: <Collaborate /> },
  { path: "/VerifiedTagPage", element: <VerifiedTagPage /> },
  { path: "/FeedbackForm", element: <FeedbackForm /> },
  { path: "/DisclaimerPage", element: <DisclaimerPage /> },
  { path: "/ArticleDetails/:mhid/view-pdf", element: <PdfViewer /> },
  { path: "/explore-data", element: <DatabaseManagement /> },
  { path: "/biomarker", element: <Biomarker /> },
  { path: "/authors-library", element: <AuthorsLibrary /> },
  { path: "/countries", element: <Country /> },
  { path: "/species", element: <Species /> },
  { path: "/diseases", element: <Diseases /> },
  { path: "/disease/:id", element: <DiseaseDetails /> },
  { path: "/article-type", element: <ArticleType /> },
  { path: "/research-topic", element: <ResearchTopic /> },
  { path: "/physiological-systems", element: <PhysiologicalSystems /> },
  { path: "/organs-tissues", element: <OrgansTissues /> },
  { path: "/methods-of-administration", element: <MethodsofAdministration /> },
  { path: "/contact-us", element: <ContactUsPage /> },
  { path: "/thank-you", element: <ThankYouPage /> },
];

export const AppRouting = () => {
  const { check_auth_status, login_status, signup_status } = useSelector(
    (state) => state.userAuth
  );
  const { userAuth } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  

  useEffect(() => {
    if (
      login_status === asyncStatus.SUCCEEDED ||
      signup_status === asyncStatus.SUCCEEDED
    ) {
      dispatch(check_auth());
      dispatch(setIdleStatus());
      dispatch(setIdleRegisterStatus());
    }
  }, [login_status]);

  useEffect(() => {
    if (check_auth_status === asyncStatus.IDLE) {
      const authTokens =
        localStorage.getItem(save_tokens_constant.AUTH) || null;
      if (!authTokens) {
        dispatch(setAuthState(false));
       
      } else {
        dispatch(check_auth());
       
      }
    }
  }, [check_auth_status, dispatch]);


  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};
