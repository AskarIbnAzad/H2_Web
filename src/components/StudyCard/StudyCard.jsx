// import React from "react";
// import Tag from "../Tag/Tag";

// const StudyCard = ({ study, onClick }) => {


//     const studyType = study?.articleGeneralData?.studyType || [];

//     const tags = [
//         ...studyType,
//     ];

//     return (
//         <div  className="bg-white mb-6 cursor-pointer" onClick={onClick}>
//             <div  className="inline-block text-sm text-[#132B38] mb-2 rounded-full bg-[rgba(0,76,120,0.10)] px-5 py-2">
//                 {study?.articleGeneralData?.ReviewStudyType}
//             </div>


//             <h2  className="text-[#004C78] font-semibold mb-2 text-xl sm:text-1xl md:text-2xl lg:text-2xl xl:text-2xl">
//                 {study?.publicData?.title}
//             </h2>

//             <p  className="sm:text-1xl md:text-1xl lg:text-1xl xl:text-1xl text-[#767676] mb-4">{study?.publicData?.abstract}</p>

//             <div  className="flex flex-wrap gap-2 mb-4">
//                 {tags?.map((tag, index) => (
//                     <Tag key={index} label={tag} />
//                 ))}
//             </div>
//             <div  className="text-1xl text-[#343434">Year Published: {study.publicData?.year}</div>
//             <hr  className="mt-4" />
//         </div>
//     );
// };

// export default StudyCard;

import React from "react";
import inReviewImage from "../../assets/images/inReview.png"
import VerifyImage from "../../assets/images/verify.png"
import VerifiedIcon from "../VerifiedIcon/VerifiedIcon";
import MhidImage from "../../assets/images/mhid.png";
import { useNavigate } from "react-router-dom";
const StudyCard = ({ study, onClick }) => {
    const navigate = useNavigate()
    const abstractText = study?.publicData?.abstract?.name || "";
    const truncatedAbstract = abstractText.length > 300 ? `${abstractText.slice(0, 300)}...` : abstractText;
    // const inReview = study?.status === "Unverified" ? inReviewImage : study?.status === "Draft" ? inReviewImage : study?.status === "'In Review" ? inReviewImage : VerifyImage

    console.log("study", study?.publicData?.journal?.name);

    // Function to handle author click
    const handleAuthorClick = (author, event) => {
        // Prevent the card click event from firing
        event.stopPropagation();

        // Navigate to articles page with author filter using ID
        const authorId = author.id || author.name; // Fallback to name if no ID
        navigate(`/articles?authors=${encodeURIComponent(authorId)}`);
    };

    return (
        <div className="bg-white mb-6  p-6 " >
            {/* Title */}
            <h2 className="text-[#004C78] font-bold text-2xl mb-2 cursor-pointer" onClick={onClick}>
                {study?.publicData?.title?.name || "Untitled Study"}
            </h2>

            {/* Authors */}
            {/* <p className="text-[#767676] text-sm mb-2 font-medium">
                {study?.publicData?.authors
                    ? study?.publicData?.authors.map((author, index) => (
                        <span key={index}>
                            {author.name}
                            {index < study?.publicData?.authors.length - 1 && ", "}
                        </span>
                    ))
                    : "N/A"}
            </p> */}
            <p className="text-[#767676] text-sm mb-2 font-medium">
                {study?.publicData?.authors
                    ? study?.publicData?.authors.map((author, index) => (
                        <span key={index}>
                            <button
                                onClick={(e) => handleAuthorClick(author, e)}
                                className="text-[#346896] hover:text-[#2a5478] hover:underline transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 font-medium"
                                title={`View articles by ${author.name}`}
                            >
                                {author.name}
                            </button>
                            {index < study?.publicData?.authors.length - 1 && (
                                <span className="text-[#767676]">, </span>
                            )}
                        </span>
                    ))
                    : "N/A"}
            </p>

            {/* Date, DOI, PMID */}
            <div className="flex flex-wrap items-center text-[#767676] text-sm mb-4">
                <span className="mr-4">Year: {study?.publicData?.year?.name || "N/A"}</span>
                {/* {study?.publicData?.doi?.name && (
                    <span className="mr-4">
                        DOI: <a href={`https://doi.org/${study?.publicData?.doi?.name}`} target="_blank" className="text-blue-600 underline">{study?.publicData?.doi?.name}</a>
                    </span>
                )} */}
                {study?.publicData?.journal?.name && (
                    <div className="flex items-center gap-1 mr-4">
                        journal: <a className="text-[#767676]">{study?.publicData?.journal?.name}</a>
                    </div>
                )}

                {study?.mhid && (
                    <div className="flex items-center gap-1 mr-4 cursor-pointer hover:underline" onClick={onClick}>
                        <span>
                            <img src={MhidImage} alt="MhidImage" />
                        </span>
                        <span className="font-bold mr-1 ">MHID:</span>
                        <span>{study?.mhid?.split("-")[1]}</span>
                    </div>
                )}

                {/* {study?.publicData?.pmid?.name && (
                    <span className="mr-4">
                        PMID: <a className="text-[#767676] underline">{study.publicData.pmid?.name}</a>
                    </span>
                )} */}

                {study?.publicData?.pmid?.name && (
                    <div className="flex items-center gap-1 mr-4">
                        <span>
                            <img src={MhidImage} alt="MhidImage" />
                        </span>
                        {/* <span className="font-bold mr-1">MHID:</span>
                        <span>{study?.mhid?.split("-")[1]}</span> */}
                        PMID: <a className="text-[#767676]">{study.publicData.pmid?.name}</a>
                    </div>
                )}



                {/* {study?.status && (
                    <span  className="mr-4">
                        <div>
                            {study?.status === "Verified" ? (
                                <VerifiedIcon />
                            ) : (
                                <img
                                    src={inReviewImage}
                                    alt="In Review Tag"
                                />
                            )}
                        </div>
                    </span>
                )} */}

            </div>

            {/* Abstract */}
            {/* <p  className="text-[#767676] text-base mb-4 line-clamp-4" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {truncatedAbstract}
            </p> */}
            {truncatedAbstract?.includes("<") &&
                truncatedAbstract?.includes(">") ? (
                <div
                    className="text-[#767676] text-base mb-4 line-clamp-4" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}
                    //   style={{ lineHeight: "170%" }}
                    dangerouslySetInnerHTML={{ __html: truncatedAbstract }}
                />
            ) : (
                <p
                    className="text-[#767676] text-base mb-4 line-clamp-4" style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}
                //   style={{ lineHeight: "170%" }}
                >
                    {truncatedAbstract}
                </p>
            )}

            <hr className="mt-4" />
        </div>
    );
};

export default StudyCard;
