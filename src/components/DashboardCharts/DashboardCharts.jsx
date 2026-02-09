import React, { useState, useEffect } from "react";
import { Bar, Pie, PolarArea, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import generateColors from "../../utils/generateColors";
import {
  FiArrowRight,
  FiInfo,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiBook,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import FeedbackButton from "../FeedbackButton/FeedbackButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const DashboardCharts = ({ data }) => {
  const navigate = useNavigate();

  // Safely handle undefined or null data
  const generateContrastColors = (count) => {
    const colors = [];
    const hueStep = 360 / count;
    const saturation = 80;
    const lightness = 60;

    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${i * hueStep}, ${saturation}%, ${lightness}%)`);
    }
    return colors;
  };

  const generateYearColors = (years) => {
    const baseColor = "#004c78"; // Base color
    return years.map(
      (_, index) =>
        `${baseColor}${Math.floor(80 + index * (150 / years.length))
          .toString(16)
          .padStart(2, "0")}`
    );
  };

  // Transform ArticlesByYearData
  const articlesByYearData = {
    labels:
      data?.ArticlesByYearData?.sort((a, b) => a.year - b.year) // Sort years chronologically
        ?.map((item) => item.year) || [],
    datasets: [
      {
        label: "Articles Count",
        data:
          data?.ArticlesByYearData?.sort((a, b) => a.year - b.year) // Match sorted years
            ?.map((item) => item.count) || [],
        backgroundColor: generateYearColors(data?.ArticlesByYearData || []),
        hoverBackgroundColor: "#003556",
        categoryPercentage: 0.8,
        barPercentage: 0.9,
      },
    ],
  };

  const researchByTopicData = (() => {
    const topicData = data?.ResearchByTopicData || {};
    const sortedEntries = Object.entries(topicData).sort(([a], [b]) => a.localeCompare(b));
    const sortedLabels = sortedEntries.map(([label]) => label);
    const sortedValues = sortedEntries.map(([, value]) => value);
    
    return {
      labels: sortedLabels,
      datasets: [
        {
          label: "Research by Topic",
          data: sortedValues,
          backgroundColor: generateContrastColors(sortedLabels.length),
          borderWidth: 1,
          borderColor: "#fff",
        },
      ],
    };
  })();

  const studyByTypeData = (() => {
    const typeData = data?.StudyByTypeData || {};
    const sortedEntries = Object.entries(typeData).sort(([a], [b]) => a.localeCompare(b));
    const sortedLabels = sortedEntries.map(([label]) => label);
    const sortedValues = sortedEntries.map(([, value]) => value);
    
    return {
      labels: sortedLabels,
      datasets: [
        {
          label: "Study by Type",
          data: sortedValues,
          backgroundColor: generateContrastColors(sortedLabels.length),
          borderWidth: 1,
          borderColor: "#fff",
        },
      ],
    };
  })();

  const studyBySpeciesData = (() => {
    const speciesData = data?.StudyBySpeciesData || {};
    const sortedEntries = Object.entries(speciesData).sort(([a], [b]) => a.localeCompare(b));
    const sortedLabels = sortedEntries.map(([label]) => label);
    const sortedValues = sortedEntries.map(([, value]) => value);
    
    return {
      labels: sortedLabels,
      datasets: [
        {
          label: "Study by Species",
          data: sortedValues,
          backgroundColor: generateContrastColors(sortedLabels.length),
          borderWidth: 1,
          borderColor: "#fff",
        },
      ],
    };
  })();

  const studyByOrganData = {
    labels: data?.StudyByOrganData?.map((item) => item.name) || [],
    datasets: [
      {
        label: "Articles",
        data: data?.StudyByOrganData?.map((item) => item.count) || [],
        backgroundColor: "#004c78",
        borderRadius: 4,
        hoverBackgroundColor: "#003556",
        categoryPercentage: 0.8,
        barPercentage: 0.9,
      },
    ],
  };

  // Organ chart pagination state
  const [labelStartIndex, setLabelStartIndex] = useState(0);
  const [visibleOrganData, setVisibleOrganData] = useState(null);

  // Number of labels to show at once
  const labelsPerView = 10;

  // Calculate total number of labels
  const totalLabels = studyByOrganData.labels.length;

  // Calculate max start index to prevent showing empty spaces
  const maxStartIndex = Math.max(0, totalLabels - labelsPerView);

  // Update visible data whenever the organ data or start index changes
  useEffect(() => {
    updateVisibleOrganData();
  }, [data, labelStartIndex]);

  // Create a filtered version of the organ data with only the visible labels
  const updateVisibleOrganData = () => {
    if (
      !studyByOrganData ||
      !studyByOrganData.labels ||
      studyByOrganData.labels.length === 0
    ) {
      setVisibleOrganData(null);
      return;
    }

    const visibleLabels = studyByOrganData.labels.slice(
      labelStartIndex,
      labelStartIndex + labelsPerView
    );

    const visibleData = studyByOrganData.datasets.map((dataset) => ({
      ...dataset,
      data: dataset.data.slice(
        labelStartIndex,
        labelStartIndex + labelsPerView
      ),
    }));

    setVisibleOrganData({
      labels: visibleLabels,
      datasets: visibleData,
    });
  };

  // Navigation functions for organ chart
  const showPreviousLabels = () => {
    setLabelStartIndex(Math.max(0, labelStartIndex - labelsPerView));
  };

  const showNextLabels = () => {
    setLabelStartIndex(
      Math.min(maxStartIndex, labelStartIndex + labelsPerView)
    );
  };

  // Check if navigation buttons should be enabled
  const canGoBack = labelStartIndex > 0;
  const canGoForward = labelStartIndex < maxStartIndex;

  // Handle clicking handlers
  const handleTopicClick = (topicIndex) => {
    const researchTopic = researchByTopicData.labels[topicIndex];
    navigate(`/articles?researchTopics=${encodeURIComponent(researchTopic)}`);
  };

  const handleStudyTypeClick = (typeIndex) => {
    const study = studyByTypeData.labels[typeIndex];
    navigate(`/articles?studyTypes=${encodeURIComponent(study)}`);
  };

  const handleSpeciesClick = (speciesIndex) => {
    const specie = studyBySpeciesData.labels[speciesIndex];
    navigate(`/articles?species=${encodeURIComponent(specie)}`);
  };

  const handleOrganClick = (elements) => {
    if (elements.length > 0) {
      // Account for the current offset when determining which organ was clicked
      const organIndex = elements[0].index + labelStartIndex;
      const organ = studyByOrganData.labels[organIndex];
      navigate(`/articles?organs=${encodeURIComponent(organ)}`);
    }
  };

  const handleYearClick = (yearIndex) => {
    const year = articlesByYearData.labels[yearIndex];
    navigate(`/articles?year=${encodeURIComponent(year)}`);
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 ">
      {/* Articles by Year */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col h-[450px]">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-lg font-bold ">Articles by Year</h2>
          <div>
            <FeedbackButton modern={true} />
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full h-full">
            <Bar
              data={articlesByYearData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                onClick: (e, elements) => {
                  if (elements.length > 0) {
                    handleYearClick(elements[0].index);
                  }
                },
                indexAxis: "x",
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Year",
                      font: { weight: "bold" },
                    },
                    grid: { display: false },
                    ticks: {
                      autoSkip: false,
                      maxRotation: 45,
                      minRotation: 45,
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Number of Articles",
                      font: { weight: "bold" },
                    },
                    beginAtZero: true,
                    grid: { color: "#f0f0f0" },
                    ticks: { stepSize: 1 },
                  },
                },
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      title: (context) => `Year: ${context[0].label}`,
                      label: (context) => `Articles: ${context.parsed.y}`,
                    },
                  },
                },
                elements: {
                  bar: {
                    borderRadius: 4,
                    borderWidth: 0,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Research by Topic */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col h-[450px] relative">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-lg font-bold ">Study by Research Topic</h2>
          <div>
            <FeedbackButton modern={true} />
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row gap-4 relative">
          {/* Chart Container - Centered Always */}
          <div className="w-full h-[300px] md:h-full md:w-[70%] relative flex justify-center items-center">
            <Pie
              data={researchByTopicData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                onClick: (e, elements) => {
                  if (elements.length > 0) {
                    handleTopicClick(elements[0].index);
                  }
                },
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        const total =
                          context.chart.data.datasets[0].data.reduce(
                            (a, b) => a + b,
                            0
                          );
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${percentage}%`;
                      },
                    },
                  },
                },
                layout: {
                  padding: 10,
                },
              }}
            />
          </div>

          {/* Custom Legend - Responsive Positioning */}
          <div className="md:w-[30%] md:pl-4 overflow-auto custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 max-md:flex max-md:flex-row max-md:flex-nowrap">
              {researchByTopicData.labels.map((label, index) => (
                <div
                  key={label}
                  onClick={() => handleTopicClick(index)}
                  className="flex items-center p-2 max-md:min-w-[140px] max-md:flex-col max-md:text-center bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                  role="button"
                  aria-label={`View articles for ${label}`}
                >
                  <div
                    className="w-3 h-3 mr-2 rounded-full shrink-0 max-md:mr-0 max-md:mb-1"
                    style={{
                      backgroundColor:
                        researchByTopicData.datasets[0].backgroundColor[index],
                    }}
                  />
                  <span className="text-xs font-medium text-gray-700 truncate max-md:max-w-[120px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Study by Type */}
      {/* Study by Type */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col h-[450px] relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Study by Type</h2>
          <div>
            <FeedbackButton modern={true} />
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row gap-4 relative">
          {/* Chart Container */}
          <div className="w-full h-[300px] md:h-full md:w-[70%] relative flex justify-center items-center">
            <Doughnut
              data={studyByTypeData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                onClick: (e, elements) => {
                  if (elements.length > 0) {
                    handleStudyTypeClick(elements[0].index);
                  }
                },
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || "";
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                      },
                    },
                  },
                },
                elements: {
                  arc: {
                    borderWidth: 2,
                    borderColor: 'white',
                  }
                },
                cutout: '50%',
                animation: {
                  animateRotate: true,
                  duration: 1000,
                }
              }}
            />
          </div>

          {/* Custom Legend - Same as Research Topic */}
          <div className="md:w-[30%] md:pl-4 overflow-auto custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 max-md:flex max-md:flex-row max-md:flex-nowrap">
              {studyByTypeData.labels.map((label, index) => (
                <div
                  key={label}
                  onClick={() => handleStudyTypeClick(index)}
                  className="flex items-center p-2 max-md:min-w-[140px] max-md:flex-col max-md:text-center bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                  role="button"
                  aria-label={`View articles for ${label} studies`}
                >
                  <div
                    className="w-3 h-3 mr-2 rounded-full shrink-0 max-md:mr-0 max-md:mb-1"
                    style={{
                      backgroundColor: studyByTypeData.datasets[0].backgroundColor[index],
                    }}
                  />
                  <span className="text-xs font-medium text-gray-700 truncate max-md:max-w-[120px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Study by Species */}
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col h-[450px] relative">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-lg font-bold ">Study by Species</h2>
          <div>
            <FeedbackButton modern={true} />
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row gap-4 relative">
          {/* Chart Container */}
          <div className="w-full h-[300px] md:h-full md:w-[70%] relative flex justify-center items-center">
            <Doughnut
              data={studyBySpeciesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                onClick: (e, elements) => {
                  if (elements.length > 0) {
                    handleSpeciesClick(elements[0].index);
                  }
                },
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || "";
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce(
                          (a, b) => a + b,
                          0
                        );
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                      },
                    },
                  },
                },
                layout: {
                  padding: 10,
                },
                cutout: "60%", // Doughnut specific customization
              }}
            />
          </div>

          {/* Custom Legend - Same Structure */}
          <div className="md:w-[30%] md:pl-4 overflow-auto custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 max-md:flex max-md:flex-row max-md:flex-nowrap">
              {studyBySpeciesData.labels.map((label, index) => (
                <div
                  onClick={() => handleSpeciesClick(index)}
                  key={label}
                  className="flex items-center p-2 max-md:min-w-[140px] max-md:flex-col max-md:text-center bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
                  role="button"
                  aria-label={`View articles for ${label} species`}
                >
                  <div
                    className="w-3 h-3 mr-2 rounded-full shrink-0 max-md:mr-0 max-md:mb-1"
                    style={{
                      backgroundColor:
                        studyBySpeciesData.datasets[0].backgroundColor[index],
                    }}
                  />
                  <span className="text-xs font-medium text-gray-700 truncate max-md:max-w-[120px]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Study by Organ */}
      <div className="bg-white p-6 rounded-lg shadow-lg lg:col-span-2 flex flex-col lg:flex-row gap-6 h-auto lg:h-[450px]">
        {/* Chart Section */}
        <div className="w-full lg:w-1/2 h-[350px] lg:h-full">
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-lg font-bold ">Study by Organ</h2>
            <div>
              <FeedbackButton modern={true} />
            </div>
          </div>

          <div className="w-full h-[calc(100%-80px)]">
            {visibleOrganData ? (
              <Bar
                data={visibleOrganData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  onClick: (e, elements) => handleOrganClick(elements),
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        title: (context) => {
                          // Account for the current offset when determining the tooltip title
                          const tooltipIndex =
                            context[0].dataIndex + labelStartIndex;
                          return studyByOrganData.labels[tooltipIndex];
                        },
                        label: (context) => `${context.parsed.y} articles`,
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                          size: 10, // Reduce font size for better readability
                        },
                      },
                    },
                    y: {
                      beginAtZero: true,
                      ticks: { precision: 0 },
                    },
                  },
                  elements: {
                    bar: {
                      borderRadius: 4,
                      hoverBackgroundColor: "#003556",
                    },
                  },
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-500">Loading organ data...</p>
              </div>
            )}
          </div>

          {/* Chart Navigation */}
          <div className="flex justify-between items-center mt-2 px-4">
            <button
              className={`p-2 rounded-full ${canGoBack
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              onClick={showPreviousLabels}
              disabled={!canGoBack}
              aria-label="Show previous organs"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>

            <div className="text-sm text-gray-500">
              {totalLabels > 0
                ? `Showing ${labelStartIndex + 1}-${Math.min(
                  labelStartIndex + labelsPerView,
                  totalLabels
                )} of ${totalLabels}`
                : "No data available"}
            </div>

            <button
              className={`p-2 rounded-full ${canGoForward
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              onClick={showNextLabels}
              disabled={!canGoForward}
              aria-label="Show next organs"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-center p-4 bg-gray-50 rounded-lg">
          <div className="space-y-4">
            <FiSearch className="h-8 w-8 text-primary mb-2" />
            <h3 className="text-xl font-semibold">
              Explore Molecular Hydrogen Research
            </h3>
            <p className="text-gray-600">
              Dive deeper into our comprehensive database of molecular hydrogen
              studies. Click any organ in the chart to view related research
              articles, or use our advanced search to find specific studies.
            </p>
            <div className="flex flex-col gap-3 mt-4">
              <button
                className="flex items-center w-full max-w-52 gap-2 text-primary border border-primary rounded-md px-4 py-2 hover:bg-primary hover:text-white transition-colors"
                onClick={() => navigate("/about")}
              >
                <FiInfo className="h-4 w-4" />
               Explore More Data
              </button>
              

                <button
                className="flex items-center w-full max-w-52 gap-2 text-primary border border-primary rounded-md px-4 py-2 hover:bg-primary hover:text-white transition-colors"
                onClick={() => 
                {
                  window.open("https://stagging.h2research.org/admin/", "_blank");
                }
                }
              >
                <FiBook className="h-4 w-4" />
               Add Your Article
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
