// import React, { useState, useEffect } from "react";
// import {
//   Navbar,
//   Button,
//   IconButton,
//   Collapse,
// } from "@material-tailwind/react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import logo from "../../assets/images/logo.png";
// import { FiChevronDown, FiChevronUp, FiMenu, FiX } from "react-icons/fi";
// import "./nav.css";
// import { menuItems } from "../../utils/navscreens";

// export function NavbarDefault() {
//   const [openNav, setOpenNav] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

//   const toggleMobileMenu = (itemName) => {
//     setActiveMobileDropdown(activeMobileDropdown === itemName ? null : itemName);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 960) {
//         setOpenNav(false);
//         setActiveMobileDropdown(null);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const renderDesktopMenu = () => (
//     <div  className="hidden lg:flex items-center">
//       {menuItems.map((item) => (
//         <div
//           key={item.name}
//            className="relative group px-[10px] py-3"
//           onMouseEnter={() => setActiveDropdown(item.name)}
//           onMouseLeave={() => setActiveDropdown(null)}
//         >
//           <NavLink
//             to={item.path}
//              className="nav-link text-[#4A5568] text-[17px] font-light hover:text-primary flex items-center gap-1"
//             style={{letterSpacing: '-0.04rem'}}
//           >

//             {!item.icon && item.name}
//             {item.icon && <item.icon  className="" />}
//             {item.subItems && (
//               <span  className="text-sm transition-transform pt-[4px]">
//                 {activeDropdown === item.name ? <FiChevronUp /> : <FiChevronDown />}
//               </span>
//             )}
//           </NavLink>

//           {item.subItems && activeDropdown === item.name && (
//             <div  className="desktop-dropdown absolute left-0 mt-2 w-[200px] bg-[#1A202C] text-white z-50 shadow-lg">
//               {item.subItems.map((subItem) => (
//                 <NavLink
//                   key={subItem.name}
//                   to={subItem.path}
//                    className="dropdown-item block px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors border-b border-white/10 text-xs"
//                 >
//                   {subItem.name}
//                 </NavLink>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//       {/* <Button
//          className="donate-btn bg-[#004c78] text-white rounded-full px-6 py-2 hover:bg-[#003556] transition-colors"
//       >
//         Donate
//       </Button> */}
//     </div>
//   );

//   const renderMobileMenu = () => (
//     <Collapse open={openNav}  className="lg:hidden">
//       <div  className="mobile-menu bg-white shadow-lg p-4 space-y-2">
//         {menuItems.map((item) => (
//           <div key={item.name}  className="mobile-menu-item">
//             <div
//                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded"
//               onClick={() => item.subItems ? toggleMobileMenu(item.name) : navigate(item.path)}
//             >
//               <NavLink
//                 to={item.path}
//                  className="text-black text-base font-medium"
//               >
//                 {item.name}
//               </NavLink>
//               {item.subItems && (
//                 <FiChevronDown
//                   color="black"
//                    className={`transition-transform ${activeMobileDropdown === item.name ? 'rotate-180' : ''
//                     }`}
//                 />
//               )}
//             </div>

//             {item.subItems && activeMobileDropdown === item.name && (
//               <div  className="mobile-submenu ml-4">
//                 {item.subItems.map((subItem) => (
//                   <NavLink
//                     key={subItem.name}
//                     to={subItem.path}
//                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm"
//                   >
//                     {subItem.name}
//                   </NavLink>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//         <Button
//           fullWidth
//            className="donate-btn bg-[#004c78] text-white mt-4 hover:bg-[#003556]"
//         >
//           Donate
//         </Button>
//       </div>
//     </Collapse>
//   );

//   return (
//     <div  className="bg-white shadow-md">
//       <Navbar  className="border-none shadow-none max-w-full rounded-none px-4 py-1">
//         <div  className="max-w-[1290px] lg:px-[1.5rem] mx-auto flex items-center justify-between ">
// <Link to="/"  className="logo-container">
//   <img
//     src={logo}
//     alt="logo"
//      className="max-w-[200px] cursor-pointer"
//   />
// </Link>

//           <div  className="lg:hidden">
//             <IconButton
//               variant="text"
//                className="text-black hover:bg-transparent focus:bg-transparent"
//               onClick={() => setOpenNav(!openNav)}
//             >
//               {openNav ? (
//                 <FiX  className="h-6 w-6" />
//               ) : (
//                 <FiMenu  className="h-6 w-6" />
//               )}
//             </IconButton>
//           </div>

//           {renderDesktopMenu()}
//         </div>

//         {renderMobileMenu()}
//       </Navbar>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { FiChevronDown, FiMenu, FiX, FiSearch, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
// Mock data for menu items with mega menus
// const menuItems = [
//   {
//     name: "Home",
//     path: "/",
//     hasMegaMenu: false
//   },
//   {
//     name: "Articles",
//     path: "/articles",
//     hasMegaMenu: true,
//     megaMenuContent: {
//       featured: {
//         title: "Featured Articles",
//         image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
//         description: "Latest breakthrough in molecular hydrogen research"
//       },
//       sections: [
//         {
//           title: "Research Categories",
//           items: [
//             { name: "Clinical Studies", path: "/articles/clinical", description: "Human clinical trials and studies" },
//             { name: "Laboratory Research", path: "/articles/lab", description: "In-vitro and laboratory findings" },
//             { name: "Case Studies", path: "/articles/cases", description: "Real-world applications" },
//             { name: "Review Papers", path: "/articles/reviews", description: "Comprehensive research reviews" }
//           ]
//         },
//         {
//           title: "Disease Focus",
//           items: [
//             { name: "Cancer Research", path: "/articles/cancer", description: "Oncology applications" },
//             { name: "Cardiovascular", path: "/articles/cardio", description: "Heart and circulation" },
//             { name: "Neurological", path: "/articles/neuro", description: "Brain and nervous system" },
//             { name: "Metabolic Disorders", path: "/articles/metabolic", description: "Diabetes and metabolism" }
//           ]
//         },
//         {
//           title: "Publication Types",
//           items: [
//             { name: "Peer-Reviewed", path: "/articles/peer-reviewed", description: "Scientific publications" },
//             { name: "Conference Papers", path: "/articles/conference", description: "Academic presentations" },
//             { name: "White Papers", path: "/articles/white-papers", description: "Industry insights" },
//             { name: "Editorial Articles", path: "/articles/editorial", description: "Expert opinions" }
//           ]
//         }
//       ]
//     }
//   },
//   {
//     name: "Research",
//     path: "/research",
//     hasMegaMenu: true,
//     megaMenuContent: {
//       featured: {
//         title: "Research Database",
//         image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=200&fit=crop",
//         description: "Access over 3000+ research publications"
//       },
//       sections: [
//         {
//           title: "Research Areas",
//           items: [
//             { name: "Molecular Biology", path: "/research/molecular", description: "Cellular mechanisms" },
//             { name: "Biochemistry", path: "/research/biochem", description: "Chemical processes" },
//             { name: "Clinical Trials", path: "/research/trials", description: "Human studies" },
//             { name: "Therapeutic Applications", path: "/research/therapy", description: "Treatment methods" }
//           ]
//         },
//         {
//           title: "Research Tools",
//           items: [
//             { name: "Database Search", path: "/research/database", description: "Comprehensive research database" },
//             { name: "Methodology", path: "/research/methods", description: "Research protocols" },
//             { name: "Data Analysis", path: "/research/analysis", description: "Statistical tools" },
//             { name: "Publication Guidelines", path: "/research/guidelines", description: "Submission standards" }
//           ]
//         },
//         {
//           title: "Collaboration",
//           items: [
//             { name: "Research Partners", path: "/research/partners", description: "Partner institutions" },
//             { name: "Grant Opportunities", path: "/research/grants", description: "Funding sources" },
//             { name: "International Projects", path: "/research/international", description: "Global initiatives" },
//             { name: "Student Programs", path: "/research/students", description: "Educational opportunities" }
//           ]
//         }
//       ]
//     }
//   },
//   {
//     name: "Certifications",
//     path: "/certifications",
//     hasMegaMenu: false
//   },
//   {
//     name: "Events",
//     path: "/events",
//     hasMegaMenu: false
//   },
//   {
//     name: "About",
//     path: "/about",
//     hasMegaMenu: true,
//     megaMenuContent: {
//       featured: {
//         title: "Our Mission",
//         image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
//         description: "Advancing molecular hydrogen research globally"
//       },
//       sections: [
//         {
//           title: "Organization",
//           items: [
//             { name: "Our Mission", path: "/about/mission", description: "Purpose and goals" },
//             { name: "Leadership Team", path: "/about/team", description: "Executive leadership" },
//             { name: "Advisory Board", path: "/about/board", description: "Scientific advisors" },
//             { name: "History", path: "/about/history", description: "Our journey" }
//           ]
//         },
//         {
//           title: "Information",
//           items: [
//             { name: "Annual Reports", path: "/about/reports", description: "Yearly achievements" },
//             { name: "Press Releases", path: "/about/press", description: "Media coverage" },
//             { name: "Partnerships", path: "/about/partnerships", description: "Strategic alliances" },
//             { name: "Careers", path: "/about/careers", description: "Join our team" }
//           ]
//         }
//       ]
//     }
//   },
//   // {
//   //   name: "MHI Community",
//   //   path: "/community",
//   //   hasMegaMenu: false
//   // },
//   // {
//   //   name: "User Portal",
//   //   path: "/portal",
//   //   hasMegaMenu: false
//   // }
// ];

const menuItems = [
  // {
  //   name: "Home",
  //   path: "https://molecularhydrogeninstitute.org/",
  //   hasMegaMenu: false
  // },
  {
    name: "Learn",
    path: "https://molecularhydrogeninstitute.org/articles/",
    hasMegaMenu: true,
    megaMenuContent: {
      featured: {
        title: "Featured Articles",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
        description: "Latest breakthrough in molecular hydrogen research"
      },
      sections: [
        {
          title: "About Hydrogen",
          items: [
            { name: "About Hydrogen (H₂ Gas)", path: "https://molecularhydrogeninstitute.org/category/about-hydrogen/", description: "Understanding molecular hydrogen" },
            { name: "Myths and Misconceptions", path: "https://molecularhydrogeninstitute.org/category/misconceptions/", description: "Clearing up common myths" },
            { name: "Basic Chemistry", path: "https://molecularhydrogeninstitute.org/category/chemistry/", description: "Chemical properties and behavior" },
            { name: "How to Get Molecular Hydrogen", path: "https://molecularhydrogeninstitute.org/category/how-to-get-molecular-hydrogen-step-by-step-guide/", description: "Step-by-step guide" }
          ]
        },
        {
          title: "Water & Applications",
          items: [
            { name: "Ionized Water", path: "https://molecularhydrogeninstitute.org/category/ionized-water/", description: "Water ionization processes" },
            { name: "Oxidation-Reduction Potential (ORP)", path: "https://molecularhydrogeninstitute.org/category/orp/", description: "Understanding ORP values" },
            { name: "Water Chemistry", path: "https://molecularhydrogeninstitute.org/category/water/", description: "Chemical composition" },
            { name: "MHI Certifications", path: "https://molecularhydrogeninstitute.org/category/certification-molecular-hydrogen-applications/", description: "Certification programs" }
          ]
        },
        {
          title: "Research & Articles",
          items: [
            { name: "Scientific Articles", path: "https://h2research.org/articles", description: "Peer-reviewed research" },
            { name: "List of Categories", path: "https://molecularhydrogeninstitute.org/articles/", description: "Browse all categories" }
          ]
        }
      ]
    }
  },
  {
    name: "Research",
    path: "https://h2research.org/",
    hasMegaMenu: true,
    megaMenuContent: {
      featured: {
        title: "Research Database",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=200&fit=crop",
        description: "Access over 3000+ research publications"
      },
      sections: [
        {
          title: "Database Access",
          items: [
            { name: "H₂ Research Database", path: "https://h2research.org/", description: "Main research database" },
            { name: "Scientific Articles", path: "https://h2research.org/articles", description: "Browse articles" },
            { name: "Search H₂ Research", path: "https://h2research.org/articles", description: "Advanced search tools" },
            { name: "Explore the Data", path: "https://h2research.org/explore-data", description: "Data visualization tools" }
          ]
        },
        {
          title: "Research Tools",
          items: [
            { name: "Submit Research", path: "https://stagging.h2research.org/admin", description: "Submit your research" },
            { name: "Help Page", path: "https://h2research.org/FAQsGuide", description: "Research guidelines" },
            { name: "About MHI H₂ Research", path: "https://h2research.org/about ", description: "Database information" }
          ]
        },
        {
          title: "H₂ Research Access",
          items: [
            { name: "H₂ Research Sign In", path: "https://h2research.org/signin", description: "Sign in to H₂ Research" },
            { name: "H₂ Research Sign Up", path: "https://h2research.org/signup", description: "Sign up for H₂ Research" },
            { name: "Join the MHI Community", path: "https://molecularhydrogeninstitute.org/mhi-community/", description: "Become a member of the MHI Community" },
            { name: "Support MHI", path: "https://www.paypal.com/donate/?hosted_button_id=25E4KWZ7QPH6J", description: "Support the Molecular Hydrogen Institute" }
          ]
        }
      ]
    }
  },
  {
    name: "Certifications",
    path: "https://molecularhydrogeninstitute.org/certifications/",
    hasMegaMenu: true,
    megaMenuContent: {
      featured: {
        title: "MHI Certification Program",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
        description: "Professional hydrogen therapy certifications"
      },
      sections: [
        {
          title: "Certification Levels",
          items: [
            { name: "H₂ Apprentice", path: "https://molecularhydrogeninstitute.org/apprentice/", description: "Entry level certification" },
            { name: "Level 1 Certification", path: "https://molecularhydrogeninstitute.org/level-1-certification/", description: "Professional certification" }
          ]
        },
        {
          title: "Information",
          items: [
            { name: "About Certifications", path: "https://molecularhydrogeninstitute.org/benefits-of-the-mhi-certification/", description: "Certification benefits" },
            { name: "FAQs about Certification", path: "https://molecularhydrogeninstitute.org/benefits-of-the-mhi-certification", description: "Frequently asked questions" }
          ]
        }
      ]
    }
  },
   {
    name: "Events",
    path: "https://molecularhydrogeninstitute.org/events",
    hasMegaMenu: true,
    megaMenuContent: {
      featured: {
        title: "MHI Events",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=200&fit=crop",
        description: "Join our hydrogen research events and summits"
      },
      sections: [
        {
          title: "Upcoming Events",
          items: [
            { name: "H₂MHI Summit", path: "https://h2mhisummit.org/", description: "Annual hydrogen research summit" },
            { name: "Media Packet", path: "https://molecularhydrogeninstitute.org/events", description: "Event media resources" },
            { name: "Community Events", path: "https://molecularhydrogeninstitute.org/events/", description: "Local and virtual events" },
            { name: "Monthly Committee Schedule", path: "/", description: "Committee meeting calendar" }
          ]
        }
      ]
    }
  },
  {
    name: "About",
    path: "https://molecularhydrogeninstitute.org/about",
    hasMegaMenu: true,
    megaMenuContent: {
      featured: {
        title: "Our Mission",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
        description: "Advancing molecular hydrogen research globally"
      },
      sections: [
        {
          title: "Organization",
          items: [
            { name: "About MHI", path: "https://molecularhydrogeninstitute.org/about", description: "Our organization overview" },
            { name: "About MHI's H₂ Research Database", path: "/about", description: "Database information" },
            { name: "A Note from Founder", path: "https://molecularhydrogeninstitute.org/a-note-from-the-founder/", description: "Founder's message" },
            { name: "Advisory Panel", path: "https://molecularhydrogeninstitute.org/advisory-panel/", description: "Scientific advisors" },
            {
              name: "Contact Us", path: "https://h2research.org/contact-us", description: "Get in touch with us" 
            }
          ]
        }
      ]
    }
  },
  {
    name: "MHI Community",
    path: "https://molecularhydrogeninstitute.org/mhi-community/",
    hasMegaMenu: true,
    megaMenuContent: {
      featured: {
        title: "Join Our Community",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop",
        description: "Connect with hydrogen therapy professionals"
      },
      sections: [
        {
          title: "Community Access",
          items: [
            { name: "Join the MHI Community", path: "https://molecularhydrogeninstitute.org/mhi-community/", description: "Become a member" },
            { name: "MHI Committees", path: "https://molecularhydrogeninstitute.org/about-mhi-committees/", description: "Committee information" }
          ]
        }
      ]
    }
  },
 
  {
    name: "User Portal",
    path: "#",
    hasMegaMenu: true,
    megaMenuContent: {
      featured: {
        title: "Access Your Account",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
        description: "Login to your MHI accounts and portals"
      },
      sections: [
        {
          title: "Login Portals",
          items: [
            { name: "Community Login", path: "https://molecularhydrogeninstitute.org/", description: "Community platform access" },
            { name: "H₂ Research Premium Sign In", path: "https://h2research.org/signin", description: "Premium research access" },
            { name: "Public Researcher Sign Up", path: "https://h2research.org/signup", description: "Sign up for public research access" },
            { name: "Course Portal Login / Dashboard", path: "https://courses.molecularhydrogeninstitute.org/enrollments", description: "Educational courses" }
          ]
        }
      ]
    }
  }
];

const Professional3LayerNavbar = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  
  // Sticky header state
  const [isSticky, setIsSticky] = useState(true);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setActiveMobileSubmenu(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMegaMenuEnter = (itemName) => {
    setActiveMegaMenu(itemName);
  };

  const handleMegaMenuLeave = () => {
    setActiveMegaMenu(null);
  };

  const toggleMobileSubmenu = (itemName) => {
    setActiveMobileSubmenu(activeMobileSubmenu === itemName ? null : itemName);
  };

  return (
    <div className={` mb-12
      w-full transition-all duration-300 z-50
    fixed top-0 left-0 shadow-lg' 
      
      }
    `}>
      {/* Layer 0: Promotional Banner */}
      <div className="bg-[#004c78] text-white py-1  px-4 text-center relative overflow-hidden">
        <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-center relative z-10 space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="flex items-center space-x-2">
            {/* <span className="text-yellow-300 text-lg sm:text-base">🎉</span>
            <span className="font-semibold text-[12px]">Special Offer:</span> */}
          </div>
          <div className="text-[12px] text-center sm:text-left">
            <span className="hidden sm:inline">Help Us Advance H₂ Research, Education, and Awareness</span>
            <span className="sm:hidden">Help Us Advance H₂ Research, Education, and Awareness</span>
          </div>
          <a target="_blank" href="https://h2research.org/signup"   className="bg-yellow-500 hover:bg-yellow-400 text-[#004c78] font-semibold px-4 py-1.5 sm:px-3 sm:py-1 rounded-full text-[12px] transition-all duration-300 transform hover:scale-105 shadow-lg">
            Sign Up
          </a>
        </div>
      </div>

      {/* Layer 1: Top Contact Banner */}
      <div className="bg-white  border-b border-gray-200  px-4 text-sm hidden lg:block">
        <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto px-4 py-1 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <FiMail className="w-4 h-4" />
            <a href="mailto:info@molecularhydrogen.org" className="hover:underline">info@molecularhydrogen.org</a>
          </div>
          <div className="flex items-center space-x-2">
            <FiPhone className="w-4 h-4" />
            <span>+1 (435) 287-8150</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMapPin className="w-4 h-4" />
            <a href="https://h2research.org" target="_blank" rel="noopener noreferrer" className="">Research Center</a>
          </div>
            </div>
            <div className="flex items-center space-x-4">
          <div className="flex space-x-3">
            {/* Instagram */}
            <a href="https://www.instagram.com/h2mhi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="w-4 h-4 hover:text-[#004c78] cursor-pointer transition-colors" />
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/molecularhydrogeninstitute" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="w-4 h-4 hover:text-[#004c78] cursor-pointer transition-colors" />
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/molecular-hydrogen-institute/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="w-4 h-4 hover:text-[#004c78] cursor-pointer transition-colors" />
            </a>
            {/* X (Twitter) */}
            <a href="https://x.com/MHInstituteMHI" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
              <FaTwitter className="w-4 h-4 hover:text-[#004c78] cursor-pointer transition-colors" />
            </a>
          </div>
          {/*<button onClick={() => location.href='https://stagging.h2research.org/admin/login'} className="bg-[#004c78] text-white px-3 py-1 rounded text-xs transition-colors">*/}
          {/*  Login*/}
          {/*</button>*/}

              <Link to={`${import.meta.env.VITE_ADMIN_PANEL_BASE_URL}/admin/login`}>
                <button className="bg-[#004c78] text-white px-3 py-1 rounded text-xs transition-colors">
                  Login
                </button>
              </Link>

            </div>
          </div>
        </div>

        {/* Layer 2: Main Navigation Header */}
      <div className="bg-white  relative z-50">
        <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto py-1 ">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <Link to="/" className="logo-container">
                  <img
                    src={logo}
                    alt="logo"
                    className="max-w-[180px] cursor-pointer"
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center ">
              {menuItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasMegaMenu && handleMegaMenuEnter(item.name)}
                  onMouseLeave={() => item.hasMegaMenu && handleMegaMenuLeave()}
                >
                  <a
                    href={item.path}
                    className="flex items-center px-2 xl:px-3 py-6 text-gray-700 hover:text-[#004c78] font-medium transition-colors duration-200 group text-sm xl:text-base"
                  >
                    {item.name}
                    {item.hasMegaMenu && (
                      <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-200 ${activeMegaMenu === item.name ? 'rotate-180' : ''
                        }`} />
                    )}
                    {/* <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#004c78] transition-all duration-300 group-hover:w-full"></div> */}
                  </a>
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">

              {/* Donate Button */}
              <button
                onClick={() => window.open("https://www.paypal.com/donate/?hosted_button_id=25E4KWZ7QPH6J", "_blank")}
                className="bg-[#004c78] hover:bg-[#004c78] text-white px-4 lg:px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg text-sm lg:text-base"
              >
                Donate
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-[#004c78] transition-colors"
              >
                {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Layer 3: Mega Menu */}
        {activeMegaMenu && (
          <div
            className="absolute -mt-2 left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-40"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={handleMegaMenuLeave}
          >
            <div className="max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto px-4 py-8">
              {(() => {
                const activeItem = menuItems.find(item => item.name === activeMegaMenu);
                const megaContent = activeItem?.megaMenuContent;

                if (!megaContent) return null;

                return (
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Featured Section */}
                    <div className="lg:col-span-1">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 h-full">
                        <img
                          src={megaContent.featured.image}
                          alt={megaContent.featured.title}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {megaContent.featured.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {megaContent.featured.description}
                        </p>
                        <a
                          href="https://h2research.org/about"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#004c78] hover:text-[#004c78] font-medium text-sm"
                        >
                          Learn More →
                        </a>
                      </div>
                    </div>

                    {/* Menu Sections */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                      {megaContent.sections.map((section, index) => (
                        <div key={index} className="space-y-4">
                          <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                            {section.title}
                          </h3>
                          <ul className="space-y-3">
                            {section.items.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <a
                                  href={subItem.path}
                                  className="group block hover:bg-gray-50 rounded-lg p-2 transition-all duration-200"
                                >
                                  <div className="font-medium text-gray-800 group-hover:text-[#004c78] transition-colors">
                                    {subItem.name}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {subItem.description}
                                  </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <Link to="/" className="logo-container">
                  <img
                    src={logo}
                    alt="logo"
                    className="max-w-[180px] cursor-pointer"
                  />
                </Link>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-[#004c78] transition-colors"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto h-full pb-20">

              {/* Mobile Navigation Items */}
              <div className="py-4">
                {menuItems.map((item) => (
                  <div key={item.name}>
                    <div
                      className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        if (item.hasMegaMenu) {
                          toggleMobileSubmenu(item.name);
                        } else {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                    >
                      <span className="font-medium">{item.name}</span>
                      {item.hasMegaMenu && (
                        <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMobileSubmenu === item.name ? 'rotate-180' : ''
                          }`} />
                      )}
                    </div>

                    {/* Mobile Submenu */}
                    {item.hasMegaMenu && activeMobileSubmenu === item.name && (
                      <div className="bg-gray-50 py-2">
                        {item.megaMenuContent.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="px-4 py-3">
                            <h4 className="text-sm font-semibold text-gray-800 mb-2 px-4">
                              {section.title}
                            </h4>
                            <ul className="space-y-1">
                              {section.items.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <a
                                    href={subItem.path}
                                    className="block px-4 py-2 text-sm text-gray-600 hover:text-[#004c78] hover:bg-white rounded transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {subItem.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Contact Info */}
              <div className="border-t border-gray-200 p-4 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <FiMail className="w-4 h-4" />
                  <span>info@molecularhydrogen.org</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <FiPhone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex space-x-4 pt-2">
                  {/* Instagram */}
                  <a href="https://www.instagram.com/h2mhi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram className="w-5 h-5 text-gray-600 hover:text-[#004c78] cursor-pointer transition-colors" />
                  </a>
                  {/* Facebook */}
                  <a href="https://www.facebook.com/molecularhydrogeninstitute" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebook className="w-5 h-5 text-gray-600 hover:text-[#004c78] cursor-pointer transition-colors" />
                  </a>
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/company/molecular-hydrogen-institute/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FaLinkedin className="w-5 h-5 text-gray-600 hover:text-[#004c78] cursor-pointer transition-colors" />
                  </a>
                  {/* X (Twitter) */}
                  <a href="https://x.com/MHInstituteMHI" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                    <FaTwitter className="w-5 h-5 text-gray-600 hover:text-[#004c78] cursor-pointer transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Professional3LayerNavbar;