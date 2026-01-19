"use client";

import React from 'react';
import data from "@/data/home-page/data.json";

const VishleshanWaySection = () => {
    const vData = data.vishleshanWay;
    if (!vData) return null;

    const { subtitle, title, description, items } = vData;

    return (
        <section className="w-full bg-[#F0EFFF] py-16 md:py-24 lg:py-32 px-[2%] md:px-[4%] lg:px-[10%]">
            <div
                
            >
                {/* Section Title */}
                <p
                    className="text-center font-medium text-gray-700 mb-4"
                >
                   {subtitle}
                </p>

                {/* Main Heading */}
                <h2
                    className="text-center font-bold text-black mb-6 md:mb-8"
                    style={{ lineHeight: '1.2' }}
                >
                    {title.split('.').map((part, index, array) => (
                        <React.Fragment key={index}>
                            {part}
                            {index < array.length - 1 && '.'}
                        </React.Fragment>
                    ))}
                </h2>

                {/* Description */}
                <p
                    className="text-center text-gray-700 max-w-5xl mx-auto mb-12 font-regular md:mb-16 lg:mb-20 px-10 leading-relaxed"
                >
                    {description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
                    {items.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center"
                        >
                            {/* Circular stat card with gradient border effect */}
                            <div className="relative p-3 w-[370px] h-[370px] border rounded-full border-[#FF260066]/40">
                                
                                    {/* Inner dark circle */}
                                    <div className="w-full h-full bg-black rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                                        
                                        {/* Removed violet shadow overlay as requested */}
                                        
                                        {/* Content */}
                                        <div className="relative z-10 flex flex-col items-center justify-center">
                                            <p className="text-gray-300 mb-2 font-medium">
                                                {stat.name}
                                            </p>
                                            <div className="font-bold text-[70px] text-white mb-2">
                                                {stat.value}
                                            </div>
                                            <h4 className="text-gray-200 font-medium">
                                                {stat.description}
                                            </h4>
                                        </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VishleshanWaySection;
