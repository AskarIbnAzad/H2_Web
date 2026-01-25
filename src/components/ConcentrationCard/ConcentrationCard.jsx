import React from "react";
import "./styles.css";

const ConcentrationCard = ({ data }) => {
    return (
        <div  className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            {data?.map((card, index) => {

                return <div
                    key={index}
                     className="bg-white rounded-lg shadow-md w-full"
                >
                    {/* Header */}
                    <div  className="flex justify-between items-center bg-[#346896] rounded-lg">
                        <p  className="text-sm sm:text-lg font-semibold text-white px-4 py-2 ">
                            {card.title}
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
                                        Volume of water/day
                                    </p>
                                    <p  className="text-[12px] w-full sm:w-32 px-3 py-2 rounded-lg text-center"
                                        style={{
                                            backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                            color: "rgba(19, 43, 56, 1)"
                                        }}>
                                        {card.details.volume}
                                    </p>
                                </div>
                                <div className="w-full">
                                    <p  className="text-[#132B38] text-sm font-extrabold mb-2">
                                        Concentration
                                    </p>
                                    <p  className="text-[12px] w-full sm:w-32 px-3 py-2 rounded-lg text-center"
                                        style={{
                                            backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                            color: "rgba(19, 43, 56, 1)"
                                        }}>
                                        {card.details.concentration}
                                    </p>
                                </div>
                            </div>
                            <div  className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="w-full">
                                    <p  className="text-[#132B38] text-sm font-extrabold mb-2">
                                        Absolute Dose/day
                                    </p>
                                    <p  className="text-[12px] w-full sm:w-32 px-3 py-2 rounded-lg text-center"
                                        style={{
                                            backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                            color: "rgba(19, 43, 56, 1)"
                                        }}>
                                        {card.details.absoluteDose}
                                    </p>
                                </div>
                                <div className="w-full">
                                    <p  className="text-[#132B38] text-sm font-extrabold mb-2">
                                        Relative Dose/day
                                    </p>
                                    <p  className="text-[12px] w-full sm:w-32 px-3 py-2 rounded-lg text-center"
                                        style={{
                                            backgroundColor: 'rgba(52, 104, 150, 0.2)',
                                            color: "rgba(19, 43, 56, 1)"
                                        }}>
                                        {card.details.relativeDose}
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
    );
};

export default ConcentrationCard;
