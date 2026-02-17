// import React, { useCallback, useEffect, useRef, useState } from "react";
// import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
// import SearchBar from "../components/SearchBar/SearchBar";
// import StudyCard from "../components/StudyCard/StudyCard";
// import axios from "axios";
// import { Oval } from "react-loader-spinner";
// import { useLocation, useNavigate } from "react-router-dom";
// import { additionalFilters } from "../utils/constants";
// import { transformFilters } from "../utils/helpers";
// import { apiHandle } from "../config/apiHandle/apiHandle";
// import NoDataFound from "../components/NoDataFound/NoDataFound";

// const Articles = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [studies, setStudies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [selectedFilters, setSelectedFilters] = useState({});
//   const [sortOrder, setSortOrder] = useState("newest"); // "newest" or "oldest"
//   const [isLoadingMore, setIsLoadingMore] = useState(false);
//   const [totalArticles, setTotalArticles] = useState(0);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//   const abortControllerRef = useRef(null);
//   useEffect(() => {
//     // Parse URL parameters when component loads
//     const searchParams = new URLSearchParams(location.search);
//     const params = {};
//     //  if (searchParams) {
//     //     setSearchTerm(searchParams);
//     //  }
//     // Map URL parameters to request body fields
//     const paramMappings = {
//       study: "studyType",
//       specie: "species",
//       researchTopic: "researchtopic",
//       organ: "organ",
//       year: "year",
//       author: "admin_search",
//       marker: "marker",
//       category: "category",
//       authors: "authors",
//       country: "country",
//       system: "system",
//       administration_methods: "administration_methods",
//     };

//     // Iterate through all search parameters
//     searchParams.forEach((value, key) => {
//       if (paramMappings[key]) {
//         const mappedKey = paramMappings[key];
//         if (
//           [
//             "studyType",
//             "species",
//             "researchtopic",
//             "organ",
//             "marker",
//             "category",
//             "authors",
//             "country",
//             "system",
//             "administration_methods",
//           ].includes(mappedKey)
//         ) {
//           params[mappedKey] = searchParams.getAll(key);
//         } else if (["year", "admin_search"].includes(mappedKey)) {
//           params[mappedKey] = value;
//         }
//       }
//     });

//     // Update selected filters with parsed params
//     setSelectedFilters((prev) => ({
//       ...prev,
//       ...params,
//     }));
//   }, [location.search]);
//   // Memoized fetch function
//   const fetchStudies = useCallback(
//     async (pageNumber = 1, searchQuery = debouncedSearchTerm) => {
//       try {
//         // Cancel previous request
//         if (abortControllerRef.current) {
//           abortControllerRef.current.abort();
//         }
//         abortControllerRef.current = new AbortController();

//         pageNumber === 1 ? setLoading(true) : setIsLoadingMore(true);

//         const requestBody = {
//           per_page: 20,
//           page: pageNumber,
//           reqType: "user",
//           admin_search: searchQuery || undefined,
//           orderBy: sortOrder === "newest" ? "DESC" : "ASC",
//         };

//         // Apply other filters
//         Object.entries(selectedFilters).forEach(([key, value]) => {
//           if (key === "otherFilters") return; // Skip direct otherFilters access

//           if (value?.length > 0) {
//             requestBody[key] = key === "year" ? Number(value) : value;
//           }
//         });

//         // Handle Other Filters parameters
//         Object.entries(selectedFilters).forEach(([param, value]) => {
//           if (
//             [
//               "HighlightArticle",
//               "CompMethodAdmin",
//               "doseComparison",
//               "drugComparison",
//               "pharmacokinetics",
//               "isERW",
//               "safetyofhydrogen",
//             ].includes(param)
//           ) {
//             requestBody[param] = "True"; // Send "True" for checked parameters
//           }
//         });

//         const response = await apiHandle.post(
//           "final-article-list",
//           requestBody,
//           {
//             signal: abortControllerRef.current.signal,
//           }
//         );

//         if (response.data.articles.length === 0) {
//           setHasMore(false);
//           setStudies([]);
//           setTotalArticles(response?.data?.total);
//         } else {
//           setTotalArticles(response?.data?.total);
//           setStudies((prevStudies) => {
//             return pageNumber === 1
//               ? response.data.articles
//               : [...prevStudies, ...response.data.articles];
//           });
//           setHasMore(response.data.current_page < response.data.last_page);
//         }
//       } catch (err) {
//         if (err.name !== "AbortError") {
//           setError("Error fetching data");
//         }
//       } finally {
//         setLoading(false);
//         setIsLoadingMore(false);
//         abortControllerRef.current = null;
//       }
//     },
//     [selectedFilters, debouncedSearchTerm, sortOrder]
//   );

//   // Combined effect for filters and pagination
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchStudies(page);
//     }, 100);

//     return () => {
//       clearTimeout(timer);
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//     };
//   }, [page, selectedFilters, fetchStudies]);

//   // Utility function
//   const shallowCompare = (obj1, obj2) => {
//     const keys1 = Object.keys(obj1);
//     const keys2 = Object.keys(obj2);

//     if (keys1.length !== keys2.length) return false;

//     return keys1.every((key) =>
//       Array.isArray(obj1[key])
//         ? obj1[key].length === obj2[key]?.length &&
//         obj1[key].every((val, i) => val === obj2[key][i])
//         : obj1[key] === obj2[key]
//     );
//   };

//   const handleFilterChange = useCallback(
//     (filterName, value, checked, type = "checkbox") => {
//       setSelectedFilters((prev) => {
//         const newFilters = { ...prev };

//         // Special handling for Other Filters
//         if (filterName === "otherFilters") {
//           if (checked) {
//             newFilters[value] = "True"; // Set corresponding parameter to "True"
//           } else {
//             delete newFilters[value]; // Remove parameter when unchecked
//           }
//           return newFilters;
//         }

//         // Existing handling for other filters
//         if (type === "radio") {
//           newFilters[filterName] = value;
//         } else {
//           if (checked) {
//             newFilters[filterName] = [...(newFilters[filterName] || []), value];
//           } else {
//             newFilters[filterName] = (newFilters[filterName] || []).filter(
//               (item) => item !== value
//             );
//             if (newFilters[filterName].length === 0) {
//               delete newFilters[filterName];
//             }
//           }
//         }

//         return shallowCompare(prev, newFilters) ? prev : newFilters;
//       });
//       setPage(1);
//     },
//     []
//   );

//   // Optimized search handler
//   const handleSearch = useCallback(() => {
//     setPage(1);
//     fetchStudies(1, searchTerm);
//   }, [searchTerm, fetchStudies]);

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const response = await fetch(
//           "https://h2research.org/backend/public/api/get-fiters"
//         );
//         const result = await response.json();

//         if (result.status && result.data) {
//           const combinedData = {
//             ...result.data,
//             ...additionalFilters,
//           };

//           const transformedFilters = transformFilters(combinedData);
//           setFilters(transformedFilters);
//         }
//       } catch (error) {
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFilters();
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleArticleDetails = (items) => {
//     navigate(`/ArticleDetails/${items.mhid}`);
//   };

//   const handleLoadMore = () => {
//     setIsLoadingMore(true);
//     setPage((prev) => prev + 1);
//   };

//   const filteredStudies = isSearchActive
//     ? searchResults // Search results use करें
//     : studies // Normal results use करें
//       .filter((study) => {
//         const yearFilter = selectedYear
//           ? study.publicData.year?.name?.toString() === selectedYear
//           : true;
//         return yearFilter;
//       })

//   const resetFilters = () => {
//     setSelectedFilters({});
//     fetchStudies(1);
//   };

//   const clearAuthorFilter = () => {
//     setSearchTerm("");
//     setDebouncedSearchTerm("");

//     // Remove author from selectedFilters
//     setSelectedFilters(prev => {
//       const newFilters = { ...prev };
//       delete newFilters.admin_search;
//       return newFilters;
//     });

//     // Clear URL parameter
//     const searchParams = new URLSearchParams(location.search);
//     searchParams.delete('author');
//     navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });

//     // Fetch studies without author filter
//     setPage(1);
//     fetchStudies(1, "");
//   };

//   const AuthorFilterDisplay = () => {
//     const searchParams = new URLSearchParams(location.search);
//     const authorParam = searchParams.get('author');

//     if (!authorParam) return null;

//     return (
//       <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
//         <div className="flex items-center justify-between">
//           <p className="text-sm text-blue-700">
//             <span className="font-medium">Filtering by author:</span> {authorParam}
//           </p>
//           <button
//             onClick={clearAuthorFilter}
//             className="text-blue-600 hover:text-blue-800 text-sm underline"
//           >
//             Clear filter
//           </button>
//         </div>
//       </div>
//     );
//   };
//   return (
//     <div className="bg-white">
//       <div className="max-w-[1200px] mx-auto p-4">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="md:w-1/4">
//             <div className="sticky top-4">
//               <div className="h-0 md:h-[calc(100vh-150px)] lg:h-[calc(100vh-150px)] xl:h-[calc(100vh-150px)] overflow-y-auto">
//                 <FilterSidebar
//                   filters={filters}
//                   onFilterChange={handleFilterChange}
//                   onClearFilters={() => {
//                     setSelectedFilters({});
//                     fetchStudies(1);
//                   }}
//                   selectedFilters={selectedFilters}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Articles Listning */}
//           <div className="flex-1">
//             {/* <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
//             <SearchBar
//               searchTerm={searchTerm}
//               setSearchTerm={setSearchTerm}
//               onSearch={handleSearch}
//             />
//             <AuthorFilterDisplay />
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <p className="text-sm mb-4">Studies Found: {totalArticles}</p>
//               <div className="mb-4">
//                 <label htmlFor="sort-order" className="mr-2 text-sm">
//                   Sort by publication year:
//                 </label>
//                 <select
//                   id="sort-order"
//                   value={sortOrder}
//                   onChange={(e) => setSortOrder(e.target.value)}
//                   className="px-4 py-2 border rounded"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                 </select>
//               </div>
//             </div>

//             {loading && (
//               <div className="flex justify-center my-6">
//                 <Oval
//                   height={50}
//                   width={50}
//                   secondaryColor="#346896"
//                   color="#346896"
//                   visible={true}
//                 />
//               </div>
//             )}

//             {/* <div  className="space-y-4">
//               {filteredStudies?.length > 0 ? (
//                 filteredStudies?.map((study, index) => (
//                   <StudyCard
//                     key={index}
//                     study={study}
//                     onClick={() => handleArticleDetails(study)}
//                   />
//                 ))
//               ) : (
//                 !loading && <NoDataFound resetFilters={resetFilters} />
//               )}
//             </div>

//             {!isSearchActive && !loading && hasMore && (
//               <div  className="flex justify-center mt-6">
//                 <button
//                   onClick={handleLoadMore}
//                   disabled={isLoadingMore}
//                    className="px-6 py-2 bg-[#004C78] text-white rounded hover:bg-[#003355] disabled:opacity-75 flex items-center gap-2"
//                 >
//                   {isLoadingMore ? (
//                     <>
//                       <Oval
//                         height={20}
//                         width={20}
//                         secondaryColor="#fff"
//                         color="#fff"
//                         visible={true}
//                       />
//                       Loading...
//                     </>
//                   ) : (
//                     "Load More"
//                   )}
//                 </button>
//               </div>
//             )} */}
//             <div className="space-y-4">
//               {/* Show NoDataFound only when not loading and no studies */}
//               {!loading && filteredStudies?.length === 0 ? (
//                 <NoDataFound resetFilters={resetFilters} />
//               ) : (
//                 filteredStudies?.map((study, index) => (
//                   <StudyCard
//                     key={index}
//                     study={study}
//                     onClick={() => handleArticleDetails(study)}
//                   />
//                 ))
//               )}
//             </div>

//             {/* Load More Button */}
//             {!isSearchActive &&
//               !loading &&
//               hasMore &&
//               filteredStudies?.length > 0 && (
//                 <div className="flex justify-center mt-6">
//                   <button
//                     onClick={handleLoadMore}
//                     disabled={isLoadingMore}
//                     className="px-6 py-2 bg-[#004C78] text-white rounded hover:bg-[#003355] disabled:opacity-75 flex items-center gap-2"
//                   >
//                     {isLoadingMore ? (
//                       <>
//                         <Oval
//                           height={20}
//                           width={20}
//                           secondaryColor="#fff"
//                           color="#fff"
//                           visible={true}
//                         />
//                         Loading...
//                       </>
//                     ) : (
//                       "Load More"
//                     )}
//                   </button>
//                 </div>
//               )}

//             {!hasMore && studies.length > 0 && (
//               <div className="text-center mt-6 text-gray-500">
//                 All articles loaded
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Articles;


import React, { useCallback, useEffect, useRef, useState } from "react";
import FilterSidebar from "../components/FilterSidebar/FilterSidebar";
import SearchBar from "../components/SearchBar/SearchBar";
import StudyCard from "../components/StudyCard/StudyCard";
import { Oval } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { additionalFilters } from "../utils/constants";
import { transformFilters } from "../utils/helpers";
import { apiHandle } from "../config/apiHandle/apiHandle";
import NoDataFound from "../components/NoDataFound/NoDataFound";
import { MdClose, MdFilterList } from "react-icons/md";
import ContributeStudyCTA from "../components/ContributeStudyCTA/ContributeStudyCTA";

// Session storage key for preserving article list state
const ARTICLES_STATE_KEY = 'articlesListState';

const Articles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Try to restore state from sessionStorage first
  const getSavedState = () => {
    try {
      const saved = sessionStorage.getItem(ARTICLES_STATE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading saved state:', e);
    }
    return null;
  };

  const savedState = getSavedState();
  
  // Get 'search' param from URL on initial load
  const initialSearchTerm = (() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || "";
  })();
  
  // Initialize state - prefer saved state, then URL params, then defaults
  const [isHighlightArticle, setIsHighlightArticle] = useState(savedState?.isHighlightArticle ?? false);
  const [searchTerm, setSearchTerm] = useState(savedState?.searchTerm || initialSearchTerm);
  const [searchTerms, setSearchTerms] = useState(savedState?.searchTerms || (initialSearchTerm ? [initialSearchTerm] : []));
  const [searchLogic, setSearchLogic] = useState(savedState?.searchLogic || "AND");
  const [selectedYear, setSelectedYear] = useState(savedState?.selectedYear || "");
  const [studies, setStudies] = useState(savedState?.studies || []);
  const [loading, setLoading] = useState(savedState ? false : true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState([]);
  const [page, setPage] = useState(savedState?.page || 1);
  const [hasMore, setHasMore] = useState(savedState?.hasMore ?? true);
  const [selectedFilters, setSelectedFilters] = useState(savedState?.selectedFilters || {});
  const [sortOrder, setSortOrder] = useState(savedState?.sortOrder || "newest");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalArticles, setTotalArticles] = useState(savedState?.totalArticles || 0);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(savedState?.searchTerms || []);
  const [isInitialized, setIsInitialized] = useState(!!savedState); // Already initialized if we have saved state
  const [authorSearch, setAuthorSearch] = useState("");

  // Build only the `suboption` payload from selectedFilters.studyTypes
  const buildSuboptionFromStudyTypes = (studyTypesFilter = []) => {
    const suboption = {};

    studyTypesFilter.forEach((item) => {
      // we only care about suboptions: they have parentKey added in FilterSidebar
      if (!item || !item.parentKey) return;

      const parent = item.parentKey;                   // e.g. "in vivo", "ex vivo"
      const subLabel = item.rawValue || item.label;    // e.g. "Animal Study", "Post-treatment"

      if (!parent || !subLabel) return;

      if (!suboption[parent]) {
        suboption[parent] = [];
      }

      if (!suboption[parent].includes(subLabel)) {
        suboption[parent].push(subLabel);
      }
    });

    return suboption;
  };


  // Use ref to track if we've already done initial setup
  const hasInitializedRef = useRef(!!savedState);
  const wasRestoredFromStorageRef = useRef(!!savedState);

  const abortControllerRef = useRef(null);
  const requestIdRef = useRef(0);
  
  // Clear saved state after restoring (so fresh navigation works correctly)
  // useEffect(() => {
  //   if (wasRestoredFromStorageRef.current) {
  //     sessionStorage.removeItem(ARTICLES_STATE_KEY);
  //   }
  // }, []);

  // Helper function to find filter object by name or id
  const findFilterByValue = useCallback((filterType, value) => {
    if (!filters.length || typeof value === 'object') return value;
    
    const filterCategory = filters.find(f => f.name === filterType);
    if (!filterCategory?.options) return value;
    
    // Try to find by name first, then by id
    const filterOption = filterCategory.options.find(option => 
      option.name === value || option.id === value
    );
    
    return filterOption || value;
  }, [filters]);

  useEffect(() => {
    setAuthorSearch("");
  }, [filters]);

  // Transform string filter values to objects when applying filters
  const transformFilterValue = useCallback((filterType, value) => {
    if (Array.isArray(value)) {
      return value.map(v => findFilterByValue(filterType, v));
    }
    return findFilterByValue(filterType, value);
  }, [findFilterByValue]);

  const toggleClinicalResearch = () => {
    setIsHighlightArticle(prev => !prev);
    setPage(1);
  };


  // Enhanced URL parameter parsing - only for initial page load
  useEffect(() => {
    // Skip if we've already initialized (either from storage or from previous URL parse)
    if (hasInitializedRef.current) {
      return;
    }
    
    // Mark as initialized immediately to prevent re-runs
    hasInitializedRef.current = true;
    
    // Skip URL parsing if we restored from sessionStorage
    if (wasRestoredFromStorageRef.current) {
      setIsInitialized(true);
      return;
    }
    
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    
    // Check if we have search data from navigation state (from ArticleDetails)
    const navigationState = location.state;
    if (navigationState && navigationState.fromArticleList) {
      
      // Restore all state from navigation
      const { 
        searchTerms: navSearchTerms = [], 
        searchTerm: navSearchTerm = "",
        searchLogic: navSearchLogic = "AND",
        selectedFilters: navSelectedFilters = {},
        page: navPage = 1,
        sortOrder: navSortOrder = "newest",
        totalArticles: navTotalArticles = 0,
        studies: navStudies = []
      } = navigationState;
      
      // Restore all search and filter state
      setSearchTerms(navSearchTerms);
      setSearchTerm(navSearchTerm);
      setSearchLogic(navSearchLogic);
      setDebouncedSearchTerm(navSearchTerms);
      setSelectedFilters(navSelectedFilters);
      setPage(navPage);
      setSortOrder(navSortOrder);
      setTotalArticles(navTotalArticles);
      setStudies(navStudies);
      setLoading(false);
      
      // Clear the navigation state to prevent it from persisting
      window.history.replaceState({}, '', location.pathname);
      
      return; // Exit early to avoid URL parameter processing
    }
    
    // Get search parameter from URL (for initial load only)
    const searchParam = searchParams.get('search');
    if (searchParam && searchParam.trim()) {
      // Split search param by spaces to handle multiple terms passed as single param
      const terms = searchParam.split(' ').filter(term => term.trim());
      if (terms.length > 0) {
        setSearchTerm(terms[0]); // Set first term as main search term
        setSearchTerms(terms); // Set all terms
        setDebouncedSearchTerm(terms);
        params.admin_search = searchParam;
      }
    }

    // Get logic parameter from URL to preserve search mode (for initial load only)
    const logicParam = searchParams.get('logic');
    if (logicParam && (logicParam === "AND" || logicParam === "OR")) {
      setSearchLogic(logicParam);
    }

    // If no search parameters exist, ensure search state is cleared (only on initial load)
    if (!searchParam) {
      setSearchTerm("");
      setSearchTerms([]);
      setDebouncedSearchTerm([]);
      setSearchLogic("AND"); // Reset to default
    }

    // Map URL parameters to request body fields
    const paramMappings = {
      studyTypes: "studyTypes",
      species: "species",
      researchTopics: "researchTopics",
      organs: "organs",
      year: "year",
      author: "admin_search",
      marker: "marker",
      category: "category",
      authors: "authors",
      countries: "countries",
      systems: "systems",
      administrationMethods: "administrationMethods",
      diseases : "diseases"
    };

    // Iterate through all search parameters
    searchParams.forEach((value, key) => {
      if (paramMappings[key]) {
        const mappedKey = paramMappings[key];
        if (
          [
            "studyTypes",
            "species",
            "researchTopics",
            "organs",
            "marker",
            "category",
            "authors",
            "country",
            "systems",
            "administrationMethods",
            "diseases"
          ].includes(mappedKey)
        ) {
          params[mappedKey] = searchParams.getAll(key);
        } else if (["year", "admin_search"].includes(mappedKey)) {
          params[mappedKey] = value;
        }
      }
    });

    // Update selected filters with parsed params - transform string values to objects
    const transformedParams = {};
    Object.entries(params).forEach(([key, value]) => {
      transformedParams[key] = transformFilterValue(key, value);
    });
    
    setSelectedFilters((prev) => ({
      ...prev,
      ...transformedParams,
    }));

    // Set page to 1 if we have URL parameters to ensure fresh fetch
    if (Object.keys(params).length > 0) {
      setPage(1);
    }
    
    // Mark as initialized after first URL parsing
    setIsInitialized(true);
  }, [location.search, location.state]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      // No need to combine search terms here since we'll send them as array
      setDebouncedSearchTerm(searchTerms.length > 0 ? searchTerms : [searchTerm].filter(Boolean));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, searchTerms, searchLogic]);

  // Memoized fetch function
  const fetchStudies = useCallback(
    async (pageNumber = 1, searchQuery = debouncedSearchTerm) => {
      // Increment request ID for this request before try block
      const currentRequestId = ++requestIdRef.current;
      
      try {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        // Only set loading for first page
        if (pageNumber === 1) {
          setLoading(true);
        } else {
          setIsLoadingMore(true);
        }

        const requestBody = {
          per_page: 20,
          page: pageNumber,
          reqType: "user",
          orderBy: sortOrder === "newest" ? "DESC" : "ASC",
        };

        // Handle search terms - send as array if we have search terms
        if (searchQuery && Array.isArray(searchQuery) && searchQuery.length > 0) {
          requestBody.admin_search = searchQuery;
        } else if (searchQuery && typeof searchQuery === 'string' && searchQuery.trim()) {
          requestBody.admin_search = [searchQuery.trim()];
        }
        
        requestBody.isAnd = searchLogic === "AND";

        // Apply other filters - send IDs instead of names (except for special cases)
        // Apply other filters - send IDs instead of names (except for special cases)
        Object.entries(selectedFilters).forEach(([key, value]) => {
          // Skip otherFilters and boolean fields - they're handled separately
          // Also skip any keys that might be objects (from improper otherFilter handling)
          if (
              key === "otherFilters" ||
              typeof key === "object" ||
              [
                "HighlightArticle",
                "CompMethodAdmin",
                "doseComparison",
                "drugComparison",
                "pharmacokinetics",
                "isERW",
                "safetyofhydrogen",
              ].includes(key)
          )
            return;

          if (Array.isArray(value) && value.length > 0) {
            // 🔹 SPECIAL CASE: studyTypes
            if (key === "studyTypes") {
              // keep ONLY parent items (no parentKey => it's not a suboption)
              const parentIds = value
                  .filter((v) => !(typeof v === "object" && v.parentKey)) // drop suboptions
                  .map((v) => v.id ?? v) // send id or raw value
                  .filter((v) => v != null);

              if (parentIds.length > 0) {
                requestBody[key] = parentIds;
              }
            } else {
              // default behavior for other filters
              const transformedValue = value.map((v) => v.id ?? v);
              if (transformedValue.length > 0) {
                requestBody[key] = transformedValue;
              }
            }
          } else if (value && typeof value === "object") {
            // If value is a single object, send ID for all filters including clinicalTrialDesign
            if (value.id) {
              requestBody[key] = value.id;
            }
          } else if (key === "year") {
            requestBody[key] = Number(value);
          } else if (value) {
            requestBody[key] = value;
          }
        });



        // ✅ Build only `suboption` from studyTypes (don't change existing studyTypes handling)
        if (selectedFilters.studyTypes && Array.isArray(selectedFilters.studyTypes)) {
          const suboption = buildSuboptionFromStudyTypes(selectedFilters.studyTypes);

          if (Object.keys(suboption).length > 0) {
            requestBody.suboption = suboption;
          }
        }

        if (isHighlightArticle) {
          requestBody.isHighlightArticle = true;
        }

        // Handle Other Filters parameters - collect them into an otherFilters array
        const otherFilterMappings = {
          "HighlightArticle": 1,
          "CompMethodAdmin": 2, 
          "doseComparison": 3,
          "drugComparison": 4,
          "pharmacokinetics": 5,
          "isERW": 6,
          "safetyofhydrogen": 7,
        };
        
        // Collect selected other filter IDs
        const selectedOtherFilters = [];
        Object.entries(selectedFilters).forEach(([key, value]) => {
          // Check if this key is an otherFilter field name and it's selected
          if (otherFilterMappings[key] && value === "True") {
            selectedOtherFilters.push(otherFilterMappings[key]);
          }
        });
        
        // Send otherFilters as an array if any are selected
        if (selectedOtherFilters.length > 0) {
          requestBody.otherFilters = selectedOtherFilters;
        }

        const response = await apiHandle.post(
          "final-article-list-main",
          requestBody,
          {
            signal: abortControllerRef.current.signal,
          }
        );

        // Check if this request was superseded by a newer request
        if (currentRequestId !== requestIdRef.current) {
          return; // Don't update state if request was superseded
        }

        // Check if this request was aborted
        if (abortControllerRef.current?.signal.aborted) {
          return; // Don't update state if request was aborted
        }

        if (response.data.articles.length === 0) {
          setHasMore(false);
          // Only clear studies if this is page 1
          if (pageNumber === 1) {
            setStudies([]);
          }
          setTotalArticles(response?.data?.total || 0);
        } else {
          setTotalArticles(response?.data?.total || 0);
          setStudies((prevStudies) => {
            return pageNumber === 1
              ? response.data.articles
              : [...prevStudies, ...response.data.articles];
          });
          setHasMore(response.data.current_page < response.data.last_page);
        }
      } catch (err) {
        // Check if this request was superseded before handling error
        if (currentRequestId !== requestIdRef.current) {
          return; // Don't update state for superseded requests
        }
        
        if (err.name !== "AbortError") {
          setError("Error fetching data");
        }
      } finally {
        // Only update loading state if this is still the latest request
        if (currentRequestId === requestIdRef.current) {
          setLoading(false);
          setIsLoadingMore(false);
        }
        abortControllerRef.current = null;
      }
    },
    [selectedFilters, debouncedSearchTerm, sortOrder, searchLogic, isHighlightArticle]
  );

  // Re-transform filter values when filters data becomes available
  useEffect(() => {
    if (filters.length > 0 && Object.keys(selectedFilters).length > 0) {
      setSelectedFilters(prev => {
        const transformedFilters = {};
        Object.entries(prev).forEach(([key, value]) => {
          if (key === 'admin_search' || key === 'year') {
            transformedFilters[key] = value;
          } else {
            transformedFilters[key] = transformFilterValue(key, value);
          }
        });
        return transformedFilters;
      });
    }
  }, [filters.length, transformFilterValue]);

  // Combined effect for filters and pagination - with better debouncing
  useEffect(() => {
    // Don't fetch if we're not initialized yet or no filters loaded yet
    if (!isInitialized || filters.length === 0) return;

    const timer = setTimeout(() => {
      fetchStudies(page);
    }, 200); // Increased timeout for better debouncing

    return () => {
      clearTimeout(timer);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [page, selectedFilters, fetchStudies, filters.length, isInitialized]);

  // Utility function
  const shallowCompare = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) =>
      Array.isArray(obj1[key])
        ? obj1[key].length === obj2[key]?.length &&
        obj1[key].every((val, i) => val === obj2[key][i])
        : obj1[key] === obj2[key]
    );
  };

  const handleFilterChange = useCallback(
      (filterName, value, checked, type = "checkbox") => {
        setSelectedFilters((prev) => {
          const newFilters = { ...prev };

          // Special handling for Other Filters (boolean filters)
          if (filterName === "otherFilters") {
            // value is the option object, we need option.value which is the mapped field name
            const fieldName = typeof value === "object" ? value.value : value;
            if (checked) {
              newFilters[fieldName] = "True"; // Always store as string "True"
            } else {
              delete newFilters[fieldName]; // Remove when unchecked
            }
            return shallowCompare(prev, newFilters) ? prev : newFilters;
          }

          if (type === "radio") {
            newFilters[filterName] = value;
          } else {
            const current = newFilters[filterName] || [];

            if (checked) {
              // ✅ Prevent duplicates
              const exists = current.some((item) => {
                if (typeof item === "object" && typeof value === "object") {
                  if (item.id != null && value.id != null) {
                    return item.id === value.id;
                  }
                  // For items without id (like suboptions), compare by value
                  return item.value === value.value;
                }
                return item === value;
              });

              newFilters[filterName] = exists ? current : [...current, value];
            } else {
              // ✅ Correct removal logic for both id-based and value-based objects
              const updated = current.filter((item) => {
                if (typeof item === "object" && typeof value === "object") {
                  if (item.id != null && value.id != null) {
                    return item.id !== value.id;
                  }
                  // For suboptions objects (no id), compare by value
                  return item.value !== value.value;
                }
                return item !== value;
              });

              if (updated.length > 0) {
                newFilters[filterName] = updated;
              } else {
                delete newFilters[filterName];
              }
            }
          }

          return shallowCompare(prev, newFilters) ? prev : newFilters;
        });

        setPage(1);
      },
      []
  );


  // Optimized search handler
  const handleSearch = useCallback(() => {
    setPage(1);
    const searchArray = searchTerms.length > 0 ? searchTerms : [searchTerm].filter(Boolean);
    fetchStudies(1, searchArray);
  }, [searchTerm, searchTerms, searchLogic, fetchStudies]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/get-fiters`
        );
        const result = await response.json();

        if (result.status && result.filters) {
          const combinedData = {
            ...result.filters,
            ...additionalFilters,
          };

          const transformedFilters = transformFilters(combinedData);
          setFilters(transformedFilters);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Save current state to sessionStorage before navigating to article details
  const saveStateToStorage = () => {
    const stateToSave = {
      searchTerms,
      searchTerm,
      searchLogic,
      selectedFilters,
      page,
      sortOrder,
      totalArticles,
      studies,
      hasMore,
      selectedYear
    };
    try {
      sessionStorage.setItem(ARTICLES_STATE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  };

  const handleArticleDetails = (items) => {
    // Save state to sessionStorage before navigating
    // saveStateToStorage();
    navigate(`/ArticleDetails/${items.mhid}`);
  };

  // const ARTICLES_STATE_KEY = "articlesListState";

  useEffect(() => {
    // Only save after initial restore is done (avoid overwriting restored state)
    if (!isInitialized) return;

    const stateToSave = {
      isHighlightArticle,
      searchTerms,
      searchTerm,
      searchLogic,
      selectedFilters,
      page,
      sortOrder,
      totalArticles,
      studies,
      hasMore,
      selectedYear,
    };

    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(ARTICLES_STATE_KEY, JSON.stringify(stateToSave));
      } catch (e) {
        console.error("Failed to save session state:", e);
      }
    }, 200); // debounce

    return () => clearTimeout(t);
  }, [
    isInitialized,
    isHighlightArticle,
    searchTerms,
    searchTerm,
    searchLogic,
    selectedFilters,
    page,
    sortOrder,
    totalArticles,
    studies,
    hasMore,
    selectedYear,
  ]);


  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  // Complete clear all functionality
  const clearAllFilters = () => {
    // Clear all state
    setSearchTerm("");
    setSearchTerms([]);
    setDebouncedSearchTerm([]);
    setSelectedFilters({});
    setSelectedYear("");
    setSortOrder("newest");
    setSearchLogic("AND");
    setPage(1);
    setIsHighlightArticle(false);
    
    // Use replaceState to immediately clear URL without navigation
    window.history.replaceState({}, '', location.pathname);
    
    // Fetch fresh data
    fetchStudies(1, []);
  };

  // Clear specific filter functionality
  const clearSpecificFilter = (filterType, filterValue = null) => {
    if (filterType === 'search') {
      if (filterValue) {
        // Remove specific search term
        const newTerms = searchTerms.filter(term => term !== filterValue);
        setSearchTerms(newTerms);
        if (newTerms.length === 0) {
          setSearchTerm("");
          setDebouncedSearchTerm([]);
          setSearchLogic("AND"); // Reset to default when no search terms
        }
      } else {
        // Clear all search terms
        setSearchTerm("");
        setSearchTerms([]);
        setDebouncedSearchTerm([]);
        setSearchLogic("AND"); // Reset to default when clearing all search
      }
      
      setSelectedFilters(prev => {
        const newFilters = { ...prev };
        delete newFilters.admin_search;
        return newFilters;
      });

      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('author');
      searchParams.delete('search');
      searchParams.delete('logic'); // Also remove the logic parameter
      
      // Use replaceState to immediately update URL without triggering navigation
      const newUrl = searchParams.toString() ? 
        `${location.pathname}?${searchParams.toString()}` : 
        location.pathname;
      window.history.replaceState({}, '', newUrl);
      
      const combinedSearchTerm = filterValue 
        ? searchTerms.filter(term => term !== filterValue)
        : [];
      
      // Only fetch with search terms if there are any, otherwise fetch without search
      if (combinedSearchTerm.length > 0) {
        fetchStudies(1, combinedSearchTerm);
      } else {
        fetchStudies(1, []); // Pass empty array which will not add admin_search to request
      }
    } else {
      // Handle otherFilter boolean fields
      const otherFilterFields = [
        "HighlightArticle",
        "CompMethodAdmin", 
        "doseComparison",
        "drugComparison",
        "pharmacokinetics",
        "isERW",
        "safetyofhydrogen",
      ];
      
      if (otherFilterFields.includes(filterType)) {
        // For otherFilter boolean fields, just delete the field
        setSelectedFilters(prev => {
          const newFilters = { ...prev };
          delete newFilters[filterType];
          return newFilters;
        });
      } else {
        // Handle regular filters
        setSelectedFilters(prev => {
          const newFilters = { ...prev };
          
          if (filterValue) {
            // Remove specific value from array filter
            if (Array.isArray(newFilters[filterType])) {
              newFilters[filterType] = newFilters[filterType].filter(item => {
                // Compare by id if both are objects, otherwise compare directly
                if (typeof item === 'object' && typeof filterValue === 'object') {
                  return item.id !== filterValue.id;
                }
                return item !== filterValue;
              });
              if (newFilters[filterType].length === 0) {
                delete newFilters[filterType];
              }
            }
          } else {
            // Remove entire filter
            delete newFilters[filterType];
          }
          
          return newFilters;
        });
      }
      
      setPage(1);
    }
  };

  // Get active filters for display
  const getActiveFilters = () => {
    const activeFilters = [];
    
    // Check for search terms (directly from state, not URL)
    searchTerms.forEach((term, index) => {
      activeFilters.push({
        type: 'search',
        label: `Search Term ${index + 1}`,
        value: term,
        key: `search-${index}`
      });
    });

    // Mapping for otherFilter field names to display names
    const otherFilterDisplayNames = {
      "HighlightArticle": "Highlighted Articles",
      "CompMethodAdmin": "Methods of Administration Compared",
      "doseComparison": "Dose/Concentration Compared",
      "drugComparison": "Drug/Therapy/Supplement Compared",
      "pharmacokinetics": "Pharmacokinetics Discussed",
      "isERW": "ERW Discussed",
      "safetyofhydrogen": "H2 Safety Discussed",
    };

    // Check for other filters
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (key === 'admin_search') return; // Skip search filters, handled above
      
      // Handle otherFilter boolean fields
      if (otherFilterDisplayNames[key] && value === "True") {
        activeFilters.push({
          type: key,
          label: "Other Filter",
          value: otherFilterDisplayNames[key],
          actualValue: value,
          key: `${key}-true`
        });
        return;
      }
      
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(item => {
          // Handle both object and string cases properly
          let displayValue, itemId;
          if (typeof item === 'object' && item !== null) {
            // If it's an object with label and value properties (new format)
            if (item.label && item.value !== undefined) {
              displayValue = item.label;
              itemId = item.id || item.value;
            } else if (item.name) {
              // If it's an object with name property (old format)
              displayValue = item.name;
              itemId = item.id || item.name;
            } else {
              // Fallback to string representation
              displayValue = String(item);
              itemId = item.id || String(item);
            }
          } else {
            // It's a string or primitive
            displayValue = String(item);
            itemId = String(item);
          }
          
          activeFilters.push({
            type: key,
            label: key.charAt(0).toUpperCase() + key.slice(1),
            value: displayValue,
            actualValue: item, // Keep the actual object for removal
            key: `${key}-${itemId}`
          });
        });
      } else if (value && !Array.isArray(value) && !otherFilterDisplayNames[key]) {
        // Handle both object and string cases properly for single values (but not otherFilter booleans)
        let displayValue, valueId;
        if (typeof value === 'object' && value !== null) {
          // If it's an object with label and value properties (new format)
          if (value.label && value.value !== undefined) {
            displayValue = value.label;
            valueId = value.id || value.value;
          } else if (value.name) {
            // If it's an object with name property (old format)
            displayValue = value.name;
            valueId = value.id || value.name;
          } else {
            // Fallback to string representation
            displayValue = String(value);
            valueId = value.id || String(value);
          }
        } else {
          // It's a string or primitive
          displayValue = String(value);
          valueId = String(value);
        }
        
        activeFilters.push({
          type: key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          value: displayValue,
          actualValue: value, // Keep the actual object for removal
          key: `${key}-${valueId}`
        });
      }
    });

    return activeFilters;
  };

  const filteredStudies = isSearchActive
    ? searchResults
    : studies.filter((study) => {
        const yearFilter = selectedYear
          ? study.publicData.year?.name?.toString() === selectedYear
          : true;
        return yearFilter;
      });

  const resetFilters = () => {
    clearAllFilters();
  };

  const activeFilters = getActiveFilters();

  // Active Filters Display Component
  const ActiveFiltersDisplay = () => {
    if (activeFilters.length === 0) return null;

    const searchFilters = activeFilters.filter(filter => filter.type === 'search');
    const otherFilters = activeFilters.filter(filter => filter.type !== 'search');

    return (
      <div className="mb-4 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-gray-50 border border-blue-200 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div className="flex items-center flex-wrap gap-2">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <MdFilterList className="w-4 h-4 mr-2" />
              Active Filters ({activeFilters.length})
            </h3>
            {/* Global Search Mode Indicator */}
            {activeFilters.length > 0 && (
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-md bg-primary text-white shadow-sm">
                {searchLogic === "OR" ? "Any Match" : "All Match"}
              </span>
            )}
          </div>
          <button
            onClick={clearAllFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm font-medium flex items-center transition-all px-3 py-1.5 rounded-md self-start sm:self-auto"
          >
            <MdClose className="w-4 h-4 mr-1" />
            Clear All
          </button>
        </div>
        
        {/* Search Mode Explanation */}
        {activeFilters.length > 0 && (
          <div className="mb-3 p-2.5 rounded-md text-xs bg-white text-gray-700 border border-blue-200 shadow-sm">
            <span className="font-semibold text-primary">
              {searchLogic === "OR" ? "Any Match Mode:" : "All Match Mode:"}
            </span>{' '}
            {searchLogic === "OR" 
              ? "Showing articles that match any of your search criteria"
              : "Showing only articles that match all of your search criteria"
            }
          </div>
        )}
        
        {/* Search Terms */}
        {searchFilters.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs text-gray-600 mr-2 font-medium">Search Terms:</span>
              {searchFilters.map((filter, index) => (
                <div key={filter.key} className="flex items-center">
                  <div className="flex items-center border rounded-full px-3 py-1.5 bg-white border-blue-200">
                    <span className="mr-2 text-xs font-medium text-primary">
                      {filter.value}
                    </span>
                    <button
                      onClick={() => clearSpecificFilter(filter.type, filter.actualValue || filter.value)}
                      className="text-primary hover:text-red-600 transition-colors"
                      title="Remove search term"
                    >
                      <MdClose className="w-3 h-3" />
                    </button>
                  </div>
                  {index < searchFilters.length - 1 && (
                    <span className="mx-2 px-2 py-1 text-xs rounded font-bold bg-blue-100 text-primary">
                      {searchLogic === "OR" ? "or" : "and"}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Other Filters */}
        {otherFilters.length > 0 && (
          <div>
            <span className="text-xs text-gray-600 mr-2 font-medium">Selected Filters:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {otherFilters.map((filter) => (
                <div
                  key={filter.key}
                  className="flex items-center bg-white border border-blue-200 rounded-full px-3 py-1.5"
                >
                  <span className="text-primary mr-2 text-xs font-medium">
                    {filter.value}
                  </span>
                  <button
                    onClick={() => clearSpecificFilter(filter.type, filter.actualValue || filter.value)}
                    className="text-primary hover:text-red-600 transition-colors"
                    title="Remove filter"
                  >
                    <MdClose className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div className="max-w-[1200px] mx-auto p-2 sm:p-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="w-full lg:w-1/4">
            <div className="lg:sticky lg:top-4">
              <div className="max-h-[600px] sm:max-h-[700px] lg:h-[calc(100vh-150px)] overflow-y-auto">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearAllFilters}
                  selectedFilters={selectedFilters}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="mb-4">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
                searchTerms={searchTerms}
                setSearchTerms={setSearchTerms}
                searchLogic={searchLogic}
                setSearchLogic={setSearchLogic}
              />
            </div>
            
            <ActiveFiltersDisplay />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <p className="text-sm font-medium">
                Studies Found: <span className="text-primary font-bold">{totalArticles}</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch sm:items-center">

                <button
                    type="button"
                    onClick={toggleClinicalResearch}
                    className={`px-4 py-2 text-sm rounded border transition w-full sm:w-auto
        ${isHighlightArticle
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-primary border-blue-200 hover:bg-blue-50"
                    }`}
                >
                  Highlighted Article
                </button>

                <select
                    id="sort-order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-3 py-2 text-sm border rounded w-full sm:w-auto"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>


            {loading && (
              <div className="flex justify-center my-6">
                <Oval
                  height={50}
                  width={50}
                  secondaryColor="#346896"
                  color="#346896"
                  visible={true}
                />
              </div>
            )}

            <div className="space-y-4">
              {!loading && filteredStudies?.length === 0 ? (
                <NoDataFound resetFilters={resetFilters} />
              ) : (
                filteredStudies?.map((study, index) => (
                  <StudyCard
                    key={index}
                    study={study}
                    onClick={() => handleArticleDetails(study)}
                  />
                ))
              )}
            </div>

            {!isSearchActive &&
              !loading &&
              hasMore &&
              filteredStudies?.length > 0 && (
                <div className="flex justify-center mt-6 mb-4">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="w-full sm:w-auto px-6 py-3 bg-[#004C78] text-white rounded hover:bg-[#003355] disabled:opacity-75 flex items-center justify-center gap-2 transition-colors"
                  >
                    {isLoadingMore ? (
                      <>
                        <Oval
                          height={20}
                          width={20}
                          secondaryColor="#fff"
                          color="#fff"
                          visible={true}
                        />
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </button>
                </div>
              )}

            {!hasMore && studies.length > 0 && (
              <div className="text-center mt-6 mb-4 text-gray-500 text-sm">
                All articles loaded
              </div>
            )}

          {/* Contribute CTA */}
          <ContributeStudyCTA />
          </div>
          {/* add a button contribute by adding the study */}
     
        
         
        </div>
      </div>
    </div>
  );
};

export default Articles;