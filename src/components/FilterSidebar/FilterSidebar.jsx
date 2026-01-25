import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./filter.css";

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  selectedFilters,
}) => {


  //console filters in json format as a string
  // console.log(JSON.stringify(filters, null, 2));

  const navigate = useNavigate();
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterToggle = (filterName) => {
    setExpandedFilter((prev) => (prev === filterName ? null : filterName));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSelectAll = (filterName) => {
    const filterGroup = filters.find((f) => f.name === filterName);
    if (!filterGroup) return;

    const currentValues = selectedFilters[filterName] || [];
    const allOptions = filterGroup.options;

    if (currentValues.length === allOptions.length) {
      allOptions.forEach((option) => {
        onFilterChange(filterName, option, false);
      });
    } else {
      allOptions.forEach((option) => {
        onFilterChange(filterName, option, true);
      });
    }
  };

  const isInVivoSelected = () => {
    return selectedFilters.studyType?.includes("in Vivo") || false;
  };

  const renderStudyTypeOptions = (filter) => {
    if (!filter || filter.name !== "studyType") return null;

    const inVivoSubOptions = [
      { label: "Animal Study", value: "Animal Study" },
      { label: "Human Study", value: "Human Study" },
    ];

    const filteredOptions = filter.options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedOptions = [];

    filteredOptions.forEach((option) => {
      if (option.value !== "Animal Study" && option.value !== "Human Study") {
        groupedOptions.push({
          ...option,
          isSubOption: false,
        });
      }
    });

    return (
      <ul
         className={`mt-4 flex flex-wrap gap-4 transition-all duration-300 ease-in-out overflow-hidden ${
          expandedFilter === filter.name
            ? "max-h-full opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {groupedOptions.map((option, idx) => {
          const isInVivo = option.value === "in Vivo";
          return (
            <React.Fragment key={idx}>
              <li  className="flex items-center mb-2 w-full">
                <input
                  type="checkbox"
                  id={`${filter.name}-${idx}`}
                   className="mr-1"
                  checked={
                    selectedFilters[filter.name]?.some(item => 
                      typeof item === 'object' ? item.id === option.id : item === option.value
                    ) || false
                  }
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isInVivo) {
                      // Toggle in Vivo and its sub-options together
                      onFilterChange(filter.name, option, isChecked);
                      inVivoSubOptions.forEach((subOption) => {
                        onFilterChange(
                          filter.name,
                          subOption,
                          isChecked
                        );
                      });
                    } else {
                      onFilterChange(filter.name, option, isChecked);
                    }
                  }}
                />
                <label htmlFor={`${filter.name}-${idx}`}  className="text-xs capitalize">
                  {option.label}
                </label>
              </li>

              {isInVivo && (
                <>
                  {inVivoSubOptions.map((subOption, subIdx) => (
                    <li
                      key={`sub-${subIdx}`}
                       className="flex items-center mb-2 w-full"
                    >
                      <input
                        type="checkbox"
                        id={`${filter.name}-sub-${subIdx}`}
                         className="mr-1"
                        checked={
                          selectedFilters[filter.name]?.some(item => 
                            typeof item === 'object' ? item.id === subOption.id : item === subOption.value
                          ) || false
                        }
                        onChange={(e) => {
                          onFilterChange(
                            filter.name,
                            subOption,
                            e.target.checked
                          );
                        }}
                      />
                      <label
                        htmlFor={`${filter.name}-sub-${subIdx}`}
                         className="text-xs capitalize"
                      >
                        {subOption.label}
                      </label>
                    </li>
                  ))}
                </>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    );
  };

  // Expanded state for each species node (by unique key)
  const [expandedSpecies, setExpandedSpecies] = useState({});
  // Expanded state for each disease node (by unique key)
  const [expandedDiseases, setExpandedDiseases] = useState({});

  // Helper to toggle expanded state for a node
  const handleSpeciesExpand = (key) => {
    setExpandedSpecies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to toggle expanded state for disease nodes
  const handleDiseaseExpand = (key) => {
    setExpandedDiseases((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Recursive renderer for deeply nested diseases
  const renderDiseaseOptions = (options, parentKey = "", level = 0) => {
    return (
      <ul className="mt-4 flex flex-wrap gap-4 transition-all duration-300 ease-in-out overflow-hidden max-h-full opacity-100">
        {options.map((option) => {
          const hasChildren = option.children && option.children.length > 0;
          const uniqueKey = `${parentKey}${option.value}`;

          // Only show options matching the search term or with matching descendants
          const matchesSearch = option.label.toLowerCase().includes(searchTerm.toLowerCase());
          let childMatches = false;
          if (hasChildren) {
            childMatches = option.children.some(child => {
              if (child.label && child.label.toLowerCase().includes(searchTerm.toLowerCase())) return true;
              if (child.children && child.children.length > 0) {
                // Recursively check descendants
                return JSON.stringify(child).toLowerCase().includes(searchTerm.toLowerCase());
              }
              return false;
            });
          }
          if (searchTerm && !matchesSearch && !childMatches) return null;

          const isChecked = selectedFilters.disease?.some(item => 
            typeof item === 'object' ? item.id === option.id : item === option.value
          ) || false;

          return (
            <li key={uniqueKey} className={`mb-2 flex w-full justify-start flex-col${hasChildren && expandedDiseases[uniqueKey] ? ' border-l-4 border-[#004C78]' : ''}`} style={{ marginLeft: `${level * 24}px` }}>
              <div className="flex items-center justify-between cursor-pointer text-lg font-semibold text-gray-700">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`disease-${uniqueKey}`}
                    className="mr-1"
                    checked={isChecked}
                    onChange={(e) => onFilterChange("disease", option, e.target.checked)}
                  />
                  <label htmlFor={`disease-${uniqueKey}`} className="text-xs capitalize cursor-pointer select-none">
                    {option.label}
                  </label>
                </div>
                {hasChildren && (
                  <div className="flex items-center" onClick={() => handleDiseaseExpand(uniqueKey)}>
                    {expandedDiseases[uniqueKey] ? (
                      <FaChevronDown size={12} className="text-[#004C78]" />
                    ) : (
                      <FaChevronRight size={12} className="text-[#004C78]" />
                    )}
                  </div>
                )}
              </div>
              {hasChildren && expandedDiseases[uniqueKey] && (
                renderDiseaseOptions(option.children, uniqueKey + "-", level + 1)
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  // Recursive renderer for deeply nested species
  const renderSpeciesOptions = (options, parentKey = "", level = 0) => {
    return (
      <ul className="mt-4 flex flex-wrap gap-4 transition-all duration-300 ease-in-out overflow-hidden max-h-full opacity-100">
        {options.map((option) => {
          const hasChildren = option.children && option.children.length > 0;
          const uniqueKey = `${parentKey}${option.value}`;

          // Only show options matching the search term or with matching descendants
          const matchesSearch = option.label.toLowerCase().includes(searchTerm.toLowerCase());
          let childMatches = false;
          if (hasChildren) {
            childMatches = option.children.some(child => {
              if (child.label && child.label.toLowerCase().includes(searchTerm.toLowerCase())) return true;
              if (child.children && child.children.length > 0) {
                // Recursively check descendants
                return JSON.stringify(child).toLowerCase().includes(searchTerm.toLowerCase());
              }
              return false;
            });
          }
          if (searchTerm && !matchesSearch && !childMatches) return null;

          const isChecked = selectedFilters.species?.some(item => 
            typeof item === 'object' ? item.id === option.id : item === option.value
          ) || false;

          return (
            <li key={uniqueKey} className={`mb-2 flex w-full justify-start flex-col${hasChildren && expandedSpecies[uniqueKey] ? ' border-l-4 border-[#004C78]' : ''}`} style={{ marginLeft: `${level * 24}px` }}>
              <div className="flex items-center justify-between cursor-pointer text-lg font-semibold text-gray-700">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`species-${uniqueKey}`}
                    className="mr-1"
                    checked={isChecked}
                    onChange={(e) => onFilterChange("species", option, e.target.checked)}
                  />
                  <label htmlFor={`species-${uniqueKey}`} className="text-xs capitalize cursor-pointer select-none">
                    {option.label}
                  </label>
                </div>
                {hasChildren && (
                  <div className="flex items-center" onClick={() => handleSpeciesExpand(uniqueKey)}>
                    {expandedSpecies[uniqueKey] ? (
                      <FaChevronDown size={12} className="text-[#004C78]" />
                    ) : (
                      <FaChevronRight size={12} className="text-[#004C78]" />
                    )}
                  </div>
                )}
              </div>
              {hasChildren && expandedSpecies[uniqueKey] && (
                renderSpeciesOptions(option.children, uniqueKey + "-", level + 1)
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderFilterOptions = (filter) => {
    if (filter.name === "studyType") {
      return renderStudyTypeOptions(filter);
    }
    if (filter.name === "species") {
      return (
        <div className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${
          expandedFilter === filter.name ? "max-h-full opacity-100" : "max-h-0 opacity-0"
        }`}>
          {renderSpeciesOptions(filter.options)}
        </div>
      );
    }
    if (filter.name === "disease") {
      return (
        <div className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${
          expandedFilter === filter.name ? "max-h-full opacity-100" : "max-h-0 opacity-0"
        }`}>
          {renderDiseaseOptions(filter.options)}
        </div>
      );
    }

    const optionsToRender = filter?.options?.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <ul
         className={`mt-4 flex flex-wrap gap-4 transition-all duration-300 ease-in-out overflow-hidden ${
          expandedFilter === filter.name
            ? "max-h-full opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        {optionsToRender?.map((option, idx) => (
          <li key={idx}  className="flex items-center mb-2 w-full">
            {filter.type === "radio" ? (
              <>
                <input
                  type="radio"
                  id={`${filter.name}-${idx}`}
                  name={filter.name}
                   className="mr-1"
                  checked={
                    typeof selectedFilters[filter.name] === 'object' && selectedFilters[filter.name]?.id 
                      ? selectedFilters[filter.name].id === option.id
                      : selectedFilters[filter.name] === option.value
                  }
                  onChange={() => onFilterChange(filter.name, option, true, "radio")}
                />
                <label htmlFor={`${filter.name}-${idx}`}  className="text-xs capitalize">
                  {option.label}
                </label>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  id={`${filter.name}-${idx}`}
                   className="mr-1"
                  checked={
                    filter.name === "otherFilters"
                      ? selectedFilters[option.value] === "True"
                      : selectedFilters[filter.name]?.some(item => 
                          typeof item === 'object' ? item.id === option.id : item === option.value
                        ) || false
                  }
                  onChange={(e) => onFilterChange(filter.name, option, e.target.checked)}
                />
                <label htmlFor={`${filter.name}-${idx}`}  className="text-xs capitalize">
                  {option.label}
                </label>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <div  className="mb-4 filter_button lg:hidden">
        <button
          onClick={toggleFilterSidebar}
           className="flex items-center text-xs text-[#004C78] border p-2 rounded-md"
        >
          <FaFilter size={16}  className="mr-2" />
          Filter
        </button>
      </div>

      <div  className="hidden lg:block bg-white p-6 max-w-xs">
        <div  className="flex justify-between items-center mb-4">
          <h3  className="text-md font-semibold text-gray-800">Filters</h3>
          <button
             className="text-xs text-[#8D8D8D] hover:underline"
            onClick={onClearFilters}
          >
            Clear all
          </button>
        </div>
        <hr  className="mb-4" />
        <div  className="mb-4">
          {filters.map((filter, index) => (
            <div key={index}  className="mb-1">
              <div
                 className="flex items-center justify-between cursor-pointer text-lg font-semibold text-gray-700"
                onClick={() => handleFilterToggle(filter.name)}
              >
                <span  className="text-[#004C78] text-xs">
                  {filter.PreviewName === "Author Country"
                    ? "Country"
                    : filter.PreviewName}
                </span>
                <div  className="flex items-center">
                  {filter.name === "clinicalTrialDesign" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectAll("clinicalTrialDesign");
                      }}
                       className="text-xs text-blue-500 mr-2 hover:underline"
                    >
                      {selectedFilters.clinicalTrialDesign?.length ===
                      filters.find((f) => f.name === "clinicalTrialDesign")
                        ?.options?.length
                        ? "Deselect All"
                        : "Select All"}
                    </button>
                  )}
                  {expandedFilter === filter.name ? (
                    <FaChevronDown size={12}  className="text-[#004C78]" />
                  ) : (
                    <FaChevronRight size={12}  className="text-[#004C78]" />
                  )}
                </div>
              </div>
              {renderFilterOptions(filter)}
            </div>
          ))}
        </div>
      </div>

      {isFilterOpen && (
        <div  className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div  className="bg-white w-80 h-[80vh] sm:h-auto p-6 rounded-lg overflow-y-auto">
            <div  className="flex justify-between items-center mb-4">
              <h3  className="text-md font-semibold text-gray-800">Filters</h3>
              <button
                 className="text-xs text-[#8D8D8D] hover:underline"
                onClick={() => {
                  setIsFilterOpen(false);
                  onClearFilters();
                }}
              >
                Clear all
              </button>
            </div>
            <hr  className="mb-4" />
            <div  className="mb-4">
              {filters.map((filter, index) => (
                <div key={index}  className="mb-1">
                  <div
                     className="flex items-center justify-between cursor-pointer text-lg font-semibold text-gray-700"
                    onClick={() => handleFilterToggle(filter.name)}
                  >
                    <span  className="text-[#004C78] text-xs">
                      {filter.PreviewName === "Clinical Trial Design"
                        ? "Human Studies"
                        : filter.PreviewName}
                    </span>
                    <div  className="flex items-center">
                      {filter.name === "clinicalTrialDesign" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectAll("clinicalTrialDesign");
                          }}
                           className="text-xs text-blue-500 mr-2 hover:underline"
                        >
                          {selectedFilters.clinicalTrialDesign?.length ===
                          filters.find((f) => f.name === "clinicalTrialDesign")
                            ?.options?.length
                            ? "Deselect All"
                            : "Select All"}
                        </button>
                      )}
                      {expandedFilter === filter.name ? (
                        <FaChevronDown size={12}  className="text-[#004C78]" />
                      ) : (
                        <FaChevronRight size={12}  className="text-[#004C78]" />
                      )}
                    </div>
                  </div>
                  {renderFilterOptions(filter)}
                </div>
              ))}
              <button
                onClick={() => setIsFilterOpen(false)}
                 className="mt-4 p-2 bg-[#004C78] text-white rounded-md w-full"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;