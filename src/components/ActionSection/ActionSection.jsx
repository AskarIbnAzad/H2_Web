import React, { useState } from "react";
import { FaDownload, FaCopy } from "react-icons/fa";
import { IoClose, IoEye } from "react-icons/io5";
import { FaFacebookSquare, FaReddit, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { success_toast_message } from "../../utils/toast_message";
import { useNavigate } from "react-router-dom";


const generateXML = (data) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<article>
  <id>${data.id}</id>
  <mhid>${data.mhid}</mhid>
  <doi>${data.doi}</doi>
  <pmid>${data.pmid}</pmid>
  <title>${data.publicData.title}</title>
  <authors>${data.publicData.authors}</authors>
  <year>${data.publicData.year}</year>
  <journal>${data.publicData.journal}</journal>
  <volume>${data.publicData.volume}</volume>
  <pages>${data.publicData.pages}</pages>
  <abstract>${data.publicData.abstract}</abstract>
  <publisher>${data.publicData.publisher}</publisher>
  <impactFactor>${data.publicData.impactFactor}</impactFactor>
  <hIndex>${data.publicData.HIndex}</hIndex>
  <sciMAGO>${data.publicData.sciMAGO}</sciMAGO>
  <country>${data.publicData.country.join(', ')}</country>
  <grantCountry>${data.publicData.grantCountry}</grantCountry>
  <researchCountry>${data.publicData.researchCountry.join(', ')}</researchCountry>
  <outcome>${data.articleGeneralData.outcome}</outcome>
  <studyType>${data.articleGeneralData.studyType.join(', ')}</studyType>
  <species>${data.articleGeneralData.species.join(', ')}</species>
  <diseaseModel>${data.articleGeneralData.diseaseModel}</diseaseModel>
  <system>${data.articleGeneralData.system.join(', ')}</system>
  <organ>${data.articleGeneralData.organ.join(', ')}</organ>
  <biomarkers>
    ${data.biomaker.map(marker => `
      <biomarker>
        <marker>${marker.marker}</marker>
        <category>${marker.category.join(', ')}</category>
        <change>${marker.Change.join(', ')}</change>
        <protein>${marker.Protein}</protein>
      </biomarker>`).join('')}
  </biomarkers>
</article>`;
};

const Modal = ({ onClose, children }) => {
    return (
        <div  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div  className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
                <button
                     className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <IoClose size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

import { citationFormats, generateXML } from "../../utils/citationFormats";
import Modal from "../Modal";
import { success_toast_message } from "../../utils/toast_message";

const ActionSection = ({ data, goToChat, setSearchParams }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState("NLM");

    const handleDownload = () => {
        const xmlContent = generateXML(data);
        const blob = new Blob([xmlContent], { type: "application/xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "citation.xml";
        link.click();
    };

    const handleCopy = () => {
        const citation = citationFormats[selectedFormat]({
            ...data?.publicData,
            articleData: data
        });
        navigator.clipboard.writeText(citation);
        success_toast_message("Citation copied to clipboard!");
    };

    return (
        <div  className="p-4">
            <div  className="mb-6">
                <h3 className="text-xl font-bold text-black mb-10">Action</h3>
                <div  className="space-y-3">
                    <button
                         className="w-full border border-[#346896] text-[#000000] py-2 px-4 rounded-md text-center font-medium hover:bg-[#f0f8ff]"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Cite
                    </button>
                    {data?.publicData?.pdf_url && <button onClick={() => window.open(`/ArticleDetails/${data?.mhid}/view-pdf`, "_blank")}  className="w-full border border-[#346896] text-[#000000] py-2 px-4 rounded-lg text-center font-medium flex justify-center items-center hover:bg-[#f0f8ff]">
                        <span  className="mr-1">
                            <IoEye color="#346896" size={20} />
                        </span>
                        View PDF
                    </button>}
                </div>
            </div>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <div  className="p-6">
                        <h2  className="text-xl font-bold mb-4">Cite this article</h2>
                        <div  className="mb-4">
                            <label  className="block text-sm font-medium text-gray-700">Select Format</label>
                            <select
                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#346896] focus:border-[#346896]"
                                value={selectedFormat}
                                onChange={(e) => setSelectedFormat(e.target.value)}
                            >
                                {Object.keys(citationFormats).map((format) => (
                                    <option key={format} value={format}>
                                        {format}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div  className="bg-gray-100 p-4 rounded-md shadow-inner">
                            <p  className="text-sm text-gray-700 whitespace-pre-wrap">
                                {citationFormats[selectedFormat]({
                                    ...data?.publicData,
                                    articleData: data
                                    
                                })}
                            </p>
                        </div>
                        <div  className="mt-4 flex justify-between items-center">
                            <button
                                 className="bg-[#346896] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-[#245a78]"
                                onClick={handleCopy}
                            >
                                <FaCopy />
                                <span>Copy</span>
                            </button>
                            <button
                                 className="bg-[#346896] text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-[#245a78]"
                                onClick={handleDownload}
                            >
                                <FaDownload />
                                <span>Download .xml</span>
                            </button>
                            <button
                                 className="text-sm text-[#346896] hover:underline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Share Section */}
            <div  className="mb-6">
                <h3 className="text-xl font-bold text-black mb-4 mt-10">Share</h3>
                <div  className="flex space-x-3 justify-center">
                    <FaFacebookSquare size={40}  className="cursor-pointer" color="#346896" />
                    <FaReddit size={40}  className="cursor-pointer" color="#346896" />
                    <RiInstagramFill size={40}  className="cursor-pointer" color="#346896" />
                </div>
                <div  className="flex space-x-3 justify-center mt-2">
                    <FaXTwitter size={40}  className="cursor-pointer" color="#346896" />
                    <FaLinkedin size={40}  className="cursor-pointer" color="#346896" />
                    <IoShareSocial size={40}  className="cursor-pointer" color="#346896" />
                </div>
            </div>

            {/* Contribute Button */}
            <div>
                <button onClick={() => navigate("/ContributeArticlePage")}  className="w-full text-sm bg-[#346896] text-white py-3 px-3 rounded-full text-center font-medium hover:bg-[#245a78]">
                    Contribute This Article
                </button>
            </div>
        </div>
    );
};

export default ActionSection;


