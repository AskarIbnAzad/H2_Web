import React, { useState, useRef, useEffect } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { MdSwapHoriz } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch, placeholder, searchTerms = [], setSearchTerms, searchLogic = "OR", setSearchLogic, showToggle = true, onSearchWithTerms }) => {
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim()) {
        addSearchTerm();
      } else if (searchTerms.length > 0) {
        onSearch();
      }
    }
  };

  useEffect(() => {
    if (!searchTerms.length) {
      setCurrentInput(searchTerm || "");
    } else {
      setCurrentInput("");
    }
  }, [searchTerm, searchTerms.length]);

  const addSearchTerm = () => {
    const trimmedInput = currentInput.trim();
    if (trimmedInput && !searchTerms.includes(trimmedInput)) {
      const newTerms = [...searchTerms, trimmedInput];
      setSearchTerms(newTerms);
      setCurrentInput("");

      // If we have a callback that accepts the new terms, use it
      if (onSearchWithTerms) {
        setTimeout(() => onSearchWithTerms(newTerms), 50);
      } else {
        // Auto-trigger search when a new term is added
        setTimeout(() => onSearch(), 100);
      }
    }
  };

  const removeSearchTerm = (termToRemove) => {
    const newTerms = searchTerms.filter(term => term !== termToRemove);
    setSearchTerms(newTerms);
    // Auto-trigger search when a term is removed
    setTimeout(() => onSearch(), 100);
  };

  const handleSearchClick = () => {
    if (currentInput.trim()) {
      // If there's current input, add it as a term and then search
      addSearchTerm();
    } else if (searchTerms.length > 0) {
      // If no current input but we have search terms, search with those
      onSearch();
    } else {
      // No current input and no search terms, just call onSearch (will navigate to articles page)
      onSearch();
    }
  };

  const toggleSearchLogic = () => {
    const newLogic = searchLogic === "OR" ? "AND" : "OR";
    setSearchLogic(newLogic);
    // Auto-trigger search when logic changes
    setTimeout(() => onSearch(), 100);
  };

  const handleModeChange = (newMode) => {
    setSearchLogic(newMode);
    // Auto-trigger search when logic changes
    setTimeout(() => onSearch(), 100);
  };

  return (
      <div className="mb-4">
        {/* Global Search Logic Toggle - Only show when showToggle is true */}
        {showToggle && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Search Mode:</span>

                {/* Toggle Button Group showing both options */}
                <div className="flex items-center bg-gray-100 rounded-full p-0.5 sm:p-1 border w-full sm:w-auto">
                  <button
                      onClick={() => handleModeChange("OR")}
                      className={`flex items-center justify-center flex-1 sm:flex-initial px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                          searchLogic === "OR"
                              ? "bg-primary text-white shadow-sm"
                              : "text-gray-700 hover:bg-gray-50"
                      }`}
                      title="Match Any Term: Find articles containing any of your search terms"
                  >
                    <MdSwapHoriz className="w-3 h-3 mr-0.5 sm:mr-1" />
                    Match Any Term
                    {searchLogic === "OR" && <span className="ml-0.5 sm:ml-1 text-[10px] sm:text-xs hidden sm:inline">(Active)</span>}
                  </button>

                  <button
                      onClick={() => handleModeChange("AND")}
                      className={`flex items-center justify-center flex-1 sm:flex-initial px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                          searchLogic === "AND"
                              ? "bg-primary text-white shadow-sm"
                              : "text-gray-700 hover:bg-gray-50"
                      }`}
                      title="Match All Terms: Find articles containing all of your search terms"
                  >
                    <MdSwapHoriz className="w-3 h-3 mr-0.5 sm:mr-1" />
                    Match All Terms
                    {searchLogic === "AND" && <span className="ml-0.5 sm:ml-1 text-[10px] sm:text-xs hidden sm:inline">(Active)</span>}
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-500 max-w-xs sm:text-right hidden sm:block">
                {searchLogic === "OR"
                    ? "More results • Finds articles with any of your terms"
                    : "Fewer, focused results • Finds articles with all your terms"
                }
              </div>
            </div>
        )}

        <div className="flex items-center border-2 rounded-full p-2 focus-within:border-primary transition-colors">
          <IoIosSearch size={30} className="text-[#132B38] mr-2 ml-2 flex-shrink-0" />

          {/* Search Terms Display */}
          <div className="flex items-center flex-wrap gap-1 mr-2">
            {searchTerms.map((term, index) => (
                <div key={index} className="flex items-center">
              <span className="px-2 py-1 rounded-full text-sm flex items-center bg-blue-50 text-primary">
                {term}
                <button
                    onClick={() => removeSearchTerm(term)}
                    className="ml-1 hover:text-red-600 transition-colors text-primary"
                >
                  <IoMdClose size={14} />
                </button>
              </span>
                  {index < searchTerms.length - 1 && (
                      <span className="mx-1 px-1 py-0.5 text-xs font-bold rounded bg-blue-100 text-primary">
                  {searchLogic === "OR" ? "or" : "and"}
                </span>
                  )}
                </div>
            ))}
          </div>

          <input
              ref={inputRef}
              type="text"
              placeholder={
                searchTerms.length > 0
                    ? "Add another search term..."
                    : (placeholder || "Search articles...")
              }
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-2 border-none outline-none min-w-0"
          />


          <button
              onClick={handleSearchClick}
              className="px-3 sm:px-4 py-2 bg-[#004C78] text-white rounded-full hover:bg-[#003355] ml-2 text-sm sm:text-base flex-shrink-0 transition-colors"
          >
          <span className="hidden xs:inline">
            {currentInput.trim() ? "Add Term" : "Search"}
          </span>
            <span className="xs:hidden">
            {currentInput.trim() ? "+" : "Go"}
          </span>
          </button>
        </div>

        {/* Help Text */}
        {searchTerms.length > 0 && (
            <div className="mt-2 text-xs text-gray-600 flex items-center justify-between">
          <span>
            Searching with {searchTerms.length} term{searchTerms.length > 1 ? 's' : ''} using {' '}
            <span className="font-semibold text-primary">
              {searchLogic === "OR" ? "Match Any Term" : "Match All Terms"}
            </span> mode
          </span>
              <span className="text-gray-400">
            Press Enter to add • Click terms to remove
          </span>
            </div>
        )}
      </div>
  );
};

export default SearchBar;