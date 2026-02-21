// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// const Search = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const [filteredArticles, setFilteredArticles] = useState([]);
  // const navigate = useNavigate();
  // const dropdownRef = useRef(null);

  // useEffect(() => {
  //   if (searchQuery.length < 3) {
  //     setFilteredArticles([]);
  //     return;
  //   }

  //   const fetchArticles = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const response = await fetch(
  //         `https://h2research.org/backend/public/api/get-title?title=${searchQuery}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch articles");
  //       }
  //       const data = await response.json();
  //       setArticles(data?.data || []); // Store the fetched articles
  //     } catch (err) {
  //       setError("No articles found");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchArticles();
  // }, [searchQuery]);

  // const handleSearch = (event) => {
  //   const query = event.target.value;
  //   setSearchQuery(query);
  // };

  // useEffect(() => {
  //   if (searchQuery.length >= 3 && articles?.length > 0) {
  //     const filtered = articles.filter((article) =>
  //       article.title?.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //     setFilteredArticles(filtered);
  //   } else {
  //     setFilteredArticles([]);
  //   }
  // }, [searchQuery, articles]);

  // // Close dropdown on outside click
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setFilteredArticles([]);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

//   return (
//     <div  className="relative max-w-[1100px] mx-auto">
//       <div  className="h-14 lg:h-16 rounded-full bg-white flex items-center px-4 mt-10 shadow-md ">
//         <input
//           type="search"
//            className="w-full outline-none border-none text-gray-700 text-base lg:text-lg"
//           placeholder="Search any article..."
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

      // {(filteredArticles.length > 0 || (error && searchQuery.length >= 3)) && (
      //    <div
      //     ref={dropdownRef}
      //      className="search-results absolute w-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-50 border border-gray-100  overflow-y-auto"
      //     style={{ maxHeight: '350px' }}
      //   >
      //     <div  className="sticky top-0 bg-gray-50 py-2 px-4 border-b border-gray-100 flex justify-between items-center">
      //       <span  className="text-sm font-medium text-gray-500">
      //         Search Results ({filteredArticles.length})
      //       </span>
      //     </div>
      //     <ul  className="p-0 m-0">
      //       {filteredArticles.length > 0 ? (
      //         filteredArticles.map((article, index) => {
      //           return <li
      //           key={index}
      //            className="py-3 px-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
      //           onClick={() => navigate(`/ArticleDetails/${article.mhid}`)}
      //         >
      //           <div  className="flex items-start">
      //             <div  className="flex-shrink-0 w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary mr-3">
      //               <svg 
      //                  className="w-4 h-4" 
      //                 fill="none" 
      //                 stroke="currentColor" 
      //                 viewBox="0 0 24 24" 
      //                 xmlns="http://www.w3.org/2000/svg"
      //               >
      //                 <path 
      //                   strokeLinecap="round" 
      //                   strokeLinejoin="round" 
      //                   strokeWidth="2" 
      //                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      //                 />
      //               </svg>
      //             </div>
      //             <div>
      //               <p  className="text-sm font-medium text-gray-800">
      //                 {article.title?.name}
      //               </p>
      //             </div>
      //           </div>
      //         </li>
      //         })
      //       ) : (
      //         <li  className="py-2 px-4 text-sm text-gray-500 text-center">
      //           No articles found
      //         </li>
      //       )}
      //     </ul>
      //   </div>
      // )}
//                  {/* <li
//                   key={index}
//                    className="py-2 px-4 text-sm cursor-pointer border-b border-gray-200 hover:bg-primary hover:text-white"
//                   onClick={() => navigate(`/ArticleDetails/${article.mhid}`)}
//                 >
//                   {article.title?.name}
//                 </li> */}

//       {/* Render "Search" and "View All Articles" buttons */}
    //   <div  className="flex justify-center items-center gap-4 mt-6">
    //     <ul  className="flex justify-center items-center gap-3 p-0">
    //       <li  className="inline-flex py-3 px-6 justify-center gap-2 rounded-[100px] border border-primary bg-primary text-white hover:text-primary hover:bg-transparent cursor-pointer">
    //         Search
    //       </li>
    //       <li
    //         onClick={() => navigate("explore-data")}
    //          className="flex py-3 px-6 justify-center items-center gap-2 border border-primary rounded-[100px] text-primary text-center font-extrabold no-underline hover:text-white hover:bg-primary cursor-pointer"
    //       >
    //        Explore Data
    //       </li>
    //     </ul>
    //   </div>
    // </div>
//   );
// };

// export default Search;



import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length < 3) {
      setFilteredArticles([]);
      return;
    }

    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/get-title?title=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data?.data || []); // Store the fetched articles
      } catch (err) {
        setError("No articles found");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchQuery]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery.length >= 3 && articles?.length > 0) {
      const filtered = articles.filter((article) =>
        article.title?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles([]);
    }
  }, [searchQuery, articles]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredArticles([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

   const handleSearchSubmit = () => {
    if (searchQuery.length >= 3) {
      // Navigate to articles page with search query as URL param
      navigate(`/articles?author=${encodeURIComponent(searchQuery)}`);
    }
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };


  return (
    <div className="relative max-w-4xl mx-auto p-4">
      <div className="h-14 lg:h-16 rounded-full bg-white flex items-center px-4 mt-10 shadow-md border">
        <input
          type="search"
          className="w-full outline-none border-none text-gray-700 text-base lg:text-lg pr-4"
          placeholder="Search any article..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSearchSubmit}
          className="flex-shrink-0 w-10 h-10 bg-primary hover:bg-primary rounded-full flex items-center justify-center text-white transition-colors duration-200 ml-2"
          aria-label="Search"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {(filteredArticles.length > 0 || (error && searchQuery.length >= 3)) && (
         <div
          ref={dropdownRef}
           className="search-results absolute max-w-full md:max-w-[96%] mx-auto  mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-50 border border-gray-100  overflow-y-auto"
          style={{ maxHeight: '350px' }}
        >
          <div  className="sticky top-0 bg-gray-50 py-2 px-4 border-b border-gray-100 flex justify-between items-center">
            <span  className="text-sm font-medium text-gray-500">
              Search Results ({filteredArticles.length})
            </span>
          </div>
          <ul  className="p-0 m-0">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => {
                return <li
                key={index}
                 className="py-3 px-4 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
                onClick={() => navigate(`/ArticleDetails/${article.mhid}`)}
              >
                <div  className="flex items-start">
                  <div  className="flex-shrink-0 w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary mr-3">
                    <svg 
                       className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p  className="text-sm font-medium text-gray-800">
                      {article.title?.name}
                    </p>
                  </div>
                </div>
              </li>
              })
            ) : (
              <li  className="py-2 px-4 text-sm text-gray-500 text-center w-full">
                No articles found
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Render "Filter" and "Explore Data" buttons */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <ul className="flex justify-center items-center gap-3 p-0">
          <li 
            onClick={()=> navigate("articles")}
            className="inline-flex py-3 px-6 justify-center items-center gap-2 rounded-full border border-primary bg-primary text-white hover:text-primary hover:bg-transparent cursor-pointer transition-colors duration-200"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </li>
          <li
            onClick={() => navigate("explore-data")}
            className="flex py-3 px-6 justify-center items-center gap-2 border border-primary rounded-full text-primary text-center font-bold hover:text-white hover:bg-primary cursor-pointer transition-colors duration-200"
          >
            Explore Data
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Search;