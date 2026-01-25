import React, { useState, useRef } from "react";
import {
  FiSend,
  FiPaperclip,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { apiHandle } from "../../config/apiHandle/apiHandle";
import { useNavigate } from "react-router-dom";

const ContactForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    status: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setFileError("File size exceeds 5MB limit");
        setSelectedFile(null);
        setFileName("");
        e.target.value = null;
      } else {
        setSelectedFile(file);
        setFileName(file.name);
        setFileError("");
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileName("");
    setFileError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ status: null, message: "" });

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill all required fields");
      }

      // Prepare the final request body for form submission
      const reqBody = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        attachment: null, // Will be populated if there's a file
      };

      // Handle file upload first if present
      if (selectedFile) {
        try {
          // Create a FormData specifically for file upload
          const fileFormData = new FormData();

          let endpoint = "upload-images"; // default endpoint

          // Determine if it's an image or PDF and use the correct field name and endpoint
          if (selectedFile.type.startsWith("image/")) {
            fileFormData.append("image", selectedFile);
            endpoint = "upload-images";
          } else if (selectedFile.type === "application/pdf") {
            fileFormData.append("image", selectedFile);
            endpoint = "upload-images";
          } else {
            // Generic fallback
            fileFormData.append("image", selectedFile);
          }

          // Upload the file to the appropriate endpoint
          const uploadResponse = await apiHandle.post(endpoint, fileFormData, {
            headers: { "Content-Type": "multipart/form-data" },
          });


          // Check for image_url in the response and store it in the attachment field
          if (uploadResponse.data?.image_url) {
            reqBody.attachment = uploadResponse.data.image_url;
          } else {
          }
        } catch (uploadError) {
          throw new Error(
            "Failed to upload attachment: " + uploadError.message
          );
        }
      }

      // Now submit the complete form data to the form-submit endpoint
      try {
        const formResponse = await apiHandle.post(
          "submit-contact-form",
          reqBody
        );
      } catch (formError) {
        throw new Error("Failed to submit form: " + formError.message);
      }

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setSelectedFile(null);
      setFileName("");
      setSubmitStatus({
        status: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      navigate("/thank-you");
    } catch (error) {
      setSubmitStatus({
        status: "error",
        message: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div  className="w-full rounded-lg overflow-hidden shadow-lg bg-white border border-gray-100">
      {/* Header */}
      <div  className="bg-[#214a78] p-6 relative overflow-hidden">
        <div  className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mt-10 -mr-10"></div>

        <h2  className="text-3xl font-bold text-white relative z-10">
          Contact Us
        </h2>
        <p  className="text-blue-100 text-[16px] mt-1 relative z-10">
          We're excited to hear from you and discuss how molecular hydrogen
          research can advance your work.
        </p>
      </div>
      <div  className="flex flex-col md:flex-row">
        {/* Left Column - Contact Information */}
        <div  className="w-full md:w-5/12 bg-gray-50 p-6">
          <div  className="mb-8">
            <div  className="flex items-center mb-5">
              <div  className="w-8 h-1 bg-[#214a78]"></div>
              <h3  className="text-lg font-semibold text-[#214a78] ml-3">
                Our Contact Details
              </h3>
            </div>

            <div  className="space-y-5">
              <div  className="flex items-start">
                <div  className="mt-1">
                  <FiMapPin  className="h-5 w-5 text-[#214a78]" />
                </div>
                <div  className="ml-5">
                  <h4  className="font-medium">Our Location</h4>
                  <p  className="text-gray-600 text-sm mt-1">
                    {/* Molecular Hydrogen Institute
                    <br />
                    123 Research Boulevard
                    <br />
                    Science Park, CA 94305 */}
                    We are a global science-based 501(c)3 Nonprofit based in the
                    USA. Our team is located around the world. If you need to
                    send physical mail, please email us first.
                  </p>
                </div>
              </div>

              <div  className="flex items-start">
                <div  className="mt-1">
                  <FiMail  className="h-5 w-5 text-[#214a78]" />
                </div>
                <div  className="ml-5">
                  <h4  className="font-medium">Email Us</h4>
                  <div className="flex flex-col gap-2 mt-1">
                    <img
                      src="/src/assets/images/emails-bot-prevention.png"
                      alt="info@molecularhydrogeninstitute.org and courses@molecularhydrogeninstitute.org"
                      className="h-auto w-[270px]"
                      loading="lazy"
                    />
                    <p className="text-xs text-gray-400">(Email addresses are shown as an image to prevent spam bots. Please type them manually.)</p>
                  </div>
                </div>
              </div>

              <div  className="flex items-start">
                <div  className="mt-1">
                  <FiPhone  className="h-5 w-5 text-[#214a78]" />
                </div>
                <div  className="ml-5">
                  <h4  className="font-medium">Call Us</h4>
                  <p  className="text-gray-600 text-sm mt-1">
                    +1 (435) 233-2280
                  </p>
                  <p  className="text-gray-600 text-sm">
                    Mon-Fri 9 AM - 3 PM (Mountain Time / UTC-6)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div  className="flex items-center mb-5">
              <div  className="w-8 h-1 bg-[#214a78]"></div>
              <h3  className="text-lg font-semibold text-[#214a78] ml-3">
                Connect With Us
              </h3>
            </div>

            <p  className="text-gray-600 text-sm mb-5">
              Stay updated with the latest research, publications, and events in
              the field of molecular hydrogen.
            </p>

            <div  className="flex space-x-3">
              <a
                href="https://www.facebook.com/molecularhydrogeninstitute"
                target="_blank"
                 className="w-10 h-10 rounded-full bg-[#214a78] text-white flex items-center justify-center hover:bg-[#1a3b66] transition-colors"
              >
                <span  className="font-bold">f</span>
              </a>
              <a
                href="https://www.instagram.com/h2mhi/"
                target="_blank"
                 className="w-10 h-10 rounded-full bg-[#214a78] text-white flex items-center justify-center hover:bg-[#1a3b66] transition-colors"
              >
                <span  className="font-bold">ig</span>
              </a>
              {/* <a
                href="#"
                 className="w-10 h-10 rounded-full bg-[#214a78] text-white flex items-center justify-center hover:bg-[#1a3b66] transition-colors"
              >
                <span  className="font-bold">tw</span>
              </a>
              <a
                href="#"
                 className="w-10 h-10 rounded-full bg-[#214a78] text-white flex items-center justify-center hover:bg-[#1a3b66] transition-colors"
              >
                <span  className="font-bold">yt</span>
              </a> */}
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div  className="w-full md:w-7/12 p-6">
          <h3  className="text-xl font-semibold text-gray-800 mb-2">
            Get In Touch
          </h3>
          <p  className="text-gray-600 text-sm mb-6">
            Fill out the form below, and our team will get back to you within 24
            hours.
          </p>

          {submitStatus.status && (
            <div
               className={`mb-6 p-4 rounded ${
                submitStatus.status === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              <div  className="flex items-center">
                {submitStatus.status === "success" ? (
                  <FiCheckCircle  className="h-5 w-5 mr-2" />
                ) : (
                  <FiXCircle  className="h-5 w-5 mr-2" />
                )}
                <p>{submitStatus.message}</p>
              </div>
            </div>
          )}

          <div  className="mb-5">
            <label
              htmlFor="name"
               className="flex items-center text-sm text-gray-700 mb-2"
            >
              <FiUser  className="mr-2 h-4 w-4 text-[#214a78]" />
              Full Name <span  className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#214a78]"
              placeholder="Your full name"
              required
            />
          </div>

          <div  className="mb-5">
            <label
              htmlFor="email"
               className="flex items-center text-sm text-gray-700 mb-2"
            >
              <FiMail  className="mr-2 h-4 w-4 text-[#214a78]" />
              Email Address <span  className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#214a78]"
              placeholder="Your email address"
              required
            />
          </div>

          <div  className="mb-5">
            <label
              htmlFor="message"
               className="flex items-center text-sm text-gray-700 mb-2"
            >
              <FiMessageSquare  className="mr-2 h-4 w-4 text-[#214a78]" />
              Message <span  className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#214a78]"
              placeholder="Your message here..."
              required
            ></textarea>
          </div>

          <div  className="mb-6">
            <label  className="flex items-center text-sm text-gray-700 mb-2">
              <FiPaperclip  className="mr-2 h-4 w-4 text-[#214a78]" />
              Attachment
            </label>

            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              name="file-upload"
               className="hidden"
              onChange={handleFileChange}
            />

            {!fileName ? (
              <div
                onClick={triggerFileInput}
                 className="border border-dashed border-gray-300 rounded py-6 px-4 text-center hover:bg-gray-50 cursor-pointer"
              >
                <div  className="mx-auto h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                  <FiPaperclip  className="h-6 w-6 text-[#214a78]" />
                </div>
                <p  className="text-sm text-[#214a78] font-medium">
                  Click to upload a file{" "}
                  <span  className="text-gray-500 font-normal">
                    or drag and drop
                  </span>
                </p>
                <p  className="text-xs text-gray-500 mt-1">
                  PNG, JPG, PDF up to 5MB
                </p>
              </div>
            ) : (
              <div  className="flex items-center justify-between p-3 border border-gray-200 rounded bg-gray-50">
                <div  className="flex items-center">
                  <FiPaperclip  className="h-5 w-5 text-[#214a78] mr-3" />
                  <span  className="text-sm text-gray-700">{fileName}</span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                   className="text-gray-400 hover:text-red-500"
                >
                  <FiXCircle  className="h-5 w-5" />
                </button>
              </div>
            )}

            {fileError && (
              <p  className="mt-1 text-sm text-red-600 flex items-center">
                <FiXCircle  className="h-4 w-4 mr-1" />
                {fileError}
              </p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
             className="w-full flex justify-center items-center py-3 bg-[#214a78] text-white font-medium rounded hover:bg-[#1a3b66] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <FiLoader  className="animate-spin h-5 w-5 mr-2" />
                Sending...
              </>
            ) : (
              <>
                <FiSend  className="h-5 w-5 mr-2" />
                Submit Message
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
