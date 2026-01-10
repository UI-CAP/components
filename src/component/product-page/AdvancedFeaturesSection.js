"use client";

import React from 'react';
import Image from 'next/image';
import data from '@/data/product-page/data.json';

const AdvancedFeaturesSection = () => {
    const { advancedFeatures } = data;

    return (
        <section className="w-full py-16 md:py-20 lg:py-24 px-[2%] md:px-[4%] lg:px-[7%] bg-white">
            <div className="flex flex-col items-center mx-auto">
                {/* Section Title */}
                <h2 className="text-black max-w-3xl text-center mb-[10%] tracking-tight">
                    {advancedFeatures.title}
                </h2>

                {/* Main Content Grid */}
                <div className="relative" style={{ height: '75vh' }}>
                    {/* Purple decorative layers - pyramid effect: progressively narrower, centered */}
                    <div
                        className="absolute hidden lg:block left-1/2 transform -translate-x-1/2 rounded-t-[32px] bg-[#B5B4DC]"
                        style={{ zIndex: 0, top: '-9.6vh', width: '87%', height: '12.8vh' }}
                    />
                    <div
                        className="absolute hidden lg:block left-1/2 transform -translate-x-1/2 rounded-t-[32px] bg-[#7E7AC4]"
                        style={{ zIndex: 1, top: '-4.8vh', width: '95%', height: '13.6vh' }}
                    />

                    {/* Main Dark Card */}
                    <div className="relative bg-[#3D3F5C] rounded-[24px] lg:rounded-[32px] p-8 md:p-12 lg:p-16" style={{ zIndex: 2, height: '100%' }}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                            {/* Left Side - Network Visualization */}
                            <div className="w-full flex justify-center">
                                <div className="relative w-full max-w-[500px] aspect-square">
                                    <Image
                                        src={advancedFeatures.image}
                                        alt={advancedFeatures.imageAlt}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Right Side - Content */}
                            <div className="w-full text-white">
                                {/* Main Feature */}
                                <h4 className="text-white font-bold mb-4">
                                    {advancedFeatures.mainFeature.title}
                                </h4>
                                <p className="text-gray-300 mb-8 md:mb-10 leading-relaxed">
                                    {advancedFeatures.mainFeature.description}
                                </p>

                                {/* Benefits Section */}
                                <h4 className="text-white font-semibold mb-6">
                                    {advancedFeatures.benefits.title}
                                </h4>

                                {/* Benefits List */}
                                <ul className="list-none p-0 m-0 flex flex-col gap-5">
                                    {advancedFeatures.benefits.items.map((benefit) => (
                                        <li 
                                            key={benefit.id} 
                                            className="text-gray-300  leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-white before:font-bold"
                                        >

                                            <p>
                                                {benefit.heading} {benefit.text}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdvancedFeaturesSection;
