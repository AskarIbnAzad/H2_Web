import { useState } from 'react';
import Accordion from '../../Accordion/Accordion';
import ResearchImage from "../../../assets/images/research.png";
import PhysiologicalImage from "../../../assets/images/Physiological.png";
import OrgansImage from "../../../assets/images/Organs.png";

const ResearchFocusSection = ({ isParentOpen, SectionTwoData }) => {
    const [selectedSpecies, setSelectedSpecies] = useState(0);

    SectionTwoData?.species?.length > 0
    SectionTwoData?.researchtopic?.length > 0
    SectionTwoData?.diseaseModel
    SectionTwoData?.system?.length > 0
    SectionTwoData?.organ?.length > 0



    return (
        <>
            {(
                (SectionTwoData?.species?.length > 0) ||
                (SectionTwoData?.researchtopic?.length > 0) ||
                SectionTwoData?.diseaseModel ||
                (SectionTwoData?.system?.length > 0) ||
                (SectionTwoData?.organ?.length > 0)
            ) && (
                    <Accordion title="Research Focus & Biological Context" isParentOpen={isParentOpen}>
                        <div>
                            {/* Species Selection */}
                            <div  className="flex gap-2">
                                {SectionTwoData?.species?.map((species, index) => (
                                    <button
                                        key={species}
                                        onClick={() => setSelectedSpecies(index)} // Set the selected species by index
                                         className={`text-[12px] px-4 py-2 rounded-lg border ${selectedSpecies === index ? "bg-[#132B38] text-white" : "bg-white text-black"}`}
                                    >
                                        {species}
                                    </button>
                                ))}
                            </div>

                            {/* Display Details for the Selected Species */}
                            {/* {selectedSpecies !== null && ( */}
                            {selectedSpecies !== null && SectionTwoData?.species?.[selectedSpecies] && (
                                <div key={SectionTwoData?.species[selectedSpecies]}  className="mt-4">

                                    {SectionTwoData?.speciesDetails && (
                                        <>
                                            {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]]?.DescribeSpecies && (
                                                <div  className="mt-4 mb-6">
                                                    <p  className="text-[#132B38] text-sm font-extrabold">Describe</p>
                                                    <p  className="text-[#767676]">{SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].DescribeSpecies}</p>
                                                </div>
                                            )}

                                            <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                                                {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]]?.subjects && (
                                                    <div  className="flex flex-col">
                                                        <p  className="text-[#132B38] text-sm font-extrabold"># of Subjects</p>
                                                        <span  className="bg-[#346896] text-center items-center justify-center inline-flex px-4 py-2 text-sm text-[#FFFFFF] rounded-md shadow-sm mt-2">
                                                            {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].subjects}
                                                        </span>
                                                    </div>
                                                )}

                                                {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]]?.health && (
                                                    <div  className="flex flex-col">
                                                        <p  className="text-[#132B38] text-sm font-extrabold">Health</p>
                                                        <span  className="bg-[#346896] text-center items-center justify-center inline-flex px-4 py-2 text-sm text-[#FFFFFF] rounded-md shadow-sm mt-2">
                                                            {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].health}
                                                        </span>
                                                    </div>
                                                )}

                                                {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]]?.gender && (
                                                    <div  className="flex flex-col">
                                                        <p  className="text-[#132B38] text-sm font-extrabold">Gender</p>
                                                        <span  className="bg-[#346896] text-center items-center justify-center inline-flex px-4 py-2 text-sm text-[#FFFFFF] rounded-md shadow-sm mt-2">
                                                            {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].gender}
                                                        </span>
                                                    </div>
                                                )}

                                                {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]]?.averageAge && (
                                                    <div  className="flex flex-col">
                                                        <p  className="text-[#132B38] text-sm font-extrabold">Average Age</p>
                                                        <span  className="bg-[#346896] text-center items-center justify-center inline-flex px-4 py-2 text-sm text-[#FFFFFF] rounded-md shadow-sm mt-2">
                                                            {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].averageAge}
                                                        </span>
                                                    </div>
                                                )}

                                                {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]]?.averageWeight && (
                                                    <div  className="flex flex-col">
                                                        <p  className="text-[#132B38] text-sm font-extrabold">Average Weight</p>
                                                        <span  className="bg-[#346896] text-center items-center justify-center inline-flex px-4 py-2 text-sm text-[#FFFFFF] rounded-md shadow-sm mt-2">
                                                            {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].averageWeight}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}


                                    {/* {SectionTwoData?.speciesDetails && <>
                                        <div  className='mt-4 mb-6'>
                                            <p  className="text-[#132B38] text-sm font-extrabold">Describe</p>
                                            <p  className="text-[#767676]">{SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].DescribeSpecies}</p>
                                        </div>

                                        <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                                            <div  className="flex flex-col">
                                                <p  className="text-[#132B38] text-sm font-extrabold"># of Subjects</p>
                                                <span
                                                     className="bg-[#346896] text-center items-center justify-center inline-flex px-4 py-2 text-sm text-[#FFFFFF]  rounded-md shadow-sm mt-2"
                                                >
                                                    {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].subjects}
                                                </span>
                                            </div>

                                            <div  className="flex flex-col">
                                                <p  className="text-[#132B38] text-sm font-extrabold">Health</p>
                                                <span
                                                     className="bg-[#346896] text-center items-center justify-center inline-flex px-4 py-2 text-sm text-[#FFFFFF]  rounded-md shadow-sm mt-2"
                                                >
                                                    {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].health}
                                                </span>
                                            </div>

                                            <div  className="flex flex-col">
                                                <p  className="text-[#132B38] text-sm font-extrabold">Gender</p>

                                                <span
                                                     className="bg-[#346896] text-center items-center justify-center inline-flex px-4 py-2 text-sm text-[#FFFFFF]  rounded-md shadow-sm mt-2"
                                                >
                                                    {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].gender}
                                                </span>
                                            </div>

                                            <div  className="flex flex-col">
                                                <p  className="text-[#132B38] text-sm font-extrabold">Average Age</p>
                                                <span
                                                     className="bg-[#346896] text-center items-center justify-center inline-flex px-4 py-2 text-sm text-[#FFFFFF]  rounded-md shadow-sm mt-2"
                                                >
                                                    {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].averageAge}
                                                </span>
                                            </div>

                                            <div  className="flex flex-col">
                                                <p  className="text-[#132B38] text-sm font-extrabold">Average Weight</p>
                                                <span
                                                     className="bg-[#346896] text-center items-center justify-center inline-flex px-4 py-2 text-sm text-[#FFFFFF]  rounded-md shadow-sm mt-2"
                                                >
                                                    {SectionTwoData?.speciesDetails[SectionTwoData?.species[selectedSpecies]].averageWeight}
                                                </span>
                                            </div>
                                        </div>




                                    </>} */}
                                </div>
                            )}

                            {/* Container for Research Topics and Disease Model */}
                            <div  className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Research Topics */}
                                {SectionTwoData?.researchtopic?.length > 0 && < div  className="flex-wrap">
                                    {/* <p  className="text-[#132B38] text-sm font-extrabold">Research Topics</p> */}
                                    <span  className='flex items-center gap-2'>
                                        <span>
                                            <img src={ResearchImage} alt="ResearchImage" />
                                        </span>
                                        <span  className="text-[#132B38] text-sm font-extrabold">Research Topics</span>
                                    </span>

                                    <div  className="mt-2">
                                        {SectionTwoData?.researchtopic?.map((topic, index) => {

                                            return <span key={index}  className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm ml-2">
                                                {topic}
                                            </span>
                                        })}
                                    </div>
                                </div>}

                                {/* Disease Model */}
                                {SectionTwoData?.diseaseModel && <div>
                                    <p  className="text-[#132B38] text-sm font-extrabold">Disease Model Studied</p>
                                    <div  className="mt-0">
                                        {SectionTwoData?.diseaseModel &&
                                            <span  className="text-[#767676]  text-sm  rounded-lg">
                                                {SectionTwoData?.diseaseModel}
                                            </span>
                                        }
                                    </div>
                                </div>}

                            </div>

                            {/* Container forPhysiological Systems and Organs/Tissues */}
                            <div  className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Physiological Systems */}
                                {SectionTwoData?.system?.length > 0 && < div  className='mt-4'>
                                    {/* <p  className="text-[#132B38] text-sm font-extrabold">Physiological Systems</p> */}
                                    <span  className='flex items-center gap-2'>
                                        <span>
                                            <img src={PhysiologicalImage} alt="PhysiologicalImage" />
                                        </span>
                                        <span  className="text-[#132B38] text-sm font-extrabold">Physiological Systems</span>
                                    </span>
                                    <div  className="mt-2">
                                        {SectionTwoData?.system?.map((system, index) => (
                                            <span key={index}  className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm ml-2">
                                                {system}
                                            </span>
                                        ))}
                                    </div>
                                </div>}

                                {/* Organs/Tissues */}
                                {SectionTwoData?.organ?.length > 0 && <div  className='mt-4'>
                                    {/* <p  className="text-[#132B38] text-sm font-extrabold">Organs/Tissues</p> */}
                                    <span  className='flex items-center gap-2'>
                                        <span>
                                            <img src={OrgansImage} alt="OrgansImage" />
                                        </span>
                                        <span  className="text-[#132B38] text-sm font-extrabold">Organs/Tissues</span>
                                    </span>
                                    <div  className="mt-2">
                                        {SectionTwoData?.organ?.map((tissue, index) => (
                                            // <span key={index}  className="bg-gray-100 text-[12px] px-3 py-1 rounded-lg mt-2">
                                            //     {tissue}
                                            // </span>
                                            <span key={index}  className="bg-[#E5EDF1] inline-flex px-4 py-2 text-sm text-gray-700  rounded-md shadow-sm ml-2">
                                                {tissue}
                                            </span>
                                        ))}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </Accordion >)
            }
        </>

    );
};

export default ResearchFocusSection;
