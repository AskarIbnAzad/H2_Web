import {
    Microscope,
    molecule,
    Book,
    GetInvolved,
    StayUpdated,
} from "../assets/images"
import { Link as ScrollLink } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import SubscribeModal from "../components/SubscribeModal/SubscribeModal";
import SocialMediaModal from "../components/SocialMediaModal/SocialMediaModal";

// Clean Background Component
const CleanBackground = () => {
    return (
        <>
            {/* Subtle Molecular Pattern */}
            <div className="absolute inset-0 opacity-5">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 2}s`,
                            animationDuration: '6s'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" className="text-[#004c78]">
                            <circle cx="6" cy="10" r="2" fill="currentColor" opacity="0.3" />
                            <circle cx="14" cy="10" r="2" fill="currentColor" opacity="0.3" />
                            <line x1="8" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                        </svg>
                    </div>
                ))}
            </div>

            {/* Clean Grid */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `
                    linear-gradient(rgba(0, 76, 120, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 76, 120, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
            }}></div>
        </>
    );
};

// Individual Section Card Component
const SectionCard = ({ icon, title, links, delay = 0 }) => {
    return (
        <div 
            className="group relative h-full"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Card Container */}
            <div className="relative h-full bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#004c78]"></div>
                
                {/* Icon Section */}
                <div className="relative mb-8">
                    <div className="w-16 h-16 mx-auto relative">
                        {/* Icon Background */}
                        <div className="absolute inset-0 bg-[#004c78] rounded-xl shadow-lg group-hover:shadow-[#004c78]/20 transition-all duration-300 group-hover:scale-105"></div>
                        
                        {/* Icon */}
                        <div className="relative w-full h-full bg-[#004c78] rounded-xl flex items-center justify-center">
                            <img src={icon} alt={title} className="w-8 h-8 filter brightness-0 invert" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center group-hover:text-[#004c78] transition-colors duration-300">
                    {title}
                </h3>

                {/* Links */}
                <div className="space-y-3">
                    {links.map((link, index) => (
                        <div key={index} className="relative">
                            {link.isScrollLink ? (
                                <ScrollLink
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    className="group/link flex items-center p-3 rounded-lg bg-gray-50 hover:bg-[#004c78]/5 border border-gray-100 hover:border-[#004c78]/20 transition-all duration-200 cursor-pointer"
                                >
                                    <div className="w-1.5 h-1.5 bg-[#004c78] rounded-full mr-3 group-hover/link:scale-150 transition-transform duration-200"></div>
                                    <span className="text-gray-700 group-hover/link:text-[#004c78] font-medium text-xs flex-1">
                                        {link.text}
                                    </span>
                                    <svg className="w-4 h-4 text-gray-400 group-hover/link:text-[#004c78] group-hover/link:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </ScrollLink>
                            ) : link.isComponent ? (
                                <div className="group/link flex items-center p-3 rounded-lg bg-gray-50 hover:bg-[#004c78]/5 border border-gray-100 hover:border-[#004c78]/20 transition-all duration-200 cursor-pointer">
                                    <div className="w-1.5 h-1.5 bg-[#004c78]  rounded-full mr-3 group-hover/link:scale-150 transition-transform duration-200"></div>
                                    <div className="flex-1 text-xs" >
                                        {link.component}
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400 group-hover/link:text-[#004c78] group-hover/link:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            ) : (
                                <Link
                                    to={link.to}
                                    className="group/link flex items-center p-3 rounded-lg bg-gray-50 hover:bg-[#004c78]/5 border border-gray-100 hover:border-[#004c78]/20 transition-all duration-200"
                                >
                                    <div className="w-1.5 h-1.5 bg-[#004c78] rounded-full mr-3 group-hover/link:scale-150 transition-transform duration-200"></div>
                                    <span className="text-gray-700 group-hover/link:text-[#004c78] font-medium text-xs flex-1">
                                        {link.text}
                                    </span>
                                    <svg className="w-4 h-4 text-gray-400 group-hover/link:text-[#004c78] group-hover/link:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>
        </div>
    );
};

// Main Component
const EnhancedInfoSection = () => {
    const sections = [
        {
            icon: Book,
            title: "Learn",
            links: [
                {
                    text: "What is Molecular Hydrogen?",
                    to: "https://molecularhydrogeninstitute.org/the-complete-guide-to-molecular-hydrogen-therapy/"
                },
                {
                    text: "About MHI H₂ Research Database",
                    to: "about"
                },
                {
                    text: "About MHI Certifications",
                    to: "https://molecularhydrogeninstitute.org/certifications/"
                },
                {
                    text: "FAQs and How-To Guide",
                    to: "FAQsGuide"
                }
            ]
        },
        {
            icon: Microscope,
            title: "Find",
            links: [
                {
                    text: "Search by Keyword",
                    to: "/articles"
                },
                {
                    text: "Explore the Data",
                    to: "/explore-data"
                },
                {
                    text: "Discover What's Trending",
                    to: "tranding-articles",
                    isScrollLink: true
                },
                {
                    text: "Events, Conferences, and Media",
                    to: "https://molecularhydrogeninstitute.org/events/"
                }
            ]
        },
        {
            icon: GetInvolved,
            title: "Get Involved",
            links: [
                {
                    text: "Join the MHI Community",
                    to: "https://molecularhydrogeninstitute.org/mhi-community/"
                },
                // Hide Upgrade to premium for now
                // {
                //     text: "Upgrade to H₂ Research Premium Account",
                //     to: "/subscription"
                // },
                {
                    text: "Submit Research",
                    to: "https://h2research.org/signup"
                },
                {
                    text: "Become Certified",
                    to: "https://molecularhydrogeninstitute.org/level-1-certification/"
                }
            ]
        },
        {
            icon: StayUpdated,
            title: "Stay Updated",
            links: [
                {
                    text: "Read the latest educational articles",
                    to: "https://molecularhydrogeninstitute.org/articles/"
                },
                {
                    text: "Subscribe for Updates",
                    to: "https://h2research.org/",
                    isComponent: true,
                    component: <SubscribeModal />
                },
                {
                    text: "Follow Us on Social Media",
                    isComponent: true,
                    component: <SocialMediaModal />
                }
            ]
        }
    ];

    return (
        <section className="relative py-10">
            {/* Clean Background */}
            <CleanBackground />
            
            {/* Content */}
            <div className="relative max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto px-6">

                {/* Section Header */}
                {/* <div className="text-center mb-16">
                    <Link to="/explore-data" className="inline-flex items-center space-x-2 bg-[#004c78]/10 text-[#004c78] px-6 py-3 rounded-full text-sm font-semibold mb-6 hover:bg-[#004c78]/20 transition-colors duration-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Explore H₂ Research</span>
                    </Link>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Your Gateway to
                        <span className="text-[#004c78]"> Molecular Hydrogen</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Discover comprehensive research, connect with the community, and advance your knowledge in the cutting-edge field of molecular hydrogen therapy.
                    </p>
                </div> */}

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {sections.map((section, index) => (
                        <SectionCard
                            key={index}
                            icon={section.icon}
                            title={section.title}
                            links={section.links}
                            delay={index * 150}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EnhancedInfoSection;