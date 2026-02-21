import { FaUsers, FaSearch, FaDonate, FaSignInAlt } from "react-icons/fa"; // Import necessary icons

export const menuItems = [
  { "name": "Home", "path": "https://molecularhydrogeninstitute.org/" },
  {
    "name": "Articles",
    "path": "https://molecularhydrogeninstitute.org/articles/",
    "subItems": [
   { name: "About Hydrogen (H₂ Gas)", path: "https://molecularhydrogeninstitute.org/category/about-hydrogen/" },
      { name: "Myths and Misconceptions", path: "https://molecularhydrogeninstitute.org/category/misconceptions/" },
      { name: "Basic Chemistry", path: "https://molecularhydrogeninstitute.org/category/chemistry/" },
      { name: "Ionized Water", path: "https://molecularhydrogeninstitute.org/category/ionized-water/" },
      { name: "Oxidation-Reduction Potential (ORP)", path: "https://molecularhydrogeninstitute.org/category/orp/" },
      { name: "How to Get Molecular Hydrogen", path: "https://molecularhydrogeninstitute.org/category/how-to-get-molecular-hydrogen-step-by-step-guide/" },
      { name: "MHI Certifications", path: "https://molecularhydrogeninstitute.org/category/certification-molecular-hydrogen-applications/" },
      { name: "Water Chemistry", path: "https://molecularhydrogeninstitute.org/category/water/" },
      { "name": "Scientific Articles", "path": `${import.meta.env.VITE_WEB_BASE_URL}/articles` },
      { "name": "List of Categories", "path": "https://molecularhydrogeninstitute.org/articles/" }
    ]
  },
  {
    "name": "Research",
    "path": `${import.meta.env.VITE_WEB_BASE_URL}/`,
    "subItems": [
      { "name": "H₂ Research Database", "path": `${import.meta.env.VITE_WEB_BASE_URL}/` },
      { "name": "Scientific Articles", "path": `${import.meta.env.VITE_WEB_BASE_URL}/articles` },
      { "name": "Search H₂ Research", "path": `${import.meta.env.VITE_WEB_BASE_URL}/articles` },
      { "name": "Submit Research", "path": "#" },
      { "name": "Help Page", "path": "#" },
      { "name": "Explore the Data", "path": "#" },
      { "name": "About MHI H₂ Research", "path": "/about" },
      { "name": "H₂ Research Premium Sign In", "path": "#" },
      { "name": "Upgrade to Premium", "path": "/subscription" }
    ]
  },
  {
    "name": "Certifications",
    "path": "https://molecularhydrogeninstitute.org/certifications/",
    "subItems": [
      { "name": "H₂ Apprentice", "path": "https://molecularhydrogeninstitute.org/apprentice/" },
      { "name": "Level 1 Certification", "path": "https://molecularhydrogeninstitute.org/level-1-certification/" },
      { "name": "About Certifications", "path": "https://molecularhydrogeninstitute.org/benefits-of-the-mhi-certification/" },
      { "name": "FAQs about Certification", "path": "/FAQsGuide" }
    ]
  },
  { "name": "Events", "path": "https://molecularhydrogeninstitute.org/events/" },
  {
    "name": "About",
    "path": "/about",
    "subItems": [
      { "name": "About MHI", "path": "/about" },
      { "name": "About MHI’s H₂ Research Database", "path": "/about" },
      { "name": "A Note from Founder", "path": "https://molecularhydrogeninstitute.org/a-note-from-the-founder/" },
      { "name": "Advisory Panel", "path": "https://molecularhydrogeninstitute.org/advisory-panel/" }
    ]
  },
  {
    "name": "MHI Community",
    "path": "https://molecularhydrogeninstitute.org/mhi-community/",
    "subItems": [
      { "name": "Join the MHI Community", "path": "https://molecularhydrogeninstitute.org/mhi-community/" },
      { "name": "MHI Committees", "path": "https://molecularhydrogeninstitute.org/about-mhi-committees/" }
    ]
  },
  {
    "name": "User Portal",
    "subItems": [
      { "name": "Community Login", "path": "https://courses.molecularhydrogeninstitute.org/users/sign_in" },
      { "name": "H₂ Research Premium Sign ", "path": "signin" },
      { "name": "Course Portal Login / Dashboard", "path": "https://courses.molecularhydrogeninstitute.org/enrollments" }
    ]
  },
  { name: "Donate", path: "https://www.paypal.com/donate/?hosted_button_id=25E4KWZ7QPH6J" },
  {
    name: 'search',
    icon: FaSearch ,
    path: ""
  },
];
