import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./filter.css";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFolders,
  createFolder,
  deleteFolder,
  setActiveFolder,
} from "../../store/slice/folderSlice.js";

const FoldersSection = () => {
  const dispatch = useDispatch();
  const { folders, loading } = useSelector((state) => state.folders);
  const { userAuth } = useSelector((state) => state.userAuth);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [createError, setCreateError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteFolder, setSelectedDeleteFolder] = useState(null);

  useEffect(() => {
    if (userAuth && folders.length === 0 && !loading) {
      dispatch(fetchFolders());
    }
  }, [userAuth, dispatch, folders.length, loading]);

  const handleFolderClick = (folderId) => {
    dispatch(setActiveFolder(folderId));
  };

  const handleCreateFolder = () => {
    const name = newFolderName.trim();

    if (!name) {
      setCreateError("Please enter folder name.");
      return;
    }

    dispatch(createFolder(name));

    setNewFolderName("");
    setCreateError("");
    setShowCreateModal(false);
  };

  const openDeleteModal = (folder) => {
    setSelectedDeleteFolder(folder);
    setShowDeleteModal(true);
  };

  const handleDeleteFolder = () => {
    if (!selectedDeleteFolder?.id) return;

    dispatch(deleteFolder(selectedDeleteFolder.id));

    setSelectedDeleteFolder(null);
    setShowDeleteModal(false);
  };

  if (!userAuth) return null;

  return (
      <div className="mt-6 border-t pt-4">
        <h3 className="text-md font-semibold text-gray-800 mb-2">My Folders</h3>

        {loading && <p className="text-xs text-gray-500">Loading…</p>}

        {folders.length === 0 && !loading && (
            <p className="text-xs text-gray-500">No folders yet.</p>
        )}

        <ul>
          {folders.map((folder) => (
              <li
                  key={folder.id}
                  className="mb-1 flex items-center justify-between"
              >
                <button
                    onClick={() => handleFolderClick(folder.id)}
                    className="flex-1 text-left p-2 rounded hover:bg-gray-100 flex items-center justify-between"
                >
                  <span className="text-xs truncate">{folder.name}</span>
                  <span className="text-xs text-gray-400 ml-2">
                {folder.article_count || 0}
              </span>
                </button>

                <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openDeleteModal(folder);
                    }}
                    className="text-red-500 hover:text-red-700 p-1 ml-1"
                    title="Delete folder"
                    type="button"
                >
                  ✕
                </button>
              </li>
          ))}
        </ul>

        <button
            className="mt-2 text-xs text-[#004C78] hover:underline font-medium"
            onClick={() => {
              setCreateError("");
              setNewFolderName("");
              setShowCreateModal(true);
            }}
            type="button"
        >
          + Create Folder
        </button>

        {/* Create Folder Modal */}
        {showCreateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-3">
              <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setShowCreateModal(false)}
              />

              <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-blue-50 to-white border-b">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-800">
                        Create New Folder
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                        Give your folder a name to organize saved articles.
                      </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                        title="Close"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Folder Name
                  </label>

                  <input
                      type="text"
                      value={newFolderName}
                      onChange={(e) => {
                        setNewFolderName(e.target.value);
                        setCreateError("");
                      }}
                      placeholder="e.g. Hydrogen Articles"
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition shadow-sm ${
                          createError
                              ? "border-red-400 focus:border-red-500"
                              : "border-gray-200 focus:border-[#004C78]"
                      }`}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleCreateFolder();
                        }
                      }}
                  />

                  {createError && (
                      <div className="mt-2 text-sm text-red-600">
                        {createError}
                      </div>
                  )}

                  <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium"
                    >
                      Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleCreateFolder}
                        className="px-4 py-2.5 rounded-xl bg-[#004C78] hover:bg-[#003A5C] text-white font-semibold shadow-sm"
                    >
                      Create Folder
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}

        {/* Delete Folder Modal */}
        {showDeleteModal && selectedDeleteFolder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-3">
              <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedDeleteFolder(null);
                  }}
              />

              <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-red-50 to-white border-b">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-800">
                        Delete Folder
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                        This folder will be deleted from your list.
                      </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                          setShowDeleteModal(false);
                          setSelectedDeleteFolder(null);
                        }}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                        title="Close"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-700">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-900">
                  “{selectedDeleteFolder.name}”
                </span>
                    ? All articles will be removed from this folder.
                  </p>

                  <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <button
                        type="button"
                        onClick={() => {
                          setShowDeleteModal(false);
                          setSelectedDeleteFolder(null);
                        }}
                        className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium"
                    >
                      Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleDeleteFolder}
                        className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm"
                    >
                      Delete Folder
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  selectedFilters,
}) => {

  const navigate = useNavigate();
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // if you still use this elsewhere
  const [authorSearchTerm, setAuthorSearchTerm] = useState(""); // ✅ new state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { user, userAuth, check_auth_status } = useSelector((state) => state.userAuth);
  console.log('userAuth', userAuth);
  console.log('user', user);
  console.log('check_auth_status', check_auth_status);

  const roleId = user?.role_id;

  const USER_ALLOWED_FILTERS = ["Disease", "Study Type", "Organs/Tissues"];

  const visibleFilters =
      check_auth_status === "loading" || check_auth_status === "idle"
          ? []
          : roleId === 2
              ? filters.filter((filter) => USER_ALLOWED_FILTERS.includes(filter.PreviewName))
              : filters;


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
    return selectedFilters.studyTypes?.includes("in Vivo") || false;
  };

  const renderStudyTypeOptions = (filter) => {

    // key = parent label (lowercase)
    const studyTypeSubOptionConfig = {
      "in vivo": [
        { label: "Animal Study", value: "Animal Study" },
        { label: "Human Study", value: "Human Study" },
        { label: "Plant Study", value: "Plant Study" },
      ],
      "non-experimental (review)": [
        { label: "Hypothesis", value: "Hypothesis" },
        { label: "Literature", value: "Literature" },
        { label: "Meta analysis", value: "Meta analysis" },
        { label: "Opinion Piece", value: "Opinion Piece" },
        { label: "Systematic", value: "Systematic" },
      ],
    };


    // backend sends `name: "studyTypes"`
    if (!filter || filter.name !== "studyTypes") return null;

    const filteredOptions = filter.options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupedOptions = [];

    filteredOptions.forEach((option) => {
      groupedOptions.push({
        ...option,
        isSubOption: false,
      });
    });

    return (
        <ul
            className={`mt-4 flex flex-wrap gap-4 transition-all duration-300 ease-in-out overflow-hidden ${
                expandedFilter === filter.name ? "max-h-full opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {groupedOptions.map((option, idx) => {
            const parentKey = option.label.toLowerCase();
            // Read suboptions from config
            const subOptions = studyTypeSubOptionConfig[parentKey] || [];
            const hasSubOptions = subOptions.length > 0;

            return (
                <React.Fragment key={idx}>
                  {/* Parent option (In Vivo, Ex Vivo, etc.) */}
                  <li className="flex items-center mb-2 w-full">
                    <input
                        type="checkbox"
                        id={`${filter.name}-${idx}`}
                        className="mr-1"
                        checked={
                            selectedFilters[filter.name]?.some((item) =>
                                typeof item === "object"
                                    ? item.id === option.id
                                    : item === option.value
                            ) || false
                        }
                        onChange={(e) => {
                          const isChecked = e.target.checked;

                          // Toggle parent
                          onFilterChange(filter.name, option, isChecked);

                          // If this parent has suboptions, toggle them all together
                          if (hasSubOptions) {
                            subOptions.forEach((subOption) => {
                              const uniqueSubValue = `${parentKey}::${subOption.value}`;
                              onFilterChange(filter.name, { ...subOption, value: uniqueSubValue, parentKey }, isChecked);
                            });
                          }
                        }}
                    />
                    <label
                        htmlFor={`${filter.name}-${idx}`}
                        className="text-xs capitalize"
                    >
                      {option.label}
                    </label>
                  </li>

                  {/* Suboptions under this parent, if any (In Vivo, Ex Vivo, etc.) */}
                  {hasSubOptions &&
                      subOptions.map((subOption, subIdx) => {
                        // ✅ make it unique using parentKey
                        const uniqueSubValue = `${parentKey}::${subOption.value}`;
                        const subOptionWithParent = {
                          ...subOption,
                          value: uniqueSubValue,      // stored value (unique)
                          rawValue: subOption.value,  // optional (display/logic if needed)
                          parentKey,
                        };

                        return (
                            <li
                                key={`sub-${parentKey}-${subIdx}`}
                                className="flex items-center mb-2 w-full ml-6"
                            >
                              <input
                                  type="checkbox"
                                  id={`${filter.name}-sub-${parentKey}-${subIdx}`}
                                  className="mr-1"
                                  checked={
                                      selectedFilters[filter.name]?.some((item) =>
                                          typeof item === "object"
                                              ? item.value === uniqueSubValue
                                              : item === uniqueSubValue
                                      ) || false
                                  }
                                  onChange={(e) => {
                                    onFilterChange(filter.name, subOptionWithParent, e.target.checked);
                                  }}
                              />
                              <label
                                  htmlFor={`${filter.name}-sub-${parentKey}-${subIdx}`}
                                  className="text-xs capitalize"
                              >
                                {subOption.label}
                              </label>
                            </li>
                        );
                      })}

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
    // FIX: studyTypes (plural) from backend
    if (filter.name === "studyTypes") {
      return renderStudyTypeOptions(filter);
    }

    if (filter.name === "species") {
      return (
          <div
              className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedFilter === filter.name
                      ? "max-h-full opacity-100"
                      : "max-h-0 opacity-0"
              }`}
          >
            {renderSpeciesOptions(filter.options)}
          </div>
      );
    }

    // FIX: diseases (plural) from backend
    if (filter.name === "diseases") {
      return (
          <div
              className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedFilter === filter.name
                      ? "max-h-full opacity-100"
                      : "max-h-0 opacity-0"
              }`}
          >
            {renderDiseaseOptions(filter.options)}
          </div>
      );
    }

// ✅ NEW: AUTHOR-ONLY SEARCH BLOCK (ADD THIS)
    if (filter.name === "authors" || filter.name === "author") {
      const optionsToRender =
          filter?.options?.filter((option) =>
              option.label.toLowerCase().includes(authorSearchTerm.toLowerCase())
          ) || [];

      return (
          <div
              className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedFilter === filter.name
                      ? "max-h-full opacity-100"
                      : "max-h-0 opacity-0"
              }`}
          >
            {/* Search box only for author filter */}
            <div className="mb-4 flex items-center border border-gray-300 rounded px-2 py-1">
              <FaSearch size={10} className="mr-1 text-gray-500" />
              <input
                  type="text"
                  value={authorSearchTerm}
                  onChange={(e) => setAuthorSearchTerm(e.target.value)}
                  placeholder="Search author"
                  className="w-full text-xs outline-none"
              />
            </div>

            <ul className="flex flex-wrap gap-4">
              {optionsToRender.map((option, idx) => (
                  <li key={idx} className="flex items-center mb-2 w-full">
                    {filter.type === "radio" ? (
                        <>
                          <input
                              type="radio"
                              id={`${filter.name}-${idx}`}
                              name={filter.name}
                              className="mr-1"
                              checked={
                                typeof selectedFilters[filter.name] === "object" &&
                                selectedFilters[filter.name]?.id
                                    ? selectedFilters[filter.name].id === option.id
                                    : selectedFilters[filter.name] === option.value
                              }
                              onChange={() =>
                                  onFilterChange(filter.name, option, true, "radio")
                              }
                          />
                          <label
                              htmlFor={`${filter.name}-${idx}`}
                              className="text-xs capitalize"
                          >
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
                                    : selectedFilters[filter.name]?.some((item) =>
                                    typeof item === "object"
                                        ? item.id === option.id
                                        : item === option.value
                                ) || false
                              }
                              onChange={(e) =>
                                  onFilterChange(filter.name, option, e.target.checked)
                              }
                          />
                          <label
                              htmlFor={`${filter.name}-${idx}`}
                              className="text-xs capitalize"
                          >
                            {option.label}
                          </label>
                        </>
                    )}
                  </li>
              ))}
            </ul>
          </div>
      );
    }

// ❌ For all other filters: no search, show all options
    const optionsToRender = filter?.options || [];

    return (
        <ul
            className={`mt-4 flex flex-wrap gap-4 transition-all duration-300 ease-in-out overflow-hidden ${
                expandedFilter === filter.name ? "max-h-full opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {optionsToRender?.map((option, idx) => (
              <li key={idx} className="flex items-center mb-2 w-full">
                {filter.type === "radio" ? (
                    <>
                      <input
                          type="radio"
                          id={`${filter.name}-${idx}`}
                          name={filter.name}
                          className="mr-1"
                          checked={
                            typeof selectedFilters[filter.name] === "object" &&
                            selectedFilters[filter.name]?.id
                                ? selectedFilters[filter.name].id === option.id
                                : selectedFilters[filter.name] === option.value
                          }
                          onChange={() =>
                              onFilterChange(filter.name, option, true, "radio")
                          }
                      />
                      <label
                          htmlFor={`${filter.name}-${idx}`}
                          className="text-xs capitalize"
                      >
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
                                : selectedFilters[filter.name]?.some((item) =>
                                typeof item === "object"
                                    ? item.id === option.id
                                    : item === option.value
                            ) || false
                          }
                          onChange={(e) =>
                              onFilterChange(filter.name, option, e.target.checked)
                          }
                      />
                      <label
                          htmlFor={`${filter.name}-${idx}`}
                          className="text-xs capitalize"
                      >
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
          {visibleFilters.map((filter, index) => (
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

        {userAuth && (
            <>
              <FoldersSection />
            </>
        )}
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
