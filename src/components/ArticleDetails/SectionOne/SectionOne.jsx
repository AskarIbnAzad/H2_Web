import React, { useState } from 'react'
import Tag from '../../Tag/Tag'
import inReviewImage from "../../../assets/images/inReview.png"
import VerifyImage from "../../../assets/images/verify.png"
import StarImage from "../../../assets/images/star.png"
import MhidImage from "../../../assets/images/mhid.png"
import PmidImage from "../../../assets/images/pmid.png"
import VerifiedIcon from '../../VerifiedIcon/VerifiedIcon'
import { useNavigate } from 'react-router-dom'

const SectionOne = ({ data }) => {
    const FirstSectionData = data?.publicData
    const navigate = useNavigate()

    // const inReview = data?.status === "Unverified" ? inReviewImage : data?.status === "Draft" ? inReviewImage : data?.status === "'In Review" ? inReviewImage : VerifyImage
    const highlight = data?.articleGeneralData?.HighlightArticle
    const studyType = data?.articleGeneralData?.studyType
    const outcomeType = data?.articleGeneralData?.outcomeType
    const rankThisArticle = data?.articleGeneralData?.rankThisArticle
    const descHighArt = data?.articleGeneralData?.descHighArt
    const outcome = data?.articleGeneralData?.outcome

    const [showMore, setShowMore] = useState(false);



    return (
        <div>
            <div  className='flex flex-wrap items-center gap-1 '>

                {/* status */}
                <div  className="relative group inline-block">
                    {/* Verified Tag */}
                    {data?.status === "Verified" ? (
                        <div  className="relative">
                            <VerifiedIcon cursor={"pointer"} onClick={() => navigate("/VerifiedTagPage")} />
                            {/* Hover Tooltip */}
                            <div
                                 className="absolute left-0  top-0  px-4 py-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                This article has been reviewed and verified for credibility, accuracy, and relevance by the MHI team or an expert contributor.
                            </div>
                        </div>
                    ) : (
                        <div  className="relative">
                            <img
                                src={inReviewImage}
                                alt="In Review Tag"
                            />
                            {/* Hover Tooltip */}
                            <div
                                 className="absolute left-0  top-0 px-4 py-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                style={{ whiteSpace: "nowrap" }}
                            >
                                This article is currently under review and will be updated upon completion of the evaluation process.
                            </div>
                        </div>

                    )}
                </div>

                {/* highlight  */}
                {
                    highlight && <div>
                        <img src={StarImage} alt="StarImage" />
                    </div>
                }
                {/* Year */}
                {FirstSectionData?.year && <Tag label={FirstSectionData?.year} />}

                {/* Study Type */}
                {studyType?.length > 0 &&
                    studyType?.map((item, index) => {
                        return <Tag label={item} key={index} />
                    })
                }

            </div>



            {/* MHID && DOI && Volume && Pages && Journal */}
            <div  className='flex gap-6  text-1xl mt-5 flex-wrap'>

                {data?.mhid && <div  className='flex items-center gap-1'>
                    <span>
                        <img src={MhidImage} alt="MhidImage" />
                    </span>
                    <span  className='font-bold mr-1'>MHID:</span>
                    <span>{data?.mhid?.split("-")[1]}</span>
                </div>}

                {FirstSectionData?.pmid && <div  className='flex items-center gap-1'>
                    <span>
                        <img src={PmidImage} alt="PmidImage" />
                    </span>
                    <span  className='font-bold mr-1'>PMID:</span>
                    <span>{FirstSectionData?.pmid}</span>
                </div>}

                {FirstSectionData?.doi && <div>
                    <span  className='font-bold mr-1'>DOI:</span>
                    <span  className='text-[#346896] underline cursor-pointer'>{FirstSectionData?.doi}</span>
                </div>}

                {FirstSectionData?.journal && <div>
                    <span  className='font-bold mr-1'>Journal:</span>
                    <a  className='text-[#346896] underline cursor-pointer ' style={{ textDecoration: 'none' }} href={FirstSectionData?.journalURL}>{FirstSectionData?.journal}</a>
                </div>}
            </div>

            {/* Title */}
            {FirstSectionData?.title && <h1 className="text-black font-plus-jakarta-sans text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-normal mt-5">
                {FirstSectionData?.title}
            </h1>}

            {/* Aurthors */}
            {FirstSectionData?.authors?.length > 0 && <ul  className='flex gap-2 text-[#346896] text-1xl mt-5 flex-wrap'>
                <li>
                    <span>
                        {FirstSectionData?.authors
                            ? FirstSectionData?.authors.map((author, index) => (
                                <span key={index}>
                                    {author.name}
                                    {index < FirstSectionData?.authors.length - 1 && ", "}
                                </span>
                            ))
                            : "N/A"}
                    </span>,
                </li>

            </ul>}

            {/* Outcome */}
            <div  className="w-full mt-7 flex flex-wrap flex-col md:flex-row justify-between items-start gap-4">

                {outcome && <div  className="flex-1 max-w-[100%] md:max-w-[60%] ">
                    <p  className="text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px]">Outcome</p>
                    <p  className="text-[#767676] text-sm mt-1">
                        {outcome}
                    </p>
                </div>}

                {outcomeType?.length > 0 && <div  className=''>
                    <p  className="text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px]">Outcome</p>
                    <span  className='inline-flex px-4 py-2 justify-center items-center gap-2 rounded-md bg-[#E8F1E5] text-[#579600] font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px]'>
                        {outcomeType?.join(', ')}
                    </span>
                </div>}

            </div>

            {/* Ranking  */}
            <div  className="w-full mt-7 flex flex-wrap flex-col md:flex-row justify-between items-start gap-4">

                {/* Left Section: Why this article is starred */}
                {descHighArt && (
                    <div  className="flex-1 max-w-[100%] md:max-w-[60%] ">
                        <p  className="text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px] flex items-center">
                            Why this article is starred
                            <span  className="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                                    <path d="M7 0L8.5716 4.83688H13.6574L9.5429 7.82624L11.1145 12.6631L7 9.67376L2.8855 12.6631L4.4571 7.82624L0.342604 4.83688H5.4284L7 0Z" fill="#346896" />
                                </svg>
                            </span>
                            ?
                        </p>
                        <p  className="text-[#767676] text-sm mt-1">{descHighArt}</p>
                    </div>
                )}

                {/* Right Section: Ranking */}
                <div  className="">
                    <div>
                        <p  className="text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px]">Ranking</p>
                        <span  className="inline-flex px-4 py-2 justify-center items-center gap-2 rounded-md bg-[#E5EDF1] font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
                                <path d="M9.5 4H13.5V8" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M13.5 4L7.85 9.65C7.75654 9.74161 7.63088 9.79293 7.5 9.79293C7.36912 9.79293 7.24346 9.74161 7.15 9.65L4.85 7.35C4.75654 7.25839 4.63088 7.20707 4.5 7.20707C4.36912 7.20707 4.24346 7.25839 4.15 7.35L0.5 11" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            {rankThisArticle ? rankThisArticle : 50}
                        </span>
                    </div>
                </div>
            </div>



            {/* Abstract */}
            {FirstSectionData?.abstract && <div>
                <div  className='text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[20px] mt-7'>Abstract</div>
                <p  className={`text-1xl text-[#767676] mt-4 font-normal ${showMore ? '' : 'line-clamp-3'}`}>
                    {FirstSectionData?.abstract}
                </p>
                <button onClick={() => setShowMore(!showMore)}  className="text-[#346896] font-plus-jakarta-sans text-[12px] font-medium underline decoration-solid decoration-skip-ink-none">
                    {showMore ? 'See Less' : 'See More'}
                </button>
            </div>}

            {/* Status */}

            <div  className='flex gap-8 mt-7'>
                <div  className='flex items-center gap-2'>
                    <span>
                        <img src={inReviewImage} alt="inReviewImage" />
                    </span>
                    <span  className='text-[#132B38] font-plus-jakarta-sans text-sm font-bold'>
                        In Review
                    </span>
                </div>

                <div  className='flex items-center gap-2'>
                    <span>
                        {/* <img src={VerifyImage} alt="VerifyImage" /> */}
                        <VerifiedIcon />
                    </span>
                    <span  className='text-[#132B38] font-plus-jakarta-sans text-sm font-bold'>
                        Verified
                    </span>
                </div>

            </div>
        </div>
    )
}

export default SectionOne
