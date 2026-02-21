import { useState } from "react";
import Accordion from "../../Accordion/Accordion";
import ResearchFocusSection from "../ResearchFocusSection/ResearchFocusSection";
import ConcentrationCard from "../../ConcentrationCard/ConcentrationCard";
import BiomarkerSection from "../../BiomarkerSection/BiomarkerSection";



const SectionTwo = (sectionData) => {
    const SectionTwoData = sectionData?.sectionData?.articleGeneralData
    const SectionThreeData = sectionData?.sectionData?.researcherData
    const SectionFourData = sectionData?.sectionData?.biomaker

    const [selectedStudyType, setSelectedStudyType] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const getStudyDetails = () => {
        if (SectionTwoData?.studyType?.length > 0 && selectedStudyType < SectionTwoData.studyType.length) {
            const selectedType = SectionTwoData.studyType[selectedStudyType];
            switch (selectedType) {
                case "in Vivo":
                    return (
                        <>

                            {
                                SectionTwoData?.inVivo?.includes("Human Study") && (
                                    <div  className="">
                                        {/* Human Study Heading */}
                                        <div  className="">
                                            <h3  className="text-[#346896] font-plus-jakarta-sans text-[32px] font-medium leading-normal">Human Study</h3>
                                        </div>
                                        {/* Human Study Content */}
                                        <div  className="grid grid-cols-2 w-full items-start mt-5">
                                            {/* Clinical Trial Design */}
                                            <div  className=''>
                                                <p  className="text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px] mb-2">Clinical Trial Design</p>
                                                <div  className="flex flex-wrap items-center gap-1">
                                                    {SectionTwoData?.clinicalTrialDesign?.map((elem, index) => {

                                                        return <span
                                                            key={index}
                                                             className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm"
                                                        >
                                                            {elem}
                                                        </span>
                                                    })}
                                                </div>

                                            </div>
                                            {/* Observational Study */}

                                            {SectionTwoData?.observationalStudy && <div  className=''>
                                                <p  className="text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px] mb-2">Observational Study</p>
                                                <div  className="flex flex-wrap items-center gap-1">
                                                    {SectionTwoData?.observationalStudy?.map((elem, index) => {

                                                        return <span
                                                            key={index}
                                                             className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm"
                                                        >
                                                            {elem}
                                                        </span>
                                                    })}
                                                </div>

                                            </div>}

                                        </div>


                                        {/* Duration of Study */}
                                        <div  className="mt-4">
                                            <p  className="text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px] mb-2">Duration of Study</p>
                                            <span
                                                 className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm"
                                            >
                                                {SectionTwoData?.durationOfStudy} {SectionTwoData?.studyDurationUnit ? SectionTwoData?.studyDurationUnit : "Weeks"}
                                            </span>


                                        </div>

                                        {/* Render details of otherClinicalStudy */}
                                        {/* <div  className="mt-2 text-gray-700 text-sm">
                                            <p  className="text-[#132B38] text-sm font-extrabold">Other</p>
                                            <p>{SectionTwoData?.otherClinicalStudy}</p>
                                        </div> */}
                                    </div>
                                )
                            }
                            {
                                SectionTwoData?.inVivo?.includes("Animal Study") && (
                                    <div>
                                        {/* Animal Study Heading */}
                                        <div  className="">
                                            <h3  className="text-[#346896] font-plus-jakarta-sans text-[32px] font-medium leading-normal">Animal Study</h3>
                                        </div>

                                        {/* Duration of Study */}
                                        <div  className="mt-4">
                                            <p  className="text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px] mb-2">Duration of Study</p>
                                            <span  className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">
                                                {SectionTwoData?.durationOfStudy} {SectionTwoData?.studyDurationUnit ? SectionTwoData?.studyDurationUnit : "Weeks"}
                                            </span>
                                        </div>
                                    </div>
                                )
                            }


                        </>
                    );
                case "In Vitro":
                    return (
                        <>

                            <p  className="text-[#132B38] text-sm font-extrabold">Cell</p>
                            <p  className="text-[#767676]">{SectionTwoData?.WhatKindCell} are used in this study</p>

                            <div  className="mt-4">
                                <p  className="text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px] mb-2">Duration of Study</p>
                                <span
                                     className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm"
                                >
                                    {SectionTwoData?.durationOfStudyinVitro} {SectionTwoData?.studyDurationUnit ? SectionTwoData?.studyDurationUnit : "Weeks"}
                                </span>


                            </div>
                        </>
                    );
                case "Ex Vivo":
                    return (
                        <>
                            <p  className="text-[#132B38] text-sm font-extrabold">Cell/Tissue</p>
                            <p  className="text-[#767676]">{SectionTwoData?.WhatCellTissueUsed} are used in this study</p>

                            <div  className="mt-4">
                                <p  className="text-left text-black font-plus-jakarta-sans font-bold text-lg sm:text-xl md:text-[15px] mb-2">Duration of Study</p>
                                <span
                                     className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm"
                                >
                                    {SectionTwoData?.durationOfStudyExVivo} {SectionTwoData?.studyDurationUnit ? SectionTwoData?.studyDurationUnit : "Weeks"}
                                </span>


                            </div>
                        </>
                    );
                case "Non-experimental":
                    return (
                        <>

                            {SectionTwoData?.ReviewStudyType && <div>
                                <p  className="text-[#132B38] text-sm font-extrabold">Review Study Type</p>
                                <span
                                     className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm mt-2"
                                >
                                    {SectionTwoData?.ReviewStudyType}
                                </span>
                            </div>}

                            {SectionTwoData?.OpinionPiece && <div>
                                <p  className="text-[#132B38] text-sm font-extrabold">Opinion Piece</p>
                                <p  className="text-[#767676]">{SectionTwoData?.OpinionPiece}</p>
                            </div>}

                            {SectionTwoData?.Hypothesis && <div>
                                <p  className="text-[#132B38] text-sm font-extrabold">Hypothesis</p>
                                <p  className="text-[#767676]">{SectionTwoData?.Hypothesis}</p>
                            </div>}

                            {SectionTwoData?.TherapeuticDeliverySystems && <div>
                                <p  className="text-[#132B38] text-sm font-extrabold">Therapeutic Delivery Systems</p>
                                <p  className="text-[#767676]">{SectionTwoData?.TherapeuticDeliverySystems}</p>
                            </div>}

                        </>
                    );
                case "Other":
                    return (
                        <>
                            {SectionTwoData?.Other && <div>
                                <p  className="text-[#132B38] text-sm font-extrabold">Describe Study Type</p>
                                <p  className="text-[#767676]">{SectionTwoData?.Other}</p>
                            </div>}
                        </>
                    );
                case "Chemical/Physicochemical Study":
                case "In Silico":
                case "Clinical Trial":
                case "Observational Study":
                    return null;
                default:
                    return (
                        <>
                            <p  className="text-[#132B38] text-sm font-extrabold">Duration of Study</p>
                            <p  className="text-gray-700">1 Week</p>
                        </>
                    );
            }
        } else {
        }


    };

    const handleExpandAll = () => {
        setIsOpen(true);
    };

    const handleCollapseAll = () => {
        setIsOpen(false);
    };

    const renderHydrogenAdministrationDetails = () => {
        if (!SectionThreeData?.speciesData) {
            // Handle the case when speciesData is missing and direct researcherData is used
            const methods = SectionThreeData?.methodOfAdmin || [];
            const volumes = SectionThreeData?.volumes || [];
            const concentrations = SectionThreeData?.concentrations || [];
            const absoluteDoses = SectionThreeData?.absoluteDoses || [];
            const relativeDoses = SectionThreeData?.relativeDoses || [];
            const weight = SectionThreeData?.bodyWeight;
            const inhalationData = SectionThreeData?.inhalationConcentrations || [];
            const wasOxyhydrogenUsed = SectionThreeData?.wasOxyhydrogenUsed || "N/A";


            // Prepare concentration data for ConcentrationCard component
            const concentrationData = volumes.map((volume, index) => ({
                title: `${index + 1} Concentration`,
                details: {
                    volume: `${volume.value} ${volume.unit}`,
                    concentration: `${concentrations[index]?.value || "N/A"} ${concentrations[index]?.unit || "N/A"}`,
                    absoluteDose: `${absoluteDoses[index]?.value || "N/A"} ${absoluteDoses[index]?.unit || "N/A"}`,
                    relativeDose: `${relativeDoses[index]?.value || "N/A"} ${relativeDoses[index]?.unit || "N/A"}`,
                    weight: `${weight} Kg`,
                },
            }));

            const [selectedMethod, setSelectedMethod] = useState(methods[0] || "");

            return (
                <div  className="mb-10">
                    <div  className="text-left text-black font-plus-jakarta-sans font-normal text-lg sm:text-xl md:text-[20px]">
                        Methods of Administration (Weight: {weight} kg)
                    </div>

                    <div  className="pt-4">
                        <p  className="text-[#132B38] text-sm font-extrabold">Method of Administration</p>
                        {methods.map((method, index) => (
                            <span
                                key={index}
                                onClick={() => setSelectedMethod(method)}
                                 className={`text-[12px] inline-flex px-4 py-2 ml-2 mt-2 cursor-pointer rounded-lg border ${selectedMethod === method ? "bg-[#132B38] text-white" : "bg-white text-black"}`}
                            >
                                {method}
                            </span>
                        ))}
                    </div>

                    {selectedMethod === "Oral Hydrogen Water" || selectedMethod === "Gavage" ? (
                        <div  className="mt-4">
                            <ConcentrationCard data={concentrationData} />
                        </div>
                    ) : null}

                    {selectedMethod === "Inhalation" && (
                        <>
                            {inhalationData.length > 0 && (
                                <>
                                    <div  className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2 ">
                                        {inhalationData?.map((inhale, index) => {

                                            return <div
                                                key={index}
                                                 className="bg-white rounded-lg shadow-md w-full"
                                            >
                                                {/* Header */}
                                                <div  className="flex justify-between items-center bg-[#346896] rounded-lg">
                                                    <p  className="text-sm sm:text-lg font-semibold text-white px-4 py-2 ">
                                                        Concentration {index + 1}
                                                    </p>
                                                </div>

                                                {/* Details Section */}
                                                <div
                                                     className={`details-section expanded px-4 py-4`}
                                                >
                                                    <div  className="mt-4 space-y-4">
                                                        <div  className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div className="w-full">
                                                                <p  className="text-[#132B38] text-sm font-extrabold mb-2">
                                                                    Percent Purity
                                                                </p>
                                                                <p  className="text-[12px] w-full sm:w-32 px-3 py-2 rounded-lg text-center"
                                                                    style={{
                                                                        backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                                                        color: "rgba(19, 43, 56, 1)"
                                                                    }}>
                                                                    {inhale.percentPurity}
                                                                </p>
                                                            </div>
                                                            <div className="w-full">
                                                                <p  className="text-[#132B38] text-sm font-extrabold mb-2">
                                                                    Flow Rate
                                                                </p>
                                                                <p  className="text-[12px] w-full sm:w-32 px-3 py-2 rounded-lg text-center"
                                                                    style={{
                                                                        backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                                                        color: "rgba(19, 43, 56, 1)"
                                                                    }}>
                                                                    {inhale.flowRate} {inhale.unitFlowRate}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div  className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div className="w-full">
                                                                <p  className="text-[#132B38] text-sm font-extrabold mb-2">
                                                                    Frequency
                                                                </p>
                                                                <p  className="text-[12px] w-full sm:w-32 px-3 py-2 rounded-lg text-center"
                                                                    style={{
                                                                        backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                                                        color: "rgba(19, 43, 56, 1)"
                                                                    }}>
                                                                    {inhale.frequency}
                                                                </p>
                                                            </div>
                                                            <div className="w-full">
                                                                <p  className="text-[#132B38] text-sm font-extrabold mb-2">
                                                                    Duration
                                                                </p>
                                                                <p  className="text-[12px] w-full sm:w-32 px-3 py-2 rounded-lg text-center"
                                                                    style={{
                                                                        backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                                                        color: "rgba(19, 43, 56, 1)"
                                                                    }}>
                                                                    {inhale.duration} {inhale.unitDuration}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {/* <div>
                                <p  className="text-[#132B38] text-sm font-extrabold">
                                    Weight of species
                                </p>
                                <p  className=" text-[12px] w-32 px-3 py-2 rounded-lg text-center mt-2"
                                    style={{
                                        backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                        color: "rgba(19, 43, 56, 1)"
                                    }}>
                                    {card.details.weight}
                                </p>
                            </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </div>

                                </>
                            )}
                            <div  className="mt-4">
                                <div  className="flex flex-col">
                                    <p  className="text-[#132B38] text-sm font-extrabold">Oxyhydrogen</p>
                                    <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm" style={{ width: '30%' }}>{wasOxyhydrogenUsed}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {selectedMethod === "Ingestion of H2-producing bacteria" && (
                        <div  className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Peak Breath Hydrogen</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.Peakbreathhydrogen}</p>
                            </div>
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Frequency</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.Frequency}</p>
                            </div>
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Ingestion Duration Frequency</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.IngestionDurationfrequency} {SectionThreeData?.unitDuration}</p>
                            </div>
                        </div>
                    )}

                    {selectedMethod === "Topical applications" && (
                        <div  className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Topical Method</p>
                                <p  className="bg-[#E5EDF1] inline-block text-center px-4 py-2 text-sm text-gray-700 rounded-md shadow-sm mt-2" style={{ maxWidth: '40%' }}>
                                    {SectionThreeData?.topical_how}
                                </p>
                            </div>
                        </div>
                    )}

                    {selectedMethod === "Cell Culture / Tissues" && (
                        <div  className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Concentration of Hydrogen Medium</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.concentrationOfHydrogenForMedium}</p>
                            </div>
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Frequency</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.FrequencyCellCultureTissues}</p>
                            </div>
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Duration per Frequency</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.DurationFrequencyCellCultureTissues}</p>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        return Object.keys(SectionThreeData?.speciesData || {}).map((species) => {
            // Safely access speciesDetails and speciesData
            const speciesDetail = SectionTwoData?.speciesDetails[species];
            const speciesDetailInhalation = SectionThreeData.speciesData[species] || {}; // Fix: Correct source

            const weight = speciesDetail?.averageWeight;

            const methods = SectionThreeData?.speciesData[species]?.methods || [];
            const volumes = SectionThreeData?.speciesData[species]?.volumes || [];
            const concentrations = SectionThreeData?.speciesData[species]?.concentrations || [];
            const absoluteDoses = SectionThreeData?.speciesData[species]?.absoluteDoses || [];
            const relativeDoses = SectionThreeData?.speciesData[species]?.relativeDoses || [];

            const inhalationData = speciesDetailInhalation?.inhalationConcentrations || [];
            const wasOxyhydrogenUsed = speciesDetailInhalation?.wasOxyhydrogenUsed || "N/A";

            // Prepare concentration data for ConcentrationCard component
            const concentrationData = volumes.map((volume, index) => ({
                title: `${index + 1} Concentration of ${species}`,
                details: {
                    volume: `${volume.value} ${volume.unit}`,
                    concentration: `${concentrations[index]?.value || "N/A"} ${concentrations[index]?.unit || "N/A"}`,
                    absoluteDose: `${absoluteDoses[index]?.value || "N/A"} ${absoluteDoses[index]?.unit || "N/A"}`,
                    relativeDose: `${relativeDoses[index]?.value || "N/A"} ${relativeDoses[index]?.unit || "N/A"}`,
                    weight: `${weight} Kg`,
                },
            }));

            const [selectedMethod, setSelectedMethod] = useState(methods[0] || "");


            return (
                <div key={species}  className="mb-10">
                    <div  className="text-left text-black font-plus-jakarta-sans font-normal text-lg sm:text-xl md:text-[20px]">
                        Methods of Administration For {species} (Weight of Species: {weight} kg)
                    </div>

                    <div  className="pt-4">
                        <p  className="text-[#132B38] text-sm font-extrabold">Method of Administration</p>
                        {methods.map((method, index) => (
                            <span
                                key={index}
                                onClick={() => setSelectedMethod(method)}
                                 className={`text-[12px] inline-flex px-4 py-2 ml-2 mt-2 cursor-pointer rounded-lg border ${selectedMethod === method ? "bg-[#132B38] text-white" : "bg-white text-black"}`}
                            >
                                {method}
                            </span>
                        ))}
                    </div>

                    {selectedMethod === "Oral Hydrogen Water" || selectedMethod === "Gavage" ? (
                        <div  className="mt-4">
                            <ConcentrationCard data={concentrationData} />
                        </div>
                    ) : null}

                    {selectedMethod === "Inhalation" && (
                        <>
                            {inhalationData.length > 0 && (
                                <>
                                    <div  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 ">
                                        {inhalationData?.map((inhale, index) => {

                                            return <div
                                                key={index}
                                                 className="bg-white rounded-lg shadow-md"
                                            >
                                                {/* Header */}
                                                <div  className="flex justify-between items-center bg-[#346896] rounded-lg">
                                                    <p  className="text-lg font-semibold text-white px-4 py-2 ">
                                                        {`${index + 1} Concentration of ${species}`}
                                                    </p>
                                                </div>

                                                {/* Details Section */}
                                                <div
                                                     className={`details-section expanded px-4 py-4`}
                                                >
                                                    <div  className="mt-4 space-y-2">
                                                        <div  className="grid grid-cols-2">
                                                            <div>
                                                                <p  className="text-[#132B38] text-sm font-extrabold">
                                                                    Percent Purity
                                                                </p>
                                                                <p  className=" text-[12px] w-32 px-3 py-2 rounded-lg text-center mt-2"
                                                                    style={{
                                                                        backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                                                        color: "rgba(19, 43, 56, 1)"
                                                                    }}>
                                                                    {inhale.percentPurity}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p  className="text-[#132B38] text-sm font-extrabold">
                                                                    Flow Rate
                                                                </p>
                                                                <p  className=" text-[12px] w-32 px-3 py-2 rounded-lg text-center mt-2"
                                                                    style={{
                                                                        backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                                                        color: "rgba(19, 43, 56, 1)"
                                                                    }}>
                                                                    {inhale.flowRate} {inhale.unitFlowRate}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div  className="grid grid-cols-2">
                                                            <div>
                                                                <p  className="text-[#132B38] text-sm font-extrabold">
                                                                    Frequency
                                                                </p>
                                                                <p  className=" text-[12px] w-32 px-3 py-2 rounded-lg text-center mt-2"
                                                                    style={{
                                                                        backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                                                        color: "rgba(19, 43, 56, 1)"
                                                                    }}>
                                                                    {inhale.frequency}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <p  className="text-[#132B38] text-sm font-extrabold">
                                                                    Duration
                                                                </p>
                                                                <p  className=" text-[12px] w-32 px-3 py-2 rounded-lg text-center mt-2"
                                                                    style={{
                                                                        backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                                                        color: "rgba(19, 43, 56, 1)"
                                                                    }}>
                                                                    {inhale.duration} {inhale.unitDuration}
                                                                </p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </div>

                                </>
                            )}

                            <div  className="mt-4">
                                <div  className="flex flex-col">
                                    <p  className="text-[#132B38] text-sm font-extrabold">Oxyhydrogen</p>
                                    <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm" style={{ width: '30%' }}>{wasOxyhydrogenUsed}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {selectedMethod === "Ingestion of H2-producing bacteria" && (
                        <div  className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Peak Breath Hydrogen</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.speciesData[species]?.Peakbreathhydrogen}</p>
                            </div>
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Frequency</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.speciesData[species]?.Frequency}</p>
                            </div>
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Ingestion Duration Frequency</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.speciesData[species]?.IngestionDurationfrequency?.value} {SectionThreeData?.speciesData[species]?.IngestionDurationfrequency?.unit}</p>
                            </div>
                        </div>
                    )}


                    {selectedMethod === "Topical applications" && (
                        <div  className="mt-4">
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Topical Method</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm" style={{ width: '30%' }}>{SectionThreeData?.speciesData[species]?.topicalMethod}</p>
                            </div>
                        </div>
                    )}

                    {selectedMethod === "Cell Culture / Tissues" && (
                        <div  className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Concentration of Hydrogen Medium</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.speciesData[species]?.concentrationOfHydrogenForMedium}</p>
                            </div>
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Frequency</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.speciesData[species]?.FrequencyCellCultureTissues?.value} {SectionThreeData?.speciesData[species]?.FrequencyCellCultureTissues?.unit}</p>
                            </div>
                            <div  className="flex flex-col">
                                <p  className="text-[#132B38] text-sm font-extrabold">Duration per Frequency</p>
                                <p  className="bg-[#E5EDF1] justify-center text-center  mt-2 inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm">{SectionThreeData?.speciesData[species]?.DurationFrequencyCellCultureTissues?.value} {SectionThreeData?.speciesData[species]?.DurationFrequencyCellCultureTissues?.unit}</p>
                            </div>
                        </div>
                    )}
                </div>
            );
        });
    };


    const renderMiscellaneousSection = () => {
        const isERW = SectionThreeData?.isERW;
        const pHValue = parseFloat(SectionThreeData?.ph);

        // Function to check if pHValue is a valid number
        const isValidpH = !isNaN(pHValue) && pHValue > 0 && pHValue <= 14;

        const renderpHChart = (pHValue) => {
            const pHCells = Array.from({ length: 14 }, (_, i) => i);
            const colors = [
                '#E3202D', '#F65531', '#FDA338', '#FDCA34', '#95D433', '#50B31F', '#15991F', '#17A55E', '#1EBFB7', '#1588C4', '#0B50C4', '#342EB2', '#4822B2', '#391A8B'
            ];

            return (
                <div  className="flex space-x-1 mt-2">
                    {pHCells.map((value) => (
                        <div
                            key={value}
                             className={`w-9 h-32 rounded-lg ${value + 1 === Math.round(pHValue) ? '-mt-3' : ''} relative`}
                            style={{ backgroundColor: colors[value] }}
                            title={`pH ${value + 1}`}
                        >
                            <p  className="absolute left-1/2 bottom-1 text-white font-bold transform -translate-x-1/2">{value + 1}</p>
                        </div>
                    ))}
                </div>
            );
        };
        return (
            <>

                {/* Render Tags */}
                <div  className="flex flex-wrap gap-2">
                    {SectionThreeData?.adverseEffects && <span  className="bg-red-200 text-red-500 px-4 py-2 text-sm rounded-md">Adverse Effects</span>}
                    {SectionThreeData?.doseDependentEffect && <span  className="bg-blue-200 text-blue-500 px-4 py-2 text-sm rounded-md">Dose-Dependent Effect</span>}
                    {SectionThreeData?.pregnantBreastfeeding && <span  className="bg-pink-200 text-pink-500 px-4 py-2 text-sm rounded-md">Pregnant/Breastfeeding</span>}
                    {SectionThreeData?.sexDifference && <span  className="bg-yellow-200 text-yellow-500 px-4 py-2 text-sm rounded-md">Sex Difference</span>}
                    {SectionThreeData?.responderDifference && <span  className="bg-orange-200 text-orange-500 px-4 py-2 text-sm rounded-md">Responder/Non-Responder</span>}
                    {SectionThreeData?.safetyProfile && <span  className="bg-purple-200 text-purple-500 px-4 py-2 text-sm rounded-md">Safety Profile</span>}
                    {SectionThreeData?.safetyofhydrogen && <span  className="bg-teal-200 text-teal-500 px-4 py-2 text-sm rounded-md">Safety Methods</span>}
                    {SectionThreeData?.mechanisticInsights && <span  className="bg-indigo-200 text-indigo-500 px-4 py-2 text-sm rounded-md">Mechanistic Insights</span>}
                    {SectionThreeData?.geneExpression && <span  className="bg-gray-300 text-gray-500 px-4 py-2 text-sm rounded-md">Gene Expression</span>}
                    {SectionThreeData?.Video_WebpageLink && <span  className="bg-cyan-200 text-cyan-500 px-4 py-2 text-sm rounded-md">Video/News/Blog</span>}
                </div>

                {isERW && (
                    <p  className="text-[#132B38] font-[500] text-sm  leading-normal">This study specifically focused on ERW.</p>
                )}
                {isValidpH && (
                    <div  className="mt-4">
                        <p  className="text-sm text-gray-700 font-bold">pH Value</p>
                        {renderpHChart(pHValue)}
                    </div>
                )}
                {SectionThreeData?.sexDifference && (
                    <p  className="text-[#132B38] font-[500] text-sm  leading-normal pt-4">This study identified differences in effects based on sex.</p>
                )}
                {SectionThreeData?.responderDifference && (
                    <p  className="text-[#132B38] font-[500] text-sm  leading-normal">This study indicated a difference between responders and non-responders.</p>
                )}
                {SectionThreeData?.safetyProfile && (
                    <p  className="text-[#132B38] font-[500] text-sm  leading-normal">This study uniquely demonstrated the safety profile of H₂.</p>
                )}
                {SectionThreeData?.pregnantBreastfeeding && (
                    <p  className="text-[#132B38] font-[500] text-sm  leading-normal">This study involved pregnant or breastfeeding subjects.</p>
                )}
                {SectionThreeData?.safetyofhydrogen && (
                    <p  className="text-[#132B38] font-[500] text-sm  leading-normal">This study showed unique methods for assessing the safety of hydrogen.</p>
                )}
                {SectionThreeData?.adverseEffects && (
                    <>
                        <p  className="text-[#132B38] font-[500] text-sm  leading-normal">This study reported adverse effects.</p>
                        <div  className="border-l-2 border-[#346896] ml-2 pl-2">
                            <p  className="text-sm font-bold">Description</p>
                            <p  className="text-[#767676] font-[500] text-sm  leading-normal">{SectionThreeData?.adverseEffectsDescription}</p>
                        </div>
                    </>
                )}
                {SectionThreeData?.doseDependentEffect && (
                    <p  className="text-[#132B38] font-[500] text-sm  leading-normal">This study suggested a dose-dependent effect of hydrogen.</p>
                )}
                {SectionThreeData?.mechanisticInsights && (
                    <p  className="text-[#132B38] font-[500] text-sm  leading-normal">This study provided mechanistic insights into the effects of hydrogen.</p>
                )}
                {SectionThreeData?.geneExpression && (
                    <>
                        <p  className="text-[#132B38] font-[500] text-sm  leading-normal">This study measured changes in gene expression.</p>
                        <div  className="border-l-2 border-[#346896] ml-2 pl-2">
                            <p  className="text-sm font-bold">Description</p>
                            <p  className="text-[#767676] font-[500] text-sm  leading-normal">{SectionThreeData?.geneExpressionDesc}</p>
                        </div>
                    </>
                )}
                {SectionThreeData?.Video_WebpageLink && (
                    <p  className="text-[#132B38] font-[500] text-sm  leading-normal">A video, news article, or blog is available for this study.</p>
                )}


                {SectionThreeData?.PasteUrl && <button
                    onClick={() => window.open(SectionThreeData?.PasteUrl, '_blank')}
                     className="mt-4 bg-[#346896] text-white px-4 py-3 rounded-full text-sm">Read more about this here</button>}
            </>
        );
    };

    const hasHydrogenAdministrationData = (SectionThreeData?.speciesData && Object.keys(SectionThreeData.speciesData).length > 0) ||
        SectionThreeData?.methodOfAdmin?.length > 0 ||
        SectionThreeData?.volumes?.length > 0 ||
        SectionThreeData?.concentrations?.length > 0 ||
        SectionThreeData?.absoluteDoses?.length > 0 ||
        SectionThreeData?.relativeDoses?.length > 0 ||
        SectionThreeData?.bodyWeight ||
        SectionThreeData?.inhalationConcentrations?.length > 0 ||
        SectionThreeData?.wasOxyhydrogenUsed;


    const isERW = SectionThreeData?.isERW;
    const pHValue = parseFloat(SectionThreeData?.ph);
    const isValidpH = !isNaN(pHValue) && pHValue > 0 && pHValue <= 14;

    // Checking if at least one field contains valid data
    const hasMiscellaneousData = Boolean(
        SectionThreeData?.adverseEffects ||
        SectionThreeData?.doseDependentEffect ||
        SectionThreeData?.pregnantBreastfeeding ||
        SectionThreeData?.sexDifference ||
        SectionThreeData?.responderDifference ||
        SectionThreeData?.safetyProfile ||
        SectionThreeData?.safetyofhydrogen ||
        SectionThreeData?.mechanisticInsights ||
        SectionThreeData?.geneExpression ||
        SectionThreeData?.Video_WebpageLink ||
        SectionThreeData?.PasteUrl ||
        isERW ||
        isValidpH
    );
    return (
        <div  className=" space-y-4 max-w-7xl mx-auto">
            <div  className="flex justify-end gap-4 mb-4">
                <button
                     className="text-sm text-white bg-[#346896] px-4 py-2 rounded-md transition"
                    onClick={isOpen ? handleCollapseAll : handleExpandAll}
                >
                    {isOpen ? 'Collapse All' : 'Expand All'}
                </button>
            </div>
            {/* Study Details */}
            {SectionTwoData?.studyType?.length > 0 && <Accordion title="Study Details" isParentOpen={isOpen}>
                {/* Study Types */}
                <div  className="flex gap-2 flex-wrap">
                    {SectionTwoData?.studyType?.map((studyType, index) => (
                        <button
                            key={studyType}
                            onClick={() => setSelectedStudyType(index)} // Set the selected index
                             className={`text-[12px] px-4 py-2 rounded-lg border ${selectedStudyType === index ? "bg-[#132B38] text-white" : "bg-white text-black"}`}
                        >
                            {studyType}
                        </button>
                    ))}
                </div>
                {getStudyDetails()}
            </Accordion>}

            {/* Research Focus & Biological Context */}
            <ResearchFocusSection isParentOpen={isOpen} SectionTwoData={SectionTwoData} />

            {/* Comparative information */}
            {(SectionThreeData?.CompMethodAdminDesc || SectionThreeData?.doseComparisonDesc || SectionThreeData?.comparisonDetail) && (
                <Accordion title="Comparative information" isParentOpen={isOpen} data={SectionThreeData}>


                    {SectionThreeData?.CompMethodAdminDesc && <div  className="pt-4">
                        <p  className="text-[#132B38] text-sm font-extrabold">Comparison of Methods of Administration</p>
                        <div  className="border-l-2 border-[#346896] mt-3">
                            <p  className="text-[#132B38] text-sm font-bold ml-2"> Describe</p>
                            <p  className="text-[#767676] text-sm font-normal w-10/12 ml-2">{SectionThreeData?.CompMethodAdminDesc}</p>
                        </div>
                    </div>}

                    {SectionThreeData?.doseComparisonDesc && <div  className="pt-6">
                        <p  className="text-[#132B38] text-sm font-extrabold">Dose/Concentration Comparison</p>
                        <div  className="border-l-2 border-[#346896] mt-3">
                            <p  className="text-[#132B38] text-sm font-bold ml-2"> Describe</p>
                            <p  className="text-[#767676] text-sm font-normal w-10/12 ml-2">{SectionThreeData?.doseComparisonDesc}</p>
                        </div>

                    </div>}

                    {SectionThreeData?.comparisonDetail && <div  className="pt-6">
                        <p  className="text-[#132B38] text-sm font-extrabold">Drug/Therapy/Supplement Comparison</p>
                        <div  className="border-l-2 border-[#346896] mt-3">
                            <p  className="text-[#132B38] text-sm font-bold ml-2"> Describe</p>
                            <p  className="text-[#767676] text-sm font-normal w-10/12 ml-2">{SectionThreeData?.comparisonDetail}</p>
                        </div>
                    </div>}

                </Accordion>)}

            {/* Hydrogen Administration Details */}
            {/* <Accordion title="Hydrogen Administration Details" isParentOpen={isOpen}>
                {renderHydrogenAdministrationDetails()}
            </Accordion> */}
            {hasHydrogenAdministrationData && (
                <Accordion title="Hydrogen Administration Details" isParentOpen={isOpen}>
                    {renderHydrogenAdministrationDetails()}
                </Accordion>
            )}

            {/* Miscellaneous */}
            {hasMiscellaneousData && (
                <Accordion title="Miscellaneous" isParentOpen={isOpen}>
                    {renderMiscellaneousSection()}
                </Accordion>
            )}

            {/* Biomarker  */}
            {SectionFourData?.length > 0 && <Accordion title="Biomarker" isParentOpen={isOpen}>
                <BiomarkerSection data={SectionFourData} />
            </Accordion>}

            <hr />

        </div>
    );
};

export default SectionTwo;
