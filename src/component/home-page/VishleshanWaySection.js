"use client";

import React from 'react';
import data from "@/data/data.json";

const VishleshanWaySection = () => {
    const vData = data.vishleshanWay;
    if (!vData) return null;

    const { subtitle, title, description, items } = vData;

    return (
        <section className="w-full bg-[#F0EFFF] py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12">
            <div
                className="max-w-7xl mx-auto"
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
                    className="text-center text-gray-700 max-w-4xl mx-auto mb-12 md:mb-16 lg:mb-20 px-4 leading-relaxed"
                >
                    {description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12 max-w-5xl mx-auto">
                    {items.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center"
                        >
                            {/* Circular stat card with gradient border effect */}
                            <div className="relative p-3 w-48 h-48 border rounded-full border-[#FF260066]/40 md:w-56 md:h-56 lg:w-64 lg:h-64">
                                
                                    {/* Inner dark circle */}
                                    <div className="w-full h-full bg-black rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                                        
                                        {/* Violet shadow rotating clockwise */}
                                        <div 
                                            className="absolute inset-0 rounded-full animate-spin-slow"
                                            style={{
                                                background: 'radial-gradient(ellipse 40% 100% at 95% 50%, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0.5) 30%, transparent 60%)'
                                            }}
                                        ></div>
                                        
                                        {/* Content */}
                                        <div className="relative z-10 flex flex-col items-center justify-center">
                                            <p className="text-gray-300 mb-2 font-medium">
                                                {stat.name}
                                            </p>
                                            <h3 className="font-bold text-white mb-2">
                                                {stat.value}
                                            </h3>
                                            <p className="text-gray-200 font-medium">
                                                {stat.description}
                                            </p>
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
