import React, { useState, useRef, useEffect } from "react";
import { FiImage, FiX } from "react-icons/fi";
import { MdFeedback } from "react-icons/md";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import { error_toast_message, success_toast_message } from "../../utils/toast_message";

const FeedbackModal = ({ onClose, pageUrl }) => {
  const [sections, setSections] = useState([
    { screenshot: null, explanation: "", revision: "" },
  ]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
  });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  // Capture current page URL if not provided
  const [currentPageUrl, setCurrentPageUrl] = useState(pageUrl || window.location.href);

  // Create refs for file inputs
  const fileInputRefs = useRef([]);

  // Initialize refs when sections change
  useEffect(() => {
    fileInputRefs.current = fileInputRefs.current.slice(0, sections.length);
  }, [sections.length]);

  // Section Management
  const handleAddSection = () => {
    setSections([
      ...sections,
      { screenshot: null, explanation: "", revision: "" },
    ]);
  };

  const handleRemoveSection = (index) => {
    if (sections.length === 1) return;
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const handleFileUpload = async (index, file) => {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      error_toast_message("Please upload only image files");
      return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      error_toast_message("Image file is too large (max 5MB)");
      return;
    }

    setIsUploading(true);
    setUploadingIndex(index);

    try {
      const result = await uploadToCloudinary(file);
      const newSections = [...sections];
      newSections[index].screenshot = result?.url;
      setSections(newSections);
      success_toast_message("Image uploaded successfully");
    } catch (error) {
      error_toast_message("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadingIndex(null);
    }
  };

  // Handle file selection through the input
  const handleFileSelect = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(index, file);
    }
  };

  // Handle clipboard paste events
  const handlePaste = (e, index) => {
    const clipboardItems = e.clipboardData.items;
    const items = [...clipboardItems];

    const imageItem = items.find((item) => item.type.startsWith("image"));

    if (imageItem) {
      const file = imageItem.getAsFile();
      if (file) {
        handleFileUpload(index, file);
      }
    } else {
      error_toast_message(
        "No image found in clipboard. Please copy a screenshot first."
      );
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    // Add highlight class or state to the drop zone
    const dropZone = document.getElementById(`dropzone-${index}`);
    if (dropZone) {
      dropZone.classList.add('border-blue-400', 'bg-blue-50');
    }
  };

  const handleDragLeave = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    // Remove highlight class or state
    const dropZone = document.getElementById(`dropzone-${index}`);
    if (dropZone) {
      dropZone.classList.remove('border-blue-400', 'bg-blue-50');
    }
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    // Remove highlight class or state
    const dropZone = document.getElementById(`dropzone-${index}`);
    if (dropZone) {
      dropZone.classList.remove('border-blue-400', 'bg-blue-50');
    }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(index, file);
    }
  };

  const uploadToCloudinary = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("image", fileToUpload);

    try {
      const response = await apiHandle.post("upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!response.data?.image_url) {
        throw new Error("Invalid response format");
      }

      return { url: response.data.image_url };
    } catch (error) {
      throw new Error("Upload failed: " + error.message);
    }
  };

  // Field Change Handler
  const handleFieldChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  // Form Submission Flow
  const handleSubmit = () => {
    // Check if any section has a screenshot
    const hasScreenshot = sections.some(section => section.screenshot);

    // if (!hasScreenshot) {
    //   error_toast_message("Please upload at least one screenshot");
    //   return;
    // }

    setShowUserForm(true);
  };

  const handleUserDetailsSubmit = async () => {
    try {
      // API Call with page URL included
      const obj = {
        user: {
          name: userDetails.name || "Anonymous",
          email: userDetails.email || "anonymous@example.com",
        },
        page_url: currentPageUrl,
        feedback: sections,
        status: "In Progress",
      };

      await apiHandle.post("add-feedback", obj)
        .then((res) => {
          onClose();
          success_toast_message("Feedback submitted successfully!");
        })
        .catch((err) => {
          error_toast_message(err);
        });
    } catch (error) {
      error_toast_message("Failed to submit feedback");
    }
  };

  // Minimize and restore modal
  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
  };

  // Return minimized sticky button if minimized
  // <button
  //   onClick={handleRestore}
  //    className="fixed bottom-6 right-16 bg-[#346896] text-white rounded-full shadow-lg z-50 hover:bg-[#2a5478] transition-all flex items-center gap-2 px-5 py-3 group animate-fadeIn"
  //   style={{
  //     boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
  //   }}
  // >
  //   <div  className="relative">
  //     <div  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
  //     <MdFeedback
  //       size={20}
  //        className="text-white group-hover:scale-110 transition-transform"
  //     />
  //   </div>
  //   <span  className="font-medium">Resume Feedback</span>
  //   <span  className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#346896] text-xs ml-1">
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //        className="h-3.5 w-3.5"
  //       viewBox="0 0 20 20"
  //       fill="currentColor"
  //     >
  //       <path
  //         fillRule="evenodd"
  //         d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
  //         clipRule="evenodd"
  //       />
  //     </svg>
  //   </span>
  // </button>
  if (isMinimized) {
    return (
      <button
        onClick={handleRestore}
        className="fixed bottom-24 right-7 bg-[#346896] text-white rounded-full shadow-lg z-50 hover:bg-[#2a5478] transition-all duration-300 w-16 h-16 flex items-center justify-center group animate-fadeIn hover:scale-110"
        style={{
          boxShadow: "0 8px 25px rgba(52, 104, 150, 0.3)",
        }}
        title="Resume Feedback" // Tooltip on hover
      >
        {/* Icon with Notification Dot */}
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
          <MdFeedback
            size={26}
            className="text-white group-hover:rotate-12 transition-transform duration-200"
          />
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        {/* Main Feedback Form */}
        {!showUserForm ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-2xl font-bold">Submit Feedback</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMinimize}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  title="Minimize"
                >                                                                   
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12H6"
                    />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  title="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div
              className="flex-1 overflow-auto p-6"
              style={{ maxHeight: "calc(90vh - 130px)" }}
            >

              {sections.map((section, index) => (
                <div key={index} className="mb-6 border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">
                      Please provide your suggestion to improve this article
                    </h3>
                    {sections.length > 1 && (
                      <button
                        onClick={() => handleRemoveSection(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Screenshot Upload - Enhanced with multiple methods */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Upload Screenshot
                    </label>
                    <div
                      id={`dropzone-${index}`}
                      className={`relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-[#346896] transition-colors ${isUploading && uploadingIndex === index
                          ? "bg-gray-50"
                          : ""
                        }`}
                      onPaste={(e) => handlePaste(e, index)}
                      onDragOver={(e) => handleDragOver(e)}
                      onDragEnter={(e) => handleDragEnter(e, index)}
                      onDragLeave={(e) => handleDragLeave(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      tabIndex="0" // Make div focusable for better keyboard access
                    >
                      {isUploading && uploadingIndex === index ? (
                        // Loading state
                        <div className="flex flex-col items-center py-4">
                          <div className="w-10 h-10 border-4 border-[#346896] border-t-transparent rounded-full animate-spin mb-3"></div>
                          <p className="text-sm text-gray-600">Uploading image...</p>
                        </div>
                      ) : section.screenshot ? (
                        // Image preview state
                        <div className="relative">
                          <img
                            src={section?.screenshot}
                            alt="Preview"
                            className="h-32 object-contain mb-2"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const newSections = [...sections];
                              newSections[index].screenshot = null;
                              setSections(newSections);
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <FiX />
                          </button>
                        </div>
                      ) : (
                        // Empty state with multiple upload options
                        <>
                          <FiImage className="w-8 h-8 text-gray-400 mb-3" />
                          <p className="text-sm text-gray-700 font-medium mb-1">
                            Add your screenshot
                          </p>
                          <div className="flex flex-wrap justify-center gap-2 mb-2">
                            <span className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              <span className="font-semibold mr-1">CTRL+V</span> Paste
                            </span>
                            <span className="inline-flex items-center text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                              <span className="font-semibold mr-1">Drop</span> Image
                            </span>
                            <button
                              onClick={() => fileInputRefs.current[index].click()}
                              className="inline-flex items-center text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded"
                            >
                              <span className="font-semibold mr-1">Browse</span> Files
                            </button>
                          </div>
                          <span className="text-xs text-gray-500 text-center">
                            Supports JPG, PNG, GIF up to 5MB
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={(el) => (fileInputRefs.current[index] = el)}
                            onChange={(e) => handleFileSelect(e, index)}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Explanation Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Explain what's wrong
                    </label>
                    <textarea
                      value={section.explanation}
                      onChange={(e) =>
                        handleFieldChange(index, "explanation", e.target.value)
                      }
                      className="w-full p-2 border rounded-md focus:ring-[#346896] focus:border-[#346896]"
                      rows="3"
                      placeholder="Describe the issue in detail..."
                    />
                  </div>

                  {/* Suggested Revision Field */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Suggested Revision
                    </label>
                    <textarea
                      value={section.revision}
                      onChange={(e) =>
                        handleFieldChange(index, "revision", e.target.value)
                      }
                      className="w-full p-2 border rounded-md focus:ring-[#346896] focus:border-[#346896]"
                      rows="3"
                      placeholder="Provide your suggested correction..."
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={handleAddSection}
                className="w-full py-2 text-[#346896] hover:text-[#346896] border border-dashed rounded-lg"
              >
                + Add Another Feedback
              </button>
            </div>

            {/* Footer Buttons */}
            <div className="p-4 border-t flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#346896] text-white rounded-md hover:bg-[#2a5478] transition-colors"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          /* User Details Form - Now optional fields */
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Enter Your Details (Optional)</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMinimize}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  title="Minimize"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12H6"
                    />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 p-1"
                  title="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:ring-[#346896] focus:border-[#346896]"
                  value={userDetails.name}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-gray-500 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md focus:ring-[#346896] focus:border-[#346896]"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="your.email@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll use this to contact you if we need more information
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowUserForm(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleUserDetailsSubmit}
                className="px-6 py-2 bg-[#346896] text-white rounded-md hover:bg-[#2a5478]"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;