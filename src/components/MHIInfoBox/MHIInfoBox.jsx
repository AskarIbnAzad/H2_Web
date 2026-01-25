import { useNavigate } from "react-router-dom";

const MHIInfoBox = () => {
    const navigate = useNavigate();
    return (
        <div className="border border-[#FBEAB3] bg-[#FFFEFC] p-3 sm:p-4 rounded-md text-gray-700 text-xs sm:text-sm">
            <p className="text-[#222] font-[Plus Jakarta Sans] text-[13px] sm:text-[16px] leading-normal">
                As a science-based organization, MHI provides access to scientific literature on molecular hydrogen.
                Inclusion in the MHI Database does not imply endorsement of, or agreement with, the content by MHI or its affiliates.
                The database is intended for informational purposes only and should not be interpreted as medical or professional advice.
            </p>
            <p className="mt-2 text-[#222] font-[Plus Jakarta Sans] text-[13px] sm:text-[16px] leading-normal">
                Learn more:{" "}
                <a href="https://molecularhydrogeninstitute.org/disclaimer/" target="_blank" className="text-[#346896] cursor-pointer text-[13px] sm:text-[16px] leading-normal underline decoration-solid decoration-[#346896] decoration-auto underline-offset-auto">MHI Disclaimer</a> |{" "}
                <a href="#" className="text-[#346896] text-[13px] sm:text-[16px] leading-normal underline decoration-solid decoration-[#346896] decoration-auto underline-offset-auto">MHI Copyright Notice</a>
            </p>
        </div>
    );
};

export default MHIInfoBox;
