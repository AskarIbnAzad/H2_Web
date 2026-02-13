// Helper to extract plain text from HTML string
function extractTextFromHtml(html) {
    if (!html) return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
}
// Format abstract for H2 subscript and safe HTML rendering
function formatAbstractH2(abstract) {
    if (!abstract) return "";
    return abstract.replace(/H2/gi, "H<sub>2</sub>");
}
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

// Molecular structure animation component with more H2 molecules
const MolecularBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-20">
            {/* Large H2 Molecule - Top Left */}
            <div className="absolute top-16 left-12 animate-pulse" style={{ animationDuration: '4s' }}>
                <svg width="140" height="140" viewBox="0 0 140 140" className="text-white">
                    <circle cx="35" cy="70" r="14" fill="currentColor" opacity="0.8" />
                    <circle cx="105" cy="70" r="14" fill="currentColor" opacity="0.8" />
                    <line x1="49" y1="70" x2="91" y2="70" stroke="currentColor" strokeWidth="5" opacity="0.6" />
                    <text x="35" y="50" textAnchor="middle" className="text-lg font-bold" fill="currentColor">H</text>
                    <text x="105" y="50" textAnchor="middle" className="text-lg font-bold" fill="currentColor">H</text>
                    <text x="70" y="100" textAnchor="middle" className="text-sm font-bold" fill="currentColor" opacity="0.7">H₂</text>
                </svg>
            </div>

            {/* Medium H2 Molecule - Top Right */}
            <div className="absolute top-24 right-16 animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }}>
                <svg width="100" height="100" viewBox="0 0 100 100" className="text-white">
                    <circle cx="30" cy="50" r="10" fill="currentColor" opacity="0.7" />
                    <circle cx="70" cy="50" r="10" fill="currentColor" opacity="0.7" />
                    <line x1="40" y1="50" x2="60" y2="50" stroke="currentColor" strokeWidth="4" opacity="0.5" />
                    <text x="30" y="35" textAnchor="middle" className="text-sm font-bold" fill="currentColor">H</text>
                    <text x="70" y="35" textAnchor="middle" className="text-sm font-bold" fill="currentColor">H</text>
                </svg>
            </div>

            {/* Top Center H2 Molecule */}
            <div className="absolute top-12 left-1/2 transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>
                <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
                    <circle cx="25" cy="40" r="8" fill="currentColor" opacity="0.6" />
                    <circle cx="55" cy="40" r="8" fill="currentColor" opacity="0.6" />
                    <line x1="33" y1="40" x2="47" y2="40" stroke="currentColor" strokeWidth="3" opacity="0.4" />
                    <text x="40" y="60" textAnchor="middle" className="text-xs font-bold" fill="currentColor">H₂</text>
                </svg>
            </div>

            {/* Small H2 Molecule - Bottom Left */}
            <div className="absolute bottom-32 left-1/4 animate-pulse" style={{ animationDelay: '2s', animationDuration: '3s' }}>
                <svg width="70" height="70" viewBox="0 0 70 70" className="text-white">
                    <circle cx="22" cy="35" r="7" fill="currentColor" opacity="0.6" />
                    <circle cx="48" cy="35" r="7" fill="currentColor" opacity="0.6" />
                    <line x1="29" y1="35" x2="41" y2="35" stroke="currentColor" strokeWidth="2" opacity="0.4" />
                    <text x="22" y="28" textAnchor="middle" className="text-xs font-bold" fill="currentColor">H</text>
                    <text x="48" y="28" textAnchor="middle" className="text-xs font-bold" fill="currentColor">H</text>
                </svg>
            </div>

            {/* Bottom Right H2 Molecule */}
            <div className="absolute bottom-20 right-1/4 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4s' }}>
                <svg width="90" height="90" viewBox="0 0 90 90" className="text-white">
                    <circle cx="28" cy="45" r="9" fill="currentColor" opacity="0.7" />
                    <circle cx="62" cy="45" r="9" fill="currentColor" opacity="0.7" />
                    <line x1="37" y1="45" x2="53" y2="45" stroke="currentColor" strokeWidth="3" opacity="0.5" />
                    <text x="45" y="25" textAnchor="middle" className="text-xs font-bold" fill="currentColor">H₂</text>
                </svg>
            </div>

            {/* Complex Molecular Structure - Center Right */}
            <div className="absolute top-1/2 right-20 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '6s' }}>
                 <svg width="110" height="110" viewBox="0 0 110 110" className="text-white">
                    <circle cx="32" cy="55" r="12" fill="currentColor" opacity="0.6" />
                    <circle cx="78" cy="55" r="12" fill="currentColor" opacity="0.6" />
                    <line x1="44" y1="55" x2="66" y2="55" stroke="currentColor" strokeWidth="4" opacity="0.5" />
                    <text x="32" y="40" textAnchor="middle" className="text-sm font-bold" fill="currentColor">H</text>
                    <text x="78" y="40" textAnchor="middle" className="text-sm font-bold" fill="currentColor">H</text>
                    <text x="55" y="80" textAnchor="middle" className="text-sm font-bold" fill="currentColor">H₂</text>
                </svg>
            </div>

            {/* Left Center H2 Molecule */}
            <div className="absolute top-1/2 left-16 animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4.5s' }}>
                <svg width="110" height="110" viewBox="0 0 110 110" className="text-white">
                    <circle cx="32" cy="55" r="12" fill="currentColor" opacity="0.6" />
                    <circle cx="78" cy="55" r="12" fill="currentColor" opacity="0.6" />
                    <line x1="44" y1="55" x2="66" y2="55" stroke="currentColor" strokeWidth="4" opacity="0.5" />
                    <text x="32" y="40" textAnchor="middle" className="text-sm font-bold" fill="currentColor">H</text>
                    <text x="78" y="40" textAnchor="middle" className="text-sm font-bold" fill="currentColor">H</text>
                    <text x="55" y="80" textAnchor="middle" className="text-sm font-bold" fill="currentColor">H₂</text>
                </svg>
            </div>

            {/* Scientific Formula Display - Bottom Center */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '4s' }}>
                <svg width="120" height="80" viewBox="0 0 120 80" className="text-white">
                    <text x="60" y="30" textAnchor="middle" className="text-xl font-bold" fill="currentColor" opacity="0.6">H₂</text>
                    <text x="60" y="55" textAnchor="middle" className="text-sm" fill="currentColor" opacity="0.5">Molecular Hydrogen</text>
                </svg>
            </div>

            {/* Top Right Corner H2 */}
            <div className="absolute top-40 right-40 animate-pulse" style={{ animationDelay: '3s', animationDuration: '5s' }}>
                <svg width="60" height="60" viewBox="0 0 60 60" className="text-white">
                    <circle cx="20" cy="30" r="6" fill="currentColor" opacity="0.5" />
                    <circle cx="40" cy="30" r="6" fill="currentColor" opacity="0.5" />
                    <line x1="26" y1="30" x2="34" y2="30" stroke="currentColor" strokeWidth="2" opacity="0.4" />
                </svg>
            </div>

            {/* Floating H2 particles with better visibility */}
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-ping"
                    style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${15 + Math.random() * 70}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: '4s'
                    }}
                >
                    <svg width="28" height="28" viewBox="0 0 28 28" className="text-white">
                        <circle cx="9" cy="14" r="3.5" fill="currentColor" opacity="0.4" />
                        <circle cx="19" cy="14" r="3.5" fill="currentColor" opacity="0.4" />
                        <line x1="12.5" y1="14" x2="15.5" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                    </svg>
                </div>
            ))}

            {/* Scientific bonds and connections */}
            <div className="absolute top-1/3 left-1/3 animate-pulse" style={{ animationDelay: '3s', animationDuration: '5s' }}>
                <svg width="180" height="120" viewBox="0 0 180 120" className="text-white">
                    <line x1="30" y1="60" x2="150" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="8,8" />
                    <line x1="90" y1="20" x2="90" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="8,8" />
                    <circle cx="90" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                </svg>
            </div>

            {/* Additional H2 molecules in corners */}
            <div className="absolute bottom-16 left-12 animate-bounce" style={{ animationDelay: '4s', animationDuration: '6s' }}>
                <svg width="75" height="75" viewBox="0 0 75 75" className="text-white">
                    <circle cx="24" cy="37" r="8" fill="currentColor" opacity="0.6" />
                    <circle cx="51" cy="37" r="8" fill="currentColor" opacity="0.6" />
                    <line x1="32" y1="37" x2="43" y2="37" stroke="currentColor" strokeWidth="3" opacity="0.4" />
                    <text x="37" y="55" textAnchor="middle" className="text-xs font-bold" fill="currentColor">H₂</text>
                </svg>
            </div>

            <div className="absolute top-60 right-12 animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '4s' }}>
                <svg width="85" height="85" viewBox="0 0 85 85" className="text-white">
                    <circle cx="26" cy="42" r="9" fill="currentColor" opacity="0.7" />
                    <circle cx="59" cy="42" r="9" fill="currentColor" opacity="0.7" />
                    <line x1="35" y1="42" x2="50" y2="42" stroke="currentColor" strokeWidth="3" opacity="0.5" />
                    <text x="42" y="25" textAnchor="middle" className="text-xs font-bold" fill="currentColor">H₂</text>
                </svg>
            </div>
        </div>
    );
};


// Articles-style Search Component for HeroSection
const HeroArticlesSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const dropdownRef = useRef(null);
    const listRef = useRef(null);
    const inputRef = useRef(null);
    const [dropdownStyle, setDropdownStyle] = useState({});
    const navigate = useNavigate();

    // Fetch articles for a given page
    const fetchArticles = async (search, pageNum, append = false) => {
        try {
            if (pageNum === 1) setLoading(true);
            else setIsFetchingMore(true);
            setError(null);
            
            // For HeroSection search, we only send the search term
            // No need to transform filter IDs here since this is just text search
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/final-article-list-main", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    per_page: 15,
                    page: pageNum,
                    reqType: "user",
                    admin_search: [search],
                    orderBy: "DESC",
                    isAnd: false
                })
            });
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            const articles = data?.articles || [];
            setSearchResults(prev => append ? [...prev, ...articles] : articles);
            setHasMore(!!articles.length && (data.current_page < data.last_page));
            setShowDropdown(true);
        } catch (err) {
            setError("No articles found");
            setShowDropdown(true);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    };

    // Initial search or when searchTerm changes
    useEffect(() => {
        if (searchTerm.length < 3) {
            setSearchResults([]);
            setShowDropdown(false);
            setPage(1);
            setHasMore(true);
            return;
        }
        setPage(1);
        fetchArticles(searchTerm, 1, false);
    }, [searchTerm]);

    // Infinite scroll for dropdown
    useEffect(() => {
        if (!showDropdown) return;
        const handleScroll = () => {
            const el = listRef.current;
            if (!el || loading || isFetchingMore || !hasMore) return;
            if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
                setPage(prev => {
                    const nextPage = prev + 1;
                    fetchArticles(searchTerm, nextPage, true);
                    return nextPage;
                });
            }
        };
        const el = listRef.current;
        if (el) el.addEventListener('scroll', handleScroll);
        return () => { if (el) el.removeEventListener('scroll', handleScroll); };
    }, [showDropdown, loading, isFetchingMore, hasMore, searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Position dropdown below input
    useEffect(() => {
        if (showDropdown && inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            setDropdownStyle({
                position: 'absolute',
                left: rect.left + window.scrollX,
                top: rect.bottom + window.scrollY + 4,
                width: rect.width,
                zIndex: 99999
            });
        }
    }, [showDropdown, searchTerm]);

    const handleResultClick = (mhid) => {
        setShowDropdown(false);
        navigate(`/ArticleDetails/${mhid}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && searchTerm.length >= 3 && searchResults.length > 0) {
            handleResultClick(searchResults[0].mhid);
        }
    };

    return (
        <div className="relative max-w-4xl mx-auto">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="search"
                    className="w-full h-16 rounded-2xl bg-white/95 backdrop-blur-sm px-6 text-lg border-2 border-white/20 focus:border-blue-400 shadow-2xl outline-none transition-all duration-300 placeholder-gray-400"
                    placeholder="Search by title, author, year, or abstract..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => searchTerm.length >= 3 && setShowDropdown(true)}
                    onKeyDown={handleKeyDown}
                />
                {loading && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#004c78]"></div>
                    </div>
                )}
                {showDropdown && createPortal(
                    <div
                        ref={dropdownRef}
                        className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl border border-gray-100"
                        style={{ ...dropdownStyle, overflow: 'visible', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}
                    >
                        <div className="sticky top-0 bg-gradient-to-r from-gray-50 to-blue-50 py-3 px-6 border-b border-gray-100 rounded-t-2xl">
                            {/* <span className="text-sm font-semibold text-gray-600">
                                Search Results ({searchResults.length})
                            </span> */}
                        </div>
                        <ul
                            ref={listRef}
                            className="p-0 m-0 overflow-y-auto"
                            style={{ maxHeight: '18rem', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem', paddingBottom: '0.75rem', background: 'transparent' }}
                        >
                            {searchResults.length > 0 ? (
                                searchResults.map((article, idx) => {
                                    const abstract = article.publicData?.abstract?.name || "";
                                    const isHtml = /<[^>]+>/.test(abstract);
                                    let preview = "";
                                    if (abstract) {
                                        let text = isHtml ? extractTextFromHtml(abstract) : abstract;
                                        let truncated = text.length > 120 ? text.slice(0, 120) + '...' : text;
                                        preview = formatAbstractH2(truncated);
                                    }
                                    return (
                                        <li
                                            key={idx}
                                            className="py-4 px-6 cursor-pointer border-b border-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 last:rounded-b-2xl last:border-b-0"
                                            onClick={() => handleResultClick(article.mhid)}
                                            style={{ background: 'transparent' }}
                                        >
                                            <div className="flex flex-col gap-1 text-left">
                                                <span className="text-base font-semibold text-[#004C78]">{article.publicData?.title?.name || "Untitled"}</span>
                                                <span className="text-xs text-gray-500">{article.publicData?.year?.name ? `Year: ${article.publicData.year.name}` : ""}</span>
                                                <span className="text-xs text-gray-500">{article.publicData?.authors && Array.isArray(article.publicData.authors) ? `Authors: ${article.publicData.authors.map(a => a.name).join(", ")}` : ""}</span>
                                                {abstract && (
                                                    <span className="text-xs text-gray-700 line-clamp-2" dangerouslySetInnerHTML={{ __html: preview }} />
                                                )}
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <li className="py-6 px-6 text-center">
                                    <div className="text-gray-400">
                                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-sm font-medium">{error || "No articles found"}</p>
                                    </div>
                                </li>
                            )}
                            {isFetchingMore && (
                                <li className="py-4 px-6 text-center text-gray-400">
                                    <div className="flex justify-center items-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#004c78]"></div>
                                        Loading more...
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>,
                    document.body
                )}
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4 sm:px-0">
                <button
                    onClick={() => navigate("articles")}
                    className="group w-full sm:w-auto inline-flex py-3 sm:py-4 px-6 sm:px-8 justify-center items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#004c78] to-[#0066a3] text-white hover:from-[#003d5c] hover:to-[#004c78] transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold text-sm sm:text-base"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Advanced Filter
                </button>
                <button
                    onClick={() => navigate("explore-data")}
                    className="group w-full sm:w-auto inline-flex py-3 sm:py-4 px-6 sm:px-8 justify-center items-center gap-2 sm:gap-3 border-2 border-white/30 rounded-xl sm:rounded-2xl text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transform hover:scale-105 transition-all duration-300 font-semibold text-sm sm:text-base"
                >
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Explore Data
                </button>
            </div>
        </div>
    );
};

// Main Hero Component
const MolecularHydrogenHero = () => {
    const statsData = [
        { value: 3000, label: "Total Studies", suffix: "+" },
        { value: 207, label: "Human Studies", suffix: "+" },
        { value: 203, label: "Different Disease Models", suffix: "+" }
    ];

    // State for animated values
    const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);
    const [hasAnimated, setHasAnimated] = useState(false);
    const statsRef = useRef(null);

    // Counter animation function
    const animateCounter = (start, end, duration, index) => {
        const startTime = performance.now();

        const updateValue = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation (easeOutQuart)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(start + (end - start) * easeOutQuart);

            setAnimatedValues(prev => {
                const newValues = [...prev];
                newValues[index] = currentValue;
                return newValues;
            });

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };

        requestAnimationFrame(updateValue);
    };

    // Intersection Observer for triggering animation when stats come into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);

                        // Start animations with staggered delays
                        statsData.forEach((stat, index) => {
                            setTimeout(() => {
                                animateCounter(0, stat.value, 2000, index);
                            }, index * 200); // 200ms delay between each counter
                        });
                    }
                });
            },
            {
                threshold: 0.3, // Trigger when 30% of the element is visible
                rootMargin: '0px 0px -100px 0px' // Start animation a bit before element is fully visible
            }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, [hasAnimated]);

    // Format number with commas
    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    // Stats Card Component
    const StatsCard = ({ value, label, suffix, index, isAnimating }) => (
        <div className={`
      bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 
      hover:bg-white/15 transition-all duration-300 transform hover:scale-105
      ${isAnimating ? 'animate-fade-in-up' : ''}
    `}
            style={{
                animationDelay: `${index * 0.2}s`
            }}
        >
            <div className="text-4xl font-bold text-white mb-2 font-mono">
                {formatNumber(value)}{suffix}
            </div>
            <div className="text-blue-100 font-medium">{label}</div>
        </div>
    );

    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#004c78] via-[#0066a3] to-[#003d5c] overflow-hidden">
                {/* Background Elements */}
                <MolecularBackground />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#004c78]/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0066a3]/10 to-transparent"></div>

                {/* Content Container */}
                <div className="relative max-w-[1200px] 1366px:max-w-[1280px] 1440px:max-w-[1360px] 1920px:max-w-[1800px] mx-auto px-4 py-20 flex items-center ">
                    <div className="w-full text-center">

                        {/* Main Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl  font-extrabold text-white mb-6 leading-none">
                                 H₂ Research Database
                           
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl lg:text-1xl text-blue-100 mb-12 font-medium max-w-4xl mx-auto leading-relaxed">
                             Advancing H₂ science since 2013
                        </p>

                        {/* Search Component */}
                        <div className="max-w-5xl mx-auto mb-16">
                            <HeroArticlesSearch />
                        </div>

                        {/* Stats */}
                        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <div className="text-4xl font-bold text-white mb-2">3,000+</div>
                                <div className="text-blue-100">Total Studies</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <div className="text-4xl font-bold text-white mb-2">207+</div>
                                <div className="text-blue-100">Human Studies</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                <div className="text-4xl font-bold text-white mb-2">203+</div>
                                <div className="text-blue-100">Different Disease Models</div>
                            </div>
                        </div> */}
                        {/* <div
                            ref={statsRef}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                        >
                            {statsData.map((stat, index) => (
                                <StatsCard
                                    key={index}
                                    value={animatedValues[index]}
                                    label={stat.label}
                                    suffix={stat.suffix}
                                    index={index}
                                    isAnimating={hasAnimated}
                                />
                            ))}
                        </div> */}
                    </div>
                </div>


            </section>

            {/* Custom Styles */}
            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        /* Custom scrollbar for search results */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #004c78;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #003d5c;
        }
      `}</style>
        </div>
    );
};

export default MolecularHydrogenHero;