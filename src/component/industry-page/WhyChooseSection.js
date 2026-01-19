"use client";

import React from 'react';
import Image from 'next/image';
import data from '@/data/industry-page/data.json';

const WhyChooseSection = () => {
    const { whyChoose } = data;

    return (
        <section className="relative w-full py-16 md:py-20 lg:py-24 px-[2%] md:px-[3%] lg:px-[6%] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={whyChoose.backgroundImage}
                    alt="Why Choose Us Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10">
                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 mb-12 md:mb-16 lg:mb-20">
                    {/* Title */}
                    <div className='flex items-start'>
                        <h2 className="text-black">
                            {whyChoose.title}
                        </h2>
                    </div>
                    
                    {/* Description */}
                    <div className="flex items-end">
                        <p className="text-gray-700 leading-relaxed">
                            {whyChoose.description}
                        </p>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 lg:gap-20 justify-center">
                    {whyChoose.cards.map((card) => (
                        <div
                            key={card.id}
                            className="group bg-white/40 backdrop-blur-sm rounded-3xl p-6 lg:p-12 cursor-pointer flex flex-col gap-6 shadow-sm hover:bg-[#393E59] transition-all duration-300 ease-in-out"
                            style={{ width: '412px', height: '460px' }}
                        >
                            {/* Label Badge */}
                            <div className="w-fit">
                                <span className="inline-block px-5 py-2 border border-black rounded-full font-medium group-hover:border-transparent group-hover:bg-[#F22E62] group-hover:text-white transition-colors duration-300 ease-in-out">
                                    {card.label}
                                </span>
                            </div>

                            {/* Title */}
                            <h4
                                className="text-black group-hover:text-white w-full mt-0 group-hover:mt-20 transition-all duration-300 ease-in-out"
                                style={{
                                    fontWeight: 100,
                                    fontSize: '32px',
                                    lineHeight: '44px',
                                    letterSpacing: '0em',
                                }}
                            >
                                {card.title}
                            </h4>

                            {/* Value */}
                            <div className="mt-auto">
                                <div
                                    className="text-black group-hover:text-white transition-colors duration-300 ease-in-out"
                                    style={{
                                        fontWeight: 100,
                                        fontSize: '100px',
                                        lineHeight: '1',
                                        letterSpacing: '-0.05em',
                                    }}
                                >
                                    {card.value}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
