import React from 'react'
import { FaCheckCircle } from "react-icons/fa";

const SubscribtionCard = () => {
    const cardData = [
        {
            title: "Free",
            price: "$0/mo",
            features: ["Voice messages anywhere", "Voice messages anywhere", "Voice messages anywhere"],
            backgroundColor: "#E5F4FF",
            color: '#132B38',
            buttonText: 'Already using',
            buttonColor: 'rgba(255, 255, 255, 0.50)',
            buttonBack: "#346896",
            isCenter: false
        },
        {
            title: "Premium",
            price: "$9.99/mo",
            features: ["Voice messages anywhere", "Voice messages anywhere", "Voice messages anywhere", "Voice messages anywhere", "Voice messages anywhere"],
            backgroundColor: "#132B38",
            color: 'white',
            buttonText: 'Buy now',
            buttonColor: 'white',
            buttonBack: "#2BA6FF",
            isCenter: true,
        },
        {
            title: "Business",
            price: "$29.99/mo",
            features: ["Voice messages anywhere", "Voice messages anywhere", "Voice messages anywhere"],
            backgroundColor: "#E5F4FF",
            color: '#132B38',
            buttonText: 'Buy now',
            buttonColor: 'white',
            buttonBack: "#346896",
            isCenter: false

        },
    ];


    return (
        <div>
            <div  className="w-full mt-20 px-4 bg-white">
                <div  className="grid md:grid-cols-3 gap-8" style={{alignItems:'flex-end'}}>
                    {cardData.map((card, index) => (
                        <div  className='hover:scale-105 duration-300'>
                            {card.isCenter && <div
                                style={{
                                    height: '90.423px',
                                    borderRadius: '30.726px 30.726px 0px 0px',
                                    background: '#346896',
                                    marginBottom:'-30px'
                                }}
                            >
                            </div>}

                            <div
                                key={index}
                                 className={`w-full flex flex-col justify-between p-4 my-4 rounded-lg`}
                                style={{
                                    backgroundColor: card.backgroundColor,
                                    color: card.color,
                                }}
                            >
                                <h2  className="text-2xl font-bold  pt-8 pb-2"
                                    style={{
                                        textAlign: card.isCenter ? 'center' : 'start',
                                    }}
                                >
                                    {card.title}
                                </h2>
                                <p  className=" text-4xl font-bold"
                                    style={{
                                        textAlign: card.isCenter ? 'center' : 'start',
                                    }}
                                >{card.price}</p>
                                <div  className="font-medium"
                                    style={{
                                        textAlign: card.isCenter ? 'center' : 'start',
                                    }}
                                >
                                    {card.features.map((feature, index) => (
                                        <p
                                            key={index}
                                             className={`py-2  ${index === 0 ? "mt-8" : ""}`}
                                            style={{ display: 'flex', alignItems: 'center' }}
                                        >
                                            <span>
                                                <FaCheckCircle />
                                            </span>
                                            <span  className='ml-2'>
                                                {feature}
                                            </span>
                                        </p>
                                    ))}
                                </div>
                                <button
                                     className={`w-[300px] rounded-md font-medium my-6 mx-auto px-6 py-3`}
                                    style={{
                                        color: card.buttonColor,
                                        backgroundColor: card.buttonBack
                                    }}
                                >
                                    {card.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubscribtionCard
