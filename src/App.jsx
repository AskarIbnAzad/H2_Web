import { useEffect } from "react";
import { AppRouting } from "./AppRouting";
import Footer from "./components/Footer";
import ImportantNoticeBanner from "./components/ImportantNoticeBanner/ImportantNoticeBanner";
import Professional3LayerNavbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import TawkToChat from "./components/TawkToChat/TawkToChat";

function App() {

  return (
    <div className="jakarta">
      <Router>
        {/* <TawkToChat/> */}
        <ScrollToTop />
        {/* <ImportantNoticeBanner /> */}
        <Professional3LayerNavbar />
        {/* Spacer to prevent content from being hidden behind sticky navbar */}
        <div style={{ height: '148px' }} />
        <AppRouting />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
